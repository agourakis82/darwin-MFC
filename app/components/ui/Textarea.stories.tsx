import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your message here..."
      />
    );
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">Clinical Notes</label>
        <Textarea
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter clinical observations..."
          rows={5}
        />
      </div>
    );
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">Patient History</label>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter patient medical history..."
          maxLength={500}
          showCharCount
          rows={4}
        />
      </div>
    );
  },
};

export const WithAutoResize: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">SOAP Notes</label>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your SOAP notes here. This field will expand as you type..."
          autoResize
          rows={2}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-neutral-200">Read-only Notes</label>
      <Textarea
        value="These are archived clinical notes from a previous visit."
        onChange={() => {}}
        disabled
        rows={4}
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">Diagnosis</label>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter diagnosis..."
          rows={3}
        />
        <p className="text-xs text-danger flex items-center gap-1">
          <span>⚠</span>
          Please provide a detailed diagnosis
        </p>
      </div>
    );
  },
};

export const WithHelpText: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">Medication Instructions</label>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Provide medication instructions for the patient..."
          rows={4}
        />
        <p className="text-xs text-neutral-400">Include dosage, frequency, and any special instructions</p>
      </div>
    );
  },
};

export const LongText: Story = {
  render: () => {
    const [value, setValue] = useState(
      'Patient presents with complaints of chest pain radiating to the left arm. Pain started 2 hours ago during rest. Associated with shortness of breath and mild diaphoresis. Medical history significant for hypertension and dyslipidemia. Currently on atorvastatin and lisinopril. Physical exam shows elevated blood pressure 160/95 mmHg, heart rate 88 bpm, regular. No significant findings on cardiac auscultation.'
    );
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">Clinical Presentation</label>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={1000}
          showCharCount
          autoResize
          rows={4}
        />
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-neutral-200">Previous Assessment</label>
      <Textarea
        value="Assessment from 3 months ago: Patient improving with current treatment plan. Continue current medications and follow-up in 3 months."
        onChange={() => {}}
        disabled
        rows={3}
      />
    </div>
  ),
};

export const MinimalRows: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">Quick Note</label>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a quick note..."
          rows={1}
        />
      </div>
    );
  },
};

export const MaximumRows: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">Detailed Case Report</label>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write a detailed case report..."
          rows={10}
          maxLength={2000}
          showCharCount
        />
      </div>
    );
  },
};
