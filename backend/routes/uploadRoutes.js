// backend/routes/uploadRoutes.js

const express = require('express');
const upload = require('../config/cloudinary');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private
router.post('/', protect, upload.single('image'), (req, res) => {
  if (req.file) {
    res.send({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path, // The secure URL from Cloudinary
    });
  } else {
    res.status(400).send({ message: 'No image file provided' });
  }
});

module.exports = router;