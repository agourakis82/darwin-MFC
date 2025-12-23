/**
 * Notes Store
 * Zustand store for collaborative notes with persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note, Highlight, NoteCitation, LinkedEntity, NotesState, NotesActions } from '@/lib/types/notes';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function createEmptyNote(title: string): Note {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    title,
    content: '',
    createdAt: now,
    updatedAt: now,
    tags: [],
    linkedEntities: [],
    highlights: [],
    citations: [],
    isPublic: false,
  };
}

// =============================================================================
// STORE
// =============================================================================

interface NotesStore extends NotesState, NotesActions {}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      // Initial State
      notes: [],
      currentNote: null,
      isEditing: false,
      searchQuery: '',
      selectedTags: [],

      // Actions
      createNote: (title: string) => {
        const note = createEmptyNote(title);
        set((state) => ({
          notes: [note, ...state.notes],
          currentNote: note,
          isEditing: true,
        }));
        return note;
      },

      updateNote: (id: string, updates: Partial<Note>) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, ...updates, updatedAt: new Date().toISOString() }
              : note
          ),
          currentNote:
            state.currentNote?.id === id
              ? { ...state.currentNote, ...updates, updatedAt: new Date().toISOString() }
              : state.currentNote,
        }));
      },

      deleteNote: (id: string) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
          currentNote: state.currentNote?.id === id ? null : state.currentNote,
        }));
      },

      setCurrentNote: (note: Note | null) => {
        set({ currentNote: note, isEditing: false });
      },

      addHighlight: (noteId: string, highlight: Omit<Highlight, 'id' | 'createdAt'>) => {
        const newHighlight: Highlight = {
          ...highlight,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? { ...note, highlights: [...note.highlights, newHighlight] }
              : note
          ),
          currentNote:
            state.currentNote?.id === noteId
              ? { ...state.currentNote, highlights: [...state.currentNote.highlights, newHighlight] }
              : state.currentNote,
        }));
      },

      removeHighlight: (noteId: string, highlightId: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? { ...note, highlights: note.highlights.filter((h) => h.id !== highlightId) }
              : note
          ),
          currentNote:
            state.currentNote?.id === noteId
              ? {
                  ...state.currentNote,
                  highlights: state.currentNote.highlights.filter((h) => h.id !== highlightId),
                }
              : state.currentNote,
        }));
      },

      addCitation: (noteId: string, citation: Omit<NoteCitation, 'id'>) => {
        const newCitation: NoteCitation = {
          ...citation,
          id: generateId(),
        };
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? { ...note, citations: [...note.citations, newCitation] }
              : note
          ),
          currentNote:
            state.currentNote?.id === noteId
              ? { ...state.currentNote, citations: [...state.currentNote.citations, newCitation] }
              : state.currentNote,
        }));
      },

      removeCitation: (noteId: string, citationId: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? { ...note, citations: note.citations.filter((c) => c.id !== citationId) }
              : note
          ),
          currentNote:
            state.currentNote?.id === noteId
              ? {
                  ...state.currentNote,
                  citations: state.currentNote.citations.filter((c) => c.id !== citationId),
                }
              : state.currentNote,
        }));
      },

      linkEntity: (noteId: string, entity: LinkedEntity) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? {
                  ...note,
                  linkedEntities: note.linkedEntities.some((e) => e.id === entity.id)
                    ? note.linkedEntities
                    : [...note.linkedEntities, entity],
                }
              : note
          ),
          currentNote:
            state.currentNote?.id === noteId
              ? {
                  ...state.currentNote,
                  linkedEntities: state.currentNote.linkedEntities.some((e) => e.id === entity.id)
                    ? state.currentNote.linkedEntities
                    : [...state.currentNote.linkedEntities, entity],
                }
              : state.currentNote,
        }));
      },

      unlinkEntity: (noteId: string, entityId: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId
              ? { ...note, linkedEntities: note.linkedEntities.filter((e) => e.id !== entityId) }
              : note
          ),
          currentNote:
            state.currentNote?.id === noteId
              ? {
                  ...state.currentNote,
                  linkedEntities: state.currentNote.linkedEntities.filter((e) => e.id !== entityId),
                }
              : state.currentNote,
        }));
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setSelectedTags: (tags: string[]) => {
        set({ selectedTags: tags });
      },
    }),
    {
      name: 'darwin-notes-storage',
      partialize: (state) => ({
        notes: state.notes,
      }),
    }
  )
);

// =============================================================================
// SELECTORS
// =============================================================================

export const selectFilteredNotes = (state: NotesStore): Note[] => {
  let notes = state.notes;

  // Filter by search query
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    notes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Filter by selected tags
  if (state.selectedTags.length > 0) {
    notes = notes.filter((note) =>
      state.selectedTags.every((tag) => note.tags.includes(tag))
    );
  }

  return notes;
};

export const selectAllTags = (state: NotesStore): string[] => {
  const tagSet = new Set<string>();
  state.notes.forEach((note) => {
    note.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};
