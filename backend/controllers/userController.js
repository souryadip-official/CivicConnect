// backend/controllers/userController.js

const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

// ... (registerUser and loginUser functions are unchanged)

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    ruralBodyId,
    dob,
    gender,
    occupation,
    maritalStatus,
    parentName,
    householdHead,
    address,
    landmark,
    aadhaar,
    voterId,
  } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    phone,
    ruralBodyId,
    dob,
    gender,
    occupation,
    maritalStatus,
    parentName,
    householdHead,
    address,
    landmark,
    aadhaar,
    voterId,
  });
  if (user) {
    res
      .status(201)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      ruralBodyId: user.ruralBodyId,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// --- THIS IS THE CORRECTED FUNCTION ---
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.email = req.body.email || user.email;
    user.occupation = req.body.occupation || user.occupation;
    user.maritalStatus = req.body.maritalStatus || user.maritalStatus;
    user.address = req.body.address || user.address;
    if (req.body.voterId && !user.voterId) {
      user.voterId = req.body.voterId;
    }

    const updatedUser = await user.save();

    // FIXED: Return the full, updated user object (without the password)
    const fullUpdatedUser = await User.findById(updatedUser._id).select(
      "-password"
    );
    res.json(fullUpdatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
