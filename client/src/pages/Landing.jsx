import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import TypingAnimation from '../components/common/TypingAnimation';
import Accordion from '../components/common/Accordion';

export default function Landing() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById('features');
      const faqSection = document.getElementById('faq');

      if (featuresSection && faqSection) {
        const featuresRect = featuresSection.getBoundingClientRect();
        const faqRect = faqSection.getBoundingClientRect();

        if (faqRect.top < window.innerHeight / 2) {
          setActiveSection('faq');
        } else if (featuresRect.top < window.innerHeight / 2) {
          setActiveSection('features');
        } else {
          setActiveSection('home');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqItems = [
    {
      title: '💬 How do I switch between personalities?',
      content: 'After logging in, you can switch between Sweet Bot, Angry Bot, and Grandpa Bot anytime during your chat. Each personality has a unique way of responding to your questions and can be changed on the fly!',
    },
    {
      title: '💾 Is my chat history saved?',
      content: 'Yes! All your chats are automatically saved to your account. You can access your chat history anytime by logging in. Each chat is organized by date and you can search through your previous conversations.',
    },
    {
      title: '🌙 Do you support dark mode?',
      content: 'Absolutely! INGRES AI comes with full dark mode support. You can toggle between light and dark themes using the theme button in the navigation bar. Your preference is saved for future visits.',
    },
    {
      title: '🔐 Is my data safe?',
      content: 'Your privacy and security are our top priorities. All data is encrypted and securely stored on our servers. We never share your personal information with third parties.',
    },
    {
      title: '🎤 How does the voice feature work?',
      content: 'You can use your microphone to send voice messages directly in the chat. The bot responses can also be played aloud using text-to-speech. Just click the microphone icon in the chat to get started.',
    },
    {
      title: '📱 Can I use INGRES on mobile?',
      content: 'Yes! INGRES AI is fully responsive and works seamlessly on desktop, tablet, and mobile devices. You can chat with your AI assistant anytime, anywhere.',
    },
  ];

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
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80"
            >
              INGRES
            </motion.button>

            <div className="hidden md:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeSection === 'features'
                    ? 'text-white bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700'
                    : theme === 'dark'
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Features
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeSection === 'faq'
                    ? 'text-white bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700'
                    : theme === 'dark'
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                FAQ
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  theme === 'dark'
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Contact
              </motion.button>
              <Link to="/chat">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    theme === 'dark'
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Chat
                </motion.button>
              </Link>
              <Link to="/blogs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    theme === 'dark'
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Blogs
                </motion.button>
              </Link>
              <Link to="/flashcards">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    theme === 'dark'
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Flashcards
                </motion.button>
              </Link>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    theme === 'dark'
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Admin
                </motion.button>
              </Link>
            </div>

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
              Meet Your AI Assistant with Personality
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              >
                <TypingAnimation 
                  text=""
                  names={['— Ayushi', 'with Aikansh', 'with Tanya']}
                  className=""
                  nameClassName="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                />
              </motion.span>
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
              animate={{ y: [0, -10, 0], rotateZ: [0, 2, -2, 0] }}
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

        {/* Advanced Features Section */}
        <motion.div
          id="features"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <h2
            className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Advanced Features
          </h2>
          <p
            className={`text-center text-lg mb-12 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Discover powerful tools to enhance your learning and productivity
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/flashcards">
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full rounded-2xl p-8 transition-all cursor-pointer group h-full border ${
                  theme === 'dark'
                    ? 'bg-slate-800/40 border-slate-700/50 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20'
                    : 'bg-slate-50/40 border-slate-200/50 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-400/20'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-emerald-500/20'
                    : 'bg-emerald-100'
                }`}>
                  <svg className="w-7 h-7 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-11h-2v7h2v-7zm4 0h-2v4h2v-4zM8 12h-2v2h2v-2z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>Flashcards</h3>
                <p className={`${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Create and study with interactive flashcard decks organized by categories. Perfect for learning and retention!
                </p>
              </motion.div>
            </Link>

            <Link to="/blogs">
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full rounded-2xl p-8 transition-all cursor-pointer group h-full border ${
                  theme === 'dark'
                    ? 'bg-slate-800/40 border-slate-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20'
                    : 'bg-slate-50/40 border-slate-200/50 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-400/20'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-blue-500/20'
                    : 'bg-blue-100'
                }`}>
                  <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm2 4v2h12V6H6zm0 4v2h12v-2H6zm0 4v2h8v-2H6z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>Blogs & Articles</h3>
                <p className={`${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Explore curated articles on Technology, AI, Campus Life, and Study Tips from the community.
                </p>
              </motion.div>
            </Link>

            <Link to="/saved-answers">
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full rounded-2xl p-8 transition-all cursor-pointer group h-full border ${
                  theme === 'dark'
                    ? 'bg-slate-800/40 border-slate-700/50 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20'
                    : 'bg-slate-50/40 border-slate-200/50 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-purple-500/20'
                    : 'bg-purple-100'
                }`}>
                  <svg className="w-7 h-7 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>Save Favorites</h3>
                <p className={`${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Star your favorite bot responses and save them for future reference. Build your personal knowledge base!
                </p>
              </motion.div>
            </Link>

            <Link to="/chat">
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full rounded-2xl p-8 transition-all cursor-pointer group h-full border ${
                  theme === 'dark'
                    ? 'bg-slate-800/40 border-slate-700/50 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20'
                    : 'bg-slate-50/40 border-slate-200/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-cyan-500/20'
                    : 'bg-cyan-100'
                }`}>
                  <svg className="w-7 h-7 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>Voice & Audio</h3>
                <p className={`${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Use voice input to send messages and listen to bot responses. Perfect for hands-free interaction!
                </p>
              </motion.div>
            </Link>

            <Link to="/chat">
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full rounded-2xl p-8 transition-all cursor-pointer group h-full border ${
                  theme === 'dark'
                    ? 'bg-slate-800/40 border-slate-700/50 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20'
                    : 'bg-slate-50/40 border-slate-200/50 hover:border-pink-400/50 hover:shadow-lg hover:shadow-pink-400/20'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-pink-500/20'
                    : 'bg-pink-100'
                }`}>
                  <svg className="w-7 h-7 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>Smart Search</h3>
                <p className={`${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Search across all your chats, blogs, flashcards, and saved answers in one powerful search bar. Find what you need instantly!
                </p>
              </motion.div>
            </Link>

            <Link to="/profile">
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full rounded-2xl p-8 transition-all cursor-pointer group h-full border ${
                  theme === 'dark'
                    ? 'bg-slate-800/40 border-slate-700/50 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20'
                    : 'bg-slate-50/40 border-slate-200/50 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-400/20'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-orange-500/20'
                    : 'bg-orange-100'
                }`}>
                  <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>Profile & Settings</h3>
                <p className={`${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Manage your account preferences, customize your learning settings, and track your progress all in one place.
                </p>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Features List */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
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
          transition={{ delay: 1.2 }}
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

        {/* FAQ Section */}
        <motion.div
          id="faq"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.4 }}
          className="mt-20 mb-20"
        >
          <h2
            className={`text-4xl font-bold text-center mb-12 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            ❓ Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqItems} />
          </div>
        </motion.div>

        {/* Get In Touch Section */}
        <motion.div
          id="contact"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.6 }}
          className="mt-20 mb-20"
        >
          <h2 className={`text-4xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Get In Touch</h2>
          <p className={`text-center text-xl mb-12 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>Have a project in mind? Let's work together to create something amazing.</p>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className={`rounded-2xl p-8 backdrop-blur-xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/50 border-white'}`}>
              <h3 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Contact Information</h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Email</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>amanranjan.work@outlook.com</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'}`}>
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.92 7.02C17.45 6.18 16.51 5.55 15.5 5.55c-1.02 0-1.97.63-2.44 1.47C12.4 5.6 11.4 5 10.5 5 9.11 5 8 6.11 8 7.5v10c0 1.41 1.1 2.5 2.5 2.5s2.5-1.09 2.5-2.5V7.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v10c0 1.41 1.09 2.5 2.5 2.5s2.5-1.09 2.5-2.5v-10c0-1.02-.63-1.97-1.58-2.48z" /></svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Phone</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>+91-9876543201</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'}`}>
                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Location</h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Saharanpur, Uttar Pradesh</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className={`w-full px-6 py-3 rounded-lg border outline-none transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'}`} />
                <input type="email" placeholder="Your Email" className={`w-full px-6 py-3 rounded-lg border outline-none transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'}`} />
                <textarea placeholder="Your Message" rows="5" className={`w-full px-6 py-3 rounded-lg border outline-none transition-all resize-none ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500'}`} />
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full px-6 py-3 rounded-lg font-semibold text-white text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all">Send Message</motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className={`border-t transition-colors ${
          theme === 'dark'
            ? 'bg-slate-900/50 border-slate-800'
            : 'bg-white/50 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4
                className={`font-bold text-lg mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}
              >
                INGRES AI
              </h4>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Your AI assistant with personality. Experience conversations like never before.
              </p>
            </div>

            <div>
              <h5
                className={`font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                Product
              </h5>
              <ul className="space-y-2">
                {[
                  { name: 'Features', id: '#features' },
                  { name: 'FAQ', id: '#faq' },
                  { name: 'Pricing', id: '#' },
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() =>
                        item.id !== '#' &&
                        document.querySelector(item.id)?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className={`text-sm transition-colors ${
                        theme === 'dark'
                          ? 'text-slate-400 hover:text-blue-400'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5
                className={`font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                Company
              </h5>
              <ul className="space-y-2">
                {['About', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      className={`text-sm transition-colors ${
                        theme === 'dark'
                          ? 'text-slate-400 hover:text-blue-400'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5
                className={`font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                Legal
              </h5>
              <ul className="space-y-2">
                {['Privacy', 'Terms', 'Security'].map((item) => (
                  <li key={item}>
                    <button
                      className={`text-sm transition-colors ${
                        theme === 'dark'
                          ? 'text-slate-400 hover:text-blue-400'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`border-t pt-8 ${
              theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                © 2025 INGRES AI. All rights reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                {[
                  { name: 'Twitter', icon: '𝕏' },
                  { name: 'GitHub', icon: '⚙️' },
                  { name: 'LinkedIn', icon: '💼' },
                ].map((social) => (
                  <motion.button
                    key={social.name}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-lg transition-colors ${
                      theme === 'dark'
                        ? 'text-slate-400 hover:text-blue-400'
                        : 'text-slate-600 hover:text-blue-600'
                    }`}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
