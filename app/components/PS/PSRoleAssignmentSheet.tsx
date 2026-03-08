'use client';

import { UserRound, X } from 'lucide-react';

interface PSRoleAssignmentSheetProps {
  open: boolean;
  roleLabel: string;
  value: string;
  suggestions: string[];
  onChange: (value: string) => void;
  onSave: () => void;
  onClear: () => void;
  onClose: () => void;
}

export default function PSRoleAssignmentSheet({
  open,
  roleLabel,
  value,
  suggestions,
  onChange,
  onSave,
  onClear,
  onClose,
}: PSRoleAssignmentSheetProps) {
  if (!open) return null;

  return (
    <div
      data-testid="ps-role-assignment-sheet"
      className="fixed inset-0 z-[130] flex items-end justify-center bg-black/55 backdrop-blur-sm px-3 pb-3 sm:items-center sm:py-6"
    >
      <div
        className="w-full max-w-md rounded-[30px] overflow-hidden"
        style={{ background: '#0b1220', border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 22px 48px rgba(0,0,0,0.36)' }}
      >
        <div className="flex items-start justify-between gap-3 px-4 py-4 border-b border-white/8">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-cyan-300/75 font-semibold">
              <UserRound className="w-3.5 h-3.5" strokeWidth={2} />
              Atribuição
            </div>
            <h3 className="text-xl text-white font-bold mt-1">{roleLabel}</h3>
            <p className="text-sm text-slate-400 mt-1">Atribua o responsável atual do papel.</p>
          </div>
          <button
            data-testid="ps-role-assignment-close"
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            aria-label="Fechar atribuição de papel"
          >
            <X className="w-4.5 h-4.5" strokeWidth={2} />
          </button>
        </div>

        <div className="px-4 py-4 space-y-4">
          <div className="rounded-2xl p-3 bg-cyan-500/6 border border-cyan-500/14">
            <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200 font-bold">Coordenação rápida</p>
            <p className="text-xs text-slate-300 mt-1">
              Nomeie o papel atual para reduzir ambiguidade no ciclo e no handoff.
            </p>
          </div>

          <div className="rounded-2xl p-3 bg-white/5 border border-white/7">
            <label className="block text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">
              Responsável
            </label>
            <input
              data-testid="ps-role-assignment-input"
              autoFocus
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="Ex.: João, R1, Enf. Ana"
              className="w-full rounded-2xl px-4 py-3 bg-black/10 border border-white/10 text-white placeholder:text-slate-500 outline-none"
            />
            <p className="text-xs text-slate-500 mt-2">
              Deixe em branco para liberar o papel.
            </p>
          </div>

          {suggestions.length > 0 && (
            <div className="rounded-2xl p-3 bg-white/5 border border-white/7">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">
                Recentes
              </p>
              <p className="text-xs text-slate-500 mb-3">
                Reutilize nomes recentes para acelerar a coordenação da sala.
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    data-testid={`ps-role-suggestion-${suggestion}`}
                    key={suggestion}
                    type="button"
                    onClick={() => onChange(suggestion)}
                    className="px-3 py-2 rounded-full text-xs font-semibold text-slate-100 bg-white/6 border border-white/10 active:scale-95 transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              data-testid="ps-role-assignment-clear"
              type="button"
              onClick={onClear}
              className="px-4 py-3 rounded-2xl text-sm font-semibold text-slate-200 active:scale-95 transition-all"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              Limpar
            </button>
            <button
              data-testid="ps-role-assignment-cancel"
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-2xl text-sm font-semibold text-slate-200 active:scale-95 transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              Cancelar
            </button>
            <button
              data-testid="ps-role-assignment-save"
              type="button"
              onClick={onSave}
              className="px-4 py-3 rounded-2xl text-sm font-bold text-slate-950 active:scale-95 transition-all"
              style={{ background: '#22d3ee', border: '1px solid rgba(34,211,238,0.30)' }}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
