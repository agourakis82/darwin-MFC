import type { Meta, StoryObj } from '@storybook/react';
import { ClinicalAlertDisplay, type ClinicalAlert, type AlertSeverity, type AlertCategory } from './ClinicalAlertDisplay';
import type { ExtractedEntity } from '@/lib/ai/extraction/biobert-extractor';

const meta = {
  title: 'AI/ClinicalAlertDisplay',
  component: ClinicalAlertDisplay,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    maxAlerts: { control: { type: 'range', min: 1, max: 20, step: 1 } },
    compact: { control: 'boolean' },
    enableSound: { control: 'boolean' },
  },
} satisfies Meta<typeof ClinicalAlertDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// MOCK DATA
// =============================================================================

const mockMedications: ExtractedEntity[] = [
  {
    text: 'varfarina',
    type: 'MEDICATION',
    startChar: 0,
    endChar: 9,
    confidence: 0.95,
    source: 'biobert',
  },
  {
    text: 'aspirina',
    type: 'MEDICATION',
    startChar: 20,
    endChar: 28,
    confidence: 0.92,
    source: 'biobert',
  },
  {
    text: 'metformina',
    type: 'MEDICATION',
    startChar: 50,
    endChar: 60,
    confidence: 0.88,
    source: 'regex',
  },
];

const mockSymptomsRedFlag: ExtractedEntity[] = [
  {
    text: 'dor precordial intensa',
    type: 'SYMPTOM',
    startChar: 0,
    endChar: 22,
    confidence: 0.91,
    source: 'biobert',
  },
  {
    text: 'dispneia súbita',
    type: 'SYMPTOM',
    startChar: 30,
    endChar: 45,
    confidence: 0.89,
    source: 'biobert',
  },
];

const mockCriticalValues: ExtractedEntity[] = [
  {
    text: 'glicemia 450 mg/dL',
    type: 'EXAM',
    startChar: 0,
    endChar: 18,
    confidence: 0.94,
    source: 'regex',
  },
  {
    text: 'potássio 6.8 mEq/L',
    type: 'EXAM',
    startChar: 25,
    endChar: 43,
    confidence: 0.92,
    source: 'regex',
  },
  {
    text: 'INR 5.5',
    type: 'EXAM',
    startChar: 50,
    endChar: 57,
    confidence: 0.95,
    source: 'regex',
  },
];

const mockMixedEntities: ExtractedEntity[] = [
  ...mockMedications,
  ...mockSymptomsRedFlag,
  {
    text: 'diabetes mellitus tipo 2',
    type: 'DISEASE',
    startChar: 100,
    endChar: 124,
    confidence: 0.96,
    source: 'biobert',
  },
  {
    text: 'hipertensão arterial',
    type: 'DISEASE',
    startChar: 130,
    endChar: 150,
    confidence: 0.94,
    source: 'biobert',
  },
];

const customAlerts: ClinicalAlert[] = [
  {
    id: 'custom-1',
    severity: 'warning',
    category: 'monitoring',
    title: 'Monitoramento Renal Necessário',
    message: 'Paciente com TFG < 60 mL/min. Considerar ajuste de dose de metformina.',
    action: 'Solicitar creatinina e TFG em 2 semanas',
    dismissible: true,
    timestamp: new Date(),
    source: 'rule',
  },
  {
    id: 'custom-2',
    severity: 'info',
    category: 'follow-up',
    title: 'Acompanhamento Agendado',
    message: 'Retorno para avaliação de controle pressórico em 30 dias.',
    dismissible: true,
    timestamp: new Date(),
    source: 'manual',
  },
];

// =============================================================================
// STORIES
// =============================================================================

export const Default: Story = {
  args: {
    entities: mockMixedEntities,
    maxAlerts: 10,
    compact: false,
    enableSound: false,
  },
};

export const DrugInteractions: Story = {
  args: {
    entities: mockMedications,
    maxAlerts: 10,
    compact: false,
  },
};

export const RedFlagSymptoms: Story = {
  args: {
    entities: mockSymptomsRedFlag,
    maxAlerts: 10,
    compact: false,
  },
};

export const CriticalLabValues: Story = {
  args: {
    entities: mockCriticalValues,
    maxAlerts: 10,
    compact: false,
  },
};

export const WithCustomAlerts: Story = {
  args: {
    entities: mockMedications,
    customAlerts: customAlerts,
    maxAlerts: 10,
    compact: false,
  },
};

export const CompactMode: Story = {
  args: {
    entities: mockMixedEntities,
    customAlerts: customAlerts,
    maxAlerts: 10,
    compact: true,
  },
};

export const FilterBySeverity: Story = {
  args: {
    entities: mockMixedEntities,
    customAlerts: customAlerts,
    filterSeverity: ['critical'],
    maxAlerts: 10,
    compact: false,
  },
};

export const FilterByCategory: Story = {
  args: {
    entities: mockMixedEntities,
    customAlerts: customAlerts,
    filterCategory: ['drug-interaction', 'critical-value'],
    maxAlerts: 10,
    compact: false,
  },
};

export const LimitedAlerts: Story = {
  args: {
    entities: mockMixedEntities,
    customAlerts: customAlerts,
    maxAlerts: 3,
    compact: false,
  },
};

export const NoAlerts: Story = {
  args: {
    entities: [
      {
        text: 'hipertensão arterial',
        type: 'DISEASE',
        startChar: 0,
        endChar: 20,
        confidence: 0.94,
        source: 'biobert',
      },
    ],
    maxAlerts: 10,
    compact: false,
  },
};

export const AllSeverityLevels: Story = {
  args: {
    ...Default.args,
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Critical Alerts</h3>
        <ClinicalAlertDisplay
          entities={mockMedications}
          filterSeverity={['critical']}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Warning Alerts</h3>
        <ClinicalAlertDisplay
          entities={[]}
          customAlerts={[customAlerts[0]]}
          filterSeverity={['warning']}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Info Alerts</h3>
        <ClinicalAlertDisplay
          entities={[]}
          customAlerts={[customAlerts[1]]}
          filterSeverity={['info']}
        />
      </div>
    </div>
  ),
};

export const AllCategories: Story = {
  args: {
    ...Default.args,
  },
  render: () => {
    const categoryAlerts: ClinicalAlert[] = [
      {
        id: 'cat-1',
        severity: 'critical',
        category: 'drug-interaction',
        title: 'Interação Medicamentosa',
        message: 'Varfarina + Aspirina: risco aumentado de sangramento',
        dismissible: true,
        timestamp: new Date(),
        source: 'ner',
      },
      {
        id: 'cat-2',
        severity: 'critical',
        category: 'contraindication',
        title: 'Contraindicação',
        message: 'Metformina contraindicada em TFG < 30',
        dismissible: true,
        timestamp: new Date(),
        source: 'rule',
      },
      {
        id: 'cat-3',
        severity: 'critical',
        category: 'critical-value',
        title: 'Valor Crítico',
        message: 'Potássio 6.8 mEq/L - hipercalemia',
        dismissible: true,
        timestamp: new Date(),
        source: 'ner',
      },
      {
        id: 'cat-4',
        severity: 'critical',
        category: 'red-flag',
        title: 'Sinal de Alerta',
        message: 'Dor precordial intensa - avaliar SCA',
        dismissible: true,
        timestamp: new Date(),
        source: 'ner',
      },
      {
        id: 'cat-5',
        severity: 'warning',
        category: 'dosage',
        title: 'Alerta de Dosagem',
        message: 'Dose de gabapentina pode ser alta para TFG atual',
        dismissible: true,
        timestamp: new Date(),
        source: 'rule',
      },
      {
        id: 'cat-6',
        severity: 'warning',
        category: 'monitoring',
        title: 'Monitoramento',
        message: 'Considerar monitorar INR mais frequentemente',
        dismissible: true,
        timestamp: new Date(),
        source: 'rule',
      },
      {
        id: 'cat-7',
        severity: 'info',
        category: 'follow-up',
        title: 'Acompanhamento',
        message: 'Retorno em 30 dias para reavaliação',
        dismissible: true,
        timestamp: new Date(),
        source: 'manual',
      },
    ];

    return (
      <ClinicalAlertDisplay
        entities={[]}
        customAlerts={categoryAlerts}
        maxAlerts={10}
      />
    );
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const handleEntityClick = (entity: ExtractedEntity) => {
      alert(`Entity clicked: ${entity.text} (${entity.type})`);
    };

    const handleDismiss = (alertId: string) => {
      console.log(`Alert dismissed: ${alertId}`);
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Clinical Alerts</h3>
        <p className="text-sm text-slate-500">
          Click on entity badges to see entity details. Dismiss alerts using the X button.
        </p>
        <ClinicalAlertDisplay
          entities={mockMixedEntities}
          customAlerts={customAlerts}
          onEntityClick={handleEntityClick}
          onAlertDismiss={handleDismiss}
          maxAlerts={10}
        />
      </div>
    );
  },
  args: {
    entities: [],
  },
};

export const RealWorldScenario: Story = {
  render: () => {
    const realWorldEntities: ExtractedEntity[] = [
      // Medications that interact
      { text: 'varfarina 5mg', type: 'MEDICATION', startChar: 0, endChar: 13, confidence: 0.96, source: 'biobert' },
      { text: 'aspirina 100mg', type: 'MEDICATION', startChar: 20, endChar: 34, confidence: 0.94, source: 'biobert' },
      { text: 'omeprazol 20mg', type: 'MEDICATION', startChar: 40, endChar: 54, confidence: 0.92, source: 'regex' },
      { text: 'clopidogrel 75mg', type: 'MEDICATION', startChar: 60, endChar: 76, confidence: 0.91, source: 'biobert' },
      // Red flag symptom
      { text: 'melena', type: 'SYMPTOM', startChar: 100, endChar: 106, confidence: 0.89, source: 'biobert' },
      // Critical lab
      { text: 'hemoglobina 6.5 g/dL', type: 'EXAM', startChar: 120, endChar: 140, confidence: 0.95, source: 'regex' },
      { text: 'INR 4.8', type: 'EXAM', startChar: 145, endChar: 152, confidence: 0.97, source: 'regex' },
      // Diseases
      { text: 'fibrilação atrial', type: 'DISEASE', startChar: 160, endChar: 177, confidence: 0.93, source: 'biobert' },
      { text: 'úlcera péptica', type: 'DISEASE', startChar: 180, endChar: 194, confidence: 0.88, source: 'biobert' },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Cenário Clínico: Paciente Complexo</h3>
        <p className="text-sm text-slate-500 mb-4">
          Paciente com fibrilação atrial em uso de anticoagulação, apresentando sinais de sangramento digestivo.
        </p>
        <ClinicalAlertDisplay
          entities={realWorldEntities}
          maxAlerts={15}
        />
      </div>
    );
  },
  args: {
    entities: [],
  },
};
