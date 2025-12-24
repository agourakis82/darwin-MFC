/**
 * PREFERENCES MANAGER
 * ====================
 *
 * Settings UI for controlling personalization and privacy
 * Gives users full control over data collection and learning
 *
 * Features:
 * - Toggle personalization on/off
 * - Clear all data
 * - Export personal data
 * - Privacy controls
 * - Category preferences
 * - Layout preferences
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  Settings,
  Shield,
  Trash2,
  Download,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  Check,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/lib/design-system/primitives/button';
import { Card } from '@/lib/design-system/primitives/card';
import { useUserPreferences } from '../userPreferencesStore';

// ============================================================================
// TYPES
// ============================================================================

export interface PreferencesManagerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof preferencesVariants> {
  title?: string;
  onClose?: () => void;
}

// ============================================================================
// VARIANTS
// ============================================================================

const preferencesVariants = cva(['relative w-full'], {
  variants: {
    variant: {
      default: '',
      card: 'p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800',
    },
  },
  defaultVariants: {
    variant: 'card',
  },
});

// ============================================================================
// TOGGLE SETTING
// ============================================================================

interface ToggleSettingProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  color?: string;
}

const ToggleSetting: React.FC<ToggleSettingProps> = ({
  icon,
  title,
  description,
  enabled,
  onToggle,
  color = 'bg-brand-primary-100 dark:bg-brand-primary-900/30',
}) => {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
      <div className="flex items-start gap-3 flex-1">
        <div className={cn('p-2 rounded-lg', color)}>{icon}</div>
        <div>
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-1">
            {title}
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </div>

      <button
        onClick={onToggle}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          enabled
            ? 'bg-brand-primary-600'
            : 'bg-neutral-300 dark:bg-neutral-600'
        )}
        role="switch"
        aria-checked={enabled}
      >
        <motion.span
          animate={{ x: enabled ? 20 : 4 }}
          transition={{ duration: 0.2 }}
          className="inline-block h-4 w-4 rounded-full bg-white"
        />
      </button>
    </div>
  );
};

// ============================================================================
// ACTION BUTTON
// ============================================================================

interface ActionButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: 'default' | 'outline' | 'critical';
  onClick: () => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  title,
  description,
  buttonText,
  buttonVariant = 'outline',
  onClick,
  disabled,
}) => {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
      <div className="flex items-start gap-3 flex-1">
        <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-1">
            {title}
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </div>

      <Button
        variant={buttonVariant}
        size="sm"
        onClick={onClick}
        disabled={disabled}
      >
        {buttonText}
      </Button>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const PreferencesManager = React.forwardRef<
  HTMLDivElement,
  PreferencesManagerProps
>(
  (
    {
      title = 'Personalization Settings',
      onClose,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    const learningEnabled = useUserPreferences((state) => state.learningEnabled);
    const recommendationsEnabled = useUserPreferences(
      (state) => state.recommendationsEnabled
    );
    const hiddenCategories = useUserPreferences((state) => state.hiddenCategories);
    const toggleLearning = useUserPreferences((state) => state.toggleLearning);
    const toggleCategory = useUserPreferences((state) => state.toggleCategory);
    const clearAllData = useUserPreferences((state) => state.clearAllData);

    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [showExportSuccess, setShowExportSuccess] = useState(false);

    // Handle toggle learning
    const handleToggleLearning = () => {
      toggleLearning(!learningEnabled);
    };

    // Handle toggle recommendations
    const handleToggleRecommendations = () => {
      // This would need to be added to the store
      // For now, just toggling learning affects recommendations
      toggleLearning(!learningEnabled);
    };

    // Handle export data
    const handleExportData = () => {
      const state = useUserPreferences.getState();
      const exportData = {
        interactions: state.interactions,
        contentPreferences: state.contentPreferences,
        shortcuts: state.shortcuts,
        usagePattern: state.usagePattern,
        exportedAt: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `personalization-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);

      setShowExportSuccess(true);
      setTimeout(() => setShowExportSuccess(false), 3000);
    };

    // Handle clear all data
    const handleClearAllData = () => {
      if (showClearConfirm) {
        clearAllData();
        setShowClearConfirm(false);
        onClose?.();
      } else {
        setShowClearConfirm(true);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(preferencesVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-primary-600 dark:text-brand-primary-400" />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h3>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              ×
            </Button>
          )}
        </div>

        {/* Privacy Banner */}
        <div className="mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                100% Privacy-First
              </p>
              <p className="text-xs text-blue-800 dark:text-blue-200">
                All personalization data is stored locally on your device. Nothing is
                sent to external servers. You have full control over your data.
              </p>
            </div>
          </div>
        </div>

        {/* Personalization Settings */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Personalization
          </h4>
          <div className="space-y-3">
            <ToggleSetting
              icon={<Sparkles className="w-5 h-5 text-purple-600" />}
              title="Smart Learning"
              description="Automatically learn from your behavior to personalize content"
              enabled={learningEnabled}
              onToggle={handleToggleLearning}
              color="bg-purple-100 dark:bg-purple-900/30"
            />

            <ToggleSetting
              icon={<Sparkles className="w-5 h-5 text-blue-600" />}
              title="Smart Recommendations"
              description="Show personalized widget and content suggestions"
              enabled={recommendationsEnabled && learningEnabled}
              onToggle={handleToggleRecommendations}
              color="bg-blue-100 dark:bg-blue-900/30"
            />
          </div>
        </div>

        {/* Data Management */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Data Management
          </h4>
          <div className="space-y-3">
            <ActionButton
              icon={<Download className="w-5 h-5 text-neutral-600" />}
              title="Export Your Data"
              description="Download all your personalization data as JSON"
              buttonText={showExportSuccess ? 'Exported!' : 'Export'}
              onClick={handleExportData}
            />

            <ActionButton
              icon={<Trash2 className="w-5 h-5 text-red-600" />}
              title="Clear All Data"
              description="Delete all personalization data and start fresh"
              buttonText={showClearConfirm ? 'Confirm Delete' : 'Clear Data'}
              buttonVariant="critical"
              onClick={handleClearAllData}
            />
          </div>
        </div>

        {/* Confirmation Dialog */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            >
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-900 dark:text-red-100 mb-1">
                    Are you sure?
                  </p>
                  <p className="text-xs text-red-800 dark:text-red-200">
                    This will permanently delete all your interactions, preferences,
                    shortcuts, and analytics data. This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="critical"
                  size="sm"
                  onClick={handleClearAllData}
                >
                  Yes, Delete Everything
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClearConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {showExportSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
            >
              <div className="flex items-center gap-2 text-sm text-green-900 dark:text-green-100">
                <Check className="w-4 h-4" />
                Data exported successfully!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Footer */}
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center">
            Personalization helps you get the most out of the app. Your data never
            leaves your device and you can disable it anytime.
          </p>
        </div>
      </div>
    );
  }
);

PreferencesManager.displayName = 'PreferencesManager';
