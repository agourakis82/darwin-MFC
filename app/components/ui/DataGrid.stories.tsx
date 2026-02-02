import type { Meta, StoryObj } from '@storybook/react';
import { ColumnDef } from '@tanstack/react-table';
import { DataGrid } from './DataGrid';

const meta: Meta<typeof DataGrid> = {
  title: 'Components/Data Display/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

interface Disease {
  id: string;
  name: string;
  category: string;
  cid10: string;
  prevalence: string;
}

const diseases: Disease[] = [
  { id: '1', name: 'Type 2 Diabetes', category: 'Endocrine', cid10: 'E11', prevalence: 'High' },
  { id: '2', name: 'Type 1 Diabetes', category: 'Endocrine', cid10: 'E10', prevalence: 'Moderate' },
  { id: '3', name: 'Hypertension', category: 'Cardiovascular', cid10: 'I10', prevalence: 'Very High' },
  { id: '4', name: 'Coronary Artery Disease', category: 'Cardiovascular', cid10: 'I25', prevalence: 'High' },
  { id: '5', name: 'Heart Failure', category: 'Cardiovascular', cid10: 'I50', prevalence: 'Moderate' },
  { id: '6', name: 'COPD', category: 'Respiratory', cid10: 'J44', prevalence: 'High' },
  { id: '7', name: 'Asthma', category: 'Respiratory', cid10: 'J45', prevalence: 'Very High' },
  { id: '8', name: 'Pneumonia', category: 'Respiratory', cid10: 'J18', prevalence: 'Moderate' },
];

const columns: ColumnDef<Disease>[] = [
  {
    accessorKey: 'name',
    header: 'Disease Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'cid10',
    header: 'ICD-10',
  },
  {
    accessorKey: 'prevalence',
    header: 'Prevalence',
  },
];

export const Default: Story = {
  render: () => <DataGrid data={diseases} columns={columns} />,
};

export const Grouped: Story = {
  render: () => <DataGrid data={diseases} columns={columns} enableGrouping={true} groupBy={['category']} />,
};

export const Expandable: Story = {
  render: () => <DataGrid data={diseases} columns={columns} enableExpanding={true} />,
};

export const GroupedAndExpandable: Story = {
  render: () => (
    <DataGrid
      data={diseases}
      columns={columns}
      enableGrouping={true}
      enableExpanding={true}
      groupBy={['category']}
    />
  ),
};

export const NoData: Story = {
  render: () => <DataGrid data={[]} columns={columns} emptyMessage="No diseases found" />,
};

export const Striped: Story = {
  render: () => <DataGrid data={diseases} columns={columns} striped={true} />,
};

export const Dense: Story = {
  render: () => <DataGrid data={diseases} columns={columns} dense={true} />,
};

export const HierarchicalData: Story = {
  render: () => {
    interface ScreeningProgram {
      id: string;
      name: string;
      type: string;
      targetAge: string;
      frequency: string;
      subRows?: ScreeningProgram[];
    }

    const screeningData: ScreeningProgram[] = [
      {
        id: '1',
        name: 'Cancer Screening',
        type: 'Category',
        targetAge: 'Adults',
        frequency: 'Annual',
        subRows: [
          { id: '1-1', name: 'Mammography', type: 'Breast', targetAge: 'Women 40+', frequency: 'Annual' },
          { id: '1-2', name: 'Colonoscopy', type: 'Colon', targetAge: 'Adults 50+', frequency: 'Every 10y' },
          { id: '1-3', name: 'PSA Test', type: 'Prostate', targetAge: 'Men 50+', frequency: 'Annual' },
        ],
      },
      {
        id: '2',
        name: 'Metabolic Screening',
        type: 'Category',
        targetAge: 'Adults',
        frequency: 'Periodic',
        subRows: [
          { id: '2-1', name: 'Glucose', type: 'Diabetes', targetAge: 'Adults', frequency: 'Every 3y' },
          { id: '2-2', name: 'Lipids', type: 'Cardiovascular', targetAge: 'Adults', frequency: 'Every 5y' },
        ],
      },
    ];

    const screeningColumns: ColumnDef<ScreeningProgram>[] = [
      { accessorKey: 'name', header: 'Screening Name' },
      { accessorKey: 'type', header: 'Type' },
      { accessorKey: 'targetAge', header: 'Target Age' },
      { accessorKey: 'frequency', header: 'Frequency' },
    ];

    return (
      <DataGrid
        data={screeningData}
        columns={screeningColumns}
        enableExpanding={true}
      />
    );
  },
};

export const MedicationsByClass: Story = {
  render: () => {
    interface Medication {
      id: string;
      name: string;
      class: string;
      strength: string;
    }

    const medicationsByClass: Medication[] = [
      { id: '1', name: 'Lisinopril', class: 'ACE Inhibitors', strength: '10mg' },
      { id: '2', name: 'Enalapril', class: 'ACE Inhibitors', strength: '5mg' },
      { id: '3', name: 'Atorvastatin', class: 'Statins', strength: '20mg' },
      { id: '4', name: 'Simvastatin', class: 'Statins', strength: '40mg' },
      { id: '5', name: 'Amoxicillin', class: 'Antibiotics', strength: '500mg' },
    ];

    const medColumns: ColumnDef<Medication>[] = [
      { accessorKey: 'name', header: 'Medication' },
      { accessorKey: 'class', header: 'Drug Class' },
      { accessorKey: 'strength', header: 'Strength' },
    ];

    return (
      <DataGrid
        data={medicationsByClass}
        columns={medColumns}
        enableGrouping={true}
        groupBy={['class']}
        striped
      />
    );
  },
};

export const ProtocolHierarchy: Story = {
  render: () => {
    interface ProtocolStep {
      id: string;
      step: string;
      action: string;
      timing: string;
      subRows?: ProtocolStep[];
    }

    const protocolData: ProtocolStep[] = [
      {
        id: '1',
        step: 'Initial',
        action: 'Assessment Phase',
        timing: 'First week',
        subRows: [
          { id: '1-1', step: '1.1', action: 'History and Physical', timing: 'Day 1' },
          { id: '1-2', step: '1.2', action: 'Lab Tests', timing: 'Day 2-3' },
          { id: '1-3', step: '1.3', action: 'Imaging', timing: 'Day 3-4' },
        ],
      },
      {
        id: '2',
        step: 'Treatment',
        action: 'Treatment Phase',
        timing: 'Week 2-4',
        subRows: [
          { id: '2-1', step: '2.1', action: 'Medical Management', timing: 'Daily' },
          { id: '2-2', step: '2.2', action: 'Monitoring', timing: 'Weekly' },
        ],
      },
    ];

    const protocolColumns: ColumnDef<ProtocolStep>[] = [
      { accessorKey: 'step', header: 'Step' },
      { accessorKey: 'action', header: 'Action' },
      { accessorKey: 'timing', header: 'Timing' },
    ];

    return (
      <DataGrid
        data={protocolData}
        columns={protocolColumns}
        enableExpanding={true}
        striped
      />
    );
  },
};

export const ClinicalCategories: Story = {
  render: () => {
    interface ClinicalItem {
      id: string;
      name: string;
      category: string;
      severity: string;
    }

    const clinicalData: ClinicalItem[] = [
      { id: '1', name: 'Chest Pain', category: 'Cardiac', severity: 'High' },
      { id: '2', name: 'Palpitations', category: 'Cardiac', severity: 'Moderate' },
      { id: '3', name: 'Shortness of Breath', category: 'Respiratory', severity: 'High' },
      { id: '4', name: 'Cough', category: 'Respiratory', severity: 'Low' },
      { id: '5', name: 'Headache', category: 'Neurological', severity: 'Low' },
      { id: '6', name: 'Seizure', category: 'Neurological', severity: 'High' },
    ];

    const clinicalColumns: ColumnDef<ClinicalItem>[] = [
      { accessorKey: 'name', header: 'Symptom' },
      { accessorKey: 'category', header: 'System' },
      { accessorKey: 'severity', header: 'Severity' },
    ];

    return (
      <DataGrid
        data={clinicalData}
        columns={clinicalColumns}
        enableGrouping={true}
        groupBy={['category']}
        striped
      />
    );
  },
};

export const LargeHierarchy: Story = {
  render: () => {
    const generateLargeDataset = () => {
      const categories = ['Infections', 'Chronic', 'Acute'];
      return categories.flatMap((cat, catIdx) =>
        Array.from({ length: 3 }, (_, subIdx) => ({
          id: `${catIdx}-${subIdx}`,
          name: `Disease ${catIdx}-${subIdx}`,
          category: cat,
          cid10: `J${10 + catIdx}${subIdx}`,
          prevalence: ['Low', 'Moderate', 'High'][subIdx],
        }))
      );
    };

    const columns: ColumnDef<any>[] = [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'category', header: 'Category' },
      { accessorKey: 'cid10', header: 'ICD-10' },
      { accessorKey: 'prevalence', header: 'Prevalence' },
    ];

    return (
      <DataGrid
        data={generateLargeDataset()}
        columns={columns}
        enableGrouping={true}
        groupBy={['category']}
        pageSize={8}
      />
    );
  },
};
