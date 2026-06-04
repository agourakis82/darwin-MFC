/**
 * ONCOLOGIA QUIMIOTERAPIA - DARWIN-MFC EXPANSAO 1000
 * ===================================================
 * Agentes quimioterapicos citotoxicos classicos:
 * Platinas, Taxanos, Antraciclinas, Antimetabolitos,
 * Alcaloides da Vinca, Inibidores de Topoisomerase.
 *
 * Referencias:
 * - NCCN Clinical Practice Guidelines in Oncology
 * - FDA Prescribing Information
 * - EMA Summary of Product Characteristics
 * - PharmGKB Pharmacogenomics Database
 * - WHO ATC Index 2024
 * - RxNorm (NIH/NLM)
 * - DrugBank 5.0
 * - SNOMED CT International Edition
 * - BC Cancer Drug Manual
 */

import { Medicamento } from '@/lib/types/medicamento';

export const oncologiaQuimioterapia: Partial<Medicamento>[] = [
  // ============================================================================
  // PLATINAS
  // ============================================================================
  {
    id: 'cisplatina',
    nomeGenerico: 'Cisplatina',
    nomesComerciais: ['Platinol', 'Platinil', 'Fauldcispla'],
    atcCode: 'L01XA01',
    rxNormCui: '2555',
    drugBankId: 'DB00515',
    snomedCT: '387318005',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '10mg/10ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '50mg/50ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '100mg/100ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Cancer de testiculo',
      'Cancer de ovario',
      'Cancer de bexiga',
      'Cancer de pulmao de pequenas celulas e nao pequenas celulas',
      'Cancer de cabeca e pescoco',
      'Cancer gastrico e esofagico',
      'Cancer de colo uterino',
      'Mesotelioma',
      'Osteossarcoma'
    ],
    mecanismoAcao: 'Agente ALQUILANTE de platina que forma ligacoes cruzadas intra e intercadeia com DNA atraves da ligacao covalente com bases purinicas (N7 da guanina). Isso impede a replicacao e transcricao do DNA, levando a apoptose celular. Nao e ciclo-celular especifico. MAIS POTENTE e MAIS NEFROTOXICA das platinas.',
    posologias: [
      {
        indicacao: 'Cancer de testiculo (BEP)',
        adultos: { dose: '20mg/m2/dia IV', frequencia: 'D1-5, a cada 21 dias', observacoes: 'Requer hidratacao vigorosa pre e pos-infusao (>2L cristaloide)' }
      },
      {
        indicacao: 'Cancer de pulmao (com vinorelbina ou etoposido)',
        adultos: { dose: '75-100mg/m2 IV', frequencia: 'D1, a cada 21 dias', observacoes: 'Alternativa: 25mg/m2 D1-3' }
      },
      {
        indicacao: 'Cancer de cabeca e pescoco (com radioterapia)',
        adultos: { dose: '100mg/m2 IV', frequencia: 'D1, D22, D43 (durante RT)', observacoes: 'Protocolo padrao de quimioradioterapia definitiva' }
      },
      {
        indicacao: 'Cancer de bexiga (MVAC ou GC)',
        adultos: { dose: '70mg/m2 IV', frequencia: 'D2, a cada 28 dias', observacoes: 'No regime GC (gencitabina + cisplatina)' }
      }
    ],
    contraindicacoes: [
      'Insuficiencia renal grave (ClCr <30ml/min)',
      'Perda auditiva pre-existente significativa',
      'Mielossupressao grave',
      'Hipersensibilidade a compostos de platina',
      'Gestacao'
    ],
    precaucoes: [
      'NEFROTOXICIDADE DOSE-LIMITANTE - hidratacao agressiva obrigatoria',
      'OTOTOXICIDADE irreversivel (audiometria basal e periodica)',
      'Neuropatia periferica (cumulativa)',
      'Nausea/vomito ALTAMENTE EMETOGENICO - esquema antiemetico triplo obrigatorio',
      'Hipomagnesemia e disturbios eletroliticos',
      'Mielossupressao (nadir 14-21 dias)'
    ],
    efeitosAdversos: {
      comuns: ['Nausea/vomitos (>90% sem profilaxia)', 'Nefrotoxicidade', 'Ototoxicidade', 'Neuropatia periferica', 'Mielossupressao', 'Anorexia'],
      graves: ['Insuficiencia renal aguda', 'Surdez permanente', 'Anafilaxia', 'Encefalopatia posterior reversivel', 'Eventos tromboembolicos']
    },
    interacoes: [
      { medicamento: 'Aminoglicosideos', gravidade: 'grave', efeito: 'Nefrotoxicidade e ototoxicidade aditivas', conduta: 'Evitar associacao; se necessario, monitorar funcao renal e auditiva' },
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Aumento do risco de nefrotoxicidade', conduta: 'Evitar; preferir paracetamol para dor' },
      { medicamento: 'Fenitoina', gravidade: 'moderada', efeito: 'Reduz niveis de fenitoina', conduta: 'Monitorar niveis; considerar ajuste' },
      { medicamento: 'Diureticos de alca', gravidade: 'moderada', efeito: 'Ototoxicidade aditiva', conduta: 'Preferir outros diureticos se possivel' },
      { medicamento: 'Paclitaxel', gravidade: 'moderada', efeito: 'Cisplatina apos paclitaxel reduz clearance e aumenta mielotoxicidade', conduta: 'Administrar paclitaxel ANTES da cisplatina' }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '46-60', ajuste: 'Reduzir para 75% da dose' },
      { tfg: '31-45', ajuste: 'Reduzir para 50% da dose' },
      { tfg: '<30', ajuste: 'CONTRAINDICADO' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado - excrecao no leite, potencial mutagenico' },
    consideracoesEspeciais: {
      idosos: 'Maior risco de nefro e ototoxicidade; considerar carboplatina',
      pediatrico: 'Usado em osteossarcoma e tumores germinativos; ototoxicidade irreversivel preocupante'
    },
    monitorizacao: ['Creatinina e clearance renal antes de cada ciclo', 'Magnesio, potassio, calcio', 'Audiometria basal e periodica', 'Hemograma', 'Exame neurologico'],
    doencasRelacionadas: ['cancer-testiculo', 'cancer-ovario', 'cancer-pulmao', 'cancer-bexiga', 'cancer-cabeca-pescoco'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['platina', 'quimioterapico', 'alquilante', 'nefrotoxicidade', 'ototoxicidade', 'rename']
  },
  {
    id: 'carboplatina',
    nomeGenerico: 'Carboplatina',
    nomesComerciais: ['Paraplatin', 'Carboplat', 'Fauldcarbo'],
    atcCode: 'L01XA02',
    rxNormCui: '2094',
    drugBankId: 'DB00958',
    snomedCT: '386906001',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '50mg/5ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '150mg/15ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '450mg/45ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '600mg/60ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Cancer de ovario',
      'Cancer de pulmao de pequenas celulas e nao pequenas celulas',
      'Cancer de endometrio',
      'Cancer de cabeca e pescoco',
      'Tumores germinativos',
      'Retinoblastoma',
      'Neuroblastoma',
      'Meduloblastoma'
    ],
    mecanismoAcao: 'Derivado de platina de SEGUNDA GERACAO. Mesmo mecanismo da cisplatina (ligacoes cruzadas DNA), porem MENOS NEFROTOXICA e MENOS EMETOGENICA. Dose calculada pela formula de CALVERT baseada na AUC desejada e TFG. Trombocitopenia e a toxicidade dose-limitante.',
    posologias: [
      {
        indicacao: 'Cancer de ovario (monoterapia ou com paclitaxel)',
        adultos: { dose: 'AUC 5-6 IV', frequencia: 'D1, a cada 21 dias', observacoes: 'Calculo pela formula de Calvert: Dose (mg) = AUC x (TFG + 25)' }
      },
      {
        indicacao: 'CPNPC com paclitaxel ou pemetrexede',
        adultos: { dose: 'AUC 5-6 IV', frequencia: 'D1, a cada 21 dias', observacoes: 'Usar TFG por CKD-EPI ou clearance de creatinina medido' }
      },
      {
        indicacao: 'Pediatrico (tumores solidos)',
        pediatrico: { dose: '400-600mg/m2 IV', frequencia: 'Variavel conforme protocolo', idadeMinima: 'Lactentes', observacoes: 'Em criancas, dose por m2 pode ser mais apropriada que AUC' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a compostos de platina',
      'Mielossupressao grave pre-existente',
      'Sangramento ativo significativo'
    ],
    precaucoes: [
      'TROMBOCITOPENIA dose-limitante (nadir 14-21 dias)',
      'Calcular dose pela formula de Calvert (AUC x [TFG + 25])',
      'Nefrotoxicidade MENOR que cisplatina (nao requer hidratacao agressiva)',
      'Emetogenicidade MODERADA (profilaxia adequada)',
      'Reacoes de hipersensibilidade aumentam com exposicoes repetidas (>6 ciclos)',
      'Neuropatia periferica (menos frequente que cisplatina)'
    ],
    efeitosAdversos: {
      comuns: ['Trombocitopenia (dose-limitante)', 'Neutropenia', 'Anemia', 'Nausea/vomitos', 'Fadiga', 'Alopecia'],
      graves: ['Mielossupressao grave', 'Reacoes de hipersensibilidade (especialmente apos >6 ciclos)', 'Nefrotoxicidade (rara)', 'Neurotoxicidade']
    },
    interacoes: [
      { medicamento: 'Aminoglicosideos', gravidade: 'moderada', efeito: 'Potencial nefrotoxicidade aditiva', conduta: 'Monitorar funcao renal' },
      { medicamento: 'Paclitaxel', gravidade: 'leve', efeito: 'Administrar paclitaxel ANTES da carboplatina para otimizar sequenciamento', conduta: 'Sequenciamento correto' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Pode aumentar INR', conduta: 'Monitorar INR' }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Usar formula de Calvert normalmente' },
      { tfg: '30-60', ajuste: 'Dose automaticamente ajustada pela formula de Calvert' },
      { tfg: '15-30', ajuste: 'Reduzir AUC alvo; monitorar toxicidade' },
      { tfg: '<15', ajuste: 'Dados limitados; considerar alternativas' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: 'Preferida sobre cisplatina devido a menor nefrotoxicidade',
      pediatrico: 'Amplamente usada em protocolos pediatricos'
    },
    monitorizacao: ['Hemograma antes de cada ciclo', 'Plaquetas especialmente', 'Creatinina/TFG para calculo de dose', 'Sinais de hipersensibilidade'],
    doencasRelacionadas: ['cancer-ovario', 'cancer-pulmao', 'cancer-endometrio', 'neuroblastoma', 'retinoblastoma'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['platina', 'quimioterapico', 'calvert', 'trombocitopenia', 'rename']
  },
  {
    id: 'oxaliplatina',
    nomeGenerico: 'Oxaliplatina',
    nomesComerciais: ['Eloxatin', 'Oxalip'],
    atcCode: 'L01XA03',
    rxNormCui: '32592',
    drugBankId: 'DB00526',
    snomedCT: '395824002',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '50mg/10ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '100mg/20ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '200mg/40ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Cancer colorretal (adjuvante e metastatico - FOLFOX)',
      'Cancer gastrico',
      'Cancer de pancreas',
      'Colangiocarcinoma',
      'Cancer de ovario (refratario a platina)'
    ],
    mecanismoAcao: 'Platina de TERCEIRA GERACAO com grupo diamino-ciclohexano. Forma adutos DNA que sao menos reconhecidos por mecanismos de reparo, conferindo atividade em tumores resistentes a cisplatina. NAO NEFROTOXICA. Neurotoxicidade periferica e a principal toxicidade dose-limitante, com componente agudo (sensibilidade ao frio) e cronico (cumulativo).',
    posologias: [
      {
        indicacao: 'FOLFOX (cancer colorretal)',
        adultos: { dose: '85mg/m2 IV em 2h', frequencia: 'D1, a cada 14 dias', observacoes: 'Associado a leucovorina + 5-FU. Evitar exposicao ao frio por 5 dias' }
      },
      {
        indicacao: 'FOLFOX adjuvante (colorretal estagio III)',
        adultos: { dose: '85mg/m2 IV', frequencia: 'D1, a cada 14 dias, por 12 ciclos (6 meses)', observacoes: 'Protocolos atuais estudam 3 meses (6 ciclos)' }
      },
      {
        indicacao: 'XELOX (com capecitabina)',
        adultos: { dose: '130mg/m2 IV', frequencia: 'D1, a cada 21 dias', observacoes: 'Alternativa ao FOLFOX' }
      }
    ],
    contraindicacoes: [
      'Neuropatia periferica grave pre-existente',
      'Hipersensibilidade a compostos de platina',
      'Gestacao e lactacao'
    ],
    precaucoes: [
      'NEUROTOXICIDADE AGUDA: disestesia laringofaringea e periferica induzida pelo FRIO',
      'Orientar paciente a EVITAR FRIO por 5 dias (bebidas geladas, ar-condicionado)',
      'NEUROTOXICIDADE CRONICA: cumulativa, pode ser irreversivel',
      'Considerar suspensao se neuropatia grau 2 persistente',
      'Sem nefrotoxicidade significativa',
      'Reacoes de hipersensibilidade (aumentam com exposicoes repetidas)'
    ],
    efeitosAdversos: {
      comuns: ['Neuropatia periferica aguda (85-95%)', 'Neuropatia cronica cumulativa', 'Nausea/vomitos', 'Diarreia', 'Fadiga', 'Trombocitopenia'],
      graves: ['Neuropatia sensitiva severa persistente', 'Sindrome de extravasamento capilar (raro)', 'Reacoes de hipersensibilidade', 'Fibrose pulmonar (raro)']
    },
    interacoes: [
      { medicamento: '5-Fluorouracil', gravidade: 'leve', efeito: 'Sinergismo antitumoral (uso intencional)', conduta: 'Protocolo FOLFOX' },
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infeccao por vacina', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '30-60', ajuste: 'Sem ajuste formal; monitorar' },
      { tfg: '<30', ajuste: 'Dados limitados; considerar reducao para 65mg/m2' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: 'Risco aumentado de neuropatia; monitorar de perto',
      pediatrico: 'Uso limitado em pediatria'
    },
    monitorizacao: ['Exame neurologico antes de cada ciclo', 'Hemograma', 'Funcao hepatica', 'Sinais de hipersensibilidade'],
    doencasRelacionadas: ['cancer-colorretal', 'cancer-gastrico', 'cancer-pancreas'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['platina', 'quimioterapico', 'FOLFOX', 'neurotoxicidade', 'rename', 'colorretal']
  },

  // ============================================================================
  // TAXANOS
  // ============================================================================
  {
    id: 'paclitaxel',
    nomeGenerico: 'Paclitaxel',
    nomesComerciais: ['Taxol', 'Oncotaxel', 'Paclineo'],
    atcCode: 'L01CD01',
    rxNormCui: '56946',
    drugBankId: 'DB01229',
    snomedCT: '387374002',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '30mg/5ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '100mg/16,7ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '150mg/25ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '300mg/50ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Cancer de mama',
      'Cancer de ovario',
      'Cancer de pulmao nao pequenas celulas',
      'Sarcoma de Kaposi',
      'Cancer de cabeca e pescoco',
      'Cancer de esofago',
      'Cancer de bexiga'
    ],
    mecanismoAcao: 'ESTABILIZADOR DE MICROTUBULOS derivado do teixo (Taxus brevifolia). Liga-se a subunidade beta da tubulina, promovendo polimerizacao de microtubulos ESTABILIZADOS que nao despolimerizam. Isso bloqueia a progressao da mitose na metafase, levando a apoptose. Ciclo-celular especifico (fase M). Formulacao convencional contem CREMOPHOR EL (requer pre-medicacao).',
    posologias: [
      {
        indicacao: 'Cancer de mama (adjuvante dose-densa)',
        adultos: { dose: '175mg/m2 IV em 3h', frequencia: 'D1, a cada 14 dias (com G-CSF)', observacoes: 'Alternativa: 80mg/m2 semanal' }
      },
      {
        indicacao: 'Cancer de ovario (com carboplatina)',
        adultos: { dose: '175mg/m2 IV em 3h', frequencia: 'D1, a cada 21 dias', observacoes: 'Administrar ANTES da carboplatina' }
      },
      {
        indicacao: 'CPNPC (com carboplatina)',
        adultos: { dose: '200mg/m2 IV em 3h', frequencia: 'D1, a cada 21 dias', observacoes: 'Pre-medicacao obrigatoria' }
      },
      {
        indicacao: 'Semanal (dose-densa)',
        adultos: { dose: '80mg/m2 IV em 1h', frequencia: 'Semanal por 12 semanas', observacoes: 'Melhor tolerada; usada em neoadjuvancia mama' }
      }
    ],
    contraindicacoes: [
      'Neutropenia basal <1.500/mm3',
      'Hipersensibilidade ao paclitaxel ou Cremophor EL',
      'Gestacao'
    ],
    precaucoes: [
      'PRE-MEDICACAO OBRIGATORIA: dexametasona + anti-H1 + anti-H2 (prevenir reacao ao Cremophor)',
      'Esquema tipico: Dexa 20mg VO 12h e 6h antes, difenidramina 50mg IV + ranitidina 50mg IV 30min antes',
      'Neuropatia periferica (dose-cumulativa)',
      'Mielossupressao (neutropenia nadir D8-11)',
      'Bradicardia transitoria (monitorar 1a infusao)',
      'Artralgias/mialgias 2-3 dias apos (comum)',
      'Alopecia total praticamente universal'
    ],
    efeitosAdversos: {
      comuns: ['Alopecia (87%)', 'Neutropenia', 'Neuropatia periferica', 'Artralgias/mialgias', 'Nausea', 'Diarreia'],
      graves: ['Reacao de hipersensibilidade grave (1-3%)', 'Neutropenia febril', 'Arritmias cardiacas', 'Pneumonite intersticial']
    },
    interacoes: [
      { medicamento: 'Cisplatina', gravidade: 'moderada', efeito: 'Administrar paclitaxel ANTES para evitar reducao de clearance', conduta: 'Sequenciamento correto' },
      { medicamento: 'Doxorrubicina', gravidade: 'moderada', efeito: 'Aumenta niveis de doxorrubicina se administrados juntos', conduta: 'Separar infusoes' },
      { medicamento: 'Inibidores CYP3A4/2C8', gravidade: 'moderada', efeito: 'Aumentam niveis de paclitaxel', conduta: 'Monitorar toxicidade' },
      { medicamento: 'Fenitoina/carbamazepina', gravidade: 'moderada', efeito: 'Indutores reduzem niveis de paclitaxel', conduta: 'Considerar aumento de dose ou alternativa' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: 'Maior risco de mielossupressao e neuropatia',
      hepatopatas: 'Reducao de dose em disfuncao hepatica moderada/grave'
    },
    monitorizacao: ['Hemograma antes de cada ciclo', 'Exame neurologico', 'ECG na primeira infusao', 'Sinais de hipersensibilidade'],
    doencasRelacionadas: ['cancer-mama', 'cancer-ovario', 'cancer-pulmao', 'sarcoma-kaposi'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['taxano', 'quimioterapico', 'microtubulos', 'alopecia', 'rename', 'cremophor']
  },
  {
    id: 'docetaxel',
    nomeGenerico: 'Docetaxel',
    nomesComerciais: ['Taxotere', 'Docetere'],
    atcCode: 'L01CD02',
    rxNormCui: '72962',
    drugBankId: 'DB01248',
    snomedCT: '386918005',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '20mg/ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '80mg/4ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '160mg/8ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Cancer de mama (adjuvante, neoadjuvante, metastatico)',
      'Cancer de prostata metastatico resistente a castracao',
      'Cancer de pulmao nao pequenas celulas',
      'Cancer gastrico',
      'Cancer de cabeca e pescoco'
    ],
    mecanismoAcao: 'TAXANO SEMISINTETICO derivado do teixo europeu. Mecanismo similar ao paclitaxel (estabilizacao de microtubulos), porem 2x mais potente in vitro. NAO contem Cremophor EL (formulado com polissorbato 80), mas ainda pode causar reacoes de hipersensibilidade e requer pre-medicacao. SINDROME DE RETENCAO HIDRICA e caracteristica.',
    posologias: [
      {
        indicacao: 'Cancer de mama (TC - com ciclofosfamida)',
        adultos: { dose: '75mg/m2 IV em 1h', frequencia: 'D1, a cada 21 dias por 4-6 ciclos', observacoes: 'Regime TC: Docetaxel + Ciclofosfamida' }
      },
      {
        indicacao: 'Cancer de prostata (com prednisona)',
        adultos: { dose: '75mg/m2 IV em 1h', frequencia: 'D1, a cada 21 dias', observacoes: 'Associar prednisona 5mg 2x/dia contínuo' }
      },
      {
        indicacao: 'Cancer gastrico (DCF)',
        adultos: { dose: '75mg/m2 IV', frequencia: 'D1, a cada 21 dias', observacoes: 'Com cisplatina + 5-FU; alta toxicidade' }
      },
      {
        indicacao: 'CPNPC',
        adultos: { dose: '75mg/m2 IV', frequencia: 'D1, a cada 21 dias', observacoes: 'Monoterapia ou combinacao' }
      }
    ],
    contraindicacoes: [
      'Neutropenia basal <1.500/mm3',
      'Insuficiencia hepatica grave (bilirrubina >ULN)',
      'Hipersensibilidade a docetaxel ou polissorbato 80',
      'Gestacao'
    ],
    precaucoes: [
      'PRE-MEDICACAO com corticoide: Dexametasona 8mg 2x/dia por 3 dias iniciando D-1',
      'Previne sindrome de retencao hidrica e reacoes de hipersensibilidade',
      'SINDROME DE RETENCAO HIDRICA: edema, ganho de peso, derrame pleural/pericardico',
      'Dose-cumulativa; monitorar peso',
      'Onicólise e alteracoes ungueais (gelo nas maos/pes durante infusao ajuda)',
      'Neutropenia febril (considerar G-CSF profilatico)',
      'Lacrimejamento (estenose lacrimal)'
    ],
    efeitosAdversos: {
      comuns: ['Neutropenia (muito comum)', 'Alopecia', 'Retencao hidrica/edema', 'Neuropatia periferica', 'Astenia', 'Onicólise', 'Lacrimejamento'],
      graves: ['Neutropenia febril', 'Sindrome de retencao hidrica grave', 'Reacoes de hipersensibilidade graves', 'Enterocolite neutropenica', 'Insuficiencia hepatica']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4 (cetoconazol, itraconazol)', gravidade: 'grave', efeito: 'Aumentam niveis de docetaxel significativamente', conduta: 'Evitar ou reduzir dose de docetaxel' },
      { medicamento: 'Indutores CYP3A4 (rifampicina)', gravidade: 'moderada', efeito: 'Reduzem eficacia', conduta: 'Considerar aumento de dose ou alternativa' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: 'Maior risco de toxicidade hematologica e infecciosa',
      hepatopatas: 'CONTRAINDICADO se bilirrubina >ULN ou transaminases >3,5x ULN'
    },
    monitorizacao: ['Hemograma antes de cada ciclo', 'Funcao hepatica', 'Peso (retencao hidrica)', 'Exame neurologico'],
    doencasRelacionadas: ['cancer-mama', 'cancer-prostata', 'cancer-pulmao', 'cancer-gastrico'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['taxano', 'quimioterapico', 'retencao-hidrica', 'onicólise', 'rename']
  },

  // ============================================================================
  // ANTRACICLINAS
  // ============================================================================
  {
    id: 'doxorrubicina',
    nomeGenerico: 'Doxorrubicina',
    nomesComerciais: ['Adriblastina', 'Adriamicina', 'Rubidox'],
    atcCode: 'L01DB01',
    rxNormCui: '3639',
    drugBankId: 'DB00997',
    snomedCT: '372817009',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '10mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '50mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Cancer de mama (AC, FAC, dose-densa)',
      'Linfoma de Hodgkin (ABVD)',
      'Linfoma nao-Hodgkin',
      'Sarcomas de partes moles',
      'Osteossarcoma',
      'Cancer de bexiga',
      'Cancer de tireoide',
      'Leucemia linfoblastica aguda'
    ],
    mecanismoAcao: 'ANTRACICLINA com multiplos mecanismos: 1) Intercalacao no DNA; 2) Inibicao da TOPOISOMERASE II; 3) Geracao de radicais livres de oxigenio. Nao ciclo-celular especifico. CARDIOTOXICIDADE e a principal toxicidade dose-limitante (dose cumulativa maxima ~450-550mg/m2). Vesicante potente - RISCO DE NECROSE TISSULAR SE EXTRAVASAR.',
    posologias: [
      {
        indicacao: 'Cancer de mama (AC dose-densa)',
        adultos: { dose: '60mg/m2 IV push ou infusao curta', frequencia: 'D1, a cada 14 dias por 4 ciclos (com G-CSF)', observacoes: 'Limite cumulativo 450mg/m2' }
      },
      {
        indicacao: 'Linfoma de Hodgkin (ABVD)',
        adultos: { dose: '25mg/m2 IV', frequencia: 'D1 e D15, a cada 28 dias', observacoes: 'Com bleomicina, vinblastina, dacarbazina' }
      },
      {
        indicacao: 'Sarcomas',
        adultos: { dose: '60-75mg/m2 IV', frequencia: 'D1, a cada 21 dias', observacoes: 'Monoterapia ou com ifosfamida' }
      }
    ],
    contraindicacoes: [
      'Cardiopatia grave pre-existente',
      'Dose cumulativa >550mg/m2 (ou >400mg/m2 com fatores de risco)',
      'Mielossupressao grave',
      'Hipersensibilidade a antraciclinas',
      'Insuficiencia hepatica grave'
    ],
    precaucoes: [
      'CARDIOTOXICIDADE CUMULATIVA: monitorar FEVE basal e periodica',
      'Risco aumenta: dose cumulativa, radiacao mediastinal previa, idade >70 anos, HAS, DM',
      'VESICANTE: extravasamento causa necrose grave - usar acesso venoso central se possivel',
      'Se extravasamento: DEXRAZOXANO IV ate 6h ou DMSO topico',
      'Coloracao avermelhada da urina (nao e hematuria)',
      'Mielossupressao (nadir 10-14 dias)',
      'Nausea/vomito moderado a alto potencial'
    ],
    efeitosAdversos: {
      comuns: ['Mielossupressao', 'Nausea/vomitos', 'Alopecia total', 'Mucosite', 'Coloracao urina', 'Fadiga'],
      graves: ['Cardiomiopatia/Insuficiencia cardiaca', 'Necrose tissular (extravasamento)', 'Leucemia secundaria', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Trastuzumab', gravidade: 'grave', efeito: 'Cardiotoxicidade sinergica', conduta: 'Nao administrar concomitantemente; sequenciar com intervalo' },
      { medicamento: 'Ciclofosfamida', gravidade: 'moderada', efeito: 'Cardiotoxicidade aditiva', conduta: 'Monitorar FEVE' },
      { medicamento: 'Paclitaxel', gravidade: 'moderada', efeito: 'Aumenta niveis de doxorrubicina se dado junto', conduta: 'Separar infusoes' },
      { medicamento: 'Verapamil', gravidade: 'moderada', efeito: 'Pode aumentar toxicidade cardiaca', conduta: 'Evitar' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: 'Maior risco de cardiotoxicidade; considerar doxorrubicina lipossomal',
      hepatopatas: 'Reduzir dose: Bili 1,2-3mg/dL: 50%; Bili 3,1-5: 75%; Bili >5: evitar',
      pediatrico: 'Monitorar crescimento; cardiotoxicidade pode manifestar decadas depois'
    },
    monitorizacao: ['FEVE (eco ou MUGA) basal, a cada 3 ciclos, e ao final', 'Hemograma', 'Funcao hepatica', 'Dose cumulativa (registrar)'],
    doencasRelacionadas: ['cancer-mama', 'linfoma-hodgkin', 'linfoma-nao-hodgkin', 'sarcoma', 'osteossarcoma'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['antraciclina', 'quimioterapico', 'cardiotoxicidade', 'vesicante', 'rename', 'topoisomerase']
  },

  // ============================================================================
  // AGENTES ALQUILANTES
  // ============================================================================
  {
    id: 'ciclofosfamida',
    nomeGenerico: 'Ciclofosfamida',
    nomesComerciais: ['Genuxal', 'Cytoxan', 'Neosar'],
    atcCode: 'L01AA01',
    rxNormCui: '3002',
    drugBankId: 'DB00531',
    snomedCT: '387420009',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '200mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '500mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '1000mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Cancer de mama (AC, CMF, TC)',
      'Linfomas',
      'Leucemias',
      'Mieloma multiplo',
      'Neuroblastoma',
      'Retinoblastoma',
      'Sarcoma de Ewing',
      'Lupus eritematoso sistemico (grave)',
      'Vasculites sistemicas (ANCA)',
      'Condicionamento para transplante de medula'
    ],
    mecanismoAcao: 'PRO-DROGA ALQUILANTE que requer ativacao hepatica pelo CYP2B6/CYP3A4. O metabolito ativo (mostarda de fosforamida) forma ligacoes cruzadas com DNA, impedindo replicacao. Metabolito ACROLEINA e UROXICO - causa CISTITE HEMORRAGICA (prevenivel com MESNA ou hidratacao). Nao ciclo-celular especifico.',
    posologias: [
      {
        indicacao: 'Cancer de mama (AC)',
        adultos: { dose: '600mg/m2 IV', frequencia: 'D1, a cada 21 dias por 4 ciclos', observacoes: 'Com doxorrubicina; nao requer mesna nesta dose' }
      },
      {
        indicacao: 'Linfomas (CHOP)',
        adultos: { dose: '750mg/m2 IV', frequencia: 'D1, a cada 21 dias', observacoes: 'Com doxorrubicina, vincristina, prednisona' }
      },
      {
        indicacao: 'Alta dose (TMO)',
        adultos: { dose: '60mg/kg/dia IV por 2-4 dias', frequencia: 'Conforme protocolo de condicionamento', observacoes: 'REQUER MESNA obrigatoriamente' }
      },
      {
        indicacao: 'Doencas autoimunes (LES, vasculites)',
        adultos: { dose: '500-1000mg/m2 IV mensal ou 1-2mg/kg/dia VO', frequencia: 'Mensal (IV) ou diario (VO)', observacoes: 'Doses menores que oncologia' }
      }
    ],
    contraindicacoes: [
      'Infeccao urinaria ativa ou obstrucao urinaria',
      'Mielossupressao grave',
      'Hipersensibilidade',
      'Gestacao'
    ],
    precaucoes: [
      'CISTITE HEMORRAGICA: prevenir com hidratacao e/ou MESNA em altas doses',
      'Mesna obrigatorio se >1g/m2 ou uso prolongado',
      'Infertilidade (preservacao ovariana/espermatica antes se jovens)',
      'Mielossupressao (nadir 8-14 dias)',
      'SIADH (intoxicacao hidrica) em doses altas',
      'Fibrose pulmonar (rara)',
      'Cardiotoxicidade em doses muito altas (>120mg/kg)',
      'Segundas neoplasias (leucemia, bexiga)'
    ],
    efeitosAdversos: {
      comuns: ['Nausea/vomitos', 'Alopecia', 'Mielossupressao', 'Amenorreia/azoospermia', 'Anorexia'],
      graves: ['Cistite hemorragica', 'Cardiomiopatia (alta dose)', 'SIADH', 'Fibrose pulmonar', 'Neoplasia secundaria de bexiga', 'Leucemia secundaria']
    },
    interacoes: [
      { medicamento: 'Alopurinol', gravidade: 'moderada', efeito: 'Aumenta mielotoxicidade', conduta: 'Monitorar hemograma' },
      { medicamento: 'Fenobarbital', gravidade: 'moderada', efeito: 'Aumenta metabolismo a metabolito toxico', conduta: 'Considerar alternativa' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Efeito variavel no INR', conduta: 'Monitorar INR' },
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Reduz absorcao de digoxina', conduta: 'Monitorar niveis' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '10-50', ajuste: 'Reduzir para 75% da dose' },
      { tfg: '<10', ajuste: 'Reduzir para 50% da dose' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: 'Maior risco de toxicidade; ajustar por funcao renal',
      pediatrico: 'Amplamente usado; atentar para fertilidade futura'
    },
    monitorizacao: ['Hemograma', 'Urina (hematuria)', 'Funcao renal', 'Sodio (SIADH em altas doses)'],
    doencasRelacionadas: ['cancer-mama', 'linfoma', 'leucemia', 'lupus', 'vasculite', 'transplante-medula'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['alquilante', 'quimioterapico', 'cistite-hemorragica', 'mesna', 'rename', 'imunossupressor']
  },

  // ============================================================================
  // ANTIMETABOLITOS
  // ============================================================================
  {
    id: 'metotrexato-oncologia',
    nomeGenerico: 'Metotrexato',
    nomesComerciais: ['Fauldmetro', 'MTX', 'Tecnomet'],
    atcCode: 'L01BA01',
    rxNormCui: '6851',
    drugBankId: 'DB00563',
    snomedCT: '387381009',
    classeTerapeutica: 'outros',
    subclasse: 'antimetabolito',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '25mg/ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '50mg/2ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '500mg/20ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '1000mg/10ml (alta dose)', disponivelSUS: true }
    ],
    indicacoes: [
      'Leucemia linfoblastica aguda (consolidacao e manutencao)',
      'Linfomas nao-Hodgkin',
      'Osteossarcoma (alta dose)',
      'Tumores trofoblasticos gestacionais',
      'Cancer de mama (CMF)',
      'Cancer de cabeca e pescoco',
      'Profilaxia/tratamento de doenca SNC'
    ],
    mecanismoAcao: 'ANTIFOLATO que inibe a DIHIDROFOLATO REDUTASE (DHFR), bloqueando a sintese de tetraidrofolato necessario para sintese de timidilato e purinas. Ciclo-celular especifico (fase S). Em ALTA DOSE (>500mg/m2), requer RESGATE com LEUCOVORINA. Poliglutamacao intracelular prolonga efeito. Excrecao renal - precipita em pH acido.',
    posologias: [
      {
        indicacao: 'LLA (consolidacao)',
        adultos: { dose: '1-5g/m2 IV em 24h', frequencia: 'Conforme protocolo', observacoes: 'HIDRATACAO + ALCALINIZACAO urinaria + LEUCOVORINA resgate obrigatorios' },
        pediatrico: { dose: '5g/m2 IV', frequencia: 'Conforme protocolo pediatrico', idadeMinima: 'Lactentes', observacoes: 'Resgate com leucovorina a partir de 24h' }
      },
      {
        indicacao: 'Osteossarcoma (alta dose)',
        adultos: { dose: '8-12g/m2 IV em 4-6h', frequencia: 'D1, conforme protocolo', observacoes: 'Monitorar niveis sericos para guiar resgate' }
      },
      {
        indicacao: 'Linfoma SNC / Profilaxia SNC (intratecal)',
        adultos: { dose: '12-15mg intratecal', frequencia: 'Semanal durante inducao', observacoes: 'Associar citarabina e corticoide conforme protocolo' }
      },
      {
        indicacao: 'Tumor trofoblastico (baixo risco)',
        adultos: { dose: '30-50mg/m2 IM', frequencia: 'Semanal', observacoes: 'Dose baixa; nao requer resgate' }
      }
    ],
    contraindicacoes: [
      'Insuficiencia renal (ClCr <40 para alta dose)',
      'Derrame pleural/ascitico volumoso (reservatorio)',
      'Infeccao ativa grave',
      'Gestacao (teratogenico - categoria X)',
      'Imunossupressao grave'
    ],
    precaucoes: [
      'ALTA DOSE: hidratacao agressiva (3L/m2/dia) + alcalinizacao pH urinario >7',
      'RESGATE com LEUCOVORINA a partir de 24h apos MTX (nao omitir!)',
      'Dosar nivel serico de MTX: 24h, 48h, 72h ate <0,1umol/L',
      'Terceiro espaco (derrame, ascite) prolonga meia-vida - toxicidade aumentada',
      'Mucosite pode ser grave',
      'Nefrotoxicidade (precipitacao tubular em pH acido)',
      'Hepatotoxicidade (aguda e cronica)',
      'Pneumonite (rara)',
      'Mielossupressao (nadir 7-14 dias)'
    ],
    efeitosAdversos: {
      comuns: ['Mucosite', 'Nausea', 'Mielossupressao', 'Elevacao transaminases', 'Fadiga'],
      graves: ['Insuficiencia renal aguda', 'Mielossupressao grave', 'Pneumonite', 'Encefalopatia (especialmente intratecal)', 'Necrose hepatica']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'grave', efeito: 'Reduzem excrecao renal de MTX, aumentando toxicidade', conduta: 'EVITAR em alta dose; suspender 48h antes' },
      { medicamento: 'Penicilinas', gravidade: 'moderada', efeito: 'Podem reduzir excrecao de MTX', conduta: 'Monitorar niveis' },
      { medicamento: 'Sulfametoxazol-trimetoprim', gravidade: 'grave', efeito: 'Efeito antifolato sinergico - pancitopenia', conduta: 'EVITAR' },
      { medicamento: 'IBPs', gravidade: 'moderada', efeito: 'Podem reduzir excrecao de MTX', conduta: 'Monitorar' },
      { medicamento: 'Leucovorina', gravidade: 'leve', efeito: 'Antagonismo intencional para resgate', conduta: 'Uso terapeutico' }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste (com monitorizacao em alta dose)' },
      { tfg: '40-60', ajuste: 'Reduzir dose em 50%; intensificar monitorizacao' },
      { tfg: '<40', ajuste: 'CONTRAINDICADO para alta dose' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: 'Maior risco de toxicidade renal e mucosa; ajustar dose',
      pediatrico: 'Usado extensivamente em LLA pediatrica; ajuste por peso/superficie'
    },
    monitorizacao: ['Niveis sericos de MTX (alta dose)', 'pH urinario (manter >7)', 'Hemograma', 'Funcao renal', 'Funcao hepatica', 'Exame bucal'],
    doencasRelacionadas: ['lla', 'linfoma', 'osteossarcoma', 'doenca-trofoblastica'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['antimetabolito', 'quimioterapico', 'antifolato', 'leucovorina', 'rename', 'alta-dose']
  },
  {
    id: 'fluorouracil',
    nomeGenerico: '5-Fluorouracil (5-FU)',
    nomesComerciais: ['Efurix', 'Adrucil', 'Fluorouracil'],
    atcCode: 'L01BC02',
    rxNormCui: '4492',
    drugBankId: 'DB00544',
    snomedCT: '387172005',
    classeTerapeutica: 'outros',
    subclasse: 'antimetabolito',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '250mg/10ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '500mg/10ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '2500mg/50ml', disponivelSUS: true },
      { forma: 'creme', concentracao: '5% (topico)', disponivelSUS: false }
    ],
    indicacoes: [
      'Cancer colorretal (FOLFOX, FOLFIRI, FOLFOXIRI)',
      'Cancer gastrico',
      'Cancer de pancreas',
      'Cancer de mama',
      'Cancer de cabeca e pescoco',
      'Cancer de esofago',
      'Ceratose actinica (topico)'
    ],
    mecanismoAcao: 'Analogo de PIRIMIDINA que inibe a TIMIDILATO SINTASE (via FdUMP), bloqueando a sintese de DNA. Tambem incorporado ao RNA, interferindo com processamento. Ciclo-celular especifico (fase S). Leucovorina POTENCIALIZA efeito ao estabilizar complexo FdUMP-TS. Infusao continua melhor tolerada que bolus. DEFICIENCIA DE DPD confere toxicidade grave.',
    posologias: [
      {
        indicacao: 'FOLFOX/FOLFIRI (colorretal)',
        adultos: { dose: '400mg/m2 bolus + 2400mg/m2 em infusao 46h', frequencia: 'D1, a cada 14 dias', observacoes: 'Associado a leucovorina que potencializa efeito' }
      },
      {
        indicacao: 'Cancer gastrico (CF ou DCF)',
        adultos: { dose: '750-1000mg/m2/dia em infusao continua', frequencia: 'D1-4 ou D1-5, a cada 21-28 dias', observacoes: 'Infusao continua via cateter central' }
      },
      {
        indicacao: 'Bolus semanal (Mayo Clinic regime - historico)',
        adultos: { dose: '425mg/m2 IV bolus', frequencia: 'D1-5, a cada 28 dias', observacoes: 'Mais toxico que infusao; menos usado atualmente' }
      }
    ],
    contraindicacoes: [
      'Deficiencia de DPD (dihidropirimidina desidrogenase)',
      'Mielossupressao grave',
      'Infeccao ativa grave',
      'Gestacao'
    ],
    precaucoes: [
      'RASTREAR DEFICIENCIA DE DPD antes do tratamento (genotipagem DPYD ou fenotipagem)',
      'Deficiencia DPD: toxicidade fatal com doses normais',
      'SINDROME MAO-PE (eritrodisestesia palmoplantar) - dose-dependente',
      'Mucosite/diarreia podem ser graves',
      'Espasmo coronariano/angina (raro, mas grave)',
      'Cardiotoxicidade - monitorar sintomas cardiacos',
      'Leucopenia (nadir 9-14 dias)',
      'Infusao continua: melhor perfil de seguranca que bolus'
    ],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Mucosite', 'Mielossupressao', 'Sindrome mao-pe', 'Nausea', 'Alopecia parcial'],
      graves: ['Toxicidade fatal por deficiencia DPD', 'Angina/espasmo coronariano', 'Enterocolite necrotizante', 'Neurotoxicidade cerebelar']
    },
    interacoes: [
      { medicamento: 'Leucovorina', gravidade: 'moderada', efeito: 'Potencializa efeito E toxicidade', conduta: 'Uso intencional; monitorar mucosite/diarreia' },
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Inibe CYP2C9, aumenta INR significativamente', conduta: 'Monitorar INR de perto; reduzir varfarina' },
      { medicamento: 'Fenitoina', gravidade: 'moderada', efeito: 'Aumenta niveis de fenitoina', conduta: 'Monitorar niveis' },
      { medicamento: 'Alopurinol', gravidade: 'moderada', efeito: 'Reduz toxicidade de 5-FU (pode ser usado como resgate)', conduta: 'Considerar em superdosagem' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: 'Maior risco de toxicidade; considerar dose reduzida',
      hepatopatas: 'Cautela; metabolismo hepatico'
    },
    monitorizacao: ['Teste DPD antes de iniciar (genotipagem DPYD)', 'Hemograma', 'Exame oral (mucosite)', 'Sintomas GI', 'Sintomas cardiacos'],
    doencasRelacionadas: ['cancer-colorretal', 'cancer-gastrico', 'cancer-pancreas', 'cancer-mama', 'cancer-cabeca-pescoco'],
    pharmgkb: [
      {
        gene: 'DPYD',
        phenotype: 'poor_metabolizer',
        implications: ['Risco de toxicidade grave ou fatal com doses padrao'],
        dosageRecommendations: ['EVITAR 5-FU/capecitabina ou reduzir dose drasticamente (25-50%)']
      },
      {
        gene: 'DPYD',
        phenotype: 'intermediate_metabolizer',
        implications: ['Risco aumentado de toxicidade'],
        dosageRecommendations: ['Reduzir dose inicial em 25-50%; titular por tolerancia']
      }
    ],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['antimetabolito', 'quimioterapico', 'pirimidina', 'DPD', 'rename', 'FOLFOX', 'infusao-continua']
  },
  {
    id: 'capecitabina',
    nomeGenerico: 'Capecitabina',
    nomesComerciais: ['Xeloda'],
    atcCode: 'L01BC06',
    rxNormCui: '194000',
    drugBankId: 'DB01101',
    snomedCT: '386906001',
    classeTerapeutica: 'outros',
    subclasse: 'antimetabolito',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Cancer colorretal metastatico (XELOX ou monoterapia)',
      'Cancer colorretal adjuvante',
      'Cancer de mama metastatico',
      'Cancer gastrico',
      'Cancer de pancreas'
    ],
    mecanismoAcao: 'PRO-DROGA ORAL do 5-fluorouracil. Convertida em 5-FU em tres etapas enzimaticas, com etapa final pela TIMIDINA FOSFORILASE que e mais expressa em tecidos tumorais, conferindo relativa seletividade tumoral. Permite tratamento ambulatorial simulando infusao continua de 5-FU. Mesma toxicidade DPD-dependente.',
    posologias: [
      {
        indicacao: 'Cancer colorretal (monoterapia ou XELOX)',
        adultos: { dose: '1000-1250mg/m2 VO 2x/dia', frequencia: 'D1-14, descanso D15-21, a cada 21 dias', observacoes: 'Tomar com agua ate 30min apos refeicao' }
      },
      {
        indicacao: 'Cancer de mama (com docetaxel ou monoterapia)',
        adultos: { dose: '1000-1250mg/m2 VO 2x/dia', frequencia: 'D1-14, a cada 21 dias', observacoes: 'Se com docetaxel, usar 950mg/m2 2x/dia' }
      },
      {
        indicacao: 'Adjuvante colorretal',
        adultos: { dose: '1250mg/m2 VO 2x/dia', frequencia: 'D1-14, a cada 21 dias, por 8 ciclos', observacoes: 'Equivalente a 5-FU/LV (protocolo Mayo)' }
      }
    ],
    contraindicacoes: [
      'Deficiencia de DPD',
      'Insuficiencia renal grave (ClCr <30)',
      'Hipersensibilidade a fluoropirimidinas',
      'Gestacao'
    ],
    precaucoes: [
      'RASTREAR DEFICIENCIA DE DPD antes de iniciar (mesma que 5-FU)',
      'SINDROME MAO-PE frequente e dose-limitante',
      'Prevencao: hidratante em maos e pes, evitar trauma',
      'Tratamento: interromper, reintroduzir com dose menor',
      'Diarreia pode ser grave - orientar loperamida',
      'Tomar APOS refeicao (com agua)',
      'Interacao importante com VARFARINA'
    ],
    efeitosAdversos: {
      comuns: ['Sindrome mao-pe (50-60%)', 'Diarreia', 'Nausea', 'Fadiga', 'Mucosite', 'Hiperbilirrubinemia'],
      graves: ['Toxicidade DPD (fatal)', 'Cardiotoxicidade/angina', 'Desidratacao grave por diarreia', 'Neutropenia febril']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Aumento dramatico de INR - sangramento fatal reportado', conduta: 'Monitorar INR FREQUENTEMENTE; reduzir varfarina significativamente' },
      { medicamento: 'Fenitoina', gravidade: 'moderada', efeito: 'Aumenta niveis de fenitoina', conduta: 'Monitorar niveis' },
      { medicamento: 'Acido folinico/leucovorina', gravidade: 'moderada', efeito: 'Potencializa toxicidade', conduta: 'Protocolo XELIRI; monitorar' },
      { medicamento: 'Alopurinol', gravidade: 'leve', efeito: 'Pode interferir na ativacao', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '30-50', ajuste: 'Reduzir para 75% da dose' },
      { tfg: '<30', ajuste: 'CONTRAINDICADO' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: 'Maior risco de toxicidade GI e mao-pe',
      hepatopatas: 'Hiperbilirrubinemia frequente; ajustar se bilirrubina >3x ULN'
    },
    monitorizacao: ['Teste DPD pre-tratamento', 'Hemograma', 'Funcao renal', 'INR se anticoagulado', 'Exame de maos e pes', 'Sintomas GI'],
    doencasRelacionadas: ['cancer-colorretal', 'cancer-mama', 'cancer-gastrico'],
    pharmgkb: [
      {
        gene: 'DPYD',
        phenotype: 'poor_metabolizer',
        implications: ['Risco de toxicidade grave ou fatal'],
        dosageRecommendations: ['EVITAR ou reduzir dose drasticamente']
      }
    ],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['antimetabolito', 'quimioterapico', 'pro-droga', '5-FU-oral', 'DPD', 'mao-pe']
  },
  {
    id: 'gemcitabina',
    nomeGenerico: 'Gemcitabina',
    nomesComerciais: ['Gemzar', 'Gemcit'],
    atcCode: 'L01BC05',
    rxNormCui: '12574',
    drugBankId: 'DB00441',
    snomedCT: '386919002',
    classeTerapeutica: 'outros',
    subclasse: 'antimetabolito',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '200mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '1000mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '2000mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Cancer de pancreas',
      'Cancer de pulmao nao pequenas celulas',
      'Cancer de bexiga',
      'Cancer de mama metastatico',
      'Cancer de ovario (recidiva platino-sensivel)',
      'Colangiocarcinoma',
      'Sarcomas de partes moles'
    ],
    mecanismoAcao: 'Analogo de CITIDINA (deoxicitidina) fosforilado intracelularmente a trifosfato ativo (dFdCTP). Incorporado ao DNA em lugar da citidina, causa terminacao da cadeia (masked chain termination). Tambem inibe a RIBONUCLEOTIDEO REDUTASE, reduzindo pool de deoxinucleotideos. Ciclo-celular especifico (fase S). Auto-potenciacao pelo metabolito.',
    posologias: [
      {
        indicacao: 'Cancer de pancreas (monoterapia)',
        adultos: { dose: '1000mg/m2 IV em 30min', frequencia: 'D1, 8, 15 de cada 28 dias (ou D1, 8 de 21)', observacoes: 'Infusao em 30min (taxa fixa de dose); infusao mais longa aumenta toxicidade' }
      },
      {
        indicacao: 'CPNPC (com cisplatina ou carboplatina)',
        adultos: { dose: '1000-1250mg/m2 IV', frequencia: 'D1, 8 de ciclo de 21 dias', observacoes: 'Associar platina D1' }
      },
      {
        indicacao: 'Cancer de bexiga (GC com cisplatina)',
        adultos: { dose: '1000mg/m2 IV', frequencia: 'D1, 8, 15 a cada 28 dias', observacoes: 'Regime GC menos toxico que MVAC' }
      },
      {
        indicacao: 'Cancer de mama (com paclitaxel)',
        adultos: { dose: '1250mg/m2 IV', frequencia: 'D1, 8 a cada 21 dias', observacoes: 'Depois de antraciclina e taxano' }
      }
    ],
    contraindicacoes: [
      'Mielossupressao grave pre-existente',
      'Hipersensibilidade a gemcitabina',
      'Gestacao'
    ],
    precaucoes: [
      'Taxa de infusao: 10mg/m2/minuto (infusao em 30min para 1000mg/m2)',
      'Infusao mais prolongada AUMENTA toxicidade hematologica',
      'SINDROME HEMOLITICO-UREMICA (rara mas grave) - suspender permanentemente',
      'Pneumonite intersticial (dispneia inexplicada)',
      'Hepatotoxicidade (especialmente com radioterapia concomitante)',
      'Radioterapia concomitante: extrema cautela (radiossensibilizante potente)',
      'Mielossupressao (nadir D8-15)'
    ],
    efeitosAdversos: {
      comuns: ['Mielossupressao', 'Nausea/vomitos', 'Sindrome gripal (febre, mialgia)', 'Rash', 'Elevacao transaminases', 'Proteinuria'],
      graves: ['Sindrome hemolitico-uremica', 'Pneumonite intersticial', 'Hepatotoxicidade grave', 'Capilarite (com RT)', 'Insuficiencia renal']
    },
    interacoes: [
      { medicamento: 'Radioterapia', gravidade: 'grave', efeito: 'Radiossensibilizante potente - toxicidade grave', conduta: 'Nao administrar concomitantemente; intervalo de 7 dias' },
      { medicamento: 'Vacinas vivas', gravidade: 'moderada', efeito: 'Risco de infeccao', conduta: 'Evitar' },
      { medicamento: 'Cisplatina', gravidade: 'leve', efeito: 'Sinergismo antitumoral', conduta: 'Uso intencional em GC' }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '30-60', ajuste: 'Sem ajuste formal; monitorar' },
      { tfg: '<30', ajuste: 'Dados limitados; cautela' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: 'Maior risco de mielossupressao',
      hepatopatas: 'Cautela; pode exacerbar hepatotoxicidade'
    },
    monitorizacao: ['Hemograma antes de cada dose', 'Funcao renal (creatinina, proteinuria)', 'Funcao hepatica', 'Sintomas respiratorios'],
    doencasRelacionadas: ['cancer-pancreas', 'cancer-pulmao', 'cancer-bexiga', 'colangiocarcinoma'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['antimetabolito', 'quimioterapico', 'analogo-pirimidina', 'pancreas', 'rename']
  },

  // ============================================================================
  // INIBIDORES DE TOPOISOMERASE
  // ============================================================================
  {
    id: 'irinotecano',
    nomeGenerico: 'Irinotecano',
    nomesComerciais: ['Camptosar', 'Tecnotecan'],
    atcCode: 'L01XX19',
    rxNormCui: '51499',
    drugBankId: 'DB00762',
    snomedCT: '386918005',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '40mg/2ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '100mg/5ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '300mg/15ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Cancer colorretal metastatico (FOLFIRI, FOLFOXIRI)',
      'Cancer colorretal 2a linha',
      'Cancer de pancreas (FOLFIRINOX)',
      'Cancer gastrico',
      'Cancer de pulmao de pequenas celulas',
      'Glioblastoma (off-label)'
    ],
    mecanismoAcao: 'Pro-droga convertida em SN-38 (metabolito ativo) pela carboxilesterase. SN-38 inibe a TOPOISOMERASE I, estabilizando complexo covalente DNA-enzima que causa quebras de fita simples durante replicacao. Ciclo-celular especifico (fase S). SN-38 inativado pela UGT1A1 - polimorfismo *28 confere toxicidade aumentada.',
    posologias: [
      {
        indicacao: 'FOLFIRI (colorretal)',
        adultos: { dose: '180mg/m2 IV em 30-90min', frequencia: 'D1, a cada 14 dias', observacoes: 'Com leucovorina + 5-FU' }
      },
      {
        indicacao: 'FOLFIRINOX (pancreas)',
        adultos: { dose: '180mg/m2 IV', frequencia: 'D1, a cada 14 dias', observacoes: 'Regime altamente toxico; considerar FOLFIRINOX modificado (dose menor)' }
      },
      {
        indicacao: 'Monoterapia (2a linha colorretal)',
        adultos: { dose: '350mg/m2 IV', frequencia: 'D1, a cada 21 dias', observacoes: 'Alta dose em monoterapia' }
      }
    ],
    contraindicacoes: [
      'Hiperbilirrubinemia (bilirrubina >2mg/dL)',
      'Sindrome de Gilbert (UGT1A1*28/*28 homozigoto)',
      'Obstrucao intestinal',
      'Neutropenia grave',
      'Gestacao'
    ],
    precaucoes: [
      'DIARREIA TARDIA (apos 24h) - pode ser grave/fatal; orientar LOPERAMIDA em alta dose',
      'Protocolo: Loperamida 4mg ao inicio + 2mg a cada 2h (maximo 48h), ate 12h sem diarreia',
      'DIARREIA PRECOCE (durante infusao): sindrome colinergica - tratar com ATROPINA 0,25-1mg SC',
      'Genotipagem UGT1A1 recomendada (*28/*28: reduzir dose 25-50%)',
      'Mielossupressao (nadir 6-9 dias)',
      'Atropina disponivel para sindrome colinergica',
      'Nausea/vomito emetogenicidade moderada'
    ],
    efeitosAdversos: {
      comuns: ['Diarreia tardia (80%)', 'Nausea/vomitos', 'Mielossupressao', 'Alopecia', 'Fadiga', 'Mucosi'],
      graves: ['Diarreia grave com desidratacao', 'Neutropenia febril', 'Colite/enterocolite', 'Pneumonite intersticial', 'Sindrome colinergica aguda']
    },
    interacoes: [
      { medicamento: 'Cetoconazol/inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumentam SN-38', conduta: 'Evitar; se necessario, reduzir dose' },
      { medicamento: 'Fenitoina/carbamazepina', gravidade: 'moderada', efeito: 'Reduzem SN-38 (indutores CYP3A4)', conduta: 'Considerar aumento de dose' },
      { medicamento: 'Atazanavir', gravidade: 'moderada', efeito: 'Inibe UGT1A1, aumenta toxicidade', conduta: 'Evitar' },
      { medicamento: 'Erva de Sao Joao', gravidade: 'moderada', efeito: 'Reduz eficacia', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '<60', ajuste: 'Dados limitados; nao bem estudado em DRC grave' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: 'Maior risco de diarreia grave',
      hepatopatas: 'CONTRAINDICADO se bilirrubina >2x ULN'
    },
    monitorizacao: ['Genotipagem UGT1A1 antes de iniciar', 'Hemograma', 'Funcao hepatica', 'Orientar sobre diarreia e uso de loperamida'],
    doencasRelacionadas: ['cancer-colorretal', 'cancer-pancreas', 'cancer-gastrico'],
    pharmgkb: [
      {
        gene: 'UGT1A1',
        variant: '*28/*28',
        phenotype: 'poor_metabolizer',
        implications: ['Risco muito aumentado de neutropenia e diarreia graves'],
        dosageRecommendations: ['Reduzir dose inicial em 25-50%']
      },
      {
        gene: 'UGT1A1',
        variant: '*1/*28',
        phenotype: 'intermediate_metabolizer',
        implications: ['Risco moderadamente aumentado de toxicidade'],
        dosageRecommendations: ['Considerar reducao de dose; monitorar de perto']
      }
    ],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['topoisomerase-I', 'quimioterapico', 'diarreia', 'UGT1A1', 'rename', 'FOLFIRI']
  },
  {
    id: 'etoposido',
    nomeGenerico: 'Etoposido (VP-16)',
    nomesComerciais: ['Vepesid', 'Etopol', 'Neoposid'],
    atcCode: 'L01CB01',
    rxNormCui: '4179',
    drugBankId: 'DB00773',
    snomedCT: '387316009',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '50mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '100mg/5ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '500mg/25ml', disponivelSUS: true }
    ],
    indicacoes: [
      'Cancer de pulmao de pequenas celulas',
      'Cancer de testiculo (BEP)',
      'Linfomas',
      'Leucemias agudas',
      'Sarcoma de Ewing',
      'Neuroblastoma',
      'Condicionamento para TMO'
    ],
    mecanismoAcao: 'Derivado da PODOFILOTOXINA que inibe a TOPOISOMERASE II. Estabiliza complexo covalente DNA-topoisomerase II, resultando em quebras de fita dupla irreparaveis e apoptose. Ciclo-celular especifico (fases S e G2). Disponivel VO (biodisponibilidade ~50%). Associado a LEUCEMIAS SECUNDARIAS (LMA) tipicamente 2-3 anos apos.',
    posologias: [
      {
        indicacao: 'Cancer de pulmao pequenas celulas (EP)',
        adultos: { dose: '100mg/m2 IV', frequencia: 'D1-3, a cada 21 dias', observacoes: 'Com cisplatina ou carboplatina' }
      },
      {
        indicacao: 'Cancer de testiculo (BEP)',
        adultos: { dose: '100mg/m2 IV', frequencia: 'D1-5, a cada 21 dias', observacoes: 'Com bleomicina e cisplatina' }
      },
      {
        indicacao: 'Via oral',
        adultos: { dose: '50mg/m2/dia VO', frequencia: 'D1-21, conforme protocolo', observacoes: 'Biodisponibilidade ~50%; dose oral = 2x dose IV' }
      },
      {
        indicacao: 'Alta dose (TMO)',
        adultos: { dose: '60mg/kg IV', frequencia: 'Dose unica no condicionamento', observacoes: 'Parte de regimes de condicionamento' }
      }
    ],
    contraindicacoes: [
      'Mielossupressao grave',
      'Hipersensibilidade ao etoposido ou derivados de podofilotoxina',
      'Gestacao'
    ],
    precaucoes: [
      'HIPOTENSAO durante infusao - infundir em 30-60min minimo',
      'Mielossupressao significativa (nadir 7-14 dias)',
      'LEUCEMIA SECUNDARIA (LMA/SMD): risco 1-3%, tipicamente 2-3 anos apos',
      'Translocacao 11q23 caracteristica',
      'Reacoes de hipersensibilidade (contem polissorbato 80/Cremophor)',
      'Mucosit em doses altas',
      'Formulacao oral: variabilidade de absorcao'
    ],
    efeitosAdversos: {
      comuns: ['Mielossupressao (dose-limitante)', 'Nausea/vomitos', 'Alopecia', 'Mucosite', 'Diarreia', 'Astenia'],
      graves: ['Hipotensao (infusao rapida)', 'Leucemia secundaria', 'Reacoes anafilacticas', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Pode aumentar INR', conduta: 'Monitorar' },
      { medicamento: 'Ciclosporina', gravidade: 'moderada', efeito: 'Aumenta niveis de etoposido', conduta: 'Monitorar toxicidade' },
      { medicamento: 'Fenitoina', gravidade: 'moderada', efeito: 'Reduz niveis de etoposido', conduta: 'Considerar aumento de dose' },
      { medicamento: 'Cisplatina', gravidade: 'leve', efeito: 'Sinergismo antitumoral', conduta: 'Uso intencional (EP, BEP)' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '15-50', ajuste: 'Reduzir para 75% da dose' },
      { tfg: '<15', ajuste: 'Reduzir para 50% da dose' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: 'Maior risco de mielossupressao',
      hepatopatas: 'Reduzir dose se bilirrubina elevada'
    },
    monitorizacao: ['Hemograma', 'Pressao arterial durante infusao', 'Funcao hepatica', 'Vigilancia para segundas neoplasias'],
    doencasRelacionadas: ['cancer-pulmao-pequenas-celulas', 'cancer-testiculo', 'linfoma', 'leucemia'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['topoisomerase-II', 'quimioterapico', 'podofilotoxina', 'leucemia-secundaria', 'rename']
  },

  // ============================================================================
  // ALCALOIDES DA VINCA E OUTROS
  // ============================================================================
  {
    id: 'vinorelbina',
    nomeGenerico: 'Vinorelbina',
    nomesComerciais: ['Navelbine'],
    atcCode: 'L01CA04',
    rxNormCui: '67338',
    drugBankId: 'DB00361',
    snomedCT: '386917000',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '10mg/ml', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '50mg/5ml', disponivelSUS: false },
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '30mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Cancer de pulmao nao pequenas celulas',
      'Cancer de mama metastatico',
      'Cancer de ovario'
    ],
    mecanismoAcao: 'ALCALOIDE DA VINCA semisintetico que inibe a polimerizacao de MICROTUBULOS ao ligar-se a tubulina. Impede formacao do fuso mitotico, bloqueando a divisao celular na metafase. Ciclo-celular especifico (fase M). Diferente dos taxanos (que estabilizam microtubulos). MENOS NEUROTOXICA que vincristina/vinblastina. VESICANTE.',
    posologias: [
      {
        indicacao: 'CPNPC (com cisplatina)',
        adultos: { dose: '25-30mg/m2 IV', frequencia: 'D1 e D8, a cada 21 dias', observacoes: 'Infundir em 6-10min em veia grande ou cateter central' }
      },
      {
        indicacao: 'Cancer de mama',
        adultos: { dose: '25-30mg/m2 IV', frequencia: 'Semanal', observacoes: 'Monoterapia ou combinacoes' }
      },
      {
        indicacao: 'Via oral',
        adultos: { dose: '60-80mg/m2 VO', frequencia: 'Semanal', observacoes: 'Dose oral maior que IV pela biodisponibilidade' }
      }
    ],
    contraindicacoes: [
      'Neutropenia grave (<1.000/mm3)',
      'Infeccao ativa grave',
      'Constipacao grave/ileo',
      'Gestacao'
    ],
    precaucoes: [
      'VESICANTE: extravasamento causa necrose - acesso venoso adequado obrigatorio',
      'Se extravasamento: hialuronidase local',
      'Mielossupressao significativa (neutropenia dose-limitante)',
      'Constipacao (menos que vincristina)',
      'Neuropatia periferica (menos frequente que outros alcaloides)',
      'Infundir em 6-10 minutos em veia de grande calibre',
      'Flushing com salina apos infusao'
    ],
    efeitosAdversos: {
      comuns: ['Neutropenia (dose-limitante)', 'Nausea', 'Constipacao', 'Fadiga', 'Alopecia leve', 'Flebite'],
      graves: ['Necrose tissular (extravasamento)', 'Neutropenia febril', 'Ileo paralitico', 'Neuropatia severa (raro)', 'Broncoespasmo']
    },
    interacoes: [
      { medicamento: 'Itraconazol/cetoconazol', gravidade: 'moderada', efeito: 'Inibem CYP3A4, aumentam toxicidade', conduta: 'Evitar; se necessario, reduzir dose' },
      { medicamento: 'Rifampicina', gravidade: 'moderada', efeito: 'Induz metabolismo, reduz eficacia', conduta: 'Considerar aumento de dose' },
      { medicamento: 'Mitomicina C', gravidade: 'grave', efeito: 'Broncoespasmo agudo', conduta: 'Evitar associacao' },
      { medicamento: 'Cisplatina', gravidade: 'leve', efeito: 'Sinergismo; neuropatia aditiva teorica', conduta: 'Uso intencional' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: 'Usar com cautela; maior risco de neutropenia',
      hepatopatas: 'Reduzir dose: bili 2,1-3: 50%; bili >3: 25%'
    },
    monitorizacao: ['Hemograma antes de cada dose', 'Acesso venoso (extravasamento)', 'Funcao intestinal', 'Funcao hepatica'],
    doencasRelacionadas: ['cancer-pulmao', 'cancer-mama'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['alcaloide-vinca', 'quimioterapico', 'microtubulos', 'vesicante', 'pulmao']
  },
  {
    id: 'bleomicina',
    nomeGenerico: 'Bleomicina',
    nomesComerciais: ['Blenoxane', 'Tecnomicina'],
    atcCode: 'L01DC01',
    rxNormCui: '1297',
    drugBankId: 'DB00290',
    snomedCT: '387113003',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '15UI', disponivelSUS: true }
    ],
    indicacoes: [
      'Linfoma de Hodgkin (ABVD)',
      'Tumores germinativos de testiculo (BEP)',
      'Carcinoma de celulas escamosas de cabeca e pescoco',
      'Carcinoma de colo uterino',
      'Derrame pleural maligno (pleurodese)'
    ],
    mecanismoAcao: 'Antibiotico GLICOPEPTIDICO que causa quebras de fita simples e dupla no DNA atraves de geracao de radicais livres de oxigenio mediada por ferro. Nao ciclo-celular especifico. BAIXA MIELOTOXICIDADE (diferencial). FIBROSE PULMONAR e a toxicidade dose-limitante caracteristica. Dose cumulativa maxima ~400UI.',
    posologias: [
      {
        indicacao: 'Linfoma de Hodgkin (ABVD)',
        adultos: { dose: '10UI/m2 IV', frequencia: 'D1 e D15, a cada 28 dias', observacoes: 'Limite cumulativo 400UI' }
      },
      {
        indicacao: 'Cancer de testiculo (BEP)',
        adultos: { dose: '30UI IV (dose fixa)', frequencia: 'D1, 8, 15 a cada 21 dias', observacoes: 'Dose fixa em UI, nao por m2' }
      },
      {
        indicacao: 'Pleurodese',
        adultos: { dose: '60UI diluida em 50-100ml SF', frequencia: 'Dose unica intrapleural', observacoes: 'Apos drenagem maxima do derrame' }
      }
    ],
    contraindicacoes: [
      'Fibrose pulmonar pre-existente',
      'Funcao pulmonar gravemente comprometida',
      'Hipersensibilidade a bleomicina'
    ],
    precaucoes: [
      'FIBROSE PULMONAR DOSE-DEPENDENTE: dose maxima cumulativa ~400UI',
      'Prova de funcao pulmonar (DLCO) basal e periodica',
      'Risco aumenta: >70 anos, tabagismo, RT toracica, O2 em altas concentracoes',
      'EVITAR O2 SUPLEMENTAR durante e apos cirurgia se possivel (toxicidade O2)',
      'REACAO IDIOSINCRATICA (febre, calafrios, hipotensao): mais comum em linfomas',
      'Dose-teste de 1-2UI recomendada em linfomas antes da primeira dose',
      'NAO causa mielossupressao significativa (diferencial)',
      'Toxicidade cutanea: hiperpigmentacao, descamacao'
    ],
    efeitosAdversos: {
      comuns: ['Febre/calafrios (ate 50%)', 'Toxicidade cutanea (hiperpigmentacao, rash)', 'Mucosite', 'Anorexia', 'Fadiga'],
      graves: ['Fibrose pulmonar/pneumonite (10%)', 'Reacao idiosincratica/anafilactoide', 'Fenomeno de Raynaud', 'Sindrome esclerodermiforme']
    },
    interacoes: [
      { medicamento: 'Oxigenio em alta concentracao', gravidade: 'grave', efeito: 'Aumenta toxicidade pulmonar', conduta: 'Evitar FiO2 alta durante e apos cirurgia' },
      { medicamento: 'Radioterapia toracica', gravidade: 'grave', efeito: 'Toxicidade pulmonar sinergica', conduta: 'Muita cautela; monitorar DLCO' },
      { medicamento: 'Cisplatina', gravidade: 'moderada', efeito: 'Reduz clearance renal da bleomicina', conduta: 'Monitorar funcao pulmonar' },
      { medicamento: 'Brentuximab', gravidade: 'grave', efeito: 'Aumento risco toxicidade pulmonar fatal em ABVD+Brentuximab', conduta: 'Nao associar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '40-50', ajuste: 'Reduzir para 70% da dose' },
      { tfg: '30-40', ajuste: 'Reduzir para 60% da dose' },
      { tfg: '20-30', ajuste: 'Reduzir para 55% da dose' },
      { tfg: '<20', ajuste: 'Reduzir para 40-50% da dose' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    consideracoesEspeciais: {
      idosos: '>70 anos: risco muito aumentado de toxicidade pulmonar; considerar omitir bleomicina',
      pediatrico: 'Menor risco de toxicidade pulmonar que adultos'
    },
    monitorizacao: ['DLCO basal e apos cada 100UI (ou sintomas)', 'Dose cumulativa total', 'RX torax periodico', 'Temperatura durante infusao', 'Exame cutaneo'],
    doencasRelacionadas: ['linfoma-hodgkin', 'cancer-testiculo', 'cancer-cabeca-pescoco', 'derrame-pleural-maligno'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['glicopeptideo', 'quimioterapico', 'fibrose-pulmonar', 'ABVD', 'BEP', 'rename', 'pleurodese']
  }
];
