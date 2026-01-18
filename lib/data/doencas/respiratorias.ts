/**
 * DOENÇAS RESPIRATÓRIAS - DARWIN-MFC
 * ===================================
 */

import { Doenca } from '../../types/doenca';

export const doencasRespiratorias: Doenca[] = [
  {
    id: 'dpoc',
    titulo: 'Doença Pulmonar Obstrutiva Crônica',
    sinonimos: ['DPOC', 'Enfisema', 'Bronquite crônica'],
    doid: 'DOID:3083',
    snomedCT: '13645005',
    meshId: 'D029424',
    umlsCui: 'C0024117',
    ciap2: ['R95'],
    cid10: ['J44', 'J44.0', 'J44.1', 'J44.9'],
    cid11: ['CA22'],
    // LOINC codes for COPD assessment and monitoring
    loinc: [
      // Blood gases and oxygenation
      { code: '2019-8', name: 'Carbon dioxide [Partial pressure] in Arterial blood' },
      { code: '2703-7', name: 'Oxygen [Partial pressure] in Arterial blood' },
      { code: '2744-1', name: 'pH of Arterial blood' },
      { code: '1960-4', name: 'Bicarbonate [Moles/volume] in Arterial blood' },
      { code: '2708-6', name: 'Oxygen saturation in Arterial blood' },
      { code: '59408-5', name: 'Oxygen saturation in Arterial blood by Pulse oximetry' },
      { code: '19218-7', name: 'Carboxyhemoglobin/Hemoglobin.total in Arterial blood' },
      // Complete blood count
      { code: '58410-2', name: 'CBC panel - Blood by Automated count' },
      { code: '718-7', name: 'Hemoglobin [Mass/volume] in Blood' },
      { code: '4544-3', name: 'Hematocrit [Volume fraction] of Blood' },
      { code: '789-8', name: 'Erythrocytes [#/volume] in Blood by Automated count' },
      { code: '6690-2', name: 'Leukocytes [#/volume] in Blood by Automated count' },
      { code: '751-8', name: 'Neutrophils [#/volume] in Blood by Automated count' },
      // Inflammatory markers
      { code: '1988-5', name: 'C reactive protein [Mass/volume] in Serum or Plasma' },
      { code: '33959-8', name: 'Procalcitonin [Mass/volume] in Serum or Plasma' },
      { code: '4537-7', name: 'Erythrocyte sedimentation rate' },
      // Cardiac biomarkers (cor pulmonale screening)
      { code: '33762-6', name: 'NT-proBNP [Mass/volume] in Serum or Plasma' },
      { code: '30934-4', name: 'BNP [Mass/volume] in Blood' },
      // Metabolic panel
      { code: '2093-3', name: 'Cholesterol [Mass/volume] in Serum or Plasma' },
      { code: '4548-4', name: 'Hemoglobin A1c/Hemoglobin.total in Blood' },
      { code: '3016-3', name: 'Thyrotropin [Units/volume] in Serum or Plasma' },
      // Alpha-1 antitrypsin (genetic screening)
      { code: '6768-6', name: 'Alpha-1-Antitrypsin [Mass/volume] in Serum or Plasma' },
      { code: '49765-1', name: 'Alpha-1-Antitrypsin phenotype' },
      // Theophylline monitoring
      { code: '4049-3', name: 'Theophylline [Mass/volume] in Serum or Plasma' },
      // Sputum culture
      { code: '624-7', name: 'Bacteria identified in Sputum by Culture' },
      { code: '6460-0', name: 'Bacteria identified in Sputum by Respiratory culture' },
    ],
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Doença respiratória crônica prevenível e tratável, caracterizada por limitação persistente ao fluxo aéreo, geralmente progressiva e associada a resposta inflamatória crônica das vias aéreas e pulmões a partículas ou gases nocivos.',
      criteriosDiagnosticos: [
        'Dispneia persistente e progressiva',
        'Tosse crônica com ou sem expectoração',
        'História de exposição a fatores de risco (tabagismo)',
        'Espirometria pós-BD: VEF1/CVF <0,70'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cessação do tabagismo (essencial)',
          'Vacinação (influenza anual, pneumococo)',
          'Reabilitação pulmonar',
          'Atividade física regular',
          'Oxigenoterapia domiciliar se indicada'
        ],
        farmacologico: [
          'GOLD A-B: Broncodilatador de curta ou longa duração',
          'LABA ou LAMA (Tiotrópio 18mcg/dia ou Formoterol)',
          'GOLD C-D: LABA + LAMA ou LABA + CI',
          'CI se eosinófilos >300 ou história de asma'
        ]
      },
      metasTerapeuticas: [
        'Reduzir sintomas (mMRC <2, CAT <10)',
        'Prevenir exacerbações',
        'Melhorar capacidade de exercício',
        'Retardar progressão da doença',
        'Reduzir mortalidade'
      ],
      examesIniciais: [
        'Espirometria com prova broncodilatadora',
        'Radiografia de tórax',
        'Oximetria de pulso',
        'Gasometria se SpO2 <92%',
        'Hemograma (policitemia)',
        'Alfa-1 antitripsina se <45 anos ou história familiar'
      ],
      redFlags: [
        'Exacerbação grave (dispneia intensa, taquipneia >25)',
        'Alteração do nível de consciência',
        'SpO2 <88% ou cianose',
        'Uso de musculatura acessória',
        'Edema de MMII (cor pulmonale)',
        'Febre alta (infecção grave)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-15% dos adultos >40 anos, maior em tabagistas',
        incidencia: 'Terceira causa de morte no mundo',
        faixaEtaria: 'Geralmente >40 anos',
        fatoresRisco: [
          'Tabagismo (90% dos casos)',
          'Exposição ocupacional (poeiras, químicos)',
          'Poluição do ar',
          'Deficiência de alfa-1 antitripsina',
          'Infecções respiratórias na infância',
          'Biomassa (fogão a lenha)'
        ],
        citations: [
          { refId: 'gold-2024', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'torch-trial-copd', evidenceLevel: 'A', studyType: 'RCT' }
        ]
      },
      fisiopatologia: {
        texto: 'Inflamação crônica das vias aéreas e parênquima pulmonar induzida por inalação de partículas nocivas, principalmente fumaça de cigarro. Resulta em bronquite crônica (hipersecreção de muco) e/ou enfisema (destruição alveolar), levando a limitação fixa ao fluxo aéreo.',
        citations: [
          { refId: 'gold-2024', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'copd-pathophysiology-review', evidenceLevel: 'A', studyType: 'SystematicReview' }
        ]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dispneia progressiva (inicialmente aos grandes esforços)',
          'Tosse crônica, geralmente matinal',
          'Expectoração crônica (mucosa ou purulenta)',
          'Sibilância',
          'Sensação de aperto no peito',
          'Fadiga e intolerância ao exercício'
        ],
        sinaisExameFisico: [
          'Tórax em tonel (hiperinsuflação)',
          'Uso de musculatura acessória',
          'Expiração prolongada',
          'Diminuição do murmúrio vesicular',
          'Sibilos e roncos',
          'Cianose (casos avançados)'
        ],
        formasClinicas: [
          'Fenótipo enfisematoso (pink puffer): magro, dispneia intensa',
          'Fenótipo bronquítico (blue bloater): cianose, edema, tosse produtiva',
          'Sobreposição asma-DPOC (ACO)'
        ],
        citations: [
          { refId: 'gold-2024', evidenceLevel: 'A', studyType: 'Guideline' }
        ]
      },
      diagnostico: {
        criterios: [
          'Clínica compatível + fatores de risco',
          'Espirometria pós-BD: VEF1/CVF <0,70',
          'Classificação GOLD (VEF1% previsto)'
        ],
        diagnosticoDiferencial: [
          'Asma',
          'Bronquiectasias',
          'Tuberculose',
          'Insuficiência cardíaca',
          'Câncer de pulmão',
          'Fibrose pulmonar'
        ],
        examesLaboratoriais: [
          'Espirometria com prova broncodilatadora',
          'Gasometria arterial (se SpO2 <92%)',
          'Hemograma',
          'Alfa-1 antitripsina (se indicado)',
          'TC de tórax (casos selecionados)'
        ],
        citations: [
          { refId: 'gold-2024', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'spirometry-copd-diagnosis', evidenceLevel: 'A', studyType: 'SystematicReview' }
        ]
      },
      tratamento: {
        objetivos: [
          'Aliviar sintomas',
          'Prevenir exacerbações',
          'Melhorar tolerância ao exercício e qualidade de vida',
          'Prevenir progressão',
          'Reduzir mortalidade'
        ],
        naoFarmacologico: {
          medidas: [
            'Cessação do tabagismo (mais efetivo)',
            'Vacinação anual (influenza) e pneumococo',
            'Reabilitação pulmonar',
            'Oxigenoterapia se PaO2 ≤55 ou SpO2 ≤88%',
            'Suporte nutricional se baixo peso'
          ],
          citations: [
            { refId: 'gold-2024', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'pulmonary-rehab-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'smoking-cessation-copd', evidenceLevel: 'A', studyType: 'RCT' }
          ]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'LAMA',
              medicamentos: ['Tiotrópio', 'Glicopirrônio'],
              posologia: 'Tiotrópio 18mcg 1x/dia inalatório'
            },
            {
              classe: 'LABA',
              medicamentos: ['Formoterol', 'Salmeterol', 'Indacaterol'],
              posologia: 'Formoterol 12mcg 12/12h inalatório'
            },
            {
              classe: 'LABA + LAMA (se persistir sintomas)',
              medicamentos: ['Tiotrópio + Formoterol'],
              posologia: 'Combinação em dispositivo único ou separado'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Exacerbador frequente (≥2/ano)',
              conduta: 'Considerar adicionar CI se eosinófilos ≥300'
            },
            {
              situacao: 'Sobreposição asma-DPOC',
              conduta: 'LABA + CI, não usar LABA isolado'
            }
          ],
          citations: [
            { refId: 'gold-2024', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'uplift-trial', evidenceLevel: 'A', studyType: 'RCT' },
            { refId: 'torch-trial-copd', evidenceLevel: 'A', studyType: 'RCT' },
            { refId: 'lama-laba-meta-analysis', evidenceLevel: 'A', studyType: 'SystematicReview' }
          ]
        },
        duracao: 'Tratamento contínuo'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses, ou mais frequente se instável',
        examesControle: [
          'Espirometria anual',
          'Oximetria a cada consulta',
          'Avaliação de sintomas (mMRC, CAT)'
        ],
        metasTerapeuticas: [
          'mMRC 0-1, CAT <10',
          '0-1 exacerbação/ano',
          'Manutenção da capacidade funcional'
        ],
        criteriosEncaminhamento: [
          'DPOC grave (GOLD 3-4)',
          'Exacerbações frequentes apesar do tratamento',
          'Candidato a oxigenoterapia domiciliar',
          'Avaliação para cirurgia redutora ou transplante'
        ],
        citations: [
          { refId: 'gold-2024', evidenceLevel: 'A', studyType: 'Guideline' }
        ]
      },
      prevencao: {
        primaria: [
          'Não iniciar tabagismo',
          'Proteção ocupacional',
          'Redução da poluição ambiental'
        ],
        secundaria: [
          'Cessação do tabagismo',
          'Vacinação',
          'Tratamento precoce'
        ],
        citations: [
          { refId: 'gold-2024', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'copd-prevention-strategies', evidenceLevel: 'B', studyType: 'Cohort' }
        ]
      },
    },
    protocolos: ['protocolo-dpoc'],
    medicamentos: ['tiotropio', 'formoterol', 'salbutamol', 'beclometasona'],
    calculadoras: ['gold-copd', 'bode-index'],
    rastreamentos: [],
    citations: [
      { refId: 'gold-2024', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'torch-trial-copd', evidenceLevel: 'A', studyType: 'RCT' },
      { refId: 'uplift-trial', evidenceLevel: 'A', studyType: 'RCT' }
    ],
    lastUpdate: '2024-12',
    tags: ['dpoc', 'enfisema', 'bronquite', 'tabagismo', 'dispneia'],
  },
  {
    id: 'pneumonia-comunitaria',
    titulo: 'Pneumonia Adquirida na Comunidade',
    sinonimos: ['PAC', 'Pneumonia comunitária', 'Pneumonia'],
    doid: 'DOID:552',
    snomedCT: '385093006',
    meshId: 'D018410',
    umlsCui: 'C0694549',
    ciap2: ['R81'],
    cid10: ['J18', 'J15', 'J13', 'J14'],
    cid11: ['CA40'],
    // LOINC codes for community-acquired pneumonia
    loinc: [
      // Complete blood count
      { code: '58410-2', name: 'CBC panel - Blood by Automated count' },
      { code: '6690-2', name: 'Leukocytes [#/volume] in Blood by Automated count' },
      { code: '751-8', name: 'Neutrophils [#/volume] in Blood by Automated count' },
      { code: '718-7', name: 'Hemoglobin [Mass/volume] in Blood' },
      { code: '4544-3', name: 'Hematocrit [Volume fraction] of Blood' },
      { code: '777-3', name: 'Platelets [#/volume] in Blood by Automated count' },
      // Inflammatory markers
      { code: '1988-5', name: 'C reactive protein [Mass/volume] in Serum or Plasma' },
      { code: '33959-8', name: 'Procalcitonin [Mass/volume] in Serum or Plasma' },
      { code: '4537-7', name: 'Erythrocyte sedimentation rate' },
      // Blood gases and oxygenation
      { code: '2019-8', name: 'Carbon dioxide [Partial pressure] in Arterial blood' },
      { code: '2703-7', name: 'Oxygen [Partial pressure] in Arterial blood' },
      { code: '2744-1', name: 'pH of Arterial blood' },
      { code: '1960-4', name: 'Bicarbonate [Moles/volume] in Arterial blood' },
      { code: '2708-6', name: 'Oxygen saturation in Arterial blood' },
      { code: '59408-5', name: 'Oxygen saturation in Arterial blood by Pulse oximetry' },
      // Metabolic panel (CURB-65 assessment)
      { code: '2160-0', name: 'Creatinine [Mass/volume] in Serum or Plasma' },
      { code: '3094-0', name: 'Urea nitrogen [Mass/volume] in Serum or Plasma' },
      { code: '2951-2', name: 'Sodium [Moles/volume] in Serum or Plasma' },
      { code: '2823-3', name: 'Potassium [Moles/volume] in Serum or Plasma' },
      { code: '1558-6', name: 'Fasting glucose [Mass/volume] in Serum or Plasma' },
      // Microbiology
      { code: '600-7', name: 'Bacteria identified in Blood by Culture' },
      { code: '624-7', name: 'Bacteria identified in Sputum by Culture' },
      { code: '6460-0', name: 'Bacteria identified in Sputum by Respiratory culture' },
      // Urinary antigen tests
      { code: '6600-1', name: 'Streptococcus pneumoniae Ag [Presence] in Urine' },
      { code: '24028-3', name: 'Legionella pneumophila Ag [Presence] in Urine' },
      // Cardiac biomarker (dyspnea workup)
      { code: '33762-6', name: 'NT-proBNP [Mass/volume] in Serum or Plasma' },
      // Lactate (sepsis marker)
      { code: '2524-7', name: 'Lactate [Moles/volume] in Serum or Plasma' },
    ],
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Infecção aguda do parênquima pulmonar adquirida fora do ambiente hospitalar, caracterizada por sintomas respiratórios agudos e infiltrado pulmonar novo à radiografia.',
      criteriosDiagnosticos: [
        'Sintomas agudos: tosse, expectoração, febre, dispneia, dor torácica pleurítica',
        'Sinais: taquipneia, estertores, sopro tubário',
        'Infiltrado novo à radiografia de tórax',
        'Ausência de hospitalização recente (>48h nos últimos 90 dias)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação adequada',
          'Repouso relativo',
          'Antitérmicos se febre',
          'Monitorização de SpO2'
        ],
        farmacologico: [
          'PAC leve (ambulatorial): Amoxicilina 500mg 8/8h VO x 5-7 dias',
          'Ou Azitromicina 500mg/dia x 3-5 dias (se alergia a penicilina)',
          'PAC moderada: Amoxicilina-clavulanato + Macrolídeo ou Quinolona respiratória',
          'Duração: 5-7 dias (mínimo 5 dias, afebril por 48-72h)'
        ]
      },
      metasTerapeuticas: [
        'Resolução dos sintomas em 48-72h',
        'Defervescência em 48-72h',
        'Melhora radiológica (pode levar semanas)',
        'SpO2 >90%'
      ],
      examesIniciais: [
        'Radiografia de tórax (PA e perfil)',
        'Oximetria de pulso',
        'Hemograma, PCR',
        'Função renal se moderada/grave',
        'Gasometria se SpO2 <92%'
      ],
      redFlags: [
        'SpO2 <90% em ar ambiente',
        'Hipotensão (PAS <90)',
        'Confusão mental',
        'FR >30 irpm',
        'Ureia >50 mg/dL',
        'Derrame pleural volumoso',
        'Infiltrado multilobar'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Causa comum de consulta e internação',
        incidencia: '5-11 casos/1000 habitantes/ano',
        faixaEtaria: 'Todas as idades, mais grave em idosos e crianças',
        fatoresRisco: [
          'Idade >65 anos',
          'DPOC, asma',
          'Insuficiência cardíaca',
          'Diabetes mellitus',
          'Imunossupressão',
          'Tabagismo, alcoolismo',
          'Institucionalização'
        ],
        citations: [
          { refId: 'sbpt-pac-2022', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'idsa-ats-cap-2019', evidenceLevel: 'A', studyType: 'Guideline' }
        ]
      },
      fisiopatologia: {
        texto: 'Infecção do parênquima pulmonar por microorganismos (bactérias, vírus, fungos). Os mais comuns são Streptococcus pneumoniae, Haemophilus influenzae, Mycoplasma pneumoniae e vírus respiratórios. A resposta inflamatória causa consolidação alveolar e comprometimento das trocas gasosas.',
        citations: [
          { refId: 'sbpt-pac-2022', evidenceLevel: 'A', studyType: 'Guideline' }
        ]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Tosse (geralmente produtiva)',
          'Febre (pode estar ausente em idosos)',
          'Dispneia',
          'Dor torácica pleurítica',
          'Calafrios',
          'Mal-estar geral'
        ],
        sinaisExameFisico: [
          'Taquipneia (FR >20)',
          'Febre',
          'Estertores crepitantes',
          'Sopro tubário (consolidação)',
          'Macicez à percussão',
          'Aumento do frêmito toracovocal'
        ],
        formasClinicas: [
          'PAC típica: início agudo, febre alta, tosse produtiva',
          'PAC atípica: início insidioso, tosse seca, manifestações extrapulmonares'
        ],
        citations: [
          { refId: 'sbpt-pac-2022', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'cap-clinical-features-review', evidenceLevel: 'B', studyType: 'SystematicReview' }
        ]
      },
      diagnostico: {
        criterios: [
          'Quadro clínico compatível',
          'Infiltrado novo à radiografia de tórax',
          'Exclusão de outras causas'
        ],
        diagnosticoDiferencial: [
          'Bronquite aguda',
          'Exacerbação de DPOC/asma',
          'Insuficiência cardíaca',
          'TEP',
          'Tuberculose',
          'Câncer de pulmão'
        ],
        examesLaboratoriais: [
          'Radiografia de tórax',
          'Hemograma',
          'PCR ou procalcitonina',
          'Ureia, creatinina',
          'Hemocultura (se internação)',
          'Pesquisa de antígeno urinário (pneumococo, legionella) se grave'
        ],
        citations: [
          { refId: 'sbpt-pac-2022', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'idsa-ats-cap-2019', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'procalcitonin-cap-meta', evidenceLevel: 'A', studyType: 'SystematicReview' }
        ]
      },
      tratamento: {
        objetivos: [
          'Erradicação do patógeno',
          'Resolução dos sintomas',
          'Prevenção de complicações',
          'Evitar resistência antimicrobiana'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratação',
            'Repouso',
            'Oxigenoterapia se SpO2 <90%',
            'Analgésicos/antitérmicos'
          ],
          citations: [
            { refId: 'sbpt-pac-2022', evidenceLevel: 'A', studyType: 'Guideline' }
          ]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Betalactâmico',
              medicamentos: ['Amoxicilina', 'Amoxicilina-clavulanato'],
              posologia: 'Amoxicilina 500mg 8/8h VO x 5-7 dias'
            },
            {
              classe: 'Macrolídeo (alternativa ou associação)',
              medicamentos: ['Azitromicina', 'Claritromicina'],
              posologia: 'Azitromicina 500mg/dia x 3-5 dias'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Alergia a penicilina',
              conduta: 'Azitromicina ou Quinolona respiratória (Levofloxacino)'
            },
            {
              situacao: 'PAC grave (internação)',
              conduta: 'Amoxicilina-clavulanato IV + Azitromicina ou Quinolona IV'
            }
          ],
          citations: [
            { refId: 'sbpt-pac-2022', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'idsa-ats-cap-2019', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'cap-antibiotic-duration-rct', evidenceLevel: 'A', studyType: 'RCT' }
          ]
        },
        duracao: '5-7 dias (mínimo 5 dias, afebril por 48-72h antes de suspender)'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno em 48-72h se ambulatorial',
        examesControle: [
          'Radiografia de controle em 4-6 semanas (se >50 anos ou tabagista)',
          'Reavaliação clínica se não melhorar em 48-72h'
        ],
        metasTerapeuticas: [
          'Defervescência em 48-72h',
          'Melhora dos sintomas respiratórios'
        ],
        criteriosEncaminhamento: [
          'CURB-65 ≥2 (considerar internação)',
          'SpO2 <90%',
          'Complicações (derrame pleural, abscesso)',
          'Falha do tratamento ambulatorial'
        ],
        citations: [
          { refId: 'sbpt-pac-2022', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'curb65-validation-study', evidenceLevel: 'A', studyType: 'Cohort' }
        ]
      },
      prevencao: {
        primaria: [
          'Vacinação pneumocócica (>65 anos e grupos de risco)',
          'Vacinação influenza anual',
          'Cessação do tabagismo'
        ],
        secundaria: [
          'Tratamento adequado de infecções respiratórias',
          'Vacinação pós-PAC'
        ],
        citations: [
          { refId: 'sbpt-pac-2022', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'pneumococcal-vaccine-efficacy', evidenceLevel: 'A', studyType: 'RCT' }
        ]
      },
    },
    protocolos: ['protocolo-pac'],
    medicamentos: ['amoxicilina', 'azitromicina', 'levofloxacino'],
    calculadoras: ['curb-65', 'psi-port'],
    rastreamentos: [],
    citations: [
      { refId: 'sbpt-pac-2022', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'idsa-ats-cap-2019', evidenceLevel: 'A', studyType: 'Guideline' }
    ],
    lastUpdate: '2024-12',
    tags: ['pneumonia', 'pac', 'infeccao-respiratoria', 'tosse', 'febre'],
  },
  {
    id: 'rinite-alergica',
    titulo: 'Rinite Alérgica',
    sinonimos: ['Rinite', 'Alergia nasal', 'Febre do feno'],
    doid: 'DOID:4481',
    snomedCT: '61582004',
    meshId: 'D012221',
    umlsCui: 'C0035457',
    ciap2: ['R97'],
    cid10: ['J30', 'J30.1', 'J30.4'],
    cid11: ['CA08'],
    // LOINC codes for allergic rhinitis evaluation
    loinc: [
      // Total and specific IgE - allergy testing
      { code: '2579-1', name: 'IgE [Units/volume] in Serum or Plasma' },
      { code: '6095-4', name: 'Allergen specific IgE Ab panel - Serum' },
      { code: '6833-8', name: 'Allergen specific IgE Ab [Units/volume] in Serum or Plasma' },
      // Common aeroallergen-specific IgE (dust mites, pet dander, pollens, molds)
      { code: '6844-5', name: 'Dermatophagoides pteronyssinus IgE Ab [Units/volume] in Serum' },
      { code: '6843-7', name: 'Dermatophagoides farinae IgE Ab [Units/volume] in Serum' },
      { code: '6085-5', name: 'Cat dander IgE Ab [Units/volume] in Serum' },
      { code: '6098-8', name: 'Dog dander IgE Ab [Units/volume] in Serum' },
      { code: '6106-9', name: 'Grass pollen IgE Ab [Units/volume] in Serum' },
      { code: '6273-7', name: 'Tree pollen mix IgE Ab [Units/volume] in Serum' },
      { code: '6261-2', name: 'Alternaria alternata IgE Ab [Units/volume] in Serum' },
      { code: '6082-2', name: 'Aspergillus fumigatus IgE Ab [Units/volume] in Serum' },
      { code: '6094-7', name: 'Cockroach IgE Ab [Units/volume] in Serum' },
      // Nasal cytology and secretions
      { code: '20568-0', name: 'Eosinophils/100 leukocytes in Nasal fluid' },
      { code: '19077-7', name: 'Eosinophils [#/volume] in Nasal fluid' },
      // Complete blood count with differential (eosinophilia evaluation)
      { code: '58410-2', name: 'CBC panel - Blood by Automated count' },
      { code: '6690-2', name: 'Leukocytes [#/volume] in Blood by Automated count' },
      { code: '713-8', name: 'Eosinophils [#/volume] in Blood by Automated count' },
      { code: '714-6', name: 'Eosinophils/100 leukocytes in Blood by Automated count' },
      { code: '718-7', name: 'Hemoglobin [Mass/volume] in Blood' },
      { code: '4544-3', name: 'Hematocrit [Volume fraction] of Blood' },
      { code: '751-8', name: 'Neutrophils [#/volume] in Blood by Automated count' },
      { code: '731-0', name: 'Lymphocytes [#/volume] in Blood by Automated count' },
      { code: '742-7', name: 'Monocytes [#/volume] in Blood by Automated count' },
      { code: '704-7', name: 'Basophils [#/volume] in Blood by Automated count' },
      // Inflammatory markers (rule out infection, assess severity)
      { code: '1988-5', name: 'C reactive protein [Mass/volume] in Serum or Plasma' },
      { code: '4537-7', name: 'Erythrocyte sedimentation rate' },
    ],
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Inflamação da mucosa nasal mediada por IgE, caracterizada por sintomas nasais (espirros, prurido, coriza e obstrução) após exposição a alérgenos.',
      criteriosDiagnosticos: [
        'Sintomas: espirros em salva, prurido nasal, rinorreia aquosa, obstrução nasal',
        'História de atopia pessoal ou familiar',
        'Relação com exposição a alérgenos (ácaros, pólen, pelos)',
        'Melhora com afastamento do alérgeno ou anti-histamínicos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Controle ambiental (capas antiácaro, remover carpetes)',
          'Lavagem nasal com solução salina',
          'Evitar alérgenos conhecidos',
          'Higiene adequada do ambiente'
        ],
        farmacologico: [
          'Anti-histamínico oral: Loratadina 10mg/dia ou Cetirizina 10mg/dia',
          'Corticoide nasal: Budesonida ou Fluticasona spray nasal 1-2 jatos/narina/dia',
          'Casos leves: anti-histamínico isolado',
          'Moderada/grave: corticoide nasal ± anti-histamínico'
        ]
      },
      metasTerapeuticas: [
        'Controle dos sintomas nasais',
        'Melhora da qualidade de vida e sono',
        'Prevenção de complicações (sinusite, otite)',
        'Redução do uso de medicação de resgate'
      ],
      examesIniciais: [
        'Diagnóstico clínico na maioria dos casos',
        'Rinoscopia anterior',
        'Teste cutâneo (prick test) ou IgE específica se dúvida diagnóstica',
        'Nasofibroscopia se suspeita de pólipos ou desvio de septo'
      ],
      redFlags: [
        'Sintomas unilaterais (pensar em tumor, corpo estranho)',
        'Epistaxe recorrente',
        'Anosmia persistente',
        'Cefaleias intensas',
        'Alterações visuais',
        'Rinorreia purulenta (sinusite)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-30% da população',
        incidencia: 'Uma das doenças crônicas mais comuns',
        faixaEtaria: 'Início geralmente na infância/adolescência',
        fatoresRisco: [
          'História familiar de atopia',
          'Atopia pessoal (asma, dermatite atópica)',
          'Exposição precoce a alérgenos',
          'Tabagismo passivo na infância'
        ],
        citations: [
          { refId: 'aria-2020', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'allergic-rhinitis-epidemiology', evidenceLevel: 'B', studyType: 'Cohort' }
        ]
      },
      fisiopatologia: {
        texto: 'Reação de hipersensibilidade tipo I mediada por IgE. Após sensibilização, a reexposição ao alérgeno desencadeia degranulação de mastócitos e liberação de histamina, leucotrienos e citocinas, causando os sintomas.',
        citations: [
          { refId: 'aria-2020', evidenceLevel: 'A', studyType: 'Guideline' }
        ]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Espirros em salva',
          'Prurido nasal intenso',
          'Rinorreia aquosa',
          'Obstrução nasal alternante',
          'Prurido ocular, lacrimejamento',
          'Hiposmia'
        ],
        sinaisExameFisico: [
          'Mucosa nasal pálida e edemaciada',
          'Cornetos hipertrofiados',
          'Secreção aquosa',
          'Linha de Dennie-Morgan',
          'Saudação alérgica (prega nasal)'
        ],
        formasClinicas: [
          'Intermitente: <4 dias/semana ou <4 semanas',
          'Persistente: ≥4 dias/semana e ≥4 semanas',
          'Leve: sintomas não afetam sono nem atividades',
          'Moderada/grave: sintomas afetam qualidade de vida'
        ],
        citations: [
          { refId: 'aria-2020', evidenceLevel: 'A', studyType: 'Guideline' }
        ]
      },
      diagnostico: {
        criterios: [
          'História clínica típica',
          'Relação com exposição a alérgenos',
          'Resposta a anti-histamínicos'
        ],
        diagnosticoDiferencial: [
          'Rinite não alérgica (vasomotora)',
          'Rinite medicamentosa',
          'Rinossinusite crônica',
          'Desvio de septo',
          'Pólipos nasais',
          'Corpo estranho nasal'
        ],
        examesLaboratoriais: [
          'Teste cutâneo (prick test) - padrão-ouro',
          'IgE específica sérica',
          'IgE total (pode estar elevada)',
          'Citologia nasal (eosinofilia)'
        ],
        citations: [
          { refId: 'aria-2020', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'skin-prick-test-accuracy', evidenceLevel: 'A', studyType: 'SystematicReview' }
        ]
      },
      tratamento: {
        objetivos: [
          'Controle dos sintomas',
          'Prevenção de exacerbações',
          'Melhora da qualidade de vida',
          'Prevenção de complicações'
        ],
        naoFarmacologico: {
          medidas: [
            'Controle ambiental (capas antiácaro, limpeza frequente)',
            'Lavagem nasal com soro fisiológico',
            'Evitar alérgenos identificados',
            'Imunoterapia específica (casos selecionados)'
          ],
          citations: [
            { refId: 'aria-2020', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'nasal-saline-irrigation-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' }
          ]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Anti-histamínico H1 2ª geração',
              medicamentos: ['Loratadina', 'Cetirizina', 'Fexofenadina'],
              posologia: 'Loratadina 10mg/dia ou Cetirizina 10mg/dia'
            },
            {
              classe: 'Corticoide nasal',
              medicamentos: ['Budesonida', 'Fluticasona', 'Mometasona'],
              posologia: 'Budesonida 64-128mcg/narina/dia'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Sintomas oculares proeminentes',
              conduta: 'Adicionar colírio anti-histamínico (Olopatadina)'
            },
            {
              situacao: 'Obstrução nasal grave',
              conduta: 'Corticoide nasal é mais efetivo que anti-histamínico'
            }
          ],
          citations: [
            { refId: 'aria-2020', evidenceLevel: 'A', studyType: 'Guideline' },
            { refId: 'intranasal-corticosteroids-meta', evidenceLevel: 'A', studyType: 'SystematicReview' },
            { refId: 'antihistamines-allergic-rhinitis-rct', evidenceLevel: 'A', studyType: 'RCT' }
          ]
        },
        duracao: 'Conforme necessidade, corticoide nasal pode ser contínuo se persistente'
      },
      acompanhamento: {
        frequenciaConsultas: 'Conforme controle dos sintomas',
        examesControle: [
          'Reavaliação clínica',
          'Ajuste de tratamento conforme classificação'
        ],
        metasTerapeuticas: [
          'Sintomas controlados',
          'Sono e atividades normais'
        ],
        criteriosEncaminhamento: [
          'Refratário ao tratamento clínico',
          'Candidato a imunoterapia',
          'Suspeita de complicações (pólipos, sinusite crônica)',
          'Sintomas atípicos ou unilaterais'
        ],
        citations: [
          { refId: 'aria-2020', evidenceLevel: 'A', studyType: 'Guideline' }
        ]
      },
      prevencao: {
        primaria: [
          'Controle ambiental precoce em famílias atópicas',
          'Aleitamento materno'
        ],
        secundaria: [
          'Controle ambiental',
          'Imunoterapia específica'
        ],
        citations: [
          { refId: 'aria-2020', evidenceLevel: 'A', studyType: 'Guideline' },
          { refId: 'allergen-immunotherapy-cochrane', evidenceLevel: 'A', studyType: 'SystematicReview' }
        ]
      },
    },
    protocolos: [],
    medicamentos: ['loratadina', 'cetirizina', 'budesonida-nasal'],
    calculadoras: [],
    rastreamentos: [],
    citations: [
      { refId: 'aria-2020', evidenceLevel: 'A', studyType: 'Guideline' },
      { refId: 'intranasal-corticosteroids-meta', evidenceLevel: 'A', studyType: 'SystematicReview' }
    ],
    lastUpdate: '2024-12',
    tags: ['rinite', 'alergia', 'espirros', 'coriza', 'anti-histaminico'],
  },
  {
    id: 'asma',
    titulo: 'Asma Brônquica',
    sinonimos: ['Asma', 'Bronquite asmática', 'Hiper-reatividade brônquica'],
    doid: 'DOID:2841',
    snomedCT: '195967001',
    meshId: 'D001249',
    umlsCui: 'C0004096',
    ciap2: ['R96'],
    cid10: ['J45', 'J45.0', 'J45.1', 'J45.8', 'J45.9'],
    cid11: ['CA23'],
    // LOINC codes for asthma assessment and monitoring
    loinc: [
      // Blood gases and oxygenation
      { code: '2019-8', name: 'Carbon dioxide [Partial pressure] in Arterial blood' },
      { code: '2703-7', name: 'Oxygen [Partial pressure] in Arterial blood' },
      { code: '2744-1', name: 'pH of Arterial blood' },
      { code: '1960-4', name: 'Bicarbonate [Moles/volume] in Arterial blood' },
      { code: '2708-6', name: 'Oxygen saturation in Arterial blood' },
      { code: '59408-5', name: 'Oxygen saturation in Arterial blood by Pulse oximetry' },
      // Complete blood count with differential (eosinophilia)
      { code: '58410-2', name: 'CBC panel - Blood by Automated count' },
      { code: '6690-2', name: 'Leukocytes [#/volume] in Blood by Automated count' },
      { code: '713-8', name: 'Eosinophils [#/volume] in Blood by Automated count' },
      { code: '714-6', name: 'Eosinophils/100 leukocytes in Blood by Automated count' },
      { code: '751-8', name: 'Neutrophils [#/volume] in Blood by Automated count' },
      // Allergy and atopy markers
      { code: '2579-1', name: 'IgE [Units/volume] in Serum or Plasma' },
      { code: '6095-4', name: 'Allergen specific IgE Ab panel - Serum' },
      // Inflammatory markers
      { code: '1988-5', name: 'C reactive protein [Mass/volume] in Serum or Plasma' },
      // Theophylline monitoring (for patients on theophylline)
      { code: '4049-3', name: 'Theophylline [Mass/volume] in Serum or Plasma' },
      // Exhaled nitric oxide (FeNO) - biomarker for eosinophilic inflammation
      { code: '60220-7', name: 'Nitric oxide [Moles/volume] in Exhaled air' },
      // Sputum analysis
      { code: '624-7', name: 'Bacteria identified in Sputum by Culture' },
      // Cardiac biomarker (dyspnea differential)
      { code: '33762-6', name: 'NT-proBNP [Mass/volume] in Serum or Plasma' },
    ],
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Doença inflamatória crônica das vias aéreas caracterizada por hiper-reatividade brônquica, obstrução variável ao fluxo aéreo e sintomas respiratórios recorrentes (dispneia, sibilância, tosse, aperto no peito).',
      criteriosDiagnosticos: [
        'Sintomas variáveis: sibilância, dispneia, aperto no peito, tosse',
        'Variação temporal e intensidade dos sintomas',
        'Piora noturna ou ao despertar',
        'Espirometria: obstrução reversível (VEF1 aumenta 12% e >=200mL pós-BD)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Controle ambiental (ácaros, pelos, mofo)',
          'Evitar tabagismo ativo e passivo',
          'Vacinação (influenza, pneumococo)',
          'Plano de ação por escrito'
        ],
        farmacologico: [
          'Step 1: SABA conforme necessidade',
          'Step 2: CI em dose baixa (Budesonida 200-400mcg/dia)',
          'Step 3: CI dose baixa + LABA (Formoterol)',
          'Step 4: CI dose média + LABA',
          'Step 5: CI dose alta + LABA + tiotrópio ou anti-IgE'
        ]
      },
      metasTerapeuticas: [
        'Sintomas diurnos <=2x/semana',
        'Sem despertar noturno',
        'SABA de resgate <=2x/semana',
        'Sem limitação de atividades',
        'VEF1 normal ou próximo do normal'
      ],
      examesIniciais: [
        'Espirometria com prova broncodilatadora',
        'Oximetria de pulso',
        'Radiografia de tórax (excluir outras causas)',
        'Hemograma (eosinofilia)'
      ],
      redFlags: [
        'Exacerbação grave (fala entrecortada, FR>30, FC>120)',
        'SpO2 <92%',
        'PFE <50% do previsto',
        'Uso de musculatura acessória',
        'Alteração do nível de consciência',
        'Silêncio torácico'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5-10% da população adulta, mais comum em crianças',
        incidencia: 'Uma das doenças crônicas mais comuns',
        faixaEtaria: 'Todas as idades, início geralmente na infância',
        fatoresRisco: [
          'História familiar de asma ou atopia',
          'Atopia pessoal (rinite, eczema)',
          'Exposição a alérgenos (ácaros, pelos, fungos)',
          'Tabagismo passivo na infância',
          'Infecções virais na infância',
          'Obesidade',
          'Exposições ocupacionais'
        ],
        citations: [{ refId: 'gina-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      fisiopatologia: {
        texto: 'Inflamação crônica das vias aéreas mediada por células Th2 (eosinófilos, mastócitos, linfócitos T). A inflamação causa edema, hipersecreção de muco e broncoconstrição, levando a obstrução variável do fluxo aéreo e hiper-reatividade brônquica.',
        citations: [{ refId: 'gina-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dispneia episódica',
          'Sibilância (chiado)',
          'Tosse, especialmente noturna',
          'Aperto no peito',
          'Sintomas após exercício ou exposição a alérgenos'
        ],
        sinaisExameFisico: [
          'Sibilos difusos à ausculta',
          'Expiração prolongada',
          'Uso de musculatura acessória (exacerbação)',
          'Taquipneia',
          'Pode ser normal fora das crises'
        ],
        formasClinicas: [
          'Asma alérgica (mais comum)',
          'Asma não alérgica',
          'Asma ocupacional',
          'Asma induzida por exercício',
          'Asma de início tardio'
        ],
        citations: [{ refId: 'gina-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Sintomas variáveis compatíveis',
          'Obstrução reversível à espirometria (VEF1/CVF <0,75-0,80)',
          'Reversibilidade: aumento VEF1 >=12% e >=200mL pós-BD',
          'Variabilidade do PFE >10%'
        ],
        diagnosticoDiferencial: [
          'DPOC',
          'Insuficiência cardíaca',
          'Bronquiectasias',
          'Disfunção de cordas vocais',
          'Corpo estranho',
          'Refluxo gastroesofágico',
          'Rinite e sinusite'
        ],
        examesLaboratoriais: [
          'Espirometria com prova broncodilatadora',
          'Hemograma (eosinofilia)',
          'IgE total e específica (se alérgica)',
          'FeNO (óxido nítrico exalado)',
          'Teste de broncoprovocação (casos duvidosos)'
        ],
        citations: [{ refId: 'gina-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      tratamento: {
        objetivos: [
          'Controlar sintomas',
          'Prevenir exacerbações',
          'Manter função pulmonar normal',
          'Manter atividades normais',
          'Minimizar efeitos adversos'
        ],
        naoFarmacologico: {
          medidas: [
            'Controle ambiental (capas antiácaro, limpeza)',
            'Cessação do tabagismo',
            'Vacinação anual (influenza) e pneumococo',
            'Exercício físico regular',
            'Educação sobre a doença e uso de inaladores'
          ],
          citations: [{ refId: 'gina-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Corticoide inalatório',
              medicamentos: ['Budesonida', 'Beclometasona', 'Fluticasona'],
              posologia: 'Budesonida 200-400mcg 12/12h inalatório'
            },
            {
              classe: 'LABA (associado ao CI)',
              medicamentos: ['Formoterol', 'Salmeterol'],
              posologia: 'Formoterol 6-12mcg 12/12h inalatório'
            },
            {
              classe: 'SABA (resgate)',
              medicamentos: ['Salbutamol'],
              posologia: 'Salbutamol 100-200mcg conforme necessidade'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Exacerbação aguda',
              conduta: 'SABA repetido + corticoide oral (Prednisona 40-50mg/dia 5-7 dias)'
            },
            {
              situacao: 'Asma grave refratária',
              conduta: 'Adicionar anti-IgE (Omalizumab) ou anti-IL5'
            }
          ],
          citations: [{ refId: 'gina-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        duracao: 'Tratamento contínuo, step-down após 3 meses de controle'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses até controle, depois a cada 3-6 meses',
        examesControle: [
          'Espirometria anual',
          'Avaliação de controle (ACT, ACQ)',
          'Revisão da técnica inalatória'
        ],
        metasTerapeuticas: [
          'Asma controlada conforme GINA',
          '0-1 exacerbação/ano',
          'VEF1 >80% do previsto'
        ],
        criteriosEncaminhamento: [
          'Asma grave/difícil controle',
          'Exacerbações frequentes apesar do tratamento',
          'Suspeita de asma ocupacional',
          'Candidato a terapia biológica'
        ],
        citations: [{ refId: 'gina-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      prevencao: {
        primaria: [
          'Aleitamento materno',
          'Evitar tabagismo passivo'
        ],
        secundaria: [
          'Controle ambiental',
          'Tratamento adequado da rinite alérgica',
          'Imunoterapia específica'
        ],
        citations: [{ refId: 'gina-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
    },
    protocolos: ['protocolo-asma'],
    medicamentos: ['budesonida', 'formoterol', 'salbutamol', 'beclometasona', 'prednisona'],
    calculadoras: ['act-asthma', 'peak-flow'],
    rastreamentos: [],
    citations: [{ refId: 'gina-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2024-12',
    tags: ['asma', 'bronquite', 'sibilancia', 'dispneia', 'alergia', 'inalador'],
  },
  {
    id: 'tuberculose-pulmonar',
    titulo: 'Tuberculose Pulmonar',
    sinonimos: ['TB', 'Tísica', 'Tuberculose'],
    doid: 'DOID:2957',
    snomedCT: '154283005',
    meshId: 'D014397',
    umlsCui: 'C0041327',
    ciap2: ['A70'],
    cid10: ['A15', 'A15.0', 'A15.1', 'A15.2', 'A15.3', 'A16'],
    cid11: ['1B10'],
    // LOINC codes for tuberculosis diagnosis and monitoring
    loinc: [
      // AFB smear and culture
      { code: '11545-1', name: 'Mycobacterium sp identified in Specimen by Organism specific culture' },
      { code: '543-9', name: 'Mycobacteria identified in Sputum by Acid fast stain' },
      { code: '16898-8', name: 'Mycobacterium tuberculosis rRNA [Presence] in Sputum by NAA' },
      { code: '38379-4', name: 'Mycobacterium tuberculosis complex DNA [Presence] in Specimen by NAA' },
      { code: '46244-0', name: 'Mycobacterium tuberculosis DNA [Presence] in Sputum by NAA with probe detection' },
      // GeneXpert MTB/RIF
      { code: '82197-6', name: 'Mycobacterium tuberculosis DNA and rifampin resistance by Molecular genetics method' },
      // Tuberculin skin test (PPD/Mantoux) and IGRA
      { code: '55277-8', name: 'Mycobacterium tuberculosis Ag [Presence] in Serum, Plasma or Blood by IGRA' },
      { code: '64083-9', name: 'Mycobacterium tuberculosis stimulated gamma interferon [Presence] in Blood' },
      // Sputum culture
      { code: '624-7', name: 'Bacteria identified in Sputum by Culture' },
      { code: '6460-0', name: 'Bacteria identified in Sputum by Respiratory culture' },
      // Complete blood count
      { code: '58410-2', name: 'CBC panel - Blood by Automated count' },
      { code: '6690-2', name: 'Leukocytes [#/volume] in Blood by Automated count' },
      { code: '718-7', name: 'Hemoglobin [Mass/volume] in Blood' },
      { code: '4544-3', name: 'Hematocrit [Volume fraction] of Blood' },
      // Inflammatory markers
      { code: '1988-5', name: 'C reactive protein [Mass/volume] in Serum or Plasma' },
      { code: '4537-7', name: 'Erythrocyte sedimentation rate' },
      // Liver function (pre-treatment baseline and monitoring)
      { code: '1920-8', name: 'Aspartate aminotransferase [Enzymatic activity/volume] in Serum or Plasma' },
      { code: '1742-6', name: 'Alanine aminotransferase [Enzymatic activity/volume] in Serum or Plasma' },
      { code: '1975-2', name: 'Bilirubin.total [Mass/volume] in Serum or Plasma' },
      // Renal function
      { code: '2160-0', name: 'Creatinine [Mass/volume] in Serum or Plasma' },
      { code: '3094-0', name: 'Urea nitrogen [Mass/volume] in Serum or Plasma' },
      // HIV testing (TB-HIV co-infection screening)
      { code: '29893-5', name: 'HIV 1 and 2 Ab [Presence] in Serum' },
      { code: '68961-2', name: 'HIV 1 and 2 Ab and HIV1 p24 Ag [Presence] in Serum or Plasma' },
      // Uric acid (for pyrazinamide monitoring)
      { code: '3084-1', name: 'Urate [Mass/volume] in Serum or Plasma' },
    ],
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Doença infecciosa causada pelo Mycobacterium tuberculosis, de transmissão aérea, que afeta principalmente os pulmões. É uma doença de notificação compulsória no Brasil.',
      criteriosDiagnosticos: [
        'Tosse >=3 semanas (sintomático respiratório)',
        'Baciloscopia de escarro positiva (2 amostras)',
        'Cultura para micobactéria positiva',
        'Teste molecular positivo (GeneXpert)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Isolamento respiratório inicial (até 15 dias de tratamento)',
          'Uso de máscara pelo paciente',
          'Ventilação adequada do ambiente',
          'Investigação de contatos'
        ],
        farmacologico: [
          'Fase intensiva (2 meses): RHZE (Rifampicina + Isoniazida + Pirazinamida + Etambutol)',
          'Fase de manutenção (4 meses): RH (Rifampicina + Isoniazida)',
          'Tratamento supervisionado (TDO) recomendado',
          'Piridoxina 50mg/dia (prevenção de neuropatia)'
        ]
      },
      metasTerapeuticas: [
        'Negativação do escarro em 2 meses',
        'Melhora clínica e radiológica',
        'Adesão ao tratamento completo (6 meses)',
        'Cura sem recidiva'
      ],
      examesIniciais: [
        'Baciloscopia de escarro (2 amostras)',
        'Cultura para micobactéria + TSA',
        'Teste molecular (GeneXpert)',
        'Radiografia de tórax',
        'HIV (co-infecção)',
        'Hepatograma (baseline antes do tratamento)'
      ],
      redFlags: [
        'Hemoptise maciça',
        'Insuficiência respiratória',
        'TB miliar/disseminada',
        'Meningite tuberculosa',
        'TB resistente (MDR/XDR)',
        'Co-infecção HIV grave'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Alta em países em desenvolvimento',
        incidencia: '~70.000 casos novos/ano no Brasil',
        mortalidade: '~4.500 óbitos/ano no Brasil',
        faixaEtaria: 'Todas as idades, mais comum em adultos jovens',
        fatoresRisco: [
          'Contato com caso de TB',
          'HIV/AIDS',
          'Diabetes mellitus',
          'Desnutrição',
          'Uso de imunossupressores',
          'Silicose',
          'Etilismo',
          'Tabagismo',
          'Populações vulneráveis (privados de liberdade, pessoas em situação de rua)'
        ],
        citations: [{ refId: 'ms-tb-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      fisiopatologia: {
        texto: 'Transmissão aerógena por inalação de aerossóis contendo bacilos. Os bacilos são fagocitados por macrófagos alveolares, podendo ser contidos (infecção latente) ou progredir para doença ativa. A resposta imune granulomatosa causa necrose caseosa e formação de cavidades pulmonares.',
        citations: [{ refId: 'ms-tb-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Tosse persistente (>=3 semanas)',
          'Expectoração (pode ser hemoptóica)',
          'Febre vespertina/noturna',
          'Sudorese noturna',
          'Emagrecimento',
          'Astenia'
        ],
        sinaisExameFisico: [
          'Estertores em ápices pulmonares',
          'Sopro anfórico (cavidade)',
          'Emagrecimento, palidez',
          'Linfonodomegalia (formas extrapulmonares)',
          'Pode ser normal'
        ],
        formasClinicas: [
          'TB pulmonar primária',
          'TB pulmonar pós-primária (reativação)',
          'TB miliar (disseminada)',
          'TB pleural, ganglionar, meníngea, óssea, etc.'
        ],
        citations: [{ refId: 'ms-tb-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Sintomático respiratório (tosse >=3 semanas)',
          'Baciloscopia positiva (2 amostras)',
          'Cultura positiva para M. tuberculosis',
          'Teste molecular positivo (GeneXpert)',
          'Alterações radiológicas sugestivas'
        ],
        diagnosticoDiferencial: [
          'Pneumonia bacteriana',
          'Câncer de pulmão',
          'Micoses pulmonares',
          'DPOC exacerbado',
          'Bronquiectasias',
          'Sarcoidose'
        ],
        examesLaboratoriais: [
          'Baciloscopia de escarro (2-3 amostras)',
          'Cultura para micobactéria com TSA',
          'GeneXpert MTB/RIF (teste molecular)',
          'PPD/IGRA (infecção latente)',
          'HIV (todos os casos)',
          'Hepatograma, função renal, ácido úrico'
        ],
        examesImagem: [
          'Radiografia de tórax (infiltrado em ápices, cavernas)',
          'TC de tórax (casos duvidosos)',
          'TC de crânio (se suspeita de TB meníngea)'
        ],
        citations: [{ refId: 'ms-tb-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      tratamento: {
        objetivos: [
          'Curar o paciente',
          'Interromper a transmissão',
          'Prevenir resistência',
          'Evitar recidiva'
        ],
        naoFarmacologico: {
          medidas: [
            'Isolamento respiratório (15 dias iniciais)',
            'Tratamento Diretamente Observado (TDO)',
            'Investigação e tratamento de contatos',
            'Educação sobre a doença e adesão',
            'Suporte nutricional'
          ],
          citations: [{ refId: 'ms-tb-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Esquema Básico - Fase Intensiva (2 meses)',
              medicamentos: ['Rifampicina', 'Isoniazida', 'Pirazinamida', 'Etambutol'],
              posologia: 'RHZE: 4 comprimidos dose fixa combinada (>50kg) 1x/dia'
            },
            {
              classe: 'Esquema Básico - Fase de Manutenção (4 meses)',
              medicamentos: ['Rifampicina', 'Isoniazida'],
              posologia: 'RH: 4 comprimidos dose fixa combinada (>50kg) 1x/dia'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Hepatopatia grave',
              conduta: 'Esquema especial sem hepatotóxicos'
            },
            {
              situacao: 'TB resistente (MDR)',
              conduta: 'Esquema com fluoroquinolona + injetável + outros'
            },
            {
              situacao: 'Co-infecção TB-HIV',
              conduta: 'Iniciar TARV 2-8 semanas após início do tratamento TB'
            }
          ],
          citations: [{ refId: 'ms-tb-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        duracao: '6 meses (esquema básico) ou mais em formas especiais'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal durante o tratamento',
        examesControle: [
          'Baciloscopia mensal (até negativação)',
          'Hepatograma mensal',
          'Radiografia ao final do tratamento',
          'Avaliação de efeitos adversos'
        ],
        metasTerapeuticas: [
          'Negativação do escarro em 2 meses',
          'Melhora clínica e ganho de peso',
          'Cura ao final de 6 meses'
        ],
        criteriosEncaminhamento: [
          'Falência de tratamento',
          'TB resistente',
          'Formas graves (miliar, meníngea)',
          'Intolerância medicamentosa grave',
          'Co-morbidades complexas'
        ],
        citations: [{ refId: 'ms-tb-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      prevencao: {
        primaria: [
          'BCG ao nascer',
          'Identificação e tratamento de casos',
          'Ventilação adequada de ambientes'
        ],
        secundaria: [
          'Investigação de contatos',
          'Tratamento de Infecção Latente (ILTB)',
          'Quimioprofilaxia em HIV+'
        ],
        citations: [{ refId: 'ms-tb-2024', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
    },
    protocolos: ['protocolo-tb'],
    medicamentos: ['rifampicina', 'isoniazida', 'pirazinamida', 'etambutol'],
    calculadoras: [],
    rastreamentos: ['rastreamento-tb-contato'],
    citations: [{ refId: 'ms-tb-2024', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2024-12',
    tags: ['tuberculose', 'tb', 'tosse', 'hemoptise', 'baciloscopia', 'notificacao'],
  },
  {
    id: 'embolia-pulmonar',
    titulo: 'Embolia Pulmonar',
    sinonimos: ['EP', 'TEP', 'Tromboembolismo pulmonar', 'Embolia pulmonar aguda'],
    doid: 'DOID:9477',
    snomedCT: '59282003',
    meshId: 'D011655',
    umlsCui: 'C0034065',
    ciap2: ['K93'],
    cid10: ['I26', 'I26.0', 'I26.9'],
    cid11: ['BB00'],
    // LOINC codes for pulmonary embolism diagnosis and monitoring
    loinc: [
      // D-dimer (key diagnostic test)
      { code: '48065-7', name: 'D-dimer FEU [Mass/volume] in Platelet poor plasma' },
      { code: '48066-5', name: 'D-dimer DDU [Mass/volume] in Platelet poor plasma' },
      { code: '3246-6', name: 'Fibrin D-dimer [Presence] in Platelet poor plasma' },
      // Blood gases
      { code: '2019-8', name: 'Carbon dioxide [Partial pressure] in Arterial blood' },
      { code: '2703-7', name: 'Oxygen [Partial pressure] in Arterial blood' },
      { code: '2744-1', name: 'pH of Arterial blood' },
      { code: '1960-4', name: 'Bicarbonate [Moles/volume] in Arterial blood' },
      { code: '2708-6', name: 'Oxygen saturation in Arterial blood' },
      { code: '59408-5', name: 'Oxygen saturation in Arterial blood by Pulse oximetry' },
      // Cardiac biomarkers (risk stratification)
      { code: '6598-7', name: 'Troponin T.cardiac [Mass/volume] in Serum or Plasma' },
      { code: '10839-9', name: 'Troponin I.cardiac [Mass/volume] in Serum or Plasma' },
      { code: '89579-7', name: 'Troponin I.cardiac [Mass/volume] in Serum or Plasma by High sensitivity immunoassay' },
      { code: '33762-6', name: 'NT-proBNP [Mass/volume] in Serum or Plasma' },
      { code: '30934-4', name: 'BNP [Mass/volume] in Blood' },
      // Complete blood count
      { code: '58410-2', name: 'CBC panel - Blood by Automated count' },
      { code: '6690-2', name: 'Leukocytes [#/volume] in Blood by Automated count' },
      { code: '718-7', name: 'Hemoglobin [Mass/volume] in Blood' },
      { code: '777-3', name: 'Platelets [#/volume] in Blood by Automated count' },
      // Coagulation studies
      { code: '5902-2', name: 'Prothrombin time (PT)' },
      { code: '6301-6', name: 'INR in Platelet poor plasma by Coagulation assay' },
      { code: '3173-2', name: 'aPTT in Platelet poor plasma by Coagulation assay' },
      // Metabolic panel
      { code: '2160-0', name: 'Creatinine [Mass/volume] in Serum or Plasma' },
      { code: '2951-2', name: 'Sodium [Moles/volume] in Serum or Plasma' },
      { code: '2823-3', name: 'Potassium [Moles/volume] in Serum or Plasma' },
      // Lactate (shock marker)
      { code: '2524-7', name: 'Lactate [Moles/volume] in Serum or Plasma' },
      // Inflammatory marker
      { code: '1988-5', name: 'C reactive protein [Mass/volume] in Serum or Plasma' },
      // Thrombophilia workup (after acute phase)
      { code: '3239-1', name: 'Antithrombin [Units/volume] in Platelet poor plasma by Chromogenic method' },
      { code: '5951-9', name: 'Protein C activity actual/Normal [Ratio]' },
      { code: '27820-0', name: 'Protein S free [Units/volume] in Platelet poor plasma' },
      { code: '21668-9', name: 'Factor V Leiden mutation analysis' },
      { code: '16940-8', name: 'Prothrombin G20210A gene mutation analysis' },
    ],
    categoria: 'respiratorio',
    quickView: {
      definicao: 'Obstrução de uma ou mais artérias pulmonares por trombos, geralmente provenientes de trombose venosa profunda dos membros inferiores. Emergência médica com risco de óbito.',
      criteriosDiagnosticos: [
        'Dispneia súbita, dor torácica pleurítica, hemoptise',
        'D-dímero elevado (se probabilidade baixa/intermediária)',
        'Angiotomografia de tórax: falha de enchimento arterial',
        'Cintilografia V/Q: defeitos de perfusão sem ventilação'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Oxigenoterapia se SpO2 <90%',
          'Monitorização contínua',
          'Internação hospitalar',
          'Mobilização precoce se estável'
        ],
        farmacologico: [
          'Anticoagulação imediata: Heparina ou DOAC',
          'HBPM: Enoxaparina 1mg/kg 12/12h SC',
          'DOACs: Rivaroxabana 15mg 12/12h (21 dias), depois 20mg/dia',
          'Trombólise se EP maciça com instabilidade hemodinâmica',
          'Duração: 3-6 meses (provocada) ou indefinida (não provocada)'
        ]
      },
      metasTerapeuticas: [
        'Estabilização hemodinâmica',
        'Anticoagulação terapêutica mantida',
        'Prevenção de recorrência',
        'Prevenção de CTEPH'
      ],
      examesIniciais: [
        'D-dímero (se probabilidade baixa/intermediária)',
        'Angiotomografia de tórax (padrão-ouro)',
        'ECG (S1Q3T3, taquicardia sinusal)',
        'Gasometria arterial',
        'Troponina, BNP (estratificação de risco)',
        'Ecocardiograma (sobrecarga de VD)'
      ],
      redFlags: [
        'Hipotensão (PAS <90 por >15min)',
        'Choque cardiogênico',
        'Parada cardiorrespiratória',
        'Disfunção de VD + troponina elevada',
        'SpO2 <88%',
        'Síncope'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Terceira causa de morte cardiovascular',
        incidencia: '100-200 casos/100.000 habitantes/ano',
        mortalidade: 'Até 30% se não tratada; 2-8% se tratada',
        faixaEtaria: 'Aumenta com idade, pico >60 anos',
        fatoresRisco: [
          'TVP prévia',
          'Imobilização prolongada',
          'Cirurgia recente (especialmente ortopédica)',
          'Câncer ativo',
          'Trombofilias',
          'Uso de estrogênios (ACO, TRH)',
          'Gravidez e puerpério',
          'Insuficiência cardíaca',
          'Obesidade',
          'Viagens longas'
        ],
        citations: [{ refId: 'esc-pe-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      fisiopatologia: {
        texto: 'Trombos formados no sistema venoso profundo (principalmente MMII) migram para a circulação pulmonar, causando obstrução arterial. Isso aumenta a resistência vascular pulmonar, sobrecarregando o VD e comprometendo o débito cardíaco. A hipoxemia resulta de desequilíbrio V/Q e shunt.',
        citations: [{ refId: 'esc-pe-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dispneia súbita (mais comum)',
          'Dor torácica pleurítica',
          'Tosse',
          'Hemoptise',
          'Síncope (EP maciça)',
          'Ansiedade'
        ],
        sinaisExameFisico: [
          'Taquipneia',
          'Taquicardia',
          'Hipotensão (EP grave)',
          'Hipoxemia',
          'Turgência jugular',
          'Sinais de TVP (edema unilateral de MI)'
        ],
        formasClinicas: [
          'EP de baixo risco (estável)',
          'EP de risco intermediário (disfunção VD ou biomarcadores elevados)',
          'EP de alto risco (instabilidade hemodinâmica)'
        ],
        citations: [{ refId: 'esc-pe-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Suspeita clínica (Wells ou Geneva score)',
          'D-dímero elevado (>500ng/mL)',
          'Angiotomografia: falha de enchimento arterial',
          'Cintilografia V/Q: alta probabilidade'
        ],
        diagnosticoDiferencial: [
          'Síndrome coronariana aguda',
          'Pneumonia',
          'Pneumotórax',
          'Dissecção de aorta',
          'Pericardite',
          'Insuficiência cardíaca descompensada',
          'Crise de ansiedade'
        ],
        examesLaboratoriais: [
          'D-dímero (alta sensibilidade)',
          'Troponina (estratificação)',
          'BNP/NT-proBNP (estratificação)',
          'Gasometria arterial',
          'Hemograma, função renal, coagulação'
        ],
        examesImagem: [
          'Angiotomografia de tórax (padrão-ouro)',
          'Ecocardiograma (sobrecarga VD)',
          'Doppler de MMII (TVP)',
          'Cintilografia V/Q (se contraindicação à TC)'
        ],
        citations: [{ refId: 'esc-pe-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir óbito',
          'Prevenir extensão do trombo',
          'Prevenir recorrência',
          'Prevenir hipertensão pulmonar tromboembólica crônica'
        ],
        naoFarmacologico: {
          medidas: [
            'Oxigenoterapia suplementar',
            'Suporte hemodinâmico se choque',
            'Filtro de VCI (se contraindicação a anticoagulação)',
            'Trombectomia mecânica (casos selecionados)'
          ],
          citations: [{ refId: 'esc-pe-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'HBPM',
              medicamentos: ['Enoxaparina'],
              posologia: 'Enoxaparina 1mg/kg 12/12h SC ou 1,5mg/kg 1x/dia'
            },
            {
              classe: 'DOACs (preferidos se elegível)',
              medicamentos: ['Rivaroxabana', 'Apixabana', 'Edoxabana'],
              posologia: 'Rivaroxabana 15mg 12/12h por 21 dias, depois 20mg/dia'
            },
            {
              classe: 'Heparina não fracionada',
              medicamentos: ['HNF'],
              posologia: 'Bolus 80 UI/kg + 18 UI/kg/h IV (se instável ou IR)'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'EP de alto risco (choque)',
              conduta: 'Trombólise sistêmica: Alteplase 100mg IV em 2h'
            },
            {
              situacao: 'Câncer ativo',
              conduta: 'HBPM ou DOAC por tempo indefinido'
            },
            {
              situacao: 'Gravidez',
              conduta: 'HBPM em dose plena (DOACs contraindicados)'
            }
          ],
          citations: [{ refId: 'esc-pe-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        duracao: '3-6 meses (provocada) ou indefinido (não provocada, recorrente, câncer)'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno em 1-2 semanas, depois a cada 1-3 meses',
        examesControle: [
          'Monitorização de anticoagulação (se varfarina: INR 2-3)',
          'Avaliação de sintomas residuais',
          'Ecocardiograma (se suspeita de CTEPH)',
          'Investigação de trombofilia (após fase aguda, se indicado)'
        ],
        metasTerapeuticas: [
          'Anticoagulação terapêutica',
          'Sem recorrência',
          'Resolução de sintomas',
          'Prevenção de CTEPH'
        ],
        criteriosEncaminhamento: [
          'EP de alto risco',
          'Candidato a trombólise ou trombectomia',
          'Suspeita de CTEPH',
          'Trombofilia complexa',
          'EP recorrente'
        ],
        citations: [{ refId: 'esc-pe-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      prevencao: {
        primaria: [
          'Profilaxia mecânica (meias compressivas, CPI)',
          'Profilaxia farmacológica em pacientes de risco',
          'Mobilização precoce pós-operatória'
        ],
        secundaria: [
          'Anticoagulação prolongada/indefinida conforme risco',
          'Avaliação de trombofilias',
          'Modificação de fatores de risco'
        ],
        citations: [{ refId: 'esc-pe-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
    },
    protocolos: ['protocolo-tep'],
    medicamentos: ['enoxaparina', 'rivaroxabana', 'apixabana', 'varfarina', 'alteplase'],
    calculadoras: ['wells-tep', 'pesi', 'geneva-score'],
    rastreamentos: [],
    citations: [{ refId: 'esc-pe-2019', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2024-12',
    tags: ['embolia', 'tep', 'trombose', 'dispneia', 'anticoagulacao', 'd-dimero'],
  }
];

