/**
 * Prontuario adapter for the canonical interaction catalog.
 *
 * This module intentionally contains no interaction rules. The catalog remains
 * reference-only until its sources and reviewers are bound into a Darwin Rx receipt.
 */

import type { SOAPData } from '@/app/components/Export/SOAPExport';
import { medicamentosConsolidados as todosMedicamentos } from '@/lib/data/medicamentos/index';
import {
  interacoesMedicamentosas,
  type GravidadeInteracao as CatalogSeverity,
  type InteracaoMedicamentosa,
} from '@/lib/data/interacoes-medicamentosas';
import type { Medicamento } from '@/lib/types/medicamento';
import { getConsultationHistory } from './recommendations';

export type GravidadeInteracao = CatalogSeverity | 'desconhecida';

export interface DrugInteraction {
  medicamento1: { id: string; nome: string };
  medicamento2: { id: string; nome: string };
  gravidade: GravidadeInteracao;
  descricao: string;
  mecanismo?: string;
  conduta: string;
  evidencia?: string;
  referencias?: string[];
}

export interface InteractionAlert {
  id: string;
  interaction: DrugInteraction;
  contexto: 'prescricao_atual' | 'historico' | 'ambos';
  prioridade: 'alta' | 'media' | 'baixa';
  timestamp: Date;
}

export const INTERACTION_KNOWLEDGE_STATUS = {
  status: 'reference-only' as const,
  coverage: 'partial-unreviewed' as const,
  ruleCount: interacoesMedicamentosas.length,
  absenceMeaning: 'not-found-not-cleared' as const,
};

const TOKEN_ALIASES: Record<string, string> = {
  'acido-acetilsalicilico': 'aas',
  'acido-acetilsalicilico-aas': 'aas',
  aspirina: 'aas',
  warfarina: 'varfarina',
};

function canonicalToken(value: string): string {
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return TOKEN_ALIASES[normalized] || normalized;
}

function medicationTokens(medication: Medicamento): Set<string> {
  return new Set([
    canonicalToken(medication.id),
    canonicalToken(medication.nomeGenerico),
    ...(medication.nomesComerciais || []).map(canonicalToken),
  ]);
}

function findMedicationByName(name: string): Medicamento | null {
  const token = canonicalToken(name);
  return todosMedicamentos.find(medication => medicationTokens(medication).has(token)) || null;
}

function pairMatches(
  rule: InteracaoMedicamentosa,
  medication1: Medicamento,
  medication2: Medicamento,
): boolean {
  const first = canonicalToken(rule.medicamento1);
  const second = canonicalToken(rule.medicamento2);
  const tokens1 = medicationTokens(medication1);
  const tokens2 = medicationTokens(medication2);
  return (tokens1.has(first) && tokens2.has(second))
    || (tokens1.has(second) && tokens2.has(first));
}

function toInteraction(
  rule: InteracaoMedicamentosa,
  medication1: Medicamento,
  medication2: Medicamento,
): DrugInteraction {
  return {
    medicamento1: { id: medication1.id, nome: medication1.nomeGenerico },
    medicamento2: { id: medication2.id, nome: medication2.nomeGenerico },
    gravidade: rule.gravidade,
    descricao: rule.efeito,
    mecanismo: rule.mecanismo.replaceAll('_', ' '),
    conduta: rule.conduta,
    evidencia: rule.evidencia,
    referencias: rule.fontes,
  };
}

function priorityFor(severity: GravidadeInteracao): InteractionAlert['prioridade'] {
  if (severity === 'contraindicada' || severity === 'grave') return 'alta';
  if (severity === 'leve') return 'baixa';
  return 'media';
}

function explicitMedications(soapData: Partial<SOAPData>): Medicamento[] {
  const seen = new Set<string>();
  const result: Medicamento[] = [];
  for (const prescription of soapData.plano?.prescricoes || []) {
    const medication = findMedicationByName(prescription.medicamento);
    if (medication && !seen.has(medication.id)) {
      seen.add(medication.id);
      result.push(medication);
    }
  }
  return result;
}

function analyzePairs(
  firstList: Medicamento[],
  secondList: Medicamento[],
  contexto: InteractionAlert['contexto'],
  sameList: boolean,
): InteractionAlert[] {
  const alerts: InteractionAlert[] = [];
  const seen = new Set<string>();
  for (let firstIndex = 0; firstIndex < firstList.length; firstIndex += 1) {
    const start = sameList ? firstIndex + 1 : 0;
    for (let secondIndex = start; secondIndex < secondList.length; secondIndex += 1) {
      const medication1 = firstList[firstIndex];
      const medication2 = secondList[secondIndex];
      if (medication1.id === medication2.id) continue;
      const pairId = [medication1.id, medication2.id].sort().join('::');
      if (seen.has(pairId)) continue;
      const rule = interacoesMedicamentosas.find(candidate => pairMatches(candidate, medication1, medication2));
      if (!rule) continue;
      seen.add(pairId);
      const interaction = toInteraction(rule, medication1, medication2);
      alerts.push({
        id: `${contexto}:${rule.id}:${pairId}`,
        interaction,
        contexto,
        prioridade: priorityFor(interaction.gravidade),
        timestamp: new Date(0),
      });
    }
  }
  return alerts;
}

function sortAlerts(alerts: InteractionAlert[]): InteractionAlert[] {
  const priority = { alta: 3, media: 2, baixa: 1 } as const;
  return alerts.sort((left, right) => priority[right.prioridade] - priority[left.prioridade]);
}

export function analyzeCurrentSOAPInteractions(soapData: Partial<SOAPData>): InteractionAlert[] {
  const medications = explicitMedications(soapData);
  return sortAlerts(analyzePairs(medications, medications, 'prescricao_atual', true));
}

export function analyzeMedicationIds(medicationIds: string[]): InteractionAlert[] {
  const medications = medicationIds
    .map(id => todosMedicamentos.find(medication => medication.id === id))
    .filter((medication): medication is Medicamento => medication !== undefined);
  return sortAlerts(analyzePairs(medications, medications, 'prescricao_atual', true));
}

export function analyzeInteractionsWithHistory(
  currentSOAP: Partial<SOAPData>,
  historyLimit = 10,
): InteractionAlert[] {
  const current = explicitMedications(currentSOAP);
  const history = getConsultationHistory()
    .slice(0, historyLimit)
    .flatMap(consultation => explicitMedications(consultation.soapData));
  const combined = [
    ...analyzePairs(current, current, 'prescricao_atual', true),
    ...analyzePairs(current, history, 'historico', false),
  ];
  const unique = new Map<string, InteractionAlert>();
  for (const alert of combined) {
    const key = [alert.interaction.medicamento1.id, alert.interaction.medicamento2.id].sort().join('::');
    const existing = unique.get(key);
    if (!existing || alert.prioridade === 'alta') unique.set(key, alert);
  }
  return sortAlerts([...unique.values()]);
}

export function getInteractionSeverityStyle(gravidade: GravidadeInteracao): {
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
} {
  switch (gravidade) {
    case 'contraindicada':
    case 'grave':
      return { color: 'text-red-700 dark:text-red-300', bgColor: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-500 dark:border-red-700', icon: 'alert-triangle' };
    case 'moderada':
      return { color: 'text-orange-700 dark:text-orange-300', bgColor: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-500 dark:border-orange-700', icon: 'zap' };
    case 'leve':
      return { color: 'text-amber-700 dark:text-amber-300', bgColor: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-500 dark:border-amber-700', icon: 'info' };
    default:
      return { color: 'text-slate-700 dark:text-slate-300', bgColor: 'bg-slate-50 dark:bg-slate-900/30', borderColor: 'border-slate-300 dark:border-slate-700', icon: 'info' };
  }
}
