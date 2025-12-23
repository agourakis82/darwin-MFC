/**
 * NOTE CARD COMPONENT
 * ===================
 *
 * Displays a note in card format
 */

'use client';

import { useState } from 'react';
import { type Note } from '@/lib/notes';
import { deleteNote, togglePin, archiveNote } from '@/lib/notes';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onUpdate: () => void;
}

const TYPE_ICONS: Record<string, string> = {
  general: '📝',
  medication: '💊',
  disease: '🦠',
  case: '📁',
  protocol: '📋',
  study: '📚',
};

export default function NoteCard({ note, onClick, onUpdate }: NoteCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - timestamp;

    // Less than 1 day
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    // Less than 7 days
    if (diff < 7 * 24 * 60 * 60 * 1000) {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days}d atrás`;
    }

    // Older
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  const handleTogglePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePin(note.id);
    onUpdate();
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    archiveNote(note.id);
    onUpdate();
    setShowMenu(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (confirm('Tem certeza que deseja excluir esta nota?')) {
      deleteNote(note.id);
      onUpdate();
    }

    setShowMenu(false);
  };

  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
      style={{ backgroundColor: note.color || '#ffffff' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-xl flex-shrink-0">
            {TYPE_ICONS[note.type] || '📝'}
          </span>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
            {note.title}
          </h3>
          {note.isPinned && (
            <span className="text-yellow-600 flex-shrink-0">📌</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleTogglePin}
            className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
              note.isPinned ? 'text-yellow-600' : 'text-gray-400'
            }`}
            title={note.isPinned ? 'Desafixar' : 'Fixar'}
          >
            📌
          </button>
          <div className="relative">
            <button
              onClick={e => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
            >
              ⋮
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10 min-w-[120px]">
                <button
                  onClick={handleArchive}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  📦 Arquivar
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  🗑️ Excluir
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Preview */}
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
        {note.content || 'Nota vazia'}
      </p>

      {/* Linked Content */}
      {note.linkedTo && (
        <div className="mb-3 text-xs text-blue-600 dark:text-blue-400">
          📎 {note.linkedTo.name}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex flex-wrap gap-1">
          {note.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full"
            >
              #{tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="px-2 py-0.5">+{note.tags.length - 3}</span>
          )}
        </div>
        <div>{formatDate(note.updatedAt)}</div>
      </div>
    </div>
  );
}
