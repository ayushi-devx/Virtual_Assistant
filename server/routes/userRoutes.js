const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { 
  getUserProfile, 
  updateUserProfile, 
  deleteUserAccount,
  toggleTheme 
} = require('../controllers/authController');

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', getUserProfile);

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', updateUserProfile);

// @route   DELETE /api/user/profile
// @desc    Delete user account
// @access  Private
router.delete('/profile', deleteUserAccount);

// @route   PUT /api/user/theme
// @desc    Toggle theme (light/dark)
// @access  Private
router.put('/theme', toggleTheme);

module.exports = router;
