import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';
import MessageBubble from './MessageBubble';
import AIProviderSelector from './AIProviderSelector';

export default function ChatBox() {
  const { currentChat, sendMessage, isLoading, switchPersonality, switchAIProvider, currentPersonality } = useChat();
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue('');

    await sendMessage(message);
  };

  const handlePersonalityChange = async (personality) => {
    await switchPersonality(personality);
  };

  const handleProviderChange = async (provider) => {
    await switchAIProvider(provider);
  };

  const getPersonalityColor = (personality) => {
    const colors = {
      sweet: 'from-pink-500 to-rose-500',
      angry: 'from-red-500 to-orange-500',
      grandpa: 'from-amber-500 to-yellow-500',
    };
    return colors[personality] || colors.sweet;
  };

  const getPersonalityName = (personality) => {
    const names = {
      sweet: 'Sweet Bot 💖',
      angry: 'Angry Bot 😤',
      grandpa: 'Grandpa Bot 🧓',
    };
    return names[personality] || 'Sweet Bot';
  };

  return (
    <div className={`flex flex-col h-full transition-colors ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div
        className={`border-b transition-colors flex items-center justify-between px-6 py-4
          ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-r ${getPersonalityColor(
              currentPersonality
            )} flex items-center justify-center text-2xl`}
          >
            {currentPersonality === 'sweet' && '💖'}
            {currentPersonality === 'angry' && '😤'}
            {currentPersonality === 'grandpa' && '🧓'}
          </div>
          <div>
            <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {getPersonalityName(currentPersonality)}
            </h3>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Active now
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex gap-2">
            {['sweet', 'angry', 'grandpa'].map((personality) => (
              <motion.button
                key={personality}
                onClick={() => handlePersonalityChange(personality)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`text-lg px-3 py-2 rounded-lg transition-all
                  ${
                    currentPersonality === personality
                      ? `bg-gradient-to-r ${getPersonalityColor(
                          personality
                        )} text-white shadow-lg`
                      : theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
              >
                {personality === 'sweet' && '💖'}
                {personality === 'angry' && '😤'}
                {personality === 'grandpa' && '🧓'}
              </motion.button>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-300 opacity-30"></div>

          <AIProviderSelector
            currentProvider={currentChat?.aiProvider || 'openai'}
            onProviderChange={handleProviderChange}
            loading={isLoading}
          />
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-6 space-y-4`}>
        <AnimatePresence>
          {currentChat?.messages?.map((message, index) => (
            <MessageBubble key={index} message={message} personality={currentPersonality} />
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 items-end"
          >
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-r ${getPersonalityColor(
                currentPersonality
              )} flex items-center justify-center`}
            >
              <span className="text-lg">
                {currentPersonality === 'sweet' && '💖'}
                {currentPersonality === 'angry' && '😤'}
                {currentPersonality === 'grandpa' && '🧓'}
              </span>
            </div>
            <div className={`flex gap-1 p-3 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ delay: i * 0.1, repeat: Infinity, duration: 0.6 }}
                  className={`w-2 h-2 rounded-full ${
                    theme === 'dark' ? 'bg-slate-400' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className={`border-t p-4 transition-colors ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            placeholder="Type your message..."
            className={`flex-1 px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50
              ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500'
              }`}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className={`px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700`}
          >
            Send
          </motion.button>
        </div>
      </form>
    </div>
  );
}
