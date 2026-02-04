import type { Meta, StoryObj } from '@storybook/react';
import { PharmGKBPanel } from './PharmGKBPanel';
import type { PharmGKBData } from '@/lib/types/medicamento';

const meta: Meta<typeof PharmGKBPanel> = {
  title: 'Components/Pharmacogenomics/PharmGKBPanel',
  component: PharmGKBPanel,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PharmGKBPanel>;

// Mock data: Codeína / CYP2D6
const codeineCYP2D6: PharmGKBData = {
  gene: 'CYP2D6',
  level: '1A',
  summary: 'A codeína é um pró-fármaco metabolizado pelo CYP2D6 em morfina (metabólito ativo)',
  guidelineUrl: 'https://cpicpgx.org/guidelines/guideline-for-codeine-and-cyp2d6/',
  variants: [
    {
      allele: '*1/*1',
      phenotype: 'normal_metabolizer',
      frequency: {
        european: 0.77,
        african: 0.83,
        asian: 0.51,
        hispanic: 0.64,
        southAsian: 0.71,
      },
      implications: [
        'Metabolização normal de codeína em morfina',
        'Resposta analgésica esperada com dose padrão',
        'Risco normal de efeitos adversos',
      ],
      dosageRecommendation: {
        recommendation: 'Usar dose padrão de codeína',
        reasoning: 'Função enzimática normal permite metabolização adequada',
        strength: 'strong',
        classification: 'CPIC Level A',
      },
    },
    {
      allele: '*1/*4',
      phenotype: 'intermediate_metabolizer',
      frequency: {
        european: 0.17,
        african: 0.09,
        asian: 0.38,
        hispanic: 0.27,
        southAsian: 0.22,
      },
      implications: [
        'Metabolização reduzida de codeína em morfina',
        'Resposta analgésica pode ser insuficiente',
        'Menor risco de efeitos adversos',
      ],
      dosageRecommendation: {
        recommendation: 'Considerar dose maior de codeína OU escolher analgésico alternativo',
        reasoning: 'Atividade enzimática reduzida resulta em menor formação de morfina',
        strength: 'moderate',
        classification: 'CPIC Level B',
      },
      alternatives: ['tramadol', 'ibuprofeno', 'paracetamol'],
    },
    {
      allele: '*4/*4',
      phenotype: 'poor_metabolizer',
      frequency: {
        european: 0.06,
        african: 0.02,
        asian: 0.11,
        hispanic: 0.09,
        southAsian: 0.07,
      },
      implications: [
        'Metabolização mínima/ausente de codeína em morfina',
        'Resposta analgésica inadequada ou ausente',
        'Risco muito baixo de efeitos adversos opioides',
      ],
      dosageRecommendation: {
        recommendation: 'EVITAR codeína. Escolher analgésico alternativo que não dependa de CYP2D6',
        reasoning: 'Ausência de atividade enzimática impede formação do metabólito ativo (morfina)',
        strength: 'strong',
        classification: 'CPIC Level A - Contraindicação relativa',
      },
      alternatives: ['tramadol', 'morfina', 'ibuprofeno', 'paracetamol'],
    },
    {
      allele: '*1/*2xN',
      phenotype: 'ultra_rapid_metabolizer',
      frequency: {
        european: 0.03,
        african: 0.16,
        asian: 0.02,
        hispanic: 0.05,
        southAsian: 0.09,
      },
      implications: [
        'Metabolização muito rápida de codeína em morfina',
        'Níveis elevados de morfina no plasma',
        'ALTO RISCO de toxicidade opioide (depressão respiratória, sedação excessiva)',
      ],
      dosageRecommendation: {
        recommendation: 'EVITAR codeína. Escolher analgésico alternativo',
        reasoning: 'Atividade enzimática aumentada resulta em formação excessiva de morfina com risco de toxicidade',
        strength: 'strong',
        classification: 'CPIC Level A - Contraindicação relativa',
      },
      alternatives: ['morfina (dose ajustada)', 'ibuprofeno', 'paracetamol', 'tramadol'],
    },
  ],
};

// Mock data: Clopidogrel / CYP2C19
const clopidogrelCYP2C19: PharmGKBData = {
  gene: 'CYP2C19',
  level: '1A',
  summary: 'O clopidogrel é um pró-fármaco ativado pelo CYP2C19',
  guidelineUrl: 'https://cpicpgx.org/guidelines/guideline-for-clopidogrel-and-cyp2c19/',
  variants: [
    {
      allele: '*1/*1',
      phenotype: 'normal_metabolizer',
      frequency: {
        european: 0.65,
        african: 0.82,
        asian: 0.35,
        hispanic: 0.62,
        southAsian: 0.48,
      },
      implications: [
        'Ativação normal de clopidogrel',
        'Efeito antiagregante plaquetário adequado',
        'Risco cardiovascular padrão',
      ],
      dosageRecommendation: {
        recommendation: 'Usar dose padrão de clopidogrel (75 mg/dia)',
        reasoning: 'Função enzimática normal permite ativação adequada',
        strength: 'strong',
        classification: 'CPIC Level A',
      },
    },
    {
      allele: '*1/*2',
      phenotype: 'intermediate_metabolizer',
      frequency: {
        european: 0.27,
        african: 0.15,
        asian: 0.45,
        hispanic: 0.30,
        southAsian: 0.38,
      },
      implications: [
        'Ativação reduzida de clopidogrel',
        'Efeito antiagregante reduzido',
        'RISCO AUMENTADO de eventos cardiovasculares (IAM, AVC, trombose de stent)',
      ],
      dosageRecommendation: {
        recommendation: 'Considerar antiagregante alternativo (prasugrel, ticagrelor) OU aumentar dose de clopidogrel',
        reasoning: 'Atividade enzimática reduzida resulta em menor formação do metabólito ativo',
        strength: 'moderate',
        classification: 'CPIC Level B',
      },
      alternatives: ['prasugrel', 'ticagrelor'],
    },
    {
      allele: '*2/*2',
      phenotype: 'poor_metabolizer',
      frequency: {
        european: 0.02,
        african: 0.01,
        asian: 0.14,
        hispanic: 0.04,
        southAsian: 0.09,
      },
      implications: [
        'Ativação mínima de clopidogrel',
        'Efeito antiagregante muito reduzido ou ausente',
        'ALTO RISCO de eventos cardiovasculares (2-3x maior)',
      ],
      dosageRecommendation: {
        recommendation: 'EVITAR clopidogrel. Escolher antiagregante alternativo (prasugrel ou ticagrelor)',
        reasoning: 'Ausência de atividade enzimática impede formação do metabólito ativo',
        strength: 'strong',
        classification: 'CPIC Level A - Contraindicação relativa',
      },
      alternatives: ['prasugrel', 'ticagrelor'],
    },
    {
      allele: '*1/*17',
      phenotype: 'increased_function',
      frequency: {
        european: 0.21,
        african: 0.28,
        asian: 0.04,
        hispanic: 0.16,
        southAsian: 0.19,
      },
      implications: [
        'Ativação aumentada de clopidogrel',
        'Efeito antiagregante aumentado',
        'Risco levemente aumentado de sangramento',
      ],
      dosageRecommendation: {
        recommendation: 'Usar dose padrão de clopidogrel. Monitorar sinais de sangramento',
        reasoning: 'Atividade enzimática aumentada resulta em maior formação do metabólito ativo',
        strength: 'optional',
        classification: 'Observação clínica',
      },
    },
  ],
};

// Mock data: Varfarina / CYP2C9 + VKORC1
const warfarinCYP2C9: PharmGKBData = {
  gene: 'CYP2C9',
  level: '1A',
  summary: 'CYP2C9 metaboliza a S-varfarina (enantiômero mais potente)',
  guidelineUrl: 'https://cpicpgx.org/guidelines/guideline-for-warfarin-and-cyp2c9-and-vkorc1/',
  variants: [
    {
      allele: '*1/*1',
      phenotype: 'normal_metabolizer',
      frequency: {
        european: 0.63,
        african: 0.85,
        asian: 0.89,
        hispanic: 0.71,
        southAsian: 0.78,
      },
      implications: [
        'Metabolização normal de varfarina',
        'Dose terapêutica padrão (5-7 mg/dia)',
        'Tempo de ajuste de dose normal',
      ],
      dosageRecommendation: {
        recommendation: 'Iniciar com dose padrão (5 mg/dia), ajustar conforme INR',
        reasoning: 'Função enzimática normal',
        strength: 'strong',
      },
    },
    {
      allele: '*1/*2',
      phenotype: 'intermediate_metabolizer',
      frequency: {
        european: 0.24,
        african: 0.12,
        asian: 0.09,
        hispanic: 0.18,
      },
      implications: [
        'Metabolização reduzida de varfarina',
        'RISCO AUMENTADO de sangramento com dose padrão',
        'Necessita dose menor (3-5 mg/dia)',
      ],
      dosageRecommendation: {
        recommendation: 'Reduzir dose inicial em 25-50% (2.5-3.75 mg/dia), ajustar conforme INR',
        reasoning: 'Atividade enzimática reduzida resulta em clearance diminuído',
        strength: 'strong',
        classification: 'CPIC Level A',
      },
    },
    {
      allele: '*2/*2',
      phenotype: 'poor_metabolizer',
      frequency: {
        european: 0.01,
        african: 0.005,
        asian: 0.01,
        hispanic: 0.01,
      },
      implications: [
        'Metabolização muito reduzida de varfarina',
        'ALTO RISCO de sangramento com dose padrão',
        'Necessita dose muito menor (1-3 mg/dia)',
      ],
      dosageRecommendation: {
        recommendation: 'Reduzir dose inicial em 50-75% (1.25-2.5 mg/dia), monitorar INR frequentemente',
        reasoning: 'Clearance muito reduzido com acúmulo de droga',
        strength: 'strong',
        classification: 'CPIC Level A',
      },
      alternatives: ['dabigatrana', 'rivaroxabana', 'apixabana'],
    },
  ],
};

export const CodeineCYP2D6: Story = {
  args: {
    pharmgkbData: [codeineCYP2D6],
    medicationName: 'Codeína',
  },
};

export const ClopidogrelCYP2C19: Story = {
  args: {
    pharmgkbData: [clopidogrelCYP2C19],
    medicationName: 'Clopidogrel',
  },
};

export const WarfarinCYP2C9: Story = {
  args: {
    pharmgkbData: [warfarinCYP2C9],
    medicationName: 'Varfarina',
  },
};

export const MultipleGenes: Story = {
  args: {
    pharmgkbData: [warfarinCYP2C9, {
      gene: 'VKORC1',
      level: '1A',
      summary: 'VKORC1 é o alvo farmacológico da varfarina',
      guidelineUrl: 'https://cpicpgx.org/guidelines/guideline-for-warfarin-and-cyp2c9-and-vkorc1/',
      variants: [
        {
          allele: '-1639 G>A (rs9923231)',
          phenotype: 'decreased_function',
          frequency: {
            european: 0.37,
            african: 0.14,
            asian: 0.89,
            hispanic: 0.44,
          },
          implications: [
            'Sensibilidade aumentada à varfarina',
            'Necessita dose menor',
          ],
          dosageRecommendation: {
            recommendation: 'Reduzir dose inicial em 30-40%',
            reasoning: 'Variante de sensibilidade aumentada',
            strength: 'strong',
          },
        },
      ],
    }],
    medicationName: 'Varfarina',
  },
};

export const EmptyState: Story = {
  args: {
    pharmgkbData: [],
    medicationName: 'Paracetamol',
  },
};
