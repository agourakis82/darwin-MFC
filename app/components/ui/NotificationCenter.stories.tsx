import type { Meta, StoryObj } from '@storybook/react';
import { NotificationCenter, type Notification } from './NotificationCenter';
import { useState } from 'react';

const meta: Meta<typeof NotificationCenter> = {
  title: 'Components/Feedback/NotificationCenter',
  component: NotificationCenter,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof NotificationCenter>;

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'protocol_update',
    title: 'Novo protocolo SUS',
    message: 'Protocolo de tratamento de diabetes foi atualizado com novas recomendações.',
    read: false,
    createdAt: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    action: {
      label: 'Ver protocolo',
      onClick: () => alert('Abrindo protocolo...'),
    },
  },
  {
    id: '2',
    type: 'new_evidence',
    title: 'Nova evidência encontrada',
    message: 'Meta-análise de 2024 sobre eficácia de medicamento cardiovascular.',
    read: false,
    createdAt: new Date(Date.now() - 2 * 3600000), // 2 hours ago
  },
  {
    id: '3',
    type: 'mention',
    title: 'Menção em comunidade',
    message: 'Dr. Silva respondeu seu comentário sobre diagnóstico diferencial.',
    read: true,
    createdAt: new Date(Date.now() - 24 * 3600000), // 1 day ago
    action: {
      label: 'Ver resposta',
      onClick: () => alert('Navegando para conversa...'),
    },
  },
  {
    id: '4',
    type: 'system',
    title: 'Manutenção programada',
    message: 'Sistema passará por manutenção amanhã das 2h às 4h da manhã.',
    read: true,
    createdAt: new Date(Date.now() - 3 * 24 * 3600000), // 3 days ago
  },
];

export const Default: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(mockNotifications);

    return (
      <div className="w-96">
        <NotificationCenter
          notifications={notifications}
          onMarkAsRead={(id) => {
            setNotifications(notifications.map(n =>
              n.id === id ? { ...n, read: true } : n
            ));
          }}
          onMarkAllAsRead={() => {
            setNotifications(notifications.map(n => ({ ...n, read: true })));
          }}
          onDelete={(id) => {
            setNotifications(notifications.filter(n => n.id !== id));
          }}
          onArchive={(id) => {
            setNotifications(notifications.filter(n => n.id !== id));
          }}
        />
      </div>
    );
  },
};

export const Empty: Story = {
  args: {
    notifications: [],
  },
};

export const OnlyUnread: Story = {
  args: {
    notifications: [
      {
        id: '1',
        type: 'protocol_update',
        title: 'Protocolo atualizado',
        message: 'Nova recomendação de tratamento disponível.',
        read: false,
        createdAt: new Date(Date.now() - 5 * 60000),
      },
      {
        id: '2',
        type: 'new_evidence',
        title: 'Estudo importante publicado',
        message: 'RCT sobre eficácia de terapia cognitivo-comportamental em ansiedade.',
        read: false,
        createdAt: new Date(Date.now() - 1 * 3600000),
      },
    ],
  },
};

export const MixedReadStatus: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(mockNotifications);

    return (
      <div className="w-96">
        <NotificationCenter
          notifications={notifications}
          onMarkAsRead={(id) => {
            setNotifications(notifications.map(n =>
              n.id === id ? { ...n, read: true } : n
            ));
          }}
          onMarkAllAsRead={() => {
            setNotifications(notifications.map(n => ({ ...n, read: true })));
          }}
          onDelete={(id) => {
            setNotifications(notifications.filter(n => n.id !== id));
          }}
          onArchive={(id) => {
            setNotifications(notifications.filter(n => n.id !== id));
          }}
        />
      </div>
    );
  },
};

export const WithActions: Story = {
  args: {
    notifications: [
      {
        id: '1',
        type: 'protocol_update',
        title: 'CIAP-2 atualizada',
        message: 'Classificação Internacional de Atenção Primária revisada.',
        read: false,
        createdAt: new Date(),
        action: {
          label: 'Ver atualizações',
          onClick: () => alert('Mostrando atualizações de CIAP-2...'),
        },
      },
      {
        id: '2',
        type: 'new_evidence',
        title: 'Novo medicamento aprovado',
        message: 'ANVISA aprova novo fármaco para tratamento de hipertensão.',
        read: false,
        createdAt: new Date(Date.now() - 30 * 60000),
        action: {
          label: 'Ver detalhes',
          onClick: () => alert('Abrindo ficha técnica...'),
        },
      },
    ],
  },
};

export const LongNotificationList: Story = {
  args: {
    notifications: Array.from({ length: 10 }, (_, i) => ({
      id: `notification-${i}`,
      type: i % 2 === 0 ? 'protocol_update' : 'new_evidence',
      title: `Notificação ${i + 1}`,
      message: `Descrição da notificação número ${i + 1} com conteúdo importante para o médico.`,
      read: i > 3,
      createdAt: new Date(Date.now() - (i * 3600000)),
    })) as Notification[],
    maxHeight: 'max-h-64',
  },
};
