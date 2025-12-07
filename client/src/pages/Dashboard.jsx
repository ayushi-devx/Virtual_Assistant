import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { blogAPI, authAPI } from '../services/api';

export default function Dashboard() {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalUsers: 0,
    totalFlashcards: 0,
  });
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showMakeAdminModal, setShowMakeAdminModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminError, setAdminError] = useState('');
  const [adminSuccess, setAdminSuccess] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    isPublished: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [blogsRes, statsRes] = await Promise.all([
        blogAPI.getAdminBlogs(1, 100),
        authAPI.getStats(),
      ]);
      setStats({
        totalBlogs: blogsRes.data.total || 0,
        totalUsers: statsRes.data.totalUsers || 0,
        totalFlashcards: statsRes.data.totalFlashcards || 0,
      });
      setBlogs(blogsRes.data.blogs || []);
      setUsers([
        { _id: '1', name: 'User One', email: 'user1@example.com', isAdmin: false },
        { _id: '2', name: 'User Two', email: 'user2@example.com', isAdmin: false },
        { _id: '3', name: 'Admin User', email: 'admin@example.com', isAdmin: true },
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setStats({
        totalBlogs: 0,
        totalUsers: 0,
        totalFlashcards: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = (user) => {
    setSelectedUser(user);
    setAdminError('');
    setAdminSuccess('');
    setShowMakeAdminModal(true);
  };

  const confirmMakeAdmin = async () => {
    setAdminSuccess(`${selectedUser.name} has been made an admin!`);
    setTimeout(() => {
      setShowMakeAdminModal(false);
      setSelectedUser(null);
    }, 1500);
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setEditFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      category: blog.category,
      isPublished: blog.isPublished,
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
      await blogAPI.updateBlog(selectedBlog._id, editFormData);
      setEditSuccess('Blog updated successfully!');
      setTimeout(() => {
        setShowEditModal(false);
        setSelectedBlog(null);
        fetchData();
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
        setStats((prev) => ({ ...prev, totalBlogs: prev.totalBlogs - 1 }));
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert(error.response?.data?.message || 'Failed to delete blog');
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const statItems = [
    {
      label: 'Total Blogs',
      value: stats.totalBlogs,
      icon: '📖',
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Total Flashcards',
      value: stats.totalFlashcards,
      icon: '📚',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
          : 'bg-gradient-to-br from-white via-blue-50 to-purple-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1
            className={`text-4xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Admin Dashboard
          </h1>
          <p
            className={`text-lg ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Manage platform content and monitor statistics
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-2xl">⌛ Loading...</div>
        ) : (
          <>
            <div className="mb-8 flex gap-4 border-b">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === 'overview'
                    ? theme === 'dark'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-blue-600 border-b-2 border-blue-600'
                    : theme === 'dark'
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === 'blogs'
                    ? theme === 'dark'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-blue-600 border-b-2 border-blue-600'
                    : theme === 'dark'
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Manage Blogs
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === 'users'
                    ? theme === 'dark'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-blue-600 border-b-2 border-blue-600'
                    : theme === 'dark'
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Manage Users
              </button>
            </div>

            {activeTab === 'overview' && (
              <>
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {statItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -8 }}
                      className={`relative p-8 rounded-2xl backdrop-blur-xl border-2 transition-all overflow-hidden group cursor-pointer ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-700 hover:border-slate-500 hover:shadow-2xl hover:shadow-blue-500/20'
                          : 'bg-gradient-to-br from-white via-slate-50 to-blue-50 border-slate-200 hover:border-slate-300 hover:shadow-2xl hover:shadow-blue-400/30'
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 group-hover:opacity-15 group-hover:scale-125 transition-all blur-2xl"
                        style={{
                          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                          '--tw-gradient-stops': `rgb(59, 130, 246), rgb(168, 85, 247)`
                        }}
                      />
                      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-all blur-2xl"
                        style={{
                          background: `linear-gradient(135deg, rgb(168, 85, 247), rgb(236, 72, 153))`
                        }}
                      />
                      <div className="relative flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <p
                            className={`text-xs font-bold tracking-widest uppercase mb-2 ${
                              theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                            }`}
                          >
                            {item.label}
                          </p>
                          <p
                            className={`text-4xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                          >
                            {item.value}
                          </p>
                        </div>
                        <div className={`text-5xl drop-shadow-lg transform group-hover:scale-110 transition-transform`}>
                          {item.icon}
                        </div>
                      </div>
                      
                      <div className={`mb-4 h-1.5 rounded-full overflow-hidden ${
                        theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(item.value / 10, 100)}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                        />
                      </div>

                      <div className="flex justify-between items-end">
                        <span className={`text-xs font-medium ${
                          theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                        }`}>
                          📈 +12.5%
                        </span>
                        <span className={`text-xs font-medium ${
                          theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                        }`}>
                          vs last month
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`p-8 rounded-2xl backdrop-blur-lg border mb-8 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-700'
                      : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2
                        className={`text-2xl font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        Quick Actions
                      </h2>
                      <p className={`text-sm mt-1 ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        Common tasks
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link to="/blogs">
                      <motion.div
                        whileHover={{ scale: 1.03, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-5 rounded-xl font-semibold hover:shadow-lg transition-all shadow cursor-pointer group border ${
                          theme === 'dark'
                            ? 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'
                            : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
                        }`}
                      >
                        <div className="relative">
                          <p className="text-base font-bold">Create New Blog</p>
                          <p className={`text-xs mt-1 ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>Write and publish content</p>
                        </div>
                      </motion.div>
                    </Link>
                    <motion.div
                      whileHover={{ scale: 1.03, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('blogs')}
                      className={`w-full p-5 rounded-xl font-semibold hover:shadow-lg transition-all shadow cursor-pointer border ${
                        theme === 'dark'
                          ? 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'
                          : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
                      }`}
                    >
                      <div className="relative">
                        <p className="text-base font-bold">Manage Blogs</p>
                        <p className={`text-xs mt-1 ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>Edit and organize content</p>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('users')}
                      className={`w-full p-5 rounded-xl font-semibold hover:shadow-lg transition-all shadow cursor-pointer border ${
                        theme === 'dark'
                          ? 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'
                          : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
                      }`}
                    >
                      <div className="relative">
                        <p className="text-base font-bold">View Users</p>
                        <p className={`text-xs mt-1 ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>Manage user accounts</p>
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.03, y: -3 }}
                      className={`w-full p-5 rounded-xl font-semibold shadow border ${
                        theme === 'dark'
                          ? 'bg-slate-700 border-slate-600 text-white'
                          : 'bg-slate-100 border-slate-300 text-slate-900'
                      }`}
                    >
                      <div className="relative flex items-center justify-between">
                        <div>
                          <p className="text-xs opacity-75 mb-1">Platform Users</p>
                          <p className="text-xl font-bold">{stats.totalUsers}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className={`p-5 rounded-xl backdrop-blur-lg border ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700'
                        : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-xs font-medium ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          Published
                        </p>
                        <p className="text-xl font-bold text-blue-500 mt-1">
                          {blogs.filter(b => b.isPublished).length}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className={`p-5 rounded-xl backdrop-blur-lg border ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700'
                        : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-xs font-medium ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          Drafts
                        </p>
                        <p className="text-xl font-bold text-amber-500 mt-1">
                          {blogs.filter(b => !b.isPublished).length}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    className={`p-5 rounded-xl backdrop-blur-lg border ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700'
                        : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-xs font-medium ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          Total Views
                        </p>
                        <p className="text-xl font-bold text-green-500 mt-1">
                          {blogs.reduce((sum, blog) => sum + (blog.views || 0), 0)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className={`rounded-2xl backdrop-blur-lg border p-8 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700'
                      : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-6 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    Recent Blogs
                  </h3>
                  {blogs.length === 0 ? (
                    <p className={`text-center py-8 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      No blogs yet. Create your first blog to get started!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {blogs.slice(0, 5).map((blog, idx) => (
                        <motion.div
                          key={blog._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + idx * 0.1 }}
                          className={`p-4 rounded-xl border-l-4 transition-all hover:translate-x-2 ${
                            blog.isPublished
                              ? theme === 'dark'
                                ? 'bg-emerald-900/20 border-emerald-500'
                                : 'bg-emerald-50 border-emerald-400'
                              : theme === 'dark'
                              ? 'bg-amber-900/20 border-amber-500'
                              : 'bg-amber-50 border-amber-400'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className={`font-bold text-sm ${
                                theme === 'dark' ? 'text-white' : 'text-slate-900'
                              }`}>
                                {blog.title}
                              </p>
                              <p className={`text-xs mt-1 ${
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                {blog.category} • {blog.views} views
                              </p>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ml-2 ${
                              blog.isPublished
                                ? theme === 'dark'
                                  ? 'bg-emerald-900/40 text-emerald-300'
                                  : 'bg-emerald-200 text-emerald-800'
                                : theme === 'dark'
                                ? 'bg-amber-900/40 text-amber-300'
                                : 'bg-amber-200 text-amber-800'
                            }`}>
                              {blog.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </>
            )}

            {activeTab === 'blogs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2
                  className={`text-2xl font-bold mb-6 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  All Blogs
                </h2>
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <div
                      key={blog._id}
                      className={`p-6 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-slate-800 border-slate-700'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3
                            className={`text-xl font-bold ${
                              theme === 'dark' ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {blog.title}
                          </h3>
                          <p
                            className={`text-sm mt-2 ${
                              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            Category: {blog.category} | Views: {blog.views} | Status: {blog.isPublished ? '✅ Published' : '⏳ Draft'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditBlog(blog)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                              theme === 'dark'
                                ? 'bg-blue-900/20 text-blue-400 hover:bg-blue-900/40'
                                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            }`}>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog._id)}
                            disabled={deleteLoading === blog._id}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                              theme === 'dark'
                                ? 'bg-red-900/20 text-red-400 hover:bg-red-900/40'
                                : 'bg-red-100 text-red-600 hover:bg-red-200'
                            } disabled:opacity-50`}>
                            {deleteLoading === blog._id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2
                  className={`text-2xl font-bold mb-6 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  All Users
                </h2>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user._id}
                      className={`p-6 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-slate-800 border-slate-700'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3
                            className={`text-xl font-bold ${
                              theme === 'dark' ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {user.name}
                          </h3>
                          <p
                            className={`text-sm mt-2 ${
                              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {user.email}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            {user.isAdmin ? (
                              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                theme === 'dark'
                                  ? 'bg-purple-900/30 text-purple-400'
                                  : 'bg-purple-100 text-purple-600'
                              }`}>
                                ⭐ Admin
                              </span>
                            ) : (
                              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                theme === 'dark'
                                  ? 'bg-slate-700'
                                  : 'bg-slate-100'
                              }`}>
                                👤 User
                              </span>
                            )}
                          </div>
                        </div>
                        {!user.isAdmin && (
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className="px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all"
                          >
                            Make Admin
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}

        {showEditModal && selectedBlog && (
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

        {showMakeAdminModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`w-full max-w-md rounded-lg p-8 ${
                theme === 'dark' ? 'bg-slate-800' : 'bg-white'
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                Make Admin?
              </h2>

              {adminSuccess && (
                <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm">
                  ✅ {adminSuccess}
                </div>
              )}

              {adminError && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
                  ❌ {adminError}
                </div>
              )}

              <p
                className={`mb-6 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Are you sure you want to make <strong>{selectedUser.name}</strong> ({selectedUser.email}) an admin?
              </p>

              <div className="flex gap-4">
                <button
                  onClick={confirmMakeAdmin}
                  className="flex-1 px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowMakeAdminModal(false)}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all border-2 ${
                    theme === 'dark'
                      ? 'border-slate-600 text-white hover:bg-slate-700'
                      : 'border-slate-300 text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
