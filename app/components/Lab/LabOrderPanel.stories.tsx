import type { Meta, StoryObj } from '@storybook/react';
import { LabOrderPanel } from './LabOrderPanel';
import type { LOINCCode } from '@/lib/types/loinc';

const meta: Meta<typeof LabOrderPanel> = {
  title: 'Components/Lab/LabOrderPanel',
  component: LabOrderPanel,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof LabOrderPanel>;

// Mock LOINC codes
const mockLOINCCodes: LOINCCode[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

export const BasicOrder: Story = {
  args: {
    onSubmit: (order) => {
      console.log('Lab order submitted:', order);
      alert(`Pedido enviado:\n${order.tests.length} exames\nPrioridade: ${order.priority}\nMotivo: ${order.clinicalReason}`);
    },
    onCancel: () => console.log('Order cancelled'),
  },
};

export const WithRecommendedTests: Story = {
  args: {
    recommendedTests: mockLOINCCodes.slice(0, 3),
    onSubmit: (order) => {
      console.log('Lab order submitted:', order);
      alert(`Pedido enviado:\n${order.tests.length} exames\nPrioridade: ${order.priority}`);
    },
    onCancel: () => console.log('Order cancelled'),
  },
};

export const RoutinePriority: Story = {
  args: {
    recommendedTests: mockLOINCCodes.slice(0, 2),
    onSubmit: (order) => {
      console.log('Routine lab order:', order);
      alert(`Pedido ROTINA enviado:\n${order.tests.map(t => t.namePt).join(', ')}\nPrazo: 24-48 horas`);
    },
    onCancel: () => console.log('Order cancelled'),
  },
};

export const UrgentPriority: Story = {
  args: {
    recommendedTests: [mockLOINCCodes[0], mockLOINCCodes[3]],
    onSubmit: (order) => {
      console.log('Urgent lab order:', order);
      alert(`Pedido URGENTE enviado:\n${order.tests.map(t => t.namePt).join(', ')}\nPrazo: 4-8 horas`);
    },
    onCancel: () => console.log('Order cancelled'),
  },
};

export const StatPriority: Story = {
  args: {
    recommendedTests: [mockLOINCCodes[0]],
    onSubmit: (order) => {
      console.log('STAT lab order:', order);
      alert(`Pedido STAT enviado:\n${order.tests.map(t => t.namePt).join(', ')}\nPrazo: <1 hora\n🚨 PRIORIDADE MÁXIMA`);
    },
    onCancel: () => console.log('Order cancelled'),
  },
};

export const EmptyState: Story = {
  args: {
    onSubmit: (order) => console.log('Order submitted:', order),
    onCancel: () => console.log('Order cancelled'),
  },
};

export const DiabetesProtocolOrder: Story = {
  args: {
    recommendedTests: mockLOINCCodes,
    onSubmit: (order) => {
      console.log('Diabetes protocol order:', order);
      alert(
        `Protocolo: Diabetes Mellitus\n\n` +
        `Exames solicitados:\n` +
        `${order.tests.map(t => `• ${t.namePt} (${t.code})`).join('\n')}\n\n` +
        `Prioridade: ${order.priority}\n` +
        `Motivo clínico: ${order.clinicalReason}\n\n` +
        `Solicitante: ${order.requestedBy}`
      );
    },
    onCancel: () => console.log('Order cancelled'),
  },
};

export const WithPatientContext: Story = {
  args: {
    recommendedTests: mockLOINCCodes.slice(0, 3),
    patientId: 'PAC-12345',
    onSubmit: (order) => {
      console.log('Lab order with patient context:', order);
      alert(
        `Paciente: ${order.patientId || 'Não especificado'}\n\n` +
        `Exames:\n${order.tests.map(t => t.namePt).join(', ')}\n\n` +
        `Motivo: ${order.clinicalReason}\n` +
        `Observações: ${order.notes || 'Nenhuma'}`
      );
    },
    onCancel: () => console.log('Order cancelled'),
  },
};

export const AnemiaInvestigation: Story = {
  args: {
    recommendedTests: [
      mockLOINCCodes[3],
      {
        code: '2498-4',
        component: 'Iron',
        property: 'MCnc',
        timing: 'Pt',
        system: 'Ser/Plas',
        scale: 'Qn',
        longCommonName: 'Iron [Mass/volume] in Serum or Plasma',
        shortName: 'Iron SerPl',
        class: 'CHEM',
        status: 'ACTIVE',
        namePt: 'Ferro Sérico',
      },
      {
        code: '2502-3',
        component: 'Ferritin',
        property: 'MCnc',
        timing: 'Pt',
        system: 'Ser/Plas',
        scale: 'Qn',
        longCommonName: 'Ferritin [Mass/volume] in Serum or Plasma',
        shortName: 'Ferritin SerPl',
        class: 'CHEM',
        status: 'ACTIVE',
        namePt: 'Ferritina',
      },
    ],
    onSubmit: (order) => {
      console.log('Anemia investigation order:', order);
      alert(
        `Investigação: Anemia\n\n` +
        `Exames solicitados:\n` +
        `${order.tests.map(t => `• ${t.namePt}`).join('\n')}\n\n` +
        `Prioridade: URGENTE (4-8h)\n` +
        `Motivo: ${order.clinicalReason}`
      );
    },
    onCancel: () => console.log('Order cancelled'),
  },
};
