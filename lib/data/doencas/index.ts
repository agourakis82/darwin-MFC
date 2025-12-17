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
import { doencasSaudeMental } from './saude-mental';
import { doencasGastrointestinais } from './gastrointestinais';
import { doencasMusculoesqueleticas } from './musculoesqueleticas';
import { doencasDermatologicas } from './dermatologicas';
import { doencasInfecciosas } from './infecciosas';
import { doencasRenaisUrologicas } from './renais-urologicas';
import { doencasNeurologicas } from './neurologicas';
import { doencasHematologicas } from './hematologicas';
import { doencasGinecoObstetricas } from './gineco-obstetricas';
import { doencasPediatricas } from './pediatricas';
import { doencasGeriatricas } from './geriatricas';
import { doencasAdicionais } from './adicionais';
import { doencasExpansaoSOTA } from './expansao-sota';
import { doencasExpansaoSOTAAvancada } from './expansao-sota-avancada';
import { doencasExpansaoSOTAFinal } from './expansao-sota-final';
import { doencasExpansaoSOTAAvancada } from './expansao-sota-avancada';

// Consolidar todas as doenças
// Nota: Algumas categorias usam Partial<Doenca> para flexibilidade de expansão
export const todasDoencas: Partial<Doenca>[] = [
  ...doencasBase,
  ...doencasCardiovasculares,
  ...doencasRespiratorias,
  ...doencasEndocrinas,
  ...doencasSaudeMental,
  ...doencasGastrointestinais,
  ...doencasMusculoesqueleticas,
  ...doencasDermatologicas,
  ...doencasInfecciosas,
  ...doencasRenaisUrologicas,
  ...doencasNeurologicas,
  ...doencasHematologicas,
  ...doencasGinecoObstetricas,
  ...doencasPediatricas,
  ...doencasGeriatricas,
  ...doencasAdicionais,
  ...doencasExpansaoSOTA,
  ...doencasExpansaoSOTAAvancada,
];

// Remover duplicatas por ID (caso existam) e filtrar apenas doenças com ID
const doencasMap = new Map<string, Partial<Doenca>>();
todasDoencas.forEach(d => {
  if (d.id) doencasMap.set(d.id, d);
});
export const doencasConsolidadas: Partial<Doenca>[] = Array.from(doencasMap.values());

// Funções auxiliares
export function getAllDoencas(): Partial<Doenca>[] {
  return doencasConsolidadas;
}

export function getDoencaById(id: string): Partial<Doenca> | undefined {
  return doencasConsolidadas.find(d => d.id === id);
}

export function getDoencasByCategoria(doencas: Partial<Doenca>[]): Record<string, Partial<Doenca>[]> {
  const grouped: Record<string, Partial<Doenca>[]> = {};
  doencas.forEach(d => {
    const cat = d.categoria || 'outros';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(d);
  });
  return grouped;
}

export function filterByCategoria(categoria: string): Partial<Doenca>[] {
  return doencasConsolidadas.filter(d => d.categoria === categoria);
}

export function getDoencasByCIAP2(code: string): Partial<Doenca>[] {
  return doencasConsolidadas.filter(d => d.ciap2?.includes(code));
}

export function getDoencasByCID10(code: string): Partial<Doenca>[] {
  return doencasConsolidadas.filter(d => 
    d.cid10?.some(c => c.startsWith(code))
  );
}

export function searchDoencas(query: string): Partial<Doenca>[] {
  const normalizedQuery = query.toLowerCase().trim();
  return doencasConsolidadas.filter(d =>
    d.titulo?.toLowerCase().includes(normalizedQuery) ||
    d.sinonimos?.some(s => s.toLowerCase().includes(normalizedQuery)) ||
    d.ciap2?.some(c => c.toLowerCase().includes(normalizedQuery)) ||
    d.cid10?.some(c => c.toLowerCase().includes(normalizedQuery)) ||
    d.tags?.some(t => t.toLowerCase().includes(normalizedQuery)) ||
    d.doid?.toLowerCase().includes(normalizedQuery) ||
    d.snomedCT?.includes(normalizedQuery) ||
    d.meshId?.toLowerCase().includes(normalizedQuery) ||
    d.umlsCui?.toLowerCase().includes(normalizedQuery)
  );
}

// ================================
// FUNÇÕES DE BUSCA POR ONTOLOGIA
// ================================

/**
 * Busca doença por DOID (Disease Ontology ID)
 * @example getDoencaByDOID('DOID:9351') // Diabetes mellitus tipo 2
 */
export function getDoencaByDOID(doid: string): Partial<Doenca> | undefined {
  return doencasConsolidadas.find(d => d.doid === doid);
}

/**
 * Busca doença por SNOMED-CT Concept ID
 * @example getDoencaBySNOMED('73211009') // Diabetes mellitus
 */
export function getDoencaBySNOMED(snomedCT: string): Partial<Doenca> | undefined {
  return doencasConsolidadas.find(d => d.snomedCT === snomedCT);
}

/**
 * Busca doença por MeSH ID
 * @example getDoencaByMeSH('D003920') // Diabetes Mellitus
 */
export function getDoencaByMeSH(meshId: string): Partial<Doenca> | undefined {
  return doencasConsolidadas.find(d => d.meshId === meshId);
}

/**
 * Busca doença por UMLS CUI
 * @example getDoencaByUMLS('C0011860') // Diabetes Mellitus, Type 2
 */
export function getDoencaByUMLS(umlsCui: string): Partial<Doenca> | undefined {
  return doencasConsolidadas.find(d => d.umlsCui === umlsCui);
}

/**
 * Busca doenças que possuem mapeamento completo de ontologias
 */
export function getDoencasWithFullOntologyMapping(): Partial<Doenca>[] {
  return doencasConsolidadas.filter(d => 
    d.doid && d.snomedCT && d.meshId && d.umlsCui && d.cid10 && d.ciap2
  );
}

export function getDoencasWithCID11(): Partial<Doenca>[] {
  return doencasConsolidadas.filter(d => d.cid11 && d.cid11.length > 0);
}

export function getDoencasWithHPO(): Partial<Doenca>[] {
  return doencasConsolidadas.filter(d => d.hpo && d.hpo.length > 0);
}

/**
 * Obtém estatísticas de cobertura de ontologias
 */
export function getOntologyStats() {
  const total = doencasConsolidadas.length;
  const withDOID = doencasConsolidadas.filter(d => d.doid).length;
  const withSNOMED = doencasConsolidadas.filter(d => d.snomedCT).length;
  const withMeSH = doencasConsolidadas.filter(d => d.meshId).length;
  const withUMLS = doencasConsolidadas.filter(d => d.umlsCui).length;
  const withCID11 = getDoencasWithCID11().length;
  const withHPO = getDoencasWithHPO().length;
  const withAll = getDoencasWithFullOntologyMapping().length;
  
  return {
    total,
    cobertura: {
      doid: { count: withDOID, percent: Math.round((withDOID / total) * 100) },
      snomedCT: { count: withSNOMED, percent: Math.round((withSNOMED / total) * 100) },
      meshId: { count: withMeSH, percent: Math.round((withMeSH / total) * 100) },
      umlsCui: { count: withUMLS, percent: Math.round((withUMLS / total) * 100) },
      cid11: { count: withCID11, percent: Math.round((withCID11 / total) * 100) },
      hpo: { count: withHPO, percent: Math.round((withHPO / total) * 100) },
      allMapped: { count: withAll, percent: Math.round((withAll / total) * 100) },
    }
  };
}

// Estatísticas
export function getDoencasStats() {
  const categorias = new Map<string, number>();
  doencasConsolidadas.forEach(d => {
    const cat = d.categoria || 'outros';
    const count = categorias.get(cat) || 0;
    categorias.set(cat, count + 1);
  });
  
  return {
    total: doencasConsolidadas.length,
    porCategoria: Object.fromEntries(categorias),
  };
}

// Export default
export default doencasConsolidadas;

