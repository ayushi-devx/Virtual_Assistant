const express = require('express');
const { check } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  toggleTheme,
  getStats,
} = require('../controllers/authController');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  registerUser
);

// @route   POST /api/auth/login
// @desc    Auth user & get token
// @access  Public
router.post('/login', authUser);

// @route   GET /api/auth/stats
// @desc    Get platform statistics
// @access  Public
router.get('/stats', getStats);

// Protected routes (require authentication)
router.use(protect);

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', getUserProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
  ],
  updateUserProfile
);

// @route   DELETE /api/auth/profile
// @desc    Delete user account
// @access  Private
router.delete('/profile', deleteUserAccount);

// @route   PUT /api/auth/theme
// @desc    Toggle theme (light/dark)
// @access  Private
router.put('/theme', toggleTheme);

module.exports = router;
