import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  EntityCorrectionModal,
  QuickFeedbackButtons,
  CorrectionSummary,
  type CorrectionEntity,
  type EntityCorrection,
  type FeedbackType,
} from './EntityCorrectionModal';

const sampleEntity: CorrectionEntity = {
  text: 'diabetes mellitus',
  type: 'DISEASE',
  startChar: 13,
  endChar: 30,
  confidence: 0.92,
  source: 'biobert',
};

const sampleContextText = 'Paciente com diabetes mellitus tipo 2 em uso de metformina 850mg. Refere cefaleia há 3 dias.';

const sampleCorrections: EntityCorrection[] = [
  {
    originalEntity: sampleEntity,
    correctedEntity: sampleEntity,
    feedbackType: 'correct',
    timestamp: new Date(),
  },
  {
    originalEntity: { ...sampleEntity, text: 'diabetes', type: 'MEDICATION' },
    correctedEntity: { ...sampleEntity, type: 'DISEASE' },
    feedbackType: 'incorrect_type',
    comment: 'Should be Disease, not Medication',
    timestamp: new Date(),
  },
  {
    originalEntity: null,
    correctedEntity: { text: 'cefaleia', type: 'SYMPTOM', startChar: 74, endChar: 82 },
    feedbackType: 'missing',
    timestamp: new Date(),
  },
];

const meta = {
  title: 'AI/EntityCorrectionModal',
  component: EntityCorrectionModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'modal closed' },
    entity: { control: 'object' },
    contextText: { control: 'text' },
    onSubmit: { action: 'correction submitted' },
    entityTypes: { control: 'object' },
    enableTextSelection: { control: 'boolean' },
  },
} satisfies Meta<typeof EntityCorrectionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    entity: sampleEntity,
    contextText: sampleContextText,
    onSubmit: (correction) => console.log('Correction submitted:', correction),
    entityTypes: ['DISEASE', 'MEDICATION', 'SYMPTOM', 'EXAM', 'PROCEDURE'],
    enableTextSelection: true,
  },
};

export const CorrectEntity: Story = {
  args: {
    ...Default.args,
    entity: sampleEntity,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal opened to confirm an entity is correctly identified.',
      },
    },
  },
};

export const WrongBoundaries: Story = {
  args: {
    ...Default.args,
    entity: {
      ...sampleEntity,
      text: 'diabetes',
      endChar: 21,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Entity text boundaries are incorrect (should include "mellitus").',
      },
    },
  },
};

export const WrongType: Story = {
  args: {
    ...Default.args,
    entity: {
      ...sampleEntity,
      type: 'MEDICATION',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Entity was classified as MEDICATION but should be DISEASE.',
      },
    },
  },
};

export const AddMissingEntity: Story = {
  args: {
    ...Default.args,
    entity: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Adding a new entity that was missed by NER.',
      },
    },
  },
};

export const MarkAsSpurious: Story = {
  args: {
    ...Default.args,
    entity: {
      text: '850mg',
      type: 'MEDICATION',
      startChar: 59,
      endChar: 64,
      confidence: 0.65,
      source: 'regex',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Marking a false positive detection as not an entity.',
      },
    },
  },
};

export const LimitedEntityTypes: Story = {
  args: {
    ...Default.args,
    entityTypes: ['DISEASE', 'SYMPTOM'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal with limited entity type options.',
      },
    },
  },
};

export const WithoutTextSelection: Story = {
  args: {
    ...Default.args,
    enableTextSelection: false,
  },
};

// Interactive story with state
export const Interactive: Story = {
  args: {
    ...Default.args,
  },
  render: () => {
    const InteractiveModal = () => {
      const [isOpen, setIsOpen] = useState(true);
      const [corrections, setCorrections] = useState<EntityCorrection[]>([]);

      const handleSubmit = (correction: EntityCorrection) => {
        setCorrections([...corrections, correction]);
        console.log('Correction submitted:', correction);
      };

      return (
        <div className="space-y-4">
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Open Modal
          </button>
          <EntityCorrectionModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            entity={sampleEntity}
            contextText={sampleContextText}
            onSubmit={handleSubmit}
            entityTypes={['DISEASE', 'MEDICATION', 'SYMPTOM', 'EXAM', 'PROCEDURE']}
            enableTextSelection={true}
          />
          {corrections.length > 0 && (
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <h4 className="font-medium mb-2">Submitted Corrections:</h4>
              <CorrectionSummary corrections={corrections} />
            </div>
          )}
        </div>
      );
    };

    return <InteractiveModal />;
  },
};

// QuickFeedbackButtons story
export const QuickFeedback: StoryObj<typeof QuickFeedbackButtons> = {
  args: {},
  render: () => {
    const FeedbackDemo = () => {
      const [lastFeedback, setLastFeedback] = useState<FeedbackType | null>(null);

      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Default Size</h3>
            <QuickFeedbackButtons
              onFeedback={(type) => setLastFeedback(type)}
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Compact</h3>
            <QuickFeedbackButtons
              onFeedback={(type) => setLastFeedback(type)}
              compact
            />
          </div>
          {lastFeedback && (
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-sm">
              Last feedback: <strong>{lastFeedback}</strong>
            </div>
          )}
        </div>
      );
    };

    return <FeedbackDemo />;
  },
};

// CorrectionSummary story
export const Summary: StoryObj<typeof CorrectionSummary> = {
  args: {},
  render: () => {
    const SummaryDemo = () => {
      const [corrections, setCorrections] = useState<EntityCorrection[]>(sampleCorrections);

      const handleRemove = (index: number) => {
        setCorrections(corrections.filter((_, i) => i !== index));
      };

      return (
        <div className="space-y-6 max-w-md">
          <div>
            <h3 className="text-sm font-medium mb-2">With Remove Action</h3>
            <CorrectionSummary
              corrections={corrections}
              onRemove={handleRemove}
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Read-only</h3>
            <CorrectionSummary corrections={sampleCorrections} />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Empty State</h3>
            <CorrectionSummary corrections={[]} />
          </div>
        </div>
      );
    };

    return <SummaryDemo />;
  },
};

// Full workflow story
export const FullWorkflow: Story = {
  args: {
    ...Default.args,
  },
  render: () => {
    const WorkflowDemo = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [currentEntity, setCurrentEntity] = useState<CorrectionEntity | null>(null);
      const [corrections, setCorrections] = useState<EntityCorrection[]>([]);

      const entities: CorrectionEntity[] = [
        { text: 'diabetes mellitus', type: 'DISEASE', startChar: 13, endChar: 30, confidence: 0.92, source: 'biobert' },
        { text: 'metformina', type: 'MEDICATION', startChar: 48, endChar: 58, confidence: 0.88, source: 'biobert' },
        { text: 'cefaleia', type: 'SYMPTOM', startChar: 74, endChar: 82, confidence: 0.75, source: 'hybrid' },
      ];

      const handleEntityClick = (entity: CorrectionEntity) => {
        setCurrentEntity(entity);
        setIsOpen(true);
      };

      const handleSubmit = (correction: EntityCorrection) => {
        setCorrections([...corrections, correction]);
      };

      return (
        <div className="space-y-6 max-w-2xl">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border">
            <h3 className="font-medium mb-3">Clinical Text with Entities</h3>
            <p className="text-sm mb-4">{sampleContextText}</p>
            <div className="flex flex-wrap gap-2">
              {entities.map((entity, i) => (
                <button
                  key={i}
                  onClick={() => handleEntityClick(entity)}
                  className="px-2 py-1 text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded hover:ring-2 ring-blue-500"
                >
                  {entity.text} ({entity.type})
                </button>
              ))}
              <button
                onClick={() => {
                  setCurrentEntity(null);
                  setIsOpen(true);
                }}
                className="px-2 py-1 text-sm bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 rounded hover:ring-2 ring-green-500"
              >
                + Add Missing
              </button>
            </div>
          </div>

          <EntityCorrectionModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            entity={currentEntity}
            contextText={sampleContextText}
            onSubmit={handleSubmit}
            entityTypes={['DISEASE', 'MEDICATION', 'SYMPTOM', 'EXAM', 'PROCEDURE']}
            enableTextSelection={true}
          />

          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <CorrectionSummary
              corrections={corrections}
              onRemove={(i) => setCorrections(corrections.filter((_, idx) => idx !== i))}
            />
          </div>
        </div>
      );
    };

    return <WorkflowDemo />;
  },
};
