import { Metadata } from 'next';
import ConsultaRapidaClient from './ConsultaRapidaClient';

export const metadata: Metadata = {
  title: 'Modo Consulta Rápida | Darwin-MFC',
  description: 'Interface otimizada para consulta durante atendimento - acesso rápido a doses, protocolos e informações essenciais',
};

export default function ConsultaRapidaPage() {
  return <ConsultaRapidaClient />;
}

