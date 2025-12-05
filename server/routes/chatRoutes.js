const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createChat,
  getChats,
  getChatById,
  addMessage,
  updateChatTitle,
  archiveChat,
  updateChatPersonality,
  updateAIProvider,
  getAIResponse,
  getAIProviders,
} = require('../controllers/chatController');

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// @route   POST /api/chat
// @desc    Create a new chat
// @access  Private
router.post('/', createChat);

// @route   GET /api/chat
// @desc    Get all chats for the authenticated user
// @access  Private
router.get('/', getChats);

// @route   GET /api/chat/:id
// @desc    Get a single chat with messages
// @access  Private
router.get('/:id', getChatById);

// @route   POST /api/chat/:id/message
// @desc    Add a message to a chat
// @access  Private
router.post('/:id/message', addMessage);

// @route   PUT /api/chat/:id/title
// @desc    Update chat title
// @access  Private
router.put('/:id/title', updateChatTitle);

// @route   PUT /api/chat/:id/personality
// @desc    Update chat personality
// @access  Private
router.put('/:id/personality', updateChatPersonality);

// @route   PUT /api/chat/:id/provider
// @desc    Update AI provider
// @access  Private
router.put('/:id/provider', updateAIProvider);

// @route   PUT /api/chat/:id/archive
// @desc    Archive a chat
// @access  Private
router.put('/:id/archive', archiveChat);

// @route   GET /api/chat/providers/list
// @desc    Get available AI providers
// @access  Private
router.get('/providers/list', getAIProviders);

// @route   POST /api/chat/:id/response
// @desc    Get AI response for a message
// @access  Private
router.post('/:id/response', getAIResponse);

module.exports = router;
