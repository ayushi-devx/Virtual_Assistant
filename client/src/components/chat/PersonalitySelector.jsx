import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const personalities = [
  {
    id: 'sweet',
    name: 'Sweet Bot',
    description: 'Caring, polite & warm',
    emoji: '💖',
    color: 'from-pink-400 to-rose-500',
    hoverColor: 'hover:shadow-pink-500/50',
  },
  {
    id: 'angry',
    name: 'Angry Bot',
    description: 'Sarcastic & witty',
    emoji: '😤',
    color: 'from-red-400 to-orange-500',
    hoverColor: 'hover:shadow-red-500/50',
  },
  {
    id: 'grandpa',
    name: 'Grandpa Bot',
    description: 'Wise & nostalgic',
    emoji: '🧓',
    color: 'from-amber-400 to-yellow-500',
    hoverColor: 'hover:shadow-amber-500/50',
  },
];

export default function PersonalitySelector({ onSelect }) {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
      {personalities.map((personality, index) => (
        <motion.button
          key={personality.id}
          onClick={() => onSelect(personality.id)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
          whileTap={{ scale: 0.95 }}
          className={`relative group rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300
            ${
              theme === 'dark'
                ? 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600'
                : 'bg-white/50 border border-white hover:border-slate-200'
            } shadow-lg ${personality.hoverColor} hover:shadow-2xl`}
        >
          <div className="relative p-8 text-center z-10">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              {personality.emoji}
            </motion.div>

            <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {personality.name}
            </h3>

            <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              {personality.description}
            </p>

            <motion.div
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
              className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${personality.color}`}
            />
          </div>

          <div
            className={`absolute inset-0 bg-gradient-to-r ${personality.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0`}
          />
        </motion.button>
      ))}
    </div>
  );
}
