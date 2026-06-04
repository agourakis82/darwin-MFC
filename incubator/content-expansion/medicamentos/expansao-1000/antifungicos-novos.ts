/**
 * ANTIFUNGICOS NOVOS - DARWIN-MFC EXPANSAO 1000
 * =============================================
 * Antifungicos sistemicos e topicos para APS e ambiente hospitalar
 *
 * Referencias:
 * - IDSA Guidelines for Candidiasis (2024)
 * - IDSA Guidelines for Aspergillosis (2024)
 * - RENAME 2024
 * - Uptodate Drug Information
 * - Micromedex
 */

import { Medicamento } from '@/lib/types/medicamento';

export const antifungicosNovos: Medicamento[] = [
  // ==================== AZOIS SISTEMICOS ====================

  // 1. FLUCONAZOL
  {
    id: 'fluconazol',
    nomeGenerico: 'Fluconazol',
    nomesComerciais: ['Diflucan', 'Zoltec', 'Fluconal'],
    atcCode: 'J02AC01',
    rxNormCui: '4450',
    drugBankId: 'DB00196',
    snomedCT: '387174006',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '50mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '2mg/ml (100ml)', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '2mg/ml (200ml)', disponivelSUS: true }
    ],
    indicacoes: [
      'Candidíase orofaríngea e esofágica',
      'Candidíase vaginal',
      'Candidíase invasiva/candidemia',
      'Meningite criptocócica (manutencao)',
      'Profilaxia antifúngica em imunossuprimidos',
      'Dermatomicoses (tinea corporis, cruris, pedis)',
      'Onicomicose'
    ],
    mecanismoAcao: 'Inibe a enzima lanosterol 14-alfa-desmetilase (CYP51) fúngica, bloqueando a síntese de ergosterol na membrana celular fúngica, causando instabilidade e morte celular.',
    posologias: [
      {
        indicacao: 'Candidíase orofaríngea',
        adultos: {
          dose: '200mg D1, depois 100-200mg/dia',
          frequencia: '1x/dia por 7-14 dias',
          doseMaxima: '400mg/dia'
        },
        pediatrico: {
          dose: '6mg/kg D1, depois 3mg/kg/dia',
          frequencia: '1x/dia',
          idadeMinima: 'Neonatos'
        }
      },
      {
        indicacao: 'Candidíase vaginal (dose única)',
        adultos: {
          dose: '150mg',
          frequencia: 'Dose única',
          observacoes: 'Recorrente: 150mg/semana por 6 meses'
        }
      },
      {
        indicacao: 'Candidemia/Candidíase invasiva',
        adultos: {
          dose: '800mg D1, depois 400mg/dia',
          frequencia: '1x/dia por 14 dias após última hemocultura negativa',
          observacoes: 'Apenas para Candida sensível (C. albicans, C. parapsilosis)'
        }
      },
      {
        indicacao: 'Meningite criptocócica (manutenção)',
        adultos: {
          dose: '200-400mg',
          frequencia: '1x/dia por pelo menos 1 ano em HIV',
          observacoes: 'Após indução com anfotericina B'
        }
      },
      {
        indicacao: 'Profilaxia em transplante',
        adultos: {
          dose: '400mg',
          frequencia: '1x/dia'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao fluconazol ou outros azóis',
      'Uso concomitante de terfenadina (doses >400mg)',
      'Uso com cisaprida, astemizol, pimozida, quinidina, eritromicina'
    ],
    precaucoes: [
      'Hepatotoxicidade - monitorar enzimas hepáticas',
      'Prolongamento QT - cautela com outros fármacos que prolongam QT',
      'Interações CYP2C9, CYP2C19, CYP3A4',
      'Reações cutâneas graves (Stevens-Johnson) raras'
    ],
    efeitosAdversos: {
      comuns: [
        'Náusea',
        'Cefaleia',
        'Dor abdominal',
        'Diarreia',
        'Rash cutâneo',
        'Elevação de transaminases'
      ],
      graves: [
        'Hepatotoxicidade',
        'Síndrome de Stevens-Johnson',
        'Necrólise epidérmica tóxica',
        'Prolongamento QT/Torsades de pointes',
        'Anafilaxia'
      ]
    },
    interacoes: [
      {
        medicamento: 'Warfarina',
        gravidade: 'grave',
        efeito: 'Aumento INR - risco de sangramento',
        mecanismo: 'Inibição CYP2C9',
        conduta: 'Monitorar INR frequentemente, reduzir dose warfarina'
      },
      {
        medicamento: 'Fenitoína',
        gravidade: 'grave',
        efeito: 'Aumenta níveis de fenitoína',
        conduta: 'Monitorar níveis de fenitoína'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'grave',
        efeito: 'Aumenta níveis de ciclosporina',
        conduta: 'Monitorar níveis, reduzir dose ciclosporina'
      },
      {
        medicamento: 'Tacrolimus',
        gravidade: 'grave',
        efeito: 'Aumenta níveis de tacrolimus',
        conduta: 'Monitorar níveis, ajustar dose'
      },
      {
        medicamento: 'Rifampicina',
        gravidade: 'grave',
        efeito: 'Reduz níveis de fluconazol em 50%',
        conduta: 'Aumentar dose de fluconazol se necessário'
      },
      {
        medicamento: 'Sinvastatina/Atorvastatina',
        gravidade: 'grave',
        efeito: 'Risco de rabdomiólise',
        conduta: 'Evitar ou usar dose mínima de estatina'
      },
      {
        medicamento: 'Midazolam/Triazolam',
        gravidade: 'grave',
        efeito: 'Sedação prolongada',
        conduta: 'Reduzir dose de benzodiazepínico'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Dose normal' },
      { tfg: '21-50', ajuste: 'Reduzir dose em 50%' },
      { tfg: '11-20', ajuste: 'Reduzir dose em 50%' },
      { tfg: '<11', ajuste: 'Reduzir dose em 50-75%, dar após diálise' }
    ],
    gestacao: 'D',
    amamentacao: {
      compativel: true,
      observacao: 'Compatível em dose única de 150mg. Uso prolongado: avaliar risco-benefício.'
    },
    monitorizacao: [
      'Função hepática (ALT, AST) antes e durante tratamento',
      'Função renal',
      'Eletrólitos (potássio)',
      'ECG se uso de outros fármacos que prolongam QT'
    ],
    orientacoesPaciente: [
      'Pode tomar com ou sem alimentos',
      'Completar todo o tratamento prescrito',
      'Relatar icterícia, urina escura ou fezes claras',
      'Informar todos os medicamentos em uso'
    ],
    consideracoesEspeciais: {
      idosos: 'Ajustar pela função renal',
      hepatopatas: 'Usar com cautela, monitorar função hepática',
      pediatrico: 'Seguro em neonatos com ajuste de dose'
    },
    doencasRelacionadas: ['candidiase', 'criptococose', 'dermatomicose', 'onicomicose'],
    calculadoras: ['ckd-epi'],
    citations: [],
    lastUpdate: '2024-12-01',
    tags: ['antifungico', 'azol', 'candida', 'criptococo', 'sistemico', 'rename']
  },

  // 2. ITRACONAZOL
  {
    id: 'itraconazol',
    nomeGenerico: 'Itraconazol',
    nomesComerciais: ['Sporanox', 'Itranax', 'Traconal'],
    atcCode: 'J02AC02',
    rxNormCui: '28031',
    drugBankId: 'DB01167',
    snomedCT: '387532006',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '10mg/ml', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '10mg/ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Aspergilose invasiva (alternativa)',
      'Histoplasmose',
      'Blastomicose',
      'Esporotricose',
      'Paracoccidioidomicose',
      'Onicomicose',
      'Dermatomicoses',
      'Candidíase orofaríngea/esofágica'
    ],
    mecanismoAcao: 'Triazol de amplo espectro que inibe a lanosterol 14-alfa-desmetilase fúngica, bloqueando síntese de ergosterol. Maior espectro que fluconazol incluindo fungos filamentosos.',
    posologias: [
      {
        indicacao: 'Histoplasmose leve-moderada',
        adultos: {
          dose: '200mg',
          frequencia: '3x/dia por 3 dias, depois 200mg 1-2x/dia',
          observacoes: 'Duração: 6-12 semanas. Tomar com refeição gordurosa (cápsula).'
        }
      },
      {
        indicacao: 'Aspergilose (alternativa)',
        adultos: {
          dose: '200mg',
          frequencia: '12/12h por 3 dias, depois 200-400mg/dia',
          observacoes: 'Voriconazol preferido para aspergilose invasiva'
        }
      },
      {
        indicacao: 'Paracoccidioidomicose',
        adultos: {
          dose: '200mg',
          frequencia: '1x/dia por 6-12 meses'
        }
      },
      {
        indicacao: 'Onicomicose (pulsoterapia)',
        adultos: {
          dose: '200mg',
          frequencia: '12/12h por 1 semana/mês por 2-3 pulsos',
          observacoes: 'Unhas mãos: 2 pulsos. Unhas pés: 3 pulsos.'
        }
      },
      {
        indicacao: 'Esporotricose cutânea',
        adultos: {
          dose: '200mg',
          frequencia: '1x/dia por 3-6 meses até resolução'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao itraconazol ou outros azóis',
      'ICC ou história de ICC (efeito inotrópico negativo)',
      'Uso concomitante de terfenadina, astemizol, cisaprida, pimozida, quinidina, dofetilida',
      'Uso com alcalóides do ergot',
      'Uso com sinvastatina, lovastatina',
      'Gestação (exceto micoses com risco de vida)'
    ],
    precaucoes: [
      'Efeito inotrópico negativo - evitar em ICC',
      'Hepatotoxicidade - monitorar função hepática',
      'Absorção da cápsula requer acidez gástrica',
      'Neuropatia com uso prolongado',
      'Múltiplas interações via CYP3A4'
    ],
    efeitosAdversos: {
      comuns: [
        'Náusea',
        'Diarreia',
        'Dor abdominal',
        'Rash',
        'Cefaleia',
        'Elevação de transaminases'
      ],
      graves: [
        'ICC/Edema pulmonar',
        'Hepatotoxicidade grave',
        'Neuropatia periférica',
        'Síndrome de Stevens-Johnson',
        'Hipocalemia'
      ]
    },
    interacoes: [
      {
        medicamento: 'IBPs/Antiácidos/Anti-H2',
        gravidade: 'grave',
        efeito: 'Reduz absorção das cápsulas drasticamente',
        conduta: 'Usar solução oral se necessário IBP, ou dar cápsula com bebida ácida (coca-cola)'
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'grave',
        efeito: 'Aumenta níveis de digoxina (inibição P-gp)',
        conduta: 'Monitorar digoxinemia, reduzir dose 50%'
      },
      {
        medicamento: 'Sinvastatina/Lovastatina',
        gravidade: 'contraindicada',
        efeito: 'Rabdomiólise',
        conduta: 'Contraindicado - usar estatina alternativa'
      },
      {
        medicamento: 'Ciclosporina/Tacrolimus',
        gravidade: 'grave',
        efeito: 'Aumenta níveis de imunossupressores',
        conduta: 'Reduzir dose em 50%, monitorar níveis'
      },
      {
        medicamento: 'Midazolam/Alprazolam',
        gravidade: 'grave',
        efeito: 'Sedação prolongada',
        conduta: 'Evitar ou usar dose mínima'
      },
      {
        medicamento: 'Rifampicina',
        gravidade: 'grave',
        efeito: 'Reduz níveis de itraconazol >90%',
        conduta: 'Evitar combinação - usar outro antifúngico'
      },
      {
        medicamento: 'Bloqueadores de canal de cálcio',
        gravidade: 'grave',
        efeito: 'Aumenta níveis dos BCC - edema, ICC',
        conduta: 'Monitorar e ajustar dose'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste para cápsula oral' },
      { tfg: '<30', ajuste: 'Evitar formulação IV (acúmulo de ciclodextrina)' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Excretado no leite. Evitar durante amamentação.'
    },
    monitorizacao: [
      'Função hepática antes e durante tratamento',
      'Sinais de ICC (dispneia, edema)',
      'Níveis séricos se tratamento >14 dias ou falta de resposta',
      'Função cardíaca se uso prolongado'
    ],
    orientacoesPaciente: [
      'Cápsulas: tomar DURANTE refeição gordurosa',
      'Solução oral: tomar em JEJUM',
      'Evitar antiácidos 2h antes e depois',
      'Relatar falta de ar, inchaço nas pernas',
      'Completar tratamento completo'
    ],
    consideracoesEspeciais: {
      idosos: 'Cautela por risco de ICC',
      hepatopatas: 'Monitorar função hepática rigorosamente',
      pediatrico: 'Dados limitados, usar quando alternativas inadequadas'
    },
    doencasRelacionadas: ['histoplasmose', 'aspergilose', 'paracoccidioidomicose', 'esporotricose', 'onicomicose'],
    calculadoras: ['ckd-epi'],
    citations: [],
    lastUpdate: '2024-12-01',
    tags: ['antifungico', 'azol', 'triazol', 'fungos-filamentosos', 'histoplasma', 'rename']
  },

  // 3. VORICONAZOL
  {
    id: 'voriconazol',
    nomeGenerico: 'Voriconazol',
    nomesComerciais: ['Vfend'],
    atcCode: 'J02AC03',
    rxNormCui: '121243',
    drugBankId: 'DB00582',
    snomedCT: '385469007',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '200mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '40mg/ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Aspergilose invasiva (primeira linha)',
      'Candidemia (alternativa ao fluconazol)',
      'Fusariose',
      'Scedosporiose',
      'Infecções por fungos dematiáceos',
      'Profilaxia em transplante de medula'
    ],
    mecanismoAcao: 'Triazol de segunda geração com amplo espectro. Inibe CYP51 fúngica (lanosterol 14-alfa-desmetilase), bloqueando síntese de ergosterol. Atividade contra Aspergillus, Fusarium, Scedosporium.',
    posologias: [
      {
        indicacao: 'Aspergilose invasiva',
        adultos: {
          dose: '6mg/kg IV 12/12h D1, depois 4mg/kg IV 12/12h',
          frequencia: '12/12h',
          observacoes: 'Transição para VO quando estável: 200-300mg 12/12h'
        },
        pediatrico: {
          dose: '9mg/kg IV 12/12h D1, depois 8mg/kg IV 12/12h',
          frequencia: '12/12h',
          idadeMinima: '2 anos',
          observacoes: 'Crianças metabolizam mais rápido'
        }
      },
      {
        indicacao: 'Candidemia (step-down ou alternativa)',
        adultos: {
          dose: '200-300mg',
          frequencia: '12/12h VO'
        }
      },
      {
        indicacao: 'Profilaxia em TCTH',
        adultos: {
          dose: '200mg',
          frequencia: '12/12h'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao voriconazol',
      'Uso com rifampicina, carbamazepina, fenitoína, barbitúricos de longa ação',
      'Uso com sirolimus, alcalóides do ergot, pimozida, quinidina',
      'Uso com ritonavir (>400mg 12/12h), efavirenz, rifabutina',
      'Uso com Erva de São João',
      'Uso com sinvastatina, lovastatina'
    ],
    precaucoes: [
      'Fotossensibilidade grave - evitar exposição solar',
      'Risco de carcinoma espinocelular com uso prolongado',
      'Hepatotoxicidade',
      'Distúrbios visuais (30%) - transitórios',
      'Alucinações/confusão mental',
      'Polimorfismo CYP2C19 afeta metabolismo',
      'Fluoreto da molécula pode causar periostite'
    ],
    efeitosAdversos: {
      comuns: [
        'Distúrbios visuais (fotopsia, visão borrada)',
        'Rash/Fotossensibilidade',
        'Elevação de transaminases',
        'Cefaleia',
        'Náusea',
        'Febre'
      ],
      graves: [
        'Hepatotoxicidade grave',
        'Carcinoma espinocelular (uso prolongado)',
        'Periostite fluorótica',
        'Alucinações',
        'Prolongamento QT',
        'Síndrome de Stevens-Johnson'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz níveis de voriconazol em >90%',
        conduta: 'Contraindicado'
      },
      {
        medicamento: 'Fenitoína',
        gravidade: 'contraindicada',
        efeito: 'Reduz voriconazol, aumenta fenitoína',
        conduta: 'Evitar, se necessário: dobrar dose voriconazol, monitorar fenitoína'
      },
      {
        medicamento: 'Sirolimus',
        gravidade: 'contraindicada',
        efeito: 'Aumenta sirolimus em 11x',
        conduta: 'Contraindicado'
      },
      {
        medicamento: 'Tacrolimus',
        gravidade: 'grave',
        efeito: 'Aumenta tacrolimus em 3x',
        conduta: 'Reduzir dose de tacrolimus 66%, monitorar níveis'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'grave',
        efeito: 'Aumenta ciclosporina em 2x',
        conduta: 'Reduzir dose 50%, monitorar níveis'
      },
      {
        medicamento: 'Warfarina',
        gravidade: 'grave',
        efeito: 'Aumenta INR significativamente',
        conduta: 'Monitorar INR frequentemente'
      },
      {
        medicamento: 'Omeprazol',
        gravidade: 'moderada',
        efeito: 'Aumenta níveis de voriconazol',
        conduta: 'Reduzir dose de omeprazol 50%'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '<50', ajuste: 'Evitar IV (acúmulo de ciclodextrina). VO sem ajuste.' }
    ],
    gestacao: 'D',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar.'
    },
    monitorizacao: [
      'Níveis séricos (vale: 1-5.5 mcg/ml)',
      'Função hepática semanal inicial',
      'Função visual antes e durante',
      'Exame dermatológico se uso >6 meses (risco CA)',
      'Fluoreto sérico se uso prolongado'
    ],
    orientacoesPaciente: [
      'EVITAR exposição solar - usar protetor solar FPS 50+',
      'Comprimidos: tomar 1h antes ou após refeições',
      'Distúrbios visuais são comuns e geralmente transitórios',
      'Não dirigir se visão alterada',
      'Relatar confusão mental ou alucinações'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste específico',
      hepatopatas: 'Child-Pugh A/B: metade da dose de manutenção. Child-Pugh C: evitar.',
      pediatrico: 'Doses maiores por kg que adultos'
    },
    doencasRelacionadas: ['aspergilose', 'fusariose', 'scedosporiose', 'candidemia'],
    calculadoras: ['ckd-epi'],
    citations: [],
    lastUpdate: '2024-12-01',
    tags: ['antifungico', 'azol', 'triazol', 'aspergillus', 'fusarium', 'primeira-linha', 'rename']
  },

  // 4. POSACONAZOL
  {
    id: 'posaconazol',
    nomeGenerico: 'Posaconazol',
    nomesComerciais: ['Noxafil'],
    atcCode: 'J02AC04',
    rxNormCui: '282446',
    drugBankId: 'DB01263',
    snomedCT: '421747003',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg (liberação retardada)', disponivelSUS: false },
      { forma: 'suspensao_oral', concentracao: '40mg/ml', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '18mg/ml (300mg)', disponivelSUS: false }
    ],
    indicacoes: [
      'Profilaxia de infecções fúngicas invasivas em pacientes de alto risco',
      'Aspergilose invasiva refratária ou intolerância a outras terapias',
      'Fusariose refratária',
      'Mucormicose (zigomicose) - adjuvante',
      'Cromoblastomicose',
      'Coccidioidomicose'
    ],
    mecanismoAcao: 'Triazol de amplo espectro estruturalmente relacionado ao itraconazol. Inibe lanosterol 14-alfa-desmetilase. Único azol com atividade contra Mucorales (zigomicetos).',
    posologias: [
      {
        indicacao: 'Profilaxia em neutropenia/TCTH',
        adultos: {
          dose: 'Comprimidos: 300mg 12/12h D1, depois 300mg/dia',
          frequencia: '1x/dia',
          observacoes: 'Suspensão: 200mg 8/8h com refeição gordurosa'
        }
      },
      {
        indicacao: 'Aspergilose refratária',
        adultos: {
          dose: 'IV: 300mg 12/12h D1, depois 300mg/dia',
          frequencia: '1x/dia',
          observacoes: 'Transição para VO (comprimidos) quando possível'
        }
      },
      {
        indicacao: 'Mucormicose (adjuvante)',
        adultos: {
          dose: '300mg',
          frequencia: '1x/dia (após loading)',
          observacoes: 'Usar junto com anfotericina B. Considerar para manutenção/step-down.'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao posaconazol ou outros azóis',
      'Uso com sirolimus, alcalóides do ergot, pimozida, quinidina',
      'Uso com sinvastatina, lovastatina, atorvastatina'
    ],
    precaucoes: [
      'Absorção da suspensão altamente dependente de alimentos gordurosos',
      'Comprimidos têm absorção mais previsível',
      'Prolongamento QT',
      'Hepatotoxicidade',
      'Múltiplas interações CYP3A4'
    ],
    efeitosAdversos: {
      comuns: [
        'Náusea',
        'Diarreia',
        'Febre',
        'Cefaleia',
        'Elevação de transaminases',
        'Hipocalemia'
      ],
      graves: [
        'Hepatotoxicidade',
        'Prolongamento QT',
        'Insuficiência adrenal (supressão cortisol)',
        'Síndrome de Stevens-Johnson'
      ]
    },
    interacoes: [
      {
        medicamento: 'Sirolimus',
        gravidade: 'contraindicada',
        efeito: 'Aumenta sirolimus em 9x',
        conduta: 'Contraindicado'
      },
      {
        medicamento: 'Tacrolimus',
        gravidade: 'grave',
        efeito: 'Aumenta tacrolimus em 4x',
        conduta: 'Reduzir dose 66%, monitorar níveis'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'grave',
        efeito: 'Aumenta ciclosporina',
        conduta: 'Reduzir dose 25%, monitorar níveis'
      },
      {
        medicamento: 'Rifabutina',
        gravidade: 'grave',
        efeito: 'Reduz posaconazol, aumenta rifabutina',
        conduta: 'Evitar combinação'
      },
      {
        medicamento: 'Fenitoína',
        gravidade: 'grave',
        efeito: 'Reduz posaconazol, aumenta fenitoína',
        conduta: 'Evitar, monitorar níveis de ambos'
      },
      {
        medicamento: 'Midazolam IV',
        gravidade: 'grave',
        efeito: 'Aumenta midazolam em 5x',
        conduta: 'Reduzir dose, monitorar sedação'
      },
      {
        medicamento: 'Vincristina',
        gravidade: 'grave',
        efeito: 'Aumenta neurotoxicidade da vincristina',
        conduta: 'Considerar ajuste de vincristina'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '<50', ajuste: 'Evitar IV (acúmulo de ciclodextrina). VO sem ajuste.' }
    ],
    gestacao: 'D',
    amamentacao: {
      compativel: false,
      observacao: 'Excretado no leite. Evitar.'
    },
    monitorizacao: [
      'Níveis séricos (vale >0.7 mcg/ml para profilaxia, >1.0 para tratamento)',
      'Função hepática',
      'Eletrólitos (K, Mg)',
      'ECG se uso de outros fármacos que prolongam QT',
      'Níveis de imunossupressores'
    ],
    orientacoesPaciente: [
      'Comprimidos: podem ser tomados com ou sem alimentos',
      'Suspensão: SEMPRE com refeição gordurosa ou suplemento nutricional',
      'Evitar antiácidos se possível',
      'Relatar palpitações, tontura'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste específico',
      hepatopatas: 'Usar com cautela, monitorar função hepática',
      pediatrico: 'Comprimidos aprovados >13 anos, suspensão sem dados robustos'
    },
    doencasRelacionadas: ['aspergilose', 'mucormicose', 'fusariose', 'profilaxia-antifungica'],
    calculadoras: ['ckd-epi'],
    citations: [],
    lastUpdate: '2024-12-01',
    tags: ['antifungico', 'azol', 'triazol', 'aspergillus', 'mucor', 'profilaxia', 'amplo-espectro']
  },

  // 5. ISAVUCONAZOL
  {
    id: 'isavuconazol',
    nomeGenerico: 'Isavuconazol',
    nomesComerciais: ['Cresemba'],
    atcCode: 'J02AC05',
    rxNormCui: '1721469',
    drugBankId: 'DB06636',
    snomedCT: '713355007',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg (isavuconazônio)', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '200mg (isavuconazônio)', disponivelSUS: false }
    ],
    indicacoes: [
      'Aspergilose invasiva',
      'Mucormicose (zigomicose) invasiva',
      'Alternativa a voriconazol com melhor tolerabilidade'
    ],
    mecanismoAcao: 'Pró-droga (isavuconazônio sulfato) rapidamente convertida em isavuconazol, que inibe lanosterol 14-alfa-desmetilase fúngica. Triazol de última geração com atividade contra Aspergillus e Mucorales.',
    posologias: [
      {
        indicacao: 'Aspergilose invasiva',
        adultos: {
          dose: '200mg 8/8h por 6 doses (loading), depois 200mg/dia',
          frequencia: '1x/dia (manutenção)',
          observacoes: 'IV ou VO têm biodisponibilidade equivalente'
        }
      },
      {
        indicacao: 'Mucormicose',
        adultos: {
          dose: '200mg 8/8h por 6 doses (loading), depois 200mg/dia',
          frequencia: '1x/dia',
          observacoes: 'Pode ser usado como step-down após anfotericina B'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao isavuconazol',
      'Síndrome do QT curto familiar',
      'Uso com indutores fortes CYP3A4 (rifampicina, carbamazepina, ritonavir >200mg 12/12h)',
      'Uso com cetoconazol em altas doses'
    ],
    precaucoes: [
      'ENCURTA intervalo QT (oposto de outros azóis)',
      'Cautela em síndrome de QT curto',
      'Hepatotoxicidade',
      'Reações de infusão',
      'Menos fotossensibilidade que voriconazol'
    ],
    efeitosAdversos: {
      comuns: [
        'Náusea',
        'Vômitos',
        'Diarreia',
        'Cefaleia',
        'Elevação de transaminases',
        'Hipocalemia'
      ],
      graves: [
        'Hepatotoxicidade',
        'Encurtamento QT',
        'Reações de infusão',
        'Insuficiência hepática'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz isavuconazol em >90%',
        conduta: 'Contraindicado'
      },
      {
        medicamento: 'Lopinavir/Ritonavir',
        gravidade: 'grave',
        efeito: 'Aumenta isavuconazol em 5x',
        conduta: 'Evitar combinação'
      },
      {
        medicamento: 'Tacrolimus',
        gravidade: 'grave',
        efeito: 'Aumenta tacrolimus em 2x',
        conduta: 'Monitorar níveis, reduzir dose tacrolimus'
      },
      {
        medicamento: 'Sirolimus',
        gravidade: 'grave',
        efeito: 'Aumenta sirolimus em 2x',
        conduta: 'Monitorar níveis, ajustar dose'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'moderada',
        efeito: 'Aumenta ciclosporina em 29%',
        conduta: 'Monitorar níveis'
      },
      {
        medicamento: 'Bupropiona',
        gravidade: 'moderada',
        efeito: 'Reduz níveis de bupropiona',
        conduta: 'Pode necessitar aumento de dose'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'VO: sem ajuste. IV: usar com cautela.' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar.'
    },
    monitorizacao: [
      'Função hepática',
      'Níveis de imunossupressores',
      'ECG (encurtamento QT)',
      'Níveis séricos disponíveis mas não rotineiramente necessários'
    ],
    orientacoesPaciente: [
      'Cápsulas: podem ser tomadas com ou sem alimentos',
      'Não abrir, esmagar ou mastigar as cápsulas',
      'Completar tratamento conforme orientado',
      'Relatar sintomas de reação alérgica'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessário',
      hepatopatas: 'Child-Pugh A/B: sem ajuste. Child-Pugh C: não recomendado.',
      pediatrico: 'Não aprovado para <18 anos'
    },
    doencasRelacionadas: ['aspergilose', 'mucormicose'],
    calculadoras: ['ckd-epi'],
    citations: [],
    lastUpdate: '2024-12-01',
    tags: ['antifungico', 'azol', 'triazol', 'aspergillus', 'mucor', 'nova-geracao']
  },

  // ==================== POLIENOS ====================

  // 6. ANFOTERICINA B LIPOSSOMAL
  {
    id: 'anfotericina-b-lipossomal',
    nomeGenerico: 'Anfotericina B lipossomal',
    nomesComerciais: ['AmBisome'],
    atcCode: 'J02AA01',
    rxNormCui: '77482',
    drugBankId: 'DB00681',
    snomedCT: '96034006',
    classeTerapeutica: 'antifungico',
    subclasse: 'polieno',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg (liofilizado)', disponivelSUS: true }
    ],
    indicacoes: [
      'Micoses sistêmicas graves (primeira linha em pacientes de risco)',
      'Aspergilose invasiva (alternativa)',
      'Candidemia/Candidíase invasiva',
      'Criptococose meníngea (indução)',
      'Mucormicose (primeira linha)',
      'Histoplasmose grave',
      'Leishmaniose visceral',
      'Infecções fúngicas em pacientes com insuficiência renal'
    ],
    mecanismoAcao: 'Liga-se ao ergosterol da membrana fúngica, formando poros que causam extravasamento de conteúdo intracelular e morte celular. Formulação lipossomal reduz nefrotoxicidade mantendo eficácia.',
    posologias: [
      {
        indicacao: 'Candidíase invasiva/Candidemia',
        adultos: {
          dose: '3mg/kg',
          frequencia: '1x/dia IV',
          observacoes: 'Infusão em 2h'
        }
      },
      {
        indicacao: 'Aspergilose invasiva',
        adultos: {
          dose: '3-5mg/kg',
          frequencia: '1x/dia IV',
          observacoes: 'Voriconazol é primeira linha, AmBisome se contraindicação'
        }
      },
      {
        indicacao: 'Mucormicose',
        adultos: {
          dose: '5-10mg/kg',
          frequencia: '1x/dia IV',
          doseMaxima: '10mg/kg/dia',
          observacoes: 'Doses altas (5-10mg/kg) na mucormicose'
        }
      },
      {
        indicacao: 'Meningite criptocócica (indução)',
        adultos: {
          dose: '3-4mg/kg + flucitosina',
          frequencia: '1x/dia por 2 semanas',
          observacoes: 'Seguido de fluconazol para consolidação'
        }
      },
      {
        indicacao: 'Leishmaniose visceral',
        adultos: {
          dose: '3mg/kg D1-5, D14, D21 (total 21mg/kg)',
          frequencia: 'Esquema intermitente',
          observacoes: 'Alternativa: 3mg/kg/dia D1-7'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a anfotericina B ou componentes',
      'Insuficiência renal grave sem possibilidade de monitoramento'
    ],
    precaucoes: [
      'Nefrotoxicidade (menos que forma convencional, mas ainda presente)',
      'Hipocalemia, hipomagnesemia',
      'Reações de infusão (febre, calafrios)',
      'Anemia (supressão medular)',
      'Não misturar com soluções salinas'
    ],
    efeitosAdversos: {
      comuns: [
        'Febre',
        'Calafrios',
        'Náusea',
        'Cefaleia',
        'Hipocalemia',
        'Elevação de creatinina'
      ],
      graves: [
        'Insuficiência renal',
        'Hipocalemia grave',
        'Hipomagnesemia',
        'Anemia',
        'Reações anafilactoides',
        'Arritmias (por distúrbios eletrolíticos)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Outros nefrotóxicos (aminoglicosídeos, vancomicina)',
        gravidade: 'grave',
        efeito: 'Nefrotoxicidade aditiva',
        conduta: 'Evitar se possível, monitorar função renal rigorosamente'
      },
      {
        medicamento: 'Diuréticos',
        gravidade: 'grave',
        efeito: 'Exacerba hipocalemia',
        conduta: 'Monitorar e repor potássio'
      },
      {
        medicamento: 'Digitálicos',
        gravidade: 'grave',
        efeito: 'Hipocalemia aumenta toxicidade digitálica',
        conduta: 'Manter potássio normal'
      },
      {
        medicamento: 'Corticosteroides',
        gravidade: 'moderada',
        efeito: 'Exacerba hipocalemia',
        conduta: 'Monitorar potássio'
      },
      {
        medicamento: 'Flucitosina',
        gravidade: 'moderada',
        efeito: 'Anfotericina aumenta toxicidade da flucitosina',
        conduta: 'Monitorar níveis de flucitosina e mielotoxicidade'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessário' },
      { tfg: '<30', ajuste: 'Usar com cautela, formulação lipossomal preferida sobre convencional' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Usar apenas se claramente necessário.'
    },
    monitorizacao: [
      'Creatinina e ureia DIÁRIAS inicialmente',
      'Potássio e magnésio DIÁRIOS',
      'Hemograma 2x/semana',
      'Sinais vitais durante infusão',
      'Função hepática semanal'
    ],
    orientacoesPaciente: [
      'Medicamento administrado apenas em ambiente hospitalar',
      'Infusão pode causar febre e calafrios - normal',
      'Relatar diminuição da urina',
      'Hidratação adequada é importante'
    ],
    consideracoesEspeciais: {
      idosos: 'Monitorar função renal rigorosamente',
      hepatopatas: 'Sem ajuste específico',
      pediatrico: 'Doses semelhantes aos adultos por kg'
    },
    doencasRelacionadas: ['mucormicose', 'aspergilose', 'candidemia', 'criptococose', 'histoplasmose', 'leishmaniose-visceral'],
    calculadoras: ['ckd-epi'],
    citations: [],
    lastUpdate: '2024-12-01',
    tags: ['antifungico', 'polieno', 'anfotericina', 'lipossomal', 'sistemico', 'mucor', 'rename']
  },

  // ==================== EQUINOCANDINAS ====================

  // 7. CASPOFUNGINA
  {
    id: 'caspofungina',
    nomeGenerico: 'Caspofungina',
    nomesComerciais: ['Cancidas'],
    atcCode: 'J02AX04',
    rxNormCui: '121112',
    drugBankId: 'DB00520',
    snomedCT: '385487003',
    classeTerapeutica: 'antifungico',
    subclasse: 'equinocandina',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '70mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Candidemia e Candidíase invasiva (primeira linha)',
      'Candidíase esofágica refratária',
      'Aspergilose invasiva refratária/intolerância',
      'Terapia empírica em neutropenia febril',
      'Profilaxia em transplante de fígado'
    ],
    mecanismoAcao: 'Inibe síntese de beta-(1,3)-D-glucana, componente essencial da parede celular fúngica. Fungicida contra Candida, fungistática contra Aspergillus. Não age contra Cryptococcus ou Mucorales.',
    posologias: [
      {
        indicacao: 'Candidemia/Candidíase invasiva',
        adultos: {
          dose: '70mg IV D1, depois 50mg/dia',
          frequencia: '1x/dia IV (infusão em 1h)',
          observacoes: '>80kg: manter 70mg/dia'
        },
        pediatrico: {
          dose: '70mg/m² D1, depois 50mg/m²/dia',
          frequencia: '1x/dia',
          doseMaxima: '70mg/dia',
          idadeMinima: '3 meses'
        }
      },
      {
        indicacao: 'Aspergilose refratária',
        adultos: {
          dose: '70mg IV D1, depois 50mg/dia',
          frequencia: '1x/dia',
          observacoes: 'Geralmente em combinação ou após falha a voriconazol'
        }
      },
      {
        indicacao: 'Terapia empírica em neutropenia febril',
        adultos: {
          dose: '70mg IV D1, depois 50mg/dia',
          frequencia: '1x/dia até resolução da neutropenia'
        }
      },
      {
        indicacao: 'Com indutores enzimáticos (rifampicina, fenitoína)',
        adultos: {
          dose: '70mg/dia (sem redução)',
          frequencia: '1x/dia',
          observacoes: 'Dose loading 70mg D1 não muda'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade à caspofungina ou outras equinocandinas'
    ],
    precaucoes: [
      'Não cobre Cryptococcus, Mucorales, Fusarium',
      'Hepatotoxicidade (rara)',
      'Ajuste em insuficiência hepática',
      'Interação com ciclosporina - monitorar transaminases',
      'Histamina-mediada: rubor, prurido'
    ],
    efeitosAdversos: {
      comuns: [
        'Febre',
        'Náusea',
        'Rash',
        'Flebite no local de infusão',
        'Elevação de transaminases',
        'Cefaleia'
      ],
      graves: [
        'Hepatotoxicidade',
        'Anafilaxia (rara)',
        'Síndrome histamina-like (rubor, prurido, broncoespasmo)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Ciclosporina',
        gravidade: 'grave',
        efeito: 'Aumenta níveis de caspofungina, risco de hepatotoxicidade',
        conduta: 'Monitorar transaminases, evitar se possível'
      },
      {
        medicamento: 'Tacrolimus',
        gravidade: 'moderada',
        efeito: 'Caspofungina reduz níveis de tacrolimus em 25%',
        conduta: 'Monitorar níveis de tacrolimus'
      },
      {
        medicamento: 'Rifampicina',
        gravidade: 'moderada',
        efeito: 'Reduz níveis de caspofungina',
        conduta: 'Aumentar dose de caspofungina para 70mg/dia'
      },
      {
        medicamento: 'Fenitoína/Carbamazepina/Dexametasona',
        gravidade: 'moderada',
        efeito: 'Indutores reduzem caspofungina',
        conduta: 'Considerar dose de 70mg/dia'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessário (não excretada por via renal)' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar.'
    },
    monitorizacao: [
      'Função hepática',
      'Níveis de tacrolimus se uso concomitante',
      'Sinais de reação histamina-like durante infusão'
    ],
    orientacoesPaciente: [
      'Medicamento administrado apenas em ambiente hospitalar',
      'Relatar vermelhidão, coceira, dificuldade respiratória',
      'Tratamento geralmente por 14 dias após última cultura negativa'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessário',
      hepatopatas: 'Child-Pugh 7-9: reduzir para 35mg/dia após loading. Child-Pugh >9: dados limitados.',
      pediatrico: 'Dose por m² de superfície corporal'
    },
    doencasRelacionadas: ['candidemia', 'candidiase-invasiva', 'aspergilose', 'neutropenia-febril'],
    calculadoras: ['superficie-corporal'],
    citations: [],
    lastUpdate: '2024-12-01',
    tags: ['antifungico', 'equinocandina', 'candida', 'primeira-linha', 'candidemia', 'rename']
  },

  // 8. ANIDULAFUNGINA
  {
    id: 'anidulafungina',
    nomeGenerico: 'Anidulafungina',
    nomesComerciais: ['Ecalta', 'Eraxis'],
    atcCode: 'J02AX06',
    rxNormCui: '349113',
    drugBankId: 'DB00362',
    snomedCT: '421826009',
    classeTerapeutica: 'antifungico',
    subclasse: 'equinocandina',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '100mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Candidemia e Candidíase invasiva',
      'Candidíase esofágica',
      'Pacientes críticos com candidíase'
    ],
    mecanismoAcao: 'Equinocandina que inibe síntese de beta-(1,3)-D-glucana da parede celular fúngica. Degradação não-enzimática (não hepática), útil em hepatopatas.',
    posologias: [
      {
        indicacao: 'Candidemia/Candidíase invasiva',
        adultos: {
          dose: '200mg IV D1, depois 100mg/dia',
          frequencia: '1x/dia (infusão em 1.5h)',
          observacoes: 'Infusão máxima 1.1mg/min'
        }
      },
      {
        indicacao: 'Candidíase esofágica',
        adultos: {
          dose: '100mg IV D1, depois 50mg/dia',
          frequencia: '1x/dia por mínimo 14 dias'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade à anidulafungina ou outras equinocandinas'
    ],
    precaucoes: [
      'Não requer ajuste em insuficiência hepática (degradação não-hepática)',
      'Reações relacionadas à infusão se velocidade alta',
      'Não cobre Cryptococcus, Mucorales, Fusarium'
    ],
    efeitosAdversos: {
      comuns: [
        'Hipocalemia',
        'Diarreia',
        'Náusea',
        'Cefaleia',
        'Elevação de transaminases'
      ],
      graves: [
        'Hepatotoxicidade (rara)',
        'Reações de infusão',
        'Anafilaxia (rara)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Ciclosporina',
        gravidade: 'leve',
        efeito: 'Aumenta AUC anidulafungina em 22%',
        conduta: 'Sem ajuste necessário'
      },
      {
        medicamento: 'Voriconazol',
        gravidade: 'leve',
        efeito: 'Sem interação clinicamente significativa',
        conduta: 'Pode associar se necessário'
      },
      {
        medicamento: 'Tacrolimus',
        gravidade: 'leve',
        efeito: 'Sem interação significativa',
        conduta: 'Monitorar níveis por precaução'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessário' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar.'
    },
    monitorizacao: [
      'Função hepática',
      'Sinais de reação de infusão',
      'Resposta clínica e microbiológica'
    ],
    orientacoesPaciente: [
      'Medicamento administrado apenas em ambiente hospitalar',
      'Infusão deve ser lenta',
      'Relatar vermelhidão facial, calor, coceira durante infusão'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessário',
      hepatopatas: 'Sem ajuste (não metabolizada no fígado)',
      pediatrico: 'Doses pediátricas: 3mg/kg D1, depois 1.5mg/kg/dia'
    },
    doencasRelacionadas: ['candidemia', 'candidiase-invasiva', 'candidiase-esofagica'],
    citations: [],
    lastUpdate: '2024-12-01',
    tags: ['antifungico', 'equinocandina', 'candida', 'hepatopata']
  },

  // 9. MICAFUNGINA
  {
    id: 'micafungina',
    nomeGenerico: 'Micafungina',
    nomesComerciais: ['Mycamine'],
    atcCode: 'J02AX05',
    rxNormCui: '331286',
    drugBankId: 'DB01141',
    snomedCT: '421471001',
    classeTerapeutica: 'antifungico',
    subclasse: 'equinocandina',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '100mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Candidemia e Candidíase invasiva',
      'Candidíase esofágica',
      'Profilaxia de Candida em transplante de medula (TCTH)',
      'Aspergilose invasiva refratária (dados limitados)'
    ],
    mecanismoAcao: 'Equinocandina que inibe beta-(1,3)-D-glucana sintase. Aprovada para profilaxia em TCTH. Não requer dose de ataque.',
    posologias: [
      {
        indicacao: 'Candidemia/Candidíase invasiva',
        adultos: {
          dose: '100mg',
          frequencia: '1x/dia IV (infusão em 1h)',
          observacoes: 'Pode aumentar para 150mg se necessário'
        },
        pediatrico: {
          dose: '2mg/kg (>40kg: dose adulto)',
          frequencia: '1x/dia',
          doseMaxima: '100mg/dia',
          idadeMinima: 'Neonatos'
        }
      },
      {
        indicacao: 'Candidíase esofágica',
        adultos: {
          dose: '150mg',
          frequencia: '1x/dia por mínimo 14 dias'
        }
      },
      {
        indicacao: 'Profilaxia em TCTH',
        adultos: {
          dose: '50mg',
          frequencia: '1x/dia durante período de risco'
        },
        pediatrico: {
          dose: '1mg/kg',
          frequencia: '1x/dia',
          doseMaxima: '50mg/dia'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade à micafungina ou outras equinocandinas'
    ],
    precaucoes: [
      'Tumores hepáticos observados em ratos (relevância clínica incerta)',
      'Hepatotoxicidade',
      'Hemólise/Hemoglobinúria (raro)',
      'Não cobre Cryptococcus, Mucorales',
      'Reações de infusão'
    ],
    efeitosAdversos: {
      comuns: [
        'Náusea',
        'Vômitos',
        'Diarreia',
        'Febre',
        'Cefaleia',
        'Elevação de transaminases'
      ],
      graves: [
        'Hepatotoxicidade',
        'Hemólise',
        'Insuficiência renal',
        'Anafilaxia'
      ]
    },
    interacoes: [
      {
        medicamento: 'Sirolimus',
        gravidade: 'moderada',
        efeito: 'Aumenta níveis de sirolimus em 21%',
        conduta: 'Monitorar níveis de sirolimus'
      },
      {
        medicamento: 'Nifedipino',
        gravidade: 'moderada',
        efeito: 'Aumenta níveis de nifedipino',
        conduta: 'Monitorar PA'
      },
      {
        medicamento: 'Itraconazol',
        gravidade: 'moderada',
        efeito: 'Aumenta níveis de itraconazol',
        conduta: 'Monitorar toxicidade'
      },
      {
        medicamento: 'Ciclosporina/Tacrolimus',
        gravidade: 'leve',
        efeito: 'Sem interação clinicamente significativa',
        conduta: 'Monitorar níveis por precaução'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessário' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar.'
    },
    monitorizacao: [
      'Função hepática',
      'Função renal',
      'Hemograma (risco de hemólise)',
      'Resposta clínica'
    ],
    orientacoesPaciente: [
      'Medicamento administrado apenas em ambiente hospitalar',
      'Não requer dose de ataque',
      'Relatar urina escura (hemólise)'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessário',
      hepatopatas: 'Usar com cautela, monitorar função hepática',
      pediatrico: 'Segura em neonatos para candidemia'
    },
    doencasRelacionadas: ['candidemia', 'candidiase-invasiva', 'profilaxia-antifungica'],
    citations: [],
    lastUpdate: '2024-12-01',
    tags: ['antifungico', 'equinocandina', 'candida', 'profilaxia', 'tcth', 'pediatrico']
  },

  // ==================== ALILAMINAS ====================

  // 10. TERBINAFINA
  {
    id: 'terbinafina',
    nomeGenerico: 'Terbinafina',
    nomesComerciais: ['Lamisil', 'Terbimax', 'Funtyl'],
    atcCode: 'D01BA02',
    rxNormCui: '37801',
    drugBankId: 'DB00857',
    snomedCT: '373450007',
    classeTerapeutica: 'antifungico',
    subclasse: 'alilamina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'creme', concentracao: '1%', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '125mg/5ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Onicomicose (primeira linha)',
      'Tinea capitis',
      'Tinea corporis/cruris/pedis refratários a tratamento tópico',
      'Dermatomicoses extensas',
      'Esporotricose cutânea (alternativa)'
    ],
    mecanismoAcao: 'Inibe a esqualeno epoxidase fúngica, bloqueando a síntese de ergosterol. Fungicida contra dermatófitos. Concentra-se na pele, unhas e tecido adiposo.',
    posologias: [
      {
        indicacao: 'Onicomicose de unhas dos pés',
        adultos: {
          dose: '250mg',
          frequencia: '1x/dia por 12 semanas',
          observacoes: 'Unhas das mãos: 6 semanas'
        },
        pediatrico: {
          dose: '<20kg: 62.5mg/dia; 20-40kg: 125mg/dia; >40kg: 250mg/dia',
          frequencia: '1x/dia',
          idadeMinima: '4 anos'
        }
      },
      {
        indicacao: 'Tinea capitis',
        adultos: {
          dose: '250mg',
          frequencia: '1x/dia por 4-6 semanas'
        },
        pediatrico: {
          dose: '<20kg: 62.5mg/dia; 20-40kg: 125mg/dia; >40kg: 250mg/dia',
          frequencia: '1x/dia por 4 semanas',
          observacoes: 'Primeira linha para T. tonsurans'
        }
      },
      {
        indicacao: 'Tinea corporis/cruris/pedis',
        adultos: {
          dose: '250mg',
          frequencia: '1x/dia por 2-4 semanas'
        }
      },
      {
        indicacao: 'Tópico (tinea pedis)',
        adultos: {
          dose: 'Creme 1% - aplicar 1-2x/dia',
          frequencia: 'Por 1-2 semanas'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade à terbinafina',
      'Doença hepática ativa ou crônica',
      'Insuficiência hepática grave'
    ],
    precaucoes: [
      'Hepatotoxicidade - verificar transaminases antes de iniciar',
      'Neutropenia/Trombocitopenia (raro)',
      'Alteração do paladar (pode ser prolongada)',
      'Reações cutâneas graves (raro)',
      'Nefrotoxicidade com uso prolongado',
      'Lúpus cutâneo/sistêmico (raro)'
    ],
    efeitosAdversos: {
      comuns: [
        'Cefaleia',
        'Diarreia',
        'Dispepsia',
        'Rash',
        'Alteração do paladar (disgeusia)',
        'Náusea'
      ],
      graves: [
        'Hepatotoxicidade/Insuficiência hepática',
        'Neutropenia',
        'Síndrome de Stevens-Johnson',
        'Necrólise epidérmica tóxica',
        'Lúpus eritematoso'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'moderada',
        efeito: 'Reduz níveis de terbinafina em 50%',
        conduta: 'Pode necessitar aumento de dose'
      },
      {
        medicamento: 'Cimetidina',
        gravidade: 'leve',
        efeito: 'Aumenta níveis de terbinafina',
        conduta: 'Monitorar toxicidade'
      },
      {
        medicamento: 'Fluconazol',
        gravidade: 'moderada',
        efeito: 'Aumenta níveis de terbinafina',
        conduta: 'Geralmente não necessário ajuste'
      },
      {
        medicamento: 'Cafeína',
        gravidade: 'leve',
        efeito: 'Terbinafina inibe CYP1A2, pode aumentar cafeína',
        conduta: 'Limitar cafeína se necessário'
      },
      {
        medicamento: 'Antidepressivos tricíclicos (imipramina)',
        gravidade: 'moderada',
        efeito: 'Terbinafina inibe CYP2D6',
        conduta: 'Monitorar toxicidade de TCAs'
      },
      {
        medicamento: 'Codeína/Tramadol',
        gravidade: 'moderada',
        efeito: 'Reduz conversão para metabólito ativo (CYP2D6)',
        conduta: 'Pode reduzir eficácia analgésica'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '<50', ajuste: 'Reduzir dose em 50% - dados limitados' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Excretada no leite. Evitar durante amamentação ou interromper.'
    },
    monitorizacao: [
      'Função hepática antes de iniciar (ALT, AST)',
      'Repetir função hepática após 4-6 semanas',
      'Hemograma se uso prolongado',
      'Sinais de hepatotoxicidade (icterícia, urina escura)'
    ],
    orientacoesPaciente: [
      'Pode tomar com ou sem alimentos',
      'Tratamento de onicomicose é longo - completar',
      'Relatar imediatamente icterícia, urina escura, fezes claras',
      'Alteração de paladar pode ocorrer',
      'Tópico: aplicar em área limpa e seca'
    ],
    consideracoesEspeciais: {
      idosos: 'Ajustar pela função renal e hepática',
      hepatopatas: 'Contraindicado em doença hepática ativa',
      pediatrico: 'Segura em >4 anos, dose por peso'
    },
    doencasRelacionadas: ['onicomicose', 'tinea-capitis', 'tinea-corporis', 'dermatomicose'],
    citations: [],
    lastUpdate: '2024-12-01',
    tags: ['antifungico', 'alilamina', 'dermatofitos', 'onicomicose', 'tinea', 'rename']
  },

  // ==================== OUTROS ANTIFUNGICOS ====================

  // 11. NISTATINA
  {
    id: 'nistatina',
    nomeGenerico: 'Nistatina',
    nomesComerciais: ['Micostatin', 'Nistatina'],
    atcCode: 'A07AA02',
    rxNormCui: '7597',
    drugBankId: 'DB00647',
    snomedCT: '387048002',
    classeTerapeutica: 'antifungico',
    subclasse: 'polieno',
    rename: true,
    apresentacoes: [
      { forma: 'suspensao_oral', concentracao: '100.000 UI/ml', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500.000 UI', disponivelSUS: true },
      { forma: 'creme', concentracao: '100.000 UI/g', disponivelSUS: true },
      { forma: 'pomada', concentracao: '100.000 UI/g', disponivelSUS: true },
      { forma: 'ovulo', concentracao: '100.000 UI', disponivelSUS: true }
    ],
    indicacoes: [
      'Candidíase oral (sapinho)',
      'Candidíase esofágica (adjuvante)',
      'Candidíase cutânea',
      'Candidíase de área de fralda',
      'Candidíase vulvovaginal',
      'Profilaxia de candidíase em imunossuprimidos'
    ],
    mecanismoAcao: 'Polieno que se liga ao ergosterol da membrana fúngica, formando poros que causam extravasamento celular. Não é absorvida pelo TGI - ação apenas local.',
    posologias: [
      {
        indicacao: 'Candidíase oral',
        adultos: {
          dose: '400.000-600.000 UI (4-6ml)',
          frequencia: '6/6h bochechar e engolir por 7-14 dias',
          observacoes: 'Manter na boca por alguns minutos antes de engolir'
        },
        pediatrico: {
          dose: 'Lactentes: 100.000-200.000 UI (1-2ml); Crianças: 400.000-600.000 UI',
          frequencia: '6/6h',
          idadeMinima: 'Neonatos'
        }
      },
      {
        indicacao: 'Candidíase vulvovaginal',
        adultos: {
          dose: '1 óvulo 100.000 UI',
          frequencia: '1x/dia ao deitar por 14 dias'
        }
      },
      {
        indicacao: 'Candidíase cutânea/intertrigo',
        adultos: {
          dose: 'Creme/pomada: aplicar na área afetada',
          frequencia: '2-3x/dia até cura clínica (2-3 semanas)'
        }
      },
      {
        indicacao: 'Profilaxia em imunossuprimidos',
        adultos: {
          dose: '500.000-1.000.000 UI',
          frequencia: '8/8h enquanto durar imunossupressão'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade à nistatina'
    ],
    precaucoes: [
      'Não absorvida - sem ação sistêmica',
      'Suspensão contém sacarose - cautela em diabéticos',
      'Tópica: evitar uso ocular',
      'Óvulos: podem danificar preservativos de látex'
    ],
    efeitosAdversos: {
      comuns: [
        'Náusea (oral)',
        'Vômitos',
        'Diarreia (altas doses)',
        'Irritação local (tópico)',
        'Prurido'
      ],
      graves: [
        'Reações alérgicas (raras)',
        'Síndrome de Stevens-Johnson (muito rara)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Sem interações significativas',
        gravidade: 'leve',
        efeito: 'Não é absorvida, sem interações sistêmicas',
        conduta: 'Pode usar com qualquer medicamento'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessário (não absorvida)' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: true,
      observacao: 'Segura. Não absorvida sistemicamente.'
    },
    monitorizacao: [
      'Resposta clínica',
      'Resolução dos sintomas'
    ],
    orientacoesPaciente: [
      'Suspensão oral: bochechar bem e engolir',
      'Manter na boca o maior tempo possível',
      'Completar tratamento mesmo com melhora',
      'Tópico: lavar e secar área antes de aplicar',
      'Óvulos: usar mesmo durante menstruação'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste necessário',
      hepatopatas: 'Sem ajuste necessário',
      pediatrico: 'Segura em neonatos'
    },
    doencasRelacionadas: ['candidiase-oral', 'candidiase-vaginal', 'candidiase-cutanea'],
    citations: [],
    lastUpdate: '2024-12-01',
    tags: ['antifungico', 'polieno', 'candida', 'topico', 'oral', 'seguro', 'rename']
  },

  // 12. GRISEOFULVINA
  {
    id: 'griseofulvina',
    nomeGenerico: 'Griseofulvina',
    nomesComerciais: ['Fulcin', 'Sporostatin', 'Griseovin'],
    atcCode: 'D01BA01',
    rxNormCui: '5022',
    drugBankId: 'DB00400',
    snomedCT: '372807000',
    classeTerapeutica: 'antifungico',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg (micronizada)', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '125mg/5ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Tinea capitis (primeira linha em algumas regiões)',
      'Tinea corporis refratária',
      'Tinea cruris refratária',
      'Tinea pedis refratária',
      'Tinea barbae',
      'Dermatomicoses por dermatófitos'
    ],
    mecanismoAcao: 'Interfere com a mitose fúngica ligando-se à tubulina, impedindo a formação do fuso mitótico. Fungistática. Deposita-se na queratina recém-formada, protegendo-a de infecção.',
    posologias: [
      {
        indicacao: 'Tinea capitis (Microsporum)',
        adultos: {
          dose: '500-1000mg/dia (micronizada)',
          frequencia: '1x/dia ou dividido 12/12h por 6-12 semanas',
          observacoes: 'Tomar com refeição gordurosa para melhor absorção'
        },
        pediatrico: {
          dose: '10-20mg/kg/dia (micronizada)',
          frequencia: '1x/dia ou dividido 12/12h por 6-12 semanas',
          doseMaxima: '1000mg/dia',
          idadeMinima: '2 anos'
        }
      },
      {
        indicacao: 'Tinea capitis (Trichophyton)',
        adultos: {
          dose: '500mg/dia (micronizada)',
          frequencia: '1x/dia por 4-6 semanas',
          observacoes: 'T. tonsurans geralmente responde melhor a terbinafina'
        }
      },
      {
        indicacao: 'Tinea corporis/cruris/pedis',
        adultos: {
          dose: '500mg/dia',
          frequencia: '1x/dia por 2-4 semanas'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade à griseofulvina',
      'Porfiria',
      'Insuficiência hepática grave',
      'Lúpus eritematoso sistêmico',
      'Gestação (teratogênico)'
    ],
    precaucoes: [
      'Fotossensibilidade - evitar exposição solar',
      'Hepatotoxicidade',
      'Leucopenia (rara)',
      'Pode exacerbar porfiria e lúpus',
      'Não eficaz contra Candida',
      'Interações via indução CYP',
      'Efeito antabuse com álcool'
    ],
    efeitosAdversos: {
      comuns: [
        'Cefaleia (15-20%)',
        'Náusea',
        'Vômitos',
        'Diarreia',
        'Rash',
        'Fotossensibilidade'
      ],
      graves: [
        'Hepatotoxicidade',
        'Leucopenia/Granulocitopenia',
        'Síndrome lúpus-like',
        'Reações de fotossensibilidade graves',
        'Eritema multiforme'
      ]
    },
    interacoes: [
      {
        medicamento: 'Warfarina',
        gravidade: 'grave',
        efeito: 'Reduz efeito anticoagulante (indução CYP)',
        conduta: 'Monitorar INR, ajustar dose warfarina'
      },
      {
        medicamento: 'Contraceptivos orais',
        gravidade: 'grave',
        efeito: 'Reduz eficácia contraceptiva',
        conduta: 'Usar método contraceptivo adicional'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'grave',
        efeito: 'Reduz níveis de ciclosporina',
        conduta: 'Monitorar níveis de ciclosporina'
      },
      {
        medicamento: 'Fenobarbital',
        gravidade: 'moderada',
        efeito: 'Reduz absorção de griseofulvina',
        conduta: 'Aumentar dose ou escolher alternativa'
      },
      {
        medicamento: 'Álcool',
        gravidade: 'moderada',
        efeito: 'Reação tipo dissulfiram (rubor, náusea)',
        conduta: 'Evitar álcool durante tratamento'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessário' },
      { tfg: '<30', ajuste: 'Dados limitados - usar com cautela' }
    ],
    gestacao: 'X',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar.'
    },
    monitorizacao: [
      'Função hepática antes e periodicamente',
      'Hemograma se uso prolongado (>6 semanas)',
      'Resposta clínica'
    ],
    orientacoesPaciente: [
      'Tomar COM refeição gordurosa',
      'Evitar exposição solar - usar protetor',
      'Evitar bebidas alcoólicas',
      'Usar método contraceptivo adicional',
      'Completar tratamento mesmo com melhora',
      'Relatar cefaleia persistente'
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste específico, monitorar função hepática',
      hepatopatas: 'Contraindicado em doença hepática significativa',
      pediatrico: 'Alternativa para tinea capitis, especialmente Microsporum'
    },
    doencasRelacionadas: ['tinea-capitis', 'tinea-corporis', 'dermatomicose'],
    citations: [],
    lastUpdate: '2024-12-01',
    tags: ['antifungico', 'dermatofitos', 'tinea', 'tinea-capitis', 'microsporum', 'rename']
  }
];

// Export para uso no index consolidado
export default antifungicosNovos;
