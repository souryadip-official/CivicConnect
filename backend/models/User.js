// backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // --- Core Fields ---
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  ruralBodyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'RuralBody' },

  // --- New Detailed Fields (Now Required) ---
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  occupation: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  parentName: { type: String, required: true },
  householdHead: { type: String, required: true },
  address: { type: String, required: true },
  landmark: { type: String, required: true },
  aadhaar: { type: String, required: true },
  voterId: { type: String }, // This field remains optional

}, {
  timestamps: true,
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;