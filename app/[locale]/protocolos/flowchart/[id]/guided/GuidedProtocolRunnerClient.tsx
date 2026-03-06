'use client';

import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { Protocolo } from '@/lib/types/protocolo';
import { useLocalizedProtocol } from '@/app/hooks/useLocalizedProtocol';
import {
  canGoBack,
  chooseOption,
  createInitialRunnerState,
  getEdgeById,
  getNextOptions,
  getNodeById,
  jumpToNode,
  resetRunner,
  sanitizeRunnerState,
  type ProtocolRunnerState,
} from '@/lib/protocolos/protocol-runner';
import { cn } from '@/lib/utils';
import { Button } from '@/lib/design-system/primitives/button';
import { Card } from '@/lib/design-system/primitives/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/lib/design-system/primitives/dialog';
import {
  ArrowLeft,
  AlertTriangle,
  BookOpen,
  Copy,
  Map,
  RotateCcw,
  ChevronLeft,
  ArrowRight,
  ListTree,
  CheckCircle2,
} from 'lucide-react';

const FlowchartEngine = dynamic(() => import('@/app/components/Flowchart/FlowchartEngine'), {
  ssr: false,
  loading: () => (
    <div className="p-8 text-sm text-carbon-600 dark:text-carbon-400">
      Carregando mapa…
    </div>
  ),
});

const STORAGE_PREFIX = 'darwin:protocol-runner:';

function isEditableTarget(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || target.isContentEditable;
}

function getNodeTypeBadge(nodeType: string) {
  switch (nodeType) {
    case 'start':
      return { label: 'INICIO', className: 'bg-adenine-teal/10 text-adenine-teal dark:text-cytosine-cyan' };
    case 'end':
      return { label: 'FIM', className: 'bg-carbon-200/60 text-carbon-700 dark:bg-carbon-800/60 dark:text-carbon-200' };
    case 'decision':
      return { label: 'DECISAO', className: 'bg-thymine-gold/10 text-thymine-gold' };
    case 'action':
      return { label: 'ACAO', className: 'bg-cytosine-cyan/10 text-adenine-teal dark:text-cytosine-cyan' };
    case 'assessment':
      return { label: 'AVALIACAO', className: 'bg-carbon-200/50 text-carbon-700 dark:bg-carbon-800/50 dark:text-carbon-200' };
    case 'treatment':
      return { label: 'TRATAMENTO', className: 'bg-guanine-green/10 text-guanine-green' };
    case 'referral':
      return { label: 'ENCAMINHAR', className: 'bg-carbon-200/50 text-carbon-700 dark:bg-carbon-800/50 dark:text-carbon-200' };
    case 'alert':
      return { label: 'ALERTA', className: 'bg-critical-red-500/10 text-critical-red-600 dark:text-critical-red-400' };
    default:
      return { label: 'INFO', className: 'bg-carbon-200/50 text-carbon-700 dark:bg-carbon-800/50 dark:text-carbon-200' };
  }
}

function buildSummary(protocol: Protocolo, state: ProtocolRunnerState): string {
  const lines: string[] = [];
  lines.push(protocol.titulo);
  lines.push('');
  for (let i = 0; i < state.history.length; i++) {
    const entry = state.history[i];
    const node = getNodeById(protocol, entry.nodeId);
    const label = String(node?.data?.label ?? entry.nodeId);
    if (i === 0) {
      lines.push(`1. ${label}`);
      continue;
    }
    const edge = entry.viaEdgeId ? getEdgeById(protocol, entry.viaEdgeId) : null;
    const edgeLabel = typeof (edge as any)?.label === 'string' ? String((edge as any).label).trim() : '';
    const prefix = edgeLabel ? `(${edgeLabel}) ` : '';
    lines.push(`${i + 1}. ${prefix}${label}`);
  }
  return lines.join('\n');
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback: best-effort
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', 'true');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export default function GuidedProtocolRunnerClient({ protocolo }: { protocolo: Protocolo }) {
  const commonT = useTranslations('common');
  const p = useLocalizedProtocol(protocolo);

  const storageKey = useMemo(() => `${STORAGE_PREFIX}${p.id}`, [p.id]);

  const [state, setState] = useState<ProtocolRunnerState>(() => {
    if (typeof window === 'undefined') return createInitialRunnerState(p);
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (!raw) return createInitialRunnerState(p);
      const parsed = JSON.parse(raw) as ProtocolRunnerState;
      return sanitizeRunnerState(p, parsed);
    } catch {
      return createInitialRunnerState(p);
    }
  });

  // Persist session state
  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Ignore quota/private mode errors.
    }
  }, [storageKey, state]);

  // Ensure we don't get stuck if protocol localization changes node IDs (shouldn't).
  useEffect(() => {
    setState((prev) => sanitizeRunnerState(p, prev));
  }, [p]);

  const activeNode = useMemo(() => getNodeById(p, state.activeNodeId), [p, state.activeNodeId]);
  const nextOptions = useMemo(() => getNextOptions(p, state.activeNodeId), [p, state.activeNodeId]);

  const [mapOpen, setMapOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [redFlagsOpen, setRedFlagsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const headerTitle = activeNode?.data?.label ? String(activeNode.data.label) : p.titulo;
  const hasRedFlags = Boolean(p.sinaisAlerta && p.sinaisAlerta.length > 0);

  const activeData = (activeNode?.data ?? {}) as any;
  const hasNodeLearnContent = Boolean(
    activeData?.details?.length ||
      activeData?.criteria?.length ||
      activeData?.medications?.length ||
      activeData?.exams?.length ||
      activeData?.referTo ||
      activeData?.calculadoras?.length
  );
  const hasProtocolLearnContent = Boolean(
    p.descricao ||
      (p.objetivos && p.objetivos.length > 0) ||
      p.populacaoAlvo ||
      (p.ciap2 && p.ciap2.length > 0) ||
      (p.cid10 && p.cid10.length > 0) ||
      (p.criteriosInclusao && p.criteriosInclusao.length > 0) ||
      (p.criteriosExclusao && p.criteriosExclusao.length > 0) ||
      (p.referencias && p.referencias.length > 0)
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isEditableTarget(e.target)) return;

      // Esc closes the secondary surface (Map/Track).
      if (e.key === 'Escape') {
        if (mapOpen) setMapOpen(false);
        if (trackOpen) setTrackOpen(false);
        if (learnOpen) setLearnOpen(false);
        if (redFlagsOpen) setRedFlagsOpen(false);
        return;
      }

      // Left arrow = back (runner gesture)
      if (e.key === 'ArrowLeft') {
        if (!canGoBack(state)) return;
        e.preventDefault();
        setState((s) => goBackSafe(p, s));
        return;
      }

      // M = Map
      if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setMapOpen((v) => !v);
        return;
      }

      // L = Learn/details
      if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setLearnOpen((v) => !v);
        return;
      }

      // R = Reset (confirm)
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        const ok = window.confirm('Reiniciar este protocolo?');
        if (!ok) return;
        setState(resetRunner(p));
        return;
      }

      // 1..9 chooses option
      if (/^[1-9]$/.test(e.key)) {
        const idx = Number(e.key) - 1;
        const opt = nextOptions[idx];
        if (!opt) return;
        e.preventDefault();
        setState((s) => chooseOption(p, s, opt));
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mapOpen, trackOpen, learnOpen, redFlagsOpen, nextOptions, p, state]);

  function goBackSafe(protocol: Protocolo, s: ProtocolRunnerState): ProtocolRunnerState {
    const next = canGoBack(s) ? { ...s, history: s.history.slice(0, -1) } : s;
    const active = next.history[next.history.length - 1]?.nodeId ?? s.activeNodeId;
    return { ...next, activeNodeId: active };
  }

  const badge = getNodeTypeBadge(String(activeNode?.data?.nodeType ?? 'info'));

  const title = p.titulo;
  const subtitle = `${p.categoria} • v${p.versao}`;

  const handleReset = () => {
    const ok = window.confirm('Reiniciar este protocolo?');
    if (!ok) return;
    setState(resetRunner(p));
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(buildSummary(p, state));
    setCopied(ok);
    if (ok) setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="min-h-screen bg-phosphate dark:bg-carbon-950" data-testid="protocol-runner">
      <header className="sticky top-0 z-[100]">
        <div className="header-darwin">
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Link
                href="/protocolos"
                data-testid="runner-back-link"
                className="p-2 rounded-xl hover:bg-carbon-100 dark:hover:bg-carbon-900/40 transition-colors"
                aria-label={commonT('back')}
              >
                <ArrowLeft className="w-5 h-5 text-carbon-700 dark:text-carbon-200" />
              </Link>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-carbon-500 dark:text-carbon-400 truncate">
                  {title}
                </div>
                <div className="text-sm font-bold text-carbon-900 dark:text-white truncate">
                  {headerTitle}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                data-testid="runner-back-step"
                aria-label="Voltar um passo"
                title="Voltar um passo"
                onClick={() => setState((s) => goBackSafe(p, s))}
                disabled={!canGoBack(state)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-testid="runner-open-learn"
                aria-label="Detalhes e evidências"
                onClick={() => setLearnOpen(true)}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Detalhes</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-testid="runner-open-track"
                aria-label="Track de decisão"
                onClick={() => setTrackOpen(true)}
              >
                <ListTree className="w-4 h-4" />
                <span className="hidden sm:inline">Track</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-testid="runner-open-map"
                aria-label="Mapa do protocolo"
                onClick={() => setMapOpen(true)}
              >
                <Map className="w-4 h-4" />
                <span className="hidden sm:inline">Mapa</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-testid="runner-copy-summary"
                aria-label="Copiar resumo"
                onClick={handleCopy}
              >
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar'}</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                data-testid="runner-reset"
                onClick={handleReset}
                title="Reiniciar"
                aria-label="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Red flags: always visible, collapsible on mobile */}
        {hasRedFlags ? (
          <div className="bg-critical-red-600 text-white border-b border-critical-red-700/40">
            <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-extrabold tracking-wide uppercase">
                    Sinais de alerta
                  </span>
                  <button
                    type="button"
                    className="sm:hidden px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    onClick={() => setRedFlagsOpen(true)}
                  >
                    Ver
                  </button>
                </div>
                <div className="hidden sm:flex items-center gap-4 overflow-x-auto no-scrollbar">
                  {p.sinaisAlerta!.map((s, i) => (
                    <span key={i} className="text-sm whitespace-nowrap">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid gap-6 lg:grid-cols-[320px,1fr]">
        {/* Screen reader: announce step transitions */}
        <div className="sr-only" aria-live="polite">
          {`Etapa ${Math.max(state.history.length, 1)}: ${headerTitle}`}
        </div>
        {/* Decision Track (desktop) */}
        <aside className="hidden lg:block">
          <Card variant="glass" padding="md" className="sticky top-24">
            <div className="text-xs font-semibold text-carbon-500 dark:text-carbon-400 mb-3">
              Track de decisão
            </div>
            <ol className="space-y-1">
              {state.history.map((h, idx) => {
                const node = getNodeById(p, h.nodeId);
                const label = String(node?.data?.label ?? h.nodeId);
                const edge = idx > 0 && h.viaEdgeId ? getEdgeById(p, h.viaEdgeId) : null;
                const edgeLabel = typeof (edge as any)?.label === 'string' ? String((edge as any).label).trim() : '';
                const isActive = h.nodeId === state.activeNodeId;
                return (
                  <li key={`${h.nodeId}:${idx}`}>
                    <button
                      type="button"
                      onClick={() => setState((s) => jumpToNode(s, h.nodeId))}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-xl transition-colors',
                        isActive
                          ? 'bg-adenine-teal/10 text-adenine-teal dark:text-cytosine-cyan'
                          : 'hover:bg-carbon-100 dark:hover:bg-carbon-900/40 text-carbon-800 dark:text-carbon-200'
                      )}
                    >
                      <div className="text-xs text-carbon-500 dark:text-carbon-400">
                        {idx + 1}
                      </div>
                      {idx > 0 && edgeLabel ? (
                        <div className="text-xs text-carbon-600 dark:text-carbon-400 line-clamp-1">
                          ↳ {edgeLabel}
                        </div>
                      ) : null}
                      <div className="text-sm font-semibold line-clamp-2">
                        {label}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Card>
        </aside>

        {/* Current Step */}
        <section className="space-y-4">
          <Card variant="glass" padding="lg" className="relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider', badge.className)}>
                  {badge.label}
                </div>
                <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-carbon-900 dark:text-white tracking-tight">
                  {String(activeNode?.data?.label ?? title)}
                </h1>
                {activeNode?.data?.description && (
                  <p className="mt-2 text-base text-carbon-700 dark:text-carbon-300 leading-relaxed">
                    {String(activeNode.data.description)}
                  </p>
                )}
                <div className="mt-3 text-xs text-carbon-500 dark:text-carbon-400">
                  {subtitle}
                </div>
                {(activeNode?.data as any)?.ciap2 || (activeNode?.data as any)?.cid10 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(activeNode?.data as any)?.ciap2 ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-carbon-200/60 text-carbon-800 dark:bg-carbon-800/60 dark:text-carbon-200">
                        CIAP: {(activeNode!.data as any).ciap2}
                      </span>
                    ) : null}
                    {(activeNode?.data as any)?.cid10 ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-adenine-teal/10 text-adenine-teal dark:text-cytosine-cyan">
                        CID: {(activeNode!.data as any).cid10}
                      </span>
                    ) : null}
                  </div>
                ) : null}

                {(hasNodeLearnContent || hasProtocolLearnContent) ? (
                  <div className="mt-5 flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setLearnOpen(true)}
                      iconBefore={<BookOpen className="w-4 h-4" />}
                    >
                      Abrir detalhes
                    </Button>
                    <span className="text-xs text-carbon-600 dark:text-carbon-400 line-clamp-1">
                      Critérios, exames, medicamentos e racional ficam em Detalhes.
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </Card>

          {/* Options */}
          <Card variant="default" padding="lg">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm font-semibold text-carbon-800 dark:text-carbon-100">
                Próximo passo
              </div>
              <div className="text-xs text-carbon-500 dark:text-carbon-400">
                Atalhos: 1-9, L (detalhes), M (mapa), R (reset), ← (voltar)
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {nextOptions.length === 0 ? (
                <div className="rounded-2xl border border-carbon-200 dark:border-carbon-800 bg-carbon-50 dark:bg-carbon-900 p-5 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-guanine-green mt-0.5" />
                  <div>
                    <div className="font-semibold text-carbon-900 dark:text-white">
                      Protocolo concluído
                    </div>
                    <div className="text-sm text-carbon-600 dark:text-carbon-400">
                      Você chegou ao fim deste caminho. Copie o resumo ou recomece.
                    </div>
                  </div>
                </div>
              ) : nextOptions.length === 1 ? (
                <Button
                  type="button"
                  variant="default"
                  size="lg"
                  fullWidth
                  data-testid="runner-continue"
                  onClick={() => setState((s) => chooseOption(p, s, nextOptions[0]))}
                  iconAfter={<ArrowRight className="w-5 h-5" />}
                >
                  Continuar
                </Button>
              ) : (
                nextOptions.map((opt, idx) => (
                  <button
                    key={opt.edgeId}
                    type="button"
                    data-testid={`runner-option-${idx}`}
                    onClick={() => setState((s) => chooseOption(p, s, opt))}
                    className="w-full text-left rounded-2xl border border-carbon-200 dark:border-carbon-800 bg-white dark:bg-carbon-900 px-4 py-3 hover:bg-carbon-50 dark:hover:bg-carbon-800/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-xs text-carbon-500 dark:text-carbon-400">
                          {idx + 1}
                        </div>
                        <div className="text-base font-semibold text-carbon-900 dark:text-white">
                          {opt.label || 'Escolher'}
                        </div>
                        {opt.targetLabel && (
                          <div className="text-sm text-carbon-600 dark:text-carbon-400 line-clamp-1">
                            {opt.targetLabel}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-carbon-400" />
                    </div>
                  </button>
                ))
              )}
            </div>
          </Card>
        </section>
      </main>

      {/* Learn/details overlay (progressive disclosure) */}
      <Dialog open={learnOpen} onOpenChange={setLearnOpen}>
        <DialogContent
          variant="glass"
          size="4xl"
          className="p-0 overflow-hidden"
          data-testid="runner-learn-dialog"
        >
          <div className="px-5 py-4 border-b border-carbon-200/70 dark:border-carbon-800/70">
            <DialogHeader>
              <DialogTitle>Detalhes</DialogTitle>
              <DialogDescription>
                {p.titulo} • {subtitle}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopy}
                iconBefore={<Copy className="w-4 h-4" />}
              >
                {copied ? 'Copiado' : 'Copiar resumo'}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMapOpen(true)}
                iconBefore={<Map className="w-4 h-4" />}
              >
                Abrir mapa
              </Button>
              {hasRedFlags ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRedFlagsOpen(true)}
                  iconBefore={<AlertTriangle className="w-4 h-4" />}
                >
                  Sinais de alerta
                </Button>
              ) : null}
            </div>
          </div>

          <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            <Card variant="default" padding="lg">
              <div className="text-xs font-bold uppercase tracking-wider text-carbon-500 dark:text-carbon-400">
                Etapa atual
              </div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider', badge.className)}>
                  {badge.label}
                </span>
                <span className="text-sm font-semibold text-carbon-900 dark:text-carbon-100">
                  {String(activeNode?.data?.label ?? title)}
                </span>
              </div>
              {activeNode?.data?.description ? (
                <p className="mt-2 text-sm text-carbon-700 dark:text-carbon-300 leading-relaxed">
                  {String(activeNode.data.description)}
                </p>
              ) : null}
            </Card>

            {hasNodeLearnContent ? (
              <Card variant="default" padding="lg">
                <div className="text-xs font-bold uppercase tracking-wider text-carbon-500 dark:text-carbon-400 mb-2">
                  Conteúdo clínico
                </div>

                {activeData?.details?.length ? (
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-carbon-700 dark:text-carbon-300 mb-2">
                      Orientação clínica
                    </div>
                    <ul className="space-y-2">
                      {activeData.details.map((d: string, i: number) => (
                        <li key={i} className="flex gap-3 text-sm text-carbon-800 dark:text-carbon-200">
                          <span className="mt-2 w-2 h-2 rounded-full bg-adenine-teal dark:bg-cytosine-cyan shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {activeData?.criteria?.length ? (
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-carbon-700 dark:text-carbon-300 mb-2">
                      Critérios
                    </div>
                    <ul className="space-y-2">
                      {activeData.criteria.map((c: string, i: number) => (
                        <li key={i} className="flex gap-3 text-sm text-carbon-800 dark:text-carbon-200">
                          <span className="mt-2 w-2 h-2 rounded-full bg-thymine-gold shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {activeData?.medications?.length ? (
                  <div className="mb-4" data-testid="runner-medications">
                    <div className="text-xs font-semibold text-carbon-700 dark:text-carbon-300 mb-2">
                      Medicamentos
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeData.medications.map((m: string) => (
                        <span
                          key={m}
                          className="px-3 py-1.5 rounded-full text-[12px] font-semibold bg-guanine-green/10 text-guanine-green"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {activeData?.exams?.length ? (
                  <div className="mb-4" data-testid="runner-exams">
                    <div className="text-xs font-semibold text-carbon-700 dark:text-carbon-300 mb-2">
                      Exames
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeData.exams.map((e: string) => (
                        <span
                          key={e}
                          className="px-3 py-1.5 rounded-full text-[12px] font-semibold bg-carbon-200/60 text-carbon-800 dark:bg-carbon-800/60 dark:text-carbon-200"
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {activeData?.referTo ? (
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-carbon-700 dark:text-carbon-300 mb-1">
                      Encaminhar para
                    </div>
                    <div className="text-sm font-semibold text-carbon-900 dark:text-carbon-100">
                      {String(activeData.referTo)}
                    </div>
                  </div>
                ) : null}

                {activeData?.calculadoras?.length ? (
                  <div data-testid="runner-calculators">
                    <div className="text-xs font-semibold text-carbon-700 dark:text-carbon-300 mb-2">
                      Calculadoras
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeData.calculadoras.map((calcId: string) => (
                        <Link
                          key={calcId}
                          href={`/calculadoras/${encodeURIComponent(calcId)}`}
                          className="px-3 py-1.5 rounded-full text-[12px] font-semibold bg-cytosine-cyan/10 text-adenine-teal dark:text-cytosine-cyan hover:bg-cytosine-cyan/15 transition-colors"
                          title={`Abrir calculadora: ${calcId}`}
                        >
                          {calcId}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </Card>
            ) : null}

            {hasProtocolLearnContent ? (
              <Card variant="default" padding="lg">
                <div className="text-xs font-bold uppercase tracking-wider text-carbon-500 dark:text-carbon-400 mb-2">
                  Sobre o protocolo
                </div>

                {p.descricao ? (
                  <p className="text-sm text-carbon-800 dark:text-carbon-200 leading-relaxed">
                    {p.descricao}
                  </p>
                ) : null}

                {(p.objetivos?.length ?? 0) > 0 ? (
                  <div className="mt-4">
                    <div className="text-xs font-semibold text-carbon-700 dark:text-carbon-300 mb-2">
                      Objetivos
                    </div>
                    <ul className="space-y-2">
                      {p.objetivos.map((obj, i) => (
                        <li key={i} className="flex gap-3 text-sm text-carbon-800 dark:text-carbon-200">
                          <span className="mt-2 w-2 h-2 rounded-full bg-brand-primary-500 shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {p.populacaoAlvo ? (
                  <div className="mt-4">
                    <div className="text-xs font-semibold text-carbon-700 dark:text-carbon-300 mb-1">
                      População alvo
                    </div>
                    <div className="text-sm text-carbon-800 dark:text-carbon-200">
                      {p.populacaoAlvo}
                    </div>
                  </div>
                ) : null}

                {(p.ciap2?.length ?? 0) > 0 || (p.cid10?.length ?? 0) > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.ciap2?.map((c) => (
                      <span
                        key={c}
                        className="px-3 py-1.5 rounded-full text-[12px] font-semibold bg-carbon-200/60 text-carbon-800 dark:bg-carbon-800/60 dark:text-carbon-200"
                      >
                        CIAP: {c}
                      </span>
                    ))}
                    {p.cid10?.map((c) => (
                      <span
                        key={c}
                        className="px-3 py-1.5 rounded-full text-[12px] font-semibold bg-brand-primary-100 dark:bg-brand-primary-900/30 text-brand-primary-700 dark:text-brand-primary-300"
                      >
                        CID: {c}
                      </span>
                    ))}
                  </div>
                ) : null}

                {(p.criteriosInclusao?.length ?? 0) > 0 ? (
                  <div className="mt-4">
                    <div className="text-xs font-semibold text-carbon-700 dark:text-carbon-300 mb-2">
                      Critérios de inclusão
                    </div>
                    <ul className="space-y-2">
                      {p.criteriosInclusao!.map((c: string, i: number) => (
                        <li key={i} className="flex gap-3 text-sm text-carbon-800 dark:text-carbon-200">
                          <span className="mt-2 w-2 h-2 rounded-full bg-guanine-green shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {(p.criteriosExclusao?.length ?? 0) > 0 ? (
                  <div className="mt-4">
                    <div className="text-xs font-semibold text-carbon-700 dark:text-carbon-300 mb-2">
                      Critérios de exclusão
                    </div>
                    <ul className="space-y-2">
                      {p.criteriosExclusao!.map((c: string, i: number) => (
                        <li key={i} className="flex gap-3 text-sm text-carbon-800 dark:text-carbon-200">
                          <span className="mt-2 w-2 h-2 rounded-full bg-critical-red-600 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {(p.referencias?.length ?? 0) > 0 ? (
                  <div className="mt-4">
                    <div className="text-xs font-semibold text-carbon-700 dark:text-carbon-300 mb-2">
                      Referências
                    </div>
                    <ul className="space-y-1">
                      {p.referencias!.map((r: string, i: number) => (
                        <li key={i} className="text-sm text-carbon-700 dark:text-carbon-300">
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </Card>
            ) : null}

            {!hasNodeLearnContent && !hasProtocolLearnContent ? (
              <Card variant="default" padding="lg">
                <div className="text-sm text-carbon-700 dark:text-carbon-300">
                  Sem detalhes adicionais para esta etapa.
                </div>
              </Card>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      {/* Red flags dialog (mobile) */}
      <Dialog open={redFlagsOpen} onOpenChange={setRedFlagsOpen}>
        <DialogContent
          variant="glass"
          size="xl"
          className="p-0 overflow-hidden"
          data-testid="runner-redflags-dialog"
        >
          <div className="px-5 py-4 border-b border-carbon-200/70 dark:border-carbon-800/70">
            <DialogHeader>
              <DialogTitle>Sinais de alerta</DialogTitle>
              <DialogDescription>Critérios de segurança para este protocolo.</DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-5">
            {hasRedFlags ? (
              <ul className="space-y-2">
                {p.sinaisAlerta!.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-carbon-900 dark:text-carbon-100">
                    <AlertTriangle className="w-4 h-4 text-critical-red-600 mt-0.5 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-carbon-700 dark:text-carbon-300">
                Nenhum sinal de alerta definido.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Track dialog (mobile / quick access) */}
      <Dialog open={trackOpen} onOpenChange={setTrackOpen}>
        <DialogContent
          variant="glass"
          size="lg"
          className="p-0 overflow-hidden"
          data-testid="runner-track-dialog"
        >
          <div className="p-5 border-b border-carbon-200/70 dark:border-carbon-800/70">
            <DialogHeader>
              <DialogTitle>Track de decisão</DialogTitle>
            </DialogHeader>
          </div>
          <div className="p-3 max-h-[70vh] overflow-y-auto">
            <ol className="space-y-1">
              {state.history.map((h, idx) => {
                const node = getNodeById(p, h.nodeId);
                const label = String(node?.data?.label ?? h.nodeId);
                const edge = idx > 0 && h.viaEdgeId ? getEdgeById(p, h.viaEdgeId) : null;
                const edgeLabel = typeof (edge as any)?.label === 'string' ? String((edge as any).label).trim() : '';
                const isActive = h.nodeId === state.activeNodeId;
                return (
                  <li key={`${h.nodeId}:${idx}`}>
                    <button
                      type="button"
                      onClick={() => {
                        setState((s) => jumpToNode(s, h.nodeId));
                        setTrackOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-xl transition-colors',
                        isActive
                          ? 'bg-adenine-teal/10 text-adenine-teal dark:text-cytosine-cyan'
                          : 'hover:bg-carbon-100 dark:hover:bg-carbon-900/40 text-carbon-800 dark:text-carbon-200'
                      )}
                    >
                      <div className="text-xs text-carbon-500 dark:text-carbon-400">
                        {idx + 1}
                      </div>
                      {idx > 0 && edgeLabel ? (
                        <div className="text-xs text-carbon-600 dark:text-carbon-400 line-clamp-1">
                          ↳ {edgeLabel}
                        </div>
                      ) : null}
                      <div className="text-sm font-semibold line-clamp-2">
                        {label}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </DialogContent>
      </Dialog>

      {/* Map modal (secondary surface, lazy-loaded) */}
      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent
          variant="glass"
          size="full"
          className="p-0 w-[98vw] max-w-[98vw] h-[92vh] max-h-[92vh] overflow-hidden"
          showClose
          data-testid="runner-map-dialog"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-carbon-200/70 dark:border-carbon-800/70">
            <div className="min-w-0">
              <div className="text-xs font-semibold text-carbon-500 dark:text-carbon-400 truncate">
                Mapa do protocolo
              </div>
              <div className="text-sm font-bold text-carbon-900 dark:text-white truncate">
                {p.titulo}
              </div>
            </div>
            <Link
              href={`/protocolos/flowchart/${encodeURIComponent(p.id)}`}
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-carbon-700 dark:text-carbon-200 hover:text-adenine-teal dark:hover:text-cytosine-cyan"
              title="Abrir mapa em página"
            >
              Abrir em página
            </Link>
          </div>
          <div className="h-[calc(92vh-52px)]">
            {mapOpen ? <FlowchartEngine nodes={p.nodes} edges={p.edges} viewerOnly /> : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
