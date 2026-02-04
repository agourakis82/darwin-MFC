import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { AlertCircle } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Informação importante',
    description: 'Nova versão do protocolo SUS foi lançada. Confira as atualizações.',
    dismissible: true,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Sucesso',
    description: 'Seu SOAP note foi salvo com sucesso.',
    dismissible: true,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Aviso',
    description: 'Este medicamento tem restrição em gestantes. Confirme que o paciente não está grávido.',
    dismissible: true,
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Erro',
    description: 'Falha ao sincronizar dados com o servidor. Tente novamente.',
    dismissible: true,
  },
};

export const WithAction: Story = {
  args: {
    variant: 'info',
    title: 'Atualizações disponíveis',
    description: 'Novas evidências sobre tratamento de diabetes foram adicionadas.',
    action: {
      label: 'Ver atualizações',
      onClick: () => alert('Navegando para atualizações...'),
    },
    dismissible: true,
  },
};

export const WithCustomIcon: Story = {
  args: {
    variant: 'warning',
    title: 'Interação medicamentosa detectada',
    description: 'Este medicamento pode interagir com outro já prescrito.',
    icon: <AlertCircle className="text-yellow-400" size={20} />,
    dismissible: true,
  },
};

export const NonDismissible: Story = {
  args: {
    variant: 'error',
    title: 'Erro crítico',
    description: 'Conexão perdida. Por favor, reconecte à internet.',
    dismissible: false,
  },
};

export const AllergiaAlert: Story = {
  args: {
    variant: 'error',
    title: '⚠️ Alerta de alergia',
    description: 'Paciente alérgico a penicilina. Medicamento contraindicado.',
    action: {
      label: 'Ver alternativas',
      onClick: () => alert('Mostrando medicamentos alternativos...'),
    },
    dismissible: false,
  },
};
