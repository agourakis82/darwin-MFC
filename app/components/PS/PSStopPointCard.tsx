'use client';

import { AlertTriangle, ArrowRight } from 'lucide-react';

interface PSStopPointCardProps {
  title: string;
  description: string;
  items: string[];
  actionLabel: string;
  onContinue: () => void;
}

export default function PSStopPointCard({
  title,
  description,
  items,
  actionLabel,
  onContinue,
}: PSStopPointCardProps) {
  if (items.length === 0) return null;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(245,158,11,0.08)',
        border: '1px solid rgba(245,158,11,0.22)',
      }}
    >
      <div className="px-4 py-3 border-b border-amber-500/15">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-amber-300 font-bold">
          <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2} />
          Stop point
        </div>
        <h3 className="text-base text-white font-bold mt-2">{title}</h3>
        <p className="text-sm text-amber-50/85 mt-1">{description}</p>
      </div>

      <div className="px-4 py-4 space-y-2">
        <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200/75 font-semibold">Itens obrigatórios</p>
        {items.map((item, index) => (
          <div
            key={item}
            className="px-3 py-2.5 rounded-xl text-sm text-slate-100 bg-black/10 border border-white/8 flex items-start gap-3"
          >
            <span className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/20 text-[11px] font-bold text-amber-100 flex items-center justify-center flex-shrink-0">
              {index + 1}
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={onContinue}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold text-slate-950 active:scale-95 transition-all"
          style={{ background: '#f59e0b', border: '1px solid rgba(245,158,11,0.32)' }}
        >
          {actionLabel}
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
