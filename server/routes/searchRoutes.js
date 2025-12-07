const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  globalSearch,
  searchChats,
  searchBlogs,
  searchFlashcards,
} = require('../controllers/searchController');

const router = express.Router();

router.use(protect);

router.get('/', globalSearch);

router.get('/chats', searchChats);

router.get('/blogs', searchBlogs);

router.get('/flashcards', searchFlashcards);

module.exports = router;
