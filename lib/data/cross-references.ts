/**
 * CROSS-REFERENCES ENGINE - DARWIN-MFC
 * =====================================
 * 
 * Sistema de referências cruzadas bidirecional entre:
 * - Doenças ↔ Medicamentos
 * - Doenças ↔ Protocolos
 * - Doenças ↔ Calculadoras
 * - Doenças ↔ Rastreamentos
 */

import { doencas } from './doencas';
import { medicamentos } from './medicamentos';
import { protocolos } from './protocolos';

// =============================================================================
// TIPOS
// =============================================================================

export interface MedicamentoReference {
  medicamentoId: string;
  nomeGenerico: string;
  tipoUso: 'primeira_linha' | 'segunda_linha' | 'alternativa' | 'adjuvante';
  posologiaResumida?: string;
  indicacaoEspecifica?: string;
  disponivelSUS: boolean;
}

export interface ProtocoloReference {
  protocoloId: string;
  titulo: string;
  tipoProtocolo: string;
  descricaoBreve?: string;
}

export interface CalculadoraReference {
  calculadoraId: string;
  nome: string;
  descricaoBreve: string;
  prioritaria?: boolean;
}

export interface RastreamentoReference {
  rastreamentoId: string;
  titulo: string;
  populacaoAlvo: string;
}

export interface QuickAction {
  id: string;
  tipo: 'prescricao' | 'orientacao' | 'solicitacao' | 'atestado';
  titulo: string;
  conteudo: string;
}

export interface ContextualSuggestion {
  tipo: 'calculadora' | 'protocolo' | 'rastreamento' | 'medicamento';
  id: string;
  titulo: string;
  motivo: string;
  prioridade: 'alta' | 'media' | 'baixa';
}

// =============================================================================
// MAPEAMENTOS ESTÁTICOS (para expandir conforme dados crescem)
// =============================================================================

const doencaMedicamentoMap: Record<string, MedicamentoReference[]> = {
  'hipertensao-arterial': [
    { medicamentoId: 'losartana', nomeGenerico: 'Losartana', tipoUso: 'primeira_linha', posologiaResumida: '50mg 1x/dia', disponivelSUS: true },
    { medicamentoId: 'enalapril', nomeGenerico: 'Enalapril', tipoUso: 'primeira_linha', posologiaResumida: '10mg 12/12h', disponivelSUS: true },
    { medicamentoId: 'anlodipino', nomeGenerico: 'Anlodipino', tipoUso: 'primeira_linha', posologiaResumida: '5mg 1x/dia', disponivelSUS: true },
    { medicamentoId: 'hidroclorotiazida', nomeGenerico: 'Hidroclorotiazida', tipoUso: 'primeira_linha', posologiaResumida: '25mg 1x/dia', disponivelSUS: true },
    { medicamentoId: 'atenolol', nomeGenerico: 'Atenolol', tipoUso: 'segunda_linha', posologiaResumida: '50mg 1x/dia', disponivelSUS: true },
  ],
  'diabetes-mellitus-2': [
    { medicamentoId: 'metformina', nomeGenerico: 'Metformina', tipoUso: 'primeira_linha', posologiaResumida: '850mg 2-3x/dia', disponivelSUS: true },
    { medicamentoId: 'gliclazida', nomeGenerico: 'Gliclazida', tipoUso: 'segunda_linha', posologiaResumida: '30-120mg 1x/dia', disponivelSUS: true },
    { medicamentoId: 'insulina-nph', nomeGenerico: 'Insulina NPH', tipoUso: 'alternativa', posologiaResumida: '10UI ao deitar', disponivelSUS: true },
  ],
  'depressao': [
    { medicamentoId: 'fluoxetina', nomeGenerico: 'Fluoxetina', tipoUso: 'primeira_linha', posologiaResumida: '20mg 1x/dia', disponivelSUS: true },
    { medicamentoId: 'sertralina', nomeGenerico: 'Sertralina', tipoUso: 'primeira_linha', posologiaResumida: '50mg 1x/dia', disponivelSUS: true },
    { medicamentoId: 'amitriptilina', nomeGenerico: 'Amitriptilina', tipoUso: 'segunda_linha', posologiaResumida: '25mg à noite', disponivelSUS: true },
  ],
  'ansiedade': [
    { medicamentoId: 'fluoxetina', nomeGenerico: 'Fluoxetina', tipoUso: 'primeira_linha', posologiaResumida: '20mg 1x/dia', disponivelSUS: true },
    { medicamentoId: 'sertralina', nomeGenerico: 'Sertralina', tipoUso: 'primeira_linha', posologiaResumida: '50mg 1x/dia', disponivelSUS: true },
  ],
  'asma': [
    { medicamentoId: 'salbutamol', nomeGenerico: 'Salbutamol', tipoUso: 'primeira_linha', posologiaResumida: '2-4 jatos SOS', indicacaoEspecifica: 'Resgate', disponivelSUS: true },
    { medicamentoId: 'beclometasona', nomeGenerico: 'Beclometasona', tipoUso: 'primeira_linha', posologiaResumida: '100-400mcg/dia', indicacaoEspecifica: 'Manutenção', disponivelSUS: true },
  ],
  'infeccao-urinaria': [
    { medicamentoId: 'nitrofurantoina', nomeGenerico: 'Nitrofurantoína', tipoUso: 'primeira_linha', posologiaResumida: '100mg 6/6h x5d', disponivelSUS: true },
    { medicamentoId: 'sulfametoxazol-trimetoprima', nomeGenerico: 'SMZ/TMP', tipoUso: 'alternativa', posologiaResumida: '800/160mg 12/12h x3d', disponivelSUS: true },
  ],
  'lombalgia': [
    { medicamentoId: 'paracetamol', nomeGenerico: 'Paracetamol', tipoUso: 'primeira_linha', posologiaResumida: '500-1000mg 6/6h', disponivelSUS: true },
    { medicamentoId: 'dipirona', nomeGenerico: 'Dipirona', tipoUso: 'primeira_linha', posologiaResumida: '500-1000mg 6/6h', disponivelSUS: true },
    { medicamentoId: 'ibuprofeno', nomeGenerico: 'Ibuprofeno', tipoUso: 'alternativa', posologiaResumida: '400mg 8/8h x5-7d', disponivelSUS: true },
  ],
  'cefaleia-tensional': [
    { medicamentoId: 'paracetamol', nomeGenerico: 'Paracetamol', tipoUso: 'primeira_linha', posologiaResumida: '500-1000mg', disponivelSUS: true },
    { medicamentoId: 'ibuprofeno', nomeGenerico: 'Ibuprofeno', tipoUso: 'primeira_linha', posologiaResumida: '400-600mg', disponivelSUS: true },
    { medicamentoId: 'amitriptilina', nomeGenerico: 'Amitriptilina', tipoUso: 'adjuvante', posologiaResumida: '10-25mg à noite', indicacaoEspecifica: 'Profilaxia se >15 dias/mês', disponivelSUS: true },
  ],
  'enxaqueca': [
    { medicamentoId: 'ibuprofeno', nomeGenerico: 'Ibuprofeno', tipoUso: 'primeira_linha', posologiaResumida: '400-600mg', disponivelSUS: true },
    { medicamentoId: 'amitriptilina', nomeGenerico: 'Amitriptilina', tipoUso: 'adjuvante', posologiaResumida: '10-25mg à noite', indicacaoEspecifica: 'Profilaxia se ≥4 crises/mês', disponivelSUS: true },
    { medicamentoId: 'propranolol', nomeGenerico: 'Propranolol', tipoUso: 'adjuvante', posologiaResumida: '40-80mg 2x/dia', indicacaoEspecifica: 'Profilaxia alternativa', disponivelSUS: true },
  ],
  'hipotireoidismo': [
    { medicamentoId: 'levotiroxina', nomeGenerico: 'Levotiroxina', tipoUso: 'primeira_linha', posologiaResumida: '1,6 mcg/kg/dia em jejum', disponivelSUS: true },
  ],
  'rinite-alergica': [
    { medicamentoId: 'loratadina', nomeGenerico: 'Loratadina', tipoUso: 'primeira_linha', posologiaResumida: '10mg 1x/dia', disponivelSUS: true },
  ],
  'drge': [
    { medicamentoId: 'omeprazol', nomeGenerico: 'Omeprazol', tipoUso: 'primeira_linha', posologiaResumida: '20mg 1x/dia em jejum', disponivelSUS: true },
  ],
  'dislipidemia': [
    { medicamentoId: 'sinvastatina', nomeGenerico: 'Sinvastatina', tipoUso: 'primeira_linha', posologiaResumida: '20-40mg à noite', disponivelSUS: true },
    { medicamentoId: 'atorvastatina', nomeGenerico: 'Atorvastatina', tipoUso: 'primeira_linha', posologiaResumida: '10-40mg/dia', disponivelSUS: true },
  ],
  'pneumonia': [
    { medicamentoId: 'amoxicilina', nomeGenerico: 'Amoxicilina', tipoUso: 'primeira_linha', posologiaResumida: '500mg 8/8h x7d', indicacaoEspecifica: 'PAC leve/moderada', disponivelSUS: true },
    { medicamentoId: 'azitromicina', nomeGenerico: 'Azitromicina', tipoUso: 'alternativa', posologiaResumida: '500mg 1x/dia x3-5d', indicacaoEspecifica: 'Alérgico a penicilina ou PAC atípica', disponivelSUS: true },
  ],
};

const doencaProtocoloMap: Record<string, ProtocoloReference[]> = {
  'hipertensao-arterial': [
    { protocoloId: 'has-tratamento', titulo: 'Tratamento de HAS', tipoProtocolo: 'tratamento', descricaoBreve: 'Escolha e escalonamento de anti-hipertensivos' },
    { protocoloId: 'has-diagnostico', titulo: 'Diagnóstico de HAS', tipoProtocolo: 'diagnostico', descricaoBreve: 'Confirmação diagnóstica e estratificação' },
  ],
  'diabetes-mellitus-2': [
    { protocoloId: 'dm2-tratamento', titulo: 'Tratamento do DM2', tipoProtocolo: 'tratamento', descricaoBreve: 'Escalonamento terapêutico do DM2' },
  ],
  'asma': [
    { protocoloId: 'asma-gina', titulo: 'Classificação e Tratamento GINA', tipoProtocolo: 'tratamento', descricaoBreve: 'Steps 1-5 do GINA 2024' },
  ],
  'lombalgia': [
    { protocoloId: 'dor-lombar', titulo: 'Manejo da Dor Lombar', tipoProtocolo: 'tratamento', descricaoBreve: 'Avaliação e tratamento da lombalgia aguda' },
  ],
  'cefaleia-tensional': [
    { protocoloId: 'cefaleia-alarme', titulo: 'Cefaleia - Sinais de Alarme (SNOOP)', tipoProtocolo: 'diagnostico', descricaoBreve: 'Identificação de cefaleias secundárias' },
  ],
  'enxaqueca': [
    { protocoloId: 'cefaleia-alarme', titulo: 'Cefaleia - Sinais de Alarme (SNOOP)', tipoProtocolo: 'diagnostico', descricaoBreve: 'Identificação de cefaleias secundárias' },
  ],
  'infeccao-urinaria': [
    { protocoloId: 'itu-mulheres', titulo: 'ITU não complicada em mulheres', tipoProtocolo: 'tratamento', descricaoBreve: 'Diagnóstico e tratamento empírico' },
  ],
};

const doencaCalculadoraMap: Record<string, CalculadoraReference[]> = {
  'hipertensao-arterial': [
    { calculadoraId: 'risco-cv', nome: 'Escore de Risco CV Global', descricaoBreve: 'Framingham ou ACC/AHA', prioritaria: true },
    { calculadoraId: 'ckd-epi', nome: 'CKD-EPI (TFG)', descricaoBreve: 'Função renal', prioritaria: true },
    { calculadoraId: 'imc', nome: 'IMC', descricaoBreve: 'Índice de massa corporal' },
  ],
  'diabetes-mellitus-2': [
    { calculadoraId: 'ckd-epi', nome: 'CKD-EPI (TFG)', descricaoBreve: 'Função renal para ajuste de medicamentos', prioritaria: true },
    { calculadoraId: 'risco-cv', nome: 'Escore de Risco CV', descricaoBreve: 'Classificação de risco' },
    { calculadoraId: 'imc', nome: 'IMC', descricaoBreve: 'Avaliação de peso' },
  ],
  'depressao': [
    { calculadoraId: 'phq-9', nome: 'PHQ-9', descricaoBreve: 'Gravidade da depressão', prioritaria: true },
  ],
  'ansiedade': [
    { calculadoraId: 'gad-7', nome: 'GAD-7', descricaoBreve: 'Gravidade da ansiedade', prioritaria: true },
  ],
  'asma': [],
  'lombalgia': [
    { calculadoraId: 'start-back', nome: 'STarT Back', descricaoBreve: 'Estratificação de risco lombalgia' },
  ],
  'infeccao-urinaria': [
    { calculadoraId: 'ckd-epi', nome: 'CKD-EPI (TFG)', descricaoBreve: 'Ajuste de dose de antibióticos' },
  ],
};

const doencaRastreamentoMap: Record<string, RastreamentoReference[]> = {
  'diabetes-mellitus-2': [
    { rastreamentoId: 'dm2', titulo: 'Rastreamento de DM2', populacaoAlvo: 'Adultos com fatores de risco' },
  ],
  'hipertensao-arterial': [
    { rastreamentoId: 'has', titulo: 'Rastreamento de HAS', populacaoAlvo: 'Adultos ≥18 anos' },
  ],
  'dislipidemia': [
    { rastreamentoId: 'dislipidemia', titulo: 'Rastreamento de Dislipidemia', populacaoAlvo: 'Adultos' },
  ],
  'depressao': [
    { rastreamentoId: 'depressao', titulo: 'Rastreamento de Depressão', populacaoAlvo: 'Adultos na APS' },
  ],
};

// Quick Actions por doença
const doencaQuickActionsMap: Record<string, QuickAction[]> = {
  'hipertensao-arterial': [
    { id: 'rx-has-mono', tipo: 'prescricao', titulo: 'Prescrição HAS monoterapia', conteudo: 'Losartana 50mg\nUso: 1 comprimido via oral pela manhã\nQuantidade: 30 comprimidos' },
    { id: 'rx-has-combo', tipo: 'prescricao', titulo: 'Prescrição HAS combinada', conteudo: 'Losartana 50mg + Anlodipino 5mg\nUso: 1 comprimido de cada via oral pela manhã\nQuantidade: 30 comprimidos de cada' },
    { id: 'orientacoes-has', tipo: 'orientacao', titulo: 'Orientações HAS', conteudo: '1. Reduzir consumo de sal (<6g/dia)\n2. Praticar atividade física regular (150min/semana)\n3. Manter peso adequado\n4. Evitar tabagismo e excesso de álcool\n5. Tomar medicação diariamente, mesmo sem sintomas' },
  ],
  'diabetes-mellitus-2': [
    { id: 'rx-dm2-met', tipo: 'prescricao', titulo: 'Prescrição Metformina', conteudo: 'Metformina 850mg\nUso: 1 comprimido via oral no almoço\nApós 1 semana, aumentar para 1cp no almoço e 1cp no jantar\nQuantidade: 60 comprimidos' },
    { id: 'orientacoes-dm2', tipo: 'orientacao', titulo: 'Orientações DM2', conteudo: '1. Alimentação saudável com redução de carboidratos simples\n2. Atividade física regular\n3. Perda de peso de 5-10%\n4. Monitorizar glicemia capilar\n5. Não interromper medicação sem orientação' },
    { id: 'solicitar-dm2', tipo: 'solicitacao', titulo: 'Exames de controle DM2', conteudo: 'Hemoglobina glicada (HbA1c)\nGlicemia de jejum\nCreatinina\nMicroalbuminúria\nPerfil lipídico (CT, HDL, LDL, TG)\nTGO, TGP' },
  ],
  'depressao': [
    { id: 'rx-dep-fluox', tipo: 'prescricao', titulo: 'Prescrição Fluoxetina', conteudo: 'Fluoxetina 20mg\nUso: 1 comprimido via oral pela manhã\nQuantidade: 30 comprimidos\n---\nRetorno em 4 semanas' },
    { id: 'orientacoes-dep', tipo: 'orientacao', titulo: 'Orientações Depressão', conteudo: '1. O efeito do medicamento leva 2-4 semanas para iniciar\n2. Não interrompa o tratamento sem orientação médica\n3. Procure manter rotina de sono e atividade física\n4. Busque apoio de familiares e amigos\n5. Em caso de pensamentos suicidas, procure atendimento imediato' },
  ],
  'lombalgia': [
    { id: 'rx-lomb-analgesia', tipo: 'prescricao', titulo: 'Prescrição Analgesia', conteudo: 'Dipirona 500mg\nUso: 1 comprimido via oral de 6/6 horas se dor\nQuantidade: 20 comprimidos\n---\nParacetamol 750mg (alternativa)\nUso: 1 comprimido via oral de 6/6 horas se dor' },
    { id: 'orientacoes-lomb', tipo: 'orientacao', titulo: 'Orientações Lombalgia', conteudo: '1. EVITE repouso prolongado - mantenha atividades diárias\n2. Aplique calor local por 20 minutos 3x/dia\n3. Alongamentos suaves são benéficos\n4. Evite carregar peso\n5. Retorne se: dor não melhorar em 2 semanas, febre, perda de força ou sensibilidade nas pernas' },
  ],
  'asma': [
    { id: 'rx-asma-resgate', tipo: 'prescricao', titulo: 'Prescrição Resgate Asma', conteudo: 'Salbutamol spray 100mcg\nUso: 2 jatos inalatórios se falta de ar (SOS)\nMáximo: 2 jatos a cada 4 horas\nQuantidade: 1 frasco' },
    { id: 'plano-asma', tipo: 'orientacao', titulo: 'Plano de Ação Asma', conteudo: 'ZONA VERDE (Controlada):\n- Sem sintomas, atividades normais\n- Manter tratamento de manutenção\n\nZONA AMARELA (Atenção):\n- Tosse/chiado/falta de ar\n- Usar 2 jatos de salbutamol, repetir em 20 min se necessário\n- Procurar atendimento se não melhorar\n\nZONA VERMELHA (Emergência):\n- Falta de ar intensa, lábios roxos\n- Usar 4-6 jatos de salbutamol\n- PROCURAR EMERGÊNCIA IMEDIATAMENTE' },
  ],
};

// =============================================================================
// FUNÇÕES DE ACESSO
// =============================================================================

export function getMedicamentosForDoenca(doencaId: string): MedicamentoReference[] {
  return doencaMedicamentoMap[doencaId] || [];
}

export function getProtocolosForDoenca(doencaId: string): ProtocoloReference[] {
  return doencaProtocoloMap[doencaId] || [];
}

export function getCalculadorasForDoenca(doencaId: string): CalculadoraReference[] {
  return doencaCalculadoraMap[doencaId] || [];
}

export function getRastreamentosForDoenca(doencaId: string): RastreamentoReference[] {
  return doencaRastreamentoMap[doencaId] || [];
}

export function getQuickActionsForDoenca(doencaId: string): QuickAction[] {
  return doencaQuickActionsMap[doencaId] || [];
}

export function getContextualSuggestions(doencaId: string): ContextualSuggestion[] {
  const suggestions: ContextualSuggestion[] = [];
  
  // Sugere calculadoras prioritárias
  const calcs = getCalculadorasForDoenca(doencaId);
  calcs.filter(c => c.prioritaria).forEach(c => {
    suggestions.push({
      tipo: 'calculadora',
      id: c.calculadoraId,
      titulo: c.nome,
      motivo: `Recomendado para ${doencaId}`,
      prioridade: 'alta'
    });
  });

  // Sugere protocolos
  const prots = getProtocolosForDoenca(doencaId);
  prots.forEach(p => {
    suggestions.push({
      tipo: 'protocolo',
      id: p.protocoloId,
      titulo: p.titulo,
      motivo: p.descricaoBreve || 'Protocolo relevante',
      prioridade: 'media'
    });
  });

  // Sugere rastreamentos
  const rasts = getRastreamentosForDoenca(doencaId);
  rasts.forEach(r => {
    suggestions.push({
      tipo: 'rastreamento',
      id: r.rastreamentoId,
      titulo: r.titulo,
      motivo: r.populacaoAlvo,
      prioridade: 'baixa'
    });
  });

  return suggestions.slice(0, 5);
}

// =============================================================================
// REFERÊNCIAS INVERSAS (do medicamento/protocolo para doenças)
// =============================================================================

export function getDoencasForMedicamento(medicamentoId: string): string[] {
  const doencaIds: string[] = [];
  
  for (const [doencaId, meds] of Object.entries(doencaMedicamentoMap)) {
    if (meds.some(m => m.medicamentoId === medicamentoId)) {
      doencaIds.push(doencaId);
    }
  }
  
  return doencaIds;
}

export function getDoencasForProtocolo(protocoloId: string): string[] {
  const doencaIds: string[] = [];
  
  for (const [doencaId, prots] of Object.entries(doencaProtocoloMap)) {
    if (prots.some(p => p.protocoloId === protocoloId)) {
      doencaIds.push(doencaId);
    }
  }
  
  return doencaIds;
}

// =============================================================================
// UTILITÁRIOS
// =============================================================================

export function getAllCrossReferencesForDoenca(doencaId: string) {
  return {
    medicamentos: getMedicamentosForDoenca(doencaId),
    protocolos: getProtocolosForDoenca(doencaId),
    calculadoras: getCalculadorasForDoenca(doencaId),
    rastreamentos: getRastreamentosForDoenca(doencaId),
    quickActions: getQuickActionsForDoenca(doencaId),
    suggestions: getContextualSuggestions(doencaId),
  };
}
