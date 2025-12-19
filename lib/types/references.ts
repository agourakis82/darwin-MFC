import type { EvidenceLevel, StudyType } from './evidence';

export type ReferenceType = 
  | 'artigo' 
  | 'portaria' 
  | 'lei' 
  | 'nota_tecnica' 
  | 'site' 
  | 'livro' 
  | 'diretriz';

export interface Reference {
  id: string;
  type: ReferenceType;
  authors?: string[];
  title: string;
  journal?: string; // Para artigos
  year: number;
  volume?: string;
  pages?: string;
  doi?: string;
  url?: string;
  accessDate?: string;
  legalNumber?: string; // Para portarias/leis (ex: "Portaria GM/MS nº 1.234")
  publisher?: string; // Para livros
  edition?: string; // Para livros
}

// Interface para uso em citações inline (ex: [1], [2-4])
export interface Citation {
  refId: string;
  page?: string; // Referência específica dentro da obra
  note?: string; // Nota contextual opcional
  evidenceLevel?: EvidenceLevel; // Nível de evidência
  studyType?: StudyType; // Tipo de estudo
  qualityScore?: number; // Score de qualidade (0-10)
  limitations?: string[]; // Limitações do estudo
  conflictsOfInterest?: string; // Conflitos de interesse
}

