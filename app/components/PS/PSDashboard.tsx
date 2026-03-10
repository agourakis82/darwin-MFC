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
      <section className="rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_30%),linear-gradient(180deg,#091426_0%,#07111f_55%,#050c16_100%)] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.34)] md:p-7">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/18 bg-cyan-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-200">
              <Siren className="h-3.5 w-3.5" strokeWidth={2} />PS App V2
            </div>
            <div>
              <h1 className="max-w-4xl text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">Acute care cockpit</h1>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Pronto-socorro operacional</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-[15px]">
                Continue o caso atual, inicie um fluxo crítico em segundos e mantenha dose, checkpoint e handoff no mesmo plano operacional.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
            <div className="ps-app-surface rounded-[26px] p-4">
              <div className="flex items-center gap-2 ps-app-label"><Activity className="h-3.5 w-3.5 text-cyan-300" strokeWidth={2} />Caso ativo</div>
              <p className="mt-3 text-2xl font-bold text-white">{activeCaseSession ? 'Em execução' : 'Livre'}</p>
              <p className="mt-1 text-sm text-slate-400">{activeCaseSession ? activeCaseSession.workflow.toUpperCase() : 'Pronto para novo caso'}</p>
            </div>
            <div className="ps-app-surface rounded-[26px] p-4">
              <div className="flex items-center gap-2 ps-app-label"><Weight className="h-3.5 w-3.5 text-amber-300" strokeWidth={2} />Peso</div>
              <p className="mt-3 text-2xl font-bold text-white">{weightLabel}</p>
              <p className="mt-1 text-sm text-slate-400">Fonte: {patient.weightSource}</p>
            </div>
            <div className="ps-app-surface rounded-[26px] p-4">
              <div className="flex items-center gap-2 ps-app-label"><Pill className="h-3.5 w-3.5 text-amber-300" strokeWidth={2} />Favoritas</div>
              <p className="mt-3 text-2xl font-bold text-white">{favoriteDrugs.length}</p>
              <p className="mt-1 text-sm text-slate-400">Drogas fixadas</p>
            </div>
            <div className="ps-app-surface rounded-[26px] p-4">
              <div className="flex items-center gap-2 ps-app-label"><Clock3 className="h-3.5 w-3.5 text-emerald-300" strokeWidth={2} />Scores</div>
              <p className="mt-3 text-2xl font-bold text-white">{favoriteScores.length}</p>
              <p className="mt-1 text-sm text-slate-400">Atalhos persistidos</p>
            </div>
          </div>
        </div>
      </section>

      {activeCaseSession && <PSActiveCaseCard activeCaseSession={activeCaseSession} onClose={closeActiveCase} />}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="ps-app-surface-strong rounded-[32px] p-5 md:p-6">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="ps-app-label">Continue / Start</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">Workflows sentinela</h2>
            </div>
            <span className="ps-app-pill">3 fluxos críticos</span>
          </div>

          <div className="grid gap-3">
            {WORKFLOWS.map((workflow) => (
              <Link
                key={workflow.protocolId}
                href={workflow.href}
                onClick={() => startCase({ workflow: workflow.workflow, protocolId: workflow.protocolId })}
                className="ps-app-interactive rounded-[26px] border border-white/8 bg-white/[0.04] px-4 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.14)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{workflow.label}</p>
                    <p className="mt-1 text-sm text-slate-400">{workflow.blurb}</p>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-200">
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-6">
          <section className="ps-app-surface rounded-[32px] p-5 md:p-6">
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
                  <p className="text-base font-semibold text-white">{drug.genericName}</p>
                  <p className="mt-1 text-sm text-slate-400">Abrir referência rápida</p>
                </Link>
              ) : null)}
            </div>
          </section>

          <section className="ps-app-surface rounded-[32px] p-5 md:p-6">
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
