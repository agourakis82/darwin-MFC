export type ProtocolNodeLike = {
  id: string;
  data?: {
    nodeType?: string;
    label?: unknown;
  };
};

export type ProtocolEdgeLike = {
  id?: string;
  source: string;
  target: string;
  label?: unknown;
};

export type ProtocolDefinition<
  N extends ProtocolNodeLike = ProtocolNodeLike,
  E extends ProtocolEdgeLike = ProtocolEdgeLike
> = {
  nodes: N[];
  edges: E[];
  versao?: string;
  version?: string;
  protocolVersion?: string;
};

export interface ProtocolRunnerHistoryEntry {
  nodeId: string;
  viaEdgeId?: string;
}

export interface ProtocolRunnerState {
  activeNodeId: string;
  history: ProtocolRunnerHistoryEntry[];
  protocolVersion?: string;
}

export interface ProtocolNextOption {
  edgeId: string;
  label: string;
  targetNodeId: string;
  targetLabel: string;
}

export function getProtocolStartNodeId(protocol: ProtocolDefinition): string | null;
export function getNodeById<N extends ProtocolNodeLike>(
  protocol: ProtocolDefinition<N, any>,
  nodeId: string
): N | null;
export function getEdgeById<E extends ProtocolEdgeLike>(
  protocol: ProtocolDefinition<any, E>,
  edgeId: string
): E | null;

export function getNextOptions(protocol: ProtocolDefinition, nodeId: string): ProtocolNextOption[];

export function createInitialRunnerState(protocol: ProtocolDefinition): ProtocolRunnerState;
export function sanitizeRunnerState(protocol: ProtocolDefinition, raw: ProtocolRunnerState | null): ProtocolRunnerState;

export function canGoBack(state: ProtocolRunnerState): boolean;
export function goBack(state: ProtocolRunnerState): ProtocolRunnerState;
export function resetRunner(protocol: ProtocolDefinition): ProtocolRunnerState;
export function jumpToNode(state: ProtocolRunnerState, nodeId: string): ProtocolRunnerState;

export function chooseOption(
  protocol: ProtocolDefinition,
  state: ProtocolRunnerState,
  option: Pick<ProtocolNextOption, 'edgeId' | 'targetNodeId'>
): ProtocolRunnerState;

