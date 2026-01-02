'use client';

/**
 * REGION ONBOARDING MODAL - DARWIN-MFC
 * ====================================
 *
 * Modal component that appears on first visit to help users select
 * their healthcare region. Persists selection to localStorage.
 *
 * Usage:
 * ```tsx
 * // Add to layout or root component
 * <RegionOnboardingModal />
 * ```
 *
 * The modal automatically shows only if no region has been set in localStorage.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ArrowRight } from 'lucide-react';
import { useRegion } from '@/lib/context/RegionContext';
import { REGIONS, getRegionUIInfo } from '@/lib/data/regions';
import type { Region } from '@/lib/types/region';

// =============================================================================
// CONSTANTS
// =============================================================================

const STORAGE_KEY = 'darwin-mfc-region';
const ONBOARDING_COMPLETED_KEY = 'darwin-mfc-region-onboarding-completed';

// =============================================================================
// REGION CARD DATA
// =============================================================================

interface RegionCardData {
  region: Region;
  flag: string;
  name: string;
  regulatoryBody: string;
  description: string;
  gradient: string;
  hoverGradient: string;
}

const REGION_CARDS: RegionCardData[] = [
  {
    region: 'BR',
    flag: '\u{1F1E7}\u{1F1F7}',
    name: 'Brazil',
    regulatoryBody: 'SUS / ANVISA',
    description: 'Content tailored to Brazilian public healthcare with SUS protocols and ANVISA-approved medications.',
    gradient: 'from-green-500/10 to-yellow-500/10',
    hoverGradient: 'from-green-500/20 to-yellow-500/20',
  },
  {
    region: 'IN',
    flag: '\u{1F1EE}\u{1F1F3}',
    name: 'India',
    regulatoryBody: 'CDSCO / NP-NCD',
    description: 'Content aligned with Indian NP-NCD guidelines and CDSCO-approved medications via Jan Aushadhi.',
    gradient: 'from-orange-500/10 to-green-500/10',
    hoverGradient: 'from-orange-500/20 to-green-500/20',
  },
  {
    region: 'EU',
    flag: '\u{1F1EA}\u{1F1FA}',
    name: 'Europe',
    regulatoryBody: 'EMA',
    description: 'Content based on European Medicines Agency standards and EU healthcare guidelines.',
    gradient: 'from-blue-500/10 to-indigo-500/10',
    hoverGradient: 'from-blue-500/20 to-indigo-500/20',
  },
];

// =============================================================================
// TYPES
// =============================================================================

interface RegionOnboardingModalProps {
  /** Force the modal to show regardless of localStorage */
  forceShow?: boolean;
  /** Callback when region is selected */
  onRegionSelected?: (region: Region) => void;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function RegionOnboardingModal({
  forceShow = false,
  onRegionSelected,
}: RegionOnboardingModalProps) {
  const { setRegion, isLoading } = useRegion();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [mounted, setMounted] = useState(false);

  // Check localStorage on mount to determine if modal should show
  useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined') {
      const hasRegion = localStorage.getItem(STORAGE_KEY);
      const onboardingCompleted = localStorage.getItem(ONBOARDING_COMPLETED_KEY);

      // Show modal if no region is set and onboarding hasn't been completed
      // OR if forceShow is true
      if (forceShow || (!hasRegion && !onboardingCompleted)) {
        // Small delay to prevent flash during page load
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [forceShow]);

  // Handle region selection
  const handleSelectRegion = useCallback((region: Region) => {
    setSelectedRegion(region);
  }, []);

  // Handle confirm selection
  const handleConfirm = useCallback(() => {
    if (selectedRegion) {
      setRegion(selectedRegion);

      // Mark onboarding as completed
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
        } catch (error) {
          console.warn('Failed to save onboarding state:', error);
        }
      }

      onRegionSelected?.(selectedRegion);
      setIsOpen(false);
    }
  }, [selectedRegion, setRegion, onRegionSelected]);

  // Don't render during SSR or while loading
  if (!mounted || isLoading) {
    return null;
  }

  // Don't render if modal is closed
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="region-onboarding-title"
          >
            {/* Header */}
            <div className="px-6 pt-8 pb-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4"
              >
                <Globe className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </motion.div>
              <h2
                id="region-onboarding-title"
                className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]"
              >
                Welcome to Darwin-MFC
              </h2>
              <p className="mt-2 text-[#86868b] max-w-md mx-auto">
                Select your healthcare region to personalize content, medication availability, and clinical guidelines.
              </p>
            </div>

            {/* Region Cards */}
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {REGION_CARDS.map((card, index) => (
                  <motion.button
                    key={card.region}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                    onClick={() => handleSelectRegion(card.region)}
                    className={`
                      relative p-5 rounded-xl text-left transition-all duration-200
                      border-2
                      ${
                        selectedRegion === card.region
                          ? 'border-blue-500 dark:border-blue-400 bg-gradient-to-br ' + card.hoverGradient
                          : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-gradient-to-br ' + card.gradient
                      }
                    `}
                    aria-pressed={selectedRegion === card.region}
                  >
                    {/* Selected indicator */}
                    {selectedRegion === card.region && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-400 flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}

                    {/* Flag */}
                    <div className="text-4xl mb-3">{card.flag}</div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                      {card.name}
                    </h3>

                    {/* Regulatory Body */}
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                      {card.regulatoryBody}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-[#86868b] mt-2 line-clamp-3">
                      {card.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
              <p className="text-xs text-[#86868b]">
                You can change this later in settings
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                disabled={!selectedRegion}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm
                  transition-all duration-200
                  ${
                    selectedRegion
                      ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-200 dark:bg-white/10 text-gray-400 dark:text-white/40 cursor-not-allowed'
                  }
                `}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default RegionOnboardingModal;
