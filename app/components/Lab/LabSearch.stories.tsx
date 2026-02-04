import type { Meta, StoryObj } from '@storybook/react';
import { LabSearch } from './LabSearch';
import { useState } from 'react';

const meta: Meta<typeof LabSearch> = {
  title: 'Components/Lab/LabSearch',
  component: LabSearch,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof LabSearch>;

// Mock LOINC codes for testing
const mockLOINCCodes = [
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
    status: 'ACTIVE' as const,
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
    status: 'ACTIVE' as const,
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
    status: 'ACTIVE' as const,
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
    status: 'ACTIVE' as const,
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
    status: 'ACTIVE' as const,
    namePt: 'Creatinina',
  },
  {
    code: '2085-9',
    component: 'Cholesterol.HDL',
    property: 'MCnc',
    timing: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Cholesterol.HDL [Mass/volume] in Serum or Plasma',
    shortName: 'HDL-C SerPl',
    class: 'CHEM',
    status: 'ACTIVE' as const,
    namePt: 'Colesterol HDL',
  },
  {
    code: '2571-8',
    component: 'Triglyceride',
    property: 'MCnc',
    timing: 'Pt',
    system: 'Ser/Plas',
    scale: 'Qn',
    longCommonName: 'Triglyceride [Mass/volume] in Serum or Plasma',
    shortName: 'Trigl SerPl',
    class: 'CHEM',
    status: 'ACTIVE' as const,
    namePt: 'Triglicerídeos',
  },
];

// Wrapper component to handle state
function LabSearchWrapper({ initialSelected = [], ...props }: any) {
  const [selected, setSelected] = useState(initialSelected);

  return (
    <div className="max-w-2xl">
      <LabSearch
        selectedCodes={selected}
        onSelect={(code) => {
          if (!selected.find((c: any) => c.code === code.code)) {
            setSelected([...selected, code]);
          }
        }}
        onRemove={(code) => {
          setSelected(selected.filter((c: any) => c.code !== code.code));
        }}
        {...props}
      />
    </div>
  );
}

export const BasicSearch: Story = {
  render: () => <LabSearchWrapper />,
};

export const WithSelectedCodes: Story = {
  render: () => (
    <LabSearchWrapper
      initialSelected={[mockLOINCCodes[0], mockLOINCCodes[1], mockLOINCCodes[2]]}
    />
  ),
};

export const SearchByCategory: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <div>
        <h3 className="text-sm font-medium text-neutral-200 mb-2">Pesquisar por categoria:</h3>
        <p className="text-xs text-neutral-400 mb-4">
          Tente buscar por "glicose", "hemoglobina", "colesterol", ou "creatinina"
        </p>
      </div>
      <LabSearchWrapper />
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <div>
        <h3 className="text-sm font-medium text-neutral-200 mb-2">Estado vazio</h3>
        <p className="text-xs text-neutral-400 mb-4">
          Busque por "xyz123" para ver o estado sem resultados
        </p>
      </div>
      <LabSearchWrapper />
    </div>
  ),
};

export const WithMaxSelection: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <div>
        <h3 className="text-sm font-medium text-neutral-200 mb-2">Limite de seleção</h3>
        <p className="text-xs text-neutral-400 mb-4">
          Demonstração com limite de 5 exames selecionados
        </p>
      </div>
      <LabSearchWrapper
        initialSelected={mockLOINCCodes.slice(0, 5)}
      />
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 text-xs text-yellow-300">
        ⚠️ Máximo de 5 exames atingido. Remova um exame para adicionar outro.
      </div>
    </div>
  ),
};

export const SearchWithMatchScore: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <div>
        <h3 className="text-sm font-medium text-neutral-200 mb-2">Busca com relevância</h3>
        <p className="text-xs text-neutral-400 mb-4">
          Digite "glico" para ver como o sistema ordena resultados por relevância
        </p>
      </div>
      <LabSearchWrapper />
      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 text-xs text-blue-300">
        💡 Resultados são ordenados por relevância com base na similaridade do texto
      </div>
    </div>
  ),
};

export const DiabetesProtocolExample: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <div>
        <h3 className="text-sm font-medium text-neutral-200 mb-2">Protocolo: Diabetes Mellitus</h3>
        <p className="text-xs text-neutral-400 mb-4">
          Exames recomendados para acompanhamento de diabetes
        </p>
      </div>
      <LabSearchWrapper
        initialSelected={[
          mockLOINCCodes[0], // Glicemia
          mockLOINCCodes[1], // HbA1c
          mockLOINCCodes[2], // Colesterol Total
          mockLOINCCodes[5], // HDL
          mockLOINCCodes[6], // Triglicerídeos
        ]}
      />
      <div className="bg-neutral-700/50 rounded p-3">
        <p className="text-xs font-semibold text-neutral-200 mb-2">Exames selecionados:</p>
        <ul className="text-xs text-neutral-400 space-y-1">
          <li>• Glicemia de jejum</li>
          <li>• Hemoglobina Glicada (HbA1c)</li>
          <li>• Colesterol Total</li>
          <li>• Colesterol HDL</li>
          <li>• Triglicerídeos</li>
        </ul>
      </div>
    </div>
  ),
};
