/**
 * ANTIBIÓTICOS ADICIONAIS - DARWIN-MFC
 * =====================================
 *
 * Expansão final de antibióticos para cobertura completa
 * ~35 medicamentos
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosAntibioticosFinais: Partial<Medicamento>[] = [
  // Carbapenêmicos
  {
    id: 'meropenem',
    nomeGenerico: 'Meropenem',
    nomesComerciais: ['Meronem', 'Merrem'],
    atcCode: 'J01DH02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'carbapenemico',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '500mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '1g', disponivelSUS: true },
    ],
    indicacoes: ['Infecções graves', 'Meningite bacteriana', 'Sepse', 'Pneumonia hospitalar'],
    mecanismoAcao: 'Inibe síntese de parede celular; espectro muito amplo',
    posologias: [
      {
        indicacao: 'Infecções graves',
        adultos: { dose: '1g', frequencia: 'IV 8/8h', doseMaxima: '6g/dia' },
        pediatrico: { dose: '20-40mg/kg', frequencia: '8/8h IV', idadeMinima: '3 meses' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a beta-lactâmicos'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Cefaleia', 'Flebite'],
      graves: ['Convulsões', 'Colite por C. difficile', 'Reação anafilática']
    },
    interacoes: [
      { medicamento: 'Ácido valproico', gravidade: 'contraindicada', efeito: 'Reduz drasticamente níveis de valproato', conduta: 'Evitar combinação' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    ajusteDoseRenal: [
      { tfg: '26-50', ajuste: '1g 12/12h' },
      { tfg: '10-25', ajuste: '500mg 12/12h' },
      { tfg: '<10', ajuste: '500mg 24/24h' },
    ],
    doencasRelacionadas: ['sepse', 'pneumonia', 'meningite'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ertapenem',
    nomeGenerico: 'Ertapenem',
    nomesComerciais: ['Invanz'],
    atcCode: 'J01DH03',
    classeTerapeutica: 'antibiotico',
    subclasse: 'carbapenemico',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '1g', disponivelSUS: true },
    ],
    indicacoes: ['Infecções abdominais', 'Infecções pele/tecidos moles', 'Pneumonia comunitária', 'ITU complicada'],
    mecanismoAcao: 'Carbapenêmico de longa ação; sem cobertura para Pseudomonas',
    posologias: [
      {
        indicacao: 'Infecções',
        adultos: { dose: '1g', frequencia: 'IV ou IM 1x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Uso IM com lidocaína em alérgicos a amidas'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Cefaleia'],
      graves: ['Convulsões', 'Colite C. difficile']
    },
    interacoes: [
      { medicamento: 'Ácido valproico', gravidade: 'grave', efeito: 'Reduz níveis de valproato', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excreção mínima' },
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: '500mg 1x/dia' },
    ],
    doencasRelacionadas: ['infeccao-abdominal', 'pneumonia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'imipenem-cilastatina',
    nomeGenerico: 'Imipenem + Cilastatina',
    nomesComerciais: ['Tienam'],
    atcCode: 'J01DH51',
    classeTerapeutica: 'antibiotico',
    subclasse: 'carbapenemico',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '500mg+500mg', disponivelSUS: true },
    ],
    indicacoes: ['Infecções graves mistas', 'Sepse', 'Infecções intra-abdominais'],
    mecanismoAcao: 'Imipenem inibe parede celular; cilastatina previne degradação renal',
    posologias: [
      {
        indicacao: 'Infecções graves',
        adultos: { dose: '500mg', frequencia: 'IV 6/6h', doseMaxima: '4g/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Flebite'],
      graves: ['Convulsões (dose alta)', 'Colite C. difficile']
    },
    interacoes: [
      { medicamento: 'Ganciclovir', gravidade: 'grave', efeito: 'Convulsões', conduta: 'Evitar associação' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Baixa excreção' },
    doencasRelacionadas: ['sepse', 'infeccao-abdominal'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Glicopeptídeos
  {
    id: 'vancomicina',
    nomeGenerico: 'Vancomicina',
    nomesComerciais: ['Vancocina', 'Vancoled'],
    atcCode: 'J01XA01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'glicopeptideo',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '500mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '1g', disponivelSUS: true },
      { forma: 'capsula', concentracao: '125mg', disponivelSUS: true },
    ],
    indicacoes: ['MRSA', 'Endocardite estafilocócica', 'Meningite por Gram+', 'Colite C. difficile (oral)'],
    mecanismoAcao: 'Inibe síntese de parede celular em Gram+',
    posologias: [
      {
        indicacao: 'Infecção MRSA',
        adultos: { dose: '15-20mg/kg', frequencia: 'IV 8-12/12h', observacoes: 'Monitorar nível sérico' },
      },
      {
        indicacao: 'Colite C. difficile',
        adultos: { dose: '125mg VO', frequencia: '6/6h x 10-14 dias' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Nefrotoxicidade', 'Flebite', 'Rash'],
      graves: ['Síndrome do homem vermelho (infusão rápida)', 'Ototoxicidade', 'Nefrotoxicidade grave']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'grave', efeito: 'Nefrotoxicidade aditiva', conduta: 'Monitorar função renal' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Baixa absorção oral pelo lactente' },
    monitorizacao: ['Nível sérico (vale)', 'Creatinina', 'Audiometria em uso prolongado'],
    ajusteDoseRenal: [
      { tfg: '50-80', ajuste: 'Intervalo 12-24h' },
      { tfg: '10-50', ajuste: 'Intervalo 24-48h' },
      { tfg: '<10', ajuste: 'Guiar por nível sérico' },
    ],
    doencasRelacionadas: ['sepse', 'endocardite', 'mrsa'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'teicoplanina',
    nomeGenerico: 'Teicoplanina',
    nomesComerciais: ['Targocid'],
    atcCode: 'J01XA02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'glicopeptideo',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '200mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '400mg', disponivelSUS: true },
    ],
    indicacoes: ['MRSA', 'Endocardite Gram+', 'Osteomielite'],
    mecanismoAcao: 'Glicopeptídeo; meia-vida longa permite dose única diária',
    posologias: [
      {
        indicacao: 'Infecção MRSA',
        adultos: { dose: '6mg/kg 12/12h x 3 doses, depois 6mg/kg', frequencia: '1x/dia IM ou IV' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a glicopeptídeos'],
    efeitosAdversos: {
      comuns: ['Rash', 'Febre', 'Eosinofilia'],
      graves: ['Nefrotoxicidade', 'Ototoxicidade', 'Trombocitopenia']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'moderada', efeito: 'Nefrotoxicidade aditiva', conduta: 'Monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados limitados' },
    monitorizacao: ['Nível sérico (vale)', 'Função renal', 'Hemograma'],
    doencasRelacionadas: ['mrsa', 'endocardite', 'osteomielite'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Oxazolidinonas
  {
    id: 'linezolida',
    nomeGenerico: 'Linezolida',
    nomesComerciais: ['Zyvox'],
    atcCode: 'J01XX08',
    classeTerapeutica: 'antibiotico',
    subclasse: 'oxazolidinona',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '600mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '2mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['MRSA', 'VRE', 'Pneumonia hospitalar', 'Infecções pele/tecidos moles'],
    mecanismoAcao: 'Inibe síntese proteica; liga-se ao ribossoma 23S',
    posologias: [
      {
        indicacao: 'Infecções Gram+',
        adultos: { dose: '600mg', frequencia: 'VO ou IV 12/12h' },
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Síndrome serotoninérgica'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Cefaleia'],
      graves: ['Mielossupressão (trombocitopenia)', 'Neuropatia periférica', 'Acidose lática', 'Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'ISRS/ISRSN', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Evitar ou monitorar' },
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Crise hipertensiva', conduta: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretada no leite' },
    monitorizacao: ['Hemograma semanal', 'Sintomas neurológicos'],
    doencasRelacionadas: ['mrsa', 'vre', 'pneumonia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Polimixinas
  {
    id: 'polimixina-b',
    nomeGenerico: 'Polimixina B',
    nomesComerciais: ['Poly-b'],
    atcCode: 'J01XB02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'polimixina',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '500000UI', disponivelSUS: true },
    ],
    indicacoes: ['Infecções por Gram- MDR', 'Pseudomonas MDR', 'Acinetobacter MDR'],
    mecanismoAcao: 'Liga-se a LPS; rompe membrana celular bacteriana',
    posologias: [
      {
        indicacao: 'Infecções MDR',
        adultos: { dose: '25000UI/kg', frequencia: 'IV dividido 12/12h', doseMaxima: '2milhões UI/dia' },
      }
    ],
    contraindicacoes: ['Miastenia gravis', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Nefrotoxicidade', 'Parestesias', 'Tontura'],
      graves: ['Insuficiência renal', 'Bloqueio neuromuscular', 'Apneia']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'grave', efeito: 'Nefro e neurotoxicidade', conduta: 'Evitar' },
      { medicamento: 'Bloqueadores neuromusculares', gravidade: 'grave', efeito: 'Paralisia prolongada', conduta: 'Cautela extrema' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados limitados' },
    monitorizacao: ['Creatinina diária', 'Sintomas neurológicos'],
    doencasRelacionadas: ['sepse', 'pneumonia-hospitalar'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'colistimetato',
    nomeGenerico: 'Colistimetato de Sódio',
    nomesComerciais: ['Colomycin', 'Colistin'],
    atcCode: 'J01XB01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'polimixina',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '1milhãoUI', disponivelSUS: true },
      { forma: 'solucao_nebulizacao', concentracao: '1milhãoUI', disponivelSUS: true },
    ],
    indicacoes: ['Gram- MDR', 'Fibrose cística (inalatório)', 'Pseudomonas/Acinetobacter MDR'],
    mecanismoAcao: 'Pró-droga da colistina; age na membrana bacteriana',
    posologias: [
      {
        indicacao: 'Infecção MDR',
        adultos: { dose: '2,5-5mg CBA/kg', frequencia: 'IV dividido 8-12h' },
      }
    ],
    contraindicacoes: ['Miastenia gravis'],
    efeitosAdversos: {
      comuns: ['Nefrotoxicidade', 'Parestesias'],
      graves: ['IRA', 'Bloqueio neuromuscular']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'grave', efeito: 'Nefrotoxicidade aditiva', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['fibrose-cistica', 'pneumonia-hospitalar'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Aminoglicosídeos adicionais
  {
    id: 'amicacina',
    nomeGenerico: 'Amicacina',
    nomesComerciais: ['Novamin', 'Amikin'],
    atcCode: 'J01GB06',
    classeTerapeutica: 'antibiotico',
    subclasse: 'aminoglicosideo',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_im', concentracao: '250mg/ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '50mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Gram- graves', 'Tuberculose MDR', 'Endocardite', 'Sepse neonatal'],
    mecanismoAcao: 'Inibe síntese proteica; liga-se ao ribossomo 30S',
    posologias: [
      {
        indicacao: 'Infecção grave',
        adultos: { dose: '15-20mg/kg', frequencia: 'IV 1x/dia ou dividido 8/8h' },
      }
    ],
    contraindicacoes: ['Miastenia gravis', 'Hipersensibilidade a aminoglicosídeos'],
    efeitosAdversos: {
      comuns: ['Nefrotoxicidade', 'Ototoxicidade vestibular'],
      graves: ['Surdez irreversível', 'IRA', 'Bloqueio neuromuscular']
    },
    interacoes: [
      { medicamento: 'Vancomicina', gravidade: 'grave', efeito: 'Nefrotoxicidade', conduta: 'Monitorar creatinina' },
      { medicamento: 'Diuréticos de alça', gravidade: 'grave', efeito: 'Ototoxicidade', conduta: 'Evitar' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Baixa absorção oral' },
    monitorizacao: ['Nível sérico (pico/vale)', 'Creatinina', 'Audiometria'],
    ajusteDoseRenal: [
      { tfg: '40-60', ajuste: 'Dose normal, intervalo 24h' },
      { tfg: '20-40', ajuste: 'Dose normal, intervalo 36-48h' },
      { tfg: '<20', ajuste: 'Guiar por nível sérico' },
    ],
    doencasRelacionadas: ['sepse', 'tuberculose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'tobramicina',
    nomeGenerico: 'Tobramicina',
    nomesComerciais: ['Tobrex', 'Tobramina'],
    atcCode: 'J01GB01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'aminoglicosideo',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_im', concentracao: '40mg/ml', disponivelSUS: true },
      { forma: 'solucao_nebulizacao', concentracao: '300mg/5ml', disponivelSUS: true },
      { forma: 'colirio', concentracao: '0,3%', disponivelSUS: true },
    ],
    indicacoes: ['Pseudomonas', 'Fibrose cística (inalatório)', 'Conjuntivite bacteriana'],
    mecanismoAcao: 'Aminoglicosídeo; excelente anti-Pseudomonas',
    posologias: [
      {
        indicacao: 'Infecção Pseudomonas',
        adultos: { dose: '5-7mg/kg', frequencia: 'IV 1x/dia' },
      },
      {
        indicacao: 'Fibrose cística',
        adultos: { dose: '300mg', frequencia: 'Nebulização 12/12h x 28 dias' },
      }
    ],
    contraindicacoes: ['Miastenia gravis'],
    efeitosAdversos: {
      comuns: ['Nefrotoxicidade', 'Ototoxicidade'],
      graves: ['Surdez', 'Bloqueio neuromuscular']
    },
    interacoes: [
      { medicamento: 'Anfotericina B', gravidade: 'grave', efeito: 'Nefrotoxicidade', conduta: 'Evitar' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Baixa absorção' },
    doencasRelacionadas: ['fibrose-cistica', 'pseudomonas'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Tetraciclinas
  {
    id: 'doxiciclina',
    nomeGenerico: 'Doxiciclina',
    nomesComerciais: ['Vibramicina', 'Doxiclin'],
    atcCode: 'J01AA02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'tetraciclina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['Clamídia', 'Doença de Lyme', 'Riquétsioses', 'Malária (profilaxia)', 'Acne', 'DPOC exacerbação'],
    mecanismoAcao: 'Inibe síntese proteica no ribossomo 30S',
    posologias: [
      {
        indicacao: 'Clamídia',
        adultos: { dose: '100mg', frequencia: '12/12h x 7 dias' },
      },
      {
        indicacao: 'Doença de Lyme',
        adultos: { dose: '100mg', frequencia: '12/12h x 14-21 dias' },
      }
    ],
    contraindicacoes: ['Gestação', 'Crianças <8 anos', 'Insuficiência hepática grave'],
    efeitosAdversos: {
      comuns: ['Fotossensibilidade', 'Náuseas', 'Esofagite'],
      graves: ['Hipertensão intracraniana', 'Hepatotoxicidade', 'Hiperpigmentação']
    },
    interacoes: [
      { medicamento: 'Antiácidos', gravidade: 'moderada', efeito: 'Quelação', conduta: 'Separar em 2h' },
      { medicamento: 'Isotretinoína', gravidade: 'grave', efeito: 'Pseudotumor cerebri', conduta: 'Contraindicado' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Excreção no leite' },
    doencasRelacionadas: ['clamidia', 'lyme', 'acne'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'minociclina',
    nomeGenerico: 'Minociclina',
    nomesComerciais: ['Minomax', 'Minoderm'],
    atcCode: 'J01AA08',
    classeTerapeutica: 'antibiotico',
    subclasse: 'tetraciclina',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
    ],
    indicacoes: ['Acne moderada-grave', 'Rosácea', 'Artrite reumatoide (off-label)'],
    mecanismoAcao: 'Tetraciclina lipofílica; penetração em SNC',
    posologias: [
      {
        indicacao: 'Acne',
        adultos: { dose: '50-100mg', frequencia: '1-2x/dia' },
      }
    ],
    contraindicacoes: ['Gestação', 'Crianças <8 anos'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Vertigem', 'Náuseas', 'Hiperpigmentação'],
      graves: ['Síndrome tipo lúpus', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Retinoides', gravidade: 'grave', efeito: 'Hipertensão intracraniana', conduta: 'Evitar' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['acne', 'rosacea'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'tigeciclina',
    nomeGenerico: 'Tigeciclina',
    nomesComerciais: ['Tygacil'],
    atcCode: 'J01AA12',
    classeTerapeutica: 'antibiotico',
    subclasse: 'glicilciclina',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg', disponivelSUS: false },
    ],
    indicacoes: ['Infecções abdominais complicadas', 'Infecções de pele', 'Pneumonia comunitária'],
    mecanismoAcao: 'Glicilciclina; amplo espectro incluindo MDR',
    posologias: [
      {
        indicacao: 'Infecções',
        adultos: { dose: '100mg ataque, depois 50mg', frequencia: 'IV 12/12h' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a tetraciclinas'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Vômitos', 'Diarreia'],
      graves: ['Pancreatite', 'Hepatotoxicidade', 'Aumento mortalidade (estudos)']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumenta anticoagulação', conduta: 'Monitorar INR' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['infeccao-abdominal', 'celulite'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Cefalosporinas adicionais
  {
    id: 'cefepima',
    nomeGenerico: 'Cefepima',
    nomesComerciais: ['Maxcef', 'Cefepim'],
    atcCode: 'J01DE01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina_4g',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '1g', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '2g', disponivelSUS: true },
    ],
    indicacoes: ['Neutropenia febril', 'Pneumonia hospitalar', 'Meningite', 'Pseudomonas'],
    mecanismoAcao: 'Cefalosporina 4ª geração; estável a beta-lactamases',
    posologias: [
      {
        indicacao: 'Neutropenia febril',
        adultos: { dose: '2g', frequencia: 'IV 8/8h' },
      },
      {
        indicacao: 'Infecções graves',
        adultos: { dose: '1-2g', frequencia: 'IV 8-12/12h' },
      }
    ],
    contraindicacoes: ['Alergia a cefalosporinas'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Rash', 'Flebite'],
      graves: ['Encefalopatia (DRC)', 'Colite C. difficile', 'Neutropenia']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'moderada', efeito: 'Nefrotoxicidade', conduta: 'Monitorar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: 'Dose plena, intervalo 12-24h' },
      { tfg: '10-30', ajuste: 'Reduzir dose 50%' },
      { tfg: '<10', ajuste: 'Reduzir dose 75%' },
    ],
    doencasRelacionadas: ['neutropenia-febril', 'sepse'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ceftarolina',
    nomeGenerico: 'Ceftarolina',
    nomesComerciais: ['Zinforo'],
    atcCode: 'J01DI02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina_5g',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '600mg', disponivelSUS: false },
    ],
    indicacoes: ['Pneumonia comunitária', 'Infecções de pele por MRSA'],
    mecanismoAcao: 'Cefalosporina 5ª geração; ativa contra MRSA',
    posologias: [
      {
        indicacao: 'Pneumonia/Pele',
        adultos: { dose: '600mg', frequencia: 'IV 12/12h x 5-14 dias' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a cefalosporinas'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Rash'],
      graves: ['Colite C. difficile', 'Coombs direto positivo']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    ajusteDoseRenal: [
      { tfg: '30-50', ajuste: '400mg 12/12h' },
      { tfg: '15-30', ajuste: '300mg 12/12h' },
      { tfg: '<15', ajuste: '200mg 12/12h' },
    ],
    doencasRelacionadas: ['pneumonia', 'mrsa'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ceftazidima-avibactam',
    nomeGenerico: 'Ceftazidima + Avibactam',
    nomesComerciais: ['Zavicefta'],
    atcCode: 'J01DD52',
    classeTerapeutica: 'antibiotico',
    subclasse: 'cefalosporina_inibidor',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '2g+0,5g', disponivelSUS: false },
    ],
    indicacoes: ['Infecções por Gram- MDR', 'KPC', 'OXA-48', 'ITU complicada', 'Pneumonia hospitalar'],
    mecanismoAcao: 'Avibactam inibe beta-lactamases incluindo KPC',
    posologias: [
      {
        indicacao: 'Infecções MDR',
        adultos: { dose: '2g/0,5g', frequencia: 'IV 8/8h (infusão 2h)' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Cefaleia'],
      graves: ['Colite C. difficile', 'Convulsões']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' },
    ajusteDoseRenal: [
      { tfg: '31-50', ajuste: '1g/0,25g 8/8h' },
      { tfg: '16-30', ajuste: '0,75g/0,1875g 12/12h' },
      { tfg: '<15', ajuste: '0,75g/0,1875g 24/24h' },
    ],
    doencasRelacionadas: ['kpc', 'sepse'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antituberculosos
  {
    id: 'isoniazida',
    nomeGenerico: 'Isoniazida',
    nomesComerciais: ['Isoniazida'],
    atcCode: 'J04AC01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'antituberculoso',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
    ],
    indicacoes: ['Tuberculose (esquema RHZE)', 'Profilaxia TB latente'],
    mecanismoAcao: 'Inibe síntese de ácido micólico da parede celular',
    posologias: [
      {
        indicacao: 'TB ativa (esquema)',
        adultos: { dose: '5mg/kg', frequencia: '1x/dia', doseMaxima: '300mg/dia' },
      },
      {
        indicacao: 'Profilaxia (ILTB)',
        adultos: { dose: '5-10mg/kg', frequencia: '1x/dia x 6-9 meses', doseMaxima: '300mg/dia' },
      }
    ],
    contraindicacoes: ['Hepatopatia grave', 'Neuropatia prévia'],
    efeitosAdversos: {
      comuns: ['Hepatotoxicidade', 'Neuropatia periférica', 'Rash'],
      graves: ['Hepatite grave', 'Síndrome lúpus-like', 'Convulsões (overdose)']
    },
    interacoes: [
      { medicamento: 'Fenitoína', gravidade: 'grave', efeito: 'Aumenta toxicidade de fenitoína', conduta: 'Monitorar níveis' },
      { medicamento: 'Rifampicina', gravidade: 'moderada', efeito: 'Hepatotoxicidade aumentada', conduta: 'Monitorar TGO/TGP' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Suplementar B6 no lactente' },
    monitorizacao: ['TGO/TGP mensal nos primeiros meses', 'Sintomas de neuropatia'],
    orientacoesPaciente: ['Associar piridoxina 50mg/dia para prevenir neuropatia'],
    doencasRelacionadas: ['tuberculose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'rifampicina',
    nomeGenerico: 'Rifampicina',
    nomesComerciais: ['Rifadin', 'Rifaldin'],
    atcCode: 'J04AB02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'rifamicina',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '300mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '20mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Tuberculose', 'Hanseníase', 'Meningite meningocócica (profilaxia)', 'Endocardite estafilocócica'],
    mecanismoAcao: 'Inibe RNA polimerase bacteriana',
    posologias: [
      {
        indicacao: 'Tuberculose',
        adultos: { dose: '10mg/kg', frequencia: '1x/dia em jejum', doseMaxima: '600mg/dia' },
      },
      {
        indicacao: 'Profilaxia meningococo',
        adultos: { dose: '600mg', frequencia: '12/12h x 2 dias' },
      }
    ],
    contraindicacoes: ['Hepatopatia grave', 'Uso de ritonavir'],
    efeitosAdversos: {
      comuns: ['Hepatotoxicidade', 'Coloração laranja de fluidos', 'Sintomas GI'],
      graves: ['Hepatite', 'Trombocitopenia', 'IRA', 'Síndrome flu-like']
    },
    interacoes: [
      { medicamento: 'Contraceptivos orais', gravidade: 'grave', efeito: 'Indução CYP450 reduz eficácia', conduta: 'Usar método adicional' },
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Reduz anticoagulação', conduta: 'Aumentar dose varfarina' },
      { medicamento: 'Inibidores de protease', gravidade: 'contraindicada', efeito: 'Redução drástica de níveis', conduta: 'Usar rifabutina' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['TGO/TGP', 'Bilirrubinas', 'Hemograma'],
    orientacoesPaciente: ['Urina, lágrimas e suor ficam alaranjados'],
    doencasRelacionadas: ['tuberculose', 'hanseniase'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'pirazinamida',
    nomeGenerico: 'Pirazinamida',
    nomesComerciais: ['Pirazinamida'],
    atcCode: 'J04AK01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'antituberculoso',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
    ],
    indicacoes: ['Tuberculose (fase intensiva)'],
    mecanismoAcao: 'Pró-droga; ativa em ambiente ácido; mecanismo não totalmente elucidado',
    posologias: [
      {
        indicacao: 'Tuberculose',
        adultos: { dose: '25mg/kg', frequencia: '1x/dia', doseMaxima: '2g/dia' },
      }
    ],
    contraindicacoes: ['Hepatopatia grave', 'Gota aguda', 'Porfiria'],
    efeitosAdversos: {
      comuns: ['Hiperuricemia', 'Hepatotoxicidade', 'Artralgia'],
      graves: ['Hepatite grave', 'Rabdomiólise']
    },
    interacoes: [
      { medicamento: 'Alopurinol', gravidade: 'moderada', efeito: 'Reduz eficácia do alopurinol', conduta: 'Pode precisar dose maior' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Ácido úrico', 'TGO/TGP'],
    doencasRelacionadas: ['tuberculose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'etambutol',
    nomeGenerico: 'Etambutol',
    nomesComerciais: ['Etambutol'],
    atcCode: 'J04AK02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'antituberculoso',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
    ],
    indicacoes: ['Tuberculose (esquema RHZE)'],
    mecanismoAcao: 'Inibe arabinosil transferase; impede síntese de arabinogalactano',
    posologias: [
      {
        indicacao: 'Tuberculose',
        adultos: { dose: '15-20mg/kg', frequencia: '1x/dia', doseMaxima: '1200mg/dia' },
      }
    ],
    contraindicacoes: ['Neurite óptica prévia', 'Crianças pequenas (não detectam alteração visual)'],
    efeitosAdversos: {
      comuns: ['Neurite óptica (dose-dependente)', 'Hiperuricemia'],
      graves: ['Cegueira (se não reconhecida)', 'Neuropatia periférica']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Exame oftalmológico periódico', 'Visão de cores'],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: '15-25mg/kg 3x/semana' },
    ],
    doencasRelacionadas: ['tuberculose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antifúngicos adicionais
  {
    id: 'anfotericina-b',
    nomeGenerico: 'Anfotericina B Desoxicolato',
    nomesComerciais: ['Fungizon'],
    atcCode: 'J02AA01',
    classeTerapeutica: 'antifungico',
    subclasse: 'polieno',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg', disponivelSUS: true },
    ],
    indicacoes: ['Infecções fúngicas graves', 'Leishmaniose visceral', 'Criptococose', 'Histoplasmose'],
    mecanismoAcao: 'Liga-se ao ergosterol da membrana fúngica',
    posologias: [
      {
        indicacao: 'Micoses sistêmicas',
        adultos: { dose: '0,5-1mg/kg', frequencia: 'IV 1x/dia (iniciar com dose teste 1mg)' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Nefrotoxicidade', 'Hipocalemia', 'Febre/calafrios', 'Flebite'],
      graves: ['IRA', 'Arritmias (hipocalemia)', 'Anemia']
    },
    interacoes: [
      { medicamento: 'Outros nefrotóxicos', gravidade: 'grave', efeito: 'Nefrotoxicidade aditiva', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Pouca absorção oral' },
    monitorizacao: ['Creatinina', 'K+', 'Mg2+', 'Hemograma'],
    orientacoesPaciente: ['Pré-medicar com antitérmico e anti-histamínico'],
    doencasRelacionadas: ['criptococose', 'leishmaniose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'anfotericina-lipossomal',
    nomeGenerico: 'Anfotericina B Lipossomal',
    nomesComerciais: ['AmBisome'],
    atcCode: 'J02AA01',
    classeTerapeutica: 'antifungico',
    subclasse: 'polieno',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg', disponivelSUS: true },
    ],
    indicacoes: ['Micoses graves em intolerantes à convencional', 'Leishmaniose visceral', 'Aspergilose'],
    mecanismoAcao: 'Formulação lipossômica; menor toxicidade renal',
    posologias: [
      {
        indicacao: 'Micoses sistêmicas',
        adultos: { dose: '3-5mg/kg', frequencia: 'IV 1x/dia' },
      },
      {
        indicacao: 'Leishmaniose',
        adultos: { dose: '3mg/kg', frequencia: 'Dias 1-5, 14 e 21' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Febre', 'Calafrios', 'Náuseas'],
      graves: ['Nefrotoxicidade (menor que convencional)', 'Hipocalemia']
    },
    interacoes: [
      { medicamento: 'Nefrotóxicos', gravidade: 'moderada', efeito: 'Toxicidade aditiva', conduta: 'Monitorar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' },
    monitorizacao: ['Creatinina', 'Eletrólitos'],
    doencasRelacionadas: ['leishmaniose', 'aspergilose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'voriconazol',
    nomeGenerico: 'Voriconazol',
    nomesComerciais: ['Vfend'],
    atcCode: 'J02AC03',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '200mg', disponivelSUS: true },
    ],
    indicacoes: ['Aspergilose invasiva', 'Candidíase invasiva', 'Fusariose'],
    mecanismoAcao: 'Inibe 14-alfa-desmetilase; bloqueia síntese de ergosterol',
    posologias: [
      {
        indicacao: 'Aspergilose',
        adultos: { dose: '6mg/kg 12/12h x 2 doses, depois 4mg/kg 12/12h', frequencia: 'IV ou 200-300mg VO 12/12h' },
      }
    ],
    contraindicacoes: ['Uso de rifampicina', 'QT longo'],
    efeitosAdversos: {
      comuns: ['Distúrbios visuais', 'Hepatotoxicidade', 'Rash', 'Fotossensibilidade'],
      graves: ['Hepatite', 'Prolongamento QT', 'Carcinoma espinocelular (uso prolongado)']
    },
    interacoes: [
      { medicamento: 'Rifampicina', gravidade: 'contraindicada', efeito: 'Reduz níveis de voriconazol', conduta: 'Contraindicado' },
      { medicamento: 'Sirolimo', gravidade: 'contraindicada', efeito: 'Aumenta níveis de sirolimo', conduta: 'Contraindicado' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['TGO/TGP', 'Nível sérico', 'ECG'],
    doencasRelacionadas: ['aspergilose', 'candidiase-invasiva'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'caspofungina',
    nomeGenerico: 'Caspofungina',
    nomesComerciais: ['Cancidas'],
    atcCode: 'J02AX04',
    classeTerapeutica: 'antifungico',
    subclasse: 'equinocandina',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '70mg', disponivelSUS: true },
    ],
    indicacoes: ['Candidíase invasiva', 'Aspergilose (refratária)', 'Candidemia'],
    mecanismoAcao: 'Inibe síntese de beta-glucano da parede fúngica',
    posologias: [
      {
        indicacao: 'Candidíase invasiva',
        adultos: { dose: '70mg ataque, depois 50mg', frequencia: 'IV 1x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Febre', 'Flebite', 'Cefaleia', 'Elevação de transaminases'],
      graves: ['Hepatotoxicidade', 'Reações de hipersensibilidade']
    },
    interacoes: [
      { medicamento: 'Ciclosporina', gravidade: 'moderada', efeito: 'Aumenta transaminases', conduta: 'Evitar se possível' },
      { medicamento: 'Rifampicina', gravidade: 'moderada', efeito: 'Reduz níveis de caspofungina', conduta: 'Aumentar dose para 70mg/dia' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['candidemia', 'aspergilose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'micafungina',
    nomeGenerico: 'Micafungina',
    nomesComerciais: ['Mycamine'],
    atcCode: 'J02AX05',
    classeTerapeutica: 'antifungico',
    subclasse: 'equinocandina',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '100mg', disponivelSUS: false },
    ],
    indicacoes: ['Candidíase invasiva', 'Profilaxia em transplante'],
    mecanismoAcao: 'Equinocandina; não requer ajuste hepático',
    posologias: [
      {
        indicacao: 'Candidíase',
        adultos: { dose: '100mg', frequencia: 'IV 1x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Cefaleia', 'Flebite'],
      graves: ['Hepatotoxicidade', 'Anemia hemolítica']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados limitados' },
    doencasRelacionadas: ['candidemia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];
