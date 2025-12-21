/**
 * CONSOLIDAÇÃO DE MEDICAMENTOS - DARWIN-MFC
 * ==========================================
 * 
 * Este arquivo consolida todos os medicamentos de todas as categorias.
 * Total alvo: 100+ medicamentos RENAME
 */

import { Medicamento } from '../../types/medicamento';
import { medicamentos as medicamentosBase } from '../medicamentos';
import { medicamentosExpanded } from '../medicamentos-expanded';
import { antibioticos } from './antibioticos';
import { analgesicosAines } from './analgesicos-aines';
import { psicofarmacos } from './psicofarmacos';
import { medicamentosDiversos } from './diversos';
import { medicamentosComplementares } from './complementares';
import { medicamentosExpansaoSOTA } from './expansao-sota';
import { medicamentosExpansaoSOTAFinal } from './expansao-sota-final';
import { medicamentosExpansaoUltima } from './expansao-ultima';
// Note: expansao-nova-fase, agent-1-antibiotics, agent-2-cardiovascular-endo removed (files deleted)

// Consolidar todos os medicamentos
// Filtrar apenas medicamentos completos do expanded
const expandedCompletos = medicamentosExpanded.filter(
  (med): med is Medicamento => 
    med.id !== undefined && 
    med.nomeGenerico !== undefined &&
    med.classeTerapeutica !== undefined
) as Medicamento[];

export const todosMedicamentos: Medicamento[] = [
  ...medicamentosBase,
  ...expandedCompletos,
  ...antibioticos,
  ...analgesicosAines,
  ...psicofarmacos,
  ...medicamentosDiversos,
  ...medicamentosComplementares,
  ...medicamentosExpansaoSOTA,
  ...medicamentosExpansaoSOTAFinal,
  ...medicamentosExpansaoUltima,
];

// Remover duplicatas por ID
const medicamentosMap = new Map<string, Medicamento>();
todosMedicamentos.forEach(med => {
  if (!medicamentosMap.has(med.id)) {
    medicamentosMap.set(med.id, med);
  }
});

export const medicamentosConsolidados: Medicamento[] = Array.from(medicamentosMap.values());

// Funções utilitárias
export function getMedicamentoById(id: string): Medicamento | undefined {
  return medicamentosConsolidados.find(m => m.id === id);
}

export function getMedicamentosByClasse(classe: string): Medicamento[] {
  return medicamentosConsolidados.filter(m => m.classeTerapeutica === classe);
}

export function getMedicamentosRENAME(): Medicamento[] {
  return medicamentosConsolidados.filter(m => m.rename === true);
}

export function getMedicamentosDisponivelSUS(): Medicamento[] {
  return medicamentosConsolidados.filter(m => 
    m.apresentacoes.some(a => a.disponivelSUS === true)
  );
}

export function searchMedicamentos(query: string): Medicamento[] {
  const normalizedQuery = query.toLowerCase().trim();
  return medicamentosConsolidados.filter(m =>
    m.nomeGenerico?.toLowerCase().includes(normalizedQuery) ||
    m.nomesComerciais?.some(n => n.toLowerCase().includes(normalizedQuery)) ||
    m.classeTerapeutica?.toLowerCase().includes(normalizedQuery) ||
    m.subclasse?.toLowerCase().includes(normalizedQuery) ||
    m.indicacoes?.some(i => i.toLowerCase().includes(normalizedQuery)) ||
    m.tags?.some(t => t.toLowerCase().includes(normalizedQuery))
  );
}

export function getMedicamentoStats() {
  const total = medicamentosConsolidados.length;
  const rename = getMedicamentosRENAME().length;
  const disponivelSUS = getMedicamentosDisponivelSUS().length;
  
  const byClasse = medicamentosConsolidados.reduce((acc, med) => {
    const classe = med.classeTerapeutica;
    acc[classe] = (acc[classe] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    rename,
    disponivelSUS,
    byClasse,
    percentRENAME: Math.round((rename / total) * 100),
    percentSUS: Math.round((disponivelSUS / total) * 100),
  };
}

// Verificar interações entre medicamentos
export function checkInteractions(medicamentoIds: string[]): Array<{
  med1: string;
  med2: string;
  gravidade: string;
  efeito: string;
  conduta: string;
}> {
  const interactions: Array<{
    med1: string;
    med2: string;
    gravidade: string;
    efeito: string;
    conduta: string;
  }> = [];

  medicamentoIds.forEach(id1 => {
    const med1 = getMedicamentoById(id1);
    if (!med1?.interacoes) return;

    medicamentoIds.forEach(id2 => {
      if (id1 === id2) return;
      const med2 = getMedicamentoById(id2);
      if (!med2) return;

      med1.interacoes?.forEach(interacao => {
        // Verificar se o medicamento 2 corresponde à interação
        const nomesMed2 = [
          med2.nomeGenerico || '',
          ...(med2.nomesComerciais || []),
          med2.classeTerapeutica || '',
          med2.subclasse || ''
        ].filter(Boolean);
        const matchInteracao = nomesMed2.some(nome => 
          interacao.medicamento.toLowerCase().includes(nome.toLowerCase()) ||
          nome.toLowerCase().includes(interacao.medicamento.toLowerCase())
        );

        if (matchInteracao) {
          interactions.push({
            med1: med1.nomeGenerico || '',
            med2: med2.nomeGenerico || '',
            gravidade: interacao.gravidade,
            efeito: interacao.efeito,
            conduta: interacao.conduta,
          });
        }
      });
    });
  });

  return interactions;
}

// Exportar para uso
export { medicamentosBase, medicamentosExpanded, antibioticos, analgesicosAines, psicofarmacos, medicamentosDiversos, medicamentosComplementares };
