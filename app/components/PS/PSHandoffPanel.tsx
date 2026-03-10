'use client';

import { useState } from 'react';
import { Clipboard, FileJson, NotebookPen, RefreshCcw, ShieldAlert } from 'lucide-react';
import type { ActiveCaseSession } from '@/lib/store/psStore';
import type { StructuredHandoffField } from '@/lib/ps/contracts';
import type { HandoffImportPreview } from '@/lib/ps/handoffImportValidation';

interface PSHandoffPanelProps {
  activeCaseSession: ActiveCaseSession | null;
  summary: string;
  eventLines: string[];
  reviewedLabels: string[];
  confirmedLabels: string[];
  completedLabels: string[];
  formatLabel: string;
  structuredFields: StructuredHandoffField[];
  importDraft: string;
  importPreview: HandoffImportPreview | null;
  confirmReplace: boolean;
  validationError: string | null;
  onImportDraftChange: (value: string) => void;
  onConfirmReplaceChange: (value: boolean) => void;
  onImportStructured: () => string | null | void;
  onCopy: () => void;
  onCopyStructured: () => void;
  onCopyNote: () => void;
}

export default function PSHandoffPanel({
  activeCaseSession,
  summary,
  eventLines,
  reviewedLabels,
  confirmedLabels,
  completedLabels,
  formatLabel,
  structuredFields,
  importDraft,
  importPreview,
  confirmReplace,
  validationError,
  onImportDraftChange,
  onConfirmReplaceChange,
  onImportStructured,
  onCopy,
  onCopyStructured,
  onCopyNote,
}: PSHandoffPanelProps) {
  const [showImport, setShowImport] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const activeCaseLabel = activeCaseSession
    ? `${activeCaseSession.workflow.toUpperCase()} · ${activeCaseSession.activeStepId ?? 'sem passo ativo'}`
    : 'Sem caso ativo';

  return (
    <section data-testid="ps-handoff-panel" className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="ps-app-surface-strong rounded-[30px] p-5 md:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="ps-app-label">Handoff mode</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">Resumo operacional</h2>
            </div>
            <span className="ps-app-pill">{formatLabel}</span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-[24px] border border-amber-400/18 bg-amber-400/10 px-4 py-4"><p className="ps-app-label text-amber-200">Revisado</p><p className="mt-2 text-2xl font-bold text-white">{reviewedLabels.length}</p></div>
            <div className="rounded-[24px] border border-emerald-400/18 bg-emerald-500/10 px-4 py-4"><p className="ps-app-label text-emerald-200">Confirmado</p><p className="mt-2 text-2xl font-bold text-white">{confirmedLabels.length}</p></div>
            <div className="rounded-[24px] border border-cyan-400/18 bg-cyan-400/10 px-4 py-4"><p className="ps-app-label text-cyan-200">Concluído</p><p className="mt-2 text-2xl font-bold text-white">{completedLabels.length}</p></div>
          </div>

          <div className="mt-5 rounded-[26px] border border-white/8 bg-white/[0.04] px-4 py-4">
            <p className="ps-app-label">Caso ativo</p>
            <p className="mt-2 text-lg font-semibold text-white">{activeCaseLabel}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{summary}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="ps-app-pill">{eventLines.length} evento(s)</span>
            <button type="button" onClick={onCopy} className="ps-app-interactive inline-flex items-center gap-2 rounded-[24px] border border-cyan-400/18 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100"><Clipboard className="h-4 w-4" strokeWidth={2} />Copiar handoff</button>
            <button type="button" onClick={onCopyStructured} className="ps-app-interactive inline-flex items-center gap-2 rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-slate-100"><FileJson className="h-4 w-4" strokeWidth={2} />Copiar estruturado</button>
            <button type="button" onClick={onCopyNote} className="ps-app-interactive inline-flex items-center gap-2 rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-slate-100"><NotebookPen className="h-4 w-4" strokeWidth={2} />Copiar nota clínica</button>
          </div>
        </div>

        <div className="ps-app-surface rounded-[30px] p-5 md:p-6">
          <p className="ps-app-label">Campos estruturados</p>
          <div className="mt-4 space-y-3">
            {structuredFields.map((field, index) => (
              <div key={`${field.label}-${index}`} className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{field.label}</p>
                <p className="mt-2 text-sm text-slate-200">{field.value || '—'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <section className="ps-app-surface rounded-[30px] p-5 md:p-6">
          <p className="ps-app-label">Eventos recentes</p>
          <div className="mt-4 space-y-3">
            {eventLines.map((event, index) => (
              <div key={`${event}-${index}`} className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-slate-200">{event}</div>
            ))}
          </div>
        </section>

        <section className="ps-app-surface rounded-[30px] p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="ps-app-label">Import handoff</p>
            <button
              data-testid="ps-handoff-import-toggle"
              type="button"
              onClick={() => setShowImport(true)}
              className="ps-app-pill"
            >
              Abrir import
            </button>
          </div>

          {showImport && (
            <>
              <textarea
                data-testid="ps-handoff-import-input"
                value={importDraft}
                onChange={(event) => onImportDraftChange(event.target.value)}
                placeholder="Cole aqui o payload estruturado do handoff"
                className="mt-4 h-40 w-full rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />

              {(validationError || submitError) && (
                <div className="mt-4 rounded-[22px] border border-red-400/22 bg-red-500/10 px-4 py-4 text-sm text-red-100">
                  <div className="mb-1 flex items-center gap-2 font-semibold"><ShieldAlert className="h-4 w-4" strokeWidth={2} />Envelope inválido</div>
                  <div data-testid="ps-handoff-import-error">{validationError || submitError}</div>
                </div>
              )}

              {importPreview && (
                <div data-testid="ps-handoff-import-preview" className="mt-4 rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4">
                  <p className="ps-app-label">Preview</p>
                  <p className="mt-2 text-base font-semibold text-white">{importPreview.workflow}</p>
                  <p className="mt-1 text-sm text-slate-400">{importPreview.protocol}</p>
                  <p className="mt-3 text-sm text-slate-200">{importPreview.severity}</p>
                </div>
              )}

              {confirmReplace && (
                <div data-testid="ps-handoff-import-confirmation" className="mt-4 rounded-[22px] border border-cyan-400/18 bg-cyan-400/10 px-4 py-4 text-sm text-cyan-100">
                  Confirmação armada para substituir o caso ativo.
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-3 rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
                  <input type="checkbox" checked={confirmReplace} onChange={(event) => onConfirmReplaceChange(event.target.checked)} className="h-4 w-4" />
                  Confirmo substituir o caso ativo pelo handoff importado.
                </label>

                <button
                  data-testid="ps-handoff-import-submit"
                  type="button"
                  onClick={() => {
                    if (!confirmReplace) {
                      onConfirmReplaceChange(true);
                      setSubmitError(null);
                      return;
                    }
                    const result = onImportStructured();
                    setSubmitError(typeof result === 'string' ? result : null);
                  }}
                  disabled={!importDraft.trim()}
                  className="ps-app-interactive inline-flex items-center gap-2 rounded-[24px] border border-cyan-400/18 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100 disabled:opacity-40"
                >
                  <RefreshCcw className="h-4 w-4" strokeWidth={2} />Importar estruturado
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </section>
  );
}
