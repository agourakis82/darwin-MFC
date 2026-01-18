/**
 * DOENÇAS DERMATOLÓGICAS - DARWIN-MFC
 * ====================================
 * 
 * Ontologias integradas:
 * - DOID (Disease Ontology)
 * - SNOMED-CT (Systematized Nomenclature of Medicine)
 * - MeSH (Medical Subject Headings)
 * - UMLS CUI (Unified Medical Language System)
 */

import { Doenca } from '../../types/doenca';

export const doencasDermatologicas: Doenca[] = [
  {
    id: 'dermatite-atopica',
    titulo: 'Dermatite Atópica',
    sinonimos: ['Eczema atópico', 'Neurodermatite difusa', 'Eczema constitucional'],
    doid: 'DOID:3310',
    snomedCT: '24079001',
    meshId: 'D003876',
    umlsCui: 'C0011615',
    ciap2: ['S87'],
    cid10: ['L20'],
    cid11: ['EA80'],
    loinc: [
      // Complete Blood Count - inflammatory markers
      { code: '58410-2', name: 'CBC panel - Blood by Automated count' },
      { code: '6690-2', name: 'Leukocytes [#/volume] in Blood by Automated count' },
      { code: '26515-7', name: 'Platelets [#/volume] in Blood' },
      { code: '711-2', name: 'Eosinophils [#/volume] in Blood by Automated count' },
      { code: '713-8', name: 'Eosinophils/100 leukocytes in Blood by Automated count' },
      // IgE for allergic/atopic conditions
      { code: '2579-1', name: 'IgE [Units/volume] in Serum or Plasma' },
      { code: '19113-0', name: 'IgE [Units/volume] in Serum or Plasma by Immunoassay' },
      { code: '6095-4', name: 'Allergen specific IgE Ab panel - Serum' },
      // Skin culture for secondary infection
      { code: '630-4', name: 'Bacteria identified in Specimen by Culture' },
      { code: '6462-6', name: 'Bacteria identified in Wound by Culture' },
      { code: '43411-8', name: 'Staphylococcus aureus [Presence] in Specimen by Culture' },
      // Patch testing for contact dermatitis association
      { code: '35352-8', name: 'Patch test panel' },
      // Skin biopsy/pathology
      { code: '66746-9', name: 'Pathology report - Skin' },
      { code: '33746-9', name: 'Histopathology study report' },
    ],
    categoria: 'dermatologico',
    quickView: {
      definicao: 'Doença inflamatória cutânea crônica, recidivante, intensamente pruriginosa, caracterizada por disfunção da barreira epidérmica e resposta imune Th2 exacerbada. Faz parte da marcha atópica.',
      criteriosDiagnosticos: [
        'Critérios de Hanifin & Rajka (3 maiores + 3 menores):',
        'MAIORES: Prurido, morfologia típica (flexural em adultos, facial em bebês), cronicidade/recorrência, história pessoal/familiar de atopia',
        'MENORES: Xerose, ictiose, hiperlinearidade palmar, queratose pilar, IgE elevada, idade de início precoce, dermatite de mãos/pés, eczema de mamilo, queilite, conjuntivite recorrente, prega de Dennie-Morgan, etc.'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação intensa (emolientes 2-3x/dia)',
          'Banhos mornos e rápidos',
          'Evitar irritantes (sabões, lã, alérgenos)',
          'Controle ambiental',
          'Corte de unhas para evitar escoriações'
        ],
        farmacologico: [
          'Corticoide tópico: Hidrocortisona 1% (face/flexuras) ou Mometasona 0,1% (corpo)',
          'Inibidores de calcineurina: Tacrolimo 0,03-0,1% ou Pimecrolimo (face/áreas sensíveis)',
          'Anti-histamínico oral se prurido intenso: Hidroxizina 25mg à noite',
          'Casos graves: Dupilumabe (biológico) ou imunossupressores'
        ]
      },
      metasTerapeuticas: [
        'Controle do prurido',
        'Restauração da barreira cutânea',
        'Prevenção de exacerbações',
        'Melhora da qualidade de vida'
      ],
      examesIniciais: [
        'Diagnóstico clínico (não precisa de exames)',
        'IgE total pode estar elevada (não específico)',
        'Cultura de lesão se suspeita de infecção secundária',
        'Patch test se suspeita de dermatite de contato associada'
      ],
      redFlags: [
        'Eritrodermia (>90% da superfície corporal)',
        'Sinais de infecção bacteriana (impetigo, celulite)',
        'Infecção herpética (eczema herpeticum - emergência!)',
        'Falha ao tratamento adequado',
        'Retardo de crescimento em crianças'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-20% em crianças, 1-3% em adultos',
        incidencia: 'Início geralmente antes dos 5 anos',
        faixaEtaria: 'Início na infância, pode persistir ou remitir',
        fatoresRisco: [
          'História familiar de atopia',
          'Asma ou rinite alérgica pessoal/familiar',
          'Mutações em filagrina',
          'Ambiente urbano',
          'Nível socioeconômico elevado (hipótese da higiene)'
        ],
        citations: [{ refId: 'aad-ad-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      fisiopatologia: {
        texto: 'Defeito na barreira epidérmica (mutações em filagrina) permite penetração de alérgenos e irritantes. Resposta imune Th2 exacerbada com produção de IL-4, IL-13, IL-31 (prurido). Disbiose cutânea com colonização por S. aureus.',
        citations: [{ refId: 'aad-ad-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Prurido intenso (sintoma principal)',
          'Xerose (pele seca)',
          'Lesões eczematosas',
          'Cronicidade com exacerbações',
          'Distúrbios do sono pelo prurido'
        ],
        sinaisExameFisico: [
          'Lactentes: Face, couro cabeludo, superfícies extensoras',
          'Crianças/Adultos: Flexuras (fossa antecubital, poplítea, pescoço)',
          'Lesões: Eritema, pápulas, vesículas, exsudação (agudo); liquenificação, escoriações (crônico)',
          'Xerose generalizada'
        ],
        formasClinicas: [
          'DA do lactente',
          'DA infantil',
          'DA do adulto',
          'DA intrínseca (IgE normal)',
          'DA extrínseca (IgE elevada)'
        ],
        citations: [{ refId: 'aad-ad-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Critérios de Hanifin & Rajka',
          'UK Working Party criteria (sensibilidade 85%, especificidade 96%)',
          'Diagnóstico essencialmente clínico'
        ],
        diagnosticoDiferencial: [
          'Dermatite de contato',
          'Dermatite seborreica',
          'Psoríase',
          'Escabiose',
          'Micose cutânea',
          'Imunodeficiências (síndrome de Wiskott-Aldrich, Síndrome de hiper-IgE)'
        ],
        examesLaboratoriais: [
          'Geralmente não necessários',
          'IgE total e específica se dúvida',
          'Cultura de lesão se infecção secundária'
        ],
        citations: [{ refId: 'aad-ad-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      tratamento: {
        objetivos: [
          'Controlar prurido e inflamação',
          'Restaurar barreira cutânea',
          'Prevenir exacerbações e infecções',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Emolientes (base do tratamento)',
            'Banhos mornos, curtos (<10 min)',
            'Sabonetes suaves (sem fragrância)',
            'Roupas de algodão',
            'Evitar alérgenos conhecidos',
            'Controle ambiental (temperatura, umidade)'
          ],
          citations: [{ refId: 'aad-ad-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Corticoide tópico',
              medicamentos: ['Hidrocortisona', 'Mometasona', 'Betametasona'],
              posologia: 'Baixa potência (face): Hidrocortisona 1% 2x/dia. Média/alta (corpo): Mometasona 0,1% 1x/dia.'
            },
            {
              classe: 'Emolientes',
              medicamentos: ['Ureia 5-10%', 'Ceramidas', 'Vaselina'],
              posologia: 'Aplicar 2-3x/dia, especialmente após banho.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Inibidor de calcineurina tópico',
              medicamentos: ['Tacrolimo', 'Pimecrolimo'],
              posologia: 'Tacrolimo 0,03% (crianças) ou 0,1% (adultos) 2x/dia. Bom para face e manutenção.'
            },
            {
              classe: 'Anti-histamínico sedativo',
              medicamentos: ['Hidroxizina', 'Difenidramina'],
              posologia: 'Hidroxizina 25-50mg à noite (melhora prurido noturno e sono).'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'DA grave refratária',
              conduta: 'Dupilumabe 300mg SC a cada 2 semanas (anti-IL-4/IL-13). Fototerapia UVB. Ciclosporina.'
            },
            {
              situacao: 'Infecção secundária',
              conduta: 'Mupirocina tópica ou antibiótico oral (cefalexina) se extenso.'
            }
          ],
          citations: [{ refId: 'aad-ad-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        duracao: 'Crônica, com ajuste conforme atividade da doença.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal até controle, depois a cada 2-3 meses',
        examesControle: [
          'Avaliação clínica (SCORAD, EASI)',
          'Monitorar uso de corticoides (atrofia cutânea)',
          'Monitorar crescimento em crianças'
        ],
        metasTerapeuticas: [
          'Pele sem lesões ativas',
          'Prurido controlado',
          'Sono adequado'
        ],
        criteriosEncaminhamento: [
          'Refratário ao tratamento de 1ª linha',
          'Eritrodermia',
          'Infecções recorrentes',
          'Necessidade de biológicos/imunossupressores'
        ],
        citations: [{ refId: 'aad-ad-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      prevencao: {
        primaria: [
          'Emolientes desde nascimento em RN de alto risco (controverso)',
          'Aleitamento materno'
        ],
        secundaria: [
          'Emolientes contínuos',
          'Evitar gatilhos conhecidos'
        ],
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['hidrocortisona', 'mometasona', 'tacrolimo', 'hidroxizina'],
    calculadoras: ['scorad', 'easi'],
    rastreamentos: [],
    citations: [{ refId: 'aad-ad-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2024-12',
    tags: ['dermatite-atopica', 'eczema', 'prurido', 'atopia', 'pele'],
  },
  {
    id: 'psoriase',
    titulo: 'Psoríase',
    sinonimos: ['Psoríase vulgar', 'Psoríase em placas'],
    doid: 'DOID:8893',
    snomedCT: '9014002',
    meshId: 'D011565',
    umlsCui: 'C0033860',
    ciap2: ['S91'],
    cid10: ['L40'],
    cid11: ['EA90'],
    loinc: [
      // Complete Blood Count - inflammatory monitoring
      { code: '58410-2', name: 'CBC panel - Blood by Automated count' },
      { code: '6690-2', name: 'Leukocytes [#/volume] in Blood by Automated count' },
      { code: '718-7', name: 'Hemoglobin [Mass/volume] in Blood' },
      { code: '777-3', name: 'Platelets [#/volume] in Blood by Automated count' },
      // Inflammatory markers
      { code: '1988-5', name: 'C reactive protein [Mass/volume] in Serum or Plasma' },
      { code: '30341-2', name: 'Erythrocyte sedimentation rate' },
      // Liver function - methotrexate monitoring
      { code: '1742-6', name: 'Alanine aminotransferase [Enzymatic activity/volume] in Serum or Plasma' },
      { code: '1920-8', name: 'Aspartate aminotransferase [Enzymatic activity/volume] in Serum or Plasma' },
      { code: '1975-2', name: 'Bilirubin.total [Mass/volume] in Serum or Plasma' },
      { code: '6768-6', name: 'Alkaline phosphatase [Enzymatic activity/volume] in Serum or Plasma' },
      // Renal function - systemic therapy monitoring
      { code: '2160-0', name: 'Creatinine [Mass/volume] in Serum or Plasma' },
      { code: '33914-3', name: 'Glomerular filtration rate/1.73 sq M.predicted' },
      // Autoimmune markers - psoriatic arthritis workup
      { code: '5291-0', name: 'Rheumatoid factor [Units/volume] in Serum by Latex agglutination' },
      { code: '32218-0', name: 'Cyclic citrullinated peptide Ab [Units/volume] in Serum' },
      // Skin biopsy/pathology
      { code: '66746-9', name: 'Pathology report - Skin' },
      { code: '33746-9', name: 'Histopathology study report' },
    ],
    categoria: 'dermatologico',
    quickView: {
      definicao: 'Doença inflamatória crônica, imunomediada, sistêmica, caracterizada por placas eritematodescamativas bem delimitadas. Associada a artrite psoriásica, síndrome metabólica e impacto significativo na qualidade de vida.',
      criteriosDiagnosticos: [
        'Diagnóstico clínico:',
        'Placas eritematosas bem delimitadas',
        'Escamas prateadas/micáceas',
        'Distribuição em couro cabeludo, cotovelos, joelhos, região sacral',
        'Sinal de Auspitz (sangramento pontilhado ao remover escamas)',
        'Fenômeno de Köbner (lesões em áreas de trauma)',
        'Alterações ungueais (pitting, onicólise, manchas de óleo)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação cutânea',
          'Fototerapia (UVB narrowband)',
          'Exposição solar moderada',
          'Controle do estresse',
          'Cessação do tabagismo',
          'Controle de peso'
        ],
        farmacologico: [
          'Tópico (leve-moderada): Corticoide tópico + Calcipotriol',
          'Betametasona + Calcipotriol combinação 1x/dia',
          'Alcatrão (coaltar) em couro cabeludo',
          'Sistêmico (moderada-grave): Metotrexato, Acitretina, Biológicos'
        ]
      },
      metasTerapeuticas: [
        'Redução de PASI em 75-90%',
        'Melhora da qualidade de vida (DLQI)',
        'Prevenção de artrite psoriásica',
        'Controle de comorbidades'
      ],
      examesIniciais: [
        'Diagnóstico clínico',
        'Biópsia se dúvida (hiperqueratose, acantose, microabcessos de Munro)',
        'Se metotrexato: Hemograma, hepatograma, função renal, sorologias (HBV, HCV, HIV), RX tórax'
      ],
      redFlags: [
        'Psoríase eritrodérmica (>90% superfície)',
        'Psoríase pustulosa generalizada',
        'Artrite psoriásica (dor articular, dactilite, entesite)',
        'Risco cardiovascular elevado',
        'Depressão/ideação suicida'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '2-3% da população mundial',
        incidencia: 'Picos bimodais: 20-30 anos e 50-60 anos',
        faixaEtaria: 'Qualquer idade, mais comum em adultos',
        fatoresRisco: [
          'Genética (HLA-Cw6)',
          'Tabagismo',
          'Obesidade',
          'Estresse',
          'Infecções (streptocócica - gatilho)',
          'Medicamentos (beta-bloqueadores, lítio, anti-maláricos)'
        ],
        citations: [{ refId: 'aad-pso-2021', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      fisiopatologia: {
        texto: 'Doença imunomediada com resposta Th17/Th1 aberrante. Eixo IL-23/IL-17 central na patogênese. Hiperproliferação de queratinócitos (ciclo de 4 dias vs 28 normais). Inflamação sistêmica associada a comorbidades cardiometabólicas.',
        citations: [{ refId: 'aad-pso-2021', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Placas eritematodescamativas',
          'Prurido (30-50% dos pacientes)',
          'Alterações ungueais',
          'Artralgia/artrite',
          'Impacto psicossocial significativo'
        ],
        sinaisExameFisico: [
          'Placas bem delimitadas',
          'Escamas prateadas (micáceas)',
          'Localização: couro cabeludo, cotovelos, joelhos, região lombar',
          'Sinal de Auspitz',
          'Fenômeno de Köbner',
          'Unhas: pitting, onicólise, manchas de óleo'
        ],
        formasClinicas: [
          'Psoríase em placas (vulgar) - 80-90%',
          'Psoríase gutata',
          'Psoríase inversa (flexural)',
          'Psoríase pustulosa',
          'Psoríase eritrodérmica',
          'Psoríase ungueal',
          'Artrite psoriásica (30%)'
        ],
        citations: [{ refId: 'aad-pso-2021', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Diagnóstico clínico na maioria',
          'Biópsia raramente necessária',
          'Avaliar extensão: PASI, BSA, DLQI'
        ],
        diagnosticoDiferencial: [
          'Dermatite seborreica',
          'Eczema numular',
          'Micose fungóide (linfoma cutâneo)',
          'Líquen plano',
          'Dermatofitose',
          'Pitiríase rósea'
        ],
        examesLaboratoriais: [
          'Não há exame específico',
          'FR, anti-CCP se artrite (negativos na artrite psoriásica)',
          'Baseline antes de sistêmicos'
        ],
        citations: [{ refId: 'aad-pso-2021', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      tratamento: {
        objetivos: [
          'Controlar lesões cutâneas (PASI 75-90)',
          'Prevenir progressão e artrite',
          'Melhorar qualidade de vida',
          'Tratar comorbidades'
        ],
        naoFarmacologico: {
          medidas: [
            'Emolientes',
            'Fototerapia UVB narrowband',
            'Exposição solar',
            'Cessação do tabagismo',
            'Perda de peso',
            'Suporte psicológico'
          ],
          citations: [{ refId: 'aad-pso-2021', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Corticoide tópico + Análogo vitamina D',
              medicamentos: ['Betametasona + Calcipotriol', 'Clobetasol', 'Calcitriol'],
              posologia: 'Betametasona/calcipotriol: 1x/dia por 4 semanas, depois manutenção.'
            }
          ],
          segundaLinha: [
            {
              classe: 'Metotrexato',
              medicamentos: ['Metotrexato'],
              posologia: '7,5-25mg/semana VO ou SC. Ácido fólico 5mg/semana. Excelente para artrite psoriásica.'
            },
            {
              classe: 'Retinoides',
              medicamentos: ['Acitretina'],
              posologia: '25-50mg/dia. Teratogênico (evitar gravidez por 3 anos após uso).'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Moderada-grave refratária ou artrite psoriásica',
              conduta: 'Biológicos: anti-TNF (adalimumabe), anti-IL-17 (secuquinumabe), anti-IL-23 (guselcumabe).'
            }
          ],
          citations: [{ refId: 'aad-pso-2021', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        duracao: 'Tratamento crônico com ajustes conforme atividade.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal até controle, depois a cada 3-6 meses',
        examesControle: [
          'PASI, BSA, DLQI',
          'Hemograma, hepatograma (se metotrexato)',
          'Avaliar articulações',
          'Rastreio cardiovascular e metabólico'
        ],
        metasTerapeuticas: [
          'PASI 75 ou PASI 90',
          'DLQI <5',
          'Sem artrite ativa'
        ],
        criteriosEncaminhamento: [
          'Psoríase >10% BSA',
          'Artrite psoriásica',
          'Falha tópicos',
          'Necessidade de sistêmico/biológico',
          'Formas especiais (eritrodérmica, pustulosa)'
        ],
        citations: [{ refId: 'aad-pso-2021', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      prevencao: {
        primaria: [
          'Evitar gatilhos (estresse, infecções)',
          'Não fumar',
          'Manter peso saudável'
        ],
        secundaria: [
          'Tratamento precoce',
          'Adesão ao tratamento',
          'Rastreio de comorbidades'
        ],
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['betametasona', 'calcipotriol', 'metotrexato', 'acitretina'],
    calculadoras: ['pasi', 'bsa', 'dlqi'],
    rastreamentos: [],
    citations: [{ refId: 'aad-pso-2021', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2024-12',
    tags: ['psoriase', 'placas', 'escamas', 'imunomediada', 'metotrexato'],
  },
  {
    id: 'urticaria-cronica',
    titulo: 'Urticária Crônica',
    sinonimos: ['Urticária crônica espontânea', 'Urticária idiopática'],
    doid: 'DOID:1555',
    snomedCT: '126485001',
    meshId: 'D014581',
    umlsCui: 'C0042109',
    ciap2: ['S98'],
    cid10: ['L50.1', 'L50.8'],
    cid11: ['EB05'],
    loinc: [
      // Complete Blood Count with differential
      { code: '58410-2', name: 'CBC panel - Blood by Automated count' },
      { code: '6690-2', name: 'Leukocytes [#/volume] in Blood by Automated count' },
      { code: '711-2', name: 'Eosinophils [#/volume] in Blood by Automated count' },
      { code: '731-0', name: 'Lymphocytes [#/volume] in Blood by Automated count' },
      // Inflammatory markers
      { code: '1988-5', name: 'C reactive protein [Mass/volume] in Serum or Plasma' },
      { code: '30341-2', name: 'Erythrocyte sedimentation rate' },
      // Thyroid function - autoimmune thyroiditis association
      { code: '3016-3', name: 'Thyrotropin [Units/volume] in Serum or Plasma' },
      { code: '5385-0', name: 'Thyroperoxidase Ab [Units/volume] in Serum' },
      { code: '8098-6', name: 'Thyroglobulin Ab [Units/volume] in Serum' },
      // Complement - vasculitis workup
      { code: '4485-9', name: 'Complement C3 [Mass/volume] in Serum or Plasma' },
      { code: '4498-2', name: 'Complement C4 [Mass/volume] in Serum or Plasma' },
      // IgE (although not typically elevated in chronic spontaneous urticaria)
      { code: '2579-1', name: 'IgE [Units/volume] in Serum or Plasma' },
      // Parasitology (endemic areas)
      { code: '10701-1', name: 'Ova and parasites identified in Stool by Concentration' },
      // Skin biopsy - urticarial vasculitis workup
      { code: '66746-9', name: 'Pathology report - Skin' },
      { code: '33746-9', name: 'Histopathology study report' },
    ],
    categoria: 'dermatologico',
    quickView: {
      definicao: 'Urticária (urticas pruriginosas) que persiste por mais de 6 semanas. Pode ser espontânea (sem gatilho identificável) ou induzível (física). Mastócitos cutâneos liberando histamina são centrais.',
      criteriosDiagnosticos: [
        'Urticas recorrentes por >6 semanas',
        'Lesões individuais duram <24 horas',
        'Prurido intenso',
        'Angioedema pode estar associado (40-50%)',
        'Se lesões duram >24h e deixam pigmentação: pensar vasculite urticariforme'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Evitar gatilhos conhecidos (se induzível)',
          'Evitar AINEs e álcool (podem exacerbar)',
          'Controle do estresse',
          'Evitar roupas apertadas'
        ],
        farmacologico: [
          'Anti-H1 2ª geração: Cetirizina 10mg/dia ou Bilastina 20mg/dia',
          'Se não responde: aumentar dose até 4x (off-label, mas recomendado)',
          'Adicionar anti-H1 1ª geração à noite se insônia: Hidroxizina 25-50mg',
          'Refratário: Omalizumabe 300mg SC mensal'
        ]
      },
      metasTerapeuticas: [
        'Controle completo das urticas (UAS7 = 0)',
        'Ausência de angioedema',
        'Qualidade de vida normal (CU-Q2oL)',
        'Identificar e evitar gatilhos'
      ],
      examesIniciais: [
        'Hemograma com diferencial',
        'VHS, PCR',
        'TSH, anti-TPO (associação com tireoidite)',
        'Não fazer painel de alergia (não é IgE mediada na maioria)',
        'Parasitológico de fezes (áreas endêmicas)'
      ],
      redFlags: [
        'Lesões que duram >24h e deixam pigmentação (vasculite)',
        'Sintomas sistêmicos (febre, artralgia)',
        'Angioedema de vias aéreas',
        'Angioedema sem urticária (pensar em angioedema hereditário)',
        'Anasarca'
      ]
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '0,5-1% da população',
        incidencia: 'Urticária aguda é muito mais comum (20% da população)',
        faixaEtaria: 'Adultos, pico 30-50 anos',
        fatoresRisco: [
          'Sexo feminino (2:1)',
          'Doenças autoimunes (tireoidite)',
          'Estresse',
          'Infecções crônicas'
        ],
        citations: [{ refId: 'eaaci-urt-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      fisiopatologia: {
        texto: 'Degranulação de mastócitos cutâneos com liberação de histamina e outros mediadores. Na urticária crônica espontânea, autoanticorpos anti-FcεRI ou anti-IgE podem estar presentes (30-50%). Não é alergia clássica mediada por IgE.',
        citations: [{ refId: 'eaaci-urt-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      quadroClinico: {
        sintomasPrincipais: [
          'Urticas (pápulas/placas edematosas)',
          'Prurido intenso',
          'Angioedema (50%)',
          'Sintomas diários ou quase diários',
          'Impacto na qualidade de vida e sono'
        ],
        sinaisExameFisico: [
          'Urticas: eritematosas, centro pálido, bordas mal definidas',
          'Prova do laço (dermografismo)',
          'Angioedema: edema profundo de lábios, pálpebras, genitália',
          'Lesão individual dura <24h (patognomônico)'
        ],
        formasClinicas: [
          'Urticária crônica espontânea (mais comum)',
          'Urticárias induzíveis: dermográfica, frio, pressão tardia, solar, colinérgica, aquagênica'
        ],
        citations: [{ refId: 'eaaci-urt-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      diagnostico: {
        criterios: [
          'Urticas recorrentes >6 semanas',
          'Lesões <24h individualmente',
          'Angioedema pode estar presente',
          'Avaliar UAS7 (Urticaria Activity Score)'
        ],
        diagnosticoDiferencial: [
          'Vasculite urticariforme (lesões >24h, púrpura)',
          'Anafilaxia recorrente',
          'Mastocitose cutânea',
          'Síndrome de Schnitzler',
          'Dermatite de contato',
          'Prurigo'
        ],
        examesLaboratoriais: [
          'Hemograma, VHS, PCR',
          'TSH, anti-TPO',
          'EPF',
          'Complemento (C3, C4) se suspeita de vasculite',
          'Biópsia se lesão >24h'
        ],
        citations: [{ refId: 'eaaci-urt-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      tratamento: {
        objetivos: [
          'Controle completo (UAS7 = 0)',
          'Minimizar efeitos adversos',
          'Melhorar qualidade de vida'
        ],
        naoFarmacologico: {
          medidas: [
            'Evitar gatilhos identificados',
            'Evitar AINEs',
            'Controle do estresse'
          ],
          citations: [{ refId: 'eaaci-urt-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        farmacologico: {
          primeiraLinha: [
            {
              classe: 'Anti-H1 2ª geração',
              medicamentos: ['Cetirizina', 'Loratadina', 'Bilastina', 'Fexofenadina'],
              posologia: 'Dose padrão: 1x/dia. Se não controla: aumentar até 4x (ex: Cetirizina 10mg 4x/dia).'
            }
          ],
          segundaLinha: [
            {
              classe: 'Omalizumabe',
              medicamentos: ['Omalizumabe'],
              posologia: '300mg SC a cada 4 semanas. Anti-IgE, excelente eficácia.'
            },
            {
              classe: 'Ciclosporina',
              medicamentos: ['Ciclosporina'],
              posologia: '3-5 mg/kg/dia. Última linha, monitorar função renal e PA.'
            }
          ],
          situacoesEspeciais: [
            {
              situacao: 'Angioedema agudo',
              conduta: 'Adrenalina se vias aéreas. Corticoide + anti-H1 VO.'
            }
          ],
          citations: [{ refId: 'eaaci-urt-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
        },
        duracao: 'Média 2-5 anos. Tentar reduzir medicação após controle sustentado.'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal até controle, depois a cada 3 meses',
        examesControle: [
          'UAS7, CU-Q2oL',
          'Reavaliação clínica'
        ],
        metasTerapeuticas: [
          'UAS7 = 0',
          'Qualidade de vida normal'
        ],
        criteriosEncaminhamento: [
          'Refratário a anti-H1 em dose quádrupla',
          'Necessidade de omalizumabe',
          'Angioedema sem urticária',
          'Suspeita de vasculite'
        ],
        citations: [{ refId: 'eaaci-urt-2022', evidenceLevel: 'A', studyType: 'Guideline' }]
      },
      prevencao: {
        primaria: [
          'Não há prevenção conhecida'
        ],
        secundaria: [
          'Evitar gatilhos',
          'Adesão ao tratamento'
        ],
        citations: []
      },
    },
    protocolos: [],
    medicamentos: ['cetirizina', 'loratadina', 'bilastina', 'omalizumabe'],
    calculadoras: ['uas7'],
    rastreamentos: [],
    citations: [{ refId: 'eaaci-urt-2022', evidenceLevel: 'A', studyType: 'Guideline' }],
    lastUpdate: '2024-12',
    tags: ['urticaria', 'angioedema', 'prurido', 'anti-histaminico', 'omalizumabe'],
  }
];

