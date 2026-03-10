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
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      {(relatedScores.length > 0 || protocol.relatedDrugs.length > 0) && (
        <div className="ps-app-surface rounded-[30px] p-4 md:p-5 space-y-4">
          {relatedScores.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2 ps-app-label">
                <Beaker className="w-3.5 h-3.5 text-cyan-300" strokeWidth={2} />
                Scores relacionados
              </div>
              <div className="flex flex-wrap gap-2">
                {relatedScores.map((score) => (
                  <Link
                    key={score.id}
                    href={`/ps/escalas?score=${score.id}`}
                    className="ps-app-interactive rounded-full border border-cyan-400/18 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-100"
                  >
                    {score.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {protocol.relatedDrugs.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2 ps-app-label">
                <Pill className="w-3.5 h-3.5 text-amber-300" strokeWidth={2} />
                Drogas relacionadas
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {protocol.relatedDrugs.slice(0, 8).map((drugId) => (
                  <button
                    key={drugId}
                    type="button"
                    onClick={() => onOpenDrug(drugId)}
                    data-testid={`ps-related-drug-${drugId}`}
                    aria-label={`Abrir drug sheet ${resolveDrugName(drugId)}`}
                    className="ps-app-interactive flex items-center justify-between rounded-[20px] border border-amber-400/18 bg-amber-500/10 px-3 py-3 text-left text-xs font-semibold text-amber-100"
                  >
                    <span>{resolveDrugName(drugId)}</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-amber-200/80">sheet</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {protocol.references.length > 0 && (
        <div className="ps-app-surface rounded-[30px] p-4 md:p-5 space-y-4">
          <div className="flex items-center gap-2 ps-app-label">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
            Referências
          </div>
          <ol className="space-y-3">
            {protocol.references.map((ref, i) => (
              <li key={`${protocol.id}-${currentStepId}-ref-${i}`} className="rounded-[22px] border border-white/7 bg-white/[0.04] px-4 py-3 apple-transition-fast">
                <p className="text-[12px] text-slate-300 leading-relaxed">{ref.citation}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] text-slate-500">
                  <span>{ref.year}</span>
                  {ref.guideline && <span className="rounded-full border border-white/8 bg-white/[0.04] px-2 py-1">{ref.guideline}</span>}
                  {ref.pmid && <span className="font-mono">PMID {ref.pmid}</span>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
