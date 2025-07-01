const express = require("express");
const multer = require("multer");

const {
  signup,
  login,
  updateUserProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// 🧠 Use memory storage to avoid saving files to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- ROUTES ---

// Signup & Login
router.post("/signup", signup);
router.post("/login", login);

// Profile update (name + image in memory)
router.put("/profile", protect, upload.single("profilePicture"), updateUserProfile);

module.exports = router;
