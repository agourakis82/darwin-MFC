/**
 * DOENÇAS GINECOLÓGICAS E OBSTÉTRICAS - DARWIN-MFC
 * =================================================
 * 
 * Ontologias integradas:
 * - DOID (Disease Ontology)
 * - SNOMED-CT (Systematized Nomenclature of Medicine)
 * - MeSH (Medical Subject Headings)
 * - UMLS CUI (Unified Medical Language System)
 */

import { Doenca } from '../../types/doenca';

export const doencasGinecoObstetricas: Doenca[] = [
  {
    id: 'sindrome-ovarios-policisticos',
    titulo: 'Síndrome dos Ovários Policísticos',
    sinonimos: ['SOP', 'PCOS', 'Anovulação hiperandrogênica', 'Stein-Leventhal'],
    doid: 'DOID:11612',
    snomedCT: '69878008',
    meshId: 'D011085',
    umlsCui: 'C0032460',
    ciap2: ['X99'],
    cid10: ['E28.2'],
    cid11: ['5A80'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Distúrbio endócrino-metabólico heterogêneo caracterizado por hiperandrogenismo, disfunção ovariana e morfologia policística dos ovários. Causa mais comum de anovulação e infertilidade feminina.',
      criteriosDiagnosticos: [
        'CRITÉRIOS DE ROTTERDAM (2003) - 2 de 3:',
        '1. Oligo/anovulação (ciclos >35 dias ou <8 ciclos/ano)',
        '2. Hiperandrogenismo clínico (hirsutismo, acne, alopecia) OU laboratorial (testosterona elevada)',
        '3. Ovários policísticos na USG (≥12 folículos de 2-9mm ou volume >10mL)',
        '',
        'EXCLUIR outras causas de hiperandrogenismo!'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Perda de peso (5-10% restaura ovulação em 50%)',
          'Dieta balanceada, baixo índice glicêmico',
          'Exercício físico regular',
          'Cessação do tabagismo'
        ],
        farmacologico: [
          'SEM DESEJO DE GESTAR:',
          'ACO combinado (etinilestradiol + antiandrogênico: drospirenona, ciproterona)',
          'Metformina 1500-2000mg/dia (resistência insulínica, síndrome metabólica)',
          '',
          'COM DESEJO DE GESTAR:',
          'Letrozol 2,5-7,5mg/dia por 5 dias (indutor de ovulação - 1ª linha)',
          'Clomifeno 50-150mg/dia por 5 dias (alternativa)',
          'Metformina adjuvante'
        ]
      },
      metasTerapeuticas: [
        'Regularização do ciclo menstrual',
        'Controle do hirsutismo e acne',
        'Prevenção de síndrome metabólica e DM2',
        'Indução da ovulação se desejo de gestar',
        'Proteção endometrial'
      ],
      examesIniciais: [
        'USG transvaginal (morfologia ovariana)',
        'Testosterona total e livre',
        'SHBG (globulina ligadora)',
        'FSH, LH (LH/FSH >2 é sugestivo)',
        '17-OH-progesterona (descartar HAC tardia)',
        'Prolactina, TSH',
        'Glicemia, insulina de jejum, HOMA-IR',
        'Perfil lipídico'
      ],
      redFlags: [
        'Virilização rápida (tumor adrenal/ovariano)',
        'Testosterona >200 ng/dL (tumor)',
        'Amenorreia secundária (descartar gestação, hiperprolactinemia)',
        'Galactorreia',
        'Sinais de Cushing'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '6-20% das mulheres em idade reprodutiva (critérios utilizados)',
        incidencia: 'Doença endócrina mais comum em mulheres jovens',
        faixaEtaria: 'Menarca até menopausa, pico 20-30 anos',
        fatoresRisco: [
          'Obesidade (50-70% das pacientes)',
          'Resistência insulínica',
          'História familiar de SOP ou DM2',
          'Baixo peso ao nascer',
          'Pubarca precoce'
        ],
        citations: [{ refId: 'eshre-pcos-2023' }]
      },
      fisiopatologia: {
        texto: 'Disfunção neuroendócrina com aumento de pulsos de GnRH, elevando LH e produção ovariana de androgênios. Resistência insulínica agrava hiperandrogenismo (insulina estimula tecal e reduz SHBG). Anovulação crônica causa oligo/amenorreia e infertilidade.',
        citations: [{ refId: 'eshre-pcos-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Irregularidade menstrual (oligo/amenorreia)',
          'Hirsutismo (face, tórax, linha alba)',
          'Acne persistente',
          'Alopecia androgenética',
          'Dificuldade para engravidar',
          'Ganho de peso'
        ],
        sinaisExameFisico: [
          'Hirsutismo (escala de Ferriman-Gallwey ≥8)',
          'Acne inflamatória',
          'Acanthosis nigricans (resistência insulínica)',
          'Obesidade central',
          'Alopecia frontoparietal'
        ],
        formasClinicas: [
          'Fenótipo A (clássico): Hiperandrogenismo + Anovulação + USG policístico',
          'Fenótipo B: Hiperandrogenismo + Anovulação',
          'Fenótipo C (ovulatório): Hiperandrogenismo + USG policístico',
          'Fenótipo D: Anovulação + USG policístico'
        ],
        citations: [{ refId: 'eshre-pcos-2023' }]
      },
      diagnostico: {
        criterios: [
          'Critérios de Rotterdam (2 de 3)',
          'Excluir outras causas de hiperandrogenismo',
          'Adolescentes: critérios mais restritos'
        ],
        diagnosticoDiferencial: [
          'Hiperplasia adrenal congênita (HAC) forma tardia',
          'Hiperprolactinemia',
          'Disfunção tireoidiana',
          'Síndrome de Cushing',
          'Tumores produtores de androgênios',
          'Amenorreia hipotalâmica'
        ],
        examesLaboratoriais: [
          'Testosterona, SHBG',
          '17-OH-progesterona (HAC)',
          'Prolactina, TSH',
          'FSH, LH, estradiol',
          'DHEA-S (suprarrenal)',
          'Glicemia, insulina, HOMA-IR',
          'Perfil lipídico'
        ],
        citations: [{ refId: 'eshre-pcos-2023' }]
      },
      tratamento: {
        objetivos: [
          'Regularizar ciclos',
          'Tratar hiperandrogenismo',
          'Prevenir complicações metabólicas',
          'Induzir ovulação se desejo reprodutivo'
        ],
        naoFarmacologico: {
          medidas: [
            'Perda de peso (principal)',
            'Dieta mediterrânea/baixo IG',
            'Exercício aeróbico regular',
            'Cessação do tabagismo'
          ],
          citations: [{ refId: 'eshre-pcos-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Contraceptivo oral combinado',
              medicamentos: ['EE + Drospirenona', 'EE + Ciproterona'],
              posologia: 'Uso contínuo ou cíclico. Regulariza ciclo, reduz androgênios, protege endométrio.'
            },
            {
              classe: 'Sensibilizador de insulina',
              medicamentos: ['Metformina'],
              posologia: '1500-2000mg/dia (iniciar baixo, titular). Se RI ou pré-DM.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Indutor de ovulação (se desejo de gestar)',
              medicamentos: ['Letrozol', 'Clomifeno'],
              posologia: 'Letrozol 2,5-7,5mg D3-D7. Taxa ovulação 70-85%.'
            },
            {
              classe: 'Antiandrogênico',
              medicamentos: ['Espironolactona', 'Finasterida'],
              posologia: 'Espironolactona 100-200mg/dia (hirsutismo). Contracepção obrigatória!'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Resistente a letrozol/clomifeno',
              conduta: 'Gonadotrofinas, drilling ovariano laparoscópico, FIV.'
            }
          ],
          citations: [{ refId: 'eshre-pcos-2023' }]
        },
        duracao: 'Crônico, ajustado conforme objetivos e fase da vida.'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses inicialmente',
        examesControle: [
          'Ciclo menstrual (diário)',
          'Glicemia, perfil lipídico anual',
          'USG se amenorreia prolongada (espessura endometrial)',
          'Peso, PA'
        ],
        metasTerapeuticas: [
          'Ciclos regulares',
          'Hirsutismo controlado',
          'Parâmetros metabólicos normais'
        ],
        criteriosEncaminhamento: [
          'Desejo de gestar (reprodução assistida)',
          'Hirsutismo grave refratário',
          'Suspeita de tumor',
          'Síndrome metabólica'
        ],
        citations: [{ refId: 'eshre-pcos-2023' }]
      },
      prevencao: {
        primaria: [
          'Manter peso saudável',
          'Atividade física'
        ],
        secundaria: [
          'Rastreio de DM2 a cada 1-3 anos',
          'Proteção endometrial se anovulação'
        ],
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['metformina', 'letrozol', 'clomifeno', 'espironolactona'],
    calculadoras: ['homa-ir', 'ferriman-gallwey'],
    rastreamentos: ['rastreamento-dm2'],
    citations: [{ refId: 'eshre-pcos-2023' }],
    lastUpdate: '2024-12',
    tags: ['sop', 'ovarios-policisticos', 'hirsutismo', 'anovulacao', 'infertilidade'],
  },
  {
    id: 'vulvovaginite-candidíase',
    titulo: 'Candidíase Vulvovaginal',
    sinonimos: ['CVV', 'Candidose vaginal', 'Monilíase vaginal'],
    doid: 'DOID:13842',
    snomedCT: '78048006',
    meshId: 'D002181',
    umlsCui: 'C0006840',
    ciap2: ['X72'],
    cid10: ['B37.3'],
    cid11: ['1F23.1'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Infecção vulvovaginal causada por leveduras do gênero Candida (principalmente C. albicans). Caracterizada por prurido vulvar intenso, corrimento branco grumoso e disúria externa. Muito comum - 75% das mulheres terão ao menos 1 episódio.',
      criteriosDiagnosticos: [
        'DIAGNÓSTICO CLÍNICO + LABORATORIAL:',
        'Prurido vulvar intenso (sintoma cardinal)',
        'Corrimento branco, grumoso, "tipo leite coalhado"',
        'Eritema e edema vulvar',
        'pH vaginal normal (4,0-4,5)',
        'Teste de KOH: hifas e pseudo-hifas na microscopia',
        'Cultura fúngica se recorrente ou atípica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar roupas íntimas sintéticas (preferir algodão)',
          'Evitar duchas vaginais',
          'Manter área genital seca',
          'Tratar parceiro apenas se sintomático (balanite)'
        ],
        farmacologico: [
          'CVV NÃO COMPLICADA:',
          'Fluconazol 150mg VO dose única OU',
          'Clotrimazol creme vaginal 1% por 7 noites OU',
          'Miconazol óvulo 200mg por 3 noites',
          '',
          'CVV RECORRENTE (≥4 episódios/ano):',
          'Fluconazol 150mg VO D1, D4, D7 (indução)',
          'Depois Fluconazol 150mg 1x/semana por 6 meses (manutenção)'
        ]
      },
      metasTerapeuticas: [
        'Resolução dos sintomas',
        'Erradicação fúngica',
        'Prevenção de recorrência'
      ],
      examesIniciais: [
        'pH vaginal (normal na candidíase)',
        'Exame a fresco + KOH (hifas, pseudo-hifas, esporos)',
        'Cultura fúngica se recorrente ou refratária (identificar espécie)',
        'Glicemia se recorrente (descartar DM)'
      ],
      redFlags: [
        'CVV recorrente (≥4/ano): investigar DM, imunossupressão',
        'Candida não-albicans (C. glabrata): resistência a azóis',
        'Gestante: evitar fluconazol oral (usar tópicos)',
        'Vulvovaginite grave com ulceração'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '75% das mulheres terão ≥1 episódio, 40-45% terão ≥2',
        incidencia: '5-8% têm CVV recorrente',
        faixaEtaria: 'Idade reprodutiva',
        fatoresRisco: [
          'Uso recente de antibióticos',
          'Diabetes mellitus',
          'Gestação',
          'Imunossupressão',
          'Uso de corticoides',
          'Contraceptivos com alto estrogênio',
          'Atividade sexual frequente'
        ],
        citations: [{ refId: 'cdc-sti-2021' }]
      },
      fisiopatologia: {
        texto: 'Candida faz parte da microbiota vaginal normal em 20-50% das mulheres. Alterações no equilíbrio (antibióticos, imunossupressão, estrogênio) permitem proliferação fúngica. Resposta inflamatória local causa os sintomas.',
        citations: [{ refId: 'cdc-sti-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Prurido vulvar intenso (mais característico)',
          'Ardência vulvar',
          'Corrimento branco, grumoso, sem odor',
          'Disúria externa',
          'Dispareunia superficial'
        ],
        sinaisExameFisico: [
          'Eritema e edema vulvar',
          'Escoriações por coçadura',
          'Corrimento aderido às paredes vaginais',
          'Mucosa vaginal eritematosa'
        ],
        formasClinicas: [
          'CVV não complicada (maioria)',
          'CVV complicada: grave, recorrente, não-albicans, gestante, imunossuprimida'
        ],
        citations: [{ refId: 'cdc-sti-2021' }]
      },
      diagnostico: {
        criterios: [
          'Clínica + microscopia ou cultura',
          'pH normal ajuda a diferenciar de VB'
        ],
        diagnosticoDiferencial: [
          'Vaginose bacteriana (pH >4,5, odor de peixe)',
          'Tricomoníase (corrimento amarelo-esverdeado, espumoso)',
          'Herpes genital (vesículas, úlceras)',
          'Dermatite de contato',
          'Líquen escleroso'
        ],
        examesLaboratoriais: [
          'Exame a fresco com KOH',
          'Cultura fúngica (Sabouraud)',
          'pH vaginal'
        ],
        citations: [{ refId: 'cdc-sti-2021' }]
      },
      tratamento: {
        objetivos: [
          'Aliviar sintomas',
          'Erradicar fungo',
          'Prevenir recorrência'
        ],
        naoFarmacologico: {
          medidas: [
            'Roupas íntimas de algodão',
            'Evitar duchas vaginais',
            'Manter área seca'
          ],
          citations: [{ refId: 'cdc-sti-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Azol oral',
              medicamentos: ['Fluconazol'],
              posologia: '150mg VO dose única. Eficácia 90%.'
            },
            {
              classe: 'Azol tópico',
              medicamentos: ['Clotrimazol', 'Miconazol', 'Terconazol'],
              posologia: 'Clotrimazol creme 1% 7 noites ou Miconazol óvulo 200mg 3 noites.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Esquema de manutenção (recorrente)',
              medicamentos: ['Fluconazol'],
              posologia: '150mg semanal por 6 meses após indução.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Gestante',
              conduta: 'Apenas tratamento tópico (7 dias). Fluconazol oral contraindicado.'
            },
            {
              situacao: 'C. glabrata (resistente)',
              conduta: 'Ácido bórico 600mg intravaginal por 14 noites.'
            }
          ],
          citations: [{ refId: 'cdc-sti-2021' }]
        },
        duracao: 'Episódio: 1-7 dias. Manutenção: 6 meses.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno se não melhora em 72h ou recorrência',
        examesControle: [
          'Cultura se recorrente ou refratária'
        ],
        metasTerapeuticas: [
          'Resolução de sintomas',
          '<4 episódios/ano'
        ],
        criteriosEncaminhamento: [
          'CVV recorrente refratária',
          'Imunossupressão',
          'Necessidade de avaliação de comorbidades'
        ],
        citations: [{ refId: 'cdc-sti-2021' }]
      },
      prevencao: {
        primaria: [
          'Evitar antibióticos desnecessários',
          'Controle glicêmico em DM'
        ],
        secundaria: [
          'Esquema de manutenção se recorrente'
        ],
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['fluconazol', 'clotrimazol', 'miconazol'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'cdc-sti-2021' }],
    lastUpdate: '2024-12',
    tags: ['candidiase', 'vulvovaginite', 'prurido', 'fluconazol', 'corrimento'],
  },
  {
    id: 'vaginose-bacteriana',
    titulo: 'Vaginose Bacteriana',
    sinonimos: ['VB', 'Gardnerelose', 'Vaginite por Gardnerella'],
    doid: 'DOID:13808',
    snomedCT: '419760006',
    meshId: 'D016585',
    umlsCui: 'C0085166',
    ciap2: ['X84'],
    cid10: ['N76.0'],
    cid11: ['1A95.3'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Desequilíbrio da microbiota vaginal com redução de Lactobacillus e proliferação de anaeróbios (Gardnerella vaginalis, Prevotella, Mobiluncus). Causa mais comum de corrimento vaginal. NÃO é IST clássica.',
      criteriosDiagnosticos: [
        'CRITÉRIOS DE AMSEL (3 de 4):',
        '1. Corrimento vaginal homogêneo, fino, acinzentado',
        '2. pH vaginal >4,5',
        '3. Teste de Whiff positivo (odor de peixe ao adicionar KOH)',
        '4. Clue cells na microscopia (>20%)',
        '',
        'OU Score de Nugent ≥7 (padrão-ouro, Gram do conteúdo vaginal)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar duchas vaginais',
          'Não tratar parceiro de rotina',
          'Orientar sobre recorrência'
        ],
        farmacologico: [
          'TRATAMENTO DE ESCOLHA:',
          'Metronidazol 500mg VO 12/12h por 7 dias OU',
          'Metronidazol gel vaginal 0,75% 1x/dia por 5 noites OU',
          'Clindamicina creme vaginal 2% 1x/noite por 7 noites',
          '',
          'VB RECORRENTE:',
          'Metronidazol gel 0,75% 2x/semana por 4-6 meses'
        ]
      },
      metasTerapeuticas: [
        'Resolução do corrimento e odor',
        'Restauração da microbiota (Lactobacillus)',
        'Prevenção de complicações (DIP, complicações obstétricas)'
      ],
      examesIniciais: [
        'pH vaginal (>4,5)',
        'Teste de Whiff',
        'Microscopia (clue cells)',
        'Gram + Score de Nugent (padrão-ouro)',
        'Descartar outras ISTs se fatores de risco'
      ],
      redFlags: [
        'Gestante com VB: risco aumentado de parto prematuro',
        'VB pré-procedimento (DIU, curetagem, histeroscopia)',
        'Sinais de DIP (dor pélvica, febre)',
        'VB recorrente (investigar fatores de risco)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-30% das mulheres em idade reprodutiva',
        incidencia: 'Causa mais comum de corrimento vaginal',
        faixaEtaria: 'Idade reprodutiva',
        fatoresRisco: [
          'Múltiplos parceiros sexuais',
          'Novo parceiro sexual',
          'Duchas vaginais',
          'Falta de Lactobacillus (uso de antibióticos)',
          'DIU',
          'Tabagismo'
        ],
        citations: [{ refId: 'cdc-sti-2021' }]
      },
      fisiopatologia: {
        texto: 'Substituição da microbiota dominada por Lactobacillus (produtores de ácido lático e H2O2) por flora anaeróbia mista. O pH sobe >4,5 e as bactérias anaeróbias produzem aminas (odor de peixe) e formam biofilme aderente ao epitélio vaginal.',
        citations: [{ refId: 'cdc-sti-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Corrimento vaginal homogêneo, acinzentado',
          'Odor de peixe (piora após relação e menstruação)',
          'Pode ser assintomática (50%)',
          'Prurido leve ou ausente (diferente de candidíase)'
        ],
        sinaisExameFisico: [
          'Corrimento fino, homogêneo, branco-acinzentado',
          'Ausência de inflamação vulvar significativa',
          'pH >4,5'
        ],
        formasClinicas: [
          'VB sintomática',
          'VB assintomática',
          'VB recorrente (≥3 episódios/ano)'
        ],
        citations: [{ refId: 'cdc-sti-2021' }]
      },
      diagnostico: {
        criterios: [
          'Critérios de Amsel (3 de 4)',
          'Score de Nugent (padrão-ouro)'
        ],
        diagnosticoDiferencial: [
          'Candidíase (pH normal, prurido intenso)',
          'Tricomoníase (corrimento espumoso, amarelo-esverdeado)',
          'Cervicite (corrimento mucopurulento)',
          'Vaginite atrófica'
        ],
        examesLaboratoriais: [
          'pH vaginal',
          'Teste de Whiff',
          'Microscopia (clue cells)',
          'Gram + Nugent'
        ],
        citations: [{ refId: 'cdc-sti-2021' }]
      },
      tratamento: {
        objetivos: [
          'Eliminar sintomas',
          'Restaurar microbiota',
          'Prevenir complicações'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar duchas vaginais',
            'Evitar fumo',
            'Parceiro não precisa tratar de rotina'
          ],
          citations: [{ refId: 'cdc-sti-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Metronidazol oral',
              medicamentos: ['Metronidazol'],
              posologia: '500mg 12/12h por 7 dias. Evitar álcool.'
            },
            {
              classe: 'Metronidazol vaginal',
              medicamentos: ['Metronidazol gel 0,75%'],
              posologia: '5g intravaginal 1x/noite por 5 noites.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Clindamicina vaginal',
              medicamentos: ['Clindamicina creme 2%'],
              posologia: '5g intravaginal 1x/noite por 7 noites.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Gestante sintomática',
              conduta: 'Metronidazol 500mg 12/12h VO 7d ou Metronidazol 250mg 8/8h 7d. Tratar para reduzir risco de parto prematuro.'
            },
            {
              situacao: 'VB recorrente',
              conduta: 'Metronidazol gel 2x/semana por 4-6 meses. Probióticos vaginais podem ajudar.'
            }
          ],
          citations: [{ refId: 'cdc-sti-2021' }]
        },
        duracao: 'Episódio: 5-7 dias. Manutenção: 4-6 meses.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno apenas se persistência ou recorrência',
        examesControle: [
          'Não é necessário teste de cura de rotina'
        ],
        metasTerapeuticas: [
          'Resolução de sintomas'
        ],
        criteriosEncaminhamento: [
          'Recorrência frequente',
          'Falha ao tratamento'
        ],
        citations: [{ refId: 'cdc-sti-2021' }]
      },
      prevencao: {
        primaria: [
          'Evitar duchas vaginais',
          'Reduzir número de parceiros'
        ],
        secundaria: [
          'Esquema de manutenção se recorrente'
        ],
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['metronidazol', 'clindamicina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'cdc-sti-2021' }],
    lastUpdate: '2024-12',
    tags: ['vaginose', 'corrimento', 'gardnerella', 'metronidazol', 'odor'],
  },
  {
    id: 'pre-eclampsia',
    titulo: 'Pré-eclâmpsia',
    sinonimos: ['PE', 'Toxemia gravídica', 'Doença hipertensiva específica da gestação'],
    doid: 'DOID:10591',
    snomedCT: '398254007',
    meshId: 'D011225',
    umlsCui: 'C0032914',
    ciap2: ['W81'],
    cid10: ['O14', 'O14.0', 'O14.1'],
    cid11: ['JA24'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Síndrome multissistêmica exclusiva da gestação, caracterizada por hipertensão arterial (≥140/90) após 20 semanas + proteinúria OU disfunção de órgão-alvo. Emergência obstétrica - principal causa de mortalidade materna.',
      criteriosDiagnosticos: [
        'PA ≥140/90 mmHg após 20 semanas de gestação (2 medidas com intervalo ≥4h)',
        '+',
        'Proteinúria ≥300mg/24h (ou relação proteína/creatinina ≥0,3) OU',
        'Na ausência de proteinúria: disfunção de órgão-alvo:',
        '- Plaquetopenia <100.000/µL',
        '- Creatinina >1,1 mg/dL ou dobro do basal',
        '- TGO/TGP >2x limite superior',
        '- Edema pulmonar',
        '- Sintomas cerebrais (cefaleia, escotomas)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Internação hospitalar',
          'Repouso relativo',
          'Monitorização materno-fetal intensiva',
          'Avaliação de gravidade (critérios de gravidade)',
          'Definição de momento do parto (única cura definitiva)'
        ],
        farmacologico: [
          'ANTI-HIPERTENSIVO (PA ≥160/110):',
          'Nifedipina 10-20mg VO a cada 30 min (máx 60mg)',
          'Hidralazina 5mg IV a cada 20 min (máx 20mg)',
          'Meta: PAS 140-155, PAD 90-100 mmHg',
          '',
          'PROFILAXIA DE ECLÂMPSIA (PE grave):',
          'Sulfato de magnésio: Ataque 4g IV + Manutenção 1-2g/h IV',
          '',
          'CORTICOIDE (maturação pulmonar se <34 sem):',
          'Betametasona 12mg IM, 2 doses com intervalo de 24h'
        ]
      },
      metasTerapeuticas: [
        'Prevenir eclâmpsia (convulsão)',
        'Prevenir AVC materno',
        'Manter perfusão placentária adequada',
        'Definir momento ideal do parto',
        'Otimizar condições fetais (maturação pulmonar)'
      ],
      examesIniciais: [
        'Hemograma com plaquetas',
        'Creatinina, ureia',
        'TGO, TGP, LDH, bilirrubinas',
        'Proteinúria 24h ou relação P/C',
        'Ácido úrico',
        'Coagulograma',
        'USG obstétrico + Doppler',
        'CTG (cardiotocografia)'
      ],
      redFlags: [
        'CRITÉRIOS DE GRAVIDADE (PE grave):',
        'PA ≥160/110 mmHg',
        'Plaquetas <100.000/µL',
        'TGO/TGP >2x normal',
        'Creatinina >1,1 mg/dL',
        'Edema pulmonar',
        'Sintomas cerebrais: cefaleia intensa, escotomas, confusão',
        'Dor epigástrica/hipocôndrio direito (distensão hepática)',
        'Oligúria <500 mL/24h',
        'HELLP (hemólise, enzimas hepáticas elevadas, plaquetopenia)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-8% das gestações',
        incidencia: 'Principal causa de mortalidade materna',
        faixaEtaria: 'Qualquer gestante, mais comum em extremos reprodutivos',
        fatoresRisco: [
          'Primigesta (principal)',
          'Gestação múltipla',
          'História pessoal ou familiar de PE',
          'HAS crônica, DM, DRC, LES',
          'Obesidade',
          'Idade materna >35 ou <18 anos',
          'Raça negra',
          'Novo parceiro',
          'Longo intervalo interpartal'
        ],
        citations: [{ refId: 'acog-hyp-2020' }]
      },
      fisiopatologia: {
        texto: 'Placentação deficiente no 1º trimestre com falha no remodelamento das artérias espiraladas. Hipóxia placentária libera fatores antiangiogênicos (sFlt-1) que causam disfunção endotelial sistêmica, vasoespasmo, ativação da coagulação e lesão de múltiplos órgãos.',
        citations: [{ refId: 'acog-hyp-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Hipertensão arterial',
          'Edema (não específico)',
          'Cefaleia frontal ou occipital intensa',
          'Escotomas, fotopsias',
          'Dor epigástrica/hipocôndrio direito',
          'Oligúria'
        ],
        sinaisExameFisico: [
          'PA ≥140/90 mmHg',
          'Edema de face e mãos',
          'Hiperreflexia',
          'Dor à palpação de hipocôndrio direito',
          'Ganho ponderal excessivo'
        ],
        formasClinicas: [
          'PE sem critérios de gravidade',
          'PE com critérios de gravidade',
          'Eclâmpsia (convulsão)',
          'Síndrome HELLP',
          'PE superimposta à HAS crônica'
        ],
        citations: [{ refId: 'acog-hyp-2020' }]
      },
      diagnostico: {
        criterios: [
          'PA ≥140/90 após 20 semanas + proteinúria ou disfunção de órgão-alvo',
          'Classificar gravidade'
        ],
        diagnosticoDiferencial: [
          'HAS crônica',
          'HAS gestacional (sem proteinúria/disfunção)',
          'Síndrome hemolítico-urêmica',
          'PTT',
          'Esteatose hepática aguda da gestação'
        ],
        examesLaboratoriais: [
          'Hemograma, plaquetas, esfregaço (esquizócitos?)',
          'Creatinina, ureia',
          'TGO, TGP, LDH, bilirrubinas',
          'Ácido úrico',
          'Proteinúria 24h',
          'Coagulograma'
        ],
        citations: [{ refId: 'acog-hyp-2020' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir complicações maternas',
          'Prevenir eclâmpsia',
          'Otimizar condições fetais',
          'Definir momento do parto'
        ],
        naoFarmacologico: {
          medidas: [
            'Internação',
            'Monitorização intensiva',
            'Balanço hídrico',
            'Repouso relativo'
          ],
          citations: [{ refId: 'acog-hyp-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Anti-hipertensivo (se PA ≥160/110)',
              medicamentos: ['Nifedipina', 'Hidralazina', 'Labetalol'],
              posologia: 'Nifedipina 10-20mg VO. Hidralazina 5-10mg IV. Meta: 140-155/90-100.'
            },
            {
              classe: 'Anticonvulsivante (profilaxia de eclâmpsia)',
              medicamentos: ['Sulfato de magnésio'],
              posologia: 'Ataque: 4-6g IV em 20 min. Manutenção: 1-2g/h IV. Monitorar reflexos, FR, diurese.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Corticoide (maturação pulmonar)',
              medicamentos: ['Betametasona', 'Dexametasona'],
              posologia: 'Betametasona 12mg IM, repetir em 24h (se <34 semanas).'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'PE grave ou HELLP',
              conduta: 'Estabilização materna + Parto (única cura). Geralmente interrupção se >34 sem.'
            },
            {
              situacao: 'Eclâmpsia',
              conduta: 'MgSO4 imediato. Estabilização. Parto após estabilização (não cesariana de emergência).'
            }
          ],
          citations: [{ refId: 'acog-hyp-2020' }]
        },
        duracao: 'Até o parto (cura definitiva).'
      },
      acompanhamento: {
        frequenciaConsultas: 'Internação na PE grave. PE sem gravidade: ambulatorial rigoroso.',
        examesControle: [
          'Hemograma, função hepática, renal diário se grave',
          'CTG diária',
          'Doppler fetal seriado'
        ],
        metasTerapeuticas: [
          'Ausência de eclâmpsia',
          'PA controlada',
          'Bem-estar fetal'
        ],
        criteriosEncaminhamento: [
          'Toda PE deve ser acompanhada em centro de referência',
          'UTI materna se HELLP ou eclâmpsia'
        ],
        citations: [{ refId: 'acog-hyp-2020' }]
      },
      prevencao: {
        primaria: [
          'AAS baixa dose (100-150mg/noite) a partir de 12-16 sem em alto risco',
          'Suplementação de cálcio (1-2g/dia) em populações com baixa ingesta'
        ],
        secundaria: [
          'Pré-natal adequado',
          'Diagnóstico precoce'
        ],
        citations: []
      },
    },
    protocolos: ['pre-eclampsia-manejo', 'sulfato-magnesio'],
    medicamentos: ['nifedipina', 'hidralazina', 'sulfato-magnesio', 'betametasona'],
    calculadoras: ['risco-pre-eclampsia'],
    rastreamentos: [],
    citations: [{ refId: 'acog-hyp-2020' }],
    lastUpdate: '2024-12',
    tags: ['pre-eclampsia', 'hellp', 'eclampsia', 'gestacao', 'hipertensao'],
  }
];

