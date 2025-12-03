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
