/**
 * DOENÇAS MUSCULOESQUELÉTICAS - DARWIN-MFC
 * =========================================
 * 
 * Ontologias integradas:
 * - DOID (Disease Ontology)
 * - SNOMED-CT (Systematized Nomenclature of Medicine)
 * - MeSH (Medical Subject Headings)
 * - UMLS CUI (Unified Medical Language System)
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
        citations: [{ refId: 'oarsi-2019' }]
      },
      fisiopatologia: {
        texto: 'Desequilíbrio entre síntese e degradação da matriz cartilaginosa, com perda progressiva de cartilagem hialina, esclerose óssea subcondral, formação de osteófitos e sinovite secundária. Envolve fatores mecânicos e bioquímicos.',
        citations: [{ refId: 'oarsi-2019' }]
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
        citations: [{ refId: 'oarsi-2019' }]
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
        citations: [{ refId: 'oarsi-2019' }]
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
          citations: [{ refId: 'oarsi-2019' }]
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
          citations: [{ refId: 'oarsi-2019' }]
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
        citations: [{ refId: 'oarsi-2019' }]
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
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['paracetamol', 'ibuprofeno', 'diclofenaco', 'duloxetina'],
    calculadoras: ['womac', 'koos'],
    rastreamentos: [],
    citations: [{ refId: 'oarsi-2019' }],
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
        citations: [{ refId: 'acr-fibro-2016' }]
      },
      fisiopatologia: {
        texto: 'Sensibilização central com amplificação do processamento da dor no SNC. Disfunção de sistemas moduladores descendentes (serotonina, noradrenalina). Alterações do sono não-REM. Fatores psicossociais modulam a expressão clínica.',
        citations: [{ refId: 'acr-fibro-2016' }]
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
        citations: [{ refId: 'acr-fibro-2016' }]
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
        citations: [{ refId: 'acr-fibro-2016' }]
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
          citations: [{ refId: 'eular-fibro-2017' }]
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
          citations: [{ refId: 'eular-fibro-2017' }]
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
        citations: [{ refId: 'eular-fibro-2017' }]
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
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['amitriptilina', 'duloxetina', 'pregabalina', 'ciclobenzaprina'],
    calculadoras: ['fiq'],
    rastreamentos: [],
    citations: [{ refId: 'acr-fibro-2016' }, { refId: 'eular-fibro-2017' }],
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
        citations: [{ refId: 'acr-gout-2020' }]
      },
      fisiopatologia: {
        texto: 'Hiperuricemia crônica leva à supersaturação e precipitação de cristais de urato monossódico em articulações e tecidos. Os cristais ativam o inflamassoma NLRP3, liberando IL-1β e desencadeando inflamação aguda intensa.',
        citations: [{ refId: 'acr-gout-2020' }]
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
        citations: [{ refId: 'acr-gout-2020' }]
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
        citations: [{ refId: 'acr-gout-2020' }]
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
          citations: [{ refId: 'acr-gout-2020' }]
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
          citations: [{ refId: 'acr-gout-2020' }]
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
        citations: [{ refId: 'acr-gout-2020' }]
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
        citations: []
      },
    },
    protocolos: ['protocolo-gota'],
    medicamentos: ['colchicina', 'alopurinol', 'naproxeno', 'prednisona'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'acr-gout-2020' }],
    lastUpdate: '2024-12',
    tags: ['gota', 'acido-urico', 'artrite', 'alopurinol', 'podagra'],
  }
];

