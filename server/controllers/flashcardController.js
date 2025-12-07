const { FlashcardDeck, Flashcard } = require('../models/flashcardModel');
const asyncHandler = require('express-async-handler');

const createDeck = asyncHandler(async (req, res) => {
  const { title, description, category, isPublic } = req.body;

  const deck = await FlashcardDeck.create({
    user: req.user._id,
    title,
    description,
    category,
    isPublic: isPublic || false,
    flashcards: [],
  });

  res.status(201).json(deck);
});

const getUserDecks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const decks = await FlashcardDeck.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-flashcards');

  const total = await FlashcardDeck.countDocuments({ user: req.user._id });

  res.json({
    decks,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

const getDeckById = asyncHandler(async (req, res) => {
  const deck = await FlashcardDeck.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!deck) {
    res.status(404);
    throw new Error('Flashcard deck not found');
  }

  res.json(deck);
});

const addFlashcard = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;
  const { id: deckId } = req.params;

  const deck = await FlashcardDeck.findOne({
    _id: deckId,
    user: req.user._id,
  });

  if (!deck) {
    res.status(404);
    throw new Error('Flashcard deck not found');
  }

  const flashcard = {
    question,
    answer,
  };

  deck.flashcards.push(flashcard);
  const updated = await deck.save();

  res.status(201).json(updated.flashcards[updated.flashcards.length - 1]);
});

const updateFlashcard = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;
  const { deckId, cardId } = req.params;

  const deck = await FlashcardDeck.findOne({
    _id: deckId,
    user: req.user._id,
  });

  if (!deck) {
    res.status(404);
    throw new Error('Flashcard deck not found');
  }

  const card = deck.flashcards.id(cardId);
  if (!card) {
    res.status(404);
    throw new Error('Flashcard not found');
  }

  card.question = question || card.question;
  card.answer = answer || card.answer;

  await deck.save();
  res.json(card);
});

const deleteFlashcard = asyncHandler(async (req, res) => {
  const { deckId, cardId } = req.params;

  const deck = await FlashcardDeck.findOne({
    _id: deckId,
    user: req.user._id,
  });

  if (!deck) {
    res.status(404);
    throw new Error('Flashcard deck not found');
  }

  deck.flashcards.id(cardId).deleteOne();
  await deck.save();

  res.json({ message: 'Flashcard deleted' });
});

const updateDeck = asyncHandler(async (req, res) => {
  const { title, description, category, isPublic } = req.body;

  const deck = await FlashcardDeck.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { title, description, category, isPublic },
    { new: true }
  );

  if (!deck) {
    res.status(404);
    throw new Error('Flashcard deck not found');
  }

  res.json(deck);
});

const deleteDeck = asyncHandler(async (req, res) => {
  const deck = await FlashcardDeck.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!deck) {
    res.status(404);
    throw new Error('Flashcard deck not found');
  }

  res.json({ message: 'Flashcard deck deleted' });
});

const getPublicDecks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const { category } = req.query;

  const query = { isPublic: true };
  if (category) query.category = category;

  const decks = await FlashcardDeck.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-flashcards')
    .populate('user', 'name');

  const total = await FlashcardDeck.countDocuments(query);

  res.json({
    decks,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

module.exports = {
  createDeck,
  getUserDecks,
  getDeckById,
  addFlashcard,
  updateFlashcard,
  deleteFlashcard,
  updateDeck,
  deleteDeck,
  getPublicDecks,
};
