// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path'); // Import Node.js built-in path module

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
// Enable CORS with specific options
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request bodies
app.use(express.json());
// Parse cookies
app.use(cookieParser());
// Note: Removed the duplicate `app.use(express.json());` here.

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

// Serve static files from the 'uploads' directory
// This makes your uploaded profile pictures accessible via a URL like /uploads/filename.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes'); // Import your new profile routes

//const userPreferences = require ('./routes/userPreferences'); // MongoDB persistent preferences


// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes); // Mount the new profile routes at the /api/profile path


// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ API is working correctly!' });
});

// Start server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
