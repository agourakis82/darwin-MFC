import type { Meta, StoryObj } from '@storybook/react';
import { LabResultsTable } from './LabResultsTable';
import type { LabResult, LOINCCode } from '@/lib/types/loinc';

const meta: Meta<typeof LabResultsTable> = {
  title: 'Components/Lab/LabResultsTable',
  component: LabResultsTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof LabResultsTable>;

// Mock LOINC codes
const mockLOINCCodes = new Map<string, LOINCCode>([
  ['2345-7', {
    code: '2345-7',
    component: 'Glucose',
    property: 'MCnc',
    timing: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Glucose [Mass/volume] in Serum or Plasma',
    shortName: 'Glucose SerPl',
    class: 'CHEM',
    status: 'ACTIVE',
    namePt: 'Glicemia',
  }],
  ['4548-4', {
    code: '4548-4',
    component: 'Hemoglobin A1c',
    property: 'MFr',
    timing: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    longCommonName: 'Hemoglobin A1c/Hemoglobin.total in Blood',
    shortName: 'HbA1c',
    class: 'CHEM',
    status: 'ACTIVE',
    namePt: 'Hemoglobina Glicada',
  }],
  ['2093-3', {
    code: '2093-3',
    component: 'Cholesterol.total',
    property: 'MCnc',
    timing: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Cholesterol [Mass/volume] in Serum or Plasma',
    shortName: 'Cholesterol',
    class: 'CHEM',
    status: 'ACTIVE',
    namePt: 'Colesterol Total',
  }],
  ['718-7', {
    code: '718-7',
    component: 'Hemoglobin',
    property: 'MCnc',
    timing: 'Pt',
    system: 'Bld',
    scale: 'Qn',
    longCommonName: 'Hemoglobin [Mass/volume] in Blood',
    shortName: 'Hemoglobin',
    class: 'HEM/BC',
    status: 'ACTIVE',
    namePt: 'Hemoglobina',
  }],
  ['2160-0', {
    code: '2160-0',
    component: 'Creatinine',
    property: 'MCnc',
    timing: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Creatinine [Mass/volume] in Serum or Plasma',
    shortName: 'Creatinine',
    class: 'CHEM',
    status: 'ACTIVE',
    namePt: 'Creatinina',
  }],
]);

const mockResults: LabResult[] = [
  {
    id: '1',
    loincCode: '2345-7',
    value: 125,
    unit: 'mg/dL',
    date: new Date('2024-02-01'),
    interpretation: {
      value: 125,
      unit: 'mg/dL',
      status: 'high',
      statusLabel: 'Alto',
      appliedRange: {
        low: 70,
        high: 99,
        unit: 'mg/dL',
        interpretation: { low: 'Baixo', normal: 'Normal', high: 'Alto' },
      },
      color: 'orange',
    },
  },
  {
    id: '2',
    loincCode: '4548-4',
    value: 7.2,
    unit: '%',
    date: new Date('2024-02-01'),
    interpretation: {
      value: 7.2,
      unit: '%',
      status: 'high',
      statusLabel: 'Alto',
      appliedRange: {
        low: 4.0,
        high: 5.6,
        unit: '%',
        interpretation: { low: 'Baixo', normal: 'Normal', high: 'Alto' },
      },
      color: 'orange',
    },
  },
  {
    id: '3',
    loincCode: '2093-3',
    value: 210,
    unit: 'mg/dL',
    date: new Date('2024-02-01'),
    interpretation: {
      value: 210,
      unit: 'mg/dL',
      status: 'high',
      statusLabel: 'Alto',
      appliedRange: {
        low: 0,
        high: 200,
        unit: 'mg/dL',
        interpretation: { low: 'Baixo', normal: 'Normal', high: 'Alto' },
      },
      color: 'orange',
    },
  },
  {
    id: '4',
    loincCode: '718-7',
    value: 11.5,
    unit: 'g/dL',
    date: new Date('2024-02-01'),
    interpretation: {
      value: 11.5,
      unit: 'g/dL',
      status: 'low',
      statusLabel: 'Baixo',
      appliedRange: {
        low: 12.0,
        high: 16.0,
        unit: 'g/dL',
        sex: 'F',
        interpretation: { low: 'Anemia', normal: 'Normal', high: 'Alto' },
      },
      color: 'yellow',
    },
  },
  {
    id: '5',
    loincCode: '2160-0',
    value: 0.9,
    unit: 'mg/dL',
    date: new Date('2024-02-01'),
    interpretation: {
      value: 0.9,
      unit: 'mg/dL',
      status: 'normal',
      statusLabel: 'Normal',
      appliedRange: {
        low: 0.6,
        high: 1.2,
        unit: 'mg/dL',
        interpretation: { low: 'Baixo', normal: 'Normal', high: 'Alto' },
      },
      color: 'green',
    },
  },
];

export const Default: Story = {
  args: {
    results: mockResults,
    loincCodes: mockLOINCCodes,
  },
};

export const WithCriticalValues: Story = {
  args: {
    results: [
      ...mockResults,
      {
        id: '6',
        loincCode: '2345-7',
        value: 450,
        unit: 'mg/dL',
        date: new Date(),
        interpretation: {
          value: 450,
          unit: 'mg/dL',
          status: 'critical_high',
          statusLabel: 'Crítico Alto',
          appliedRange: {
            low: 70,
            high: 99,
            unit: 'mg/dL',
            criticalHigh: 400,
            interpretation: { low: 'Baixo', normal: 'Normal', high: 'Alto', criticalHigh: 'Crítico' },
          },
          color: 'red',
        },
      },
    ],
    loincCodes: mockLOINCCodes,
  },
};

export const Empty: Story = {
  args: {
    results: [],
    loincCodes: mockLOINCCodes,
  },
};

export const LargeDataset: Story = {
  args: {
    results: Array.from({ length: 20 }, (_, i) => ({
      id: `${i}`,
      loincCode: ['2345-7', '4548-4', '2093-3', '718-7', '2160-0'][i % 5],
      value: 80 + Math.random() * 40,
      unit: ['mg/dL', '%', 'mg/dL', 'g/dL', 'mg/dL'][i % 5],
      date: new Date(Date.now() - i * 86400000),
      interpretation: {
        value: 80 + Math.random() * 40,
        unit: ['mg/dL', '%', 'mg/dL', 'g/dL', 'mg/dL'][i % 5],
        status: ['normal', 'high', 'low'][Math.floor(Math.random() * 3)] as any,
        statusLabel: ['Normal', 'Alto', 'Baixo'][Math.floor(Math.random() * 3)],
        appliedRange: {
          low: 70,
          high: 100,
          unit: 'mg/dL',
          interpretation: { low: 'Baixo', normal: 'Normal', high: 'Alto' },
        },
        color: ['green', 'orange', 'yellow'][Math.floor(Math.random() * 3)] as any,
      },
    })),
    loincCodes: mockLOINCCodes,
  },
};
