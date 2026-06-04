/**
 * DOENCAS OFTALMOLOGICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ===========================================================
 * Doencas oftalmologicas de alta prevalencia e impacto na APS
 */

import { Doenca } from '@/lib/types/doenca';

export const oftalmologicasAvancadas: Doenca[] = [
  // ============================================================================
  // GLAUCOMA
  // ============================================================================
  {
    id: 'glaucoma-angulo-aberto',
    titulo: 'Glaucoma Primario de Angulo Aberto',
    sinonimos: ['GPAA', 'Glaucoma cronico simples', 'Primary open-angle glaucoma', 'POAG'],
    doid: 'DOID:1067',
    snomedCT: '77075001',
    meshId: 'D005902',
    umlsCui: 'C0017612',
    ciap2: ['F93'],
    cid10: ['H40.1'],
    cid11: ['9C61.0'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Neuropatia optica progressiva caracterizada por dano ao nervo optico e perda de campo visual, geralmente associada a pressao intraocular elevada. Principal causa de cegueira irreversivel no mundo.',
      criteriosDiagnosticos: [
        'Pressao intraocular elevada (>21 mmHg) - nem sempre presente',
        'Alteracao do disco optico (escavacao aumentada, assimetria)',
        'Defeitos de campo visual caracteristicos (escotoma arqueado, degrau nasal)',
        'Angulo da camara anterior aberto a gonioscopia',
        'Perda de fibras nervosas na camada de fibras retinianas (OCT)',
        'Progressao documentada ao longo do tempo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Adesao ao tratamento e consultas regulares',
          'Evitar manobras de Valsalva prolongadas',
          'Posicao da cabeca elevada ao dormir (casos graves)',
          'Cessacao do tabagismo'
        ],
        farmacologico: [
          'ANALOGOS DE PROSTAGLANDINAS (primeira linha): Latanoprosta 0,005% 1x/dia a noite',
          'Alternativas: Bimatoprosta, Travoprosta, Tafloprosta',
          'BETABLOQUEADORES: Timolol 0,5% 12/12h (evitar em asma/DPOC)',
          'INIBIDORES DA ANIDRASE CARBONICA: Dorzolamida 2% 8/8h ou Brinzolamida',
          'ALFA-AGONISTAS: Brimonidina 0,2% 8/8h'
        ]
      },
      metasTerapeuticas: [
        'Reducao da PIO em 20-30% do valor basal',
        'PIO alvo individualizada (geralmente <18 mmHg em dano moderado)',
        'Estabilizacao do campo visual',
        'Preservacao da camada de fibras nervosas'
      ],
      examesIniciais: [
        'Tonometria de aplanacao (Goldmann)',
        'Fundoscopia com avaliacao do disco optico',
        'Gonioscopia',
        'Campimetria computadorizada (24-2 ou 10-2)',
        'OCT de camada de fibras nervosas e celulas ganglionares',
        'Paquimetria corneana'
      ],
      redFlags: [
        'Perda visual subita',
        'Dor ocular intensa (sugere angulo fechado)',
        'PIO muito elevada (>30 mmHg)',
        'Progressao rapida do campo visual',
        'Glaucoma em paciente jovem (<40 anos)',
        'Assimetria significativa entre olhos'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-3% em >40 anos; ate 10% em >80 anos',
        incidencia: '1-2% ao ano em populacao de risco',
        mortalidade: 'N/A - morbidade por cegueira irreversivel',
        faixaEtaria: 'Aumenta com idade; raro antes de 40 anos',
        fatoresRisco: [
          'Idade avancada (principal)',
          'Historia familiar de glaucoma',
          'Ascendencia africana ou hispanica',
          'Miopia elevada',
          'Cornea fina (<520 micrometros)',
          'PIO elevada',
          'Diabetes mellitus',
          'Uso cronico de corticoides'
        ],
        citations: [{ refId: 'aao-ppp-glaucoma-2023' }]
      },
      fisiopatologia: {
        texto: 'Degeneracao progressiva das celulas ganglionares da retina e seus axonios no nervo optico. A PIO elevada causa estresse mecanico e isquemia na lamina cribosa. Fatores vasculares, geneticos e imunologicos contribuem. A perda axonal segue padrao caracteristico, iniciando pelos feixes arqueados.',
        citations: [{ refId: 'weinreb-lancet-glaucoma-2014' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Geralmente assintomatico ate fases avancadas',
          'Perda de visao periferica progressiva',
          'Dificuldade com visao noturna',
          'Visao em tunel (fases terminais)'
        ],
        sinaisExameFisico: [
          'Escavacao do disco optico aumentada (cup/disc >0,5 ou assimetria >0,2)',
          'Hemorragia de disco (sinal de progressao)',
          'Atrofia peripapilar',
          'Defeito da camada de fibras nervosas'
        ],
        formasClinicas: [
          'GPAA de pressao alta (forma classica)',
          'Glaucoma de pressao normal (PIO normal, mesmo dano)',
          'Glaucoma juvenil (inicio 10-35 anos)',
          'Hipertensao ocular sem dano (pre-glaucoma)'
        ],
        citations: [{ refId: 'aao-ppp-glaucoma-2023' }]
      },
      diagnostico: {
        criterios: [
          'Neuropatia optica glaucomatosa (alteracao estrutural)',
          'Defeito de campo visual correspondente',
          'Angulo aberto a gonioscopia',
          'Ausencia de causa secundaria identificavel'
        ],
        diagnosticoDiferencial: [
          'Glaucoma de angulo fechado',
          'Glaucoma secundario (pseudoesfoliativo, pigmentar)',
          'Neuropatia optica isquemica',
          'Drusas de disco optico',
          'Coloboma de disco',
          'Escavacao fisiologica grande'
        ],
        examesLaboratoriais: [
          'Geralmente desnecessarios',
          'Considerar glicemia/HbA1c se diabetes suspeito'
        ],
        examesImagem: [
          'OCT de nervo optico e macula',
          'Retinografia',
          'Campimetria computadorizada 24-2'
        ],
        citations: [{ refId: 'european-glaucoma-society-2020' }]
      },
      tratamento: {
        objetivos: [
          'Reducao da PIO para nivel alvo individualizado',
          'Prevencao de progressao do dano',
          'Manutencao da qualidade de vida visual'
        ],
        naoFarmacologico: {
          medidas: [
            'Educacao sobre cronicidade da doenca',
            'Adesao ao tratamento (uso correto de colirios)',
            'Acompanhamento regular',
            'Atividade fisica moderada pode reduzir PIO'
          ],
          citations: [{ refId: 'aao-ppp-glaucoma-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analogos de prostaglandinas', medicamentos: ['Latanoprosta', 'Bimatoprosta', 'Travoprosta'], posologia: '1 gota a noite', observacoes: 'Mais eficaz, 1x/dia, poucos efeitos sistemicos' }
          ],
          segundaLinha: [
            { classe: 'Betabloqueadores', medicamentos: ['Timolol', 'Betaxolol'], posologia: '1 gota 12/12h', observacoes: 'Evitar em asma, DPOC, bradicardia' },
            { classe: 'Inibidores da anidrase carbonica', medicamentos: ['Dorzolamida', 'Brinzolamida'], posologia: '1 gota 8/8h ou 12/12h', observacoes: 'Podem ser combinados' },
            { classe: 'Alfa-agonistas', medicamentos: ['Brimonidina'], posologia: '1 gota 8/8h', observacoes: 'Evitar em criancas <2 anos' }
          ],
          situacoesEspeciais: [
            { situacao: 'Refratario a colirios', conduta: 'Trabeculoplastia a laser (SLT) ou cirurgia filtrante (trabeculectomia)' },
            { situacao: 'Glaucoma avancado', conduta: 'Considerar cirurgia precoce; PIO alvo mais baixa (<12 mmHg)' }
          ],
          citations: [{ refId: 'european-glaucoma-society-2020' }]
        },
        duracao: 'Tratamento continuo por toda a vida'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses se estavel; mais frequente se progressao',
        examesControle: [
          'Tonometria a cada consulta',
          'Campimetria 1-2x/ano',
          'OCT 1-2x/ano',
          'Fundoscopia'
        ],
        metasTerapeuticas: [
          'PIO alvo atingida',
          'Campo visual estavel',
          'OCT sem progressao'
        ],
        criteriosEncaminhamento: [
          'Todo caso suspeito para oftalmologista',
          'Progressao apesar de tratamento',
          'Necessidade de cirurgia',
          'Glaucoma refratario'
        ],
        citations: [{ refId: 'aao-ppp-glaucoma-2023' }]
      },
      prevencao: {
        primaria: [
          'Rastreamento em populacao de risco (>40 anos, historia familiar)',
          'Exame oftalmologico periodico'
        ],
        secundaria: [
          'Deteccao precoce preserva visao',
          'Tratamento de hipertensao ocular em alto risco'
        ],
        citations: [{ refId: 'uspstf-glaucoma-2022' }]
      }
    },
    protocolos: ['glaucoma-manejo-aps'],
    medicamentos: ['latanoprosta', 'timolol', 'dorzolamida', 'brimonidina'],
    calculadoras: ['risco-glaucoma', 'pio-alvo'],
    rastreamentos: ['rastreamento-glaucoma'],
    citations: [{ refId: 'aao-ppp-glaucoma-2023' }, { refId: 'european-glaucoma-society-2020' }],
    lastUpdate: '2025-01',
    tags: ['glaucoma', 'GPAA', 'pressao-intraocular', 'cegueira', 'neuropatia-optica']
  },

  {
    id: 'glaucoma-angulo-fechado',
    titulo: 'Glaucoma de Angulo Fechado',
    sinonimos: ['GAF', 'Glaucoma agudo', 'Angle-closure glaucoma', 'ACG', 'Crise glaucomatosa'],
    doid: 'DOID:1686',
    snomedCT: '392288006',
    meshId: 'D015812',
    umlsCui: 'C0017601',
    ciap2: ['F93'],
    cid10: ['H40.2'],
    cid11: ['9C61.1'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Forma de glaucoma onde o angulo da camara anterior e estreito ou fechado, bloqueando a drenagem do humor aquoso. A forma aguda e emergencia oftalmologica com dor intensa e risco de cegueira em horas.',
      criteriosDiagnosticos: [
        'AGUDO: Dor ocular intensa, cefaleia, nauseas/vomitos',
        'Visao embaçada com halos coloridos',
        'Olho vermelho, hiperemia conjuntival',
        'Cornea edemaciada (nebulosa)',
        'Pupila em midriase media, fixa',
        'PIO muito elevada (40-80 mmHg)',
        'Angulo fechado a gonioscopia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'EMERGENCIA - encaminhar imediatamente',
          'Posicao supina pode ajudar',
          'Evitar ambiente escuro (midriase)'
        ],
        farmacologico: [
          'CRISE AGUDA (emergencia):',
          'Acetazolamida 500mg IV/VO (reduz producao de aquoso)',
          'Manitol 20% 1-2g/kg IV (se PIO muito alta)',
          'Pilocarpina 2% 1 gota 15/15min x4 (apos PIO <40)',
          'Timolol 0,5% 1 gota 12/12h',
          'Prednisolona 1% 1 gota 4/4h (inflamacao)',
          'DEFINITIVO: Iridotomia a laser (YAG)'
        ]
      },
      metasTerapeuticas: [
        'Crise aguda: reducao da PIO para <30 mmHg em 1-2h',
        'Prevencao de novo ataque no olho afetado e contralateral',
        'Preservacao da visao'
      ],
      examesIniciais: [
        'Tonometria de urgencia',
        'Biomicroscopia (lampada de fenda)',
        'Gonioscopia (quando possivel)',
        'Fundoscopia'
      ],
      redFlags: [
        'PIO >50 mmHg por >24h (dano irreversivel)',
        'Perda visual ja instalada',
        'Nauseas e vomitos intensos (pode mimetizar abdome agudo)',
        'Olho contralateral de risco (angulo estreito)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,5-1% em asiaticos; <0,1% em caucasianos',
        incidencia: 'Pico em 55-65 anos',
        faixaEtaria: 'Mais comum em >50 anos',
        fatoresRisco: [
          'Ascendencia asiatica (especialmente chineses)',
          'Sexo feminino (3:1)',
          'Idade avancada',
          'Hipermetropia',
          'Historia familiar',
          'Camara anterior rasa',
          'Uso de midriáticos ou anticolinérgicos'
        ],
        citations: [{ refId: 'aao-angle-closure-2021' }]
      },
      fisiopatologia: {
        texto: 'Bloqueio da drenagem do humor aquoso pelo fechamento do angulo iridocorneano. Mecanismo principal: bloqueio pupilar (iris bombe). A iris periferica obstrui a malha trabecular. Na crise aguda, a PIO eleva-se rapidamente causando isquemia do nervo optico e dano corneano.',
        citations: [{ refId: 'weinreb-lancet-glaucoma-2014' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor ocular intensa, unilateral',
          'Cefaleia frontal ipsilateral',
          'Nauseas e vomitos (reflexo vagal)',
          'Visao embaçada',
          'Halos coloridos ao redor de luzes',
          'Lacrimejamento'
        ],
        sinaisExameFisico: [
          'Olho vermelho (hiperemia ciliar)',
          'Cornea edemaciada, opaca',
          'Pupila em midriase media (4-6mm), fixa',
          'Camara anterior rasa',
          'PIO muito elevada (palpacao: olho petreo)'
        ],
        formasClinicas: [
          'Agudo (crise): emergencia, sintomas intensos',
          'Cronico: fechamento gradual, assintomatico',
          'Intermitente: crises recorrentes autolimitadas',
          'Subagudo: sintomas leves, recorrentes'
        ],
        citations: [{ refId: 'aao-angle-closure-2021' }]
      },
      diagnostico: {
        criterios: [
          'Clinica sugestiva (crise aguda)',
          'PIO elevada (geralmente >40 mmHg)',
          'Angulo fechado a gonioscopia',
          'Exclusao de causas secundarias'
        ],
        diagnosticoDiferencial: [
          'Uveite aguda',
          'Cefaleia em salvas',
          'Enxaqueca com aura',
          'Conjuntivite aguda grave',
          'Trauma ocular',
          'Glaucoma neovascular'
        ],
        examesLaboratoriais: [
          'Geralmente desnecessarios na emergencia'
        ],
        examesImagem: [
          'UBM (ultrassonografia biomicroscopica)',
          'OCT de segmento anterior',
          'AS-OCT para avaliacao do angulo'
        ],
        citations: [{ refId: 'european-glaucoma-society-2020' }]
      },
      tratamento: {
        objetivos: [
          'Reducao imediata da PIO',
          'Abertura do angulo',
          'Prevencao de recorrencia',
          'Tratamento profilatico do olho contralateral'
        ],
        naoFarmacologico: {
          medidas: [
            'Encaminhamento de urgencia ao oftalmologista',
            'Iridotomia a laser (YAG) - tratamento definitivo',
            'Iridoplastia a laser se iridotomia impossivel'
          ],
          citations: [{ refId: 'aao-angle-closure-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inibidor da anidrase carbonica sistemico', medicamentos: ['Acetazolamida'], posologia: '500mg IV ou VO, depois 250mg 6/6h', observacoes: 'Reduz producao de aquoso' },
            { classe: 'Osmoticos', medicamentos: ['Manitol'], posologia: '1-2g/kg IV em 30min', observacoes: 'Para PIO muito elevada' },
            { classe: 'Mioticos', medicamentos: ['Pilocarpina'], posologia: '2% 1gota 15/15min x4, depois 6/6h', observacoes: 'Usar apos PIO <40 (nao funciona com PIO muito alta)' }
          ],
          segundaLinha: [
            { classe: 'Betabloqueador topico', medicamentos: ['Timolol'], posologia: '0,5% 1 gota 12/12h', observacoes: 'Adjuvante' },
            { classe: 'Corticoide topico', medicamentos: ['Prednisolona'], posologia: '1% 1 gota 4/4h', observacoes: 'Reduz inflamacao secundaria' }
          ],
          situacoesEspeciais: [
            { situacao: 'PIO nao responsiva', conduta: 'Paracentese da camara anterior (procedimento de emergencia)' },
            { situacao: 'Olho contralateral', conduta: 'Iridotomia profilatica obrigatoria' }
          ],
          citations: [{ refId: 'european-glaucoma-society-2020' }]
        },
        duracao: 'Tratamento agudo ate iridotomia; depois acompanhamento'
      },
      acompanhamento: {
        frequenciaConsultas: 'Diario na crise; depois semanal; depois trimestral',
        examesControle: [
          'Tonometria',
          'Gonioscopia',
          'Campimetria apos resolucao',
          'OCT de nervo optico'
        ],
        metasTerapeuticas: [
          'PIO controlada',
          'Angulo aberto pos-iridotomia',
          'Ausencia de novos ataques'
        ],
        criteriosEncaminhamento: [
          'Todos os casos: urgencia oftalmologica',
          'Iridotomia profilatica do olho contralateral'
        ],
        citations: [{ refId: 'aao-angle-closure-2021' }]
      }
    },
    protocolos: ['glaucoma-angulo-fechado-emergencia'],
    medicamentos: ['acetazolamida', 'pilocarpina', 'timolol', 'manitol'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'aao-angle-closure-2021' }, { refId: 'european-glaucoma-society-2020' }],
    lastUpdate: '2025-01',
    tags: ['glaucoma', 'angulo-fechado', 'emergencia', 'iridotomia', 'crise-glaucomatosa']
  },

  // ============================================================================
  // DOENCAS DA RETINA
  // ============================================================================
  {
    id: 'dmri',
    titulo: 'Degeneracao Macular Relacionada a Idade',
    sinonimos: ['DMRI', 'AMD', 'Age-related macular degeneration', 'Maculopatia senil'],
    doid: 'DOID:10871',
    snomedCT: '267718000',
    meshId: 'D008268',
    umlsCui: 'C0242383',
    ciap2: ['F84'],
    cid10: ['H35.3'],
    cid11: ['9B75.0'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Doenca degenerativa da macula (regiao central da retina) que afeta a visao central. Principal causa de cegueira legal em idosos nos paises desenvolvidos. Formas seca (atrofica) e umida (neovascular).',
      criteriosDiagnosticos: [
        'Idade >50 anos',
        'Drusas (depositos amarelados na macula)',
        'Alteracoes do EPR (epitelio pigmentar da retina)',
        'FORMA SECA: atrofia geografica do EPR',
        'FORMA UMIDA: neovascularizacao coroideana, hemorragia, fluido',
        'Distorcao visual (metamorfopsia) - teste de Amsler',
        'Escotoma central'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Cessacao do tabagismo (fator de risco modificavel mais importante)',
          'Dieta rica em vegetais verdes, peixe',
          'Uso de oculos de sol (protecao UV)',
          'Monitoramento com grade de Amsler em casa',
          'Auxílios de baixa visao'
        ],
        farmacologico: [
          'FORMA SECA INTERMEDIARIA/AVANCADA:',
          'Suplementacao AREDS2: Vitamina C 500mg + Vitamina E 400UI + Zinco 80mg + Cobre 2mg + Luteina 10mg + Zeaxantina 2mg',
          'FORMA UMIDA:',
          'Anti-VEGF intravítreo (primeira linha): Ranibizumabe, Aflibercepte, ou Bevacizumabe (off-label)',
          'Injecoes mensais inicialmente, depois conforme necessidade'
        ]
      },
      metasTerapeuticas: [
        'Forma seca: retardar progressao',
        'Forma umida: secar fluido, estabilizar/melhorar visao',
        'Preservar visao central para AVDs'
      ],
      examesIniciais: [
        'Acuidade visual',
        'Fundoscopia com dilatacao pupilar',
        'OCT de macula',
        'Angiofluoresceinografia (suspeita de forma umida)',
        'Teste de Amsler'
      ],
      redFlags: [
        'Perda visual subita (sugere forma umida ativa)',
        'Metamorfopsia nova ou piora (urgencia)',
        'Hemorragia macular',
        'Mancha escura central nova'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '8,7% em 45-85 anos; 25% em >80 anos',
        incidencia: 'Aumenta exponencialmente apos 70 anos',
        mortalidade: 'N/A - morbidade por baixa visao/cegueira',
        faixaEtaria: '>50 anos; rara antes dos 55',
        fatoresRisco: [
          'Idade (principal)',
          'Tabagismo (aumenta risco 2-4x)',
          'Historia familiar (risco 3x)',
          'Raca caucasiana',
          'Obesidade',
          'Doenca cardiovascular',
          'Exposicao solar excessiva'
        ],
        citations: [{ refId: 'aao-amd-ppp-2019' }]
      },
      fisiopatologia: {
        texto: 'Acumulo de lipofuscina e drusas entre o EPR e a membrana de Bruch. Estresse oxidativo, inflamacao e disfuncao do EPR levam a atrofia. Na forma umida, fator de crescimento vascular endotelial (VEGF) induz neovascularizacao coroideana anormal com vazamento e hemorragia.',
        citations: [{ refId: 'nejm-amd-2008' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Embaçamento da visao central',
          'Dificuldade para leitura e reconhecimento de faces',
          'Metamorfopsia (distorcao de linhas retas)',
          'Escotoma central (mancha escura no centro)',
          'Necessidade de mais luz para ler'
        ],
        sinaisExameFisico: [
          'Drusas maculares (pequenas, intermediarias, grandes)',
          'Alteracoes pigmentares do EPR',
          'Atrofia geografica (forma seca avancada)',
          'Hemorragia, exsudatos, fluido (forma umida)',
          'Descolamento do EPR'
        ],
        formasClinicas: [
          'Inicial: poucas drusas pequenas',
          'Intermediaria: drusas intermediarias ou grandes',
          'Avancada seca: atrofia geografica central',
          'Avancada umida: neovascularizacao coroideana'
        ],
        citations: [{ refId: 'aao-amd-ppp-2019' }]
      },
      diagnostico: {
        criterios: [
          'Idade >50 anos + alteracoes maculares tipicas',
          'Classificacao AREDS para estadiamento',
          'OCT para detectar fluido (forma umida)'
        ],
        diagnosticoDiferencial: [
          'Maculopatia miopica',
          'Distrofia macular hereditaria',
          'Membrana epirretiniana',
          'Buraco macular',
          'Coriorretinopatia serosa central',
          'Edema macular diabetico'
        ],
        examesLaboratoriais: [
          'Nao especificos para DMRI'
        ],
        examesImagem: [
          'OCT de macula (essencial)',
          'Angiofluoresceinografia',
          'Angio-OCT',
          'Autofluorescencia de fundo'
        ],
        citations: [{ refId: 'nejm-amd-2008' }]
      },
      tratamento: {
        objetivos: [
          'Retardar progressao',
          'Estabilizar ou melhorar visao (forma umida)',
          'Manter qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Parar de fumar',
            'Dieta mediterranea',
            'Controle de fatores cardiovasculares',
            'Reabilitacao de baixa visao'
          ],
          citations: [{ refId: 'aao-amd-ppp-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Suplementacao AREDS2', medicamentos: ['Complexo vitaminico AREDS2'], posologia: 'Diario conforme formulacao', observacoes: 'Reduz progressao em 25% na DMRI intermediaria/avancada' },
            { classe: 'Anti-VEGF (forma umida)', medicamentos: ['Ranibizumabe', 'Aflibercepte', 'Bevacizumabe'], posologia: 'Injecao intravitrea mensal x3, depois PRN ou treat-and-extend', observacoes: 'Tratamento de escolha para forma umida' }
          ],
          segundaLinha: [
            { classe: 'Anti-VEGF alternativo', medicamentos: ['Brolucizumabe', 'Faricimabe'], posologia: 'Conforme protocolo', observacoes: 'Intervalos mais longos' }
          ],
          situacoesEspeciais: [
            { situacao: 'Forma umida agressiva', conduta: 'Tratamento intensivo mensal, monitoramento frequente' },
            { situacao: 'Atrofia geografica', conduta: 'Pegcetacoplan intravítreo aprovado recentemente' }
          ],
          citations: [{ refId: 'areds2-jama-2013' }]
        },
        duracao: 'Cronico; anti-VEGF pode ser necessario por anos'
      },
      acompanhamento: {
        frequenciaConsultas: 'Forma seca: 6-12 meses; forma umida: mensal inicialmente',
        examesControle: [
          'OCT de macula',
          'Acuidade visual',
          'Grade de Amsler domiciliar'
        ],
        metasTerapeuticas: [
          'Estabilizacao da visao',
          'Ausencia de fluido no OCT (forma umida)',
          'Ausencia de progressao (forma seca)'
        ],
        criteriosEncaminhamento: [
          'Todo caso suspeito para retinólogo',
          'Metamorfopsia ou perda visual nova: urgencia',
          'Suspeita de conversao seca->umida'
        ],
        citations: [{ refId: 'aao-amd-ppp-2019' }]
      },
      prevencao: {
        primaria: [
          'Nao fumar',
          'Dieta saudavel rica em antioxidantes',
          'Protecao solar',
          'Controle de fatores cardiovasculares'
        ],
        secundaria: [
          'Suplementacao AREDS2 em pacientes de risco',
          'Monitoramento regular'
        ],
        citations: [{ refId: 'areds2-jama-2013' }]
      }
    },
    protocolos: ['dmri-manejo'],
    medicamentos: ['ranibizumabe', 'aflibercepte', 'areds2'],
    calculadoras: ['risco-progressao-dmri'],
    rastreamentos: [],
    citations: [{ refId: 'aao-amd-ppp-2019' }, { refId: 'areds2-jama-2013' }],
    lastUpdate: '2025-01',
    tags: ['dmri', 'macula', 'anti-vegf', 'drusas', 'cegueira-idoso']
  },

  {
    id: 'retinopatia-diabetica',
    titulo: 'Retinopatia Diabetica',
    sinonimos: ['RD', 'Diabetic retinopathy', 'Fundo de olho diabetico'],
    doid: 'DOID:8947',
    snomedCT: '4855003',
    meshId: 'D003930',
    umlsCui: 'C0011884',
    ciap2: ['F83'],
    cid10: ['H36.0', 'E10.3', 'E11.3'],
    cid11: ['9B71.0'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Microangiopatia retiniana causada pelo diabetes mellitus. Principal causa de cegueira em adultos em idade produtiva. Formas nao-proliferativa (RDNP) e proliferativa (RDP). O edema macular pode ocorrer em qualquer estagio.',
      criteriosDiagnosticos: [
        'Paciente com diabetes mellitus',
        'RDNP LEVE: microaneurismas apenas',
        'RDNP MODERADA: mais que microaneurismas, menos que RDNP grave',
        'RDNP GRAVE (regra 4-2-1): hemorragias em 4 quadrantes OU veias em rosario em 2 quadrantes OU IRMA em 1 quadrante',
        'RDP: neovascularizacao de disco ou retina, hemorragia vitrea',
        'EDEMA MACULAR: espessamento retiniano no polo posterior'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Controle glicemico rigoroso (HbA1c <7%)',
          'Controle da pressao arterial (<130/80 mmHg)',
          'Controle de dislipidemia',
          'Cessacao do tabagismo'
        ],
        farmacologico: [
          'EMD COM ENVOLVIMENTO CENTRAL:',
          'Anti-VEGF intravítreo: Aflibercepte, Ranibizumabe (primeira linha)',
          'Corticoide intravitreo: Implante de dexametasona (segunda linha)',
          'RDP:',
          'Panfotocoagulacao a laser (padrao-ouro)',
          'Anti-VEGF adjuvante'
        ]
      },
      metasTerapeuticas: [
        'Prevenir progressao para RDP',
        'Tratar edema macular (preservar visao central)',
        'Evitar complicacoes (hemorragia vitrea, descolamento)'
      ],
      examesIniciais: [
        'Fundoscopia sob midriase',
        'Retinografia colorida',
        'OCT de macula (detectar EMD)',
        'Angiofluoresceinografia (casos selecionados)'
      ],
      redFlags: [
        'Perda visual subita (hemorragia vitrea)',
        'Neovascularizacao de disco ou iris',
        'Moscas volantes subitas',
        'Cortina escura no campo visual (descolamento)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '35% dos diabeticos tem algum grau de RD; 7% tem RD ameacadora da visao',
        incidencia: 'Apos 20 anos de DM: >90% no tipo 1, 60% no tipo 2',
        mortalidade: 'N/A - associada a mortalidade cardiovascular aumentada',
        faixaEtaria: 'Qualquer idade; proporcional a duracao do diabetes',
        fatoresRisco: [
          'Duracao do diabetes (principal)',
          'Mau controle glicemico',
          'Hipertensao arterial',
          'Dislipidemia',
          'Nefropatia diabetica',
          'Gravidez',
          'Anemia'
        ],
        citations: [{ refId: 'aao-dr-ppp-2019' }]
      },
      fisiopatologia: {
        texto: 'Hiperglicemia cronica causa dano aos pericitos e celulas endoteliais dos capilares retinianos. Ocorre aumento da permeabilidade vascular (edema), oclusao capilar (isquemia) e, em fases avancadas, neovascularizacao induzida por VEGF. A isquemia retiniana periferica e o gatilho para a forma proliferativa.',
        citations: [{ refId: 'nejm-diabetic-retinopathy-2012' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Frequentemente assintomatico nas fases iniciais',
          'Visao embaçada (edema macular)',
          'Moscas volantes (hemorragia vitrea)',
          'Distorcao visual',
          'Perda visual subita'
        ],
        sinaisExameFisico: [
          'Microaneurismas (pontos vermelhos)',
          'Hemorragias retinianas (em chama ou em borra)',
          'Exsudatos duros (depositos lipidicos)',
          'Manchas algodonosas (isquemia)',
          'IRMA (anormalidades vasculares intrarretinianas)',
          'Veias em rosario',
          'Neovascularizacao (de disco, retina, iris)'
        ],
        formasClinicas: [
          'RDNP leve, moderada, grave, muito grave',
          'RDP (proliferativa): neovases, hemorragia vitrea',
          'Edema macular diabetico (pode coexistir com qualquer estagio)'
        ],
        citations: [{ refId: 'aao-dr-ppp-2019' }]
      },
      diagnostico: {
        criterios: [
          'Alteracoes retinianas tipicas em paciente diabetico',
          'Classificacao ETDRS/Internacional',
          'Documentacao fotografica'
        ],
        diagnosticoDiferencial: [
          'Retinopatia hipertensiva',
          'Oclusao venosa retiniana',
          'Retinopatia por radiacao',
          'Outras causas de edema macular'
        ],
        examesLaboratoriais: [
          'HbA1c',
          'Glicemia',
          'Perfil lipidico',
          'Funcao renal'
        ],
        examesImagem: [
          'Retinografia (rastreamento)',
          'OCT de macula (edema)',
          'Angiofluoresceinografia',
          'Angio-OCT'
        ],
        citations: [{ refId: 'nejm-diabetic-retinopathy-2012' }]
      },
      tratamento: {
        objetivos: [
          'Controle dos fatores sistemicos',
          'Prevenir progressao',
          'Tratar edema macular',
          'Regredir neovascularizacao (RDP)'
        ],
        naoFarmacologico: {
          medidas: [
            'Controle glicemico (HbA1c <7%)',
            'Controle pressao arterial (<130/80)',
            'Controle lipidico',
            'Rastreamento regular'
          ],
          citations: [{ refId: 'dcct-retinopathy-1993' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anti-VEGF (EMD central)', medicamentos: ['Aflibercepte', 'Ranibizumabe'], posologia: 'Injecao intravitre mensal x6, depois PRN', observacoes: 'Primeira linha para EMD com perda visual' },
            { classe: 'Fotocoagulacao a laser', medicamentos: ['Laser argonio'], posologia: 'Panfotocoagulacao para RDP; focal/grid para EMD', observacoes: 'Padrao-ouro para RDP' }
          ],
          segundaLinha: [
            { classe: 'Corticoide intravitreo', medicamentos: ['Dexametasona implante', 'Triancinolona'], posologia: 'Implante a cada 4-6 meses', observacoes: 'Segunda linha para EMD; risco de catarata e glaucoma' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hemorragia vitrea persistente', conduta: 'Vitrectomia pars plana' },
            { situacao: 'Descolamento de retina tracional', conduta: 'Vitrectomia de urgencia' }
          ],
          citations: [{ refId: 'drcr-protocol-t-2015' }]
        },
        duracao: 'Tratamento cronico; anti-VEGF por tempo indeterminado para EMD'
      },
      acompanhamento: {
        frequenciaConsultas: 'DM sem RD: anual; RDNP leve: 9-12 meses; RDNP moderada: 6 meses; RDNP grave: 3-4 meses; RDP: 2-4 meses',
        examesControle: [
          'Fundoscopia dilatada',
          'OCT de macula',
          'HbA1c',
          'PA'
        ],
        metasTerapeuticas: [
          'Sem progressao da RD',
          'EMD controlado (sem fluido no OCT)',
          'HbA1c <7%, PA <130/80'
        ],
        criteriosEncaminhamento: [
          'Todo diabetico: rastreamento anual',
          'RDNP grave ou RDP: urgencia retinologo',
          'EMD: urgencia retinologo',
          'Perda visual subita: emergencia'
        ],
        citations: [{ refId: 'aao-dr-ppp-2019' }]
      },
      prevencao: {
        primaria: [
          'Controle glicemico desde o diagnostico de DM',
          'Controle de PA e lipidios'
        ],
        secundaria: [
          'Rastreamento anual de RD em todos diabeticos',
          'Tratamento precoce'
        ],
        citations: [{ refId: 'dcct-retinopathy-1993' }]
      }
    },
    protocolos: ['retinopatia-diabetica-rastreamento'],
    medicamentos: ['aflibercepte', 'ranibizumabe', 'dexametasona-intravitreo'],
    calculadoras: ['risco-rd'],
    rastreamentos: ['rastreamento-retinopatia-diabetica'],
    citations: [{ refId: 'aao-dr-ppp-2019' }, { refId: 'drcr-protocol-t-2015' }],
    lastUpdate: '2025-01',
    tags: ['retinopatia', 'diabetes', 'anti-vegf', 'laser', 'edema-macular']
  },

  {
    id: 'edema-macular-diabetico',
    titulo: 'Edema Macular Diabetico',
    sinonimos: ['EMD', 'DME', 'Diabetic macular edema'],
    doid: 'DOID:4195',
    snomedCT: '312912001',
    meshId: 'D008269',
    umlsCui: 'C0730285',
    ciap2: ['F83'],
    cid10: ['H35.81'],
    cid11: ['9B71.1'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Espessamento da retina macular por acumulo de fluido devido a quebra da barreira hematorretiniana no diabetes. Principal causa de baixa visual em diabeticos. Pode ocorrer em qualquer estagio da retinopatia diabetica.',
      criteriosDiagnosticos: [
        'Espessamento retiniano no polo posterior no OCT',
        'EMD clinicamente significativo (EMCS) classico:',
        '- Espessamento a 500 micrometros do centro da fovea',
        '- Exsudatos duros a 500 micrometros com espessamento adjacente',
        '- Espessamento >=1 diametro de disco, parte dentro de 1 DD da fovea',
        'EMD com envolvimento central: espessura central >300 micrometros'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Controle glicemico rigoroso',
          'Controle da pressao arterial',
          'Otimizacao de fatores sistemicos'
        ],
        farmacologico: [
          'EMD COM ENVOLVIMENTO CENTRAL E PERDA VISUAL:',
          'Anti-VEGF: Aflibercepte 2mg ou Ranibizumabe 0,3mg intravítreo',
          'Esquema: mensal x 6 meses, depois treat-and-extend ou PRN',
          'EMD SEM ENVOLVIMENTO CENTRAL:',
          'Observacao ou laser focal/grid',
          'SEGUNDA LINHA:',
          'Implante de dexametasona intravitreo (se refratario ou pseudofacico)'
        ]
      },
      metasTerapeuticas: [
        'Resolucao do edema (OCT central <300 micrometros)',
        'Melhora ou estabilizacao da acuidade visual',
        'Minimizar numero de injecoes'
      ],
      examesIniciais: [
        'OCT de macula (essencial para diagnostico e monitoramento)',
        'Acuidade visual',
        'Fundoscopia',
        'Angiofluoresceinografia (opconal)'
      ],
      redFlags: [
        'Perda visual significativa (>3 linhas)',
        'Isquemia macular (prognostico reservado)',
        'Tracao vitreomacular associada',
        'Resistencia ao tratamento'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '6,8% dos diabeticos; responsavel por 75% da perda visual no DM',
        incidencia: 'Aumenta com duracao do DM e gravidade da RD',
        faixaEtaria: 'Mais comum em DM tipo 2 (maior prevalencia)',
        fatoresRisco: [
          'Duracao do diabetes',
          'Mau controle glicemico',
          'Hipertensao arterial',
          'Dislipidemia',
          'Nefropatia diabetica (forte associacao)',
          'Gravidade da retinopatia'
        ],
        citations: [{ refId: 'wesdr-emd-2009' }]
      },
      fisiopatologia: {
        texto: 'Quebra da barreira hematorretiniana interna (junções tight das celulas endoteliais) e externa (EPR) por hiperglicemia e VEGF. Vazamento de plasma e proteinas causa acumulo de fluido intra e subretiniano. A disfuncao das celulas de Muller contribui para o edema cronico.',
        citations: [{ refId: 'diabetic-retinopathy-pathophysiology-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Visao embaçada central',
          'Dificuldade para leitura',
          'Distorcao visual (metamorfopsia)',
          'Pode ser assintomatico se nao envolve centro'
        ],
        sinaisExameFisico: [
          'Espessamento retiniano macular',
          'Exsudatos duros (aneis circenados)',
          'Cistos intrarretinianos (OCT)',
          'Fluido subretiniano (OCT)',
          'Descolamento seroso do neuroepitélio'
        ],
        formasClinicas: [
          'EMD focal: vazamento localizado',
          'EMD difuso: vazamento generalizado',
          'EMD com componente tracional'
        ],
        citations: [{ refId: 'aao-dr-ppp-2019' }]
      },
      diagnostico: {
        criterios: [
          'OCT: espessura macular central aumentada',
          'Presenca de fluido intrarretiniano ou subretiniano',
          'Classificacao anatomica pelo OCT'
        ],
        diagnosticoDiferencial: [
          'Edema macular cistoide pos-cirurgico',
          'Membrana epirretiniana',
          'Buraco macular',
          'DMRI umida',
          'Oclusao venosa retiniana'
        ],
        examesLaboratoriais: [
          'HbA1c',
          'Funcao renal',
          'Perfil lipidico'
        ],
        examesImagem: [
          'OCT de macula (padrao-ouro)',
          'Angiofluoresceinografia',
          'Angio-OCT'
        ],
        citations: [{ refId: 'drcr-protocol-t-2015' }]
      },
      tratamento: {
        objetivos: [
          'Resolucao do edema',
          'Melhora da visao',
          'Prevenir recorrencia'
        ],
        naoFarmacologico: {
          medidas: [
            'Controle glicemico intensivo',
            'Controle de PA',
            'Controle de dislipidemia'
          ],
          citations: [{ refId: 'dcct-retinopathy-1993' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anti-VEGF', medicamentos: ['Aflibercepte', 'Ranibizumabe'], posologia: 'Mensal x 6, depois treat-and-extend ou PRN', observacoes: 'Melhora de 10+ letras em ~50% dos pacientes' }
          ],
          segundaLinha: [
            { classe: 'Corticoide intravitreo', medicamentos: ['Dexametasona implante'], posologia: 'A cada 4-6 meses', observacoes: 'Preferir em pseudofacicos; risco de catarata e HIO' },
            { classe: 'Laser', medicamentos: ['Fotocoagulacao focal/grid'], posologia: 'Sessao unica ou repetida', observacoes: 'Menos eficaz que anti-VEGF para EMD central' }
          ],
          situacoesEspeciais: [
            { situacao: 'EMD refratario', conduta: 'Trocar classe (anti-VEGF para corticoide ou vice-versa)' },
            { situacao: 'Tracao vitreomacular', conduta: 'Vitrectomia' }
          ],
          citations: [{ refId: 'drcr-protocol-t-2015' }]
        },
        duracao: 'Cronico; tratamento por anos na maioria dos casos'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal durante tratamento ativo; depois conforme protocolo',
        examesControle: [
          'OCT de macula a cada visita',
          'Acuidade visual',
          'HbA1c trimestral'
        ],
        metasTerapeuticas: [
          'OCT: espessura central <300 micrometros',
          'Ausencia de fluido',
          'Visao estavel ou melhorada'
        ],
        criteriosEncaminhamento: [
          'Todo EMD: retinologo',
          'Perda visual: urgencia'
        ],
        citations: [{ refId: 'aao-dr-ppp-2019' }]
      }
    },
    protocolos: ['emd-tratamento'],
    medicamentos: ['aflibercepte', 'ranibizumabe', 'dexametasona-intravitreo'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'drcr-protocol-t-2015' }, { refId: 'aao-dr-ppp-2019' }],
    lastUpdate: '2025-01',
    tags: ['edema-macular', 'diabetes', 'anti-vegf', 'oct']
  },

  {
    id: 'ovcr',
    titulo: 'Oclusao de Veia Central da Retina',
    sinonimos: ['OVCR', 'CRVO', 'Central retinal vein occlusion'],
    doid: 'DOID:1734',
    snomedCT: '68478007',
    meshId: 'D012170',
    umlsCui: 'C0035328',
    ciap2: ['F83'],
    cid10: ['H34.8'],
    cid11: ['9B65.2'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Obstrucao da veia central da retina na regiao da lamina cribosa, causando estase venosa, hemorragias difusas e edema. Segunda causa vascular retiniana mais comum apos retinopatia diabetica. Formas isquemica (grave) e nao-isquemica.',
      criteriosDiagnosticos: [
        'Perda visual subita ou progressiva unilateral',
        'Fundoscopia: hemorragias em todos os quadrantes (aspecto de pizza)',
        'Veias retinianas dilatadas e tortuosas',
        'Edema de disco optico',
        'Manchas algodonosas (isquemia)',
        'FORMA ISQUEMICA: >10 areas de disco de nao-perfusao na angio',
        'Frequente edema macular'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Investigar e tratar fatores de risco sistemicos',
          'Monitoramento regular (risco de neovascularizacao)'
        ],
        farmacologico: [
          'EDEMA MACULAR (principal causa de baixa visual):',
          'Anti-VEGF: Aflibercepte ou Ranibizumabe (primeira linha)',
          'Implante de dexametasona (alternativa)',
          'NEOVASCULARIZACAO (forma isquemica):',
          'Panfotocoagulacao a laser',
          'Anti-VEGF adjuvante'
        ]
      },
      metasTerapeuticas: [
        'Resolucao do edema macular',
        'Prevencao de neovascularizacao e glaucoma neovascular',
        'Recuperacao visual maxima possivel'
      ],
      examesIniciais: [
        'Fundoscopia dilatada',
        'OCT de macula',
        'Angiofluoresceinografia (avaliar isquemia)',
        'PA, glicemia, perfil lipidico',
        'Hemograma, coagulograma'
      ],
      redFlags: [
        'Neovascularizacao de iris (rubeosis): risco de glaucoma neovascular',
        'Dor ocular (glaucoma neovascular instalado)',
        'Forma isquemica (>10 DD de nao-perfusao): alto risco',
        'DAPR (defeito pupilar aferente): sugere isquemia grave'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,1-0,5% em >40 anos',
        incidencia: '2-5/10.000/ano',
        faixaEtaria: 'Media 60-65 anos; raro em jovens',
        fatoresRisco: [
          'Hipertensao arterial (mais comum)',
          'Diabetes mellitus',
          'Dislipidemia',
          'Glaucoma (aumento da PIO)',
          'Hipercoagulabilidade (em jovens)',
          'Hiperviscosidade sanguinea'
        ],
        citations: [{ refId: 'bvos-cvos-1997' }]
      },
      fisiopatologia: {
        texto: 'Trombose da veia central da retina na regiao da lamina cribosa, onde arteria e veia compartilham a adventicia. Fatores: compressao por arteria esclerosada, alteracoes endoteliais, estase venosa. A obstrucao causa aumento da pressao venosa, hemorragias e hipoxia retiniana com liberacao de VEGF.',
        citations: [{ refId: 'retinal-vein-occlusion-2010' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Perda visual subita ou progressiva (horas a dias)',
          'Unilateral na grande maioria',
          'Gravidade depende do grau de isquemia'
        ],
        sinaisExameFisico: [
          'Hemorragias retinianas em todos os quadrantes',
          'Veias dilatadas e tortuosas',
          'Edema de disco optico',
          'Manchas algodonosas',
          'Edema macular (frequente)',
          'DAPR (defeito pupilar aferente) na forma isquemica'
        ],
        formasClinicas: [
          'Nao-isquemica (perfundida): 75% dos casos, melhor prognostico',
          'Isquemica: 25%, alto risco de neovascularizacao e glaucoma',
          'Conversao: nao-isquemica pode virar isquemica (15-30%)'
        ],
        citations: [{ refId: 'bvos-cvos-1997' }]
      },
      diagnostico: {
        criterios: [
          'Quadro clinico tipico',
          'Fundoscopia caracteristica',
          'Angiofluoresceinografia para classificar (isquemica vs nao)'
        ],
        diagnosticoDiferencial: [
          'Retinopatia diabetica',
          'Retinopatia hipertensiva maligna',
          'Sindrome isquemica ocular',
          'Papiloflebite (em jovens, bom prognostico)'
        ],
        examesLaboratoriais: [
          'Hemograma completo',
          'Glicemia, HbA1c',
          'Perfil lipidico',
          'Coagulograma, pesquisa de trombofilias (em jovens)',
          'Velocidade de hemossedimentacao'
        ],
        examesImagem: [
          'OCT de macula',
          'Angiofluoresceinografia (essencial para classificacao)',
          'Angio-OCT'
        ],
        citations: [{ refId: 'retinal-vein-occlusion-2010' }]
      },
      tratamento: {
        objetivos: [
          'Tratar edema macular',
          'Prevenir complicacoes neovasculares',
          'Otimizar fatores sistemicos'
        ],
        naoFarmacologico: {
          medidas: [
            'Controle de PA, DM, dislipidemia',
            'Investigacao de causa em jovens',
            'Monitoramento regular (risco de conversao e neovascularizacao)'
          ],
          citations: [{ refId: 'bvos-cvos-1997' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anti-VEGF', medicamentos: ['Aflibercepte', 'Ranibizumabe'], posologia: 'Mensal inicialmente, depois PRN ou treat-and-extend', observacoes: 'Primeira linha para edema macular' }
          ],
          segundaLinha: [
            { classe: 'Corticoide intravitreo', medicamentos: ['Dexametasona implante'], posologia: 'A cada 4-6 meses', observacoes: 'Alternativa; maior duracao' },
            { classe: 'Laser', medicamentos: ['Panfotocoagulacao'], posologia: 'Se neovascularizacao ou forma isquemica', observacoes: 'Nao trata edema macular' }
          ],
          situacoesEspeciais: [
            { situacao: 'Glaucoma neovascular', conduta: 'Anti-VEGF urgente + panfotocoagulacao + tratamento do glaucoma' }
          ],
          citations: [{ refId: 'cruise-bravo-2010' }]
        },
        duracao: 'Variavel; pode necessitar tratamento por 2-3 anos'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal nos primeiros meses; depois conforme evolucao',
        examesControle: [
          'OCT de macula',
          'Fundoscopia (buscar neovases)',
          'Gonioscopia (detectar rubeosis)',
          'PA'
        ],
        metasTerapeuticas: [
          'Resolucao do edema macular',
          'Ausencia de neovascularizacao',
          'PIO normal'
        ],
        criteriosEncaminhamento: [
          'Todo caso: retinologo',
          'Glaucoma neovascular: urgencia'
        ],
        citations: [{ refId: 'bvos-cvos-1997' }]
      }
    },
    protocolos: ['ovcr-manejo'],
    medicamentos: ['aflibercepte', 'ranibizumabe', 'dexametasona-intravitreo'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'bvos-cvos-1997' }, { refId: 'cruise-bravo-2010' }],
    lastUpdate: '2025-01',
    tags: ['ovcr', 'oclusao-venosa', 'retina', 'anti-vegf', 'edema-macular']
  },

  // ============================================================================
  // CRISTALINO
  // ============================================================================
  {
    id: 'catarata-senil',
    titulo: 'Catarata Senil',
    sinonimos: ['Catarata relacionada a idade', 'Opacificacao do cristalino', 'Age-related cataract'],
    doid: 'DOID:83',
    snomedCT: '193570009',
    meshId: 'D002386',
    umlsCui: 'C0086543',
    ciap2: ['F92'],
    cid10: ['H25', 'H25.0', 'H25.1', 'H25.2'],
    cid11: ['9B10.0'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Opacificacao progressiva do cristalino relacionada ao envelhecimento. Causa mais comum de cegueira reversivel no mundo. Tratamento e exclusivamente cirurgico quando a visao e funcionalmente comprometida.',
      criteriosDiagnosticos: [
        'Idade >50 anos (tipicamente)',
        'Diminuicao progressiva da acuidade visual',
        'Opacidade do cristalino a biomicroscopia',
        'Tipos: nuclear (mais comum), cortical, subcapsular posterior',
        'Teste do reflexo vermelho alterado',
        'Sintomas visuais relacionados (ofuscamento, halos)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Atualizacao de refração (oculos) pode ajudar temporariamente',
          'Melhor iluminacao para leitura',
          'Uso de oculos de sol (reduzir fotofobia)'
        ],
        farmacologico: [
          'NAO HA TRATAMENTO FARMACOLOGICO EFICAZ',
          'Cirurgia de facoemulsificacao com implante de lente intraocular (LIO) e o tratamento definitivo',
          'Indicacao: quando a catarata afeta qualidade de vida e AVDs'
        ]
      },
      metasTerapeuticas: [
        'Recuperacao da acuidade visual',
        'Melhora da qualidade de vida',
        'Independencia para AVDs'
      ],
      examesIniciais: [
        'Acuidade visual (Snellen)',
        'Biomicroscopia (lampada de fenda)',
        'Fundoscopia (avaliar retina)',
        'Tonometria (descartar glaucoma)',
        'Biometria e topografia (pre-operatorio)'
      ],
      redFlags: [
        'Perda visual subita (nao e catarata)',
        'Dor ocular associada',
        'Catarata em jovem (investigar causas)',
        'Catarata unilateral rapidamente progressiva',
        'Uveite associada'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '50% em 65-74 anos; >70% em >75 anos',
        incidencia: 'Aumenta progressivamente com idade',
        mortalidade: 'N/A - impacto em qualidade de vida e quedas',
        faixaEtaria: 'Rara antes de 50 anos; universal com envelhecimento',
        fatoresRisco: [
          'Idade (principal)',
          'Exposicao solar (UV)',
          'Tabagismo',
          'Diabetes mellitus',
          'Uso cronico de corticoides',
          'Trauma ocular',
          'Miopia alta',
          'Cirurgia intraocular previa'
        ],
        citations: [{ refId: 'aao-cataract-2021' }]
      },
      fisiopatologia: {
        texto: 'Modificacoes bioquimicas nas proteinas do cristalino (cristalinas) levam a agregacao e opacificacao. Estresse oxidativo, glicacao nao-enzimatica (diabetes) e radiacao UV contribuem. A desidratacao e alteracoes do metabolismo das fibras do cristalino progridem com a idade.',
        citations: [{ refId: 'lancet-cataract-2017' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Diminuicao progressiva da visao (meses a anos)',
          'Visao embaçada, "nevoa"',
          'Ofuscamento com luz',
          'Halos ao redor de luzes',
          'Alteracao na percepcao de cores',
          'Necessidade de luz mais forte para ler',
          'Miopia lenticular (melhora temporaria para perto)'
        ],
        sinaisExameFisico: [
          'Opacidade do cristalino (tipos variados)',
          'Reflexo vermelho alterado ou ausente',
          'Acuidade visual reduzida'
        ],
        formasClinicas: [
          'Nuclear: amarelamento e endurecimento central',
          'Cortical: opacidades em cunha/raios',
          'Subcapsular posterior: opacidade central posterior (mais sintomatica)',
          'Mista: combinacao'
        ],
        citations: [{ refId: 'aao-cataract-2021' }]
      },
      diagnostico: {
        criterios: [
          'Opacidade do cristalino ao exame',
          'Reducao da acuidade visual correspondente',
          'Ausencia de outras causas para a baixa visao'
        ],
        diagnosticoDiferencial: [
          'Erro refrativo nao corrigido',
          'DMRI',
          'Glaucoma',
          'Retinopatia diabetica',
          'Opacidade de cornea'
        ],
        examesLaboratoriais: [
          'Glicemia (descartar diabetes)'
        ],
        examesImagem: [
          'Biometria ocular (pre-operatorio)',
          'Topografia corneana',
          'OCT de macula (se suspeita de patologia macular)'
        ],
        citations: [{ refId: 'lancet-cataract-2017' }]
      },
      tratamento: {
        objetivos: [
          'Restaurar visao funcional',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Cirurgia de catarata (facoemulsificacao)',
            'Implante de lente intraocular',
            'Opcoes de LIO: monofocal, multifocal, torica'
          ],
          citations: [{ refId: 'aao-cataract-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cirurgia', medicamentos: ['Facoemulsificacao + LIO'], posologia: 'Procedimento ambulatorial', observacoes: 'Unico tratamento definitivo; taxa de sucesso >95%' }
          ],
          segundaLinha: [],
          situacoesEspeciais: [
            { situacao: 'Catarata madura/hipermadura', conduta: 'Tecnica cirurgica adaptada; maior risco' },
            { situacao: 'Comorbidades oculares', conduta: 'Avaliar beneficio; prognostico pode ser limitado' }
          ],
          citations: [{ refId: 'lancet-cataract-2017' }]
        },
        duracao: 'Cirurgia e curativa; acompanhamento pos-operatorio'
      },
      acompanhamento: {
        frequenciaConsultas: 'Pre-operatorio; 1 dia, 1 semana, 1 mes pos-op; depois anual',
        examesControle: [
          'Acuidade visual',
          'Biomicroscopia',
          'Tonometria'
        ],
        metasTerapeuticas: [
          'Visao >=20/40 na maioria',
          'Ausencia de complicacoes',
          'Satisfacao do paciente'
        ],
        criteriosEncaminhamento: [
          'Catarata com impacto funcional: oftalmologista cirurgico',
          'Catarata visualmente significativa para cirurgia'
        ],
        citations: [{ refId: 'aao-cataract-2021' }]
      },
      prevencao: {
        primaria: [
          'Protecao solar (oculos com filtro UV)',
          'Nao fumar',
          'Controle de diabetes'
        ],
        secundaria: [
          'Exames oftalmologicos regulares apos 50 anos',
          'Cirurgia oportuna quando indicada'
        ],
        citations: [{ refId: 'lancet-cataract-2017' }]
      }
    },
    protocolos: ['catarata-indicacao-cirurgica'],
    medicamentos: [],
    calculadoras: ['calculadora-lio'],
    rastreamentos: [],
    citations: [{ refId: 'aao-cataract-2021' }, { refId: 'lancet-cataract-2017' }],
    lastUpdate: '2025-01',
    tags: ['catarata', 'cristalino', 'facoemulsificacao', 'lio', 'cegueira-reversivel']
  },

  // ============================================================================
  // UVEA
  // ============================================================================
  {
    id: 'uveite-anterior',
    titulo: 'Uveite Anterior',
    sinonimos: ['Irite', 'Iridociclite', 'Uveite anterior aguda', 'Anterior uveitis'],
    doid: 'DOID:12098',
    snomedCT: '65323003',
    meshId: 'D014606',
    umlsCui: 'C0042165',
    ciap2: ['F73'],
    cid10: ['H20', 'H20.0', 'H20.1'],
    cid11: ['9A60.0'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Inflamacao da uvea anterior (iris e corpo ciliar). Forma mais comum de uveite (90%). Pode ser idiopatica (50%) ou associada a doencas sistemicas (HLA-B27, sarcoidose, etc.). Emergencia oftalmologica se nao tratada.',
      criteriosDiagnosticos: [
        'Dor ocular e fotofobia',
        'Hiperemia periquerática (ciliar)',
        'Celulas e flare na camara anterior (biomicroscopia)',
        'Miose ou pupila irregular (sinequias)',
        'Precipitados ceraticos (PKs)',
        'Visao geralmente pouco afetada inicialmente',
        'Classificar: aguda vs cronica; granulomatosa vs nao-granulomatosa'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Encaminhamento oftalmologico urgente',
          'Repouso visual relativo'
        ],
        farmacologico: [
          'CORTICOIDE TOPICO: Prednisolona 1% ou Dexametasona 0,1%',
          'Ataque: 1 gota a cada 1-2h por 24-48h, depois desmame gradual',
          'CICLOPLEGICO: Ciclopentolato 1% ou Atropina 1%',
          '1 gota 2-3x/dia (alivio de dor e prevencao de sinequias)',
          'FORMAS GRAVES/CRONICAS: corticoide periocular ou sistemico'
        ]
      },
      metasTerapeuticas: [
        'Resolucao da inflamacao (celulas 0)',
        'Prevencao de complicacoes (sinequias, catarata, glaucoma)',
        'Identificar e tratar causa subjacente'
      ],
      examesIniciais: [
        'Biomicroscopia (lampada de fenda)',
        'Tonometria',
        'Fundoscopia (excluir uveite posterior)',
        'Se recorrente ou bilateral: investigacao sistemica'
      ],
      redFlags: [
        'Hipópio (pus na camara anterior)',
        'PIO muito elevada',
        'Uveite posterior associada',
        'Nao resposta ao tratamento em 1 semana',
        'Uveite bilateral ou recorrente (investigar causa)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '17-52/100.000',
        incidencia: '15-30/100.000/ano',
        faixaEtaria: 'Pico entre 20-50 anos',
        fatoresRisco: [
          'HLA-B27 positivo (espondilite, artrite reativa)',
          'Doencas autoimunes',
          'Sarcoidose',
          'Infeccoes (herpes, tuberculose, sifilis)',
          'Trauma ocular'
        ],
        citations: [{ refId: 'aao-uveitis-2021' }]
      },
      fisiopatologia: {
        texto: 'Inflamacao da iris e corpo ciliar por mecanismos autoimunes ou infecciosos. Na forma HLA-B27, mimetismo molecular com antigenos bacterianos. Infiltracao de celulas inflamatorias na uvea anterior libera mediadores que aumentam permeabilidade vascular (flare) e recrutam mais celulas.',
        citations: [{ refId: 'lancet-uveitis-2016' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Dor ocular (tipicamente moderada)',
          'Fotofobia intensa',
          'Lacrimejamento',
          'Hiperemia ocular',
          'Visao levemente embaçada'
        ],
        sinaisExameFisico: [
          'Hiperemia ciliar (periquerática)',
          'Celulas na camara anterior (Tyndall)',
          'Flare (proteinas no aquoso)',
          'Precipitados ceraticos (PKs)',
          'Miose reativa',
          'Sinequias posteriores (aderencias iris-cristalino)'
        ],
        formasClinicas: [
          'Aguda: inicio subito, duracao <3 meses',
          'Cronica: duracao >3 meses',
          'Recorrente: episodios repetidos',
          'Granulomatosa: PKs grandes (mutton fat), nodulos de Koeppe',
          'Nao-granulomatosa: PKs finos'
        ],
        citations: [{ refId: 'aao-uveitis-2021' }]
      },
      diagnostico: {
        criterios: [
          'Clinica + biomicroscopia',
          'Classificar por anatomia, lateralidade, duracao, etiologia',
          'Investigar doenca sistemica se indicado'
        ],
        diagnosticoDiferencial: [
          'Conjuntivite (nao tem dor ou fotofobia)',
          'Glaucoma agudo (PIO muito elevada)',
          'Esclerite/episclerite',
          'Ceratite',
          'Endoftalmite'
        ],
        examesLaboratoriais: [
          'Se recorrente/bilateral/cronico:',
          'HLA-B27',
          'Sorologias (sifilis, HIV, toxoplasmose)',
          'PPD/IGRA',
          'Radiografia de torax (sarcoidose)',
          'VHS, PCR'
        ],
        examesImagem: [
          'Radiografia sacroiliacas (espondilite)',
          'TC de torax (sarcoidose)'
        ],
        citations: [{ refId: 'lancet-uveitis-2016' }]
      },
      tratamento: {
        objetivos: [
          'Controle rapido da inflamacao',
          'Prevencao de complicacoes',
          'Identificar e tratar causa subjacente'
        ],
        naoFarmacologico: {
          medidas: [
            'Acompanhamento oftalmologico',
            'Evitar luz intensa (fotofobia)'
          ],
          citations: [{ refId: 'aao-uveitis-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide topico', medicamentos: ['Prednisolona 1%', 'Dexametasona 0,1%'], posologia: '1 gota a cada 1-2h nas primeiras 24-48h, depois desmame em 4-6 semanas', observacoes: 'Nao suspender abruptamente' },
            { classe: 'Cicloplegico', medicamentos: ['Ciclopentolato 1%', 'Atropina 1%'], posologia: '1 gota 2-3x/dia', observacoes: 'Previne sinequias e alivia dor' }
          ],
          segundaLinha: [
            { classe: 'Corticoide periocular', medicamentos: ['Triancinolona'], posologia: 'Injecao subtenoniana', observacoes: 'Para casos refratarios' },
            { classe: 'Corticoide sistemico', medicamentos: ['Prednisona'], posologia: '1mg/kg/dia, desmame', observacoes: 'Uveite grave ou bilateral' }
          ],
          situacoesEspeciais: [
            { situacao: 'Uveite herpetica', conduta: 'Aciclovir sistemico + corticoide (nunca corticoide isolado)' },
            { situacao: 'Uveite por sifilis/TB', conduta: 'Tratamento especifico da infeccao' }
          ],
          citations: [{ refId: 'aao-uveitis-2021' }]
        },
        duracao: 'Aguda: 4-6 semanas; cronica: meses a anos'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal na fase aguda; depois conforme evolucao',
        examesControle: [
          'Biomicroscopia (celulas e flare)',
          'Tonometria',
          'Fundoscopia'
        ],
        metasTerapeuticas: [
          'Celulas 0 na camara anterior',
          'PIO normal',
          'Ausencia de sinequias'
        ],
        criteriosEncaminhamento: [
          'Todo caso: oftalmologista',
          'Nao resposta em 1 semana',
          'Suspeita de etiologia sistemica: reumatologista'
        ],
        citations: [{ refId: 'lancet-uveitis-2016' }]
      }
    },
    protocolos: ['uveite-anterior-manejo'],
    medicamentos: ['prednisolona-colirio', 'dexametasona-colirio', 'ciclopentolato', 'atropina'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'aao-uveitis-2021' }, { refId: 'lancet-uveitis-2016' }],
    lastUpdate: '2025-01',
    tags: ['uveite', 'irite', 'hla-b27', 'inflamacao-ocular']
  },

  // ============================================================================
  // SUPERFICIE OCULAR
  // ============================================================================
  {
    id: 'olho-seco',
    titulo: 'Sindrome do Olho Seco',
    sinonimos: ['Doenca do olho seco', 'Ceratoconjuntivite sicca', 'Dry eye disease', 'DED'],
    doid: 'DOID:12895',
    snomedCT: '46152009',
    meshId: 'D015352',
    umlsCui: 'C0013238',
    ciap2: ['F13'],
    cid10: ['H04.1'],
    cid11: ['9A12.1'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Doenca multifatorial da superficie ocular caracterizada por instabilidade do filme lacrimal, inflamacao e dano a superficie. Muito prevalente, especialmente em mulheres pos-menopausa e usuarios de telas. Impacto significativo na qualidade de vida.',
      criteriosDiagnosticos: [
        'Sintomas: ardencia, sensacao de areia, fadiga ocular, visao flutuante',
        'Sinais: reducao do tempo de ruptura do filme lacrimal (BUT <10s)',
        'Coloracao com fluoresceina (ceratite ponteada)',
        'Teste de Schirmer reduzido (<10mm em 5min sem anestesia)',
        'Osmolaridade lacrimal elevada (>308 mOsm/L)',
        'Disfuncao das glandulas de Meibomio (tipo evaporativo)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Pausas frequentes no uso de telas (regra 20-20-20)',
          'Umidificacao do ambiente',
          'Compressas mornas e higiene palpebral (disfuncao de Meibomio)',
          'Oculos de protecao em ambientes ventosos/secos'
        ],
        farmacologico: [
          'LUBRIFICANTES: Lagrimas artificiais sem conservantes',
          'Uso frequente (4-6x/dia ou mais)',
          'Geis/pomadas para uso noturno',
          'ANTI-INFLAMATORIOS (moderado/grave):',
          'Ciclosporina 0,05% ou 0,1% 12/12h',
          'Lifitegrast 5% 12/12h',
          'Corticoide topico cursos curtos (resgate)'
        ]
      },
      metasTerapeuticas: [
        'Alivio dos sintomas',
        'Melhora da estabilidade do filme lacrimal',
        'Prevencao de dano a superficie ocular'
      ],
      examesIniciais: [
        'Questionario de sintomas (OSDI, SPEED)',
        'Biomicroscopia com fluoresceina',
        'Tempo de ruptura do filme lacrimal (BUT)',
        'Teste de Schirmer',
        'Avaliacao das glandulas de Meibomio'
      ],
      redFlags: [
        'Dor intensa (sugere outra patologia)',
        'Ulcera corneana',
        'Olho seco grave em jovem (Sjogren?)',
        'Assimetria significativa',
        'Piora subita'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5-50% dependendo dos criterios; media ~15% em adultos',
        faixaEtaria: 'Aumenta com idade; muito comum >50 anos',
        fatoresRisco: [
          'Idade avancada',
          'Sexo feminino (hormonal)',
          'Pos-menopausa',
          'Uso prolongado de telas',
          'Ar condicionado, ambientes secos',
          'Lentes de contato',
          'Medicamentos (antihistaminicos, antidepressivos, diureticos)',
          'Doencas autoimunes (Sjogren, AR, LES)',
          'Blefarite cronica'
        ],
        citations: [{ refId: 'tfos-dews-ii-2017' }]
      },
      fisiopatologia: {
        texto: 'Ciclo vicioso de instabilidade lacrimal, hiperosmolaridade e inflamacao. Dois mecanismos principais: deficiencia aquosa (reducao da producao lacrimal) e evaporativo (disfuncao de Meibomio, componente mais comum). A inflamacao cronica danifica as celulas da superficie ocular e nervos corneanos.',
        citations: [{ refId: 'tfos-dews-ii-2017' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Sensacao de areia/corpo estranho',
          'Ardencia, queimacao',
          'Fadiga ocular',
          'Visao embaçada intermitente (piora ao piscar)',
          'Lacrimejamento reflexo paradoxal',
          'Fotofobia leve',
          'Piora ao final do dia ou apos uso de telas'
        ],
        sinaisExameFisico: [
          'Hiperemia conjuntival leve',
          'Reducao do menisco lacrimal',
          'BUT reduzido (<10 segundos)',
          'Ceratite ponteada (coloracao com fluoresceina)',
          'Alteracoes palpebrais (blefarite, disfuncao de Meibomio)'
        ],
        formasClinicas: [
          'Deficiencia aquosa: Schirmer baixo (Sjogren, nao-Sjogren)',
          'Evaporativo: disfuncao de Meibomio (mais comum)',
          'Misto: combinacao'
        ],
        citations: [{ refId: 'tfos-dews-ii-2017' }]
      },
      diagnostico: {
        criterios: [
          'Sintomas + sinais objetivos',
          'Questionarios validados (OSDI >=13)',
          'Classificacao de gravidade (leve, moderado, grave)'
        ],
        diagnosticoDiferencial: [
          'Alergia ocular',
          'Blefarite',
          'Conjuntivite',
          'Disfuncao de lente de contato',
          'Erosao corneana recorrente'
        ],
        examesLaboratoriais: [
          'Se suspeita de Sjogren: anti-SSA, anti-SSB, FAN'
        ],
        examesImagem: [
          'Meibografia (avaliar glandulas de Meibomio)',
          'Osmolaridade lacrimal (quando disponivel)'
        ],
        citations: [{ refId: 'aao-dry-eye-2023' }]
      },
      tratamento: {
        objetivos: [
          'Restaurar homeostase da superficie ocular',
          'Aliviar sintomas',
          'Prevenir dano corneano'
        ],
        naoFarmacologico: {
          medidas: [
            'Modificacao ambiental',
            'Higiene palpebral (compressas mornas, massagem)',
            'Omega-3 oral (controverso, pode ajudar)',
            'Oclusao de pontos lacrimais (casos graves)'
          ],
          citations: [{ refId: 'tfos-dews-ii-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Lubrificantes', medicamentos: ['Carboximetilcelulose', 'Hialuronato de sodio', 'Hidroxipropilmetilcelulose'], posologia: '4-6x/dia ou mais; preferir sem conservantes', observacoes: 'Base do tratamento em todos os estagios' }
          ],
          segundaLinha: [
            { classe: 'Anti-inflamatorios topicos', medicamentos: ['Ciclosporina 0,05%', 'Lifitegrast 5%'], posologia: '1 gota 12/12h', observacoes: 'Para doenca moderada/grave com inflamacao' },
            { classe: 'Corticoide topico', medicamentos: ['Fluormetolona', 'Loteprednol'], posologia: 'Cursos curtos (2-4 semanas)', observacoes: 'Resgate em exacerbacoes' }
          ],
          situacoesEspeciais: [
            { situacao: 'Disfuncao de Meibomio', conduta: 'Compressas + massagem + doxiciclina oral ou azitromicina topica' },
            { situacao: 'Sjogren', conduta: 'Acompanhamento reumatologico; pilocarpina oral pode ajudar' }
          ],
          citations: [{ refId: 'aao-dry-eye-2023' }]
        },
        duracao: 'Cronico; tratamento de manutencao por tempo indeterminado'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3-6 meses; mais frequente se grave',
        examesControle: [
          'Sintomas (OSDI)',
          'BUT',
          'Coloracao de superficie'
        ],
        metasTerapeuticas: [
          'Melhora dos sintomas',
          'BUT >10 segundos',
          'Superficie ocular integra'
        ],
        criteriosEncaminhamento: [
          'Casos graves/refratarios: especialista em superficie ocular',
          'Suspeita de Sjogren: reumatologista'
        ],
        citations: [{ refId: 'tfos-dews-ii-2017' }]
      }
    },
    protocolos: ['olho-seco-manejo'],
    medicamentos: ['lagrimas-artificiais', 'ciclosporina-colirio', 'lifitegrast'],
    calculadoras: ['osdi'],
    rastreamentos: [],
    citations: [{ refId: 'tfos-dews-ii-2017' }, { refId: 'aao-dry-eye-2023' }],
    lastUpdate: '2025-01',
    tags: ['olho-seco', 'superficie-ocular', 'meibomio', 'lagrimas-artificiais']
  },

  // ============================================================================
  // CORNEA
  // ============================================================================
  {
    id: 'ceratocone',
    titulo: 'Ceratocone',
    sinonimos: ['Keratoconus', 'Ectasia corneana'],
    doid: 'DOID:10124',
    snomedCT: '27859005',
    meshId: 'D007640',
    umlsCui: 'C0022578',
    ciap2: ['F99'],
    cid10: ['H18.6'],
    cid11: ['9A73.0'],
    categoria: 'neurologico',
    subcategoria: 'oftalmologia',
    quickView: {
      definicao: 'Ectasia corneana progressiva nao-inflamatoria, caracterizada por afinamento e protrusao conica da cornea. Causa astigmatismo irregular progressivo e baixa visual. Inicio tipico na puberdade com progressao ate 30-40 anos.',
      criteriosDiagnosticos: [
        'Astigmatismo irregular progressivo',
        'Topografia/tomografia: curvatura corneana aumentada (>47D), afinamento central',
        'Sinais biomicroscopicos: anel de Fleischer, estrias de Vogt, sinal de Munson',
        'Indices topograficos alterados (KISA%, Belin-Ambrosio)',
        'Classificacao: frusto (subclinico), leve, moderado, avancado',
        'Forma unilateral possivel (30% evolui para bilateral)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar coçar os olhos (pode acelerar progressao)',
          'Tratar alergia ocular associada'
        ],
        farmacologico: [
          'CORRECAO VISUAL:',
          'Inicial: oculos (astigmatismo leve)',
          'Moderado: lentes de contato rigidas (RGP) ou esclerais',
          'PREVENCAO DE PROGRESSAO:',
          'Cross-linking corneano (CXL) com riboflavina e UV-A',
          'Indicado em ceratocone progressivo, especialmente jovens',
          'AVANCADO:',
          'Aneis intracorneanos (casos selecionados)',
          'Transplante de cornea (ceratoplastia) em casos muito avancados'
        ]
      },
      metasTerapeuticas: [
        'Estabilizar a progressao (cross-linking)',
        'Otimizar acuidade visual',
        'Evitar ou adiar transplante de cornea'
      ],
      examesIniciais: [
        'Topografia corneana (Placido)',
        'Tomografia corneana (Pentacam, Galilei)',
        'Paquimetria',
        'Refracao (astigmatismo irregular)',
        'Biomicroscopia'
      ],
      redFlags: [
        'Progressao rapida (jovens <18 anos)',
        'Hidrops corneano (edema agudo por ruptura da Descemet)',
        'Acuidade visual muito baixa (>20/200 mesmo com LC)',
        'Afinamento extremo (<400 micrometros)'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '50-200/100.000 (varia por etnia/criterios)',
        incidencia: 'Mais comum em asiaticos e arabes',
        faixaEtaria: 'Inicio puberdade/adolescencia; progressao ate 30-40 anos',
        fatoresRisco: [
          'Historia familiar (10-25% tem parente afetado)',
          'Cocar os olhos (fator ambiental principal)',
          'Alergia ocular',
          'Sindrome de Down',
          'Doencas do tecido conectivo (Marfan, Ehlers-Danlos)',
          'Amaurose congenita de Leber'
        ],
        citations: [{ refId: 'keratoconus-review-2015' }]
      },
      fisiopatologia: {
        texto: 'Reducao da forca biomecanica da cornea por alteracoes no colageno estromal. Fatores geneticos (VSX1, SOD1, COL4A3/4) e ambientais (trauma mecanico por coçar). O estresse oxidativo e a apoptose de ceratocitos levam ao afinamento progressivo e protrusao conica.',
        citations: [{ refId: 'keratoconus-pathophysiology-2014' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Visao embaçada progressiva',
          'Troca frequente de grau de oculos',
          'Astigmatismo que nao corrige bem com oculos',
          'Visao dupla monocular (imagem fantasma)',
          'Fotofobia',
          'Halos ao redor de luzes'
        ],
        sinaisExameFisico: [
          'Anel de Fleischer (deposito de ferro na base do cone)',
          'Estrias de Vogt (linhas verticais no estroma)',
          'Sinal de Munson (angulacao da palpebra inferior ao olhar para baixo)',
          'Reflexo em tesoura na retinoscopia',
          'Afinamento corneano central ou inferior'
        ],
        formasClinicas: [
          'Ceratocone frusto/subclinico: topografia alterada sem sinais clinicos',
          'Leve: K max <48D, sem sinais biomicroscopicos',
          'Moderado: K max 48-54D, estrias de Vogt',
          'Avancado: K max >54D, cicatriz corneana'
        ],
        citations: [{ refId: 'keratoconus-review-2015' }]
      },
      diagnostico: {
        criterios: [
          'Topografia/tomografia alterada (indices especificos)',
          'Afinamento corneano (<500 micrometros central)',
          'Curvatura aumentada (K max >47-48D)',
          'Assimetria inferior-superior'
        ],
        diagnosticoDiferencial: [
          'Degeneracao marginal pelucida',
          'Ceratoglobo',
          'Ectasia pos-LASIK',
          'Astigmatismo irregular por outras causas',
          'Ceratopatia em faixa'
        ],
        examesLaboratoriais: [
          'Nao especificos'
        ],
        examesImagem: [
          'Topografia de Placido',
          'Tomografia corneana (Pentacam, Galilei)',
          'Biomicroscopia do segmento anterior',
          'OCT de segmento anterior'
        ],
        citations: [{ refId: 'keratoconus-pathophysiology-2014' }]
      },
      tratamento: {
        objetivos: [
          'Estabilizar a doenca (cross-linking)',
          'Otimizar visao (lentes de contato, aneis)',
          'Evitar transplante se possivel'
        ],
        naoFarmacologico: {
          medidas: [
            'Nao cocar os olhos',
            'Tratar alergia ocular',
            'Lentes de contato rigidas ou esclerais para correcao visual',
            'Cross-linking corneano (procedimento para estabilizar)'
          ],
          citations: [{ refId: 'cxl-keratoconus-2016' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Correcao visual', medicamentos: ['Lentes de contato rigidas', 'Lentes esclerais'], posologia: 'Adaptacao individualizada', observacoes: 'Melhor opcao para correcao visual' },
            { classe: 'Cross-linking', medicamentos: ['Riboflavina + UV-A'], posologia: 'Procedimento unico', observacoes: 'Indicado em progressao documentada' }
          ],
          segundaLinha: [
            { classe: 'Aneis intracorneanos', medicamentos: ['Ferrara', 'Intacs'], posologia: 'Implante cirurgico', observacoes: 'Melhora curvatura em casos selecionados' },
            { classe: 'Transplante de cornea', medicamentos: ['Ceratoplastia penetrante ou lamelar'], posologia: 'Cirurgia', observacoes: 'Casos avancados com cicatriz ou intolerancia a LC' }
          ],
          situacoesEspeciais: [
            { situacao: 'Hidrops corneano', conduta: 'Tratamento conservador (hipertonicos, repouso); pode precisar injecao de ar' },
            { situacao: 'Ceratocone em crianca', conduta: 'Cross-linking precoce se progressao' }
          ],
          citations: [{ refId: 'cxl-keratoconus-2016' }]
        },
        duracao: 'Acompanhamento cronico; cross-linking e procedimento unico (pode repetir se necessario)'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 6-12 meses; mais frequente em jovens ou progressao',
        examesControle: [
          'Topografia/tomografia seriada',
          'Paquimetria',
          'Acuidade visual'
        ],
        metasTerapeuticas: [
          'Estabilidade topografica (sem progressao)',
          'Acuidade visual funcional',
          'Adaptacao bem-sucedida de LC'
        ],
        criteriosEncaminhamento: [
          'Todo caso: especialista em cornea',
          'Progressao: cross-linking',
          'Casos avancados: avaliacao para transplante'
        ],
        citations: [{ refId: 'keratoconus-review-2015' }]
      },
      prevencao: {
        primaria: [
          'Nao cocar os olhos',
          'Tratamento de alergia ocular'
        ],
        secundaria: [
          'Cross-linking precoce em casos progressivos',
          'Rastreamento de familiares'
        ],
        citations: [{ refId: 'cxl-keratoconus-2016' }]
      }
    },
    protocolos: ['ceratocone-manejo'],
    medicamentos: ['riboflavina'],
    calculadoras: ['kisa-index'],
    rastreamentos: [],
    citations: [{ refId: 'keratoconus-review-2015' }, { refId: 'cxl-keratoconus-2016' }],
    lastUpdate: '2025-01',
    tags: ['ceratocone', 'ectasia', 'cross-linking', 'lentes-contato', 'transplante-cornea']
  }
];
