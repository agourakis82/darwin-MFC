/**
 * Rede de Interações Medicamentosas
 * Para visualização gráfica de interações
 */

import type { Medicamento, Interacao } from '@/lib/types/medicamento';
import { todosMedicamentos } from '@/lib/data/medicamentos/index';

export interface MedicationNode {
  id: string;
  name: string;
  classe?: string;
  x?: number;
  y?: number;
  size?: number; // Tamanho do nó (baseado em número de interações)
}

export interface MedicationEdge {
  source: string;
  target: string;
  interaction: Interacao;
  strength: 'grave' | 'moderada' | 'leve'; // Gravidade da interação
}

export interface MedicationNetwork {
  nodes: MedicationNode[];
  edges: MedicationEdge[];
}

/**
 * Constrói rede de interações medicamentosas
 */
export function buildMedicationNetwork(
  medications: Medicamento[] = todosMedicamentos,
  filterBySeverity?: 'grave' | 'moderada' | 'leve'
): MedicationNetwork {
  const nodes: MedicationNode[] = [];
  const edges: MedicationEdge[] = [];
  const nodeMap = new Map<string, MedicationNode>();

  // Cria nós para todos os medicamentos
  medications.forEach(med => {
    if (!med.id) return;

    const node: MedicationNode = {
      id: med.id,
      name: med.nomeGenerico || med.id,
      classe: med.classeTerapeutica,
      size: 1, // Inicializa com 1
    };

    nodes.push(node);
    nodeMap.set(med.id, node);
  });

  // Constrói arestas (interações)
  medications.forEach(med1 => {
    if (!med1.id || !med1.interacoes) return;

    med1.interacoes.forEach(interacao => {
      // Encontra medicamento alvo da interação
      const med2Id = interacao.medicamento;
      const med2 = medications.find(m => m.id === med2Id || m.nomeGenerico === med2Id);

      if (!med2 || !med2.id || med1.id === med2.id) return;

      // Filtra por severidade se especificado
      if (filterBySeverity && interacao.gravidade !== filterBySeverity) {
        return;
      }

      // Mapeia gravidade para strength (contraindicada -> grave)
      const strength: 'grave' | 'moderada' | 'leve' = 
        interacao.gravidade === 'contraindicada' ? 'grave' :
        interacao.gravidade === 'grave' ? 'grave' :
        interacao.gravidade === 'moderada' ? 'moderada' :
        'leve';

      // Cria aresta (bidirecional)
      edges.push({
        source: med1.id,
        target: med2.id,
        interaction: interacao,
        strength,
      });

      // Atualiza tamanho dos nós (número de interações)
      const node1 = nodeMap.get(med1.id);
      const node2 = nodeMap.get(med2.id);
      if (node1) {
        node1.size = (node1.size || 1) + 1;
      }
      if (node2) {
        node2.size = (node2.size || 1) + 1;
      }
    });
  });

  // Remove nós isolados (sem interações)
  const connectedNodeIds = new Set<string>();
  edges.forEach(edge => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  const filteredNodes = nodes.filter(node => connectedNodeIds.has(node.id));

  return {
    nodes: filteredNodes,
    edges,
  };
}

/**
 * Filtra rede por medicamentos específicos
 */
export function filterNetworkByMedications(
  network: MedicationNetwork,
  medicationIds: string[]
): MedicationNetwork {
  const idSet = new Set(medicationIds);
  
  const filteredNodes = network.nodes.filter(node => idSet.has(node.id));
  const nodeIdSet = new Set(filteredNodes.map(n => n.id));
  
  const filteredEdges = network.edges.filter(
    edge => nodeIdSet.has(edge.source) && nodeIdSet.has(edge.target)
  );

  return {
    nodes: filteredNodes,
    edges: filteredEdges,
  };
}

/**
 * Encontra interações para um conjunto de medicamentos
 */
export function findInteractionsForMedications(
  medicationIds: string[],
  allMedications: Medicamento[] = todosMedicamentos
): MedicationEdge[] {
  const edges: MedicationEdge[] = [];
  const idSet = new Set(medicationIds);

  medicationIds.forEach(id => {
    const med = allMedications.find(m => m.id === id);
    if (!med || !med.interacoes) return;

    med.interacoes.forEach(interacao => {
      const targetMed = allMedications.find(
        m => (m.id === interacao.medicamento || m.nomeGenerico === interacao.medicamento) && idSet.has(m.id)
      );

      if (targetMed && targetMed.id) {
        // Mapeia gravidade para strength
        const strength: 'grave' | 'moderada' | 'leve' = 
          interacao.gravidade === 'contraindicada' ? 'grave' :
          interacao.gravidade === 'grave' ? 'grave' :
          interacao.gravidade === 'moderada' ? 'moderada' :
          'leve';

        edges.push({
          source: med.id,
          target: targetMed.id,
          interaction: interacao,
          strength,
        });
      }
    });
  });

  return edges;
}

/**
 * Agrupa medicamentos por classe terapêutica
 */
export function groupMedicationsByClass(medications: Medicamento[]): Map<string, Medicamento[]> {
  const groups = new Map<string, Medicamento[]>();

  medications.forEach(med => {
    const classe = med.classeTerapeutica || 'outros';
    const current = groups.get(classe) || [];
    current.push(med);
    groups.set(classe, current);
  });

  return groups;
}

/**
 * Calcula estatísticas da rede
 */
export function calculateNetworkStatistics(network: MedicationNetwork): {
  totalNodes: number;
  totalEdges: number;
  nodesBySeverity: {
    grave: number;
    moderada: number;
    leve: number;
  };
  mostConnected: MedicationNode[];
  isolatedNodes: number;
} {
  const severityCount = {
    grave: 0,
    moderada: 0,
    leve: 0,
  };

  network.edges.forEach(edge => {
    severityCount[edge.strength]++;
  });

  // Nós mais conectados (maior número de interações)
  const mostConnected = [...network.nodes]
    .sort((a, b) => (b.size || 0) - (a.size || 0))
    .slice(0, 10);

  // Nós isolados (sem interações)
  const connectedNodeIds = new Set<string>();
  network.edges.forEach(edge => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });
  const isolatedNodes = network.nodes.filter(node => !connectedNodeIds.has(node.id)).length;

  return {
    totalNodes: network.nodes.length,
    totalEdges: network.edges.length,
    nodesBySeverity: severityCount,
    mostConnected,
    isolatedNodes,
  };
}

