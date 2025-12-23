/**
 * EXPANSÃO FINAL BATCH - DARWIN-MFC
 * ==================================
 *
 * Últimos medicamentos para completar 600+
 * ~20 medicamentos únicos
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosFinalBatch: Partial<Medicamento>[] = [
  // Antiparasitários
  {
    id: 'albendazol',
    nomeGenerico: 'Albendazol',
    nomesComerciais: ['Zentel', 'Albel'],
    atcCode: 'P02CA03',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'anti_helmintico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '40mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Ascaridíase', 'Enterobíase', 'Ancilostomíase', 'Tricuríase', 'Teníase', 'Estrongiloidíase'],
    mecanismoAcao: 'Inibe captação de glicose pelo parasita; degeneração do tegumento',
    posologias: [
      {
        indicacao: 'Ascaridíase/Enterobíase',
        adultos: { dose: '400mg', frequencia: 'Dose única' },
        pediatrico: { dose: '400mg (>2 anos)', frequencia: 'Dose única' },
      },
      {
        indicacao: 'Teníase',
        adultos: { dose: '400mg', frequencia: '1x/dia x 3 dias' },
      }
    ],
    contraindicacoes: ['Gestação', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Náuseas', 'Cefaleia'],
      graves: ['Leucopenia', 'Elevação transaminases', 'Alopecia']
    },
    interacoes: [],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Dados limitados; uso cauteloso' },
    doencasRelacionadas: ['parasitose-intestinal'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'mebendazol',
    nomeGenerico: 'Mebendazol',
    nomesComerciais: ['Pantelmin', 'Necamin'],
    atcCode: 'P02CA01',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'anti_helmintico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '20mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Enterobíase', 'Ascaridíase', 'Tricuríase', 'Ancilostomíase'],
    mecanismoAcao: 'Benzimidazol; inibe absorção de glicose pelo parasita',
    posologias: [
      {
        indicacao: 'Enterobíase',
        adultos: { dose: '100mg', frequencia: 'Dose única, repetir em 2 semanas' },
        pediatrico: { dose: '100mg (>2 anos)', frequencia: 'Dose única, repetir em 2 semanas' },
      },
      {
        indicacao: 'Outros helmintos',
        adultos: { dose: '100mg', frequencia: '12/12h x 3 dias' },
      }
    ],
    contraindicacoes: ['Gestação (1º trimestre)', 'Menores de 2 anos'],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Diarreia'],
      graves: ['Agranulocitose (raro)', 'Hepatotoxicidade']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Baixa absorção sistêmica' },
    doencasRelacionadas: ['parasitose-intestinal'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ivermectina',
    nomeGenerico: 'Ivermectina',
    nomesComerciais: ['Revectina', 'Ivermec'],
    atcCode: 'P02CF01',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'avermectina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '6mg', disponivelSUS: true },
    ],
    indicacoes: ['Estrongiloidíase', 'Oncocercose', 'Escabiose', 'Pediculose'],
    mecanismoAcao: 'Avermectina; paralisia neuromuscular do parasita via canais Cl-',
    posologias: [
      {
        indicacao: 'Estrongiloidíase',
        adultos: { dose: '200mcg/kg', frequencia: 'Dose única ou 2 dias seguidos' },
      },
      {
        indicacao: 'Escabiose',
        adultos: { dose: '200mcg/kg', frequencia: 'Dose única, repetir em 7-14 dias' },
      }
    ],
    contraindicacoes: ['Gravidez', 'Amamentação', 'Peso <15kg', 'Meningite, encefalopatia'],
    efeitosAdversos: {
      comuns: ['Prurido', 'Febre', 'Mialgia', 'Tontura'],
      graves: ['Reação de Mazzotti (oncocercose)', 'Neurotoxicidade']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumenta INR', conduta: 'Monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite' },
    doencasRelacionadas: ['estrongiloidiase', 'escabiose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'permetrina-topica',
    nomeGenerico: 'Permetrina',
    nomesComerciais: ['Nedax', 'Kwell'],
    atcCode: 'P03AC04',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'escabicida',
    rename: true,
    apresentacoes: [
      { forma: 'locao', concentracao: '5%', disponivelSUS: true },
      { forma: 'locao', concentracao: '1%', disponivelSUS: true },
    ],
    indicacoes: ['Escabiose', 'Pediculose'],
    mecanismoAcao: 'Piretroide; bloqueia canais de sódio do parasita',
    posologias: [
      {
        indicacao: 'Escabiose',
        adultos: { dose: 'Aplicar loção 5% do pescoço aos pés', frequencia: 'Deixar 8-14h, enxaguar. Repetir em 7 dias' },
      },
      {
        indicacao: 'Pediculose',
        adultos: { dose: 'Aplicar loção 1% no cabelo', frequencia: 'Deixar 10min, enxaguar. Repetir em 7-10 dias' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a piretroides'],
    efeitosAdversos: {
      comuns: ['Prurido', 'Eritema', 'Ardência transitória'],
      graves: []
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Uso tópico é seguro' },
    doencasRelacionadas: ['escabiose', 'pediculose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'benzoato-benzila',
    nomeGenerico: 'Benzoato de Benzila',
    nomesComerciais: ['Acarsan', 'Miticoçan'],
    atcCode: 'P03AX01',
    classeTerapeutica: 'antiparasitario',
    subclasse: 'escabicida',
    rename: true,
    apresentacoes: [
      { forma: 'locao', concentracao: '25%', disponivelSUS: true },
    ],
    indicacoes: ['Escabiose', 'Pediculose'],
    mecanismoAcao: 'Escabicida e pediculicida tópico',
    posologias: [
      {
        indicacao: 'Escabiose',
        adultos: { dose: 'Diluir 1:1 em água; aplicar do pescoço aos pés', frequencia: 'Deixar secar. Aplicar por 3 noites, banho no 4º dia' },
        pediatrico: { dose: 'Diluir 1:2 em água', frequencia: 'Aplicar por 3 noites' },
      }
    ],
    contraindicacoes: ['Lesões cutâneas extensas', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Irritação cutânea', 'Dermatite de contato'],
      graves: ['Convulsões (se ingerido)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso tópico é seguro' },
    doencasRelacionadas: ['escabiose', 'pediculose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Protetores gástricos
  {
    id: 'sucralfato',
    nomeGenerico: 'Sucralfato',
    nomesComerciais: ['Sucrafilm', 'Ulcerex'],
    atcCode: 'A02BX02',
    classeTerapeutica: 'protetor_gastrico',
    subclasse: 'barreira_mucosa',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1g', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '1g/5ml', disponivelSUS: true },
    ],
    indicacoes: ['Úlcera duodenal', 'Úlcera gástrica', 'Profilaxia úlcera de estresse'],
    mecanismoAcao: 'Forma barreira protetora sobre úlcera; estimula prostaglandinas',
    posologias: [
      {
        indicacao: 'Úlcera ativa',
        adultos: { dose: '1g', frequencia: '4x/dia (1h antes das refeições e ao deitar)' },
      },
      {
        indicacao: 'Manutenção',
        adultos: { dose: '1g', frequencia: '2x/dia' },
      }
    ],
    contraindicacoes: ['DRC grave (acúmulo de alumínio)'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Boca seca', 'Náuseas'],
      graves: ['Bezoar', 'Toxicidade por alumínio (DRC)']
    },
    interacoes: [
      { medicamento: 'Fluoroquinolonas', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 2h' },
      { medicamento: 'Levotiroxina', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 4h' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Não absorvido; compatível' },
    doencasRelacionadas: ['ulcera-peptica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ranitidina',
    nomeGenerico: 'Ranitidina',
    nomesComerciais: ['Antak', 'Label'],
    atcCode: 'A02BA02',
    classeTerapeutica: 'protetor_gastrico',
    subclasse: 'antagonista_h2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '25mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['DRGE', 'Úlcera péptica', 'Síndrome de Zollinger-Ellison'],
    mecanismoAcao: 'Antagonista receptor H2; reduz secreção ácida',
    posologias: [
      {
        indicacao: 'Úlcera/DRGE',
        adultos: { dose: '150mg', frequencia: '12/12h ou 300mg 1x/dia à noite' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Porfiria'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Tontura', 'Constipação'],
      graves: ['Hepatotoxicidade', 'Trombocitopenia', 'NDMA (retirada do mercado em alguns países)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    ajusteDoseRenal: [
      { tfg: '<50', ajuste: '150mg 1x/dia' },
    ],
    doencasRelacionadas: ['drge', 'ulcera-peptica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antialérgicos adicionais
  {
    id: 'prometazina',
    nomeGenerico: 'Prometazina',
    nomesComerciais: ['Fenergan', 'Pamergan'],
    atcCode: 'R06AD02',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_1geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '25mg/ml', disponivelSUS: true },
      { forma: 'xarope', concentracao: '5mg/5ml', disponivelSUS: true },
    ],
    indicacoes: ['Rinite alérgica', 'Urticária', 'Prurido', 'Náuseas', 'Sedação'],
    mecanismoAcao: 'Anti-histamínico H1 de 1ª geração; anticolinérgico',
    posologias: [
      {
        indicacao: 'Alergia/Prurido',
        adultos: { dose: '25mg', frequencia: '1-3x/dia' },
      }
    ],
    contraindicacoes: ['Menores de 2 anos', 'Coma', 'Depressão SNC', 'Glaucoma de ângulo fechado'],
    efeitosAdversos: {
      comuns: ['Sonolência intensa', 'Boca seca', 'Visão turva'],
      graves: ['Depressão respiratória', 'SEP', 'Síndrome neuroléptica maligna']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'grave', efeito: 'Sedação excessiva', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Sedação no lactente' },
    doencasRelacionadas: ['urticaria', 'rinite-alergica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'hidroxizina',
    nomeGenerico: 'Hidroxizina',
    nomesComerciais: ['Hixizine', 'Marax'],
    atcCode: 'N05BB01',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_1geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '2mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Prurido', 'Urticária', 'Ansiedade', 'Pré-anestesia'],
    mecanismoAcao: 'Anti-histamínico H1; ansiolítico',
    posologias: [
      {
        indicacao: 'Prurido/Urticária',
        adultos: { dose: '25mg', frequencia: '3-4x/dia' },
      },
      {
        indicacao: 'Ansiedade',
        adultos: { dose: '50-100mg', frequencia: '4x/dia' },
      }
    ],
    contraindicacoes: ['QT longo', 'Porfiria', 'Gestação (1º trimestre)'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Boca seca', 'Cefaleia'],
      graves: ['Prolongamento QT', 'Torsades de pointes']
    },
    interacoes: [
      { medicamento: 'QT prolongadores', gravidade: 'grave', efeito: 'Arritmia', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Sedação no lactente' },
    doencasRelacionadas: ['urticaria', 'ansiedade'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antihipertensivos específicos
  {
    id: 'clonidina',
    nomeGenerico: 'Clonidina',
    nomesComerciais: ['Atensina'],
    atcCode: 'C02AC01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'agonista_alfa2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,1mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '0,2mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipertensão resistente', 'Síndrome de abstinência', 'TDAH (off-label)', 'Dor neuropática'],
    mecanismoAcao: 'Agonista alfa-2 central; reduz tônus simpático',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '0,1mg', frequencia: '12/12h, aumentar gradualmente', doseMaxima: '2,4mg/dia' },
      },
      {
        indicacao: 'Abstinência opioide',
        adultos: { dose: '0,1-0,3mg', frequencia: '8/8h' },
      }
    ],
    contraindicacoes: ['Bradicardia grave', 'Síndrome do nó sinusal'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Sonolência', 'Constipação', 'Tontura'],
      graves: ['Hipertensão rebote (retirada abrupta)', 'Bradicardia']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'grave', efeito: 'Hipertensão rebote na retirada', conduta: 'Retirar BB antes' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite' },
    orientacoesPaciente: ['Não suspender abruptamente'],
    doencasRelacionadas: ['hipertensao', 'abstinencia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'hidralazina',
    nomeGenerico: 'Hidralazina',
    nomesComerciais: ['Apresolina', 'Nepresol'],
    atcCode: 'C02DB02',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'vasodilatador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '20mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Emergência hipertensiva', 'Hipertensão na gestação', 'ICC (com nitrato)'],
    mecanismoAcao: 'Vasodilatador arteriolar direto',
    posologias: [
      {
        indicacao: 'Hipertensão crônica',
        adultos: { dose: '25-50mg', frequencia: '2-4x/dia', doseMaxima: '200mg/dia' },
      },
      {
        indicacao: 'Emergência/Pré-eclâmpsia',
        adultos: { dose: '5-10mg IV', frequencia: 'A cada 20-30min PRN' },
      }
    ],
    contraindicacoes: ['Lúpus', 'Taquicardia', 'Aneurisma aórtico', 'Doença coronariana grave'],
    efeitosAdversos: {
      comuns: ['Taquicardia reflexa', 'Cefaleia', 'Flushing', 'Retenção de sódio'],
      graves: ['Síndrome lúpus-like', 'Hipotensão grave']
    },
    interacoes: [
      { medicamento: 'Diuréticos', gravidade: 'moderada', efeito: 'Potencializa hipotensão', conduta: 'Ajustar doses' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['hipertensao', 'pre-eclampsia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antiarrítmicos específicos
  {
    id: 'digoxina',
    nomeGenerico: 'Digoxina',
    nomesComerciais: ['Digoxina', 'Lanoxin'],
    atcCode: 'C01AA05',
    classeTerapeutica: 'cardiotonico',
    subclasse: 'glicosideo_cardiaco',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,25mg', disponivelSUS: true },
      { forma: 'elixir', concentracao: '0,05mg/ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '0,25mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['ICC com FE reduzida', 'FA (controle de frequência)'],
    mecanismoAcao: 'Glicosídeo cardíaco; inotropo positivo; cronotrópico negativo',
    posologias: [
      {
        indicacao: 'ICC/FA crônica',
        adultos: { dose: '0,125-0,25mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Bloqueio AV 2º/3º grau', 'Cardiomiopatia obstrutiva', 'Síndrome WPW'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Anorexia', 'Distúrbios visuais (amarelo-esverdeado)'],
      graves: ['Intoxicação digitálica (arritmias)', 'Bradicardia', 'Bloqueio AV']
    },
    interacoes: [
      { medicamento: 'Amiodarona', gravidade: 'grave', efeito: 'Aumenta digoxina 100%', conduta: 'Reduzir digoxina 50%' },
      { medicamento: 'Verapamil', gravidade: 'moderada', efeito: 'Aumenta digoxina', conduta: 'Monitorar nível' },
      { medicamento: 'Hipocalemia', gravidade: 'grave', efeito: 'Aumenta toxicidade', conduta: 'Manter K+ normal' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    ajusteDoseRenal: [
      { tfg: '<50', ajuste: '0,125mg/dia ou dias alternados' },
      { tfg: '<30', ajuste: '0,0625mg/dia' },
    ],
    monitorizacao: ['Digoxinemia (0,5-1,0 ng/ml)', 'K+', 'Creatinina', 'ECG'],
    doencasRelacionadas: ['icc', 'fibrilacao-atrial'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'verapamil',
    nomeGenerico: 'Verapamil',
    nomesComerciais: ['Dilacoron', 'Cronovera'],
    atcCode: 'C08DA01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bcc',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '120mg', disponivelSUS: true },
      { forma: 'comprimido_cr', concentracao: '240mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '2,5mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Hipertensão', 'FA/Flutter (controle frequência)', 'TPSV', 'Angina'],
    mecanismoAcao: 'BCC não-diidropiridínico; cronotrópico e inotrópico negativo',
    posologias: [
      {
        indicacao: 'Hipertensão/Angina',
        adultos: { dose: '80-120mg', frequencia: '3x/dia ou 240mg CR 1x/dia' },
      },
      {
        indicacao: 'TPSV aguda',
        adultos: { dose: '2,5-5mg IV', frequencia: 'Em 2min, repetir 5-10mg em 15-30min' },
      }
    ],
    contraindicacoes: ['ICC descompensada', 'Bloqueio AV 2º/3º grau', 'Síndrome WPW com FA', 'Hipotensão grave'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Bradicardia', 'Edema periférico', 'Tontura'],
      graves: ['Bloqueio AV', 'Hipotensão grave', 'ICC']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'grave', efeito: 'Bradicardia/Bloqueio', conduta: 'Evitar associação' },
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Aumenta digoxina', conduta: 'Monitorar nível' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['hipertensao', 'angina', 'arritmia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'diltiazem',
    nomeGenerico: 'Diltiazem',
    nomesComerciais: ['Cardizem', 'Balcor'],
    atcCode: 'C08DB01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'bcc',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: true },
      { forma: 'capsula_xr', concentracao: '120mg', disponivelSUS: true },
      { forma: 'capsula_xr', concentracao: '180mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '5mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Hipertensão', 'Angina', 'FA/Flutter (controle frequência)'],
    mecanismoAcao: 'BCC benzotiazepínico; efeito intermediário em coração e vasos',
    posologias: [
      {
        indicacao: 'Hipertensão/Angina',
        adultos: { dose: '30-60mg', frequencia: '3-4x/dia ou 120-360mg XR 1x/dia' },
      },
      {
        indicacao: 'FA aguda',
        adultos: { dose: '0,25mg/kg IV', frequencia: 'Em 2min, depois infusão 5-15mg/h' },
      }
    ],
    contraindicacoes: ['Bloqueio AV 2º/3º grau', 'ICC descompensada', 'Síndrome do nó sinusal'],
    efeitosAdversos: {
      comuns: ['Edema', 'Cefaleia', 'Bradicardia', 'Rubor'],
      graves: ['Bloqueio AV', 'Hipotensão']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Bradicardia', conduta: 'Cautela' },
      { medicamento: 'Sinvastatina', gravidade: 'moderada', efeito: 'Aumenta estatina', conduta: 'Limitar sinvastatina 10mg' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['hipertensao', 'angina', 'arritmia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Insulinas específicas
  {
    id: 'insulina-glargina',
    nomeGenerico: 'Insulina Glargina',
    nomesComerciais: ['Lantus', 'Basaglar'],
    atcCode: 'A10AE04',
    classeTerapeutica: 'antidiabetico',
    subclasse: 'insulina_longa',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100UI/ml', disponivelSUS: true },
    ],
    indicacoes: ['DM1', 'DM2 (insulinoterapia basal)'],
    mecanismoAcao: 'Insulina de longa ação (24h); sem pico',
    posologias: [
      {
        indicacao: 'DM1/DM2',
        adultos: { dose: '10UI ou 0,2UI/kg', frequencia: '1x/dia (mesmo horário)', observacoes: 'Titular conforme glicemia de jejum' },
      }
    ],
    contraindicacoes: ['Hipoglicemia', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Reação no local da injeção', 'Ganho de peso'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Mascara hipoglicemia', conduta: 'Usar beta-1 seletivo' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Glicemia capilar', 'HbA1c'],
    orientacoesPaciente: ['Não agitar; não diluir; não misturar'],
    doencasRelacionadas: ['diabetes-tipo1', 'diabetes-tipo2'],
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
      { forma: 'injetavel_sc', concentracao: '100UI/ml', disponivelSUS: true },
    ],
    indicacoes: ['DM1', 'DM2 (bolus prandial)'],
    mecanismoAcao: 'Insulina ultrarrápida; início 15min, pico 1h, duração 3-4h',
    posologias: [
      {
        indicacao: 'Bolus prandial',
        adultos: { dose: 'Conforme contagem de carboidratos e fator de correção', frequencia: 'Imediatamente antes ou logo após refeição' },
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Lipodistrofia'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Glicemia capilar'],
    doencasRelacionadas: ['diabetes-tipo1', 'diabetes-tipo2'],
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
      { forma: 'injetavel_sc', concentracao: '100UI/ml', disponivelSUS: true },
    ],
    indicacoes: ['DM1', 'DM2 (bolus prandial)'],
    mecanismoAcao: 'Insulina ultrarrápida; início 10-20min',
    posologias: [
      {
        indicacao: 'Bolus prandial',
        adultos: { dose: 'Individualizado por contagem de carboidratos', frequencia: '0-15min antes da refeição' },
      }
    ],
    contraindicacoes: ['Hipoglicemia'],
    efeitosAdversos: {
      comuns: ['Hipoglicemia', 'Reação local'],
      graves: ['Hipoglicemia grave']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Glicemia capilar', 'HbA1c'],
    doencasRelacionadas: ['diabetes-tipo1', 'diabetes-tipo2'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Analgésicos específicos
  {
    id: 'dipirona',
    nomeGenerico: 'Dipirona (Metamizol)',
    nomesComerciais: ['Novalgina', 'Anador'],
    atcCode: 'N02BB02',
    classeTerapeutica: 'analgesico',
    subclasse: 'nao_opioide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '500mg/ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '500mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Dor aguda', 'Febre', 'Cólica renal'],
    mecanismoAcao: 'Analgésico e antipirético; inibe COX central e periférica',
    posologias: [
      {
        indicacao: 'Dor/Febre',
        adultos: { dose: '500-1000mg', frequencia: '6/6h PRN', doseMaxima: '4g/dia' },
        pediatrico: { dose: '10-15mg/kg', frequencia: '6/6h' },
      }
    ],
    contraindicacoes: ['Discrasias sanguíneas', 'Porfiria', 'Deficiência G6PD', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Hipotensão (IV rápida)', 'Reações alérgicas'],
      graves: ['Agranulocitose', 'Choque anafilático', 'Síndrome de Stevens-Johnson']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Aumenta toxicidade MTX', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Evitar por 48h após dose' },
    orientacoesPaciente: ['Evitar uso prolongado; risco de agranulocitose'],
    doencasRelacionadas: ['dor', 'febre'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];
