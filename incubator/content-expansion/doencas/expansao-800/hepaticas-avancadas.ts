/**
 * DOENCAS HEPATICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * =====================================================
 * Doencas hepaticas cronicas, autoimunes e metabolicas
 */

import { Doenca } from '@/lib/types/doenca';

export const hepaticasAvancadas: Doenca[] = [
  // ============================================================================
  // CIRROSE HEPATICA
  // ============================================================================
  {
    id: 'cirrose-hepatica',
    titulo: 'Cirrose Hepatica',
    sinonimos: ['Cirrose do figado', 'Hepatopatia cronica terminal'],
    doid: 'DOID:5082',
    snomedCT: '19943007',
    meshId: 'D008103',
    ciap2: ['D97'],
    cid10: ['K74'],
    categoria: 'gastrointestinal',
    subcategoria: 'doenca_hepatica_cronica',
    quickView: {
      definicao: 'Estagio final de fibrose hepatica progressiva com distorcao arquitetural e formacao de nodulos de regeneracao. Causas: alcool, hepatites virais, NASH, autoimune.',
      criteriosDiagnosticos: [
        'Elastografia hepatica >12,5 kPa',
        'Biopsia: fibrose F4 (METAVIR)',
        'Estigmas clinicos de hepatopatia cronica',
        'Hipertensao portal (varizes, ascite, esplenomegalia)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Abster-se de alcool', 'Dieta hipossodica', 'Vacinacao hepatite A e B'],
        farmacologico: ['Tratar causa base', 'Propranolol para varizes', 'Espironolactona para ascite', 'Lactulose se encefalopatia']
      },
      metasTerapeuticas: ['Prevenir descompensacao', 'Rastrear HCC', 'Avaliar transplante'],
      examesIniciais: ['Funcao hepatica', 'Coagulograma', 'USG abdome', 'Elastografia', 'EDA'],
      redFlags: ['Hemorragia varicosa', 'PBE', 'Encefalopatia grau III-IV', 'Sindrome hepatorrenal']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '1-2% da populacao mundial',
        incidencia: 'Varia conforme etiologia predominante regional',
        fatoresRisco: ['Alcoolismo cronico', 'Hepatite B/C', 'NASH/DHGNA', 'Hepatite autoimune'],
        citations: [{ refId: 'easl-cirrhosis-2024' }]
      },
      fisiopatologia: {
        texto: 'Lesao hepatica cronica ativa celulas estreladas, producao excessiva de colageno e fibrose progressiva. Distorcao vascular causa hipertensao portal.',
        citations: [{ refId: 'nejm-cirrhosis-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fadiga', 'Ictericia', 'Ascite', 'Edema', 'Confusao mental'],
        sinaisExameFisico: ['Hepatomegalia/atrofia', 'Esplenomegalia', 'Aranhas vasculares', 'Eritema palmar', 'Ginecomastia'],
        formasClinicas: ['Compensada', 'Descompensada (ascite, varizes, encefalopatia, ictericia)'],
        citations: [{ refId: 'easl-cirrhosis-2024' }]
      },
      diagnostico: {
        criterios: ['Elastografia >12,5 kPa ou biopsia F4', 'Sinais clinicos e laboratoriais de cirrose', 'Evidencia de hipertensao portal'],
        diagnosticoDiferencial: ['Hepatopatia aguda', 'ICC direita', 'Sindrome de Budd-Chiari'],
        examesLaboratoriais: ['AST, ALT, GGT, FA', 'Bilirrubinas', 'Albumina', 'INR', 'Plaquetas'],
        examesImagem: ['USG abdome', 'Elastografia hepatica', 'TC/RM se nodulo suspeito'],
        citations: [{ refId: 'easl-cirrhosis-2024' }]
      },
      tratamento: {
        objetivos: ['Tratar etiologia', 'Prevenir complicacoes', 'Avaliar transplante'],
        naoFarmacologico: {
          medidas: ['Abstinencia alcoolica absoluta', 'Dieta hipossodica (<2g/dia)', 'Restricao hidrica se Na <125', 'Vacinacao'],
          citations: [{ refId: 'easl-cirrhosis-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Betabloqueador', medicamentos: ['Propranolol', 'Carvedilol'], posologia: 'Propranolol 20-40mg 2x/dia', observacoes: 'Profilaxia primaria varizes' },
            { classe: 'Diuretico', medicamentos: ['Espironolactona', 'Furosemida'], posologia: 'Espironolactona 100mg/dia', observacoes: 'Ascite; relacao 100:40 com furosemida' }
          ],
          citations: [{ refId: 'aasld-cirrhosis-2023' }]
        },
        duracao: 'Tratamento continuo; transplante se indicado'
      },
      acompanhamento: {
        frequenciaConsultas: 'Compensada: 6/6 meses; Descompensada: 3/3 meses',
        examesControle: ['Funcao hepatica', 'USG + AFP 6/6 meses (rastreio HCC)', 'EDA para varizes'],
        metasTerapeuticas: ['Prevenir descompensacao', 'MELD estavel', 'Sem varizes de alto risco'],
        criteriosEncaminhamento: ['MELD >15', 'HCC', 'Descompensacao refrataria'],
        citations: [{ refId: 'easl-cirrhosis-2024' }]
      },
      prevencao: {
        primaria: ['Evitar alcool', 'Vacinacao hepatite B', 'Tratar hepatites virais'],
        secundaria: ['Rastreio HCC', 'Profilaxia varizes'],
        citations: [{ refId: 'easl-cirrhosis-2024' }]
      }
    },
    protocolos: ['cirrose-manejo', 'varizes-profilaxia'],
    medicamentos: ['propranolol', 'espironolactona', 'lactulose'],
    calculadoras: ['meld', 'child-pugh'],
    citations: [{ refId: 'easl-cirrhosis-2024' }],
    lastUpdate: '2026-01',
    tags: ['cirrose', 'hepatopatia', 'hipertensao-portal', 'transplante']
  },

  // ============================================================================
  // HEPATITE AUTOIMUNE
  // ============================================================================
  {
    id: 'hepatite-autoimune',
    titulo: 'Hepatite Autoimune',
    sinonimos: ['HAI', 'Hepatite cronica ativa autoimune'],
    doid: 'DOID:2048',
    snomedCT: '408335007',
    meshId: 'D019693',
    ciap2: ['D72'],
    cid10: ['K75.4'],
    categoria: 'gastrointestinal',
    subcategoria: 'autoimune',
    quickView: {
      definicao: 'Doenca hepatica cronica autoimune caracterizada por inflamacao interface, hipergamaglobulinemia e autoanticorpos. Tipo 1 (ANA/SMA) e Tipo 2 (anti-LKM1).',
      criteriosDiagnosticos: [
        'Elevacao de transaminases',
        'Hipergamaglobulinemia (IgG >1,5x)',
        'Autoanticorpos positivos (ANA, SMA, anti-LKM1)',
        'Histologia: hepatite de interface, plasmocitos',
        'Exclusao de hepatites virais'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar hepatotoxicos', 'Suporte nutricional'],
        farmacologico: ['Prednisona 40-60mg/dia (inducao)', 'Azatioprina 50-150mg/dia (manutencao)', 'Budesonida se cirrose ausente']
      },
      metasTerapeuticas: ['Normalizacao ALT/AST', 'IgG normal', 'Remissao histologica'],
      examesIniciais: ['Transaminases', 'IgG', 'ANA, SMA, anti-LKM1', 'Biopsia hepatica'],
      redFlags: ['Insuficiencia hepatica aguda', 'Cirrose descompensada', 'Nao resposta a corticoide']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-17/100.000',
        incidencia: '1-2/100.000/ano',
        faixaEtaria: 'Bimodal: 10-20 anos e 45-70 anos',
        fatoresRisco: ['Sexo feminino (4:1)', 'Outras doencas autoimunes', 'HLA DR3, DR4'],
        citations: [{ refId: 'easl-aih-2022' }]
      },
      fisiopatologia: {
        texto: 'Perda de tolerancia a antigenos hepatocitarios. Linfocitos T autorreativos causam inflamacao e necrose hepatocelular progressiva.',
        citations: [{ refId: 'lancet-aih-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fadiga', 'Ictericia', 'Desconforto abdominal', 'Artralgia'],
        sinaisExameFisico: ['Hepatomegalia', 'Ictericia', 'Estigmas de doenca autoimune'],
        formasClinicas: ['Tipo 1 (ANA/SMA+)', 'Tipo 2 (anti-LKM1+)', 'Overlap com CBP/CEP'],
        citations: [{ refId: 'easl-aih-2022' }]
      },
      diagnostico: {
        criterios: ['Score IAIHG simplificado >=6 (provavel) ou >=7 (definitivo)', 'Exclusao de outras causas'],
        diagnosticoDiferencial: ['Hepatites virais', 'DILI', 'Doenca de Wilson', 'CBP', 'CEP'],
        examesLaboratoriais: ['AST, ALT', 'IgG total', 'ANA, SMA, anti-LKM1, anti-SLA', 'Sorologias virais'],
        examesImagem: ['USG abdome', 'Elastografia'],
        outrosExames: ['Biopsia hepatica (essencial)'],
        citations: [{ refId: 'easl-aih-2022' }]
      },
      tratamento: {
        objetivos: ['Remissao bioquimica', 'Prevenir fibrose', 'Manter remissao'],
        naoFarmacologico: {
          medidas: ['Evitar hepatotoxicos', 'Suplementacao calcio/vitamina D', 'Monitorar osteoporose'],
          citations: [{ refId: 'easl-aih-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Corticoide', medicamentos: ['Prednisona'], posologia: '40-60mg/dia, desmame ate 10-15mg', observacoes: 'Inducao' },
            { classe: 'Imunomodulador', medicamentos: ['Azatioprina'], posologia: '1-2mg/kg/dia', observacoes: 'Manutencao; checar TPMT' }
          ],
          segundaLinha: [
            { classe: 'Alternativa', medicamentos: ['Micofenolato'], posologia: '1-2g/dia', observacoes: 'Se intolerancia a azatioprina' }
          ],
          citations: [{ refId: 'aasld-aih-2023' }]
        },
        duracao: 'Minimo 3 anos; tentativa de retirada apos remissao sustentada'
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal na inducao; 3-6 meses na manutencao',
        examesControle: ['Transaminases', 'IgG', 'Hemograma (azatioprina)'],
        metasTerapeuticas: ['ALT/AST normais', 'IgG normal', 'Remissao histologica'],
        criteriosEncaminhamento: ['Refratariedade', 'Cirrose', 'Transplante'],
        citations: [{ refId: 'easl-aih-2022' }]
      },
      prevencao: {
        primaria: ['Nao ha prevencao primaria conhecida'],
        secundaria: ['Manutencao da imunossupressao para prevenir recidiva'],
        citations: [{ refId: 'easl-aih-2022' }]
      }
    },
    protocolos: ['hai-inducao', 'hai-manutencao'],
    medicamentos: ['prednisona', 'azatioprina', 'micofenolato'],
    calculadoras: ['iaihg-score'],
    citations: [{ refId: 'easl-aih-2022' }],
    lastUpdate: '2026-01',
    tags: ['hepatite', 'autoimune', 'ANA', 'imunossupressao']
  },

  // ============================================================================
  // COLANGITE BILIAR PRIMARIA
  // ============================================================================
  {
    id: 'colangite-biliar-primaria',
    titulo: 'Colangite Biliar Primaria',
    sinonimos: ['CBP', 'Cirrose biliar primaria'],
    doid: 'DOID:12236',
    snomedCT: '31712002',
    meshId: 'D008105',
    ciap2: ['D97'],
    cid10: ['K74.3'],
    categoria: 'gastrointestinal',
    subcategoria: 'colestase',
    quickView: {
      definicao: 'Doenca hepatica colestática cronica autoimune caracterizada por destruicao progressiva dos ductos biliares intra-hepaticos. Anti-mitocondria (AMA) positivo em >90%.',
      criteriosDiagnosticos: [
        'FA elevada',
        'AMA positivo (>1:40)',
        'Histologia: colangite destrutiva nao supurativa'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suplementacao vitaminas liposoluveis', 'Calcio e vitamina D'],
        farmacologico: ['UDCA 13-15mg/kg/dia', 'Acido obeticolico se resposta inadequada', 'Colestiramina para prurido']
      },
      metasTerapeuticas: ['FA <1,67x LSN e bilirrubina normal', 'Controle do prurido'],
      examesIniciais: ['FA, GGT, bilirrubinas', 'AMA, ANA', 'IgM', 'Elastografia'],
      redFlags: ['Bilirrubina >2 mg/dL', 'Prurido intratavel', 'Cirrose descompensada']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-40/100.000',
        incidencia: '2-4/100.000/ano',
        faixaEtaria: 'Pico 40-60 anos',
        fatoresRisco: ['Sexo feminino (9:1)', 'Historia familiar', 'ITU recorrente'],
        citations: [{ refId: 'easl-pbc-2022' }]
      },
      fisiopatologia: {
        texto: 'Autoimunidade contra PDC-E2 mitocondrial. Destruicao linfocitica de colangiocitos leva a colestase cronica e fibrose biliar progressiva.',
        citations: [{ refId: 'nejm-pbc-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fadiga (principal)', 'Prurido', 'Ictericia (tardio)'],
        sinaisExameFisico: ['Hepatomegalia', 'Xantomas', 'Hiperpigmentacao'],
        formasClinicas: ['AMA positivo classico', 'AMA negativo (ANA+)', 'Overlap com HAI'],
        citations: [{ refId: 'easl-pbc-2022' }]
      },
      diagnostico: {
        criterios: ['2 de 3: FA elevada, AMA >1:40, histologia compativel'],
        diagnosticoDiferencial: ['CEP', 'DILI colestática', 'Sarcoidose', 'Overlap HAI-CBP'],
        examesLaboratoriais: ['FA, GGT', 'Bilirrubinas', 'AMA-M2, ANA (sp100, gp210)', 'IgM'],
        examesImagem: ['USG abdome', 'ColangioRM (excluir CEP)'],
        citations: [{ refId: 'easl-pbc-2022' }]
      },
      tratamento: {
        objetivos: ['Retardar progressao', 'Controlar sintomas'],
        naoFarmacologico: {
          medidas: ['Vitaminas A, D, E, K se colestase severa', 'Calcio 1000-1500mg/dia', 'Exercicio moderado'],
          citations: [{ refId: 'easl-pbc-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Acido biliar', medicamentos: ['UDCA'], posologia: '13-15mg/kg/dia', observacoes: 'Todos os pacientes; melhora sobrevida' }
          ],
          segundaLinha: [
            { classe: 'Agonista FXR', medicamentos: ['Acido obeticolico'], posologia: '5-10mg/dia', observacoes: 'Se resposta inadequada a UDCA; evitar se cirrose avancada' }
          ],
          situacoesEspeciais: [
            { situacao: 'Prurido', conduta: 'Colestiramina 4g 2-4x/dia, Rifampicina 150-300mg/dia se refratario' }
          ],
          citations: [{ refId: 'aasld-pbc-2023' }]
        },
        duracao: 'Tratamento continuo indefinido'
      },
      acompanhamento: {
        frequenciaConsultas: '6/6 meses se estavel',
        examesControle: ['FA, bilirrubinas a cada 3-6 meses', 'Elastografia anual', 'DMO a cada 2-3 anos'],
        metasTerapeuticas: ['FA <1,67x LSN', 'Bilirrubina normal', 'Sem progressao fibrose'],
        criteriosEncaminhamento: ['Nao resposta a UDCA', 'Cirrose', 'Transplante'],
        citations: [{ refId: 'easl-pbc-2022' }]
      },
      prevencao: {
        primaria: ['Nao ha prevencao primaria'],
        secundaria: ['UDCA retarda progressao'],
        citations: [{ refId: 'easl-pbc-2022' }]
      }
    },
    protocolos: ['cbp-manejo'],
    medicamentos: ['udca', 'acido-obeticolico', 'colestiramina'],
    calculadoras: ['uk-pbc-score'],
    citations: [{ refId: 'easl-pbc-2022' }],
    lastUpdate: '2026-01',
    tags: ['colangite', 'colestase', 'AMA', 'UDCA']
  },

  // ============================================================================
  // COLANGITE ESCLEROSANTE PRIMARIA
  // ============================================================================
  {
    id: 'colangite-esclerosante-primaria',
    titulo: 'Colangite Esclerosante Primaria',
    sinonimos: ['CEP', 'Primary sclerosing cholangitis'],
    doid: 'DOID:0050569',
    snomedCT: '197441003',
    meshId: 'D015209',
    ciap2: ['D97'],
    cid10: ['K83.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'colestase',
    quickView: {
      definicao: 'Doenca hepatica colestática cronica caracterizada por inflamacao e fibrose dos ductos biliares intra e extra-hepaticos. Forte associacao com DII (70-80%). Risco aumentado de colangiocarcinoma.',
      criteriosDiagnosticos: [
        'Colestase bioquimica persistente',
        'ColangioRM ou CPRE: estenoses e dilatacoes multifocais (aspecto em colar de contas)',
        'Exclusao de causas secundarias'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Rastreamento de DII', 'Rastreamento de colangiocarcinoma'],
        farmacologico: ['Nenhum tratamento comprovadamente eficaz', 'UDCA controverso', 'Tratar estenoses dominantes']
      },
      metasTerapeuticas: ['Controle de sintomas', 'Deteccao precoce de colangiocarcinoma'],
      examesIniciais: ['FA, GGT, bilirrubinas', 'ColangioRM', 'Colonoscopia', 'IgG4'],
      redFlags: ['Ictericia progressiva', 'Estenose dominante', 'CA 19-9 elevado', 'Colangite bacteriana']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '6-16/100.000',
        incidencia: '0,5-1,3/100.000/ano',
        faixaEtaria: 'Media 40 anos',
        fatoresRisco: ['DII (70-80%)', 'Sexo masculino (2:1)', 'Historia familiar'],
        citations: [{ refId: 'easl-psc-2022' }]
      },
      fisiopatologia: {
        texto: 'Inflamacao periductal progressiva com fibrose concentrica (aneis de cebola). Mecanismo incerto; possivel papel de translocacao bacteriana intestinal e autoimunidade.',
        citations: [{ refId: 'lancet-psc-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fadiga', 'Prurido', 'Dor em HCD', 'Febre intermitente (colangite)'],
        sinaisExameFisico: ['Hepatomegalia', 'Ictericia', 'Esplenomegalia'],
        formasClinicas: ['CEP de grandes ductos (classico)', 'CEP de pequenos ductos', 'Overlap HAI-CEP'],
        citations: [{ refId: 'easl-psc-2022' }]
      },
      diagnostico: {
        criterios: ['Colestase + colangiografia tipica', 'Exclusao de CEP secundaria'],
        diagnosticoDiferencial: ['Colangiopatia por IgG4', 'CEP secundaria', 'Colangiocarcinoma', 'CBP'],
        examesLaboratoriais: ['FA, GGT', 'Bilirrubinas', 'IgG4', 'CA 19-9'],
        examesImagem: ['ColangioRM (padrao-ouro)', 'USG abdome'],
        outrosExames: ['Colonoscopia (rastrear DII)'],
        citations: [{ refId: 'easl-psc-2022' }]
      },
      tratamento: {
        objetivos: ['Nenhum tratamento altera historia natural', 'Manejar complicacoes'],
        naoFarmacologico: {
          medidas: ['Colonoscopia anual (risco CCR se DII)', 'ColangioRM anual (rastrear colangiocarcinoma)', 'Vacinacoes'],
          citations: [{ refId: 'easl-psc-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Acido biliar', medicamentos: ['UDCA'], posologia: '15-20mg/kg/dia', observacoes: 'Controverso; pode melhorar bioquimica mas nao sobrevida' }
          ],
          situacoesEspeciais: [
            { situacao: 'Estenose dominante', conduta: 'Dilatacao endoscopica +/- stent' },
            { situacao: 'Colangite bacteriana', conduta: 'Antibioticos de amplo espectro' }
          ],
          citations: [{ refId: 'aasld-psc-2023' }]
        },
        duracao: 'Acompanhamento indefinido; transplante frequentemente necessario'
      },
      acompanhamento: {
        frequenciaConsultas: '6/6 meses',
        examesControle: ['FA, bilirrubinas', 'CA 19-9', 'ColangioRM anual', 'Colonoscopia anual se DII'],
        metasTerapeuticas: ['FA estavel', 'Sem estenoses novas', 'Rastreio oncologico em dia'],
        criteriosEncaminhamento: ['Cirrose', 'Estenose dominante', 'Colangiocarcinoma suspeitado'],
        citations: [{ refId: 'easl-psc-2022' }]
      },
      prevencao: {
        primaria: ['Nao ha prevencao conhecida'],
        secundaria: ['Rastreamento de colangiocarcinoma e CCR'],
        citations: [{ refId: 'easl-psc-2022' }]
      }
    },
    protocolos: ['cep-manejo', 'cep-rastreio-neoplasia'],
    medicamentos: ['udca'],
    calculadoras: ['mayo-psc-score'],
    citations: [{ refId: 'easl-psc-2022' }],
    lastUpdate: '2026-01',
    tags: ['colangite', 'esclerosante', 'DII', 'colangiocarcinoma']
  },

  // ============================================================================
  // ESTEATOHEPATITE NAO ALCOOLICA (NASH)
  // ============================================================================
  {
    id: 'nash',
    titulo: 'Esteatohepatite Nao Alcoolica (NASH)',
    sinonimos: ['NASH', 'EHNA', 'Nonalcoholic steatohepatitis', 'MASH'],
    doid: 'DOID:0080547',
    snomedCT: '442685003',
    meshId: 'D065626',
    ciap2: ['D97'],
    cid10: ['K75.81'],
    categoria: 'gastrointestinal',
    subcategoria: 'metabolico',
    quickView: {
      definicao: 'Forma progressiva da DHGNA com esteatose, inflamacao lobular e balonizacao hepatocitaria. Principal causa de cirrose criptogenica. Associada a sindrome metabolica.',
      criteriosDiagnosticos: [
        'Esteatose hepatica em imagem ou biopsia',
        'Exclusao de consumo significativo de alcool (<20g/dia mulher, <30g/dia homem)',
        'Histologia: esteatose + inflamacao + balonizacao (NAS >=5)',
        'Exclusao de outras causas'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Perda de peso 7-10%', 'Dieta mediterranea', 'Exercicio 150min/semana'],
        farmacologico: ['Pioglitazona (diabeticos)', 'Vitamina E 800UI/dia (nao diabeticos)', 'Agonistas GLP-1 (semaglutida)']
      },
      metasTerapeuticas: ['Resolucao histologica do NASH', 'Regressao da fibrose', 'Perda de peso sustentada'],
      examesIniciais: ['Transaminases', 'Perfil lipidico', 'Glicemia/HbA1c', 'Elastografia/FIB-4'],
      redFlags: ['Fibrose avancada (F3-F4)', 'Cirrose', 'HCC']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '3-5% da populacao geral; 20-30% entre obesos',
        incidencia: 'Aumentando globalmente',
        fatoresRisco: ['Obesidade', 'DM2', 'Dislipidemia', 'Sindrome metabolica', 'SAHOS'],
        citations: [{ refId: 'aasld-nafld-2023' }]
      },
      fisiopatologia: {
        texto: 'Teoria dos multiplos hits: resistencia insulinica, lipotoxicidade, estresse oxidativo, disfuncao mitocondrial, microbiota alterada e inflamacao.',
        citations: [{ refId: 'nejm-nash-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Geralmente assintomatico', 'Fadiga', 'Desconforto em HCD'],
        sinaisExameFisico: ['Obesidade', 'Hepatomegalia', 'Acantose nigricans'],
        formasClinicas: ['NASH sem fibrose', 'NASH com fibrose', 'Cirrose NASH'],
        citations: [{ refId: 'aasld-nafld-2023' }]
      },
      diagnostico: {
        criterios: ['Esteatose + exclusao de alcool + exclusao de outras causas', 'Biopsia: NAS >=5 com fibrose'],
        diagnosticoDiferencial: ['Doenca hepatica alcoolica', 'Hepatite C', 'Hepatite autoimune', 'Wilson', 'DILI'],
        examesLaboratoriais: ['AST, ALT (ALT > AST)', 'GGT', 'Ferritina', 'Perfil metabolico'],
        examesImagem: ['USG (esteatose)', 'Elastografia transitoria', 'RM com fracao de gordura'],
        outrosExames: ['Biopsia hepatica (padrao-ouro para NASH)'],
        citations: [{ refId: 'easl-nafld-2024' }]
      },
      tratamento: {
        objetivos: ['Resolucao do NASH', 'Regressao fibrose', 'Controle metabolico'],
        naoFarmacologico: {
          medidas: ['Perda de peso 7-10% (ideal >10%)', 'Dieta mediterranea', 'Exercicio aerobico 150-200min/semana', 'Evitar frutose'],
          citations: [{ refId: 'aasld-nafld-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Tiazolidinediona', medicamentos: ['Pioglitazona'], posologia: '30-45mg/dia', observacoes: 'Melhora histologica; usar em diabeticos' },
            { classe: 'Antioxidante', medicamentos: ['Vitamina E'], posologia: '800 UI/dia', observacoes: 'Nao diabeticos sem cirrose' }
          ],
          segundaLinha: [
            { classe: 'Agonista GLP-1', medicamentos: ['Semaglutida'], posologia: '2,4mg SC/semana', observacoes: 'Resolucao NASH em 59% (STEP)' }
          ],
          citations: [{ refId: 'nejm-semaglutide-nash-2021' }]
        },
        duracao: 'Tratamento cronico com mudanca de estilo de vida'
      },
      acompanhamento: {
        frequenciaConsultas: '6-12 meses se F0-F2; 3-6 meses se F3-F4',
        examesControle: ['Transaminases', 'FIB-4/elastografia anual', 'Rastreio HCC se cirrose'],
        metasTerapeuticas: ['Resolucao histologica NASH', 'Regressao fibrose', 'Perda peso >10%'],
        criteriosEncaminhamento: ['Fibrose >=F2', 'Cirrose', 'Candidatos a transplante'],
        citations: [{ refId: 'aasld-nafld-2023' }]
      },
      prevencao: {
        primaria: ['Manutencao de peso saudavel', 'Dieta equilibrada', 'Exercicio regular'],
        secundaria: ['Controle metabolico intensivo', 'Perda de peso'],
        citations: [{ refId: 'easl-nafld-2024' }]
      }
    },
    protocolos: ['nash-manejo'],
    medicamentos: ['pioglitazona', 'vitamina-e', 'semaglutida'],
    calculadoras: ['fib-4', 'nfs', 'nas-score'],
    citations: [{ refId: 'aasld-nafld-2023' }],
    lastUpdate: '2026-01',
    tags: ['NASH', 'esteatose', 'sindrome-metabolica', 'fibrose']
  },

  // ============================================================================
  // SINDROME HEPATORRENAL
  // ============================================================================
  {
    id: 'sindrome-hepatorrenal',
    titulo: 'Sindrome Hepatorrenal',
    sinonimos: ['SHR', 'Hepatorenal syndrome'],
    doid: 'DOID:13169',
    snomedCT: '27765000',
    meshId: 'D006530',
    ciap2: ['U99'],
    cid10: ['K76.7'],
    categoria: 'gastrointestinal',
    subcategoria: 'complicacao_cirrose',
    quickView: {
      definicao: 'Insuficiencia renal funcional em pacientes com cirrose avancada e ascite, causada por vasodilatacao esplancnica e vasoconstriccao renal. SHR-AKI (tipo 1) e SHR-NAKI (tipo 2).',
      criteriosDiagnosticos: [
        'Cirrose com ascite',
        'Cr >1,5 mg/dL ou aumento >=0,3 mg/dL em 48h',
        'Ausencia de resposta a suspensao de diureticos e expansao com albumina',
        'Ausencia de choque',
        'Ausencia de nefrotoxicos',
        'Ausencia de doenca parenquimatosa renal'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Suspender diureticos', 'Expansao com albumina'],
        farmacologico: ['Terlipressina + albumina', 'Noradrenalina + albumina (alternativa)', 'TIPS em casos selecionados']
      },
      metasTerapeuticas: ['Resposta: Cr <1,5 mg/dL', 'Ponte para transplante'],
      examesIniciais: ['Creatinina', 'Sodio urinario', 'Sedimento urinario', 'USG renal'],
      redFlags: ['SHR-AKI (rapida progressao)', 'Nao resposta a vasoconstritores', 'Falencia multiorganica']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20% dos cirroticos com ascite em 1 ano; 40% em 5 anos',
        fatoresRisco: ['Ascite refrataria', 'PBE', 'Hemorragia varicosa', 'Cirrose MELD alto'],
        citations: [{ refId: 'easl-hrs-2023' }]
      },
      fisiopatologia: {
        texto: 'Vasodilatacao esplancnica por NO e vasodilatadores. Ativacao compensatoria do SRAA e sistema simpatico causa vasoconstriccao renal intensa. Disfuncao cardiaca contribui (cardiomiopatia cirrotica).',
        citations: [{ refId: 'nejm-hrs-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Oliguria', 'Ascite refrataria', 'Sinais de cirrose avancada'],
        sinaisExameFisico: ['Ascite tensa', 'Hipotensao', 'Ictericia'],
        formasClinicas: ['SHR-AKI (antigo tipo 1): rapido, grave', 'SHR-NAKI (antigo tipo 2): lento, estavel'],
        citations: [{ refId: 'ica-aki-cirrhosis-2023' }]
      },
      diagnostico: {
        criterios: ['Criterios ICA-AKI', 'Nao resposta a albumina 1g/kg por 2 dias', 'Exclusao de outras causas'],
        diagnosticoDiferencial: ['IRA pre-renal (responde a volume)', 'NTA', 'Nefropatia por IgA', 'Glomerulonefrite'],
        examesLaboratoriais: ['Creatinina seriada', 'Sodio urinario (<10 mEq/L)', 'Sedimento urinario bland', 'NGAL urinario'],
        examesImagem: ['USG renal (rins normais)'],
        citations: [{ refId: 'easl-hrs-2023' }]
      },
      tratamento: {
        objetivos: ['Reverter IRA', 'Ponte para transplante'],
        naoFarmacologico: {
          medidas: ['Suspender diureticos', 'Suspender betabloqueador se PA baixa', 'Evitar nefrotoxicos'],
          citations: [{ refId: 'easl-hrs-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Vasoconstritor', medicamentos: ['Terlipressina'], posologia: '1mg IV 4-6h; aumentar ate 2mg 4-6h', observacoes: 'Primeira linha; monitorar isquemia' },
            { classe: 'Expansor plasmatico', medicamentos: ['Albumina'], posologia: '20-40g/dia', observacoes: 'Associar sempre ao vasoconstritor' }
          ],
          segundaLinha: [
            { classe: 'Vasoconstritor alternativo', medicamentos: ['Noradrenalina'], posologia: '0,5-3mg/h IV contínuo', observacoes: 'UTI; se terlipressina indisponivel' }
          ],
          citations: [{ refId: 'nejm-terlipressin-confirm-2021' }]
        },
        duracao: 'Ate resposta ou transplante; maximo 14 dias'
      },
      acompanhamento: {
        frequenciaConsultas: 'Hospitalizacao; monitoramento intensivo',
        examesControle: ['Creatinina diaria', 'Debito urinario', 'Sodio'],
        metasTerapeuticas: ['Cr <1,5 mg/dL', 'Debito urinario >0,5mL/kg/h', 'Ponte para transplante'],
        criteriosEncaminhamento: ['Transplante hepatico urgente'],
        citations: [{ refId: 'easl-hrs-2023' }]
      },
      prevencao: {
        primaria: ['Albumina apos paracentese de grande volume', 'Norfloxacino profilatico pos-PBE'],
        secundaria: ['Pentoxifilina controversa'],
        citations: [{ refId: 'easl-hrs-2023' }]
      }
    },
    protocolos: ['shr-manejo'],
    medicamentos: ['terlipressina', 'albumina', 'noradrenalina'],
    calculadoras: ['meld', 'ica-aki'],
    citations: [{ refId: 'easl-hrs-2023' }],
    lastUpdate: '2026-01',
    tags: ['hepatorrenal', 'cirrose', 'IRA', 'terlipressina', 'transplante']
  },

  // ============================================================================
  // ENCEFALOPATIA HEPATICA
  // ============================================================================
  {
    id: 'encefalopatia-hepatica',
    titulo: 'Encefalopatia Hepatica',
    sinonimos: ['EH', 'Hepatic encephalopathy'],
    doid: 'DOID:13413',
    snomedCT: '13920009',
    meshId: 'D006501',
    ciap2: ['D97'],
    cid10: ['K72.9'],
    categoria: 'gastrointestinal',
    subcategoria: 'complicacao_cirrose',
    quickView: {
      definicao: 'Disfuncao cerebral causada por insuficiencia hepatica e/ou shunts portossistemicos. Espectro de alteracoes neuropsiquiatricas desde minima (psicometria) ate coma.',
      criteriosDiagnosticos: [
        'Hepatopatia cronica ou shunt portossistemico',
        'Alteracao do estado mental',
        'Exclusao de outras causas de encefalopatia',
        'Classificacao West Haven (graus 0-4)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Identificar e tratar precipitante', 'Evitar restricao proteica'],
        farmacologico: ['Lactulose 25mL 2-4x/dia (2-3 evacuacoes pastosas/dia)', 'Rifaximina 550mg 2x/dia (profilaxia secundaria)']
      },
      metasTerapeuticas: ['Resolucao dos sintomas', 'Prevenir recorrencia'],
      examesIniciais: ['Amonia (util se duvida)', 'Excluir infeccao', 'Excluir HDA', 'Eletrolitos', 'TC cranio se duvida'],
      redFlags: ['Grau III-IV (coma)', 'Edema cerebral', 'Precipitante nao identificado']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '30-40% dos cirroticos apresentam EH clinica; 60-80% EH minima',
        incidencia: 'Risco anual de primeiro episodio: 20% em cirrose descompensada',
        fatoresRisco: ['Cirrose avancada', 'TIPS', 'Shunts espontaneos', 'Sarcopenia'],
        citations: [{ refId: 'easl-he-2022' }]
      },
      fisiopatologia: {
        texto: 'Acumulo de neurotoxinas (amonia principal) que escapam do metabolismo hepatico. Edema astrocitario, neuroinflamacao, alteracao de neurotransmissao GABAergica e glutamatergica.',
        citations: [{ refId: 'nejm-he-2020' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Confusao', 'Desorientacao', 'Alteracao ciclo sono-vigilia', 'Asterixis', 'Coma'],
        sinaisExameFisico: ['Asterixis (flapping)', 'Fetor hepatico', 'Sinais de hepatopatia'],
        formasClinicas: ['Minima (testes psicometricos)', 'Grau I (alteracao leve)', 'Grau II (letargia)', 'Grau III (estupor)', 'Grau IV (coma)'],
        citations: [{ refId: 'easl-he-2022' }]
      },
      diagnostico: {
        criterios: ['Clinica compativel + hepatopatia + exclusao de outras causas'],
        diagnosticoDiferencial: ['Outras encefalopatias metabolicas', 'AVC', 'Infeccao SNC', 'Abstinencia alcoolica', 'Wernicke'],
        examesLaboratoriais: ['Amonia (elevada, mas nao correlaciona com gravidade)', 'Glicemia', 'Eletrolitos', 'Funcao renal', 'Hemograma'],
        examesImagem: ['TC cranio se duvida diagnostica'],
        outrosExames: ['Testes psicometricos (EH minima)', 'EEG (ondas trifasicas)'],
        citations: [{ refId: 'aasld-he-2023' }]
      },
      tratamento: {
        objetivos: ['Tratar episodio agudo', 'Prevenir recorrencia'],
        naoFarmacologico: {
          medidas: ['Identificar precipitante (infeccao, HDA, constipacao, medicamentos)', 'Dieta normoproteica (1,2-1,5g/kg)', 'Evitar BZD'],
          citations: [{ refId: 'easl-he-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Dissacarideo nao absorvivel', medicamentos: ['Lactulose'], posologia: '25mL 2-4x/dia ate 2-3 evacuacoes pastosas', observacoes: 'Primeira linha tratamento e profilaxia' },
            { classe: 'Antibiotico', medicamentos: ['Rifaximina'], posologia: '550mg 2x/dia', observacoes: 'Adicionar a lactulose para profilaxia secundaria' }
          ],
          situacoesEspeciais: [
            { situacao: 'EH refrataria', conduta: 'Considerar LOLA, embolizacao de shunts' }
          ],
          citations: [{ refId: 'nejm-rifaximin-he-2010' }]
        },
        duracao: 'Profilaxia secundaria continua com lactulose +/- rifaximina'
      },
      acompanhamento: {
        frequenciaConsultas: 'Hospitalizacao em episodio agudo; ambulatorio mensal apos',
        examesControle: ['Funcao hepatica', 'Avaliacao cognitiva'],
        metasTerapeuticas: ['Sem episodios de EH', 'Cognicao preservada', '2-3 evacuacoes pastosas/dia'],
        criteriosEncaminhamento: ['Recorrencia frequente', 'Transplante'],
        citations: [{ refId: 'easl-he-2022' }]
      },
      prevencao: {
        primaria: ['Lactulose se alto risco'],
        secundaria: ['Lactulose + rifaximina reduz recorrencia em 50%'],
        citations: [{ refId: 'aasld-he-2023' }]
      }
    },
    protocolos: ['eh-manejo', 'eh-profilaxia'],
    medicamentos: ['lactulose', 'rifaximina'],
    calculadoras: ['west-haven', 'meld'],
    citations: [{ refId: 'easl-he-2022' }],
    lastUpdate: '2026-01',
    tags: ['encefalopatia', 'amonia', 'lactulose', 'cirrose']
  },

  // ============================================================================
  // HEPATOCARCINOMA
  // ============================================================================
  {
    id: 'hepatocarcinoma',
    titulo: 'Hepatocarcinoma',
    sinonimos: ['HCC', 'Carcinoma hepatocelular', 'Cancer de figado primario'],
    doid: 'DOID:684',
    snomedCT: '25370001',
    meshId: 'D006528',
    ciap2: ['D77'],
    cid10: ['C22.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'neoplasia',
    quickView: {
      definicao: 'Neoplasia hepatica primaria mais comum. >80% ocorre em figado cirrotico. Principais fatores: hepatite B/C, alcool, NASH. Diagnostico por imagem com contraste (wash-in arterial, wash-out portal).',
      criteriosDiagnosticos: [
        'Nodulo hepatico em cirrotico',
        'TC/RM: realce arterial + washout portal/tardio (LI-RADS 5)',
        'Ou biopsia positiva',
        'AFP >400 ng/mL altamente sugestivo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Estadiamento BCLC', 'Discussao multidisciplinar'],
        farmacologico: ['BCLC 0-A: Resseccao, ablacao ou transplante', 'BCLC B: TACE', 'BCLC C: Atezolizumabe + Bevacizumabe', 'BCLC D: Suporte']
      },
      metasTerapeuticas: ['Cura (estadios precoces)', 'Controle de doenca', 'Paliacao'],
      examesIniciais: ['TC trifasica ou RM com contraste', 'AFP', 'Funcao hepatica', 'Performance status'],
      redFlags: ['Trombose portal tumoral', 'Metastases', 'Child C', 'Ruptura tumoral']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '5o cancer mais comum; 3a causa de morte por cancer',
        incidencia: '10-15/100.000/ano (varia por regiao)',
        fatoresRisco: ['Cirrose (qualquer etiologia)', 'Hepatite B cronica (mesmo sem cirrose)', 'Hepatite C', 'NASH', 'Alcool', 'Aflatoxinas'],
        citations: [{ refId: 'easl-hcc-2024' }]
      },
      fisiopatologia: {
        texto: 'Inflamacao cronica e regeneracao hepatica promovem acumulo de mutacoes. Vias ativadas incluem Wnt/beta-catenina, PI3K/AKT/mTOR. Ambiente pro-tumoral no figado cirrotico.',
        citations: [{ refId: 'nejm-hcc-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Frequentemente assintomatico (diagnostico por rastreio)', 'Dor abdominal', 'Perda de peso', 'Descompensacao hepatica'],
        sinaisExameFisico: ['Hepatomegalia nodular', 'Ascite', 'Ictericia'],
        formasClinicas: ['Nodulo solitario', 'Multinodular', 'Infiltrativo'],
        citations: [{ refId: 'easl-hcc-2024' }]
      },
      diagnostico: {
        criterios: ['Criterios de imagem LI-RADS 5', 'Ou histopatologia'],
        diagnosticoDiferencial: ['Nodulo de regeneracao', 'Nodulo displasico', 'Colangiocarcinoma', 'Metastase hepatica'],
        examesLaboratoriais: ['AFP (elevada em 60%)', 'Funcao hepatica', 'Plaquetas'],
        examesImagem: ['TC trifasica hepatica', 'RM com gadolineo hepatoespecifico', 'USG com contraste'],
        outrosExames: ['Biopsia se imagem inconclusiva'],
        citations: [{ refId: 'aasld-hcc-2023' }]
      },
      tratamento: {
        objetivos: ['Cura se possivel', 'Controle tumoral', 'Preservar funcao hepatica'],
        naoFarmacologico: {
          medidas: ['Estadiamento BCLC', 'Avaliacao para transplante', 'Discussao em tumor board'],
          citations: [{ refId: 'easl-hcc-2024' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Imunoterapia + anti-angiogenico', medicamentos: ['Atezolizumabe', 'Bevacizumabe'], posologia: 'Atezo 1200mg + Beva 15mg/kg IV 3/3sem', observacoes: 'BCLC C, primeira linha; melhor sobrevida' }
          ],
          segundaLinha: [
            { classe: 'TKI', medicamentos: ['Sorafenibe', 'Lenvatinibe'], posologia: 'Sorafenibe 400mg 2x/dia', observacoes: 'Se contraindicacao a imunoterapia' },
            { classe: 'Segunda linha sistemica', medicamentos: ['Regorafenibe', 'Cabozantinibe'], posologia: 'Apos progressao a sorafenibe', observacoes: 'Terceira linha: Ramucirumabe se AFP >400' }
          ],
          situacoesEspeciais: [
            { situacao: 'BCLC 0-A', conduta: 'Resseccao, ablacao por radiofrequencia ou transplante' },
            { situacao: 'BCLC B', conduta: 'TACE (quimioembolizacao transarterial)' }
          ],
          citations: [{ refId: 'nejm-imbrave150-2020' }]
        },
        duracao: 'Tratamento sistemico ate progressao ou toxicidade'
      },
      acompanhamento: {
        frequenciaConsultas: 'A cada 3 meses durante tratamento',
        examesControle: ['TC/RM a cada 3 meses (mRECIST)', 'AFP', 'Funcao hepatica'],
        metasTerapeuticas: ['Resposta objetiva (mRECIST)', 'Controle de doenca', 'Funcao hepatica preservada'],
        criteriosEncaminhamento: ['Oncologia', 'Cirurgia hepatobiliar', 'Transplante'],
        citations: [{ refId: 'easl-hcc-2024' }]
      },
      prevencao: {
        primaria: ['Vacinacao hepatite B', 'Tratamento hepatite C', 'Controle NASH'],
        secundaria: ['Rastreamento: USG + AFP 6/6 meses em cirroticos'],
        citations: [{ refId: 'aasld-hcc-2023' }]
      }
    },
    protocolos: ['hcc-rastreio', 'hcc-estadiamento-bclc'],
    medicamentos: ['atezolizumabe', 'bevacizumabe', 'sorafenibe', 'lenvatinibe'],
    calculadoras: ['bclc', 'meld', 'child-pugh'],
    citations: [{ refId: 'easl-hcc-2024' }],
    lastUpdate: '2026-01',
    tags: ['HCC', 'cancer', 'cirrose', 'imunoterapia', 'transplante']
  },

  // ============================================================================
  // DOENCA HEPATICA GORDUROSA NAO ALCOOLICA (DHGNA)
  // ============================================================================
  {
    id: 'dhgna',
    titulo: 'Doenca Hepatica Gordurosa Nao Alcoolica (DHGNA)',
    sinonimos: ['DHGNA', 'NAFLD', 'Esteatose hepatica', 'Figado gorduroso'],
    doid: 'DOID:0080208',
    snomedCT: '197321007',
    meshId: 'D065626',
    ciap2: ['D97'],
    cid10: ['K76.0'],
    categoria: 'gastrointestinal',
    subcategoria: 'metabolico',
    quickView: {
      definicao: 'Acumulo de gordura hepatica (>5% dos hepatocitos) na ausencia de consumo significativo de alcool ou outras causas. Espectro: esteatose simples a NASH a cirrose.',
      criteriosDiagnosticos: [
        'Esteatose hepatica em imagem ou histologia',
        'Exclusao de alcool (>20g/dia mulher, >30g/dia homem)',
        'Exclusao de outras causas (hepatite viral, drogas, Wilson)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Perda de peso 5-10%', 'Exercicio aerobico', 'Dieta mediterranea'],
        farmacologico: ['Tratar comorbidades metabolicas', 'Considerar pioglitazona/vitamina E se NASH', 'Estatina segura']
      },
      metasTerapeuticas: ['Resolucao da esteatose', 'Prevenir progressao para NASH/fibrose'],
      examesIniciais: ['Transaminases', 'USG abdome', 'FIB-4', 'Perfil metabolico'],
      redFlags: ['Fibrose significativa (F2+)', 'NASH confirmado', 'Cirrose']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '25-30% da populacao global; >70% em obesos/diabeticos',
        incidencia: 'Principal causa de doenca hepatica cronica no Ocidente',
        fatoresRisco: ['Obesidade', 'DM2', 'Sindrome metabolica', 'Dislipidemia', 'Sedentarismo'],
        citations: [{ refId: 'easl-nafld-2024' }]
      },
      fisiopatologia: {
        texto: 'Resistencia insulinica leva a lipogenese de novo e acumulo de triglicerideos hepaticos. Esteatose simples pode progredir para NASH se lipotoxicidade e estresse oxidativo.',
        citations: [{ refId: 'lancet-nafld-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Assintomatico na maioria', 'Fadiga leve', 'Desconforto em HCD'],
        sinaisExameFisico: ['Obesidade central', 'Hepatomegalia leve'],
        formasClinicas: ['Esteatose simples (NAFL)', 'NASH', 'NASH com fibrose', 'Cirrose'],
        citations: [{ refId: 'aasld-nafld-2023' }]
      },
      diagnostico: {
        criterios: ['Esteatose em imagem + exclusao de alcool e outras causas', 'Biopsia para diferenciar NAFL de NASH'],
        diagnosticoDiferencial: ['Doenca hepatica alcoolica', 'Hepatites virais', 'Doenca de Wilson', 'Hemocromatose'],
        examesLaboratoriais: ['AST, ALT (podem ser normais)', 'GGT', 'Perfil lipidico', 'Glicemia, HbA1c', 'Ferritina'],
        examesImagem: ['USG (esteatose >=20%)', 'CAP na elastografia', 'RM-PDFF (quantificacao)'],
        outrosExames: ['FIB-4 e NFS para rastreio de fibrose', 'Elastografia se FIB-4 intermediario'],
        citations: [{ refId: 'easl-nafld-2024' }]
      },
      tratamento: {
        objetivos: ['Resolucao esteatose', 'Prevenir progressao', 'Controle metabolico'],
        naoFarmacologico: {
          medidas: ['Perda de peso 5-7% (esteatose), >10% (fibrose)', 'Dieta mediterranea', 'Exercicio 150-200min/semana', 'Cessar alcool'],
          citations: [{ refId: 'aasld-nafld-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Nenhuma droga aprovada especifica', medicamentos: ['Pioglitazona', 'Vitamina E'], posologia: 'Ver NASH para indicacoes', observacoes: 'Apenas se NASH comprovado' }
          ],
          situacoesEspeciais: [
            { situacao: 'Dislipidemia', conduta: 'Estatinas seguras e indicadas; reduzem risco CV' }
          ],
          citations: [{ refId: 'easl-nafld-2024' }]
        },
        duracao: 'Mudanca de estilo de vida permanente'
      },
      acompanhamento: {
        frequenciaConsultas: 'Anual se esteatose simples; 6-12 meses se fibrose',
        examesControle: ['Transaminases', 'FIB-4 anual', 'Elastografia se necessario'],
        metasTerapeuticas: ['Resolucao esteatose', 'FIB-4 <1,3', 'Perda peso 5-10%'],
        criteriosEncaminhamento: ['FIB-4 >2,67', 'Elastografia >9,6 kPa', 'Suspeita de NASH'],
        citations: [{ refId: 'aasld-nafld-2023' }]
      },
      prevencao: {
        primaria: ['Prevencao da obesidade', 'Dieta saudavel', 'Exercicio regular'],
        secundaria: ['Perda de peso previne progressao'],
        citations: [{ refId: 'easl-nafld-2024' }]
      }
    },
    protocolos: ['dhgna-manejo'],
    medicamentos: ['pioglitazona', 'vitamina-e'],
    calculadoras: ['fib-4', 'nfs'],
    citations: [{ refId: 'easl-nafld-2024' }],
    lastUpdate: '2026-01',
    tags: ['DHGNA', 'NAFLD', 'esteatose', 'sindrome-metabolica', 'fibrose']
  },

  // ============================================================================
  // ASCITE
  // ============================================================================
  {
    id: 'ascite',
    titulo: 'Ascite',
    sinonimos: ['Ascite hepatica', 'Liquido ascitico'],
    doid: 'DOID:13140',
    snomedCT: '389026000',
    meshId: 'D001201',
    ciap2: ['D97'],
    cid10: ['R18'],
    categoria: 'gastrointestinal',
    subcategoria: 'complicacao_cirrose',
    quickView: {
      definicao: 'Acumulo patologico de liquido na cavidade peritoneal. Em cirrose, resulta de hipertensao portal, hipoalbuminemia e retencao de sodio. GASA >=1,1 indica hipertensao portal.',
      criteriosDiagnosticos: [
        'Exame fisico: macicez movel, onda ascitica',
        'USG confirma liquido livre',
        'Paracentese: GASA >=1,1 (hipertensao portal)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Restricao de sodio (<2g/dia)', 'Restricao hidrica se Na <125'],
        farmacologico: ['Espironolactona 100mg/dia (aumentar ate 400mg)', 'Furosemida 40mg/dia (aumentar ate 160mg)', 'Paracentese de alivio + albumina']
      },
      metasTerapeuticas: ['Controle da ascite', 'Prevenir PBE', 'Avaliar TIPS ou transplante se refrataria'],
      examesIniciais: ['Paracentese diagnostica', 'GASA', 'Proteina total do LA', 'Celularidade'],
      redFlags: ['PBE (PMN >250/mm3)', 'Ascite refrataria', 'Sindrome hepatorrenal']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '50% dos cirroticos desenvolvem ascite em 10 anos',
        fatoresRisco: ['Cirrose descompensada', 'MELD elevado', 'Hiponatremia'],
        citations: [{ refId: 'easl-ascites-2023' }]
      },
      fisiopatologia: {
        texto: 'Hipertensao portal causa vasodilatacao esplancnica com ativacao do SRAA e retencao de sodio/agua. Hipoalbuminemia reduz pressao oncotica. Formacao de linfa excede capacidade de drenagem.',
        citations: [{ refId: 'nejm-ascites-2021' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Aumento do volume abdominal', 'Dispneia (se volumosa)', 'Saciedade precoce'],
        sinaisExameFisico: ['Macicez movel', 'Semicirculo de Skoda', 'Onda ascitica', 'Hernia umbilical'],
        formasClinicas: ['Grau 1 (leve, so USG)', 'Grau 2 (moderada)', 'Grau 3 (tensa)'],
        citations: [{ refId: 'easl-ascites-2023' }]
      },
      diagnostico: {
        criterios: ['Clinica + USG', 'Paracentese define etiologia'],
        diagnosticoDiferencial: ['Carcinomatose peritoneal (GASA <1,1)', 'TB peritoneal', 'Ascite pancreatica', 'Sindrome nefrotica', 'ICC'],
        examesLaboratoriais: ['GASA (albumina soro - albumina LA)', 'Proteina total LA', 'Citologia', 'Cultura se suspeita infeccao'],
        examesImagem: ['USG abdome'],
        citations: [{ refId: 'aasld-ascites-2023' }]
      },
      tratamento: {
        objetivos: ['Mobilizar ascite', 'Prevenir complicacoes'],
        naoFarmacologico: {
          medidas: ['Restricao sodio <2g/dia', 'Restricao hidrica se Na <125 mEq/L', 'Repouso relativo'],
          citations: [{ refId: 'easl-ascites-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Diuretico poupador de potassio', medicamentos: ['Espironolactona'], posologia: '100-400mg/dia', observacoes: 'Primeira linha; aumentar a cada 3-5 dias' },
            { classe: 'Diuretico de alca', medicamentos: ['Furosemida'], posologia: '40-160mg/dia', observacoes: 'Associar a espironolactona (100:40)' }
          ],
          situacoesEspeciais: [
            { situacao: 'Ascite tensa', conduta: 'Paracentese de grande volume + albumina 8g/L removido' },
            { situacao: 'Ascite refrataria', conduta: 'TIPS; paracenteses seriadas; transplante' }
          ],
          citations: [{ refId: 'aasld-ascites-2023' }]
        },
        duracao: 'Tratamento continuo enquanto ascite presente'
      },
      acompanhamento: {
        frequenciaConsultas: 'Semanal ate controle; depois mensal',
        examesControle: ['Peso diario', 'Sodio, potassio, creatinina', 'Paracentese se piora clinica'],
        metasTerapeuticas: ['Controle ascite sem paracentese', 'Perda peso 0,5-1kg/dia', 'Na >130 mEq/L'],
        criteriosEncaminhamento: ['Ascite refrataria', 'PBE', 'Transplante'],
        citations: [{ refId: 'easl-ascites-2023' }]
      },
      prevencao: {
        primaria: ['Tratar causa base da cirrose'],
        secundaria: ['Norfloxacino profilatico apos PBE ou se proteina LA <1,5 + insuf hepatica'],
        citations: [{ refId: 'easl-ascites-2023' }]
      }
    },
    protocolos: ['ascite-manejo', 'pbe-profilaxia'],
    medicamentos: ['espironolactona', 'furosemida', 'albumina'],
    calculadoras: ['gasa', 'meld'],
    citations: [{ refId: 'easl-ascites-2023' }],
    lastUpdate: '2026-01',
    tags: ['ascite', 'cirrose', 'diuretico', 'paracentese', 'TIPS']
  }
];
