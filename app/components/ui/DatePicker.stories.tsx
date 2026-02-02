import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <DatePicker
        label="Select Date"
        value={date}
        onChange={(d) => setDate(d)}
        placeholder="Pick a date..."
      />
    );
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date(2024, 0, 15));
    return (
      <DatePicker
        label="Appointment Date"
        value={date}
        onChange={(d) => setDate(d)}
      />
    );
  },
};

export const WithDateRange: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const maxDate = new Date();

    return (
      <DatePicker
        label="Select Date (Last 30 Days)"
        value={date}
        onChange={(d) => setDate(d)}
        fromDate={new Date(maxDate.getTime() - 30 * 24 * 60 * 60 * 1000)}
        toDate={maxDate}
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <DatePicker
        label="Birth Date"
        value={date}
        onChange={(d) => setDate(d)}
        error="Birth date is required"
        required
      />
    );
  },
};

export const WithHelpText: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <DatePicker
        label="Symptom Onset Date"
        value={date}
        onChange={(d) => setDate(d)}
        helpText="Select the date when symptoms started"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DatePicker
      label="Disabled Date Picker"
      value={new Date()}
      onChange={() => {}}
      disabled
    />
  ),
};

export const Required: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <DatePicker
        label="Lab Test Date"
        value={date}
        onChange={(d) => setDate(d)}
        required
      />
    );
  },
};

export const PastOnly: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const today = new Date();

    return (
      <DatePicker
        label="Medical History Date"
        value={date}
        onChange={(d) => setDate(d)}
        toDate={today}
        helpText="Select a date from the past"
      />
    );
  },
};

export const FutureOnly: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const today = new Date();

    return (
      <DatePicker
        label="Next Follow-up Date"
        value={date}
        onChange={(d) => setDate(d)}
        fromDate={today}
        helpText="Schedule future appointment"
      />
    );
  },
};

export const WithCustomFormat: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <DatePicker
        label="Select Date"
        value={date}
        onChange={(d) => setDate(d)}
        format="dd/MM/yyyy"
      />
    );
  },
};

export const MedicalUseCase: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const today = new Date();
    const minAge = new Date();
    minAge.setFullYear(minAge.getFullYear() - 100);

    return (
      <DatePicker
        label="Patient Birth Date"
        value={date}
        onChange={(d) => setDate(d)}
        fromDate={minAge}
        toDate={today}
        required
        helpText="Used to calculate age-appropriate screening"
      />
    );
  },
};

export const WithClear: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <DatePicker
        label="Lab Result Date"
        value={date}
        onChange={(d) => setDate(d)}
      />
    );
  },
};

export const MultipleFields: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    return (
      <div className="space-y-6">
        <DatePicker
          label="Symptom Start Date"
          value={startDate}
          onChange={setStartDate}
        />
        <DatePicker
          label="Symptom End Date"
          value={endDate}
          onChange={setEndDate}
          fromDate={startDate}
        />
      </div>
    );
  },
};
