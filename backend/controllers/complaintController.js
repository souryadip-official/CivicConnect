// backend/controllers/complaintController.js

const asyncHandler = require("express-async-handler");
const Complaint = require("../models/Complaint");
const User = require("../models/User");
const mongoose = require("mongoose"); // Import mongoose

// ... (createComplaint, getMyComplaints, getMyStats functions are unchanged) ...
const createComplaint = asyncHandler(async (req, res) => {
  const { title, description, category, severity, location, imageUrl } =
    req.body;
  if (
    !title ||
    !description ||
    !category ||
    !severity ||
    !location ||
    !imageUrl
  ) {
    res.status(400);
    throw new Error("Please fill out all required fields and upload an image.");
  }
  const complaint = new Complaint({
    title,
    description,
    category,
    severity,
    location,
    imageUrl,
    postedBy: req.user._id,
    ruralBodyId: req.user.ruralBodyId,
  });
  const createdComplaint = await complaint.save();
  res.status(201).json(createdComplaint);
});

const getMyComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ postedBy: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(complaints);
});

const getMyStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const totalComplaints = await Complaint.countDocuments({ postedBy: userId });
  const inProgressComplaints = await Complaint.countDocuments({
    postedBy: userId,
    status: "in_progress",
  });
  const resolvedComplaints = await Complaint.countDocuments({
    postedBy: userId,
    status: "resolved",
  });
  res.json({ totalComplaints, inProgressComplaints, resolvedComplaints });
});

const updateComplaintStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }
  if (complaint.ruralBodyId.toString() !== req.user.ruralBodyId.toString()) {
    res.status(401);
    throw new Error("User not authorized to update this complaint");
  }
  complaint.status = status;
  const updatedComplaint = await complaint.save();
  const populatedComplaint = await Complaint.findById(
    updatedComplaint._id
  ).populate("postedBy", "name");
  res.json(populatedComplaint);
});

// --- FIXED FUNCTIONS START HERE ---

// @desc    Get all complaints for an admin's rural body
// @route   GET /api/complaints/admin
// @access  Private/Admin
const getComplaintsForAdmin = asyncHandler(async (req, res) => {
  // The 'protect' middleware gives us the logged-in admin user in req.user
  console.log("I am here")
  const adminUser = req.user;

  // This is the correct, simple, and robust way to query.
  // Mongoose will correctly handle the comparison.
  const complaints = await Complaint.find({ ruralBodyId: adminUser.ruralBodyId })
    .populate('postedBy', 'name')
    .sort({ createdAt: -1 });

  res.json(complaints);
});

// @desc    Get dashboard stats for an admin
// @route   GET /api/complaints/admin/stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res) => {
  // FIXED: Ensure we are querying with a proper MongoDB ObjectId
  const ruralBodyObjectId = new mongoose.Types.ObjectId(req.user.ruralBodyId);

  const totalResidents = await User.countDocuments({
    ruralBodyId: ruralBodyObjectId,
    role: "user",
  });
  const totalComplaints = await Complaint.countDocuments({
    ruralBodyId: ruralBodyObjectId,
  });
  const pendingComplaints = await Complaint.countDocuments({
    ruralBodyId: ruralBodyObjectId,
    status: "pending",
  });
  const resolvedComplaints = await Complaint.countDocuments({
    ruralBodyId: ruralBodyObjectId,
    status: "resolved",
  });

  res.json({
    totalResidents,
    totalComplaints,
    pendingComplaints,
    resolvedComplaints,
  });
});

// --- FIXED FUNCTIONS END HERE ---

// You might not have these two functions if you didn't do the user-side "View Details"
// It's safe to add them if they are missing.
const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }
  // Security check for regular users, not strictly needed for this file but good practice
  // For admin access to any complaint, this check would be different or removed.
  if (
    req.user.role === "user" &&
    complaint.postedBy.toString() !== req.user._id.toString()
  ) {
    res.status(401);
    throw new Error("Not authorized");
  }
  res.json(complaint);
});

const updateUserComplaint = asyncHandler(async (req, res) => {
  const { title, description, location, imageUrl } = req.body;
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }
  if (complaint.postedBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }
  if (complaint.status !== "pending") {
    res.status(400);
    throw new Error("Cannot update a processed complaint.");
  }
  complaint.title = title || complaint.title;
  complaint.description = description || complaint.description;
  complaint.location = location || complaint.location;
  complaint.imageUrl = imageUrl || complaint.imageUrl;
  const updatedComplaint = await complaint.save();
  res.json(updatedComplaint);
});

const getCommunityComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ ruralBodyId: req.user.ruralBodyId })
    .populate("postedBy", "name")
    .sort({ createdAt: -1 });
  res.json(complaints);
});

const voteOnComplaint = asyncHandler(async (req, res) => {
  const { voteType } = req.body;
  const complaint = await Complaint.findById(req.params.id);
  const userId = req.user._id;
  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }
  const existingVote = complaint.votes.find(
    (v) => v.userId.toString() === userId.toString()
  );
  if (existingVote) {
    if (existingVote.voteType === voteType) {
      complaint.votes = complaint.votes.filter(
        (v) => v.userId.toString() !== userId.toString()
      );
    } else {
      existingVote.voteType = voteType;
    }
  } else {
    complaint.votes.push({ userId, voteType });
  }
  await complaint.save();
  const populatedComplaint = await Complaint.findById(complaint._id).populate(
    "postedBy",
    "name"
  );
  res.json(populatedComplaint);
});

// @desc    Delete a user's own complaint
// @route   DELETE /api/complaints/:id
// @access  Private
const deleteUserComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  // Security Check: Ensure the user can only delete their own complaint
  if (complaint.postedBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this complaint');
  }

  // Logic Check: Only allow deletion if the complaint is still 'pending'
  if (complaint.status !== 'pending') {
    res.status(400);
    throw new Error('Cannot delete a complaint that is already being processed.');
  }

  await complaint.deleteOne(); // Use deleteOne() which is the modern Mongoose method
  res.json({ message: 'Complaint removed successfully' });
});

// Make sure all functions are exported
module.exports = {
  createComplaint,
  getMyComplaints,
  getMyStats,
  updateComplaintStatus,
  getComplaintsForAdmin,
  getAdminStats,
  getComplaintById,
  updateUserComplaint,
  getCommunityComplaints,
  voteOnComplaint,
  deleteUserComplaint
};
