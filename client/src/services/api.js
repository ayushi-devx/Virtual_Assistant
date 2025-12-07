import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  toggleTheme: () => api.put('/auth/theme'),
  deleteAccount: () => api.delete('/auth/profile'),
  getStats: () => api.get('/auth/stats'),
};

export const chatAPI = {
  createChat: (data) => api.post('/chat', data),
  getChats: (page = 1, limit = 10) => api.get(`/chat?page=${page}&limit=${limit}`),
  getChatById: (id) => api.get(`/chat/${id}`),
  addMessage: (chatId, data) => api.post(`/chat/${chatId}/message`, data),
  getAIResponse: (chatId, data) => api.post(`/chat/${chatId}/response`, data),
  updateChatTitle: (chatId, data) => api.put(`/chat/${chatId}/title`, data),
  updateChatPersonality: (chatId, personality) => api.put(`/chat/${chatId}/personality`, { personality }),
  updateAIProvider: (chatId, aiProvider) => api.put(`/chat/${chatId}/provider`, { aiProvider }),
  getAIProviders: () => api.get('/chat/providers/list'),
  archiveChat: (chatId) => api.put(`/chat/${chatId}/archive`),
};

export const flashcardAPI = {
  createDeck: (data) => api.post('/flashcards', data),
  getUserDecks: (page = 1, limit = 10) => api.get(`/flashcards?page=${page}&limit=${limit}`),
  getDeckById: (id) => api.get(`/flashcards/${id}`),
  getPublicDecks: (page = 1, limit = 10, category = '') => api.get(`/flashcards/public/browse?page=${page}&limit=${limit}&category=${category}`),
  addFlashcard: (deckId, data) => api.post(`/flashcards/${deckId}/card`, data),
  updateFlashcard: (deckId, cardId, data) => api.put(`/flashcards/${deckId}/card/${cardId}`, data),
  deleteFlashcard: (deckId, cardId) => api.delete(`/flashcards/${deckId}/card/${cardId}`),
  updateDeck: (deckId, data) => api.put(`/flashcards/${deckId}`, data),
  deleteDeck: (deckId) => api.delete(`/flashcards/${deckId}`),
};

export const blogAPI = {
  createBlog: (data) => api.post('/blogs', data),
  getBlogs: (page = 1, limit = 10, category = '', search = '') => api.get(`/blogs?page=${page}&limit=${limit}&category=${category}&search=${search}`),
  getBlogById: (id) => api.get(`/blogs/${id}`),
  updateBlog: (id, data) => api.put(`/blogs/${id}`, data),
  deleteBlog: (id) => api.delete(`/blogs/${id}`),
  getAdminBlogs: (page = 1, limit = 10) => api.get(`/blogs/admin/all?page=${page}&limit=${limit}`),
  getCategories: () => api.get('/blogs/categories'),
};

export const savedAnswerAPI = {
  saveBotResponse: (data) => api.post('/saved-answers', data),
  getSavedAnswers: (page = 1, limit = 10, category = '') => api.get(`/saved-answers?page=${page}&limit=${limit}&category=${category}`),
  getSavedAnswerById: (id) => api.get(`/saved-answers/${id}`),
  updateSavedAnswer: (id, data) => api.put(`/saved-answers/${id}`, data),
  deleteSavedAnswer: (id) => api.delete(`/saved-answers/${id}`),
  getCategories: () => api.get('/saved-answers/categories'),
};

export const searchAPI = {
  globalSearch: (query, type = '') => api.get(`/search?query=${query}&type=${type}`),
  searchChats: (query) => api.get(`/search/chats?query=${query}`),
  searchBlogs: (query) => api.get(`/search/blogs?query=${query}`),
  searchFlashcards: (query) => api.get(`/search/flashcards?query=${query}`),
};

export default api;
