import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, ContentMode, Theme } from '../types';
import type { Locale } from '@/i18n/config';

interface AppStore extends AppState {
  // Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setContentMode: (mode: ContentMode) => void;
  toggleContentMode: () => void;
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
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Estado inicial - Dark mode como padrão
      theme: 'dark',
      contentMode: 'descriptive',
      favorites: [],
      favoritosDoencas: [],
      favoritosMedicamentos: [],
      favoritosProtocolos: [],
      notes: {},

      // Actions
      setTheme: (theme) => set({ theme }),
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),

      setContentMode: (mode) => set({ contentMode: mode }),
      
      toggleContentMode: () => set((state) => ({ 
        contentMode: state.contentMode === 'descriptive' ? 'critical_analysis' : 'descriptive' 
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
    }),
    {
      name: 'darwin-mfc-storage', // Nome da key no localStorage
      partialize: (state) => ({
        theme: state.theme,
        contentMode: state.contentMode,
        favorites: state.favorites,
        favoritosDoencas: state.favoritosDoencas,
        favoritosMedicamentos: state.favoritosMedicamentos,
        favoritosProtocolos: state.favoritosProtocolos,
        notes: state.notes,
        locale: state.locale,
      }),
    }
  )
);

