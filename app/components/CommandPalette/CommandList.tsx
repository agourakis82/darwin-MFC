'use client';

import { memo, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CommandGroup } from './CommandGroup';
import type { CommandListProps } from './types';
import { CATEGORY_CONFIG } from './types';

/**
 * Virtualized command list with grouping
 */
export const CommandList = memo(function CommandList({
  groups,
  selectedIndex,
  onSelect,
  onSelectionChange,
  emptyMessage = 'No results found',
  isLoading = false,
}: CommandListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLDivElement>(null);

  // Sort groups by category order
  const sortedGroups = useMemo(() => {
    return [...groups].sort((a, b) => {
      const orderA = CATEGORY_CONFIG[a.category]?.order ?? 999;
      const orderB = CATEGORY_CONFIG[b.category]?.order ?? 999;
      return orderA - orderB;
    });
  }, [groups]);

  // Calculate total items for selection tracking
  const totalItems = useMemo(() => {
    return sortedGroups.reduce((sum, group) => sum + group.commands.length, 0);
  }, [sortedGroups]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.querySelector(
        `[id="command-item-${selectedIndex}"]`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-[#86868b]">
        <Loader2 className="w-8 h-8 animate-spin mb-3" />
        <p className="text-sm">Searching...</p>
      </div>
    );
  }

  // Empty state
  if (totalItems === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12 text-[#86868b]"
      >
        <Inbox className="w-12 h-12 mb-3 opacity-50" />
        <p className="text-sm font-medium">{emptyMessage}</p>
        <p className="text-xs mt-1 opacity-70">
          Try a different search term
        </p>
      </motion.div>
    );
  }

  // Build groups with running index
  let runningIndex = 0;
  const groupsWithIndex = sortedGroups.map((group) => {
    const startIndex = runningIndex;
    runningIndex += group.commands.length;
    return { ...group, startIndex };
  });

  return (
    <div
      ref={listRef}
      className="max-h-[60vh] overflow-y-auto overscroll-contain"
      role="listbox"
      aria-label="Command results"
    >
      <AnimatePresence mode="popLayout">
        {groupsWithIndex.map((group) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
          >
            <CommandGroup
              label={CATEGORY_CONFIG[group.category]?.label || group.category}
              commands={group.commands}
              startIndex={group.startIndex}
              selectedIndex={selectedIndex}
              onSelect={onSelect}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

export default CommandList;
