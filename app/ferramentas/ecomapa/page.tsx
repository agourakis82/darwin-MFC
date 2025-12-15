import EcomapaClient from './EcomapaClient';

export const metadata = {
  title: 'Ecomapa - Darwin MFC',
  description: 'Gerador de ecomapa interativo para visualização de rede de apoio familiar',
};

export default function EcomapaPage() {
  return <EcomapaClient />;
}

