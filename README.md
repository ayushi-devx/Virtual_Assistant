# INGRES AI - Virtual Assistant (MERN Stack)

<div align="center">

![INGRES AI](https://img.shields.io/badge/INGRES%20AI-Virtual%20Assistant-blue?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)

**A Premium Multi-Personality AI Chatbot Built with Modern Web Technologies**

[Quick Start](#-quick-start) • [Features](#-features) • [Architecture](#-architecture) • [Documentation](#-documentation)

</div>

---

## 🎯 Overview

INGRES AI is a **full-stack MERN application** that brings personality to AI conversations. Users can interact with three distinct AI personalities:

- **💖 Sweet Bot** - Warm, supportive, and encouraging
- **😤 Angry Bot** - Sarcastic, witty, and direct  
- **🧓 Grandpa Bot** - Wise, nostalgic, and patient

Switch personalities anytime, save chat history, and enjoy a premium UI experience with smooth animations and dark mode support.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm/yarn

### Installation (3 steps)

```bash
# 1. Backend setup
cd server && npm install

# 2. Frontend setup
cd ../client && npm install

# 3. Start both (in separate terminals)
# Terminal 1:
cd server && npm run dev

# Terminal 2:
cd client && npm run dev
```

**Access:** http://localhost:5173

👉 **[Full Setup Guide →](./SETUP.md)** | **[Quick Reference →](./QUICKSTART.md)**

---

## ✨ Features

### 🔐 Authentication System
- Secure JWT-based authentication
- User registration & login
- Protected API routes
- Auto token refresh
- Secure logout

### 🤖 Multi-Personality Chatbot
- **3 Distinct Personalities** - Each with unique tone and style
- **Smart Response Engine** - Personality-aware reply generation
- **Real-time Switching** - Change personality mid-conversation
- **Personality Preservation** - Each chat maintains its personality
- **Template-based Responses** - Consistent character maintenance

### 💬 Chat Management
- **Chat History** - All conversations saved and retrievable
- **Sidebar Navigation** - Quick access to previous chats
- **Auto-Save** - Messages saved instantly
- **Chat Organization** - Archive and manage chats
- **Message Persistence** - Full message history with timestamps

### 🎨 Premium User Interface
- **Modern Design** - Glassmorphism and gradient effects
- **Dark Mode** - Full dark theme support with toggle
- **Responsive Layout** - Mobile, tablet, and desktop optimized
- **Smooth Animations** - Framer Motion transitions
- **Professional Color Scheme** - Blue/purple gradient theme

### 👤 User Management
- **Profile Page** - Edit user information
- **Theme Preference** - Save light/dark preference
- **Account Settings** - Manage profile and preferences
- **Account Deletion** - Secure account removal option

---

## 🏗️ Architecture

### Frontend Stack
```
React 19
├── React Router v7 (Routing)
├── Context API (State Management)
├── Tailwind CSS (Styling)
├── Framer Motion (Animations)
└── Axios (HTTP Client)
```

### Backend Stack
```
Node.js + Express.js
├── MongoDB + Mongoose (Database)
├── JWT (Authentication)
├── Bcrypt (Password Security)
├── Express Validator (Input Validation)
└── CORS (Cross-Origin)
```

### Folder Structure
```
virtual-assistant/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   │   ├── ChatBox.jsx
│   │   │   │   ├── ChatSidebar.jsx
│   │   │   │   ├── MessageBubble.jsx
│   │   │   │   └── PersonalitySelector.jsx
│   │   │   ├── layout/
│   │   │   │   └── Navbar.jsx
│   │   │   └── routes/
│   │   │       └── PrivateRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ChatContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── chatController.js
│   ├── models/
│   │   ├── userModel.js
│   │   └── chatModel.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── chatRoutes.js
│   │   └── userRoutes.js
│   └── server.js
│
├── SETUP.md                    (Detailed setup guide)
├── QUICKSTART.md              (Quick reference)
├── PERSONALITY_ENGINE.md       (Personality system docs)
└── README.md                  (This file)
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [SETUP.md](./SETUP.md) | Complete installation and configuration guide |
| [QUICKSTART.md](./QUICKSTART.md) | 3-minute quick reference for running the app |
| [PERSONALITY_ENGINE.md](./PERSONALITY_ENGINE.md) | Detailed personality system documentation |

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| GET | `/api/auth/profile` | Get user profile | ✅ |
| PUT | `/api/auth/profile` | Update profile | ✅ |
| DELETE | `/api/auth/profile` | Delete account | ✅ |
| PUT | `/api/auth/theme` | Toggle theme | ✅ |

### Chat Management
| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/chat` | Create new chat | ✅ |
| GET | `/api/chat` | Get all chats | ✅ |
| GET | `/api/chat/:id` | Get chat details | ✅ |
| POST | `/api/chat/:id/message` | Add message | ✅ |
| POST | `/api/chat/:id/response` | Get AI response | ✅ |
| PUT | `/api/chat/:id/title` | Update title | ✅ |
| PUT | `/api/chat/:id/archive` | Archive chat | ✅ |

---

## 🎯 Three Personalities Explained

### 💖 Sweet Bot
- **Best for:** Learning, encouragement, sensitive topics
- **Tone:** Warm, supportive, enthusiastic
- **Response Style:** Long, detailed, with emojis
- **Example:** "Oh, that's wonderful! 💖 Let me help you with that..."

### 😤 Angry Bot  
- **Best for:** Quick answers, direct solutions
- **Tone:** Sarcastic, quick, witty
- **Response Style:** Short, punchy, minimal emojis
- **Example:** "Look, just do X and Y. Done. 🙄"

### 🧓 Grandpa Bot
- **Best for:** Deep learning, wisdom, context
- **Tone:** Nostalgic, wise, patient
- **Response Style:** Long, story-based, thoughtful
- **Example:** "Back in my day... 🧓 Let me tell you..."

👉 **[Learn more →](./PERSONALITY_ENGINE.md)**

---

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm start          # Production mode
npm run dev        # Development with nodemon
npm run server     # Alternative server command
```

**Frontend:**
```bash
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

### Environment Variables

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ingres-ai
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku/Railway)
```bash
git push heroku main
# or configure Railway for your repo
```

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Update `MONGO_URI` in backend `.env`
3. Deploy and test

---

## 🔒 Security Features

✅ JWT Authentication  
✅ Password Hashing (Bcryptjs)  
✅ Protected API Routes  
✅ Input Validation  
✅ CORS Configuration  
✅ Helmet Headers  
✅ Environment Variables  

---

## 📊 Performance Metrics

- **Frontend Build:** ~412KB gzipped (optimized)
- **API Response Time:** <1 second
- **Database Queries:** Indexed for speed
- **Message Latency:** <800ms thinking time

---

## 🐛 Troubleshooting

**MongoDB Connection Failed**
```bash
# Start MongoDB service
mongod  # Windows: Run MongoDB Server
# Or use MongoDB Atlas connection string
```

**Port Already in Use**
```bash
# Change port in server/.env
PORT=5001
```

**Frontend Not Connecting**
```bash
# Verify VITE_API_URL in client/.env
VITE_API_URL=http://localhost:5000/api
```

**Theme Not Persisting**
```bash
# Clear browser cache and localStorage
# Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

👉 **[Full troubleshooting →](./SETUP.md#troubleshooting)**

---

## 📈 Future Enhancements

- [ ] Integration with real AI models (OpenAI, Claude)
- [ ] Voice chat support
- [ ] Chat export (PDF, TXT)
- [ ] Collaborative chats
- [ ] Mobile app (React Native)
- [ ] WebSocket for real-time updates
- [ ] Advanced analytics
- [ ] Chat sharing with links
- [ ] Conversation branching
- [ ] Custom personality creation

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📧 Support

For issues, questions, or suggestions:
1. Check the documentation files
2. Review the API reference
3. Check console for error messages
4. Verify environment configuration

---

## 🎓 Learning Resources

- **MERN Stack:** Full-stack JavaScript development
- **Personality Engine:** How to implement multi-tone AI
- **Tailwind CSS:** Modern utility-first styling
- **Framer Motion:** Production-grade animations
- **Context API:** React state management

---

<div align="center">

**Built with ❤️ using MERN Stack**

**[Setup Guide](./SETUP.md)** • **[Quick Start](./QUICKSTART.md)** • **[Personality Guide](./PERSONALITY_ENGINE.md)**

---

*Last Updated: December 2025*  
*Version: 1.0.0*

</div>
