/**
 * DOENCAS INFECCIOSAS TROPICAIS EXTRAS - DARWIN-MFC EXPANSAO 800
 * ===============================================================
 * 12 doencas tropicais/infecciosas adicionais
 */

import { Doenca } from '@/lib/types/doenca';

export const infecciosasTropicaisExtras: Doenca[] = [
  // ============================================================================
  // 1. FEBRE AMARELA
  // ============================================================================
  {
    id: 'febre-amarela',
    titulo: 'Febre Amarela',
    sinonimos: ['Yellow fever', 'Tifo icteroides'],
    doid: 'DOID:9682',
    snomedCT: '16541001',
    meshId: 'D015004',
    ciap2: ['A77'],
    cid10: ['A95'],
    cid11: ['1D47'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Arbovirose aguda causada pelo virus da febre amarela (Flavivirus), transmitida por mosquitos Haemagogus/Sabethes (silvestre) ou Aedes aegypti (urbana). Hepatite e hemorragia nos casos graves.',
      criteriosDiagnosticos: [
        'Febre subita + ictericia + manifestacoes hemorragicas',
        'Viagem para area endemica 3-6 dias antes',
        'Sinal de Faget (dissociacao pulso-temperatura)',
        'RT-PCR ou isolamento viral (ate 5o dia)',
        'IgM positivo (apos 5o dia)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte clinico intensivo', 'Hidratacao venosa', 'Monitorar coagulopatia'],
        farmacologico: ['NAO HA TRATAMENTO ESPECIFICO', 'Suporte: cristaloides IV', 'Vitamina K se coagulopatia', 'Plasma fresco se sangramento']
      },
      metasTerapeuticas: ['Suporte hemodinamico', 'Correcao de coagulopatia', 'Prevencao de complicacoes'],
      examesIniciais: ['Hemograma', 'Bilirrubinas, TGO, TGP', 'Coagulograma', 'Ureia, creatinina', 'RT-PCR ou IgM'],
      redFlags: ['Ictericia intensa', 'Hemorragias', 'Oliguria/anuria', 'Encefalopatia', 'Choque']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Endemica na Amazonia; surtos em MG, ES, SP, RJ',
        mortalidade: '20-50% nos casos graves',
        faixaEtaria: 'Todas as idades nao vacinadas',
        fatoresRisco: ['Nao vacinado', 'Exposicao em area silvestre', 'Atividades rurais/florestais'],
        citations: [{ refId: 'ms-febre-amarela-2024' }]
      },
      fisiopatologia: {
        texto: 'Virus replica em linfonodos, dissemina para figado, rins e coracao. Necrose hepatica mediozonal caracteristica. Coagulopatia por lesao hepatica e CIVD.',
        citations: [{ refId: 'who-yellow-fever-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Febre alta subita', 'Cefaleia intensa', 'Mialgia', 'Ictericia', 'Hemorragias'],
        sinaisExameFisico: ['Ictericia', 'Sinal de Faget', 'Hepatomegalia dolorosa', 'Petequias'],
        formasClinicas: ['Leve/moderada', 'Grave (hepatorrenal)'],
        citations: [{ refId: 'ms-febre-amarela-2024' }]
      },
      diagnostico: {
        criterios: ['Clinico-epidemiologico', 'RT-PCR (ate D5)', 'IgM (apos D5)', 'Histopatologia hepatica post-mortem'],
        diagnosticoDiferencial: ['Leptospirose', 'Hepatites virais', 'Dengue grave', 'Malaria'],
        examesLaboratoriais: ['RT-PCR', 'IgM ELISA', 'Hemograma', 'Hepatograma', 'Coagulograma'],
        citations: [{ refId: 'ms-febre-amarela-2024' }]
      },
      tratamento: {
        objetivos: ['Suporte intensivo', 'Prevenir complicacoes'],
        naoFarmacologico: {
          medidas: ['UTI para casos graves', 'Hidratacao IV', 'Monitoramento continuo'],
          citations: [{ refId: 'who-yellow-fever-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Suporte', medicamentos: ['Cristaloides IV', 'Vitamina K', 'Plasma fresco'], observacoes: 'Nao ha antiviral especifico' }
          ],
          citations: [{ refId: 'ms-febre-amarela-2024' }]
        },
        duracao: 'Ate recuperacao clinica'
      },
      acompanhamento: {
        frequenciaConsultas: 'Diario durante internacao; semanal apos alta',
        metasTerapeuticas: ['Recuperacao funcao hepatica', 'Normalizacao hematologica'],
        criteriosEncaminhamento: ['Sempre: hospital de referencia', 'UTI se grave'],
        citations: [{ refId: 'ms-febre-amarela-2024' }]
      },
      prevencao: {
        primaria: ['Vacinacao (dose unica vitalicia)', 'Evitar areas de surto se nao vacinado'],
        secundaria: ['Vigilancia epidemiologica', 'Notificacao compulsoria imediata'],
        citations: [{ refId: 'who-yellow-fever-2023' }]
      }
    },
    protocolos: ['febre-amarela-manejo'],
    medicamentos: [],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-febre-amarela-2024' }, { refId: 'who-yellow-fever-2023' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 2. ZIKA
  // ============================================================================
  {
    id: 'zika-virus',
    titulo: 'Zika',
    sinonimos: ['Infeccao por virus Zika', 'Zika virus disease'],
    doid: 'DOID:0060478',
    snomedCT: '3928002',
    meshId: 'D000071243',
    ciap2: ['A77'],
    cid10: ['A92.5'],
    cid11: ['1D2L'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Arbovirose causada pelo virus Zika (Flavivirus), transmitida pelo Aedes aegypti. Geralmente leve, porem associada a sindrome congenita do Zika e Guillain-Barre.',
      criteriosDiagnosticos: [
        'Exantema maculopapular pruriginoso',
        'Febre baixa ou ausente',
        'Conjuntivite nao purulenta',
        'Artralgia de pequenas articulacoes',
        'RT-PCR em soro/urina (ate D5)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso', 'Hidratacao oral', 'Evitar AINEs (diagnostico diferencial com dengue)'],
        farmacologico: ['Paracetamol 500-750mg 6/6h', 'Anti-histaminico para prurido']
      },
      metasTerapeuticas: ['Alivio sintomatico', 'Vigilancia de complicacoes neurologicas'],
      examesIniciais: ['RT-PCR Zika (soro/urina)', 'IgM Zika', 'Hemograma'],
      redFlags: ['Sintomas neurologicos', 'Paralisia ascendente (Guillain-Barre)', 'Gestante infectada']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Epidemia 2015-2016 no Brasil; casos esporadicos atualmente',
        faixaEtaria: 'Todas as idades',
        fatoresRisco: ['Area endemica', 'Gestacao (risco congenito)', 'Transmissao sexual'],
        citations: [{ refId: 'ms-zika-2024' }]
      },
      fisiopatologia: {
        texto: 'Virus replica em celulas dendriticas e fibroblastos. Neurotropismo explica Guillain-Barre e microcefalia fetal.',
        citations: [{ refId: 'who-zika-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Exantema pruriginoso', 'Febre baixa', 'Conjuntivite', 'Artralgia', 'Mialgia leve'],
        sinaisExameFisico: ['Exantema maculopapular', 'Hiperemia conjuntival', 'Edema articular discreto'],
        formasClinicas: ['Assintomatica (80%)', 'Sintomatica leve', 'Complicada (Guillain-Barre)'],
        citations: [{ refId: 'ms-zika-2024' }]
      },
      diagnostico: {
        criterios: ['Clinico-epidemiologico', 'RT-PCR (ate D5)', 'IgM (reatividade cruzada com dengue)'],
        diagnosticoDiferencial: ['Dengue', 'Chikungunya', 'Rubeola', 'Sarampo'],
        examesLaboratoriais: ['RT-PCR', 'IgM/IgG ELISA', 'PRNT para confirmacao'],
        citations: [{ refId: 'who-zika-2023' }]
      },
      tratamento: {
        objetivos: ['Alivio sintomatico', 'Vigilancia de complicacoes'],
        naoFarmacologico: {
          medidas: ['Repouso', 'Hidratacao oral', 'Protecao contra mosquitos'],
          citations: [{ refId: 'ms-zika-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analgesico', medicamentos: ['Paracetamol 500-750mg'], posologia: '6/6h' },
            { classe: 'Anti-histaminico', medicamentos: ['Loratadina 10mg'], posologia: '1x/dia' }
          ],
          citations: [{ refId: 'ms-zika-2024' }]
        },
        duracao: '3-7 dias (autolimitada)'
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno se piora ou sintomas neurologicos',
        metasTerapeuticas: ['Resolucao espontanea', 'Ausencia de complicacoes'],
        criteriosEncaminhamento: ['Guillain-Barre: neurologia/UTI', 'Gestante: pre-natal alto risco'],
        citations: [{ refId: 'who-zika-2023' }]
      },
      prevencao: {
        primaria: ['Controle do vetor', 'Repelentes', 'Preservativo (transmissao sexual)'],
        secundaria: ['Acompanhamento de gestantes', 'Vigilancia de microcefalia'],
        citations: [{ refId: 'ms-zika-2024' }]
      }
    },
    protocolos: ['zika-manejo'],
    medicamentos: ['paracetamol'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-zika-2024' }, { refId: 'who-zika-2023' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 3. CHIKUNGUNYA
  // ============================================================================
  {
    id: 'chikungunya',
    titulo: 'Chikungunya',
    sinonimos: ['Febre chikungunya', 'Artrite chikungunya'],
    doid: 'DOID:0050012',
    snomedCT: '111864006',
    meshId: 'D018354',
    ciap2: ['A77'],
    cid10: ['A92.0'],
    cid11: ['1D2K'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Arbovirose causada pelo virus Chikungunya (Alphavirus), transmitida pelo Aedes. Caracterizada por febre e poliartralgia intensa, com cronificacao articular frequente.',
      criteriosDiagnosticos: [
        'Febre alta de inicio subito',
        'Poliartralgia bilateral simetrica intensa',
        'Edema articular',
        'Exantema maculopapular',
        'RT-PCR ou IgM positivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso', 'Crioterapia articular', 'Fisioterapia na fase cronica'],
        farmacologico: ['FASE AGUDA: Paracetamol + Dipirona', 'FASE POS-AGUDA: AINEs (naproxeno, ibuprofeno)', 'FASE CRONICA: Metotrexato ou hidroxicloroquina']
      },
      metasTerapeuticas: ['Controle da dor', 'Prevencao de incapacidade articular'],
      examesIniciais: ['Hemograma', 'PCR, VHS', 'RT-PCR Chikungunya', 'IgM/IgG'],
      redFlags: ['Manifestacoes atipicas (encefalite, miocardite)', 'Descompensacao de comorbidades', 'Dor refrataria']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Endemica no Brasil desde 2014',
        faixaEtaria: 'Todas as idades; idosos com maior risco de cronificacao',
        fatoresRisco: ['Area endemica', 'Idade >45 anos', 'Sexo feminino', 'Artropatia previa'],
        citations: [{ refId: 'ms-chikungunya-2024' }]
      },
      fisiopatologia: {
        texto: 'Virus tem tropismo por fibroblastos sinoviais e musculares. Persistencia viral nas articulacoes explica artralgia cronica.',
        citations: [{ refId: 'who-chikungunya-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Febre alta', 'Poliartralgia incapacitante', 'Edema articular', 'Exantema', 'Mialgia'],
        sinaisExameFisico: ['Artrite de maos, pes, tornozelos', 'Tenossinovite', 'Rigidez matinal'],
        formasClinicas: ['Aguda (<21 dias)', 'Pos-aguda (21 dias-3 meses)', 'Cronica (>3 meses)'],
        citations: [{ refId: 'ms-chikungunya-2024' }]
      },
      diagnostico: {
        criterios: ['Clinico-epidemiologico', 'RT-PCR (ate D8)', 'IgM (apos D5)'],
        diagnosticoDiferencial: ['Dengue', 'Zika', 'Artrite reumatoide', 'Artrite reativa'],
        examesLaboratoriais: ['RT-PCR', 'IgM ELISA', 'Hemograma', 'PCR, VHS', 'Fator reumatoide'],
        citations: [{ refId: 'ms-chikungunya-2024' }]
      },
      tratamento: {
        objetivos: ['Controle da dor', 'Prevenir cronificacao', 'Reabilitacao funcional'],
        naoFarmacologico: {
          medidas: ['Repouso na fase aguda', 'Fisioterapia', 'Compressas frias'],
          citations: [{ refId: 'ms-chikungunya-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analgesico', medicamentos: ['Paracetamol 1g', 'Dipirona 1g'], posologia: '6/6h', observacoes: 'Fase aguda' }
          ],
          segundaLinha: [
            { classe: 'AINE', medicamentos: ['Naproxeno 500mg 12/12h', 'Ibuprofeno 600mg 8/8h'], observacoes: 'Fase pos-aguda' },
            { classe: 'DMARD', medicamentos: ['Metotrexato 15mg/sem', 'Hidroxicloroquina 400mg/dia'], observacoes: 'Fase cronica refrataria' }
          ],
          citations: [{ refId: 'ms-chikungunya-2024' }]
        },
        duracao: 'Aguda: semanas; Cronica: meses a anos'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal na fase aguda; mensal na cronica',
        metasTerapeuticas: ['Resolucao da dor', 'Funcao articular preservada'],
        criteriosEncaminhamento: ['Cronificacao >3 meses: reumatologia', 'Formas atipicas: hospital'],
        citations: [{ refId: 'ms-chikungunya-2024' }]
      },
      prevencao: {
        primaria: ['Controle do Aedes', 'Repelentes', 'Telas'],
        secundaria: ['Fisioterapia precoce', 'Tratamento otimizado'],
        citations: [{ refId: 'who-chikungunya-2023' }]
      }
    },
    protocolos: ['chikungunya-manejo'],
    medicamentos: ['paracetamol', 'naproxeno', 'metotrexato'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-chikungunya-2024' }, { refId: 'who-chikungunya-2023' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 4. LEPTOSPIROSE
  // ============================================================================
  {
    id: 'leptospirose',
    titulo: 'Leptospirose',
    sinonimos: ['Doenca de Weil', 'Febre dos alagados', 'Ictericia hemorragica'],
    doid: 'DOID:2297',
    snomedCT: '77377001',
    meshId: 'D007922',
    ciap2: ['A78'],
    cid10: ['A27'],
    cid11: ['1B91'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Zoonose causada por espiroquetas do genero Leptospira, transmitida por contato com agua/lama contaminadas por urina de roedores. Forma grave (Weil): ictericia + IRA + hemorragia.',
      criteriosDiagnosticos: [
        'Febre + mialgia intensa (panturrilhas)',
        'Exposicao a agua de enchente/esgoto',
        'Sufusao conjuntival',
        'Ictericia rubínica (alaranjada)',
        'ELISA IgM ou MAT positivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratacao venosa', 'Dialise se IRA', 'Suporte ventilatório se hemorragia pulmonar'],
        farmacologico: ['LEVE: Doxiciclina 100mg 12/12h VO 7d', 'MODERADA/GRAVE: Penicilina G 1,5MI 6/6h IV', 'Alternativa: Ceftriaxona 1g/dia IV']
      },
      metasTerapeuticas: ['Eliminacao da espiroqueta', 'Suporte renal', 'Prevencao de hemorragia pulmonar'],
      examesIniciais: ['Hemograma', 'Ureia, creatinina', 'Bilirrubinas', 'CPK', 'ELISA IgM'],
      redFlags: ['Ictericia', 'Oliguria', 'Hemoptise', 'Dispneia (SHPS)', 'Plaquetopenia grave']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '3.000-4.000 casos/ano no Brasil',
        mortalidade: '10-15% na forma grave',
        faixaEtaria: 'Adultos jovens (20-49 anos)',
        fatoresRisco: ['Enchentes', 'Trabalhadores de saneamento', 'Moradia em areas alagaveis'],
        citations: [{ refId: 'ms-leptospirose-2024' }]
      },
      fisiopatologia: {
        texto: 'Leptospiras penetram por mucosas/pele, disseminam por via hematogenica. Vasculite causa lesao endotelial em rins, figado e pulmoes.',
        citations: [{ refId: 'who-leptospirosis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Febre alta', 'Mialgia em panturrilhas', 'Cefaleia', 'Ictericia', 'Oliguria'],
        sinaisExameFisico: ['Sufusao conjuntival', 'Ictericia rubínica', 'Hepatomegalia dolorosa', 'Desidratacao'],
        formasClinicas: ['Anicterica (90%)', 'Icterica/Weil (10%)', 'Hemorragica pulmonar (SHPS)'],
        citations: [{ refId: 'ms-leptospirose-2024' }]
      },
      diagnostico: {
        criterios: ['Clinico-epidemiologico', 'ELISA IgM', 'MAT (padrao-ouro)'],
        diagnosticoDiferencial: ['Dengue grave', 'Febre amarela', 'Hepatites', 'Malaria'],
        examesLaboratoriais: ['ELISA IgM', 'MAT', 'Hemograma', 'Funcao renal/hepatica', 'CPK'],
        citations: [{ refId: 'ms-leptospirose-2024' }]
      },
      tratamento: {
        objetivos: ['Eliminar leptospiras', 'Suporte organico'],
        naoFarmacologico: {
          medidas: ['Hidratacao IV', 'Dialise se IRA', 'Ventilacao mecanica se SHPS'],
          citations: [{ refId: 'ms-leptospirose-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antibiotico (leve)', medicamentos: ['Doxiciclina 100mg'], posologia: '12/12h VO por 7 dias' },
            { classe: 'Antibiotico (grave)', medicamentos: ['Penicilina G cristalina 1,5MI'], posologia: '6/6h IV por 7 dias' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['Ceftriaxona 1g/dia IV'], observacoes: 'Se alergia a penicilina' }
          ],
          citations: [{ refId: 'who-leptospirosis-2023' }]
        },
        duracao: '7 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Diario durante internacao; semanal apos alta',
        metasTerapeuticas: ['Recuperacao funcao renal', 'Resolucao ictericia'],
        criteriosEncaminhamento: ['Forma grave: UTI', 'IRA: nefrologia'],
        citations: [{ refId: 'ms-leptospirose-2024' }]
      },
      prevencao: {
        primaria: ['Saneamento basico', 'Controle de roedores', 'Evitar agua de enchente'],
        secundaria: ['Quimioprofilaxia pos-exposicao: Doxiciclina 200mg/semana'],
        citations: [{ refId: 'who-leptospirosis-2023' }]
      }
    },
    protocolos: ['leptospirose-manejo'],
    medicamentos: ['doxiciclina', 'penicilina-g', 'ceftriaxona'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-leptospirose-2024' }, { refId: 'who-leptospirosis-2023' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 5. HANTAVIROSE
  // ============================================================================
  {
    id: 'hantavirose',
    titulo: 'Hantavirose',
    sinonimos: ['Sindrome cardiopulmonar por hantavirus', 'SCPH', 'Hantavirus pulmonary syndrome'],
    doid: 'DOID:0050196',
    snomedCT: '713084008',
    meshId: 'D018804',
    ciap2: ['R99'],
    cid10: ['B33.4'],
    cid11: ['1D60'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Zoonose viral grave causada por hantavirus, transmitida por inalacao de aeroissois de excretas de roedores silvestres. Alta letalidade por edema pulmonar e choque.',
      criteriosDiagnosticos: [
        'Febre + mialgia + cefaleia',
        'Dispneia de evolucao rapida',
        'Exposicao a roedores/ambiente rural',
        'Radiografia com infiltrado bilateral',
        'IgM ou RT-PCR positivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['UTI precoce', 'Ventilacao mecanica protetora', 'Evitar sobrecarga hidrica'],
        farmacologico: ['NAO HA ANTIVIRAL ESPECIFICO', 'Suporte: vasopressores', 'ECMO em casos refratarios']
      },
      metasTerapeuticas: ['Suporte ventilatório', 'Estabilidade hemodinamica', 'Prevencao de SDRA'],
      examesIniciais: ['Hemograma (plaquetopenia, hemoconcentracao)', 'Rx torax', 'Lactato', 'IgM hantavirus'],
      redFlags: ['Dispneia progressiva', 'Hipotensao', 'Hemoconcentracao', 'Plaquetopenia', 'Edema pulmonar']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '100-200 casos/ano no Brasil',
        mortalidade: '40-50%',
        faixaEtaria: 'Adultos em atividades rurais',
        fatoresRisco: ['Trabalhadores rurais', 'Limpeza de silos/galpoes', 'Exposicao a roedores'],
        citations: [{ refId: 'ms-hantavirose-2024' }]
      },
      fisiopatologia: {
        texto: 'Virus infecta endotelio pulmonar causando aumento da permeabilidade capilar. Edema pulmonar nao cardiogenico e choque distributivo.',
        citations: [{ refId: 'cdc-hantavirus-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Febre', 'Mialgia', 'Cefaleia', 'Dispneia rapidamente progressiva', 'Tosse'],
        sinaisExameFisico: ['Taquipneia', 'Hipoxemia', 'Hipotensao', 'Estertores pulmonares'],
        formasClinicas: ['Prodromica', 'Cardiopulmonar', 'Convalescenca'],
        citations: [{ refId: 'ms-hantavirose-2024' }]
      },
      diagnostico: {
        criterios: ['Clinico-epidemiologico', 'IgM (ELISA)', 'RT-PCR', 'Imuno-histoquimica'],
        diagnosticoDiferencial: ['Pneumonia comunitaria', 'Influenza', 'COVID-19', 'Leptospirose'],
        examesLaboratoriais: ['IgM/IgG ELISA', 'RT-PCR', 'Hemograma', 'Gasometria'],
        examesImagem: ['Rx torax (infiltrado bilateral)', 'TC torax'],
        citations: [{ refId: 'ms-hantavirose-2024' }]
      },
      tratamento: {
        objetivos: ['Suporte intensivo', 'Ventilacao protetora', 'Estabilidade hemodinamica'],
        naoFarmacologico: {
          medidas: ['UTI imediata', 'VM protetora', 'ECMO se refratario'],
          citations: [{ refId: 'cdc-hantavirus-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Suporte', medicamentos: ['Noradrenalina', 'Dobutamina'], observacoes: 'Vasopressores para choque' }
          ],
          citations: [{ refId: 'ms-hantavirose-2024' }]
        },
        duracao: 'Variavel conforme evolucao'
      },
      acompanhamento: {
        frequenciaConsultas: 'Continuo em UTI; semanal apos alta',
        metasTerapeuticas: ['Sobrevivencia', 'Recuperacao pulmonar'],
        criteriosEncaminhamento: ['Sempre: UTI de referencia'],
        citations: [{ refId: 'ms-hantavirose-2024' }]
      },
      prevencao: {
        primaria: ['Controle de roedores', 'Ventilar ambientes fechados antes de entrar', 'EPI em atividades de risco'],
        secundaria: ['Notificacao compulsoria', 'Investigacao epidemiologica'],
        citations: [{ refId: 'cdc-hantavirus-2023' }]
      }
    },
    protocolos: ['hantavirose-manejo'],
    medicamentos: [],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-hantavirose-2024' }, { refId: 'cdc-hantavirus-2023' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 6. HISTOPLASMOSE
  // ============================================================================
  {
    id: 'histoplasmose',
    titulo: 'Histoplasmose',
    sinonimos: ['Histoplasmosis', 'Doenca de Darling'],
    doid: 'DOID:11552',
    snomedCT: '12962009',
    meshId: 'D006660',
    ciap2: ['R83'],
    cid10: ['B39'],
    cid11: ['1F2C'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Micose sistemica causada por Histoplasma capsulatum, adquirida por inalacao de esporos em cavernas/galinheiros. Formas: pulmonar aguda, cronica e disseminada (HIV).',
      criteriosDiagnosticos: [
        'Exposicao a cavernas, galinheiros, morcegos',
        'Pneumonia com infiltrado difuso',
        'Hepatoesplenomegalia (disseminada)',
        'Antigeno urinario positivo',
        'Cultura ou histopatologia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suporte respiratorio', 'Nutricao adequada'],
        farmacologico: ['LEVE: Itraconazol 200mg 12/12h por 6-12 semanas', 'GRAVE: Anfotericina B lipossomal 3mg/kg/dia 1-2 semanas, depois itraconazol', 'DISSEMINADA/HIV: AnfoB + Itraconazol prolongado']
      },
      metasTerapeuticas: ['Erradicacao do fungo', 'Prevencao de recidiva em HIV'],
      examesIniciais: ['Rx/TC torax', 'Antigeno urinario Histoplasma', 'Hemograma', 'LDH', 'Funcao hepatica'],
      redFlags: ['Insuficiencia respiratoria', 'Disseminacao em imunossuprimido', 'Choque septico']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Endemica no Brasil (Centro-Oeste, Sudeste)',
        faixaEtaria: 'Todas as idades',
        fatoresRisco: ['Espeleologia', 'Exposicao a galinheiros', 'Imunossupressao (HIV, transplante)'],
        citations: [{ refId: 'idsa-histoplasmosis-2020' }]
      },
      fisiopatologia: {
        texto: 'Esporos inalados sao fagocitados por macrofagos. Em imunocompetentes, granulomas contém a infeccao. Em imunossuprimidos, disseminacao hematogenica.',
        citations: [{ refId: 'who-fungal-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Febre', 'Tosse seca', 'Dispneia', 'Perda de peso', 'Hepatoesplenomegalia (disseminada)'],
        sinaisExameFisico: ['Estertores pulmonares', 'Hepatomegalia', 'Esplenomegalia', 'Lesoes cutaneas (disseminada)'],
        formasClinicas: ['Pulmonar aguda', 'Pulmonar cronica', 'Disseminada progressiva'],
        citations: [{ refId: 'idsa-histoplasmosis-2020' }]
      },
      diagnostico: {
        criterios: ['Clinico-epidemiologico', 'Antigeno urinario (sensivel)', 'Cultura (lenta)', 'Histopatologia'],
        diagnosticoDiferencial: ['Tuberculose', 'Paracoccidioidomicose', 'Sarcoidose', 'Linfoma'],
        examesLaboratoriais: ['Antigeno urinario', 'Cultura', 'Sorologia', 'Biopsia'],
        examesImagem: ['Rx torax', 'TC torax'],
        citations: [{ refId: 'idsa-histoplasmosis-2020' }]
      },
      tratamento: {
        objetivos: ['Erradicacao do fungo', 'Prevencao de recidiva'],
        naoFarmacologico: {
          medidas: ['Suporte ventilatório se necessario', 'TARV em HIV+'],
          citations: [{ refId: 'idsa-histoplasmosis-2020' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Azolico', medicamentos: ['Itraconazol 200mg'], posologia: '12/12h por 6-12 semanas', observacoes: 'Formas leves/moderadas' }
          ],
          segundaLinha: [
            { classe: 'Polienico', medicamentos: ['Anfotericina B lipossomal 3mg/kg/dia'], observacoes: 'Formas graves; seguido de itraconazol' }
          ],
          citations: [{ refId: 'idsa-histoplasmosis-2020' }]
        },
        duracao: 'Leve: 6-12 semanas; Grave: 12+ meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal durante tratamento; trimestral apos',
        metasTerapeuticas: ['Cura clinica', 'Antigeno negativo'],
        criteriosEncaminhamento: ['Disseminada: infectologia', 'HIV+: servico especializado'],
        citations: [{ refId: 'idsa-histoplasmosis-2020' }]
      },
      prevencao: {
        primaria: ['Evitar exposicao a cavernas/galinheiros sem EPI', 'Mascara N95 em atividades de risco'],
        secundaria: ['Profilaxia secundaria em HIV+ com CD4<150'],
        citations: [{ refId: 'who-fungal-2022' }]
      }
    },
    protocolos: ['histoplasmose-manejo'],
    medicamentos: ['itraconazol', 'anfotericina-b-lipossomal'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'idsa-histoplasmosis-2020' }, { refId: 'who-fungal-2022' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 7. PARACOCCIDIOIDOMICOSE
  // ============================================================================
  {
    id: 'paracoccidioidomicose',
    titulo: 'Paracoccidioidomicose',
    sinonimos: ['PCM', 'Blastomicose sul-americana', 'Doenca de Lutz'],
    doid: 'DOID:11551',
    snomedCT: '58440006',
    meshId: 'D010229',
    ciap2: ['R83'],
    cid10: ['B41'],
    cid11: ['1F2D'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Micose sistemica endemica causada por Paracoccidioides brasiliensis/lutzii. Forma cronica (adultos): pulmonar + lesoes cutaneomucosas. Forma aguda (jovens): linfoadenopatia generalizada.',
      criteriosDiagnosticos: [
        'Trabalhador rural',
        'Lesoes orais/nasais moriforme (estomatite moriforme)',
        'Pneumopatia cronica',
        'Linfadenopatia (forma juvenil)',
        'Visualizacao de roda de leme (levedura multigemulante)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Cessar tabagismo', 'Nutricao adequada'],
        farmacologico: ['LEVE/MODERADA: Itraconazol 200mg/dia por 12-18 meses', 'Alternativa: SMX-TMP 800/160mg 12/12h por 18-24 meses', 'GRAVE: Anfotericina B seguida de itraconazol']
      },
      metasTerapeuticas: ['Cura clinica', 'Sorologia negativa ou estavel'],
      examesIniciais: ['Exame micologico direto', 'Cultura', 'Sorologia (imunodifusao)', 'Rx torax', 'TC torax'],
      redFlags: ['Insuficiencia respiratoria', 'Disseminacao SNC', 'Insuficiencia adrenal']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Micose sistemica mais comum na America Latina',
        faixaEtaria: 'Cronica: 30-60 anos; Aguda: <30 anos',
        fatoresRisco: ['Trabalho rural', 'Tabagismo', 'Alcoolismo', 'Desnutricao'],
        citations: [{ refId: 'consenso-pcm-2017' }]
      },
      fisiopatologia: {
        texto: 'Inalacao de conidios leva a primoinfeccao pulmonar. Disseminacao hematogenica para pele, mucosas, linfonodos e adrenais.',
        citations: [{ refId: 'consenso-pcm-2017' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Lesoes orais/nasais ulceradas', 'Tosse cronica', 'Dispneia', 'Perda de peso', 'Linfadenopatia'],
        sinaisExameFisico: ['Estomatite moriforme', 'Lesoes cutaneas', 'Adenomegalia cervical', 'Estertores pulmonares'],
        formasClinicas: ['Aguda/subaguda (juvenil)', 'Cronica (adulto)', 'Residual (sequelas)'],
        citations: [{ refId: 'consenso-pcm-2017' }]
      },
      diagnostico: {
        criterios: ['Clinico-epidemiologico', 'Exame direto (roda de leme)', 'Cultura', 'Histopatologia', 'Sorologia'],
        diagnosticoDiferencial: ['Tuberculose', 'Histoplasmose', 'Carcinoma', 'Leishmaniose'],
        examesLaboratoriais: ['Micologico direto', 'Cultura', 'Imunodifusao', 'Contraimmunoeletroforese'],
        examesImagem: ['Rx torax', 'TC torax (padrao misto intersticial)'],
        citations: [{ refId: 'consenso-pcm-2017' }]
      },
      tratamento: {
        objetivos: ['Erradicacao do fungo', 'Prevencao de sequelas'],
        naoFarmacologico: {
          medidas: ['Cessar tabagismo', 'Tratar desnutricao', 'Reposicao hormonal se insuf. adrenal'],
          citations: [{ refId: 'consenso-pcm-2017' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Azolico', medicamentos: ['Itraconazol 200mg/dia'], posologia: '12-18 meses', observacoes: 'Formas leves/moderadas' }
          ],
          segundaLinha: [
            { classe: 'Sulfonamida', medicamentos: ['SMX-TMP 800/160mg'], posologia: '12/12h por 18-24 meses', observacoes: 'Opcao de baixo custo' }
          ],
          citations: [{ refId: 'consenso-pcm-2017' }]
        },
        duracao: '12-24 meses (ate cura sorologica)'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal nos primeiros 6 meses; depois trimestral',
        metasTerapeuticas: ['Cura clinica', 'Titulo sorologico estavel ou negativo', 'Espirometria estavel'],
        criteriosEncaminhamento: ['Forma grave: internacao', 'Insuficiencia adrenal: endocrinologia'],
        citations: [{ refId: 'consenso-pcm-2017' }]
      },
      prevencao: {
        primaria: ['Evitar tabagismo', 'Nutricao adequada'],
        secundaria: ['Tratamento prolongado para evitar recidiva'],
        citations: [{ refId: 'consenso-pcm-2017' }]
      }
    },
    protocolos: ['pcm-manejo'],
    medicamentos: ['itraconazol', 'smx-tmp', 'anfotericina-b'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'consenso-pcm-2017' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 8. CRIPTOCOCOSE
  // ============================================================================
  {
    id: 'criptococose',
    titulo: 'Criptococose',
    sinonimos: ['Cryptococcosis', 'Meningite criptococica', 'Torulosis'],
    doid: 'DOID:12053',
    snomedCT: '42386007',
    meshId: 'D003453',
    ciap2: ['N71'],
    cid10: ['B45'],
    cid11: ['1F26'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Micose sistemica causada por Cryptococcus neoformans/gattii. Forma mais comum: meningite subaguda em imunossuprimidos (HIV, transplante).',
      criteriosDiagnosticos: [
        'Cefaleia cronica + febre baixa em imunossuprimido',
        'Sinais meningeos discretos ou ausentes',
        'LCR com aumento de pressao',
        'Tinta da China positiva no LCR',
        'Antigeno criptococico positivo (LCR/soro)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Puncoes lombares de alivio (controle de PIC)', 'Manejo de hipertensao intracraniana'],
        farmacologico: ['INDUCAO: Anfotericina B lipossomal 3-4mg/kg/dia + Flucitosina 100mg/kg/dia IV por 2 semanas', 'CONSOLIDACAO: Fluconazol 400-800mg/dia por 8 semanas', 'MANUTENCAO (HIV): Fluconazol 200mg/dia ate CD4>200']
      },
      metasTerapeuticas: ['Esterilizacao liquorica', 'Controle de PIC', 'Prevencao de recidiva'],
      examesIniciais: ['LCR completo com tinta da China', 'Antigeno criptococico (LCR/soro)', 'TC cranio antes da puncao', 'CD4 e carga viral'],
      redFlags: ['Hipertensao intracraniana', 'Rebaixamento de consciencia', 'Sinais focais', 'Criptococoma cerebral']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Principal causa de meningite em HIV+ na America Latina',
        mortalidade: '20-30% mesmo com tratamento',
        faixaEtaria: 'Adultos jovens (HIV+)',
        fatoresRisco: ['HIV com CD4<100', 'Transplante', 'Corticoterapia cronica'],
        citations: [{ refId: 'who-cryptococcosis-2022' }]
      },
      fisiopatologia: {
        texto: 'Inalacao de esporos; em imunossuprimidos, disseminacao hematogenica para SNC. Capsula polissacaridica confere virulencia e impede fagocitose.',
        citations: [{ refId: 'idsa-cryptococcosis-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Cefaleia cronica', 'Febre baixa', 'Alteracao cognitiva', 'Nauseas', 'Convulsoes'],
        sinaisExameFisico: ['Sinais meningeos discretos', 'Papiledema', 'Paralisias de nervos cranianos'],
        formasClinicas: ['Meningea', 'Pulmonar', 'Cutanea', 'Disseminada'],
        citations: [{ refId: 'idsa-cryptococcosis-2020' }]
      },
      diagnostico: {
        criterios: ['LCR: pleocitose linfocitaria, proteinorraquia, hipoglicorraquia', 'Tinta da China positiva', 'Antigeno criptococico (LCR/soro)', 'Cultura'],
        diagnosticoDiferencial: ['Tuberculose meningea', 'Neurotoxoplasmose', 'Meningite viral'],
        examesLaboratoriais: ['LCR', 'Antigeno criptococico', 'Cultura', 'CD4/CV HIV'],
        examesImagem: ['TC/RM cranio'],
        citations: [{ refId: 'who-cryptococcosis-2022' }]
      },
      tratamento: {
        objetivos: ['Esterilizacao do LCR', 'Controle de PIC', 'Prevenir recidiva'],
        naoFarmacologico: {
          medidas: ['Puncoes lombares de alivio (PIC>25cmH2O)', 'DVE se hipertensao refrataria'],
          citations: [{ refId: 'who-cryptococcosis-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Inducao', medicamentos: ['Anfotericina B lipossomal 3-4mg/kg/dia', 'Flucitosina 100mg/kg/dia'], posologia: '2 semanas IV' },
            { classe: 'Consolidacao', medicamentos: ['Fluconazol 400-800mg/dia'], posologia: '8 semanas VO' },
            { classe: 'Manutencao', medicamentos: ['Fluconazol 200mg/dia'], observacoes: 'Ate CD4>200 por 6+ meses' }
          ],
          citations: [{ refId: 'idsa-cryptococcosis-2020' }]
        },
        duracao: 'Inducao 2 sem + Consolidacao 8 sem + Manutencao meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal na inducao; quinzenal na consolidacao',
        metasTerapeuticas: ['LCR esteril', 'Antigeno decrescente', 'CD4 em ascensao'],
        criteriosEncaminhamento: ['Sempre: infectologia', 'Hipertensao intracraniana: neurocirurgia'],
        citations: [{ refId: 'who-cryptococcosis-2022' }]
      },
      prevencao: {
        primaria: ['TARV precoce em HIV+', 'Profilaxia com fluconazol em CD4<100'],
        secundaria: ['Manutencao com fluconazol ate reconstituicao imune'],
        citations: [{ refId: 'who-cryptococcosis-2022' }]
      }
    },
    protocolos: ['criptococose-manejo'],
    medicamentos: ['anfotericina-b-lipossomal', 'flucitosina', 'fluconazol'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'idsa-cryptococcosis-2020' }, { refId: 'who-cryptococcosis-2022' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 9. ESQUISTOSSOMOSE (COMPLEMENTAR)
  // ============================================================================
  {
    id: 'esquistossomose-hepatoesplenica',
    titulo: 'Esquistossomose Hepatoesplenica',
    sinonimos: ['Forma hepatointestinal', 'Barriga dagua avancada'],
    doid: 'DOID:1395',
    snomedCT: '28019009',
    meshId: 'D012552',
    ciap2: ['D96'],
    cid10: ['B65.1'],
    cid11: ['1F83.1'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Forma avancada da esquistossomose com fibrose periportal (Symmers), hipertensao portal pre-sinusoidal, esplenomegalia e risco de varizes esofagicas.',
      criteriosDiagnosticos: [
        'Historia de exposicao em area endemica',
        'Esplenomegalia volumosa',
        'Fibrose periportal na USG',
        'Varizes esofagicas na EDA',
        'EPF pode ser negativo na forma tardia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Ligadura de varizes', 'Dieta hipossodica', 'Evitar AINEs/alcool'],
        farmacologico: ['Praziquantel 50mg/kg dose unica', 'Beta-bloqueador para varizes', 'Diureticos para ascite']
      },
      metasTerapeuticas: ['Prevencao de sangramento', 'Controle de ascite'],
      examesIniciais: ['USG abdominal com Doppler', 'EDA', 'Hemograma', 'Coagulograma', 'Albumina'],
      redFlags: ['Hemorragia digestiva alta', 'Ascite refrataria', 'Encefalopatia', 'Hiperesplenismo grave']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5-10% dos infectados evoluem para forma hepatoesplenica',
        faixaEtaria: 'Adultos com infeccao cronica',
        fatoresRisco: ['Carga parasitaria elevada', 'Reinfeccoes multiplas', 'Genetica do hospedeiro'],
        citations: [{ refId: 'ms-esquistossomose-2022' }]
      },
      fisiopatologia: {
        texto: 'Deposicao de ovos nos espacos porta causa granulomas e fibrose periportal (Symmers). Hipertensao portal pre-sinusoidal com funcao hepatica preservada.',
        citations: [{ refId: 'who-schistosomiasis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Aumento abdominal', 'Sangramento digestivo', 'Astenia', 'Emagrecimento'],
        sinaisExameFisico: ['Esplenomegalia volumosa', 'Hepatomegalia do lobo esquerdo', 'Circulacao colateral', 'Ascite'],
        formasClinicas: ['Compensada', 'Descompensada'],
        citations: [{ refId: 'ms-esquistossomose-2022' }]
      },
      diagnostico: {
        criterios: ['USG com fibrose periportal', 'EDA com varizes', 'Sorologia/EPF', 'Biopsia hepatica se duvida'],
        diagnosticoDiferencial: ['Cirrose hepatica', 'Hipertensao portal nao cirrotica', 'Sindrome de Budd-Chiari'],
        examesLaboratoriais: ['Hemograma', 'Funcao hepatica', 'Coagulograma', 'Albumina'],
        examesImagem: ['USG com Doppler portal', 'EDA'],
        citations: [{ refId: 'ms-esquistossomose-2022' }]
      },
      tratamento: {
        objetivos: ['Eliminar parasita', 'Prevenir sangramento', 'Tratar hipertensao portal'],
        naoFarmacologico: {
          medidas: ['Ligadura endoscopica de varizes', 'TIPS ou cirurgia em casos selecionados'],
          citations: [{ refId: 'ms-esquistossomose-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiesquistossomico', medicamentos: ['Praziquantel 50mg/kg'], posologia: 'Dose unica' },
            { classe: 'Beta-bloqueador', medicamentos: ['Propranolol 20-80mg 12/12h'], observacoes: 'Profilaxia de sangramento' }
          ],
          citations: [{ refId: 'who-schistosomiasis-2023' }]
        },
        duracao: 'Antiparasitario: unico; BB: continuo'
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral; EDA anual',
        metasTerapeuticas: ['Ausencia de sangramento', 'Estabilizacao da fibrose'],
        criteriosEncaminhamento: ['Varizes de alto risco: endoscopia', 'Ascite refrataria: hepatologia'],
        citations: [{ refId: 'ms-esquistossomose-2022' }]
      },
      prevencao: {
        primaria: ['Saneamento', 'Controle vetorial', 'Tratamento coletivo'],
        secundaria: ['Tratamento precoce para evitar evolucao'],
        citations: [{ refId: 'who-schistosomiasis-2023' }]
      }
    },
    protocolos: ['esquistossomose-avancada'],
    medicamentos: ['praziquantel', 'propranolol'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-esquistossomose-2022' }, { refId: 'who-schistosomiasis-2023' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 10. FILARIOSE
  // ============================================================================
  {
    id: 'filariose-linfatica',
    titulo: 'Filariose Linfatica',
    sinonimos: ['Elefantiase', 'Wuchereria bancrofti', 'Bancroftose'],
    doid: 'DOID:824',
    snomedCT: '2435008',
    meshId: 'D004605',
    ciap2: ['D96'],
    cid10: ['B74.0'],
    cid11: ['1F66.0'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Parasitose causada por Wuchereria bancrofti, transmitida pelo Culex. Obstrucao linfatica cronica causa linfedema e elefantiase. Endemica em Recife e regiao.',
      criteriosDiagnosticos: [
        'Residencia em area endemica',
        'Linfedema de membros inferiores/genitais',
        'Hidrocele (homens)',
        'Microfilaremia noturna (gota espessa 22-2h)',
        'Antigeno circulante (ICT)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Higiene rigorosa do membro', 'Elevacao', 'Drenagem linfatica manual', 'Compressao elastica'],
        farmacologico: ['Dietilcarbamazina (DEC) 6mg/kg/dia por 12 dias', 'Ivermectina 200mcg/kg + Albendazol 400mg (dose unica em MDA)', 'ATB para adenolinfangite aguda']
      },
      metasTerapeuticas: ['Eliminacao de microfilarias', 'Reducao do linfedema'],
      examesIniciais: ['Gota espessa noturna', 'Antigeno filarial (ICT)', 'USG de bolsa escrotal', 'Hemograma (eosinofilia)'],
      redFlags: ['Adenolinfangite aguda recorrente', 'Quiluria', 'Linfedema grau 3-4']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Foco residual no Recife; Brasil em fase de eliminacao',
        faixaEtaria: 'Adultos em areas endemicas',
        fatoresRisco: ['Moradia em area endemica', 'Saneamento precario', 'Exposicao noturna ao vetor'],
        citations: [{ refId: 'who-filariasis-2023' }]
      },
      fisiopatologia: {
        texto: 'Microfilarias circulam no sangue (noturno). Vermes adultos nos vasos linfaticos causam obstrucao e reacao inflamatoria cronica com fibrose.',
        citations: [{ refId: 'who-filariasis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Linfedema de pernas', 'Hidrocele', 'Adenolinfangite aguda', 'Quiluria'],
        sinaisExameFisico: ['Edema duro em MMII', 'Hidrocele volumosa', 'Elefantiase'],
        formasClinicas: ['Assintomatica (microfilaremia)', 'Aguda (adenolinfangite)', 'Cronica (linfedema/elefantiase)'],
        citations: [{ refId: 'who-filariasis-2023' }]
      },
      diagnostico: {
        criterios: ['Epidemiologia', 'Gota espessa noturna', 'Antigeno circulante (ICT)', 'USG (dance sign)'],
        diagnosticoDiferencial: ['Insuficiencia venosa', 'Linfedema primario', 'Erisipela recorrente'],
        examesLaboratoriais: ['Gota espessa', 'ICT/Og4C3', 'Hemograma'],
        examesImagem: ['USG escrotal (vermes moveis)', 'Linfocintilografia'],
        citations: [{ refId: 'who-filariasis-2023' }]
      },
      tratamento: {
        objetivos: ['Matar microfilarias', 'Manejo do linfedema'],
        naoFarmacologico: {
          medidas: ['Higiene do membro afetado', 'Elevacao', 'Drenagem linfatica', 'Compressao'],
          citations: [{ refId: 'who-filariasis-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Microfilaricida', medicamentos: ['DEC 6mg/kg/dia'], posologia: '12 dias', observacoes: 'Reacoes adversas possiveis' }
          ],
          segundaLinha: [
            { classe: 'Alternativa/MDA', medicamentos: ['Ivermectina 200mcg/kg', 'Albendazol 400mg'], posologia: 'Dose unica anual' }
          ],
          citations: [{ refId: 'who-filariasis-2023' }]
        },
        duracao: 'DEC: 12 dias; Cuidados com linfedema: continuo'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal durante tratamento; semestral depois',
        metasTerapeuticas: ['Microfilarias negativas', 'Estabilizacao do linfedema'],
        criteriosEncaminhamento: ['Linfedema avancado: dermatologia/angiologia', 'Hidrocele volumosa: urologia'],
        citations: [{ refId: 'who-filariasis-2023' }]
      },
      prevencao: {
        primaria: ['Controle do Culex', 'Tratamento em massa (MDA)', 'Saneamento'],
        secundaria: ['Tratamento precoce de infectados'],
        citations: [{ refId: 'who-filariasis-2023' }]
      }
    },
    protocolos: ['filariose-manejo'],
    medicamentos: ['dietilcarbamazina', 'ivermectina', 'albendazol'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'who-filariasis-2023' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 11. DOENCA DE CHAGAS CRONICA
  // ============================================================================
  {
    id: 'chagas-cronica-cardiomiopatia',
    titulo: 'Doenca de Chagas Cronica - Cardiomiopatia',
    sinonimos: ['Cardiomiopatia chagasica', 'Cardiopatia chagasica cronica'],
    doid: 'DOID:12140',
    snomedCT: '77506005',
    meshId: 'D002598',
    ciap2: ['K84'],
    cid10: ['B57.2'],
    cid11: ['1F51.1'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Manifestacao cardiaca cronica da doenca de Chagas. Caracterizada por disturbios de conducao, arritmias, insuficiencia cardiaca e morte subita.',
      criteriosDiagnosticos: [
        'Sorologia positiva para T. cruzi (2 metodos)',
        'BRD + BDAS no ECG',
        'Arritmias ventriculares',
        'ICC com FE reduzida',
        'Aneurisma apical no eco'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Restricao sodica', 'Atividade fisica supervisionada', 'Evitar alcool'],
        farmacologico: ['IECA/BRA: enalapril, losartana', 'Beta-bloqueador: carvedilol', 'Espironolactona', 'Amiodarona (arritmias)', 'Anticoagulacao se FA ou aneurisma']
      },
      metasTerapeuticas: ['Prevenir progressao da ICC', 'Prevenir morte subita', 'Controle de arritmias'],
      examesIniciais: ['ECG 12 derivacoes', 'Ecocardiograma', 'Holter 24h', 'Rx torax', 'BNP/NT-proBNP'],
      redFlags: ['TVNS/TVS', 'Sincope', 'FE<35%', 'BAV avancado', 'Eventos tromboembolicos']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '30-40% dos infectados desenvolvem cardiomiopatia',
        mortalidade: 'Principal causa de morte em Chagas',
        faixaEtaria: '30-60 anos',
        fatoresRisco: ['Infeccao cronica nao tratada', 'Carga parasitaria', 'Fatores geneticos'],
        citations: [{ refId: 'consenso-chagas-2016' }]
      },
      fisiopatologia: {
        texto: 'Destruicao de miocitos e desnervacao autonomica por mecanismos diretos (parasita) e imunomediados. Fibrose miocardica progressiva.',
        citations: [{ refId: 'who-chagas-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Palpitacoes', 'Sincope', 'Dispneia progressiva', 'Edema de MMII', 'Dor toracica atipica'],
        sinaisExameFisico: ['Ritmo irregular', 'Estase jugular', 'Hepatomegalia', 'Edema', 'B3'],
        formasClinicas: ['Forma indeterminada', 'Cardiopatia sem ICC', 'Cardiopatia com ICC'],
        citations: [{ refId: 'consenso-chagas-2016' }]
      },
      diagnostico: {
        criterios: ['Sorologia positiva (ELISA + IFI)', 'Alteracoes ECG tipicas', 'Ecocardiograma alterado'],
        diagnosticoDiferencial: ['Cardiomiopatia dilatada idiopatica', 'Cardiomiopatia isquemica', 'Miocardite viral'],
        examesLaboratoriais: ['Sorologia Chagas', 'BNP', 'Funcao renal/hepatica'],
        examesImagem: ['Ecocardiograma', 'RM cardiaca (fibrose)', 'Cintilografia'],
        citations: [{ refId: 'consenso-chagas-2016' }]
      },
      tratamento: {
        objetivos: ['Controlar ICC', 'Prevenir morte subita', 'Tratar arritmias'],
        naoFarmacologico: {
          medidas: ['Restricao sodica', 'Reabilitacao cardiaca', 'CDI se indicado'],
          citations: [{ refId: 'consenso-chagas-2016' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'IECA', medicamentos: ['Enalapril 10-20mg 12/12h', 'Captopril 25-50mg 8/8h'] },
            { classe: 'Beta-bloqueador', medicamentos: ['Carvedilol 3,125-25mg 12/12h'] },
            { classe: 'Antagonista mineralocorticoide', medicamentos: ['Espironolactona 25-50mg/dia'] }
          ],
          situacoesEspeciais: [
            { situacao: 'Arritmias ventriculares', conduta: 'Amiodarona 200mg/dia' },
            { situacao: 'FA/aneurisma apical', conduta: 'Anticoagulacao oral' },
            { situacao: 'FE<35% + TVNS', conduta: 'CDI profilatico' }
          ],
          citations: [{ refId: 'who-chagas-2023' }]
        },
        duracao: 'Tratamento continuo'
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral; ECG e eco anuais',
        metasTerapeuticas: ['NYHA I-II', 'Controle de arritmias', 'Prevencao de eventos'],
        criteriosEncaminhamento: ['ICC avancada: transplante cardiaco', 'Arritmias complexas: eletrofisiologia'],
        citations: [{ refId: 'consenso-chagas-2016' }]
      },
      prevencao: {
        primaria: ['Tratamento etiologico na fase aguda/indeterminada'],
        secundaria: ['Tratamento otimizado da ICC', 'CDI quando indicado'],
        citations: [{ refId: 'who-chagas-2023' }]
      }
    },
    protocolos: ['cardiopatia-chagasica'],
    medicamentos: ['enalapril', 'carvedilol', 'espironolactona', 'amiodarona'],
    calculadoras: ['rassi-score'],
    rastreamentos: [],
    citations: [{ refId: 'consenso-chagas-2016' }, { refId: 'who-chagas-2023' }],
    lastUpdate: '2026-01'
  },

  // ============================================================================
  // 12. HANSENIASE
  // ============================================================================
  {
    id: 'hanseniase',
    titulo: 'Hanseniase',
    sinonimos: ['Lepra', 'Doenca de Hansen', 'Mal de Hansen'],
    doid: 'DOID:1024',
    snomedCT: '81004002',
    meshId: 'D007918',
    ciap2: ['S76'],
    cid10: ['A30'],
    cid11: ['1B20'],
    categoria: 'infecciosas',
    quickView: {
      definicao: 'Doenca infecciosa cronica causada por Mycobacterium leprae, afetando pele e nervos perifericos. Classificacao: paucibacilar (PB) ou multibacilar (MB). Brasil e 2o pais em casos.',
      criteriosDiagnosticos: [
        'Mancha hipocromica/eritematosa com alteracao de sensibilidade',
        'Espessamento neural com dor ou alteracao sensitivo-motora',
        'Baciloscopia positiva (MB)',
        'Um criterio clinico e suficiente para diagnostico'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Prevencao de incapacidades', 'Autocuidado', 'Fisioterapia'],
        farmacologico: ['PAUCIBACILAR: Rifampicina 600mg/mes + Dapsona 100mg/dia por 6 meses', 'MULTIBACILAR: Rifampicina + Dapsona + Clofazimina por 12 meses', 'REACOES: Prednisona ou talidomida']
      },
      metasTerapeuticas: ['Cura (completar PQT)', 'Prevenir incapacidades', 'Detectar reacoes precocemente'],
      examesIniciais: ['Exame dermatoneurologico', 'Baciloscopia', 'Avaliacao de incapacidades (olhos, maos, pes)', 'Hemograma, TGO/TGP'],
      redFlags: ['Reacao tipo 1 (reversa) com neurite', 'Reacao tipo 2 (ENH)', 'Mao/pe em garra', 'Ulceras plantares', 'Lagoftalmo']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Brasil: 2o lugar mundial; 25.000+ casos/ano',
        faixaEtaria: 'Adultos jovens (20-40 anos)',
        fatoresRisco: ['Contato domiciliar', 'Baixa renda', 'Areas endemicas (N, NE, CO)'],
        citations: [{ refId: 'ms-hanseniase-2024' }]
      },
      fisiopatologia: {
        texto: 'M. leprae tem tropismo por celulas de Schwann e macrofagos. Resposta imune determina forma clinica: polo tuberculoide (alta imunidade) ou lepromatoso (baixa imunidade).',
        citations: [{ refId: 'who-leprosy-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Manchas com alteracao de sensibilidade', 'Formigamento em maos/pes', 'Dor neural', 'Fraqueza muscular'],
        sinaisExameFisico: ['Manchas hipocromicas/eritematosas', 'Nervos espessados', 'Perda de sensibilidade', 'Atrofia muscular', 'Madarose'],
        formasClinicas: ['Indeterminada', 'Tuberculoide (PB)', 'Dimorfa (PB ou MB)', 'Virchowiana (MB)'],
        citations: [{ refId: 'ms-hanseniase-2024' }]
      },
      diagnostico: {
        criterios: ['Clinico (sinais cardinais)', 'Baciloscopia (MB)', 'Histopatologia se duvida'],
        diagnosticoDiferencial: ['Pitiriase versicolor', 'Vitiligo', 'Leishmaniose', 'Neuropatias perifericas'],
        examesLaboratoriais: ['Baciloscopia', 'Histopatologia', 'Hemograma', 'Funcao hepatica'],
        citations: [{ refId: 'ms-hanseniase-2024' }]
      },
      tratamento: {
        objetivos: ['Cura com PQT', 'Prevenir incapacidades', 'Tratar reacoes'],
        naoFarmacologico: {
          medidas: ['Autocuidado', 'Fisioterapia', 'Cirurgia corretiva se necessario'],
          citations: [{ refId: 'ms-hanseniase-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'PQT-PB', medicamentos: ['Rifampicina 600mg/mes', 'Dapsona 100mg/dia'], posologia: '6 meses' },
            { classe: 'PQT-MB', medicamentos: ['Rifampicina 600mg/mes', 'Dapsona 100mg/dia', 'Clofazimina 300mg/mes + 50mg/dia'], posologia: '12 meses' }
          ],
          situacoesEspeciais: [
            { situacao: 'Reacao tipo 1', conduta: 'Prednisona 1-2mg/kg/dia' },
            { situacao: 'Reacao tipo 2 (ENH)', conduta: 'Talidomida 100-400mg/dia (nao gestante)' }
          ],
          citations: [{ refId: 'who-leprosy-2023' }]
        },
        duracao: 'PB: 6 meses; MB: 12 meses'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal durante PQT; semestral apos por 5 anos',
        metasTerapeuticas: ['Completar PQT', 'Grau de incapacidade estavel/melhor', 'Deteccao precoce de recidiva'],
        criteriosEncaminhamento: ['Reacoes graves: dermatologia/referencia', 'Incapacidade grau 2: reabilitacao'],
        citations: [{ refId: 'ms-hanseniase-2024' }]
      },
      prevencao: {
        primaria: ['Exame de contatos', 'BCG em contatos'],
        secundaria: ['Diagnostico precoce', 'Tratamento adequado'],
        citations: [{ refId: 'who-leprosy-2023' }]
      }
    },
    protocolos: ['hanseniase-pqt'],
    medicamentos: ['rifampicina', 'dapsona', 'clofazimina', 'talidomida', 'prednisona'],
    calculadoras: [],
    rastreamentos: [],
    citations: [{ refId: 'ms-hanseniase-2024' }, { refId: 'who-leprosy-2023' }],
    lastUpdate: '2026-01'
  }
];
