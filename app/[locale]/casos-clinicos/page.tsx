import CasosClinicosClient from './CasosClinicosClient';

export const metadata = {
  title: 'Casos Clínicos - Darwin MFC',
  description: 'Casos clínicos interativos para aprendizado em Medicina de Família e Comunidade',
};

export default function CasosClinicosPage() {
  return <CasosClinicosClient />;
}
