/**
 * DOENCAS HEMATOLOGICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ==========================================================
 * Neoplasias mieloproliferativas, coagulopatias, anemias hemoliticas
 * e doencas hematologicas raras
 *
 * Ontologias integradas:
 * - DOID (Disease Ontology)
 * - SNOMED-CT (Systematized Nomenclature of Medicine)
 * - MeSH (Medical Subject Headings)
 * - UMLS CUI (Unified Medical Language System)
 * - ORDO (Orphanet Rare Disease Ontology) para doencas raras
 */

import { Doenca } from '@/lib/types/doenca';

export const hematologicasAvancadas: Doenca[] = [
  // ============================================================================
  // NEOPLASIAS MIELOPROLIFERATIVAS
  // ============================================================================
  {
    id: 'policitemia-vera',
    titulo: 'Policitemia Vera',
    sinonimos: ['PV', 'Policitemia rubra vera', 'Doenca de Vaquez', 'Eritremia'],
    doid: 'DOID:8997',
    snomedCT: '109989006',
    meshId: 'D011087',
    umlsCui: 'C0032463',
    ordo: ['ORPHA:729'],
    ciap2: ['B73'],
    cid10: ['D45'],
    cid11: ['2A20.1'],
    categoria: 'hematologico',
    subcategoria: 'neoplasia_mieloproliferativa',
    quickView: {
      definicao: 'Neoplasia mieloproliferativa cronica caracterizada por producao excessiva de eritrocitos, leucocitos e plaquetas, com mutacao JAK2 V617F presente em >95% dos casos. Risco aumentado de trombose e transformacao para mielofibrose ou leucemia aguda.',
      criteriosDiagnosticos: [
        'CRITERIOS OMS 2022 - TODOS OS 3 MAIORES OU 2 MAIORES + 1 MENOR:',
        'MAIORES:',
        '- Hb >16,5 g/dL (homem) ou >16 g/dL (mulher), ou Ht >49% (H) / >48% (M)',
        '- Biopsia de medula: hipercelularidade com panmielose trilinear',
        '- Mutacao JAK2 V617F ou JAK2 exon 12',
        'MENOR:',
        '- Eritropoietina serica subnormal'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Flebotomia para manter Ht <45%',
          'Hidratacao adequada',
          'Evitar tabagismo',
          'Controle rigoroso de fatores de risco cardiovascular'
        ],
        farmacologico: [
          'BAIXO RISCO (<60 anos, sem trombose previa):',
          'AAS 100mg/dia + Flebotomia',
          '',
          'ALTO RISCO (>=60 anos OU trombose previa):',
          'Hidroxiureia 15-20mg/kg/dia (primeira linha)',
          'AAS 100mg/dia + Flebotomia',
          '',
          'INTOLERANCIA/RESISTENCIA A HIDROXIUREIA:',
          'Ruxolitinibe 10mg 2x/dia (inibidor JAK1/2)',
          'Interferon-alfa peguilado (especialmente <60 anos)'
        ]
      },
      metasTerapeuticas: [
        'Hematocrito <45% (reduz risco trombotico)',
        'Plaquetas <400.000/uL',
        'Leucocitos <10.000/uL',
        'Resolucao de sintomas constitucionais',
        'Prevencao de eventos tromboticos'
      ],
      examesIniciais: [
        'Hemograma completo',
        'Mutacao JAK2 V617F (presente em >95%)',
        'Se JAK2 V617F negativo: JAK2 exon 12',
        'Eritropoietina serica',
        'Ferritina e saturacao de transferrina',
        'Biopsia de medula ossea',
        'LDH, acido urico',
        'Ultrassom abdominal (esplenomegalia)'
      ],
      redFlags: [
        'Trombose arterial ou venosa (AVC, IAM, TVP, Budd-Chiari)',
        'Sangramento paradoxal (plaquetas >1.500.000)',
        'Sintomas de transformacao: febre, sudorese, perda de peso',
        'Esplenomegalia progressiva (mielofibrose)',
        'Blastos no sangue periferico'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '44-57/100.000 habitantes',
        incidencia: '2,3/100.000/ano',
        mortalidade: 'Sobrevida mediana 14-20 anos; risco de transformacao leucemica 2-5%',
        faixaEtaria: 'Mediana 60-65 anos; raro <30 anos',
        fatoresRisco: [
          'Idade avancada',
          'Historia familiar de NMP (raro)',
          'Exposicao a radiacao (historicamente)'
        ],
        citations: [{ refId: 'nejm-mpn-2023' }]
      },
      fisiopatologia: {
        texto: 'Mutacao JAK2 V617F (ou exon 12) causa ativacao constitutiva da via JAK-STAT, levando a proliferacao clonal de celulas hematopoieticas independente de eritropoietina. Resulta em eritrocitose, leucocitose, trombocitose e esplenomegalia.',
        citations: [{ refId: 'blood-pv-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sintomas de hiperviscosidade: cefaleia, tontura, disturbios visuais',
          'Eritromelalgia (dor e eritema em extremidades)',
          'Prurido aquagenico (caracteristico, piora apos banho)',
          'Pletora facial',
          'Fadiga',
          'Sudorese noturna'
        ],
        sinaisExameFisico: [
          'Pletora facial e conjuntival',
          'Esplenomegalia (70%)',
          'Hepatomegalia (40%)',
          'Hipertensao arterial',
          'Eritromelalgia'
        ],
        formasClinicas: [
          'PV classica (eritrocitose + leucocitose + trombocitose)',
          'PV mascarada (ferropenia oculta mantendo Hb normal)',
          'Fase gasosa (pre-policitemia)',
          'Fase mielofibrotica (pos-PV)',
          'Transformacao leucemica'
        ],
        citations: [{ refId: 'ash-pv-guidelines-2023' }]
      },
      diagnostico: {
        criterios: [
          'Criterios OMS 2022',
          '3 criterios maiores OU 2 maiores + menor',
          'JAK2 obrigatorio para diagnostico'
        ],
        diagnosticoDiferencial: [
          'Eritrocitose secundaria (hipoxia, DPOC, apneia do sono)',
          'Eritrocitose por EPO elevada (tumores produtores)',
          'Outras NMP (trombocitemia essencial, mielofibrose)',
          'Eritrocitose congenita',
          'Desidratacao (pseudoeritrocitose)'
        ],
        examesLaboratoriais: [
          'Hemograma: eritrocitose, leucocitose, trombocitose',
          'JAK2 V617F (>95% positivo)',
          'Eritropoietina serica (baixa ou normal-baixa)',
          'Ferritina (frequentemente baixa por turnover)',
          'LDH, acido urico (elevados)',
          'Fosfatase alcalina leucocitaria (elevada)'
        ],
        examesImagem: [
          'Biopsia de medula ossea: hipercelularidade, panmielose',
          'USG abdominal: esplenomegalia, hepatomegalia',
          'Doppler venoso se sintomas'
        ],
        citations: [{ refId: 'who-classification-2022' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir trombose (principal causa de morte)',
          'Controlar sintomas',
          'Retardar progressao para mielofibrose',
          'Manter qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Flebotomia: 300-500mL a cada 2-3 dias ate Ht <45%',
            'Depois manutencao conforme necessidade',
            'Hidratacao adequada',
            'Evitar imobilizacao prolongada'
          ],
          citations: [{ refId: 'ash-pv-guidelines-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiagregante', medicamentos: ['AAS'], posologia: '100mg/dia (todos os pacientes sem contraindicacao)', observacoes: 'Reduz risco trombotico' },
            { classe: 'Citorredutora', medicamentos: ['Hidroxiureia'], posologia: '15-20mg/kg/dia (alto risco)', observacoes: 'Primeira linha para citorreducao' }
          ],
          segundaLinha: [
            { classe: 'Inibidor JAK', medicamentos: ['Ruxolitinibe'], posologia: '10mg 2x/dia, ajustar por resposta', observacoes: 'Intolerancia/resistencia a HU' },
            { classe: 'Interferon', medicamentos: ['Interferon-alfa peguilado', 'Ropeginterferon'], posologia: 'SC semanal ou quinzenal', observacoes: 'Preferido em jovens, gestantes' }
          ],
          situacoesEspeciais: [
            { situacao: 'Gestante', conduta: 'Interferon (seguro); AAS baixa dose; flebotomia' },
            { situacao: 'Trombose aguda', conduta: 'Anticoagulacao + citorreducao urgente + flebotomia' },
            { situacao: 'Prurido refratario', conduta: 'Ruxolitinibe; ISRS; fototerapia PUVA' }
          ],
          citations: [{ refId: 'ejhaem-pv-treatment-2023' }]
        },
        duracao: 'Tratamento cronico, ao longo da vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses se estavel; mais frequente no inicio',
        examesControle: [
          'Hemograma mensal ate estabilizacao, depois trimestral',
          'Ferritina (reposicao se <50 com sintomas)',
          'LDH, acido urico',
          'Biopsia de medula a cada 3-5 anos ou se mudanca clinica'
        ],
        metasTerapeuticas: [
          'Ht <45%',
          'Ausencia de eventos tromboticos',
          'Controle de sintomas'
        ],
        criteriosEncaminhamento: [
          'Todos: hematologista',
          'Transformacao para mielofibrose ou leucemia',
          'Candidato a transplante (raro, casos avancados)',
          'Ensaios clinicos'
        ],
        citations: [{ refId: 'ash-pv-guidelines-2023' }]
      },
      prevencao: {
        primaria: [
          'Nao ha prevencao primaria conhecida'
        ],
        secundaria: [
          'Controle rigoroso do hematocrito',
          'AAS para prevencao de trombose',
          'Controle de fatores de risco cardiovascular'
        ],
        citations: [{ refId: 'blood-pv-2022' }]
      }
    },
    protocolos: ['pv-alto-risco', 'pv-flebotomia'],
    medicamentos: ['hidroxiureia', 'ruxolitinibe', 'interferon-alfa', 'aas'],
    calculadoras: ['ipset-thrombosis'],
    rastreamentos: [],
    citations: [{ refId: 'nejm-mpn-2023' }, { refId: 'who-classification-2022' }],
    lastUpdate: '2026-01',
    tags: ['policitemia', 'JAK2', 'mieloproliferativa', 'eritrocitose', 'trombose']
  },

  {
    id: 'trombocitemia-essencial',
    titulo: 'Trombocitemia Essencial',
    sinonimos: ['TE', 'Trombocitose essencial', 'Trombocitemia primaria'],
    doid: 'DOID:2224',
    snomedCT: '109994006',
    meshId: 'D013920',
    umlsCui: 'C0040028',
    ordo: ['ORPHA:3318'],
    ciap2: ['B73'],
    cid10: ['D47.3'],
    cid11: ['2A20.2'],
    categoria: 'hematologico',
    subcategoria: 'neoplasia_mieloproliferativa',
    quickView: {
      definicao: 'Neoplasia mieloproliferativa cronica caracterizada por trombocitose persistente (>450.000/uL) com mutacoes clonais (JAK2, CALR ou MPL). Apresenta risco de trombose e sangramento paradoxal.',
      criteriosDiagnosticos: [
        'CRITERIOS OMS 2022 - TODOS OS 4 MAIORES OU 3 MAIORES + MENOR:',
        'MAIORES:',
        '- Plaquetas >=450.000/uL persistente',
        '- Biopsia de medula: proliferacao megacariocitica com atipia, sem aumento de serie granulocitica/eritroide',
        '- Nao preenche criterios para PV, MF, LMC, SMD ou outra neoplasia mieloide',
        '- Mutacao JAK2, CALR ou MPL',
        'MENOR:',
        '- Presenca de marcador clonal OU ausencia de causa de trombocitose reativa'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Controle de fatores de risco cardiovascular',
          'Evitar tabagismo',
          'Hidratacao adequada',
          'Evitar imobilizacao prolongada'
        ],
        farmacologico: [
          'MUITO BAIXO RISCO (<60 anos, sem mutacao JAK2, sem trombose):',
          'Observacao',
          '',
          'BAIXO RISCO (<60 anos, JAK2 positivo, sem trombose):',
          'AAS 100mg/dia',
          '',
          'RISCO INTERMEDIARIO (60-65 anos, sem fatores de risco CV):',
          'AAS 100mg/dia (individualizado)',
          '',
          'ALTO RISCO (>=60 anos OU trombose previa):',
          'Hidroxiureia 15mg/kg/dia + AAS 100mg/dia',
          'Anagrelida (se intolerancia a HU)'
        ]
      },
      metasTerapeuticas: [
        'Plaquetas <400.000-600.000/uL (individualizado)',
        'Prevencao de eventos tromboticos',
        'Prevencao de sangramento (evitar >1.000.000)'
      ],
      examesIniciais: [
        'Hemograma completo seriado (confirmar persistencia)',
        'Painel de mutacoes: JAK2 V617F, CALR, MPL',
        'BCR-ABL (excluir LMC)',
        'Ferritina (excluir ferropenia reativa)',
        'PCR, VHS (excluir trombocitose reativa)',
        'Biopsia de medula ossea'
      ],
      redFlags: [
        'Trombose arterial ou venosa',
        'Sangramento (especialmente se plaquetas >1.500.000)',
        'Transformacao para mielofibrose (citopenias, esplenomegalia progressiva)',
        'Sintomas constitucionais progressivos',
        'Leucocitose ou anemia progressiva'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '38-57/100.000',
        incidencia: '1,5-2,5/100.000/ano',
        mortalidade: 'Sobrevida quase normal; risco de transformacao MF 4-11% em 15 anos',
        faixaEtaria: 'Dois picos: 30-40 anos e >60 anos; predominio feminino leve',
        fatoresRisco: [
          'Idade avancada (para eventos tromboticos)',
          'Trombose previa',
          'Mutacao JAK2 V617F'
        ],
        citations: [{ refId: 'blood-et-2021' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes em JAK2 (50-60%), CALR (25-30%) ou MPL (3-5%) causam ativacao constitutiva de vias de sinalizacao que promovem proliferacao megacariocitica. CALR confere menor risco trombotico. Triple-negativo (10%) requer exclusao rigorosa de outras causas.',
        citations: [{ refId: 'nejm-et-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Frequentemente assintomatica (achado incidental)',
          'Sintomas vasomotores: eritromelalgia, cefaleia, disturbios visuais',
          'Trombose venosa ou arterial',
          'Sangramento paradoxal (especialmente >1.500.000)',
          'Fadiga'
        ],
        sinaisExameFisico: [
          'Esplenomegalia leve (40%)',
          'Eritromelalgia',
          'Sinais de trombose se presente'
        ],
        formasClinicas: [
          'TE JAK2 positivo (maior risco trombotico)',
          'TE CALR positivo (menor risco, melhor prognostico)',
          'TE MPL positivo',
          'TE triple-negativo'
        ],
        citations: [{ refId: 'blood-et-2021' }]
      },
      diagnostico: {
        criterios: [
          'OMS 2022',
          'Trombocitose persistente >=450.000',
          'Exclusao de outras NMP e causas reativas'
        ],
        diagnosticoDiferencial: [
          'Trombocitose reativa (infeccao, inflamacao, ferropenia, neoplasia)',
          'Policitemia vera (pode apresentar trombocitose)',
          'Mielofibrose pre-fibrotica (importante distinguir)',
          'LMC (BCR-ABL positivo)',
          'Sindrome mielodisplasica com trombocitose'
        ],
        examesLaboratoriais: [
          'Hemograma seriado',
          'JAK2 V617F, CALR tipo 1 e 2, MPL W515',
          'BCR-ABL (excluir LMC)',
          'Ferritina, PCR, VHS'
        ],
        examesImagem: [
          'Biopsia de medula ossea (essencial para diagnostico)',
          'USG abdominal (baço, figado)'
        ],
        citations: [{ refId: 'who-classification-2022' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir trombose',
          'Evitar sangramento',
          'Retardar transformacao fibrótica'
        ],
        naoFarmacologico: {
          medidas: [
            'Controle de HAS, DM, dislipidemia',
            'Cessacao de tabagismo',
            'Evitar imobilizacao'
          ],
          citations: [{ refId: 'ash-et-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiagregante', medicamentos: ['AAS'], posologia: '100mg/dia se JAK2 positivo ou baixo risco', observacoes: 'Evitar se >1.000.000 (risco sangramento)' },
            { classe: 'Citorredutora', medicamentos: ['Hidroxiureia'], posologia: '15mg/kg/dia (alto risco)', observacoes: 'Primeira linha para citorreducao' }
          ],
          segundaLinha: [
            { classe: 'Inibidor de megacariocitopoiese', medicamentos: ['Anagrelida'], posologia: '0,5mg 2x/dia, titular', observacoes: 'Alternativa a HU; evitar em doenca cardiaca' },
            { classe: 'Interferon', medicamentos: ['Interferon-alfa peguilado'], posologia: 'SC semanal', observacoes: 'Opcao em jovens' }
          ],
          situacoesEspeciais: [
            { situacao: 'Gestante', conduta: 'Interferon + AAS baixa dose; HU contraindicada' },
            { situacao: 'Plaquetas >1.500.000', conduta: 'Suspender AAS (doenca de von Willebrand adquirida); citorreducao urgente' },
            { situacao: 'Trombose em tratamento', conduta: 'Anticoagulacao + intensificar citorreducao' }
          ],
          citations: [{ refId: 'ash-et-2022' }]
        },
        duracao: 'Cronico'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses',
        examesControle: [
          'Hemograma a cada 1-3 meses',
          'Biopsia de medula se suspeita de transformacao'
        ],
        metasTerapeuticas: [
          'Plaquetas <400.000-600.000',
          'Ausencia de eventos tromboticos/hemorragicos'
        ],
        criteriosEncaminhamento: [
          'Todos: hematologista',
          'Transformacao para MF ou leucemia',
          'Refratario/intolerante a tratamento',
          'Gestantes com TE'
        ],
        citations: [{ refId: 'blood-et-2021' }]
      }
    },
    protocolos: ['te-estratificacao-risco', 'te-gestacao'],
    medicamentos: ['hidroxiureia', 'anagrelida', 'interferon-alfa', 'aas'],
    calculadoras: ['ipset-thrombosis', 'ipss-et'],
    rastreamentos: [],
    citations: [{ refId: 'nejm-et-2022' }, { refId: 'blood-et-2021' }],
    lastUpdate: '2026-01',
    tags: ['trombocitemia', 'plaquetas', 'JAK2', 'CALR', 'mieloproliferativa']
  },

  {
    id: 'mielofibrose-primaria',
    titulo: 'Mielofibrose Primaria',
    sinonimos: ['MF primaria', 'Metaplasia mieloide agnogenica', 'Mielofibrose idiopatica cronica'],
    doid: 'DOID:4971',
    snomedCT: '109993000',
    meshId: 'D055728',
    umlsCui: 'C0001815',
    ordo: ['ORPHA:824'],
    ciap2: ['B73'],
    cid10: ['D47.4'],
    cid11: ['2A20.3'],
    categoria: 'hematologico',
    subcategoria: 'neoplasia_mieloproliferativa',
    quickView: {
      definicao: 'Neoplasia mieloproliferativa caracterizada por fibrose progressiva da medula ossea, hematopoiese extramedular (esplenomegalia massiva), citopenias e sintomas constitucionais. Prognostico variavel, com risco de transformacao leucemica.',
      criteriosDiagnosticos: [
        'CRITERIOS OMS 2022 - TODOS OS 3 MAIORES + >=1 MENOR:',
        'MAIORES:',
        '- Proliferacao megacariocitica atipica + fibrose reticulinica grau >=2 (ou >=3)',
        '- Nao preenche criterios para LMC, PV, TE, SMD ou outra neoplasia mieloide',
        '- JAK2, CALR ou MPL positivo, ou outro marcador clonal, ou ausencia de MF reativa',
        'MENORES:',
        '- Anemia nao explicada por outra causa',
        '- Leucocitose >=11.000/uL',
        '- Esplenomegalia palpavel',
        '- LDH acima do normal',
        '- Leucoeritroblastose'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte transfusional se anemia sintomatica',
          'Quelacao de ferro se sobrecarga',
          'Avaliacao para transplante alogênico (unica cura)'
        ],
        farmacologico: [
          'BAIXO RISCO (IPSS/DIPSS):',
          'Observacao ou tratamento de sintomas',
          '',
          'RISCO INTERMEDIARIO-2 OU ALTO:',
          'Ruxolitinibe 15-20mg 2x/dia (primeira linha)',
          'Considerar transplante alogenico se elegivel',
          '',
          'ANEMIA SINTOMATICA:',
          'EPO se EPO serica <500 e transfusao-dependencia leve',
          'Danazol 200-600mg/dia',
          'Lenalidomida (se del5q)',
          '',
          'ESPLENOMEGALIA SINTOMATICA:',
          'Ruxolitinibe',
          'Hidroxiureia (se inelegivel para ruxolitinibe)',
          'Esplenectomia ou radioterapia (casos selecionados)'
        ]
      },
      metasTerapeuticas: [
        'Controle de sintomas constitucionais',
        'Reducao da esplenomegalia',
        'Melhora de citopenias quando possivel',
        'Prevencao/atraso de transformacao leucemica'
      ],
      examesIniciais: [
        'Hemograma com morfologia (leucoeritroblastose, dacriocitos)',
        'Painel de mutacoes: JAK2, CALR, MPL',
        'Mutacoes de alto risco: ASXL1, EZH2, IDH1/2, SRSF2',
        'Biopsia de medula ossea com coloracao de reticulina',
        'LDH, acido urico',
        'Cariótipo, FISH',
        'USG ou TC abdominal (baço, figado)'
      ],
      redFlags: [
        'Blastos >=10% (fase acelerada)',
        'Blastos >=20% (transformacao leucemica)',
        'Citopenias graves refratarias',
        'Esplenomegalia massiva sintomatica',
        'Caquexia progressiva'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '4-6/100.000',
        incidencia: '0,5-1,5/100.000/ano',
        mortalidade: 'Sobrevida mediana variavel: 6 anos (geral); IPSS alto: 2 anos',
        faixaEtaria: 'Mediana 65-70 anos',
        fatoresRisco: [
          'Idade avancada',
          'NMP previa (PV ou TE) - mielofibrose secundaria'
        ],
        citations: [{ refId: 'blood-mf-2022' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes driver (JAK2, CALR, MPL) e mutacoes acessorias levam a proliferacao clonal de megacariocitos atipicos. Liberacao de citocinas (TGF-beta, PDGF) induz fibrose medular progressiva. Hematopoiese compensatória extramedular causa esplenomegalia massiva.',
        citations: [{ refId: 'nejm-mf-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sintomas constitucionais intensos: fadiga, sudorese, febre, perda de peso',
          'Plenitude abdominal/saciedade precoce (esplenomegalia)',
          'Dor ossea',
          'Sintomas de anemia',
          'Sintomas de trombocitopenia (menos comum)'
        ],
        sinaisExameFisico: [
          'Esplenomegalia massiva (pode atingir pelve)',
          'Hepatomegalia',
          'Palidez',
          'Caquexia em casos avancados'
        ],
        formasClinicas: [
          'MF primaria pre-fibrotica (prognóstico melhor, parece TE)',
          'MF primaria classica (fibrose >=2)',
          'MF pos-PV',
          'MF pos-TE'
        ],
        citations: [{ refId: 'blood-mf-2022' }]
      },
      diagnostico: {
        criterios: [
          'OMS 2022',
          'Fibrose medular + criterios clinicos/laboratoriais',
          'Exclusão de outras causas de fibrose'
        ],
        diagnosticoDiferencial: [
          'Mielofibrose secundaria (metastase, linfoma, tuberculose)',
          'PV ou TE em fase fibrotica',
          'LMC em fase acelerada',
          'Sindrome mielodisplasica com fibrose',
          'Leucemia de celulas pilosas'
        ],
        examesLaboratoriais: [
          'Hemograma: citopenias variaveis, leucoeritroblastose',
          'Esfrego: dacriocitos (hemácias em lágrima)',
          'JAK2, CALR, MPL',
          'Mutacoes de alto risco molecular',
          'LDH elevado'
        ],
        examesImagem: [
          'Biopsia de medula: fibrose reticulinica/colageno',
          'TC/RM abdominal: esplenomegalia, hematopoiese extramedular'
        ],
        citations: [{ refId: 'who-classification-2022' }]
      },
      tratamento: {
        objetivos: [
          'Controle de sintomas',
          'Prolongar sobrevida',
          'Transplante se elegivel (curativo)'
        ],
        naoFarmacologico: {
          medidas: [
            'Suporte transfusional',
            'Quelacao de ferro se ferritina >1000',
            'Esplenectomia em casos selecionados'
          ],
          citations: [{ refId: 'nccn-mpn-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inibidor JAK', medicamentos: ['Ruxolitinibe'], posologia: '15-20mg 2x/dia, ajustar por citopenias', observacoes: 'Primeira linha para sintomas e esplenomegalia' }
          ],
          segundaLinha: [
            { classe: 'Inibidor JAK', medicamentos: ['Fedratinibe', 'Pacritinibe'], posologia: 'Fedratinibe 400mg/dia; Pacritinibe 200mg 2x/dia', observacoes: 'Alternativas se falha/intolerancia a ruxolitinibe' },
            { classe: 'Agentes para anemia', medicamentos: ['EPO', 'Danazol', 'Lenalidomida'], posologia: 'Danazol 200-600mg/dia', observacoes: 'Anemia como problema principal' }
          ],
          situacoesEspeciais: [
            { situacao: 'Candidato a transplante', conduta: 'Transplante alogenico (unica cura); considerar em <70 anos com doenca intermediaria-2/alta' },
            { situacao: 'Esplenomegalia refratária', conduta: 'Esplenectomia ou radioterapia esplenica' },
            { situacao: 'Transformacao leucemica', conduta: 'Quimioterapia de inducao + transplante se possivel' }
          ],
          citations: [{ refId: 'nccn-mpn-2024' }]
        },
        duracao: 'Cronico ate transplante ou progressao'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses',
        examesControle: [
          'Hemograma frequente',
          'LDH, ferritina',
          'Biopsia de medula se mudanca clinica',
          'Avaliacao de blastos periodica'
        ],
        metasTerapeuticas: [
          'Reducao do MPN-SAF (sintomas)',
          'Reducao da esplenomegalia >35%',
          'Independencia transfusional'
        ],
        criteriosEncaminhamento: [
          'Todos: hematologista especializado',
          'Avaliacao para TMO',
          'Transformacao leucemica'
        ],
        citations: [{ refId: 'blood-mf-2022' }]
      }
    },
    protocolos: ['mf-ipss-dipss', 'mf-transplante'],
    medicamentos: ['ruxolitinibe', 'fedratinibe', 'pacritinibe', 'danazol'],
    calculadoras: ['ipss', 'dipss', 'dipss-plus', 'mipss70'],
    rastreamentos: [],
    citations: [{ refId: 'nejm-mf-2023' }, { refId: 'blood-mf-2022' }],
    lastUpdate: '2026-01',
    tags: ['mielofibrose', 'fibrose-medular', 'esplenomegalia', 'JAK2', 'ruxolitinibe']
  },

  {
    id: 'sindrome-mielodisplasica',
    titulo: 'Sindrome Mielodisplasica',
    sinonimos: ['SMD', 'Mielodisplasia', 'MDS', 'Anemia refrataria'],
    doid: 'DOID:0050908',
    snomedCT: '109995004',
    meshId: 'D009190',
    umlsCui: 'C3463824',
    ciap2: ['B73'],
    cid10: ['D46', 'D46.0', 'D46.1', 'D46.2'],
    cid11: ['2A60'],
    categoria: 'hematologico',
    subcategoria: 'neoplasia_mieloide',
    quickView: {
      definicao: 'Grupo heterogeneo de neoplasias mieloides clonais caracterizadas por citopenias, displasia em uma ou mais linhagens mieloides, hematopoiese ineficaz e risco variavel de transformacao para leucemia mieloide aguda (LMA).',
      criteriosDiagnosticos: [
        'CRITERIOS OMS 2022:',
        'Citopenia(s) persistente(s): Hb <10 g/dL, neutrofilos <1.800, plaquetas <100.000',
        'Displasia em >=10% das celulas de >=1 linhagem mieloide',
        'OU blastos 5-19% na medula ossea',
        'OU anormalidades citogeneticas/moleculares especificas de SMD',
        'Exclusao de outras causas de citopenia/displasia',
        '',
        'Classificacao por: numero de linhagens displasicas, % blastos, citogenetica, mutacoes'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Suporte transfusional',
          'Quelacao de ferro se ferritina >1000-2000 e expectativa de vida razoavel',
          'Avaliacao para transplante alogenico'
        ],
        farmacologico: [
          'BAIXO RISCO (IPSS-R baixo/muito baixo):',
          'Observacao ou EPO/Darbepoetina se anemia sintomatica',
          'Lenalidomida se del(5q)',
          'Luspatercept se EPO falhou',
          '',
          'ALTO RISCO (IPSS-R intermediario-alto/muito alto):',
          'Azacitidina 75mg/m² SC x7 dias a cada 28 dias (padrao)',
          'Ou Decitabina 20mg/m² IV x5 dias a cada 28 dias',
          'Transplante alogenico se elegivel'
        ]
      },
      metasTerapeuticas: [
        'Melhora de citopenias e reducao de dependencia transfusional',
        'Melhora de qualidade de vida',
        'Prevencao/atraso de transformacao para LMA',
        'Sobrevida prolongada (especialmente com transplante)'
      ],
      examesIniciais: [
        'Hemograma completo com morfologia',
        'Reticulocitos',
        'Ferritina, B12, folato (excluir outras causas)',
        'Mielograma com citoquimica',
        'Biopsia de medula ossea',
        'Citogenetica convencional (cariótipo)',
        'Painel de mutacoes por NGS (SF3B1, TP53, ASXL1, etc.)',
        'EPO serica (guiar tratamento)'
      ],
      redFlags: [
        'Blastos >=20% (diagnóstico de LMA, nao SMD)',
        'Mutacao TP53 (prognostico muito ruim)',
        'Citogenetica complexa (>=3 anormalidades)',
        'Infeccoes recorrentes graves',
        'Sangramento significativo'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '35-55/100.000 em >70 anos',
        incidencia: '4-5/100.000/ano (aumenta muito com idade)',
        mortalidade: 'Sobrevida mediana: 6 meses (muito alto risco) a >8 anos (muito baixo risco)',
        faixaEtaria: 'Mediana 70 anos; raro em <50 anos',
        fatoresRisco: [
          'Idade avancada',
          'Exposicao a quimioterapia/radioterapia previa (SMD relacionada a terapia)',
          'Exposicao a benzeno, pesticidas',
          'Sindromes geneticas (Fanconi, Down)'
        ],
        citations: [{ refId: 'nejm-mds-2022' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes somaticas em celulas-tronco hematopoieticas (splicing - SF3B1, epigeneticos - TET2, DNMT3A, ASXL1, fatores de transcricao, TP53) levam a hematopoiese ineficaz, displasia e expansao clonal. Microambiente medular alterado contribui para citopenias.',
        citations: [{ refId: 'blood-mds-pathophysiology-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sintomas de anemia (fadiga, dispneia) - mais comum',
          'Infeccoes recorrentes (neutropenia)',
          'Sangramento (trombocitopenia)',
          'Frequentemente assintomatico (achado incidental)'
        ],
        sinaisExameFisico: [
          'Palidez',
          'Petequias, equimoses',
          'Sinais de infeccao',
          'Hepatoesplenomegalia (incomum)'
        ],
        formasClinicas: [
          'SMD com displasia de linhagem unica (SMD-SLD)',
          'SMD com displasia multilinhagem (SMD-MLD)',
          'SMD com sideroblastos em anel (SMD-RS)',
          'SMD com excesso de blastos (SMD-EB1, SMD-EB2)',
          'SMD com del(5q) isolada',
          'SMD relacionada a TP53'
        ],
        citations: [{ refId: 'who-classification-2022' }]
      },
      diagnostico: {
        criterios: [
          'Citopenias + displasia >=10%',
          'Ou blastos 5-19%',
          'Ou citogenetica/mutacoes definidoras'
        ],
        diagnosticoDiferencial: [
          'Deficiencia de B12/folato',
          'Anemia de doenca cronica',
          'Toxicidade medicamentosa',
          'Infeccoes (HIV, parvovirus)',
          'Anemia aplastica',
          'Leucemia aguda'
        ],
        examesLaboratoriais: [
          'Hemograma com esfrego',
          'Reticulócitos',
          'EPO sérica',
          'Mielograma + biopsia de medula',
          'Cariótipo, NGS'
        ],
        examesImagem: [
          'Não essencial para diagnóstico'
        ],
        citations: [{ refId: 'nejm-mds-2022' }]
      },
      tratamento: {
        objetivos: [
          'Melhorar citopenias',
          'Reduzir dependência transfusional',
          'Prolongar sobrevida',
          'Curar (transplante)'
        ],
        naoFarmacologico: {
          medidas: [
            'Transfusão de hemácias se Hb <7-8 ou sintomático',
            'Transfusão de plaquetas se <10.000 ou sangramento',
            'Quelação se ferritina >1000 e candidato a TMO'
          ],
          citations: [{ refId: 'nccn-mds-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Agente hipometilante', medicamentos: ['Azacitidina'], posologia: '75mg/m² SC dias 1-7 a cada 28 dias', observacoes: 'Padrão para alto risco' },
            { classe: 'Estimulante eritropoiese', medicamentos: ['Eritropoetina', 'Darbepoetina', 'Luspatercept'], posologia: 'EPO 40.000-60.000 UI/semana', observacoes: 'Baixo risco com EPO <500' }
          ],
          segundaLinha: [
            { classe: 'Imunomodulador', medicamentos: ['Lenalidomida'], posologia: '10mg/dia dias 1-21 a cada 28 dias', observacoes: 'Especialmente del(5q)' },
            { classe: 'Agente hipometilante alternativo', medicamentos: ['Decitabina'], posologia: '20mg/m² IV dias 1-5', observacoes: 'Alternativa à azacitidina' }
          ],
          situacoesEspeciais: [
            { situacao: 'Del(5q)', conduta: 'Lenalidomida - alta taxa de resposta' },
            { situacao: 'Alto risco elegível a TMO', conduta: 'TMO alogênico é curativo' },
            { situacao: 'TP53 mutado', conduta: 'Prognóstico muito ruim; ensaios clínicos; TMO se possível' }
          ],
          citations: [{ refId: 'nccn-mds-2024' }]
        },
        duracao: 'Hipometilantes: contínuo até progressão; TMO: curativo'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 1-3 meses conforme risco',
        examesControle: [
          'Hemograma semanal-mensal',
          'Mielograma periódico ou se mudança clínica',
          'Ferritina se transfusão crônica'
        ],
        metasTerapeuticas: [
          'Independência transfusional',
          'Ausência de progressão para LMA'
        ],
        criteriosEncaminhamento: [
          'Todos: hematologista',
          'Avaliação para TMO (risco alto, <70 anos)',
          'Transformação para LMA'
        ],
        citations: [{ refId: 'nejm-mds-2022' }]
      }
    },
    protocolos: ['smd-ipss-r', 'smd-tratamento-baixo-risco', 'smd-tratamento-alto-risco'],
    medicamentos: ['azacitidina', 'decitabina', 'lenalidomida', 'luspatercept', 'eritropoetina'],
    calculadoras: ['ipss', 'ipss-r', 'ipss-m'],
    rastreamentos: [],
    citations: [{ refId: 'nejm-mds-2022' }, { refId: 'who-classification-2022' }],
    lastUpdate: '2026-01',
    tags: ['mielodisplasia', 'SMD', 'citopenia', 'displasia', 'azacitidina']
  },

  // ============================================================================
  // COAGULOPATIAS HEREDITARIAS
  // ============================================================================
  {
    id: 'hemofilia-a',
    titulo: 'Hemofilia A',
    sinonimos: ['Hemofilia classica', 'Deficiencia de fator VIII'],
    doid: 'DOID:12134',
    snomedCT: '76407009',
    meshId: 'D006467',
    umlsCui: 'C0019069',
    ordo: ['ORPHA:98878'],
    ciap2: ['B83'],
    cid10: ['D66'],
    cid11: ['3B10.0'],
    categoria: 'hematologico',
    subcategoria: 'coagulopatia_hereditaria',
    quickView: {
      definicao: 'Disturbio hemorragico hereditario ligado ao X causado por deficiencia de fator VIII da coagulacao. Manifesta-se quase exclusivamente em homens com sangramentos articulares (hemartroses), musculares e potencialmente fatais apos trauma ou cirurgia.',
      criteriosDiagnosticos: [
        'Historia familiar compativel (ligado ao X)',
        'Manifestacoes hemorragicas (hemartroses, hematomas musculares)',
        'TTPa prolongado com TP normal',
        'Dosagem de Fator VIII reduzida:',
        '- Grave: <1% (<0,01 UI/mL)',
        '- Moderada: 1-5% (0,01-0,05 UI/mL)',
        '- Leve: 5-40% (0,05-0,40 UI/mL)',
        'Exclusao de doenca de von Willebrand'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Centro de tratamento de hemofilia especializado',
          'Evitar medicamentos que afetam coagulacao (AAS, AINEs)',
          'Fisioterapia para prevencao/tratamento de artropatia',
          'Vacinacao para hepatite A e B',
          'Aconselhamento genetico'
        ],
        farmacologico: [
          'PROFILAXIA (padrao para hemofilia grave):',
          'Fator VIII recombinante ou derivado de plasma',
          '25-40 UI/kg 3x/semana ou em dias alternados',
          'Objetivo: manter vale >1-3%',
          '',
          'PRODUTOS DE MEIA-VIDA ESTENDIDA:',
          'Efmoroctocog alfa, Rurioctocog alfa pegol',
          '2x/semana ou menos frequente',
          '',
          'TERAPIA NAO-REPOSICAO:',
          'Emicizumab (anticorpo biespecifico mimético de FVIII)',
          '1,5-3mg/kg SC semanal, quinzenal ou mensal',
          '',
          'TRATAMENTO DE SANGRAMENTO:',
          'Fator VIII 25-50 UI/kg conforme gravidade'
        ]
      },
      metasTerapeuticas: [
        'Zero sangramentos espontaneos',
        'Prevencao de artropatia hemofilica',
        'Qualidade de vida normal',
        'Reducao de inibidores'
      ],
      examesIniciais: [
        'TTPa (prolongado)',
        'TP e TT (normais)',
        'Dosagem de Fator VIII',
        'Dosagem de FvW (excluir vWD tipo 2N)',
        'Pesquisa de inibidor (Bethesda)',
        'Teste genetico (identifica mutacao e portadoras)'
      ],
      redFlags: [
        'Sangramento intracraniano (emergencia)',
        'Sindrome compartimental',
        'Sangramento de vias aereas',
        'Desenvolvimento de inibidor (30% dos graves)',
        'Artropatia progressiva'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1/5.000 nascidos masculinos',
        incidencia: '1/5.000 nascidos masculinos',
        mortalidade: 'Expectativa de vida quase normal com tratamento adequado',
        faixaEtaria: 'Manifestacoes desde infancia; diagnostico geralmente antes de 2 anos em graves',
        fatoresRisco: [
          'Heranca ligada ao X (maes portadoras)',
          '30% dos casos sao mutacoes de novo'
        ],
        citations: [{ refId: 'wfh-guidelines-2023' }]
      },
      fisiopatologia: {
        texto: 'Mutacoes no gene F8 (Xq28) causam deficiencia quantitativa ou qualitativa de fator VIII. O FVIII e cofator do FIXa na via intrinseca da coagulacao. Sua ausencia causa geracao insuficiente de trombina e coagulo instavel, resultando em sangramento.',
        citations: [{ refId: 'nejm-hemophilia-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Hemartroses (mais comum: joelhos, cotovelos, tornozelos)',
          'Hematomas musculares profundos',
          'Sangramento prolongado apos trauma/cirurgia',
          'Sangramento de mucosas (menos comum que em vWD)',
          'Hematuria',
          'Sangramento intracraniano (grave)'
        ],
        sinaisExameFisico: [
          'Articulacao quente, edemaciada, dolorosa (hemartrose aguda)',
          'Artropatia cronica (deformidade, limitacao de movimento)',
          'Hematomas subcutaneos e intramusculares',
          'Pseudotumores (se nao tratado)'
        ],
        formasClinicas: [
          'Hemofilia A grave (<1%): sangramento espontaneo frequente',
          'Hemofilia A moderada (1-5%): sangramento com trauma menor',
          'Hemofilia A leve (5-40%): sangramento com trauma/cirurgia'
        ],
        citations: [{ refId: 'wfh-guidelines-2023' }]
      },
      diagnostico: {
        criterios: [
          'Historia pessoal/familiar de sangramento',
          'TTPa prolongado com TP normal',
          'FVIII baixo + FvW normal'
        ],
        diagnosticoDiferencial: [
          'Hemofilia B (deficiencia de FIX)',
          'Doenca de von Willebrand tipo 2N',
          'Hemofilia A adquirida (inibidor)',
          'Outras deficiencias de fatores'
        ],
        examesLaboratoriais: [
          'TTPa (prolongado), TP (normal)',
          'Dosagem de FVIII',
          'FvW:Ag e FvW:RCo',
          'Pesquisa de inibidor (Bethesda)',
          'Teste genetico'
        ],
        citations: [{ refId: 'isth-hemophilia-2021' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir sangramentos',
          'Tratar sangramentos prontamente',
          'Prevenir artropatia',
          'Manter qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Acompanhamento em centro especializado',
            'Fisioterapia regular',
            'Atividade fisica adaptada',
            'Educacao do paciente e familia'
          ],
          citations: [{ refId: 'wfh-guidelines-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Fator VIII recombinante', medicamentos: ['Octocog alfa', 'Turoctocog alfa'], posologia: '25-40 UI/kg 3x/semana (profilaxia)', observacoes: 'Padrao ouro para profilaxia primaria' },
            { classe: 'Anticorpo biespecifico', medicamentos: ['Emicizumab'], posologia: '1,5-3mg/kg SC semanal/quinzenal/mensal', observacoes: 'Alternativa nao-reposicao; excelente para inibidores' }
          ],
          segundaLinha: [
            { classe: 'FVIII meia-vida estendida', medicamentos: ['Efmoroctocog alfa', 'Rurioctocog alfa pegol'], posologia: '2x/semana ou menos', observacoes: 'Reducao de frequencia de infusoes' }
          ],
          situacoesEspeciais: [
            { situacao: 'Desenvolvimento de inibidor', conduta: 'Emicizumab; agentes de bypass (rFVIIa, FEIBA); inducao de tolerancia imunológica (ITI)' },
            { situacao: 'Sangramento grave/cirurgia', conduta: 'FVIII para nivel 80-100% (grave) ou 50-80% (menor)' },
            { situacao: 'Terapia genica', conduta: 'Valoctocogene roxaparvovec aprovado para adultos sem inibidor (ainda limitado)' }
          ],
          citations: [{ refId: 'nejm-hemophilia-2022' }]
        },
        duracao: 'Profilaxia por toda a vida; tratamento sob demanda conforme necessidade'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses em centro especializado',
        examesControle: [
          'FVIII vale periodico',
          'Pesquisa de inibidor a cada 3-6 meses no inicio ou se mudanca clinica',
          'Ultrassom articular / RM de articulacoes',
          'Funcao hepatica'
        ],
        metasTerapeuticas: [
          'Zero sangramento espontaneo',
          'Articulacoes preservadas',
          'Ausencia de inibidor'
        ],
        criteriosEncaminhamento: [
          'Todos: centro de tratamento de hemofilia',
          'Ortopedia se artropatia',
          'Desenvolvimento de inibidor'
        ],
        citations: [{ refId: 'wfh-guidelines-2023' }]
      }
    },
    protocolos: ['hemofilia-profilaxia', 'hemofilia-tratamento-sangramento', 'hemofilia-inibidor'],
    medicamentos: ['fator-viii-recombinante', 'emicizumab', 'desmopressina'],
    calculadoras: ['dose-fator-viii', 'hjhs'],
    rastreamentos: [],
    citations: [{ refId: 'wfh-guidelines-2023' }, { refId: 'nejm-hemophilia-2022' }],
    lastUpdate: '2026-01',
    tags: ['hemofilia', 'fator-viii', 'coagulopatia', 'hemartrose', 'emicizumab']
  },

  {
    id: 'doenca-von-willebrand',
    titulo: 'Doenca de von Willebrand',
    sinonimos: ['vWD', 'DvW', 'Doenca de von Willebrand', 'Deficiencia de FvW'],
    doid: 'DOID:12531',
    snomedCT: '128105004',
    meshId: 'D014842',
    umlsCui: 'C0042974',
    ordo: ['ORPHA:903'],
    ciap2: ['B83'],
    cid10: ['D68.0'],
    cid11: ['3B11.1'],
    categoria: 'hematologico',
    subcategoria: 'coagulopatia_hereditaria',
    quickView: {
      definicao: 'Disturbio hemorragico hereditario mais comum, causado por deficiencia quantitativa ou qualitativa do fator de von Willebrand (FvW). Manifesta-se predominantemente com sangramento mucocutaneo. Heranca autossomica dominante na maioria dos casos.',
      criteriosDiagnosticos: [
        'Historia pessoal de sangramento mucocutaneo (epistaxe, menorragia, sangramento pos-operatorio)',
        'Historia familiar positiva (maioria)',
        'FvW:Ag (antigeno) reduzido (<30 IU/dL para diagnostico definitivo)',
        'FvW:RCo ou FvW:GPIbM (atividade) reduzido',
        'Classificacao por subtipo:',
        '- Tipo 1: deficiencia quantitativa parcial (60-80% dos casos)',
        '- Tipo 2: defeito qualitativo (2A, 2B, 2M, 2N)',
        '- Tipo 3: deficiencia virtualmente completa (raro, grave)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar AAS e AINEs',
          'Identificar tipo e subtipo para guiar tratamento',
          'Planejamento pre-procedimento/cirurgico',
          'Aconselhamento genetico'
        ],
        farmacologico: [
          'TIPO 1 E ALGUNS TIPO 2:',
          'Desmopressina (DDAVP) 0,3 mcg/kg IV/SC ou spray nasal',
          'Realizar teste de resposta antes de usar clinicamente',
          '',
          'ACIDO TRANEXAMICO:',
          '1g VO 3x/dia (adjuvante para sangramento mucoso)',
          '',
          'TIPO 3, TIPO 2B, OU DDAVP NAO RESPONSIVO:',
          'Concentrado de FvW/FVIII derivado de plasma',
          'Humate-P, Wilate, outros',
          '',
          'MENORRAGIA:',
          'Contraceptivos hormonais',
          'DIU de levonorgestrel',
          'Acido tranexamico'
        ]
      },
      metasTerapeuticas: [
        'Controle de sangramento',
        'Prevencao de sangramento em procedimentos',
        'Melhora de qualidade de vida'
      ],
      examesIniciais: [
        'FvW:Ag (antigeno)',
        'FvW:RCo ou FvW:GPIbM (atividade)',
        'FVIII:C (fator VIII coagulante)',
        'Multimeros de FvW (se tipo 2 suspeito)',
        'RIPA (agregacao com ristocetina - tipo 2B)',
        'FvW:CB (ligacao a colageno)',
        'TTPa (pode estar normal ou prolongado)',
        'Teste de resposta a DDAVP',
        'Tipagem sanguinea (tipo O tem niveis 25% mais baixos)'
      ],
      redFlags: [
        'Tipo 3 (sangramento grave, FvW indetectavel)',
        'Tipo 2B com trombocitopenia',
        'Sangramento grave nao responsivo',
        'Desenvolvimento de inibidor (raro)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1% da populacao (formas leves); 1/10.000 (clinicamente significativo)',
        incidencia: 'Disturbio hemorragico hereditario mais comum',
        faixaEtaria: 'Todas as idades; diagnostico frequentemente tardio em formas leves',
        fatoresRisco: [
          'Historia familiar',
          'Tipo sanguineo O (niveis de FvW naturalmente mais baixos)'
        ],
        citations: [{ refId: 'ash-vwd-2021' }]
      },
      fisiopatologia: {
        texto: 'O FvW e uma glicoproteina que medeia adesao plaquetaria ao subendotelio lesado e transporta o FVIII no plasma. Mutacoes no gene VWF (12p13) causam deficiencia quantitativa (tipos 1 e 3) ou qualitativa (tipo 2), resultando em defeito de hemostasia primaria.',
        citations: [{ refId: 'blood-vwd-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sangramento mucocutaneo: epistaxe, gengivorragia',
          'Menorragia (muito comum em mulheres)',
          'Equimoses faceis',
          'Sangramento pos-operatorio/pos-extracao dentaria',
          'Sangramento GI (tipos graves)'
        ],
        sinaisExameFisico: [
          'Equimoses',
          'Sinais de anemia (se sangramento cronico)',
          'Geralmente exame fisico normal'
        ],
        formasClinicas: [
          'Tipo 1 (60-80%): deficiencia parcial; sangramento leve-moderado',
          'Tipo 2A: falta de multimeros de alto peso molecular',
          'Tipo 2B: ligacao aumentada a GPIb; pode ter trombocitopenia',
          'Tipo 2M: funcao diminuida sem falta de multimeros',
          'Tipo 2N: ligacao diminuida ao FVIII (parece hemofilia)',
          'Tipo 3 (raro): deficiencia grave; sangramento articular possivel'
        ],
        citations: [{ refId: 'ash-vwd-2021' }]
      },
      diagnostico: {
        criterios: [
          'Sangramento mucoso + FvW:Ag <30 IU/dL',
          'Ou FvW:Ag 30-50 com historia convincente',
          'Subtipagem para guiar tratamento'
        ],
        diagnosticoDiferencial: [
          'Disfuncao plaquetaria hereditaria',
          'Hemofilia A (tipo 2N)',
          'Deficiencia adquirida de FvW',
          'Outras coagulopatias'
        ],
        examesLaboratoriais: [
          'FvW:Ag, FvW:RCo/GPIbM',
          'FVIII:C (reduzido proporcionalmente em tipo 1 e 3; desproporcional em 2N)',
          'Multimeros de FvW',
          'RIPA',
          'Tipagem ABO'
        ],
        citations: [{ refId: 'blood-vwd-2022' }]
      },
      tratamento: {
        objetivos: [
          'Controle de sangramento',
          'Prevencao em procedimentos',
          'Qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar medicamentos que afetam hemostasia',
            'Planejamento pre-procedimento',
            'Identificacao medica (bracelete)'
          ],
          citations: [{ refId: 'ash-vwd-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analogo vasopressina', medicamentos: ['Desmopressina (DDAVP)'], posologia: '0,3 mcg/kg IV/SC (dose maxima 20mcg)', observacoes: 'Tipo 1; testar resposta antes; evitar em 2B' },
            { classe: 'Antifibrinolitico', medicamentos: ['Acido tranexamico'], posologia: '1g VO 3x/dia ou 10mg/kg IV', observacoes: 'Adjuvante para sangramento mucoso' }
          ],
          segundaLinha: [
            { classe: 'Concentrado de FvW', medicamentos: ['Humate-P', 'Wilate', 'Vonvendi'], posologia: 'Conforme nivel alvo e tipo de sangramento', observacoes: 'Tipo 3, 2B, ou sem resposta a DDAVP' }
          ],
          situacoesEspeciais: [
            { situacao: 'Menorragia', conduta: 'Anticoncepcional hormonal; DIU-LNG; acido tranexamico; DDAVP' },
            { situacao: 'Cirurgia maior', conduta: 'Concentrado de FvW/FVIII; manter nivel >50% por 7-14 dias' },
            { situacao: 'Tipo 2B', conduta: 'DDAVP contraindicado (piora trombocitopenia); usar concentrado' }
          ],
          citations: [{ refId: 'blood-vwd-2022' }]
        },
        duracao: 'Conforme episodios de sangramento; profilaxia raramente necessaria exceto tipo 3'
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual se estavel; mais frequente em tipos graves',
        examesControle: [
          'Niveis de FvW periodicos',
          'Hemograma',
          'Ferritina se sangramento cronico'
        ],
        metasTerapeuticas: [
          'Ausencia de sangramento maior',
          'Resposta adequada a DDAVP conhecida'
        ],
        criteriosEncaminhamento: [
          'Hematologista para confirmacao diagnostica',
          'Ginecologista se menorragia',
          'Planejamento pre-cirurgico'
        ],
        citations: [{ refId: 'ash-vwd-2021' }]
      }
    },
    protocolos: ['vwd-subtipagem', 'vwd-tratamento-sangramento', 'vwd-cirurgia'],
    medicamentos: ['desmopressina', 'acido-tranexamico', 'concentrado-fvw'],
    calculadoras: ['isth-bat', 'dose-fvw'],
    rastreamentos: [],
    citations: [{ refId: 'ash-vwd-2021' }, { refId: 'blood-vwd-2022' }],
    lastUpdate: '2026-01',
    tags: ['von-willebrand', 'vWD', 'coagulopatia', 'desmopressina', 'menorragia']
  },

  // ============================================================================
  // DOENCAS HEMATOLOGICAS IMUNOMEDIADAS
  // ============================================================================
  {
    id: 'purpura-trombocitopenica-imune',
    titulo: 'Purpura Trombocitopenica Imune',
    sinonimos: ['PTI', 'ITP', 'Purpura trombocitopenica idiopatica', 'Trombocitopenia imune'],
    doid: 'DOID:8924',
    snomedCT: '32273002',
    meshId: 'D016553',
    umlsCui: 'C0398650',
    ciap2: ['B83'],
    cid10: ['D69.3'],
    cid11: ['3B64.0'],
    categoria: 'hematologico',
    subcategoria: 'citopenia_imunomediada',
    quickView: {
      definicao: 'Trombocitopenia autoimune causada por destruicao plaquetaria mediada por autoanticorpos e inibicao da producao. Diagnostico de exclusao. Classificada em: recem-diagnosticada (<3 meses), persistente (3-12 meses), ou cronica (>12 meses).',
      criteriosDiagnosticos: [
        'Plaquetas <100.000/uL isoladamente',
        'Ausencia de causa identificavel de trombocitopenia:',
        '- Esfrego normal (sem esquizocitos, sem displasia)',
        '- Sorologias negativas (HIV, HCV, HBV)',
        '- Ausencia de esplenomegalia palpavel',
        '- Ausencia de uso de medicamentos causadores',
        'Resposta a terapia especifica confirma diagnostico'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Observacao se assintomatico e plaquetas >20.000-30.000',
          'Evitar medicamentos antiagregantes/anticoagulantes',
          'Evitar esportes de contato se plaquetas baixas',
          'Investigar e tratar PTI secundaria se presente'
        ],
        farmacologico: [
          'SANGRAMENTO ATIVO OU PLAQUETAS <20.000-30.000:',
          'Corticoide: Prednisona 1mg/kg/dia (maximo 80mg) por 2-4 semanas, desmame',
          'OU Dexametasona 40mg/dia por 4 dias (ciclos)',
          '',
          'RESPOSTA RAPIDA NECESSARIA:',
          'IVIg 1g/kg dose unica (ou 0,4g/kg x5 dias)',
          'Anti-D 50-75 mcg/kg (se Rh positivo)',
          '',
          'EMERGENCIA (sangramento grave):',
          'IVIg + Metilprednisolona + Transfusao de plaquetas + Acido tranexamico'
        ]
      },
      metasTerapeuticas: [
        'Plaquetas >30.000/uL (seguro na maioria)',
        'Ausencia de sangramento',
        'Menor toxicidade de tratamento possivel',
        'NAO e objetivo normalizar plaquetas'
      ],
      examesIniciais: [
        'Hemograma completo com contagem manual de plaquetas',
        'Esfrego de sangue periferico (excluir pseudotrombocitopenia)',
        'Reticulocitos',
        'HIV, HCV, HBV',
        'Funcao hepatica e renal',
        'TSH',
        'FAN, complemento (se suspeita de LES)',
        'Coombs direto (sindrome de Evans)',
        'H. pylori',
        'Mielograma: se atipico, >60 anos, ou refratario'
      ],
      redFlags: [
        'Plaquetas <10.000/uL (risco de sangramento intracraniano)',
        'Sangramento ativo significativo',
        'Anemia hemolitica concomitante (sindrome de Evans)',
        'Esplenomegalia (questionar diagnostico)',
        'Refratario a multiplas linhas de tratamento'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '9-26/100.000 (adultos)',
        incidencia: '2-5/100.000/ano',
        faixaEtaria: 'Criancas: pico 2-5 anos (geralmente aguda). Adultos: mais cronica, predominio feminino',
        fatoresRisco: [
          'Infeccao viral recente (criancas)',
          'Doencas autoimunes',
          'Infeccoes cronicas (HIV, HCV, H. pylori)'
        ],
        citations: [{ refId: 'ash-itp-2019' }]
      },
      fisiopatologia: {
        texto: 'Autoanticorpos (principalmente IgG anti-GPIIb/IIIa e GPIb/IX) causam fagocitose esplenica de plaquetas opsonizadas. Tambem ha inibicao da megacariocitopoese mediada por autoanticorpos e celulas T. A producao de plaquetas e inadequada para o grau de destruicao.',
        citations: [{ refId: 'blood-itp-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Frequentemente assintomatico',
          'Petequias e equimoses',
          'Sangramento mucoso: epistaxe, gengivorragia',
          'Menorragia',
          'Sangramento GI ou urinario (grave)'
        ],
        sinaisExameFisico: [
          'Petequias (principalmente em MMII)',
          'Equimoses',
          'Sangramento de mucosas',
          'AUSENCIA de esplenomegalia'
        ],
        formasClinicas: [
          'PTI primaria (idiopatica)',
          'PTI secundaria: LES, SAAF, LLC, infeccoes, medicamentos',
          'PTI recem-diagnosticada (<3 meses)',
          'PTI persistente (3-12 meses)',
          'PTI cronica (>12 meses)'
        ],
        citations: [{ refId: 'ash-itp-2019' }]
      },
      diagnostico: {
        criterios: [
          'Plaquetas <100.000 isoladas',
          'Exclusao de outras causas',
          'Resposta a tratamento confirma'
        ],
        diagnosticoDiferencial: [
          'Pseudotrombocitopenia',
          'Trombocitopenia gestacional',
          'PTT/SHU',
          'Mielodisplasia',
          'Hiperesplenismo',
          'Trombocitopenia induzida por drogas'
        ],
        examesLaboratoriais: [
          'Hemograma + esfrego',
          'Reticulocitos, Coombs',
          'HIV, HCV, HBV',
          'H. pylori',
          'FAN se suspeita de LES',
          'Mielograma em casos selecionados'
        ],
        citations: [{ refId: 'blood-itp-2022' }]
      },
      tratamento: {
        objetivos: [
          'Prevenir sangramento',
          'Manter plaquetas em nivel seguro',
          'Minimizar toxicidade'
        ],
        naoFarmacologico: {
          medidas: [
            'Observacao se assintomatico e plaquetas >30.000',
            'Evitar trauma',
            'Tratar H. pylori se positivo'
          ],
          citations: [{ refId: 'ash-itp-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide', medicamentos: ['Prednisona', 'Dexametasona'], posologia: 'Prednisona 1mg/kg/dia x2-4 semanas; Dexa 40mg x4 dias', observacoes: 'Primeira linha' },
            { classe: 'Imunoglobulina IV', medicamentos: ['IVIg'], posologia: '1g/kg dose unica ou 0,4g/kg x5 dias', observacoes: 'Resposta rapida em 24-48h' }
          ],
          segundaLinha: [
            { classe: 'Agonista TPO', medicamentos: ['Eltrombopag', 'Romiplostim', 'Avatrombopag'], posologia: 'Eltrombopag 50mg/dia VO; Romiplostim SC semanal', observacoes: 'PTI cronica' },
            { classe: 'Rituximabe', medicamentos: ['Rituximabe'], posologia: '375mg/m² semanal x4', observacoes: 'Resposta duravel em 40%' },
            { classe: 'Esplenectomia', medicamentos: [], posologia: 'Cirurgica ou laparoscopica', observacoes: 'Resposta duravel em 60-70%' }
          ],
          situacoesEspeciais: [
            { situacao: 'Sangramento grave', conduta: 'IVIg + Metilprednisolona IV + Plaquetas + Acido tranexamico' },
            { situacao: 'PTI cronica refrataria', conduta: 'Agonistas TPO cronicamente; Fostamatinibe; ensaios clinicos' },
            { situacao: 'Gestante', conduta: 'IVIg preferencial; corticoide; plaquetas para parto se <50.000 (vaginal) ou <80.000 (cesarea)' }
          ],
          citations: [{ refId: 'ash-itp-2019' }]
        },
        duracao: 'Variavel; muitos requerem tratamento cronico'
      },
      acompanhamento: {
        frequenciaConsultas: 'Frequente no inicio; depois conforme estabilidade',
        examesControle: [
          'Hemograma seriado',
          'Monitorar efeitos adversos do tratamento'
        ],
        metasTerapeuticas: [
          'Plaquetas >30.000 estaveis',
          'Ausencia de sangramento'
        ],
        criteriosEncaminhamento: [
          'Todos: hematologista',
          'PTI refrataria',
          'Candidato a esplenectomia'
        ],
        citations: [{ refId: 'blood-itp-2022' }]
      }
    },
    protocolos: ['pti-primeira-linha', 'pti-cronica', 'pti-emergencia'],
    medicamentos: ['prednisona', 'dexametasona', 'imunoglobulina-iv', 'eltrombopag', 'romiplostim', 'rituximabe'],
    calculadoras: ['bleeding-score-itp'],
    rastreamentos: [],
    citations: [{ refId: 'ash-itp-2019' }, { refId: 'blood-itp-2022' }],
    lastUpdate: '2026-01',
    tags: ['PTI', 'trombocitopenia', 'autoimune', 'corticoide', 'eltrombopag']
  },

  {
    id: 'anemia-hemolitica-autoimune',
    titulo: 'Anemia Hemolitica Autoimune',
    sinonimos: ['AHAI', 'AIHA', 'Anemia hemolitica por anticorpos quentes', 'Anemia hemolitica por crioaglutininas'],
    doid: 'DOID:612',
    snomedCT: '234365002',
    meshId: 'D000744',
    umlsCui: 'C0002880',
    ciap2: ['B78'],
    cid10: ['D59.0', 'D59.1'],
    cid11: ['3A21.0'],
    categoria: 'hematologico',
    subcategoria: 'anemia_hemolitica',
    quickView: {
      definicao: 'Anemia causada por destruicao prematura de eritrocitos mediada por autoanticorpos. Classificada por temperatura otima do anticorpo: tipo quente (IgG, 37C), tipo frio (IgM, crioaglutininas), ou mista. Pode ser primaria ou secundaria.',
      criteriosDiagnosticos: [
        'Anemia (Hb variavel, pode ser grave)',
        'Evidencia de hemolise:',
        '- LDH elevado',
        '- Bilirrubina indireta elevada',
        '- Haptoglobina reduzida/indetectavel',
        '- Reticulocitose (pode estar ausente se crise)',
        'Coombs direto (TAD) positivo:',
        '- IgG +/- C3d: tipo quente',
        '- C3d isolado: tipo frio (crioaglutininas)',
        '- IgG + C3d forte: misto'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Transfusao se anemia grave sintomatica (nao adiar por incompatibilidade)',
          'Aquecimento de hemocomponentes no tipo frio',
          'Evitar exposicao ao frio no tipo crioaglutininas',
          'Investigar e tratar causa secundaria'
        ],
        farmacologico: [
          'TIPO QUENTE:',
          'Prednisona 1-1,5 mg/kg/dia ate resposta, depois desmame lento',
          'Acido folico 5mg/dia',
          '',
          'REFRATARIO A CORTICOIDE:',
          'Rituximabe 375mg/m² semanal x4',
          'Esplenectomia',
          '',
          'TIPO FRIO (CRIOAGLUTININAS):',
          'Evitar frio (principal)',
          'Rituximabe (primeira linha se tratamento necessario)',
          'Corticoides POUCO eficazes',
          '',
          'SINDROME DE EVANS (AHAI + PTI):',
          'Corticoide + Rituximabe'
        ]
      },
      metasTerapeuticas: [
        'Hb >10 g/dL estavel',
        'Normalizacao de marcadores de hemolise',
        'Reducao de dose de corticoide'
      ],
      examesIniciais: [
        'Hemograma com reticulocitos',
        'Bilirrubinas, LDH, haptoglobina',
        'Coombs direto com especificacao (IgG, C3d)',
        'Coombs indireto',
        'Esfrego (esferocitos, policromasia)',
        'Sorologias (HIV, HCV, HBV, Mycoplasma)',
        'FAN, complemento (LES)',
        'Eletroforese de proteinas (linfoproliferativas)',
        'TC de torax/abdome (linfoma)'
      ],
      redFlags: [
        'Hb <6-7 g/dL com sintomas',
        'Hemolise fulminante (queda rapida de Hb)',
        'Hemoglobinuria (hemolise intravascular)',
        'Reticulocitopenia (crise aplastica ou infiltracao)',
        'Linfadenopatia/esplenomegalia (secundaria a linfoma)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '17/100.000',
        incidencia: '1-3/100.000/ano',
        faixaEtaria: 'Qualquer idade; tipo quente mais comum em adultos',
        fatoresRisco: [
          'Doencas linfoproliferativas (LLC)',
          'Doencas autoimunes (LES)',
          'Infeccoes (Mycoplasma, EBV - tipo frio)',
          'Medicamentos'
        ],
        citations: [{ refId: 'blood-aiha-2020' }]
      },
      fisiopatologia: {
        texto: 'Tipo quente: IgG se liga a eritrocitos a 37C; fagocitose esplenica (hemolise extravascular). Tipo frio: IgM se liga em temperaturas baixas, ativa complemento; hemolise pode ser intravascular. Doenca de crioaglutininas: IgM monoclonal em idosos/LLC.',
        citations: [{ refId: 'nejm-aiha-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sintomas de anemia: fadiga, dispneia, tontura',
          'Ictericia',
          'Urina escura (hemoglobinuria no tipo frio/misto)',
          'Acrocianose, livedo reticular (tipo frio)',
          'Esplenomegalia (tipo quente)'
        ],
        sinaisExameFisico: [
          'Palidez',
          'Ictericia conjuntival',
          'Esplenomegalia (frequente no tipo quente)',
          'Hepatomegalia',
          'Acrocianose no frio'
        ],
        formasClinicas: [
          'AHAI quente primaria (idiopatica)',
          'AHAI quente secundaria (LLC, LES, medicamentos)',
          'Doenca de crioaglutininas primaria',
          'Doenca de crioaglutininas secundaria (infeccoes, linfoma)',
          'AHAI mista',
          'Hemoglobinuria paroxistica ao frio (rara, pos-viral)'
        ],
        citations: [{ refId: 'blood-aiha-2020' }]
      },
      diagnostico: {
        criterios: [
          'Anemia + hemolise + Coombs direto positivo',
          'Classificar tipo por especificidade do Coombs'
        ],
        diagnosticoDiferencial: [
          'Esferocitose hereditaria',
          'Hemoglobinuria paroxistica noturna',
          'Microangiopatia (PTT/SHU)',
          'Deficiencia de G6PD',
          'Anemia hemolitica mecanica (valvula)'
        ],
        examesLaboratoriais: [
          'Coombs direto com mono-especificos',
          'LDH, bilirrubinas, haptoglobina',
          'Reticulocitos',
          'Esfrego',
          'Titulo de crioaglutininas'
        ],
        citations: [{ refId: 'nejm-aiha-2021' }]
      },
      tratamento: {
        objetivos: [
          'Controlar hemolise',
          'Manter Hb estavel',
          'Tratar causa secundaria'
        ],
        naoFarmacologico: {
          medidas: [
            'Transfusao conforme necessidade',
            'Evitar frio (crioaglutininas)',
            'Suplementar folato'
          ],
          citations: [{ refId: 'bsh-aiha-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide', medicamentos: ['Prednisona', 'Metilprednisolona'], posologia: '1-1,5mg/kg/dia ate resposta, desmame lento', observacoes: 'Primeira linha para tipo quente' },
            { classe: 'Anti-CD20', medicamentos: ['Rituximabe'], posologia: '375mg/m² semanal x4', observacoes: 'Primeira linha para tipo frio; segunda linha para quente' }
          ],
          segundaLinha: [
            { classe: 'Esplenectomia', medicamentos: [], posologia: 'Cirurgica', observacoes: 'Tipo quente refratario' },
            { classe: 'Imunossupressor', medicamentos: ['Azatioprina', 'Micofenolato', 'Ciclosporina'], posologia: 'Azatioprina 1-2mg/kg/dia', observacoes: 'Manutencao ou refratario' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hemolise grave', conduta: 'Metilprednisolona IV + Rituximabe + Transfusao' },
            { situacao: 'Crioaglutininas com necessidade de cirurgia', conduta: 'Aquecer sala e fluidos; plasmaferese pre-op' },
            { situacao: 'Secundaria a LLC', conduta: 'Tratar LLC; ibrutinibe pode ajudar AHAI' }
          ],
          citations: [{ refId: 'bsh-aiha-2017' }]
        },
        duracao: 'Meses; muitos requerem manutencao prolongada'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal no inicio; depois mensal-trimestral',
        examesControle: [
          'Hemograma + reticulocitos',
          'LDH, bilirrubinas, haptoglobina',
          'Coombs durante tratamento'
        ],
        metasTerapeuticas: [
          'Hb >10 g/dL',
          'Normalizacao de marcadores de hemolise',
          'Corticoide em dose minima ou retirado'
        ],
        criteriosEncaminhamento: [
          'Todos: hematologista',
          'Investigacao de causa secundaria',
          'Refratario/recorrente'
        ],
        citations: [{ refId: 'blood-aiha-2020' }]
      }
    },
    protocolos: ['ahai-quente-tratamento', 'ahai-frio-manejo'],
    medicamentos: ['prednisona', 'rituximabe', 'acido-folico'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'blood-aiha-2020' }, { refId: 'nejm-aiha-2021' }],
    lastUpdate: '2026-01',
    tags: ['AHAI', 'hemolise', 'Coombs', 'crioaglutinina', 'autoimune']
  },

  // ============================================================================
  // DOENCAS HEMATOLOGICAS RARAS
  // ============================================================================
  {
    id: 'hemoglobinuria-paroxistica-noturna',
    titulo: 'Hemoglobinuria Paroxistica Noturna',
    sinonimos: ['HPN', 'PNH', 'Doenca de Marchiafava-Micheli'],
    doid: 'DOID:2035',
    snomedCT: '1963002',
    meshId: 'D006457',
    umlsCui: 'C0024790',
    ordo: ['ORPHA:447'],
    ciap2: ['B78'],
    cid10: ['D59.5'],
    cid11: ['3A21.1'],
    categoria: 'hematologico',
    subcategoria: 'anemia_hemolitica_rara',
    quickView: {
      definicao: 'Doenca clonal rara adquirida causada por mutacao somatica em PIGA, resultando em deficiencia de proteinas ancoradas por GPI. Triade classica: hemolise intravascular, trombose e falencia medular. Hemoglobinuria matinal e sinal classico mas nao obrigatorio.',
      criteriosDiagnosticos: [
        'Citometria de fluxo: deficiencia de proteinas GPI-ancoradas',
        '- CD55, CD59 em eritrocitos',
        '- FLAER, CD14, CD16, CD24 em leucocitos',
        'Clone PNH: tipo III (ausencia total) e tipo II (parcial)',
        'Tamanho do clone: pequeno (<10%), intermediario (10-50%), grande (>50%)',
        '',
        'MANIFESTACOES CLINICAS:',
        '- Hemolise intravascular cronica',
        '- Trombose (venosa/arterial, locais atipicos)',
        '- Citopenias (sobreposicao com AA)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Centro especializado em HPN',
          'Anticoagulacao profilatica controversa',
          'Vacinacao meningococica (antes de eculizumabe)',
          'Suplementacao de ferro e folato se deficientes'
        ],
        farmacologico: [
          'INIBIDOR DE COMPLEMENTO (padrao de tratamento):',
          'Eculizumabe 600mg IV semanal x4, depois 900mg a cada 2 semanas',
          'OU Ravulizumabe 3000mg dose unica, depois mensal (meia-vida longa)',
          'Pegcetacoplan (inibidor C3): hemolise extravascular breakthrough',
          '',
          'INDICACOES DE INIBIDOR DE C5:',
          '- Hemolise sintomatica',
          '- Trombose',
          '- Disfuncao renal',
          '- Dependencia transfusional',
          '',
          'CITOPENIAS GRAVES:',
          'Imunossupressao (ATG + ciclosporina) se AA associada',
          'Transplante alogenico (curativo, reservado para casos graves)'
        ]
      },
      metasTerapeuticas: [
        'Controle de hemolise (LDH proxima ao normal)',
        'Prevencao de trombose',
        'Independencia transfusional',
        'Melhora de qualidade de vida'
      ],
      examesIniciais: [
        'Citometria de fluxo para GPI (diagnostico)',
        'Hemograma completo',
        'Reticulocitos',
        'LDH (muito elevado na hemolise ativa)',
        'Haptoglobina (indetectavel)',
        'Bilirrubinas',
        'Funcao renal',
        'Ferritina, ferro serico',
        'Coombs direto (negativo)',
        'EAS (hemoglobinuria)',
        'Biopsia de medula (avaliar celularidade)'
      ],
      redFlags: [
        'Trombose venosa em sitios atipicos (Budd-Chiari, cerebral, mesenterica)',
        'Insuficiencia renal aguda',
        'Dor abdominal intensa (trombose mesenterica, espasmo esofagico)',
        'Dispneia/hipertensao pulmonar',
        'Citopenias graves (sobreposicao com AA)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-5/1.000.000',
        incidencia: '1-1,5/1.000.000/ano',
        mortalidade: 'Sobrevida 10-15 anos sem tratamento; quase normal com eculizumabe',
        faixaEtaria: 'Adultos jovens (mediana 30-40 anos)',
        fatoresRisco: [
          'Anemia aplastica previa (30% desenvolvem clone PNH)',
          'SMD',
          'Nao ha fator de risco modificavel conhecido'
        ],
        citations: [{ refId: 'nejm-pnh-2022' }]
      },
      fisiopatologia: {
        texto: 'Mutacao somatica em PIGA (Xp22.2) em celula-tronco hematopoietica causa deficiencia de ancora GPI. Proteinas reguladoras de complemento (CD55, CD59) ficam ausentes, tornando eritrocitos susceptiveis a lise mediada por complemento. Clone PNH expande, possivelmente por vantagem seletiva.',
        citations: [{ refId: 'blood-pnh-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Hemoglobinuria (urina escura, especialmente matinal) - nao obrigatoria',
          'Fadiga intensa',
          'Dispneia',
          'Disfagia e dor abdominal (espasmo muscular liso)',
          'Disfuncao eretil',
          'Trombose (30-40%)'
        ],
        sinaisExameFisico: [
          'Palidez',
          'Ictericia leve',
          'Sinais de trombose se presente',
          'Espleno/hepatomegalia se Budd-Chiari'
        ],
        formasClinicas: [
          'HPN classica (hemolise predominante)',
          'HPN associada a outra doenca medular (AA, SMD)',
          'HPN subclinica (clone pequeno, assintomatico)'
        ],
        citations: [{ refId: 'nejm-pnh-2022' }]
      },
      diagnostico: {
        criterios: [
          'Clone PNH por citometria de fluxo',
          'Evidencia de hemolise intravascular ou trombose ou citopenia'
        ],
        diagnosticoDiferencial: [
          'Anemia hemolitica autoimune',
          'Anemia aplastica',
          'Mielodisplasia',
          'Hemoglobinuria da marcha'
        ],
        examesLaboratoriais: [
          'Citometria de fluxo para GPI (diagnostico)',
          'LDH (muito elevado)',
          'Haptoglobina (indetectavel)',
          'Coombs direto (negativo)',
          'EAS: hemoglobinuria'
        ],
        examesImagem: [
          'Doppler/TC/RM se suspeita de trombose',
          'Biopsia de medula (avaliar celularidade)'
        ],
        citations: [{ refId: 'blood-pnh-2021' }]
      },
      tratamento: {
        objetivos: [
          'Controlar hemolise',
          'Prevenir trombose',
          'Manter qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Vacinacao meningococica (obrigatoria antes de anti-C5)',
            'Antibiotico profilatico durante eculizumabe (controverso)',
            'Suplementacao de ferro/folato',
            'Transfusao se necessario'
          ],
          citations: [{ refId: 'ash-pnh-guidelines-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inibidor C5', medicamentos: ['Eculizumabe', 'Ravulizumabe'], posologia: 'Eculizumabe 600mg IV semanal x4, 900mg quinzenal depois; Ravulizumabe mensal', observacoes: 'Padrao de tratamento; risco de meningococo' }
          ],
          segundaLinha: [
            { classe: 'Inibidor C3', medicamentos: ['Pegcetacoplan'], posologia: '1080mg SC 2x/semana', observacoes: 'Hemolise extravascular breakthrough' },
            { classe: 'Inibidor Fator D', medicamentos: ['Danicopan'], posologia: 'Add-on a eculizumabe', observacoes: 'Hemolise extravascular' }
          ],
          situacoesEspeciais: [
            { situacao: 'Trombose', conduta: 'Anticoagulacao + eculizumabe urgente' },
            { situacao: 'AA associada', conduta: 'ATG + ciclosporina; eculizumabe se hemolise' },
            { situacao: 'Gravidez', conduta: 'Manter eculizumabe; alto risco trombotico' },
            { situacao: 'Curativo', conduta: 'TMO alogenico (reservado para casos graves)' }
          ],
          citations: [{ refId: 'nejm-pnh-2022' }]
        },
        duracao: 'Inibidores de complemento: cronico, por toda a vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal no inicio; depois trimestral',
        examesControle: [
          'Hemograma + reticulocitos',
          'LDH (marcador de hemolise)',
          'Haptoglobina',
          'Citometria de fluxo anual',
          'Funcao renal'
        ],
        metasTerapeuticas: [
          'LDH <1,5x normal',
          'Ausencia de trombose',
          'Independencia transfusional'
        ],
        criteriosEncaminhamento: [
          'Todos: centro especializado',
          'Trombose',
          'Candidato a TMO'
        ],
        citations: [{ refId: 'blood-pnh-2021' }]
      }
    },
    protocolos: ['pnh-eculizumabe', 'pnh-trombose'],
    medicamentos: ['eculizumabe', 'ravulizumabe', 'pegcetacoplan'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'nejm-pnh-2022' }, { refId: 'blood-pnh-2021' }],
    lastUpdate: '2026-01',
    tags: ['HPN', 'PNH', 'complemento', 'eculizumabe', 'trombose', 'hemolise']
  },

  {
    id: 'mastocitose-sistemica',
    titulo: 'Mastocitose Sistemica',
    sinonimos: ['SM', 'Mastocitose sistemica', 'Doenca dos mastocitos'],
    doid: 'DOID:349',
    snomedCT: '397009008',
    meshId: 'D034721',
    umlsCui: 'C0221013',
    ordo: ['ORPHA:2467'],
    ciap2: ['B74'],
    cid10: ['D47.0', 'D47.02'],
    cid11: ['2A21'],
    categoria: 'hematologico',
    subcategoria: 'neoplasia_mastocitaria',
    quickView: {
      definicao: 'Neoplasia caracterizada por acumulo de mastocitos clonais em orgaos extradermos, principalmente medula ossea. Espectro clinico amplo: desde formas indolentes ate leucemia de mastocitos agressiva. Mutacao KIT D816V presente em >90%.',
      criteriosDiagnosticos: [
        'CRITERIO MAIOR:',
        'Agregados densos de mastocitos (>=15) em medula ossea ou outro orgao extradermico',
        '',
        'CRITERIOS MENORES (>=1 necessario com maior, ou >=3 sem maior):',
        '- >25% dos mastocitos sao fusiformes ou atipicos',
        '- Expressao aberrante de CD25 +/- CD2 em mastocitos',
        '- Mutacao KIT no codon 816 (D816V)',
        '- Triptase serica basal >20 ng/mL (excluido contexto de outra neoplasia mieloide)',
        '',
        'CLASSIFICACAO OMS 2022:',
        '- SM indolente (ISM)',
        '- SM smoldering (SSM)',
        '- SM com neoplasia hematologica associada (SM-AHN)',
        '- SM agressiva (ASM)',
        '- Leucemia de mastocitos (MCL)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar gatilhos de degranulacao (alimentos, medicamentos, insetos)',
          'Portar adrenalina autoinjetavel',
          'Plano de emergencia para anafilaxia',
          'Evitar AINEs, opioides, contrastes (com preparo)'
        ],
        farmacologico: [
          'SINTOMAS MEDIADORES (todos os pacientes):',
          'Anti-H1 (cetirizina, loratadina) + Anti-H2 (famotidina)',
          'Cromoglicato de sodio 200mg VO 4x/dia (sintomas GI)',
          'Corticoides topicos ou sistemicos para lesoes cutaneas',
          '',
          'SM AVANCADA (ASM, SM-AHN, MCL):',
          'Midostaurina 100mg 2x/dia (inibidor de KIT)',
          'Avapritinibe 200mg/dia (inibidor seletivo KIT D816V)',
          'Cladribina (2-CdA) se nao responsivo',
          'TMO alogenico em casos selecionados'
        ]
      },
      metasTerapeuticas: [
        'Controle de sintomas de degranulacao',
        'Prevencao de anafilaxia',
        'Reducao de carga de mastocitos (doenca avancada)',
        'Qualidade de vida'
      ],
      examesIniciais: [
        'Triptase serica basal',
        'Biopsia de medula ossea com imunohistoquimica (CD117, CD25)',
        'Mutacao KIT D816V (sangue periferico ou medula)',
        'Hemograma completo',
        'Funcao hepatica',
        'Densitometria ossea (osteoporose frequente)',
        'USG abdominal (hepatoesplenomegalia)',
        'Considerar biopsia de pele se lesoes cutaneas'
      ],
      redFlags: [
        'Anafilaxia recorrente sem causa aparente',
        'Citopenias (doenca avancada)',
        'Hepatoesplenomegalia progressiva',
        'Ascite',
        'Perda de peso',
        'Sintomas B',
        'Lesoes osteoliticas'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1/10.000 (incluindo formas cutaneas)',
        incidencia: '0,1/100.000/ano (formas sistemicas)',
        mortalidade: 'ISM: expectativa de vida quase normal; ASM/MCL: sobrevida curta sem tratamento',
        faixaEtaria: 'Adultos: mediana 40-50 anos',
        fatoresRisco: [
          'Nao ha fatores de risco modificaveis conhecidos'
        ],
        citations: [{ refId: 'blood-mastocytosis-2022' }]
      },
      fisiopatologia: {
        texto: 'Mutacao ativadora KIT D816V (>90%) causa proliferacao clonal de mastocitos. Mastocitos se acumulam em medula ossea e outros orgaos. Liberacao de mediadores (histamina, triptase, leucotrienos) causa sintomas. Doenca avancada: infiltracao organica e falencia.',
        citations: [{ refId: 'nejm-mastocytosis-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sintomas de degranulacao: flushing, prurido, urticaria',
          'Anafilaxia (especialmente a picadas de insetos)',
          'Sintomas GI: dor abdominal, diarreia, nausea',
          'Sintomas neurocognitivos: brain fog, cefaleia',
          'Osteoporose/fraturas',
          'Sintomas B em doenca avancada'
        ],
        sinaisExameFisico: [
          'Lesoes cutaneas: urticaria pigmentosa (sinal de Darier)',
          'Hepatoesplenomegalia (doenca avancada)',
          'Linfadenopatia (raro)',
          'Flushing durante crises'
        ],
        formasClinicas: [
          'SM indolente (ISM): assintomatica ou sintomas de mediadores',
          'SM smoldering (SSM): achados B sem C',
          'SM com AHN: SMD, NMP, LMMC associada',
          'SM agressiva (ASM): disfuncao organica',
          'Leucemia de mastocitos (MCL): >=20% mastocitos em medula ou sangue'
        ],
        citations: [{ refId: 'blood-mastocytosis-2022' }]
      },
      diagnostico: {
        criterios: [
          'Criterio maior + 1 menor',
          'Ou >=3 criterios menores',
          'Subclassificar por achados B e C'
        ],
        diagnosticoDiferencial: [
          'Urticaria cronica',
          'Sindrome carcinoide',
          'Feocromocitoma',
          'Sindrome de ativacao mastocitaria (MCAS)',
          'Outras neoplasias mieloides'
        ],
        examesLaboratoriais: [
          'Triptase basal (>=20 ng/mL)',
          'KIT D816V',
          'Hemograma',
          'Funcao hepatica',
          'Fosfatase alcalina'
        ],
        examesImagem: [
          'Biopsia de medula ossea',
          'USG/TC abdominal',
          'Densitometria ossea'
        ],
        citations: [{ refId: 'who-classification-2022' }]
      },
      tratamento: {
        objetivos: [
          'Controle de sintomas',
          'Prevencao de anafilaxia',
          'Reducao de carga tumoral (avancada)'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar gatilhos conhecidos',
            'Adrenalina autoinjetavel',
            'Alerta medico',
            'Pre-medicacao para procedimentos'
          ],
          citations: [{ refId: 'jaci-mastocytosis-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anti-histaminicos', medicamentos: ['Cetirizina', 'Famotidina'], posologia: 'Cetirizina 10mg/dia; Famotidina 20-40mg 2x/dia', observacoes: 'Base do tratamento sintomatico' },
            { classe: 'Inibidor de KIT', medicamentos: ['Avapritinibe'], posologia: '200mg/dia VO', observacoes: 'SM avancada com KIT D816V; alta taxa de resposta' }
          ],
          segundaLinha: [
            { classe: 'Inibidor multikinase', medicamentos: ['Midostaurina'], posologia: '100mg 2x/dia com alimentos', observacoes: 'SM avancada' },
            { classe: 'Analogo purina', medicamentos: ['Cladribina'], posologia: 'Ciclos IV', observacoes: 'Refratario a TKI' }
          ],
          situacoesEspeciais: [
            { situacao: 'Anafilaxia a insetos', conduta: 'Imunoterapia com veneno (eficaz); manter adrenalina' },
            { situacao: 'Osteoporose', conduta: 'Bisfosfonatos; calcio e vitamina D' },
            { situacao: 'SM-AHN', conduta: 'Tratar componente hematologico; avapritinibe/midostaurina' }
          ],
          citations: [{ refId: 'blood-mastocytosis-2022' }]
        },
        duracao: 'Cronico; TKI indefinido em doenca avancada'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; anual se ISM estavel',
        examesControle: [
          'Triptase periodica',
          'Hemograma',
          'Funcao hepatica',
          'Densitometria a cada 2 anos'
        ],
        metasTerapeuticas: [
          'Ausencia de anafilaxia',
          'Controle de sintomas',
          'Triptase estavel ou em queda'
        ],
        criteriosEncaminhamento: [
          'Todos: especialista em mastocitose',
          'Alergista para manejo de anafilaxia',
          'Hematologista para doenca avancada'
        ],
        citations: [{ refId: 'jaci-mastocytosis-2021' }]
      }
    },
    protocolos: ['mastocitose-sintomas-mediadores', 'mastocitose-avancada'],
    medicamentos: ['avapritinibe', 'midostaurina', 'cetirizina', 'famotidina', 'cromoglicato'],
    calculadoras: ['ipsm'],
    rastreamentos: [],
    citations: [{ refId: 'blood-mastocytosis-2022' }, { refId: 'nejm-mastocytosis-2021' }],
    lastUpdate: '2026-01',
    tags: ['mastocitose', 'mastocito', 'KIT', 'anafilaxia', 'triptase', 'avapritinibe']
  }
];
