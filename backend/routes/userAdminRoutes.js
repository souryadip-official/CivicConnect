// backend/routes/userAdminRoutes.js

const express = require('express');
const router = express.Router();
const { getResidents, getResidentById, updateResident, deleteResident } = require('../controllers/userAdminController');
const { protect, admin } = require('../middleware/authMiddleware');

// Route to get all residents
router.route('/residents').get(protect, admin, getResidents);

// Single Resident Access
router.route('/residents/:id')
    .get(protect, admin, getResidentById)
    .put(protect, admin, updateResident)
    .delete(protect, admin, deleteResident);;

module.exports = router;