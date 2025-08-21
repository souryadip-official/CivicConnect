// backend/controllers/organizationController.js

const asyncHandler = require('express-async-handler');
const RuralBody = require('../models/RuralBody');
const User = require('../models/User');

// @desc    Register a new organization and its admin user
// @route   POST /api/organizations/register
// @access  Public
const registerOrganization = asyncHandler(async (req, res) => {
  const {
    orgName,
    regNumber,
    orgEmail,
    orgPhone,
    orgAddress,
    contactName,
    contactPosition,
    contactEmail,
    contactPhone,
    password // Password for the admin user
  } = req.body;

  // 1. Check if the organization already exists
  const orgExists = await RuralBody.findOne({ registrationNumber: regNumber });
  if (orgExists) {
    res.status(400);
    throw new Error('Organization with this registration number already exists.');
  }

  // 2. Check if the admin user's email is already taken
  const userExists = await User.findOne({ email: contactEmail });
  if (userExists) {
    res.status(400);
    throw new Error('A user with the contact person\'s email already exists.');
  }

  // 3. Create the new Organization (RuralBody)
  const ruralBody = await RuralBody.create({
    name: orgName,
    registrationNumber: regNumber,
    officialEmail: orgEmail,
    phone: orgPhone,
    address: orgAddress,
    // We can add contact person details to this model if needed
  });

  if (!ruralBody) {
    res.status(400);
    throw new Error('Failed to create organization.');
  }

  // 4. Create the admin user for this organization
  const adminUser = await User.create({
    name: contactName,
    email: contactEmail,
    password: password,
    phone: contactPhone,
    role: 'admin', // Set the role to admin
    ruralBodyId: ruralBody._id, // Link user to the new organization
    // Fill other required fields with placeholders or from form
    dob: new Date(),
    gender: 'Not Specified',
    occupation: contactPosition,
    maritalStatus: 'Not Specified',
    parentName: 'Not Specified',
    householdHead: 'Not Specified',
    address: orgAddress,
    landmark: 'Not Specified',
    aadhaar: 'Not Specified',
  });

  if (adminUser) {
    res.status(201).json({
      message: 'Organization registered successfully. Admin user created.',
      orgId: ruralBody._id,
      adminId: adminUser._id,
    });
  } else {
    // Clean up created ruralBody if user creation fails
    await RuralBody.findByIdAndDelete(ruralBody._id);
    res.status(400);
    throw new Error('Failed to create admin user for the organization.');
  }
});

const getOrganizations = asyncHandler(async (req, res) => {
  const organizations = await RuralBody.find({}, 'name _id'); // Only fetch name and id
  res.json(organizations);
});

module.exports = { registerOrganization, getOrganizations };