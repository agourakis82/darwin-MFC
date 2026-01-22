import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, ContentMode, Theme, ViewMode } from '../types';
import type { Locale } from '@/i18n/config';
import type { Region } from '../types/region';

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

      // Actions
      setTheme: (theme) => set({ theme }),
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),

      setContentMode: (mode) => set({ contentMode: mode }),
      
      toggleContentMode: () => set((state) => ({
        contentMode: state.contentMode === 'descriptive' ? 'critical_analysis' : 'descriptive'
      })),

      // View mode (High-Yield)
      setViewMode: (viewMode) => set({ viewMode }),

      toggleHighYieldMode: () => set((state) => ({
        viewMode: state.viewMode === 'high_yield' ? 'full' : 'high_yield'
      })),

      addFavorite: (id) => set((state) => ({
        favorites: [...new Set([...state.favorites, id])]
      })),

      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter(fav => fav !== id)
      })),

      toggleFavorite: (id) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          get().removeFavorite(id);
        } else {
          get().addFavorite(id);
        }
      },

      setNote: (id, note) => set((state) => ({
        notes: { ...state.notes, [id]: note }
      })),

      removeNote: (id) => set((state) => {
        const newNotes = { ...state.notes };
        delete newNotes[id];
        return { notes: newNotes };
      }),

      // Doenças favorites
      addFavoritoDoenca: (id) => set((state) => ({
        favoritosDoencas: [...new Set([...state.favoritosDoencas, id])]
      })),

      removeFavoritoDoenca: (id) => set((state) => ({
        favoritosDoencas: state.favoritosDoencas.filter(fav => fav !== id)
      })),

      // Medicamentos favorites
      addFavoritoMedicamento: (id) => set((state) => ({
        favoritosMedicamentos: [...new Set([...state.favoritosMedicamentos, id])]
      })),

      removeFavoritoMedicamento: (id) => set((state) => ({
        favoritosMedicamentos: state.favoritosMedicamentos.filter(fav => fav !== id)
      })),

      // Protocolos favorites
      addFavoritoProtocolo: (id) => set((state) => ({
        favoritosProtocolos: [...new Set([...state.favoritosProtocolos, id])]
      })),

      removeFavoritoProtocolo: (id) => set((state) => ({
        favoritosProtocolos: state.favoritosProtocolos.filter(fav => fav !== id)
      })),

      // i18n
      locale: undefined,
      setLocale: (locale) => set({ locale }),

      // Region selection
      setRegion: (region: Region) => {
        set({ selectedRegion: region });
        if (typeof window !== 'undefined') {
          localStorage.setItem('darwin-selected-region', region);
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

