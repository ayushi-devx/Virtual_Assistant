const mongoose = require('mongoose');

const savedAnswerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chatMessage: {
      type: String,
      required: true,
    },
    botResponse: {
      type: String,
      required: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
    category: {
      type: String,
      default: 'General',
    },
    isFavorite: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

savedAnswerSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('SavedAnswer', savedAnswerSchema);
