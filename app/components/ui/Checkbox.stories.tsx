import type { Meta, StoryObj } from '@storybook/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { Checkbox, CheckboxGroup } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Individual Checkbox Stories

export const Default: Story = {
  render: (args) => <Checkbox {...args} />,
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  render: (args) => <Checkbox {...args} />,
  args: {
    label: 'Accept terms and conditions',
    checked: true,
  },
};

export const WithDescription: Story = {
  render: (args) => <Checkbox {...args} />,
  args: {
    label: 'Enable notifications',
    description: 'Receive alerts about important updates and changes',
  },
};

export const Disabled: Story = {
  render: (args) => <Checkbox {...args} />,
  args: {
    label: 'This option is not available',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  render: (args) => <Checkbox {...args} />,
  args: {
    label: 'Already selected',
    checked: true,
    disabled: true,
  },
};

export const WithError: Story = {
  render: (args) => <Checkbox {...args} />,
  args: {
    label: 'Accept terms',
    error: 'You must accept the terms to continue',
  },
};

export const WithHelpText: Story = {
  render: (args) => <Checkbox {...args} />,
  args: {
    label: 'Save my preferences',
    helpText: 'Your preferences will be remembered across sessions',
  },
};

export const Indeterminate: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');
    return (
      <Checkbox
        label="Select all items"
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};

// CheckboxGroup Stories

export const GroupDefault: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <CheckboxGroup
        label="Medical Specialties"
        options={[
          { value: 'cardiology', label: 'Cardiology' },
          { value: 'neurology', label: 'Neurology' },
          { value: 'oncology', label: 'Oncology' },
          { value: 'pediatrics', label: 'Pediatrics' },
        ]}
        value={selected}
        onChange={setSelected}
      />
    );
  },
};

export const GroupWithDescriptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <CheckboxGroup
        label="Screening Programs"
        helpText="Select the screening programs you want to enable"
        options={[
          { value: 'cancer', label: 'Cancer Screening', description: 'Regular cancer prevention checks' },
          { value: 'diabetes', label: 'Diabetes Screening', description: 'Blood glucose monitoring' },
          { value: 'cardiac', label: 'Cardiac Screening', description: 'Heart disease prevention' },
        ]}
        value={selected}
        onChange={setSelected}
      />
    );
  },
};

export const GroupDisabled: Story = {
  render: () => (
    <CheckboxGroup
      label="Options (Disabled)"
      options={[
        { value: 'option1', label: 'Option 1', disabled: true },
        { value: 'option2', label: 'Option 2', disabled: true },
        { value: 'option3', label: 'Option 3', disabled: true },
      ]}
      value={[]}
      onChange={() => {}}
    />
  ),
};

export const GroupWithError: Story = {
  render: () => (
    <CheckboxGroup
      label="Required Selection"
      error="Please select at least one option"
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ]}
      value={[]}
      onChange={() => {}}
      required
    />
  ),
};

export const GroupPreSelected: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['cardiology', 'oncology']);
    return (
      <CheckboxGroup
        label="Your Specialties"
        options={[
          { value: 'cardiology', label: 'Cardiology' },
          { value: 'neurology', label: 'Neurology' },
          { value: 'oncology', label: 'Oncology' },
          { value: 'pediatrics', label: 'Pediatrics' },
        ]}
        value={selected}
        onChange={setSelected}
      />
    );
  },
};

export const GroupRequired: Story = {
  render: () => (
    <CheckboxGroup
      label="Certifications"
      required
      options={[
        { value: 'board', label: 'Board Certified' },
        { value: 'fellowship', label: 'Fellowship Completed' },
      ]}
      value={[]}
      onChange={() => {}}
    />
  ),
};
