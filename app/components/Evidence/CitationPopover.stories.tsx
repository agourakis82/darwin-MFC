import type { Meta, StoryObj } from '@storybook/react';
import { CitationPopover, InlineCitationGroup } from './CitationPopover';
import type { Reference, Citation } from '@/lib/types/references';

const meta: Meta<typeof CitationPopover> = {
  title: 'Components/Evidence/CitationPopover',
  component: CitationPopover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof CitationPopover>;

// Mock references
const mockReferences: Record<string, Reference> = {
  'uspstf-2021': {
    id: 'uspstf-2021',
    type: 'diretriz',
    organization: ['US Preventive Services Task Force'],
    title: 'Screening for Colorectal Cancer: US Preventive Services Task Force Recommendation Statement',
    journal: 'JAMA',
    year: 2021,
    volume: '325',
    pages: '1965-1977',
    doi: '10.1001/jama.2021.6238',
    pmid: '34003218',
  },
  'aspree-2018': {
    id: 'aspree-2018',
    type: 'artigo',
    authors: ['McNeil JJ', 'Wolfe R', 'Woods RL', 'et al.'],
    title: 'Effect of Aspirin on Cardiovascular Events and Bleeding in the Healthy Elderly',
    journal: 'N Engl J Med',
    year: 2018,
    volume: '379',
    pages: '1509-1518',
    doi: '10.1056/NEJMoa1805819',
    pmid: '30221597',
  },
  'who-2020': {
    id: 'who-2020',
    type: 'relatorio',
    organization: ['World Health Organization'],
    title: 'WHO guidelines on physical activity and sedentary behaviour',
    year: 2020,
    url: 'https://www.who.int/publications/i/item/9789240015128',
  },
  'brasil-2023': {
    id: 'brasil-2023',
    type: 'portaria',
    organization: ['Ministério da Saúde'],
    title: 'Protocolo Clínico e Diretrizes Terapêuticas para Diabetes Mellitus Tipo 2',
    year: 2023,
    legalNumber: 'Portaria Conjunta nº 17/2023',
  },
};

// Mock citations
const highQualityCitation: Citation = {
  refId: 'uspstf-2021',
  evidenceLevel: 'A',
  studyType: 'Guideline',
  qualityScore: 9,
  note: 'Recomendação grau A com alta certeza de benefício líquido substancial',
};

const rctCitation: Citation = {
  refId: 'aspree-2018',
  evidenceLevel: 'A',
  studyType: 'RCT',
  qualityScore: 8,
  limitations: [
    'População predominantemente caucasiana',
    'Curto período de follow-up para desfechos de câncer',
  ],
};

const observationalCitation: Citation = {
  refId: 'who-2020',
  evidenceLevel: 'B',
  studyType: 'Guideline',
  qualityScore: 7,
};

const lowQualityCitation: Citation = {
  refId: 'brasil-2023',
  evidenceLevel: 'C',
  studyType: 'Guideline',
  qualityScore: 5,
  limitations: ['Baseado principalmente em consenso de especialistas', 'Evidência indireta'],
  conflictsOfInterest: 'Alguns autores declaram vínculo com indústria farmacêutica',
};

export const HighQualityEvidence: Story = {
  args: {
    citation: highQualityCitation,
    reference: mockReferences['uspstf-2021'],
    citationNumber: 1,
    expanded: true,
  },
};

export const RCTWithLimitations: Story = {
  args: {
    citation: rctCitation,
    reference: mockReferences['aspree-2018'],
    citationNumber: 2,
    expanded: true,
  },
};

export const ModerateEvidence: Story = {
  args: {
    citation: observationalCitation,
    reference: mockReferences['who-2020'],
    citationNumber: 3,
    expanded: true,
  },
};

export const LowQualityWithConflicts: Story = {
  args: {
    citation: lowQualityCitation,
    reference: mockReferences['brasil-2023'],
    citationNumber: 4,
    expanded: true,
  },
};

export const HoverToShow: Story = {
  args: {
    citation: highQualityCitation,
    reference: mockReferences['uspstf-2021'],
    citationNumber: 1,
    showOnHover: true,
    expanded: false,
  },
  render: (args) => (
    <p className="text-neutral-200 text-base max-w-xl">
      O rastreamento de câncer colorretal é recomendado para adultos de 45 a 75 anos
      <CitationPopover {...args} />, com benefício líquido substancial demonstrado em
      múltiplos ensaios clínicos randomizados.
    </p>
  ),
};

export const InTextExample: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <h3 className="text-lg font-semibold text-neutral-200">Rastreamento de Câncer Colorretal</h3>
      <p className="text-neutral-300 leading-relaxed">
        O rastreamento de câncer colorretal é recomendado para todos os adultos de 45 a 75 anos
        <CitationPopover
          citation={highQualityCitation}
          reference={mockReferences['uspstf-2021']}
          citationNumber={1}
        />
        . A colonoscopia é considerada o padrão-ouro, mas o teste imunoquímico fecal (FIT)
        é uma alternativa aceitável para pacientes que preferem métodos não invasivos
        <CitationPopover
          citation={observationalCitation}
          reference={mockReferences['who-2020']}
          citationNumber={2}
        />
        .
      </p>
      <p className="text-neutral-300 leading-relaxed">
        Para adultos de 76 a 85 anos, a decisão deve ser individualizada, considerando
        expectativa de vida e histórico de rastreamento prévio
        <CitationPopover
          citation={lowQualityCitation}
          reference={mockReferences['brasil-2023']}
          citationNumber={3}
        />
        .
      </p>
    </div>
  ),
};

export const CitationGroupExample: Story = {
  render: () => {
    const citations: Citation[] = [
      highQualityCitation,
      rctCitation,
      observationalCitation,
    ];
    const refsMap = new Map(Object.entries(mockReferences));

    return (
      <p className="text-neutral-200 text-base max-w-xl">
        Múltiplos estudos demonstram o benefício do rastreamento
        <InlineCitationGroup citations={citations} references={refsMap} />
        , embora existam variações nas recomendações específicas entre diferentes organizações.
      </p>
    );
  },
};

export const AllStudyTypes: Story = {
  render: () => (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-neutral-200 mb-4">Tipos de Estudo</h3>

      <div className="flex items-center gap-3">
        <CitationPopover
          citation={{ refId: '1', studyType: 'MetaAnalysis', evidenceLevel: 'A' }}
          citationNumber={1}
          expanded
        />
        <span className="text-sm text-neutral-400">Meta-análise</span>
      </div>

      <div className="flex items-center gap-3">
        <CitationPopover
          citation={{ refId: '2', studyType: 'SystematicReview', evidenceLevel: 'A' }}
          citationNumber={2}
          expanded
        />
        <span className="text-sm text-neutral-400">Revisão Sistemática</span>
      </div>

      <div className="flex items-center gap-3">
        <CitationPopover
          citation={{ refId: '3', studyType: 'RCT', evidenceLevel: 'A' }}
          citationNumber={3}
          expanded
        />
        <span className="text-sm text-neutral-400">ECR</span>
      </div>

      <div className="flex items-center gap-3">
        <CitationPopover
          citation={{ refId: '4', studyType: 'Cohort', evidenceLevel: 'B' }}
          citationNumber={4}
          expanded
        />
        <span className="text-sm text-neutral-400">Coorte</span>
      </div>

      <div className="flex items-center gap-3">
        <CitationPopover
          citation={{ refId: '5', studyType: 'CaseControl', evidenceLevel: 'B' }}
          citationNumber={5}
          expanded
        />
        <span className="text-sm text-neutral-400">Caso-Controle</span>
      </div>

      <div className="flex items-center gap-3">
        <CitationPopover
          citation={{ refId: '6', studyType: 'CaseSeries', evidenceLevel: 'C' }}
          citationNumber={6}
          expanded
        />
        <span className="text-sm text-neutral-400">Série de Casos</span>
      </div>

      <div className="flex items-center gap-3">
        <CitationPopover
          citation={{ refId: '7', studyType: 'ExpertOpinion', evidenceLevel: 'D' }}
          citationNumber={7}
          expanded
        />
        <span className="text-sm text-neutral-400">Opinião de Especialista</span>
      </div>
    </div>
  ),
};
