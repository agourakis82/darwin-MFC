import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'Components/Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search/filter functionality',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required',
    },
    label: {
      control: 'text',
      description: 'Label for the select field',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helpText: {
      control: 'text',
      description: 'Helper text below the input',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const specialties = [
  { value: 'cardio', label: 'Cardiologia', description: 'Heart and cardiovascular diseases' },
  { value: 'neuro', label: 'Neurologia', description: 'Nervous system disorders' },
  { value: 'resp', label: 'Pneumologia', description: 'Respiratory and lung diseases' },
  { value: 'gastro', label: 'Gastroenterologia', description: 'Digestive system' },
  { value: 'endo', label: 'Endocrinologia', description: 'Hormones and metabolism' },
];

/**
 * Basic select component with default styling
 */
export const Default: Story = {
  args: {
    options: specialties,
    placeholder: 'Selecione uma especialidade',
    label: 'Especialidade',
  },
};

/**
 * Select with search functionality enabled
 */
export const Searchable: Story = {
  args: {
    options: specialties,
    placeholder: 'Selecione uma especialidade',
    label: 'Especialidade',
    searchable: true,
  },
};

/**
 * Select with clear button
 */
export const Clearable: Story = {
  args: {
    options: specialties,
    placeholder: 'Selecione uma especialidade',
    label: 'Especialidade',
    clearable: true,
    value: 'cardio',
  },
};

/**
 * Select in disabled state
 */
export const Disabled: Story = {
  args: {
    options: specialties,
    placeholder: 'Selecione uma especialidade',
    label: 'Especialidade',
    disabled: true,
  },
};

/**
 * Select with error state and error message
 */
export const WithError: Story = {
  args: {
    options: specialties,
    placeholder: 'Selecione uma especialidade',
    label: 'Especialidade',
    required: true,
    error: 'Esta especialidade é obrigatória',
  },
};

/**
 * Select with help text
 */
export const WithHelpText: Story = {
  args: {
    options: specialties,
    placeholder: 'Selecione uma especialidade',
    label: 'Especialidade',
    helpText: 'Selecione a sua área de especialização médica',
  },
};

/**
 * Select with searchable + clearable + help text
 */
export const FullFeatured: Story = {
  args: {
    options: specialties,
    placeholder: 'Buscar especialidade...',
    label: 'Especialidade',
    searchable: true,
    clearable: true,
    required: true,
    helpText: 'Selecione a sua área de especialização',
  },
};

/**
 * Select with many options
 */
export const LongList: Story = {
  args: {
    options: [
      ...specialties,
      { value: 'pediatria', label: 'Pediatria', description: 'Child health' },
      { value: 'psiquiatria', label: 'Psiquiatria', description: 'Mental health' },
      { value: 'dermatologia', label: 'Dermatologia', description: 'Skin diseases' },
      { value: 'oftalmologia', label: 'Oftalmologia', description: 'Eye diseases' },
      { value: 'otorrino', label: 'Otorrinolaringologia', description: 'ENT' },
    ],
    placeholder: 'Selecione uma especialidade',
    label: 'Especialidade',
    searchable: true,
  },
};

/**
 * Select with disabled options
 */
export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'cardio', label: 'Cardiologia' },
      { value: 'neuro', label: 'Neurologia', disabled: true, description: 'Indisponível' },
      { value: 'resp', label: 'Pneumologia' },
    ],
    placeholder: 'Selecione uma especialidade',
    label: 'Especialidade',
  },
};

/**
 * Select with required indicator
 */
export const Required: Story = {
  args: {
    options: specialties,
    placeholder: 'Selecione uma especialidade',
    label: 'Especialidade',
    required: true,
  },
};

/**
 * Empty state with no options
 */
export const Empty: Story = {
  args: {
    options: [],
    placeholder: 'Nenhuma opção disponível',
    label: 'Especialidade',
  },
};
