// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      default: 'New Runner',
    },
    profilePicture: {
      data: Buffer,               // Store binary data
      contentType: String         // E.g., 'image/jpeg'
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
