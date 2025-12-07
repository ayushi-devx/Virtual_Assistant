const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: ['Technology', 'AI', 'Campus Life', 'Study Tips', 'Other'],
      default: 'Other',
    },
    tags: [String],
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    coverImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.index({ category: 1, createdAt: -1 });
blogSchema.index({ author: 1, createdAt: -1 });

module.exports = mongoose.model('Blog', blogSchema);
