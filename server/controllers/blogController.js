const Blog = require('../models/blogModel');
const asyncHandler = require('express-async-handler');

const createBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, category, tags, coverImage } = req.body;

  const blog = await Blog.create({
    title,
    content,
    excerpt,
    category,
    tags: tags || [],
    coverImage,
    author: req.user._id,
    isPublished: false,
  });

  res.status(201).json(blog);
});

const getBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const { category, search } = req.query;
  const userId = req.user?._id;

  let query = { 
    $or: [
      { isPublished: true },
      userId ? { author: userId } : { isPublished: true }
    ]
  };

  if (search) {
    query = {
      $and: [
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { excerpt: { $regex: search, $options: 'i' } },
            { tags: { $in: [new RegExp(search, 'i')] } },
          ]
        },
        {
          $or: [
            { isPublished: true },
            userId ? { author: userId } : { isPublished: true }
          ]
        }
      ]
    };
  }

  if (category) query.category = category;

  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'name');

  const total = await Blog.countDocuments(query);

  res.json({
    blogs,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'name email');

  if (!blog || !blog.isPublished) {
    res.status(404);
    throw new Error('Blog not found');
  }

  blog.views += 1;
  await blog.save();

  res.json(blog);
});

const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, category, tags, coverImage, isPublished } = req.body;

  let blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  if (blog.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to update this blog');
  }

  blog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      title: title || blog.title,
      content: content || blog.content,
      excerpt: excerpt || blog.excerpt,
      category: category || blog.category,
      tags: tags || blog.tags,
      coverImage: coverImage || blog.coverImage,
      isPublished: isPublished !== undefined ? isPublished : blog.isPublished,
    },
    { new: true }
  );

  res.json(blog);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  if (blog.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to delete this blog');
  }

  await Blog.findByIdAndDelete(req.params.id);

  res.json({ message: 'Blog deleted' });
});

const getAdminBlogs = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error('Only admins can access this');
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const blogs = await Blog.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'name email');

  const total = await Blog.countDocuments();

  res.json({
    blogs,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = ['Technology', 'AI', 'Campus Life', 'Study Tips', 'Other'];
  res.json({ categories });
});

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getAdminBlogs,
  getCategories,
};
