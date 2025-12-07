import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  const applyTheme = (themeValue) => {
    if (themeValue === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = async () => {
    try {
      setIsLoading(true);
      const newTheme = theme === 'light' ? 'dark' : 'light';

      await authAPI.toggleTheme();

      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);

      return { success: true, theme: newTheme };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to toggle theme' };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
