import GenogramaClient from './GenogramaClient';

export const metadata = {
  title: 'Genograma - Darwin MFC',
  description: 'Gerador de genograma familiar interativo para Medicina de Família',
};

export default function GenogramaPage() {
  return <GenogramaClient />;
}

