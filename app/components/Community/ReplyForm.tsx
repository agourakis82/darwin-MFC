'use client';

/**
 * REPLY FORM COMPONENT
 * ====================
 *
 * Form for replying to forum posts.
 * Supports markdown and character limit.
 */

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Send,
  Loader2,
  Bold,
  Italic,
  Code,
  List,
  Link as LinkIcon,
  AlertCircle,
} from 'lucide-react';

// =============================================================================
// PROPS
// =============================================================================

interface ReplyFormProps {
  postId: string;
  parentReplyId?: string;
  onSubmit: (content: string) => Promise<void>;
  onCancel?: () => void;
  placeholder?: string;
  maxLength?: number;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ReplyForm({
  postId,
  parentReplyId,
  onSubmit,
  onCancel,
  placeholder,
  maxLength = 5000,
}: ReplyFormProps) {
  const t = useTranslations('community');

  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      setError(t('reply.error_empty'));
      return;
    }

    if (trimmedContent.length < 10) {
      setError(t('reply.error_too_short'));
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(trimmedContent);
      setContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('reply.error_generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = prefix) => {
    const textarea = document.getElementById('reply-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newContent =
      content.substring(0, start) +
      prefix +
      (selectedText || t('reply.placeholder_text')) +
      suffix +
      content.substring(end);

    setContent(newContent);

    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      const newStart = start + prefix.length;
      const newEnd = newStart + (selectedText || t('reply.placeholder_text')).length;
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
  };

  const remainingChars = maxLength - content.length;
  const isOverLimit = remainingChars < 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <button
          type="button"
          onClick={() => insertMarkdown('**')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          title={t('reply.format.bold')}
        >
          <Bold className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('*')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          title={t('reply.format.italic')}
        >
          <Italic className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('`')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          title={t('reply.format.code')}
        >
          <Code className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('\n- ', '')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          title={t('reply.format.list')}
        >
          <List className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('[', '](url)')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          title={t('reply.format.link')}
        >
          <LinkIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Textarea */}
      <textarea
        id="reply-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder || t('reply.placeholder')}
        disabled={isSubmitting}
        rows={4}
        className={`
          w-full p-3 border rounded-lg bg-white dark:bg-gray-800
          text-gray-900 dark:text-white placeholder-gray-500
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:opacity-50 resize-none transition-colors
          ${isOverLimit ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
        `}
      />

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span
          className={`text-sm ${
            isOverLimit
              ? 'text-red-600 dark:text-red-400'
              : remainingChars < 500
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {remainingChars} {t('reply.chars_remaining')}
        </span>

        <div className="flex gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {t('cancel')}
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || isOverLimit || !content.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('reply.submitting')}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t('reply.submit')}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ReplyForm;
