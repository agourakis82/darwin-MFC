/**
 * MEDICAMENTOS ENDÓCRINOS ADICIONAIS - DARWIN-MFC
 * ================================================
 *
 * Obesidade, tireoide adicional, diabetes especializado, hormônios
 * ~45 medicamentos
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosEndocrinoAdicional: Partial<Medicamento>[] = [
  // Obesidade
  {
    id: 'orlistate',
    nomeGenerico: 'Orlistate',
    nomesComerciais: ['Xenical', 'Alli'],
    atcCode: 'A08AB01',
    classeTerapeutica: 'antiobesidade',
    subclasse: 'inibidor_lipase',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '120mg', disponivelSUS: true },
    ],
    indicacoes: ['Obesidade com IMC ≥30', 'Sobrepeso com comorbidades (IMC ≥27)'],
    mecanismoAcao: 'Inibe lipases pancreáticas; reduz absorção de gorduras em ~30%',
    posologias: [
      {
        indicacao: 'Obesidade',
        adultos: { dose: '120mg', frequencia: '3x/dia com refeições contendo gordura', observacoes: 'Pular dose se refeição sem gordura' },
      }
    ],
    contraindicacoes: ['Síndrome de má absorção crônica', 'Colestase', 'Gestação'],
    efeitosAdversos: {
      comuns: ['Esteatorreia', 'Flatulência oleosa', 'Urgência fecal', 'Incontinência fecal'],
      graves: ['Lesão hepática grave (raro)', 'Nefrolitíase por oxalato']
    },
    interacoes: [
      { medicamento: 'Ciclosporina', gravidade: 'grave', efeito: 'Reduz absorção de ciclosporina', conduta: 'Administrar ciclosporina 2h antes ou após' },
      { medicamento: 'Levotiroxina', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar em 4h' },
      { medicamento: 'Vitaminas lipossolúveis', gravidade: 'moderada', efeito: 'Reduz absorção A, D, E, K', conduta: 'Suplementar; tomar ao deitar' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['obesidade'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'liraglutida-obesidade',
    nomeGenerico: 'Liraglutida',
    nomesComerciais: ['Saxenda'],
    atcCode: 'A10BJ02',
    classeTerapeutica: 'antiobesidade',
    subclasse: 'glp1',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '6mg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Obesidade com IMC ≥30', 'Sobrepeso com comorbidades (IMC ≥27)'],
    mecanismoAcao: 'Agonista GLP-1; reduz apetite e retarda esvaziamento gástrico',
    posologias: [
      {
        indicacao: 'Obesidade',
        adultos: { dose: 'Titulação: 0,6mg/sem por 4 semanas até 3mg', frequencia: 'SC 1x/dia', doseMaxima: '3mg/dia' },
      }
    ],
    contraindicacoes: ['NEM tipo 2', 'História pessoal/familiar de CMT', 'Pancreatite'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Vômitos', 'Diarreia', 'Constipação', 'Cefaleia'],
      graves: ['Pancreatite', 'Colelitíase', 'Taquicardia']
    },
    interacoes: [
      { medicamento: 'Insulina/sulfoniluréias', gravidade: 'moderada', efeito: 'Risco de hipoglicemia', conduta: 'Reduzir dose do outro agente' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Peso', 'HbA1c', 'Função renal', 'Sinais de pancreatite'],
    doencasRelacionadas: ['obesidade'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'semaglutida-obesidade',
    nomeGenerico: 'Semaglutida',
    nomesComerciais: ['Wegovy'],
    atcCode: 'A10BJ06',
    classeTerapeutica: 'antiobesidade',
    subclasse: 'glp1',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '0,25mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '0,5mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '1mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '1,7mg/0,75ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '2,4mg/0,75ml', disponivelSUS: false },
    ],
    indicacoes: ['Obesidade com IMC ≥30', 'Sobrepeso com comorbidades'],
    mecanismoAcao: 'Agonista GLP-1 de longa ação; reduz apetite centralmente',
    posologias: [
      {
        indicacao: 'Obesidade',
        adultos: { dose: 'Titulação mensal: 0,25→0,5→1→1,7→2,4mg', frequencia: 'SC 1x/semana', doseMaxima: '2,4mg/semana' },
      }
    ],
    contraindicacoes: ['NEM tipo 2', 'CMT pessoal/familiar', 'Pancreatite'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Vômitos', 'Diarreia', 'Fadiga'],
      graves: ['Pancreatite', 'Colelitíase', 'Retinopatia diabética (DM)']
    },
    interacoes: [
      { medicamento: 'Insulina/sulfoniluréias', gravidade: 'moderada', efeito: 'Hipoglicemia', conduta: 'Ajustar doses' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['obesidade'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'tirzepatida',
    nomeGenerico: 'Tirzepatida',
    nomesComerciais: ['Mounjaro', 'Zepbound'],
    atcCode: 'A10BX16',
    classeTerapeutica: 'antiobesidade',
    subclasse: 'dual_glp1_gip',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '2,5mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '5mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '7,5mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '10mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '12,5mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '15mg/0,5ml', disponivelSUS: false },
    ],
    indicacoes: ['Obesidade', 'DM2'],
    mecanismoAcao: 'Agonista dual GLP-1 e GIP; controle glicêmico e peso superior',
    posologias: [
      {
        indicacao: 'Obesidade/DM2',
        adultos: { dose: 'Iniciar 2,5mg, aumentar a cada 4 semanas', frequencia: 'SC 1x/semana', doseMaxima: '15mg/semana' },
      }
    ],
    contraindicacoes: ['NEM tipo 2', 'CMT', 'Pancreatite'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Constipação', 'Vômitos'],
      graves: ['Pancreatite', 'Hipoglicemia (com insulina)', 'Retinopatia']
    },
    interacoes: [
      { medicamento: 'Insulina', gravidade: 'moderada', efeito: 'Hipoglicemia', conduta: 'Reduzir dose de insulina' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['obesidade', 'diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'sibutramina',
    nomeGenerico: 'Sibutramina',
    nomesComerciais: ['Reductil', 'Biomag'],
    atcCode: 'A08AA10',
    classeTerapeutica: 'antiobesidade',
    subclasse: 'inibidor_recaptacao_ne_5ht',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '10mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '15mg', disponivelSUS: false },
    ],
    indicacoes: ['Obesidade com IMC ≥30 ou ≥27 com comorbidades'],
    mecanismoAcao: 'Inibe recaptação de noradrenalina e serotonina; reduz apetite',
    posologias: [
      {
        indicacao: 'Obesidade',
        adultos: { dose: '10-15mg', frequencia: '1x/dia pela manhã', doseMaxima: '15mg/dia' },
      }
    ],
    contraindicacoes: ['DCV estabelecida', 'HAS não controlada', 'Arritmias', 'IMAO', 'Anorexia/bulimia'],
    efeitosAdversos: {
      comuns: ['Xerostomia', 'Insônia', 'Constipação', 'Taquicardia', 'Aumento PA'],
      graves: ['Eventos CV (estudo SCOUT)', 'AVC', 'IAM']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Contraindicado' },
      { medicamento: 'ISRS', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Evitar' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['PA e FC a cada consulta'],
    doencasRelacionadas: ['obesidade'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'naltrexona-bupropiona',
    nomeGenerico: 'Naltrexona + Bupropiona',
    nomesComerciais: ['Contrave', 'Mysimba'],
    atcCode: 'A08AA62',
    classeTerapeutica: 'antiobesidade',
    subclasse: 'combinacao_saciedade',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '8mg+90mg', disponivelSUS: false },
    ],
    indicacoes: ['Obesidade', 'Sobrepeso com comorbidades'],
    mecanismoAcao: 'Naltrexona (antagonista opioide) + Bupropiona (inibidor recaptação DA/NE): reduz fome e comportamento hedônico',
    posologias: [
      {
        indicacao: 'Obesidade',
        adultos: { dose: 'Semana 1: 1cp manhã; S2: 1cp 2x; S3: 2cp manhã+1 noite; S4+: 2cp 2x/dia', frequencia: 'Titulação', doseMaxima: '32mg/360mg/dia' },
      }
    ],
    contraindicacoes: ['HAS não controlada', 'Epilepsia', 'Uso de opioides', 'IMAO', 'Anorexia/bulimia'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Constipação', 'Cefaleia', 'Insônia'],
      graves: ['Ideação suicida', 'Convulsões', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Opioides', gravidade: 'grave', efeito: 'Precipita abstinência; bloqueia analgesia', conduta: 'Contraindicado' },
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Crise hipertensiva', conduta: 'Contraindicado' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    doencasRelacionadas: ['obesidade'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Tireoide adicional
  {
    id: 'propiltiouracil',
    nomeGenerico: 'Propiltiouracil',
    nomesComerciais: ['Propiltiouracil', 'PTU'],
    atcCode: 'H03BA02',
    classeTerapeutica: 'antitireoidiano',
    subclasse: 'tionamida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipertireoidismo', 'Doença de Graves', 'Preparo para tireoidectomia', 'Crise tireotóxica'],
    mecanismoAcao: 'Inibe TPO e síntese hormonal; inibe conversão periférica T4→T3',
    posologias: [
      {
        indicacao: 'Hipertireoidismo',
        adultos: { dose: '300-600mg', frequencia: 'Dividido 3x/dia', doseMaxima: '1200mg/dia (crise)', observacoes: 'Preferido no 1º trimestre gestação e crise tireotóxica' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Rash', 'Prurido', 'Artralgia', 'Distúrbios GI'],
      graves: ['Agranulocitose', 'Hepatotoxicidade grave', 'Vasculite']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'moderada', efeito: 'Alteração do efeito anticoagulante', conduta: 'Monitorar INR' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Preferido na amamentação se necessário antitireoidiano' },
    monitorizacao: ['Hemograma', 'Função hepática', 'TSH, T4L'],
    doencasRelacionadas: ['hipertireoidismo', 'doenca-graves'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'metimazol',
    nomeGenerico: 'Metimazol',
    nomesComerciais: ['Tapazol'],
    atcCode: 'H03BB02',
    classeTerapeutica: 'antitireoidiano',
    subclasse: 'tionamida',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipertireoidismo', 'Doença de Graves'],
    mecanismoAcao: 'Inibe TPO e síntese de hormônios tireoidianos',
    posologias: [
      {
        indicacao: 'Hipertireoidismo',
        adultos: { dose: '10-40mg', frequencia: '1x/dia ou dividido', doseMaxima: '60mg/dia', observacoes: 'Preferido fora do 1º trimestre gestação' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade', '1º trimestre gestação (risco de aplasia cutis)'],
    efeitosAdversos: {
      comuns: ['Rash', 'Artralgia', 'Distúrbios GI'],
      graves: ['Agranulocitose', 'Hepatite colestática', 'Aplasia cutis congênita']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Altera efeito anticoagulante', conduta: 'Monitorar INR' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível em doses baixas' },
    monitorizacao: ['Hemograma com leucócitos', 'Função hepática', 'TSH'],
    doencasRelacionadas: ['hipertireoidismo'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'iodo-radioativo',
    nomeGenerico: 'Iodo-131 (Iodeto de Sódio)',
    nomesComerciais: ['Iodo Radioativo'],
    atcCode: 'V10XA01',
    classeTerapeutica: 'antitireoidiano',
    subclasse: 'radioisotopo',
    rename: true,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: 'Dose individualizada (mCi)', disponivelSUS: true },
    ],
    indicacoes: ['Hipertireoidismo (Graves, bócio multinodular)', 'Carcinoma diferenciado de tireoide'],
    mecanismoAcao: 'Destruição seletiva de tecido tireoidiano por radiação beta',
    posologias: [
      {
        indicacao: 'Hipertireoidismo',
        adultos: { dose: '5-15 mCi', frequencia: 'Dose única', observacoes: 'Dose calculada por medicina nuclear' },
      }
    ],
    contraindicacoes: ['Gestação', 'Amamentação', 'Planejamento de gravidez em 6 meses'],
    efeitosAdversos: {
      comuns: ['Hipotireoidismo (objetivo/esperado)', 'Tireoidite transitória'],
      graves: ['Crise tireotóxica (raro)', 'Sialoadenite']
    },
    interacoes: [],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado absolutamente' },
    monitorizacao: ['TSH a cada 4-6 semanas pós-dose', 'Início de levotiroxina quando hipotireoidismo'],
    doencasRelacionadas: ['hipertireoidismo', 'cancer-tireoide'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'liotironina',
    nomeGenerico: 'Liotironina (T3)',
    nomesComerciais: ['Cynomel', 'Thybon'],
    atcCode: 'H03AA02',
    classeTerapeutica: 'hormonio_tireoide',
    subclasse: 'tireoidiano',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mcg', disponivelSUS: false },
    ],
    indicacoes: ['Hipotireoidismo (combinado ou substituto de T4)', 'Coma mixedematoso', 'Supressão para rastreio Ca tireoide'],
    mecanismoAcao: 'Hormônio tireoidiano ativo T3',
    posologias: [
      {
        indicacao: 'Hipotireoidismo',
        adultos: { dose: '25-75mcg', frequencia: 'Dividido 2-3x/dia', doseMaxima: '100mcg/dia', observacoes: 'Meia-vida curta; picos séricos' },
      }
    ],
    contraindicacoes: ['Tireotoxicose', 'IAM recente', 'Insuficiência adrenal não tratada'],
    efeitosAdversos: {
      comuns: ['Palpitações', 'Tremor', 'Cefaleia'],
      graves: ['Arritmias', 'Angina', 'ICC']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes orais', gravidade: 'moderada', efeito: 'Aumenta efeito anticoagulante', conduta: 'Monitorar INR' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['hipotireoidismo'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Diabetes avançado
  {
    id: 'insulina-glargina',
    nomeGenerico: 'Insulina Glargina',
    nomesComerciais: ['Lantus', 'Basaglar', 'Toujeo'],
    atcCode: 'A10AE04',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_longa',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100U/ml', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '300U/ml', disponivelSUS: false },
    ],
    indicacoes: ['DM1', 'DM2'],
    mecanismoAcao: 'Análogo de insulina de ação prolongada; forma microprecipitados no SC',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '10-20U', frequencia: '1x/dia (mesmo horário)', observacoes: 'Titular a cada 3-7 dias para glicemia de jejum alvo' },
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Reações locais', 'Ganho de peso'],
      graves: ['Hipoglicemia grave', 'Lipodistrofia']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Mascara sintomas de hipoglicemia', conduta: 'Monitorar glicemia' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Glicemia capilar', 'HbA1c'],
    doencasRelacionadas: ['diabetes-mellitus-2', 'diabetes-mellitus-1'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'insulina-degludeca',
    nomeGenerico: 'Insulina Degludeca',
    nomesComerciais: ['Tresiba'],
    atcCode: 'A10AE06',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_ultralonga',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100U/ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '200U/ml', disponivelSUS: false },
    ],
    indicacoes: ['DM1', 'DM2'],
    mecanismoAcao: 'Análogo ultra-longo; meia-vida >25h; menor variabilidade glicêmica',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '10U', frequencia: '1x/dia (horário flexível)', observacoes: 'Menor risco de hipoglicemia noturna' },
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Reações locais'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Mascara hipoglicemia', conduta: 'Monitorar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'insulina-lispro',
    nomeGenerico: 'Insulina Lispro',
    nomesComerciais: ['Humalog'],
    atcCode: 'A10AB04',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_ultrarapida',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100U/ml', disponivelSUS: true },
    ],
    indicacoes: ['DM1', 'DM2 (bolus prandial)'],
    mecanismoAcao: 'Análogo de ação ultrarrápida; início 15min, pico 1-2h',
    posologias: [
      {
        indicacao: 'DM',
        adultos: { dose: 'Individualizada', frequencia: '15min antes ou imediatamente após refeições', observacoes: 'Calcular por carboidratos ou dose fixa' },
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Reações locais'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['diabetes-mellitus-1', 'diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'insulina-aspart',
    nomeGenerico: 'Insulina Aspart',
    nomesComerciais: ['NovoRapid', 'Fiasp'],
    atcCode: 'A10AB05',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_ultrarapida',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100U/ml', disponivelSUS: true },
    ],
    indicacoes: ['DM1', 'DM2 (bolus)'],
    mecanismoAcao: 'Análogo ultrarrápido; início <15min',
    posologias: [
      {
        indicacao: 'DM',
        adultos: { dose: 'Individualizada', frequencia: 'Imediatamente antes das refeições' },
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Reações locais'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['diabetes-mellitus-1'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'insulina-nph',
    nomeGenerico: 'Insulina NPH (Isofana)',
    nomesComerciais: ['Humulin N', 'Novolin N'],
    atcCode: 'A10AC01',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_intermediaria',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100U/ml', disponivelSUS: true },
    ],
    indicacoes: ['DM1', 'DM2', 'Diabetes gestacional'],
    mecanismoAcao: 'Insulina de ação intermediária; início 1-2h, pico 4-8h, duração 12-18h',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '10U', frequencia: '1-2x/dia', observacoes: 'Titular conforme glicemia' },
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso'],
      graves: ['Hipoglicemia grave', 'Lipodistrofia']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'dulaglutida',
    nomeGenerico: 'Dulaglutida',
    nomesComerciais: ['Trulicity'],
    atcCode: 'A10BJ05',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'glp1',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '0,75mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '1,5mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '3mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '4,5mg/0,5ml', disponivelSUS: false },
    ],
    indicacoes: ['DM2', 'Redução risco CV em DM2'],
    mecanismoAcao: 'Agonista GLP-1 semanal',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '0,75-4,5mg', frequencia: 'SC 1x/semana', doseMaxima: '4,5mg/semana' },
      }
    ],
    contraindicacoes: ['NEM2', 'CMT pessoal/familiar'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Vômitos'],
      graves: ['Pancreatite', 'Retinopatia']
    },
    interacoes: [
      { medicamento: 'Insulina/Sulfoniluréias', gravidade: 'moderada', efeito: 'Hipoglicemia', conduta: 'Reduzir dose' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'exenatida',
    nomeGenerico: 'Exenatida',
    nomesComerciais: ['Byetta', 'Bydureon'],
    atcCode: 'A10BJ01',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'glp1',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '5mcg/dose', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '10mcg/dose', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '2mg (LAR)', disponivelSUS: false },
    ],
    indicacoes: ['DM2'],
    mecanismoAcao: 'Agonista GLP-1 (exendina-4)',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '5-10mcg 2x/dia ou 2mg LAR 1x/semana', frequencia: 'Ver forma' },
      }
    ],
    contraindicacoes: ['DRC grave', 'Pancreatite', 'NEM2'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Vômitos', 'Diarreia'],
      graves: ['Pancreatite', 'Lesão renal aguda']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // iSGLT2
  {
    id: 'empagliflozina',
    nomeGenerico: 'Empagliflozina',
    nomesComerciais: ['Jardiance'],
    atcCode: 'A10BK03',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'isglt2',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false },
    ],
    indicacoes: ['DM2', 'Insuficiência cardíaca (com ou sem DM)', 'DRC'],
    mecanismoAcao: 'Inibe SGLT2 renal; aumenta glicosúria; efeitos cardioprotetores e nefroprotetores',
    posologias: [
      {
        indicacao: 'DM2/IC/DRC',
        adultos: { dose: '10-25mg', frequencia: '1x/dia', doseMaxima: '25mg/dia' },
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose', 'TFG <20 (para glicemia; pode usar para IC/DRC)'],
    efeitosAdversos: {
      comuns: ['ITU', 'Candidíase genital', 'Poliúria'],
      graves: ['Cetoacidose euglicêmica', 'Gangrena de Fournier', 'Amputações (classe)']
    },
    interacoes: [
      { medicamento: 'Diuréticos', gravidade: 'moderada', efeito: 'Hipotensão', conduta: 'Avaliar hidratação' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Função renal', 'Sinais de cetoacidose', 'Infecções genitais'],
    doencasRelacionadas: ['diabetes-mellitus-2', 'insuficiencia-cardiaca', 'drc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'dapagliflozina',
    nomeGenerico: 'Dapagliflozina',
    nomesComerciais: ['Forxiga'],
    atcCode: 'A10BK01',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'isglt2',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: ['DM2', 'IC com FE reduzida', 'DRC'],
    mecanismoAcao: 'Inibidor SGLT2; glicosúria + cardionefroproteção',
    posologias: [
      {
        indicacao: 'DM2/IC/DRC',
        adultos: { dose: '10mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose'],
    efeitosAdversos: {
      comuns: ['Candidíase genital', 'ITU', 'Poliúria'],
      graves: ['Cetoacidose euglicêmica', 'Gangrena de Fournier']
    },
    interacoes: [
      { medicamento: 'Insulina/Sulfoniluréias', gravidade: 'moderada', efeito: 'Hipoglicemia', conduta: 'Considerar redução' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['diabetes-mellitus-2', 'insuficiencia-cardiaca'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'canagliflozina',
    nomeGenerico: 'Canagliflozina',
    nomesComerciais: ['Invokana'],
    atcCode: 'A10BK02',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'isglt2',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: false },
    ],
    indicacoes: ['DM2', 'DRC diabética'],
    mecanismoAcao: 'Inibidor SGLT2',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '100-300mg', frequencia: '1x/dia antes do café', observacoes: 'ClCr 45-60: máx 100mg; <45: não iniciar' },
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose', 'TFG <30'],
    efeitosAdversos: {
      comuns: ['Candidíase', 'ITU', 'Hipotensão'],
      graves: ['Amputações (estudo CANVAS)', 'Cetoacidose', 'Fraturas']
    },
    interacoes: [],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // iDPP4
  {
    id: 'sitagliptina',
    nomeGenerico: 'Sitagliptina',
    nomesComerciais: ['Januvia'],
    atcCode: 'A10BH01',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'idpp4',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
    ],
    indicacoes: ['DM2'],
    mecanismoAcao: 'Inibe DPP-4; aumenta incretinas endógenas (GLP-1, GIP)',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '100mg', frequencia: '1x/dia', observacoes: 'Ajuste renal: ClCr 30-50: 50mg; <30: 25mg' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Pancreatite prévia'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Nasofaringite'],
      graves: ['Pancreatite', 'Angioedema', 'Penfigoide bolhoso']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    ajusteDoseRenal: [
      { tfg: '30-45', ajuste: '50mg/dia' },
      { tfg: '<30', ajuste: '25mg/dia' },
    ],
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'vildagliptina',
    nomeGenerico: 'Vildagliptina',
    nomesComerciais: ['Galvus'],
    atcCode: 'A10BH02',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'idpp4',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
    ],
    indicacoes: ['DM2'],
    mecanismoAcao: 'Inibidor DPP-4',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '50mg', frequencia: '1-2x/dia', doseMaxima: '100mg/dia' },
      }
    ],
    contraindicacoes: ['Pancreatite', 'Hepatopatia'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Tontura'],
      graves: ['Pancreatite', 'Hepatotoxicidade', 'Angioedema']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Função hepática periódica'],
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'saxagliptina',
    nomeGenerico: 'Saxagliptina',
    nomesComerciais: ['Onglyza'],
    atcCode: 'A10BH03',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'idpp4',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
    ],
    indicacoes: ['DM2'],
    mecanismoAcao: 'Inibidor DPP-4',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '2,5-5mg', frequencia: '1x/dia', observacoes: 'ClCr <45: 2,5mg' },
      }
    ],
    contraindicacoes: ['Pancreatite', 'IC (cautela - estudo SAVOR-TIMI)'],
    efeitosAdversos: {
      comuns: ['Infecções respiratórias', 'ITU', 'Cefaleia'],
      graves: ['Pancreatite', 'Hospitalização por IC (SAVOR)']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4/5', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Usar 2,5mg' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'linagliptina',
    nomeGenerico: 'Linagliptina',
    nomesComerciais: ['Trayenta'],
    atcCode: 'A10BH05',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'idpp4',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
    ],
    indicacoes: ['DM2'],
    mecanismoAcao: 'Inibidor DPP-4 (excreção biliar - sem ajuste renal)',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '5mg', frequencia: '1x/dia', observacoes: 'Não requer ajuste renal' },
      }
    ],
    contraindicacoes: ['Pancreatite'],
    efeitosAdversos: {
      comuns: ['Nasofaringite', 'Hipoglicemia (com SU)'],
      graves: ['Pancreatite', 'Angioedema']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Sulfoniluréias
  {
    id: 'glimepirida',
    nomeGenerico: 'Glimepirida',
    nomesComerciais: ['Amaryl', 'Betes'],
    atcCode: 'A10BB12',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'sulfonilureia',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
    ],
    indicacoes: ['DM2'],
    mecanismoAcao: 'Estimula secreção de insulina pelas células beta; SU de 3ª geração',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '1-8mg', frequencia: '1x/dia com café', doseMaxima: '8mg/dia' },
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose', 'Gestação'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso'],
      graves: ['Hipoglicemia grave prolongada']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Mascara hipoglicemia', conduta: 'Monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    ajusteDoseRenal: [
      { tfg: '<60', ajuste: 'Iniciar com menor dose' },
    ],
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'glibenclamida',
    nomeGenerico: 'Glibenclamida',
    nomesComerciais: ['Daonil', 'Euglucon'],
    atcCode: 'A10BB01',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'sulfonilureia',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
    ],
    indicacoes: ['DM2'],
    mecanismoAcao: 'Estimula secreção de insulina; SU de 2ª geração',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '2,5-20mg', frequencia: '1-2x/dia', doseMaxima: '20mg/dia' },
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose', 'DRC avançada', 'Idosos (maior risco hipoglicemia)'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Ganho de peso'],
      graves: ['Hipoglicemia grave e prolongada (meia-vida longa)']
    },
    interacoes: [
      { medicamento: 'Fluconazol', gravidade: 'moderada', efeito: 'Aumenta níveis de glibenclamida', conduta: 'Monitorar glicemia' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'gliclazida',
    nomeGenerico: 'Gliclazida',
    nomesComerciais: ['Diamicron', 'Azulix'],
    atcCode: 'A10BB09',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'sulfonilureia',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: true },
      { forma: 'comprimido_xr', concentracao: '30mg', disponivelSUS: true },
      { forma: 'comprimido_xr', concentracao: '60mg', disponivelSUS: true },
    ],
    indicacoes: ['DM2'],
    mecanismoAcao: 'Estimula secreção insulínica; menor risco de hipoglicemia entre SUs',
    posologias: [
      {
        indicacao: 'DM2',
        adultos: { dose: '30-120mg MR', frequencia: '1x/dia com café', doseMaxima: '120mg/dia' },
      }
    ],
    contraindicacoes: ['DM1', 'Cetoacidose'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia (menor que glibenclamida)', 'Ganho de peso'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['diabetes-mellitus-2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Hormônios diversos
  {
    id: 'desmopressina',
    nomeGenerico: 'Desmopressina',
    nomesComerciais: ['DDAVP', 'Minirin'],
    atcCode: 'H01BA02',
    classeTerapeutica: 'hormonio',
    subclasse: 'analogo_adh',
    rename: true,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '10mcg/dose', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '0,1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '0,2mg', disponivelSUS: true },
    ],
    indicacoes: ['Diabetes insipidus central', 'Enurese noturna', 'Hemofilia A/vWD leve'],
    mecanismoAcao: 'Análogo sintético do ADH; atua nos receptores V2 renais',
    posologias: [
      {
        indicacao: 'Diabetes insipidus',
        adultos: { dose: '0,1-0,4mg VO ou 10-40mcg nasal', frequencia: '1-3x/dia' },
        pediatrico: { dose: '5-30mcg nasal', frequencia: '1-2x/dia', idadeMinima: '3 meses' },
      }
    ],
    contraindicacoes: ['Hiponatremia', 'Polidipsia psicogênica', 'IC descompensada'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náuseas', 'Congestão nasal'],
      graves: ['Hiponatremia grave', 'Intoxicação hídrica', 'Convulsões']
    },
    interacoes: [
      { medicamento: 'Carbamazepina', gravidade: 'moderada', efeito: 'Potencializa efeito antidiurético', conduta: 'Monitorar sódio' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Sódio sérico', 'Osmolalidade', 'Volume urinário'],
    doencasRelacionadas: ['diabetes-insipidus'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'octreotida',
    nomeGenerico: 'Octreotida',
    nomesComerciais: ['Sandostatin', 'Sandostatin LAR'],
    atcCode: 'H01CB02',
    classeTerapeutica: 'hormonio',
    subclasse: 'analogo_somatostatina',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '0,1mg/ml', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '10mg LAR', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '20mg LAR', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '30mg LAR', disponivelSUS: true },
    ],
    indicacoes: ['Acromegalia', 'Tumores neuroendócrinos', 'Síndrome carcinoide', 'Sangramento varicoso', 'Diarreia secretora'],
    mecanismoAcao: 'Análogo da somatostatina; inibe GH, glucagon, insulina, secreções GI',
    posologias: [
      {
        indicacao: 'Acromegalia',
        adultos: { dose: '100-500mcg SC 3x/dia ou 10-30mg LAR IM 1x/mês', frequencia: 'Ver forma' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Diarreia/esteatorreia', 'Náuseas', 'Colelitíase'],
      graves: ['Bradicardia', 'Arritmias', 'Hipoglicemia/hiperglicemia']
    },
    interacoes: [
      { medicamento: 'Ciclosporina', gravidade: 'moderada', efeito: 'Reduz absorção de ciclosporina', conduta: 'Monitorar níveis' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Glicemia', 'Função tireoidiana', 'Ultrassom vesícula', 'GH/IGF-1'],
    doencasRelacionadas: ['acromegalia', 'tumores-neuroendocrinos'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'cabergolina',
    nomeGenerico: 'Cabergolina',
    nomesComerciais: ['Dostinex', 'Cabertrix'],
    atcCode: 'G02CB03',
    classeTerapeutica: 'hormonio',
    subclasse: 'agonista_dopamina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true },
    ],
    indicacoes: ['Hiperprolactinemia', 'Prolactinoma', 'Supressão lactação', 'Doença de Parkinson'],
    mecanismoAcao: 'Agonista dopaminérgico D2; inibe secreção de prolactina',
    posologias: [
      {
        indicacao: 'Hiperprolactinemia',
        adultos: { dose: '0,25-2mg', frequencia: '1-2x/semana', doseMaxima: '4,5mg/semana', observacoes: 'Iniciar 0,25mg 2x/semana' },
      },
      {
        indicacao: 'Supressão lactação',
        adultos: { dose: '1mg', frequencia: 'Dose única' },
      }
    ],
    contraindicacoes: ['Fibrose pulmonar/cardíaca', 'Valvulopatia', 'HAS puerperal'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Cefaleia', 'Tontura', 'Constipação'],
      graves: ['Fibrose valvular cardíaca (doses altas)', 'Psicose', 'Hipotensão postural']
    },
    interacoes: [
      { medicamento: 'Antipsicóticos', gravidade: 'grave', efeito: 'Antagonismo do efeito', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Suprime lactação' },
    monitorizacao: ['Prolactina', 'Ecocardiograma (uso crônico >2mg/semana)'],
    doencasRelacionadas: ['hiperprolactinemia', 'prolactinoma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'bromocriptina',
    nomeGenerico: 'Bromocriptina',
    nomesComerciais: ['Parlodel'],
    atcCode: 'G02CB01',
    classeTerapeutica: 'hormonio',
    subclasse: 'agonista_dopamina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: true },
    ],
    indicacoes: ['Hiperprolactinemia', 'Prolactinoma', 'Acromegalia', 'Doença de Parkinson'],
    mecanismoAcao: 'Agonista dopaminérgico D2',
    posologias: [
      {
        indicacao: 'Hiperprolactinemia',
        adultos: { dose: '2,5-15mg', frequencia: 'Dividido 2-3x/dia', doseMaxima: '30mg/dia', observacoes: 'Iniciar 1,25mg à noite' },
      }
    ],
    contraindicacoes: ['Eclâmpsia', 'Cardiopatia isquêmica'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Hipotensão ortostática', 'Cefaleia', 'Fadiga'],
      graves: ['Fibrose retroperitoneal', 'Psicose', 'Convulsões']
    },
    interacoes: [
      { medicamento: 'Antipsicóticos', gravidade: 'grave', efeito: 'Antagonismo', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Suprime lactação' },
    doencasRelacionadas: ['hiperprolactinemia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'fludrocortisona',
    nomeGenerico: 'Fludrocortisona',
    nomesComerciais: ['Florinef'],
    atcCode: 'H02AA02',
    classeTerapeutica: 'corticosteroide',
    subclasse: 'mineralocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,1mg', disponivelSUS: true },
    ],
    indicacoes: ['Insuficiência adrenal primária', 'Hiperplasia adrenal congênita', 'Hipotensão ortostática'],
    mecanismoAcao: 'Mineralocorticoide sintético; retém sódio e água',
    posologias: [
      {
        indicacao: 'Insuficiência adrenal',
        adultos: { dose: '0,05-0,2mg', frequencia: '1x/dia', doseMaxima: '0,2mg/dia' },
      }
    ],
    contraindicacoes: ['ICC', 'HAS grave', 'Edema'],
    efeitosAdversos: {
      comuns: ['Edema', 'HAS', 'Hipocalemia'],
      graves: ['ICC', 'Hipocalemia grave', 'Alcalose metabólica']
    },
    interacoes: [
      { medicamento: 'Diuréticos', gravidade: 'moderada', efeito: 'Hipocalemia', conduta: 'Monitorar potássio' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    monitorizacao: ['PA', 'Potássio', 'Sódio', 'Edema'],
    doencasRelacionadas: ['insuficiencia-adrenal'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];
