// Darwin-MFC protocol runner (web + mobile).
// Kept as plain JS to avoid requiring a build step for workspace consumers.
'use strict';

function protocolVersionOf(protocol) {
  return (
    (protocol && (protocol.versao || protocol.version || protocol.protocolVersion)) ??
    undefined
  );
}

function fallbackEdgeId(edge) {
  return (edge && edge.id) || `${edge.source}->${edge.target}`;
}

function getProtocolStartNodeId(protocol) {
  if (!protocol || !Array.isArray(protocol.nodes)) return null;
  const start = protocol.nodes.find((n) => n && n.data && n.data.nodeType === 'start');
  return (start && start.id) || (protocol.nodes[0] && protocol.nodes[0].id) || null;
}

function getNodeById(protocol, nodeId) {
  if (!protocol || !Array.isArray(protocol.nodes)) return null;
  return protocol.nodes.find((n) => n && n.id === nodeId) || null;
}

function getEdgeById(protocol, edgeId) {
  if (!protocol || !Array.isArray(protocol.edges)) return null;
  return protocol.edges.find((e) => e && fallbackEdgeId(e) === edgeId) || null;
}

function getNextOptions(protocol, nodeId) {
  if (!protocol || !Array.isArray(protocol.edges)) return [];
  const outgoing = protocol.edges.filter((e) => e && e.source === nodeId);
  return outgoing
    .map((e) => {
      const target = getNodeById(protocol, e.target);
      const label = typeof e.label === 'string' ? String(e.label) : '';
      return {
        edgeId: fallbackEdgeId(e),
        label: label.trim(),
        targetNodeId: String(e.target || ''),
        targetLabel: String((target && target.data && target.data.label) || '').trim(),
      };
    })
    .filter((o) => o.targetNodeId.length > 0);
}

function createInitialRunnerState(protocol) {
  const startNodeId = getProtocolStartNodeId(protocol);
  const v = protocolVersionOf(protocol);
  if (!startNodeId) return { activeNodeId: '', history: [], protocolVersion: v };
  return {
    activeNodeId: startNodeId,
    history: [{ nodeId: startNodeId }],
    protocolVersion: v,
  };
}

function sanitizeRunnerState(protocol, raw) {
  const fallback = createInitialRunnerState(protocol);
  if (!raw) return fallback;

  const currentVersion = protocolVersionOf(protocol);
  if (raw.protocolVersion && currentVersion && raw.protocolVersion !== currentVersion) return fallback;

  if (!raw.activeNodeId || !Array.isArray(raw.history) || raw.history.length === 0) return fallback;

  const knownNodeIds = new Set((protocol.nodes || []).map((n) => n && n.id).filter(Boolean));
  const history = raw.history
    .filter((h) => h && knownNodeIds.has(h.nodeId))
    .map((h) => ({ nodeId: h.nodeId, viaEdgeId: h.viaEdgeId }));

  if (history.length === 0) return fallback;

  const activeNodeId = knownNodeIds.has(raw.activeNodeId)
    ? raw.activeNodeId
    : history[history.length - 1].nodeId;

  // Invariant: active node must be the last history element.
  const last = history[history.length - 1] && history[history.length - 1].nodeId;
  if (last !== activeNodeId) {
    const idx = history.findIndex((h) => h.nodeId === activeNodeId);
    if (idx >= 0) {
      return { activeNodeId, history: history.slice(0, idx + 1), protocolVersion: currentVersion };
    }
    return fallback;
  }

  return { activeNodeId, history, protocolVersion: currentVersion };
}

function canGoBack(state) {
  return !!state && Array.isArray(state.history) && state.history.length > 1;
}

function goBack(state) {
  if (!canGoBack(state)) return state;
  const nextHistory = state.history.slice(0, -1);
  const nextActive = nextHistory[nextHistory.length - 1].nodeId;
  return { ...state, history: nextHistory, activeNodeId: nextActive };
}

function resetRunner(protocol) {
  return createInitialRunnerState(protocol);
}

function jumpToNode(state, nodeId) {
  if (!state || !Array.isArray(state.history)) return state;
  const idx = state.history.findIndex((h) => h && h.nodeId === nodeId);
  if (idx < 0) return state;
  const nextHistory = state.history.slice(0, idx + 1);
  return { ...state, history: nextHistory, activeNodeId: nodeId };
}

function chooseOption(protocol, state, option) {
  if (!protocol || !state || !option) return state;
  if (!option.targetNodeId) return state;
  if (!getNodeById(protocol, option.targetNodeId)) return state;

  return {
    ...state,
    activeNodeId: option.targetNodeId,
    history: [
      ...state.history,
      { nodeId: option.targetNodeId, viaEdgeId: option.edgeId },
    ],
  };
}

module.exports = {
  getProtocolStartNodeId,
  getNodeById,
  getEdgeById,
  getNextOptions,
  createInitialRunnerState,
  sanitizeRunnerState,
  canGoBack,
  goBack,
  resetRunner,
  jumpToNode,
  chooseOption,
};

