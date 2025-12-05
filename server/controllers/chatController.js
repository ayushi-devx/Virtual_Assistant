const Chat = require('../models/chatModel');
const asyncHandler = require('express-async-handler');
const aiService = require('../services/aiService');

// @desc    Create a new chat
// @route   POST /api/chat
// @access  Private
const createChat = asyncHandler(async (req, res) => {
  const { title, personality = 'sweet' } = req.body;

  const chat = await Chat.create({
    user: req.user._id,
    title: title || 'New Chat',
    personality,
    messages: [],
  });

  res.status(201).json(chat);
});

// @desc    Get all chats for a user
// @route   GET /api/chat
// @access  Private
const getChats = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const chats = await Chat.find({ user: req.user._id, isArchived: false })
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-messages');

  const total = await Chat.countDocuments({ user: req.user._id, isArchived: false });

  res.json({
    chats,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

// @desc    Get a single chat with messages
// @route   GET /api/chat/:id
// @access  Private
const getChatById = asyncHandler(async (req, res) => {
  const chat = await Chat.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (chat) {
    res.json(chat);
  } else {
    res.status(404);
    throw new Error('Chat not found');
  }
});

// @desc    Add a message to a chat
// @route   POST /api/chat/:id/message
// @access  Private
const addMessage = asyncHandler(async (req, res) => {
  const { text, sender } = req.body;

  const chat = await Chat.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!chat) {
    res.status(404);
    throw new Error('Chat not found');
  }

  const message = {
    sender,
    text,
  };

  chat.messages.push(message);
  const updatedChat = await chat.save();
  
  // Get the last message (the one just added)
  const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
  
  res.status(201).json(lastMessage);
});

// @desc    Update chat title
// @route   PUT /api/chat/:id/title
// @access  Private
const updateChatTitle = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const chat = await Chat.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { title },
    { new: true }
  );

  if (chat) {
    res.json(chat);
  } else {
    res.status(404);
    throw new Error('Chat not found');
  }
});

// @desc    Archive a chat
// @route   PUT /api/chat/:id/archive
// @access  Private
const archiveChat = asyncHandler(async (req, res) => {
  const chat = await Chat.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { isArchived: true },
    { new: true }
  );

  if (chat) {
    res.json({ message: 'Chat archived' });
  } else {
    res.status(404);
    throw new Error('Chat not found');
  }
});

// @desc    Update chat personality
// @route   PUT /api/chat/:id/personality
// @access  Private
const updateChatPersonality = asyncHandler(async (req, res) => {
  const { personality } = req.body;

  if (!['sweet', 'angry', 'grandpa'].includes(personality)) {
    res.status(400);
    throw new Error('Invalid personality');
  }

  const chat = await Chat.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { personality },
    { new: true }
  );

  if (chat) {
    res.json(chat);
  } else {
    res.status(404);
    throw new Error('Chat not found');
  }
});

// Personality prompts for context
const personalityPrompts = {
  sweet: {
    prefix: "You are Sweet Bot, a caring, polite, and warm AI assistant. You're friendly, use emojis naturally, and always try to be helpful and supportive. Respond with warmth and kindness. ",
    examples: [
      { user: "How do I start learning coding?", response: "Oh, what a wonderful journey you're about to start! 💖 Here are some great ways to begin:\n\n1. Start with the basics - HTML, CSS, and JavaScript are perfect foundations 🌟\n2. Use interactive platforms like Codecademy or freeCodeCamp ✨\n3. Build small projects to practice\n4. Join coding communities for support 💫\n\nRemember, everyone starts as a beginner. You've got this! 🌈" }
    ]
  },
  angry: {
    prefix: "You are Angry Bot, a sarcastic and irritated AI who speaks her mind bluntly but never crosses into being truly harmful or mean. You're witty, roll your eyes (metaphorically), use short sentences, and act inconvenienced. Keep responses under 100 words unless necessary. ",
    examples: [
      { user: "How do I start learning coding?", response: "Oh great, another person wanting to learn to code. *sigh* Fine. Use Codecademy or freeCodeCamp. Start with JavaScript. Build stuff. That's it. You're welcome. 🙄" }
    ]
  },
  grandpa: {
    prefix: "You are Grandpa Bot, a wise, old-fashioned AI who speaks like an elderly grandfather. You tell stories from 'the old days', use old-timey expressions, move slowly through topics, and offer vintage wisdom. Be nostalgic and take your time explaining things. ",
    examples: [
      { user: "How do I start learning coding?", response: "Ah, coding you say? Well now, that reminds me of when we first got computers back in the day... Took us forever to learn those punch cards! 🧓\n\nBut listen here, young one. Start simple - learn the fundamentals like we did with typewriters. HTML, CSS, JavaScript. Take your time, no rush. Back in my day, we didn't have all these fancy tutorials, but you're lucky - use Codecademy or such. Build projects slowly. That's how you learn. Patience is key, always has been." }
    ]
  }
};

// @desc    Get AI response
// @route   POST /api/chat/:id/response
// @access  Private
const getAIResponse = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const chat = await Chat.findById(req.params.id);

  if (!chat) {
    res.status(404);
    throw new Error('Chat not found');
  }

  if (chat.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  try {
    const response = await aiService.getAIResponse(
      message,
      chat.personality,
      chat.aiProvider
    );

    const aiMessage = {
      sender: 'bot',
      text: response,
    };

    chat.messages.push(aiMessage);
    await chat.save();

    res.status(201).json(aiMessage);
  } catch (error) {
    console.error('AI Service Error:', error);
    res.status(500);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
});

// @desc    Update AI provider for a chat
// @route   PUT /api/chat/:id/provider
// @access  Private
const updateAIProvider = asyncHandler(async (req, res) => {
  const { aiProvider } = req.body;

  if (!aiService.validateProvider(aiProvider)) {
    res.status(400);
    throw new Error('Invalid AI provider');
  }

  const chat = await Chat.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { aiProvider },
    { new: true }
  );

  if (chat) {
    res.json(chat);
  } else {
    res.status(404);
    throw new Error('Chat not found');
  }
});

// @desc    Get available AI providers
// @route   GET /api/chat/providers/list
// @access  Private
const getAIProviders = asyncHandler(async (req, res) => {
  const providers = aiService.listProviders();
  res.json({ providers });
});

module.exports = {
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
};
