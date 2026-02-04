import type { Meta, StoryObj } from '@storybook/react';
import { RecommendationCard, RecommendationList } from './RecommendationCard';
import type { GradeRecommendation } from '@/lib/types/evidence';

const meta: Meta<typeof RecommendationCard> = {
  title: 'Components/Evidence/RecommendationCard',
  component: RecommendationCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof RecommendationCard>;

// Mock recommendations
const colonCancerScreening: GradeRecommendation = {
  id: 'colon-screening-45-75',
  recommendation: 'Recomenda-se rastreamento de câncer colorretal para adultos de 45 a 75 anos.',
  strength: 'strong_for',
  certainty: 'high',
  population: 'Adultos 45-75 anos, risco médio',
  intervention: 'Colonoscopia a cada 10 anos ou FIT anual',
  comparator: 'Nenhum rastreamento',
  outcomes: [
    'Mortalidade por câncer colorretal',
    'Incidência de câncer colorretal',
    'Anos de vida ajustados por qualidade (QALYs)',
  ],
  assessment: {
    startingCertainty: 'high',
    downgrade: {
      riskOfBias: 'none',
      inconsistency: 'none',
      indirectness: 'none',
      imprecision: 'none',
      publicationBias: 'none',
    },
    finalCertainty: 'high',
    rationale: 'Múltiplos ECRs de alta qualidade demonstram redução significativa de mortalidade',
  },
  references: ['USPSTF-2021', 'NCCN-2023', 'ACS-2022'],
  remarks: 'Benefício líquido substancial. Escolha do teste deve ser compartilhada com paciente.',
  lastReviewed: '2023-05',
};

const aspirinPrevention: GradeRecommendation = {
  id: 'aspirin-primary-prevention',
  recommendation: 'Adultos de 40-59 anos com risco cardiovascular ≥10% em 10 anos podem considerar aspirina em baixa dose para prevenção primária.',
  strength: 'weak_for',
  certainty: 'moderate',
  population: 'Adultos 40-59 anos, risco CV ≥10%',
  intervention: 'Aspirina 81mg/dia',
  comparator: 'Nenhuma aspirina',
  outcomes: [
    'Eventos cardiovasculares (IAM, AVC)',
    'Sangramento gastrointestinal',
    'Mortalidade total',
  ],
  assessment: {
    startingCertainty: 'high',
    downgrade: {
      riskOfBias: 'none',
      inconsistency: 'serious',
      indirectness: 'none',
      imprecision: 'none',
      publicationBias: 'none',
    },
    finalCertainty: 'moderate',
    rationale: 'Heterogeneidade nos resultados de ECRs recentes. Balanço benefício-risco estreito.',
  },
  references: ['ASPREE-2018', 'ARRIVE-2018', 'ASCEND-2018'],
  remarks: 'Decisão compartilhada obrigatória. Avaliar risco de sangramento individualmente.',
  lastReviewed: '2022-04',
};

const psaScreening: GradeRecommendation = {
  id: 'psa-screening-55-69',
  recommendation: 'Para homens de 55-69 anos, a decisão sobre rastreamento com PSA deve ser individualizada.',
  strength: 'weak_for',
  certainty: 'low',
  population: 'Homens 55-69 anos',
  intervention: 'Dosagem de PSA periódica',
  comparator: 'Nenhum rastreamento',
  outcomes: [
    'Mortalidade por câncer de próstata',
    'Incidência de câncer metastático',
    'Overdiagnosis e overtreatment',
    'Ansiedade relacionada ao rastreamento',
  ],
  assessment: {
    startingCertainty: 'high',
    downgrade: {
      riskOfBias: 'none',
      inconsistency: 'serious',
      indirectness: 'serious',
      imprecision: 'none',
      publicationBias: 'none',
    },
    finalCertainty: 'low',
    rationale: 'Resultados conflitantes entre estudos ERSPC e PLCO. Alto risco de overdiagnosis.',
  },
  references: ['ERSPC-2019', 'PLCO-2017', 'USPSTF-2018'],
  remarks: 'Discussão de valores e preferências do paciente é essencial antes da decisão.',
  lastReviewed: '2023-01',
};

const vitaminDSupplement: GradeRecommendation = {
  id: 'vitamin-d-general-pop',
  recommendation: 'Não se recomenda suplementação de vitamina D para prevenção de fraturas na população geral sem deficiência.',
  strength: 'weak_against',
  certainty: 'low',
  population: 'Adultos sem deficiência de vitamina D',
  intervention: 'Suplementação de vitamina D',
  comparator: 'Nenhuma suplementação',
  outcomes: ['Incidência de fraturas', 'Quedas', 'Densidade mineral óssea'],
  assessment: {
    startingCertainty: 'high',
    downgrade: {
      riskOfBias: 'none',
      inconsistency: 'serious',
      indirectness: 'serious',
      imprecision: 'none',
      publicationBias: 'none',
    },
    finalCertainty: 'low',
    rationale: 'Meta-análise VITAL não mostrou benefício em população sem deficiência.',
  },
  references: ['VITAL-2022', 'Cochrane-2018'],
  lastReviewed: '2023-03',
};

const hormonalTherapy: GradeRecommendation = {
  id: 'hrt-menopause',
  recommendation: 'Não se recomenda terapia hormonal (TH) combinada para prevenção primária de doenças crônicas em mulheres pós-menopausa.',
  strength: 'strong_against',
  certainty: 'high',
  population: 'Mulheres pós-menopausa',
  intervention: 'Terapia hormonal combinada',
  comparator: 'Nenhuma TH',
  outcomes: [
    'Doença cardiovascular',
    'Câncer de mama',
    'Tromboembolismo venoso',
    'Mortalidade total',
  ],
  assessment: {
    startingCertainty: 'high',
    downgrade: {
      riskOfBias: 'none',
      inconsistency: 'none',
      indirectness: 'none',
      imprecision: 'none',
      publicationBias: 'none',
    },
    finalCertainty: 'high',
    rationale: 'WHI demonstrou aumento de risco de eventos cardiovasculares e câncer de mama.',
  },
  references: ['WHI-2002', 'WHI-2017-follow-up', 'USPSTF-2022'],
  remarks: 'Não se aplica ao uso de TH para sintomas vasomotores moderados/graves.',
  lastReviewed: '2022-10',
};

export const StrongRecommendationFor: Story = {
  args: {
    recommendation: colonCancerScreening,
    defaultExpanded: true,
  },
};

export const WeakRecommendationFor: Story = {
  args: {
    recommendation: aspirinPrevention,
    defaultExpanded: true,
  },
};

export const LowCertaintyRecommendation: Story = {
  args: {
    recommendation: psaScreening,
    defaultExpanded: true,
  },
};

export const WeakRecommendationAgainst: Story = {
  args: {
    recommendation: vitaminDSupplement,
    defaultExpanded: true,
  },
};

export const StrongRecommendationAgainst: Story = {
  args: {
    recommendation: hormonalTherapy,
    defaultExpanded: true,
  },
};

export const Collapsed: Story = {
  args: {
    recommendation: colonCancerScreening,
    defaultExpanded: false,
  },
};

export const CompactMode: Story = {
  args: {
    recommendation: colonCancerScreening,
    compact: true,
  },
};

export const WithViewEvidenceCallback: Story = {
  args: {
    recommendation: colonCancerScreening,
    defaultExpanded: true,
    onViewEvidence: () => alert('Abrir corpo de evidência completo'),
  },
};

export const RecommendationListDefault: Story = {
  render: () => (
    <RecommendationList
      recommendations={[
        colonCancerScreening,
        aspirinPrevention,
        psaScreening,
        vitaminDSupplement,
        hormonalTherapy,
      ]}
    />
  ),
};

export const RecommendationListGroupedByStrength: Story = {
  render: () => (
    <RecommendationList
      recommendations={[
        colonCancerScreening,
        aspirinPrevention,
        psaScreening,
        vitaminDSupplement,
        hormonalTherapy,
      ]}
      groupByStrength
    />
  ),
};

export const MultipleRecommendationsForCondition: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-neutral-200">
        Rastreamento de Câncer - Recomendações GRADE
      </h2>
      <p className="text-neutral-400 text-sm">
        Recomendações baseadas em evidências para rastreamento de câncer em adultos assintomáticos
      </p>
      <RecommendationList
        recommendations={[
          colonCancerScreening,
          psaScreening,
        ]}
        groupByStrength
      />
    </div>
  ),
};
