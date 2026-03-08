import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ssrSafeJSONStorage } from './persistStorage';
import type {
  ActiveCaseSession,
  CaseEvent,
  CaseRoleAssignment,
  CaseRoleSlot,
  PatientContext,
  SentinelWorkflow,
  WeightSource,
} from '@/lib/ps/contracts';
import type { ExternalHandoffEnvelope } from '@/lib/ps/handoffIntegrationAdapter';
import { importExternalHandoffToCaseSession } from '@/lib/ps/handoffIntegrationAdapter';

export type {
  ActiveCaseSession,
  CaseEvent,
  CaseRoleAssignment,
  CaseRoleSlot,
  PatientContext,
  SentinelWorkflow,
  WeightSource,
} from '@/lib/ps/contracts';

export type AppMode = 'ps' | 'aps';

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
  activeCaseSession: ActiveCaseSession | null;
  lastProtocol: string | null;
  favoriteScores: string[];
  favoriteDrugs: string[];
  recentTeamMembers: string[];

  setMode: (mode: AppMode) => void;
  setPatientWeight: (weight: number | null) => void;
  setEstimatedWeight: (weight: number | null) => void;
  setPatientSex: (sex: 'M' | 'F' | null) => void;
  setPatientHeight: (height: number | null) => void;
  toggleIdealWeight: () => void;
  resetPatient: () => void;
  startCase: (input: {
    workflow: SentinelWorkflow;
    protocolId: string | null;
    illnessSeverity?: ActiveCaseSession['illnessSeverity'];
    pendingActionLabels?: string[];
  }) => void;
  closeActiveCase: () => void;
  setActiveCaseStep: (stepId: string | null) => void;
  setPendingActions: (labels: string[]) => void;
  toggleCaseRole: (role: CaseRoleSlot) => void;
  setCaseRole: (role: CaseRoleSlot, label: string | null) => void;
  registerTeamMember: (label: string) => void;
  importExternalHandoff: (envelope: ExternalHandoffEnvelope) => void;
  logCaseEvent: (event: Omit<CaseEvent, 'id' | 'at'> & Partial<Pick<CaseEvent, 'id' | 'at'>>) => void;
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
  verifiedWeightKg: null,
  estimatedWeightKg: null,
  weightSource: 'unknown',
  weightMeasuredAt: null,
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

function resolveWeightSource(patient: PatientContext): WeightSource {
  if (patient.useIdealWeight && patient.idealWeight) return 'ideal';
  if (patient.verifiedWeightKg != null) return 'verified';
  if (patient.estimatedWeightKg != null) return 'estimated';
  return 'unknown';
}

function createCaseEvent(event: Omit<CaseEvent, 'id' | 'at'> & Partial<Pick<CaseEvent, 'id' | 'at'>>): CaseEvent {
  return {
    ...event,
    id: event.id ?? `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    at: event.at ?? Date.now(),
  };
}

export const usePSStore = create<PSState>()(
  persist(
    (set) => ({
      mode: 'aps',
      patient: { ...defaultPatient },
      pcrTimer: { ...defaultPCRTimer },
      activeCaseSession: null,
      lastProtocol: null,
      favoriteScores: [],
      favoriteDrugs: [],
      recentTeamMembers: [],

      setMode: (mode) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('darwin-mode-selection', mode);
        }
        set({ mode });
      },

      setPatientWeight: (weight) =>
        set((state) => {
          const nextPatient: PatientContext = {
            ...state.patient,
            weight,
            verifiedWeightKg: weight,
            weightMeasuredAt: weight == null ? null : Date.now(),
          };
          nextPatient.weightSource = resolveWeightSource(nextPatient);
          return { patient: nextPatient };
        }),

      setEstimatedWeight: (weight) =>
        set((state) => {
          const nextPatient: PatientContext = {
            ...state.patient,
            estimatedWeightKg: weight,
          };
          nextPatient.weightSource = resolveWeightSource(nextPatient);
          return { patient: nextPatient };
        }),

      setPatientSex: (sex) =>
        set((state) => {
          const nextPatient: PatientContext = {
            ...state.patient,
            sex,
            idealWeight: calcIdealWeight(state.patient.height, sex),
          };
          nextPatient.weightSource = resolveWeightSource(nextPatient);
          return { patient: nextPatient };
        }),

      setPatientHeight: (height) =>
        set((state) => {
          const nextPatient: PatientContext = {
            ...state.patient,
            height,
            idealWeight: calcIdealWeight(height, state.patient.sex),
          };
          nextPatient.weightSource = resolveWeightSource(nextPatient);
          return { patient: nextPatient };
        }),

      toggleIdealWeight: () =>
        set((state) => {
          const nextPatient: PatientContext = {
            ...state.patient,
            useIdealWeight: !state.patient.useIdealWeight,
          };
          nextPatient.weightSource = resolveWeightSource(nextPatient);
          return { patient: nextPatient };
        }),

      resetPatient: () => set({ patient: { ...defaultPatient } }),

      startCase: ({ workflow, protocolId, illnessSeverity = 'unknown', pendingActionLabels = [] }) =>
        set({
          activeCaseSession: {
            id: `case_${Date.now()}`,
            workflow,
            protocolId,
            startedAt: Date.now(),
            updatedAt: Date.now(),
            illnessSeverity,
            activeStepId: null,
            pendingActionLabels,
            roleAssignments: {},
            events: [
              createCaseEvent({
                kind: 'protocol_started',
                state: 'completed',
                label: protocolId ?? workflow,
                meta: { workflow, protocolId },
              }),
            ],
          },
        }),

      closeActiveCase: () => set({ activeCaseSession: null }),

      setActiveCaseStep: (stepId) =>
        set((state) => {
          if (!state.activeCaseSession) return state;
          if (state.activeCaseSession.activeStepId === stepId) return state;
          return {
            activeCaseSession: {
              ...state.activeCaseSession,
              activeStepId: stepId,
              updatedAt: Date.now(),
            },
          };
        }),

      setPendingActions: (labels) =>
        set((state) => {
          if (!state.activeCaseSession) return state;
          const sameLabels = state.activeCaseSession.pendingActionLabels.length === labels.length
            && state.activeCaseSession.pendingActionLabels.every((label, index) => label === labels[index]);
          if (sameLabels) return state;
          return {
            activeCaseSession: {
              ...state.activeCaseSession,
              pendingActionLabels: labels,
              updatedAt: Date.now(),
            },
          };
        }),

      toggleCaseRole: (role) =>
        set((state) => {
          if (!state.activeCaseSession) return { activeCaseSession: null };
          const current = state.activeCaseSession.roleAssignments[role];
          return {
            activeCaseSession: {
              ...state.activeCaseSession,
              updatedAt: Date.now(),
              roleAssignments: {
                ...state.activeCaseSession.roleAssignments,
                [role]: {
                  assigned: !(current?.assigned ?? false),
                  label: current?.assigned ? null : current?.label ?? null,
                  updatedAt: Date.now(),
                },
              },
            },
          };
        }),

      setCaseRole: (role, label) =>
        set((state) => {
          if (!state.activeCaseSession) return { activeCaseSession: null };
          const normalized = label?.trim() || null;
          return {
            activeCaseSession: {
              ...state.activeCaseSession,
              updatedAt: Date.now(),
              roleAssignments: {
                ...state.activeCaseSession.roleAssignments,
                [role]: {
                  assigned: Boolean(normalized),
                  label: normalized,
                  updatedAt: Date.now(),
                },
              },
            },
            recentTeamMembers: normalized
              ? [normalized, ...state.recentTeamMembers.filter((member) => member !== normalized)].slice(0, 8)
              : state.recentTeamMembers,
          };
        }),

      registerTeamMember: (label) =>
        set((state) => ({
          recentTeamMembers: [label, ...state.recentTeamMembers.filter((member) => member !== label)].slice(0, 8),
        })),

      importExternalHandoff: (envelope) =>
        set({
          activeCaseSession: importExternalHandoffToCaseSession(envelope),
        }),

      logCaseEvent: (event) =>
        set((state) => ({
          activeCaseSession: state.activeCaseSession
            ? {
                ...state.activeCaseSession,
                updatedAt: Date.now(),
                events: [...state.activeCaseSession.events, createCaseEvent(event)],
              }
            : null,
        })),

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
        activeCaseSession: state.activeCaseSession,
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
  if (patient.verifiedWeightKg != null) {
    return patient.verifiedWeightKg;
  }
  if (patient.estimatedWeightKg != null) {
    return patient.estimatedWeightKg;
  }
  return patient.weight;
}
