import type { Meta, StoryObj } from '@storybook/react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

interface Medication {
  id: string;
  name: string;
  class: string;
  dosage: string;
  frequency: string;
}

const medications: Medication[] = [
  { id: '1', name: 'Lisinopril', class: 'ACE Inhibitor', dosage: '10mg', frequency: 'Daily' },
  { id: '2', name: 'Metformin', class: 'Antidiabetic', dosage: '500mg', frequency: 'Twice daily' },
  { id: '3', name: 'Atorvastatin', class: 'Statin', dosage: '20mg', frequency: 'Daily' },
  { id: '4', name: 'Omeprazole', class: 'PPI', dosage: '20mg', frequency: 'Daily' },
  { id: '5', name: 'Sertraline', class: 'SSRI', dosage: '50mg', frequency: 'Daily' },
  { id: '6', name: 'Amoxicillin', class: 'Antibiotic', dosage: '500mg', frequency: 'Three times' },
  { id: '7', name: 'Ibuprofen', class: 'NSAID', dosage: '400mg', frequency: 'As needed' },
  { id: '8', name: 'Levothyroxine', class: 'Thyroid', dosage: '75mcg', frequency: 'Daily' },
];

const columns: ColumnDef<Medication>[] = [
  {
    accessorKey: 'name',
    header: 'Medication Name',
  },
  {
    accessorKey: 'class',
    header: 'Drug Class',
  },
  {
    accessorKey: 'dosage',
    header: 'Dosage',
  },
  {
    accessorKey: 'frequency',
    header: 'Frequency',
  },
];

export const Default: Story = {
  render: () => <Table data={medications} columns={columns} />,
};

export const NoData: Story = {
  render: () => <Table data={[]} columns={columns} emptyMessage="No medications found" />,
};

export const Loading: Story = {
  render: () => <Table data={[]} columns={columns} isLoading={true} />,
};

export const CustomPageSize: Story = {
  render: () => <Table data={medications} columns={columns} pageSize={5} />,
};

export const Striped: Story = {
  render: () => <Table data={medications} columns={columns} striped={true} />,
};

export const Hoverable: Story = {
  render: () => <Table data={medications} columns={columns} hoverable={true} />,
};

export const Dense: Story = {
  render: () => <Table data={medications} columns={columns} dense={true} />,
};

export const DenseStriped: Story = {
  render: () => <Table data={medications} columns={columns} dense={true} striped={true} />,
};

export const LabResults: Story = {
  render: () => {
    interface LabResult {
      id: string;
      test: string;
      value: number;
      unit: string;
      reference: string;
      date: string;
    }

    const labResults: LabResult[] = [
      { id: '1', test: 'Glucose', value: 95, unit: 'mg/dL', reference: '70-100', date: '2024-01-15' },
      { id: '2', test: 'Cholesterol', value: 180, unit: 'mg/dL', reference: '<200', date: '2024-01-15' },
      { id: '3', test: 'HDL', value: 45, unit: 'mg/dL', reference: '>40', date: '2024-01-15' },
      { id: '4', test: 'LDL', value: 110, unit: 'mg/dL', reference: '<130', date: '2024-01-15' },
      { id: '5', test: 'Triglycerides', value: 120, unit: 'mg/dL', reference: '<150', date: '2024-01-15' },
    ];

    const labColumns: ColumnDef<LabResult>[] = [
      { accessorKey: 'test', header: 'Test Name' },
      { accessorKey: 'value', header: 'Result' },
      { accessorKey: 'unit', header: 'Unit' },
      { accessorKey: 'reference', header: 'Reference Range' },
      { accessorKey: 'date', header: 'Date' },
    ];

    return <Table data={labResults} columns={labColumns} striped hoverable />;
  },
};

export const DiseaseDifferential: Story = {
  render: () => {
    interface Disease {
      id: string;
      name: string;
      icd10: string;
      prevalence: string;
      severity: string;
    }

    const diseases: Disease[] = [
      { id: '1', name: 'Type 2 Diabetes', icd10: 'E11', prevalence: 'Very High', severity: 'Moderate' },
      { id: '2', name: 'Hypertension', icd10: 'I10', prevalence: 'Very High', severity: 'Moderate' },
      { id: '3', name: 'Dyslipidemia', icd10: 'E78', prevalence: 'High', severity: 'Low' },
      { id: '4', name: 'Obesity', icd10: 'E66', prevalence: 'High', severity: 'Moderate' },
    ];

    const diseaseColumns: ColumnDef<Disease>[] = [
      { accessorKey: 'name', header: 'Disease' },
      { accessorKey: 'icd10', header: 'ICD-10' },
      { accessorKey: 'prevalence', header: 'Prevalence' },
      { accessorKey: 'severity', header: 'Severity' },
    ];

    return <Table data={diseases} columns={diseaseColumns} striped hoverable />;
  },
};

export const ProtocolSteps: Story = {
  render: () => {
    interface ProtocolStep {
      id: string;
      step: number;
      action: string;
      timing: string;
      notes: string;
    }

    const steps: ProtocolStep[] = [
      { id: '1', step: 1, action: 'Initial Assessment', timing: 'First visit', notes: 'Complete history and physical' },
      { id: '2', step: 2, action: 'Lab Tests', timing: 'Within 24h', notes: 'CBC, BMP, LFTs' },
      { id: '3', step: 3, action: 'Imaging', timing: 'Within 48h', notes: 'Chest X-ray, ECG' },
      { id: '4', step: 4, action: 'Treatment', timing: 'After results', notes: 'Based on findings' },
    ];

    const stepColumns: ColumnDef<ProtocolStep>[] = [
      { accessorKey: 'step', header: 'Step' },
      { accessorKey: 'action', header: 'Action' },
      { accessorKey: 'timing', header: 'Timing' },
      { accessorKey: 'notes', header: 'Notes' },
    ];

    return <Table data={steps} columns={stepColumns} striped />;
  },
};

export const MedicationInteractions: Story = {
  render: () => {
    interface Interaction {
      id: string;
      drug1: string;
      drug2: string;
      severity: string;
      mechanism: string;
    }

    const interactions: Interaction[] = [
      { id: '1', drug1: 'Warfarin', drug2: 'Ibuprofen', severity: 'High', mechanism: 'Increased bleeding risk' },
      { id: '2', drug1: 'Metformin', drug2: 'Alcohol', severity: 'Moderate', mechanism: 'Lactic acidosis risk' },
      { id: '3', drug1: 'ACE Inhibitor', drug2: 'Potassium', severity: 'Moderate', mechanism: 'Hyperkalemia risk' },
    ];

    const interactionColumns: ColumnDef<Interaction>[] = [
      { accessorKey: 'drug1', header: 'Drug 1' },
      { accessorKey: 'drug2', header: 'Drug 2' },
      { accessorKey: 'severity', header: 'Severity' },
      { accessorKey: 'mechanism', header: 'Interaction Mechanism' },
    ];

    return <Table data={interactions} columns={interactionColumns} striped />;
  },
};

export const LargeDataset: Story = {
  render: () => {
    const largeDataset = Array.from({ length: 100 }, (_, i) => ({
      id: String(i + 1),
      name: `Medication ${i + 1}`,
      class: ['ACE Inhibitor', 'Statin', 'Antibiotic', 'NSAID', 'SSRI'][i % 5],
      dosage: `${(i % 5 + 1) * 10}mg`,
      frequency: ['Daily', 'Twice daily', 'Three times', 'As needed', 'Weekly'][i % 5],
    }));

    return <Table data={largeDataset} columns={columns} pageSize={10} />;
  },
};
