'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  ChatMessage,
  ChatContext,
  SuggestedPrompt,
  DEFAULT_PROMPTS,
  getContextualPrompts,
} from '@/lib/types/ai';

interface AIChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  context?: Partial<ChatContext>;
}

/**
 * AI Chat Interface Component
 * Scaffold for future AI integration - UI only
 */
export function AIChatInterface({
  isOpen,
  onClose,
  context: externalContext,
}: AIChatInterfaceProps) {
  const t = useTranslations('ai');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const context: ChatContext = {
    locale: 'pt',
    ...externalContext,
  };

  const suggestedPrompts = getContextualPrompts(context);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (scaffold - no actual AI backend yet)
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: t('comingSoonResponse'),
        timestamp: new Date().toISOString(),
        status: 'sent',
        suggestedActions: [
          {
            id: 'action-1',
            type: 'search',
            label: t('actions.searchDiseases'),
            action: '/doencas',
          },
          {
            id: 'action-2',
            type: 'navigate',
            label: t('actions.viewProtocols'),
            action: '/protocolos',
          },
        ],
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handlePromptClick = (prompt: SuggestedPrompt) => {
    handleSendMessage(prompt.prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-lg">D</span>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    {t('title')}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('subtitle')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    title={t('clearChat')}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <EmptyState
                  prompts={suggestedPrompts}
                  onPromptClick={handlePromptClick}
                  t={t}
                />
              ) : (
                <>
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} t={t} />
                  ))}
                  {isLoading && <TypingIndicator />}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('inputPlaceholder')}
                  className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2 rounded-full bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                {t('disclaimer')}
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Empty state with suggested prompts
 */
function EmptyState({
  prompts,
  onPromptClick,
  t,
}: {
  prompts: SuggestedPrompt[];
  onPromptClick: (prompt: SuggestedPrompt) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  // Group prompts by category, max 2 per category
  const categories = ['diagnosis', 'treatment', 'learning', 'general'] as const;
  const groupedPrompts = categories.reduce(
    (acc, category) => {
      acc[category] = prompts.filter((p) => p.category === category).slice(0, 2);
      return acc;
    },
    {} as Record<string, SuggestedPrompt[]>
  );

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4">
        <span className="text-3xl">D</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {t('welcome')}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {t('welcomeDescription')}
      </p>

      <div className="w-full space-y-3">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {t('suggestedPrompts')}
        </p>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(groupedPrompts).map(([category, categoryPrompts]) =>
            categoryPrompts.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => onPromptClick(prompt)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-left transition-colors group"
              >
                <span className="text-xl">{prompt.icon}</span>
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  {prompt.prompt}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Message bubble component
 */
function MessageBubble({
  message,
  t,
}: {
  message: ChatMessage;
  t: ReturnType<typeof useTranslations>;
}) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] ${
          isUser
            ? 'bg-blue-500 text-white rounded-2xl rounded-br-md'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl rounded-bl-md'
        } px-4 py-2`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>

        {/* Suggested Actions */}
        {message.suggestedActions && message.suggestedActions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <p className="text-xs font-medium opacity-70">
              {t('suggestedActions')}
            </p>
            <div className="flex flex-wrap gap-2">
              {message.suggestedActions.map((action) => (
                <a
                  key={action.id}
                  href={action.action}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Citations */}
        {message.citations && message.citations.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs font-medium opacity-70 mb-2">
              {t('citations')}
            </p>
            <div className="space-y-1">
              {message.citations.map((citation) => (
                <a
                  key={citation.id}
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs opacity-80 hover:opacity-100 underline"
                >
                  {citation.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Typing indicator for loading state
 */
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default AIChatInterface;
