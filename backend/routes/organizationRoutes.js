// backend/routes/organizationRoutes.js

const express = require('express');
const router = express.Router();
const { registerOrganization, getOrganizations } = require('../controllers/organizationController');

router.post('/register', registerOrganization);
router.get('/', getOrganizations);

module.exports = router;