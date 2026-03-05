import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ssrSafeJSONStorage } from './persistStorage';

export type AppMode = 'ps' | 'aps';

export interface PatientContext {
  weight: number | null;
  useIdealWeight: boolean;
  idealWeight: number | null;
  height: number | null;
  sex: 'M' | 'F' | null;
}

export interface PCRTimerState {
  isRunning: boolean;
  cycleCount: number;
  totalSeconds: number;
  shockCount: number;
  epinephrineDoses: number[];
  amiodaroneDoses: number[];
  startedAt: number | null;
}

interface PSState {
  mode: AppMode;
  patient: PatientContext;
  pcrTimer: PCRTimerState;
  lastProtocol: string | null;
  favoriteScores: string[];
  favoriteDrugs: string[];

  setMode: (mode: AppMode) => void;
  setPatientWeight: (weight: number | null) => void;
  setPatientSex: (sex: 'M' | 'F' | null) => void;
  setPatientHeight: (height: number | null) => void;
  toggleIdealWeight: () => void;
  resetPatient: () => void;
  setLastProtocol: (id: string | null) => void;
  toggleFavoriteScore: (id: string) => void;
  toggleFavoriteDrug: (id: string) => void;
  startPCR: () => void;
  stopPCR: () => void;
  addPCRCycle: () => void;
  addPCRShock: () => void;
  addPCREpinephrine: () => void;
  addPCRAmiodarone: () => void;
  resetPCR: () => void;
}

const defaultPatient: PatientContext = {
  weight: null,
  useIdealWeight: false,
  idealWeight: null,
  height: null,
  sex: null,
};

const defaultPCRTimer: PCRTimerState = {
  isRunning: false,
  cycleCount: 0,
  totalSeconds: 0,
  shockCount: 0,
  epinephrineDoses: [],
  amiodaroneDoses: [],
  startedAt: null,
};

function calcIdealWeight(height: number | null, sex: 'M' | 'F' | null): number | null {
  if (!height || !sex) return null;
  if (sex === 'M') return Math.round(height - 100);
  return Math.round(height - 105);
}

export const usePSStore = create<PSState>()(
  persist(
    (set, get) => ({
      mode: 'aps',
      patient: { ...defaultPatient },
      pcrTimer: { ...defaultPCRTimer },
      lastProtocol: null,
      favoriteScores: [],
      favoriteDrugs: [],

      setMode: (mode) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('darwin-mode-selection', mode);
        }
        set({ mode });
      },

      setPatientWeight: (weight) =>
        set((state) => ({
          patient: { ...state.patient, weight },
        })),

      setPatientSex: (sex) =>
        set((state) => ({
          patient: {
            ...state.patient,
            sex,
            idealWeight: calcIdealWeight(state.patient.height, sex),
          },
        })),

      setPatientHeight: (height) =>
        set((state) => ({
          patient: {
            ...state.patient,
            height,
            idealWeight: calcIdealWeight(height, state.patient.sex),
          },
        })),

      toggleIdealWeight: () =>
        set((state) => ({
          patient: {
            ...state.patient,
            useIdealWeight: !state.patient.useIdealWeight,
          },
        })),

      resetPatient: () => set({ patient: { ...defaultPatient } }),

      setLastProtocol: (id) => set({ lastProtocol: id }),

      toggleFavoriteScore: (id) =>
        set((state) => ({
          favoriteScores: state.favoriteScores.includes(id)
            ? state.favoriteScores.filter((s) => s !== id)
            : [...state.favoriteScores, id],
        })),

      toggleFavoriteDrug: (id) =>
        set((state) => ({
          favoriteDrugs: state.favoriteDrugs.includes(id)
            ? state.favoriteDrugs.filter((d) => d !== id)
            : [...state.favoriteDrugs, id],
        })),

      startPCR: () =>
        set({
          pcrTimer: {
            ...defaultPCRTimer,
            isRunning: true,
            cycleCount: 1,
            startedAt: Date.now(),
          },
        }),

      stopPCR: () =>
        set((state) => ({
          pcrTimer: { ...state.pcrTimer, isRunning: false },
        })),

      addPCRCycle: () =>
        set((state) => ({
          pcrTimer: {
            ...state.pcrTimer,
            cycleCount: state.pcrTimer.cycleCount + 1,
          },
        })),

      addPCRShock: () =>
        set((state) => ({
          pcrTimer: {
            ...state.pcrTimer,
            shockCount: state.pcrTimer.shockCount + 1,
          },
        })),

      addPCREpinephrine: () =>
        set((state) => ({
          pcrTimer: {
            ...state.pcrTimer,
            epinephrineDoses: [...state.pcrTimer.epinephrineDoses, Date.now()],
          },
        })),

      addPCRAmiodarone: () =>
        set((state) => ({
          pcrTimer: {
            ...state.pcrTimer,
            amiodaroneDoses: [...state.pcrTimer.amiodaroneDoses, Date.now()],
          },
        })),

      resetPCR: () => set({ pcrTimer: { ...defaultPCRTimer } }),
    }),
    {
      name: 'darwin-ps-storage',
      storage: ssrSafeJSONStorage,
      partialize: (state) => ({
        mode: state.mode,
        patient: state.patient,
        favoriteScores: state.favoriteScores,
        favoriteDrugs: state.favoriteDrugs,
      }),
    }
  )
);

export function getEffectiveWeight(patient: PatientContext): number | null {
  if (patient.useIdealWeight && patient.idealWeight) {
    return patient.idealWeight;
  }
  return patient.weight;
}
