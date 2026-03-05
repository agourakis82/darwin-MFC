'use client';

import { Link } from '@/i18n/routing';
import { usePSStore, getEffectiveWeight } from '@/lib/store/psStore';
import { allEmergencyDrugs } from '@/lib/ps/data';
import {
  Zap, Flame, Brain, Heart, Activity, Wind, AlertTriangle, Shield,
  Thermometer, Beaker, Skull, Syringe, Pill, Timer, Calculator,
  BarChart3, Droplets, Waves, HeartPulse, Microscope,
  ChevronRight,
} from 'lucide-react';
import type React from 'react';

// ─── Scenario data ────────────────────────────────────────────────────────────

interface ScenarioCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  href: string;
  /** Tailwind color classes */
  iconColor: string;
  /** Hex or rgba for inline bg — keeps Tailwind purge safe */
  accent: string;
}

const scenarios: ScenarioCard[] = [
  { id: 'pcr',                href: '/ps/protocolos/pcr',                  title: 'PCR',        subtitle: 'ACLS',           icon: Zap,         iconColor: 'text-red-400',     accent: 'rgba(239,68,68,0.12)' },
  { id: 'sepse',              href: '/ps/protocolos/sepse',                 title: 'Sepse',      subtitle: 'Hour-1',         icon: Flame,       iconColor: 'text-orange-400',  accent: 'rgba(249,115,22,0.12)' },
  { id: 'avc',                href: '/ps/protocolos/avc',                   title: 'AVC',        subtitle: 'Porta-Agulha',   icon: Brain,       iconColor: 'text-yellow-400',  accent: 'rgba(234,179,8,0.12)' },
  { id: 'iam',                href: '/ps/protocolos/iam',                   title: 'IAM',        subtitle: 'STEMI',          icon: Heart,       iconColor: 'text-blue-400',    accent: 'rgba(59,130,246,0.12)' },
  { id: 'choque',             href: '/ps/protocolos/choque',                title: 'Choque',     subtitle: '4 Tipos',        icon: Activity,    iconColor: 'text-purple-400',  accent: 'rgba(168,85,247,0.12)' },
  { id: 'iot',                href: '/ps/protocolos/iot',                   title: 'IOT',        subtitle: 'RSI',            icon: Wind,        iconColor: 'text-green-400',   accent: 'rgba(34,197,94,0.12)' },
  { id: 'anafilaxia',         href: '/ps/protocolos/anafilaxia',            title: 'Anafilaxia', subtitle: 'Epi IM',         icon: AlertTriangle, iconColor: 'text-red-300',   accent: 'rgba(252,165,165,0.10)' },
  { id: 'status-epilepticus', href: '/ps/protocolos/status-epilepticus',    title: 'Status',     subtitle: 'Epilepticus',    icon: Brain,       iconColor: 'text-indigo-400',  accent: 'rgba(99,102,241,0.12)' },
  { id: 'cad',                href: '/ps/protocolos/cad',                   title: 'CAD',        subtitle: 'DKA / EHH',      icon: Beaker,      iconColor: 'text-teal-400',    accent: 'rgba(20,184,166,0.12)' },
  { id: 'crise-hipertensiva', href: '/ps/protocolos/crise-hipertensiva',    title: 'Crise HTA',  subtitle: 'Urgência',       icon: Thermometer, iconColor: 'text-rose-400',    accent: 'rgba(244,63,94,0.12)' },
  { id: 'intoxicacoes',       href: '/ps/protocolos/intoxicacoes',          title: 'Tox',        subtitle: 'Antídotos',      icon: Skull,       iconColor: 'text-amber-400',   accent: 'rgba(245,158,11,0.12)' },
  { id: 'politrauma',         href: '/ps/protocolos/politrauma',            title: 'Trauma',     subtitle: 'ABCDE',          icon: Shield,      iconColor: 'text-amber-300',   accent: 'rgba(252,211,77,0.10)' },
  { id: 'eap',                href: '/ps/protocolos/eap',                   title: 'EAP',        subtitle: 'Edema Pulmão',   icon: Waves,       iconColor: 'text-cyan-400',    accent: 'rgba(6,182,212,0.12)' },
  { id: 'choque-cardiogenico',href: '/ps/protocolos/choque-cardiogenico',   title: 'Choque CC',  subtitle: 'Impella/ECMO',   icon: HeartPulse,  iconColor: 'text-pink-400',    accent: 'rgba(236,72,153,0.12)' },
  { id: 'tep',                href: '/ps/protocolos/tep',                   title: 'TEP',        subtitle: 'DOAC / PERT',    icon: Wind,        iconColor: 'text-orange-300',  accent: 'rgba(249,115,22,0.10)' },
  { id: 'fa-rvr',             href: '/ps/protocolos/fa-rvr',                title: 'FA-RVR',     subtitle: 'EAST-AFNET 4',   icon: Activity,    iconColor: 'text-pink-300',    accent: 'rgba(244,114,182,0.12)' },
  { id: 'hiponatremia-grave', href: '/ps/protocolos/hiponatremia-grave',    title: 'Hiponatr.',  subtitle: 'NaCl 3%',        icon: Droplets,    iconColor: 'text-violet-400',  accent: 'rgba(139,92,246,0.12)' },
  { id: 'febre-neutropenica', href: '/ps/protocolos/febre-neutropenica',    title: 'FN',         subtitle: 'MASCC',          icon: Microscope,  iconColor: 'text-red-500',     accent: 'rgba(239,68,68,0.12)' },
];

// ─── Quick-access tool chips ──────────────────────────────────────────────────

const tools = [
  { label: 'Vasoativas',    href: '/ps/drogas?cat=vasoativa',  icon: Droplets,  color: '#f87171' },
  { label: 'RSI / BNM',    href: '/ps/drogas?cat=rsi',        icon: Syringe,   color: '#4ade80' },
  { label: 'Antídotos',    href: '/ps/drogas?cat=antidoto',   icon: Shield,    color: '#60a5fa' },
  { label: 'Antiarr.',     href: '/ps/drogas?cat=antiarritmico', icon: Heart,  color: '#c084fc' },
  { label: 'Sedação',      href: '/ps/drogas?cat=sedacao',    icon: Pill,      color: '#fbbf24' },
  { label: 'Escalas',      href: '/ps/escalas',               icon: BarChart3, color: '#22d3ee' },
  { label: 'Timer PCR',    href: '/ps/timer',                 icon: Timer,     color: '#f87171' },
  { label: 'Calc.',        href: '/ps/calculadoras',          icon: Calculator,color: '#34d399' },
];

// ─── Reference drug tables ────────────────────────────────────────────────────

const vasoactiveRef: { id: string; range: [number, number] }[] = [
  { id: 'noradrenalina',    range: [0.05, 0.3]  },
  { id: 'adrenalina-infusao', range: [0.01, 0.5] },
  { id: 'dopamina',         range: [2, 20]      },
  { id: 'dobutamina',       range: [2.5, 20]    },
  { id: 'vasopressina',     range: [0.01, 0.04] },
  { id: 'fenilefrina',      range: [0.5, 6]     },
];

const rsiRef: { id: string; dose: string; max: number }[] = [
  { id: 'etomidato',    dose: '0.3 mg/kg',    max: 40  },
  { id: 'cetamina',     dose: '1–2 mg/kg',    max: 200 },
  { id: 'propofol',     dose: '1–2.5 mg/kg',  max: 250 },
  { id: 'fentanil',     dose: '1–3 mcg/kg',   max: 200 },
  { id: 'succinilcolina', dose: '1.5 mg/kg',  max: 150 },
  { id: 'rocuronio',    dose: '1.2 mg/kg',    max: 180 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-0.5">
      {children}
    </h2>
  );
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '0.5px solid rgba(255,255,255,0.09)',
      }}
    >
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PSDashboard() {
  const { patient } = usePSStore();
  const weight = getEffectiveWeight(patient);

  return (
    <div className="min-h-screen text-white" style={{ background: '#080810' }}>
      <div
        className="px-3 pt-3 pb-28 md:pb-8 space-y-6 max-w-5xl mx-auto"
        style={{ fontFamily: '-apple-system, "SF Pro Display", BlinkMacSystemFont, system-ui, sans-serif' }}
      >

        {/* ── Weight Banner ── */}
        {!weight ? (
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{ background: 'rgba(245,158,11,0.10)', border: '0.5px solid rgba(245,158,11,0.25)' }}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <p className="text-amber-200 text-sm font-medium">
              Informe o peso no topo para calcular doses automaticamente
            </p>
          </div>
        ) : (
          <div
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
            style={{ background: 'rgba(34,197,94,0.08)', border: '0.5px solid rgba(34,197,94,0.20)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-300 text-sm font-medium">
              Paciente:{' '}
              <span className="text-white font-bold font-mono">{weight} kg</span>
            </span>
            {patient.useIdealWeight && (
              <span className="ml-1 text-[11px] text-green-500/60 font-medium">peso ideal</span>
            )}
          </div>
        )}

        {/* ── Critical Scenarios Grid ── */}
        <section>
          <SectionLabel>Cenários Críticos</SectionLabel>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {scenarios.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.id}
                  href={s.href}
                  className="flex flex-col items-center text-center gap-2 p-3 rounded-2xl active:scale-95 transition-transform duration-100 min-h-[84px] justify-center"
                  style={{ background: s.accent, border: '0.5px solid rgba(255,255,255,0.07)' }}
                >
                  <Icon className={`w-6 h-6 ${s.iconColor}`} strokeWidth={1.8} />
                  <div>
                    <p className={`text-[13px] font-bold leading-tight ${s.iconColor}`}>{s.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{s.subtitle}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Tool Chips ── */}
        <section>
          <SectionLabel>Ferramentas</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.label}
                  href={t.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-[13px] font-semibold active:scale-95 transition-transform duration-100"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '0.5px solid rgba(255,255,255,0.10)',
                    color: t.color,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={2} style={{ color: t.color }} />
                  <span className="text-slate-200">{t.label}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Vasoactive Quick Reference ── */}
        <section>
          <SectionLabel>Vasoativas — Referência Rápida</SectionLabel>
          <GlassCard>
            <div className="grid grid-cols-[1fr_1fr_auto] text-[11px] text-slate-500 font-semibold uppercase tracking-wider px-4 py-2.5 border-b border-white/5">
              <span>Droga</span>
              <span>Dose</span>
              {weight && <span className="text-right">mL/h ({weight}kg)</span>}
            </div>
            {vasoactiveRef.map((entry, i) => {
              const drug = allEmergencyDrugs.find((d) => d.id === entry.id);
              const dosing = drug?.emergencyDosing?.[0];
              const conc = dosing?.infusion?.dilution?.finalConcentration;
              const hasInfusion = conc !== undefined && conc > 0;
              const doseLabel = dosing
                ? `${dosing.doseRange.min}–${dosing.doseRange.max} ${dosing.doseUnit}`
                : `${entry.range[0]}–${entry.range[1]}`;
              const mlhMin = hasInfusion && weight && conc
                ? Math.round((entry.range[0] * weight * 60) / conc * 10) / 10
                : null;
              const mlhMax = hasInfusion && weight && conc
                ? Math.round((entry.range[1] * weight * 60) / conc * 10) / 10
                : null;

              return (
                <Link
                  key={entry.id}
                  href={`/ps/drogas/${entry.id}`}
                  className={`grid grid-cols-[1fr_1fr_auto] items-center px-4 py-3 hover:bg-white/5 active:bg-white/8 transition-colors ${
                    i < vasoactiveRef.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <span className="text-sm font-semibold text-white">{drug?.genericName ?? entry.id}</span>
                  <span className="text-xs font-mono text-slate-400">{doseLabel}</span>
                  {weight ? (
                    hasInfusion && mlhMin !== null && mlhMax !== null ? (
                      <span className="text-xs font-mono font-bold text-emerald-400 text-right">{mlhMin}–{mlhMax}</span>
                    ) : (
                      <span className="text-xs text-slate-600 text-right">—</span>
                    )
                  ) : (
                    <span className="text-xs text-slate-700 text-right">—</span>
                  )}
                </Link>
              );
            })}
            <Link
              href="/ps/drogas?cat=vasoativa"
              className="flex items-center justify-between px-4 py-3 text-[13px] font-semibold text-red-400 hover:bg-white/5 transition-colors border-t border-white/5"
            >
              <span>Ver todas as vasoativas</span>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </Link>
          </GlassCard>
        </section>

        {/* ── RSI Quick Reference ── */}
        <section>
          <SectionLabel>RSI — Referência Rápida</SectionLabel>
          <GlassCard>
            <div className="grid grid-cols-[1fr_auto_auto] text-[11px] text-slate-500 font-semibold uppercase tracking-wider px-4 py-2.5 border-b border-white/5">
              <span>Droga</span>
              <span className="text-right pr-4">Dose/kg</span>
              {weight && <span className="text-right">= {weight}kg</span>}
            </div>
            {rsiRef.map((entry, i) => {
              const drug = allEmergencyDrugs.find((d) => d.id === entry.id);
              const dosing = drug?.emergencyDosing?.[0];
              const unit = dosing?.doseUnit?.replace('/kg', '') ?? 'mg';
              const computed = weight && dosing
                ? Math.round(dosing.doseRange.max * weight * 10) / 10
                : null;

              return (
                <Link
                  key={entry.id}
                  href={`/ps/drogas/${entry.id}`}
                  className={`grid grid-cols-[1fr_auto_auto] items-center px-4 py-3 hover:bg-white/5 active:bg-white/8 transition-colors ${
                    i < rsiRef.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <span className="text-sm font-semibold text-white">{drug?.genericName ?? entry.id}</span>
                  <span className="text-xs font-mono text-slate-400 pr-4">{entry.dose}</span>
                  {weight ? (
                    computed !== null ? (
                      <span className="text-xs font-mono font-bold text-emerald-400 text-right">{computed} {unit}</span>
                    ) : (
                      <span className="text-xs text-slate-600 text-right">—</span>
                    )
                  ) : (
                    <span className="text-xs text-slate-700 text-right">—</span>
                  )}
                </Link>
              );
            })}
            <Link
              href="/ps/drogas?cat=rsi"
              className="flex items-center justify-between px-4 py-3 text-[13px] font-semibold text-green-400 hover:bg-white/5 transition-colors border-t border-white/5"
            >
              <span>Ver drogas RSI</span>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </Link>
          </GlassCard>
        </section>

        {/* ── Score Quick Access ── */}
        <section>
          <SectionLabel>Escalas de Uso Frequente</SectionLabel>
          <GlassCard>
            {[
              { href: '/ps/escalas?score=sofa',        label: 'SOFA',        desc: 'Disfunção orgânica em sepse' },
              { href: '/ps/escalas?score=qsofa',       label: 'qSOFA',       desc: 'Triagem de sepse fora da UTI' },
              { href: '/ps/escalas?score=wells-pe',    label: 'Wells TEP',   desc: 'Probabilidade de tromboembolismo' },
              { href: '/ps/escalas?score=cha2ds2-vasc',label: 'CHA₂DS₂-VASc', desc: 'Risco de AVC em FA' },
              { href: '/ps/escalas?score=gcs',         label: 'GCS',         desc: 'Escala de Coma de Glasgow' },
              { href: '/ps/escalas?score=nihss',       label: 'NIHSS',       desc: 'Gravidade do AVC isquêmico' },
            ].map((score, i, arr) => (
              <Link
                key={score.href}
                href={score.href}
                className={`flex items-center justify-between px-4 py-3 hover:bg-white/5 active:bg-white/8 transition-colors ${
                  i < arr.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div>
                  <p className="text-sm font-bold text-cyan-400">{score.label}</p>
                  <p className="text-[11px] text-slate-500">{score.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </Link>
            ))}
          </GlassCard>
        </section>

      </div>
    </div>
  );
}
