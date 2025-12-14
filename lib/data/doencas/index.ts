/**
 * INDEX DE DOENÇAS - DARWIN-MFC
 * ==============================
 * 
 * Consolidação de todas as doenças por categoria
 */

import { Doenca } from '../../types/doenca';

// Importar doenças existentes
import { doencas as doencasBase } from '../doencas';

// Importar novas categorias
import { doencasCardiovasculares } from './cardiovasculares';
import { doencasRespiratorias } from './respiratorias';
import { doencasEndocrinas } from './endocrinas';

// Consolidar todas as doenças
export const todasDoencas: Doenca[] = [
  ...doencasBase,
  ...doencasCardiovasculares,
  ...doencasRespiratorias,
  ...doencasEndocrinas,
];

// Remover duplicatas por ID (caso existam)
const doencasMap = new Map<string, Doenca>();
todasDoencas.forEach(d => doencasMap.set(d.id, d));
export const doencasConsolidadas: Doenca[] = Array.from(doencasMap.values());

// Funções auxiliares
export function getAllDoencas(): Doenca[] {
  return doencasConsolidadas;
}

export function getDoencaById(id: string): Doenca | undefined {
  return doencasConsolidadas.find(d => d.id === id);
}

export function getDoencasByCategoria(categoria: string): Doenca[] {
  return doencasConsolidadas.filter(d => d.categoria === categoria);
}

export function getDoencasByCIAP2(code: string): Doenca[] {
  return doencasConsolidadas.filter(d => d.ciap2.includes(code));
}

export function getDoencasByCID10(code: string): Doenca[] {
  return doencasConsolidadas.filter(d => 
    d.cid10.some(c => c.startsWith(code))
  );
}

export function searchDoencas(query: string): Doenca[] {
  const normalizedQuery = query.toLowerCase().trim();
  return doencasConsolidadas.filter(d =>
    d.titulo.toLowerCase().includes(normalizedQuery) ||
    d.sinonimos?.some(s => s.toLowerCase().includes(normalizedQuery)) ||
    d.ciap2.some(c => c.toLowerCase().includes(normalizedQuery)) ||
    d.cid10.some(c => c.toLowerCase().includes(normalizedQuery)) ||
    d.tags?.some(t => t.toLowerCase().includes(normalizedQuery))
  );
}

// Estatísticas
export function getDoencasStats() {
  const categorias = new Map<string, number>();
  doencasConsolidadas.forEach(d => {
    const count = categorias.get(d.categoria) || 0;
    categorias.set(d.categoria, count + 1);
  });
  
  return {
    total: doencasConsolidadas.length,
    porCategoria: Object.fromEntries(categorias),
  };
}

// Export default
export default doencasConsolidadas;

