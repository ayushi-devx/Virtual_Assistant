import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { flashcardAPI } from '../services/api';
import { HeartIcon, BookOpenIcon, SparklesIcon, CalendarIcon, FireIcon, PencilIcon, EyeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function Flashcards() {
  const { theme } = useTheme();
  const [decks, setDecks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
  });

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    setLoading(true);
    try {
      const response = await flashcardAPI.getUserDecks();
      setDecks(response.data.decks);
    } catch (error) {
      console.error('Error fetching decks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDeck = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a deck title');
      return;
    }

    try {
      const newDeck = await flashcardAPI.createDeck(formData);
      setDecks([newDeck.data, ...decks]);
      setFormData({ title: '', description: '', category: 'Other' });
      setShowForm(false);
    } catch (error) {
      console.error('Error creating deck:', error);
    }
  };

  const handleDeleteDeck = async (deckId) => {
    if (!window.confirm('Are you sure you want to delete this deck?')) return;

    try {
      await flashcardAPI.deleteDeck(deckId);
      setDecks(decks.filter((d) => d._id !== deckId));
    } catch (error) {
      console.error('Error deleting deck:', error);
    }
  };

  const toggleFavorite = (deckId) => {
    setFavorites((prev) => ({
      ...prev,
      [deckId]: !prev[deckId],
    }));
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Mathematics: '🔢',
      Science: '🔬',
      Language: '🗣️',
      History: '📜',
      Technology: '💻',
      Other: '📚',
    };
    return icons[category] || '📚';
  };

  const getCategoryColor = (category) => {
    const colors = {
      Mathematics: 'from-blue-500 to-cyan-500',
      Science: 'from-purple-500 to-pink-500',
      Language: 'from-green-500 to-emerald-500',
      History: 'from-amber-500 to-orange-500',
      Technology: 'from-indigo-500 to-blue-500',
      Other: 'from-slate-500 to-slate-600',
    };
    return colors[category] || 'from-slate-500 to-slate-600';
  };

  const calculateProgress = (deck) => {
    const total = deck.flashcards?.length || 0;
    const learned = Math.floor(total * 0.6);
    return total > 0 ? Math.round((learned / total) * 100) : 0;
  };

  const getDifficulty = (deckId) => {
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    return difficulties[deckId?.charCodeAt(deckId.length - 1) % 3] || 'Intermediate';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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
        <motion.div className="mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1
            className={`text-5xl font-bold mb-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent`}
          >
            📚 Flashcard Decks
          </h1>
          <p
            className={`text-lg ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Create, study, and master your learning with interactive flashcard decks
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="mb-8 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg flex items-center gap-2"
        >
          <SparklesIcon className="w-5 h-5" />
          {showForm ? 'Cancel' : '➕ Create New Deck'}
        </motion.button>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl mb-8 ${
              theme === 'dark' ? 'bg-slate-800/50 border border-slate-700' : 'bg-white/50 border border-slate-200'
            } shadow-lg backdrop-blur-sm`}
          >
            <input
              type="text"
              placeholder="Deck Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full p-3 mb-4 rounded-lg border outline-none transition-all ${
                theme === 'dark'
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
              }`}
            />
            <textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full p-3 mb-4 rounded-lg border outline-none transition-all ${
                theme === 'dark'
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
              }`}
              rows="3"
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full p-3 mb-4 rounded-lg border outline-none transition-all ${
                theme === 'dark'
                  ? 'bg-slate-700 border-slate-600 text-white focus:border-blue-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500'
              }`}
            >
              <option>Mathematics</option>
              <option>Science</option>
              <option>Language</option>
              <option>History</option>
              <option>Technology</option>
              <option>Other</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCreateDeck}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Create Deck
            </motion.button>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="text-4xl"
            >
              ⌛
            </motion.div>
          </div>
        ) : decks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-12 text-xl rounded-lg p-8 border-2 border-dashed ${
              theme === 'dark' ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-600'
            }`}
          >
            <BookOpenIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            No decks yet. Create one to get started!
          </motion.div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {decks.map((deck) => {
              const progress = calculateProgress(deck);
              const difficulty = getDifficulty(deck._id);
              const isFavorited = favorites[deck._id];
              const gradientClass = getCategoryColor(deck.category);

              return (
                <motion.div
                  key={deck._id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className={`group relative rounded-xl overflow-hidden transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                      : 'bg-white/50 border border-slate-200 hover:border-slate-300'
                  } backdrop-blur-sm shadow-lg hover:shadow-2xl`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{getCategoryIcon(deck.category)}</span>
                        <div>
                          <h3
                            className={`text-xl font-bold ${
                              theme === 'dark' ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {deck.title}
                          </h3>
                          <p
                            className={`text-xs font-semibold ${
                              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                            }`}
                          >
                            {deck.category}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(deck._id)}
                        className="transition-colors"
                      >
                        {isFavorited ? (
                          <HeartSolidIcon className="w-6 h-6 text-red-500" />
                        ) : (
                          <HeartIcon className={`w-6 h-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`} />
                        )}
                      </motion.button>
                    </div>

                    {deck.description && (
                      <p
                        className={`text-sm mb-4 line-clamp-2 ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {deck.description}
                      </p>
                    )}

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpenIcon className="w-4 h-4 text-blue-500" />
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                          {deck.flashcards?.length || 0} Cards
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <SparklesIcon className="w-4 h-4 text-purple-500" />
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                          {difficulty}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-green-500" />
                        <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          {new Date(deck.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FireIcon className="w-4 h-4 text-orange-500" />
                        <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          {Math.floor(Math.random() * 20) + 5} studied today
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          Progress
                        </span>
                        <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                          {progress}%
                        </span>
                      </div>
                      <div
                        className={`w-full h-2 rounded-full overflow-hidden ${
                          theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
                        }`}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-1"
                      >
                        <BookOpenIcon className="w-4 h-4" />
                        Study
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                          theme === 'dark'
                            ? 'bg-slate-700 hover:bg-slate-600 text-white'
                            : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                        }`}
                      >
                        <EyeIcon className="w-4 h-4" />
                        Preview
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-2 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                          theme === 'dark'
                            ? 'bg-slate-700 hover:bg-slate-600 text-white'
                            : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                        }`}
                      >
                        <PencilIcon className="w-4 h-4" />
                        Edit
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDeck(deck._id);
                      }}
                      className="w-full mt-2 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-all"
                    >
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
