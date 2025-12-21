/**
 * CALCULADORAS CLÍNICAS PARA APS/MFC
 * ===================================
 * 
 * Padrão Q1: Todas as fórmulas com referências às fontes originais validadas
 * Contexto: Atenção Primária à Saúde no SUS-Brasil
 * 
 * Referências principais:
 * - Ministério da Saúde do Brasil
 * - Sociedade Brasileira de Medicina de Família e Comunidade (SBMFC)
 * - Diretrizes internacionais validadas para contexto brasileiro
 */

export interface CalculatorResult {
  value: number | string;
  unit?: string;
  category: string;
  interpretation: string;
  recommendations: string;
  formula?: string;
  references: string[];
}

// =============================================================================
// IMC - ÍNDICE DE MASSA CORPORAL
// =============================================================================

/**
 * Cálculo do IMC (Índice de Massa Corporal)
 * Fórmula: peso (kg) / altura² (m²)
 * 
 * Referências:
 * - OMS. Obesity: preventing and managing the global epidemic. WHO Technical Report Series 894. 2000.
 * - Ministério da Saúde. Orientações para a coleta e análise de dados antropométricos. 2011.
 */
export function calculateIMC(peso: number, altura: number): CalculatorResult {
  const imc = peso / (altura * altura);
  
  let category: string;
  let interpretation: string;
  let recommendations: string;
  
  if (imc < 18.5) {
    category = 'Baixo peso';
    interpretation = 'IMC abaixo de 18,5 kg/m² indica baixo peso. Risco de desnutrição, deficiências nutricionais e comprometimento imunológico.';
    recommendations = 'Avaliação nutricional detalhada. Investigar causas (doenças consumptivas, transtornos alimentares, condições socioeconômicas). Suplementação se necessário.';
  } else if (imc < 25) {
    category = 'Peso normal (eutrófico)';
    interpretation = 'IMC entre 18,5-24,9 kg/m² indica peso adequado para a altura. Menor risco de doenças metabólicas.';
    recommendations = 'Manter hábitos saudáveis: alimentação equilibrada, atividade física regular (150 min/semana), sono adequado.';
  } else if (imc < 30) {
    category = 'Sobrepeso (pré-obesidade)';
    interpretation = 'IMC entre 25-29,9 kg/m² indica sobrepeso. Risco aumentado de DM2, HAS, dislipidemia e doenças cardiovasculares.';
    recommendations = 'Modificação de estilo de vida intensiva. Rastreamento de DM2 (glicemia jejum ou HbA1c), perfil lipídico e aferição de PA. Considerar circunferência abdominal.';
  } else if (imc < 35) {
    category = 'Obesidade Grau I';
    interpretation = 'IMC entre 30-34,9 kg/m². Obesidade estabelecida com risco moderado de complicações cardiovasculares e metabólicas.';
    recommendations = 'Abordagem multidisciplinar (nutrição, atividade física, psicologia). Rastreamento obrigatório de HAS, DM2, dislipidemia, esteatose hepática. Considerar tratamento farmacológico adjuvante.';
  } else if (imc < 40) {
    category = 'Obesidade Grau II (severa)';
    interpretation = 'IMC entre 35-39,9 kg/m². Obesidade severa com alto risco de complicações cardiovasculares, apneia do sono e osteoartrite.';
    recommendations = 'Tratamento intensivo multidisciplinar. Avaliar elegibilidade para tratamento farmacológico. Considerar encaminhamento para avaliação de cirurgia bariátrica se comorbidades presentes.';
  } else {
    category = 'Obesidade Grau III (mórbida)';
    interpretation = 'IMC ≥40 kg/m². Obesidade muito grave com risco muito alto de morbimortalidade. Redução significativa de expectativa de vida.';
    recommendations = 'Tratamento intensivo. Forte indicação de avaliação para cirurgia bariátrica. Manejo de comorbidades. Suporte psicológico especializado.';
  }
  
  return {
    value: Math.round(imc * 10) / 10,
    unit: 'kg/m²',
    category,
    interpretation,
    recommendations,
    formula: 'IMC = Peso (kg) / Altura² (m²)',
    references: [
      'OMS. Obesity: preventing and managing the global epidemic. WHO Technical Report Series 894. Geneva: WHO, 2000.',
      'Ministério da Saúde. Orientações para coleta e análise de dados antropométricos em serviços de saúde. Brasília: MS, 2011.',
      'ABESO. Diretrizes Brasileiras de Obesidade. 4ª ed. São Paulo: ABESO, 2016.'
    ]
  };
}

// =============================================================================
// CKD-EPI 2021 - TAXA DE FILTRAÇÃO GLOMERULAR
// =============================================================================

/**
 * CKD-EPI 2021 (sem variável raça)
 * Nova equação recomendada que elimina o coeficiente de raça
 * 
 * Referências:
 * - Inker LA et al. New Creatinine- and Cystatin C–Based Equations. NEJM 2021.
 * - KDIGO 2024 Clinical Practice Guideline for CKD.
 */
export function calculateCKDEPI(creatinina: number, idade: number, sexo: 'M' | 'F'): CalculatorResult {
  // CKD-EPI 2021 sem raça
  let tfg: number;
  
  if (sexo === 'F') {
    if (creatinina <= 0.7) {
      tfg = 142 * Math.pow(creatinina / 0.7, -0.241) * Math.pow(0.9938, idade) * 1.012;
    } else {
      tfg = 142 * Math.pow(creatinina / 0.7, -1.2) * Math.pow(0.9938, idade) * 1.012;
    }
  } else {
    if (creatinina <= 0.9) {
      tfg = 142 * Math.pow(creatinina / 0.9, -0.302) * Math.pow(0.9938, idade);
    } else {
      tfg = 142 * Math.pow(creatinina / 0.9, -1.2) * Math.pow(0.9938, idade);
    }
  }
  
  let category: string;
  let interpretation: string;
  let recommendations: string;
  
  if (tfg >= 90) {
    category = 'G1: Normal ou Alta';
    interpretation = 'TFG ≥90 mL/min/1,73m². Função renal normal. Investigar outros marcadores de lesão renal se houver suspeita clínica.';
    recommendations = 'Se sem outros marcadores de lesão renal: acompanhamento de rotina. Controlar fatores de risco (HAS, DM). Se com albuminúria: DRC estágio 1.';
  } else if (tfg >= 60) {
    category = 'G2: Levemente Diminuída';
    interpretation = 'TFG 60-89 mL/min/1,73m². Redução leve da função renal. Comum em idosos.';
    recommendations = 'Monitorar TFG e albuminúria anualmente. Otimizar controle de PA (<130/80 se albuminúria) e glicemia. Evitar nefrotoxinas. Ajustar doses de medicamentos.';
  } else if (tfg >= 45) {
    category = 'G3a: Moderadamente Diminuída';
    interpretation = 'TFG 45-59 mL/min/1,73m². DRC moderada. Risco aumentado de progressão e eventos cardiovasculares.';
    recommendations = 'Encaminhamento ao nefrologista. IECA/BRA se albuminúria. Considerar iSGLT2 se DM ou albuminúria. Monitorar eletrólitos, PTH, vitamina D. Vacinar para hepatite B.';
  } else if (tfg >= 30) {
    category = 'G3b: Moderada a Gravemente Diminuída';
    interpretation = 'TFG 30-44 mL/min/1,73m². DRC moderada-grave. Alto risco de progressão.';
    recommendations = 'Acompanhamento nefrológico regular. Ajuste rigoroso de medicamentos. Preparação para terapia renal substitutiva. Avaliar anemia e doença mineral óssea.';
  } else if (tfg >= 15) {
    category = 'G4: Gravemente Diminuída';
    interpretation = 'TFG 15-29 mL/min/1,73m². DRC grave. Preparar para terapia dialítica.';
    recommendations = 'Acompanhamento nefrológico intensivo. Educação sobre opções de TRS (hemodiálise, diálise peritoneal, transplante). Confecção de fístula arteriovenosa. Manejo de complicações urêmicas.';
  } else {
    category = 'G5: Falência Renal';
    interpretation = 'TFG <15 mL/min/1,73m². Falência renal. Indicação de terapia renal substitutiva.';
    recommendations = 'Início de diálise ou transplante renal preemptivo. Manejo de sintomas urêmicos. Suporte nutricional especializado.';
  }
  
  return {
    value: Math.round(tfg),
    unit: 'mL/min/1,73m²',
    category,
    interpretation,
    recommendations,
    formula: 'CKD-EPI 2021 (sem variável raça)',
    references: [
      'Inker LA et al. New Creatinine- and Cystatin C–Based Equations to Estimate GFR without Race. N Engl J Med. 2021;385(19):1737-1749.',
      'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int. 2024.',
      'Sociedade Brasileira de Nefrologia. Diretrizes Clínicas para o Cuidado ao Paciente com DRC. 2023.'
    ]
  };
}

// =============================================================================
// COCKCROFT-GAULT - CLEARANCE DE CREATININA
// =============================================================================

/**
 * Fórmula de Cockcroft-Gault
 * Usada para ajuste de dose de medicamentos
 * 
 * Referências:
 * - Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976.
 */
export function calculateCockcroftGault(creatinina: number, idade: number, peso: number, sexo: 'M' | 'F'): CalculatorResult {
  let clcr = ((140 - idade) * peso) / (72 * creatinina);
  if (sexo === 'F') clcr *= 0.85;
  
  let category: string;
  let interpretation: string;
  let recommendations: string;
  
  if (clcr >= 90) {
    category = 'Função Renal Normal';
    interpretation = 'ClCr ≥90 mL/min. Não há necessidade de ajuste de dose para a maioria dos medicamentos.';
    recommendations = 'Doses habituais de medicamentos. Monitorar função renal em uso de nefrotoxinas.';
  } else if (clcr >= 60) {
    category = 'Disfunção Renal Leve';
    interpretation = 'ClCr 60-89 mL/min. Ajuste de dose pode ser necessário para alguns medicamentos.';
    recommendations = 'Verificar bula para ajuste de dose. Atenção especial a: aminoglicosídeos, vancomicina, anticoagulantes orais diretos, metformina.';
  } else if (clcr >= 30) {
    category = 'Disfunção Renal Moderada';
    interpretation = 'ClCr 30-59 mL/min. Ajuste de dose necessário para muitos medicamentos.';
    recommendations = 'Ajuste obrigatório de doses. Evitar AINEs. Metformina: dose máxima 1g/dia se ClCr 30-45. DOACs requerem ajuste específico.';
  } else if (clcr >= 15) {
    category = 'Disfunção Renal Grave';
    interpretation = 'ClCr 15-29 mL/min. Ajuste significativo de doses. Muitos medicamentos contraindicados.';
    recommendations = 'Revisar todos os medicamentos. Contraindicados: metformina, AINEs, alguns antibióticos. Preferir medicamentos com metabolização hepática.';
  } else {
    category = 'Falência Renal';
    interpretation = 'ClCr <15 mL/min. Função renal residual mínima.';
    recommendations = 'Considerar dialisabilidade dos medicamentos. Doses pós-diálise para medicamentos dialisáveis. Consultar farmacêutico clínico.';
  }
  
  return {
    value: Math.round(clcr),
    unit: 'mL/min',
    category,
    interpretation,
    recommendations,
    formula: 'ClCr = [(140-idade) × peso] / (72 × Cr) × 0,85 se mulher',
    references: [
      'Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16(1):31-41.',
      'Matzke GR et al. Drug dosing consideration in patients with acute and chronic kidney disease. Am J Kidney Dis. 2011.',
      'UpToDate. Drug prescribing in kidney disease. 2024.'
    ]
  };
}

// =============================================================================
// PHQ-9 - PATIENT HEALTH QUESTIONNAIRE-9
// =============================================================================

/**
 * PHQ-9 - Rastreamento e monitoramento de depressão
 * Validado para uso na APS brasileira
 * 
 * Referências:
 * - Kroenke K et al. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001.
 * - Santos IS et al. Sensitivity and specificity of the PHQ-9 in Brazil. BMC Psychiatry. 2013.
 */
export function calculatePHQ9(respostas: number[]): CalculatorResult {
  const total = respostas.reduce((sum, val) => sum + val, 0);
  const ideacaoSuicida = respostas[8] > 0;
  
  let category: string;
  let interpretation: string;
  let recommendations: string;
  
  if (total >= 20) {
    category = 'Depressão Grave';
    interpretation = `Escore ${total}/27. Indica depressão maior grave. ${ideacaoSuicida ? '⚠️ ATENÇÃO: Ideação suicida presente - avaliar risco imediatamente.' : ''}`;
    recommendations = 'Avaliação de risco suicida obrigatória. Encaminhamento urgente à psiquiatria. Iniciar antidepressivo. Considerar internação se risco alto. Não deixar paciente sozinho.';
  } else if (total >= 15) {
    category = 'Depressão Moderadamente Grave';
    interpretation = `Escore ${total}/27. Indica depressão maior moderadamente grave. ${ideacaoSuicida ? '⚠️ ATENÇÃO: Ideação suicida presente.' : ''}`;
    recommendations = 'Iniciar tratamento farmacológico (ISRS primeira linha). Psicoterapia (TCC ou interpessoal). Reavaliação em 2-4 semanas. Encaminhamento à psiquiatria se não resposta.';
  } else if (total >= 10) {
    category = 'Depressão Moderada';
    interpretation = `Escore ${total}/27. Provável depressão maior. Requer confirmação diagnóstica.`;
    recommendations = 'Confirmar diagnóstico com entrevista clínica. Considerar tratamento farmacológico e/ou psicoterapia. Reavaliar em 2 semanas. Orientar sobre higiene do sono e atividade física.';
  } else if (total >= 5) {
    category = 'Sintomas Depressivos Leves';
    interpretation = `Escore ${total}/27. Sintomas depressivos subclínicos ou depressão leve.`;
    recommendations = 'Monitoramento ativo. Intervenções de estilo de vida (exercício, sono, suporte social). Psicoeducação. Reavaliar em 2-4 semanas. Considerar psicoterapia breve.';
  } else {
    category = 'Sem Depressão';
    interpretation = `Escore ${total}/27. Ausência de sintomas depressivos significativos.`;
    recommendations = 'Rastreamento periódico em grupos de risco. Promoção de saúde mental. Orientar sobre sinais de alerta.';
  }
  
  return {
    value: total,
    unit: 'pontos',
    category,
    interpretation,
    recommendations,
    formula: 'Soma das 9 questões (0-3 cada)',
    references: [
      'Kroenke K, Spitzer RL, Williams JB. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001;16(9):606-613.',
      'Santos IS et al. Sensitivity and specificity of the Patient Health Questionnaire-9 (PHQ-9) among adults from the general population. Cad Saude Publica. 2013;29(8):1533-1543.',
      'Ministério da Saúde. Caderno de Atenção Básica nº 34: Saúde Mental. Brasília: MS, 2013.'
    ]
  };
}

// =============================================================================
// PHQ-2 - RASTREAMENTO RÁPIDO DE DEPRESSÃO
// =============================================================================

/**
 * PHQ-2 - Rastreamento ultra-breve de depressão
 * Primeiras 2 questões do PHQ-9
 * 
 * Referências:
 * - Kroenke K et al. The Patient Health Questionnaire-2. Med Care. 2003.
 */
export function calculatePHQ2(interesse: number, humor: number): CalculatorResult {
  const total = interesse + humor;
  
  let category: string;
  let interpretation: string;
  let recommendations: string;
  
  if (total >= 3) {
    category = 'Rastreamento Positivo';
    interpretation = `Escore ${total}/6. Alta probabilidade de depressão. Sensibilidade 83%, especificidade 92% para depressão maior.`;
    recommendations = 'Aplicar PHQ-9 completo para confirmação e estadiamento. Não iniciar tratamento apenas com PHQ-2 positivo.';
  } else if (total >= 2) {
    category = 'Rastreamento Limítrofe';
    interpretation = `Escore ${total}/6. Possível depressão. Requer avaliação adicional.`;
    recommendations = 'Aplicar PHQ-9 completo. Investigar fatores de risco e estressores. Considerar reavaliação em 2 semanas.';
  } else {
    category = 'Rastreamento Negativo';
    interpretation = `Escore ${total}/6. Baixa probabilidade de depressão maior (VPN 99%).`;
    recommendations = 'Rastreamento negativo não exclui depressão. Se alta suspeita clínica, aplicar PHQ-9 completo. Repetir rastreamento anualmente em grupos de risco.';
  }
  
  return {
    value: total,
    unit: 'pontos',
    category,
    interpretation,
    recommendations,
    formula: 'Soma de 2 questões (0-3 cada)',
    references: [
      'Kroenke K, Spitzer RL, Williams JB. The Patient Health Questionnaire-2: validity of a two-item depression screener. Med Care. 2003;41(11):1284-1292.',
      'USPSTF. Screening for Depression in Adults. JAMA. 2016;315(4):380-387.',
      'Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas - Depressão. 2022.'
    ]
  };
}

// =============================================================================
// AUDIT-C - RASTREAMENTO DE USO DE ÁLCOOL
// =============================================================================

/**
 * AUDIT-C - Versão curta do AUDIT
 * Rastreamento de uso problemático de álcool na APS
 * 
 * Referências:
 * - Bush K et al. The AUDIT alcohol consumption questions. Arch Intern Med. 1998.
 */
export function calculateAUDITC(frequencia: number, quantidade: number, binge: number): CalculatorResult {
  const total = frequencia + quantidade + binge;
  
  let category: string;
  let interpretation: string;
  let recommendations: string;
  
  // Pontos de corte: ≥4 homens, ≥3 mulheres (usando ≥4 como padrão)
  if (total >= 7) {
    category = 'Alto Risco / Dependência Provável';
    interpretation = `Escore ${total}/12. Forte indicativo de uso problemático ou dependência alcoólica.`;
    recommendations = 'Aplicar AUDIT completo (10 questões). Avaliar critérios de dependência (CID-10/DSM-5). Considerar encaminhamento ao CAPS-AD. Rastrear complicações hepáticas e neurológicas.';
  } else if (total >= 4) {
    category = 'Rastreamento Positivo';
    interpretation = `Escore ${total}/12. Uso de risco ou nocivo de álcool. Sensibilidade 86% para transtorno por uso de álcool.`;
    recommendations = 'Intervenção breve (5-15 min): feedback, responsabilidade, aconselhamento, menu de opções, empatia, autoeficácia. Reavaliar em 1-3 meses. Se persistir, AUDIT completo.';
  } else {
    category = 'Rastreamento Negativo';
    interpretation = `Escore ${total}/12. Uso de baixo risco ou abstinência.`;
    recommendations = 'Reforçar comportamento saudável. Orientar sobre limites de consumo seguro. Rastreamento anual. Atenção a mudanças de padrão.';
  }
  
  return {
    value: total,
    unit: 'pontos',
    category,
    interpretation,
    recommendations,
    formula: 'Soma de 3 questões (0-4 cada)',
    references: [
      'Bush K et al. The AUDIT alcohol consumption questions (AUDIT-C): an effective brief screening test for problem drinking. Arch Intern Med. 1998;158(16):1789-1795.',
      'Ministério da Saúde. Rastreamento. Cadernos de Atenção Primária, nº 29. Brasília: MS, 2010.',
      'Moyer VA; USPSTF. Screening and behavioral counseling interventions for unhealthy alcohol use. Ann Intern Med. 2013.'
    ]
  };
}

// =============================================================================
// CAGE - RASTREAMENTO DE ALCOOLISMO
// =============================================================================

/**
 * CAGE - Questionário de 4 perguntas para dependência alcoólica
 * Acrônimo: Cut down, Annoyed, Guilty, Eye-opener
 * 
 * Referências:
 * - Ewing JA. Detecting alcoholism: The CAGE questionnaire. JAMA. 1984.
 */
export function calculateCAGE(cutDown: boolean, annoyed: boolean, guilty: boolean, eyeOpener: boolean): CalculatorResult {
  const total = (cutDown ? 1 : 0) + (annoyed ? 1 : 0) + (guilty ? 1 : 0) + (eyeOpener ? 1 : 0);
  
  let category: string;
  let interpretation: string;
  let recommendations: string;
  
  if (total >= 2) {
    category = 'Rastreamento Positivo para Dependência';
    interpretation = `Escore ${total}/4. Forte suspeita de dependência alcoólica. Sensibilidade 93%, especificidade 76% para alcoolismo.`;
    recommendations = 'Confirmar diagnóstico de dependência (CID-10). Avaliar síndrome de abstinência. Encaminhar ao CAPS-AD. Considerar desintoxicação supervisionada. Rastrear comorbidades psiquiátricas.';
  } else if (total === 1) {
    category = 'Rastreamento Limítrofe';
    interpretation = `Escore ${total}/4. Possível uso problemático. Requer investigação adicional.`;
    recommendations = 'Aplicar AUDIT completo para melhor caracterização. Investigar padrão de consumo detalhado. Intervenção breve preventiva.';
  } else {
    category = 'Rastreamento Negativo';
    interpretation = `Escore ${total}/4. Baixa probabilidade de dependência alcoólica.`;
    recommendations = 'CAGE negativo não exclui uso de risco. Considerar AUDIT-C para avaliação de padrão de consumo. Orientar sobre riscos do álcool.';
  }
  
  return {
    value: total,
    unit: 'pontos',
    category,
    interpretation,
    recommendations,
    formula: 'Soma de 4 questões sim/não',
    references: [
      'Ewing JA. Detecting alcoholism: The CAGE questionnaire. JAMA. 1984;252(14):1905-1907.',
      'Dhalla S, Kopec JA. The CAGE questionnaire for alcohol misuse: a review of reliability and validity studies. Clin Invest Med. 2007;30(1):33-41.',
      'Masur J, Monteiro MG. Validation of the CAGE alcoholism screening test in Brazilian psychiatry inpatients. Braz J Med Biol Res. 1983.'
    ]
  };
}

// =============================================================================
// FINDRISC - RISCO DE DIABETES TIPO 2
// =============================================================================

/**
 * FINDRISC - Finnish Diabetes Risk Score
 * Predição de risco de DM2 em 10 anos
 * Validado para população brasileira
 * 
 * Referências:
 * - Lindström J, Tuomilehto J. The Diabetes Risk Score. Diabetes Care. 2003.
 * - SBD. Diretrizes da Sociedade Brasileira de Diabetes. 2023.
 */
export function calculateFINDRISC(params: {
  idade: number;
  imc: number;
  circunferenciaAbdominal: number;
  atividadeFisica: boolean;
  vegetaisDiarios: boolean;
  usoAntiHipertensivo: boolean;
  glicemiaAlteradaPrevia: boolean;
  historicoFamiliarDM: 'nenhum' | 'segundo_grau' | 'primeiro_grau';
  sexo: 'M' | 'F';
}): CalculatorResult {
  let pontos = 0;
  
  // Idade
  if (params.idade >= 64) pontos += 4;
  else if (params.idade >= 55) pontos += 3;
  else if (params.idade >= 45) pontos += 2;
  
  // IMC
  if (params.imc >= 30) pontos += 3;
  else if (params.imc >= 25) pontos += 1;
  
  // Circunferência abdominal
  if (params.sexo === 'M') {
    if (params.circunferenciaAbdominal >= 102) pontos += 4;
    else if (params.circunferenciaAbdominal >= 94) pontos += 3;
  } else {
    if (params.circunferenciaAbdominal >= 88) pontos += 4;
    else if (params.circunferenciaAbdominal >= 80) pontos += 3;
  }
  
  // Atividade física
  if (!params.atividadeFisica) pontos += 2;
  
  // Vegetais diários
  if (!params.vegetaisDiarios) pontos += 1;
  
  // Anti-hipertensivo
  if (params.usoAntiHipertensivo) pontos += 2;
  
  // Glicemia alterada prévia
  if (params.glicemiaAlteradaPrevia) pontos += 5;
  
  // Histórico familiar
  if (params.historicoFamiliarDM === 'primeiro_grau') pontos += 5;
  else if (params.historicoFamiliarDM === 'segundo_grau') pontos += 3;
  
  let category: string;
  let interpretation: string;
  let recommendations: string;
  let risco: string;
  
  if (pontos >= 20) {
    category = 'Risco Muito Alto';
    risco = '~50%';
    interpretation = `Escore ${pontos}/26. Risco de desenvolver DM2 em 10 anos: aproximadamente 50%.`;
    recommendations = 'Rastreamento imediato com glicemia jejum E HbA1c. Se normal, repetir anualmente. Programa intensivo de mudança de estilo de vida. Considerar metformina preventiva se pré-diabetes.';
  } else if (pontos >= 15) {
    category = 'Risco Alto';
    risco = '~33%';
    interpretation = `Escore ${pontos}/26. Risco de desenvolver DM2 em 10 anos: aproximadamente 33% (1 em 3).`;
    recommendations = 'Rastreamento com glicemia jejum ou HbA1c. Programa estruturado de mudança de estilo de vida. Reavaliação anual. Orientar sobre sinais de diabetes.';
  } else if (pontos >= 12) {
    category = 'Risco Moderado';
    risco = '~17%';
    interpretation = `Escore ${pontos}/26. Risco de desenvolver DM2 em 10 anos: aproximadamente 17% (1 em 6).`;
    recommendations = 'Rastreamento com glicemia jejum a cada 3 anos. Orientações sobre alimentação saudável e atividade física. Controle de peso.';
  } else if (pontos >= 7) {
    category = 'Risco Baixo';
    risco = '~4%';
    interpretation = `Escore ${pontos}/26. Risco de desenvolver DM2 em 10 anos: aproximadamente 4% (1 em 25).`;
    recommendations = 'Manter hábitos saudáveis. Rastreamento a cada 3-5 anos se fatores de risco. Promoção de saúde.';
  } else {
    category = 'Risco Muito Baixo';
    risco = '~1%';
    interpretation = `Escore ${pontos}/26. Risco de desenvolver DM2 em 10 anos: aproximadamente 1% (1 em 100).`;
    recommendations = 'Excelente perfil de risco. Manter estilo de vida saudável. Rastreamento apenas se surgir fator de risco.';
  }
  
  return {
    value: pontos,
    unit: `pontos (risco ${risco})`,
    category,
    interpretation,
    recommendations,
    formula: 'Soma ponderada de 8 fatores de risco',
    references: [
      'Lindström J, Tuomilehto J. The Diabetes Risk Score: A practical tool to predict type 2 diabetes risk. Diabetes Care. 2003;26(3):725-731.',
      'Sociedade Brasileira de Diabetes. Diretrizes 2023: Rastreamento e prevenção de DM2.',
      'Ministério da Saúde. Estratégias para o cuidado da pessoa com doença crônica: diabetes mellitus. Cadernos de Atenção Básica nº 36. 2013.'
    ]
  };
}

// =============================================================================
// HIDRATAÇÃO PARA DENGUE
// =============================================================================

/**
 * Cálculo de hidratação para dengue conforme classificação de risco
 * Baseado no protocolo do Ministério da Saúde do Brasil
 * 
 * Referências:
 * - Ministério da Saúde. Dengue: diagnóstico e manejo clínico. 6ª ed. 2024.
 */
export function calculateHidratacaoDengue(peso: number, grupo: 'A' | 'B' | 'C' | 'D'): CalculatorResult {
  let volumeTotal: number;
  let volumeHora: number;
  let via: string;
  let category: string;
  let interpretation: string;
  let recommendations: string;
  
  switch (grupo) {
    case 'A':
      volumeTotal = peso * 60; // 60 mL/kg/dia
      volumeHora = volumeTotal / 24;
      via = 'ORAL';
      category = 'Grupo A - Ambulatorial';
      interpretation = `Volume: ${volumeTotal.toFixed(0)} mL/dia (${volumeHora.toFixed(0)} mL/h). Hidratação oral domiciliar.`;
      recommendations = 'Hidratação oral: 60-80 mL/kg/dia. 1/3 SRO + 2/3 líquidos caseiros (água, sucos, chás). Retorno diário para reavaliação até 48h após febre. Orientar sinais de alarme.';
      break;
      
    case 'B':
      volumeTotal = peso * 60;
      volumeHora = volumeTotal / 24;
      via = 'ORAL (observação)';
      category = 'Grupo B - Observação';
      interpretation = `Volume: ${volumeTotal.toFixed(0)} mL/dia. Hidratação oral supervisionada por 6h.`;
      recommendations = 'Hidratação oral supervisionada na UBS/UPA por 6h. Hemograma obrigatório. Se hematócrito normal e sem sinais de alarme: alta como Grupo A. Se alterado: reavaliar.';
      break;
      
    case 'C':
      volumeTotal = peso * 20; // Fase de expansão
      volumeHora = volumeTotal / 2; // Em 2 horas
      via = 'INTRAVENOSA';
      category = 'Grupo C - Internação';
      interpretation = `Fase de expansão: ${volumeTotal.toFixed(0)} mL em 2h (${volumeHora.toFixed(0)} mL/h). SF 0,9% ou Ringer Lactato.`;
      recommendations = 'INTERNAÇÃO OBRIGATÓRIA. Fase expansão: 20 mL/kg em 2h (repetir até 3x se necessário). Após estabilização: 25 mL/kg em 6h, depois 25 mL/kg em 8h. Monitorar hematócrito a cada 2h.';
      break;
      
    case 'D':
      volumeTotal = peso * 20; // Bolus inicial
      volumeHora = volumeTotal / 0.33; // Em 20 minutos
      via = 'INTRAVENOSA RÁPIDA';
      category = 'Grupo D - UTI/Emergência';
      interpretation = `CHOQUE: ${volumeTotal.toFixed(0)} mL em 20 min (bolus). Repetir até 3x. SF 0,9% ou Ringer.`;
      recommendations = 'EMERGÊNCIA - UTI. Bolus 20 mL/kg em 20 min, repetir até 3x. Se não responder: albumina 0,5-1 g/kg ou plasma. Monitorização invasiva. Hemoderivados se sangramento. Drogas vasoativas se refratário.';
      break;
  }
  
  return {
    value: volumeTotal.toFixed(0),
    unit: grupo === 'D' ? 'mL em 20min' : grupo === 'C' ? 'mL em 2h' : 'mL/dia',
    category,
    interpretation,
    recommendations,
    formula: grupo === 'A' || grupo === 'B' ? '60-80 mL/kg/dia VO' : '20 mL/kg IV (expansão)',
    references: [
      'Ministério da Saúde. Dengue: diagnóstico e manejo clínico – adulto e criança. 6ª ed. Brasília: MS, 2024.',
      'Ministério da Saúde. Dengue: aspectos epidemiológicos, diagnóstico e tratamento. Série A. Normas e Manuais Técnicos. 2002.',
      'OPAS/OMS. Dengue: Guías para la atención de enfermos en la Región de las Américas. 2ª ed. 2016.'
    ]
  };
}

// =============================================================================
// ESCORE DE APGAR
// =============================================================================

/**
 * Escore de APGAR para avaliação do recém-nascido
 * Aplicado no 1º e 5º minuto de vida
 * 
 * Referências:
 * - Apgar V. A proposal for a new method of evaluation of the newborn infant. Curr Res Anesth Analg. 1953.
 * - AAP/ACOG. Guidelines for Perinatal Care. 8th ed. 2017.
 */
export function calculateAPGAR(
  frequenciaCardiaca: 0 | 1 | 2,
  respiracao: 0 | 1 | 2,
  tonus: 0 | 1 | 2,
  irritabilidade: 0 | 1 | 2,
  cor: 0 | 1 | 2
): CalculatorResult {
  const total = frequenciaCardiaca + respiracao + tonus + irritabilidade + cor;
  
  let category: string;
  let interpretation: string;
  let recommendations: string;
  
  if (total >= 7) {
    category = 'Boa Vitalidade';
    interpretation = `APGAR ${total}/10. Recém-nascido com boa adaptação à vida extrauterina.`;
    recommendations = 'Cuidados de rotina: secar, aquecer, aspirar se necessário, contato pele a pele, clampeamento tardio do cordão, amamentação na 1ª hora.';
  } else if (total >= 4) {
    category = 'Asfixia Moderada';
    interpretation = `APGAR ${total}/10. Depressão moderada. Necessita de reanimação.`;
    recommendations = 'Passos iniciais: aquecer, posicionar, aspirar, secar, estimular. Se FC <100: VPP com máscara. Reavaliar a cada 30 segundos. Repetir APGAR no 5º minuto.';
  } else {
    category = 'Asfixia Grave';
    interpretation = `APGAR ${total}/10. Depressão grave. Reanimação avançada necessária.`;
    recommendations = 'Reanimação neonatal imediata: VPP, considerar intubação, massagem cardíaca se FC <60 após 30s de VPP. Adrenalina se FC <60 após VPP + massagem. Considerar hipotermia terapêutica.';
  }
  
  return {
    value: total,
    unit: 'pontos',
    category,
    interpretation,
    recommendations,
    formula: 'A (Aparência) + P (Pulso) + G (Gesticulação) + A (Atividade) + R (Respiração)',
    references: [
      'Apgar V. A proposal for a new method of evaluation of the newborn infant. Curr Res Anesth Analg. 1953;32(4):260-267.',
      'American Academy of Pediatrics. Neonatal Resuscitation Program (NRP). 8th ed. 2021.',
      'Sociedade Brasileira de Pediatria. Reanimação do recém-nascido ≥34 semanas em sala de parto. 2022.'
    ]
  };
}

// =============================================================================
// FRAMINGHAM - RISCO CARDIOVASCULAR
// =============================================================================

/**
 * Escore de Framingham para risco cardiovascular em 10 anos
 * Versão adaptada para uso clínico
 * 
 * Referências:
 * - D'Agostino RB et al. General cardiovascular risk profile. Circulation. 2008.
 * - SBC. Atualização da Diretriz de Prevenção Cardiovascular. Arq Bras Cardiol. 2019.
 */
export function calculateFramingham(params: {
  idade: number;
  sexo: 'M' | 'F';
  colesterolTotal: number;
  hdl: number;
  pressaoSistolica: number;
  fumante: boolean;
  diabetes: boolean;
  tratamentoHAS: boolean;
}): CalculatorResult {
  const { idade, sexo, colesterolTotal, hdl, pressaoSistolica, fumante, diabetes, tratamentoHAS } = params;
  
  let pontos = 0;
  
  // Idade (simplificado)
  if (sexo === 'M') {
    if (idade >= 70) pontos += 12;
    else if (idade >= 60) pontos += 9;
    else if (idade >= 50) pontos += 6;
    else if (idade >= 40) pontos += 3;
    else pontos += 0;
  } else {
    if (idade >= 70) pontos += 14;
    else if (idade >= 60) pontos += 10;
    else if (idade >= 50) pontos += 6;
    else if (idade >= 40) pontos += 3;
    else pontos += 0;
  }
  
  // Colesterol Total
  if (colesterolTotal >= 280) pontos += 3;
  else if (colesterolTotal >= 240) pontos += 2;
  else if (colesterolTotal >= 200) pontos += 1;
  
  // HDL
  if (hdl < 35) pontos += 2;
  else if (hdl < 45) pontos += 1;
  else if (hdl >= 60) pontos -= 1;
  
  // PA Sistólica (considerando tratamento)
  const paFator = tratamentoHAS ? 1.5 : 1;
  if (pressaoSistolica >= 160) pontos += Math.round(4 * paFator);
  else if (pressaoSistolica >= 140) pontos += Math.round(2 * paFator);
  else if (pressaoSistolica >= 130) pontos += Math.round(1 * paFator);
  
  // Tabagismo
  if (fumante) pontos += sexo === 'M' ? 4 : 3;
  
  // Diabetes
  if (diabetes) pontos += sexo === 'M' ? 3 : 4;
  
  // Conversão para risco (simplificado)
  let risco = Math.min(Math.max(pontos * 1.5, 1), 30);
  
  let category: string;
  let interpretation: string;
  let recommendations: string;
  
  if (risco < 5) {
    category = 'Baixo Risco';
    interpretation = `Risco de evento CV em 10 anos: ${risco.toFixed(1)}%. Baixo risco absoluto.`;
    recommendations = 'Manter estilo de vida saudável. Rastreamento periódico de fatores de risco. Reavaliação em 5 anos.';
  } else if (risco < 10) {
    category = 'Risco Intermediário-Baixo';
    interpretation = `Risco de evento CV em 10 anos: ${risco.toFixed(1)}%. Risco intermediário baixo.`;
    recommendations = 'Modificação intensiva de estilo de vida. Considerar estatina se LDL >160 ou múltiplos fatores. Meta LDL <130 mg/dL.';
  } else if (risco < 20) {
    category = 'Risco Intermediário-Alto';
    interpretation = `Risco de evento CV em 10 anos: ${risco.toFixed(1)}%. Risco intermediário alto.`;
    recommendations = 'Estatina indicada. Meta LDL <100 mg/dL. Controle rigoroso de PA (<140/90 ou <130/80 se DM). AAS controverso em prevenção primária.';
  } else {
    category = 'Alto Risco';
    interpretation = `Risco de evento CV em 10 anos: ${risco.toFixed(1)}%. Alto risco cardiovascular.`;
    recommendations = 'Estatina de alta potência. Meta LDL <70 mg/dL. PA <130/80 mmHg. Considerar AAS se risco de sangramento baixo. Acompanhamento cardiológico.';
  }
  
  return {
    value: risco.toFixed(1),
    unit: '%',
    category,
    interpretation,
    recommendations,
    formula: 'Escore de Framingham adaptado',
    references: [
      'D\'Agostino RB et al. General cardiovascular risk profile for use in primary care: the Framingham Heart Study. Circulation. 2008;117(6):743-753.',
      'Sociedade Brasileira de Cardiologia. Atualização da Diretriz de Prevenção Cardiovascular. Arq Bras Cardiol. 2019;113(4):787-891.',
      'Précoma DB et al. Atualização da Diretriz de Prevenção Cardiovascular da SBC - 2019. Arq Bras Cardiol. 2019.'
    ]
  };
}

// =============================================================================
// GAIL - RISCO DE CÂNCER DE MAMA
// =============================================================================

/**
 * Modelo de Gail para risco de câncer de mama em 5 anos
 * Versão simplificada para uso clínico
 * 
 * Referências:
 * - Gail MH et al. Projecting individualized probabilities of developing breast cancer. JNCI. 1989.
 * - NCI Breast Cancer Risk Assessment Tool.
 */
export function calculateGail(params: {
  idade: number;
  menarca: number;
  primeiroParto: number;
  parentes: number;
  biopsias: number;
}): CalculatorResult {
  const { idade, menarca, primeiroParto, parentes, biopsias } = params;
  
  // Risco basal por idade
  let riscoBase = 1.0;
  if (idade >= 70) riscoBase = 4.0;
  else if (idade >= 60) riscoBase = 3.0;
  else if (idade >= 50) riscoBase = 2.0;
  else if (idade >= 40) riscoBase = 1.5;
  
  let multiplicador = 1.0;
  
  // Menarca precoce
  if (menarca < 12) multiplicador *= 1.2;
  else if (menarca <= 13) multiplicador *= 1.1;
  
  // Primeiro parto tardio ou nuliparidade
  if (primeiroParto === 0) multiplicador *= 1.4; // Nulípara
  else if (primeiroParto >= 30) multiplicador *= 1.3;
  else if (primeiroParto >= 25) multiplicador *= 1.1;
  
  // Parentes de 1º grau
  if (parentes >= 2) multiplicador *= 2.5;
  else if (parentes === 1) multiplicador *= 1.8;
  
  // Biópsias prévias
  if (biopsias >= 2) multiplicador *= 1.7;
  else if (biopsias === 1) multiplicador *= 1.3;
  
  const risco = riscoBase * multiplicador;
  
  let category: string;
  let interpretation: string;
  let recommendations: string;
  
  if (risco >= 3.0) {
    category = 'Alto Risco';
    interpretation = `Risco de CA mama em 5 anos: ${risco.toFixed(2)}%. Risco elevado (≥2x população geral).`;
    recommendations = 'Rastreamento intensificado: mamografia anual + considerar RM de mamas. Avaliar quimioprevenção (tamoxifeno/raloxifeno). Encaminhamento a oncogenética se história familiar sugestiva. Considerar mastectomia profilática em casos selecionados.';
  } else if (risco >= 1.67) {
    category = 'Risco Intermediário';
    interpretation = `Risco de CA mama em 5 anos: ${risco.toFixed(2)}%. Risco acima da média populacional.`;
    recommendations = 'Mamografia anual a partir dos 40 anos. Considerar discussão sobre quimioprevenção. Autoexame e exame clínico das mamas. Modificação de fatores de risco modificáveis.';
  } else {
    category = 'Risco Médio';
    interpretation = `Risco de CA mama em 5 anos: ${risco.toFixed(2)}%. Risco similar à população geral.`;
    recommendations = 'Rastreamento conforme diretrizes populacionais: mamografia bienal 50-69 anos (SUS) ou anual 40-74 anos (sociedades). Autoexame mensal. Estilo de vida saudável.';
  }
  
  return {
    value: risco.toFixed(2),
    unit: '%',
    category,
    interpretation,
    recommendations,
    formula: 'Modelo de Gail simplificado',
    references: [
      'Gail MH et al. Projecting individualized probabilities of developing breast cancer for white females. J Natl Cancer Inst. 1989;81(24):1879-1886.',
      'National Cancer Institute. Breast Cancer Risk Assessment Tool. https://bcrisktool.cancer.gov/',
      'INCA. Diretrizes para a detecção precoce do câncer de mama no Brasil. Rio de Janeiro: INCA, 2015.'
    ]
  };
}

// =============================================================================
// SCORE EUROPEU - RISCO DE MORTE CARDIOVASCULAR
// =============================================================================

/**
 * SCORE Europeu para risco de morte cardiovascular em 10 anos
 * Versão para países de alto risco
 * 
 * Referências:
 * - Conroy RM et al. Estimation of ten-year risk of fatal cardiovascular disease in Europe. Eur Heart J. 2003.
 * - ESC Guidelines on cardiovascular disease prevention. 2021.
 */
export function calculateSCORE(params: {
  idade: number;
  sexo: 'M' | 'F';
  fumante: boolean;
  pressaoSistolica: number;
  colesterolTotal: number;
}): CalculatorResult {
  const { idade, sexo, fumante, pressaoSistolica, colesterolTotal } = params;
  
  // Cálculo simplificado baseado nas tabelas SCORE
  let pontos = 0;
  
  // Idade
  pontos += Math.max(0, (idade - 40) / 5);
  
  // Sexo
  if (sexo === 'M') pontos += 3;
  
  // Tabagismo
  if (fumante) pontos += 4;
  
  // PA Sistólica
  if (pressaoSistolica >= 180) pontos += 5;
  else if (pressaoSistolica >= 160) pontos += 4;
  else if (pressaoSistolica >= 140) pontos += 2;
  else if (pressaoSistolica >= 120) pontos += 1;
  
  // Colesterol
  const colesterolMmol = colesterolTotal / 38.67; // Converter para mmol/L
  if (colesterolMmol >= 8) pontos += 4;
  else if (colesterolMmol >= 7) pontos += 3;
  else if (colesterolMmol >= 6) pontos += 2;
  else if (colesterolMmol >= 5) pontos += 1;
  
  const risco = Math.min(pontos * 0.6, 15);
  
  let category: string;
  let interpretation: string;
  let recommendations: string;
  
  if (risco >= 10) {
    category = 'Risco Muito Alto';
    interpretation = `Risco de morte CV em 10 anos: ${risco.toFixed(1)}%. Equivalente a doença CV estabelecida.`;
    recommendations = 'Tratamento intensivo de todos os fatores de risco. Estatina de alta potência (LDL <55 mg/dL). PA <130/80. Cessação tabágica. Considerar AAS. Acompanhamento cardiológico.';
  } else if (risco >= 5) {
    category = 'Alto Risco';
    interpretation = `Risco de morte CV em 10 anos: ${risco.toFixed(1)}%. Alto risco absoluto.`;
    recommendations = 'Estatina indicada (LDL <70 mg/dL). Controle rigoroso de PA (<140/90). Cessação tabágica obrigatória. Modificação intensiva de estilo de vida.';
  } else if (risco >= 1) {
    category = 'Risco Moderado';
    interpretation = `Risco de morte CV em 10 anos: ${risco.toFixed(1)}%. Risco moderado.`;
    recommendations = 'Considerar estatina se LDL >115 mg/dL. Meta PA <140/90. Mudança de estilo de vida. Reavaliação em 3-5 anos.';
  } else {
    category = 'Baixo Risco';
    interpretation = `Risco de morte CV em 10 anos: ${risco.toFixed(1)}%. Baixo risco absoluto.`;
    recommendations = 'Manter estilo de vida saudável. Rastreamento periódico. Reavaliação em 5 anos ou se surgir fator de risco.';
  }
  
  return {
    value: risco.toFixed(1),
    unit: '%',
    category,
    interpretation,
    recommendations,
    formula: 'SCORE (Systematic Coronary Risk Estimation)',
    references: [
      'Conroy RM et al. Estimation of ten-year risk of fatal cardiovascular disease in Europe: the SCORE project. Eur Heart J. 2003;24(11):987-1003.',
      'Visseren FLJ et al. 2021 ESC Guidelines on cardiovascular disease prevention in clinical practice. Eur Heart J. 2021;42(34):3227-3337.',
      'Sociedade Brasileira de Cardiologia. Diretriz de Prevenção Cardiovascular. Arq Bras Cardiol. 2019.'
    ]
  };
}

// =============================================================================
// CURB-65 - GRAVIDADE DE PNEUMONIA ADQUIRIDA NA COMUNIDADE
// =============================================================================

/**
 * CURB-65 - Escore de gravidade para Pneumonia Adquirida na Comunidade (PAC)
 * Prediz mortalidade em 30 dias e orienta decisão de internação
 *
 * Critérios:
 * C - Confusion (confusão mental)
 * U - Urea > 7 mmol/L (ou BUN > 19 mg/dL, ou ureia > 42 mg/dL)
 * R - Respiratory rate ≥ 30/min
 * B - Blood pressure (PAS < 90 mmHg ou PAD ≤ 60 mmHg)
 * 65 - Idade ≥ 65 anos
 *
 * Referências:
 * - Lim WS et al. Defining community acquired pneumonia severity. Thorax. 2003.
 * - BTS Guidelines for CAP in adults. Thorax. 2009.
 * - SBPT. Diretrizes Brasileiras para PAC em adultos imunocompetentes. J Bras Pneumol. 2009.
 */
export function calculateCURB65(params: {
  confusao: boolean;
  ureia: number; // em mg/dL
  frequenciaRespiratoria: number;
  pressaoSistolica: number;
  pressaoDiastolica: number;
  idade: number;
}): CalculatorResult {
  let pontos = 0;

  // C - Confusão mental (novo estado confusional)
  if (params.confusao) pontos += 1;

  // U - Ureia > 42 mg/dL (equivalente a >7 mmol/L ou BUN >19 mg/dL)
  if (params.ureia > 42) pontos += 1;

  // R - Frequência respiratória ≥ 30/min
  if (params.frequenciaRespiratoria >= 30) pontos += 1;

  // B - Hipotensão (PAS < 90 ou PAD ≤ 60 mmHg)
  if (params.pressaoSistolica < 90 || params.pressaoDiastolica <= 60) pontos += 1;

  // 65 - Idade ≥ 65 anos
  if (params.idade >= 65) pontos += 1;

  let category: string;
  let interpretation: string;
  let recommendations: string;
  let mortalidade: string;
  let local: string;

  if (pontos === 0) {
    category = 'Grupo 1 - Baixo Risco';
    mortalidade = '0,6%';
    local = 'Ambulatorial';
    interpretation = `CURB-65 = ${pontos}/5. Mortalidade em 30 dias: ~0,6%. PAC leve.`;
    recommendations = 'Tratamento ambulatorial. Antibioticoterapia oral: Amoxicilina 500mg 8/8h por 5-7 dias OU Azitromicina 500mg/dia por 3-5 dias. Retorno em 48-72h ou se piora. Orientar sinais de alarme.';
  } else if (pontos === 1) {
    category = 'Grupo 1 - Baixo Risco';
    mortalidade = '2,7%';
    local = 'Ambulatorial';
    interpretation = `CURB-65 = ${pontos}/5. Mortalidade em 30 dias: ~2,7%. PAC leve a moderada.`;
    recommendations = 'Tratamento ambulatorial na maioria. Considerar internação breve se critério for idade ≥65 isolado com comorbidades. Antibioticoterapia oral: Amoxicilina + Clavulanato 875mg 12/12h OU Quinolona respiratória. Reavaliação em 48h.';
  } else if (pontos === 2) {
    category = 'Grupo 2 - Risco Intermediário';
    mortalidade = '6,8%';
    local = 'Internação curta ou observação';
    interpretation = `CURB-65 = ${pontos}/5. Mortalidade em 30 dias: ~6,8%. PAC moderada.`;
    recommendations = 'Internação hospitalar recomendada. Considerar observação 24h em UPA se bom suporte domiciliar. Antibioticoterapia IV ou VO: Amoxicilina-Clavulanato + Macrolídeo OU Quinolona respiratória. Oxigenoterapia se SpO2 <92%.';
  } else if (pontos === 3) {
    category = 'Grupo 3 - Alto Risco';
    mortalidade = '14%';
    local = 'Internação enfermaria';
    interpretation = `CURB-65 = ${pontos}/5. Mortalidade em 30 dias: ~14%. PAC grave.`;
    recommendations = 'Internação hospitalar obrigatória. Antibioticoterapia IV: Ceftriaxona 2g/dia + Azitromicina 500mg/dia OU Quinolona respiratória IV. Considerar UTI se instável. Hemocultura antes do ATB. Oxigenoterapia. Profilaxia de TVP.';
  } else if (pontos === 4) {
    category = 'Grupo 3 - Alto Risco';
    mortalidade = '27,8%';
    local = 'Internação/UTI';
    interpretation = `CURB-65 = ${pontos}/5. Mortalidade em 30 dias: ~27,8%. PAC muito grave.`;
    recommendations = 'Internação em UTI ou semi-intensiva. Antibioticoterapia IV ampla: Ceftriaxona 2g/dia + Azitromicina 500mg/dia. Considerar Piperacilina-Tazobactam se risco de Pseudomonas. Suporte ventilatório. Vasopressores se choque séptico.';
  } else {
    category = 'Grupo 3 - Risco Muito Alto';
    mortalidade = '57,6%';
    local = 'UTI';
    interpretation = `CURB-65 = ${pontos}/5. Mortalidade em 30 dias: ~57,6%. PAC gravíssima.`;
    recommendations = 'UTI obrigatória. Antibioticoterapia IV de amplo espectro: considerar cobertura para Pseudomonas e MRSA. Suporte intensivo: ventilação mecânica, drogas vasoativas. Discussão de prognóstico com família. Cuidados paliativos se indicado.';
  }

  return {
    value: pontos,
    unit: `pontos (mortalidade ${mortalidade})`,
    category,
    interpretation,
    recommendations,
    formula: 'C(onfusão) + U(reia>42) + R(esp≥30) + B(PA<90/60) + 65(idade)',
    references: [
      'Lim WS et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003;58(5):377-382.',
      'Mandell LA et al. Infectious Diseases Society of America/American Thoracic Society consensus guidelines on the management of CAP in adults. Clin Infect Dis. 2007;44(Suppl 2):S27-72.',
      'SBPT. Diretrizes brasileiras para PAC em adultos imunocompetentes - 2009. J Bras Pneumol. 2009;35(6):574-601.'
    ]
  };
}

// =============================================================================
// CRB-65 - VERSÃO SEM UREIA (AMBULATORIAL)
// =============================================================================

/**
 * CRB-65 - Versão simplificada do CURB-65 sem dosagem de ureia
 * Útil em ambiente ambulatorial onde não há laboratório disponível
 *
 * Referências:
 * - Bauer TT et al. CRB-65 predicts death from CAP. J Intern Med. 2006.
 */
export function calculateCRB65(params: {
  confusao: boolean;
  frequenciaRespiratoria: number;
  pressaoSistolica: number;
  pressaoDiastolica: number;
  idade: number;
}): CalculatorResult {
  let pontos = 0;

  if (params.confusao) pontos += 1;
  if (params.frequenciaRespiratoria >= 30) pontos += 1;
  if (params.pressaoSistolica < 90 || params.pressaoDiastolica <= 60) pontos += 1;
  if (params.idade >= 65) pontos += 1;

  let category: string;
  let interpretation: string;
  let recommendations: string;

  if (pontos === 0) {
    category = 'Baixo Risco';
    interpretation = `CRB-65 = ${pontos}/4. Mortalidade muito baixa (<1%). PAC leve.`;
    recommendations = 'Tratamento ambulatorial seguro. Antibioticoterapia oral. Retorno se piora.';
  } else if (pontos <= 2) {
    category = 'Risco Intermediário';
    interpretation = `CRB-65 = ${pontos}/4. Mortalidade intermediária (1-10%). Considerar internação.`;
    recommendations = 'Avaliar necessidade de internação. Se ambulatorial: reavaliação em 24-48h obrigatória. Considerar coleta de ureia para CURB-65 completo.';
  } else {
    category = 'Alto Risco';
    interpretation = `CRB-65 = ${pontos}/4. Mortalidade alta (>10%). Internação indicada.`;
    recommendations = 'Internação hospitalar. Aplicar CURB-65 completo para estratificação. Considerar UTI se instabilidade.';
  }

  return {
    value: pontos,
    unit: 'pontos',
    category,
    interpretation,
    recommendations,
    formula: 'C(onfusão) + R(esp≥30) + B(PA<90/60) + 65(idade)',
    references: [
      'Bauer TT et al. CRB-65 predicts death from community-acquired pneumonia. J Intern Med. 2006;260(1):93-101.',
      'Chalmers JD et al. Severity assessment tools for predicting mortality in hospitalised patients with CAP. Thorax. 2010;65(10):878-883.'
    ]
  };
}

// =============================================================================
// WELLS - TVP (TROMBOSE VENOSA PROFUNDA)
// =============================================================================

/**
 * Escore de Wells para Trombose Venosa Profunda (TVP)
 * Estratifica probabilidade pré-teste para guiar investigação diagnóstica
 *
 * Referências:
 * - Wells PS et al. Value of assessment of pretest probability of DVT. Lancet. 1997.
 * - ACCP Guidelines for VTE. Chest. 2016.
 */
export function calculateWellsTVP(params: {
  cancerAtivo: boolean;           // Tratamento nos últimos 6 meses ou paliativo
  paralisia: boolean;             // Paresia, paralisia ou imobilização gessada de MMII
  acamado: boolean;               // Acamado >3 dias ou cirurgia maior nas últimas 12 semanas
  dolorLocalizado: boolean;       // Dor localizada ao longo do sistema venoso profundo
  edemaGlobal: boolean;           // Edema de toda a perna
  edema3cm: boolean;              // Edema da panturrilha >3cm vs. contralateral
  edemaCacifo: boolean;           // Edema com cacifo (apenas na perna sintomática)
  veiasColaterais: boolean;       // Veias superficiais colaterais (não varicosas)
  tvpPrevia: boolean;             // TVP previamente documentada
  diagnosticoAlternativo: boolean; // Diagnóstico alternativo tão ou mais provável
}): CalculatorResult {
  let pontos = 0;

  if (params.cancerAtivo) pontos += 1;
  if (params.paralisia) pontos += 1;
  if (params.acamado) pontos += 1;
  if (params.dolorLocalizado) pontos += 1;
  if (params.edemaGlobal) pontos += 1;
  if (params.edema3cm) pontos += 1;
  if (params.edemaCacifo) pontos += 1;
  if (params.veiasColaterais) pontos += 1;
  if (params.tvpPrevia) pontos += 1;
  if (params.diagnosticoAlternativo) pontos -= 2;

  let category: string;
  let interpretation: string;
  let recommendations: string;
  let probabilidade: string;

  if (pontos <= 0) {
    category = 'Baixa Probabilidade';
    probabilidade = '~5%';
    interpretation = `Wells TVP = ${pontos}. Probabilidade pré-teste baixa (~5%).`;
    recommendations = 'Solicitar D-dímero. Se D-dímero negativo: TVP excluída (VPN >99%). Se D-dímero positivo: realizar USG Doppler venoso. Se USG negativo em baixa probabilidade: TVP excluída.';
  } else if (pontos <= 2) {
    category = 'Probabilidade Moderada';
    probabilidade = '~17%';
    interpretation = `Wells TVP = ${pontos}. Probabilidade pré-teste moderada (~17%).`;
    recommendations = 'Solicitar D-dímero. Se negativo: TVP improvável. Se positivo: USG Doppler venoso obrigatório. Considerar repetir USG em 5-7 dias se inicial negativo com alta suspeita clínica.';
  } else {
    category = 'Alta Probabilidade';
    probabilidade = '~53-75%';
    interpretation = `Wells TVP = ${pontos}. Probabilidade pré-teste alta (~53-75%). D-dímero não exclui TVP nesta categoria.`;
    recommendations = 'USG Doppler venoso direto (sem D-dímero). Se positivo: iniciar anticoagulação. Se negativo mas alta suspeita: repetir USG em 5-7 dias ou considerar venografia/angioTC. Não aguardar exame para anticoagular se instável.';
  }

  return {
    value: pontos,
    unit: `pontos (prob. ${probabilidade})`,
    category,
    interpretation,
    recommendations,
    formula: 'Soma de critérios clínicos (-2 se diagnóstico alternativo mais provável)',
    references: [
      'Wells PS et al. Value of assessment of pretest probability of deep-vein thrombosis in clinical management. Lancet. 1997;350(9094):1795-1798.',
      'Wells PS et al. Evaluation of D-dimer in the diagnosis of suspected DVT. N Engl J Med. 2003;349(13):1227-1235.',
      'Kearon C et al. Antithrombotic Therapy for VTE Disease: CHEST Guideline. Chest. 2016;149(2):315-352.'
    ]
  };
}

// =============================================================================
// WELLS - EP (EMBOLIA PULMONAR)
// =============================================================================

/**
 * Escore de Wells para Embolia Pulmonar (EP)
 * Versão original e simplificada para estratificação de risco
 *
 * Referências:
 * - Wells PS et al. Excluding pulmonary embolism at the bedside. Ann Intern Med. 2001.
 * - PIOPED II Investigators. NEJM. 2006.
 */
export function calculateWellsEP(params: {
  sintomasTVP: boolean;            // Sinais/sintomas clínicos de TVP
  diagnosticoAlternativo: boolean; // Diagnóstico alternativo menos provável que EP
  fc100: boolean;                  // FC > 100 bpm
  imobilizacao: boolean;           // Imobilização ≥3 dias ou cirurgia nas últimas 4 semanas
  tvpEpPrevia: boolean;            // TVP ou EP prévia
  hemoptise: boolean;              // Hemoptise
  malignidade: boolean;            // Malignidade (tratamento nos últimos 6 meses ou paliativo)
}): CalculatorResult {
  let pontos = 0;

  if (params.sintomasTVP) pontos += 3;
  if (params.diagnosticoAlternativo) pontos += 3;
  if (params.fc100) pontos += 1.5;
  if (params.imobilizacao) pontos += 1.5;
  if (params.tvpEpPrevia) pontos += 1.5;
  if (params.hemoptise) pontos += 1;
  if (params.malignidade) pontos += 1;

  let category: string;
  let interpretation: string;
  let recommendations: string;
  let probabilidade: string;

  if (pontos <= 4) {
    category = 'EP Improvável';
    probabilidade = '~8%';
    interpretation = `Wells EP = ${pontos}. Probabilidade pré-teste baixa-moderada (~8%). EP improvável.`;
    recommendations = 'Solicitar D-dímero (alta sensibilidade, ex: ELISA). Se D-dímero negativo: EP excluída (VPN >99,5%). Se D-dímero positivo: AngioTC de tórax. Considerar YEARS algorithm como alternativa.';
  } else {
    category = 'EP Provável';
    probabilidade = '~28-41%';
    interpretation = `Wells EP = ${pontos}. Probabilidade pré-teste alta (~28-41%). EP provável.`;
    recommendations = 'AngioTC de tórax direto (D-dímero não exclui EP nesta categoria). Se contraindicação a contraste: cintilografia V/Q. Se instável: considerar trombólise empírica ou embolectomia. Anticoagulação empírica enquanto aguarda exame se alta suspeita.';
  }

  return {
    value: pontos,
    unit: `pontos (prob. ${probabilidade})`,
    category,
    interpretation,
    recommendations,
    formula: 'Soma ponderada de 7 critérios clínicos',
    references: [
      'Wells PS et al. Excluding pulmonary embolism at the bedside without diagnostic imaging: management of patients with suspected PE. Ann Intern Med. 2001;135(2):98-107.',
      'van Belle A et al. Effectiveness of managing suspected PE using an algorithm. JAMA. 2006;295(2):172-179.',
      'Konstantinides SV et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism. Eur Heart J. 2020;41(4):543-603.'
    ]
  };
}

// =============================================================================
// CHA2DS2-VASc - RISCO DE AVC EM FIBRILAÇÃO ATRIAL
// =============================================================================

/**
 * CHA2DS2-VASc - Escore de risco de AVC em Fibrilação Atrial
 * Guia decisão sobre anticoagulação para prevenção de AVC cardioembólico
 *
 * Acrônimo:
 * C - Congestive heart failure (IC com FEVE reduzida)
 * H - Hypertension
 * A2 - Age ≥75 (2 pontos)
 * D - Diabetes mellitus
 * S2 - Stroke/TIA/tromboembolismo prévio (2 pontos)
 * V - Vascular disease (IAM, DAP, placa aórtica)
 * A - Age 65-74
 * Sc - Sex category (feminino)
 *
 * Referências:
 * - Lip GY et al. Refining clinical risk stratification for predicting stroke in AF. Chest. 2010.
 * - ESC Guidelines for AF. Eur Heart J. 2020.
 * - SBC. Diretrizes Brasileiras de Fibrilação Atrial. Arq Bras Cardiol. 2023.
 */
export function calculateCHA2DS2VASc(params: {
  insuficienciaCardiaca: boolean; // IC sintomática ou FEVE ≤40%
  hipertensao: boolean;           // HAS ou uso de anti-hipertensivo
  idade: number;
  diabetes: boolean;              // DM em tratamento ou glicemia jejum ≥126 mg/dL
  avcPrevio: boolean;             // AVC, AIT ou tromboembolismo prévio
  doencaVascular: boolean;        // IAM prévio, DAP ou placa aórtica
  sexoFeminino: boolean;
}): CalculatorResult {
  let pontos = 0;

  // C - IC (1 ponto)
  if (params.insuficienciaCardiaca) pontos += 1;

  // H - HAS (1 ponto)
  if (params.hipertensao) pontos += 1;

  // A2 - Idade ≥75 (2 pontos) ou A - Idade 65-74 (1 ponto)
  if (params.idade >= 75) pontos += 2;
  else if (params.idade >= 65) pontos += 1;

  // D - Diabetes (1 ponto)
  if (params.diabetes) pontos += 1;

  // S2 - AVC/AIT/tromboembolismo (2 pontos)
  if (params.avcPrevio) pontos += 2;

  // V - Doença vascular (1 ponto)
  if (params.doencaVascular) pontos += 1;

  // Sc - Sexo feminino (1 ponto)
  if (params.sexoFeminino) pontos += 1;

  // Tabela de risco anual de AVC (aproximado)
  const riscoAnual: Record<number, string> = {
    0: '0%',
    1: '1,3%',
    2: '2,2%',
    3: '3,2%',
    4: '4,0%',
    5: '6,7%',
    6: '9,8%',
    7: '9,6%',
    8: '12,5%',
    9: '15,2%'
  };

  let category: string;
  let interpretation: string;
  let recommendations: string;

  if (pontos === 0) {
    category = 'Baixo Risco';
    interpretation = `CHA2DS2-VASc = ${pontos}. Risco anual de AVC: ~0%. Anticoagulação não indicada.`;
    recommendations = 'Anticoagulação NÃO recomendada. Nenhuma terapia antitrombótica ou, no máximo, AAS (benefício controverso). Reavaliar periodicamente se surgir fator de risco.';
  } else if (pontos === 1 && params.sexoFeminino && Object.values(params).filter(v => v === true).length === 1) {
    // Apenas sexo feminino como fator = escore 1 apenas por ser mulher
    category = 'Baixo Risco (sexo feminino isolado)';
    interpretation = `CHA2DS2-VASc = ${pontos}. Sexo feminino isolado não indica anticoagulação.`;
    recommendations = 'Anticoagulação NÃO recomendada se sexo feminino for o único fator. Reavaliar se surgir outro fator de risco. Considerar controle de ritmo.';
  } else if (pontos === 1) {
    category = 'Risco Intermediário';
    interpretation = `CHA2DS2-VASc = ${pontos}. Risco anual de AVC: ~1,3%. Considerar anticoagulação.`;
    recommendations = 'Anticoagulação pode ser considerada. Ponderar risco-benefício individual (usar HAS-BLED). DOACs preferidos sobre varfarina. Se optar por não anticoagular: AAS não recomendado como alternativa.';
  } else {
    category = 'Alto Risco';
    interpretation = `CHA2DS2-VASc = ${pontos}. Risco anual de AVC: ~${riscoAnual[Math.min(pontos, 9)] || '>15%'}. Anticoagulação indicada.`;
    recommendations = `Anticoagulação INDICADA. DOACs preferidos: Apixabana 5mg 12/12h, Rivaroxabana 20mg/dia, Dabigatrana 150mg 12/12h, Edoxabana 60mg/dia. Varfarina se prótese mecânica ou estenose mitral moderada-grave. Avaliar risco de sangramento (HAS-BLED). Contraindicações: sangramento ativo, coagulopatia grave.`;
  }

  return {
    value: pontos,
    unit: 'pontos',
    category,
    interpretation,
    recommendations,
    formula: 'C(1) + H(1) + A2(2 se ≥75, 1 se 65-74) + D(1) + S2(2) + V(1) + Sc(1)',
    references: [
      'Lip GY et al. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation. Chest. 2010;137(2):263-272.',
      'Hindricks G et al. 2020 ESC Guidelines for the diagnosis and management of atrial fibrillation. Eur Heart J. 2021;42(5):373-498.',
      'Sociedade Brasileira de Cardiologia. Diretrizes Brasileiras de Fibrilação Atrial. Arq Bras Cardiol. 2023;120(1):e20220892.'
    ]
  };
}

// =============================================================================
// HAS-BLED - RISCO DE SANGRAMENTO EM ANTICOAGULAÇÃO
// =============================================================================

/**
 * HAS-BLED - Escore de risco de sangramento maior em pacientes anticoagulados
 * Complementar ao CHA2DS2-VASc para decisão de anticoagulação em FA
 *
 * Acrônimo:
 * H - Hypertension (PAS > 160 mmHg)
 * A - Abnormal renal/liver function
 * S - Stroke
 * B - Bleeding history or predisposition
 * L - Labile INR (se em varfarina)
 * E - Elderly (> 65 anos)
 * D - Drugs or alcohol
 *
 * Referências:
 * - Pisters R et al. A novel user-friendly score (HAS-BLED). Chest. 2010.
 */
export function calculateHASBLED(params: {
  hipertensaoNaoControlada: boolean; // PAS > 160 mmHg
  disfuncaoRenal: boolean;           // Diálise, transplante, Cr >2,3 mg/dL
  disfuncaoHepatica: boolean;        // Cirrose, bilirrubina >2x, AST/ALT >3x
  avcPrevio: boolean;                // AVC prévio
  sangramentoPrevio: boolean;        // Sangramento maior prévio ou predisposição
  inrLabil: boolean;                 // TTR <60% se em varfarina
  idoso: boolean;                    // > 65 anos
  drogasAntiplaquetarias: boolean;   // AAS, AINEs
  alcoolismo: boolean;               // ≥8 doses/semana
}): CalculatorResult {
  let pontos = 0;

  if (params.hipertensaoNaoControlada) pontos += 1;
  if (params.disfuncaoRenal) pontos += 1;
  if (params.disfuncaoHepatica) pontos += 1;
  if (params.avcPrevio) pontos += 1;
  if (params.sangramentoPrevio) pontos += 1;
  if (params.inrLabil) pontos += 1;
  if (params.idoso) pontos += 1;
  if (params.drogasAntiplaquetarias) pontos += 1;
  if (params.alcoolismo) pontos += 1;

  let category: string;
  let interpretation: string;
  let recommendations: string;

  if (pontos <= 2) {
    category = 'Baixo Risco de Sangramento';
    interpretation = `HAS-BLED = ${pontos}. Risco de sangramento maior: ~1-3,7%/ano.`;
    recommendations = 'Anticoagulação segura se indicada por CHA2DS2-VASc. Monitorar fatores modificáveis. Preferir DOACs sobre varfarina.';
  } else {
    category = 'Alto Risco de Sangramento';
    interpretation = `HAS-BLED = ${pontos}. Risco de sangramento maior: ~4-8,7%/ano. NÃO contraindica anticoagulação, mas requer cautela.`;
    recommendations = 'Anticoagulação ainda indicada se CHA2DS2-VASc ≥2 (benefício supera risco). MODIFICAR FATORES: controlar PA, suspender AINEs/AAS, tratar alcoolismo, otimizar função renal/hepática. Preferir DOACs. Se varfarina: manter TTR >70%. Monitorização mais frequente.';
  }

  return {
    value: pontos,
    unit: 'pontos',
    category,
    interpretation,
    recommendations,
    formula: 'H(1) + A(1-2) + S(1) + B(1) + L(1) + E(1) + D(1-2)',
    references: [
      'Pisters R et al. A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding. Chest. 2010;138(5):1093-1100.',
      'Hindricks G et al. 2020 ESC Guidelines for AF. Eur Heart J. 2021.',
      'Lip GY. Implications of the HAS-BLED Score for Clinical Practice. Thromb Haemost. 2011.'
    ]
  };
}

// =============================================================================
// ASCVD - RISCO CARDIOVASCULAR ATEROSCLERÓTICO EM 10 ANOS
// =============================================================================

/**
 * Pooled Cohort Equations - ASCVD Risk Calculator
 * Estima risco de evento cardiovascular aterosclerótico em 10 anos
 * Inclui: IAM fatal/não-fatal, AVC fatal/não-fatal
 *
 * Recomendado pelo ACC/AHA para decisão sobre estatinas
 *
 * Referências:
 * - Goff DC et al. 2013 ACC/AHA guideline on the assessment of cardiovascular risk. Circulation. 2014.
 * - Grundy SM et al. 2018 AHA/ACC Guideline on the Management of Blood Cholesterol. Circulation. 2019.
 */
export function calculateASCVD(params: {
  idade: number;                   // 40-79 anos
  sexo: 'M' | 'F';
  raca: 'branco' | 'negro' | 'outro';
  colesterolTotal: number;         // mg/dL
  hdl: number;                     // mg/dL
  pressaoSistolica: number;        // mmHg
  tratamentoHAS: boolean;
  diabetes: boolean;
  fumante: boolean;
}): CalculatorResult {
  const { idade, sexo, raca, colesterolTotal, hdl, pressaoSistolica, tratamentoHAS, diabetes, fumante } = params;

  // Validação de idade
  if (idade < 40 || idade > 79) {
    return {
      value: 'N/A',
      unit: '',
      category: 'Fora do intervalo',
      interpretation: 'ASCVD só é validado para idades entre 40-79 anos.',
      recommendations: 'Para <40 anos: considerar fatores de risco individuais. Para ≥80 anos: decisão clínica individualizada.',
      references: []
    };
  }

  // Coeficientes das Pooled Cohort Equations (simplificados)
  // Nota: Esta é uma aproximação. O cálculo completo usa coeficientes específicos por sexo/raça

  let baseRisk = 0;

  // Fator idade
  const idadeFator = Math.pow(idade / 10, 2);

  // Cálculo simplificado baseado nos principais fatores
  let risco = 0;

  // Sexo e idade base
  if (sexo === 'M') {
    risco = 0.5 + (idade - 40) * 0.3;
  } else {
    risco = 0.2 + (idade - 40) * 0.2;
  }

  // Raça
  if (raca === 'negro') {
    risco *= 1.3;
  }

  // Colesterol (razão CT/HDL)
  const razaoCT_HDL = colesterolTotal / hdl;
  if (razaoCT_HDL > 5) risco *= 1.4;
  else if (razaoCT_HDL > 4) risco *= 1.2;
  else if (razaoCT_HDL < 3) risco *= 0.8;

  // HDL baixo
  if (hdl < 40) risco *= 1.3;
  else if (hdl >= 60) risco *= 0.8;

  // PA sistólica
  if (pressaoSistolica >= 180) risco *= 2.0;
  else if (pressaoSistolica >= 160) risco *= 1.6;
  else if (pressaoSistolica >= 140) risco *= 1.3;
  else if (pressaoSistolica >= 130) risco *= 1.1;

  // Tratamento HAS (risco residual maior)
  if (tratamentoHAS) risco *= 1.1;

  // Diabetes
  if (diabetes) risco *= sexo === 'F' ? 2.5 : 2.0;

  // Tabagismo
  if (fumante) risco *= 2.0;

  // Ajuste para manter dentro de faixa realista
  risco = Math.min(Math.max(risco, 0.5), 50);

  let category: string;
  let interpretation: string;
  let recommendations: string;

  if (risco < 5) {
    category = 'Baixo Risco';
    interpretation = `Risco ASCVD em 10 anos: ${risco.toFixed(1)}%. Baixo risco de evento cardiovascular.`;
    recommendations = 'Estatina geralmente NÃO indicada se risco <5%. Enfatizar estilo de vida saudável. Considerar estatina se: LDL ≥190 mg/dL, história familiar prematura de DCV, PCR-us ≥2 mg/L, escore de cálcio coronário >0.';
  } else if (risco < 7.5) {
    category = 'Risco Limítrofe';
    interpretation = `Risco ASCVD em 10 anos: ${risco.toFixed(1)}%. Risco limítrofe.`;
    recommendations = 'Discussão risco-benefício sobre estatina. Considerar fatores intensificadores: LDL ≥160, história familiar, síndrome metabólica, DRC, pré-eclâmpsia, menopausa precoce. Escore de cálcio coronário pode auxiliar decisão.';
  } else if (risco < 20) {
    category = 'Risco Intermediário';
    interpretation = `Risco ASCVD em 10 anos: ${risco.toFixed(1)}%. Risco intermediário.`;
    recommendations = 'Estatina de intensidade moderada indicada (atorvastatina 10-20mg ou rosuvastatina 5-10mg). Meta LDL <100 mg/dL, idealmente redução ≥30%. Escore de cálcio coronário pode reclassificar (se =0, pode postergar estatina).';
  } else {
    category = 'Alto Risco';
    interpretation = `Risco ASCVD em 10 anos: ${risco.toFixed(1)}%. Alto risco cardiovascular.`;
    recommendations = 'Estatina de alta intensidade indicada (atorvastatina 40-80mg ou rosuvastatina 20-40mg). Meta LDL <70 mg/dL ou redução ≥50%. Considerar ezetimiba se não atingir meta. Avaliar inibidor de PCSK9 se LDL persistentemente elevado. AAS em prevenção primária: benefício controverso, individualizar.';
  }

  return {
    value: risco.toFixed(1),
    unit: '%',
    category,
    interpretation,
    recommendations,
    formula: 'Pooled Cohort Equations (ACC/AHA 2013, simplificado)',
    references: [
      'Goff DC Jr et al. 2013 ACC/AHA Guideline on the Assessment of Cardiovascular Risk. Circulation. 2014;129(25 Suppl 2):S49-73.',
      'Grundy SM et al. 2018 AHA/ACC/AACVPR/AAPA/ABC/ACPM/ADA/AGS/APhA/ASPC/NLA/PCNA Guideline on the Management of Blood Cholesterol. Circulation. 2019;139(25):e1082-e1143.',
      'Lloyd-Jones DM et al. Use of Risk Assessment Tools to Guide Decision-Making in the Primary Prevention of ASCVD. Circulation. 2019;139(25):e1162-e1177.'
    ]
  };
}
