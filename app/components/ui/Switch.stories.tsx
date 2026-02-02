import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Switch label="Enable Notifications" checked={checked} onCheckedChange={setChecked} />;
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return <Switch label="Dark Mode" checked={checked} onCheckedChange={setChecked} />;
  },
};

export const WithDescription: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        label="Enable Email Alerts"
        description="Receive email notifications for important updates"
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Switch
      label="Option Unavailable"
      description="This feature is not available in your region"
      checked={false}
      onCheckedChange={() => {}}
      disabled
    />
  ),
};

export const DisabledChecked: Story = {
  render: () => (
    <Switch
      label="Required Setting"
      description="This setting is mandatory and cannot be changed"
      checked={true}
      onCheckedChange={() => {}}
      disabled
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <Switch
      label="Accept Terms"
      error="You must accept the terms to continue"
      checked={false}
      onCheckedChange={() => {}}
    />
  ),
};

export const Small: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        size="sm"
        label="Compact Size"
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};

export const Medium: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        size="md"
        label="Default Size"
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};

export const Large: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        size="lg"
        label="Large Size"
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};

export const StackedSwitches: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [analytics, setAnalytics] = useState(false);
    const [marketing, setMarketing] = useState(false);

    return (
      <div className="space-y-4">
        <Switch
          label="Notification Emails"
          description="Get alerts about important updates"
          checked={notifications}
          onCheckedChange={setNotifications}
        />
        <Switch
          label="Analytics Data"
          description="Help us improve by sharing usage data"
          checked={analytics}
          onCheckedChange={setAnalytics}
        />
        <Switch
          label="Marketing Communications"
          description="Receive offers and announcements"
          checked={marketing}
          onCheckedChange={setMarketing}
        />
      </div>
    );
  },
};

export const MedicalSettings: Story = {
  render: () => {
    const [smsAlerts, setSmsAlerts] = useState(true);
    const [labReminders, setLabReminders] = useState(true);
    const [appointmentReminders, setAppointmentReminders] = useState(false);

    return (
      <div className="space-y-4 w-full max-w-md">
        <h3 className="text-lg font-semibold text-neutral-100">Patient Preferences</h3>
        <Switch
          label="SMS Health Alerts"
          description="Receive SMS reminders for health alerts"
          checked={smsAlerts}
          onCheckedChange={setSmsAlerts}
        />
        <Switch
          label="Lab Result Notifications"
          description="Get notified when lab results are available"
          checked={labReminders}
          onCheckedChange={setLabReminders}
        />
        <Switch
          label="Appointment Reminders"
          description="Reminder 24 hours before appointments"
          checked={appointmentReminders}
          onCheckedChange={setAppointmentReminders}
        />
      </div>
    );
  },
};
