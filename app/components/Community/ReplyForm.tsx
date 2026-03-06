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
  Bold,
  Italic,
  Code,
  List,
  Link as LinkIcon,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/lib/design-system/primitives/button';
import { cn } from '@/lib/utils';

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
      <div className="flex items-center gap-1 p-1 rounded-xl border border-carbon-200/70 dark:border-carbon-800/70 bg-carbon-100/70 dark:bg-carbon-900/40">
        <button
          type="button"
          onClick={() => insertMarkdown('**')}
          className="p-2 hover:bg-carbon-200 dark:hover:bg-carbon-800/60 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500"
          title={t('reply.format.bold')}
        >
          <Bold className="w-4 h-4 text-carbon-600 dark:text-carbon-400" />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('*')}
          className="p-2 hover:bg-carbon-200 dark:hover:bg-carbon-800/60 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500"
          title={t('reply.format.italic')}
        >
          <Italic className="w-4 h-4 text-carbon-600 dark:text-carbon-400" />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('`')}
          className="p-2 hover:bg-carbon-200 dark:hover:bg-carbon-800/60 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500"
          title={t('reply.format.code')}
        >
          <Code className="w-4 h-4 text-carbon-600 dark:text-carbon-400" />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('\n- ', '')}
          className="p-2 hover:bg-carbon-200 dark:hover:bg-carbon-800/60 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500"
          title={t('reply.format.list')}
        >
          <List className="w-4 h-4 text-carbon-600 dark:text-carbon-400" />
        </button>
        <button
          type="button"
          onClick={() => insertMarkdown('[', '](url)')}
          className="p-2 hover:bg-carbon-200 dark:hover:bg-carbon-800/60 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500"
          title={t('reply.format.link')}
        >
          <LinkIcon className="w-4 h-4 text-carbon-600 dark:text-carbon-400" />
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
        aria-invalid={isOverLimit ? 'true' : 'false'}
        className={cn(
          'w-full p-3 border rounded-xl bg-paper-white dark:bg-carbon-900 text-carbon-900 dark:text-carbon-100 placeholder:text-carbon-500',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500 focus-visible:ring-offset-2',
          'disabled:opacity-50 resize-none transition-colors',
          isOverLimit ? 'border-clinical-critical-base' : 'border-carbon-300 dark:border-carbon-700'
        )}
      />

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-clinical-critical-base dark:text-critical-red-400">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span
          className={`text-sm ${
            isOverLimit
              ? 'text-clinical-critical-base dark:text-critical-red-400'
              : remainingChars < 500
              ? 'text-thymine-gold'
              : 'text-carbon-500 dark:text-carbon-400'
          }`}
        >
          {remainingChars} {t('reply.chars_remaining')}
        </span>

        <div className="flex gap-2">
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              variant="outline"
              size="sm"
            >
              {t('cancel')}
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting || isOverLimit || !content.trim()}
            size="sm"
            loading={isSubmitting}
            iconBefore={<Send className="w-4 h-4" />}
          >
            {isSubmitting ? t('reply.submitting') : t('reply.submit')}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ReplyForm;
