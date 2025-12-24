/**
 * CLINICAL DECISION SUPPORT STORE
 * =================================
 *
 * Zustand store for clinical decision support state management
 */

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ClinicalAlert } from '../alerts/clinical-alerts';
import type { CalculationHistoryItem } from '../calculators/framework';

interface CDSState {
  // Alerts
  alerts: ClinicalAlert[];
  addAlert: (alert: ClinicalAlert) => void;
  dismissAlert: (id: string) => void;
  clearAlerts: () => void;

  // Calculator history
  calculatorHistory: CalculationHistoryItem[];
  addCalculation: (calculation: CalculationHistoryItem) => void;
  clearHistory: () => void;

  // Active medications (for interaction checking)
  activeMedications: string[];
  addMedication: (medication: string) => void;
  removeMedication: (medication: string) => void;
  clearMedications: () => void;

  // Favorites
  favoriteProtocols: string[];
  toggleFavorite: (protocolId: string) => void;
}

export const useCDSStore = create<CDSState>()(
  persist(
    (set) => ({
      // Alerts
      alerts: [],
      addAlert: (alert) =>
        set((state) => ({
          alerts: [...state.alerts, alert],
        })),
      dismissAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((a) => a.id !== id),
        })),
      clearAlerts: () => set({ alerts: [] }),

      // Calculator history
      calculatorHistory: [],
      addCalculation: (calculation) =>
        set((state) => ({
          calculatorHistory: [calculation, ...state.calculatorHistory].slice(0, 50),
        })),
      clearHistory: () => set({ calculatorHistory: [] }),

      // Medications
      activeMedications: [],
      addMedication: (medication) =>
        set((state) => ({
          activeMedications: [...state.activeMedications, medication],
        })),
      removeMedication: (medication) =>
        set((state) => ({
          activeMedications: state.activeMedications.filter((m) => m !== medication),
        })),
      clearMedications: () => set({ activeMedications: [] }),

      // Favorites
      favoriteProtocols: [],
      toggleFavorite: (protocolId) =>
        set((state) => ({
          favoriteProtocols: state.favoriteProtocols.includes(protocolId)
            ? state.favoriteProtocols.filter((id) => id !== protocolId)
            : [...state.favoriteProtocols, protocolId],
        })),
    }),
    {
      name: 'darwin-mfc-cds-storage',
      version: 1,
    }
  )
);
