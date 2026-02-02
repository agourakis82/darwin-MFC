import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RangeSlider } from './RangeSlider';

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/Forms/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const SingleValue: Story = {
  render: () => {
    const [value, setValue] = useState([50]);
    return (
      <div className="w-96">
        <label className="text-sm font-medium text-neutral-200 block mb-4">Volume</label>
        <RangeSlider
          min={0}
          max={100}
          step={1}
          value={value}
          onValueChange={setValue}
          showLabels
        />
      </div>
    );
  },
};

export const DualRange: Story = {
  render: () => {
    const [value, setValue] = useState([20, 80]);
    return (
      <div className="w-96">
        <label className="text-sm font-medium text-neutral-200 block mb-4">Age Range</label>
        <RangeSlider
          min={0}
          max={100}
          step={1}
          value={value}
          onValueChange={setValue}
          showLabels
          unit="years"
        />
      </div>
    );
  },
};

export const BloodPressure: Story = {
  render: () => {
    const [systolic, setSystolic] = useState([120]);
    const [diastolic, setDiastolic] = useState([80]);

    return (
      <div className="w-96 space-y-8">
        <div>
          <label className="text-sm font-medium text-neutral-200 block mb-4">Systolic BP (mmHg)</label>
          <RangeSlider
            min={80}
            max={200}
            step={5}
            value={systolic}
            onValueChange={setSystolic}
            showLabels
            unit="mmHg"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-200 block mb-4">Diastolic BP (mmHg)</label>
          <RangeSlider
            min={40}
            max={120}
            step={5}
            value={diastolic}
            onValueChange={setDiastolic}
            showLabels
            unit="mmHg"
          />
        </div>
      </div>
    );
  },
};

export const Temperature: Story = {
  render: () => {
    const [temp, setTemp] = useState([37]);

    const formatTemp = (val: number) => `${val.toFixed(1)}°C`;

    return (
      <div className="w-96">
        <label className="text-sm font-medium text-neutral-200 block mb-4">Temperature</label>
        <RangeSlider
          min={35}
          max={42}
          step={0.1}
          value={temp}
          onValueChange={setTemp}
          showLabels
          formatValue={formatTemp}
        />
      </div>
    );
  },
};

export const DosageRange: Story = {
  render: () => {
    const [dosage, setDosage] = useState([500, 1500]);

    const formatDosage = (val: number) => `${val}mg`;

    return (
      <div className="w-96">
        <label className="text-sm font-medium text-neutral-200 block mb-4">Medication Dosage Range</label>
        <RangeSlider
          min={250}
          max={2000}
          step={50}
          value={dosage}
          onValueChange={setDosage}
          showLabels
          formatValue={formatDosage}
          unit="mg"
        />
        <p className="text-xs text-neutral-400 mt-4">
          Typical range: {formatDosage(dosage[0])} - {formatDosage(dosage[1])}
        </p>
      </div>
    );
  },
};

export const LabValue: Story = {
  render: () => {
    const [glucose, setGlucose] = useState([70, 100]);

    return (
      <div className="w-96">
        <label className="text-sm font-medium text-neutral-200 block mb-4">Fasting Blood Glucose (mg/dL)</label>
        <RangeSlider
          min={50}
          max={300}
          step={5}
          value={glucose}
          onValueChange={setGlucose}
          showLabels
          unit="mg/dL"
        />
        <div className="mt-4 p-3 rounded bg-neutral-800 text-sm">
          <p className="text-neutral-300">
            {glucose[0] < 100 && glucose[1] <= 125 && 'Normal range'}
            {glucose[0] >= 100 && glucose[0] < 126 && 'Impaired fasting glucose'}
            {glucose[0] >= 126 && 'May indicate diabetes'}
          </p>
        </div>
      </div>
    );
  },
};

export const HeartRate: Story = {
  render: () => {
    const [hr, setHr] = useState([60, 100]);

    return (
      <div className="w-96">
        <label className="text-sm font-medium text-neutral-200 block mb-4">Target Heart Rate (bpm)</label>
        <RangeSlider
          min={40}
          max={200}
          step={5}
          value={hr}
          onValueChange={setHr}
          showLabels
          unit="bpm"
        />
        <p className="text-xs text-neutral-400 mt-4">
          Target zone: {hr[0]} - {hr[1]} beats per minute
        </p>
      </div>
    );
  },
};

export const LargeStep: Story = {
  render: () => {
    const [value, setValue] = useState([50]);

    return (
      <div className="w-96">
        <label className="text-sm font-medium text-neutral-200 block mb-4">Pain Level (Step: 10)</label>
        <RangeSlider
          min={0}
          max={100}
          step={10}
          value={value}
          onValueChange={setValue}
          showLabels
        />
      </div>
    );
  },
};

export const SmallStep: Story = {
  render: () => {
    const [value, setValue] = useState([0.5]);

    return (
      <div className="w-96">
        <label className="text-sm font-medium text-neutral-200 block mb-4">Decimal Value (Step: 0.01)</label>
        <RangeSlider
          min={0}
          max={1}
          step={0.01}
          value={value}
          onValueChange={setValue}
          showLabels
          formatValue={(val) => val.toFixed(2)}
        />
      </div>
    );
  },
};

export const NoLabels: Story = {
  render: () => {
    const [value, setValue] = useState([50]);

    return (
      <div className="w-96">
        <label className="text-sm font-medium text-neutral-200 block mb-4">Score (No Labels)</label>
        <RangeSlider
          min={0}
          max={100}
          step={1}
          value={value}
          onValueChange={setValue}
          showLabels={false}
        />
      </div>
    );
  },
};
