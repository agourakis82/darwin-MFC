/**
 * EXPANSÃO SPRINT 3 - ESPECIALIDADES (Urologia, Ginecologia, Pediatria)
 * =====================================================================
 * Condições urológicas, ginecológicas e pediátricas comuns na APS
 */

import { Doenca } from '../../types/doenca';

export const doencasEspecialidadesExpansao: Partial<Doenca>[] = [
  // === UROLOGIA ===
  {
    id: 'prostatite',
    titulo: 'Prostatite',
    sinonimos: ['Prostatite aguda', 'Prostatite crônica', 'Síndrome de dor pélvica crônica'],
    ciap2: ['Y73'],
    cid10: ['N41.0', 'N41.1'],
    cid11: ['GA90.0'],
    doid: 'DOID:12259',
    snomedCT: '9713002',
    meshId: 'D011472',
    umlsCui: 'C0033581',
    categoria: 'urologico',
    quickView: {
      definicao: 'Inflamação da próstata. Tipo I: bacteriana aguda. Tipo II: bacteriana crônica. Tipo III: síndrome de dor pélvica crônica (mais comum).',
      criteriosDiagnosticos: [
        'Tipo I: febre, disúria, dor perineal, próstata edemaciada e dolorosa',
        'Tipo II: infecções urinárias recorrentes, sintomas >3 meses',
        'Tipo III: dor pélvica crônica sem infecção comprovada',
        'Urocultura, PSA pode estar elevado transitoriamente'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação adequada',
          'Banhos de assento mornos',
          'Evitar cafeína e álcool'
        ],
        farmacologico: [
          'Tipo I: Ciprofloxacino 500mg 12/12h por 4-6 semanas',
          'Tipo II: fluoroquinolona por 4-6 semanas',
          'Tipo III: alfa-bloqueador, fitoterapia (serenoa), analgésicos'
        ]
      },
      redFlags: ['Retenção urinária aguda', 'Sepse', 'Abscesso prostático'],
      metasTerapeuticas: ['Resolução de sintomas', 'Erradicação bacteriana'],
      examesIniciais: ['EAS + urocultura', 'PSA (após tratamento)', 'Toque retal']
    },
    protocolos: [],
    medicamentos: ['ciprofloxacino', 'doxazosina'],
    calculadoras: [],
    tags: ['próstata', 'infecção', 'dor pélvica']
  },
  {
    id: 'bexiga-hiperativa',
    titulo: 'Bexiga Hiperativa',
    sinonimos: ['Síndrome da bexiga hiperativa', 'OAB'],
    ciap2: ['U13'],
    cid10: ['N32.8'],
    cid11: ['GC01.Y'],
    doid: 'DOID:0080543',
    snomedCT: '60851000119108',
    meshId: 'D053201',
    umlsCui: 'C0878773',
    categoria: 'urologico',
    quickView: {
      definicao: 'Urgência urinária, com ou sem incontinência de urgência, geralmente com polaciúria e noctúria, na ausência de ITU ou outra patologia.',
      criteriosDiagnosticos: [
        'Urgência urinária (desejo súbito e imperioso)',
        'Frequência urinária >8x/dia',
        'Noctúria >1 episódio/noite',
        'Incontinência de urgência (úmida) vs sem incontinência (seca)',
        'Exclusão de ITU, tumor, cálculo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Treinamento vesical (aumentar intervalo entre micções)',
          'Exercícios de Kegel',
          'Reduzir cafeína e líquidos à noite',
          'Diário miccional'
        ],
        farmacologico: [
          'Antimuscarínicos: Oxibutinina 5mg 2-3x/dia, Tolterodina 2mg 2x/dia',
          'Beta-3 agonista: Mirabegrona 25-50mg/dia (alternativa)',
          'Cuidado com anticolinérgicos em idosos (risco cognitivo)'
        ]
      },
      redFlags: ['Hematúria', 'Dor pélvica', 'ITU de repetição', 'Retenção urinária'],
      metasTerapeuticas: ['Redução de 50% na frequência', 'Melhora da qualidade de vida'],
      examesIniciais: ['EAS + urocultura', 'Diário miccional', 'Resíduo pós-miccional']
    },
    protocolos: [],
    medicamentos: ['oxibutinina', 'tolterodina'],
    calculadoras: [],
    tags: ['incontinência', 'idoso', 'qualidade de vida']
  },
  {
    id: 'epididimite',
    titulo: 'Epididimite',
    sinonimos: ['Orquiepididimite'],
    ciap2: ['Y74'],
    cid10: ['N45.1'],
    cid11: ['GA70'],
    doid: 'DOID:10689',
    snomedCT: '31070006',
    meshId: 'D004823',
    umlsCui: 'C0014534',
    categoria: 'urologico',
    quickView: {
      definicao: 'Inflamação do epidídimo, geralmente infecciosa. <35 anos: ISTs (Chlamydia, Gonorreia). >35 anos: uropatógenos (E. coli).',
      criteriosDiagnosticos: [
        'Dor testicular unilateral de início gradual',
        'Aumento e endurecimento do epidídimo',
        'Sinal de Prehn positivo (alívio com elevação)',
        'Diferencial: torção testicular (emergência)'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Repouso, elevação escrotal',
          'Gelo local',
          'Abstinência sexual durante tratamento'
        ],
        farmacologico: [
          'Se IST suspeita (<35 anos): Ceftriaxona 500mg IM dose única + Doxiciclina 100mg 12/12h por 10 dias',
          'Se uropatógeno (>35 anos): Levofloxacino 500mg/dia por 10 dias',
          'Tratar parceira se IST'
        ]
      },
      redFlags: ['Dor intensa e aguda (torção?)', 'Febre alta', 'Abscesso escrotal', 'Torção testicular'],
      metasTerapeuticas: ['Resolução da dor e inflamação', 'Erradicação da infecção'],
      examesIniciais: ['EAS + urocultura', 'Teste para Chlamydia/Gonorreia', 'USG escrotal se dúvida']
    },
    protocolos: [],
    medicamentos: ['ceftriaxona', 'doxiciclina', 'levofloxacino'],
    calculadoras: [],
    tags: ['IST', 'escroto', 'urgência']
  },
  {
    id: 'hidrocele',
    titulo: 'Hidrocele',
    sinonimos: ['Hidrocele testicular'],
    ciap2: ['Y83'],
    cid10: ['N43.0', 'N43.3'],
    cid11: ['GA80'],
    doid: 'DOID:12316',
    snomedCT: '26614003',
    meshId: 'D006848',
    umlsCui: 'C0020295',
    categoria: 'urologico',
    quickView: {
      definicao: 'Acúmulo de líquido seroso entre as camadas da túnica vaginal do testículo. Congênita (comunicante) ou adquirida (reacional).',
      criteriosDiagnosticos: [
        'Aumento escrotal indolor e progressivo',
        'Transiluminação positiva (diferencia de hérnia/tumor)',
        'Testículo não palpável (líquido ao redor)',
        'USG confirma líquido ao redor do testículo'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Observação se pequena e assintomática',
          'Em crianças <2 anos: geralmente resolve espontaneamente'
        ],
        farmacologico: [
          'Não há tratamento medicamentoso',
          'Cirurgia (hidrocelectomia) se sintomática ou grande',
          'Investigar causa se secundária (trauma, infecção, tumor)'
        ]
      },
      redFlags: ['Dor intensa', 'Endurecimento testicular (tumor?)', 'Hérnia encarcerada'],
      metasTerapeuticas: ['Resolução do aumento escrotal se sintomático'],
      examesIniciais: ['USG escrotal', 'Transiluminação']
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    tags: ['escroto', 'cirurgia', 'pediátrico']
  },

  // === GINECOLOGIA ===
  {
    id: 'endometriose',
    titulo: 'Endometriose',
    sinonimos: ['Endometrioma'],
    ciap2: ['X99'],
    cid10: ['N80'],
    cid11: ['GA10'],
    doid: 'DOID:289',
    snomedCT: '129103003',
    meshId: 'D004715',
    umlsCui: 'C0014175',
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Presença de tecido endometrial fora do útero (ovários, peritônio, septo retovaginal). Afeta 10% das mulheres em idade reprodutiva.',
      criteriosDiagnosticos: [
        'Dismenorreia progressiva e incapacitante',
        'Dispareunia profunda',
        'Dor pélvica crônica',
        'Infertilidade',
        'Laparoscopia com biópsia: padrão-ouro'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Atividade física regular',
          'Calor local para alívio da dor'
        ],
        farmacologico: [
          'AINEs para dor',
          'Contraceptivo hormonal combinado contínuo',
          'Progestágenos: dienogeste 2mg/dia, DIU-LNG',
          'Análogos de GnRH (casos graves): uso temporário'
        ]
      },
      redFlags: ['Massa pélvica grande', 'Obstrução intestinal/ureteral', 'Infertilidade refratária'],
      metasTerapeuticas: ['Controle da dor', 'Preservação da fertilidade', 'Qualidade de vida'],
      examesIniciais: ['USG transvaginal', 'RM pélvica (mapeamento)', 'CA-125 (inespecífico)']
    },
    protocolos: [],
    medicamentos: ['dienogeste', 'ibuprofeno'],
    calculadoras: [],
    tags: ['dor pélvica', 'infertilidade', 'hormônio']
  },
  {
    id: 'mioma-uterino',
    titulo: 'Mioma Uterino',
    sinonimos: ['Leiomioma', 'Fibroma uterino'],
    ciap2: ['X78'],
    cid10: ['D25'],
    cid11: ['2E86'],
    doid: 'DOID:13223',
    snomedCT: '95315005',
    meshId: 'D007889',
    umlsCui: 'C0042133',
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Tumor benigno do miométrio. Prevalência de 20-40% das mulheres em idade reprodutiva. Tipos: submucoso, intramural, subseroso.',
      criteriosDiagnosticos: [
        'Sangramento uterino anormal (menorragia)',
        'Dor/pressão pélvica',
        'Sintomas compressivos: frequência urinária, constipação',
        'USG ou RM: nódulos miometriais bem definidos'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Observação se assintomático',
          'Embolização das artérias uterinas (alternativa cirúrgica)'
        ],
        farmacologico: [
          'Sangramento: ácido tranexâmico, AINEs',
          'Controle hormonal: ACO, DIU-LNG, progestágenos',
          'Análogos de GnRH (pré-operatório): reduz tamanho',
          'Cirurgia: miomectomia ou histerectomia se refratário'
        ]
      },
      redFlags: ['Anemia grave', 'Crescimento rápido pós-menopausa', 'Compressão ureteral'],
      metasTerapeuticas: ['Controle do sangramento', 'Preservar fertilidade se desejado'],
      examesIniciais: ['USG transvaginal', 'Hemograma', 'Ferritina', 'Histeroscopia se submucoso']
    },
    protocolos: [],
    medicamentos: ['acido-tranexamico'],
    calculadoras: [],
    tags: ['sangramento', 'cirurgia', 'anemia']
  },
  {
    id: 'doenca-inflamatoria-pelvica',
    titulo: 'Doença Inflamatória Pélvica',
    sinonimos: ['DIP', 'Salpingite', 'Anexite'],
    ciap2: ['X74'],
    cid10: ['N73', 'N74'],
    cid11: ['GA06'],
    doid: 'DOID:1003',
    snomedCT: '198130006',
    meshId: 'D000292',
    umlsCui: 'C0242172',
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Infecção ascendente do trato genital superior (endometrite, salpingite, abscesso tubo-ovariano). Geralmente polimicrobiana, incluindo Chlamydia e Gonorreia.',
      criteriosDiagnosticos: [
        'Dor pélvica/abdominal baixa',
        'Dor à mobilização do colo uterino',
        'Dor anexial à palpação',
        'Critérios adicionais: febre, secreção mucopurulenta, leucocitose'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Repouso',
          'Abstinência sexual durante tratamento',
          'Tratar parceiro(s)'
        ],
        farmacologico: [
          'Ambulatorial (leve/moderada): Ceftriaxona 500mg IM + Doxiciclina 100mg 12/12h por 14 dias + Metronidazol 500mg 12/12h por 14 dias',
          'Hospitalar (grave): IV até melhora, depois oral',
          'Cirurgia se abscesso não responsivo'
        ]
      },
      redFlags: ['Abscesso tubo-ovariano', 'Peritonite', 'Sepse', 'Não resposta em 72h'],
      metasTerapeuticas: ['Erradicação da infecção', 'Prevenção de sequelas (infertilidade, ectópica)'],
      examesIniciais: ['Teste para Chlamydia/Gonorreia', 'USG transvaginal', 'Hemograma', 'PCR']
    },
    protocolos: [],
    medicamentos: ['ceftriaxona', 'doxiciclina', 'metronidazol'],
    calculadoras: [],
    tags: ['IST', 'urgência', 'infertilidade']
  },
  {
    id: 'sangramento-uterino-anormal',
    titulo: 'Sangramento Uterino Anormal',
    sinonimos: ['SUA', 'Menorragia', 'Metrorragia', 'Sangramento uterino disfuncional'],
    ciap2: ['X06'],
    cid10: ['N92', 'N93'],
    cid11: ['GA20'],
    doid: 'DOID:0081295',
    snomedCT: '64996003',
    meshId: 'D008796',
    umlsCui: 'C0025874',
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Alteração do padrão menstrual (frequência, duração, volume). Classificação PALM-COEIN: Pólipo, Adenomiose, Leiomioma, Malignidade - Coagulopatia, Ovulatória, Endometrial, Iatrogênica, Não classificada.',
      criteriosDiagnosticos: [
        'Sangramento >80mL/ciclo ou >7 dias',
        'Ciclos <21 ou >35 dias',
        'Sangramento intermenstrual ou pós-coito',
        'Investigar causa conforme PALM-COEIN'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Diário menstrual',
          'Suplementação de ferro se anemia'
        ],
        farmacologico: [
          'Agudo: ácido tranexâmico 1g 8/8h, ACO em alta dose',
          'Crônico ovulatório: DIU-LNG, ACO',
          'Crônico anovulatório: progestágeno cíclico, ACO',
          'Tratar causa específica (pólipo, mioma)'
        ]
      },
      redFlags: ['Sangramento pós-menopausa', 'Anemia grave', 'Instabilidade hemodinâmica'],
      metasTerapeuticas: ['Regularização do ciclo', 'Correção da anemia'],
      examesIniciais: ['Hemograma', 'Ferritina', 'TSH', 'USG transvaginal', 'Histeroscopia se indicado']
    },
    protocolos: [],
    medicamentos: ['acido-tranexamico', 'medroxiprogesterona'],
    calculadoras: [],
    tags: ['menstruação', 'anemia', 'hormônio']
  },
  {
    id: 'mastite-lactacional',
    titulo: 'Mastite Lactacional',
    sinonimos: ['Mastite puerperal'],
    ciap2: ['W94'],
    cid10: ['O91.1'],
    cid11: ['JB42.2'],
    doid: 'DOID:10690',
    snomedCT: '45198002',
    meshId: 'D008413',
    umlsCui: 'C0024894',
    categoria: 'ginecologico',
    quickView: {
      definicao: 'Inflamação mamária durante lactação, geralmente por estase láctea e/ou infecção bacteriana (S. aureus). Pico: 2-3 semanas pós-parto.',
      criteriosDiagnosticos: [
        'Dor mamária localizada, eritema, calor',
        'Febre ≥38,5°C, mal-estar',
        'Massa flutuante sugere abscesso',
        'Geralmente unilateral'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'CONTINUAR AMAMENTAÇÃO (essencial)',
          'Esvaziamento frequente da mama',
          'Compressas mornas antes de amamentar',
          'Compressas frias após para desconforto'
        ],
        farmacologico: [
          'Analgésico: Ibuprofeno 400mg 8/8h ou Paracetamol',
          'Antibiótico se não melhora em 24-48h ou sintomas sistêmicos: Cefalexina 500mg 6/6h por 10-14 dias',
          'Alternativa: Amoxicilina-clavulanato'
        ]
      },
      redFlags: ['Abscesso (drenar)', 'Sepse', 'Não resposta a antibiótico'],
      metasTerapeuticas: ['Resolução da inflamação', 'Manutenção da amamentação'],
      examesIniciais: ['Clínico geralmente suficiente', 'USG se suspeita de abscesso']
    },
    protocolos: [],
    medicamentos: ['cefalexina', 'ibuprofeno'],
    calculadoras: [],
    tags: ['amamentação', 'puerpério', 'infecção']
  },

  // === PEDIATRIA ===
  {
    id: 'bronquiolite',
    titulo: 'Bronquiolite',
    sinonimos: ['Bronquiolite viral aguda'],
    ciap2: ['R78'],
    cid10: ['J21'],
    cid11: ['CA40.1'],
    doid: 'DOID:2942',
    snomedCT: '4120002',
    meshId: 'D001988',
    umlsCui: 'C0006271',
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Infecção viral das vias aéreas inferiores em lactentes (<2 anos). VSR é o agente mais comum. Pico: inverno.',
      criteriosDiagnosticos: [
        'Idade <24 meses',
        'Primeiro episódio de sibilância',
        'Pródromos de IVAS (coriza, tosse)',
        'Taquipneia, tiragem, sibilos, crepitantes',
        'Diagnóstico clínico - exames raramente necessários'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação adequada',
          'Aspiração nasal',
          'Oxigenoterapia se SatO2 <90-92%',
          'Posição elevada'
        ],
        farmacologico: [
          'NÃO usar rotineiramente: broncodilatadores, corticoides, antibióticos',
          'Nebulização com salina hipertônica 3% pode ser tentada',
          'Palivizumabe (profilaxia em alto risco - prematuro, cardiopatia)'
        ]
      },
      redFlags: ['Apneia', 'Cianose', 'Desidratação', 'Letargia', 'SatO2 <90%'],
      metasTerapeuticas: ['Manter oxigenação', 'Hidratação', 'Suporte até resolução'],
      examesIniciais: ['Oximetria de pulso', 'Radiografia só se dúvida diagnóstica']
    },
    protocolos: [],
    medicamentos: [],
    calculadoras: [],
    tags: ['lactente', 'vírus', 'inverno']
  },
  {
    id: 'laringite-aguda',
    titulo: 'Laringite/Crupe Viral',
    sinonimos: ['Laringotraqueobronquite', 'Crupe'],
    ciap2: ['R77'],
    cid10: ['J05.0', 'J04.0'],
    cid11: ['CA03.0'],
    doid: 'DOID:9396',
    snomedCT: '6142004',
    meshId: 'D003440',
    umlsCui: 'C0010380',
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Inflamação da laringe e traqueia, geralmente viral (parainfluenza). Pico: 6 meses a 3 anos. Estridor inspiratório característico.',
      criteriosDiagnosticos: [
        'Tosse ladrante ("de cachorro")',
        'Estridor inspiratório (pior à noite)',
        'Rouquidão',
        'Febre baixa, pródromos de IVAS',
        'Sinal da torre em radiografia (estreitamento subglótico) - não obrigatório'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Ar frio ou umidificado',
          'Manter calmo (choro piora)',
          'Monitorar progressão'
        ],
        farmacologico: [
          'Leve: observação, pode não precisar de medicação',
          'Moderado: Dexametasona 0,15-0,6mg/kg VO dose única',
          'Grave: Dexametasona + Nebulização de adrenalina (1:1000) 3-5mL - pronto-socorro',
          'Adrenalina: efeito temporário (2h) - observar após'
        ]
      },
      redFlags: ['Estridor em repouso', 'Tiragem acentuada', 'Cianose', 'Agitação/sonolência', 'Baba (epiglotite?)'],
      metasTerapeuticas: ['Alívio do estridor', 'Prevenção de obstrução'],
      examesIniciais: ['Clínico - evitar manipulação da orofaringe', 'Oximetria']
    },
    protocolos: [],
    medicamentos: ['dexametasona'],
    calculadoras: [],
    tags: ['emergência', 'vírus', 'estridor']
  },
  {
    id: 'coqueluche',
    titulo: 'Coqueluche',
    sinonimos: ['Tosse comprida', 'Pertussis'],
    ciap2: ['R71'],
    cid10: ['A37'],
    cid11: ['1C12'],
    doid: 'DOID:1116',
    snomedCT: '27836007',
    meshId: 'D014917',
    umlsCui: 'C0043167',
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Infecção respiratória por Bordetella pertussis. Tosse paroxística com guincho inspiratório. Grave em lactentes não vacinados.',
      criteriosDiagnosticos: [
        'Tosse ≥2 semanas com pelo menos um:',
        'Paroxismos de tosse',
        'Guincho inspiratório (whoop)',
        'Vômito pós-tosse',
        'Apneia em lactentes',
        'PCR ou cultura para B. pertussis'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Isolamento respiratório por 5 dias de antibiótico',
          'Monitoramento de lactentes (risco de apneia)'
        ],
        farmacologico: [
          'Azitromicina 10mg/kg/dia por 5 dias (preferido em <1 mês)',
          'Ou Claritromicina 15mg/kg/dia dividido 12/12h por 7 dias',
          'Ou Eritromicina (menos usado - intolerância GI)',
          'Quimioprofilaxia de contactantes domiciliares'
        ]
      },
      redFlags: ['Lactente <6 meses', 'Apneia', 'Cianose', 'Convulsão', 'Pneumonia'],
      metasTerapeuticas: ['Reduzir transmissibilidade', 'Prevenção de complicações'],
      examesIniciais: ['PCR para B. pertussis', 'Hemograma (linfocitose)']
    },
    protocolos: [],
    medicamentos: ['azitromicina', 'claritromicina'],
    calculadoras: [],
    tags: ['vacina', 'notificação', 'tosse crônica']
  },
  {
    id: 'escarlatina',
    titulo: 'Escarlatina',
    sinonimos: ['Febre escarlate'],
    ciap2: ['A78'],
    cid10: ['A38'],
    cid11: ['1B50'],
    doid: 'DOID:4914',
    snomedCT: '30242009',
    meshId: 'D012541',
    umlsCui: 'C0036285',
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Infecção por Streptococcus pyogenes (grupo A) produtora de toxina eritrogênica. Faringite + exantema característico.',
      criteriosDiagnosticos: [
        'Faringite estreptocócica (odinofagia, exsudato)',
        'Exantema: papular fino ("lixa"), palidez perioral, linhas de Pastia',
        'Língua em framboesa',
        'Descamação em dedos após 1-2 semanas',
        'Teste rápido ou cultura para Streptococcus'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Hidratação',
          'Repouso',
          'Retorno às atividades 24h após início de ATB'
        ],
        farmacologico: [
          'Penicilina V 250-500mg 12/12h por 10 dias',
          'Ou Amoxicilina 50mg/kg/dia por 10 dias',
          'Alergia a penicilina: Azitromicina 12mg/kg/dia por 5 dias'
        ]
      },
      redFlags: ['Não melhora em 48-72h', 'Abscesso peritonsilar', 'Febre reumática'],
      metasTerapeuticas: ['Erradicação do Streptococcus', 'Prevenção de FR e GNDA'],
      examesIniciais: ['Teste rápido para Streptococcus', 'Cultura de orofaringe se TR negativo']
    },
    protocolos: [],
    medicamentos: ['amoxicilina', 'penicilina-v'],
    calculadoras: [],
    tags: ['exantema', 'streptococcus', 'faringite']
  },
  {
    id: 'dermatite-fraldas',
    titulo: 'Dermatite da Área de Fraldas',
    sinonimos: ['Assadura', 'Dermatite de fralda'],
    ciap2: ['S89'],
    cid10: ['L22'],
    cid11: ['ED52.0'],
    doid: 'DOID:0060163',
    snomedCT: '91487003',
    meshId: 'D003963',
    umlsCui: 'C0011616',
    categoria: 'pediatrico',
    quickView: {
      definicao: 'Dermatite irritativa de contato na área coberta pela fralda. Pode haver infecção secundária por Candida.',
      criteriosDiagnosticos: [
        'Eritema em áreas convexas (poupando dobras = irritativa)',
        'Lesões satélites, pústulas, dobras afetadas = Candida',
        'Descamação, erosões em casos graves',
        'Diagnóstico clínico'
      ],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: [
          'Troca frequente de fraldas',
          'Manter área seca',
          'Expor ao ar',
          'Pasta d\'água ou óxido de zinco como barreira'
        ],
        farmacologico: [
          'Irritativa leve: barreira (óxido de zinco) suficiente',
          'Se Candida: Nistatina creme 4x/dia por 7-14 dias',
          'Ou Miconazol creme 2x/dia',
          'Corticoide de baixa potência (hidrocortisona 1%) se inflamação intensa, uso breve'
        ]
      },
      redFlags: ['Não resposta ao tratamento', 'Erosões extensas', 'Infecção bacteriana secundária'],
      metasTerapeuticas: ['Resolução do eritema', 'Prevenção de recorrência'],
      examesIniciais: ['Clínico - exames geralmente desnecessários', 'Raspado se dúvida (Candida)']
    },
    protocolos: [],
    medicamentos: ['nistatina', 'miconazol'],
    calculadoras: [],
    tags: ['lactente', 'candida', 'pele']
  },
];
