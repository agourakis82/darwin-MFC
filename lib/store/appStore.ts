import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, ContentMode, Theme } from '../types';

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
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      theme: 'light',
      contentMode: 'descriptive',
      favorites: [],
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
    }),
    {
      name: 'rastreamentos-sus-storage', // Nome da key no localStorage
      partialize: (state) => ({
        theme: state.theme,
        contentMode: state.contentMode,
        favorites: state.favorites,
        notes: state.notes,
      }),
    }
  )
);

