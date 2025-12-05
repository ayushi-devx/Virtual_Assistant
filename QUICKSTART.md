# 🚀 INGRES AI - Quick Start Guide

## One-Command Start (Recommended for Development)

### Windows
```bash
# Terminal 1 - Backend
cd virtual-assistant\server && npm run dev

# Terminal 2 - Frontend (in new terminal)
cd virtual-assistant\client && npm run dev

# MongoDB should be running (start separately or use MongoDB Atlas)
```

### macOS/Linux
```bash
# Terminal 1 - Backend
cd virtual-assistant/server && npm run dev

# Terminal 2 - Frontend (in new terminal)
cd virtual-assistant/client && npm run dev
```

## URLs
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

---

## Demo Credentials

**For Testing:**
```
Email: test@example.com
Password: password123
```

Or create a new account during signup.

---

## 3-Minute Quick Setup

### 1. Install Dependencies
```bash
# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 2. Start MongoDB
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas - update .env file with connection string
```

### 3. Start Both Services
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

### 4. Open Browser
Navigate to: **http://localhost:5173**

---

## Features to Try

### 1. **Sign Up**
- Create account with email and password
- Email required for authentication

### 2. **Choose Personality**
After login, select one of three bot personalities:
- 💖 **Sweet Bot** - Caring and supportive
- 😤 **Angry Bot** - Sarcastic and quick
- 🧓 **Grandpa Bot** - Wise and nostalgic

### 3. **Start Chatting**
- Type messages and send (Enter key)
- AI responds in chosen personality
- Messages auto-save

### 4. **Switch Personality Anytime**
- Click personality emoji in chat header
- Select new personality instantly
- Continue conversation with new tone

### 5. **View Chat History**
- All chats listed in sidebar
- Click to open previous chats
- "New Chat" button for fresh conversation

### 6. **Dark/Light Mode**
- Toggle theme in top-right corner
- Preference auto-saved

### 7. **Profile Settings**
- Click profile icon → Profile
- Edit name and email
- Delete account option available

---

## Troubleshooting Quick Fixes

### "Cannot connect to MongoDB"
```bash
# Start MongoDB (macOS)
brew services start mongodb-community

# Or start MongoDB server (Windows)
mongod
```

### "EADDRINUSE: address already in use :::5000"
Change port in `server/.env`:
```env
PORT=5001  # Use different port
```

### "Frontend not connecting to backend"
Check `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Theme toggle not working
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache

---

## File Structure (Key Files)

```
virtual-assistant/
├── server/
│   ├── .env                    ← Configuration
│   ├── server.js               ← Main server
│   └── controllers/
│       ├── authController.js   ← Auth logic
│       └── chatController.js   ← Chat logic + personalities
│
└── client/
    ├── .env                    ← API URL
    ├── src/
    │   ├── App.jsx             ← Main app + routing
    │   ├── context/
    │   │   ├── AuthContext.jsx ← Login/signup logic
    │   │   └── ChatContext.jsx ← Chat logic
    │   └── pages/
    │       ├── Chat.jsx        ← Main chat interface
    │       ├── Login.jsx
    │       └── Profile.jsx
```

---

## API Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login user |
| GET | `/api/chat` | Get all chats |
| POST | `/api/chat` | Create new chat |
| POST | `/api/chat/:id/response` | Get AI response |
| PUT | `/api/auth/theme` | Toggle theme |

---

## Default Personalities

### Sweet Bot 💖
```
Tone: Caring, supportive, warm
Emojis: Yes, natural usage
Examples: "Oh, that's wonderful! 💖"
```

### Angry Bot 😤
```
Tone: Sarcastic, quick, witty
Emojis: Minimal, expressive
Examples: "Ugh, fine. Whatever. 😤"
```

### Grandpa Bot 🧓
```
Tone: Wise, nostalgic, patient
Emojis: Old-timey
Examples: "Back in my day... 🧓"
```

---

## Common Tasks

### Create New Chat
1. Click **"+ New Chat"** in sidebar
2. Select personality
3. Start typing

### Switch Personality
1. While in chat, click personality emoji (💖 😤 🧓)
2. Select new personality
3. Chat continues with new tone

### Edit Profile
1. Click profile icon (top-right)
2. Select "Profile"
3. Click "Edit Profile"
4. Make changes and save

### Delete Account
1. Go to Profile page
2. Scroll to "Danger Zone"
3. Click "Delete Account"
4. Confirm deletion

---

## Performance Tips

- Keep MongoDB running in background
- Use Chrome/Edge for best performance
- Enable GPU acceleration in browser
- Close unnecessary tabs

---

## Need Help?

1. Check `SETUP.md` for detailed setup
2. Verify `.env` files
3. Ensure MongoDB is running
4. Check browser console for errors (F12)
5. Check server terminal for API errors

---

## What's Next?

- ✅ Understand how personalities work
- ✅ Explore all three personalities
- ✅ Try switching mid-conversation
- ✅ Edit profile
- ✅ Create multiple chats
- ✅ Toggle theme

**Happy Chatting! 🎉**
