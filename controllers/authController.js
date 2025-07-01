
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/profile'); // Import the new Profile model
const asyncHandler = require('express-async-handler');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Expecting username, email, password

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the User (for authentication)
    const user = new User({ username ,email, password: hashedPassword });
    await user.save();

    // --- Create a corresponding Profile for the new user ---
    const profile = new Profile({
      user: user._id, // Link to the newly created user
      name: username, // Use the username from registration as initial profile name
      // Other default profile fields will be set by the Profile schema defaults
    });
    await profile.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // Send back user and profile data
    res.status(201).json({
      msg: 'User created successfully',
      token,
      user: { _id: user._id, email: user.email }, // Basic user info
      profile: profile // Send the newly created profile data
    });

  } catch (err) {
    console.error(err); // Log the actual error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // --- Fetch the user's associated profile ---
    const profile = await Profile.findOne({ user: user._id });

    // You might want to handle cases where a profile doesn't exist (e.g., if it wasn't created on signup for old users)
    if (!profile) {
        // Optionally, create a default profile here or send a flag to frontend
        console.warn(`Profile not found for user ${user._id}. A default might be created or frontend needs to handle.`);
        // For now, we'll send a null profile if not found, frontend should handle this.
    }

    res.status(200).json({
      token,
      user: { _id: user._id, email: user.email }, // Basic user info
      profile: profile // Send the associated profile data
      // The 'hasProfileData' logic is now implicitly handled by checking if 'profile' exists and its fields on the frontend
    });

  } catch (err) {
    console.error(err); // Log the actual error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  // Find profile by user
  const profile = await Profile.findOne({ user: user._id });
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  // Update name
  if (req.body.name) {
    profile.name = req.body.name;
  }

  // Handle image if uploaded (base64)
  if (req.file) {
    const imageBuffer = req.file.buffer;
    const base64Image = `data:${req.file.mimetype};base64,${imageBuffer.toString('base64')}`;
    profile.profilePicture = base64Image;
  }

  const updatedProfile = await profile.save();

  res.status(200).json({
    name: updatedProfile.name,
    profilePicture: updatedProfile.profilePicture,
    message: 'Profile updated successfully',
  });
});



module.exports = { signup, login ,updateUserProfile}; // Export the functions using module.exports