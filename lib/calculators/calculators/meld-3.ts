/**
 * MELD 3.0
 * ========
 *
 * Current adult liver transplant allocation model adopted in Brazil.
 */

import type { ClinicalCalculator, ScoreInterpretation } from '../types';

export const meld3: ClinicalCalculator = {
  id: 'meld-3',
  name: 'MELD 3.0 (Model for End-Stage Liver Disease)',
  abbreviation: 'MELD 3.0',
  category: 'hepatology',
  description:
    'Estima gravidade da doença hepática avançada e compõe a priorização para transplante hepático em adultos no Brasil.',
  purpose:
    'Calcular o MELD 3.0 com bilirrubina, INR, creatinina, sódio, albumina, sexo e diálise. A posição final em lista depende também das regras do Sistema Nacional de Transplantes e de situações especiais.',

  indications: [
    'Candidatos adultos ou com 12 anos ou mais a transplante hepático',
    'Estratificação prognóstica em doença hepática crônica avançada',
    'Reavaliação seriada por equipe de hepatologia ou transplante',
  ],

  contraindications: [
    'Crianças menores de 12 anos, para as quais se utiliza PELD',
    'Uso isolado para decidir indicação, contraindicação ou posição final em lista',
  ],

  inputs: [
    {
      id: 'creatinine',
      label: 'Creatinina',
      type: 'number',
      unit: 'mg/dL',
      description: 'O cálculo utiliza valores entre 1,0 e 3,0 mg/dL',
      required: true,
      validation: { min: 0.1, max: 15, step: 0.1 },
    },
    {
      id: 'bilirubin',
      label: 'Bilirrubina total',
      type: 'number',
      unit: 'mg/dL',
      description: 'Valores abaixo de 1,0 mg/dL são ajustados para 1,0',
      required: true,
      validation: { min: 0.1, max: 50, step: 0.1 },
    },
    {
      id: 'inr',
      label: 'INR',
      type: 'number',
      description: 'Razão normalizada internacional',
      required: true,
      validation: { min: 0.5, max: 10, step: 0.1 },
    },
    {
      id: 'sodium',
      label: 'Sódio',
      type: 'number',
      unit: 'mEq/L',
      description: 'O cálculo utiliza valores entre 125 e 137 mEq/L',
      required: true,
      validation: { min: 100, max: 170, step: 1 },
    },
    {
      id: 'albumin',
      label: 'Albumina',
      type: 'number',
      unit: 'g/dL',
      description: 'O cálculo utiliza valores entre 1,5 e 3,5 g/dL',
      required: true,
      validation: { min: 0.5, max: 6, step: 0.1 },
    },
    {
      id: 'sex',
      label: 'Sexo',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: 'Masculino' },
        { value: 1, label: 'Feminino' },
      ],
    },
    {
      id: 'dialysis',
      label: 'Diálise ao menos 2 vezes na última semana',
      type: 'boolean',
      required: true,
      options: [
        { value: 0, label: 'Não' },
        { value: 1, label: 'Sim' },
      ],
    },
  ],

  calculate: (inputs) => {
    let creatinine = Math.max(1, Math.min(3, inputs.creatinine || 1));
    if (inputs.dialysis === 1) creatinine = 3;

    const bilirubin = Math.max(1, inputs.bilirubin || 1);
    const inr = Math.max(1, inputs.inr || 1);
    const sodium = Math.max(125, Math.min(137, inputs.sodium || 137));
    const albumin = Math.max(1.5, Math.min(3.5, inputs.albumin || 3.5));
    const female = inputs.sex === 1 ? 1 : 0;

    const score =
      1.33 * female +
      4.56 * Math.log(bilirubin) +
      0.82 * (137 - sodium) -
      0.24 * (137 - sodium) * Math.log(bilirubin) +
      9.09 * Math.log(inr) +
      11.14 * Math.log(creatinine) +
      1.85 * (3.5 - albumin) -
      1.83 * (3.5 - albumin) * Math.log(creatinine) +
      6;

    return Math.round(Math.max(6, Math.min(40, score)));
  },

  interpret: (score): ScoreInterpretation => {
    const commonNotes = [
      'A posição em lista não é definida apenas por este número: situações especiais e regras do SNT também se aplicam.',
      'Confirmar dados laboratoriais, diálise e critérios regulatórios com a equipe transplantadora.',
    ];

    if (score < 15) {
      return {
        score,
        category: 'Menor gravidade relativa',
        risk: 'low',
        recommendation: 'Manter seguimento especializado e recalcular conforme evolução clínica e laboratorial.',
        notes: commonNotes,
      };
    }
    if (score < 25) {
      return {
        score,
        category: 'Gravidade intermediária',
        risk: 'moderate',
        recommendation: 'Revisar elegibilidade, complicações e periodicidade de atualização com hepatologia/transplante.',
        notes: commonNotes,
      };
    }
    if (score < 35) {
      return {
        score,
        category: 'Alta gravidade relativa',
        risk: 'high',
        recommendation: 'Exige acompanhamento próximo pela equipe transplantadora e atualização laboratorial oportuna.',
        notes: commonNotes,
      };
    }
    return {
      score,
      category: 'Gravidade crítica relativa',
      risk: 'critical',
      recommendation: 'Priorizar avaliação imediata pela equipe transplantadora e manejo das complicações.',
      notes: commonNotes,
    };
  },

  citations: [
    {
      authors: 'Kim WR, Mannalithara A, Heimbach JK, et al.',
      title: 'MELD 3.0: The Model for End-Stage Liver Disease Updated for the Modern Era',
      journal: 'Gastroenterology',
      year: 2021,
      volume: '161(6):1887-1895.e4',
      doi: '10.1053/j.gastro.2021.08.050',
      pmid: '34481845',
    },
    {
      authors: 'Ministério da Saúde',
      title: 'Portaria GM/MS nº 8.041, de 26 de setembro de 2025',
      journal: 'Diário Oficial da União',
      year: 2025,
      url: 'https://bvsms.saude.gov.br/bvs/saudelegis/gm/2025/prt8041_26_09_2025.html',
    },
  ],

  validationStudy:
    'Desenvolvido e validado com dados da lista de transplante dos Estados Unidos; adotado na regulamentação brasileira de transplante hepático em 2025.',
  notes: [
    'Limites do cálculo: creatinina 1,0-3,0 mg/dL; bilirrubina e INR com mínimo 1,0; sódio 125-137 mEq/L; albumina 1,5-3,5 g/dL.',
    'Em diálise pelo menos duas vezes na semana anterior, a creatinina é definida como 3,0 mg/dL.',
  ],
  relatedCalculators: ['meld-na', 'child-pugh'],
  version: '3.0',
  lastUpdated: '2026-07-29',
};
