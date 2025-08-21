// backend/models/RuralBody.js

const mongoose = require('mongoose');

const ruralBodySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // --- ADDED THESE FIELDS ---
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  officialEmail: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  // --- END OF ADDED FIELDS ---
  district: {
    type: String,
    // You can make this required later if needed
  },
  state: {
    type: String,
    // You can make this required later if needed
  },
}, {
  timestamps: true,
});

const RuralBody = mongoose.model('RuralBody', ruralBodySchema);

module.exports = RuralBody;