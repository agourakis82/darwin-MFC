/**
 * ANTIPARASITARIOS NOVOS - DARWIN-MFC EXPANSAO 1000
 * ==================================================
 * Antiparasitarios para helmintiases, protozoarios e ectoparasitas
 *
 * Referencias:
 * - RENAME 2024 (Relacao Nacional de Medicamentos Essenciais)
 * - OMS - Guidelines for Treatment of Parasitic Infections
 * - CDC - Parasitic Diseases Guidelines
 * - Uptodate Drug Information
 * - Micromedex
 */

import { Medicamento } from '@/lib/types/medicamento';

export const antiparasitariosNovos: Partial<Medicamento>[] = [
  // ==================== ANTI-HELMINTICOS ====================

  // 1. IVERMECTINA
  {
    id: 'ivermectina',
    nomeGenerico: 'Ivermectina',
    nomesComerciais: ['Revectina', 'Ivermec', 'Ivermic', 'Vermectil'],
    atcCode: 'P02CF01',
    rxNormCui: '6470',
    drugBankId: 'DB00602',
    snomedCT: '387559003',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'anti_helmintico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '6mg', disponivelSUS: true },
      { forma: 'locao', concentracao: '1%', disponivelSUS: false }
    ],
    indicacoes: [
      'Estrongiloidiase intestinal (Strongyloides stercoralis)',
      'Oncocercose (Onchocerca volvulus)',
      'Filariose linfatica (Wuchereria bancrofti)',
      'Escabiose (Sarcoptes scabiei)',
      'Pediculose (Pediculus humanus)',
      'Larva migrans cutanea',
      'Ascaridiase (alternativa)',
      'Tricuriase (alternativa)'
    ],
    mecanismoAcao: 'Liga-se seletivamente aos canais de cloro mediados por glutamato em celulas nervosas e musculares de invertebrados, causando aumento da permeabilidade ao cloro com hiperpolarizacao, paralisia e morte do parasita.',
    posologias: [
      {
        indicacao: 'Estrongiloidiase intestinal',
        adultos: {
          dose: '200mcg/kg',
          frequencia: 'Dose unica',
          observacoes: 'Repetir em 2 semanas se persistir. Imunossuprimidos: repetir a cada 2 semanas ate cura.'
        },
        pediatrico: {
          dose: '200mcg/kg',
          frequencia: 'Dose unica',
          idadeMinima: '>15kg ou >5 anos'
        }
      },
      {
        indicacao: 'Escabiose',
        adultos: {
          dose: '200mcg/kg',
          frequencia: 'Dose unica, repetir em 7-14 dias',
          observacoes: 'Escabiose crostosa: 200mcg/kg nos dias 1, 2, 8, 9, 15 + permetrina topica'
        }
      },
      {
        indicacao: 'Oncocercose',
        adultos: {
          dose: '150mcg/kg',
          frequencia: 'Dose unica a cada 6-12 meses por anos'
        }
      },
      {
        indicacao: 'Pediculose',
        adultos: {
          dose: '200mcg/kg',
          frequencia: 'Dose unica, repetir em 7-10 dias'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a ivermectina',
      'Coinfeccao por Loa loa com microfilaremia alta (>30.000 mf/ml) - risco de encefalopatia',
      'Criancas <15kg ou <5 anos (sem dados de seguranca)',
      'Gestacao (categoria C)'
    ],
    precaucoes: [
      'Reacao de Mazzotti em oncocercose (prurido, febre, edema, hipotensao)',
      'Risco de encefalopatia em coinfeccao Loa loa - triar antes em areas endemicas',
      'Interacao com inibidores P-gp (aumenta niveis SNC)',
      'Hiperinfeccao em imunossuprimidos requer tratamento prolongado'
    ],
    efeitosAdversos: {
      comuns: [
        'Prurido',
        'Rash cutaneo',
        'Tontura',
        'Nausea',
        'Diarreia'
      ],
      graves: [
        'Encefalopatia (em coinfeccao Loa loa)',
        'Reacao de Mazzotti',
        'Hipotensao',
        'Sindrome de Stevens-Johnson (raro)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Warfarina',
        gravidade: 'moderada',
        efeito: 'Pode aumentar INR',
        conduta: 'Monitorar INR'
      },
      {
        medicamento: 'Inibidores P-gp (Verapamil, Ciclosporina)',
        gravidade: 'moderada',
        efeito: 'Aumenta niveis de ivermectina no SNC',
        conduta: 'Usar com cautela'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario - excrecao principalmente hepatica' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Excretada em baixas concentracoes no leite. Compativel com amamentacao.'
    },
    monitorizacao: [
      'Exame parasitologico de fezes pos-tratamento',
      'Eosinofilia',
      'Sintomas de reacao de Mazzotti em oncocercose',
      'Microfilaremia Loa loa em areas endemicas'
    ],
    orientacoesPaciente: [
      'Tomar com estomago vazio ou com alimento leve',
      'Evitar alcool durante tratamento',
      'Tratar todos os contactantes em escabiose',
      'Lavar roupas de cama em agua quente'
    ],
    doencasRelacionadas: ['estrongiloidiase', 'escabiose', 'pediculose', 'oncocercose', 'filariose'],
    tags: ['antiparasitario', 'anti-helmintico', 'escabiose', 'estrongiloidiase', 'oncocercose'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 2. ALBENDAZOL
  {
    id: 'albendazol',
    nomeGenerico: 'Albendazol',
    nomesComerciais: ['Zentel', 'Albel', 'Parasin', 'Zolben'],
    atcCode: 'P02CA03',
    rxNormCui: '406',
    drugBankId: 'DB00518',
    snomedCT: '387558006',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'anti_helmintico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'comprimido_mastigavel', concentracao: '400mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '40mg/ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Ascaridiase (Ascaris lumbricoides)',
      'Ancilostomiase (Ancylostoma duodenale, Necator americanus)',
      'Tricuriase (Trichuris trichiura)',
      'Enterobiase/Oxiuriase (Enterobius vermicularis)',
      'Teniase (Taenia saginata, T. solium)',
      'Neurocisticercose',
      'Hidatidose/Equinococose (Echinococcus)',
      'Estrongiloidiase',
      'Larva migrans cutanea',
      'Giardíase (alternativa)'
    ],
    mecanismoAcao: 'Inibe a polimerizacao de beta-tubulina, impedindo a formacao de microtubulos e captacao de glicose pelo parasita, levando a deplecao energetica e morte.',
    posologias: [
      {
        indicacao: 'Ascaridiase, Ancilostomiase, Tricuriase, Enterobiase',
        adultos: {
          dose: '400mg',
          frequencia: 'Dose unica',
          observacoes: 'Enterobiase: repetir em 2 semanas. Tricuriase intensa: 400mg/dia por 3 dias.'
        },
        pediatrico: {
          dose: '>2 anos: 400mg; <2 anos: 200mg',
          frequencia: 'Dose unica',
          idadeMinima: '>1 ano'
        }
      },
      {
        indicacao: 'Neurocisticercose',
        adultos: {
          dose: '15mg/kg/dia (max 800mg/dia)',
          frequencia: 'Dividido em 2 doses por 8-30 dias',
          observacoes: 'Associar corticoide e anticonvulsivante. Repetir ciclo se necessario.'
        }
      },
      {
        indicacao: 'Hidatidose',
        adultos: {
          dose: '10-15mg/kg/dia (max 800mg/dia)',
          frequencia: 'Dividido em 2 doses por 1-6 meses',
          observacoes: 'Ciclos de 28 dias com intervalos de 14 dias.'
        }
      },
      {
        indicacao: 'Estrongiloidiase',
        adultos: {
          dose: '400mg',
          frequencia: '1x/dia por 3 dias'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao albendazol ou benzimidazois',
      'Gestacao (teratogenico - categoria X para uso prolongado)',
      'Primeiro trimestre da gestacao (absoluto)',
      'Cirrose descompensada'
    ],
    precaucoes: [
      'Teratogenico - teste de gravidez antes de tratamento prolongado',
      'Monitorar hemograma e transaminases em tratamento prolongado',
      'Risco de reacao inflamatoria em neurocisticercose - usar corticoide',
      'Hepatotoxicidade em tratamento prolongado'
    ],
    efeitosAdversos: {
      comuns: [
        'Dor abdominal',
        'Nausea',
        'Cefaleia',
        'Tontura'
      ],
      graves: [
        'Hepatotoxicidade',
        'Agranulocitose/Pancitopenia',
        'Sindrome de Stevens-Johnson',
        'Alopecia (reversivel)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Dexametasona',
        gravidade: 'moderada',
        efeito: 'Aumenta niveis de albendazol sulfoxido em 50%',
        conduta: 'Util em neurocisticercose - associacao terapeutica'
      },
      {
        medicamento: 'Praziquantel',
        gravidade: 'moderada',
        efeito: 'Aumenta niveis de albendazol',
        conduta: 'Pode ser combinacao util em cisticercose'
      },
      {
        medicamento: 'Cimetidina',
        gravidade: 'moderada',
        efeito: 'Aumenta niveis de albendazol',
        conduta: 'Monitorar efeitos adversos'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Evitar. Se necessario, suspender amamentacao por 24-48h apos dose unica.'
    },
    monitorizacao: [
      'Hemograma a cada 2 semanas em tratamento prolongado',
      'ALT/AST a cada 2 semanas em tratamento prolongado',
      'Exame parasitologico de fezes',
      'Neuroimagem em neurocisticercose'
    ],
    orientacoesPaciente: [
      'Tomar com alimento gorduroso para melhor absorcao',
      'Pode mastigar ou engolir o comprimido',
      'Mulheres ferteis devem evitar gravidez durante e 1 mes apos',
      'Lavar maos frequentemente e manter unhas curtas'
    ],
    doencasRelacionadas: ['ascaridiase', 'ancilostomiase', 'tricuriase', 'enterobiase', 'neurocisticercose', 'hidatidose'],
    tags: ['antiparasitario', 'anti-helmintico', 'benzimidazol', 'neurocisticercose', 'ascaridiase'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 3. MEBENDAZOL
  {
    id: 'mebendazol',
    nomeGenerico: 'Mebendazol',
    nomesComerciais: ['Pantelmin', 'Necamin', 'Vermirax'],
    atcCode: 'P02CA01',
    rxNormCui: '6691',
    drugBankId: 'DB00643',
    snomedCT: '387311004',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'anti_helmintico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '20mg/ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Ascaridiase (Ascaris lumbricoides)',
      'Ancilostomiase (Ancylostoma, Necator)',
      'Tricuriase (Trichuris trichiura)',
      'Enterobiase/Oxiuriase (Enterobius vermicularis)',
      'Infeccoes mistas por helmintos intestinais'
    ],
    mecanismoAcao: 'Inibe a polimerizacao de tubulina, bloqueando captacao de glicose e deplecao de glicogenio no parasita. Absorcao sistemica minima - acao principalmente luminal.',
    posologias: [
      {
        indicacao: 'Enterobiase (oxiuriase)',
        adultos: {
          dose: '100mg',
          frequencia: 'Dose unica, repetir em 2 semanas'
        },
        pediatrico: {
          dose: '100mg',
          frequencia: 'Dose unica, repetir em 2 semanas',
          idadeMinima: '>2 anos'
        }
      },
      {
        indicacao: 'Ascaridiase, Tricuriase, Ancilostomiase',
        adultos: {
          dose: '100mg',
          frequencia: '12/12h por 3 dias consecutivos',
          observacoes: 'Ou 500mg dose unica'
        },
        pediatrico: {
          dose: '100mg',
          frequencia: '12/12h por 3 dias',
          idadeMinima: '>2 anos'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao mebendazol',
      'Gestacao (primeiro trimestre)',
      'Criancas <2 anos'
    ],
    precaucoes: [
      'Absorcao sistemica minima em doses habituais',
      'Cautela em gestacao (categoria C)',
      'Pode precipitar migracao de Ascaris - associar antiespamodico'
    ],
    efeitosAdversos: {
      comuns: [
        'Dor abdominal transitoria',
        'Diarreia',
        'Nausea'
      ],
      graves: [
        'Agranulocitose (raro, doses altas)',
        'Hepatotoxicidade (doses altas prolongadas)',
        'Alopecia (raro)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Carbamazepina, Fenitoina',
        gravidade: 'moderada',
        efeito: 'Reduzem niveis de mebendazol',
        conduta: 'Pode reduzir eficacia em tratamento prolongado'
      },
      {
        medicamento: 'Cimetidina',
        gravidade: 'leve',
        efeito: 'Pode aumentar niveis de mebendazol',
        conduta: 'Monitorar'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste - absorcao sistemica minima' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Absorcao minima. Compativel com amamentacao.'
    },
    monitorizacao: [
      'Exame parasitologico de fezes 2-4 semanas apos',
      'Hemograma em tratamento prolongado'
    ],
    orientacoesPaciente: [
      'Pode tomar com ou sem alimento',
      'Pode mastigar o comprimido',
      'Tratar todos os contactantes domiciliares em enterobiase',
      'Lavar roupas de cama e roupas intimas em agua quente'
    ],
    doencasRelacionadas: ['ascaridiase', 'ancilostomiase', 'tricuriase', 'enterobiase', 'oxiuriase'],
    tags: ['antiparasitario', 'anti-helmintico', 'benzimidazol', 'verminose', 'oxiuriase'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 4. PRAZIQUANTEL
  {
    id: 'praziquantel',
    nomeGenerico: 'Praziquantel',
    nomesComerciais: ['Cisticid', 'Cestox'],
    atcCode: 'P02BA01',
    rxNormCui: '8525',
    drugBankId: 'DB01058',
    snomedCT: '387305008',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'anti_helmintico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '600mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Esquistossomose (Schistosoma mansoni, S. haematobium, S. japonicum)',
      'Teniase (Taenia solium, T. saginata)',
      'Neurocisticercose (cisticercose)',
      'Himenolepíase (Hymenolepis nana)',
      'Difilobotriase (Diphyllobothrium latum)',
      'Clonorquiase, Opistorquiase',
      'Paragonimiase'
    ],
    mecanismoAcao: 'Aumenta permeabilidade da membrana celular do parasita ao calcio, causando contracao muscular, paralisia, vacuolizacao do tegumento e morte. Expoe antigenos parasitarios ao sistema imune.',
    posologias: [
      {
        indicacao: 'Esquistossomose (S. mansoni)',
        adultos: {
          dose: '40-60mg/kg',
          frequencia: 'Dose unica ou dividida em 2-3 doses no mesmo dia',
          observacoes: 'S. japonicum: 60mg/kg dividido em 3 doses'
        },
        pediatrico: {
          dose: '40-60mg/kg',
          frequencia: 'Dose unica ou dividida',
          idadeMinima: '>4 anos'
        }
      },
      {
        indicacao: 'Teniase',
        adultos: {
          dose: '5-10mg/kg',
          frequencia: 'Dose unica'
        }
      },
      {
        indicacao: 'Neurocisticercose',
        adultos: {
          dose: '50mg/kg/dia',
          frequencia: 'Dividido em 3 doses por 14-30 dias',
          observacoes: 'Associar corticoide e anticonvulsivante. Alternativa: albendazol.'
        }
      },
      {
        indicacao: 'Himenolepíase',
        adultos: {
          dose: '25mg/kg',
          frequencia: 'Dose unica'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao praziquantel',
      'Cisticercose ocular (risco de lesao visual)',
      'Uso concomitante de rifampicina'
    ],
    precaucoes: [
      'Pode precipitar convulsoes em neurocisticercose - usar anticonvulsivante',
      'Nao dirigir ou operar maquinas no dia do tratamento (sonolencia)',
      'Evitar em pacientes com arritmias cardiacas',
      'Hospitalizar para tratamento de neurocisticercose'
    ],
    efeitosAdversos: {
      comuns: [
        'Cefaleia',
        'Tontura',
        'Sonolencia',
        'Mal-estar',
        'Dor abdominal',
        'Nausea'
      ],
      graves: [
        'Convulsoes (em neurocisticercose)',
        'Arritmias cardiacas',
        'Febre',
        'Reacao anafilatica (raro)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Rifampicina',
        gravidade: 'contraindicada',
        efeito: 'Reduz niveis de praziquantel em 85%',
        conduta: 'Contraindicado - aguardar 4 semanas apos rifampicina'
      },
      {
        medicamento: 'Dexametasona',
        gravidade: 'moderada',
        efeito: 'Reduz niveis de praziquantel em 50%',
        conduta: 'Pode necessitar aumento de dose'
      },
      {
        medicamento: 'Fenitoina, Carbamazepina',
        gravidade: 'grave',
        efeito: 'Reduzem niveis de praziquantel significativamente',
        conduta: 'Evitar ou aumentar dose de praziquantel'
      },
      {
        medicamento: 'Cimetidina',
        gravidade: 'moderada',
        efeito: 'Aumenta niveis de praziquantel',
        conduta: 'Monitorar efeitos adversos'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Excretado no leite. Suspender amamentacao por 72h apos dose.'
    },
    monitorizacao: [
      'Exame parasitologico de fezes 1-3 meses apos',
      'Neuroimagem em neurocisticercose',
      'Sinais de hipertensao intracraniana em neurocisticercose',
      'Sorologia em esquistossomose'
    ],
    orientacoesPaciente: [
      'Tomar com alimento para reduzir desconforto GI',
      'Engolir comprimido inteiro (amargo)',
      'Nao dirigir no dia do tratamento',
      'Relatar convulsoes ou sintomas neurologicos'
    ],
    doencasRelacionadas: ['esquistossomose', 'teniase', 'neurocisticercose', 'cisticercose', 'himenolepíase'],
    tags: ['antiparasitario', 'anti-helmintico', 'esquistossomose', 'teniase', 'cisticercose', 'praziquantel'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 5. NITAZOXANIDA
  {
    id: 'nitazoxanida',
    nomeGenerico: 'Nitazoxanida',
    nomesComerciais: ['Annita', 'Nitax'],
    atcCode: 'P01AX11',
    rxNormCui: '213043',
    drugBankId: 'DB00507',
    snomedCT: '421747003',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'anti_helmintico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: false },
      { forma: 'suspensao_oral', concentracao: '20mg/ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Giardíase (Giardia lamblia)',
      'Criptosporidiose (Cryptosporidium)',
      'Amebíase intestinal (Entamoeba histolytica)',
      'Blastocistose (Blastocystis hominis)',
      'Diarreia por rotavirus (adjuvante)',
      'Ascaridiase, Tricuriase, Enterobiase (alternativa)'
    ],
    mecanismoAcao: 'Inibe a enzima piruvato:ferredoxina oxidoredutase (PFOR) essencial para metabolismo anaerobio de protozoarios e helmintos. Metabolito ativo: tizoxanida.',
    posologias: [
      {
        indicacao: 'Giardíase, Criptosporidiose',
        adultos: {
          dose: '500mg',
          frequencia: '12/12h por 3 dias',
          observacoes: 'Tomar com alimento'
        },
        pediatrico: {
          dose: '1-3 anos: 100mg 12/12h; 4-11 anos: 200mg 12/12h; >=12 anos: 500mg 12/12h',
          frequencia: 'Por 3 dias',
          idadeMinima: '1 ano'
        }
      },
      {
        indicacao: 'Amebíase intestinal',
        adultos: {
          dose: '500mg',
          frequencia: '12/12h por 3 dias'
        }
      },
      {
        indicacao: 'Helmintos (ascaridiase, tricuriase)',
        adultos: {
          dose: '500mg',
          frequencia: '12/12h por 3 dias'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a nitazoxanida',
      'Criancas <1 ano (suspensao) ou <12 anos (comprimido)'
    ],
    precaucoes: [
      'Eficacia reduzida em imunossuprimidos com criptosporidiose',
      'Pode causar coloracao amarelada da urina e escleroticas (inofensivo)',
      'Contem corante amarelo - risco de alergia em sensiveis',
      'Diabetes: suspensao contem sacarose'
    ],
    efeitosAdversos: {
      comuns: [
        'Dor abdominal',
        'Nausea',
        'Cefaleia',
        'Coloracao amarelada da urina',
        'Diarreia'
      ],
      graves: [
        'Reacoes alergicas (raro)',
        'Elevacao de transaminases (raro)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Proteinas plasmaticas',
        gravidade: 'moderada',
        efeito: 'Tizoxanida liga-se 99% a proteinas - pode deslocar outros farmacos',
        conduta: 'Monitorar farmacos altamente ligados (warfarina, fenitoina)'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario - excrecao renal e biliar' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Dados insuficientes. Evitar ou suspender amamentacao.'
    },
    monitorizacao: [
      'Exame parasitologico de fezes apos tratamento',
      'Melhora clinica da diarreia'
    ],
    orientacoesPaciente: [
      'Tomar com alimento para melhor absorcao',
      'Coloracao amarelada da urina e normal',
      'Completar 3 dias de tratamento',
      'Agitar bem a suspensao antes de usar'
    ],
    doencasRelacionadas: ['giardiase', 'criptosporidiose', 'amebiase', 'blastocistose'],
    tags: ['antiparasitario', 'antiprotozoario', 'giardiase', 'criptosporidiose', 'nitazoxanida'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // ==================== ANTIPROTOZOARIOS ====================

  // 6. BENZNIDAZOL
  {
    id: 'benznidazol',
    nomeGenerico: 'Benznidazol',
    nomesComerciais: ['Rochagan', 'Benznidazol LAFEPE'],
    atcCode: 'P01CA02',
    rxNormCui: '1110',
    drugBankId: 'DB11989',
    snomedCT: '387106002',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'nitroimidazol',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '12.5mg (pediatrico)', disponivelSUS: true }
    ],
    indicacoes: [
      'Doenca de Chagas aguda',
      'Doenca de Chagas congenita',
      'Doenca de Chagas cronica indeterminada (idade <50 anos)',
      'Reativacao de Chagas em imunossuprimidos',
      'Acidente com material biologico contendo T. cruzi'
    ],
    mecanismoAcao: 'Nitroimidazol que gera radicais livres e metabolitos eletrofilicos apos reducao do grupo nitro pela nitroredutase do parasita, causando dano ao DNA e morte do Trypanosoma cruzi.',
    posologias: [
      {
        indicacao: 'Doenca de Chagas aguda ou congenita',
        adultos: {
          dose: '5-7mg/kg/dia',
          frequencia: 'Dividido em 2-3 doses por 60 dias',
          doseMaxima: '300mg/dia'
        },
        pediatrico: {
          dose: '5-10mg/kg/dia',
          frequencia: 'Dividido em 2-3 doses por 60 dias',
          doseMaxima: '300mg/dia'
        }
      },
      {
        indicacao: 'Doenca de Chagas cronica',
        adultos: {
          dose: '5mg/kg/dia',
          frequencia: 'Dividido em 2 doses por 60 dias',
          observacoes: 'Beneficio maior em pacientes <50 anos e forma indeterminada.'
        }
      },
      {
        indicacao: 'Reativacao em imunossuprimidos',
        adultos: {
          dose: '5-7mg/kg/dia',
          frequencia: 'Dividido em 2-3 doses por 60-90 dias'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao benznidazol',
      'Gestacao',
      'Insuficiencia hepatica grave',
      'Insuficiencia renal grave'
    ],
    precaucoes: [
      'Dermatite alergica comum (ate 30%) - pode necessitar suspensao',
      'Neuropatia periferica dose-dependente',
      'Monitorar hemograma (leucopenia, agranulocitose)',
      'Evitar alcool (efeito dissulfiram)',
      'Fotossensibilidade - evitar exposicao solar'
    ],
    efeitosAdversos: {
      comuns: [
        'Rash cutaneo (30%)',
        'Prurido',
        'Nausea',
        'Anorexia',
        'Cefaleia',
        'Insonia'
      ],
      graves: [
        'Dermatite grave/Sindrome de Stevens-Johnson',
        'Neuropatia periferica',
        'Agranulocitose',
        'Hepatotoxicidade',
        'Depressao medular'
      ]
    },
    interacoes: [
      {
        medicamento: 'Alcool',
        gravidade: 'grave',
        efeito: 'Reacao tipo dissulfiram (nausea, vomitos, rubor)',
        conduta: 'Evitar alcool durante e 3 dias apos tratamento'
      },
      {
        medicamento: 'Fenitoina, Fenobarbital',
        gravidade: 'moderada',
        efeito: 'Podem reduzir niveis de benznidazol',
        conduta: 'Monitorar eficacia'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '10-50', ajuste: 'Reduzir dose em 50%' },
      { tfg: '<10', ajuste: 'Evitar uso' }
    ],
    gestacao: 'X',
    amamentacao: {
      compativel: false,
      observacao: 'Contraindicado. Excretado no leite.'
    },
    monitorizacao: [
      'Hemograma semanal nas primeiras 4 semanas',
      'Funcao hepatica mensal',
      'Funcao renal',
      'Sinais de neuropatia periferica',
      'Reacoes cutaneas'
    ],
    orientacoesPaciente: [
      'NAO consumir alcool durante tratamento',
      'Evitar exposicao solar intensa',
      'Relatar formigamento ou dormencia em maos/pes',
      'Relatar lesoes de pele ou febre',
      'Completar 60 dias de tratamento'
    ],
    doencasRelacionadas: ['doenca-chagas', 'chagas-agudo', 'chagas-cronico', 'trypanosoma-cruzi'],
    tags: ['antiparasitario', 'chagas', 'trypanosoma', 'nitroimidazol', 'doenca-neglicenciada'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 7. METRONIDAZOL
  {
    id: 'metronidazol',
    nomeGenerico: 'Metronidazol',
    nomesComerciais: ['Flagyl', 'Helmizol', 'Neo Metrodazol'],
    atcCode: 'P01AB01',
    rxNormCui: '6922',
    drugBankId: 'DB00916',
    snomedCT: '387263000',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'nitroimidazol',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '40mg/ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '500mg/100ml', disponivelSUS: true },
      { forma: 'gel_vaginal', concentracao: '100mg/g', disponivelSUS: true }
    ],
    indicacoes: [
      'Amebíase intestinal e hepatica (Entamoeba histolytica)',
      'Giardíase (Giardia lamblia)',
      'Tricomoníase (Trichomonas vaginalis)',
      'Vaginose bacteriana',
      'Infeccoes por anaerobios (Bacteroides, Clostridium)',
      'Colite pseudomembranosa por C. difficile',
      'Helicobacter pylori (esquema triplice)'
    ],
    mecanismoAcao: 'Pro-droga que e reduzida intracelularmente formando metabolitos citotoxicos que danificam DNA e outras biomoleculas. Ativo apenas em microorganismos anaerobios ou microaerofilos.',
    posologias: [
      {
        indicacao: 'Amebíase intestinal',
        adultos: {
          dose: '500-750mg',
          frequencia: '8/8h por 7-10 dias'
        },
        pediatrico: {
          dose: '35-50mg/kg/dia',
          frequencia: 'Dividido em 3 doses por 7-10 dias',
          doseMaxima: '750mg/dose'
        }
      },
      {
        indicacao: 'Giardíase',
        adultos: {
          dose: '250mg',
          frequencia: '8/8h por 5-7 dias'
        },
        pediatrico: {
          dose: '15mg/kg/dia',
          frequencia: 'Dividido em 3 doses por 5-7 dias'
        }
      },
      {
        indicacao: 'Tricomoníase',
        adultos: {
          dose: '2g',
          frequencia: 'Dose unica ou 500mg 12/12h por 7 dias',
          observacoes: 'Tratar parceiro sexual'
        }
      },
      {
        indicacao: 'Vaginose bacteriana',
        adultos: {
          dose: '500mg',
          frequencia: '12/12h por 7 dias',
          observacoes: 'Ou gel vaginal 5g 1x/dia por 5 dias'
        }
      },
      {
        indicacao: 'Infeccoes por anaerobios',
        adultos: {
          dose: '500mg',
          frequencia: '8/8h por 7-14 dias'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao metronidazol ou nitroimidazois',
      'Primeiro trimestre da gestacao (para indicacoes nao urgentes)',
      'Uso de dissulfiram nas ultimas 2 semanas',
      'Uso de alcool (reacao tipo dissulfiram)'
    ],
    precaucoes: [
      'Reacao tipo dissulfiram com alcool - evitar',
      'Neuropatia periferica em tratamento prolongado',
      'Pode escurecer a urina (metabolito)',
      'Gosto metalico comum',
      'Cautela em hepatopatia grave'
    ],
    efeitosAdversos: {
      comuns: [
        'Gosto metalico',
        'Nausea',
        'Cefaleia',
        'Anorexia',
        'Urina escura'
      ],
      graves: [
        'Neuropatia periferica (uso prolongado)',
        'Convulsoes',
        'Encefalopatia',
        'Leucopenia',
        'Pancreatite'
      ]
    },
    interacoes: [
      {
        medicamento: 'Alcool',
        gravidade: 'grave',
        efeito: 'Reacao tipo dissulfiram (nausea intensa, vomitos, rubor, taquicardia)',
        conduta: 'Evitar alcool durante e 48h apos tratamento'
      },
      {
        medicamento: 'Warfarina',
        gravidade: 'grave',
        efeito: 'Aumenta efeito anticoagulante - sangramento',
        conduta: 'Monitorar INR frequentemente, reduzir dose warfarina'
      },
      {
        medicamento: 'Litio',
        gravidade: 'grave',
        efeito: 'Aumenta niveis de litio - toxicidade',
        conduta: 'Monitorar niveis de litio'
      },
      {
        medicamento: 'Dissulfiram',
        gravidade: 'contraindicada',
        efeito: 'Psicose aguda, confusao mental',
        conduta: 'Intervalo minimo de 2 semanas'
      },
      {
        medicamento: 'Fenitoina',
        gravidade: 'moderada',
        efeito: 'Metronidazol reduz metabolismo da fenitoina',
        conduta: 'Monitorar niveis de fenitoina'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>10', ajuste: 'Sem ajuste necessario' },
      { tfg: '<10', ajuste: 'Reduzir dose em 50% ou aumentar intervalo' }
    ],
    gestacao: 'B',
    amamentacao: {
      compativel: false,
      observacao: 'Excretado no leite. Suspender amamentacao durante e 12-24h apos.'
    },
    monitorizacao: [
      'Exame parasitologico de fezes pos-tratamento',
      'Sinais de neuropatia periferica em uso prolongado',
      'INR se em warfarina',
      'Hemograma em tratamento prolongado'
    ],
    orientacoesPaciente: [
      'NAO consumir alcool durante e 48h apos tratamento',
      'Urina escura e normal',
      'Gosto metalico e temporario',
      'Completar tratamento mesmo se melhorar',
      'Tratar parceiro em tricomoníase'
    ],
    doencasRelacionadas: ['amebiase', 'giardiase', 'tricomoniase', 'vaginose-bacteriana', 'c-difficile'],
    tags: ['antiparasitario', 'nitroimidazol', 'amebiase', 'giardiase', 'anaerobios', 'vaginose'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 8. TINIDAZOL
  {
    id: 'tinidazol',
    nomeGenerico: 'Tinidazol',
    nomesComerciais: ['Pletil', 'Tindamax'],
    atcCode: 'P01AB02',
    rxNormCui: '10483',
    drugBankId: 'DB00911',
    snomedCT: '387538008',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'nitroimidazol',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Giardíase (Giardia lamblia)',
      'Amebíase intestinal (Entamoeba histolytica)',
      'Tricomoníase (Trichomonas vaginalis)',
      'Vaginose bacteriana'
    ],
    mecanismoAcao: 'Nitroimidazol de segunda geracao com meia-vida mais longa que metronidazol. Mesmo mecanismo: reducao intracelular gerando metabolitos que danificam DNA.',
    posologias: [
      {
        indicacao: 'Giardíase',
        adultos: {
          dose: '2g',
          frequencia: 'Dose unica'
        },
        pediatrico: {
          dose: '50mg/kg',
          frequencia: 'Dose unica',
          doseMaxima: '2g',
          idadeMinima: '>3 anos'
        }
      },
      {
        indicacao: 'Amebíase intestinal',
        adultos: {
          dose: '2g',
          frequencia: '1x/dia por 3 dias'
        },
        pediatrico: {
          dose: '50mg/kg/dia',
          frequencia: '1x/dia por 3 dias',
          doseMaxima: '2g/dia'
        }
      },
      {
        indicacao: 'Tricomoníase',
        adultos: {
          dose: '2g',
          frequencia: 'Dose unica',
          observacoes: 'Tratar parceiro simultaneamente'
        }
      },
      {
        indicacao: 'Vaginose bacteriana',
        adultos: {
          dose: '2g',
          frequencia: '1x/dia por 2 dias ou 1g 1x/dia por 5 dias'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a tinidazol ou nitroimidazois',
      'Primeiro trimestre da gestacao',
      'Uso concomitante de dissulfiram',
      'Amamentacao'
    ],
    precaucoes: [
      'Reacao tipo dissulfiram com alcool',
      'Neuropatia periferica em tratamento prolongado',
      'Monitorar hemograma em uso >10 dias',
      'Cautela em hepatopatia'
    ],
    efeitosAdversos: {
      comuns: [
        'Gosto metalico',
        'Nausea',
        'Anorexia',
        'Dispepsia',
        'Cefaleia'
      ],
      graves: [
        'Neuropatia periferica',
        'Convulsoes',
        'Leucopenia'
      ]
    },
    interacoes: [
      {
        medicamento: 'Alcool',
        gravidade: 'grave',
        efeito: 'Reacao tipo dissulfiram',
        conduta: 'Evitar alcool durante e 72h apos (meia-vida longa)'
      },
      {
        medicamento: 'Warfarina',
        gravidade: 'grave',
        efeito: 'Aumenta efeito anticoagulante',
        conduta: 'Monitorar INR'
      },
      {
        medicamento: 'Fenitoina, Fenobarbital',
        gravidade: 'moderada',
        efeito: 'Podem reduzir niveis de tinidazol',
        conduta: 'Monitorar eficacia'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Contraindicado. Suspender por 72h apos ultima dose.'
    },
    monitorizacao: [
      'Exame parasitologico de fezes pos-tratamento',
      'Sinais de neuropatia em uso prolongado'
    ],
    orientacoesPaciente: [
      'Tomar com alimento para reduzir desconforto GI',
      'NAO consumir alcool durante e 72h apos',
      'Tratar parceiro em tricomoníase',
      'Gosto metalico e temporario'
    ],
    doencasRelacionadas: ['giardiase', 'amebiase', 'tricomoniase', 'vaginose-bacteriana'],
    tags: ['antiparasitario', 'nitroimidazol', 'giardiase', 'amebiase', 'tricomoniase'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 9. SECNIDAZOL
  {
    id: 'secnidazol',
    nomeGenerico: 'Secnidazol',
    nomesComerciais: ['Secnidal', 'Solosec'],
    atcCode: 'P01AB07',
    rxNormCui: '9481',
    drugBankId: 'DB11711',
    snomedCT: '710289000',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'nitroimidazol',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1000mg', disponivelSUS: false },
      { forma: 'sache', concentracao: '2g', disponivelSUS: false }
    ],
    indicacoes: [
      'Giardíase',
      'Amebíase intestinal',
      'Tricomoníase',
      'Vaginose bacteriana'
    ],
    mecanismoAcao: 'Nitroimidazol de longa duracao. Meia-vida de ~20h permite dose unica. Mesmo mecanismo de acao dos outros nitroimidazois.',
    posologias: [
      {
        indicacao: 'Giardíase, Amebíase intestinal',
        adultos: {
          dose: '2g',
          frequencia: 'Dose unica'
        },
        pediatrico: {
          dose: '30mg/kg',
          frequencia: 'Dose unica',
          doseMaxima: '2g'
        }
      },
      {
        indicacao: 'Tricomoníase',
        adultos: {
          dose: '2g',
          frequencia: 'Dose unica',
          observacoes: 'Tratar parceiro'
        }
      },
      {
        indicacao: 'Vaginose bacteriana',
        adultos: {
          dose: '2g',
          frequencia: 'Dose unica oral'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao secnidazol ou nitroimidazois',
      'Gestacao (primeiro trimestre)',
      'Amamentacao'
    ],
    precaucoes: [
      'Reacao tipo dissulfiram com alcool',
      'Neuropatia em uso repetido/prolongado',
      'Vantagem: dose unica melhora adesao'
    ],
    efeitosAdversos: {
      comuns: [
        'Gosto metalico',
        'Nausea',
        'Dor abdominal'
      ],
      graves: [
        'Neuropatia periferica',
        'Reacoes alergicas'
      ]
    },
    interacoes: [
      {
        medicamento: 'Alcool',
        gravidade: 'grave',
        efeito: 'Reacao tipo dissulfiram',
        conduta: 'Evitar alcool durante e 72h apos'
      },
      {
        medicamento: 'Warfarina',
        gravidade: 'grave',
        efeito: 'Aumenta efeito anticoagulante',
        conduta: 'Monitorar INR'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Evitar. Suspender amamentacao por 96h apos dose.'
    },
    monitorizacao: [
      'Exame parasitologico de fezes pos-tratamento'
    ],
    orientacoesPaciente: [
      'Dose unica - vantagem de adesao',
      'Evitar alcool por 72h apos',
      'Tomar com alimento'
    ],
    doencasRelacionadas: ['giardiase', 'amebiase', 'tricomoniase', 'vaginose-bacteriana'],
    tags: ['antiparasitario', 'nitroimidazol', 'dose-unica', 'giardiase', 'tricomoniase'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // ==================== ANTIMALÁRICOS E OUTROS ====================

  // 10. PIRIMETAMINA
  {
    id: 'pirimetamina',
    nomeGenerico: 'Pirimetamina',
    nomesComerciais: ['Daraprim'],
    atcCode: 'P01BD01',
    rxNormCui: '8687',
    drugBankId: 'DB00205',
    snomedCT: '387411009',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'sulfonamida_inibidor_folato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Toxoplasmose (em combinacao com sulfadiazina)',
      'Toxoplasmose ocular',
      'Encefalite toxoplasmica em HIV/AIDS',
      'Profilaxia de toxoplasmose em HIV (CD4 <100)',
      'Isosporíase'
    ],
    mecanismoAcao: 'Inibe a di-hidrofolato redutase (DHFR) do parasita, bloqueando a sintese de acido tetra-hidrafolico necessario para sintese de DNA. Acao sinergica com sulfonamidas.',
    posologias: [
      {
        indicacao: 'Toxoplasmose cerebral (HIV)',
        adultos: {
          dose: '200mg dose de ataque, depois 50-75mg/dia',
          frequencia: '1x/dia por 6 semanas (minimo)',
          observacoes: 'Associar sulfadiazina 4-6g/dia + acido folinico 10-25mg/dia'
        }
      },
      {
        indicacao: 'Toxoplasmose ocular',
        adultos: {
          dose: '25-50mg/dia',
          frequencia: '1x/dia por 4-6 semanas',
          observacoes: 'Associar sulfadiazina e acido folinico'
        }
      },
      {
        indicacao: 'Profilaxia toxoplasmose (CD4 <100)',
        adultos: {
          dose: '25-50mg',
          frequencia: '1x/semana',
          observacoes: 'Associar dapsona ou sulfadiazina + leucovorin'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a pirimetamina',
      'Anemia megaloblastica por deficiencia de folato',
      'Gestacao (primeiro trimestre)',
      'Deficiencia de G6PD (em combinacao com dapsona)'
    ],
    precaucoes: [
      'SEMPRE associar acido folinico (leucovorin) para prevenir toxicidade medular',
      'Monitorar hemograma semanalmente',
      'Risco de anemia megaloblastica, leucopenia, trombocitopenia',
      'Manter boa hidratacao'
    ],
    efeitosAdversos: {
      comuns: [
        'Nausea',
        'Anorexia',
        'Vomitos',
        'Glossite'
      ],
      graves: [
        'Anemia megaloblastica',
        'Leucopenia/Agranulocitose',
        'Trombocitopenia',
        'Sindrome de Stevens-Johnson (raro)',
        'Convulsoes (superdose)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Metotrexato',
        gravidade: 'contraindicada',
        efeito: 'Toxicidade aditiva por inibicao de folato',
        conduta: 'Evitar combinacao'
      },
      {
        medicamento: 'Sulfonamidas',
        gravidade: 'moderada',
        efeito: 'Sinergismo terapeutico, mas aumento de toxicidade',
        conduta: 'Monitorar hemograma frequentemente'
      },
      {
        medicamento: 'Zidovudina',
        gravidade: 'moderada',
        efeito: 'Toxicidade hematologica aditiva',
        conduta: 'Monitorar hemograma'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste, mas monitorar toxicidade' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Excretado no leite. Evitar.'
    },
    monitorizacao: [
      'Hemograma 2x/semana nas primeiras 2 semanas, depois semanal',
      'Funcao hepatica e renal',
      'Sinais de toxicidade medular',
      'Resposta clinica/radiologica em toxoplasmose cerebral'
    ],
    orientacoesPaciente: [
      'SEMPRE tomar acido folinico junto (nao acido folico)',
      'Relatar sangramento, equimoses, febre',
      'Manter boa hidratacao',
      'Nao interromper sem orientacao medica'
    ],
    doencasRelacionadas: ['toxoplasmose', 'toxoplasmose-cerebral', 'toxoplasmose-ocular', 'hiv-aids'],
    tags: ['antiparasitario', 'antitoxoplasma', 'pirimetamina', 'hiv', 'oportunista'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 11. SULFADIAZINA
  {
    id: 'sulfadiazina',
    nomeGenerico: 'Sulfadiazina',
    nomesComerciais: ['Sulfadiazina generica'],
    atcCode: 'J01EC02',
    rxNormCui: '10181',
    drugBankId: 'DB00359',
    snomedCT: '74523009',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'sulfonamida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Toxoplasmose (em combinacao com pirimetamina)',
      'Toxoplasmose cerebral em HIV/AIDS',
      'Toxoplasmose congenita',
      'Nocardiose (alternativa)',
      'Profilaxia de febre reumatica (alternativa)'
    ],
    mecanismoAcao: 'Inibe a di-hidropteroato sintetase, bloqueando sintese de acido folico no parasita. Sinergismo com pirimetamina (bloqueio sequencial da via do folato).',
    posologias: [
      {
        indicacao: 'Toxoplasmose cerebral',
        adultos: {
          dose: '4-6g/dia',
          frequencia: 'Dividido em 4 doses (1-1.5g cada 6h)',
          observacoes: 'Associar pirimetamina + acido folinico. Duracao minima 6 semanas.'
        }
      },
      {
        indicacao: 'Toxoplasmose congenita',
        pediatrico: {
          dose: '100mg/kg/dia',
          frequencia: 'Dividido em 2-4 doses',
          doseMaxima: '4g/dia',
          observacoes: 'Tratamento por 12 meses'
        }
      },
      {
        indicacao: 'Profilaxia de toxoplasmose',
        adultos: {
          dose: '2-4g/dia',
          frequencia: 'Dividido em 2-4 doses',
          observacoes: 'Associar pirimetamina semanal'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a sulfonamidas',
      'Porfiria',
      'Anemia megaloblastica por deficiencia de folato',
      'Gestacao no termo (risco de kernicterus)',
      'Neonatos <2 meses (exceto toxoplasmose congenita)'
    ],
    precaucoes: [
      'Risco de cristaluria - manter hidratacao adequada (>2L/dia)',
      'Risco de reacoes cutaneas graves (SJS, TEN)',
      'Monitorar hemograma',
      'Evitar em deficiencia de G6PD',
      'Fotossensibilidade'
    ],
    efeitosAdversos: {
      comuns: [
        'Nausea',
        'Vomitos',
        'Rash cutaneo',
        'Cristaluria'
      ],
      graves: [
        'Sindrome de Stevens-Johnson/NET',
        'Anemia hemolitica (G6PD)',
        'Agranulocitose',
        'Hepatite',
        'Cristaluria/Nefrolitiase'
      ]
    },
    interacoes: [
      {
        medicamento: 'Pirimetamina',
        gravidade: 'moderada',
        efeito: 'Sinergismo terapeutico - uso intencional',
        conduta: 'Monitorar toxicidade hematologica'
      },
      {
        medicamento: 'Metotrexato',
        gravidade: 'grave',
        efeito: 'Aumenta toxicidade do metotrexato',
        conduta: 'Evitar combinacao'
      },
      {
        medicamento: 'Warfarina',
        gravidade: 'grave',
        efeito: 'Aumenta efeito anticoagulante',
        conduta: 'Monitorar INR frequentemente'
      },
      {
        medicamento: 'Fenitoina',
        gravidade: 'moderada',
        efeito: 'Aumenta niveis de fenitoina',
        conduta: 'Monitorar niveis'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Dose usual' },
      { tfg: '10-50', ajuste: 'Reduzir dose em 50%' },
      { tfg: '<10', ajuste: 'Evitar ou reduzir para 25% da dose' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: false,
      observacao: 'Evitar. Risco de kernicterus em neonatos.'
    },
    monitorizacao: [
      'Hemograma semanal inicialmente',
      'Funcao renal e exame de urina (cristaluria)',
      'Funcao hepatica',
      'Reacoes cutaneas'
    ],
    orientacoesPaciente: [
      'Beber bastante liquido (>2L/dia) para evitar cristaluria',
      'Relatar lesoes de pele imediatamente',
      'Evitar exposicao solar intensa',
      'Tomar com estomago vazio ou com alimento'
    ],
    doencasRelacionadas: ['toxoplasmose', 'toxoplasmose-cerebral', 'toxoplasmose-congenita', 'nocardiose'],
    tags: ['antiparasitario', 'sulfonamida', 'toxoplasmose', 'hiv', 'sulfadiazina'],
    citations: [],
    lastUpdate: '2024-12-01'
  },

  // 12. CLOROQUINA
  {
    id: 'cloroquina',
    nomeGenerico: 'Cloroquina (Difosfato)',
    nomesComerciais: ['Aralen', 'Cloroquina generica'],
    atcCode: 'P01BA01',
    rxNormCui: '2393',
    drugBankId: 'DB00608',
    snomedCT: '387505006',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'sistemico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '150mg base (250mg difosfato)', disponivelSUS: true }
    ],
    indicacoes: [
      'Malaria por P. vivax (areas sensiveis)',
      'Malaria por P. malariae, P. ovale',
      'Profilaxia de malaria em areas sensiveis',
      'Artrite reumatoide (DMARD)',
      'Lupus eritematoso sistemico',
      'Amebiase hepatica (adjuvante)'
    ],
    mecanismoAcao: 'Acumula-se no vacuolo alimentar do parasita, interferindo na detoxificacao do heme e sintese de acidos nucleicos. Efeito imunomodulador em doencas autoimunes.',
    posologias: [
      {
        indicacao: 'Malaria P. vivax - Tratamento',
        adultos: {
          dose: '600mg base D1, depois 300mg base D2-3',
          frequencia: 'Total 1500mg base em 3 dias',
          observacoes: 'Associar primaquina para erradicacao de hipnozoitos'
        },
        pediatrico: {
          dose: '10mg base/kg D1, depois 5mg/kg D2-3',
          frequencia: 'Total 25mg base/kg em 3 dias'
        }
      },
      {
        indicacao: 'Profilaxia de malaria',
        adultos: {
          dose: '300mg base (500mg sal)',
          frequencia: '1x/semana',
          observacoes: 'Iniciar 1-2 semanas antes e manter 4 semanas apos sair de area endemica'
        },
        pediatrico: {
          dose: '5mg base/kg',
          frequencia: '1x/semana',
          doseMaxima: '300mg base'
        }
      },
      {
        indicacao: 'Lupus/Artrite reumatoide',
        adultos: {
          dose: '250-500mg/dia (150-300mg base)',
          frequencia: '1x/dia',
          observacoes: 'Resposta em semanas-meses. Monitorar retina.'
        }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a cloroquina ou 4-aminoquinolinas',
      'Retinopatia pre-existente',
      'Psoriase (pode exacerbar)',
      'Miastenia gravis',
      'Deficiencia de G6PD (cautela)'
    ],
    precaucoes: [
      'Retinopatia irreversivel - exame oftalmologico anual em uso cronico',
      'Prolonga intervalo QT - cautela com outros farmacos que prolongam QT',
      'Hipoglicemia',
      'Convulsoes em superdose',
      'RESISTENCIA: P. falciparum resistente na maioria das areas'
    ],
    efeitosAdversos: {
      comuns: [
        'Nausea',
        'Diarreia',
        'Cefaleia',
        'Prurido',
        'Disturbios visuais (visao turva)'
      ],
      graves: [
        'Retinopatia (uso cronico)',
        'Cardiotoxicidade (prolongamento QT)',
        'Hipoglicemia grave',
        'Convulsoes',
        'Agranulocitose (raro)'
      ]
    },
    interacoes: [
      {
        medicamento: 'Farmacos que prolongam QT',
        gravidade: 'grave',
        efeito: 'Risco aditivo de arritmias (torsades de pointes)',
        conduta: 'Evitar combinacao (amiodarona, haloperidol, macrolideos)'
      },
      {
        medicamento: 'Mefloquina',
        gravidade: 'grave',
        efeito: 'Risco aumentado de convulsoes',
        conduta: 'Intervalo de pelo menos 12h'
      },
      {
        medicamento: 'Ciclosporina',
        gravidade: 'moderada',
        efeito: 'Aumenta niveis de ciclosporina',
        conduta: 'Monitorar niveis'
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Aumenta niveis de digoxina',
        conduta: 'Monitorar digoxinemia'
      }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '10-50', ajuste: 'Reduzir dose em 50%' },
      { tfg: '<10', ajuste: 'Reduzir dose em 50-75%' }
    ],
    gestacao: 'C',
    amamentacao: {
      compativel: true,
      observacao: 'Excretada em pequenas quantidades. Compativel em doses terapeuticas.'
    },
    monitorizacao: [
      'Exame oftalmologico (fundo de olho/campo visual) anual em uso >5 anos',
      'ECG basal e periodico',
      'Glicemia',
      'Hemograma em tratamento prolongado',
      'Gota espessa em malaria'
    ],
    orientacoesPaciente: [
      'Tomar com alimento para reduzir desconforto GI',
      'Relatar alteracoes visuais imediatamente',
      'Usar protecao solar',
      'Em profilaxia: manter mesmo apos retorno por 4 semanas'
    ],
    doencasRelacionadas: ['malaria', 'malaria-vivax', 'lupus', 'artrite-reumatoide'],
    tags: ['antiparasitario', 'antimalarico', 'cloroquina', 'malaria', 'lupus', 'artrite-reumatoide'],
    citations: [],
    lastUpdate: '2024-12-01'
  }
];

// Export para uso no index consolidado
export default antiparasitariosNovos;
