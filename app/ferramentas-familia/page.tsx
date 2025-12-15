import { Metadata } from 'next';
import FerramentasFamiliaClient from './FerramentasFamiliaClient';

export const metadata: Metadata = {
  title: 'Ferramentas de Abordagem Familiar | Darwin MFC',
  description: 'Genograma e Ecomapa interativos para abordagem familiar na APS',
};

export default function FerramentasFamiliaPage() {
  return <FerramentasFamiliaClient />;
}

