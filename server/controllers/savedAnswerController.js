const SavedAnswer = require('../models/savedAnswerModel');
const asyncHandler = require('express-async-handler');

const saveBotResponse = asyncHandler(async (req, res) => {
  const { chatMessage, botResponse, chatId, category } = req.body;

  const savedAnswer = await SavedAnswer.create({
    user: req.user._id,
    chatMessage,
    botResponse,
    chatId: chatId || null,
    category: category || 'General',
    isFavorite: true,
  });

  res.status(201).json(savedAnswer);
});

const getSavedAnswers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const { category } = req.query;

  const query = { user: req.user._id, isFavorite: true };
  if (category) query.category = category;

  const savedAnswers = await SavedAnswer.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await SavedAnswer.countDocuments(query);

  res.json({
    savedAnswers,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

const getSavedAnswerById = asyncHandler(async (req, res) => {
  const savedAnswer = await SavedAnswer.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!savedAnswer) {
    res.status(404);
    throw new Error('Saved answer not found');
  }

  res.json(savedAnswer);
});

const updateSavedAnswer = asyncHandler(async (req, res) => {
  const { category } = req.body;

  let savedAnswer = await SavedAnswer.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!savedAnswer) {
    res.status(404);
    throw new Error('Saved answer not found');
  }

  savedAnswer = await SavedAnswer.findByIdAndUpdate(
    req.params.id,
    { category: category || savedAnswer.category },
    { new: true }
  );

  res.json(savedAnswer);
});

const deleteSavedAnswer = asyncHandler(async (req, res) => {
  const savedAnswer = await SavedAnswer.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!savedAnswer) {
    res.status(404);
    throw new Error('Saved answer not found');
  }

  await SavedAnswer.findByIdAndDelete(req.params.id);

  res.json({ message: 'Saved answer deleted' });
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await SavedAnswer.distinct('category', {
    user: req.user._id,
  });

  res.json({ categories });
});

module.exports = {
  saveBotResponse,
  getSavedAnswers,
  getSavedAnswerById,
  updateSavedAnswer,
  deleteSavedAnswer,
  getCategories,
};
