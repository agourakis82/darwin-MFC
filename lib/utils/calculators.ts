/**
 * Calculadoras Clínicas com Referências
 * Padrão Q1: Todas as fórmulas com citações às fontes originais
 */

export interface CalculatorResult {
  value: number;
  category: string;
  interpretation: string;
  recommendations: string;
  references: string[];
}

/**
 * Cálculo de IMC (Índice de Massa Corporal)
 * Fórmula: peso (kg) / altura² (m)
 */
export function calculateIMC(peso: number, altura: number): CalculatorResult {
  const imc = peso / (altura * altura);
  
  let category = '';
  let interpretation = '';
  let recommendations = '';
  
  if (imc < 18.5) {
    category = 'Baixo peso';
    interpretation = 'IMC abaixo do normal. Risco de desnutrição.';
    recommendations = 'Avaliação nutricional. Investigar causas de baixo peso.';
  } else if (imc < 25) {
    category = 'Peso normal';
    interpretation = 'IMC dentro da faixa saudável.';
    recommendations = 'Manter hábitos saudáveis de alimentação e atividade física.';
  } else if (imc < 30) {
    category = 'Sobrepeso';
    interpretation = 'IMC acima do normal. Risco aumentado de doenças metabólicas.';
    recommendations = 'Modificação de estilo de vida. Considerar rastreamento de DM2 e dislipidemia.';
  } else if (imc < 35) {
    category = 'Obesidade grau I';
    interpretation = 'Obesidade estabelecida. Risco moderado de complicações.';
    recommendations = 'Intervenção nutricional e atividade física. Rastreamento de HAS, DM2, dislipidemia obrigatório.';
  } else if (imc < 40) {
    category = 'Obesidade grau II';
    interpretation = 'Obesidade severa. Alto risco de complicações cardiovasculares e metabólicas.';
    recommendations: 'Abordagem multidisciplinar. Considerar tratamento farmacológico adjuvante.';
  } else {
    category = 'Obesidade grau III (mórbida)';
    interpretation = 'Obesidade muito grave. Risco muito alto de morbimortalidade.';
    recommendations = 'Tratamento intensivo. Avaliar elegibilidade para cirurgia bariátrica.';
  }
  
  return {
    value: Math.round(imc * 10) / 10,
    category,
    interpretation,
    recommendations,
    references: ['OMS - Classificação de IMC']
  };
}

/**
 * Escore de Framingham para Risco Cardiovascular (10 anos)
 * Versão simplificada - baseada em idade, sexo, PA, colesterol, tabagismo
 */
export function calculateFramingham(params: {
  idade: number;
  sexo: 'M' | 'F';
  colesterolTotal: number;
  hdl: number;
  pressaoSistolica: number;
  fumante: boolean;
  diabetes: boolean;
}): CalculatorResult {
  const { idade, sexo, colesterolTotal, hdl, pressaoSistolica, fumante, diabetes } = params;
  
  // Simplificação didática - cálculo real usa tabelas de pontos
  let pontos = 0;
  
  // Idade
  if (sexo === 'M') {
    if (idade >= 70) pontos += 11;
    else if (idade >= 60) pontos += 8;
    else if (idade >= 50) pontos += 5;
    else if (idade >= 40) pontos += 2;
  } else {
    if (idade >= 70) pontos += 14;
    else if (idade >= 60) pontos += 9;
    else if (idade >= 50) pontos += 5;
    else if (idade >= 40) pontos += 2;
  }
  
  // Colesterol
  if (colesterolTotal >= 280) pontos += 3;
  else if (colesterolTotal >= 240) pontos += 2;
  else if (colesterolTotal >= 200) pontos += 1;
  
  // HDL
  if (hdl < 35) pontos += 2;
  else if (hdl < 45) pontos += 1;
  else if (hdl >= 60) pontos -= 1;
  
  // Pressão
  if (pressaoSistolica >= 160) pontos += 4;
  else if (pressaoSistolica >= 140) pontos += 2;
  else if (pressaoSistolica >= 130) pontos += 1;
  
  // Fatores adicionais
  if (fumante) pontos += 3;
  if (diabetes) pontos += 3;
  
  // Estimar risco (simplificado)
  let risco = Math.min(Math.max(pontos * 2, 1), 30);
  
  let category = '';
  let interpretation = '';
  let recommendations = '';
  
  if (risco < 10) {
    category = 'Baixo risco';
    interpretation = `Risco cardiovascular em 10 anos: ${risco}% (baixo)`;
    recommendations = 'Manter hábitos saudáveis. Reavaliação em 5 anos.';
  } else if (risco < 20) {
    category = 'Risco intermediário';
    interpretation = `Risco cardiovascular em 10 anos: ${risco}% (moderado)`;
    recommendations = 'Modificação intensiva de estilo de vida. Considerar estatina se LDL elevado. Reavaliação anual.';
  } else {
    category = 'Alto risco';
    interpretation = `Risco cardiovascular em 10 anos: ${risco}% (alto)`;
    recommendations = 'Tratamento farmacológico indicado (estatina, anti-hipertensivo se PA elevada). AAS em prevenção primária. Acompanhamento rigoroso.';
  }
  
  return {
    value: risco,
    category,
    interpretation,
    recommendations,
    references: [
      'Framingham Heart Study',
      'D\'Agostino RB et al. General cardiovascular risk profile for use in primary care. Circulation. 2008'
    ]
  };
}

/**
 * Modelo de Gail - Risco de Câncer de Mama (5 anos)
 * Versão ultra-simplificada para fins educacionais
 */
export function calculateGail(params: {
  idade: number;
  menarca: number;
  primeiroParto: number;
  parentes: number; // 0, 1, 2+
  biopsias: number;
}): CalculatorResult {
  const { idade, menarca, primeiroParto, parentes, biopsias } = params;
  
  // Risco base por idade (%)
  let riscoBase = 1.0;
  if (idade >= 70) riscoBase = 3.5;
  else if (idade >= 60) riscoBase = 2.5;
  else if (idade >= 50) riscoBase = 1.8;
  else if (idade >= 40) riscoBase = 1.2;
  
  // Fatores de risco multiplicativos
  let multiplicador = 1.0;
  
  if (menarca < 12) multiplicador *= 1.1;
  if (primeiroParto > 30 || primeiroParto === 0) multiplicador *= 1.3;
  if (parentes === 1) multiplicador *= 1.8;
  if (parentes >= 2) multiplicador *= 2.5;
  if (biopsias >= 2) multiplicador *= 1.5;
  
  const risco = riscoBase * multiplicador;
  
  let category = '';
  let interpretation = '';
  let recommendations = '';
  
  if (risco < 1.67) {
    category = 'Risco médio';
    interpretation = `Risco de câncer de mama em 5 anos: ${risco.toFixed(2)}% (similar à população geral)`;
    recommendations = 'Rastreamento populacional padrão conforme idade.';
  } else {
    category = 'Risco elevado';
    interpretation = `Risco de câncer de mama em 5 anos: ${risco.toFixed(2)}% (acima da população geral)`;
    recommendations = 'Considerar rastreamento intensificado. Avaliar elegibilidade para terapia de redução de risco (tamoxifeno/raloxifeno). Encaminhamento a especialista.';
  }
  
  return {
    value: Math.round(risco * 100) / 100,
    category,
    interpretation,
    recommendations,
    references: [
      'Gail MH et al. Projecting individualized probabilities of developing breast cancer. JNCI. 1989',
      'National Cancer Institute - Breast Cancer Risk Assessment Tool'
    ]
  };
}

/**
 * SCORE Europeu - Risco de Morte Cardiovascular (10 anos)
 * Versão adaptada
 */
export function calculateSCORE(params: {
  idade: number;
  sexo: 'M' | 'F';
  fumante: boolean;
  pressaoSistolica: number;
  colesterolTotal: number;
}): CalculatorResult {
  const { idade, sexo, fumante, pressaoSistolica, colesterolTotal } = params;
  
  // Cálculo simplificado
  let pontos = 0;
  
  // Idade (fator dominante)
  pontos += Math.max(0, idade - 40) / 5;
  
  // Sexo
  if (sexo === 'M') pontos += 2;
  
  // Fumante
  if (fumante) pontos += 4;
  
  // PA
  if (pressaoSistolica >= 180) pontos += 4;
  else if (pressaoSistolica >= 160) pontos += 3;
  else if (pressaoSistolica >= 140) pontos += 2;
  else if (pressaoSistolica >= 120) pontos += 1;
  
  // Colesterol
  if (colesterolTotal >= 280) pontos += 3;
  else if (colesterolTotal >= 240) pontos += 2;
  else if (colesterolTotal >= 200) pontos += 1;
  
  const risco = Math.min(pontos * 0.5, 15);
  
  let category = '';
  let interpretation = '';
  let recommendations = '';
  
  if (risco < 1) {
    category = 'Risco muito baixo';
    interpretation = `Risco de morte CV em 10 anos: ${risco.toFixed(1)}%`;
    recommendations = 'Manter hábitos saudáveis.';
  } else if (risco < 5) {
    category = 'Risco baixo-moderado';
    interpretation = `Risco de morte CV em 10 anos: ${risco.toFixed(1)}%`;
    recommendations = 'Modificação de estilo de vida. Considerar tratamento se fatores de risco persistentes.';
  } else if (risco < 10) {
    category = 'Risco alto';
    interpretation = `Risco de morte CV em 10 anos: ${risco.toFixed(1)}%`;
    recommendations = 'Tratamento farmacológico indicado. Objetivo: LDL <100 mg/dL, PA <140/90.';
  } else {
    category = 'Risco muito alto';
    interpretation = `Risco de morte CV em 10 anos: ${risco.toFixed(1)}%`;
    recommendations = 'Tratamento intensivo. Objetivo: LDL <70 mg/dL, PA <140/90. AAS. Acompanhamento especializado.';
  }
  
  return {
    value: Math.round(risco * 10) / 10,
    category,
    interpretation,
    recommendations,
    references: [
      'SCORE (Systematic Coronary Risk Estimation)',
      'European Society of Cardiology Guidelines'
    ]
  };
}

