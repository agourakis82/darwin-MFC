/**
 * DATABASE DE MEDICAMENTOS - DARWIN-MFC
 * ======================================
 * 
 * Medicamentos essenciais para a Atenção Primária à Saúde
 * Baseado na RENAME 2024 e bulas ANVISA
 * 
 * Referências principais:
 * - RENAME 2024 (Relação Nacional de Medicamentos Essenciais)
 * - Bulas ANVISA
 * - Formulário Terapêutico Nacional
 */

import { Medicamento, getMedicamentosByClasse as groupByClasse } from '../types/medicamento';

export const medicamentos: Medicamento[] = [
  // ==========================================================================
  // ANTI-HIPERTENSIVOS
  // ==========================================================================
  {
    id: 'losartana',
    nomeGenerico: 'Losartana potássica',
    nomesComerciais: ['Cozaar', 'Losartan'],
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bra',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Hipertensão arterial sistêmica',
      'Insuficiência cardíaca com fração de ejeção reduzida',
      'Nefropatia diabética (nefroproteção)',
      'Redução de risco de AVC em hipertensos com HVE'
    ],
    mecanismoAcao: 'Antagonista do receptor AT1 da angiotensina II. Bloqueia os efeitos vasoconstritores e de retenção de sódio da angiotensina II, promovendo vasodilatação e redução da PA.',
    posologias: [
      {
        indicacao: 'Hipertensão arterial',
        adultos: {
          dose: '50mg 1x/dia (pode aumentar para 100mg/dia)',
          frequencia: '1x/dia',
          doseMaxima: '100mg/dia'
        }
      },
      {
        indicacao: 'Nefropatia diabética',
        adultos: {
          dose: '50mg 1x/dia, titular até 100mg/dia',
          frequencia: '1x/dia',
          doseMaxima: '100mg/dia',
          observacoes: 'Monitorar creatinina e potássio'
        }
      }
    ],
    contraindicacoes: [
      'Gestação (categoria D - risco fetal)',
      'Hipersensibilidade aos BRA',
      'Estenose bilateral das artérias renais',
      'Hiperpotassemia (K+ >5,5 mEq/L)',
      'Associação com Alisquireno em diabéticos ou DRC'
    ],
    precaucoes: [
      'Monitorar potássio e creatinina, especialmente em DRC',
      'Risco de hipotensão em pacientes depletados de volume',
      'Descontinuar se suspeita de gestação'
    ],
    efeitosAdversos: {
      comuns: [
        'Tontura',
        'Hipotensão ortostática',
        'Hiperpotassemia',
        'Fadiga'
      ],
      graves: [
        'Angioedema (raro, menor que IECA)',
        'Insuficiência renal aguda',
        'Rabdomiólise (muito raro)'
      ]
    },
    interacoes: [
      {
        medicamento: 'IECA (Enalapril, Captopril)',
        gravidade: 'grave',
        efeito: 'Duplo bloqueio do SRAA: risco de hiperpotassemia, hipotensão, IRA',
        conduta: 'Evitar associação. Se necessário, monitorização rigorosa'
      },
      {
        medicamento: 'Suplementos de potássio / Espironolactona',
        gravidade: 'moderada',
        efeito: 'Hiperpotassemia',
        conduta: 'Monitorar K+ regularmente'
      },
      {
        medicamento: 'AINEs (Ibuprofeno, Diclofenaco)',
        gravidade: 'moderada',
        efeito: 'Redução do efeito anti-hipertensivo e risco de IRA',
        conduta: 'Evitar uso crônico de AINEs'
      },
      {
        medicamento: 'Lítio',
        gravidade: 'moderada',
        efeito: 'Aumento dos níveis séricos de lítio',
        conduta: 'Monitorar litemia'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Não necessário', observacao: 'Dose habitual' },
      { tfg: '15-30', ajuste: 'Iniciar com 25mg, titular cuidadosamente', observacao: 'Monitorar K+ e creatinina' },
      { tfg: '<15', ajuste: 'Usar com cautela, monitorização intensiva', observacao: 'Evitar se possível' }
    ],
    gestacao: 'D',
    amamentacao: {
      compativel: false,
      observacao: 'Não recomendado durante a amamentação devido a dados insuficientes de segurança'
    },
    consideracoesEspeciais: {
      idosos: 'Não requer ajuste de dose. Iniciar com doses baixas devido ao risco de hipotensão',
      hepatopatas: 'Considerar dose inicial menor (25mg) em insuficiência hepática leve a moderada'
    },
    monitorizacao: [
      'PA regular',
      'Creatinina e potássio (1-2 semanas após início/ajuste)',
      'Função renal anual'
    ],
    orientacoesPaciente: [
      'Tomar sempre no mesmo horário',
      'Pode ser tomado com ou sem alimentos',
      'Não interromper abruptamente sem orientação médica',
      'Informar ao médico se planeja engravidar',
      'Levantar-se lentamente para evitar tontura'
    ],
    doencasRelacionadas: ['hipertensao-arterial', 'insuficiencia-cardiaca', 'nefropatia-diabetica'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['anti-hipertensivo', 'bra', 'nefroprotetor', 'cardioprotetor']
  },

  {
    id: 'enalapril',
    nomeGenerico: 'Maleato de enalapril',
    nomesComerciais: ['Renitec', 'Vasopril'],
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'ieca',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipertensão arterial sistêmica',
      'Insuficiência cardíaca com fração de ejeção reduzida',
      'Disfunção ventricular esquerda assintomática',
      'Nefropatia diabética'
    ],
    mecanismoAcao: 'Inibidor da enzima conversora de angiotensina (ECA). Reduz a conversão de angiotensina I em angiotensina II, promovendo vasodilatação e redução da aldosterona.',
    posologias: [
      {
        indicacao: 'Hipertensão arterial',
        adultos: {
          dose: '5-10mg 1-2x/dia, titular até efeito',
          frequencia: '1-2x/dia',
          doseMaxima: '40mg/dia'
        }
      },
      {
        indicacao: 'Insuficiência cardíaca',
        adultos: {
          dose: 'Iniciar 2,5mg 2x/dia, titular até 10-20mg 2x/dia',
          frequencia: '2x/dia',
          doseMaxima: '40mg/dia',
          observacoes: 'Titular lentamente a cada 2-4 semanas'
        }
      }
    ],
    contraindicacoes: [
      'Gestação (categoria D)',
      'Angioedema prévio com IECA',
      'Estenose bilateral das artérias renais',
      'Hiperpotassemia',
      'Associação com Alisquireno em DM ou DRC'
    ],
    efeitosAdversos: {
      comuns: [
        'Tosse seca persistente (5-20%)',
        'Hipotensão',
        'Tontura',
        'Hiperpotassemia'
      ],
      graves: [
        'Angioedema (pode ser fatal)',
        'Insuficiência renal aguda',
        'Neutropenia (raro)'
      ]
    },
    interacoes: [
      {
        medicamento: 'BRA (Losartana)',
        gravidade: 'grave',
        efeito: 'Duplo bloqueio do SRAA',
        conduta: 'Evitar associação'
      },
      {
        medicamento: 'AINEs',
        gravidade: 'moderada',
        efeito: 'Redução do efeito anti-hipertensivo, risco de IRA',
        conduta: 'Evitar uso crônico'
      },
      {
        medicamento: 'Espironolactona / Potássio',
        gravidade: 'moderada',
        efeito: 'Hiperpotassemia',
        conduta: 'Monitorar K+'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Dose habitual', observacao: 'Monitorar função renal' },
      { tfg: '10-30', ajuste: 'Iniciar 2,5mg/dia', observacao: 'Titular cuidadosamente' },
      { tfg: '<10', ajuste: '2,5mg em dias alternados', observacao: 'Usar com extrema cautela' }
    ],
    gestacao: 'D',
    amamentacao: {
      compativel: true,
      observacao: 'Níveis muito baixos no leite. Compatível com amamentação segundo LactMed'
    },
    orientacoesPaciente: [
      'Pode causar tosse seca - informar ao médico se persistente',
      'Evitar suplementos de potássio sem orientação',
      'Não usar se estiver grávida ou planejando engravidar'
    ],
    doencasRelacionadas: ['hipertensao-arterial', 'insuficiencia-cardiaca'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['anti-hipertensivo', 'ieca', 'cardioprotetor']
  },

  {
    id: 'anlodipino',
    nomeGenerico: 'Besilato de anlodipino',
    nomesComerciais: ['Norvasc', 'Pressat'],
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bcc',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipertensão arterial sistêmica',
      'Angina estável crônica',
      'Angina vasoespástica (Prinzmetal)'
    ],
    mecanismoAcao: 'Bloqueador dos canais de cálcio tipo L. Inibe o influxo de cálcio nas células musculares lisas vasculares, promovendo vasodilatação arterial e redução da resistência vascular periférica.',
    posologias: [
      {
        indicacao: 'Hipertensão arterial',
        adultos: {
          dose: '5mg 1x/dia, pode aumentar para 10mg',
          frequencia: '1x/dia',
          doseMaxima: '10mg/dia'
        },
        idosos: {
          dose: '2,5-5mg/dia',
          observacoes: 'Iniciar com dose baixa'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a di-hidropiridínicos',
      'Choque cardiogênico',
      'Estenose aórtica grave'
    ],
    efeitosAdversos: {
      comuns: [
        'Edema de membros inferiores (dose-dependente)',
        'Cefaleia',
        'Rubor facial (flushing)',
        'Tontura',
        'Palpitações'
      ],
      graves: [
        'Hipotensão severa (raro)',
        'Angina paradoxal (muito raro)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Sinvastatina',
        gravidade: 'moderada',
        efeito: 'Aumento dos níveis de sinvastatina - risco de miopatia',
        conduta: 'Limitar sinvastatina a 20mg/dia'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'moderada',
        efeito: 'Aumento dos níveis de ciclosporina',
        conduta: 'Monitorar níveis'
      }
    ],
    ajusteDoseRenal: [
      { tfg: 'qualquer', ajuste: 'Não necessário', observacao: 'Eliminação principalmente hepática' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Níveis baixos no leite. Provavelmente compatível'
    },
    orientacoesPaciente: [
      'Pode causar inchaço nos tornozelos - elevar pernas ajuda',
      'Evitar suco de grapefruit (pomelo)',
      'Pode ser tomado com ou sem alimentos'
    ],
    doencasRelacionadas: ['hipertensao-arterial', 'angina'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['anti-hipertensivo', 'bcc', 'angina']
  },

  {
    id: 'hidroclorotiazida',
    nomeGenerico: 'Hidroclorotiazida',
    nomesComerciais: ['Clorana', 'Drenol'],
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'diuretico_tiazidico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '12,5mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Hipertensão arterial sistêmica',
      'Edema de origem cardíaca, hepática ou renal',
      'Prevenção de litíase renal cálcica recorrente'
    ],
    mecanismoAcao: 'Diurético tiazídico. Inibe o cotransportador Na-Cl no túbulo contorcido distal, aumentando a excreção de sódio e água.',
    posologias: [
      {
        indicacao: 'Hipertensão arterial',
        adultos: {
          dose: '12,5-25mg 1x/dia pela manhã',
          frequencia: '1x/dia',
          doseMaxima: '50mg/dia (doses maiores não aumentam eficácia)'
        }
      }
    ],
    contraindicacoes: [
      'Anúria',
      'Hipersensibilidade a sulfonamidas',
      'Hipocalemia refratária',
      'Hiponatremia sintomática',
      'Gota aguda'
    ],
    efeitosAdversos: {
      comuns: [
        'Hipocalemia',
        'Hiponatremia',
        'Hiperuricemia',
        'Hiperglicemia',
        'Dislipidemia',
        'Fotossensibilidade'
      ],
      graves: [
        'Pancreatite',
        'Agranulocitose (raro)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Lítio',
        gravidade: 'grave',
        efeito: 'Aumento dos níveis de lítio - toxicidade',
        conduta: 'Evitar associação ou monitorar litemia rigorosamente'
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Hipocalemia aumenta risco de toxicidade digitálica',
        conduta: 'Monitorar K+'
      },
      {
        medicamento: 'AINEs',
        gravidade: 'moderada',
        efeito: 'Redução do efeito diurético e anti-hipertensivo',
        conduta: 'Evitar uso crônico'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Dose habitual', observacao: 'Eficácia mantida' },
      { tfg: '<30', ajuste: 'Ineficaz - substituir por diurético de alça', observacao: 'Tiazídicos perdem eficácia' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Níveis baixos no leite. Compatível, mas pode reduzir produção de leite'
    },
    monitorizacao: [
      'Eletrólitos (K+, Na+, Mg++) basais e periódicos',
      'Glicemia',
      'Ácido úrico',
      'Perfil lipídico'
    ],
    orientacoesPaciente: [
      'Tomar pela manhã para evitar noctúria',
      'Consumir alimentos ricos em potássio (banana, laranja)',
      'Usar protetor solar - aumenta sensibilidade ao sol'
    ],
    doencasRelacionadas: ['hipertensao-arterial'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['anti-hipertensivo', 'diuretico', 'tiazidico']
  },

  // ==========================================================================
  // ANTIDIABÉTICOS
  // ==========================================================================
  {
    id: 'metformina',
    nomeGenerico: 'Cloridrato de metformina',
    nomesComerciais: ['Glifage', 'Glucoformin'],
    classeTerapeutica: 'antidiabetico',
    subclasse: 'biguanida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '850mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Diabetes mellitus tipo 2',
      'Pré-diabetes (prevenção)',
      'Síndrome dos ovários policísticos (off-label)'
    ],
    mecanismoAcao: 'Biguanida. Reduz a produção hepática de glicose (gliconeogênese), aumenta a sensibilidade periférica à insulina e reduz a absorção intestinal de glicose.',
    posologias: [
      {
        indicacao: 'Diabetes mellitus tipo 2',
        adultos: {
          dose: 'Iniciar 500mg 1-2x/dia, titular até 2000-2550mg/dia',
          frequencia: '2-3x/dia às refeições',
          doseMaxima: '2550mg/dia',
          observacoes: 'Titular a cada 1-2 semanas para minimizar efeitos GI'
        }
      }
    ],
    contraindicacoes: [
      'TFG <30 mL/min (CI absoluta)',
      'Acidose metabólica aguda (cetoacidose, acidose láctica)',
      'Insuficiência hepática grave',
      'Alcoolismo',
      'Antes de exames com contraste iodado (suspender 48h)',
      'Cirurgias de grande porte (suspender 24-48h antes)'
    ],
    efeitosAdversos: {
      comuns: [
        'Náuseas',
        'Diarreia',
        'Dor abdominal',
        'Flatulência',
        'Gosto metálico'
      ],
      graves: [
        'Acidose láctica (raro, mas grave)',
        'Deficiência de vitamina B12 (uso crônico)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Contraste iodado',
        gravidade: 'grave',
        efeito: 'Risco de acidose láctica por IRA induzida por contraste',
        conduta: 'Suspender 48h antes e reiniciar 48h após, se creatinina estável'
      },
      {
        medicamento: 'Álcool',
        gravidade: 'moderada',
        efeito: 'Potencializa risco de acidose láctica',
        conduta: 'Orientar moderação do álcool'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Dose habitual (até 2550mg)', observacao: '' },
      { tfg: '45-60', ajuste: 'Dose máxima 2000mg/dia', observacao: 'Monitorar TFG a cada 3-6 meses' },
      { tfg: '30-45', ajuste: 'Dose máxima 1000mg/dia', observacao: 'Não iniciar, mas pode manter se já em uso' },
      { tfg: '<30', ajuste: 'Contraindicado', observacao: 'Suspender' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: true,
      observacao: 'Níveis muito baixos no leite. Compatível com amamentação'
    },
    monitorizacao: [
      'HbA1c a cada 3-6 meses',
      'Creatinina e TFG anual (ou mais frequente se DRC)',
      'Vitamina B12 anual (uso crônico)'
    ],
    orientacoesPaciente: [
      'Tomar durante ou após as refeições para reduzir efeitos GI',
      'Iniciar com dose baixa e aumentar gradualmente',
      'Evitar consumo excessivo de álcool',
      'Informar antes de exames com contraste'
    ],
    doencasRelacionadas: ['diabetes-mellitus-2'],
    calculadoras: ['ckdepi', 'findrisc'],
    citations: [{ refId: 'rename-2024' }, { refId: 'sbd-2024' }],
    lastUpdate: '2024-12',
    tags: ['antidiabetico', 'biguanida', 'dm2']
  },

  // ==========================================================================
  // PSICOFÁRMACOS
  // ==========================================================================
  {
    id: 'fluoxetina',
    nomeGenerico: 'Cloridrato de fluoxetina',
    nomesComerciais: ['Prozac', 'Daforin'],
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '20mg/mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Transtorno depressivo maior',
      'Transtorno de ansiedade generalizada',
      'Transtorno de pânico',
      'Transtorno obsessivo-compulsivo',
      'Bulimia nervosa'
    ],
    mecanismoAcao: 'Inibidor seletivo da recaptação de serotonina (ISRS). Bloqueia o transportador de serotonina (SERT), aumentando a disponibilidade de serotonina na fenda sináptica.',
    posologias: [
      {
        indicacao: 'Depressão maior',
        adultos: {
          dose: '20mg 1x/dia pela manhã, pode aumentar até 60-80mg',
          frequencia: '1x/dia',
          doseMaxima: '80mg/dia',
          observacoes: 'Efeito em 2-4 semanas. Manter 6-12 meses após remissão'
        }
      },
      {
        indicacao: 'TOC',
        adultos: {
          dose: '20mg/dia, titular até 40-60mg/dia',
          frequencia: '1x/dia',
          doseMaxima: '80mg/dia'
        }
      }
    ],
    contraindicacoes: [
      'Uso concomitante de IMAO (ou <14 dias após suspensão)',
      'Uso de pimozida ou tioridazina',
      'Hipersensibilidade a fluoxetina'
    ],
    precaucoes: [
      'Risco de ideação suicida em jovens <25 anos (monitorar)',
      'Risco de sangramento (especialmente com AINEs, anticoagulantes)',
      'Síndrome serotoninérgica com associações',
      'Hiponatremia em idosos'
    ],
    efeitosAdversos: {
      comuns: [
        'Náusea',
        'Cefaleia',
        'Insônia',
        'Nervosismo',
        'Disfunção sexual',
        'Diarreia',
        'Anorexia'
      ],
      graves: [
        'Síndrome serotoninérgica',
        'Prolongamento do QT',
        'Mania/hipomania (em bipolares não diagnosticados)',
        'Sangramento GI'
      ]
    },
    interacoes: [
      {
        medicamento: 'IMAOs (Tranilcipromina, Selegilina)',
        gravidade: 'contraindicada',
        efeito: 'Síndrome serotoninérgica potencialmente fatal',
        conduta: 'Intervalo de 14 dias entre fluoxetina e IMAO; 5 semanas ao trocar fluoxetina por IMAO'
      },
      {
        medicamento: 'Tamoxifeno',
        gravidade: 'grave',
        efeito: 'Fluoxetina inibe CYP2D6, reduzindo conversão de tamoxifeno em metabólito ativo',
        conduta: 'Evitar associação. Preferir outro ISRS (sertralina, escitalopram)'
      },
      {
        medicamento: 'Warfarina / AINEs',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Monitorar sinais de sangramento'
      },
      {
        medicamento: 'Tramadol',
        gravidade: 'moderada',
        efeito: 'Risco de síndrome serotoninérgica e convulsões',
        conduta: 'Usar com cautela, monitorar'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Dose habitual', observacao: '' },
      { tfg: '<30', ajuste: 'Reduzir dose ou aumentar intervalo', observacao: 'Metabólito ativo pode acumular' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Níveis baixos no leite. Considerado relativamente seguro. Preferir sertralina se possível'
    },
    monitorizacao: [
      'Sintomas de depressão e resposta (PHQ-9)',
      'Ideação suicida (especialmente em jovens)',
      'Efeitos adversos',
      'Sódio em idosos (risco de SIADH)'
    ],
    orientacoesPaciente: [
      'Tomar pela manhã para evitar insônia',
      'Efeito demora 2-4 semanas para aparecer',
      'Não interromper abruptamente',
      'Evitar álcool',
      'Informar sobre disfunção sexual'
    ],
    doencasRelacionadas: ['depressao', 'ansiedade'],
    calculadoras: ['phq9'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'isrs', 'ansiedade', 'depressao']
  },

  {
    id: 'amitriptilina',
    nomeGenerico: 'Cloridrato de amitriptilina',
    nomesComerciais: ['Tryptanol', 'Amytril'],
    classeTerapeutica: 'antidepressivo',
    subclasse: 'triciclico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Transtorno depressivo maior',
      'Dor neuropática',
      'Profilaxia de enxaqueca',
      'Fibromialgia',
      'Insônia (doses baixas)'
    ],
    mecanismoAcao: 'Antidepressivo tricíclico. Inibe a recaptação de noradrenalina e serotonina. Também possui efeitos anticolinérgicos, anti-histamínicos e bloqueio de canais de sódio.',
    posologias: [
      {
        indicacao: 'Depressão',
        adultos: {
          dose: 'Iniciar 25mg à noite, titular até 100-150mg/dia',
          frequencia: '1x/dia à noite (ou dividido)',
          doseMaxima: '300mg/dia (em internação)'
        }
      },
      {
        indicacao: 'Dor neuropática / Profilaxia de enxaqueca',
        adultos: {
          dose: '10-25mg à noite, titular até 50-75mg',
          frequencia: '1x/dia à noite',
          doseMaxima: '150mg/dia'
        }
      }
    ],
    contraindicacoes: [
      'IAM recente',
      'Bloqueio de ramo, BAV',
      'Uso concomitante de IMAO',
      'Glaucoma de ângulo fechado',
      'Retenção urinária grave',
      'Fase maníaca do transtorno bipolar'
    ],
    efeitosAdversos: {
      comuns: [
        'Sonolência',
        'Boca seca',
        'Constipação',
        'Ganho de peso',
        'Visão borrada',
        'Hipotensão ortostática',
        'Retenção urinária'
      ],
      graves: [
        'Arritmias cardíacas',
        'Prolongamento do QT',
        'Convulsões (overdose)',
        'Síndrome anticolinérgica central'
      ]
    },
    interacoes: [
      {
        medicamento: 'IMAOs',
        gravidade: 'contraindicada',
        efeito: 'Crise hipertensiva, síndrome serotoninérgica',
        conduta: 'Intervalo de 14 dias'
      },
      {
        medicamento: 'Medicamentos que prolongam QT',
        gravidade: 'grave',
        efeito: 'Arritmias ventriculares',
        conduta: 'Evitar associação'
      },
      {
        medicamento: 'Anticolinérgicos',
        gravidade: 'moderada',
        efeito: 'Potencialização de efeitos anticolinérgicos',
        conduta: 'Evitar, especialmente em idosos'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Dose habitual', observacao: 'Metabolizado no fígado' },
      { tfg: '<30', ajuste: 'Usar com cautela', observacao: 'Metabólitos podem acumular' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Níveis baixos no leite. Monitorar sedação no lactente'
    },
    consideracoesEspeciais: {
      idosos: 'EVITAR em idosos (critérios de Beers) - alto risco anticolinérgico, sedação, quedas. Se necessário, doses muito baixas'
    },
    monitorizacao: [
      'ECG antes de iniciar em >40 anos ou cardiopatas',
      'PA (hipotensão ortostática)',
      'Peso',
      'Sintomas anticolinérgicos'
    ],
    orientacoesPaciente: [
      'Tomar à noite (causa sonolência)',
      'Levantar-se lentamente',
      'Evitar dirigir até conhecer efeitos',
      'Beber bastante água (boca seca)',
      'Evitar álcool'
    ],
    doencasRelacionadas: ['depressao', 'dor-neuropatica', 'enxaqueca'],
    calculadoras: ['phq9'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antidepressivo', 'triciclico', 'dor-neuropatica', 'profilaxia-enxaqueca']
  },

  // ==========================================================================
  // ANALGÉSICOS / ANTI-INFLAMATÓRIOS
  // ==========================================================================
  {
    id: 'ibuprofeno',
    nomeGenerico: 'Ibuprofeno',
    nomesComerciais: ['Advil', 'Alivium', 'Motrin'],
    classeTerapeutica: 'anti_inflamatorio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '600mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '50mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Dor leve a moderada',
      'Febre',
      'Inflamação (artrite, tendinite)',
      'Dismenorreia',
      'Cefaleia'
    ],
    mecanismoAcao: 'Anti-inflamatório não esteroidal (AINE). Inibe as enzimas ciclooxigenases (COX-1 e COX-2), reduzindo a síntese de prostaglandinas envolvidas na dor, febre e inflamação.',
    posologias: [
      {
        indicacao: 'Dor/febre',
        adultos: {
          dose: '200-400mg a cada 4-6h',
          frequencia: '3-4x/dia',
          doseMaxima: '2400mg/dia (curto prazo), 1200mg/dia (crônico)'
        },
        pediatrico: {
          dose: '5-10mg/kg/dose a cada 6-8h',
          frequencia: '3-4x/dia',
          doseMaxima: '40mg/kg/dia',
          idadeMinima: '>6 meses'
        }
      }
    ],
    contraindicacoes: [
      'Úlcera péptica ativa ou história de sangramento GI',
      'Insuficiência renal grave (TFG <30)',
      'Insuficiência cardíaca grave (NYHA III-IV)',
      '3º trimestre de gestação',
      'Alergia a AINEs ou AAS (risco de reação cruzada)',
      'Pós-operatório de cirurgia cardíaca (CABG)'
    ],
    efeitosAdversos: {
      comuns: [
        'Dispepsia',
        'Náusea',
        'Dor abdominal',
        'Diarreia',
        'Cefaleia'
      ],
      graves: [
        'Sangramento gastrointestinal',
        'Úlcera péptica',
        'Insuficiência renal aguda',
        'Eventos cardiovasculares (uso crônico)',
        'Reações alérgicas graves'
      ]
    },
    interacoes: [
      {
        medicamento: 'Anticoagulantes (Warfarina)',
        gravidade: 'grave',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Evitar associação ou monitorar INR rigorosamente'
      },
      {
        medicamento: 'IECA / BRA / Diuréticos',
        gravidade: 'moderada',
        efeito: 'Redução do efeito anti-hipertensivo e risco de IRA',
        conduta: 'Evitar uso crônico de AINEs'
      },
      {
        medicamento: 'Metotrexato',
        gravidade: 'grave',
        efeito: 'Aumento da toxicidade do metotrexato',
        conduta: 'Evitar em doses altas de MTX'
      },
      {
        medicamento: 'Lítio',
        gravidade: 'moderada',
        efeito: 'Aumento dos níveis de lítio',
        conduta: 'Monitorar litemia'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Dose habitual', observacao: 'Uso pelo menor tempo possível' },
      { tfg: '30-60', ajuste: 'Usar com cautela, menor dose eficaz', observacao: 'Evitar uso prolongado' },
      { tfg: '<30', ajuste: 'Evitar', observacao: 'Risco de IRA e retenção hídrica' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Níveis muito baixos no leite. Compatível em doses baixas e uso breve'
    },
    orientacoesPaciente: [
      'Tomar com alimentos para proteger o estômago',
      'Usar pelo menor tempo necessário',
      'Evitar se tiver problemas de estômago, rins ou coração',
      'Não associar com outros anti-inflamatórios'
    ],
    doencasRelacionadas: ['lombalgia', 'artrite'],
    calculadoras: ['ckdepi'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['aine', 'analgesico', 'anti-inflamatorio', 'antipiretico']
  },

  // ==========================================================================
  // ANTIBIÓTICOS
  // ==========================================================================
  {
    id: 'amoxicilina',
    nomeGenerico: 'Amoxicilina',
    nomesComerciais: ['Amoxil', 'Novocilin'],
    classeTerapeutica: 'antibiotico',
    subclasse: 'penicilina',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '500mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '250mg/5mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Infecções do trato respiratório superior (sinusite, otite, faringite)',
      'Pneumonia adquirida na comunidade',
      'Infecções urinárias não complicadas',
      'Infecções de pele e tecidos moles',
      'Erradicação de H. pylori (associado)',
      'Profilaxia de endocardite infecciosa'
    ],
    mecanismoAcao: 'Antibiótico betalactâmico (aminopenicilina). Inibe a síntese da parede celular bacteriana ligando-se às proteínas de ligação à penicilina (PBPs).',
    posologias: [
      {
        indicacao: 'Infecções respiratórias',
        adultos: {
          dose: '500mg 8/8h ou 875mg 12/12h',
          frequencia: '2-3x/dia',
          doseMaxima: '3g/dia'
        },
        pediatrico: {
          dose: '40-90mg/kg/dia dividido em 2-3 doses',
          frequencia: '2-3x/dia',
          observacoes: 'Dose alta (90mg/kg) para pneumonia e OMA'
        }
      }
    ],
    contraindicacoes: [
      'Alergia a penicilinas',
      'História de reação anafilática a betalactâmicos',
      'Mononucleose infecciosa (risco de rash)'
    ],
    efeitosAdversos: {
      comuns: [
        'Diarreia',
        'Náusea',
        'Rash cutâneo',
        'Candidíase oral ou vaginal'
      ],
      graves: [
        'Reação anafilática',
        'Síndrome de Stevens-Johnson (raro)',
        'Colite pseudomembranosa',
        'Nefrite intersticial'
      ]
    },
    interacoes: [
      {
        medicamento: 'Alopurinol',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de rash cutâneo',
        conduta: 'Monitorar'
      },
      {
        medicamento: 'Metotrexato',
        gravidade: 'moderada',
        efeito: 'Redução da excreção de metotrexato',
        conduta: 'Monitorar toxicidade do MTX'
      },
      {
        medicamento: 'Anticoagulantes orais',
        gravidade: 'leve',
        efeito: 'Possível aumento do INR',
        conduta: 'Monitorar INR'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Dose habitual', observacao: '' },
      { tfg: '10-30', ajuste: '250-500mg 12/12h', observacao: 'Reduzir dose ou aumentar intervalo' },
      { tfg: '<10', ajuste: '250-500mg 24/24h', observacao: 'Dose pós-diálise se hemodiálise' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: true,
      observacao: 'Compatível com amamentação. Níveis baixos no leite'
    },
    orientacoesPaciente: [
      'Completar todo o tratamento mesmo se melhorar',
      'Pode ser tomado com ou sem alimentos',
      'Suspensão deve ser guardada na geladeira após reconstituição',
      'Informar ao médico se tiver alergia a penicilina'
    ],
    doencasRelacionadas: ['infeccao-respiratoria', 'otite', 'sinusite'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2024-12',
    tags: ['antibiotico', 'penicilina', 'betalactamico']
  }
];

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

export { groupByClasse as getMedicamentosByClasse };

export function getMedicamentoById(id: string): Medicamento | undefined {
  return medicamentos.find(m => m.id === id);
}

export function searchMedicamentos(termo: string): Medicamento[] {
  const termoLower = termo.toLowerCase();
  return medicamentos.filter(m =>
    m.nomeGenerico.toLowerCase().includes(termoLower) ||
    m.nomesComerciais?.some(n => n.toLowerCase().includes(termoLower)) ||
    m.indicacoes.some(i => i.toLowerCase().includes(termoLower)) ||
    m.tags?.some(t => t.toLowerCase().includes(termoLower))
  );
}

export function getMedicamentosRENAME(): Medicamento[] {
  return medicamentos.filter(m => m.rename);
}

export function getMedicamentosPorClasse(classe: string): Medicamento[] {
  return medicamentos.filter(m => m.classeTerapeutica === classe);
}

