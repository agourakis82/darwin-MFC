// Exportações centralizadas de todos os tipos
export * from './references';
export * from './rastreamentos';
export * from './analysis';
export * from './timeline';

// Tipos auxiliares
export type ContentMode = 'descriptive' | 'critical_analysis';
export type Theme = 'light' | 'dark';

// Estado global da aplicação
export interface AppState {
  theme: Theme;
  contentMode: ContentMode;
  favorites: string[]; // IDs dos rastreamentos favoritos
  notes: Record<string, string>; // { rastreamentoId: nota }
}

