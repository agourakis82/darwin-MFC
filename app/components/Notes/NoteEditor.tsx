/**
 * NOTE EDITOR COMPONENT
 * =====================
 *
 * Rich text editor for creating and editing notes
 */

'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createNote, updateNote, type Note, type NoteType } from '@/lib/notes';
import { useNoteTracking } from '@/lib/analytics/hooks';
import { showErrorToast, showSuccessToast } from '@/app/components/ui/Toast';
import { useAutoSave, type AutoSaveStatus } from '@/lib/hooks/useAutoSave';

interface NoteEditorProps {
  note?: Note;
  onSave: (note: Note) => void;
  onCancel: () => void;
  linkedTo?: {
    type: 'medication' | 'disease' | 'calculator' | 'protocol' | 'case';
    id: string;
    name: string;
  };
}

const NOTE_TYPES: { value: NoteType; label: string; icon: string }[] = [
  { value: 'general', label: 'Geral', icon: '📝' },
  { value: 'medication', label: 'Medicamento', icon: '💊' },
  { value: 'disease', label: 'Doença', icon: '🦠' },
  { value: 'case', label: 'Caso Clínico', icon: '📁' },
  { value: 'protocol', label: 'Protocolo', icon: '📋' },
  { value: 'study', label: 'Estudo', icon: '📚' },
];

const COLORS = [
  { value: '#ffffff', label: 'Branco' },
  { value: '#fef3c7', label: 'Amarelo' },
  { value: '#fee2e2', label: 'Vermelho' },
  { value: '#dbeafe', label: 'Azul' },
  { value: '#dcfce7', label: 'Verde' },
  { value: '#fce7f3', label: 'Rosa' },
  { value: '#e0e7ff', label: 'Índigo' },
  { value: '#f3e8ff', label: 'Roxo' },
];

// Auto-save status indicator component
function AutoSaveIndicator({ status }: { status: AutoSaveStatus }) {
  const statusConfig = {
    idle: { text: '', icon: '', className: 'text-transparent' },
    dirty: { text: 'Alterações não salvas', icon: '○', className: 'text-amber-500' },
    saving: { text: 'Salvando...', icon: '◌', className: 'text-blue-500 animate-pulse' },
    saved: { text: 'Salvo', icon: '✓', className: 'text-green-500' },
    error: { text: 'Erro ao salvar', icon: '✕', className: 'text-red-500' },
  };

  const config = statusConfig[status];

  if (status === 'idle') return null;

  return (
    <span className={`text-sm flex items-center gap-1 ${config.className}`}>
      <span>{config.icon}</span>
      <span>{config.text}</span>
    </span>
  );
}

export default function NoteEditor({ note, onSave, onCancel, linkedTo }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [type, setType] = useState<NoteType>(note?.type || (linkedTo?.type as NoteType) || 'general');
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [color, setColor] = useState(note?.color || '#ffffff');
  const [isPinned, setIsPinned] = useState(note?.isPinned || false);
  const [isSaving, setIsSaving] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const trackNote = useNoteTracking();

  // Current form data for auto-save
  const currentFormData = useMemo(() => ({
    title: title.trim(),
    content: content.trim(),
    type,
    tags,
    color,
    isPinned,
    linkedTo: linkedTo || note?.linkedTo,
  }), [title, content, type, tags, color, isPinned, linkedTo, note?.linkedTo]);

  // Auto-save callback (only for existing notes)
  const handleAutoSave = useCallback(async (data: typeof currentFormData) => {
    if (!note || !data.title) return;

    const updated = updateNote(note.id, data);
    if (!updated) {
      throw new Error('Failed to auto-save note');
    }
    trackNote('update', updated.id, linkedTo?.id);
  }, [note, linkedTo?.id, trackNote]);

  // Auto-save hook (only enabled for existing notes with a title)
  const {
    status: autoSaveStatus,
    setValue: triggerAutoSave,
    save: saveNow,
  } = useAutoSave({
    delay: 2000,
    onSave: handleAutoSave,
    onError: () => showErrorToast('Auto-save falhou', 'Suas alterações não foram salvas automaticamente.'),
    enabled: !!note && !!title.trim(),
    savedDuration: 3000,
  });

  // Trigger auto-save when form data changes (for existing notes)
  useEffect(() => {
    if (note && title.trim()) {
      triggerAutoSave(currentFormData);
    }
  }, [currentFormData, note, title, triggerAutoSave]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  const handleSave = async () => {
    if (!title.trim()) {
      showErrorToast('Título obrigatório', 'O título não pode estar vazio');
      return;
    }

    setIsSaving(true);

    try {
      let savedNote: Note;

      if (note) {
        // For existing notes, ensure any pending auto-save completes
        await saveNow();

        // Update existing note with final values
        const updated = updateNote(note.id, {
          title: title.trim(),
          content: content.trim(),
          type,
          tags,
          color,
          isPinned,
          linkedTo: linkedTo || note.linkedTo,
        });

        if (!updated) {
          throw new Error('Failed to update note');
        }

        savedNote = updated;
        trackNote('update', savedNote.id, linkedTo?.id);
        showSuccessToast('Nota atualizada', 'Suas alterações foram salvas.');
      } else {
        // Create new note
        savedNote = createNote({
          title: title.trim(),
          content: content.trim(),
          type,
          tags,
          color,
          isPinned,
          linkedTo,
        });

        trackNote('create', savedNote.id, linkedTo?.id);
        showSuccessToast('Nota criada', 'Sua nota foi salva com sucesso.');
      }

      onSave(savedNote);
    } catch (error) {
      console.error('Failed to save note:', error);
      showErrorToast('Erro ao salvar', 'Não foi possível salvar a nota. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();

    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between" style={{ backgroundColor: color }}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {note ? 'Editar Nota' : 'Nova Nota'}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPinned(!isPinned)}
            className={`p-2 rounded transition-colors ${
              isPinned
                ? 'text-yellow-600 hover:text-yellow-700'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            title={isPinned ? 'Desafixar' : 'Fixar'}
          >
            📌
          </button>
          <button
            onClick={onCancel}
            className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Title */}
        <div>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Título da nota..."
            className="w-full text-2xl font-bold bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
            autoFocus
          />
        </div>

        {/* Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tipo
          </label>
          <div className="flex flex-wrap gap-2">
            {NOTE_TYPES.map(noteType => (
              <button
                key={noteType.value}
                onClick={() => setType(noteType.value)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                  ${
                    type === noteType.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                {noteType.icon} {noteType.label}
              </button>
            ))}
          </div>
        </div>

        {/* Linked Content */}
        {linkedTo && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
              📎 Vinculado a:
            </div>
            <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              {linkedTo.name}
            </div>
          </div>
        )}

        {/* Content Textarea */}
        <div>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={e => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escreva sua nota aqui... (Ctrl+Enter para salvar)"
            className="w-full min-h-[200px] bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
              >
                #{tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-gray-500 hover:text-red-600"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="Adicionar tag..."
              className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cor
          </label>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(colorOption => (
              <button
                key={colorOption.value}
                onClick={() => setColor(colorOption.value)}
                className={`
                  w-10 h-10 rounded-lg border-2 transition-all
                  ${
                    color === colorOption.value
                      ? 'border-blue-600 scale-110'
                      : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                  }
                `}
                style={{ backgroundColor: colorOption.value }}
                title={colorOption.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Ctrl+Enter para salvar
          </span>
          {note && <AutoSaveIndicator status={autoSaveStatus} />}
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !title.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? 'Salvando...' : note ? 'Salvar e Fechar' : 'Criar'}
          </button>
        </div>
      </div>
    </div>
  );
}
