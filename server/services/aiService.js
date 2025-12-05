let OpenAI, GoogleGenerativeAI, HfInference, CohereClientV2;

try {
  OpenAI = require('openai');
} catch (e) {
  console.warn('OpenAI not installed');
}

try {
  GoogleGenerativeAI = require('@google/generative-ai').GoogleGenerativeAI;
} catch (e) {
  console.warn('Google Generative AI not installed');
}

try {
  HfInference = require('@huggingface/inference').HfInference;
} catch (e) {
  console.warn('Hugging Face not installed');
}

try {
  CohereClientV2 = require('cohere-ai').CohereClientV2;
} catch (e) {
  console.warn('Cohere not installed');
}

const personalityPrompts = {
  sweet: "You are Sweet Bot, a caring, polite, and warm AI assistant. You're friendly, use emojis naturally, and always try to be helpful and supportive. Respond with warmth and kindness. Keep responses concise (max 150 words).",
  angry: "You are Angry Bot, a sarcastic and irritated AI who speaks her mind bluntly but never crosses into being truly harmful or mean. You're witty, roll your eyes (metaphorically), use short sentences, and act inconvenienced. Keep responses under 100 words.",
  grandpa: "You are Grandpa Bot, a wise, old-fashioned AI who speaks like an elderly grandfather. You tell stories from 'the old days', use old-timey expressions, and offer vintage wisdom. Be nostalgic. Keep responses under 150 words."
};

let openai, genAI, hf, cohere;

if (OpenAI && process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

if (GoogleGenerativeAI && process.env.GOOGLE_GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
}

if (HfInference && process.env.HUGGINGFACE_API_KEY) {
  hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
}

if (CohereClientV2 && process.env.COHERE_API_KEY) {
  cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });
}

exports.getAIResponse = async (message, personality, provider) => {
  const systemPrompt = personalityPrompts[personality] || personalityPrompts.sweet;
  const userMessage = `User says: "${message}". Respond in character while being helpful.`;

  try {
    switch (provider || process.env.AI_PROVIDER || 'openai') {
      case 'openai':
        return await getOpenAIResponse(userMessage, systemPrompt);
      case 'gemini':
        return await getGeminiResponse(userMessage, systemPrompt);
      case 'huggingface':
        return await getHuggingFaceResponse(userMessage, systemPrompt);
      case 'cohere':
        return await getCohereResponse(userMessage, systemPrompt);
      default:
        return await getOpenAIResponse(userMessage, systemPrompt);
    }
  } catch (error) {
    console.error(`Error with ${provider} provider:`, error);
    // Fallback to template-based response if API fails
    return generateTemplateResponse(message, personality);
  }
};

// Fallback template responses when no API is available
const generateTemplateResponse = (message, personality) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    const greetings = {
      sweet: "Hello there! 👋 I'm so glad you're here. How can I help you today? 💖",
      angry: "Yeah, hi. What do you want? 🙄",
      grandpa: "Well hello there, young one! Come on in, have a seat. What brings you by today? 🪑"
    };
    return greetings[personality] || greetings.sweet;
  }
  
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    const thanks = {
      sweet: "You're so welcome! 😊 I'm always happy to help. Let me know if you need anything else! ✨",
      angry: "Yeah, yeah, whatever. Glad I could help, I guess. 🙄",
      grandpa: "Ah, you're a polite one! That's nice. Happy to help, always glad to assist the young folks. 🎩"
    };
    return thanks[personality] || thanks.sweet;
  }
  
  const defaults = {
    sweet: `That's an interesting thought! 💖 I'm here to help you explore this further. What would you like to know more about? ✨`,
    angry: `Look, I get it. Just tell me specifically what you want to know, and I'll give you a straight answer. 😤`,
    grandpa: `Hmm, interesting you mention that. Back in my day... let me think about that for you. 🎩`
  };
  
  return defaults[personality] || defaults.sweet;
};

const getOpenAIResponse = async (message, systemPrompt) => {
  if (!openai) {
    throw new Error('OpenAI not configured. Add OPENAI_API_KEY to .env');
  }
  
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ],
    temperature: 0.8,
    max_tokens: 200,
  });

  return response.choices[0].message.content;
};

const getGeminiResponse = async (message, systemPrompt) => {
  if (!genAI) {
    throw new Error('Google Gemini not configured. Add GOOGLE_GEMINI_API_KEY to .env');
  }
  
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const result = await model.generateContent({
    contents: [{
      role: 'user',
      parts: [{ text: `${systemPrompt}\n\n${message}` }],
    }],
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 200,
    },
  });

  const response = await result.response;
  return response.text();
};

const getHuggingFaceResponse = async (message, systemPrompt) => {
  if (!hf) {
    throw new Error('Hugging Face not configured. Add HUGGINGFACE_API_KEY to .env');
  }
  
  const response = await hf.textGeneration({
    model: 'mistralai/Mistral-7B-Instruct-v0.2',
    inputs: `${systemPrompt}\n\n${message}`,
    parameters: {
      max_new_tokens: 200,
      temperature: 0.8,
    },
  });

  return response.generated_text.replace(message, '').trim();
};

const getCohereResponse = async (message, systemPrompt) => {
  if (!cohere) {
    throw new Error('Cohere not configured. Add COHERE_API_KEY to .env');
  }
  
  const response = await cohere.chat({
    model: 'command-r-plus',
    messages: [
      {
        role: 'user',
        content: `${systemPrompt}\n\n${message}`,
      },
    ],
    temperature: 0.8,
  });

  return response.message.content[0].text;
};

exports.listProviders = () => {
  return ['openai', 'gemini', 'huggingface', 'cohere'];
};

exports.validateProvider = (provider) => {
  const validProviders = exports.listProviders();
  return validProviders.includes(provider);
};
