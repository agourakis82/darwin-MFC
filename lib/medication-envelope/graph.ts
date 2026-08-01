import type {
  MedicationChangeImpactReportV1,
  MedicationEvidenceEdgeV1,
  MedicationEvidenceGraphV1,
  MedicationEvidenceNodeV1,
  MedicationEvidenceNodeKind,
} from './types';
import { canonicalize } from './canonical';

export type Sha256Function = (value: string) => Promise<string> | string;

export async function createEvidenceNode(
  kind: MedicationEvidenceNodeKind,
  payload: Record<string, unknown>,
  parentIds: string[],
  sha256: Sha256Function,
): Promise<MedicationEvidenceNodeV1> {
  const normalizedParents = [...new Set(parentIds)].sort();
  const payloadSha256 = await sha256(canonicalize(payload));
  const nodeSha256 = await sha256(canonicalize({ kind, payloadSha256, parentIds: normalizedParents }));
  return {
    schemaVersion: 'darwin.medication-evidence-node.v1',
    id: `rxeg-${nodeSha256}`,
    kind,
    status: 'CURRENT',
    payload,
    payloadSha256,
    parentIds: normalizedParents,
    nodeSha256,
  };
}

function topologicalOrder(nodes: MedicationEvidenceNodeV1[], edges: MedicationEvidenceEdgeV1[]): string[] {
  const ids = new Set(nodes.map(node => node.id));
  const indegree = new Map([...ids].map(id => [id, 0]));
  const children = new Map([...ids].map(id => [id, [] as string[]]));
  for (const edge of edges) {
    if (!ids.has(edge.from) || !ids.has(edge.to)) throw new Error('evidence-edge-node-missing');
    indegree.set(edge.to, (indegree.get(edge.to) ?? 0) + 1);
    children.get(edge.from)?.push(edge.to);
  }
  const queue = [...ids].filter(id => indegree.get(id) === 0).sort();
  const ordered: string[] = [];
  while (queue.length > 0) {
    const id = queue.shift();
    if (!id) break;
    ordered.push(id);
    for (const child of (children.get(id) ?? []).sort()) {
      const next = (indegree.get(child) ?? 0) - 1;
      indegree.set(child, next);
      if (next === 0) queue.push(child);
    }
    queue.sort();
  }
  if (ordered.length !== nodes.length) throw new Error('evidence-graph-cycle');
  return ordered;
}

export async function buildEvidenceGraph(
  nodes: MedicationEvidenceNodeV1[],
  edges: MedicationEvidenceEdgeV1[],
  generatedAt: string,
  sha256: Sha256Function,
): Promise<MedicationEvidenceGraphV1> {
  if (new Set(nodes.map(node => node.id)).size !== nodes.length) throw new Error('evidence-node-collision');
  for (const node of nodes) {
    if (node.id !== `rxeg-${node.nodeSha256}`) throw new Error('evidence-node-id-hash-mismatch');
    if (node.payloadSha256 !== await sha256(canonicalize(node.payload))) throw new Error('evidence-payload-hash-mismatch');
    const nodeDigest = await sha256(canonicalize({
      kind: node.kind,
      payloadSha256: node.payloadSha256,
      parentIds: [...node.parentIds].sort(),
    }));
    if (node.nodeSha256 !== nodeDigest) throw new Error('evidence-node-hash-mismatch');
  }
  topologicalOrder(nodes, edges);
  const outgoing = new Set(edges.map(edge => edge.from));
  const roots = nodes.filter(node => !outgoing.has(node.id)).map(node => node.id).sort();
  const merkleRootSha256 = await sha256(canonicalize(roots.map(id => (
    nodes.find(node => node.id === id)?.nodeSha256
  ))));
  return {
    schemaVersion: 'darwin.medication-evidence-graph.v1',
    generatedAt,
    intendedUse: 'Trace reviewed medication claims into executable constraints without inferring treatment.',
    nodes: [...nodes].sort((left, right) => left.id.localeCompare(right.id)),
    edges: [...edges].sort((left, right) => canonicalize(left).localeCompare(canonicalize(right))),
    roots,
    merkleRootSha256,
    audit: {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      staleNodeCount: nodes.filter(node => node.status === 'STALE').length,
      cycleFree: true,
      contentAddressed: true,
    },
  };
}

export async function calculateChangeImpact(
  graph: MedicationEvidenceGraphV1,
  changedNodeIds: string[],
  sha256: Sha256Function,
): Promise<MedicationChangeImpactReportV1> {
  const known = new Set(graph.nodes.map(node => node.id));
  if (changedNodeIds.some(id => !known.has(id))) throw new Error('changed-evidence-node-missing');
  const children = new Map<string, string[]>();
  for (const edge of graph.edges) children.set(edge.from, [...(children.get(edge.from) ?? []), edge.to]);
  const stale = new Set<string>();
  const queue = [...changedNodeIds];
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;
    for (const child of children.get(current) ?? []) {
      if (stale.has(child)) continue;
      stale.add(child);
      queue.push(child);
    }
  }
  const staleDescendantIds = [...stale].sort();
  const affectedArtifactIds = graph.nodes
    .filter(node => stale.has(node.id) && node.kind === 'artifact')
    .map(node => String(node.payload.artifactId))
    .sort();
  return {
    schemaVersion: 'darwin.medication-change-impact-report.v1',
    graphSha256: await sha256(canonicalize(graph)),
    changedNodeIds: [...new Set(changedNodeIds)].sort(),
    staleDescendantIds,
    affectedArtifactIds,
    disposition: 'REFUSE',
    reason: 'evidence-descendant-stale',
  };
}
