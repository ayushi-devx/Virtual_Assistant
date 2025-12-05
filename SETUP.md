# INGRES AI Virtual Assistant - Complete Setup Guide

## Project Overview

INGRES AI is a **premium MERN stack chatbot** with **multi-personality AI** support. Users can choose between three distinct bot personalities:
- **Sweet Bot 💖** - Caring, warm, and supportive
- **Angry Bot 😤** - Sarcastic, witty, and quick
- **Grandpa Bot 🧓** - Wise, nostalgic, and philosophical

## Tech Stack

**Frontend:**
- React 19
- React Router v7
- Context API for state management
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API calls

**Backend:**
- Node.js + Express.js
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing

## Prerequisites

Before you begin, make sure you have:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** running locally or MongoDB Atlas connection string
- **npm** or **yarn**

## Installation & Setup

### 1. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file in server directory
# (Already exists, verify the following variables):
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ingres-ai
JWT_SECRET=ingres_ai_jwt_secret_key_123!@#
CLIENT_URL=http://localhost:3000

# Start MongoDB locally (if not using MongoDB Atlas)
# macOS with Homebrew:
brew services start mongodb-community

# Windows (if MongoDB is installed):
mongod

# For MongoDB Atlas, update MONGO_URI in .env

# Start the server
npm run dev  # Development with nodemon
# or
npm start    # Production
```

Server runs on: **http://localhost:5000**

### 2. Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file in client directory
# (Already exists, verify):
VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Client runs on: **http://localhost:5173**

## How to Run the Project

### Terminal 1 - Start Backend
```bash
cd virtual-assistant/server
npm run dev
```

### Terminal 2 - Start Frontend
```bash
cd virtual-assistant/client
npm run dev
```

### Terminal 3 (Optional) - MongoDB
```bash
mongod
```

Access the app at: **http://localhost:5173**

## Features

### 🔐 Authentication
- **Sign Up** - Create new account with email and password
- **Login** - Secure JWT-based authentication
- **Protected Routes** - Chat pages require authentication
- **Logout** - Secure session termination

### 💬 Multi-Personality Chat
- **Select Personality** - Choose bot personality before chatting
- **Switch Anytime** - Change personality mid-conversation
- **Real-time Responses** - Personality-specific AI responses
- **Chat History** - All chats saved to MongoDB

### 🎨 Premium UI/UX
- **Dark/Light Theme** - Toggle theme in navbar
- **Smooth Animations** - Framer Motion transitions
- **Responsive Design** - Works on mobile, tablet, desktop
- **Glassmorphism** - Modern backdrop blur effects
- **Gradient Colors** - Premium color schemes

### 👤 User Management
- **Profile Page** - Edit name and email
- **Theme Preference** - Save theme choice
- **Account Deletion** - Delete account and all data
- **Session Management** - Auto-logout on token expiry

### 📊 Chat Management
- **Chat History** - View all previous chats in sidebar
- **Chat Titles** - Auto-generated or custom titles
- **Archive Chats** - Remove chats from active list
- **Message Storage** - All messages persist in DB

## Project Structure

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
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   └── chatController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── errorMiddleware.js
    ├── models/
    │   ├── userModel.js
    │   └── chatModel.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── chatRoutes.js
    │   └── userRoutes.js
    ├── package.json
    ├── server.js
    ├── .env
    └── .env.example
```

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)
- `DELETE /api/auth/profile` - Delete account (Protected)
- `PUT /api/auth/theme` - Toggle theme (Protected)

### Chat Endpoints (All Protected)
- `POST /api/chat` - Create new chat
- `GET /api/chat` - Get all chats (paginated)
- `GET /api/chat/:id` - Get specific chat with messages
- `POST /api/chat/:id/message` - Add message to chat
- `PUT /api/chat/:id/title` - Update chat title
- `PUT /api/chat/:id/archive` - Archive chat
- `POST /api/chat/:id/response` - Get AI response

## Multi-Personality Engine

### How It Works

The personality system uses **prompt-based response generation**:

1. **User selects personality** when creating a chat
2. **Backend stores personality** with chat data
3. **On message send:**
   - User message sent to backend
   - Backend retrieves chat's personality
   - Personality-specific prompt applied
   - AI response generated in that "tone"
   - Response saved with user message

### Personality Prompts

**Sweet Bot 💖**
- "You are Sweet Bot, a caring, polite, and warm AI assistant..."
- Uses emojis naturally
- Encouraging and supportive tone

**Angry Bot 😤**
- "You are Angry Bot, a sarcastic and irritated AI..."
- Short, witty responses
- Acts inconvenienced but safe

**Grandpa Bot 🧓**
- "You are Grandpa Bot, a wise, old-fashioned AI..."
- Tells stories from "the old days"
- Nostalgic and takes time explaining

### Intelligent Response Routing

The backend includes smart response templates for:
- Greetings (different for each personality)
- Thank you messages
- Help requests
- General queries (with personality context)

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service or update MONGO_URI to MongoDB Atlas

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `.env` or kill process using port 5000

### JWT Token Expired
- Tokens expire after 30 days
- User auto-redirected to login
- Re-login to get new token

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Verify VITE_API_URL in client `.env` matches backend URL

### Dark Mode Not Working
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check localStorage for 'theme' key

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ingres-ai
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Development Tips

### Add New Personality
1. Update enum in `server/models/chatModel.js`
2. Add personality prompt in `server/controllers/chatController.js`
3. Update personality colors in `client/src/components/chat/PersonalitySelector.jsx`
4. Add emoji mapping

### Customize Colors
Edit `tailwind.config.js` for Tailwind colors or use inline gradient classes

### Add More Chat Features
- Use ChatContext in `client/src/context/ChatContext.jsx`
- Create new chat controller endpoint in `server/controllers/chatController.js`
- Add API method in `client/src/services/api.js`

## Production Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build  # Creates dist folder
# Deploy dist folder to Vercel or Netlify
```

### Backend (Heroku/Railway)
```bash
# Add Procfile
echo "web: npm start" > Procfile

# Deploy to Heroku
heroku create your-app-name
git push heroku main
```

## Performance Optimization

- ✅ Image lazy loading in chat
- ✅ Message virtualization for long chats
- ✅ Context API memoization
- ✅ Framer Motion hardware acceleration
- ✅ API request debouncing
- ✅ MongoDB indexes on frequently queried fields

## Security Features

- ✅ JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected API routes
- ✅ Input validation with express-validator
- ✅ CORS configuration
- ✅ Helmet for HTTP headers

## Testing

### Manual Testing Checklist
- [ ] Register new user
- [ ] Login with credentials
- [ ] Create chat with each personality
- [ ] Send messages and receive responses
- [ ] Switch personality mid-chat
- [ ] View chat history
- [ ] Edit profile
- [ ] Toggle theme
- [ ] Delete account
- [ ] Logout

## Support & Troubleshooting

For issues, check:
1. Console for error messages
2. MongoDB Atlas connection status
3. Backend logs in terminal
4. Network tab in browser DevTools
5. .env file configuration

## Future Enhancements

- [ ] Integration with real AI models (OpenAI API)
- [ ] Voice chat support
- [ ] Chat export to PDF
- [ ] Collaborative chats
- [ ] Mobile app (React Native)
- [ ] WebSocket for real-time updates
- [ ] Rate limiting
- [ ] Advanced analytics

---

**Built with ❤️ using MERN Stack**
