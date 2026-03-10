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

  return (
    <div className="fixed inset-0 z-50 bg-[#02060d]/74 backdrop-blur-xl">
      <div className="flex min-h-screen items-end justify-center p-3 md:items-center md:p-6">
        <div data-testid="ps-drug-sheet" className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,#0a1526_0%,#08101d_100%)] shadow-[0_32px_120px_rgba(0,0,0,0.5)]">
          <div className="flex items-start justify-between gap-4 border-b border-white/8 px-5 py-5 md:px-6">
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/18 bg-amber-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-200">
                <Pill className="h-3.5 w-3.5" strokeWidth={2} />Drug sheet
              </div>
              <h2 className="text-2xl font-bold tracking-[-0.03em] text-white">{drug.genericName}</h2>
              <p className="mt-2 text-sm text-slate-400">Dose, preparo e checkpoints no mesmo plano operacional.</p>
            </div>
            <button data-testid="ps-drug-sheet-close" type="button" onClick={onClose} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 apple-transition-fast hover:bg-white/[0.08]">
              <X className="h-4.5 w-4.5" strokeWidth={2} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 md:px-6 md:py-6">
            <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-5">
                <section className="ps-app-surface-strong rounded-[30px] p-5">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="ps-app-pill"><Weight className="h-3.5 w-3.5 text-amber-300" strokeWidth={2} />{weightLabel}</span>
                    <span className="ps-app-pill">Fonte: {patient.weightSource}</span>
                    <span className="ps-app-pill">{weightTimestamp}</span>
                  </div>

                  {isEstimated && (
                    <div className="mb-4 rounded-[24px] border border-amber-400/22 bg-amber-400/10 px-4 py-4 text-sm text-amber-100">
                      <div className="mb-2 flex items-center gap-2 font-semibold"><AlertTriangle className="h-4 w-4" strokeWidth={2} />Peso estimado em uso</div>
                      <p className="text-amber-50/90">Manter a fonte do peso explícita antes de revisar ou confirmar taxa e dose.</p>
                    </div>
                  )}

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.035))] px-4 py-4">
                      <p className="ps-app-label">Dose / faixa</p>
                      <p className="mt-2 text-lg font-semibold text-white">{primaryDosing ? `${primaryDosing.doseRange.min}-${primaryDosing.doseRange.max} ${primaryDosing.doseUnit}` : 'Ver protocolo institucional'}</p>
                      <p className="mt-1 text-sm text-slate-400">{primaryDosing?.indication || 'Base do cálculo: peso + concentração local'}</p>
                    </div>
                    <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.035))] px-4 py-4">
                      <p className="ps-app-label">Diluição / preparo</p>
                      <p className="mt-2 text-lg font-semibold text-white">{primaryDosing?.infusion?.dilution.description || primaryDosing?.route || 'Ver protocolo institucional'}</p>
                      <p className="mt-1 text-sm text-slate-400">Pré-visualização operacional, não ordem pronta</p>
                    </div>
                  </div>
                </section>

                <section className="ps-app-surface rounded-[30px] p-5">
                  <div className="mb-3 flex items-center gap-2 ps-app-label"><Syringe className="h-3.5 w-3.5 text-cyan-300" strokeWidth={2} />Safety model</div>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4">Compatibilidade Y e concentração precisam permanecer explícitas na infusão.</div>
                    <div className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4">Não inferir administração real a partir desta consulta isolada.</div>
                    <div className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4">Confirmar via, apresentação e dose institucional antes do uso clínico.</div>
                  </div>
                </section>
              </div>

              <div className="space-y-5">
                <section className="ps-app-surface rounded-[30px] p-5">
                  <p className="ps-app-label">Checks obrigatórios</p>
                  <div className="mt-4 space-y-3">
                    {[
                      'Conferir peso e fonte do peso.',
                      'Conferir apresentação e concentração final.',
                      'Conferir linha / acesso e monitorização.',
                    ].map((item) => (
                      <div key={item} className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-slate-200">{item}</div>
                    ))}
                  </div>
                </section>

                <section className="ps-app-surface rounded-[30px] p-5">
                  <p className="ps-app-label">Contexto de cálculo</p>
                  <div className="mt-4 grid gap-3">
                    <div className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4"><p className="text-sm font-semibold text-white">Via / indicação</p><p className="mt-1 text-sm text-slate-400">{primaryDosing?.route || 'n/a'} · {primaryDosing?.indication || 'n/a'}</p></div>
                    <div className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4"><p className="text-sm font-semibold text-white">Contraindicações críticas</p><p className="mt-1 text-sm text-slate-400">{drug.contraindications.slice(0, 2).join(' · ') || 'Sem dados'}</p></div>
                    <div className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4"><p className="text-sm font-semibold text-white">Origem clínica</p><p className="mt-1 text-sm text-slate-400">Bootstrap do protocolo. Validar referência institucional.</p></div>
                  </div>
                </section>

                <section className="ps-app-surface rounded-[30px] p-5">
                  <p className="ps-app-label">Apresentação / risco / compatibilidade</p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4">
                      <p className="text-sm font-semibold text-white">Apresentações</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {presentationPreview.map((item) => (
                          <span key={item} className="ps-app-pill">{item}</span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4">
                      <p className="text-sm font-semibold text-white">Efeitos adversos críticos</p>
                      <p className="mt-2 text-sm text-slate-400">{adversePreview.join(' · ') || 'Sem dados'}</p>
                    </div>
                    <div className="rounded-[22px] border border-white/8 bg-white/[0.04] px-4 py-4">
                      <p className="text-sm font-semibold text-white">Compatibilidade Y</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {compatibilityPreview.length > 0 ? compatibilityPreview.map((entry) => (
                          <span key={`${entry.drugId}-${entry.status}`} className="ps-app-pill">
                            {entry.drugName}: {entry.status}
                          </span>
                        )) : <span className="text-sm text-slate-400">Sem dados</span>}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="border-t border-white/8 bg-white/[0.03] px-5 py-4 md:px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
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
  );
}
