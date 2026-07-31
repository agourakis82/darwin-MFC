'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  Bell,
  BookOpenCheck,
  Calculator,
  Check,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  ClipboardPlus,
  CloudOff,
  FileHeart,
  FileText,
  HeartPulse,
  MoreHorizontal,
  Pill,
  Search,
  Shield,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  UserRound,
} from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';
import { medicamentosConsolidados } from '@/lib/data/medicamentos/index';
import { todasDoencas } from '@/lib/data/doencas/index';
import calculators from '@/lib/calculators/calculators';

const primaryDestinations = [
  {
    href: '/calculadoras',
    label: 'Calculadoras clínicas',
    description: 'Escores, risco e apoio à decisão',
    metric: `${calculators.length} ferramentas validadas`,
    icon: Calculator,
    tone: 'cyan',
  },
  {
    href: '/medicamentos',
    label: 'Medicamentos e bulário',
    description: 'Posologia, segurança e RENAME',
    metric: `${medicamentosConsolidados.length} medicamentos locais`,
    icon: Pill,
    tone: 'emerald',
  },
  {
    href: '/doencas',
    label: 'Condições da APS',
    description: 'Diagnóstico, manejo e seguimento',
    metric: `${new Set(todasDoencas.map((doenca) => doenca.id)).size} condições clínicas`,
    icon: Stethoscope,
    tone: 'cobalt',
  },
] as const;

const quickActions = [
  {
    href: '/prontuario',
    label: 'SOAP',
    description: 'Evolução estruturada',
    icon: ClipboardPlus,
  },
  {
    href: '/medicamentos/interacoes',
    label: 'Interações',
    description: 'Verificar riscos',
    icon: ShieldAlert,
  },
  {
    href: '/calculadoras/child-pugh',
    label: 'Child-Pugh',
    description: 'Avaliação hepática',
    icon: FileHeart,
  },
  {
    href: '/calculadoras/meld-3',
    label: 'MELD 3.0',
    description: 'Alocação hepática',
    icon: Calculator,
  },
  {
    href: '/calculadoras',
    label: 'Calculadoras',
    description: 'Escores e índices',
    icon: Calculator,
  },
];

const apsUpdates = [
  {
    href: '/doencas/hipertensao-arterial',
    title: 'Manejo da hipertensão arterial na APS',
    source: 'PCDT Ministério da Saúde 2025',
    badge: 'Atualizado',
    tone: 'verified',
    icon: Shield,
  },
  {
    href: '/doencas/diabetes-mellitus-2',
    title: 'Diabetes mellitus tipo 2 na APS',
    source: 'PCDT Ministério da Saúde 2026',
    badge: 'Atualizado',
    tone: 'attention',
    icon: CircleAlert,
  },
  {
    href: '/medicamentos/amoxicilina',
    title: 'Segurança na prescrição de amoxicilina',
    source: 'Confirmar alergias, dose e função renal',
    badge: 'Atenção',
    tone: 'danger',
    icon: ShieldAlert,
  },
  {
    href: '/medicamentos',
    title: 'Bulário clínico e RENAME',
    source: `${medicamentosConsolidados.length} medicamentos na base local`,
    badge: 'Base local',
    tone: 'info',
    icon: BookOpenCheck,
  },
] as const;

const recentReferences = [
  {
    href: '/doencas/hipertensao-arterial',
    title: 'Hipertensão arterial sistêmica',
    subtitle: 'PCDT SUS 2025',
    type: 'Condição',
    source: 'Diretriz',
    icon: Stethoscope,
  },
  {
    href: '/doencas/diabetes-mellitus-2',
    title: 'Diabetes mellitus tipo 2 na APS',
    subtitle: 'PCDT SUS 2026',
    type: 'Condição',
    source: 'Diretriz',
    icon: Stethoscope,
  },
  {
    href: '/medicamentos/amoxicilina',
    title: 'Amoxicilina',
    subtitle: 'Antibacteriano, penicilina',
    type: 'Medicamento',
    source: 'RENAME',
    icon: Pill,
  },
  {
    href: '/medicamentos/losartana',
    title: 'Losartana',
    subtitle: 'Antagonista do receptor de angiotensina II',
    type: 'Medicamento',
    source: 'RENAME',
    icon: Pill,
  },
  {
    href: '/calculadoras/child-pugh',
    title: 'Child-Pugh',
    subtitle: 'Avaliação da função hepática',
    type: 'Calculadora',
    source: 'Evidência',
    icon: Calculator,
  },
  {
    href: '/calculadoras/meld-3',
    title: 'MELD 3.0',
    subtitle: 'Modelo vigente no transplante hepático',
    type: 'Calculadora',
    source: 'Evidência',
    icon: Calculator,
  },
];

const examples = [
  'hipertensão arterial',
  'diabetes tipo 2',
  'amoxicilina',
  'losartana',
  'dor torácica',
  'Child-Pugh',
  'MELD',
];

const updateTone = {
  verified: {
    icon: 'bg-emerald-500/20 text-emerald-300',
    badge: 'bg-emerald-500/15 text-emerald-300',
  },
  attention: {
    icon: 'bg-amber-400/20 text-amber-300',
    badge: 'bg-amber-400/15 text-amber-300',
  },
  danger: {
    icon: 'bg-red-500/20 text-red-300',
    badge: 'bg-red-500/15 text-red-300',
  },
  info: {
    icon: 'bg-cyan-400/20 text-cyan-300',
    badge: 'bg-cyan-400/15 text-cyan-300',
  },
};

const destinationTone = {
  cyan: {
    surface: 'border-cyan-300/45 bg-cyan-400/[0.07] hover:border-cyan-200/80 hover:bg-cyan-400/[0.11]',
    icon: 'border-cyan-300/30 bg-cyan-300/[0.09] text-cyan-200',
    metric: 'text-cyan-300',
  },
  emerald: {
    surface: 'border-emerald-400/35 bg-emerald-400/[0.06] hover:border-emerald-300/70 hover:bg-emerald-400/[0.1]',
    icon: 'border-emerald-400/25 bg-emerald-400/[0.09] text-emerald-300',
    metric: 'text-emerald-300',
  },
  cobalt: {
    surface: 'border-blue-400/35 bg-blue-400/[0.06] hover:border-blue-300/70 hover:bg-blue-400/[0.1]',
    icon: 'border-blue-400/25 bg-blue-400/[0.09] text-blue-300',
    metric: 'text-blue-300',
  },
};

export default function HomeContent() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date())
    );
  }, []);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanQuery = query.trim();
    router.push(cleanQuery ? `/busca?q=${encodeURIComponent(cleanQuery)}` : '/busca');
  };

  const searchExample = (value: string) => {
    setQuery(value);
    router.push(`/busca?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="min-h-screen bg-[#050b0f] font-ui text-zinc-100">
      <div className="mx-auto max-w-[1500px] px-4 pb-8 pt-5 sm:px-6 lg:px-8 lg:pt-7">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <Shield className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            <span>Bem-vindo(a), profissional</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-9 items-center gap-2 rounded-md border border-white/15 px-3 text-xs text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
              Base local disponível
            </div>
            <Link
              href="/notifications"
              className="grid h-9 w-9 place-items-center rounded-md border border-transparent text-zinc-400 transition-colors hover:border-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Notificações"
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="grid h-9 w-9 place-items-center rounded-md border border-transparent text-zinc-400 transition-colors hover:border-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Ajuda e informações"
            >
              <CircleHelp className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/auth/login"
              className="flex h-9 items-center gap-2 rounded-md border border-white/15 px-3 text-xs text-zinc-300 transition-colors hover:border-cyan-400/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <UserRound className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Profissional</span>
            </Link>
          </div>
        </header>

        <section className="pt-7 xl:pr-[280px]" aria-labelledby="clinical-search-title">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-400/80">
                Inteligência clínica APS
              </p>
              <h1 id="clinical-search-title" className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                Busca clínica universal
              </h1>
            </div>
            <p className="text-xs capitalize text-zinc-500">{today}</p>
          </div>

          <form onSubmit={submitSearch} className="mt-6">
            <div className="group flex h-16 items-center overflow-hidden rounded-md border border-cyan-400/70 bg-[#071116] shadow-[0_0_28px_rgba(34,211,238,0.08)] transition-shadow focus-within:border-cyan-300 focus-within:shadow-[0_0_34px_rgba(34,211,238,0.16)]">
              <Search className="ml-5 h-6 w-6 shrink-0 text-zinc-300" strokeWidth={1.7} aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Buscar condição, medicamento, protocolo ou calculadora"
                className="h-full min-w-0 flex-1 bg-transparent px-4 text-base text-white outline-none placeholder:text-zinc-600"
                aria-label="Busca clínica universal"
              />
              <kbd className="hidden rounded border border-white/10 px-2 py-1 font-mono text-[10px] text-zinc-500 md:block">
                Ctrl K
              </kbd>
              <button
                type="submit"
                className="ml-4 grid h-full w-16 shrink-0 place-items-center border-l border-cyan-300/50 bg-cyan-400/15 text-cyan-200 transition-colors hover:bg-cyan-400/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                aria-label="Executar busca"
              >
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <span className="text-zinc-600">Exemplos:</span>
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => searchExample(example)}
                className="text-cyan-400/80 transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {example}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 xl:pr-[280px]" aria-labelledby="core-destinations-title">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Núcleo clínico</p>
              <h2 id="core-destinations-title" className="mt-1 text-lg font-semibold tracking-normal text-white">
                Encontre o que precisa, sem interromper o raciocínio
              </h2>
            </div>
            <span className="hidden text-[11px] text-zinc-600 md:inline">APS / SUS / pt-BR</span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {primaryDestinations.map(({ href, label, description, metric, icon: Icon, tone }) => {
              const colors = destinationTone[tone];
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-md border p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${colors.surface}`}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-md border ${colors.icon}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                  </span>
                  <span className="mt-4">
                    <span className="block text-base font-semibold text-white">{label}</span>
                    <span className="mt-0.5 block text-xs text-zinc-400">{description}</span>
                    <span className={`mt-2 block text-[10px] font-medium ${colors.metric}`}>{metric}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-7 xl:pr-[280px]" aria-labelledby="quick-access-title">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="quick-access-title" className="text-base font-semibold tracking-normal text-white">
              Continuar o atendimento
            </h2>
            <Link href="/consulta-rapida" className="text-xs text-cyan-400 hover:text-cyan-200">
              Abrir consulta rápida
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {quickActions.map(({ href, label, description, icon: Icon }, index) => (
              <Link
                key={href}
                href={href}
                className={`group flex min-h-20 items-center gap-3 rounded-md border bg-[#081116] px-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  index === 0
                    ? 'border-cyan-300/80 hover:bg-cyan-400/10'
                    : 'border-white/15 hover:border-cyan-400/40 hover:bg-white/[0.03]'
                }`}
              >
                <Icon
                  className={`h-6 w-6 shrink-0 ${index === 0 ? 'text-cyan-300' : 'text-zinc-300 group-hover:text-cyan-300'}`}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-white">{label}</span>
                  <span className="block truncate text-[11px] text-zinc-500">{description}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-5 xl:grid-cols-[310px_minmax(0,1fr)_260px]">
          <section className="rounded-md border border-white/15 bg-[#071015]" aria-labelledby="aps-now-title">
            <div className="flex h-14 items-center border-b border-white/10 px-5">
              <h2 id="aps-now-title" className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
                Agora na APS
              </h2>
            </div>
            <div className="divide-y divide-white/[0.08] px-4">
              {apsUpdates.map(({ href, title, source, badge, tone, icon: Icon }) => {
                const colors = updateTone[tone];
                return (
                  <Link
                    key={href}
                    href={href}
                    className="group flex min-h-[92px] items-center gap-3 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${colors.icon}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium leading-snug text-zinc-100 group-hover:text-cyan-200">
                        {title}
                      </span>
                      <span className="mt-1 block text-[11px] leading-snug text-zinc-500">{source}</span>
                      <span className={`mt-2 inline-flex rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase ${colors.badge}`}>
                        {badge}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-cyan-300" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
            <Link
              href="/consulta-rapida"
              className="m-4 flex h-11 items-center justify-between border-t border-white/10 pt-4 text-xs text-cyan-400 hover:text-cyan-200"
            >
              Ver atualização clínica
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          <section className="min-w-0 rounded-md border border-white/15 bg-[#071015]" aria-labelledby="recent-title">
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-5">
              <h2 id="recent-title" className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
                Referências recentes
              </h2>
              <Link href="/busca" className="text-[11px] text-cyan-400 hover:text-cyan-200">
                Ver todas
              </Link>
            </div>
            <div className="hidden grid-cols-[minmax(0,1fr)_110px_82px_28px] border-b border-white/[0.07] px-5 py-2 text-[9px] uppercase tracking-wider text-zinc-600 md:grid">
              <span>Tópico</span>
              <span>Tipo</span>
              <span>Fonte</span>
              <span />
            </div>
            <div className="divide-y divide-white/[0.07] px-3 sm:px-5">
              {recentReferences.map(({ href, title, subtitle, type, source, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group grid min-h-[67px] grid-cols-[minmax(0,1fr)_28px] items-center gap-3 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:grid-cols-[minmax(0,1fr)_110px_82px_28px]"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded border border-white/15 text-zinc-300 group-hover:border-cyan-400/50 group-hover:text-cyan-300">
                      <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-zinc-100 group-hover:text-cyan-200">
                        {title}
                      </span>
                      <span className="block truncate text-[11px] text-zinc-500">{subtitle}</span>
                    </span>
                  </span>
                  <span className="hidden w-fit rounded border border-cyan-400/20 bg-cyan-400/[0.06] px-2 py-1 text-[10px] text-cyan-300/80 md:inline-flex">
                    {type}
                  </span>
                  <span className="hidden text-[10px] text-zinc-500 md:inline">{source}</span>
                  <MoreHorizontal className="h-4 w-4 text-zinc-600 group-hover:text-zinc-300" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>

          <aside
            className="grid content-start gap-4 xl:-mt-[238px]"
            aria-label="Segurança, evidência e disponibilidade"
          >
            <section className="rounded-md border border-white/15 bg-[#071015] p-5">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-emerald-400" strokeWidth={1.7} aria-hidden="true" />
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">Evidência e qualidade</h2>
              </div>
              <div className="mt-5 flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 rounded-full border border-emerald-400 p-0.5 text-emerald-400" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-zinc-100">Base clínica consolidada</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                    Conteúdo local com referências, RENAME e diretrizes descritas em cada verbete.
                  </p>
                  <Link href="/bibliografia" className="mt-3 inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-200">
                    Ver fontes e metodologia
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </section>

            <section className="rounded-md border border-red-400/30 bg-[#0c1013] p-5">
              <div className="flex items-center gap-3">
                <ShieldAlert className="h-6 w-6 text-red-400" strokeWidth={1.7} aria-hidden="true" />
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">Segurança clínica</h2>
              </div>
              <div className="mt-5 border-l-2 border-red-400 pl-4">
                <p className="text-sm font-medium text-red-300">Antes de prescrever</p>
                <p className="mt-1 text-[11px] italic leading-relaxed text-zinc-500">
                  Confirme alergias, função renal, gestação e possíveis interações medicamentosas.
                </p>
                <Link
                  href="/medicamentos/interacoes"
                  className="mt-3 inline-flex items-center gap-2 text-xs text-red-300 hover:text-red-200"
                >
                  Verificar interações
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </section>

            <section className="rounded-md border border-white/15 bg-[#071015] p-5">
              <div className="flex items-center gap-3">
                <CloudOff className="h-5 w-5 text-zinc-300" strokeWidth={1.7} aria-hidden="true" />
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">Disponibilidade</h2>
              </div>
              <ul className="mt-4 space-y-3 text-xs text-zinc-400">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  Conteúdo clínico local
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  Bulário com fallback automático
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  Rotas clínicas estáticas
                </li>
              </ul>
            </section>

            <Link
              href="/prontuario"
              className="group flex min-h-20 items-center rounded-md border border-cyan-300/80 bg-cyan-400/15 px-5 text-white transition-colors hover:bg-cyan-400/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <ClipboardPlus className="h-7 w-7 text-cyan-200" strokeWidth={1.6} aria-hidden="true" />
              <span className="ml-4">
                <span className="block text-lg font-medium">Iniciar consulta</span>
                <span className="block text-[11px] text-cyan-100/60">Abrir prontuário SOAP</span>
              </span>
              <ChevronRight className="ml-auto h-5 w-5 text-cyan-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </aside>
        </div>

        <footer className="mt-6 grid gap-5 border-t border-white/10 py-6 text-xs text-zinc-500 md:grid-cols-3">
          <div className="flex gap-3">
            <Shield className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
            <p>
              <span className="block text-zinc-300">Baseado em evidências e diretrizes oficiais</span>
              Suporte à decisão clínica. Não substitui o julgamento profissional.
            </p>
          </div>
          <div className="flex gap-3">
            <FileText className="h-5 w-5 shrink-0 text-zinc-300" aria-hidden="true" />
            <p>
              <span className="block text-zinc-300">Proveniência</span>
              Referências e status RENAME disponíveis nos conteúdos.
            </p>
          </div>
          <div className="flex gap-3">
            <HeartPulse className="h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
            <p>
              <span className="block text-zinc-300">APS / SUS / pt-BR</span>
              Experiência clínica otimizada para atenção primária.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
