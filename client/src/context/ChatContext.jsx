import React, { createContext, useContext, useState } from 'react';
import { chatAPI } from '../services/api';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPersonality, setCurrentPersonality] = useState('sweet');

  const createNewChat = async (personality = 'sweet') => {
    try {
      setIsLoading(true);
      const { data } = await chatAPI.createChat({
        title: `Chat - ${new Date().toLocaleDateString()}`,
        personality,
      });
      setCurrentChat(data);
      setCurrentPersonality(personality);
      setChats((prev) => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to create chat' };
    } finally {
      setIsLoading(false);
    }
  };

  const loadChats = async (page = 1) => {
    try {
      setIsLoading(true);
      const { data } = await chatAPI.getChats(page, 10);
      setChats(data.chats);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to load chats' };
    } finally {
      setIsLoading(false);
    }
  };

  const loadChatById = async (chatId) => {
    try {
      setIsLoading(true);
      const { data } = await chatAPI.getChatById(chatId);
      setCurrentChat(data);
      setCurrentPersonality(data.personality);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to load chat' };
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message) => {
    if (!currentChat) return { success: false, error: 'No chat selected' };

    try {
      setIsLoading(true);

      // Add user message
      const userMsgResponse = await chatAPI.addMessage(currentChat._id, {
        sender: 'user',
        text: message,
      });

      setCurrentChat((prev) => ({
        ...prev,
        messages: [...(prev.messages || []), userMsgResponse.data],
      }));

      // Get AI response
      try {
        const botMsgResponse = await chatAPI.getAIResponse(currentChat._id, {
          message,
        });

        setCurrentChat((prev) => ({
          ...prev,
          messages: [...(prev.messages || []), botMsgResponse.data],
        }));
      } catch (botErr) {
        console.error('Bot response error:', botErr);
        // Add error message from bot
        const errorMessage = {
          sender: 'bot',
          text: `Sorry, I encountered an error. ${botErr.response?.data?.message || 'Please try again.'}`,
        };
        setCurrentChat((prev) => ({
          ...prev,
          messages: [...(prev.messages || []), errorMessage],
        }));
      }

      return { success: true };
    } catch (err) {
      console.error('Send message error:', err);
      return { success: false, error: err.response?.data?.message || 'Failed to send message' };
    } finally {
      setIsLoading(false);
    }
  };

  const switchPersonality = async (personality) => {
    if (!currentChat) return;

    try {
      setIsLoading(true);
      await chatAPI.updateChatPersonality(currentChat._id, personality);
      setCurrentPersonality(personality);
      setCurrentChat((prev) => ({
        ...prev,
        personality,
      }));
      return { success: true };
    } catch (err) {
      console.error('Switch personality error:', err);
      return { success: false, error: err.response?.data?.message || 'Failed to switch personality' };
    } finally {
      setIsLoading(false);
    }
  };

  const switchAIProvider = async (aiProvider) => {
    if (!currentChat) return;

    try {
      setIsLoading(true);
      await chatAPI.updateAIProvider(currentChat._id, aiProvider);
      setCurrentChat((prev) => ({
        ...prev,
        aiProvider,
      }));
      return { success: true };
    } catch (err) {
      console.error('Switch AI provider error:', err);
      return { success: false, error: err.response?.data?.message || 'Failed to switch AI provider' };
    } finally {
      setIsLoading(false);
    }
  };

  const archiveChat = async (chatId) => {
    try {
      await chatAPI.archiveChat(chatId);
      setChats((prev) => prev.filter((c) => c._id !== chatId));
      if (currentChat?._id === chatId) {
        setCurrentChat(null);
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to archive chat' };
    }
  };

  const updateChatTitle = async (chatId, title) => {
    try {
      const { data } = await chatAPI.updateChatTitle(chatId, { title });
      setChats((prev) =>
        prev.map((c) => (c._id === chatId ? { ...c, title } : c))
      );
      if (currentChat?._id === chatId) {
        setCurrentChat(data);
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to update title' };
    }
  };

  return (
    <ChatContext.Provider
      value={{
        currentChat,
        chats,
        isLoading,
        currentPersonality,
        createNewChat,
        loadChats,
        loadChatById,
        sendMessage,
        switchPersonality,
        switchAIProvider,
        archiveChat,
        updateChatTitle,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};
