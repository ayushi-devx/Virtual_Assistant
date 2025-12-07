const Chat = require('../models/chatModel');
const Blog = require('../models/blogModel');
const SavedAnswer = require('../models/savedAnswerModel');
const { FlashcardDeck } = require('../models/flashcardModel');
const asyncHandler = require('express-async-handler');

const globalSearch = asyncHandler(async (req, res) => {
  const { query, type } = req.query;

  if (!query || query.trim().length < 2) {
    res.status(400);
    throw new Error('Search query must be at least 2 characters');
  }

  const searchRegex = new RegExp(query, 'i');
  const results = {
    chats: [],
    blogs: [],
    savedAnswers: [],
    flashcards: [],
  };

  if (!type || type === 'chat') {
    results.chats = await Chat.find({
      user: req.user._id,
      $or: [
        { title: searchRegex },
        { 'messages.text': searchRegex },
      ],
    })
      .select('title createdAt')
      .limit(5);
  }

  if (!type || type === 'blog') {
    results.blogs = await Blog.find({
      isPublished: true,
      $or: [
        { title: searchRegex },
        { excerpt: searchRegex },
        { tags: searchRegex },
      ],
    })
      .select('title excerpt category createdAt')
      .populate('author', 'name')
      .limit(5);
  }

  if (!type || type === 'savedAnswer') {
    results.savedAnswers = await SavedAnswer.find({
      user: req.user._id,
      $or: [
        { chatMessage: searchRegex },
        { botResponse: searchRegex },
        { category: searchRegex },
      ],
    })
      .select('chatMessage botResponse category createdAt')
      .limit(5);
  }

  if (!type || type === 'flashcard') {
    results.flashcards = await FlashcardDeck.find({
      user: req.user._id,
      $or: [
        { title: searchRegex },
        { 'flashcards.question': searchRegex },
        { 'flashcards.answer': searchRegex },
      ],
    })
      .select('title category')
      .limit(5);
  }

  res.json(results);
});

const searchChats = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    res.status(400);
    throw new Error('Search query is required');
  }

  const searchRegex = new RegExp(query, 'i');

  const chats = await Chat.find({
    user: req.user._id,
    $or: [
      { title: searchRegex },
      { 'messages.text': searchRegex },
    ],
  })
    .select('title createdAt updatedAt')
    .sort({ updatedAt: -1 })
    .limit(20);

  res.json(chats);
});

const searchBlogs = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    res.status(400);
    throw new Error('Search query is required');
  }

  const searchRegex = new RegExp(query, 'i');

  const blogs = await Blog.find({
    isPublished: true,
    $or: [
      { title: searchRegex },
      { excerpt: searchRegex },
      { content: searchRegex },
      { tags: searchRegex },
    ],
  })
    .select('title excerpt category createdAt')
    .populate('author', 'name')
    .sort({ createdAt: -1 })
    .limit(20);

  res.json(blogs);
});

const searchFlashcards = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    res.status(400);
    throw new Error('Search query is required');
  }

  const searchRegex = new RegExp(query, 'i');

  const decks = await FlashcardDeck.find({
    user: req.user._id,
    $or: [
      { title: searchRegex },
      { 'flashcards.question': searchRegex },
      { 'flashcards.answer': searchRegex },
    ],
  })
    .select('title category')
    .sort({ createdAt: -1 })
    .limit(20);

  res.json(decks);
});

module.exports = {
  globalSearch,
  searchChats,
  searchBlogs,
  searchFlashcards,
};
