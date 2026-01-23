/**
 * Disease Data Exports - @darwin-mfc/medical-data
 * =================================================
 *
 * Consolidated disease data from Darwin-MFC
 * Includes 1000+ diseases with ICD-10, CIAP-2, SNOMED-CT mappings
 */

// Re-export consolidated diseases and utility functions
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
} from '../../../lib/data/doencas/index';

// Default export for convenience
export { default } from '../../../lib/data/doencas/index';
