'use client';

import { useEffect, useMemo, useState } from 'react';
import { Activity, Command, HeartPulse, Search, Sparkles, Weight } from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { allEmergencyDrugs } from '@/lib/ps/data';
import { emergencyProtocols } from '@/lib/ps/protocols';
import { emergencyScores } from '@/lib/ps/scores';
import { usePSStore } from '@/lib/store/psStore';

interface SearchItem {
  id: string;
  label: string;
  href: string;
  kind: 'drug' | 'protocol' | 'score';
}

const SEARCH_ITEMS: SearchItem[] = [
  ...emergencyProtocols.map((item) => ({ id: item.id, label: item.name, href: `/ps/protocolos/${item.id}`, kind: 'protocol' as const })),
  ...allEmergencyDrugs.map((item) => ({ id: item.id, label: item.genericName, href: `/ps/drogas?drug=${item.id}`, kind: 'drug' as const })),
  ...emergencyScores.map((item) => ({ id: item.id, label: item.name, href: `/ps/escalas?score=${item.id}`, kind: 'score' as const })),
];

const KIND_LABEL: Record<SearchItem['kind'], string> = {
  protocol: 'Protocolo',
  drug: 'Droga',
  score: 'Score',
};

export default function PSHeader() {
  const router = useRouter();
  const { patient, activeCaseSession, mode, setMode } = usePSStore();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return SEARCH_ITEMS.slice(0, 8);

    return SEARCH_ITEMS.filter((item) => item.label.toLowerCase().includes(normalized) || KIND_LABEL[item.kind].toLowerCase().includes(normalized)).slice(0, 8);
  }, [query]);

  const weightLabel = patient.verifiedWeightKg
    ? `${patient.verifiedWeightKg} kg`
    : patient.estimatedWeightKg
      ? `~${patient.estimatedWeightKg} kg`
      : patient.idealWeight && patient.useIdealWeight
        ? `${patient.idealWeight} kg ideal`
        : 'Peso indefinido';

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[linear-gradient(180deg,rgba(7,15,27,0.96),rgba(6,16,29,0.82))] backdrop-blur-3xl shadow-[0_14px_48px_rgba(0,0,0,0.22)]">
        <div className="mx-auto flex max-w-[1520px] items-center gap-3 px-4 py-3 md:px-6 xl:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[20px] border border-cyan-400/18 bg-cyan-400/12 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
              <HeartPulse className="h-5 w-5 text-cyan-200" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-300/70">Darwin ER</p>
              <p className="truncate text-sm font-semibold text-white md:text-[15px]">Acute care app shell</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="hidden flex-1 items-center gap-3 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.04))] px-4 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_30px_rgba(0,0,0,0.16)] apple-transition-fast hover:bg-white/[0.09] md:flex"
          >
            <Search className="h-4 w-4 text-slate-400" strokeWidth={2} />
            <span className="flex-1 text-sm text-slate-400">Buscar droga, protocolo ou score</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-2 py-1 text-[11px] font-semibold text-slate-300">
              <Command className="h-3 w-3" strokeWidth={2} />K
            </span>
          </button>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <div className="hidden items-center gap-2 rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-3 py-2 md:flex">
              <Weight className="h-4 w-4 text-amber-300" strokeWidth={2} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Peso</p>
                <p className="text-xs font-semibold text-slate-100">{weightLabel}</p>
              </div>
            </div>

            {activeCaseSession && (
              <div className="hidden items-center gap-2 rounded-[20px] border border-cyan-400/18 bg-[linear-gradient(180deg,rgba(34,211,238,0.16),rgba(34,211,238,0.08))] px-3 py-2 lg:flex">
                <Activity className="h-4 w-4 text-cyan-200" strokeWidth={2} />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300/70">Caso ativo</p>
                  <p className="text-xs font-semibold text-cyan-50">{activeCaseSession.workflow.toUpperCase()}</p>
                </div>
              </div>
            )}

            <div className="flex items-center rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              {(['ps', 'aps'] as const).map((currentMode) => (
                <button
                  key={currentMode}
                  type="button"
                  onClick={() => setMode(currentMode)}
                  className={`rounded-2xl px-3 py-2 text-xs font-semibold apple-transition-fast ${mode === currentMode ? 'bg-white text-slate-950 shadow-[0_8px_24px_rgba(0,0,0,0.16)]' : 'text-slate-300 hover:text-white'}`}
                >
                  {currentMode.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-[#02060d]/70 px-4 py-6 backdrop-blur-xl md:px-6">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-[#081221]/96 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
              <Search className="h-4 w-4 text-slate-400" strokeWidth={2} />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Digite droga, protocolo ou score"
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300 apple-transition-fast hover:bg-white/[0.08]"
              >
                Fechar
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-3">
              <div className="mb-2 flex items-center justify-between px-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">Command surface</p>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] font-semibold text-slate-400">
                  <Sparkles className="h-3 w-3" strokeWidth={2} />
                  {searchResults.length} resultados
                </span>
              </div>

              <div className="space-y-2">
                {searchResults.map((item) => (
                  <button
                    key={`${item.kind}-${item.id}`}
                    type="button"
                    onClick={() => {
                      router.push(item.href);
                      setOpen(false);
                      setQuery('');
                    }}
                    className="flex w-full items-center justify-between rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-3 text-left apple-transition-fast hover:bg-white/[0.07]"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{KIND_LABEL[item.kind]}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] font-semibold text-slate-400">abrir</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
