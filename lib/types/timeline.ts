import { Citation } from './references';

export interface TimelineEvent {
  id: string;
  date: string; // ISO format: "2025-09-24"
  title: string;
  description: string;
  category: 'portaria' | 'lei' | 'diretriz' | 'incorporacao' | 'nota_tecnica';
  impact: 'alto' | 'medio' | 'baixo';
  affectedScreenings: string[]; // IDs dos rastreamentos afetados
  citations: Citation[];
}

export interface TimelineData {
  year: number;
  description: string; // Ex: "Ano da Ruptura Epistemológica"
  events: TimelineEvent[];
}

