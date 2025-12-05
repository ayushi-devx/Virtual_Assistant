import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/routes/PrivateRoute';
import Navbar from './components/layout/Navbar';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
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

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ChatProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
