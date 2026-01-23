/**
 * @darwin-mfc/medical-data
 * =========================
 *
 * Medical data package from Darwin-MFC
 * Provides diseases, medications, protocols, and types
 * for use in Darwin Education and other ecosystem projects
 *
 * @example
 * ```typescript
 * import { doencasConsolidadas, getDoencaById } from '@darwin-mfc/medical-data/diseases';
 * import { medicamentosConsolidados, searchMedicamentos } from '@darwin-mfc/medical-data/medications';
 * import { protocolos } from '@darwin-mfc/medical-data/protocols';
 * import type { Doenca, Medicamento } from '@darwin-mfc/medical-data/types';
 * ```
 *
 * Or import everything from the main entry:
 * ```typescript
 * import {
 *   doencasConsolidadas,
 *   medicamentosConsolidados,
 *   protocolos,
 *   type Doenca,
 *   type Medicamento
 * } from '@darwin-mfc/medical-data';
 * ```
 */

// ============================================================================
// TYPES
// ============================================================================
export * from './types';

// ============================================================================
// DISEASES
// ============================================================================
export {
  doencasConsolidadas,
  todasDoencas,
  getAllDoencas,
  getDoencaById,
  getDoencasByCategoria,
  filterByCategoria,
  getDoencasByCIAP2,
  getDoencasByCID10,
  searchDoencas,
  getDoencaByDOID,
  getDoencaBySNOMED,
  getDoencaByMeSH,
  getDoencaByUMLS,
  getDoencasWithFullOntologyMapping,
  getDoencasWithCID11,
  getDoencasWithHPO,
  getOntologyStats,
  getDoencasStats,
} from './diseases';

// ============================================================================
// MEDICATIONS
// ============================================================================
export {
  medicamentosConsolidados,
  todosMedicamentos,
  getMedicamentoById,
  getMedicamentosByClasse,
  getMedicamentosRENAME,
  getMedicamentosDisponivelSUS,
  searchMedicamentos,
  getMedicamentoStats,
  checkInteractions,
  // Category arrays
  medicamentosBase,
  medicamentosExpanded,
  antibioticos,
  analgesicosAines,
  psicofarmacos,
  medicamentosDiversos,
  medicamentosComplementares,
} from './medications';

// ============================================================================
// PROTOCOLS
// ============================================================================
export {
  protocolos,
  protocolosFlowchart,
  getProtocoloById,
  getProtocolosByCategoria,
  getProtocolosStats,
  // Individual flowchart protocols
  protocoloHAS,
  protocoloDM2,
  protocoloDorToracica,
  protocoloITU,
  protocoloAsma,
  protocoloLombalgia,
  protocoloDepressao,
  protocoloCefaleia,
  protocoloIVAS,
  protocoloDislipidemia,
  protocoloPreNatal,
  protocoloPuericultura,
  protocoloDPOC,
} from './protocols';
