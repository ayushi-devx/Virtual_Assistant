import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Profile() {
  const { user, updateProfile, deleteAccount } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setError('');
    setIsLoading(true);

    const result = await updateProfile(formData);

    if (result.success) {
      setIsEditing(false);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;

    setIsLoading(true);
    const result = await deleteAccount();

    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-950 to-slate-900'
          : 'bg-gradient-to-br from-slate-50 to-slate-100'
      }`}
    >
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl
            ${
              theme === 'dark'
                ? 'bg-slate-900/50 border border-slate-800'
                : 'bg-white/50 border border-white'
            }`}
        >
          <div className="p-8">
            <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Profile Settings
            </h1>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-6">
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
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg transition-all
                    ${
                      isEditing
                        ? `focus:outline-none focus:ring-2 focus:ring-blue-500`
                        : 'opacity-50 cursor-not-allowed'
                    }
                    ${
                      theme === 'dark'
                        ? 'bg-slate-800 border border-slate-700 text-white'
                        : 'bg-slate-50 border border-slate-300 text-slate-900'
                    }`}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg transition-all
                    ${
                      isEditing
                        ? `focus:outline-none focus:ring-2 focus:ring-blue-500`
                        : 'opacity-50 cursor-not-allowed'
                    }
                    ${
                      theme === 'dark'
                        ? 'bg-slate-800 border border-slate-700 text-white'
                        : 'bg-slate-50 border border-slate-300 text-slate-900'
                    }`}
                />
              </motion.div>

              <div className="flex gap-4 pt-4">
                {!isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    Edit Profile
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      disabled={isLoading}
                      className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user?.name || '',
                          email: user?.email || '',
                        });
                      }}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all
                        ${
                          theme === 'dark'
                            ? 'bg-slate-800 hover:bg-slate-700 text-white'
                            : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                        }`}
                    >
                      Cancel
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 20 }}
              transition={{ delay: 0.4 }}
              className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}
            >
              <h2 className={`text-xl font-bold mb-4 text-red-600`}>Danger Zone</h2>
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Delete your account and all associated data. This action cannot be undone.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className="px-6 py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Deleting...' : 'Delete Account'}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
