/**
 * DOENCAS UROLOGICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ======================================================
 * Doencas do trato urinario, prostata e sistema reprodutor masculino
 *
 * Ontologias utilizadas:
 * - DOID (Disease Ontology)
 * - SNOMED-CT (Systematized Nomenclature of Medicine)
 * - MeSH (Medical Subject Headings)
 * - UMLS CUI (Unified Medical Language System)
 * - ORDO (Orphanet Rare Disease Ontology)
 * - CID-10/CID-11
 * - CIAP-2
 */

import { Doenca } from '@/lib/types/doenca';

export const urologicasAvancadas: Doenca[] = [
  // ============================================================================
  // DOENCAS DA PROSTATA
  // ============================================================================
  {
    id: 'hiperplasia-prostatica-benigna',
    titulo: 'Hiperplasia Prostatica Benigna',
    sinonimos: ['HPB', 'HBP', 'Aumento benigno da prostata', 'BPH', 'Benign Prostatic Hyperplasia'],
    doid: 'DOID:11089',
    snomedCT: '266569009',
    meshId: 'D011470',
    umlsCui: 'C0005001',
    ciap2: ['Y85'],
    cid10: ['N40'],
    cid11: ['GA90.0'],
    hpo: ['HP:0008711', 'HP:0000016'],
    loinc: ['19195-7', '2857-1'],
    categoria: 'urologico',
    subcategoria: 'prostata',
    quickView: {
      definicao: 'Crescimento benigno da zona de transicao da prostata, causando obstrucao infravesical e sintomas do trato urinario inferior (LUTS). Prevalencia aumenta com idade: 50% aos 60 anos, 90% aos 85 anos.',
      criteriosDiagnosticos: [
        'Sintomas do trato urinario inferior (LUTS) obstrutivos e irritativos',
        'Escore IPSS (International Prostate Symptom Score) >= 8',
        'Toque retal: prostata aumentada, lisa, elastica, sulco mediano preservado',
        'PSA geralmente <4ng/mL (pode estar elevado proporcionalmente ao volume)',
        'Fluxometria: Qmax <15mL/s sugere obstrucao',
        'USG: volume prostatico aumentado (>30mL), residuo pos-miccional',
        'Excluir cancer de prostata, prostatite, estenose uretral'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Vigilancia ativa se sintomas leves (IPSS <8)',
          'Restricao hidrica noturna',
          'Evitar cafeina e alcool',
          'Miccao programada (dupla miccao)',
          'Revisar medicamentos (anticolinergicos, descongestionantes)'
        ],
        farmacologico: [
          'ALFA-BLOQUEADORES (primeira linha): Tansulosina 0,4mg/dia, Doxazosina 2-8mg/dia',
          'INIBIDORES 5-ALFA-REDUTASE (prostata >40mL): Finasterida 5mg/dia, Dutasterida 0,5mg/dia',
          'TERAPIA COMBINADA (sintomas moderados-graves + prostata grande): Alfa-bloqueador + I5AR',
          'ANTICOLINERGICOS (se sintomas predominantes de armazenamento): Oxibutinina, Tolterodina',
          'INIBIDORES PDE5 (se disfuncao eretil associada): Tadalafila 5mg/dia'
        ]
      },
      metasTerapeuticas: [
        'Reducao de IPSS >= 3 pontos',
        'Melhora do fluxo urinario (Qmax >15mL/s)',
        'Reducao do residuo pos-miccional (<50mL)',
        'Prevencao de complicacoes (retencao, ITU, litiase)'
      ],
      examesIniciais: [
        'PSA total',
        'Creatinina serica',
        'EAS e urocultura',
        'USG de vias urinarias com medida de residuo',
        'IPSS (questionario)',
        'Toque retal'
      ],
      examesSeguimento: [
        'PSA anual',
        'IPSS a cada consulta',
        'Fluxometria se disponivel'
      ],
      redFlags: [
        'Retencao urinaria aguda',
        'Hematuria macroscopica',
        'Insuficiencia renal',
        'ITU de repeticao',
        'Litiase vesical',
        'PSA elevado ou toque retal suspeito (encaminhar para excluir cancer)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '50% aos 60 anos, 70% aos 70 anos, 90% aos 85 anos',
        incidencia: 'Aumenta progressivamente apos 40 anos',
        faixaEtaria: 'Homens >50 anos; raro antes dos 40',
        fatoresRisco: [
          'Idade avancada (principal fator)',
          'Historia familiar',
          'Obesidade e sindrome metabolica',
          'Diabetes mellitus',
          'Dieta ocidental',
          'Baixa atividade fisica'
        ],
        citations: [{ refId: 'aua-bph-guidelines-2023' }]
      },
      fisiopatologia: {
        texto: 'Proliferacao de celulas epiteliais e estromais na zona de transicao da prostata, mediada por DHT (di-hidrotestosterona) via 5-alfa-redutase tipo 2. Componente estatico (aumento do volume) e dinamico (tono do musculo liso mediado por receptores alfa-1) causam obstrucao. Hiperatividade do detrusor pode desenvolver-se secundariamente.',
        citations: [{ refId: 'eau-luts-2024' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'SINTOMAS OBSTRUTIVOS: jato fraco, hesitacao, intermitencia, sensacao de esvaziamento incompleto, gotejamento terminal',
          'SINTOMAS IRRITATIVOS (armazenamento): frequencia, urgencia, nocturia, incontinencia de urgencia',
          'Nocturia (sintoma mais frequente)',
          'Impacto significativo na qualidade de vida'
        ],
        sinaisExameFisico: [
          'Toque retal: prostata aumentada (>30g), superficie lisa, elastica',
          'Sulco mediano preservado',
          'Indolor a palpacao',
          'Bexiga palpavel se retencao',
          'Exame neurologico normal'
        ],
        formasClinicas: [
          'Sintomas leves (IPSS 1-7): vigilancia',
          'Sintomas moderados (IPSS 8-19): tratamento farmacologico',
          'Sintomas graves (IPSS 20-35): considerar cirurgia'
        ],
        citations: [{ refId: 'aua-bph-guidelines-2023' }]
      },
      diagnostico: {
        criterios: [
          'LUTS em homem >50 anos',
          'Toque retal compativel',
          'Exclusao de outras causas'
        ],
        diagnosticoDiferencial: [
          'Cancer de prostata',
          'Prostatite cronica',
          'Estenose uretral',
          'Bexiga hiperativa',
          'Bexiga neurogenica',
          'Calculo vesical'
        ],
        examesLaboratoriais: [
          'PSA total (estratificacao de risco)',
          'Creatinina',
          'EAS e urocultura'
        ],
        examesImagem: [
          'USG de vias urinarias com residuo pos-miccional',
          'USG transretal (opcional - medida precisa do volume)'
        ],
        outrosExames: [
          'IPSS (questionario validado)',
          'Diario miccional',
          'Fluxometria',
          'Estudo urodinamico (casos selecionados)'
        ],
        citations: [{ refId: 'eau-luts-2024' }]
      },
      tratamento: {
        objetivos: [
          'Aliviar sintomas',
          'Melhorar qualidade de vida',
          'Prevenir complicacoes',
          'Preservar funcao renal'
        ],
        naoFarmacologico: {
          medidas: [
            'Vigilancia ativa se IPSS <8',
            'Restricao hidrica a noite',
            'Evitar cafeina e alcool',
            'Miccao programada',
            'Revisar medicamentos (anticolinergicos, simpatomiméticos)'
          ],
          citations: [{ refId: 'aua-bph-guidelines-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Alfa-bloqueadores', medicamentos: ['Tansulosina', 'Doxazosina', 'Alfuzosina'], posologia: 'Tansulosina 0,4mg/dia; Doxazosina 2-8mg/dia', observacoes: 'Inicio de acao rapido; atencao a hipotensao ortostatica' },
            { classe: 'Inibidores 5-alfa-redutase', medicamentos: ['Finasterida', 'Dutasterida'], posologia: 'Finasterida 5mg/dia; Dutasterida 0,5mg/dia', observacoes: 'Para prostata >40mL; efeito em 3-6 meses; reduz PSA em 50%' }
          ],
          segundaLinha: [
            { classe: 'Terapia combinada', medicamentos: ['Tansulosina + Dutasterida', 'Doxazosina + Finasterida'], posologia: 'Doses habituais de cada droga', observacoes: 'Superior a monoterapia em prostatas grandes' },
            { classe: 'Antimuscarinicos', medicamentos: ['Oxibutinina', 'Tolterodina', 'Solifenacina'], posologia: 'Oxibutinina 5-15mg/dia', observacoes: 'Para sintomas de armazenamento; cuidado com retencao' }
          ],
          situacoesEspeciais: [
            { situacao: 'HPB + disfuncao eretil', conduta: 'Tadalafila 5mg/dia (aprovada para ambos)' },
            { situacao: 'Retencao urinaria aguda', conduta: 'Cateterismo + alfa-bloqueador; tentativa de retirada em 1-3 dias' },
            { situacao: 'Falha do tratamento clinico', conduta: 'RTUP, enucleacao a laser, prostatectomia simples' }
          ],
          citations: [{ refId: 'aua-bph-guidelines-2023' }]
        },
        duracao: 'Continuo; reavaliacao anual'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses se estavel; mais frequente se iniciando tratamento',
        examesControle: [
          'PSA anual',
          'IPSS a cada consulta',
          'Creatinina anual',
          'Residuo pos-miccional'
        ],
        metasTerapeuticas: [
          'IPSS <8 ou reducao >=3 pontos',
          'Qmax >15mL/s',
          'Residuo <50mL'
        ],
        criteriosEncaminhamento: [
          'PSA elevado ou toque suspeito (urologia - excluir cancer)',
          'Retencao urinaria',
          'ITU de repeticao',
          'Hematuria',
          'Insuficiencia renal',
          'Refratario a tratamento clinico'
        ],
        citations: [{ refId: 'eau-luts-2024' }]
      },
      prevencao: {
        primaria: [
          'Manutencao de peso saudavel',
          'Atividade fisica regular',
          'Dieta rica em vegetais'
        ],
        secundaria: [
          'Tratamento precoce dos sintomas',
          'Acompanhamento regular'
        ],
        citations: [{ refId: 'aua-bph-guidelines-2023' }]
      },
      populacoesEspeciais: {
        idosos: 'Cuidado com hipotensao ortostatica (alfa-bloqueadores); ajuste de dose renal',
        drc: 'Monitorar funcao renal; pode ser causa de nefropatia obstrutiva'
      }
    },
    protocolos: ['hpb-manejo-aps', 'luts-masculino'],
    medicamentos: ['tansulosina', 'doxazosina', 'finasterida', 'dutasterida'],
    calculadoras: ['ipss', 'volume-prostatico'],
    rastreamentos: ['cancer-prostata'],
    citations: [{ refId: 'aua-bph-guidelines-2023' }, { refId: 'eau-luts-2024' }],
    lastUpdate: '2026-01',
    tags: ['prostata', 'HPB', 'LUTS', 'alfa-bloqueador', 'finasterida']
  },

  {
    id: 'prostatite-cronica-cpps',
    titulo: 'Prostatite Cronica / Sindrome da Dor Pelvica Cronica',
    sinonimos: ['CPPS', 'Prostatite tipo III', 'Chronic Prostatitis', 'Chronic Pelvic Pain Syndrome'],
    doid: 'DOID:3763',
    snomedCT: '9713002',
    meshId: 'D011472',
    umlsCui: 'C0033581',
    ciap2: ['Y77'],
    cid10: ['N41.1'],
    cid11: ['GA02.1'],
    hpo: ['HP:0100607'],
    categoria: 'urologico',
    subcategoria: 'prostata',
    quickView: {
      definicao: 'Sindrome caracterizada por dor pelvica ou perineal por >=3 meses, com ou sem sintomas urinarios, na ausencia de infeccao bacteriana demonstravel. Tipo IIIA (inflamatorio) ou IIIB (nao inflamatorio).',
      criteriosDiagnosticos: [
        'Dor ou desconforto pelvico/perineal >=3 meses',
        'Sintomas urinarios (frequencia, urgencia, disuria)',
        'Dor a ejaculacao frequente',
        'Ausencia de bacteriuria significativa',
        'Tipo IIIA: leucocitos em secrecao prostatica (EPS) ou semen',
        'Tipo IIIB: ausencia de leucocitos significativos',
        'Exclusao de prostatite bacteriana, cancer, estenose, bexiga neurogenica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educacao sobre natureza benigna da condicao',
          'Fisioterapia do assoalho pelvico (relaxamento)',
          'Evitar cafeina, alcool, alimentos picantes',
          'Atividade fisica regular',
          'Tecnicas de relaxamento e manejo de estresse',
          'Banhos de assento mornos'
        ],
        farmacologico: [
          'ALFA-BLOQUEADORES: Tansulosina 0,4mg/dia (6 semanas minimo)',
          'ANTI-INFLAMATORIOS: Ibuprofeno 400-600mg 3x/dia',
          'ANTIDEPRESSIVOS (dor neuropatica): Amitriptilina 10-50mg/noite',
          'FITOTERAPIA: Serenoa repens, Quercetina',
          'ANTIBIOTICO (trial de 4-6 semanas se nao tratado previamente): Ciprofloxacino, SMZ-TMP'
        ]
      },
      metasTerapeuticas: [
        'Reducao da dor (escala visual analogica)',
        'Melhora do escore NIH-CPSI',
        'Melhora da qualidade de vida',
        'Reducao dos sintomas urinarios'
      ],
      examesIniciais: [
        'EAS e urocultura',
        'PSA (geralmente normal; pode estar levemente elevado)',
        'Teste de Meares-Stamey ou teste simplificado (EPS)',
        'Espermocultura se indicado',
        'USG de vias urinarias'
      ],
      redFlags: [
        'Febre (sugere prostatite bacteriana aguda)',
        'Retencao urinaria',
        'PSA muito elevado',
        'Toque retal nodular ou petreo',
        'Hematospermia persistente'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '8-15% dos homens ao longo da vida; pico 35-50 anos',
        incidencia: 'Representa 90% dos casos de prostatite',
        faixaEtaria: '35-50 anos (mais comum); pode ocorrer em qualquer idade',
        fatoresRisco: [
          'Historia de prostatite bacteriana previa',
          'Estresse psicologico',
          'Historia de ISTs',
          'Trauma perineal (ciclismo prolongado)',
          'Disfuncao do assoalho pelvico'
        ],
        citations: [{ refId: 'eau-prostatitis-2024' }]
      },
      fisiopatologia: {
        texto: 'Etiologia multifatorial: disfuncao neuromuscular do assoalho pelvico, inflamacao neurogenica, refluxo urinario intraprostatico, disfuncao do eixo hipotalamo-hipofise-adrenal (estresse), e possivelmente infeccao bacteriana oculta. Sensibilizacao central pode perpetuar a dor.',
        citations: [{ refId: 'juro-cpps-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor pelvica, perineal, suprapubica',
          'Dor peniana (ponta do penis)',
          'Dor testicular/escrotal',
          'Dor lombar baixa',
          'Dor a ejaculacao (muito caracteristico)',
          'Sintomas urinarios: frequencia, urgencia, jato fraco'
        ],
        sinaisExameFisico: [
          'Toque retal: prostata pode ser dolorosa ou normal',
          'Dor a palpacao de musculos do assoalho pelvico',
          'Ausencia de sinais de infeccao sistemica',
          'Exame neurologico normal'
        ],
        formasClinicas: [
          'CPPS inflamatorio (IIIA): leucocitos em secrecao prostatica',
          'CPPS nao-inflamatorio (IIIB): sem leucocitos',
          'Fenotipos UPOINT: urinario, psicossocial, orgao-especifico, infeccao, neurologico, sensibilidade'
        ],
        citations: [{ refId: 'eau-prostatitis-2024' }]
      },
      diagnostico: {
        criterios: [
          'Dor pelvica cronica >=3 meses',
          'Ausencia de bacteriuria',
          'Exclusao de outras causas',
          'Teste de Meares-Stamey (4 copos) ou simplificado (2 copos)'
        ],
        diagnosticoDiferencial: [
          'Prostatite bacteriana cronica (tipo II)',
          'Hiperplasia prostatica benigna',
          'Cancer de prostata',
          'Estenose uretral',
          'Cistite intersticial/sindrome da bexiga dolorosa',
          'Neuralgia pudenda',
          'Hernia inguinal'
        ],
        examesLaboratoriais: [
          'EAS e urocultura (negativos)',
          'PSA (geralmente normal)',
          'Espermocultura',
          'Secrecao prostatica expressada (EPS)'
        ],
        examesImagem: [
          'USG de vias urinarias',
          'RM de pelve se duvida diagnostica'
        ],
        citations: [{ refId: 'juro-cpps-2022' }]
      },
      tratamento: {
        objetivos: [
          'Alivio da dor',
          'Melhora dos sintomas urinarios',
          'Melhora da qualidade de vida',
          'Tratar conforme fenotipo UPOINT'
        ],
        naoFarmacologico: {
          medidas: [
            'Fisioterapia do assoalho pelvico (liberacao miofascial)',
            'Acupuntura',
            'Terapia cognitivo-comportamental',
            'Evitar gatilhos (cafeina, alcool, ciclismo prolongado)',
            'Atividade fisica regular',
            'Manejo do estresse'
          ],
          citations: [{ refId: 'eau-prostatitis-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Alfa-bloqueadores', medicamentos: ['Tansulosina', 'Alfuzosina'], posologia: 'Tansulosina 0,4mg/dia por 6-12 semanas', observacoes: 'Mais eficaz se nao usado previamente' },
            { classe: 'Anti-inflamatorios', medicamentos: ['Ibuprofeno', 'Celecoxibe'], posologia: 'Ibuprofeno 400mg 3x/dia', observacoes: 'Cursos curtos' }
          ],
          segundaLinha: [
            { classe: 'Antidepressivos triciclicos', medicamentos: ['Amitriptilina', 'Nortriptilina'], posologia: 'Amitriptilina 10-50mg a noite', observacoes: 'Para componente neuropatico' },
            { classe: 'Fitoterapicos', medicamentos: ['Serenoa repens', 'Quercetina', 'Bee pollen'], posologia: 'Serenoa 320mg/dia', observacoes: 'Evidencia limitada mas seguro' }
          ],
          situacoesEspeciais: [
            { situacao: 'Nunca tratado com antibiotico', conduta: 'Trial de fluoroquinolona 4-6 semanas' },
            { situacao: 'Componente miofascial predominante', conduta: 'Fisioterapia pelvica especializada' },
            { situacao: 'Componente psicologico importante', conduta: 'TCC + considerar antidepressivo' }
          ],
          citations: [{ refId: 'juro-cpps-2022' }]
        },
        duracao: 'Tratamento prolongado; abordagem multimodal'
      },
      acompanhamento: {
        frequenciaConsultas: 'Inicialmente mensal; apos a cada 2-3 meses',
        examesControle: [
          'NIH-CPSI (questionario de sintomas)',
          'EAS se sintomas urinarios'
        ],
        metasTerapeuticas: [
          'Reducao de 6 pontos no NIH-CPSI',
          'Melhora subjetiva do paciente',
          'Retorno as atividades normais'
        ],
        criteriosEncaminhamento: [
          'Refratario a tratamento inicial',
          'Dor severa incapacitante',
          'Necessidade de fisioterapia especializada',
          'Componente psicologico significativo'
        ],
        citations: [{ refId: 'eau-prostatitis-2024' }]
      }
    },
    protocolos: ['prostatite-cronica-aps', 'dor-pelvica-masculina'],
    medicamentos: ['tansulosina', 'amitriptilina', 'ibuprofeno'],
    calculadoras: ['nih-cpsi'],
    rastreamentos: [],
    citations: [{ refId: 'eau-prostatitis-2024' }, { refId: 'juro-cpps-2022' }],
    lastUpdate: '2026-01',
    tags: ['prostatite', 'CPPS', 'dor pelvica', 'alfa-bloqueador']
  },

  // ============================================================================
  // INCONTINENCIA E DISFUNCAO VESICAL
  // ============================================================================
  {
    id: 'incontinencia-urinaria-esforco',
    titulo: 'Incontinencia Urinaria de Esforco',
    sinonimos: ['IUE', 'Stress Urinary Incontinence', 'SUI'],
    doid: 'DOID:13504',
    snomedCT: '165232002',
    meshId: 'D014550',
    umlsCui: 'C0042025',
    ciap2: ['U04'],
    cid10: ['N39.3'],
    cid11: ['MF51.0'],
    hpo: ['HP:0000020'],
    categoria: 'urologico',
    subcategoria: 'incontinencia',
    quickView: {
      definicao: 'Perda involuntaria de urina aos esforcos fisicos que aumentam a pressao intra-abdominal (tosse, espirro, exercicio, levantar peso), sem contracao involuntaria do detrusor. Mais comum em mulheres, relacionada a fraqueza do assoalho pelvico.',
      criteriosDiagnosticos: [
        'Perda urinaria sincrona com esforco (tosse, espirro, exercicio)',
        'Ausencia de urgencia associada',
        'Teste do estresse positivo (observacao de perda ao tossir com bexiga cheia)',
        'Diario miccional: perdas relacionadas a esforcos',
        'Estudo urodinamico: demonstra IUE (casos selecionados)',
        'Exclusao de infeccao, fistula, incontinencia de urgencia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'FISIOTERAPIA PELVICA: Exercicios de Kegel (primeira linha)',
          'Treinamento supervisionado com biofeedback',
          'Perda de peso se sobrepeso/obesidade',
          'Dispositivos pessarios (opcao para quem nao deseja cirurgia)',
          'Evitar cafeina e tabagismo',
          'Regularizar habito intestinal'
        ],
        farmacologico: [
          'DULOXETINA 40mg 2x/dia (off-label no Brasil; aprovada na Europa)',
          'Nao ha medicamentos altamente eficazes para IUE',
          'Estrogeno topico vaginal em mulheres pos-menopausa (adjuvante)',
          'CIRURGIA se refrataria: sling de uretra media (TVT, TOT)'
        ]
      },
      metasTerapeuticas: [
        'Reducao de 50% nos episodios de perda',
        'Melhora da qualidade de vida (ICIQ-SF)',
        'Capacidade de realizar atividades sem perda',
        'Continencia social'
      ],
      examesIniciais: [
        'EAS e urocultura',
        'Diario miccional 3 dias',
        'Pad test (teste do absorvente) 1h ou 24h',
        'Residuo pos-miccional',
        'Avaliacao do assoalho pelvico'
      ],
      redFlags: [
        'Hematuria',
        'Incontinencia continua (fistula?)',
        'Dor pelvica significativa',
        'Prolapso genital acentuado',
        'Falha de cirurgia previa',
        'Suspeita de fistula vesico-vaginal'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '25-45% das mulheres adultas; 10-15% IUE pura',
        incidencia: 'Aumenta com idade e paridade',
        faixaEtaria: 'Mais comum 40-60 anos; pode ocorrer em qualquer idade',
        fatoresRisco: [
          'Partos vaginais (principal)',
          'Obesidade',
          'Idade avancada',
          'Deficiencia estrogenica',
          'Cirurgias pelvicas previas',
          'Tosse cronica (DPOC)',
          'Constipacao cronica',
          'Exercicios de alto impacto'
        ],
        citations: [{ refId: 'ics-continence-2023' }]
      },
      fisiopatologia: {
        texto: 'Incompetencia do mecanismo esfincteriano uretral devido a hipermobilidade uretral (perda do suporte) e/ou deficiencia esfincteriana intrinseca. Dano a fascia endopelvica, musculos levantadores e nervo pudendo durante parto contribuem. A pressao intra-abdominal excede a pressao de fechamento uretral.',
        citations: [{ refId: 'eau-incontinence-2024' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Perda urinaria ao tossir, espirrar, rir',
          'Perda ao exercicio fisico, correr, pular',
          'Perda ao levantar peso',
          'Ausencia de urgencia precedendo a perda',
          'Geralmente pequenos volumes por episodio'
        ],
        sinaisExameFisico: [
          'Teste de esforco positivo (perda visivel ao tossir)',
          'Hipermobilidade uretral (Q-tip test)',
          'Avaliacao de prolapso genital (POP-Q)',
          'Forca muscular do assoalho pelvico (Oxford scale)',
          'Reflexos sacros normais'
        ],
        formasClinicas: [
          'IUE por hipermobilidade uretral (mais comum)',
          'IUE por deficiencia esfincteriana intrinseca (mais grave)',
          'Incontinencia mista (IUE + urgencia)'
        ],
        citations: [{ refId: 'ics-continence-2023' }]
      },
      diagnostico: {
        criterios: [
          'Historia clinica tipica',
          'Teste de esforco positivo',
          'Diario miccional compativel',
          'Urodinamica reservada para casos complexos'
        ],
        diagnosticoDiferencial: [
          'Incontinencia de urgencia',
          'Incontinencia mista',
          'Incontinencia por transbordamento',
          'Fistula vesico-vaginal',
          'Diverticulo uretral',
          'Ectopia ureteral'
        ],
        examesLaboratoriais: [
          'EAS e urocultura',
          'Glicemia (se suspeita DM)'
        ],
        examesImagem: [
          'USG de vias urinarias (residuo)',
          'RM de pelve se suspeita de fistula'
        ],
        outrosExames: [
          'Estudo urodinamico (pre-operatorio ou casos complexos)',
          'Cistoscopia se hematuria'
        ],
        citations: [{ refId: 'eau-incontinence-2024' }]
      },
      tratamento: {
        objetivos: [
          'Reduzir ou eliminar perdas',
          'Melhorar qualidade de vida',
          'Evitar cirurgia quando possivel'
        ],
        naoFarmacologico: {
          medidas: [
            'Fisioterapia do assoalho pelvico (3-6 meses)',
            'Exercicios de Kegel supervisionados',
            'Biofeedback e eletroestimulacao',
            'Perda de peso (5-10%)',
            'Pessarios (opcao conservadora)',
            'Evitar cafeina e tabagismo'
          ],
          citations: [{ refId: 'nice-incontinence-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'IRSN', medicamentos: ['Duloxetina'], posologia: 'Duloxetina 40mg 2x/dia', observacoes: 'Off-label; evidencia moderada; nausea comum' }
          ],
          segundaLinha: [
            { classe: 'Estrogeno topico', medicamentos: ['Estriol creme vaginal', 'Promestrieno'], posologia: 'Aplicacao vaginal diaria por 2 sem, depois 2x/sem', observacoes: 'Adjuvante em pos-menopausa' }
          ],
          situacoesEspeciais: [
            { situacao: 'Falha do tratamento conservador', conduta: 'Sling de uretra media (TVT, TOT) - taxa de cura 70-90%' },
            { situacao: 'Deficiencia esfincteriana intrinseca', conduta: 'Sling ou agentes de preenchimento' },
            { situacao: 'IUE + prolapso significativo', conduta: 'Correcao simultanea do prolapso' }
          ],
          citations: [{ refId: 'eau-incontinence-2024' }]
        },
        duracao: 'Fisioterapia: 3-6 meses; cirurgia se refrataria'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal durante fisioterapia; a cada 3-6 meses apos',
        examesControle: [
          'Diario miccional',
          'Pad test',
          'ICIQ-SF (questionario de qualidade de vida)'
        ],
        metasTerapeuticas: [
          'Reducao >=50% das perdas',
          'Melhora da qualidade de vida',
          'Satisfacao da paciente'
        ],
        criteriosEncaminhamento: [
          'Falha de fisioterapia apos 3-6 meses',
          'Candidata a cirurgia',
          'Prolapso genital associado',
          'Incontinencia recorrente apos cirurgia'
        ],
        citations: [{ refId: 'nice-incontinence-2019' }]
      }
    },
    protocolos: ['incontinencia-urinaria-feminina'],
    medicamentos: ['duloxetina', 'estriol-topico'],
    calculadoras: ['iciq-sf', 'pad-test'],
    rastreamentos: [],
    citations: [{ refId: 'eau-incontinence-2024' }, { refId: 'nice-incontinence-2019' }],
    lastUpdate: '2026-01',
    tags: ['incontinencia', 'esforco', 'Kegel', 'sling', 'assoalho pelvico']
  },

  {
    id: 'bexiga-hiperativa',
    titulo: 'Bexiga Hiperativa',
    sinonimos: ['OAB', 'Overactive Bladder', 'Sindrome da Bexiga Hiperativa'],
    doid: 'DOID:0060578',
    snomedCT: '236648007',
    meshId: 'D053201',
    umlsCui: 'C0878773',
    ciap2: ['U04', 'U13'],
    cid10: ['N32.81'],
    cid11: ['MF52.1'],
    hpo: ['HP:0000017', 'HP:0000019'],
    categoria: 'urologico',
    subcategoria: 'incontinencia',
    quickView: {
      definicao: 'Sindrome caracterizada por urgencia urinaria, com ou sem incontinencia de urgencia, geralmente com frequencia e nocturia, na ausencia de infeccao ou outra patologia evidente. Resulta de hiperatividade do musculo detrusor.',
      criteriosDiagnosticos: [
        'URGENCIA: desejo subito e imperioso de urinar, dificil de adiar',
        'Frequencia urinaria aumentada (>=8 miccoes/dia)',
        'Nocturia (>=1 miccao noturna)',
        'Com ou sem incontinencia de urgencia',
        'Ausencia de infeccao urinaria',
        'Exclusao de outras causas (litiase, tumor, neurologica)',
        'Urodinamica: contracao involuntaria do detrusor (opcional)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Modificacao comportamental (primeira linha)',
          'Treinamento vesical (aumentar intervalos miccionais)',
          'Restricao de liquidos (especialmente a noite e cafeina)',
          'Perda de peso se obeso',
          'Diario miccional para conscientizacao',
          'Fisioterapia do assoalho pelvico (supressao de urgencia)'
        ],
        farmacologico: [
          'ANTIMUSCARINICOS: Oxibutinina 5-15mg/dia, Tolterodina 2-4mg/dia',
          'Solifenacina 5-10mg/dia, Darifenacina 7,5-15mg/dia',
          'BETA-3-AGONISTA: Mirabegron 25-50mg/dia (alternativa)',
          'Combinacao: antimuscarinico + mirabegron se monoterapia insuficiente',
          'Estrogeno topico vaginal em mulheres pos-menopausa (adjuvante)'
        ]
      },
      metasTerapeuticas: [
        'Reducao de 50% nos episodios de urgencia',
        'Reducao da frequencia para <8/dia',
        'Nocturia <=1 episodio',
        'Melhora da qualidade de vida (OAB-q)'
      ],
      examesIniciais: [
        'EAS e urocultura (excluir ITU)',
        'Diario miccional 3 dias',
        'Residuo pos-miccional (excluir retencao)',
        'Glicemia (poliuria do DM)',
        'Questionario OAB-V8'
      ],
      redFlags: [
        'Hematuria',
        'Dor pelvica ou vesical',
        'Residuo pos-miccional elevado (>100mL)',
        'Sintomas neurologicos',
        'Infeccoes urinarias de repeticao',
        'Falha de tratamento adequado'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '16-17% da populacao adulta; aumenta com idade',
        incidencia: '11% de novos casos/ano em idosos',
        faixaEtaria: 'Aumenta progressivamente apos 40 anos; >30% em >75 anos',
        fatoresRisco: [
          'Idade avancada',
          'Obesidade',
          'Diabetes mellitus',
          'Menopausa (mulheres)',
          'HPB (homens)',
          'Constipacao cronica',
          'Doencas neurologicas'
        ],
        citations: [{ refId: 'ics-oab-2024' }]
      },
      fisiopatologia: {
        texto: 'Hiperatividade do musculo detrusor devido a aumento da excitabilidade do musculo liso, alteracoes neurogenicas (deficit de inibicao cortical), ou alteracoes no urotélio/eferencias sensoriais. Pode haver componente neurogenico (AVC, Parkinson, EM) ou idiopatico.',
        citations: [{ refId: 'eau-luts-2024' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Urgencia (sintoma cardinal)',
          'Frequencia urinaria (>=8/dia)',
          'Nocturia (>=1/noite)',
          'Incontinencia de urgencia (em 1/3 dos casos)',
          'Impacto significativo na qualidade de vida'
        ],
        sinaisExameFisico: [
          'Exame abdominal: sem bexiga palpavel',
          'Exame neurologico: sensibilidade perineal, reflexos sacros',
          'Mulheres: exame pelvico (prolapso, atrofia)',
          'Homens: toque retal (prostata)'
        ],
        formasClinicas: [
          'OAB seca (sem incontinencia)',
          'OAB umida (com incontinencia de urgencia)',
          'OAB neurogenica (causa neurologica definida)'
        ],
        citations: [{ refId: 'ics-oab-2024' }]
      },
      diagnostico: {
        criterios: [
          'Sindrome clinica baseada em sintomas',
          'Urgencia como sintoma central',
          'Exclusao de outras causas (ITU, litiase, tumor)'
        ],
        diagnosticoDiferencial: [
          'Infeccao urinaria',
          'Cistite intersticial',
          'Litiase vesical',
          'Tumor vesical',
          'Poliuria (DM, DI, polidipsia)',
          'Bexiga neurogenica'
        ],
        examesLaboratoriais: [
          'EAS e urocultura',
          'Glicemia',
          'Creatinina'
        ],
        examesImagem: [
          'USG de vias urinarias com residuo'
        ],
        outrosExames: [
          'Diario miccional (essencial)',
          'Urodinamica (casos selecionados)',
          'Cistoscopia se hematuria ou suspeita de tumor'
        ],
        citations: [{ refId: 'eau-luts-2024' }]
      },
      tratamento: {
        objetivos: [
          'Controlar urgencia',
          'Reduzir frequencia e nocturia',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Treinamento vesical (aumentar intervalos)',
            'Tecnicas de supressao da urgencia',
            'Restricao de cafeina e alcool',
            'Restricao hidrica noturna',
            'Perda de peso',
            'Fisioterapia pelvica'
          ],
          citations: [{ refId: 'aua-oab-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antimuscarinicos', medicamentos: ['Oxibutinina', 'Tolterodina', 'Solifenacina', 'Darifenacina'], posologia: 'Oxibutinina 5-15mg/dia; Solifenacina 5-10mg/dia', observacoes: 'Boca seca, constipacao; evitar em idosos frageis (cognicao)' },
            { classe: 'Beta-3-agonista', medicamentos: ['Mirabegron', 'Vibegron'], posologia: 'Mirabegron 25-50mg/dia', observacoes: 'Menos efeitos anticolinergicos; hipertensao (monitorar)' }
          ],
          segundaLinha: [
            { classe: 'Terapia combinada', medicamentos: ['Antimuscarinico + Mirabegron'], posologia: 'Solifenacina 5mg + Mirabegron 25-50mg', observacoes: 'Se monoterapia insuficiente' }
          ],
          situacoesEspeciais: [
            { situacao: 'Refratario a farmacoterapia', conduta: 'Toxina botulinica intravesical (OnabotulinumtoxinA 100-200U)' },
            { situacao: 'Ainda refratario', conduta: 'Neuromodulacao sacral ou tibial' },
            { situacao: 'Idoso com risco cognitivo', conduta: 'Evitar anticolinergicos; preferir mirabegron' }
          ],
          citations: [{ refId: 'aua-oab-2023' }]
        },
        duracao: 'Tratamento continuo; reavaliar a cada 4-12 semanas inicialmente'
      },
      acompanhamento: {
        frequenciaConsultas: 'Inicialmente a cada 4-8 semanas; depois a cada 6-12 meses',
        examesControle: [
          'Diario miccional',
          'Questionario OAB-q',
          'Residuo pos-miccional (se antimuscarinico)'
        ],
        metasTerapeuticas: [
          'Reducao de 50% nos episodios de urgencia',
          'Frequencia <8/dia',
          'Satisfacao do paciente'
        ],
        criteriosEncaminhamento: [
          'Refratario a 2 medicamentos',
          'Candidato a toxina botulinica ou neuromodulacao',
          'Hematuria',
          'Suspeita de causa neurologica'
        ],
        citations: [{ refId: 'ics-oab-2024' }]
      },
      populacoesEspeciais: {
        idosos: 'Preferir mirabegron; anticolinergicos aumentam risco de delirium e deficit cognitivo',
        gestantes: 'Treinamento vesical apenas; farmacos contraindicados'
      }
    },
    protocolos: ['oab-manejo-aps', 'luts-feminino'],
    medicamentos: ['oxibutinina', 'tolterodina', 'solifenacina', 'mirabegron'],
    calculadoras: ['oab-v8', 'oab-q'],
    rastreamentos: [],
    citations: [{ refId: 'aua-oab-2023' }, { refId: 'ics-oab-2024' }],
    lastUpdate: '2026-01',
    tags: ['bexiga hiperativa', 'urgencia', 'antimuscarinico', 'mirabegron', 'OAB']
  },

  {
    id: 'cistite-intersticial',
    titulo: 'Cistite Intersticial / Sindrome da Bexiga Dolorosa',
    sinonimos: ['IC/BPS', 'Interstitial Cystitis', 'Bladder Pain Syndrome', 'Sindrome da Bexiga Dolorosa'],
    doid: 'DOID:13527',
    snomedCT: '197834003',
    meshId: 'D018856',
    umlsCui: 'C0600040',
    ciap2: ['U01', 'U71'],
    cid10: ['N30.1'],
    cid11: ['GC00.3'],
    hpo: ['HP:0100577'],
    categoria: 'urologico',
    subcategoria: 'bexiga',
    quickView: {
      definicao: 'Sindrome cronica caracterizada por dor, pressao ou desconforto percebido como relacionado a bexiga, associada a sintomas do trato urinario inferior, por mais de 6 semanas, na ausencia de infeccao ou outras causas identificaveis.',
      criteriosDiagnosticos: [
        'Dor, pressao ou desconforto pelvico relacionado a bexiga',
        'Duracao >=6 semanas',
        'Frequencia urinaria (frequentemente >15-20/dia)',
        'Urgencia urinaria',
        'Nocturia',
        'Alivio parcial ou piora com enchimento/esvaziamento vesical',
        'Exclusao de infeccao, neoplasia, radiacao, outras causas',
        'Cistoscopia com hidrodistensao: glomerulacoes ou ulcera de Hunner (apoiam diagnostico)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educacao e suporte',
          'Modificacao dietetica (evitar gatilhos: cafeina, alcool, citricos, condimentos)',
          'Fisioterapia do assoalho pelvico (liberacao de pontos-gatilho)',
          'Manejo do estresse',
          'Aplicacao de calor local',
          'Treinamento vesical'
        ],
        farmacologico: [
          'PENTOSAN POLISSULFATO SODICO 100mg 3x/dia (aprovado; efeito em 3-6 meses)',
          'AMITRIPTILINA 25-75mg a noite',
          'HIDROXIZINA 25-75mg a noite (antihistaminico)',
          'INSTILACAO INTRAVESICAL: DMSO, heparina, lidocaina, ac. hialuronico',
          'ANALGESICOS: Paracetamol, AINEs, opioides em casos refratarios'
        ]
      },
      metasTerapeuticas: [
        'Reducao da dor (escala visual analogica)',
        'Reducao da frequencia urinaria',
        'Melhora do escore ICSI/ICPI',
        'Melhora da qualidade de vida'
      ],
      examesIniciais: [
        'EAS e urocultura (excluir ITU)',
        'Citologia urinaria (excluir CIS)',
        'Diario miccional',
        'Questionarios: ICSI/ICPI, PUF',
        'Residuo pos-miccional'
      ],
      redFlags: [
        'Hematuria macroscopica',
        'Citologia urinaria suspeita',
        'Massa pelvica',
        'Historia de radiacao pelvica',
        'Sintomas neurologicos',
        'Piora rapida'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-7% das mulheres; 10x menos comum em homens',
        incidencia: '1-2/10.000/ano',
        faixaEtaria: 'Pico 30-50 anos; pode ocorrer em qualquer idade',
        fatoresRisco: [
          'Sexo feminino (90% dos casos)',
          'Outras sindromes de dor cronica (fibromialgia, SII)',
          'Alergias e doencas autoimunes',
          'Historia de ITU de repeticao',
          'Cirurgias pelvicas previas'
        ],
        citations: [{ refId: 'aua-ic-bps-2022' }]
      },
      fisiopatologia: {
        texto: 'Multifatorial: disfuncao do glicosaminoglicano (GAG) protetor do urotélio, aumento da permeabilidade epitelial, ativacao de mastocitos, inflamacao neurogenica, sensibilizacao central da dor. Alguns casos apresentam ulceras de Hunner (subtipo com inflamacao mais intensa).',
        citations: [{ refId: 'juro-ic-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor pelvica/suprapubica/vesical',
          'Dor piora com enchimento vesical e alivia parcialmente apos miccao',
          'Frequencia urinaria extrema (>20/dia comum)',
          'Urgencia (sem incontinencia tipicamente)',
          'Nocturia frequente',
          'Dispareunia',
          'Dor uretral'
        ],
        sinaisExameFisico: [
          'Dor a palpacao suprapubica',
          'Dor a palpacao da parede vaginal anterior',
          'Pontos-gatilho no assoalho pelvico',
          'Ausencia de sinais de infeccao'
        ],
        formasClinicas: [
          'IC com ulcera de Hunner (5-10%): doenca mais inflamatoria',
          'IC nao-ulcerativa (mais comum)',
          'Fenotipo UPOINT para IC'
        ],
        citations: [{ refId: 'aua-ic-bps-2022' }]
      },
      diagnostico: {
        criterios: [
          'Diagnostico de exclusao (sindrome clinica)',
          'Dor, pressao ou desconforto relacionado a bexiga >=6 semanas',
          'Sintomas urinarios associados',
          'Ausencia de infeccao ou outras causas'
        ],
        diagnosticoDiferencial: [
          'Infeccao urinaria',
          'Bexiga hiperativa',
          'Cancer de bexiga (CIS)',
          'Endometriose',
          'Vulvodinia',
          'Prostatite cronica (homens)'
        ],
        examesLaboratoriais: [
          'EAS e urocultura',
          'Citologia urinaria'
        ],
        examesImagem: [
          'USG de vias urinarias',
          'TC/RM se suspeita de outra patologia'
        ],
        outrosExames: [
          'Cistoscopia com hidrodistensao sob anestesia (glomerulacoes, ulcera de Hunner)',
          'Biopsia vesical (casos selecionados)',
          'Teste de sensibilidade ao potassio (descontinuado)'
        ],
        citations: [{ refId: 'eau-chronic-pelvic-pain-2024' }]
      },
      tratamento: {
        objetivos: [
          'Alivio da dor',
          'Reducao da frequencia',
          'Melhora da qualidade de vida',
          'Abordagem multimodal'
        ],
        naoFarmacologico: {
          medidas: [
            'Modificacao dietetica (dieta de eliminacao)',
            'Fisioterapia pelvica',
            'Manejo do estresse',
            'Acupuntura',
            'Educacao e suporte',
            'Grupos de apoio'
          ],
          citations: [{ refId: 'aua-ic-bps-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'GAG oral', medicamentos: ['Pentosan polissulfato sodico'], posologia: '100mg 3x/dia', observacoes: 'Efeito em 3-6 meses; risco de maculopatia (monitorar)' },
            { classe: 'Antidepressivo triciclico', medicamentos: ['Amitriptilina', 'Nortriptilina'], posologia: 'Amitriptilina 25-75mg a noite', observacoes: 'Efeito na dor e frequencia' },
            { classe: 'Anti-histaminico', medicamentos: ['Hidroxizina', 'Cimetidina'], posologia: 'Hidroxizina 25-75mg a noite', observacoes: 'Inibe degranulacao de mastocitos' }
          ],
          segundaLinha: [
            { classe: 'Instilacao intravesical', medicamentos: ['DMSO', 'Heparina + lidocaina', 'Acido hialuronico'], posologia: 'DMSO 50mL a 50% semanal por 6 sem', observacoes: 'Terapia local; requer cateterismo' }
          ],
          situacoesEspeciais: [
            { situacao: 'Ulcera de Hunner', conduta: 'Fulguração ou injeção de triamcinolona na úlcera' },
            { situacao: 'Refratária a todas as terapias', conduta: 'Neuromodulação sacral; cistectomia em casos extremos' }
          ],
          citations: [{ refId: 'juro-ic-2023' }]
        },
        duracao: 'Tratamento cronico; abordagem multimodal'
      },
      acompanhamento: {
        frequenciaConsultas: 'Inicialmente mensal; depois a cada 3-6 meses',
        examesControle: [
          'Questionario ICSI/ICPI',
          'Diario miccional',
          'Exame oftalmologico anual se uso de PPS'
        ],
        metasTerapeuticas: [
          'Reducao de 30-50% na dor',
          'Melhora do ICSI/ICPI',
          'Melhora subjetiva do paciente'
        ],
        criteriosEncaminhamento: [
          'Todos os casos: urologista',
          'Necessidade de cistoscopia',
          'Refratario a tratamento conservador',
          'Candidato a neuromodulacao'
        ],
        citations: [{ refId: 'aua-ic-bps-2022' }]
      }
    },
    protocolos: ['cistite-intersticial-manejo'],
    medicamentos: ['pentosan-polissulfato', 'amitriptilina', 'hidroxizina'],
    calculadoras: ['icsi-icpi', 'puf-score'],
    rastreamentos: [],
    citations: [{ refId: 'aua-ic-bps-2022' }, { refId: 'eau-chronic-pelvic-pain-2024' }],
    lastUpdate: '2026-01',
    tags: ['cistite intersticial', 'dor pelvica', 'bexiga dolorosa', 'pentosan']
  },

  // ============================================================================
  // LITIASE E DOENCAS RENAIS
  // ============================================================================
  {
    id: 'litiase-renal-recorrente',
    titulo: 'Litiase Renal Recorrente',
    sinonimos: ['Nefrolitiase recorrente', 'Calculos renais de repeticao', 'Kidney Stones'],
    doid: 'DOID:585',
    snomedCT: '95570007',
    meshId: 'D053040',
    umlsCui: 'C0022650',
    ciap2: ['U95'],
    cid10: ['N20', 'N20.0', 'N20.1', 'N20.2'],
    cid11: ['GB70'],
    hpo: ['HP:0000787', 'HP:0000019'],
    loinc: ['2695-5', '2777-1', '24356-8'],
    categoria: 'urologico',
    subcategoria: 'litiase',
    quickView: {
      definicao: 'Formacao recorrente de calculos no trato urinario (>=2 episodios). Risco de recorrencia: 50% em 5 anos, 80% em 10 anos. Requer avaliacao metabolica e intervencao preventiva.',
      criteriosDiagnosticos: [
        '>=2 episodios de litiase urinaria documentados',
        'Historia de colica renal tipica com confirmacao de imagem',
        'Analise do calculo (quando disponivel)',
        'Avaliacao metabolica (urina 24h): hipercalciuria, hiperuricosuria, hipocitraturia, hiperoxaluria',
        'Investigacao de causas secundarias (HPT, ATR, cistinuria)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'HIDRATACAO: >=2,5L/dia para debito urinario >2L',
          'DIETA: Reduzir sodio (<2g/dia), proteina animal moderada',
          'CALCIO: Ingestao normal (1000-1200mg/dia) - nao restringir',
          'REDUZIR OXALATO: Evitar espinafre, ruibarbo, nozes em excesso',
          'Evitar suplementos de vitamina C em doses altas',
          'Manter peso saudavel'
        ],
        farmacologico: [
          'HIPERCALCIURIA: Tiazidico (Hidroclorotiazida 25-50mg/dia)',
          'HIPOCITRATURIA: Citrato de potassio 30-60mEq/dia',
          'HIPERURICOSURIA: Alopurinol 100-300mg/dia',
          'CALCULOS DE ACIDO URICO: Alcalinizacao da urina (citrato de potassio)',
          'CISTINURIA: D-penicilamina, Tiopronina, alcalinizacao',
          'CALCULOS INFECTADOS (ESTRUVITA): Erradicacao da infeccao, AHA se necessario'
        ]
      },
      metasTerapeuticas: [
        'Prevenir novos episodios de litiase',
        'Debito urinario >2L/dia',
        'Correcao das alteracoes metabolicas',
        'Volume urinario, calcio, acido urico, citrato em faixas-alvo'
      ],
      examesIniciais: [
        'Urina 24h: volume, calcio, acido urico, oxalato, citrato, sodio, creatinina',
        'Sangue: calcio, fosforo, acido urico, PTH, creatinina',
        'EAS e urocultura',
        'Analise do calculo (essencial se disponivel)',
        'TC de vias urinarias sem contraste'
      ],
      redFlags: [
        'Calculo coraliforme',
        'Litiase bilateral',
        'Calculo em rim unico',
        'Obstrucao com infeccao (emergencia)',
        'Insuficiencia renal',
        'Litiase na infancia (investigar causas geneticas)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5-15% da populacao; 2-3x mais comum em homens',
        incidencia: '1-2/1000/ano; aumentando globalmente',
        mortalidade: 'Baixa; morbidade significativa',
        faixaEtaria: 'Pico 30-60 anos; pode ocorrer em qualquer idade',
        fatoresRisco: [
          'Historia familiar',
          'Dieta ocidental (alta proteina, sal)',
          'Baixa ingesta hidrica',
          'Obesidade e sindrome metabolica',
          'Hipertensao, diabetes',
          'Gota',
          'Doencas intestinais (Crohn, bypass)',
          'Hiperparatireoidismo'
        ],
        citations: [{ refId: 'eau-urolithiasis-2024' }]
      },
      fisiopatologia: {
        texto: 'Supersaturacao urinaria de sais (calcio, oxalato, fosfato, acido urico) excede a capacidade de inibidores (citrato, magnesio). Nucleacao, crescimento e agregacao de cristais formam calculos. Tipos: oxalato de calcio (70-80%), fosfato de calcio (10-15%), acido urico (5-10%), estruvita (5-10%), cistina (1%).',
        citations: [{ refId: 'aua-kidney-stones-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Colica renal: dor lombar intensa, irradia para flanco e virilha',
          'Hematuria (micro ou macroscopica)',
          'Nausea e vomitos',
          'Disuria se calculo distal',
          'Urgencia e frequencia'
        ],
        sinaisExameFisico: [
          'Giordano positivo (punho-percussao lombar)',
          'Paciente inquieto (diferente de abdome agudo)',
          'Ausencia de sinais peritoneais',
          'Febre sugere infeccao associada'
        ],
        formasClinicas: [
          'Calculo de oxalato de calcio (mais comum)',
          'Calculo de fosfato de calcio',
          'Calculo de acido urico (radiolucido)',
          'Calculo de estruvita (infeccioso, coraliforme)',
          'Calculo de cistina (raro, genetico)'
        ],
        citations: [{ refId: 'eau-urolithiasis-2024' }]
      },
      diagnostico: {
        criterios: [
          'Historia clinica compativel',
          'Imagem confirmando calculo',
          'Avaliacao metabolica em formadores recorrentes'
        ],
        diagnosticoDiferencial: [
          'Pielonefrite',
          'Aneurisma de aorta',
          'Apendicite',
          'Colecistite',
          'Torçao ovariana',
          'Gravidez ectopica'
        ],
        examesLaboratoriais: [
          'Creatinina, calcio, acido urico sericos',
          'PTH se hipercalcemia',
          'Urina 24h: volume, calcio, oxalato, citrato, acido urico, sodio, creatinina'
        ],
        examesImagem: [
          'TC sem contraste (padrao-ouro)',
          'USG de vias urinarias (gestantes, follow-up)',
          'Rx simples de abdome (radiopacidade)'
        ],
        outrosExames: [
          'Analise do calculo (sempre que possivel)',
          'pH urinario seriado (calculos de acido urico)'
        ],
        citations: [{ refId: 'aua-kidney-stones-2023' }]
      },
      tratamento: {
        objetivos: [
          'Tratar episodio agudo',
          'Prevenir recorrencia',
          'Corrigir alteracoes metabolicas',
          'Preservar funcao renal'
        ],
        naoFarmacologico: {
          medidas: [
            'Alta ingesta hidrica (>2,5L/dia)',
            'Dieta com baixo sodio (<2g/dia)',
            'Proteina animal moderada',
            'Calcio dietetico normal (nao restringir)',
            'Reduzir oxalato se hiperoxaluria',
            'Manter peso saudavel'
          ],
          citations: [{ refId: 'aua-kidney-stones-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Tiazidico', medicamentos: ['Hidroclorotiazida', 'Clortalidona', 'Indapamida'], posologia: 'HCTZ 25-50mg/dia', observacoes: 'Para hipercalciuria; monitorar potassio' },
            { classe: 'Citrato de potassio', medicamentos: ['Citrato de potassio'], posologia: '30-60mEq/dia em doses divididas', observacoes: 'Para hipocitraturia e alcalinizacao' },
            { classe: 'Inibidor de xantina oxidase', medicamentos: ['Alopurinol', 'Febuxostat'], posologia: 'Alopurinol 100-300mg/dia', observacoes: 'Para hiperuricosuria' }
          ],
          segundaLinha: [
            { classe: 'Quelantes de oxalato', medicamentos: ['Calcio oral as refeicoes'], posologia: 'Carbonato de calcio 500mg as refeicoes', observacoes: 'Para hiperoxaluria enterica' }
          ],
          situacoesEspeciais: [
            { situacao: 'Calculos de cistina', conduta: 'D-penicilamina ou Tiopronina + alcalinizacao agressiva' },
            { situacao: 'Calculos de estruvita', conduta: 'Remocao completa do calculo + antibiotico prolongado' },
            { situacao: 'Acidose tubular renal', conduta: 'Citrato de potassio em doses altas' }
          ],
          citations: [{ refId: 'eau-urolithiasis-2024' }]
        },
        duracao: 'Prevencao continua; reavaliar urina 24h em 3-6 meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses; mais frequente se instabilidade',
        examesControle: [
          'Urina 24h anual',
          'Imagem (USG ou TC de baixa dose) anual ou conforme sintomas',
          'Calcio e creatinina sericos'
        ],
        metasTerapeuticas: [
          'Volume urinario >2L/dia',
          'Calcio urinario <200-250mg/dia',
          'Citrato urinario >450mg/dia',
          'Ausencia de novos calculos'
        ],
        criteriosEncaminhamento: [
          'Calculo sintomatico para intervencao',
          'Calculo >10mm',
          'Complicacoes (obstrucao, infeccao)',
          'Causas secundarias (HPT, ATR, cistinuria)',
          'Refratario a medidas preventivas'
        ],
        citations: [{ refId: 'aua-kidney-stones-2023' }]
      }
    },
    protocolos: ['litiase-urinaria-prevencao', 'colica-renal-aguda'],
    medicamentos: ['hidroclorotiazida', 'citrato-potassio', 'alopurinol'],
    calculadoras: ['risco-litiase', 'supersaturacao-urinaria'],
    rastreamentos: [],
    citations: [{ refId: 'eau-urolithiasis-2024' }, { refId: 'aua-kidney-stones-2023' }],
    lastUpdate: '2026-01',
    tags: ['litiase', 'calculos renais', 'nefrolitiase', 'colica renal', 'hipercalciuria']
  },

  {
    id: 'drpad',
    titulo: 'Doenca Renal Policistica Autossomica Dominante',
    sinonimos: ['DRPAD', 'ADPKD', 'Rins policisticos', 'Autosomal Dominant Polycystic Kidney Disease'],
    doid: 'DOID:898',
    snomedCT: '28728008',
    meshId: 'D016891',
    umlsCui: 'C0085413',
    ordo: ['ORPHA:730'],
    ciap2: ['U99'],
    cid10: ['Q61.2'],
    cid11: ['LB12.0'],
    hpo: ['HP:0000113', 'HP:0000107', 'HP:0000822'],
    categoria: 'urologico',
    subcategoria: 'geneticas',
    quickView: {
      definicao: 'Doenca genetica mais comum causadora de DRC terminal, caracterizada por cistos renais bilaterais progressivos. Mutacoes em PKD1 (85%) ou PKD2 (15%). Manifestacoes extra-renais incluem cistos hepaticos e aneurismas cerebrais.',
      criteriosDiagnosticos: [
        'CRITERIOS ECOGRAFICOS (historia familiar positiva):',
        '15-39 anos: >=3 cistos (unilateral ou bilateral)',
        '40-59 anos: >=2 cistos em cada rim',
        '>=60 anos: >=4 cistos em cada rim',
        'Sem historia familiar: criterios mais estritos; considerar teste genetico',
        'Rins aumentados (volume renal total >1500mL e em crescimento)',
        'Manifestacoes extra-renais: cistos hepaticos, aneurismas cerebrais'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratacao abundante (3L/dia se funcao renal preservada)',
          'Dieta com baixo sodio (<2g/dia)',
          'Evitar cafeina (estimula crescimento cistico)',
          'Atividade fisica (evitar esportes de contato)',
          'Cessar tabagismo',
          'Controle rigoroso de peso'
        ],
        farmacologico: [
          'TOLVAPTANA (antagonista V2): 45-120mg/dia (progressao rapida, TFG >25)',
          'Aprovada para retardar progressao; monitorar hepatotoxicidade',
          'CONTROLE DE PA: Alvo <130/80mmHg; IECA ou BRA como primeira linha',
          'TRATAR DOR: Analgesicos; evitar AINEs',
          'TRATAR INFECCAO DE CISTOS: Quinolonas (boa penetracao)'
        ]
      },
      metasTerapeuticas: [
        'PA <130/80mmHg',
        'Retardar crescimento renal (volume renal total)',
        'Retardar declinio da TFG',
        'Prevenir e tratar complicacoes',
        'Rastreamento de aneurismas cerebrais em grupos de risco'
      ],
      examesIniciais: [
        'USG de rins e figado',
        'Creatinina e TFG estimada',
        'EAS e urocultura',
        'RM de rins (volumetria se disponivel)',
        'Teste genetico (se indicado: diagnostico incerto, doacao renal, planejamento familiar)',
        'Angio-RM ou angio-TC de cranio (se historia familiar de aneurisma ou hemorragia)'
      ],
      redFlags: [
        'Hematuria macroscopica (ruptura de cisto ou litiase)',
        'Dor lombar intensa (hemorragia ou infeccao de cisto)',
        'Febre (infeccao de cisto)',
        'Cefaleia subita intensa (aneurisma cerebral roto - emergencia)',
        'Declinio rapido da TFG'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:400-1:1000 nascidos vivos',
        incidencia: 'Doenca genetica mais comum causadora de DRC',
        mortalidade: '50% evoluem para DRC terminal ate 60 anos',
        faixaEtaria: 'Manifestacoes em qualquer idade; cistos detectaveis ja na infancia',
        fatoresRisco: [
          'Mutacao PKD1 (progressao mais rapida que PKD2)',
          'Sexo masculino',
          'Hipertensao precoce',
          'Primeiro episodio de hematuria macroscopica antes de 35 anos',
          'Volume renal total basal elevado'
        ],
        citations: [{ refId: 'kdigo-adpkd-2023' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes em PKD1 (policistina-1) ou PKD2 (policistina-2) levam a disfuncao de cilios primarios, desregulacao de AMPc, proliferacao celular e secrecao de fluido nos cistos. Os cistos crescem progressivamente, comprimindo e destruindo o parenquima renal normal.',
        citations: [{ refId: 'nejm-adpkd-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor lombar ou em flancos (mais comum)',
          'Hematuria macroscopica episodica',
          'Hipertensao (frequentemente antes da perda de funcao)',
          'Infeccoes urinarias e de cistos',
          'Litiase renal (20%)',
          'Sintomas de DRC avanc (edema, fadiga, anemia)'
        ],
        sinaisExameFisico: [
          'Rins palpaveis bilateralmente (doenca avancada)',
          'Hepatomegalia (cistos hepaticos)',
          'Hipertensao',
          'Hernias (abdominais, inguinais)'
        ],
        formasClinicas: [
          'Forma tipica (PKD1 ou PKD2)',
          'Forma de inicio precoce (grave, primeira decada)',
          'Forma tardia (diagnostico apos 50 anos, melhor prognostico)'
        ],
        citations: [{ refId: 'kdigo-adpkd-2023' }]
      },
      diagnostico: {
        criterios: [
          'Criterios ecograficos + historia familiar positiva',
          'Teste genetico se criterios nao preenchidos ou necessario para decisoes clinicas'
        ],
        diagnosticoDiferencial: [
          'Doenca renal policistica autossomica recessiva',
          'Cistos renais simples (comuns em idosos)',
          'Doenca cistica medular',
          'Esclerose tuberosa',
          'Doenca de von Hippel-Lindau'
        ],
        examesLaboratoriais: [
          'Creatinina, TFG estimada',
          'EAS, urocultura',
          'Hemograma (anemia)',
          'Teste genetico quando indicado'
        ],
        examesImagem: [
          'USG de rins e figado (triagem)',
          'RM de rins (volumetria - prognostico)',
          'Angio-RM/angio-TC de cranio (rastreamento de aneurisma)'
        ],
        citations: [{ refId: 'nejm-adpkd-2021' }]
      },
      tratamento: {
        objetivos: [
          'Retardar progressao para DRC terminal',
          'Controlar hipertensao',
          'Tratar e prevenir complicacoes',
          'Planejamento para terapia renal substitutiva'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratacao abundante (suprimir ADH)',
            'Dieta hipossodica',
            'Evitar cafeina',
            'Evitar esportes de contato',
            'Cessar tabagismo'
          ],
          citations: [{ refId: 'kdigo-adpkd-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antagonista de vasopressina', medicamentos: ['Tolvaptana'], posologia: '45-120mg/dia em doses divididas (manha e tarde)', observacoes: 'Para progressao rapida, TFG >25; monitorar funcao hepatica mensal por 18 meses' },
            { classe: 'IECA/BRA', medicamentos: ['Lisinopril', 'Losartana'], posologia: 'Lisinopril 10-40mg/dia', observacoes: 'Alvo PA <130/80mmHg; iniciar precoce' }
          ],
          segundaLinha: [
            { classe: 'Outros anti-hipertensivos', medicamentos: ['Anlodipino', 'Atenolol'], posologia: 'Conforme necessidade', observacoes: 'Se PA nao controlada com IECA/BRA' }
          ],
          situacoesEspeciais: [
            { situacao: 'Infeccao de cisto', conduta: 'Quinolona (ciprofloxacino) por 4-6 semanas; drenagem se refrataria' },
            { situacao: 'Hematuria macroscopica', conduta: 'Repouso, hidratacao; geralmente autolimitada' },
            { situacao: 'DRC terminal', conduta: 'Transplante renal preferido (pode ser de doador vivo aparentado apos teste genetico)' }
          ],
          citations: [{ refId: 'nejm-adpkd-2021' }]
        },
        duracao: 'Tratamento continuo e vigilancia ao longo da vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses se funcao estavel; mais frequente se declinio',
        examesControle: [
          'Creatinina e TFG a cada 6-12 meses',
          'USG ou RM renal periodico',
          'PA em todas as consultas',
          'Funcao hepatica se tolvaptana'
        ],
        metasTerapeuticas: [
          'PA <130/80mmHg',
          'Retardar progressao da TFG',
          'Ausencia de complicacoes'
        ],
        criteriosEncaminhamento: [
          'Todos: nefrologista',
          'Cistos infectados refratarios: urologista',
          'Rastreamento de aneurisma: neurologista/neurocirurgia',
          'DRC estagio 4-5: planejamento de TRS'
        ],
        citations: [{ refId: 'kdigo-adpkd-2023' }]
      },
      prevencao: {
        primaria: [
          'Aconselhamento genetico para familiares',
          'Diagnostico pre-implatacional disponivel'
        ],
        secundaria: [
          'Rastreamento de familiares de risco',
          'Intervencao precoce com tolvaptana em progressores rapidos'
        ],
        citations: [{ refId: 'nejm-adpkd-2021' }]
      }
    },
    protocolos: ['drpad-acompanhamento', 'aneurisma-cerebral-rastreamento'],
    medicamentos: ['tolvaptana', 'lisinopril', 'losartana'],
    calculadoras: ['mayo-pkd-imaging', 'propkd-score'],
    rastreamentos: [],
    citations: [{ refId: 'kdigo-adpkd-2023' }, { refId: 'nejm-adpkd-2021' }],
    lastUpdate: '2026-01',
    tags: ['rins policisticos', 'DRPAD', 'ADPKD', 'tolvaptana', 'genetica']
  },

  // ============================================================================
  // PATOLOGIAS URETRAIS E ESCROTAIS
  // ============================================================================
  {
    id: 'estenose-uretral',
    titulo: 'Estenose Uretral',
    sinonimos: ['Estreitamento uretral', 'Urethral Stricture'],
    doid: 'DOID:13500',
    snomedCT: '197864006',
    meshId: 'D014525',
    umlsCui: 'C0041976',
    ciap2: ['U99'],
    cid10: ['N35', 'N35.0', 'N35.1'],
    cid11: ['GC05.0'],
    categoria: 'urologico',
    subcategoria: 'uretra',
    quickView: {
      definicao: 'Estreitamento do lumen uretral por fibrose/cicatriz, causando obstrucao ao fluxo urinario. Mais comum em homens. Causas: iatrogenica (cateterismo, procedimentos), trauma, infeccao (IST), liquen escleroso.',
      criteriosDiagnosticos: [
        'Sintomas obstrutivos urinarios: jato fraco, hesitacao, gotejamento',
        'Historia de trauma uretral, cateterismo prolongado, procedimentos urologicos, ou IST',
        'Uretrografia retrograda: estreitamento focal ou segmentar',
        'Uretrocistoscopia: visualizacao direta da estenose',
        'Fluxometria: padrao em plato (Qmax muito reduzido)',
        'Residuo pos-miccional aumentado'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'DILATACAO URETRAL: para estenoses curtas (<2cm), recorrentes',
          'URETROTOMIA INTERNA: incisao endoscopica (boa para estenose curta, primeira vez)',
          'URETROPLASTIA: reconstrucao cirurgica (padrao-ouro para estenoses longas ou recorrentes)',
          'Auto-cateterismo intermitente (pos-uretrotomia para prevenir recorrencia)'
        ],
        farmacologico: [
          'Nao ha tratamento farmacologico especifico',
          'Antibioticoprofilaxia peri-procedimento',
          'Tratar liquen escleroso se presente (corticoide topico)',
          'Alfa-bloqueador adjuvante pos-operatorio (controverso)'
        ]
      },
      metasTerapeuticas: [
        'Restaurar fluxo urinario adequado',
        'Prevenir recorrencia',
        'Evitar complicacoes (retencao, ITU, DRC)'
      ],
      examesIniciais: [
        'Fluxometria',
        'Residuo pos-miccional',
        'Uretrografia retrograda e miccional',
        'Uretrocistoscopia',
        'EAS e urocultura',
        'Creatinina'
      ],
      redFlags: [
        'Retencao urinaria aguda',
        'Infeccao urinaria de repeticao',
        'Insuficiencia renal',
        'Abscesso periuretral',
        'Fistula uretral',
        'Falha de multiplas intervencoes'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,6% dos homens; raro em mulheres',
        incidencia: 'Aumentando devido a procedimentos urologicos',
        faixaEtaria: 'Qualquer idade; mais comum em adultos',
        fatoresRisco: [
          'Cateterismo uretral (principal causa atual)',
          'Procedimentos urologicos (RTUP, cistoscopia)',
          'Trauma pelvico ou perineal',
          'Uretrite gonococica (historicamente importante)',
          'Liquen escleroso (causa de estenose de meato e fossa navicular)',
          'Hipospadia corrigida'
        ],
        citations: [{ refId: 'aua-stricture-2023' }]
      },
      fisiopatologia: {
        texto: 'Lesao da mucosa uretral leva a inflamacao, deposicao de colageno e formacao de tecido cicatricial (espongiofibrosis). A fibrose compromete a distensibilidade uretral e causa obstrucao progressiva. Quanto maior a espongiofibrosis, menor a taxa de sucesso de tratamentos endoscopicos.',
        citations: [{ refId: 'eau-stricture-2024' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Jato urinario fraco e fino',
          'Hesitacao para iniciar miccao',
          'Esforco miccional',
          'Gotejamento terminal',
          'Sensacao de esvaziamento incompleto',
          'ITU de repeticao',
          'Retencao urinaria'
        ],
        sinaisExameFisico: [
          'Palpacao de uretra (endurecimento focal)',
          'Exame do meato uretral',
          'Sinais de liquen escleroso (pele peniana esbranquicada)',
          'Bexiga palpavel se retencao'
        ],
        formasClinicas: [
          'Estenose de uretra anterior (bulbar, peniana, fossa navicular)',
          'Estenose de uretra posterior (membranosa - pos-trauma pelvico)',
          'Estenose pan-uretral (liquen escleroso)'
        ],
        citations: [{ refId: 'aua-stricture-2023' }]
      },
      diagnostico: {
        criterios: [
          'Clinica sugestiva',
          'Confirmacao por imagem ou endoscopia'
        ],
        diagnosticoDiferencial: [
          'Hiperplasia prostatica benigna',
          'Contratura do colo vesical',
          'Bexiga neurogenica',
          'Calculo uretral impactado'
        ],
        examesLaboratoriais: [
          'EAS e urocultura',
          'Creatinina'
        ],
        examesImagem: [
          'Uretrografia retrograda e miccional (padrao-ouro para localizacao e extensao)',
          'USG de uretra (opcional)'
        ],
        outrosExames: [
          'Fluxometria (Qmax em plato)',
          'Uretrocistoscopia',
          'Residuo pos-miccional'
        ],
        citations: [{ refId: 'eau-stricture-2024' }]
      },
      tratamento: {
        objetivos: [
          'Restaurar fluxo urinario',
          'Tratamento definitivo com baixa recorrencia',
          'Preservar funcao sexual'
        ],
        naoFarmacologico: {
          medidas: [
            'DILATACAO: opçao para estenoses curtas, recorrentes, pacientes nao-candidatos a cirurgia',
            'URETROTOMIA INTERNA (DVIU): incisao endoscopica; sucesso 50-60% para estenose curta virgem',
            'URETROPLASTIA: reconstrucao aberta; sucesso >90% em centros especializados',
            'Auto-cateterismo intermitente limpo (pos-DVIU)'
          ],
          citations: [{ refId: 'aua-stricture-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Nao ha tratamento farmacologico eficaz', medicamentos: ['N/A'], posologia: 'N/A', observacoes: 'Tratamento e cirurgico/endoscopico' }
          ],
          situacoesEspeciais: [
            { situacao: 'Liquen escleroso', conduta: 'Corticoide topico + considerar uretroplastia com enxerto de mucosa oral' },
            { situacao: 'Estenose complexa ou longa (>2cm)', conduta: 'Uretroplastia primaria (evitar multiplas uretrotomias)' },
            { situacao: 'Estenose de uretra posterior pos-trauma', conduta: 'Uretroplastia anastomotica apos estabilizacao' }
          ],
          citations: [{ refId: 'eau-stricture-2024' }]
        },
        duracao: 'Acompanhamento longo (recorrencia pode ser tardia)'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses no primeiro ano; depois anual',
        examesControle: [
          'Fluxometria',
          'Residuo pos-miccional',
          'Uretrografia ou cistoscopia se sintomas recorrerem'
        ],
        metasTerapeuticas: [
          'Qmax >15mL/s',
          'Residuo <50mL',
          'Ausencia de sintomas'
        ],
        criteriosEncaminhamento: [
          'Todos: urologista',
          'Estenose complexa: centro especializado em uretroplastia',
          'Falha de tratamento endoscopico (>=2 DVIU)'
        ],
        citations: [{ refId: 'aua-stricture-2023' }]
      }
    },
    protocolos: ['estenose-uretral-manejo'],
    medicamentos: [],
    calculadoras: ['qmax-curva-fluxo'],
    rastreamentos: [],
    citations: [{ refId: 'aua-stricture-2023' }, { refId: 'eau-stricture-2024' }],
    lastUpdate: '2026-01',
    tags: ['estenose', 'uretra', 'uretroplastia', 'DVIU', 'cateterismo']
  },

  {
    id: 'varicocele',
    titulo: 'Varicocele',
    sinonimos: ['Varizes do plexo pampiniforme', 'Varicocele testicular'],
    doid: 'DOID:12177',
    snomedCT: '70076002',
    meshId: 'D014646',
    umlsCui: 'C0042341',
    ciap2: ['Y83'],
    cid10: ['I86.1'],
    cid11: ['GA10.0'],
    hpo: ['HP:0000035'],
    categoria: 'urologico',
    subcategoria: 'escrotal',
    quickView: {
      definicao: 'Dilatacao anormal das veias do plexo pampiniforme, mais comum a esquerda (90%). Principal causa tratavel de infertilidade masculina. Geralmente assintomatica; pode causar dor e atrofia testicular.',
      criteriosDiagnosticos: [
        'CLASSIFICACAO CLINICA (DUBIN-AMELAR):',
        'Grau I: palpavel apenas com Valsalva',
        'Grau II: palpavel sem Valsalva, nao visivel',
        'Grau III: visivel e palpavel (aspecto de "saco de vermes")',
        'Subclínica: detectada apenas por USG (dilatacao >=3mm com refluxo)',
        'USG com Doppler: veia do plexo pampiniforme >=3mm com refluxo a Valsalva'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'OBSERVACAO: se assintomatica, fertilidade preservada, testiculos normais',
          'USO DE SUSPENSORIO: alivio sintomatico',
          'TRATAMENTO CIRURGICO: Varicocelectomia microscopica (padrao-ouro)',
          'Ligadura laparoscopica',
          'EMBOLIZACAO PERCUTANEA: alternativa minimamente invasiva'
        ],
        farmacologico: [
          'Nao ha tratamento farmacologico especifico',
          'Analgesicos para dor (AINE)',
          'Antioxidantes (controverso): Vitamina E, Coenzima Q10'
        ]
      },
      metasTerapeuticas: [
        'Alivio da dor (se sintomatica)',
        'Melhora dos parametros seminais',
        'Prevencao de atrofia testicular',
        'Melhora da fertilidade'
      ],
      examesIniciais: [
        'Exame fisico (palpacao com Valsalva)',
        'USG escrotal com Doppler',
        'Espermograma (se infertilidade ou adolescente)',
        'FSH, LH, testosterona (se hipogonadismo)',
        'Volume testicular (orquidometro ou USG)'
      ],
      redFlags: [
        'Varicocele isolada a direita (investigar massa retroperitoneal)',
        'Varicocele que nao esvazia em decubito (obstrucao venosa)',
        'Atrofia testicular ipsilateral',
        'Varicocele de inicio subito em adulto mais velho',
        'Infertilidade com espermograma anormal'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '15% dos homens; 40% dos homens inferteis',
        incidencia: 'Surge na puberdade; raro antes dos 10 anos',
        faixaEtaria: 'Adolescentes e adultos jovens',
        fatoresRisco: [
          'Postura ortostatica prolongada',
          'Atividade fisica intensa',
          'Anatomia venosa (veia testicular esquerda drena para veia renal esquerda)',
          'Ausencia de valvulas venosas'
        ],
        citations: [{ refId: 'aua-varicocele-2023' }]
      },
      fisiopatologia: {
        texto: 'Insuficiencia valvular e refluxo venoso no plexo pampiniforme causam dilatacao venosa. O aumento de temperatura escrotal e estase sanguinea prejudicam a espermatogenese. A veia testicular esquerda drena perpendicularmente na veia renal (maior pressao), explicando predominancia esquerda.',
        citations: [{ refId: 'eau-male-infertility-2024' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Frequentemente assintomatico (achado incidental)',
          'Dor ou desconforto escrotal (peso, sensacao de arraste)',
          'Dor piora ao ficar em pe ou com esforco',
          'Melhora em decubito',
          'Infertilidade'
        ],
        sinaisExameFisico: [
          'Inspecao e palpacao escrotal em pe',
          'Valsalva: acentua varicocele',
          'Aspecto de "saco de vermes" (grau III)',
          'Comparar volume testicular bilateral',
          'Decubito: veias devem esvaziar'
        ],
        formasClinicas: [
          'Varicocele esquerda isolada (mais comum - 90%)',
          'Varicocele bilateral (10%)',
          'Varicocele direita isolada (raro - investigar)'
        ],
        citations: [{ refId: 'aua-varicocele-2023' }]
      },
      diagnostico: {
        criterios: [
          'Exame fisico positivo (graus I, II, III)',
          'USG com Doppler para varicocele subclinica ou confirmacao'
        ],
        diagnosticoDiferencial: [
          'Hidrocele',
          'Espermatocele',
          'Hérnia inguinal',
          'Epididimite cronica',
          'Tumor testicular'
        ],
        examesLaboratoriais: [
          'Espermograma (2 amostras)',
          'FSH, LH, testosterona se hipogonadismo'
        ],
        examesImagem: [
          'USG escrotal com Doppler (refluxo + veia >=3mm)',
          'TC ou RM de abdome se varicocele direita isolada (excluir massa retroperitoneal)'
        ],
        citations: [{ refId: 'eau-male-infertility-2024' }]
      },
      tratamento: {
        objetivos: [
          'Aliviar dor',
          'Melhorar fertilidade',
          'Prevenir atrofia testicular'
        ],
        naoFarmacologico: {
          medidas: [
            'INDICACOES DE TRATAMENTO: dor, infertilidade com espermograma alterado, atrofia testicular em adolescente',
            'VARICOCELECTOMIA MICROSCOPICA: padrao-ouro; taxas de sucesso >95%',
            'LIGADURA LAPAROSCOPICA: alternativa',
            'EMBOLIZACAO PERCUTANEA: minimamente invasiva; taxa de recorrencia um pouco maior',
            'Varicocele subclinica: geralmente nao tratar'
          ],
          citations: [{ refId: 'aua-varicocele-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Nao ha tratamento farmacologico especifico', medicamentos: ['N/A'], posologia: 'N/A', observacoes: 'Tratamento e cirurgico' }
          ],
          situacoesEspeciais: [
            { situacao: 'Infertilidade', conduta: 'Varicocelectomia melhora parametros seminais em 60-70% e taxa de gravidez' },
            { situacao: 'Adolescente com atrofia', conduta: 'Varicocelectomia para preservar funcao testicular' },
            { situacao: 'Dor cronica', conduta: 'Varicocelectomia; excluir outras causas' }
          ],
          citations: [{ refId: 'eau-male-infertility-2024' }]
        },
        duracao: 'Tratamento unico; acompanhamento pos-operatorio'
      },
      acompanhamento: {
        frequenciaConsultas: 'Pos-operatorio: 1, 3 e 6 meses; depois anual',
        examesControle: [
          'Exame fisico (recorrencia)',
          'USG escrotal se suspeita de recorrencia',
          'Espermograma 3-6 meses apos cirurgia'
        ],
        metasTerapeuticas: [
          'Resolucao da varicocele',
          'Melhora do espermograma',
          'Alivio da dor'
        ],
        criteriosEncaminhamento: [
          'Varicocele sintomatica ou com indicacao cirurgica: urologista',
          'Infertilidade: andrologista',
          'Varicocele direita isolada: investigar retroperitonio'
        ],
        citations: [{ refId: 'aua-varicocele-2023' }]
      }
    },
    protocolos: ['varicocele-indicacoes-cirurgicas', 'infertilidade-masculina'],
    medicamentos: [],
    calculadoras: ['volume-testicular'],
    rastreamentos: [],
    citations: [{ refId: 'aua-varicocele-2023' }, { refId: 'eau-male-infertility-2024' }],
    lastUpdate: '2026-01',
    tags: ['varicocele', 'infertilidade', 'escroto', 'varicocelectomia']
  },

  // ============================================================================
  // DISFUNCAO SEXUAL
  // ============================================================================
  {
    id: 'disfuncao-eretil',
    titulo: 'Disfuncao Eretil',
    sinonimos: ['DE', 'Impotencia sexual', 'Erectile Dysfunction', 'ED'],
    doid: 'DOID:1876',
    snomedCT: '860914002',
    meshId: 'D007172',
    umlsCui: 'C0242350',
    ciap2: ['Y07'],
    cid10: ['N52', 'N52.0', 'N52.1', 'N52.2'],
    cid11: ['HA00'],
    hpo: ['HP:0000802'],
    categoria: 'urologico',
    subcategoria: 'disfuncao_sexual',
    quickView: {
      definicao: 'Incapacidade persistente ou recorrente de obter e/ou manter uma erecao peniana suficiente para atividade sexual satisfatoria. Prevalencia aumenta com idade. Marcador de doenca cardiovascular (mesmos fatores de risco).',
      criteriosDiagnosticos: [
        'Incapacidade de obter/manter erecao satisfatoria por >=3 meses',
        'Afeta >=75% das tentativas de relacao',
        'Questionarios validados: IIEF-5 (EF domain) <=21 sugere DE',
        'Classificar: leve (17-21), moderada (12-16), grave (<=11)',
        'Investigar causa: psicogenica, organica (vascular, neurogenica, hormonal, cavernosa) ou mista',
        'Erecoes noturnas/matinais preservadas sugerem componente psicogenico'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'MODIFICACAO DE ESTILO DE VIDA: perda de peso, exercicio, cessar tabagismo',
          'Tratamento de comorbidades (DM, HAS, dislipidemia)',
          'Suspender medicamentos causadores (beta-bloqueadores, tiazidicos, antidepressivos)',
          'Terapia psicossexual (se componente psicogenico)',
          'Terapia de casal'
        ],
        farmacologico: [
          'INIBIDORES DE PDE5 (primeira linha oral):',
          'Sildenafila 50-100mg, 1h antes do ato',
          'Tadalafila 10-20mg sob demanda ou 5mg diario',
          'Vardenafila 10-20mg, 1h antes',
          'Avanafila 100-200mg, 15-30min antes',
          'SEGUNDA LINHA: Injecao intracavernosa (alprostadil, trimix)',
          'TERCEIRA LINHA: Protese peniana'
        ]
      },
      metasTerapeuticas: [
        'Erecao satisfatoria para penetracao',
        'Melhora do IIEF-5',
        'Satisfacao do casal',
        'Tratar doenca cardiovascular subjacente'
      ],
      examesIniciais: [
        'Glicemia de jejum e HbA1c',
        'Perfil lipidico',
        'Testosterona total (manha)',
        'Creatinina',
        'TSH se sintomas',
        'PSA se >40 anos (antes de terapia hormonal)'
      ],
      redFlags: [
        'DE abrupta (causa psicogenica ou pos-trauma)',
        'Dor peniana ou doenca de Peyronie',
        'Priapismo previo',
        'Sintomas neurologicos',
        'Hipogonadismo (libido baixa, fadiga)',
        'DE em jovem sem fatores de risco (investigar causa)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '52% dos homens 40-70 anos; 70% aos 70 anos',
        incidencia: 'Aumenta com idade e comorbidades',
        faixaEtaria: 'Aumenta progressivamente apos 40 anos',
        fatoresRisco: [
          'Idade (principal)',
          'Diabetes mellitus (3x risco)',
          'Hipertensao',
          'Dislipidemia',
          'Obesidade',
          'Tabagismo',
          'Sedentarismo',
          'Doenca cardiovascular',
          'Medicamentos (anti-hipertensivos, antidepressivos)',
          'Depressao e ansiedade'
        ],
        citations: [{ refId: 'eau-sexual-dysfunction-2024' }]
      },
      fisiopatologia: {
        texto: 'A erecao depende de integridade vascular, neurologica, hormonal e psicologica. O oxido nitrico (NO) liberado de nervos cavernosos e endotelio ativa guanilato ciclase, aumentando GMPc, relaxando musculo liso e permitindo ingurgitamento. A PDE5 degrada o GMPc. Disfuncao endotelial (aterosclerose) e causa vascular mais comum.',
        citations: [{ refId: 'juro-ed-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dificuldade para obter erecao',
          'Dificuldade para manter erecao',
          'Erecao insuficiente para penetracao',
          'Reducao da rigidez',
          'Impacto na autoestima e relacionamento'
        ],
        sinaisExameFisico: [
          'Exame genital (tamanho, placas de Peyronie)',
          'Sinais de hipogonadismo (ginecomastia, reducao de pelos)',
          'Pulsos perifericos (vasculopatia)',
          'Exame neurologico (sensibilidade perineal, reflexo bulbocavernoso)',
          'PA, IMC, circunferencia abdominal'
        ],
        formasClinicas: [
          'DE psicogenica (erecoes noturnas preservadas)',
          'DE organica (vascular, neurogenica, hormonal, cavernosa)',
          'DE mista (mais comum)'
        ],
        citations: [{ refId: 'eau-sexual-dysfunction-2024' }]
      },
      diagnostico: {
        criterios: [
          'Historia clinica detalhada',
          'Questionarios validados (IIEF-5)',
          'Avaliacao de fatores de risco e comorbidades'
        ],
        diagnosticoDiferencial: [
          'Ejaculacao precoce',
          'Diminuicao da libido',
          'Anorgasmia',
          'Doenca de Peyronie',
          'Priapismo recorrente'
        ],
        examesLaboratoriais: [
          'Glicemia, HbA1c',
          'Lipidograma',
          'Testosterona total (manha)',
          'TSH, prolactina se suspeita',
          'PSA se >40 anos'
        ],
        examesImagem: [
          'Doppler peniano (casos selecionados)',
          'Ecodoppler de arterias penianas apos injecao intracavernosa'
        ],
        outrosExames: [
          'Tumescencia peniana noturna (NPT - diferencia psicogenica de organica)',
          'Avaliacao psicologica se indicado'
        ],
        citations: [{ refId: 'juro-ed-2023' }]
      },
      tratamento: {
        objetivos: [
          'Restaurar erecao satisfatoria',
          'Tratar doenca subjacente',
          'Melhorar qualidade de vida e relacionamento'
        ],
        naoFarmacologico: {
          medidas: [
            'Modificacao de estilo de vida',
            'Perda de peso (melhora em obesos)',
            'Exercicio aerobico regular',
            'Cessar tabagismo',
            'Terapia psicossexual',
            'Dispositivo de vacuo (opcao mecanica)'
          ],
          citations: [{ refId: 'eau-sexual-dysfunction-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inibidores de PDE5', medicamentos: ['Sildenafila', 'Tadalafila', 'Vardenafila', 'Avanafila'], posologia: 'Sildenafila 50-100mg 1h antes; Tadalafila 10-20mg sob demanda ou 5mg diario', observacoes: 'Eficacia 60-70%; evitar com nitratos' },
            { classe: 'Testosterona', medicamentos: ['Cipionato de testosterona', 'Undecanoato de testosterona'], posologia: 'Reposicao se T <300ng/dL + sintomas', observacoes: 'Melhora libido e pode potencializar PDE5i' }
          ],
          segundaLinha: [
            { classe: 'Injecao intracavernosa', medicamentos: ['Alprostadil', 'Trimix (PGE1 + fentolamina + papaverina)'], posologia: 'Alprostadil 5-20mcg; titular dose', observacoes: 'Eficacia >80%; risco de priapismo' },
            { classe: 'Alprostadil intrauretral', medicamentos: ['MUSE'], posologia: '125-1000mcg', observacoes: 'Menos eficaz que IIC' }
          ],
          situacoesEspeciais: [
            { situacao: 'Falha de PDE5i e IIC', conduta: 'Protese peniana (inflavel ou semirigida)' },
            { situacao: 'DE pos-prostatectomia radical', conduta: 'Reabilitacao peniana com PDE5i diario + IIC' },
            { situacao: 'Cardiovascular de alto risco', conduta: 'Avaliacao cardiologica antes de retomar atividade sexual' }
          ],
          citations: [{ refId: 'juro-ed-2023' }]
        },
        duracao: 'Tratamento continuo ou sob demanda'
      },
      acompanhamento: {
        frequenciaConsultas: 'Inicialmente a cada 1-3 meses; depois a cada 6-12 meses',
        examesControle: [
          'IIEF-5',
          'Glicemia, lipidograma anualmente',
          'Testosterona se em reposicao',
          'PSA anual se >40 anos'
        ],
        metasTerapeuticas: [
          'IIEF-5 >21 (funcao eretil normal)',
          'Satisfacao do paciente e parceira',
          'Controle de fatores de risco cardiovascular'
        ],
        criteriosEncaminhamento: [
          'Falha de PDE5i',
          'Candidato a protese peniana',
          'Hipogonadismo (endocrinologista/urologista)',
          'Doenca de Peyronie',
          'DE em jovem (investigacao especializada)'
        ],
        citations: [{ refId: 'eau-sexual-dysfunction-2024' }]
      },
      prevencao: {
        primaria: [
          'Controle de fatores de risco cardiovascular',
          'Manutencao de peso saudavel',
          'Atividade fisica regular',
          'Evitar tabagismo'
        ],
        secundaria: [
          'Tratamento otimizado de DM e HAS',
          'Reabilitacao pos-prostatectomia'
        ],
        citations: [{ refId: 'juro-ed-2023' }]
      },
      populacoesEspeciais: {
        idosos: 'PDE5i seguros; ajuste de dose; avaliar interacoes',
        drc: 'Sildenafila pode ser usada; ajuste de dose'
      }
    },
    protocolos: ['disfuncao-eretil-manejo', 'reabilitacao-peniana-pos-prostatectomia'],
    medicamentos: ['sildenafila', 'tadalafila', 'vardenafila', 'alprostadil'],
    calculadoras: ['iief-5', 'shim'],
    rastreamentos: ['risco-cardiovascular'],
    citations: [{ refId: 'eau-sexual-dysfunction-2024' }, { refId: 'juro-ed-2023' }],
    lastUpdate: '2026-01',
    tags: ['disfuncao eretil', 'impotencia', 'PDE5', 'sildenafila', 'tadalafila']
  }
];
