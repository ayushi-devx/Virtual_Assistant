import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import SearchBar from '../chat/SearchBar';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/');
    window.location.reload();
  };

  const handleSearchResult = ({ result, type }) => {
    switch (type) {
      case 'chat':
        navigate(`/chat/${result._id}`);
        break;
      case 'blog':
        navigate(`/blogs`);
        break;
      case 'flashcard':
        navigate(`/flashcards`);
        break;
      case 'savedAnswer':
        navigate(`/saved-answers`);
        break;
      default:
        break;
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors
        ${theme === 'dark'
          ? 'bg-slate-900/80 border-slate-800'
          : 'bg-white/80 border-slate-200'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={handleLogoClick} className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}
            >
              INGRES
            </motion.div>
          </button>

          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <SearchBar onSelectResult={handleSearchResult} />
              </div>

              <div className="flex gap-2 items-center">
                <Link to="/chat" title="Chat">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg transition-colors ${
                      location.pathname === '/chat'
                        ? theme === 'dark'
                          ? 'bg-blue-600'
                          : 'bg-blue-100'
                        : theme === 'dark'
                        ? 'bg-slate-700 hover:bg-slate-600'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    💬
                  </motion.button>
                </Link>

                <Link to="/flashcards" title="Flashcards">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg transition-colors ${
                      location.pathname === '/flashcards'
                        ? theme === 'dark'
                          ? 'bg-blue-600'
                          : 'bg-blue-100'
                        : theme === 'dark'
                        ? 'bg-slate-700 hover:bg-slate-600'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    📚
                  </motion.button>
                </Link>

                <Link to="/blogs" title="Blogs">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg transition-colors ${
                      location.pathname === '/blogs'
                        ? theme === 'dark'
                          ? 'bg-blue-600'
                          : 'bg-blue-100'
                        : theme === 'dark'
                        ? 'bg-slate-700 hover:bg-slate-600'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    📖
                  </motion.button>
                </Link>

                <Link to="/saved-answers" title="Saved Answers">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg transition-colors ${
                      location.pathname === '/saved-answers'
                        ? theme === 'dark'
                          ? 'bg-blue-600'
                          : 'bg-blue-100'
                        : theme === 'dark'
                        ? 'bg-slate-700 hover:bg-slate-600'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    ⭐
                  </motion.button>
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    {user.isAdmin && <span className="text-xs text-purple-500">⭐ Admin</span>}
                  </div>
                </motion.button>

                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 z-50 ${
                      theme === 'dark'
                        ? 'bg-slate-800 border border-slate-700'
                        : 'bg-white border border-slate-200'
                    }`}
                  >
                    <Link
                      to="/profile"
                      className={`block px-4 py-2 hover:bg-opacity-20 transition-colors ${
                        theme === 'dark'
                          ? 'hover:bg-white'
                          : 'hover:bg-black'
                      }`}
                    >
                      Profile
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/dashboard"
                        className={`block px-4 py-2 hover:bg-opacity-20 transition-colors text-purple-500 ${
                          theme === 'dark'
                            ? 'hover:bg-white'
                            : 'hover:bg-black'
                        }`}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 hover:bg-opacity-20 transition-colors text-red-500 ${
                        theme === 'dark'
                          ? 'hover:bg-white'
                          : 'hover:bg-black'
                      }`}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
