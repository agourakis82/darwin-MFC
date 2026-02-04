import type { Meta, StoryObj } from '@storybook/react';
import { GeoMap } from './GeoMap';

const meta: Meta<typeof GeoMap> = {
  title: 'Components/Charts/GeoMap',
  component: GeoMap,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof GeoMap>;

export const DiabetesPrevalence: Story = {
  render: () => (
    <GeoMap
      title="Diabetes Prevalence by State (%)"
      data={[
        { state: 'SP', value: 8.5 },
        { state: 'RJ', value: 7.8 },
        { state: 'MG', value: 6.2 },
        { state: 'BA', value: 5.1 },
        { state: 'RS', value: 7.3 },
        { state: 'PR', value: 6.8 },
        { state: 'PE', value: 4.9 },
        { state: 'CE', value: 4.5 },
        { state: 'PA', value: 3.8 },
        { state: 'SC', value: 6.9 },
        { state: 'GO', value: 5.5 },
        { state: 'DF', value: 6.1 },
      ]}
      colorScheme="sequential"
      formatValue={(v) => `${v.toFixed(1)}%`}
    />
  ),
};

export const COVIDCases: Story = {
  render: () => (
    <GeoMap
      title="COVID-19 Cases per 100k Population"
      data={[
        { state: 'SP', value: 2450 },
        { state: 'RJ', value: 2100 },
        { state: 'MG', value: 1800 },
        { state: 'BA', value: 1200 },
        { state: 'RS', value: 1950 },
        { state: 'PR', value: 1750 },
        { state: 'PE', value: 1350 },
        { state: 'CE', value: 1100 },
        { state: 'PA', value: 950 },
        { state: 'SC', value: 1600 },
        { state: 'GO', value: 900 },
        { state: 'DF', value: 1300 },
      ]}
      colorScheme="sequential"
      formatValue={(v) => `${v.toFixed(0)}`}
    />
  ),
};

export const HealthcareAccess: Story = {
  render: () => (
    <GeoMap
      title="Healthcare Access Index (0-100)"
      data={[
        { state: 'SP', value: 85 },
        { state: 'RJ', value: 78 },
        { state: 'MG', value: 72 },
        { state: 'BA', value: 55 },
        { state: 'RS', value: 80 },
        { state: 'PR', value: 75 },
        { state: 'PE', value: 48 },
        { state: 'CE', value: 45 },
        { state: 'PA', value: 35 },
        { state: 'SC', value: 77 },
        { state: 'GO', value: 52 },
        { state: 'DF', value: 88 },
      ]}
      colorScheme="diverging"
      formatValue={(v) => `${v.toFixed(0)}`}
    />
  ),
};
