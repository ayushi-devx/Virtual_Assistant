import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      navigate('/chat', { replace: true });
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors
        ${theme === 'dark' ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl
          ${
            theme === 'dark'
              ? 'bg-slate-900/50 border border-slate-800'
              : 'bg-white/50 border border-white'
          }`}
      >
        <div className="p-8">
          <motion.div className="text-center mb-8">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
              INGRES
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Create your AI Assistant account
            </p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    theme === 'dark'
                      ? 'bg-slate-800 border border-slate-700 text-white placeholder-slate-500'
                      : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                placeholder="John Doe"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    theme === 'dark'
                      ? 'bg-slate-800 border border-slate-700 text-white placeholder-slate-500'
                      : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                placeholder="you@example.com"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    theme === 'dark'
                      ? 'bg-slate-800 border border-slate-700 text-white placeholder-slate-500'
                      : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                placeholder="••••••••"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    theme === 'dark'
                      ? 'bg-slate-800 border border-slate-700 text-white placeholder-slate-500'
                      : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                placeholder="••••••••"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-6 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`mt-6 text-center text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
          >
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-600 font-semibold">
              Sign in
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
