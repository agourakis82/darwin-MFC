'use client';

/**
 * REGION SELECTOR COMPONENT - DARWIN-MFC
 * ======================================
 *
 * Component for selecting the current region context.
 * Supports dropdown and modal variants for different UI contexts.
 *
 * Usage:
 * ```tsx
 * // Dropdown variant (default) - for header/navbar
 * <RegionSelector />
 *
 * // Modal variant - for settings/onboarding
 * <RegionSelector variant="modal" />
 *
 * // Compact variant - minimal space
 * <RegionSelector variant="compact" />
 * ```
 */

import React, { useState, useCallback } from 'react';
import { ChevronDown, Globe, Check, X } from 'lucide-react';
import { useRegion } from '@/lib/context/RegionContext';
import { REGIONS, getRegionUIInfo } from '@/lib/data/regions';
import type { Region } from '@/lib/types/region';

// =============================================================================
// TYPES
// =============================================================================

type RegionSelectorVariant = 'dropdown' | 'modal' | 'compact' | 'buttons';

interface RegionSelectorProps {
  /** Display variant */
  variant?: RegionSelectorVariant;
  /** Additional CSS classes */
  className?: string;
  /** Callback when region changes */
  onRegionChange?: (region: Region) => void;
  /** Show detailed info in options */
  showDetails?: boolean;
  /** Label text (for accessibility) */
  label?: string;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function RegionSelector({
  variant = 'dropdown',
  className = '',
  onRegionChange,
  showDetails = false,
  label = 'Select Region',
}: RegionSelectorProps) {
  const { currentRegion, setRegion, availableRegions, currentRegionConfig, isLoading } =
    useRegion();
  const [isOpen, setIsOpen] = useState(false);

  const handleRegionSelect = useCallback(
    (region: Region) => {
      setRegion(region);
      onRegionChange?.(region);
      setIsOpen(false);
    },
    [setRegion, onRegionChange]
  );

  // Don't render anything during SSR hydration
  if (isLoading) {
    return (
      <div className={`animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-lg h-10 w-24 ${className}`} />
    );
  }

  // Render based on variant
  switch (variant) {
    case 'buttons':
      return (
        <ButtonsVariant
          currentRegion={currentRegion}
          availableRegions={availableRegions}
          onSelect={handleRegionSelect}
          className={className}
        />
      );

    case 'compact':
      return (
        <CompactVariant
          currentRegion={currentRegion}
          currentRegionConfig={currentRegionConfig}
          availableRegions={availableRegions}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSelect={handleRegionSelect}
          className={className}
        />
      );

    case 'modal':
      return (
        <ModalVariant
          currentRegion={currentRegion}
          availableRegions={availableRegions}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSelect={handleRegionSelect}
          showDetails={showDetails}
          className={className}
          label={label}
        />
      );

    case 'dropdown':
    default:
      return (
        <DropdownVariant
          currentRegion={currentRegion}
          currentRegionConfig={currentRegionConfig}
          availableRegions={availableRegions}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSelect={handleRegionSelect}
          showDetails={showDetails}
          className={className}
          label={label}
        />
      );
  }
}

// =============================================================================
// VARIANT COMPONENTS
// =============================================================================

interface VariantProps {
  currentRegion: Region;
  availableRegions: Region[];
  onSelect: (region: Region) => void;
  className?: string;
}

interface DropdownVariantProps extends VariantProps {
  currentRegionConfig: { flag: string; name: string; code: string };
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  showDetails?: boolean;
  label?: string;
}

function DropdownVariant({
  currentRegion,
  currentRegionConfig,
  availableRegions,
  isOpen,
  setIsOpen,
  onSelect,
  showDetails,
  className,
  label,
}: DropdownVariantProps) {
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2 px-3 py-2 rounded-lg
          bg-neutral-100 dark:bg-neutral-800
          text-neutral-700 dark:text-neutral-300
          hover:bg-neutral-200 dark:hover:bg-neutral-700
          transition-colors border border-neutral-200 dark:border-neutral-700
        "
        aria-label={label}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentRegionConfig.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {currentRegionConfig.name}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown Menu */}
          <div
            className="
              absolute top-full right-0 mt-2 z-20
              bg-white dark:bg-neutral-800
              border border-neutral-200 dark:border-neutral-700
              rounded-lg shadow-lg
              min-w-[240px]
              overflow-hidden
            "
            role="listbox"
            aria-label={label}
          >
            {availableRegions.map((region) => {
              const config = REGIONS[region];
              const uiInfo = showDetails ? getRegionUIInfo(region) : null;
              const isSelected = region === currentRegion;

              return (
                <button
                  key={region}
                  onClick={() => onSelect(region)}
                  className={`
                    w-full px-4 py-3 text-left
                    flex items-start gap-3
                    transition-colors
                    ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }
                  `}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="text-xl flex-shrink-0">{config.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{config.name}</span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {config.regulatoryBody}
                      {config.publicHealthSystem && ` | ${config.publicHealthSystem}`}
                    </span>
                    {showDetails && uiInfo && (
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 line-clamp-2">
                        {uiInfo.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function CompactVariant({
  currentRegion,
  currentRegionConfig,
  availableRegions,
  isOpen,
  setIsOpen,
  onSelect,
  className,
}: DropdownVariantProps) {
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-1 px-2 py-1.5 rounded
          bg-neutral-100 dark:bg-neutral-800
          text-neutral-700 dark:text-neutral-300
          hover:bg-neutral-200 dark:hover:bg-neutral-700
          transition-colors text-sm
        "
        aria-label="Select region"
      >
        <span>{currentRegionConfig.flag}</span>
        <span className="font-medium">{currentRegionConfig.code}</span>
        <ChevronDown className={`w-3 h-3 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-1 z-20 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded shadow-lg min-w-[120px]">
            {availableRegions.map((region) => {
              const config = REGIONS[region];
              return (
                <button
                  key={region}
                  onClick={() => onSelect(region)}
                  className={`
                    w-full px-3 py-2 text-left flex items-center gap-2 text-sm
                    ${
                      region === currentRegion
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }
                  `}
                >
                  <span>{config.flag}</span>
                  <span>{config.code}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function ButtonsVariant({
  currentRegion,
  availableRegions,
  onSelect,
  className,
}: VariantProps) {
  return (
    <div className={`flex gap-2 flex-wrap ${className}`} role="group" aria-label="Region selection">
      {availableRegions.map((region) => {
        const config = REGIONS[region];
        const isSelected = region === currentRegion;

        return (
          <button
            key={region}
            onClick={() => onSelect(region)}
            className={`
              px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
              flex items-center gap-2
              ${
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }
            `}
            aria-pressed={isSelected}
          >
            <span>{config.flag}</span>
            <span>{config.name}</span>
          </button>
        );
      })}
    </div>
  );
}

interface ModalVariantProps extends VariantProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  showDetails?: boolean;
  label?: string;
}

function ModalVariant({
  currentRegion,
  availableRegions,
  isOpen,
  setIsOpen,
  onSelect,
  showDetails,
  className,
  label,
}: ModalVariantProps) {
  const currentConfig = REGIONS[currentRegion];

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg
          bg-neutral-100 dark:bg-neutral-800
          text-neutral-700 dark:text-neutral-300
          hover:bg-neutral-200 dark:hover:bg-neutral-700
          transition-colors border border-neutral-200 dark:border-neutral-700
          ${className}
        `}
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentConfig.flag}</span>
        <span className="font-medium">{currentConfig.name}</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white dark:bg-neutral-900 rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {label}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Options */}
            <div className="p-4 space-y-2 overflow-y-auto max-h-[60vh]">
              {availableRegions.map((region) => {
                const config = REGIONS[region];
                const uiInfo = getRegionUIInfo(region);
                const isSelected = region === currentRegion;

                return (
                  <button
                    key={region}
                    onClick={() => onSelect(region)}
                    className={`
                      w-full p-4 rounded-lg text-left
                      flex items-start gap-4
                      transition-all
                      ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'
                          : 'bg-neutral-50 dark:bg-neutral-800 border-2 border-transparent hover:border-neutral-300 dark:hover:border-neutral-600'
                      }
                    `}
                  >
                    <span className="text-3xl">{config.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          {config.name}
                        </span>
                        {isSelected && (
                          <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {config.regulatoryBody}
                        {config.publicHealthSystem &&
                          ` - ${config.publicHealthSystem}`}
                      </p>
                      {showDetails && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                          {uiInfo.healthcareDetails}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default RegionSelector;
