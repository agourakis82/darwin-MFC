/**
 * DOENÇAS INFECCIOSAS - DARWIN-MFC
 * =================================
 * 
 * Ontologias integradas:
 * - DOID (Disease Ontology)
 * - SNOMED-CT (Systematized Nomenclature of Medicine)
 * - MeSH (Medical Subject Headings)
 * - UMLS CUI (Unified Medical Language System)
 */

import { Doenca } from '../../types/doenca';

export const doencasInfecciosas: Doenca[] = [
  {
    id: 'infeccao-trato-urinario',
    titulo: 'Infecção do Trato Urinário',
    sinonimos: ['ITU', 'Cistite', 'Pielonefrite', 'Infecção urinária'],
    doid: 'DOID:13148',
    snomedCT: '68566005',
    meshId: 'D014552',
    umlsCui: 'C0042029',
    ciap2: ['U71', 'U70'],
    cid10: ['N39.0', 'N10', 'N30'],
    cid11: ['GC08', 'GB60'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Infecção bacteriana do trato urinário, classificada como cistite (baixa) ou pielonefrite (alta). E. coli é o agente em 80-90% dos casos não complicados.',
      criteriosDiagnosticos: [
        'CISTITE: Disúria + Polaciúria + Urgência + Dor suprapúbica',
        'Urina turva ou odor fétido',
        'Ausência de febre/dor lombar (cistite)',
        'PIELONEFRITE: Febre + Dor lombar + Sinal de Giordano positivo',
        'Sintomas de cistite podem ou não estar presentes',
        'EAS: Piúria (>10 leucócitos/campo), nitrito +, esterase leucocitária +',
        'Urocultura: >100.000 UFC/mL (ou >1.000 em sintomáticos)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação adequada',
          'Esvaziamento vesical frequente',
          'Higiene adequada (limpar frente para trás)'
        ],
        farmacologico: [
          'CISTITE NÃO COMPLICADA (mulher):',
          'Fosfomicina 3g dose única (1ª escolha) OU',
          'Nitrofurantoína 100mg 6/6h por 5 dias OU',
          'Sulfametoxazol-Trimetoprima 800/160mg 12/12h por 3 dias',
          '',
          'PIELONEFRITE LEVE (ambulatorial):',
          'Ciprofloxacino 500mg 12/12h por 7 dias OU',
          'Ceftriaxona 1g IM/IV + Cefuroxima VO por 10-14 dias'
        ]
      },
      metasTerapeuticas: [
        'Resolução dos sintomas em 24-48h',
        'Erradicação bacteriana',
        'Prevenção de recorrência',
        'Evitar progressão para sepse'
      ],
      examesIniciais: [
        'EAS (urina tipo I)',
        'Urocultura + antibiograma (se complicada, recorrente, homem, gestante, falha tratamento)',
        'Hemograma, creatinina, PCR (se pielonefrite)',
        'USG rins e vias urinárias (se pielonefrite ou suspeita de complicação)'
      ],
      redFlags: [
        'Febre alta, toxemia (sepse urinária)',
        'Vômitos (internação para ATB IV)',
        'Dor lombar intensa, massa palpável',
        'Anúria ou oligúria',
        'Imunossupressão, DM descompensado, gestante',
        'Homem (sempre considerar complicada)',
        'ITU de repetição (≥3/ano)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '11% das mulheres/ano têm cistite',
        incidencia: '150 milhões de casos/ano no mundo',
        faixaEtaria: 'Mais comum em mulheres em idade reprodutiva',
        fatoresRisco: [
          'Sexo feminino (uretra curta)',
          'Atividade sexual',
          'Uso de espermicidas',
          'Cateterismo vesical',
          'Menopausa (atrofia vaginal)',
          'Diabetes mellitus',
          'Obstrução urinária',
          'Gravidez'
        ],
        citations: [{ refId: 'idsa-itu-2011' }]
      },
      fisiopatologia: {
        texto: 'Colonização periuretral por uropatógenos intestinais (principalmente E. coli uropatogênica) que ascendem pela uretra até a bexiga. Adesinas bacterianas (fímbrias P) permitem adesão ao urotélio. Pielonefrite ocorre por ascensão ao trato superior.',
        citations: [{ refId: 'idsa-itu-2011' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Disúria (dor/ardência ao urinar)',
          'Polaciúria (aumento da frequência)',
          'Urgência urinária',
          'Dor suprapúbica (cistite)',
          'Febre, calafrios (pielonefrite)',
          'Dor lombar (pielonefrite)'
        ],
        sinaisExameFisico: [
          'Sensibilidade suprapúbica (cistite)',
          'Febre (pielonefrite)',
          'Punho-percussão lombar positiva (Giordano)',
          'Ausência de corrimento vaginal'
        ],
        formasClinicas: [
          'ITU não complicada (cistite em mulher saudável)',
          'ITU complicada (homem, gestante, cateter, DM, alteração anatômica)',
          'Pielonefrite aguda',
          'ITU recorrente (≥3/ano ou ≥2 em 6 meses)',
          'Bacteriúria assintomática (só tratar em gestante/pré-procedimento)'
        ],
        citations: [{ refId: 'idsa-itu-2011' }]
      },
      diagnostico: {
        criterios: [
          'Clínico (cistite não complicada): pode tratar empiricamente',
          'EAS: piúria, nitrito, esterase',
          'Urocultura: >100.000 UFC/mL'
        ],
        diagnosticoDiferencial: [
          'Vaginite/vaginose',
          'Uretrite (DST: clamídia, gonorreia)',
          'Prostatite',
          'Síndrome da bexiga dolorosa',
          'Nefrolitíase',
          'Apendicite (dor suprapúbica)'
        ],
        examesLaboratoriais: [
          'EAS (sumário de urina)',
          'Urocultura + antibiograma',
          'Hemograma, PCR (pielonefrite)',
          'Função renal'
        ],
        citations: [{ refId: 'idsa-itu-2011' }]
      },
      tratamento: {
        objetivos: [
          'Erradicar infecção',
          'Aliviar sintomas',
          'Prevenir complicações',
          'Prevenir recorrência'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratação',
            'Esvaziamento vesical frequente',
            'Evitar espermicidas'
          ],
          citations: [{ refId: 'idsa-itu-2011' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Cistite não complicada',
              medicamentos: ['Fosfomicina', 'Nitrofurantoína', 'SMX-TMP'],
              posologia: 'Fosfomicina 3g dose única. Nitrofurantoína 100mg 6/6h 5d. SMX-TMP 800/160mg 12/12h 3d.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Fluoroquinolona (reservar)',
              medicamentos: ['Ciprofloxacino', 'Norfloxacino'],
              posologia: 'Ciprofloxacino 500mg 12/12h 3 dias. Reservar para pielonefrite ou resistência.'
            },
            {
              classe: 'Pielonefrite ambulatorial',
              medicamentos: ['Ciprofloxacino', 'Ceftriaxona'],
              posologia: 'Cipro 500mg 12/12h 7d. Ceftriaxona 1g IM/IV 1x + oral por 10-14d.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Gestante',
              conduta: 'Nitrofurantoína (evitar 3º tri), Cefalexina, Amoxicilina. Tratamento obrigatório, 7 dias. Urocultura de controle.'
            },
            {
              situacao: 'ITU recorrente',
              conduta: 'Profilaxia: Nitrofurantoína 50-100mg/noite OU SMX-TMP 400/80mg/noite. Ou profilaxia pós-coito.'
            }
          ],
          citations: [{ refId: 'idsa-itu-2011' }]
        },
        duracao: 'Cistite: 1-5 dias. Pielonefrite: 7-14 dias.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliação em 48-72h se sintomas persistirem',
        examesControle: [
          'Urocultura de controle apenas em gestante ou sintomas persistentes',
          'Não repetir EAS/urocultura de rotina'
        ],
        metasTerapeuticas: [
          'Resolução de sintomas',
          'Urocultura negativa (quando indicada)'
        ],
        criteriosEncaminhamento: [
          'Pielonefrite com vômitos/toxemia (internação)',
          'ITU recorrente para investigação',
          'Homem jovem com ITU',
          'Suspeita de alteração anatômica'
        ],
        citations: [{ refId: 'idsa-itu-2011' }]
      },
      prevencao: {
        primaria: [
          'Hidratação',
          'Micção pós-coito',
          'Higiene adequada'
        ],
        secundaria: [
          'Profilaxia antibiótica (se recorrente)',
          'Estrogênio tópico (pós-menopausa)'
        ],
        citations: []
      },
    },
    protocolos: ['itu-manejo'],
    medicamentos: ['fosfomicina', 'nitrofurantoina', 'sulfametoxazol-trimetoprima', 'ciprofloxacino'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'idsa-itu-2011' }],
    lastUpdate: '2024-12',
    tags: ['itu', 'cistite', 'pielonefrite', 'disuria', 'e-coli'],
  },
  {
    id: 'faringoamigdalite',
    titulo: 'Faringoamigdalite Aguda',
    sinonimos: ['Amigdalite', 'Faringite', 'Dor de garganta'],
    doid: 'DOID:2608',
    snomedCT: '90176007',
    meshId: 'D010612',
    umlsCui: 'C0031350',
    ciap2: ['R76', 'R72'],
    cid10: ['J02', 'J03'],
    cid11: ['CA02'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Inflamação aguda da faringe e/ou amígdalas. Etiologia viral (70-80%) ou bacteriana (15-30%, principalmente Streptococcus pyogenes - GAS). Importante diferenciar para evitar ATB desnecessário ou não tratar febre reumática.',
      criteriosDiagnosticos: [
        'CRITÉRIOS DE CENTOR (modificado por McIsaac):',
        '+1: Exsudato ou edema tonsilar',
        '+1: Linfonodomegalia cervical anterior dolorosa',
        '+1: Febre >38°C (história ou medida)',
        '+1: Ausência de tosse',
        '+1: Idade 3-14 anos / -1: Idade ≥45 anos',
        '',
        'Score 0-1: Baixo risco (não testar, não tratar)',
        'Score 2-3: Risco intermediário (considerar teste rápido)',
        'Score ≥4: Alto risco (tratar empiricamente ou confirmar com teste)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação',
          'Alimentação leve',
          'Gargarejos com água morna e sal',
          'Repouso'
        ],
        farmacologico: [
          'SINTOMÁTICO (todos):',
          'Paracetamol 500-1000mg 6/6h OU Ibuprofeno 400mg 8/8h',
          '',
          'SE BACTERIANA (GAS):',
          'Penicilina Benzatina 1.200.000 UI IM dose única (1ª escolha) OU',
          'Amoxicilina 500mg 8/8h por 10 dias OU',
          'Alérgicos: Azitromicina 500mg/dia por 3-5 dias'
        ]
      },
      metasTerapeuticas: [
        'Alívio sintomático em 24-48h',
        'Erradicação do GAS (se bacteriana)',
        'Prevenção de febre reumática (ATB até 9 dias do início)',
        'Prevenção de complicações supurativas (abscesso)'
      ],
      examesIniciais: [
        'Teste rápido para Streptococcus (RADT) se disponível',
        'Cultura de orofaringe (padrão-ouro, mas demora)',
        'Hemograma, PCR apenas se dúvida ou complicação',
        'ASLO não útil para diagnóstico agudo (elevação tardia)'
      ],
      redFlags: [
        'Trismo (dificuldade de abrir a boca) - abscesso periamigdaliano',
        'Abaulamento unilateral da amígdala/palato',
        'Disfagia grave com sialorreia',
        'Estridor ou dificuldade respiratória',
        'Toxemia, febre persistente apesar de ATB',
        'Sintomas unilaterais persistentes (descartar neoplasia em adulto)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '11 milhões de consultas/ano por dor de garganta no Brasil',
        incidencia: 'Pico em inverno e início da primavera',
        faixaEtaria: 'Mais comum em crianças 5-15 anos (GAS)',
        fatoresRisco: [
          'Idade escolar',
          'Contato com casos confirmados',
          'Aglomerações',
          'Tabagismo passivo',
          'IVAS recente'
        ],
        citations: [{ refId: 'idsa-pharyngitis-2012' }]
      },
      fisiopatologia: {
        texto: 'Vírus (rinovírus, adenovírus, EBV) ou bactérias (S. pyogenes/GAS) infectam epitélio faríngeo. GAS produz toxinas e enzimas que causam inflamação local intensa. Risco de febre reumática (mimetismo molecular) e glomerulonefrite pós-estreptocócica.',
        citations: [{ refId: 'idsa-pharyngitis-2012' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Odinofagia (dor ao engolir)',
          'Febre',
          'Cefaleia',
          'Mal-estar',
          'Dor abdominal (crianças)',
          'Rash escarlatiniforme (escarlatina)'
        ],
        sinaisExameFisico: [
          'Hiperemia de orofaringe',
          'Amígdalas aumentadas com exsudato',
          'Petéquias em palato',
          'Linfonodomegalia cervical anterior',
          'Ausência de coriza, tosse (sugere bacteriana)'
        ],
        formasClinicas: [
          'Faringite viral (mais comum)',
          'Faringoamigdalite estreptocócica (GAS)',
          'Mononucleose infecciosa (EBV)',
          'Herpangina (Coxsackie)',
          'Escarlatina (GAS + exantema)'
        ],
        citations: [{ refId: 'idsa-pharyngitis-2012' }]
      },
      diagnostico: {
        criterios: [
          'Critérios de Centor/McIsaac para estratificação',
          'Teste rápido para GAS (sensibilidade 70-90%)',
          'Cultura de orofaringe (padrão-ouro)'
        ],
        diagnosticoDiferencial: [
          'IVAS viral',
          'Mononucleose infecciosa',
          'Difteria (raro)',
          'Abscesso periamigdaliano',
          'Epiglotite',
          'Refluxo laringofaríngeo'
        ],
        examesLaboratoriais: [
          'Teste rápido para Streptococcus',
          'Cultura de orofaringe',
          'Monoteste (se suspeita de mono)',
          'Hemograma (linfocitose atípica na mono)'
        ],
        citations: [{ refId: 'idsa-pharyngitis-2012' }]
      },
      tratamento: {
        objetivos: [
          'Aliviar sintomas',
          'Prevenir febre reumática (se GAS)',
          'Prevenir complicações supurativas',
          'Evitar antibiótico desnecessário (viral)'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratação',
            'Repouso',
            'Alimentação fria/pastosa',
            'Gargarejos'
          ],
          citations: [{ refId: 'idsa-pharyngitis-2012' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Penicilina (se GAS)',
              medicamentos: ['Penicilina Benzatina', 'Amoxicilina'],
              posologia: 'Pen Benzatina: 1.200.000 UI IM DU (600.000 UI se <27kg). Amoxicilina: 500mg 8/8h ou 875mg 12/12h 10 dias.'
            },
            {
              classe: 'Analgésico/antipirético',
              medicamentos: ['Paracetamol', 'Ibuprofeno'],
              posologia: 'Paracetamol 500-1000mg 6/6h. Ibuprofeno 400mg 8/8h.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Alérgicos à penicilina',
              medicamentos: ['Azitromicina', 'Claritromicina', 'Cefalexina'],
              posologia: 'Azitromicina 500mg/dia 3-5d. Cefalexina 500mg 12/12h 10d (se alergia leve).'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Mononucleose',
              conduta: 'Apenas suporte. NÃO usar amoxicilina (rash!).'
            },
            {
              situacao: 'Abscesso periamigdaliano',
              conduta: 'Drenagem + ATB IV. Encaminhamento urgente ORL.'
            }
          ],
          citations: [{ refId: 'idsa-pharyngitis-2012' }]
        },
        duracao: 'ATB para GAS: 10 dias (exceto azitromicina 3-5d ou Pen Benzatina DU).'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno se piora ou sem melhora em 48-72h',
        examesControle: [
          'Não é necessário cultura de controle',
          'Não dosar ASLO rotineiramente'
        ],
        metasTerapeuticas: [
          'Resolução de sintomas',
          'Ausência de complicações'
        ],
        criteriosEncaminhamento: [
          'Abscesso periamigdaliano (ORL urgente)',
          'Amigdalite recorrente (≥7/ano para amigdalectomia)',
          'Estridor ou obstrução de via aérea'
        ],
        citations: [{ refId: 'idsa-pharyngitis-2012' }]
      },
      prevencao: {
        primaria: [
          'Higiene das mãos',
          'Evitar compartilhamento de utensílios'
        ],
        secundaria: [
          'Profilaxia secundária de febre reumática (se história prévia)',
          'Penicilina Benzatina 1.200.000 UI IM a cada 21 dias'
        ],
        citations: []
      },
    },
    protocolos: ['centor-score'],
    medicamentos: ['penicilina-benzatina', 'amoxicilina', 'azitromicina', 'paracetamol'],
    calculadoras: ['centor'],
    rastreamentos: [],
    citations: [{ refId: 'idsa-pharyngitis-2012' }],
    lastUpdate: '2024-12',
    tags: ['faringite', 'amigdalite', 'streptococcus', 'dor-garganta', 'centor'],
  },
  {
    id: 'dengue',
    titulo: 'Dengue',
    sinonimos: ['Febre dengue', 'Dengue hemorrágica', 'Dengue grave'],
    doid: 'DOID:11205',
    snomedCT: '38362002',
    meshId: 'D003715',
    umlsCui: 'C0011311',
    ciap2: ['A77'],
    cid10: ['A90', 'A91'],
    cid11: ['1D20'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Arbovirose causada pelo vírus dengue (DENV 1-4), transmitida pelo Aedes aegypti. Espectro clínico amplo: febre indiferenciada a dengue grave com choque e hemorragia. Brasil é hiperendêmico.',
      criteriosDiagnosticos: [
        'CASO SUSPEITO: Febre (2-7 dias) + ≥2 dos seguintes em área endêmica:',
        'Mialgia, artralgia, cefaleia retro-orbitária',
        'Exantema maculopapular',
        'Prostração intensa',
        'Petéquias/prova do laço positiva',
        'Náuseas/vômitos',
        '',
        'CONFIRMAÇÃO: NS1 (até 5º dia) ou IgM (após 6º dia) ou PCR'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação oral vigorosa (60-80 mL/kg/dia)',
          'Repouso',
          'Orientação sobre sinais de alarme'
        ],
        farmacologico: [
          'Paracetamol 500-750mg 6/6h (NÃO usar AINEs/AAS!)',
          'Dipirona 500-1000mg 6/6h (analgésico/antipirético alternativo)',
          'Antieméticos: Metoclopramida, Ondansetrona',
          '',
          'HIDRATAÇÃO CONFORME GRUPO:',
          'A: 60 mL/kg/dia VO ambulatorial',
          'B (com risco ou comorbidade): 60-80 mL/kg/dia, observação 6-8h',
          'C (sinais de alarme): Hidratação IV 10-20 mL/kg em 1h, repetir se necessário',
          'D (choque): Expansão 20 mL/kg em 20 min, UTI'
        ]
      },
      metasTerapeuticas: [
        'Manter hidratação adequada (diurese ≥0,5 mL/kg/h)',
        'Evitar progressão para dengue grave',
        'Reconhecer sinais de alarme precocemente',
        'Recuperação sem sequelas'
      ],
      examesIniciais: [
        'Hemograma com plaquetas (hemoconcentração, plaquetopenia)',
        'NS1 (até 5º dia de sintomas)',
        'Sorologia IgM/IgG (após 6º dia)',
        'TGO, TGP, albumina se sinais de alarme',
        'Prova do laço'
      ],
      redFlags: [
        'SINAIS DE ALARME (indicam dengue grave iminente):',
        'Dor abdominal intensa e contínua',
        'Vômitos persistentes',
        'Acúmulo de líquidos (ascite, derrame pleural)',
        'Sangramento de mucosas',
        'Letargia ou irritabilidade',
        'Hepatomegalia >2cm',
        'Aumento progressivo do hematócrito',
        'Queda abrupta de plaquetas'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Brasil: país com maior número de casos no mundo',
        incidencia: 'Milhões de casos/ano, picos epidêmicos cíclicos',
        faixaEtaria: 'Todas as idades, gravidade pode ser maior em extremos',
        fatoresRisco: [
          'Residir em área endêmica',
          'Infecção prévia por outro sorotipo (risco de grave)',
          'Crianças e idosos (maior gravidade)',
          'Comorbidades',
          'Gestantes'
        ],
        citations: [{ refId: 'ms-dengue-2024' }]
      },
      fisiopatologia: {
        texto: 'Vírus inoculado por Aedes aegypti infecta células dendríticas e monócitos. Viremia provoca febre. Na fase crítica (defervescência), aumento de permeabilidade capilar por resposta imune (citocinas, complemento) leva a extravasamento plasmático. Anticorpos heterotípicos de infecção prévia podem potencializar infecção (ADE).',
        citations: [{ refId: 'ms-dengue-2024' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Febre alta de início súbito (2-7 dias)',
          'Cefaleia intensa, retro-orbitária',
          'Mialgia ("febre quebra-ossos")',
          'Artralgia',
          'Exantema (3º-4º dia, maculopapular)',
          'Prostração intensa',
          'Náuseas, vômitos, anorexia'
        ],
        sinaisExameFisico: [
          'Febre',
          'Exantema maculopapular pruriginoso',
          'Prova do laço positiva (≥20 petéquias em 2,5cm²)',
          'Petéquias espontâneas',
          'Hepatomegalia (sinal de gravidade)',
          'Efusões (ascite, derrame pleural) - fase crítica'
        ],
        formasClinicas: [
          'Dengue sem sinais de alarme (maioria)',
          'Dengue com sinais de alarme',
          'Dengue grave (choque, hemorragia grave, disfunção orgânica)'
        ],
        citations: [{ refId: 'ms-dengue-2024' }]
      },
      diagnostico: {
        criterios: [
          'Clínico-epidemiológico + laboratorial',
          'NS1 antígeno (1º-5º dia): sensibilidade 60-90%',
          'IgM (após 6º dia): permanece positivo semanas',
          'PCR: padrão-ouro, identifica sorotipo'
        ],
        diagnosticoDiferencial: [
          'Chikungunya',
          'Zika',
          'Leptospirose',
          'COVID-19',
          'Influenza',
          'Febre maculosa',
          'Meningococcemia'
        ],
        examesLaboratoriais: [
          'Hemograma (hemoconcentração: Ht ↑20%, plaquetopenia)',
          'NS1 ou IgM',
          'TGO, TGP, albumina (casos moderados/graves)',
          'Coagulograma (suspeita de hemorragia)',
          'Eletrólitos, função renal'
        ],
        citations: [{ refId: 'ms-dengue-2024' }]
      },
      tratamento: {
        objetivos: [
          'Manter hidratação',
          'Reconhecer sinais de alarme',
          'Prevenir e tratar choque',
          'Evitar uso de AINEs'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratação oral vigorosa',
            'Repouso',
            'Retorno imediato se sinais de alarme',
            'Notificação compulsória'
          ],
          citations: [{ refId: 'ms-dengue-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Analgésico/antipirético',
              medicamentos: ['Paracetamol', 'Dipirona'],
              posologia: 'Paracetamol 500-750mg 6/6h. Dipirona 500-1000mg 6/6h. NÃO usar AAS ou AINEs!'
            },
            {
              classe: 'Hidratação (Grupo A)',
              medicamentos: ['Soro oral'],
              posologia: '60 mL/kg/dia (1/3 salina + 2/3 líquidos). Ambulatorial.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Hidratação IV (Grupos C/D)',
              medicamentos: ['SF 0,9%', 'Ringer Lactato'],
              posologia: 'C: 10-20 mL/kg em 1h, reavaliar. D (choque): 20 mL/kg em 20 min bolus.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Gestante',
              conduta: 'Internação precoce, monitorização fetal. Maior risco de hemorragia.'
            },
            {
              situacao: 'Dengue grave com hemorragia',
              conduta: 'Transfusão de hemácias/plaquetas conforme indicação. UTI.'
            }
          ],
          citations: [{ refId: 'ms-dengue-2024' }]
        },
        duracao: 'Fase aguda: 7-10 dias. Convalescença: semanas.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Diário até 48h após defervescência (fase crítica)',
        examesControle: [
          'Hemograma diário na fase crítica',
          'Hematócrito seriado',
          'Reavaliação clínica'
        ],
        metasTerapeuticas: [
          'Estabilidade hemodinâmica',
          'Diurese adequada',
          'Recuperação de plaquetas'
        ],
        criteriosEncaminhamento: [
          'Sinais de alarme (observação/internação)',
          'Dengue grave (UTI)',
          'Gestante',
          'Comorbidades descompensadas'
        ],
        citations: [{ refId: 'ms-dengue-2024' }]
      },
      prevencao: {
        primaria: [
          'Controle do vetor (eliminar criadouros)',
          'Uso de repelentes',
          'Telas e mosquiteiros',
          'Vacinação (Qdenga - soropositivos)'
        ],
        secundaria: [
          'Vigilância epidemiológica',
          'Notificação compulsória'
        ],
        citations: []
      },
    },
    protocolos: ['dengue-classificacao'],
    medicamentos: ['paracetamol', 'dipirona', 'metoclopramida'],
    calculadoras: ['prova-laco'],
    rastreamentos: [],
    citations: [{ refId: 'ms-dengue-2024' }],
    lastUpdate: '2024-12',
    tags: ['dengue', 'arbovirose', 'aedes', 'febre', 'hidratacao'],
  }
];

