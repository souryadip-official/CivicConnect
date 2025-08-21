// backend/routes/announcementRoutes.js

const express = require('express');
const router = express.Router();
const {
  createAnnouncement,
  getAnnouncementsForAdmin,
  getAnnouncementsForUser,
  deleteAnnouncement,
} = require('../controllers/announcementController');
const { protect, admin } = require('../middleware/authMiddleware');

// --- User Route ---
router.route('/').get(protect, getAnnouncementsForUser);

// --- Admin Routes ---
router.route('/').post(protect, admin, createAnnouncement);
router.route('/admin').get(protect, admin, getAnnouncementsForAdmin);
router.route('/:id').delete(protect, admin, deleteAnnouncement);

module.exports = router;