/**
 * DOENÇAS MUSCULOESQUELÉTICAS - DARWIN-MFC
 * =========================================
 *
 * Ontologias integradas:
 * - DOID (Disease Ontology)
 * - SNOMED-CT (Systematized Nomenclature of Medicine)
 * - MeSH (Medical Subject Headings)
 * - UMLS CUI (Unified Medical Language System)
 * - LOINC (Logical Observation Identifiers Names and Codes)
 */

import { Doenca } from '../../types/doenca';

export const doencasMusculoesqueleticas: Doenca[] = [
  {
    id: 'osteoartrite',
    titulo: 'Osteoartrite',
    sinonimos: ['Artrose', 'Osteoartrose', 'Doença articular degenerativa'],
    doid: 'DOID:8398',
    snomedCT: '396275006',
    meshId: 'D010003',
    umlsCui: 'C0029408',
    ciap2: ['L89', 'L90', 'L91'],
    cid10: ['M15', 'M16', 'M17', 'M18', 'M19'],
    cid11: ['FA00-FA02'],
    // LOINC codes for osteoarthritis workup (primarily to exclude inflammatory arthritis)
    loinc: [
      { code: '4537-7', name: 'ESR (Erythrocyte sedimentation rate)' },
      { code: '1988-5', name: 'CRP (C-reactive protein)' },
      { code: '5041-9', name: 'RF (Rheumatoid Factor) - to exclude RA' },
      { code: '32218-0', name: 'Anti-CCP (Anti-cyclic citrullinated peptide) - to exclude RA' },
      { code: '3084-1', name: 'Uric acid - to exclude gout' },
    ],
    categoria: 'musculoesqueletico',
    quickView: {
      definicao: 'Doença articular degenerativa caracterizada por deterioração da cartilagem articular, alterações ósseas subcondrais e inflamação sinovial secundária. Causa mais comum de dor articular em adultos.',
      criteriosDiagnosticos: [
        'Dor articular mecânica (piora com atividade, melhora com repouso)',
        'Rigidez matinal <30 minutos',
        'Idade >40 anos',
        'Crepitação articular',
        'Aumento ósseo (osteófitos)',
        'Ausência de calor articular significativo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educação e autocuidado',
          'Exercício físico regular (fortalecimento + aeróbico)',
          'Perda de peso se sobrepeso/obesidade (meta: perda de 5-10%)',
          'Fisioterapia',
          'Órteses e dispositivos de auxílio (bengala)'
        ],
        farmacologico: [
          'Paracetamol 500-1000mg até 4g/dia (1ª linha se dor leve)',
          'AINEs tópicos: Diclofenaco gel 1% 3-4x/dia (joelho/mãos)',
          'AINEs orais: Ibuprofeno 400-600mg 8/8h (curto prazo)',
          'Duloxetina 60mg/dia se dor crônica com componente central'
        ]
      },
      metasTerapeuticas: [
        'Controle adequado da dor (VAS <4/10)',
        'Preservação da função articular',
        'Manutenção das atividades diárias',
        'Evitar progressão'
      ],
      examesIniciais: [
        'Radiografia (apenas se dúvida diagnóstica ou sintomas atípicos)',
        'Não há exames laboratoriais específicos',
        'VHS/PCR normais (diferenciar de artrite inflamatória)'
      ],
      redFlags: [
        'Dor noturna que acorda o paciente',
        'Rigidez matinal >60 minutos (pensar em AR)',
        'Sinais inflamatórios intensos (calor, rubor)',
        'Sintomas sistêmicos (febre, perda de peso)',
        'Piora rápida ou atípica',
        'Trauma recente significativo'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-15% dos adultos, 30-50% >60 anos têm alterações radiológicas',
        incidencia: 'Aumenta exponencialmente com idade',
        faixaEtaria: 'Rara antes dos 40 anos, comum após 50',
        fatoresRisco: [
          'Idade avançada',
          'Obesidade (principalmente joelho)',
          'Sexo feminino (após menopausa)',
          'Trauma articular prévio',
          'Atividades de alto impacto',
          'Genética',
          'Deformidades articulares'
        ],
        citations: [{ refId: 'oarsi-2019', evidenceLevel: 'B', studyType: 'Guideline' }]
      },
      fisiopatologia: {
        texto: 'Desequilíbrio entre síntese e degradação da matriz cartilaginosa, com perda progressiva de cartilagem hialina, esclerose óssea subcondral, formação de osteófitos e sinovite secundária. Envolve fatores mecânicos e bioquímicos.',
        citations: [{ refId: 'oarsi-2019', evidenceLevel: 'B', studyType: 'SystematicReview' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor articular de padrão mecânico',
          'Rigidez após inatividade (<30 min)',
          'Limitação de movimento',
          'Instabilidade articular',
          'Deformidade progressiva'
        ],
        sinaisExameFisico: [
          'Crepitação à movimentação',
          'Aumento de volume ósseo (osteófitos)',
          'Limitação de ADM',
          'Atrofia muscular periarticular',
          'Deformidades (varo/valgo no joelho, nódulos de Heberden/Bouchard nas mãos)'
        ],
        formasClinicas: [
          'OA de joelho (mais comum)',
          'OA de quadril (coxartrose)',
          'OA de mãos (IFD, IFP, CMC do polegar)',
          'OA de coluna (espondilose)'
        ],
        citations: [{ refId: 'oarsi-2019', evidenceLevel: 'B', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Critérios ACR: clínicos + radiológicos',
          'Diagnóstico geralmente clínico',
          'RX: redução do espaço articular, osteófitos, esclerose subcondral, cistos'
        ],
        diagnosticoDiferencial: [
          'Artrite reumatoide',
          'Artrite psoriásica',
          'Gota/Pseudogota',
          'Artrite séptica',
          'Necrose avascular',
          'Bursite/tendinite'
        ],
        examesLaboratoriais: [
          'Não há exames específicos',
          'VHS, PCR, FR, anti-CCP para descartar AR',
          'Ácido úrico se suspeita de gota'
        ],
        citations: [{ refId: 'oarsi-2019', evidenceLevel: 'B', studyType: 'Guideline' }]
      },
      tratamento: {
        objetivos: [
          'Aliviar dor',
          'Manter/melhorar função',
          'Retardar progressão',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Educação do paciente',
            'Perda de peso (se IMC elevado)',
            'Exercícios de fortalecimento muscular',
            'Exercícios aeróbicos de baixo impacto',
            'Fisioterapia',
            'Termoterapia (calor ou frio)',
            'Órteses, palmilhas, bengala'
          ],
          citations: [{ refId: 'oarsi-2019', evidenceLevel: 'B', studyType: 'SystematicReview' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Analgésico simples',
              medicamentos: ['Paracetamol'],
              posologia: '500-1000mg 6/6h (máx 4g/dia). Eficácia modesta, mas seguro.'
            },
            {
              classe: 'AINE tópico',
              medicamentos: ['Diclofenaco gel', 'Cetoprofeno gel'],
              posologia: 'Aplicar 3-4x/dia na articulação. Preferível para OA de joelho/mãos.'
            }
          ],
          segundaLinha: [
            {
              classe: 'AINEs orais',
              medicamentos: ['Ibuprofeno', 'Naproxeno', 'Celecoxibe'],
              posologia: 'Menor dose efetiva, menor tempo possível. Ibuprofeno 400mg 8/8h.'
            },
            {
              classe: 'Inibidor de recaptação dual',
              medicamentos: ['Duloxetina'],
              posologia: '60mg/dia se dor crônica com sensibilização central.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Flare (exacerbação)',
              conduta: 'AINE oral curto prazo ± infiltração com corticoide'
            },
            {
              situacao: 'Refratário',
              conduta: 'Infiltração intra-articular com corticoide ou ácido hialurônico. Considerar cirurgia.'
            }
          ],
          citations: [{ refId: 'oarsi-2019', evidenceLevel: 'B', studyType: 'RCT' }]
        },
        duracao: 'Tratamento crônico, ajustado conforme sintomas.'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses, ou conforme necessidade',
        examesControle: [
          'Reavaliação clínica',
          'RX apenas se mudança significativa ou pré-cirurgia'
        ],
        metasTerapeuticas: [
          'Dor controlada',
          'Função preservada',
          'Qualidade de vida mantida'
        ],
        criteriosEncaminhamento: [
          'Refratário ao tratamento conservador',
          'Disfunção articular grave',
          'Candidato a artroplastia',
          'Dúvida diagnóstica'
        ],
        citations: [{ refId: 'oarsi-2019', evidenceLevel: 'B', studyType: 'ExpertOpinion' }]
      },
      prevencao: {
        primaria: [
          'Manutenção do peso saudável',
          'Atividade física regular',
          'Evitar lesões articulares'
        ],
        secundaria: [
          'Tratamento precoce',
          'Fortalecimento muscular',
          'Controle de peso'
        ],
        citations: [{ refId: 'oarsi-2019', evidenceLevel: 'C', studyType: 'ExpertOpinion' }]
      },
    },
    protocolos: [],
    medicamentos: ['paracetamol', 'ibuprofeno', 'diclofenaco', 'duloxetina'],
    calculadoras: ['womac', 'koos'],
    rastreamentos: [],
    citations: [{ refId: 'oarsi-2019', evidenceLevel: 'B', studyType: 'Guideline' }],
    lastUpdate: '2024-12',
    tags: ['osteoartrite', 'artrose', 'joelho', 'quadril', 'dor-articular'],
  },
  {
    id: 'fibromialgia',
    titulo: 'Fibromialgia',
    sinonimos: ['Síndrome fibromiálgica', 'Fibromiosite'],
    doid: 'DOID:631',
    snomedCT: '24693007',
    meshId: 'D005356',
    umlsCui: 'C0016053',
    ciap2: ['L18'],
    cid10: ['M79.7'],
    cid11: ['MG30.01'],
    // LOINC codes for fibromyalgia workup (to exclude other conditions)
    loinc: [
      { code: '4537-7', name: 'ESR (Erythrocyte sedimentation rate)' },
      { code: '1988-5', name: 'CRP (C-reactive protein)' },
      { code: '3016-3', name: 'TSH (Thyroid stimulating hormone)' },
      { code: '1989-3', name: 'Vitamin D (25-hydroxyvitamin D)' },
      { code: '2157-6', name: 'CPK (Creatine kinase)' },
      { code: '5048-4', name: 'ANA (Antinuclear antibodies) - to exclude SLE' },
      { code: '5041-9', name: 'RF (Rheumatoid Factor) - to exclude RA' },
      { code: '718-7', name: 'Hemoglobin' },
      { code: '4544-3', name: 'Hematocrit' },
    ],
    categoria: 'musculoesqueletico',
    quickView: {
      definicao: 'Síndrome de dor crônica generalizada associada a fadiga, distúrbios do sono, disfunção cognitiva e sintomas somáticos múltiplos. Caracterizada por sensibilização central do sistema nervoso.',
      criteriosDiagnosticos: [
        'Critérios ACR 2016:',
        'Dor generalizada (≥4 de 5 regiões) por ≥3 meses',
        'WPI (Widespread Pain Index) ≥7 + SSS (Symptom Severity Scale) ≥5, OU WPI 4-6 + SSS ≥9',
        'Não é diagnóstico de exclusão: pode coexistir com outras doenças'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educação sobre a doença (fundamental)',
          'Exercício aeróbico regular (mais evidência)',
          'TCC e técnicas de manejo do estresse',
          'Higiene do sono',
          'Fisioterapia e hidroterapia'
        ],
        farmacologico: [
          'Amitriptilina 10-50mg à noite (1ª linha)',
          'Duloxetina 60-120mg/dia ou Pregabalina 150-450mg/dia',
          'Ciclobenzaprina 5-10mg à noite (relaxante muscular)',
          'Evitar opioides e benzodiazepínicos'
        ]
      },
      metasTerapeuticas: [
        'Melhora da função (mais importante que dor zero)',
        'Redução de 30% na intensidade da dor',
        'Melhora do sono',
        'Retorno às atividades'
      ],
      examesIniciais: [
        'Hemograma, VHS, PCR (descartar inflamação)',
        'TSH (descartar hipotireoidismo)',
        'Vitamina D',
        'CPK se dor muscular intensa'
      ],
      redFlags: [
        'Sintomas sistêmicos (febre, perda de peso)',
        'Fraqueza muscular objetiva',
        'Alterações laboratoriais inflamatórias',
        'Dor progressiva e localizada',
        'Sinais neurológicos focais'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-5% da população geral',
        incidencia: 'Subdiagnosticada na APS',
        faixaEtaria: 'Pico 30-50 anos',
        fatoresRisco: [
          'Sexo feminino (7-9:1)',
          'Traumas físicos ou emocionais',
          'Estresse crônico',
          'Transtornos de humor',
          'Outras síndromes de dor crônica',
          'História familiar'
        ],
        citations: [{ refId: 'acr-fibro-2016', evidenceLevel: 'B', studyType: 'Cohort' }]
      },
      fisiopatologia: {
        texto: 'Sensibilização central com amplificação do processamento da dor no SNC. Disfunção de sistemas moduladores descendentes (serotonina, noradrenalina). Alterações do sono não-REM. Fatores psicossociais modulam a expressão clínica.',
        citations: [{ refId: 'acr-fibro-2016', evidenceLevel: 'B', studyType: 'SystematicReview' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor generalizada crônica (>3 meses)',
          'Fadiga profunda e persistente',
          'Sono não restaurador',
          'Disfunção cognitiva ("fibro fog")',
          'Rigidez matinal',
          'Cefaleia crônica',
          'Sintomas de SII'
        ],
        sinaisExameFisico: [
          'Exame geralmente normal',
          'Tender points NÃO são mais critério, mas podem estar presentes',
          'Ausência de sinovite, fraqueza objetiva ou alterações neurológicas'
        ],
        formasClinicas: [
          'Fibromialgia primária',
          'Fibromialgia secundária/concomitante (AR, LES, OA)'
        ],
        citations: [{ refId: 'acr-fibro-2016', evidenceLevel: 'B', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Critérios ACR 2016 (sem necessidade de tender points)',
          'WPI ≥7 + SSS ≥5, ou WPI 4-6 + SSS ≥9',
          'Sintomas ≥3 meses',
          'Diagnóstico NÃO exclui outras doenças'
        ],
        diagnosticoDiferencial: [
          'Hipotireoidismo',
          'Artrite reumatoide inicial',
          'LES',
          'Polimialgia reumática',
          'Miopatias',
          'Deficiência de vitamina D',
          'Depressão maior'
        ],
        examesLaboratoriais: [
          'Hemograma, VHS, PCR (normais)',
          'TSH',
          'Vitamina D',
          'FR, anti-CCP, FAN se suspeita de doença autoimune'
        ],
        citations: [{ refId: 'acr-fibro-2016', evidenceLevel: 'B', studyType: 'Guideline' }]
      },
      tratamento: {
        objetivos: [
          'Melhorar função e qualidade de vida',
          'Reduzir dor (não expectativa de dor zero)',
          'Melhorar sono e fadiga',
          'Tratar comorbidades'
        ],
        naoFarmacologico: {
          medidas: [
            'Educação sobre a doença (essencial)',
            'Exercício aeróbico regular (natação, caminhada)',
            'TCC',
            'Mindfulness e técnicas de relaxamento',
            'Higiene do sono',
            'Hidroterapia'
          ],
          citations: [{ refId: 'eular-fibro-2017', evidenceLevel: 'A', studyType: 'SystematicReview' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Antidepressivo tricíclico',
              medicamentos: ['Amitriptilina'],
              posologia: '10-25mg à noite, aumentar até 50mg (melhora dor e sono)'
            },
            {
              classe: 'IRSN',
              medicamentos: ['Duloxetina', 'Milnaciprano'],
              posologia: 'Duloxetina 60-120mg/dia'
            },
            {
              classe: 'Anticonvulsivante',
              medicamentos: ['Pregabalina'],
              posologia: '150-450mg/dia dividido em 2 doses'
            }
          ],
          segundaLinha: [
            {
              classe: 'Relaxante muscular',
              medicamentos: ['Ciclobenzaprina'],
              posologia: '5-10mg à noite'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Depressão/ansiedade comórbida',
              conduta: 'Duloxetina é boa opção (trata ambos)'
            },
            {
              situacao: 'Insônia predominante',
              conduta: 'Amitriptilina ou ciclobenzaprina à noite'
            }
          ],
          citations: [{ refId: 'eular-fibro-2017', evidenceLevel: 'A', studyType: 'RCT' }]
        },
        duracao: 'Tratamento crônico, geralmente por anos.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal inicialmente, depois a cada 2-3 meses',
        examesControle: [
          'Reavaliação clínica com escalas (FIQ, VAS)',
          'Monitorar efeitos adversos de medicamentos'
        ],
        metasTerapeuticas: [
          'Melhora funcional',
          'Redução da dor',
          'Sono restaurador'
        ],
        criteriosEncaminhamento: [
          'Dúvida diagnóstica',
          'Refratário ao tratamento',
          'Necessidade de abordagem multidisciplinar'
        ],
        citations: [{ refId: 'eular-fibro-2017', evidenceLevel: 'B', studyType: 'ExpertOpinion' }]
      },
      prevencao: {
        primaria: [
          'Manejo do estresse',
          'Atividade física regular'
        ],
        secundaria: [
          'Tratamento precoce',
          'Exercício contínuo'
        ],
        citations: [{ refId: 'eular-fibro-2017', evidenceLevel: 'C', studyType: 'ExpertOpinion' }]
      },
    },
    protocolos: [],
    medicamentos: ['amitriptilina', 'duloxetina', 'pregabalina', 'ciclobenzaprina'],
    calculadoras: ['fiq'],
    rastreamentos: [],
    citations: [{ refId: 'acr-fibro-2016', evidenceLevel: 'B', studyType: 'Guideline' }, { refId: 'eular-fibro-2017', evidenceLevel: 'A', studyType: 'SystematicReview' }],
    lastUpdate: '2024-12',
    tags: ['fibromialgia', 'dor-cronica', 'fadiga', 'sono', 'duloxetina'],
  },
  {
    id: 'gota',
    titulo: 'Gota',
    sinonimos: ['Artrite gotosa', 'Podagra', 'Artrite por cristais de urato'],
    doid: 'DOID:13189',
    snomedCT: '90560007',
    meshId: 'D006073',
    umlsCui: 'C0018099',
    ciap2: ['T92'],
    cid10: ['M10'],
    cid11: ['FA25'],
    // LOINC codes for gout workup
    loinc: [
      { code: '3084-1', name: 'Uric acid (serum)' },
      { code: '3085-8', name: 'Uric acid (urine)' },
      { code: '2160-0', name: 'Creatinine (serum)' },
      { code: '33914-3', name: 'eGFR (Estimated glomerular filtration rate)' },
      { code: '1988-5', name: 'CRP (C-reactive protein)' },
      { code: '4537-7', name: 'ESR (Erythrocyte sedimentation rate)' },
      { code: '718-7', name: 'Hemoglobin' },
      { code: '6690-2', name: 'WBC (White blood cell count)' },
      { code: '2345-7', name: 'Glucose (serum)' },
      { code: '2571-8', name: 'Triglycerides' },
      { code: '2093-3', name: 'Total cholesterol' },
      { code: '2085-9', name: 'HDL cholesterol' },
      { code: '13457-7', name: 'LDL cholesterol (calculated)' },
    ],
    categoria: 'musculoesqueletico',
    quickView: {
      definicao: 'Artropatia inflamatória causada pela deposição de cristais de urato monossódico nas articulações e tecidos periarticulares, associada à hiperuricemia crônica.',
      criteriosDiagnosticos: [
        'Critérios ACR/EULAR 2015:',
        'Artrite monoarticular (especialmente 1ª MTF - podagra)',
        'Início agudo, dor intensa, pico em 12-24h',
        'Resolução espontânea em 7-14 dias',
        'Hiperuricemia (>7 mg/dL em homens, >6 em mulheres)',
        'Padrão-ouro: cristais de urato no líquido sinovial'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Repouso articular durante crise',
          'Gelo local',
          'Redução do consumo de álcool (especialmente cerveja)',
          'Dieta: evitar carnes vermelhas, vísceras, frutos do mar',
          'Hidratação adequada',
          'Perda de peso'
        ],
        farmacologico: [
          'CRISE: Colchicina 0,5mg 8/8h (ideal iniciar <12h) OU',
          'AINE: Naproxeno 500mg 12/12h ou Indometacina 50mg 8/8h OU',
          'Corticoide: Prednisona 30-40mg/dia por 5-7 dias',
          'MANUTENÇÃO: Alopurinol 100-300mg/dia (iniciar após resolução da crise)'
        ]
      },
      metasTerapeuticas: [
        'Alívio rápido da crise (24-48h)',
        'Ácido úrico sérico <6 mg/dL (meta para evitar crises)',
        'Prevenção de novos ataques',
        'Prevenção de tofos e artropatia crônica'
      ],
      examesIniciais: [
        'Ácido úrico sérico (pode estar normal na crise!)',
        'Função renal (creatinina, TFG)',
        'Hemograma, PCR',
        'Líquido sinovial se disponível (cristais)',
        'RX da articulação (fases tardias: erosões em saca-bocado)'
      ],
      redFlags: [
        'Febre alta (descartar artrite séptica)',
        'Articulação vermelha, quente, muito edemaciada',
        'Imunossupressão',
        'Múltiplas articulações (poliarticular)',
        'Gota com DRC avançada'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-4% dos adultos, 7% em homens >65 anos',
        incidencia: 'Aumentando devido a dieta e obesidade',
        faixaEtaria: 'Homens: >40 anos. Mulheres: pós-menopausa',
        fatoresRisco: [
          'Sexo masculino',
          'Hiperuricemia',
          'Dieta rica em purinas (carnes, frutos do mar)',
          'Álcool (especialmente cerveja)',
          'Obesidade',
          'Síndrome metabólica',
          'DRC',
          'Diuréticos tiazídicos'
        ],
        citations: [{ refId: 'acr-gout-2020', evidenceLevel: 'A', studyType: 'Cohort' }]
      },
      fisiopatologia: {
        texto: 'Hiperuricemia crônica leva à supersaturação e precipitação de cristais de urato monossódico em articulações e tecidos. Os cristais ativam o inflamassoma NLRP3, liberando IL-1β e desencadeando inflamação aguda intensa.',
        citations: [{ refId: 'acr-gout-2020', evidenceLevel: 'A', studyType: 'SystematicReview' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor articular intensa e súbita (frequentemente noturna)',
          'Articulação vermelha, quente e edemaciada',
          'Primeiro metatarso-falangeano (podagra) - clássico',
          'Resolução espontânea em 7-14 dias',
          'Intervalos assintomáticos (intercríticos)'
        ],
        sinaisExameFisico: [
          'Articulação intensamente inflamada',
          'Eritema periarticular',
          'Edema articular',
          'Tofos gotosos (depósitos de urato subcutâneos) - fase crônica'
        ],
        formasClinicas: [
          'Gota aguda (crise)',
          'Período intercrítico (assintomático)',
          'Gota crônica tofácea',
          'Artropatia gotosa crônica'
        ],
        citations: [{ refId: 'acr-gout-2020', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Quadro clínico típico + hiperuricemia',
          'Padrão-ouro: cristais de urato em líquido sinovial (birrefringência negativa)',
          'US ou DECT podem identificar cristais'
        ],
        diagnosticoDiferencial: [
          'Artrite séptica (emergência!)',
          'Pseudogota (cristais de CPPD)',
          'Artrite reativa',
          'Celulite',
          'Artrite reumatoide'
        ],
        examesLaboratoriais: [
          'Ácido úrico sérico',
          'Creatinina, TFG',
          'Hemograma, PCR, VHS',
          'Líquido sinovial (se disponível)',
          'Perfil lipídico, glicemia (síndrome metabólica)'
        ],
        citations: [{ refId: 'acr-gout-2020', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      tratamento: {
        objetivos: [
          'Resolver crise rapidamente',
          'Reduzir ácido úrico para <6 mg/dL',
          'Prevenir novas crises',
          'Dissolver tofos e prevenir artropatia'
        ],
        naoFarmacologico: {
          medidas: [
            'Modificação dietética',
            'Redução/cessação de álcool',
            'Hidratação',
            'Perda de peso',
            'Evitar jejum prolongado'
          ],
          citations: [{ refId: 'acr-gout-2020', evidenceLevel: 'B', studyType: 'ExpertOpinion' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Anti-inflamatório para crise',
              medicamentos: ['Colchicina', 'Naproxeno', 'Indometacina', 'Prednisona'],
              posologia: 'Colchicina: 1mg seguido de 0,5mg após 1h. OU AINE dose plena. OU Prednisona 30-40mg/dia x5-7 dias.'
            },
            {
              classe: 'Hipouricemiante (manutenção)',
              medicamentos: ['Alopurinol', 'Febuxostate'],
              posologia: 'Alopurinol: iniciar 100mg/dia, titular até ácido úrico <6 mg/dL (máx 800mg/dia)'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'DRC (TFG <30)',
              conduta: 'Colchicina com cautela (reduzir dose). Ajustar alopurinol. Considerar febuxostate.'
            },
            {
              situacao: 'Profilaxia ao iniciar alopurinol',
              conduta: 'Colchicina 0,5mg 1-2x/dia por 3-6 meses para prevenir flares.'
            }
          ],
          citations: [{ refId: 'acr-gout-2020', evidenceLevel: 'A', studyType: 'RCT' }]
        },
        duracao: 'Crise: 5-10 dias. Hipouricemiante: geralmente contínuo.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal até estabilização, depois a cada 6 meses',
        examesControle: [
          'Ácido úrico sérico (meta <6 mg/dL)',
          'Função renal',
          'Função hepática se alopurinol'
        ],
        metasTerapeuticas: [
          'Ácido úrico <6 mg/dL',
          'Ausência de crises',
          'Resolução de tofos'
        ],
        criteriosEncaminhamento: [
          'Gota refratária',
          'Intolerância/CI a tratamentos',
          'Gota tofácea grave',
          'DRC avançada'
        ],
        citations: [{ refId: 'acr-gout-2020', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      prevencao: {
        primaria: [
          'Dieta saudável',
          'Evitar álcool em excesso',
          'Manter peso adequado'
        ],
        secundaria: [
          'Manter ácido úrico <6 mg/dL',
          'Adesão ao alopurinol'
        ],
        citations: [{ refId: 'acr-gout-2020', evidenceLevel: 'B', studyType: 'Cohort' }]
      },
    },
    protocolos: ['protocolo-gota'],
    medicamentos: ['colchicina', 'alopurinol', 'naproxeno', 'prednisona'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'acr-gout-2020', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2024-12',
    tags: ['gota', 'acido-urico', 'artrite', 'alopurinol', 'podagra'],
  },
  {
    id: 'lupus-eritematoso-sistemico',
    titulo: 'Lúpus Eritematoso Sistêmico',
    sinonimos: ['LES', 'Lúpus', 'Lupus eritematoso disseminado'],
    doid: 'DOID:9074',
    snomedCT: '55464009',
    meshId: 'D008180',
    umlsCui: 'C0024141',
    ciap2: ['L99'],
    cid10: ['M32', 'M32.1', 'M32.8', 'M32.9'],
    cid11: ['4A40'],
    // LOINC codes for SLE diagnostic workup and monitoring
    loinc: [
      { code: '5048-4', name: 'ANA (Antinuclear antibodies)' },
      { code: '11235-1', name: 'Anti-dsDNA (Anti-double stranded DNA)' },
      { code: '13963-4', name: 'Anti-Smith antibodies' },
      { code: '5105-2', name: 'Anti-SSA/Ro antibodies' },
      { code: '5106-0', name: 'Anti-SSB/La antibodies' },
      { code: '31030-5', name: 'Anti-RNP antibodies' },
      { code: '33935-8', name: 'Antiphospholipid antibodies panel' },
      { code: '4485-9', name: 'Complement C3' },
      { code: '4498-2', name: 'Complement C4' },
      { code: '4532-8', name: 'CH50 (Total complement)' },
      { code: '4537-7', name: 'ESR (Erythrocyte sedimentation rate)' },
      { code: '1988-5', name: 'CRP (C-reactive protein)' },
      { code: '718-7', name: 'Hemoglobin' },
      { code: '6690-2', name: 'WBC (White blood cell count)' },
      { code: '777-3', name: 'Platelet count' },
      { code: '26515-7', name: 'Platelets (automated)' },
      { code: '731-0', name: 'Lymphocyte count' },
      { code: '2160-0', name: 'Creatinine (serum)' },
      { code: '33914-3', name: 'eGFR' },
      { code: '5804-0', name: 'Urinalysis protein' },
      { code: '20454-5', name: 'Urine protein/creatinine ratio' },
      { code: '2889-9', name: 'Urine protein 24h' },
      { code: '5794-3', name: 'Urinalysis RBC' },
      { code: '11277-3', name: 'Anti-cardiolipin IgG' },
      { code: '11278-1', name: 'Anti-cardiolipin IgM' },
      { code: '34915-7', name: 'Lupus anticoagulant' },
    ],
    categoria: 'musculoesqueletico',
    quickView: {
      definicao: 'Doença autoimune sistêmica crônica caracterizada por produção de autoanticorpos e deposição de imunocomplexos, causando inflamação em múltiplos órgãos (pele, articulações, rins, sistema nervoso, sistema hematológico).',
      criteriosDiagnosticos: [
        'Critérios ACR/EULAR 2019:',
        'FAN positivo ≥1:80 (critério de entrada obrigatório)',
        'Score ≥10 pontos nos domínios clínicos e imunológicos',
        'Domínios: constitucional, hematológico, neuropsiquiátrico, mucocutâneo, serosas, musculoesquelético, renal',
        'Anti-dsDNA, anti-Smith, baixo complemento são altamente específicos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Proteção solar rigorosa (FPS ≥30, reaplicar)',
          'Cessação do tabagismo',
          'Exercício físico regular',
          'Dieta balanceada',
          'Suporte psicológico'
        ],
        farmacologico: [
          'Hidroxicloroquina 5mg/kg/dia (TODOS os pacientes - base do tratamento)',
          'AINEs para sintomas musculoesqueléticos leves',
          'Prednisona em doses variáveis conforme atividade',
          'Imunossupressores conforme gravidade (azatioprina, metotrexato, micofenolato)'
        ]
      },
      metasTerapeuticas: [
        'Remissão clínica (SLEDAI <4) ou baixa atividade',
        'Prednisona ≤7,5mg/dia ou descontinuação',
        'Prevenção de flares',
        'Preservação da função renal'
      ],
      examesIniciais: [
        'FAN (screening), Anti-dsDNA, Anti-Smith, Anti-Ro/La',
        'Complemento C3, C4',
        'Hemograma completo com plaquetas',
        'Função renal, EAS, proteinúria 24h ou relação prot/creat',
        'Perfil lipídico, glicemia'
      ],
      redFlags: [
        'Proteinúria >500mg/24h (nefrite lúpica)',
        'Alterações neurológicas (convulsões, psicose)',
        'Citopenias graves',
        'Síndrome antifosfolípide',
        'Serosite grave (pericardite, pleurite)',
        'Hemorragia alveolar'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-150/100.000 habitantes (varia por região)',
        incidencia: '1-10/100.000/ano',
        faixaEtaria: 'Pico 15-45 anos',
        fatoresRisco: [
          'Sexo feminino (9:1)',
          'Idade fértil',
          'Afrodescendentes e latinos',
          'História familiar de LES ou doenças autoimunes',
          'Exposição solar',
          'Certas drogas (lúpus induzido)'
        ],
        citations: [{ refId: 'acr-sle-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      fisiopatologia: {
        texto: 'Perda de tolerância imunológica com produção de autoanticorpos contra antígenos nucleares. Formação de imunocomplexos que se depositam em tecidos, ativando complemento e causando inflamação. Participação de linfócitos B e T autorreativos, interferon tipo I e citocinas pró-inflamatórias.',
        citations: [{ refId: 'acr-sle-2019', evidenceLevel: 'A', studyType: 'SystematicReview' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Artralgia/artrite (90%)',
          'Fadiga (80%)',
          'Rash malar (eritema em asa de borboleta)',
          'Fotossensibilidade',
          'Alopecia',
          'Úlceras orais',
          'Febre',
          'Serosite (pleurite, pericardite)'
        ],
        sinaisExameFisico: [
          'Rash malar poupando sulcos nasolabiais',
          'Rash discoide',
          'Sinovite (artrite não erosiva)',
          'Alopecia difusa ou em placas',
          'Úlceras orais/nasais indolores',
          'Livedo reticular',
          'Fenômeno de Raynaud'
        ],
        formasClinicas: [
          'LES cutâneo agudo',
          'LES cutâneo subagudo',
          'LES cutâneo crônico (discoide)',
          'LES sistêmico',
          'LES neonatal'
        ],
        citations: [{ refId: 'acr-sle-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Critérios ACR/EULAR 2019',
          'FAN positivo ≥1:80 é obrigatório',
          'Pontuação ≥10 em domínios clínicos/imunológicos',
          'Considerar biópsia renal se proteinúria'
        ],
        diagnosticoDiferencial: [
          'Artrite reumatoide',
          'Doença mista do tecido conjuntivo',
          'Síndrome de Sjögren',
          'Dermatomiosite',
          'Fibromialgia',
          'Lúpus induzido por drogas',
          'Vasculites'
        ],
        examesLaboratoriais: [
          'FAN (screening - alta sensibilidade)',
          'Anti-dsDNA (específico, correlaciona com atividade)',
          'Anti-Smith (muito específico)',
          'Complemento C3, C4, CH50',
          'Hemograma, função renal',
          'EAS, proteinúria',
          'Anticorpos antifosfolípides'
        ],
        citations: [{ refId: 'acr-sle-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      tratamento: {
        objetivos: [
          'Controlar atividade da doença',
          'Prevenir dano orgânico',
          'Minimizar efeitos adversos do tratamento',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Fotoproteção rigorosa',
            'Cessação do tabagismo',
            'Exercício físico regular',
            'Controle de fatores de risco cardiovascular',
            'Suplementação de vitamina D e cálcio',
            'Vacinação (evitar vacinas vivas em imunossuprimidos)'
          ],
          citations: [{ refId: 'eular-sle-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Antimalárico',
              medicamentos: ['Hidroxicloroquina'],
              posologia: '5mg/kg/dia (máx 400mg/dia). BASE do tratamento - todos devem receber.'
            },
            {
              classe: 'Corticoide',
              medicamentos: ['Prednisona'],
              posologia: 'Dose conforme gravidade: leve 0-7,5mg/dia, moderada 7,5-30mg/dia, grave pulsos IV.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Imunossupressor',
              medicamentos: ['Azatioprina', 'Metotrexato', 'Micofenolato'],
              posologia: 'Conforme manifestação e gravidade. Micofenolato preferido para nefrite.'
            },
            {
              classe: 'Biológico',
              medicamentos: ['Belimumab', 'Rituximabe'],
              posologia: 'Para casos refratários ou graves.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Nefrite lúpica',
              conduta: 'Pulsoterapia com metilprednisolona + micofenolato ou ciclofosfamida. Encaminhar ao nefrologista.'
            },
            {
              situacao: 'Gravidez',
              conduta: 'Manter hidroxicloroquina. Azatioprina é segura. Suspender metotrexato e micofenolato.'
            },
            {
              situacao: 'Síndrome antifosfolípide',
              conduta: 'Anticoagulação conforme indicação (warfarin se trombose prévia).'
            }
          ],
          citations: [{ refId: 'eular-sle-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        duracao: 'Tratamento crônico, ajustado conforme atividade da doença.'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses se ativo, a cada 6 meses se estável',
        examesControle: [
          'Hemograma, função renal, EAS a cada consulta',
          'Complemento e anti-dsDNA para avaliar atividade',
          'Proteinúria se envolvimento renal',
          'Exame oftalmológico anual (hidroxicloroquina)',
          'Densitometria óssea se corticoide crônico'
        ],
        metasTerapeuticas: [
          'Remissão clínica (SLEDAI ≤4)',
          'Prednisona ≤7,5mg/dia',
          'Sem novos flares',
          'Preservação da função renal'
        ],
        criteriosEncaminhamento: [
          'Nefrite lúpica',
          'Manifestações neuropsiquiátricas',
          'Citopenias graves',
          'Refratário ao tratamento inicial',
          'Gravidez em paciente com LES'
        ],
        citations: [{ refId: 'eular-sle-2019', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      prevencao: {
        primaria: [
          'Não há prevenção primária estabelecida',
          'Evitar exposição solar em predispostos'
        ],
        secundaria: [
          'Hidroxicloroquina previne flares',
          'Fotoproteção',
          'Controle de fatores de risco cardiovascular',
          'Vacinação adequada'
        ],
        citations: [{ refId: 'eular-sle-2019', evidenceLevel: 'B', studyType: 'ExpertOpinion' }]
      },
    },
    protocolos: ['protocolo-les'],
    medicamentos: ['hidroxicloroquina', 'prednisona', 'azatioprina', 'micofenolato'],
    calculadoras: ['sledai', 'slicc'],
    rastreamentos: [],
    citations: [{ refId: 'acr-sle-2019', evidenceLevel: 'A', studyType: 'Guideline' }, { refId: 'eular-sle-2019', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2024-12',
    tags: ['lupus', 'les', 'autoimune', 'fan', 'nefrite', 'hidroxicloroquina'],
  },
  {
    id: 'artrite-reumatoide',
    titulo: 'Artrite Reumatoide',
    sinonimos: ['AR', 'Poliartrite reumatoide'],
    doid: 'DOID:7148',
    snomedCT: '69896004',
    meshId: 'D001172',
    umlsCui: 'C0003873',
    ciap2: ['L88'],
    cid10: ['M05', 'M06', 'M06.0', 'M06.9'],
    cid11: ['FA20', 'FA21'],
    // LOINC codes for RA diagnostic workup and monitoring
    loinc: [
      { code: '5041-9', name: 'RF (Rheumatoid Factor)' },
      { code: '32218-0', name: 'Anti-CCP (Anti-cyclic citrullinated peptide)' },
      { code: '53027-8', name: 'Anti-CCP IgG' },
      { code: '4537-7', name: 'ESR (Erythrocyte sedimentation rate)' },
      { code: '1988-5', name: 'CRP (C-reactive protein)' },
      { code: '30522-7', name: 'CRP high sensitivity' },
      { code: '5048-4', name: 'ANA (Antinuclear antibodies) - for overlap syndromes' },
      { code: '718-7', name: 'Hemoglobin' },
      { code: '4544-3', name: 'Hematocrit' },
      { code: '6690-2', name: 'WBC (White blood cell count)' },
      { code: '777-3', name: 'Platelet count' },
      { code: '2160-0', name: 'Creatinine (serum)' },
      { code: '33914-3', name: 'eGFR' },
      { code: '1742-6', name: 'ALT (Alanine aminotransferase)' },
      { code: '1920-8', name: 'AST (Aspartate aminotransferase)' },
      { code: '17861-6', name: 'Calcium (serum)' },
      { code: '1989-3', name: 'Vitamin D (25-hydroxyvitamin D)' },
      { code: '10466-1', name: 'HBsAg (Hepatitis B surface antigen)' },
      { code: '16128-1', name: 'Anti-HCV (Hepatitis C antibody)' },
    ],
    categoria: 'musculoesqueletico',
    quickView: {
      definicao: 'Doença autoimune sistêmica crônica caracterizada por poliartrite simétrica erosiva, afetando predominantemente pequenas articulações das mãos e pés, com potencial para destruição articular e manifestações extra-articulares.',
      criteriosDiagnosticos: [
        'Critérios ACR/EULAR 2010 (score ≥6/10):',
        'Envolvimento articular (0-5 pontos)',
        'Sorologia: FR e/ou anti-CCP (0-3 pontos)',
        'Reagentes de fase aguda: VHS e/ou PCR (0-1 ponto)',
        'Duração dos sintomas ≥6 semanas (1 ponto)',
        'Pelo menos 1 articulação com sinovite clínica definida'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educação do paciente',
          'Fisioterapia e terapia ocupacional',
          'Exercícios de amplitude de movimento',
          'Repouso durante flares',
          'Órteses quando indicado'
        ],
        farmacologico: [
          'Metotrexato 15-25mg/semana (1ª linha - iniciar precocemente)',
          'Ácido fólico 5mg/semana (suplementação obrigatória)',
          'Prednisona 5-10mg/dia como ponte (curto prazo)',
          'Se refratário: associar ou trocar para leflunomida, sulfassalazina ou biológicos'
        ]
      },
      metasTerapeuticas: [
        'Remissão clínica (DAS28 <2,6) ou baixa atividade',
        'Controle precoce (<3-6 meses do diagnóstico)',
        'Ausência de progressão radiológica',
        'Preservação da função'
      ],
      examesIniciais: [
        'FR (Fator Reumatoide) e Anti-CCP',
        'VHS e PCR',
        'Hemograma, função renal e hepática',
        'RX de mãos e pés (baseline)',
        'Sorologias para hepatite B e C (antes de imunossupressão)'
      ],
      redFlags: [
        'Nódulos reumatoides',
        'Vasculite reumatoide',
        'Doença pulmonar intersticial',
        'Subluxação atlantoaxial (risco de compressão medular)',
        'Síndrome de Felty (AR + esplenomegalia + neutropenia)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,5-1% da população mundial',
        incidencia: '20-50/100.000/ano',
        faixaEtaria: 'Pico 40-60 anos, mas pode ocorrer em qualquer idade',
        fatoresRisco: [
          'Sexo feminino (3:1)',
          'História familiar',
          'Tabagismo (principal fator modificável)',
          'HLA-DR4 (shared epitope)',
          'Doença periodontal',
          'Exposição à sílica'
        ],
        citations: [{ refId: 'acr-ra-2021', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      fisiopatologia: {
        texto: 'Inflamação sinovial crônica com proliferação de fibroblastos (pannus), produção de citocinas pró-inflamatórias (TNF-α, IL-6, IL-1), autoanticorpos (FR, anti-CCP) e destruição progressiva de cartilagem e osso por ativação de osteoclastos e metaloproteinases.',
        citations: [{ refId: 'acr-ra-2021', evidenceLevel: 'A', studyType: 'SystematicReview' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Poliartrite simétrica de pequenas articulações',
          'Rigidez matinal prolongada (>60 minutos)',
          'Dor articular inflamatória',
          'Fadiga',
          'Sintomas constitucionais (febre baixa, perda de peso)'
        ],
        sinaisExameFisico: [
          'Sinovite (edema articular, calor, dor à palpação)',
          'Deformidades: desvio ulnar, pescoço de cisne, boutonnière',
          'Nódulos reumatoides (cotovelos, dedos)',
          'Atrofia muscular periarticular',
          'Tenossinovite (especialmente extensores dos dedos)'
        ],
        formasClinicas: [
          'AR soropositiva (FR+/anti-CCP+) - mais agressiva',
          'AR soronegativa',
          'AR de início tardio (>60 anos)',
          'AR com manifestações extra-articulares'
        ],
        citations: [{ refId: 'acr-ra-2021', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Critérios ACR/EULAR 2010',
          'Score ≥6/10 pontos classifica como AR',
          'Importante diagnóstico precoce (janela de oportunidade)'
        ],
        diagnosticoDiferencial: [
          'Lúpus eritematoso sistêmico',
          'Artrite psoriásica',
          'Artrite viral',
          'Osteoartrite erosiva',
          'Artrite por cristais (gota, pseudogota)',
          'Polimialgia reumática'
        ],
        examesLaboratoriais: [
          'FR (sensibilidade 70-80%)',
          'Anti-CCP (especificidade >95%)',
          'VHS e PCR elevados',
          'Anemia de doença crônica',
          'Trombocitose reativa'
        ],
        examesImagem: [
          'RX mãos e pés (erosões periarticulares)',
          'US articular (sinovite, erosões precoces)',
          'RNM (sinovite, edema ósseo precoce)'
        ],
        citations: [{ refId: 'acr-ra-2021', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      tratamento: {
        objetivos: [
          'Remissão ou baixa atividade em 6 meses',
          'Prevenir destruição articular',
          'Preservar função e qualidade de vida',
          'Tratar comorbidades'
        ],
        naoFarmacologico: {
          medidas: [
            'Educação do paciente',
            'Fisioterapia',
            'Terapia ocupacional',
            'Cessação do tabagismo (fundamental)',
            'Exercícios de baixo impacto',
            'Suporte psicológico'
          ],
          citations: [{ refId: 'eular-ra-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'DMARD convencional',
              medicamentos: ['Metotrexato'],
              posologia: 'Iniciar 10-15mg/semana, titular até 25mg. Associar ácido fólico 5mg/semana.'
            },
            {
              classe: 'Corticoide (ponte)',
              medicamentos: ['Prednisona'],
              posologia: '5-10mg/dia como ponte, desmame em 3-6 meses.'
            }
          ],
          segundaLinha: [
            {
              classe: 'DMARD convencional alternativo',
              medicamentos: ['Leflunomida', 'Sulfassalazina', 'Hidroxicloroquina'],
              posologia: 'Leflunomida 20mg/dia. Sulfassalazina 2-3g/dia. Combinação se monoterapia insuficiente.'
            },
            {
              classe: 'DMARD biológico',
              medicamentos: ['Adalimumabe', 'Etanercepte', 'Infliximabe', 'Tocilizumabe', 'Abatacepte'],
              posologia: 'Se falha a DMARDs convencionais. Anti-TNF mais utilizados.'
            },
            {
              classe: 'JAK inibidor',
              medicamentos: ['Tofacitinibe', 'Baricitinibe', 'Upadacitinibe'],
              posologia: 'Alternativa a biológicos. Atenção a eventos cardiovasculares.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Doença pulmonar intersticial',
              conduta: 'Evitar metotrexato. Considerar rituximabe ou abatacepte.'
            },
            {
              situacao: 'Gravidez',
              conduta: 'Suspender metotrexato e leflunomida. Manter sulfassalazina e hidroxicloroquina.'
            }
          ],
          citations: [{ refId: 'eular-ra-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        duracao: 'Tratamento crônico, com ajustes conforme atividade.'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses até remissão, depois a cada 3-6 meses',
        examesControle: [
          'Hemograma, função hepática e renal a cada 4-8 semanas inicialmente',
          'VHS e PCR para monitorar atividade',
          'RX de mãos e pés anual (progressão)',
          'Rastreamento de comorbidades (DCV, osteoporose, infecções)'
        ],
        metasTerapeuticas: [
          'Remissão (DAS28 <2,6) ou baixa atividade (DAS28 <3,2)',
          'Ausência de progressão radiológica',
          'HAQ estável ou melhorando'
        ],
        criteriosEncaminhamento: [
          'Diagnóstico inicial (para confirmação e início de DMARD)',
          'Falha a DMARDs convencionais',
          'Manifestações extra-articulares graves',
          'Necessidade de biológicos'
        ],
        citations: [{ refId: 'eular-ra-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      prevencao: {
        primaria: [
          'Cessação do tabagismo',
          'Tratamento de doença periodontal'
        ],
        secundaria: [
          'Tratamento precoce e agressivo (treat-to-target)',
          'Controle de fatores de risco cardiovascular',
          'Prevenção de osteoporose'
        ],
        citations: [{ refId: 'eular-ra-2022', evidenceLevel: 'B', studyType: 'Cohort' }]
      },
    },
    protocolos: ['protocolo-ar'],
    medicamentos: ['metotrexato', 'leflunomida', 'sulfassalazina', 'prednisona', 'adalimumabe'],
    calculadoras: ['das28', 'cdai', 'sdai', 'haq'],
    rastreamentos: [],
    citations: [{ refId: 'acr-ra-2021', evidenceLevel: 'A', studyType: 'Guideline' }, { refId: 'eular-ra-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2024-12',
    tags: ['artrite-reumatoide', 'ar', 'autoimune', 'metotrexato', 'anti-ccp', 'fator-reumatoide'],
  },
  {
    id: 'osteoporose',
    titulo: 'Osteoporose',
    sinonimos: ['Doença óssea metabólica', 'Fragilidade óssea'],
    doid: 'DOID:11476',
    snomedCT: '64859006',
    meshId: 'D010024',
    umlsCui: 'C0029456',
    ciap2: ['L95'],
    cid10: ['M80', 'M81', 'M82'],
    cid11: ['FB83'],
    // LOINC codes for osteoporosis workup
    loinc: [
      { code: '17861-6', name: 'Calcium (serum)' },
      { code: '2777-1', name: 'Phosphorus (serum)' },
      { code: '1989-3', name: 'Vitamin D (25-hydroxyvitamin D)' },
      { code: '2731-8', name: 'PTH (Parathyroid hormone)' },
      { code: '2132-9', name: 'Vitamin B12' },
      { code: '3016-3', name: 'TSH (Thyroid stimulating hormone)' },
      { code: '2160-0', name: 'Creatinine (serum)' },
      { code: '33914-3', name: 'eGFR' },
      { code: '718-7', name: 'Hemoglobin' },
      { code: '6690-2', name: 'WBC (White blood cell count)' },
      { code: '4537-7', name: 'ESR (Erythrocyte sedimentation rate)' },
      { code: '1988-5', name: 'CRP (C-reactive protein)' },
      { code: '2885-7', name: 'Protein total (serum)' },
      { code: '13986-5', name: 'Albumin (serum)' },
      { code: '1742-6', name: 'ALT (Alanine aminotransferase)' },
      { code: '1920-8', name: 'AST (Aspartate aminotransferase)' },
      { code: '6768-6', name: 'Alkaline phosphatase (ALP)' },
      { code: '11042-0', name: 'Osteocalcin (bone formation marker)' },
      { code: '57368-6', name: 'CTX (C-terminal telopeptide - bone resorption marker)' },
      { code: '46126-1', name: 'P1NP (Procollagen type 1 N-terminal propeptide)' },
      { code: '2502-3', name: 'Transferrin saturation' },
      { code: '2276-4', name: 'Ferritin' },
    ],
    categoria: 'musculoesqueletico',
    quickView: {
      definicao: 'Doença esquelética sistêmica caracterizada por baixa massa óssea e deterioração da microarquitetura do tecido ósseo, levando a fragilidade óssea e aumento do risco de fraturas.',
      criteriosDiagnosticos: [
        'Critérios OMS (densitometria - DXA):',
        'T-score ≤-2,5 DP = Osteoporose',
        'T-score entre -1,0 e -2,5 DP = Osteopenia',
        'Fratura por fragilidade em quadril ou vértebra = Osteoporose clínica',
        'FRAX com alto risco de fratura também indica tratamento'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cálcio 1000-1200mg/dia (dieta + suplemento se necessário)',
          'Vitamina D 800-2000 UI/dia (manter 25(OH)D >30 ng/mL)',
          'Exercício físico com carga (fortalecimento)',
          'Prevenção de quedas',
          'Cessação de tabagismo e álcool'
        ],
        farmacologico: [
          'Bisfosfonatos (1ª linha): Alendronato 70mg/semana OU Risedronato 35mg/semana',
          'Denosumabe 60mg SC semestral (se intolerância ou CI a bisfosfonatos)',
          'Teriparatida para osteoporose grave',
          'TRH em mulheres pós-menopausa precoce (<60 anos)'
        ]
      },
      metasTerapeuticas: [
        'Prevenção de fraturas',
        'Estabilização ou aumento do T-score',
        'Vitamina D ≥30 ng/mL',
        'Redução de risco de quedas'
      ],
      examesIniciais: [
        'Densitometria óssea (DXA) de coluna lombar e fêmur',
        'Cálcio sérico, fósforo, fosfatase alcalina',
        'Vitamina D (25-OH)',
        'PTH se vitamina D baixa ou hipercalcemia',
        'TSH, função renal',
        'Hemograma, VHS (descartar mieloma)'
      ],
      redFlags: [
        'Fratura vertebral aguda com dor intensa',
        'Hipercalcemia (pensar em hiperparatireoidismo ou malignidade)',
        'Perda óssea muito rápida',
        'Osteoporose em homem jovem',
        'Múltiplas fraturas por fragilidade'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10% da população >50 anos, 30-50% das mulheres pós-menopausa',
        incidencia: '200.000 fraturas de quadril/ano no Brasil',
        faixaEtaria: 'Aumenta progressivamente após 50 anos',
        fatoresRisco: [
          'Sexo feminino',
          'Idade avançada',
          'Menopausa precoce',
          'Baixo IMC (<19 kg/m²)',
          'História familiar de fratura de quadril',
          'Corticoterapia crônica',
          'Tabagismo',
          'Alcoolismo',
          'Sedentarismo',
          'Deficiência de vitamina D'
        ],
        citations: [{ refId: 'nof-osteoporosis-2020', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      fisiopatologia: {
        texto: 'Desequilíbrio entre reabsorção (osteoclastos) e formação óssea (osteoblastos), com predomínio de reabsorção. Na pós-menopausa, deficiência de estrogênio aumenta atividade osteoclástica. Fatores contribuintes: deficiência de vitamina D, hiperparatireoidismo secundário, envelhecimento.',
        citations: [{ refId: 'nof-osteoporosis-2020', evidenceLevel: 'A', studyType: 'SystematicReview' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Frequentemente assintomática até ocorrer fratura',
          'Dor após fratura (especialmente vertebral)',
          'Perda de altura (fraturas vertebrais compressivas)',
          'Cifose (corcunda de viúva)',
          'Limitação funcional após fraturas'
        ],
        sinaisExameFisico: [
          'Geralmente normal até ocorrerem fraturas',
          'Cifose dorsal',
          'Redução da altura',
          'Dor à palpação de vértebras (fratura aguda)',
          'Fraqueza muscular pode estar associada'
        ],
        formasClinicas: [
          'Osteoporose pós-menopausa (tipo I)',
          'Osteoporose senil (tipo II)',
          'Osteoporose secundária (corticoides, hiperparatireoidismo, etc.)',
          'Osteoporose masculina'
        ],
        citations: [{ refId: 'nof-osteoporosis-2020', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'DXA: T-score ≤-2,5 DP',
          'Fratura por fragilidade (quadril, vértebra, antebraço)',
          'FRAX elevado mesmo sem T-score de osteoporose'
        ],
        diagnosticoDiferencial: [
          'Osteomalacia',
          'Mieloma múltiplo',
          'Metástases ósseas',
          'Hiperparatireoidismo',
          'Doença de Paget',
          'Osteogênese imperfeita'
        ],
        examesLaboratoriais: [
          'Cálcio sérico (normal na osteoporose primária)',
          'Fósforo',
          'Vitamina D 25(OH)',
          'PTH',
          'Fosfatase alcalina',
          'TSH',
          'Hemograma, VHS, proteínas séricas (descartar mieloma)',
          'Função renal',
          'Marcadores de turnover ósseo (CTX, P1NP) se disponíveis'
        ],
        citations: [{ refId: 'nof-osteoporosis-2020', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir fraturas',
          'Aumentar ou estabilizar massa óssea',
          'Corrigir deficiência de vitamina D',
          'Reduzir risco de quedas'
        ],
        naoFarmacologico: {
          medidas: [
            'Cálcio 1000-1200mg/dia (dieta preferencial)',
            'Vitamina D 800-2000 UI/dia',
            'Exercício físico com carga',
            'Prevenção de quedas (avaliação multifatorial)',
            'Cessação de tabagismo',
            'Moderação no álcool'
          ],
          citations: [{ refId: 'nof-osteoporosis-2020', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Bisfosfonato oral',
              medicamentos: ['Alendronato', 'Risedronato'],
              posologia: 'Alendronato 70mg/semana ou Risedronato 35mg/semana. Em jejum, com água, permanecer em pé 30 min.'
            },
            {
              classe: 'Bisfosfonato IV',
              medicamentos: ['Ácido zoledrônico'],
              posologia: '5mg IV anual. Útil se intolerância GI ou baixa adesão.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Anticorpo monoclonal',
              medicamentos: ['Denosumabe'],
              posologia: '60mg SC a cada 6 meses. Não usar se DRC avançada.'
            },
            {
              classe: 'Anabólico (formador de osso)',
              medicamentos: ['Teriparatida', 'Romosozumabe'],
              posologia: 'Teriparatida 20mcg SC/dia. Para osteoporose grave, múltiplas fraturas. Uso por 2 anos.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'DRC (TFG <30)',
              conduta: 'Evitar bisfosfonatos. Corrigir deficiência de vitamina D primeiro. Considerar denosumabe com cautela.'
            },
            {
              situacao: 'Pós-fratura de quadril',
              conduta: 'Iniciar tratamento assim que estável. Ácido zoledrônico IV tem evidência forte.'
            }
          ],
          citations: [{ refId: 'nof-osteoporosis-2020', evidenceLevel: 'A', studyType: 'RCT' }]
        },
        duracao: '5 anos de bisfosfonatos, depois reavaliar (drug holiday se baixo risco). Denosumabe: não interromper abruptamente.'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses',
        examesControle: [
          'DXA a cada 1-2 anos (inicialmente), depois a cada 2-3 anos se estável',
          'Vitamina D anual',
          'Cálcio sérico',
          'Função renal (se em bisfosfonato)',
          'Altura a cada consulta',
          'RX de coluna se suspeita de fratura vertebral'
        ],
        metasTerapeuticas: [
          'Ausência de novas fraturas',
          'T-score estável ou melhorando',
          'Vitamina D >30 ng/mL',
          'Boa adesão ao tratamento'
        ],
        criteriosEncaminhamento: [
          'Osteoporose em homem jovem (<50 anos)',
          'Osteoporose secundária complexa',
          'Falha terapêutica (novas fraturas em tratamento)',
          'Intolerância a múltiplos tratamentos',
          'Necessidade de teriparatida ou romosozumabe'
        ],
        citations: [{ refId: 'nof-osteoporosis-2020', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      prevencao: {
        primaria: [
          'Ingesta adequada de cálcio e vitamina D desde a juventude',
          'Exercício físico regular com carga',
          'Evitar tabagismo',
          'Uso criterioso de corticoides'
        ],
        secundaria: [
          'Densitometria em populações de risco',
          'Tratamento da osteopenia de alto risco',
          'Prevenção de quedas'
        ],
        citations: [{ refId: 'nof-osteoporosis-2020', evidenceLevel: 'B', studyType: 'Cohort' }]
      },
    },
    protocolos: ['protocolo-osteoporose'],
    medicamentos: ['alendronato', 'risedronato', 'denosumabe', 'calcio', 'vitamina-d'],
    calculadoras: ['frax', 'nogg'],
    rastreamentos: ['rastreamento-osteoporose'],
    citations: [{ refId: 'nof-osteoporosis-2020', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2024-12',
    tags: ['osteoporose', 'fratura', 'densitometria', 'bisfosfonato', 'vitamina-d', 'calcio'],
  },
  {
    id: 'espondilite-anquilosante',
    titulo: 'Espondilite Anquilosante',
    sinonimos: ['EA', 'Espondiloartrite axial', 'Espondilite anquilopoiética'],
    doid: 'DOID:7147',
    snomedCT: '9631008',
    meshId: 'D013167',
    umlsCui: 'C0038013',
    ciap2: ['L88'],
    cid10: ['M45', 'M45.0', 'M45.9'],
    cid11: ['FA92.0'],
    // LOINC codes for ankylosing spondylitis workup
    loinc: [
      { code: '4537-7', name: 'ESR (Erythrocyte sedimentation rate)' },
      { code: '1988-5', name: 'CRP (C-reactive protein)' },
      { code: '30522-7', name: 'CRP high sensitivity' },
      { code: '13303-0', name: 'HLA-B27 (genetic marker)' },
      { code: '718-7', name: 'Hemoglobin' },
      { code: '4544-3', name: 'Hematocrit' },
      { code: '6690-2', name: 'WBC (White blood cell count)' },
      { code: '5048-4', name: 'ANA (to exclude other conditions)' },
      { code: '5041-9', name: 'RF (Rheumatoid Factor - typically negative)' },
      { code: '2160-0', name: 'Creatinine (serum)' },
      { code: '1742-6', name: 'ALT' },
      { code: '1920-8', name: 'AST' },
    ],
    categoria: 'musculoesqueletico',
    quickView: {
      definicao: 'Espondiloartrite axial crônica caracterizada por inflamação das articulações sacroilíacas e coluna vertebral, podendo evoluir para anquilose (fusão óssea). Faz parte do espectro das espondiloartrites.',
      criteriosDiagnosticos: [
        'Critérios ASAS para espondiloartrite axial:',
        'Dor lombar crônica (≥3 meses) com início <45 anos',
        'Sacroileíte em imagem (RX ou RNM) + ≥1 característica de SpA, OU',
        'HLA-B27 positivo + ≥2 características de SpA',
        'Características: dor lombar inflamatória, artrite, entesite, uveíte, dactilite, psoríase, DII, boa resposta a AINE, PCR elevada, HLA-B27'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Exercício físico regular (especialmente natação)',
          'Fisioterapia com ênfase em extensão da coluna',
          'Cessação do tabagismo',
          'Manutenção da postura'
        ],
        farmacologico: [
          'AINEs em dose plena (1ª linha): Naproxeno, Indometacina, Celecoxibe',
          'Se falha a 2 AINEs por 4 semanas cada: Anti-TNF (Adalimumabe, Etanercepte)',
          'Sulfassalazina 2-3g/dia apenas se artrite periférica',
          'Metotrexato NÃO é eficaz para doença axial'
        ]
      },
      metasTerapeuticas: [
        'Controle da dor e rigidez',
        'Manutenção da mobilidade espinhal',
        'ASDAS <1,3 (remissão) ou <2,1 (baixa atividade)',
        'Prevenção de dano estrutural'
      ],
      examesIniciais: [
        'PCR e VHS',
        'HLA-B27',
        'RX de sacroilíacas e coluna',
        'RNM de sacroilíacas se RX normal',
        'Hemograma, função renal e hepática'
      ],
      redFlags: [
        'Uveíte aguda (encaminhar urgente à oftalmologia)',
        'Fratura vertebral (coluna rígida é frágil)',
        'Síndrome da cauda equina',
        'Doença pulmonar restritiva (fibrose apical)',
        'Insuficiência aórtica'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,1-1,4% da população',
        incidencia: '7/100.000/ano',
        faixaEtaria: 'Início típico 15-30 anos',
        fatoresRisco: [
          'Sexo masculino (2-3:1)',
          'HLA-B27 positivo (90-95% dos pacientes)',
          'História familiar de espondiloartrite',
          'Infecções gastrointestinais ou geniturinárias prévias'
        ],
        citations: [{ refId: 'asas-spa-2016', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      fisiopatologia: {
        texto: 'Inflamação crônica nas ênteses (inserções de tendões e ligamentos no osso) e articulações sacroilíacas/coluna. Processo inflamatório mediado por IL-17 e TNF-α leva à formação óssea reativa (sindesmófitos) e eventual anquilose. Forte associação com HLA-B27.',
        citations: [{ refId: 'asas-spa-2016', evidenceLevel: 'A', studyType: 'SystematicReview' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor lombar inflamatória (insidiosa, >3 meses, melhora com exercício, piora com repouso)',
          'Rigidez matinal prolongada (>30 minutos)',
          'Dor noturna (acordar na 2ª metade da noite)',
          'Fadiga',
          'Dor glútea alternante'
        ],
        sinaisExameFisico: [
          'Redução da mobilidade da coluna lombar',
          'Teste de Schober diminuído',
          'Redução da expansibilidade torácica',
          'Retificação da lordose lombar',
          'Hipercifose dorsal em casos avançados',
          'Entesite (especialmente calcâneo)'
        ],
        formasClinicas: [
          'Espondiloartrite axial não radiográfica (RNM+ / RX-)',
          'Espondilite anquilosante (RX com sacroileíte definida)',
          'Espondiloartrite com manifestações extra-articulares'
        ],
        citations: [{ refId: 'asas-spa-2016', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Critérios ASAS para SpA axial',
          'RNM de sacroilíacas pode detectar doença precoce',
          'HLA-B27 positivo em >90% dos casos'
        ],
        diagnosticoDiferencial: [
          'Dor lombar mecânica',
          'Hérnia de disco',
          'Artrite psoriásica',
          'Artrite reativa',
          'Espondiloartrite associada a DII',
          'Hiperostose esquelética idiopática difusa (DISH)'
        ],
        examesLaboratoriais: [
          'PCR e VHS (podem estar normais em 40%)',
          'HLA-B27',
          'Hemograma',
          'Função renal e hepática'
        ],
        examesImagem: [
          'RX de bacia (sacroilíacas) e coluna',
          'RNM de sacroilíacas (edema ósseo precoce)',
          'RX de coluna em fases avançadas (coluna em bambu)'
        ],
        citations: [{ refId: 'asas-spa-2016', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      tratamento: {
        objetivos: [
          'Controlar dor e inflamação',
          'Preservar mobilidade espinhal',
          'Prevenir anquilose',
          'Manter qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Exercício físico diário (fundamental)',
            'Fisioterapia especializada',
            'Natação e hidroterapia',
            'Cessação do tabagismo (acelera progressão)',
            'Educação postural'
          ],
          citations: [{ refId: 'asas-eular-2016', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'AINE',
              medicamentos: ['Naproxeno', 'Indometacina', 'Celecoxibe', 'Etoricoxibe'],
              posologia: 'Dose plena contínua se sintomático. Naproxeno 500mg 12/12h ou Celecoxibe 200mg 12/12h.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Anti-TNF',
              medicamentos: ['Adalimumabe', 'Etanercepte', 'Infliximabe', 'Golimumabe', 'Certolizumabe'],
              posologia: 'Se falha a ≥2 AINEs por 4 semanas cada. Adalimumabe 40mg SC quinzenal.'
            },
            {
              classe: 'Inibidor de IL-17',
              medicamentos: ['Secuquinumabe', 'Ixequizumabe'],
              posologia: 'Alternativa a anti-TNF ou se falha.'
            },
            {
              classe: 'JAK inibidor',
              medicamentos: ['Upadacitinibe', 'Tofacitinibe'],
              posologia: 'Opção se falha a biológicos.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Artrite periférica associada',
              conduta: 'Sulfassalazina 2-3g/dia pode ajudar. Anti-TNF também eficaz.'
            },
            {
              situacao: 'Uveíte recorrente',
              conduta: 'Preferir anti-TNF monoclonal (adalimumabe, infliximabe). Etanercepte menos eficaz para uveíte.'
            }
          ],
          citations: [{ refId: 'asas-eular-2016', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        duracao: 'Tratamento crônico.'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: [
          'PCR e VHS',
          'Avaliação da mobilidade espinhal (Schober, expansibilidade torácica)',
          'ASDAS ou BASDAI',
          'RX de coluna a cada 2-3 anos se doença ativa',
          'Exame oftalmológico se sintomas oculares'
        ],
        metasTerapeuticas: [
          'ASDAS <1,3 (remissão) ou <2,1 (baixa atividade)',
          'BASDAI <4',
          'Preservação da mobilidade',
          'Ausência de manifestações extra-articulares'
        ],
        criteriosEncaminhamento: [
          'Diagnóstico inicial (reumatologista)',
          'Falha a AINEs (considerar biológico)',
          'Uveíte (oftalmologista urgente)',
          'Suspeita de fratura vertebral',
          'Manifestações extra-articulares graves'
        ],
        citations: [{ refId: 'asas-eular-2016', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      prevencao: {
        primaria: [
          'Não há prevenção primária estabelecida'
        ],
        secundaria: [
          'Tratamento precoce',
          'Exercício regular',
          'Cessação do tabagismo',
          'Controle de comorbidades'
        ],
        citations: [{ refId: 'asas-eular-2016', evidenceLevel: 'B', studyType: 'ExpertOpinion' }]
      },
    },
    protocolos: ['protocolo-ea'],
    medicamentos: ['naproxeno', 'indometacina', 'celecoxibe', 'adalimumabe', 'etanercepte'],
    calculadoras: ['basdai', 'asdas', 'basfi'],
    rastreamentos: [],
    citations: [{ refId: 'asas-spa-2016', evidenceLevel: 'A', studyType: 'Guideline' }, { refId: 'asas-eular-2016', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2024-12',
    tags: ['espondilite', 'espondiloartrite', 'hla-b27', 'sacroileite', 'dor-lombar-inflamatoria'],
  },
];
