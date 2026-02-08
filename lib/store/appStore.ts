import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, ContentMode, Theme, ViewMode } from '../types';
import type { Locale } from '@/i18n/config';
import type { Region } from '../types/region';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

// Debounce timer for cloud sync
let syncDebounceTimer: ReturnType<typeof setTimeout> | null = null;
const SYNC_DEBOUNCE_MS = 2000; // 2 seconds

/**
 * Auto-detect region from browser locale
 * Maps language codes to default regions
 */
function detectRegionFromLocale(locale?: Locale): Region {
  if (!locale) return 'BR';

  switch (locale) {
    case 'pt':
      return 'BR';
    case 'hi':
      return 'IN';
    case 'en':
    case 'es':
    case 'fr':
    case 'ru':
    case 'ar':
    case 'zh':
    case 'el':
    default:
      return 'EU';
  }
}

interface AppStore extends AppState {
  // Sync state
  isSyncing: boolean;
  lastSyncedAt: string | null;
  syncError: string | null;

  // Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setContentMode: (mode: ContentMode) => void;
  toggleContentMode: () => void;
  // View mode actions (High-Yield mode)
  setViewMode: (mode: ViewMode) => void;
  toggleHighYieldMode: () => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setNote: (id: string, note: string) => void;
  removeNote: (id: string) => void;
  // New favorites for doenças, medicamentos, protocolos
  addFavoritoDoenca: (id: string) => void;
  removeFavoritoDoenca: (id: string) => void;
  addFavoritoMedicamento: (id: string) => void;
  removeFavoritoMedicamento: (id: string) => void;
  addFavoritoProtocolo: (id: string) => void;
  removeFavoritoProtocolo: (id: string) => void;
  // i18n
  locale?: Locale;
  setLocale: (locale: Locale) => void;
  // Region selection
  setRegion: (region: Region) => void;
  // Cloud sync
  syncToCloud: () => Promise<void>;
  loadFromCloud: () => Promise<void>;
  setSyncError: (error: string | null) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => {
      // Initialize region from localStorage or auto-detect from locale
      const getInitialRegion = (): Region => {
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('darwin-mfc-storage');
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (parsed.state?.selectedRegion) {
                return parsed.state.selectedRegion;
              }
            } catch (e) {
              console.error('Failed to parse stored region:', e);
            }
          }
        }
        return detectRegionFromLocale();
      };

      // Helper to trigger debounced cloud sync
      const triggerCloudSync = () => {
        if (syncDebounceTimer) {
          clearTimeout(syncDebounceTimer);
        }
        syncDebounceTimer = setTimeout(() => {
          const state = get();
          if (state.syncToCloud) {
            state.syncToCloud();
          }
        }, SYNC_DEBOUNCE_MS);
      };

      return {
        // Estado inicial - Dark mode como padrão
        theme: 'dark',
        contentMode: 'descriptive',
        viewMode: 'full', // full | high_yield | print_friendly
        favorites: [],
        favoritosDoencas: [],
        favoritosMedicamentos: [],
        favoritosProtocolos: [],
        notes: {},
        selectedRegion: getInitialRegion(),

        // Sync state
        isSyncing: false,
        lastSyncedAt: null,
        syncError: null,

      // Actions
      setTheme: (theme) => {
        set({ theme });
        triggerCloudSync();
      },

      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light'
        }));
        triggerCloudSync();
      },

      setContentMode: (mode) => {
        set({ contentMode: mode });
        triggerCloudSync();
      },

      toggleContentMode: () => {
        set((state) => ({
          contentMode: state.contentMode === 'descriptive' ? 'critical_analysis' : 'descriptive'
        }));
        triggerCloudSync();
      },

      // View mode (High-Yield)
      setViewMode: (viewMode) => {
        set({ viewMode });
        triggerCloudSync();
      },

      toggleHighYieldMode: () => {
        set((state) => ({
          viewMode: state.viewMode === 'high_yield' ? 'full' : 'high_yield'
        }));
        triggerCloudSync();
      },

      addFavorite: (id) => {
        set((state) => ({
          favorites: [...new Set([...state.favorites, id])]
        }));
        triggerCloudSync();
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter(fav => fav !== id)
        }));
        triggerCloudSync();
      },

      toggleFavorite: (id) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          get().removeFavorite(id);
        } else {
          get().addFavorite(id);
        }
        // Note: triggerCloudSync is called by add/removeFavorite
      },

      setNote: (id, note) => {
        set((state) => ({
          notes: { ...state.notes, [id]: note }
        }));
        triggerCloudSync();
      },

      removeNote: (id) => {
        set((state) => {
          const newNotes = { ...state.notes };
          delete newNotes[id];
          return { notes: newNotes };
        });
        triggerCloudSync();
      },

      // Doenças favorites
      addFavoritoDoenca: (id) => {
        set((state) => ({
          favoritosDoencas: [...new Set([...state.favoritosDoencas, id])]
        }));
        triggerCloudSync();
      },

      removeFavoritoDoenca: (id) => {
        set((state) => ({
          favoritosDoencas: state.favoritosDoencas.filter(fav => fav !== id)
        }));
        triggerCloudSync();
      },

      // Medicamentos favorites
      addFavoritoMedicamento: (id) => {
        set((state) => ({
          favoritosMedicamentos: [...new Set([...state.favoritosMedicamentos, id])]
        }));
        triggerCloudSync();
      },

      removeFavoritoMedicamento: (id) => {
        set((state) => ({
          favoritosMedicamentos: state.favoritosMedicamentos.filter(fav => fav !== id)
        }));
        triggerCloudSync();
      },

      // Protocolos favorites
      addFavoritoProtocolo: (id) => {
        set((state) => ({
          favoritosProtocolos: [...new Set([...state.favoritosProtocolos, id])]
        }));
        triggerCloudSync();
      },

      removeFavoritoProtocolo: (id) => {
        set((state) => ({
          favoritosProtocolos: state.favoritosProtocolos.filter(fav => fav !== id)
        }));
        triggerCloudSync();
      },

      // i18n
      locale: undefined,
      setLocale: (locale) => {
        set({ locale });
        triggerCloudSync();
      },

      // Region selection
      setRegion: (region: Region) => {
        set({ selectedRegion: region });
        if (typeof window !== 'undefined') {
          localStorage.setItem('darwin-selected-region', region);
        }
        triggerCloudSync();
      },

      // Cloud sync error setter
      setSyncError: (error: string | null) => set({ syncError: error }),

      /**
       * Sync current state to Supabase cloud storage
       * Only syncs if user is authenticated
       */
      syncToCloud: async () => {
        // Skip if Supabase is not configured (static build)
        if (!isSupabaseConfigured || !supabase) return;

        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session?.user) {
            // Not authenticated, skip cloud sync
            return;
          }

          set({ isSyncing: true, syncError: null });

          const state = get();
          const userId = session.user.id;

          // Sync user preferences
          await supabase.from('user_preferences').upsert({
            user_id: userId,
            theme: state.theme,
            language: state.locale || 'pt',
            content_mode: state.contentMode,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });

          // Sync favorites - batch upsert
          const allFavorites = [
            ...state.favorites.map(id => ({ user_id: userId, entity_type: 'screening' as const, entity_id: id })),
            ...state.favoritosDoencas.map(id => ({ user_id: userId, entity_type: 'disease' as const, entity_id: id })),
            ...state.favoritosMedicamentos.map(id => ({ user_id: userId, entity_type: 'medication' as const, entity_id: id })),
            ...state.favoritosProtocolos.map(id => ({ user_id: userId, entity_type: 'protocol' as const, entity_id: id })),
          ];

          if (allFavorites.length > 0) {
            // Delete existing favorites for this user first
            await supabase.from('favorites').delete().eq('user_id', userId);
            // Insert new favorites
            await supabase.from('favorites').insert(allFavorites);
          }

          // Sync notes
          const notesArray = Object.entries(state.notes).map(([entity_id, content]) => ({
            user_id: userId,
            entity_type: 'screening' as const,
            entity_id,
            content,
            updated_at: new Date().toISOString(),
          }));

          if (notesArray.length > 0) {
            // Delete existing notes for this user first
            await supabase.from('notes').delete().eq('user_id', userId);
            // Insert new notes
            await supabase.from('notes').insert(notesArray);
          }

          set({
            isSyncing: false,
            lastSyncedAt: new Date().toISOString()
          });
        } catch (error) {
          console.error('Cloud sync error:', error);
          set({
            isSyncing: false,
            syncError: error instanceof Error ? error.message : 'Sync failed'
          });
        }
      },

      /**
       * Load user data from Supabase cloud storage
       * Should be called after user signs in
       */
      loadFromCloud: async () => {
        // Skip if Supabase is not configured (static build)
        if (!isSupabaseConfigured || !supabase) return;

        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session?.user) {
            return;
          }

          set({ isSyncing: true, syncError: null });
          const userId = session.user.id;

          // Load preferences
          const { data: prefs } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', userId)
            .single();

          if (prefs) {
            set({
              theme: prefs.theme as Theme || 'dark',
              contentMode: prefs.content_mode as ContentMode || 'descriptive',
              viewMode: prefs.view_mode as ViewMode || 'full',
              locale: prefs.language as Locale || undefined,
              selectedRegion: prefs.selected_region as Region || 'BR',
            });
          }

          // Load favorites
          const { data: favorites } = await supabase
            .from('favorites')
            .select('entity_type, entity_id')
            .eq('user_id', userId);

          if (favorites) {
            const screenings = favorites.filter(f => f.entity_type === 'screening').map(f => f.entity_id);
            const diseases = favorites.filter(f => f.entity_type === 'disease').map(f => f.entity_id);
            const medications = favorites.filter(f => f.entity_type === 'medication').map(f => f.entity_id);
            const protocols = favorites.filter(f => f.entity_type === 'protocol').map(f => f.entity_id);

            set({
              favorites: screenings,
              favoritosDoencas: diseases,
              favoritosMedicamentos: medications,
              favoritosProtocolos: protocols,
            });
          }

          // Load notes
          const { data: notes } = await supabase
            .from('notes')
            .select('entity_id, content')
            .eq('user_id', userId);

          if (notes) {
            const notesMap: Record<string, string> = {};
            notes.forEach(note => {
              if (note.entity_id) {
                notesMap[note.entity_id] = note.content;
              }
            });
            set({ notes: notesMap });
          }

          set({
            isSyncing: false,
            lastSyncedAt: new Date().toISOString()
          });
        } catch (error) {
          console.error('Load from cloud error:', error);
          set({
            isSyncing: false,
            syncError: error instanceof Error ? error.message : 'Load failed'
          });
        }
      },
      };
    },
    {
      name: 'darwin-mfc-storage', // Nome da key no localStorage
      partialize: (state) => ({
        theme: state.theme,
        contentMode: state.contentMode,
        viewMode: state.viewMode,
        favorites: state.favorites,
        favoritosDoencas: state.favoritosDoencas,
        favoritosMedicamentos: state.favoritosMedicamentos,
        favoritosProtocolos: state.favoritosProtocolos,
        notes: state.notes,
        locale: state.locale,
        selectedRegion: state.selectedRegion,
      }),
    }
  )
);

