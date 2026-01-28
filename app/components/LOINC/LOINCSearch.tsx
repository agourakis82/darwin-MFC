'use client';

import React, { useMemo, useState } from 'react';
import { Search, Clipboard, Check } from 'lucide-react';
import { searchLOINCByName, type LOINCCode } from '@/lib/ontologies/loinc';
import { LOINCCard } from './LOINCCard';

interface LOINCSearchProps {
  placeholder?: string;
  onSelect?: (code: LOINCCode) => void;
}

export function LOINCSearch({ placeholder = 'Search LOINC tests...', onSelect }: LOINCSearchProps) {
  const [query, setQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchLOINCByName(query).slice(0, 12);
  }, [query]);

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1500);
    } catch {
      setCopiedCode(null);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {query.trim().length === 0 ? (
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Type a test name, synonym, or LOINC code.
        </p>
      ) : (
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          {results.length} result{results.length === 1 ? '' : 's'}
        </p>
      )}

      <div className="mt-4 grid gap-3">
        {results.map((code) => (
          <div key={code.code} className="relative">
            <LOINCCard code={code} onSelect={onSelect} />
            <button
              type="button"
              onClick={() => copyCode(code.code)}
              className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 px-2 py-1 text-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
              aria-label={`Copy LOINC code ${code.code}`}
            >
              {copiedCode === code.code ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Clipboard className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LOINCSearch;
