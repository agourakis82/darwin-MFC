import type { Meta, StoryObj } from '@storybook/react';
import { Heatmap } from './Heatmap';

const meta: Meta<typeof Heatmap> = {
  title: 'Components/Charts/Heatmap',
  component: Heatmap,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Heatmap>;

export const DiseasePrevalenceByRegion: Story = {
  render: () => {
    const data = [
      { row: 'Diabetes', column: 'São Paulo', value: 8.5 },
      { row: 'Diabetes', column: 'Rio de Janeiro', value: 7.2 },
      { row: 'Diabetes', column: 'Minas Gerais', value: 6.1 },
      { row: 'Hypertension', column: 'São Paulo', value: 24.5 },
      { row: 'Hypertension', column: 'Rio de Janeiro', value: 22.8 },
      { row: 'Hypertension', column: 'Minas Gerais', value: 19.3 },
      { row: 'Obesity', column: 'São Paulo', value: 18.2 },
      { row: 'Obesity', column: 'Rio de Janeiro', value: 16.5 },
      { row: 'Obesity', column: 'Minas Gerais', value: 14.7 },
    ];

    return (
      <Heatmap
        data={data}
        title="Disease Prevalence by State (%)"
        rows={['Diabetes', 'Hypertension', 'Obesity']}
        columns={['São Paulo', 'Rio de Janeiro', 'Minas Gerais']}
        colorScheme="sequential"
        tooltipFormatter={(v) => `${v.toFixed(1)}%`}
      />
    );
  },
};

export const DivergingScale: Story = {
  render: () => {
    const data = [
      { row: 'Protocol A', column: 'Hospital 1', value: 50 },
      { row: 'Protocol A', column: 'Hospital 2', value: 75 },
      { row: 'Protocol A', column: 'Hospital 3', value: 25 },
      { row: 'Protocol B', column: 'Hospital 1', value: 60 },
      { row: 'Protocol B', column: 'Hospital 2', value: 45 },
      { row: 'Protocol B', column: 'Hospital 3', value: 80 },
      { row: 'Protocol C', column: 'Hospital 1', value: 70 },
      { row: 'Protocol C', column: 'Hospital 2', value: 55 },
      { row: 'Protocol C', column: 'Hospital 3', value: 40 },
    ];

    return (
      <Heatmap
        data={data}
        title="Protocol Adherence by Hospital (0-100%)"
        rows={['Protocol A', 'Protocol B', 'Protocol C']}
        columns={['Hospital 1', 'Hospital 2', 'Hospital 3']}
        colorScheme="diverging"
        min={0}
        max={100}
        tooltipFormatter={(v) => `${v.toFixed(0)}%`}
      />
    );
  },
};

export const LabValueDistribution: Story = {
  render: () => {
    const data = [
      { row: 'Age 18-30', column: 'Glucose', value: 95 },
      { row: 'Age 18-30', column: 'Cholesterol', value: 190 },
      { row: 'Age 18-30', column: 'Triglycerides', value: 120 },
      { row: 'Age 31-60', column: 'Glucose', value: 108 },
      { row: 'Age 31-60', column: 'Cholesterol', value: 220 },
      { row: 'Age 31-60', column: 'Triglycerides', value: 165 },
      { row: 'Age 60+', column: 'Glucose', value: 125 },
      { row: 'Age 60+', column: 'Cholesterol', value: 245 },
      { row: 'Age 60+', column: 'Triglycerides', value: 190 },
    ];

    return (
      <Heatmap
        data={data}
        title="Mean Lab Values by Age Group (mg/dL)"
        rows={['Age 18-30', 'Age 31-60', 'Age 60+']}
        columns={['Glucose', 'Cholesterol', 'Triglycerides']}
        colorScheme="sequential"
        tooltipFormatter={(v) => `${v.toFixed(0)} mg/dL`}
      />
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const data = [
      { row: 'COVID-19', column: '2020', value: 450 },
      { row: 'COVID-19', column: '2021', value: 280 },
      { row: 'COVID-19', column: '2022', value: 45 },
      { row: 'Dengue', column: '2020', value: 120 },
      { row: 'Dengue', column: '2021', value: 340 },
      { row: 'Dengue', column: '2022', value: 200 },
      { row: 'Zika', column: '2020', value: 85 },
      { row: 'Zika', column: '2021', value: 45 },
      { row: 'Zika', column: '2022', value: 30 },
    ];

    return (
      <Heatmap
        data={data}
        title="Infectious Disease Cases by Year (Brazil)"
        rows={['COVID-19', 'Dengue', 'Zika']}
        columns={['2020', '2021', '2022']}
        colorScheme="sequential"
        onClick={(cellData) => alert(`${cellData.row} × ${cellData.column}: ${cellData.value} cases`)}
        tooltipFormatter={(v) => `${v.toFixed(0)} cases`}
      />
    );
  },
};
