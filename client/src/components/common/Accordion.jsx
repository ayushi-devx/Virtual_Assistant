import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function Accordion({ items }) {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index}>
          <motion.button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className={`w-full text-left p-6 rounded-xl transition-all border-2 ${
              openIndex === index
                ? theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-500 text-white'
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-500 text-slate-900'
                : theme === 'dark'
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-bold ${openIndex === index ? 'text-current' : ''}`}>
                {item.title}
              </h3>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl"
              >
                ▼
              </motion.span>
            </div>
          </motion.button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-b-xl overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border-x-2 border-b-2 border-slate-700'
                    : 'bg-slate-50 border-x-2 border-b-2 border-slate-200'
                }`}
              >
                <p className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>
                  {item.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
