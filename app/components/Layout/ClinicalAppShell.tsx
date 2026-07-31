'use client';

import { FormEvent, useCallback, useMemo, useState } from 'react';
import {
  Activity,
  BookOpen,
  Calculator,
  ChevronDown,
  CircleUserRound,
  FileText,
  Home,
  Menu,
  MoreHorizontal,
  Pill,
  Search,
  ShieldCheck,
  Stethoscope,
  X,
  Zap,
} from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { usePSStore } from '@/lib/store/psStore';
import { DarwinLogo } from '@/app/components/Brand';

type ClinicalAppShellProps = {
  children: React.ReactNode;
};

const primaryNavigation = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/doencas', label: 'Condições', icon: Stethoscope },
  { href: '/medicamentos', label: 'Medicamentos', icon: Pill },
  { href: '/consulta-rapida', label: 'Consulta rápida', icon: Zap },
  { href: '/calculadoras', label: 'Calculadoras', icon: Calculator },
];

const secondaryNavigation = [
  { href: '/protocolos', label: 'Protocolos APS', icon: FileText },
  { href: '/medicamentos/interacoes', label: 'Interações', icon: ShieldCheck },
  { href: '/bibliografia', label: 'Bibliografia', icon: BookOpen },
  { href: '/adultos', label: 'Rastreamentos SUS', icon: Activity },
];

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function ClinicalAppShell({ children }: ClinicalAppShellProps) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const { mode, setMode } = usePSStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');

  const activeLabel = useMemo(() => {
    const match = [...primaryNavigation, ...secondaryNavigation].find((item) =>
      isActivePath(pathname, item.href)
    );
    return match?.label || 'Darwin Medical Hub';
  }, [pathname]);

  const enterEmergencyMode = useCallback(() => {
    setMode('ps');
    localStorage.setItem('darwin-mode-selection', 'ps');
    router.push('/ps');
  }, [router, setMode]);

  const submitCommandSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = commandQuery.trim();
    router.push(query ? `/busca?q=${encodeURIComponent(query)}` : '/busca');
  };

  const navigation = (
    <>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="px-5 pt-7">
          <Link
            href="/"
            prefetch={false}
            className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Darwin Medical Hub, início"
          >
            <DarwinLogo variant="full" size="lg" animated={false} />
          </Link>

          <div className="mt-6 flex flex-col gap-2 text-xs">
            <span className="w-fit rounded-md border border-cyan-400/35 px-3 py-1.5 font-semibold tracking-wide text-cyan-300">
              APS / SUS
            </span>
            <span className="flex items-center gap-2 text-zinc-400">
              <span className="font-mono">pt-BR</span>
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>

        <nav className="mt-8 space-y-1" aria-label="Navegação clínica principal">
          {primaryNavigation.map(({ href, label, icon: Icon }) => {
            const active = isActivePath(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                prefetch={false}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`relative flex h-12 items-center gap-3 px-5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400 ${
                  active
                    ? 'bg-cyan-400/[0.08] text-cyan-300'
                    : 'text-zinc-300 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                {active ? (
                  <span className="absolute inset-y-0 left-0 w-0.5 bg-cyan-300" aria-hidden="true" />
                ) : null}
                <Icon className="h-5 w-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setMoreOpen((open) => !open)}
            className="flex h-12 w-full items-center gap-3 px-5 text-sm text-zinc-300 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
            aria-expanded={moreOpen}
          >
            <MoreHorizontal className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            <span>Mais</span>
            <ChevronDown
              className={`ml-auto h-4 w-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          {moreOpen ? (
            <div className="mx-3 border-l border-white/10 pl-2">
              {secondaryNavigation.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  prefetch={false}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-10 items-center gap-3 px-3 py-2 text-xs text-zinc-400 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </nav>
      </div>

      <div className="border-t border-white/10 px-5 py-4">
        <Link
          href="/auth/login"
          prefetch={false}
          className="flex h-10 items-center gap-3 text-xs text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <CircleUserRound className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          <span>Profissional</span>
          <ChevronDown className="ml-auto h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={enterEmergencyMode}
          className="mt-1 flex h-10 w-full items-center gap-3 text-xs text-zinc-400 transition-colors hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          <Activity className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
          <span>{mode === 'ps' ? 'Emergência ativa' : 'Modo emergência'}</span>
          <span className="ml-auto h-2 w-2 rounded-full bg-zinc-600" aria-hidden="true" />
        </button>
        <p className="mt-3 border-t border-white/10 pt-3 text-[10px] text-zinc-600">Darwin v3.0.0</p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#050b0f] text-zinc-100">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[224px] border-r border-cyan-950/70 bg-[#050a0d] lg:flex">
        <div className="relative z-10 flex w-full flex-col bg-black/20">{navigation}</div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-cyan-300/15" aria-hidden="true" />
      </aside>

      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-white/10 bg-[#050a0d]/95 px-4 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-md text-zinc-200 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Abrir navegação"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <DarwinLogo variant="compact" size="sm" animated={false} className="ml-3" />
        <span className="ml-auto text-xs font-medium text-zinc-400">{activeLabel}</span>
        <Link
          href="/busca"
          className="ml-3 grid h-10 w-10 place-items-center rounded-md text-zinc-200 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Buscar"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
        </Link>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/75"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar navegação"
          />
          <aside className="relative flex h-full w-[280px] max-w-[88vw] flex-col border-r border-cyan-950 bg-[#050a0d] shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-md text-zinc-300 hover:bg-white/[0.06]"
              aria-label="Fechar navegação"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            {navigation}
          </aside>
        </div>
      ) : null}

      <main
        id="main-content"
        tabIndex={-1}
        role="main"
        aria-label="Conteúdo principal"
        className="min-h-screen overflow-x-hidden lg:ml-[224px]"
      >
        <header className="sticky top-0 z-40 hidden h-14 items-center gap-4 border-b border-white/10 bg-[#050a0d]/95 px-5 backdrop-blur lg:flex">
          <form onSubmit={submitCommandSearch} className="min-w-0 max-w-[680px] flex-1">
            <div className="flex h-9 items-center rounded-md border border-white/15 bg-[#081116] transition-colors focus-within:border-cyan-400/60">
              <Search className="ml-3 h-4 w-4 shrink-0 text-zinc-500" aria-hidden="true" />
              <input
                value={commandQuery}
                onChange={(event) => setCommandQuery(event.target.value)}
                className="h-full min-w-0 flex-1 bg-transparent px-3 text-xs text-zinc-100 outline-none placeholder:text-zinc-600"
                placeholder="Buscar condição, medicamento, protocolo ou calculadora"
                aria-label="Busca clínica global"
              />
              <kbd className="mr-2 rounded border border-white/10 px-1.5 py-0.5 font-mono text-[9px] text-zinc-600">Ctrl K</kbd>
            </div>
          </form>

          <nav className="ml-auto flex h-9 items-stretch overflow-hidden rounded-md border border-white/15" aria-label="Atalhos clínicos">
            {primaryNavigation.slice(1, 3).concat(primaryNavigation.slice(4, 5)).map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                prefetch={false}
                className="flex items-center gap-2 border-r border-white/10 px-3 text-[11px] text-zinc-300 transition-colors last:border-r-0 hover:bg-cyan-400/[0.08] hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
              >
                <Icon className="h-4 w-4 text-cyan-300" strokeWidth={1.8} aria-hidden="true" />
                <span className="hidden xl:inline">{label}</span>
              </Link>
            ))}
          </nav>

          <span className="flex h-9 items-center gap-2 rounded-md border border-emerald-400/20 bg-emerald-400/[0.05] px-3 text-[10px] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Base local
          </span>
        </header>
        {children}
      </main>
    </div>
  );
}
