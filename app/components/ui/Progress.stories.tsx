import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const LinearDefault: Story = {
  args: {
    variant: 'linear',
    value: 65,
    color: 'primary',
    size: 'md',
    showLabel: true,
    label: 'SOAP note save progress',
  },
};

export const LinearPartial: Story = {
  args: {
    variant: 'linear',
    value: 25,
    color: 'warning',
    showLabel: true,
    label: 'Data sync',
  },
};

export const LinearComplete: Story = {
  args: {
    variant: 'linear',
    value: 100,
    color: 'success',
    showLabel: true,
    label: 'Upload complete',
  },
};

export const LinearDanger: Story = {
  args: {
    variant: 'linear',
    value: 45,
    color: 'danger',
    showLabel: true,
    label: 'CPU usage',
  },
};

export const LinearSmall: Story = {
  args: {
    variant: 'linear',
    value: 70,
    size: 'sm',
    showLabel: false,
  },
};

export const LinearLarge: Story = {
  args: {
    variant: 'linear',
    value: 55,
    size: 'lg',
    showLabel: true,
    label: 'Loading large dataset',
  },
};

export const CircularDefault: Story = {
  args: {
    variant: 'circular',
    value: 65,
    color: 'primary',
    size: 'md',
    showLabel: true,
    label: 'Form completion',
  },
};

export const CircularSmall: Story = {
  args: {
    variant: 'circular',
    value: 45,
    color: 'warning',
    size: 'sm',
    showLabel: true,
    label: 'Syncing...',
  },
};

export const CircularLarge: Story = {
  args: {
    variant: 'circular',
    value: 85,
    color: 'success',
    size: 'lg',
    showLabel: true,
    label: 'Patient record complete',
  },
};

export const CircularNoLabel: Story = {
  args: {
    variant: 'circular',
    value: 72,
    color: 'primary',
    size: 'md',
    showLabel: false,
  },
};

export const LinearNoAnimation: Story = {
  args: {
    variant: 'linear',
    value: 60,
    animated: false,
    showLabel: true,
    label: 'No animation',
  },
};

export const MultipleSteps: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <h3 className="text-sm font-semibold text-neutral-200 mb-2">Step 1: Anamnesis</h3>
        <Progress value={100} label="Complete" color="success" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-neutral-200 mb-2">Step 2: Physical Exam</h3>
        <Progress value={75} label="In progress" color="primary" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-neutral-200 mb-2">Step 3: Assessment</h3>
        <Progress value={30} label="Starting soon" color="warning" />
      </div>
    </div>
  ),
};
