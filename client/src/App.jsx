import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';
import Navbar from './components/layout/Navbar';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Flashcards from './pages/Flashcards';
import Blogs from './pages/Blogs';
import Dashboard from './pages/Dashboard';
import SavedAnswers from './pages/SavedAnswers';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <ChatProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/chat"
                element={
                  <>
                    <Navbar />
                    <PrivateRoute>
                      <Chat />
                    </PrivateRoute>
                  </>
                }
              />

              <Route
                path="/profile"
                element={
                  <>
                    <Navbar />
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  </>
                }
              />

              <Route
                path="/flashcards"
                element={
                  <>
                    <Navbar />
                    <PrivateRoute>
                      <Flashcards />
                    </PrivateRoute>
                  </>
                }
              />

              <Route
                path="/blogs"
                element={
                  <>
                    <Navbar />
                    <PrivateRoute>
                      <Blogs />
                    </PrivateRoute>
                  </>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <>
                    <Navbar />
                    <AdminRoute>
                      <Dashboard />
                    </AdminRoute>
                  </>
                }
              />

              <Route
                path="/saved-answers"
                element={
                  <>
                    <Navbar />
                    <PrivateRoute>
                      <SavedAnswers />
                    </PrivateRoute>
                  </>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ChatProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
