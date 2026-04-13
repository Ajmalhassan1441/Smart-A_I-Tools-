'use client';

import { useState, useEffect, useRef } from 'react';

interface VoiceSearchProps {
  onSearchResult: (query: string, suggestedTools: any[]) => void;
  tools: any[];
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceSearch({ onSearchResult, tools }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [recognition, setRecognition] = useState<any>(null);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (!SpeechRecognitionAPI) {
        setIsSupported(false);
        return;
      }

      createRecognitionInstance();
    }
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch(e) {}
      }
    };
  }, []);

  const createRecognitionInstance = () => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognitionAPI();
    
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
      finalTranscriptRef.current = '';
      setTranscript('');
    };

    recognitionInstance.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart;
        } else {
          interimTranscript += transcriptPart;
        }
      }
      
      if (finalTranscript) {
        finalTranscriptRef.current = finalTranscriptRef.current + ' ' + finalTranscript;
      }
      
      const currentText = (finalTranscriptRef.current + ' ' + interimTranscript).trim();
      setTranscript(currentText);
      
      // Update search bar
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.value = currentText;
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setIsListening(false);
      }
    };

    recognitionInstance.onend = () => {
      console.log('Speech recognition ended');
      setIsListening(false);
      
      // Process search when mic stops
      const finalQuery = finalTranscriptRef.current.trim();
      if (finalQuery && finalQuery.length > 0) {
        processVoiceSearch(finalQuery);
      }
    };

    recognitionRef.current = recognitionInstance;
    setRecognition(recognitionInstance);
  };

  const processVoiceSearch = (query: string) => {
    if (!query || query.trim().length === 0) return;
    
    const queryLower = query.toLowerCase().trim();
    
    const scoredTools = tools.map((tool: any) => {
      let score = 0;
      const toolText = `${tool.name} ${tool.category} ${tool.description}`.toLowerCase();
      
      if (queryLower.includes(tool.name.toLowerCase())) {
        score += 50;
      }
      
      if (queryLower.includes(tool.category.toLowerCase())) {
        score += 30;
      }
      
      const keywords = {
        'write': ['write', 'writing', 'blog', 'article', 'content', 'essay', 'story', 'copy', 'email'],
        'image': ['image', 'picture', 'photo', 'art', 'draw', 'illustration', 'logo', 'design'],
        'video': ['video', 'edit', 'animation', 'youtube', 'film', 'movie', 'clip'],
        'code': ['code', 'coding', 'programming', 'developer', 'software', 'app', 'website'],
        'audio': ['audio', 'music', 'voice', 'sound', 'podcast', 'speech']
      };
      
      for (const [category, words] of Object.entries(keywords)) {
        for (const word of words) {
          if (queryLower.includes(word)) {
            if (tool.category.toLowerCase() === category.toLowerCase()) {
              score += 25;
            }
          }
        }
      }
      
      const queryWords = queryLower.split(' ');
      for (const word of queryWords) {
        if (word.length > 3 && toolText.includes(word)) {
          score += 5;
        }
      }
      
      if (tool.trending && score > 0) score += 15;
      if (tool.rating >= 4.7 && score > 0) score += 10;
      
      return { ...tool, score };
    });
    
    const suggestedTools = scoredTools
      .filter((tool: any) => tool.score > 0)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 12);
    
    if (suggestedTools.length > 0) {
      onSearchResult(query, suggestedTools);
    }
  };

  const startListening = async () => {
    // Request microphone permission
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      alert('Please allow microphone access to use voice search');
      return;
    }
    
    // Create new instance each time
    createRecognitionInstance();
    setTranscript('');
    finalTranscriptRef.current = '';
    
    try {
      recognitionRef.current.start();
    } catch (e) {
      console.log('Error starting recognition');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch(e) {
        console.log('Error stopping recognition');
      }
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <button
        disabled
        className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl cursor-not-allowed opacity-50"
        title="Voice search not supported"
      >
        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleListening}
        className={`p-3 rounded-xl transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 animate-pulse shadow-lg ring-4 ring-red-300' 
            : 'bg-linear-to-r from-purple-500 to-pink-500 hover:scale-105 hover:shadow-lg'
        }`}
        title={isListening ? "Click to stop" : "Click to speak"}
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      </button>
      
      {isListening && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-2 z-50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span>Listening... Click mic to stop</span>
        </div>
      )}
    </div>
  );
}