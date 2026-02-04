import type { Meta, StoryObj } from '@storybook/react';
import { EntityHighlighter, EntityLegend } from './EntityHighlighter';
import type { ExtractedEntity } from '@/lib/ai/extraction/biobert-extractor';

const sampleText = 'Paciente com diabetes mellitus tipo 2 em uso de metformina 850mg. Refere cefaleia há 3 dias. Solicito hemograma completo e glicemia de jejum.';

const sampleEntities: ExtractedEntity[] = [
  {
    text: 'diabetes mellitus tipo 2',
    type: 'DISEASE',
    confidence: 0.92,
    source: 'biobert',
    startChar: 13,
    endChar: 37,
  },
  {
    text: 'metformina',
    type: 'MEDICATION',
    confidence: 0.88,
    source: 'biobert',
    startChar: 49,
    endChar: 59,
  },
  {
    text: 'cefaleia',
    type: 'SYMPTOM',
    confidence: 0.85,
    source: 'hybrid',
    startChar: 73,
    endChar: 81,
  },
  {
    text: 'hemograma completo',
    type: 'EXAM',
    confidence: 0.78,
    source: 'regex',
    startChar: 98,
    endChar: 116,
  },
  {
    text: 'glicemia de jejum',
    type: 'EXAM',
    confidence: 0.82,
    source: 'regex',
    startChar: 119,
    endChar: 136,
  },
];

const meta = {
  title: 'AI/EntityHighlighter',
  component: EntityHighlighter,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    text: { control: 'text' },
    entities: { control: 'object' },
    onEntityClick: { action: 'entity clicked' },
    highlightMode: { control: 'select', options: ['inline', 'underline', 'badge'] },
    showConfidence: { control: 'boolean' },
    minConfidence: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    showTooltips: { control: 'boolean' },
    fontSize: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof EntityHighlighter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: sampleText,
    entities: [sampleEntities[0]],
    highlightMode: 'inline',
    showConfidence: true,
    minConfidence: 0.3,
    showTooltips: true,
    fontSize: 'md',
  },
};

export const MultipleEntities: Story = {
  args: {
    ...Default.args,
    entities: sampleEntities,
  },
};

export const UnderlineMode: Story = {
  args: {
    ...Default.args,
    entities: sampleEntities,
    highlightMode: 'underline',
  },
};

export const BadgeMode: Story = {
  args: {
    ...Default.args,
    entities: sampleEntities,
    highlightMode: 'badge',
  },
};

export const LowConfidenceFiltered: Story = {
  args: {
    ...Default.args,
    entities: [
      ...sampleEntities,
      {
        text: 'entidade baixa confiança',
        type: 'SYMPTOM' as const,
        confidence: 0.25,
        source: 'regex' as const,
        startChar: 0,
        endChar: 5,
      },
    ],
    minConfidence: 0.8,
  },
  parameters: {
    docs: {
      description: {
        story: 'Only entities with confidence >= 0.8 are displayed.',
      },
    },
  },
};

export const NoTooltips: Story = {
  args: {
    ...Default.args,
    entities: sampleEntities,
    showTooltips: false,
  },
};

export const LargeFontSize: Story = {
  args: {
    ...Default.args,
    entities: sampleEntities,
    fontSize: 'lg',
  },
};

export const SmallFontSize: Story = {
  args: {
    ...Default.args,
    entities: sampleEntities,
    fontSize: 'sm',
  },
};

export const WithoutConfidenceDisplay: Story = {
  args: {
    ...Default.args,
    entities: sampleEntities,
    showConfidence: false,
  },
};

// EntityLegend story
export const Legend: StoryObj<typeof EntityLegend> = {
  args: {},
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Full Legend</h3>
      <EntityLegend />
      <h3 className="text-lg font-semibold mt-6">Compact Legend</h3>
      <EntityLegend compact />
      <h3 className="text-lg font-semibold mt-6">Filtered Legend (Disease + Medication only)</h3>
      <EntityLegend entityTypes={['DISEASE', 'MEDICATION']} />
    </div>
  ),
};

// Complex clinical note
export const ComplexClinicalNote: Story = {
  args: {
    text: `S: Paciente masculino, 58 anos, refere dor precordial em aperto há 2 horas, irradiação para MSE, sudorese fria. Nega febre. Diabético em uso de metformina. Hipertenso em uso de losartana.

O: PA 160/100 mmHg, FC 95 bpm, FR 22 irpm, SatO2 94% AA. Ausculta cardíaca: B3 presente. Pulmões: estertores em bases. ECG: supra de ST em V1-V4.

A: IAM com supra de ST em parede anterior (I21.0). DM2 (E11). HAS (I10).

P: AAS 300mg VO stat. Clopidogrel 300mg VO. Heparina SC. Encaminhamento para hemodinâmica.`,
    entities: [
      { text: 'dor precordial', type: 'SYMPTOM' as const, confidence: 0.91, source: 'biobert' as const, startChar: 38, endChar: 52 },
      { text: 'sudorese fria', type: 'SYMPTOM' as const, confidence: 0.87, source: 'biobert' as const, startChar: 95, endChar: 108 },
      { text: 'febre', type: 'SYMPTOM' as const, confidence: 0.82, source: 'regex' as const, startChar: 115, endChar: 120 },
      { text: 'metformina', type: 'MEDICATION' as const, confidence: 0.95, source: 'biobert' as const, startChar: 145, endChar: 155 },
      { text: 'losartana', type: 'MEDICATION' as const, confidence: 0.93, source: 'biobert' as const, startChar: 180, endChar: 189 },
      { text: 'ECG', type: 'EXAM' as const, confidence: 0.88, source: 'regex' as const, startChar: 305, endChar: 308 },
      { text: 'IAM com supra de ST', type: 'DISEASE' as const, confidence: 0.89, source: 'biobert' as const, startChar: 336, endChar: 355 },
      { text: 'AAS', type: 'MEDICATION' as const, confidence: 0.91, source: 'biobert' as const, startChar: 398, endChar: 401 },
      { text: 'Clopidogrel', type: 'MEDICATION' as const, confidence: 0.94, source: 'biobert' as const, startChar: 418, endChar: 429 },
      { text: 'Heparina', type: 'MEDICATION' as const, confidence: 0.92, source: 'biobert' as const, startChar: 441, endChar: 449 },
    ],
    highlightMode: 'inline',
    showConfidence: true,
    showTooltips: true,
    fontSize: 'md',
  },
};
