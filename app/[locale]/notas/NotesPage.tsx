/**
 * NOTES PAGE
 * ==========
 *
 * Main notes management interface
 */

'use client';

import { useState, useEffect } from 'react';
import NoteEditor from '@/app/components/Notes/NoteEditor';
import NoteCard from '@/app/components/Notes/NoteCard';
import ExportButton, { type ExportFormat } from '@/app/components/Export/ExportButton';
import {
  getAllNotes,
  searchNotes,
  getNotesByType,
  getNotesByTag,
  getPinnedNotes,
  getArchivedNotes,
  getActiveNotes,
  getNotesStats,
  getAllTags,
  exportNotes,
  importNotes,
  clearAllNotes,
  type Note,
  type NoteType,
} from '@/lib/notes';
import { exportNotesToCSV, downloadCSV } from '@/lib/export/csv';
import { exportNotesToPDF } from '@/lib/export/pdf';
import { downloadFile } from '@/lib/export';

type ViewMode = 'all' | 'pinned' | 'archived' | NoteType;

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);
  const [stats, setStats] = useState(getNotesStats());
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    loadNotes();
  }, [viewMode, selectedTag, searchQuery]);

  const loadNotes = () => {
    let loaded: Note[];

    if (searchQuery) {
      loaded = searchNotes(searchQuery);
    } else if (selectedTag) {
      loaded = getNotesByTag(selectedTag);
    } else {
      switch (viewMode) {
        case 'all':
          loaded = getActiveNotes();
          break;
        case 'pinned':
          loaded = getPinnedNotes();
          break;
        case 'archived':
          loaded = getArchivedNotes();
          break;
        default:
          loaded = getNotesByType(viewMode as NoteType);
      }
    }

    setNotes(loaded);
    setFilteredNotes(loaded);
    setStats(getNotesStats());
    setAllTags(getAllTags());
  };

  const handleNewNote = () => {
    setEditingNote(undefined);
    setShowEditor(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleSaveNote = () => {
    setShowEditor(false);
    setEditingNote(undefined);
    loadNotes();
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setEditingNote(undefined);
  };

  const handleExportFormat = async (format: ExportFormat) => {
    const notesToExport = filteredNotes.length > 0 ? filteredNotes : notes;
    const timestamp = new Date().toISOString().split('T')[0];

    if (format === 'csv') {
      const csvContent = exportNotesToCSV(notesToExport);
      downloadCSV(csvContent, `darwin-mfc-notas-${timestamp}.csv`);
    } else if (format === 'pdf') {
      const blob = await exportNotesToPDF(notesToExport, {
        title: 'Minhas Notas - Darwin-MFC',
        author: 'Darwin-MFC',
      });
      downloadFile(blob, `darwin-mfc-notas-${timestamp}.pdf`, 'application/pdf');
    } else if (format === 'json') {
      const data = exportNotes();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      downloadFile(blob, `darwin-mfc-notas-${timestamp}.json`, 'application/json');
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          const count = importNotes(imported, true);
          alert(`${count} notas importadas com sucesso!`);
          loadNotes();
        } catch (error) {
          alert('Erro ao importar notas. Verifique o formato do arquivo.');
        }
      };
      reader.readAsText(file);
    };

    input.click();
  };

  const handleClearAll = () => {
    if (confirm('Tem certeza que deseja excluir TODAS as notas? Esta ação não pode ser desfeita.')) {
      clearAllNotes();
      loadNotes();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                📝 Minhas Notas
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {stats.active} ativas • {stats.archived} arquivadas • {stats.totalTags} tags
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleImport}
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                title="Importar notas"
              >
                📥
              </button>
              <ExportButton
                onExport={handleExportFormat}
                formats={['csv', 'pdf', 'json']}
                label="Exportar"
                icon="📤"
                className="text-sm"
              />
              <button
                onClick={handleClearAll}
                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                title="Limpar todas"
              >
                🗑️
              </button>
              <button
                onClick={handleNewNote}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                ➕ Nova Nota
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar notas..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => {
                setViewMode('all');
                setSelectedTag(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                viewMode === 'all' && !selectedTag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Todas ({stats.active})
            </button>
            <button
              onClick={() => {
                setViewMode('pinned');
                setSelectedTag(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                viewMode === 'pinned'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              📌 Fixadas ({stats.pinned})
            </button>
            <button
              onClick={() => {
                setViewMode('archived');
                setSelectedTag(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                viewMode === 'archived'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              📦 Arquivadas ({stats.archived})
            </button>

            <div className="border-l border-gray-300 dark:border-gray-600 h-8 mx-2" />

            {/* Type Filters */}
            <button
              onClick={() => {
                setViewMode('medication');
                setSelectedTag(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                viewMode === 'medication'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              💊 Medicamentos ({stats.byType.medication})
            </button>
            <button
              onClick={() => {
                setViewMode('disease');
                setSelectedTag(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                viewMode === 'disease'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              🦠 Doenças ({stats.byType.disease})
            </button>
            <button
              onClick={() => {
                setViewMode('case');
                setSelectedTag(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                viewMode === 'case'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              📁 Casos ({stats.byType.case})
            </button>
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600 dark:text-gray-400">Tags:</span>
              {allTags.slice(0, 10).map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(selectedTag === tag ? null : tag);
                    setViewMode('all');
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  #{tag}
                </button>
              ))}
              {allTags.length > 10 && (
                <span className="text-xs text-gray-500">+{allTags.length - 10} mais</span>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Notes Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Nenhuma nota encontrada
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery
                ? 'Tente buscar por outros termos'
                : 'Crie sua primeira nota para começar'}
            </p>
            {!searchQuery && (
              <button
                onClick={handleNewNote}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                ➕ Criar Nova Nota
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => handleEditNote(note)}
                onUpdate={loadNotes}
              />
            ))}
          </div>
        )}
      </main>

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <NoteEditor
            note={editingNote}
            onSave={handleSaveNote}
            onCancel={handleCancelEdit}
          />
        </div>
      )}
    </div>
  );
}
