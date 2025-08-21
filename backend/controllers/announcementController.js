// backend/controllers/announcementController.js

const asyncHandler = require('express-async-handler');
const Announcement = require('../models/Announcement');

// @desc    Create a new announcement
// @route   POST /api/announcements
// @access  Private/Admin
const createAnnouncement = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Title and content are required.');
  }

  const announcement = new Announcement({
    title,
    content,
    postedBy: req.user._id,
    ruralBodyId: req.user.ruralBodyId,
  });

  const createdAnnouncement = await announcement.save();
  res.status(201).json(createdAnnouncement);
});

// @desc    Get all announcements for an admin's rural body
// @route   GET /api/announcements/admin
// @access  Private/Admin
const getAnnouncementsForAdmin = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find({ ruralBodyId: req.user.ruralBodyId })
    .populate('postedBy', 'name')
    .sort({ createdAt: -1 });
  res.json(announcements);
});

// @desc    Get all announcements for a user's rural body
// @route   GET /api/announcements
// @access  Private
const getAnnouncementsForUser = asyncHandler(async (req, res) => {
    const announcements = await Announcement.find({ ruralBodyId: req.user.ruralBodyId })
      .populate('postedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(announcements);
});

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
const deleteAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);

  if (announcement && announcement.ruralBodyId.toString() === req.user.ruralBodyId.toString()) {
    await announcement.deleteOne();
    res.json({ message: 'Announcement removed' });
  } else {
    res.status(404);
    throw new Error('Announcement not found or user not authorized');
  }
});

module.exports = {
  createAnnouncement,
  getAnnouncementsForAdmin,
  getAnnouncementsForUser,
  deleteAnnouncement,
};