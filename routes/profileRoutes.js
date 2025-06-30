// routes/profileRoutes.js

const express = require('express');
// Import the profile controller functions
const { getProfile, updateProfile, createProfile } = require('../controllers/profileController');
// Assuming you have an authentication middleware named 'protect'
const { protect } = require('../middleware/authMiddleware');
// Import the Multer configuration for file uploads
const upload = require('../config/multerConfig');

const router = express.Router();

// GET /api/profile - Route to fetch the logged-in user's profile
// The 'protect' middleware ensures that only authenticated users can access this route.
router.get('/', protect, getProfile);

// PUT /api/profile - Route to update the logged-in user's profile
// - 'protect' middleware ensures authentication.
// - 'upload.single('profilePicture')' is Multer middleware. It tells Multer to expect
//   a single file upload with the field name 'profilePicture' from the incoming request.
//   This field name MUST match the 'name' attribute of your file input on the frontend.
router.put('/', protect, upload.single('profilePicture'), updateProfile);

// POST /api/profile - Route to create a new user profile
// This route might be called after user registration if a profile isn't automatically created then,
// or for users who somehow don't have a profile yet.
router.post('/', protect, createProfile);

module.exports = router;
