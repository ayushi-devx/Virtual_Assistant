import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../context/ChatContext';
import { useTheme } from '../context/ThemeContext';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatBox from '../components/chat/ChatBox';
import PersonalitySelector from '../components/chat/PersonalitySelector';

export default function Chat() {
  const { currentChat, loadChats, createNewChat, currentPersonality, switchPersonality } = useChat();
  const { theme } = useTheme();
  const [showPersonalitySelector, setShowPersonalitySelector] = useState(!currentChat);
  const sidebarRef = useRef(null);

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    if (!currentChat) {
      setShowPersonalitySelector(true);
    } else {
      setShowPersonalitySelector(false);
    }
  }, [currentChat]);

  const handleCreateChat = async (personality) => {
    await createNewChat(personality);
    setShowPersonalitySelector(false);
  };

  return (
    <div className={`flex h-screen transition-colors ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <ChatSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {showPersonalitySelector ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Choose Your AI Personality
              </h2>
              <PersonalitySelector onSelect={handleCreateChat} />
            </motion.div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {currentChat ? (
              <motion.div
                key={currentChat._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col"
              >
                <ChatBox />
              </motion.div>
            ) : null}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
