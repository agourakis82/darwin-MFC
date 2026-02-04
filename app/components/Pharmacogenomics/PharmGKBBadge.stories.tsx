import type { Meta, StoryObj } from '@storybook/react';
import { PharmGKBBadge } from './PharmGKBBadge';

const meta: Meta<typeof PharmGKBBadge> = {
  title: 'Components/Pharmacogenomics/PharmGKBBadge',
  component: PharmGKBBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof PharmGKBBadge>;

export const Level1A: Story = {
  args: {
    level: '1A',
    gene: 'CYP2D6',
  },
};

export const Level1B: Story = {
  args: {
    level: '1B',
    gene: 'CYP2C19',
  },
};

export const Level2A: Story = {
  args: {
    level: '2A',
    gene: 'CYP2C9',
  },
};

export const Level2B: Story = {
  args: {
    level: '2B',
    gene: 'VKORC1',
  },
};

export const Level3: Story = {
  args: {
    level: '3',
    gene: 'SLCO1B1',
  },
};

export const Level4: Story = {
  args: {
    level: '4',
    gene: 'UGT1A1',
  },
};

export const WithLabel: Story = {
  args: {
    level: '1A',
    gene: 'CYP2D6',
    showLabel: true,
  },
};

export const WithoutGene: Story = {
  args: {
    level: '1A',
    showLabel: true,
  },
};

export const SmallSize: Story = {
  args: {
    level: '1A',
    gene: 'TPMT',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    level: '1A',
    gene: 'DPYD',
    size: 'lg',
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <PharmGKBBadge level="1A" gene="CYP2D6" showLabel />
        <span className="text-sm text-neutral-400">Nível 1A - Evidência alta + recomendação forte</span>
      </div>
      <div className="flex items-center gap-2">
        <PharmGKBBadge level="1B" gene="CYP2C19" showLabel />
        <span className="text-sm text-neutral-400">Nível 1B - Evidência alta + recomendação moderada</span>
      </div>
      <div className="flex items-center gap-2">
        <PharmGKBBadge level="2A" gene="CYP2C9" showLabel />
        <span className="text-sm text-neutral-400">Nível 2A - Evidência moderada + recomendação forte</span>
      </div>
      <div className="flex items-center gap-2">
        <PharmGKBBadge level="2B" gene="VKORC1" showLabel />
        <span className="text-sm text-neutral-400">Nível 2B - Evidência moderada + recomendação moderada</span>
      </div>
      <div className="flex items-center gap-2">
        <PharmGKBBadge level="3" gene="SLCO1B1" showLabel />
        <span className="text-sm text-neutral-400">Nível 3 - Baixa evidência</span>
      </div>
      <div className="flex items-center gap-2">
        <PharmGKBBadge level="4" gene="UGT1A1" showLabel />
        <span className="text-sm text-neutral-400">Nível 4 - Evidência preliminar</span>
      </div>
    </div>
  ),
};

export const CommonGenes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <PharmGKBBadge level="1A" gene="CYP2D6" />
      <PharmGKBBadge level="1A" gene="CYP2C19" />
      <PharmGKBBadge level="1A" gene="CYP2C9" />
      <PharmGKBBadge level="1A" gene="TPMT" />
      <PharmGKBBadge level="1A" gene="DPYD" />
      <PharmGKBBadge level="2A" gene="VKORC1" />
      <PharmGKBBadge level="2A" gene="SLCO1B1" />
      <PharmGKBBadge level="3" gene="UGT1A1" />
    </div>
  ),
};

export const InMedicationCard: Story = {
  render: () => (
    <div className="w-96 p-4 bg-neutral-800 border border-neutral-700 rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-neutral-200">Codeína</h3>
          <p className="text-sm text-neutral-400">Analgésico opioide</p>
        </div>
        <PharmGKBBadge level="1A" gene="CYP2D6" />
      </div>
      <p className="text-sm text-neutral-300">
        A codeína é um pró-fármaco que requer metabolização pelo CYP2D6 para ser convertida em morfina (metabólito ativo).
      </p>
      <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-300">
        ⚠️ Metabolizadores lentos (CYP2D6 *4/*4) têm resposta analgésica reduzida
      </div>
    </div>
  ),
};
