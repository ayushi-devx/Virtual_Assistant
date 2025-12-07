import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function ChatSidebar() {
  const { chats, currentChat, loadChatById } = useChat();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();

  const handleNewChat = () => {
    setIsOpen(false);
    navigate('/chat');
    window.location.reload();
  };

  const handleSelectChat = async (chat) => {
    await loadChatById(chat._id);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const getPersonalityEmoji = (personality) => {
    const emojis = {
      sweet: '💖',
      angry: '😤',
      grandpa: '🧓',
    };
    return emojis[personality] || '💬';
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-20 left-4 z-40 p-2 rounded-lg md:hidden ${
          theme === 'dark'
            ? 'bg-slate-800 hover:bg-slate-700'
            : 'bg-slate-100 hover:bg-slate-200'
        }`}
      >
        ☰
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed md:relative w-72 h-screen flex flex-col border-r transition-colors md:translate-x-0
              ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200'
              } z-30`}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Chats
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="md:hidden text-xl"
              >
                ✕
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNewChat}
              className={`m-4 py-2 px-4 rounded-lg font-semibold transition-all
                bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white`}
            >
              + New Chat
            </motion.button>

            <div className={`flex-1 overflow-y-auto space-y-2 px-2 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <AnimatePresence>
                {chats.length > 0 ? (
                  chats.map((chat, index) => (
                    <motion.button
                      key={chat._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelectChat(chat)}
                      className={`w-full text-left p-3 rounded-lg transition-all group
                        ${
                          currentChat?._id === chat._id
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : theme === 'dark'
                            ? 'hover:bg-slate-800 text-slate-300'
                            : 'hover:bg-slate-100 text-slate-900'
                        }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate text-sm">
                            {chat.title}
                          </p>
                          <p className="text-xs opacity-70 truncate">
                            {chat.messages?.length || 0} messages
                          </p>
                        </div>
                        <span className="text-lg flex-shrink-0">
                          {getPersonalityEmoji(chat.personality)}
                        </span>
                      </div>
                    </motion.button>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-center py-8 text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    No chats yet. Create one to get started!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className={`border-t p-4 text-xs ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-slate-400'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <p>💡 Tip: You can switch personalities anytime during a chat!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-20"
        />
      )}
    </>
  );
}
