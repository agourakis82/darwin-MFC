'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type InfoDensity = 'comfortable' | 'compact' | 'clinical';

export interface DensityToggleProps {
  value: InfoDensity;
  onChange: (density: InfoDensity) => void;
  className?: string;
  showLabels?: boolean;
}

interface DensityOption {
  value: InfoDensity;
  label: string;
  description: string;
  emoji: string;
}

const densityOptions: DensityOption[] = [
  {
    value: 'comfortable',
    label: 'Comfortable',
    description: 'Generous spacing, larger text',
    emoji: '😊',
  },
  {
    value: 'compact',
    label: 'Compact',
    description: 'Optimized for power users',
    emoji: '⚡',
  },
  {
    value: 'clinical',
    label: 'Clinical',
    description: 'Maximum density for bedside',
    emoji: '🏥',
  },
];

export function DensityToggle({
  value,
  onChange,
  className,
  showLabels = true,
}: DensityToggleProps) {
  const handleChange = useCallback(
    (density: InfoDensity) => {
      onChange(density);
    },
    [onChange]
  );

  return (
    <div className={cn('inline-flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg', className)}>
      {densityOptions.map((option) => (
        <motion.button
          key={option.value}
          onClick={() => handleChange(option.value)}
          className={cn(
            'px-3 py-2 rounded-md font-medium transition-colors relative',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600',
            value === option.value
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={option.description}
        >
          {/* Background animation */}
          {value === option.value && (
            <motion.div
              layoutId="density-bg"
              className="absolute inset-0 bg-white dark:bg-gray-700 rounded-md -z-10"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}

          {/* Content */}
          <span className="flex items-center gap-1.5">
            <span className="text-lg">{option.emoji}</span>
            {showLabels && <span className="hidden sm:inline text-sm">{option.label}</span>}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

export default DensityToggle;
