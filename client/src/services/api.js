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

export default api;
