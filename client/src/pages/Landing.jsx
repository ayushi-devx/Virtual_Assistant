import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/chat');
    return null;
  }

  const features = [
    {
      emoji: '💖',
      title: 'Sweet Bot',
      description: 'Warm, supportive, and encouraging AI assistant',
    },
    {
      emoji: '😤',
      title: 'Angry Bot',
      description: 'Sarcastic, witty, and direct problem solver',
    },
    {
      emoji: '🧓',
      title: 'Grandpa Bot',
      description: 'Wise, nostalgic, and deeply thoughtful advisor',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
          : 'bg-gradient-to-br from-white via-blue-50 to-purple-50'
      }`}
    >
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`border-b transition-colors ${
          theme === 'dark'
            ? 'bg-slate-900/50 border-slate-800'
            : 'bg-white/50 border-slate-200'
        } backdrop-blur-md sticky top-0 z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              INGRES
            </motion.div>
            <div className="flex gap-4">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={itemVariants}>
            <h1
              className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              Meet Your AI Assistant with
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {' '}
                Personality
              </span>
            </h1>
            <p
              className={`text-xl mb-8 leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Experience conversations like never before. Choose your favorite AI personality and enjoy a truly unique chat experience with INGRES AI.
            </p>
            <div className="flex gap-4">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all border-2 ${
                    theme === 'dark'
                      ? 'border-slate-700 text-white hover:bg-slate-800'
                      : 'border-blue-500 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Sign In
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className={`rounded-3xl overflow-hidden shadow-2xl border ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
              }`}
            >
              <div
                className={`p-8 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900'
                    : 'bg-gradient-to-br from-blue-100 to-purple-100'
                }`}
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`p-4 rounded-2xl max-w-xs ${
                      theme === 'dark'
                        ? 'bg-slate-700'
                        : 'bg-white/50 backdrop-blur'
                    }`}
                  >
                    <p className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
                      Hey! Need help with something?
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-end"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl max-w-xs">
                      <p>Of course! What can I help you with? 💖</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className={`p-4 rounded-2xl max-w-xs ${
                      theme === 'dark'
                        ? 'bg-slate-700'
                        : 'bg-white/50 backdrop-blur'
                    }`}
                  >
                    <p className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
                      I want to learn coding
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <h2
            className={`text-4xl font-bold text-center mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Choose Your Favorite Personality
          </h2>
          <p
            className={`text-center text-xl mb-12 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Each personality brings a unique perspective to every conversation
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className={`rounded-2xl p-8 text-center backdrop-blur-xl border transition-all shadow-lg hover:shadow-2xl ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
                    : 'bg-white/50 border-white hover:border-slate-200'
                }`}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className="text-6xl mb-4"
                >
                  {feature.emoji}
                </motion.div>
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features List */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-2 gap-8 mt-20"
        >
          <div
            className={`rounded-2xl p-8 backdrop-blur-xl border ${
              theme === 'dark'
                ? 'bg-slate-800/50 border-slate-700/50'
                : 'bg-white/50 border-white'
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              ✨ Key Features
            </h3>
            <ul
              className={`space-y-3 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <li>🤖 Switch personalities anytime</li>
              <li>💾 Chat history saved forever</li>
              <li>🌙 Dark mode support</li>
              <li>📱 Fully responsive design</li>
              <li>⚡ Lightning fast responses</li>
              <li>🔐 Secure authentication</li>
            </ul>
          </div>

          <div
            className={`rounded-2xl p-8 backdrop-blur-xl border ${
              theme === 'dark'
                ? 'bg-slate-800/50 border-slate-700/50'
                : 'bg-white/50 border-white'
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              🚀 Why Choose INGRES?
            </h3>
            <ul
              className={`space-y-3 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <li>Premium UI with smooth animations</li>
              <li>Multiple personality options</li>
              <li>Personalized chat experience</li>
              <li>Professional design</li>
              <li>Privacy-focused</li>
              <li>Free to use</li>
            </ul>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="text-center mt-20"
        >
          <h2
            className={`text-4xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Ready to Experience AI with Personality?
          </h2>
          <p
            className={`text-xl mb-8 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Join thousands of users enjoying personalized AI conversations
          </p>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Start Your Journey Now
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className={`border-t mt-20 transition-colors ${
          theme === 'dark'
            ? 'bg-slate-900/50 border-slate-800'
            : 'bg-white/50 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p
              className={`${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              © 2025 INGRES AI. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
