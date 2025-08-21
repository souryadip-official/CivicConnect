// backend/routes/complaintRoutes.js

const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/complaintController');
const { protect, admin } = require('../middleware/authMiddleware');

// --- User Routes ---
router.route('/').post(protect, createComplaint);
router.route('/mycomplaints').get(protect, getMyComplaints);
router.route('/mystats').get(protect, getMyStats);
router.route('/community').get(protect, getCommunityComplaints);

// --- Admin Routes ---
// FIXED: Moved admin-specific routes to the top to be matched first
router.route('/admin').get(protect, admin, getComplaintsForAdmin);
router.route('/admin/stats').get(protect, admin, getAdminStats);
router.route('/admin/:id/status').put(protect, admin, updateComplaintStatus);

// --- Generic User Routes (must come after specific admin routes) ---
router.route('/:id/vote').put(protect, voteOnComplaint);
router.route('/:id')
  .get(protect, getComplaintById)
  .put(protect, updateUserComplaint)
  .delete(protect, deleteUserComplaint);

module.exports = router;