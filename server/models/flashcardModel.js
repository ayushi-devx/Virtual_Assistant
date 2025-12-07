const mongoose = require('mongoose');

const flashcardSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    deck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FlashcardDeck',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const deckSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ['Mathematics', 'Science', 'Language', 'History', 'Technology', 'Other'],
      default: 'Other',
    },
    flashcards: [flashcardSchema],
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

deckSchema.index({ user: 1, createdAt: -1 });

module.exports = {
  Flashcard: mongoose.model('Flashcard', flashcardSchema),
  FlashcardDeck: mongoose.model('FlashcardDeck', deckSchema),
};
