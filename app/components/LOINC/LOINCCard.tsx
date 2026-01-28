import React from 'react';
import type { LOINCCode } from '@/lib/ontologies/loinc';

interface LOINCCardProps {
  code: LOINCCode;
  onSelect?: (code: LOINCCode) => void;
}

export function LOINCCard({ code, onSelect }: LOINCCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(code)}
      className="w-full text-left rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">LOINC {code.code}</div>
          <div className="text-lg font-semibold text-zinc-900 dark:text-white">
            {code.longCommonName || code.component}
          </div>
          {code.shortName && (
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              Short: {code.shortName}
            </div>
          )}
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {code.system}/{code.scale}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-300">
        <span className="rounded-full border border-zinc-200 dark:border-zinc-700 px-2 py-0.5">
          {code.property}
        </span>
        <span className="rounded-full border border-zinc-200 dark:border-zinc-700 px-2 py-0.5">
          {code.timeAspect}
        </span>
        {code.method && (
          <span className="rounded-full border border-zinc-200 dark:border-zinc-700 px-2 py-0.5">
            {code.method}
          </span>
        )}
      </div>
    </button>
  );
}

export default LOINCCard;
