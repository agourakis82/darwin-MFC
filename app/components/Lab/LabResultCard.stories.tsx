import type { Meta, StoryObj } from '@storybook/react';
import { LabResultCard } from './LabResultCard';
import type { LabResult, LOINCCode } from '@/lib/types/loinc';

const meta: Meta<typeof LabResultCard> = {
  title: 'Components/Lab/LabResultCard',
  component: LabResultCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof LabResultCard>;

// Mock LOINC code
const glucoseLOINC: LOINCCode = {
  code: '2345-7',
  component: 'Glucose',
  property: 'MCnc',
  timing: 'Pt',
  system: 'Ser/Plas',
  scale: 'Qn',
  longCommonName: 'Glucose [Mass/volume] in Serum or Plasma',
  shortName: 'Glucose SerPl-mCnc',
  class: 'CHEM',
  status: 'ACTIVE',
  namePt: 'Glicemia de jejum',
  referenceRange: { low: 70, high: 99, unit: 'mg/dL', population: 'adult' },
  referenceRanges: [{
    low: 70,
    high: 99,
    unit: 'mg/dL',
    criticalLow: 40,
    criticalHigh: 400,
    interpretation: {
      low: 'Hipoglicemia',
      normal: 'Normal',
      high: 'Hiperglicemia',
      criticalLow: 'Hipoglicemia grave',
      criticalHigh: 'Hiperglicemia grave',
    },
  }],
  clinicalInterpretation: {
    lowInterpretation: 'Hipoglicemia pode indicar jejum prolongado, insulina excessiva ou tumor pancreático.',
    highInterpretation: 'Hiperglicemia sugere diabetes mellitus ou pré-diabetes.',
    followUp: 'Repetir exame e solicitar HbA1c se confirmado',
  },
};

export const NormalResult: Story = {
  args: {
    result: {
      id: '1',
      loincCode: '2345-7',
      value: 85,
      unit: 'mg/dL',
      date: new Date('2024-02-01'),
      interpretation: {
        value: 85,
        unit: 'mg/dL',
        status: 'normal',
        statusLabel: 'Normal',
        appliedRange: glucoseLOINC.referenceRanges![0],
        color: 'green',
      },
    },
    loincCode: glucoseLOINC,
  },
};

export const HighResult: Story = {
  args: {
    result: {
      id: '2',
      loincCode: '2345-7',
      value: 125,
      unit: 'mg/dL',
      date: new Date(),
      interpretation: {
        value: 125,
        unit: 'mg/dL',
        status: 'high',
        statusLabel: 'Hiperglicemia',
        appliedRange: glucoseLOINC.referenceRanges![0],
        interpretation: 'Hiperglicemia sugere diabetes mellitus ou pré-diabetes.',
        recommendations: ['Repetir exame e solicitar HbA1c se confirmado'],
        color: 'orange',
      },
      notes: 'Paciente em jejum de 8 horas',
    },
    loincCode: glucoseLOINC,
  },
};

export const LowResult: Story = {
  args: {
    result: {
      id: '3',
      loincCode: '2345-7',
      value: 55,
      unit: 'mg/dL',
      date: new Date(),
      interpretation: {
        value: 55,
        unit: 'mg/dL',
        status: 'low',
        statusLabel: 'Hipoglicemia',
        appliedRange: glucoseLOINC.referenceRanges![0],
        interpretation: 'Hipoglicemia pode indicar jejum prolongado, insulina excessiva ou tumor pancreático.',
        recommendations: ['Monitorar sintomas', 'Ajustar dose de insulina se diabético'],
        color: 'yellow',
      },
    },
    loincCode: glucoseLOINC,
  },
};

export const CriticalHigh: Story = {
  args: {
    result: {
      id: '4',
      loincCode: '2345-7',
      value: 450,
      unit: 'mg/dL',
      date: new Date(),
      interpretation: {
        value: 450,
        unit: 'mg/dL',
        status: 'critical_high',
        statusLabel: 'Hiperglicemia grave',
        appliedRange: glucoseLOINC.referenceRanges![0],
        interpretation: 'Hiperglicemia grave - risco de cetoacidose diabética.',
        recommendations: [
          'Notificar médico imediatamente',
          'Repetir exame e solicitar HbA1c se confirmado',
        ],
        color: 'red',
      },
      notes: 'Paciente sintomático (poliúria, polidipsia)',
    },
    loincCode: glucoseLOINC,
  },
};

export const CriticalLow: Story = {
  args: {
    result: {
      id: '5',
      loincCode: '2345-7',
      value: 35,
      unit: 'mg/dL',
      date: new Date(),
      interpretation: {
        value: 35,
        unit: 'mg/dL',
        status: 'critical_low',
        statusLabel: 'Hipoglicemia grave',
        appliedRange: glucoseLOINC.referenceRanges![0],
        interpretation: 'Hipoglicemia grave - risco de perda de consciência.',
        recommendations: [
          'Notificar médico imediatamente',
          'Administrar glicose se sintomático',
        ],
        color: 'red',
      },
      notes: 'Paciente diabético em uso de insulina NPH',
    },
    loincCode: glucoseLOINC,
  },
};

export const CompactView: Story = {
  args: {
    result: {
      id: '6',
      loincCode: '2345-7',
      value: 110,
      unit: 'mg/dL',
      date: new Date(),
      interpretation: {
        value: 110,
        unit: 'mg/dL',
        status: 'high',
        statusLabel: 'Alto',
        appliedRange: glucoseLOINC.referenceRanges![0],
        color: 'orange',
      },
    },
    loincCode: glucoseLOINC,
    compact: true,
  },
};

export const WithoutInterpretation: Story = {
  args: {
    result: {
      id: '7',
      loincCode: '2345-7',
      value: 90,
      unit: 'mg/dL',
      date: new Date(),
    },
    loincCode: glucoseLOINC,
  },
};
