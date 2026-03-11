'use client';

import { Activity, ArrowRight, Clock3, Pill, Siren, TimerReset, Weight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { allEmergencyDrugs } from '@/lib/ps/data';
import { usePSStore } from '@/lib/store/psStore';
import PSActiveCaseCard from './PSActiveCaseCard';

const WORKFLOWS = [
  { workflow: 'pcr' as const, protocolId: 'pcr', label: 'PCR / ACLS', href: '/ps/protocolos/pcr', blurb: 'Ritmo, choque, drogas e pausa de segurança.' },
  { workflow: 'sepse_choque' as const, protocolId: 'sepse', label: 'Sepse / choque', href: '/ps/protocolos/sepse', blurb: 'Fluido, antibiótico, vasoativa e reavaliação.' },
  { workflow: 'iot_rsi' as const, protocolId: 'iot', label: 'IOT / RSI', href: '/ps/protocolos/iot', blurb: 'Preparação, sequência rápida e pós-tubo.' },
];

const QUICK_DRUG_IDS = ['noradrenalina', 'adrenalina', 'etomidato', 'rocuronio'];

export default function PSDashboard() {
  const { activeCaseSession, patient, favoriteDrugs, favoriteScores, startCase, closeActiveCase } = usePSStore();

  const quickDrugs = QUICK_DRUG_IDS.map((id) => allEmergencyDrugs.find((drug) => drug.id === id)).filter(Boolean);

  const weightLabel = patient.verifiedWeightKg
    ? `${patient.verifiedWeightKg} kg`
    : patient.estimatedWeightKg
      ? `~${patient.estimatedWeightKg} kg`
      : patient.idealWeight && patient.useIdealWeight
        ? `${patient.idealWeight} kg ideal`
        : 'Peso indefinido';

  return (
    <div className="space-y-6 md:space-y-8">
      <section className="ps-app-enter rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_24%),linear-gradient(180deg,#091426_0%,#07111f_55%,#050c16_100%)] p-5 shadow-[0_32px_120px_rgba(0,0,0,0.36)] md:p-7">
        <div className="grid gap-6 xl:grid-cols-[1.24fr_0.76fr] xl:items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/18 bg-cyan-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-200">
              <Siren className="h-3.5 w-3.5" strokeWidth={2} />PS App V2
            </div>
            <div>
              <h1 className="max-w-4xl text-3xl font-bold tracking-[-0.05em] text-white md:text-6xl">Acute care cockpit</h1>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Pronto-socorro operacional</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-[15px]">
                Continue o caso atual, inicie um fluxo crítico em segundos e mantenha dose, checkpoint e handoff no mesmo plano operacional.
              </p>
            </div>
            <div className="grid gap-3 pt-2 sm:grid-cols-[1.24fr_0.76fr]">
              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.035))] px-5 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
                <p className="ps-app-label">Continue / start</p>
                <p className="mt-2 text-[1.85rem] font-semibold leading-tight tracking-[-0.05em] text-white md:text-[2.35rem]">
                  {activeCaseSession ? `Retomar ${activeCaseSession.workflow.toUpperCase()}` : 'Entrar no caso agudo agora'}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                  {activeCaseSession
                    ? 'Caso em andamento com timeline, handoff e safety stack persistidos.'
                    : 'Escolha um workflow sentinela e entre direto no runner operacional, sem navegar por catálogo.'}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="ps-app-pill">continue case</span>
                  <span className="ps-app-pill">critical meds</span>
                  <span className="ps-app-pill">handoff ready</span>
                </div>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-[#08111d]/84 px-5 py-5">
                <p className="ps-app-label">Operational state</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Caso</span>
                    <span className="text-sm font-semibold text-white">{activeCaseSession ? 'Em execução' : 'Livre'}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Peso</span>
                    <span className="text-sm font-semibold text-white">{weightLabel}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Fonte</span>
                    <span className="text-sm font-semibold text-white">{patient.weightSource}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="ps-app-surface-strong rounded-[30px] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="ps-app-label">Live state</p>
                  <p className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">{activeCaseSession ? activeCaseSession.workflow.toUpperCase() : 'Ready to launch'}</p>
                </div>
                <Activity className="h-5 w-5 text-cyan-300" strokeWidth={2} />
              </div>
              <div className="mt-5 grid gap-2.5">
                <div className="flex items-center justify-between rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Peso</span>
                  <span className="text-sm font-semibold text-white">{weightLabel}</span>
                </div>
                <div className="flex items-center justify-between rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Drogas fixadas</span>
                  <span className="text-sm font-semibold text-white">{favoriteDrugs.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Scores fixados</span>
                  <span className="text-sm font-semibold text-white">{favoriteScores.length}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="ps-app-label">Critical shortcuts</p>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">Drugs, scores e tools</p>
                </div>
                <Pill className="h-5 w-5 text-amber-300" strokeWidth={2} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/ps/drogas" className="ps-app-pill">Drogas</Link>
                <Link href="/ps/escalas" className="ps-app-pill">Scores</Link>
                <Link href="/ps/ferramentas" className="ps-app-pill">Ferramentas</Link>
                <Link href="/ps/protocolos" className="ps-app-pill">Protocolos</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {activeCaseSession && <PSActiveCaseCard activeCaseSession={activeCaseSession} onClose={closeActiveCase} />}

      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <section className="ps-app-enter-soft ps-app-surface-strong rounded-[32px] p-5 md:p-6">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="ps-app-label">Continue / Start</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">Workflows sentinela</h2>
            </div>
            <span className="ps-app-pill">3 fluxos críticos</span>
          </div>

          <div className="grid gap-3">
            {WORKFLOWS.map((workflow, index) => (
              <Link
                key={workflow.protocolId}
                href={workflow.href}
                onClick={() => startCase({ workflow: workflow.workflow, protocolId: workflow.protocolId })}
                className="ps-app-interactive rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.065),rgba(255,255,255,0.03))] px-5 py-5 shadow-[0_18px_44px_rgba(0,0,0,0.16)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.05] text-sm font-bold text-slate-200">
                      0{index + 1}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-lg font-semibold text-white">{workflow.label}</p>
                        <span className="ps-app-pill">start</span>
                      </div>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">{workflow.blurb}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.05] text-slate-200">
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">entry point</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-6">
          <section className="ps-app-enter-soft rounded-[32px] border border-white/10 bg-white/[0.045] p-5 md:p-6">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="ps-app-label">Critical meds</p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">Drogas de plantão</h2>
              </div>
              <span className="ps-app-pill">Quick access</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {quickDrugs.map((drug) => drug ? (
                <Link key={drug.id} href={`/ps/drogas?drug=${drug.id}`} className="ps-app-interactive rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-white">{drug.genericName}</p>
                      <p className="mt-1 text-sm text-slate-400">Abrir referência rápida</p>
                    </div>
                    <span className="ps-app-pill">open</span>
                  </div>
                </Link>
              ) : null)}
            </div>
          </section>

          <section className="ps-app-enter-soft rounded-[32px] border border-white/10 bg-[#08111d]/84 p-5 md:p-6">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="ps-app-label">Operational context</p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">Contexto imediato</h2>
              </div>
              <TimerReset className="h-5 w-5 text-slate-400" strokeWidth={2} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4">
                <p className="ps-app-label">Peso ativo</p>
                <p className="mt-2 text-lg font-semibold text-white">{weightLabel}</p>
                <p className="mt-1 text-sm text-slate-400">Fonte: {patient.weightSource}</p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-white/[0.04] px-4 py-4">
                <p className="ps-app-label">Ferramentas</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Link href="/ps/escalas" className="ps-app-pill">Scores</Link>
                  <Link href="/ps/drogas" className="ps-app-pill">Drogas</Link>
                  <Link href="/ps/ferramentas" className="ps-app-pill">Ferramentas</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
