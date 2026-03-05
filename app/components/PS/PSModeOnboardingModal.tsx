'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { usePSStore } from '@/lib/store/psStore';
import { locales } from '@/i18n/config';

const MODE_SELECTION_KEY = 'darwin-mode-selection';

export default function PSModeOnboardingModal() {
  const router = useRouter();
  const pathname = usePathname();
  const { mode, setMode } = usePSStore();
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  const localePrefix = useMemo(() => {
    const normalized = pathname ? pathname.split('?')[0] : '';
    const parts = normalized.split('/').filter(Boolean);
    const first = parts[0];
    if (first && locales.includes(first as (typeof locales)[number])) {
      return first;
    }
    return null;
  }, [pathname]);

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;
    const isModeSelected = localStorage.getItem(MODE_SELECTION_KEY);
    if (!isModeSelected) {
      setShow(true);
    }
  }, [pathname]);

  const completeSelection = useCallback(
    (nextMode: 'ps' | 'aps') => {
      setMode(nextMode);

      if (!localePrefix) {
        if (nextMode === 'ps') {
          router.replace('/ps');
        } else {
          router.replace('/');
        }
        setShow(false);
        return;
      }

      if (nextMode === 'ps') {
        router.replace(`/${localePrefix}/ps`);
      } else {
        router.replace(`/${localePrefix}`);
      }

      setShow(false);
    },
    [localePrefix, router, setMode]
  );

  if (!mounted || !show) {
    return null;
  }

  const activeModeLabel = mode === 'ps' ? 'Pronto-Socorro' : 'APS';

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 text-white p-5 sm:p-6 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Darwin Medical Hub</p>
        <h2 className="mt-1 text-xl sm:text-2xl font-bold">Escolha o modo inicial</h2>
        <p className="mt-2 text-sm text-slate-300">
          Selecione como deseja usar o app nesta sessão. Você pode trocar depois pelo cabeçalho.
        </p>

        <div className="mt-5 space-y-3">
          <button
            onClick={() => completeSelection('aps')}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-left hover:bg-slate-800"
          >
            <p className="font-semibold">Modo APS</p>
            <p className="text-sm text-slate-400">Fluxo habitual da plataforma (consultas, doenças e protocolos APS)</p>
          </button>
          <button
            onClick={() => completeSelection('ps')}
            className="w-full rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-left hover:bg-red-500/15"
          >
            <p className="font-semibold text-red-200">Modo Pronto-Socorro</p>
            <p className="text-sm text-slate-300">Painel de guerra para situações críticas, protocolos e doses</p>
          </button>
        </div>

        <p className="mt-4 text-xs text-slate-500">Modo atual salvo: {activeModeLabel}</p>
      </div>
    </div>
  );
}
