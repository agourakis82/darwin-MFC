'use client';

import React, { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Protocolo } from '@/lib/types/protocolo';
import FlowchartEngine from '@/app/components/Flowchart/FlowchartEngine';
import { useLocalizedProtocol } from '@/app/hooks/useLocalizedProtocol';
import { Button } from '@/lib/design-system/primitives/button';
import { Card } from '@/lib/design-system/primitives/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/lib/design-system/primitives/dialog';
import {
  AlertTriangle,
  ArrowLeft,
  Info,
  PlayCircle,
} from 'lucide-react';

interface FlowchartClientProps {
  protocolo: Protocolo;
}

export default function FlowchartClient({ protocolo }: FlowchartClientProps) {
  const t = useTranslations('flowchart');
  const commonT = useTranslations('common');
  const localizedProtocol = useLocalizedProtocol(protocolo);
  const [infoOpen, setInfoOpen] = useState(false);

  const subtitle = useMemo(() => {
    const version = localizedProtocol.versao ? `v${localizedProtocol.versao}` : '';
    return [localizedProtocol.categoria, version].filter(Boolean).join(' • ');
  }, [localizedProtocol.categoria, localizedProtocol.versao]);

  const codes = useMemo(() => {
    const ciap = localizedProtocol.ciap2 ?? [];
    const cid = localizedProtocol.cid10 ?? [];
    return { ciap, cid };
  }, [localizedProtocol.ciap2, localizedProtocol.cid10]);

  return (
    <div className="min-h-screen bg-phosphate dark:bg-carbon-950 flex flex-col">
      <header className="sticky top-0 z-[100] header-darwin">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/protocolos"
              className="p-2 rounded-xl hover:bg-carbon-100 dark:hover:bg-carbon-900/40 transition-colors"
              aria-label={t('backToProtocols')}
              title={t('backToProtocols')}
            >
              <ArrowLeft className="w-5 h-5 text-carbon-700 dark:text-carbon-200" />
            </Link>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-carbon-500 dark:text-carbon-400 truncate">
                {subtitle}
              </div>
              <div className="text-sm sm:text-base font-bold text-carbon-900 dark:text-white truncate">
                {localizedProtocol.titulo}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              rounded="lg"
              className="hidden sm:inline-flex"
              title="Executar (modo guiado)"
            >
              <Link href={`/protocolos/flowchart/${encodeURIComponent(protocolo.id)}/guided`}>
                <PlayCircle className="w-4 h-4" />
                Executar
              </Link>
            </Button>
            <Button
              asChild
              size="icon"
              rounded="lg"
              className="sm:hidden"
              title="Executar (modo guiado)"
              aria-label="Executar (modo guiado)"
            >
              <Link href={`/protocolos/flowchart/${encodeURIComponent(protocolo.id)}/guided`}>
                <PlayCircle className="w-5 h-5" />
              </Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              rounded="lg"
              onClick={() => setInfoOpen(true)}
              aria-label={t('showInfo')}
              title={t('showInfo')}
            >
              <Info className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Red Flags Banner - Always visible if present */}
      {localizedProtocol.sinaisAlerta && localizedProtocol.sinaisAlerta.length > 0 && (
        <div className="bg-critical-red-600 text-white px-4 py-3">
          <div className="flex items-center gap-3 max-w-7xl mx-auto">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <div className="flex-1 flex items-center gap-4 overflow-x-auto">
              <span className="font-bold whitespace-nowrap">SINAIS DE ALERTA:</span>
              {localizedProtocol.sinaisAlerta.map((s, i) => (
                <span key={i} className="text-base whitespace-nowrap">{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 relative overflow-hidden">
        <FlowchartEngine
          nodes={localizedProtocol.nodes}
          edges={localizedProtocol.edges}
          viewerOnly
          className="h-full"
        />
      </main>

      {/* Protocol info (secondary surface) */}
      <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
        <DialogContent
          variant="glass"
          size="3xl"
          className="p-0 overflow-hidden"
          data-testid="flowchart-info-dialog"
        >
          <div className="px-5 py-4 border-b border-carbon-200/70 dark:border-carbon-800/70">
            <DialogHeader>
              <DialogTitle>{localizedProtocol.titulo}</DialogTitle>
            </DialogHeader>
            <div className="mt-1 text-xs text-carbon-500 dark:text-carbon-400">
              {subtitle}
            </div>
          </div>

          <div className="p-5 space-y-4">
            <Card variant="default" padding="lg">
              <div className="text-xs font-bold uppercase tracking-wider text-carbon-500 dark:text-carbon-400 mb-2">
                {t('sections.description')}
              </div>
              <p className="text-sm text-carbon-800 dark:text-carbon-200 leading-relaxed">
                {localizedProtocol.descricao}
              </p>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card variant="default" padding="lg">
                <div className="text-xs font-bold uppercase tracking-wider text-carbon-500 dark:text-carbon-400 mb-2">
                  {t('sections.objectives')}
                </div>
                <ul className="space-y-2">
                  {localizedProtocol.objetivos.map((obj, i) => (
                    <li key={i} className="flex gap-3 text-sm text-carbon-800 dark:text-carbon-200">
                      <span className="mt-2 w-2 h-2 rounded-full bg-brand-primary-500 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card variant="default" padding="lg">
                <div className="text-xs font-bold uppercase tracking-wider text-carbon-500 dark:text-carbon-400 mb-2">
                  {t('sections.targetPopulation')}
                </div>
                <p className="text-sm text-carbon-800 dark:text-carbon-200 leading-relaxed">
                  {localizedProtocol.populacaoAlvo}
                </p>
              </Card>
            </div>

            {(codes.ciap.length > 0 || codes.cid.length > 0) ? (
              <Card variant="default" padding="lg">
                <div className="text-xs font-bold uppercase tracking-wider text-carbon-500 dark:text-carbon-400 mb-2">
                  {t('sections.codes')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {codes.ciap.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1.5 rounded-full text-[12px] font-semibold bg-carbon-200/60 text-carbon-800 dark:bg-carbon-800/60 dark:text-carbon-200"
                    >
                      CIAP: {c}
                    </span>
                  ))}
                  {codes.cid.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1.5 rounded-full text-[12px] font-semibold bg-brand-primary-100 dark:bg-brand-primary-900/30 text-brand-primary-700 dark:text-brand-primary-300"
                    >
                      CID: {c}
                    </span>
                  ))}
                </div>
              </Card>
            ) : null}

            {localizedProtocol.sinaisAlerta?.length ? (
              <Card variant="criticalAlert" padding="lg">
                <div className="text-xs font-bold uppercase tracking-wider text-carbon-600 dark:text-carbon-300 mb-2">
                  {t('sections.warningSignals')}
                </div>
                <ul className="space-y-2">
                  {localizedProtocol.sinaisAlerta.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm text-carbon-900 dark:text-carbon-100">
                      <AlertTriangle className="w-4 h-4 text-critical-red-600 mt-0.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ) : null}

            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                variant="outline"
                type="button"
                onClick={() => setInfoOpen(false)}
              >
                {commonT('cancel')}
              </Button>
              <Button
                asChild
              >
                <Link href={`/protocolos/flowchart/${encodeURIComponent(protocolo.id)}/guided`}>
                  <PlayCircle className="w-4 h-4" />
                  Executar (guiado)
                </Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
