/**
 * Core Medical Types - @darwin-mfc/medical-data
 * ==============================================
 *
 * Shared type definitions for medical data
 * Used by Darwin Education and other Darwin ecosystem projects
 */

// Disease types
export type {
  Doenca,
  CategoriaDoenca,
  ClassificacaoRisco,
  RiscoInfo,
  QuickViewContent,
} from '../../../lib/types/doenca';

export { CATEGORIAS_DOENCA } from '../../../lib/types/doenca';

// Medication types
export type {
  Medicamento,
  ClasseTerapeutica,
  SubclasseMedicamento,
  ClassificacaoGestacao,
  FormaFarmaceutica,
  Posologia,
  AjusteDoseRenal,
  Interacao,
  GravidadeInteracao,
  ApresentacaoComercial,
  MedicamentoSearchResult,
  MedicamentosByClasse,
} from '../../../lib/types/medicamento';

// Protocol types (basic, without React Flow dependencies)
export type {
  ProtocoloInterativo,
  FlowchartNode,
  FlowchartEdge,
  NodeType,
  EdgeStyle,
  EdgeCondition,
  ProtocoloCategoria,
} from '../../../lib/types/protocolo-interativo';

// Reference types (for citations)
export type {
  Citation,
  Reference,
  ReferenceType,
} from '../../../lib/types/references';

// Evidence types
export type {
  EvidenceLevel,
  GradeEvidenceLevel,
  OxfordEvidenceLevel,
  StudyType,
} from '../../../lib/types/evidence';

// Region types (for multi-country support)
export type {
  Region,
  RegionalMedicationOverlay,
  RegionalDiseaseOverlay,
  RegionalOverlayMap,
} from '../../../lib/types/region';

// Ontology types
export type {
  CIAP2Chapter,
  CIAP2Component,
} from '../../../lib/types/ciap2';
