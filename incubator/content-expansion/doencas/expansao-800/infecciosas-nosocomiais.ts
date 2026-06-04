/**
 * INFECCOES NOSOCOMIAIS (IRAS) - DARWIN-MFC EXPANSAO 800
 * ======================================================
 * Infeccoes relacionadas a assistencia a saude (IRAS)
 * Hospital-acquired infections with MDR pathogens
 */

import { Doenca } from '@/lib/types/doenca';

export const infecciosasNosocomiais: Doenca[] = [
  // ============================================================================
  // 1. PNEUMONIA ASSOCIADA A VENTILACAO (PAV)
  // ============================================================================
  {
    id: 'pav-pneumonia-ventilacao',
    titulo: 'Pneumonia Associada a Ventilacao Mecanica',
    sinonimos: ['PAV', 'VAP', 'Pneumonia do ventilador', 'Ventilator-associated pneumonia'],
    doid: 'DOID:552',
    snomedCT: '429271009',
    meshId: 'D053717',
    ciap2: ['R81'],
    cid10: ['J95.851', 'J18.9'],
    cid11: ['CA40.0'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Pneumonia que se desenvolve >48h apos intubacao orotraqueal e ventilacao mecanica. Principal IRAS em UTI com mortalidade 25-50%.',
      criteriosDiagnosticos: [
        'Ventilacao mecanica >48h',
        'Infiltrado novo ou progressivo na radiografia',
        'Febre >38C ou hipotermia <36C',
        'Leucocitose >12.000 ou leucopenia <4.000',
        'Secrecao traqueal purulenta',
        'Piora da oxigenacao (PaO2/FiO2)',
        'CPIS >=6 sugere PAV'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Aspiracao de secrecoes',
          'Fisioterapia respiratoria',
          'Elevacao cabeceira 30-45 graus',
          'Higiene oral com clorexidina'
        ],
        farmacologico: [
          'PAV PRECOCE (<5d): Ceftriaxona 2g/dia OU Ampicilina-Sulbactam',
          'PAV TARDIA (>=5d): Piperacilina-tazobactam + Vancomicina + Aminoglicosideo',
          'Risco MDR: Meropenem 1g 8/8h + Polimixina B',
          'Ajustar conforme culturas em 48-72h'
        ]
      },
      metasTerapeuticas: [
        'Melhora clinica em 48-72h',
        'Resolucao de febre e leucocitose',
        'Melhora radiologica',
        'Desmame do ventilador'
      ],
      examesIniciais: [
        'Radiografia de torax',
        'Aspirado traqueal quantitativo',
        'Lavado broncoalveolar (se disponivel)',
        'Hemoculturas (2 pares)',
        'Hemograma, PCR, procalcitonina'
      ],
      redFlags: [
        'Choque septico',
        'SDRA',
        'Falencia multiorganica',
        'Patogeno pan-resistente'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-20% dos pacientes em VM >48h',
        incidencia: '1-4 casos/1000 dias de ventilacao',
        mortalidade: '25-50% (mortalidade atribuivel)',
        fatoresRisco: [
          'Duracao da ventilacao mecanica',
          'Reintubacao',
          'Uso previo de antibioticos',
          'Posicao supina',
          'Sedacao profunda'
        ],
        citations: [{ refId: 'idsa-hap-vap-2016' }]
      },
      fisiopatologia: {
        texto: 'Microaspiracao de secrecoes orofaringeas colonizadas ao redor do cuff do tubo. Biofilme no tubo endotraqueal serve como reservatorio. Patogenos variam: precoce (S. pneumoniae, H. influenzae), tardia (P. aeruginosa, Acinetobacter, MRSA).',
        citations: [{ refId: 'idsa-hap-vap-2016' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre ou hipotermia',
          'Secrecao traqueal purulenta',
          'Piora da oxigenacao',
          'Instabilidade hemodinamica'
        ],
        sinaisExameFisico: [
          'Estertores/crepitacoes',
          'Consolidacao pulmonar',
          'Taquicardia, taquipneia'
        ],
        formasClinicas: [
          'PAV precoce (<5 dias)',
          'PAV tardia (>=5 dias)'
        ],
        citations: [{ refId: 'idsa-hap-vap-2016' }]
      },
      diagnostico: {
        criterios: [
          'Clinico + radiologico + microbiologico',
          'CPIS (Clinical Pulmonary Infection Score) >=6',
          'Cultura quantitativa de aspirado traqueal'
        ],
        diagnosticoDiferencial: [
          'Atelectasia',
          'SDRA',
          'Edema pulmonar',
          'Embolia pulmonar',
          'Hemorragia alveolar'
        ],
        examesLaboratoriais: [
          'Hemograma',
          'Procalcitonina',
          'Gasometria arterial',
          'Cultura de aspirado traqueal'
        ],
        examesImagem: ['Radiografia de torax', 'TC de torax se duvida'],
        citations: [{ refId: 'idsa-hap-vap-2016' }]
      },
      tratamento: {
        objetivos: [
          'Cobertura empirica adequada',
          'De-escalonamento guiado por cultura',
          'Duracao otimizada 7 dias'
        ],
        naoFarmacologico: {
          medidas: [
            'Bundle de prevencao de PAV',
            'Desmame de VM precoce',
            'Sedacao minima'
          ],
          citations: [{ refId: 'anvisa-pav-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'PAV precoce', medicamentos: ['Ceftriaxona', 'Ampicilina-sulbactam'], posologia: 'Ceftriaxona 2g/dia IV' },
            { classe: 'PAV tardia sem MDR', medicamentos: ['Piperacilina-tazobactam'], posologia: '4,5g IV 6/6h' }
          ],
          segundaLinha: [
            { classe: 'PAV tardia com risco MDR', medicamentos: ['Meropenem', 'Polimixina B', 'Vancomicina'], posologia: 'Meropenem 1g 8/8h + Polimixina 25.000UI/kg/dia' }
          ],
          citations: [{ refId: 'idsa-hap-vap-2016' }]
        },
        duracao: '7 dias (prolongar apenas se ma resposta)'
      },
      acompanhamento: {
        frequenciaConsultas: 'Avaliacao diaria em UTI',
        examesControle: ['Radiografia diaria', 'Procalcitonina seriada'],
        metasTerapeuticas: ['Resolucao clinica', 'Desmame do ventilador'],
        criteriosEncaminhamento: ['CCIH para vigilancia', 'Infectologia se MDR'],
        citations: [{ refId: 'idsa-hap-vap-2016' }]
      },
      prevencao: {
        primaria: [
          'Elevacao de cabeceira 30-45 graus',
          'Higiene oral com clorexidina 0,12%',
          'Evitar intubacao desnecessaria'
        ],
        secundaria: [
          'Bundle de prevencao de PAV',
          'Vigilancia de IRAS'
        ],
        citations: [{ refId: 'anvisa-pav-2017' }]
      }
    },
    protocolos: ['bundle-pav'],
    medicamentos: ['piperacilina-tazobactam', 'meropenem', 'vancomicina'],
    calculadoras: ['cpis'],
    rastreamentos: [],
    citations: [{ refId: 'idsa-hap-vap-2016' }, { refId: 'anvisa-pav-2017' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 2. INFECCAO PRIMARIA DE CORRENTE SANGUINEA (IPCS)
  // ============================================================================
  {
    id: 'ipcs-corrente-sanguinea',
    titulo: 'Infeccao Primaria de Corrente Sanguinea',
    sinonimos: ['IPCS', 'CLABSI', 'Bacteremia de cateter', 'Central line-associated bloodstream infection'],
    doid: 'DOID:8888',
    snomedCT: '434091008',
    meshId: 'D055499',
    ciap2: ['A78'],
    cid10: ['T80.2', 'A41.9'],
    cid11: ['1G40'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Infeccao de corrente sanguinea em paciente com cateter venoso central >48h, sem outro foco identificavel. Principal causa de sepse nosocomial.',
      criteriosDiagnosticos: [
        'Cateter venoso central presente >48h',
        'Hemocultura positiva',
        'Ausencia de outro foco infeccioso',
        'Sinais de infeccao sistemica (febre, calafrios)',
        'Sinais locais: hiperemia, secrecao purulenta no sitio',
        'Diferencial de tempo de positividade >2h (cateter vs periferia)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Remocao do cateter (obrigatoria se infeccao complicada)',
          'Cultura de ponta de cateter',
          'Novo acesso em sitio diferente'
        ],
        farmacologico: [
          'EMPIRICO: Vancomicina 15-20mg/kg 12/12h + Cefepime ou Meropenem',
          'Cobertura antifungica se fatores de risco',
          'Ajustar conforme antibiograma',
          'Lock therapy para cateter de longa permanencia'
        ]
      },
      metasTerapeuticas: [
        'Hemoculturas de controle negativas',
        'Resolucao da febre em 48-72h',
        'Ausencia de complicacoes metastaticas'
      ],
      examesIniciais: [
        'Hemoculturas (2 perifericas + 1 do cateter)',
        'Hemograma, PCR, lactato',
        'Funcao renal e hepatica',
        'Ecocardiograma (se S. aureus ou bacteremia prolongada)'
      ],
      redFlags: [
        'Sepse grave/choque septico',
        'Endocardite infecciosa',
        'Tromboflebite septica',
        'Bacteremia persistente >72h'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,5-4,3/1000 cateteres-dia',
        mortalidade: '12-25% (mortalidade atribuivel)',
        faixaEtaria: 'Todas as idades',
        fatoresRisco: [
          'Duracao do cateter',
          'Cateter femoral',
          'Nutricao parenteral',
          'Neutropenia',
          'Colonizacao de pele'
        ],
        citations: [{ refId: 'idsa-clabsi-2009' }]
      },
      fisiopatologia: {
        texto: 'Colonizacao do cateter por migracao extraluminal (pele) ou intraluminal (hub contaminado). Formacao de biofilme. Patogenos: Staphylococcus coagulase-negativo, S. aureus, Enterococcus, Candida, bacilos gram-negativos.',
        citations: [{ refId: 'idsa-clabsi-2009' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre, calafrios',
          'Hiperemia no sitio de insercao',
          'Secrecao purulenta',
          'Instabilidade hemodinamica'
        ],
        sinaisExameFisico: [
          'Sinais flogisticos no sitio',
          'Febre',
          'Sinais de sepse'
        ],
        citations: [{ refId: 'idsa-clabsi-2009' }]
      },
      diagnostico: {
        criterios: [
          'Hemocultura positiva + cateter >48h',
          'Diferencial de tempo de positividade',
          'Cultura semiquantitativa de ponta >15 UFC'
        ],
        diagnosticoDiferencial: [
          'Bacteremia de outro foco',
          'Febre medicamentosa',
          'Tromboflebite nao infecciosa'
        ],
        examesLaboratoriais: [
          'Hemoculturas pareadas',
          'Cultura de ponta de cateter',
          'Procalcitonina'
        ],
        citations: [{ refId: 'idsa-clabsi-2009' }]
      },
      tratamento: {
        objetivos: [
          'Erradicacao da infeccao',
          'Prevencao de complicacoes metastaticas',
          'Remocao do cateter quando indicado'
        ],
        naoFarmacologico: {
          medidas: [
            'Remocao do cateter',
            'Lock therapy (etanol ou antibiotico)',
            'Vigilancia de IRAS'
          ],
          citations: [{ refId: 'idsa-clabsi-2009' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cobertura empirica', medicamentos: ['Vancomicina', 'Cefepime'], posologia: 'Vanco 15-20mg/kg 12/12h + Cefepime 2g 8/8h' }
          ],
          segundaLinha: [
            { classe: 'Cobertura antifungica', medicamentos: ['Fluconazol', 'Equinocandina'], posologia: 'Fluconazol 400mg/dia ou Caspofungina 70mg D1, 50mg/dia' }
          ],
          citations: [{ refId: 'idsa-clabsi-2009' }]
        },
        duracao: 'S. aureus: 4-6 semanas. CoNS: 5-7 dias. Candida: 14 dias apos negativacao'
      },
      acompanhamento: {
        frequenciaConsultas: 'Diario ate estabilizacao',
        examesControle: ['Hemoculturas de controle em 48-72h', 'Ecocardiograma se S. aureus'],
        metasTerapeuticas: ['Negativacao de hemoculturas', 'Resolucao clinica'],
        criteriosEncaminhamento: ['Infectologia', 'Cirurgia vascular se tromboflebite'],
        citations: [{ refId: 'idsa-clabsi-2009' }]
      },
      prevencao: {
        primaria: [
          'Tecnica assetica maxima na insercao',
          'Clorexidina alcoolica para antissepsia',
          'Evitar sitio femoral'
        ],
        secundaria: [
          'Bundle de prevencao de IPCS',
          'Revisao diaria da necessidade do cateter'
        ],
        citations: [{ refId: 'anvisa-ipcs-2017' }]
      }
    },
    protocolos: ['bundle-ipcs'],
    medicamentos: ['vancomicina', 'cefepime', 'fluconazol'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'idsa-clabsi-2009' }, { refId: 'anvisa-ipcs-2017' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 3. INFECCAO DE SITIO CIRURGICO (ISC)
  // ============================================================================
  {
    id: 'isc-sitio-cirurgico',
    titulo: 'Infeccao de Sitio Cirurgico',
    sinonimos: ['ISC', 'SSI', 'Infeccao de ferida operatoria', 'Surgical site infection'],
    doid: 'DOID:0080599',
    snomedCT: '433202001',
    meshId: 'D013530',
    ciap2: ['A87'],
    cid10: ['T81.4'],
    cid11: ['NE81.4'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Infeccao que ocorre ate 30 dias apos cirurgia (ou 90 dias se implante) envolvendo incisao, tecidos profundos ou orgao/espaco.',
      criteriosDiagnosticos: [
        'Ate 30 dias pos-operatorio (90 dias se implante)',
        'SUPERFICIAL: Pele e subcutaneo - drenagem purulenta, dor, edema',
        'PROFUNDA: Fascia e musculo - drenagem profunda, deiscencia, abscesso',
        'ORGAO/ESPACO: Cavidade manipulada - abscesso intracavitario',
        'Cultura positiva de secrecao ou tecido'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Abertura e drenagem da ferida',
          'Debridamento de tecido necrotico',
          'Curativo adequado',
          'Terapia por pressao negativa (VAC) se indicado'
        ],
        farmacologico: [
          'ISC SUPERFICIAL: Drenagem apenas, ATB se celulite extensa',
          'ISC PROFUNDA: Cefazolina 2g 8/8h OU Oxacilina',
          'Risco MRSA: Vancomicina 15-20mg/kg 12/12h',
          'Contaminacao intestinal: Piperacilina-tazobactam + Metronidazol'
        ]
      },
      metasTerapeuticas: [
        'Controle de foco infeccioso',
        'Cicatrizacao da ferida',
        'Preservacao do implante se possivel'
      ],
      examesIniciais: [
        'Cultura de secrecao/tecido',
        'Hemograma, PCR',
        'Hemoculturas se sinais sistemicos',
        'Imagem (USG, TC) se suspeita de colecao profunda'
      ],
      redFlags: [
        'Fasciite necrosante',
        'Sindrome compartimental',
        'Sepse/choque septico',
        'Infeccao de implante'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-5% das cirurgias',
        incidencia: 'Varia com tipo de cirurgia (limpa 1-2%, contaminada 10-20%)',
        mortalidade: '3% (atribuivel)',
        fatoresRisco: [
          'Diabetes mellitus',
          'Obesidade',
          'Tabagismo',
          'Desnutricao',
          'Tempo cirurgico prolongado'
        ],
        citations: [{ refId: 'cdc-ssi-2017' }]
      },
      fisiopatologia: {
        texto: 'Contaminacao intraoperatoria ou pos-operatoria precoce. Patogenos da flora cutanea (Staphylococcus) ou enteral (E. coli, Bacteroides). Fatores do hospedeiro e da cirurgia influenciam risco.',
        citations: [{ refId: 'cdc-ssi-2017' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor na ferida',
          'Hiperemia',
          'Drenagem purulenta',
          'Febre',
          'Deiscencia'
        ],
        sinaisExameFisico: [
          'Sinais flogisticos locais',
          'Flutuacao',
          'Crepitacao (infeccao necrosante)'
        ],
        formasClinicas: [
          'ISC superficial incisional',
          'ISC profunda incisional',
          'ISC de orgao/espaco'
        ],
        citations: [{ refId: 'cdc-ssi-2017' }]
      },
      diagnostico: {
        criterios: [
          'Criterios CDC para ISC',
          'Clinica + cultura positiva',
          'Imagem confirmando colecao'
        ],
        diagnosticoDiferencial: [
          'Seroma',
          'Hematoma',
          'Reacao a fio',
          'Deiscencia nao infecciosa'
        ],
        examesLaboratoriais: [
          'Cultura de secrecao',
          'Hemograma',
          'PCR'
        ],
        examesImagem: ['USG de partes moles', 'TC se colecao profunda'],
        citations: [{ refId: 'cdc-ssi-2017' }]
      },
      tratamento: {
        objetivos: [
          'Drenagem cirurgica',
          'Antibioticoterapia direcionada',
          'Cicatrizacao por segunda intencao'
        ],
        naoFarmacologico: {
          medidas: [
            'Abertura da ferida',
            'Debridamento',
            'Terapia por pressao negativa'
          ],
          citations: [{ refId: 'cdc-ssi-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Gram-positivo', medicamentos: ['Cefazolina', 'Oxacilina'], posologia: 'Cefazolina 2g 8/8h IV' }
          ],
          segundaLinha: [
            { classe: 'Amplo espectro', medicamentos: ['Piperacilina-tazobactam', 'Vancomicina'], posologia: 'Conforme gravidade e flora' }
          ],
          citations: [{ refId: 'idsa-ssti-2014' }]
        },
        duracao: 'ISC superficial: 5-7 dias. Profunda/orgao-espaco: 2-4 semanas'
      },
      acompanhamento: {
        frequenciaConsultas: 'Diario ate controle do foco, ambulatorio semanal',
        metasTerapeuticas: ['Fechamento da ferida', 'Ausencia de recorrencia'],
        criteriosEncaminhamento: ['Cirurgia para debridamento', 'Infectologia se MDR'],
        citations: [{ refId: 'cdc-ssi-2017' }]
      },
      prevencao: {
        primaria: [
          'Antibioticoprofilaxia adequada',
          'Normoglicemia perioperatoria',
          'Normotermia',
          'Tricotomia com clipper'
        ],
        secundaria: ['Vigilancia pos-alta', 'Bundles de prevencao'],
        citations: [{ refId: 'cdc-ssi-2017' }]
      }
    },
    protocolos: ['profilaxia-cirurgica'],
    medicamentos: ['cefazolina', 'vancomicina'],
    calculadoras: ['nnis-risk-index'],
    rastreamentos: [],
    citations: [{ refId: 'cdc-ssi-2017' }, { refId: 'idsa-ssti-2014' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 4. INFECCAO DO TRATO URINARIO ASSOCIADA A CATETER (ITU-AC)
  // ============================================================================
  {
    id: 'itu-ac-cateter-urinario',
    titulo: 'Infeccao do Trato Urinario Associada a Cateter',
    sinonimos: ['ITU-AC', 'CAUTI', 'Infeccao urinaria de sonda', 'Catheter-associated UTI'],
    doid: 'DOID:13148',
    snomedCT: '197927001',
    meshId: 'D002404',
    ciap2: ['U71'],
    cid10: ['N39.0', 'T83.5'],
    cid11: ['GC08'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Infeccao urinaria em paciente com cateter vesical de demora por >2 dias. Representa 40% das IRAS hospitalares.',
      criteriosDiagnosticos: [
        'Cateter vesical presente >=2 dias',
        'Sintomas urinarios: febre, dor suprapubica, dor lombar',
        'Urocultura >=10^5 UFC/mL (mono ou bimicrobiana)',
        'Ausencia de outro foco infeccioso',
        'NAO tratar bacteriuria assintomatica!'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Remocao ou troca do cateter (obrigatorio)',
          'Coleta de urina do novo cateter',
          'Avaliacao da necessidade de cateterizacao'
        ],
        farmacologico: [
          'ITU-AC NAO COMPLICADA: Ciprofloxacino 500mg 12/12h 7 dias',
          'OU Ceftriaxona 1g/dia se risco de MDR',
          'ITU-AC COMPLICADA/Sepse: Piperacilina-tazobactam ou Meropenem',
          'Ajustar conforme urocultura'
        ]
      },
      metasTerapeuticas: [
        'Resolucao de sintomas',
        'Urocultura de controle negativa (se indicado)',
        'Remocao precoce do cateter'
      ],
      examesIniciais: [
        'Urocultura quantitativa',
        'EAS',
        'Hemograma, funcao renal',
        'Hemoculturas se febre alta ou sepse'
      ],
      redFlags: [
        'Urossepse',
        'Pielonefrite enfisematosa',
        'Abscesso renal',
        'Obstrucao urinaria'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '40% das IRAS',
        incidencia: '3-7/1000 cateteres-dia',
        fatoresRisco: [
          'Duracao do cateterismo',
          'Sexo feminino',
          'Diabetes',
          'Nao uso de sistema fechado',
          'Colonizacao periuretral'
        ],
        citations: [{ refId: 'idsa-cauti-2010' }]
      },
      fisiopatologia: {
        texto: 'Biofilme na superficie do cateter serve como nicho de colonizacao. Ascensao bacteriana pelo espaco periuretral. Patogenos: E. coli, Klebsiella, Pseudomonas, Enterococcus, Candida.',
        citations: [{ refId: 'idsa-cauti-2010' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre',
          'Dor suprapubica',
          'Dor em flanco',
          'Calafrios',
          'Alteracao do nivel de consciencia (idosos)'
        ],
        sinaisExameFisico: [
          'Febre',
          'Sensibilidade costovertebral',
          'Urina turva ou com sedimento'
        ],
        citations: [{ refId: 'idsa-cauti-2010' }]
      },
      diagnostico: {
        criterios: [
          'Sintomas + urocultura positiva',
          '>=10^5 UFC/mL',
          'NAO tratar bacteriuria assintomatica'
        ],
        diagnosticoDiferencial: [
          'Bacteriuria assintomatica',
          'Outro foco infeccioso',
          'Prostatite'
        ],
        examesLaboratoriais: [
          'Urocultura',
          'EAS',
          'Hemoculturas'
        ],
        citations: [{ refId: 'idsa-cauti-2010' }]
      },
      tratamento: {
        objetivos: [
          'Tratamento da infeccao',
          'Remocao do cateter',
          'Prevencao de recorrencia'
        ],
        naoFarmacologico: {
          medidas: [
            'Trocar cateter antes de iniciar ATB',
            'Avaliar indicacao de cateter',
            'Sistema de drenagem fechado'
          ],
          citations: [{ refId: 'idsa-cauti-2010' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Quinolona', medicamentos: ['Ciprofloxacino'], posologia: '500mg VO 12/12h por 7 dias' },
            { classe: 'Cefalosporina', medicamentos: ['Ceftriaxona'], posologia: '1g IV/dia' }
          ],
          segundaLinha: [
            { classe: 'Amplo espectro', medicamentos: ['Piperacilina-tazobactam', 'Meropenem'], posologia: 'Conforme gravidade' }
          ],
          citations: [{ refId: 'idsa-cauti-2010' }]
        },
        duracao: '7 dias (prolongar se resposta lenta)'
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliacao em 48-72h',
        metasTerapeuticas: ['Resolucao de sintomas', 'Remocao do cateter'],
        criteriosEncaminhamento: ['Urologia se obstrucao', 'Infectologia se MDR'],
        citations: [{ refId: 'idsa-cauti-2010' }]
      },
      prevencao: {
        primaria: [
          'Indicacao restrita de cateterismo',
          'Tecnica assetica na insercao',
          'Sistema de drenagem fechado'
        ],
        secundaria: ['Revisao diaria da necessidade', 'Remocao precoce'],
        citations: [{ refId: 'anvisa-itu-2017' }]
      }
    },
    protocolos: ['bundle-itu'],
    medicamentos: ['ciprofloxacino', 'ceftriaxona'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'idsa-cauti-2010' }, { refId: 'anvisa-itu-2017' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 5. CLOSTRIDIOIDES DIFFICILE
  // ============================================================================
  {
    id: 'clostridioides-difficile',
    titulo: 'Infeccao por Clostridioides difficile',
    sinonimos: ['C. diff', 'CDI', 'Colite pseudomembranosa', 'Clostridium difficile'],
    doid: 'DOID:0060185',
    snomedCT: '186431008',
    meshId: 'D003015',
    ciap2: ['D70'],
    cid10: ['A04.7'],
    cid11: ['1A03.0'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Infeccao intestinal por C. difficile associada ao uso de antibioticos. Causa mais comum de diarreia nosocomial. Espectro: diarreia leve a colite fulminante.',
      criteriosDiagnosticos: [
        'Diarreia (>=3 evacuacoes amolecidas/24h)',
        'Uso recente de antibioticos (ultimas 8 semanas)',
        'Teste de toxina A/B positivo OU',
        'GDH positivo + toxina ou PCR',
        'Colite pseudomembranosa na colonoscopia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suspender antibiotico desencadeante',
          'Isolamento de contato',
          'Higiene das maos com agua e sabao (nao alcool gel)',
          'Reidratacao'
        ],
        farmacologico: [
          'NAO GRAVE: Vancomicina 125mg VO 6/6h por 10 dias',
          'OU Fidaxomicina 200mg VO 12/12h por 10 dias',
          'GRAVE (leucocitos >15.000, Cr >1,5x): Vancomicina 125mg VO 6/6h',
          'FULMINANTE: Vancomicina 500mg VO 6/6h + Metronidazol 500mg IV 8/8h',
          'RECORRENCIA: Vancomicina em desmame OU Fidaxomicina'
        ]
      },
      metasTerapeuticas: [
        'Resolucao da diarreia',
        'Prevencao de recorrencia',
        'Evitar complicacoes (megacolon toxico)'
      ],
      examesIniciais: [
        'Pesquisa de toxina A/B nas fezes',
        'GDH (glutamato desidrogenase)',
        'PCR para C. difficile',
        'Hemograma, funcao renal, albumina, lactato',
        'RX ou TC abdome se suspeita de complicacao'
      ],
      redFlags: [
        'Megacolon toxico (dilatacao >6cm)',
        'Ileo paralitico',
        'Perfuracao intestinal',
        'Choque septico',
        'Leucocitos >30.000 ou leucopenia'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Principal causa de diarreia nosocomial',
        incidencia: '15/10.000 pacientes-dia',
        mortalidade: '5-10% (30% na forma fulminante)',
        fatoresRisco: [
          'Uso de antibioticos (cefalosporinas, clindamicina, fluoroquinolonas)',
          'Idade >65 anos',
          'Hospitalizacao prolongada',
          'Uso de IBP',
          'Imunossupressao'
        ],
        citations: [{ refId: 'idsa-cdiff-2021' }]
      },
      fisiopatologia: {
        texto: 'Disbiotico intestinal por antibioticos permite proliferacao de C. difficile e producao de toxinas A (enterotoxina) e B (citotoxina). Dano epitelial causa inflamacao, pseudomembranas e diarreia secretora.',
        citations: [{ refId: 'idsa-cdiff-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Diarreia aquosa (3-15 evacuacoes/dia)',
          'Dor abdominal em colica',
          'Febre',
          'Nauseas',
          'Leucocitose'
        ],
        sinaisExameFisico: [
          'Distensao abdominal',
          'Dor a palpacao abdominal',
          'Febre',
          'Sinais de desidratacao'
        ],
        formasClinicas: [
          'CDI nao grave',
          'CDI grave',
          'CDI fulminante',
          'CDI recorrente'
        ],
        citations: [{ refId: 'idsa-cdiff-2021' }]
      },
      diagnostico: {
        criterios: [
          'Diarreia + teste positivo',
          'Algoritmo: GDH -> se + -> toxina/PCR',
          'NAO testar em assintomaticos'
        ],
        diagnosticoDiferencial: [
          'Outras colites infecciosas',
          'Doenca inflamatoria intestinal',
          'Colite isquemica',
          'Sindrome do intestino irritavel'
        ],
        examesLaboratoriais: [
          'Toxina A/B',
          'GDH',
          'PCR',
          'Hemograma'
        ],
        examesImagem: ['TC abdome se complicacao'],
        citations: [{ refId: 'idsa-cdiff-2021' }]
      },
      tratamento: {
        objetivos: [
          'Erradicar C. difficile',
          'Restaurar microbiota',
          'Prevenir recorrencia'
        ],
        naoFarmacologico: {
          medidas: [
            'Suspender ATB desencadeante',
            'Isolamento de contato',
            'Transplante de microbiota fecal (recorrencias)'
          ],
          citations: [{ refId: 'idsa-cdiff-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Glicopeptideo oral', medicamentos: ['Vancomicina'], posologia: '125mg VO 6/6h por 10 dias' },
            { classe: 'Macrociclo', medicamentos: ['Fidaxomicina'], posologia: '200mg VO 12/12h por 10 dias' }
          ],
          segundaLinha: [
            { classe: 'CDI fulminante', medicamentos: ['Vancomicina', 'Metronidazol'], posologia: 'Vanco 500mg VO 6/6h + Metro 500mg IV 8/8h' }
          ],
          situacoesEspeciais: [
            { situacao: 'Recorrencia', conduta: 'Vancomicina em desmame ou Fidaxomicina ou TMF' }
          ],
          citations: [{ refId: 'idsa-cdiff-2021' }]
        },
        duracao: '10 dias (inicial); desmame de 6-8 semanas para recorrente'
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliacao em 48-72h',
        examesControle: ['NAO repetir toxina para controle de cura'],
        metasTerapeuticas: ['Resolucao clinica', 'Ausencia de recorrencia em 8 semanas'],
        criteriosEncaminhamento: ['Cirurgia se megacolon/perfuracao', 'TMF se recorrencias multiplas'],
        citations: [{ refId: 'idsa-cdiff-2021' }]
      },
      prevencao: {
        primaria: [
          'Uso racional de antibioticos (stewardship)',
          'Higiene das maos com agua e sabao'
        ],
        secundaria: ['Isolamento de contato', 'Desinfeccao com hipoclorito'],
        citations: [{ refId: 'idsa-cdiff-2021' }]
      }
    },
    protocolos: ['cdiff-tratamento'],
    medicamentos: ['vancomicina-oral', 'fidaxomicina', 'metronidazol'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'idsa-cdiff-2021' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 6. MRSA (Staphylococcus aureus RESISTENTE A METICILINA)
  // ============================================================================
  {
    id: 'mrsa-staphylococcus',
    titulo: 'Infeccao por MRSA',
    sinonimos: ['MRSA', 'Staphylococcus aureus resistente a meticilina', 'ORSA', 'HA-MRSA', 'CA-MRSA'],
    doid: 'DOID:0080340',
    snomedCT: '266096002',
    meshId: 'D055624',
    ciap2: ['A78', 'S76'],
    cid10: ['A49.0', 'B95.6'],
    cid11: ['1C16'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Infeccao por S. aureus resistente a meticilina/oxacilina. HA-MRSA (hospitalar) e CA-MRSA (comunitario) tem perfis distintos. Causa bacteremia, endocardite, pneumonia, IPTM.',
      criteriosDiagnosticos: [
        'Cultura positiva para S. aureus',
        'Teste de sensibilidade: resistencia a oxacilina (MIC >=4)',
        'OU deteccao de gene mecA por PCR',
        'Swab nasal para rastreio de colonizacao'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Drenagem de abscessos',
          'Debridamento cirurgico',
          'Isolamento de contato',
          'Descolonizacao (mupirocina + banho clorexidina)'
        ],
        farmacologico: [
          'IPTM LEVE: Sulfametoxazol-trimetoprima OU Doxiciclina',
          'IPTM MODERADA/GRAVE: Vancomicina 15-20mg/kg 12/12h (alvo vale 15-20)',
          'BACTEREMIA: Vancomicina ou Daptomicina 6-8mg/kg/dia',
          'PNEUMONIA: Vancomicina ou Linezolida 600mg 12/12h'
        ]
      },
      metasTerapeuticas: [
        'Hemoculturas de controle negativas',
        'Nivel serico de vancomicina adequado (vale 15-20)',
        'Ausencia de complicacoes metastaticas'
      ],
      examesIniciais: [
        'Hemoculturas (2 pares)',
        'Cultura do sitio de infeccao',
        'Hemograma, PCR, funcao renal',
        'Ecocardiograma se bacteremia',
        'Nivel serico de vancomicina'
      ],
      redFlags: [
        'Endocardite infecciosa',
        'Bacteremia persistente >72h',
        'Pneumonia necrosante',
        'Choque septico',
        'Osteomielite vertebral'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-30% dos isolados de S. aureus em hospitais',
        incidencia: 'Em aumento globalmente',
        mortalidade: 'Bacteremia: 20-30%',
        fatoresRisco: [
          'Hospitalizacao previa',
          'Uso de antibioticos',
          'Cateter venoso',
          'Dialise',
          'Residencia em asilos'
        ],
        citations: [{ refId: 'idsa-mrsa-2011' }]
      },
      fisiopatologia: {
        texto: 'Resistencia conferida pelo gene mecA que codifica PBP2a com baixa afinidade por beta-lactamicos. CA-MRSA frequentemente carrega genes de leucocidina Panton-Valentine (PVL), associada a necrose tecidual.',
        citations: [{ refId: 'idsa-mrsa-2011' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Variaveis conforme foco',
          'IPTM: abscessos, celulite',
          'Bacteremia: febre, calafrios',
          'Pneumonia: tosse, dispneia',
          'Osteomielite: dor ossea'
        ],
        sinaisExameFisico: [
          'Abscessos cutaneos',
          'Sinais de sepse',
          'Sopro cardiaco (endocardite)'
        ],
        formasClinicas: [
          'IPTM (infeccoes de pele e partes moles)',
          'Bacteremia',
          'Endocardite',
          'Pneumonia',
          'Osteomielite'
        ],
        citations: [{ refId: 'idsa-mrsa-2011' }]
      },
      diagnostico: {
        criterios: [
          'Cultura com identificacao',
          'Antibiograma mostrando resistencia a oxacilina',
          'PCR para mecA'
        ],
        diagnosticoDiferencial: [
          'MSSA',
          'Streptococcus',
          'Outras infeccoes gram-positivas'
        ],
        examesLaboratoriais: [
          'Cultura',
          'Antibiograma',
          'Hemoculturas'
        ],
        citations: [{ refId: 'idsa-mrsa-2011' }]
      },
      tratamento: {
        objetivos: [
          'Antibioticoterapia adequada',
          'Controle de foco',
          'Prevencao de transmissao'
        ],
        naoFarmacologico: {
          medidas: [
            'Drenagem de colecoes',
            'Isolamento de contato',
            'Descolonizacao'
          ],
          citations: [{ refId: 'idsa-mrsa-2011' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Glicopeptideo', medicamentos: ['Vancomicina'], posologia: '15-20mg/kg IV 12/12h (ajuste por funcao renal e nivel serico)' }
          ],
          segundaLinha: [
            { classe: 'Lipopeptideo', medicamentos: ['Daptomicina'], posologia: '6-8mg/kg/dia IV (NAO usar em pneumonia)' },
            { classe: 'Oxazolidinona', medicamentos: ['Linezolida'], posologia: '600mg IV/VO 12/12h' }
          ],
          citations: [{ refId: 'idsa-mrsa-2011' }]
        },
        duracao: 'IPTM: 7-14 dias. Bacteremia nao complicada: 2 semanas. Endocardite: 6 semanas'
      },
      acompanhamento: {
        frequenciaConsultas: 'Hemoculturas de controle a cada 48-72h ate negativacao',
        metasTerapeuticas: ['Negativacao de hemoculturas', 'Nivel serico adequado'],
        criteriosEncaminhamento: ['Infectologia', 'Cardiologia se endocardite', 'Cirurgia se colecao'],
        citations: [{ refId: 'idsa-mrsa-2011' }]
      },
      prevencao: {
        primaria: [
          'Higiene das maos',
          'Precaucoes de contato',
          'Bundle de prevencao de IPCS'
        ],
        secundaria: ['Descolonizacao pre-operatoria', 'Rastreio em pacientes de risco'],
        citations: [{ refId: 'cdc-mrsa-prevention' }]
      }
    },
    protocolos: ['mrsa-bacteremia'],
    medicamentos: ['vancomicina', 'daptomicina', 'linezolida'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'idsa-mrsa-2011' }, { refId: 'cdc-mrsa-prevention' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 7. CANDIDA AURIS
  // ============================================================================
  {
    id: 'candida-auris',
    titulo: 'Infeccao por Candida auris',
    sinonimos: ['C. auris', 'Candidemia por C. auris', 'Candida multirresistente'],
    doid: 'DOID:14501',
    snomedCT: '715919003',
    meshId: 'D002177',
    ciap2: ['A78'],
    cid10: ['B37.7'],
    cid11: ['1F24.1'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Fungo emergente multirresistente com alta transmissibilidade nosocomial. Dificil identificacao laboratorial. Mortalidade 30-60% em candidemia.',
      criteriosDiagnosticos: [
        'Isolamento de Candida auris em cultura',
        'Identificacao correta requer MALDI-TOF ou sequenciamento',
        'Sistemas automatizados frequentemente erram identificacao',
        'Suspeitar se Candida resistente ou surto'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Isolamento de contato ESTRITO',
          'Quarto privativo',
          'Remocao de cateteres/dispositivos',
          'Descontaminacao ambiental com hipoclorito'
        ],
        farmacologico: [
          'EQUINOCANDINA (1a escolha): Caspofungina 70mg D1, 50mg/dia',
          'OU Micafungina 100mg/dia',
          'OU Anidulafungina 200mg D1, 100mg/dia',
          'Se resistente a equinocandina: Anfotericina B lipossomal',
          'Azois geralmente NAO eficazes'
        ]
      },
      metasTerapeuticas: [
        'Hemoculturas negativas',
        'Remocao de foco (cateter)',
        'Prevencao de transmissao'
      ],
      examesIniciais: [
        'Hemoculturas',
        'Identificacao por MALDI-TOF',
        'Teste de sensibilidade antifungica',
        'Swabs de vigilancia (axilar, virilha)',
        'Fundo de olho'
      ],
      redFlags: [
        'Resistencia a multiplas classes de antifungicos',
        'Surto hospitalar',
        'Candidemia persistente',
        'Choque septico'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Emergente globalmente desde 2009',
        incidencia: 'Surtos hospitalares em varios paises',
        mortalidade: '30-60%',
        fatoresRisco: [
          'Internacao prolongada em UTI',
          'Uso de antibioticos de amplo espectro',
          'Uso previo de antifungicos',
          'Cateteres venosos',
          'Diabetes mellitus'
        ],
        citations: [{ refId: 'cdc-cauris-2023' }]
      },
      fisiopatologia: {
        texto: 'Fungo com capacidade de persistir em superficies por semanas. Forma biofilme em dispositivos. Resistencia intrinseca a fluconazol e frequente a anfotericina B. Transmissao paciente-paciente e ambiental.',
        citations: [{ refId: 'cdc-cauris-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre persistente',
          'Instabilidade hemodinamica',
          'Sintomas inespecificos de sepse'
        ],
        sinaisExameFisico: [
          'Febre',
          'Sinais de sepse',
          'Lesoes cutaneas (raro)'
        ],
        formasClinicas: [
          'Candidemia',
          'Infeccao de ferida',
          'Otite',
          'Infeccao de trato urinario'
        ],
        citations: [{ refId: 'cdc-cauris-2023' }]
      },
      diagnostico: {
        criterios: [
          'Cultura positiva',
          'Identificacao correta por MALDI-TOF',
          'Confirmacao molecular se necessario'
        ],
        diagnosticoDiferencial: [
          'Outras especies de Candida',
          'Bacteremia'
        ],
        examesLaboratoriais: [
          'Hemocultura',
          'MALDI-TOF',
          'Antifungigrama'
        ],
        citations: [{ refId: 'cdc-cauris-2023' }]
      },
      tratamento: {
        objetivos: [
          'Terapia antifungica eficaz',
          'Remocao de dispositivos',
          'Controle de surto'
        ],
        naoFarmacologico: {
          medidas: [
            'Isolamento estrito',
            'Descontaminacao ambiental',
            'Comunicacao a CCIH'
          ],
          citations: [{ refId: 'cdc-cauris-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Equinocandina', medicamentos: ['Caspofungina', 'Micafungina', 'Anidulafungina'], posologia: 'Caspofungina 70mg D1, 50mg/dia' }
          ],
          segundaLinha: [
            { classe: 'Polieno', medicamentos: ['Anfotericina B lipossomal'], posologia: '3-5mg/kg/dia IV' }
          ],
          citations: [{ refId: 'idsa-candida-2016' }]
        },
        duracao: '14 dias apos negativacao de hemoculturas'
      },
      acompanhamento: {
        frequenciaConsultas: 'Hemoculturas a cada 48h ate negativacao',
        metasTerapeuticas: ['Negativacao de culturas', 'Ausencia de complicacoes'],
        criteriosEncaminhamento: ['CCIH obrigatoria', 'Infectologia'],
        citations: [{ refId: 'cdc-cauris-2023' }]
      },
      prevencao: {
        primaria: [
          'Vigilancia ativa em areas de risco',
          'Higiene das maos',
          'Precaucoes de contato'
        ],
        secundaria: ['Rastreio de contactantes', 'Descontaminacao ambiental'],
        citations: [{ refId: 'cdc-cauris-2023' }]
      }
    },
    protocolos: ['cauris-surto'],
    medicamentos: ['caspofungina', 'micafungina', 'anfotericina-b'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'cdc-cauris-2023' }, { refId: 'idsa-candida-2016' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 8. KPC (KLEBSIELLA PRODUTORA DE CARBAPENEMASE)
  // ============================================================================
  {
    id: 'kpc-carbapenemase',
    titulo: 'Infeccao por KPC (Klebsiella Produtora de Carbapenemase)',
    sinonimos: ['KPC', 'Klebsiella carbapenemase', 'CRE', 'Enterobacteria resistente a carbapenemico'],
    doid: 'DOID:104',
    snomedCT: '713535003',
    meshId: 'D007711',
    ciap2: ['A78', 'U71'],
    cid10: ['A49.8', 'B96.1'],
    cid11: ['1C11'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Enterobacteria produtora de enzima que hidrolisa carbapenems e outros beta-lactamicos. Opcoes terapeuticas limitadas. Mortalidade elevada (40-50%).',
      criteriosDiagnosticos: [
        'Cultura positiva para Klebsiella (ou outra Enterobacteria)',
        'Resistencia a carbapenems no antibiograma',
        'MIC elevado para meropenem (>=4)',
        'Teste fenotipico de carbapenemase positivo',
        'PCR para gene blaKPC'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Isolamento de contato',
          'Remocao de cateteres/dispositivos',
          'Controle de foco cirurgico se indicado'
        ],
        farmacologico: [
          'TERAPIA COMBINADA (preferencial):',
          'Polimixina B 25.000UI/kg/dia + Meropenem 2g 8/8h (infusao estendida) + Aminoglicosideo',
          'OU Ceftazidima-avibactam 2,5g 8/8h (se sensivel)',
          'OU Meropenem-vaborbactam 4g 8/8h (se disponivel)',
          'Tigeciclina pode ser adicionada'
        ]
      },
      metasTerapeuticas: [
        'Controle de foco',
        'Cobertura antimicrobiana adequada',
        'Prevencao de transmissao'
      ],
      examesIniciais: [
        'Culturas (sangue, urina, secrecoes)',
        'Antibiograma completo com MIC',
        'Teste de carbapenemase',
        'Funcao renal (nefrotoxicidade de polimixina)',
        'Swab retal de vigilancia'
      ],
      redFlags: [
        'Choque septico',
        'Pan-resistencia',
        'Bacteremia persistente',
        'Surto hospitalar'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Endemica em varios hospitais brasileiros',
        incidencia: 'Em aumento',
        mortalidade: '40-50%',
        fatoresRisco: [
          'Hospitalizacao prolongada',
          'Uso previo de carbapenems',
          'UTI',
          'Ventilacao mecanica',
          'Transplante de orgaos'
        ],
        citations: [{ refId: 'cdc-cre-2019' }]
      },
      fisiopatologia: {
        texto: 'Gene blaKPC em plasmideo transferivel codifica enzima serina-carbapenemase que hidrolisa carbapenems. Frequentemente co-resistencia a aminoglicosideos, quinolonas. Transmissao horizontal de plasmideo entre especies.',
        citations: [{ refId: 'cdc-cre-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dependente do sitio de infeccao',
          'Febre, calafrios',
          'Sintomas urinarios',
          'Dispneia (pneumonia)',
          'Instabilidade hemodinamica'
        ],
        sinaisExameFisico: [
          'Febre',
          'Sinais de sepse',
          'Sinais localizatorios conforme foco'
        ],
        formasClinicas: [
          'ITU',
          'Bacteremia',
          'Pneumonia',
          'Infeccao de ferida',
          'Infeccao intra-abdominal'
        ],
        citations: [{ refId: 'cdc-cre-2019' }]
      },
      diagnostico: {
        criterios: [
          'Cultura com Enterobacteria resistente',
          'Confirmacao de producao de carbapenemase',
          'Teste molecular para blaKPC'
        ],
        diagnosticoDiferencial: [
          'Outras CRE (NDM, OXA-48)',
          'Resistencia por impermeabilidade'
        ],
        examesLaboratoriais: [
          'Cultura',
          'Antibiograma',
          'Teste de carbapenemase'
        ],
        citations: [{ refId: 'cdc-cre-2019' }]
      },
      tratamento: {
        objetivos: [
          'Terapia antimicrobiana otimizada',
          'Controle de foco',
          'Prevencao de disseminacao'
        ],
        naoFarmacologico: {
          medidas: [
            'Isolamento de contato',
            'Remocao de dispositivos',
            'CCIH notificacao'
          ],
          citations: [{ refId: 'anvisa-cre-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Combinacao', medicamentos: ['Polimixina B', 'Meropenem', 'Aminoglicosideo'], posologia: 'Polimixina 25.000UI/kg/dia + Meropenem 2g 8/8h infusao 3h' },
            { classe: 'Inibidor beta-lactamase novo', medicamentos: ['Ceftazidima-avibactam'], posologia: '2,5g IV 8/8h' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['Meropenem-vaborbactam', 'Tigeciclina'], posologia: 'Conforme sensibilidade' }
          ],
          citations: [{ refId: 'idsa-cre-guidance' }]
        },
        duracao: '7-14 dias conforme sitio'
      },
      acompanhamento: {
        frequenciaConsultas: 'Avaliacao diaria ate estabilizacao',
        metasTerapeuticas: ['Resposta clinica', 'Culturas negativas'],
        criteriosEncaminhamento: ['CCIH', 'Infectologia obrigatoria'],
        citations: [{ refId: 'anvisa-cre-2020' }]
      },
      prevencao: {
        primaria: [
          'Uso racional de carbapenems',
          'Higiene das maos',
          'Precaucoes de contato'
        ],
        secundaria: ['Rastreio de colonizacao', 'Vigilancia de surtos'],
        citations: [{ refId: 'anvisa-cre-2020' }]
      }
    },
    protocolos: ['kpc-tratamento'],
    medicamentos: ['polimixina-b', 'ceftazidima-avibactam', 'meropenem'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'cdc-cre-2019' }, { refId: 'anvisa-cre-2020' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 9. ACINETOBACTER BAUMANNII MDR
  // ============================================================================
  {
    id: 'acinetobacter-baumannii-mdr',
    titulo: 'Infeccao por Acinetobacter baumannii MDR',
    sinonimos: ['Acinetobacter MDR', 'CRAB', 'Acinetobacter resistente a carbapenems'],
    doid: 'DOID:0080341',
    snomedCT: '116378009',
    meshId: 'D000151',
    ciap2: ['A78', 'R81'],
    cid10: ['A49.8', 'B96.89'],
    cid11: ['1C14'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Cocobacilo gram-negativo ubiquo, resistente a dessecacao, frequentemente MDR ou XDR. Principal causa de pneumonia nosocomial em UTIs. Mortalidade >50% em bacteremia.',
      criteriosDiagnosticos: [
        'Cultura positiva para A. baumannii',
        'Contexto clinico compativel (diferenciar colonizacao vs infeccao)',
        'Resistencia a carbapenems no antibiograma',
        'Multipla resistencia (>=3 classes)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Isolamento de contato',
          'Controle de foco (drenagem, remocao de cateter)',
          'Descontaminacao ambiental'
        ],
        farmacologico: [
          'POLIMIXINA B 25.000UI/kg/dia (dividido 12/12h) dose base',
          '+ Ampicilina-sulbactam 9g/dia (sulbactam tem atividade intrinseca)',
          '+/- Tigeciclina (dose alta 100mg 12/12h apos ataque de 200mg)',
          'Se sensivel: Meropenem dose alta 2g 8/8h infusao 3h',
          'NEBULIZACAO com Polimixina em PAV'
        ]
      },
      metasTerapeuticas: [
        'Controle de foco',
        'Terapia combinada eficaz',
        'Evitar disseminacao'
      ],
      examesIniciais: [
        'Culturas (secrecao traqueal, sangue)',
        'Antibiograma com MIC',
        'Funcao renal',
        'Nivel de polimixina (se disponivel)'
      ],
      redFlags: [
        'Pan-resistencia (XDR)',
        'Bacteremia com choque',
        'Surto hospitalar',
        'Coinfeccoes'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Endemico em muitas UTIs',
        incidencia: 'Alta em pacientes criticos',
        mortalidade: '>50% em bacteremia',
        fatoresRisco: [
          'Ventilacao mecanica prolongada',
          'Uso previo de antibioticos',
          'Cirurgia recente',
          'Queimaduras',
          'UTI'
        ],
        citations: [{ refId: 'idsa-mdr-gnr-2022' }]
      },
      fisiopatologia: {
        texto: 'Resistencia por multiplos mecanismos: bombas de efluxo, alteracao de porinas, beta-lactamases (OXA, metalo). Capacidade de sobreviver em superficies por semanas. Formacao de biofilme.',
        citations: [{ refId: 'idsa-mdr-gnr-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Pneumonia nosocomial',
          'Febre',
          'Secrecao traqueal purulenta',
          'Instabilidade hemodinamica'
        ],
        sinaisExameFisico: [
          'Estertores',
          'Consolidacao',
          'Sinais de sepse'
        ],
        formasClinicas: [
          'Pneumonia associada a ventilacao',
          'Bacteremia',
          'Infeccao de ferida/queimadura',
          'Meningite pos-neurocirurgia',
          'ITU'
        ],
        citations: [{ refId: 'idsa-mdr-gnr-2022' }]
      },
      diagnostico: {
        criterios: [
          'Cultura positiva + quadro clinico',
          'Diferenciar colonizacao de infeccao (critico)',
          'Antibiograma com MIC'
        ],
        diagnosticoDiferencial: [
          'Colonizacao sem infeccao',
          'Outros MDR gram-negativos'
        ],
        examesLaboratoriais: [
          'Cultura quantitativa',
          'Antibiograma',
          'Hemoculturas'
        ],
        citations: [{ refId: 'idsa-mdr-gnr-2022' }]
      },
      tratamento: {
        objetivos: [
          'Terapia combinada',
          'Otimizacao farmacocinetica',
          'Controle de surto'
        ],
        naoFarmacologico: {
          medidas: [
            'Isolamento',
            'Controle de foco',
            'Descontaminacao'
          ],
          citations: [{ refId: 'anvisa-mdr-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Polimixina + Sulbactam', medicamentos: ['Polimixina B', 'Ampicilina-sulbactam'], posologia: 'Polimixina 25.000UI/kg/dia + Amp-Sulb 9g/dia' }
          ],
          segundaLinha: [
            { classe: 'Adicionar', medicamentos: ['Tigeciclina', 'Meropenem'], posologia: 'Tigeciclina 200mg ataque, 100mg 12/12h' }
          ],
          citations: [{ refId: 'idsa-mdr-gnr-2022' }]
        },
        duracao: '7-14 dias conforme sitio e resposta'
      },
      acompanhamento: {
        frequenciaConsultas: 'Diaria em UTI',
        metasTerapeuticas: ['Melhora clinica', 'Negativacao de culturas'],
        criteriosEncaminhamento: ['Infectologia', 'CCIH'],
        citations: [{ refId: 'idsa-mdr-gnr-2022' }]
      },
      prevencao: {
        primaria: [
          'Higiene das maos rigorosa',
          'Descontaminacao ambiental',
          'Bundle de PAV'
        ],
        secundaria: ['Rastreio de surtos', 'Coorte de pacientes'],
        citations: [{ refId: 'anvisa-mdr-2020' }]
      }
    },
    protocolos: ['acinetobacter-tratamento'],
    medicamentos: ['polimixina-b', 'ampicilina-sulbactam', 'tigeciclina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'idsa-mdr-gnr-2022' }, { refId: 'anvisa-mdr-2020' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 10. PSEUDOMONAS AERUGINOSA MDR
  // ============================================================================
  {
    id: 'pseudomonas-aeruginosa-mdr',
    titulo: 'Infeccao por Pseudomonas aeruginosa MDR',
    sinonimos: ['Pseudomonas MDR', 'CRPA', 'Pseudomonas resistente a carbapenems'],
    doid: 'DOID:0080342',
    snomedCT: '52499004',
    meshId: 'D011552',
    ciap2: ['A78', 'R81'],
    cid10: ['A49.8', 'B96.5'],
    cid11: ['1C17'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Bacilo gram-negativo nao fermentador com resistencia intrinseca e adquirida. Frequente em UTIs, fibrose cistica, neutropenicos. Mortalidade elevada quando MDR.',
      criteriosDiagnosticos: [
        'Cultura positiva para P. aeruginosa',
        'Quadro clinico compativel (descartar colonizacao)',
        'MDR: resistente a >=3 classes (beta-lactamicos, quinolonas, aminoglicosideos)',
        'XDR: sensivel apenas a 1-2 classes'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Isolamento de contato',
          'Remocao de cateteres/dispositivos',
          'Drenagem de colecoes'
        ],
        farmacologico: [
          'SE SENSIVEL: Piperacilina-tazobactam 4,5g 6/6h OU Cefepime 2g 8/8h OU Meropenem',
          'MDR: Ceftolozano-tazobactam 1,5-3g 8/8h (pneumonia) OU Ceftazidima-avibactam',
          'XDR: Polimixina B + Meropenem dose alta + Fosfomicina',
          'Aminoglicosideo (Amicacina 15-20mg/kg) como adjuvante'
        ]
      },
      metasTerapeuticas: [
        'Terapia direcionada por antibiograma',
        'Otimizacao de doses',
        'Controle de foco'
      ],
      examesIniciais: [
        'Culturas multiplas',
        'Antibiograma com MIC',
        'Funcao renal',
        'Nivel serico de aminoglicosideo'
      ],
      redFlags: [
        'XDR ou pan-resistencia',
        'Neutropenia febril',
        'Bacteremia com choque',
        'Endocardite'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10% das infeccoes nosocomiais',
        incidencia: 'Alta em UTIs',
        mortalidade: '30-40% em bacteremia MDR',
        fatoresRisco: [
          'Ventilacao mecanica',
          'Fibrose cistica',
          'Neutropenia',
          'Queimaduras',
          'Uso previo de antibioticos'
        ],
        citations: [{ refId: 'idsa-pseudomonas-2018' }]
      },
      fisiopatologia: {
        texto: 'Resistencia intrinseca (AmpC, MexAB-OprM) amplificada por mecanismos adquiridos: beta-lactamases (incluindo metalo), alteracao de OprD, bombas de efluxo adicionais. Biofilme dificulta erradicacao.',
        citations: [{ refId: 'idsa-pseudomonas-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Pneumonia nosocomial',
          'Febre',
          'Secrecao purulenta esverdeada',
          'Piora respiratoria'
        ],
        sinaisExameFisico: [
          'Estertores',
          'Sinais de sepse',
          'Lesoes cutaneas (ectima gangrenoso)'
        ],
        formasClinicas: [
          'Pneumonia (PAV)',
          'Bacteremia',
          'ITU',
          'Infeccao de ferida',
          'Osteomielite',
          'Endocardite'
        ],
        citations: [{ refId: 'idsa-pseudomonas-2018' }]
      },
      diagnostico: {
        criterios: [
          'Cultura positiva + clinica',
          'Antibiograma com MIC',
          'Definir se MDR/XDR'
        ],
        diagnosticoDiferencial: [
          'Outros gram-negativos MDR',
          'Colonizacao (comum em vias aereas)'
        ],
        examesLaboratoriais: [
          'Cultura',
          'Antibiograma',
          'Hemoculturas'
        ],
        citations: [{ refId: 'idsa-pseudomonas-2018' }]
      },
      tratamento: {
        objetivos: [
          'Terapia adequada precoce',
          'Otimizacao PK/PD',
          'Terapia combinada em MDR'
        ],
        naoFarmacologico: {
          medidas: [
            'Isolamento',
            'Remocao de dispositivos',
            'Drenagem de colecoes'
          ],
          citations: [{ refId: 'idsa-pseudomonas-2018' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Beta-lactamico anti-Pseudomonas', medicamentos: ['Piperacilina-tazobactam', 'Cefepime', 'Meropenem'], posologia: 'Pip-tazo 4,5g 6/6h infusao 4h' },
            { classe: 'Novos beta-lactamicos', medicamentos: ['Ceftolozano-tazobactam', 'Ceftazidima-avibactam'], posologia: 'C/T 3g 8/8h (pneumonia)' }
          ],
          segundaLinha: [
            { classe: 'Combinacao para XDR', medicamentos: ['Polimixina B', 'Meropenem', 'Fosfomicina'], posologia: 'Polimixina 25.000UI/kg/dia + Meropenem 2g 8/8h' }
          ],
          citations: [{ refId: 'idsa-mdr-gnr-2022' }]
        },
        duracao: '7-14 dias conforme sitio'
      },
      acompanhamento: {
        frequenciaConsultas: 'Diaria em pacientes graves',
        metasTerapeuticas: ['Melhora clinica', 'Negativacao de culturas'],
        criteriosEncaminhamento: ['Infectologia', 'CCIH'],
        citations: [{ refId: 'idsa-pseudomonas-2018' }]
      },
      prevencao: {
        primaria: [
          'Higiene das maos',
          'Uso racional de antibioticos',
          'Bundle de PAV'
        ],
        secundaria: ['Vigilancia de MDR', 'Controle de surtos'],
        citations: [{ refId: 'anvisa-mdr-2020' }]
      }
    },
    protocolos: ['pseudomonas-mdr-tratamento'],
    medicamentos: ['piperacilina-tazobactam', 'ceftolozano-tazobactam', 'polimixina-b'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'idsa-pseudomonas-2018' }, { refId: 'idsa-mdr-gnr-2022' }],
    lastUpdate: '2026-01'
  }
];
