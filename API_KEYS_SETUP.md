# AI API Keys Setup Guide

This guide explains how to set up API keys for all supported AI providers in the INGRES chatbot.

## Supported AI Providers

1. **OpenAI ChatGPT** (Recommended - Free tier available)
2. **Google Gemini** (Free tier available)
3. **Hugging Face** (Free tier available)
4. **Cohere** (Free tier available)

---

## 1. OpenAI ChatGPT Setup

### Get Your API Key
1. Go to [https://platform.openai.com](https://platform.openai.com)
2. Sign up or login with your account
3. Navigate to **API Keys** section (left sidebar)
4. Click **Create new secret key**
5. Copy the key (starts with `sk-`)

### Add to .env
```
OPENAI_API_KEY=sk-your-actual-key-here
```

### Free Trial
- OpenAI provides $5 free credits for new accounts (valid for 3 months)
- After that: Pay-as-you-go pricing (~$0.002 per message for gpt-3.5-turbo)

---

## 2. Google Gemini Setup

### Get Your API Key
1. Go to [https://ai.google.dev](https://ai.google.dev)
2. Click **Get API Key**
3. Create a new project or use existing
4. Click **Create API Key**
5. Copy the generated key

### Add to .env
```
GOOGLE_GEMINI_API_KEY=your-actual-key-here
```

### Free Tier
- Gemini API is **completely free** to use
- 60 requests per minute limit
- Perfect for testing!

---

## 3. Hugging Face Setup

### Get Your API Key
1. Go to [https://huggingface.co](https://huggingface.co)
2. Sign up or login
3. Go to **Settings** → **Access Tokens**
4. Click **New token**
5. Select **Read** access
6. Copy the token

### Add to .env
```
HUGGINGFACE_API_KEY=hf_your-actual-key-here
```

### Free Tier
- Hugging Face offers free inference API
- Models available: Mistral, Llama 2, and more
- Rate limits apply (approx 30-60 requests/minute)

---

## 4. Cohere Setup

### Get Your API Key
1. Go to [https://dashboard.cohere.com](https://dashboard.cohere.com)
2. Sign up or login
3. Navigate to **API Keys**
4. Click **Generate** or use existing key
5. Copy the key

### Add to .env
```
COHERE_API_KEY=your-actual-key-here
```

### Free Tier
- Cohere provides **1000 free requests/month**
- Great for small-scale testing
- After free tier: Pay-as-you-go pricing

---

## Setup Instructions

### Step 1: Update .env File
Edit `server/.env` and add all API keys:

```env
# AI Provider Configuration
AI_PROVIDER=openai

# OpenAI API
OPENAI_API_KEY=sk-your-key-here

# Google Gemini API
GOOGLE_GEMINI_API_KEY=your-key-here

# Hugging Face API
HUGGINGFACE_API_KEY=hf_your-key-here

# Cohere API
COHERE_API_KEY=your-key-here
```

### Step 2: Default Provider
Set which AI provider to use by default:
```env
AI_PROVIDER=openai
```

Options: `openai`, `gemini`, `huggingface`, `cohere`

### Step 3: Restart Backend
```bash
cd server
npm run dev
```

### Step 4: Test in Frontend
1. Start the app
2. Create a new chat
3. Send a message
4. Observe the response from your selected AI provider
5. Use the provider selector button to switch providers mid-chat

---

## Usage in Chat

### Selecting AI Provider
- **Chat Header**: Look for the AI provider selector (🤖 ChatGPT, ✨ Gemini, 🤗 HuggingFace, 🌊 Cohere)
- Click the button to see all available providers
- Select any provider to switch instantly

### Switching Between Providers
You can switch AI providers within the same chat:
1. Keep the same personality (Sweet/Angry/Grandpa)
2. Change the underlying AI provider
3. Each message can come from a different AI provider

---

## Recommended Setup for Testing

### Quick Start (Use Free Tier)
For the fastest setup with free tier:

1. **Primary**: Use **Google Gemini** (completely free, no credit card needed)
   - Best for immediate testing
   - No rate limiting for reasonable use

2. **Secondary**: Use **OpenAI** ($5 free credits)
   - Most powerful responses
   - Requires credit card but gives free credits

3. **Tertiary**: Use **Hugging Face** (free with limits)
   - Open-source models
   - Good alternative to commercial APIs

### Production Setup
For production/commercial use:
1. OpenAI: Most reliable, best quality
2. Cohere: Good pricing for large volume
3. Gemini: Good pricing and quality
4. HuggingFace: Self-hosted option available

---

## Troubleshooting

### "Invalid API Key" Error
- Check that the key is correctly copied (no extra spaces)
- Ensure the key is for the correct provider
- For OpenAI: Make sure key starts with `sk-`
- For Gemini: Keys should be alphanumeric

### "Rate Limit Exceeded"
- You've hit the free tier limit
- Wait before sending more messages
- Consider upgrading to paid tier
- Or switch to a different provider

### No Response from Bot
1. Check browser console (F12) for errors
2. Check server logs for API errors
3. Verify API key is correctly set in `.env`
4. Restart the backend server after changing `.env`

### Provider Not Changing
1. Wait 2-3 seconds after clicking
2. Check that API key for new provider is valid
3. Look for error message in browser console
4. Try switching to a different provider

---

## API Response Times

Average response times (first response):

| Provider | Time | Quality | Cost |
|----------|------|---------|------|
| OpenAI | 2-4s | Excellent | $0.002/msg |
| Gemini | 3-5s | Very Good | Free (rate limited) |
| Cohere | 2-3s | Good | $0.00008/msg |
| HuggingFace | 4-6s | Good | Free (rate limited) |

---

## Security Notes

⚠️ **Important**:
- Never commit `.env` file to git
- Keep API keys secret
- Use environment variables, never hardcode keys
- Rotate keys regularly
- Monitor API usage for unexpected charges

---

## Questions or Issues?

For each provider's documentation:
- OpenAI: https://platform.openai.com/docs
- Google Gemini: https://ai.google.dev/docs
- Hugging Face: https://huggingface.co/docs
- Cohere: https://docs.cohere.com

---

Generated: Dec 5, 2025
INGRES AI Virtual Assistant
