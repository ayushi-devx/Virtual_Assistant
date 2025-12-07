import React, { useState, useEffect, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { savedAnswerAPI } from '../services/api';

export default function SavedAnswers() {
  const { theme } = useTheme();
  const [answers, setAnswers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAnswers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await savedAnswerAPI.getSavedAnswers(1, 10, selectedCategory);
      setAnswers(response.data.savedAnswers);
    } catch (error) {
      console.error('Error fetching saved answers:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchAnswers();
    fetchCategories();
  }, [fetchAnswers]);

  const fetchCategories = async () => {
    try {
      const response = await savedAnswerAPI.getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    if (!window.confirm('Delete this saved answer?')) return;

    try {
      await savedAnswerAPI.deleteSavedAnswer(answerId);
      setAnswers(answers.filter((a) => a._id !== answerId));
    } catch (error) {
      console.error('Error deleting answer:', error);
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
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1
            className={`text-4xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            ⭐ Saved Answers
          </h1>
          <p
            className={`text-lg ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Your collection of favorite bot responses
          </p>
        </motion.div>

        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === ''
                  ? 'bg-blue-600 text-white'
                  : theme === 'dark'
                  ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : theme === 'dark'
                    ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center text-2xl">⌛</div>
        ) : answers.length === 0 ? (
          <div
            className={`text-center py-12 text-xl ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            No saved answers yet. Star your favorite bot responses to save them!
          </div>
        ) : (
          <div className="space-y-4">
            {answers.map((answer) => (
              <motion.div
                key={answer._id}
                whileHover={{ scale: 1.01 }}
                className={`p-6 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                }`}
              >
                <div className="mb-3">
                  <p
                    className={`font-semibold ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    You: {answer.chatMessage}
                  </p>
                </div>
                <div className="mb-4 pl-4 border-l-2 border-slate-500">
                  <p className={theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}>
                    Bot: {answer.botResponse}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      theme === 'dark'
                        ? 'bg-purple-900 text-purple-300'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {answer.category}
                  </span>
                  <button
                    onClick={() => handleDeleteAnswer(answer._id)}
                    className="text-red-600 hover:text-red-700 font-semibold hover:scale-110 active:scale-90 transition-all"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
