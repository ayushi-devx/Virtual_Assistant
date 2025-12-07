import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { searchAPI } from '../../services/api';
import { useTheme } from '../../context/ThemeContext';

const SearchBar = ({ onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const performSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await searchAPI.globalSearch(query);
      setResults(response.data);
      setIsOpen(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch();
      } else {
        setResults(null);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, performSearch]);

  const handleSelectResult = (result, type) => {
    onSelectResult({ result, type });
    setQuery('');
    setResults(null);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-80">
      <div className={`relative ${theme === 'dark' ? 'bg-slate-700' : 'bg-white'} rounded-lg border ${
        theme === 'dark' ? 'border-slate-600' : 'border-slate-300'
      }`}>
        <input
          type="text"
          placeholder="Search chats, blogs, flashcards..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          className={`w-full px-4 py-2 rounded-lg outline-none ${
            theme === 'dark'
              ? 'bg-slate-700 text-white placeholder-slate-400'
              : 'bg-white text-slate-900 placeholder-slate-500'
          }`}
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5 animate-spin text-lg">⌛</div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            }`}
          >
            {results.chats?.length > 0 && (
              <div className="p-3 border-b border-slate-600">
                <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Chats
                </p>
                {results.chats.map((chat) => (
                  <motion.div
                    key={chat._id}
                    whileHover={{ x: 5 }}
                    onClick={() => handleSelectResult(chat, 'chat')}
                    className={`p-2 cursor-pointer rounded mb-1 ${
                      theme === 'dark'
                        ? 'hover:bg-slate-700 text-slate-200'
                        : 'hover:bg-slate-100 text-slate-900'
                    }`}
                  >
                    <p className="font-medium">{chat.title}</p>
                    <p className="text-xs opacity-70">Chat</p>
                  </motion.div>
                ))}
              </div>
            )}

            {results.blogs?.length > 0 && (
              <div className="p-3 border-b border-slate-600">
                <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Blogs
                </p>
                {results.blogs.map((blog) => (
                  <motion.div
                    key={blog._id}
                    whileHover={{ x: 5 }}
                    onClick={() => handleSelectResult(blog, 'blog')}
                    className={`p-2 cursor-pointer rounded mb-1 ${
                      theme === 'dark'
                        ? 'hover:bg-slate-700 text-slate-200'
                        : 'hover:bg-slate-100 text-slate-900'
                    }`}
                  >
                    <p className="font-medium">{blog.title}</p>
                    <p className="text-xs opacity-70">{blog.category}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {results.flashcards?.length > 0 && (
              <div className="p-3 border-b border-slate-600">
                <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Flashcards
                </p>
                {results.flashcards.map((deck) => (
                  <motion.div
                    key={deck._id}
                    whileHover={{ x: 5 }}
                    onClick={() => handleSelectResult(deck, 'flashcard')}
                    className={`p-2 cursor-pointer rounded mb-1 ${
                      theme === 'dark'
                        ? 'hover:bg-slate-700 text-slate-200'
                        : 'hover:bg-slate-100 text-slate-900'
                    }`}
                  >
                    <p className="font-medium">{deck.title}</p>
                    <p className="text-xs opacity-70">{deck.category}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {results.savedAnswers?.length > 0 && (
              <div className="p-3">
                <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Saved Answers
                </p>
                {results.savedAnswers.map((answer) => (
                  <motion.div
                    key={answer._id}
                    whileHover={{ x: 5 }}
                    onClick={() => handleSelectResult(answer, 'savedAnswer')}
                    className={`p-2 cursor-pointer rounded mb-1 ${
                      theme === 'dark'
                        ? 'hover:bg-slate-700 text-slate-200'
                        : 'hover:bg-slate-100 text-slate-900'
                    }`}
                  >
                    <p className="font-medium text-sm truncate">{answer.chatMessage}</p>
                    <p className="text-xs opacity-70">{answer.category}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {!results.chats?.length && !results.blogs?.length && !results.flashcards?.length && !results.savedAnswers?.length && (
              <div className={`p-4 text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                No results found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
