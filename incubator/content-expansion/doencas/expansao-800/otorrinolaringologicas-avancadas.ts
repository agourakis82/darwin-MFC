/**
 * DOENCAS OTORRINOLARINGOLOGICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ===================================================================
 * ENT conditions for primary care
 */

import { Doenca } from '@/lib/types/doenca';

export const otorrinolaringologicasAvancadas: Doenca[] = [
  // ============================================================================
  // DOENCA DE MENIERE
  // ============================================================================
  {
    id: 'doenca-meniere',
    titulo: 'Doenca de Meniere',
    sinonimos: ['Hidropsia endolinfatica', 'Meniere disease'],
    doid: 'DOID:9849',
    snomedCT: '13445001',
    meshId: 'D008575',
    ciap2: ['H82'],
    cid10: ['H81.0'],
    categoria: 'neurologico',
    subcategoria: 'otorrinolaringologia',
    quickView: {
      definicao: 'Doenca do ouvido interno com triade: vertigem episodica, perda auditiva flutuante e zumbido. Causada por hidropsia endolinfatica.',
      criteriosDiagnosticos: [
        '2+ episodios de vertigem rotatoria 20min-12h',
        'Perda auditiva neurossensorial documentada',
        'Zumbido ou plenitude aural flutuantes',
        'Exclusao de outras causas'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Restricao de sodio <2g/dia', 'Evitar cafeina e alcool'],
        farmacologico: ['Betaistina 24mg 12/12h', 'Diureticos: HCTZ 25mg/dia']
      },
      redFlags: ['Vertigem >24h', 'Deficit neurologico focal', 'Cefaleia subita intensa'],
      metasTerapeuticas: ['Reducao frequencia das crises', 'Preservacao auditiva']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '50-200/100.000',
        faixaEtaria: '40-60 anos',
        fatoresRisco: ['Historia familiar', 'Doencas autoimunes', 'Alergias'],
        citations: [{ refId: 'aao-hns-meniere-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Vertigem rotatoria episodica', 'Perda auditiva flutuante', 'Zumbido', 'Plenitude aural'],
        sinaisExameFisico: ['Nistagmo durante crise', 'Weber lateralizado', 'Rinne positivo'],
        citations: [{ refId: 'aao-hns-meniere-2020' }]
      },
      diagnostico: {
        criterios: [
          '2+ crises de vertigem 20min-12h',
          'Perda auditiva neurossensorial baixas frequencias',
          'Sintomas auditivos flutuantes',
          'Exclusao de outras etiologias'
        ],
        diagnosticoDiferencial: ['VPPB', 'Neurite vestibular', 'Schwannoma vestibular', 'Enxaqueca vestibular'],
        examesLaboratoriais: ['TSH', 'Glicemia', 'Sorologias se indicado'],
        examesImagem: ['RNM de ossos temporais com contraste'],
        citations: [{ refId: 'aao-hns-meniere-2020' }]
      },
      tratamento: {
        objetivos: ['Reduzir crises', 'Preservar audicao', 'Melhorar qualidade de vida'],
        naoFarmacologico: {
          medidas: ['Dieta hipossodica', 'Evitar cafeina/alcool', 'Reabilitacao vestibular'],
          citations: [{ refId: 'aao-hns-meniere-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anti-vertiginosos', medicamentos: ['Betaistina'], posologia: '24mg 12/12h' },
            { classe: 'Diureticos', medicamentos: ['Hidroclorotiazida'], posologia: '25mg/dia' }
          ],
          segundaLinha: [
            { classe: 'Corticoides intratimpanicos', medicamentos: ['Dexametasona'], observacoes: 'Injecao ORL' }
          ],
          citations: [{ refId: 'aao-hns-meniere-2020' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal nas crises; trimestral se estavel',
        examesControle: ['Audiometria semestral'],
        metasTerapeuticas: ['<1 crise/mes', 'Audicao estavel'],
        criteriosEncaminhamento: ['Crises refratarias', 'Perda auditiva progressiva'],
        citations: [{ refId: 'aao-hns-meniere-2020' }]
      },
      prevencao: {
        primaria: ['Evitar fatores desencadeantes'],
        secundaria: ['Adesao ao tratamento'],
        citations: [{ refId: 'aao-hns-meniere-2020' }]
      }
    },
    protocolos: ['vertigem-aps'],
    medicamentos: ['betaistina', 'hidroclorotiazida'],
    calculadoras: [],
    citations: [{ refId: 'aao-hns-meniere-2020' }],
    lastUpdate: '2026-01',
    tags: ['vertigem', 'meniere', 'perda-auditiva', 'zumbido']
  },

  // ============================================================================
  // OTOSCLEROSE
  // ============================================================================
  {
    id: 'otosclerose',
    titulo: 'Otosclerose',
    sinonimos: ['Otospongiose', 'Otosclerosis'],
    doid: 'DOID:2780',
    snomedCT: '65363002',
    meshId: 'D010040',
    ciap2: ['H86'],
    cid10: ['H80.0', 'H80.9'],
    categoria: 'neurologico',
    subcategoria: 'otorrinolaringologia',
    quickView: {
      definicao: 'Doenca ossea da capsula otica com fixacao do estribo, causando perda auditiva condutiva progressiva. Mais comum em mulheres caucasianas.',
      criteriosDiagnosticos: [
        'Perda auditiva condutiva progressiva bilateral',
        'Timpano normal',
        'Reflexo estapediano ausente',
        'Historia familiar positiva (50%)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Aparelho auditivo'],
        farmacologico: ['Fluoreto de sodio 40mg/dia (controverso)']
      },
      redFlags: ['Perda auditiva subita', 'Vertigem associada', 'Paralisia facial'],
      metasTerapeuticas: ['Melhora auditiva', 'Qualidade de vida']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,3-0,4% caucasianos; rara em negros/asiaticos',
        faixaEtaria: '20-40 anos',
        fatoresRisco: ['Sexo feminino 2:1', 'Historia familiar', 'Gravidez (piora)'],
        citations: [{ refId: 'otosclerosis-nejm-2018' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Perda auditiva progressiva bilateral', 'Zumbido (75%)', 'Paracusia de Willis'],
        sinaisExameFisico: ['Timpano normal ou sinal de Schwartze', 'Weber lateraliza para pior', 'Rinne negativo'],
        citations: [{ refId: 'otosclerosis-nejm-2018' }]
      },
      diagnostico: {
        criterios: [
          'Perda auditiva condutiva',
          'Otoscopia normal',
          'Timpanometria tipo A',
          'Reflexo estapediano ausente'
        ],
        diagnosticoDiferencial: ['Otite media cronica', 'Fixacao ossicular congenita', 'Descontinuidade ossicular'],
        examesImagem: ['TC ossos temporais alta resolucao'],
        citations: [{ refId: 'otosclerosis-nejm-2018' }]
      },
      tratamento: {
        objetivos: ['Reabilitacao auditiva', 'Prevenir progressao'],
        naoFarmacologico: {
          medidas: ['Aparelho de amplificacao sonora', 'Estapedotomia/estapedectomia cirurgica'],
          citations: [{ refId: 'otosclerosis-nejm-2018' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Fluoreto', medicamentos: ['Fluoreto de sodio'], posologia: '40mg/dia', observacoes: 'Evidencia limitada' }
          ],
          citations: [{ refId: 'otosclerosis-nejm-2018' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semestral',
        examesControle: ['Audiometria anual'],
        metasTerapeuticas: ['Audicao funcional', 'Comunicacao preservada'],
        criteriosEncaminhamento: ['Todos para ORL', 'Avaliacao cirurgica'],
        citations: [{ refId: 'otosclerosis-nejm-2018' }]
      },
      prevencao: {
        primaria: ['Nao ha medidas eficazes'],
        secundaria: ['Diagnostico precoce'],
        citations: [{ refId: 'otosclerosis-nejm-2018' }]
      }
    },
    protocolos: ['perda-auditiva-aps'],
    medicamentos: ['fluoreto-sodio'],
    calculadoras: [],
    citations: [{ refId: 'otosclerosis-nejm-2018' }],
    lastUpdate: '2026-01',
    tags: ['otosclerose', 'perda-auditiva', 'condutiva', 'estribo']
  },

  // ============================================================================
  // PARALISIA DE BELL
  // ============================================================================
  {
    id: 'paralisia-bell',
    titulo: 'Paralisia de Bell',
    sinonimos: ['Paralisia facial periferica idiopatica', 'Bell palsy'],
    doid: 'DOID:12506',
    snomedCT: '449868002',
    meshId: 'D020330',
    ciap2: ['N91'],
    cid10: ['G51.0'],
    categoria: 'neurologico',
    subcategoria: 'otorrinolaringologia',
    quickView: {
      definicao: 'Paralisia facial periferica aguda idiopatica, provavelmente viral (HSV-1). Inicio subito, unilateral, afeta toda hemiface.',
      criteriosDiagnosticos: [
        'Paralisia facial periferica aguda unilateral',
        'Fraqueza de toda hemiface (superior e inferior)',
        'Inicio em <72h',
        'Exclusao de causas secundarias'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Protecao ocular', 'Lagrimas artificiais'],
        farmacologico: ['Prednisona 60-80mg/dia 5 dias', 'Valaciclovir 1g 8/8h 7 dias (opcional)']
      },
      redFlags: ['Bilateral', 'Progressao >3 semanas', 'Recorrencia', 'Vesiculas auriculares'],
      metasTerapeuticas: ['Recuperacao completa', 'Prevenir sequelas']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-30/100.000/ano',
        faixaEtaria: 'Qualquer idade; pico 15-45 anos',
        fatoresRisco: ['Gravidez', 'Diabetes', 'Infeccao respiratoria recente'],
        citations: [{ refId: 'bell-palsy-nejm-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fraqueza facial unilateral subita', 'Incapacidade de fechar olho', 'Desvio da boca', 'Hiperacusia'],
        sinaisExameFisico: ['Lagoftalmo', 'Sinal de Bell', 'Apagamento sulco nasogeniano', 'Desvio comissura'],
        citations: [{ refId: 'bell-palsy-nejm-2021' }]
      },
      diagnostico: {
        criterios: [
          'Paralisia facial periferica aguda',
          'Envolvimento de toda hemiface',
          'Exclusao de causas secundarias',
          'Inicio subito (<72h)'
        ],
        diagnosticoDiferencial: ['Herpes zoster otico', 'AVC', 'Tumor parotida', 'Otite media', 'Lyme'],
        examesLaboratoriais: ['Glicemia', 'Sorologia Lyme se area endemica'],
        examesImagem: ['RNM se atipico ou sem melhora'],
        citations: [{ refId: 'bell-palsy-nejm-2021' }]
      },
      tratamento: {
        objetivos: ['Recuperacao da funcao facial', 'Protecao ocular', 'Prevenir sincinesias'],
        naoFarmacologico: {
          medidas: ['Oclusao noturna', 'Lagrimas artificiais 4-6x/dia', 'Pomada ocular noturna'],
          citations: [{ refId: 'bell-palsy-nejm-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide', medicamentos: ['Prednisona'], posologia: '60-80mg/dia 5-7 dias, reduzir em 5 dias' }
          ],
          segundaLinha: [
            { classe: 'Antiviral', medicamentos: ['Valaciclovir', 'Aciclovir'], posologia: 'Valaciclovir 1g 8/8h 7d', observacoes: 'Beneficio controverso; considerar em <72h' }
          ],
          citations: [{ refId: 'bell-palsy-nejm-2021' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal ate melhora; mensal ate recuperacao',
        metasTerapeuticas: ['Recuperacao funcao facial', 'Protecao cornea'],
        criteriosEncaminhamento: ['Sem melhora em 3-4 semanas', 'Paralisia completa', 'Recorrencia'],
        citations: [{ refId: 'bell-palsy-nejm-2021' }]
      },
      prevencao: {
        primaria: ['Nao ha medidas conhecidas'],
        secundaria: ['Tratamento precoce melhora prognostico'],
        citations: [{ refId: 'bell-palsy-nejm-2021' }]
      }
    },
    protocolos: ['paralisia-facial-aps'],
    medicamentos: ['prednisona', 'valaciclovir'],
    calculadoras: ['house-brackmann'],
    citations: [{ refId: 'bell-palsy-nejm-2021' }],
    lastUpdate: '2026-01',
    tags: ['paralisia-facial', 'bell', 'nervo-facial', 'corticoide']
  },

  // ============================================================================
  // SINUSITE FUNGICA
  // ============================================================================
  {
    id: 'sinusite-fungica',
    titulo: 'Sinusite Fungica',
    sinonimos: ['Rinossinusite fungica', 'Fungal rhinosinusitis'],
    doid: 'DOID:0080783',
    snomedCT: '240351009',
    meshId: 'D012220',
    ciap2: ['R75'],
    cid10: ['J32.8', 'B49'],
    categoria: 'respiratorio',
    subcategoria: 'otorrinolaringologia',
    quickView: {
      definicao: 'Infeccao fúngica dos seios paranasais. Formas: bola fungica (mais comum), alergica, invasiva aguda (imunossuprimidos - emergencia).',
      criteriosDiagnosticos: [
        'Sintomas sinusais cronicos refratarios',
        'Imagem com opacificacao e calcificacoes',
        'Evidencia fungica histopatologica/cultura',
        'Invasiva: necrose tecidual + hifas'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cirurgia endoscopica (bola fungica)', 'Debridamento urgente (invasiva)'],
        farmacologico: ['Invasiva: Anfotericina B lipossomal IV', 'Nao-invasiva: antifungicos topicos pos-op']
      },
      redFlags: ['Proptose', 'Oftalmoplegia', 'Necrose palato/corneto', 'Imunossuprimido febril'],
      metasTerapeuticas: ['Erradicacao fungica', 'Preservacao de estruturas']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Bola fungica 3-4% das sinusites cronicas operadas',
        fatoresRisco: ['Imunossupressao (invasiva)', 'Diabetes descompensado', 'Atopia (alergica)'],
        citations: [{ refId: 'fungal-rhinosinusitis-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Obstrucao nasal unilateral', 'Rinorreia mucosa espessa', 'Cacosmia'],
        sinaisExameFisico: ['Secrecao espessa esverdeada', 'Polipos (forma alergica)', 'Necrose (invasiva)'],
        formasClinicas: ['Bola fungica', 'Sinusite fungica alergica', 'Invasiva aguda', 'Invasiva cronica'],
        citations: [{ refId: 'fungal-rhinosinusitis-2019' }]
      },
      diagnostico: {
        criterios: [
          'Sintomas rinossinusais cronicos',
          'TC com opacificacao/calcificacao heterogenea',
          'Confirmacao: hifas em histopatologia',
          'Cultura fungica positiva'
        ],
        diagnosticoDiferencial: ['Rinossinusite bacteriana cronica', 'Neoplasia', 'Granulomatose com poliangiite'],
        examesImagem: ['TC seios da face', 'RNM se suspeita invasao'],
        citations: [{ refId: 'fungal-rhinosinusitis-2019' }]
      },
      tratamento: {
        objetivos: ['Remocao do fungo', 'Restaurar drenagem', 'Controlar inflamacao'],
        naoFarmacologico: {
          medidas: ['Cirurgia endoscopica nasal', 'Debridamento agressivo (invasiva)'],
          citations: [{ refId: 'fungal-rhinosinusitis-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antifungico sistemico', medicamentos: ['Anfotericina B lipossomal'], posologia: '5mg/kg/dia IV', observacoes: 'Forma invasiva apenas' }
          ],
          segundaLinha: [
            { classe: 'Azolicos', medicamentos: ['Voriconazol', 'Itraconazol'], observacoes: 'Manutencao ou nao-invasiva' }
          ],
          citations: [{ refId: 'fungal-rhinosinusitis-2019' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal na fase aguda; mensal pos-operatorio',
        examesControle: ['TC controle pos-op', 'Endoscopia nasal'],
        metasTerapeuticas: ['Erradicacao fungica', 'Seios aerados'],
        criteriosEncaminhamento: ['Todos para ORL', 'Infectologia se invasiva'],
        citations: [{ refId: 'fungal-rhinosinusitis-2019' }]
      },
      prevencao: {
        primaria: ['Controle glicemico em diabeticos'],
        secundaria: ['Vigilancia em imunossuprimidos'],
        citations: [{ refId: 'fungal-rhinosinusitis-2019' }]
      }
    },
    protocolos: ['sinusite-cronica-aps'],
    medicamentos: ['anfotericina-b', 'voriconazol'],
    calculadoras: [],
    citations: [{ refId: 'fungal-rhinosinusitis-2019' }],
    lastUpdate: '2026-01',
    tags: ['sinusite', 'fungica', 'mucormicose', 'aspergilose']
  },

  // ============================================================================
  // SAOS - SINDROME DA APNEIA OBSTRUTIVA DO SONO
  // ============================================================================
  {
    id: 'saos-apneia-obstrutiva',
    titulo: 'Sindrome da Apneia Obstrutiva do Sono',
    sinonimos: ['SAOS', 'Apneia do sono', 'Obstructive sleep apnea', 'OSA'],
    doid: 'DOID:0050848',
    snomedCT: '78275009',
    meshId: 'D020181',
    ciap2: ['P06', 'R29'],
    cid10: ['G47.3'],
    categoria: 'respiratorio',
    subcategoria: 'otorrinolaringologia',
    quickView: {
      definicao: 'Colapso repetitivo das vias aereas superiores durante o sono, causando apneias/hipopneias, dessaturacao e fragmentacao do sono.',
      criteriosDiagnosticos: [
        'IAH >=5/h + sintomas OU IAH >=15/h',
        'Polissonografia padrao-ouro',
        'Sonolencia diurna excessiva',
        'Ronco, pausas respiratorias testemunhadas'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['CPAP (moderada/grave)', 'Perda de peso', 'Higiene do sono'],
        farmacologico: ['Nao ha farmacoterapia de primeira linha']
      },
      redFlags: ['Sonolencia ao dirigir', 'HAS refrataria', 'Arritmias noturnas', 'Cor pulmonale'],
      metasTerapeuticas: ['IAH <5/h', 'Resolucao sintomas', 'PA controlada']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-30% adultos; 2-4% sintomaticos',
        faixaEtaria: 'Aumenta com idade; pico 40-60 anos',
        fatoresRisco: ['Obesidade (principal)', 'Sexo masculino', 'Circunferencia cervical >40cm', 'Anomalias craniofaciais'],
        citations: [{ refId: 'aasm-osa-guidelines-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Ronco', 'Apneias testemunhadas', 'Sonolencia diurna', 'Cefaleia matinal', 'Nocturia'],
        sinaisExameFisico: ['Obesidade', 'Retrognatia', 'Palato ogival', 'Hipertrofia tonsilas/uvula'],
        citations: [{ refId: 'aasm-osa-guidelines-2021' }]
      },
      diagnostico: {
        criterios: [
          'Polissonografia com IAH >=5 + sintomas',
          'OU IAH >=15 mesmo assintomatico',
          'Leve: IAH 5-14; Moderada: 15-29; Grave: >=30'
        ],
        diagnosticoDiferencial: ['Apneia central', 'Sindrome obesidade-hipoventilacao', 'Narcolepsia', 'Hipotireoidismo'],
        examesLaboratoriais: ['TSH', 'Glicemia', 'Perfil lipidico'],
        citations: [{ refId: 'aasm-osa-guidelines-2021' }]
      },
      tratamento: {
        objetivos: ['Eliminar apneias', 'Melhorar sono e qualidade de vida', 'Reduzir risco cardiovascular'],
        naoFarmacologico: {
          medidas: ['CPAP/BiPAP - tratamento padrao', 'Perda de peso 10-15%', 'Evitar alcool/sedativos', 'Dispositivo de avanco mandibular (leve)'],
          citations: [{ refId: 'aasm-osa-guidelines-2021' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Nenhum farmaco aprovado', medicamentos: ['N/A'], observacoes: 'Tratamento e principalmente nao-farmacologico' }
          ],
          citations: [{ refId: 'aasm-osa-guidelines-2021' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal inicio CPAP; trimestral depois',
        examesControle: ['Polissonografia com CPAP se duvida', 'Oximetria noturna'],
        metasTerapeuticas: ['IAH residual <5/h', 'Adesao CPAP >4h/noite', 'Escala Epworth <10'],
        criteriosEncaminhamento: ['Todos moderados/graves para pneumo/ORL', 'Avaliacao cirurgica se anatomia favoravel'],
        citations: [{ refId: 'aasm-osa-guidelines-2021' }]
      },
      prevencao: {
        primaria: ['Controle do peso', 'Evitar alcool noturno'],
        secundaria: ['Rastreamento em obesos, HAS, DM'],
        citations: [{ refId: 'aasm-osa-guidelines-2021' }]
      }
    },
    protocolos: ['apneia-sono-aps'],
    medicamentos: [],
    calculadoras: ['stop-bang', 'epworth'],
    citations: [{ refId: 'aasm-osa-guidelines-2021' }],
    lastUpdate: '2026-01',
    tags: ['apneia', 'sono', 'CPAP', 'ronco', 'obesidade']
  },

  // ============================================================================
  // NEURINOMA DO ACUSTICO / SCHWANNOMA VESTIBULAR
  // ============================================================================
  {
    id: 'schwannoma-vestibular',
    titulo: 'Schwannoma Vestibular',
    sinonimos: ['Neurinoma do acustico', 'Acoustic neuroma', 'Vestibular schwannoma'],
    doid: 'DOID:3628',
    snomedCT: '253133009',
    meshId: 'D009464',
    ciap2: ['H86', 'N74'],
    cid10: ['D33.3'],
    categoria: 'neurologico',
    subcategoria: 'otorrinolaringologia',
    quickView: {
      definicao: 'Tumor benigno das celulas de Schwann do nervo vestibulococlear (VIII). Crescimento lento no angulo pontocerebelar.',
      criteriosDiagnosticos: [
        'Perda auditiva neurossensorial unilateral assimetrica',
        'Zumbido unilateral',
        'RNM com massa no CAI/angulo pontocerebelar',
        'Instabilidade (tardia)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Observacao (pequenos)', 'Radiocirurgia estereotaxica', 'Microcirurgia'],
        farmacologico: ['Nao ha tratamento farmacologico']
      },
      redFlags: ['Crescimento rapido', 'Hidrocefalia', 'Paralisia facial', 'Sinais cerebelares'],
      metasTerapeuticas: ['Controle tumoral', 'Preservacao audicao/facial']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1/100.000/ano',
        faixaEtaria: '30-60 anos',
        fatoresRisco: ['Neurofibromatose tipo 2 (bilateral)', 'Radiacao previa'],
        citations: [{ refId: 'vestibular-schwannoma-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Perda auditiva unilateral progressiva', 'Zumbido', 'Desequilibrio', 'Cefaleia (grandes)'],
        sinaisExameFisico: ['Hipoacusia neurossensorial unilateral', 'Reflexo corneano diminuido (grandes)', 'Nistagmo'],
        citations: [{ refId: 'vestibular-schwannoma-2020' }]
      },
      diagnostico: {
        criterios: [
          'Perda auditiva assimetrica neurossensorial',
          'RNM com gadolinio: massa CAI/APC',
          'Exclusao de outras lesoes'
        ],
        diagnosticoDiferencial: ['Meningioma', 'Colesteatoma', 'Metastase', 'Cisto epidermoide'],
        examesLaboratoriais: ['Audiometria', 'Potencial evocado auditivo'],
        examesImagem: ['RNM com gadolinio (padrao-ouro)'],
        citations: [{ refId: 'vestibular-schwannoma-2020' }]
      },
      tratamento: {
        objetivos: ['Controle tumoral', 'Preservacao de funcao'],
        naoFarmacologico: {
          medidas: ['Observacao com RNM seriada (tumores pequenos)', 'Radiocirurgia (Gamma Knife)', 'Microcirurgia'],
          citations: [{ refId: 'vestibular-schwannoma-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Nenhum', medicamentos: ['N/A'], observacoes: 'Tratamento e cirurgico ou radiocirurgico' }
          ],
          citations: [{ refId: 'vestibular-schwannoma-2020' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semestral a anual',
        examesControle: ['RNM anual', 'Audiometria semestral'],
        metasTerapeuticas: ['Estabilidade tumoral', 'Funcao preservada'],
        criteriosEncaminhamento: ['Todos para neurocirurgia/ORL oncologica'],
        citations: [{ refId: 'vestibular-schwannoma-2020' }]
      },
      prevencao: {
        primaria: ['Nao ha'],
        secundaria: ['Rastreamento em NF2'],
        citations: [{ refId: 'vestibular-schwannoma-2020' }]
      }
    },
    protocolos: ['tumor-cerebral-encaminhamento'],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'vestibular-schwannoma-2020' }],
    lastUpdate: '2026-01',
    tags: ['schwannoma', 'neurinoma', 'acustico', 'tumor', 'surdez-unilateral']
  },

  // ============================================================================
  // LARINGOMALACIA
  // ============================================================================
  {
    id: 'laringomalacia',
    titulo: 'Laringomalacia',
    sinonimos: ['Laryngomalacia', 'Laringe flacida'],
    doid: 'DOID:0080205',
    snomedCT: '95436008',
    meshId: 'D055364',
    ciap2: ['R99'],
    cid10: ['Q31.5'],
    categoria: 'respiratorio',
    subcategoria: 'otorrinolaringologia',
    quickView: {
      definicao: 'Causa mais comum de estridor congenito. Colapso supraglotico inspiratorio por imaturidade das estruturas laringeas.',
      criteriosDiagnosticos: [
        'Estridor inspiratorio desde nascimento',
        'Piora com alimentacao/choro/decubito',
        'Melhora em prono',
        'Nasofibrolaringoscopia confirmatoria'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Observacao (90%)', 'Posicionamento em prono', 'Supraglotoplastia se grave'],
        farmacologico: ['Tratamento antiRGE se associado']
      },
      redFlags: ['Cianose', 'Apneia', 'Dificuldade alimentar grave', 'Falha de crescimento'],
      metasTerapeuticas: ['Resolucao espontanea', 'Ganho ponderal adequado']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '60-70% dos estridores congenitos',
        faixaEtaria: 'Neonatos; pico sintomas 4-8 meses; resolucao 12-24 meses',
        fatoresRisco: ['Prematuridade', 'Doenca neurologica', 'RGE'],
        citations: [{ refId: 'laryngomalacia-pediatrics-2019' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Estridor inspiratorio', 'Piora com alimentacao', 'Melhora em prono'],
        sinaisExameFisico: ['Estridor agudo inspiratorio', 'Retracao intercostal (grave)', 'Desenvolvimento normal (leve)'],
        formasClinicas: ['Leve (maioria)', 'Moderada', 'Grave (10-20%)'],
        citations: [{ refId: 'laryngomalacia-pediatrics-2019' }]
      },
      diagnostico: {
        criterios: [
          'Estridor inspiratorio congenito',
          'Nasofibrolaringoscopia: colapso supraglotico',
          'Exclusao de outras causas'
        ],
        diagnosticoDiferencial: ['Paralisia de prega vocal', 'Estenose subglotica', 'Hemangioma', 'Anel vascular'],
        examesImagem: ['Rx cervical lateral se duvida', 'TC/RNM se anomalia associada'],
        citations: [{ refId: 'laryngomalacia-pediatrics-2019' }]
      },
      tratamento: {
        objetivos: ['Observacao ate resolucao', 'Manter nutricao adequada', 'Cirurgia se grave'],
        naoFarmacologico: {
          medidas: ['Posicao prona/lateral ao alimentar', 'Fracionamento das mamadas', 'Supraglotoplastia (grave)'],
          citations: [{ refId: 'laryngomalacia-pediatrics-2019' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'IBP', medicamentos: ['Omeprazol', 'Lansoprazol'], observacoes: 'Se RGE associado' }
          ],
          citations: [{ refId: 'laryngomalacia-pediatrics-2019' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal nos primeiros meses; trimestral depois',
        examesControle: ['Peso/crescimento', 'Laringoscopia se persistente'],
        metasTerapeuticas: ['Ganho ponderal normal', 'Resolucao do estridor'],
        criteriosEncaminhamento: ['Grave ou sem melhora', 'Avaliacao cirurgica'],
        citations: [{ refId: 'laryngomalacia-pediatrics-2019' }]
      },
      prevencao: {
        primaria: ['Nao ha'],
        secundaria: ['Identificacao precoce de casos graves'],
        citations: [{ refId: 'laryngomalacia-pediatrics-2019' }]
      }
    },
    protocolos: ['estridor-pediatrico'],
    medicamentos: ['omeprazol'],
    calculadoras: [],
    citations: [{ refId: 'laryngomalacia-pediatrics-2019' }],
    lastUpdate: '2026-01',
    tags: ['laringomalacia', 'estridor', 'congenito', 'pediatrico']
  },

  // ============================================================================
  // ESTENOSE SUBGLOTICA
  // ============================================================================
  {
    id: 'estenose-subglotica',
    titulo: 'Estenose Subglotica',
    sinonimos: ['Subglottic stenosis', 'Estenose laringea'],
    doid: 'DOID:0080200',
    snomedCT: '23181003',
    meshId: 'D007829',
    ciap2: ['R99'],
    cid10: ['J38.6', 'Q31.1'],
    categoria: 'respiratorio',
    subcategoria: 'otorrinolaringologia',
    quickView: {
      definicao: 'Estreitamento da via aerea subglotica. Congenita ou adquirida (pos-intubacao principal causa). Pode ser fatal.',
      criteriosDiagnosticos: [
        'Estridor bifasico',
        'Historia de intubacao prolongada (adquirida)',
        'Laringotraqueoscopia com estenose',
        'Grau I-IV pela classificacao de Myer-Cotton'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dilatacao endoscopica', 'Reconstrucao laringotraqueal', 'Traqueostomia (grave)'],
        farmacologico: ['Corticoides topicos/sistemicos perioperatorios']
      },
      redFlags: ['Estridor em repouso', 'Tiragem importante', 'Cianose', 'Falha de extubacao repetida'],
      metasTerapeuticas: ['Via aerea patente', 'Decanulacao se traqueostomia']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-8% pos-intubacao prolongada',
        faixaEtaria: 'Neonatos (congenita); qualquer idade (adquirida)',
        fatoresRisco: ['Intubacao >7 dias', 'Tubo superdimensionado', 'RGE', 'Prematuridade'],
        citations: [{ refId: 'subglottic-stenosis-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Estridor bifasico', 'Dispneia', 'Intolerancia a exercicio', 'Crupe recorrente'],
        sinaisExameFisico: ['Estridor', 'Tiragem', 'Uso musculatura acessoria', 'Voz normal'],
        formasClinicas: ['Congenita (rara)', 'Adquirida (mais comum)'],
        citations: [{ refId: 'subglottic-stenosis-2020' }]
      },
      diagnostico: {
        criterios: [
          'Estridor bifasico ou dispneia',
          'Laringotraqueoscopia: estenose subglotica',
          'Classificacao de Myer-Cotton: I (<50%), II (51-70%), III (71-99%), IV (sem lumen)'
        ],
        diagnosticoDiferencial: ['Laringomalacia', 'Paralisia de prega vocal', 'Hemangioma', 'Corpo estranho'],
        examesImagem: ['Rx cervical AP (sinal do campanario)', 'TC cervical 3D'],
        citations: [{ refId: 'subglottic-stenosis-2020' }]
      },
      tratamento: {
        objetivos: ['Via aerea patente', 'Evitar traqueostomia', 'Qualidade de vida'],
        naoFarmacologico: {
          medidas: ['Dilatacao com balao', 'Laser', 'Reconstrucao laringotraqueal', 'Traqueostomia (grave)'],
          citations: [{ refId: 'subglottic-stenosis-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide', medicamentos: ['Dexametasona', 'Triancinolona'], observacoes: 'Topico intraoperatorio ou sistemico' }
          ],
          situacoesEspeciais: [
            { situacao: 'Mitomicina C', conduta: 'Aplicacao topica pos-dilatacao para prevenir reestenose' }
          ],
          citations: [{ refId: 'subglottic-stenosis-2020' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal pos-op; mensal depois',
        examesControle: ['Laringoscopia de controle', 'Espirometria'],
        metasTerapeuticas: ['Via aerea patente', 'Decanulacao'],
        criteriosEncaminhamento: ['Todos para ORL/cirurgia pediatrica'],
        citations: [{ refId: 'subglottic-stenosis-2020' }]
      },
      prevencao: {
        primaria: ['Intubacao com tubo adequado', 'Minimizar tempo de intubacao'],
        secundaria: ['Vigilancia pos-extubacao'],
        citations: [{ refId: 'subglottic-stenosis-2020' }]
      }
    },
    protocolos: ['via-aerea-dificil'],
    medicamentos: ['dexametasona'],
    calculadoras: ['myer-cotton'],
    citations: [{ refId: 'subglottic-stenosis-2020' }],
    lastUpdate: '2026-01',
    tags: ['estenose', 'subglotica', 'estridor', 'pos-intubacao', 'pediatrico']
  }
];
