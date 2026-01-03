'use client';

import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CommandItemProps } from './types';

/**
 * Individual command item in the list
 */
export const CommandItem = memo(function CommandItem({
  command,
  isSelected,
  onClick,
  index,
}: CommandItemProps) {
  const Icon = command.icon;

  const handleClick = useCallback(() => {
    if (command.enabled !== false) {
      onClick();
    }
  }, [onClick, command.enabled]);

  return (
    <motion.button
      type="button"
      role="option"
      aria-selected={isSelected}
      aria-disabled={command.enabled === false}
      id={`command-item-${index}`}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left',
        'transition-colors duration-100',
        'focus:outline-none',
        isSelected
          ? 'bg-[#0071E3]/10 dark:bg-[#0071E3]/20 text-[#0071E3]'
          : 'text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-gray-100 dark:hover:bg-white/5',
        command.enabled === false && 'opacity-50 cursor-not-allowed'
      )}
      onClick={handleClick}
      initial={false}
      animate={{
        backgroundColor: isSelected
          ? 'rgba(0, 113, 227, 0.1)'
          : 'transparent',
      }}
      transition={{ duration: 0.1 }}
    >
      {/* Icon */}
      {Icon && (
        <div
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
            isSelected
              ? 'bg-[#0071E3]/20 text-[#0071E3]'
              : 'bg-gray-100 dark:bg-white/10 text-[#86868b]'
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate">{command.title}</span>
        </div>
        {command.subtitle && (
          <p className="text-sm text-[#86868b] truncate mt-0.5">
            {command.subtitle}
          </p>
        )}
      </div>

      {/* Shortcut */}
      {command.shortcut && (
        <div className="flex-shrink-0 flex items-center gap-1">
          {command.shortcut.split('').map((char, i) => (
            <kbd
              key={i}
              className={cn(
                'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5',
                'text-xs font-medium rounded',
                'bg-gray-100 dark:bg-white/10',
                'border border-gray-200 dark:border-white/10',
                isSelected
                  ? 'text-[#0071E3] border-[#0071E3]/20'
                  : 'text-[#86868b]'
              )}
            >
              {char}
            </kbd>
          ))}
        </div>
      )}
    </motion.button>
  );
});

export default CommandItem;
