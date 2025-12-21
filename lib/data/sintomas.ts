/**
 * DATABASE DE SINTOMAS - DARWIN-MFC
 * ==================================
 * Sintomas para diagnóstico diferencial na APS
 *
 * Estrutura:
 * - 100+ sintomas organizados por categoria
 * - Mapeamento para doenças relacionadas
 * - Peso diagnóstico (importância do sintoma)
 * - Red flags associados
 */

export type CategoriaSintoma =
  | 'geral'
  | 'respiratorio'
  | 'cardiovascular'
  | 'gastrointestinal'
  | 'neurologico'
  | 'dermatologico'
  | 'urologico'
  | 'ginecologico'
  | 'musculoesqueletico'
  | 'oftalmologico'
  | 'otorrinolaringologico'
  | 'psiquiatrico'
  | 'endocrino'
  | 'hematologico';

export interface Sintoma {
  id: string;
  nome: string;
  sinonimos: string[];
  categoria: CategoriaSintoma;
  importancia: 'alta' | 'media' | 'baixa';
  doencasRelacionadas: string[];
  peso: number; // 0-1, peso na decisão diagnóstica
  redFlags?: string[]; // Sinais de alarme quando presente
  perguntasChave?: string[]; // Perguntas para caracterizar melhor
}

export const sintomasDatabase: Sintoma[] = [
  // ========================================
  // SINTOMAS GERAIS (10)
  // ========================================
  {
    id: 'febre',
    nome: 'Febre',
    sinonimos: ['temperatura elevada', 'pirexia', 'hipertermia'],
    categoria: 'geral',
    importancia: 'alta',
    doencasRelacionadas: ['gripe', 'pneumonia', 'itu', 'gastroenterite-viral', 'tuberculose', 'dengue', 'covid-19', 'meningite', 'endocardite', 'apendicite'],
    peso: 0.8,
    redFlags: ['Febre >39°C persistente', 'Rigidez de nuca', 'Petéquias', 'Imunossupressão'],
    perguntasChave: ['Há quanto tempo?', 'Qual a temperatura máxima?', 'Padrão (contínua, intermitente)?', 'Sintomas associados?']
  },
  {
    id: 'fadiga',
    nome: 'Fadiga',
    sinonimos: ['cansaço', 'astenia', 'fraqueza', 'exaustão'],
    categoria: 'geral',
    importancia: 'media',
    doencasRelacionadas: ['anemia-ferropriva', 'hipotireoidismo', 'depressao', 'diabetes-mellitus-2', 'insuficiencia-cardiaca', 'dpoc', 'fibromialgia', 'apneia-sono'],
    peso: 0.5,
    redFlags: ['Perda de peso associada', 'Fadiga incapacitante', 'Febre concomitante'],
    perguntasChave: ['Início súbito ou gradual?', 'Melhora com repouso?', 'Afeta atividades diárias?', 'Alteração do sono?']
  },
  {
    id: 'perda-peso',
    nome: 'Perda de Peso',
    sinonimos: ['emagrecimento', 'perda ponderal', 'weight loss'],
    categoria: 'geral',
    importancia: 'alta',
    doencasRelacionadas: ['diabetes-mellitus-2', 'hipertireoidismo', 'tuberculose', 'neoplasia', 'depressao', 'anorexia-nervosa', 'doenca-inflamatoria-intestinal'],
    peso: 0.85,
    redFlags: ['Perda >5% em 1 mês', 'Perda não intencional', 'Associada a sudorese noturna'],
    perguntasChave: ['Quanto perdeu?', 'Em quanto tempo?', 'Intencional?', 'Alteração do apetite?']
  },
  {
    id: 'ganho-peso',
    nome: 'Ganho de Peso',
    sinonimos: ['aumento de peso', 'engorda'],
    categoria: 'geral',
    importancia: 'media',
    doencasRelacionadas: ['hipotireoidismo', 'sindrome-cushing', 'obesidade', 'sindrome-metabolica', 'insuficiencia-cardiaca', 'sindrome-ovarios-policisticos'],
    peso: 0.5,
    perguntasChave: ['Quanto ganhou?', 'Em quanto tempo?', 'Alteração do apetite?', 'Edema associado?']
  },
  {
    id: 'sudorese-noturna',
    nome: 'Sudorese Noturna',
    sinonimos: ['suor noturno', 'night sweats'],
    categoria: 'geral',
    importancia: 'alta',
    doencasRelacionadas: ['tuberculose', 'linfoma', 'endocardite', 'hipertireoidismo', 'menopausa-climaterio', 'apneia-sono'],
    peso: 0.8,
    redFlags: ['Perda de peso associada', 'Febre', 'Linfonodomegalias'],
    perguntasChave: ['Frequência?', 'Quantidade (troca de roupa)?', 'Febre associada?', 'Perda de peso?']
  },
  {
    id: 'calafrios',
    nome: 'Calafrios',
    sinonimos: ['tremores', 'arrepios', 'rigor'],
    categoria: 'geral',
    importancia: 'alta',
    doencasRelacionadas: ['gripe', 'pneumonia', 'pielonefrite', 'colangite', 'malaria', 'bacteremia'],
    peso: 0.75,
    redFlags: ['Calafrios com rigidez', 'Hipotensão associada', 'Alteração de consciência'],
    perguntasChave: ['Associado a febre?', 'Frequência?', 'Viagem recente?']
  },
  {
    id: 'mal-estar',
    nome: 'Mal-estar Geral',
    sinonimos: ['indisposição', 'sensação de doença'],
    categoria: 'geral',
    importancia: 'baixa',
    doencasRelacionadas: ['gripe', 'resfriado', 'gastroenterite-viral', 'anemia-ferropriva', 'hipotireoidismo'],
    peso: 0.3,
    perguntasChave: ['Início súbito ou gradual?', 'Outros sintomas?', 'Febre?']
  },
  {
    id: 'linfonodomegalia',
    nome: 'Linfonodomegalia',
    sinonimos: ['íngua', 'gânglio aumentado', 'adenomegalia'],
    categoria: 'geral',
    importancia: 'alta',
    doencasRelacionadas: ['mononucleose', 'tuberculose', 'linfoma', 'hiv', 'toxoplasmose', 'infeccao-local'],
    peso: 0.75,
    redFlags: ['Linfonodo >2cm', 'Endurecido e aderido', 'Supraclavicular', 'Progressão rápida'],
    perguntasChave: ['Localização?', 'Tamanho?', 'Doloroso?', 'Há quanto tempo?', 'Outros sintomas?']
  },
  {
    id: 'edema',
    nome: 'Edema',
    sinonimos: ['inchaço', 'retenção de líquidos', 'intumescimento'],
    categoria: 'geral',
    importancia: 'alta',
    doencasRelacionadas: ['insuficiencia-cardiaca', 'insuficiencia-renal', 'cirrose', 'tvp', 'hipotireoidismo', 'insuficiencia-venosa'],
    peso: 0.8,
    redFlags: ['Edema unilateral + dor (TVP)', 'Edema facial matinal (renal)', 'Anasarca'],
    perguntasChave: ['Localização?', 'Simétrico?', 'Piora no fim do dia?', 'Deixa cacifo?', 'Dispneia associada?']
  },
  {
    id: 'anorexia',
    nome: 'Anorexia (Perda de Apetite)',
    sinonimos: ['inapetência', 'falta de apetite', 'hiporexia'],
    categoria: 'geral',
    importancia: 'media',
    doencasRelacionadas: ['depressao', 'neoplasia', 'hepatite', 'insuficiencia-renal', 'tuberculose', 'insuficiencia-cardiaca'],
    peso: 0.5,
    redFlags: ['Perda de peso >10%', 'Associada a febre', 'Icterícia'],
    perguntasChave: ['Há quanto tempo?', 'Alteração do paladar?', 'Saciedade precoce?', 'Perda de peso?']
  },

  // ========================================
  // SINTOMAS RESPIRATÓRIOS (12)
  // ========================================
  {
    id: 'tosse',
    nome: 'Tosse',
    sinonimos: ['tussis'],
    categoria: 'respiratorio',
    importancia: 'alta',
    doencasRelacionadas: ['gripe', 'resfriado', 'pneumonia', 'asma', 'dpoc', 'tuberculose', 'drge', 'insuficiencia-cardiaca', 'coqueluche', 'bronquite-aguda'],
    peso: 0.7,
    redFlags: ['Hemoptise', 'Tosse >3 semanas', 'Perda de peso', 'Febre persistente'],
    perguntasChave: ['Duração?', 'Produtiva ou seca?', 'Característica da secreção?', 'Piora noturna?', 'Gatilhos?']
  },
  {
    id: 'dispneia',
    nome: 'Dispneia',
    sinonimos: ['falta de ar', 'dificuldade para respirar', 'cansaço aos esforços'],
    categoria: 'respiratorio',
    importancia: 'alta',
    doencasRelacionadas: ['asma', 'dpoc', 'pneumonia', 'insuficiencia-cardiaca', 'embolia-pulmonar', 'ansiedade', 'anemia-ferropriva', 'pneumotorax'],
    peso: 0.9,
    redFlags: ['Início súbito', 'Dor torácica', 'Cianose', 'Alteração de consciência', 'Estridor'],
    perguntasChave: ['Início súbito ou gradual?', 'Aos esforços ou em repouso?', 'Ortopneia?', 'DPN?', 'Sibilos?']
  },
  {
    id: 'sibilancia',
    nome: 'Sibilância',
    sinonimos: ['chiado', 'piado', 'wheezing'],
    categoria: 'respiratorio',
    importancia: 'alta',
    doencasRelacionadas: ['asma', 'dpoc', 'bronquiolite', 'insuficiencia-cardiaca', 'anafilaxia'],
    peso: 0.85,
    redFlags: ['Cianose', 'Uso de musculatura acessória', 'Incapacidade de falar frases'],
    perguntasChave: ['Recorrente?', 'Gatilhos identificados?', 'História de atopia?', 'Resposta a broncodilatador?']
  },
  {
    id: 'hemoptise',
    nome: 'Hemoptise',
    sinonimos: ['sangue na tosse', 'escarro com sangue'],
    categoria: 'respiratorio',
    importancia: 'alta',
    doencasRelacionadas: ['tuberculose', 'bronquiectasia', 'embolia-pulmonar', 'neoplasia-pulmonar', 'pneumonia'],
    peso: 0.95,
    redFlags: ['Volume >100mL/dia', 'Instabilidade hemodinâmica', 'Insuficiência respiratória'],
    perguntasChave: ['Volume?', 'Sangue vivo ou escuro?', 'Misturado com escarro?', 'Tabagismo?']
  },
  {
    id: 'expectoracao',
    nome: 'Expectoração',
    sinonimos: ['escarro', 'catarro', 'secreção'],
    categoria: 'respiratorio',
    importancia: 'media',
    doencasRelacionadas: ['bronquite-aguda', 'pneumonia', 'dpoc', 'bronquiectasia', 'tuberculose'],
    peso: 0.6,
    perguntasChave: ['Cor (clara, amarela, verde, com sangue)?', 'Volume?', 'Odor?', 'Há quanto tempo?']
  },
  {
    id: 'coriza',
    nome: 'Coriza',
    sinonimos: ['rinorreia', 'nariz escorrendo', 'secreção nasal'],
    categoria: 'respiratorio',
    importancia: 'baixa',
    doencasRelacionadas: ['resfriado', 'gripe', 'rinite-alergica', 'sinusite'],
    peso: 0.4,
    perguntasChave: ['Secreção clara ou purulenta?', 'Espirros?', 'Prurido nasal?', 'Sazonalidade?']
  },
  {
    id: 'obstrucao-nasal',
    nome: 'Obstrução Nasal',
    sinonimos: ['nariz entupido', 'congestão nasal'],
    categoria: 'respiratorio',
    importancia: 'baixa',
    doencasRelacionadas: ['rinite-alergica', 'sinusite', 'resfriado', 'desvio-septo', 'polipose-nasal'],
    peso: 0.4,
    perguntasChave: ['Uni ou bilateral?', 'Intermitente ou constante?', 'Rinorreia associada?', 'Roncos?']
  },
  {
    id: 'espirros',
    nome: 'Espirros',
    sinonimos: ['esternutação'],
    categoria: 'respiratorio',
    importancia: 'baixa',
    doencasRelacionadas: ['rinite-alergica', 'resfriado', 'gripe'],
    peso: 0.3,
    perguntasChave: ['Em salvas?', 'Gatilhos (poeira, pólen)?', 'Prurido nasal?', 'Sazonalidade?']
  },
  {
    id: 'dor-garganta',
    nome: 'Dor de Garganta',
    sinonimos: ['odinofagia', 'garganta inflamada'],
    categoria: 'respiratorio',
    importancia: 'media',
    doencasRelacionadas: ['faringite-aguda', 'amigdalite', 'mononucleose', 'gripe', 'resfriado', 'drge'],
    peso: 0.7,
    redFlags: ['Trismo', 'Abaulamento unilateral (abscesso)', 'Disfagia grave', 'Estridor'],
    perguntasChave: ['Febre associada?', 'Exsudato?', 'Linfonodomegalia cervical?', 'Duração?']
  },
  {
    id: 'rouquidao',
    nome: 'Rouquidão',
    sinonimos: ['disfonia', 'voz rouca'],
    categoria: 'respiratorio',
    importancia: 'media',
    doencasRelacionadas: ['laringite', 'drge', 'nodulo-corda-vocal', 'neoplasia-laringe', 'hipotireoidismo'],
    peso: 0.6,
    redFlags: ['Duração >3 semanas', 'Tabagismo + etilismo', 'Disfagia', 'Perda de peso'],
    perguntasChave: ['Duração?', 'Uso vocal excessivo?', 'Tabagismo?', 'Pirose?']
  },
  {
    id: 'estridor',
    nome: 'Estridor',
    sinonimos: ['som inspiratório agudo'],
    categoria: 'respiratorio',
    importancia: 'alta',
    doencasRelacionadas: ['laringite-aguda', 'epiglotite', 'corpo-estranho', 'anafilaxia', 'angioedema'],
    peso: 0.95,
    redFlags: ['Estridor em repouso', 'Cianose', 'Baba', 'Posição de tripé'],
    perguntasChave: ['Início súbito?', 'História de engasgo?', 'Febre?', 'Vacinação em dia?']
  },
  {
    id: 'dor-toracica',
    nome: 'Dor Torácica',
    sinonimos: ['dor no peito', 'desconforto precordial'],
    categoria: 'cardiovascular',
    importancia: 'alta',
    doencasRelacionadas: ['angina-estavel', 'infarto', 'pericardite-aguda', 'embolia-pulmonar', 'pneumotorax', 'drge', 'costocondrite', 'ansiedade'],
    peso: 0.9,
    redFlags: ['Dor típica + fatores de risco CV', 'Dispneia súbita', 'Síncope', 'Hipotensão'],
    perguntasChave: ['Característica (aperto, pontada, queimação)?', 'Localização e irradiação?', 'Relação com esforço?', 'Duração?', 'Fatores de alívio/piora?']
  },

  // ========================================
  // SINTOMAS CARDIOVASCULARES (10)
  // ========================================
  {
    id: 'palpitacoes',
    nome: 'Palpitações',
    sinonimos: ['coração acelerado', 'batedeira', 'sensação de batimento'],
    categoria: 'cardiovascular',
    importancia: 'media',
    doencasRelacionadas: ['fibrilacao-atrial', 'flutter-atrial', 'taquicardia-supraventricular', 'ansiedade', 'hipertireoidismo', 'anemia-ferropriva'],
    peso: 0.7,
    redFlags: ['Síncope associada', 'Dor torácica', 'Dispneia', 'Duração prolongada'],
    perguntasChave: ['Regulares ou irregulares?', 'Início e término súbitos?', 'Frequência?', 'Duração?', 'Gatilhos?']
  },
  {
    id: 'sincope',
    nome: 'Síncope',
    sinonimos: ['desmaio', 'perda de consciência', 'lipotimia'],
    categoria: 'cardiovascular',
    importancia: 'alta',
    doencasRelacionadas: ['sincope', 'arritmia', 'estenose-aortica', 'cardiomiopatia-hipertrofica', 'hipotensao-ortostatica', 'epilepsia'],
    peso: 0.9,
    redFlags: ['Síncope ao esforço', 'Sem pródromos', 'Cardiopatia estrutural', 'História familiar de morte súbita'],
    perguntasChave: ['Pródromos?', 'Ao esforço ou repouso?', 'Recuperação rápida?', 'Testemunhas (convulsão)?', 'Cardiopatia conhecida?']
  },
  {
    id: 'ortopneia',
    nome: 'Ortopneia',
    sinonimos: ['dispneia ao deitar', 'precisa de travesseiros'],
    categoria: 'cardiovascular',
    importancia: 'alta',
    doencasRelacionadas: ['insuficiencia-cardiaca', 'dpoc', 'asma'],
    peso: 0.85,
    redFlags: ['Progressão rápida', 'DPN associada', 'Edema de MMII'],
    perguntasChave: ['Quantos travesseiros?', 'Dorme sentado?', 'Edema de MMII?', 'Tosse noturna?']
  },
  {
    id: 'dpn',
    nome: 'Dispneia Paroxística Noturna',
    sinonimos: ['DPN', 'acordar com falta de ar'],
    categoria: 'cardiovascular',
    importancia: 'alta',
    doencasRelacionadas: ['insuficiencia-cardiaca'],
    peso: 0.9,
    redFlags: ['Piora progressiva', 'Edema pulmonar'],
    perguntasChave: ['Quantas horas após deitar?', 'Melhora ao sentar?', 'Frequência?', 'Tosse associada?']
  },
  {
    id: 'claudicacao',
    nome: 'Claudicação Intermitente',
    sinonimos: ['dor ao caminhar', 'dor em panturrilha'],
    categoria: 'cardiovascular',
    importancia: 'alta',
    doencasRelacionadas: ['doenca-arterial-periferica', 'estenose-espinhal'],
    peso: 0.9,
    redFlags: ['Dor em repouso', 'Lesão trófica', 'Pulsos ausentes'],
    perguntasChave: ['Distância até a dor?', 'Alivia com repouso?', 'Localização?', 'Tabagismo?', 'Diabetes?']
  },
  {
    id: 'edema-mmii',
    nome: 'Edema de Membros Inferiores',
    sinonimos: ['pernas inchadas', 'inchaço nas pernas'],
    categoria: 'cardiovascular',
    importancia: 'alta',
    doencasRelacionadas: ['insuficiencia-cardiaca', 'insuficiencia-venosa', 'tvp', 'insuficiencia-renal', 'cirrose'],
    peso: 0.8,
    redFlags: ['Edema unilateral doloroso (TVP)', 'Dispneia associada', 'Oligúria'],
    perguntasChave: ['Simétrico?', 'Deixa cacifo?', 'Piora no fim do dia?', 'Dispneia?', 'Varizes?']
  },
  {
    id: 'cianose',
    nome: 'Cianose',
    sinonimos: ['roxo', 'azulado', 'coloração azulada'],
    categoria: 'cardiovascular',
    importancia: 'alta',
    doencasRelacionadas: ['insuficiencia-respiratoria', 'cardiopatia-congenita', 'embolia-pulmonar', 'pneumonia-grave'],
    peso: 0.95,
    redFlags: ['Cianose central', 'Dispneia grave', 'Alteração de consciência'],
    perguntasChave: ['Central ou periférica?', 'Início súbito?', 'Dispneia associada?']
  },
  {
    id: 'sopro-cardiaco',
    nome: 'Sopro Cardíaco',
    sinonimos: ['murmur'],
    categoria: 'cardiovascular',
    importancia: 'media',
    doencasRelacionadas: ['estenose-aortica', 'insuficiencia-mitral', 'prolapso-mitral', 'estenose-mitral', 'sopro-inocente'],
    peso: 0.7,
    redFlags: ['Sopro novo', 'Sintomas associados (dispneia, síncope)', 'B3/B4'],
    perguntasChave: ['Já sabia do sopro?', 'Sintomas associados?', 'Febre reumática na infância?']
  },
  {
    id: 'turgencia-jugular',
    nome: 'Turgência Jugular',
    sinonimos: ['veias do pescoço distendidas', 'ingurgitamento jugular'],
    categoria: 'cardiovascular',
    importancia: 'alta',
    doencasRelacionadas: ['insuficiencia-cardiaca', 'tamponamento-cardiaco', 'pericardite-constritiva', 'embolia-pulmonar-macica'],
    peso: 0.85,
    redFlags: ['Hipotensão associada', 'Pulso paradoxal'],
    perguntasChave: ['Dispneia associada?', 'Edema de MMII?', 'Início súbito?']
  },
  {
    id: 'palidez',
    nome: 'Palidez',
    sinonimos: ['pálido', 'descorado'],
    categoria: 'hematologico',
    importancia: 'media',
    doencasRelacionadas: ['anemia-ferropriva', 'hemorragia', 'leucemia', 'insuficiencia-renal-cronica'],
    peso: 0.6,
    redFlags: ['Palidez intensa + fadiga', 'Sangramento', 'Icterícia associada'],
    perguntasChave: ['Fadiga associada?', 'Sangramento?', 'Dieta?', 'Menstruação abundante?']
  },

  // ========================================
  // SINTOMAS GASTROINTESTINAIS (15)
  // ========================================
  {
    id: 'dor-abdominal',
    nome: 'Dor Abdominal',
    sinonimos: ['dor de barriga', 'dor na barriga', 'cólica abdominal'],
    categoria: 'gastrointestinal',
    importancia: 'alta',
    doencasRelacionadas: ['gastrite', 'drge', 'apendicite', 'colecistite', 'pancreatite', 'sindrome-intestino-irritavel', 'diverticulite', 'obstrucao-intestinal'],
    peso: 0.85,
    redFlags: ['Dor intensa + rigidez abdominal', 'Febre alta', 'Vômitos fecaloides', 'Hipotensão'],
    perguntasChave: ['Localização?', 'Característica (cólica, contínua, queimação)?', 'Irradiação?', 'Relação com alimentação?', 'Febre?']
  },
  {
    id: 'nausea',
    nome: 'Náusea',
    sinonimos: ['enjoo', 'ânsia', 'mal estar gástrico'],
    categoria: 'gastrointestinal',
    importancia: 'media',
    doencasRelacionadas: ['gastrite', 'drge', 'gastroenterite-viral', 'gravidez', 'enxaqueca', 'vertigem', 'medicamentos'],
    peso: 0.5,
    perguntasChave: ['Vômitos associados?', 'Relação com alimentação?', 'Gestação possível?', 'Medicamentos novos?']
  },
  {
    id: 'vomito',
    nome: 'Vômito',
    sinonimos: ['êmese', 'vomitar'],
    categoria: 'gastrointestinal',
    importancia: 'alta',
    doencasRelacionadas: ['gastroenterite-viral', 'gastrite', 'obstrucao-intestinal', 'pancreatite', 'gravidez', 'meningite', 'intoxicacao'],
    peso: 0.75,
    redFlags: ['Vômito em jato (HIC)', 'Vômito fecaloide', 'Hematêmese', 'Desidratação grave'],
    perguntasChave: ['Conteúdo (alimentar, bilioso, fecaloide, sangue)?', 'Frequência?', 'Dor abdominal?', 'Febre?']
  },
  {
    id: 'diarreia',
    nome: 'Diarreia',
    sinonimos: ['fezes líquidas', 'intestino solto'],
    categoria: 'gastrointestinal',
    importancia: 'alta',
    doencasRelacionadas: ['gastroenterite-viral', 'intoxicacao-alimentar', 'doenca-inflamatoria-intestinal', 'sindrome-intestino-irritavel', 'intolerancia-lactose', 'hipertireoidismo'],
    peso: 0.8,
    redFlags: ['Sangue nas fezes', 'Desidratação', 'Febre alta', 'Duração >2 semanas'],
    perguntasChave: ['Frequência?', 'Sangue ou muco?', 'Duração?', 'Viagem recente?', 'Alimento suspeito?']
  },
  {
    id: 'constipacao',
    nome: 'Constipação',
    sinonimos: ['prisão de ventre', 'intestino preso', 'obstipação'],
    categoria: 'gastrointestinal',
    importancia: 'media',
    doencasRelacionadas: ['constipacao-intestinal', 'sindrome-intestino-irritavel', 'hipotireoidismo', 'obstrucao-intestinal', 'neoplasia-colorretal'],
    peso: 0.5,
    redFlags: ['Início recente em >50 anos', 'Sangue nas fezes', 'Perda de peso', 'Obstipação absoluta'],
    perguntasChave: ['Frequência habitual?', 'Há quanto tempo?', 'Esforço evacuatório?', 'Sangue?', 'Dieta?']
  },
  {
    id: 'pirose',
    nome: 'Pirose',
    sinonimos: ['azia', 'queimação', 'heartburn'],
    categoria: 'gastrointestinal',
    importancia: 'media',
    doencasRelacionadas: ['drge', 'gastrite', 'ulcera-peptica', 'hernia-hiatal'],
    peso: 0.75,
    perguntasChave: ['Frequência?', 'Relação com alimentação?', 'Piora ao deitar?', 'Regurgitação?', 'Alívio com antiácido?']
  },
  {
    id: 'regurgitacao',
    nome: 'Regurgitação',
    sinonimos: ['retorno de alimento', 'refluxo'],
    categoria: 'gastrointestinal',
    importancia: 'media',
    doencasRelacionadas: ['drge', 'acalasia', 'diverticulo-zenker'],
    peso: 0.7,
    redFlags: ['Disfagia associada', 'Perda de peso'],
    perguntasChave: ['Conteúdo ácido ou alimentar?', 'Logo após comer?', 'Piora ao deitar?']
  },
  {
    id: 'disfagia',
    nome: 'Disfagia',
    sinonimos: ['dificuldade para engolir', 'entalo'],
    categoria: 'gastrointestinal',
    importancia: 'alta',
    doencasRelacionadas: ['neoplasia-esofago', 'estenose-esofagica', 'acalasia', 'drge', 'avc', 'miastenia-gravis'],
    peso: 0.9,
    redFlags: ['Progressiva', 'Perda de peso', 'Odinofagia', 'Regurgitação'],
    perguntasChave: ['Para sólidos, líquidos ou ambos?', 'Progressiva ou intermitente?', 'Localização?', 'Odinofagia?']
  },
  {
    id: 'odinofagia',
    nome: 'Odinofagia',
    sinonimos: ['dor ao engolir'],
    categoria: 'gastrointestinal',
    importancia: 'media',
    doencasRelacionadas: ['faringite', 'esofagite', 'candidose-esofagica', 'ulcera-esofagica'],
    peso: 0.7,
    redFlags: ['Imunossupressão', 'Disfagia progressiva'],
    perguntasChave: ['Localização (alta ou baixa)?', 'Febre?', 'HIV/imunossupressão?']
  },
  {
    id: 'hematoquesia',
    nome: 'Hematoquesia',
    sinonimos: ['sangue vivo nas fezes', 'sangramento retal'],
    categoria: 'gastrointestinal',
    importancia: 'alta',
    doencasRelacionadas: ['hemorroidas', 'fissura-anal', 'diverticulose', 'neoplasia-colorretal', 'doenca-inflamatoria-intestinal'],
    peso: 0.9,
    redFlags: ['Volume grande', 'Instabilidade hemodinâmica', '>50 anos', 'Perda de peso'],
    perguntasChave: ['Sangue no papel, vaso ou misturado?', 'Volume?', 'Dor ao evacuar?', 'Alteração do hábito intestinal?']
  },
  {
    id: 'melena',
    nome: 'Melena',
    sinonimos: ['fezes escuras', 'fezes em borra de café'],
    categoria: 'gastrointestinal',
    importancia: 'alta',
    doencasRelacionadas: ['ulcera-peptica', 'varizes-esofagicas', 'gastrite-erosiva', 'neoplasia-gastrica'],
    peso: 0.95,
    redFlags: ['Instabilidade hemodinâmica', 'Uso de AINEs/anticoagulantes'],
    perguntasChave: ['Cor das fezes?', 'Hematêmese?', 'Uso de ferro?', 'AINEs?', 'Cirrose?']
  },
  {
    id: 'hematemese',
    nome: 'Hematêmese',
    sinonimos: ['vômito com sangue'],
    categoria: 'gastrointestinal',
    importancia: 'alta',
    doencasRelacionadas: ['ulcera-peptica', 'varizes-esofagicas', 'sindrome-mallory-weiss', 'gastrite-erosiva'],
    peso: 0.95,
    redFlags: ['Sangue vivo volumoso', 'Hipotensão', 'Cirrose conhecida'],
    perguntasChave: ['Volume?', 'Sangue vivo ou em borra de café?', 'Vômitos prévios?', 'Etilismo?', 'AINEs?']
  },
  {
    id: 'distensao-abdominal',
    nome: 'Distensão Abdominal',
    sinonimos: ['barriga inchada', 'abdome distendido', 'meteorismo'],
    categoria: 'gastrointestinal',
    importancia: 'media',
    doencasRelacionadas: ['sindrome-intestino-irritavel', 'obstrucao-intestinal', 'ascite', 'intolerancia-lactose'],
    peso: 0.6,
    redFlags: ['Distensão + dor intensa', 'Parada de eliminação de gases', 'Onda peristáltica visível'],
    perguntasChave: ['Associada a gases?', 'Melhora ao eliminar gases/evacuar?', 'Piora com alimentos específicos?']
  },
  {
    id: 'ictericia',
    nome: 'Icterícia',
    sinonimos: ['amarelão', 'pele amarelada', 'olhos amarelos'],
    categoria: 'gastrointestinal',
    importancia: 'alta',
    doencasRelacionadas: ['hepatite', 'colecistite', 'coledocolitiase', 'neoplasia-pancreas', 'cirrose', 'hemolise'],
    peso: 0.9,
    redFlags: ['Febre + dor abdominal (Charcot)', 'Acolia + colúria', 'Confusão mental'],
    perguntasChave: ['Dor abdominal?', 'Febre?', 'Cor da urina e fezes?', 'Prurido?', 'Etilismo?']
  },
  {
    id: 'prurido-anal',
    nome: 'Prurido Anal',
    sinonimos: ['coceira no ânus'],
    categoria: 'gastrointestinal',
    importancia: 'baixa',
    doencasRelacionadas: ['hemorroidas', 'oxiuriase', 'candidose', 'fissura-anal', 'dermatite'],
    peso: 0.4,
    perguntasChave: ['Piora noturna (oxiúros)?', 'Sangramento?', 'Secreção?', 'Higiene?']
  },

  // ========================================
  // SINTOMAS NEUROLÓGICOS (15)
  // ========================================
  {
    id: 'cefaleia',
    nome: 'Cefaleia',
    sinonimos: ['dor de cabeça', 'headache'],
    categoria: 'neurologico',
    importancia: 'alta',
    doencasRelacionadas: ['migranea', 'cefaleia-tensional', 'cefaleia-cluster', 'sinusite', 'hipertensao-arterial', 'meningite', 'tumor-cerebral', 'hemorragia-subaracnoidea'],
    peso: 0.7,
    redFlags: ['Pior dor da vida (súbita)', 'Rigidez de nuca', 'Febre + cefaleia', 'Alteração de consciência', 'Déficit focal'],
    perguntasChave: ['Localização?', 'Característica (pulsátil, pressão, pontada)?', 'Duração?', 'Frequência?', 'Aura?', 'Foto/fonofobia?']
  },
  {
    id: 'tontura',
    nome: 'Tontura',
    sinonimos: ['tonto', 'cabeça leve', 'desequilíbrio'],
    categoria: 'neurologico',
    importancia: 'media',
    doencasRelacionadas: ['vertigem-posicional', 'labirintite', 'hipotensao-ortostatica', 'anemia-ferropriva', 'ansiedade', 'arritmia'],
    peso: 0.6,
    redFlags: ['Déficit neurológico focal', 'Nistagmo vertical', 'Surdez súbita'],
    perguntasChave: ['Vertigem rotatória ou instabilidade?', 'Gatilhos (posição, levantar)?', 'Náusea/vômito?', 'Zumbido?']
  },
  {
    id: 'vertigem',
    nome: 'Vertigem',
    sinonimos: ['tudo girando', 'sensação de rotação'],
    categoria: 'neurologico',
    importancia: 'alta',
    doencasRelacionadas: ['vertigem-posicional', 'labirintite', 'neurite-vestibular', 'doenca-meniere', 'avc-cerebelo'],
    peso: 0.8,
    redFlags: ['Nistagmo vertical/torcional', 'Ataxia', 'Disartria', 'Deficit focal'],
    perguntasChave: ['Rotatória ou não?', 'Duração dos episódios?', 'Gatilhos (posição)?', 'Surdez/zumbido?', 'Sintomas neurológicos?']
  },
  {
    id: 'convulsao',
    nome: 'Convulsão',
    sinonimos: ['crise convulsiva', 'ataque epilético', 'seizure'],
    categoria: 'neurologico',
    importancia: 'alta',
    doencasRelacionadas: ['epilepsia', 'hipoglicemia', 'avc', 'tumor-cerebral', 'meningite', 'eclampsia', 'abstinencia-alcoolica'],
    peso: 0.95,
    redFlags: ['Estado de mal epiléptico', 'Déficit pós-ictal prolongado', 'Primeira crise'],
    perguntasChave: ['Testemunhas?', 'Generalizada ou focal?', 'Mordedura de língua?', 'Incontinência?', 'Pós-ictal?']
  },
  {
    id: 'paresia',
    nome: 'Paresia/Fraqueza Muscular',
    sinonimos: ['fraqueza', 'perda de força'],
    categoria: 'neurologico',
    importancia: 'alta',
    doencasRelacionadas: ['avc', 'esclerose-multipla', 'guillain-barre', 'miastenia-gravis', 'neuropatia-periferica'],
    peso: 0.9,
    redFlags: ['Início súbito', 'Progressão rápida', 'Insuficiência respiratória'],
    perguntasChave: ['Localização?', 'Início súbito ou gradual?', 'Proximal ou distal?', 'Simétrica?', 'Alteração sensitiva?']
  },
  {
    id: 'parestesia',
    nome: 'Parestesia',
    sinonimos: ['formigamento', 'dormência', 'queimação'],
    categoria: 'neurologico',
    importancia: 'media',
    doencasRelacionadas: ['neuropatia-diabetica', 'sindrome-tunel-carpo', 'deficiencia-vitamina-b12', 'esclerose-multipla', 'hérnia-disco'],
    peso: 0.6,
    redFlags: ['Progressão rápida', 'Associada a fraqueza', 'Distribuição em bota/luva'],
    perguntasChave: ['Localização?', 'Constante ou intermitente?', 'Fatores de piora?', 'Diabetes?']
  },
  {
    id: 'tremor',
    nome: 'Tremor',
    sinonimos: ['mãos tremendo', 'tremedeira'],
    categoria: 'neurologico',
    importancia: 'media',
    doencasRelacionadas: ['doenca-parkinson', 'tremor-essencial', 'hipertireoidismo', 'ansiedade', 'abstinencia-alcoolica'],
    peso: 0.7,
    redFlags: ['Tremor de repouso assimétrico', 'Bradicinesia associada'],
    perguntasChave: ['Repouso ou ação?', 'Melhora com álcool?', 'Unilateral ou bilateral?', 'História familiar?']
  },
  {
    id: 'amnesia',
    nome: 'Amnésia/Perda de Memória',
    sinonimos: ['esquecimento', 'lapsos de memória'],
    categoria: 'neurologico',
    importancia: 'alta',
    doencasRelacionadas: ['demencia-alzheimer', 'demencia-vascular', 'depressao', 'hipotireoidismo', 'deficiencia-vitamina-b12'],
    peso: 0.8,
    redFlags: ['Progressão rápida', 'Início em jovem', 'Déficits focais associados'],
    perguntasChave: ['Memória recente ou remota?', 'Progressiva?', 'Afeta atividades diárias?', 'Alteração de comportamento?']
  },
  {
    id: 'disartria',
    nome: 'Disartria',
    sinonimos: ['fala arrastada', 'dificuldade para falar'],
    categoria: 'neurologico',
    importancia: 'alta',
    doencasRelacionadas: ['avc', 'esclerose-multipla', 'parkinson', 'intoxicacao-alcoolica', 'miastenia-gravis'],
    peso: 0.85,
    redFlags: ['Início súbito', 'Déficit motor associado', 'Disfagia'],
    perguntasChave: ['Início súbito ou gradual?', 'Piora com fadiga?', 'Outros déficits?']
  },
  {
    id: 'zumbido',
    nome: 'Zumbido',
    sinonimos: ['tinnitus', 'chiado no ouvido', 'apito no ouvido'],
    categoria: 'otorrinolaringologico',
    importancia: 'media',
    doencasRelacionadas: ['perda-auditiva', 'doenca-meniere', 'otosclerose', 'neurinoma-acustico', 'hipertensao-arterial'],
    peso: 0.5,
    redFlags: ['Unilateral', 'Pulsátil', 'Perda auditiva progressiva'],
    perguntasChave: ['Uni ou bilateral?', 'Pulsátil?', 'Perda auditiva?', 'Vertigem?', 'Exposição a ruído?']
  },
  {
    id: 'perda-auditiva',
    nome: 'Perda Auditiva',
    sinonimos: ['surdez', 'hipoacusia', 'dificuldade para ouvir'],
    categoria: 'otorrinolaringologico',
    importancia: 'alta',
    doencasRelacionadas: ['cerume', 'otite-media', 'presbiacusia', 'otosclerose', 'neurinoma-acustico', 'doenca-meniere'],
    peso: 0.7,
    redFlags: ['Surdez súbita (emergência!)', 'Unilateral progressiva', 'Otorreia'],
    perguntasChave: ['Súbita ou gradual?', 'Uni ou bilateral?', 'Zumbido?', 'Vertigem?', 'Otalgia?']
  },
  {
    id: 'otalgia',
    nome: 'Otalgia',
    sinonimos: ['dor de ouvido', 'dor no ouvido'],
    categoria: 'otorrinolaringologico',
    importancia: 'media',
    doencasRelacionadas: ['otite-media-aguda', 'otite-externa', 'disfuncao-atm', 'faringite'],
    peso: 0.7,
    redFlags: ['Otorreia purulenta', 'Febre alta', 'Mastoidite (edema retroauricular)'],
    perguntasChave: ['Febre?', 'Secreção?', 'Piora ao puxar orelha (externa)?', 'IVAS recente?']
  },
  {
    id: 'alteracao-visual',
    nome: 'Alteração Visual',
    sinonimos: ['visão turva', 'embaçamento visual', 'perda de visão'],
    categoria: 'oftalmologico',
    importancia: 'alta',
    doencasRelacionadas: ['retinopatia-diabetica', 'glaucoma', 'catarata', 'descolamento-retina', 'neurite-optica', 'avc'],
    peso: 0.85,
    redFlags: ['Perda súbita', 'Defeito de campo', 'Flashes + floaters', 'Dor ocular'],
    perguntasChave: ['Súbita ou gradual?', 'Uni ou bilateral?', 'Central ou periférica?', 'Dor?', 'Diabetes?']
  },
  {
    id: 'diplopia',
    nome: 'Diplopia',
    sinonimos: ['visão dupla', 'ver dobrado'],
    categoria: 'oftalmologico',
    importancia: 'alta',
    doencasRelacionadas: ['miastenia-gravis', 'paralisia-nervo-craniano', 'avc', 'esclerose-multipla', 'diabetes-mellitus-2'],
    peso: 0.85,
    redFlags: ['Início súbito', 'Cefaleia intensa', 'Ptose', 'Anisocoria'],
    perguntasChave: ['Monocular ou binocular?', 'Horizontal ou vertical?', 'Constante ou intermitente?', 'Piora com fadiga?']
  },
  {
    id: 'insonia',
    nome: 'Insônia',
    sinonimos: ['dificuldade para dormir', 'sono ruim'],
    categoria: 'psiquiatrico',
    importancia: 'media',
    doencasRelacionadas: ['insonia', 'ansiedade', 'depressao', 'apneia-sono', 'hipertireoidismo', 'dor-cronica'],
    peso: 0.5,
    perguntasChave: ['Inicial, de manutenção ou terminal?', 'Há quanto tempo?', 'Roncos?', 'Humor?', 'Cafeína?']
  },

  // ========================================
  // SINTOMAS DERMATOLÓGICOS (10)
  // ========================================
  {
    id: 'prurido',
    nome: 'Prurido',
    sinonimos: ['coceira', 'comichão'],
    categoria: 'dermatologico',
    importancia: 'media',
    doencasRelacionadas: ['dermatite-atopica', 'urticaria', 'escabiose', 'psoríase', 'colestase', 'insuficiencia-renal'],
    peso: 0.6,
    redFlags: ['Generalizado + perda de peso', 'Icterícia associada', 'Linfonodomegalias'],
    perguntasChave: ['Localizado ou generalizado?', 'Piora noturna?', 'Lesões visíveis?', 'Contato com irritantes?']
  },
  {
    id: 'rash',
    nome: 'Rash/Erupção Cutânea',
    sinonimos: ['manchas na pele', 'lesões de pele', 'exantema'],
    categoria: 'dermatologico',
    importancia: 'alta',
    doencasRelacionadas: ['urticaria', 'dermatite', 'psoriase', 'alergia-medicamentosa', 'lupus', 'escarlatina', 'sarampo'],
    peso: 0.8,
    redFlags: ['Febre + rash (exantema infeccioso)', 'Acometimento de mucosas', 'Bolhas extensas'],
    perguntasChave: ['Distribuição?', 'Prurido?', 'Febre?', 'Medicamento novo?', 'Evolução?']
  },
  {
    id: 'urticaria',
    nome: 'Urticária',
    sinonimos: ['vergões', 'placas elevadas'],
    categoria: 'dermatologico',
    importancia: 'alta',
    doencasRelacionadas: ['urticaria', 'alergia-alimentar', 'alergia-medicamentosa', 'anafilaxia'],
    peso: 0.85,
    redFlags: ['Edema de lábios/língua (angioedema)', 'Dispneia', 'Hipotensão'],
    perguntasChave: ['Gatilho identificado?', 'Duração das lesões?', 'Edema de face/lábios?', 'Dispneia?']
  },
  {
    id: 'alopecia',
    nome: 'Alopecia',
    sinonimos: ['queda de cabelo', 'calvície', 'perda de cabelo'],
    categoria: 'dermatologico',
    importancia: 'media',
    doencasRelacionadas: ['alopecia-androgenetica', 'alopecia-areata', 'hipotireoidismo', 'deficiencia-ferro', 'lupus'],
    peso: 0.5,
    redFlags: ['Queda rápida e difusa', 'Cicatrizes no couro cabeludo'],
    perguntasChave: ['Difusa ou em áreas?', 'Gradual ou rápida?', 'Estresse recente?', 'Pós-parto?']
  },
  {
    id: 'xerose',
    nome: 'Xerose/Pele Seca',
    sinonimos: ['ressecamento da pele', 'pele ressecada'],
    categoria: 'dermatologico',
    importancia: 'baixa',
    doencasRelacionadas: ['dermatite-atopica', 'hipotireoidismo', 'diabetes-mellitus-2', 'envelhecimento'],
    peso: 0.3,
    perguntasChave: ['Generalizada?', 'Prurido?', 'Uso de hidratantes?', 'Banhos quentes?']
  },
  {
    id: 'hiperhidrose',
    nome: 'Hiperhidrose',
    sinonimos: ['suor excessivo', 'sudorese excessiva'],
    categoria: 'dermatologico',
    importancia: 'media',
    doencasRelacionadas: ['hiperhidrose-primaria', 'hipertireoidismo', 'menopausa-climaterio', 'feocromocitoma', 'ansiedade'],
    peso: 0.5,
    redFlags: ['Sudorese noturna', 'Perda de peso', 'Palpitações'],
    perguntasChave: ['Localizada ou generalizada?', 'Desde quando?', 'Piora com estresse?', 'Noturna?']
  },
  {
    id: 'petequias',
    nome: 'Petéquias',
    sinonimos: ['pontinhos vermelhos', 'manchas petequiais'],
    categoria: 'dermatologico',
    importancia: 'alta',
    doencasRelacionadas: ['trombocitopenia', 'dengue', 'meningococcemia', 'leucemia', 'vasculite'],
    peso: 0.9,
    redFlags: ['Febre associada', 'Sangramento em outros sítios', 'Rápida progressão'],
    perguntasChave: ['Febre?', 'Outros sangramentos?', 'Medicamentos?', 'Viagem recente?']
  },
  {
    id: 'equimose',
    nome: 'Equimose',
    sinonimos: ['roxo', 'hematoma', 'mancha roxa'],
    categoria: 'dermatologico',
    importancia: 'media',
    doencasRelacionadas: ['coagulopatia', 'trombocitopenia', 'deficiencia-vitamina-c', 'abuso-fisico'],
    peso: 0.6,
    redFlags: ['Equimoses espontâneas', 'Sangramento gengival', 'História familiar de sangramento'],
    perguntasChave: ['Trauma?', 'Outros sangramentos?', 'Uso de anticoagulantes?', 'Recorrente?']
  },
  {
    id: 'ulcera-cutanea',
    nome: 'Úlcera Cutânea',
    sinonimos: ['ferida que não cicatriza', 'lesão ulcerada'],
    categoria: 'dermatologico',
    importancia: 'alta',
    doencasRelacionadas: ['insuficiencia-venosa', 'doenca-arterial-periferica', 'pe-diabetico', 'leishmaniose', 'neoplasia'],
    peso: 0.85,
    redFlags: ['Úlcera em pé diabético', 'Bordas elevadas (neoplasia)', 'Dor isquêmica'],
    perguntasChave: ['Localização?', 'Duração?', 'Dor?', 'Diabetes/DVP?', 'Trauma prévio?']
  },
  {
    id: 'nodulo-cutaneo',
    nome: 'Nódulo Cutâneo',
    sinonimos: ['caroço na pele', 'massa subcutânea'],
    categoria: 'dermatologico',
    importancia: 'media',
    doencasRelacionadas: ['lipoma', 'cisto-sebaceo', 'linfonodo', 'neoplasia-pele'],
    peso: 0.6,
    redFlags: ['Crescimento rápido', 'Bordas irregulares', 'Ulceração', 'Fixo a planos profundos'],
    perguntasChave: ['Há quanto tempo?', 'Cresceu?', 'Doloroso?', 'Móvel?']
  },

  // ========================================
  // SINTOMAS MUSCULOESQUELÉTICOS (10)
  // ========================================
  {
    id: 'artralgia',
    nome: 'Artralgia',
    sinonimos: ['dor nas articulações', 'dor articular'],
    categoria: 'musculoesqueletico',
    importancia: 'alta',
    doencasRelacionadas: ['osteoartrite', 'artrite-reumatoide', 'gota', 'lupus', 'fibromialgia', 'artrite-septica'],
    peso: 0.8,
    redFlags: ['Monoartrite aguda com febre (séptica)', 'Rigidez matinal >1h (AR)', 'Artrite migratória'],
    perguntasChave: ['Quais articulações?', 'Inchaço?', 'Rigidez matinal?', 'Piora com movimento ou repouso?']
  },
  {
    id: 'mialgia',
    nome: 'Mialgia',
    sinonimos: ['dor muscular', 'músculos doloridos'],
    categoria: 'musculoesqueletico',
    importancia: 'media',
    doencasRelacionadas: ['gripe', 'fibromialgia', 'polimialgia-reumatica', 'miosite', 'uso-estatinas'],
    peso: 0.5,
    redFlags: ['Fraqueza associada', 'Urina escura (rabdomiólise)', 'CPK muito elevada'],
    perguntasChave: ['Localização?', 'Febre?', 'Medicamentos (estatinas)?', 'Exercício intenso?']
  },
  {
    id: 'lombalgia',
    nome: 'Lombalgia',
    sinonimos: ['dor lombar', 'dor nas costas', 'dor na coluna'],
    categoria: 'musculoesqueletico',
    importancia: 'alta',
    doencasRelacionadas: ['lombalgia-mecanica', 'hernia-disco', 'estenose-espinhal', 'espondilite', 'neoplasia-vertebral'],
    peso: 0.7,
    redFlags: ['Déficit motor/sensitivo', 'Incontinência urinária/fecal', 'Febre', 'Perda de peso', 'Trauma'],
    perguntasChave: ['Irradiação para pernas?', 'Parestesias?', 'Piora com flexão/extensão?', 'Rigidez matinal?']
  },
  {
    id: 'cervicalgia',
    nome: 'Cervicalgia',
    sinonimos: ['dor no pescoço', 'dor cervical', 'torcicolo'],
    categoria: 'musculoesqueletico',
    importancia: 'media',
    doencasRelacionadas: ['cervicalgia-mecanica', 'hernia-cervical', 'espondilite', 'meningite'],
    peso: 0.6,
    redFlags: ['Rigidez de nuca + febre', 'Déficit neurológico', 'Trauma'],
    perguntasChave: ['Irradiação para braços?', 'Febre?', 'Trauma?', 'Parestesias?']
  },
  {
    id: 'rigidez-articular',
    nome: 'Rigidez Articular',
    sinonimos: ['articulação travada', 'dificuldade de movimento'],
    categoria: 'musculoesqueletico',
    importancia: 'media',
    doencasRelacionadas: ['artrite-reumatoide', 'osteoartrite', 'espondilite-anquilosante', 'polimialgia-reumatica'],
    peso: 0.7,
    redFlags: ['Rigidez matinal >1 hora (inflamatória)'],
    perguntasChave: ['Duração da rigidez matinal?', 'Melhora com movimento?', 'Quais articulações?']
  },
  {
    id: 'artrite',
    nome: 'Artrite (Articulação Inchada)',
    sinonimos: ['articulação inchada', 'sinovite', 'derrame articular'],
    categoria: 'musculoesqueletico',
    importancia: 'alta',
    doencasRelacionadas: ['gota', 'artrite-reumatoide', 'artrite-septica', 'artrite-reativa', 'lupus'],
    peso: 0.9,
    redFlags: ['Monoartrite aguda + febre (séptica!)', 'Artrite + úlceras genitais (Behçet)', 'Artrite + conjuntivite + uretrite (reativa)'],
    perguntasChave: ['Quais articulações?', 'Simétrica?', 'Febre?', 'Trauma?', 'IST recente?']
  },
  {
    id: 'dor-ombro',
    nome: 'Dor no Ombro',
    sinonimos: ['ombralgia', 'dor escapular'],
    categoria: 'musculoesqueletico',
    importancia: 'media',
    doencasRelacionadas: ['tendinite-ombro', 'bursite', 'sindrome-impacto', 'capsulite-adesiva', 'artrose-ombro'],
    peso: 0.6,
    perguntasChave: ['Movimento específico que piora?', 'Limitação de movimento?', 'Trauma?', 'Trabalho repetitivo?']
  },
  {
    id: 'dor-joelho',
    nome: 'Dor no Joelho',
    sinonimos: ['gonalgia'],
    categoria: 'musculoesqueletico',
    importancia: 'media',
    doencasRelacionadas: ['osteoartrite', 'lesao-menisco', 'lesao-ligamentar', 'bursite', 'artrite'],
    peso: 0.6,
    redFlags: ['Bloqueio articular', 'Instabilidade', 'Derrame volumoso após trauma'],
    perguntasChave: ['Trauma?', 'Inchaço?', 'Bloqueio?', 'Subir/descer escadas?']
  },
  {
    id: 'dor-quadril',
    nome: 'Dor no Quadril',
    sinonimos: ['coxalgia', 'dor na virilha'],
    categoria: 'musculoesqueletico',
    importancia: 'alta',
    doencasRelacionadas: ['osteoartrite-quadril', 'bursite-trocanter', 'necrose-avascular', 'fratura-quadril'],
    peso: 0.7,
    redFlags: ['Idoso + queda (fratura)', 'Claudicação', 'Dor em repouso'],
    perguntasChave: ['Irradiação?', 'Piora ao caminhar?', 'Claudicação?', 'Trauma?']
  },
  {
    id: 'caimbra',
    nome: 'Câimbra',
    sinonimos: ['cãibra', 'espasmo muscular', 'músculo contraído'],
    categoria: 'musculoesqueletico',
    importancia: 'baixa',
    doencasRelacionadas: ['caimbras-noturnas', 'desidratacao', 'hipomagnesemia', 'hipocalemia', 'insuficiencia-venosa'],
    peso: 0.3,
    perguntasChave: ['Frequência?', 'Noturnas?', 'Uso de diuréticos?', 'Exercício?', 'Hidratação?']
  },

  // ========================================
  // SINTOMAS UROLÓGICOS (8)
  // ========================================
  {
    id: 'disuria',
    nome: 'Disúria',
    sinonimos: ['dor ao urinar', 'ardência ao urinar'],
    categoria: 'urologico',
    importancia: 'alta',
    doencasRelacionadas: ['itu', 'cistite', 'uretrite', 'prostatite', 'vaginite'],
    peso: 0.9,
    redFlags: ['Febre alta', 'Dor lombar (pielonefrite)', 'Imunossupressão'],
    perguntasChave: ['Frequência urinária?', 'Urgência?', 'Hematúria?', 'Febre?', 'Secreção uretral?']
  },
  {
    id: 'poliuria',
    nome: 'Poliúria',
    sinonimos: ['urinar muito', 'aumento do volume urinário'],
    categoria: 'urologico',
    importancia: 'alta',
    doencasRelacionadas: ['diabetes-mellitus-2', 'diabetes-insipidus', 'hipercalcemia', 'diureticos'],
    peso: 0.8,
    redFlags: ['Sede intensa', 'Perda de peso', 'Polifagia'],
    perguntasChave: ['Volume estimado?', 'Noturna também?', 'Sede?', 'Medicamentos?']
  },
  {
    id: 'nocturia',
    nome: 'Noctúria',
    sinonimos: ['urinar à noite', 'levantar para urinar'],
    categoria: 'urologico',
    importancia: 'media',
    doencasRelacionadas: ['hiperplasia-prostatica', 'insuficiencia-cardiaca', 'diabetes-mellitus-2', 'apneia-sono'],
    peso: 0.5,
    perguntasChave: ['Quantas vezes por noite?', 'Jato urinário fraco?', 'Edema de MMII?']
  },
  {
    id: 'hematuria',
    nome: 'Hematúria',
    sinonimos: ['sangue na urina', 'urina com sangue'],
    categoria: 'urologico',
    importancia: 'alta',
    doencasRelacionadas: ['itu', 'litiase-renal', 'neoplasia-bexiga', 'glomerulonefrite', 'trauma-renal'],
    peso: 0.9,
    redFlags: ['Indolor + >50 anos (neoplasia)', 'Coágulos', 'Oligúria'],
    perguntasChave: ['Macroscópica ou microscópica?', 'Dor?', 'Coágulos?', 'Tabagismo?']
  },
  {
    id: 'incontinencia-urinaria',
    nome: 'Incontinência Urinária',
    sinonimos: ['perda de urina', 'escape de urina'],
    categoria: 'urologico',
    importancia: 'media',
    doencasRelacionadas: ['incontinencia-urinaria-idoso', 'bexiga-hiperativa', 'incontinencia-esforco', 'prostatismo'],
    peso: 0.6,
    perguntasChave: ['Urgência, esforço ou mista?', 'Frequência?', 'Volume?', 'Impacto na qualidade de vida?']
  },
  {
    id: 'retencao-urinaria',
    nome: 'Retenção Urinária',
    sinonimos: ['não consegue urinar', 'bexigoma'],
    categoria: 'urologico',
    importancia: 'alta',
    doencasRelacionadas: ['hiperplasia-prostatica', 'estenose-uretral', 'medicamentos-anticolinergicos', 'cauda-equina'],
    peso: 0.95,
    redFlags: ['Dor intensa', 'Insuficiência renal aguda', 'Déficit neurológico'],
    perguntasChave: ['Última micção?', 'Jato fraco prévio?', 'Medicamentos novos?', 'Dor lombar?']
  },
  {
    id: 'colica-renal',
    nome: 'Cólica Renal/Nefrética',
    sinonimos: ['dor nos rins', 'pedra nos rins'],
    categoria: 'urologico',
    importancia: 'alta',
    doencasRelacionadas: ['litiase-renal', 'litiase-ureteral'],
    peso: 0.95,
    redFlags: ['Febre (pielonefrite obstrutiva)', 'Anúria', 'Rim único'],
    perguntasChave: ['Localização e irradiação?', 'Hematúria?', 'Episódios prévios?', 'Febre?']
  },
  {
    id: 'dor-testicular',
    nome: 'Dor Testicular',
    sinonimos: ['dor no testículo', 'dor escrotal'],
    categoria: 'urologico',
    importancia: 'alta',
    doencasRelacionadas: ['epididimite', 'orquite', 'torcao-testicular', 'hernia-inguinal', 'varicocele'],
    peso: 0.9,
    redFlags: ['Dor súbita intensa (torção - emergência!)', 'Náusea/vômitos', 'Testículo elevado'],
    perguntasChave: ['Início súbito ou gradual?', 'Trauma?', 'Febre?', 'Secreção uretral?']
  },

  // ========================================
  // SINTOMAS GINECOLÓGICOS (8)
  // ========================================
  {
    id: 'dismenorreia',
    nome: 'Dismenorreia',
    sinonimos: ['cólica menstrual', 'dor menstrual'],
    categoria: 'ginecologico',
    importancia: 'media',
    doencasRelacionadas: ['dismenorreia', 'endometriose', 'adenomiose', 'mioma-uterino'],
    peso: 0.6,
    redFlags: ['Início após 25 anos (secundária)', 'Dor incapacitante', 'Infertilidade'],
    perguntasChave: ['Sempre teve ou início recente?', 'Intensidade?', 'Resposta a analgésicos?']
  },
  {
    id: 'sangramento-vaginal-anormal',
    nome: 'Sangramento Vaginal Anormal',
    sinonimos: ['sangramento uterino', 'menorragia', 'metrorragia'],
    categoria: 'ginecologico',
    importancia: 'alta',
    doencasRelacionadas: ['sangramento-uterino-anormal', 'mioma-uterino', 'polipo-endometrial', 'neoplasia-cervical', 'aborto'],
    peso: 0.85,
    redFlags: ['Pós-menopausa', 'Gestante', 'Instabilidade hemodinâmica'],
    perguntasChave: ['Regularidade dos ciclos?', 'Volume?', 'Gestação possível?', 'Pós-coito?']
  },
  {
    id: 'leucorreia',
    nome: 'Leucorreia/Corrimento Vaginal',
    sinonimos: ['corrimento', 'secreção vaginal'],
    categoria: 'ginecologico',
    importancia: 'media',
    doencasRelacionadas: ['vaginose-bacteriana', 'candidose-vulvovaginal', 'tricomoniase', 'cervicite'],
    peso: 0.7,
    perguntasChave: ['Cor?', 'Odor?', 'Prurido?', 'Parceiro novo?']
  },
  {
    id: 'dispareunia',
    nome: 'Dispareunia',
    sinonimos: ['dor na relação', 'dor durante sexo'],
    categoria: 'ginecologico',
    importancia: 'media',
    doencasRelacionadas: ['endometriose', 'atrofia-vaginal', 'vaginismo', 'dip', 'cistite-intersticial'],
    peso: 0.7,
    redFlags: ['Dispareunia profunda (endometriose)', 'Sangramento pós-coito'],
    perguntasChave: ['Superficial ou profunda?', 'Início da vida sexual?', 'Lubrificação?', 'Menopausa?']
  },
  {
    id: 'prurido-vulvar',
    nome: 'Prurido Vulvar',
    sinonimos: ['coceira vaginal', 'coceira na vulva'],
    categoria: 'ginecologico',
    importancia: 'media',
    doencasRelacionadas: ['candidose-vulvovaginal', 'dermatite-contato', 'liquen-escleroso', 'atrofia-vaginal'],
    peso: 0.7,
    perguntasChave: ['Corrimento associado?', 'Lesões visíveis?', 'Menopausa?', 'Uso de produtos irritantes?']
  },
  {
    id: 'amenorreia',
    nome: 'Amenorreia',
    sinonimos: ['falta de menstruação', 'ausência de menstruação'],
    categoria: 'ginecologico',
    importancia: 'alta',
    doencasRelacionadas: ['gravidez', 'sindrome-ovarios-policisticos', 'hiperprolactinemia', 'menopausa-precoce', 'amenorreia-hipotalamica'],
    peso: 0.85,
    redFlags: ['Gestação não desejada', 'Cefaleia + alteração visual (prolactinoma)'],
    perguntasChave: ['Última menstruação?', 'Gestação possível?', 'Galactorreia?', 'Perda de peso?', 'Exercício intenso?']
  },
  {
    id: 'fogacho',
    nome: 'Fogacho',
    sinonimos: ['onda de calor', 'calor súbito'],
    categoria: 'ginecologico',
    importancia: 'media',
    doencasRelacionadas: ['menopausa-climaterio', 'hipertireoidismo', 'carcinoide'],
    peso: 0.7,
    perguntasChave: ['Frequência?', 'Amenorreia?', 'Sudorese noturna?', 'Idade?']
  },
  {
    id: 'mastalgia',
    nome: 'Mastalgia',
    sinonimos: ['dor na mama', 'dor mamária'],
    categoria: 'ginecologico',
    importancia: 'media',
    doencasRelacionadas: ['mastalgia-ciclica', 'mastite-lactacional', 'fibroadenoma', 'cisto-mamario'],
    peso: 0.5,
    redFlags: ['Nódulo palpável', 'Retração de pele/mamilo', 'Secreção sanguinolenta'],
    perguntasChave: ['Cíclica ou constante?', 'Nódulo?', 'Secreção mamilar?', 'Lactante?']
  },

  // ========================================
  // SINTOMAS PSIQUIÁTRICOS (8)
  // ========================================
  {
    id: 'ansiedade',
    nome: 'Ansiedade',
    sinonimos: ['nervosismo', 'preocupação excessiva', 'angústia'],
    categoria: 'psiquiatrico',
    importancia: 'alta',
    doencasRelacionadas: ['transtorno-ansiedade-generalizada', 'transtorno-panico', 'fobia-social', 'hipertireoidismo'],
    peso: 0.7,
    redFlags: ['Ideação suicida', 'Sintomas psicóticos', 'Uso de substâncias'],
    perguntasChave: ['Há quanto tempo?', 'Gatilhos?', 'Sintomas físicos?', 'Impacto funcional?', 'Pensamentos negativos?']
  },
  {
    id: 'humor-deprimido',
    nome: 'Humor Deprimido',
    sinonimos: ['tristeza', 'desânimo', 'falta de prazer'],
    categoria: 'psiquiatrico',
    importancia: 'alta',
    doencasRelacionadas: ['depressao', 'transtorno-bipolar', 'luto', 'hipotireoidismo'],
    peso: 0.85,
    redFlags: ['Ideação suicida', 'Sintomas psicóticos', 'Perda de peso significativa'],
    perguntasChave: ['Duração?', 'Anedonia?', 'Alteração do sono/apetite?', 'Ideação suicida?', 'Episódios prévios?']
  },
  {
    id: 'ideacao-suicida',
    nome: 'Ideação Suicida',
    sinonimos: ['pensamentos suicidas', 'vontade de morrer'],
    categoria: 'psiquiatrico',
    importancia: 'alta',
    doencasRelacionadas: ['depressao', 'transtorno-bipolar', 'esquizofrenia', 'transtorno-personalidade-borderline'],
    peso: 0.99,
    redFlags: ['Plano suicida', 'Acesso a meios', 'Tentativa prévia', 'Desesperança'],
    perguntasChave: ['Passiva ou ativa?', 'Plano?', 'Acesso a meios?', 'Tentativas prévias?', 'Suporte social?']
  },
  {
    id: 'irritabilidade',
    nome: 'Irritabilidade',
    sinonimos: ['raiva', 'pavio curto', 'explosividade'],
    categoria: 'psiquiatrico',
    importancia: 'media',
    doencasRelacionadas: ['transtorno-bipolar', 'depressao', 'ansiedade', 'abstinencia', 'hipertireoidismo'],
    peso: 0.5,
    perguntasChave: ['Há quanto tempo?', 'Gatilhos?', 'Episódios de euforia?', 'Sono?', 'Uso de substâncias?']
  },
  {
    id: 'alucinacoes',
    nome: 'Alucinações',
    sinonimos: ['ouvir vozes', 'ver coisas'],
    categoria: 'psiquiatrico',
    importancia: 'alta',
    doencasRelacionadas: ['esquizofrenia', 'transtorno-bipolar', 'delirium', 'abstinencia-alcoolica', 'demencia'],
    peso: 0.95,
    redFlags: ['Comandos de violência', 'Primeiro episódio', 'Alteração de consciência (delirium)'],
    perguntasChave: ['Tipo (auditiva, visual)?', 'Conteúdo?', 'Insight?', 'Uso de substâncias?', 'Febre?']
  },
  {
    id: 'delirios',
    nome: 'Delírios',
    sinonimos: ['ideias persecutórias', 'mania de perseguição'],
    categoria: 'psiquiatrico',
    importancia: 'alta',
    doencasRelacionadas: ['esquizofrenia', 'transtorno-bipolar', 'demencia', 'delirium'],
    peso: 0.9,
    redFlags: ['Risco de heteroagressão', 'Primeiro episódio', 'Alteração de consciência'],
    perguntasChave: ['Tipo (persecutório, grandioso)?', 'Início?', 'Insight?', 'Alucinações?']
  },
  {
    id: 'compulsoes',
    nome: 'Compulsões',
    sinonimos: ['rituais', 'comportamentos repetitivos'],
    categoria: 'psiquiatrico',
    importancia: 'media',
    doencasRelacionadas: ['toc', 'transtorno-tricotilomania', 'transtorno-escoriacao'],
    peso: 0.7,
    perguntasChave: ['Quais comportamentos?', 'Obsessões associadas?', 'Tempo gasto?', 'Impacto funcional?']
  },
  {
    id: 'panico',
    nome: 'Ataques de Pânico',
    sinonimos: ['crise de pânico', 'medo intenso súbito'],
    categoria: 'psiquiatrico',
    importancia: 'alta',
    doencasRelacionadas: ['transtorno-panico', 'ansiedade', 'fobia', 'hipertireoidismo', 'feocromocitoma'],
    peso: 0.8,
    redFlags: ['Dor torácica (excluir cardíaco)', 'Dispneia intensa'],
    perguntasChave: ['Frequência?', 'Duração?', 'Sintomas físicos?', 'Medo de novos ataques?', 'Evitação?']
  },
];

// Export do total para estatísticas
export function getSintomasStats() {
  const porCategoria: Record<string, number> = {};
  sintomasDatabase.forEach(s => {
    porCategoria[s.categoria] = (porCategoria[s.categoria] || 0) + 1;
  });

  return {
    total: sintomasDatabase.length,
    porCategoria,
    porImportancia: {
      alta: sintomasDatabase.filter(s => s.importancia === 'alta').length,
      media: sintomasDatabase.filter(s => s.importancia === 'media').length,
      baixa: sintomasDatabase.filter(s => s.importancia === 'baixa').length,
    }
  };
}

// Busca sintomas por texto
export function buscarSintomas(query: string): Sintoma[] {
  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return sintomasDatabase.filter(s =>
    s.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery) ||
    s.sinonimos.some(sin => sin.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedQuery))
  );
}

// Busca sintomas por categoria
export function getSintomasPorCategoria(categoria: CategoriaSintoma): Sintoma[] {
  return sintomasDatabase.filter(s => s.categoria === categoria);
}

// Busca sintomas relacionados a uma doença
export function getSintomasPorDoenca(doencaId: string): Sintoma[] {
  return sintomasDatabase.filter(s => s.doencasRelacionadas.includes(doencaId));
}
