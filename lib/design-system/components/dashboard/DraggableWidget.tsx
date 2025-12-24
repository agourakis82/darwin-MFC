/**
 * DRAGGABLE WIDGET
 * =================
 *
 * Wrapper component for dashboard widgets with drag-and-drop support
 * Uses @dnd-kit/sortable for smooth dragging and reordering
 *
 * Features:
 * - Drag-and-drop reordering
 * - Touch support for mobile
 * - Visual feedback during drag
 * - Accessibility with keyboard navigation
 * - Collapse/expand functionality
 * - Remove widget action
 */

'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  GripVertical,
  ChevronDown,
  ChevronUp,
  X,
  Maximize2,
  Settings,
} from 'lucide-react';
import { Button } from '../../primitives/button';
import { Card } from '../../primitives/card';

// ============================================================================
// TYPES
// ============================================================================

export interface DraggableWidgetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof widgetVariants> {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  draggable?: boolean;
  collapsible?: boolean;
  removable?: boolean;
  expandable?: boolean;
  showSettings?: boolean;
  loading?: boolean;
  error?: string | null;
  onCollapse?: (collapsed: boolean) => void;
  onRemove?: () => void;
  onExpand?: () => void;
  onSettings?: () => void;
  actions?: React.ReactNode;
}

// ============================================================================
// VARIANTS
// ============================================================================

const widgetVariants = cva(
  ['relative transition-all duration-200'],
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-neutral-900',
        bordered: 'border border-neutral-200 dark:border-neutral-800',
        glass: 'bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md',
        clinical: 'border-l-4 border-l-clinical-info-base bg-clinical-info-base/5',
      },
      size: {
        sm: 'min-h-[200px]',
        md: 'min-h-[300px]',
        lg: 'min-h-[400px]',
        xl: 'min-h-[500px]',
        auto: 'min-h-0',
      },
    },
    defaultVariants: {
      variant: 'bordered',
      size: 'md',
    },
  }
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const DraggableWidget = React.forwardRef<
  HTMLDivElement,
  DraggableWidgetProps
>(
  (
    {
      id,
      title,
      subtitle,
      children,
      draggable = true,
      collapsible = true,
      removable = true,
      expandable = false,
      showSettings = false,
      loading = false,
      error = null,
      onCollapse,
      onRemove,
      onExpand,
      onSettings,
      actions,
      variant,
      size = 'auto',
      className,
      ...props
    },
    ref
  ) => {
    // Local state
    const [collapsed, setCollapsed] = useState(false);

    // Sortable setup
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id,
      disabled: !draggable,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    // Handle collapse toggle
    const handleToggleCollapse = () => {
      const newCollapsed = !collapsed;
      setCollapsed(newCollapsed);
      onCollapse?.(newCollapsed);
    };

    // Handle remove
    const handleRemove = () => {
      onRemove?.();
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          widgetVariants({ variant, size }),
          isDragging && 'ring-2 ring-brand-primary-500 shadow-lg scale-105',
          className
        )}
        {...props}
      >
        <Card variant="outline" padding="md" className="h-full">
          {/* Widget Header */}
          <div className="flex items-start gap-3 mb-4">
            {/* Drag Handle */}
            {draggable && (
              <button
                {...attributes}
                {...listeners}
                className={cn(
                  'mt-1 cursor-grab active:cursor-grabbing',
                  'text-neutral-400 hover:text-neutral-600',
                  'dark:text-neutral-600 dark:hover:text-neutral-400',
                  'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500',
                  'rounded'
                )}
                aria-label="Drag to reorder"
              >
                <GripVertical className="w-5 h-5" />
              </button>
            )}

            {/* Title Section */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                {title}
              </h3>
              {subtitle && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Custom Actions */}
              {actions}

              {/* Settings */}
              {showSettings && onSettings && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onSettings}
                  aria-label="Widget settings"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              )}

              {/* Expand */}
              {expandable && onExpand && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onExpand}
                  aria-label="Expand widget"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              )}

              {/* Collapse */}
              {collapsible && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleToggleCollapse}
                  aria-label={collapsed ? 'Expand' : 'Collapse'}
                >
                  {collapsed ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronUp className="w-4 h-4" />
                  )}
                </Button>
              )}

              {/* Remove */}
              {removable && onRemove && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemove}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  aria-label="Remove widget"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Widget Content */}
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary-500" />
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                      Error loading widget
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      {error}
                    </p>
                  </div>
                ) : (
                  <div className="widget-content">{children}</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed State Indicator */}
          {collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-4"
            >
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                Widget collapsed
              </p>
            </motion.div>
          )}
        </Card>
      </div>
    );
  }
);

DraggableWidget.displayName = 'DraggableWidget';

// ============================================================================
// WIDGET SKELETON (Loading State)
// ============================================================================

export const WidgetSkeleton: React.FC<{
  title?: string;
  lines?: number;
}> = ({ title = 'Loading...', lines = 3 }) => {
  return (
    <div className="space-y-4">
      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 animate-pulse" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"
          style={{
            width: `${Math.random() * 30 + 60}%`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};
