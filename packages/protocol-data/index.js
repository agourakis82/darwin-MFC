'use strict';

// Re-export flowchart protocols from the already-built medical-data package.
// This keeps Metro/Next consumption frictionless (plain JS) and avoids
// duplicating large datasets across workspaces.
const md = require('@darwin-mfc/medical-data/protocols');

module.exports = {
  // Canonical names
  todosProtocolosFlowchart: md.protocolosFlowchart,
  getProtocoloById: md.getProtocoloById,
  getProtocolosByCategoria: md.getProtocolosByCategoria,
  getProtocolosStats: md.getProtocolosStats,

  // Individual exports (useful for tests/spot-checks)
  protocoloHAS: md.protocoloHAS,
  protocoloDM2: md.protocoloDM2,
  protocoloDorToracica: md.protocoloDorToracica,
  protocoloITU: md.protocoloITU,
  protocoloAsma: md.protocoloAsma,
  protocoloLombalgia: md.protocoloLombalgia,
  protocoloDepressao: md.protocoloDepressao,
  protocoloCefaleia: md.protocoloCefaleia,
  protocoloIVAS: md.protocoloIVAS,
  protocoloDislipidemia: md.protocoloDislipidemia,
  protocoloPreNatal: md.protocoloPreNatal,
  protocoloPuericultura: md.protocoloPuericultura,
  protocoloDPOC: md.protocoloDPOC,
};

