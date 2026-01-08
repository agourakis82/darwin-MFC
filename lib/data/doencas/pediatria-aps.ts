/**
 * PEDIATRIA APS - DARWIN-MFC
 * ==========================
 *
 * Doenças pediátricas comuns na Atenção Primária à Saúde
 * Condições completas com fullContent baseadas em diretrizes SBP
 *
 * Referências:
 * - Sociedade Brasileira de Pediatria (SBP)
 * - AIDPI (Atenção Integrada às Doenças Prevalentes na Infância)
 * - Nelson Textbook of Pediatrics
 */

import { Doenca } from '../../types/doenca';

export const doencasPediatriaAPS: Doenca[] = [
  // ============================================================================
  // 1. IVAS - INFECÇÃO DE VIAS AÉREAS SUPERIORES
  // ============================================================================
  {
    id: 'ivas-aps',
    titulo: 'IVAS (Infecção de Vias Aéreas Superiores)',
    sinonimos: [
      'Resfriado comum',
      'Rinofaringite aguda',
      'Coriza',
      'Nasofaringite',
      'Gripe comum'
    ],
    doid: 'DOID:0050117',
    snomedCT: '54150009',
    meshId: 'D012141',
    umlsCui: 'C0041912',
    ciap2: ['R74'],
    cid10: ['J06.9', 'J00', 'J06.0'],
    cid11: ['CA07'],
    categoria: 'pediatrico',
    subcategoria: 'respiratorio',

    quickView: {
      definicao: 'Infecção viral aguda e autolimitada das vias aéreas superiores (nariz, faringe, seios paranasais). Causa mais frequente de consulta pediátrica. Crianças apresentam 6-8 episódios/ano. Etiologia viral (>200 vírus, principalmente rinovírus). Duração média: 7-10 dias.',
      criteriosDiagnosticos: [
        'Coriza inicial clara, tornando-se purulenta (não indica infecção bacteriana)',
        'Obstrução nasal e espirros',
        'Febre baixa a moderada (37,5-39°C) nos primeiros 2-3 dias',
        'Tosse seca ou produtiva (reflexo de gotejamento pós-nasal)',
        'Irritabilidade e inapetência em lactentes',
        'Hiperemia de orofaringe sem exsudato'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Lavagem nasal com SF 0,9% (3-5ml por narina, várias vezes ao dia)',
          'Hidratação abundante (água, sucos, sopas)',
          'Elevação da cabeceira (30-45°)',
          'Mel para tosse (>1 ano): 2,5-5ml antes de dormir',
          'Ambiente umidificado',
          'Manter aleitamento materno'
        ],
        farmacologico: [
          'Antitérmico SN: Paracetamol 10-15mg/kg/dose 4-6h (máx 75mg/kg/dia)',
          'Alternativa: Dipirona 10-25mg/kg/dose 6h',
          'Alternativa: Ibuprofeno 5-10mg/kg/dose 6-8h (>6 meses)',
          'NÃO usar: descongestionantes (<6 anos), anti-histamínicos, antitussígenos',
          'NÃO usar antibióticos (infecção viral)'
        ]
      },
      metasTerapeuticas: [
        'Alívio sintomático',
        'Manter hidratação e nutrição',
        'Prevenir complicações bacterianas',
        'Orientar família sobre evolução natural'
      ],
      examesIniciais: [
        'Diagnóstico clínico - exames geralmente desnecessários',
        'Hemograma apenas se dúvida diagnóstica ou febre prolongada'
      ],
      redFlags: [
        'Febre >39°C persistente >72h ou recorrente após afebril',
        'Piora após melhora inicial (sugere complicação bacteriana)',
        'Dificuldade respiratória (taquipneia, tiragem, batimento de asa)',
        'Otalgia (otite média aguda)',
        'Prostração intensa ou toxemia',
        'Recusa alimentar ou desidratação',
        '<3 meses com febre (risco de infecção bacteriana grave)',
        'Tosse >10-14 dias sem melhora'
      ]
    },

    fullContent: {
      epidemiologia: {
        prevalencia: 'Causa mais comum de doença aguda na infância',
        incidencia: '6-8 episódios/ano em crianças, 2-4 em adultos',
        faixaEtaria: 'Pico: 6 meses a 6 anos (maior exposição em creches/escolas)',
        fatoresRisco: [
          'Frequência em creches e escolas',
          'Irmãos em idade escolar',
          'Ausência de aleitamento materno',
          'Exposição à fumaça de cigarro',
          'Aglomeração domiciliar',
          'Desnutrição e carências nutricionais',
          'Estação fria e seca (outono/inverno)'
        ],
        citations: [{ refId: 'sbp-ivas-2023' }]
      },
      fisiopatologia: {
        texto: 'Transmissão por gotículas respiratórias ou contato com secreções. Período de incubação: 1-3 dias. Vírus infectam células epiteliais da mucosa nasal, causando edema, vasodilatação e hipersecreção. Rinovírus (30-50%), coronavírus (10-15%), VSR, parainfluenza, adenovírus, influenza são os principais agentes. A mudança de cor da secreção nasal (clara para amarelada/esverdeada) é evolução natural e não indica infecção bacteriana.',
        citations: [{ refId: 'sbp-ivas-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Coriza (rinorreia) - inicialmente clara, depois mucosa/purulenta',
          'Obstrução nasal e espirros frequentes',
          'Febre baixa a moderada (1-3 dias)',
          'Tosse (seca ou produtiva) - pode persistir até 2 semanas',
          'Dor de garganta leve, odinofagia',
          'Cefaleia, mialgia (crianças maiores)',
          'Irritabilidade, inapetência, sono alterado (lactentes)'
        ],
        sinaisExameFisico: [
          'Mucosa nasal edemaciada e hiperemiada',
          'Hiperemia de orofaringe sem exsudato',
          'Linfonodos cervicais discretamente aumentados',
          'Pode haver hiperemia de membrana timpânica (sem abaulamento)',
          'Ausculta pulmonar limpa ou ruídos adventícios de transmissão'
        ],
        formasClinicas: [
          'Rinofaringite (forma mais comum)',
          'Faringite viral (predomina odinofagia)',
          'Laringite catarral (rouquidão)',
          'Traqueíte viral (tosse seca irritativa)'
        ],
        citations: [{ refId: 'sbp-ivas-2023' }]
      },
      diagnostico: {
        criterios: [
          'Diagnóstico essencialmente clínico',
          'História típica + exame físico compatível',
          'Exames laboratoriais desnecessários na maioria dos casos'
        ],
        diagnosticoDiferencial: [
          'Rinite alérgica (sintomas recorrentes, prurido, sem febre)',
          'Sinusite bacteriana (febre >10 dias, secreção purulenta persistente)',
          'Otite média aguda (otalgia, abaulamento MT)',
          'Amigdalite bacteriana (exsudato, febre alta, Centor +)',
          'Gripe/Influenza (prostração intensa, mialgia, febre alta)',
          'COVID-19 (considerar conforme epidemiologia)',
          'Coqueluche (tosse paroxística >2 semanas)',
          'Corpo estranho nasal (rinorreia unilateral fétida)'
        ],
        examesLaboratoriais: [
          'Geralmente desnecessários',
          'Hemograma se febre prolongada ou suspeita de complicação',
          'PCR/VSR se suspeita de bronquiolite em lactentes'
        ],
        citations: [{ refId: 'sbp-ivas-2023' }]
      },
      tratamento: {
        objetivos: [
          'Alívio sintomático',
          'Manter hidratação adequada',
          'Prevenir complicações',
          'Evitar uso desnecessário de antibióticos'
        ],
        naoFarmacologico: {
          medidas: [
            'Lavagem nasal com SF 0,9%: 3-5ml por narina, 4-6x/dia',
            'Aspiração nasal suave em lactentes antes das mamadas',
            'Hidratação oral abundante',
            'Elevação da cabeceira (30-45°)',
            'Mel para tosse em >1 ano (comprovado em estudos)',
            'Ambiente umidificado e ventilado',
            'Manter aleitamento materno',
            'Evitar exposição à fumaça de cigarro'
          ],
          citations: [{ refId: 'sbp-ivas-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Antitérmicos/Analgésicos',
              medicamentos: ['Paracetamol', 'Dipirona', 'Ibuprofeno'],
              posologia: 'Paracetamol 10-15mg/kg/dose 4-6h; Dipirona 10-25mg/kg/dose 6h; Ibuprofeno 5-10mg/kg/dose 6-8h (>6m)',
              observacoes: 'Usar apenas se febre ou desconforto. Ibuprofeno a partir de 6 meses.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Lactentes <3 meses com febre',
              conduta: 'Encaminhar para avaliação de infecção bacteriana grave'
            },
            {
              situacao: 'Suspeita de complicação bacteriana',
              conduta: 'Avaliar necessidade de antibioticoterapia específica (sinusite, OMA, pneumonia)'
            }
          ],
          citations: [{ refId: 'sbp-ivas-2023' }]
        },
        duracao: 'Sintomas resolvem em 7-10 dias; tosse residual pode persistir até 2-3 semanas'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno se piora, febre persistente >72h ou sinais de alerta',
        metasTerapeuticas: [
          'Resolução dos sintomas em 7-10 dias',
          'Manutenção de hidratação e alimentação',
          'Ausência de complicações bacterianas'
        ],
        criteriosEncaminhamento: [
          'IVAS de repetição (>8/ano) - investigar imunodeficiência, alergia',
          'Complicações: sinusite, OMA, pneumonia',
          'Lactente <3 meses com febre',
          'Sinais de gravidade ou toxemia'
        ],
        citations: [{ refId: 'sbp-ivas-2023' }]
      },
      prevencao: {
        primaria: [
          'Aleitamento materno exclusivo até 6 meses',
          'Lavagem frequente das mãos',
          'Evitar aglomerações em época de surtos',
          'Imunização em dia (influenza anual)',
          'Ambiente domiciliar ventilado e sem fumaça'
        ],
        secundaria: [
          'Identificação precoce de complicações',
          'Orientação sobre sinais de alerta'
        ],
        citations: [{ refId: 'sbp-ivas-2023' }]
      },
      populacoesEspeciais: {
        criancas: 'Lactentes: maior risco de complicações, dificuldade alimentar por obstrução nasal. Lactentes jovens (<3m) com febre sempre avaliar sepse.',
        gestantes: 'N/A - condição pediátrica'
      }
    },

    protocolos: ['ivas-pediatrica', 'aidpi'],
    medicamentos: ['paracetamol', 'dipirona', 'ibuprofeno'],
    calculadoras: ['dose-pediatrica'],
    citations: [
      { refId: 'sbp-ivas-2023' },
      { refId: 'nelson-pediatrics-2023' }
    ],
    lastUpdate: '2024-01-01',
    tags: ['pediatria', 'aps', 'ivas', 'resfriado', 'viral', 'respiratorio']
  },

  // ============================================================================
  // 2. OTITE MÉDIA AGUDA
  // ============================================================================
  {
    id: 'oma-aps',
    titulo: 'Otite Média Aguda',
    sinonimos: [
      'OMA',
      'Infecção de ouvido',
      'Dor de ouvido',
      'Otite média purulenta'
    ],
    doid: 'DOID:10754',
    snomedCT: '3110003',
    meshId: 'D010033',
    umlsCui: 'C0029882',
    ciap2: ['H71'],
    cid10: ['H66.9', 'H66.0', 'H65.0'],
    cid11: ['AA80'],
    categoria: 'pediatrico',
    subcategoria: 'otorrinolaringologia',

    quickView: {
      definicao: 'Infecção bacteriana aguda do ouvido médio, caracterizada por início súbito de sinais/sintomas de inflamação e efusão. Pico de incidência: 6-18 meses. Agentes: S. pneumoniae (40%), H. influenzae não tipável (30%), M. catarrhalis (10-15%). Frequentemente precedida por IVAS.',
      criteriosDiagnosticos: [
        'Início agudo de sinais/sintomas (<48h)',
        'Presença de efusão no ouvido médio (abaulamento da MT)',
        'Sinais de inflamação: hiperemia intensa da MT ou otalgia que interfere na atividade/sono',
        'Otorreia purulenta (perfuração timpânica) - diagnóstico definitivo',
        'Em lactentes: irritabilidade, choro, manipulação do ouvido, febre'
      ],
      classificacaoRisco: [
        {
          nivel: 'baixo',
          criterios: ['>2 anos', 'OMA unilateral', 'Sintomas leves', 'Sem febre alta'],
          conduta: 'Observação expectante por 48-72h com analgesia'
        },
        {
          nivel: 'moderado',
          criterios: ['6 meses a 2 anos', 'OMA bilateral', 'Otalgia moderada', 'Febre 39°C'],
          conduta: 'Antibioticoterapia imediata'
        },
        {
          nivel: 'alto',
          criterios: ['<6 meses', 'Otorreia', 'Sintomas graves', 'Imunossupressão', 'Anomalia craniofacial'],
          conduta: 'Antibioticoterapia imediata + considerar encaminhamento'
        }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Analgesia adequada (prioridade!)',
          'Compressas mornas locais',
          'Elevação da cabeceira',
          'Observação expectante em casos selecionados (>2 anos, unilateral, leve)'
        ],
        farmacologico: [
          'ANALGESIA: Paracetamol 15mg/kg/dose 6h OU Ibuprofeno 10mg/kg/dose 8h',
          'ATB 1ª linha: Amoxicilina 80-90mg/kg/dia ÷ 2 doses por 10 dias (<2a) ou 7 dias (>2a)',
          'ATB 2ª linha (falha): Amoxicilina-Clavulanato 90mg/kg/dia ÷ 2',
          'Alergia à penicilina: Azitromicina 10mg/kg/dia por 3 dias'
        ]
      },
      metasTerapeuticas: [
        'Alívio da dor em 24-48h',
        'Resolução da infecção',
        'Prevenção de complicações',
        'Restauração da audição'
      ],
      examesIniciais: [
        'Otoscopia (fundamental - MT abaulada, hiperemiada, opaca)',
        'Otoscopia pneumática (diminuição da mobilidade)',
        'Timpanometria se disponível'
      ],
      redFlags: [
        'Idade <6 meses (sempre tratar com ATB)',
        'Febre alta >39°C ou toxemia',
        'Sintomas >48h sem melhora com ATB',
        'Eritema/edema retroauricular (MASTOIDITE - emergência)',
        'Paralisia facial periférica',
        'Vertigem, nistagmo (labirintite)',
        'Sinais meníngeos',
        'OMA recorrente (≥3 em 6 meses ou ≥4 em 12 meses)'
      ]
    },

    fullContent: {
      epidemiologia: {
        prevalencia: '80% das crianças terão pelo menos 1 episódio até 3 anos',
        incidencia: 'Pico entre 6-18 meses de idade',
        faixaEtaria: 'Rara <4 meses, pico 6-18 meses, diminui após 7 anos',
        fatoresRisco: [
          'Idade <2 anos (anatomia da tuba auditiva)',
          'Sexo masculino',
          'Frequência em creche',
          'Exposição à fumaça de tabaco',
          'Uso de mamadeira em posição supina',
          'Ausência de aleitamento materno',
          'IVAS recorrentes',
          'Anomalias craniofaciais (fenda palatina)',
          'Síndrome de Down',
          'Rinite alérgica',
          'História familiar de OMA recorrente'
        ],
        citations: [{ refId: 'sbp-oma-2023' }]
      },
      fisiopatologia: {
        texto: 'A tuba auditiva da criança é mais curta, horizontal e flácida, facilitando refluxo de secreções nasofaríngeas. Após IVAS, edema e disfunção tubária levam a pressão negativa no ouvido médio, acúmulo de efusão e proliferação bacteriana. Biofilmes bacterianos explicam casos recorrentes/refratários.',
        citations: [{ refId: 'sbp-oma-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Otalgia (sintoma mais específico)',
          'Irritabilidade e choro (lactentes)',
          'Febre (presente em 50%)',
          'Manipulação da orelha',
          'Dificuldade para dormir',
          'Diminuição da audição',
          'Otorreia (se perfuração - alivia dor)',
          'Sintomas precedentes de IVAS'
        ],
        sinaisExameFisico: [
          'MT abaulada (sinal mais específico de OMA)',
          'MT opaca, amarelada ou avermelhada',
          'Diminuição/ausência da mobilidade da MT',
          'Perda dos marcos anatômicos (triângulo luminoso)',
          'Nível hidroaéreo ou bolhas (efusão)',
          'Perfuração com otorreia purulenta'
        ],
        formasClinicas: [
          'OMA não complicada (maioria dos casos)',
          'OMA com perfuração espontânea (otorreia)',
          'OMA recorrente (≥3 em 6m ou ≥4 em 12m)',
          'OMA complicada (mastoidite, meningite)'
        ],
        citations: [{ refId: 'sbp-oma-2023' }]
      },
      diagnostico: {
        criterios: [
          'Início agudo (<48h) de sinais de inflamação do ouvido médio',
          'Presença de efusão (abaulamento da MT, diminuição da mobilidade, otorreia)',
          'Sinais de inflamação: otalgia intensa ou hiperemia intensa da MT'
        ],
        diagnosticoDiferencial: [
          'Otite externa (dor à tração do pavilhão)',
          'Otite média com efusão - OME (sem sinais inflamatórios agudos)',
          'Dor referida (dentes, ATM, faringe)',
          'Miringite bolhosa (Mycoplasma)',
          'Corpo estranho no conduto',
          'Colesteatoma',
          'Mastoidite (edema retroauricular)'
        ],
        examesLaboratoriais: [
          'Geralmente desnecessários',
          'Hemograma/PCR se suspeita de complicação',
          'Cultura de otorreia em casos graves ou refratários'
        ],
        outrosExames: [
          'Otoscopia (fundamental)',
          'Otoscopia pneumática',
          'Timpanometria (tipo B = efusão)',
          'Audiometria se suspeita de perda auditiva'
        ],
        citations: [{ refId: 'sbp-oma-2023' }]
      },
      tratamento: {
        objetivos: [
          'Controle da dor',
          'Erradicação da infecção',
          'Prevenção de complicações',
          'Restauração da audição'
        ],
        naoFarmacologico: {
          medidas: [
            'Analgesia é prioridade (mesmo em observação expectante)',
            'Compressas mornas sobre a orelha',
            'Elevação da cabeceira',
            'Manter hidratação',
            'OBSERVAÇÃO EXPECTANTE (48-72h): >2 anos, OMA unilateral, sintomas leves-moderados, sem comorbidades'
          ],
          citations: [{ refId: 'sbp-oma-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Analgésicos (sempre)',
              medicamentos: ['Paracetamol', 'Ibuprofeno'],
              posologia: 'Paracetamol 15mg/kg/dose 6h OU Ibuprofeno 10mg/kg/dose 8h',
              observacoes: 'Prioridade absoluta. Pode usar os dois alternadamente.'
            },
            {
              classe: 'Antibiótico 1ª linha',
              medicamentos: ['Amoxicilina'],
              posologia: '80-90mg/kg/dia dividido em 2 doses, por 10 dias (<2a) ou 7 dias (>2a)',
              observacoes: 'Dose alta para cobrir S. pneumoniae resistente'
            }
          ],
          segundaLinha: [
            {
              classe: 'Falha terapêutica (após 48-72h)',
              medicamentos: ['Amoxicilina-Clavulanato'],
              posologia: '90mg/kg/dia (amoxicilina) dividido em 2 doses',
              observacoes: 'Cobre H. influenzae e M. catarrhalis produtores de betalactamase'
            },
            {
              classe: 'Alergia à penicilina (tipo I)',
              medicamentos: ['Azitromicina', 'Claritromicina'],
              posologia: 'Azitromicina 10mg/kg/dia por 3 dias',
              observacoes: 'Macrolídeos têm menor eficácia contra S. pneumoniae'
            },
            {
              classe: 'OMA grave ou refratária',
              medicamentos: ['Ceftriaxona'],
              posologia: '50mg/kg/dia IM por 3 dias',
              observacoes: 'Reservado para casos graves ou falha com amoxicilina-clav'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Idade <6 meses',
              conduta: 'Sempre tratar com antibiótico'
            },
            {
              situacao: 'OMA bilateral em <2 anos',
              conduta: 'Tratar com antibiótico (maior risco de complicações)'
            },
            {
              situacao: 'OMA com otorreia',
              conduta: 'Tratar com antibiótico + considerar gotas tópicas'
            },
            {
              situacao: 'OMA recorrente',
              conduta: 'Encaminhar ao ORL para avaliação de tubo de ventilação'
            }
          ],
          citations: [{ refId: 'sbp-oma-2023' }]
        },
        duracao: '7-10 dias de ATB conforme idade; melhora esperada em 48-72h'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno em 48-72h se não houver melhora; reavaliação em 2-4 semanas para confirmar resolução',
        examesControle: [
          'Otoscopia de controle em 2-4 semanas',
          'Avaliar audição se efusão persistente >3 meses'
        ],
        metasTerapeuticas: [
          'Alívio da dor em 24-48h',
          'Resolução da efusão em 4-12 semanas',
          'Audição normal',
          'Ausência de recorrências'
        ],
        criteriosEncaminhamento: [
          'OMA recorrente (≥3 em 6m ou ≥4 em 12m) - ORL',
          'OME persistente >3 meses com perda auditiva',
          'Suspeita de mastoidite ou complicação intracraniana (urgência)',
          'Perfuração timpânica crônica',
          'Perda auditiva significativa'
        ],
        citations: [{ refId: 'sbp-oma-2023' }]
      },
      prevencao: {
        primaria: [
          'Aleitamento materno exclusivo até 6 meses',
          'Não oferecer mamadeira em posição supina',
          'Evitar exposição à fumaça de cigarro',
          'Vacina pneumocócica conjugada (reduz OMA em 6-7%)',
          'Vacina influenza anual',
          'Evitar uso de chupeta após 6 meses',
          'Higiene das mãos'
        ],
        secundaria: [
          'Tratamento adequado da IVAS',
          'Identificação precoce de OME',
          'Avaliação auditiva em casos recorrentes'
        ],
        citations: [{ refId: 'sbp-oma-2023' }]
      },
      populacoesEspeciais: {
        criancas: 'Lactentes <6 meses: sempre tratar com ATB. Crianças com fenda palatina, síndrome de Down, imunodeficiência: maior risco de complicações.'
      }
    },

    protocolos: ['oma-sbp', 'aidpi'],
    medicamentos: ['amoxicilina', 'amoxicilina-clavulanato', 'azitromicina', 'paracetamol', 'ibuprofeno'],
    calculadoras: ['dose-pediatrica'],
    citations: [
      { refId: 'sbp-oma-2023' },
      { refId: 'aap-oma-2013' }
    ],
    lastUpdate: '2024-01-01',
    tags: ['pediatria', 'aps', 'oma', 'otite', 'ouvido', 'infeccao']
  },

  // ============================================================================
  // 3. GASTROENTERITE AGUDA
  // ============================================================================
  {
    id: 'gea-aps',
    titulo: 'Gastroenterite Aguda',
    sinonimos: [
      'GEA',
      'Diarreia aguda',
      'Gastroenterocolite',
      'Diarreia infecciosa',
      'Virose intestinal'
    ],
    doid: 'DOID:2326',
    snomedCT: '25374005',
    meshId: 'D005759',
    umlsCui: 'C0017160',
    ciap2: ['D73'],
    cid10: ['A09', 'A08.0', 'A09.0'],
    cid11: ['1A40'],
    categoria: 'pediatrico',
    subcategoria: 'gastrointestinal',

    quickView: {
      definicao: 'Síndrome caracterizada por diarreia (≥3 evacuações líquidas/24h) de início súbito, podendo acompanhar-se de vômitos, febre e dor abdominal. Duração <14 dias. Principal causa de morbimortalidade infantil em países em desenvolvimento. Etiologia viral (rotavírus, norovírus) na maioria dos casos.',
      criteriosDiagnosticos: [
        'Diarreia: ≥3 evacuações líquidas ou semilíquidas em 24h',
        'Início agudo (<14 dias de duração)',
        'Pode haver: vômitos, febre, dor abdominal, náuseas',
        'Avaliar grau de desidratação (fundamental para conduta)',
        'Sem sangue nas fezes (disenteria = etiologia diferente)'
      ],
      classificacaoRisco: [
        {
          nivel: 'baixo',
          criterios: ['Sem desidratação', 'Alerta, ativo', 'Bebe normalmente', 'Sinal da prega <2s'],
          conduta: 'Plano A: Tratamento domiciliar com SRO e alimentação'
        },
        {
          nivel: 'moderado',
          criterios: ['Desidratação leve-moderada', 'Irritado/sedento', 'Olhos fundos', 'Prega 2-3s'],
          conduta: 'Plano B: TRO supervisionada na UBS (50-100ml/kg em 4h)'
        },
        {
          nivel: 'alto',
          criterios: ['Desidratação grave', 'Letárgico/inconsciente', 'Não bebe', 'Prega >3s'],
          conduta: 'Plano C: Hidratação venosa + encaminhamento urgente'
        }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'HIDRATAÇÃO com SRO (Solução de Reidratação Oral) - base do tratamento',
          'Plano A: 50-100ml SRO após cada evacuação (<2a: 50-100ml; >2a: 100-200ml)',
          'Manter aleitamento materno',
          'Dieta habitual (não suspender alimentação)',
          'Aumentar oferta de líquidos'
        ],
        farmacologico: [
          'ZINCO: 10mg/dia (<6m) ou 20mg/dia (>6m) por 10-14 dias (reduz duração e recorrência)',
          'Ondansetrona 0,15mg/kg VO dose única se vômitos intensos (facilita TRO)',
          'Probióticos (Saccharomyces boulardii) - podem reduzir duração',
          'NÃO usar: antidiarreicos (loperamida), antieméticos rotina, ATB empírico'
        ]
      },
      metasTerapeuticas: [
        'Prevenir e tratar desidratação',
        'Manter estado nutricional',
        'Reduzir duração e gravidade dos sintomas',
        'Prevenir complicações'
      ],
      examesIniciais: [
        'Diagnóstico clínico na maioria dos casos',
        'Coprocultura se: disenteria, diarreia >7 dias, imunossuprimido',
        'Eletrólitos se desidratação grave'
      ],
      redFlags: [
        'Desidratação grave (letargia, incapaz de beber, prega >3s)',
        'Vômitos incoercíveis (impossibilita TRO)',
        'Sangue nas fezes (disenteria)',
        '<3 meses de idade',
        'Desnutrição grave',
        'Diarreia >7 dias sem melhora',
        'Febre alta >39°C persistente',
        'Distensão abdominal importante',
        'Sinais de sepse',
        'Comorbidades (cardiopatia, DM, imunossupressão)'
      ]
    },

    fullContent: {
      epidemiologia: {
        prevalencia: '2ª causa de mortalidade infantil global',
        incidencia: '1,7 bilhão de episódios/ano em crianças <5 anos no mundo',
        mortalidade: '~525.000 mortes/ano em <5 anos (principalmente desidratação)',
        faixaEtaria: 'Maior incidência: 6-24 meses',
        fatoresRisco: [
          'Idade <2 anos',
          'Desnutrição',
          'Ausência de aleitamento materno',
          'Saneamento precário',
          'Água não tratada',
          'Falta de higiene (mãos, alimentos)',
          'Aglomeração (creches)',
          'Imunossupressão'
        ],
        citations: [{ refId: 'sbp-gea-2023' }]
      },
      fisiopatologia: {
        texto: 'Mecanismos: 1) Diarreia secretora: toxinas bacterianas (cólera, ETEC) estimulam secreção de Cl- e água; 2) Diarreia osmótica: dano às vilosidades (rotavírus) causa má absorção de dissacarídeos; 3) Diarreia inflamatória/invasiva: invasão da mucosa (Shigella, Salmonella) causa disenteria. Rotavírus é o principal agente em <5 anos; norovírus em todas as idades.',
        citations: [{ refId: 'sbp-gea-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Diarreia (≥3 evacuações líquidas/dia)',
          'Vômitos (precedem diarreia em GEA viral)',
          'Febre (mais comum em etiologia bacteriana)',
          'Dor abdominal tipo cólica',
          'Náuseas, inapetência',
          'Sinais de desidratação'
        ],
        sinaisExameFisico: [
          'Avaliar estado de hidratação (classificação OMS):',
          'SEM desidratação: alerta, olhos normais, bebe normal, prega <2s',
          'Desidratação: irritado, olhos fundos, sedento, prega 2-3s',
          'Desidratação GRAVE: letárgico, olhos muito fundos, não bebe, prega >3s',
          'Avaliar: fontanela, mucosas, débito urinário, enchimento capilar'
        ],
        formasClinicas: [
          'GEA aquosa (maioria - viral ou ETEC)',
          'Disenteria: sangue/muco nas fezes (Shigella, Salmonella, EIEC, Campylobacter)',
          'Diarreia persistente: >14 dias',
          'Diarreia crônica: >30 dias'
        ],
        citations: [{ refId: 'sbp-gea-2023' }]
      },
      diagnostico: {
        criterios: [
          'Diagnóstico clínico na maioria dos casos',
          '≥3 evacuações líquidas/24h de início agudo',
          'Avaliar grau de desidratação (fundamental)'
        ],
        diagnosticoDiferencial: [
          'Intolerância à lactose (pós-GEA)',
          'Alergia à proteína do leite de vaca',
          'Invaginação intestinal (fezes em geleia de framboesa)',
          'Apendicite aguda',
          'Infecção urinária',
          'Otite média aguda (pode causar diarreia em lactentes)',
          'Uso de medicamentos (ATB)',
          'Doença celíaca',
          'Doença inflamatória intestinal'
        ],
        examesLaboratoriais: [
          'Geralmente desnecessários em GEA não complicada',
          'Eletrólitos, gasometria: se desidratação grave',
          'Hemograma: se suspeita de sepse/infecção bacteriana',
          'Coprocultura: disenteria, diarreia >7 dias, surtos',
          'Pesquisa de rotavírus: epidemiologia'
        ],
        citations: [{ refId: 'sbp-gea-2023' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir desidratação (Plano A)',
          'Tratar desidratação (Planos B e C)',
          'Manter nutrição adequada',
          'Reduzir duração e gravidade'
        ],
        naoFarmacologico: {
          medidas: [
            'PLANO A (sem desidratação):',
            '- SRO: 50-100ml após cada evacuação (<2a) ou 100-200ml (>2a)',
            '- Manter aleitamento materno',
            '- Manter alimentação habitual',
            '- Orientar sinais de alerta',
            '',
            'PLANO B (desidratação leve-moderada):',
            '- TRO supervisionada: 50-100ml/kg de SRO em 4h',
            '- Reavaliar a cada hora',
            '- Se melhorar: Plano A; se piorar: Plano C',
            '',
            'PLANO C (desidratação grave):',
            '- Hidratação venosa: SF 0,9% 20-30ml/kg em 30min (repetir se necessário)',
            '- Manutenção: SG5% + SF0,9% 1:1 com K+',
            '- Encaminhamento urgente'
          ],
          citations: [{ refId: 'sbp-gea-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Suplementação de zinco',
              medicamentos: ['Sulfato de zinco'],
              posologia: '<6 meses: 10mg/dia; ≥6 meses: 20mg/dia por 10-14 dias',
              observacoes: 'Reduz duração, gravidade e recorrência. Recomendação OMS.'
            },
            {
              classe: 'Antiemético (se vômitos impedem TRO)',
              medicamentos: ['Ondansetrona'],
              posologia: '0,15mg/kg VO dose única (máx 8mg)',
              observacoes: 'Uso seletivo. Facilita a aceitação de TRO.'
            },
            {
              classe: 'Probióticos (opcional)',
              medicamentos: ['Saccharomyces boulardii', 'Lactobacillus rhamnosus GG'],
              posologia: 'Conforme apresentação comercial, por 5-7 dias',
              observacoes: 'Podem reduzir duração da diarreia em ~1 dia'
            }
          ],
          segundaLinha: [
            {
              classe: 'Antibiótico (somente se indicado)',
              medicamentos: ['Azitromicina', 'Ciprofloxacino', 'Ceftriaxona'],
              posologia: 'Azitromicina 10mg/kg/dia 3 dias (Shigella); Cipro 15mg/kg/dia 3 dias (>1 mês)',
              observacoes: 'Indicações: disenteria grave, cólera, Shigella confirmada, imunossuprimido, <3 meses'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Disenteria (sangue nas fezes)',
              conduta: 'Iniciar ATB: Azitromicina 10-12mg/kg/dia por 3 dias (1ª escolha para Shigella)'
            },
            {
              situacao: 'Vômitos incoercíveis',
              conduta: 'Ondansetrona VO/SL + TRO em pequenos volumes frequentes; se falha: hidratação IV'
            },
            {
              situacao: 'Intolerância à lactose transitória',
              conduta: 'Pode ocorrer após GEA viral; geralmente autolimitada em 2-4 semanas'
            }
          ],
          citations: [{ refId: 'sbp-gea-2023' }]
        },
        duracao: 'GEA viral: 3-7 dias; bacteriana: 5-10 dias. Zinco manter por 10-14 dias.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno em 24-48h se não melhorar; reavaliação imediata se piora',
        examesControle: [
          'Peso (recuperação do peso pré-doença)',
          'Estado de hidratação'
        ],
        metasTerapeuticas: [
          'Hidratação adequada',
          'Retorno ao padrão evacuatório normal',
          'Recuperação do peso',
          'Retomada da alimentação habitual'
        ],
        criteriosEncaminhamento: [
          'Desidratação grave (Plano C)',
          'Falha da TRO (vômitos persistentes)',
          'Sinais de sepse',
          '<3 meses de idade',
          'Desnutrição grave',
          'Diarreia persistente >14 dias',
          'Comorbidades descompensadas'
        ],
        citations: [{ refId: 'sbp-gea-2023' }]
      },
      prevencao: {
        primaria: [
          'Aleitamento materno exclusivo até 6 meses',
          'Vacina rotavírus (2 e 4 meses - VORH)',
          'Saneamento básico e água tratada',
          'Higiene das mãos (antes de comer, após banheiro)',
          'Higiene dos alimentos',
          'Suplementação de zinco em áreas endêmicas',
          'Vitamina A em regiões carentes'
        ],
        secundaria: [
          'Identificação precoce de desidratação',
          'TRO domiciliar imediata',
          'Orientação sobre sinais de alerta'
        ],
        citations: [{ refId: 'sbp-gea-2023' }]
      },
      populacoesEspeciais: {
        criancas: 'Lactentes <6 meses: maior risco de desidratação grave, menor tolerância a perdas. Desnutridos: maior morbimortalidade, considerar hospitalização.',
        idosos: 'N/A - condição pediátrica',
        gestantes: 'N/A - condição pediátrica'
      }
    },

    protocolos: ['gea-sbp', 'aidpi', 'who-diarreia'],
    medicamentos: ['sro', 'zinco', 'ondansetrona', 'azitromicina'],
    calculadoras: ['dose-pediatrica', 'avaliacao-desidratacao'],
    citations: [
      { refId: 'sbp-gea-2023' },
      { refId: 'who-diarreia-2005' }
    ],
    lastUpdate: '2024-01-01',
    tags: ['pediatria', 'aps', 'gea', 'diarreia', 'desidratacao', 'gastroenterite']
  },

  // ============================================================================
  // 4. ITU PEDIÁTRICA
  // ============================================================================
  {
    id: 'itu-pediatrica-aps',
    titulo: 'ITU Pediátrica',
    sinonimos: [
      'Infecção do trato urinário na criança',
      'Cistite pediátrica',
      'Pielonefrite pediátrica',
      'Infecção urinária infantil'
    ],
    doid: 'DOID:13148',
    snomedCT: '68566005',
    meshId: 'D014552',
    umlsCui: 'C0042029',
    ciap2: ['U71'],
    cid10: ['N39.0', 'N10', 'N30.0'],
    cid11: ['GC08'],
    categoria: 'pediatrico',
    subcategoria: 'urologico',

    quickView: {
      definicao: 'Infecção bacteriana do trato urinário em crianças. Apresentação inespecífica em lactentes (febre sem foco). E. coli é o agente em 80-90%. Importante identificar refluxo vesicoureteral (RVU) para prevenir cicatrizes renais. ITU febril em <2 anos deve ser considerada pielonefrite até prova em contrário.',
      criteriosDiagnosticos: [
        'LACTENTES (<2 anos): Febre sem foco identificável (sintoma mais comum)',
        'Irritabilidade, recusa alimentar, vômitos',
        'Urina com odor fétido',
        'CRIANÇAS MAIORES: Disúria, polaciúria, urgência, enurese secundária',
        'Dor suprapúbica ou lombar, febre',
        'DIAGNÓSTICO: EAS alterado + urocultura ≥50.000 UFC/ml (jato médio) ou ≥10.000 (cateterismo)'
      ],
      classificacaoRisco: [
        {
          nivel: 'baixo',
          criterios: ['>2 anos', 'Cistite', 'Sem febre alta', 'Bom estado geral'],
          conduta: 'ATB oral ambulatorial por 3-5 dias'
        },
        {
          nivel: 'moderado',
          criterios: ['<2 anos', 'Febre >38°C', 'Primeira ITU febril'],
          conduta: 'ATB oral por 7-14 dias + USG renal + seguimento'
        },
        {
          nivel: 'alto',
          criterios: ['<3 meses', 'Toxemia/sepse', 'Vômitos', 'Desidratação', 'Malformação conhecida'],
          conduta: 'Hospitalização + ATB IV'
        }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação adequada',
          'Micções frequentes (não segurar urina)',
          'Higiene perineal adequada',
          'Tratar constipação se presente'
        ],
        farmacologico: [
          'CISTITE (>2 anos): Cefalexina 50mg/kg/dia ÷4 por 3-5 dias OU Nitrofurantoína 5-7mg/kg/dia ÷4 por 7 dias OU SMX-TMP 6-12mg/kg/dia (TMP) ÷2 por 3-5 dias',
          'PIELONEFRITE/ITU febril: Ceftriaxona 50-75mg/kg/dia IV/IM inicialmente, depois VO por 7-14 dias total',
          'Alternativa oral: Cefuroxima 30mg/kg/dia ÷2 ou Amoxicilina-clavulanato'
        ]
      },
      metasTerapeuticas: [
        'Erradicação da infecção',
        'Prevenção de cicatrizes renais',
        'Identificação de malformações',
        'Prevenção de recorrência'
      ],
      examesIniciais: [
        'EAS (piúria, bacteriúria, nitrito, esterase)',
        'Urocultura + antibiograma (sempre antes do ATB)',
        'USG renal e vias urinárias (após 1ª ITU febril)',
        'Hemograma, PCR, creatinina se pielonefrite'
      ],
      redFlags: [
        'Idade <3 meses (risco de sepse)',
        'Toxemia, má perfusão',
        'Vômitos (impossibilita ATB oral)',
        'Desidratação',
        'Não resposta ao ATB em 48-72h',
        'ITU de repetição (≥2 pielonefrites ou ≥3 cistites/ano)',
        'Malformação do trato urinário conhecida',
        'Massa abdominal palpável'
      ]
    },

    fullContent: {
      epidemiologia: {
        prevalencia: '2-8% das crianças terão ITU até os 8 anos',
        incidencia: 'Meninos: 1% (predomínio no 1º ano); Meninas: 3-5%',
        faixaEtaria: '<1 ano: predomínio masculino; >1 ano: 10x mais comum em meninas',
        fatoresRisco: [
          'Sexo feminino (após 1º ano)',
          'Não circuncisão em meninos <1 ano',
          'Refluxo vesicoureteral (30-40% das crianças com ITU)',
          'Disfunção miccional',
          'Constipação intestinal',
          'Malformações do trato urinário',
          'Bexiga neurogênica',
          'Cateterismo vesical',
          'Atividade sexual (adolescentes)',
          'Higiene inadequada'
        ],
        citations: [{ refId: 'sbp-itu-2023' }]
      },
      fisiopatologia: {
        texto: 'Via ascendente é a mais comum: bactérias da flora fecal colonizam o períneo e ascendem pela uretra. E. coli uropatogênica possui fatores de virulência (fímbrias P, adesinas) que permitem adesão ao urotélio. Refluxo vesicoureteral facilita ascensão ao rim, causando pielonefrite e potencialmente cicatrizes renais. Disfunção miccional e constipação são fatores predisponentes importantes.',
        citations: [{ refId: 'sbp-itu-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'LACTENTES (<2 anos):',
          '- Febre sem foco (sintoma mais comum e às vezes único)',
          '- Irritabilidade, letargia',
          '- Recusa alimentar, vômitos',
          '- Icterícia (neonatos)',
          '- Urina com odor fétido',
          '- Déficit de ganho ponderal',
          '',
          'CRIANÇAS MAIORES (>2 anos):',
          '- Disúria (ardência ao urinar)',
          '- Polaciúria (frequência aumentada)',
          '- Urgência miccional',
          '- Enurese secundária (volta a fazer xixi)',
          '- Dor suprapúbica (cistite)',
          '- Febre, dor lombar (pielonefrite)'
        ],
        sinaisExameFisico: [
          'Febre (pielonefrite)',
          'Dor à palpação suprapúbica ou lombar',
          'Punho-percussão positiva (Giordano)',
          'Avaliar genitália externa (sinéquias, fimose)',
          'Avaliar coluna (estigmas de disrafismo)'
        ],
        formasClinicas: [
          'Cistite: infecção baixa, afebril, sintomas urinários',
          'Pielonefrite aguda: ITU febril, dor lombar, comprometimento sistêmico',
          'Bacteriúria assintomática: não tratar (exceto pré-cirurgia)',
          'ITU recorrente: ≥2 pielonefrites ou ≥3 cistites em 1 ano'
        ],
        citations: [{ refId: 'sbp-itu-2023' }]
      },
      diagnostico: {
        criterios: [
          'Clínica sugestiva + exames confirmatórios',
          'EAS: piúria (>5 leucócitos/campo ou >10/mm³), bacteriúria, nitrito +, esterase +',
          'UROCULTURA (padrão-ouro): ≥100.000 UFC/ml (jato médio), ≥50.000 (cateter), qualquer contagem (punção suprapúbica)',
          'Coleta adequada é fundamental: jato médio em continentes, cateterismo em lactentes'
        ],
        diagnosticoDiferencial: [
          'Vulvovaginite (meninas) - causa piúria sem bacteriúria',
          'Balanopostite (meninos)',
          'Febre sem foco de outra etiologia',
          'Apendicite (pode haver piúria estéril)',
          'Nefrolitíase',
          'Bexiga hiperativa/disfunção miccional',
          'Glomerulonefrite (hematúria, proteinúria)'
        ],
        examesLaboratoriais: [
          'EAS (urina tipo I)',
          'Urocultura + antibiograma (sempre antes do ATB)',
          'Hemograma, PCR se pielonefrite',
          'Função renal (ureia, creatinina) se pielonefrite ou ITU complicada'
        ],
        examesImagem: [
          'USG renal e vias urinárias: 1ª ITU febril (<2 anos) ou ITU recorrente',
          'Uretrocistografia miccional (UCM): após ITU febril <2 anos, ITU recorrente ou USG alterado - detecta RVU',
          'Cintilografia renal (DMSA): 4-6 meses após pielonefrite para avaliar cicatrizes'
        ],
        citations: [{ refId: 'sbp-itu-2023' }]
      },
      tratamento: {
        objetivos: [
          'Erradicar infecção',
          'Prevenir urosepse',
          'Prevenir cicatrizes renais',
          'Identificar e tratar fatores predisponentes'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratação adequada',
            'Estimular micções frequentes (a cada 2-3h)',
            'Higiene perineal adequada (limpar frente para trás)',
            'Tratar constipação intestinal',
            'Tratar disfunção miccional se presente',
            'Circuncisão em meninos com ITU recorrente e fimose'
          ],
          citations: [{ refId: 'sbp-itu-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'CISTITE (>2 anos, afebril)',
              medicamentos: ['Cefalexina', 'Nitrofurantoína', 'Sulfametoxazol-Trimetoprima'],
              posologia: 'Cefalexina 50-100mg/kg/dia ÷4 por 3-5 dias; Nitrofurantoína 5-7mg/kg/dia ÷4 por 5-7 dias; SMX-TMP 6-12mg/kg/dia (TMP) ÷2 por 3-5 dias',
              observacoes: 'Tratamento curto para cistite não complicada'
            },
            {
              classe: 'PIELONEFRITE/ITU febril (ambulatorial)',
              medicamentos: ['Cefuroxima', 'Amoxicilina-clavulanato', 'Ciprofloxacino'],
              posologia: 'Cefuroxima 30mg/kg/dia ÷2 por 10-14 dias; Amoxi-clav 50mg/kg/dia ÷3 por 10-14 dias',
              observacoes: 'Preferir cefalosporina de 2ª/3ª geração. Quinolona reservada para >1 ano se resistência.'
            }
          ],
          segundaLinha: [
            {
              classe: 'ITU febril grave ou <3 meses (hospitalar)',
              medicamentos: ['Ceftriaxona', 'Gentamicina + Ampicilina'],
              posologia: 'Ceftriaxona 50-75mg/kg/dia IV 1x/dia; Gentamicina 5-7mg/kg/dia + Ampicilina (neonatos)',
              observacoes: 'Iniciar IV, completar VO após melhora (48-72h afebril)'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Lactente <3 meses com ITU febril',
              conduta: 'Hospitalização, ATB IV, investigar sepse'
            },
            {
              situacao: 'ITU recorrente (≥3 cistites ou ≥2 pielonefrites/ano)',
              conduta: 'Profilaxia ATB contínua + investigação completa (UCM, DMSA) + encaminhar nefroped/uroped'
            },
            {
              situacao: 'Refluxo vesicoureteral grau III-V',
              conduta: 'Profilaxia ATB (Nitrofurantoína 1-2mg/kg/noite ou SMX-TMP) + avaliação urológica'
            }
          ],
          citations: [{ refId: 'sbp-itu-2023' }]
        },
        duracao: 'Cistite: 3-5 dias; Pielonefrite: 10-14 dias; Profilaxia: até resolução do RVU ou por decisão especializada'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno em 48-72h para avaliar resposta; seguimento regular após 1ª ITU',
        examesControle: [
          'Urocultura de controle: 48-72h se não houver melhora clínica',
          'USG renal: após 1ª ITU febril em <2 anos',
          'UCM: 4-6 semanas após ITU febril em <2 anos ou ITU recorrente',
          'DMSA: 4-6 meses após pielonefrite para avaliar cicatrizes'
        ],
        metasTerapeuticas: [
          'Melhora clínica em 48-72h',
          'Urocultura de controle negativa (se indicada)',
          'Ausência de recorrência',
          'Preservação da função renal'
        ],
        criteriosEncaminhamento: [
          'Nefrologia/Urologia pediátrica: RVU grau III-V, ITU recorrente, cicatrizes renais',
          'Hospitalização: <3 meses, toxemia, vômitos, desidratação, não resposta ao ATB oral',
          'USG alterado (hidronefrose, duplicidade, massas)'
        ],
        citations: [{ refId: 'sbp-itu-2023' }]
      },
      prevencao: {
        primaria: [
          'Aleitamento materno (efeito protetor)',
          'Hidratação adequada',
          'Micções regulares (não segurar urina)',
          'Higiene perineal adequada',
          'Tratar constipação',
          'Circuncisão (reduz ITU em meninos <1 ano com fator de risco)'
        ],
        secundaria: [
          'Profilaxia ATB em casos selecionados (RVU grau III-V)',
          'Investigação de malformações após 1ª ITU febril',
          'Tratamento de disfunção miccional'
        ],
        citations: [{ refId: 'sbp-itu-2023' }]
      },
      populacoesEspeciais: {
        criancas: 'Neonatos: apresentação inespecífica (icterícia, sepse), sempre hospitalizar. Lactentes <3m: risco de sepse, ATB IV. Meninos não circuncidados <1 ano: maior risco.'
      }
    },

    protocolos: ['itu-sbp', 'nice-itu-pediatrica'],
    medicamentos: ['cefalexina', 'nitrofurantoina', 'ceftriaxona', 'cefuroxima', 'amoxicilina-clavulanato'],
    calculadoras: ['dose-pediatrica'],
    citations: [
      { refId: 'sbp-itu-2023' },
      { refId: 'aap-itu-2011' }
    ],
    lastUpdate: '2024-01-01',
    tags: ['pediatria', 'aps', 'itu', 'infeccao-urinaria', 'pielonefrite', 'cistite']
  },

  // ============================================================================
  // 5. ASMA INFANTIL
  // ============================================================================
  {
    id: 'asma-infantil-aps',
    titulo: 'Asma Infantil',
    sinonimos: [
      'Asma na infância',
      'Asma brônquica pediátrica',
      'Bronquite asmática',
      'Hiperreatividade brônquica'
    ],
    doid: 'DOID:2841',
    snomedCT: '195967001',
    meshId: 'D001249',
    umlsCui: 'C0004096',
    ciap2: ['R96'],
    cid10: ['J45', 'J45.0', 'J45.1', 'J45.9'],
    cid11: ['CA23'],
    categoria: 'pediatrico',
    subcategoria: 'respiratorio',

    quickView: {
      definicao: 'Doença inflamatória crônica das vias aéreas caracterizada por hiperresponsividade brônquica e obstrução variável ao fluxo aéreo, manifestando-se por episódios recorrentes de sibilância, dispneia, opressão torácica e tosse. Principal doença crônica da infância. Em <5 anos: diagnóstico presuntivo baseado em fenótipos de sibilância.',
      criteriosDiagnosticos: [
        'CRIANÇAS ≥6 ANOS: Sintomas recorrentes + Espirometria com obstrução reversível',
        'VEF1/CVF <0,90 (crianças) + Resposta ao BD (aumento VEF1 ≥12%)',
        'CRIANÇAS <6 ANOS: Diagnóstico clínico/presuntivo',
        'Sibilância recorrente (≥3 episódios) + resposta a broncodilatador',
        'Tosse noturna/matinal, sibilos aos esforços',
        'Melhora com tratamento de controle',
        'História pessoal/familiar de atopia (rinite, dermatite, alergia alimentar)'
      ],
      classificacaoRisco: [
        {
          nivel: 'baixo',
          criterios: ['Sintomas <2x/semana', 'Despertar noturno <2x/mês', 'Sem limitação de atividades', 'Função pulmonar normal'],
          conduta: 'Etapa 1: SABA SOS ou CI dose baixa SOS'
        },
        {
          nivel: 'moderado',
          criterios: ['Sintomas ≥2x/semana', 'Despertar noturno ≥1x/semana', 'Limitação parcial', 'VEF1 60-80%'],
          conduta: 'Etapa 2-3: CI dose baixa-média + SABA ou LABA'
        },
        {
          nivel: 'alto',
          criterios: ['Sintomas diários', 'Despertar frequente', 'Limitação importante', 'VEF1 <60%', 'Exacerbações graves'],
          conduta: 'Etapa 4-5: CI dose alta + LABA + considerar especialista'
        }
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Controle ambiental: afastar alérgenos (ácaros, mofo, pelos)',
          'Evitar tabagismo passivo',
          'Encapar colchão e travesseiro',
          'Evitar produtos de limpeza irritantes',
          'Atividade física regular (com controle adequado)',
          'Vacinação em dia (influenza anual)'
        ],
        farmacologico: [
          'RESGATE: SABA (Salbutamol) 100-200mcg SOS',
          'CONTROLE (≥6 anos): CI dose baixa (Beclometasona 100-200mcg/dia ou Budesonida 200-400mcg/dia)',
          'CONTROLE (<6 anos): CI nebulização (Budesonida 0,5mg 2x/dia) ou spray com espaçador',
          'Asma parcialmente controlada/não controlada: associar LABA (Formoterol) ou aumentar CI'
        ]
      },
      metasTerapeuticas: [
        'Controle dos sintomas (sem sintomas diurnos, sem despertar noturno)',
        'Manutenção de atividade física normal',
        'Função pulmonar normal ou próxima',
        'Prevenção de exacerbações',
        'Minimizar efeitos adversos do tratamento'
      ],
      examesIniciais: [
        'Espirometria com prova broncodilatadora (≥6 anos)',
        'Pico de fluxo expiratório (PFE) seriado',
        'Radiografia de tórax (1º episódio, excluir outras causas)',
        'Testes alérgicos (prick test ou IgE específica) se suspeita de alergia'
      ],
      redFlags: [
        'Exacerbação grave (fala entrecortada, cianose, SatO2 <92%)',
        'Uso de musculatura acessória importante',
        'Alteração do nível de consciência',
        'Silêncio respiratório (tórax silencioso)',
        'PFE <50% do previsto',
        'Não melhora com SABA',
        'Histórico de internação em UTI/IOT',
        'Asma + anafilaxia',
        'Má adesão ao tratamento crônico'
      ]
    },

    fullContent: {
      epidemiologia: {
        prevalencia: '~20% das crianças brasileiras têm sintomas de asma',
        incidencia: 'Doença crônica mais comum na infância',
        faixaEtaria: 'Início frequente <5 anos; 80% iniciam antes dos 6 anos',
        fatoresRisco: [
          'História familiar de asma ou atopia',
          'Dermatite atópica, rinite alérgica',
          'Sensibilização a aeroalérgenos',
          'Tabagismo materno na gestação',
          'Tabagismo passivo',
          'Infecções respiratórias virais na infância (VSR)',
          'Prematuridade e baixo peso ao nascer',
          'Obesidade',
          'Poluição do ar'
        ],
        citations: [{ refId: 'gina-2023' }]
      },
      fisiopatologia: {
        texto: 'Doença inflamatória crônica com participação de mastócitos, eosinófilos, linfócitos T, células epiteliais e citocinas (IL-4, IL-5, IL-13). A inflamação crônica leva a hiperresponsividade brônquica, edema de mucosa, hipersecreção de muco e broncoconstrição. Remodelamento das vias aéreas pode ocorrer com doença de longa duração. Fenótipos em <5 anos: sibilância transitória, sibilância persistente (alérgica) e sibilância de início tardio.',
        citations: [{ refId: 'gina-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sibilância (chiado no peito) recorrente',
          'Tosse, especialmente noturna ou ao acordar',
          'Dispneia/falta de ar',
          'Opressão torácica',
          'Sintomas desencadeados por: exercício, infecções virais, alérgenos, clima frio, riso',
          'Variabilidade e reversibilidade dos sintomas',
          'Melhora espontânea ou com broncodilatador'
        ],
        sinaisExameFisico: [
          'Intercrises: exame frequentemente normal',
          'Sibilos expiratórios difusos',
          'Fase expiratória prolongada',
          'Uso de musculatura acessória (tiragem)',
          'Tórax hiperinsuflado (casos graves)',
          'Avaliar sinais de atopia: rinite, dermatite'
        ],
        formasClinicas: [
          'FENÓTIPOS <5 ANOS:',
          '- Sibilância episódica viral (mais comum)',
          '- Sibilância por múltiplos gatilhos (provável asma)',
          '',
          'CLASSIFICAÇÃO POR CONTROLE (≥6 anos):',
          '- Asma controlada',
          '- Asma parcialmente controlada',
          '- Asma não controlada'
        ],
        citations: [{ refId: 'gina-2023' }]
      },
      diagnostico: {
        criterios: [
          '≥6 ANOS:',
          '- História de sintomas respiratórios variáveis',
          '- Limitação variável ao fluxo expiratório (espirometria)',
          '- VEF1/CVF <0,90 + resposta ao BD (VEF1 aumenta ≥12%)',
          '',
          '<6 ANOS (diagnóstico presuntivo):',
          '- ≥3 episódios de sibilância',
          '- Sintomas entre crises ou gatilhos múltiplos',
          '- Resposta a tratamento de controle',
          '- História familiar de atopia'
        ],
        diagnosticoDiferencial: [
          'Bronquiolite (lactentes)',
          'Aspiração de corpo estranho',
          'Fibrose cística',
          'Displasia broncopulmonar',
          'Malformações das vias aéreas',
          'Anel vascular',
          'Laringomalácia/traqueomalácia',
          'Tuberculose',
          'Imunodeficiências'
        ],
        examesLaboratoriais: [
          'Espirometria com BD (≥6 anos) - obrigatório para diagnóstico',
          'Pico de fluxo expiratório (PFE) - variabilidade >13%',
          'Hemograma (eosinofilia sugere atopia)',
          'IgE total e específica, prick test',
          'Radiografia de tórax (excluir outras causas)'
        ],
        outrosExames: [
          'Teste de broncoprovocação (casos duvidosos)',
          'TC de tórax (suspeita de malformação)',
          'Broncoscopia (corpo estranho, malformação)',
          'Teste do suor (excluir fibrose cística)'
        ],
        citations: [{ refId: 'gina-2023' }]
      },
      tratamento: {
        objetivos: [
          'Controle dos sintomas',
          'Prevenção de exacerbações',
          'Manutenção da função pulmonar normal',
          'Permitir atividade física normal',
          'Minimizar efeitos adversos'
        ],
        naoFarmacologico: {
          medidas: [
            'Controle ambiental: encapar colchão/travesseiro, lavar roupas de cama semanalmente',
            'Remover carpetes, cortinas, bichos de pelúcia do quarto',
            'Evitar tabagismo ativo e passivo',
            'Evitar alérgenos identificados',
            'Atividade física regular (esporte com asma controlada)',
            'Vacinação: influenza anual, pneumococo',
            'Educação: técnica inalatória, plano de ação'
          ],
          citations: [{ refId: 'gina-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'RESGATE (todas as etapas)',
              medicamentos: ['Salbutamol', 'Fenoterol'],
              posologia: 'Salbutamol spray 100mcg: 2-4 jatos SOS; Nebulização: 0,15mg/kg (mín 2,5mg) em 3ml SF',
              observacoes: 'SABA de resgate. Se uso frequente (>2x/semana), reavaliar controle.'
            },
            {
              classe: 'CONTROLE - Etapa 1 (intermitente)',
              medicamentos: ['SABA SOS ou CI dose baixa SOS'],
              posologia: 'GINA 2023: preferir CI+formoterol SOS em ≥12 anos',
              observacoes: 'Sintomas <2x/mês, sem fatores de risco para exacerbação'
            },
            {
              classe: 'CONTROLE - Etapa 2 (leve persistente)',
              medicamentos: ['Beclometasona', 'Budesonida', 'Fluticasona'],
              posologia: 'Beclometasona 100-200mcg/dia; Budesonida 200-400mcg/dia; Fluticasona 100-200mcg/dia',
              observacoes: 'CI dose baixa diário é primeira linha. Usar com espaçador.'
            }
          ],
          segundaLinha: [
            {
              classe: 'CONTROLE - Etapa 3 (moderada)',
              medicamentos: ['CI dose média', 'CI + LABA'],
              posologia: 'Budesonida 400-800mcg ou Budesonida/Formoterol 200/6mcg 2x/dia',
              observacoes: 'Dobrar CI ou associar LABA. LABA apenas >4 anos.'
            },
            {
              classe: 'CONTROLE - Etapa 4-5 (grave)',
              medicamentos: ['CI dose alta + LABA', 'Tiotrópio', 'Omalizumabe'],
              posologia: 'Fluticasona/Salmeterol 250/25mcg ou superior',
              observacoes: 'Encaminhar ao especialista. Considerar imunobiológicos.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: '<6 anos',
              conduta: 'CI por nebulização ou spray com espaçador e máscara. Não usar LABA isolado.'
            },
            {
              situacao: 'Crise/Exacerbação leve-moderada',
              conduta: 'SABA 4-10 jatos com espaçador, repetir a cada 20min na 1ª hora. Corticoide oral: Prednisolona 1-2mg/kg/dia (máx 40mg) por 3-5 dias.'
            },
            {
              situacao: 'Asma induzida por exercício',
              conduta: 'SABA 15min antes ou CI+LABA de manutenção. Aquecimento adequado.'
            }
          ],
          citations: [{ refId: 'gina-2023' }]
        },
        duracao: 'Tratamento contínuo; reavaliar controle a cada 3-6 meses; step-down após 3 meses de controle'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses até controle; depois a cada 3-6 meses',
        examesControle: [
          'Espirometria a cada 6-12 meses (≥6 anos)',
          'Avaliação do controle (questionários ACT/ACQ)',
          'Revisão da técnica inalatória a cada consulta',
          'Monitorização do crescimento (uso de CI)'
        ],
        metasTerapeuticas: [
          'Controle total dos sintomas',
          'Sem uso de SABA de resgate (exceto exercício)',
          'Função pulmonar normal',
          'Sem exacerbações',
          'Crescimento e desenvolvimento normais'
        ],
        criteriosEncaminhamento: [
          'Asma de difícil controle (etapa 4-5 sem resposta)',
          'Dúvida diagnóstica',
          'Crise grave ou near-fatal',
          'Comorbidades complexas',
          'Indicação de imunoterapia ou imunobiológicos',
          'Efeitos adversos do tratamento'
        ],
        citations: [{ refId: 'gina-2023' }]
      },
      prevencao: {
        primaria: [
          'Evitar tabagismo na gestação',
          'Aleitamento materno',
          'Evitar exposição precoce a alérgenos em crianças de risco',
          'Evitar poluição do ar'
        ],
        secundaria: [
          'Controle ambiental',
          'Imunoterapia alérgeno-específica (casos selecionados)',
          'Tratamento adequado da rinite alérgica',
          'Vacinação'
        ],
        citations: [{ refId: 'gina-2023' }]
      },
      populacoesEspeciais: {
        criancas: '<5 anos: diagnóstico desafiador, baseado em fenótipos de sibilância. Índice Preditivo de Asma (API) ajuda a identificar crianças que manterão asma. Usar espaçador com máscara facial em <4 anos.',
        gestantes: 'N/A - condição pediátrica (gestantes com asma: manter tratamento, CI são seguros)'
      }
    },

    protocolos: ['gina', 'sbpt-asma', 'asma-sus'],
    medicamentos: ['salbutamol', 'beclometasona', 'budesonida', 'fluticasona', 'formoterol', 'prednisolona'],
    calculadoras: ['dose-pediatrica', 'controle-asma-act'],
    citations: [
      { refId: 'gina-2023' },
      { refId: 'sbpt-asma-2023' }
    ],
    lastUpdate: '2024-01-01',
    tags: ['pediatria', 'aps', 'asma', 'sibilancia', 'broncoespasmo', 'respiratorio', 'cronico']
  }
];

export default doencasPediatriaAPS;
