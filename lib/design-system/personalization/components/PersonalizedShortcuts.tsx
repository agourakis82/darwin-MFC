/**
 * PERSONALIZED SHORTCUTS
 * =======================
 *
 * Smart shortcuts component showing frequently accessed content
 * Auto-organizes based on usage patterns
 *
 * Features:
 * - Auto-sorted by frequency
 * - Pin/unpin functionality
 * - Quick access links
 * - Category grouping
 * - Drag-to-reorder (future)
 * - Responsive grid layout
 */

'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  Pin,
  X,
  ExternalLink,
  Folder,
  Star,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/lib/design-system/primitives/button';
import { Card } from '@/lib/design-system/primitives/card';
import { useUserPreferences, PersonalizedShortcut } from '../userPreferencesStore';

// ============================================================================
// TYPES
// ============================================================================

export interface PersonalizedShortcutsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shortcutsVariants> {
  title?: string;
  maxShortcuts?: number;
  showCategories?: boolean;
  showFrequency?: boolean;
  compact?: boolean;
  onShortcutClick?: (shortcut: PersonalizedShortcut) => void;
}

// ============================================================================
// VARIANTS
// ============================================================================

const shortcutsVariants = cva(['relative w-full'], {
  variants: {
    variant: {
      default: '',
      card: 'p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ============================================================================
// SHORTCUT CARD
// ============================================================================

interface ShortcutCardProps {
  shortcut: PersonalizedShortcut;
  compact?: boolean;
  showFrequency?: boolean;
  onPin: () => void;
  onRemove: () => void;
  onClick?: () => void;
}

const ShortcutCard: React.FC<ShortcutCardProps> = ({
  shortcut,
  compact,
  showFrequency,
  onPin,
  onRemove,
  onClick,
}) => {
  const timeSinceLastUse = useMemo(() => {
    const now = Date.now();
    const diffInMinutes = Math.floor((now - shortcut.lastUsed) / 1000 / 60);

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }, [shortcut.lastUsed]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={cn(
        'group relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700',
        'bg-white dark:bg-neutral-800 hover:shadow-md transition-shadow',
        compact ? 'p-3' : 'p-4'
      )}
    >
      <Link
        href={shortcut.url}
        onClick={onClick}
        className="block"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {shortcut.pinned && (
                <Pin className="w-3 h-3 text-brand-primary-600 dark:text-brand-primary-400 fill-current" />
              )}
              <h4
                className={cn(
                  'font-semibold text-neutral-900 dark:text-neutral-100 truncate',
                  compact ? 'text-sm' : 'text-base'
                )}
              >
                {shortcut.title}
              </h4>
            </div>

            <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
              <span className="flex items-center gap-1 capitalize">
                <Folder className="w-3 h-3" />
                {shortcut.category}
              </span>

              {showFrequency && (
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {shortcut.frequency}x
                </span>
              )}

              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {timeSinceLastUse}
              </span>
            </div>
          </div>

          <ExternalLink className="w-4 h-4 text-neutral-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      {/* Actions (visible on hover) */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            onPin();
          }}
          className={cn(
            'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm',
            shortcut.pinned && 'text-brand-primary-600 dark:text-brand-primary-400'
          )}
          aria-label={shortcut.pinned ? 'Unpin' : 'Pin'}
        >
          <Pin className={cn('w-3 h-3', shortcut.pinned && 'fill-current')} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            onRemove();
          }}
          className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm text-red-600 hover:text-red-700"
          aria-label="Remove"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const PersonalizedShortcuts = React.forwardRef<
  HTMLDivElement,
  PersonalizedShortcutsProps
>(
  (
    {
      title = 'Your Shortcuts',
      maxShortcuts = 12,
      showCategories = true,
      showFrequency = true,
      compact = false,
      onShortcutClick,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    const shortcuts = useUserPreferences((state) => state.shortcuts);
    const pinShortcut = useUserPreferences((state) => state.pinShortcut);
    const removeShortcut = useUserPreferences((state) => state.removeShortcut);

    // Sort and limit shortcuts
    const displayedShortcuts = useMemo(() => {
      return shortcuts
        .sort((a, b) => {
          // Pinned first
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;

          // Then by frequency
          return b.frequency - a.frequency;
        })
        .slice(0, maxShortcuts);
    }, [shortcuts, maxShortcuts]);

    // Group by category if enabled
    const groupedShortcuts = useMemo(() => {
      if (!showCategories) return null;

      const groups: Record<string, PersonalizedShortcut[]> = {};
      displayedShortcuts.forEach((shortcut) => {
        if (!groups[shortcut.category]) {
          groups[shortcut.category] = [];
        }
        groups[shortcut.category].push(shortcut);
      });

      return groups;
    }, [displayedShortcuts, showCategories]);

    // Handle pin toggle
    const handlePinToggle = (shortcut: PersonalizedShortcut) => {
      pinShortcut(shortcut.id, !shortcut.pinned);
    };

    // Handle remove
    const handleRemove = (shortcut: PersonalizedShortcut) => {
      removeShortcut(shortcut.id);
    };

    // Empty state
    if (displayedShortcuts.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(shortcutsVariants({ variant }), className)}
          {...props}
        >
          {title && (
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              {title}
            </h3>
          )}

          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Star className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-3" />
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
              No shortcuts yet
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              Start exploring content to build your personalized shortcuts
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(shortcutsVariants({ variant }), className)}
        {...props}
      >
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h3>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {displayedShortcuts.length} shortcuts
            </span>
          </div>
        )}

        {showCategories && groupedShortcuts ? (
          // Grouped by category
          <div className="space-y-6">
            {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
              <div key={category}>
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3 capitalize flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  {category}
                  <span className="text-xs text-neutral-500 dark:text-neutral-500">
                    ({categoryShortcuts.length})
                  </span>
                </h4>

                <div
                  className={cn(
                    'grid gap-3',
                    compact
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  )}
                >
                  <AnimatePresence>
                    {categoryShortcuts.map((shortcut) => (
                      <ShortcutCard
                        key={shortcut.id}
                        shortcut={shortcut}
                        compact={compact}
                        showFrequency={showFrequency}
                        onPin={() => handlePinToggle(shortcut)}
                        onRemove={() => handleRemove(shortcut)}
                        onClick={() => onShortcutClick?.(shortcut)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Ungrouped
          <div
            className={cn(
              'grid gap-3',
              compact
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            )}
          >
            <AnimatePresence>
              {displayedShortcuts.map((shortcut) => (
                <ShortcutCard
                  key={shortcut.id}
                  shortcut={shortcut}
                  compact={compact}
                  showFrequency={showFrequency}
                  onPin={() => handlePinToggle(shortcut)}
                  onRemove={() => handleRemove(shortcut)}
                  onClick={() => onShortcutClick?.(shortcut)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }
);

PersonalizedShortcuts.displayName = 'PersonalizedShortcuts';
