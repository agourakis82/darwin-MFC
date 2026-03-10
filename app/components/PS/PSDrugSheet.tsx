'use client';

import { AlertTriangle, CheckCircle2, Pill, Syringe, Weight, X } from 'lucide-react';
import { getDrugById } from '@/lib/ps/data';
import type { PatientContext } from '@/lib/ps/contracts';

interface PSDrugSheetProps {
  drugId: string | null;
  patient: PatientContext;
  onClose: () => void;
  onReview: (drugId: string) => void;
  onConfirm: (drugId: string) => void;
}

function getWeightLabel(patient: PatientContext) {
  if (patient.verifiedWeightKg) return `${patient.verifiedWeightKg} kg verificado`;
  if (patient.estimatedWeightKg) return `~${patient.estimatedWeightKg} kg estimado`;
  if (patient.idealWeight && patient.useIdealWeight) return `${patient.idealWeight} kg ideal`;
  return 'Peso indefinido';
}

export default function PSDrugSheet({ drugId, patient, onClose, onReview, onConfirm }: PSDrugSheetProps) {
  if (!drugId) return null;

  const drug = getDrugById(drugId);
  if (!drug) return null;

  const primaryDosing = drug.emergencyDosing[0];
  const weightLabel = getWeightLabel(patient);
  const weightTimestamp = patient.weightMeasuredAt ? new Date(patient.weightMeasuredAt).toLocaleString('pt-BR') : 'Sem timestamp';
  const isEstimated = patient.weightSource === 'estimated';
  const presentationPreview = drug.presentations.slice(0, 3);
  const adversePreview = drug.seriousAdverseEffects.slice(0, 3);
  const compatibilityPreview = drug.yCompatibility.slice(0, 3);
  const doseSummary = primaryDosing ? `${primaryDosing.doseRange.min}-${primaryDosing.doseRange.max} ${primaryDosing.doseUnit}` : 'Ver protocolo institucional';
  const prepSummary = primaryDosing?.infusion?.dilution.description || primaryDosing?.route || 'Ver protocolo institucional';
  const contraindicationSummary = drug.contraindications.slice(0, 2).join(' · ') || 'Sem dados';
  const checklist = [
    'Conferir peso e fonte do peso.',
    'Conferir apresentação e concentração final.',
    'Conferir linha / acesso e monitorização.',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#02060d]/74 backdrop-blur-xl">
      <div className="flex min-h-screen items-end justify-center p-3 md:items-center md:p-6">
        <div data-testid="ps-drug-sheet" className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(24,52,89,0.95),rgba(8,16,29,0.98)_42%),linear-gradient(180deg,#091220_0%,#060b13_100%)] shadow-[0_32px_120px_rgba(0,0,0,0.52)]">
          <div className="flex items-start justify-between gap-4 border-b border-white/8 px-5 py-5 md:px-6">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/18 bg-cyan-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-100">
                <Pill className="h-3.5 w-3.5" strokeWidth={2} />Drug sheet
              </div>
              <h2 className="text-2xl font-bold tracking-[-0.03em] text-white">{drug.genericName}</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">Dose, preparo, risco e validação operacional no mesmo plano. Sem navegação lateral e sem esconder pressupostos.</p>
            </div>
            <button data-testid="ps-drug-sheet-close" type="button" onClick={onClose} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 apple-transition-fast hover:bg-white/[0.08]">
              <X className="h-4.5 w-4.5" strokeWidth={2} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 md:px-6 md:py-6">
            <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-5">
                <section className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <div className="flex flex-wrap gap-2">
                    <span className="ps-app-pill"><Weight className="h-3.5 w-3.5 text-amber-300" strokeWidth={2} />{weightLabel}</span>
                    <span className="ps-app-pill">Fonte: {patient.weightSource}</span>
                    <span className="ps-app-pill">{weightTimestamp}</span>
                  </div>

                  <div className="mt-5 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] px-5 py-5">
                      <p className="ps-app-label">Dose operacional</p>
                      <p className="mt-3 text-[2rem] font-semibold leading-none tracking-[-0.05em] text-white">{doseSummary}</p>
                      <p className="mt-3 text-sm text-slate-400">{primaryDosing?.indication || 'Base do cálculo: peso + concentração local'}</p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div>
                          <p className="ps-app-label">Preparo</p>
                          <p className="mt-2 text-sm font-medium text-slate-100">{prepSummary}</p>
                        </div>
                        <div>
                          <p className="ps-app-label">Via / cenário</p>
                          <p className="mt-2 text-sm font-medium text-slate-100">{primaryDosing?.route || 'n/a'} · {primaryDosing?.indication || 'n/a'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/8 bg-[#08111e]/80 px-5 py-5">
                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        <Syringe className="h-3.5 w-3.5 text-cyan-300" strokeWidth={2} />
                        Guardrails
                      </div>
                      {isEstimated ? (
                        <div className="mt-4 rounded-[22px] border border-amber-400/24 bg-amber-400/10 px-4 py-4 text-sm text-amber-100">
                          <div className="flex items-center gap-2 font-semibold"><AlertTriangle className="h-4 w-4" strokeWidth={2} />Peso estimado em uso</div>
                          <p className="mt-2 text-amber-50/90">Dose e taxa só devem ser lidas com a fonte do peso visível. Não equivaler a peso verificado.</p>
                        </div>
                      ) : (
                        <div className="mt-4 rounded-[22px] border border-emerald-400/18 bg-emerald-500/10 px-4 py-4 text-sm text-emerald-100">
                          <div className="flex items-center gap-2 font-semibold"><CheckCircle2 className="h-4 w-4" strokeWidth={2} />Peso rastreável</div>
                          <p className="mt-2 text-emerald-50/90">Fonte e timestamp permanecem visíveis durante toda a revisão.</p>
                        </div>
                      )}
                      <div className="mt-4 space-y-2 text-sm text-slate-300">
                        <p>Compatibilidade Y e concentração precisam permanecer explícitas na infusão.</p>
                        <p>Não inferir administração real a partir desta consulta isolada.</p>
                        <p>Confirmar via, apresentação e dose institucional antes do uso clínico.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5">
                  <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                    <div>
                      <p className="ps-app-label">Checklist de revisão</p>
                      <div className="mt-4 space-y-3">
                        {checklist.map((item, index) => (
                          <div key={item} className="flex gap-3 rounded-[20px] border border-white/8 bg-white/[0.035] px-4 py-4 text-sm text-slate-200">
                            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-semibold text-white">{index + 1}</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="ps-app-label">Risco e compatibilidade</p>
                      <div className="mt-4 space-y-3">
                        <div className="rounded-[20px] border border-white/8 bg-white/[0.035] px-4 py-4">
                          <p className="text-sm font-semibold text-white">Apresentações</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {presentationPreview.map((item) => (
                              <span key={item} className="ps-app-pill">{item}</span>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-[20px] border border-white/8 bg-white/[0.035] px-4 py-4">
                          <p className="text-sm font-semibold text-white">Efeitos adversos críticos</p>
                          <p className="mt-2 text-sm text-slate-400">{adversePreview.join(' · ') || 'Sem dados'}</p>
                        </div>
                        <div className="rounded-[20px] border border-white/8 bg-white/[0.035] px-4 py-4">
                          <p className="text-sm font-semibold text-white">Compatibilidade Y</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {compatibilityPreview.length > 0 ? compatibilityPreview.map((entry) => (
                              <span key={`${entry.drugId}-${entry.status}`} className="ps-app-pill">
                                {entry.drugName}: {entry.status}
                              </span>
                            )) : <span className="text-sm text-slate-400">Sem dados</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-5">
                <section className="rounded-[32px] border border-white/10 bg-[#08101b]/88 p-5">
                  <p className="ps-app-label">Evidência operacional</p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-[20px] border border-white/8 bg-white/[0.035] px-4 py-4">
                      <p className="text-sm font-semibold text-white">Contraindicações críticas</p>
                      <p className="mt-2 text-sm text-slate-400">{contraindicationSummary}</p>
                    </div>
                    <div className="rounded-[20px] border border-white/8 bg-white/[0.035] px-4 py-4">
                      <p className="text-sm font-semibold text-white">Origem clínica</p>
                      <p className="mt-2 text-sm text-slate-400">Bootstrap do protocolo. Validar referência institucional antes de usar como instrução definitiva.</p>
                    </div>
                    <div className="rounded-[20px] border border-white/8 bg-white/[0.035] px-4 py-4">
                      <p className="text-sm font-semibold text-white">Leitura segura</p>
                      <p className="mt-2 text-sm text-slate-400">Este sheet serve para revisão operacional rápida. Consulta, revisão e confirmação continuam separados.</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] px-5 py-4 md:px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-slate-400">Revisar primeiro. Confirmar uso só quando peso, preparo e acesso estiverem explícitos.</p>
              <div className="flex flex-col gap-3 md:flex-row">
              <button data-testid="ps-drug-sheet-review" type="button" onClick={() => onReview(drug.id)} className="ps-app-interactive inline-flex items-center justify-center gap-2 rounded-[24px] border border-amber-400/18 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-100">
                <CheckCircle2 className="h-4 w-4" strokeWidth={2} />Marcar revisado
              </button>
              <button data-testid="ps-drug-sheet-confirm" type="button" onClick={() => onConfirm(drug.id)} className="ps-app-interactive inline-flex items-center justify-center gap-2 rounded-[24px] border border-emerald-400/18 bg-emerald-500/12 px-4 py-3 text-sm font-semibold text-emerald-100">
                Confirmar uso
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
