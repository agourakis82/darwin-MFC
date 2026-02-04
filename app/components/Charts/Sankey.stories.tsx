import type { Meta, StoryObj } from '@storybook/react';
import { Sankey } from './Sankey';

const meta: Meta<typeof Sankey> = {
  title: 'Components/Charts/Sankey',
  component: Sankey,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Sankey>;

export const PatientFlow: Story = {
  render: () => (
    <Sankey
      nodes={[
        { id: 'aps', label: 'Primary Care', color: 'rgb(100, 200, 100)' },
        { id: 'card', label: 'Cardiology', color: 'rgb(100, 150, 255)' },
        { id: 'endo', label: 'Endocrinology', color: 'rgb(100, 150, 255)' },
        { id: 'neuro', label: 'Neurology', color: 'rgb(100, 150, 255)' },
        { id: 'hosp', label: 'Hospital', color: 'rgb(255, 150, 100)' },
        { id: 'home', label: 'Home Care', color: 'rgb(200, 150, 100)' },
      ]}
      links={[
        { source: 'aps', target: 'card', value: 245, label: '245' },
        { source: 'aps', target: 'endo', value: 380, label: '380' },
        { source: 'aps', target: 'neuro', value: 120, label: '120' },
        { source: 'card', target: 'hosp', value: 98, label: '98' },
        { source: 'endo', target: 'hosp', value: 152, label: '152' },
        { source: 'neuro', target: 'hosp', value: 45, label: '45' },
        { source: 'hosp', target: 'home', value: 145, label: '145' },
      ]}
      title="Patient Referral Flow (Monthly Volume)"
      formatValue={(v) => `${v.toFixed(0)}`}
    />
  ),
};

export const DiagnosticPathway: Story = {
  render: () => (
    <Sankey
      nodes={[
        { id: 'screening', label: 'Screening' },
        { id: 'initial', label: 'Initial Diagnosis' },
        { id: 'labs', label: 'Confirmatory Labs' },
        { id: 'imaging', label: 'Imaging' },
        { id: 'confirmed', label: 'Confirmed' },
        { id: 'treatment', label: 'Treatment' },
      ]}
      links={[
        { source: 'screening', target: 'initial', value: 500 },
        { source: 'initial', target: 'labs', value: 320 },
        { source: 'initial', target: 'imaging', value: 180 },
        { source: 'labs', target: 'confirmed', value: 285 },
        { source: 'imaging', target: 'confirmed', value: 165 },
        { source: 'confirmed', target: 'treatment', value: 450 },
      ]}
      title="Diagnostic Pathway Volume"
    />
  ),
};

export const MedicationAdherence: Story = {
  render: () => (
    <Sankey
      nodes={[
        { id: 'prescribed', label: 'Prescribed', color: 'rgb(100, 200, 100)' },
        { id: 'filled', label: 'Filled' },
        { id: 'started', label: 'Started' },
        { id: 'completed', label: 'Completed', color: 'rgb(100, 150, 255)' },
        { id: 'abandoned', label: 'Abandoned', color: 'rgb(255, 100, 100)' },
      ]}
      links={[
        { source: 'prescribed', target: 'filled', value: 850 },
        { source: 'prescribed', target: 'abandoned', value: 150 },
        { source: 'filled', target: 'started', value: 720 },
        { source: 'filled', target: 'abandoned', value: 130 },
        { source: 'started', target: 'completed', value: 580 },
        { source: 'started', target: 'abandoned', value: 140 },
      ]}
      title="Medication Adherence Pathway"
    />
  ),
};
