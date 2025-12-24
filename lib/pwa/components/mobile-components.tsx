/**
 * MOBILE-SPECIFIC COMPONENTS
 * ============================
 *
 * Native-like mobile components for PWA
 * Action sheets, toasts, FAB, mobile dialogs
 *
 * Features:
 * - Action Sheet (iOS-style bottom sheet)
 * - Toast notifications
 * - Floating Action Button (FAB)
 * - Mobile Search Bar
 * - Mobile Filters & Sorting
 * - Share Sheet
 * - Mobile Modal Dialogs
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { cn } from '@/lib/design-system/utils/cn';
import {
  X,
  Check,
  AlertCircle,
  Info,
  AlertTriangle,
  Share2,
  Plus,
  Search,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { Button } from '../../design-system/primitives/button';
import { haptic } from '../../design-system/animations/haptics';

// ============================================================================
// ACTION SHEET (iOS-style bottom sheet)
// ============================================================================

export interface ActionSheetOption {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: 'default' | 'danger';
  onSelect: () => void | Promise<void>;
}

export interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  options: ActionSheetOption[];
  showCancel?: boolean;
  className?: string;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  title,
  description,
  options,
  showCancel = true,
  className,
}) => {
  const handleOptionSelect = async (option: ActionSheetOption) => {
    haptic.impact('medium');
    await option.onSelect();
    onClose();
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
    }
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
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Action Sheet */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50',
              'bg-white dark:bg-neutral-900',
              'rounded-t-3xl',
              'max-h-[80vh] overflow-y-auto',
              'pb-safe',
              className
            )}
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
            </div>

            {/* Header */}
            {(title || description) && (
              <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
                {title && (
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* Options */}
            <div className="p-2">
              {options.map((option, index) => {
                const Icon = option.icon;
                const isDanger = option.variant === 'danger';

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option)}
                    className={cn(
                      'flex items-center gap-3 w-full px-4 py-4',
                      'min-h-[56px]', // Touch-friendly
                      'rounded-xl',
                      'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                      'transition-colors',
                      isDanger && 'text-red-600 dark:text-red-400'
                    )}
                  >
                    {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                    <span className="text-base font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Cancel Button */}
            {showCancel && (
              <div className="p-2 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={onClose}
                  className={cn(
                    'w-full px-4 py-4 rounded-xl',
                    'min-h-[56px]',
                    'text-base font-semibold',
                    'text-neutral-700 dark:text-neutral-300',
                    'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  )}
                >
                  Cancel
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// TOAST NOTIFICATION
// ============================================================================

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  isVisible: boolean;
  onClose: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const toastConfig = {
  success: {
    icon: Check,
    bg: 'bg-green-500',
    text: 'text-white',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-red-500',
    text: 'text-white',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-yellow-500',
    text: 'text-white',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-500',
    text: 'text-white',
  },
};

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  duration = 3000,
  isVisible,
  onClose,
  action,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const config = toastConfig[variant];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
        >
          <div
            className={cn(
              'flex items-center gap-3 p-4 rounded-xl shadow-lg',
              config.bg,
              config.text
            )}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <p className="flex-1 font-medium">{message}</p>

            {action && (
              <button
                onClick={action.onClick}
                className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 font-semibold"
              >
                {action.label}
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// TOAST MANAGER HOOK
// ============================================================================

export interface ToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useToast() {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const show = (options: ToastOptions) => {
    haptic.impact('light');
    setToast(options);
  };

  const hide = () => {
    setToast(null);
  };

  const ToastComponent = toast ? (
    <Toast
      message={toast.message}
      variant={toast.variant}
      duration={toast.duration}
      isVisible={!!toast}
      onClose={hide}
      action={toast.action}
    />
  ) : null;

  return {
    show,
    hide,
    ToastComponent,
  };
}

// ============================================================================
// FLOATING ACTION BUTTON (FAB)
// ============================================================================

export interface FABProps {
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  onClick: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  variant?: 'primary' | 'secondary';
  extended?: boolean;
  className?: string;
}

export const FloatingActionButton: React.FC<FABProps> = ({
  icon: Icon = Plus,
  label,
  onClick,
  position = 'bottom-right',
  variant = 'primary',
  extended = false,
  className,
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-20 right-4',
    'bottom-left': 'bottom-20 left-4',
    'bottom-center': 'bottom-20 left-1/2 -translate-x-1/2',
  };

  const variantClasses = {
    primary: 'bg-brand-primary-600 hover:bg-brand-primary-700 text-white',
    secondary: 'bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900',
  };

  return (
    <motion.button
      onClick={() => {
        haptic.impact('medium');
        onClick();
      }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'fixed z-40',
        'flex items-center gap-2',
        extended ? 'px-6 py-4' : 'p-4',
        'rounded-full shadow-lg',
        'min-h-[56px]', // Touch-friendly
        'transition-colors',
        positionClasses[position],
        variantClasses[variant],
        className
      )}
    >
      <Icon className="w-6 h-6" />
      {extended && label && <span className="font-semibold">{label}</span>}
    </motion.button>
  );
};

// ============================================================================
// MOBILE SEARCH BAR
// ============================================================================

export interface MobileSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  showCancel?: boolean;
  onCancel?: () => void;
  className?: string;
}

export const MobileSearchBar: React.FC<MobileSearchBarProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder = 'Search...',
  autoFocus = false,
  showCancel = false,
  onCancel,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn(
            'w-full pl-10 pr-4 py-3',
            'min-h-[44px]', // Touch-friendly
            'bg-neutral-100 dark:bg-neutral-800',
            'border-2 border-transparent',
            'rounded-xl',
            'text-neutral-900 dark:text-neutral-100',
            'placeholder:text-neutral-500',
            'focus:outline-none focus:border-brand-primary-500',
            'transition-colors'
          )}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showCancel && (isFocused || value) && (
        <motion.button
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          onClick={onCancel}
          className="text-brand-primary-600 dark:text-brand-primary-400 font-medium whitespace-nowrap"
        >
          Cancel
        </motion.button>
      )}
    </div>
  );
};

// ============================================================================
// MOBILE FILTER/SORT SHEET
// ============================================================================

export interface FilterOption {
  id: string;
  label: string;
  value: any;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  type: 'single' | 'multiple';
}

export interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filterGroups: FilterGroup[];
  selectedFilters: Record<string, any>;
  onFiltersChange: (filters: Record<string, any>) => void;
  onApply: () => void;
  onReset: () => void;
}

export const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({
  isOpen,
  onClose,
  filterGroups,
  selectedFilters,
  onFiltersChange,
  onApply,
  onReset,
}) => {
  const handleOptionToggle = (groupId: string, option: FilterOption, type: 'single' | 'multiple') => {
    if (type === 'single') {
      onFiltersChange({
        ...selectedFilters,
        [groupId]: option.value,
      });
    } else {
      const current = selectedFilters[groupId] || [];
      const isSelected = current.includes(option.value);
      onFiltersChange({
        ...selectedFilters,
        [groupId]: isSelected
          ? current.filter((v: any) => v !== option.value)
          : [...current, option.value],
      });
    }
  };

  const handleApply = () => {
    haptic.impact('medium');
    onApply();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 rounded-t-3xl max-h-[80vh] overflow-y-auto pb-safe"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-semibold">Filters & Sort</h3>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Groups */}
            <div className="p-4 space-y-6">
              {filterGroups.map((group) => (
                <div key={group.id}>
                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                    {group.label}
                  </h4>
                  <div className="space-y-2">
                    {group.options.map((option) => {
                      const isSelected =
                        group.type === 'single'
                          ? selectedFilters[group.id] === option.value
                          : (selectedFilters[group.id] || []).includes(option.value);

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleOptionToggle(group.id, option, group.type)}
                          className={cn(
                            'flex items-center justify-between w-full px-4 py-3',
                            'min-h-[48px]',
                            'rounded-lg',
                            'transition-colors',
                            isSelected
                              ? 'bg-brand-primary-100 dark:bg-brand-primary-900/30 text-brand-primary-700 dark:text-brand-primary-300'
                              : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          )}
                        >
                          <span className="font-medium">{option.label}</span>
                          {isSelected && <Check className="w-5 h-5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex gap-3">
              <Button variant="outline" onClick={onReset} className="flex-1">
                Reset
              </Button>
              <Button onClick={handleApply} className="flex-1">
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// SHARE SHEET
// ============================================================================

export interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  text?: string;
}

export const ShareSheet: React.FC<ShareSheetProps> = ({
  isOpen,
  onClose,
  url,
  title,
  text,
}) => {
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url, title, text });
        haptic.impact('medium');
        onClose();
      } catch (error) {
        console.error('Share failed:', error);
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    haptic.impact('medium');
    // Show success toast
    onClose();
  };

  const shareOptions: ActionSheetOption[] = [
    {
      id: 'copy',
      label: 'Copy Link',
      icon: Share2,
      onSelect: handleCopyLink,
    },
  ];

  // If native share is available, add it as first option
  if ('share' in navigator) {
    shareOptions.unshift({
      id: 'native',
      label: 'Share...',
      icon: Share2,
      onSelect: handleNativeShare,
    });
  }

  return (
    <ActionSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Share"
      description={title}
      options={shareOptions}
    />
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  ActionSheet,
  Toast,
  useToast,
  FloatingActionButton,
  MobileSearchBar,
  MobileFilterSheet,
  ShareSheet,
};
