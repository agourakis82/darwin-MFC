import type { Meta, StoryObj } from '@storybook/react';
import { Treemap } from './Treemap';

const meta: Meta<typeof Treemap> = {
  title: 'Components/Charts/Treemap',
  component: Treemap,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Treemap>;

export const ICDHierarchy: Story = {
  render: () => (
    <Treemap
      data={{
        id: 'root',
        label: 'ICD-10 Diseases',
        value: 1000,
        children: [
          {
            id: 'infectious',
            label: 'Infectious Diseases',
            value: 250,
            color: 'rgb(255, 100, 100)',
            children: [
              { id: 'respiratory', label: 'Respiratory', value: 150 },
              { id: 'gastrointestinal', label: 'GI', value: 100 },
            ],
          },
          {
            id: 'chronic',
            label: 'Chronic Diseases',
            value: 400,
            color: 'rgb(100, 200, 100)',
            children: [
              { id: 'diabetes', label: 'Diabetes', value: 180 },
              { id: 'hypertension', label: 'Hypertension', value: 220 },
            ],
          },
          {
            id: 'mental',
            label: 'Mental Health',
            value: 200,
            color: 'rgb(100, 150, 255)',
            children: [
              { id: 'depression', label: 'Depression', value: 120 },
              { id: 'anxiety', label: 'Anxiety', value: 80 },
            ],
          },
          {
            id: 'trauma',
            label: 'Injury & Trauma',
            value: 150,
            color: 'rgb(255, 150, 100)',
          },
        ],
      }}
      title="Disease Distribution by ICD-10 Category"
      formatValue={(v) => `${v} patients`}
    />
  ),
};

export const MedicationByClass: Story = {
  render: () => (
    <Treemap
      data={{
        id: 'root',
        label: 'Medications',
        value: 2000,
        children: [
          {
            id: 'cardiovascular',
            label: 'Cardiovascular',
            value: 600,
            color: 'rgb(255, 100, 100)',
            children: [
              { id: 'beta_blockers', label: 'Beta Blockers', value: 250 },
              { id: 'ace_inhibitors', label: 'ACE Inhibitors', value: 350 },
            ],
          },
          {
            id: 'antibiotics',
            label: 'Antibiotics',
            value: 400,
            color: 'rgb(100, 200, 100)',
            children: [
              { id: 'beta_lactams', label: 'Beta-lactams', value: 250 },
              { id: 'macrolides', label: 'Macrolides', value: 150 },
            ],
          },
          {
            id: 'endocrine',
            label: 'Endocrine',
            value: 500,
            color: 'rgb(100, 150, 255)',
            children: [
              { id: 'insulin', label: 'Insulin', value: 300 },
              { id: 'oral_agents', label: 'Oral Agents', value: 200 },
            ],
          },
          {
            id: 'other',
            label: 'Other',
            value: 500,
            color: 'rgb(200, 150, 100)',
          },
        ],
      }}
      title="Medications Prescribed by ATC Class"
      formatValue={(v) => `${v} prescriptions`}
    />
  ),
};
