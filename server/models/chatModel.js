const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    enum: ['user', 'bot']
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
      default: 'New Chat'
    },
    personality: {
      type: String,
      required: true,
      enum: ['sweet', 'angry', 'grandpa'],
      default: 'sweet'
    },
    aiProvider: {
      type: String,
      enum: ['openai', 'gemini', 'huggingface', 'cohere'],
      default: 'openai'
    },
    messages: [messageSchema],
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Add index for faster querying
chatSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Chat', chatSchema);
