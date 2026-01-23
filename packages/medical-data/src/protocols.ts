/**
 * Protocol Data Exports - @darwin-mfc/medical-data
 * ==================================================
 *
 * Clinical protocols with interactive flowcharts
 * Used for clinical decision support
 */

// Re-export basic protocols
export { protocolos } from '../../../lib/data/protocolos';

// Re-export flowchart protocols
export {
  todosProtocolosFlowchart as protocolosFlowchart,
  getProtocoloById,
  getProtocolosByCategoria,
  getProtocolosStats,
  // Individual protocols
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
} from '../../../lib/data/protocolos-flowchart';
