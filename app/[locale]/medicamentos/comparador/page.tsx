import { Metadata } from 'next';
import ComparadorClient from './ComparadorClient';

export const metadata: Metadata = {
  title: 'Comparador de Medicamentos | Darwin-MFC',
  description: 'Compare medicamentos lado a lado - posologia, interações, contraindicações',
};

export default function ComparadorPage() {
  return <ComparadorClient />;
}

