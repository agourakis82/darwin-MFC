/**
 * MEDICAMENTOS DE REUMATOLOGIA - DARWIN-MFC
 * ==========================================
 *
 * DMARDs, biológicos, gota, osteoporose
 * ~40 medicamentos
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosReumatologia: Partial<Medicamento>[] = [
  // DMARDs Sintéticos Convencionais
  {
    id: 'metotrexato-reumatologia',
    nomeGenerico: 'Metotrexato',
    nomesComerciais: ['Reumatrex', 'Methotrex'],
    atcCode: 'L04AX03',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'dmard',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '25mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Artrite reumatoide', 'Artrite psoriásica', 'Psoríase', 'Lúpus'],
    mecanismoAcao: 'Inibe dihidrofolato redutase; reduz proliferação celular e citocinas inflamatórias',
    posologias: [
      {
        indicacao: 'Artrite reumatoide',
        adultos: { dose: '7,5-25mg', frequencia: '1x/semana', doseMaxima: '25mg/semana', observacoes: 'Suplementar ácido fólico' },
      }
    ],
    contraindicacoes: ['Gestação', 'Amamentação', 'Hepatopatia grave', 'Imunossupressão grave', 'Leucopenia'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Hepatotoxicidade', 'Mucosite', 'Alopecia'],
      graves: ['Aplasia medular', 'Pneumonite', 'Cirrose']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'grave', efeito: 'Reduz excreção de MTX', conduta: 'Evitar uso concomitante em altas doses' },
      { medicamento: 'Sulfametoxazol+Trimetoprima', gravidade: 'grave', efeito: 'Aplasia medular', conduta: 'Evitar associação' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Hemograma mensal', 'Função hepática mensal', 'Função renal', 'RX tórax anual'],
    doencasRelacionadas: ['artrite-reumatoide', 'psoríase'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'leflunomida',
    nomeGenerico: 'Leflunomida',
    nomesComerciais: ['Arava', 'Lefla'],
    atcCode: 'L04AA13',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'dmard',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
    ],
    indicacoes: ['Artrite reumatoide', 'Artrite psoriásica'],
    mecanismoAcao: 'Inibe dihidroorotato desidrogenase; reduz síntese de pirimidinas',
    posologias: [
      {
        indicacao: 'Artrite reumatoide',
        adultos: { dose: '20mg', frequencia: '1x/dia', observacoes: 'Dose de ataque 100mg/dia x 3 dias opcional' },
      }
    ],
    contraindicacoes: ['Gestação', 'Hepatopatia grave', 'Imunodeficiência grave'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Hepatotoxicidade', 'Alopecia', 'Rash'],
      graves: ['Hepatite grave', 'Pancitopenia', 'Neuropatia periférica']
    },
    interacoes: [
      { medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Potencializa anticoagulação', conduta: 'Monitorar INR' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado - meia-vida longa' },
    monitorizacao: ['Função hepática mensal', 'Hemograma', 'PA'],
    doencasRelacionadas: ['artrite-reumatoide'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'sulfassalazina',
    nomeGenerico: 'Sulfassalazina',
    nomesComerciais: ['Azulfin', 'Salazopyrin'],
    atcCode: 'A07EC01',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'dmard',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
    ],
    indicacoes: ['Artrite reumatoide', 'Espondiloartrites', 'Colite ulcerativa', 'Doença de Crohn'],
    mecanismoAcao: 'Ação anti-inflamatória intestinal; liberação de 5-ASA e sulfapiridina',
    posologias: [
      {
        indicacao: 'Artrite reumatoide',
        adultos: { dose: '2-3g', frequencia: 'Dividido 2-3x/dia', doseMaxima: '3g/dia', observacoes: 'Iniciar 500mg/dia e aumentar gradualmente' },
      }
    ],
    contraindicacoes: ['Alergia a sulfonamidas', 'Porfiria', 'Obstrução intestinal'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náuseas', 'Oligospermia reversível'],
      graves: ['Agranulocitose', 'Síndrome de Stevens-Johnson', 'Hepatite']
    },
    interacoes: [
      { medicamento: 'Digoxina', gravidade: 'leve', efeito: 'Reduz absorção de digoxina', conduta: 'Separar administração' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível com precaução em RN ictérico' },
    doencasRelacionadas: ['artrite-reumatoide', 'doenca-crohn'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'hidroxicloroquina',
    nomeGenerico: 'Hidroxicloroquina',
    nomesComerciais: ['Plaquinol', 'Reuquinol'],
    atcCode: 'P01BA02',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'dmard',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
    ],
    indicacoes: ['Lúpus eritematoso sistêmico', 'Artrite reumatoide', 'Malária'],
    mecanismoAcao: 'Acumula em lisossomos; modula resposta imune; ação antimalárica',
    posologias: [
      {
        indicacao: 'LES/AR',
        adultos: { dose: '200-400mg', frequencia: '1x/dia', doseMaxima: '5mg/kg/dia', observacoes: 'Limite pelo peso ideal para toxicidade ocular' },
      }
    ],
    contraindicacoes: ['Retinopatia prévia', 'Maculopatia', 'Miastenia gravis'],
    efeitosAdversos: {
      comuns: ['Distúrbios GI', 'Rash cutâneo', 'Cefaleia'],
      graves: ['Toxicidade retiniana', 'Cardiomiopatia', 'Prolongamento QT']
    },
    interacoes: [
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Aumenta níveis de digoxina', conduta: 'Monitorar digoxinemia' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível - baixa excreção' },
    monitorizacao: ['Fundo de olho anual', 'Campimetria', 'OCT retiniano', 'ECG'],
    doencasRelacionadas: ['lupus-eritematoso', 'artrite-reumatoide'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'azatioprina',
    nomeGenerico: 'Azatioprina',
    nomesComerciais: ['Imuran', 'Imunen'],
    atcCode: 'L04AX01',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'antimetabolito',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
    ],
    indicacoes: ['Lúpus', 'Vasculites', 'Miopatias inflamatórias', 'Prevenção rejeição transplante'],
    mecanismoAcao: 'Pró-droga de 6-mercaptopurina; inibe síntese de purinas',
    posologias: [
      {
        indicacao: 'Doenças autoimunes',
        adultos: { dose: '1-3mg/kg/dia', frequencia: '1x/dia ou dividido', doseMaxima: '2,5mg/kg/dia manutenção' },
      }
    ],
    contraindicacoes: ['Deficiência TPMT', 'Leucopenia grave', 'Infecção ativa grave'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Leucopenia', 'Hepatotoxicidade'],
      graves: ['Aplasia medular', 'Pancreatite', 'Neoplasias secundárias']
    },
    interacoes: [
      { medicamento: 'Alopurinol', gravidade: 'grave', efeito: 'Inibe xantina oxidase - toxicidade', conduta: 'Reduzir dose de azatioprina em 75%' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar - metabólitos ativos no leite' },
    monitorizacao: ['Hemograma semanal inicial, depois mensal', 'Função hepática', 'TPMT genotipagem'],
    doencasRelacionadas: ['lupus-eritematoso', 'vasculites'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ciclosporina',
    nomeGenerico: 'Ciclosporina',
    nomesComerciais: ['Sandimmun', 'Neoral'],
    atcCode: 'L04AD01',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'inibidor_calcineurina',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '25mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '50mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '100mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Psoríase grave', 'Artrite reumatoide refratária', 'Prevenção rejeição transplante'],
    mecanismoAcao: 'Inibe calcineurina; bloqueia ativação de células T',
    posologias: [
      {
        indicacao: 'Psoríase/AR',
        adultos: { dose: '2,5-5mg/kg/dia', frequencia: 'Dividido 2x/dia', doseMaxima: '5mg/kg/dia' },
      }
    ],
    contraindicacoes: ['HAS não controlada', 'Insuficiência renal grave', 'Neoplasia ativa'],
    efeitosAdversos: {
      comuns: ['HAS', 'Nefrotoxicidade', 'Hirsutismo', 'Hiperplasia gengival'],
      graves: ['Nefrotoxicidade irreversível', 'Linfomas', 'Encefalopatia']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4', gravidade: 'grave', efeito: 'Aumenta níveis de ciclosporina', conduta: 'Ajustar dose e monitorar níveis' },
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Potencializa nefrotoxicidade', conduta: 'Evitar uso prolongado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Creatinina e PA a cada 2 semanas inicialmente', 'Nível sérico', 'Potássio', 'Magnésio'],
    doencasRelacionadas: ['psoríase', 'artrite-reumatoide'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'micofenolato-mofetila',
    nomeGenerico: 'Micofenolato de Mofetila',
    nomesComerciais: ['CellCept', 'Myfortic'],
    atcCode: 'L04AA06',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'antimetabolito',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '250mg', disponivelSUS: true },
    ],
    indicacoes: ['Nefrite lúpica', 'Vasculites', 'Prevenção rejeição transplante'],
    mecanismoAcao: 'Inibe inosina monofosfato desidrogenase; bloqueia proliferação linfocitária',
    posologias: [
      {
        indicacao: 'Nefrite lúpica',
        adultos: { dose: '2-3g', frequencia: 'Dividido 2x/dia', doseMaxima: '3g/dia' },
      }
    ],
    contraindicacoes: ['Gestação', 'Leucopenia grave', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Leucopenia'],
      graves: ['Leucoencefalopatia progressiva', 'Infecções oportunistas', 'Linfomas']
    },
    interacoes: [
      { medicamento: 'Antiácidos com Mg/Al', gravidade: 'leve', efeito: 'Reduz absorção', conduta: 'Separar administração em 2h' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Hemograma semanal 1º mês, quinzenal 2-3 meses, mensal depois'],
    doencasRelacionadas: ['lupus-eritematoso', 'nefrite-lupica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Biológicos - Anti-TNF
  {
    id: 'adalimumabe',
    nomeGenerico: 'Adalimumabe',
    nomesComerciais: ['Humira', 'Hyrimoz', 'Hadlima'],
    atcCode: 'L04AB04',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_tnf',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '40mg/0,4ml', disponivelSUS: true },
    ],
    indicacoes: ['Artrite reumatoide', 'Artrite psoriásica', 'Psoríase', 'Espondilite anquilosante', 'Doença de Crohn', 'Colite ulcerativa'],
    mecanismoAcao: 'Anticorpo monoclonal anti-TNF-alfa humano',
    posologias: [
      {
        indicacao: 'AR/Psoríase',
        adultos: { dose: '40mg', frequencia: 'SC a cada 2 semanas' },
      }
    ],
    contraindicacoes: ['TB ativa', 'Infecções graves ativas', 'ICC classe III-IV NYHA', 'Esclerose múltipla'],
    efeitosAdversos: {
      comuns: ['Reações no local de injeção', 'Infecções respiratórias', 'Cefaleia'],
      graves: ['TB reativação', 'Linfoma', 'Infecções graves', 'Lupus-like']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'contraindicada', efeito: 'Risco de infecção por vacina', conduta: 'Contraindicado' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível - baixa absorção oral' },
    monitorizacao: ['PPD/IGRA antes de iniciar', 'Rastreio hepatite B/C', 'Hemograma periódico'],
    doencasRelacionadas: ['artrite-reumatoide', 'psoríase', 'doenca-crohn'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'etanercepte',
    nomeGenerico: 'Etanercepte',
    nomesComerciais: ['Enbrel', 'Brenzys'],
    atcCode: 'L04AB01',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_tnf',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '50mg/ml', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '25mg/0,5ml', disponivelSUS: true },
    ],
    indicacoes: ['Artrite reumatoide', 'Artrite psoriásica', 'Espondilite anquilosante', 'Artrite idiopática juvenil'],
    mecanismoAcao: 'Proteína de fusão receptor TNF solúvel; neutraliza TNF-alfa e TNF-beta',
    posologias: [
      {
        indicacao: 'AR',
        adultos: { dose: '50mg', frequencia: 'SC 1x/semana ou 25mg 2x/semana' },
      }
    ],
    contraindicacoes: ['TB ativa', 'Sepse', 'Infecção ativa grave'],
    efeitosAdversos: {
      comuns: ['Reação no local da injeção', 'Infecções respiratórias'],
      graves: ['TB reativação', 'Doenças desmielinizantes', 'Pancitopenia']
    },
    interacoes: [
      { medicamento: 'Anakinra', gravidade: 'grave', efeito: 'Aumento infecções graves', conduta: 'Evitar associação' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    monitorizacao: ['PPD/IGRA pré-tratamento', 'Hemograma', 'Função hepática'],
    doencasRelacionadas: ['artrite-reumatoide', 'espondilite-anquilosante'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'infliximabe',
    nomeGenerico: 'Infliximabe',
    nomesComerciais: ['Remicade', 'Remsima', 'Inflectra'],
    atcCode: 'L04AB02',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_tnf',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['Artrite reumatoide', 'Doença de Crohn', 'Colite ulcerativa', 'Espondilite anquilosante', 'Psoríase'],
    mecanismoAcao: 'Anticorpo monoclonal quimérico anti-TNF-alfa',
    posologias: [
      {
        indicacao: 'AR',
        adultos: { dose: '3-5mg/kg', frequencia: 'IV semanas 0, 2, 6 depois a cada 8 semanas', observacoes: 'Associar metotrexato para reduzir imunogenicidade' },
      }
    ],
    contraindicacoes: ['TB ativa', 'Infecções graves', 'ICC moderada-grave'],
    efeitosAdversos: {
      comuns: ['Reações infusionais', 'Cefaleia', 'Infecções respiratórias'],
      graves: ['TB reativação', 'Reações anafiláticas', 'Linfoma hepatoesplênico']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'contraindicada', efeito: 'Risco de doença por vacina', conduta: 'Contraindicado' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    monitorizacao: ['PPD/IGRA', 'Hepatite B/C', 'Hemograma', 'Anticorpos anti-droga se perda de resposta'],
    doencasRelacionadas: ['artrite-reumatoide', 'doenca-crohn', 'colite-ulcerativa'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'golimumabe',
    nomeGenerico: 'Golimumabe',
    nomesComerciais: ['Simponi'],
    atcCode: 'L04AB06',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_tnf',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '50mg/0,5ml', disponivelSUS: false },
    ],
    indicacoes: ['Artrite reumatoide', 'Artrite psoriásica', 'Espondilite anquilosante', 'Colite ulcerativa'],
    mecanismoAcao: 'Anticorpo monoclonal humano anti-TNF-alfa',
    posologias: [
      {
        indicacao: 'AR',
        adultos: { dose: '50mg', frequencia: 'SC 1x/mês' },
      }
    ],
    contraindicacoes: ['TB ativa', 'Infecções graves', 'ICC classe III-IV'],
    efeitosAdversos: {
      comuns: ['Infecções respiratórias', 'Reações no local de injeção'],
      graves: ['TB', 'Linfoma', 'ICC descompensada']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'contraindicada', efeito: 'Risco de infecção vacinal', conduta: 'Contraindicado' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Dados limitados' },
    doencasRelacionadas: ['artrite-reumatoide', 'espondilite-anquilosante'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'certolizumabe',
    nomeGenerico: 'Certolizumabe Pegol',
    nomesComerciais: ['Cimzia'],
    atcCode: 'L04AB05',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_tnf',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '200mg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Artrite reumatoide', 'Artrite psoriásica', 'Espondilite anquilosante', 'Doença de Crohn'],
    mecanismoAcao: 'Fragmento Fab peguilado anti-TNF-alfa (sem Fc)',
    posologias: [
      {
        indicacao: 'AR',
        adultos: { dose: '400mg semanas 0,2,4, depois 200mg', frequencia: 'SC a cada 2 semanas ou 400mg 1x/mês' },
      }
    ],
    contraindicacoes: ['TB ativa', 'Infecções graves'],
    efeitosAdversos: {
      comuns: ['Infecções', 'Reações no local de injeção', 'Cefaleia'],
      graves: ['TB', 'Linfoma', 'Doença desmielinizante']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'contraindicada', efeito: 'Risco de infecção', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Não cruza placenta significativamente - opção preferencial em gestantes' },
    doencasRelacionadas: ['artrite-reumatoide'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Biológicos - Outros mecanismos
  {
    id: 'tocilizumabe',
    nomeGenerico: 'Tocilizumabe',
    nomesComerciais: ['Actemra', 'RoActemra'],
    atcCode: 'L04AC07',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il6',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '162mg/0,9ml', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '80mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '200mg', disponivelSUS: true },
    ],
    indicacoes: ['Artrite reumatoide', 'Artrite idiopática juvenil sistêmica', 'Arterite de células gigantes'],
    mecanismoAcao: 'Anticorpo monoclonal anti-receptor de IL-6',
    posologias: [
      {
        indicacao: 'AR',
        adultos: { dose: '8mg/kg', frequencia: 'IV a cada 4 semanas', doseMaxima: '800mg/dose' },
      }
    ],
    contraindicacoes: ['Infecções ativas graves', 'Neutropenia < 500', 'Hepatopatia grave'],
    efeitosAdversos: {
      comuns: ['Infecções respiratórias', 'Cefaleia', 'Hipertensão', 'Aumento transaminases'],
      graves: ['Perfuração GI', 'Neutropenia grave', 'Infecções graves']
    },
    interacoes: [
      { medicamento: 'Substratos CYP450', gravidade: 'moderada', efeito: 'IL-6 modula CYP450; normalização pode alterar níveis de drogas', conduta: 'Monitorar warfarina, estatinas, ciclosporina' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Hemograma com neutrófilos', 'Transaminases', 'Lipidograma'],
    doencasRelacionadas: ['artrite-reumatoide', 'arterite-celulas-gigantes'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'rituximabe',
    nomeGenerico: 'Rituximabe',
    nomesComerciais: ['MabThera', 'Rituxan'],
    atcCode: 'L01XC02',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_cd20',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '100mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '500mg', disponivelSUS: true },
    ],
    indicacoes: ['Artrite reumatoide refratária', 'Vasculites ANCA', 'Linfoma não-Hodgkin', 'Pênfigo'],
    mecanismoAcao: 'Anticorpo monoclonal anti-CD20; depleção de células B',
    posologias: [
      {
        indicacao: 'AR',
        adultos: { dose: '1000mg', frequencia: 'IV dias 1 e 15, repetir a cada 6 meses', observacoes: 'Pré-medicação com metilprednisolona, paracetamol, anti-histamínico' },
      }
    ],
    contraindicacoes: ['Infecção ativa grave', 'Imunossupressão grave'],
    efeitosAdversos: {
      comuns: ['Reações infusionais', 'Fadiga', 'Cefaleia'],
      graves: ['Leucoencefalopatia multifocal progressiva', 'Reativação hepatite B', 'Síndrome de lise tumoral']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'contraindicada', efeito: 'Resposta vacinal comprometida', conduta: 'Evitar; aguardar 6 meses após rituximabe' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Hepatite B (HBsAg, anti-HBc)', 'Imunoglobulinas séricas', 'Subpopulações linfocitárias'],
    doencasRelacionadas: ['artrite-reumatoide', 'vasculites'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'abatacepte',
    nomeGenerico: 'Abatacepte',
    nomesComerciais: ['Orencia'],
    atcCode: 'L04AA24',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'modulador_coestimulacao',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '125mg/ml', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '250mg', disponivelSUS: true },
    ],
    indicacoes: ['Artrite reumatoide', 'Artrite idiopática juvenil'],
    mecanismoAcao: 'Proteína de fusão CTLA-4-Ig; bloqueia coestimulação CD80/CD86-CD28',
    posologias: [
      {
        indicacao: 'AR',
        adultos: { dose: '125mg', frequencia: 'SC 1x/semana ou IV peso-baseado a cada 4 semanas' },
      }
    ],
    contraindicacoes: ['Infecções ativas graves'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Nasofaringite', 'Náuseas'],
      graves: ['Infecções graves', 'Neoplasias', 'Reações anafiláticas']
    },
    interacoes: [
      { medicamento: 'Anti-TNF', gravidade: 'grave', efeito: 'Aumento de infecções graves', conduta: 'Evitar associação' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['PPD/IGRA', 'Hepatite B/C', 'Hemograma'],
    doencasRelacionadas: ['artrite-reumatoide'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'secuquinumabe',
    nomeGenerico: 'Secuquinumabe',
    nomesComerciais: ['Cosentyx'],
    atcCode: 'L04AC10',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il17',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '150mg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Psoríase moderada-grave', 'Artrite psoriásica', 'Espondilite anquilosante'],
    mecanismoAcao: 'Anticorpo monoclonal anti-IL-17A',
    posologias: [
      {
        indicacao: 'Psoríase',
        adultos: { dose: '300mg', frequencia: 'SC semanas 0,1,2,3,4 depois 300mg/mês' },
      }
    ],
    contraindicacoes: ['TB ativa', 'Doença de Crohn ativa', 'Infecções ativas'],
    efeitosAdversos: {
      comuns: ['Nasofaringite', 'Diarreia', 'Infecções respiratórias'],
      graves: ['Exacerbação doença de Crohn', 'Candidíase', 'Neutropenia']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infecção', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados limitados' },
    doencasRelacionadas: ['psoríase', 'espondilite-anquilosante'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ustequinumabe',
    nomeGenerico: 'Ustequinumabe',
    nomesComerciais: ['Stelara'],
    atcCode: 'L04AC05',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il12_23',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '45mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '90mg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Psoríase moderada-grave', 'Artrite psoriásica', 'Doença de Crohn', 'Colite ulcerativa'],
    mecanismoAcao: 'Anticorpo monoclonal anti-IL-12 e IL-23 (subunidade p40)',
    posologias: [
      {
        indicacao: 'Psoríase',
        adultos: { dose: '45-90mg (peso-dependente)', frequencia: 'SC semanas 0, 4, depois a cada 12 semanas' },
      }
    ],
    contraindicacoes: ['TB ativa', 'Infecções graves'],
    efeitosAdversos: {
      comuns: ['Nasofaringite', 'Cefaleia', 'Fadiga'],
      graves: ['Infecções graves', 'Leucoencefalopatia', 'Reações anafiláticas']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Resposta vacinal comprometida', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['psoríase', 'doenca-crohn'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Inibidores JAK
  {
    id: 'tofacitinibe',
    nomeGenerico: 'Tofacitinibe',
    nomesComerciais: ['Xeljanz'],
    atcCode: 'L04AA29',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'inibidor_jak',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '11mg', disponivelSUS: false },
    ],
    indicacoes: ['Artrite reumatoide', 'Artrite psoriásica', 'Colite ulcerativa'],
    mecanismoAcao: 'Inibidor seletivo de JAK1 e JAK3',
    posologias: [
      {
        indicacao: 'AR',
        adultos: { dose: '5mg', frequencia: '2x/dia ou XR 11mg 1x/dia', observacoes: 'Ajuste renal: ClCr <60: 5mg 1x/dia' },
      }
    ],
    contraindicacoes: ['TB ativa', 'Linfopenia grave', 'Neutropenia grave', 'Hepatopatia grave'],
    efeitosAdversos: {
      comuns: ['Infecções respiratórias', 'Cefaleia', 'Diarreia', 'Aumento CPK'],
      graves: ['Tromboembolismo venoso', 'Eventos cardiovasculares', 'Malignidades', 'Herpes zoster']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4 potentes', gravidade: 'moderada', efeito: 'Aumenta níveis de tofacitinibe', conduta: 'Reduzir dose para 5mg 1x/dia' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Hemograma com linfócitos', 'Lipidograma', 'Função hepática', 'Rastreio TB'],
    doencasRelacionadas: ['artrite-reumatoide', 'colite-ulcerativa'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'baricitinibe',
    nomeGenerico: 'Baricitinibe',
    nomesComerciais: ['Olumiant'],
    atcCode: 'L04AA37',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'inibidor_jak',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: false },
    ],
    indicacoes: ['Artrite reumatoide', 'Dermatite atópica', 'Alopecia areata'],
    mecanismoAcao: 'Inibidor seletivo de JAK1 e JAK2',
    posologias: [
      {
        indicacao: 'AR',
        adultos: { dose: '2-4mg', frequencia: '1x/dia', observacoes: 'Ajuste renal: ClCr 30-60: 2mg; <30: evitar' },
      }
    ],
    contraindicacoes: ['TB ativa', 'Linfopenia < 500', 'Neutropenia < 1000'],
    efeitosAdversos: {
      comuns: ['Infecções respiratórias', 'Náusea', 'Herpes zoster', 'Dislipidemia'],
      graves: ['TEV', 'Eventos CV maiores', 'Malignidades', 'Perfuração GI']
    },
    interacoes: [
      { medicamento: 'Probenecida', gravidade: 'moderada', efeito: 'Aumenta exposição a baricitinibe', conduta: 'Reduzir para 2mg/dia' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Hemograma', 'Lipidograma', 'Função hepática/renal'],
    doencasRelacionadas: ['artrite-reumatoide', 'dermatite-atopica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'upadacitinibe',
    nomeGenerico: 'Upadacitinibe',
    nomesComerciais: ['Rinvoq'],
    atcCode: 'L04AA44',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'inibidor_jak',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '30mg', disponivelSUS: false },
    ],
    indicacoes: ['Artrite reumatoide', 'Artrite psoriásica', 'Espondilite anquilosante', 'Dermatite atópica', 'Colite ulcerativa'],
    mecanismoAcao: 'Inibidor seletivo de JAK1',
    posologias: [
      {
        indicacao: 'AR',
        adultos: { dose: '15mg', frequencia: '1x/dia', observacoes: 'ClCr 15-60: 15mg; <15: evitar' },
      }
    ],
    contraindicacoes: ['TB ativa', 'Infecção grave ativa', 'Hepatopatia grave'],
    efeitosAdversos: {
      comuns: ['Infecções respiratórias', 'Acne', 'Aumento CPK'],
      graves: ['TEV', 'MACE', 'Malignidades', 'Perfuração GI']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4 potentes', gravidade: 'moderada', efeito: 'Aumenta exposição', conduta: 'Usar com cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['artrite-reumatoide', 'espondilite-anquilosante'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Gota
  {
    id: 'colchicina',
    nomeGenerico: 'Colchicina',
    nomesComerciais: ['Colchicina', 'Colchis'],
    atcCode: 'M04AC01',
    classeTerapeutica: 'antigotoso',
    subclasse: 'anti_inflamatorio_gota',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true },
    ],
    indicacoes: ['Crise aguda de gota', 'Profilaxia de crises', 'Febre Mediterrânea Familiar', 'Pericardite'],
    mecanismoAcao: 'Inibe polimerização de microtúbulos; bloqueia migração neutrofílica',
    posologias: [
      {
        indicacao: 'Crise de gota',
        adultos: { dose: '1mg seguido de 0,5mg 1h depois', frequencia: 'Dose única no dia', doseMaxima: '1,5mg/dia crise aguda' },
      },
      {
        indicacao: 'Profilaxia',
        adultos: { dose: '0,5mg', frequencia: '1-2x/dia', observacoes: 'Durante início de terapia hipouricêmica' },
      }
    ],
    contraindicacoes: ['Insuficiência renal grave (ClCr <10)', 'Insuficiência hepática grave', 'Discrasia sanguínea'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Cólicas abdominais'],
      graves: ['Miopatia', 'Neuropatia', 'Aplasia medular', 'Rabdomiólise']
    },
    interacoes: [
      { medicamento: 'Claritromicina', gravidade: 'grave', efeito: 'Aumenta toxicidade da colchicina', conduta: 'Reduzir dose de colchicina pela metade' },
      { medicamento: 'Estatinas', gravidade: 'grave', efeito: 'Aumenta risco de miopatia', conduta: 'Monitorar CPK' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em doses baixas' },
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: 'Máx 0,5mg 2x/dia' },
      { tfg: '<30', ajuste: 'Máx 0,5mg 1x/dia; evitar em ClCr <10' },
    ],
    doencasRelacionadas: ['gota', 'pericardite'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'alopurinol',
    nomeGenerico: 'Alopurinol',
    nomesComerciais: ['Zyloric', 'Goutex'],
    atcCode: 'M04AA01',
    classeTerapeutica: 'antigotoso',
    subclasse: 'inibidor_xantina_oxidase',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
    ],
    indicacoes: ['Hiperuricemia com gota', 'Profilaxia síndrome lise tumoral', 'Nefrolitíase por ácido úrico'],
    mecanismoAcao: 'Inibe xantina oxidase; reduz produção de ácido úrico',
    posologias: [
      {
        indicacao: 'Gota',
        adultos: { dose: 'Iniciar 100mg', frequencia: '1x/dia, titular até alvo', doseMaxima: '800mg/dia', observacoes: 'Alvo: ácido úrico < 6mg/dL' },
      }
    ],
    contraindicacoes: ['Crise aguda de gota (não iniciar)', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Rash cutâneo', 'Distúrbios GI'],
      graves: ['Síndrome de hipersensibilidade (DRESS)', 'Stevens-Johnson', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Azatioprina', gravidade: 'grave', efeito: 'Inibe metabolismo - toxicidade', conduta: 'Reduzir azatioprina em 75%' },
      { medicamento: 'Mercaptopurina', gravidade: 'grave', efeito: 'Aumenta toxicidade', conduta: 'Reduzir dose em 75%' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: 'Máx 200mg/dia' },
      { tfg: '10-30', ajuste: 'Máx 100mg/dia' },
      { tfg: '<10', ajuste: 'Máx 100mg a cada 2-3 dias' },
    ],
    monitorizacao: ['Ácido úrico sérico', 'Função hepática', 'Hemograma'],
    doencasRelacionadas: ['gota', 'hiperuricemia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'febuxostate',
    nomeGenerico: 'Febuxostate',
    nomesComerciais: ['Uloric', 'Zufebux'],
    atcCode: 'M04AA03',
    classeTerapeutica: 'antigotoso',
    subclasse: 'inibidor_xantina_oxidase',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '120mg', disponivelSUS: false },
    ],
    indicacoes: ['Gota (quando alopurinol contraindicado/intolerante)', 'Hiperuricemia'],
    mecanismoAcao: 'Inibidor não-púrico seletivo de xantina oxidase',
    posologias: [
      {
        indicacao: 'Gota',
        adultos: { dose: '40-80mg', frequencia: '1x/dia', doseMaxima: '120mg/dia', observacoes: 'Pode usar em DRC leve-moderada' },
      }
    ],
    contraindicacoes: ['Uso concomitante com azatioprina/mercaptopurina'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Artralgia', 'Rash'],
      graves: ['Eventos cardiovasculares (estudo CARES)', 'Hepatotoxicidade', 'Reações cutâneas graves']
    },
    interacoes: [
      { medicamento: 'Azatioprina', gravidade: 'contraindicada', efeito: 'Toxicidade grave', conduta: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Ácido úrico', 'Função hepática', 'Eventos CV em pacientes de risco'],
    doencasRelacionadas: ['gota'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'benzbromarona',
    nomeGenerico: 'Benzbromarona',
    nomesComerciais: ['Narcaricin', 'Urinorm'],
    atcCode: 'M04AB03',
    classeTerapeutica: 'antigotoso',
    subclasse: 'uricosurico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
    ],
    indicacoes: ['Gota (subexcretores de ácido úrico)', 'Hiperuricemia'],
    mecanismoAcao: 'Inibe URAT1; aumenta excreção renal de ácido úrico',
    posologias: [
      {
        indicacao: 'Gota',
        adultos: { dose: '50-100mg', frequencia: '1x/dia', doseMaxima: '200mg/dia', observacoes: 'Hidratação adequada para prevenir nefrolitíase' },
      }
    ],
    contraindicacoes: ['Nefrolitíase por ácido úrico', 'DRC estágio 4-5', 'Hepatopatia grave'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas'],
      graves: ['Hepatotoxicidade fulminante (raro)', 'Nefrolitíase']
    },
    interacoes: [
      { medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Pode potencializar anticoagulação', conduta: 'Monitorar INR' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Função hepática mensal nos primeiros 6 meses', 'Ácido úrico urinário'],
    doencasRelacionadas: ['gota'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'probenecida',
    nomeGenerico: 'Probenecida',
    nomesComerciais: ['Benemid'],
    atcCode: 'M04AB01',
    classeTerapeutica: 'antigotoso',
    subclasse: 'uricosurico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: false },
    ],
    indicacoes: ['Gota crônica', 'Prolongar efeito de penicilinas'],
    mecanismoAcao: 'Inibe reabsorção tubular de ácido úrico; inibe secreção tubular de penicilinas',
    posologias: [
      {
        indicacao: 'Gota',
        adultos: { dose: '250mg 2x/dia semana 1, depois 500mg 2x/dia', frequencia: 'Titulação gradual', doseMaxima: '2g/dia' },
      }
    ],
    contraindicacoes: ['Nefrolitíase', 'DRC grave', 'Crise aguda de gota'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náuseas', 'Anorexia'],
      graves: ['Anemia hemolítica', 'Nefrolitíase', 'Síndrome nefrótica']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Reduz excreção de MTX', conduta: 'Evitar associação' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['gota'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Osteoporose
  {
    id: 'alendronato',
    nomeGenerico: 'Alendronato de Sódio',
    nomesComerciais: ['Fosamax', 'Alendil'],
    atcCode: 'M05BA04',
    classeTerapeutica: 'anti_osteoporose',
    subclasse: 'bisfosfonato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '70mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
    ],
    indicacoes: ['Osteoporose pós-menopausa', 'Osteoporose induzida por glicocorticoide', 'Doença de Paget'],
    mecanismoAcao: 'Inibe reabsorção óssea mediada por osteoclastos',
    posologias: [
      {
        indicacao: 'Osteoporose',
        adultos: { dose: '70mg', frequencia: '1x/semana', observacoes: 'Em jejum, com água, permanecer em pé 30min' },
      }
    ],
    contraindicacoes: ['Estenose esofágica', 'Incapacidade de permanecer em pé 30min', 'Hipocalcemia', 'ClCr <35'],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Dispepsia', 'Refluxo'],
      graves: ['Osteonecrose mandíbula', 'Fratura atípica fêmur', 'Esofagite erosiva']
    },
    interacoes: [
      { medicamento: 'Antiácidos', gravidade: 'leve', efeito: 'Reduz absorção', conduta: 'Tomar alendronato 30min antes de qualquer alimento/medicamento' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Cálcio sérico', 'Vitamina D', 'Densitometria a cada 1-2 anos'],
    doencasRelacionadas: ['osteoporose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'risedronato',
    nomeGenerico: 'Risedronato de Sódio',
    nomesComerciais: ['Actonel', 'Osteotrat'],
    atcCode: 'M05BA07',
    classeTerapeutica: 'anti_osteoporose',
    subclasse: 'bisfosfonato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '35mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: false },
    ],
    indicacoes: ['Osteoporose pós-menopausa', 'Osteoporose masculina', 'Doença de Paget'],
    mecanismoAcao: 'Bisfosfonato; inibe osteoclastos',
    posologias: [
      {
        indicacao: 'Osteoporose',
        adultos: { dose: '35mg', frequencia: '1x/semana ou 150mg 1x/mês', observacoes: 'Mesmas precauções do alendronato' },
      }
    ],
    contraindicacoes: ['Hipocalcemia', 'Estenose esofágica', 'ClCr <30'],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Dispepsia'],
      graves: ['Osteonecrose mandíbula', 'Fratura atípica', 'Uveíte']
    },
    interacoes: [
      { medicamento: 'Cálcio/Antiácidos', gravidade: 'leve', efeito: 'Reduz absorção', conduta: 'Separar administração' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['osteoporose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ibandronato',
    nomeGenerico: 'Ibandronato de Sódio',
    nomesComerciais: ['Bonviva', 'Osteoban'],
    atcCode: 'M05BA06',
    classeTerapeutica: 'anti_osteoporose',
    subclasse: 'bisfosfonato',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '3mg/3ml', disponivelSUS: false },
    ],
    indicacoes: ['Osteoporose pós-menopausa'],
    mecanismoAcao: 'Bisfosfonato potente; inibe reabsorção óssea',
    posologias: [
      {
        indicacao: 'Osteoporose',
        adultos: { dose: '150mg VO 1x/mês ou 3mg IV a cada 3 meses', frequencia: 'Ver dose' },
      }
    ],
    contraindicacoes: ['Hipocalcemia', 'ClCr <30'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Síndrome gripal (IV)'],
      graves: ['Osteonecrose mandíbula', 'Fratura atípica']
    },
    interacoes: [
      { medicamento: 'Alimentos/Cálcio', gravidade: 'leve', efeito: 'Reduz absorção', conduta: 'Jejum' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['osteoporose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'zoledronato-osteoporose',
    nomeGenerico: 'Ácido Zoledrônico',
    nomesComerciais: ['Aclasta', 'Zometa'],
    atcCode: 'M05BA08',
    classeTerapeutica: 'anti_osteoporose',
    subclasse: 'bisfosfonato',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '5mg/100ml', disponivelSUS: true },
    ],
    indicacoes: ['Osteoporose pós-menopausa', 'Osteoporose masculina', 'Osteoporose corticoide', 'Doença de Paget'],
    mecanismoAcao: 'Bisfosfonato IV mais potente; inibição duradoura de osteoclastos',
    posologias: [
      {
        indicacao: 'Osteoporose',
        adultos: { dose: '5mg IV', frequencia: '1x/ano', observacoes: 'Infusão em 15-30min; hidratar adequadamente' },
      }
    ],
    contraindicacoes: ['Hipocalcemia', 'ClCr <35', 'Gestação'],
    efeitosAdversos: {
      comuns: ['Síndrome gripal pós-infusão', 'Dor óssea', 'Febre'],
      graves: ['Osteonecrose mandíbula', 'Fratura atípica fêmur', 'Fibrilação atrial', 'Nefrotoxicidade']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'moderada', efeito: 'Risco de hipocalcemia aditiva', conduta: 'Monitorar cálcio' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Cálcio e vitamina D pré-tratamento', 'Função renal', 'Densitometria'],
    doencasRelacionadas: ['osteoporose', 'doenca-paget'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'denosumabe-osteoporose',
    nomeGenerico: 'Denosumabe',
    nomesComerciais: ['Prolia'],
    atcCode: 'M05BX04',
    classeTerapeutica: 'anti_osteoporose',
    subclasse: 'anticorpo_rankl',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '60mg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Osteoporose pós-menopausa alto risco', 'Osteoporose masculina', 'Perda óssea por terapia hormonal'],
    mecanismoAcao: 'Anticorpo monoclonal anti-RANKL; inibe formação e atividade de osteoclastos',
    posologias: [
      {
        indicacao: 'Osteoporose',
        adultos: { dose: '60mg', frequencia: 'SC a cada 6 meses', observacoes: 'Suplementar cálcio e vitamina D' },
      }
    ],
    contraindicacoes: ['Hipocalcemia não corrigida'],
    efeitosAdversos: {
      comuns: ['Dor musculoesquelética', 'Infecções urinárias/respiratórias'],
      graves: ['Osteonecrose mandíbula', 'Fratura atípica', 'Hipocalcemia grave', 'Celulite']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Cálcio sérico', 'Sinais de infecção cutânea'],
    doencasRelacionadas: ['osteoporose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'teriparatida',
    nomeGenerico: 'Teriparatida',
    nomesComerciais: ['Forteo'],
    atcCode: 'H05AA02',
    classeTerapeutica: 'anti_osteoporose',
    subclasse: 'analogo_pth',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '250mcg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Osteoporose grave com fraturas', 'Osteoporose refratária a bisfosfonatos'],
    mecanismoAcao: 'PTH 1-34 recombinante; estimula formação óssea (anabólico)',
    posologias: [
      {
        indicacao: 'Osteoporose',
        adultos: { dose: '20mcg', frequencia: 'SC 1x/dia', doseMaxima: '24 meses de tratamento' },
      }
    ],
    contraindicacoes: ['Doença de Paget', 'Hipercalcemia', 'Neoplasia óssea', 'Radioterapia óssea prévia'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Cefaleia', 'Tontura ortostática', 'Cãibras'],
      graves: ['Hipercalcemia', 'Osteossarcoma (teórico)']
    },
    interacoes: [
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Hipercalcemia pode aumentar toxicidade', conduta: 'Monitorar cálcio' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Cálcio sérico', 'Função renal', 'Densitometria'],
    doencasRelacionadas: ['osteoporose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'raloxifeno',
    nomeGenerico: 'Raloxifeno',
    nomesComerciais: ['Evista', 'Optruma'],
    atcCode: 'G03XC01',
    classeTerapeutica: 'anti_osteoporose',
    subclasse: 'serm',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: false },
    ],
    indicacoes: ['Osteoporose pós-menopausa', 'Redução risco câncer mama invasivo'],
    mecanismoAcao: 'Modulador seletivo do receptor de estrogênio; efeito estrogênico no osso',
    posologias: [
      {
        indicacao: 'Osteoporose',
        adultos: { dose: '60mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['História de TEV', 'Gestação', 'Imobilização prolongada'],
    efeitosAdversos: {
      comuns: ['Fogachos', 'Câimbras', 'Edema periférico'],
      graves: ['Tromboembolismo venoso', 'AVC', 'Morte CV em alto risco']
    },
    interacoes: [
      { medicamento: 'Colestiramina', gravidade: 'moderada', efeito: 'Reduz absorção de raloxifeno', conduta: 'Separar administração' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['Sintomas de TEV', 'Densitometria'],
    doencasRelacionadas: ['osteoporose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'romosozumabe',
    nomeGenerico: 'Romosozumabe',
    nomesComerciais: ['Evenity'],
    atcCode: 'M05BX06',
    classeTerapeutica: 'anti_osteoporose',
    subclasse: 'anticorpo_esclerostina',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '105mg/1,17ml', disponivelSUS: false },
    ],
    indicacoes: ['Osteoporose grave pós-menopausa com alto risco de fratura'],
    mecanismoAcao: 'Anticorpo anti-esclerostina; estimula formação óssea e reduz reabsorção',
    posologias: [
      {
        indicacao: 'Osteoporose',
        adultos: { dose: '210mg (2 injeções de 105mg)', frequencia: 'SC 1x/mês por 12 meses', observacoes: 'Seguir com antireabsortivo após' },
      }
    ],
    contraindicacoes: ['IAM ou AVC no último ano', 'Hipocalcemia'],
    efeitosAdversos: {
      comuns: ['Artralgia', 'Cefaleia', 'Reação no local de injeção'],
      graves: ['IAM', 'AVC', 'Osteonecrose mandíbula']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Cálcio sérico', 'Eventos cardiovasculares'],
    doencasRelacionadas: ['osteoporose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];
