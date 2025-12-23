/**
 * ANALYTICS HOOKS
 * ===============
 *
 * React hooks for tracking user events
 */

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from './tracker';

/**
 * Track page views automatically
 */
export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      trackEvent('page_view', {
        page: pathname,
        timestamp: Date.now(),
      });
    }
  }, [pathname]);
}

/**
 * Track search queries
 */
export function useSearchTracking() {
  return (query: string, resultCount: number) => {
    trackEvent('search', {
      query,
      resultCount,
      timestamp: Date.now(),
    });
  };
}

/**
 * Track medication views
 */
export function useMedicationTracking() {
  return (medicationId: string, medicationName: string) => {
    trackEvent('medication_view', {
      medicationId,
      medicationName,
      timestamp: Date.now(),
    });
  };
}

/**
 * Track disease views
 */
export function useDiseaseTracking() {
  return (diseaseId: string, diseaseName: string) => {
    trackEvent('disease_view', {
      diseaseId,
      diseaseName,
      timestamp: Date.now(),
    });
  };
}

/**
 * Track calculator usage
 */
export function useCalculatorTracking() {
  return (calculatorId: string, calculatorName: string, params?: Record<string, any>) => {
    trackEvent('calculator_use', {
      calculatorId,
      calculatorName,
      params,
      timestamp: Date.now(),
    });
  };
}

/**
 * Track protocol views
 */
export function useProtocolTracking() {
  return (protocolId: string, protocolName: string) => {
    trackEvent('protocol_view', {
      protocolId,
      protocolName,
      timestamp: Date.now(),
    });
  };
}

/**
 * Track case views
 */
export function useCaseTracking() {
  return (caseId: string, caseName: string) => {
    trackEvent('case_view', {
      caseId,
      caseName,
      timestamp: Date.now(),
    });
  };
}

/**
 * Track exports
 */
export function useExportTracking() {
  return (format: string, dataType: string) => {
    trackEvent('export', {
      format,
      dataType,
      timestamp: Date.now(),
    });
  };
}

/**
 * Track favorites
 */
export function useFavoriteTracking() {
  return (action: 'add' | 'remove', itemId: string, itemType: string) => {
    trackEvent(action === 'add' ? 'favorite_add' : 'favorite_remove', {
      itemId,
      itemType,
      timestamp: Date.now(),
    });
  };
}

/**
 * Track notes
 */
export function useNoteTracking() {
  return (action: 'create' | 'update', noteId: string, itemId?: string) => {
    trackEvent(action === 'create' ? 'note_create' : 'note_update', {
      noteId,
      itemId,
      timestamp: Date.now(),
    });
  };
}
