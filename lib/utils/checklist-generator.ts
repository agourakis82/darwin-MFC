/**
 * GERADOR DE CHECKLIST DE CONSULTA - DARWIN-MFC
 * ==============================================
 * 
 * Gera checklists automáticos baseados em dados de doenças
 */

import { Doenca } from '../types/doenca';
import { ChecklistConsulta, ChecklistItem } from '../types/checklist';

export function generateChecklistFromDoenca(doenca: Doenca): ChecklistConsulta {
  const itens: ChecklistItem[] = [];
  let ordem = 1;

  // ANAMNESE
  if (doenca.quickView?.criteriosDiagnosticos) {
    itens.push({
      id: 'anamnese-quadro-clinico',
      titulo: 'Quadro Clínico',
      descricao: 'Avaliar sintomas e história da doença atual',
      categoria: 'anamnese',
      obrigatorio: true,
      ordem: ordem++,
      subitens: doenca.quickView.criteriosDiagnosticos.slice(0, 5).map((criterio, idx) => ({
        id: `anamnese-criterio-${idx}`,
        titulo: criterio,
        categoria: 'anamnese' as const,
        obrigatorio: false,
        ordem: idx + 1,
      })),
    });
  }

  // EXAME FÍSICO
  if (doenca.quickView?.redFlags && doenca.quickView.redFlags.length > 0) {
    itens.push({
      id: 'exame-fisico-geral',
      titulo: 'Exame Físico',
      descricao: 'Avaliar sinais físicos e red flags',
      categoria: 'exame_fisico',
      obrigatorio: true,
      ordem: ordem++,
      subitens: [
        {
          id: 'exame-geral',
          titulo: 'Exame físico geral (inspeção, palpação, percussão, ausculta conforme região)',
          categoria: 'exame_fisico' as const,
          obrigatorio: true,
          ordem: 1,
        },
        ...doenca.quickView.redFlags.map((flag, idx) => ({
          id: `exame-redflag-${idx}`,
          titulo: `Avaliar: ${flag}`,
          descricao: 'Red flag - requer atenção especial',
          categoria: 'exame_fisico' as const,
          obrigatorio: true,
          ordem: idx + 2,
        })),
      ],
    });
  }

  // EXAMES COMPLEMENTARES
  if (doenca.quickView?.examesIniciais && doenca.quickView.examesIniciais.length > 0) {
    itens.push({
      id: 'exames-complementares',
      titulo: 'Exames Complementares',
      descricao: 'Solicitar exames iniciais conforme indicação',
      categoria: 'exames_complementares',
      obrigatorio: false,
      ordem: ordem++,
      subitens: doenca.quickView.examesIniciais.map((exame, idx) => ({
        id: `exame-${idx}`,
        titulo: exame,
        categoria: 'exames_complementares' as const,
        obrigatorio: false,
        ordem: idx + 1,
      })),
    });
  } else {
    // Checklist genérico de exames
    itens.push({
      id: 'exames-complementares',
      titulo: 'Exames Complementares',
      descricao: 'Solicitar exames conforme necessidade clínica',
      categoria: 'exames_complementares',
      obrigatorio: false,
      ordem: ordem++,
    });
  }

  // DIAGNÓSTICO
  itens.push({
    id: 'diagnostico',
    titulo: 'Confirmar Diagnóstico',
    descricao: 'Estabelecer diagnóstico baseado em critérios',
    categoria: 'diagnostico',
    obrigatorio: true,
    ordem: ordem++,
    subitens: [
      {
        id: 'diagnostico-criterios',
        titulo: 'Critérios diagnósticos atendidos',
        categoria: 'diagnostico' as const,
        obrigatorio: true,
        ordem: 1,
      },
      {
        id: 'diagnostico-diferencial',
        titulo: 'Diagnóstico diferencial considerado',
        categoria: 'diagnostico' as const,
        obrigatorio: false,
        ordem: 2,
      },
      {
        id: 'diagnostico-codificacao',
        titulo: 'Codificação (CIAP-2 / CID-10)',
        categoria: 'diagnostico' as const,
        obrigatorio: true,
        ordem: 3,
      },
    ],
  });

  // TRATAMENTO
  if (doenca.quickView?.tratamentoPrimeiraLinha) {
    const tratamento = doenca.quickView.tratamentoPrimeiraLinha;
    const subitens: ChecklistItem[] = [];

    if (tratamento.naoFarmacologico && tratamento.naoFarmacologico.length > 0) {
      subitens.push({
        id: 'tratamento-nao-farmacologico',
        titulo: 'Tratamento Não Farmacológico',
        categoria: 'tratamento' as const,
        obrigatorio: true,
        ordem: subitens.length + 1,
        subitens: tratamento.naoFarmacologico.map((item, idx) => ({
          id: `nao-farm-${idx}`,
          titulo: item,
          categoria: 'tratamento' as const,
          obrigatorio: false,
          ordem: idx + 1,
        })),
      });
    }

    if (tratamento.farmacologico && tratamento.farmacologico.length > 0) {
      subitens.push({
        id: 'tratamento-farmacologico',
        titulo: 'Tratamento Farmacológico',
        categoria: 'tratamento' as const,
        obrigatorio: tratamento.farmacologico.length > 0,
        ordem: subitens.length + 1,
        subitens: tratamento.farmacologico.map((item, idx) => ({
          id: `farm-${idx}`,
          titulo: item,
          categoria: 'tratamento' as const,
          obrigatorio: true,
          ordem: idx + 1,
        })),
      });
    }

    itens.push({
      id: 'tratamento',
      titulo: 'Prescrever Tratamento',
      descricao: 'Iniciar tratamento de primeira linha',
      categoria: 'tratamento',
      obrigatorio: true,
      ordem: ordem++,
      subitens,
    });
  }

  // ORIENTAÇÕES
  itens.push({
    id: 'orientacoes',
    titulo: 'Orientações ao Paciente',
    descricao: 'Fornecer orientações adequadas',
    categoria: 'orientacoes',
    obrigatorio: true,
    ordem: ordem++,
    subitens: [
      {
        id: 'orientacoes-doenca',
        titulo: 'Orientações sobre a doença e evolução esperada',
        categoria: 'orientacoes' as const,
        obrigatorio: true,
        ordem: 1,
      },
      {
        id: 'orientacoes-tratamento',
        titulo: 'Orientações sobre tratamento e adesão',
        categoria: 'orientacoes' as const,
        obrigatorio: true,
        ordem: 2,
      },
      {
        id: 'orientacoes-sinais-alerta',
        titulo: 'Sinais de alerta e quando retornar',
        categoria: 'orientacoes' as const,
        obrigatorio: true,
        ordem: 3,
      },
    ],
  });

  // ACOMPANHAMENTO
  itens.push({
    id: 'acompanhamento',
    titulo: 'Acompanhamento',
    descricao: 'Agendar retorno e definir seguimento',
    categoria: 'prevencao',
    obrigatorio: true,
    ordem: ordem++,
    subitens: [
      {
        id: 'acompanhamento-retorno',
        titulo: 'Agendar retorno',
        categoria: 'prevencao' as const,
        obrigatorio: true,
        ordem: 1,
      },
      {
        id: 'acompanhamento-avaliacao',
        titulo: 'Avaliar necessidade de encaminhamento',
        categoria: 'prevencao' as const,
        obrigatorio: false,
        ordem: 2,
      },
    ],
  });

  return {
    id: `checklist-${doenca.id}`,
    doencaId: doenca.id,
    titulo: `Checklist de Consulta: ${doenca.titulo}`,
    descricao: `Checklist estruturado para consulta de ${doenca.titulo} na Atenção Primária`,
    itens,
    versao: '1.0',
    lastUpdate: doenca.lastUpdate || '2024-12',
    citations: doenca.citations || [],
  };
}

