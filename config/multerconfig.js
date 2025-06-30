// config/multerConfig.js

const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Node's file system module

// Define the destination directory for uploads
const uploadDir = 'uploads/';

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Call the callback with the destination directory
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Generate a unique filename using the current timestamp and original extension
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Check file type to allow only images
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only image files (JPEG, JPG, PNG, GIF) are allowed!');
  }
}

// Initialize upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

module.exports = upload;
