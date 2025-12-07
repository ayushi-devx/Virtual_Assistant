import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { savedAnswerAPI } from '../../services/api';

export default function MessageBubble({ message, personality, userMessage, chatId }) {
  const { theme } = useTheme();
  const isUser = message.sender === 'user';
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAnswer = async () => {
    if (isSaved || isSaving || !userMessage) return;

    setIsSaving(true);
    try {
      await savedAnswerAPI.saveBotResponse({
        chatMessage: userMessage,
        botResponse: message.text,
        chatId: chatId,
        category: 'General',
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error('Error saving answer:', error);
    } finally {
      setIsSaving(false);
    }
  };

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

        <div className="flex flex-col gap-2">
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

          {!isUser && (
            <div className="flex gap-2 ml-10">
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSaveAnswer}
                disabled={isSaving}
                className={`text-lg transition-all ${
                  isSaved ? 'text-yellow-400' : 'text-slate-400 hover:text-yellow-400'
                }`}
                title="Save to favorites"
              >
                {isSaved ? '⭐' : '☆'}
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
