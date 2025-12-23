/**
 * CONSOLIDAÇÃO DE MEDICAMENTOS - DARWIN-MFC
 * ==========================================
 *
 * Este arquivo consolida todos os medicamentos de todas as categorias.
 * Total alvo: 600+ medicamentos (Sprint 1 Target)
 * Inclui: antibióticos, cardiovasculares, metabólicos, endócrinos, psicofármacos, etc.
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
import { medicamentosAntibioticosExpansao } from './expansao-antibioticos';
import { medicamentosCardiovascularesCompleto } from './expansao-cardiovascular-completo';
import { medicamentosMetabolicoEndocrino } from './expansao-metabolico-endocrino';
import { medicamentosRespiratorios } from './expansao-respiratorio';
import { medicamentosNeuropsiquiatricos } from './expansao-neuropsiquiatrico';
import { medicamentosGastrointestinais } from './expansao-gastrointestinal';
import { medicamentosDermatologicos } from './expansao-dermatologico';
import { medicamentosOftalmologicos } from './expansao-oftalmologico';
import { medicamentosUrologicos } from './expansao-urologico';
import { medicamentosMusculoesqueleticos } from './expansao-musculoesqueletico';
import { medicamentosPediatricos } from './expansao-pediatrico';
import { medicamentosGinecologia } from './expansao-ginecologia';
import { medicamentosHematologia } from './expansao-hematologia';
import { medicamentosAntivirais } from './expansao-antivirais';
import { medicamentosEmergencia } from './expansao-emergencia';
import { medicamentosOtorrino } from './expansao-otorrino';
import { medicamentosOncologiaSuporte } from './expansao-oncologia-suporte';
import { medicamentosReumatologia } from './expansao-reumatologia';
import { medicamentosPsiquiatriaAdicional } from './expansao-psiquiatria-adicional';
import { medicamentosEndocrinoAdicional } from './expansao-endocrino-adicional';
import { medicamentosDermatologiaAdicional } from './expansao-dermatologia-adicional';
import { medicamentosDiversosFinal } from './expansao-diversos-final';
import { medicamentosAntibioticosFinais } from './expansao-antibioticos-final';
import { medicamentosCardiovascularesFinais } from './expansao-cardiovascular-final';
import { medicamentosComplementoFinal } from './expansao-final-complementar';
import { medicamentos600Final } from './expansao-600-final';
import { medicamentosTarget600 } from './expansao-target-600';
import { medicamentosFinalBatch } from './expansao-final-batch';
import { medicamentos600Complete } from './expansao-600-complete';
import { medicamentosFinal12 } from './expansao-final-12';
import { medicamentos600Ultimo } from './expansao-600-ultimo';
import { medicamentos600FinalBatch } from './expansao-600-final-batch';

// Consolidar todos os medicamentos
// Filtrar apenas medicamentos completos (com campos obrigatórios)
const isMedicamentoCompleto = (med: Partial<Medicamento>): med is Medicamento =>
  med.id !== undefined &&
  med.nomeGenerico !== undefined &&
  med.classeTerapeutica !== undefined;

const expandedCompletos = medicamentosExpanded.filter(isMedicamentoCompleto);
const antibioticosExpansaoCompletos = medicamentosAntibioticosExpansao.filter(isMedicamentoCompleto);
const cardiovascularesCompletos = medicamentosCardiovascularesCompleto.filter(isMedicamentoCompleto);
const metabolicoEndocrinoCompletos = medicamentosMetabolicoEndocrino.filter(isMedicamentoCompleto);
const respiratoriosCompletos = medicamentosRespiratorios.filter(isMedicamentoCompleto);
const neuropsiquiatricosCompletos = medicamentosNeuropsiquiatricos.filter(isMedicamentoCompleto);
const gastrointestinaisCompletos = medicamentosGastrointestinais.filter(isMedicamentoCompleto);
const dermatologicosCompletos = medicamentosDermatologicos.filter(isMedicamentoCompleto);
const oftalmologicosCompletos = medicamentosOftalmologicos.filter(isMedicamentoCompleto);
const urologicosCompletos = medicamentosUrologicos.filter(isMedicamentoCompleto);
const musculoesqueleticosCompletos = medicamentosMusculoesqueleticos.filter(isMedicamentoCompleto);
const pediatricosCompletos = medicamentosPediatricos.filter(isMedicamentoCompleto);
const ginecologiaCompletos = medicamentosGinecologia.filter(isMedicamentoCompleto);
const hematologiaCompletos = medicamentosHematologia.filter(isMedicamentoCompleto);
const antiviraisCompletos = medicamentosAntivirais.filter(isMedicamentoCompleto);
const emergenciaCompletos = medicamentosEmergencia.filter(isMedicamentoCompleto);
const otorrinoCompletos = medicamentosOtorrino.filter(isMedicamentoCompleto);
const oncologiaSuporteCompletos = medicamentosOncologiaSuporte.filter(isMedicamentoCompleto);
const reumatologiaCompletos = medicamentosReumatologia.filter(isMedicamentoCompleto);
const psiquiatriaAdicionalCompletos = medicamentosPsiquiatriaAdicional.filter(isMedicamentoCompleto);
const endocrinoAdicionalCompletos = medicamentosEndocrinoAdicional.filter(isMedicamentoCompleto);
const dermatologiaAdicionalCompletos = medicamentosDermatologiaAdicional.filter(isMedicamentoCompleto);
const diversosFinalCompletos = medicamentosDiversosFinal.filter(isMedicamentoCompleto);
const antibioticosFinaisCompletos = medicamentosAntibioticosFinais.filter(isMedicamentoCompleto);
const cardiovascularesFinaisCompletos = medicamentosCardiovascularesFinais.filter(isMedicamentoCompleto);
const complementoFinalCompletos = medicamentosComplementoFinal.filter(isMedicamentoCompleto);
const medicamentos600Completos = medicamentos600Final.filter(isMedicamentoCompleto);
const medicamentosTarget600Completos = medicamentosTarget600.filter(isMedicamentoCompleto);
const medicamentosFinalBatchCompletos = medicamentosFinalBatch.filter(isMedicamentoCompleto);
const medicamentos600CompleteFiltered = medicamentos600Complete.filter(isMedicamentoCompleto);
const medicamentosFinal12Filtered = medicamentosFinal12.filter(isMedicamentoCompleto);
const medicamentos600UltimoFiltered = medicamentos600Ultimo.filter(isMedicamentoCompleto);
const medicamentos600FinalBatchFiltered = medicamentos600FinalBatch.filter(isMedicamentoCompleto);

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
  ...antibioticosExpansaoCompletos,
  ...cardiovascularesCompletos,
  ...metabolicoEndocrinoCompletos,
  ...respiratoriosCompletos,
  ...neuropsiquiatricosCompletos,
  ...gastrointestinaisCompletos,
  ...dermatologicosCompletos,
  ...oftalmologicosCompletos,
  ...urologicosCompletos,
  ...musculoesqueleticosCompletos,
  ...pediatricosCompletos,
  ...ginecologiaCompletos,
  ...hematologiaCompletos,
  ...antiviraisCompletos,
  ...emergenciaCompletos,
  ...otorrinoCompletos,
  ...oncologiaSuporteCompletos,
  ...reumatologiaCompletos,
  ...psiquiatriaAdicionalCompletos,
  ...endocrinoAdicionalCompletos,
  ...dermatologiaAdicionalCompletos,
  ...diversosFinalCompletos,
  ...antibioticosFinaisCompletos,
  ...cardiovascularesFinaisCompletos,
  ...complementoFinalCompletos,
  ...medicamentos600Completos,
  ...medicamentosTarget600Completos,
  ...medicamentosFinalBatchCompletos,
  ...medicamentos600CompleteFiltered,
  ...medicamentosFinal12Filtered,
  ...medicamentos600UltimoFiltered,
  ...medicamentos600FinalBatchFiltered,
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
