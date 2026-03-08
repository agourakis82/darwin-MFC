'use client';

import { useState } from 'react';
import { Copy, FileText } from 'lucide-react';
import type { ActiveCaseSession } from '@/lib/store/psStore';
import type { StructuredHandoffField } from '@/lib/ps/contracts';
import type { HandoffImportPreview } from '@/lib/ps/handoffImportValidation';

interface PSHandoffPanelProps {
  activeCaseSession: ActiveCaseSession;
  onCopy: () => void;
  onCopyStructured: () => void;
  onCopyNote: () => void;
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
  onImportStructured: (serialized: string) => string | null;
}

export default function PSHandoffPanel({
  activeCaseSession,
  onCopy,
  onCopyStructured,
  onCopyNote,
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
}: PSHandoffPanelProps) {
  const [showImport, setShowImport] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  return (
    <div
      data-testid="ps-handoff-panel"
      className="rounded-[24px] px-4 py-4 space-y-3.5"
      style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-center gap-2">
        <FileText className="w-3.5 h-3.5 text-cyan-400" strokeWidth={2} />
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Handoff</p>
      </div>

      <div className="grid gap-2 md:grid-cols-[minmax(0,1.2fr)_minmax(180px,0.8fr)]">
        <div className="rounded-xl px-3 py-3 bg-cyan-500/8 border border-cyan-500/14">
          <p className="text-[10px] uppercase tracking-wider text-cyan-200 font-bold">Formato</p>
          <p className="text-xs text-cyan-50/90 mt-1">{formatLabel}</p>
        </div>
        <div className="rounded-xl px-3 py-3 bg-white/5 border border-white/7">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Caso ativo</p>
          <p className="text-xs text-slate-100 mt-1">{activeCaseSession.protocolId ?? activeCaseSession.workflow}</p>
          <p className="text-[11px] text-slate-500 mt-1">{activeCaseSession.events.length} evento(s)</p>
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        <div className="rounded-2xl p-3.5 bg-white/5 border border-white/7">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Revisado</p>
          <p className="text-lg font-bold text-amber-200 mt-1">{reviewedLabels.length}</p>
        </div>
        <div className="rounded-2xl p-3.5 bg-white/5 border border-white/7">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Confirmado</p>
          <p className="text-lg font-bold text-green-200 mt-1">{confirmedLabels.length}</p>
        </div>
        <div className="rounded-2xl p-3.5 bg-white/5 border border-white/7">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Concluído</p>
          <p className="text-lg font-bold text-violet-200 mt-1">{completedLabels.length}</p>
        </div>
      </div>

      <div className="rounded-2xl p-3.5 bg-white/5 border border-white/7 space-y-2.5">
        <p className="text-xs text-slate-500 uppercase tracking-wider">Resumo</p>
        <pre className="whitespace-pre-wrap text-[12px] text-slate-200 leading-6 font-sans">
          {summary}
        </pre>
      </div>

      <div className="rounded-2xl p-3.5 bg-white/5 border border-white/7 space-y-2.5">
        <p className="text-xs text-slate-500 uppercase tracking-wider">Campos estruturados</p>
        <div className="grid gap-2">
          {structuredFields.map((field) => (
            <div key={field.label} className="rounded-xl px-3 py-2.5 bg-black/10 border border-white/8">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">{field.label}</p>
              <p className="text-xs text-slate-100 mt-1 leading-relaxed">{field.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-3 bg-white/5 border border-white/7 space-y-2">
        <p className="text-xs text-slate-500 uppercase tracking-wider">Eventos recentes</p>
        <div className="space-y-1.5">
          {eventLines.length > 0 ? eventLines.slice(0, 6).map((line) => (
            <p key={line} className="text-xs text-slate-200">{line}</p>
          )) : <p className="text-xs text-slate-500">Sem eventos recentes.</p>}
        </div>
      </div>

      <div className="rounded-xl p-3 bg-white/5 border border-white/7 space-y-2">
        <p className="text-xs text-slate-500 uppercase tracking-wider">Revisado</p>
        <div className="space-y-1.5">
          {reviewedLabels.length > 0 ? reviewedLabels.slice(0, 4).map((label) => (
            <p key={label} className="text-xs text-slate-200">{label}</p>
          )) : <p className="text-xs text-slate-500">Sem revisões registradas.</p>}
        </div>
      </div>

      <div className="rounded-xl p-3 bg-white/5 border border-white/7 space-y-2">
        <p className="text-xs text-slate-500 uppercase tracking-wider">Confirmado / concluído</p>
        <div className="space-y-1.5">
          {[...confirmedLabels.slice(0, 2), ...completedLabels.slice(0, 2)].length > 0 ? [...confirmedLabels.slice(0, 2), ...completedLabels.slice(0, 2)].map((label) => (
            <p key={label} className="text-xs text-slate-200">{label}</p>
          )) : <p className="text-xs text-slate-500">Sem eventos fortes registrados.</p>}
        </div>
      </div>

      <div className="rounded-xl p-3 bg-white/5 border border-white/7 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Importar handoff</p>
            <p className="text-xs text-slate-400 mt-1">Preview, validação e confirmação antes de substituir o caso ativo.</p>
          </div>
          <button
            data-testid="ps-handoff-import-toggle"
            type="button"
            onClick={() => {
              setShowImport((current) => !current);
              setImportError(null);
              onConfirmReplaceChange(false);
            }}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-cyan-100 active:scale-95 transition-all"
            style={{ background: 'rgba(34,211,238,0.10)', border: '1px solid rgba(34,211,238,0.18)' }}
          >
            {showImport ? 'Ocultar import' : 'Importar handoff'}
          </button>
        </div>

        {showImport && (
          <div className="space-y-3">
            <textarea
              data-testid="ps-handoff-import-input"
              value={importDraft}
              onChange={(event) => {
                onImportDraftChange(event.target.value);
                setImportError(null);
                onConfirmReplaceChange(false);
              }}
              placeholder="Cole aqui o envelope JSON exportado."
              className="w-full min-h-[160px] rounded-2xl px-4 py-3 bg-black/10 border border-white/10 text-slate-100 placeholder:text-slate-500 outline-none"
            />
            {importDraft.trim() && !validationError && (
              <p className="text-[11px] text-cyan-200/80">
                Rascunho salvo nesta sessão.
              </p>
            )}
            {importPreview && (
              <div data-testid="ps-handoff-import-preview" className="rounded-2xl p-3 bg-cyan-500/6 border border-cyan-500/14 space-y-2">
                <p className="text-[10px] uppercase tracking-wider text-cyan-200 font-bold">Preview do envelope</p>
                <div className="grid gap-2 md:grid-cols-2">
                  <p className="text-xs text-slate-200">Workflow: {importPreview.workflow}</p>
                  <p className="text-xs text-slate-200">Schema: {importPreview.schemaName}</p>
                  <p className="text-xs text-slate-200">Protocolo: {importPreview.protocol}</p>
                  <p className="text-xs text-slate-200">Gravidade: {importPreview.severity}</p>
                </div>
                <p className="text-xs text-slate-300">Passo atual: {importPreview.currentStep}</p>
                <p className="text-xs text-slate-300">
                  Pendências: {importPreview.pending.length > 0 ? importPreview.pending.join(', ') : 'nenhuma'}
                </p>
              </div>
            )}
            {(importError || validationError) && (
              <p data-testid="ps-handoff-import-error" className="text-xs text-rose-300">
                {importError ?? validationError}
              </p>
            )}
            {confirmReplace && !importError && importPreview && (
              <div
                data-testid="ps-handoff-import-confirmation"
                className="rounded-2xl p-3 border space-y-2"
                style={{ background: 'rgba(251,191,36,0.10)', borderColor: 'rgba(251,191,36,0.25)' }}
              >
                <p className="text-[10px] uppercase tracking-wider text-amber-200 font-bold">Confirmação necessária</p>
                <p className="text-xs text-amber-50">
                  Confirmar import vai substituir o caso ativo atual por <strong>{importPreview.protocol}</strong>.
                </p>
                <p className="text-xs text-amber-100/90">
                  Workflow: {importPreview.workflow} • Passo: {importPreview.currentStep}
                </p>
              </div>
            )}
            <button
              data-testid="ps-handoff-import-submit"
              type="button"
              onClick={() => {
                if (!confirmReplace) {
                  if (validationError) {
                    setImportError(validationError);
                    return;
                  }
                  onConfirmReplaceChange(true);
                  setImportError(null);
                  return;
                }

                const error = onImportStructured(importDraft);
                if (error) {
                  setImportError(error);
                  onConfirmReplaceChange(false);
                  return;
                }
                setImportError(null);
                onConfirmReplaceChange(false);
                onImportDraftChange('');
                setShowImport(false);
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold text-white active:scale-95 transition-all"
              style={{
                background: importDraft.trim() ? 'rgba(34,211,238,0.12)' : 'rgba(148,163,184,0.10)',
                border: importDraft.trim() ? '1px solid rgba(34,211,238,0.24)' : '1px solid rgba(148,163,184,0.18)',
              }}
            >
              {confirmReplace ? 'Confirmar substituição do caso' : 'Importar para o caso ativo'}
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-2 md:grid-cols-2 pt-1">
        <button
          type="button"
          onClick={onCopy}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold text-white active:scale-95 transition-all"
          style={{ background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.24)' }}
        >
          <Copy className="w-4 h-4" strokeWidth={2} />
          Copiar handoff
        </button>
        <button
          type="button"
          onClick={onCopyStructured}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold text-white active:scale-95 transition-all"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <Copy className="w-4 h-4" strokeWidth={2} />
          Copiar estruturado
        </button>
        <button
          type="button"
          onClick={onCopyNote}
          className="w-full md:col-span-2 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl text-sm font-semibold text-white active:scale-95 transition-all"
          style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.20)' }}
        >
          <Copy className="w-4 h-4" strokeWidth={2} />
          Copiar nota clínica
        </button>
      </div>
    </div>
  );
}
