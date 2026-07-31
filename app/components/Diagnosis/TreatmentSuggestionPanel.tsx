'use client';

import { AlertTriangle, Check, ExternalLink, Pill, Plus, ShieldCheck } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getMedicamentosForDoenca, type MedicamentoReference } from '@/lib/data/cross-references';
import { todasDoencas } from '@/lib/data/doencas/index';
import { medicamentosConsolidados } from '@/lib/data/medicamentos/index';
import { patientAgeInYears, type PatientAgeUnit } from '@/lib/utils/differential-diagnosis';

interface Prescription {
  medicamento: string;
  posologia: string;
  duracao?: string;
}

interface TreatmentSuggestionPanelProps {
  doencaId: string;
  prescriptions: Prescription[];
  patientAge?: string;
  patientAgeUnit?: PatientAgeUnit;
  patientWeightKg?: string;
  onAddMedication: (prescription: Prescription) => void;
}

const usageLabels: Record<MedicamentoReference['tipoUso'], string> = {
  primeira_linha: 'Primeira linha',
  segunda_linha: 'Segunda linha',
  alternativa: 'Alternativa',
  adjuvante: 'Adjuvante',
};

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function calculateWeightReference(dosage: string, weightKg?: number): string | null {
  if (!weightKg || weightKg <= 0) return null;
  const normalizedDosage = dosage.replace(',', '.');
  const range = normalizedDosage.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*mg\/kg\/dia/i);
  if (range) {
    const minimum = Number(range[1]) * weightKg;
    const maximum = Number(range[2]) * weightKg;
    return `Para ${weightKg} kg: ${minimum.toFixed(0)}-${maximum.toFixed(0)} mg/dia`;
  }

  const single = normalizedDosage.match(/(\d+(?:\.\d+)?)\s*mg\/kg\/dia/i);
  if (single) {
    const total = Number(single[1]) * weightKg;
    return `Para ${weightKg} kg: ${total.toFixed(0)} mg/dia`;
  }

  const perDose = normalizedDosage.match(/(\d+(?:\.\d+)?)\s*mg\/kg(?:\/dose)?/i);
  if (perDose) {
    const total = Number(perDose[1]) * weightKg;
    return `Para ${weightKg} kg: ${total.toFixed(0)} mg por dose`;
  }

  return null;
}

export default function TreatmentSuggestionPanel({
  doencaId,
  prescriptions,
  patientAge = '',
  patientAgeUnit = 'anos',
  patientWeightKg = '',
  onAddMedication,
}: TreatmentSuggestionPanelProps) {
  const doenca = todasDoencas.find(item => item.id === doencaId);
  if (!doenca) return null;

  const curated = getMedicamentosForDoenca(doencaId);
  const references: MedicamentoReference[] = curated.length > 0
    ? curated
    : (doenca.medicamentos || []).map(medicamentoId => {
        const medication = medicamentosConsolidados.find(item => item.id === medicamentoId);
        const adultDose = medication?.posologias?.[0]?.adultos;
        return {
          medicamentoId,
          nomeGenerico: medication?.nomeGenerico || medicamentoId,
          tipoUso: 'primeira_linha',
          posologiaResumida: adultDose
            ? `${adultDose.dose}${adultDose.frequencia ? ` ${adultDose.frequencia}` : ''}`
            : undefined,
          disponivelSUS: medication?.rename === true,
        };
      });

  if (references.length === 0) return null;

  const numericAge = patientAge === '' ? undefined : Number(patientAge.replace(',', '.'));
  const numericWeight = patientWeightKg === '' ? undefined : Number(patientWeightKg.replace(',', '.'));
  const ageYears = patientAgeInYears({ ageValue: numericAge, ageUnit: patientAgeUnit });
  const ageKnown = ageYears !== undefined;
  const pediatric = ageKnown && ageYears < 18;
  const pharmacologicalGuidance = doenca.quickView?.tratamentoPrimeiraLinha?.farmacologico || [];
  const contextLabel = ageKnown
    ? `${pediatric ? 'Posologia pediátrica' : 'Posologia adulta'} · ${patientAge} ${patientAgeUnit}${numericWeight ? ` · ${numericWeight} kg` : ''}`
    : 'Informe idade para liberar a prescrição';

  return (
    <section className="overflow-hidden rounded-md border border-emerald-300/25 bg-[#071319]" aria-labelledby="treatment-suggestions-title">
      <div className="flex flex-col gap-3 border-b border-white/10 bg-emerald-300/[0.05] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-emerald-300/25 bg-emerald-300/10">
            <Pill className="h-4 w-4 text-emerald-300" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase text-emerald-300">Conduta vinculada à hipótese</p>
            <h2 id="treatment-suggestions-title" className="text-base font-semibold leading-snug text-white">
              Opções para {doenca.titulo}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
          {contextLabel}
        </div>
      </div>

      <div className="divide-y divide-white/[0.07]">
        {references.map(reference => {
          const medication = medicamentosConsolidados.find(item =>
            item.id === reference.medicamentoId || normalize(item.nomeGenerico) === normalize(reference.nomeGenerico)
          );
          const adultDose = medication?.posologias?.[0]?.adultos;
          const pediatricPosology = medication?.posologias?.find(item => item.pediatrico)?.pediatrico;
          const contextualDose = pharmacologicalGuidance.find(instruction =>
            normalize(instruction).includes(normalize(reference.nomeGenerico))
          );
          const adultDosage = reference.posologiaResumida || (adultDose
            ? `${adultDose.dose}${adultDose.frequencia ? ` ${adultDose.frequencia}` : ''}`
            : null);
          const pediatricDosage = contextualDose || (pediatricPosology
            ? `${pediatricPosology.dose}${pediatricPosology.frequencia ? ` · ${pediatricPosology.frequencia}` : ''}`
            : null);
          const baseDosage = pediatric ? pediatricDosage : adultDosage;
          const weightBased = pediatric && Boolean(baseDosage && /\/kg/i.test(baseDosage));
          const calculatedWeightReference = baseDosage ? calculateWeightReference(baseDosage, numericWeight) : null;
          const dosage = baseDosage
            ? `${baseDosage}${calculatedWeightReference ? ` · ${calculatedWeightReference}` : ''}`
            : pediatric
              ? 'Sem posologia pediátrica estruturada; consultar protocolo ou bula'
              : 'Consultar bula e individualizar posologia';
          const alreadyAdded = prescriptions.some(item =>
            normalize(item.medicamento) === normalize(reference.nomeGenerico)
          );
          const canAdd = ageKnown && Boolean(baseDosage) && (!weightBased || Boolean(numericWeight)) && !alreadyAdded;
          const actionLabel = alreadyAdded
            ? 'No plano'
            : !ageKnown
              ? 'Informe idade'
              : weightBased && !numericWeight
                ? 'Informe peso'
                : !baseDosage
                  ? 'Dose indisponível'
                  : 'Adicionar ao plano';

          return (
            <div key={reference.medicamentoId} className="grid gap-3 px-4 py-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-zinc-100">{reference.nomeGenerico}</h3>
                  <span className="rounded border border-cyan-300/20 bg-cyan-300/[0.07] px-1.5 py-0.5 text-[10px] font-semibold uppercase text-cyan-200">
                    {usageLabels[reference.tipoUso]}
                  </span>
                  {reference.disponivelSUS && (
                    <span className="rounded border border-emerald-300/20 bg-emerald-300/[0.07] px-1.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-200">
                      SUS / RENAME
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-zinc-300"><span className="text-zinc-500">{pediatric ? 'Dose pediátrica:' : 'Dose de referência:'}</span> {dosage}</p>
                {weightBased && !numericWeight && (
                  <p className="mt-1 text-xs font-medium text-amber-300">Informe o peso para calcular e liberar esta prescrição.</p>
                )}
                {reference.indicacaoEspecifica && <p className="mt-0.5 text-xs text-zinc-500">{reference.indicacaoEspecifica}</p>}
              </div>

              <div className="flex items-center gap-2">
                {medication && (
                  <Link
                    href={`/medicamentos/${medication.id}`}
                    target="_blank"
                    className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/15 px-3 text-xs font-medium text-zinc-200 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
                  >
                    Bula <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                )}
                <button
                  type="button"
                  disabled={!canAdd}
                  onClick={() => onAddMedication({ medicamento: reference.nomeGenerico, posologia: dosage, duracao: '' })}
                  className="inline-flex h-9 items-center gap-1.5 rounded-md bg-emerald-400 px-3 text-xs font-semibold text-[#04110d] transition-colors hover:bg-emerald-300 disabled:cursor-default disabled:bg-white/10 disabled:text-zinc-500"
                >
                  {alreadyAdded ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Plus className="h-3.5 w-3.5" aria-hidden="true" />}
                  {actionLabel}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 border-t border-amber-300/15 bg-amber-300/[0.04] px-4 py-3 text-xs leading-relaxed text-zinc-400">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
        <p>Confirme diagnóstico, indicação, alergias, interações, apresentação, dose máxima e ajustes renal/hepático. Cálculos por peso são referências e exigem conferência profissional antes da prescrição.</p>
      </div>
    </section>
  );
}
