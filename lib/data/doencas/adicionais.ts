/**
 * DOENÇAS ADICIONAIS - DARWIN-MFC
 * ================================
 * Expansão de doenças para cobertura completa da APS
 * Inclui condições comuns não cobertas em outras categorias
 */

import { Doenca } from '../../types/doenca';

export const doencasAdicionais: Partial<Doenca>[] = [
  // ============================================
  // CONDIÇÕES OTORRINOLARINGOLÓGICAS
  // ============================================
  {
    id: 'sinusite-aguda',
    titulo: 'Sinusite Aguda',
    ciap2: ['R75'],
    cid10: ['J01'],
    categoria: 'respiratorio',
    doid: 'DOID:0050127',
    snomedCT: '15805002',
    meshId: 'D012852',
    umlsCui: 'C0037199',
    quickView: {
      definicao: 'Inflamação dos seios paranasais, geralmente viral. Duração <4 semanas. Bacteriana se sintomas >10 dias ou piora após melhora inicial.',
      criteriosDiagnosticos: ['Congestão nasal', 'Rinorreia purulenta', 'Dor facial/pressão', 'Hiposmia', 'Duração 7-10 dias (viral) ou >10 dias (bacteriana)'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Lavagem nasal com SF', 'Hidratação', 'Umidificação do ar'],
        farmacologico: ['Sintomático: analgésico + descongestionante tópico (máx 5 dias)', 'ATB se bacteriana: Amoxicilina 500mg 8/8h 7-10 dias']
      },
      redFlags: ['Edema periorbital', 'Alteração visual', 'Cefaleia intensa', 'Sinais meníngeos']
    },
    medicamentos: ['amoxicilina', 'paracetamol'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'rinite-alergica',
    titulo: 'Rinite Alérgica',
    ciap2: ['R97'],
    cid10: ['J30'],
    categoria: 'respiratorio',
    doid: 'DOID:4481',
    snomedCT: '61582004',
    meshId: 'D065631',
    umlsCui: 'C2607914',
    quickView: {
      definicao: 'Inflamação da mucosa nasal mediada por IgE. Afeta 10-25% da população. Associada a asma e conjuntivite.',
      criteriosDiagnosticos: ['Espirros em salva', 'Prurido nasal', 'Rinorreia aquosa', 'Obstrução nasal', 'Sintomas >1h/dia, >4 dias/semana'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar alérgenos identificados', 'Lavagem nasal com SF'],
        farmacologico: ['Corticoide nasal: Budesonida spray 1-2 jatos/narina 1x/dia', 'Anti-histamínico: Loratadina 10mg 1x/dia']
      },
      redFlags: ['Rinorreia unilateral', 'Epistaxe recorrente', 'Anosmia persistente']
    },
    medicamentos: ['loratadina', 'budesonida'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'vertigem-posicional',
    titulo: 'Vertigem Posicional Paroxística Benigna (VPPB)',
    ciap2: ['N17'],
    cid10: ['H81.1'],
    categoria: 'neurologico',
    doid: 'DOID:10781',
    snomedCT: '111541001',
    meshId: 'D014717',
    umlsCui: 'C0155502',
    quickView: {
      definicao: 'Causa mais comum de vertigem. Deslocamento de otocônias para canais semicirculares. Episódios breves (<1min) desencadeados por movimentos da cabeça.',
      criteriosDiagnosticos: ['Vertigem rotatória breve', 'Desencadeada por movimento cefálico', 'Dix-Hallpike positivo', 'Nistagmo característico'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Manobra de Epley (canal posterior)', 'Manobra de Lempert (canal lateral)', 'Evitar movimentos bruscos'],
        farmacologico: ['Antivertiginosos NÃO são primeira linha', 'Meclizina apenas sintomático transitório']
      },
      redFlags: ['Sintomas neurológicos focais', 'Vertigem contínua (>24h)', 'Hipoacusia súbita', 'Cefaleia intensa']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES OFTALMOLÓGICAS
  // ============================================
  {
    id: 'conjuntivite',
    titulo: 'Conjuntivite',
    ciap2: ['F70'],
    cid10: ['H10'],
    categoria: 'outros',
    doid: 'DOID:6195',
    snomedCT: '9826008',
    meshId: 'D003231',
    umlsCui: 'C0009763',
    quickView: {
      definicao: 'Inflamação da conjuntiva. Viral (mais comum), bacteriana ou alérgica. Altamente contagiosa se infecciosa.',
      criteriosDiagnosticos: ['Hiperemia conjuntival', 'Secreção (aquosa=viral, purulenta=bacteriana)', 'Prurido (alérgica)', 'Sensação de corpo estranho'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Compressas frias', 'Higiene das mãos', 'Evitar contato com outros'],
        farmacologico: ['Viral: autolimitada 7-14 dias', 'Bacteriana: Ciprofloxacino colírio 1 gota 4x/dia 7 dias', 'Alérgica: Anti-histamínico colírio']
      },
      redFlags: ['Dor ocular intensa', 'Fotofobia', 'Acuidade visual reduzida', 'Opacidade corneana']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'olho-seco',
    titulo: 'Síndrome do Olho Seco',
    ciap2: ['F13'],
    cid10: ['H04.1'],
    categoria: 'outros',
    doid: 'DOID:12895',
    snomedCT: '302896008',
    meshId: 'D015352',
    umlsCui: 'C0013238',
    quickView: {
      definicao: 'Doença multifatorial da superfície ocular com instabilidade do filme lacrimal. Prevalência aumenta com idade e uso de telas.',
      criteriosDiagnosticos: ['Sensação de areia nos olhos', 'Ardência', 'Visão turva intermitente', 'Fadiga ocular', 'Lacrimejamento reflexo'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Pausas frequentes no uso de telas (regra 20-20-20)', 'Umidificador de ar', 'Evitar ar condicionado direto'],
        farmacologico: ['Lágrimas artificiais sem conservantes 4-6x/dia', 'Gel lubrificante à noite']
      },
      redFlags: ['Dor intensa', 'Perda visual', 'Não resposta ao tratamento']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES MUSCULOESQUELÉTICAS ADICIONAIS
  // ============================================
  {
    id: 'tendinite-ombro',
    titulo: 'Síndrome do Manguito Rotador',
    ciap2: ['L92'],
    cid10: ['M75'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:0080731',
    snomedCT: '239872009',
    meshId: 'D000070636',
    umlsCui: 'C0085551',
    quickView: {
      definicao: 'Tendinopatia do manguito rotador (supraespinal mais comum). Principal causa de dor no ombro em adultos.',
      criteriosDiagnosticos: ['Dor no ombro anterolateral', 'Arco doloroso (60-120° abdução)', 'Testes: Jobe, Neer, Hawkins positivos', 'Dificuldade para dormir sobre o lado'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso relativo (evitar movimentos overhead)', 'Fisioterapia (fortalecimento e mobilização)', 'Crioterapia'],
        farmacologico: ['AINE: Ibuprofeno 400mg 8/8h por 7-10 dias', 'Analgésico se necessário']
      },
      redFlags: ['Trauma agudo', 'Incapacidade de elevar braço', 'Atrofia muscular', 'Parestesias']
    },
    medicamentos: ['ibuprofeno', 'paracetamol'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'epicondilite-lateral',
    titulo: 'Epicondilite Lateral (Cotovelo de Tenista)',
    ciap2: ['L93'],
    cid10: ['M77.1'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:9479',
    snomedCT: '202855006',
    meshId: 'D013716',
    umlsCui: 'C0039516',
    quickView: {
      definicao: 'Tendinopatia de inserção dos extensores do punho no epicôndilo lateral. Causa comum de dor no cotovelo.',
      criteriosDiagnosticos: ['Dor no epicôndilo lateral', 'Piora com preensão e extensão do punho', 'Teste de Cozen positivo', 'Teste de Mill positivo'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso da atividade causadora', 'Órtese de contra-força', 'Alongamentos e exercícios excêntricos'],
        farmacologico: ['AINE tópico: Diclofenaco gel 3x/dia', 'AINE oral curto prazo se necessário']
      },
      redFlags: ['Bloqueio articular', 'Instabilidade', 'Massa palpável']
    },
    medicamentos: ['ibuprofeno', 'diclofenaco'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'fascite-plantar',
    titulo: 'Fascite Plantar',
    ciap2: ['L99'],
    cid10: ['M72.2'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:0060041',
    snomedCT: '202882003',
    meshId: 'D036981',
    umlsCui: 'C0238698',
    quickView: {
      definicao: 'Degeneração da fáscia plantar na inserção no calcâneo. Causa mais comum de dor no calcanhar. Pico: 40-60 anos.',
      criteriosDiagnosticos: ['Dor no calcanhar medial', 'Piora nos primeiros passos da manhã', 'Melhora com atividade leve, piora com atividade prolongada', 'Dor à palpação da tuberosidade medial do calcâneo'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Alongamento da fáscia e gastrocnêmio', 'Palmilhas com suporte de arco', 'Gelo local', 'Calçados adequados'],
        farmacologico: ['AINE curto prazo', 'Infiltração com corticoide se refratário']
      },
      redFlags: ['Dor noturna', 'Parestesias', 'Eritema e edema', 'Febre']
    },
    medicamentos: ['ibuprofeno'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'fibromialgia',
    titulo: 'Fibromialgia',
    ciap2: ['L18'],
    cid10: ['M79.7'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:631',
    snomedCT: '24693007',
    meshId: 'D005356',
    umlsCui: 'C0016053',
    quickView: {
      definicao: 'Síndrome de dor crônica generalizada com fadiga, distúrbio do sono e sintomas cognitivos. 2-8% da população.',
      criteriosDiagnosticos: ['Dor difusa >3 meses', 'Índice de dor generalizada (WPI) ≥7 + SSS ≥5 OU WPI 4-6 + SSS ≥9', 'Fadiga', 'Sono não reparador', 'Sintomas cognitivos'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercício aeróbico regular', 'TCC para dor', 'Higiene do sono', 'Educação sobre a doença'],
        farmacologico: ['Amitriptilina 10-25mg à noite', 'Ciclobenzaprina 5-10mg à noite', 'Duloxetina 30-60mg/dia']
      },
      redFlags: ['Perda de peso', 'Febre', 'Déficit neurológico', 'Artrite verdadeira']
    },
    medicamentos: ['amitriptilina'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES DERMATOLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'acne-vulgar',
    titulo: 'Acne Vulgar',
    ciap2: ['S96'],
    cid10: ['L70'],
    categoria: 'dermatologico',
    doid: 'DOID:6543',
    snomedCT: '11381005',
    meshId: 'D000152',
    umlsCui: 'C0001144',
    quickView: {
      definicao: 'Doença inflamatória crônica do folículo pilossebáceo. Afeta 85% dos adolescentes. Pode persistir na vida adulta.',
      criteriosDiagnosticos: ['Comedões abertos e fechados', 'Pápulas e pústulas', 'Nódulos e cistos (forma grave)', 'Localização: face, tórax, dorso'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Limpeza suave 2x/dia', 'Evitar manipular lesões', 'Fotoproteção'],
        farmacologico: ['Leve: Peróxido de benzoíla 5% 1x/dia', 'Moderada: + Adapaleno 0,1% à noite', 'Grave: + ATB oral (Doxiciclina 100mg/dia)']
      },
      redFlags: ['Acne fulminante', 'Sinais de hiperandrogenismo', 'Não resposta ao tratamento']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'herpes-simples',
    titulo: 'Herpes Simples',
    ciap2: ['S71'],
    cid10: ['B00'],
    categoria: 'infecciosas',
    doid: 'DOID:8566',
    snomedCT: '88594005',
    meshId: 'D006561',
    umlsCui: 'C0019348',
    quickView: {
      definicao: 'Infecção viral recorrente por HSV-1 (labial) ou HSV-2 (genital). Latência em gânglios nervosos com reativações.',
      criteriosDiagnosticos: ['Vesículas agrupadas em base eritematosa', 'Pródromo: formigamento, queimação', 'Evolui para crostas em 7-10 dias'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar contato na fase ativa', 'Evitar fatores desencadeantes (sol, estresse)'],
        farmacologico: ['Episódio: Aciclovir 400mg 3x/dia por 5 dias', 'Supressão (≥6 recorrências/ano): Aciclovir 400mg 2x/dia contínuo']
      },
      redFlags: ['Herpes ocular', 'Eczema herpético', 'Herpes disseminado (imunodeprimido)']
    },
    medicamentos: ['aciclovir'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'herpes-zoster',
    titulo: 'Herpes Zóster',
    ciap2: ['S70'],
    cid10: ['B02'],
    categoria: 'infecciosas',
    doid: 'DOID:8536',
    snomedCT: '4740000',
    meshId: 'D006562',
    umlsCui: 'C0019360',
    quickView: {
      definicao: 'Reativação do vírus varicela-zóster latente em gânglios. Risco aumenta com idade e imunossupressão.',
      criteriosDiagnosticos: ['Dor neuropática precedendo erupção', 'Vesículas em dermátomo unilateral', 'Não ultrapassa linha média', 'Dermátomos torácicos mais comuns'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Manter lesões limpas e secas', 'Não furar vesículas'],
        farmacologico: ['Aciclovir 800mg 5x/dia por 7 dias (iniciar <72h)', 'Analgesia: Paracetamol + AINE', 'Se >50 anos: associar corticoide para reduzir neuralgia']
      },
      redFlags: ['Zóster oftálmico (ponta do nariz)', 'Síndrome de Ramsay-Hunt (ouvido)', 'Disseminado', 'Imunodeprimido']
    },
    medicamentos: ['aciclovir', 'paracetamol'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'escabiose',
    titulo: 'Escabiose (Sarna)',
    ciap2: ['S72'],
    cid10: ['B86'],
    categoria: 'infecciosas',
    doid: 'DOID:13234',
    snomedCT: '128869009',
    meshId: 'D012532',
    umlsCui: 'C0036262',
    quickView: {
      definicao: 'Infestação cutânea pelo ácaro Sarcoptes scabiei. Transmissão por contato direto prolongado.',
      criteriosDiagnosticos: ['Prurido intenso noturno', 'Lesões em interdigitais, punhos, axilas, genitais', 'Sulcos/túneis característicos', 'Contato familiar com prurido'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Tratar todos os contatos domiciliares', 'Lavar roupas e lençóis em água quente', 'Ensacar roupas não laváveis por 72h'],
        farmacologico: ['Permetrina 5% creme: aplicar do pescoço aos pés, lavar após 8-14h, repetir em 7 dias', 'Ivermectina 200mcg/kg VO dose única (casos extensos)']
      },
      redFlags: ['Sarna norueguesa (crostosa) - imunodeprimido', 'Infecção secundária']
    },
    medicamentos: ['ivermectina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'impetigo',
    titulo: 'Impetigo',
    ciap2: ['S84'],
    cid10: ['L01'],
    categoria: 'infecciosas',
    doid: 'DOID:8504',
    snomedCT: '48277006',
    meshId: 'D007169',
    umlsCui: 'C0021099',
    quickView: {
      definicao: 'Infecção bacteriana superficial da pele (S. aureus ou S. pyogenes). Mais comum em crianças. Altamente contagioso.',
      criteriosDiagnosticos: ['Bolhoso: bolhas flácidas que rompem', 'Crostoso (mais comum): crostas melicéricas ("cor de mel")', 'Lesões satélites por autoinoculação'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Remoção suave de crostas com água e sabão', 'Evitar compartilhar toalhas'],
        farmacologico: ['Localizado: Mupirocina pomada 2% 3x/dia 5-7 dias', 'Extenso: Cefalexina 500mg 6/6h 7 dias']
      },
      redFlags: ['Celulite', 'Febre', 'Linfadenopatia dolorosa']
    },
    medicamentos: ['cefalexina'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES ENDÓCRINAS ADICIONAIS
  // ============================================
  {
    id: 'nodulo-tireoide',
    titulo: 'Nódulo de Tireoide',
    ciap2: ['T81'],
    cid10: ['E04'],
    categoria: 'metabolico',
    doid: 'DOID:50',
    snomedCT: '237495005',
    meshId: 'D016606',
    umlsCui: 'C0040137',
    quickView: {
      definicao: 'Lesões discretas na tireoide, muito comuns (50% da população por US). Maioria benignos. 5-15% são carcinomas.',
      criteriosDiagnosticos: ['Nódulo palpável ou incidental em imagem', 'TSH para avaliar função', 'US tireoide para caracterização', 'PAAF se >1cm com características suspeitas'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Observação se benigno e pequeno', 'Seguimento com US periódico'],
        farmacologico: ['Não há tratamento medicamentoso para nódulos benignos', 'Levotiroxina NÃO suprime nódulos']
      },
      redFlags: ['Crescimento rápido', 'Rouquidão', 'Nódulo pétreo', 'Linfonodomegalia cervical', 'História familiar de Ca tireoide']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'sindrome-ovarios-policisticos',
    titulo: 'Síndrome dos Ovários Policísticos (SOP)',
    ciap2: ['X99'],
    cid10: ['E28.2'],
    categoria: 'ginecologico',
    doid: 'DOID:11612',
    snomedCT: '237055002',
    meshId: 'D011085',
    umlsCui: 'C0032460',
    quickView: {
      definicao: 'Síndrome endócrina mais comum em mulheres em idade reprodutiva (5-10%). Associada a resistência insulínica e risco metabólico.',
      criteriosDiagnosticos: ['Rotterdam: 2 de 3 critérios', 'Oligo/anovulação', 'Hiperandrogenismo clínico ou laboratorial', 'Ovários policísticos no US', 'Excluir outras causas'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Perda de peso (5-10% melhora ovulação)', 'Dieta e exercício regular'],
        farmacologico: ['Regularização menstrual: ACO combinado', 'Se desejo gestacional: Metformina + indução ovulatória', 'Hirsutismo: Espironolactona 100mg/dia']
      },
      redFlags: ['Virilização rápida', 'Amenorreia primária', 'Sintomas de Cushing']
    },
    medicamentos: ['metformina'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES UROLÓGICAS
  // ============================================
  {
    id: 'litiase-renal',
    titulo: 'Litíase Renal (Cálculo Renal)',
    ciap2: ['U95'],
    cid10: ['N20'],
    categoria: 'urologico',
    doid: 'DOID:585',
    snomedCT: '95570007',
    meshId: 'D007669',
    umlsCui: 'C0022650',
    quickView: {
      definicao: 'Formação de cálculos no trato urinário. Prevalência 5-15%. Cálcio é o tipo mais comum (80%).',
      criteriosDiagnosticos: ['Cólica renal: dor lombar intensa, irradiação para flanco e virilha', 'Náuseas e vômitos', 'Hematúria', 'Agitação (não encontra posição de alívio)'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação', 'Coar urina para capturar cálculo', 'Repouso durante crise'],
        farmacologico: ['Analgesia: Dipirona 1g EV + AINE (Cetoprofeno 100mg)', 'Antiespasmódico: Hioscina 20mg', 'Alfa-bloqueador: Tansulosina 0,4mg se cálculo 5-10mm']
      },
      redFlags: ['Febre (pielonefrite obstrutiva)', 'Anúria', 'Rim único', 'Insuficiência renal']
    },
    medicamentos: ['dipirona', 'ibuprofeno'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'hiperplasia-prostatica',
    titulo: 'Hiperplasia Prostática Benigna (HPB)',
    ciap2: ['Y85'],
    cid10: ['N40'],
    categoria: 'urologico',
    doid: 'DOID:2191',
    snomedCT: '266569009',
    meshId: 'D011470',
    umlsCui: 'C0005001',
    quickView: {
      definicao: 'Aumento benigno da próstata causando LUTS (sintomas do trato urinário inferior). Afeta 50% dos homens >50 anos.',
      criteriosDiagnosticos: ['IPSS ≥8 (moderado a grave)', 'Sintomas obstrutivos: jato fraco, hesitação, esvaziamento incompleto', 'Sintomas irritativos: noctúria, urgência, polaciúria', 'Toque retal: próstata aumentada, fibroelástica'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Reduzir líquidos à noite', 'Evitar cafeína e álcool', 'Micção dupla'],
        farmacologico: ['Alfa-bloqueador: Tansulosina 0,4mg à noite', 'Se próstata >40g: adicionar Finasterida 5mg/dia', 'IPSS leve: vigilância ativa']
      },
      redFlags: ['Retenção urinária aguda', 'Hematúria macroscópica', 'ITU de repetição', 'Insuficiência renal']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: ['ipss']
  },

  // ============================================
  // CONDIÇÕES GINECOLÓGICAS
  // ============================================
  {
    id: 'vaginose-bacteriana',
    titulo: 'Vaginose Bacteriana',
    ciap2: ['X84'],
    cid10: ['N76.0'],
    categoria: 'ginecologico',
    doid: 'DOID:0080165',
    snomedCT: '419760006',
    meshId: 'D016585',
    umlsCui: 'C0085166',
    quickView: {
      definicao: 'Desequilíbrio da microbiota vaginal com substituição de Lactobacillus por anaeróbios. Não é DST. Causa mais comum de corrimento.',
      criteriosDiagnosticos: ['Critérios de Amsel (3 de 4): corrimento acinzentado homogêneo, pH >4,5, teste das aminas positivo (odor de peixe), clue cells no exame a fresco'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar duchas vaginais', 'Não usar sabonetes íntimos'],
        farmacologico: ['Metronidazol 500mg VO 12/12h por 7 dias', 'OU Metronidazol gel 0,75% intravaginal 1x/dia por 5 dias', 'Gestante: Metronidazol 250mg 8/8h 7 dias']
      },
      redFlags: ['Gestante (risco de parto prematuro)', 'Sintomas persistentes pós-tratamento']
    },
    medicamentos: ['metronidazol'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'candidose-vulvovaginal',
    titulo: 'Candidíase Vulvovaginal',
    ciap2: ['X72'],
    cid10: ['B37.3'],
    categoria: 'ginecologico',
    doid: 'DOID:1304',
    snomedCT: '78048006',
    meshId: 'D002181',
    umlsCui: 'C0006840',
    quickView: {
      definicao: 'Infecção fúngica por Candida sp. (C. albicans 90%). Afeta 75% das mulheres. Não é DST.',
      criteriosDiagnosticos: ['Prurido vulvovaginal intenso', 'Corrimento branco grumoso (leite coalhado)', 'Hiperemia vulvar', 'Disúria e dispareunia'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Roupas íntimas de algodão', 'Evitar roupas apertadas', 'Manter área seca'],
        farmacologico: ['Fluconazol 150mg VO dose única', 'OU Clotrimazol creme vaginal 1% por 7 dias', 'Recorrente (≥4/ano): Fluconazol 150mg semanal por 6 meses']
      },
      redFlags: ['DM descompensado', 'Imunossupressão', 'Gravidez', 'Não resposta ao tratamento']
    },
    medicamentos: ['fluconazol'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'dismenorreia',
    titulo: 'Dismenorreia',
    ciap2: ['X02'],
    cid10: ['N94.4'],
    categoria: 'ginecologico',
    doid: 'DOID:1596',
    snomedCT: '266599000',
    meshId: 'D004412',
    umlsCui: 'C0013390',
    quickView: {
      definicao: 'Dor pélvica durante menstruação. Primária (sem patologia) ou secundária (endometriose, adenomiose, mioma).',
      criteriosDiagnosticos: ['Dor em cólica suprapúbica', 'Início com a menstruação (primária) ou antes (secundária)', 'Náuseas, diarreia, cefaleia associados', 'Primária: início 6-12 meses pós-menarca'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercício físico regular', 'Calor local (bolsa térmica)', 'TENS'],
        farmacologico: ['AINE: Ibuprofeno 400mg 6/6h iniciando 1 dia antes da menstruação', 'ACO combinado contínuo ou estendido', 'DIU de levonorgestrel (se contracepção desejada)']
      },
      redFlags: ['Início após os 25 anos', 'Progressão da dor', 'Dispareunia profunda', 'Não resposta a AINE + ACO']
    },
    medicamentos: ['ibuprofeno'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // OUTRAS CONDIÇÕES COMUNS
  // ============================================
  {
    id: 'hemorroidas',
    titulo: 'Doença Hemorroidária',
    ciap2: ['D95'],
    cid10: ['K64'],
    categoria: 'gastrointestinal',
    doid: 'DOID:9277',
    snomedCT: '70153002',
    meshId: 'D006484',
    umlsCui: 'C0019112',
    quickView: {
      definicao: 'Ingurgitamento dos plexos hemorroidários (internos ou externos). Muito comum. Piora com constipação e esforço evacuatório.',
      criteriosDiagnosticos: ['Sangramento vivo ao evacuar', 'Prolapso (graus I-IV)', 'Prurido anal', 'Dor se trombose'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta rica em fibras', 'Hidratação', 'Evitar esforço evacuatório', 'Banho de assento morno'],
        farmacologico: ['Sintomático: Pomada de lidocaína + corticoide tópico por 7 dias', 'Diosmina 450mg + Hesperidina 50mg 2x/dia', 'Laxativo se constipação']
      },
      redFlags: ['Sangramento persistente', 'Anemia', 'Mudança do hábito intestinal', 'Idade >50 anos sem colonoscopia']
    },
    medicamentos: ['lactulose'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'gota',
    titulo: 'Gota',
    ciap2: ['T92'],
    cid10: ['M10'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:13189',
    snomedCT: '90560007',
    meshId: 'D006073',
    umlsCui: 'C0018099',
    quickView: {
      definicao: 'Artrite inflamatória por depósito de cristais de urato monossódico. Ácido úrico >7mg/dL. Mais comum em homens.',
      criteriosDiagnosticos: ['Monoartrite aguda (1ª MTF = podagra é clássico)', 'Dor intensa de início súbito, pico em 12-24h', 'Eritema, edema, calor intenso', 'Hiperuricemia (mas pode ser normal na crise)'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso da articulação', 'Gelo local', 'Evitar álcool e dieta rica em purinas'],
        farmacologico: ['Crise: AINE (Indometacina 50mg 8/8h) ou Colchicina 0,5mg 3x/dia ou Prednisona 30-40mg/dia', 'Profilaxia: Alopurinol 100-300mg/dia (NÃO iniciar durante crise)']
      },
      redFlags: ['Artrite séptica (febre alta, único achado)', 'Insuficiência renal', 'Tofos extensos']
    },
    medicamentos: ['alopurinol', 'ibuprofeno'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'insonia',
    titulo: 'Insônia',
    ciap2: ['P06'],
    cid10: ['G47.0'],
    categoria: 'saude_mental',
    doid: 'DOID:193',
    snomedCT: '193462001',
    meshId: 'D007319',
    umlsCui: 'C0917801',
    quickView: {
      definicao: 'Dificuldade de iniciar/manter sono ou despertar precoce, com prejuízo diurno. Crônica se ≥3x/semana por ≥3 meses.',
      criteriosDiagnosticos: ['Dificuldade para dormir apesar de oportunidade adequada', 'Prejuízo diurno (fadiga, irritabilidade, concentração)', 'Excluir apneia do sono, RLS, outras causas'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['TCC-I (terapia cognitivo-comportamental para insônia)', 'Higiene do sono', 'Controle de estímulos', 'Restrição de tempo na cama'],
        farmacologico: ['Evitar benzodiazepínicos cronicamente', 'Curto prazo: Zolpidem 5-10mg ou Zopiclona', 'Se comorbidade: Trazodona 25-100mg ou Mirtazapina']
      },
      redFlags: ['Sonolência diurna excessiva (apneia)', 'Ronco intenso', 'Síndrome das pernas inquietas', 'Cataplexia']
    },
    medicamentos: [],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'tabagismo',
    titulo: 'Dependência de Nicotina (Tabagismo)',
    ciap2: ['P17'],
    cid10: ['F17'],
    categoria: 'saude_mental',
    doid: 'DOID:0050742',
    snomedCT: '89765005',
    meshId: 'D014029',
    umlsCui: 'C0040336',
    quickView: {
      definicao: 'Principal causa evitável de morte. 1 bilhão de fumantes no mundo. Cessação reduz mortalidade em qualquer idade.',
      criteriosDiagnosticos: ['Fagerström ≥6 = dependência alta', 'Uso diário apesar de conhecer riscos', 'Tentativas prévias de cessar sem sucesso', 'Sintomas de abstinência'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Abordagem breve (5 As)', 'Aconselhamento motivacional', 'Grupo de apoio', 'Linha telefônica (136)'],
        farmacologico: ['Primeira linha: Bupropiona 150mg 2x/dia por 7-12 semanas', 'OU Vareniclina 0,5mg → 1mg 2x/dia', 'TRN: adesivo + pastilha/goma conforme necessidade']
      },
      redFlags: ['Doença pulmonar ou cardíaca avançada', 'Gestação', 'Transtorno psiquiátrico grave']
    },
    medicamentos: ['bupropiona'],
    protocolos: [],
    calculadoras: ['fagerstrom']
  },

  // ============================================
  // CONDIÇÕES GASTROINTESTINAIS ADICIONAIS
  // ============================================
  {
    id: 'gastrite',
    titulo: 'Gastrite',
    ciap2: ['D84'],
    cid10: ['K29'],
    categoria: 'gastrointestinal',
    doid: 'DOID:3119',
    snomedCT: '396332003',
    meshId: 'D005756',
    umlsCui: 'C0017159',
    quickView: {
      definicao: 'Inflamação da mucosa gástrica. Aguda (H. pylori, AINEs, álcool, estresse) ou crônica. Helicobacter pylori presente em 70-80% dos casos.',
      criteriosDiagnosticos: ['Dor epigástrica', 'Sensação de plenitude', 'Náuseas', 'Endoscopia (padrão-ouro)', 'Teste de H. pylori'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar fatores agressores (AINEs, álcool, tabaco)', 'Dieta fracionada'],
        farmacologico: ['H. pylori+: Tratamento erradicador (Amoxicilina + Claritromicina + IBP por 14 dias)', 'Sem H. pylori: IBP se sintomático (Omeprazol 20-40mg/dia)']
      },
      redFlags: ['Hematêmese', 'Melena', 'Perda de peso', 'Anemia', 'Idade >55 anos com sintomas novos']
    },
    medicamentos: ['omeprazol', 'amoxicilina', 'claritromicina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'constipacao-intestinal',
    titulo: 'Constipação Intestinal',
    ciap2: ['D12'],
    cid10: ['K59.0'],
    categoria: 'gastrointestinal',
    doid: 'DOID:10533',
    snomedCT: '14760008',
    meshId: 'D003248',
    umlsCui: 'C0009806',
    quickView: {
      definicao: 'Defecação infrequente (<3x/semana) ou dificultosa por >3 meses. Constipação funcional (mais comum) vs orgânica.',
      criteriosDiagnosticos: ['<3 evacuações/semana', 'Esforço excessivo', 'Fezes endurecidas', 'Sensação de esvaziamento incompleto', 'Critérios Roma IV'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Aumento de fibras (25-30g/dia)', 'Hidratação adequada', 'Atividade física', 'Hábitos intestinais regulares'],
        farmacologico: ['Primeira linha: Laxante formador de bolo (Psyllium) ou osmótico (Lactulose 15-30ml/dia)', 'Se refratária: Polietilenoglicol ou laxante estimulante (senna)']
      },
      redFlags: ['Sintomas de alarme (sangramento, perda de peso, anemia)', 'Obstrução intestinal', 'Megacólon']
    },
    medicamentos: ['lactulose', 'psyllium'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'gastroenterite-aguda',
    titulo: 'Gastroenterite Aguda',
    ciap2: ['D70'],
    cid10: ['A09'],
    categoria: 'infecciosas',
    doid: 'DOID:3119',
    snomedCT: '235856003',
    meshId: 'D005759',
    umlsCui: 'C0017163',
    quickView: {
      definicao: 'Inflamação do trato gastrointestinal causada por vírus (rotavírus, norovírus), bactérias ou parasitas. Duração <2 semanas.',
      criteriosDiagnosticos: ['Diarreia aguda (<14 dias)', 'Vômitos', 'Náuseas', 'Cólicas abdominais', 'Febre pode estar presente'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação oral (SRO)', 'Dieta leve', 'Repouso'],
        farmacologico: ['ATB apenas se: cólera, shigelose, amebíase, ou fatores de risco', 'Antiemético se necessário: Ondansetrona (evitar em crianças <4 anos)']
      },
      redFlags: ['Desidratação severa', 'Sinais de choque', 'Sangue nas fezes', 'Idosos ou crianças pequenas']
    },
    medicamentos: ['soro-oral'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES RESPIRATÓRIAS ADICIONAIS
  // ============================================
  {
    id: 'faringite-aguda',
    titulo: 'Faringite Aguda',
    ciap2: ['R72'],
    cid10: ['J02'],
    categoria: 'respiratorio',
    doid: 'DOID:974',
    snomedCT: '363746003',
    meshId: 'D010612',
    umlsCui: 'C0031350',
    quickView: {
      definicao: 'Inflamação da faringe. Maioria viral (70-90%). Estreptocócica (GABHS) em 15-30% das crianças, 5-15% dos adultos.',
      criteriosDiagnosticos: ['Dor de garganta', 'Eritema faríngeo', 'Exsudato amigdaliano', 'Adenomegalia cervical', 'Critérios de Centor modificado'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Analgésicos (paracetamol/ibuprofeno)', 'Gargarejo com água morna e sal'],
        farmacologico: ['Viral: sintomático apenas', 'Bacteriana (GABHS): Penicilina V 250-500mg 6/6h por 10 dias OU Amoxicilina 500mg 8/8h']
      },
      redFlags: ['Trismo', 'Desvio de úvula', 'Estridor', 'Abscesso periamigdaliano']
    },
    medicamentos: ['amoxicilina', 'paracetamol', 'ibuprofeno'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'bronquite-aguda',
    titulo: 'Bronquite Aguda',
    ciap2: ['R78'],
    cid10: ['J20'],
    categoria: 'respiratorio',
    doid: 'DOID:6132',
    snomedCT: '32398004',
    meshId: 'D001991',
    umlsCui: 'C0006267',
    quickView: {
      definicao: 'Inflamação dos brônquios de duração <3 semanas. Geralmente viral (90%). Tosse pode persistir 2-3 semanas.',
      criteriosDiagnosticos: ['Tosse produtiva', 'Sem evidência de pneumonia', 'Duração <3 semanas', 'Sintomas respiratórios altos'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Hidratação', 'Repouso', 'Evitar irritantes'],
        farmacologico: ['Sintomático: antitussígenos se tosse seca perturbadora', 'Antibióticos NÃO indicados rotineiramente', 'Broncodilatador se sibilos (Salbutamol inalatório)']
      },
      redFlags: ['Tosse >3 semanas', 'Sinais de pneumonia', 'Hemoptise', 'Dispneia']
    },
    medicamentos: ['salbutamol'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES DERMATOLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'dermatite-contato',
    titulo: 'Dermatite de Contato',
    ciap2: ['S88'],
    cid10: ['L25'],
    categoria: 'dermatologico',
    doid: 'DOID:13360',
    snomedCT: '40275004',
    meshId: 'D017449',
    umlsCui: 'C0011606',
    quickView: {
      definicao: 'Erupção cutânea causada por contato direto com irritante ou alérgeno. Irritativa (80%) vs alérgica (20%).',
      criteriosDiagnosticos: ['Eritema localizado', 'Prurido', 'Vesículas/bolhas (alérgica)', 'História de exposição', 'Distribuição compatível'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Identificar e evitar agente causador', 'Compressas frias', 'Hidratação cutânea'],
        farmacologico: ['Corticoide tópico: Hidrocortisona 1% (face) ou Betametasona (corpo) 2x/dia até resolução', 'Antihistamínico oral se prurido intenso']
      },
      redFlags: ['Superinfecção', 'Eczema generalizado', 'Anafilaxia']
    },
    medicamentos: ['hidrocortisona', 'betametasona'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'urticaria',
    titulo: 'Urticária',
    ciap2: ['S97'],
    cid10: ['L50'],
    categoria: 'dermatologico',
    doid: 'DOID:6945',
    snomedCT: '42702005',
    meshId: 'D014581',
    umlsCui: 'C0020538',
    quickView: {
      definicao: 'Erupção cutânea caracterizada por pápulas/placas eritematosas pruriginosas transitórias (<24h). Aguda (<6 semanas) vs crônica.',
      criteriosDiagnosticos: ['Pápulas/placas eritematosas', 'Prurido intenso', 'Lesões evanescentes (<24h)', 'Angioedema pode estar presente'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Evitar desencadeantes identificados', 'Compressas frias'],
        farmacologico: ['Antihistamínico H1 não sedativo: Loratadina 10mg 1x/dia ou Cetirizina 10mg 1x/dia', 'Se refratária: aumentar dose ou adicionar outro antihistamínico']
      },
      redFlags: ['Angioedema de vias aéreas', 'Anafilaxia', 'Urticária crônica com angioedema']
    },
    medicamentos: ['loratadina', 'cetirizina'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES ENDÓCRINAS ADICIONAIS
  // ============================================
  {
    id: 'hipotireoidismo',
    titulo: 'Hipotireoidismo',
    ciap2: ['T86'],
    cid10: ['E03'],
    categoria: 'endocrino',
    doid: 'DOID:409',
    snomedCT: '40930008',
    meshId: 'D007037',
    umlsCui: 'C0020676',
    quickView: {
      definicao: 'Deficiência de hormônios tireoidianos. Primário (tireoidite de Hashimoto, pós-cirúrgico) mais comum que secundário.',
      criteriosDiagnosticos: ['TSH elevado', 'T4 livre baixo ou normal', 'Sintomas: fadiga, ganho de peso, intolerância ao frio, constipação'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Monitoramento periódico', 'Ajuste de dose conforme resposta'],
        farmacologico: ['Levotiroxina (T4 sintético): dose inicial 25-50μg/dia, ajustar até TSH normal', 'Dose de manutenção: 1,6-1,8μg/kg/dia']
      },
      redFlags: ['Mixedema (hipotireoidismo severo)', 'Coma mixedematoso', 'Angina instável']
    },
    medicamentos: ['levotiroxina'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'hipertireoidismo',
    titulo: 'Hipertireoidismo',
    ciap2: ['T85'],
    cid10: ['E05'],
    categoria: 'endocrino',
    doid: 'DOID:7998',
    snomedCT: '34486009',
    meshId: 'D006980',
    umlsCui: 'C0020550',
    quickView: {
      definicao: 'Excesso de hormônios tireoidianos. Doença de Graves (autoimune) é causa mais comum (70-80%).',
      criteriosDiagnosticos: ['TSH suprimido', 'T4 livre e/ou T3 elevados', 'Sintomas: taquicardia, perda de peso, ansiedade, tremores'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso', 'Evitar estresse', 'Bloqueador beta para sintomas'],
        farmacologico: ['Metimazol 10-40mg/dia (primeira linha) OU Propiltiouracil se gestação/amamentação', 'Bloqueador beta: Propranolol para sintomas adrenérgicos']
      },
      redFlags: ['Crise tireotóxica', 'Fibrilação atrial', 'Insuficiência cardíaca']
    },
    medicamentos: ['metimazol', 'propranolol'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES MUSCULOESQUELÉTICAS ADICIONAIS
  // ============================================
  {
    id: 'tendinite',
    titulo: 'Tendinite',
    ciap2: ['L92'],
    cid10: ['M65'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:13361',
    snomedCT: '42475007',
    meshId: 'D052256',
    umlsCui: 'C0039482',
    quickView: {
      definicao: 'Inflamação do tendão. Frequentemente por uso excessivo ou trauma. Ombro, cotovelo, punho são locais comuns.',
      criteriosDiagnosticos: ['Dor localizada no tendão', 'Dor agravada por movimento', 'Edema local', 'Limitação funcional'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Repouso relativo', 'Gelo nas primeiras 48-72h', 'Fisioterapia', 'Alongamentos'],
        farmacologico: ['AINEs: Ibuprofeno 400-600mg 8/8h por 5-7 dias', 'Injeção local de corticoide se refratária']
      },
      redFlags: ['Ruptura tendão', 'Infecção', 'Tendinite de repetição']
    },
    medicamentos: ['ibuprofeno'],
    protocolos: [],
    calculadoras: []
  },
  {
    id: 'osteoartrite',
    titulo: 'Osteoartrite (Artrose)',
    ciap2: ['L91'],
    cid10: ['M15', 'M19'],
    categoria: 'musculoesqueletico',
    doid: 'DOID:8398',
    snomedCT: '396275006',
    meshId: 'D010003',
    umlsCui: 'C0029408',
    quickView: {
      definicao: 'Doença degenerativa das articulações. Mais comum em idosos. Joelhos, quadris, mãos são mais afetados.',
      criteriosDiagnosticos: ['Dor articular piora com atividade', 'Rigidez matinal <30min', 'Crepitação', 'Radiografia: estreitamento de espaço, osteófitos'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Exercícios (fortalecimento, alongamento)', 'Perda de peso se obeso', 'Fisioterapia', 'Órteses se necessário'],
        farmacologico: ['Paracetamol 1g 6/6h (primeira linha)', 'Se insuficiente: AINEs tópicos ou orais', 'Injeção intra-articular de corticoide se necessário']
      },
      redFlags: ['Infecção articular', 'Fratura', 'Artropatia inflamatória']
    },
    medicamentos: ['paracetamol', 'ibuprofeno'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES HEMATOLÓGICAS
  // ============================================
  {
    id: 'anemia-ferropriva',
    titulo: 'Anemia Ferropriva',
    ciap2: ['B82'],
    cid10: ['D50'],
    categoria: 'hematologico',
    doid: 'DOID:2355',
    snomedCT: '266331005',
    meshId: 'D000748',
    umlsCui: 'C0002871',
    quickView: {
      definicao: 'Anemia por deficiência de ferro, causa mais comum de anemia. Mulheres em idade fértil, gestantes, crianças são grupos de risco.',
      criteriosDiagnosticos: ['Hemoglobina baixa', 'Ferritina baixa', 'Ferro sérico baixo', 'TIBC elevada', 'Sintomas: fadiga, palidez, taquicardia'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Dieta rica em ferro (carnes, folhosos)', 'Identificar e tratar causa (sangramento, deficiência nutricional)'],
        farmacologico: ['Sulfato ferroso 200mg (65mg de ferro elementar) 1-2x/dia em jejum', 'Vitamina C aumenta absorção', 'Duração: 3-6 meses até repor estoques']
      },
      redFlags: ['Sangramento ativo', 'Anemia severa sintomática', 'Refratária ao tratamento']
    },
    medicamentos: ['sulfato-ferroso'],
    protocolos: [],
    calculadoras: []
  },

  // ============================================
  // CONDIÇÕES OTORRINOLARINGOLÓGICAS ADICIONAIS
  // ============================================
  {
    id: 'otite-media-aguda',
    titulo: 'Otite Média Aguda',
    ciap2: ['H71'],
    cid10: ['H66'],
    categoria: 'respiratorio',
    doid: 'DOID:10723',
    snomedCT: '193462001',
    meshId: 'D010033',
    umlsCui: 'C0029881',
    quickView: {
      definicao: 'Infecção do ouvido médio. Comum em crianças. Vírus ou bactérias (S. pneumoniae, H. influenzae).',
      criteriosDiagnosticos: ['Abaulamento da membrana timpânica (mais específico)', 'Hiperemia timpânica', 'Otalgia', 'Febre pode estar presente'],
      tratamentoPrimeiraLinha: {
        naoFarmacologico: ['Analgésico: Paracetamol ou Ibuprofeno', 'Observação pode ser opção em casos selecionados'],
        farmacologico: ['<2 anos ou sintomas severos: Amoxicilina 80-90mg/kg/dia 12/12h por 10 dias', '≥2 anos, sintomas leves: pode observar 48-72h']
      },
      redFlags: ['Mastoidite', 'Paralisia facial', 'Abscesso', 'Complicações intracranianas']
    },
    medicamentos: ['amoxicilina', 'paracetamol'],
    protocolos: [],
    calculadoras: []
  },
];

