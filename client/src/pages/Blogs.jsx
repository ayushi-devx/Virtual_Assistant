import React, { useState, useEffect, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { blogAPI } from '../services/api';

export default function Blogs() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    coverImage: '',
  });
  const [editFormData, setEditFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    coverImage: '',
    isPublished: false,
  });

  const categories = ['Technology', 'AI', 'Campus Life', 'Study Tips'];

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await blogAPI.getBlogs(page, 10, selectedCategory, searchQuery);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategory, searchQuery]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setCreateError('');

    if (!formData.title.trim()) {
      setCreateError('Title is required');
      return;
    }
    if (!formData.excerpt.trim()) {
      setCreateError('Excerpt is required');
      return;
    }
    if (!formData.content.trim()) {
      setCreateError('Content is required');
      return;
    }

    setCreating(true);
    try {
      await blogAPI.createBlog(formData);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'Technology',
        coverImage: '',
      });
      setShowCreateModal(false);
      fetchBlogs();
    } catch (error) {
      setCreateError(error.response?.data?.message || 'Failed to create blog');
    } finally {
      setCreating(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setEditFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      coverImage: blog.coverImage || '',
      isPublished: blog.isPublished || false,
    });
    setEditError('');
    setEditSuccess('');
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const submitEditBlog = async (e) => {
    e.preventDefault();
    setEditError('');
    setEditSuccess('');
    setEditLoading(true);

    try {
      await blogAPI.updateBlog(editingBlog._id, editFormData);
      setEditSuccess('Blog updated successfully!');
      setTimeout(() => {
        setShowEditModal(false);
        setEditingBlog(null);
        fetchBlogs();
      }, 1500);
    } catch (error) {
      setEditError(error.response?.data?.message || 'Failed to update blog');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setDeleteLoading(blogId);
      try {
        await blogAPI.deleteBlog(blogId);
        setBlogs(blogs.filter((b) => b._id !== blogId));
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert(error.response?.data?.message || 'Failed to delete blog');
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
          : 'bg-gradient-to-br from-white via-blue-50 to-purple-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-start">
          <div>
            <h1
              className={`text-4xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              Blogs & Articles
            </h1>
            <p
              className={`text-lg ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Explore articles on technology, AI, campus life, and study tips
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
          >
            + Add Blog
          </motion.button>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className={`flex-1 px-4 py-2 rounded-lg border outline-none ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700 text-white'
                : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-lg border outline-none ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700 text-white'
                : 'bg-white border-slate-300 text-slate-900'
            }`}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`w-full max-w-2xl rounded-lg p-8 ${
                theme === 'dark' ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <h2
                className={`text-3xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                Create New Blog
              </h2>

              {createError && (
                <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600">
                  {createError}
                </div>
              )}

              <form onSubmit={handleCreateBlog} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="Blog title"
                    className={`w-full px-4 py-2 rounded-lg border outline-none ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 rounded-lg border outline-none ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Excerpt
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleFormChange}
                    placeholder="Brief description of your blog"
                    rows="2"
                    className={`w-full px-4 py-2 rounded-lg border outline-none resize-none ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleFormChange}
                    placeholder="Write your blog content here..."
                    rows="5"
                    className={`w-full px-4 py-2 rounded-lg border outline-none resize-none ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Cover Image URL (optional)
                  </label>
                  <input
                    type="url"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleFormChange}
                    placeholder="https://example.com/image.jpg"
                    className={`w-full px-4 py-2 rounded-lg border outline-none ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
                  >
                    {creating ? 'Creating...' : 'Create Blog'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                      theme === 'dark'
                        ? 'border-slate-600 text-white hover:bg-slate-700'
                        : 'border-slate-300 text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showEditModal && editingBlog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`w-full max-w-2xl rounded-lg p-8 my-8 ${
                theme === 'dark' ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                Edit Blog
              </h2>

              {editSuccess && (
                <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm">
                  ✅ {editSuccess}
                </div>
              )}

              {editError && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
                  ❌ {editError}
                </div>
              )}

              <form onSubmit={submitEditBlog} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 rounded-lg border outline-none ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditFormChange}
                    className={`w-full px-4 py-2 rounded-lg border outline-none ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option>Technology</option>
                    <option>AI</option>
                    <option>Campus Life</option>
                    <option>Study Tips</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Excerpt
                  </label>
                  <textarea
                    name="excerpt"
                    value={editFormData.excerpt}
                    onChange={handleEditFormChange}
                    rows="2"
                    className={`w-full px-4 py-2 rounded-lg border outline-none resize-none ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={editFormData.content}
                    onChange={handleEditFormChange}
                    rows="5"
                    className={`w-full px-4 py-2 rounded-lg border outline-none resize-none ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    name="coverImage"
                    value={editFormData.coverImage || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, coverImage: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className={`w-full px-4 py-2 rounded-lg border outline-none ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                  {editFormData.coverImage && (
                    <img src={editFormData.coverImage} alt="Cover preview" className="mt-3 rounded-lg w-full h-40 object-cover" />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={editFormData.isPublished}
                    onChange={handleEditFormChange}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="isPublished" className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Publish this blog
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="flex-1 px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
                  >
                    {editLoading ? 'Updating...' : 'Update Blog'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                      theme === 'dark'
                        ? 'border-slate-600 text-white hover:bg-slate-700'
                        : 'border-slate-300 text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {selectedBlog && (
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-8 rounded-lg mb-8 ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white'
            }`}
          >
            <button
              onClick={() => setSelectedBlog(null)}
              className="mb-4 text-blue-500 hover:underline"
            >
              ← Back to list
            </button>
            <h2
              className={`text-3xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              {selectedBlog.title}
            </h2>
            <div
              className={`text-sm mb-4 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              By {selectedBlog.author?.name} | {selectedBlog.category} | {selectedBlog.views} views
            </div>
            <div
              className={`prose max-w-none ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
          </div>
        )}

        {!selectedBlog && (
          <>
            {loading ? (
              <div className="text-center text-2xl">⌛</div>
            ) : blogs.length === 0 ? (
              <div
                className={`text-center py-12 text-xl ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                No blogs found
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {blogs.map((blog) => (
                  <motion.div
                    key={blog._id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-lg transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-800 hover:bg-slate-700 border border-slate-700'
                        : 'bg-white hover:shadow-lg border border-slate-200'
                    }`}
                  >
                    <div onClick={() => setSelectedBlog(blog)} className="cursor-pointer">
                      {blog.coverImage && (
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3
                        className={`text-xl font-bold mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {blog.title}
                      </h3>
                      <p
                        className={`text-sm mb-3 ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {blog.excerpt}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          theme === 'dark'
                            ? 'bg-blue-900 text-blue-300'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {blog.category}
                      </span>
                      <span
                        className={`text-xs ${
                          theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                        }`}
                      >
                        👁️ {blog.views}
                      </span>
                    </div>
                    {user?.isAdmin && (
                      <div className="flex gap-2 pt-2 border-t border-slate-700 dark:border-slate-600">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditBlog(blog);
                          }}
                          className={`flex-1 px-3 py-2 rounded font-semibold text-sm transition-all ${
                            theme === 'dark'
                              ? 'bg-blue-900/20 text-blue-400 hover:bg-blue-900/40'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBlog(blog._id);
                          }}
                          disabled={deleteLoading === blog._id}
                          className={`flex-1 px-3 py-2 rounded font-semibold text-sm transition-all ${
                            theme === 'dark'
                              ? 'bg-red-900/20 text-red-400 hover:bg-red-900/40'
                              : 'bg-red-100 text-red-600 hover:bg-red-200'
                          } disabled:opacity-50`}
                        >
                          {deleteLoading === blog._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
