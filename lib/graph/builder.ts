/**
 * Knowledge graph builder
 * Constructs the graph from disease, medication, and protocol data
 */

import type { Doenca } from '../types/doenca';
import type { Medicamento } from '../types/medicamento';
import { todasDoencas } from '../data/doencas/index';
import { todosMedicamentos } from '../data/medicamentos/index';
import type { KnowledgeGraph, GraphNode, GraphEdge, NodeType, EdgeType } from './types';

/**
 * Build the complete knowledge graph from all data
 */
export function buildKnowledgeGraph(): KnowledgeGraph {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const nodeMap = new Map<string, GraphNode>(); // To avoid duplicates

  // Add disease nodes
  todasDoencas.forEach((doenca) => {
    if (!doenca.id) return;
    
    const node: GraphNode = {
      id: `doenca:${doenca.id}`,
      type: 'doenca',
      label: doenca.titulo || '',
      data: {
        doencaId: doenca.id,
        cid10: doenca.cid10,
        ciap2: doenca.ciap2,
      },
    };
    
    nodes.push(node);
    nodeMap.set(node.id, node);

    // Add symptom nodes and edges (from quickView.criteriosDiagnosticos and quadroClinico)
    const sintomas = extractSymptoms(doenca);
    sintomas.forEach((sintoma) => {
      const sintomaId = `sintoma:${normalizeId(sintoma)}`;
      
      if (!nodeMap.has(sintomaId)) {
        const sintomaNode: GraphNode = {
          id: sintomaId,
          type: 'sintoma',
          label: sintoma,
          data: {
            sintoma,
          },
        };
        nodes.push(sintomaNode);
        nodeMap.set(sintomaId, sintomaNode);
      }

      // Add edge: disease -> symptom (causa)
      edges.push({
        id: `edge:${node.id}:${sintomaId}:causa`,
        source: node.id,
        target: sintomaId,
        type: 'causa',
        weight: 1.0,
      });
    });

    // Add exam nodes and edges
    const exames = extractExams(doenca);
    exames.forEach((exame) => {
      const exameId = `exame:${normalizeId(exame)}`;
      
      if (!nodeMap.has(exameId)) {
        const exameNode: GraphNode = {
          id: exameId,
          type: 'exame',
          label: exame,
          data: {
            exame,
          },
        };
        nodes.push(exameNode);
        nodeMap.set(exameId, exameNode);
      }

      // Add edge: exam -> disease (diagnostica)
      edges.push({
        id: `edge:${exameId}:${node.id}:diagnostica`,
        source: exameId,
        target: node.id,
        type: 'diagnostica',
        weight: 1.0,
      });
    });

    // Add medication edges (from medicamentos array)
    doenca.medicamentos?.forEach((medId) => {
      const medNodeId = `medicamento:${medId}`;
      
      // Medication node will be added separately, just add edge
      edges.push({
        id: `edge:${medNodeId}:${node.id}:trata`,
        source: medNodeId,
        target: node.id,
        type: 'trata',
        weight: 0.9,
      });
    });

    // Add protocol edges
    doenca.protocolos?.forEach((protId) => {
      const protNodeId = `protocolo:${protId}`;
      
      edges.push({
        id: `edge:${protNodeId}:${node.id}:associado`,
        source: protNodeId,
        target: node.id,
        type: 'associado',
        weight: 0.8,
      });
    });
  });

  // Add medication nodes and interactions
  todosMedicamentos.forEach((medicamento) => {
    if (!medicamento.id) return;
    
    const nodeId = `medicamento:${medicamento.id}`;
    const node: GraphNode = {
      id: nodeId,
      type: 'medicamento',
      label: medicamento.nomeGenerico || '',
      data: {
        medicamentoId: medicamento.id,
        atcCode: medicamento.atcCode,
      },
    };
    
    if (!nodeMap.has(nodeId)) {
      nodes.push(node);
      nodeMap.set(nodeId, node);
    }

    // Add interaction edges
    medicamento.interacoes?.forEach((interacao) => {
      const targetMedId = `medicamento:${interacao.medicamento}`;
      
      // Only add edge if target medication exists
      if (nodeMap.has(targetMedId) || todosMedicamentos.some(m => m.id === interacao.medicamento)) {
        edges.push({
          id: `edge:${nodeId}:${targetMedId}:interage`,
          source: nodeId,
          target: targetMedId,
          type: 'interage',
          weight: getInteractionWeight(interacao.gravidade),
          label: interacao.gravidade,
          data: {
            gravidade: interacao.gravidade,
            mecanismo: interacao.mecanismo,
          },
        });
      }
    });

    // Add pharmacogenomics edges (gene -> medication)
    medicamento.pharmgkb?.forEach((pgx) => {
      const geneId = `gene:${pgx.gene}`;
      
      if (!nodeMap.has(geneId)) {
        const geneNode: GraphNode = {
          id: geneId,
          type: 'gene',
          label: pgx.gene,
          data: {
            gene: pgx.gene,
          },
        };
        nodes.push(geneNode);
        nodeMap.set(geneId, geneNode);
      }

      edges.push({
        id: `edge:${geneId}:${nodeId}:metaboliza`,
        source: geneId,
        target: nodeId,
        type: 'metaboliza',
        weight: 0.9,
      });
    });
  });

  return { nodes, edges };
}

/**
 * Extract symptoms from disease data
 */
function extractSymptoms(doenca: Partial<Doenca>): string[] {
  const sintomas = new Set<string>();
  
  // From quickView.criteriosDiagnosticos
  doenca.quickView?.criteriosDiagnosticos?.forEach((criterio) => {
    // Simple extraction - look for symptom keywords
    const symptomKeywords = ['dor', 'febre', 'tosse', 'dispneia', 'náusea', 'vômito', 'diarreia'];
    symptomKeywords.forEach((keyword) => {
      if (criterio.toLowerCase().includes(keyword)) {
        sintomas.add(keyword);
      }
    });
  });
  
  // From fullContent.quadroClinico.sintomasPrincipais
  doenca.fullContent?.quadroClinico?.sintomasPrincipais?.forEach((sintoma) => {
    sintomas.add(sintoma);
  });
  
  return Array.from(sintomas);
}

/**
 * Extract exams from disease data
 */
function extractExams(doenca: Partial<Doenca>): string[] {
  const exames = new Set<string>();
  
  // From quickView.examesIniciais
  doenca.quickView?.examesIniciais?.forEach((exame) => {
    exames.add(exame);
  });
  
  // From fullContent.diagnostico.examesLaboratoriais
  doenca.fullContent?.diagnostico?.examesLaboratoriais?.forEach((exame) => {
    exames.add(exame);
  });
  
  // From fullContent.diagnostico.examesImagem
  doenca.fullContent?.diagnostico?.examesImagem?.forEach((exame) => {
    exames.add(exame);
  });
  
  return Array.from(exames);
}

/**
 * Normalize string to ID format
 */
function normalizeId(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric with dash
    .replace(/-+/g, '-') // Replace multiple dashes with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing dashes
}

/**
 * Get interaction weight based on severity
 */
function getInteractionWeight(gravidade: string): number {
  switch (gravidade.toLowerCase()) {
    case 'grave':
    case 'contraindicada':
      return 1.0;
    case 'moderada':
      return 0.7;
    case 'leve':
      return 0.4;
    default:
      return 0.5;
  }
}

