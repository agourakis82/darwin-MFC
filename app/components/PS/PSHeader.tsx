'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Link } from '@/i18n/routing';
import { useRouter, usePathname } from '@/i18n/routing';
import { Activity, Weight, RotateCcw, Stethoscope, Search } from 'lucide-react';
import { usePSStore } from '@/lib/store/psStore';
import { allEmergencyDrugs } from '@/lib/ps/data';
import { emergencyProtocols } from '@/lib/ps/protocols';
import { emergencyScores } from '@/lib/ps/scores';

type SearchResultType = 'drogas' | 'protocolos' | 'escalas';

type SearchResult = {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  href: string;
};

export default function PSHeader() {
  const { patient, setPatientWeight, resetPatient, setMode } = usePSStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [weightInput, setWeightInput] = useState(patient.weight?.toString() || '');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleWeightChange = useCallback((value: string) => {
    setWeightInput(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0 && num <= 500) {
      setPatientWeight(num);
    } else if (value === '') {
      setPatientWeight(null);
    }
  }, [setPatientWeight]);

  const handleReset = useCallback(() => {
    resetPatient();
    setWeightInput('');
  }, [resetPatient]);

  const handleSwitchAPS = useCallback(() => {
    const locale = pathname?.split('/').filter(Boolean)[0];
    setMode('aps');
    const target = locale ? `/${locale}` : '/';
    router.push(target);
  }, [setMode, pathname, router]);

  useEffect(() => {
    if (!showSearch) {
      setSearchQuery('');
    }
  }, [showSearch]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes('mac');
      const isModifierPressed = isMac ? event.metaKey : event.ctrlKey;
      if (isModifierPressed && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setShowSearch(true);
        queueMicrotask(() => searchInputRef.current?.focus());
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  const searchResults = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized || normalized.length < 2) return [];

    const matches: SearchResult[] = [];

    const includesQuery = (value: string) => value.toLowerCase().includes(normalized);

    allEmergencyDrugs.forEach((drug) => {
      const haystack = [
        drug.genericName,
        ...drug.tradeName,
        ...drug.keywords,
      ].join(' ');
      if (includesQuery(haystack)) {
        matches.push({
          id: drug.id,
          type: 'drogas',
          title: drug.genericName,
          subtitle: `Droga • ${drug.category}`,
          href: `/ps/drogas/${drug.id}`,
        });
      }
    });

    emergencyProtocols.forEach((protocol) => {
      const haystack = [protocol.name, protocol.shortName, protocol.description, protocol.category].join(' ');
      if (includesQuery(haystack)) {
        matches.push({
          id: protocol.id,
          type: 'protocolos',
          title: protocol.name,
          subtitle: `Protocolo • ${protocol.category}`,
          href: `/ps/protocolos/${protocol.id}`,
        });
      }
    });

    emergencyScores.forEach((score) => {
      const haystack = [
        score.name,
        score.abbreviation,
        score.category,
        ...score.keywords,
        score.description,
      ].join(' ');
      if (includesQuery(haystack)) {
        matches.push({
          id: score.id,
          type: 'escalas',
          title: `${score.name} (${score.abbreviation})`,
          subtitle: `Escala • ${score.category}`,
          href: `/ps/escalas?score=${encodeURIComponent(score.id)}`,
        });
      }
    });

    return matches.slice(0, 24);
  }, [searchQuery]);

  const groupedSearchResults = useMemo(() => {
    const groups: Record<SearchResultType, SearchResult[]> = {
      drogas: [],
      protocolos: [],
      escalas: [],
    };

    for (const item of searchResults) {
      groups[item.type].push(item);
    }

    return groups;
  }, [searchResults]);

  const weightOk = patient.weight && patient.weight >= 2 && patient.weight <= 300;

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(8, 8, 16, 0.85)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        borderBottom: '0.5px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="flex items-center px-3 py-2 gap-2 max-w-5xl mx-auto">
        {/* Logo */}
        <Link href="/ps" className="flex items-center gap-2 flex-shrink-0 active:opacity-70 transition-opacity">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #dc2626 0%, #9f1239 100%)' }}
          >
            <Activity className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-white font-bold text-[13px] tracking-wide">DARWIN</span>
            <span className="text-red-500 font-bold text-[10px] tracking-widest uppercase">Pronto-Socorro</span>
          </div>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Weight Pill */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
            weightOk
              ? 'bg-green-500/12 border border-green-500/25'
              : 'bg-white/6 border border-white/10'
          }`}
        >
          <Weight className={`w-3.5 h-3.5 flex-shrink-0 ${weightOk ? 'text-green-400' : 'text-slate-500'}`} strokeWidth={2} />
          <input
            type="number"
            inputMode="decimal"
            placeholder="kg"
            value={weightInput}
            onChange={(e) => handleWeightChange(e.target.value)}
            className={`w-14 bg-transparent text-sm font-bold font-mono placeholder-slate-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              weightOk ? 'text-green-300' : 'text-white'
            }`}
            min={0.5}
            max={500}
            step={0.1}
          />
          <span className={`text-xs font-semibold ${weightOk ? 'text-green-500' : 'text-slate-600'}`}>kg</span>
          {patient.weight && (
            <button
              onClick={handleReset}
              className="ml-0.5 text-slate-500 hover:text-white active:scale-90 transition-all"
              title="Novo Paciente"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Search */}
        <button
          onClick={() => setShowSearch((v) => !v)}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90 ${
            showSearch ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Search className="w-4.5 h-4.5" strokeWidth={2} />
        </button>

        {/* APS Switch */}
        <button
          onClick={handleSwitchAPS}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-white/6 hover:bg-white/10 border border-white/8 rounded-full text-slate-300 hover:text-white text-[11px] font-semibold tracking-wide transition-all active:scale-95"
        >
          <Stethoscope className="w-3.5 h-3.5" strokeWidth={2} />
          <span className="hidden sm:inline">APS</span>
        </button>
      </div>

      {/* Search Drawer */}
      {showSearch && (
        <div className="px-3 pb-3 max-w-5xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" strokeWidth={2} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar droga, protocolo, escala..."
              autoFocus
              ref={searchInputRef}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500/60"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '0.5px solid rgba(255,255,255,0.12)',
              }}
            />

            {searchQuery && (
              <div
                className="mt-2 rounded-2xl max-h-72 overflow-y-auto"
                style={{
                  background: 'rgba(12,12,24,0.96)',
                  border: '0.5px solid rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {Object.entries(groupedSearchResults).map(([type, items]) => {
                  if (items.length === 0) return null;
                  const titles: Record<SearchResultType, string> = { drogas: 'Drogas', protocolos: 'Protocolos', escalas: 'Escalas' };
                  const colors: Record<SearchResultType, string> = { drogas: 'text-amber-400', protocolos: 'text-red-400', escalas: 'text-cyan-400' };

                  return (
                    <div key={type}>
                      <p className={`text-[10px] font-bold uppercase tracking-widest px-4 pt-3 pb-1 ${colors[type as SearchResultType]}`}>
                        {titles[type as SearchResultType]}
                      </p>
                      {items.map((item) => (
                        <Link
                          key={`${type}-${item.id}`}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 active:bg-white/10 transition-colors"
                          onClick={() => setShowSearch(false)}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-100 font-medium truncate">{item.title}</p>
                            <p className="text-[11px] text-slate-500">{item.subtitle}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  );
                })}
                {searchResults.length === 0 && (
                  <p className="p-4 text-sm text-slate-500">Sem resultados para &ldquo;{searchQuery}&rdquo;</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
