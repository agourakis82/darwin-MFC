/**
 * DOENÇAS NEUROLÓGICAS - DARWIN-MFC
 * ==================================
 * 
 * Ontologias integradas:
 * - DOID (Disease Ontology)
 * - SNOMED-CT (Systematized Nomenclature of Medicine)
 * - MeSH (Medical Subject Headings)
 * - UMLS CUI (Unified Medical Language System)
 */

import { Doenca } from '../../types/doenca';

export const doencasNeurologicas: Doenca[] = [
  {
    id: 'enxaqueca',
    titulo: 'Enxaqueca (Migrânea)',
    sinonimos: ['Migrânea', 'Dor de cabeça', 'Migraine'],
    doid: 'DOID:6364',
    snomedCT: '37796009',
    meshId: 'D008881',
    umlsCui: 'C0149931',
    ciap2: ['N89'],
    cid10: ['G43', 'G43.0', 'G43.1', 'G43.9'],
    cid11: ['8A80'],
    categoria: 'neurologico',
    quickView: {
      definicao: 'Cefaleia primária recorrente, caracterizada por crises de dor pulsátil, geralmente unilateral, de intensidade moderada a grave, associada a náuseas, fotofobia e fonofobia. Pode ser precedida por aura.',
      criteriosDiagnosticos: [
        'CRITÉRIOS ICHD-3 (Enxaqueca sem aura):',
        '≥5 crises com duração de 4-72 horas',
        '≥2: unilateral, pulsátil, moderada/grave, piora com atividade física',
        '≥1: náusea/vômito, fotofobia E fonofobia',
        'Não atribuível a outra doença',
        '',
        'AURA: Sintomas visuais, sensitivos ou de fala totalmente reversíveis (5-60 min)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Identificar e evitar gatilhos (estresse, jejum, privação de sono, álcool)',
          'Higiene do sono',
          'Atividade física regular',
          'Técnicas de relaxamento',
          'Diário de cefaleia'
        ],
        farmacologico: [
          'CRISE (abortivo):',
          'Analgésicos simples: Paracetamol 1g ou Dipirona 1g (crises leves)',
          'AINEs: Ibuprofeno 400-600mg ou Naproxeno 500-550mg',
          'Triptanos (moderada/grave): Sumatriptano 50-100mg VO ou 6mg SC',
          '',
          'PROFILAXIA (≥4 crises/mês ou incapacitantes):',
          'Propranolol 40-160mg/dia ou Amitriptilina 25-75mg/noite',
          'Topiramato 50-100mg/dia ou Valproato 500-1500mg/dia'
        ]
      },
      metasTerapeuticas: [
        'Redução de ≥50% na frequência das crises',
        'Redução da intensidade e duração das crises',
        'Melhora da qualidade de vida (MIDAS/HIT-6)',
        'Evitar cefaleia por uso excessivo de analgésicos'
      ],
      examesIniciais: [
        'Diagnóstico clínico (não há exame específico)',
        'Neuroimagem (TC/RM) se: início >50 anos, cefaleia atípica, sinais neurológicos focais, mudança no padrão, cefaleia em trovão'
      ],
      redFlags: [
        'Cefaleia "a pior da vida" ou em trovão (HSA)',
        'Sinais neurológicos focais persistentes',
        'Febre + rigidez de nuca (meningite)',
        'Papiledema (HIC)',
        'Mudança súbita do padrão de cefaleia',
        'Início após 50 anos (arterite temporal)',
        'Imunossupressão ou câncer'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '15% das mulheres, 6% dos homens',
        incidencia: 'Pico na 3ª-4ª década de vida',
        faixaEtaria: 'Início geralmente na adolescência/adulto jovem',
        fatoresRisco: [
          'Sexo feminino (3:1)',
          'História familiar (40-60%)',
          'Alterações hormonais (menstruação, pílula)',
          'Estresse',
          'Distúrbios do sono',
          'Obesidade'
        ],
        citations: [{ refId: 'ichd-3' }]
      },
      fisiopatologia: {
        texto: 'Envolve ativação do sistema trigeminovascular, com liberação de neuropeptídeos vasoativos (CGRP) e inflamação neurogênica. Depressão alastrante cortical explica a aura. Sensibilização central contribui para cronicidade.',
        citations: [{ refId: 'ichd-3' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor pulsátil, geralmente hemicraniana',
          'Intensidade moderada a grave',
          'Duração 4-72 horas',
          'Náuseas e/ou vômitos',
          'Fotofobia e fonofobia',
          'Piora com atividade física rotineira'
        ],
        sinaisExameFisico: [
          'Exame neurológico normal entre crises',
          'Pode haver alodinia cutânea durante crise',
          'Aura visual (escotomas, fosfenos, hemianopsia)'
        ],
        formasClinicas: [
          'Enxaqueca sem aura (mais comum)',
          'Enxaqueca com aura',
          'Enxaqueca crônica (≥15 dias/mês por >3 meses)',
          'Enxaqueca menstrual',
          'Enxaqueca vestibular'
        ],
        citations: [{ refId: 'ichd-3' }]
      },
      diagnostico: {
        criterios: [
          'Critérios ICHD-3 (clínicos)',
          'Diário de cefaleia para caracterização',
          'Neuroimagem para excluir causas secundárias'
        ],
        diagnosticoDiferencial: [
          'Cefaleia tensional',
          'Cefaleia em salvas',
          'Cefaleia por uso excessivo de medicamentos',
          'Hemorragia subaracnoidea',
          'Arterite temporal',
          'Tumor cerebral',
          'Trombose venosa cerebral'
        ],
        examesLaboratoriais: [
          'Não há exame laboratorial diagnóstico',
          'Hemograma, VHS se suspeita de arterite temporal',
          'Punção lombar se suspeita de HSA ou meningite'
        ],
        citations: [{ refId: 'ichd-3' }]
      },
      tratamento: {
        objetivos: [
          'Abortar crise rapidamente',
          'Reduzir frequência e gravidade',
          'Melhorar qualidade de vida',
          'Prevenir cronicidade'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar gatilhos identificados',
            'Regularidade de sono e alimentação',
            'Exercício físico regular',
            'Técnicas de relaxamento/biofeedback',
            'TCC para manejo do estresse'
          ],
          citations: [{ refId: 'abs-cefaleia-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Analgésico/AINE (crises leves-moderadas)',
              medicamentos: ['Paracetamol', 'Dipirona', 'Ibuprofeno', 'Naproxeno'],
              posologia: 'Ibuprofeno 400-600mg ou Naproxeno 500mg. Precocemente na crise.'
            },
            {
              classe: 'Triptano (crises moderadas-graves)',
              medicamentos: ['Sumatriptano', 'Rizatriptano', 'Zolmitriptano'],
              posologia: 'Sumatriptano 50-100mg VO, pode repetir após 2h (máx 200mg/dia).'
            }
          ],
          segundaLinha: [
            {
              classe: 'Profilático betabloqueador',
              medicamentos: ['Propranolol', 'Atenolol'],
              posologia: 'Propranolol 40-160mg/dia. CI: asma, bradicardia.'
            },
            {
              classe: 'Profilático antidepressivo',
              medicamentos: ['Amitriptilina', 'Nortriptilina'],
              posologia: 'Amitriptilina 25-75mg à noite. Bom se insônia ou depressão.'
            },
            {
              classe: 'Profilático anticonvulsivante',
              medicamentos: ['Topiramato', 'Valproato'],
              posologia: 'Topiramato 50-100mg/dia. Pode causar perda de peso.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Enxaqueca crônica refratária',
              conduta: 'Toxina botulínica tipo A. Anticorpos anti-CGRP (erenumabe, fremanezumabe).'
            },
            {
              situacao: 'Gestante',
              conduta: 'Paracetamol como analgésico. Propranolol pode ser usado como profilático. Evitar ergotamínicos e AINEs no 3º trimestre.'
            }
          ],
          citations: [{ refId: 'abs-cefaleia-2022' }]
        },
        duracao: 'Profilaxia: mínimo 6 meses, desmame gradual.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal até controle, depois a cada 3-6 meses',
        examesControle: [
          'Diário de cefaleia',
          'Escalas de incapacidade (MIDAS, HIT-6)'
        ],
        metasTerapeuticas: [
          'Redução ≥50% das crises',
          'MIDAS <11 (incapacidade leve)'
        ],
        criteriosEncaminhamento: [
          'Refratário a ≥2 profiláticos',
          'Enxaqueca crônica',
          'Sinais de alarme',
          'Necessidade de anti-CGRP'
        ],
        citations: [{ refId: 'abs-cefaleia-2022' }]
      },
      prevencao: {
        primaria: [
          'Estilo de vida saudável',
          'Gerenciamento do estresse'
        ],
        secundaria: [
          'Identificar e evitar gatilhos',
          'Profilaxia medicamentosa quando indicada'
        ],
        citations: []
      },
    },
    protocolos: ['cefaleia-alarme'],
    medicamentos: ['sumatriptano', 'ibuprofeno', 'propranolol', 'amitriptilina', 'topiramato'],
    calculadoras: ['midas', 'hit-6'],
    rastreamentos: [],
    citations: [{ refId: 'ichd-3' }, { refId: 'abs-cefaleia-2022' }],
    lastUpdate: '2024-12',
    tags: ['enxaqueca', 'cefaleia', 'migranea', 'triptano', 'profilaxia'],
  },
  {
    id: 'cefaleia-tensional',
    titulo: 'Cefaleia do Tipo Tensional',
    sinonimos: ['CTT', 'Cefaleia tensional', 'Cefaleia de tensão'],
    doid: 'DOID:10017',
    snomedCT: '398057008',
    meshId: 'D018781',
    umlsCui: 'C0033893',
    ciap2: ['N95'],
    cid10: ['G44.2'],
    cid11: ['8A81'],
    categoria: 'neurologico',
    quickView: {
      definicao: 'Cefaleia primária mais comum. Dor em pressão/aperto, bilateral, leve a moderada, sem náuseas significativas, sem piora com atividade física. Diferencia-se da enxaqueca pela menor intensidade e ausência de sintomas associados.',
      criteriosDiagnosticos: [
        'CRITÉRIOS ICHD-3 (CTT episódica):',
        '≥10 episódios com duração de 30 min a 7 dias',
        '≥2: bilateral, em pressão/aperto (não pulsátil), leve/moderada, não piora com atividade',
        'Ambos: sem náusea/vômito, no máximo fotofobia OU fonofobia',
        'Não atribuível a outra doença'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Identificar fatores desencadeantes (estresse, postura)',
          'Correção postural',
          'Técnicas de relaxamento',
          'Atividade física regular',
          'Higiene do sono'
        ],
        farmacologico: [
          'CRISE: Paracetamol 500-1000mg ou Dipirona 500-1000mg',
          'AINEs: Ibuprofeno 400mg ou Naproxeno 500mg',
          'Evitar uso >10 dias/mês (cefaleia por uso excessivo)',
          '',
          'PROFILAXIA (CTT crônica):',
          'Amitriptilina 10-75mg à noite (1ª escolha)'
        ]
      },
      metasTerapeuticas: [
        'Redução da frequência e intensidade',
        'Evitar abuso de analgésicos',
        'Melhora da qualidade de vida'
      ],
      examesIniciais: [
        'Diagnóstico clínico',
        'Neuroimagem apenas se sinais de alarme'
      ],
      redFlags: [
        'Mudança no padrão da cefaleia',
        'Início súbito ou "a pior da vida"',
        'Sinais neurológicos focais',
        'Papiledema',
        'Febre + rigidez de nuca'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '30-78% da população (cefaleia mais comum)',
        incidencia: 'Muito alta, subdiagnosticada',
        faixaEtaria: 'Todas as idades, pico 30-40 anos',
        fatoresRisco: [
          'Estresse psicológico (principal)',
          'Tensão muscular cervical',
          'Má postura',
          'Distúrbios do sono',
          'Depressão/ansiedade',
          'Uso de telas prolongado'
        ],
        citations: [{ refId: 'ichd-3' }]
      },
      fisiopatologia: {
        texto: 'Mecanismos periféricos (sensibilização de nociceptores miofasciais pericraniais) e centrais (sensibilização do núcleo trigeminal) contribuem. Estresse e tensão muscular são fatores moduladores importantes.',
        citations: [{ refId: 'ichd-3' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor em pressão ou aperto bilateral',
          'Intensidade leve a moderada',
          'Não incapacitante',
          'Não piora com atividade física',
          'Sem náuseas ou vômitos'
        ],
        sinaisExameFisico: [
          'Exame neurológico normal',
          'Pode haver sensibilidade à palpação de musculatura pericraniana'
        ],
        formasClinicas: [
          'CTT episódica infrequente (<1 dia/mês)',
          'CTT episódica frequente (1-14 dias/mês)',
          'CTT crônica (≥15 dias/mês por >3 meses)'
        ],
        citations: [{ refId: 'ichd-3' }]
      },
      diagnostico: {
        criterios: [
          'Critérios ICHD-3',
          'Distinção de enxaqueca pela ausência de sintomas associados'
        ],
        diagnosticoDiferencial: [
          'Enxaqueca sem aura',
          'Cefaleia cervicogênica',
          'Cefaleia por uso excessivo de medicamentos',
          'Cefaleias secundárias'
        ],
        examesLaboratoriais: [
          'Não necessários para diagnóstico'
        ],
        citations: [{ refId: 'ichd-3' }]
      },
      tratamento: {
        objetivos: [
          'Aliviar dor',
          'Prevenir cronicidade',
          'Evitar abuso de analgésicos'
        ],
        naoFarmacologico: {
          medidas: [
            'Manejo do estresse',
            'Fisioterapia/correção postural',
            'Exercícios de alongamento',
            'Técnicas de relaxamento',
            'Biofeedback'
          ],
          citations: [{ refId: 'ichd-3' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Analgésicos simples',
              medicamentos: ['Paracetamol', 'Dipirona'],
              posologia: 'Paracetamol 500-1000mg ou Dipirona 500-1000mg. Máx 10 dias/mês.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Profilaxia (se crônica)',
              medicamentos: ['Amitriptilina', 'Nortriptilina'],
              posologia: 'Amitriptilina 10-75mg à noite por 6-12 meses.'
            }
          ],
          situacoesEspeciais: [],
          citations: [{ refId: 'ichd-3' }]
        },
        duracao: 'Agudo: conforme crises. Profilático: 6-12 meses.'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses até controle',
        examesControle: [
          'Diário de cefaleia'
        ],
        metasTerapeuticas: [
          'Redução da frequência',
          'Uso de analgésico <10 dias/mês'
        ],
        criteriosEncaminhamento: [
          'Refratária ao tratamento',
          'Sinais de alarme'
        ],
        citations: [{ refId: 'ichd-3' }]
      },
      prevencao: {
        primaria: [
          'Manejo do estresse',
          'Postura adequada'
        ],
        secundaria: [
          'Profilaxia se frequente',
          'Evitar abuso de analgésicos'
        ],
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['paracetamol', 'dipirona', 'ibuprofeno', 'amitriptilina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ichd-3' }],
    lastUpdate: '2024-12',
    tags: ['cefaleia-tensional', 'tensao', 'estresse', 'dor-cabeca'],
  },
  {
    id: 'acidente-vascular-cerebral',
    titulo: 'Acidente Vascular Cerebral Isquêmico',
    sinonimos: ['AVC', 'AVCi', 'Derrame', 'Stroke', 'Infarto cerebral'],
    doid: 'DOID:3455',
    snomedCT: '422504002',
    meshId: 'D002544',
    umlsCui: 'C0038454',
    ciap2: ['K90'],
    cid10: ['I63', 'I64'],
    cid11: ['8B11'],
    categoria: 'neurologico',
    quickView: {
      definicao: 'Déficit neurológico focal de início súbito causado por isquemia cerebral (oclusão arterial por trombose ou embolia). Emergência médica - "tempo é cérebro". Tratável com trombólise se <4,5h do início.',
      criteriosDiagnosticos: [
        'Déficit neurológico focal de início súbito:',
        'Hemiparesia/hemiplegia',
        'Alteração de fala (afasia, disartria)',
        'Alteração visual (hemianopsia)',
        'Ataxia, vertigem',
        'Alteração sensitiva',
        '',
        'TC de crânio sem contraste: exclui hemorragia, pode mostrar sinais precoces de isquemia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'EMERGÊNCIA: Chamar SAMU (192)',
          'Tempo de início dos sintomas (fundamental!)',
          'Manter via aérea pérvia',
          'Oximetria, monitorização',
          'Glicemia capilar (tratar hipo/hiperglicemia)',
          'Não baixar PA agressivamente (exceto se >220/120)'
        ],
        farmacologico: [
          'TROMBÓLISE IV (se <4,5h do início e sem CI):',
          'Alteplase (rtPA) 0,9 mg/kg (máx 90mg) - 10% bolus + 90% em 1h',
          '',
          'TROMBECTOMIA MECÂNICA: até 24h em casos selecionados (oclusão de grande vaso)',
          '',
          'PREVENÇÃO SECUNDÁRIA:',
          'AAS 100-300mg/dia + Estatina alta potência',
          'Anticoagulação se FA (após 2-14 dias): Apixabana, Rivaroxabana'
        ]
      },
      metasTerapeuticas: [
        'Porta-agulha <60 min (trombólise)',
        'Minimizar déficit neurológico residual',
        'Prevenir complicações (pneumonia, TVP)',
        'Prevenir recorrência'
      ],
      examesIniciais: [
        'TC de crânio sem contraste (IMEDIATA)',
        'Glicemia capilar',
        'ECG (FA?)',
        'TP, TTPa, plaquetas (antes de trombolítico)',
        'Hemograma, eletrólitos, função renal',
        'AngioTC se candidato a trombectomia'
      ],
      redFlags: [
        'ESTES SÃO OS RED FLAGS - AVC É SEMPRE EMERGÊNCIA',
        'Qualquer déficit neurológico súbito = AVC até prova em contrário',
        'FAST: Face (assimetria), Arms (fraqueza braço), Speech (fala arrastada), Time (ligar 192)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-3% da população já teve AVC',
        incidencia: '200-300 casos/100.000 habitantes/ano no Brasil',
        faixaEtaria: 'Aumenta com idade, mas pode ocorrer em jovens',
        fatoresRisco: [
          'Hipertensão arterial (principal - 70% dos AVCs)',
          'Fibrilação atrial (cardioembólico)',
          'Diabetes mellitus',
          'Dislipidemia',
          'Tabagismo',
          'Obesidade',
          'Sedentarismo',
          'AVC prévio ou AIT'
        ],
        citations: [{ refId: 'aha-stroke-2019' }]
      },
      fisiopatologia: {
        texto: 'Oclusão arterial (trombótica ou embólica) causa isquemia do território irrigado. Núcleo isquêmico sofre necrose rapidamente. Penumbra isquêmica é potencialmente salvável com reperfusão precoce. Cascata isquêmica com excitotoxicidade, inflamação e apoptose.',
        citations: [{ refId: 'aha-stroke-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Hemiparesia ou hemiplegia súbita',
          'Alteração de fala (afasia, disartria)',
          'Hemianestesia',
          'Hemianopsia',
          'Confusão mental',
          'Ataxia, vertigem (AVC de fossa posterior)'
        ],
        sinaisExameFisico: [
          'Déficit motor assimétrico',
          'Reflexos alterados (hiperreflexia, Babinski)',
          'Paralisia facial central',
          'Desvio do olhar conjugado',
          'Alteração de sensibilidade',
          'NIHSS para quantificar gravidade'
        ],
        formasClinicas: [
          'AVC isquêmico (85%): territorial, lacunar, hemodinâmico',
          'AVC hemorrágico (15%): hemorragia intraparenquimatosa, HSA',
          'AIT: déficit <24h (geralmente minutos), sem lesão em imagem'
        ],
        citations: [{ refId: 'aha-stroke-2019' }]
      },
      diagnostico: {
        criterios: [
          'Clínico + neuroimagem',
          'TC sem contraste: exclui hemorragia',
          'RM (difusão): mais sensível para isquemia precoce'
        ],
        diagnosticoDiferencial: [
          'Hipoglicemia',
          'Crise epiléptica (paralisia de Todd)',
          'Enxaqueca com aura',
          'Tumor cerebral',
          'Encefalite',
          'Conversão'
        ],
        examesLaboratoriais: [
          'Glicemia (obrigatório antes de trombolítico)',
          'Hemograma, coagulação, função renal',
          'ECG, ecocardiograma',
          'Doppler de carótidas',
          'Holter se suspeita de FA paroxística'
        ],
        citations: [{ refId: 'aha-stroke-2019' }]
      },
      tratamento: {
        objetivos: [
          'Reperfusão precoce',
          'Minimizar lesão cerebral',
          'Prevenir complicações',
          'Reabilitar'
        ],
        naoFarmacologico: {
          medidas: [
            'Unidade de AVC (reduz mortalidade)',
            'Posicionamento (cabeceira 30°)',
            'Prevenção de broncoaspiração',
            'Fisioterapia precoce',
            'Fonoaudiologia (disfagia)',
            'Controle de temperatura e glicemia'
          ],
          citations: [{ refId: 'aha-stroke-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Trombólise IV',
              medicamentos: ['Alteplase'],
              posologia: 'rtPA 0,9 mg/kg (máx 90mg). 10% bolus, 90% em 1h. Janela <4,5h.'
            },
            {
              classe: 'Antiagregante plaquetário',
              medicamentos: ['AAS', 'Clopidogrel'],
              posologia: 'AAS 100-300mg/dia. Se não trombólise: iniciar em 24-48h.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Estatina de alta potência',
              medicamentos: ['Atorvastatina', 'Rosuvastatina'],
              posologia: 'Atorvastatina 40-80mg/dia. Iniciar precocemente.'
            },
            {
              classe: 'Anticoagulante (se FA)',
              medicamentos: ['Apixabana', 'Rivaroxabana', 'Dabigatrana'],
              posologia: 'Iniciar após 2-14 dias (conforme tamanho do AVC). Apixabana 5mg 12/12h.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Oclusão de grande vaso',
              conduta: 'Trombectomia mecânica até 24h (seleção por imagem).'
            },
            {
              situacao: 'AVC hemorrágico',
              conduta: 'Controle de PA, reverter anticoagulação, neurocirurgia se indicado.'
            }
          ],
          citations: [{ refId: 'aha-stroke-2019' }]
        },
        duracao: 'Prevenção secundária: indefinida.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal nos primeiros 3 meses, depois trimestral',
        examesControle: [
          'RM de controle',
          'Doppler de carótidas',
          'Perfil lipídico',
          'HbA1c, PA'
        ],
        metasTerapeuticas: [
          'PA <130/80 mmHg',
          'LDL <70 mg/dL',
          'HbA1c <7%',
          'Ausência de recorrência'
        ],
        criteriosEncaminhamento: [
          'Neurologia para todos',
          'Reabilitação multidisciplinar',
          'Cirurgia vascular se estenose carotídea >70%'
        ],
        citations: [{ refId: 'aha-stroke-2019' }]
      },
      prevencao: {
        primaria: [
          'Controle de HAS, DM, dislipidemia',
          'Cessação do tabagismo',
          'Anticoagulação se FA'
        ],
        secundaria: [
          'Antiagregantes ou anticoagulantes',
          'Estatinas',
          'Controle intensivo de fatores de risco'
        ],
        citations: []
      },
    },
    protocolos: ['nihss', 'avc-agudo'],
    medicamentos: ['alteplase', 'aas', 'clopidogrel', 'atorvastatina', 'apixabana'],
    calculadoras: ['nihss', 'cha2ds2-vasc', 'has-bled'],
    rastreamentos: [],
    citations: [{ refId: 'aha-stroke-2019' }],
    lastUpdate: '2024-12',
    tags: ['avc', 'derrame', 'stroke', 'trombólise', 'emergência'],
  },
  {
    id: 'epilepsia',
    titulo: 'Epilepsia',
    sinonimos: ['Convulsão', 'Crises epilépticas', 'Síndrome epiléptica'],
    doid: 'DOID:1826',
    snomedCT: '84757009',
    meshId: 'D004827',
    umlsCui: 'C0014544',
    ciap2: ['N88'],
    cid10: ['G40', 'G41'],
    cid11: ['8A60'],
    categoria: 'neurologico',
    quickView: {
      definicao: 'Doença cerebral caracterizada por predisposição persistente a gerar crises epilépticas e pelas consequências neurobiológicas, cognitivas, psicológicas e sociais. Diagnóstico: ≥2 crises não provocadas com intervalo >24h, ou 1 crise + risco de recorrência >60%.',
      criteriosDiagnosticos: [
        'DEFINIÇÃO ILAE 2014:',
        '≥2 crises não provocadas (ou reflexas) com intervalo >24h, OU',
        '1 crise não provocada + probabilidade de recorrência ≥60% (ex: lesão estrutural, EEG epileptiforme), OU',
        'Diagnóstico de síndrome epiléptica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educação sobre a doença',
          'Evitar privação de sono e álcool',
          'Segurança (banho com porta aberta, não nadar sozinho)',
          'Restrição para dirigir (conforme legislação)'
        ],
        farmacologico: [
          'CRISES FOCAIS: Carbamazepina 400-1200mg/dia ou Lamotrigina 100-400mg/dia',
          'CRISES GENERALIZADAS: Valproato 500-2000mg/dia (cuidado em mulheres) ou Lamotrigina',
          'IDOSO: Lamotrigina ou Levetiracetam (menos interações)',
          'Iniciar com dose baixa, titular lentamente',
          'Monoterapia sempre que possível'
        ]
      },
      metasTerapeuticas: [
        'Controle total de crises (70% dos pacientes)',
        'Mínimo de efeitos adversos',
        'Manutenção da qualidade de vida',
        'Possibilitar retirada da medicação (casos selecionados)'
      ],
      examesIniciais: [
        'EEG (interictal pode ser normal)',
        'RM de crânio (protocolo para epilepsia)',
        'Exames laboratoriais básicos (eletrólitos, glicemia, função hepática/renal)',
        'ECG (síndrome de QT longo)',
        'Considerar vídeo-EEG se dúvida diagnóstica'
      ],
      redFlags: [
        'Estado de mal epiléptico (crise >5 min ou crises subentrantes)',
        'Primeira crise em adulto (investigar causa)',
        'Crises refratárias (falha ≥2 antiepilépticos)',
        'Déficit neurológico pós-ictal prolongado',
        'Suspeita de lesão estrutural (tumor, AVC)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,5-1% da população',
        incidencia: '50-70 novos casos/100.000 pessoas-ano',
        faixaEtaria: 'Bimodal: infância e >60 anos',
        fatoresRisco: [
          'Lesão cerebral estrutural (AVC, TCE, tumor)',
          'Infecção do SNC (meningite, encefalite)',
          'História familiar de epilepsia',
          'Anomalias do desenvolvimento cortical',
          'Esclerose mesial temporal',
          'Doenças neurodegenerativas'
        ],
        citations: [{ refId: 'ilae-2017' }]
      },
      fisiopatologia: {
        texto: 'Descargas neuronais excessivas e hipersincronizadas resultantes de desequilíbrio entre excitação (glutamato) e inibição (GABA). Pode originar-se de foco cortical (focal) ou envolver ambos hemisférios desde o início (generalizada).',
        citations: [{ refId: 'ilae-2017' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Crises focais: aura, automatismos, alteração de consciência',
          'Crises generalizadas tônico-clônicas: perda de consciência, rigidez, abalos',
          'Ausências: breve perda de consciência, olhar vago',
          'Crises mioclônicas: abalos súbitos breves',
          'Período pós-ictal: confusão, sonolência, cefaleia'
        ],
        sinaisExameFisico: [
          'Exame interictal geralmente normal',
          'Pode haver déficits focais (lesão estrutural)',
          'Mordedura lateral de língua (sugestivo de CTCG)',
          'Incontinência urinária'
        ],
        formasClinicas: [
          'Epilepsia focal (temporal, frontal, etc.)',
          'Epilepsia generalizada genética',
          'Epilepsia combinada focal e generalizada',
          'Síndromes epilépticas (Lennox-Gastaut, West, Dravet, etc.)'
        ],
        citations: [{ refId: 'ilae-2017' }]
      },
      diagnostico: {
        criterios: [
          'Critérios ILAE 2014',
          'EEG (pode ser normal em até 50% no primeiro exame)',
          'RM para investigar etiologia estrutural'
        ],
        diagnosticoDiferencial: [
          'Síncope',
          'Crise psicogênica não epiléptica (CPNE)',
          'Distúrbios do movimento',
          'Enxaqueca com aura',
          'AIT',
          'Parassonias'
        ],
        examesLaboratoriais: [
          'EEG (ictal/interictal)',
          'RM de crânio',
          'Vídeo-EEG (casos duvidosos ou pré-cirúrgicos)',
          'Exames genéticos (síndromes)'
        ],
        citations: [{ refId: 'ilae-2017' }]
      },
      tratamento: {
        objetivos: [
          'Controle total das crises',
          'Minimizar efeitos adversos',
          'Manter qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Educação do paciente e família',
            'Evitar privação de sono',
            'Evitar álcool em excesso',
            'Medidas de segurança',
            'Dieta cetogênica (casos refratários, especialmente pediátricos)'
          ],
          citations: [{ refId: 'ilae-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Crises focais',
              medicamentos: ['Carbamazepina', 'Oxcarbazepina', 'Lamotrigina', 'Levetiracetam'],
              posologia: 'Carbamazepina 400-1200mg/dia. Levetiracetam 500-3000mg/dia.'
            },
            {
              classe: 'Crises generalizadas',
              medicamentos: ['Valproato', 'Lamotrigina', 'Levetiracetam'],
              posologia: 'Valproato 500-2000mg/dia. Evitar em mulheres em idade fértil (teratogênico).'
            }
          ],
          segundaLinha: [
            {
              classe: 'Associação ou troca',
              medicamentos: ['Clobazam', 'Topiramato', 'Lacosamida', 'Perampanel'],
              posologia: 'Adicionar ou substituir conforme resposta. Politerapia racional.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Estado de mal epiléptico',
              conduta: 'Diazepam 10mg IV ou Midazolam 10mg IM. Se refratário: Fenitoína/Fosfenitoína IV.'
            },
            {
              situacao: 'Mulher em idade fértil',
              conduta: 'Evitar Valproato. Preferir Lamotrigina ou Levetiracetam. Suplementar ácido fólico.'
            }
          ],
          citations: [{ refId: 'ilae-2017' }]
        },
        duracao: 'Geralmente por anos. Considerar retirada após 2-5 anos sem crises (casos selecionados).'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: [
          'EEG periódico',
          'Dosagem sérica de antiepilépticos (se disponível)',
          'Função hepática/renal, hemograma'
        ],
        metasTerapeuticas: [
          'Controle de crises',
          'Ausência de efeitos adversos significativos'
        ],
        criteriosEncaminhamento: [
          'Epilepsia refratária (falha ≥2 FAEs)',
          'Candidato a cirurgia de epilepsia',
          'Síndrome epiléptica específica',
          'Mulher que deseja gestar'
        ],
        citations: [{ refId: 'ilae-2017' }]
      },
      prevencao: {
        primaria: [
          'Prevenção de TCE (capacete)',
          'Controle de infecções do SNC',
          'Cuidados perinatais'
        ],
        secundaria: [
          'Adesão ao tratamento',
          'Evitar fatores desencadeantes'
        ],
        citations: []
      },
    },
    protocolos: ['estado-mal-epileptico'],
    medicamentos: ['carbamazepina', 'valproato', 'lamotrigina', 'levetiracetam', 'diazepam'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ilae-2017' }],
    lastUpdate: '2024-12',
    tags: ['epilepsia', 'convulsao', 'crise', 'antiepileptico', 'eeg'],
  },
  {
    id: 'doenca-parkinson',
    titulo: 'Doença de Parkinson',
    sinonimos: ['Parkinson', 'Parkinsonismo idiopático', 'Paralisia agitante'],
    doid: 'DOID:14330',
    snomedCT: '49049000',
    meshId: 'D010300',
    umlsCui: 'C0030567',
    ciap2: ['N87'],
    cid10: ['G20'],
    cid11: ['8A00.0'],
    categoria: 'neurologico',
    quickView: {
      definicao: 'Doença neurodegenerativa progressiva caracterizada por bradicinesia associada a tremor de repouso e/ou rigidez. Resulta da degeneração de neurônios dopaminérgicos da substância negra.',
      criteriosDiagnosticos: [
        'CRITÉRIOS MDS 2015 (essenciais):',
        'Bradicinesia (obrigatória) + Tremor de repouso E/OU Rigidez',
        '',
        'Suporte: Resposta inequívoca à levodopa, tremor de repouso assimétrico, hiposmia',
        'Red flags: Progressão rápida, ausência de resposta à levodopa, sinais cerebelares, paresia do olhar vertical'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fisioterapia (melhora marcha e equilíbrio)',
          'Terapia ocupacional',
          'Fonoaudiologia (fala e deglutição)',
          'Atividade física regular',
          'Suporte psicológico'
        ],
        farmacologico: [
          'PACIENTE JOVEM (<65 anos) ou sintomas leves:',
          'Agonista dopaminérgico: Pramipexol 0,5-4,5mg/dia',
          '',
          'PACIENTE IDOSO (>65-70 anos) ou sintomas moderados/graves:',
          'Levodopa/Carbidopa 250/25mg até 750-1000mg/dia de levodopa',
          '',
          'Sintomas leves podem iniciar com IMAO-B: Selegilina 5-10mg/dia'
        ]
      },
      metasTerapeuticas: [
        'Controle dos sintomas motores',
        'Manutenção da independência funcional',
        'Minimizar complicações motoras (flutuações, discinesias)',
        'Tratar sintomas não motores'
      ],
      examesIniciais: [
        'Diagnóstico clínico (não há exame confirmatório)',
        'RM de crânio (excluir parkinsonismo secundário)',
        'Considerar SPECT com DaTSCAN se dúvida diagnóstica',
        'Excluir parkinsonismo por medicamentos (metoclopramida, haloperidol)'
      ],
      redFlags: [
        'Progressão rápida (meses)',
        'Ausência de resposta à levodopa',
        'Simetria desde o início',
        'Instabilidade postural precoce (<3 anos)',
        'Paresia supranuclear do olhar',
        'Sinais piramidais ou cerebelares',
        'Disautonomia grave precoce'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '150-200/100.000 habitantes',
        incidencia: '10-20/100.000 habitantes-ano',
        faixaEtaria: 'Geralmente >60 anos (jovem se <40 anos)',
        fatoresRisco: [
          'Idade (principal)',
          'História familiar (10-15%)',
          'Sexo masculino (1,5:1)',
          'Exposição a pesticidas',
          'Fatores genéticos (LRRK2, PARK2, SNCA)'
        ],
        citations: [{ refId: 'mds-pd-2015' }]
      },
      fisiopatologia: {
        texto: 'Degeneração de neurônios dopaminérgicos da pars compacta da substância negra, com acúmulo de alfa-sinucleína formando corpos de Lewy. A perda de dopamina no estriado causa desequilíbrio dos circuitos motores dos núcleos da base.',
        citations: [{ refId: 'mds-pd-2015' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Tremor de repouso (4-6 Hz, "contar dinheiro")',
          'Bradicinesia (lentidão, redução de amplitude)',
          'Rigidez (roda denteada)',
          'Instabilidade postural (tardio)',
          'Hipomimia facial',
          'Micrografia'
        ],
        sinaisExameFisico: [
          'Tremor de repouso, assimétrico',
          'Bradicinesia (finger tapping, pronação-supinação)',
          'Rigidez plástica com sinal da roda denteada',
          'Marcha em pequenos passos, festinação',
          'Postura em flexão',
          'Reflexos posturais comprometidos (pull test)'
        ],
        formasClinicas: [
          'Tremor-dominante (melhor prognóstico)',
          'Rígido-acinético (pior prognóstico)',
          'Misto',
          'Parkinson de início jovem (<40 anos)'
        ],
        citations: [{ refId: 'mds-pd-2015' }]
      },
      diagnostico: {
        criterios: [
          'Critérios MDS 2015',
          'Resposta à levodopa suporta diagnóstico',
          'DaTSCAN pode ajudar em dúvidas'
        ],
        diagnosticoDiferencial: [
          'Tremor essencial',
          'Parkinsonismo atípico (PSP, MSA, DCB)',
          'Parkinsonismo medicamentoso',
          'Hidrocefalia de pressão normal',
          'Parkinsonismo vascular'
        ],
        examesLaboratoriais: [
          'Não há exame laboratorial diagnóstico',
          'RM para excluir outras causas',
          'DaTSCAN (SPECT) se dúvida'
        ],
        citations: [{ refId: 'mds-pd-2015' }]
      },
      tratamento: {
        objetivos: [
          'Controlar sintomas',
          'Manter funcionalidade',
          'Retardar complicações motoras',
          'Tratar sintomas não motores'
        ],
        naoFarmacologico: {
          medidas: [
            'Fisioterapia especializada',
            'Exercício físico regular',
            'Terapia ocupacional',
            'Fonoaudiologia',
            'Suporte nutricional'
          ],
          citations: [{ refId: 'mds-pd-2015' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Levodopa',
              medicamentos: ['Levodopa/Carbidopa', 'Levodopa/Benserazida'],
              posologia: 'Iniciar 100/25mg 3x/dia, titular até controle. Mais eficaz para sintomas motores.'
            },
            {
              classe: 'Agonista dopaminérgico',
              medicamentos: ['Pramipexol', 'Ropinirol'],
              posologia: 'Pramipexol: iniciar 0,125mg 3x/dia, titular até 1,5mg 3x/dia. Preferir em jovens.'
            }
          ],
          segundaLinha: [
            {
              classe: 'IMAO-B',
              medicamentos: ['Selegilina', 'Rasagilina'],
              posologia: 'Selegilina 5-10mg/dia. Leve efeito sintomático, possível efeito neuroprotetor.'
            },
            {
              classe: 'Inibidor de COMT',
              medicamentos: ['Entacapona'],
              posologia: 'Entacapona 200mg com cada dose de levodopa. Prolonga efeito.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Flutuações motoras (wearing-off)',
              conduta: 'Fracionar levodopa, adicionar IMAO-B ou COMT, considerar formulações de liberação prolongada.'
            },
            {
              situacao: 'Discinesias',
              conduta: 'Reduzir levodopa, adicionar amantadina. Considerar DBS em refratários.'
            }
          ],
          citations: [{ refId: 'mds-pd-2015' }]
        },
        duracao: 'Tratamento contínuo e progressivo.'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: [
          'Avaliação clínica (UPDRS)',
          'Escalas de qualidade de vida',
          'Avaliação de sintomas não motores'
        ],
        metasTerapeuticas: [
          'Controle de sintomas motores',
          'Independência funcional',
          'Qualidade de vida mantida'
        ],
        criteriosEncaminhamento: [
          'Diagnóstico diferencial difícil',
          'Flutuações motoras refratárias',
          'Candidato a DBS (estimulação cerebral profunda)',
          'Sintomas não motores de difícil manejo'
        ],
        citations: [{ refId: 'mds-pd-2015' }]
      },
      prevencao: {
        primaria: [
          'Não há prevenção estabelecida',
          'Atividade física pode ser protetora'
        ],
        secundaria: [
          'Tratamento otimizado',
          'Reabilitação contínua'
        ],
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['levodopa', 'carbidopa', 'pramipexol', 'selegilina', 'entacapona'],
    calculadoras: ['updrs'],
    rastreamentos: [],
    citations: [{ refId: 'mds-pd-2015' }],
    lastUpdate: '2024-12',
    tags: ['parkinson', 'tremor', 'bradicinesia', 'levodopa', 'degenerativo'],
  }
];

