const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getAdminBlogs,
  getCategories,
} = require('../controllers/blogController');

const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    protect(req, res, next);
  } else {
    req.user = null;
    next();
  }
};

const router = express.Router();

router.get('/categories', getCategories);

router.get('/', optionalAuth, getBlogs);

router.get('/:id', getBlogById);

router.use(protect);

router.post('/', createBlog);

router.put('/:id', updateBlog);

router.delete('/:id', deleteBlog);

router.get('/admin/all', getAdminBlogs);

module.exports = router;
