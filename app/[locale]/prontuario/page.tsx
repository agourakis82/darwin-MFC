import { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Check,
  ClipboardList,
  Clock3,
  FileCheck2,
  HeartPulse,
  Pill,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import SOAPExport from '@/app/components/Export/SOAPExport';

export const metadata: Metadata = {
  title: 'Consulta APS e Nota SOAP | Darwin-MFC',
  description: 'Consulta longitudinal e nota SOAP estruturada para a Atenção Primária à Saúde',
};

const consultationSteps = [
  { number: '01', title: 'Ouvir', detail: 'História e prioridades', active: true },
  { number: '02', title: 'Examinar', detail: 'Dados clínicos' },
  { number: '03', title: 'Avaliar', detail: 'Síntese e risco' },
  { number: '04', title: 'Planejar', detail: 'Decisão compartilhada' },
];

const clinicalShortcuts = [
  { href: '/calculadoras', label: 'Calculadoras', detail: 'Escores e risco', icon: Calculator },
  { href: '/medicamentos', label: 'Medicamentos', detail: 'Bulário e RENAME', icon: Pill },
  { href: '/doencas', label: 'Condições', detail: 'Manejo na APS', icon: Stethoscope },
];

export default function ProntuarioPage() {
  return (
    <div className="min-h-screen bg-[#050b0f] font-ui text-zinc-100">
      <div className="border-b border-white/10 bg-[#071015]">
        <div className="mx-auto max-w-[1560px] px-4 py-4 sm:px-6 lg:px-7">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/15 text-zinc-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Voltar ao início"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold tracking-normal text-white sm:text-2xl">Consulta APS</h1>
                  <span className="rounded border border-emerald-400/20 bg-emerald-400/[0.06] px-2 py-0.5 text-[9px] font-semibold uppercase text-emerald-300">
                    Em andamento
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">Nota SOAP, decisão clínica e continuidade do cuidado no mesmo fluxo</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400">
              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                Atendimento atual
              </span>
              <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden="true" />
              <span className="flex items-center gap-2 text-emerald-300">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Base clínica local disponível
              </span>
            </div>
          </div>

          <ol className="mt-5 grid grid-cols-2 border-y border-white/10 sm:grid-cols-4" aria-label="Etapas da consulta">
            {consultationSteps.map((step, index) => (
              <li
                key={step.number}
                className={`relative flex min-h-[62px] items-center gap-2 border-b border-r border-white/10 px-2 py-2 even:border-r-0 sm:min-h-[70px] sm:gap-3 sm:border-b-0 sm:border-r sm:px-3 sm:py-3 sm:even:border-r sm:last:border-r-0 ${
                  step.active ? 'bg-cyan-400/[0.06]' : ''
                }`}
              >
                {step.active ? <span className="absolute inset-x-0 bottom-0 h-0.5 bg-cyan-300" aria-hidden="true" /> : null}
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[9px] font-semibold sm:h-8 sm:w-8 sm:text-[10px] ${
                    step.active ? 'border-cyan-300 bg-cyan-300 text-[#041014]' : 'border-white/15 text-zinc-500'
                  }`}
                >
                  {step.number}
                </span>
                <span>
                  <span className={`block text-xs font-medium sm:text-sm ${step.active ? 'text-white' : 'text-zinc-400'}`}>{step.title}</span>
                  <span className="block text-[9px] text-zinc-600 sm:text-[10px]">{step.detail}</span>
                </span>
                {index < consultationSteps.length - 1 ? (
                  <ArrowRight className="ml-auto hidden h-3.5 w-3.5 text-zinc-700 xl:block" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mx-auto max-w-[1560px] px-4 py-5 sm:px-6 lg:px-7">
        <nav className="grid grid-cols-3 gap-2 xl:hidden" aria-label="Acessos clínicos durante a consulta">
          {clinicalShortcuts.map(({ href, label, detail, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-md border border-white/15 bg-[#081116] px-1.5 py-2 text-center transition-colors hover:border-cyan-400/45 hover:bg-cyan-400/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:flex-row sm:justify-start sm:gap-3 sm:px-4 sm:text-left"
            >
              <Icon className="h-5 w-5 text-cyan-300" strokeWidth={1.7} aria-hidden="true" />
              <span>
                <span className="block text-[10px] font-medium text-white sm:text-xs">{label}</span>
                <span className="hidden text-[10px] text-zinc-500 sm:block">{detail}</span>
              </span>
              <ArrowRight className="ml-auto hidden h-3.5 w-3.5 text-zinc-600 sm:block" aria-hidden="true" />
            </Link>
          ))}
        </nav>

        <div className="mt-4 grid items-start gap-5 xl:mt-0 xl:grid-cols-[minmax(0,1fr)_280px]">
          <main className="min-w-0" aria-label="Registro da consulta">
            <div className="mb-4 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400/80">Registro estruturado</p>
                <h2 className="mt-1 text-lg font-semibold tracking-normal text-white">Nota de evolução SOAP</h2>
                <p className="mt-1 max-w-2xl text-xs leading-relaxed text-zinc-500">
                  Registre o essencial, revise a síntese e encerre com um plano compreensível para a pessoa e para a equipe.
                </p>
              </div>
              <span className="flex items-center gap-2 text-[10px] text-zinc-500">
                <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                Alterações preservadas nesta sessão
              </span>
            </div>

            <div className="soap-clinical-workspace">
              <SOAPExport />
            </div>
          </main>

          <aside className="hidden content-start gap-4 xl:grid" aria-label="Contexto e ferramentas da consulta">
            <section className="rounded-md border border-cyan-300/35 bg-cyan-400/[0.05] p-4">
              <div className="flex items-center gap-3">
                <HeartPulse className="h-5 w-5 text-cyan-300" strokeWidth={1.7} aria-hidden="true" />
                <div>
                  <h2 className="text-xs font-semibold text-white">Presença clínica</h2>
                  <p className="text-[10px] text-zinc-500">Um passo claro por vez</p>
                </div>
              </div>
              <p className="mt-4 border-l-2 border-cyan-300/60 pl-3 text-[11px] leading-relaxed text-zinc-400">
                Comece pela narrativa e pela prioridade da pessoa. Os dados objetivos e o plano ganham sentido a partir desse contexto.
              </p>
            </section>

            <section className="rounded-md border border-white/15 bg-[#071015]">
              <div className="border-b border-white/10 px-4 py-3">
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-300">Acesso durante a consulta</h2>
              </div>
              <nav className="divide-y divide-white/[0.08]">
                {clinicalShortcuts.map(({ href, label, detail, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex min-h-[70px] items-center gap-3 px-4 transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/15 text-cyan-300 group-hover:border-cyan-400/40">
                      <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-zinc-100 group-hover:text-cyan-200">{label}</span>
                      <span className="block text-[10px] text-zinc-600">{detail}</span>
                    </span>
                    <ArrowRight className="ml-auto h-3.5 w-3.5 text-zinc-700 group-hover:text-cyan-300" aria-hidden="true" />
                  </Link>
                ))}
              </nav>
            </section>

            <section className="rounded-md border border-emerald-400/25 bg-[#071015] p-4">
              <div className="flex items-center gap-3">
                <FileCheck2 className="h-5 w-5 text-emerald-400" strokeWidth={1.7} aria-hidden="true" />
                <h2 className="text-xs font-semibold text-white">Continuidade do cuidado</h2>
              </div>
              <ul className="mt-4 space-y-3 text-[11px] text-zinc-400">
                <li className="flex items-start gap-2">
                  <ClipboardList className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden="true" />
                  Síntese clínica objetiva e rastreável
                </li>
                <li className="flex items-start gap-2">
                  <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden="true" />
                  Plano legível para toda a equipe ESF
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden="true" />
                  Evidência e segurança no ponto de decisão
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
