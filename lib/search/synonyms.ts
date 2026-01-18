/**
 * Medical synonyms dictionary
 * Expanded synonyms for semantic search
 * Language: Portuguese (pt) as primary, with English (en) cross-references
 * Total: 500+ unique term mappings
 */

/**
 * Medical term synonyms mapping
 * Format: canonical term -> [synonyms]
 * Supports bidirectional lookups via SYNONYM_TO_CANONICAL_PT
 */
export const MEDICAL_SYNONYMS_PT: Record<string, string[]> = {
  // ============================================================================
  // CARDIOVASCULAR DISEASES
  // ============================================================================
  'hipertensão arterial': [
    'hipertensão',
    'pressão alta',
    'has',
    'hipertensão sistêmica',
    'hipertensão essencial',
    'hipertensão primária',
    'hipertensão secundária',
    'elevação da pressão arterial',
    'pa elevada',
    'hipertensão arterial sistêmica',
    'hypertension',
    'high blood pressure',
    'hipertensao',
    'pressao alta',
  ],
  'insuficiência cardíaca': [
    'ic',
    'icc',
    'insuficiência cardíaca congestiva',
    'falência cardíaca',
    'insuficiência ventricular',
    'decompensação cardíaca',
    'icd',
    'ic sistólica',
    'ic diastólica',
    'heart failure',
    'cardiac failure',
    'icfer',
    'icfep',
    'insuficiencia cardiaca',
  ],
  'infarto agudo do miocárdio': [
    'iam',
    'infarto',
    'ataque cardíaco',
    'enfarte',
    'enfarte do miocárdio',
    'infarto do miocárdio',
    'síndrome coronariana aguda',
    'sca',
    'necrose do miocárdio',
    'myocardial infarction',
    'heart attack',
    'mi',
    'stemi',
    'nstemi',
    'ataque cardiaco',
  ],
  'doença arterial coronariana': [
    'dac',
    'doença coronariana',
    'coronariopatia',
    'cardiopatia isquêmica',
    'isquemia miocárdica',
    'angina pectoris',
    'angina estável',
    'angina instável',
    'coronary artery disease',
    'cad',
    'ischemic heart disease',
    'ihd',
  ],
  'arritmia cardíaca': [
    'arritmia',
    'disritmia',
    'fibrilação atrial',
    'fa',
    'flutter atrial',
    'taquicardia',
    'bradicardia',
    'extrassístole',
    'arrhythmia',
    'atrial fibrillation',
    'afib',
    'taquiarritmia',
    'bradiarritmia',
  ],
  'fibrilação atrial': [
    'fa',
    'fib atrial',
    'atrial fibrillation',
    'afib',
    'af',
    'fibrilacao atrial',
  ],
  'acidente vascular cerebral': [
    'avc',
    'derrame',
    'derrame cerebral',
    'avc isquêmico',
    'avc hemorrágico',
    'stroke',
    'ictus',
    'apoplexia',
    'isquemia cerebral',
    'hemorragia cerebral',
    'avcis',
    'avcih',
  ],
  'trombose venosa profunda': [
    'tvp',
    'trombose',
    'tromboflebite',
    'deep vein thrombosis',
    'dvt',
    'flebite',
    'coágulo na perna',
  ],
  'embolia pulmonar': [
    'tep',
    'ep',
    'tromboembolismo pulmonar',
    'pulmonary embolism',
    'pe',
    'êmbolo pulmonar',
  ],
  'doença arterial periférica': [
    'dap',
    'doença vascular periférica',
    'dvp',
    'claudicação intermitente',
    'peripheral artery disease',
    'pad',
    'arteriopatia obstrutiva',
  ],
  'aterosclerose': [
    'arteriosclerose',
    'endurecimento das artérias',
    'placas de gordura',
    'atherosclerosis',
    'placa aterosclerótica',
  ],
  'endocardite': [
    'endocardite infecciosa',
    'endocardite bacteriana',
    'infective endocarditis',
    'ei',
  ],
  'pericardite': [
    'inflamação do pericárdio',
    'pericarditis',
    'derrame pericárdico',
  ],
  'miocardite': [
    'inflamação do miocárdio',
    'myocarditis',
    'cardiomiopatia inflamatória',
  ],
  'cardiomiopatia': [
    'miocardiopatia',
    'cardiomiopatia dilatada',
    'cardiomiopatia hipertrófica',
    'cmd',
    'cmh',
    'cardiomyopathy',
  ],
  'sopro cardíaco': [
    'sopro',
    'heart murmur',
    'murmur',
    'sopro sistólico',
    'sopro diastólico',
  ],
  'valvopatia': [
    'doença valvar',
    'estenose valvar',
    'insuficiência valvar',
    'prolapso mitral',
    'valvulopatia',
    'valve disease',
  ],

  // ============================================================================
  // ENDOCRINE & METABOLIC DISEASES
  // ============================================================================
  'diabetes mellitus tipo 2': [
    'dm2',
    'diabetes tipo 2',
    'diabetes mellitus não insulino-dependente',
    'diabetes do adulto',
    'diabetes mellitus tipo ii',
    'diabetes mellitus 2',
    'diabetes tipo ii',
    'type 2 diabetes',
    't2dm',
    'niddm',
    'dm tipo 2',
  ],
  'diabetes mellitus tipo 1': [
    'dm1',
    'diabetes tipo 1',
    'diabetes insulino-dependente',
    'diabetes juvenil',
    'diabetes mellitus tipo i',
    'diabetes tipo i',
    'type 1 diabetes',
    't1dm',
    'iddm',
    'dm tipo 1',
  ],
  'diabetes mellitus': [
    'dm',
    'diabetes',
    'açúcar no sangue',
    'hiperglicemia crônica',
    'diabete',
    'diabetis',
  ],
  'diabetes gestacional': [
    'dmg',
    'diabetes na gravidez',
    'gestational diabetes',
    'gdm',
    'intolerância à glicose gestacional',
  ],
  'hipoglicemia': [
    'glicose baixa',
    'açúcar baixo',
    'hypoglycemia',
    'low blood sugar',
    'hipo',
  ],
  'hiperglicemia': [
    'glicose alta',
    'açúcar alto',
    'hyperglycemia',
    'high blood sugar',
    'hiper',
  ],
  'hipotireoidismo': [
    'tireóide baixa',
    'tireoide baixa',
    'hypothyroidism',
    'hashimoto',
    'tireoidite de hashimoto',
    'tireoide lenta',
    'hipotiroidismo',
  ],
  'hipertireoidismo': [
    'tireóide alta',
    'tireoide alta',
    'hyperthyroidism',
    'graves',
    'doença de graves',
    'tireoide acelerada',
    'hipertiroidismo',
    'tireotoxicose',
  ],
  'dislipidemia': [
    'colesterol alto',
    'hiperlipidemia',
    'hipercolesterolemia',
    'hipertrigliceridemia',
    'dyslipidemia',
    'hyperlipidemia',
    'alteração de lipídios',
    'gordura no sangue',
  ],
  'obesidade': [
    'excesso de peso',
    'sobrepeso',
    'obesity',
    'overweight',
    'obesidade mórbida',
    'obeso',
    'imc elevado',
  ],
  'síndrome metabólica': [
    'sm',
    'síndrome x',
    'metabolic syndrome',
    'síndrome de resistência à insulina',
    'resistência insulínica',
  ],
  'gota': [
    'hiperuricemia',
    'ácido úrico alto',
    'artrite gotosa',
    'gout',
    'podagra',
    'tofo gotoso',
  ],
  'osteoporose': [
    'ossos fracos',
    'perda óssea',
    'osteoporosis',
    'fragilidade óssea',
    'baixa densidade óssea',
    'dmo baixa',
  ],
  'osteopenia': [
    'pré-osteoporose',
    'osteopenia',
    'massa óssea reduzida',
  ],
  'deficiência de vitamina d': [
    'hipovitaminose d',
    'vitamina d baixa',
    'vitamin d deficiency',
    'raquitismo',
    'osteomalácia',
  ],
  'síndrome de cushing': [
    'cushing',
    'hipercortisolismo',
    "cushing's syndrome",
    'excesso de cortisol',
  ],
  'doença de addison': [
    'addison',
    'insuficiência adrenal',
    "addison's disease",
    'hipoadrenalismo',
  ],
  'hiperparatireoidismo': [
    'paratireoide alta',
    'hpt',
    'hyperparathyroidism',
    'adenoma de paratireoide',
  ],
  'hiperprolactinemia': [
    'prolactina alta',
    'prolactinoma',
    'hyperprolactinemia',
  ],

  // ============================================================================
  // RESPIRATORY DISEASES
  // ============================================================================
  'asma': [
    'asma brônquica',
    'asma alérgica',
    'asma não alérgica',
    'bronquite asmática',
    'broncoespasmo',
    'asthma',
    'asma ocupacional',
    'asma grave',
    'crise asmática',
    'broncoconstrição',
  ],
  'doença pulmonar obstrutiva crônica': [
    'dpoc',
    'enfisema',
    'bronquite crônica',
    'doença pulmonar obstrutiva',
    'dpo',
    'copd',
    'chronic obstructive pulmonary disease',
    'enfisema pulmonar',
    'limitação do fluxo aéreo',
  ],
  'pneumonia': [
    'pneumonia bacteriana',
    'pneumonia viral',
    'pneumonia adquirida na comunidade',
    'pac',
    'infecção pulmonar',
    'consolidação pulmonar',
    'pneumonia hospitalar',
    'pneumonia nosocomial',
    'pav',
    'pneumonite',
  ],
  'bronquite': [
    'bronquite aguda',
    'inflamação dos brônquios',
    'bronchitis',
    'traqueobronquite',
  ],
  'tuberculose': [
    'tb',
    'tbc',
    'tuberculosis',
    'tuberculose pulmonar',
    'tbe',
    'tbep',
    'bacilo de koch',
    'doença de koch',
  ],
  'fibrose pulmonar': [
    'fpi',
    'fibrose pulmonar idiopática',
    'pulmonary fibrosis',
    'doença intersticial pulmonar',
    'pneumopatia intersticial',
  ],
  'apneia do sono': [
    'saos',
    'apneia obstrutiva do sono',
    'sleep apnea',
    'osa',
    'ronco',
    'síndrome da apneia obstrutiva do sono',
    'distúrbio respiratório do sono',
  ],
  'sinusite': [
    'rinossinusite',
    'sinusite aguda',
    'sinusite crônica',
    'sinusitis',
    'infecção dos seios da face',
    'congestão nasal',
  ],
  'rinite': [
    'rinite alérgica',
    'rinite crônica',
    'rinite vasomotora',
    'rhinitis',
    'coriza',
    'nariz entupido',
  ],
  'faringite': [
    'dor de garganta',
    'inflamação da garganta',
    'amigdalite',
    'pharyngitis',
    'faringoamigdalite',
    'garganta inflamada',
  ],
  'laringite': [
    'inflamação da laringe',
    'rouquidão',
    'laryngitis',
    'disfonia',
    'afonia',
  ],
  'derrame pleural': [
    'efusão pleural',
    'pleural effusion',
    'líquido no pulmão',
    'pleurite',
  ],
  'pneumotórax': [
    'ar no pulmão',
    'pneumothorax',
    'pulmão colapsado',
    'colapso pulmonar',
  ],
  // ============================================================================
  // GASTROINTESTINAL DISEASES
  // ============================================================================
  'doença do refluxo gastroesofágico': [
    'drge',
    'refluxo gastroesofágico',
    'refluxo',
    'azia',
    'pirose',
    'esofagite de refluxo',
    'doença do refluxo',
    'gerd',
    'gastroesophageal reflux disease',
    'queimação',
    'regurgitação ácida',
  ],
  'gastrite': [
    'gastrite aguda',
    'gastrite crônica',
    'gastrite erosiva',
    'inflamação gástrica',
    'gastritis',
    'gastrite atrófica',
    'gastrite por h. pylori',
  ],
  'úlcera péptica': [
    'úlcera gástrica',
    'úlcera duodenal',
    'peptic ulcer',
    'úlcera estomacal',
    'úlcera de estômago',
    'ud',
    'ug',
  ],
  'síndrome do intestino irritável': [
    'sii',
    'intestino irritável',
    'colite espástica',
    'colopatia funcional',
    'síndrome do cólon irritável',
    'ibs',
    'irritable bowel syndrome',
    'colon irritável',
  ],
  'doença de crohn': [
    'crohn',
    'ileíte regional',
    "crohn's disease",
    'doença inflamatória intestinal',
    'dii',
  ],
  'retocolite ulcerativa': [
    'colite ulcerativa',
    'rcu',
    'ulcerative colitis',
    'uc',
    'doença inflamatória intestinal',
  ],
  'doença inflamatória intestinal': [
    'dii',
    'ibd',
    'inflammatory bowel disease',
    'colite',
    'enterite',
  ],
  'pancreatite': [
    'pancreatite aguda',
    'pancreatite crônica',
    'pancreatitis',
    'inflamação do pâncreas',
  ],
  'hepatite': [
    'hepatite viral',
    'hepatite a',
    'hepatite b',
    'hepatite c',
    'hav',
    'hbv',
    'hcv',
    'inflamação do fígado',
    'hepatitis',
  ],
  'cirrose hepática': [
    'cirrose',
    'cirrose alcoólica',
    'fibrose hepática',
    'cirrhosis',
    'doença hepática crônica',
    'dhc',
  ],
  'esteatose hepática': [
    'gordura no fígado',
    'fígado gorduroso',
    'nafld',
    'doença hepática gordurosa não alcoólica',
    'fatty liver',
    'esteatose',
  ],
  'colelitíase': [
    'pedra na vesícula',
    'cálculo biliar',
    'gallstones',
    'litíase biliar',
    'coledocolitíase',
  ],
  'colecistite': [
    'inflamação da vesícula',
    'cholecystitis',
    'vesícula inflamada',
  ],
  'apendicite': [
    'appendicitis',
    'inflamação do apêndice',
    'apendicite aguda',
  ],
  'diverticulite': [
    'diverticulose',
    'diverticulitis',
    'doença diverticular',
  ],
  'hemorroidas': [
    'hemorróidas',
    'hemorrhoids',
    'almorranas',
    'varizes anais',
  ],
  'doença celíaca': [
    'celíaca',
    'celiac disease',
    'intolerância ao glúten',
    'enteropatia por glúten',
    'sprue',
  ],
  'intolerância à lactose': [
    'lactose intolerance',
    'deficiência de lactase',
    'má absorção de lactose',
  ],

  // ============================================================================
  // NEUROLOGICAL DISEASES
  // ============================================================================
  'cefaleia': [
    'dor de cabeça',
    'cefaléia',
    'cefalgia',
    'headache',
    'cefalalgia',
  ],
  'enxaqueca': [
    'migrânea',
    'cefaleia migranosa',
    'cefaleia tipo enxaqueca',
    'migraine',
    'migrânea com aura',
    'migrânea sem aura',
  ],
  'cefaleia tensional': [
    'cefaleia de tensão',
    'tension headache',
    'dor de cabeça por estresse',
  ],
  'epilepsia': [
    'crise epiléptica',
    'convulsão',
    'crise convulsiva',
    'distúrbio convulsivo',
    'transtorno epiléptico',
    'epilepsy',
    'seizure',
    'crise tônico-clônica',
    'grande mal',
    'pequeno mal',
  ],
  'doença de parkinson': [
    'parkinson',
    'mal de parkinson',
    "parkinson's disease",
    'pd',
    'parkinsonismo',
    'tremor de repouso',
  ],
  'doença de alzheimer': [
    'alzheimer',
    'mal de alzheimer',
    "alzheimer's disease",
    'ad',
    'demência de alzheimer',
    'da',
  ],
  'demência': [
    'declínio cognitivo',
    'dementia',
    'demência vascular',
    'demência senil',
    'comprometimento cognitivo',
  ],
  'esclerose múltipla': [
    'em',
    'multiple sclerosis',
    'ms',
    'esclerose em placas',
  ],
  'esclerose lateral amiotrófica': [
    'ela',
    'als',
    'doença de lou gehrig',
    'doença do neurônio motor',
  ],
  'neuropatia periférica': [
    'neuropatia',
    'polineuropatia',
    'neuropatia diabética',
    'peripheral neuropathy',
    'formigamento',
    'parestesia',
  ],
  'neuralgia': [
    'dor neuropática',
    'neuralgia do trigêmeo',
    'neuropathic pain',
    'nevralgia',
  ],
  'meningite': [
    'inflamação das meninges',
    'meningitis',
    'meningite bacteriana',
    'meningite viral',
    'meningococcemia',
  ],
  'encefalite': [
    'inflamação cerebral',
    'encephalitis',
    'encefalite viral',
  ],
  'hidrocefalia': [
    'água no cérebro',
    'hydrocephalus',
    'hipertensão intracraniana',
  ],
  'síndrome do túnel do carpo': [
    'stc',
    'carpal tunnel syndrome',
    'cts',
    'compressão do nervo mediano',
  ],
  'hérnia de disco': [
    'protrusão discal',
    'hérnia discal',
    'herniated disc',
    'disc herniation',
    'abaulamento discal',
  ],
  'ciática': [
    'ciatalgia',
    'dor ciática',
    'sciatica',
    'radiculopatia lombar',
    'lombociatalgia',
  ],
  'vertigem': [
    'labirintite',
    'vertigo',
    'tontura rotatória',
    'vppb',
    'vertigem posicional',
  ],

  // ============================================================================
  // MUSCULOSKELETAL DISEASES
  // ============================================================================
  'artrite': [
    'inflamação articular',
    'arthritis',
    'artralgia',
    'dor articular',
  ],
  'artrite reumatoide': [
    'ar',
    'reumatismo',
    'rheumatoid arthritis',
    'ra',
    'poliartrite',
  ],
  'osteoartrite': [
    'artrose',
    'osteoarthritis',
    'oa',
    'degeneração articular',
    'doença articular degenerativa',
    'artrose de joelho',
    'artrose de quadril',
  ],
  'fibromialgia': [
    'síndrome fibromiálgica',
    'fibromyalgia',
    'fm',
    'dor crônica difusa',
  ],
  'lombalgia': [
    'dor lombar',
    'dor nas costas',
    'low back pain',
    'lumbago',
    'dor na coluna',
  ],
  'cervicalgia': [
    'dor cervical',
    'dor no pescoço',
    'neck pain',
    'torcicolo',
  ],
  'tendinite': [
    'tendinopatia',
    'tendinitis',
    'inflamação do tendão',
    'tendinose',
  ],
  'bursite': [
    'inflamação da bursa',
    'bursitis',
    'bursite de ombro',
    'bursite de quadril',
  ],
  'espondilose': [
    'espondiloartrose',
    'spondylosis',
    'degeneração vertebral',
  ],
  'espondilite anquilosante': [
    'ea',
    'ankylosing spondylitis',
    'as',
    'espondiloartrite',
  ],
  'lúpus eritematoso sistêmico': [
    'les',
    'lúpus',
    'lupus',
    'sle',
    'systemic lupus erythematosus',
  ],
  'síndrome de sjögren': [
    'sjögren',
    "sjogren's syndrome",
    'olho seco',
    'boca seca',
  ],
  'esclerodermia': [
    'esclerose sistêmica',
    'scleroderma',
    'systemic sclerosis',
  ],
  'miosite': [
    'polimiosite',
    'dermatomiosite',
    'myositis',
    'inflamação muscular',
  ],
  'distrofia muscular': [
    'muscular dystrophy',
    'distrofia de duchenne',
    'dmd',
  ],

  // ============================================================================
  // INFECTIOUS DISEASES
  // ============================================================================
  'infecção do trato urinário': [
    'itu',
    'infecção urinária',
    'cistite',
    'pielonefrite',
    'infecção urinária baixa',
    'infecção urinária alta',
    'uti',
    'urinary tract infection',
    'infecção de urina',
  ],
  'gripe': [
    'influenza',
    'flu',
    'virose',
    'resfriado',
    'gripe sazonal',
    'h1n1',
    'h3n2',
    'síndrome gripal',
  ],
  'covid-19': [
    'coronavírus',
    'sars-cov-2',
    'covid',
    'coronavirus',
    'síndrome respiratória aguda grave',
    'srag',
  ],
  'dengue': [
    'dengue clássica',
    'dengue hemorrágica',
    'febre da dengue',
    'dengue grave',
  ],
  'malária': [
    'paludismo',
    'malaria',
    'febre terçã',
    'febre quartã',
  ],
  'hiv/aids': [
    'hiv',
    'aids',
    'sida',
    'síndrome da imunodeficiência adquirida',
    'infecção pelo hiv',
  ],
  'sífilis': [
    'lues',
    'syphilis',
    'cancro duro',
    'sífilis primária',
    'sífilis secundária',
    'sífilis terciária',
  ],
  'gonorreia': [
    'gonorréia',
    'gonorrhea',
    'blenorragia',
    'gota matinal',
  ],
  'clamídia': [
    'chlamydia',
    'infecção por clamídia',
    'clamidia',
  ],
  'herpes': [
    'herpes simples',
    'hsv',
    'herpes genital',
    'herpes labial',
    'herpes zoster',
    'cobreiro',
  ],
  'candidíase': [
    'candida',
    'sapinho',
    'candidose',
    'candidiasis',
    'infecção fúngica',
  ],
  'toxoplasmose': [
    'toxoplasma',
    'toxoplasmosis',
    'infecção por toxoplasma',
  ],
  'mononucleose': [
    'doença do beijo',
    'mononucleosis',
    'mono',
    'ebv',
  ],
  'sepse': [
    'septicemia',
    'sepsis',
    'infecção generalizada',
    'choque séptico',
  ],
  'celulite': [
    'infecção de pele',
    'erisipela',
    'cellulitis',
    'infecção subcutânea',
  ],
  'impetigo': [
    'piodermite',
    'impetigo bolhoso',
    'infecção bacteriana de pele',
  ],
  'escabiose': [
    'sarna',
    'scabies',
    'prurido intenso',
  ],
  'pediculose': [
    'piolho',
    'lice',
    'infestação por piolho',
  ],

  // ============================================================================
  // RENAL DISEASES
  // ============================================================================
  'doença renal crônica': [
    'drc',
    'insuficiência renal crônica',
    'irc',
    'chronic kidney disease',
    'ckd',
    'nefropatia crônica',
  ],
  'insuficiência renal aguda': [
    'ira',
    'lesão renal aguda',
    'lra',
    'acute kidney injury',
    'aki',
  ],
  'nefropatia diabética': [
    'doença renal do diabetes',
    'diabetic nephropathy',
    'nefrosclerose diabética',
  ],
  'glomerulonefrite': [
    'nefrite',
    'glomerulonephritis',
    'gn',
    'inflamação renal',
  ],
  'nefrolitíase': [
    'cálculo renal',
    'pedra no rim',
    'kidney stones',
    'litíase renal',
    'cólica renal',
  ],
  'síndrome nefrótica': [
    'nephrotic syndrome',
    'proteinúria maciça',
  ],
  'pielonefrite': [
    'infecção renal',
    'pyelonephritis',
    'infecção do rim',
  ],
  'hidronefrose': [
    'dilatação renal',
    'hydronephrosis',
    'rim dilatado',
  ],
  'doença renal policística': [
    'rins policísticos',
    'polycystic kidney disease',
    'pkd',
  ],

  // ============================================================================
  // ONCOLOGY
  // ============================================================================
  'câncer': [
    'neoplasia',
    'tumor',
    'cancer',
    'malignidade',
    'neoplasia maligna',
    'carcinoma',
  ],
  'câncer de mama': [
    'neoplasia de mama',
    'carcinoma mamário',
    'breast cancer',
    'tumor de mama',
    'ca de mama',
  ],
  'câncer de próstata': [
    'neoplasia de próstata',
    'carcinoma prostático',
    'prostate cancer',
    'tumor de próstata',
    'ca de próstata',
  ],
  'câncer de pulmão': [
    'neoplasia pulmonar',
    'carcinoma pulmonar',
    'lung cancer',
    'tumor de pulmão',
    'ca de pulmão',
  ],
  'câncer colorretal': [
    'câncer de cólon',
    'câncer de reto',
    'neoplasia colorretal',
    'colorectal cancer',
    'ca colorretal',
  ],
  'câncer de colo do útero': [
    'câncer cervical',
    'neoplasia cervical',
    'cervical cancer',
    'carcinoma cervical',
    'ca de colo uterino',
  ],
  'leucemia': [
    'câncer do sangue',
    'leukemia',
    'leucemia linfóide',
    'leucemia mielóide',
    'lla',
    'lma',
    'llc',
    'lmc',
  ],
  'linfoma': [
    'câncer linfático',
    'lymphoma',
    'linfoma de hodgkin',
    'linfoma não-hodgkin',
    'lnh',
  ],
  'melanoma': [
    'câncer de pele',
    'melanoma maligno',
    'melanoma cutâneo',
  ],
  'câncer de tireoide': [
    'neoplasia da tireoide',
    'carcinoma tireoidiano',
    'thyroid cancer',
  ],
  'câncer de estômago': [
    'câncer gástrico',
    'adenocarcinoma gástrico',
    'stomach cancer',
    'gastric cancer',
  ],
  'câncer de fígado': [
    'hepatocarcinoma',
    'carcinoma hepatocelular',
    'chc',
    'liver cancer',
    'hcc',
  ],
  'câncer de pâncreas': [
    'adenocarcinoma pancreático',
    'pancreatic cancer',
    'neoplasia pancreática',
  ],
  'câncer de bexiga': [
    'neoplasia vesical',
    'bladder cancer',
    'carcinoma de bexiga',
  ],
  'câncer de rim': [
    'carcinoma renal',
    'kidney cancer',
    'tumor de wilms',
  ],
  'câncer de ovário': [
    'neoplasia ovariana',
    'ovarian cancer',
    'carcinoma de ovário',
  ],
  'câncer de endométrio': [
    'câncer uterino',
    'endometrial cancer',
    'carcinoma endometrial',
  ],
  'mieloma múltiplo': [
    'mieloma',
    'multiple myeloma',
    'mm',
    'plasmocitoma',
  ],
  'metástase': [
    'metástases',
    'metastasis',
    'disseminação tumoral',
    'tumor secundário',
  ],
  'quimioterapia': [
    'qt',
    'chemotherapy',
    'tratamento oncológico',
  ],
  'radioterapia': [
    'rt',
    'radiotherapy',
    'irradiação',
  ],

  // ============================================================================
  // PSYCHIATRIC & MENTAL HEALTH
  // ============================================================================
  'depressão': [
    'transtorno depressivo',
    'depressão maior',
    'depression',
    'episódio depressivo',
    'mdd',
    'transtorno depressivo maior',
    'tristeza profunda',
  ],
  'ansiedade': [
    'transtorno de ansiedade',
    'ansiedade generalizada',
    'tag',
    'anxiety',
    'gad',
    'nervosismo',
  ],
  'transtorno de pânico': [
    'síndrome do pânico',
    'pânico',
    'panic disorder',
    'ataques de pânico',
    'crise de pânico',
  ],
  'transtorno obsessivo-compulsivo': [
    'toc',
    'ocd',
    'obsessive-compulsive disorder',
    'obsessão',
    'compulsão',
  ],
  'transtorno bipolar': [
    'bipolaridade',
    'bipolar disorder',
    'maníaco-depressivo',
    'transtorno afetivo bipolar',
    'tab',
  ],
  'esquizofrenia': [
    'psicose',
    'schizophrenia',
    'transtorno psicótico',
  ],
  'transtorno de estresse pós-traumático': [
    'tept',
    'ptsd',
    'post-traumatic stress disorder',
    'estresse pós-traumático',
  ],
  'transtorno de déficit de atenção e hiperatividade': [
    'tdah',
    'adhd',
    'dda',
    'déficit de atenção',
    'hiperatividade',
  ],
  'autismo': [
    'tea',
    'transtorno do espectro autista',
    'autism',
    'asd',
    'autismo spectrum disorder',
  ],
  'insônia': [
    'distúrbio do sono',
    'insomnia',
    'dificuldade para dormir',
    'sono ruim',
  ],
  'bulimia': [
    'bulimia nervosa',
    'transtorno alimentar',
    'bulimia',
  ],
  'anorexia': [
    'anorexia nervosa',
    'transtorno alimentar',
    'perda de apetite',
    'falta de apetite',
    'loss of appetite',
    'inapetência',
  ],
  'dependência de álcool': [
    'alcoolismo',
    'alcoholism',
    'alcohol dependence',
    'etilismo',
    'síndrome de dependência alcoólica',
  ],
  'dependência de drogas': [
    'drogadição',
    'drug addiction',
    'toxicomania',
    'uso de substâncias',
    'transtorno por uso de substâncias',
  ],
  'burnout': [
    'síndrome de burnout',
    'esgotamento profissional',
    'burnout syndrome',
    'síndrome do esgotamento',
  ],

  // ============================================================================
  // DERMATOLOGICAL CONDITIONS
  // ============================================================================
  'dermatite': [
    'eczema',
    'dermatitis',
    'inflamação da pele',
    'dermatite atópica',
    'dermatite de contato',
  ],
  'psoríase': [
    'psoriasis',
    'placas na pele',
    'psoríase em placas',
  ],
  'urticária': [
    'urticaria',
    'alergia de pele',
    'coceira',
    'vergões',
  ],
  'acne': [
    'espinhas',
    'cravos',
    'acne vulgaris',
    'comedões',
  ],
  'rosácea': [
    'rosacea',
    'vermelhidão facial',
    'rubor facial',
  ],
  'vitiligo': [
    'manchas brancas',
    'despigmentação',
    'vitiligo',
  ],
  'alopecia': [
    'queda de cabelo',
    'calvície',
    'alopecia areata',
    'hair loss',
  ],
  'micose': [
    'fungos na pele',
    'tinha',
    'tinea',
    'frieira',
    'onicomicose',
  ],
  'verruga': [
    'hpv cutâneo',
    'wart',
    'papiloma',
  ],
  'queimadura': [
    'burn',
    'queimadura solar',
    'queimadura térmica',
    'escaldadura',
  ],
  'ferida': [
    'lesão de pele',
    'wound',
    'úlcera de pele',
    'escoriação',
  ],

  // ============================================================================
  // OBSTETRICS & GYNECOLOGY
  // ============================================================================
  'gravidez': [
    'gestação',
    'pregnancy',
    'prenhez',
    'grávida',
    'gestante',
  ],
  'pré-eclâmpsia': [
    'preeclampsia',
    'dheg',
    'doença hipertensiva específica da gestação',
    'toxemia gravídica',
  ],
  'eclâmpsia': [
    'eclampsia',
    'convulsão na gravidez',
  ],
  'endometriose': [
    'endometriosis',
    'tecido endometrial ectópico',
  ],
  'mioma': [
    'fibroma uterino',
    'leiomioma',
    'uterine fibroid',
    'miomatose',
  ],
  'síndrome dos ovários policísticos': [
    'sop',
    'pcos',
    'polycystic ovary syndrome',
    'ovários policísticos',
  ],
  'menopausa': [
    'climatério',
    'menopause',
    'perimenopausa',
    'pós-menopausa',
  ],
  'dismenorreia': [
    'cólica menstrual',
    'dor menstrual',
    'dysmenorrhea',
  ],
  'amenorreia': [
    'ausência de menstruação',
    'amenorrhea',
    'falta de menstruação',
  ],
  'vaginite': [
    'vaginose',
    'infecção vaginal',
    'vaginitis',
    'corrimento',
  ],
  'doença inflamatória pélvica': [
    'dip',
    'pid',
    'pelvic inflammatory disease',
    'infecção pélvica',
  ],
  'aborto': [
    'abortamento',
    'miscarriage',
    'perda gestacional',
    'aborto espontâneo',
  ],
  'parto prematuro': [
    'prematuridade',
    'preterm birth',
    'parto pré-termo',
  ],

  // ============================================================================
  // PEDIATRIC CONDITIONS
  // ============================================================================
  'sarampo': [
    'measles',
    'rubéola',
    'exantema',
  ],
  'catapora': [
    'varicela',
    'chickenpox',
    'varicella',
  ],
  'caxumba': [
    'parotidite',
    'mumps',
    'papeira',
  ],
  'coqueluche': [
    'tosse comprida',
    'pertussis',
    'whooping cough',
  ],
  'escarlatina': [
    'scarlet fever',
    'febre escarlate',
  ],
  'otite': [
    'infecção de ouvido',
    'otite média',
    'otitis',
    'ear infection',
    'dor de ouvido',
  ],
  'conjuntivite': [
    'olho vermelho',
    'conjunctivitis',
    'pink eye',
    'inflamação ocular',
  ],
  'icterícia neonatal': [
    'amarelão do bebê',
    'neonatal jaundice',
    'hiperbilirrubinemia',
  ],
  'bronquiolite': [
    'bronchiolitis',
    'infecção bronquiolar',
    'chiado no peito',
  ],
  'refluxo gastroesofágico em bebês': [
    'rgeb',
    'regurgitação',
    'guspir',
  ],

  // ============================================================================
  // OPHTHALMOLOGIC CONDITIONS
  // ============================================================================
  'catarata': [
    'opacidade do cristalino',
    'cataract',
    'vista embaçada',
  ],
  'glaucoma': [
    'pressão ocular alta',
    'glaucoma',
    'pressão do olho',
  ],
  'degeneração macular': [
    'dmri',
    'degeneração macular relacionada à idade',
    'macular degeneration',
    'amd',
  ],
  'retinopatia diabética': [
    'doença ocular do diabetes',
    'diabetic retinopathy',
    'alteração na retina',
  ],
  'miopia': [
    'dificuldade para ver longe',
    'myopia',
    'nearsightedness',
  ],
  'hipermetropia': [
    'dificuldade para ver perto',
    'hyperopia',
    'farsightedness',
  ],
  'astigmatismo': [
    'astigmatism',
    'visão distorcida',
  ],
  'presbiopia': [
    'vista cansada',
    'presbyopia',
    'dificuldade para ler',
  ],
  'olho seco': [
    'síndrome do olho seco',
    'dry eye',
    'ceratoconjuntivite seca',
  ],
  'blefarite': [
    'inflamação da pálpebra',
    'blepharitis',
  ],
  'terçol': [
    'hordéolo',
    'stye',
    'hordeolum',
  ],
  'descolamento de retina': [
    'retinal detachment',
    'descolamento retiniano',
  ],

  // ============================================================================
  // MEDICATIONS - ANALGESICS & ANTI-INFLAMMATORIES
  // ============================================================================
  'paracetamol': [
    'acetaminofeno',
    'acetaminofem',
    'tylenol',
    'dôrico',
    'acetaminophen',
  ],
  'dipirona': [
    'metamizol',
    'novalgina',
    'analgina',
    'dipyrone',
    'magnopyrol',
  ],
  'ibuprofeno': [
    'ibufran',
    'advil',
    'brufen',
    'alivium',
    'motrin',
    'ibuprofen',
  ],
  'diclofenaco': [
    'voltaren',
    'cataflan',
    'cataflam',
    'diclofenac',
    'ainda',
  ],
  'naproxeno': [
    'naprosyn',
    'flanax',
    'naproxen',
  ],
  'ácido acetilsalicílico': [
    'aas',
    'aspirina',
    'aspirin',
    'ecasil',
    'bufferin',
  ],
  'anti-inflamatório': [
    'aine',
    'nsaid',
    'anti-inflamatório não esteroidal',
    'antiinflamatório',
  ],
  'tramadol': [
    'tramal',
    'ultram',
    'opioide',
  ],
  'codeína': [
    'codein',
    'tylex',
    'codeine',
  ],
  'morfina': [
    'dimorf',
    'morphine',
    'opioide',
  ],

  // ============================================================================
  // MEDICATIONS - CARDIOVASCULAR
  // ============================================================================
  'losartana': [
    'losartan',
    'cozaar',
    'losartana potássica',
    'bra',
    'bloqueador do receptor de angiotensina',
  ],
  'enalapril': [
    'renitec',
    'vasotec',
    'ieca',
    'inibidor da eca',
  ],
  'captopril': [
    'capoten',
    'ieca',
    'inibidor da eca',
  ],
  'amlodipino': [
    'amlodipina',
    'norvasc',
    'amlodipino besilato',
    'bloqueador de canal de cálcio',
    'bcc',
  ],
  'hidroclorotiazida': [
    'hctz',
    'clorana',
    'diurético',
    'tiazídico',
  ],
  'furosemida': [
    'lasix',
    'furosemide',
    'diurético de alça',
  ],
  'espironolactona': [
    'aldactone',
    'spironolactone',
    'poupador de potássio',
  ],
  'carvedilol': [
    'coreg',
    'betabloqueador',
    'bloqueador beta',
  ],
  'atenolol': [
    'tenormin',
    'betabloqueador',
    'beta bloqueador',
  ],
  'propranolol': [
    'inderal',
    'betabloqueador',
  ],
  'metoprolol': [
    'lopressor',
    'seloken',
    'betabloqueador',
  ],
  'sinvastatina': [
    'simvastatina',
    'zocor',
    'estatina',
    'statin',
  ],
  'atorvastatina': [
    'lipitor',
    'estatina',
    'citalor',
  ],
  'rosuvastatina': [
    'crestor',
    'estatina',
  ],
  'varfarina': [
    'marevan',
    'coumadin',
    'warfarin',
    'anticoagulante',
  ],
  'rivaroxabana': [
    'xarelto',
    'rivaroxaban',
    'noac',
    'anticoagulante oral',
  ],
  'apixabana': [
    'eliquis',
    'apixaban',
    'noac',
  ],
  'enoxaparina': [
    'clexane',
    'enoxaparin',
    'heparina de baixo peso molecular',
    'hbpm',
  ],
  'heparina': [
    'anticoagulante',
    'heparin',
    'heparina não fracionada',
  ],
  'clopidogrel': [
    'plavix',
    'antiagregante plaquetário',
  ],
  'digoxina': [
    'lanoxin',
    'digitálico',
    'digoxin',
  ],
  'amiodarona': [
    'ancoron',
    'cordarone',
    'antiarrítmico',
  ],

  // ============================================================================
  // MEDICATIONS - GASTROINTESTINAL
  // ============================================================================
  'omeprazol': [
    'omeprazole',
    'losec',
    'prazol',
    'ibp',
    'inibidor de bomba de prótons',
  ],
  'pantoprazol': [
    'pantoloc',
    'protonix',
    'ibp',
    'pantoprazole',
  ],
  'esomeprazol': [
    'nexium',
    'ibp',
    'esomeprazole',
  ],
  'ranitidina': [
    'antak',
    'zantac',
    'ranitidine',
    'bloqueador h2',
  ],
  'domperidona': [
    'motilium',
    'domperidone',
    'procinético',
  ],
  'metoclopramida': [
    'plasil',
    'primperan',
    'metoclopramide',
    'antiemético',
  ],
  'ondansetrona': [
    'zofran',
    'vonau',
    'ondansetron',
    'antiemético',
  ],
  'loperamida': [
    'imosec',
    'imodium',
    'loperamide',
    'antidiarreico',
  ],
  'lactulose': [
    'lactulona',
    'laxante',
    'lactulose',
  ],
  'bisacodil': [
    'dulcolax',
    'laxante',
    'bisacodyl',
  ],
  'simeticona': [
    'luftal',
    'simethicone',
    'antiflatulento',
  ],

  // ============================================================================
  // MEDICATIONS - ENDOCRINE/DIABETES
  // ============================================================================
  'metformina': [
    'metformin',
    'metformina cloridrato',
    'glifage',
    'glucoformin',
    'biguanida',
  ],
  'glibenclamida': [
    'daonil',
    'glynase',
    'glyburide',
    'sulfonilureia',
  ],
  'glimepirida': [
    'amaryl',
    'glimepiride',
    'sulfonilureia',
  ],
  'insulina': [
    'insulin',
    'insulina nph',
    'insulina regular',
    'insulina glargina',
    'lantus',
    'novorapid',
    'humalog',
  ],
  'sitagliptina': [
    'januvia',
    'sitagliptin',
    'inibidor dpp-4',
  ],
  'empagliflozina': [
    'jardiance',
    'empagliflozin',
    'inibidor sglt2',
  ],
  'dapagliflozina': [
    'forxiga',
    'dapagliflozin',
    'inibidor sglt2',
  ],
  'liraglutida': [
    'victoza',
    'saxenda',
    'liraglutide',
    'agonista glp-1',
  ],
  'levotiroxina': [
    'puran',
    'synthroid',
    'euthyrox',
    't4',
    'levothyroxine',
    'hormônio tireoidiano',
  ],
  'metimazol': [
    'tapazol',
    'methimazole',
    'antitireoidiano',
  ],
  'prednisona': [
    'meticorten',
    'corticoide',
    'corticosteroide',
    'prednisone',
  ],
  'dexametasona': [
    'decadron',
    'corticoide',
    'dexamethasone',
  ],
  'hidrocortisona': [
    'solu-cortef',
    'corticoide',
    'hydrocortisone',
  ],

  // ============================================================================
  // MEDICATIONS - ANTIBIOTICS
  // ============================================================================
  'amoxicilina': [
    'amoxil',
    'novamox',
    'amoxicillin',
    'penicilina',
    'antibiótico',
  ],
  'amoxicilina + clavulanato': [
    'clavulin',
    'augmentin',
    'amoxicillin-clavulanate',
  ],
  'azitromicina': [
    'zitromax',
    'azithromycin',
    'macrolídeo',
  ],
  'claritromicina': [
    'klaricid',
    'biaxin',
    'clarithromycin',
    'macrolídeo',
  ],
  'ciprofloxacino': [
    'cipro',
    'cifloxacina',
    'ciprofloxacin',
    'quinolona',
    'fluoroquinolona',
  ],
  'levofloxacino': [
    'levaquin',
    'levofloxacin',
    'quinolona',
  ],
  'cefalexina': [
    'keflex',
    'cephalexin',
    'cefalosporina',
  ],
  'ceftriaxona': [
    'rocefin',
    'ceftriaxone',
    'cefalosporina',
  ],
  'sulfametoxazol + trimetoprima': [
    'bactrim',
    'septra',
    'cotrimoxazol',
    'smz-tmp',
  ],
  'metronidazol': [
    'flagyl',
    'metronidazole',
    'nitroimidazol',
  ],
  'doxiciclina': [
    'vibramicina',
    'doxycycline',
    'tetraciclina',
  ],
  'nitrofurantoína': [
    'macrodantina',
    'nitrofurantoin',
  ],
  'clindamicina': [
    'dalacin',
    'clindamycin',
    'lincosamida',
  ],
  'vancomicina': [
    'vancocin',
    'vancomycin',
    'glicopeptídeo',
  ],
  'gentamicina': [
    'garamicina',
    'gentamicin',
    'aminoglicosídeo',
  ],

  // ============================================================================
  // MEDICATIONS - PSYCHIATRIC
  // ============================================================================
  'fluoxetina': [
    'prozac',
    'fluoxetine',
    'isrs',
    'ssri',
    'antidepressivo',
  ],
  'sertralina': [
    'zoloft',
    'sertraline',
    'isrs',
    'antidepressivo',
  ],
  'escitalopram': [
    'lexapro',
    'escitalopram',
    'isrs',
    'antidepressivo',
  ],
  'paroxetina': [
    'paxil',
    'aropax',
    'paroxetine',
    'isrs',
  ],
  'venlafaxina': [
    'effexor',
    'venlafaxine',
    'irsn',
    'snri',
  ],
  'duloxetina': [
    'cymbalta',
    'duloxetine',
    'irsn',
  ],
  'bupropiona': [
    'wellbutrin',
    'zyban',
    'bupropion',
    'antidepressivo',
  ],
  'mirtazapina': [
    'remeron',
    'mirtazapine',
    'antidepressivo',
  ],
  'amitriptilina': [
    'tryptanol',
    'elavil',
    'amitriptyline',
    'tricíclico',
    'adc',
  ],
  'nortriptilina': [
    'pamelor',
    'nortriptyline',
    'tricíclico',
  ],
  'clonazepam': [
    'rivotril',
    'klonopin',
    'clonazepam',
    'benzodiazepínico',
    'benzo',
  ],
  'diazepam': [
    'valium',
    'diazepam',
    'benzodiazepínico',
  ],
  'alprazolam': [
    'frontal',
    'xanax',
    'alprazolam',
    'benzodiazepínico',
  ],
  'lorazepam': [
    'lorax',
    'ativan',
    'lorazepam',
    'benzodiazepínico',
  ],
  'zolpidem': [
    'stilnox',
    'ambien',
    'hipnótico',
    'indutor de sono',
  ],
  'quetiapina': [
    'seroquel',
    'quetiapine',
    'antipsicótico',
  ],
  'risperidona': [
    'risperdal',
    'risperidone',
    'antipsicótico',
  ],
  'haloperidol': [
    'haldol',
    'haloperidol',
    'antipsicótico típico',
  ],
  'olanzapina': [
    'zyprexa',
    'olanzapine',
    'antipsicótico',
  ],
  'lítio': [
    'carbolitium',
    'lithium',
    'estabilizador de humor',
  ],
  'valproato': [
    'depakene',
    'depakote',
    'ácido valproico',
    'valproic acid',
    'anticonvulsivante',
  ],
  'carbamazepina': [
    'tegretol',
    'carbamazepine',
    'anticonvulsivante',
  ],
  'lamotrigina': [
    'lamictal',
    'lamotrigine',
    'anticonvulsivante',
  ],
  'topiramato': [
    'topamax',
    'topiramate',
    'anticonvulsivante',
  ],
  'metilfenidato': [
    'ritalina',
    'concerta',
    'methylphenidate',
    'estimulante',
  ],

  // ============================================================================
  // MEDICATIONS - RESPIRATORY
  // ============================================================================
  'salbutamol': [
    'aerolin',
    'ventolin',
    'albuterol',
    'beta-2 agonista',
    'broncodilatador',
    'bombinha',
  ],
  'fenoterol': [
    'berotec',
    'beta-2 agonista',
    'broncodilatador',
  ],
  'ipratrópio': [
    'atrovent',
    'ipratropium',
    'anticolinérgico',
  ],
  'budesonida': [
    'pulmicort',
    'budesonide',
    'corticoide inalatório',
  ],
  'fluticasona': [
    'flixotide',
    'flovent',
    'fluticasone',
    'corticoide inalatório',
  ],
  'formoterol': [
    'foradil',
    'formoterol',
    'laba',
    'beta-2 agonista de longa duração',
  ],
  'salmeterol': [
    'serevent',
    'salmeterol',
    'laba',
  ],
  'montelucaste': [
    'singulair',
    'montelukast',
    'antileucotrieno',
  ],
  'acetilcisteína': [
    'fluimucil',
    'acetylcysteine',
    'mucolítico',
  ],
  'ambroxol': [
    'mucosolvan',
    'ambroxol',
    'mucolítico',
  ],
  'loratadina': [
    'claritin',
    'loratadine',
    'anti-histamínico',
    'antialérgico',
  ],
  'cetirizina': [
    'zyrtec',
    'cetirizine',
    'anti-histamínico',
  ],
  'fexofenadina': [
    'allegra',
    'fexofenadine',
    'anti-histamínico',
  ],
  'dexclorfeniramina': [
    'polaramine',
    'anti-histamínico',
  ],
  'prometazina': [
    'fenergan',
    'promethazine',
    'anti-histamínico',
  ],

  // ============================================================================
  // MEDICATIONS - OTHER
  // ============================================================================
  'alopurinol': [
    'zyloric',
    'allopurinol',
    'antigotoso',
    'inibidor da xantina oxidase',
  ],
  'colchicina': [
    'colchicine',
    'antigotoso',
  ],
  'gabapentina': [
    'neurontin',
    'gabapentin',
    'anticonvulsivante',
    'dor neuropática',
  ],
  'pregabalina': [
    'lyrica',
    'pregabalin',
    'anticonvulsivante',
  ],
  'sildenafila': [
    'viagra',
    'sildenafil',
    'inibidor de pde5',
  ],
  'tadalafila': [
    'cialis',
    'tadalafil',
    'inibidor de pde5',
  ],
  'finasterida': [
    'proscar',
    'propecia',
    'finasteride',
    'inibidor 5-alfa redutase',
  ],
  'tansulosina': [
    'flomax',
    'tamsulosin',
    'bloqueador alfa',
    'hpb',
  ],
  'doxazosina': [
    'carduran',
    'doxazosin',
    'bloqueador alfa',
  ],
  'metotrexato': [
    'methotrexate',
    'mtx',
    'imunossupressor',
    'dmard',
  ],
  'azatioprina': [
    'imuran',
    'azathioprine',
    'imunossupressor',
  ],
  'ciclosporina': [
    'sandimmun',
    'cyclosporine',
    'imunossupressor',
  ],
  'micofenolato': [
    'cellcept',
    'mycophenolate',
    'imunossupressor',
  ],
  'hidroquinina': [
    'plaquenil',
    'hidroxicloroquina',
    'hydroxychloroquine',
    'dmard',
  ],
  'sulfassalazina': [
    'azulfin',
    'sulfasalazine',
    'dmard',
  ],
  'leflunomida': [
    'arava',
    'leflunomide',
    'dmard',
  ],
  'bifosfonato': [
    'alendronato',
    'fosamax',
    'alendronate',
    'risedronato',
    'actonel',
    'anti-reabsortivo ósseo',
  ],
  'cálcio': [
    'calcium',
    'carbonato de cálcio',
    'citrato de cálcio',
    'suplemento',
  ],
  'vitamina d': [
    'colecalciferol',
    'ergocalciferol',
    'd3',
    'cholecalciferol',
    'suplemento',
  ],
  'ácido fólico': [
    'folacin',
    'folic acid',
    'vitamina b9',
    'suplemento',
  ],
  'ferro': [
    'sulfato ferroso',
    'iron',
    'ferrous sulfate',
    'suplemento',
  ],
  'vitamina b12': [
    'cianocobalamina',
    'cobalamin',
    'cyanocobalamin',
  ],
  'ivermectina': [
    'ivermectin',
    'antiparasitário',
    'vermífugo',
  ],
  'albendazol': [
    'zentel',
    'albendazole',
    'antiparasitário',
    'vermífugo',
  ],
  'mebendazol': [
    'vermox',
    'mebendazole',
    'antiparasitário',
  ],
  'secnidazol': [
    'secnidal',
    'secnidazole',
    'antiparasitário',
  ],
  'fluconazol': [
    'diflucan',
    'fluconazole',
    'antifúngico',
  ],
  'nistatina': [
    'micostatin',
    'nystatin',
    'antifúngico',
  ],
  'aciclovir': [
    'zovirax',
    'acyclovir',
    'antiviral',
  ],
  'oseltamivir': [
    'tamiflu',
    'oseltamivir',
    'antiviral',
  ],

  // ============================================================================
  // SYMPTOMS - GENERAL
  // ============================================================================
  'dor': [
    'algia',
    'desconforto',
    'mal-estar',
    'dolor',
    'pain',
    'dolorimento',
  ],
  'febre': [
    'pirexia',
    'hipertermia',
    'temperatura elevada',
    'calafrios',
    'fever',
    'estado febril',
  ],
  'tosse': [
    'tosse seca',
    'tosse produtiva',
    'tosse com expectoração',
    'tosse persistente',
    'cough',
  ],
  'náusea': [
    'enjoo',
    'enjoamento',
    'náuseas',
    'mal-estar gástrico',
    'nausea',
  ],
  'vômito': [
    'vômitos',
    'emese',
    'vomitar',
    'regurgitação',
    'vomiting',
  ],
  'diarreia': [
    'evacuações líquidas',
    'fezes líquidas',
    'diarréia',
    'enterite',
    'diarrhea',
  ],
  'constipação': [
    'prisão de ventre',
    'obstipação',
    'constipação intestinal',
    'intestino preso',
    'constipation',
  ],
  'tontura': [
    'vertigem',
    'labirintite',
    'tonturas',
    'instabilidade',
    'dizziness',
  ],
  'dispneia': [
    'falta de ar',
    'cansaço',
    'fadiga respiratória',
    'dificuldade para respirar',
    'respiração curta',
    'dyspnea',
    'shortness of breath',
  ],
  'fadiga': [
    'cansaço',
    'astenia',
    'fraqueza',
    'fatigue',
    'exaustão',
  ],
  'edema': [
    'inchaço',
    'retenção de líquido',
    'swelling',
    'edema periférico',
  ],
  'prurido': [
    'coceira',
    'itching',
    'itch',
    'comichão',
  ],
  'eritema': [
    'vermelhidão',
    'rubor',
    'redness',
    'hiperemia',
  ],
  'icterícia': [
    'amarelão',
    'pele amarela',
    'jaundice',
    'hiperbilirrubinemia',
  ],
  'cianose': [
    'coloração azulada',
    'cyanosis',
    'lábios roxos',
  ],
  'palidez': [
    'pele pálida',
    'pallor',
    'descoramento',
  ],
  'sudorese': [
    'suor excessivo',
    'transpiração',
    'sweating',
    'diaforese',
  ],
  'palpitação': [
    'palpitações',
    'coração acelerado',
    'palpitations',
    'taquicardia',
  ],
  'síncope': [
    'desmaio',
    'perda de consciência',
    'syncope',
    'fainting',
  ],
  'parestesia': [
    'formigamento',
    'dormência',
    'tingling',
    'numbness',
  ],
  'artralgia': [
    'dor articular',
    'dor nas juntas',
    'joint pain',
  ],
  'mialgia': [
    'dor muscular',
    'muscle pain',
    'dor no corpo',
  ],
  'polidipsia': [
    'sede excessiva',
    'muita sede',
    'excessive thirst',
  ],
  'poliúria': [
    'urinar muito',
    'aumento da diurese',
    'frequent urination',
  ],
  'polifagia': [
    'fome excessiva',
    'muita fome',
    'excessive hunger',
  ],
  'disúria': [
    'dor ao urinar',
    'ardência ao urinar',
    'painful urination',
  ],
  'hematúria': [
    'sangue na urina',
    'blood in urine',
    'urina com sangue',
  ],
  'melena': [
    'fezes escuras',
    'fezes pretas',
    'sangue digerido nas fezes',
  ],
  'hematêmese': [
    'vômito com sangue',
    'vomiting blood',
    'sangramento digestivo alto',
  ],
  'hemoptise': [
    'tosse com sangue',
    'coughing blood',
    'sangue no escarro',
  ],
  'epistaxe': [
    'sangramento nasal',
    'nosebleed',
    'hemorragia nasal',
  ],
  'diplopia': [
    'visão dupla',
    'double vision',
    'visão duplicada',
  ],
  'fotofobia': [
    'sensibilidade à luz',
    'light sensitivity',
    'intolerância à luz',
  ],
  'otalgia': [
    'dor de ouvido',
    'ear pain',
    'dor no ouvido',
  ],
  'odinofagia': [
    'dor ao engolir',
    'painful swallowing',
    'dificuldade para engolir',
  ],
  'disfagia': [
    'dificuldade de engolir',
    'difficulty swallowing',
    'engasgo',
  ],

  // ============================================================================
  // EXAMS & PROCEDURES
  // ============================================================================
  'hemograma': [
    'hemograma completo',
    'hcmg',
    'cbc',
    'exame de sangue completo',
    'complete blood count',
  ],
  'glicemia': [
    'glicose',
    'glicemia de jejum',
    'glicemia casual',
    'glicose sérica',
    'blood glucose',
  ],
  'hemoglobina glicada': [
    'hba1c',
    'hemoglobina glicosilada',
    'glicohemoglobina',
    'a1c',
    'glycated hemoglobin',
  ],
  'colesterol total': [
    'colesterol',
    'ct',
    'colesterol sérico',
    'colesteremia',
    'total cholesterol',
  ],
  'hdl': [
    'colesterol bom',
    'hdl-c',
    'colesterol hdl',
    'high-density lipoprotein',
  ],
  'ldl': [
    'colesterol ruim',
    'ldl-c',
    'colesterol ldl',
    'low-density lipoprotein',
  ],
  'triglicerídeos': [
    'triglicérides',
    'tg',
    'triglycerides',
    'triglicérideos',
  ],
  'creatinina': [
    'creatinina sérica',
    'cr',
    'creatininemia',
    'creatinine',
  ],
  'ureia': [
    'bun',
    'nitrogênio ureico',
    'urea',
    'azotemia',
  ],
  'taxa de filtração glomerular': [
    'tfg',
    'gfr',
    'clearance de creatinina',
    'glomerular filtration rate',
  ],
  'tgo': [
    'ast',
    'aspartato aminotransferase',
    'transaminase glutâmico-oxalacética',
    'sgot',
  ],
  'tgp': [
    'alt',
    'alanina aminotransferase',
    'transaminase glutâmico-pirúvica',
    'sgpt',
  ],
  'fosfatase alcalina': [
    'fa',
    'alp',
    'alkaline phosphatase',
  ],
  'gama gt': [
    'ggt',
    'gama glutamil transferase',
    'gamma-glutamyl transferase',
  ],
  'bilirrubina': [
    'bilirrubinas',
    'bilirrubina total',
    'bilirrubina direta',
    'bilirrubina indireta',
    'bilirubin',
  ],
  'albumina': [
    'albumina sérica',
    'albumin',
  ],
  'proteínas totais': [
    'proteinemia',
    'total protein',
  ],
  'sódio': [
    'na',
    'natremia',
    'sodium',
  ],
  'potássio': [
    'k',
    'calemia',
    'potassium',
  ],
  'cálcio sérico': [
    'ca',
    'calcemia',
    'calcium',
  ],
  'magnésio': [
    'mg',
    'magnesemia',
    'magnesium',
  ],
  'fósforo': [
    'p',
    'fosfatemia',
    'phosphorus',
  ],
  'ácido úrico': [
    'uricemia',
    'uric acid',
  ],
  'pcr': [
    'proteína c reativa',
    'c-reactive protein',
    'crp',
  ],
  'vhs': [
    'velocidade de hemossedimentação',
    'esr',
    'erythrocyte sedimentation rate',
  ],
  'tsh': [
    'hormônio tireoestimulante',
    'thyroid stimulating hormone',
    'tirotropina',
  ],
  't4 livre': [
    't4l',
    'tiroxina livre',
    'free t4',
  ],
  't3': [
    'triiodotironina',
    'triiodothyronine',
  ],
  'psa': [
    'antígeno prostático específico',
    'prostate-specific antigen',
  ],
  'exame de urina': [
    'eas',
    'urinálise',
    'urinalysis',
    'exame de urina tipo 1',
    'urina rotina',
  ],
  'urocultura': [
    'cultura de urina',
    'urine culture',
  ],
  'hemocultura': [
    'cultura de sangue',
    'blood culture',
  ],
  'tempo de protrombina': [
    'tp',
    'tap',
    'inr',
    'prothrombin time',
    'coagulograma',
  ],
  'ttpa': [
    'tempo de tromboplastina parcial ativada',
    'ptt',
    'aptt',
  ],
  'eletrocardiograma': [
    'ecg',
    'eletro',
    'eletrocardiografia',
    'ekg',
    'electrocardiogram',
  ],
  'ecocardiograma': [
    'eco',
    'ecocardiografia',
    'echocardiogram',
    'eco de coração',
  ],
  'holter': [
    'holter 24h',
    'monitorização cardíaca',
    'holter monitoring',
  ],
  'mapa': [
    'monitorização ambulatorial da pressão arterial',
    'ambulatory blood pressure monitoring',
    'abpm',
  ],
  'teste ergométrico': [
    'teste de esforço',
    'esteira',
    'exercise stress test',
    'ergometria',
  ],
  'cateterismo cardíaco': [
    'cineangiocoronariografia',
    'cate',
    'coronariografia',
    'cardiac catheterization',
  ],
  'ultrassom': [
    'ultrassonografia',
    'ecografia',
    'us',
    'usg',
    'ultrasound',
  ],
  'tomografia computadorizada': [
    'tc',
    'ct',
    'tomografia',
    'computed tomography',
    'ct scan',
  ],
  'ressonância magnética': [
    'rm',
    'mri',
    'rnm',
    'magnetic resonance imaging',
  ],
  'radiografia': [
    'raio-x',
    'rx',
    'x-ray',
    'radiografia simples',
  ],
  'mamografia': [
    'mammography',
    'exame de mama',
    'rastreamento de mama',
  ],
  'densitometria óssea': [
    'dxa',
    'dexa',
    'bone densitometry',
    'exame de densidade óssea',
  ],
  'colonoscopia': [
    'colonoscopy',
    'exame do cólon',
    'endoscopia baixa',
  ],
  'endoscopia digestiva alta': [
    'eda',
    'esofagogastroduodenoscopia',
    'egda',
    'upper endoscopy',
  ],
  'broncoscopia': [
    'bronchoscopy',
    'exame dos brônquios',
  ],
  'biópsia': [
    'biopsy',
    'biópsia de tecido',
  ],
  'papanicolaou': [
    'preventivo',
    'citologia cervical',
    'pap smear',
    'exame preventivo',
  ],
  'espirometria': [
    'prova de função pulmonar',
    'pfp',
    'spirometry',
    'função pulmonar',
  ],
  'polissonografia': [
    'exame do sono',
    'polysomnography',
    'psg',
  ],
  'eletroencefalograma': [
    'eeg',
    'electroencephalogram',
    'exame de ondas cerebrais',
  ],
  'eletroneuromiografia': [
    'enmg',
    'emg',
    'electromyography',
  ],
  'punção lombar': [
    'líquor',
    'lcr',
    'lumbar puncture',
    'raquicentese',
  ],
  'gasometria arterial': [
    'gasometria',
    'arterial blood gas',
    'abg',
  ],
  'd-dímero': [
    'd-dimer',
    'dímero d',
    'marcador de trombose',
  ],
  'troponina': [
    'troponina cardíaca',
    'cardiac troponin',
    'marcador de infarto',
  ],
  'bnp': [
    'peptídeo natriurético cerebral',
    'nt-probnp',
    'brain natriuretic peptide',
    'marcador de insuficiência cardíaca',
  ],

  // ============================================================================
  // ANATOMICAL TERMS
  // ============================================================================
  'coração': [
    'heart',
    'cardíaco',
    'cor',
    'órgão cardíaco',
  ],
  'pulmão': [
    'lung',
    'pulmonar',
    'pulmões',
  ],
  'fígado': [
    'liver',
    'hepático',
    'órgão hepático',
  ],
  'rim': [
    'kidney',
    'renal',
    'rins',
  ],
  'estômago': [
    'stomach',
    'gástrico',
    'ventre',
  ],
  'intestino': [
    'intestine',
    'bowel',
    'intestinal',
    'entérico',
  ],
  'cérebro': [
    'brain',
    'cerebral',
    'encéfalo',
  ],
  'medula espinhal': [
    'spinal cord',
    'medula',
    'raquimedular',
  ],
  'osso': [
    'bone',
    'ósseo',
    'esquelético',
  ],
  'músculo': [
    'muscle',
    'muscular',
    'miofascial',
  ],
  'articulação': [
    'joint',
    'articular',
    'junta',
  ],
  'pele': [
    'skin',
    'cutâneo',
    'dérmico',
    'epiderme',
  ],
  'sangue': [
    'blood',
    'sanguíneo',
    'hemático',
  ],
  'veia': [
    'vein',
    'venoso',
    'venosa',
  ],
  'artéria': [
    'artery',
    'arterial',
  ],
  'linfonodo': [
    'gânglio linfático',
    'lymph node',
    'íngua',
  ],
  'tireóide': [
    'tireoide',
    'thyroid',
    'glândula tireoide',
  ],
  'próstata': [
    'prostate',
    'prostático',
    'glândula prostática',
  ],
  'útero': [
    'uterus',
    'uterino',
    'matriz',
  ],
  'ovário': [
    'ovary',
    'ovariano',
    'ovários',
  ],
  'mama': [
    'breast',
    'mamário',
    'seio',
    'mamas',
  ],
  'testículo': [
    'testicle',
    'testicular',
    'testículos',
  ],
  'bexiga': [
    'bladder',
    'vesical',
    'bexiga urinária',
  ],
  'vesícula biliar': [
    'gallbladder',
    'vesícula',
    'colecisto',
  ],
  'pâncreas': [
    'pancreas',
    'pancreático',
  ],
  'baço': [
    'spleen',
    'esplênico',
  ],
  'esôfago': [
    'esophagus',
    'esofágico',
  ],
  'coluna vertebral': [
    'spine',
    'espinha',
    'vertebral',
    'coluna',
  ],
  'crânio': [
    'skull',
    'craniano',
    'caixa craniana',
  ],
  'abdômen': [
    'abdomen',
    'abdominal',
    'barriga',
    'ventre',
  ],
  'tórax': [
    'thorax',
    'torácico',
    'peito',
    'chest',
  ],
  'pelve': [
    'pelvis',
    'pélvico',
    'bacia',
  ],

  // ============================================================================
  // CLINICAL ABBREVIATIONS
  // ============================================================================
  'sinais vitais': [
    'ssvv',
    'vital signs',
    'pa fc fr temp spo2',
  ],
  'pressão arterial': [
    'pa',
    'blood pressure',
    'bp',
    'pressão sanguínea',
  ],
  'frequência cardíaca': [
    'fc',
    'heart rate',
    'hr',
    'pulso',
    'batimentos cardíacos',
    'bpm',
  ],
  'frequência respiratória': [
    'fr',
    'respiratory rate',
    'rr',
    'incursões respiratórias',
    'irpm',
  ],
  'temperatura': [
    'temp',
    't',
    'tax',
    'temperatura axilar',
    'temperature',
  ],
  'saturação de oxigênio': [
    'spo2',
    'sat o2',
    'saturação',
    'oxygen saturation',
    'oximetria',
  ],
  'índice de massa corporal': [
    'imc',
    'bmi',
    'body mass index',
  ],
  'história da doença atual': [
    'hda',
    'hpi',
    'history of present illness',
  ],
  'história patológica pregressa': [
    'hpp',
    'pmh',
    'past medical history',
    'antecedentes patológicos',
  ],
  'história familiar': [
    'hf',
    'family history',
    'antecedentes familiares',
  ],
  'história social': [
    'hs',
    'social history',
    'hábitos de vida',
  ],
  'revisão de sistemas': [
    'rs',
    'ros',
    'review of systems',
  ],
  'exame físico': [
    'ef',
    'physical examination',
    'pe',
  ],
  'nada digno de nota': [
    'ndn',
    'nothing remarkable',
    'sem alterações',
    'normal',
  ],
  'sem particularidades': [
    'sp',
    'unremarkable',
    'nada a declarar',
  ],
  'diagnóstico diferencial': [
    'dd',
    'differential diagnosis',
    'ddx',
  ],
  'diagnóstico': [
    'dx',
    'diagnosis',
    'hipótese diagnóstica',
    'hd',
  ],
  'tratamento': [
    'tx',
    'treatment',
    'terapêutica',
  ],
  'prescrição': [
    'rx',
    'prescription',
    'receita',
  ],
  'via oral': [
    'vo',
    'po',
    'per os',
    'oral',
  ],
  'via intravenosa': [
    'iv',
    'ev',
    'endovenosa',
    'intravenous',
  ],
  'via intramuscular': [
    'im',
    'intramuscular',
  ],
  'via subcutânea': [
    'sc',
    'subcutaneous',
    'subcutânea',
  ],
  'a cada': [
    'de',
    'every',
    'q',
  ],
  'de 8 em 8 horas': [
    '8/8h',
    'q8h',
    'tid',
    '3x ao dia',
    'três vezes ao dia',
  ],
  'de 12 em 12 horas': [
    '12/12h',
    'q12h',
    'bid',
    '2x ao dia',
    'duas vezes ao dia',
  ],
  'de 6 em 6 horas': [
    '6/6h',
    'q6h',
    'qid',
    '4x ao dia',
    'quatro vezes ao dia',
  ],
  'uma vez ao dia': [
    '1x/dia',
    'qd',
    'od',
    'daily',
    'diariamente',
  ],
  'se necessário': [
    'sn',
    'prn',
    'as needed',
    'se precisar',
  ],
  'antes das refeições': [
    'ac',
    'ante cibum',
    'antes de comer',
  ],
  'após as refeições': [
    'pc',
    'post cibum',
    'depois de comer',
  ],
  'em jejum': [
    'ej',
    'fasting',
    'jejum',
  ],
  'unidade de terapia intensiva': [
    'uti',
    'icu',
    'intensive care unit',
    'cti',
  ],
  'pronto-socorro': [
    'ps',
    'pa',
    'pronto-atendimento',
    'emergency room',
    'er',
  ],
  'ambulatório': [
    'amb',
    'outpatient',
    'consultório',
  ],
  'internação': [
    'int',
    'hospitalization',
    'admissão',
  ],
  'alta hospitalar': [
    'alta',
    'discharge',
    'alta médica',
  ],
  'óbito': [
    'death',
    'falecimento',
    'morte',
  ],
  'reanimação cardiopulmonar': [
    'rcp',
    'cpr',
    'cardiopulmonary resuscitation',
    'ressuscitação',
  ],
};

/**
 * Reverse mapping: synonym -> canonical term
 */
export const SYNONYM_TO_CANONICAL_PT: Record<string, string> = {};

// Build reverse mapping
Object.entries(MEDICAL_SYNONYMS_PT).forEach(([canonical, synonyms]) => {
  SYNONYM_TO_CANONICAL_PT[canonical.toLowerCase()] = canonical;
  synonyms.forEach((synonym) => {
    SYNONYM_TO_CANONICAL_PT[synonym.toLowerCase()] = canonical;
  });
});

/**
 * Get total count of unique terms for statistics
 */
export function getSynonymStatistics(): { canonicalTerms: number; totalSynonyms: number; totalMappings: number } {
  const canonicalTerms = Object.keys(MEDICAL_SYNONYMS_PT).length;
  const totalSynonyms = Object.values(MEDICAL_SYNONYMS_PT).reduce((sum, arr) => sum + arr.length, 0);
  return {
    canonicalTerms,
    totalSynonyms,
    totalMappings: canonicalTerms + totalSynonyms,
  };
}

/**
 * Normalize text for search
 */
export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .trim();
}

/**
 * Expand query with synonyms
 */
export function expandQueryWithSynonyms(query: string, language: 'pt' | 'en' = 'pt'): string[] {
  const normalizedQuery = normalizeSearchText(query);
  const expanded: string[] = [query]; // Original query

  // Check if query is a synonym
  const canonical = SYNONYM_TO_CANONICAL_PT[normalizedQuery];
  if (canonical) {
    expanded.push(canonical);
    // Also add all synonyms of the canonical term
    const synonyms = MEDICAL_SYNONYMS_PT[canonical] || [];
    expanded.push(...synonyms);
  } else {
    // Check if query contains any synonym as substring
    Object.entries(SYNONYM_TO_CANONICAL_PT).forEach(([synonym, canonical]) => {
      if (normalizedQuery.includes(synonym) || synonym.includes(normalizedQuery)) {
        expanded.push(canonical);
        const synonyms = MEDICAL_SYNONYMS_PT[canonical] || [];
        expanded.push(...synonyms);
      }
    });
  }

  // Remove duplicates
  return Array.from(new Set(expanded));
}

/**
 * Find canonical term for a given synonym
 */
export function getCanonicalTerm(term: string, language: 'pt' | 'en' = 'pt'): string | null {
  const normalized = normalizeSearchText(term);
  return SYNONYM_TO_CANONICAL_PT[normalized] || null;
}

/**
 * Get all synonyms for a given term (including the canonical term)
 */
export function getAllSynonyms(term: string): string[] {
  const normalized = normalizeSearchText(term);
  const canonical = SYNONYM_TO_CANONICAL_PT[normalized];

  if (!canonical) {
    return [term];
  }

  const synonyms = MEDICAL_SYNONYMS_PT[canonical] || [];
  return [canonical, ...synonyms];
}

/**
 * Check if two terms are synonyms of each other
 */
export function areSynonyms(term1: string, term2: string): boolean {
  const canonical1 = getCanonicalTerm(term1);
  const canonical2 = getCanonicalTerm(term2);

  if (!canonical1 || !canonical2) {
    return false;
  }

  return canonical1 === canonical2;
}

/**
 * Search for terms that match a partial query
 */
export function searchSynonyms(partialQuery: string, limit: number = 10): string[] {
  const normalized = normalizeSearchText(partialQuery);
  const results: string[] = [];

  for (const [synonym, canonical] of Object.entries(SYNONYM_TO_CANONICAL_PT)) {
    if (synonym.includes(normalized) || normalized.includes(synonym)) {
      if (!results.includes(canonical)) {
        results.push(canonical);
        if (results.length >= limit) break;
      }
    }
  }

  return results;
}
