/**
 * Medication Data Exports - @darwin-mfc/medical-data
 * ====================================================
 *
 * Consolidated medication data from Darwin-MFC
 * Includes 600+ medications with RENAME (Brazilian essential medications) info
 */

// Re-export consolidated medications and utility functions
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
} from '../../../lib/data/medicamentos/index';

// Re-export individual category arrays for direct access
export {
  medicamentosBase,
  medicamentosExpanded,
  antibioticos,
  analgesicosAines,
  psicofarmacos,
  medicamentosDiversos,
  medicamentosComplementares,
} from '../../../lib/data/medicamentos/index';
