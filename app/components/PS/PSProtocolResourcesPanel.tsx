'use client';

import { BookOpen, Beaker, Pill } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { EmergencyProtocol } from '@/lib/ps/types';
import type { RelatedScore } from '@/lib/ps/contracts';

interface PSProtocolResourcesPanelProps {
  protocol: EmergencyProtocol;
  relatedScores: RelatedScore[];
  currentStepId: string;
  onOpenDrug: (drugId: string) => void;
  resolveDrugName: (drugId: string) => string;
}

export default function PSProtocolResourcesPanel({
  protocol,
  relatedScores,
  currentStepId,
  onOpenDrug,
  resolveDrugName,
}: PSProtocolResourcesPanelProps) {
  return (
    <>
      {relatedScores.length > 0 && (
        <div
          className="rounded-3xl px-4 py-4 space-y-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-2">
            <Beaker className="w-3.5 h-3.5 text-cyan-500" strokeWidth={2} />
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scores relacionados</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {relatedScores.map((score) => (
              <Link
                key={score.id}
                href={`/ps/escalas?score=${score.id}`}
                className="px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-transform"
                style={{ background: 'rgba(34,211,238,0.10)', border: '0.5px solid rgba(34,211,238,0.25)', color: '#67e8f9' }}
              >
                {score.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {protocol.relatedDrugs.length > 0 && (
        <div
          className="rounded-3xl px-4 py-4 space-y-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-2">
            <Pill className="w-3.5 h-3.5 text-amber-500" strokeWidth={2} />
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Drogas relacionadas</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {protocol.relatedDrugs.slice(0, 8).map((drugId) => (
              <button
                key={drugId}
                type="button"
                onClick={() => onOpenDrug(drugId)}
                data-testid={`ps-related-drug-${drugId}`}
                aria-label={`Abrir drug sheet ${resolveDrugName(drugId)}`}
                className="px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-transform"
                style={{ background: 'rgba(245,158,11,0.10)', border: '0.5px solid rgba(245,158,11,0.25)', color: '#fcd34d' }}
              >
                {resolveDrugName(drugId)}
              </button>
            ))}
          </div>
        </div>
      )}

      {protocol.references.length > 0 && (
        <div
          className="rounded-3xl px-4 py-4 space-y-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} />
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Referências</p>
          </div>
          <ol className="space-y-2.5">
            {protocol.references.map((ref, i) => (
              <li key={`${protocol.id}-${currentStepId}-ref-${i}`} className="flex gap-2.5">
                <span className="text-[11px] text-slate-600 font-mono mt-0.5 flex-shrink-0">[{i + 1}]</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-slate-400 leading-relaxed">{ref.citation}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-600">{ref.year}</span>
                    {ref.guideline && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/7 text-slate-500">
                        {ref.guideline}
                      </span>
                    )}
                    {ref.pmid && (
                      <span className="text-[10px] text-slate-600 font-mono">PMID {ref.pmid}</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}
