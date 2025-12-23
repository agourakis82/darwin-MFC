'use client';

import React, { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Search,
  Tag,
  Trash2,
  Edit3,
  Save,
  X,
  Download,
  Link2,
  BookOpen,
  Quote,
  Highlighter,
  ChevronDown,
  Clock,
  Hash,
} from 'lucide-react';
import { useNotesStore, selectFilteredNotes, selectAllTags } from '@/lib/store/notesStore';
import type { Note, HighlightColor, LinkedEntity } from '@/lib/types/notes';
import { HIGHLIGHT_COLORS } from '@/lib/types/notes';
import { cn } from '@/lib/utils';

// =============================================================================
// SAFE MARKDOWN RENDERER
// Uses React elements instead of dangerouslySetInnerHTML
// =============================================================================

interface MarkdownRendererProps {
  content: string;
}

function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const elements = useMemo(() => {
    const lines = content.split('\n');
    const result: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];
    let isInList = false;
    let listType: 'ul' | 'ol' = 'ul';

    const processInline = (text: string, keyPrefix: string): React.ReactNode[] => {
      const nodes: React.ReactNode[] = [];
      let remaining = text;
      let key = 0;

      // Process inline elements in order: bold, italic, code, links
      while (remaining.length > 0) {
        // Bold **text**
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
        // Italic *text*
        const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)/);
        // Inline code `code`
        const codeMatch = remaining.match(/`([^`]+)`/);
        // Links [text](url)
        const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

        // Find earliest match
        const matches = [
          { type: 'bold', match: boldMatch, index: boldMatch?.index ?? Infinity },
          { type: 'italic', match: italicMatch, index: italicMatch?.index ?? Infinity },
          { type: 'code', match: codeMatch, index: codeMatch?.index ?? Infinity },
          { type: 'link', match: linkMatch, index: linkMatch?.index ?? Infinity },
        ].filter((m) => m.match !== null);

        if (matches.length === 0) {
          if (remaining) nodes.push(remaining);
          break;
        }

        const earliest = matches.reduce((a, b) => (a.index < b.index ? a : b));

        // Add text before match
        if (earliest.index > 0) {
          nodes.push(remaining.substring(0, earliest.index));
        }

        const match = earliest.match!;
        const fullMatch = match[0];

        switch (earliest.type) {
          case 'bold':
            nodes.push(
              <strong key={`${keyPrefix}-${key++}`} className="font-semibold">
                {match[1]}
              </strong>
            );
            break;
          case 'italic':
            nodes.push(
              <em key={`${keyPrefix}-${key++}`} className="italic">
                {match[1]}
              </em>
            );
            break;
          case 'code':
            nodes.push(
              <code
                key={`${keyPrefix}-${key++}`}
                className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
              >
                {match[1]}
              </code>
            );
            break;
          case 'link':
            nodes.push(
              <a
                key={`${keyPrefix}-${key++}`}
                href={match[2]}
                className="text-[#007aff] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {match[1]}
              </a>
            );
            break;
        }

        remaining = remaining.substring(earliest.index + fullMatch.length);
      }

      return nodes;
    };

    const flushList = () => {
      if (listItems.length > 0) {
        if (listType === 'ul') {
          result.push(
            <ul key={`list-${result.length}`} className="list-disc ml-6 my-2 space-y-1">
              {listItems}
            </ul>
          );
        } else {
          result.push(
            <ol key={`list-${result.length}`} className="list-decimal ml-6 my-2 space-y-1">
              {listItems}
            </ol>
          );
        }
        listItems = [];
        isInList = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Empty line
      if (!trimmed) {
        flushList();
        result.push(<br key={`br-${index}`} />);
        return;
      }

      // Headers
      if (trimmed.startsWith('### ')) {
        flushList();
        result.push(
          <h3 key={`h3-${index}`} className="text-lg font-semibold mt-4 mb-2 text-[#1d1d1f] dark:text-[#f5f5f7]">
            {processInline(trimmed.slice(4), `h3-${index}`)}
          </h3>
        );
        return;
      }
      if (trimmed.startsWith('## ')) {
        flushList();
        result.push(
          <h2 key={`h2-${index}`} className="text-xl font-bold mt-6 mb-3 text-[#1d1d1f] dark:text-[#f5f5f7]">
            {processInline(trimmed.slice(3), `h2-${index}`)}
          </h2>
        );
        return;
      }
      if (trimmed.startsWith('# ')) {
        flushList();
        result.push(
          <h1 key={`h1-${index}`} className="text-2xl font-bold mt-6 mb-4 text-[#1d1d1f] dark:text-[#f5f5f7]">
            {processInline(trimmed.slice(2), `h1-${index}`)}
          </h1>
        );
        return;
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        flushList();
        result.push(
          <blockquote
            key={`quote-${index}`}
            className="border-l-4 border-[#007aff] pl-4 my-2 text-gray-600 dark:text-gray-400 italic"
          >
            {processInline(trimmed.slice(2), `quote-${index}`)}
          </blockquote>
        );
        return;
      }

      // Unordered list
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (!isInList || listType !== 'ul') {
          flushList();
          isInList = true;
          listType = 'ul';
        }
        listItems.push(
          <li key={`li-${index}`}>{processInline(trimmed.slice(2), `li-${index}`)}</li>
        );
        return;
      }

      // Ordered list
      const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
      if (orderedMatch) {
        if (!isInList || listType !== 'ol') {
          flushList();
          isInList = true;
          listType = 'ol';
        }
        listItems.push(
          <li key={`li-${index}`}>{processInline(orderedMatch[1], `li-${index}`)}</li>
        );
        return;
      }

      // Code block (simple single-line for now)
      if (trimmed.startsWith('```') && trimmed.endsWith('```') && trimmed.length > 6) {
        flushList();
        result.push(
          <pre
            key={`pre-${index}`}
            className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg my-2 overflow-x-auto text-sm font-mono"
          >
            <code>{trimmed.slice(3, -3)}</code>
          </pre>
        );
        return;
      }

      // Regular paragraph
      flushList();
      result.push(
        <p key={`p-${index}`} className="my-2 text-[#1d1d1f] dark:text-[#f5f5f7]">
          {processInline(trimmed, `p-${index}`)}
        </p>
      );
    });

    flushList();
    return result;
  }, [content]);

  return <div className="space-y-1">{elements}</div>;
}

// =============================================================================
// NOTES LIST SIDEBAR
// =============================================================================

interface NotesListProps {
  notes: Note[];
  currentNote: Note | null;
  onSelectNote: (note: Note) => void;
  onCreateNote: () => void;
  onDeleteNote: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function NotesList({
  notes,
  currentNote,
  onSelectNote,
  onCreateNote,
  onDeleteNote,
  searchQuery,
  onSearchChange,
}: NotesListProps) {
  return (
    <div className="w-80 border-r border-gray-200 dark:border-white/10 flex flex-col h-full bg-gray-50 dark:bg-[#1c1c1e]">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
            Minhas Notas
          </h2>
          <button
            onClick={onCreateNote}
            className="p-2 rounded-lg bg-[#007aff] text-white hover:bg-[#0056b3] transition-colors"
            aria-label="Nova nota"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar notas..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#007aff]/50"
          />
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-[#86868b]">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma nota encontrada</p>
            <button
              onClick={onCreateNote}
              className="mt-4 text-sm text-[#007aff] hover:underline"
            >
              Criar primeira nota
            </button>
          </div>
        ) : (
          notes.map((note) => (
            <motion.button
              key={note.id}
              onClick={() => onSelectNote(note)}
              className={cn(
                'w-full p-3 rounded-lg text-left transition-colors',
                currentNote?.id === note.id
                  ? 'bg-[#007aff]/10 border border-[#007aff]/30'
                  : 'hover:bg-gray-100 dark:hover:bg-white/5'
              )}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
                    {note.title || 'Sem título'}
                  </h3>
                  <p className="text-xs text-[#86868b] mt-1 truncate">
                    {note.content.substring(0, 60) || 'Nota vazia...'}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-3 h-3 text-[#86868b]" />
                    <span className="text-xs text-[#86868b]">
                      {new Date(note.updatedAt).toLocaleDateString('pt-BR')}
                    </span>
                    {note.tags.length > 0 && (
                      <>
                        <Tag className="w-3 h-3 text-[#86868b] ml-2" />
                        <span className="text-xs text-[#86868b]">{note.tags.length}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNote(note.id);
                  }}
                  className="p-1 text-[#86868b] hover:text-red-500 transition-colors"
                  aria-label="Excluir nota"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
}

// =============================================================================
// NOTE EDITOR
// =============================================================================

interface NoteEditorProps {
  note: Note;
  isEditing: boolean;
  onToggleEdit: () => void;
  onUpdateNote: (updates: Partial<Note>) => void;
  onExport: (format: 'markdown' | 'html') => void;
}

function NoteEditor({
  note,
  isEditing,
  onToggleEdit,
  onUpdateNote,
  onExport,
}: NoteEditorProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddTag = () => {
    if (newTag.trim() && !note.tags.includes(newTag.trim())) {
      onUpdateNote({ tags: [...note.tags, newTag.trim()] });
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onUpdateNote({ tags: note.tags.filter((tag) => tag !== tagToRemove) });
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Editor Header */}
      <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
        <input
          type="text"
          value={note.title}
          onChange={(e) => onUpdateNote({ title: e.target.value })}
          placeholder="Título da nota"
          className="text-xl font-semibold bg-transparent border-none focus:outline-none text-[#1d1d1f] dark:text-[#f5f5f7] flex-1"
        />

        <div className="flex items-center gap-2">
          {/* Toggle Edit/Preview */}
          <button
            onClick={onToggleEdit}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              isEditing
                ? 'bg-[#34c759] text-white'
                : 'bg-gray-100 dark:bg-white/10 text-[#1d1d1f] dark:text-[#f5f5f7]'
            )}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                Salvar
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" />
                Editar
              </>
            )}
          </button>

          {/* Export Button */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-white/10 rounded-lg text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar
              <ChevronDown className="w-3 h-3" />
            </button>

            {showExportMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowExportMenu(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#2c2c2e] border border-gray-200 dark:border-white/10 rounded-lg shadow-lg z-20 min-w-[160px] overflow-hidden">
                  <button
                    onClick={() => {
                      onExport('markdown');
                      setShowExportMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Markdown (.md)
                  </button>
                  <button
                    onClick={() => {
                      onExport('html');
                      setShowExportMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    HTML
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="px-4 py-2 border-b border-gray-200 dark:border-white/10 flex items-center gap-2 flex-wrap">
        <Tag className="w-4 h-4 text-[#86868b]" />
        {note.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 bg-[#007aff]/10 text-[#007aff] rounded-full text-xs"
          >
            <Hash className="w-3 h-3" />
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="hover:text-red-500 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {showTagInput ? (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Nova tag..."
              className="px-2 py-1 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#007aff]/50 w-24"
              autoFocus
            />
            <button onClick={handleAddTag} className="text-[#007aff] text-xs">
              Adicionar
            </button>
            <button onClick={() => setShowTagInput(false)} className="text-[#86868b]">
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowTagInput(true)}
            className="text-xs text-[#86868b] hover:text-[#007aff] transition-colors"
          >
            + Adicionar tag
          </button>
        )}
      </div>

      {/* Editor/Preview Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={note.content}
            onChange={(e) => onUpdateNote({ content: e.target.value })}
            placeholder="Escreva sua nota em Markdown...

Suporte:
# Título
## Subtítulo
**Negrito**
*Itálico*
- Lista
> Citação
`código`
[link](url)"
            className="w-full h-full bg-transparent border-none focus:outline-none resize-none text-[#1d1d1f] dark:text-[#f5f5f7] font-mono text-sm leading-relaxed"
          />
        ) : (
          <MarkdownRenderer content={note.content} />
        )}
      </div>

      {/* Citations Footer */}
      {note.citations.length > 0 && (
        <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
          <h4 className="text-sm font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2 flex items-center gap-2">
            <Quote className="w-4 h-4" />
            Referências ({note.citations.length})
          </h4>
          <ol className="text-xs text-[#86868b] space-y-1">
            {note.citations.map((citation, index) => (
              <li key={citation.id}>
                [{index + 1}] {citation.reference.authors?.join(', ')}. {citation.reference.title}.{' '}
                {citation.reference.year}.
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// EMPTY STATE
// =============================================================================

function EmptyState({ onCreateNote }: { onCreateNote: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#007aff]/10 to-[#5856d6]/10 flex items-center justify-center mx-auto mb-6">
          <FileText className="w-10 h-10 text-[#007aff]" />
        </div>
        <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
          Nenhuma nota selecionada
        </h3>
        <p className="text-[#86868b] mb-6">
          Selecione uma nota da lista ou crie uma nova
        </p>
        <button
          onClick={onCreateNote}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#007aff] text-white rounded-lg font-medium hover:bg-[#0056b3] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Criar Nova Nota
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// EXPORT UTILITIES
// =============================================================================

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function generateMarkdownExport(note: Note): string {
  let content = `# ${note.title}\n\n${note.content}`;
  if (note.citations.length > 0) {
    content += '\n\n---\n\n## Referências\n\n';
    note.citations.forEach((citation, index) => {
      const authors = citation.reference.authors?.join(', ') || 'Unknown';
      const title = citation.reference.title || 'Untitled';
      const year = citation.reference.year || '';
      content += `${index + 1}. ${authors}. ${title}. ${year}.\n`;
    });
  }
  return content;
}

function generateHtmlExport(note: Note): string {
  const escapedTitle = escapeHtml(note.title);
  const escapedContent = escapeHtml(note.content);
  const dateStr = new Date(note.updatedAt).toLocaleDateString('pt-BR', { dateStyle: 'full' });

  let citationsHtml = '';
  if (note.citations.length > 0) {
    citationsHtml = `
  <div class="references">
    <h2>Referências</h2>
    <ol>
      ${note.citations
        .map((citation) => {
          const authors = escapeHtml(citation.reference.authors?.join(', ') || 'Unknown');
          const title = escapeHtml(citation.reference.title || 'Untitled');
          const year = escapeHtml(String(citation.reference.year || ''));
          return `<li>${authors}. ${title}. ${year}.</li>`;
        })
        .join('\n      ')}
    </ol>
  </div>`;
  }

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${escapedTitle}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1d1d1f; line-height: 1.6; }
    h1 { font-size: 28px; margin-bottom: 24px; }
    h2 { font-size: 22px; margin-top: 32px; }
    h3 { font-size: 18px; margin-top: 24px; }
    pre { background: #f5f5f7; padding: 16px; border-radius: 8px; overflow-x: auto; white-space: pre-wrap; }
    code { background: #f5f5f7; padding: 2px 6px; border-radius: 4px; }
    blockquote { border-left: 4px solid #007aff; padding-left: 16px; color: #666; font-style: italic; }
    a { color: #007aff; }
    .references { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e5e5; }
    .references h2 { font-size: 18px; }
    .references ol { font-size: 14px; color: #666; }
    .meta { font-size: 12px; color: #86868b; margin-bottom: 24px; }
    .content { white-space: pre-wrap; }
  </style>
</head>
<body>
  <h1>${escapedTitle}</h1>
  <p class="meta">Atualizado em ${dateStr}</p>
  <div class="content">${escapedContent}</div>
  ${citationsHtml}
  <p class="meta" style="margin-top: 40px;">Exportado do Darwin-MFC</p>
</body>
</html>`;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function CollaborativeNotes() {
  const {
    notes,
    currentNote,
    isEditing,
    searchQuery,
    createNote,
    updateNote,
    deleteNote,
    setCurrentNote,
    setSearchQuery,
  } = useNotesStore();

  const [localIsEditing, setLocalIsEditing] = useState(false);

  const filteredNotes = useNotesStore(selectFilteredNotes);

  const handleCreateNote = useCallback(() => {
    const note = createNote('Nova Nota');
    setLocalIsEditing(true);
  }, [createNote]);

  const handleSelectNote = useCallback(
    (note: Note) => {
      setCurrentNote(note);
      setLocalIsEditing(false);
    },
    [setCurrentNote]
  );

  const handleDeleteNote = useCallback(
    (id: string) => {
      if (window.confirm('Tem certeza que deseja excluir esta nota?')) {
        deleteNote(id);
      }
    },
    [deleteNote]
  );

  const handleUpdateNote = useCallback(
    (updates: Partial<Note>) => {
      if (currentNote) {
        updateNote(currentNote.id, updates);
      }
    },
    [currentNote, updateNote]
  );

  const handleExport = useCallback(
    (format: 'markdown' | 'html') => {
      if (!currentNote) return;

      let content: string;
      let filename: string;
      let mimeType: string;

      if (format === 'markdown') {
        content = generateMarkdownExport(currentNote);
        filename = `${currentNote.title.replace(/[^a-z0-9]/gi, '_')}.md`;
        mimeType = 'text/markdown';
      } else {
        content = generateHtmlExport(currentNote);
        filename = `${currentNote.title.replace(/[^a-z0-9]/gi, '_')}.html`;
        mimeType = 'text/html';
      }

      // Download
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    [currentNote]
  );

  return (
    <div className="flex h-[calc(100vh-200px)] min-h-[500px] bg-white dark:bg-[#1c1c1e] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
      {/* Notes List Sidebar */}
      <NotesList
        notes={filteredNotes}
        currentNote={currentNote}
        onSelectNote={handleSelectNote}
        onCreateNote={handleCreateNote}
        onDeleteNote={handleDeleteNote}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Editor */}
      {currentNote ? (
        <NoteEditor
          note={currentNote}
          isEditing={localIsEditing}
          onToggleEdit={() => setLocalIsEditing(!localIsEditing)}
          onUpdateNote={handleUpdateNote}
          onExport={handleExport}
        />
      ) : (
        <EmptyState onCreateNote={handleCreateNote} />
      )}
    </div>
  );
}
