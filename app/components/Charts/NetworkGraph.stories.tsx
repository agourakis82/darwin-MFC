import type { Meta, StoryObj } from '@storybook/react';
import { NetworkGraph } from './NetworkGraph';

const meta: Meta<typeof NetworkGraph> = {
  title: 'Components/Charts/NetworkGraph',
  component: NetworkGraph,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof NetworkGraph>;

export const DrugInteractions: Story = {
  render: () => (
    <NetworkGraph
      nodes={[
        { id: 'warfarin', label: 'Warfarin', type: 'medication', color: 'rgb(255, 100, 100)' },
        { id: 'aspirin', label: 'Aspirin', type: 'medication' },
        { id: 'ibuprofen', label: 'Ibuprofen', type: 'medication' },
        { id: 'cyp2c9', label: 'CYP2C9', type: 'gene', color: 'rgb(255, 150, 100)' },
        { id: 'vkorc1', label: 'VKORC1', type: 'gene', color: 'rgb(255, 150, 100)' },
        { id: 'bleeding', label: 'Bleeding Risk', type: 'symptom', color: 'rgb(255, 100, 100)' },
      ]}
      edges={[
        { source: 'warfarin', target: 'aspirin', type: 'interacts', label: 'Moderate' },
        { source: 'warfarin', target: 'ibuprofen', type: 'interacts', label: 'Moderate' },
        { source: 'warfarin', target: 'cyp2c9', type: 'metabolizes' },
        { source: 'warfarin', target: 'vkorc1', type: 'metabolizes' },
        { source: 'aspirin', target: 'bleeding', type: 'causes' },
        { source: 'warfarin', target: 'bleeding', type: 'causes' },
      ]}
      title="Drug-Drug Interactions & Pharmacogenomics"
      width={800}
      height={600}
    />
  ),
};

export const DiseaseNetwork: Story = {
  render: () => (
    <NetworkGraph
      nodes={[
        { id: 'diabetes', label: 'Diabetes', type: 'disease', color: 'rgb(100, 200, 100)' },
        { id: 'hypertension', label: 'Hypertension', type: 'disease' },
        { id: 'obesity', label: 'Obesity', type: 'disease' },
        { id: 'ckd', label: 'CKD', type: 'disease' },
        { id: 'cad', label: 'CAD', type: 'disease', color: 'rgb(255, 100, 100)' },
        { id: 'glucose', label: 'High Glucose', type: 'symptom', color: 'rgb(255, 200, 100)' },
        { id: 'metformin', label: 'Metformin', type: 'medication', color: 'rgb(100, 150, 255)' },
      ]}
      edges={[
        { source: 'diabetes', target: 'glucose', type: 'causes' },
        { source: 'diabetes', target: 'hypertension', type: 'interacts', label: 'Often comorbid' },
        { source: 'diabetes', target: 'ckd', type: 'causes' },
        { source: 'diabetes', target: 'cad', type: 'causes' },
        { source: 'obesity', target: 'diabetes', type: 'causes' },
        { source: 'hypertension', target: 'cad', type: 'causes' },
        { source: 'metformin', target: 'diabetes', type: 'treats' },
      ]}
      title="Metabolic Disease Network"
      width={800}
      height={600}
    />
  ),
};

export const MedicationClass: Story = {
  render: () => (
    <NetworkGraph
      nodes={[
        { id: 'ace_inhibitor', label: 'ACE Inhibitor', type: 'medication', color: 'rgb(100, 150, 255)' },
        { id: 'lisinopril', label: 'Lisinopril', type: 'medication' },
        { id: 'enalapril', label: 'Enalapril', type: 'medication' },
        { id: 'hypertension', label: 'Hypertension', type: 'disease', color: 'rgb(100, 200, 100)' },
        { id: 'ckd', label: 'CKD', type: 'disease' },
        { id: 'potassium', label: 'Hyperkalemia', type: 'symptom', color: 'rgb(255, 150, 100)' },
      ]}
      edges={[
        { source: 'ace_inhibitor', target: 'lisinopril', type: 'interacts', label: 'Same class' },
        { source: 'ace_inhibitor', target: 'enalapril', type: 'interacts', label: 'Same class' },
        { source: 'lisinopril', target: 'hypertension', type: 'treats' },
        { source: 'enalapril', target: 'hypertension', type: 'treats' },
        { source: 'lisinopril', target: 'ckd', type: 'treats' },
        { source: 'ace_inhibitor', target: 'potassium', type: 'causes' },
      ]}
      title="Medication Class Relationships"
      width={800}
      height={600}
    />
  ),
};
