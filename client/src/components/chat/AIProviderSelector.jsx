import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function AIProviderSelector({ currentProvider, onProviderChange, loading }) {
  const { theme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const providers = [
    { id: 'openai', name: 'ChatGPT', icon: '🤖', color: 'from-green-500 to-emerald-600' },
    { id: 'gemini', name: 'Gemini', icon: '✨', color: 'from-blue-500 to-cyan-600' },
    { id: 'huggingface', name: 'HuggingFace', icon: '🤗', color: 'from-yellow-500 to-orange-600' },
    { id: 'cohere', name: 'Cohere', icon: '🌊', color: 'from-purple-500 to-pink-600' },
  ];

  const current = providers.find(p => p.id === currentProvider);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMenu(!showMenu)}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        } ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-white hover:from-slate-600 hover:to-slate-500'
            : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 hover:from-slate-200 hover:to-slate-300'
        }`}
      >
        <span className="text-lg">{current?.icon}</span>
        <span className="text-sm">{current?.name}</span>
      </motion.button>

      {showMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`absolute top-12 right-0 w-56 rounded-xl shadow-2xl py-2 z-50 grid grid-cols-2 gap-2 p-3 ${
            theme === 'dark'
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-slate-200'
          }`}
        >
          {providers.map((provider) => (
            <motion.button
              key={provider.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onProviderChange(provider.id);
                setShowMenu(false);
              }}
              disabled={loading}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all ${
                currentProvider === provider.id
                  ? `bg-gradient-to-br ${provider.color} text-white shadow-lg`
                  : `${
                      theme === 'dark'
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`
              }`}
            >
              <span className="text-2xl">{provider.icon}</span>
              <span className="text-xs font-medium">{provider.name}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
