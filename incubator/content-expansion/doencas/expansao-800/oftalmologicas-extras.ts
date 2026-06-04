/**
 * DOENCAS OFTALMOLOGICAS EXTRAS - DARWIN-MFC EXPANSAO 800
 * ========================================================
 * 10 doencas oftalmologicas adicionais de alta prevalencia na APS
 */

import { Doenca } from '@/lib/types/doenca';

export const oftalmologicasExtras: Doenca[] = [
  // ============================================================================
  // CATARATA SENIL
  // ============================================================================
  {
    id: 'catarata-senil',
    titulo: 'Catarata Senil',
    sinonimos: ['Catarata relacionada a idade', 'Age-related cataract', 'Senile cataract'],
    doid: 'DOID:83',
    snomedCT: '193570009',
    meshId: 'D002386',
    ciap2: ['F92'],
    cid10: ['H25'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Opacificacao progressiva do cristalino relacionada ao envelhecimento, causando diminuicao gradual da acuidade visual. Principal causa de cegueira reversivel no mundo.',
      criteriosDiagnosticos: [
        'Idade >50 anos',
        'Diminuicao progressiva da acuidade visual',
        'Opacificacao do cristalino a biomicroscopia',
        'Dificuldade para visao noturna e dirigir',
        'Sensibilidade ao ofuscamento'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Atualizacao de oculos pode ajudar inicialmente',
          'Iluminacao adequada para leitura',
          'Cirurgia de facoemulsificacao quando interfere nas AVDs'
        ],
        farmacologico: [
          'Nao ha tratamento farmacologico eficaz',
          'Cirurgia e o unico tratamento definitivo'
        ]
      },
      metasTerapeuticas: [
        'Melhora da acuidade visual apos cirurgia',
        'Recuperacao da independencia funcional'
      ],
      examesIniciais: [
        'Acuidade visual',
        'Biomicroscopia com dilatacao',
        'Tonometria'
      ],
      redFlags: [
        'Perda visual subita (nao e catarata)',
        'Dor ocular associada',
        'Catarata em jovem (investigar causas secundarias)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '50% em >65 anos; 70% em >75 anos',
        faixaEtaria: 'Aumenta com idade',
        fatoresRisco: [
          'Idade avancada',
          'Diabetes mellitus',
          'Tabagismo',
          'Exposicao solar',
          'Uso cronico de corticoides',
          'Trauma ocular previo'
        ],
        citations: [{ refId: 'aao-cataract-2022' }]
      },
      fisiopatologia: {
        texto: 'Desnaturacao e agregacao das proteinas cristalinas do cristalino por estresse oxidativo, glicacao e exposicao UV, levando a opacificacao progressiva.',
        citations: [{ refId: 'lancet-cataract-2017' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Visao embaçada progressiva',
          'Ofuscamento por luzes',
          'Melhora paradoxal da presbiopia (segunda visao)',
          'Alteracao na percepcao de cores'
        ],
        sinaisExameFisico: [
          'Opacidade do cristalino (nuclear, cortical ou subcapsular)',
          'Reflexo vermelho alterado'
        ],
        formasClinicas: ['Nuclear', 'Cortical', 'Subcapsular posterior'],
        citations: [{ refId: 'aao-cataract-2022' }]
      },
      diagnostico: {
        criterios: [
          'Diminuicao da acuidade visual',
          'Opacificacao do cristalino confirmada',
          'Exclusao de outras causas'
        ],
        diagnosticoDiferencial: [
          'Glaucoma',
          'DMRI',
          'Retinopatia diabetica',
          'Opacidades vitreas'
        ],
        citations: [{ refId: 'aao-cataract-2022' }]
      },
      tratamento: {
        objetivos: ['Restaurar acuidade visual', 'Melhorar qualidade de vida'],
        naoFarmacologico: {
          medidas: [
            'Facoemulsificacao com implante de LIO (lente intraocular)',
            'Indicacao cirurgica quando AV interfere nas AVDs'
          ],
          citations: [{ refId: 'cochrane-cataract-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Nenhum', medicamentos: ['N/A'], observacoes: 'Tratamento e exclusivamente cirurgico' }
          ],
          citations: [{ refId: 'aao-cataract-2022' }]
        },
        duracao: 'Cirurgia ambulatorial com recuperacao em semanas'
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual se nao operar; pos-op conforme protocolo',
        metasTerapeuticas: ['AV corrigida >20/40'],
        criteriosEncaminhamento: ['Indicacao cirurgica', 'Catarata em jovem'],
        citations: [{ refId: 'aao-cataract-2022' }]
      },
      prevencao: {
        primaria: ['Protecao solar (oculos UV)', 'Controle glicemico'],
        secundaria: ['Deteccao e tratamento precoce'],
        citations: [{ refId: 'aao-cataract-2022' }]
      }
    },
    protocolos: ['catarata-manejo'],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'aao-cataract-2022' }],
    lastUpdate: '2026-01',
    tags: ['catarata', 'cristalino', 'cirurgia', 'facoemulsificacao']
  },

  // ============================================================================
  // RETINOPATIA DIABETICA
  // ============================================================================
  {
    id: 'retinopatia-diabetica',
    titulo: 'Retinopatia Diabetica',
    sinonimos: ['RD', 'Diabetic retinopathy', 'Retinopatia do diabetes'],
    doid: 'DOID:8947',
    snomedCT: '4855003',
    meshId: 'D003930',
    ciap2: ['F83'],
    cid10: ['H36.0', 'E10.3', 'E11.3'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Complicacao microvascular do diabetes mellitus que afeta a retina, podendo levar a cegueira. Principal causa de cegueira em adultos em idade laboral.',
      criteriosDiagnosticos: [
        'Diabetes mellitus diagnosticado',
        'Microaneurismas retinianos (sinal mais precoce)',
        'Hemorragias, exsudatos duros, manchas algodonosas',
        'Edema macular diabetico (EMD)',
        'Neovascularizacao (forma proliferativa)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Controle glicemico rigoroso (HbA1c <7%)',
          'Controle da PA (<130/80)',
          'Controle lipidico'
        ],
        farmacologico: [
          'EMD: Anti-VEGF intravítreo (Aflibercepte, Ranibizumabe)',
          'RD proliferativa: Fotocoagulacao pan-retiniana a laser'
        ]
      },
      metasTerapeuticas: ['HbA1c <7%', 'Estabilizar ou regredir retinopatia'],
      examesIniciais: ['Fundoscopia com dilatacao', 'OCT de macula', 'Angiofluoresceinografia'],
      redFlags: [
        'Perda visual subita (hemorragia vitrea)',
        'Neovascularizacao de disco ou retina',
        'Descolamento tracional da retina'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '35% dos diabeticos; 10% com forma ameacadora da visao',
        faixaEtaria: 'Aumenta com duracao do DM',
        fatoresRisco: [
          'Duracao do diabetes (>10 anos)',
          'Mau controle glicemico',
          'Hipertensao arterial',
          'Dislipidemia',
          'Gestacao em diabetica',
          'Nefropatia diabetica'
        ],
        citations: [{ refId: 'aao-dr-2019' }]
      },
      fisiopatologia: {
        texto: 'Hiperglicemia cronica causa dano microvascular com perda de pericitos, aumento de permeabilidade, isquemia retiniana e producao de VEGF levando a neovascularizacao.',
        citations: [{ refId: 'nejm-dr-2012' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Assintomatica nas fases iniciais',
          'Visao embaçada (edema macular)',
          'Moscas volantes (hemorragia vitrea)',
          'Perda visual subita'
        ],
        sinaisExameFisico: [
          'Microaneurismas',
          'Hemorragias puntiformes e em chama',
          'Exsudatos duros e algodonosos',
          'IRMA, rosarios venosos',
          'Neovascularizacao'
        ],
        formasClinicas: [
          'RDNP leve, moderada, grave',
          'RD proliferativa',
          'Edema macular diabetico'
        ],
        citations: [{ refId: 'aao-dr-2019' }]
      },
      diagnostico: {
        criterios: [
          'Fundoscopia com alteracoes tipicas em diabetico',
          'Classificacao pela International Clinical DR Scale'
        ],
        diagnosticoDiferencial: ['Oclusao venosa', 'Retinopatia hipertensiva', 'DMRI'],
        examesImagem: ['OCT de macula', 'Angiofluoresceinografia'],
        citations: [{ refId: 'aao-dr-2019' }]
      },
      tratamento: {
        objetivos: ['Prevenir perda visual', 'Tratar edema macular'],
        naoFarmacologico: {
          medidas: [
            'Controle metabolico intensivo',
            'Fotocoagulacao a laser pan-retiniana (RDP)',
            'Vitrectomia se hemorragia vitrea ou descolamento'
          ],
          citations: [{ refId: 'drcr-protocol-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anti-VEGF', medicamentos: ['Aflibercepte', 'Ranibizumabe'], posologia: 'Intravítreo mensal inicialmente', observacoes: 'Primeira linha para EMD com perda visual' }
          ],
          segundaLinha: [
            { classe: 'Corticoide intravítreo', medicamentos: ['Dexametasona implante'], observacoes: 'Para EMD refratario' }
          ],
          citations: [{ refId: 'drcr-protocol-2019' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'DM1: anual apos 5 anos; DM2: ao diagnostico e anual',
        examesControle: ['Fundoscopia', 'OCT', 'HbA1c'],
        metasTerapeuticas: ['HbA1c <7%', 'PA <130/80'],
        criteriosEncaminhamento: ['RDNP grave', 'RDP', 'EMD'],
        citations: [{ refId: 'aao-dr-2019' }]
      },
      prevencao: {
        primaria: ['Controle glicemico desde o diagnostico', 'Controle de PA'],
        secundaria: ['Rastreamento anual', 'Tratamento precoce'],
        citations: [{ refId: 'aao-dr-2019' }]
      }
    },
    protocolos: ['retinopatia-diabetica-rastreamento'],
    medicamentos: ['aflibercepte', 'ranibizumabe'],
    calculadoras: ['risco-rd'],
    rastreamentos: ['rastreamento-rd-diabeticos'],
    citations: [{ refId: 'aao-dr-2019' }],
    lastUpdate: '2026-01',
    tags: ['retinopatia', 'diabetes', 'cegueira', 'anti-vegf', 'edema-macular']
  },

  // ============================================================================
  // DESCOLAMENTO DE RETINA
  // ============================================================================
  {
    id: 'descolamento-retina',
    titulo: 'Descolamento de Retina',
    sinonimos: ['DR', 'Retinal detachment', 'Desprendimento de retina'],
    doid: 'DOID:5327',
    snomedCT: '19620000',
    meshId: 'D012163',
    ciap2: ['F82'],
    cid10: ['H33'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Separacao da retina neurossensorial do epitelio pigmentar subjacente. Emergencia oftalmologica com risco de perda visual permanente se nao tratada rapidamente.',
      criteriosDiagnosticos: [
        'Fotopsias (flashes de luz)',
        'Aumento subito de moscas volantes',
        'Cortina ou sombra no campo visual',
        'Perda visual se macula descolada',
        'Fundoscopia: retina elevada, movel, com rotura'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'EMERGENCIA - encaminhar imediatamente',
          'Repouso com posicionamento especifico',
          'Cirurgia: retinopexia pneumatica, crioterapia, vitrectomia ou introflexao escleral'
        ],
        farmacologico: ['Nao ha tratamento farmacologico - cirurgico exclusivo']
      },
      metasTerapeuticas: ['Reaplicacao da retina', 'Preservacao da visao central'],
      examesIniciais: ['Fundoscopia com dilatacao', 'Ecografia ocular (se opacidade de meios)'],
      redFlags: [
        'Perda visual central (macula descolada)',
        'Sintomas bilaterais',
        'Trauma ocular recente',
        'Cirurgia de catarata recente'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:10.000/ano',
        incidencia: '12/100.000/ano',
        faixaEtaria: 'Pico 60-70 anos; jovens com alta miopia',
        fatoresRisco: [
          'Miopia elevada (>6D)',
          'Cirurgia de catarata previa',
          'Trauma ocular',
          'Historia familiar',
          'Degeneracoes retinianas perifericas',
          'Descolamento no olho contralateral'
        ],
        citations: [{ refId: 'aao-retinal-detachment-2020' }]
      },
      fisiopatologia: {
        texto: 'Roturas retinianas permitem entrada de liquido vitreo no espaco sub-retiniano, separando a retina neurossensorial do EPR. Tipos: regmatogenico (mais comum), tracional, exsudativo.',
        citations: [{ refId: 'retina-textbook-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Fotopsias (flashes)',
          'Floaters aumentados subitamente',
          'Sombra/cortina no campo visual',
          'Perda da visao central se macula afetada'
        ],
        sinaisExameFisico: [
          'Retina elevada e movel',
          'Rotura retiniana visivel',
          'Tabaco de Schaffer (pigmento no vitreo)',
          'Hipotonia ocular'
        ],
        formasClinicas: ['Regmatogenico', 'Tracional', 'Exsudativo'],
        citations: [{ refId: 'aao-retinal-detachment-2020' }]
      },
      diagnostico: {
        criterios: [
          'Historia clinica sugestiva',
          'Fundoscopia com retina descolada',
          'Identificacao de rotura'
        ],
        diagnosticoDiferencial: ['Descolamento vitreo posterior', 'Retinosquise', 'Coroidal effusion'],
        examesImagem: ['Ecografia B-scan', 'OCT'],
        citations: [{ refId: 'aao-retinal-detachment-2020' }]
      },
      tratamento: {
        objetivos: ['Reaplicacao retiniana', 'Fechar roturas', 'Preservar visao'],
        naoFarmacologico: {
          medidas: [
            'Retinopexia pneumatica (casos selecionados)',
            'Introflexao escleral (scleral buckle)',
            'Vitrectomia pars plana',
            'Crioterapia ou laser para roturas'
          ],
          citations: [{ refId: 'aao-retinal-detachment-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Nenhum', medicamentos: ['N/A'], observacoes: 'Tratamento cirurgico exclusivo' }
          ],
          citations: [{ refId: 'aao-retinal-detachment-2020' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Pos-op: 1d, 1sem, 1mes, 3meses, depois anual',
        metasTerapeuticas: ['Retina aplicada', 'AV estavel'],
        criteriosEncaminhamento: ['Todos - emergencia oftalmologica'],
        citations: [{ refId: 'aao-retinal-detachment-2020' }]
      },
      prevencao: {
        primaria: ['Exame de fundo de olho em miopicos', 'Protecao ocular em esportes'],
        secundaria: ['Tratamento profilatico de roturas'],
        citations: [{ refId: 'aao-retinal-detachment-2020' }]
      }
    },
    protocolos: ['descolamento-retina-emergencia'],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'aao-retinal-detachment-2020' }],
    lastUpdate: '2026-01',
    tags: ['descolamento', 'retina', 'emergencia', 'cirurgia-vitreoretiniana']
  },

  // ============================================================================
  // UVEITE
  // ============================================================================
  {
    id: 'uveite',
    titulo: 'Uveite',
    sinonimos: ['Inflamacao intraocular', 'Uveitis', 'Irite', 'Iridociclite'],
    doid: 'DOID:13141',
    snomedCT: '128473001',
    meshId: 'D014605',
    ciap2: ['F73'],
    cid10: ['H20'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Inflamacao da uvea (iris, corpo ciliar, coroide). Pode ser anterior (mais comum), intermediaria, posterior ou pan-uveite. Multiplas etiologias infecciosas e nao infecciosas.',
      criteriosDiagnosticos: [
        'Dor ocular e fotofobia',
        'Olho vermelho (hiperemia ciliar)',
        'Diminuicao da acuidade visual',
        'Celulas e flare na camara anterior',
        'Precipitados ceraticos',
        'Sinequias posteriores'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Investigacao etiologica', 'Oculos escuros'],
        farmacologico: [
          'Corticoide topico: Prednisolona 1% 1gota 1/1h a 4/4h',
          'Midriático/cicloplegico: Ciclopentolato ou Atropina',
          'Casos graves: corticoide sistemico ou periocular'
        ]
      },
      metasTerapeuticas: ['Controle da inflamacao', 'Prevencao de complicacoes'],
      examesIniciais: ['Biomicroscopia', 'Fundoscopia', 'Tonometria', 'Labs conforme suspeita'],
      redFlags: [
        'Hipopion (pus na CA)',
        'Uveite bilateral em jovem (espondilite?)',
        'Uveite posterior com vitreite grave',
        'Suspeita de endoftalmite'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '38-714/100.000',
        incidencia: '17-52/100.000/ano',
        faixaEtaria: '20-50 anos mais comum',
        fatoresRisco: [
          'Doencas autoimunes (espondilite, sarcoidose)',
          'Infeccoes (toxoplasmose, herpes, TB, sifilis)',
          'HLA-B27 positivo',
          'Trauma ocular'
        ],
        citations: [{ refId: 'aao-uveitis-2021' }]
      },
      fisiopatologia: {
        texto: 'Inflamacao da uvea por mecanismos autoimunes (mais comum), infecciosos ou idiopaticos. Quebra da barreira hemato-aquosa com influxo de celulas inflamatorias e proteinas.',
        citations: [{ refId: 'lancet-uveitis-2016' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor ocular',
          'Fotofobia',
          'Lacrimejamento',
          'Visao embaçada',
          'Olho vermelho'
        ],
        sinaisExameFisico: [
          'Hiperemia ciliar',
          'Celulas e flare na CA',
          'Precipitados ceraticos',
          'Sinequias posteriores',
          'Miose'
        ],
        formasClinicas: ['Anterior aguda', 'Anterior cronica', 'Intermediaria', 'Posterior', 'Pan-uveite'],
        citations: [{ refId: 'aao-uveitis-2021' }]
      },
      diagnostico: {
        criterios: [
          'Exame biomicroscopico confirmando inflamacao',
          'Classificacao anatomica (SUN criteria)'
        ],
        diagnosticoDiferencial: ['Conjuntivite', 'Ceratite', 'Glaucoma agudo', 'Esclerite'],
        examesLaboratoriais: ['HLA-B27', 'FTA-ABS/VDRL', 'PPD', 'Rx torax', 'Sorologias'],
        citations: [{ refId: 'aao-uveitis-2021' }]
      },
      tratamento: {
        objetivos: ['Controlar inflamacao', 'Tratar causa base', 'Prevenir complicacoes'],
        naoFarmacologico: {
          medidas: ['Investigacao etiologica sistematica', 'Acompanhamento multidisciplinar se sistemica'],
          citations: [{ refId: 'aao-uveitis-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide topico', medicamentos: ['Prednisolona 1%', 'Dexametasona 0,1%'], posologia: '1 gota 1/1h a 4/4h conforme gravidade' },
            { classe: 'Midriático', medicamentos: ['Ciclopentolato 1%', 'Atropina 1%'], posologia: '2-3x/dia', observacoes: 'Previne sinequias' }
          ],
          segundaLinha: [
            { classe: 'Corticoide sistemico', medicamentos: ['Prednisona'], posologia: '1mg/kg/dia', observacoes: 'Para casos graves ou posteriores' }
          ],
          situacoesEspeciais: [
            { situacao: 'Uveite infecciosa', conduta: 'Tratamento especifico (antivirais, antimicrobianos)' },
            { situacao: 'Uveite cronica recorrente', conduta: 'Imunossupressores (MTX, AZA, micofenolato)' }
          ],
          citations: [{ refId: 'aao-uveitis-2021' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Aguda: a cada 1-7 dias ate controle; cronica: mensal a trimestral',
        metasTerapeuticas: ['Celulas <0,5+ na CA', 'Ausencia de complicacoes'],
        criteriosEncaminhamento: ['Todos para oftalmologista', 'Casos sistemicos para reumatologia'],
        citations: [{ refId: 'aao-uveitis-2021' }]
      },
      prevencao: {
        primaria: ['Tratamento de doencas sistemicas associadas'],
        secundaria: ['Tratamento precoce para evitar complicacoes'],
        citations: [{ refId: 'aao-uveitis-2021' }]
      }
    },
    protocolos: ['uveite-manejo'],
    medicamentos: ['prednisolona-colirio', 'ciclopentolato', 'atropina'],
    calculadoras: [],
    citations: [{ refId: 'aao-uveitis-2021' }],
    lastUpdate: '2026-01',
    tags: ['uveite', 'inflamacao', 'corticoide', 'autoimune']
  },

  // ============================================================================
  // CERATOCONE
  // ============================================================================
  {
    id: 'ceratocone',
    titulo: 'Ceratocone',
    sinonimos: ['Keratoconus', 'Cornea conica'],
    doid: 'DOID:11492',
    snomedCT: '2576002',
    meshId: 'D007640',
    ciap2: ['F79'],
    cid10: ['H18.6'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Ectasia corneana progressiva caracterizada por afinamento e protrusao conica da cornea, causando astigmatismo irregular e baixa visual. Inicio na puberdade.',
      criteriosDiagnosticos: [
        'Astigmatismo irregular progressivo',
        'Topografia corneana com padrao de cone',
        'Sinal de Munson (protrusao da palpebra inferior)',
        'Estrias de Vogt',
        'Anel de Fleischer',
        'Afinamento corneano central/paracentral'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar cocar os olhos (progressao)',
          'Lentes de contato rigidas gas-permeaveis (RGP)',
          'Crosslinking corneano (estabilizacao)',
          'Aneis intracorneanos (casos moderados)'
        ],
        farmacologico: ['Colirios lubrificantes para conforto']
      },
      metasTerapeuticas: ['Estabilizar progressao', 'Melhorar acuidade visual'],
      examesIniciais: ['Topografia corneana', 'Paquimetria', 'Tomografia corneana'],
      redFlags: [
        'Hidrops corneano agudo (ruptura da Descemet)',
        'Progressao rapida em jovem',
        'Opacidade corneana'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1:2000 a 1:400',
        incidencia: 'Inicio na puberdade, pico 20-30 anos',
        faixaEtaria: 'Adolescentes e adultos jovens',
        fatoresRisco: [
          'Atopia (alergia ocular)',
          'Cocar os olhos vigorosamente',
          'Historia familiar',
          'Sindrome de Down',
          'Doencas do tecido conectivo'
        ],
        citations: [{ refId: 'cornea-kc-review-2019' }]
      },
      fisiopatologia: {
        texto: 'Degradacao do colageno estromal por desequilibrio entre proteases e inibidores, levando a afinamento e ectasia. Fatores geneticos e mecanicos (trauma por cocar) contribuem.',
        citations: [{ refId: 'cornea-kc-review-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Visao embaçada progressiva',
          'Troca frequente de grau dos oculos',
          'Distorcao visual',
          'Fotofobia leve',
          'Imagens fantasma'
        ],
        sinaisExameFisico: [
          'Reflexo em tesoura na retinoscopia',
          'Sinal de Munson',
          'Anel de Fleischer',
          'Estrias de Vogt',
          'Cicatriz de Bowman'
        ],
        formasClinicas: ['Leve', 'Moderado', 'Avancado', 'Hidrops'],
        citations: [{ refId: 'cornea-kc-review-2019' }]
      },
      diagnostico: {
        criterios: [
          'Topografia com padrao de ectasia',
          'Paquimetria com afinamento',
          'Sinais clinicos compativeis'
        ],
        diagnosticoDiferencial: ['Degeneracao marginal pelucida', 'Ectasia pos-LASIK', 'Ceratoglobo'],
        examesImagem: ['Topografia corneana', 'Tomografia (Pentacam)', 'OCT de segmento anterior'],
        citations: [{ refId: 'cornea-kc-review-2019' }]
      },
      tratamento: {
        objetivos: ['Estabilizar progressao', 'Reabilitacao visual'],
        naoFarmacologico: {
          medidas: [
            'Lentes RGP ou esclerais',
            'Crosslinking corneano (CXL) para progressao',
            'Aneis intracorneanos (ICRS)',
            'Transplante de cornea (casos avancados)'
          ],
          citations: [{ refId: 'cornea-kc-review-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Lubrificantes', medicamentos: ['Carboximetilcelulose', 'Hialuronato'], observacoes: 'Conforto com lentes de contato' }
          ],
          citations: [{ refId: 'cornea-kc-review-2019' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semestral se estavel; trimestral se progressao',
        examesControle: ['Topografia', 'Paquimetria', 'AV'],
        metasTerapeuticas: ['Topografia estavel', 'AV funcional'],
        criteriosEncaminhamento: ['Todos para especialista em cornea'],
        citations: [{ refId: 'cornea-kc-review-2019' }]
      },
      prevencao: {
        primaria: ['Evitar cocar os olhos', 'Tratar alergia ocular'],
        secundaria: ['Crosslinking precoce em progressao'],
        citations: [{ refId: 'cornea-kc-review-2019' }]
      }
    },
    protocolos: ['ceratocone-manejo'],
    medicamentos: ['lubrificantes-oculares'],
    calculadoras: [],
    citations: [{ refId: 'cornea-kc-review-2019' }],
    lastUpdate: '2026-01',
    tags: ['ceratocone', 'ectasia', 'cornea', 'crosslinking', 'lentes-contato']
  },

  // ============================================================================
  // OCLUSAO DE VEIA CENTRAL DA RETINA
  // ============================================================================
  {
    id: 'ovcr',
    titulo: 'Oclusao de Veia Central da Retina',
    sinonimos: ['OVCR', 'CRVO', 'Central retinal vein occlusion'],
    doid: 'DOID:1691',
    snomedCT: '36698009',
    meshId: 'D012170',
    ciap2: ['F83'],
    cid10: ['H34.8'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Obstrucao da veia central da retina no nivel da lamina cribosa, causando estase venosa, hemorragias e edema retiniano. Perda visual variavel conforme forma isquemica ou nao.',
      criteriosDiagnosticos: [
        'Perda visual subita ou rapida, indolor',
        'Hemorragias retinianas em todos os quadrantes',
        'Veias dilatadas e tortuosas',
        'Edema de disco optico',
        'Manchas algodonosas',
        'Edema macular'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Investigacao de fatores de risco cardiovascular',
          'Controle de PA, DM, dislipidemia'
        ],
        farmacologico: [
          'Edema macular: Anti-VEGF intravítreo (Aflibercepte, Ranibizumabe)',
          'Forma isquemica: fotocoagulacao pan-retiniana se neovascularizacao'
        ]
      },
      metasTerapeuticas: ['Melhorar ou estabilizar visao', 'Prevenir neovascularizacao'],
      examesIniciais: ['Fundoscopia', 'Angiofluoresceinografia', 'OCT macula'],
      redFlags: [
        'Forma isquemica (risco de glaucoma neovascular)',
        'Neovascularizacao de iris ou angulo',
        'OVCR em jovem (trombofilia?)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,1-0,5%',
        incidencia: '2-5/10.000/ano',
        faixaEtaria: '>50 anos; media 60-65 anos',
        fatoresRisco: [
          'Hipertensao arterial (principal)',
          'Diabetes mellitus',
          'Dislipidemia',
          'Glaucoma',
          'Trombofilias (em jovens)',
          'Hiperviscosidade sanguinea'
        ],
        citations: [{ refId: 'aao-rvo-2019' }]
      },
      fisiopatologia: {
        texto: 'Trombose da veia central da retina na lamina cribosa, onde arteria e veia compartilham adventicia. Compressao por arteriosclerose da arteria causa estase, dano endotelial e trombose.',
        citations: [{ refId: 'retina-rvo-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Perda visual subita, indolor',
          'Visao embaçada',
          'Campo visual reduzido'
        ],
        sinaisExameFisico: [
          'Hemorragias em 4 quadrantes (blood and thunder)',
          'Veias dilatadas e tortuosas',
          'Edema de papila',
          'Manchas algodonosas',
          'Edema macular (cistoide)'
        ],
        formasClinicas: ['Nao isquemica (75%)', 'Isquemica (25%) - pior prognostico'],
        citations: [{ refId: 'aao-rvo-2019' }]
      },
      diagnostico: {
        criterios: [
          'Fundoscopia tipica',
          'Angiofluoresceinografia para definir perfusao'
        ],
        diagnosticoDiferencial: ['Retinopatia diabetica', 'Retinopatia hipertensiva grave', 'Sindrome de hiperviscosidade'],
        examesLaboratoriais: ['Hemograma', 'Glicemia', 'Perfil lipidico', 'Coagulograma em jovens'],
        examesImagem: ['AFG', 'OCT macula'],
        citations: [{ refId: 'aao-rvo-2019' }]
      },
      tratamento: {
        objetivos: ['Tratar edema macular', 'Prevenir complicacoes neovasculares'],
        naoFarmacologico: {
          medidas: [
            'Controle de fatores de risco sistemicos',
            'Fotocoagulacao pan-retiniana se neovascularizacao'
          ],
          citations: [{ refId: 'aao-rvo-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anti-VEGF', medicamentos: ['Aflibercepte', 'Ranibizumabe'], posologia: 'Intravítreo mensal', observacoes: 'Padrao-ouro para edema macular' }
          ],
          segundaLinha: [
            { classe: 'Corticoide intravítreo', medicamentos: ['Dexametasona implante'], observacoes: 'Alternativa em pseudofacicos' }
          ],
          citations: [{ refId: 'aao-rvo-2019' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal nos primeiros 6 meses; depois conforme evolucao',
        examesControle: ['OCT', 'Fundoscopia', 'Tonometria'],
        metasTerapeuticas: ['Resolucao do edema macular', 'AV estavel'],
        criteriosEncaminhamento: ['Todos para retinologista'],
        citations: [{ refId: 'aao-rvo-2019' }]
      },
      prevencao: {
        primaria: ['Controle de PA, DM, dislipidemia'],
        secundaria: ['Tratamento precoce para preservar visao'],
        citations: [{ refId: 'aao-rvo-2019' }]
      }
    },
    protocolos: ['ovcr-manejo'],
    medicamentos: ['aflibercepte', 'ranibizumabe'],
    calculadoras: [],
    citations: [{ refId: 'aao-rvo-2019' }],
    lastUpdate: '2026-01',
    tags: ['ovcr', 'oclusao-venosa', 'edema-macular', 'anti-vegf']
  },

  // ============================================================================
  // OCLUSAO DE ARTERIA CENTRAL DA RETINA
  // ============================================================================
  {
    id: 'oacr',
    titulo: 'Oclusao de Arteria Central da Retina',
    sinonimos: ['OACR', 'CRAO', 'Central retinal artery occlusion'],
    doid: 'DOID:1690',
    snomedCT: '50114006',
    meshId: 'D015356',
    ciap2: ['F83'],
    cid10: ['H34.1'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Obstrucao da arteria central da retina causando isquemia retiniana aguda e perda visual subita, profunda e indolor. Equivalente a AVC ocular - emergencia.',
      criteriosDiagnosticos: [
        'Perda visual subita, indolor, profunda (conta dedos ou pior)',
        'Defeito pupilar aferente relativo (DPAR)',
        'Retina palida e edemaciada',
        'Macula vermelho-cereja',
        'Arterias finas, segmentadas (boxcar)',
        'Embolo visivel em 20-40%'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'EMERGENCIA - tempo e visao (ate 4-6h)',
          'Massagem ocular',
          'Respirar em saco de papel (aumentar CO2)',
          'Paracentese de CA'
        ],
        farmacologico: [
          'Acetazolamida 500mg IV/VO',
          'Timolol 0,5% topico',
          'Trombolise intra-arterial (centros especializados)'
        ]
      },
      metasTerapeuticas: ['Reperfusao retiniana em <4-6h', 'Investigacao de fonte embologena'],
      examesIniciais: ['Fundoscopia', 'Eco de carotidas', 'ECG', 'Ecocardiograma'],
      redFlags: [
        'Tempo >6h (prognostico ruim)',
        'Arterite de celulas gigantes (risco do outro olho)',
        'Sopro carotideo (estenose?)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Rara - 1-2/100.000/ano',
        faixaEtaria: 'Media 60-65 anos',
        fatoresRisco: [
          'Doenca carotidea (estenose)',
          'Fibrilacao atrial',
          'Doenca valvar cardiaca',
          'Hipertensao',
          'Diabetes',
          'Arterite de celulas gigantes (>55 anos)'
        ],
        citations: [{ refId: 'aao-crao-2021' }]
      },
      fisiopatologia: {
        texto: 'Embolia (mais comum - cardiaca ou carotidea), trombose ou vasculite. Isquemia retiniana completa leva a dano irreversivel em 90-100 minutos. A macula preserva cor vermelha por circulacao coroideana subjacente.',
        citations: [{ refId: 'stroke-crao-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Perda visual subita, indolor, monocular',
          'Visao muito reduzida (conta dedos, movimentos de mao ou pior)'
        ],
        sinaisExameFisico: [
          'DPAR (Marcus-Gunn)',
          'Retina palida e edemaciada',
          'Macula vermelho-cereja',
          'Arterias finas, segmentadas',
          'Embolo visivel'
        ],
        formasClinicas: ['Nao arterítica (embolia/trombose)', 'Arterítica (ACG)'],
        citations: [{ refId: 'aao-crao-2021' }]
      },
      diagnostico: {
        criterios: [
          'Perda visual subita + fundoscopia tipica',
          'Descartar arterite de celulas gigantes'
        ],
        diagnosticoDiferencial: ['Neuropatia optica isquemica', 'OVCR isquemica', 'Descolamento de retina'],
        examesLaboratoriais: ['VHS/PCR (arterite)', 'Hemograma', 'Coagulograma'],
        examesImagem: ['Eco de carotidas', 'ECG/Holter', 'Ecocardiograma', 'AngioTC/RM cerebral'],
        citations: [{ refId: 'aao-crao-2021' }]
      },
      tratamento: {
        objetivos: ['Reperfusao precoce', 'Investigacao de fonte embolica', 'Prevencao de AVC'],
        naoFarmacologico: {
          medidas: [
            'Massagem ocular digital',
            'Paracentese de camara anterior',
            'Oxigenoterapia hiperbarica (se disponivel)'
          ],
          citations: [{ refId: 'aao-crao-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Redutores de PIO', medicamentos: ['Acetazolamida', 'Timolol'], posologia: 'Acetazolamida 500mg IV, Timolol topico', observacoes: 'Reduzir PIO para aumentar perfusao' },
            { classe: 'Vasodilatadores', medicamentos: ['Nitroglicerina SL'], observacoes: 'Controverso' }
          ],
          situacoesEspeciais: [
            { situacao: 'Suspeita de ACG', conduta: 'Corticoide EV imediato (metilprednisolona 1g/dia x3)' }
          ],
          citations: [{ refId: 'aao-crao-2021' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Acompanhamento vascular e cardiologico prioritario',
        metasTerapeuticas: ['Prevencao de AVC (risco 30% em 3 anos)', 'Tratar causa'],
        criteriosEncaminhamento: ['Emergencia oftalmologica', 'Stroke unit se suspeita embolia'],
        citations: [{ refId: 'stroke-crao-2020' }]
      },
      prevencao: {
        primaria: ['Controle de fatores de risco cardiovascular'],
        secundaria: ['Anticoagulacao/antiagregacao conforme fonte', 'Endarterectomia se estenose >70%'],
        citations: [{ refId: 'aao-crao-2021' }]
      }
    },
    protocolos: ['oacr-emergencia'],
    medicamentos: ['acetazolamida', 'timolol'],
    calculadoras: [],
    citations: [{ refId: 'aao-crao-2021' }],
    lastUpdate: '2026-01',
    tags: ['oacr', 'oclusao-arterial', 'emergencia', 'avc-ocular', 'embolia']
  },

  // ============================================================================
  // NEURITE OPTICA
  // ============================================================================
  {
    id: 'neurite-optica',
    titulo: 'Neurite Optica',
    sinonimos: ['NO', 'Optic neuritis', 'Papilite', 'Neurite retrobulbar'],
    doid: 'DOID:1210',
    snomedCT: '66760008',
    meshId: 'D009902',
    ciap2: ['F94'],
    cid10: ['H46'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Inflamacao do nervo optico causando perda visual aguda/subaguda, geralmente unilateral. Frequentemente associada a esclerose multipla. Prognostico visual geralmente bom.',
      criteriosDiagnosticos: [
        'Perda visual aguda/subaguda (dias a 2 semanas)',
        'Dor a movimentacao ocular (90%)',
        'Defeito pupilar aferente relativo',
        'Defeito de campo visual (escotoma central)',
        'Dessaturacao de cores (discromatopsia)',
        'Papila normal (retrobulbar) ou edemaciada (papilite)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['RM de cranio e orbitas com contraste', 'Investigacao para EM'],
        farmacologico: [
          'Metilprednisolona 1g/dia IV por 3-5 dias (acelera recuperacao)',
          'Seguido de Prednisona oral 1mg/kg por 11 dias',
          'Corticoide oral isolado e CONTRAINDICADO (aumenta recorrencia)'
        ]
      },
      metasTerapeuticas: ['Recuperacao visual', 'Investigar/tratar EM se presente'],
      examesIniciais: ['RM cranio e orbitas', 'Campos visuais', 'OCT de CFNR'],
      redFlags: [
        'Bilateral simultanea (NMO, MOGAD)',
        'Ausencia de dor',
        'Sem recuperacao em 4-6 semanas',
        'Paciente >50 anos (NOIA?)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-5/100.000',
        incidencia: '5/100.000/ano',
        faixaEtaria: '20-45 anos; media 32 anos',
        fatoresRisco: [
          'Esclerose multipla',
          'Sexo feminino (3:1)',
          'Raca caucasiana',
          'NMO (neuromielite optica)',
          'MOGAD'
        ],
        citations: [{ refId: 'ontt-trial-2008' }]
      },
      fisiopatologia: {
        texto: 'Desmielinizacao inflamatoria do nervo optico, frequentemente mediada por auto-anticorpos ou celulas T autorreativas. Similar a lesoes de EM. Pode ser isolada ou primeiro episodio de doenca desmielinizante.',
        citations: [{ refId: 'lancet-neurol-on-2016' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Perda visual subaguda (horas a dias)',
          'Dor a movimentacao ocular',
          'Dificuldade de percepcao de cores',
          'Fenomeno de Uhthoff (piora com calor)'
        ],
        sinaisExameFisico: [
          'DPAR (afferent pupillary defect)',
          'Dessaturacao ao vermelho',
          'Papila normal (66%) ou edemaciada (33%)',
          'Defeito de campo visual'
        ],
        formasClinicas: ['Retrobulbar (papila normal)', 'Papilite (papila edemaciada)', 'Neuroretinite (com estrela macular)'],
        citations: [{ refId: 'ontt-trial-2008' }]
      },
      diagnostico: {
        criterios: [
          'Quadro clinico tipico',
          'RM com lesao do nervo optico (realce)',
          'Exclusao de outras causas'
        ],
        diagnosticoDiferencial: ['NOIA', 'Neurite infecciosa', 'Compressao do nervo', 'Neuropatia de Leber'],
        examesLaboratoriais: ['Anti-AQP4 (NMO)', 'Anti-MOG', 'VHS', 'FTA-ABS'],
        examesImagem: ['RM de cranio e orbitas com gadolinio', 'OCT de CFNR'],
        citations: [{ refId: 'lancet-neurol-on-2016' }]
      },
      tratamento: {
        objetivos: ['Acelerar recuperacao visual', 'Diagnosticar doenca desmielinizante'],
        naoFarmacologico: {
          medidas: ['Investigacao completa para EM/NMO', 'Acompanhamento neurologico'],
          citations: [{ refId: 'ontt-trial-2008' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide IV', medicamentos: ['Metilprednisolona'], posologia: '1g/dia IV por 3-5 dias', observacoes: 'Acelera recuperacao, nao muda prognostico final' }
          ],
          segundaLinha: [
            { classe: 'Corticoide oral', medicamentos: ['Prednisona'], posologia: '1mg/kg/dia por 11 dias apos IV', observacoes: 'NUNCA usar isolado (aumenta recorrencia)' }
          ],
          situacoesEspeciais: [
            { situacao: 'NMO/MOGAD', conduta: 'Plasmaferese, rituximabe para prevencao de recorrencia' }
          ],
          citations: [{ refId: 'ontt-trial-2008' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal inicialmente; depois mensal; neurologista se EM',
        examesControle: ['AV', 'Campos visuais', 'OCT', 'RM periodica se alto risco de EM'],
        metasTerapeuticas: ['Recuperacao visual em 4-6 semanas', 'Definicao diagnostica'],
        criteriosEncaminhamento: ['Oftalmologista + Neurologista', 'Internacao para pulsoterapia'],
        citations: [{ refId: 'ontt-trial-2008' }]
      },
      prevencao: {
        primaria: ['Nao aplicavel'],
        secundaria: ['Tratamento de EM reduz recorrencia'],
        citations: [{ refId: 'ontt-trial-2008' }]
      }
    },
    protocolos: ['neurite-optica-manejo'],
    medicamentos: ['metilprednisolona'],
    calculadoras: [],
    citations: [{ refId: 'ontt-trial-2008' }],
    lastUpdate: '2026-01',
    tags: ['neurite-optica', 'esclerose-multipla', 'desmielinizacao', 'corticoide']
  },

  // ============================================================================
  // BLEFARITE
  // ============================================================================
  {
    id: 'blefarite',
    titulo: 'Blefarite',
    sinonimos: ['Blepharitis', 'Inflamacao palpebral'],
    doid: 'DOID:1760',
    snomedCT: '41446000',
    meshId: 'D001762',
    ciap2: ['F72'],
    cid10: ['H01.0'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Inflamacao cronica das palpebras, especialmente na margem ciliar. Muito comum, causa desconforto ocular cronico. Tipos: anterior (base dos cilios) e posterior (glandulas de Meibomius).',
      criteriosDiagnosticos: [
        'Vermelhidao e espessamento da margem palpebral',
        'Crostas/escamas na base dos cilios (anterior)',
        'Disfuncao das glandulas de Meibomius (posterior)',
        'Ardor, coceira, lacrimejamento',
        'Sensacao de corpo estranho',
        'Olho seco associado'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Higiene palpebral diaria (compressas mornas + limpeza)',
          'Expressao das glandulas de Meibomius',
          'Lubrificacao ocular'
        ],
        farmacologico: [
          'Anterior estafilococica: Pomada de eritromicina ou bacitracina HS',
          'Posterior com DGM: Doxiciclina 100mg/dia VO por 4-6 semanas',
          'Lubrificantes oculares'
        ]
      },
      metasTerapeuticas: ['Controle dos sintomas', 'Prevencao de complicacoes'],
      examesIniciais: ['Exame a lampada de fenda', 'Avaliacao do filme lacrimal'],
      redFlags: [
        'Calazio recorrente',
        'Suspeita de carcinoma sebaceo',
        'Triquiase e madarose',
        'Ulceras corneanas'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '30-50% da populacao adulta',
        faixaEtaria: 'Todas as idades; mais comum em adultos',
        fatoresRisco: [
          'Rosacea',
          'Dermatite seborreica',
          'Infestacao por Demodex',
          'Olho seco',
          'Uso de lentes de contato'
        ],
        citations: [{ refId: 'aao-blepharitis-2018' }]
      },
      fisiopatologia: {
        texto: 'Anterior: colonizacao bacteriana (S. aureus) e dermatite seborreica. Posterior: disfuncao das glandulas de Meibomius com alteracao lipidica do filme lacrimal. Demodex pode contribuir em ambos.',
        citations: [{ refId: 'cornea-blepharitis-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Ardor e coceira palpebral',
          'Sensacao de corpo estranho',
          'Lacrimejamento',
          'Crostas ao acordar',
          'Fotofobia leve'
        ],
        sinaisExameFisico: [
          'Hiperemia da margem palpebral',
          'Crostas/escamas (anterior)',
          'Tamponamento dos orificios de Meibomius (posterior)',
          'Telangiectasias',
          'Espuma no filme lacrimal'
        ],
        formasClinicas: ['Anterior estafilococica', 'Anterior seborreica', 'Posterior (DGM)', 'Mista'],
        citations: [{ refId: 'aao-blepharitis-2018' }]
      },
      diagnostico: {
        criterios: [
          'Clinica compativel',
          'Exame a lampada de fenda'
        ],
        diagnosticoDiferencial: ['Conjuntivite', 'Rosacea ocular', 'Carcinoma sebaceo (se unilateral persistente)'],
        citations: [{ refId: 'aao-blepharitis-2018' }]
      },
      tratamento: {
        objetivos: ['Controlar inflamacao', 'Melhorar funcao das glandulas de Meibomius'],
        naoFarmacologico: {
          medidas: [
            'Compressas mornas 5-10min 2x/dia',
            'Limpeza da margem palpebral com xampu neutro diluido',
            'Expressao das glandulas de Meibomius',
            'Lubrificantes oculares'
          ],
          citations: [{ refId: 'aao-blepharitis-2018' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antibiotico topico', medicamentos: ['Pomada de eritromicina', 'Bacitracina'], posologia: 'Aplicar na margem palpebral HS', observacoes: 'Para blefarite anterior' },
            { classe: 'Lubrificantes', medicamentos: ['Carboximetilcelulose', 'Hialuronato'], posologia: '4-6x/dia' }
          ],
          segundaLinha: [
            { classe: 'Tetraciclinas orais', medicamentos: ['Doxiciclina'], posologia: '100mg/dia por 4-6 semanas', observacoes: 'Para DGM moderada/grave' }
          ],
          citations: [{ refId: 'aao-blepharitis-2018' }]
        },
        duracao: 'Tratamento cronico de manutencao'
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliacao em 4-6 semanas; depois conforme necessidade',
        metasTerapeuticas: ['Controle de sintomas', 'Margem palpebral sem inflamacao'],
        criteriosEncaminhamento: ['Complicacoes corneanas', 'Falha terapeutica', 'Suspeita de neoplasia'],
        citations: [{ refId: 'aao-blepharitis-2018' }]
      },
      prevencao: {
        primaria: ['Higiene palpebral regular'],
        secundaria: ['Tratamento de rosacea e dermatite seborreica'],
        citations: [{ refId: 'aao-blepharitis-2018' }]
      }
    },
    protocolos: ['blefarite-manejo'],
    medicamentos: ['eritromicina-pomada', 'doxiciclina', 'lubrificantes'],
    calculadoras: [],
    citations: [{ refId: 'aao-blepharitis-2018' }],
    lastUpdate: '2026-01',
    tags: ['blefarite', 'dgm', 'olho-seco', 'higiene-palpebral']
  },

  // ============================================================================
  // PTERIGIO
  // ============================================================================
  {
    id: 'pterigio',
    titulo: 'Pterigio',
    sinonimos: ['Pterygium', 'Unha de carne'],
    doid: 'DOID:10945',
    snomedCT: '77489003',
    meshId: 'D011625',
    ciap2: ['F99'],
    cid10: ['H11.0'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Crescimento fibrovascular benigno da conjuntiva sobre a cornea, geralmente do lado nasal. Relacionado a exposicao solar cronica. Pode causar astigmatismo e reducao visual se atingir eixo visual.',
      criteriosDiagnosticos: [
        'Tecido fibrovascular triangular',
        'Origina na conjuntiva bulbar (geralmente nasal)',
        'Invade a cornea',
        'Vascularizacao visivel',
        'Pode ter depositos de ferro na ponta (linha de Stocker)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Protecao solar (oculos UV, chapeu)',
          'Cirurgia se progressao ou atingir eixo visual'
        ],
        farmacologico: [
          'Lubrificantes para sintomas leves',
          'AINE topico se inflamacao',
          'Cirurgia com enxerto conjuntival ou membrana amniotica para casos avancados'
        ]
      },
      metasTerapeuticas: ['Controle de sintomas', 'Prevenir progressao'],
      examesIniciais: ['Exame a lampada de fenda', 'Medicao da extensao corneana'],
      redFlags: [
        'Progressao rapida',
        'Atingindo eixo visual',
        'Lesao atipica (descartar neoplasia)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-7% na populacao geral; ate 20% em regioes equatoriais',
        faixaEtaria: '20-50 anos; raro em criancas',
        fatoresRisco: [
          'Exposicao a radiacao UV (principal)',
          'Clima quente e seco',
          'Trabalho ao ar livre',
          'Sexo masculino',
          'Fatores geneticos'
        ],
        citations: [{ refId: 'cornea-pterygium-2017' }]
      },
      fisiopatologia: {
        texto: 'Dano por UV a celulas limbares leva a proliferacao fibrovascular. Envolve expressao de MMPs, citocinas inflamatorias e fatores angiogenicos. Mutacao de p53 em celulas epiteliais.',
        citations: [{ refId: 'prog-ret-eye-pterygium-2010' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Lesao visivel (queixa estetica)',
          'Irritacao ocular',
          'Vermelhidao',
          'Sensacao de corpo estranho',
          'Visao embaçada (se eixo visual)'
        ],
        sinaisExameFisico: [
          'Massa triangular fibrovascular',
          'Base na conjuntiva, apice na cornea',
          'Linha de Stocker',
          'Astigmatismo induzido'
        ],
        formasClinicas: ['Atrofico (quiescente)', 'Inflamatorio (ativo)', 'Primario', 'Recorrente'],
        citations: [{ refId: 'cornea-pterygium-2017' }]
      },
      diagnostico: {
        criterios: [
          'Aspecto clinico tipico',
          'Localizacao caracteristica'
        ],
        diagnosticoDiferencial: ['Pinguécula', 'Neoplasia intraepitelial conjuntival (OSSN)', 'Pseudopterigio'],
        citations: [{ refId: 'cornea-pterygium-2017' }]
      },
      tratamento: {
        objetivos: ['Controle de sintomas', 'Remocao se indicado'],
        naoFarmacologico: {
          medidas: [
            'Protecao UV rigorosa',
            'Excisao cirurgica com autoenxerto conjuntival (padrao-ouro)',
            'Membrana amniotica como alternativa'
          ],
          citations: [{ refId: 'cochrane-pterygium-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Lubrificantes', medicamentos: ['Carboximetilcelulose'], posologia: '4-6x/dia', observacoes: 'Alivio sintomatico' }
          ],
          segundaLinha: [
            { classe: 'AINE topico', medicamentos: ['Diclofenaco', 'Cetorolaco'], posologia: '3-4x/dia', observacoes: 'Para inflamacao aguda' }
          ],
          situacoesEspeciais: [
            { situacao: 'Pos-operatorio', conduta: 'Mitomicina C intraoperatoria pode reduzir recorrencia' }
          ],
          citations: [{ refId: 'cochrane-pterygium-2017' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual se estavel; mais frequente se progressao',
        metasTerapeuticas: ['Estabilidade', 'Ausencia de recorrencia pos-operatoria'],
        criteriosEncaminhamento: ['Progressao para eixo visual', 'Astigmatismo significativo', 'Suspeita de neoplasia'],
        citations: [{ refId: 'cornea-pterygium-2017' }]
      },
      prevencao: {
        primaria: ['Uso de oculos de sol com protecao UV', 'Chapeu de aba larga'],
        secundaria: ['Tecnica cirurgica adequada para prevenir recorrencia'],
        citations: [{ refId: 'cornea-pterygium-2017' }]
      }
    },
    protocolos: ['pterigio-manejo'],
    medicamentos: ['lubrificantes-oculares'],
    calculadoras: [],
    citations: [{ refId: 'cornea-pterygium-2017' }],
    lastUpdate: '2026-01',
    tags: ['pterigio', 'conjuntiva', 'uv', 'cirurgia-ocular']
  }
];

export default oftalmologicasExtras;
