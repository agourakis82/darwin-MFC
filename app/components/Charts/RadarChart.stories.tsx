import type { Meta, StoryObj } from '@storybook/react';
import { RadarChart } from './RadarChart';

const meta: Meta<typeof RadarChart> = {
  title: 'Components/Charts/RadarChart',
  component: RadarChart,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof RadarChart>;

export const SymptomsProfile: Story = {
  render: () => (
    <RadarChart
      series={[
        {
          name: 'Patient A',
          data: [
            { axis: 'Fever', value: 8 },
            { axis: 'Cough', value: 9 },
            { axis: 'Dyspnea', value: 7 },
            { axis: 'Fatigue', value: 8 },
            { axis: 'Headache', value: 6 },
          ],
          color: 'rgba(255, 100, 100, ',
        },
        {
          name: 'Patient B',
          data: [
            { axis: 'Fever', value: 5 },
            { axis: 'Cough', value: 6 },
            { axis: 'Dyspnea', value: 4 },
            { axis: 'Fatigue', value: 5 },
            { axis: 'Headache', value: 3 },
          ],
          color: 'rgba(100, 200, 100, ',
        },
      ]}
      title="Respiratory Infection Symptom Severity (0-10 scale)"
      maxValue={10}
      levels={5}
    />
  ),
};

export const RiskFactorComparison: Story = {
  render: () => (
    <RadarChart
      series={[
        {
          name: 'High Risk',
          data: [
            { axis: 'Age', value: 8 },
            { axis: 'Smoking', value: 9 },
            { axis: 'Hypertension', value: 8 },
            { axis: 'Obesity', value: 7 },
            { axis: 'Sedentary', value: 9 },
          ],
          color: 'rgba(255, 100, 100, ',
        },
        {
          name: 'Low Risk',
          data: [
            { axis: 'Age', value: 3 },
            { axis: 'Smoking', value: 1 },
            { axis: 'Hypertension', value: 2 },
            { axis: 'Obesity', value: 2 },
            { axis: 'Sedentary', value: 2 },
          ],
          color: 'rgba(100, 200, 100, ',
        },
      ]}
      title="Cardiovascular Risk Factor Profile"
      maxValue={10}
      levels={5}
    />
  ),
};

export const Vitals: Story = {
  render: () => (
    <RadarChart
      series={[
        {
          name: 'Normal Range',
          data: [
            { axis: 'BP Systolic', value: 120 },
            { axis: 'Heart Rate', value: 70 },
            { axis: 'O2 Sat', value: 98 },
            { axis: 'Temp', value: 37 },
            { axis: 'Resp Rate', value: 16 },
          ],
          color: 'rgba(100, 200, 100, ',
          opacity: 0.3,
        },
        {
          name: 'Patient Reading',
          data: [
            { axis: 'BP Systolic', value: 165 },
            { axis: 'Heart Rate', value: 105 },
            { axis: 'O2 Sat', value: 94 },
            { axis: 'Temp', value: 38.5 },
            { axis: 'Resp Rate', value: 22 },
          ],
          color: 'rgba(255, 100, 100, ',
        },
      ]}
      title="Patient Vital Signs vs Normal Range"
      maxValue={200}
      levels={5}
    />
  ),
};
