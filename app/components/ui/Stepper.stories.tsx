import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Stepper, StepperContent } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const HorizontalDefault: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);
    return (
      <Stepper
        steps={[
          { id: 'step1', label: 'Patient Info', status: current > 0 ? 'completed' : current === 0 ? 'active' : 'pending' },
          { id: 'step2', label: 'Vitals', status: current > 1 ? 'completed' : current === 1 ? 'active' : 'pending' },
          { id: 'step3', label: 'Assessment', status: current > 2 ? 'completed' : current === 2 ? 'active' : 'pending' },
          { id: 'step4', label: 'Treatment Plan', status: current === 3 ? 'active' : 'pending' },
        ]}
        currentStep={current}
        onStepClick={setCurrent}
        orientation="horizontal"
      />
    );
  },
};

export const VerticalWithDescriptions: Story = {
  render: () => {
    const [current, setCurrent] = useState(0);
    return (
      <div className="w-full max-w-2xl">
        <Stepper
          steps={[
            {
              id: 'anamnesis',
              label: 'Chief Complaint',
              description: 'Reason for visit and symptom history',
              status: current > 0 ? 'completed' : current === 0 ? 'active' : 'pending',
            },
            {
              id: 'physical',
              label: 'Physical Exam',
              description: 'Vital signs and physical assessment',
              status: current > 1 ? 'completed' : current === 1 ? 'active' : 'pending',
            },
            {
              id: 'labs',
              label: 'Investigations',
              description: 'Order and review lab/imaging results',
              status: current > 2 ? 'completed' : current === 2 ? 'active' : 'pending',
            },
            {
              id: 'diagnosis',
              label: 'Diagnosis',
              description: 'Differential diagnosis and final diagnosis',
              status: current > 3 ? 'completed' : current === 3 ? 'active' : 'pending',
            },
            {
              id: 'treatment',
              label: 'Treatment',
              description: 'Prescriptions and referrals',
              status: current === 4 ? 'active' : 'pending',
            },
          ]}
          currentStep={current}
          onStepClick={setCurrent}
          orientation="vertical"
        />
      </div>
    );
  },
};

export const ClinicalProtocol: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);
    return (
      <Stepper
        steps={[
          { id: 'screening', label: 'Screening', status: current > 0 ? 'completed' : current === 0 ? 'active' : 'pending' },
          { id: 'intake', label: 'Intake', status: current > 1 ? 'completed' : current === 1 ? 'active' : 'pending' },
          { id: 'assessment', label: 'Risk Assessment', status: current > 2 ? 'completed' : current === 2 ? 'active' : 'pending' },
          { id: 'intervention', label: 'Intervention', status: current === 3 ? 'active' : 'pending' },
          { id: 'followup', label: 'Follow-up', status: current === 4 ? 'active' : 'pending' },
        ]}
        currentStep={current}
        onStepClick={setCurrent}
        orientation="horizontal"
      />
    );
  },
};

export const WithErrors: Story = {
  render: () => {
    const [current, setCurrent] = useState(1);
    return (
      <Stepper
        steps={[
          { id: 'step1', label: 'Patient Info', status: 'completed' },
          { id: 'step2', label: 'Vitals', status: 'error' },
          { id: 'step3', label: 'Assessment', status: 'pending' },
        ]}
        currentStep={current}
        onStepClick={setCurrent}
        orientation="horizontal"
      />
    );
  },
};

export const WithDisabledSteps: Story = {
  render: () => {
    const [current, setCurrent] = useState(0);
    return (
      <Stepper
        steps={[
          { id: 'step1', label: 'Referral', status: 'completed' },
          { id: 'step2', label: 'Pre-operative', status: 'active', disabled: false },
          { id: 'step3', label: 'Surgery', status: 'pending', disabled: true },
          { id: 'step4', label: 'Recovery', status: 'pending', disabled: true },
        ]}
        currentStep={current}
        onStepClick={setCurrent}
        orientation="horizontal"
      />
    );
  },
};
