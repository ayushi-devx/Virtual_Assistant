import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function MessageBubble({ message, personality }) {
  const { theme } = useTheme();
  const isUser = message.sender === 'user';

  const getPersonalityColor = (personality) => {
    const colors = {
      sweet: 'from-pink-500 to-rose-500',
      angry: 'from-red-500 to-orange-500',
      grandpa: 'from-amber-500 to-yellow-500',
    };
    return colors[personality] || colors.sweet;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex gap-3 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isUser && (
          <div
            className={`w-8 h-8 rounded-full bg-gradient-to-r ${getPersonalityColor(
              personality
            )} flex items-center justify-center text-lg flex-shrink-0`}
          >
            {personality === 'sweet' && '💖'}
            {personality === 'angry' && '😤'}
            {personality === 'grandpa' && '🧓'}
          </div>
        )}

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className={`px-4 py-3 rounded-2xl break-words
            ${
              isUser
                ? `bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none`
                : theme === 'dark'
                ? 'bg-slate-800 text-slate-100 rounded-bl-none'
                : 'bg-slate-200 text-slate-900 rounded-bl-none'
            }`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
