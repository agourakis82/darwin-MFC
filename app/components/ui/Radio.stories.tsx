import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Forms/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <RadioGroup
        label="Patient Gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <div className="space-y-2">
        <RadioGroup
          label="Screening Type"
          options={[
            { value: 'preventive', label: 'Preventive Screening' },
            { value: 'diagnostic', label: 'Diagnostic Screening' },
            { value: 'surveillance', label: 'Surveillance Program' },
          ]}
          value={value}
          onValueChange={setValue}
        />
        <p className="text-xs text-neutral-400">Select the type of screening program</p>
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => (
    <RadioGroup
      label="Risk Level"
      error="Please select a risk level"
      options={[
        { value: 'low', label: 'Low Risk' },
        { value: 'medium', label: 'Medium Risk' },
        { value: 'high', label: 'High Risk' },
      ]}
      value=""
      onValueChange={() => {}}
      required
    />
  ),
};

export const WithHelpText: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <RadioGroup
        label="Medication Frequency"
        helpText="Based on your condition and doctor's recommendation"
        options={[
          { value: 'daily', label: 'Once Daily' },
          { value: 'twice', label: 'Twice Daily' },
          { value: 'three', label: 'Three Times Daily' },
        ]}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup
      label="Options (Disabled)"
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]}
      value=""
      onValueChange={() => {}}
      disabled
    />
  ),
};

export const PreSelected: Story = {
  render: () => {
    const [value, setValue] = useState<string>('moderate');
    return (
      <RadioGroup
        label="Disease Severity"
        options={[
          { value: 'mild', label: 'Mild' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'severe', label: 'Severe' },
        ]}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const Required: Story = {
  render: () => (
    <RadioGroup
      label="Confirmation Required"
      required
      options={[
        { value: 'yes', label: 'Yes, I confirm' },
        { value: 'no', label: 'No, Cancel' },
      ]}
      value=""
      onValueChange={() => {}}
    />
  ),
};

export const VerticalLayout: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <RadioGroup
        label="Treatment Options"
        options={[
          { value: 'medication', label: 'Medication' },
          { value: 'therapy', label: 'Physical Therapy' },
          { value: 'surgery', label: 'Surgical Intervention' },
          { value: 'monitoring', label: 'Monitoring Only' },
        ]}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

export const ManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <RadioGroup
        label="Medical Specialty"
        options={[
          { value: 'cardiology', label: 'Cardiology' },
          { value: 'neurology', label: 'Neurology' },
          { value: 'oncology', label: 'Oncology' },
          { value: 'gastroenterology', label: 'Gastroenterology' },
          { value: 'orthopedics', label: 'Orthopedics' },
          { value: 'psychiatry', label: 'Psychiatry' },
        ]}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};
