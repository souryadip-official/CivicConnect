// models/Complaint.js

const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'roads',
      'sanitation',
      'electricity',
      'water',
      'public_safety',
      'healthcare',
      'education',
      'environment',
      'others'
    ], 
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'], // Predefined severity levels [cite: 293]
  },
  imageUrl: {
    type: String, // URL from Cloudinary [cite: 294]
    required: true,
  },
  location: {
    type: String, // Can be a simple string or more complex GeoJSON
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved'],
    default: 'pending', // Default status is 'pending' [cite: 296]
  },
  votes: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    voteType: {
      type: String,
      enum: ['upvote', 'downvote'],
    },
  }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  ruralBodyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'RuralBody',
  },
}, {
  timestamps: true,
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;