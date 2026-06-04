/**
 * DOENCAS GASTROINTESTINAIS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ==============================================================
 * Doencas inflamatorias intestinais, hepatobiliares e esofagicas
 */

import { Doenca } from '@/lib/types/doenca';

export const gastrointestinaisAvancadas: Doenca[] = [
  // ============================================================================
  // DOENCAS INFLAMATORIAS INTESTINAIS
  // ============================================================================
  {
    id: 'doenca-crohn',
    titulo: 'Doenca de Crohn',
    sinonimos: ['Ileite regional', 'Enterite regional', 'Enterite granulomatosa'],
    doid: 'DOID:8778',
    snomedCT: '34000006',
    meshId: 'D003424',
    umlsCui: 'C0010346',
    ciap2: ['D94'],
    cid10: ['K50'],
    cid11: ['DD70'],
    categoria: 'gastrointestinal',
    subcategoria: 'doenca_inflamatoria_intestinal',
    quickView: {
      definicao: 'Doenca inflamatoria intestinal cronica, transmural, que pode afetar qualquer segmento do trato gastrointestinal (boca ao anus), mais comum no ileo terminal e colon. Padrao descontinuo (skip lesions) e granulomas nao caseosos.',
      criteriosDiagnosticos: [
        'Diarreia cronica (>4 semanas) com ou sem sangue',
        'Dor abdominal recorrente, especialmente fossa iliaca direita',
        'Perda de peso e sintomas sistemicos',
        'Doenca perianal (fistulas, abscessos) - altamente sugestiva',
        'Endoscopia: ulceras aftoides, aspecto em pedra de calcamento',
        'Histologia: inflamacao transmural, granulomas nao caseosos',
        'Imagem: espessamento de parede, estenoses, fistulas'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cessacao do tabagismo (fundamental)',
          'Suporte nutricional',
          'Dieta enteral exclusiva (especialmente em criancas)',
          'Acompanhamento multidisciplinar'
        ],
        farmacologico: [
          'LEVE: Budesonida 9mg/dia (ileo/colon direito)',
          'MODERADA: Prednisona 40-60mg/dia + imunomodulador',
          'MODERADA-GRAVE: Anti-TNF (Infliximabe, Adalimumabe)',
          'MANUTENCAO: Azatioprina, Metotrexato, ou biologicos',
          'PERIANAL: Anti-TNF + antibioticos (Ciprofloxacino + Metronidazol)'
        ]
      },
      metasTerapeuticas: [
        'Remissao clinica (CDAI <150)',
        'Cicatrizacao mucosa (endoscopica)',
        'Remissao livre de corticoide',
        'Prevencao de complicacoes e cirurgias'
      ],
      examesIniciais: [
        'Ileocolonoscopia com biopsias seriadas',
        'Calprotectina fecal',
        'PCR e VHS',
        'Hemograma, albumina, ferritina',
        'Enteroressonancia ou enterotomografia'
      ],
      redFlags: [
        'Obstrucao intestinal',
        'Perfuracao',
        'Abscesso intra-abdominal',
        'Hemorragia macica',
        'Megacolon toxico',
        'Doenca perianal complexa'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '100-300/100.000 em paises desenvolvidos',
        incidencia: '3-20/100.000/ano; aumentando globalmente',
        faixaEtaria: 'Pico bimodal: 15-30 anos e 50-70 anos',
        fatoresRisco: [
          'Historia familiar (risco 10-15x se parente de 1o grau)',
          'Tabagismo (dobra o risco, piora evolucao)',
          'Mutacoes NOD2/CARD15',
          'Dieta ocidentalizada',
          'Antibioticos na infancia'
        ],
        citations: [{ refId: 'ecco-crohn-2023' }]
      },
      fisiopatologia: {
        texto: 'Resposta imune aberrante a microbiota intestinal em individuos geneticamente suscetiveis. Desequilibrio Th1/Th17, producao excessiva de TNF-alfa, IL-12, IL-23. Inflamacao transmural leva a estenoses, fistulas e abscessos.',
        citations: [{ refId: 'nature-ibd-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Diarreia cronica (pode ser sem sangue)',
          'Dor abdominal (tipicamente FID)',
          'Perda de peso involuntaria',
          'Fadiga',
          'Febre baixa',
          'Manifestacoes perianais'
        ],
        sinaisExameFisico: [
          'Massa palpavel em FID',
          'Fistulas e abscessos perianais',
          'Ulceras orais',
          'Sinais de desnutricao',
          'Manifestacoes extraintestinais'
        ],
        formasClinicas: [
          'Inflamatoria (B1) - mais comum',
          'Estenosante (B2)',
          'Penetrante/fistulizante (B3)',
          'Classificacao de Montreal: idade, localizacao, comportamento'
        ],
        citations: [{ refId: 'ecco-crohn-2023' }]
      },
      diagnostico: {
        criterios: [
          'Combinacao de clinica + endoscopia + histologia + imagem',
          'Endoscopia: ulceras longitudinais, aspecto em pedras de calcamento',
          'Histologia: granulomas nao caseosos (30-50%)',
          'Envolvimento descontinuo e transmural'
        ],
        diagnosticoDiferencial: [
          'Retocolite ulcerativa',
          'Colite infecciosa',
          'Tuberculose intestinal',
          'Linfoma intestinal',
          'Sindrome do intestino irritavel',
          'Doenca celiaca'
        ],
        examesLaboratoriais: [
          'Calprotectina fecal (>250 sugere atividade)',
          'PCR, VHS',
          'Hemograma (anemia)',
          'Albumina, ferritina, B12, folato',
          'ASCA (70% positivo), pANCA (negativo)'
        ],
        examesImagem: [
          'Enteroressonancia magnetica (padrao-ouro para intestino delgado)',
          'Enterotomografia',
          'USG de alcas (espessamento >3mm)'
        ],
        outrosExames: [
          'Ileocolonoscopia com biopsias',
          'Capsula endoscopica (se colonoscopia normal)',
          'Enteroscopia se necessario'
        ],
        citations: [{ refId: 'ecco-crohn-2023' }]
      },
      tratamento: {
        objetivos: [
          'Inducao e manutencao da remissao',
          'Cicatrizacao mucosa',
          'Evitar corticodependencia',
          'Prevenir complicacoes e cirurgia'
        ],
        naoFarmacologico: {
          medidas: [
            'Cessacao do tabagismo (FUNDAMENTAL)',
            'Nutricao enteral exclusiva (criancas)',
            'Suplementacao nutricional',
            'Suporte psicologico'
          ],
          citations: [{ refId: 'ecco-crohn-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide topico', medicamentos: ['Budesonida'], posologia: '9mg/dia por 8 semanas', observacoes: 'Doenca ileal ou colon direito leve-moderada' },
            { classe: 'Corticoide sistemico', medicamentos: ['Prednisona'], posologia: '40-60mg/dia, desmame em 8-12 semanas', observacoes: 'Doenca moderada-grave; nao usar manutencao' },
            { classe: 'Anti-TNF', medicamentos: ['Infliximabe', 'Adalimumabe'], posologia: 'Infliximabe 5mg/kg semanas 0,2,6 depois 8/8sem', observacoes: 'Moderada-grave ou fistulizante' }
          ],
          segundaLinha: [
            { classe: 'Imunomodulador', medicamentos: ['Azatioprina', 'Metotrexato'], posologia: 'Azatioprina 2-2,5mg/kg/dia', observacoes: 'Manutencao; inicio lento (8-12 sem)' },
            { classe: 'Anti-integrina', medicamentos: ['Vedolizumabe'], posologia: '300mg IV semanas 0,2,6, depois 8/8sem', observacoes: 'Alternativa se falha anti-TNF' },
            { classe: 'Anti-IL12/23', medicamentos: ['Ustequinumabe'], posologia: '~6mg/kg IV inducao, depois 90mg SC 8/8sem', observacoes: 'Boa opcao para doenca moderada-grave' }
          ],
          situacoesEspeciais: [
            { situacao: 'Doenca perianal', conduta: 'Anti-TNF + Ciprofloxacino 500mg 12/12h + Metronidazol 500mg 8/8h' },
            { situacao: 'Gestacao', conduta: 'Manter remissao; aminossalicilatos e tiopurinas seguros; anti-TNF ate 3o tri' }
          ],
          citations: [{ refId: 'acg-crohn-2022' }]
        },
        duracao: 'Tratamento de manutencao por tempo indeterminado'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses se estavel; mais frequente em atividade',
        examesControle: [
          'Calprotectina fecal a cada 3-6 meses',
          'Colonoscopia a cada 1-3 anos',
          'Enteroressonancia periodica',
          'Monitoramento de nivel de biologicos'
        ],
        metasTerapeuticas: [
          'CDAI <150 (remissao clinica)',
          'Calprotectina <250',
          'Cicatrizacao mucosa endoscopica'
        ],
        criteriosEncaminhamento: [
          'Gastroenterologista especializado em DII',
          'Cirurgiao colorretal se complicacoes',
          'Nutricionista',
          'Psicologia'
        ],
        citations: [{ refId: 'ecco-crohn-2023' }]
      },
      prevencao: {
        primaria: [
          'Nao ha prevencao primaria estabelecida',
          'Evitar tabagismo'
        ],
        secundaria: [
          'Manutencao da remissao reduz complicacoes',
          'Rastreamento de cancer colorretal (8-10 anos de doenca)',
          'Vacinacao (especialmente se imunossupressao)'
        ],
        citations: [{ refId: 'ecco-crohn-2023' }]
      }
    },
    protocolos: ['crohn-inducao-remissao', 'crohn-perianal'],
    medicamentos: ['infliximabe', 'adalimumabe', 'azatioprina', 'budesonida'],
    calculadoras: ['cdai', 'harvey-bradshaw'],
    rastreamentos: ['cancer-colorretal'],
    citations: [{ refId: 'ecco-crohn-2023' }, { refId: 'acg-crohn-2022' }],
    lastUpdate: '2025-01',
    tags: ['crohn', 'DII', 'doenca-inflamatoria', 'biologico', 'fistula']
  },

  {
    id: 'retocolite-ulcerativa',
    titulo: 'Retocolite Ulcerativa',
    sinonimos: ['Colite ulcerativa', 'RCU', 'Proctocolite ulcerativa'],
    doid: 'DOID:8577',
    snomedCT: '64766004',
    meshId: 'D003093',
    umlsCui: 'C0009324',
    ciap2: ['D94'],
    cid10: ['K51'],
    cid11: ['DD71'],
    categoria: 'gastrointestinal',
    subcategoria: 'doenca_inflamatoria_intestinal',
    quickView: {
      definicao: 'Doenca inflamatoria intestinal cronica limitada ao colon, com inflamacao continua da mucosa iniciando no reto e estendendo-se proximalmente. Caracterizada por diarreia sanguinolenta e urgencia fecal.',
      criteriosDiagnosticos: [
        'Diarreia sanguinolenta cronica (>4 semanas)',
        'Urgencia e tenesmo',
        'Envolvimento retal obrigatorio (95%)',
        'Inflamacao continua (sem skip lesions)',
        'Colonoscopia: eritema, friabilidade, ulceracoes, pseudopolipos',
        'Histologia: inflamacao limitada a mucosa, distorcao de criptas, abscessos de criptas'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte nutricional',
          'Evitar AINEs',
          'Cessacao tabagica (controverso - tabaco pode ser protetor)',
          'Suporte psicologico'
        ],
        farmacologico: [
          'PROCTITE: Mesalazina supositorio 1g/dia',
          'COLITE ESQUERDA: Mesalazina oral 2-4g + enema',
          'EXTENSA LEVE-MODERADA: Mesalazina oral 4g/dia',
          'MODERADA-GRAVE: Prednisona 40-60mg/dia',
          'GRAVE: Corticoide IV ou Infliximabe/Ciclosporina',
          'MANUTENCAO: Mesalazina, Azatioprina ou biologicos'
        ]
      },
      metasTerapeuticas: [
        'Remissao clinica (Mayo parcial <=1)',
        'Cicatrizacao mucosa endoscopica',
        'Remissao livre de esteroides',
        'Melhora da qualidade de vida'
      ],
      examesIniciais: [
        'Colonoscopia com biopsias seriadas',
        'Calprotectina fecal',
        'PCR e VHS',
        'Hemograma, albumina, eletrólitos',
        'Coprocultura e pesquisa de C. difficile'
      ],
      redFlags: [
        'Colite aguda grave (criterios de Truelove-Witts)',
        'Megacolon toxico',
        'Perfuracao',
        'Hemorragia macica',
        'Displasia ou cancer'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '100-500/100.000 em paises desenvolvidos',
        incidencia: '5-25/100.000/ano',
        faixaEtaria: 'Pico 20-40 anos; segundo pico 60-70 anos',
        fatoresRisco: [
          'Historia familiar (risco 10-15x)',
          'Fatores geneticos (HLA-DRB1)',
          'Nao tabagistas (tabaco e protetor)',
          'Apendicectomia previa (pode ser protetora)',
          'Dieta ocidentalizada'
        ],
        citations: [{ refId: 'ecco-rcu-2022' }]
      },
      fisiopatologia: {
        texto: 'Resposta imune desregulada contra microbiota comensal em individuos geneticamente predispostos. Predominio Th2 com producao de IL-5 e IL-13. Inflamacao limitada a mucosa com destruicao de criptas e ulceracao superficial.',
        citations: [{ refId: 'nature-ibd-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Diarreia sanguinolenta (sintoma cardinal)',
          'Urgencia fecal',
          'Tenesmo',
          'Colicas abdominais',
          'Evacuacoes frequentes de pequeno volume',
          'Muco nas fezes'
        ],
        sinaisExameFisico: [
          'Sensibilidade abdominal difusa',
          'Toque retal: sangue',
          'Sinais de desidratacao se grave',
          'Manifestacoes extraintestinais',
          'Sinais de megacolon se complicado'
        ],
        formasClinicas: [
          'Proctite (E1): ate 15cm',
          'Colite esquerda (E2): ate flexura esplenica',
          'Colite extensa/pancolite (E3): alem da flexura',
          'Gravidade: leve, moderada, grave (Truelove-Witts)'
        ],
        citations: [{ refId: 'ecco-rcu-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clinica + colonoscopia + histologia',
          'Envolvimento retal continuo obrigatorio',
          'Exclusao de causas infecciosas'
        ],
        diagnosticoDiferencial: [
          'Doenca de Crohn colonica',
          'Colite infecciosa (Shigella, Campylobacter, E. coli, C. difficile)',
          'Colite isquemica',
          'Colite por radiacao',
          'Colite microscopica'
        ],
        examesLaboratoriais: [
          'Calprotectina fecal',
          'PCR, VHS',
          'Hemograma (anemia)',
          'Albumina',
          'pANCA (60-70% positivo), ASCA (negativo)',
          'Coprocultura, pesquisa C. difficile'
        ],
        examesImagem: [
          'Colonoscopia com biopsias seriadas (padrao-ouro)',
          'Radiografia abdominal (se suspeita de megacolon)',
          'TC abdome se complicacoes'
        ],
        citations: [{ refId: 'acg-rcu-2022' }]
      },
      tratamento: {
        objetivos: [
          'Inducao da remissao',
          'Manutencao da remissao',
          'Evitar colectomia',
          'Prevenir cancer colorretal'
        ],
        naoFarmacologico: {
          medidas: [
            'Suporte nutricional',
            'Evitar AINEs',
            'Probioticos (evidencia limitada)',
            'Suporte psicologico'
          ],
          citations: [{ refId: 'ecco-rcu-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: '5-ASA topico', medicamentos: ['Mesalazina supositorio', 'Mesalazina enema'], posologia: 'Supositorio 1g/dia ou enema 1-4g/dia', observacoes: 'Proctite e colite esquerda' },
            { classe: '5-ASA oral', medicamentos: ['Mesalazina', 'Sulfassalazina'], posologia: 'Mesalazina 2-4,8g/dia', observacoes: 'Colite extensa; combinado com topico e melhor' },
            { classe: 'Corticoide', medicamentos: ['Prednisona', 'Hidrocortisona'], posologia: 'Prednisona 40-60mg/dia', observacoes: 'Moderada-grave; desmame em 8-12 semanas' }
          ],
          segundaLinha: [
            { classe: 'Anti-TNF', medicamentos: ['Infliximabe', 'Adalimumabe', 'Golimumabe'], posologia: 'Infliximabe 5mg/kg semanas 0,2,6, depois 8/8sem', observacoes: 'Corticodependente ou refratario' },
            { classe: 'Anti-integrina', medicamentos: ['Vedolizumabe'], posologia: '300mg IV semanas 0,2,6, depois 8/8sem', observacoes: 'Alternativa a anti-TNF; gut-selective' },
            { classe: 'Inibidor JAK', medicamentos: ['Tofacitinibe'], posologia: '10mg 2x/dia inducao, 5mg 2x/dia manutencao', observacoes: 'Via oral; risco tromboembolico' }
          ],
          situacoesEspeciais: [
            { situacao: 'Colite aguda grave (hospitalizacao)', conduta: 'Hidrocortisona 100mg IV 6/6h; se falha em 3-5d: Infliximabe ou Ciclosporina' },
            { situacao: 'Gestacao', conduta: '5-ASA e tiopurinas seguros; anti-TNF ate 3o trimestre' }
          ],
          citations: [{ refId: 'acg-rcu-2022' }]
        },
        duracao: 'Tratamento de manutencao continuo'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses se estavel',
        examesControle: [
          'Calprotectina fecal periodica',
          'Colonoscopia anual se extensa >8 anos',
          'Monitoramento de biologicos/imunomoduladores'
        ],
        metasTerapeuticas: [
          'Mayo parcial <=1',
          'Calprotectina <250',
          'Cicatrizacao mucosa (Mayo endoscopico 0-1)'
        ],
        criteriosEncaminhamento: [
          'Gastroenterologista especializado em DII',
          'Cirurgiao colorretal se refratario ou displasia',
          'Vigilancia oncologica'
        ],
        citations: [{ refId: 'ecco-rcu-2022' }]
      },
      prevencao: {
        primaria: [
          'Nao ha prevencao primaria estabelecida'
        ],
        secundaria: [
          'Rastreamento de cancer colorretal (apos 8 anos de doenca extensa)',
          'Manutencao da remissao reduz risco de cancer',
          'Vacinacao antes de imunossupressao'
        ],
        citations: [{ refId: 'ecco-rcu-2022' }]
      }
    },
    protocolos: ['rcu-inducao-remissao', 'rcu-colite-aguda-grave'],
    medicamentos: ['mesalazina', 'infliximabe', 'vedolizumabe', 'tofacitinibe'],
    calculadoras: ['mayo-score', 'truelove-witts'],
    rastreamentos: ['cancer-colorretal'],
    citations: [{ refId: 'ecco-rcu-2022' }, { refId: 'acg-rcu-2022' }],
    lastUpdate: '2025-01',
    tags: ['retocolite', 'colite-ulcerativa', 'DII', 'mesalazina', 'biologico']
  },

  // ============================================================================
  // DOENCAS DE MA ABSORCAO
  // ============================================================================
  {
    id: 'doenca-celiaca',
    titulo: 'Doenca Celiaca',
    sinonimos: ['Enteropatia sensivel ao gluten', 'Espru celiaco', 'Espru nao tropical'],
    doid: 'DOID:10608',
    snomedCT: '396331005',
    meshId: 'D002446',
    umlsCui: 'C0007570',
    ciap2: ['D99'],
    cid10: ['K90.0'],
    cid11: ['DA95.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'ma_absorcao',
    quickView: {
      definicao: 'Enteropatia autoimune desencadeada pela ingestao de gluten (trigo, centeio, cevada) em individuos geneticamente suscetiveis (HLA-DQ2/DQ8), causando atrofia vilositaria e ma absorcao.',
      criteriosDiagnosticos: [
        'ADULTOS: Sorologia + biopsia duodenal',
        'Anti-transglutaminase IgA elevada (>10x + anti-endomisio confirma)',
        'Biopsia duodenal: atrofia vilositaria (Marsh 3)',
        'HLA-DQ2 ou DQ8 positivo (valor preditivo negativo)',
        'Resposta clinica e sorologica a dieta sem gluten',
        'CRIANCAS: Pode dispensar biopsia se anti-tTG >10x + EMA positivo + HLA compativel'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Dieta sem gluten ESTRITA e permanente (unico tratamento)',
          'Educacao alimentar com nutricionista especializado',
          'Leitura de rotulos (contaminacao cruzada)',
          'Participacao em grupos de apoio',
          'Rastreamento familiar'
        ],
        farmacologico: [
          'Suplementacao de deficiencias: ferro, calcio, vitamina D, B12, folato',
          'Densitometria e tratamento de osteoporose se indicado',
          'Nao ha tratamento farmacologico especifico para a doenca'
        ]
      },
      metasTerapeuticas: [
        'Resolucao dos sintomas',
        'Normalizacao sorologica (anti-tTG)',
        'Recuperacao histologica',
        'Correcao de deficiencias nutricionais'
      ],
      examesIniciais: [
        'Anti-transglutaminase tecidual IgA (tTG-IgA)',
        'IgA total (excluir deficiencia)',
        'Anti-endomisio IgA (confirmatorio)',
        'EDA com biopsias duodenais (4-6 fragmentos)',
        'Hemograma, ferritina, B12, folato, calcio, vitamina D'
      ],
      redFlags: [
        'Doenca celiaca refrataria (sem resposta a dieta)',
        'Linfoma intestinal (T-cell)',
        'Adenocarcinoma de intestino delgado',
        'Jejunite ulcerativa',
        'Perda de peso persistente apesar da dieta'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1% da populacao geral; 5-10% em parentes de 1o grau',
        incidencia: 'Subdiagnosticada; razao diagnosticados:nao diagnosticados = 1:5',
        faixaEtaria: 'Qualquer idade; picos na infancia e 40-60 anos',
        fatoresRisco: [
          'HLA-DQ2 (95%) ou HLA-DQ8 (5%)',
          'Historia familiar',
          'Outras doencas autoimunes (DM1, tireoide, Sjogren)',
          'Sindrome de Down, Turner, Williams'
        ],
        citations: [{ refId: 'acg-celiac-2023' }]
      },
      fisiopatologia: {
        texto: 'Gliadina (fracao do gluten) e deaminada pela transglutaminase tecidual, formando peptideos que se ligam a HLA-DQ2/DQ8. Resposta Th1 leva a producao de IFN-gamma, ativacao de linfocitos intraepiteliais e destruicao de enterocitos com atrofia vilositaria.',
        citations: [{ refId: 'nejm-celiac-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Diarreia cronica e esteatorreia',
          'Distensao abdominal',
          'Perda de peso',
          'Fadiga',
          'Anemia ferropriva refrataria',
          'Osteoporose precoce'
        ],
        sinaisExameFisico: [
          'Palidez (anemia)',
          'Distensao abdominal',
          'Sinais de desnutricao',
          'Dermatite herpetiforme (patognomonico)',
          'Hipoplasia do esmalte dentario'
        ],
        formasClinicas: [
          'Classica: diarreia, ma absorcao',
          'Nao classica: anemia, osteoporose, infertilidade',
          'Silenciosa: assintomatica com sorologia e biopsia positivas',
          'Potencial: sorologia positiva, biopsia normal'
        ],
        citations: [{ refId: 'acg-celiac-2023' }]
      },
      diagnostico: {
        criterios: [
          'Anti-tTG IgA >10x LSN + anti-endomisio positivo (pode dispensar biopsia em criancas)',
          'Biopsia duodenal: Marsh 3 (atrofia vilositaria)',
          'Melhora clinica com dieta sem gluten',
          'IMPORTANTE: fazer diagnostico ANTES de retirar gluten'
        ],
        diagnosticoDiferencial: [
          'Sensibilidade ao gluten nao celiaca',
          'Alergia ao trigo',
          'Sindrome do intestino irritavel',
          'Supercrescimento bacteriano',
          'Giardíase',
          'Doenca de Crohn'
        ],
        examesLaboratoriais: [
          'Anti-tTG IgA (sensibilidade 95%)',
          'IgA total',
          'Anti-endomisio IgA',
          'Anti-gliadina deaminada IgG (se deficiencia de IgA)',
          'HLA-DQ2/DQ8 (alto VPN)'
        ],
        outrosExames: [
          'EDA com 4-6 biopsias de duodeno (incluindo bulbo)',
          'Densitometria ossea'
        ],
        citations: [{ refId: 'espghan-celiac-2022' }]
      },
      tratamento: {
        objetivos: [
          'Remissao clinica e histologica',
          'Correcao de deficiencias',
          'Prevencao de complicacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Dieta sem gluten ESTRITA e permanente',
            'Exclusao: trigo, centeio, cevada, (aveia controversa)',
            'Atencao a contaminacao cruzada',
            'Nutricionista especializado',
            'Rastreamento de familiares de 1o grau'
          ],
          citations: [{ refId: 'acg-celiac-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Suplementacao', medicamentos: ['Sulfato ferroso', 'Calcio', 'Vitamina D', 'B12'], posologia: 'Conforme deficiencias identificadas', observacoes: 'Comum deficiencia de ferro, calcio, D, B12, folato' }
          ],
          situacoesEspeciais: [
            { situacao: 'Doenca celiaca refrataria tipo I', conduta: 'Budesonida, azatioprina; excluir linfoma' },
            { situacao: 'Doenca celiaca refrataria tipo II', conduta: 'Quimioterapia; alto risco de linfoma T' }
          ],
          citations: [{ refId: 'acg-celiac-2023' }]
        },
        duracao: 'Dieta sem gluten por toda a vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses no primeiro ano, depois anual',
        examesControle: [
          'Anti-tTG IgA a cada 6-12 meses',
          'Hemograma, ferritina, B12, folato anual',
          'Densitometria ossea',
          'Considerar biopsia de controle em 1-2 anos'
        ],
        metasTerapeuticas: [
          'Normalizacao de anti-tTG',
          'Resolucao de sintomas',
          'Recuperacao histologica'
        ],
        criteriosEncaminhamento: [
          'Gastroenterologista para diagnostico',
          'Nutricionista especializado',
          'Hematologista se complicacoes refratarias'
        ],
        citations: [{ refId: 'acg-celiac-2023' }]
      },
      prevencao: {
        primaria: [
          'Nao ha prevencao primaria comprovada',
          'Introducao de gluten entre 4-12 meses nao previne'
        ],
        secundaria: [
          'Rastreamento de familiares de 1o grau',
          'Rastreamento em grupos de risco (DM1, tireoide autoimune)',
          'Dieta sem gluten previne complicacoes'
        ],
        citations: [{ refId: 'espghan-celiac-2022' }]
      }
    },
    protocolos: ['doenca-celiaca-diagnostico', 'dieta-sem-gluten'],
    medicamentos: ['sulfato-ferroso', 'carbonato-calcio', 'colecalciferol'],
    calculadoras: ['marsh-oberhuber'],
    rastreamentos: ['osteoporose'],
    citations: [{ refId: 'acg-celiac-2023' }, { refId: 'espghan-celiac-2022' }],
    lastUpdate: '2025-01',
    tags: ['celiaca', 'gluten', 'enteropatia', 'autoimune', 'ma-absorcao']
  },

  // ============================================================================
  // DISTURBIOS FUNCIONAIS
  // ============================================================================
  {
    id: 'sindrome-intestino-irritavel',
    titulo: 'Sindrome do Intestino Irritavel',
    sinonimos: ['SII', 'IBS', 'Colite nervosa', 'Colon irritavel'],
    doid: 'DOID:9778',
    snomedCT: '10743008',
    meshId: 'D043183',
    umlsCui: 'C0022104',
    ciap2: ['D93'],
    cid10: ['K58'],
    cid11: ['DD91.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'disturbio_funcional',
    quickView: {
      definicao: 'Disturbio funcional gastrointestinal caracterizado por dor abdominal recorrente associada a alteracao do habito intestinal, sem causa organica identificavel. Criterios de Roma IV.',
      criteriosDiagnosticos: [
        'CRITERIOS ROMA IV:',
        'Dor abdominal recorrente >=1 dia/semana nos ultimos 3 meses',
        'Associada a >=2 dos seguintes:',
        '  - Relacionada a defecacao',
        '  - Mudanca na frequencia das evacuacoes',
        '  - Mudanca na forma (aparencia) das fezes',
        'Inicio dos sintomas >=6 meses antes do diagnostico',
        'Subtipos: SII-D (diarreia), SII-C (constipacao), SII-M (misto), SII-U (indefinido)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Educacao e reasseguracao (nao e doenca grave)',
          'Dieta low-FODMAP (2-6 semanas de restricao, depois reintroducao)',
          'Fibras soluveis (psyllium) - especialmente SII-C',
          'Atividade fisica regular',
          'Manejo do estresse',
          'Terapia cognitivo-comportamental'
        ],
        farmacologico: [
          'DOR: Antiespasmódicos (Hioscina, Diciclomina, Oleo de hortela)',
          'SII-D: Loperamida, Eluxadolina, Rifaximina',
          'SII-C: Laxativos osmoticos, Linaclotida, Lubiprostona',
          'GLOBAL: Antidepressivos triciclicos (Amitriptilina 10-25mg) ou ISRS'
        ]
      },
      metasTerapeuticas: [
        'Controle adequado dos sintomas',
        'Melhora da qualidade de vida',
        'Reducao do impacto funcional'
      ],
      examesIniciais: [
        'Hemograma',
        'PCR ou VHS',
        'Anti-tTG IgA (excluir doenca celiaca)',
        'Calprotectina fecal (excluir DII)',
        'TSH',
        'Colonoscopia se >45 anos ou red flags'
      ],
      redFlags: [
        'Inicio apos 50 anos',
        'Perda de peso involuntaria',
        'Sangramento retal',
        'Anemia',
        'Historia familiar de cancer colorretal ou DII',
        'Sintomas noturnos que acordam o paciente'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-15% da populacao global',
        incidencia: 'Mulheres 1,5-2x mais afetadas',
        faixaEtaria: 'Pico 20-40 anos; raro inicio >50 anos',
        fatoresRisco: [
          'Sexo feminino',
          'Estresse psicologico',
          'Gastroenterite previa (SII pos-infecciosa)',
          'Abuso na infancia',
          'Ansiedade e depressao',
          'Uso de antibioticos'
        ],
        citations: [{ refId: 'rome-foundation-2022' }]
      },
      fisiopatologia: {
        texto: 'Disturbio da interacao cerebro-intestino (brain-gut axis). Hipersensibilidade visceral, dismotilidade intestinal, alteracao da microbiota, aumento da permeabilidade intestinal, ativacao imune de baixo grau, e fatores psicossociais.',
        citations: [{ refId: 'lancet-ibs-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor abdominal (melhora ou piora com evacuacao)',
          'Alteracao do habito intestinal',
          'Distensao abdominal',
          'Sensacao de evacuacao incompleta',
          'Muco nas fezes',
          'Urgencia fecal'
        ],
        sinaisExameFisico: [
          'Exame fisico tipicamente normal',
          'Pode haver sensibilidade abdominal difusa',
          'Distensao abdominal',
          'Ausencia de sinais de alarme'
        ],
        formasClinicas: [
          'SII-D: diarreia predominante (>25% fezes tipo 6-7)',
          'SII-C: constipacao predominante (>25% fezes tipo 1-2)',
          'SII-M: misto',
          'SII-U: indefinido'
        ],
        citations: [{ refId: 'rome-foundation-2022' }]
      },
      diagnostico: {
        criterios: [
          'Criterios de Roma IV (diagnostico clinico)',
          'Ausencia de red flags',
          'Exames basicos normais',
          'Diagnostico de exclusao NAO e mais necessario'
        ],
        diagnosticoDiferencial: [
          'Doenca celiaca',
          'Doenca inflamatoria intestinal',
          'Intolerancia a lactose',
          'Supercrescimento bacteriano (SIBO)',
          'Colite microscopica',
          'Cancer colorretal'
        ],
        examesLaboratoriais: [
          'Hemograma',
          'PCR',
          'Anti-tTG IgA',
          'Calprotectina fecal (<50 praticamente exclui DII)',
          'TSH'
        ],
        outrosExames: [
          'Colonoscopia se >45 anos ou red flags',
          'Teste respiratorio (SIBO, intolerancia a lactose)'
        ],
        citations: [{ refId: 'acg-ibs-2021' }]
      },
      tratamento: {
        objetivos: [
          'Controle dos sintomas',
          'Melhora da qualidade de vida',
          'Empoderamento do paciente'
        ],
        naoFarmacologico: {
          medidas: [
            'Educacao e relacao medico-paciente',
            'Dieta low-FODMAP (monitorada por nutricionista)',
            'Fibras soluveis (psyllium)',
            'Exercicio fisico',
            'Terapia cognitivo-comportamental',
            'Hipnoterapia dirigida ao intestino'
          ],
          citations: [{ refId: 'acg-ibs-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiespasmódico', medicamentos: ['Hioscina', 'Diciclomina', 'Oleo de hortela'], posologia: 'Hioscina 10-20mg 3-4x/dia; Oleo de hortela 200mg 3x/dia', observacoes: 'Para dor abdominal' },
            { classe: 'Antidiarreico', medicamentos: ['Loperamida'], posologia: '2-4mg apos evacuacao liquida (max 16mg/dia)', observacoes: 'SII-D; nao melhora dor' },
            { classe: 'Laxativo', medicamentos: ['PEG', 'Lactulose'], posologia: 'PEG 17g/dia', observacoes: 'SII-C; nao melhora dor' }
          ],
          segundaLinha: [
            { classe: 'Antidepressivo triciclico', medicamentos: ['Amitriptilina', 'Nortriptilina'], posologia: 'Amitriptilina 10-25mg a noite', observacoes: 'Dor refrataria e SII-D (efeito anticolinergico)' },
            { classe: 'Secretagogo', medicamentos: ['Linaclotida', 'Lubiprostona'], posologia: 'Linaclotida 290mcg/dia', observacoes: 'SII-C com dor' },
            { classe: 'Antibiotico', medicamentos: ['Rifaximina'], posologia: '550mg 3x/dia por 14 dias', observacoes: 'SII-D sem constipacao; pode repetir' }
          ],
          citations: [{ refId: 'acg-ibs-2021' }]
        },
        duracao: 'Cronico; tratamento conforme sintomas'
      },
      acompanhamento: {
        frequenciaConsultas: 'Conforme necessidade; relacao medico-paciente e fundamental',
        metasTerapeuticas: [
          'Controle adequado dos sintomas (nao e cura)',
          'Melhora funcional',
          'Reducao de consultas e exames desnecessarios'
        ],
        criteriosEncaminhamento: [
          'Red flags presentes',
          'Refratario a tratamento',
          'Suspeita de outra condicao'
        ],
        citations: [{ refId: 'rome-foundation-2022' }]
      }
    },
    protocolos: ['sii-diagnostico-roma-iv', 'dieta-low-fodmap'],
    medicamentos: ['hioscina', 'loperamida', 'amitriptilina', 'linaclotida'],
    calculadoras: ['roma-iv-ibs', 'bristol-stool-scale'],
    rastreamentos: [],
    citations: [{ refId: 'acg-ibs-2021' }, { refId: 'rome-foundation-2022' }],
    lastUpdate: '2025-01',
    tags: ['SII', 'intestino-irritavel', 'funcional', 'FODMAP', 'Roma-IV']
  },

  // ============================================================================
  // DOENCAS ESOFAGICAS
  // ============================================================================
  {
    id: 'esofago-barrett',
    titulo: 'Esofago de Barrett',
    sinonimos: ['Metaplasia de Barrett', 'Esofago colunar', 'Barrett esophagus'],
    doid: 'DOID:9206',
    snomedCT: '302914006',
    meshId: 'D001471',
    umlsCui: 'C0004763',
    ciap2: ['D84'],
    cid10: ['K22.7'],
    cid11: ['DA22.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'esofagico',
    quickView: {
      definicao: 'Condicao pre-maligna onde o epitélio escamoso estratificado normal do esofago distal e substituido por epitélio colunar com metaplasia intestinal (celulas caliciformes), como complicacao da DRGE cronica.',
      criteriosDiagnosticos: [
        'Endoscopia: mucosa cor salmao no esofago distal (extensao >=1cm acima da JEG)',
        'Confirmacao histologica OBRIGATORIA: metaplasia intestinal (celulas caliciformes)',
        'Classificacao de Praga: C (circunferencial) e M (maxima extensao)',
        'Curto (<3cm) vs Longo (>=3cm)',
        'Avaliar presenca de displasia (baixo grau, alto grau)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Modificacoes de estilo de vida para DRGE',
          'Perda de peso se obeso',
          'Elevacao da cabeceira',
          'Evitar refeicoes tardias',
          'Cessacao do tabagismo'
        ],
        farmacologico: [
          'IBP em dose padrao 1x/dia (todos os pacientes)',
          'Objetivo: controle de sintomas e prevencao de progressao',
          'Nao ha evidencia de que IBP causa regressao',
          'Sem displasia: vigilancia endoscopica',
          'Com displasia: ablacao endoscopica (radiofrequencia)'
        ]
      },
      metasTerapeuticas: [
        'Controle dos sintomas de DRGE',
        'Deteccao precoce de displasia/neoplasia',
        'Erradicacao de displasia quando presente'
      ],
      examesIniciais: [
        'EDA com biopsias sistematicas (protocolo de Seattle)',
        'Cromoscopia ou NBI para melhor visualizacao',
        'Biopsias de 4 quadrantes a cada 2cm',
        'Biopsias adicionais de qualquer irregularidade'
      ],
      redFlags: [
        'Displasia de alto grau',
        'Adenocarcinoma',
        'Estenose',
        'Ulceracao',
        'Nodularidade',
        'Disfagia progressiva'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-2% da populacao geral; 5-15% dos pacientes com DRGE',
        incidencia: 'Progressao para adenocarcinoma: 0,5%/ano sem displasia',
        faixaEtaria: 'Mais comum em homens >50 anos',
        fatoresRisco: [
          'DRGE cronica (>5 anos)',
          'Sexo masculino',
          'Idade >50 anos',
          'Obesidade (especialmente abdominal)',
          'Tabagismo',
          'Hernia hiatal',
          'Etnia caucasiana'
        ],
        citations: [{ refId: 'acg-barrett-2022' }]
      },
      fisiopatologia: {
        texto: 'Exposicao cronica ao refluxo acido e biliar causa lesao do epitélio escamoso. Reparo com metaplasia colunar intestinal (celulas caliciformes) e adaptacao, mas carrega risco de progressao: metaplasia -> displasia baixo grau -> displasia alto grau -> adenocarcinoma.',
        citations: [{ refId: 'nejm-barrett-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sintomas de DRGE (pirose, regurgitacao)',
          'Barrett em si e assintomatico',
          'Pode haver "melhora" da pirose (epitélio menos sensivel)',
          'Disfagia se complicacoes'
        ],
        sinaisExameFisico: [
          'Exame fisico geralmente normal',
          'Obesidade frequente',
          'Sinais de DRGE complicada (raro)'
        ],
        formasClinicas: [
          'Barrett curto (<3cm)',
          'Barrett longo (>=3cm)',
          'Sem displasia',
          'Displasia de baixo grau (DBG)',
          'Displasia de alto grau (DAG)'
        ],
        citations: [{ refId: 'acg-barrett-2022' }]
      },
      diagnostico: {
        criterios: [
          'Endoscopia: mucosa colunar >=1cm acima da JEG',
          'Classificacao de Praga (CxMy)',
          'Histologia: metaplasia intestinal (celulas caliciformes)',
          'Avaliar displasia (revisao por 2 patologistas se presente)'
        ],
        diagnosticoDiferencial: [
          'Metaplasia cardica sem Barrett',
          'Heterotopia gastrica',
          'Esofagite erosiva',
          'Adenocarcinoma'
        ],
        examesLaboratoriais: [
          'Nao ha exames laboratoriais especificos',
          'H. pylori (controverso - pode ser protetor)'
        ],
        outrosExames: [
          'EDA com cromoscopia virtual (NBI) ou quimica (acido acetico)',
          'Biopsias de 4 quadrantes a cada 1-2cm (Seattle)',
          'Ecoendoscopia se nodulo'
        ],
        citations: [{ refId: 'bsg-barrett-2021' }]
      },
      tratamento: {
        objetivos: [
          'Controlar DRGE',
          'Vigilancia para deteccao precoce',
          'Erradicar displasia'
        ],
        naoFarmacologico: {
          medidas: [
            'Perda de peso',
            'Elevacao da cabeceira',
            'Evitar refeicoes noturnas',
            'Cessacao do tabagismo'
          ],
          citations: [{ refId: 'acg-barrett-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'IBP', medicamentos: ['Omeprazol', 'Esomeprazol', 'Pantoprazol'], posologia: 'Dose padrao 1x/dia', observacoes: 'Todos os pacientes; melhora sintomas e pode reduzir progressao' }
          ],
          situacoesEspeciais: [
            { situacao: 'Displasia de baixo grau confirmada', conduta: 'Ablacao por radiofrequencia (RFA) ou vigilancia intensificada' },
            { situacao: 'Displasia de alto grau', conduta: 'Ablacao por radiofrequencia ou resseccao endoscopica mucosa (EMR)' },
            { situacao: 'Adenocarcinoma intramucoso', conduta: 'Resseccao endoscopica + ablacao do Barrett residual' }
          ],
          citations: [{ refId: 'acg-barrett-2022' }]
        },
        duracao: 'IBP continuo; vigilancia por tempo indeterminado'
      },
      acompanhamento: {
        frequenciaConsultas: 'Conforme protocolo de vigilancia',
        examesControle: [
          'SEM displasia: EDA a cada 3-5 anos',
          'DBG confirmada: EDA a cada 6-12 meses ou ablacao',
          'DAG tratada: EDA a cada 3 meses no 1o ano',
          'Pos-ablacao completa: EDA anual'
        ],
        metasTerapeuticas: [
          'Erradicacao completa da metaplasia intestinal (se ablacao)',
          'Deteccao precoce de neoplasia',
          'Controle de DRGE'
        ],
        criteriosEncaminhamento: [
          'Gastroenterologista para vigilancia',
          'Centro especializado se displasia (ablacao)',
          'Oncologia se adenocarcinoma invasivo'
        ],
        citations: [{ refId: 'bsg-barrett-2021' }]
      },
      prevencao: {
        primaria: [
          'Controle de DRGE',
          'Perda de peso',
          'Cessacao do tabagismo'
        ],
        secundaria: [
          'Vigilancia endoscopica conforme protocolo',
          'Ablacao de displasia previne adenocarcinoma'
        ],
        citations: [{ refId: 'acg-barrett-2022' }]
      }
    },
    protocolos: ['barrett-vigilancia', 'barrett-ablacao'],
    medicamentos: ['omeprazol', 'esomeprazol', 'pantoprazol'],
    calculadoras: ['praga-classification'],
    rastreamentos: ['adenocarcinoma-esofago'],
    citations: [{ refId: 'acg-barrett-2022' }, { refId: 'bsg-barrett-2021' }],
    lastUpdate: '2025-01',
    tags: ['barrett', 'esofago', 'pre-maligno', 'DRGE', 'metaplasia']
  },

  {
    id: 'acalasia',
    titulo: 'Acalasia',
    sinonimos: ['Acalasia esofagica', 'Cardiospasmo', 'Megaesofago'],
    doid: 'DOID:9164',
    snomedCT: '45564002',
    meshId: 'D004931',
    umlsCui: 'C0014848',
    ciap2: ['D84'],
    cid10: ['K22.0'],
    cid11: ['DA21.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'esofagico',
    quickView: {
      definicao: 'Disturbio motor primario do esofago caracterizado por aperistalse do corpo esofagico e falha de relaxamento do esfíncter esofagico inferior (EEI), levando a disfagia progressiva e regurgitacao.',
      criteriosDiagnosticos: [
        'MANOMETRIA DE ALTA RESOLUCAO (padrao-ouro):',
        'IRP (integral relaxation pressure) >15mmHg',
        'Aperistalse ou contracao prematura de 100%',
        'Classificacao de Chicago v4.0:',
        '  Tipo I: aperistalse sem pressurizacao',
        '  Tipo II: aperistalse com panpressurizacao (melhor prognostico)',
        '  Tipo III: contracao espastica prematura',
        'EDA para excluir pseudoacalasia (cancer de JEG)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Orientacao dietetica (mastigar bem, beber liquido)',
          'Elevacao da cabeceira',
          'Refeicoes menores e mais frequentes'
        ],
        farmacologico: [
          'CURATIVO: Miotomia de Heller laparoscopica + fundoplicatura parcial',
          'ALTERNATIVA: Miotomia endoscopica peroral (POEM)',
          'PALIATIVO: Dilatacao pneumatica endoscopica',
          'TEMPORARIO: Toxina botulinica intra-EEI (idosos ou alto risco cirurgico)',
          'Medicamentos (nitratos, BCC) sao pouco eficazes'
        ]
      },
      metasTerapeuticas: [
        'Alivio da disfagia',
        'Prevencao de aspiracao',
        'Melhora do estado nutricional',
        'Prevencao de megaesofago avancado'
      ],
      examesIniciais: [
        'EDA (excluir obstrucao mecanica e pseudoacalasia)',
        'Manometria de alta resolucao (diagnostico)',
        'Esofagograma baritado (coluna de bario, bird-beak)',
        'TC de torax se suspeita de pseudoacalasia'
      ],
      redFlags: [
        'Idade >60 anos com sintomas curtos (<6 meses) - pseudoacalasia',
        'Perda de peso acentuada',
        'Disfagia rapidamente progressiva',
        'Megaesofago avancado (grau IV)',
        'Aspiracao recorrente'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10/100.000',
        incidencia: '1-1,6/100.000/ano',
        faixaEtaria: 'Qualquer idade; pico 30-60 anos',
        fatoresRisco: [
          'Nao ha fatores de risco claros para acalasia primaria',
          'Doenca de Chagas (America Latina) - acalasia secundaria',
          'Associacao com HLA-DQw1'
        ],
        citations: [{ refId: 'acg-achalasia-2020' }]
      },
      fisiopatologia: {
        texto: 'Degeneracao dos neuronios inibitórios do plexo mioenterico (que liberam NO e VIP), preservando os excitatorios (acetilcolina). Resulta em falha de relaxamento do EEI e aperistalse. Etiologia desconhecida na forma primaria; na secundaria (Chagas), destruicao pelo T. cruzi.',
        citations: [{ refId: 'nejm-achalasia-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Disfagia para solidos E liquidos (95%) - caracteristico',
          'Regurgitacao de alimentos nao digeridos',
          'Perda de peso',
          'Dor toracica (especialmente tipo III)',
          'Pirose paradoxal (fermentacao)',
          'Tosse noturna, pneumonia aspirativa'
        ],
        sinaisExameFisico: [
          'Pode ser normal',
          'Sinais de desnutricao em casos avancados',
          'Halitose',
          'Sinais de Chagas se secundaria'
        ],
        formasClinicas: [
          'Tipo I (classico): aperistalse sem pressurizacao',
          'Tipo II: aperistalse com panpressurizacao panesofagica',
          'Tipo III (espastico): contracao prematura espastica',
          'Classificacao de Rezende (megaesofago chagasico): I a IV'
        ],
        citations: [{ refId: 'acg-achalasia-2020' }]
      },
      diagnostico: {
        criterios: [
          'Manometria de alta resolucao: IRP >15mmHg + aperistalse',
          'Classificacao de Chicago v4.0',
          'EDA normal (excluir pseudoacalasia)'
        ],
        diagnosticoDiferencial: [
          'Pseudoacalasia (cancer de JEG) - SEMPRE excluir',
          'Espasmo esofagico difuso',
          'Esofago em quebra-nozes',
          'Estenose peptica',
          'Doenca de Chagas'
        ],
        examesLaboratoriais: [
          'Sorologia para Chagas (em areas endemicas)',
          'Marcadores tumorais se suspeita de neoplasia'
        ],
        examesImagem: [
          'Esofagograma baritado: dilatacao, estase, bird-beak',
          'TC torax/abdome se suspeita de pseudoacalasia'
        ],
        outrosExames: [
          'EDA com biopsias da JEG',
          'Manometria de alta resolucao (padrao-ouro)',
          'Ecoendoscopia se suspeita de tumor'
        ],
        citations: [{ refId: 'chicago-classification-2021' }]
      },
      tratamento: {
        objetivos: [
          'Aliviar obstrucao do EEI',
          'Melhorar esvaziamento esofagico',
          'Prevenir complicacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Orientacao dietetica',
            'Mastigar bem, comer devagar',
            'Evitar comer antes de deitar'
          ],
          citations: [{ refId: 'acg-achalasia-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Miotomia cirurgica', medicamentos: ['Miotomia de Heller laparoscopica'], posologia: 'Procedimento unico', observacoes: 'Padrao-ouro; associar fundoplicatura parcial (Dor ou Toupet)' },
            { classe: 'Miotomia endoscopica', medicamentos: ['POEM'], posologia: 'Procedimento unico', observacoes: 'Alternativa; maior taxa de refluxo pos' }
          ],
          segundaLinha: [
            { classe: 'Dilatacao pneumatica', medicamentos: ['Dilatacao com balao 30-40mm'], posologia: 'Pode necessitar repeticoes', observacoes: 'Alternativa se recusa ou contraindicacao a cirurgia' },
            { classe: 'Toxina botulinica', medicamentos: ['Botox intra-EEI'], posologia: '100U; duracao 6-12 meses', observacoes: 'Paliativo; idosos ou alto risco' }
          ],
          situacoesEspeciais: [
            { situacao: 'Megaesofago grau IV (sigmoidizacao)', conduta: 'Esofagectomia pode ser necessaria' },
            { situacao: 'Acalasia tipo III', conduta: 'POEM pode ter melhores resultados que Heller' }
          ],
          citations: [{ refId: 'acg-achalasia-2020' }]
        },
        duracao: 'Tratamento definitivo (cirurgia/POEM); dilatacao pode necessitar repeticao'
      },
      acompanhamento: {
        frequenciaConsultas: 'Pos-tratamento: 1, 6, 12 meses; depois anual',
        examesControle: [
          'Esofagograma pos-tratamento',
          'Manometria se sintomas recorrentes',
          'EDA periodica (risco aumentado de cancer esofagico)'
        ],
        metasTerapeuticas: [
          'Eckardt score <=3',
          'Ausencia de disfagia significativa',
          'Peso estavel'
        ],
        criteriosEncaminhamento: [
          'Gastroenterologista/centro de motilidade',
          'Cirurgia especializada em esofago',
          'Oncologia se pseudoacalasia'
        ],
        citations: [{ refId: 'acg-achalasia-2020' }]
      }
    },
    protocolos: ['acalasia-tratamento', 'megaesofago-chagas'],
    medicamentos: ['toxina-botulinica'],
    calculadoras: ['eckardt-score', 'chicago-classification'],
    rastreamentos: [],
    citations: [{ refId: 'acg-achalasia-2020' }, { refId: 'chicago-classification-2021' }],
    lastUpdate: '2025-01',
    tags: ['acalasia', 'disfagia', 'EEI', 'POEM', 'Heller']
  },

  // ============================================================================
  // DOENCAS HEPATICAS
  // ============================================================================
  {
    id: 'cirrose-hepatica',
    titulo: 'Cirrose Hepatica',
    sinonimos: ['Cirrose', 'Doenca hepatica cronica avancada', 'Hepatopatia cronica'],
    doid: 'DOID:5082',
    snomedCT: '19943007',
    meshId: 'D008103',
    umlsCui: 'C0023890',
    ciap2: ['D97'],
    cid10: ['K74'],
    cid11: ['DB93'],
    categoria: 'gastrointestinal',
    subcategoria: 'hepatico',
    quickView: {
      definicao: 'Estagio final de doenca hepatica cronica caracterizado por fibrose difusa, nodulos de regeneracao e distorcao da arquitetura hepatica, levando a hipertensao portal e insuficiencia hepatica.',
      criteriosDiagnosticos: [
        'CLINICO: Estigmas de hepatopatia cronica + sinais de hipertensao portal',
        'LABORATORIAL: alteracao de funcao hepatica, plaquetopenia',
        'IMAGEM: figado nodular, esplenomegalia, ascite',
        'ELASTOGRAFIA: rigidez hepatica >12-15 kPa (FibroScan)',
        'HISTOLOGIA: fibrose F4 (padrao-ouro, nem sempre necessaria)',
        'CLASSIFICACAO: Child-Pugh (A, B, C) e MELD'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Abstinencia alcoolica TOTAL',
          'Nutricao adequada (proteina 1,2-1,5g/kg)',
          'Evitar desnutricao e sarcopenia',
          'Vacinacao (hepatite A, B, pneumococo, influenza)',
          'Rastreamento de CHC e varizes'
        ],
        farmacologico: [
          'TRATAR CAUSA BASE: antiviral (HCV, HBV), abster alcool, tratar NASH',
          'VARIZES: Betabloqueador nao seletivo (Propranolol, Carvedilol)',
          'ASCITE: Restricao de sodio + Espironolactona +/- Furosemida',
          'EH: Lactulose + Rifaximina',
          'PBE: Norfloxacino profilaxia',
          'AVALIAR TRANSPLANTE se Child B/C ou MELD >=15'
        ]
      },
      metasTerapeuticas: [
        'Prevenir descompensacao',
        'Tratar complicacoes',
        'Rastreamento de CHC',
        'Avaliacao para transplante'
      ],
      examesIniciais: [
        'Hepatograma, bilirrubinas, albumina, INR',
        'Hemograma (plaquetopenia)',
        'Creatinina, eletrólitos',
        'Etiologia: sorologias virais, autoanticorpos, ferro, ceruloplasmina',
        'USG abdome com Doppler portal',
        'Elastografia hepatica (FibroScan)',
        'EDA (varizes esofagogastricas)'
      ],
      redFlags: [
        'Sangramento varicoso',
        'Ascite refrataria ou PBE',
        'Encefalopatia hepatica',
        'Sindrome hepatorrenal',
        'CHC (carcinoma hepatocelular)',
        'ACLF (acute-on-chronic liver failure)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,1-0,3% da populacao; maior em areas endemicas para hepatites',
        mortalidade: '1 milhao de mortes/ano globalmente',
        faixaEtaria: 'Aumenta com idade; pico 50-60 anos',
        fatoresRisco: [
          'Alcoolismo cronico',
          'Hepatite C e B cronicas',
          'NASH/MASLD (esteatohepatite metabolica)',
          'Hepatite autoimune',
          'Colestase cronica (CBP, CEP)',
          'Doencas metabolicas (Wilson, hemocromatose)'
        ],
        citations: [{ refId: 'aasld-cirrhosis-2023' }]
      },
      fisiopatologia: {
        texto: 'Lesao hepatica cronica ativa celulas estreladas que depositam colageno. Fibrose progressiva distorce arquitetura, forma nodulos de regeneracao. Hipertensao portal por aumento de resistencia intra-hepatica e vasodilatacao esplancnica. Insuficiencia hepatica por perda de massa funcional.',
        citations: [{ refId: 'nejm-cirrhosis-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fadiga',
          'Anorexia, nauseas',
          'Ascite (aumento do volume abdominal)',
          'Edema de membros inferiores',
          'Ictericia',
          'Confusao mental (encefalopatia)'
        ],
        sinaisExameFisico: [
          'Estigmas: aranhas vasculares, eritema palmar, ginecomastia',
          'Ictericia, ascite',
          'Esplenomegalia',
          'Circulacao colateral abdominal (caput medusae)',
          'Flapping (asterixis) se encefalopatia',
          'Atrofia muscular'
        ],
        formasClinicas: [
          'Compensada (sem complicacoes)',
          'Descompensada (ascite, EH, HDA, ictericia)',
          'Classificacao Child-Pugh: A (5-6), B (7-9), C (10-15)',
          'MELD: preditor de mortalidade e alocacao para Tx'
        ],
        citations: [{ refId: 'aasld-cirrhosis-2023' }]
      },
      diagnostico: {
        criterios: [
          'Clinica + imagem + laboratorio',
          'Elastografia: LSM >12-15 kPa',
          'Histologia: F4 (padrao-ouro, nao obrigatorio)',
          'Investigar etiologia'
        ],
        diagnosticoDiferencial: [
          'Insuficiencia cardiaca direita',
          'Sindrome de Budd-Chiari',
          'Hipertensao portal nao cirrotica',
          'Carcinomatose peritoneal'
        ],
        examesLaboratoriais: [
          'AST, ALT, GGT, FA',
          'Bilirrubinas, albumina, INR',
          'Hemograma (plaquetopenia)',
          'Sorologias: HBsAg, anti-HCV',
          'Autoanticorpos: FAN, AML, AMA',
          'Ferro, ferritina, saturacao',
          'Ceruloplasmina, cobre urinario'
        ],
        examesImagem: [
          'USG com Doppler portal',
          'Elastografia transitoria (FibroScan)',
          'TC ou RM se suspeita de CHC'
        ],
        outrosExames: [
          'EDA para varizes',
          'Biopsia hepatica se duvida diagnostica'
        ],
        citations: [{ refId: 'easl-cirrhosis-2022' }]
      },
      tratamento: {
        objetivos: [
          'Tratar etiologia',
          'Prevenir descompensacao',
          'Manejar complicacoes',
          'Avaliar para transplante'
        ],
        naoFarmacologico: {
          medidas: [
            'Abstinencia alcoolica TOTAL',
            'Nutricao adequada (proteina 1,2-1,5g/kg/dia)',
            'Evitar medicamentos hepatotoxicos e nefrotoxicos',
            'Vacinacao completa',
            'Rastreamento de CHC (USG +/- AFP 6/6 meses)'
          ],
          citations: [{ refId: 'aasld-cirrhosis-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Profilaxia primaria de HDA', medicamentos: ['Propranolol', 'Carvedilol'], posologia: 'Propranolol 20-40mg 2x/dia titulado; Carvedilol 6,25-12,5mg/dia', observacoes: 'Se varizes medio/grosso calibre' },
            { classe: 'Ascite', medicamentos: ['Espironolactona', 'Furosemida'], posologia: 'Espironolactona 100mg + Furosemida 40mg; aumentar 100:40', observacoes: 'Restricao de sodio 2g/dia' },
            { classe: 'Encefalopatia', medicamentos: ['Lactulose', 'Rifaximina'], posologia: 'Lactulose 30-45ml 2-3x/dia (2-3 evacuacoes); Rifaximina 550mg 2x/dia', observacoes: 'Rifaximina adicionar se recorrencia' }
          ],
          segundaLinha: [
            { classe: 'PBE profilaxia', medicamentos: ['Norfloxacino'], posologia: '400mg/dia', observacoes: 'Se albumina <1,5 ou historia de PBE' },
            { classe: 'SHR', medicamentos: ['Terlipressina', 'Albumina'], posologia: 'Terlipressina 1mg 4-6h + Albumina 1g/kg D1, depois 20-40g/dia', observacoes: 'Sindrome hepatorrenal tipo 1' }
          ],
          situacoesEspeciais: [
            { situacao: 'HDA varicosa aguda', conduta: 'Terlipressina/Octreotide + EDA com ligadura em 12h + ATB' },
            { situacao: 'CHC', conduta: 'Estadiamento Barcelona; transplante, ablacao, ou sistemico' }
          ],
          citations: [{ refId: 'aasld-cirrhosis-2023' }]
        },
        duracao: 'Continuo; transplante e o unico tratamento curativo'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; mais frequente se descompensada',
        examesControle: [
          'Hepatograma, albumina, INR, creatinina periodicos',
          'USG + AFP 6/6 meses (rastreamento CHC)',
          'EDA a cada 1-3 anos conforme varizes',
          'Elastografia periodica'
        ],
        metasTerapeuticas: [
          'Manter compensacao',
          'Child-Pugh estavel',
          'MELD estavel ou em melhora'
        ],
        criteriosEncaminhamento: [
          'Hepatologista para todos',
          'Centro de transplante se MELD >=15 ou Child B/C',
          'Oncologia se CHC'
        ],
        citations: [{ refId: 'easl-cirrhosis-2022' }]
      },
      prevencao: {
        primaria: [
          'Vacinacao hepatite B universal',
          'Rastreamento e tratamento de hepatite C',
          'Moderacao no consumo de alcool',
          'Controle metabolico (NASH)'
        ],
        secundaria: [
          'Tratamento da causa previne progressao',
          'Rastreamento de CHC permite deteccao precoce'
        ],
        citations: [{ refId: 'aasld-cirrhosis-2023' }]
      }
    },
    protocolos: ['cirrose-manejo', 'ascite-tratamento', 'hda-varicosa'],
    medicamentos: ['propranolol', 'espironolactona', 'lactulose', 'rifaximina'],
    calculadoras: ['child-pugh', 'meld', 'meld-na'],
    rastreamentos: ['carcinoma-hepatocelular'],
    citations: [{ refId: 'aasld-cirrhosis-2023' }, { refId: 'easl-cirrhosis-2022' }],
    lastUpdate: '2025-01',
    tags: ['cirrose', 'hepatopatia', 'hipertensao-portal', 'ascite', 'encefalopatia']
  },

  {
    id: 'hepatite-autoimune',
    titulo: 'Hepatite Autoimune',
    sinonimos: ['HAI', 'Hepatite lupoide', 'Hepatite cronica ativa autoimune'],
    doid: 'DOID:2048',
    snomedCT: '408335007',
    meshId: 'D019693',
    umlsCui: 'C0241910',
    ciap2: ['D97'],
    cid10: ['K75.4'],
    cid11: ['DB96.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'hepatico',
    quickView: {
      definicao: 'Doenca hepatica inflamatoria cronica de etiologia autoimune, caracterizada por hepatite de interface, hipergamaglobulinemia, autoanticorpos circulantes e resposta a imunossupressao.',
      criteriosDiagnosticos: [
        'CRITERIOS SIMPLIFICADOS IAIHG 2008 (>=6 pontos = provavel; >=7 = definitivo):',
        'Autoanticorpos: FAN ou AML >=1:40 (+1), >=1:80 (+2); anti-LKM1 >=1:40 (+2); anti-SLA (+2)',
        'IgG: >LSN (+1), >1,1x LSN (+2)',
        'Histologia: compatível (+1), típica (+2)',
        'Ausência de hepatite viral (+2)',
        'TIPOS: HAI-1 (FAN/AML), HAI-2 (anti-LKM1, mais comum em crianças)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar hepatotoxicos',
          'Suporte nutricional',
          'Vacinacao hepatite A e B'
        ],
        farmacologico: [
          'INDUCAO: Prednisona 30-60mg/dia (ou Budesonida se nao cirrotico)',
          'MANUTENCAO: Azatioprina 1-2mg/kg/dia',
          'Desmame de corticoide apos remissao bioquimica',
          'Manter Azatioprina por anos (>=3 anos apos remissao completa)',
          'ALTERNATIVAS: Micofenolato se intolerancia a Azatioprina'
        ]
      },
      metasTerapeuticas: [
        'Remissao bioquimica (AST/ALT e IgG normais)',
        'Remissao histologica (ausencia de inflamacao)',
        'Prevenir progressao para cirrose',
        'Evitar efeitos adversos de corticoides'
      ],
      examesIniciais: [
        'AST, ALT, GGT, FA, bilirrubinas',
        'IgG quantitativa',
        'Autoanticorpos: FAN, AML, anti-LKM1, anti-SLA',
        'Sorologias virais (excluir HBV, HCV)',
        'Biopsia hepatica (recomendada)',
        'Elastografia'
      ],
      redFlags: [
        'Apresentacao aguda/fulminante',
        'Cirrose ao diagnostico',
        'Falha ao tratamento padrao',
        'Sobreposicao com CBP ou CEP',
        'Malignidade hepatica'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-17/100.000 em caucasianos',
        incidencia: '1-2/100.000/ano',
        faixaEtaria: 'Pico bimodal: adolescencia e 40-60 anos',
        fatoresRisco: [
          'Sexo feminino (70-80%)',
          'Outras doencas autoimunes (tireoide, celiaca, DM1)',
          'HLA-DR3 e DR4',
          'Historia familiar de autoimunidade'
        ],
        citations: [{ refId: 'aasld-aih-2020' }]
      },
      fisiopatologia: {
        texto: 'Perda de tolerancia a antigenos hepaticos em individuos geneticamente predispostos. Linfocitos T autorreativos atacam hepatocitos. Fatores desencadeantes incluem virus, drogas e mimetismo molecular.',
        citations: [{ refId: 'hepatology-aih-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fadiga (principal sintoma)',
          'Ictericia',
          'Desconforto em hipocondrio direito',
          'Artralgia, mialgia',
          'Amenorreia',
          'Pode ser assintomatica (descoberta incidental)'
        ],
        sinaisExameFisico: [
          'Hepatomegalia',
          'Ictericia',
          'Aranhas vasculares se cirrose',
          'Sinais de outras doencas autoimunes'
        ],
        formasClinicas: [
          'HAI tipo 1: FAN e/ou AML positivos (mais comum)',
          'HAI tipo 2: anti-LKM1 ou anti-LC1 (criancas, mais grave)',
          'Apresentacao aguda/fulminante',
          'Sobreposicao com CBP ou CEP'
        ],
        citations: [{ refId: 'aasld-aih-2020' }]
      },
      diagnostico: {
        criterios: [
          'Criterios simplificados IAIHG 2008',
          'Exclusao de outras causas',
          'Biopsia hepatica recomendada'
        ],
        diagnosticoDiferencial: [
          'Hepatite viral cronica',
          'Hepatite por drogas (DILI)',
          'NASH',
          'Doenca de Wilson',
          'Colangite biliar primaria',
          'Colangite esclerosante primaria'
        ],
        examesLaboratoriais: [
          'AST, ALT (tipicamente muito elevadas)',
          'IgG (elevada em 80%)',
          'FAN, AML, anti-LKM1, anti-SLA',
          'Sorologias HBV, HCV (negativas)',
          'Ceruloplasmina (excluir Wilson)'
        ],
        outrosExames: [
          'Biopsia hepatica: hepatite de interface, infiltrado linfoplasmocitario',
          'Elastografia para estadiamento'
        ],
        citations: [{ refId: 'aasld-aih-2020' }]
      },
      tratamento: {
        objetivos: [
          'Inducao de remissao',
          'Manutencao da remissao',
          'Prevencao de cirrose',
          'Minimizar efeitos adversos'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar medicamentos hepatotoxicos',
            'Vacinacao hepatite A e B',
            'Monitoramento de osteoporose (uso de corticoide)'
          ],
          citations: [{ refId: 'easl-aih-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide', medicamentos: ['Prednisona', 'Budesonida'], posologia: 'Prednisona 30-60mg/dia, desmame gradual; Budesonida 9mg/dia se nao cirrotico', observacoes: 'Inducao da remissao' },
            { classe: 'Imunomodulador', medicamentos: ['Azatioprina'], posologia: '50mg/dia inicial, aumentar para 1-2mg/kg/dia', observacoes: 'Manutencao; checar TPMT antes' }
          ],
          segundaLinha: [
            { classe: 'Alternativa a azatioprina', medicamentos: ['Micofenolato mofetil'], posologia: '1-2g/dia', observacoes: 'Se intolerancia ou falha a azatioprina' },
            { classe: 'Refratarios', medicamentos: ['Tacrolimus', 'Ciclosporina'], posologia: 'Doses individualizadas', observacoes: 'Casos refratarios em centros especializados' }
          ],
          situacoesEspeciais: [
            { situacao: 'Apresentacao aguda grave', conduta: 'Prednisona 60mg/dia; avaliar transplante se piora' },
            { situacao: 'Gestacao', conduta: 'Manter azatioprina; evitar micofenolato' }
          ],
          citations: [{ refId: 'easl-aih-2022' }]
        },
        duracao: 'Minimo 3 anos apos remissao completa; muitos necessitam tratamento indefinido'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal a mensal na inducao; cada 3-6 meses na manutencao',
        examesControle: [
          'AST, ALT a cada 1-4 semanas na inducao',
          'IgG periodica',
          'Hemograma (azatioprina)',
          'Biopsia de controle pode ser considerada'
        ],
        metasTerapeuticas: [
          'AST/ALT normais',
          'IgG normal',
          'Remissao histologica'
        ],
        criteriosEncaminhamento: [
          'Hepatologista para diagnostico e tratamento',
          'Transplante se cirrose descompensada ou falha'
        ],
        citations: [{ refId: 'aasld-aih-2020' }]
      }
    },
    protocolos: ['hai-tratamento-inducao', 'hai-manutencao'],
    medicamentos: ['prednisona', 'azatioprina', 'micofenolato'],
    calculadoras: ['iaihg-score'],
    rastreamentos: [],
    citations: [{ refId: 'aasld-aih-2020' }, { refId: 'easl-aih-2022' }],
    lastUpdate: '2025-01',
    tags: ['hepatite-autoimune', 'HAI', 'autoanticorpos', 'FAN', 'AML']
  },

  {
    id: 'colangite-biliar-primaria',
    titulo: 'Colangite Biliar Primaria',
    sinonimos: ['CBP', 'Cirrose biliar primaria', 'PBC'],
    doid: 'DOID:12236',
    snomedCT: '31712002',
    meshId: 'D008105',
    umlsCui: 'C0023892',
    ciap2: ['D97'],
    cid10: ['K74.3'],
    cid11: ['DC15.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'hepatico',
    quickView: {
      definicao: 'Doenca hepatica colestatica cronica autoimune que afeta ductos biliares intra-hepaticos de pequeno e medio calibre, levando a colestase progressiva, fibrose e eventualmente cirrose.',
      criteriosDiagnosticos: [
        '>=2 de 3 criterios (diagnostico sem biopsia se 2 presentes):',
        '1. Elevacao de fosfatase alcalina (FA) por >6 meses',
        '2. Anti-mitocondria (AMA) positivo >=1:40',
        '3. Histologia compativel (colangite destrutiva nao supurativa)',
        'AMA-M2 positivo em 90-95%',
        'Se AMA negativo: anti-sp100 e anti-gp210 (AMA-negativo PBC)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suplementacao de vitaminas lipossolúveis (A, D, E, K) se colestase grave',
          'Calcio e vitamina D para osteoporose',
          'Evitar medicamentos colestaticos'
        ],
        farmacologico: [
          'URSO (UDCA) 13-15mg/kg/dia em 2-3 doses (primeira linha para todos)',
          'Avaliar resposta em 1 ano (criterios de Paris II, UK-PBC)',
          'Se resposta inadequada: adicionar Acido Obeticólico (OCA) 5-10mg/dia',
          'PRURIDO: Colestiramina, Rifampicina, Naltrexona, Sertralina'
        ]
      },
      metasTerapeuticas: [
        'Resposta bioquimica ao UDCA (FA <1,67x e bili normal)',
        'Controle do prurido',
        'Prevencao de osteoporose',
        'Prevencao de progressao para cirrose'
      ],
      examesIniciais: [
        'FA, GGT, bilirrubinas, AST, ALT',
        'Anti-mitocondria (AMA) e AMA-M2',
        'IgM (frequentemente elevada)',
        'Se AMA negativo: anti-sp100, anti-gp210',
        'USG abdominal (excluir obstrucao)',
        'Elastografia hepatica',
        'Densitometria ossea'
      ],
      redFlags: [
        'Bilirrubina elevada (mau prognostico)',
        'Cirrose ao diagnostico',
        'Nao resposta ao UDCA',
        'Colangiocarcinoma (raro)',
        'Sobreposicao com HAI'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-40/100.000 em mulheres; 2-4/100.000 em homens',
        incidencia: '0,3-5/100.000/ano',
        faixaEtaria: 'Tipicamente mulheres 40-60 anos',
        fatoresRisco: [
          'Sexo feminino (90%)',
          'Historia familiar',
          'ITU de repeticao (mimetismo com E. coli)',
          'Tabagismo',
          'Outras doencas autoimunes'
        ],
        citations: [{ refId: 'easl-pbc-2022' }]
      },
      fisiopatologia: {
        texto: 'Ataque autoimune aos colangiocitos dos pequenos ductos biliares. Anticorpos AMA reconhecem subunidade E2 do complexo piruvato desidrogenase (PDC-E2). Destruicao ductal causa colestase, fibrose progressiva e cirrose biliar.',
        citations: [{ refId: 'hepatology-pbc-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fadiga (65%) - sintoma mais comum e incapacitante',
          'Prurido (55%) - pode preceder ictericia por anos',
          'Assintomatico (descoberta incidental em ate 50%)',
          'Ictericia (fase tardia)',
          'Dor em hipocondrio direito'
        ],
        sinaisExameFisico: [
          'Hepatomegalia',
          'Escoriacoes por coceira',
          'Xantelasmas, xantomas (hipercolesterolemia)',
          'Hiperpigmentacao',
          'Ictericia (doenca avancada)'
        ],
        formasClinicas: [
          'CBP AMA-positivo (classico)',
          'CBP AMA-negativo (5-10%)',
          'Sobreposicao CBP-HAI',
          'Forma prematura vs forma avancada'
        ],
        citations: [{ refId: 'easl-pbc-2022' }]
      },
      diagnostico: {
        criterios: [
          '2 de 3: FA elevada >6m, AMA+, histologia compativel',
          'Biopsia nao obrigatoria se AMA+ e colestase'
        ],
        diagnosticoDiferencial: [
          'Colangite esclerosante primaria',
          'Colestase induzida por drogas',
          'Sarcoidose hepatica',
          'Hepatite autoimune',
          'Obstrucao biliar'
        ],
        examesLaboratoriais: [
          'FA, GGT elevadas',
          'AST/ALT leve elevacao',
          'AMA e AMA-M2',
          'IgM elevada',
          'Colesterol total elevado'
        ],
        examesImagem: [
          'USG (excluir dilatacao)',
          'ColangioRM se duvida com CEP',
          'Elastografia'
        ],
        citations: [{ refId: 'aasld-pbc-2019' }]
      },
      tratamento: {
        objetivos: [
          'Resposta bioquimica ao UDCA',
          'Controle de sintomas',
          'Prevenir progressao'
        ],
        naoFarmacologico: {
          medidas: [
            'Suplementacao de vitaminas lipossolúveis',
            'Calcio + vitamina D',
            'Evitar alcool e hepatotoxicos'
          ],
          citations: [{ refId: 'easl-pbc-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Acido biliar', medicamentos: ['UDCA (acido ursodesoxicólico)'], posologia: '13-15mg/kg/dia em 2-3 doses', observacoes: 'Todos os pacientes; unico tratamento que modifica progressao' }
          ],
          segundaLinha: [
            { classe: 'Agonista FXR', medicamentos: ['Acido obeticólico'], posologia: '5-10mg/dia', observacoes: 'Adicionar se resposta inadequada ao UDCA; nao usar se cirrose descompensada' },
            { classe: 'PPAR agonista', medicamentos: ['Bezafibrato'], posologia: '400mg/dia', observacoes: 'Off-label; boa evidencia' }
          ],
          situacoesEspeciais: [
            { situacao: 'Prurido', conduta: 'Colestiramina 4-16g/dia > Rifampicina 150-600mg/dia > Naltrexona > Sertralina' },
            { situacao: 'Sobreposicao CBP-HAI', conduta: 'UDCA + Imunossupressao (prednisona + azatioprina)' }
          ],
          citations: [{ refId: 'aasld-pbc-2019' }]
        },
        duracao: 'Tratamento continuo por toda a vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; anual se estavel',
        examesControle: [
          'FA, GGT, bilirrubinas a cada 3-6 meses',
          'Avaliar resposta ao UDCA em 1 ano (Paris II, UK-PBC)',
          'Elastografia anual',
          'Densitometria a cada 2-3 anos'
        ],
        metasTerapeuticas: [
          'FA <1,67x LSN ou normalizacao',
          'Bilirrubina normal',
          'UK-PBC risk score baixo'
        ],
        criteriosEncaminhamento: [
          'Hepatologista para todos',
          'Transplante se cirrose descompensada ou prurido intratavel'
        ],
        citations: [{ refId: 'easl-pbc-2022' }]
      }
    },
    protocolos: ['cbp-tratamento-udca', 'prurido-colestatico'],
    medicamentos: ['udca', 'acido-obeticolico', 'colestiramina'],
    calculadoras: ['uk-pbc-risk', 'paris-ii-criteria', 'globe-score'],
    rastreamentos: ['osteoporose'],
    citations: [{ refId: 'easl-pbc-2022' }, { refId: 'aasld-pbc-2019' }],
    lastUpdate: '2025-01',
    tags: ['CBP', 'colangite-biliar', 'AMA', 'UDCA', 'colestase']
  },

  // ============================================================================
  // DOENCAS PANCREATICAS
  // ============================================================================
  {
    id: 'pancreatite-cronica',
    titulo: 'Pancreatite Cronica',
    sinonimos: ['Pancreatite cronica calcificante', 'Insuficiencia pancreatica exocrina'],
    doid: 'DOID:13027',
    snomedCT: '235494005',
    meshId: 'D050500',
    umlsCui: 'C0149521',
    ciap2: ['D99'],
    cid10: ['K86.1'],
    cid11: ['DC31.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'pancreatico',
    quickView: {
      definicao: 'Sindrome inflamatoria cronica do pancreas caracterizada por dano estrutural progressivo (fibrose, atrofia, calcificacoes), levando a insuficiencia exocrina e endocrina.',
      criteriosDiagnosticos: [
        'CLINICA: Dor abdominal recorrente + historia de pancreatite/etilismo',
        'IMAGEM (TC/RM): Calcificacoes, dilatacao ductal, atrofia',
        'FUNCAO: Insuficiencia exocrina (esteatorreia) e/ou endocrina (diabetes)',
        'CRITERIOS MORFOLOGICOS (M-ANNHEIM ou Rosemont por EUS)',
        'Calcificacoes pancreaticas sao patognomonicas em contexto adequado',
        'Elastase fecal <200 mcg/g confirma insuficiencia exocrina'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Abstinencia alcoolica TOTAL',
          'Cessacao do tabagismo',
          'Dieta fracionada, baixa em gordura',
          'Suplementacao de vitaminas lipossolúveis'
        ],
        farmacologico: [
          'DOR: Analgesia escalonada (paracetamol -> AINE -> opioides fracos -> fortes)',
          'INSUFICIENCIA EXOCRINA: Enzimas pancreaticas (Pancreatina/Creon) 25.000-75.000 UI lipase/refeicao',
          'DIABETES PANCREATOGENICO: Insulina (primeira linha); Metformina com cautela',
          'Adicionar IBP se resposta inadequada as enzimas'
        ]
      },
      metasTerapeuticas: [
        'Controle da dor',
        'Correcao da ma absorcao',
        'Controle glicemico',
        'Melhora do estado nutricional'
      ],
      examesIniciais: [
        'TC de abdome (calcificacoes, atrofia, dilatacao ductal)',
        'ColangioRM/CPRM (alteracoes ductais)',
        'Elastase fecal (<200 = insuficiencia)',
        'Glicemia de jejum, HbA1c',
        'Vitaminas A, D, E, K',
        'Albumina, pre-albumina'
      ],
      redFlags: [
        'Dor intratavel',
        'Massa pancreatica (cancer?)',
        'Ictericia obstrutiva',
        'Trombose de veia esplenica',
        'Pseudocisto complicado',
        'Diabetes de dificil controle'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '25-30/100.000',
        incidencia: '5-14/100.000/ano',
        mortalidade: 'Sobrevida em 10 anos: 70-80%; risco de cancer pancreatico 5%',
        faixaEtaria: 'Pico 35-55 anos; forma hereditaria mais precoce',
        fatoresRisco: [
          'Alcoolismo cronico (70-80%)',
          'Tabagismo (fator independente e sinergico)',
          'Pancreatite aguda recorrente',
          'Genetico: PRSS1, SPINK1, CFTR, CTRC',
          'Autoimune',
          'Obstrutivo (tumores, pancreas divisum)'
        ],
        citations: [{ refId: 'aga-chronic-pancreatitis-2020' }]
      },
      fisiopatologia: {
        texto: 'Lesao recorrente leva a inflamacao cronica, ativacao de celulas estreladas pancreaticas e deposito de colageno. Fibrose progressiva causa obstrucao ductal, atrofia acinar (insuficiencia exocrina) e destruicao de ilhotas (diabetes). Calcificacoes intraductais sao caracteristicas.',
        citations: [{ refId: 'lancet-pancreatitis-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor abdominal epigastrica recorrente (90%)',
          'Esteatorreia (fezes oleosas, mal cheirosas)',
          'Perda de peso',
          'Diabetes mellitus (30-50%)',
          'Nauseas, vomitos'
        ],
        sinaisExameFisico: [
          'Emagrecimento',
          'Sensibilidade epigastrica',
          'Sinais de desnutricao',
          'Sinais de hepatopatia se etilismo'
        ],
        formasClinicas: [
          'Pancreatite cronica calcificante (alcoolica) - mais comum',
          'Pancreatite cronica obstrutiva',
          'Pancreatite autoimune tipo 1 (IgG4-relacionada)',
          'Pancreatite hereditaria',
          'Pancreatite tropical'
        ],
        citations: [{ refId: 'aga-chronic-pancreatitis-2020' }]
      },
      diagnostico: {
        criterios: [
          'Clinica + imagem (calcificacoes, alteracoes ductais)',
          'TC com calcificacoes e uma sensibilidade alta',
          'EUS com criterios de Rosemont para formas precoces',
          'Elastase fecal <200 confirma insuficiencia'
        ],
        diagnosticoDiferencial: [
          'Cancer de pancreas',
          'Pancreatite autoimune',
          'IPMN (neoplasia mucinosa)',
          'Ulcera peptica',
          'Isquemia mesenterica cronica'
        ],
        examesLaboratoriais: [
          'Amilase/lipase (podem ser normais na cronica)',
          'Elastase fecal (<200 mcg/g)',
          'Glicemia, HbA1c',
          'Vitaminas lipossolúveis',
          'IgG4 (se suspeita autoimune)'
        ],
        examesImagem: [
          'TC abdome: calcificacoes, atrofia, dilatacao ductal',
          'ColangioRM/CPRM: alteracoes ductais',
          'EUS: criterios de Rosemont'
        ],
        citations: [{ refId: 'acg-pancreatitis-2020' }]
      },
      tratamento: {
        objetivos: [
          'Controle da dor',
          'Correcao da insuficiencia exocrina',
          'Controle do diabetes',
          'Prevencao de complicacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Abstinencia alcoolica TOTAL',
            'Cessacao do tabagismo',
            'Dieta fracionada, baixa gordura',
            'Suplementacao de vitaminas ADEK'
          ],
          citations: [{ refId: 'aga-chronic-pancreatitis-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Enzimas pancreaticas', medicamentos: ['Pancreatina', 'Creon'], posologia: '25.000-75.000 UI lipase por refeicao principal; 10.000-25.000 por lanche', observacoes: 'Tomar no inicio e durante a refeicao' },
            { classe: 'Analgesia', medicamentos: ['Paracetamol', 'Tramadol'], posologia: 'Paracetamol 1g 6/6h; Tramadol 50-100mg 6/6h', observacoes: 'Escalonar conforme dor' }
          ],
          segundaLinha: [
            { classe: 'IBP', medicamentos: ['Omeprazol'], posologia: '20-40mg/dia', observacoes: 'Adicionar se esteatorreia persiste apesar de enzimas' },
            { classe: 'Antidiabetico', medicamentos: ['Insulina', 'Metformina'], posologia: 'Individualizado', observacoes: 'Diabetes pancreatogenico: preferir insulina (risco de hipoglicemia)' }
          ],
          situacoesEspeciais: [
            { situacao: 'Dor refrataria', conduta: 'CPRE com esfincterotomia/stent; bloqueio do plexo celiaco; cirurgia' },
            { situacao: 'Pseudocisto sintomatico', conduta: 'Drenagem endoscopica ou cirurgica' }
          ],
          citations: [{ refId: 'acg-pancreatitis-2020' }]
        },
        duracao: 'Tratamento cronico; enzimas por toda a vida se insuficiencia'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; nutricional periodico',
        examesControle: [
          'Peso, estado nutricional',
          'HbA1c a cada 3-6 meses',
          'Vitaminas lipossolúveis anual',
          'Imagem anual se alto risco de cancer'
        ],
        metasTerapeuticas: [
          'Controle adequado da dor',
          'Ganho ou manutencao de peso',
          'HbA1c <7%',
          'Correcao de deficiencias vitaminicas'
        ],
        criteriosEncaminhamento: [
          'Gastroenterologista/pancreatologista',
          'Cirurgiao pancreatico se complicacoes',
          'Nutricao',
          'Endocrinologista se diabetes de dificil controle'
        ],
        citations: [{ refId: 'aga-chronic-pancreatitis-2020' }]
      },
      prevencao: {
        primaria: [
          'Evitar alcoolismo',
          'Nao fumar'
        ],
        secundaria: [
          'Abstinencia alcoolica retarda progressao',
          'Cessacao do tabagismo',
          'Rastreamento de cancer em pacientes de alto risco'
        ],
        citations: [{ refId: 'lancet-pancreatitis-2020' }]
      }
    },
    protocolos: ['pancreatite-cronica-manejo', 'insuficiencia-pancreatica-exocrina'],
    medicamentos: ['pancreatina', 'creon', 'omeprazol', 'tramadol'],
    calculadoras: ['m-annheim', 'rosemont-criteria'],
    rastreamentos: ['cancer-pancreas'],
    citations: [{ refId: 'aga-chronic-pancreatitis-2020' }, { refId: 'acg-pancreatitis-2020' }],
    lastUpdate: '2025-01',
    tags: ['pancreatite-cronica', 'insuficiencia-exocrina', 'calcificacoes', 'enzimas', 'diabetes']
  }
];
