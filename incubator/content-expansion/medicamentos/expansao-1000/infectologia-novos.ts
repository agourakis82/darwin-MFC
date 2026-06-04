/**
 * INFECTOLOGIA NOVOS - DARWIN-MFC EXPANSAO 1000
 * ==============================================
 * Medicamentos avancados para doencas infecciosas:
 * - TB-MDR/XDR (Bedaquilina, Delamanid, Pretomanid)
 * - HIV (Integrases, NNRTI, Attachment Inhibitor, CD4 Antibody)
 * - Antifungicos sistemicos (Equinocandinas, Triazois, Anfotericina Lipossomal)
 * - Leishmaniose (Miltefosina)
 *
 * ONTOLOGY-FIRST APPROACH:
 * - ATC: J02 (Antifungicos), J04 (Antimicobacterianos), J05 (Antivirais)
 * - RxNorm, DrugBank, SNOMED-CT para interoperabilidade
 *
 * Referencias:
 * - WHO Consolidated Guidelines on TB Treatment (2024)
 * - DHHS Guidelines for HIV/AIDS Treatment (2024)
 * - IDSA Guidelines for Aspergillosis/Candidiasis (2024)
 * - WHO Guidelines for Visceral Leishmaniasis (2024)
 */

import { Medicamento } from '@/lib/types/medicamento';

export const infectologiaNovos: Partial<Medicamento>[] = [
  // ============================================================================
  // TUBERCULOSE MDR/XDR - NOVOS AGENTES
  // ============================================================================

  // 1. BEDAQUILINA - TB-MDR
  {
    id: 'bedaquiline',
    nomeGenerico: 'Bedaquilina',
    nomesComerciais: ['Sirturo'],
    atcCode: 'J04AK05',
    rxNormCui: '1547219',
    drugBankId: 'DB08903',
    snomedCT: '708822004',
    classeTerapeutica: 'antibiotico',
    subclasse: 'antituberculoso',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Tuberculose pulmonar multidroga resistente (TB-MDR)',
      'Tuberculose extensivamente droga resistente (TB-XDR)',
      'TB em combinacao com outros agentes quando regime padrao nao pode ser composto'
    ],
    mecanismoAcao: 'Diarilquinolina que inibe especificamente a ATP sintase micobacteriana (subunidade c do complexo F0F1-ATP sintase). Mecanismo de acao unico - sem resistencia cruzada com outros anti-TB. Atividade bactericida contra M. tuberculosis incluindo cepas MDR/XDR e bacilo dormente.',
    posologias: [
      {
        indicacao: 'TB-MDR/XDR - Adultos',
        adultos: {
          dose: '400mg 1x/dia por 2 semanas, depois 200mg 3x/semana',
          frequencia: '1x/dia (semanas 1-2), depois 3x/semana (semanas 3-24)',
          doseMaxima: '400mg/dia',
          observacoes: 'Dose total: 600mg/semana apos periodo de ataque. Tomar COM alimento (aumenta absorvao 2x). Duracao total: 24 semanas.'
        }
      },
      {
        indicacao: 'TB-MDR/XDR - Pediatrico',
        pediatrico: {
          dose: '16-30kg: 200mg 1x/dia x2 sem, depois 100mg 3x/sem. >30kg: dose adulto',
          frequencia: 'Conforme peso',
          idadeMinima: '5 anos',
          doseMaxima: '400mg/dia',
          observacoes: 'Aprovado para >=5 anos. Formulacao dispersivel disponivel.'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a bedaquilina',
      'QTc basal >500ms',
      'Arritmias ventriculares clinicamente significativas',
      'Historia de Torsades de Pointes'
    ],
    precaucoes: [
      'PROLONGA QTc - ECG basal e monitorar mensalmente',
      'Evitar associacao com outros farmacos que prolongam QT (fluoroquinolonas, clofazimina, moxifloxacino)',
      'Hepatotoxicidade - monitorar funcao hepatica',
      'Aumenta mortalidade em estudos (mecanismo incerto)',
      'Interacoes com indutores/inibidores CYP3A4',
      'Nunca usar em monoterapia'
    ],
    efeitosAdversos: {
      comuns: [
        'Nausea',
        'Artralgia',
        'Cefaleia',
        'Elevacao de transaminases',
        'Prolongamento QTc'
      ],
      graves: [
        'Prolongamento QTc significativo',
        'Arritmias ventriculares/Torsades de Pointes',
        'Hepatotoxicidade',
        'Morte (aumento observado em estudos)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz AUC de bedaquilina em 52%',
        mecanismo: 'Inducao CYP3A4',
        conduta: 'CONTRAINDICADO - usar rifabutina se necessario (reducao menor)'
      },
      {
        medicamento: 'Rifabutina',
        gravidade: 'grave',
        efeito: 'Reduz niveis de bedaquilina',
        conduta: 'Evitar se possivel; se necessario, monitorar eficacia'
      },
      {
        medicamento: 'Moxifloxacino/Levofloxacino',
        gravidade: 'grave',
        efeito: 'Prolongamento QT aditivo',
        conduta: 'Monitorar QTc frequentemente; preferir levofloxacino'
      },
      {
        medicamento: 'Clofazimina',
        gravidade: 'grave',
        efeito: 'Prolongamento QT aditivo',
        conduta: 'Monitorar QTc; combinacao frequente em TB-MDR'
      },
      {
        medicamento: 'Cetoconazol',
        gravidade: 'moderada',
        efeito: 'Aumenta AUC de bedaquilina em 22%',
        mecanismo: 'Inibicao CYP3A4',
        conduta: 'Monitorar toxicidade'
      },
      {
        medicamento: 'Lopinavir/ritonavir',
        gravidade: 'moderada',
        efeito: 'Aumenta exposicao a bedaquilina',
        conduta: 'Monitorar QTc e toxicidade'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Dados limitados - usar com cautela' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar amamentacao durante tratamento.'
    },
    monitorizacao: [
      'ECG basal e mensal (QTc)',
      'Eletrólitos (K, Mg, Ca) - manter normais',
      'ALT/AST mensal',
      'Escarro para cultura/sensibilidade',
      'Monitorar aderencia (diretamente observado)'
    ],
    orientacoesPaciente: [
      'Tomar COM alimento (refeicao)',
      'Nunca pular doses - resistencia',
      'Relatar palpitacoes, tontura ou desmaio (QT)',
      'Nao usar alcool (hepatotoxicidade)',
      'Completar 24 semanas mesmo se sentir melhor'
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de prolongamento QT - monitorar',
      hepatopatas: 'Child-Pugh A/B: cautela. Child-Pugh C: nao recomendado.',
      pediatrico: 'Aprovado >=5 anos. Formulacao dispersivel disponivel.'
    },
    doencasRelacionadas: ['tuberculose', 'tuberculose-mdr', 'tuberculose-xdr'],
    tags: ['tuberculose', 'tb-mdr', 'tb-xdr', 'bedaquilina', 'diarilquinolina', 'atp-sintase', 'who-essential'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 2. DELAMANID - TB-MDR
  {
    id: 'delamanid',
    nomeGenerico: 'Delamanid',
    nomesComerciais: ['Deltyba'],
    atcCode: 'J04AK06',
    rxNormCui: '1602635',
    drugBankId: 'DB09048',
    snomedCT: '712787000',
    classeTerapeutica: 'antibiotico',
    subclasse: 'antituberculoso',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Tuberculose pulmonar multidroga resistente (TB-MDR)',
      'TB-XDR em combinacao com outros agentes',
      'Parte de regimes encurtados para TB-MDR (BPaL, BPaLM)'
    ],
    mecanismoAcao: 'Nitroimidazo-oxazol que inibe a sintese de acidos micolicos da parede celular micobacteriana (componentes metoximilato e cetomicolato). Requer ativacao por nitrorreductase DnD dependente de F420. Atividade bactericida contra M. tuberculosis incluindo cepas MDR e bacilos dormentes intracelulares.',
    posologias: [
      {
        indicacao: 'TB-MDR/XDR - Adultos',
        adultos: {
          dose: '100mg',
          frequencia: '12/12h COM alimento por 24 semanas',
          doseMaxima: '200mg/dia',
          observacoes: 'Duracao total: 24 semanas. Sempre em combinacao com outros anti-TB.'
        }
      },
      {
        indicacao: 'TB-MDR/XDR - Pediatrico',
        pediatrico: {
          dose: '20-34kg: 50mg 12/12h. >=35kg: 100mg 12/12h',
          frequencia: '12/12h',
          idadeMinima: '3 anos e >=10kg',
          observacoes: 'Aprovado >=3 anos. Formulacao dispersivel para criancas.'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao delamanid',
      'QTc >500ms',
      'Hipoalbuminemia grave (<2.8 g/dL)',
      'Uso concomitante com indutores fortes de CYP3A4'
    ],
    precaucoes: [
      'Prolonga QTc - monitorar ECG',
      'Hipoalbuminemia aumenta risco de prolongamento QT',
      'Nao usar com rifampicina/rifabutina',
      'Hepatotoxicidade possivel',
      'Nunca usar em monoterapia'
    ],
    efeitosAdversos: {
      comuns: [
        'Nausea',
        'Vomitos',
        'Tontura',
        'Parestesias',
        'Ansiedade',
        'Tremor'
      ],
      graves: [
        'Prolongamento QTc',
        'Arritmias ventriculares',
        'Hepatotoxicidade',
        'Psicose'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis de delamanid drasticamente',
        mecanismo: 'Inducao CYP3A4',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Rifabutina',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis de delamanid',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Farmacos que prolongam QT',
        gravidade: 'grave',
        efeito: 'Prolongamento QT aditivo',
        conduta: 'Monitorar QTc frequentemente'
      },
      {
        medicamento: 'Lopinavir/ritonavir',
        gravidade: 'moderada',
        efeito: 'Aumenta exposicao ao delamanid',
        conduta: 'Monitorar QTc'
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
      'ECG basal e mensal (QTc)',
      'Albumina serica (hipoalbuminemia aumenta risco)',
      'Eletrólitos (K, Mg, Ca)',
      'ALT/AST',
      'Escarro para cultura'
    ],
    orientacoesPaciente: [
      'Tomar COM alimento',
      'Relatar palpitacoes ou desmaio',
      'Completar todo o tratamento',
      'Nao usar alcool'
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de prolongamento QT',
      hepatopatas: 'Child-Pugh A/B: sem ajuste. Child-Pugh C: nao recomendado.',
      pediatrico: 'Aprovado >=3 anos e >=10kg'
    },
    doencasRelacionadas: ['tuberculose', 'tuberculose-mdr', 'tuberculose-xdr'],
    tags: ['tuberculose', 'tb-mdr', 'tb-xdr', 'delamanid', 'nitroimidazol', 'acido-micolico'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 3. PRETOMANID - TB-XDR (BPaL regimen)
  {
    id: 'pretomanid',
    nomeGenerico: 'Pretomanid',
    nomesComerciais: ['Dovprela'],
    atcCode: 'J04AK08',
    rxNormCui: '2281254',
    drugBankId: 'DB12618',
    snomedCT: '775890000',
    classeTerapeutica: 'antibiotico',
    subclasse: 'antituberculoso',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Tuberculose extensivamente droga resistente (TB-XDR)',
      'TB-MDR intolerant ou nao responsiva',
      'Regime BPaL (Bedaquilina + Pretomanid + Linezolida)',
      'Regime BPaLM (BPaL + Moxifloxacino) para TB-MDR'
    ],
    mecanismoAcao: 'Nitroimidazo-oxazina bicíclica. Duplo mecanismo: (1) Inibe sintese de acidos micolicos da parede celular em condicoes aeróbicas, (2) Liberacao de oxido nitrico reativo em condicoes anaerobicas/hipoxicas, matando bacilos dormentes. Ativo contra M. tuberculosis MDR/XDR.',
    posologias: [
      {
        indicacao: 'TB-XDR - Regime BPaL',
        adultos: {
          dose: '200mg',
          frequencia: '1x/dia COM alimento',
          observacoes: 'Parte do regime BPaL: Bedaquilina + Pretomanid 200mg/dia + Linezolida 1200mg/dia. Duracao: 26 semanas (6 meses).'
        }
      },
      {
        indicacao: 'TB-MDR - Regime BPaLM',
        adultos: {
          dose: '200mg',
          frequencia: '1x/dia COM alimento',
          observacoes: 'BPaLM: + Moxifloxacino 400mg/dia. Duracao: 26 semanas.'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao pretomanid',
      'Uso em monoterapia',
      'TB sensivel a medicamentos de primeira linha'
    ],
    precaucoes: [
      'SOMENTE usar no regime BPaL ou BPaLM aprovado',
      'Hepatotoxicidade - monitorar funcao hepatica',
      'Mielossupressao (em combinacao com linezolida)',
      'Neuropatia periferica (linezolida)',
      'Acidose lactica (raro)',
      'Prolongamento QT (componente bedaquilina)'
    ],
    efeitosAdversos: {
      comuns: [
        'Nausea',
        'Vomitos',
        'Acne',
        'Cefaleia',
        'Elevacao de transaminases'
      ],
      graves: [
        'Hepatotoxicidade',
        'Mielossupressao (trombocitopenia, anemia)',
        'Neuropatia periferica',
        'Acidose lactica',
        'Neurite optica'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis de pretomanid',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Rifabutina',
        gravidade: 'grave',
        efeito: 'Reducao de niveis',
        conduta: 'Evitar'
      },
      {
        medicamento: 'Carbamazepina/Fenitoina',
        gravidade: 'grave',
        efeito: 'Indutores CYP3A4 reduzem pretomanid',
        conduta: 'Evitar'
      },
      {
        medicamento: 'Efavirenz',
        gravidade: 'grave',
        efeito: 'Reducao de niveis de pretomanid',
        conduta: 'Usar dolutegravir se possivel'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Dados limitados - cautela' }
    ],
    gestacao: 'N',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar.'
    },
    monitorizacao: [
      'ALT/AST mensal (hepatotoxicidade)',
      'Hemograma semanal nas primeiras 4 semanas, depois mensal (linezolida)',
      'Avaliacao de neuropatia periferica mensal',
      'Acuidade visual e cores (neurite optica)',
      'Escarro para cultura'
    ],
    orientacoesPaciente: [
      'Tomar COM alimento',
      'Relatar dor ou formigamento nos pes/maos',
      'Relatar alteracao visual',
      'Completar todo o tratamento de 26 semanas',
      'Evitar alcool'
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de neuropatia - monitorar',
      hepatopatas: 'Child-Pugh A: sem ajuste. Child-Pugh B/C: nao recomendado.',
      pediatrico: 'Nao aprovado para <18 anos'
    },
    doencasRelacionadas: ['tuberculose', 'tuberculose-xdr', 'tuberculose-mdr'],
    tags: ['tuberculose', 'tb-xdr', 'tb-mdr', 'pretomanid', 'bpal', 'bpalm', 'nitroimidazol'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // ============================================================================
  // HIV - INIBIDORES DE INTEGRASE
  // ============================================================================

  // 4. DOLUTEGRAVIR - HIV Integrase Inhibitor
  {
    id: 'dolutegravir',
    nomeGenerico: 'Dolutegravir',
    nomesComerciais: ['Tivicay', 'Triumeq (DTG/ABC/3TC)', 'Dovato (DTG/3TC)'],
    atcCode: 'J05AJ03',
    rxNormCui: '1433868',
    drugBankId: 'DB09101',
    snomedCT: '713464000',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg (pediatrico)', disponivelSUS: true },
      { forma: 'comprimido_dispersivel', concentracao: '5mg', disponivelSUS: true }
    ],
    indicacoes: [
      'HIV-1 em adultos e pediatricos >=4 semanas',
      'Primeira linha preferencial pela OMS e MS Brasil',
      'HIV-1 naive ou experimentado',
      'Regime de 2 drogas com 3TC em pacientes suprimidos'
    ],
    mecanismoAcao: 'Inibidor de integrase (INSTI) de segunda geracao. Bloqueia a integrase do HIV-1, impedindo integracao do DNA viral ao genoma do hospedeiro. Alta barreira genetica a resistencia. Potente e bem tolerado.',
    posologias: [
      {
        indicacao: 'HIV - Naive ou experimentado sem resistencia INI',
        adultos: {
          dose: '50mg',
          frequencia: '1x/dia com ou sem alimento',
          observacoes: 'Em combinacao com outros ARV. Pode ser parte de STR (single tablet regimen).'
        }
      },
      {
        indicacao: 'HIV - Resistencia a INI ou com indutores enzimaticos',
        adultos: {
          dose: '50mg',
          frequencia: '12/12h',
          observacoes: 'Dobrar frequencia se: resistencia INI, uso de rifampicina, ou efavirenz/etravirina/carbamazepina.'
        }
      },
      {
        indicacao: 'HIV Pediatrico',
        pediatrico: {
          dose: '>=20kg: 50mg 1x/dia. 14-20kg: 40mg. 10-14kg: 25mg',
          frequencia: '1x/dia',
          idadeMinima: '4 semanas e >=3kg',
          observacoes: 'Formulacao dispersivel para <20kg'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao dolutegravir',
      'Uso concomitante com dofetilida (interacao)',
      'Uso com pilsicainida (arritmias)'
    ],
    precaucoes: [
      'Sindrome de reconstituicao imune',
      'Insuficiencia hepatica - cautela em hepatopatia grave',
      'Defeito de tubo neural: dados tranquilizadores em estudos maiores, mas informar paciente',
      'Interacoes com cations polivalentes (Ca, Mg, Fe, Al)',
      'Ajuste de dose com rifampicina'
    ],
    efeitosAdversos: {
      comuns: [
        'Insonia',
        'Cefaleia',
        'Nausea',
        'Fadiga',
        'Aumento de creatinina (inibe secrecao tubular, sem alteracao TFG)'
      ],
      graves: [
        'Reacoes de hipersensibilidade',
        'Hepatotoxicidade',
        'Sindrome de reconstituicao imune',
        'Disturbios neuropsiquiatricos (raro)',
        'Ganho de peso'
      ]
    },
    interacoes: [
      {
        medicamento: 'Dofetilida',
        gravidade: 'contraindicada',
        efeito: 'DTG inibe OCT2 aumentando dofetilida - arritmias',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Rifampicina',
        gravidade: 'grave',
        efeito: 'Reduz niveis de DTG em 54%',
        conduta: 'Dobrar dose de DTG para 50mg 12/12h'
      },
      {
        medicamento: 'Antiácidos/Suplementos (Ca, Mg, Fe, Al)',
        gravidade: 'moderada',
        efeito: 'Cations polivalentes reduzem absorcao',
        conduta: 'Tomar DTG 2h antes ou 6h depois'
      },
      {
        medicamento: 'Metformina',
        gravidade: 'moderada',
        efeito: 'DTG inibe transportadores aumentando metformina',
        conduta: 'Dose maxima metformina 1000mg/dia; monitorar'
      },
      {
        medicamento: 'Carbamazepina/Fenitoina',
        gravidade: 'grave',
        efeito: 'Indutores reduzem DTG',
        conduta: 'Dobrar dose de DTG para 50mg 12/12h'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Sem ajuste - monitorar (aumento creatinina esperado)' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'HIV: amamentacao geralmente contraindicada. DTG excretado no leite.'
    },
    monitorizacao: [
      'Carga viral HIV e CD4 a cada 3-6 meses',
      'Creatinina basal e periodica (elevacao esperada)',
      'Funcao hepatica',
      'Glicemia se em uso de metformina',
      'Peso corporal'
    ],
    orientacoesPaciente: [
      'Pode tomar com ou sem alimento',
      'Separar de antiacidos por 2h antes ou 6h depois',
      'Nao pular doses - aderencia essencial',
      'Relatar alteracoes de humor ou sono'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessario',
      hepatopatas: 'Child-Pugh A/B: sem ajuste. Child-Pugh C: nao recomendado.',
      pediatrico: 'Aprovado >=4 semanas e >=3kg. Formulacao dispersivel disponivel.'
    },
    doencasRelacionadas: ['hiv-aids', 'infeccao-hiv'],
    tags: ['hiv', 'aids', 'antirretroviral', 'inibidor-integrase', 'insti', 'dolutegravir', 'primeira-linha', 'who-preferencial'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 5. BICTEGRAVIR - HIV Integrase Inhibitor
  {
    id: 'bictegravir',
    nomeGenerico: 'Bictegravir',
    nomesComerciais: ['Biktarvy (BIC/TAF/FTC)'],
    atcCode: 'J05AJ04',
    rxNormCui: '2049649',
    drugBankId: 'DB11799',
    snomedCT: '772197004',
    classeTerapeutica: 'antiviral',
    subclasse: 'antirretroviral',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg/25mg/200mg (BIC/TAF/FTC)', disponivelSUS: false }
    ],
    indicacoes: [
      'HIV-1 em adultos sem resistencia conhecida a INI, tenofovir ou emtricitabina',
      'HIV-1 em adultos virologicamente suprimidos',
      'HIV-1 em pediatricos >=25kg',
      'Regime completo de comprimido unico (STR)'
    ],
    mecanismoAcao: 'Inibidor de integrase (INSTI) de segunda geracao com alta barreira genetica a resistencia. Disponivel apenas na combinacao fixa com TAF (tenofovir alafenamida) e FTC (emtricitabina). Nao requer booster farmacocinetico.',
    posologias: [
      {
        indicacao: 'HIV - Adultos',
        adultos: {
          dose: '1 comprimido (BIC 50mg/TAF 25mg/FTC 200mg)',
          frequencia: '1x/dia com ou sem alimento',
          observacoes: 'Regime completo - nao requer outros ARV'
        }
      },
      {
        indicacao: 'HIV - Pediatrico',
        pediatrico: {
          dose: '1 comprimido',
          frequencia: '1x/dia',
          idadeMinima: '>=25kg',
          observacoes: 'Aprovado para >=25kg'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a bictegravir, TAF ou FTC',
      'Uso concomitante com dofetilida',
      'Uso concomitante com rifampicina',
      'ClCr <15 ml/min sem dialise'
    ],
    precaucoes: [
      'Testar HBV antes (risco de reativacao ao parar TAF/FTC)',
      'Acidose lactica e esteatose hepatica (raro, classe NRTI)',
      'Sindrome de reconstituicao imune',
      'Interacoes com cations polivalentes',
      'Nao usar com rifampicina'
    ],
    efeitosAdversos: {
      comuns: [
        'Diarreia',
        'Nausea',
        'Cefaleia',
        'Fadiga'
      ],
      graves: [
        'Exacerbacao aguda HBV ao descontinuar',
        'Acidose lactica',
        'Sindrome de reconstituicao imune',
        'Novo inicio/piora de disfuncao renal'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis de BIC drasticamente',
        conduta: 'CONTRAINDICADO - usar DTG 50mg 12/12h + alternativa'
      },
      {
        medicamento: 'Dofetilida',
        gravidade: 'contraindicada',
        efeito: 'Risco de arritmias',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Antiácidos (Al, Mg, Ca)',
        gravidade: 'moderada',
        efeito: 'Reducao de absorcao de BIC',
        conduta: 'Tomar 2h antes (com alimento) ou 2h depois (sem alimento)'
      },
      {
        medicamento: 'Metformina',
        gravidade: 'moderada',
        efeito: 'BIC pode aumentar niveis de metformina',
        conduta: 'Dose maxima metformina 1000mg/dia'
      },
      {
        medicamento: 'Carbamazepina/Oxcarbazepina/Fenitoina',
        gravidade: 'contraindicada',
        efeito: 'Reducao significativa de BIC',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Rifabutina',
        gravidade: 'grave',
        efeito: 'Reduz BIC, mas pode ser usado',
        conduta: 'Pode usar com monitoramento'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>=30', ajuste: 'Sem ajuste necessario' },
      { tfg: '15-30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<15 em dialise', ajuste: 'Pode usar' },
      { tfg: '<15 sem dialise', ajuste: 'Nao recomendado' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'HIV: amamentacao geralmente contraindicada.'
    },
    monitorizacao: [
      'HBsAg antes de iniciar',
      'Carga viral HIV e CD4 a cada 3-6 meses',
      'Funcao renal periodica',
      'Funcao hepatica se coinfeccao HBV',
      'Glicemia se uso de metformina'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; monitorar funcao renal',
      hepatopatas: 'Child-Pugh A/B: sem ajuste. Child-Pugh C: dados limitados.',
      pediatrico: 'Aprovado >=25kg'
    },
    doencasRelacionadas: ['hiv-aids', 'infeccao-hiv'],
    tags: ['hiv', 'aids', 'antirretroviral', 'inibidor-integrase', 'insti', 'bictegravir', 'biktarvy', 'str'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 6. DORAVIRINA - HIV NNRTI
  {
    id: 'doravirina',
    nomeGenerico: 'Doravirina',
    nomesComerciais: ['Pifeltro', 'Delstrigo (DOR/3TC/TDF)'],
    atcCode: 'J05AG06',
    rxNormCui: '2056861',
    drugBankId: 'DB12301',
    snomedCT: '772193004',
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
    mecanismoAcao: 'NNRTI de nova geracao com barreira genetica melhorada. Inibe transcriptase reversa nao competitivamente. Mantem atividade contra algumas mutacoes comuns (K103N). Melhor perfil neuropsiquiatrico que efavirenz.',
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
    tags: ['hiv', 'aids', 'antirretroviral', 'nnrti', 'doravirina', 'primeira-linha'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 7. FOSTEMSAVIR - HIV Attachment Inhibitor
  {
    id: 'fostemsavir',
    nomeGenerico: 'Fostemsavir',
    nomesComerciais: ['Rukobia'],
    atcCode: 'J05AX29',
    rxNormCui: '2379553',
    drugBankId: 'DB12263',
    snomedCT: '783067006',
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
    mecanismoAcao: 'Pro-droga do temsavir. Inibidor de attachment - liga-se a gp120 do HIV impedindo a ligacao ao receptor CD4, bloqueando entrada viral na celula. Mecanismo de acao unico - sem resistencia cruzada.',
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
    tags: ['hiv', 'aids', 'antirretroviral', 'inibidor-attachment', 'fostemsavir', 'mdr', 'resgate'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 8. IBALIZUMAB - HIV CD4 Antibody
  {
    id: 'ibalizumab',
    nomeGenerico: 'Ibalizumab-uiyk',
    nomesComerciais: ['Trogarzo'],
    atcCode: 'J05AX21',
    rxNormCui: '2001632',
    drugBankId: 'DB13996',
    snomedCT: '766892003',
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
    mecanismoAcao: 'Anticorpo monoclonal humanizado que se liga ao dominio 2 do receptor CD4, bloqueando passos pos-attachment necessarios para entrada do HIV-1 na celula. Nao depleta celulas CD4. Mecanismo unico - sem resistencia cruzada.',
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
        medicamento: 'Baixo potencial de interacoes',
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
    tags: ['hiv', 'aids', 'antirretroviral', 'anticorpo-monoclonal', 'ibalizumab', 'mdr', 'resgate', 'intravenoso'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // ============================================================================
  // ANTIFUNGICOS SISTEMICOS - EQUINOCANDINAS
  // ============================================================================

  // 9. ANIDULAFUNGINA - Echinocandin
  {
    id: 'anidulafungin',
    nomeGenerico: 'Anidulafungina',
    nomesComerciais: ['Ecalta', 'Eraxis'],
    atcCode: 'J02AX06',
    rxNormCui: '352113',
    drugBankId: 'DB00362',
    snomedCT: '421747003',
    classeTerapeutica: 'antifungico',
    subclasse: 'equinocandina',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Candidemia e candidiase invasiva em adultos',
      'Candidiase esofagica',
      'Candidíase peritoneal e intra-abdominal',
      'Primeira linha empirica para candidemia em pacientes graves'
    ],
    mecanismoAcao: 'Equinocandina lipopeptidica que inibe a sintese de 1,3-beta-D-glucano, componente essencial da parede celular fungica. Acao fungicida contra Candida spp. e fungistatica contra Aspergillus. Nao depende de metabolismo hepatico - degradacao quimica lenta.',
    posologias: [
      {
        indicacao: 'Candidemia/Candidiase invasiva',
        adultos: {
          dose: '200mg D1 (dose de ataque), depois 100mg/dia',
          frequencia: '1x/dia',
          observacoes: 'Infusao IV em pelo menos 1.5h para 200mg ou 1h para 100mg. Duracao: ate 14 dias apos ultimo hemocultura negativa.'
        }
      },
      {
        indicacao: 'Candidiase esofagica',
        adultos: {
          dose: '100mg D1, depois 50mg/dia',
          frequencia: '1x/dia',
          observacoes: 'Duracao: minimo 14 dias e pelo menos 7 dias apos resolucao dos sintomas'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a anidulafungina ou outras equinocandinas'
    ],
    precaucoes: [
      'Reacoes infusionais se infusao rapida',
      'Nao usar para infeccoes por Cryptococcus (resistencia intrinseca)',
      'Hepatotoxicidade rara',
      'Monitorar funcao hepatica se sintomas',
      'Interacoes minimas - vantagem em pacientes polifarmacia'
    ],
    efeitosAdversos: {
      comuns: [
        'Diarreia',
        'Nausea',
        'Hipocalemia',
        'Elevacao de transaminases',
        'Rash'
      ],
      graves: [
        'Reacoes infusionais (rubor, prurido, hipotensao)',
        'Hepatotoxicidade',
        'Anafilaxia (raro)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Minimas interacoes',
        gravidade: 'leve',
        efeito: 'Anidulafungina nao e substrato/inibidor de CYP450',
        conduta: 'Vantagem em pacientes com multiplos medicamentos'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'leve',
        efeito: 'Aumento modesto (22%) de anidulafungina',
        conduta: 'Sem ajuste necessario'
      }
    ],
    ajusteDoseRenal: [
      { tfg: 'Qualquer', ajuste: 'Sem ajuste necessario (nao excretada por via renal)' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar.'
    },
    monitorizacao: [
      'Culturas de controle',
      'Funcao hepatica se sintomas',
      'Sinais de infusao (infundir lentamente)',
      'Potassio serico'
    ],
    orientacoesPaciente: [
      'Administracao apenas por profissional de saude',
      'Relatar sintomas de reacao durante infusao',
      'Completar tratamento prescrito'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessario',
      hepatopatas: 'Child-Pugh A/B/C: sem ajuste necessario'
    },
    doencasRelacionadas: ['candidiase', 'candidemia', 'candidiase-invasiva'],
    tags: ['antifungico', 'equinocandina', 'anidulafungina', 'candidemia', 'candidiase', 'intravenoso'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 10. MICAFUNGINA - Echinocandin
  {
    id: 'micafungin',
    nomeGenerico: 'Micafungina',
    nomesComerciais: ['Mycamine'],
    atcCode: 'J02AX05',
    rxNormCui: '349214',
    drugBankId: 'DB01141',
    snomedCT: '407103003',
    classeTerapeutica: 'antifungico',
    subclasse: 'equinocandina',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Candidemia e candidiase invasiva',
      'Candidiase esofagica',
      'Profilaxia de candidiase em transplante de celulas-tronco hematopoieticas',
      'Infeccoes por Aspergillus (terapia de resgate)'
    ],
    mecanismoAcao: 'Equinocandina que inibe sintese de 1,3-beta-D-glucano da parede celular fungica. Fungicida contra Candida spp., fungistatica contra Aspergillus. Metabolismo hepatico por SULT e catecol-O-metiltransferase (nao CYP450 significativo).',
    posologias: [
      {
        indicacao: 'Candidemia/Candidiase invasiva - Adultos',
        adultos: {
          dose: '100mg',
          frequencia: '1x/dia IV',
          observacoes: 'Infusao em 1 hora. Duracao: ate 14 dias apos ultima hemocultura negativa.'
        }
      },
      {
        indicacao: 'Candidiase esofagica - Adultos',
        adultos: {
          dose: '150mg',
          frequencia: '1x/dia IV',
          observacoes: 'Duracao: minimo 14 dias'
        }
      },
      {
        indicacao: 'Profilaxia em TCTH',
        adultos: {
          dose: '50mg',
          frequencia: '1x/dia IV',
          observacoes: 'Durante neutropenia ou imunossupressao'
        }
      },
      {
        indicacao: 'Pediatrico (>4 meses)',
        pediatrico: {
          dose: '2mg/kg (candidemia) ou 1mg/kg (profilaxia)',
          frequencia: '1x/dia',
          idadeMinima: '4 meses',
          doseMaxima: '100mg/dia (candidemia), 50mg/dia (profilaxia)'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a micafungina ou outras equinocandinas'
    ],
    precaucoes: [
      'Hepatotoxicidade - monitorar funcao hepatica',
      'Tumores hepaticos observados em ratos (significado clinico incerto)',
      'Reacoes infusionais',
      'Nao ativo contra Cryptococcus',
      'Hemolise rara'
    ],
    efeitosAdversos: {
      comuns: [
        'Nausea',
        'Vomitos',
        'Diarreia',
        'Elevacao de transaminases',
        'Hipocalemia',
        'Flebite'
      ],
      graves: [
        'Hepatotoxicidade',
        'Anemia hemolitica',
        'Reacao anafilatica',
        'Insuficiencia renal aguda'
      ]
    },
    interacoes: [
      {
        medicamento: 'Sirolimus',
        gravidade: 'moderada',
        efeito: 'Micafungina pode aumentar niveis de sirolimus',
        conduta: 'Monitorar niveis de sirolimus'
      },
      {
        medicamento: 'Nifedipino',
        gravidade: 'moderada',
        efeito: 'Aumento de niveis de nifedipino',
        conduta: 'Monitorar efeitos do nifedipino'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'leve',
        efeito: 'Sem interacao significativa',
        conduta: 'Pode usar sem ajuste'
      }
    ],
    ajusteDoseRenal: [
      { tfg: 'Qualquer', ajuste: 'Sem ajuste necessario' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar.'
    },
    monitorizacao: [
      'Funcao hepatica basal e periodica',
      'Culturas de controle',
      'Potassio serico',
      'Hemograma se uso prolongado'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessario',
      hepatopatas: 'Sem ajuste; monitorar funcao hepatica',
      pediatrico: 'Aprovado >=4 meses. Dose baseada em peso.'
    },
    doencasRelacionadas: ['candidiase', 'candidemia', 'candidiase-invasiva', 'transplante'],
    tags: ['antifungico', 'equinocandina', 'micafungina', 'candidemia', 'candidiase', 'profilaxia', 'intravenoso'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // ============================================================================
  // ANTIFUNGICOS SISTEMICOS - TRIAZOIS
  // ============================================================================

  // 11. ISAVUCONAZOL - Triazole
  {
    id: 'isavuconazole',
    nomeGenerico: 'Isavuconazol',
    nomesComerciais: ['Cresemba'],
    atcCode: 'J02AC05',
    rxNormCui: '1718160',
    drugBankId: 'DB09157',
    snomedCT: '716182005',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg (186mg de sulfato de isavuconazonium)', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '200mg (372mg de sulfato de isavuconazonium)', disponivelSUS: false }
    ],
    indicacoes: [
      'Aspergilose invasiva',
      'Mucormicose (zigomicose) invasiva',
      'Alternativa a voriconazol com melhor perfil de tolerabilidade'
    ],
    mecanismoAcao: 'Triazol de segunda geracao. Pro-droga (isavuconazonium) hidrolisada a isavuconazol ativo. Inibe 14-alfa-lanosterol demetilase (CYP51), enzima essencial na sintese de ergosterol da membrana fungica. Amplo espectro incluindo Aspergillus e Mucorales.',
    posologias: [
      {
        indicacao: 'Aspergilose/Mucormicose invasiva',
        adultos: {
          dose: 'Ataque: 200mg (2 caps ou 1 frasco IV) 8/8h por 6 doses (48h), depois 200mg 1x/dia',
          frequencia: 'Ataque 8/8h x6 doses, depois 1x/dia',
          observacoes: 'Capsulas: tomar com ou sem alimento. IV: infusao minima 1h. Pode trocar IV para oral 1:1.'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao isavuconazol',
      'Uso concomitante com rifampicina, carbamazepina, fenobarbital (indutores fortes CYP3A)',
      'Uso com cetoconazol, ritonavir em altas doses (inibidores fortes CYP3A4)',
      'Sindrome do QT curto familiar'
    ],
    precaucoes: [
      'ENCURTA intervalo QTc (efeito inverso ao voriconazol) - cautela em QT curto',
      'Hepatotoxicidade - monitorar funcao hepatica',
      'Interacoes medicamentosas via CYP3A4',
      'Nao usar concomitante com rifampicina'
    ],
    efeitosAdversos: {
      comuns: [
        'Nausea',
        'Vomitos',
        'Diarreia',
        'Cefaleia',
        'Elevacao de transaminases',
        'Hipocalemia'
      ],
      graves: [
        'Hepatotoxicidade',
        'Encurtamento QTc (nao usar em QT curto familiar)',
        'Reacoes de hipersensibilidade',
        'Insuficiencia hepatica'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina/Rifabutina',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis de isavuconazol >90%',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Carbamazepina/Fenitoina',
        gravidade: 'contraindicada',
        efeito: 'Reducao drastica de isavuconazol',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Cetoconazol (alta dose)/Ritonavir (alta dose)',
        gravidade: 'contraindicada',
        efeito: 'Aumenta isavuconazol excessivamente',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Ciclosporina/Tacrolimus/Sirolimus',
        gravidade: 'grave',
        efeito: 'Isavuconazol aumenta niveis de imunossupressores',
        conduta: 'Reduzir dose e monitorar niveis'
      },
      {
        medicamento: 'Midazolam',
        gravidade: 'moderada',
        efeito: 'Aumento de niveis de midazolam',
        conduta: 'Reduzir dose de midazolam'
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Aumento de digoxina',
        conduta: 'Monitorar niveis de digoxina'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Formulacao oral preferida (excipiente SBECD da formulacao IV pode acumular)' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar.'
    },
    monitorizacao: [
      'Funcao hepatica basal e periodica',
      'ECG se doenca cardiaca previa (encurtamento QTc)',
      'Galactomanana e imagem em aspergilose',
      'Niveis de imunossupressores se co-administrados',
      'Potassio serico'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessario',
      hepatopatas: 'Child-Pugh A/B: sem ajuste. Child-Pugh C: nao recomendado (dados limitados).',
      pediatrico: 'Nao aprovado para <18 anos'
    },
    doencasRelacionadas: ['aspergilose', 'mucormicose', 'infeccao-fungica-invasiva'],
    tags: ['antifungico', 'triazol', 'isavuconazol', 'aspergilose', 'mucormicose', 'invasiva'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 12. VORICONAZOL - Triazole
  {
    id: 'voriconazole',
    nomeGenerico: 'Voriconazol',
    nomesComerciais: ['Vfend'],
    atcCode: 'J02AC03',
    rxNormCui: '121243',
    drugBankId: 'DB00582',
    snomedCT: '385469007',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '40mg/ml', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '200mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Aspergilose invasiva - primeira linha',
      'Candidemia em pacientes nao neutropenicos',
      'Candidiase esofagica',
      'Infeccoes por Scedosporium ou Fusarium',
      'Profilaxia em TCTH alto risco'
    ],
    mecanismoAcao: 'Triazol de amplo espectro. Inibe CYP51 fungica (14-alfa-lanosterol demetilase), bloqueando sintese de ergosterol. Amplo espectro: Aspergillus, Candida, Scedosporium, Fusarium. NAO ativo contra Mucorales.',
    posologias: [
      {
        indicacao: 'Aspergilose invasiva',
        adultos: {
          dose: 'IV: 6mg/kg 12/12h D1, depois 4mg/kg 12/12h. VO: 400mg 12/12h D1, depois 200mg 12/12h',
          frequencia: '12/12h',
          observacoes: 'Oral 1h antes ou 1h apos refeicoes. Monitorar niveis terapeuticos (vale: 1-5.5 mcg/ml).'
        }
      },
      {
        indicacao: 'Candidemia/Candidiase esofagica',
        adultos: {
          dose: 'VO: 200mg 12/12h (ou 100mg se <40kg)',
          frequencia: '12/12h',
          observacoes: 'Duracao: ate 14 dias apos ultima cultura negativa ou resolucao sintomas'
        }
      },
      {
        indicacao: 'Pediatrico (2-12 anos)',
        pediatrico: {
          dose: 'IV: 9mg/kg 12/12h D1, depois 8mg/kg 12/12h. VO: 9mg/kg 12/12h',
          frequencia: '12/12h',
          idadeMinima: '2 anos',
          doseMaxima: 'VO: 350mg/dose'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao voriconazol',
      'Uso com rifampicina, carbamazepina, fenobarbital (indutores fortes)',
      'Uso com ritonavir 400mg 12/12h ou efavirenz (dose padrao)',
      'Uso com alcaloides do ergot',
      'Uso com sirolimus (aumento 11x)',
      'Galactosemia (suspensao contem lactose)'
    ],
    precaucoes: [
      'Prolonga QTc - evitar com outros farmacos que prolongam QT',
      'Hepatotoxicidade - monitorar funcao hepatica',
      'Disturbios visuais transitórios (fotofobia, visao turva)',
      'Fototoxicidade e cancer de pele - evitar sol, usar protetor',
      'Alucinacoes e confusao (relacionado a niveis altos)',
      'Monitorar niveis sericos (TDM recomendado)',
      'Polimorfismo CYP2C19 - metabolizadores lentos tem niveis maiores'
    ],
    efeitosAdversos: {
      comuns: [
        'Disturbios visuais (30%) - transitórios',
        'Rash/Fotossensibilidade',
        'Elevacao de transaminases',
        'Cefaleia',
        'Nausea',
        'Febre'
      ],
      graves: [
        'Hepatotoxicidade grave',
        'Prolongamento QTc/Arritmias',
        'Reacoes cutaneas graves (SJS/TEN)',
        'Cancer de pele (uso prolongado)',
        'Periostite fluorose-like (uso prolongado)',
        'Alucinacoes/Encefalopatia'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz voriconazol em >90%',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Sirolimus',
        gravidade: 'contraindicada',
        efeito: 'Aumenta sirolimus em 11x',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Tacrolimus',
        gravidade: 'grave',
        efeito: 'Aumenta tacrolimus 3x',
        conduta: 'Reduzir tacrolimus 2/3 e monitorar niveis'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'grave',
        efeito: 'Aumenta ciclosporina 2x',
        conduta: 'Reduzir ciclosporina 50% e monitorar niveis'
      },
      {
        medicamento: 'Farmacos que prolongam QT',
        gravidade: 'grave',
        efeito: 'Risco aditivo de prolongamento QT',
        conduta: 'Evitar ou monitorar ECG'
      },
      {
        medicamento: 'Varfarina',
        gravidade: 'grave',
        efeito: 'Aumento significativo do INR',
        conduta: 'Monitorar INR frequentemente'
      },
      {
        medicamento: 'Fenitoina',
        gravidade: 'grave',
        efeito: 'Reducao de voriconazol + aumento de fenitoina',
        conduta: 'Dobrar dose de voriconazol; monitorar fenitoina'
      },
      {
        medicamento: 'Omeprazol',
        gravidade: 'moderada',
        efeito: 'Voriconazol aumenta omeprazol',
        conduta: 'Reduzir omeprazol 50% se >40mg/dia'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '<50 (IV)', ajuste: 'Preferir formulacao oral (excipiente SBECD acumula)' },
      { tfg: '<50 (VO)', ajuste: 'Sem ajuste necessario' }
    ],
    gestacao: 'D',
    amamentacao: {
      compativel: false,
      observacao: 'Excretado no leite em estudos animais. Evitar.'
    },
    monitorizacao: [
      'Niveis sericos (TDM): vale 1-5.5 mcg/ml',
      'Funcao hepatica basal e semanal inicialmente',
      'ECG se uso de farmacos que prolongam QT',
      'Exame oftalmologico se disturbios visuais persistentes',
      'Exame dermatologico se uso prolongado (cancer de pele)',
      'Niveis de imunossupressores'
    ],
    orientacoesPaciente: [
      'Evitar sol direto - usar protetor solar e roupas protetoras',
      'Relatar alteracoes visuais',
      'Tomar 1h antes ou 1h apos refeicoes (oral)',
      'Nao dirigir se disturbios visuais',
      'Exames de pele regulares se uso prolongado'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste, mas maior risco de efeitos adversos',
      hepatopatas: 'Child-Pugh A/B: reduzir manutencao 50%. Child-Pugh C: nao recomendado.',
      pediatrico: 'Aprovado >=2 anos. Doses maiores por kg que adultos.'
    },
    doencasRelacionadas: ['aspergilose', 'candidemia', 'candidiase', 'infeccao-fungica-invasiva'],
    tags: ['antifungico', 'triazol', 'voriconazol', 'aspergilose', 'primeira-linha', 'tdm'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 13. POSACONAZOL - Triazole
  {
    id: 'posaconazole',
    nomeGenerico: 'Posaconazol',
    nomesComerciais: ['Noxafil'],
    atcCode: 'J02AC04',
    rxNormCui: '282446',
    drugBankId: 'DB01263',
    snomedCT: '421308002',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg (liberacao retardada)', disponivelSUS: false },
      { forma: 'suspensao_oral', concentracao: '40mg/ml', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '300mg/16.7ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Profilaxia de Aspergillus e Candida em pacientes de alto risco (LMA, SMD, TCTH)',
      'Candidiase orofaringea refrataria a fluconazol/itraconazol',
      'Mucormicose - tratamento e profilaxia',
      'Aspergilose invasiva (resgate)'
    ],
    mecanismoAcao: 'Triazol de amplo espectro incluindo atividade contra Mucorales (zigomicetos). Inibe CYP51 fungica. Espectro estendido em comparacao a voriconazol: Aspergillus, Candida, Mucorales, Fusarium.',
    posologias: [
      {
        indicacao: 'Profilaxia em pacientes de alto risco',
        adultos: {
          dose: 'Comprimido: 300mg 12/12h D1, depois 300mg 1x/dia. OU Suspensao: 200mg 8/8h',
          frequencia: 'Conforme formulacao',
          observacoes: 'Comprimido com ou sem alimento. Suspensao COM alimento gorduroso ou suplemento nutricional.'
        }
      },
      {
        indicacao: 'Candidiase orofaringea refrataria',
        adultos: {
          dose: 'Suspensao: 400mg 12/12h D1, depois 400mg 1x/dia',
          frequencia: 'Conforme acima',
          observacoes: 'Duracao: baseada na resposta clinica'
        }
      },
      {
        indicacao: 'Infusao IV',
        adultos: {
          dose: '300mg 12/12h D1, depois 300mg 1x/dia',
          frequencia: '12/12h D1, depois 1x/dia',
          observacoes: 'Via cateter central preferida. Infusao em 90 minutos. Trocar para oral quando possivel.'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao posaconazol',
      'Uso com alcaloides do ergot',
      'Uso com sirolimus',
      'Uso com atorvastatina, sinvastatina, lovastatina',
      'Galactosemia (suspensao contem glicose)'
    ],
    precaucoes: [
      'Prolonga QTc - monitorar ECG',
      'Hepatotoxicidade - monitorar funcao hepatica',
      'Formulacoes NAO sao intercambiaveis (biodisponibilidade diferente)',
      'Suspensao requer alimento gorduroso para absorcao',
      'Interacoes CYP3A4 extensas',
      'Monitorar niveis sericos se suspeita de ma absorcao'
    ],
    efeitosAdversos: {
      comuns: [
        'Diarreia',
        'Nausea',
        'Febre',
        'Elevacao de transaminases',
        'Rash',
        'Hipocalemia'
      ],
      graves: [
        'Prolongamento QTc/Arritmias',
        'Hepatotoxicidade',
        'Sindrome de Stevens-Johnson (raro)',
        'Reacao de hipersensibilidade'
      ]
    },
    interacoes: [
      {
        medicamento: 'Sirolimus',
        gravidade: 'contraindicada',
        efeito: 'Aumenta sirolimus 8-9x',
        conduta: 'CONTRAINDICADO'
      },
      {
        medicamento: 'Sinvastatina/Lovastatina/Atorvastatina',
        gravidade: 'contraindicada',
        efeito: 'Risco de rabdomiolise',
        conduta: 'CONTRAINDICADO - usar pravastatina ou rosuvastatina'
      },
      {
        medicamento: 'Tacrolimus',
        gravidade: 'grave',
        efeito: 'Aumenta tacrolimus 4x',
        conduta: 'Reduzir tacrolimus 2/3 e monitorar niveis'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'grave',
        efeito: 'Aumenta ciclosporina',
        conduta: 'Reduzir ciclosporina 25% e monitorar niveis'
      },
      {
        medicamento: 'Rifabutina',
        gravidade: 'grave',
        efeito: 'Reduz posaconazol e aumenta rifabutina',
        conduta: 'Evitar; se necessario, monitorar'
      },
      {
        medicamento: 'Fenitoina',
        gravidade: 'grave',
        efeito: 'Reducao de posaconazol',
        conduta: 'Evitar ou monitorar niveis de posaconazol'
      },
      {
        medicamento: 'Midazolam',
        gravidade: 'grave',
        efeito: 'Aumenta midazolam 5x',
        conduta: 'Reduzir dose e monitorar sedacao'
      },
      {
        medicamento: 'Vincristina',
        gravidade: 'grave',
        efeito: 'Aumenta neurotoxicidade da vincristina',
        conduta: 'Monitorar neuropatia; considerar ajuste'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '<50 (comprimido/suspensao)', ajuste: 'Sem ajuste necessario' },
      { tfg: '<50 (IV)', ajuste: 'Monitorar acumulo de SBECD; preferir oral' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Excretado no leite em estudos animais. Evitar.'
    },
    monitorizacao: [
      'Funcao hepatica basal e periodica',
      'ECG se fatores de risco para QT prolongado',
      'Niveis sericos se suspeita de ma absorcao (vale >1 mcg/ml para profilaxia, >0.7 para tratamento)',
      'Niveis de imunossupressores',
      'Potassio, magnesio'
    ],
    orientacoesPaciente: [
      'Suspensao: tomar COM refeicao gordurosa ou suplemento nutricional',
      'Comprimido: pode tomar com ou sem alimento',
      'Nao trocar entre formulacoes sem orientacao medica',
      'Relatar sintomas de problema hepatico (ictericia, urina escura)'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessario',
      hepatopatas: 'Sem dados em hepatopatia grave - usar com cautela',
      pediatrico: 'Aprovado >=13 anos (comprimido/suspensao) e >=18 anos (IV)'
    },
    doencasRelacionadas: ['aspergilose', 'mucormicose', 'candidiase', 'profilaxia-fungica'],
    tags: ['antifungico', 'triazol', 'posaconazol', 'mucormicose', 'profilaxia', 'amplo-espectro'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 14. ANFOTERICINA B LIPOSSOMAL
  {
    id: 'amphotericin-b-liposomal',
    nomeGenerico: 'Anfotericina B Lipossomal',
    nomesComerciais: ['AmBisome'],
    atcCode: 'J02AA01',
    rxNormCui: '77492',
    drugBankId: 'DB00681',
    snomedCT: '96034006',
    classeTerapeutica: 'antifungico',
    subclasse: 'polieno',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg (lipossomal)', disponivelSUS: true }
    ],
    indicacoes: [
      'Infeccoes fungicas invasivas graves em pacientes que nao toleram anfotericina convencional',
      'Aspergilose invasiva (alternativa)',
      'Candidemia e candidiase invasiva',
      'Criptococose incluindo meningite criptococica em HIV',
      'Mucormicose (zigomicose)',
      'Leishmaniose visceral',
      'Tratamento empirico de neutropenia febril com suspeita de infeccao fungica'
    ],
    mecanismoAcao: 'Polieno macrolidico encapsulado em lipossomas. Liga-se ao ergosterol da membrana fungica, formando poros que aumentam permeabilidade e causam morte celular. Formulacao lipossomal reduz nefrotoxicidade por liberacao preferencial em tecidos infectados.',
    posologias: [
      {
        indicacao: 'Infeccoes fungicas invasivas',
        adultos: {
          dose: '3-5mg/kg',
          frequencia: '1x/dia IV',
          observacoes: 'Infusao em 30-60 minutos (pode ser em 2h se reacoes). Duracao conforme infeccao.'
        }
      },
      {
        indicacao: 'Mucormicose',
        adultos: {
          dose: '5-10mg/kg',
          frequencia: '1x/dia IV',
          doseMaxima: '10mg/kg/dia',
          observacoes: 'Doses mais altas necessarias. Duracao prolongada.'
        }
      },
      {
        indicacao: 'Meningite criptococica (HIV)',
        adultos: {
          dose: '3-4mg/kg + flucitosina',
          frequencia: '1x/dia IV',
          observacoes: 'Fase de inducao: 2 semanas. Seguido de fluconazol consolidacao/manutencao.'
        }
      },
      {
        indicacao: 'Leishmaniose visceral (imunocompetente)',
        adultos: {
          dose: '3mg/kg D1-5, D14, D21 (total 21mg/kg)',
          frequencia: 'Conforme esquema',
          observacoes: 'OU 10mg/kg dose unica em alguns protocolos. WHO recomenda esquemas curtos.'
        }
      },
      {
        indicacao: 'Pediatrico',
        pediatrico: {
          dose: 'Similar a adultos: 3-5mg/kg',
          frequencia: '1x/dia',
          idadeMinima: '1 mes',
          observacoes: 'Farmacocinetica similar a adultos'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a anfotericina B ou componentes do lipossoma'
    ],
    precaucoes: [
      'Nefrotoxicidade (menor que convencional, mas possivel)',
      'Reacoes infusionais (febre, calafrios, rigidez)',
      'Hipocalemia - monitorar e repor',
      'Hipomagnesemia',
      'Anemia',
      'NAO intercambiavel com outras formulacoes de anfotericina'
    ],
    efeitosAdversos: {
      comuns: [
        'Reacoes infusionais (febre, calafrios)',
        'Nausea',
        'Hipocalemia',
        'Hipomagnesemia',
        'Elevacao de creatinina',
        'Anemia'
      ],
      graves: [
        'Nefrotoxicidade',
        'Anafilaxia',
        'Arritmias cardiacas (hipocalemia)',
        'Hepatotoxicidade',
        'Trombocitopenia'
      ]
    },
    interacoes: [
      {
        medicamento: 'Outros nefrotoxicos (aminoglicosideos, ciclosporina)',
        gravidade: 'grave',
        efeito: 'Nefrotoxicidade aditiva',
        conduta: 'Evitar se possivel; monitorar funcao renal rigorosamente'
      },
      {
        medicamento: 'Diureticos de alca',
        gravidade: 'moderada',
        efeito: 'Hipocalemia aditiva',
        conduta: 'Monitorar e repor potassio'
      },
      {
        medicamento: 'Corticosteroides',
        gravidade: 'moderada',
        efeito: 'Hipocalemia aditiva',
        conduta: 'Monitorar potassio'
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'grave',
        efeito: 'Hipocalemia aumenta toxicidade da digoxina',
        conduta: 'Manter potassio normal; monitorar digoxina'
      },
      {
        medicamento: 'Flucitosina',
        gravidade: 'moderada',
        efeito: 'Anfotericina pode aumentar toxicidade da flucitosina',
        conduta: 'Monitorar hemograma e funcao renal'
      }
    ],
    ajusteDoseRenal: [
      { tfg: 'Qualquer', ajuste: 'Sem ajuste de dose, mas monitorar funcao renal rigorosamente' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar ou considerar risco-beneficio.'
    },
    monitorizacao: [
      'Funcao renal antes e diariamente inicialmente, depois 2-3x/semana',
      'Potassio e magnesio diarios inicialmente',
      'Hemograma semanal',
      'Funcao hepatica periodica',
      'Sinais vitais durante infusao'
    ],
    orientacoesPaciente: [
      'Administracao apenas por profissional de saude',
      'Pode haver febre e calafrios durante infusao (comum)',
      'Relatar alteracoes na urina ou fraqueza muscular (hipocalemia)'
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de nefrotoxicidade - monitorar',
      hepatopatas: 'Sem ajuste, mas monitorar funcao hepatica',
      pediatrico: 'Aprovado para todas as idades. Doses similares a adultos.'
    },
    doencasRelacionadas: ['aspergilose', 'candidemia', 'criptococose', 'mucormicose', 'leishmaniose'],
    tags: ['antifungico', 'anfotericina', 'lipossomal', 'ambisome', 'invasiva', 'criptococose', 'leishmaniose'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 15. MILTEFOSINA - Leishmaniose
  {
    id: 'miltefosine',
    nomeGenerico: 'Miltefosina',
    nomesComerciais: ['Impavido'],
    atcCode: 'P01CX04',
    rxNormCui: '310384',
    drugBankId: 'DB09031',
    snomedCT: '395938008',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'anti_helmintico',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '10mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '50mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Leishmaniose visceral (calazar)',
      'Leishmaniose cutanea',
      'Leishmaniose mucocutanea',
      'Meningoencefalite amebiana primaria por Naegleria fowleri (off-label)'
    ],
    mecanismoAcao: 'Alquilfosfolipideo (hexadecilfosfocolina). Primeiro tratamento oral para leishmaniose. Mecanismo multimodal: altera composicao e fluidez da membrana do parasita, inibe sintese de fosfatidilcolina, interfere em vias de sinalizacao celular. Atividade parasiticida.',
    posologias: [
      {
        indicacao: 'Leishmaniose visceral - Adultos',
        adultos: {
          dose: '2.5mg/kg/dia (arredondar para 50mg)',
          frequencia: '1x/dia ou dividido 12/12h COM alimento',
          doseMaxima: '150mg/dia',
          observacoes: 'Duracao: 28 dias. Tomar COM alimento para reduzir intolerancia GI.'
        }
      },
      {
        indicacao: 'Leishmaniose cutanea',
        adultos: {
          dose: '2.5mg/kg/dia',
          frequencia: '1x/dia ou dividido COM alimento',
          doseMaxima: '150mg/dia',
          observacoes: 'Duracao: 28 dias'
        }
      },
      {
        indicacao: 'Leishmaniose - Pediatrico',
        pediatrico: {
          dose: '2.5mg/kg/dia',
          frequencia: '1x/dia ou dividido',
          idadeMinima: '2 anos',
          doseMaxima: '150mg/dia',
          observacoes: 'Duracao: 28 dias. Capsula pode ser aberta e misturada com alimento.'
        }
      }
    ],
    contraindicacoes: [
      'Gestacao (teratogenico)',
      'Amamentacao',
      'Mulheres em idade fertil sem contracepcao eficaz',
      'Hipersensibilidade a miltefosina',
      'Sindrome de Sjogren-Larsson (deficiencia de aldeido desidrogenase gorduroso)'
    ],
    precaucoes: [
      'TERATOGENICO - teste de gravidez obrigatorio antes de iniciar',
      'Contracepcao eficaz durante e 5 meses apos tratamento',
      'Nausea e vomitos frequentes (tomar com alimento)',
      'Hepatotoxicidade - monitorar funcao hepatica',
      'Nefrotoxicidade - monitorar funcao renal',
      'Trombocitopenia possivel',
      'Evitar em imunossuprimidos graves'
    ],
    efeitosAdversos: {
      comuns: [
        'Nausea (comum)',
        'Vomitos',
        'Diarreia',
        'Anorexia',
        'Cefaleia',
        'Tontura',
        'Elevacao de transaminases',
        'Elevacao de creatinina'
      ],
      graves: [
        'Teratogenicidade',
        'Hepatotoxicidade',
        'Nefrotoxicidade',
        'Trombocitopenia',
        'Sindrome de Stevens-Johnson (raro)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Farmacos nefrotoxicos',
        gravidade: 'moderada',
        efeito: 'Nefrotoxicidade aditiva',
        conduta: 'Monitorar funcao renal'
      },
      {
        medicamento: 'Farmacos hepatotoxicos',
        gravidade: 'moderada',
        efeito: 'Hepatotoxicidade aditiva',
        conduta: 'Monitorar funcao hepatica'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '30-60', ajuste: 'Usar com cautela; monitorar' },
      { tfg: '<30', ajuste: 'Dados limitados - considerar alternativa' }
    ],
    gestacao: 'X',
    amamentacao: {
      compativel: false,
      observacao: 'CONTRAINDICADO. Suspender amamentacao durante tratamento e 5 meses apos.'
    },
    monitorizacao: [
      'Teste de gravidez antes de iniciar (obrigatorio)',
      'Funcao hepatica basal, semanal durante tratamento',
      'Funcao renal basal, semanal durante tratamento',
      'Hemograma',
      'Peso (nausea pode causar perda de peso)'
    ],
    orientacoesPaciente: [
      'Tomar COM alimento para reduzir nausea',
      'NAO engravidar durante tratamento e ate 5 meses apos',
      'Usar contracepcao eficaz (mulheres e parceiras de homens tratados)',
      'Relatar nausea intensa, vomitos, ictericia',
      'Completar 28 dias de tratamento'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem dados especificos - usar com cautela',
      hepatopatas: 'Contraindicado em hepatopatia grave',
      pediatrico: 'Aprovado >=2 anos. Capsula pode ser aberta e misturada com alimento.'
    },
    doencasRelacionadas: ['leishmaniose', 'leishmaniose-visceral', 'leishmaniose-cutanea', 'calazar'],
    tags: ['leishmaniose', 'calazar', 'miltefosina', 'antiparasitario', 'oral', 'who-essential'],
    citations: [],
    lastUpdate: '2024-12-01'
  }
];

// Export para uso no index consolidado
export default infectologiaNovos;
