'use client';

import { useState } from 'react';
import { Download, FileText, FileJson, FileSpreadsheet, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Flashcard } from '@/lib/types/study-mode';
import { ReviewSchedule } from '@/lib/utils/spaced-repetition';
import { 
  exportFlashcardsAsAnki, 
  getAnkiImportInstructions,
  groupFlashcardsByDeck 
} from '@/lib/utils/anki-export';

interface ExportButtonsProps {
  flashcards: Flashcard[];
  schedules?: Record<string, ReviewSchedule>;
}

export default function ExportButtons({ flashcards, schedules }: ExportButtonsProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'txt'>('csv');
  const [exported, setExported] = useState(false);

  const handleExport = (format: 'json' | 'csv' | 'txt') => {
    exportFlashcardsAsAnki(flashcards, schedules, format);
    setExportFormat(format);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  const decks = groupFlashcardsByDeck(flashcards, schedules);
  const deckNames = Object.keys(decks);
  const totalCards = flashcards.length;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Total de Cards: {totalCards}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {deckNames.length} {deckNames.length === 1 ? 'deck' : 'decks'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {deckNames.map(deckName => (
            <span
              key={deckName}
              className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded"
            >
              {deckName.split('::').pop()}: {decks[deckName].length}
            </span>
          ))}
        </div>
      </div>

      {/* Export Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => handleExport('csv')}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-slate-800 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
          title="Exportar como CSV (recomendado para Anki)"
        >
          <FileSpreadsheet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">CSV</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Recomendado</span>
        </button>

        <button
          onClick={() => handleExport('json')}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
          title="Exportar como JSON"
        >
          <FileJson className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">JSON</span>
        </button>

        <button
          onClick={() => handleExport('txt')}
          className="flex flex-col items-center justify-center gap-2 p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
          title="Exportar como texto"
        >
          <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">TXT</span>
        </button>
      </div>

      {/* Success Message */}
      {exported && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm text-emerald-700 dark:text-emerald-300">
            Arquivo {exportFormat.toUpperCase()} exportado com sucesso!
          </span>
        </div>
      )}

      {/* Instructions Toggle */}
      <button
        onClick={() => setShowInstructions(!showInstructions)}
        className="w-full flex items-center justify-center gap-2 p-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
        <span className="text-sm font-medium">
          {showInstructions ? 'Ocultar' : 'Mostrar'} instruções de importação
        </span>
      </button>

      {/* Instructions */}
      {showInstructions && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Como importar no Anki:
          </h3>
          <div className="text-xs text-blue-800 dark:text-blue-200 whitespace-pre-line font-mono">
            {getAnkiImportInstructions(exportFormat)}
          </div>
        </div>
      )}
    </div>
  );
}

