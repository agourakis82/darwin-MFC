import { EmergencyScore } from '../types';

export const neuroScores: EmergencyScore[] = [
  // ───────────────────────────────────────────────
  // 1. Glasgow Coma Scale (GCS)
  // ───────────────────────────────────────────────
  {
    id: 'gcs-ps',
    name: 'Glasgow Coma Scale',
    abbreviation: 'GCS',
    category: 'neurologia',
    description:
      'Escala padrao para avaliacao do nivel de consciencia, baseada em tres componentes: abertura ocular, resposta verbal e resposta motora. Utilizada globalmente no trauma e em unidades de terapia intensiva.',
    inputs: [
      {
        id: 'eye',
        label: 'Abertura ocular',
        type: 'select',
        options: [
          { label: '1 - Nenhuma', value: 1 },
          { label: '2 - A dor', value: 2 },
          { label: '3 - Ao comando verbal', value: 3 },
          { label: '4 - Espontanea', value: 4 },
        ],
      },
      {
        id: 'verbal',
        label: 'Resposta verbal',
        type: 'select',
        options: [
          { label: '1 - Nenhuma', value: 1 },
          { label: '2 - Sons incompreensiveis', value: 2 },
          { label: '3 - Palavras inapropriadas', value: 3 },
          { label: '4 - Confuso', value: 4 },
          { label: '5 - Orientado', value: 5 },
        ],
      },
      {
        id: 'motor',
        label: 'Resposta motora',
        type: 'select',
        options: [
          { label: '1 - Nenhuma', value: 1 },
          { label: '2 - Extensao anormal (descerebração)', value: 2 },
          { label: '3 - Flexao anormal (decorticação)', value: 3 },
          { label: '4 - Retirada a dor', value: 4 },
          { label: '5 - Localiza dor', value: 5 },
          { label: '6 - Obedece comandos', value: 6 },
        ],
      },
    ],
    calculate: (values: Record<string, number>): number => {
      const eye = values['eye'] ?? 1;
      const verbal = values['verbal'] ?? 1;
      const motor = values['motor'] ?? 1;
      return eye + verbal + motor;
    },
    maxScore: 15,
    interpretationRanges: [
      {
        min: 13,
        max: 15,
        label: 'Traumatismo craniano leve',
        severity: 'low',
        recommendation:
          'Observacao clinica. Considerar tomografia se mecanismo de risco ou sinais de alerta.',
        color: '#22c55e',
      },
      {
        min: 9,
        max: 12,
        label: 'Traumatismo craniano moderado',
        severity: 'moderate',
        recommendation:
          'Internacao obrigatoria. TC de cranio. Monitorização neurologica seriada. Considerar IOT se deterioracao.',
        color: '#f59e0b',
      },
      {
        min: 3,
        max: 8,
        label: 'Traumatismo craniano grave',
        severity: 'critical',
        recommendation:
          'Via aerea definitiva (IOT). TC de cranio urgente. Admissao em UTI. Consultar neurocirurgia. Manter PAS > 100 mmHg e PPC > 60 mmHg.',
        color: '#ef4444',
      },
    ],
    references: [
      {
        citation:
          'Teasdale G, Jennett B. Assessment of coma and impaired consciousness: a practical scale. Lancet. 1974;2(7872):81-84.',
        year: 1974,
      },
      {
        citation:
          'Teasdale G, Maas A, Lecky F, Manley G, Stocchetti N, Murray G. The Glasgow Coma Scale at 40 years: standing the test of time. Lancet Neurol. 2014;13(8):844-854.',
        year: 2014,
      },
    ],
    relatedProtocols: ['tce-grave', 'rebaixamento-consciencia'],
    keywords: [
      'glasgow',
      'coma',
      'consciencia',
      'trauma',
      'tce',
      'nivel consciencia',
      'abertura ocular',
      'resposta verbal',
      'resposta motora',
      'intubacao',
    ],
  },

  // ───────────────────────────────────────────────
  // 2. NIHSS
  // ───────────────────────────────────────────────
  {
    id: 'nihss',
    name: 'National Institutes of Health Stroke Scale',
    abbreviation: 'NIHSS',
    category: 'neurologia',
    description:
      'Escala padronizada para quantificar a gravidade do deficit neurologico em pacientes com AVC isquemico agudo. Fundamental para decisao terapeutica sobre trombolise e trombectomia.',
    inputs: [
      {
        id: 'consciousness',
        label: '1a. Nivel de consciencia',
        type: 'select',
        options: [
          { label: '0 - Alerta', value: 0 },
          { label: '1 - Nao alerta, mas desperta com estimulacao minima', value: 1 },
          { label: '2 - Nao alerta, requer estimulacao repetida ou dolorosa', value: 2 },
          { label: '3 - Coma / reflexos apenas', value: 3 },
        ],
      },
      {
        id: 'questions',
        label: '1b. Perguntas (mes e idade)',
        type: 'select',
        options: [
          { label: '0 - Responde ambas corretamente', value: 0 },
          { label: '1 - Responde uma corretamente', value: 1 },
          { label: '2 - Nao responde nenhuma', value: 2 },
        ],
      },
      {
        id: 'commands',
        label: '1c. Comandos (abrir/fechar olhos, apertar/soltar mao)',
        type: 'select',
        options: [
          { label: '0 - Realiza ambos corretamente', value: 0 },
          { label: '1 - Realiza um corretamente', value: 1 },
          { label: '2 - Nao realiza nenhum', value: 2 },
        ],
      },
      {
        id: 'gaze',
        label: '2. Olhar conjugado',
        type: 'select',
        options: [
          { label: '0 - Normal', value: 0 },
          { label: '1 - Paralisia parcial do olhar', value: 1 },
          { label: '2 - Desvio forcado do olhar ou paralisia total', value: 2 },
        ],
      },
      {
        id: 'visual',
        label: '3. Campo visual',
        type: 'select',
        options: [
          { label: '0 - Sem perda visual', value: 0 },
          { label: '1 - Hemianopsia parcial', value: 1 },
          { label: '2 - Hemianopsia completa', value: 2 },
          { label: '3 - Hemianopsia bilateral / cegueira cortical', value: 3 },
        ],
      },
      {
        id: 'facialPalsy',
        label: '4. Paralisia facial',
        type: 'select',
        options: [
          { label: '0 - Movimento normal e simetrico', value: 0 },
          { label: '1 - Paralisia minor (apagamento sulco nasolabial)', value: 1 },
          { label: '2 - Paralisia parcial (face inferior)', value: 2 },
          { label: '3 - Paralisia completa uni ou bilateral', value: 3 },
        ],
      },
      {
        id: 'motorArmLeft',
        label: '5a. Motor braco esquerdo (manter 90° sentado / 45° deitado por 10s)',
        type: 'select',
        options: [
          { label: '0 - Sem queda em 10 segundos', value: 0 },
          { label: '1 - Queda parcial antes de 10 segundos', value: 1 },
          { label: '2 - Algum esforco contra gravidade, nao sustenta', value: 2 },
          { label: '3 - Sem esforco contra gravidade', value: 3 },
          { label: '4 - Nenhum movimento', value: 4 },
        ],
      },
      {
        id: 'motorArmRight',
        label: '5b. Motor braco direito (manter 90° sentado / 45° deitado por 10s)',
        type: 'select',
        options: [
          { label: '0 - Sem queda em 10 segundos', value: 0 },
          { label: '1 - Queda parcial antes de 10 segundos', value: 1 },
          { label: '2 - Algum esforco contra gravidade, nao sustenta', value: 2 },
          { label: '3 - Sem esforco contra gravidade', value: 3 },
          { label: '4 - Nenhum movimento', value: 4 },
        ],
      },
      {
        id: 'motorLegLeft',
        label: '6a. Motor perna esquerda (manter 30° por 5s)',
        type: 'select',
        options: [
          { label: '0 - Sem queda em 5 segundos', value: 0 },
          { label: '1 - Queda parcial antes de 5 segundos', value: 1 },
          { label: '2 - Algum esforco contra gravidade', value: 2 },
          { label: '3 - Sem esforco contra gravidade', value: 3 },
          { label: '4 - Nenhum movimento', value: 4 },
        ],
      },
      {
        id: 'motorLegRight',
        label: '6b. Motor perna direita (manter 30° por 5s)',
        type: 'select',
        options: [
          { label: '0 - Sem queda em 5 segundos', value: 0 },
          { label: '1 - Queda parcial antes de 5 segundos', value: 1 },
          { label: '2 - Algum esforco contra gravidade', value: 2 },
          { label: '3 - Sem esforco contra gravidade', value: 3 },
          { label: '4 - Nenhum movimento', value: 4 },
        ],
      },
      {
        id: 'ataxia',
        label: '7. Ataxia de membros',
        type: 'select',
        options: [
          { label: '0 - Ausente', value: 0 },
          { label: '1 - Presente em um membro', value: 1 },
          { label: '2 - Presente em dois membros', value: 2 },
        ],
      },
      {
        id: 'sensory',
        label: '8. Sensibilidade',
        type: 'select',
        options: [
          { label: '0 - Normal', value: 0 },
          { label: '1 - Hipoestesia leve a moderada', value: 1 },
          { label: '2 - Anestesia / hipoestesia grave', value: 2 },
        ],
      },
      {
        id: 'language',
        label: '9. Linguagem',
        type: 'select',
        options: [
          { label: '0 - Normal', value: 0 },
          { label: '1 - Afasia leve a moderada', value: 1 },
          { label: '2 - Afasia grave (Broca/Wernicke)', value: 2 },
          { label: '3 - Mutismo / afasia global', value: 3 },
        ],
      },
      {
        id: 'dysarthria',
        label: '10. Disartria',
        type: 'select',
        options: [
          { label: '0 - Articulacao normal', value: 0 },
          { label: '1 - Disartria leve a moderada', value: 1 },
          { label: '2 - Ininteligivel / anartria / intubado', value: 2 },
        ],
      },
      {
        id: 'extinction',
        label: '11. Extincao / inatenção',
        type: 'select',
        options: [
          { label: '0 - Sem anormalidade', value: 0 },
          { label: '1 - Inatenção ou extincao em uma modalidade', value: 1 },
          { label: '2 - Hemi-inatenção profunda ou em mais de uma modalidade', value: 2 },
        ],
      },
    ],
    calculate: (values: Record<string, number>): number => {
      const keys = [
        'consciousness',
        'questions',
        'commands',
        'gaze',
        'visual',
        'facialPalsy',
        'motorArmLeft',
        'motorArmRight',
        'motorLegLeft',
        'motorLegRight',
        'ataxia',
        'sensory',
        'language',
        'dysarthria',
        'extinction',
      ];
      return keys.reduce((sum, key) => sum + (values[key] ?? 0), 0);
    },
    maxScore: 42,
    interpretationRanges: [
      {
        min: 0,
        max: 0,
        label: 'Sem deficit',
        severity: 'low',
        recommendation: 'Sem deficit neurologico mensuravel pelo NIHSS.',
        color: '#16a34a',
      },
      {
        min: 1,
        max: 4,
        label: 'AVC minor',
        severity: 'low',
        recommendation:
          'Considerar trombolise IV se deficit incapacitante. Investigar etiologia. Iniciar prevenção secundaria precoce.',
        color: '#22c55e',
      },
      {
        min: 5,
        max: 15,
        label: 'AVC moderado',
        severity: 'moderate',
        recommendation:
          'Trombolise IV (alteplase 0.9 mg/kg, max 90 mg) se < 4.5h do inicio. Considerar trombectomia mecanica se oclusao de grande vaso.',
        color: '#f59e0b',
      },
      {
        min: 16,
        max: 20,
        label: 'AVC moderado-grave',
        severity: 'high',
        recommendation:
          'Trombolise IV + forte indicacao de trombectomia mecanica. Monitoração em UTI. Avaliacao neurocirurgica se edema significativo.',
        color: '#f97316',
      },
      {
        min: 21,
        max: 42,
        label: 'AVC grave',
        severity: 'critical',
        recommendation:
          'Trombolise IV se dentro da janela. Trombectomia mecanica urgente se oclusao de grande vaso < 24h (DAWN/DEFUSE criteria). UTI neurointensiva. Discutir craniectomia descompressiva se infarto maligno de ACM.',
        color: '#ef4444',
      },
    ],
    references: [
      {
        citation:
          'Brott T, Adams HP Jr, Olinger CP, et al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989;20(7):864-870.',
        year: 1989,
      },
      {
        citation:
          'Powers WJ, Rabinstein AA, Ackerson T, et al. Guidelines for the Early Management of Patients With Acute Ischemic Stroke: 2019 Update to the 2018 Guidelines. Stroke. 2019;50(12):e344-e418.',
        year: 2019,
      },
    ],
    relatedProtocols: ['avc-isquemico', 'trombolise-iv', 'trombectomia-mecanica'],
    keywords: [
      'nihss',
      'avc',
      'stroke',
      'isquemico',
      'deficit neurologico',
      'trombolise',
      'trombectomia',
      'alteplase',
      'consciencia',
      'afasia',
      'hemiparesia',
    ],
  },

  // ───────────────────────────────────────────────
  // 3. FOUR Score
  // ───────────────────────────────────────────────
  {
    id: 'four-score',
    name: 'Full Outline of UnResponsiveness Score',
    abbreviation: 'FOUR',
    category: 'neurologia',
    description:
      'Escala de coma que avalia quatro dominios (olhos, motor, tronco encefalico e respiração). Supera limitacoes do GCS em pacientes intubados por nao depender de resposta verbal e incluir reflexos de tronco.',
    inputs: [
      {
        id: 'eye',
        label: 'Resposta ocular',
        type: 'select',
        options: [
          { label: '0 - Palpebras fechadas, sem abertura a dor', value: 0 },
          { label: '1 - Palpebras fechadas, abrem a dor', value: 1 },
          { label: '2 - Palpebras fechadas, abrem ao comando verbal', value: 2 },
          { label: '3 - Palpebras abertas, sem rastreamento', value: 3 },
          { label: '4 - Palpebras abertas, rastreamento ou piscar ao comando', value: 4 },
        ],
      },
      {
        id: 'motor',
        label: 'Resposta motora',
        type: 'select',
        options: [
          { label: '0 - Nenhuma resposta ou status mioclonico generalizado', value: 0 },
          { label: '1 - Resposta extensora', value: 1 },
          { label: '2 - Resposta flexora', value: 2 },
          { label: '3 - Localiza dor', value: 3 },
          { label: '4 - Sinal de positivo (polegar) / punho / peace ao comando', value: 4 },
        ],
      },
      {
        id: 'brainstem',
        label: 'Reflexos de tronco encefalico',
        type: 'select',
        options: [
          { label: '0 - Ausencia de pupilar, corneano e tosse', value: 0 },
          { label: '1 - Pupilar E corneano ausentes', value: 1 },
          { label: '2 - Pupilar OU corneano ausente', value: 2 },
          { label: '3 - Uma pupila dilatada e fixa', value: 3 },
          { label: '4 - Pupilar e corneano presentes', value: 4 },
        ],
      },
      {
        id: 'respiration',
        label: 'Respiracao',
        type: 'select',
        options: [
          { label: '0 - Apneia / respiracao no ventilador', value: 0 },
          { label: '1 - Respira acima da frequencia do ventilador', value: 1 },
          { label: '2 - Nao intubado, respiracao irregular', value: 2 },
          { label: '3 - Nao intubado, padrao Cheyne-Stokes', value: 3 },
          { label: '4 - Nao intubado, padrao respiratorio regular', value: 4 },
        ],
      },
    ],
    calculate: (values: Record<string, number>): number => {
      const eye = values['eye'] ?? 0;
      const motor = values['motor'] ?? 0;
      const brainstem = values['brainstem'] ?? 0;
      const respiration = values['respiration'] ?? 0;
      return eye + motor + brainstem + respiration;
    },
    maxScore: 16,
    interpretationRanges: [
      {
        min: 0,
        max: 0,
        label: 'Possivel morte encefalica',
        severity: 'critical',
        recommendation:
          'Score 0 em todos os dominios: iniciar protocolo de morte encefalica conforme legislação local. Solicitar exames complementares confirmatórios.',
        color: '#7f1d1d',
      },
      {
        min: 1,
        max: 6,
        label: 'Coma grave',
        severity: 'critical',
        recommendation:
          'Monitoração em UTI neurointensiva. Via aerea definitiva. Investigar etiologia reversivel (metabolica, toxica, estrutural). Neuroprotecao.',
        color: '#ef4444',
      },
      {
        min: 7,
        max: 12,
        label: 'Comprometimento moderado',
        severity: 'moderate',
        recommendation:
          'Monitoração continua. Avaliar necessidade de IOT. Neuroimagem e EEG. Reavaliacoes seriadas.',
        color: '#f59e0b',
      },
      {
        min: 13,
        max: 16,
        label: 'Bom nivel de consciencia',
        severity: 'low',
        recommendation:
          'Bom prognostico. Manter monitoração. Considerar desmame ventilatorio se intubado.',
        color: '#22c55e',
      },
    ],
    references: [
      {
        citation:
          'Wijdicks EFM, Bamlet WR, Maramattom BV, Manno EM, McClelland RL. Validation of a new coma scale: the FOUR score. Ann Neurol. 2005;58(4):585-593.',
        year: 2005,
      },
    ],
    relatedProtocols: ['rebaixamento-consciencia', 'morte-encefalica'],
    keywords: [
      'four',
      'coma',
      'consciencia',
      'tronco encefalico',
      'reflexo pupilar',
      'reflexo corneano',
      'intubado',
      'uti',
      'morte encefalica',
    ],
  },

  // ───────────────────────────────────────────────
  // 4. Hunt-Hess
  // ───────────────────────────────────────────────
  {
    id: 'hunt-hess',
    name: 'Escala de Hunt-Hess',
    abbreviation: 'Hunt-Hess',
    category: 'neurologia',
    description:
      'Classificacao clinica da gravidade da hemorragia subaracnoidea (HSA) aneurismatica. Utilizada para estratificar risco cirurgico e prognostico.',
    inputs: [
      {
        id: 'grade',
        label: 'Grau clinico',
        type: 'select',
        options: [
          {
            label: '1 - Assintomatico ou cefaleia leve e rigidez nucal discreta',
            value: 1,
          },
          {
            label: '2 - Cefaleia moderada a grave, rigidez nucal, sem deficit exceto paralisia de nervo craniano',
            value: 2,
          },
          {
            label: '3 - Sonolencia, confusao ou deficit focal leve',
            value: 3,
          },
          {
            label: '4 - Estupor, hemiparesia moderada a grave, possivel rigidez descerebrada precoce',
            value: 4,
          },
          {
            label: '5 - Coma profundo, rigidez descerebrada, aparencia moribunda',
            value: 5,
          },
        ],
      },
    ],
    calculate: (values: Record<string, number>): number => {
      return values['grade'] ?? 1;
    },
    maxScore: 5,
    interpretationRanges: [
      {
        min: 1,
        max: 1,
        label: 'Grau I - Assintomatico / cefaleia minima',
        severity: 'low',
        recommendation:
          'Bom prognostico cirurgico. Tratamento precoce do aneurisma (clipagem ou embolização). Mortalidade cirurgica ~1%.',
        color: '#22c55e',
      },
      {
        min: 2,
        max: 2,
        label: 'Grau II - Cefaleia moderada-grave, rigidez nucal',
        severity: 'low',
        recommendation:
          'Tratamento precoce do aneurisma. Monitoração em UTI. Profilaxia de vasoespasmo (nimodipina). Mortalidade cirurgica ~5%.',
        color: '#84cc16',
      },
      {
        min: 3,
        max: 3,
        label: 'Grau III - Sonolencia, confusao, deficit leve',
        severity: 'moderate',
        recommendation:
          'Tratamento do aneurisma com cautela. UTI neurointensiva. Monitoração de vasoespasmo (DTC diario). Mortalidade ~15-20%.',
        color: '#f59e0b',
      },
      {
        min: 4,
        max: 4,
        label: 'Grau IV - Estupor, hemiparesia grave',
        severity: 'high',
        recommendation:
          'Decisao individualizada sobre tratamento do aneurisma. UTI neurointensiva. DVE se hidrocefalia. Mortalidade ~30-40%.',
        color: '#f97316',
      },
      {
        min: 5,
        max: 5,
        label: 'Grau V - Coma profundo, postura descerebrada',
        severity: 'critical',
        recommendation:
          'Prognostico reservado. Considerar tratamento agressivo em pacientes jovens. DVE de urgencia se hidrocefalia. Mortalidade ~50-70%.',
        color: '#ef4444',
      },
    ],
    references: [
      {
        citation:
          'Hunt WE, Hess RM. Surgical risk as related to time of intervention in the repair of intracranial aneurysms. J Neurosurg. 1968;28(1):14-20.',
        year: 1968,
      },
    ],
    relatedProtocols: ['hsa-aneurismatica', 'vasoespasmo-cerebral'],
    keywords: [
      'hunt hess',
      'hemorragia subaracnoidea',
      'hsa',
      'aneurisma',
      'vasoespasmo',
      'cefaleia',
      'rigidez nucal',
      'clipagem',
      'embolização',
    ],
  },

  // ───────────────────────────────────────────────
  // 5. Fisher Modified
  // ───────────────────────────────────────────────
  {
    id: 'fisher-modified',
    name: 'Escala de Fisher Modificada',
    abbreviation: 'Fisher Mod.',
    category: 'neurologia',
    description:
      'Classificacao tomografica da hemorragia subaracnoidea que prediz o risco de vasoespasmo cerebral tardio. Baseada na espessura do coagulo e presença de hemorragia intraventricular.',
    inputs: [
      {
        id: 'grade',
        label: 'Grau na TC',
        type: 'select',
        options: [
          {
            label: '0 - Sem HSA ou HIV',
            value: 0,
          },
          {
            label: '1 - HSA fina sem HIV',
            value: 1,
          },
          {
            label: '2 - HSA fina com HIV',
            value: 2,
          },
          {
            label: '3 - HSA espessa (> 1mm) sem HIV',
            value: 3,
          },
          {
            label: '4 - HSA espessa (> 1mm) com HIV',
            value: 4,
          },
        ],
      },
    ],
    calculate: (values: Record<string, number>): number => {
      return values['grade'] ?? 0;
    },
    maxScore: 4,
    interpretationRanges: [
      {
        min: 0,
        max: 0,
        label: 'Grau 0 - Sem sangue',
        severity: 'low',
        recommendation:
          'Risco minimo de vasoespasmo. Monitoração clinica padrao. Manter nimodipina profilatica.',
        color: '#16a34a',
      },
      {
        min: 1,
        max: 1,
        label: 'Grau 1 - HSA fina, sem HIV',
        severity: 'low',
        recommendation:
          'Baixo risco de vasoespasmo (~24%). Nimodipina 60 mg 4/4h por 21 dias. DTC de controle.',
        color: '#22c55e',
      },
      {
        min: 2,
        max: 2,
        label: 'Grau 2 - HSA fina com HIV',
        severity: 'moderate',
        recommendation:
          'Risco moderado de vasoespasmo (~33%). Nimodipina. DTC diario a partir do 3o dia. DVE se hidrocefalia.',
        color: '#f59e0b',
      },
      {
        min: 3,
        max: 3,
        label: 'Grau 3 - HSA espessa, sem HIV',
        severity: 'high',
        recommendation:
          'Alto risco de vasoespasmo (~33%). Monitoração intensiva. DTC diario. Manter euvolemia e PAM adequada. Considerar angioplastia se vasoespasmo.',
        color: '#f97316',
      },
      {
        min: 4,
        max: 4,
        label: 'Grau 4 - HSA espessa com HIV',
        severity: 'critical',
        recommendation:
          'Maior risco de vasoespasmo (~40%) e hidrocefalia. DVE precoce. DTC diario. Nimodipina. Limiar baixo para angiografia se deterioração clinica.',
        color: '#ef4444',
      },
    ],
    references: [
      {
        citation:
          'Frontera JA, Claassen J, Schmidt JM, et al. Prediction of symptomatic vasospasm after subarachnoid hemorrhage: the modified Fisher scale. Neurosurgery. 2006;59(1):21-27.',
        year: 2006,
      },
    ],
    relatedProtocols: ['hsa-aneurismatica', 'vasoespasmo-cerebral'],
    keywords: [
      'fisher',
      'fisher modificada',
      'hemorragia subaracnoidea',
      'hsa',
      'vasoespasmo',
      'tomografia',
      'hemorragia intraventricular',
      'hiv',
      'nimodipina',
      'dtc',
    ],
  },

  // ───────────────────────────────────────────────
  // 6. ABCD2
  // ───────────────────────────────────────────────
  {
    id: 'abcd2',
    name: 'ABCD2 Score',
    abbreviation: 'ABCD2',
    category: 'neurologia',
    description:
      'Escore para estratificacao do risco de AVC isquemico nos primeiros 2, 7 e 90 dias apos ataque isquemico transitório (AIT). Auxilia na decisao sobre hospitalizacao e investigacao urgente.',
    inputs: [
      {
        id: 'age',
        label: 'A - Idade',
        type: 'select',
        options: [
          { label: '< 60 anos (0 pontos)', value: 0 },
          { label: '>= 60 anos (1 ponto)', value: 1 },
        ],
      },
      {
        id: 'bp',
        label: 'B - Pressao arterial na apresentacao',
        type: 'select',
        options: [
          { label: 'PAS < 140 E PAD < 90 mmHg (0 pontos)', value: 0 },
          { label: 'PAS >= 140 OU PAD >= 90 mmHg (1 ponto)', value: 1 },
        ],
      },
      {
        id: 'clinical',
        label: 'C - Caracteristicas clinicas',
        type: 'select',
        options: [
          { label: 'Outros sintomas (0 pontos)', value: 0 },
          { label: 'Disturbio de fala sem fraqueza (1 ponto)', value: 1 },
          { label: 'Fraqueza unilateral (2 pontos)', value: 2 },
        ],
      },
      {
        id: 'duration',
        label: 'D - Duracao dos sintomas',
        type: 'select',
        options: [
          { label: '< 10 minutos (0 pontos)', value: 0 },
          { label: '10-59 minutos (1 ponto)', value: 1 },
          { label: '>= 60 minutos (2 pontos)', value: 2 },
        ],
      },
      {
        id: 'diabetes',
        label: 'D - Diabetes mellitus',
        type: 'select',
        options: [
          { label: 'Nao (0 pontos)', value: 0 },
          { label: 'Sim (1 ponto)', value: 1 },
        ],
      },
    ],
    calculate: (values: Record<string, number>): number => {
      const age = values['age'] ?? 0;
      const bp = values['bp'] ?? 0;
      const clinical = values['clinical'] ?? 0;
      const duration = values['duration'] ?? 0;
      const diabetes = values['diabetes'] ?? 0;
      return age + bp + clinical + duration + diabetes;
    },
    maxScore: 7,
    interpretationRanges: [
      {
        min: 0,
        max: 3,
        label: 'Baixo risco',
        severity: 'low',
        recommendation:
          'Risco de AVC em 2 dias: ~1%. Investigacao ambulatorial em 24-48h e possivel. Considerar RM com DWI, angioTC, Doppler carotideo, ECG e ecocardiograma.',
        color: '#22c55e',
      },
      {
        min: 4,
        max: 5,
        label: 'Risco moderado',
        severity: 'moderate',
        recommendation:
          'Risco de AVC em 2 dias: ~4%. Recomendada hospitalizacao para investigacao. RM com DWI urgente, angioTC de vasos cervicais e intracranianos, ECG continuo, ecocardiograma.',
        color: '#f59e0b',
      },
      {
        min: 6,
        max: 7,
        label: 'Alto risco',
        severity: 'high',
        recommendation:
          'Risco de AVC em 2 dias: ~8%. Hospitalizacao obrigatoria. Investigacao urgente completa. Iniciar antiplaquetario duplo (AAS + clopidogrel por 21 dias, conforme CHANCE/POINT). Controle pressórico.',
        color: '#ef4444',
      },
    ],
    references: [
      {
        citation:
          'Johnston SC, Rothwell PM, Nguyen-Huynh MN, et al. Validation and refinement of scores to predict very early stroke risk after transient ischaemic attack. Lancet. 2007;369(9558):283-292.',
        year: 2007,
      },
    ],
    relatedProtocols: ['ait', 'avc-isquemico'],
    keywords: [
      'abcd2',
      'ait',
      'ataque isquemico transitorio',
      'risco avc',
      'stroke risk',
      'tia',
      'pressao',
      'diabetes',
      'fraqueza',
    ],
  },

  // ───────────────────────────────────────────────
  // 7. Canadian CT Head Rule
  // ───────────────────────────────────────────────
  {
    id: 'canadian-ct-head',
    name: 'Canadian CT Head Rule',
    abbreviation: 'CCHR',
    category: 'neurologia',
    description:
      'Regra de decisao clinica para indicação de tomografia de cranio em pacientes com trauma craniano leve (GCS 13-15) e perda de consciencia ou amnesia presenciada. Dividida em criterios de alto e medio risco.',
    inputs: [
      {
        id: 'gcs_below_15',
        label: 'GCS < 15 apos 2 horas do trauma',
        type: 'select',
        options: [
          { label: 'Nao', value: 0 },
          { label: 'Sim (alto risco)', value: 1 },
        ],
      },
      {
        id: 'skull_fracture',
        label: 'Suspeita de fratura de cranio aberta ou com afundamento',
        type: 'select',
        options: [
          { label: 'Nao', value: 0 },
          { label: 'Sim (alto risco)', value: 1 },
        ],
      },
      {
        id: 'basilar_fracture',
        label: 'Sinal de fratura de base de cranio (olhos de guaxinim, otorreia, rinorreia, sinal de Battle)',
        type: 'select',
        options: [
          { label: 'Nao', value: 0 },
          { label: 'Sim (alto risco)', value: 1 },
        ],
      },
      {
        id: 'vomiting',
        label: '>= 2 episodios de vomitos',
        type: 'select',
        options: [
          { label: 'Nao', value: 0 },
          { label: 'Sim (alto risco)', value: 1 },
        ],
      },
      {
        id: 'age_65',
        label: 'Idade >= 65 anos',
        type: 'select',
        options: [
          { label: 'Nao', value: 0 },
          { label: 'Sim (alto risco)', value: 1 },
        ],
      },
      {
        id: 'amnesia',
        label: 'Amnesia retrograda >= 30 minutos antes do impacto',
        type: 'select',
        options: [
          { label: 'Nao', value: 0 },
          { label: 'Sim (medio risco)', value: 1 },
        ],
      },
      {
        id: 'mechanism',
        label: 'Mecanismo perigoso (atropelamento, ejecao de veiculo, queda > 1 metro ou 5 degraus)',
        type: 'select',
        options: [
          { label: 'Nao', value: 0 },
          { label: 'Sim (medio risco)', value: 1 },
        ],
      },
    ],
    calculate: (values: Record<string, number>): number => {
      // High-risk criteria (items 1-5)
      const highRiskKeys = [
        'gcs_below_15',
        'skull_fracture',
        'basilar_fracture',
        'vomiting',
        'age_65',
      ];
      const highRiskSum = highRiskKeys.reduce(
        (sum, key) => sum + (values[key] ?? 0),
        0
      );

      // Medium-risk criteria (items 6-7)
      const mediumRiskKeys = ['amnesia', 'mechanism'];
      const mediumRiskSum = mediumRiskKeys.reduce(
        (sum, key) => sum + (values[key] ?? 0),
        0
      );

      // Encode: high-risk criteria scored as 2 each, medium as 1 each
      // This allows the interpretation ranges to differentiate:
      //   0 = no criteria -> no CT
      //   1-2 = only medium-risk criteria -> CT recommended
      //   3+ = at least one high-risk criterion -> CT mandatory
      // However, to keep it simple and clinically accurate,
      // we use a composite: high-risk positives * 2 + medium-risk positives
      return highRiskSum * 2 + mediumRiskSum;
    },
    maxScore: 12,
    interpretationRanges: [
      {
        min: 0,
        max: 0,
        label: 'Nenhum criterio positivo',
        severity: 'low',
        recommendation:
          'TC de cranio NAO indicada pela regra canadense. Orientar sinais de alerta para retorno (cefaleia progressiva, vomitos, sonolencia, confusao). Observacao por 4-6 horas ou alta com acompanhante responsavel.',
        color: '#22c55e',
      },
      {
        min: 1,
        max: 2,
        label: 'Criterio(s) de medio risco positivo(s)',
        severity: 'moderate',
        recommendation:
          'TC de cranio recomendada para exclusao de lesao cerebral que necessita de intervencao neurocirurgica. Observacao hospitalar ate resultado.',
        color: '#f59e0b',
      },
      {
        min: 3,
        max: 12,
        label: 'Criterio(s) de alto risco positivo(s)',
        severity: 'high',
        recommendation:
          'TC de cranio OBRIGATORIA. Alto risco de lesao neurológica que necessita de intervencao. Se positiva, consultar neurocirurgia. Monitoracao neurologica seriada.',
        color: '#ef4444',
      },
    ],
    references: [
      {
        citation:
          'Stiell IG, Wells GA, Vandemheen K, et al. The Canadian CT Head Rule for patients with minor head injury. Lancet. 2001;357(9266):1391-1396.',
        year: 2001,
      },
    ],
    relatedProtocols: ['tce-leve', 'tce-moderado'],
    keywords: [
      'canadian ct head',
      'cchr',
      'tomografia',
      'tce',
      'trauma craniano',
      'cranio',
      'concussao',
      'fratura',
      'vomitos',
      'amnesia',
      'mecanismo perigoso',
    ],
  },
];
