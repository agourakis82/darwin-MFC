import type { Meta, StoryObj } from '@storybook/react';
import { PharmGKBAlert } from './PharmGKBAlert';
import type { PharmGKBData } from '@/lib/types/medicamento';

const meta: Meta<typeof PharmGKBAlert> = {
  title: 'Components/Pharmacogenomics/PharmGKBAlert',
  component: PharmGKBAlert,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof PharmGKBAlert>;

// Mock PharmGKB data
const codeineCYP2D6: PharmGKBData = {
  gene: 'CYP2D6',
  level: '1A',
  summary: 'A codeína é um pró-fármaco metabolizado pelo CYP2D6 em morfina (metabólito ativo)',
  guidelineUrl: 'https://cpicpgx.org/guidelines/guideline-for-codeine-and-cyp2d6/',
  variants: [],
};

const clopidogrelCYP2C19: PharmGKBData = {
  gene: 'CYP2C19',
  level: '1A',
  summary: 'O clopidogrel é um pró-fármaco ativado pelo CYP2C19',
  guidelineUrl: 'https://cpicpgx.org/guidelines/guideline-for-clopidogrel-and-cyp2c19/',
  variants: [],
};

const warfarinCYP2C9: PharmGKBData = {
  gene: 'CYP2C9',
  level: '1A',
  summary: 'CYP2C9 metaboliza a S-varfarina (enantiômero mais potente)',
  variants: [],
};

const warfarinVKORC1: PharmGKBData = {
  gene: 'VKORC1',
  level: '1A',
  summary: 'VKORC1 é o alvo farmacológico da varfarina',
  variants: [],
};

const simvastatinSLCO1B1: PharmGKBData = {
  gene: 'SLCO1B1',
  level: '2A',
  summary: 'SLCO1B1 transporta sinvastatina para hepatócitos',
  variants: [],
};

const azathioprineTQMT: PharmGKBData = {
  gene: 'TPMT',
  level: '1A',
  summary: 'TPMT metaboliza azatioprina. Variantes podem causar mielossupressão grave',
  variants: [],
};

export const CodeineHighEvidence: Story = {
  args: {
    medicationName: 'Codeína',
    pharmgkbData: [codeineCYP2D6],
    onDismiss: () => alert('Alert dismissed'),
    onViewDetails: () => alert('View details clicked'),
    onMarkAsReviewed: () => alert('Marked as reviewed'),
  },
};

export const ClopidogrelHighEvidence: Story = {
  args: {
    medicationName: 'Clopidogrel',
    pharmgkbData: [clopidogrelCYP2C19],
    onDismiss: () => alert('Alert dismissed'),
    onViewDetails: () => alert('View details clicked'),
    onMarkAsReviewed: () => alert('Marked as reviewed'),
  },
};

export const WarfarinMultipleGenes: Story = {
  args: {
    medicationName: 'Varfarina',
    pharmgkbData: [warfarinCYP2C9, warfarinVKORC1],
    onDismiss: () => alert('Alert dismissed'),
    onViewDetails: () => alert('View details clicked'),
    onMarkAsReviewed: () => alert('Marked as reviewed'),
  },
};

export const SimvastatinModerateEvidence: Story = {
  args: {
    medicationName: 'Sinvastatina',
    pharmgkbData: [simvastatinSLCO1B1],
    onDismiss: () => alert('Alert dismissed'),
    onViewDetails: () => alert('View details clicked'),
    onMarkAsReviewed: () => alert('Marked as reviewed'),
  },
};

export const AzathioprineCritical: Story = {
  args: {
    medicationName: 'Azatioprina',
    pharmgkbData: [azathioprineTQMT],
    onDismiss: () => alert('Alert dismissed'),
    onViewDetails: () => alert('View details clicked'),
    onMarkAsReviewed: () => alert('Marked as reviewed'),
  },
};

export const ModalView: Story = {
  args: {
    medicationName: 'Codeína',
    pharmgkbData: [codeineCYP2D6],
    modal: true,
    onDismiss: () => alert('Modal dismissed'),
    onViewDetails: () => alert('View details clicked'),
    onMarkAsReviewed: () => alert('Marked as reviewed'),
  },
};

export const InlineAlert: Story = {
  args: {
    medicationName: 'Clopidogrel',
    pharmgkbData: [clopidogrelCYP2C19],
    modal: false,
    onDismiss: () => alert('Dismissed'),
    onViewDetails: () => alert('View details'),
    onMarkAsReviewed: () => alert('Reviewed'),
  },
};

export const InPrescriptionForm: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-4">
      {/* Mock prescription form */}
      <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-neutral-200 mb-4">Nova Prescrição</h2>

        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">
              Medicamento
            </label>
            <input
              type="text"
              value="Codeína 30mg"
              disabled
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded text-neutral-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">
              Posologia
            </label>
            <input
              type="text"
              placeholder="Ex: 1 comprimido a cada 6 horas"
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded text-neutral-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">
              Duração
            </label>
            <input
              type="text"
              placeholder="Ex: 5 dias"
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded text-neutral-200"
            />
          </div>
        </div>

        {/* PharmGKB Alert */}
        <PharmGKBAlert
          medicationName="Codeína"
          pharmgkbData={[codeineCYP2D6]}
          onViewDetails={() => alert('View details')}
          onMarkAsReviewed={() => alert('Marked as reviewed')}
        />

        <div className="flex gap-2 mt-4">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium">
            Adicionar à Prescrição
          </button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded text-neutral-200 text-sm font-medium">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  ),
};

export const EmptyState: Story = {
  args: {
    medicationName: 'Paracetamol',
    pharmgkbData: [],
  },
};
