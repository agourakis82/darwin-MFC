'use client';

import { ChecklistProgress, ChecklistConsulta } from '@/lib/types/checklist';

/**
 * Converte ChecklistProgress em formato texto para inclusão no SOAP
 */
export function checklistProgressToSOAPText(
  checklist: ChecklistConsulta,
  progress: ChecklistProgress
): string {
  let text = `\n=== CHECKLIST DE CONSULTA: ${checklist.titulo} ===\n\n`;

  // Converter itensCompletados para Set se necessário
  const completadosSet = progress.itensCompletados instanceof Set 
    ? progress.itensCompletados 
    : new Set(progress.itensCompletados);

  // Agrupar itens por categoria
  const itensPorCategoria: Record<string, typeof checklist.itens> = {};
  checklist.itens.forEach(item => {
    if (!itensPorCategoria[item.categoria]) {
      itensPorCategoria[item.categoria] = [];
    }
    itensPorCategoria[item.categoria].push(item);
  });

  // Renderizar por categoria
  Object.entries(itensPorCategoria).forEach(([categoria, itens]) => {
    const categoriaLabel = getCategoriaLabel(categoria);
    text += `${categoriaLabel.toUpperCase()}:\n`;

    itens.forEach(item => {
      const isCompleted = completadosSet.has(item.id);
      const observacao = progress.observacoes?.[item.id];

      text += `  ${isCompleted ? '[✓]' : '[ ]'} ${item.titulo}`;
      if (item.descricao) {
        text += ` - ${item.descricao}`;
      }
      text += '\n';

      // Subitens
      if (item.subitens) {
        item.subitens.forEach(subitem => {
          const subCompleted = completadosSet.has(subitem.id);
          const subObservacao = progress.observacoes?.[subitem.id];
          text += `    ${subCompleted ? '[✓]' : '[ ]'} ${subitem.titulo}\n`;
          if (subObservacao) {
            text += `      Obs: ${subObservacao}\n`;
          }
        });
      }

      if (observacao) {
        text += `      Obs: ${observacao}\n`;
      }
    });

    text += '\n';
  });

  return text;
}

function getCategoriaLabel(categoria: string): string {
  const labels: Record<string, string> = {
    'anamnese': 'ANAMNESE',
    'exame_fisico': 'EXAME FÍSICO',
    'exames_complementares': 'EXAMES COMPLEMENTARES',
    'diagnostico': 'DIAGNÓSTICO',
    'tratamento': 'TRATAMENTO',
    'orientacoes': 'ORIENTAÇÕES',
    'encaminhamento': 'ENCAMINHAMENTO',
    'prevencao': 'PREVENÇÃO/ACOMPANHAMENTO',
  };
  return labels[categoria] || categoria.toUpperCase();
}

/**
 * Gera resumo do checklist para SOAP (versão resumida)
 */
export function checklistProgressToSOAPResumo(
  checklist: ChecklistConsulta,
  progress: ChecklistProgress
): string {
  const completadosSet = progress.itensCompletados instanceof Set 
    ? progress.itensCompletados 
    : new Set(progress.itensCompletados || []);
    
  const totalItens = checklist.itens.length;
  const completados = completadosSet.size;
  const porcentagem = totalItens > 0 ? Math.round((completados / totalItens) * 100) : 0;

  let text = `Checklist ${checklist.titulo}: ${completados}/${totalItens} itens completados (${porcentagem}%)\n`;
    
  // Itens obrigatórios não completados
  const obrigatoriosNaoCompletados = checklist.itens.filter(
    item => item.obrigatorio && !completadosSet.has(item.id)
  );

  if (obrigatoriosNaoCompletados.length > 0) {
    text += `Atenção: ${obrigatoriosNaoCompletados.length} item(ns) obrigatório(s) pendente(s):\n`;
    obrigatoriosNaoCompletados.forEach(item => {
      text += `  - ${item.titulo}\n`;
    });
  }

  return text;
}

