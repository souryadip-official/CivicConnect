// backend/controllers/userAdminController.js

const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const mongoose = require('mongoose'); // Import mongoose

// @desc    Get all residents for an admin's rural body
// @route   GET /api/users/admin/residents
// @access  Private/Admin
const getResidents = asyncHandler(async (req, res) => {
  // req.user is populated by our 'protect' middleware
  const adminUser = req.user;

  if (!adminUser || !adminUser.ruralBodyId) {
    res.status(400);
    throw new Error('Admin user is not associated with any rural body.');
  }

  // FIXED: Ensure we are querying with a proper MongoDB ObjectId
  const ruralBodyObjectId = new mongoose.Types.ObjectId(adminUser.ruralBodyId);

  const residents = await User.find({
    ruralBodyId: ruralBodyObjectId, // Use the converted ObjectId for the query
    role: 'user'
  }).select('-password');

  res.json(residents);
});

// @desc    Get a single resident by ID
// @route   GET /api/users/admin/residents/:id
const getResidentById = asyncHandler(async (req, res) => {
    const resident = await User.findById(req.params.id).select('-password');
    if (resident && resident.ruralBodyId.toString() === req.user.ruralBodyId.toString()) {
        res.json(resident);
    } else {
        res.status(404);
        throw new Error('Resident not found');
    }
});

const updateResident = asyncHandler(async (req, res) => {
    const resident = await User.findById(req.params.id);

    if (resident && resident.ruralBodyId.toString() === req.user.ruralBodyId.toString()) {
        resident.name = req.body.name || resident.name;
        resident.email = req.body.email || resident.email;
        resident.phone = req.body.phone || resident.phone;
        resident.occupation = req.body.occupation || resident.occupation;
        resident.maritalStatus = req.body.maritalStatus || resident.maritalStatus;
        resident.address = req.body.address || resident.address;
        
        const updatedResident = await resident.save();
        res.json(updatedResident);
    } else {
        res.status(404);
        throw new Error('Resident not found');
    }
});

// @desc    Delete a resident by ID
// @route   DELETE /api/users/admin/residents/:id
const deleteResident = asyncHandler(async (req, res) => {
    const resident = await User.findById(req.params.id);

    // Check if resident exists and belongs to the admin's rural body
    if (resident && resident.ruralBodyId.toString() === req.user.ruralBodyId.toString()) {
        if (resident.role === 'admin') {
            res.status(400);
            throw new Error('Cannot delete an admin account.');
        }
        await resident.deleteOne();
        res.json({ message: 'Resident removed successfully' });
    } else {
        res.status(404);
        throw new Error('Resident not found');
    }
});

module.exports = { getResidents, getResidentById, updateResident, deleteResident };