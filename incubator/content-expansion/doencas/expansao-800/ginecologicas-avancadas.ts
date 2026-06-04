/**
 * DOENCAS GINECOLOGICAS AVANCADAS - DARWIN-MFC EXPANSAO 800
 * ==========================================================
 * 12 condicoes ginecologicas comuns na APS
 */

import { Doenca } from '@/lib/types/doenca';

export const ginecologicasAvancadas: Doenca[] = [
  // ============================================================================
  // ENDOMETRIOSE
  // ============================================================================
  {
    id: 'endometriose',
    titulo: 'Endometriose',
    sinonimos: ['Endometriosis'],
    doid: 'DOID:289',
    snomedCT: '129103003',
    meshId: 'D004715',
    ciap2: ['X99'],
    cid10: ['N80', 'N80.0', 'N80.1'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Presenca de tecido endometrial fora da cavidade uterina causando dor pelvica cronica e infertilidade. Afeta 10% das mulheres em idade reprodutiva.',
      criteriosDiagnosticos: [
        'Dismenorreia progressiva',
        'Dispareunia profunda',
        'Dor pelvica cronica',
        'Infertilidade',
        'Nodulos em ligamentos uterossacros ao toque'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Calor local', 'Exercicio fisico regular', 'Acupuntura'],
        farmacologico: ['AINEs para dismenorreia', 'ACO combinado continuo', 'Progestagenos (dienogeste 2mg/dia)', 'Analgo GnRH se refrataria']
      },
      redFlags: ['Massa ovariana suspeita (endometrioma)', 'Obstrucao intestinal/urinaria', 'Infertilidade >1 ano']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10% mulheres em idade reprodutiva',
        fatoresRisco: ['Menarca precoce', 'Ciclos curtos', 'Fluxo abundante', 'Nuliparidade', 'Historia familiar'],
        citations: [{ refId: 'eshre-endometriosis-2022' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dismenorreia', 'Dispareunia', 'Dor pelvica cronica', 'Infertilidade'],
        sinaisExameFisico: ['Nodulos em fundo de saco posterior', 'Utero fixo retrovertido', 'Massas anexiais'],
        citations: [{ refId: 'eshre-endometriosis-2022' }]
      },
      diagnostico: {
        criterios: ['Clinico + USG TV', 'RM pelve em casos complexos', 'Laparoscopia padrao-ouro'],
        diagnosticoDiferencial: ['Adenomiose', 'DIP cronica', 'Sindrome do intestino irritavel'],
        examesImagem: ['USG transvaginal', 'RM pelve'],
        citations: [{ refId: 'acog-endometriosis-2023' }]
      },
      tratamento: {
        objetivos: ['Alivio da dor', 'Preservacao fertilidade', 'Melhora qualidade de vida'],
        naoFarmacologico: {
          medidas: ['Calor local', 'Exercicio', 'Fisioterapia pelvica'],
          citations: [{ refId: 'eshre-endometriosis-2022' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'AINE', medicamentos: ['Ibuprofeno', 'Naproxeno'], posologia: 'Uso na dismenorreia' },
            { classe: 'Progestageno', medicamentos: ['Dienogeste'], posologia: '2mg/dia continuo' },
            { classe: 'ACO combinado', medicamentos: ['Etinilestradiol + levonorgestrel'], posologia: 'Uso continuo' }
          ],
          citations: [{ refId: 'acog-endometriosis-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral ate controle; semestral depois',
        metasTerapeuticas: ['Controle da dor', 'Prevencao progressao'],
        criteriosEncaminhamento: ['Endometrioma >4cm', 'Infertilidade', 'Refratariedade'],
        citations: [{ refId: 'febrasgo-endometriose-2023' }]
      },
      prevencao: {
        primaria: ['ACO em pacientes de risco'],
        secundaria: ['Tratamento precoce', 'Seguimento regular'],
        citations: [{ refId: 'eshre-endometriosis-2022' }]
      }
    },
    protocolos: ['endometriose-aps'],
    medicamentos: ['dienogeste', 'ibuprofeno'],
    calculadoras: [],
    citations: [{ refId: 'eshre-endometriosis-2022' }],
    lastUpdate: '2026-01',
    tags: ['endometriose', 'dor pelvica', 'infertilidade']
  },

  // ============================================================================
  // SINDROME DOS OVARIOS POLICISTICOS
  // ============================================================================
  {
    id: 'sop',
    titulo: 'Sindrome dos Ovarios Policisticos',
    sinonimos: ['SOP', 'PCOS', 'Sindrome de Stein-Leventhal'],
    doid: 'DOID:11612',
    snomedCT: '69878008',
    meshId: 'D011085',
    ciap2: ['T99', 'X99'],
    cid10: ['E28.2'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Sindrome endocrino-metabolica caracterizada por hiperandrogenismo, disfuncao ovulatoria e ovarios policisticos. Afeta 6-12% das mulheres.',
      criteriosDiagnosticos: [
        'Criterios de Rotterdam (2 de 3):',
        'Oligo/anovulacao',
        'Hiperandrogenismo clinico ou laboratorial',
        'Ovarios policisticos a USG (>=12 foliculos ou vol >10mL)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Perda de peso 5-10%', 'Dieta baixo indice glicemico', 'Exercicio aerobico 150min/sem'],
        farmacologico: ['ACO com antiandrogeno (ciproterona)', 'Metformina 1500-2000mg/dia', 'Espironolactona 100mg/dia para hirsutismo']
      },
      redFlags: ['Virilizacao rapida', 'Hirsutismo severo de inicio subito', 'Amenorreia >6 meses']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '6-12% mulheres em idade reprodutiva',
        fatoresRisco: ['Obesidade', 'Resistencia insulinica', 'Historia familiar', 'Sedentarismo'],
        citations: [{ refId: 'eshre-pcos-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Irregularidade menstrual', 'Hirsutismo', 'Acne', 'Alopecia androgenetica', 'Infertilidade'],
        sinaisExameFisico: ['Hirsutismo (escala Ferriman-Gallwey)', 'Acantose nigricans', 'Obesidade central'],
        citations: [{ refId: 'eshre-pcos-2023' }]
      },
      diagnostico: {
        criterios: ['Criterios de Rotterdam', 'Exclusao de outras causas de hiperandrogenismo'],
        diagnosticoDiferencial: ['Hiperplasia adrenal congenita', 'Tumor produtor de androgenos', 'Hiperprolactinemia', 'Cushing'],
        examesLaboratoriais: ['Testosterona total', 'SHBG', 'LH/FSH', '17-OHP', 'TSH', 'Prolactina'],
        citations: [{ refId: 'acog-pcos-2023' }]
      },
      tratamento: {
        objetivos: ['Regularizacao menstrual', 'Controle hiperandrogenismo', 'Prevencao complicacoes metabolicas'],
        naoFarmacologico: {
          medidas: ['Perda peso 5-10%', 'Dieta mediterranea', 'Exercicio 150min/sem'],
          citations: [{ refId: 'eshre-pcos-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'ACO antiandrogeno', medicamentos: ['Etinilestradiol + ciproterona'], posologia: '21/7 dias' },
            { classe: 'Sensibilizador insulina', medicamentos: ['Metformina'], posologia: '1500-2000mg/dia' },
            { classe: 'Antiandrogeno', medicamentos: ['Espironolactona'], posologia: '100mg/dia' }
          ],
          citations: [{ refId: 'acog-pcos-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral inicio; semestral apos estabilizacao',
        metasTerapeuticas: ['Ciclos regulares', 'Ferriman-Gallwey <8', 'IMC <25'],
        criteriosEncaminhamento: ['Infertilidade', 'Virilizacao', 'Suspeita tumor'],
        citations: [{ refId: 'febrasgo-sop-2023' }]
      },
      prevencao: {
        primaria: ['Manutencao peso saudavel'],
        secundaria: ['Rastreio DM2', 'Rastreio dislipidemia', 'Protecao endometrial'],
        citations: [{ refId: 'eshre-pcos-2023' }]
      }
    },
    protocolos: ['sop-manejo-aps'],
    medicamentos: ['metformina', 'espironolactona'],
    calculadoras: ['ferriman-gallwey'],
    citations: [{ refId: 'eshre-pcos-2023' }],
    lastUpdate: '2026-01',
    tags: ['sop', 'pcos', 'hiperandrogenismo', 'ovarios policisticos']
  },

  // ============================================================================
  // MIOMA UTERINO
  // ============================================================================
  {
    id: 'mioma-uterino',
    titulo: 'Mioma Uterino',
    sinonimos: ['Leiomioma uterino', 'Fibroma uterino', 'Uterine fibroid'],
    doid: 'DOID:13223',
    snomedCT: '95315005',
    meshId: 'D007889',
    ciap2: ['X78'],
    cid10: ['D25', 'D25.0', 'D25.1', 'D25.2'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Tumor benigno do miometrio, mais comum em mulheres em idade reprodutiva. Prevalencia 20-40%, maior em afrodescendentes.',
      criteriosDiagnosticos: [
        'Sangramento uterino anormal',
        'Aumento do volume uterino',
        'Sintomas compressivos (polaciuria, constipacao)',
        'Nodulos palpaveis ao exame bimanual',
        'Confirmacao por USG pelvica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Observacao se assintomatico', 'Embolizacao arterias uterinas'],
        farmacologico: ['ACO para controle sangramento', 'Progestagenos', 'Acido tranexamico', 'Agonistas GnRH pre-operatorio']
      },
      redFlags: ['Crescimento rapido pos-menopausa', 'Anemia grave', 'Sintomas compressivos severos']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-40% mulheres >35 anos',
        fatoresRisco: ['Afrodescendencia', 'Nuliparidade', 'Obesidade', 'Historia familiar', 'Menarca precoce'],
        citations: [{ refId: 'acog-fibroids-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Sangramento menstrual aumentado', 'Dismenorreia', 'Pressao pelvica', 'Polaciuria'],
        sinaisExameFisico: ['Utero aumentado irregularmente', 'Nodulos palpaveis'],
        citations: [{ refId: 'acog-fibroids-2023' }]
      },
      diagnostico: {
        criterios: ['USG pelvica/TV confirma diagnostico', 'RM para mapeamento pre-cirurgico'],
        diagnosticoDiferencial: ['Adenomiose', 'Sarcoma uterino', 'Gravidez'],
        examesImagem: ['USG pelvica', 'USG transvaginal', 'RM pelve'],
        citations: [{ refId: 'figo-fibroids-2023' }]
      },
      tratamento: {
        objetivos: ['Controle sangramento', 'Alivio sintomas', 'Preservacao fertilidade se desejada'],
        naoFarmacologico: {
          medidas: ['Expectante se assintomatico', 'Embolizacao arterial uterina', 'Ablacao por radiofrequencia'],
          citations: [{ refId: 'acog-fibroids-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antifibrinolitico', medicamentos: ['Acido tranexamico'], posologia: '1g 3x/dia durante menstruacao' },
            { classe: 'Progestageno', medicamentos: ['Noretisterona', 'DIU-LNG'], posologia: 'Continuo ou ciclico' },
            { classe: 'Agonista GnRH', medicamentos: ['Leuprorrelina'], posologia: '3,75mg IM mensal pre-op' }
          ],
          citations: [{ refId: 'nice-fibroids-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semestral se expectante; conforme sintomas',
        metasTerapeuticas: ['Controle sangramento', 'Hemoglobina >12g/dL'],
        criteriosEncaminhamento: ['Mioma sintomatico', 'Crescimento rapido', 'Infertilidade', 'Anemia refrataria'],
        citations: [{ refId: 'febrasgo-mioma-2023' }]
      },
      prevencao: {
        primaria: ['Nao ha prevencao estabelecida'],
        secundaria: ['Seguimento USG anual em assintomaticas'],
        citations: [{ refId: 'acog-fibroids-2023' }]
      }
    },
    protocolos: ['mioma-manejo-aps'],
    medicamentos: ['acido-tranexamico', 'leuprorrelina'],
    calculadoras: [],
    citations: [{ refId: 'acog-fibroids-2023' }],
    lastUpdate: '2026-01',
    tags: ['mioma', 'leiomioma', 'sangramento uterino']
  },

  // ============================================================================
  // ADENOMIOSE
  // ============================================================================
  {
    id: 'adenomiose',
    titulo: 'Adenomiose',
    sinonimos: ['Adenomyosis', 'Endometriose interna'],
    doid: 'DOID:344',
    snomedCT: '76376003',
    meshId: 'D062788',
    ciap2: ['X99'],
    cid10: ['N80.0'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Presenca de glandulas e estroma endometrial no miometrio causando utero aumentado, dismenorreia e sangramento aumentado.',
      criteriosDiagnosticos: [
        'Dismenorreia progressiva',
        'Sangramento menstrual abundante',
        'Utero globoso e amolecido',
        'USG: miometrio heterogeneo, cistos miometriais',
        'RM: zona juncional >12mm'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Histerectomia se prole completa'],
        farmacologico: ['DIU-LNG (Mirena)', 'ACO continuo', 'Dienogeste 2mg/dia', 'Agonistas GnRH']
      },
      redFlags: ['Anemia grave', 'Falha tratamento clinico', 'Suspeita malignidade']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '20-35% em histerectomias',
        fatoresRisco: ['Multiparidade', 'Cirurgias uterinas previas', 'Idade 40-50 anos'],
        citations: [{ refId: 'acog-adenomyosis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dismenorreia secundaria progressiva', 'Menorragia', 'Dor pelvica cronica'],
        sinaisExameFisico: ['Utero aumentado difusamente', 'Utero amolecido', 'Dor a mobilizacao'],
        citations: [{ refId: 'eshre-adenomyosis-2022' }]
      },
      diagnostico: {
        criterios: ['USG TV com criterios MUSA', 'RM: zona juncional >12mm'],
        diagnosticoDiferencial: ['Mioma', 'Endometriose', 'Carcinoma endometrial'],
        examesImagem: ['USG transvaginal', 'RM pelve'],
        citations: [{ refId: 'eshre-adenomyosis-2022' }]
      },
      tratamento: {
        objetivos: ['Controle dor', 'Reducao sangramento', 'Preservacao fertilidade se desejado'],
        naoFarmacologico: {
          medidas: ['Histerectomia definitiva', 'Ablacao endometrial em casos selecionados'],
          citations: [{ refId: 'acog-adenomyosis-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'DIU hormonal', medicamentos: ['DIU-LNG'], posologia: 'Insercao valida 5 anos' },
            { classe: 'Progestageno', medicamentos: ['Dienogeste'], posologia: '2mg/dia continuo' },
            { classe: 'ACO combinado', medicamentos: ['Etinilestradiol + gestodeno'], posologia: 'Uso continuo' }
          ],
          citations: [{ refId: 'eshre-adenomyosis-2022' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Trimestral ate controle; semestral apos',
        metasTerapeuticas: ['Reducao dismenorreia', 'Controle sangramento'],
        criteriosEncaminhamento: ['Refratariedade ao tratamento', 'Desejo de gestacao', 'Anemia persistente'],
        citations: [{ refId: 'febrasgo-adenomiose-2023' }]
      },
      prevencao: {
        primaria: ['Evitar procedimentos uterinos desnecessarios'],
        secundaria: ['Tratamento hormonal precoce'],
        citations: [{ refId: 'acog-adenomyosis-2023' }]
      }
    },
    protocolos: ['adenomiose-manejo'],
    medicamentos: ['diu-lng', 'dienogeste'],
    calculadoras: [],
    citations: [{ refId: 'eshre-adenomyosis-2022' }],
    lastUpdate: '2026-01',
    tags: ['adenomiose', 'dismenorreia', 'menorragia']
  },

  // ============================================================================
  // DOENCA INFLAMATORIA PELVICA
  // ============================================================================
  {
    id: 'dip',
    titulo: 'Doenca Inflamatoria Pelvica',
    sinonimos: ['DIP', 'PID', 'Pelvic inflammatory disease', 'Salpingite'],
    doid: 'DOID:1003',
    snomedCT: '198130006',
    meshId: 'D000292',
    ciap2: ['X74'],
    cid10: ['N70', 'N71', 'N73', 'N74'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Infeccao ascendente do trato genital superior (utero, tubas, ovarios) geralmente por ISTs. Causa importante de infertilidade.',
      criteriosDiagnosticos: [
        'Dor pelvica + dor a mobilizacao cervical',
        'Dor anexial bilateral',
        'Febre >38.3C',
        'Corrimento cervical mucopurulento',
        'Leucocitose'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Abstinencia sexual ate fim tratamento', 'Tratamento do parceiro'],
        farmacologico: ['Ceftriaxona 500mg IM dose unica', 'Doxiciclina 100mg 12/12h 14 dias', 'Metronidazol 500mg 12/12h 14 dias']
      },
      redFlags: ['Abscesso tubo-ovariano', 'Peritonite', 'Falha tratamento ambulatorial em 72h']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '4-12% mulheres sexualmente ativas',
        fatoresRisco: ['Multiplos parceiros', 'IST previa', 'DIU recente', 'Idade <25 anos'],
        citations: [{ refId: 'cdc-pid-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Dor pelvica', 'Corrimento vaginal anormal', 'Dispareunia', 'Febre'],
        sinaisExameFisico: ['Dor a mobilizacao cervical', 'Sensibilidade anexial', 'Corrimento mucopurulento'],
        citations: [{ refId: 'cdc-pid-2023' }]
      },
      diagnostico: {
        criterios: ['Criterios clinicos CDC', 'PCR Chlamydia/Gonococo', 'USG se suspeita abscesso'],
        diagnosticoDiferencial: ['Apendicite', 'Gravidez ectopica', 'Cisto ovariano roto', 'Endometriose'],
        examesLaboratoriais: ['Hemograma', 'PCR', 'Beta-hCG', 'PCR Chlamydia/Gonococo'],
        citations: [{ refId: 'acog-pid-2023' }]
      },
      tratamento: {
        objetivos: ['Erradicacao infeccao', 'Prevencao sequelas', 'Tratamento parceiro'],
        naoFarmacologico: {
          medidas: ['Repouso', 'Abstinencia sexual', 'Convocacao parceiro'],
          citations: [{ refId: 'cdc-pid-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Cefalosporina', medicamentos: ['Ceftriaxona'], posologia: '500mg IM dose unica' },
            { classe: 'Tetraciclina', medicamentos: ['Doxiciclina'], posologia: '100mg VO 12/12h 14 dias' },
            { classe: 'Nitroimidazolico', medicamentos: ['Metronidazol'], posologia: '500mg VO 12/12h 14 dias' }
          ],
          citations: [{ refId: 'ms-ist-2022' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Reavaliacao em 48-72h; retorno em 14 dias',
        metasTerapeuticas: ['Resolucao dor', 'Cura microbiologica'],
        criteriosEncaminhamento: ['Abscesso', 'Falha ambulatorial', 'Gestante', 'HIV+'],
        citations: [{ refId: 'cdc-pid-2023' }]
      },
      prevencao: {
        primaria: ['Uso preservativo', 'Rastreio ISTs'],
        secundaria: ['Tratamento precoce', 'Tratamento parceiros'],
        citations: [{ refId: 'ms-ist-2022' }]
      }
    },
    protocolos: ['dip-tratamento'],
    medicamentos: ['ceftriaxona', 'doxiciclina', 'metronidazol'],
    calculadoras: [],
    citations: [{ refId: 'cdc-pid-2023' }],
    lastUpdate: '2026-01',
    tags: ['dip', 'pid', 'salpingite', 'ist']
  },

  // ============================================================================
  // VAGINOSE BACTERIANA
  // ============================================================================
  {
    id: 'vaginose-bacteriana',
    titulo: 'Vaginose Bacteriana',
    sinonimos: ['VB', 'Bacterial vaginosis', 'Gardnerella'],
    doid: 'DOID:0080559',
    snomedCT: '419760006',
    meshId: 'D016585',
    ciap2: ['X84'],
    cid10: ['N76.0'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Desequilibrio da microbiota vaginal com reducao de lactobacilos e proliferacao de anaerobios. Causa mais comum de corrimento vaginal.',
      criteriosDiagnosticos: [
        'Criterios de Amsel (3 de 4):',
        'Corrimento homogeneo branco-acinzentado',
        'pH vaginal >4.5',
        'Teste aminas positivo (odor de peixe)',
        'Clue cells na microscopia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar duchas vaginais', 'Uso de preservativo'],
        farmacologico: ['Metronidazol 500mg VO 12/12h 7 dias', 'Metronidazol gel vaginal 0,75% 5g/noite 5 dias', 'Clindamicina creme 2% 5g/noite 7 dias']
      },
      redFlags: ['Gestante (risco parto prematuro)', 'Recorrencia frequente', 'Coinfeccao com IST']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-30% mulheres em idade reprodutiva',
        fatoresRisco: ['Multiplos parceiros', 'Duchas vaginais', 'Tabagismo', 'DIU'],
        citations: [{ refId: 'cdc-vaginitis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Corrimento com odor de peixe', 'Prurido leve', 'Pode ser assintomatica'],
        sinaisExameFisico: ['Corrimento homogeneo aderente', 'Sem inflamacao vulvar'],
        citations: [{ refId: 'cdc-vaginitis-2023' }]
      },
      diagnostico: {
        criterios: ['Criterios de Amsel', 'Escore de Nugent na bacterioscopia'],
        diagnosticoDiferencial: ['Candidiase', 'Tricomoniase', 'Cervicite'],
        examesLaboratoriais: ['pH vaginal', 'Teste aminas', 'Bacterioscopia'],
        citations: [{ refId: 'acog-vaginitis-2023' }]
      },
      tratamento: {
        objetivos: ['Alivio sintomas', 'Restauracao flora vaginal'],
        naoFarmacologico: {
          medidas: ['Evitar duchas', 'Probioticos vaginais (adjuvante)'],
          citations: [{ refId: 'cdc-vaginitis-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Nitroimidazolico', medicamentos: ['Metronidazol'], posologia: '500mg VO 12/12h 7 dias' },
            { classe: 'Topico vaginal', medicamentos: ['Metronidazol gel 0,75%'], posologia: '5g intravaginal/noite 5 noites' },
            { classe: 'Lincosamida', medicamentos: ['Clindamicina creme 2%'], posologia: '5g intravaginal/noite 7 noites' }
          ],
          citations: [{ refId: 'ms-ist-2022' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno se persistencia; seguimento se gestante',
        metasTerapeuticas: ['Resolucao sintomas', 'pH vaginal normal'],
        criteriosEncaminhamento: ['Recorrencias frequentes (>3/ano)', 'Gestante com complicacoes'],
        citations: [{ refId: 'acog-vaginitis-2023' }]
      },
      prevencao: {
        primaria: ['Evitar duchas vaginais', 'Preservativo'],
        secundaria: ['Tratamento episodios', 'Probioticos em recorrentes'],
        citations: [{ refId: 'cdc-vaginitis-2023' }]
      }
    },
    protocolos: ['vaginose-tratamento'],
    medicamentos: ['metronidazol', 'clindamicina'],
    calculadoras: [],
    citations: [{ refId: 'cdc-vaginitis-2023' }],
    lastUpdate: '2026-01',
    tags: ['vaginose', 'gardnerella', 'corrimento']
  },

  // ============================================================================
  // CANDIDIASE VULVOVAGINAL
  // ============================================================================
  {
    id: 'candidiase-vulvovaginal',
    titulo: 'Candidiase Vulvovaginal',
    sinonimos: ['CVV', 'Moniliase', 'Vulvovaginal candidiasis'],
    doid: 'DOID:1304',
    snomedCT: '78048006',
    meshId: 'D002181',
    ciap2: ['X72'],
    cid10: ['B37.3'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Infeccao fungica vulvovaginal por Candida spp (90% C. albicans). 75% das mulheres terao pelo menos 1 episodio.',
      criteriosDiagnosticos: [
        'Prurido vulvar intenso',
        'Corrimento branco grumoso (leite coalhado)',
        'Disuria externa',
        'Eritema e edema vulvar',
        'pH vaginal normal (<4.5)',
        'Pseudo-hifas/leveduras na microscopia'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar roupas apertadas', 'Evitar sabonetes perfumados'],
        farmacologico: ['Fluconazol 150mg VO dose unica', 'Miconazol creme 2% 7 noites', 'Nistatina ovulo 100.000UI 14 noites']
      },
      redFlags: ['Candidiase recorrente (>=4/ano)', 'Imunossupressao', 'Diabetes descompensado']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '75% mulheres terao 1 episodio; 5-8% recorrente',
        fatoresRisco: ['Uso antibioticos', 'Diabetes', 'Gravidez', 'Imunossupressao', 'ACO'],
        citations: [{ refId: 'cdc-vaginitis-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Prurido intenso', 'Corrimento grumoso', 'Ardor', 'Disuria externa'],
        sinaisExameFisico: ['Eritema vulvar', 'Edema', 'Corrimento aderente esbranquicado', 'Fissuras'],
        citations: [{ refId: 'acog-vaginitis-2023' }]
      },
      diagnostico: {
        criterios: ['Clinico + pH <4.5 + microscopia (KOH)'],
        diagnosticoDiferencial: ['Vaginose bacteriana', 'Tricomoniase', 'Dermatite de contato'],
        examesLaboratoriais: ['pH vaginal', 'Exame direto KOH', 'Cultura fungica se recorrente'],
        citations: [{ refId: 'cdc-vaginitis-2023' }]
      },
      tratamento: {
        objetivos: ['Alivio sintomas', 'Erradicacao fungica'],
        naoFarmacologico: {
          medidas: ['Roupas folgadas', 'Higiene adequada', 'Evitar irritantes'],
          citations: [{ refId: 'acog-vaginitis-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Azolico oral', medicamentos: ['Fluconazol'], posologia: '150mg VO dose unica' },
            { classe: 'Azolico topico', medicamentos: ['Miconazol', 'Clotrimazol'], posologia: 'Creme/ovulo 7-14 dias' },
            { classe: 'Polieno', medicamentos: ['Nistatina'], posologia: 'Ovulo 100.000UI 14 noites' }
          ],
          situacoesEspeciais: [
            { situacao: 'Recorrente', conduta: 'Fluconazol 150mg dias 1,4,7 depois semanal 6 meses' },
            { situacao: 'Gestante', conduta: 'Apenas topicos (miconazol, clotrimazol)' }
          ],
          citations: [{ refId: 'ms-ist-2022' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno se persistencia ou recorrencia',
        metasTerapeuticas: ['Resolucao sintomas'],
        criteriosEncaminhamento: ['Recorrencia frequente', 'Candida nao-albicans'],
        citations: [{ refId: 'cdc-vaginitis-2023' }]
      },
      prevencao: {
        primaria: ['Controle glicemico', 'Evitar antibioticos desnecessarios'],
        secundaria: ['Manutencao fluconazol semanal em recorrentes'],
        citations: [{ refId: 'acog-vaginitis-2023' }]
      }
    },
    protocolos: ['candidiase-tratamento'],
    medicamentos: ['fluconazol', 'miconazol', 'nistatina'],
    calculadoras: [],
    citations: [{ refId: 'cdc-vaginitis-2023' }],
    lastUpdate: '2026-01',
    tags: ['candidiase', 'moniliase', 'prurido vulvar']
  },

  // ============================================================================
  // CERVICITE
  // ============================================================================
  {
    id: 'cervicite',
    titulo: 'Cervicite',
    sinonimos: ['Cervicitis', 'Inflamacao cervical'],
    doid: 'DOID:2172',
    snomedCT: '37610005',
    meshId: 'D002575',
    ciap2: ['X84'],
    cid10: ['N72'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Inflamacao do colo uterino, geralmente por Chlamydia ou Gonococo. Pode ser assintomatica.',
      criteriosDiagnosticos: [
        'Corrimento cervical mucopurulento',
        'Friabilidade cervical (sangra ao toque)',
        'Ectopia inflamada',
        'Leucorreia aumentada',
        'PCR positivo Chlamydia/Gonococo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Tratamento parceiro', 'Abstinencia ate cura'],
        farmacologico: ['Azitromicina 1g VO dose unica (Chlamydia)', 'Ceftriaxona 500mg IM dose unica (Gonococo)', 'Doxiciclina 100mg 12/12h 7 dias alternativa']
      },
      redFlags: ['DIP associada', 'Gestante', 'HIV positivo']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Variavel; relacionada a ISTs',
        fatoresRisco: ['Multiplos parceiros', 'Idade jovem', 'Nao uso preservativo', 'IST previa'],
        citations: [{ refId: 'cdc-std-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Corrimento vaginal', 'Sangramento pos-coito', 'Frequentemente assintomatica'],
        sinaisExameFisico: ['Exsudato mucopurulento cervical', 'Friabilidade', 'Ectopia cervical'],
        citations: [{ refId: 'cdc-std-2023' }]
      },
      diagnostico: {
        criterios: ['Exame especular + PCR Chlamydia/Gonococo'],
        diagnosticoDiferencial: ['Vaginite', 'Cancer cervical', 'Polipos'],
        examesLaboratoriais: ['PCR Chlamydia trachomatis', 'PCR Neisseria gonorrhoeae', 'Citologia oncologica'],
        citations: [{ refId: 'acog-cervicitis-2023' }]
      },
      tratamento: {
        objetivos: ['Erradicacao infeccao', 'Prevencao DIP', 'Tratamento parceiros'],
        naoFarmacologico: {
          medidas: ['Abstinencia sexual ate cura', 'Tratamento parceiro obrigatorio'],
          citations: [{ refId: 'cdc-std-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Macrolideo', medicamentos: ['Azitromicina'], posologia: '1g VO dose unica' },
            { classe: 'Cefalosporina', medicamentos: ['Ceftriaxona'], posologia: '500mg IM dose unica' },
            { classe: 'Tetraciclina', medicamentos: ['Doxiciclina'], posologia: '100mg VO 12/12h 7 dias' }
          ],
          citations: [{ refId: 'ms-ist-2022' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Retorno em 3 meses para teste de cura',
        metasTerapeuticas: ['Negativacao PCR', 'Resolucao inflamacao'],
        criteriosEncaminhamento: ['Falha tratamento', 'DIP', 'Gestante'],
        citations: [{ refId: 'cdc-std-2023' }]
      },
      prevencao: {
        primaria: ['Uso preservativo', 'Rastreio ISTs'],
        secundaria: ['Tratamento precoce', 'Busca ativa parceiros'],
        citations: [{ refId: 'ms-ist-2022' }]
      }
    },
    protocolos: ['cervicite-ist'],
    medicamentos: ['azitromicina', 'ceftriaxona', 'doxiciclina'],
    calculadoras: [],
    citations: [{ refId: 'cdc-std-2023' }],
    lastUpdate: '2026-01',
    tags: ['cervicite', 'chlamydia', 'gonococo', 'ist']
  },

  // ============================================================================
  // PROLAPSO GENITAL
  // ============================================================================
  {
    id: 'prolapso-genital',
    titulo: 'Prolapso Genital',
    sinonimos: ['Prolapso de orgaos pelvicos', 'POP', 'Pelvic organ prolapse'],
    doid: 'DOID:9617',
    snomedCT: '87687001',
    meshId: 'D014596',
    ciap2: ['X87'],
    cid10: ['N81', 'N81.0', 'N81.1', 'N81.2'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Descida de orgaos pelvicos (utero, bexiga, reto) pelo canal vaginal devido a fraqueza do assoalho pelvico.',
      criteriosDiagnosticos: [
        'Sensacao de bola na vagina',
        'Peso pelvico',
        'Protrusao visivel ou palpavel',
        'Classificacao POP-Q (0-IV)',
        'Sintomas urinarios/intestinais associados'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia pelvica (Kegel)', 'Pessario vaginal', 'Perda de peso'],
        farmacologico: ['Estrogenio topico vaginal em pos-menopausa']
      },
      redFlags: ['Retencao urinaria aguda', 'Ulcera de decubito', 'Hidronefrose']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '40-60% multiparas; aumenta com idade',
        fatoresRisco: ['Partos vaginais', 'Obesidade', 'Tosse cronica', 'Constipacao', 'Historia familiar'],
        citations: [{ refId: 'acog-pop-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Sensacao de peso pelvico', 'Abaulamento vaginal', 'Dificuldade esvaziamento vesical/retal'],
        sinaisExameFisico: ['Protrusao parede vaginal anterior/posterior', 'Descida colo uterino', 'Exame com Valsalva'],
        citations: [{ refId: 'iuga-pop-2023' }]
      },
      diagnostico: {
        criterios: ['Exame fisico com classificacao POP-Q', 'USG assoalho pelvico opcional'],
        diagnosticoDiferencial: ['Cisto vaginal', 'Tumor vaginal', 'Alongamento cervical'],
        citations: [{ refId: 'acog-pop-2023' }]
      },
      tratamento: {
        objetivos: ['Alivio sintomas', 'Melhora qualidade vida', 'Preservacao funcao urinaria/sexual'],
        naoFarmacologico: {
          medidas: ['Exercicios Kegel', 'Pessario vaginal', 'Biofeedback', 'Cirurgia se indicada'],
          citations: [{ refId: 'nice-pop-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Estrogenio topico', medicamentos: ['Estriol creme', 'Promestrieno'], posologia: 'Aplicacao vaginal 2-3x/semana' }
          ],
          citations: [{ refId: 'acog-pop-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semestral; reavaliacao pessario trimestral',
        metasTerapeuticas: ['Melhora sintomas', 'Uso adequado pessario'],
        criteriosEncaminhamento: ['Prolapso grau III-IV', 'Desejo cirurgico', 'Falha pessario'],
        citations: [{ refId: 'iuga-pop-2023' }]
      },
      prevencao: {
        primaria: ['Exercicios assoalho pelvico', 'Controle peso', 'Evitar constipacao'],
        secundaria: ['Fisioterapia pos-parto', 'Kegel regular'],
        citations: [{ refId: 'nice-pop-2023' }]
      }
    },
    protocolos: ['prolapso-manejo'],
    medicamentos: ['estriol'],
    calculadoras: ['pop-q'],
    citations: [{ refId: 'acog-pop-2023' }],
    lastUpdate: '2026-01',
    tags: ['prolapso', 'assoalho pelvico', 'pessario']
  },

  // ============================================================================
  // INCONTINENCIA URINARIA FEMININA
  // ============================================================================
  {
    id: 'incontinencia-urinaria-feminina',
    titulo: 'Incontinencia Urinaria Feminina',
    sinonimos: ['IU', 'Urinary incontinence', 'Bexiga hiperativa'],
    doid: 'DOID:13428',
    snomedCT: '165232002',
    meshId: 'D014549',
    ciap2: ['U04'],
    cid10: ['N39.3', 'N39.4', 'R32'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Perda involuntaria de urina. Tipos: esforco (IUE), urgencia (IUU), mista (IUM). Alta prevalencia em mulheres.',
      criteriosDiagnosticos: [
        'IUE: perda aos esforcos (tosse, espirro)',
        'IUU: perda precedida de urgencia',
        'IUM: componentes de ambas',
        'Questionarios validados (ICIQ-SF)',
        'Diario miccional'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Fisioterapia pelvica', 'Treinamento vesical', 'Perda peso', 'Reduzir cafeina'],
        farmacologico: ['IUU: Oxibutinina 5mg 2-3x/dia', 'IUU: Tolterodina 2mg 2x/dia', 'Mirabegrona 50mg/dia']
      },
      redFlags: ['Hematuria', 'ITU recorrente', 'Retencao urinaria', 'Sintomas neurologicos']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '25-45% mulheres; aumenta com idade',
        fatoresRisco: ['Partos vaginais', 'Obesidade', 'Menopausa', 'Tosse cronica', 'Diabetes'],
        citations: [{ refId: 'ics-incontinence-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Perda urinaria involuntaria', 'Urgencia', 'Frequencia aumentada', 'Nocturia'],
        sinaisExameFisico: ['Teste de esforco', 'Avaliacao assoalho pelvico', 'Prolapso associado'],
        citations: [{ refId: 'acog-incontinence-2023' }]
      },
      diagnostico: {
        criterios: ['Historia clinica detalhada', 'Diario miccional 3 dias', 'ICIQ-SF', 'Urodinamica se indicada'],
        diagnosticoDiferencial: ['ITU', 'Fistula', 'Bexiga neurologica', 'Poliuria'],
        examesLaboratoriais: ['Urina tipo I', 'Urocultura', 'Glicemia'],
        citations: [{ refId: 'nice-incontinence-2023' }]
      },
      tratamento: {
        objetivos: ['Reducao episodios perda', 'Melhora qualidade vida'],
        naoFarmacologico: {
          medidas: ['Exercicios Kegel', 'Biofeedback', 'Treinamento vesical', 'Sling se IUE refrataria'],
          citations: [{ refId: 'acog-incontinence-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antimuscarinico', medicamentos: ['Oxibutinina', 'Tolterodina', 'Darifenacina'], posologia: 'Oxibutinina 5mg 2-3x/dia' },
            { classe: 'Beta-3 agonista', medicamentos: ['Mirabegrona'], posologia: '50mg/dia' },
            { classe: 'Estrogenio topico', medicamentos: ['Estriol'], posologia: 'Vaginal 2x/semana' }
          ],
          citations: [{ refId: 'nice-incontinence-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal inicio; trimestral apos ajuste',
        metasTerapeuticas: ['Reducao 50% episodios', 'ICIQ-SF melhorado'],
        criteriosEncaminhamento: ['Falha tratamento conservador', 'Indicacao cirurgica', 'Urodinamica complexa'],
        citations: [{ refId: 'ics-incontinence-2023' }]
      },
      prevencao: {
        primaria: ['Exercicios pelvicos', 'Controle peso', 'Evitar constipacao'],
        secundaria: ['Fisioterapia precoce', 'Tratamento prolapso'],
        citations: [{ refId: 'acog-incontinence-2023' }]
      }
    },
    protocolos: ['incontinencia-manejo'],
    medicamentos: ['oxibutinina', 'tolterodina', 'mirabegrona'],
    calculadoras: ['iciq-sf'],
    citations: [{ refId: 'acog-incontinence-2023' }],
    lastUpdate: '2026-01',
    tags: ['incontinencia', 'bexiga hiperativa', 'iue', 'iuu']
  },

  // ============================================================================
  // MENOPAUSA/CLIMATERIO
  // ============================================================================
  {
    id: 'menopausa-climaterio',
    titulo: 'Menopausa e Climaterio',
    sinonimos: ['Menopause', 'Perimenopausa', 'Sindrome climatérica'],
    doid: 'DOID:1414',
    snomedCT: '161712005',
    meshId: 'D008593',
    ciap2: ['X11'],
    cid10: ['N95.1', 'N95.2', 'N95.3'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Cessacao permanente da menstruacao (12 meses amenorreia). Climaterio: periodo de transicao com sintomas vasomotores e urogenitais.',
      criteriosDiagnosticos: [
        'Amenorreia 12 meses (menopausa)',
        'Fogachos',
        'Sudorese noturna',
        'Atrofia urogenital',
        'Alteracoes humor/sono',
        'FSH >40 UI/L se duvida diagnostica'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercicio fisico', 'Controle peso', 'Evitar gatilhos (alcool, cafe)', 'Técnicas relaxamento'],
        farmacologico: ['TH: Estradiol + progesterona', 'Tibolona 2.5mg/dia', 'Estrogenio vaginal para sintomas locais']
      },
      redFlags: ['Sangramento pos-menopausa', 'Sintomas <40 anos (IOP)', 'Contraindicacoes TH']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: 'Universal; idade media 51 anos',
        fatoresRisco: ['Tabagismo antecipa menopausa', 'Cirurgia ovariana', 'Quimio/radioterapia'],
        citations: [{ refId: 'nams-menopause-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fogachos', 'Sudorese noturna', 'Secura vaginal', 'Alteracoes humor', 'Insonia'],
        sinaisExameFisico: ['Atrofia mucosa vaginal', 'pH vaginal >5', 'Sinais de hipoestrogenismo'],
        citations: [{ refId: 'ims-menopause-2023' }]
      },
      diagnostico: {
        criterios: ['Clinico (amenorreia 12 meses + idade)', 'FSH se <45 anos ou duvida'],
        diagnosticoDiferencial: ['Gravidez', 'Hiperprolactinemia', 'Doenca tireoide', 'IOP'],
        examesLaboratoriais: ['FSH', 'Estradiol', 'TSH', 'Prolactina se indicado'],
        citations: [{ refId: 'nams-menopause-2023' }]
      },
      tratamento: {
        objetivos: ['Alivio sintomas', 'Prevencao osteoporose', 'Melhora qualidade vida'],
        naoFarmacologico: {
          medidas: ['Exercicio regular', 'Evitar gatilhos', 'Hidratantes vaginais', 'Terapia cognitivo-comportamental'],
          citations: [{ refId: 'nice-menopause-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Terapia hormonal', medicamentos: ['Estradiol + progesterona', 'Tibolona'], posologia: 'Dose minima eficaz', observacoes: 'Avaliar risco/beneficio individual' },
            { classe: 'Estrogenio topico', medicamentos: ['Estriol', 'Promestrieno'], posologia: 'Vaginal 2-3x/semana', observacoes: 'Para sintomas urogenitais' },
            { classe: 'Alternativa nao hormonal', medicamentos: ['Paroxetina', 'Venlafaxina', 'Gabapentina'], posologia: 'Conforme medicamento', observacoes: 'Se contraindicacao TH' }
          ],
          citations: [{ refId: 'ims-menopause-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Semestral primeiro ano TH; anual depois',
        metasTerapeuticas: ['Controle sintomas', 'Dose minima eficaz'],
        criteriosEncaminhamento: ['IOP', 'Contraindicacao TH com sintomas intensos', 'Sangramento anormal'],
        citations: [{ refId: 'nams-menopause-2023' }]
      },
      prevencao: {
        primaria: ['Manutencao peso saudavel', 'Exercicio', 'Cessar tabagismo'],
        secundaria: ['Rastreio osteoporose', 'Prevencao cardiovascular', 'Saude urogenital'],
        citations: [{ refId: 'nice-menopause-2023' }]
      }
    },
    protocolos: ['climaterio-manejo'],
    medicamentos: ['estradiol', 'tibolona', 'estriol'],
    calculadoras: ['frax'],
    citations: [{ refId: 'nams-menopause-2023' }],
    lastUpdate: '2026-01',
    tags: ['menopausa', 'climaterio', 'terapia hormonal', 'fogacho']
  },

  // ============================================================================
  // SANGRAMENTO UTERINO ANORMAL
  // ============================================================================
  {
    id: 'sangramento-uterino-anormal',
    titulo: 'Sangramento Uterino Anormal',
    sinonimos: ['SUA', 'AUB', 'Abnormal uterine bleeding', 'Menorragia', 'Metrorragia'],
    doid: 'DOID:224',
    snomedCT: '64996003',
    meshId: 'D008796',
    ciap2: ['X05', 'X06'],
    cid10: ['N92', 'N93'],
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Sangramento uterino anormal em volume, duracao, frequencia ou regularidade. Classificacao PALM-COEIN para etiologia.',
      criteriosDiagnosticos: [
        'Ciclo <21 ou >35 dias',
        'Duracao >8 dias',
        'Volume >80mL/ciclo',
        'Sangramento intermenstrual',
        'Classificacao PALM-COEIN (Polipo, Adenomiose, Leiomioma, Malignidade, Coagulopatia, Ovulatoria, Endometrial, Iatrogenica, Nao classificada)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Investigar causa (PALM-COEIN)', 'Ablacao endometrial se indicada'],
        farmacologico: ['Acido tranexamico 1g 3x/dia', 'AINEs durante menstruacao', 'ACO combinado', 'DIU-LNG (Mirena)', 'Progestagenos ciclicos']
      },
      redFlags: ['Anemia sintomatica', 'Sangramento pos-menopausa', 'Suspeita malignidade', 'Instabilidade hemodinamica']
    },
    fullContent: {
      epidemiologia: {
        prevalencia: '10-30% mulheres em idade reprodutiva',
        fatoresRisco: ['Obesidade', 'SOP', 'Mioma', 'Coagulopatias', 'Uso anticoagulantes'],
        citations: [{ refId: 'figo-aub-2023' }]
      },
      quadroClinico: {
        sintomasPrincipais: ['Fluxo aumentado', 'Duracao prolongada', 'Sangramento intermenstrual', 'Anemia'],
        sinaisExameFisico: ['Palidez cutaneomucosa', 'Utero aumentado (mioma)', 'Exame especular'],
        citations: [{ refId: 'acog-aub-2023' }]
      },
      diagnostico: {
        criterios: ['Historia menstrual detalhada', 'USG pelvica/TV', 'Biopsia endometrial se >45 anos ou fatores risco'],
        diagnosticoDiferencial: ['Gravidez/aborto', 'Coagulopatia', 'Cancer endometrial', 'Polipos'],
        examesLaboratoriais: ['Hemograma', 'Beta-hCG', 'TSH', 'Coagulograma'],
        examesImagem: ['USG transvaginal', 'Histeroscopia se indicada'],
        citations: [{ refId: 'figo-aub-2023' }]
      },
      tratamento: {
        objetivos: ['Controle sangramento', 'Correcao anemia', 'Tratamento causa base'],
        naoFarmacologico: {
          medidas: ['Ablacao endometrial', 'Miomectomia', 'Histerectomia se definitivo'],
          citations: [{ refId: 'nice-hmb-2023' }]
        },
        farmacologico: {
          primeiraLinha: [
            { classe: 'Antifibrinolitico', medicamentos: ['Acido tranexamico'], posologia: '1g VO 3x/dia nos dias sangramento' },
            { classe: 'AINE', medicamentos: ['Acido mefenamico', 'Ibuprofeno'], posologia: 'Durante menstruacao' },
            { classe: 'DIU hormonal', medicamentos: ['DIU-LNG'], posologia: 'Insercao intrauterina', observacoes: 'Primeira linha se deseja contracepcao' },
            { classe: 'ACO combinado', medicamentos: ['Etinilestradiol + levonorgestrel'], posologia: 'Ciclico ou continuo' }
          ],
          situacoesEspeciais: [
            { situacao: 'Sangramento agudo', conduta: 'Estrogeno IV/VO alta dose ou curetagem' },
            { situacao: 'Anemia grave', conduta: 'Transfusao + ferro parenteral' }
          ],
          citations: [{ refId: 'acog-aub-2023' }]
        }
      },
      acompanhamento: {
        frequenciaConsultas: 'Mensal ate controle; trimestral depois',
        metasTerapeuticas: ['Reducao sangramento', 'Hemoglobina >12g/dL', 'Qualidade vida'],
        criteriosEncaminhamento: ['Falha tratamento', 'Suspeita malignidade', 'Anemia refrataria', 'Indicacao cirurgica'],
        citations: [{ refId: 'figo-aub-2023' }]
      },
      prevencao: {
        primaria: ['Controle peso', 'Tratamento SOP'],
        secundaria: ['Tratamento precoce', 'Protecao endometrial'],
        citations: [{ refId: 'nice-hmb-2023' }]
      }
    },
    protocolos: ['sua-manejo'],
    medicamentos: ['acido-tranexamico', 'diu-lng'],
    calculadoras: ['pbac'],
    citations: [{ refId: 'figo-aub-2023' }],
    lastUpdate: '2026-01',
    tags: ['sua', 'aub', 'menorragia', 'palm-coein']
  }
];
