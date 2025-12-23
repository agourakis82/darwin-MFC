/**
 * NOTES STORAGE SYSTEM
 * ====================
 *
 * Offline-first note-taking with localStorage
 * Full CRUD operations with search and organization
 */

const NOTES_KEY = 'darwin-mfc-notes';
const NOTES_INDEX_KEY = 'darwin-mfc-notes-index';

export type NoteType = 'general' | 'medication' | 'disease' | 'case' | 'protocol' | 'study';

export interface Note {
  id: string;
  title: string;
  content: string;
  type: NoteType;
  tags: string[];

  // Optional linking to content
  linkedTo?: {
    type: 'medication' | 'disease' | 'calculator' | 'protocol' | 'case';
    id: string;
    name: string;
  };

  // Metadata
  createdAt: number;
  updatedAt: number;
  isPinned: boolean;
  isArchived: boolean;
  color?: string;

  // Future sync support
  syncStatus?: 'synced' | 'pending' | 'conflict';
  remoteId?: string;
}

export interface NotesIndex {
  allIds: string[];
  byType: Record<NoteType, string[]>;
  byTag: Record<string, string[]>;
  pinned: string[];
  archived: string[];
  lastUpdated: number;
}

// ==============================================
// HELPER FUNCTIONS
// ==============================================

function isClient(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function generateId(): string {
  return `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ==============================================
// STORAGE OPERATIONS
// ==============================================

function getNotes(): Record<string, Note> {
  if (!isClient()) return {};

  try {
    const stored = localStorage.getItem(NOTES_KEY);
    if (!stored) return {};

    const notes = JSON.parse(stored);
    return typeof notes === 'object' ? notes : {};
  } catch (error) {
    console.error('Failed to load notes:', error);
    return {};
  }
}

function saveNotes(notes: Record<string, Note>): void {
  if (!isClient()) return;

  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Failed to save notes:', error);
  }
}

function getIndex(): NotesIndex {
  if (!isClient()) {
    return {
      allIds: [],
      byType: {} as Record<NoteType, string[]>,
      byTag: {},
      pinned: [],
      archived: [],
      lastUpdated: 0,
    };
  }

  try {
    const stored = localStorage.getItem(NOTES_INDEX_KEY);
    if (!stored) {
      return {
        allIds: [],
        byType: {} as Record<NoteType, string[]>,
        byTag: {},
        pinned: [],
        archived: [],
        lastUpdated: 0,
      };
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load notes index:', error);
    return {
      allIds: [],
      byType: {} as Record<NoteType, string[]>,
      byTag: {},
      pinned: [],
      archived: [],
      lastUpdated: 0,
    };
  }
}

function saveIndex(index: NotesIndex): void {
  if (!isClient()) return;

  try {
    localStorage.setItem(NOTES_INDEX_KEY, JSON.stringify(index));
  } catch (error) {
    console.error('Failed to save notes index:', error);
  }
}

function rebuildIndex(): NotesIndex {
  const notes = getNotes();
  const index: NotesIndex = {
    allIds: [],
    byType: {
      general: [],
      medication: [],
      disease: [],
      case: [],
      protocol: [],
      study: [],
    },
    byTag: {},
    pinned: [],
    archived: [],
    lastUpdated: Date.now(),
  };

  Object.values(notes).forEach(note => {
    index.allIds.push(note.id);

    if (index.byType[note.type]) {
      index.byType[note.type].push(note.id);
    }

    note.tags.forEach(tag => {
      if (!index.byTag[tag]) {
        index.byTag[tag] = [];
      }
      index.byTag[tag].push(note.id);
    });

    if (note.isPinned) {
      index.pinned.push(note.id);
    }

    if (note.isArchived) {
      index.archived.push(note.id);
    }
  });

  saveIndex(index);
  return index;
}

// ==============================================
// CRUD OPERATIONS
// ==============================================

export function createNote(data: Partial<Note>): Note {
  const notes = getNotes();

  const note: Note = {
    id: generateId(),
    title: data.title || 'Nova Nota',
    content: data.content || '',
    type: data.type || 'general',
    tags: data.tags || [],
    linkedTo: data.linkedTo,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isPinned: data.isPinned || false,
    isArchived: data.isArchived || false,
    color: data.color,
    syncStatus: 'pending',
  };

  notes[note.id] = note;
  saveNotes(notes);
  rebuildIndex();

  return note;
}

export function getNote(id: string): Note | null {
  const notes = getNotes();
  return notes[id] || null;
}

export function getAllNotes(): Note[] {
  const notes = getNotes();
  return Object.values(notes)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function updateNote(id: string, updates: Partial<Note>): Note | null {
  const notes = getNotes();
  const note = notes[id];

  if (!note) return null;

  const updatedNote: Note = {
    ...note,
    ...updates,
    id: note.id, // Prevent ID change
    createdAt: note.createdAt, // Prevent creation date change
    updatedAt: Date.now(),
    syncStatus: 'pending',
  };

  notes[id] = updatedNote;
  saveNotes(notes);
  rebuildIndex();

  return updatedNote;
}

export function deleteNote(id: string): boolean {
  const notes = getNotes();

  if (!notes[id]) return false;

  delete notes[id];
  saveNotes(notes);
  rebuildIndex();

  return true;
}

// ==============================================
// QUERY OPERATIONS
// ==============================================

export function getNotesByType(type: NoteType): Note[] {
  const notes = getNotes();
  const index = getIndex();

  return (index.byType[type] || [])
    .map(id => notes[id])
    .filter(Boolean)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getNotesByTag(tag: string): Note[] {
  const notes = getNotes();
  const index = getIndex();

  return (index.byTag[tag] || [])
    .map(id => notes[id])
    .filter(Boolean)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getPinnedNotes(): Note[] {
  const notes = getNotes();
  const index = getIndex();

  return index.pinned
    .map(id => notes[id])
    .filter(Boolean)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getArchivedNotes(): Note[] {
  const notes = getNotes();
  const index = getIndex();

  return index.archived
    .map(id => notes[id])
    .filter(Boolean)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getActiveNotes(): Note[] {
  return getAllNotes().filter(note => !note.isArchived);
}

export function getNotesLinkedTo(type: string, id: string): Note[] {
  return getAllNotes().filter(
    note => note.linkedTo?.type === type && note.linkedTo?.id === id
  );
}

// ==============================================
// SEARCH OPERATIONS
// ==============================================

export function searchNotes(query: string): Note[] {
  if (!query || query.trim().length === 0) {
    return getActiveNotes();
  }

  const normalizedQuery = query.toLowerCase().trim();

  return getAllNotes().filter(note => {
    // Skip archived unless specifically searching archived
    if (note.isArchived && !query.includes('archived')) {
      return false;
    }

    // Search in title
    if (note.title.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Search in content
    if (note.content.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Search in tags
    if (note.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))) {
      return true;
    }

    // Search in linked content
    if (note.linkedTo?.name.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    return false;
  });
}

// ==============================================
// BATCH OPERATIONS
// ==============================================

export function togglePin(id: string): Note | null {
  const note = getNote(id);
  if (!note) return null;

  return updateNote(id, { isPinned: !note.isPinned });
}

export function archiveNote(id: string): Note | null {
  return updateNote(id, { isArchived: true });
}

export function unarchiveNote(id: string): Note | null {
  return updateNote(id, { isArchived: false });
}

export function addTag(id: string, tag: string): Note | null {
  const note = getNote(id);
  if (!note) return null;

  if (note.tags.includes(tag)) return note;

  return updateNote(id, { tags: [...note.tags, tag] });
}

export function removeTag(id: string, tag: string): Note | null {
  const note = getNote(id);
  if (!note) return null;

  return updateNote(id, { tags: note.tags.filter(t => t !== tag) });
}

// ==============================================
// STATISTICS
// ==============================================

export function getNotesStats() {
  const notes = getAllNotes();
  const index = getIndex();

  return {
    total: notes.length,
    active: notes.filter(n => !n.isArchived).length,
    archived: index.archived.length,
    pinned: index.pinned.length,
    byType: {
      general: index.byType.general?.length || 0,
      medication: index.byType.medication?.length || 0,
      disease: index.byType.disease?.length || 0,
      case: index.byType.case?.length || 0,
      protocol: index.byType.protocol?.length || 0,
      study: index.byType.study?.length || 0,
    },
    totalTags: Object.keys(index.byTag).length,
    recentlyUpdated: notes.slice(0, 5),
  };
}

export function getAllTags(): string[] {
  const index = getIndex();
  return Object.keys(index.byTag).sort();
}

// ==============================================
// IMPORT/EXPORT
// ==============================================

export function exportNotes(): Note[] {
  return getAllNotes();
}

export function importNotes(notes: Note[], merge: boolean = false): number {
  const existing = getNotes();
  let imported = 0;

  notes.forEach(note => {
    if (merge && existing[note.id]) {
      // Skip if already exists in merge mode
      return;
    }

    existing[note.id] = {
      ...note,
      syncStatus: 'pending',
    };
    imported++;
  });

  saveNotes(existing);
  rebuildIndex();

  return imported;
}

export function clearAllNotes(): void {
  if (!isClient()) return;

  localStorage.removeItem(NOTES_KEY);
  localStorage.removeItem(NOTES_INDEX_KEY);
}
