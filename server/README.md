# INGRES AI Virtual Assistant - Backend

This is the backend server for the INGRES AI Virtual Assistant, built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**
  - Register new users
  - Login with JWT
  - Protected routes
  - User profile management

- **Chat Functionality**
  - Create and manage chat sessions
  - Multiple AI personalities (Sweet, Angry, Grandpa)
  - Real-time message handling
  - Chat history

- **User Settings**
  - Light/Dark theme toggle
  - Profile customization
  - Account management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ingres-ai-virtual-assistant.git
   cd ingres-ai-virtual-assistant/server
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables
   - Create a `.env` file in the root directory
   - Copy the contents from `.env.example` and update with your configuration

4. Start the development server
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/ingres-ai

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `DELETE /api/auth/profile` - Delete user account
- `PUT /api/auth/theme` - Toggle theme (light/dark)

### Chats
- `GET /api/chat` - Get all chats for the authenticated user
- `POST /api/chat` - Create a new chat
- `GET /api/chat/:id` - Get a single chat with messages
- `POST /api/chat/:id/message` - Add a message to a chat
- `PUT /api/chat/:id/title` - Update chat title
- `PUT /api/chat/:id/archive` - Archive a chat
- `POST /api/chat/:id/response` - Get AI response for a message

## Project Structure

```
server/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
├── models/           # Mongoose models
├── routes/           # API routes
├── utils/            # Utility functions
├── .env              # Environment variables
├── .env.example      # Example environment variables
├── package.json      # Project dependencies
└── server.js         # Server entry point
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
