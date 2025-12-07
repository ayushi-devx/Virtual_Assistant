import React, { useState, useRef } from 'react';

const VoiceInput = ({ onVoiceInput, theme }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const isSupported = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!isSupported) {
      alert('Speech Recognition not supported in your browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcriptSegment);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (transcript.trim()) {
        onVoiceInput(transcript);
        setTranscript('');
      }
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      className={`p-3 rounded-lg transition-all hover:scale-110 active:scale-95 ${
        isListening
          ? theme === 'dark'
            ? 'bg-red-600 hover:bg-red-700 animate-pulse'
            : 'bg-red-500 hover:bg-red-600 animate-pulse'
          : theme === 'dark'
          ? 'bg-slate-700 hover:bg-slate-600'
          : 'bg-slate-200 hover:bg-slate-300'
      }`}
      title={isListening ? 'Stop listening' : 'Start voice input'}
    >
      <span className={`text-lg ${isListening ? 'text-white' : ''}`}>
        {isListening ? '🎤' : '🎙️'}
      </span>
    </button>
  );
};

export default VoiceInput;
