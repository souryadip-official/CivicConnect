// backend/models/Announcement.js

const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // The admin who posted it
  },
  ruralBodyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'RuralBody',
  },
}, {
  timestamps: true,
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;