import type { Meta, StoryObj } from '@storybook/react';
import { BoxPlot } from './BoxPlot';

const meta: Meta<typeof BoxPlot> = {
  title: 'Components/Charts/BoxPlot',
  component: BoxPlot,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof BoxPlot>;

export const GlucoseLevels: Story = {
  render: () => (
    <BoxPlot
      data={[
        {
          label: 'Non-Diabetic',
          values: [78, 82, 85, 88, 90, 92, 95, 98, 105, 110],
          color: 'rgb(100, 200, 100)',
          referenceRange: { min: 70, max: 100 },
        },
        {
          label: 'Diabetic (Untreated)',
          values: [140, 155, 168, 175, 185, 195, 210, 225, 240, 280],
          color: 'rgb(255, 100, 100)',
          referenceRange: { min: 70, max: 100 },
        },
        {
          label: 'Diabetic (Controlled)',
          values: [115, 120, 125, 130, 135, 138, 142, 145, 150, 155],
          color: 'rgb(100, 150, 255)',
          referenceRange: { min: 70, max: 100 },
        },
      ]}
      title="Fasting Glucose Distribution (mg/dL)"
      yAxisLabel="Glucose (mg/dL)"
      formatValue={(v) => `${v.toFixed(0)}`}
    />
  ),
};

export const LabResults: Story = {
  render: () => (
    <BoxPlot
      data={[
        {
          label: 'Hemoglobin',
          values: [12.5, 13.0, 13.2, 13.5, 13.8, 14.0, 14.2, 14.5, 14.8, 15.0],
          color: 'rgb(100, 150, 255)',
          referenceRange: { min: 12.0, max: 17.5 },
        },
        {
          label: 'Hematocrit',
          values: [36, 38, 39, 40, 41, 42, 43, 44, 45, 46],
          color: 'rgb(100, 200, 100)',
          referenceRange: { min: 36, max: 46 },
        },
        {
          label: 'WBC',
          values: [4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 9.0],
          color: 'rgb(255, 150, 100)',
          referenceRange: { min: 4.5, max: 11.0 },
        },
      ]}
      title="Complete Blood Count Results"
      yAxisLabel="Value"
      formatValue={(v) => `${v.toFixed(1)}`}
    />
  ),
};

export const BloodPressure: Story = {
  render: () => (
    <BoxPlot
      data={[
        {
          label: 'Systolic',
          values: [110, 115, 118, 120, 125, 128, 130, 135, 140, 145],
          color: 'rgb(255, 100, 100)',
          referenceRange: { min: 90, max: 120 },
        },
        {
          label: 'Diastolic',
          values: [70, 72, 75, 78, 80, 82, 85, 88, 90, 95],
          color: 'rgb(100, 200, 100)',
          referenceRange: { min: 60, max: 80 },
        },
      ]}
      title="Blood Pressure Distribution (mmHg)"
      yAxisLabel="Pressure (mmHg)"
      formatValue={(v) => `${v.toFixed(0)}`}
    />
  ),
};
