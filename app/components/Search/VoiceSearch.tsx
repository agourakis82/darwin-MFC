/**
 * VOICE SEARCH COMPONENT
 * ======================
 *
 * Voice-activated search using Web Speech API
 * Perfect for hands-free clinical consultation
 */

'use client';

import { useState, useEffect, useRef } from 'react';

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
  language?: string;
}

export default function VoiceSearch({
  onResult,
  onError,
  language = 'pt-BR',
}: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setIsSupported(true);

        // Initialize recognition
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = language;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsListening(true);
          setTranscript('');
        };

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptPiece = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
              finalTranscript += transcriptPiece;
            } else {
              interimTranscript += transcriptPiece;
            }
          }

          setTranscript(finalTranscript || interimTranscript);

          if (finalTranscript) {
            onResult(finalTranscript);
            setIsListening(false);
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);

          const errorMessages: Record<string, string> = {
            'no-speech': 'Nenhuma fala detectada. Tente novamente.',
            'audio-capture': 'Microfone não disponível.',
            'not-allowed': 'Permissão para microfone negada.',
            'network': 'Erro de rede. Verifique sua conexão.',
          };

          const errorMessage =
            errorMessages[event.error] || 'Erro ao reconhecer fala.';

          if (onError) {
            onError(errorMessage);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, onResult, onError]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  if (!isSupported) {
    return null; // Don't show if not supported
  }

  return (
    <div className="relative">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`
          p-3 rounded-full transition-all duration-300
          ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : 'bg-blue-500 hover:bg-blue-600'
          }
          text-white shadow-lg hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        `}
        title={isListening ? 'Clique para parar' : 'Buscar por voz'}
        aria-label={isListening ? 'Parar gravação' : 'Iniciar busca por voz'}
      >
        {isListening ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        )}
      </button>

      {/* Visual feedback while listening */}
      {isListening && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-red-500 rounded animate-pulse" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-4 bg-red-500 rounded animate-pulse" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-4 bg-red-500 rounded animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {transcript || 'Ouvindo...'}
            </span>
          </div>
        </div>
      )}

      {/* Microphone permission hint */}
      {!isListening && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          🎤 Busca por voz
        </div>
      )}
    </div>
  );
}
