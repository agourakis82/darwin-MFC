import type { Protocolo, ProtocolEdge, ProtocolNode } from '@/lib/types/protocolo';
import {
  canGoBack,
  chooseOption,
  createInitialRunnerState,
  getEdgeById,
  getNextOptions,
  getNodeById,
  getProtocolStartNodeId,
  goBack,
  jumpToNode,
  resetRunner,
  sanitizeRunnerState,
} from '@darwin-mfc/protocol-runner';

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

// Structural typing keeps web Protocolo compatible with the shared runner.
export {
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

export type { Protocolo, ProtocolNode, ProtocolEdge };
