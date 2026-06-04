/**
 * ANTIVIRAIS NOVOS - DARWIN-MFC EXPANSAO 1000
 * ===========================================
 * Antivirais de nova geracao (HIV, Hepatites, COVID-19, CMV)
 *
 * Referencias:
 * - DHHS Guidelines for HIV/AIDS Treatment (2024)
 * - AASLD/IDSA HCV Guidelines (2024)
 * - NIH COVID-19 Treatment Guidelines (2024)
 * - Uptodate Drug Information
 */

import { Medicamento } from '@/lib/types/medicamento';

export const antiviraisNovos: Partial<Medicamento>[] = [
  // ==================== HIV/AIDS - NOVAS CLASSES ====================

  // 1. LENACAPAVIR - Inibidor de Capsideo (primeiro da classe)
  {
    id: 'lenacapavir',
    nomeGenerico: 'Lenacapavir',
    nomesComerciais: ['Sunlenca'],
    atcCode: 'J05AX29',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '463.5mg/1.5ml', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: false }
    ],
    indicacoes: [
      'HIV-1 multidroga resistente (MDR) em combinacao com outros ARV',
      'HIV-1 em adultos virologicamente suprimidos (em combinacao com islatravir - em estudo)',
      'Profilaxia pre-exposicao (PrEP) - aprovado 2024'
    ],
    mecanismoAcao: 'Primeiro inibidor de capsideo do HIV-1. Interfere em multiplas etapas do ciclo viral: entrada nuclear do DNA viral, montagem e liberacao do capsideo, estabilidade do capsideo durante transporte.',
    posologias: [
      {
        indicacao: 'HIV MDR - Inducao oral',
        adultos: {
          dose: '600mg (2 comprimidos) D1 e D2, depois 300mg D8',
          frequencia: 'Dose unica nos dias indicados',
          observacoes: 'Seguido de injecao SC no D15'
        }
      },
      {
        indicacao: 'HIV MDR - Manutencao',
        adultos: {
          dose: '927mg SC (2 injecoes de 1.5ml)',
          frequencia: 'A cada 6 meses (26 semanas)',
          observacoes: 'Meia-vida ultralonga permite dosagem semestral'
        }
      },
      {
        indicacao: 'PrEP',
        adultos: {
          dose: '927mg SC',
          frequencia: 'A cada 6 meses apos dose de inducao oral'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao lenacapavir',
      'Uso concomitante de rifampicina ou outros indutores potentes de CYP3A/P-gp',
      'Uso com carbamazepina, fenitoina, fenobarbital',
      'Uso com Hypericum perforatum (Erva de Sao Joao)'
    ],
    precaucoes: [
      'Reacoes no local da injecao (nodulos subcutaneos)',
      'Interacoes medicamentosas - verificar sempre',
      'Nao usar como monoterapia',
      'Monitorar carga viral e CD4',
      'Sem dados em gestacao'
    ],
    efeitosAdversos: {
      comuns: [
        'Reacoes no local da injecao (63%)',
        'Nodulos subcutaneos',
        'Nausea',
        'Diarreia'
      ],
      graves: [
        'Sindrome de reconstituicao imune',
        'Reacoes de hipersensibilidade'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis de lenacapavir em >90%',
        conduta: 'Contraindicado - usar alternativa para TB'
      },
      {
        medicamento: 'Carbamazepina/Fenitoina',
        gravidade: 'contraindicada',
        efeito: 'Indutores CYP3A/P-gp reduzem lenacapavir',
        conduta: 'Contraindicado'
      },
      {
        medicamento: 'Atazanavir',
        gravidade: 'moderada',
        efeito: 'Aumenta niveis de lenacapavir',
        conduta: 'Pode usar - monitorar'
      },
      {
        medicamento: 'Voriconazol',
        gravidade: 'moderada',
        efeito: 'Pode aumentar niveis de lenacapavir',
        conduta: 'Usar com cautela'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Dados limitados - usar com cautela' }
    ],
    gestacao: 'N',
    amamentacao: {
      compativel: false,
      observacao: 'HIV: amamentacao contraindicada. Dados insuficientes sobre excrecao no leite.'
    },
    monitorizacao: [
      'Carga viral HIV a cada 6 meses',
      'Contagem CD4',
      'Reacoes no local de injecao',
      'Teste de resistencia se falha virologica'
    ],
    consideracoesEspeciais: {
      idosos: 'Dados limitados em >65 anos',
      hepatopatas: 'Sem ajuste em Child-Pugh A/B. Nao estudado em Child-Pugh C.'
    },
    doencasRelacionadas: ['hiv-aids', 'infeccao-hiv'],
    tags: ['hiv', 'aids', 'antirretroviral', 'inibidor-capsideo', 'injetavel', 'longa-acao', 'prep', 'mdr'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 2. CABOTEGRAVIR + RILPIVIRINA LA - Regime injetavel mensal/bimestral
  {
    id: 'cabotegravir-rilpivirina-la',
    nomeGenerico: 'Cabotegravir + Rilpivirina (Liberacao Prolongada)',
    nomesComerciais: ['Cabenuva', 'Vocabria + Rekambys'],
    atcCode: 'J05AR24',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_im', concentracao: '400mg CAB + 600mg RPV (mensal)', disponivelSUS: false },
      { forma: 'injetavel_im', concentracao: '600mg CAB + 900mg RPV (bimestral)', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '30mg CAB (oral lead-in)', disponivelSUS: false }
    ],
    indicacoes: [
      'HIV-1 em adultos virologicamente suprimidos (CV <50)',
      'Substituicao de regime oral estavel sem falha previa a NNRTI ou INI',
      'Pacientes sem resistencia conhecida a cabotegravir ou rilpivirina'
    ],
    mecanismoAcao: 'Cabotegravir: inibidor de integrase (INI) de segunda geracao. Rilpivirina: NNRTI. Formulacao de liberacao prolongada permite dosagem mensal ou bimestral IM.',
    posologias: [
      {
        indicacao: 'Lead-in oral (opcional)',
        adultos: {
          dose: 'CAB 30mg + RPV 25mg VO',
          frequencia: '1x/dia por pelo menos 28 dias',
          observacoes: 'Para avaliar tolerabilidade antes de iniciar injetavel'
        }
      },
      {
        indicacao: 'Regime mensal - Inducao',
        adultos: {
          dose: 'CAB 600mg IM + RPV 900mg IM',
          frequencia: 'Dose unica de inducao',
          observacoes: 'Duas injecoes em locais diferentes (gluteo)'
        }
      },
      {
        indicacao: 'Regime mensal - Manutencao',
        adultos: {
          dose: 'CAB 400mg IM + RPV 600mg IM',
          frequencia: 'A cada mes (4 semanas +/- 7 dias)'
        }
      },
      {
        indicacao: 'Regime bimestral - Inducao',
        adultos: {
          dose: 'CAB 600mg IM + RPV 900mg IM',
          frequencia: 'Dose unica de inducao'
        }
      },
      {
        indicacao: 'Regime bimestral - Manutencao',
        adultos: {
          dose: 'CAB 600mg IM + RPV 900mg IM',
          frequencia: 'A cada 2 meses (8 semanas +/- 7 dias)'
        }
      }
    ],
    contraindicacoes: [
      'Carga viral detectavel (>50 copias/ml)',
      'Historia de falha virologica a NNRTI ou INI',
      'Mutacoes de resistencia conhecidas a NNRTI ou INI',
      'Uso concomitante de rifampicina, rifabutina, rifapentina',
      'Uso de carbamazepina, oxcarbazepina, fenitoina, fenobarbital',
      'Uso de dexametasona sistemica (multiplas doses)',
      'Uso de IBPs (omeprazol, esomeprazol, pantoprazol)'
    ],
    precaucoes: [
      'Administrar apenas por profissional de saude treinado',
      'Injecao IM profunda no gluteo',
      'Risco de depressao/ideacao suicida (monitorar)',
      'Risco de hepatotoxicidade',
      'Reacoes pos-injecao',
      'Syndrome de reconstituicao imune',
      'Interacoes com IBPs e anticonvulsivantes'
    ],
    efeitosAdversos: {
      comuns: [
        'Reacoes no local da injecao (84%)',
        'Dor no local da injecao',
        'Cefaleia',
        'Pirexia',
        'Fadiga',
        'Nausea'
      ],
      graves: [
        'Reacoes de hipersensibilidade',
        'Hepatotoxicidade',
        'Depressao e ideacao suicida',
        'Sindrome de reconstituicao imune'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina/Rifabutina',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis de CAB e RPV significativamente',
        conduta: 'Contraindicado - usar regime oral alternativo para TB'
      },
      {
        medicamento: 'IBPs (Omeprazol)',
        gravidade: 'contraindicada',
        efeito: 'Reduz absorção de rilpivirina',
        conduta: 'Contraindicado - usar H2 bloqueador ou antiacido se necessario'
      },
      {
        medicamento: 'Carbamazepina/Fenitoina',
        gravidade: 'contraindicada',
        efeito: 'Indutores enzimaticos reduzem niveis',
        conduta: 'Contraindicado'
      },
      {
        medicamento: 'Metformina',
        gravidade: 'leve',
        efeito: 'CAB pode aumentar niveis de metformina',
        conduta: 'Dose maxima metformina 1000mg/dia'
      },
      {
        medicamento: 'Antiacidos',
        gravidade: 'moderada',
        efeito: 'Reduz absorção de RPV oral (lead-in)',
        conduta: 'Separar 2h antes ou 4h depois'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Usar com cautela - dados limitados' }
    ],
    gestacao: 'N',
    amamentacao: {
      compativel: false,
      observacao: 'HIV: amamentacao contraindicada. Rilpivirina excretada no leite.'
    },
    monitorizacao: [
      'Carga viral antes de iniciar e a cada 2-3 meses inicialmente',
      'Funcao hepatica',
      'Sintomas depressivos',
      'Reacoes no local de injecao',
      'Adesao ao calendario de injecoes'
    ],
    orientacoesPaciente: [
      'Nao perder consultas para injecao',
      'Aplicar compressas mornas no local se dor',
      'Relatar sintomas depressivos imediatamente',
      'Evitar antiacidos e IBPs'
    ],
    consideracoesEspeciais: {
      idosos: 'Dados limitados em >65 anos',
      hepatopatas: 'Sem ajuste em Child-Pugh A/B. Nao recomendado em Child-Pugh C.'
    },
    doencasRelacionadas: ['hiv-aids', 'infeccao-hiv'],
    tags: ['hiv', 'aids', 'antirretroviral', 'inibidor-integrase', 'nnrti', 'injetavel', 'longa-acao', 'mensal', 'bimestral'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 3. FOSTEMSAVIR - Inibidor de Attachment
  {
    id: 'fostemsavir',
    nomeGenerico: 'Fostemsavir',
    nomesComerciais: ['Rukobia'],
    atcCode: 'J05AX29',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '600mg', disponivelSUS: false }
    ],
    indicacoes: [
      'HIV-1 multidroga resistente em adultos',
      'Pacientes com falha a multiplos regimes antirretrovirais',
      'Em combinacao com outros ARV quando opcoes limitadas'
    ],
    mecanismoAcao: 'Pro-droga do temsavir. Inibidor de attachment - liga-se a gp120 do HIV impedindo a ligacao ao receptor CD4, bloqueando entrada viral na celula.',
    posologias: [
      {
        indicacao: 'HIV MDR',
        adultos: {
          dose: '600mg',
          frequencia: '12/12h com ou sem alimento',
          observacoes: 'Engolir inteiro - nao mastigar, quebrar ou esmagar'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao fostemsavir ou temsavir',
      'Uso concomitante de indutores fortes de CYP3A (rifampicina, carbamazepina, fenitoina)'
    ],
    precaucoes: [
      'Sindrome de reconstituicao imune',
      'Prolongamento QTc - cautela com outros farmacos que prolongam QT',
      'Elevacao de transaminases',
      'Interacoes medicamentosas extensas',
      'Nao usar como monoterapia'
    ],
    efeitosAdversos: {
      comuns: [
        'Nausea',
        'Diarreia',
        'Cefaleia',
        'Rash',
        'Fadiga',
        'Dor abdominal'
      ],
      graves: [
        'Sindrome de reconstituicao imune',
        'Prolongamento QTc',
        'Reacoes de hipersensibilidade',
        'Hepatotoxicidade'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis de temsavir em 82%',
        conduta: 'Contraindicado'
      },
      {
        medicamento: 'Carbamazepina/Fenitoina',
        gravidade: 'contraindicada',
        efeito: 'Reducao significativa de temsavir',
        conduta: 'Contraindicado'
      },
      {
        medicamento: 'Etinilestradiol',
        gravidade: 'moderada',
        efeito: 'Fostemsavir aumenta niveis de etinilestradiol',
        conduta: 'Usar contraceptivo com max 30mcg EE'
      },
      {
        medicamento: 'Estatinas',
        gravidade: 'moderada',
        efeito: 'Fostemsavir pode aumentar niveis de estatinas',
        conduta: 'Usar menor dose e monitorar toxicidade'
      },
      {
        medicamento: 'Farmacos que prolongam QT',
        gravidade: 'moderada',
        efeito: 'Risco aditivo de prolongamento QTc',
        conduta: 'Evitar combinacao se possivel'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Sem ajuste, mas dados limitados em dialise' }
    ],
    gestacao: 'N',
    amamentacao: {
      compativel: false,
      observacao: 'HIV: amamentacao contraindicada. Dados insuficientes.'
    },
    monitorizacao: [
      'Carga viral e CD4',
      'ECG se uso concomitante de farmacos que prolongam QT',
      'Funcao hepatica',
      'Teste de resistencia se falha'
    ],
    doencasRelacionadas: ['hiv-aids', 'infeccao-hiv'],
    tags: ['hiv', 'aids', 'antirretroviral', 'inibidor-attachment', 'mdr', 'resgate'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 4. IBALIZUMAB - Anticorpo monoclonal anti-CD4
  {
    id: 'ibalizumab',
    nomeGenerico: 'Ibalizumab-uiyk',
    nomesComerciais: ['Trogarzo'],
    atcCode: 'J05AX21',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '200mg/1.33ml', disponivelSUS: false }
    ],
    indicacoes: [
      'HIV-1 multidroga resistente em adultos',
      'Pacientes experimentados com falha a multiplas terapias',
      'Em combinacao com outros ARV ativos'
    ],
    mecanismoAcao: 'Anticorpo monoclonal humanizado que se liga ao dominio 2 do receptor CD4, bloqueando passos pos-attachment necessarios para entrada do HIV-1 na celula. Nao depleta celulas CD4.',
    posologias: [
      {
        indicacao: 'HIV MDR - Dose de ataque',
        adultos: {
          dose: '2000mg IV',
          frequencia: 'Dose unica de ataque',
          observacoes: 'Infusao IV durante 30 minutos'
        }
      },
      {
        indicacao: 'HIV MDR - Manutencao',
        adultos: {
          dose: '800mg IV',
          frequencia: 'A cada 2 semanas',
          observacoes: 'Pode infundir em 15 minutos se bem tolerado'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao ibalizumab'
    ],
    precaucoes: [
      'Reacoes infusionais - monitorar durante e 1h apos',
      'Sindrome de reconstituicao imune',
      'Nao usar como monoterapia (falha rapida)',
      'Administrar apenas em ambiente com recursos para reacao anafilatica'
    ],
    efeitosAdversos: {
      comuns: [
        'Diarreia',
        'Tontura',
        'Nausea',
        'Rash',
        'Fadiga'
      ],
      graves: [
        'Reacoes infusionais',
        'Sindrome de reconstituicao imune',
        'Reacoes de hipersensibilidade'
      ]
    },
    interacoes: [
      {
        medicamento: 'Nao ha interacoes significativas conhecidas',
        gravidade: 'leve',
        efeito: 'Anticorpo monoclonal - baixo potencial de interacao',
        conduta: 'Monitorar normalmente'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario (nao eliminado por via renal)' }
    ],
    gestacao: 'N',
    amamentacao: {
      compativel: false,
      observacao: 'HIV: amamentacao contraindicada. IgG pode passar ao leite.'
    },
    monitorizacao: [
      'Sinais vitais durante e 1h apos infusao',
      'Carga viral e CD4',
      'Sinais de reconstituicao imune'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessario',
      hepatopatas: 'Sem ajuste necessario'
    },
    doencasRelacionadas: ['hiv-aids', 'infeccao-hiv'],
    tags: ['hiv', 'aids', 'antirretroviral', 'anticorpo-monoclonal', 'mdr', 'resgate', 'intravenoso'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 5. DORAVIRINA - NNRTI nova geracao
  {
    id: 'doravirina',
    nomeGenerico: 'Doravirina',
    nomesComerciais: ['Pifeltro', 'Delstrigo (DOR/3TC/TDF)'],
    atcCode: 'J05AG06',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '100mg/300mg/300mg (DOR/3TC/TDF)', disponivelSUS: false }
    ],
    indicacoes: [
      'HIV-1 em adultos sem tratamento previo',
      'Substituicao em pacientes virologicamente suprimidos sem mutacoes NNRTI',
      'HIV-1 em combinacao com outros ARV'
    ],
    mecanismoAcao: 'NNRTI de nova geracao com barreira genetica melhorada. Inibe transcriptase reversa nao competitivamente. Mantem atividade contra algumas mutacoes comuns (K103N).',
    posologias: [
      {
        indicacao: 'HIV tratamento',
        adultos: {
          dose: '100mg',
          frequencia: '1x/dia com ou sem alimento'
        }
      },
      {
        indicacao: 'Com rifabutina',
        adultos: {
          dose: '100mg',
          frequencia: '12/12h (dobrar dose)'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a doravirina',
      'Uso concomitante com indutores fortes de CYP3A (rifampicina, fenitoina, carbamazepina)',
      'Uso com mitotano, enzalutamida',
      'Uso com Erva de Sao Joao'
    ],
    precaucoes: [
      'Sindrome de reconstituicao imune',
      'Menos efeitos neuropsiquiatricos que efavirenz',
      'Perfil lipidico favoravel',
      'Ajuste com rifabutina necessario'
    ],
    efeitosAdversos: {
      comuns: [
        'Nausea',
        'Cefaleia',
        'Fadiga',
        'Diarreia',
        'Dor abdominal',
        'Sonhos anormais (menor que EFV)'
      ],
      graves: [
        'Reacoes de hipersensibilidade (raro)',
        'Hepatotoxicidade (raro)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis de doravirina em 88%',
        conduta: 'Contraindicado - usar alternativa'
      },
      {
        medicamento: 'Rifabutina',
        gravidade: 'moderada',
        efeito: 'Reduz niveis de doravirina em 50%',
        conduta: 'Dobrar dose de doravirina para 100mg 12/12h'
      },
      {
        medicamento: 'Carbamazepina/Fenitoina',
        gravidade: 'contraindicada',
        efeito: 'Reducao significativa de doravirina',
        conduta: 'Contraindicado'
      },
      {
        medicamento: 'Metformina',
        gravidade: 'leve',
        efeito: 'Sem interacao clinicamente significativa',
        conduta: 'Pode usar normalmente'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Sem ajuste, mas evitar coformulacao com TDF se ClCr<50' }
    ],
    gestacao: 'N',
    amamentacao: {
      compativel: false,
      observacao: 'HIV: amamentacao contraindicada. Dados insuficientes.'
    },
    monitorizacao: [
      'Carga viral e CD4',
      'Funcao hepatica periodicamente',
      'Perfil lipidico'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessario',
      hepatopatas: 'Sem ajuste em Child-Pugh A/B. Nao recomendado em Child-Pugh C.'
    },
    doencasRelacionadas: ['hiv-aids', 'infeccao-hiv'],
    tags: ['hiv', 'aids', 'antirretroviral', 'nnrti', 'primeira-linha'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // ==================== HEPATITE C - AAD PANGENOTIPICOS ====================

  // 6. GLECAPREVIR/PIBRENTASVIR - ja existe no expansao-antivirais.ts, mas incluindo versao expandida
  {
    id: 'glecaprevir-pibrentasvir-expandido',
    nomeGenerico: 'Glecaprevir + Pibrentasvir',
    nomesComerciais: ['Maviret', 'Mavyret'],
    atcCode: 'J05AP57',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_hepatite',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg/40mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hepatite C cronica (genotipos 1-6) - pangenotipico',
      'HCV sem cirrose (8 semanas)',
      'HCV com cirrose compensada (8-12 semanas)',
      'HCV em pacientes com DRC estagio 4-5',
      'Re-tratamento apos falha a NS5A'
    ],
    mecanismoAcao: 'Glecaprevir: inibidor NS3/4A protease pangenotipico. Pibrentasvir: inibidor NS5A pangenotipico de segunda geracao com alta barreira a resistencia.',
    posologias: [
      {
        indicacao: 'HCV naive sem cirrose (GT 1-6)',
        adultos: {
          dose: '3 comprimidos juntos (300mg GLE/120mg PIB)',
          frequencia: '1x/dia COM alimento por 8 semanas'
        }
      },
      {
        indicacao: 'HCV com cirrose compensada',
        adultos: {
          dose: '3 comprimidos juntos',
          frequencia: '1x/dia por 8 semanas (GT1,2,4,5,6) ou 12 semanas (GT3)'
        }
      },
      {
        indicacao: 'Re-tratamento pos-falha NS5A',
        adultos: {
          dose: '3 comprimidos juntos',
          frequencia: '1x/dia por 16 semanas (com ou sem RBV)'
        }
      },
      {
        indicacao: 'HCV em DRC estagio 4-5 (incluindo dialise)',
        adultos: {
          dose: '3 comprimidos juntos',
          frequencia: '1x/dia - SEM AJUSTE DE DOSE',
          observacoes: 'Pode usar em qualquer grau de insuficiencia renal'
        }
      }
    ],
    contraindicacoes: [
      'Cirrose descompensada (Child-Pugh B ou C)',
      'Insuficiencia hepatica moderada-grave',
      'Uso concomitante de atazanavir',
      'Uso de rifampicina, carbamazepina, fenitoina',
      'Uso de etinilestradiol (usar progestogeno isolado)'
    ],
    precaucoes: [
      'Testar HBsAg antes - risco de reativacao HBV',
      'Monitorar funcao hepatica',
      'Verificar coinfeccao HIV',
      'Interacoes com estatinas',
      'Tomar COM alimento para melhor absorcao'
    ],
    efeitosAdversos: {
      comuns: [
        'Cefaleia',
        'Fadiga',
        'Nausea',
        'Diarreia'
      ],
      graves: [
        'Reativacao hepatite B (se coinfeccao)',
        'Elevacao ALT/AST',
        'Descompensacao hepatica (se cirrose nao detectada)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Atazanavir',
        gravidade: 'contraindicada',
        efeito: 'Aumenta glecaprevir significativamente',
        conduta: 'Contraindicado'
      },
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis dos AAD',
        conduta: 'Contraindicado'
      },
      {
        medicamento: 'Atorvastatina',
        gravidade: 'grave',
        efeito: 'Aumenta atorvastatina em 22x',
        conduta: 'Contraindicado - usar pravastatina se necessario'
      },
      {
        medicamento: 'Rosuvastatina',
        gravidade: 'grave',
        efeito: 'Aumenta rosuvastatina em 5x',
        conduta: 'Limite 10mg/dia'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'grave',
        efeito: 'Aumenta glecaprevir',
        conduta: 'Contraindicado se ciclosporina >100mg/dia'
      },
      {
        medicamento: 'Etinilestradiol',
        gravidade: 'grave',
        efeito: 'Risco de elevacao ALT',
        conduta: 'Contraindicado - usar progestageno isolado'
      },
      {
        medicamento: 'Dabigatrana',
        gravidade: 'moderada',
        efeito: 'Pode aumentar niveis de dabigatrana',
        conduta: 'Usar com cautela'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'SEM AJUSTE - seguro em qualquer grau de DRC incluindo dialise' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes - evitar durante tratamento'
    },
    monitorizacao: [
      'HBsAg e anti-HBc antes de iniciar',
      'RNA HCV na semana 4, fim tratamento e 12 semanas pos (SVR12)',
      'ALT/AST',
      'Funcao hepatica se cirrose',
      'DNA HBV se coinfeccao'
    ],
    orientacoesPaciente: [
      'Tomar COM alimento',
      'Nao pular doses',
      'Completar todo o tratamento mesmo se sentir bem',
      'Evitar alcool durante tratamento',
      'Relatar ictericia ou urina escura'
    ],
    doencasRelacionadas: ['hepatite-c', 'cirrose', 'doenca-renal-cronica'],
    tags: ['hcv', 'hepatite-c', 'aad', 'pangenotipico', 'ns3-4a', 'ns5a', 'drc'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 7. VELPATASVIR/SOFOSBUVIR - expandido com mais detalhes
  {
    id: 'sofosbuvir-velpatasvir-expandido',
    nomeGenerico: 'Sofosbuvir + Velpatasvir',
    nomesComerciais: ['Epclusa'],
    atcCode: 'J05AP55',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_hepatite',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg/100mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Hepatite C cronica (genotipos 1-6) - pangenotipico',
      'HCV sem cirrose',
      'HCV com cirrose compensada',
      'HCV com cirrose descompensada (com ribavirina)',
      'HCV coinfeccao HIV'
    ],
    mecanismoAcao: 'Sofosbuvir: analogo nucleotidico inibidor NS5B polimerase (terminador de cadeia). Velpatasvir: inibidor NS5A pangenotipico. Combinacao sinergica com alta barreira a resistencia.',
    posologias: [
      {
        indicacao: 'HCV GT 1-6 sem cirrose ou cirrose compensada',
        adultos: {
          dose: '1 comprimido (SOF 400mg/VEL 100mg)',
          frequencia: '1x/dia por 12 semanas',
          observacoes: 'Pode tomar com ou sem alimento'
        }
      },
      {
        indicacao: 'HCV com cirrose descompensada',
        adultos: {
          dose: '1 comprimido + Ribavirina (baseada no peso)',
          frequencia: '1x/dia por 12 semanas',
          observacoes: 'RBV: <75kg=1000mg/dia, >=75kg=1200mg/dia dividido 12/12h'
        }
      },
      {
        indicacao: 'Re-tratamento (falha previa)',
        adultos: {
          dose: '1 comprimido +/- Ribavirina',
          frequencia: '1x/dia por 12-24 semanas dependendo da falha previa'
        }
      }
    ],
    contraindicacoes: [
      'Uso concomitante de amiodarona',
      'Uso de indutores potentes P-gp (rifampicina, carbamazepina)',
      'Uso de Erva de Sao Joao'
    ],
    precaucoes: [
      'Testar HBsAg antes - risco reativacao HBV',
      'BRADICARDIA com amiodarona - contraindicado',
      'IBPs reduzem velpatasvir - limite omeprazol 20mg tomado 4h antes',
      'Ajuste em DRC grave (sofosbuvir)',
      'Se usar ribavirina: risco teratogenico, anemia'
    ],
    efeitosAdversos: {
      comuns: [
        'Cefaleia',
        'Fadiga',
        'Nausea',
        'Astenia'
      ],
      graves: [
        'Bradicardia sintomatica (com amiodarona)',
        'Reativacao hepatite B',
        'Anemia (se com ribavirina)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Amiodarona',
        gravidade: 'contraindicada',
        efeito: 'Bradicardia sintomatica grave, potencialmente fatal',
        mecanismo: 'Mecanismo desconhecido - efeito de classe dos AAD com sofosbuvir',
        conduta: 'CONTRAINDICADO - se amiodarona necessaria, considerar outro regime HCV'
      },
      {
        medicamento: 'IBPs (Omeprazol)',
        gravidade: 'moderada',
        efeito: 'Reduz absorcao de velpatasvir em ambiente gastrico alcalino',
        conduta: 'Maximo omeprazol 20mg, tomar 4h ANTES do Epclusa'
      },
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis de sofosbuvir e velpatasvir significativamente',
        conduta: 'Contraindicado'
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Pode aumentar niveis de digoxina',
        conduta: 'Monitorar niveis de digoxina'
      },
      {
        medicamento: 'Tenofovir (TDF)',
        gravidade: 'moderada',
        efeito: 'Sofosbuvir pode aumentar exposicao a tenofovir',
        conduta: 'Monitorar funcao renal se uso conjunto'
      },
      {
        medicamento: 'Modafinila',
        gravidade: 'moderada',
        efeito: 'Indutor moderado P-gp',
        conduta: 'Evitar ou monitorar eficacia'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Sofosbuvir acumula - seguranca nao estabelecida. Preferir G/P se DRC grave.' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Se com ribavirina: contraindicado (X).'
    },
    monitorizacao: [
      'HBsAg e anti-HBc antes de iniciar',
      'RNA HCV basal, semana 4, fim tratamento, SVR12',
      'ECG se uso previo amiodarona (meia-vida longa)',
      'Se com RBV: hemograma a cada 2-4 semanas',
      'Funcao hepatica'
    ],
    orientacoesPaciente: [
      'NAO usar antiacidos 4h antes ou depois',
      'Limitar IBP a 20mg e tomar 4h antes do medicamento',
      'Completar tratamento integral',
      'Se sentir tontura/desmaio: procurar emergencia (bradicardia)',
      'Evitar gravidez se usando ribavirina'
    ],
    doencasRelacionadas: ['hepatite-c', 'cirrose', 'coinfeccao-hiv-hcv'],
    tags: ['hcv', 'hepatite-c', 'aad', 'pangenotipico', 'ns5b', 'ns5a', 'sofosbuvir'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // ==================== COVID-19 ====================

  // 8. NIRMATRELVIR/RITONAVIR - expandido com interacoes detalhadas
  {
    id: 'nirmatrelvir-ritonavir-expandido',
    nomeGenerico: 'Nirmatrelvir + Ritonavir',
    nomesComerciais: ['Paxlovid'],
    atcCode: 'J05AE30',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_covid',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '150mg NMV + 100mg RTV (kit dose diaria)', disponivelSUS: true }
    ],
    indicacoes: [
      'COVID-19 leve a moderado em adultos de alto risco para progressao',
      'COVID-19 em pacientes >=12 anos e >=40kg de alto risco'
    ],
    mecanismoAcao: 'Nirmatrelvir: inibidor da protease 3CL (Mpro) do SARS-CoV-2, essencial para replicacao viral. Ritonavir: booster farmacocinetico - inibe CYP3A aumentando niveis de nirmatrelvir.',
    posologias: [
      {
        indicacao: 'COVID-19 alto risco - funcao renal normal',
        adultos: {
          dose: 'NMV 300mg (2 comp) + RTV 100mg (1 comp)',
          frequencia: '12/12h por 5 dias',
          observacoes: 'Iniciar ate 5 dias do inicio dos sintomas'
        }
      },
      {
        indicacao: 'COVID-19 - DRC moderada (ClCr 30-60)',
        adultos: {
          dose: 'NMV 150mg (1 comp) + RTV 100mg (1 comp)',
          frequencia: '12/12h por 5 dias',
          observacoes: 'Reduzir dose de nirmatrelvir pela metade'
        }
      }
    ],
    contraindicacoes: [
      'ClCr <30 ml/min (insuficiencia renal grave)',
      'Insuficiencia hepatica grave (Child-Pugh C)',
      'Uso de medicamentos com interacoes contraindicadas (ver lista)'
    ],
    precaucoes: [
      'INTERACOES CRITICAS - SEMPRE verificar medicamentos em uso',
      'Ritonavir e potente inibidor CYP3A4',
      'Iniciar ate 5 dias do inicio dos sintomas',
      'Rebound virologico pode ocorrer apos tratamento',
      'Nao e primeira linha para pacientes hospitalizados'
    ],
    efeitosAdversos: {
      comuns: [
        'Disgeusia (alteracao paladar)',
        'Diarreia',
        'Cefaleia',
        'Mialgia'
      ],
      graves: [
        'Interacoes medicamentosas graves',
        'Hepatotoxicidade',
        'Reacoes de hipersensibilidade'
      ]
    },
    interacoes: [
      // CONTRAINDICADAS
      {
        medicamento: 'Sinvastatina/Lovastatina',
        gravidade: 'contraindicada',
        efeito: 'Rabdomiolise',
        mecanismo: 'Inibicao CYP3A4 aumenta estatina >10x',
        conduta: 'CONTRAINDICADO - suspender durante tratamento'
      },
      {
        medicamento: 'Atorvastatina',
        gravidade: 'grave',
        efeito: 'Risco aumentado de miopatia',
        conduta: 'Suspender durante tratamento e por 2-3 dias apos'
      },
      {
        medicamento: 'Colchicina',
        gravidade: 'contraindicada',
        efeito: 'Toxicidade grave da colchicina',
        conduta: 'CONTRAINDICADO em pacientes com IR ou IH. Demais: suspender.'
      },
      {
        medicamento: 'Amiodarona',
        gravidade: 'contraindicada',
        efeito: 'Toxicidade cardiaca, arritmias',
        conduta: 'CONTRAINDICADO - meia-vida muito longa'
      },
      {
        medicamento: 'Dronedarona',
        gravidade: 'contraindicada',
        efeito: 'Arritmias graves',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Ranolazina',
        gravidade: 'contraindicada',
        efeito: 'Arritmias',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Sildenafila (Revatio - HAP)',
        gravidade: 'contraindicada',
        efeito: 'Hipotensao grave',
        conduta: 'CONTRAINDICADO para HAP. Para DE: evitar ou dose minima.'
      },
      {
        medicamento: 'Alfuzosina',
        gravidade: 'contraindicada',
        efeito: 'Hipotensao',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Ergotamina/Diidroergotamina',
        gravidade: 'contraindicada',
        efeito: 'Vasospasmo periferico grave',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Pimozida',
        gravidade: 'contraindicada',
        efeito: 'Arritmias cardiacas',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Midazolam oral/Triazolam',
        gravidade: 'contraindicada',
        efeito: 'Sedacao prolongada/depressao respiratoria',
        conduta: 'CONTRAINDICADO'
      },
      // GRAVES - REQUEREM AJUSTE
      {
        medicamento: 'Rivaroxabana',
        gravidade: 'grave',
        efeito: 'Aumento niveis rivaroxabana - sangramento',
        conduta: 'Evitar. Se necessario: suspender ou reduzir dose.'
      },
      {
        medicamento: 'Apixabana',
        gravidade: 'grave',
        efeito: 'Aumento niveis apixabana',
        conduta: 'Reduzir dose 50% durante tratamento'
      },
      {
        medicamento: 'Warfarina',
        gravidade: 'grave',
        efeito: 'Pode alterar INR',
        conduta: 'Monitorar INR frequentemente'
      },
      {
        medicamento: 'Clopidogrel',
        gravidade: 'grave',
        efeito: 'Reduz ativacao de clopidogrel (pro-droga)',
        conduta: 'Considerar alternativa'
      },
      {
        medicamento: 'Tacrolimus',
        gravidade: 'grave',
        efeito: 'Aumento drastico niveis tacrolimus - nefrotoxicidade',
        conduta: 'Reduzir dose 80-90%, monitorar niveis'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'grave',
        efeito: 'Aumento niveis ciclosporina',
        conduta: 'Reduzir dose 20%, monitorar niveis'
      },
      {
        medicamento: 'Sirolimus/Everolimus',
        gravidade: 'grave',
        efeito: 'Aumento significativo niveis',
        conduta: 'Suspender durante tratamento, monitorar niveis'
      },
      {
        medicamento: 'Amlodipino',
        gravidade: 'moderada',
        efeito: 'Aumento niveis amlodipino',
        conduta: 'Monitorar PA, considerar reducao dose'
      },
      {
        medicamento: 'Diltiazem/Verapamil',
        gravidade: 'grave',
        efeito: 'Aumento niveis BCC',
        conduta: 'Monitorar PA e FC, considerar reducao dose'
      },
      {
        medicamento: 'Carbamazepina/Fenitoina/Fenobarbital',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis de nirmatrelvir significativamente',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis de nirmatrelvir >90%',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Fluticasona inalatoria',
        gravidade: 'moderada',
        efeito: 'Risco de sindrome de Cushing',
        conduta: 'Preferir beclometasona. Se fluticasona: menor dose possivel.'
      },
      {
        medicamento: 'Budesonida oral',
        gravidade: 'grave',
        efeito: 'Aumento niveis corticoide',
        conduta: 'Evitar ou reduzir dose'
      },
      {
        medicamento: 'Metadona',
        gravidade: 'moderada',
        efeito: 'Possivel reducao niveis metadona',
        conduta: 'Monitorar sinais de abstinencia'
      },
      {
        medicamento: 'Fentanil',
        gravidade: 'grave',
        efeito: 'Aumento niveis fentanil',
        conduta: 'Reduzir dose, monitorar depressao respiratoria'
      },
      {
        medicamento: 'Quetiapina',
        gravidade: 'grave',
        efeito: 'Aumento niveis quetiapina - sedacao, arritmias',
        conduta: 'Reduzir dose quetiapina 1/6'
      },
      {
        medicamento: 'Salmeterol',
        gravidade: 'moderada',
        efeito: 'Aumento niveis salmeterol - prolongamento QT',
        conduta: 'Evitar combinacao'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Dose padrao: NMV 300mg + RTV 100mg 12/12h' },
      { tfg: '30-60', ajuste: 'Reduzir NMV para 150mg + RTV 100mg 12/12h' },
      { tfg: '<30', ajuste: 'CONTRAINDICADO' }
    ],
    gestacao: 'N',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Avaliar risco-beneficio.'
    },
    monitorizacao: [
      'Revisar TODAS as medicacoes em uso antes de prescrever',
      'INR se em warfarina',
      'Niveis de imunossupressores se aplicavel',
      'Glicemia se em antidiabeticos',
      'Funcao renal'
    ],
    orientacoesPaciente: [
      'Informar TODOS os medicamentos em uso (incluindo fitoterapicos)',
      'Iniciar assim que possivel apos diagnostico',
      'Completar 5 dias mesmo se melhorar',
      'Relatar alteracao de paladar (comum e temporaria)',
      'Se usar estatina: nao tomar durante tratamento'
    ],
    consideracoesEspeciais: {
      idosos: 'Maior probabilidade de interacoes - revisar medicacoes',
      hepatopatas: 'Child-Pugh A/B: sem ajuste. Child-Pugh C: contraindicado.'
    },
    doencasRelacionadas: ['covid-19', 'infeccao-sars-cov-2'],
    tags: ['covid-19', 'sars-cov-2', 'antiviral', 'protease', 'paxlovid', 'ambulatorial'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 9. MOLNUPIRAVIR - ja existe mas expandindo
  {
    id: 'molnupiravir-expandido',
    nomeGenerico: 'Molnupiravir',
    nomesComerciais: ['Lagevrio'],
    atcCode: 'J05AB',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_covid',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '200mg', disponivelSUS: false }
    ],
    indicacoes: [
      'COVID-19 leve a moderado em adultos de alto risco',
      'Quando nirmatrelvir/ritonavir contraindicado ou indisponivel',
      'Pacientes com interacoes medicamentosas proibindo Paxlovid'
    ],
    mecanismoAcao: 'Pro-droga convertida em N4-hidroxicitidina (NHC). Analogo ribonucleosideo que e incorporado ao RNA viral, causando acumulo de mutacoes (mutagenese letal) que inviabiliza o virus.',
    posologias: [
      {
        indicacao: 'COVID-19 adultos alto risco',
        adultos: {
          dose: '800mg (4 capsulas de 200mg)',
          frequencia: '12/12h por 5 dias',
          observacoes: 'Iniciar ate 5 dias do inicio dos sintomas. Tomar com ou sem alimento.'
        }
      }
    ],
    contraindicacoes: [
      'Gestacao (teratogenico em estudos animais)',
      'Mulheres em idade fertil sem contracepcao eficaz',
      'Idade <18 anos',
      'Amamentacao'
    ],
    precaucoes: [
      'Potencial mutagenico teorico',
      'Contracepcao durante tratamento e 3 meses apos (mulheres)',
      'Contracepcao durante tratamento e 3 meses apos (homens - ejaculacao)',
      'Menor eficacia que nirmatrelvir/ritonavir (~30% vs 89%)',
      'Nao usar em hospitalizados com COVID grave'
    ],
    efeitosAdversos: {
      comuns: [
        'Diarreia',
        'Nausea',
        'Tontura'
      ],
      graves: [
        'Potencial mutagenico teorico (dados limitados)',
        'Rash'
      ]
    },
    interacoes: [
      {
        medicamento: 'Baixo potencial de interacoes',
        gravidade: 'leve',
        efeito: 'Nao e substrato, inibidor ou indutor de CYP450',
        conduta: 'Nao requer ajustes por interacoes'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Sem ajuste, dados limitados' }
    ],
    gestacao: 'X',
    amamentacao: {
      compativel: false,
      observacao: 'CONTRAINDICADO. Suspender amamentacao durante tratamento e 4 dias apos.'
    },
    monitorizacao: [
      'Teste de gravidez antes de iniciar em mulheres ferteis',
      'Orientar contracepcao'
    ],
    orientacoesPaciente: [
      'NAO usar se gravida ou tentando engravidar',
      'Usar contracepcao eficaz durante e 3 meses apos',
      'Homens: usar preservativo durante e 3 meses apos',
      'Completar 5 dias de tratamento'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessario',
      hepatopatas: 'Sem ajuste necessario'
    },
    doencasRelacionadas: ['covid-19', 'infeccao-sars-cov-2'],
    tags: ['covid-19', 'sars-cov-2', 'antiviral', 'mutagenese', 'ambulatorial'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 10. REMDESIVIR - expandido
  {
    id: 'remdesivir-expandido',
    nomeGenerico: 'Remdesivir',
    nomesComerciais: ['Veklury'],
    atcCode: 'J05AB16',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_covid',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '100mg (liofilizado)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '100mg/20ml (solucao)', disponivelSUS: true }
    ],
    indicacoes: [
      'COVID-19 em adultos e pediatricos >=28 dias hospitalizados',
      'COVID-19 ambulatorial de alto risco (ciclo curto de 3 dias)',
      'COVID-19 requerendo oxigenio suplementar'
    ],
    mecanismoAcao: 'Analogo de adenosina. Metabolito ativo (GS-441524 trifosfato) inibe RNA polimerase dependente de RNA (RdRp) do SARS-CoV-2, causando terminacao prematura da cadeia de RNA.',
    posologias: [
      {
        indicacao: 'COVID-19 hospitalizado',
        adultos: {
          dose: '200mg IV D1, depois 100mg IV/dia',
          frequencia: '1x/dia por 5 dias (pode estender para 10 dias se nao houver melhora)',
          observacoes: 'Infusao em 30-120 minutos'
        },
        pediatrico: {
          dose: '>=40kg: dose adulto. <40kg: 5mg/kg D1, depois 2.5mg/kg/dia',
          frequencia: '1x/dia',
          idadeMinima: '28 dias'
        }
      },
      {
        indicacao: 'COVID-19 ambulatorial alto risco',
        adultos: {
          dose: '200mg IV D1, depois 100mg IV D2 e D3',
          frequencia: '1x/dia por 3 dias',
          observacoes: 'Iniciar ate 7 dias do inicio dos sintomas'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao remdesivir ou excipientes',
      'ALT >= 10x LSN',
      'ClCr <30 (formulacao com SBECD - excipiente acumula)'
    ],
    precaucoes: [
      'Monitorar funcao hepatica antes e durante tratamento',
      'Risco de bradicardia sinusal',
      'Reacoes infusionais',
      'Nao usar concomitante com hidroxicloroquina (antagonismo in vitro)',
      'Formulacao com SBECD: cautela em DRC'
    ],
    efeitosAdversos: {
      comuns: [
        'Nausea',
        'Elevacao transaminases',
        'Cefaleia',
        'Rash'
      ],
      graves: [
        'Reacoes infusionais/anafilaxia',
        'Bradicardia sinusal',
        'Hepatotoxicidade',
        'Prolongamento TP sem alteracao INR'
      ]
    },
    interacoes: [
      {
        medicamento: 'Hidroxicloroquina/Cloroquina',
        gravidade: 'moderada',
        efeito: 'Antagonismo in vitro - reduz eficacia',
        conduta: 'Nao associar'
      },
      {
        medicamento: 'Indutores CYP3A4 potentes',
        gravidade: 'moderada',
        efeito: 'Pode reduzir niveis de remdesivir',
        conduta: 'Evitar se possivel'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>=30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Evitar - excipiente SBECD acumula em DRC grave' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Avaliar risco-beneficio.'
    },
    monitorizacao: [
      'ALT/AST antes e durante tratamento',
      'Funcao renal (clearance creatinina)',
      'Tempo de protrombina',
      'Sinais vitais durante infusao',
      'ECG se fatores de risco para bradicardia'
    ],
    orientacoesPaciente: [
      'Administracao apenas por profissional de saude',
      'Relatar sintomas de reacao alergica',
      'Monitoramento de funcao hepatica necessario'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste, mas mais frequente disfuncao renal',
      hepatopatas: 'Nao usar se ALT>=10x LSN. Cautela em hepatopatia.'
    },
    doencasRelacionadas: ['covid-19', 'infeccao-sars-cov-2'],
    tags: ['covid-19', 'sars-cov-2', 'antiviral', 'intravenoso', 'hospitalizado', 'ambulatorial'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // ==================== CMV - NOVAS OPCOES ====================

  // 11. LETERMOVIR - Profilaxia CMV em transplante
  {
    id: 'letermovir',
    nomeGenerico: 'Letermovir',
    nomesComerciais: ['Prevymis'],
    atcCode: 'J05AX18',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_cmv',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '240mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '480mg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '240mg/12ml', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '480mg/24ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Profilaxia de infeccao/doenca por CMV em receptores CMV-soropositivos de transplante alogeneico de celulas-tronco hematopoieticas (TCTH)',
      'Profilaxia CMV em transplante renal de alto risco'
    ],
    mecanismoAcao: 'Inibidor do complexo terminase do CMV (pUL56). Mecanismo de acao diferente de ganciclovir - sem resistencia cruzada. Impede clivagem e empacotamento do DNA viral.',
    posologias: [
      {
        indicacao: 'Profilaxia CMV pos-TCTH',
        adultos: {
          dose: '480mg VO ou IV',
          frequencia: '1x/dia',
          observacoes: 'Iniciar apos transplante e manter ate D100 pos-transplante'
        }
      },
      {
        indicacao: 'Com ciclosporina',
        adultos: {
          dose: '240mg VO ou IV',
          frequencia: '1x/dia',
          observacoes: 'Reduzir dose pela metade quando em uso de ciclosporina'
        }
      },
      {
        indicacao: 'Profilaxia CMV transplante renal',
        adultos: {
          dose: '480mg VO',
          frequencia: '1x/dia por 200 dias pos-transplante'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao letermovir',
      'Uso concomitante de pimozida (prolongamento QT)',
      'Uso com alcaloides do ergot',
      'Uso concomitante de pitavastatina ou sinvastatina quando co-administrado com ciclosporina'
    ],
    precaucoes: [
      'Interacoes com imunossupressores - monitorar niveis',
      'Nao e eficaz para tratamento de doenca CMV estabelecida',
      'CMV pode desenvolver resistencia durante profilaxia',
      'Ajuste com ciclosporina obrigatorio',
      'Nao ha atividade contra outros herpesvirus'
    ],
    efeitosAdversos: {
      comuns: [
        'Nausea',
        'Diarreia',
        'Vomitos',
        'Edema periferico'
      ],
      graves: [
        'Reacoes de hipersensibilidade',
        'Arritmias cardiacas (com medicamentos que prolongam QT)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Ciclosporina',
        gravidade: 'grave',
        efeito: 'Ciclosporina aumenta niveis de letermovir 2x',
        conduta: 'OBRIGATORIO reduzir letermovir para 240mg/dia'
      },
      {
        medicamento: 'Tacrolimus',
        gravidade: 'moderada',
        efeito: 'Letermovir pode reduzir niveis de tacrolimus',
        conduta: 'Monitorar niveis de tacrolimus frequentemente'
      },
      {
        medicamento: 'Sirolimus',
        gravidade: 'moderada',
        efeito: 'Letermovir reduz niveis de sirolimus',
        conduta: 'Monitorar niveis de sirolimus'
      },
      {
        medicamento: 'Voriconazol',
        gravidade: 'moderada',
        efeito: 'Voriconazol reduz niveis de letermovir',
        conduta: 'Monitorar eficacia antivirica'
      },
      {
        medicamento: 'Pimozida',
        gravidade: 'contraindicada',
        efeito: 'Prolongamento QT',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Sinvastatina (com ciclosporina)',
        gravidade: 'contraindicada',
        efeito: 'Aumento drastico estatina',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Atorvastatina',
        gravidade: 'moderada',
        efeito: 'Aumenta niveis de atorvastatina',
        conduta: 'Nao exceder 20mg/dia'
      },
      {
        medicamento: 'Midazolam',
        gravidade: 'moderada',
        efeito: 'Pode aumentar niveis midazolam',
        conduta: 'Monitorar sedacao'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>10', ajuste: 'Sem ajuste necessario (nao excretado por via renal)' },
      { tfg: '<10', ajuste: 'Dados limitados' }
    ],
    gestacao: 'N',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar.'
    },
    monitorizacao: [
      'PCR CMV semanal durante profilaxia',
      'Niveis de imunossupressores (tacrolimus, ciclosporina, sirolimus)',
      'Funcao hepatica',
      'Sinais de doenca CMV breakthrough'
    ],
    orientacoesPaciente: [
      'Tomar no mesmo horario todos os dias',
      'Nao e tratamento para CMV - apenas prevencao',
      'Completar o curso prescrito',
      'Relatar sintomas de infeccao'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessario',
      hepatopatas: 'Child-Pugh A/B: sem ajuste. Child-Pugh C: nao recomendado.'
    },
    doencasRelacionadas: ['cmv', 'citomegalovirus', 'transplante'],
    tags: ['cmv', 'citomegalovirus', 'profilaxia', 'transplante', 'tcth', 'terminase'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 12. MARIBAVIR - Tratamento CMV resistente
  {
    id: 'maribavir',
    nomeGenerico: 'Maribavir',
    nomesComerciais: ['Livtencity'],
    atcCode: 'J05AX10',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_cmv',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Infeccao/doenca por CMV refrataria a tratamento previo (ganciclovir, valganciclovir, foscarnet ou cidofovir)',
      'CMV resistente aos antivirais convencionais',
      'Pacientes adultos e pediatricos >=12 anos e >=35kg pos-transplante'
    ],
    mecanismoAcao: 'Inibidor da proteinoquinase UL97 do CMV. Mecanismo diferente de ganciclovir/foscarnet/cidofovir - pode funcionar em virus resistentes. Bloqueia maturacao do capsideo viral e egresso nuclear.',
    posologias: [
      {
        indicacao: 'CMV refratario/resistente',
        adultos: {
          dose: '400mg (2 comprimidos de 200mg)',
          frequencia: '12/12h com ou sem alimento',
          observacoes: 'Durar ate clearance virologico (CMV DNA indetectavel). Duracao tipica 8-12 semanas.'
        },
        pediatrico: {
          dose: '400mg',
          frequencia: '12/12h',
          idadeMinima: '>=12 anos e >=35kg'
        }
      }
    ],
    contraindicacoes: [
      'Uso concomitante de ganciclovir ou valganciclovir (antagonismo)',
      'Hipersensibilidade ao maribavir'
    ],
    precaucoes: [
      'NAO usar com ganciclovir/valganciclovir - antagonismo farmacologico',
      'Disgeusia muito comum (alteracao paladar)',
      'Interacoes com imunossupressores',
      'Monitorar niveis de tacrolimus/ciclosporina',
      'Resistencia pode surgir durante tratamento'
    ],
    efeitosAdversos: {
      comuns: [
        'Disgeusia (37%)',
        'Nausea',
        'Diarreia',
        'Vomitos',
        'Fadiga'
      ],
      graves: [
        'Falha virologica/resistencia',
        'Interacoes com imunossupressores'
      ]
    },
    interacoes: [
      {
        medicamento: 'Ganciclovir/Valganciclovir',
        gravidade: 'contraindicada',
        efeito: 'Antagonismo - ganciclovir requer fosforilacao por UL97 que maribavir inibe',
        conduta: 'CONTRAINDICADO - nao co-administrar'
      },
      {
        medicamento: 'Tacrolimus',
        gravidade: 'grave',
        efeito: 'Maribavir aumenta niveis de tacrolimus 50%',
        conduta: 'Reduzir dose tacrolimus, monitorar niveis frequentemente'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'grave',
        efeito: 'Maribavir aumenta niveis de ciclosporina',
        conduta: 'Monitorar niveis, ajustar dose'
      },
      {
        medicamento: 'Sirolimus/Everolimus',
        gravidade: 'grave',
        efeito: 'Aumento niveis de inibidores mTOR',
        conduta: 'Monitorar niveis, ajustar dose'
      },
      {
        medicamento: 'Rifampicina',
        gravidade: 'grave',
        efeito: 'Reduz niveis de maribavir significativamente',
        conduta: 'Evitar. Se necessario: considerar alternativa antimicrobiana.'
      },
      {
        medicamento: 'Carbamazepina/Fenitoina',
        gravidade: 'grave',
        efeito: 'Reduz niveis de maribavir',
        conduta: 'Evitar combinacao'
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Maribavir inibe P-gp, aumenta digoxina',
        conduta: 'Monitorar niveis de digoxina'
      },
      {
        medicamento: 'Estatinas (atorvastatina, sinvastatina)',
        gravidade: 'moderada',
        efeito: 'Pode aumentar niveis de estatinas',
        conduta: 'Monitorar toxicidade muscular'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Dados limitados - usar com cautela' }
    ],
    gestacao: 'N',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar.'
    },
    monitorizacao: [
      'PCR CMV DNA semanal ate indetectavel',
      'Niveis de imunossupressores (tacrolimus, ciclosporina, sirolimus)',
      'Teste de resistencia se falha virologica',
      'Funcao hepatica e renal'
    ],
    orientacoesPaciente: [
      'Alteracao de paladar e comum - tende a melhorar',
      'Tomar com ou sem alimento',
      'Completar tratamento ate medico orientar parar',
      'Informar todos medicamentos em uso'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste, monitorar funcao renal',
      hepatopatas: 'Child-Pugh A/B: sem ajuste. Child-Pugh C: dados limitados.'
    },
    doencasRelacionadas: ['cmv', 'citomegalovirus', 'transplante', 'resistencia-antiviral'],
    tags: ['cmv', 'citomegalovirus', 'tratamento', 'resistente', 'refratario', 'ul97', 'transplante'],
    citations: [],
    lastUpdate: '2024-12-01'
  }
];

// Export para uso no index consolidado
export default antiviraisNovos;
