import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
  title: 'Components/Feedback/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const InfoBanner: Story = {
  args: {
    variant: 'info',
    title: 'Darwin-MFC v2.0 disponível',
    description: 'Nova versão com integração de IA, vector search e knowledge graph. Descubra as novidades.',
    dismissible: true,
    sticky: true,
  },
};

export const WarningBanner: Story = {
  args: {
    variant: 'warning',
    title: 'Manutenção programada amanhã',
    description: 'O sistema estará indisponível entre 2h e 4h da manhã para atualizações.',
    dismissible: true,
    sticky: true,
  },
};

export const NonDismissibleBanner: Story = {
  args: {
    variant: 'info',
    title: 'Atualizações de segurança disponíveis',
    description: 'Patch crítico de segurança foi lançado. Por favor, reinicie sua sessão.',
    dismissible: false,
    sticky: true,
  },
};

export const NonStickyBanner: Story = {
  args: {
    variant: 'info',
    title: 'Novo protocolo SUS em vigor',
    description: 'A partir de hoje, o protocolo de diabetes segue novas recomendações. Consulte a documentação.',
    dismissible: true,
    sticky: false,
  },
};

export const WithStoragePersistence: Story = {
  args: {
    variant: 'info',
    title: 'Bem-vindo ao Darwin-MFC!',
    description: 'Esta é uma plataforma acadêmica Q1 com rigor Nature/Cell. Explore recursos como SOAP notes, calculadoras e análise crítica.',
    dismissible: true,
    sticky: true,
    storageKey: 'welcome-banner-2025',
  },
};

export const NewFeatureBanner: Story = {
  args: {
    variant: 'info',
    title: '🚀 Nova feature: Differential Diagnosis Assistant',
    description: 'Use IA para explorar diagnósticos diferenciais baseados em sintomas do paciente.',
    dismissible: true,
    sticky: true,
    storageKey: 'ddx-feature-banner',
  },
};

export const SecurityAlert: Story = {
  args: {
    variant: 'warning',
    title: '🔒 Alerta de segurança',
    description: 'Detectamos login de uma nova localização. Se não foi você, altere sua senha imediatamente.',
    dismissible: false,
    sticky: true,
  },
};

export const MaintenanceBanner: Story = {
  args: {
    variant: 'warning',
    title: 'Sistema em modo de manutenção',
    description: 'Alguns recursos podem estar lentos. Agradecemos sua paciência enquanto otimizamos.',
    dismissible: true,
    sticky: true,
  },
};
