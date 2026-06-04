/**
 * DOENCAS PEDIATRICAS EXTRAS - DARWIN-MFC EXPANSAO 800
 * ====================================================
 * 12 condicoes pediatricas adicionais comuns na APS
 */

import { Doenca } from '@/lib/types/doenca';

export const pediatricasExtras: Doenca[] = [
  // ============================================================================
  // 1. BRONQUIOLITE AGUDA
  // ============================================================================
  {
    id: 'bronquiolite-aguda',
    titulo: 'Bronquiolite Aguda',
    sinonimos: ['Bronquiolite viral', 'Bronquiolite do lactente'],
    doid: 'DOID:2942',
    snomedCT: '4120002',
    meshId: 'D001988',
    ciap2: ['R78'],
    cid10: ['J21.0', 'J21.9'],
    cid11: ['CA40.1'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Infecao viral das vias aereas inferiores em lactentes <2 anos, causada principalmente pelo VSR. Caracterizada por sibilancia, taquipneia e dificuldade alimentar.',
      criteriosDiagnosticos: [
        'Lactente <2 anos com prodromo de IVAS',
        'Sibilancia e/ou crepitacoes',
        'Taquipneia e tiragem',
        'Dificuldade alimentar'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Aspiracao nasal', 'Hidratacao', 'Oxigenoterapia se SatO2 <92%'],
        farmacologico: ['Suporte; broncodilatadores nao recomendados rotineiramente']
      },
      metasTerapeuticas: ['SatO2 >92%', 'Alimentacao adequada', 'Hidratacao'],
      examesIniciais: ['Oximetria de pulso', 'Radiografia se duvida diagnostica'],
      redFlags: ['SatO2 <92%', 'Apneia', 'Recusa alimentar', 'Prematuridade <32 semanas']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-30% dos lactentes no 1o ano de vida',
        faixaEtaria: 'Pico: 2-6 meses',
        fatoresRisco: ['Prematuridade', 'Cardiopatia congenita', 'Doenca pulmonar cronica', 'Nao aleitamento materno'],
        citations: [{ refId: 'aap-bronquiolite-2014' }]
      },
      fisiopatologia: {
        texto: 'VSR causa necrose epitelial bronquiolar, edema e producao de muco, levando a obstrucao das pequenas vias aereas.',
        citations: [{ refId: 'aap-bronquiolite-2014' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Coriza', 'Tosse', 'Sibilancia', 'Taquipneia', 'Dificuldade alimentar'],
        sinaisExameFisico: ['Tiragem', 'Batimento de asa nasal', 'Sibilos', 'Crepitacoes'],
        formasClinicas: ['Leve', 'Moderada', 'Grave'],
        citations: [{ refId: 'aap-bronquiolite-2014' }]
      },
      diagnostico: {
        criterios: ['Diagnostico clinico', 'Lactente com sibilancia + IVAS previa'],
        diagnosticoDiferencial: ['Asma', 'Pneumonia', 'Insuficiencia cardiaca', 'Corpo estranho'],
        citations: [{ refId: 'aap-bronquiolite-2014' }]
      },
      tratamento: {
        objetivos: ['Manter oxigenacao', 'Garantir hidratacao'],
        naoFarmacologico: {
          medidas: ['Aspiracao nasal SN', 'Oxigenoterapia se SatO2 <92%', 'Hidratacao IV se necessario'],
          citations: [{ refId: 'aap-bronquiolite-2014' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Suporte', medicamentos: ['Oxigenio'], posologia: 'Manter SatO2 >92%', observacoes: 'Broncodilatadores e corticoides nao recomendados rotineiramente' }
          ],
          citations: [{ refId: 'aap-bronquiolite-2014' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno em 24-48h ou se piora',
        metasTerapeuticas: ['Resolucao em 7-10 dias', 'Alimentacao adequada'],
        criteriosEncaminhamento: ['SatO2 <92%', 'Apneia', '<3 meses', 'Comorbidades'],
        citations: [{ refId: 'aap-bronquiolite-2014' }]
      },
      prevencao: {
        primaria: ['Palivizumabe em grupos de risco', 'Lavagem de maos', 'Evitar aglomeracoes'],
        secundaria: ['Identificacao precoce de sinais de gravidade'],
        citations: [{ refId: 'aap-bronquiolite-2014' }]
      }
    },
    protocolos: ['bronquiolite-sbp'],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'aap-bronquiolite-2014' }],
    lastUpdate: '2026-01',
    tags: ['pediatria', 'respiratorio', 'vsr', 'lactente']
  },

  // ============================================================================
  // 2. CRISE ASMATICA NA INFANCIA
  // ============================================================================
  {
    id: 'crise-asmatica-infancia',
    titulo: 'Crise Asmatica na Infancia',
    sinonimos: ['Exacerbacao de asma', 'Broncoespasmo agudo'],
    doid: 'DOID:2841',
    snomedCT: '304527002',
    meshId: 'D001249',
    ciap2: ['R96'],
    cid10: ['J45.9', 'J46'],
    cid11: ['CA23'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Piora aguda dos sintomas de asma com broncoconstrucao, exigindo tratamento de resgate. Classificar gravidade para guiar conduta.',
      criteriosDiagnosticos: [
        'Dispneia progressiva',
        'Sibilancia',
        'Tosse',
        'Uso de musculatura acessoria',
        'Queda do PFE'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Posicao sentada', 'Oxigenoterapia se SatO2 <92%'],
        farmacologico: ['SABA: Salbutamol 4-8 jatos a cada 20min na 1a hora', 'Corticoide sistemico: Prednisolona 1-2mg/kg']
      },
      metasTerapeuticas: ['SatO2 >94%', 'FR normal', 'Sem uso de musculatura acessoria'],
      examesIniciais: ['Oximetria', 'PFE se possivel'],
      redFlags: ['SatO2 <90%', 'Torax silencioso', 'Alteracao consciencia', 'Cianose']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20% das criancas asmaticas tem exacerbacoes graves/ano',
        faixaEtaria: 'Todas as idades pediatricas',
        fatoresRisco: ['Asma mal controlada', 'Nao uso de CI', 'Infeccoes virais', 'Exposicao a alergenos'],
        citations: [{ refId: 'gina-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dispneia', 'Sibilancia', 'Tosse', 'Opressao toracica'],
        sinaisExameFisico: ['Taquipneia', 'Tiragem', 'Sibilos difusos', 'Fase expiratoria prolongada'],
        formasClinicas: ['Leve', 'Moderada', 'Grave', 'Muito grave/risco de vida'],
        citations: [{ refId: 'gina-2023' }]
      },
      diagnostico: {
        criterios: ['Historia de asma', 'Sintomas agudos de obstrucao', 'Resposta a broncodilatador'],
        diagnosticoDiferencial: ['Corpo estranho', 'Pneumonia', 'Bronquiolite', 'Insuficiencia cardiaca'],
        citations: [{ refId: 'gina-2023' }]
      },
      tratamento: {
        objetivos: ['Aliviar broncoespasmo', 'Corrigir hipoxemia', 'Prevenir recorrencia'],
        naoFarmacologico: {
          medidas: ['Oxigenoterapia para SatO2 >94%', 'Posicao confortavel'],
          citations: [{ refId: 'gina-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'SABA', medicamentos: ['Salbutamol'], posologia: '4-8 jatos com espacador a cada 20min x3 na 1a hora', observacoes: 'Nebulizacao se grave' },
            { classe: 'Corticoide sistemico', medicamentos: ['Prednisolona', 'Prednisona'], posologia: '1-2mg/kg VO (max 40mg) por 3-5 dias' }
          ],
          segundaLinha: [
            { classe: 'Anticolinergico', medicamentos: ['Brometo de ipratropio'], posologia: '250-500mcg neb associado ao SABA em crise moderada-grave' }
          ],
          situacoesEspeciais: [
            { situacao: 'Crise grave', conduta: 'Sulfato de magnesio 25-50mg/kg IV (max 2g)' }
          ],
          citations: [{ refId: 'gina-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliacao em 1-2 semanas apos crise',
        metasTerapeuticas: ['Controle da asma de base', 'Plano de acao por escrito'],
        criteriosEncaminhamento: ['Crise grave', 'Necessidade de internacao', 'Asma de dificil controle'],
        citations: [{ refId: 'gina-2023' }]
      },
      prevencao: {
        primaria: ['Tratamento de controle adequado', 'Evitar gatilhos'],
        secundaria: ['Plano de acao', 'Reconhecimento precoce de piora'],
        citations: [{ refId: 'gina-2023' }]
      }
    },
    protocolos: ['gina', 'asma-sbp'],
    medicamentos: ['salbutamol', 'prednisolona', 'ipratropio'],
    calculadoras: ['dose-pediatrica'],
    citations: [{ refId: 'gina-2023' }],
    lastUpdate: '2026-01',
    tags: ['pediatria', 'respiratorio', 'asma', 'emergencia']
  },

  // ============================================================================
  // 3. OTITE MEDIA AGUDA
  // ============================================================================
  {
    id: 'otite-media-aguda-ped',
    titulo: 'Otite Media Aguda',
    sinonimos: ['OMA', 'Infeccao de ouvido medio'],
    doid: 'DOID:10754',
    snomedCT: '3110003',
    meshId: 'D010033',
    ciap2: ['H71'],
    cid10: ['H66.0', 'H66.9'],
    cid11: ['AA80'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Infeccao aguda do ouvido medio, comum em criancas 6-18 meses. Agentes: S. pneumoniae, H. influenzae, M. catarrhalis.',
      criteriosDiagnosticos: [
        'Inicio subito de sintomas',
        'Presenca de efusao (abaulamento da MT)',
        'Sinais de inflamacao (hiperemia, otalgia)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Analgesia', 'Observacao expectante em casos selecionados'],
        farmacologico: ['Amoxicilina 80-90mg/kg/dia div 2 por 10 dias (<2a) ou 7 dias (>2a)', 'Analgesia: Paracetamol ou Ibuprofeno']
      },
      metasTerapeuticas: ['Alivio da dor em 24-48h', 'Resolucao da infeccao'],
      examesIniciais: ['Otoscopia'],
      redFlags: ['Mastoidite (edema retroauricular)', 'Paralisia facial', 'Meningite', '<6 meses']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '80% das criancas terao ao menos 1 episodio ate 3 anos',
        faixaEtaria: 'Pico 6-18 meses',
        fatoresRisco: ['Frequencia em creche', 'Tabagismo passivo', 'Uso de mamadeira deitado', 'Nao aleitamento'],
        citations: [{ refId: 'aap-oma-2013' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Otalgia', 'Febre', 'Irritabilidade', 'Otorreia'],
        sinaisExameFisico: ['MT abaulada', 'MT opaca/hiperemiada', 'Diminuicao da mobilidade'],
        citations: [{ refId: 'aap-oma-2013' }]
      },
      diagnostico: {
        criterios: ['Inicio agudo', 'Efusao no ouvido medio', 'Sinais de inflamacao'],
        diagnosticoDiferencial: ['Otite externa', 'Otite media com efusao', 'Dor referida'],
        citations: [{ refId: 'aap-oma-2013' }]
      },
      tratamento: {
        objetivos: ['Alivio da dor', 'Erradicacao da infeccao', 'Prevencao de complicacoes'],
        naoFarmacologico: {
          medidas: ['Analgesia adequada', 'Observacao expectante: >2 anos, unilateral, sintomas leves'],
          citations: [{ refId: 'aap-oma-2013' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antibiotico', medicamentos: ['Amoxicilina'], posologia: '80-90mg/kg/dia div 2 por 7-10 dias' },
            { classe: 'Analgesico', medicamentos: ['Paracetamol', 'Ibuprofeno'], posologia: 'Paracetamol 15mg/kg/dose 6h' }
          ],
          segundaLinha: [
            { classe: 'Falha terapeutica', medicamentos: ['Amoxicilina-clavulanato'], posologia: '90mg/kg/dia div 2' }
          ],
          citations: [{ refId: 'aap-oma-2013' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno em 48-72h se nao melhora',
        metasTerapeuticas: ['Resolucao da efusao em 4-12 semanas'],
        criteriosEncaminhamento: ['OMA recorrente (>3 em 6m)', 'Mastoidite', 'Perda auditiva'],
        citations: [{ refId: 'aap-oma-2013' }]
      },
      prevencao: {
        primaria: ['Aleitamento materno', 'Vacina pneumococica', 'Evitar tabagismo passivo'],
        secundaria: ['Tratamento adequado de IVAS'],
        citations: [{ refId: 'aap-oma-2013' }]
      }
    },
    protocolos: ['oma-sbp'],
    medicamentos: ['amoxicilina', 'paracetamol'],
    calculadoras: ['dose-pediatrica'],
    citations: [{ refId: 'aap-oma-2013' }],
    lastUpdate: '2026-01',
    tags: ['pediatria', 'otorrino', 'infeccao']
  },

  // ============================================================================
  // 4. AMIGDALITE AGUDA
  // ============================================================================
  {
    id: 'amigdalite-aguda',
    titulo: 'Amigdalite Aguda',
    sinonimos: ['Faringoamigdalite', 'Tonsilite aguda', 'Dor de garganta'],
    doid: 'DOID:10456',
    snomedCT: '17741008',
    meshId: 'D014069',
    ciap2: ['R76'],
    cid10: ['J03.0', 'J03.9'],
    cid11: ['CA03'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Inflamacao aguda das tonsilas. Viral na maioria; bacteriana (S. pyogenes) requer ATB para prevenir febre reumatica.',
      criteriosDiagnosticos: [
        'Odinofagia',
        'Febre',
        'Exsudato tonsilar',
        'Adenomegalia cervical anterior dolorosa',
        'Criterios de Centor/McIsaac'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratacao', 'Repouso', 'Analgesia'],
        farmacologico: ['Se bacteriana: Penicilina V 50.000U/kg/dia div 2-3 por 10 dias OU Amoxicilina 50mg/kg/dia por 10 dias', 'Analgesia: Paracetamol']
      },
      metasTerapeuticas: ['Alivio sintomatico', 'Erradicacao do EBHGA'],
      examesIniciais: ['Teste rapido strep ou cultura se suspeita bacteriana'],
      redFlags: ['Abscesso periamigdaliano', 'Trismo', 'Disfagia grave', 'Toxemia']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Causa comum de consulta pediatrica',
        faixaEtaria: 'Pico 5-15 anos para EBHGA',
        fatoresRisco: ['Contato com infectados', 'Aglomeracoes'],
        citations: [{ refId: 'shulman-2012-strep' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Odinofagia', 'Febre', 'Cefaleia', 'Dor abdominal'],
        sinaisExameFisico: ['Hiperemia de orofaringe', 'Exsudato tonsilar', 'Adenomegalia cervical', 'Petequias em palato'],
        formasClinicas: ['Viral (maioria)', 'Bacteriana (EBHGA)'],
        citations: [{ refId: 'shulman-2012-strep' }]
      },
      diagnostico: {
        criterios: ['Centor/McIsaac: febre, exsudato, adenomegalia, ausencia de tosse', 'Confirmacao: teste rapido ou cultura'],
        diagnosticoDiferencial: ['Mononucleose', 'Herpangina', 'Difteria', 'Abscesso periamigdaliano'],
        citations: [{ refId: 'shulman-2012-strep' }]
      },
      tratamento: {
        objetivos: ['Prevenir febre reumatica', 'Alivio sintomatico', 'Reduzir transmissao'],
        naoFarmacologico: {
          medidas: ['Hidratacao', 'Repouso', 'Gargarejos com agua morna e sal'],
          citations: [{ refId: 'shulman-2012-strep' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Penicilina', medicamentos: ['Penicilina V', 'Amoxicilina'], posologia: 'Amoxicilina 50mg/kg/dia div 2 por 10 dias (max 1g/dia)' },
            { classe: 'Analgesico', medicamentos: ['Paracetamol'], posologia: '10-15mg/kg/dose 6h' }
          ],
          segundaLinha: [
            { classe: 'Alergia a penicilina', medicamentos: ['Azitromicina', 'Cefalexina'], posologia: 'Azitromicina 12mg/kg/dia por 5 dias' }
          ],
          citations: [{ refId: 'shulman-2012-strep' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno se nao melhora em 48-72h',
        metasTerapeuticas: ['Afebril em 24-48h', 'Completar 10 dias de ATB'],
        criteriosEncaminhamento: ['Abscesso periamigdaliano', 'Amigdalites recorrentes (>7/ano)'],
        citations: [{ refId: 'shulman-2012-strep' }]
      },
      prevencao: {
        primaria: ['Higiene das maos', 'Evitar compartilhar utensilios'],
        secundaria: ['Tratamento adequado para prevenir FR'],
        citations: [{ refId: 'shulman-2012-strep' }]
      }
    },
    protocolos: ['faringoamigdalite-sbp'],
    medicamentos: ['amoxicilina', 'penicilina', 'paracetamol'],
    calculadoras: ['centor-score'],
    citations: [{ refId: 'shulman-2012-strep' }],
    lastUpdate: '2026-01',
    tags: ['pediatria', 'infeccao', 'orofaringe']
  },

  // ============================================================================
  // 5. DOENCA MAO-PE-BOCA
  // ============================================================================
  {
    id: 'doenca-mao-pe-boca',
    titulo: 'Doenca Mao-Pe-Boca',
    sinonimos: ['Hand-Foot-Mouth Disease', 'HFMD', 'Sindrome mao-pe-boca'],
    doid: 'DOID:10881',
    snomedCT: '266111002',
    meshId: 'D006232',
    ciap2: ['A76'],
    cid10: ['B08.4'],
    cid11: ['1F05.0'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Infeccao viral por enterovirus (Coxsackie A16, EV71) com vesiculas em maos, pes e mucosa oral. Autolimitada.',
      criteriosDiagnosticos: [
        'Vesiculas/ulceras em cavidade oral',
        'Vesiculas em maos e pes (palmas e plantas)',
        'Febre baixa',
        'Lesoes nao pruriginosas'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratacao oral', 'Dieta pastosa e fria', 'Repouso'],
        farmacologico: ['Analgesia: Paracetamol 10-15mg/kg/dose', 'Anestesico topico oral se necessario']
      },
      metasTerapeuticas: ['Alivio da dor', 'Manter hidratacao'],
      examesIniciais: ['Diagnostico clinico'],
      redFlags: ['Desidratacao', 'Sinais neurologicos (EV71)', 'Letargia']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Comum em <5 anos',
        faixaEtaria: 'Pico <5 anos, especialmente <3 anos',
        fatoresRisco: ['Frequencia em creches', 'Contato com infectados'],
        citations: [{ refId: 'cdc-hfmd-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Febre', 'Lesoes orais dolorosas', 'Exantema vesicular em maos/pes', 'Inapetencia'],
        sinaisExameFisico: ['Vesiculas/ulceras em mucosa oral', 'Vesiculas em palmas e plantas', 'Pode ter lesoes em nadegas'],
        citations: [{ refId: 'cdc-hfmd-2023' }]
      },
      diagnostico: {
        criterios: ['Diagnostico clinico', 'Triade: febre + lesoes orais + vesiculas em maos/pes'],
        diagnosticoDiferencial: ['Herpangina', 'Herpes simples', 'Varicela', 'Aftose'],
        citations: [{ refId: 'cdc-hfmd-2023' }]
      },
      tratamento: {
        objetivos: ['Alivio sintomatico', 'Prevenir desidratacao'],
        naoFarmacologico: {
          medidas: ['Hidratacao oral com liquidos frios', 'Evitar alimentos acidos/salgados', 'Isolamento de creche por 7 dias'],
          citations: [{ refId: 'cdc-hfmd-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analgesico', medicamentos: ['Paracetamol'], posologia: '10-15mg/kg/dose 6h', observacoes: 'Lidocaina gel oral SN' }
          ],
          citations: [{ refId: 'cdc-hfmd-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno se piora ou sinais de complicacao',
        metasTerapeuticas: ['Resolucao em 7-10 dias'],
        criteriosEncaminhamento: ['Sinais neurologicos', 'Desidratacao', 'Imunossuprimidos'],
        citations: [{ refId: 'cdc-hfmd-2023' }]
      },
      prevencao: {
        primaria: ['Lavagem de maos', 'Desinfeccao de superficies', 'Afastamento de creche'],
        secundaria: ['Identificacao precoce de complicacoes'],
        citations: [{ refId: 'cdc-hfmd-2023' }]
      }
    },
    protocolos: ['hfmd-cdc'],
    medicamentos: ['paracetamol'],
    calculadoras: [],
    citations: [{ refId: 'cdc-hfmd-2023' }],
    lastUpdate: '2026-01',
    tags: ['pediatria', 'viral', 'exantema']
  },

  // ============================================================================
  // 6. VARICELA
  // ============================================================================
  {
    id: 'varicela',
    titulo: 'Varicela',
    sinonimos: ['Catapora', 'Chickenpox', 'Varicella'],
    doid: 'DOID:8659',
    snomedCT: '38907003',
    meshId: 'D002644',
    ciap2: ['A72'],
    cid10: ['B01.9'],
    cid11: ['1E90'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Infeccao primaria pelo virus varicela-zoster (VZV). Exantema vesicular pruriginoso em diferentes estagios. Muito contagiosa.',
      criteriosDiagnosticos: [
        'Exantema vesicular pruriginoso',
        'Lesoes em diferentes estagios (macula, papula, vesicula, crosta)',
        'Distribuicao centripeta (tronco > extremidades)',
        'Febre'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Banhos de aveia', 'Unhas curtas', 'Roupas leves'],
        farmacologico: ['Antihistaminico: Loratadina ou Hidroxizina', 'Antitermico: Paracetamol (EVITAR AAS)']
      },
      metasTerapeuticas: ['Alivio do prurido', 'Prevenir infeccao secundaria'],
      examesIniciais: ['Diagnostico clinico'],
      redFlags: ['Imunossupressao', 'Pneumonite', 'Encefalite', 'Celulite/impetigo']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Doenca de notificacao em surtos',
        faixaEtaria: 'Mais comum em <10 anos',
        fatoresRisco: ['Nao vacinados', 'Contato domiciliar', 'Imunossupressao'],
        citations: [{ refId: 'aap-redbook-varicela' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Febre', 'Prurido intenso', 'Exantema vesicular', 'Mal-estar'],
        sinaisExameFisico: ['Lesoes em diferentes estagios', 'Vesiculas com halo eritematoso', 'Distribuicao centripeta'],
        citations: [{ refId: 'aap-redbook-varicela' }]
      },
      diagnostico: {
        criterios: ['Diagnostico clinico', 'Exantema caracteristico + historia de exposicao'],
        diagnosticoDiferencial: ['Impetigo bolhoso', 'Herpes zoster disseminado', 'Picadas de inseto', 'Escabiose'],
        citations: [{ refId: 'aap-redbook-varicela' }]
      },
      tratamento: {
        objetivos: ['Alivio sintomatico', 'Prevenir complicacoes'],
        naoFarmacologico: {
          medidas: ['Banhos mornos com aveia coloidal', 'Manter unhas curtas', 'Evitar cocar', 'Isolamento ate todas as lesoes em crosta'],
          citations: [{ refId: 'aap-redbook-varicela' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Anti-histaminico', medicamentos: ['Loratadina', 'Hidroxizina'], posologia: 'Loratadina 5mg/dia (<30kg) ou 10mg/dia (>30kg)' },
            { classe: 'Analgesico', medicamentos: ['Paracetamol'], posologia: '10-15mg/kg/dose 6h; EVITAR AAS (Sindrome de Reye)' }
          ],
          situacoesEspeciais: [
            { situacao: 'Imunossuprimidos ou >12 anos', conduta: 'Aciclovir 20mg/kg/dose 4x/dia por 5 dias (max 800mg/dose)' }
          ],
          citations: [{ refId: 'aap-redbook-varicela' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno se complicacoes',
        metasTerapeuticas: ['Resolucao em 1-2 semanas'],
        criteriosEncaminhamento: ['Pneumonite', 'Encefalite', 'Infeccao bacteriana secundaria', 'Imunossuprimidos'],
        citations: [{ refId: 'aap-redbook-varicela' }]
      },
      prevencao: {
        primaria: ['Vacinacao (2 doses)', 'Isolamento de casos'],
        secundaria: ['VZIG em expostos de alto risco', 'Aciclovir profilatico em imunossuprimidos'],
        citations: [{ refId: 'aap-redbook-varicela' }]
      }
    },
    protocolos: ['varicela-sbp'],
    medicamentos: ['paracetamol', 'loratadina', 'aciclovir'],
    calculadoras: [],
    citations: [{ refId: 'aap-redbook-varicela' }],
    lastUpdate: '2026-01',
    tags: ['pediatria', 'viral', 'exantema', 'vacinavel']
  },

  // ============================================================================
  // 7. COQUELUCHE
  // ============================================================================
  {
    id: 'coqueluche',
    titulo: 'Coqueluche',
    sinonimos: ['Pertussis', 'Tosse comprida', 'Whooping cough'],
    doid: 'DOID:1116',
    snomedCT: '27836007',
    meshId: 'D014917',
    ciap2: ['R71'],
    cid10: ['A37.0', 'A37.9'],
    cid11: ['1C12.0'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Infeccao respiratoria por Bordetella pertussis. Tosse paroxistica com guincho inspiratorio. Grave em lactentes.',
      criteriosDiagnosticos: [
        'Tosse paroxistica >2 semanas',
        'Guincho inspiratorio (whoop)',
        'Vomitos pos-tosse',
        'Apneia em lactentes',
        'Linfocitose'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Isolamento respiratorio', 'Suporte respiratorio SN'],
        farmacologico: ['Azitromicina 10mg/kg/dia por 5 dias (1a escolha)', 'Alternativa: Claritromicina 15mg/kg/dia div 2 por 7 dias']
      },
      metasTerapeuticas: ['Reduzir transmissao', 'Prevenir complicacoes'],
      examesIniciais: ['PCR de nasofaringe', 'Hemograma (linfocitose)'],
      redFlags: ['Lactente <6 meses', 'Apneia', 'Cianose', 'Convulsoes', 'Pneumonia']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Doenca de notificacao compulsoria',
        faixaEtaria: 'Grave em <6 meses; aumento em adolescentes/adultos',
        fatoresRisco: ['Vacinacao incompleta', 'Contato com caso', 'Lactentes'],
        citations: [{ refId: 'cdc-pertussis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Tosse paroxistica', 'Guincho inspiratorio', 'Vomitos pos-tosse', 'Cianose durante paroxismos'],
        sinaisExameFisico: ['Pode ser normal entre paroxismos', 'Hemorragia subconjuntival', 'Petequias faciais'],
        formasClinicas: ['Catarral (1-2 semanas)', 'Paroxistica (2-6 semanas)', 'Convalescenca (semanas-meses)'],
        citations: [{ refId: 'cdc-pertussis-2023' }]
      },
      diagnostico: {
        criterios: ['Tosse >2 semanas + paroxismos/guincho/vomitos', 'PCR de nasofaringe', 'Cultura (padrao-ouro)'],
        diagnosticoDiferencial: ['Infeccao por B. parapertussis', 'Mycoplasma', 'Adenovirus', 'VSR'],
        examesLaboratoriais: ['Hemograma: linfocitose (>10.000)', 'PCR nasofaringe'],
        citations: [{ refId: 'cdc-pertussis-2023' }]
      },
      tratamento: {
        objetivos: ['Erradicar B. pertussis', 'Reduzir transmissao', 'Prevenir complicacoes'],
        naoFarmacologico: {
          medidas: ['Isolamento respiratorio por 5 dias de ATB', 'Monitorar lactentes', 'Oxigenoterapia SN'],
          citations: [{ refId: 'cdc-pertussis-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Macrolideo', medicamentos: ['Azitromicina'], posologia: '<6m: 10mg/kg/dia x5d; >6m: 10mg/kg D1, 5mg/kg D2-5 (max 500mg D1, 250mg D2-5)' }
          ],
          segundaLinha: [
            { classe: 'Macrolideo alternativo', medicamentos: ['Claritromicina'], posologia: '15mg/kg/dia div 2 por 7 dias (max 1g/dia)' }
          ],
          situacoesEspeciais: [
            { situacao: 'Profilaxia de contactantes', conduta: 'Mesmo esquema de tratamento para contactantes intimos' }
          ],
          citations: [{ refId: 'cdc-pertussis-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Diaria se lactente; semanal se crianca maior',
        metasTerapeuticas: ['Resolucao dos paroxismos em semanas'],
        criteriosEncaminhamento: ['Lactente <6 meses', 'Apneia', 'Insuficiencia respiratoria', 'Convulsoes'],
        citations: [{ refId: 'cdc-pertussis-2023' }]
      },
      prevencao: {
        primaria: ['Vacinacao (DTPa/DTPw)', 'Reforco em gestantes (dTpa)', 'Vacinacao de contactantes'],
        secundaria: ['Quimioprofilaxia de contactantes'],
        citations: [{ refId: 'cdc-pertussis-2023' }]
      }
    },
    protocolos: ['coqueluche-ms'],
    medicamentos: ['azitromicina', 'claritromicina'],
    calculadoras: ['dose-pediatrica'],
    citations: [{ refId: 'cdc-pertussis-2023' }],
    lastUpdate: '2026-01',
    tags: ['pediatria', 'infeccao', 'respiratorio', 'notificacao']
  },

  // ============================================================================
  // 8. ESCARLATINA
  // ============================================================================
  {
    id: 'escarlatina',
    titulo: 'Escarlatina',
    sinonimos: ['Scarlet fever', 'Febre escarlate'],
    doid: 'DOID:9580',
    snomedCT: '30242009',
    meshId: 'D012541',
    ciap2: ['A78'],
    cid10: ['A38'],
    cid11: ['1B51'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Infeccao por S. pyogenes produtor de toxina eritrogenica. Exantema micropapular aspero + faringoamigdalite.',
      criteriosDiagnosticos: [
        'Faringoamigdalite exsudativa',
        'Exantema micropapular aspero (lixa)',
        'Sinal de Pastia (acentuacao em dobras)',
        'Lingua em framboesa',
        'Descamacao posterior'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso', 'Hidratacao'],
        farmacologico: ['Penicilina V ou Amoxicilina por 10 dias (mesmo esquema de faringoamigdalite estreptococica)']
      },
      metasTerapeuticas: ['Erradicar EBHGA', 'Prevenir febre reumatica'],
      examesIniciais: ['Teste rapido strep ou cultura de orofaringe'],
      redFlags: ['Complicacoes supurativas', 'Sinais de GNDA', 'Febre reumatica']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Notificacao em surtos',
        faixaEtaria: 'Mais comum 5-15 anos',
        fatoresRisco: ['Contato com EBHGA', 'Aglomeracoes'],
        citations: [{ refId: 'shulman-2012-strep' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Febre alta', 'Odinofagia', 'Exantema', 'Cefaleia'],
        sinaisExameFisico: ['Exantema aspero (lixa)', 'Sinal de Pastia', 'Palidez perioral (sinal de Filatov)', 'Lingua em framboesa'],
        formasClinicas: ['Classica', 'Atenuada'],
        citations: [{ refId: 'shulman-2012-strep' }]
      },
      diagnostico: {
        criterios: ['Clinica de faringoamigdalite + exantema caracteristico', 'Confirmacao: teste rapido ou cultura'],
        diagnosticoDiferencial: ['Kawasaki', 'Sarampo', 'Rubeola', 'Eritema infeccioso', 'Reacao medicamentosa'],
        citations: [{ refId: 'shulman-2012-strep' }]
      },
      tratamento: {
        objetivos: ['Erradicar infeccao', 'Prevenir complicacoes'],
        naoFarmacologico: {
          medidas: ['Repouso', 'Hidratacao', 'Isolamento por 24h de ATB'],
          citations: [{ refId: 'shulman-2012-strep' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Penicilina', medicamentos: ['Amoxicilina', 'Penicilina V'], posologia: 'Amoxicilina 50mg/kg/dia div 2 por 10 dias' }
          ],
          segundaLinha: [
            { classe: 'Alergia a penicilina', medicamentos: ['Azitromicina', 'Cefalexina'], posologia: 'Azitromicina 12mg/kg/dia por 5 dias' }
          ],
          citations: [{ refId: 'shulman-2012-strep' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno se nao melhora em 48-72h',
        metasTerapeuticas: ['Afebril em 24-48h', 'Descamacao em 1-3 semanas (normal)'],
        criteriosEncaminhamento: ['Complicacoes supurativas', 'Sinais de GNDA', 'Febre reumatica'],
        citations: [{ refId: 'shulman-2012-strep' }]
      },
      prevencao: {
        primaria: ['Tratamento adequado de faringoamigdalites'],
        secundaria: ['Profilaxia secundaria se historia de FR'],
        citations: [{ refId: 'shulman-2012-strep' }]
      }
    },
    protocolos: ['escarlatina-sbp'],
    medicamentos: ['amoxicilina', 'penicilina'],
    calculadoras: [],
    citations: [{ refId: 'shulman-2012-strep' }],
    lastUpdate: '2026-01',
    tags: ['pediatria', 'infeccao', 'exantema', 'estreptococo']
  },

  // ============================================================================
  // 9. DOENCA DE KAWASAKI
  // ============================================================================
  {
    id: 'kawasaki',
    titulo: 'Doenca de Kawasaki',
    sinonimos: ['Sindrome linfonodal mucocutanea', 'Kawasaki Disease'],
    doid: 'DOID:13378',
    snomedCT: '75053002',
    meshId: 'D009080',
    ciap2: ['K99'],
    cid10: ['M30.3'],
    cid11: ['4A44.1'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Vasculite sistemica aguda de etiologia desconhecida. Risco de aneurismas coronarianos. Emergencia pediatrica.',
      criteriosDiagnosticos: [
        'Febre >5 dias + 4 de 5 criterios:',
        '1. Conjuntivite bilateral nao exsudativa',
        '2. Alteracoes de mucosa oral (labios fissurados, lingua em framboesa)',
        '3. Exantema polimorfo',
        '4. Alteracoes de extremidades (edema, eritema, descamacao)',
        '5. Adenomegalia cervical >1,5cm'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Internacao', 'Monitoramento cardiaco'],
        farmacologico: ['IVIG 2g/kg dose unica + AAS 80-100mg/kg/dia ate afebril, depois 3-5mg/kg/dia']
      },
      metasTerapeuticas: ['Afebril em 48h', 'Prevenir aneurismas coronarianos'],
      examesIniciais: ['Ecocardiograma', 'Hemograma', 'PCR/VHS', 'Funcao hepatica', 'EAS'],
      redFlags: ['Aneurismas coronarianos', 'Choque', 'Miocardite', 'Kawasaki incompleto']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-20/100.000 criancas <5 anos',
        faixaEtaria: '80% em <5 anos; pico 18-24 meses',
        fatoresRisco: ['Ascendencia asiatica', 'Sexo masculino'],
        citations: [{ refId: 'mccrindle-2017-kawasaki' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Febre alta persistente', 'Conjuntivite', 'Alteracoes orais', 'Exantema', 'Edema de extremidades', 'Adenomegalia cervical'],
        sinaisExameFisico: ['Irritabilidade extrema', 'Conjuntivite bulbar sem exsudato', 'Labios fissurados eritematosos', 'Descamacao periungueal'],
        formasClinicas: ['Classico', 'Incompleto/atipico'],
        citations: [{ refId: 'mccrindle-2017-kawasaki' }]
      },
      diagnostico: {
        criterios: ['Febre >5 dias + 4/5 criterios principais', 'Kawasaki incompleto: febre + 2-3 criterios + laboratorio sugestivo + eco'],
        diagnosticoDiferencial: ['Escarlatina', 'Sarampo', 'Sindrome do choque toxico', 'Reacao medicamentosa', 'Artrite idiopatica juvenil'],
        examesLaboratoriais: ['PCR/VHS elevados', 'Leucocitose', 'Trombocitose (2a semana)', 'Anemia', 'Piuria esteril'],
        examesImagem: ['Ecocardiograma: aneurismas coronarianos, dilatacao, disfuncao'],
        citations: [{ refId: 'mccrindle-2017-kawasaki' }]
      },
      tratamento: {
        objetivos: ['Reduzir inflamacao', 'Prevenir aneurismas coronarianos'],
        naoFarmacologico: {
          medidas: ['Internacao hospitalar', 'Repouso', 'Monitoramento cardiaco'],
          citations: [{ refId: 'mccrindle-2017-kawasaki' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Imunoglobulina', medicamentos: ['IVIG'], posologia: '2g/kg IV em infusao unica de 10-12h', observacoes: 'Idealmente em <10 dias de febre' },
            { classe: 'Antiinflamatorio', medicamentos: ['AAS'], posologia: '80-100mg/kg/dia div 4 ate afebril 48-72h, depois 3-5mg/kg/dia por 6-8 semanas' }
          ],
          situacoesEspeciais: [
            { situacao: 'Refratario a IVIG', conduta: '2a dose IVIG ou Infliximab ou Corticoide' },
            { situacao: 'Aneurismas gigantes', conduta: 'Anticoagulacao + acompanhamento especializado' }
          ],
          citations: [{ refId: 'mccrindle-2017-kawasaki' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Eco: diagnostico, 2 semanas, 6-8 semanas; depois conforme achados',
        metasTerapeuticas: ['Afebril em 36-48h', 'Sem aneurismas', 'Normalizacao de laboratorio'],
        criteriosEncaminhamento: ['Todos os casos para cardiologia pediatrica'],
        citations: [{ refId: 'mccrindle-2017-kawasaki' }]
      },
      prevencao: {
        primaria: ['Desconhecida (etiologia nao estabelecida)'],
        secundaria: ['Tratamento precoce com IVIG reduz risco de aneurismas de 25% para 4%'],
        citations: [{ refId: 'mccrindle-2017-kawasaki' }]
      }
    },
    protocolos: ['kawasaki-aha'],
    medicamentos: ['ivig', 'aas'],
    calculadoras: [],
    citations: [{ refId: 'mccrindle-2017-kawasaki' }],
    lastUpdate: '2026-01',
    tags: ['pediatria', 'vasculite', 'cardiologia', 'emergencia']
  },

  // ============================================================================
  // 10. PURPURA DE HENOCH-SCHONLEIN
  // ============================================================================
  {
    id: 'purpura-henoch-schonlein',
    titulo: 'Purpura de Henoch-Schonlein',
    sinonimos: ['PHS', 'Vasculite por IgA', 'IgA Vasculitis', 'Purpura anafilactoide'],
    doid: 'DOID:10808',
    snomedCT: '191306005',
    meshId: 'D011695',
    ciap2: ['S83'],
    cid10: ['D69.0'],
    cid11: ['4A44.0'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Vasculite de pequenos vasos mediada por IgA. Caracterizada por purpura palpavel, artrite, dor abdominal e nefrite.',
      criteriosDiagnosticos: [
        'Purpura palpavel em MMII e nadegas (obrigatorio)',
        'Artrite/artralgia',
        'Dor abdominal',
        'Envolvimento renal (hematuria, proteinuria)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso', 'Hidratacao', 'Monitorar funcao renal'],
        farmacologico: ['Sintomaticos: Paracetamol para dor', 'AINES para artrite (com cautela)', 'Corticoide em casos selecionados']
      },
      metasTerapeuticas: ['Alivio sintomatico', 'Monitorar nefrite'],
      examesIniciais: ['EAS', 'Funcao renal', 'Hemograma', 'Coagulograma'],
      redFlags: ['Nefrite grave', 'Hemorragia GI', 'Orquite', 'Envolvimento SNC']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-20/100.000 criancas/ano',
        faixaEtaria: 'Pico 3-10 anos; 90% em <10 anos',
        fatoresRisco: ['Infeccao previa (IVAS)', 'Sexo masculino discretamente'],
        citations: [{ refId: 'ozen-2010-phs' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Purpura palpavel em MMII/nadegas', 'Artralgia/artrite', 'Dor abdominal em colica', 'Hematuria'],
        sinaisExameFisico: ['Purpura simetrica', 'Edema de articulacoes', 'Edema escrotal (meninos)'],
        formasClinicas: ['Cutanea', 'Articular', 'Abdominal', 'Renal'],
        citations: [{ refId: 'ozen-2010-phs' }]
      },
      diagnostico: {
        criterios: ['Criterios EULAR/PRINTO: purpura palpavel + 1 de: dor abdominal, artrite, envolvimento renal, biopsia com IgA'],
        diagnosticoDiferencial: ['PTI', 'Meningococcemia', 'Outras vasculites', 'Abuso infantil'],
        examesLaboratoriais: ['EAS (hematuria, proteinuria)', 'Funcao renal', 'Coagulograma normal'],
        citations: [{ refId: 'ozen-2010-phs' }]
      },
      tratamento: {
        objetivos: ['Alivio sintomatico', 'Prevenir complicacoes renais'],
        naoFarmacologico: {
          medidas: ['Repouso durante fase aguda', 'Elevacao de MMII', 'Hidratacao'],
          citations: [{ refId: 'ozen-2010-phs' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Analgesico', medicamentos: ['Paracetamol'], posologia: '10-15mg/kg/dose 6h' },
            { classe: 'AINE', medicamentos: ['Ibuprofeno', 'Naproxeno'], posologia: 'Ibuprofeno 10mg/kg/dose 8h (se funcao renal normal)', observacoes: 'Cautela se envolvimento renal' }
          ],
          situacoesEspeciais: [
            { situacao: 'Dor abdominal intensa', conduta: 'Prednisona 1-2mg/kg/dia por 1-2 semanas' },
            { situacao: 'Nefrite com proteinuria nefrotica', conduta: 'Pulsoterapia com metilprednisolona + imunossupressor' }
          ],
          citations: [{ refId: 'ozen-2010-phs' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'EAS semanal por 1 mes, depois mensal por 6 meses',
        metasTerapeuticas: ['Resolucao em 4-6 semanas', 'Funcao renal preservada'],
        criteriosEncaminhamento: ['Nefrite significativa', 'Complicacoes GI', 'Recorrencias frequentes'],
        citations: [{ refId: 'ozen-2010-phs' }]
      },
      prevencao: {
        primaria: ['Nao ha prevencao conhecida'],
        secundaria: ['Monitoramento renal prolongado'],
        citations: [{ refId: 'ozen-2010-phs' }]
      }
    },
    protocolos: ['phs-sbp'],
    medicamentos: ['paracetamol', 'ibuprofeno', 'prednisona'],
    calculadoras: [],
    citations: [{ refId: 'ozen-2010-phs' }],
    lastUpdate: '2026-01',
    tags: ['pediatria', 'vasculite', 'reumatologia', 'purpura']
  },

  // ============================================================================
  // 11. INTUSSUSCEPCAO
  // ============================================================================
  {
    id: 'intussuscepcao',
    titulo: 'Intussuscepcao',
    sinonimos: ['Invaginacao intestinal', 'Intussusception'],
    doid: 'DOID:10971',
    snomedCT: '19617004',
    meshId: 'D007443',
    ciap2: ['D94'],
    cid10: ['K56.1'],
    cid11: ['DA93.1'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Invaginacao de um segmento intestinal em outro, causando obstrucao. Emergencia abdominal mais comum em <2 anos. Ileocolica em 90%.',
      criteriosDiagnosticos: [
        'Triade classica (30%): dor abdominal em colica + vomitos + fezes em geleia de framboesa',
        'Dor abdominal intermitente intensa',
        'Letargia entre crises',
        'Massa abdominal palpavel (salsicha)',
        'Fezes com sangue/muco'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Ressuscitacao hemodinamica', 'SNG se vomitos'],
        farmacologico: ['Reducao por enema (ar ou contraste hidrostatico) - 1a escolha se estavel', 'Cirurgia se contraindicacoes ou falha']
      },
      metasTerapeuticas: ['Reducao da intussuscepcao', 'Evitar necrose intestinal'],
      examesIniciais: ['USG abdominal (sinal do alvo/pseudorim)', 'RX abdominal'],
      redFlags: ['Peritonite', 'Perfuracao', 'Choque', 'Obstrucao completa']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-4/1000 criancas <2 anos',
        faixaEtaria: 'Pico 5-9 meses; 60% em <1 ano',
        fatoresRisco: ['Infeccao viral previa', 'Diverticulo de Meckel', 'Polipos', 'Linfoma'],
        citations: [{ refId: 'mandeville-2012-intussusception' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dor abdominal em colica', 'Vomitos', 'Fezes com sangue/muco', 'Letargia'],
        sinaisExameFisico: ['Massa em salsicha (QSD ou epigastrio)', 'Fossa iliaca direita vazia (sinal de Dance)', 'Distensao abdominal'],
        formasClinicas: ['Ileocolica (90%)', 'Ileoileal', 'Colocolica'],
        citations: [{ refId: 'mandeville-2012-intussusception' }]
      },
      diagnostico: {
        criterios: ['Clinica sugestiva', 'USG: sinal do alvo/pseudorim', 'RX: ausencia de gas em QID, sinal do menisco'],
        diagnosticoDiferencial: ['Gastroenterite', 'Volvo', 'Apendicite', 'Colica infantil', 'Obstrucao por brida'],
        examesImagem: ['USG abdominal (padrao-ouro)', 'RX abdominal'],
        citations: [{ refId: 'mandeville-2012-intussusception' }]
      },
      tratamento: {
        objetivos: ['Reducao da invaginacao', 'Evitar complicacoes'],
        naoFarmacologico: {
          medidas: ['Ressuscitacao volêmica', 'SNG se vomitos', 'Jejum', 'Antibioticos profilaticos'],
          citations: [{ refId: 'mandeville-2012-intussusception' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Procedimento', medicamentos: ['Enema de reducao'], posologia: 'Enema com ar ou contraste sob fluoroscopia', observacoes: 'Sucesso 80-90%; CI: peritonite, perfuracao, choque' }
          ],
          situacoesEspeciais: [
            { situacao: 'Falha de enema ou contraindicacoes', conduta: 'Cirurgia (reducao manual ou resseccao)' },
            { situacao: 'Recorrencia (5-10%)', conduta: 'Novo enema se sem sinais de complicacao' }
          ],
          citations: [{ refId: 'mandeville-2012-intussusception' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Observacao hospitalar 24h apos reducao',
        metasTerapeuticas: ['Alimentacao normal', 'Evacuacoes normais', 'Sem recorrencia'],
        criteriosEncaminhamento: ['Todos os casos para emergencia pediatrica/cirurgia pediatrica'],
        citations: [{ refId: 'mandeville-2012-intussusception' }]
      },
      prevencao: {
        primaria: ['Nao ha prevencao especifica'],
        secundaria: ['Reconhecimento precoce dos sintomas'],
        citations: [{ refId: 'mandeville-2012-intussusception' }]
      }
    },
    protocolos: ['intussuscepcao-sbcp'],
    medicamentos: [],
    calculadoras: [],
    citations: [{ refId: 'mandeville-2012-intussusception' }],
    lastUpdate: '2026-01',
    tags: ['pediatria', 'cirurgia', 'emergencia', 'abdome-agudo']
  },

  // ============================================================================
  // 12. COLICA DO LACTENTE
  // ============================================================================
  {
    id: 'colica-lactente',
    titulo: 'Colica do Lactente',
    sinonimos: ['Colica infantil', 'Infant colic', 'Colica do bebe'],
    doid: 'DOID:0060154',
    snomedCT: '55822004',
    meshId: 'D003085',
    ciap2: ['D01'],
    cid10: ['R10.4'],
    cid11: ['MD81.0'],
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Choro excessivo e inconsolavel em lactente saudavel, geralmente no final da tarde/noite. Criterios de Wessel: choro >3h/dia, >3 dias/semana, >3 semanas.',
      criteriosDiagnosticos: [
        'Lactente saudavel <4 meses',
        'Choro excessivo e inconsolavel',
        'Predominio no final da tarde/noite',
        'Flexao de MMII, face avermelhada, punhos cerrados',
        'Exame fisico normal'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Acolhimento e tranquilizacao dos pais', 'Balanco ritmico', 'Ruido branco', 'Massagem abdominal', 'Posicao de brucos no colo'],
        farmacologico: ['Nenhum farmaco comprovadamente eficaz', 'Simeticona pode ser tentada (sem evidencia solida)', 'Probioticos (L. reuteri) - evidencia limitada']
      },
      metasTerapeuticas: ['Acolher familia', 'Afastar causas organicas', 'Resolucao espontanea em 3-4 meses'],
      examesIniciais: ['Diagnostico de exclusao - exame fisico normal'],
      redFlags: ['Vomitos biliosos', 'Sangue nas fezes', 'Febre', 'Deficit de ganho ponderal', 'Alteracao neurologica']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-40% dos lactentes',
        faixaEtaria: 'Inicio: 2-3 semanas; Pico: 6 semanas; Resolucao: 3-4 meses',
        fatoresRisco: ['Tabagismo materno', 'Nao estabelecidos com clareza'],
        citations: [{ refId: 'zeevenhooven-2018-colic' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Choro intenso e inconsolavel', 'Flexao de pernas', 'Punhos cerrados', 'Face avermelhada', 'Predominio vespertino/noturno'],
        sinaisExameFisico: ['Normal', 'Lactente saudavel nos periodos sem colica', 'Ganho de peso adequado'],
        citations: [{ refId: 'zeevenhooven-2018-colic' }]
      },
      diagnostico: {
        criterios: ['Criterios de Wessel: choro >3h/dia, >3 dias/semana, >3 semanas', 'Roma IV: <5 meses, choro recorrente prolongado, sem falha de crescimento'],
        diagnosticoDiferencial: ['APLV', 'DRGE', 'Infeccao', 'Cabelo em torniquete', 'Hernia encarcerada', 'Trauma/abuso'],
        citations: [{ refId: 'zeevenhooven-2018-colic' }]
      },
      tratamento: {
        objetivos: ['Excluir causas organicas', 'Apoiar e tranquilizar pais'],
        naoFarmacologico: {
          medidas: ['Acolhimento e educacao dos pais', 'Balanco ritmico', 'Ruido branco', 'Passeio de carro', 'Banho morno', 'Massagem abdominal', 'Tecnica dos 5 Ss (swaddle, side, shush, swing, suck)'],
          citations: [{ refId: 'zeevenhooven-2018-colic' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antiflatulento', medicamentos: ['Simeticona'], posologia: '2,5-10mg antes das mamadas', observacoes: 'Evidencia fraca, mas seguro' },
            { classe: 'Probiotico', medicamentos: ['L. reuteri DSM 17938'], posologia: '10^8 UFC/dia', observacoes: 'Evidencia modesta em amamentados' }
          ],
          situacoesEspeciais: [
            { situacao: 'Suspeita de APLV', conduta: 'Dieta de exclusao materna (se AM) ou formula extensamente hidrolisada por 2-4 semanas' }
          ],
          citations: [{ refId: 'zeevenhooven-2018-colic' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Conforme necessidade dos pais; suporte frequente',
        metasTerapeuticas: ['Resolucao espontanea em 3-4 meses', 'Bem-estar dos pais'],
        criteriosEncaminhamento: ['Suspeita de causa organica', 'Risco de abuso por estresse parental'],
        citations: [{ refId: 'zeevenhooven-2018-colic' }]
      },
      prevencao: {
        primaria: ['Evitar tabagismo', 'Tecnica de amamentacao adequada'],
        secundaria: ['Identificacao precoce de estresse parental'],
        citations: [{ refId: 'zeevenhooven-2018-colic' }]
      }
    },
    protocolos: ['colica-sbp'],
    medicamentos: ['simeticona'],
    calculadoras: [],
    citations: [{ refId: 'zeevenhooven-2018-colic' }],
    lastUpdate: '2026-01',
    tags: ['pediatria', 'lactente', 'choro', 'funcional']
  }
];
