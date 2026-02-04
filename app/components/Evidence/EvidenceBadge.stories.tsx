import type { Meta, StoryObj } from '@storybook/react';
import { EvidenceBadge, EvidenceStrengthBadge } from './EvidenceBadge';

const meta: Meta<typeof EvidenceBadge> = {
  title: 'Components/Evidence/EvidenceBadge',
  component: EvidenceBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof EvidenceBadge>;

export const HighCertainty: Story = {
  args: {
    certainty: 'high',
    showSymbols: true,
  },
};

export const ModerateCertainty: Story = {
  args: {
    certainty: 'moderate',
    showSymbols: true,
  },
};

export const LowCertainty: Story = {
  args: {
    certainty: 'low',
    showSymbols: true,
  },
};

export const VeryLowCertainty: Story = {
  args: {
    certainty: 'very_low',
    showSymbols: true,
  },
};

export const FromDynamedLevel: Story = {
  args: {
    level: 'A',
    showSymbols: true,
  },
};

export const StrongRecommendationFor: Story = {
  args: {
    strength: 'strong_for',
  },
};

export const WeakRecommendationFor: Story = {
  args: {
    strength: 'weak_for',
  },
};

export const WeakRecommendationAgainst: Story = {
  args: {
    strength: 'weak_against',
  },
};

export const StrongRecommendationAgainst: Story = {
  args: {
    strength: 'strong_against',
  },
};

export const SmallSize: Story = {
  args: {
    certainty: 'high',
    size: 'sm',
    showSymbols: true,
  },
};

export const LargeSize: Story = {
  args: {
    certainty: 'high',
    size: 'lg',
    showSymbols: true,
  },
};

export const SymbolsOnly: Story = {
  args: {
    certainty: 'moderate',
    showSymbols: true,
    showLabel: false,
  },
};

export const AllCertaintyLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <EvidenceBadge certainty="high" showSymbols />
        <span className="text-sm text-neutral-400">Alta - ECRs de alta qualidade</span>
      </div>
      <div className="flex items-center gap-3">
        <EvidenceBadge certainty="moderate" showSymbols />
        <span className="text-sm text-neutral-400">Moderada - ECRs com limitações</span>
      </div>
      <div className="flex items-center gap-3">
        <EvidenceBadge certainty="low" showSymbols />
        <span className="text-sm text-neutral-400">Baixa - Estudos observacionais</span>
      </div>
      <div className="flex items-center gap-3">
        <EvidenceBadge certainty="very_low" showSymbols />
        <span className="text-sm text-neutral-400">Muito Baixa - Série de casos/opinião</span>
      </div>
    </div>
  ),
};

export const AllStrengthLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <EvidenceBadge strength="strong_for" />
        <span className="text-sm text-neutral-400">Recomendação forte a favor</span>
      </div>
      <div className="flex items-center gap-3">
        <EvidenceBadge strength="weak_for" />
        <span className="text-sm text-neutral-400">Recomendação fraca a favor (condicional)</span>
      </div>
      <div className="flex items-center gap-3">
        <EvidenceBadge strength="weak_against" />
        <span className="text-sm text-neutral-400">Recomendação fraca contra</span>
      </div>
      <div className="flex items-center gap-3">
        <EvidenceBadge strength="strong_against" />
        <span className="text-sm text-neutral-400">Recomendação forte contra</span>
      </div>
    </div>
  ),
};

export const CombinedBadge: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <EvidenceStrengthBadge certainty="high" strength="strong_for" />
        <span className="text-sm text-neutral-400">Forte recomendação + Alta certeza</span>
      </div>
      <div className="flex items-center gap-3">
        <EvidenceStrengthBadge certainty="moderate" strength="weak_for" />
        <span className="text-sm text-neutral-400">Recomendação condicional + Certeza moderada</span>
      </div>
      <div className="flex items-center gap-3">
        <EvidenceStrengthBadge certainty="low" strength="weak_against" />
        <span className="text-sm text-neutral-400">Recomendação condicional contra + Baixa certeza</span>
      </div>
      <div className="flex items-center gap-3">
        <EvidenceStrengthBadge certainty="very_low" strength="strong_against" />
        <span className="text-sm text-neutral-400">Forte contra + Muito baixa certeza</span>
      </div>
    </div>
  ),
};

export const InRecommendationCard: Story = {
  render: () => (
    <div className="w-96 p-4 bg-neutral-800 border border-neutral-700 rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-neutral-200">Rastreamento de Câncer Colorretal</h3>
          <p className="text-sm text-neutral-400">Adultos 45-75 anos</p>
        </div>
        <EvidenceBadge certainty="high" showSymbols size="sm" />
      </div>
      <p className="text-sm text-neutral-300 mb-3">
        Recomenda-se rastreamento de câncer colorretal para adultos de 45 a 75 anos com colonoscopia a cada 10 anos ou teste imunoquímico fecal anual.
      </p>
      <div className="flex items-center gap-2 pt-3 border-t border-neutral-700">
        <EvidenceBadge strength="strong_for" size="sm" />
        <span className="text-xs text-neutral-400">USPSTF 2021</span>
      </div>
    </div>
  ),
};

export const DynamedStyleComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-200">DynaMed → GRADE Mapping</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-neutral-400">DynaMed Style</p>
          <EvidenceBadge level="A" />
          <EvidenceBadge level="B" />
          <EvidenceBadge level="C" />
          <EvidenceBadge level="D" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-neutral-400">GRADE Style</p>
          <EvidenceBadge certainty="high" showSymbols />
          <EvidenceBadge certainty="moderate" showSymbols />
          <EvidenceBadge certainty="low" showSymbols />
          <EvidenceBadge certainty="very_low" showSymbols />
        </div>
      </div>
    </div>
  ),
};
