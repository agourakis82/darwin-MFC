/**
 * CARDIOVASCULARES NOVOS - DARWIN-MFC EXPANSAO 1000
 * =================================================
 * Novos agentes cardiovasculares (IC, arritmias, hipolipemiantes)
 *
 * Referencias:
 * - VICTORIA trial (Vericiguat)
 * - EXPLORER-HCM (Mavacamten)
 * - GALACTIC-HF (Omecamtiv mecarbil)
 * - ORION trials (Inclisiran)
 * - CLEAR trials (Bempedoic acid)
 * - ELIPSE HoFH (Evinacumab)
 * - GRIPHON (Selexipag)
 * - PATENT/CHEST (Riociguat)
 * - APEX (Betrixaban)
 * - RE-VERSE AD (Idarucizumab)
 * - ANNEXA-4 (Andexanet alfa)
 * - DIAMOND (Dofetilide)
 */

import { Medicamento } from '@/lib/types/medicamento';

export const cardiovascularNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // INSUFICIENCIA CARDIACA - NOVOS AGENTES
  // =============================================================================
  {
    id: 'vericiguat',
    nomeGenerico: 'Vericiguat',
    nomesComerciais: ['Verquvo'],
    atcCode: 'C01DX22',
    rxNormCui: '2475048',
    drugBankId: 'DB15617',
    snomedCT: '1179321003',
    casNumber: '1350653-21-0',
    classeTerapeutica: 'cardiotonico',
    subclasse: 'vasodilatador',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Insuficiencia cardiaca cronica sintomatica com FE reduzida (ICFEr)',
      'IC apos evento de descompensacao (hospitalizacao ou diuretico IV ambulatorial)',
      'Adjuvante a terapia otimizada (IECA/BRA/ARNI, betabloqueador, ARM)',
    ],
    mecanismoAcao: 'Estimulador da guanilato ciclase soluvel (sGC). Sensibiliza a sGC ao oxido nitrico (NO) endogeno e estimula diretamente a sGC independente de NO, aumentando GMPc intracelular. Resulta em vasodilatacao, reducao de pre e pos-carga, efeitos antifibroticos e anti-remodelamento cardiaco.',
    posologias: [
      {
        indicacao: 'IC com FE reduzida',
        adultos: {
          dose: 'Iniciar 2,5mg 1x/dia',
          frequencia: '1x/dia com alimentos',
          doseMaxima: '10mg/dia',
          observacoes: 'Titular a cada 2 semanas: 2,5mg -> 5mg -> 10mg conforme tolerancia. Manter dose se PAS <100mmHg ou sintomas de hipotensao.',
        },
      },
    ],
    contraindicacoes: [
      'Uso concomitante de outros estimuladores de sGC (riociguat)',
      'Gestacao',
      'Hipersensibilidade ao vericiguat',
    ],
    precaucoes: [
      'Hipotensao sintomatica - monitorar PA',
      'Anemia (pode ocorrer reducao de hemoglobina)',
      'Insuficiencia hepatica grave (Child-Pugh C) - nao recomendado',
      'Uso concomitante com inibidores de PDE5 - cautela',
    ],
    efeitosAdversos: {
      comuns: ['Hipotensao', 'Anemia', 'Tontura', 'Nausea', 'Cefaleia'],
      graves: ['Sincope', 'Hipotensao sintomatica grave'],
    },
    interacoes: [
      {
        medicamento: 'Riociguat e outros estimuladores sGC',
        gravidade: 'contraindicada',
        efeito: 'Risco de hipotensao grave',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Inibidores de PDE5 (sildenafila, tadalafila)',
        gravidade: 'moderada',
        efeito: 'Potencializacao do efeito hipotensor',
        conduta: 'Usar com cautela; monitorar PA',
      },
      {
        medicamento: 'Nitratos',
        gravidade: 'moderada',
        efeito: 'Aumento do efeito hipotensor',
        conduta: 'Monitorar PA; titular doses',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>15', ajuste: 'Sem ajuste necessario' },
      { tfg: '<15', ajuste: 'Dados limitados - usar com cautela' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Nao recomendado - dados insuficientes' },
    monitorizacao: [
      'PA antes e apos titulacao',
      'Hemoglobina periodica',
      'Sintomas de hipotensao',
      'Funcao renal',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos para melhor absorcao',
      'Levantar-se lentamente para evitar tontura',
      'Nao usar se estiver gravida ou planejando engravidar',
    ],
    consideracoesEspeciais: {
      idosos: 'Nao requer ajuste por idade; titular conforme tolerancia',
      hepatopatas: 'Child-Pugh A/B: sem ajuste; Child-Pugh C: evitar',
    },
    doencasRelacionadas: ['insuficiencia-cardiaca', 'icfer'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['IC', 'vericiguat', 'sGC', 'VICTORIA', 'insuficiencia-cardiaca', 'FE-reduzida'],
  },

  {
    id: 'mavacamten',
    nomeGenerico: 'Mavacamten',
    nomesComerciais: ['Camzyos'],
    atcCode: 'C01EB24',
    rxNormCui: '2559420',
    drugBankId: 'DB16619',
    snomedCT: '1263011001',
    casNumber: '1642288-47-8',
    classeTerapeutica: 'cardiotonico',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '2,5mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '5mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '10mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '15mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Cardiomiopatia hipertrofica obstrutiva (CMH obstrutiva) sintomatica',
      'NYHA classe II-III',
      'Alternativa ou adjuvante a betabloqueadores e BCC',
    ],
    mecanismoAcao: 'Inibidor seletivo e reversivel da miosina cardiaca. Reduz a formacao excessiva de pontes cruzadas actina-miosina caracteristica da CMH. Diminui a hipercontratilidade e o gradiente de obstrucao da via de saida do ventriculo esquerdo (VSVE), sem afetar a funcao diastolica.',
    posologias: [
      {
        indicacao: 'CMH obstrutiva',
        adultos: {
          dose: 'Iniciar 5mg 1x/dia',
          frequencia: '1x/dia',
          doseMaxima: '15mg/dia',
          observacoes: 'Titular baseado em ecocardiograma (FE e gradiente VSVE) a cada 4-12 semanas. Se FE <50%, suspender e reavaliar.',
        },
      },
    ],
    contraindicacoes: [
      'Uso concomitante com inibidores fortes de CYP2C19 ou CYP3A4',
      'IC com FE <55% antes do inicio',
      'Gestacao',
      'Doenca do seio ou BAV sem marca-passo',
    ],
    precaucoes: [
      'Risco de reducao excessiva da FE - monitorar ecocardiograma',
      'Interacoes medicamentosas multiplas via CYP450',
      'Programa REMS nos EUA por risco de IC',
      'Metabolizadores lentos de CYP2C19 - iniciar com dose menor',
    ],
    efeitosAdversos: {
      comuns: ['Tontura', 'Sincope', 'Dispneia', 'Fadiga'],
      graves: ['IC sistemica (FE <50%)', 'Fibrilacao atrial', 'Bloqueio AV'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP2C19 (omeprazol, fluconazol)',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de mavacamten',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol, ritonavir)',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de mavacamten',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Indutores de CYP2C19/3A4 (rifampicina, carbamazepina)',
        gravidade: 'grave',
        efeito: 'Reducao dos niveis de mavacamten',
        conduta: 'Evitar; pode necessitar dose maior',
      },
      {
        medicamento: 'Betabloqueadores',
        gravidade: 'moderada',
        efeito: 'Efeito inotro negativo aditivo',
        conduta: 'Monitorar FE; ajustar doses',
      },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: [
      'Ecocardiograma a cada 4-12 semanas durante titulacao',
      'FE (suspender se <50%)',
      'Gradiente VSVE',
      'ECG periodico',
      'Genotipagem CYP2C19 recomendada',
    ],
    orientacoesPaciente: [
      'Nao interromper abruptamente',
      'Informar todos os medicamentos em uso (interacoes)',
      'Acompanhamento regular com ecocardiograma obrigatorio',
      'Evitar gravidez',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste por idade; monitorar funcao cardiaca',
      hepatopatas: 'Hepatopatia leve/moderada: cautela; grave: contraindicado',
    },
    doencasRelacionadas: ['cardiomiopatia-hipertrofica', 'cmh-obstrutiva'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['mavacamten', 'CMH', 'cardiomiopatia-hipertrofica', 'EXPLORER-HCM', 'inibidor-miosina'],
  },

  {
    id: 'omecamtiv-mecarbil',
    nomeGenerico: 'Omecamtiv mecarbil',
    nomesComerciais: ['Aficamten (em desenvolvimento)'],
    atcCode: 'C01CX',
    drugBankId: 'DB11969',
    casNumber: '873697-71-3',
    classeTerapeutica: 'cardiotonico',
    subclasse: 'inotropico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '37,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
    ],
    indicacoes: [
      'IC cronica com FE reduzida (em investigacao)',
      'ICFEr sintomatica apesar de terapia otimizada',
      'Adjuvante em pacientes com FE <=35%',
    ],
    mecanismoAcao: 'Ativador seletivo da miosina cardiaca. Aumenta a duracao da sistole e a forca de contracao sem aumentar o consumo de oxigenio miocardico ou calcio intracelular. Liga-se diretamente a miosina cardiaca, estabilizando conformacoes que favorecem a interacao actina-miosina e prolongando o tempo de ejecao sistolica.',
    posologias: [
      {
        indicacao: 'IC com FE reduzida',
        adultos: {
          dose: 'Iniciar 25mg 2x/dia',
          frequencia: '12/12h',
          doseMaxima: '50mg 2x/dia',
          observacoes: 'Titular baseado em niveis plasmaticos (farmacocinetica-guiada) a cada 2-4 semanas.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Uso em IAM agudo (primeiras 4 semanas)',
    ],
    precaucoes: [
      'Monitorar niveis plasmaticos (risco de isquemia se niveis elevados)',
      'Evitar em isquemia miocardica ativa',
      'Nao aumenta eventos isquemicos no GALACTIC-HF, mas cautela',
    ],
    efeitosAdversos: {
      comuns: ['Tontura', 'Hipotensao', 'Cefaleia', 'Palpitacoes'],
      graves: ['Isquemia miocardica (teorico em doses elevadas)', 'Arritmias ventriculares'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores de CYP3A4',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de omecamtiv',
        conduta: 'Monitorar niveis plasmaticos',
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'leve',
        efeito: 'Podem ter efeitos inotro positivos aditivos',
        conduta: 'Monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Cautela - dados limitados' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Niveis plasmaticos de omecamtiv (quando disponivel)',
      'ECG',
      'Troponina se sintomas isquemicos',
      'FE por ecocardiograma',
    ],
    orientacoesPaciente: [
      'Medicamento ainda em estudos em alguns paises',
      'Tomar 2 vezes ao dia conforme prescrito',
      'Informar medico sobre dor toracica',
    ],
    consideracoesEspeciais: {
      idosos: 'GALACTIC-HF incluiu idosos; sem ajuste especifico',
    },
    doencasRelacionadas: ['insuficiencia-cardiaca', 'icfer'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['omecamtiv', 'ativador-miosina', 'GALACTIC-HF', 'IC', 'inotropico'],
  },

  // =============================================================================
  // HIPOLIPEMIANTES - NOVOS AGENTES
  // =============================================================================
  {
    id: 'inclisiran',
    nomeGenerico: 'Inclisiran sodico',
    nomesComerciais: ['Leqvio'],
    atcCode: 'C10AX16',
    rxNormCui: '2469247',
    drugBankId: 'DB15844',
    snomedCT: '1162651008',
    casNumber: '1639033-51-0',
    classeTerapeutica: 'hipolipemiante',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '284mg/1,5mL (seringa preenchida)', disponivelSUS: false },
    ],
    indicacoes: [
      'Hipercolesterolemia primaria (heterozigota familiar ou nao familiar)',
      'Dislipidemia mista',
      'Adjuvante a dieta e estatina de maxima dose tolerada',
      'Pacientes que nao atingem metas de LDL-c',
      'Doenca cardiovascular aterosclerotica estabelecida',
    ],
    mecanismoAcao: 'RNA de interferencia pequeno (siRNA) que silencia o mRNA da PCSK9 nos hepatocitos via mecanismo de interferencia de RNA. Reduz a producao intracelular de PCSK9, aumentando a expressao de receptores de LDL na superficie do hepatocito e consequentemente o clearance de LDL-c. Reducao de 50-55% no LDL-c. Administracao semestral (2x/ano).',
    posologias: [
      {
        indicacao: 'Hipercolesterolemia',
        adultos: {
          dose: '284mg SC',
          frequencia: 'Dose inicial, repetir aos 3 meses, depois a cada 6 meses',
          observacoes: 'Administracao por profissional de saude. Dose de manutencao semestral.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao inclisiran',
    ],
    precaucoes: [
      'Doenca hepatica grave - dados limitados',
      'Dialise - dados limitados',
    ],
    efeitosAdversos: {
      comuns: ['Reacao no local da injecao (dor, eritema)', 'Artralgia', 'Infeccao do trato urinario', 'Diarreia', 'Bronquite'],
      graves: ['Reacoes de hipersensibilidade (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Estatinas',
        gravidade: 'leve',
        efeito: 'Efeito aditivo na reducao de LDL-c',
        conduta: 'Uso combinado recomendado - sem ajuste',
      },
      {
        medicamento: 'Ezetimiba',
        gravidade: 'leve',
        efeito: 'Efeito aditivo na reducao de LDL-c',
        conduta: 'Pode ser combinado',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Sem ajuste; dados limitados em dialise' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Evitar - dados insuficientes' },
    monitorizacao: [
      'LDL-c apos 90 dias da dose inicial',
      'Perfil lipidico periodico',
      'Funcao hepatica se indicado clinicamente',
    ],
    orientacoesPaciente: [
      'Injecao aplicada por profissional de saude',
      'Apenas 2 aplicacoes por ano apos dose inicial',
      'Manter dieta e estatina conforme prescrito',
      'Pode haver leve dor no local da injecao',
    ],
    consideracoesEspeciais: {
      idosos: 'Estudos incluiram idosos; sem ajuste',
      hepatopatas: 'Hepatopatia leve/moderada: sem ajuste; grave: dados limitados',
    },
    doencasRelacionadas: ['dislipidemia', 'hipercolesterolemia-familiar', 'doenca-arterial-coronariana'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['inclisiran', 'siRNA', 'PCSK9', 'ORION', 'LDL', 'semestral', 'hipolipemiante'],
  },

  {
    id: 'acido-bempedoico',
    nomeGenerico: 'Acido bempedoico',
    nomesComerciais: ['Nexletol'],
    atcCode: 'C10AX15',
    rxNormCui: '2381956',
    drugBankId: 'DB15082',
    snomedCT: '1156235006',
    casNumber: '738606-46-7',
    classeTerapeutica: 'hipolipemiante',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '180mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Hipercolesterolemia primaria (heterozigota familiar ou nao familiar)',
      'Dislipidemia mista',
      'Adjuvante a dieta e estatina de maxima dose tolerada',
      'Alternativa para intolerantes a estatinas',
      'Reducao de eventos CV em pacientes com ou sem estatina (CLEAR Outcomes)',
    ],
    mecanismoAcao: 'Inibidor da ATP citrato liase (ACL), enzima a montante da HMG-CoA redutase na via de sintese de colesterol. Pro-droga ativada apenas no figado (nao no musculo), o que explica menor miotoxicidade. Reduz LDL-c em 15-25% como monoterapia e adicional 15-18% sobre estatinas.',
    posologias: [
      {
        indicacao: 'Hipercolesterolemia',
        adultos: {
          dose: '180mg',
          frequencia: '1x/dia',
          observacoes: 'Pode ser tomado com ou sem alimentos. Nao requer titulacao.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Uso concomitante com sinvastatina >20mg/dia',
      'Uso concomitante com pravastatina >40mg/dia',
    ],
    precaucoes: [
      'Aumento de acido urico - monitorar em pacientes com gota',
      'Ruptura de tendao (raro)',
      'Interacoes com estatinas - respeitar doses maximas',
    ],
    efeitosAdversos: {
      comuns: ['Hiperuricemia', 'Dor nas extremidades', 'Anemia', 'Aumento de TGO/TGP', 'Infeccao do trato respiratorio'],
      graves: ['Gota', 'Ruptura de tendao (raro)', 'Colelitíase'],
    },
    interacoes: [
      {
        medicamento: 'Sinvastatina',
        gravidade: 'grave',
        efeito: 'Aumenta niveis de sinvastatina - risco de miopatia',
        conduta: 'Limitar sinvastatina a 20mg/dia',
      },
      {
        medicamento: 'Pravastatina',
        gravidade: 'moderada',
        efeito: 'Aumenta niveis de pravastatina',
        conduta: 'Limitar pravastatina a 40mg/dia',
      },
      {
        medicamento: 'Atorvastatina, rosuvastatina',
        gravidade: 'leve',
        efeito: 'Sem interacao significativa',
        conduta: 'Preferir estas estatinas',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Nao recomendado - dados limitados' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: [
      'Perfil lipidico',
      'Acido urico (especialmente em pacientes com historico de gota)',
      'TGO/TGP',
      'Sintomas musculoesqueleticos',
    ],
    orientacoesPaciente: [
      'Tomar 1 comprimido ao dia, com ou sem alimentos',
      'Informar medico se tiver gota ou calculo renal',
      'Menor risco de dor muscular comparado a estatinas',
      'Manter dieta adequada',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste por idade',
      hepatopatas: 'Hepatopatia leve/moderada: cautela; grave: evitar',
    },
    doencasRelacionadas: ['dislipidemia', 'hipercolesterolemia-familiar', 'doenca-arterial-coronariana'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['bempedoico', 'ACL', 'CLEAR', 'hipolipemiante', 'intolerancia-estatina'],
  },

  {
    id: 'evinacumab',
    nomeGenerico: 'Evinacumab-dgnb',
    nomesComerciais: ['Evkeeza'],
    atcCode: 'C10AX17',
    rxNormCui: '2475093',
    drugBankId: 'DB16121',
    snomedCT: '1179329001',
    casNumber: '1684512-57-3',
    classeTerapeutica: 'hipolipemiante',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '345mg/2,3mL (150mg/mL)', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '1200mg/8mL (150mg/mL)', disponivelSUS: false },
    ],
    indicacoes: [
      'Hipercolesterolemia familiar homozigota (HoFH)',
      'Adjuvante a dieta e outras terapias hipolipemiantes',
      'Reducao de LDL-c em pacientes com HoFH refrataria',
    ],
    mecanismoAcao: 'Anticorpo monoclonal totalmente humano que inibe ANGPTL3 (angiopoietin-like 3). ANGPTL3 e um inibidor endogeno das lipases (LPL e lipase endotelial). Ao bloquear ANGPTL3, aumenta a atividade das lipases, reduzindo triglicerides, LDL-c e HDL-c. Mecanismo independente de receptor de LDL - eficaz mesmo em pacientes com HoFH e funcao nula do receptor.',
    posologias: [
      {
        indicacao: 'HoFH',
        adultos: {
          dose: '15mg/kg',
          frequencia: 'IV a cada 4 semanas',
          observacoes: 'Infusao IV durante 60 minutos. Pode ser administrado junto com outras terapias hipolipemiantes.',
        },
        pediatrico: {
          dose: '15mg/kg',
          frequencia: 'IV a cada 4 semanas',
          idadeMinima: '5 anos',
        },
      },
    ],
    contraindicacoes: [
      'Reacoes de hipersensibilidade graves previas ao evinacumab',
    ],
    precaucoes: [
      'Reacoes relacionadas a infusao',
      'Reducao de HDL-c (efeito classe - significado clinico incerto)',
      'Gestacao - pode causar dano fetal',
    ],
    efeitosAdversos: {
      comuns: ['Nasofaringite', 'Sintomas gripais', 'Tontura', 'Dor nas costas', 'Nausea'],
      graves: ['Reacoes de hipersensibilidade/anafilaxia', 'Reacoes relacionadas a infusao'],
    },
    interacoes: [
      {
        medicamento: 'Estatinas, ezetimiba, inibidores PCSK9',
        gravidade: 'leve',
        efeito: 'Efeito aditivo hipolipemiante',
        conduta: 'Uso combinado recomendado em HoFH',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>15', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar' },
    monitorizacao: [
      'Perfil lipidico periodico',
      'Monitorar para reacoes infusionais durante administracao',
      'HDL-c (pode reduzir)',
    ],
    orientacoesPaciente: [
      'Administracao IV mensal em ambiente de saude',
      'Informar sobre sinais de reacao alergica',
      'Manter outras medicacoes hipolipemiantes',
      'Medicamento de alto custo para condicao rara',
    ],
    consideracoesEspeciais: {
      pediatrico: 'Aprovado para >=5 anos com HoFH',
      idosos: 'Sem ajuste especifico',
    },
    doencasRelacionadas: ['hipercolesterolemia-familiar-homozigota', 'hofh'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['evinacumab', 'ANGPTL3', 'HoFH', 'hipercolesterolemia-familiar', 'anticorpo-monoclonal'],
  },

  // =============================================================================
  // HIPERTENSAO PULMONAR
  // =============================================================================
  {
    id: 'selexipag',
    nomeGenerico: 'Selexipag',
    nomesComerciais: ['Uptravi'],
    atcCode: 'B01AC27',
    rxNormCui: '1721530',
    drugBankId: 'DB11362',
    snomedCT: '724061005',
    casNumber: '475086-01-2',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'vasodilatador',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '400mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '600mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '800mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '1000mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '1200mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '1400mcg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '1600mcg', disponivelSUS: false },
    ],
    indicacoes: [
      'Hipertensao arterial pulmonar (HAP) - Grupo 1 OMS',
      'Classe funcional II-III',
      'Retardar progressao da doenca e risco de hospitalizacao',
    ],
    mecanismoAcao: 'Agonista seletivo do receptor de prostaciclina (IP). Pro-droga oral convertida em metabolito ativo (ACT-333679). Causa vasodilatacao pulmonar, inibicao da proliferacao de celulas musculares lisas e inibicao da agregacao plaquetaria. Primeiro agonista IP oral com eficacia demonstrada em desfechos clinicos (GRIPHON).',
    posologias: [
      {
        indicacao: 'HAP',
        adultos: {
          dose: 'Iniciar 200mcg 2x/dia',
          frequencia: '12/12h com alimentos',
          doseMaxima: '1600mcg 2x/dia',
          observacoes: 'Titular semanalmente em incrementos de 200mcg 2x/dia ate dose maxima tolerada. Reduzir para dose anterior se efeitos adversos intoleraveis.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Doenca arterial coronariana grave',
      'IAM recente (6 meses)',
      'IC descompensada',
      'Arritmia grave',
      'Doenca cerebrovascular recente',
    ],
    precaucoes: [
      'Idosos (>65 anos) - maior incidencia de efeitos adversos',
      'Hipotireoidismo (pode interferir com funcao tireoidiana)',
      'Doenca hepatica moderada - iniciar com dose menor',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia (65%)', 'Diarreia', 'Nauseas', 'Dor mandibular', 'Mialgia', 'Dor nas extremidades', 'Vomitos', 'Rubor'],
      graves: ['Hipotensao', 'Anemia', 'Hipertireoidismo'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP2C8 (gemfibrozila)',
        gravidade: 'grave',
        efeito: 'Aumento significativo dos niveis do metabolito ativo',
        conduta: 'Reduzir dose de selexipag para 1x/dia ou evitar',
      },
      {
        medicamento: 'Indutores de CYP2C8 (rifampicina)',
        gravidade: 'moderada',
        efeito: 'Reducao da eficacia',
        conduta: 'Pode necessitar dose maior',
      },
      {
        medicamento: 'Anticoagulantes',
        gravidade: 'moderada',
        efeito: 'Risco aditivo de sangramento',
        conduta: 'Monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>15', ajuste: 'Sem ajuste necessario' },
      { tfg: '<15', ajuste: 'Dados limitados - cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar - dados insuficientes' },
    monitorizacao: [
      'Classe funcional (NYHA/OMS)',
      'Teste de caminhada de 6 minutos',
      'ECG',
      'Funcao hepatica',
      'Funcao tireoidiana periodica',
      'Hemograma',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos para reduzir nauseas',
      'Titulacao gradual - informar efeitos adversos',
      'Nao interromper abruptamente',
      'Cefaleia e diarreia geralmente melhoram com o tempo',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior incidencia de efeitos adversos; titular com cautela',
      hepatopatas: 'Child-Pugh A: sem ajuste; B: iniciar 200mcg 1x/dia; C: evitar',
    },
    doencasRelacionadas: ['hipertensao-arterial-pulmonar', 'hap'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['selexipag', 'prostaciclina', 'HAP', 'GRIPHON', 'receptor-IP', 'hipertensao-pulmonar'],
  },

  {
    id: 'riociguat',
    nomeGenerico: 'Riociguat',
    nomesComerciais: ['Adempas'],
    atcCode: 'C02KX05',
    rxNormCui: '1442974',
    drugBankId: 'DB09091',
    snomedCT: '710807006',
    casNumber: '625115-55-1',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'vasodilatador',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '1,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Hipertensao pulmonar tromboembolica cronica (HPTEC) - inoperavel ou persistente apos cirurgia',
      'Hipertensao arterial pulmonar (HAP) - Grupo 1 OMS',
    ],
    mecanismoAcao: 'Estimulador da guanilato ciclase soluvel (sGC). Sensibiliza a sGC ao oxido nitrico endogeno e estimula diretamente a sGC independente de NO. Aumenta GMPc, causando vasodilatacao pulmonar, inibicao da proliferacao vascular e efeitos antitrombóticos. Eficacia comprovada em PATENT-1 (HAP) e CHEST-1 (HPTEC).',
    posologias: [
      {
        indicacao: 'HAP/HPTEC',
        adultos: {
          dose: 'Iniciar 1mg 3x/dia (ou 0,5mg se PAS <95mmHg)',
          frequencia: '8/8h',
          doseMaxima: '2,5mg 3x/dia',
          observacoes: 'Titular a cada 2 semanas em incrementos de 0,5mg 3x/dia baseado na PAS e tolerancia.',
        },
      },
    ],
    contraindicacoes: [
      'Gestacao (teratogenico)',
      'Uso com nitratos ou doadores de NO',
      'Uso com inibidores de PDE5 (sildenafila, tadalafila)',
      'PAS <95mmHg no inicio',
      'Hipertensao pulmonar associada a pneumonia intersticial idiopatica',
    ],
    precaucoes: [
      'Hipotensao - especialmente ao iniciar ou titular',
      'Fumantes podem necessitar doses maiores',
      'Sangramento (especialmente com anticoagulantes)',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Tontura', 'Dispepsia', 'Nauseas', 'Diarreia', 'Hipotensao', 'Vomitos', 'Edema periferico'],
      graves: ['Hemoptise', 'Sangramento pulmonar', 'Hipotensao grave'],
    },
    interacoes: [
      {
        medicamento: 'Nitratos e doadores de NO',
        gravidade: 'contraindicada',
        efeito: 'Hipotensao grave',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Inibidores de PDE5',
        gravidade: 'contraindicada',
        efeito: 'Hipotensao grave',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Vericiguat',
        gravidade: 'contraindicada',
        efeito: 'Hipotensao grave',
        conduta: 'Nao usar estimuladores sGC juntos',
      },
      {
        medicamento: 'Anticoagulantes',
        gravidade: 'moderada',
        efeito: 'Risco aditivo de sangramento',
        conduta: 'Monitorar',
      },
      {
        medicamento: 'Inibidores fortes de CYP e glicoproteina-P',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de riociguat',
        conduta: 'Considerar reducao de dose',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '15-30', ajuste: 'Iniciar 0,5mg 3x/dia; titular com cautela' },
      { tfg: '<15', ajuste: 'Evitar - dados insuficientes' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: [
      'PA sistolica antes e apos titulacao',
      'Classe funcional',
      'Teste de caminhada de 6 minutos',
      'Sinais de sangramento',
      'Funcao renal periodica',
    ],
    orientacoesPaciente: [
      'Tomar 3 vezes ao dia',
      'Fumantes: informar habito (pode afetar eficacia)',
      'Evitar gravidez - usar contracepcao eficaz',
      'Levantar-se lentamente',
      'Nao usar Viagra/Cialis',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste por idade; titular conforme tolerancia',
      hepatopatas: 'Child-Pugh A/B: sem ajuste; C: nao estudado',
    },
    doencasRelacionadas: ['hipertensao-pulmonar-tromboembolica-cronica', 'hipertensao-arterial-pulmonar', 'hptec', 'hap'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['riociguat', 'sGC', 'HAP', 'HPTEC', 'PATENT', 'CHEST', 'hipertensao-pulmonar'],
  },

  // =============================================================================
  // ANTICOAGULACAO - NOVOS AGENTES E ANTIDOTOS
  // =============================================================================
  {
    id: 'betrixaban',
    nomeGenerico: 'Betrixaban',
    nomesComerciais: ['Bevyxxa'],
    atcCode: 'B01AF03',
    rxNormCui: '1997015',
    drugBankId: 'DB12364',
    snomedCT: '763524009',
    casNumber: '330942-05-7',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'inibidor_fator_xa',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '40mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '80mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia de TEV em pacientes adultos hospitalizados por doenca clinica aguda',
      'Risco elevado de TEV por mobilidade restrita',
      'Profilaxia estendida (35-42 dias)',
    ],
    mecanismoAcao: 'Inibidor direto e seletivo do fator Xa. Diferencial: minima excrecao renal (<7%), permitindo uso em DRC. Meia-vida longa (19-27h). Sem necessidade de monitoramento. Estudado no APEX trial para profilaxia estendida em pacientes clinicos.',
    posologias: [
      {
        indicacao: 'Profilaxia TEV',
        adultos: {
          dose: '160mg dose inicial, depois 80mg',
          frequencia: '1x/dia por 35-42 dias',
          observacoes: 'Dose inicial no dia da hospitalizacao. Tomar com alimentos.',
        },
      },
    ],
    contraindicacoes: [
      'Sangramento ativo clinicamente significativo',
      'Hipersensibilidade',
      'Uso de inibidores de glicoproteina-P fortes',
    ],
    precaucoes: [
      'Procedimentos invasivos - suspender adequadamente',
      'DRC grave - sem necessidade de ajuste, mas cautela',
      'Hepatopatia grave',
    ],
    efeitosAdversos: {
      comuns: ['Sangramento menor', 'Hematuria', 'Epistaxe', 'Constipacao', 'Diarreia'],
      graves: ['Sangramento maior', 'Sangramento gastrointestinal', 'Sangramento intracraniano (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de glicoproteina-P (cetoconazol, claritromicina)',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de betrixaban',
        conduta: 'Evitar uso concomitante ou reduzir dose para 40mg/dia',
      },
      {
        medicamento: 'Antiagregantes, AINEs',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Usar com cautela; monitorar sangramento',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>=15', ajuste: 'Sem ajuste necessario' },
      { tfg: '<15', ajuste: 'Dados limitados - usar com cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar' },
    monitorizacao: [
      'Sinais de sangramento',
      'Hemoglobina/hematocrito se sangramento suspeito',
      'Nao requer monitoramento de rotina de coagulacao',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos',
      'Informar procedimentos cirurgicos ou dentarios',
      'Sinais de sangramento - procurar atendimento',
      'Duração do tratamento geralmente 35-42 dias',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; maior risco de sangramento',
      hepatopatas: 'Hepatopatia leve/moderada: cautela; grave: evitar',
    },
    doencasRelacionadas: ['tromboembolismo-venoso', 'profilaxia-tev'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['betrixaban', 'DOAC', 'fator-Xa', 'APEX', 'profilaxia-TEV', 'renal-sparing'],
  },

  {
    id: 'idarucizumab',
    nomeGenerico: 'Idarucizumab',
    nomesComerciais: ['Praxbind'],
    atcCode: 'V03AB37',
    rxNormCui: '1737468',
    drugBankId: 'DB09296',
    snomedCT: '714081009',
    casNumber: '1262686-34-5',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '2,5g/50mL (frasco-ampola)', disponivelSUS: false },
    ],
    indicacoes: [
      'Reversao dos efeitos anticoagulantes de dabigatrana',
      'Cirurgia de emergencia ou procedimento urgente',
      'Sangramento com risco de vida ou nao controlado',
    ],
    mecanismoAcao: 'Fragmento de anticorpo monoclonal humanizado (Fab) que se liga especificamente a dabigatrana com afinidade 350x maior que a trombina. Neutraliza rapida e completamente o efeito anticoagulante da dabigatrana em minutos. Nao reverte outros anticoagulantes.',
    posologias: [
      {
        indicacao: 'Reversao de dabigatrana',
        adultos: {
          dose: '5g (2 frascos de 2,5g)',
          frequencia: 'Dose unica IV',
          observacoes: 'Administrar como 2 infusoes IV consecutivas de 5-10 min cada ou em bolus. Segunda dose de 5g pode ser considerada se ressangramento ou necessidade de cirurgia urgente.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade conhecida ao idarucizumab ou excipientes',
      'Intolerancia hereditaria a frutose (contem sorbitol)',
    ],
    precaucoes: [
      'Evento tromboembolico - retomar anticoagulacao quando estabilizado',
      'Reacoes de hipersensibilidade',
      'Nao reverte outros anticoagulantes (rivaroxabana, apixabana, etc)',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Hipocalemia', 'Constipacao', 'Febre'],
      graves: ['Eventos tromboembolicos (relacionados a interrupcao de anticoagulacao)', 'Reacoes de hipersensibilidade'],
    },
    interacoes: [
      {
        medicamento: 'Dabigatrana',
        gravidade: 'moderada',
        efeito: 'Neutraliza o efeito da dabigatrana',
        conduta: 'Retomar dabigatrana 24h apos se indicado',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso de emergencia; improvavel risco ao lactente' },
    monitorizacao: [
      'Tempo de coagulacao (dTT, ECT) antes e apos',
      'Sinais de sangramento',
      'Sinais de trombose apos uso',
      'Funcao renal',
    ],
    orientacoesPaciente: [
      'Medicamento de emergencia - uso hospitalar',
      'Anticoagulacao sera retomada quando seguro',
      'Informar alergias previas',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Sem ajuste necessario',
    },
    doencasRelacionadas: ['sangramento-por-anticoagulante', 'reversao-dabigatrana'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['idarucizumab', 'antidoto', 'dabigatrana', 'RE-VERSE-AD', 'reversao', 'Praxbind'],
  },

  {
    id: 'andexanet-alfa',
    nomeGenerico: 'Andexanet alfa',
    nomesComerciais: ['Andexxa', 'Ondexxya'],
    atcCode: 'V03AB38',
    rxNormCui: '2103180',
    drugBankId: 'DB14562',
    snomedCT: '871751003',
    casNumber: '1262682-77-6',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '200mg (frasco-ampola)', disponivelSUS: false },
    ],
    indicacoes: [
      'Reversao de anticoagulacao em pacientes tratados com rivaroxabana ou apixabana',
      'Sangramento com risco de vida ou nao controlado',
    ],
    mecanismoAcao: 'Proteina recombinante modificada do fator Xa humano, cataliticamente inativa. Atua como "chamariz" (decoy) para os inibidores de fator Xa, ligando-se a eles com alta afinidade e sequestrando-os do fator Xa endogeno. Restaura a atividade do fator Xa e a geracao de trombina.',
    posologias: [
      {
        indicacao: 'Reversao de inibidores Xa (dose baixa)',
        adultos: {
          dose: 'Bolus 400mg IV em 15min, seguido de infusao 4mg/min por 120min (480mg)',
          frequencia: 'Dose unica',
          observacoes: 'Dose baixa: apixabana <=5mg ou rivaroxabana <=10mg ou ultima dose ha >8h',
        },
      },
      {
        indicacao: 'Reversao de inibidores Xa (dose alta)',
        adultos: {
          dose: 'Bolus 800mg IV em 30min, seguido de infusao 8mg/min por 120min (960mg)',
          frequencia: 'Dose unica',
          observacoes: 'Dose alta: apixabana >5mg ou rivaroxabana >10mg ou dose desconhecida ou ultima dose ha <8h ou tempo desconhecido',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade conhecida',
    ],
    precaucoes: [
      'Alto risco tromboembolico - eventos podem ocorrer apos uso',
      'Reacoes infusionais',
      'Recomeca anticoagulacao assim que possivel',
      'Nao reverte dabigatrana, heparina ou varfarina',
    ],
    efeitosAdversos: {
      comuns: ['Infeccao do trato urinario', 'Pneumonia', 'Reacoes infusionais'],
      graves: ['Eventos tromboembolicos (TVP, TEP, AVC, IAM)', 'Morte cardiaca', 'Parada cardiaca'],
    },
    interacoes: [
      {
        medicamento: 'Rivaroxabana, apixabana',
        gravidade: 'moderada',
        efeito: 'Neutraliza o efeito anticoagulante',
        conduta: 'Retomar anticoagulacao quando seguro',
      },
      {
        medicamento: 'Heparina, enoxaparina',
        gravidade: 'leve',
        efeito: 'Pode reverter parcialmente HBPM (efeito anti-Xa)',
        conduta: 'Nao indicado para reversao de heparinas',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso de emergencia' },
    monitorizacao: [
      'Atividade anti-fator Xa antes e apos',
      'Sinais de sangramento',
      'Sinais de trombose',
      'Monitoramento cardiaco durante infusao',
    ],
    orientacoesPaciente: [
      'Medicamento de emergencia - uso hospitalar exclusivo',
      'Risco de coagulos apos uso - anticoagulacao sera retomada',
    ],
    consideracoesEspeciais: {
      idosos: 'ANNEXA-4 incluiu idosos; sem ajuste',
      hepatopatas: 'Dados limitados',
    },
    doencasRelacionadas: ['sangramento-por-anticoagulante', 'reversao-inibidor-xa'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['andexanet', 'antidoto', 'fator-Xa', 'ANNEXA-4', 'rivaroxabana', 'apixabana', 'reversao'],
  },

  // =============================================================================
  // ANTIARRITMICO
  // =============================================================================
  {
    id: 'dofetilide',
    nomeGenerico: 'Dofetilide',
    nomesComerciais: ['Tikosyn'],
    atcCode: 'C01BD04',
    rxNormCui: '135447',
    drugBankId: 'DB00204',
    snomedCT: '372511001',
    casNumber: '115256-11-6',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'antiarritmico',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '125mcg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '250mcg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '500mcg', disponivelSUS: false },
    ],
    indicacoes: [
      'Conversao de fibrilacao/flutter atrial para ritmo sinusal',
      'Manutencao do ritmo sinusal apos cardioversao',
      'Pacientes com IC concomitante (seguro no DIAMOND-CHF)',
    ],
    mecanismoAcao: 'Antiarritmico classe III. Bloqueia seletivamente o canal de potassio IKr (rapid delayed rectifier), prolongando a repolarizacao e o periodo refratario atrial e ventricular. Nao possui efeitos sobre canais de sodio ou calcio. Prolonga QT de forma dose-dependente.',
    posologias: [
      {
        indicacao: 'FA/Flutter atrial',
        adultos: {
          dose: 'Baseado no ClCr e QTc: ClCr >60: 500mcg 2x/dia; ClCr 40-60: 250mcg 2x/dia; ClCr 20-40: 125mcg 2x/dia',
          frequencia: '12/12h',
          doseMaxima: '500mcg 2x/dia',
          observacoes: 'OBRIGATORIO iniciar em ambiente hospitalar com monitorizacao por minimo 3 dias. Se QTc >500ms (ou >550ms com conducao intraventricular anormal), suspender.',
        },
      },
    ],
    contraindicacoes: [
      'QTc >440ms (ou >500ms com anormalidade de conducao)',
      'ClCr <20mL/min',
      'Uso concomitante com verapamil, cimetidina, trimetoprima, cetoconazol, megestrol',
      'Hipocalemia ou hipomagnesemia nao corrigida',
      'Sindrome do QT longo congenita',
    ],
    precaucoes: [
      'REMS obrigatorio nos EUA - somente prescritores certificados',
      'Inicio obrigatorio hospitalar',
      'Corrigir K+ e Mg2+ antes de iniciar',
      'Mulheres tem maior risco de torsades',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Tontura', 'Dor toracica'],
      graves: ['Torsades de pointes (0,8-3%)', 'Prolongamento QT', 'Bradicardia', 'Parada cardiaca'],
    },
    interacoes: [
      {
        medicamento: 'Verapamil',
        gravidade: 'contraindicada',
        efeito: 'Aumenta niveis de dofetilide significativamente',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Cimetidina',
        gravidade: 'contraindicada',
        efeito: 'Inibe secrecao tubular de dofetilide',
        conduta: 'Usar omeprazol, ranitidina ou outros',
      },
      {
        medicamento: 'Trimetoprima (isolado ou em SMX/TMP)',
        gravidade: 'contraindicada',
        efeito: 'Inibe secrecao tubular renal',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Cetoconazol e outros azois',
        gravidade: 'contraindicada',
        efeito: 'Inibe CYP3A4 e transportadores renais',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Outros prolongadores de QT (amiodarona, sotalol, antipsicóticos)',
        gravidade: 'grave',
        efeito: 'Risco aditivo de torsades de pointes',
        conduta: 'Evitar combinacoes',
      },
      {
        medicamento: 'Diureticos',
        gravidade: 'moderada',
        efeito: 'Hipocalemia aumenta risco de torsades',
        conduta: 'Monitorar K+ e Mg2+ rigorosamente',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: '500mcg 2x/dia' },
      { tfg: '40-60', ajuste: '250mcg 2x/dia' },
      { tfg: '20-40', ajuste: '125mcg 2x/dia' },
      { tfg: '<20', ajuste: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar' },
    monitorizacao: [
      'ECG continuo por minimo 3 dias no inicio',
      'QTc (suspender se >500ms)',
      'ClCr antes e periodicamente',
      'K+ e Mg2+ (corrigir antes e monitorar)',
      'Interacoes medicamentosas a cada consulta',
    ],
    orientacoesPaciente: [
      'Inicio obrigatorio em hospital',
      'Informar TODOS os medicamentos, incluindo suplementos',
      'Nao iniciar nenhum medicamento novo sem consultar',
      'Sintomas de arritmia (palpitacao, sincope) - procurar emergencia',
      'Evitar pomelo/grapefruit',
    ],
    consideracoesEspeciais: {
      idosos: 'Ajustar pela funcao renal; maior risco de torsades',
      hepatopatas: 'Sem ajuste especifico, mas cautela',
    },
    doencasRelacionadas: ['fibrilacao-atrial', 'flutter-atrial', 'arritmia'],
    citations: [],
    lastUpdate: '2024-12',
    tags: ['dofetilide', 'classe-III', 'FA', 'flutter', 'DIAMOND', 'QT', 'antiarritmico', 'Tikosyn'],
  },
];
