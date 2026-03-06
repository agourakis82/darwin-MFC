/**
 * ZUSTAND GENOTYPE STORE
 * =======================
 *
 * Persists patient pharmacogenomic genotype selections.
 * localStorage for offline/static builds, Supabase cloud sync when authenticated.
 */

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';
import { ssrSafeJSONStorage } from './persistStorage';

/** The 7 genes supported by CPIC with highest clinical evidence */
export const SUPPORTED_GENES = [
  'CYP2D6',
  'CYP2C19',
  'CYP2C9',
  'TPMT',
  'DPYD',
  'VKORC1',
  'SLCO1B1',
] as const;

export type SupportedGene = (typeof SUPPORTED_GENES)[number];

interface GenotypeStore {
  /** Map of gene → diplotype (e.g. { CYP2D6: '*1/*1', CYP2C19: '*1/*2' }) */
  genotypes: Record<string, string>;

  /** Set a single gene's diplotype */
  setGenotype: (gene: string, diplotype: string) => void;

  /** Remove a single gene */
  removeGenotype: (gene: string) => void;

  /** Clear all genotypes */
  clearGenotypes: () => void;

  /** Check if any genotypes are set */
  hasGenotypes: () => boolean;

  /** Sync genotypes to Supabase (authenticated users only) */
  syncToCloud: () => Promise<void>;

  /** Load genotypes from Supabase (authenticated users only) */
  loadFromCloud: () => Promise<void>;
}

export const useGenotypeStore = create<GenotypeStore>()(
  persist(
    (set, get) => ({
      genotypes: {},

      setGenotype: (gene, diplotype) => {
        set((state) => ({
          genotypes: { ...state.genotypes, [gene]: diplotype },
        }));
      },

      removeGenotype: (gene) => {
        set((state) => {
          const next = { ...state.genotypes };
          delete next[gene];
          return { genotypes: next };
        });
      },

      clearGenotypes: () => set({ genotypes: {} }),

      hasGenotypes: () => Object.keys(get().genotypes).length > 0,

      syncToCloud: async () => {
        if (!isSupabaseConfigured || !supabase) return;

        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session?.user) return;

          const { genotypes } = get();
          const userId = session.user.id;

          // Upsert each genotype
          const rows = Object.entries(genotypes).map(([gene, diplotype]) => ({
            user_id: userId,
            gene,
            diplotype,
            source: 'self_reported',
            updated_at: new Date().toISOString(),
          }));

          if (rows.length > 0) {
            await supabase.from('patient_genotypes').upsert(rows, {
              onConflict: 'user_id,gene',
            });
          }
        } catch (err) {
          console.error('Genotype cloud sync error:', err);
        }
      },

      loadFromCloud: async () => {
        if (!isSupabaseConfigured || !supabase) return;

        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session?.user) return;

          const { data, error } = await supabase
            .from('patient_genotypes')
            .select('gene, diplotype')
            .eq('user_id', session.user.id);

          if (error || !data) return;

          const genotypes: Record<string, string> = {};
          for (const row of data as Array<{ gene: string; diplotype: string }>) {
            genotypes[row.gene] = row.diplotype;
          }

          set({ genotypes });
        } catch (err) {
          console.error('Genotype cloud load error:', err);
        }
      },
    }),
    {
      name: 'darwin-genotypes',
      storage: ssrSafeJSONStorage,
      partialize: (state) => ({ genotypes: state.genotypes }),
    }
  )
);
