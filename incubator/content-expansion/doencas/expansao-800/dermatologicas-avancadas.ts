/**
 * DOENCAS DERMATOLOGICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ===========================================================
 * Doencas dermatologicas inflamatorias, autoimunes e cronicas
 */

import { Doenca } from '@/lib/types/doenca';

export const dermatologicasAvancadas: Doenca[] = [
  // ============================================================================
  // DOENCAS INFLAMATORIAS CRONICAS
  // ============================================================================
  {
    id: 'psoriase-placas',
    titulo: 'Psoriase em Placas',
    sinonimos: ['Psoriase vulgar', 'Plaque psoriasis'],
    doid: 'DOID:8893',
    snomedCT: '9014002',
    meshId: 'D011565',
    umlsCui: 'C0033860',
    ciap2: ['S91'],
    cid10: ['L40.0'],
    cid11: ['EA90.0'],
    categoria: 'dermatologico',
    subcategoria: 'inflamatorias_cronicas',
    quickView: {
      definicao: 'Doenca inflamatoria cronica imunomediada caracterizada por placas eritematosas bem delimitadas cobertas por escamas prateadas. Afeta 2-3% da populacao mundial.',
      criteriosDiagnosticos: [
        'Placas eritematosas bem delimitadas',
        'Escamas prateadas aderentes (sinal da vela)',
        'Sinal de Auspitz (orvalho sangrento)',
        'Fenomeno de Koebner',
        'Distribuicao tipica: cotovelos, joelhos, couro cabeludo, regiao sacral',
        'Historia familiar em 30-40%'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratacao cutanea intensiva',
          'Fototerapia (UVB narrow-band)',
          'Evitar traumas cutaneos (Koebner)',
          'Controle de estresse'
        ],
        farmacologico: [
          'TOPICO LEVE: Corticoides topicos (betametasona, clobetasol)',
          'TOPICO MODERADO: Calcipotriol + betametasona',
          'SISTEMICO: Metotrexato 7,5-25mg/semana',
          'BIOLOGICO: Anti-TNF, anti-IL17, anti-IL23'
        ]
      },
      metasTerapeuticas: [
        'PASI 75 ou PASI 90',
        'Melhora da qualidade de vida (DLQI)',
        'Controle de comorbidades'
      ],
      examesIniciais: [
        'Hemograma, funcao hepatica e renal',
        'Perfil lipidico',
        'Glicemia',
        'Sorologias (HIV, hepatites) se sistemico'
      ],
      redFlags: [
        'Psoriase eritrodermica (>90% superficie)',
        'Psoriase pustulosa generalizada',
        'Artrite psoriasica associada',
        'Refratariedade a tratamento topico'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-3% da populacao mundial',
        incidencia: 'Picos: 20-30 anos e 50-60 anos',
        faixaEtaria: 'Tipo I (<40 anos) e Tipo II (>40 anos)',
        fatoresRisco: [
          'Historia familiar (HLA-Cw6)',
          'Obesidade',
          'Tabagismo',
          'Estresse',
          'Infeccoes estreptococicas'
        ],
        citations: [{ refId: 'aad-psoriasis-2023' }]
      },
      fisiopatologia: {
        texto: 'Doenca imunomediada com hiperativacao de celulas Th1/Th17. Citocinas TNF-alfa, IL-17 e IL-23 promovem hiperproliferacao queratinocitaria (ciclo celular de 3-4 dias vs 28-30 normal).',
        citations: [{ refId: 'nejm-psoriasis-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Placas eritematosas com escamas prateadas',
          'Prurido (50-80% dos pacientes)',
          'Distribuicao simetrica',
          'Acometimento ungueal (50%)',
          'Artralgia (ate 30%)'
        ],
        sinaisExameFisico: [
          'Placas bem delimitadas',
          'Sinal da vela (escamas estratificadas)',
          'Sinal de Auspitz (pontos hemorrágicos)',
          'Fenomeno de Koebner',
          'Pitting ungueal, onicólise'
        ],
        formasClinicas: [
          'Psoriase em placas (90%)',
          'Psoriase gutata',
          'Psoriase invertida',
          'Psoriase pustulosa',
          'Psoriase eritrodermica'
        ],
        citations: [{ refId: 'aad-psoriasis-2023' }]
      },
      diagnostico: {
        criterios: [
          'Diagnostico clinico na maioria dos casos',
          'Biopsia se duvida diagnostica',
          'Avaliacao de extensao: PASI, BSA'
        ],
        diagnosticoDiferencial: [
          'Dermatite seborreica',
          'Eczema numular',
          'Pitiríase rosea',
          'Micose fungoide',
          'Liquen plano'
        ],
        examesLaboratoriais: [
          'Hemograma, TGO/TGP, creatinina',
          'Perfil lipidico',
          'Fator reumatoide, PCR (se artrite)'
        ],
        citations: [{ refId: 'sbd-psoriase-2022' }]
      },
      tratamento: {
        objetivos: [
          'Clearance ou near-clearance das lesoes',
          'PASI 75-90',
          'Melhora da qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Hidratacao cutanea',
            'Fototerapia UVB narrow-band',
            'PUVA em casos selecionados',
            'Cessacao tabagica',
            'Controle de peso'
          ],
          citations: [{ refId: 'aad-psoriasis-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide topico', medicamentos: ['Clobetasol', 'Betametasona'], posologia: '1-2x/dia por 2-4 semanas', observacoes: 'Evitar uso prolongado em face/dobras' },
            { classe: 'Analogo vitamina D', medicamentos: ['Calcipotriol', 'Calcitriol'], posologia: '1-2x/dia', observacoes: 'Combinar com corticoide' }
          ],
          segundaLinha: [
            { classe: 'Imunomodulador sistemico', medicamentos: ['Metotrexato', 'Ciclosporina', 'Acitretina'], posologia: 'MTX 7,5-25mg/semana', observacoes: 'Monitorar hepatotoxicidade' },
            { classe: 'Biologico anti-IL17', medicamentos: ['Secuquinumabe', 'Ixequizumabe'], posologia: 'Secuquinumabe 300mg SC', observacoes: 'Alta eficacia PASI 90' }
          ],
          situacoesEspeciais: [
            { situacao: 'Artrite psoriasica', conduta: 'Iniciar biologico precoce; anti-TNF ou anti-IL17' },
            { situacao: 'Gestacao', conduta: 'Evitar sistemicos; topicos em areas limitadas' }
          ],
          citations: [{ refId: 'nejm-psoriasis-2021' }]
        },
        duracao: 'Tratamento cronico; ajuste conforme resposta'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal ate estabilizacao; depois trimestral',
        examesControle: [
          'Hemograma, TGO/TGP (se MTX)',
          'Creatinina, PA (se ciclosporina)',
          'PASI, DLQI'
        ],
        metasTerapeuticas: [
          'PASI 75 ou PASI 90',
          'DLQI <5'
        ],
        criteriosEncaminhamento: [
          'Psoriase moderada-grave (BSA >10%)',
          'Falha a topicos',
          'Artrite psoriasica',
          'Formas graves (eritrodermica, pustulosa)'
        ],
        citations: [{ refId: 'sbd-psoriase-2022' }]
      },
      prevencao: {
        primaria: [
          'Controle de peso',
          'Cessacao tabagica',
          'Manejo do estresse'
        ],
        secundaria: [
          'Tratamento precoce',
          'Rastreio de comorbidades CV',
          'Screening de artrite psoriasica'
        ],
        citations: [{ refId: 'aad-psoriasis-2023' }]
      }
    },
    protocolos: ['psoriase-manejo-aps'],
    medicamentos: ['clobetasol', 'calcipotriol', 'metotrexato', 'secuquinumabe'],
    calculadoras: ['pasi', 'bsa', 'dlqi'],
    rastreamentos: [],
    citations: [{ refId: 'aad-psoriasis-2023' }, { refId: 'nejm-psoriasis-2021' }],
    lastUpdate: '2025-01',
    tags: ['psoriase', 'imunomediada', 'biologicos', 'metotrexato']
  },

  {
    id: 'dermatite-atopica',
    titulo: 'Dermatite Atopica',
    sinonimos: ['Eczema atopico', 'Atopic dermatitis', 'Neurodermatite'],
    doid: 'DOID:3310',
    snomedCT: '24079001',
    meshId: 'D003876',
    umlsCui: 'C0011615',
    ciap2: ['S87'],
    cid10: ['L20', 'L20.0', 'L20.8', 'L20.9'],
    cid11: ['EA80'],
    categoria: 'dermatologico',
    subcategoria: 'inflamatorias_cronicas',
    quickView: {
      definicao: 'Doenca inflamatoria cutanea cronica, pruriginosa, de base genetica (mutacoes filagrina) e imunologica (Th2). Parte da marcha atopica com asma e rinite alergica.',
      criteriosDiagnosticos: [
        'Criterios de Hanifin e Rajka:',
        'Prurido intenso',
        'Morfologia e distribuicao tipicas por idade',
        'Curso cronico/recidivante',
        'Historia pessoal/familiar de atopia',
        'Xerose cutanea'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratacao intensiva (emolientes 2-3x/dia)',
          'Banho morno curto',
          'Evitar irritantes e alergenos conhecidos',
          'Roupas de algodao'
        ],
        farmacologico: [
          'LEVE: Corticoides topicos baixa potencia',
          'MODERADO: Corticoides topicos media potencia',
          'GRAVE: Corticoides topicos alta potencia + sistemico breve',
          'MANUTENCAO: Inibidores calcineurina (tacrolimo, pimecrolimo)'
        ]
      },
      metasTerapeuticas: [
        'Controle do prurido',
        'Prevencao de flares',
        'Melhora da qualidade de vida'
      ],
      examesIniciais: [
        'Diagnostico clinico',
        'IgE total (elevada em 80%)',
        'Prick test se suspeita de alergeno especifico'
      ],
      redFlags: [
        'Eczema herpetico (Kaposi varicelliform eruption)',
        'Infeccao bacteriana secundaria extensa',
        'Eritrodermia',
        'Refratariedade a tratamento otimizado'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '15-20% em criancas; 2-3% em adultos',
        incidencia: '85% iniciam antes dos 5 anos',
        faixaEtaria: 'Inicio tipico: lactentes e primeira infancia',
        fatoresRisco: [
          'Historia familiar de atopia',
          'Mutacoes no gene FLG (filagrina)',
          'Ambiente urbano',
          'Pais fumantes',
          'Uso precoce de antibioticos'
        ],
        citations: [{ refId: 'aad-ad-2023' }]
      },
      fisiopatologia: {
        texto: 'Disfuncao de barreira epidermica (mutacoes filagrina) + desregulacao imune Th2. Producao excessiva de IL-4, IL-13, IL-31 (prurido). Colonizacao por S. aureus perpetua inflamacao.',
        citations: [{ refId: 'lancet-ad-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Prurido intenso (pior a noite)',
          'Xerose cutanea',
          'Lesoes eczematosas (aguda, subaguda, cronica)',
          'Distribuicao variavel por idade',
          'Curso cronico com flares'
        ],
        sinaisExameFisico: [
          'Lactentes: face, couro cabeludo, superficies extensoras',
          'Criancas: flexuras (antecubital, poplitea)',
          'Adultos: maos, face, pescoco',
          'Liquenificacao em areas cronicas',
          'Sinal de Dennie-Morgan, palidez perioral'
        ],
        formasClinicas: [
          'Dermatite atopica do lactente',
          'Dermatite atopica da infancia',
          'Dermatite atopica do adulto',
          'Formas localizadas (maos, palpebras)'
        ],
        citations: [{ refId: 'aad-ad-2023' }]
      },
      diagnostico: {
        criterios: [
          'Criterios de Hanifin-Rajka (3 maiores + 3 menores)',
          'Criterios UK Working Party (simplificados)',
          'Avaliacao de gravidade: SCORAD, EASI'
        ],
        diagnosticoDiferencial: [
          'Dermatite seborreica',
          'Dermatite de contato',
          'Escabiose',
          'Psoriase',
          'Imunodeficiencias (Wiskott-Aldrich, IPEX)'
        ],
        examesLaboratoriais: [
          'IgE total (elevada em 80%)',
          'Eosinofilia periferica',
          'Prick test/RAST se suspeita alergica'
        ],
        citations: [{ refId: 'lancet-ad-2021' }]
      },
      tratamento: {
        objetivos: [
          'Controle do prurido',
          'Restauracao da barreira cutanea',
          'Prevencao de flares',
          'Tratamento de infeccoes secundarias'
        ],
        naoFarmacologico: {
          medidas: [
            'Emolientes 2-3x/dia (ceramidas)',
            'Banho morno 5-10 min',
            'Evitar sabonetes agressivos',
            'Wet wrap therapy em casos graves',
            'Controle ambiental'
          ],
          citations: [{ refId: 'aad-ad-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide topico', medicamentos: ['Hidrocortisona', 'Mometasona', 'Clobetasol'], posologia: 'Conforme gravidade e local; 1-2x/dia', observacoes: 'Escolher potencia por area e idade' },
            { classe: 'Inibidor calcineurina', medicamentos: ['Tacrolimo', 'Pimecrolimo'], posologia: 'Tacrolimo 0,03-0,1% 2x/dia', observacoes: 'Manutencao; evita atrofia por corticoide' }
          ],
          segundaLinha: [
            { classe: 'Biologico anti-IL4/13', medicamentos: ['Dupilumabe'], posologia: '300mg SC a cada 2 semanas', observacoes: 'Moderada-grave refrataria; >6 anos' },
            { classe: 'Inibidor JAK', medicamentos: ['Upadacitinibe', 'Abrocitinibe'], posologia: 'Upadacitinibe 15-30mg/dia VO', observacoes: 'Alternativa a biologico' }
          ],
          situacoesEspeciais: [
            { situacao: 'Infeccao secundaria', conduta: 'Cefalexina ou mupirocina topica' },
            { situacao: 'Eczema herpetico', conduta: 'Aciclovir IV - emergencia' }
          ],
          citations: [{ refId: 'lancet-ad-2021' }]
        },
        duracao: 'Cronico; emolientes continuos; anti-inflamatorios conforme flares'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal em flares; trimestral se estavel',
        examesControle: [
          'SCORAD ou EASI',
          'DLQI/CDLQI',
          'Monitorar efeitos adversos do tratamento'
        ],
        metasTerapeuticas: [
          'SCORAD <25',
          'Ausencia de flares frequentes',
          'Qualidade de vida preservada'
        ],
        criteriosEncaminhamento: [
          'Dermatite moderada-grave',
          'Refratariedade a topicos',
          'Eczema herpetico',
          'Suspeita de imunodeficiencia'
        ],
        citations: [{ refId: 'aad-ad-2023' }]
      },
      prevencao: {
        primaria: [
          'Emolientes desde nascimento em alto risco',
          'Aleitamento materno',
          'Evitar exposicao precoce a irritantes'
        ],
        secundaria: [
          'Manutencao de barreira cutanea',
          'Tratamento proativo com inibidores calcineurina',
          'Identificacao e evitacao de gatilhos'
        ],
        citations: [{ refId: 'lancet-ad-2021' }]
      }
    },
    protocolos: ['dermatite-atopica-manejo'],
    medicamentos: ['tacrolimo', 'dupilumabe', 'mometasona'],
    calculadoras: ['scorad', 'easi', 'dlqi'],
    rastreamentos: [],
    citations: [{ refId: 'aad-ad-2023' }, { refId: 'lancet-ad-2021' }],
    lastUpdate: '2025-01',
    tags: ['atopia', 'eczema', 'dupilumabe', 'tacrolimo', 'filagrina']
  },

  {
    id: 'hidradenite-supurativa',
    titulo: 'Hidradenite Supurativa',
    sinonimos: ['Acne inversa', 'Doenca de Verneuil', 'Hidradenitis suppurativa'],
    doid: 'DOID:6543',
    snomedCT: '59393003',
    meshId: 'D017497',
    umlsCui: 'C0162836',
    ciap2: ['S92'],
    cid10: ['L73.2'],
    cid11: ['ED80.0'],
    categoria: 'dermatologico',
    subcategoria: 'inflamatorias_cronicas',
    quickView: {
      definicao: 'Doenca inflamatoria cronica do foliculo piloso, caracterizada por nodulos, abscessos e fistulas dolorosos recorrentes em areas intertriginosas (axilas, inguinal, perianal).',
      criteriosDiagnosticos: [
        'Lesoes tipicas: nodulos, abscessos, fistulas, cicatrizes',
        'Localizacao caracteristica: axilas, regiao inguinal, perianal, inframamaria',
        'Recorrencia: >=2 episodios em 6 meses',
        'Historia familiar em 30-40%',
        'Estadiamento Hurley (I, II, III)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cessacao tabagica (essencial)',
          'Perda de peso',
          'Evitar depilacao traumatica',
          'Curativos absorventes',
          'Compressas mornas'
        ],
        farmacologico: [
          'LEVE (Hurley I): Clindamicina topica 1%',
          'MODERADO (Hurley II): Clindamicina + Rifampicina VO 10 semanas',
          'GRAVE (Hurley III): Adalimumabe (biologico anti-TNF)',
          'ABSCESSOS: Drenagem + antibioticos'
        ]
      },
      metasTerapeuticas: [
        'Reducao de flares',
        'Controle da dor',
        'Prevencao de progressao'
      ],
      examesIniciais: [
        'Cultura de secrecao (guiar antibiotico)',
        'Hemograma, PCR',
        'Glicemia (associacao com DM2)',
        'Screening sorologias se biologico'
      ],
      redFlags: [
        'Sepse por abscesso',
        'Carcinoma espinocelular em lesoes cronicas',
        'Hurley III extenso',
        'Anemia de doenca cronica'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-4% da populacao',
        incidencia: 'Pico na 2a-3a decada de vida',
        faixaEtaria: 'Inicio apos puberdade; mulheres 3:1',
        fatoresRisco: [
          'Tabagismo (70-90% sao fumantes)',
          'Obesidade (IMC >30)',
          'Sindrome metabolica',
          'Historia familiar',
          'Sexo feminino'
        ],
        citations: [{ refId: 'jama-hs-2022' }]
      },
      fisiopatologia: {
        texto: 'Oclusao folicular primaria seguida de ruptura e resposta inflamatoria intensa. Formacao de tuneis/fistulas subcutaneas. Desregulacao de IL-1beta, TNF-alfa, IL-17.',
        citations: [{ refId: 'nejm-hs-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Nodulos dolorosos recorrentes',
          'Abscessos com drenagem purulenta',
          'Formacao de fistulas e tuneis',
          'Cicatrizes hipertroficas/retráteis',
          'Dor cronica significativa'
        ],
        sinaisExameFisico: [
          'Nodulos inflamatorios profundos',
          'Abscessos flutuantes',
          'Comedoes abertos (double-headed)',
          'Fistulas com drenagem',
          'Cicatrizes em corda'
        ],
        formasClinicas: [
          'Hurley I: Abscessos isolados sem fistulas',
          'Hurley II: Abscessos recorrentes com fistulas e cicatrizes',
          'Hurley III: Doenca difusa com multiplas fistulas interconectadas'
        ],
        citations: [{ refId: 'jama-hs-2022' }]
      },
      diagnostico: {
        criterios: [
          'Lesoes tipicas em locais tipicos',
          'Recorrencia (>=2 em 6 meses)',
          'Diagnostico clinico (biopsia raramente necessaria)'
        ],
        diagnosticoDiferencial: [
          'Furunculose',
          'Actinomicose',
          'Doenca de Crohn perianal',
          'Linfogranuloma venereo',
          'Cisto pilonidal'
        ],
        examesLaboratoriais: [
          'Cultura de secrecao',
          'Hemograma, PCR, VHS',
          'Glicemia, perfil lipidico'
        ],
        examesImagem: [
          'USG cutanea (tuneis subcutaneos)',
          'RM perianal se doenca extensa'
        ],
        citations: [{ refId: 'nejm-hs-2023' }]
      },
      tratamento: {
        objetivos: [
          'Reducao de flares',
          'Controle da dor',
          'Prevencao de progressao e cicatrizes'
        ],
        naoFarmacologico: {
          medidas: [
            'Cessacao tabagica (fundamental)',
            'Perda de peso',
            'Evitar trauma local',
            'Curativos adequados',
            'Suporte psicologico'
          ],
          citations: [{ refId: 'jama-hs-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antibiotico topico', medicamentos: ['Clindamicina topica 1%'], posologia: '2x/dia nas lesoes', observacoes: 'Hurley I' },
            { classe: 'Antibiotico sistemico', medicamentos: ['Clindamicina + Rifampicina'], posologia: '300mg cada 12/12h por 10 semanas', observacoes: 'Hurley II' }
          ],
          segundaLinha: [
            { classe: 'Biologico anti-TNF', medicamentos: ['Adalimumabe'], posologia: '160mg semana 0, 80mg semana 2, 40mg/semana manutencao', observacoes: 'Unico biologico aprovado; Hurley II-III' },
            { classe: 'Retinoide', medicamentos: ['Acitretina'], posologia: '0,25-0,5mg/kg/dia', observacoes: 'Alternativa; contraindicado em gestacao' }
          ],
          situacoesEspeciais: [
            { situacao: 'Abscesso agudo', conduta: 'Drenagem cirurgica + antibiotico' },
            { situacao: 'Hurley III refratario', conduta: 'Excisao cirurgica ampla' }
          ],
          citations: [{ refId: 'nejm-hs-2023' }]
        },
        duracao: 'Cronico; antibioticos ciclicos; biologico contínuo'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal em tratamento ativo; trimestral se estavel',
        examesControle: [
          'HiSCR (resposta clinica)',
          'VAS dor',
          'DLQI'
        ],
        metasTerapeuticas: [
          'HiSCR (>=50% reducao abscessos/nodulos)',
          'Reducao da dor',
          'Prevencao de progressao Hurley'
        ],
        criteriosEncaminhamento: [
          'Hurley II-III',
          'Falha a antibioticos sistemicos',
          'Candidato a biologico',
          'Necessidade de cirurgia'
        ],
        citations: [{ refId: 'jama-hs-2022' }]
      },
      prevencao: {
        primaria: [
          'Cessacao tabagica',
          'Manutencao de peso saudavel'
        ],
        secundaria: [
          'Tratamento precoce',
          'Evitar trauma nas areas afetadas',
          'Controle de comorbidades metabolicas'
        ],
        citations: [{ refId: 'nejm-hs-2023' }]
      }
    },
    protocolos: ['hidradenite-manejo'],
    medicamentos: ['clindamicina', 'rifampicina', 'adalimumabe'],
    calculadoras: ['hurley-staging', 'hiscr'],
    rastreamentos: [],
    citations: [{ refId: 'jama-hs-2022' }, { refId: 'nejm-hs-2023' }],
    lastUpdate: '2025-01',
    tags: ['hidradenite', 'acne-inversa', 'adalimumabe', 'hurley']
  },

  // ============================================================================
  // DOENCAS DESPIGMENTANTES
  // ============================================================================
  {
    id: 'vitiligo',
    titulo: 'Vitiligo',
    sinonimos: ['Leucodermia adquirida', 'Vitiligo vulgaris'],
    doid: 'DOID:12306',
    snomedCT: '56727007',
    meshId: 'D014820',
    umlsCui: 'C0042900',
    ciap2: ['S99'],
    cid10: ['L80'],
    cid11: ['ED63'],
    categoria: 'dermatologico',
    subcategoria: 'despigmentantes',
    quickView: {
      definicao: 'Doenca autoimune caracterizada por destruicao de melanocitos, resultando em manchas acromicas bem delimitadas. Afeta 0,5-2% da populacao.',
      criteriosDiagnosticos: [
        'Manchas acromicas bem delimitadas',
        'Bordas convexas (vitiligo ativo)',
        'Ausencia de escamas ou atrofia',
        'Realce com luz de Wood',
        'Fenomeno de Koebner',
        'Distribuicao simetrica (vitiligo comum)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fotoprotecao rigorosa',
          'Fototerapia UVB narrow-band',
          'Suporte psicologico',
          'Camuflagem cosmetica'
        ],
        farmacologico: [
          'TOPICO: Corticoides topicos potentes (corpo)',
          'FACE: Inibidores calcineurina (tacrolimo 0,1%)',
          'SISTEMICO: Minipulso corticoide (vitiligo progressivo)',
          'NOVO: Ruxolitinibe creme (inibidor JAK topico)'
        ]
      },
      metasTerapeuticas: [
        'Estabilizacao da doenca',
        'Repigmentacao das lesoes',
        'Melhora da qualidade de vida'
      ],
      examesIniciais: [
        'Exame com luz de Wood',
        'TSH (associacao com tireoidite)',
        'Glicemia',
        'Anticorpos antitireoidianos'
      ],
      redFlags: [
        'Vitiligo rapidamente progressivo',
        'Associacao com outras doencas autoimunes',
        'Leucotriquia (pelos brancos)',
        'Halo nevo'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,5-2% da populacao mundial',
        incidencia: '50% antes dos 20 anos',
        faixaEtaria: 'Qualquer idade; pico 10-30 anos',
        fatoresRisco: [
          'Historia familiar (20-30%)',
          'Outras doencas autoimunes',
          'Estresse emocional',
          'Trauma cutaneo'
        ],
        citations: [{ refId: 'jaad-vitiligo-2023' }]
      },
      fisiopatologia: {
        texto: 'Destruicao autoimune de melanocitos mediada por celulas T CD8+. Papel de estresse oxidativo e interferon-gama. Associacao com tireoidite de Hashimoto, DM1, anemia perniciosa.',
        citations: [{ refId: 'nejm-vitiligo-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Manchas acromicas assintomaticas',
          'Bordas bem delimitadas',
          'Progressao variavel',
          'Leucotriquia em areas afetadas',
          'Impacto psicologico significativo'
        ],
        sinaisExameFisico: [
          'Maculas acromicas (branco-leitosas)',
          'Realce com luz de Wood',
          'Distribuicao simetrica bilateral',
          'Fenomeno de Koebner',
          'Poliose (pelos brancos)'
        ],
        formasClinicas: [
          'Vitiligo nao-segmentar (comum/generalizado)',
          'Vitiligo segmentar (dermatomico)',
          'Vitiligo acrofacial',
          'Vitiligo universal (>80% superficie)'
        ],
        citations: [{ refId: 'jaad-vitiligo-2023' }]
      },
      diagnostico: {
        criterios: [
          'Diagnostico clinico',
          'Exame com luz de Wood',
          'Biopsia raramente necessaria'
        ],
        diagnosticoDiferencial: [
          'Pitiríase versicolor',
          'Nevus depigmentosus',
          'Pitiríase alba',
          'Lepra indeterminada',
          'Leucodermia quimica'
        ],
        examesLaboratoriais: [
          'TSH, T4L',
          'Anticorpos anti-TPO, anti-Tg',
          'Glicemia',
          'Hemograma, vitamina B12'
        ],
        citations: [{ refId: 'nejm-vitiligo-2022' }]
      },
      tratamento: {
        objetivos: [
          'Estabilizar progressao',
          'Promover repigmentacao',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Fotoprotecao (previne contraste)',
            'Fototerapia UVB narrow-band',
            'PUVA (areas extensas)',
            'Excimer laser (localizado)',
            'Camuflagem cosmetica'
          ],
          citations: [{ refId: 'jaad-vitiligo-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide topico', medicamentos: ['Clobetasol', 'Betametasona'], posologia: '1x/dia por 3 meses, depois descanso', observacoes: 'Corpo; nao face' },
            { classe: 'Inibidor calcineurina', medicamentos: ['Tacrolimo 0,1%'], posologia: '2x/dia', observacoes: 'Face e areas sensiveis; primeira linha' }
          ],
          segundaLinha: [
            { classe: 'Inibidor JAK topico', medicamentos: ['Ruxolitinibe creme 1,5%'], posologia: '2x/dia', observacoes: 'FDA aprovado 2022; nao-segmentar' },
            { classe: 'Corticoide sistemico minipulso', medicamentos: ['Dexametasona'], posologia: '2,5-5mg 2 dias/semana por 3-6 meses', observacoes: 'Vitiligo rapidamente progressivo' }
          ],
          situacoesEspeciais: [
            { situacao: 'Vitiligo estavel localizado', conduta: 'Transplante de melanocitos ou enxerto' },
            { situacao: 'Vitiligo universal', conduta: 'Despigmentacao com monobenzileter de hidroquinona' }
          ],
          citations: [{ refId: 'nejm-vitiligo-2022' }]
        },
        duracao: 'Tratamento prolongado; resposta em 3-6 meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 2-3 meses em tratamento ativo',
        examesControle: [
          'VASI (area acometida)',
          'Fotografia padronizada',
          'TSH anual'
        ],
        metasTerapeuticas: [
          'Estabilizacao',
          'Repigmentacao >=25%',
          'Melhora DLQI'
        ],
        criteriosEncaminhamento: [
          'Vitiligo extenso (>20%)',
          'Vitiligo rapidamente progressivo',
          'Falha a tratamento topico',
          'Candidato a transplante'
        ],
        citations: [{ refId: 'jaad-vitiligo-2023' }]
      },
      prevencao: {
        primaria: [
          'Nao ha prevencao primaria conhecida',
          'Evitar trauma cutaneo (Koebner)'
        ],
        secundaria: [
          'Fotoprotecao',
          'Tratamento precoce',
          'Rastreio de doencas autoimunes associadas'
        ],
        citations: [{ refId: 'nejm-vitiligo-2022' }]
      }
    },
    protocolos: ['vitiligo-manejo'],
    medicamentos: ['tacrolimo', 'ruxolitinibe', 'clobetasol'],
    calculadoras: ['vasi', 'dlqi'],
    rastreamentos: [],
    citations: [{ refId: 'jaad-vitiligo-2023' }, { refId: 'nejm-vitiligo-2022' }],
    lastUpdate: '2025-01',
    tags: ['vitiligo', 'despigmentacao', 'autoimune', 'fototerapia']
  },

  // ============================================================================
  // ALOPECIAS
  // ============================================================================
  {
    id: 'alopecia-areata',
    titulo: 'Alopecia Areata',
    sinonimos: ['Pelada', 'Alopecia circumscripta'],
    doid: 'DOID:986',
    snomedCT: '68225006',
    meshId: 'D000506',
    umlsCui: 'C0002170',
    ciap2: ['S23'],
    cid10: ['L63', 'L63.0', 'L63.1', 'L63.2'],
    cid11: ['ED70.0'],
    categoria: 'dermatologico',
    subcategoria: 'alopecias',
    quickView: {
      definicao: 'Doenca autoimune do foliculo piloso caracterizada por perda nao-cicatricial de cabelos em placas circulares bem delimitadas. Pode progredir para total ou universal.',
      criteriosDiagnosticos: [
        'Placas de alopecia bem delimitadas, circulares',
        'Couro cabeludo nao-cicatricial (pele normal)',
        'Pelos em ponto de exclamacao na borda',
        'Inicio subito',
        'Dermoscopia: pontos amarelos, pelos distroficos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte psicologico',
          'Uso de perucas/proteses',
          'Observacao (remissao espontanea em 50%)'
        ],
        farmacologico: [
          'PLACAS LIMITADAS: Corticoides intralesionais (triancinolona)',
          'PLACAS: Corticoides topicos potentes',
          'EXTENSO: Imunoterapia topica (difenciprona)',
          'NOVO: Baricitinibe (inibidor JAK oral)'
        ]
      },
      metasTerapeuticas: [
        'Repilacao das areas afetadas',
        'Prevencao de progressao',
        'Melhora da qualidade de vida'
      ],
      examesIniciais: [
        'Dermoscopia (patognomonico)',
        'TSH (associacao com tireoidite)',
        'Hemograma, ferritina',
        'Anticorpos antitireoidianos'
      ],
      redFlags: [
        'Progressao para totalis/universalis',
        'Inicio na infancia (pior prognostico)',
        'Ofiase (margem do couro cabeludo)',
        'Alteracoes ungueais (pitting)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,1-0,2% da populacao',
        incidencia: 'Risco ao longo da vida: 2%',
        faixaEtaria: 'Qualquer idade; pico 25-36 anos',
        fatoresRisco: [
          'Historia familiar',
          'Outras doencas autoimunes',
          'Atopia',
          'Estresse emocional',
          'Sindrome de Down'
        ],
        citations: [{ refId: 'jaad-aa-2022' }]
      },
      fisiopatologia: {
        texto: 'Ataque autoimune mediado por celulas T ao bulbo folicular. Perda do privilegio imunologico folicular. Papel de IFN-gama e via JAK-STAT. Genetica: HLA-DRB1.',
        citations: [{ refId: 'nejm-aa-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Perda de cabelo em placas circulares',
          'Inicio subito',
          'Assintomatico',
          'Pode afetar pelos corporais',
          'Alteracoes ungueais em 10-20%'
        ],
        sinaisExameFisico: [
          'Placas acromicas bem delimitadas',
          'Pele do couro cabeludo normal',
          'Pelos em ponto de exclamacao (3-4mm)',
          'Teste de tracao positivo na borda',
          'Pitting ungueal'
        ],
        formasClinicas: [
          'Alopecia areata em placas (mais comum)',
          'Alopecia totalis (todo couro cabeludo)',
          'Alopecia universalis (todo corpo)',
          'Ofiase (faixa occipitotemporal)',
          'Sisaifo (preserva margens)'
        ],
        citations: [{ refId: 'jaad-aa-2022' }]
      },
      diagnostico: {
        criterios: [
          'Diagnostico clinico',
          'Dermoscopia caracteristica',
          'Biopsia se duvida'
        ],
        diagnosticoDiferencial: [
          'Tinea capitis',
          'Tricotilomania',
          'Alopecia de tracao',
          'Efluvio telogeno',
          'Lupus cutaneo'
        ],
        examesLaboratoriais: [
          'TSH, anticorpos antitireoidianos',
          'Hemograma, ferritina',
          'Vitamina D',
          'ANA se suspeita de lupus'
        ],
        citations: [{ refId: 'nejm-aa-2022' }]
      },
      tratamento: {
        objetivos: [
          'Induzir repilacao',
          'Prevenir progressao',
          'Suporte emocional'
        ],
        naoFarmacologico: {
          medidas: [
            'Observacao (50% remissao espontanea em 1 ano)',
            'Perucas, proteses capilares',
            'Suporte psicologico',
            'Grupos de apoio'
          ],
          citations: [{ refId: 'jaad-aa-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide intralesional', medicamentos: ['Triancinolona'], posologia: '2,5-10mg/mL a cada 4-6 semanas', observacoes: 'Placas limitadas; <=50% couro cabeludo' },
            { classe: 'Corticoide topico', medicamentos: ['Clobetasol'], posologia: '1x/dia', observacoes: 'Adjuvante ou criancas' }
          ],
          segundaLinha: [
            { classe: 'Imunoterapia topica', medicamentos: ['Difenciprona (DPCP)'], posologia: 'Aplicacao semanal titulada', observacoes: 'Doenca extensa; induz dermatite de contato' },
            { classe: 'Inibidor JAK oral', medicamentos: ['Baricitinibe'], posologia: '2-4mg/dia', observacoes: 'FDA aprovado 2022; >=50% acometimento' }
          ],
          situacoesEspeciais: [
            { situacao: 'Crianca', conduta: 'Corticoides topicos; evitar intralesionais' },
            { situacao: 'Alopecia totalis/universalis', conduta: 'Baricitinibe ou outros inibidores JAK' }
          ],
          citations: [{ refId: 'nejm-aa-2022' }]
        },
        duracao: 'Tratamento prolongado; resposta em 3-6 meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal em tratamento ativo; trimestral apos',
        examesControle: [
          'SALT score (gravidade)',
          'Dermoscopia seriada',
          'TSH anual'
        ],
        metasTerapeuticas: [
          'SALT30 ou SALT50',
          'Melhora de qualidade de vida'
        ],
        criteriosEncaminhamento: [
          'Alopecia >50% do couro cabeludo',
          'Progressao para totalis/universalis',
          'Falha a tratamento convencional',
          'Candidato a inibidor JAK'
        ],
        citations: [{ refId: 'jaad-aa-2022' }]
      },
      prevencao: {
        primaria: [
          'Nao ha prevencao primaria conhecida'
        ],
        secundaria: [
          'Tratamento precoce',
          'Rastreio de doencas autoimunes associadas'
        ],
        citations: [{ refId: 'nejm-aa-2022' }]
      }
    },
    protocolos: ['alopecia-areata-manejo'],
    medicamentos: ['triancinolona', 'baricitinibe', 'clobetasol'],
    calculadoras: ['salt-score'],
    rastreamentos: [],
    citations: [{ refId: 'jaad-aa-2022' }, { refId: 'nejm-aa-2022' }],
    lastUpdate: '2025-01',
    tags: ['alopecia', 'areata', 'autoimune', 'baricitinibe', 'jak']
  },

  // ============================================================================
  // DOENCAS BOLHOSAS AUTOIMUNES
  // ============================================================================
  {
    id: 'penfigo-vulgar',
    titulo: 'Penfigo Vulgar',
    sinonimos: ['Pemphigus vulgaris', 'PV'],
    doid: 'DOID:867',
    snomedCT: '7326007',
    meshId: 'D010392',
    umlsCui: 'C0030809',
    ciap2: ['S99'],
    cid10: ['L10.0'],
    cid11: ['EB40.0'],
    categoria: 'dermatologico',
    subcategoria: 'bolhosas_autoimunes',
    quickView: {
      definicao: 'Doenca bolhosa autoimune grave com anticorpos anti-desmogleina 1 e 3. Bolhas flacidas e erosoes dolorosas em mucosas (oral) e pele. Potencialmente fatal se nao tratada.',
      criteriosDiagnosticos: [
        'Erosoes mucosas dolorosas (oral em 90%)',
        'Bolhas flacidas que rompem facilmente',
        'Sinal de Nikolsky positivo',
        'IFD: IgG e C3 intercelular (padrao em rede)',
        'Anticorpos anti-Dsg1 e anti-Dsg3',
        'Histopatologia: acantolise suprabasal'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cuidados com feridas e erosoes',
          'Dieta pastosa se lesoes orais extensas',
          'Prevencao de infeccoes secundarias'
        ],
        farmacologico: [
          'CORTICOIDE: Prednisona 1-1,5mg/kg/dia',
          'POUPADOR: Azatioprina ou Micofenolato',
          'REFRATARIO: Rituximabe (anti-CD20)',
          'ADJUVANTE: Dapsona, tetraciclinas'
        ]
      },
      metasTerapeuticas: [
        'Cicatrizacao completa das lesoes',
        'Remissao com minima dose de corticoide',
        'Prevencao de recidivas'
      ],
      examesIniciais: [
        'Biopsia com IFD (padrao-ouro)',
        'Anticorpos anti-Dsg1 e Dsg3 (ELISA)',
        'Hemograma, funcao renal/hepatica',
        'Glicemia, eletrólitos'
      ],
      redFlags: [
        'Acometimento extenso (>30% SC)',
        'Infeccao secundaria/sepse',
        'Desnutricao por disfagia',
        'Lesoes laringeas (obstrucao)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,1-0,5/100.000',
        incidencia: '0,1-0,5/100.000/ano',
        mortalidade: '5-10% com tratamento adequado',
        faixaEtaria: '40-60 anos; raro em criancas',
        fatoresRisco: [
          'Populacao judaica Ashkenazi',
          'Predisposicao genetica (HLA-DRB1)',
          'Drogas (penicilamina, captopril)'
        ],
        citations: [{ refId: 'jaad-pemphigus-2023' }]
      },
      fisiopatologia: {
        texto: 'Autoanticorpos IgG contra desmogleinas 1 e 3 (proteinas desmossomais). Perda de adesao entre queratinocitos (acantolise) nivel suprabasal. Dsg3 predomina em mucosas, Dsg1 em pele.',
        citations: [{ refId: 'nejm-pemphigus-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Erosoes orais dolorosas (inicio em 90%)',
          'Bolhas flacidas que rompem facilmente',
          'Erosoes cutaneas crostosas',
          'Disfagia, odinofagia',
          'Cicatrizacao lenta'
        ],
        sinaisExameFisico: [
          'Erosoes em mucosa oral, genital, nasal',
          'Bolhas flacidas sobre pele normal ou eritematosa',
          'Sinal de Nikolsky positivo',
          'Sinal de Asboe-Hansen (extensao bolha)',
          'Erosoes com crosta amarelada'
        ],
        formasClinicas: [
          'Penfigo vulgar mucocutaneo',
          'Penfigo vulgar mucoso dominante',
          'Penfigo vulgar cutaneo dominante',
          'Penfigo vegetante'
        ],
        citations: [{ refId: 'jaad-pemphigus-2023' }]
      },
      diagnostico: {
        criterios: [
          'Clinica compativel',
          'Histopatologia: acantolise suprabasal',
          'IFD: IgG/C3 intercelular (padrao em rede)',
          'ELISA: anti-Dsg1 e/ou anti-Dsg3'
        ],
        diagnosticoDiferencial: [
          'Penfigoide bolhoso',
          'Estomatite aftosa',
          'Herpes simples',
          'Liquen plano erosivo',
          'Eritema multiforme'
        ],
        examesLaboratoriais: [
          'Biopsia perilesional com IFD',
          'ELISA anti-Dsg1 e Dsg3',
          'IFI (anticorpos circulantes)',
          'Hemograma, bioquimica'
        ],
        citations: [{ refId: 'nejm-pemphigus-2022' }]
      },
      tratamento: {
        objetivos: [
          'Cicatrizacao completa',
          'Remissao com dose minima de corticoide',
          'Prevencao de complicacoes'
        ],
        naoFarmacologico: {
          medidas: [
            'Cuidados com feridas',
            'Dieta adaptada (pastosa, evitar acidez)',
            'Higiene oral atraumática',
            'Prevencao de osteoporose (corticoide)'
          ],
          citations: [{ refId: 'jaad-pemphigus-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide sistemico', medicamentos: ['Prednisona'], posologia: '1-1,5mg/kg/dia; desmame gradual', observacoes: 'Pilar do tratamento' },
            { classe: 'Imunossupressor poupador', medicamentos: ['Azatioprina', 'Micofenolato'], posologia: 'Azatioprina 2-3mg/kg/dia', observacoes: 'Iniciar junto com corticoide' }
          ],
          segundaLinha: [
            { classe: 'Biologico anti-CD20', medicamentos: ['Rituximabe'], posologia: '1000mg IV dias 0 e 14; ou 375mg/m2 x4', observacoes: 'Primeira linha em casos moderados-graves (2024)' },
            { classe: 'Imunossupressor alternativo', medicamentos: ['Ciclofosfamida', 'Ciclosporina'], posologia: 'Casos refratarios', observacoes: 'Toxicidade maior' }
          ],
          situacoesEspeciais: [
            { situacao: 'Doenca leve limitada', conduta: 'Corticoide topico potente + dapsona' },
            { situacao: 'Gestacao', conduta: 'Prednisona (menor risco) + suporte multidisciplinar' }
          ],
          citations: [{ refId: 'nejm-pemphigus-2022' }]
        },
        duracao: 'Anos; desmame muito gradual; manutencao 2-5 anos'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal em fase aguda; mensal em manutencao',
        examesControle: [
          'Titulacao de anti-Dsg (ELISA)',
          'Hemograma, glicemia',
          'Densitometria ossea',
          'Avaliacao oftalmologica (corticoide)'
        ],
        metasTerapeuticas: [
          'Cicatrizacao completa',
          'Prednisona <10mg/dia ou retirada',
          'Anticorpos anti-Dsg negativos'
        ],
        criteriosEncaminhamento: [
          'Todos os casos: dermatologista',
          'Acometimento extenso: internacao',
          'Candidato a rituximabe',
          'Complicacoes sistemicas'
        ],
        citations: [{ refId: 'jaad-pemphigus-2023' }]
      },
      prevencao: {
        primaria: [
          'Evitar drogas desencadeantes conhecidas'
        ],
        secundaria: [
          'Tratamento precoce',
          'Manutencao de imunossupressao adequada',
          'Monitoramento de anticorpos para ajuste'
        ],
        citations: [{ refId: 'nejm-pemphigus-2022' }]
      }
    },
    protocolos: ['penfigo-manejo'],
    medicamentos: ['prednisona', 'azatioprina', 'rituximabe'],
    calculadoras: ['pdai', 'absis'],
    rastreamentos: [],
    citations: [{ refId: 'jaad-pemphigus-2023' }, { refId: 'nejm-pemphigus-2022' }],
    lastUpdate: '2025-01',
    tags: ['penfigo', 'bolhosa', 'autoimune', 'rituximabe', 'desmogleina']
  },

  {
    id: 'penfigoide-bolhoso',
    titulo: 'Penfigoide Bolhoso',
    sinonimos: ['Bullous pemphigoid', 'BP'],
    doid: 'DOID:8504',
    snomedCT: '45028005',
    meshId: 'D010391',
    umlsCui: 'C0030805',
    ciap2: ['S99'],
    cid10: ['L12.0'],
    cid11: ['EB41.0'],
    categoria: 'dermatologico',
    subcategoria: 'bolhosas_autoimunes',
    quickView: {
      definicao: 'Doenca bolhosa autoimune subepidermica mais comum, caracterizada por bolhas tensas sobre base eritematosa. Anticorpos anti-BP180 e BP230. Predomina em idosos.',
      criteriosDiagnosticos: [
        'Bolhas tensas que nao rompem facilmente',
        'Base eritematosa ou urticariforme',
        'Prurido intenso precedendo bolhas',
        'Mucosas poupadas ou minimamente afetadas',
        'IFD: deposito linear de IgG/C3 na ZMB',
        'Anticorpos anti-BP180 e/ou BP230'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cuidados com bolhas (drenagem esteril)',
          'Curativos nao-aderentes',
          'Hidratacao cutanea'
        ],
        farmacologico: [
          'LEVE-MODERADO: Clobetasol topico 40g/dia (todo corpo)',
          'MODERADO-GRAVE: Prednisona 0,5-0,75mg/kg/dia',
          'POUPADOR: Doxiciclina 200mg/dia (idosos)',
          'REFRATARIO: Azatioprina, Micofenolato, Rituximabe'
        ]
      },
      metasTerapeuticas: [
        'Cessacao de novas bolhas',
        'Cicatrizacao das lesoes',
        'Controle do prurido'
      ],
      examesIniciais: [
        'Biopsia perilesional com IFD',
        'Anticorpos anti-BP180/BP230 (ELISA)',
        'Hemograma, funcao renal, glicemia'
      ],
      redFlags: [
        'Acometimento extenso em idoso fragil',
        'Infeccao secundaria',
        'Associacao com malignidade (controverso)',
        'Penfigoide de mucosas (ocular, oral)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '4-22/100.000 em >60 anos',
        incidencia: 'Aumenta com idade; dobra a cada 10 anos apos 60',
        mortalidade: '10-40% em 1 ano (comorbidades)',
        faixaEtaria: 'Media 77 anos; raro <60',
        fatoresRisco: [
          'Idade avancada',
          'Doencas neurologicas (demencia, Parkinson, AVC)',
          'Drogas (inibidores DPP-4, diureticos)',
          'Psoríase (tratada com anti-TNF)'
        ],
        citations: [{ refId: 'jaad-bp-2023' }]
      },
      fisiopatologia: {
        texto: 'Autoanticorpos IgG contra antigenos hemidesmossomais BP180 (BPAG2) e BP230 (BPAG1). Ativacao de complemento e infiltrado eosinofilico causa clivagem dermoepidermica.',
        citations: [{ refId: 'lancet-bp-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Prurido intenso (pode preceder bolhas)',
          'Bolhas tensas de conteudo claro',
          'Placas urticariformes',
          'Erosoes pos-bolhas',
          'Mucosas geralmente poupadas'
        ],
        sinaisExameFisico: [
          'Bolhas tensas 1-3cm sobre base eritematosa',
          'Sinal de Nikolsky negativo',
          'Placas eritematosas pruriginosas',
          'Distribuicao: flexuras, abdome, coxas'
        ],
        formasClinicas: [
          'Penfigoide bolhoso classico',
          'Fase urticariforme (pre-bolhosa)',
          'Penfigoide localizado',
          'Penfigoide vegetante'
        ],
        citations: [{ refId: 'jaad-bp-2023' }]
      },
      diagnostico: {
        criterios: [
          'Clinica: bolhas tensas, idoso, prurido',
          'Histologia: bolha subepidermica, eosinofilos',
          'IFD: IgG/C3 linear na ZMB',
          'ELISA: anti-BP180 e/ou anti-BP230'
        ],
        diagnosticoDiferencial: [
          'Penfigo vulgar',
          'Dermatite herpetiforme',
          'Epidermolise bolhosa adquirida',
          'Farmacodermia bolhosa',
          'Urticaria'
        ],
        examesLaboratoriais: [
          'Biopsia perilesional + IFD',
          'ELISA anti-BP180/BP230',
          'Hemograma (eosinofilia)',
          'Funcao renal, glicemia'
        ],
        citations: [{ refId: 'lancet-bp-2022' }]
      },
      tratamento: {
        objetivos: [
          'Controle das bolhas',
          'Alivio do prurido',
          'Minimizar efeitos adversos em idosos'
        ],
        naoFarmacologico: {
          medidas: [
            'Drenagem esteril de bolhas (manter teto)',
            'Curativos nao-aderentes',
            'Prevencao de infeccoes secundarias'
          ],
          citations: [{ refId: 'jaad-bp-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide topico superpotente', medicamentos: ['Clobetasol creme'], posologia: '20-40g/dia por todo o corpo', observacoes: 'Primeira linha; eficacia igual a sistemico com menos EA' },
            { classe: 'Corticoide sistemico', medicamentos: ['Prednisona'], posologia: '0,5-0,75mg/kg/dia', observacoes: 'Casos extensos; desmame em 4-6 meses' }
          ],
          segundaLinha: [
            { classe: 'Antibiotico anti-inflamatorio', medicamentos: ['Doxiciclina'], posologia: '200mg/dia', observacoes: 'Alternativa em idosos frageis' },
            { classe: 'Imunossupressor poupador', medicamentos: ['Azatioprina', 'Micofenolato'], posologia: 'Azatioprina 1-2mg/kg/dia', observacoes: 'Se dependencia de corticoide' }
          ],
          situacoesEspeciais: [
            { situacao: 'Idoso fragil', conduta: 'Clobetasol topico + doxiciclina; evitar corticoide sistemico' },
            { situacao: 'Refratario', conduta: 'Rituximabe, omalizumabe, dupilumabe (off-label)' }
          ],
          citations: [{ refId: 'lancet-bp-2022' }]
        },
        duracao: 'Meses a anos; desmame gradual; recidivas comuns'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal em fase ativa; mensal em desmame',
        examesControle: [
          'Anti-BP180 (correlaciona com atividade)',
          'Hemograma, glicemia, PA',
          'Densitometria se corticoide prolongado'
        ],
        metasTerapeuticas: [
          'Ausencia de novas bolhas',
          'Desmame de corticoide',
          'Controle do prurido'
        ],
        criteriosEncaminhamento: [
          'Todos os casos: dermatologista',
          'Acometimento extenso',
          'Falha a corticoide topico',
          'Penfigoide de mucosas'
        ],
        citations: [{ refId: 'jaad-bp-2023' }]
      },
      prevencao: {
        primaria: [
          'Considerar risco ao prescrever inibidores DPP-4 em idosos'
        ],
        secundaria: [
          'Tratamento precoce',
          'Manutencao para prevenir recidivas',
          'Monitoramento de anticorpos'
        ],
        citations: [{ refId: 'lancet-bp-2022' }]
      }
    },
    protocolos: ['penfigoide-manejo'],
    medicamentos: ['clobetasol', 'prednisona', 'doxiciclina'],
    calculadoras: ['bpdai'],
    rastreamentos: [],
    citations: [{ refId: 'jaad-bp-2023' }, { refId: 'lancet-bp-2022' }],
    lastUpdate: '2025-01',
    tags: ['penfigoide', 'bolhosa', 'idoso', 'clobetasol', 'bp180']
  },

  // ============================================================================
  // DOENCAS LIQUENOIDES
  // ============================================================================
  {
    id: 'liquen-plano',
    titulo: 'Liquen Plano',
    sinonimos: ['Lichen planus', 'LP'],
    doid: 'DOID:9201',
    snomedCT: '4776004',
    meshId: 'D008010',
    umlsCui: 'C0023646',
    ciap2: ['S99'],
    cid10: ['L43', 'L43.0', 'L43.1', 'L43.9'],
    cid11: ['ED94'],
    categoria: 'dermatologico',
    subcategoria: 'liquenoides',
    quickView: {
      definicao: 'Doenca inflamatoria imunomediada que afeta pele, mucosas, unhas e couro cabeludo. Os "6 Ps": papulas, planas, poligonais, purpureas, pruriginosas, com estrias de Wickham.',
      criteriosDiagnosticos: [
        'Papulas poligonais violaceas achatadas',
        'Estrias de Wickham (linhas brancas)',
        'Distribuicao flexural (punhos, tornozelos)',
        'Acometimento de mucosas (rendilhado branco)',
        'Fenomeno de Koebner',
        'Histologia: dermatite de interface liquenoide'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar trauma (Koebner)',
          'Higiene oral atraumatica',
          'Suspender drogas suspeitas'
        ],
        farmacologico: [
          'CUTANEO: Corticoides topicos potentes',
          'ORAL: Corticoide topico (triancinolona orabase)',
          'EXTENSO: Prednisona 0,5-1mg/kg',
          'REFRATARIO: Acitretina, Ciclosporina, Metotrexato'
        ]
      },
      metasTerapeuticas: [
        'Alivio do prurido',
        'Resolucao das lesoes',
        'Prevencao de sequelas cicatriciais'
      ],
      examesIniciais: [
        'Biopsia cutanea ou mucosa',
        'Sorologias: HCV, HBV, HIV',
        'Hemograma, funcao hepatica',
        'Glicemia'
      ],
      redFlags: [
        'Liquen plano erosivo oral (risco de CEC)',
        'Liquen plano pilar (alopecia cicatricial)',
        'Associacao com hepatite C',
        'Acometimento esofagico'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,5-1% da populacao',
        incidencia: 'Pico: 30-60 anos',
        faixaEtaria: 'Adultos; raro em criancas',
        fatoresRisco: [
          'Infeccao por HCV (10-15x mais risco)',
          'Drogas (anti-hipertensivos, AINEs, ouro)',
          'Estresse',
          'Predisposicao genetica'
        ],
        citations: [{ refId: 'jaad-lp-2022' }]
      },
      fisiopatologia: {
        texto: 'Reacao imunomediada por linfocitos T citotoxicos contra queratinocitos basais. Apoptose e infiltrado liquenoide na juncao dermoepidermica. Associacao com HCV sugere mimetismo molecular.',
        citations: [{ refId: 'bjd-lp-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Papulas violaceas pruriginosas',
          'Acometimento oral (50-70%)',
          'Acometimento ungueal (10%)',
          'Alopecia no couro cabeludo',
          'Resolucao com hiperpigmentacao'
        ],
        sinaisExameFisico: [
          'Papulas poligonais violaceas brilhantes',
          'Estrias de Wickham',
          'Lesoes orais rendilhadas ou erosivas',
          'Onicodistrofia, pterígio ungueal',
          'Alopecia cicatricial (LP pilar)'
        ],
        formasClinicas: [
          'LP cutaneo classico',
          'LP oral (reticular, erosivo)',
          'LP ungueal',
          'LP pilar (couro cabeludo)',
          'LP bolhoso, LP hipertrofico'
        ],
        citations: [{ refId: 'jaad-lp-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clinica caracteristica',
          'Histopatologia: dermatite de interface',
          'Corpos de Civatte (queratinocitos apoptoticos)'
        ],
        diagnosticoDiferencial: [
          'Reacao liquenoide a drogas',
          'Psoriase',
          'Leucoplasia oral',
          'Lupus cutaneo',
          'Pitiríase rosea'
        ],
        examesLaboratoriais: [
          'Biopsia cutanea/mucosa',
          'Sorologia HCV, HBV',
          'Funcao hepatica',
          'Glicemia'
        ],
        citations: [{ refId: 'bjd-lp-2023' }]
      },
      tratamento: {
        objetivos: [
          'Controle do prurido',
          'Resolucao das lesoes',
          'Prevencao de sequelas'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar trauma cutaneo',
            'Higiene oral suave',
            'Cessar drogas suspeitas',
            'Tratar HCV se presente'
          ],
          citations: [{ refId: 'jaad-lp-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide topico', medicamentos: ['Clobetasol', 'Betametasona'], posologia: '1-2x/dia por 2-4 semanas', observacoes: 'Cutaneo localizado' },
            { classe: 'Corticoide topico oral', medicamentos: ['Triancinolona orabase'], posologia: '2-3x/dia nas lesoes orais', observacoes: 'LP oral' }
          ],
          segundaLinha: [
            { classe: 'Corticoide sistemico', medicamentos: ['Prednisona'], posologia: '0,5-1mg/kg/dia por 4-6 semanas', observacoes: 'Doenca extensa ou erosiva grave' },
            { classe: 'Imunomodulador', medicamentos: ['Acitretina', 'Metotrexato', 'Ciclosporina'], posologia: 'Acitretina 25-50mg/dia', observacoes: 'Refratarios; LP hipertrofico' }
          ],
          situacoesEspeciais: [
            { situacao: 'LP erosivo oral grave', conduta: 'Tacrolimo topico 0,1% + corticoide sistemico' },
            { situacao: 'LP pilar', conduta: 'Corticoide intralesional + hidroxicloroquina' }
          ],
          citations: [{ refId: 'bjd-lp-2023' }]
        },
        duracao: 'Autolimitado em 12-18 meses (cutaneo); oral pode ser cronico'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal em fase ativa; semestral em oral cronico',
        examesControle: [
          'Avaliacao clinica',
          'Funcao hepatica (se HCV ou sistemico)',
          'Monitoramento de transformacao maligna em oral erosivo'
        ],
        metasTerapeuticas: [
          'Resolucao das lesoes cutaneas',
          'Controle do LP oral',
          'Ausencia de sequelas cicatriciais'
        ],
        criteriosEncaminhamento: [
          'LP oral erosivo',
          'LP pilar (alopecia cicatricial)',
          'Doenca extensa',
          'Refratariedade a topicos'
        ],
        citations: [{ refId: 'jaad-lp-2022' }]
      },
      prevencao: {
        primaria: [
          'Rastreio e tratamento de HCV'
        ],
        secundaria: [
          'Vigilancia de LP oral erosivo (risco CEC)',
          'Tratamento de HCV se presente'
        ],
        citations: [{ refId: 'bjd-lp-2023' }]
      }
    },
    protocolos: ['liquen-plano-manejo'],
    medicamentos: ['clobetasol', 'tacrolimo', 'acitretina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'jaad-lp-2022' }, { refId: 'bjd-lp-2023' }],
    lastUpdate: '2025-01',
    tags: ['liquen-plano', 'liquenoide', 'wickham', 'hcv']
  },

  // ============================================================================
  // ESCLERODERMIA LOCALIZADA
  // ============================================================================
  {
    id: 'morfeia',
    titulo: 'Esclerodermia Localizada/Morfeia',
    sinonimos: ['Morphea', 'Localized scleroderma', 'Esclerodermia circunscrita'],
    doid: 'DOID:8565',
    snomedCT: '201048007',
    meshId: 'D012594',
    umlsCui: 'C0036421',
    ciap2: ['S99'],
    cid10: ['L94.0', 'L94.1'],
    cid11: ['EM10'],
    categoria: 'dermatologico',
    subcategoria: 'esclerosantes',
    quickView: {
      definicao: 'Doenca fibrosante localizada da pele caracterizada por placas escleróticas circunscritas. Diferente da esclerose sistemica, nao apresenta fenomeno de Raynaud ou acometimento visceral.',
      criteriosDiagnosticos: [
        'Placas com centro esbranquicado/marfim',
        'Halo violaceo (anel lilas) em lesoes ativas',
        'Esclerose/endurecimento cutaneo',
        'Atrofia em fases tardias',
        'Ausencia de Raynaud e esclerodactilia',
        'Ausencia de acometimento sistemico'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Fototerapia UVA1',
          'Fisioterapia (se contratura)',
          'Hidratacao cutanea'
        ],
        farmacologico: [
          'SUPERFICIAL: Corticoide topico potente + tacrolimo',
          'PROFUNDA/PROGRESSIVA: Metotrexato + corticoide sistemico',
          'ATIVA (HALO LILAS): Corticoide sistemico pulsos',
          'Calcipotriol topico (adjuvante)'
        ]
      },
      metasTerapeuticas: [
        'Cessacao da progressao',
        'Amolecimento das lesoes',
        'Prevencao de contraturas'
      ],
      examesIniciais: [
        'Biopsia cutanea (fase ativa)',
        'Hemograma, VHS, PCR',
        'ANA, anti-ssDNA (podem estar positivos)',
        'Avaliacao de extensao (fotografias)'
      ],
      redFlags: [
        'Morfeia generalizada',
        'Morfeia linear em face (en coup de sabre)',
        'Morfeia profunda com contratura',
        'Morfeia panesclerótica (risco de CEC)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,4-2,7/100.000',
        incidencia: '0,4-2,7/100.000/ano',
        faixaEtaria: 'Dois picos: infancia e 40-50 anos',
        fatoresRisco: [
          'Trauma local',
          'Radiacao',
          'Infeccao por Borrelia (controverso)',
          'Sexo feminino 2,4:1'
        ],
        citations: [{ refId: 'jaad-morphea-2022' }]
      },
      fisiopatologia: {
        texto: 'Ativacao de fibroblastos com deposicao excessiva de colageno na derme. Fase inflamatoria inicial (infiltrado linfocitário) seguida de fibrose. Diferente da esclerose sistêmica, nao ha vasculopatia sistêmica.',
        citations: [{ refId: 'rheumatology-morphea-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Placas endurecidas indolores',
          'Centro esbranquicado (marfim)',
          'Halo violaceo (atividade)',
          'Atrofia tardia',
          'Geralmente assintomatico'
        ],
        sinaisExameFisico: [
          'Placas circunscritas com esclerose',
          'Pele brilhante, nao pregueavel',
          'Halo lilas na periferia (ativa)',
          'Atrofia, hiperpigmentacao residual'
        ],
        formasClinicas: [
          'Morfeia em placa (mais comum)',
          'Morfeia generalizada (>=4 placas em >=2 areas)',
          'Morfeia linear (membros, face)',
          'Morfeia profunda (atinge subcutaneo/fascia)',
          'Morfeia panesclerótica (rara, grave)'
        ],
        citations: [{ refId: 'jaad-morphea-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clinica característica',
          'Biopsia: fibrose dermica, infiltrado perivascular',
          'Exclusao de esclerose sistemica'
        ],
        diagnosticoDiferencial: [
          'Esclerose sistemica',
          'Escleromixedema',
          'Lipodermatoesclerose',
          'Fasciíte eosinofilica',
          'Dermite fibrosante nefrogenica'
        ],
        examesLaboratoriais: [
          'ANA (positivo em 20-40%)',
          'Anti-histona, anti-ssDNA',
          'Hemograma, VHS',
          'Anti-Scl70, anticentromero (negativos)'
        ],
        examesImagem: [
          'RM (morfeia profunda/linear)',
          'USG cutanea (espessura da pele)'
        ],
        citations: [{ refId: 'rheumatology-morphea-2023' }]
      },
      tratamento: {
        objetivos: [
          'Cessar progressao',
          'Amolecer lesoes ativas',
          'Prevenir sequelas funcionais'
        ],
        naoFarmacologico: {
          medidas: [
            'Fototerapia UVA1 (20-80 J/cm2)',
            'Fisioterapia em morfeia linear com contratura',
            'Hidratacao cutanea'
          ],
          citations: [{ refId: 'jaad-morphea-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide topico', medicamentos: ['Clobetasol', 'Mometasona'], posologia: '1x/dia em lesoes ativas', observacoes: 'Morfeia superficial limitada' },
            { classe: 'Inibidor calcineurina', medicamentos: ['Tacrolimo 0,1%'], posologia: '2x/dia', observacoes: 'Adjuvante ou face' }
          ],
          segundaLinha: [
            { classe: 'Imunomodulador sistemico', medicamentos: ['Metotrexato'], posologia: '15-25mg/semana', observacoes: 'Morfeia linear, profunda ou progressiva' },
            { classe: 'Corticoide sistemico', medicamentos: ['Prednisona'], posologia: '0,5-1mg/kg/dia por 3 meses', observacoes: 'Combinado com MTX em fases ativas' }
          ],
          situacoesEspeciais: [
            { situacao: 'Morfeia linear craniana', conduta: 'MTX + corticoide; monitorar SNC' },
            { situacao: 'Morfeia panesclerótica', conduta: 'MTX + corticoide; considerar MMF' }
          ],
          citations: [{ refId: 'rheumatology-morphea-2023' }]
        },
        duracao: 'Ativa por 3-5 anos; tratamento conforme atividade'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal em fase ativa; trimestral em inativa',
        examesControle: [
          'Fotografias seriadas',
          'LoSSI (escore de atividade)',
          'mLoSSI (escore de dano)',
          'RM se morfeia profunda/linear'
        ],
        metasTerapeuticas: [
          'Desaparecimento do halo violaceo',
          'Amolecimento das placas',
          'Ausencia de novas lesoes'
        ],
        criteriosEncaminhamento: [
          'Morfeia linear em crianca',
          'Morfeia profunda ou generalizada',
          'Envolvimento articular',
          'Morfeia craniana (en coup de sabre)'
        ],
        citations: [{ refId: 'jaad-morphea-2022' }]
      },
      prevencao: {
        primaria: [
          'Nao ha prevencao primária conhecida'
        ],
        secundaria: [
          'Tratamento precoce em fases ativas',
          'Fisioterapia para prevenir contraturas'
        ],
        citations: [{ refId: 'rheumatology-morphea-2023' }]
      }
    },
    protocolos: ['morfeia-manejo'],
    medicamentos: ['metotrexato', 'clobetasol', 'tacrolimo'],
    calculadoras: ['lossi', 'mlossi'],
    rastreamentos: [],
    citations: [{ refId: 'jaad-morphea-2022' }, { refId: 'rheumatology-morphea-2023' }],
    lastUpdate: '2025-01',
    tags: ['morfeia', 'esclerodermia-localizada', 'fibrose', 'metotrexato']
  },

  // ============================================================================
  // URTICARIA
  // ============================================================================
  {
    id: 'urticaria-cronica-espontanea',
    titulo: 'Urticaria Cronica Espontanea',
    sinonimos: ['UCE', 'Chronic spontaneous urticaria', 'Urticaria cronica idiopatica'],
    doid: 'DOID:1555',
    snomedCT: '402408009',
    meshId: 'D014581',
    umlsCui: 'C0042109',
    ciap2: ['S98'],
    cid10: ['L50.1'],
    cid11: ['EB05.0'],
    categoria: 'dermatologico',
    subcategoria: 'urticarias',
    quickView: {
      definicao: 'Urticaria com urticas e/ou angioedema recorrentes por mais de 6 semanas sem gatilho externo identificavel. Mecanismo autoimune em 30-50% dos casos.',
      criteriosDiagnosticos: [
        'Urticas pruriginosas recorrentes',
        'Duracao >6 semanas',
        'Lesoes evanescem em <24h',
        'Sem gatilho externo identificavel',
        'Angioedema em 40-50%',
        'Dermografismo frequente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar AINEs (podem piorar)',
          'Evitar alcool, estresse excessivo',
          'Diario de sintomas'
        ],
        farmacologico: [
          'PRIMEIRA LINHA: Anti-H1 2a geracao dose padrao',
          'SEGUNDA LINHA: Anti-H1 2a geracao ate 4x dose',
          'TERCEIRA LINHA: Omalizumabe (anti-IgE)',
          'QUARTA LINHA: Ciclosporina'
        ]
      },
      metasTerapeuticas: [
        'UAS7 = 0 (controle completo)',
        'Ausencia de angioedema',
        'Qualidade de vida preservada'
      ],
      examesIniciais: [
        'Hemograma, VHS, PCR',
        'TSH, anticorpos antitireoidianos',
        'IgE total',
        'Proteina C reativa'
      ],
      redFlags: [
        'Angioedema isolado sem urticas (excluir hereditario)',
        'Lesoes que duram >24h (vasculite urticariforme)',
        'Sintomas sistemicos (febre, artralgia)',
        'Refratariedade a anti-H1'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,5-5% da populacao (ponto)',
        incidencia: 'Risco ao longo da vida: 20%',
        faixaEtaria: 'Adultos jovens e meia-idade; mulheres 2:1',
        fatoresRisco: [
          'Atopia',
          'Doencas autoimunes',
          'Estresse',
          'Infeccoes cronicas'
        ],
        citations: [{ refId: 'eaaci-urticaria-2022' }]
      },
      fisiopatologia: {
        texto: 'Degranulacao de mastocitos cutaneos liberando histamina e outros mediadores. Mecanismo autoimune (anti-FceRI ou anti-IgE) em 30-50%. Ativacao de via da coagulacao e complemento.',
        citations: [{ refId: 'jaci-urticaria-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Urticas eritematosas pruriginosas',
          'Lesoes evanescem em <24h',
          'Angioedema (labios, palpebras, genitais)',
          'Prurido intenso',
          'Sintomas flutuantes'
        ],
        sinaisExameFisico: [
          'Urticas elevadas, eritematosas',
          'Tamanho variavel (mm a cm)',
          'Qualquer localizacao',
          'Dermografismo',
          'Edema profundo (angioedema)'
        ],
        formasClinicas: [
          'UCE isolada',
          'UCE + urticaria induzivel',
          'UCE + angioedema',
          'Angioedema cronico isolado'
        ],
        citations: [{ refId: 'eaaci-urticaria-2022' }]
      },
      diagnostico: {
        criterios: [
          'Urticas espontaneas >=6 semanas',
          'Exclusao de causas induziveis',
          'Avaliacao de gravidade: UAS7'
        ],
        diagnosticoDiferencial: [
          'Urticarias induziveis (frio, pressao, solar)',
          'Vasculite urticariforme',
          'Mastocitose',
          'Angioedema hereditario',
          'Sindrome de Schnitzler'
        ],
        examesLaboratoriais: [
          'Hemograma, VHS, PCR',
          'TSH, anti-TPO',
          'IgE total',
          'Complemento (se angioedema isolado)'
        ],
        citations: [{ refId: 'jaci-urticaria-2023' }]
      },
      tratamento: {
        objetivos: [
          'Controle completo (UAS7=0)',
          'Qualidade de vida preservada',
          'Minimizar efeitos adversos'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar AINEs',
            'Evitar gatilhos identificados',
            'Diario de sintomas'
          ],
          citations: [{ refId: 'eaaci-urticaria-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anti-H1 2a geracao', medicamentos: ['Cetirizina', 'Loratadina', 'Bilastina', 'Fexofenadina'], posologia: 'Dose padrao 1x/dia', observacoes: 'Primeira linha universal' }
          ],
          segundaLinha: [
            { classe: 'Anti-H1 2a geracao dose alta', medicamentos: ['Cetirizina', 'Bilastina'], posologia: 'Ate 4x a dose padrao', observacoes: 'Se sem resposta em 2-4 semanas' },
            { classe: 'Biologico anti-IgE', medicamentos: ['Omalizumabe'], posologia: '300mg SC a cada 4 semanas', observacoes: 'Terceira linha; alta eficacia' }
          ],
          situacoesEspeciais: [
            { situacao: 'Refratario a omalizumabe', conduta: 'Ciclosporina 3-5mg/kg/dia' },
            { situacao: 'Exacerbacao aguda', conduta: 'Corticoide sistemico breve (3-7 dias)' }
          ],
          citations: [{ refId: 'jaci-urticaria-2023' }]
        },
        duracao: 'Cronico; 30-50% resolvem em 1-5 anos'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal ate controle; depois trimestral',
        examesControle: [
          'UAS7 (atividade semanal)',
          'UCT (controle do tratamento)',
          'AE-QoL (qualidade de vida)'
        ],
        metasTerapeuticas: [
          'UAS7 = 0',
          'UCT >= 12',
          'Sem necessidade de corticoide'
        ],
        criteriosEncaminhamento: [
          'Falha a anti-H1 dose alta',
          'Necessidade de omalizumabe',
          'Angioedema recorrente',
          'Suspeita de vasculite'
        ],
        citations: [{ refId: 'eaaci-urticaria-2022' }]
      },
      prevencao: {
        primaria: [
          'Nao ha prevencao primária conhecida'
        ],
        secundaria: [
          'Evitar AINEs e gatilhos conhecidos',
          'Manutencao do tratamento anti-histaminico'
        ],
        citations: [{ refId: 'jaci-urticaria-2023' }]
      }
    },
    protocolos: ['urticaria-cronica-manejo'],
    medicamentos: ['cetirizina', 'bilastina', 'omalizumabe'],
    calculadoras: ['uas7', 'uct', 'ae-qol'],
    rastreamentos: [],
    citations: [{ refId: 'eaaci-urticaria-2022' }, { refId: 'jaci-urticaria-2023' }],
    lastUpdate: '2025-01',
    tags: ['urticaria', 'cronica', 'omalizumabe', 'anti-histaminico']
  },

  // ============================================================================
  // ROSACEA
  // ============================================================================
  {
    id: 'rosacea',
    titulo: 'Rosacea',
    sinonimos: ['Acne rosacea', 'Couperose'],
    doid: 'DOID:1580',
    snomedCT: '398909004',
    meshId: 'D012393',
    umlsCui: 'C0035854',
    ciap2: ['S99'],
    cid10: ['L71', 'L71.0', 'L71.1', 'L71.8', 'L71.9'],
    cid11: ['ED80.1'],
    categoria: 'dermatologico',
    subcategoria: 'inflamatorias_faciais',
    quickView: {
      definicao: 'Dermatose inflamatoria cronica facial caracterizada por flushing, eritema persistente, papulopustulas e telangiectasias. Pode evoluir para rinofima.',
      criteriosDiagnosticos: [
        'FENOTIPOS (nova classificacao):',
        'Eritema centrofacial persistente (diagnostico)',
        'Flushing/rubor intermitente',
        'Papulopustulas inflamatorias',
        'Telangiectasias',
        'Alteracoes fimatosas (rinofima)',
        'Manifestacoes oculares'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar gatilhos (sol, calor, alcool, especiarias)',
          'Fotoprotecao rigorosa',
          'Produtos skincare suaves, sem alcool',
          'Laser/IPL para telangiectasias'
        ],
        farmacologico: [
          'ERITEMA: Brimonidina gel 0,33%',
          'PAPULOPUSTULAS: Metronidazol topico 0,75-1%',
          'MODERADA: Ivermectina creme 1%',
          'GRAVE: Doxiciclina 40mg MR ou 100mg/dia'
        ]
      },
      metasTerapeuticas: [
        'Reducao do eritema',
        'Controle de papulopustulas',
        'Melhora estetica e qualidade de vida'
      ],
      examesIniciais: [
        'Diagnostico clinico',
        'Dermoscopia (Demodex)',
        'Excluir lupus se duvida'
      ],
      redFlags: [
        'Rosacea ocular (blefarite, ceratite)',
        'Rinofima progressivo',
        'Rosacea granulomatosa',
        'Rosacea fulminans'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-10% da populacao (varia por etnia)',
        incidencia: 'Mais comum em caucasianos',
        faixaEtaria: '30-50 anos; mulheres mais afetadas',
        fatoresRisco: [
          'Pele clara (fototipo I-II)',
          'Historia familiar',
          'Exposicao solar',
          'H. pylori (controverso)',
          'Demodex folliculorum'
        ],
        citations: [{ refId: 'jaad-rosacea-2023' }]
      },
      fisiopatologia: {
        texto: 'Desregulacao neurovascular, imune inata (catelicidinas), Demodex e microbioma. Sistema nervoso simpatico hiper-reativo causa flushing. Inflamacao cronica leva a fibrose (fimas).',
        citations: [{ refId: 'bjd-rosacea-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Flushing recorrente',
          'Eritema centrofacial persistente',
          'Papulas e pustulas (sem comedoes)',
          'Telangiectasias',
          'Sensacao de ardencia, sensibilidade cutanea'
        ],
        sinaisExameFisico: [
          'Eritema centrofacial (nariz, bochechas)',
          'Telangiectasias',
          'Papulopustulas inflamatorias',
          'Ausencia de comedoes (diferente de acne)',
          'Rinofima (estagio avancado)'
        ],
        formasClinicas: [
          'Rosacea eritemato-telangiectatica',
          'Rosacea papulopustulosa',
          'Rosacea fimatosa (rinofima)',
          'Rosacea ocular'
        ],
        citations: [{ refId: 'jaad-rosacea-2023' }]
      },
      diagnostico: {
        criterios: [
          'Fenotipos diagnosticos (classificacao 2017)',
          'Eritema centrofacial persistente OU alteracoes fimatosas',
          'Fenotipos maiores e menores de suporte'
        ],
        diagnosticoDiferencial: [
          'Lupus eritematoso',
          'Dermatite seborreica',
          'Acne vulgar',
          'Dermatite perioral',
          'Demodicose'
        ],
        examesLaboratoriais: [
          'Geralmente desnecessarios',
          'ANA, anti-dsDNA se suspeita de lupus'
        ],
        citations: [{ refId: 'bjd-rosacea-2022' }]
      },
      tratamento: {
        objetivos: [
          'Controle do eritema e flushing',
          'Reducao de papulopustulas',
          'Prevencao de progressao fimatosa'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar gatilhos conhecidos',
            'Fotoprotecao FPS alto',
            'Skincare suave (sem alcool/fragrancias)',
            'Laser/IPL para telangiectasias',
            'Cirurgia para rinofima'
          ],
          citations: [{ refId: 'jaad-rosacea-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Vasoconstritor topico', medicamentos: ['Brimonidina gel 0,33%'], posologia: '1x/dia', observacoes: 'Para eritema; efeito transitorio' },
            { classe: 'Antimicrobiano topico', medicamentos: ['Metronidazol 0,75-1%', 'Ivermectina 1%'], posologia: '1-2x/dia', observacoes: 'Para papulopustulas' }
          ],
          segundaLinha: [
            { classe: 'Tetraciclina oral', medicamentos: ['Doxiciclina'], posologia: '40mg MR/dia ou 100mg/dia', observacoes: 'Anti-inflamatorio; papulopustulas moderadas' },
            { classe: 'Retinoide topico', medicamentos: ['Acido azelaico 15%'], posologia: '2x/dia', observacoes: 'Alternativa para papulopustulas' }
          ],
          situacoesEspeciais: [
            { situacao: 'Rosacea ocular', conduta: 'Higiene palpebral + doxiciclina oral + ciclosporina colirio' },
            { situacao: 'Rosacea fulminans', conduta: 'Isotretinoina + corticoide sistemico breve' }
          ],
          citations: [{ refId: 'bjd-rosacea-2022' }]
        },
        duracao: 'Cronico; tratamento de manutencao necessario'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 2-3 meses inicialmente; depois semestral',
        examesControle: [
          'Avaliacao clinica',
          'Fotografias seriadas',
          'Avaliacao oftalmologica se rosacea ocular'
        ],
        metasTerapeuticas: [
          'Reducao de eritema e flushing',
          'Controle de papulopustulas',
          'Prevencao de fimas'
        ],
        criteriosEncaminhamento: [
          'Rosacea ocular',
          'Rinofima (cirurgia)',
          'Rosacea refrataria',
          'Rosacea fulminans'
        ],
        citations: [{ refId: 'jaad-rosacea-2023' }]
      },
      prevencao: {
        primaria: [
          'Fotoprotecao desde jovem em pessoas de risco'
        ],
        secundaria: [
          'Evitar gatilhos conhecidos',
          'Tratamento precoce',
          'Manutencao para prevenir progressao'
        ],
        citations: [{ refId: 'bjd-rosacea-2022' }]
      }
    },
    protocolos: ['rosacea-manejo'],
    medicamentos: ['metronidazol-topico', 'ivermectina', 'doxiciclina', 'brimonidina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'jaad-rosacea-2023' }, { refId: 'bjd-rosacea-2022' }],
    lastUpdate: '2025-01',
    tags: ['rosacea', 'eritema', 'rinofima', 'flushing']
  },

  // ============================================================================
  // ACNE
  // ============================================================================
  {
    id: 'acne-vulgar-grave',
    titulo: 'Acne Vulgar Grave',
    sinonimos: ['Acne nodulocistica', 'Acne conglobata', 'Severe acne'],
    doid: 'DOID:6543',
    snomedCT: '88616000',
    meshId: 'D000152',
    umlsCui: 'C0001144',
    ciap2: ['S96'],
    cid10: ['L70.0', 'L70.1'],
    cid11: ['ED80.0'],
    categoria: 'dermatologico',
    subcategoria: 'acne',
    quickView: {
      definicao: 'Forma grave de acne com nodulos, cistos, abscessos e alto risco de cicatrizes. Requer tratamento sistemico, geralmente isotretinoina oral.',
      criteriosDiagnosticos: [
        'Comedoes, papulas e pustulas',
        'Nodulos inflamatorios (>5mm)',
        'Cistos e abscessos',
        'Formacao de cicatrizes',
        'Acometimento face, tronco',
        'Classificacao: grau IV (nodulocistica)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Limpeza suave 2x/dia',
          'Cosmeticos nao-comedogenicos',
          'Nao manipular lesoes'
        ],
        farmacologico: [
          'TOPICO: Retinoide + peroxido de benzoila + antibiotico',
          'ORAL: Isotretinoina 0,5-1mg/kg/dia (padrao-ouro)',
          'ALTERNATIVA: Doxiciclina + retinóide tópico',
          'MULHERES: Anticoncepcional antiandrogênico'
        ]
      },
      metasTerapeuticas: [
        'Resolucao das lesoes inflamatorias',
        'Prevencao de cicatrizes',
        'Manutencao da remissao'
      ],
      examesIniciais: [
        'Funcao hepatica (TGO/TGP)',
        'Perfil lipidico',
        'Beta-HCG (mulheres)',
        'Hemograma'
      ],
      redFlags: [
        'Acne fulminans (febre, artralgia, leucocitose)',
        'Acne conglobata extensa',
        'Cicatrizes graves em formacao',
        'Depressao/ideacao suicida'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '85% dos adolescentes tem algum grau; 15-20% moderada-grave',
        incidencia: 'Pico: 14-17 anos (mulheres) e 16-19 anos (homens)',
        faixaEtaria: 'Adolescencia e adulto jovem',
        fatoresRisco: [
          'Historia familiar',
          'Puberdade',
          'Sindrome dos ovarios policisticos',
          'Cosmeticos comedogenicos',
          'Dieta (alta carga glicemica, laticinios)'
        ],
        citations: [{ refId: 'jaad-acne-2023' }]
      },
      fisiopatologia: {
        texto: 'Quatro fatores: hiperqueratinizacao folicular, hipersecrecao sebacea (androgenos), colonizacao por C. acnes, inflamacao. Nodulos/cistos resultam de ruptura folicular com resposta granulomatosa.',
        citations: [{ refId: 'lancet-acne-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Lesoes polimorfica (comeao-papula-pustula-nodulo)',
          'Nodulos dolorosos profundos',
          'Cistos com conteudo caseoso',
          'Cicatrizes em formacao',
          'Impacto psicologico significativo'
        ],
        sinaisExameFisico: [
          'Comedoes abertos e fechados',
          'Papulas e pustulas inflamatorias',
          'Nodulos >5mm',
          'Cistos flutuantes',
          'Cicatrizes atroficas, hipertroficas, ice-pick'
        ],
        formasClinicas: [
          'Acne nodulocistica (grau IV)',
          'Acne conglobata (nodulos comunicantes)',
          'Acne fulminans (sistemica, febril)'
        ],
        citations: [{ refId: 'jaad-acne-2023' }]
      },
      diagnostico: {
        criterios: [
          'Clinico: lesoes tipicas em areas seborreicas',
          'Classificacao de gravidade (Leeds, GEA)',
          'Avaliacao de cicatrizes'
        ],
        diagnosticoDiferencial: [
          'Rosacea papulopustulosa',
          'Foliculite bacteriana',
          'Dermatite perioral',
          'Milia',
          'Acne medicamentosa'
        ],
        examesLaboratoriais: [
          'TGO/TGP, perfil lipidico (pre-isotretinoina)',
          'Beta-HCG (mulheres)',
          'Androgenios (se SOP/hiperandrogenismo)'
        ],
        citations: [{ refId: 'lancet-acne-2022' }]
      },
      tratamento: {
        objetivos: [
          'Resolucao das lesoes',
          'Prevencao de cicatrizes',
          'Manutencao de remissao'
        ],
        naoFarmacologico: {
          medidas: [
            'Limpeza suave',
            'Evitar manipulacao',
            'Cosmeticos oil-free',
            'Suporte psicologico'
          ],
          citations: [{ refId: 'jaad-acne-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Retinoide oral', medicamentos: ['Isotretinoina'], posologia: '0,5-1mg/kg/dia por 4-6 meses (dose acumulada 120-150mg/kg)', observacoes: 'Padrao-ouro para acne grave; teratogenico' }
          ],
          segundaLinha: [
            { classe: 'Antibiotico oral', medicamentos: ['Doxiciclina', 'Limeciclina'], posologia: 'Doxiciclina 100mg/dia por 3-4 meses', observacoes: 'Se contraindicacao a isotretinoina' },
            { classe: 'Hormonal', medicamentos: ['Ciproterona + etinilestradiol', 'Espironolactona'], posologia: 'Diane 35 ou similares', observacoes: 'Mulheres com hiperandrogenismo' }
          ],
          situacoesEspeciais: [
            { situacao: 'Acne fulminans', conduta: 'Prednisona 0,5mg/kg + isotretinoina dose baixa' },
            { situacao: 'Gestacao', conduta: 'Eritromicina topica; evitar retinoides e tetraciclinas' }
          ],
          citations: [{ refId: 'lancet-acne-2022' }]
        },
        duracao: 'Isotretinoina: 4-6 meses; remissao duradoura em 80%'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal durante isotretinoina; depois conforme necessidade',
        examesControle: [
          'TGO/TGP, perfil lipidico mensais (isotretinoina)',
          'Beta-HCG mensal (mulheres)',
          'Avaliacao de humor'
        ],
        metasTerapeuticas: [
          'Clearance ou near-clearance',
          'Ausencia de novas cicatrizes',
          'Dose acumulada adequada'
        ],
        criteriosEncaminhamento: [
          'Acne nodulocistica',
          'Formacao de cicatrizes',
          'Falha a antibioticos orais',
          'Necessidade de isotretinoina'
        ],
        citations: [{ refId: 'jaad-acne-2023' }]
      },
      prevencao: {
        primaria: [
          'Skincare nao-comedogenico',
          'Tratamento precoce de acne leve'
        ],
        secundaria: [
          'Tratamento adequado para prevenir cicatrizes',
          'Manutencao pos-isotretinoina com retinoides topicos'
        ],
        citations: [{ refId: 'lancet-acne-2022' }]
      }
    },
    protocolos: ['acne-grave-manejo'],
    medicamentos: ['isotretinoina', 'doxiciclina', 'adapaleno'],
    calculadoras: ['gea-score'],
    rastreamentos: [],
    citations: [{ refId: 'jaad-acne-2023' }, { refId: 'lancet-acne-2022' }],
    lastUpdate: '2025-01',
    tags: ['acne', 'isotretinoina', 'nodulocistica', 'cicatrizes']
  }
];
