/**
 * Collaborative Notes Types
 * Types for the notes and annotation system
 */

import type { Reference } from './references';

// =============================================================================
// NOTE TYPES
// =============================================================================

export interface Note {
  id: string;
  title: string;
  content: string; // Markdown content
  createdAt: string;
  updatedAt: string;
  tags: string[];
  linkedEntities: LinkedEntity[];
  highlights: Highlight[];
  citations: NoteCitation[];
  isPublic: boolean;
  authorId?: string;
}

export interface LinkedEntity {
  type: 'disease' | 'medication' | 'protocol' | 'screening' | 'calculator';
  id: string;
  name: string;
}

export interface Highlight {
  id: string;
  text: string;
  color: HighlightColor;
  startOffset: number;
  endOffset: number;
  annotation?: string;
  createdAt: string;
}

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'purple';

export interface NoteCitation {
  id: string;
  citationNumber: number;
  reference: Reference;
  pageNumber?: string;
  quote?: string;
}

// =============================================================================
// NOTE STORE TYPES
// =============================================================================

export interface NotesState {
  notes: Note[];
  currentNote: Note | null;
  isEditing: boolean;
  searchQuery: string;
  selectedTags: string[];
}

export interface NotesActions {
  createNote: (title: string) => Note;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setCurrentNote: (note: Note | null) => void;
  addHighlight: (noteId: string, highlight: Omit<Highlight, 'id' | 'createdAt'>) => void;
  removeHighlight: (noteId: string, highlightId: string) => void;
  addCitation: (noteId: string, citation: Omit<NoteCitation, 'id'>) => void;
  removeCitation: (noteId: string, citationId: string) => void;
  linkEntity: (noteId: string, entity: LinkedEntity) => void;
  unlinkEntity: (noteId: string, entityId: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
}

// =============================================================================
// EXPORT TYPES
// =============================================================================

export interface NoteExportOptions {
  format: 'markdown' | 'pdf' | 'docx' | 'html';
  includeCitations: boolean;
  includeHighlights: boolean;
  includeMetadata: boolean;
  citationStyle: 'vancouver' | 'apa' | 'harvard';
}

// =============================================================================
// HIGHLIGHT COLORS CONFIG
// =============================================================================

export const HIGHLIGHT_COLORS: Record<HighlightColor, { bg: string; text: string; label: string }> = {
  yellow: { bg: 'bg-yellow-200 dark:bg-yellow-900/50', text: 'text-yellow-900 dark:text-yellow-100', label: 'Amarelo' },
  green: { bg: 'bg-green-200 dark:bg-green-900/50', text: 'text-green-900 dark:text-green-100', label: 'Verde' },
  blue: { bg: 'bg-blue-200 dark:bg-blue-900/50', text: 'text-blue-900 dark:text-blue-100', label: 'Azul' },
  pink: { bg: 'bg-pink-200 dark:bg-pink-900/50', text: 'text-pink-900 dark:text-pink-100', label: 'Rosa' },
  purple: { bg: 'bg-purple-200 dark:bg-purple-900/50', text: 'text-purple-900 dark:text-purple-100', label: 'Roxo' },
};
