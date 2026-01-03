'use client';

import { forwardRef, useCallback, KeyboardEvent } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CommandInputProps } from './types';

/**
 * Search input for the command palette
 */
export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  function CommandInput(
    {
      value,
      onChange,
      placeholder = 'Type a command or search...',
      isLoading = false,
      onEscape,
      onEnter,
      onArrowUp,
      onArrowDown,
    },
    ref
  ) {
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
          case 'Escape':
            e.preventDefault();
            onEscape?.();
            break;
          case 'Enter':
            e.preventDefault();
            onEnter?.();
            break;
          case 'ArrowUp':
            e.preventDefault();
            onArrowUp?.();
            break;
          case 'ArrowDown':
            e.preventDefault();
            onArrowDown?.();
            break;
        }
      },
      [onEscape, onEnter, onArrowUp, onArrowDown]
    );

    return (
      <div className="relative flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-white/10">
        {/* Search icon or loading spinner */}
        <div className="flex-shrink-0 text-[#86868b]">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </div>

        {/* Input */}
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'flex-1 bg-transparent border-0 outline-none',
            'text-[#1d1d1f] dark:text-[#f5f5f7]',
            'placeholder:text-[#86868b]',
            'text-base'
          )}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-label="Command search"
          aria-autocomplete="list"
          aria-expanded="true"
          role="combobox"
        />

        {/* Escape hint */}
        <div className="flex-shrink-0 flex items-center gap-1">
          <kbd className="inline-flex items-center justify-center min-w-[24px] h-5 px-1.5 text-xs font-medium text-[#86868b] bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded">
            esc
          </kbd>
        </div>
      </div>
    );
  }
);

export default CommandInput;
