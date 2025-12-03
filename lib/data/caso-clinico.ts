// ============================================
// CASO CLÍNICO INTEGRADO - FAMÍLIA SILVA
// Rastreamentos Populacionais no SUS
// ============================================

export interface FamilyMember {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'unknown';
  age: number;
  birthYear?: number;
  conditions: string[];
  isIndex?: boolean;
  isDeceased?: boolean;
  occupation?: string;
  education?: string;
}

export interface Relationship {
  from: string;
  to: string;
  type: 'marriage' | 'divorced' | 'separated' | 'cohabitation' | 'parent-child' | 'sibling';
}

export interface EcomapConnection {
  entity: string;
  type: 'strong' | 'moderate' | 'weak' | 'stressful';
  members: string[];
  description?: string;
}

export interface CaseStep {
  id: number;
  memberId: string;
  title: string;
  subtitle: string;
  history: string;
  physicalExam?: string;
  question: string;
  screenings: {
    id: string;
    name: string;
    status: 'indicated' | 'not-indicated' | 'discuss';
    susRecommendation: string;
    societiesRecommendation?: string;
    convergence: 'convergencia' | 'parcial' | 'divergencia';
    explanation: string;
  }[];
}

// ============================================
// MEMBROS DA FAMÍLIA SILVA
// ============================================

export const familyMembers: FamilyMember[] = [
  // 1ª Geração - Avós
  {
    id: 'jose',
    name: 'José Silva',
    gender: 'male',
    age: 70,
    birthYear: 1954,
    conditions: ['HAS', 'DM2', 'Dislipidemia'],
    occupation: 'Aposentado (ex-pedreiro)',
    education: 'Fundamental incompleto'
  },
  {
    id: 'maria',
    name: 'Maria Silva',
    gender: 'female',
    age: 68,
    birthYear: 1956,
    conditions: ['HAS', 'Sobrepeso'],
    occupation: 'Aposentada (ex-costureira)',
    education: 'Fundamental completo'
  },

  // 2ª Geração - Filhos/Tios
  {
    id: 'pedro',
    name: 'Pedro Silva',
    gender: 'male',
    age: 58,
    birthYear: 1966,
    conditions: ['Obesidade grau I', 'HAS não diagnosticada', 'Sedentarismo'],
    occupation: 'Motorista de ônibus',
    education: 'Médio completo'
  },
  {
    id: 'lucia',
    name: 'Lúcia Silva',
    gender: 'female',
    age: 55,
    birthYear: 1969,
    conditions: [],
    isDeceased: true,
    occupation: 'Professora',
    education: 'Superior completo'
  },
  {
    id: 'carlos',
    name: 'Carlos (marido de Ana)',
    gender: 'male',
    age: 35,
    birthYear: 1989,
    conditions: [],
    occupation: 'Técnico em informática',
    education: 'Superior incompleto'
  },

  // 3ª Geração - Netos
  {
    id: 'ana',
    name: 'Ana Silva',
    gender: 'female',
    age: 32,
    birthYear: 1992,
    conditions: ['Gestante 28 semanas', 'G2P1A0'],
    isIndex: true,
    occupation: 'Auxiliar administrativa',
    education: 'Superior completo'
  },
  {
    id: 'lucas',
    name: 'Lucas Silva',
    gender: 'male',
    age: 2,
    birthYear: 2022,
    conditions: ['Atraso na fala', 'Pouco contato visual'],
    occupation: 'Creche',
    education: 'Não se aplica'
  },
  {
    id: 'bebe',
    name: 'Bebê (gestação)',
    gender: 'unknown',
    age: 0,
    conditions: ['Gestação 28 semanas'],
  },
];

// ============================================
// RELACIONAMENTOS FAMILIARES
// ============================================

export const relationships: Relationship[] = [
  // Casamentos
  { from: 'jose', to: 'maria', type: 'marriage' },
  { from: 'carlos', to: 'ana', type: 'marriage' },

  // Filhos de José e Maria
  { from: 'jose', to: 'pedro', type: 'parent-child' },
  { from: 'maria', to: 'pedro', type: 'parent-child' },
  { from: 'jose', to: 'lucia', type: 'parent-child' },
  { from: 'maria', to: 'lucia', type: 'parent-child' },

  // Ana é filha de Lúcia (falecida)
  { from: 'lucia', to: 'ana', type: 'parent-child' },

  // Filhos de Ana e Carlos
  { from: 'ana', to: 'lucas', type: 'parent-child' },
  { from: 'carlos', to: 'lucas', type: 'parent-child' },
  { from: 'ana', to: 'bebe', type: 'parent-child' },
  { from: 'carlos', to: 'bebe', type: 'parent-child' },
];

// ============================================
// ECOMAPA - CONEXÕES COM O MEIO
// ============================================

export const ecomapConnections: EcomapConnection[] = [
  {
    entity: 'UBS Santa Maria',
    type: 'strong',
    members: ['maria', 'ana', 'lucas'],
    description: 'Acompanhamento regular, pré-natal, puericultura'
  },
  {
    entity: 'Igreja Católica',
    type: 'strong',
    members: ['maria', 'jose'],
    description: 'Participação semanal, rede de apoio social'
  },
  {
    entity: 'Creche Municipal',
    type: 'strong',
    members: ['lucas'],
    description: 'Frequenta período integral, professoras atentas ao desenvolvimento'
  },
  {
    entity: 'Trabalho - Empresa de Ônibus',
    type: 'weak',
    members: ['pedro'],
    description: 'Jornada extensa, pouco tempo para saúde'
  },
  {
    entity: 'Família Extensa',
    type: 'moderate',
    members: ['maria', 'jose', 'ana'],
    description: 'Irmãos de José moram em outro estado'
  },
  {
    entity: 'Vizinhança',
    type: 'weak',
    members: ['maria', 'jose'],
    description: 'Conhecidos, pouca interação profunda'
  },
  {
    entity: 'CRAS',
    type: 'stressful',
    members: ['ana'],
    description: 'Tentativa frustrada de auxílio para Lucas'
  },
  {
    entity: 'Escola (futuro)',
    type: 'moderate',
    members: ['lucas'],
    description: 'Preocupação com adaptação devido ao atraso'
  },
];

// ============================================
// PASSOS DO CASO CLÍNICO
// ============================================

export const caseSteps: CaseStep[] = [
  // PASSO 1: DONA MARIA (68 anos) - Câncer de Mama e Colo de Útero
  {
    id: 1,
    memberId: 'maria',
    title: 'Dona Maria',
    subtitle: '68 anos • Aposentada • HAS controlada',
    history: `Maria, 68 anos, comparece à UBS para renovar receita de losartana 50mg. Hipertensa há 15 anos, bem controlada com medicação. Nega diabetes, dislipidemia tratada com sinvastatina. Menopausa aos 52 anos, sem TRH.

Ao revisar o prontuário, você nota:
• Última mamografia: há 4 anos (BI-RADS 2)
• Último citopatológico: há 7 anos (NILM)
• Último exame de sangue: há 8 meses (glicemia 98, colesterol total 210)

Maria pergunta: "Doutor(a), preciso fazer mais algum exame? Estou me sentindo bem."`,
    physicalExam: 'PA: 138/88 mmHg • FC: 72 bpm • IMC: 27,4 kg/m² • Mamas: sem nódulos palpáveis • Abdome: sem alterações',
    question: 'Quais rastreamentos estão indicados para Dona Maria neste momento?',
    screenings: [
      {
        id: 'cancer-mama',
        name: 'Câncer de Mama (Mamografia)',
        status: 'indicated',
        susRecommendation: '50-69 anos: mamografia bienal. 70-74 anos: decisão compartilhada',
        societiesRecommendation: 'SBM/CBR/FEBRASGO: 40+ anos, anual',
        convergence: 'parcial',
        explanation: 'Maria tem 68 anos, dentro da faixa prioritária do SUS. Última mamografia há 4 anos - ATRASADA. Solicitar mamografia bilateral.'
      },
      {
        id: 'cancer-colo-utero',
        name: 'Câncer de Colo de Útero (Citopatológico)',
        status: 'discuss',
        susRecommendation: '25-64 anos: citologia trienal (após 2 normais). >64 anos com 2 normais consecutivos nos últimos 5 anos: interromper',
        societiesRecommendation: 'FEBRASGO: individualizar após 65 anos',
        convergence: 'convergencia',
        explanation: 'Maria tem 68 anos e último exame há 7 anos. Verificar se teve 2 exames normais consecutivos antes de interromper. Caso negativo, realizar mais um citopatológico.'
      },
      {
        id: 'dislipidemia',
        name: 'Dislipidemia (Perfil Lipídico)',
        status: 'indicated',
        susRecommendation: 'Pacientes em uso de estatina: monitorar anualmente',
        convergence: 'convergencia',
        explanation: 'Maria usa sinvastatina. Último perfil há 8 meses com CT 210. Considerar repetir para avaliar controle.'
      },
    ]
  },

  // PASSO 2: ANA (32 anos, grávida) - Pré-natal
  {
    id: 2,
    memberId: 'ana',
    title: 'Ana Silva',
    subtitle: '32 anos • Gestante 28 semanas • G2P1A0',
    history: `Ana, 32 anos, neta de Maria, está grávida de 28 semanas. G2P1A0, primeiro filho (Lucas, 2 anos) nasceu de parto normal a termo. Vem à UBS para consulta de pré-natal.

Cartão de pré-natal mostra:
• 1º trimestre: tipagem (O+), Coombs indireto negativo, VDRL NR, anti-HIV NR, HBsAg NR, toxoplasmose IgG+ IgM-, glicemia jejum 82 mg/dL
• 2º trimestre: VDRL NR (24 sem), TOTG 75g realizado às 26 sem (jejum 88, 1h 156, 2h 124)

Ana pergunta: "Está tudo bem com meus exames? O que mais preciso fazer?"`,
    physicalExam: 'PA: 110/70 mmHg • Peso: 68 kg (ganho 8 kg) • AU: 27 cm • BCF: 140 bpm • Edema: ausente • Mov. fetais: presentes',
    question: 'Quais rastreamentos do 3º trimestre devem ser solicitados para Ana?',
    screenings: [
      {
        id: 'sifilis-gestacao',
        name: 'Sífilis (VDRL)',
        status: 'indicated',
        susRecommendation: 'VDRL na 1ª consulta, 3º trimestre (28-32 sem) e no parto',
        convergence: 'convergencia',
        explanation: 'Ana está com 28 semanas, momento de repetir VDRL do 3º trimestre. Último exame às 24 semanas estava NR.'
      },
      {
        id: 'hiv-gestacao',
        name: 'HIV (anti-HIV)',
        status: 'indicated',
        susRecommendation: 'Teste rápido ou sorologia na 1ª consulta e no 3º trimestre',
        convergence: 'convergencia',
        explanation: 'Repetir sorologia HIV no 3º trimestre, especialmente se parceiro não testado.'
      },
      {
        id: 'hepatite-b',
        name: 'Hepatite B (HBsAg)',
        status: 'discuss',
        susRecommendation: 'HBsAg na 1ª consulta; repetir no 3º tri se comportamento de risco',
        convergence: 'convergencia',
        explanation: 'Ana fez HBsAg no 1º trimestre (NR). Repetir apenas se fatores de risco identificados.'
      },
      {
        id: 'gbs',
        name: 'Streptococcus Grupo B (GBS)',
        status: 'indicated',
        susRecommendation: 'Swab vaginal/retal entre 35-37 semanas',
        societiesRecommendation: 'FEBRASGO: rastreamento universal 35-37 sem',
        convergence: 'convergencia',
        explanation: 'Agendar coleta de GBS para 35-37 semanas. Importante para profilaxia intraparto.'
      },
      {
        id: 'diabetes-gestacional',
        name: 'Diabetes Gestacional',
        status: 'not-indicated',
        susRecommendation: 'TOTG 75g entre 24-28 semanas',
        convergence: 'convergencia',
        explanation: 'TOTG já realizado às 26 semanas com resultado NORMAL (jejum <92, 1h <180, 2h <153). Não repetir.'
      },
    ]
  },

  // PASSO 3: BEBÊ (recém-nascido) - Triagem Neonatal
  {
    id: 3,
    memberId: 'bebe',
    title: 'Bebê de Ana',
    subtitle: 'Recém-nascido • 38 semanas • PN 3.200g',
    history: `O bebê de Ana nasceu! Parto normal, 38 semanas, Apgar 9/10, peso 3.200g, comprimento 49 cm, PC 34 cm. Alta da maternidade no 2º dia de vida.

Na primeira consulta de puericultura (5º dia de vida), a mãe traz o cartão da criança com os seguintes registros:
• Teste do Pezinho: colhido no 3º dia ✓
• Teste da Orelhinha: PASSOU bilateral ✓
• Teste do Olhinho: reflexo vermelho presente bilateral ✓
• Teste do Coraçãozinho: oximetria MSD 98%, MID 97% ✓

Ana pergunta: "O bebê fez todos os testes? Precisa de mais alguma coisa?"`,
    physicalExam: 'Ativo, corado, hidratado • Fontanelas normotensas • Reflexos primitivos presentes • Coto umbilical em mumificação • Ausculta cardíaca e pulmonar sem alterações',
    question: 'Quais testes de triagem neonatal são obrigatórios e qual o significado dos resultados?',
    screenings: [
      {
        id: 'teste-pezinho',
        name: 'Teste do Pezinho (PNTN)',
        status: 'indicated',
        susRecommendation: 'Coleta entre 3º-5º dia de vida. PNTN ampliado: 6→50+ doenças (2024)',
        societiesRecommendation: 'SBP: coleta ideal 3º-5º dia',
        convergence: 'convergencia',
        explanation: 'Colhido no 3º dia ✓. Resultado em 10-15 dias. Rastreia: hipotireoidismo, fenilcetonúria, fibrose cística, anemia falciforme, hiperplasia adrenal, deficiência de biotinidase + novas doenças do PNTN ampliado.'
      },
      {
        id: 'teste-orelhinha',
        name: 'Teste da Orelhinha (EOA)',
        status: 'indicated',
        susRecommendation: 'Emissões otoacústicas antes da alta ou até 30 dias de vida',
        convergence: 'convergencia',
        explanation: 'Realizado e PASSOU bilateral ✓. Se falhasse, repetir em 15 dias e, se persistir, encaminhar para BERA.'
      },
      {
        id: 'teste-olhinho',
        name: 'Teste do Olhinho (Reflexo Vermelho)',
        status: 'indicated',
        susRecommendation: 'Teste do reflexo vermelho antes da alta ou na 1ª semana',
        convergence: 'convergencia',
        explanation: 'Reflexo vermelho presente bilateral ✓. Afasta catarata congênita, retinoblastoma, glaucoma. Repetir em todas as consultas de puericultura.'
      },
      {
        id: 'teste-coracaozinho',
        name: 'Teste do Coraçãozinho (Oximetria)',
        status: 'indicated',
        susRecommendation: 'Oximetria de pulso em MSD e MI entre 24-48h de vida',
        convergence: 'convergencia',
        explanation: 'SpO2 MSD 98%, MID 97% (diferença <3%) ✓ NORMAL. Afasta cardiopatias congênitas críticas com fluxo dependente de canal arterial.'
      },
      {
        id: 'teste-linguinha',
        name: 'Teste da Linguinha (Lei 13.002/2014)',
        status: 'discuss',
        susRecommendation: 'Avaliação do frênulo lingual - Lei Federal obriga, mas evidência controversa',
        societiesRecommendation: 'SBP: não recomenda rastreamento universal',
        convergence: 'divergencia',
        explanation: 'Lei Federal obriga, mas sociedades médicas questionam evidência. Avaliar individualmente se dificuldade de amamentação.'
      },
    ]
  },

  // PASSO 4: LUCAS (2 anos) - Desenvolvimento/TEA
  {
    id: 4,
    memberId: 'lucas',
    title: 'Lucas Silva',
    subtitle: '2 anos • Atraso na fala • Pouco contato visual',
    history: `Lucas, 2 anos, é o primeiro filho de Ana. Ela traz preocupações:

"Doutor(a), o Lucas quase não fala. Só diz 'mama' e 'papa'. Na creche, as professoras disseram que ele não brinca com as outras crianças e fica muito tempo rodando as rodinhas dos carrinhos. Quando chamo pelo nome, às vezes ele nem olha. Minha sogra diz que é normal, que menino demora mais pra falar. Mas eu estou preocupada."

Marcos do desenvolvimento (informado pela mãe):
• Sentou sem apoio: 7 meses ✓
• Andou: 14 meses ✓
• Primeiras palavras: 18 meses ("mama")
• Vocabulário atual: ~5 palavras (abaixo do esperado)
• Não aponta para mostrar coisas
• Não olha quando chamam pelo nome (às vezes)
• Brincadeiras repetitivas`,
    physicalExam: 'Desenvolvimento motor: adequado • Audição: aparentemente normal (responde a sons) • Pouco contato visual durante consulta • Não responde consistentemente ao nome • Estereotipias: movimentos de mãos quando excitado',
    question: 'Qual instrumento de rastreamento deve ser aplicado e quais os próximos passos?',
    screenings: [
      {
        id: 'tea-mchat',
        name: 'Rastreamento de TEA (M-CHAT-R/F)',
        status: 'indicated',
        susRecommendation: 'M-CHAT-R aos 18 e 24 meses; atenção a sinais de alerta em qualquer idade',
        societiesRecommendation: 'SBP/ABN: rastreamento universal com M-CHAT-R aos 18-24 meses',
        convergence: 'convergencia',
        explanation: 'Lucas tem 2 anos com sinais de alerta (atraso fala, pouco contato visual, brincadeiras repetitivas, não aponta). Aplicar M-CHAT-R/F AGORA. Se positivo, encaminhar para avaliação especializada.'
      },
      {
        id: 'denver',
        name: 'Avaliação do Desenvolvimento (Denver II ou SWYC)',
        status: 'indicated',
        susRecommendation: 'Vigilância do desenvolvimento em todas as consultas de puericultura',
        convergence: 'convergencia',
        explanation: 'Aplicar Denver II ou similar para avaliação global. Lucas apresenta atraso na linguagem e socialização com motor adequado.'
      },
      {
        id: 'audiometria',
        name: 'Avaliação Auditiva',
        status: 'indicated',
        susRecommendation: 'Descartar hipoacusia em toda criança com atraso de linguagem',
        convergence: 'convergencia',
        explanation: 'Mesmo com teste da orelhinha normal ao nascimento, solicitar avaliação auditiva para descartar perda auditiva adquirida.'
      },
    ]
  },

  // PASSO 5: PEDRO (58 anos) - DCNTs
  {
    id: 5,
    memberId: 'pedro',
    title: 'Pedro Silva',
    subtitle: '58 anos • Motorista • Obesidade • "Nunca fez exames"',
    history: `Pedro, 58 anos, tio de Ana e filho de José e Maria. Motorista de ônibus há 25 anos. Veio "forçado" pela esposa após ouvir que o pai José tem diabetes.

"Doutor(a), eu não tenho nada. Trabalho direto, nunca parei. Mas minha mulher insiste que eu faço uns exames porque meu pai tem diabetes e pressão alta. Só tenho um pouco de barriga, mas é normal na idade, né?"

Você nota que Pedro nunca fez exames de rotina. Não sabe informar se tem PA alta, glicemia alterada ou colesterol alto. Sedentário ("não tenho tempo"), alimentação irregular no trabalho (come em lanchonete de estrada), ronca muito (relato da esposa).`,
    physicalExam: 'PA: 152/96 mmHg (confirmada em 2 medidas) • FC: 82 bpm • Peso: 98 kg • Altura: 1,72 m • IMC: 33,1 kg/m² (Obesidade grau I) • CA: 108 cm • Sem alterações ao exame segmentar',
    question: 'Quais rastreamentos estão indicados para Pedro?',
    screenings: [
      {
        id: 'has',
        name: 'Hipertensão Arterial',
        status: 'indicated',
        susRecommendation: 'Rastrear adultos ≥18 anos a cada 2 anos; anualmente se PA 130-139/85-89',
        convergence: 'convergencia',
        explanation: 'PA 152/96 mmHg = HAS PROVÁVEL. Confirmar com MAPA/MRPA ou 2 medidas em dias diferentes. Pedro provavelmente já é hipertenso não diagnosticado.'
      },
      {
        id: 'dm2',
        name: 'Diabetes Mellitus Tipo 2',
        status: 'indicated',
        susRecommendation: 'Rastrear adultos 35-70 anos com sobrepeso/obesidade; considerar se HF+',
        societiesRecommendation: 'SBD: ≥45 anos OU qualquer idade com fatores de risco',
        convergence: 'convergencia',
        explanation: 'Pedro: 58 anos, obeso (IMC 33), pai diabético, sedentário. Múltiplos fatores de risco. Solicitar glicemia de jejum ou HbA1c.'
      },
      {
        id: 'dislipidemia-rastreamento',
        name: 'Dislipidemia',
        status: 'indicated',
        susRecommendation: 'Homens ≥35 anos com fatores de risco; perfil lipídico a cada 5 anos',
        convergence: 'convergencia',
        explanation: 'Pedro: 58 anos, obeso, provável HAS, pai com DM. Solicitar perfil lipídico completo.'
      },
      {
        id: 'cancer-colorretal',
        name: 'Câncer Colorretal',
        status: 'discuss',
        susRecommendation: 'NÃO incorporado no SUS para rastreamento populacional (CONITEC em análise)',
        societiesRecommendation: 'SBCP/INCA: PSOF anual ou colonoscopia cada 10 anos a partir de 45-50 anos',
        convergence: 'divergencia',
        explanation: 'Pedro: 58 anos. Sociedades recomendam rastreamento. SUS não incorporou ainda. Discutir com paciente: PSOF anual se disponível, ou colonoscopia particular.'
      },
      {
        id: 'saos',
        name: 'Apneia do Sono (SAOS)',
        status: 'discuss',
        susRecommendation: 'Não há rastreamento populacional; investigar se sintomas',
        convergence: 'convergencia',
        explanation: 'Pedro: obeso, ronca muito (relato da esposa), motorista profissional. Alto risco de SAOS. Aplicar STOP-BANG e considerar polissonografia.'
      },
    ]
  },

  // PASSO 6: SEU JOSÉ (70 anos) - Próstata
  {
    id: 6,
    memberId: 'jose',
    title: 'Seu José',
    subtitle: '70 anos • Aposentado • HAS + DM2 + "Novembro Azul"',
    history: `José, 70 anos, marido de Maria, veio à consulta após ver campanha do Novembro Azul na TV.

"Doutor(a), eu quero fazer o exame da próstata. Vi na TV que todo homem depois dos 50 tem que fazer PSA e toque. Meu vizinho descobriu câncer pelo PSA e se curou. Não quero morrer de câncer."

José é acompanhado há anos na UBS por HAS (em uso de losartana + anlodipino) e DM2 (metformina 850mg 2x/dia). Exames de 3 meses atrás: HbA1c 7,2%, creatinina 1,1 mg/dL. Sem sintomas urinários obstrutivos (IPSS baixo), sem hematúria, sem emagrecimento.

Ele insiste: "Doutor(a), eu QUERO o exame. É meu direito!"`,
    physicalExam: 'PA: 134/82 mmHg • Toque retal (se realizado): próstata de volume aumentado (~40g), fibroelástica, sem nódulos, sulco mediano preservado',
    question: 'Você deve solicitar PSA para Seu José? Como conduzir essa situação?',
    screenings: [
      {
        id: 'cancer-prostata',
        name: 'Câncer de Próstata (PSA + Toque)',
        status: 'discuss',
        susRecommendation: 'INCA/MS NÃO recomendam rastreamento populacional com PSA. Nota Técnica 2023: informar riscos e benefícios, decisão compartilhada se paciente insistir.',
        societiesRecommendation: 'SBU: ofertar decisão compartilhada a partir de 50 anos (45 se negro ou HF+)',
        convergence: 'divergencia',
        explanation: `POLÊMICA CENTRAL:

• INCA/MS: PSA causa mais danos que benefícios populacionalmente. NNS = 1.410 homens/9 anos para evitar 1 morte. Sobrediagnóstico 40-50%, biópsias com complicações, tratamentos com impotência/incontinência.

• SBU: "Decisão compartilhada" - informar e deixar paciente decidir.

• Situação de José: 70 anos, assintomático, expectativa de vida ~15 anos. Se PSA alterado → cascata: biópsia → possível diagnóstico → possível tratamento com efeitos adversos.

CONDUTA SUGERIDA:
1. Explicar riscos e benefícios com calma
2. Usar material educativo se disponível
3. Se José mantiver desejo após esclarecimento → respeitar autonomia
4. Registrar decisão compartilhada no prontuário`
      },
    ]
  },
];

// ============================================
// AUTORES DO CASO
// ============================================

export const caseAuthors = [
  'Claudia Rosolen',
  'Demetrios C. Agourakis',
  'Laura C. Lopes',
  'Virginia Corrêa',
];

export const caseMetadata = {
  title: 'Caso Clínico Integrado',
  subtitle: 'Rastreamentos Populacionais no SUS',
  institution: 'Medicina de Família e Comunidade',
  year: 2025,
};
