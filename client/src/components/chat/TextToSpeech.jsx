import React, { useState, useRef } from 'react';

const TextToSpeech = ({ text, theme }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(
    typeof window !== 'undefined' && window.speechSynthesis
  );
  const utteranceRef = useRef(null);

  const speak = () => {
    if (!isSupported) {
      alert('Text-to-speech not supported in your browser');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported || !text) return null;

  return (
    <button
      onClick={speak}
      className={`p-2 rounded transition-all inline-block hover:scale-110 active:scale-95 ${
        isSpeaking
          ? theme === 'dark'
            ? 'bg-blue-600 text-white'
            : 'bg-blue-500 text-white'
          : theme === 'dark'
          ? 'hover:bg-slate-700 text-slate-400'
          : 'hover:bg-slate-200 text-slate-600'
      }`}
      title={isSpeaking ? 'Stop speaking' : 'Read aloud'}
    >
      {isSpeaking ? '🔊' : '🔈'}
    </button>
  );
};

export default TextToSpeech;
