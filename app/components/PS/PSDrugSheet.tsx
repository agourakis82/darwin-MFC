'use client';

import { useMemo } from 'react';
import { X, Pill, Weight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { getDrugById } from '@/lib/ps/data';
import { generateInfusionTable } from '@/lib/ps/types';
import { getEffectiveWeight, type PatientContext } from '@/lib/store/psStore';

interface PSDrugSheetProps {
  drugId: string | null;
  patient: PatientContext;
  onClose: () => void;
  onReview: (drugId: string) => void;
  onConfirm: (drugId: string) => void;
}

function formatDoseRange(min: number, max: number, unit: string, weight: number | null) {
  if (weight == null || !unit.includes('/kg')) {
    return `${min}-${max} ${unit}`;
  }

  const normalizedUnit = unit.replace('/kg', '').trim();
  const minValue = Math.round(min * weight * 100) / 100;
  const maxValue = Math.round(max * weight * 100) / 100;
  return `${minValue}-${maxValue} ${normalizedUnit}`;
}

export default function PSDrugSheet({
  drugId,
  patient,
  onClose,
  onReview,
  onConfirm,
}: PSDrugSheetProps) {
  const drug = useMemo(() => (drugId ? getDrugById(drugId) : null), [drugId]);
  const weight = getEffectiveWeight(patient);
  const primaryDosing = drug?.emergencyDosing?.[0];
  const weightSourceLabel = patient.useIdealWeight
    ? 'ideal'
    : patient.weightSource === 'verified'
      ? 'verificado'
      : patient.weightSource === 'estimated'
        ? 'estimado'
        : 'indefinido';

  if (!drug || !primaryDosing) return null;

  const isHighAlert = Boolean(primaryDosing.doseUnit.includes('/kg') || primaryDosing.infusion);
  const showEstimatedWarning = patient.weightSource === 'estimated';
  const showUnknownWeightTrap = primaryDosing.doseUnit.includes('/kg') && weight == null;
  const showInfusionTrap = Boolean(primaryDosing.infusion && !primaryDosing.infusion.dilution?.finalConcentration);
  const compatibilityHighlights = [...drug.yCompatibility]
    .sort((a, b) => {
      const priority = { incompatible: 0, unknown: 1, compatible: 2 } as const;
      return priority[a.status] - priority[b.status];
    })
    .slice(0, 4);
  const criticalContraindications = drug.contraindications.slice(0, 4);
  const dosingAdjustments = primaryDosing.adjustments?.slice(0, 4) ?? [];
  const seriousEffects = drug.seriousAdverseEffects.slice(0, 4);
  const infusionPreview = primaryDosing.infusion && weight && primaryDosing.infusion.dilution?.finalConcentration
    ? generateInfusionTable(
        weight,
        primaryDosing.infusion.steps,
        primaryDosing.infusion.dilution.finalConcentration
      )
    : [];
  const weightTimestamp = patient.weightMeasuredAt
    ? new Date(patient.weightMeasuredAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <div
      data-testid="ps-drug-sheet"
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/50 backdrop-blur-sm px-3 pb-3"
    >
      <div
        className="w-full max-w-2xl rounded-[28px] overflow-hidden max-h-[90vh] flex flex-col"
        style={{ background: '#0b1220', border: '1px solid rgba(255,255,255,0.10)' }}
      >
        <div className="flex items-start justify-between gap-3 px-4 py-4 border-b border-white/8">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-amber-300/75 font-semibold">
              <Pill className="w-3.5 h-3.5" strokeWidth={2} />
              {isHighAlert ? 'High-alert med' : 'Droga'}
            </div>
            <h3 className="text-xl text-white font-bold mt-1">{drug.genericName}</h3>
            <p className="text-sm text-slate-400 mt-1">{primaryDosing.indication}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-100 bg-white/8 border border-white/10">
                {primaryDosing.route}
              </span>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                patient.weightSource === 'verified'
                  ? 'text-green-200 border-green-400/20 bg-green-500/10'
                  : patient.weightSource === 'estimated'
                    ? 'text-amber-200 border-amber-400/20 bg-amber-500/10'
                    : 'text-slate-200 border-white/10 bg-white/5'
              }`}>
                peso {weightSourceLabel}
              </span>
              {primaryDosing.infusion && (
                <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-cyan-100 bg-cyan-500/10 border border-cyan-400/20">
                  infusão
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-testid="ps-drug-sheet-close"
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            aria-label="Fechar sheet da droga"
          >
            <X className="w-4.5 h-4.5" strokeWidth={2} />
          </button>
        </div>

        <div className="px-4 py-4 overflow-y-auto">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.9fr)]">
            <div className="space-y-3">
              {showEstimatedWarning && (
                <div className="rounded-2xl p-3 bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-amber-300 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2} />
                    Peso estimado em uso
                  </div>
                  <p className="text-xs text-amber-100/90 mt-1">
                    Revise a segurança da dose antes de confirmar uso.
                  </p>
                </div>
              )}

              {(showUnknownWeightTrap || showInfusionTrap || isHighAlert) && (
                <div className="rounded-2xl p-3 bg-rose-500/8 border border-rose-500/16">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-rose-300 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2} />
                    Safety traps
                  </div>
                  <div className="space-y-1.5 mt-2">
                    {isHighAlert && (
                      <p className="text-xs text-rose-100/90">High-alert med: revise peso, unidade, concentração e taxa antes de confirmar uso.</p>
                    )}
                    {showUnknownWeightTrap && (
                      <p className="text-xs text-rose-100/90">Dose dependente de peso sem peso efetivo disponível.</p>
                    )}
                    {showInfusionTrap && (
                      <p className="text-xs text-rose-100/90">Infusão sem concentração final explícita nos dados.</p>
                    )}
                  </div>
                </div>
              )}

              <div className="rounded-2xl p-3 bg-white/5 border border-white/7">
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold block mb-2">Dose</span>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-lg text-white font-bold font-mono">
                    {formatDoseRange(primaryDosing.doseRange.min, primaryDosing.doseRange.max, primaryDosing.doseUnit, weight)}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-[10px] uppercase tracking-wide font-semibold ${
                    patient.weightSource === 'verified'
                      ? 'bg-green-500/12 text-green-300 border border-green-500/20'
                      : patient.weightSource === 'estimated'
                        ? 'bg-amber-500/12 text-amber-200 border border-amber-500/20'
                        : 'bg-white/7 text-slate-300 border border-white/10'
                  }`}>
                    {weightSourceLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Via: {primaryDosing.route} {primaryDosing.maxDose ? `• Dose máxima: ${primaryDosing.maxDose}` : ''}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Base de cálculo: {primaryDosing.doseRange.min}-{primaryDosing.doseRange.max} {primaryDosing.doseUnit}
                  {weight ? ` × ${weight} kg` : ''}
                </p>
              </div>

              {primaryDosing.infusion?.dilution && (
                <div className="rounded-2xl p-3 bg-white/5 border border-white/7">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold block mb-2">Diluição / infusão</span>
                  <p className="text-sm text-white font-semibold">{primaryDosing.infusion.dilution.description}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Concentração final: {primaryDosing.infusion.dilution.finalConcentration} {primaryDosing.infusion.dilution.concentrationUnit}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Pressupostos: peso {weight ? `${weight} kg` : 'não informado'} • unidade {primaryDosing.infusion.rateUnit}
                  </p>
                  {infusionPreview.length > 0 && (
                    <div className="mt-3 rounded-xl p-3 bg-black/10 border border-white/8">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">Taxa calculada</p>
                      <div className="space-y-1.5">
                        {infusionPreview.slice(0, 3).map((row) => (
                          <div key={`${row.dose}-${row.mlPerHour}`} className="flex items-center justify-between gap-3 text-xs font-mono text-slate-200">
                            <span>{row.dose} {row.unit}</span>
                            <span>{row.mlPerHour} mL/h</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {primaryDosing.notes?.length ? (
                <div className="rounded-2xl p-3 bg-amber-500/8 border border-amber-500/14">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-amber-300 font-semibold mb-2">
                    <AlertTriangle className="w-3.5 h-3.5" strokeWidth={2} />
                    Notas
                  </div>
                  <div className="space-y-1.5">
                    {primaryDosing.notes.slice(0, 4).map((note) => (
                      <p key={note} className="text-xs text-amber-100/90 leading-relaxed">{note}</p>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl p-3 bg-white/5 border border-white/7">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">Apresentações</p>
                <div className="space-y-1.5">
                  {drug.presentations.slice(0, 3).map((presentation) => (
                    <p key={presentation} className="text-xs text-slate-300 leading-relaxed">{presentation}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-3 bg-white/5 border border-white/7">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">
                  <Weight className="w-3.5 h-3.5" strokeWidth={2} />
                  Fonte do peso
                </div>
                <p className="text-sm text-white font-semibold">
                  {weight ? `${weight} kg` : 'Peso não informado'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Origem: {weightSourceLabel}{weightTimestamp ? ` • ${weightTimestamp}` : ''}
                </p>
              </div>

              <div className="rounded-2xl p-3 bg-white/5 border border-white/7">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">Bases de segurança</p>
                <div className="space-y-2">
                  <div className="rounded-xl px-3 py-2 bg-black/10 border border-white/8">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Unidade</p>
                    <p className="text-sm text-white font-mono">{primaryDosing.doseUnit}</p>
                  </div>
                  {primaryDosing.infusion?.dilution && (
                    <div className="rounded-xl px-3 py-2 bg-black/10 border border-white/8">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Concentração</p>
                      <p className="text-sm text-white font-mono">
                        {primaryDosing.infusion.dilution.finalConcentration} {primaryDosing.infusion.dilution.concentrationUnit}
                      </p>
                    </div>
                  )}
                  <div className="rounded-xl px-3 py-2 bg-black/10 border border-white/8">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">High-alert</p>
                    <p className="text-sm text-white">{isHighAlert ? 'Sim' : 'Não'}</p>
                  </div>
                </div>
              </div>

              {primaryDosing.infusion?.dilution && (
                <div className="rounded-2xl p-3 bg-white/5 border border-white/7">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">Preparo real</p>
                  <div className="space-y-2">
                    <div className="rounded-xl px-3 py-2 bg-black/10 border border-white/8">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Soluto</p>
                      <p className="text-sm text-white">{primaryDosing.infusion.dilution.solute} • {primaryDosing.infusion.dilution.soluteVolume}</p>
                    </div>
                    <div className="rounded-xl px-3 py-2 bg-black/10 border border-white/8">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Diluente</p>
                      <p className="text-sm text-white">{primaryDosing.infusion.dilution.diluent} • {primaryDosing.infusion.dilution.diluentVolume}</p>
                    </div>
                    <div className="rounded-xl px-3 py-2 bg-black/10 border border-white/8">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Volume final / estabilidade</p>
                      <p className="text-sm text-white">{primaryDosing.infusion.dilution.finalVolume} mL • {primaryDosing.infusion.dilution.stability}</p>
                    </div>
                  </div>
                </div>
              )}

              {criticalContraindications.length > 0 && (
                <div className="rounded-2xl p-3 bg-rose-500/8 border border-rose-500/16">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-rose-200 font-semibold mb-2">Contraindicações críticas</p>
                  <div className="space-y-1.5">
                    {criticalContraindications.map((item) => (
                      <p key={item} className="text-xs text-rose-50/90 leading-relaxed">{item}</p>
                    ))}
                  </div>
                </div>
              )}

              {dosingAdjustments.length > 0 && (
                <div className="rounded-2xl p-3 bg-white/5 border border-white/7">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">Ajustes clínicos</p>
                  <div className="space-y-2">
                    {dosingAdjustments.map((adjustment) => (
                      <div key={`${adjustment.condition}-${adjustment.modification}`} className="rounded-xl px-3 py-2 bg-black/10 border border-white/8">
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">{adjustment.condition}</p>
                        <p className="text-sm text-white mt-1 leading-relaxed">{adjustment.modification}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {compatibilityHighlights.length > 0 && (
                <div className="rounded-2xl p-3 bg-white/5 border border-white/7">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-semibold mb-2">Compatibilidade Y</p>
                  <div className="space-y-2">
                    {compatibilityHighlights.map((entry) => (
                      <div
                        key={`${entry.drugId}-${entry.status}`}
                        className="rounded-xl px-3 py-2 bg-black/10 border border-white/8 flex items-center justify-between gap-3"
                      >
                        <p className="text-sm text-white">{entry.drugName}</p>
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            entry.status === 'compatible'
                              ? 'text-green-200 border-green-400/20 bg-green-500/10'
                              : entry.status === 'unknown'
                                ? 'text-amber-200 border-amber-400/20 bg-amber-500/10'
                                : 'text-rose-200 border-rose-400/20 bg-rose-500/10'
                          }`}
                        >
                          {entry.status === 'compatible' ? 'compatível' : entry.status === 'unknown' ? 'incerto' : 'incompatível'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {seriousEffects.length > 0 && (
                <div className="rounded-2xl p-3 bg-amber-500/8 border border-amber-500/14">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200 font-semibold mb-2">Efeitos adversos críticos</p>
                  <div className="space-y-1.5">
                    {seriousEffects.map((effect) => (
                      <p key={effect} className="text-xs text-amber-50/90 leading-relaxed">{effect}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl p-3 bg-cyan-500/8 border border-cyan-500/14">
                <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200 font-semibold">Regra operacional</p>
                <p className="text-xs text-cyan-50/90 mt-1 leading-relaxed">
                  `Marcar revisado` registra conferência. `Confirmar uso` deve ser usado apenas quando a equipe decidiu administrar.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 border-t border-white/8 bg-[#0b1220]/95 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onReview(drug.id)}
              data-testid="ps-drug-sheet-review"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold text-white active:scale-95 transition-all"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
              Marcar revisado
            </button>
            <button
              type="button"
              onClick={() => onConfirm(drug.id)}
              data-testid="ps-drug-sheet-confirm"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold text-slate-950 active:scale-95 transition-all"
              style={{ background: '#f59e0b', border: '1px solid rgba(245,158,11,0.32)' }}
            >
              Confirmar uso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
