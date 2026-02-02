import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FormField } from './FormField';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';

const meta: Meta<typeof FormField> = {
  title: 'Components/Forms/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField label="Email Address">
        <Input
          type="email"
          placeholder="your.email@example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormField>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField
        label="Email Address"
        error="Please enter a valid email address"
      >
        <Input
          type="email"
          placeholder="your.email@example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormField>
    );
  },
};

export const WithHelpText: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField
        label="Password"
        helpText="Must be at least 8 characters with uppercase, lowercase, and numbers"
      >
        <Input
          type="password"
          placeholder="••••••••"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormField>
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField
        label="Full Name"
        required
        helpText="Your legal name as it appears on official documents"
      >
        <Input
          placeholder="Enter full name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormField>
    );
  },
};

export const WithHint: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField
        label="Patient ID"
        hint="optional"
        helpText="Enter the patient's medical record number"
      >
        <Input
          placeholder="e.g., MRN-12345"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </FormField>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField
        label="Clinical Notes"
        layout="horizontal"
      >
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter clinical observations..."
          rows={3}
        />
      </FormField>
    );
  },
};

export const HorizontalWithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <FormField
        label="Diagnosis"
        layout="horizontal"
        error="Please enter a diagnosis"
        required
      >
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter patient diagnosis..."
          rows={3}
        />
      </FormField>
    );
  },
};

export const WithSelect: Story = {
  render: () => {
    const [specialty, setSpecialty] = useState<string | undefined>();

    return (
      <FormField
        label="Medical Specialty"
        required
        helpText="Select your primary area of practice"
      >
        <Select
          options={[
            { value: 'cardiology', label: 'Cardiology' },
            { value: 'neurology', label: 'Neurology' },
            { value: 'oncology', label: 'Oncology' },
            { value: 'pediatrics', label: 'Pediatrics' },
          ]}
          value={specialty}
          onValueChange={setSpecialty}
          placeholder="Select specialty..."
          searchable
        />
      </FormField>
    );
  },
};

export const MedicalForm: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [specialty, setSpecialty] = useState<string | undefined>();

    return (
      <div className="w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-semibold text-neutral-100">Patient Registration</h2>

        <FormField label="Full Name" required>
          <Input
            placeholder="Patient name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormField>

        <FormField label="Age" required>
          <Input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </FormField>

        <FormField label="Primary Concern" helpText="Reason for visit">
          <Textarea
            placeholder="Describe primary symptoms or concern..."
            rows={3}
          />
        </FormField>
      </div>
    );
  },
};

export const ComplexForm: Story = {
  render: () => {
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState<string | undefined>();

    return (
      <div className="w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-semibold text-neutral-100">Clinical Assessment</h2>

        <FormField
          label="Diagnosis"
          required
          layout="horizontal"
          error={diagnosis === '' ? 'Diagnosis is required' : undefined}
        >
          <Textarea
            placeholder="Enter clinical diagnosis..."
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            rows={4}
          />
        </FormField>

        <FormField
          label="Recommended Treatment"
          layout="horizontal"
          helpText="Select primary treatment modality"
        >
          <Select
            options={[
              { value: 'medication', label: 'Medication' },
              { value: 'therapy', label: 'Physical Therapy' },
              { value: 'surgery', label: 'Surgical Intervention' },
              { value: 'monitoring', label: 'Monitoring Only' },
            ]}
            value={treatment}
            onValueChange={setTreatment}
            placeholder="Select treatment..."
          />
        </FormField>

        <FormField label="Follow-up Notes" hint="optional">
          <Textarea
            placeholder="Any additional notes for follow-up..."
            rows={3}
          />
        </FormField>
      </div>
    );
  },
};

export const StackedVertical: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <FormField label="First Name" required>
        <Input placeholder="First name" />
      </FormField>

      <FormField label="Last Name" required>
        <Input placeholder="Last name" />
      </FormField>

      <FormField label="Email" required>
        <Input type="email" placeholder="email@example.com" />
      </FormField>

      <FormField label="Phone" hint="optional">
        <Input type="tel" placeholder="Phone number" />
      </FormField>
    </div>
  ),
};

export const StackedHorizontal: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-4">
      <FormField label="First Name" required layout="horizontal">
        <Input placeholder="First name" />
      </FormField>

      <FormField label="Last Name" required layout="horizontal">
        <Input placeholder="Last name" />
      </FormField>

      <FormField label="Medical History" layout="horizontal" helpText="Describe any relevant conditions">
        <Textarea placeholder="Medical history..." rows={3} />
      </FormField>
    </div>
  ),
};
