'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { CommandItem } from './CommandItem';
import type { CommandGroupProps } from './types';

/**
 * A group of related commands with a label
 */
export const CommandGroup = memo(function CommandGroup({
  label,
  commands,
  startIndex,
  selectedIndex,
  onSelect,
}: CommandGroupProps) {
  if (commands.length === 0) {
    return null;
  }

  return (
    <div className="py-2" role="group" aria-label={label}>
      {/* Group label */}
      <div className="px-3 py-1.5 text-xs font-semibold text-[#86868b] uppercase tracking-wider">
        {label}
      </div>

      {/* Commands */}
      <div className="space-y-0.5">
        {commands.map((command, localIndex) => {
          const globalIndex = startIndex + localIndex;
          return (
            <CommandItem
              key={command.id}
              command={command}
              isSelected={globalIndex === selectedIndex}
              onClick={() => onSelect(command)}
              index={globalIndex}
            />
          );
        })}
      </div>
    </div>
  );
});

export default CommandGroup;
