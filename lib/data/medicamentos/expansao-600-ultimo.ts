/**
 * EXPANSÃO 600 ÚLTIMO - DARWIN-MFC
 * =================================
 *
 * Últimos 15 medicamentos para completar 600+
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentos600Ultimo: Partial<Medicamento>[] = [
  // Antivirais essenciais
  {
    id: 'oseltamivir',
    nomeGenerico: 'Oseltamivir',
    nomesComerciais: ['Tamiflu'],
    atcCode: 'J05AH02',
    classeTerapeutica: 'antiviral',
    subclasse: 'antiviral_influenza',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '75mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '12mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Tratamento da influenza', 'Profilaxia pós-exposição'],
    mecanismoAcao: 'Inibidor da neuraminidase viral',
    posologias: [
      {
        indicacao: 'Tratamento influenza',
        adultos: { dose: '75mg', frequencia: '12/12h x 5 dias (iniciar até 48h dos sintomas)' },
        pediatrico: { dose: 'Por peso', frequencia: '12/12h x 5 dias' },
      },
      {
        indicacao: 'Profilaxia',
        adultos: { dose: '75mg', frequencia: '1x/dia x 10 dias' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Vômitos', 'Cefaleia'],
      graves: ['Reações neuropsiquiátricas', 'Anafilaxia']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: '30mg 12/12h' },
      { tfg: '10-30', ajuste: '30mg 1x/dia' },
    ],
    doencasRelacionadas: ['influenza'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Hipnóticos/Sedativos
  {
    id: 'zolpidem',
    nomeGenerico: 'Zolpidem',
    nomesComerciais: ['Stilnox', 'Lioram'],
    atcCode: 'N05CF02',
    classeTerapeutica: 'hipnotico',
    subclasse: 'z_drugs',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido_cr', concentracao: '12,5mg', disponivelSUS: false },
    ],
    indicacoes: ['Insônia (curto prazo)'],
    mecanismoAcao: 'Agonista seletivo receptor GABA-A (sítio BZ1)',
    posologias: [
      {
        indicacao: 'Insônia',
        adultos: { dose: '10mg (5mg em idosos/mulheres)', frequencia: '1x/dia ao deitar, max 4 semanas' },
      }
    ],
    contraindicacoes: ['Miastenia gravis', 'Insuficiência respiratória grave', 'Apneia do sono', 'Hepatopatia grave'],
    efeitosAdversos: {
      comuns: ['Sonolência residual', 'Cefaleia', 'Tontura', 'Amnésia anterógrada'],
      graves: ['Sonambulismo', 'Comportamentos complexos do sono', 'Dependência']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'moderada', efeito: 'Sedação aditiva', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite' },
    orientacoesPaciente: ['Uso máximo 2-4 semanas; não dirigir na manhã seguinte'],
    doencasRelacionadas: ['insonia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antieméticos/Vertigem
  {
    id: 'betaistina',
    nomeGenerico: 'Betaistina',
    nomesComerciais: ['Labirin', 'Betaserc'],
    atcCode: 'N07CA01',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '16mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '24mg', disponivelSUS: true },
    ],
    indicacoes: ['Síndrome de Ménière', 'Vertigem'],
    mecanismoAcao: 'Agonista parcial H1 e antagonista H3; melhora microcirculação labiríntica',
    posologias: [
      {
        indicacao: 'Vertigem/Ménière',
        adultos: { dose: '16-24mg', frequencia: '3x/dia' },
      }
    ],
    contraindicacoes: ['Feocromocitoma', 'Úlcera péptica ativa'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Cefaleia', 'Náuseas'],
      graves: []
    },
    interacoes: [
      { medicamento: 'Anti-histamínicos', gravidade: 'moderada', efeito: 'Podem antagonizar efeito', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['meniere', 'vertigem'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Corticoides tópicos
  {
    id: 'hidrocortisona-topica',
    nomeGenerico: 'Hidrocortisona',
    nomesComerciais: ['Berlison', 'Stiefcortil'],
    atcCode: 'D07AA02',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticoide_topico_fraco',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '1%', disponivelSUS: true },
      { forma: 'pomada', concentracao: '1%', disponivelSUS: true },
    ],
    indicacoes: ['Dermatite atópica leve', 'Eczema', 'Dermatite de contato', 'Picadas de inseto'],
    mecanismoAcao: 'Corticoide tópico de baixa potência; anti-inflamatório',
    posologias: [
      {
        indicacao: 'Dermatoses inflamatórias',
        adultos: { dose: 'Aplicar fina camada', frequencia: '2-3x/dia' },
      }
    ],
    contraindicacoes: ['Infecções cutâneas não tratadas', 'Rosácea', 'Acne'],
    efeitosAdversos: {
      comuns: ['Ardência local'],
      graves: ['Atrofia cutânea (uso prolongado)', 'Estrias', 'Telangiectasias']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível; evitar mamilos' },
    doencasRelacionadas: ['dermatite-atopica', 'eczema'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'betametasona-topica',
    nomeGenerico: 'Betametasona',
    nomesComerciais: ['Diprosone', 'Betnovate'],
    atcCode: 'D07AC01',
    classeTerapeutica: 'corticoide',
    subclasse: 'corticoide_topico_potente',
    rename: true,
    apresentacoes: [
      { forma: 'creme', concentracao: '0,05%', disponivelSUS: true },
      { forma: 'pomada', concentracao: '0,05%', disponivelSUS: true },
      { forma: 'locao', concentracao: '0,05%', disponivelSUS: true },
    ],
    indicacoes: ['Dermatoses inflamatórias moderadas a graves', 'Psoríase', 'Eczema'],
    mecanismoAcao: 'Corticoide tópico de alta potência',
    posologias: [
      {
        indicacao: 'Dermatoses inflamatórias',
        adultos: { dose: 'Aplicar fina camada', frequencia: '1-2x/dia, máx 2 semanas contínuas' },
      }
    ],
    contraindicacoes: ['Infecções cutâneas', 'Rosácea', 'Face/dobras (evitar)'],
    efeitosAdversos: {
      comuns: ['Atrofia cutânea', 'Estrias'],
      graves: ['Supressão adrenal (uso extenso)', 'Síndrome de Cushing']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso em áreas limitadas' },
    orientacoesPaciente: ['Evitar face e dobras; não usar mais de 2 semanas sem supervisão'],
    doencasRelacionadas: ['psoriase', 'eczema'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antiácidos
  {
    id: 'hidroxido-aluminio',
    nomeGenerico: 'Hidróxido de Alumínio',
    nomesComerciais: ['Pepsamar', 'Aldrox'],
    atcCode: 'A02AB01',
    classeTerapeutica: 'antiacido',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'suspensao_oral', concentracao: '60mg/ml', disponivelSUS: true },
      { forma: 'comprimido_mastigavel', concentracao: '300mg', disponivelSUS: true },
    ],
    indicacoes: ['Pirose', 'Dispepsia', 'DRGE sintomático', 'Hiperfosfatemia (DRC)'],
    mecanismoAcao: 'Neutraliza ácido gástrico',
    posologias: [
      {
        indicacao: 'Pirose',
        adultos: { dose: '5-10ml ou 1-2 comprimidos', frequencia: '30min-1h após refeições e ao deitar' },
      }
    ],
    contraindicacoes: ['Hipofosfatemia'],
    efeitosAdversos: {
      comuns: ['Constipação'],
      graves: ['Toxicidade por alumínio (DRC)', 'Hipofosfatemia']
    },
    interacoes: [
      { medicamento: 'Fluoroquinolonas', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 2h' },
      { medicamento: 'Tetraciclinas', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 2h' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['pirose', 'drge'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Eletrólitos/Reidratação
  {
    id: 'sro-sais-reidratacao',
    nomeGenerico: 'Sais de Reidratação Oral (SRO)',
    nomesComerciais: ['Pedialyte', 'SRO OMS'],
    atcCode: 'A07CA',
    classeTerapeutica: 'suplemento',
    subclasse: 'eletrolito',
    rename: true,
    apresentacoes: [
      { forma: 'po_oral', concentracao: 'Fórmula OMS', disponivelSUS: true },
    ],
    indicacoes: ['Desidratação leve a moderada', 'Diarreia aguda', 'Gastroenterite'],
    mecanismoAcao: 'Reposição de água e eletrólitos por via oral',
    posologias: [
      {
        indicacao: 'Desidratação',
        adultos: { dose: '200-400ml', frequencia: 'Após cada evacuação diarreica' },
        pediatrico: { dose: '50-100ml/kg', frequencia: 'Em 4-6h (TRO plano B)' },
      }
    ],
    contraindicacoes: ['Desidratação grave', 'Íleo', 'Vômitos incoercíveis'],
    efeitosAdversos: {
      comuns: ['Náuseas (se muito rápido)'],
      graves: []
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    orientacoesPaciente: ['Preparar conforme instruções; não adicionar açúcar'],
    doencasRelacionadas: ['desidratacao', 'diarreia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antimaláricos
  {
    id: 'hidroxicloroquina',
    nomeGenerico: 'Hidroxicloroquina',
    nomesComerciais: ['Reuquinol', 'Plaquenil'],
    atcCode: 'P01BA02',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'dmard',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
    ],
    indicacoes: ['Lúpus eritematoso sistêmico', 'Artrite reumatoide', 'Malária'],
    mecanismoAcao: 'Antimalárico; imunomodulador; inibe TLR',
    posologias: [
      {
        indicacao: 'LES/AR',
        adultos: { dose: '400mg', frequencia: '1x/dia (máx 5mg/kg/dia peso ideal)' },
      }
    ],
    contraindicacoes: ['Retinopatia preexistente', 'Hipersensibilidade a 4-aminoquinolinas'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Rash'],
      graves: ['Retinopatia', 'Cardiomiopatia', 'Miopatia', 'Hipoglicemia']
    },
    interacoes: [
      { medicamento: 'Tamoxifeno', gravidade: 'moderada', efeito: 'Toxicidade ocular', conduta: 'Monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Exame oftalmológico anual', 'ECG (QT)', 'Hemograma'],
    orientacoesPaciente: ['Exame de fundo de olho anual após 5 anos de uso'],
    doencasRelacionadas: ['lupus', 'artrite-reumatoide'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Analgésico opioide
  {
    id: 'tramadol',
    nomeGenerico: 'Tramadol',
    nomesComerciais: ['Tramal', 'Sylador'],
    atcCode: 'N02AX02',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide_fraco',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido_cr', concentracao: '100mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '100mg/ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '50mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Dor moderada a intensa'],
    mecanismoAcao: 'Opioide fraco + inibidor recaptação noradrenalina/serotonina',
    posologias: [
      {
        indicacao: 'Dor',
        adultos: { dose: '50-100mg', frequencia: '4-6/6h PRN', doseMaxima: '400mg/dia (300mg em idosos)' },
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Epilepsia não controlada', 'Intoxicação aguda'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Tontura', 'Constipação', 'Cefaleia', 'Sonolência'],
      graves: ['Convulsões', 'Síndrome serotoninérgica', 'Dependência']
    },
    interacoes: [
      { medicamento: 'ISRS', gravidade: 'moderada', efeito: 'Síndrome serotoninérgica', conduta: 'Cautela' },
      { medicamento: 'Carbamazepina', gravidade: 'moderada', efeito: 'Reduz eficácia', conduta: 'Pode precisar dose maior' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite' },
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Intervalo 12/12h' },
    ],
    orientacoesPaciente: ['Potencial de dependência; não exceder doses'],
    doencasRelacionadas: ['dor'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antiespasmódico urinário
  {
    id: 'oxibutinina',
    nomeGenerico: 'Oxibutinina',
    nomesComerciais: ['Retemic', 'Incontinol'],
    atcCode: 'G04BD04',
    classeTerapeutica: 'outros',
    subclasse: 'anticolinergico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '1mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Bexiga hiperativa', 'Incontinência urinária de urgência', 'Enurese noturna'],
    mecanismoAcao: 'Anticolinérgico; relaxa músculo detrusor',
    posologias: [
      {
        indicacao: 'Bexiga hiperativa',
        adultos: { dose: '5mg', frequencia: '2-3x/dia', doseMaxima: '20mg/dia' },
        pediatrico: { dose: '2,5-5mg', frequencia: '2-3x/dia (>5 anos)' },
      }
    ],
    contraindicacoes: ['Glaucoma de ângulo fechado', 'Retenção urinária', 'Miastenia gravis', 'Obstrução GI'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Constipação', 'Visão turva', 'Sonolência'],
      graves: ['Retenção urinária', 'Confusão (idosos)', 'Demência']
    },
    interacoes: [
      { medicamento: 'Anticolinérgicos', gravidade: 'moderada', efeito: 'Efeito aditivo', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Pode reduzir lactação' },
    orientacoesPaciente: ['Evitar calor excessivo; pode causar hipertermia'],
    doencasRelacionadas: ['bexiga-hiperativa', 'incontinencia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antiflatulentos
  {
    id: 'simeticona',
    nomeGenerico: 'Simeticona',
    nomesComerciais: ['Luftal', 'Flagass'],
    atcCode: 'A03AX13',
    classeTerapeutica: 'gastrointestinal',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'gotas', concentracao: '75mg/ml', disponivelSUS: true },
      { forma: 'comprimido_mastigavel', concentracao: '125mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '125mg', disponivelSUS: true },
    ],
    indicacoes: ['Flatulência', 'Distensão abdominal', 'Cólica do lactente', 'Preparo para exames'],
    mecanismoAcao: 'Antiespumante; coalesce bolhas de gás',
    posologias: [
      {
        indicacao: 'Flatulência',
        adultos: { dose: '40-125mg', frequencia: '3-4x/dia após refeições' },
        pediatrico: { dose: '20-40mg', frequencia: '3-4x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Bem tolerada'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Não absorvida; segura' },
    doencasRelacionadas: ['flatulencia', 'dispepsia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antifibrinolítico
  {
    id: 'acido-tranexamico',
    nomeGenerico: 'Ácido Tranexâmico',
    nomesComerciais: ['Transamin', 'Hemoblock'],
    atcCode: 'B02AA02',
    classeTerapeutica: 'outros',
    subclasse: 'antifibrinolitico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '50mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Menorragia', 'Sangramento pós-operatório', 'Trauma (CRASH-2)', 'Hemofilia'],
    mecanismoAcao: 'Inibe fibrinólise; bloqueia sítios de ligação lisina no plasminogênio',
    posologias: [
      {
        indicacao: 'Menorragia',
        adultos: { dose: '1g', frequencia: '3x/dia durante a menstruação (máx 4 dias)' },
      },
      {
        indicacao: 'Trauma (CRASH-2)',
        adultos: { dose: '1g IV em 10min, depois 1g em 8h', frequencia: 'Iniciar até 3h do trauma' },
      }
    ],
    contraindicacoes: ['TEV ativo', 'Hemorragia subaracnoide', 'DRC grave'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Cefaleia'],
      graves: ['Tromboembolismo', 'Convulsões (doses altas)']
    },
    interacoes: [
      { medicamento: 'Contraceptivos hormonais', gravidade: 'moderada', efeito: 'Risco TEV', conduta: 'Cautela' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    ajusteDoseRenal: [
      { tfg: '<50', ajuste: 'Reduzir dose' },
    ],
    doencasRelacionadas: ['menorragia', 'hemorragia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];
