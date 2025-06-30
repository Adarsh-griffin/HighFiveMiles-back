// controllers/profileController.js

const User = require('../models/User'); // Still need User model to find the user if necessary, or for context
const Profile = require('../models/profile'); // Import the new Profile model
const asyncHandler = require('express-async-handler'); // For handling async errors in Express

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
// This function fetches the profile data for the currently authenticated user.
const getProfile = asyncHandler(async (req, res) => {
  // req.user.id is typically set by your authentication middleware (e.g., from a JWT token)
  // It holds the ID of the authenticated user.
  const profile = await Profile.findOne({ user: req.user.id });

  if (profile) {
    // If a profile is found, send the entire profile document as a JSON response.
    res.json(profile);
  } else {
    // If no profile is found for the user, send a 404 Not Found error.
    res.status(404);
    throw new Error('Profile not found for this user. Please create one.');
  }
});

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
// This function handles updating an existing user's profile data, including the profile picture.
const updateProfile = asyncHandler(async (req, res) => {
  // Find the profile associated with the authenticated user's ID
  let profile = await Profile.findOne({ user: req.user.id });

  if (profile) {
    // Update simple fields from the request body if they are provided.
    // The `|| profile.fieldName` ensures that if a field is not provided in the request,
    // its existing value in the database is retained.
    profile.name = req.body.name || profile.name;
    profile.location = req.body.location || profile.location;
    profile.monthlyGoal = req.body.monthlyGoal || profile.monthlyGoal;
    // Add similar lines for any other simple fields (e.g., following, followers if they are directly editable)

    // Handle profile picture update if a new file was uploaded.
    // `req.file` is populated by the `multer` middleware if a file with the name 'profilePicture' was sent.
    if (req.file) {
      // In a production environment, if you previously stored old profile pictures,
      // you might want to add logic here to delete the old file from your 'uploads/' directory
      // to prevent accumulating unused files. For example:
      // if (profile.profilePicture && !profile.profilePicture.includes('placehold.co')) {
      //   const oldImagePath = path.join(__dirname, '..', profile.profilePicture);
      //   fs.unlink(oldImagePath, (err) => {
      //     if (err) console.error('Failed to delete old profile picture:', err);
      //   });
      // }
      // Update the profilePicture field with the path to the newly uploaded file.
      // This path should be accessible from your frontend (e.g., via /uploads/filename).
      profile.profilePicture = `/uploads/${req.file.filename}`;
    }

    // Important for updating arrays (like badges, events, routes, challenges):
    // If you want to allow updating these arrays from the frontend,
    // you would typically send the entire updated array from the frontend in the request body.
    // Then, you can directly assign it:
    // if (req.body.badges) {
    //   profile.badges = req.body.badges; // This would replace the entire badges array
    // }
    // You would need to do this for `weeklyActivity`, `events`, `routes`, `challenges` as well
    // if their editing is implemented on the frontend.
    // Note: For complex array updates, sometimes more granular API endpoints (e.g., add/remove badge)
    // or robust frontend state management is preferred to avoid sending large arrays frequently.


    const updatedProfile = await profile.save(); // Save the changes to the database.
    res.json(updatedProfile); // Send the updated profile document back to the client.
  } else {
    // If no profile is found for the user (which shouldn't happen if they're authenticated and registered correctly),
    // send a 404 Not Found error.
    res.status(404);
    throw new Error('Profile not found for this user. Cannot update.');
  }
});

// @desc    Create user profile
// @route   POST /api/profile
// @access  Private
// This function is typically used during or right after user registration to create an initial profile.
const createProfile = asyncHandler(async (req, res) => {
  // Check if a profile already exists for the authenticated user to prevent duplicates.
  let profile = await Profile.findOne({ user: req.user.id });

  if (profile) {
    res.status(400); // Bad request status if profile already exists.
    throw new Error('Profile already exists for this user');
  }

  // Create a new profile document.
  // The 'user' field is linked to the authenticated user's ID.
  // Other fields are initialized from the request body or use default values defined in the schema.
  profile = await Profile.create({
    user: req.user.id,
    name: req.body.name || 'New Runner', // Use name from request or default
    profilePicture: req.body.profilePicture || 'https://placehold.co/150x150/cccccc/000000?text=Profile', // Use picture from request or default
    location: req.body.location || 'Unknown',
    // ... initialize other profile fields here as needed
  });

  // On successful creation, send a 201 Created status and the new profile document.
  res.status(201).json(profile);
});

module.exports = {
  getProfile,
  updateProfile,
  createProfile, // Make sure to export this new function
};
