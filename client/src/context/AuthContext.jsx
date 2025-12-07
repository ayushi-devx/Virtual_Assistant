import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await authAPI.register(userData);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setIsAuthenticated(true);
      
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      setIsAuthenticated(false);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authAPI.login(credentials);
      const data = response.data;
      
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        setIsAuthenticated(true);
        return { success: true, data };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      const message = err.response?.data?.message || err.message || 'Login failed';
      setError(message);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (data) => {
    try {
      const { data: updatedUser } = await authAPI.updateProfile(data);
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsAuthenticated(true);
      
      return { success: true, data: updatedUser };
    } catch (err) {
      const message = err.response?.data?.message || 'Update failed';
      return { success: false, error: message };
    }
  };

  const deleteAccount = async () => {
    try {
      await authAPI.deleteAccount();
      logout();
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Delete failed';
      return { success: false, error: message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        register,
        login,
        logout,
        updateProfile,
        deleteAccount,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
