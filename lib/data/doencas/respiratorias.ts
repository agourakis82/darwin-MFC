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
    ciap2: ['R95'],
    cid10: ['J44', 'J44.0', 'J44.1', 'J44.9'],
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
        citations: [{ refId: 'gold-2024' }]
      },
      fisiopatologia: {
        texto: 'Inflamação crônica das vias aéreas e parênquima pulmonar induzida por inalação de partículas nocivas, principalmente fumaça de cigarro. Resulta em bronquite crônica (hipersecreção de muco) e/ou enfisema (destruição alveolar), levando a limitação fixa ao fluxo aéreo.',
        citations: [{ refId: 'gold-2024' }]
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
        citations: [{ refId: 'gold-2024' }]
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
        citations: [{ refId: 'gold-2024' }]
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
          citations: [{ refId: 'gold-2024' }]
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
          citations: [{ refId: 'gold-2024' }]
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
        citations: [{ refId: 'gold-2024' }]
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
        citations: [{ refId: 'gold-2024' }]
      },
    },
    protocolos: ['protocolo-dpoc'],
    medicamentos: ['tiotropio', 'formoterol', 'salbutamol', 'beclometasona'],
    calculadoras: ['gold-copd', 'bode-index'],
    rastreamentos: [],
    citations: [{ refId: 'gold-2024' }],
    lastUpdate: '2024-12',
    tags: ['dpoc', 'enfisema', 'bronquite', 'tabagismo', 'dispneia'],
  },
  {
    id: 'pneumonia-comunitaria',
    titulo: 'Pneumonia Adquirida na Comunidade',
    sinonimos: ['PAC', 'Pneumonia comunitária', 'Pneumonia'],
    ciap2: ['R81'],
    cid10: ['J18', 'J15', 'J13', 'J14'],
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
        citations: [{ refId: 'sbpt-pac-2022' }]
      },
      fisiopatologia: {
        texto: 'Infecção do parênquima pulmonar por microorganismos (bactérias, vírus, fungos). Os mais comuns são Streptococcus pneumoniae, Haemophilus influenzae, Mycoplasma pneumoniae e vírus respiratórios. A resposta inflamatória causa consolidação alveolar e comprometimento das trocas gasosas.',
        citations: [{ refId: 'sbpt-pac-2022' }]
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
        citations: [{ refId: 'sbpt-pac-2022' }]
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
        citations: [{ refId: 'sbpt-pac-2022' }]
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
          citations: [{ refId: 'sbpt-pac-2022' }]
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
          citations: [{ refId: 'sbpt-pac-2022' }]
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
        citations: [{ refId: 'sbpt-pac-2022' }]
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
        citations: [{ refId: 'sbpt-pac-2022' }]
      },
    },
    protocolos: ['protocolo-pac'],
    medicamentos: ['amoxicilina', 'azitromicina', 'levofloxacino'],
    calculadoras: ['curb-65', 'psi-port'],
    rastreamentos: [],
    citations: [{ refId: 'sbpt-pac-2022' }],
    lastUpdate: '2024-12',
    tags: ['pneumonia', 'pac', 'infeccao-respiratoria', 'tosse', 'febre'],
  },
  {
    id: 'rinite-alergica',
    titulo: 'Rinite Alérgica',
    sinonimos: ['Rinite', 'Alergia nasal', 'Febre do feno'],
    ciap2: ['R97'],
    cid10: ['J30', 'J30.1', 'J30.4'],
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
        citations: [{ refId: 'aria-2020' }]
      },
      fisiopatologia: {
        texto: 'Reação de hipersensibilidade tipo I mediada por IgE. Após sensibilização, a reexposição ao alérgeno desencadeia degranulação de mastócitos e liberação de histamina, leucotrienos e citocinas, causando os sintomas.',
        citations: [{ refId: 'aria-2020' }]
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
        citations: [{ refId: 'aria-2020' }]
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
        citations: [{ refId: 'aria-2020' }]
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
          citations: [{ refId: 'aria-2020' }]
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
          citations: [{ refId: 'aria-2020' }]
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
        citations: [{ refId: 'aria-2020' }]
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
        citations: [{ refId: 'aria-2020' }]
      },
    },
    protocolos: [],
    medicamentos: ['loratadina', 'cetirizina', 'budesonida-nasal'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'aria-2020' }],
    lastUpdate: '2024-12',
    tags: ['rinite', 'alergia', 'espirros', 'coriza', 'anti-histaminico'],
  }
];

