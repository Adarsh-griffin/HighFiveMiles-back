// models/Profile.js

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema(
  {
    // Link to the User model, ensuring a one-to-one relationship
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Refers to the 'User' model
      unique: true, // Ensures one profile per user
    },
    // Profile-specific fields
    name: {
      type: String,
      required: [true, 'Please add a name'], // Name is now required for the profile
      trim: true,
      default: 'New Runner', // Default name for new profiles
    },
    profilePicture: {
      type: String, // Stores the URL of the profile picture
      default: 'https://placehold.co/150x150/cccccc/000000?text=Profile', // Default placeholder
    },
    location: {
      type: String,
      default: 'Unknown',
    },
    following: {
      type: Number,
      default: 0,
    },
    followers: {
      type: Number,
      default: 0,
    },
    // --- Detailed profile data from your frontend mock data ---
    monthlyGoal: {
      type: Number,
      default: 0,
    },
    badges: [
      {
        id: { type: Number, required: true },
        iconClass: { type: String, required: true },
        color: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    weeklyActivity: [
      {
        day: { type: String, required: true },
        value: { type: Number, required: true },
      },
    ],
    events: [
      {
        id: { type: Number, required: true },
        day: { type: Number, required: true },
        month: { type: String, required: true },
        name: { type: String, required: true },
        location: { type: String, required: true },
        registered: { type: Boolean, default: false },
      },
    ],
    yearlyStats: {
      distance: { type: String, default: '0 km' },
      runs: { type: Number, default: 0 },
      pace: { type: String, default: '0:00 min/km' },
      calories: { type: String, default: '0' },
      elevation: { type: String, default: '0 m' },
    },
    routes: [
      {
        id: { type: Number, required: true },
        iconClass: { type: String, required: true },
        color: { type: String, required: true },
        name: { type: String, required: true },
        distance: { type: String, required: true },
        terrain: { type: String, required: true },
        difficulty: { type: String, required: true },
      },
    ],
    challenges: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        progress: { type: Number, default: 0 },
        total: { type: Number, required: true },
        unit: { type: String, required: true },
        start: { type: String, required: true },
        end: { type: String, required: true },
        color: { type: String, required: true },
      },
    ],
    // You might also want to add a field for activity posts if you plan to store them
    // posts: [
    //   {
    //     content: String,
    //     likes: Number,
    //     comments: [{ user: mongoose.Schema.Types.ObjectId, text: String, createdAt: Date }],
    //     createdAt: { type: Date, default: Date.now }
    //   }
    // ]
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically for the profile
  }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
