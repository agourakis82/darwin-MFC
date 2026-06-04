/**
 * DOENCAS PEDIATRICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * =======================================================
 * Condicoes neonatais, do desenvolvimento e geneticas
 */

import { Doenca } from '@/lib/types/doenca';

export const pediatricasAvancadas: Doenca[] = [
  // ============================================================================
  // CONDICOES NEONATAIS
  // ============================================================================
  {
    id: 'sindrome-desconforto-respiratorio-neonatal',
    titulo: 'Síndrome do Desconforto Respiratório do RN',
    sinonimos: ['SDR', 'Doença da Membrana Hialina', 'DMH', 'RDS'],
    doid: 'DOID:12716',
    snomedCT: '46177005',
    meshId: 'D012127',
    umlsCui: 'C0035220',
    ciap2: ['R99'],
    cid10: ['P22.0'],
    cid11: ['KB23.0'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Principal causa de desconforto respiratório em prematuros. Causada por deficiência de surfactante pulmonar. Risco inversamente proporcional à idade gestacional.',
      criteriosDiagnosticos: [
        'Prematuridade (<37 semanas, maior risco <32 semanas)',
        'Desconforto respiratório nas primeiras horas de vida',
        'Taquipneia, retrações, gemido, cianose',
        'Radiografia: infiltrado reticulogranular difuso + broncograma aéreo',
        'Necessidade de oxigênio suplementar'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte ventilatório (CPAP nasal, VPM)', 'Termorregulação', 'Mínimo manuseio'],
        farmacologico: ['Surfactante exógeno (Poractant alfa, Beractant) via TOT', 'Corticoide pré-natal (Betametasona 12mg IM 2 doses) para mãe em risco de prematuro', 'Cafeína para apneia da prematuridade']
      },
      metasTerapeuticas: ['SatO2 90-95%', 'Desmame ventilatório', 'Prevenção de displasia broncopulmonar'],
      examesIniciais: ['Radiografia de tórax', 'Gasometria arterial', 'Hemograma', 'PCR'],
      redFlags: ['Hipoxemia refratária', 'Necessidade de FiO2 >60%', 'Pneumotórax', 'Hemorragia pulmonar']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '60-80% dos RN <28 semanas; 15-30% dos RN 32-36 semanas',
        mortalidade: 'Reduzida significativamente com surfactante (antes 50%, agora <10%)',
        faixaEtaria: 'Neonatos prematuros',
        fatoresRisco: ['Prematuridade', 'Sexo masculino', 'Diabetes materno', 'Cesariana eletiva', 'Asfixia perinatal'],
        citations: [{ refId: 'sweet-2019-rds' }]
      },
      fisiopatologia: {
        texto: 'Deficiência de surfactante (produzido a partir de 24 semanas, níveis adequados após 35 semanas) causa colapso alveolar, atelectasia e formação de membranas hialinas.',
        citations: [{ refId: 'sweet-2019-rds' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Taquipneia', 'Batimento de asa nasal', 'Gemido expiratório', 'Retrações', 'Cianose'],
        sinaisExameFisico: ['Sinais de desconforto respiratório', 'Murmúrio vesicular diminuído'],
        formasClinicas: ['Leve (CPAP)', 'Moderada (VNI)', 'Grave (VMI + surfactante)'],
        citations: [{ refId: 'sweet-2019-rds' }]
      },
      diagnostico: {
        criterios: ['Clínica de desconforto respiratório em prematuro', 'Radiografia com padrão reticulogranular + broncograma aéreo', 'Necessidade de oxigênio suplementar'],
        diagnosticoDiferencial: ['Taquipneia transitória do RN', 'Pneumonia neonatal', 'Síndrome de aspiração meconial', 'Cardiopatia congênita'],
        examesImagem: ['Radiografia de tórax AP'],
        examesLaboratoriais: ['Gasometria arterial', 'Hemograma', 'PCR'],
        citations: [{ refId: 'sweet-2019-rds' }]
      },
      tratamento: {
        objetivos: ['Oxigenação adequada', 'Prevenção de lesão pulmonar', 'Prevenção de displasia broncopulmonar'],
        naoFarmacologico: {
          medidas: ['CPAP nasal precoce', 'Ventilação protetora com baixos volumes', 'Termorregulação', 'Mínimo manuseio'],
          citations: [{ refId: 'sweet-2019-rds' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Surfactante exógeno', medicamentos: ['Poractant alfa', 'Beractant'], posologia: 'Poractant 200mg/kg dose inicial via TOT', observacoes: 'Administrar precoce se sinais de SDR' },
            { classe: 'Corticoide antenatal', medicamentos: ['Betametasona', 'Dexametasona'], posologia: 'Betametasona 12mg IM 2 doses 24h intervalo (mãe)', observacoes: 'Gestantes 24-34 semanas em risco de parto prematuro' }
          ],
          segundaLinha: [
            { classe: 'Metilxantina', medicamentos: ['Cafeína'], posologia: 'Ataque 20mg/kg IV, manutenção 5-10mg/kg/dia', observacoes: 'Para apneia da prematuridade' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hipoxemia refratária', conduta: 'Óxido nítrico inalatório' },
            { situacao: 'Falência respiratória', conduta: 'ECMO em centros de referência' }
          ],
          citations: [{ refId: 'sweet-2019-rds' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Monitorização contínua em UTI neonatal',
        examesControle: ['Gasometria seriada', 'Radiografia conforme evolução', 'Ecocardiograma (avaliar PCA)'],
        metasTerapeuticas: ['SatO2 90-95%', 'PCO2 45-55mmHg (hipercapnia permissiva)', 'FiO2 mínima necessária'],
        criteriosEncaminhamento: ['UTI neonatal nível III para prematuros extremos', 'Centro de referência se necessidade de ECMO'],
        citations: [{ refId: 'sweet-2019-rds' }]
      },
      prevencao: {
        primaria: ['Corticoide antenatal em gestantes 24-34 semanas em risco de parto prematuro', 'Prevenção de prematuridade'],
        secundaria: ['CPAP precoce na sala de parto', 'Surfactante profilático em extremos prematuros'],
        citations: [{ refId: 'sweet-2019-rds' }]
      }
    },
    protocolos: ['protocolo-sdr-neonatal'],
    medicamentos: ['surfactante', 'betametasona', 'cafeina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'sweet-2019-rds' }],
    lastUpdate: '2026-01',
    tags: ['neonatal', 'prematuro', 'respiratorio', 'uti-neonatal']
  },
  {
    id: 'sindrome-down',
    titulo: 'Síndrome de Down',
    sinonimos: ['Trissomia do 21', 'Down Syndrome', 'Trisomy 21'],
    doid: 'DOID:14250',
    snomedCT: '41040004',
    meshId: 'D004314',
    umlsCui: 'C0013080',
    ordoId: 'ORPHA:870',
    ciap2: ['A90'],
    cid10: ['Q90'],
    cid11: ['LD40.0'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Síndrome genética causada por trissomia do cromossomo 21 (95% trissomia livre, 4% translocação, 1% mosaico). Principal causa genética de deficiência intelectual.',
      criteriosDiagnosticos: [
        'Fenótipo característico: fendas palpebrais oblíquas, epicanto, face achatada',
        'Hipotonia neonatal',
        'Prega palmar única',
        'Cariótipo 47,XX+21 ou 47,XY+21'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Estimulação precoce', 'Fonoaudiologia', 'Fisioterapia', 'Acompanhamento multidisciplinar'],
        farmacologico: ['Levotiroxina (se hipotireoidismo)', 'Tratamento de cardiopatias congênitas', 'Tratamento de comorbidades específicas']
      },
      metasTerapeuticas: ['Desenvolvimento máximo do potencial', 'Rastreamento e tratamento de comorbidades', 'Inclusão social'],
      examesIniciais: ['Cariótipo', 'Ecocardiograma', 'TSH e T4L', 'Hemograma', 'Avaliação auditiva e visual'],
      redFlags: ['Cardiopatia sintomática', 'Leucemia', 'Instabilidade atlantoaxial sintomática', 'Apneia do sono grave']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1/700 nascidos vivos',
        faixaEtaria: 'Diagnóstico pré-natal ou ao nascimento',
        fatoresRisco: ['Idade materna avançada (>35 anos)', 'Translocação robertsoniana em progenitores'],
        citations: [{ refId: 'bull-2022-down' }]
      },
      fisiopatologia: {
        texto: 'Trissomia do cromossomo 21 causa superexpressão de genes neste cromossomo, levando às características fenotípicas e comorbidades associadas.',
        citations: [{ refId: 'bull-2022-down' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Hipotonia', 'Deficiência intelectual variável', 'Atraso do desenvolvimento'],
        sinaisExameFisico: ['Braquicefalia', 'Fendas palpebrais oblíquas', 'Epicanto', 'Língua protusa', 'Prega palmar única', 'Clinodactilia do 5º dedo'],
        formasClinicas: ['Trissomia livre (95%)', 'Translocação (4%)', 'Mosaico (1%)'],
        citations: [{ refId: 'bull-2022-down' }]
      },
      diagnostico: {
        criterios: ['Fenótipo clínico sugestivo', 'Cariótipo com trissomia do 21 (47,XX+21 ou 47,XY+21)', 'FISH ou array-CGH confirmatório'],
        diagnosticoDiferencial: ['Outras síndromes com hipotonia neonatal', 'Zellweger', 'Prader-Willi'],
        examesLaboratoriais: ['Cariótipo', 'FISH 21', 'Array-CGH'],
        citations: [{ refId: 'bull-2022-down' }]
      },
      tratamento: {
        objetivos: ['Rastreamento sistemático de comorbidades', 'Estimulação do desenvolvimento', 'Inclusão social'],
        naoFarmacologico: {
          medidas: ['Estimulação precoce desde o nascimento', 'Fonoaudiologia', 'Fisioterapia', 'Terapia ocupacional', 'Inclusão escolar'],
          citations: [{ refId: 'bull-2022-down' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Hormônio tireoidiano', medicamentos: ['Levotiroxina'], posologia: 'Conforme TSH (hipotireoidismo congênito ou adquirido)', observacoes: 'Rastreamento anual de função tireoidiana' }
          ],
          situacoesEspeciais: [
            { situacao: 'Cardiopatia congênita', conduta: 'Correção cirúrgica conforme indicação; profilaxia de endocardite' },
            { situacao: 'Leucemia (LLA/LMA)', conduta: 'Protocolo oncológico específico' },
            { situacao: 'Instabilidade atlantoaxial', conduta: 'Evitar atividades de alto impacto; cirurgia se sintomática' }
          ],
          citations: [{ refId: 'bull-2022-down' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Pediatra regular + especialistas conforme comorbidades',
        examesControle: ['TSH anual', 'Hemograma anual', 'Ecocardiograma neonatal', 'Avaliação auditiva a cada 6 meses até 3 anos', 'Avaliação oftalmológica anual'],
        metasTerapeuticas: ['Desenvolvimento neuropsicomotor adequado ao potencial', 'Controle de comorbidades', 'Qualidade de vida'],
        criteriosEncaminhamento: ['Cardiologia: ao nascimento e se sintomas', 'Endocrinologia: se hipotireoidismo', 'Hematologia: se alterações no hemograma', 'Ortopedia: se instabilidade atlantoaxial'],
        citations: [{ refId: 'bull-2022-down' }]
      },
      prevencao: {
        primaria: ['Aconselhamento genético para famílias com translocação', 'Planejamento familiar'],
        secundaria: ['Rastreamento pré-natal (NIPT, translucência nucal, bioquímica sérica)', 'Diagnóstico pré-natal invasivo (amniocentese, biópsia de vilo)'],
        citations: [{ refId: 'bull-2022-down' }]
      },
      populacoesEspeciais: {
        gestantes: 'Fertilidade feminina presente; homens geralmente inférteis',
        idosos: 'Risco aumentado de Alzheimer precoce (>40 anos); envelhecimento acelerado'
      }
    },
    protocolos: ['protocolo-sindrome-down'],
    medicamentos: ['levotiroxina'],
    calculadoras: [],
    rastreamentos: ['rastreamento-prenatal'],
    citations: [{ refId: 'bull-2022-down' }],
    lastUpdate: '2026-01',
    tags: ['genetico', 'cromossomico', 'deficiencia-intelectual', 'cardiopatia']
  },
  {
    id: 'distrofia-muscular-duchenne',
    titulo: 'Distrofia Muscular de Duchenne',
    sinonimos: ['DMD', 'Duchenne Muscular Dystrophy'],
    doid: 'DOID:11723',
    snomedCT: '76670001',
    meshId: 'D020388',
    umlsCui: 'C0013264',
    ordoId: 'ORPHA:98896',
    ciap2: ['N89'],
    cid10: ['G71.0'],
    cid11: ['8C70.0'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Distrofia muscular progressiva X-linked causada por mutações no gene DMD que levam a ausência de distrofina. Afeta meninos, com fraqueza muscular progressiva iniciando entre 2-5 anos.',
      criteriosDiagnosticos: [
        'Fraqueza muscular proximal progressiva em menino',
        'Sinal de Gowers positivo (levantar do chão escalando as próprias pernas)',
        'Pseudo-hipertrofia de panturrilhas',
        'CK muito elevada (10-100x normal)',
        'Teste genético: mutação DMD ou biópsia com ausência de distrofina'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia (prevenção de contraturas)', 'Terapia ocupacional', 'Suporte ventilatório (fase avançada)'],
        farmacologico: ['Corticoides: Deflazacorte 0.9mg/kg/dia OU Prednisona 0.75mg/kg/dia', 'Suplementação vitamina D e cálcio', 'IECA/BRA para cardiomiopatia']
      },
      metasTerapeuticas: ['Preservar função motora', 'Prevenir complicações', 'Otimizar qualidade de vida'],
      examesIniciais: ['CK sérica', 'Teste genético (MLPA/sequenciamento DMD)', 'Ecocardiograma', 'Espirometria'],
      redFlags: ['Perda da marcha', 'Insuficiência respiratória', 'Cardiomiopatia', 'Escoliose progressiva']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1/3.500-5.000 meninos nascidos vivos',
        mortalidade: 'Sobrevida até 20-30 anos (melhorando com cuidados multidisciplinares)',
        faixaEtaria: 'Diagnóstico 2-5 anos; perda da marcha 9-13 anos',
        fatoresRisco: ['Herança X-linked recessiva', '1/3 são mutações de novo'],
        citations: [{ refId: 'birnkrant-2018-dmd' }]
      },
      fisiopatologia: {
        texto: 'Mutações no gene DMD (Xp21) causam ausência de distrofina, proteína que conecta citoesqueleto à matriz extracelular. Fibras musculares sofrem lesão repetida e são substituídas por tecido fibroadiposo.',
        citations: [{ refId: 'birnkrant-2018-dmd' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Atraso motor', 'Quedas frequentes', 'Dificuldade para correr/subir escadas', 'Sinal de Gowers'],
        sinaisExameFisico: ['Fraqueza proximal', 'Pseudo-hipertrofia de panturrilhas', 'Marcha anserina', 'Lordose lombar'],
        formasClinicas: ['DMD (ausência de distrofina)', 'Becker (distrofina reduzida/anormal - mais leve)'],
        citations: [{ refId: 'birnkrant-2018-dmd' }]
      },
      diagnostico: {
        criterios: ['Clínica de fraqueza proximal progressiva em menino', 'CK muito elevada (10-100x normal)', 'Teste genético positivo para mutação no gene DMD', 'Biópsia muscular com ausência de distrofina (se teste genético inconclusivo)'],
        diagnosticoDiferencial: ['Distrofia de Becker', 'Distrofias de cinturas', 'Miopatias inflamatórias', 'Atrofia muscular espinhal'],
        examesLaboratoriais: ['CK sérica', 'Aldolase', 'AST/ALT (origem muscular)'],
        outrosExames: ['Teste genético MLPA + sequenciamento do gene DMD', 'EMG', 'Biópsia muscular com imunofluorescência para distrofina'],
        citations: [{ refId: 'birnkrant-2018-dmd' }]
      },
      tratamento: {
        objetivos: ['Preservar função motora pelo maior tempo', 'Prevenir/tratar complicações cardíacas e respiratórias', 'Otimizar qualidade de vida'],
        naoFarmacologico: {
          medidas: ['Fisioterapia motora regular', 'Alongamentos diários', 'Terapia ocupacional', 'Órteses (AFOs)', 'Suporte ventilatório noturno quando necessário'],
          citations: [{ refId: 'birnkrant-2018-dmd' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide', medicamentos: ['Deflazacorte', 'Prednisona'], posologia: 'Deflazacorte 0.9mg/kg/dia ou Prednisona 0.75mg/kg/dia', observacoes: 'Iniciar quando platô motor (4-6 anos); monitorar efeitos colaterais' }
          ],
          segundaLinha: [
            { classe: 'Terapia de exon skipping', medicamentos: ['Eteplirsen', 'Golodirsen', 'Casimersen'], posologia: 'IV semanal', observacoes: 'Para mutações específicas amenáveis a exon skipping' }
          ],
          situacoesEspeciais: [
            { situacao: 'Cardiomiopatia', conduta: 'IECA + betabloqueador desde diagnóstico ou a partir de 10 anos' },
            { situacao: 'Osteoporose por corticoide', conduta: 'Vitamina D + cálcio; bifosfonados se fraturas' },
            { situacao: 'Escoliose >20°', conduta: 'Avaliar cirurgia de estabilização' }
          ],
          citations: [{ refId: 'birnkrant-2018-dmd' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Equipe multidisciplinar a cada 4-6 meses',
        examesControle: ['Ecocardiograma anual', 'Espirometria anual', 'Densitometria óssea', 'Radiografia de coluna'],
        metasTerapeuticas: ['Manter deambulação', 'FEVE >55%', 'CVF >60% do previsto', 'Prevenir fraturas'],
        criteriosEncaminhamento: ['Cardiologia pediátrica: desde diagnóstico', 'Pneumologia: quando CVF <80%', 'Ortopedia: escoliose ou contraturas', 'Genética: aconselhamento familiar'],
        citations: [{ refId: 'birnkrant-2018-dmd' }]
      },
      prevencao: {
        primaria: ['Aconselhamento genético para portadoras (mães e irmãs)', 'Diagnóstico pré-natal disponível'],
        secundaria: ['Rastreamento de cardiomiopatia desde diagnóstico', 'Vacinação completa incluindo influenza e pneumococo'],
        citations: [{ refId: 'birnkrant-2018-dmd' }]
      }
    },
    protocolos: ['protocolo-dmd'],
    medicamentos: ['deflazacorte', 'prednisona', 'enalapril'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'birnkrant-2018-dmd' }],
    lastUpdate: '2026-01',
    tags: ['genetico', 'neuromuscular', 'raro', 'progressivo']
  },
  {
    id: 'puberdade-precoce',
    titulo: 'Puberdade Precoce',
    sinonimos: ['Puberdade Precoce Central', 'Precocious Puberty'],
    doid: 'DOID:8469',
    snomedCT: '400179000',
    meshId: 'D011629',
    umlsCui: 'C0034013',
    ciap2: ['T10'],
    cid10: ['E30.1'],
    cid11: ['5A61'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Desenvolvimento de características sexuais secundárias antes dos 8 anos em meninas e 9 anos em meninos. Pode ser central (GnRH-dependente) ou periférica (GnRH-independente).',
      criteriosDiagnosticos: [
        'Telarca antes dos 8 anos (meninas) ou aumento testicular antes dos 9 anos (meninos)',
        'Aceleração da velocidade de crescimento',
        'Avanço da idade óssea',
        'Puberdade central: LH e FSH elevados após estímulo com GnRH',
        'Puberdade periférica: esteroides sexuais elevados com LH/FSH suprimidos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte psicológico', 'Acompanhamento do crescimento'],
        farmacologico: ['Puberdade central: Análogos de GnRH (Leuprolida 3.75-7.5mg IM mensal)', 'Puberdade periférica: tratar causa específica']
      },
      metasTerapeuticas: ['Suprimir progressão puberal', 'Preservar estatura final', 'Minimizar impacto psicossocial'],
      examesIniciais: ['LH, FSH, estradiol ou testosterona', 'Idade óssea (RX mão e punho)', 'Teste de estímulo com GnRH', 'RM de crânio (afastar lesão SNC em meninos e meninas <6 anos)'],
      redFlags: ['Meninos (sempre investigar causa)', 'Meninas <6 anos', 'Sinais neurológicos', 'Rápida progressão', 'Puberdade periférica']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1/5.000-10.000 crianças; 10x mais comum em meninas',
        faixaEtaria: '<8 anos meninas, <9 anos meninos',
        fatoresRisco: ['Obesidade', 'Adoção internacional', 'Exposição a disruptores endócrinos', 'Síndromes genéticas'],
        citations: [{ refId: 'carel-2016-puberdade' }]
      },
      fisiopatologia: {
        texto: 'Central: ativação prematura do eixo hipotálamo-hipófise-gonadal (idiopática em 80-90% das meninas). Periférica: produção autônoma de esteroides (tumores, HAC, McCune-Albright).',
        citations: [{ refId: 'carel-2016-puberdade' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Desenvolvimento mamário precoce (meninas)', 'Aumento testicular (meninos)', 'Aceleração do crescimento', 'Pelos pubianos'],
        sinaisExameFisico: ['Estadiamento de Tanner avançado para idade', 'Aumento da velocidade de crescimento', 'Acne', 'Odor axilar'],
        formasClinicas: ['Central (verdadeira, GnRH-dependente)', 'Periférica (pseudopuberdade, GnRH-independente)'],
        citations: [{ refId: 'carel-2016-puberdade' }]
      },
      diagnostico: {
        criterios: ['Caracteres sexuais secundários antes de 8 anos (meninas) ou 9 anos (meninos)', 'Teste de estímulo com GnRH: LH ≥5 UI/L (puberdade central)', 'Idade óssea avançada >1 ano', 'RM crânio para afastar lesão (todos meninos, meninas <6 anos)'],
        diagnosticoDiferencial: ['Telarca isolada prematura', 'Adrenarca prematura', 'Variantes normais do desenvolvimento', 'Síndrome de McCune-Albright'],
        examesLaboratoriais: ['LH, FSH basais e após GnRH', 'Estradiol (meninas)', 'Testosterona (meninos)', '17-OH-progesterona (se virilização)'],
        examesImagem: ['RX mão e punho esquerdo (idade óssea)', 'RM de crânio com foco em sela túrcica', 'USG pélvico (meninas)', 'USG testicular (meninos)'],
        citations: [{ refId: 'carel-2016-puberdade' }]
      },
      tratamento: {
        objetivos: ['Suprimir progressão puberal', 'Preservar estatura final', 'Minimizar impacto psicossocial'],
        naoFarmacologico: {
          medidas: ['Suporte psicológico para criança e família', 'Orientação escolar', 'Acompanhamento auxológico regular'],
          citations: [{ refId: 'carel-2016-puberdade' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Análogo de GnRH', medicamentos: ['Leuprolida', 'Triptorelina'], posologia: 'Leuprolida 3.75-7.5mg IM mensal ou Triptorelina 3.75mg IM mensal', observacoes: 'Para puberdade central; suprimir LH' }
          ],
          segundaLinha: [
            { classe: 'Implante de GnRH', medicamentos: ['Histrelina'], posologia: 'Implante SC anual', observacoes: 'Alternativa para melhor adesão' }
          ],
          situacoesEspeciais: [
            { situacao: 'Puberdade periférica por tumor', conduta: 'Tratamento cirúrgico do tumor' },
            { situacao: 'McCune-Albright', conduta: 'Inibidores de aromatase, letrozol' },
            { situacao: 'HAC', conduta: 'Corticoide para supressão adrenal' }
          ],
          citations: [{ refId: 'carel-2016-puberdade' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses durante tratamento',
        examesControle: ['LH suprimido (<0.3 UI/L)', 'Velocidade de crescimento', 'Idade óssea anual', 'Estadiamento de Tanner'],
        metasTerapeuticas: ['LH suprimido', 'Estabilização ou regressão do Tanner', 'Velocidade de crescimento adequada', 'Idade óssea não avançando'],
        criteriosEncaminhamento: ['Endocrinologia pediátrica: todos os casos', 'Neurologia/neurocirurgia: se lesão de SNC', 'Psicologia: suporte emocional'],
        citations: [{ refId: 'carel-2016-puberdade' }]
      },
      prevencao: {
        primaria: ['Evitar exposição a disruptores endócrinos', 'Controle de obesidade infantil'],
        secundaria: ['Diagnóstico precoce para preservar estatura final', 'Tratamento adequado para minimizar impacto psicossocial'],
        citations: [{ refId: 'carel-2016-puberdade' }]
      }
    },
    protocolos: ['protocolo-puberdade-precoce'],
    medicamentos: ['leuprolida', 'triptorelina'],
    calculadoras: ['idade-ossea'],
    rastreamentos: [],
    citations: [{ refId: 'carel-2016-puberdade' }],
    lastUpdate: '2026-01',
    tags: ['endocrino', 'crescimento', 'pediatria', 'puberdade']
  }
];
