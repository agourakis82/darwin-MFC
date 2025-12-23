/**
 * EXPANSÃO NEUROPSIQUIÁTRICA - DARWIN-MFC
 * ========================================
 *
 * Medicamentos neurológicos e psiquiátricos baseados na WHO Essential Medicines
 * e RENAME 2024
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosNeuropsiquiatricos: Partial<Medicamento>[] = [
  // ============================================================================
  // ANTICONVULSIVANTES
  // ============================================================================
  {
    id: 'carbamazepina',
    nomeGenerico: 'Carbamazepina',
    nomesComerciais: ['Tegretol', 'Tegretard'],
    atcCode: 'N03AF01',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'bloqueador_canal_sodio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '20mg/mL', disponivelSUS: true },
      { forma: 'comprimido_cr', concentracao: '200mg', disponivelSUS: false },
      { forma: 'comprimido_cr', concentracao: '400mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Epilepsia focal (primeira linha)',
      'Epilepsia generalizada tônico-clônica',
      'Neuralgia do trigêmeo',
      'Transtorno bipolar (estabilizador)',
      'Dor neuropática'
    ],
    mecanismoAcao: 'Bloqueia canais de sódio voltagem-dependentes. Estabiliza membranas neuronais hiperexcitadas. Também afeta GABA.',
    posologias: [
      {
        indicacao: 'Epilepsia',
        adultos: { dose: 'Inicial 100-200mg 2x/dia', frequencia: 'Aumentar 200mg/semana até 800-1200mg/dia', doseMaxima: '1600mg/dia' },
        pediatrico: { dose: '10-20mg/kg/dia', frequencia: '2-3x/dia', doseMaxima: '35mg/kg/dia' }
      },
      {
        indicacao: 'Neuralgia trigêmeo',
        adultos: { dose: 'Inicial 100mg 2x/dia', frequencia: 'Aumentar até 600-1200mg/dia' }
      }
    ],
    contraindicacoes: ['BAV', 'Porfiria', 'Histórico aplasia medular', 'Uso de IMAO'],
    precaucoes: ['HLA-B*1502 (asiáticos) - risco SJS', 'Induz próprio metabolismo', 'Monitorar hemograma'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Sonolência', 'Ataxia', 'Diplopia', 'Náusea'],
      graves: ['Agranulocitose', 'Anemia aplástica', 'SJS/NET', 'Hepatotoxicidade', 'Hiponatremia']
    },
    interacoes: [
      { medicamento: 'Contraceptivos orais', gravidade: 'grave', efeito: 'Redução eficácia contraceptiva (CYP3A4)', conduta: 'Usar método adicional ou DIU' },
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Redução INR', conduta: 'Monitorar e ajustar' },
      { medicamento: 'Fenitoína', gravidade: 'moderada', efeito: 'Interação complexa (indução mútua)', conduta: 'Monitorar níveis' },
      { medicamento: 'Eritromicina', gravidade: 'grave', efeito: 'Aumento níveis CBZ', conduta: 'Evitar ou reduzir CBZ' }
    ],
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: 'Sem ajuste' },
      { tfg: '15-30', ajuste: 'Sem ajuste' },
      { tfg: '<15', ajuste: 'Cautela' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível com monitoramento do lactente' }
  },

  {
    id: 'valproato-sodio',
    nomeGenerico: 'Valproato de Sódio',
    nomesComerciais: ['Depakene', 'Depakote', 'Torval'],
    atcCode: 'N03AG01',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'acido_valproico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '50mg/mL', disponivelSUS: true },
      { forma: 'comprimido_er', concentracao: '250mg', disponivelSUS: false },
      { forma: 'comprimido_er', concentracao: '500mg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '100mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Epilepsia generalizada (primeira linha)',
      'Crises de ausência',
      'Epilepsia mioclônica juvenil',
      'Transtorno bipolar',
      'Profilaxia enxaqueca'
    ],
    mecanismoAcao: 'Múltiplos mecanismos: aumenta GABA, bloqueia canais de sódio e cálcio T. Espectro amplo.',
    posologias: [
      {
        indicacao: 'Epilepsia',
        adultos: { dose: 'Inicial 250-500mg 2x/dia', frequencia: 'Aumentar até 1000-3000mg/dia', doseMaxima: '60mg/kg/dia' },
        pediatrico: { dose: '15-45mg/kg/dia', frequencia: '2-3x/dia' }
      },
      {
        indicacao: 'Bipolar',
        adultos: { dose: '750-2000mg/dia', frequencia: '2-3x/dia', observacoes: 'Nível sérico 50-125mcg/mL' }
      },
      {
        indicacao: 'Enxaqueca profilaxia',
        adultos: { dose: '500-1500mg/dia', frequencia: '2x/dia' }
      }
    ],
    contraindicacoes: ['Hepatopatia grave', 'Disfunção mitocondrial', 'Gestação (especialmente 1º trimestre)', 'Ciclo de ureia'],
    precaucoes: ['Monitorar função hepática', 'Risco de SOP em mulheres jovens', 'Trombocitopenia'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Ganho peso', 'Tremor', 'Alopecia', 'Trombocitopenia'],
      graves: ['Hepatotoxicidade fulminante', 'Pancreatite', 'Teratogenicidade (espinha bífida)', 'Hiperamonemia']
    },
    interacoes: [
      { medicamento: 'Lamotrigina', gravidade: 'grave', efeito: 'Dobra níveis de lamotrigina', conduta: 'Reduzir lamotrigina pela metade' },
      { medicamento: 'Carbapenêmicos', gravidade: 'grave', efeito: 'Reduz 60-100% níveis VPA', conduta: 'Contraindicado' },
      { medicamento: 'Aspirina', gravidade: 'moderada', efeito: 'Aumenta fração livre VPA', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: 'Sem ajuste' },
      { tfg: '15-30', ajuste: 'Reduzir dose' },
      { tfg: '<15', ajuste: 'Reduzir dose significativamente' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: true, observacao: 'Compatível com monitoramento' }
  },

  {
    id: 'lamotrigina',
    nomeGenerico: 'Lamotrigina',
    nomesComerciais: ['Lamictal', 'Neural', 'Neurium'],
    atcCode: 'N03AX09',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'bloqueador_canal_sodio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido_dispersivel', concentracao: '25mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Epilepsia focal',
      'Epilepsia generalizada',
      'Síndrome de Lennox-Gastaut',
      'Transtorno bipolar (manutenção)',
      'Preferida em mulheres em idade fértil'
    ],
    mecanismoAcao: 'Bloqueia canais de sódio e cálcio voltagem-dependentes. Inibe liberação de glutamato.',
    posologias: [
      {
        indicacao: 'Epilepsia (monoterapia)',
        adultos: { dose: 'Semanas 1-2: 25mg/dia, Sem 3-4: 50mg/dia, depois aumentar 50-100mg/sem', frequencia: '1-2x/dia', doseMaxima: '500mg/dia' }
      },
      {
        indicacao: 'Com valproato',
        adultos: { dose: 'Semanas 1-2: 25mg em dias alternados', frequencia: 'Dobrar a cada 2 semanas', doseMaxima: '200mg/dia', observacoes: 'Titulação muito lenta obrigatória' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Titulação MUITO LENTA (risco rash)', 'Insuficiência hepática/renal'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Tontura', 'Diplopia', 'Ataxia', 'Náusea'],
      graves: ['Rash grave (SJS/NET) - 1%', 'Necrólise epidérmica tóxica', 'Meningite asséptica', 'Discrasias sanguíneas']
    },
    interacoes: [
      { medicamento: 'Valproato', gravidade: 'grave', efeito: 'Dobra níveis lamotrigina (risco SJS)', conduta: 'Reduzir dose LTG pela metade' },
      { medicamento: 'Carbamazepina', gravidade: 'moderada', efeito: 'Reduz níveis LTG pela metade', conduta: 'Aumentar dose LTG' },
      { medicamento: 'Contraceptivos orais', gravidade: 'moderada', efeito: 'Reduzem níveis LTG', conduta: 'Ajustar dose na pausa do CO' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Níveis no lactente podem ser significativos. Monitorar.' }
  },

  {
    id: 'levetiracetam',
    nomeGenerico: 'Levetiracetam',
    nomesComerciais: ['Keppra', 'Kopodex'],
    atcCode: 'N03AX14',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'ligante_sv2a',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '750mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1000mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '100mg/mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '100mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Epilepsia focal (primeira linha)',
      'Epilepsia mioclônica juvenil',
      'Crises tônico-clônicas generalizadas',
      'Status epilepticus',
      'Preferido em idosos e politerapia'
    ],
    mecanismoAcao: 'Liga-se à proteína SV2A da vesícula sináptica. Modula liberação de neurotransmissores.',
    posologias: [
      {
        indicacao: 'Epilepsia',
        adultos: { dose: 'Inicial 500mg 2x/dia', frequencia: 'Aumentar 500mg/2 semanas até 1500mg 2x/dia', doseMaxima: '3000mg/dia' },
        pediatrico: { dose: '20-60mg/kg/dia', frequencia: '2x/dia' }
      },
      {
        indicacao: 'Status epilepticus',
        adultos: { dose: '60mg/kg IV', frequencia: 'Dose única em 15 min', doseMaxima: '4500mg' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Ajustar em insuficiência renal', 'Efeitos psiquiátricos (irritabilidade, depressão)'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Astenia', 'Tontura', 'Irritabilidade', 'Mudanças comportamentais'],
      graves: ['Ideação suicida', 'Psicose', 'Angioedema', 'SJS (raro)']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Competição eliminação renal', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: '250-750mg 2x/dia' },
      { tfg: '15-30', ajuste: '250-500mg 2x/dia' },
      { tfg: '<15', ajuste: '250-500mg 1x/dia' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' }
  },

  {
    id: 'topiramato',
    nomeGenerico: 'Topiramato',
    nomesComerciais: ['Topamax', 'Amato'],
    atcCode: 'N03AX11',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'multiplos_mecanismos',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'capsula_sprinkle', concentracao: '15mg', disponivelSUS: false },
      { forma: 'capsula_sprinkle', concentracao: '25mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Epilepsia focal',
      'Epilepsia generalizada',
      'Síndrome de Lennox-Gastaut',
      'Profilaxia enxaqueca',
      'Obesidade (associado a fentermina)'
    ],
    mecanismoAcao: 'Múltiplos: bloqueia canais Na e Ca, potencializa GABA, inibe receptores AMPA/kainato, inibe anidrase carbônica.',
    posologias: [
      {
        indicacao: 'Epilepsia',
        adultos: { dose: 'Inicial 25-50mg/dia', frequencia: 'Aumentar 25-50mg/semana até 200-400mg/dia em 2 doses', doseMaxima: '600mg/dia' },
        pediatrico: { dose: '1-3mg/kg/dia inicial', frequencia: 'Aumentar até 5-9mg/kg/dia' }
      },
      {
        indicacao: 'Enxaqueca profilaxia',
        adultos: { dose: '25mg à noite inicial', frequencia: 'Aumentar até 50-100mg/dia' }
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'Nefrolitíase recorrente'],
    precaucoes: ['Hidratação adequada (nefrolitíase)', 'Acidose metabólica', 'Oligohidrose (crianças)'],
    efeitosAdversos: {
      comuns: ['Parestesias', 'Perda peso', 'Alteração paladar', 'Dificuldade concentração', 'Dificuldade palavras'],
      graves: ['Nefrolitíase', 'Glaucoma agudo', 'Acidose metabólica', 'Oligohidrose/hipertermia']
    },
    interacoes: [
      { medicamento: 'Contraceptivos orais', gravidade: 'grave', efeito: 'Redução eficácia (doses >200mg/dia)', conduta: 'Método adicional' },
      { medicamento: 'Metformina', gravidade: 'moderada', efeito: 'Aumenta metformina', conduta: 'Monitorar glicemia' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar. Excreção no leite e efeitos cognitivos.' }
  },

  // ============================================================================
  // ANTIDEPRESSIVOS ISRS
  // ============================================================================
  {
    id: 'fluoxetina',
    nomeGenerico: 'Fluoxetina',
    nomesComerciais: ['Prozac', 'Daforin', 'Verotina'],
    atcCode: 'N06AB03',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '20mg/5mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Depressão maior',
      'Transtorno obsessivo-compulsivo',
      'Bulimia nervosa',
      'Transtorno do pânico',
      'TEPT'
    ],
    mecanismoAcao: 'Inibidor seletivo da recaptação de serotonina. Meia-vida longa (4-6 dias; metabólito ativo até 16 dias).',
    posologias: [
      {
        indicacao: 'Depressão',
        adultos: { dose: '20mg', frequencia: '1x/dia pela manhã', doseMaxima: '80mg/dia' },
        pediatrico: { dose: '10-20mg', frequencia: '1x/dia', observacoes: '>8 anos, risco suicídio inicial' }
      },
      {
        indicacao: 'TOC',
        adultos: { dose: '20-60mg', frequencia: '1x/dia', doseMaxima: '80mg/dia', observacoes: 'Doses mais altas que depressão' }
      },
      {
        indicacao: 'Bulimia',
        adultos: { dose: '60mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Uso de IMAO (14 dias)', 'Uso de pimozida', 'Uso de tioridazina'],
    precaucoes: ['Ideação suicida inicial', 'Mania em bipolares', 'Hiponatremia (idosos)', 'Sangramento'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Insônia', 'Cefaleia', 'Ansiedade inicial', 'Disfunção sexual'],
      graves: ['Síndrome serotoninérgica', 'Prolongamento QT (doses altas)', 'SIADH', 'Sangramento GI']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica fatal', conduta: 'Intervalo mínimo 5 semanas após fluoxetina' },
      { medicamento: 'Tramadol', gravidade: 'grave', efeito: 'Risco serotoninérgico + convulsões', conduta: 'Evitar ou reduzir tramadol' },
      { medicamento: 'Tamoxifeno', gravidade: 'grave', efeito: 'Inibe CYP2D6, reduz endoxifeno', conduta: 'Contraindicado' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumento sangramento', conduta: 'Monitorar INR' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Preferir outros ISRS (sertralina)' }
  },

  {
    id: 'sertralina',
    nomeGenerico: 'Sertralina',
    nomesComerciais: ['Zoloft', 'Assert', 'Tolrest'],
    atcCode: 'N06AB06',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Depressão maior',
      'TOC',
      'Transtorno do pânico',
      'TEPT',
      'Fobia social',
      'TDPM'
    ],
    mecanismoAcao: 'ISRS com leve ação dopaminérgica. Meia-vida 26h. Primeira escolha em muitas situações.',
    posologias: [
      {
        indicacao: 'Depressão/Ansiedade',
        adultos: { dose: '50mg', frequencia: '1x/dia', doseMaxima: '200mg/dia' },
        pediatrico: { dose: '25mg inicial (TOC)', frequencia: '1x/dia', observacoes: '>6 anos para TOC' }
      },
      {
        indicacao: 'TEPT',
        adultos: { dose: '25-50mg inicial', frequencia: '1x/dia', doseMaxima: '200mg/dia' }
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Uso concomitante de pimozida'],
    precaucoes: ['Ideação suicida inicial', 'Sangramento', 'Mania em bipolares'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Diarreia', 'Cefaleia', 'Insônia', 'Disfunção sexual'],
      graves: ['Síndrome serotoninérgica', 'Prolongamento QT (raro)', 'SIADH']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo 14 dias' },
      { medicamento: 'Pimozida', gravidade: 'grave', efeito: 'Aumento pimozida e prolongamento QT', conduta: 'Contraindicado' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'ISRS de escolha na amamentação' }
  },

  {
    id: 'escitalopram',
    nomeGenerico: 'Escitalopram',
    nomesComerciais: ['Lexapro', 'Reconter', 'Exodus'],
    atcCode: 'N06AB10',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'gotas', concentracao: '20mg/mL', disponivelSUS: false }
    ],
    indicacoes: ['Depressão maior', 'TAG', 'Transtorno do pânico', 'TOC', 'Fobia social'],
    mecanismoAcao: 'Enantiômero S ativo do citalopram. ISRS mais seletivo. Boa tolerabilidade.',
    posologias: [
      {
        indicacao: 'Depressão/Ansiedade',
        adultos: { dose: '10mg', frequencia: '1x/dia', doseMaxima: '20mg/dia' },
        pediatrico: { dose: '10mg', frequencia: '1x/dia', observacoes: '>12 anos' }
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Prolongamento QT congênito', 'Uso de pimozida'],
    precaucoes: ['QT prolongado dose-dependente', 'Máximo 10mg em idosos e hepatopatas'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Cefaleia', 'Insônia ou sonolência', 'Disfunção sexual'],
      graves: ['Prolongamento QT dose-dependente', 'Síndrome serotoninérgica', 'SIADH']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo 14 dias' },
      { medicamento: 'QT prolongadores', gravidade: 'grave', efeito: 'Prolongamento QT aditivo', conduta: 'Evitar combinação' },
      { medicamento: 'Omeprazol', gravidade: 'moderada', efeito: 'Aumento escitalopram', conduta: 'Máximo 10mg' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  // ============================================================================
  // ANTIDEPRESSIVOS DUAIS (IRSN)
  // ============================================================================
  {
    id: 'venlafaxina',
    nomeGenerico: 'Venlafaxina',
    nomesComerciais: ['Efexor', 'Venlift', 'Alenthus'],
    atcCode: 'N06AX16',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'irsn',
    rename: true,
    apresentacoes: [
      { forma: 'capsula_xr', concentracao: '75mg', disponivelSUS: true },
      { forma: 'capsula_xr', concentracao: '150mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '37,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Depressão maior',
      'TAG',
      'Transtorno do pânico',
      'Fobia social',
      'Dor neuropática',
      'Fogachos menopausa'
    ],
    mecanismoAcao: 'Inibe recaptação de serotonina (doses baixas) e norepinefrina (doses altas >150mg). Efeito dose-dependente.',
    posologias: [
      {
        indicacao: 'Depressão',
        adultos: { dose: '75mg XR', frequencia: '1x/dia com alimento', doseMaxima: '225mg/dia ambulatorial, 375mg hospitalar' }
      },
      {
        indicacao: 'TAG',
        adultos: { dose: '75-225mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Uso de IMAO (14 dias)', 'Hipertensão não controlada'],
    precaucoes: ['Monitorar PA (doses altas)', 'Síndrome descontinuação severa', 'Glaucoma de ângulo fechado'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Cefaleia', 'Insônia', 'Boca seca', 'Sudorese', 'Disfunção sexual'],
      graves: ['Hipertensão (dose-dependente)', 'Síndrome serotoninérgica', 'Sangramento', 'Síndrome descontinuação']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo 14 dias' },
      { medicamento: 'Tramadol', gravidade: 'grave', efeito: 'Síndrome serotoninérgica + convulsões', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Com cautela. Preferir sertralina.' }
  },

  {
    id: 'duloxetina',
    nomeGenerico: 'Duloxetina',
    nomesComerciais: ['Cymbalta', 'Velija', 'Dual'],
    atcCode: 'N06AX21',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'irsn',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '30mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '60mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Depressão maior',
      'TAG',
      'Fibromialgia',
      'Dor neuropática diabética',
      'Dor musculoesquelética crônica',
      'Incontinência urinária de esforço'
    ],
    mecanismoAcao: 'IRSN balanceado. Inibe recaptação de serotonina e norepinefrina igualmente em todas as doses.',
    posologias: [
      {
        indicacao: 'Depressão/TAG',
        adultos: { dose: '60mg', frequencia: '1x/dia', doseMaxima: '120mg/dia', observacoes: 'Iniciar com 30mg por 1 semana' }
      },
      {
        indicacao: 'Fibromialgia',
        adultos: { dose: '60mg', frequencia: '1x/dia', observacoes: 'Iniciar 30mg/dia' }
      },
      {
        indicacao: 'Neuropatia diabética',
        adultos: { dose: '60mg', frequencia: '1x/dia', doseMaxima: '120mg/dia' }
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Insuficiência hepática', 'Uso de tioridazina', 'ClCr <30mL/min'],
    precaucoes: ['Hepatotoxicidade (monitorar enzimas)', 'Aumento PA', 'Glaucoma'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Boca seca', 'Constipação', 'Sonolência', 'Fadiga'],
      graves: ['Hepatotoxicidade', 'Síndrome serotoninérgica', 'Reação cutânea grave', 'Síndrome descontinuação']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo 14 dias' },
      { medicamento: 'Inibidores CYP1A2', gravidade: 'grave', efeito: 'Aumento duloxetina 5x (fluvoxamina)', conduta: 'Evitar fluvoxamina' },
      { medicamento: 'Tioridazina', gravidade: 'grave', efeito: 'Aumento tioridazina, arritmias', conduta: 'Contraindicado' }
    ],
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: 'Sem ajuste' },
      { tfg: '15-30', ajuste: 'Evitar' },
      { tfg: '<15', ajuste: 'Contraindicado' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados limitados. Preferir outros.' }
  },

  // ============================================================================
  // ANTIPSICÓTICOS ATÍPICOS
  // ============================================================================
  {
    id: 'risperidona',
    nomeGenerico: 'Risperidona',
    nomesComerciais: ['Risperdal', 'Respidon', 'Zargus'],
    atcCode: 'N05AX08',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'atipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '3mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '1mg/mL', disponivelSUS: true },
      { forma: 'injetavel_longa_acao', concentracao: '25mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Esquizofrenia',
      'Transtorno bipolar (mania)',
      'Irritabilidade no autismo',
      'Transtorno de conduta',
      'Demência com agitação (uso criterioso)'
    ],
    mecanismoAcao: 'Antagonista D2 e 5-HT2A. Baixo risco EPS em doses baixas. Potente antagonismo alfa-1 (hipotensão).',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: { dose: '2mg inicial', frequencia: '1-2x/dia', doseMaxima: '8mg/dia', observacoes: 'Dose usual 4-6mg/dia' }
      },
      {
        indicacao: 'Bipolar mania',
        adultos: { dose: '2-3mg', frequencia: '1x/dia à noite', doseMaxima: '6mg/dia' }
      },
      {
        indicacao: 'Autismo irritabilidade',
        adultos: { dose: '0,5-1mg', frequencia: '1x/dia' },
        pediatrico: { dose: '0,25mg inicial (<20kg) ou 0,5mg (≥20kg)', frequencia: '1x/dia', doseMaxima: '1-2,5mg/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a paliperidona'],
    precaucoes: ['Hiperprolactinemia', 'Ganho de peso', 'EPS (doses altas)', 'Idosos com demência (mortalidade)'],
    efeitosAdversos: {
      comuns: ['Sedação', 'Ganho peso', 'Hiperprolactinemia', 'Hipotensão ortostática', 'Acatisia'],
      graves: ['Síndrome neuroléptica maligna', 'Discinesia tardia', 'AVC em idosos demência', 'Cetoacidose diabética']
    },
    interacoes: [
      { medicamento: 'Carbamazepina', gravidade: 'moderada', efeito: 'Reduz risperidona 50%', conduta: 'Aumentar dose risperidona' },
      { medicamento: 'Fluoxetina', gravidade: 'moderada', efeito: 'Aumenta risperidona', conduta: 'Pode necessitar redução' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excreção significativa no leite' }
  },

  {
    id: 'quetiapina',
    nomeGenerico: 'Quetiapina',
    nomesComerciais: ['Seroquel', 'Queropax', 'Quetiel'],
    atcCode: 'N05AH04',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'atipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
      { forma: 'comprimido_xr', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '200mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '300mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Esquizofrenia',
      'Transtorno bipolar (mania e depressão)',
      'Depressão unipolar (adjuvante)',
      'Insônia (off-label, doses baixas)',
      'TAG (off-label)'
    ],
    mecanismoAcao: 'Antagonista D2, 5-HT2A, H1, alfa-1. Mínimo EPS. Metabólito norquetiapina tem ação noradrenérgica.',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: { dose: 'Dia 1: 50mg, Dia 2: 100mg, Dia 3: 200mg, Dia 4: 300mg', frequencia: '2x/dia', doseMaxima: '800mg/dia' }
      },
      {
        indicacao: 'Bipolar depressão',
        adultos: { dose: '50mg à noite, aumentar para 300mg', frequencia: '1x/dia à noite' }
      },
      {
        indicacao: 'Insônia (off-label)',
        adultos: { dose: '25-100mg', frequencia: 'à noite' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Síndrome metabólica', 'Sedação intensa', 'Hipotensão ortostática', 'Catarata (monitorar)'],
    efeitosAdversos: {
      comuns: ['Sedação intensa', 'Ganho peso', 'Hipotensão ortostática', 'Boca seca', 'Constipação'],
      graves: ['Síndrome metabólica', 'Diabetes', 'Síndrome neuroléptica maligna', 'Prolongamento QT']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4', gravidade: 'grave', efeito: 'Aumento quetiapina', conduta: 'Reduzir dose quetiapina' },
      { medicamento: 'Carbamazepina/Fenitoína', gravidade: 'grave', efeito: 'Redução 80% quetiapina', conduta: 'Aumentar quetiapina 5x' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar. Sedação no lactente.' }
  },

  {
    id: 'olanzapina',
    nomeGenerico: 'Olanzapina',
    nomesComerciais: ['Zyprexa', 'Zyprexa Zydis', 'Zalasta'],
    atcCode: 'N05AH03',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'atipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido_orodispersivel', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido_orodispersivel', concentracao: '10mg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '10mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Esquizofrenia',
      'Transtorno bipolar (mania, manutenção)',
      'Agitação psicótica aguda (IM)',
      'Depressão bipolar (com fluoxetina)',
      'Náusea refratária (off-label)'
    ],
    mecanismoAcao: 'Antagonista multimodal: D2, 5-HT2A, H1, M1, alfa-1. Alto risco metabólico.',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: { dose: '10mg', frequencia: '1x/dia à noite', doseMaxima: '20mg/dia' }
      },
      {
        indicacao: 'Mania bipolar',
        adultos: { dose: '10-15mg', frequencia: '1x/dia', doseMaxima: '20mg/dia' }
      },
      {
        indicacao: 'Agitação aguda IM',
        adultos: { dose: '10mg IM', frequencia: 'Pode repetir 2h, máx 3 doses/dia', doseMaxima: '30mg/dia' }
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado'],
    precaucoes: ['Ganho peso severo', 'Diabetes', 'Dislipidemia', 'Monitorar glicemia/lipídeos'],
    efeitosAdversos: {
      comuns: ['Ganho peso (média 4kg em 10 semanas)', 'Sedação', 'Hipotensão', 'Boca seca', 'Constipação'],
      graves: ['Síndrome metabólica', 'Diabetes', 'Síndrome neuroléptica maligna', 'Pancreatite']
    },
    interacoes: [
      { medicamento: 'Fluvoxamina', gravidade: 'grave', efeito: 'Dobra níveis olanzapina', conduta: 'Reduzir olanzapina pela metade' },
      { medicamento: 'Carbamazepina', gravidade: 'moderada', efeito: 'Reduz olanzapina 50%', conduta: 'Aumentar dose' },
      { medicamento: 'Benzodiazepínicos IM', gravidade: 'grave', efeito: 'Depressão cardiorrespiratória', conduta: 'Não administrar IM juntos' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excreção significativa. Sedação e ganho peso no lactente.' }
  },

  {
    id: 'aripiprazol',
    nomeGenerico: 'Aripiprazol',
    nomesComerciais: ['Abilify', 'Aristab'],
    atcCode: 'N05AX12',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'atipico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '1mg/mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Esquizofrenia',
      'Transtorno bipolar (mania, manutenção)',
      'Depressão unipolar (adjuvante)',
      'Irritabilidade no autismo',
      'Síndrome de Tourette'
    ],
    mecanismoAcao: 'Agonista parcial D2 e 5-HT1A, antagonista 5-HT2A. Estabilizador dopaminérgico. Baixo risco metabólico.',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: { dose: '10-15mg', frequencia: '1x/dia', doseMaxima: '30mg/dia' }
      },
      {
        indicacao: 'Bipolar mania',
        adultos: { dose: '15mg', frequencia: '1x/dia', doseMaxima: '30mg/dia' }
      },
      {
        indicacao: 'Depressão adjuvante',
        adultos: { dose: '2-5mg inicial', frequencia: '1x/dia', doseMaxima: '15mg/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Acatisia frequente', 'Insônia', 'Pode ativar mania'],
    efeitosAdversos: {
      comuns: ['Acatisia', 'Insônia', 'Náusea', 'Cefaleia', 'Ansiedade'],
      graves: ['Síndrome neuroléptica maligna', 'Discinesia tardia', 'Compulsões (jogo, compras, sexo)']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP2D6', gravidade: 'moderada', efeito: 'Aumento aripiprazol', conduta: 'Reduzir dose pela metade' },
      { medicamento: 'Indutores CYP3A4', gravidade: 'moderada', efeito: 'Redução aripiprazol', conduta: 'Dobrar dose' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados limitados. Evitar.' }
  },

  // ============================================================================
  // BENZODIAZEPÍNICOS
  // ============================================================================
  {
    id: 'diazepam',
    nomeGenerico: 'Diazepam',
    nomesComerciais: ['Valium', 'Dienpax', 'Compaz'],
    atcCode: 'N05BA01',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '5mg/mL', disponivelSUS: true },
      { forma: 'solucao_retal', concentracao: '5mg/mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Ansiedade',
      'Status epilepticus',
      'Convulsão febril',
      'Espasticidade',
      'Abstinência alcoólica',
      'Pré-procedimentos'
    ],
    mecanismoAcao: 'Potencializa GABA-A. Meia-vida longa (20-100h). Metabólitos ativos (desmetildiazepam 50-100h).',
    posologias: [
      {
        indicacao: 'Ansiedade',
        adultos: { dose: '5-10mg', frequencia: '2-3x/dia', doseMaxima: '40mg/dia' }
      },
      {
        indicacao: 'Status epilepticus',
        adultos: { dose: '10mg IV', frequencia: 'Pode repetir em 5-10 min', doseMaxima: '30mg' },
        pediatrico: { dose: '0,2-0,5mg/kg IV ou 0,5mg/kg retal', frequencia: 'Pode repetir', doseMaxima: '10mg' }
      },
      {
        indicacao: 'Abstinência álcool',
        adultos: { dose: '10-20mg', frequencia: 'A cada 1-4h conforme CIWA', observacoes: 'Reduzir conforme melhora' }
      }
    ],
    contraindicacoes: ['Miastenia gravis', 'Insuficiência respiratória grave', 'Apneia do sono', 'Glaucoma ângulo fechado'],
    precaucoes: ['Dependência (uso >2-4 semanas)', 'Idosos', 'Hepatopatas', 'Depressão respiratória'],
    efeitosAdversos: {
      comuns: ['Sedação', 'Ataxia', 'Confusão', 'Amnésia anterógrada'],
      graves: ['Depressão respiratória', 'Dependência', 'Reação paradoxal', 'Síndrome abstinência']
    },
    interacoes: [
      { medicamento: 'Opioides', gravidade: 'grave', efeito: 'Depressão respiratória aditiva', conduta: 'Evitar ou reduzir ambas doses' },
      { medicamento: 'Álcool', gravidade: 'grave', efeito: 'Depressão SNC aditiva', conduta: 'Evitar álcool' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar. Sedação e acúmulo no lactente.' }
  },

  {
    id: 'clonazepam',
    nomeGenerico: 'Clonazepam',
    nomesComerciais: ['Rivotril', 'Clopam', 'Navotrax'],
    atcCode: 'N03AE01',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '2,5mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Epilepsia (crises mioclônicas, ausência)',
      'Transtorno do pânico',
      'Fobia social',
      'Ansiedade generalizada',
      'Síndrome das pernas inquietas',
      'Distúrbios do sono REM'
    ],
    mecanismoAcao: 'Benzodiazepínico potente. Potencializa GABA-A. Meia-vida 30-40h.',
    posologias: [
      {
        indicacao: 'Transtorno pânico',
        adultos: { dose: '0,25-0,5mg', frequencia: '2x/dia', doseMaxima: '4mg/dia', observacoes: 'Aumentar 0,5mg a cada 3 dias' }
      },
      {
        indicacao: 'Epilepsia',
        adultos: { dose: '0,5mg', frequencia: '3x/dia', doseMaxima: '20mg/dia' },
        pediatrico: { dose: '0,01-0,03mg/kg/dia', frequencia: '2-3x/dia', doseMaxima: '0,1-0,2mg/kg/dia' }
      }
    ],
    contraindicacoes: ['Miastenia gravis', 'Insuficiência respiratória grave', 'Glaucoma ângulo fechado'],
    precaucoes: ['Alto potencial de dependência', 'Não usar >4 semanas (ansiedade)', 'Idosos'],
    efeitosAdversos: {
      comuns: ['Sedação', 'Tontura', 'Ataxia', 'Depressão'],
      graves: ['Dependência', 'Síndrome abstinência', 'Depressão respiratória', 'Ideação suicida']
    },
    interacoes: [
      { medicamento: 'Opioides', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Evitar combinação' },
      { medicamento: 'Álcool', gravidade: 'grave', efeito: 'Depressão SNC', conduta: 'Evitar' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar. Sedação no lactente.' }
  },

  // ============================================================================
  // ESTABILIZADORES DO HUMOR
  // ============================================================================
  {
    id: 'litio',
    nomeGenerico: 'Carbonato de Lítio',
    nomesComerciais: ['Carbolitium', 'Litiocar'],
    atcCode: 'N05AN01',
    classeTerapeutica: 'estabilizador_humor',
    subclasse: 'litio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
      { forma: 'comprimido_cr', concentracao: '450mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Transtorno bipolar (mania, manutenção, depressão)',
      'Prevenção suicídio (único comprovado)',
      'Depressão unipolar (potencialização)',
      'Cefaleia em salvas (profilaxia)'
    ],
    mecanismoAcao: 'Múltiplos: modula GSK-3beta, inositol, neurotrofinas (BDNF). Efeitos em 1-3 semanas.',
    posologias: [
      {
        indicacao: 'Bipolar',
        adultos: { dose: '300mg 2-3x/dia inicial', frequencia: 'Ajustar para nível sérico 0,6-1,2mEq/L', observacoes: 'Manutenção 0,6-0,8mEq/L' }
      }
    ],
    contraindicacoes: ['Insuficiência renal grave', 'Desidratação grave', 'Depleção de sódio', 'Hipotireoidismo não tratado'],
    precaucoes: ['Índice terapêutico estreito', 'Monitorar função renal e tireoidiana', 'Hidratação adequada'],
    efeitosAdversos: {
      comuns: ['Tremor fino', 'Poliúria/polidipsia', 'Ganho peso', 'Náusea', 'Diarreia'],
      graves: ['Intoxicação (>1,5mEq/L)', 'Hipotireoidismo', 'Diabetes insipidus nefrogênico', 'Nefrotoxicidade crônica']
    },
    interacoes: [
      { medicamento: 'AINES', gravidade: 'grave', efeito: 'Aumenta lítio 25-50%', conduta: 'Monitorar níveis, evitar uso prolongado' },
      { medicamento: 'IECAs', gravidade: 'grave', efeito: 'Aumenta lítio 30-40%', conduta: 'Reduzir lítio, monitorar' },
      { medicamento: 'Diuréticos tiazídicos', gravidade: 'grave', efeito: 'Aumenta lítio significativamente', conduta: 'Reduzir lítio, monitorar' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado. Níveis significativos no lactente.' }
  },

  // ============================================================================
  // ANTIPARKINSONIANOS
  // ============================================================================
  {
    id: 'levodopa-carbidopa',
    nomeGenerico: 'Levodopa + Carbidopa',
    nomesComerciais: ['Sinemet', 'Cronomet', 'Duodopa'],
    atcCode: 'N04BA02',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'precursor_dopamina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg + 25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg + 25mg', disponivelSUS: true },
      { forma: 'comprimido_cr', concentracao: '200mg + 50mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Doença de Parkinson',
      'Parkinsonismo sintomático',
      'Síndrome das pernas inquietas (casos graves)'
    ],
    mecanismoAcao: 'Levodopa é precursor de dopamina. Carbidopa inibe descarboxilase periférica, aumentando disponibilidade central.',
    posologias: [
      {
        indicacao: 'Parkinson',
        adultos: { dose: '100/25mg', frequencia: '3x/dia inicial', doseMaxima: '800/200mg/dia', observacoes: 'Aumentar gradualmente' }
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'Uso de IMAO não seletivo'],
    precaucoes: ['Discinesias (uso prolongado)', 'Flutuações motoras', 'Psicose', 'Hipotensão'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Hipotensão ortostática', 'Discinesias', 'Sonolência súbita'],
      graves: ['Psicose', 'Síndrome neuroléptica maligna (suspensão abrupta)', 'Melanoma']
    },
    interacoes: [
      { medicamento: 'IMAO não seletivos', gravidade: 'grave', efeito: 'Crise hipertensiva', conduta: 'Contraindicado' },
      { medicamento: 'Antipsicóticos', gravidade: 'grave', efeito: 'Antagonismo (bloqueio D2)', conduta: 'Evitar, exceto clozapina/quetiapina' },
      { medicamento: 'Ferro', gravidade: 'moderada', efeito: 'Redução absorção levodopa', conduta: 'Separar em 2h' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Suprime lactação' }
  },

  {
    id: 'pramipexol',
    nomeGenerico: 'Pramipexol',
    nomesComerciais: ['Sifrol', 'Mirapex'],
    atcCode: 'N04BC05',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'agonista_dopaminergico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,125mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '0,25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido_er', concentracao: '0,375mg', disponivelSUS: false },
      { forma: 'comprimido_er', concentracao: '1,5mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Doença de Parkinson (inicial e avançada)',
      'Síndrome das pernas inquietas'
    ],
    mecanismoAcao: 'Agonista D2/D3 não ergolínico. Menos discinesias que levodopa. Preferido em pacientes jovens.',
    posologias: [
      {
        indicacao: 'Parkinson',
        adultos: { dose: '0,125mg 3x/dia inicial', frequencia: 'Aumentar semanalmente', doseMaxima: '4,5mg/dia' }
      },
      {
        indicacao: 'Pernas inquietas',
        adultos: { dose: '0,125mg', frequencia: '2-3h antes deitar', doseMaxima: '0,75mg/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Sonolência súbita', 'Transtornos de controle de impulsos', 'Alucinações'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Sonolência', 'Tontura', 'Edema periférico', 'Hipotensão'],
      graves: ['Ataques de sono', 'Jogo patológico', 'Hipersexualidade', 'Compras compulsivas', 'Síndrome augmentação']
    },
    interacoes: [
      { medicamento: 'Cimetidina', gravidade: 'moderada', efeito: 'Aumenta pramipexol', conduta: 'Reduzir dose' },
      { medicamento: 'Antipsicóticos', gravidade: 'grave', efeito: 'Antagonismo', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: '0,125mg 2x/dia máx 1,5mg/dia' },
      { tfg: '15-30', ajuste: '0,125mg 1x/dia máx 0,75mg/dia' },
      { tfg: '<15', ajuste: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Suprime prolactina' }
  },

  // ============================================================================
  // ANTIDEMÊNCIA
  // ============================================================================
  {
    id: 'donepezila',
    nomeGenerico: 'Donepezila',
    nomesComerciais: ['Eranz', 'Aricept'],
    atcCode: 'N06DA02',
    classeTerapeutica: 'antidemencia',
    subclasse: 'inibidor_colinesterase',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido_orodispersivel', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido_orodispersivel', concentracao: '10mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Doença de Alzheimer (leve a moderada)',
      'Demência com corpos de Lewy',
      'Demência na doença de Parkinson'
    ],
    mecanismoAcao: 'Inibidor reversível e seletivo da acetilcolinesterase. Aumenta acetilcolina sináptica.',
    posologias: [
      {
        indicacao: 'Alzheimer',
        adultos: { dose: '5mg à noite inicial', frequencia: 'Após 4-6 semanas aumentar para 10mg', doseMaxima: '10mg/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a piperidinas'],
    precaucoes: ['Bradicardia', 'Síndrome do nó sinusal', 'Úlcera péptica', 'Asma/DPOC', 'Convulsões'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Diarreia', 'Insônia', 'Vômito', 'Câimbras', 'Fadiga'],
      graves: ['Bradicardia', 'Síncope', 'Convulsões', 'Rabdomiólise (raro)']
    },
    interacoes: [
      { medicamento: 'Anticolinérgicos', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Evitar anticolinérgicos' },
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Bradicardia aditiva', conduta: 'Monitorar FC' },
      { medicamento: 'Succinilcolina', gravidade: 'moderada', efeito: 'Bloqueio neuromuscular prolongado', conduta: 'Cautela em anestesia' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  {
    id: 'memantina',
    nomeGenerico: 'Memantina',
    nomesComerciais: ['Ebix', 'Namenda', 'Alois'],
    atcCode: 'N06DX01',
    classeTerapeutica: 'antidemencia',
    subclasse: 'antagonista_nmda',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '10mg/mL', disponivelSUS: false }
    ],
    indicacoes: ['Doença de Alzheimer (moderada a grave)'],
    mecanismoAcao: 'Antagonista não competitivo de receptores NMDA. Modula neurotoxicidade glutamatérgica.',
    posologias: [
      {
        indicacao: 'Alzheimer',
        adultos: { dose: '5mg inicial, aumentar 5mg/semana até 20mg/dia', frequencia: '1-2x/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Epilepsia', 'Insuficiência renal', 'Retenção urinária', 'IAM recente'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Cefaleia', 'Constipação', 'Confusão'],
      graves: ['Alucinações', 'Convulsões', 'Insuficiência cardíaca']
    },
    interacoes: [
      { medicamento: 'Amantadina', gravidade: 'moderada', efeito: 'Efeitos NMDA aditivos', conduta: 'Cautela' },
      { medicamento: 'Alcalinizantes urina', gravidade: 'moderada', efeito: 'Aumento níveis memantina', conduta: 'Monitorar' }
    ],
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: 'Sem ajuste' },
      { tfg: '15-30', ajuste: '10mg/dia máximo' },
      { tfg: '<15', ajuste: 'Evitar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  }
];
