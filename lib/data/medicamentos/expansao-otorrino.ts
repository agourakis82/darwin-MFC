/**
 * EXPANSÃO OTORRINOLARINGOLOGIA - DARWIN-MFC
 * ===========================================
 * Medicamentos para ouvido, nariz, garganta e vias aéreas superiores.
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosOtorrino: Partial<Medicamento>[] = [
  // ==================== OTOLÓGICOS ====================
  {
    id: 'ciprofloxacino-otico',
    nomeGenerico: 'Ciprofloxacino Otológico',
    nomesComerciais: ['Otociriax', 'Cilodex'],
    atcCode: 'S02AA15',
    classeTerapeutica: 'antibiotico',
    subclasse: 'fluoroquinolona',
    rename: true,
    apresentacoes: [
      { forma: 'gotas', concentracao: '0,3% (3mg/ml)', disponivelSUS: true }
    ],
    indicacoes: ['Otite externa', 'Otite média crônica supurada', 'Otite em perfuração timpânica'],
    mecanismoAcao: 'Fluoroquinolona não ototóxica segura para uso em orelha média.',
    posologias: [
      {
        indicacao: 'Otite externa/média',
        adultos: { dose: '4-5 gotas no ouvido afetado', frequencia: '12/12h por 7-14 dias' },
        pediatrico: { dose: '3-4 gotas', frequencia: '12/12h por 7-14 dias', idadeMinima: '1 ano' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a quinolonas'],
    precaucoes: ['Aquecer gotas antes de instilar', 'Não usar se secreção purulenta abundante'],
    efeitosAdversos: {
      comuns: ['Prurido local', 'Desconforto'],
      graves: ['Reações alérgicas']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso tópico - absorção mínima' }
  },

  {
    id: 'neomicina-polimixina-hidrocortisona-otico',
    nomeGenerico: 'Neomicina + Polimixina B + Hidrocortisona Otológico',
    nomesComerciais: ['Otosporin', 'Lidosporin'],
    atcCode: 'S02CA02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'topico',
    rename: true,
    apresentacoes: [
      { forma: 'gotas', concentracao: 'Neo 3,5mg + Poli 10.000UI + HC 10mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Otite externa aguda', 'Eczema do conduto auditivo'],
    mecanismoAcao: 'Combinação antimicrobiana com corticoide anti-inflamatório.',
    posologias: [
      {
        indicacao: 'Otite externa',
        adultos: { dose: '3-4 gotas', frequencia: '8/8h ou 6/6h por 7-10 dias' },
        pediatrico: { dose: '3 gotas', frequencia: '8/8h por 7-10 dias', idadeMinima: '2 anos' }
      }
    ],
    contraindicacoes: ['Perfuração timpânica (aminoglicosídeo ototóxico)', 'Otomicose'],
    precaucoes: ['Não usar em tímpano perfurado', 'Não usar prolongadamente'],
    efeitosAdversos: {
      comuns: ['Prurido', 'Sensação de queimação'],
      graves: ['Ototoxicidade (se perfuração)', 'Sensibilização']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso tópico' }
  },

  {
    id: 'acido-acetico-otico',
    nomeGenerico: 'Ácido Acético Otológico',
    nomesComerciais: ['Vosol', 'Acetasol'],
    atcCode: 'S02AA10',
    classeTerapeutica: 'antibiotico',
    subclasse: 'topico',
    rename: false,
    apresentacoes: [
      { forma: 'gotas', concentracao: '2%', disponivelSUS: false }
    ],
    indicacoes: ['Otite externa fungica', 'Profilaxia ouvido de nadador', 'Prevenção recorrência otite'],
    mecanismoAcao: 'Acidificação do conduto auditivo inibindo crescimento bacteriano e fúngico.',
    posologias: [
      {
        indicacao: 'Otite externa/profilaxia',
        adultos: { dose: '3-5 gotas', frequencia: '12/12h por 7-14 dias' },
        pediatrico: { dose: '3 gotas', frequencia: '12/12h', idadeMinima: '3 anos' }
      }
    ],
    contraindicacoes: ['Perfuração timpânica'],
    precaucoes: ['Pode causar ardência inicial'],
    efeitosAdversos: {
      comuns: ['Ardência transitória'],
      graves: []
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  // ==================== NASAIS ====================
  {
    id: 'mometasona-nasal',
    nomeGenerico: 'Furoato de Mometasona Nasal',
    nomesComerciais: ['Nasonex', 'Momate'],
    atcCode: 'R01AD09',
    classeTerapeutica: 'corticoide_nasal',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '50mcg/jato', disponivelSUS: true }
    ],
    indicacoes: ['Rinite alérgica', 'Rinossinusite', 'Polipose nasal'],
    mecanismoAcao: 'Corticoide tópico potente com mínima absorção sistêmica.',
    posologias: [
      {
        indicacao: 'Rinite alérgica',
        adultos: { dose: '2 jatos/narina', frequencia: '1x/dia' },
        pediatrico: { dose: '1 jato/narina', frequencia: '1x/dia', idadeMinima: '3 anos' }
      },
      {
        indicacao: 'Polipose nasal',
        adultos: { dose: '2 jatos/narina', frequencia: '2x/dia' }
      }
    ],
    contraindicacoes: ['Epistaxe recorrente não controlada', 'Cirurgia nasal recente'],
    precaucoes: ['Epistaxe possível', 'Uso prolongado: monitorar crescimento em crianças'],
    efeitosAdversos: {
      comuns: ['Epistaxe', 'Cefaleia', 'Irritação nasal'],
      graves: ['Perfuração septo (raro)', 'Supressão adrenal (doses muito altas)']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4 potentes', gravidade: 'leve', efeito: 'Pequeno aumento sistêmico', conduta: 'Geralmente seguro' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Absorção sistêmica mínima' }
  },

  {
    id: 'fluticasona-nasal',
    nomeGenerico: 'Propionato de Fluticasona Nasal',
    nomesComerciais: ['Flixonase', 'Avamys'],
    atcCode: 'R01AD08',
    classeTerapeutica: 'corticoide_nasal',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '50mcg/jato', disponivelSUS: true },
      { forma: 'spray_nasal', concentracao: '27,5mcg/jato (furoato)', disponivelSUS: false }
    ],
    indicacoes: ['Rinite alérgica sazonal e perene', 'Rinite não alérgica', 'Prevenção de recorrência de pólipos'],
    mecanismoAcao: 'Corticoide tópico com alta afinidade receptor e baixa biodisponibilidade.',
    posologias: [
      {
        indicacao: 'Rinite alérgica',
        adultos: { dose: '2 jatos/narina', frequencia: '1x/dia', doseMaxima: '4 jatos/narina/dia' },
        pediatrico: { dose: '1 jato/narina', frequencia: '1x/dia', idadeMinima: '4 anos' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Infecção fúngica nasal não tratada'],
    precaucoes: ['Epistaxe', 'Candidiase nasal raro'],
    efeitosAdversos: {
      comuns: ['Epistaxe', 'Secura nasal', 'Cefaleia'],
      graves: ['Perfuração septal (muito raro)']
    },
    interacoes: [
      { medicamento: 'Ritonavir', gravidade: 'moderada', efeito: 'Aumenta níveis sistêmicos', conduta: 'Preferir mometasona' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Baixa absorção' }
  },

  {
    id: 'azelastina-nasal',
    nomeGenerico: 'Azelastina Nasal',
    nomesComerciais: ['Rino-Lastin', 'Allergodil'],
    atcCode: 'R01AC03',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'segunda_geracao',
    rename: false,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '137mcg/jato', disponivelSUS: false }
    ],
    indicacoes: ['Rinite alérgica', 'Rinite vasomotora'],
    mecanismoAcao: 'Anti-histamínico H1 tópico de segunda geração com efeito anti-inflamatório adicional.',
    posologias: [
      {
        indicacao: 'Rinite alérgica',
        adultos: { dose: '1-2 jatos/narina', frequencia: '12/12h' },
        pediatrico: { dose: '1 jato/narina', frequencia: '12/12h', idadeMinima: '6 anos' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Sabor amargo possível se escorrer para faringe'],
    efeitosAdversos: {
      comuns: ['Disgeusia', 'Sonolência', 'Epistaxe'],
      graves: []
    },
    interacoes: [
      { medicamento: 'Álcool/depressores SNC', gravidade: 'leve', efeito: 'Sonolência aditiva', conduta: 'Cautela' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  {
    id: 'oximetazolina-nasal',
    nomeGenerico: 'Oximetazolina Nasal',
    nomesComerciais: ['Afrin', 'Nasivin'],
    atcCode: 'R01AA05',
    classeTerapeutica: 'descongestionante',
    subclasse: 'simpatomimetico',
    rename: false,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '0,05% (500mcg/ml)', disponivelSUS: false },
      { forma: 'gotas', concentracao: '0,025% pediátrico', disponivelSUS: false }
    ],
    indicacoes: ['Congestão nasal aguda', 'Sinusite aguda (adjuvante)', 'Epistaxe (hemostasia temporária)'],
    mecanismoAcao: 'Agonista alfa-adrenérgico com potente vasoconstrição local.',
    posologias: [
      {
        indicacao: 'Congestão nasal',
        adultos: { dose: '2-3 jatos/narina', frequencia: '12/12h por MAX 3-5 dias' },
        pediatrico: { dose: '1-2 gotas 0,025%', frequencia: '12/12h por MAX 3 dias', idadeMinima: '6 anos' }
      }
    ],
    contraindicacoes: ['Uso prolongado (>5 dias)', 'Crianças <6 anos (0,05%)', 'IMAO'],
    precaucoes: ['Rinite medicamentosa por uso prolongado', 'Evitar em hipertensos graves'],
    efeitosAdversos: {
      comuns: ['Ardência', 'Ressecamento', 'Espirros'],
      graves: ['Rinite medicamentosa de rebote', 'Hipertensão (sistêmico)']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Crise hipertensiva', conduta: 'Contraindicado' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso curto e tópico' }
  },

  {
    id: 'solucao-salina-nasal',
    nomeGenerico: 'Solução Salina Nasal',
    nomesComerciais: ['Sorine', 'Rinosoro', 'Neosoro'],
    atcCode: 'R01AX10',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '0,9% isotônica', disponivelSUS: false },
      { forma: 'gotas', concentracao: '0,9%', disponivelSUS: false },
      { forma: 'spray_nasal', concentracao: '3% hipertônica', disponivelSUS: false }
    ],
    indicacoes: ['Higiene nasal', 'Rinite', 'Rinossinusite', 'Pós-operatório nasal'],
    mecanismoAcao: 'Hidratação, fluidificação de secreções e lavagem mecânica.',
    posologias: [
      {
        indicacao: 'Higiene/lavagem nasal',
        adultos: { dose: '2-3 jatos/narina ou lavagem volume', frequencia: '2-4x/dia' },
        pediatrico: { dose: '1-2 gotas/narina', frequencia: '2-4x/dia', idadeMinima: 'RN' }
      }
    ],
    contraindicacoes: ['Nenhuma significativa'],
    precaucoes: ['Hipertônica: pode arder inicialmente'],
    efeitosAdversos: {
      comuns: ['Leve ardência (hipertônica)'],
      graves: []
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Completamente seguro' }
  },

  {
    id: 'ipratropio-nasal',
    nomeGenerico: 'Brometo de Ipratrópio Nasal',
    nomesComerciais: ['Atrovent Nasal'],
    atcCode: 'R01AX03',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'anticolinergico_curta',
    rename: false,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '0,03% (21mcg/jato)', disponivelSUS: false },
      { forma: 'spray_nasal', concentracao: '0,06% (42mcg/jato)', disponivelSUS: false }
    ],
    indicacoes: ['Rinorreia associada a rinite alérgica e não alérgica', 'Rinorreia por resfriado comum'],
    mecanismoAcao: 'Anticolinérgico que reduz secreção glandular nasal.',
    posologias: [
      {
        indicacao: 'Rinorreia',
        adultos: { dose: '2 jatos/narina', frequencia: '8/8h ou 6/6h' },
        pediatrico: { dose: '2 jatos/narina', frequencia: '8/8h', idadeMinima: '6 anos' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade à atropina'],
    precaucoes: ['Glaucoma de ângulo fechado', 'Hipertrofia prostática'],
    efeitosAdversos: {
      comuns: ['Ressecamento nasal', 'Epistaxe', 'Cefaleia'],
      graves: ['Retenção urinária (raro)']
    },
    interacoes: [
      { medicamento: 'Anticolinérgicos sistêmicos', gravidade: 'leve', efeito: 'Efeito aditivo', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Absorção mínima' }
  },

  // ==================== OROFARÍNGEOS ====================
  {
    id: 'benzidamina',
    nomeGenerico: 'Benzidamina',
    nomesComerciais: ['Flogoral', 'Ciflogex'],
    atcCode: 'A01AD02',
    classeTerapeutica: 'anti_inflamatorio',
    subclasse: 'topico',
    rename: false,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '0,15% (1,5mg/ml)', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '0,15% (colutório)', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '3mg (pastilha)', disponivelSUS: false }
    ],
    indicacoes: ['Faringite', 'Amigdalite', 'Aftas', 'Mucosite pós-radioterapia'],
    mecanismoAcao: 'AINE com propriedades anestésicas locais e anti-inflamatórias.',
    posologias: [
      {
        indicacao: 'Dor de garganta',
        adultos: { dose: '4-8 jatos ou bochechar 15ml', frequencia: '6/6h ou 4/4h' },
        pediatrico: { dose: '4 jatos ou 15ml bochecho (cuspir)', frequencia: '6/6h', idadeMinima: '6 anos' }
      }
    ],
    contraindicacoes: ['Crianças <6 anos (risco aspiração)'],
    precaucoes: ['Cuspir após bochecho', 'Não engolir'],
    efeitosAdversos: {
      comuns: ['Dormência local', 'Alteração paladar'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso tópico' }
  },

  {
    id: 'clorexidina-oral',
    nomeGenerico: 'Digluconato de Clorexidina',
    nomesComerciais: ['Periogard', 'Perioxidin'],
    atcCode: 'A01AB03',
    classeTerapeutica: 'antibiotico',
    subclasse: 'topico',
    rename: false,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '0,12%', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '0,2%', disponivelSUS: false }
    ],
    indicacoes: ['Gengivite', 'Periodontite', 'Controle placa bacteriana', 'Mucosite'],
    mecanismoAcao: 'Antisséptico biguanídico com amplo espectro antimicrobiano.',
    posologias: [
      {
        indicacao: 'Gengivite/higiene oral',
        adultos: { dose: '15ml de solução 0,12%', frequencia: 'Bochechar 30s 2x/dia por 2 semanas' },
        pediatrico: { dose: '10ml', frequencia: '2x/dia', idadeMinima: '12 anos' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Manchamento dental com uso prolongado', 'Alteração paladar'],
    efeitosAdversos: {
      comuns: ['Manchamento dentes', 'Alteração paladar', 'Aumento cálculo'],
      graves: ['Reações alérgicas (raro)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Não absorvido' }
  },

  {
    id: 'nistatina-oral',
    nomeGenerico: 'Nistatina Suspensão Oral',
    nomesComerciais: ['Micostatin'],
    atcCode: 'A07AA02',
    classeTerapeutica: 'antifungico',
    subclasse: 'sistemico',
    rename: true,
    apresentacoes: [
      { forma: 'suspensao_oral', concentracao: '100.000UI/ml', disponivelSUS: true }
    ],
    indicacoes: ['Candidíase oral (sapinho)', 'Candidíase esofágica leve', 'Profilaxia em imunossuprimidos'],
    mecanismoAcao: 'Polieno que se liga ao ergosterol da membrana fúngica causando lise.',
    posologias: [
      {
        indicacao: 'Candidíase oral',
        adultos: { dose: '4-6ml (400.000-600.000UI)', frequencia: '6/6h, bochechar e engolir' },
        pediatrico: { dose: '1-2ml (100.000-200.000UI)', frequencia: '6/6h', idadeMinima: 'RN' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Manter na boca o máximo possível antes de engolir'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Diarreia'],
      graves: ['Reações alérgicas (raro)']
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Não absorvido' }
  },

  // ==================== ANTITUSSÍGENOS E EXPECTORANTES ====================
  {
    id: 'dextrometorfano',
    nomeGenerico: 'Dextrometorfano',
    nomesComerciais: ['Silencium', 'Trimedal Tosse'],
    atcCode: 'R05DA09',
    classeTerapeutica: 'antitussigeno',
    subclasse: 'nao_opioide',
    rename: false,
    apresentacoes: [
      { forma: 'xarope', concentracao: '15mg/5ml', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: false }
    ],
    indicacoes: ['Tosse seca não produtiva', 'Tosse irritativa'],
    mecanismoAcao: 'Supressor central da tosse sem efeito analgésico ou sedativo significativo.',
    posologias: [
      {
        indicacao: 'Tosse',
        adultos: { dose: '10-30mg', frequencia: '6/6h ou 8/8h', doseMaxima: '120mg/dia' },
        pediatrico: { dose: '6-11 anos: 5-10mg; 2-5 anos: 2,5-5mg', frequencia: '6/6h', idadeMinima: '2 anos' }
      }
    ],
    contraindicacoes: ['IMAO (últimos 14 dias)', 'Tosse produtiva', 'Menores de 2 anos'],
    precaucoes: ['Potencial abuso em altas doses', 'Síndrome serotoninérgica com ISRS'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Náusea', 'Sonolência'],
      graves: ['Síndrome serotoninérgica', 'Depressão respiratória (superdose)']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Contraindicado' },
      { medicamento: 'ISRS', gravidade: 'moderada', efeito: 'Risco síndrome serotoninérgica', conduta: 'Evitar ou monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso ocasional provavelmente seguro' }
  },

  {
    id: 'codeina-antitussigeno',
    nomeGenerico: 'Codeína (antitussígeno)',
    nomesComerciais: ['Belacodid', 'Setux'],
    atcCode: 'R05DA04',
    classeTerapeutica: 'antitussigeno',
    subclasse: 'opioide',
    rename: false,
    apresentacoes: [
      { forma: 'xarope', concentracao: '3mg/5ml', disponivelSUS: false }
    ],
    indicacoes: ['Tosse seca intensa não responsiva a outros tratamentos'],
    mecanismoAcao: 'Opioide que suprime reflexo de tosse via ação central.',
    posologias: [
      {
        indicacao: 'Tosse',
        adultos: { dose: '10-20mg', frequencia: '4-6h', doseMaxima: '120mg/dia' },
        pediatrico: { dose: 'Contraindicado em <12 anos', frequencia: 'N/A' }
      }
    ],
    contraindicacoes: ['Crianças <12 anos', 'Depressão respiratória', 'Asma aguda', 'Metabolizadores ultra-rápidos CYP2D6'],
    precaucoes: ['Potencial dependência', 'Constipação', 'Sedação'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Náusea', 'Sonolência'],
      graves: ['Depressão respiratória', 'Dependência']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Evitar ou reduzir doses' },
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Toxicidade opioide', conduta: 'Contraindicado' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Risco para lactente - evitar' }
  },

  {
    id: 'guaifenesina',
    nomeGenerico: 'Guaifenesina',
    nomesComerciais: ['Transpulmin', 'Xarope 44E'],
    atcCode: 'R05CA03',
    classeTerapeutica: 'mucolitico',
    subclasse: 'tiol',
    rename: false,
    apresentacoes: [
      { forma: 'xarope', concentracao: '100mg/5ml', disponivelSUS: false }
    ],
    indicacoes: ['Tosse produtiva', 'Bronquite', 'Fluidificação de secreções'],
    mecanismoAcao: 'Expectorante que aumenta volume e reduz viscosidade do muco.',
    posologias: [
      {
        indicacao: 'Expectoração',
        adultos: { dose: '200-400mg', frequencia: '6/6h', doseMaxima: '2400mg/dia' },
        pediatrico: { dose: '6-11 anos: 100-200mg; 2-5 anos: 50-100mg', frequencia: '6/6h', idadeMinima: '2 anos' }
      }
    ],
    contraindicacoes: ['Tosse persistente por asma, tabagismo ou DPOC (tratar causa)'],
    precaucoes: ['Hidratação adequada potencializa efeito'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Vômito', 'Dor abdominal'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  {
    id: 'acetilcisteina-oral',
    nomeGenerico: 'Acetilcisteína Oral',
    nomesComerciais: ['Fluimucil', 'NAC'],
    atcCode: 'R05CB01',
    classeTerapeutica: 'mucolitico',
    subclasse: 'tiol',
    rename: true,
    apresentacoes: [
      { forma: 'granulado', concentracao: '200mg', disponivelSUS: true },
      { forma: 'granulado', concentracao: '600mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '40mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Bronquite', 'DPOC com secreção', 'Fibrose cística', 'Intoxicação por paracetamol'],
    mecanismoAcao: 'Mucolítico que quebra pontes dissulfeto do muco; antídoto do paracetamol.',
    posologias: [
      {
        indicacao: 'Mucolítico',
        adultos: { dose: '200mg 3x/dia ou 600mg 1x/dia', frequencia: 'Dividir ou dose única' },
        pediatrico: { dose: '2-6 anos: 100mg 2-3x; 6-14 anos: 200mg 2-3x', frequencia: 'Dividir dose diária', idadeMinima: '2 anos' }
      },
      {
        indicacao: 'Intoxicação paracetamol',
        adultos: { dose: '140mg/kg VO ataque, depois 70mg/kg 4/4h x 17 doses', frequencia: 'Protocolo Rumack-Matthew' }
      }
    ],
    contraindicacoes: ['Úlcera péptica ativa', 'Asma (pode broncoespasmo)'],
    precaucoes: ['Odor desagradável', 'Pode causar broncoespasmo em asmáticos'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Vômito', 'Diarreia'],
      graves: ['Broncoespasmo', 'Anafilaxia (raro)']
    },
    interacoes: [
      { medicamento: 'Nitroglicerina', gravidade: 'moderada', efeito: 'Potencializa hipotensão', conduta: 'Monitorar PA' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  // ==================== VERTIGEM E LABIRINTOPATIAS ====================
  {
    id: 'betaistina',
    nomeGenerico: 'Betaistina',
    nomesComerciais: ['Labirin', 'Betaserc'],
    atcCode: 'N07CA01',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '16mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '24mg', disponivelSUS: false }
    ],
    indicacoes: ['Síndrome de Ménière', 'Vertigem vestibular', 'Zumbido'],
    mecanismoAcao: 'Análogo da histamina que melhora microcirculação labiríntica.',
    posologias: [
      {
        indicacao: 'Síndrome de Ménière',
        adultos: { dose: '16-24mg', frequencia: '8/8h', doseMaxima: '48mg/dia' }
      }
    ],
    contraindicacoes: ['Feocromocitoma', 'Úlcera péptica ativa'],
    precaucoes: ['Asma (uso com cautela)', 'Urticária'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náusea', 'Dispepsia'],
      graves: ['Exacerbação asma']
    },
    interacoes: [
      { medicamento: 'Anti-histamínicos', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Evitar anti-H1' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  {
    id: 'cinarizina',
    nomeGenerico: 'Cinarizina',
    nomesComerciais: ['Stugeron', 'Antigeron'],
    atcCode: 'N07CA02',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_1geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '75mg', disponivelSUS: false }
    ],
    indicacoes: ['Vertigem', 'Cinetose', 'Distúrbios circulatórios cerebrais/periféricos'],
    mecanismoAcao: 'Anti-histamínico e bloqueador de cálcio que melhora fluxo vestibular.',
    posologias: [
      {
        indicacao: 'Vertigem',
        adultos: { dose: '25mg', frequencia: '8/8h' },
        pediatrico: { dose: '12,5mg', frequencia: '8/8h', idadeMinima: '6 anos' }
      },
      {
        indicacao: 'Cinetose',
        adultos: { dose: '25mg 2h antes da viagem', frequencia: 'Repetir a cada 8h se necessário' }
      }
    ],
    contraindicacoes: ['Parkinsonismo'],
    precaucoes: ['Sonolência', 'Ganho de peso com uso crônico', 'Parkinsonismo induzido (raro)'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Ganho de peso', 'Xerostomia'],
      graves: ['Parkinsonismo induzido (uso prolongado)', 'Depressão']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'moderada', efeito: 'Sedação aditiva', conduta: 'Cautela' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  {
    id: 'meclizina',
    nomeGenerico: 'Meclizina',
    nomesComerciais: ['Meclin'],
    atcCode: 'R06AE05',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_1geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false }
    ],
    indicacoes: ['Cinetose', 'Vertigem', 'Náusea e vômito de origem vestibular'],
    mecanismoAcao: 'Anti-histamínico com ação anticolinérgica que suprime sistema vestibular.',
    posologias: [
      {
        indicacao: 'Cinetose',
        adultos: { dose: '25-50mg', frequencia: '1h antes da viagem, repetir 24h' },
        pediatrico: { dose: '25mg', frequencia: '1x/dia', idadeMinima: '12 anos' }
      },
      {
        indicacao: 'Vertigem',
        adultos: { dose: '25-100mg/dia', frequencia: 'Dividido 2-4x' }
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'Retenção urinária', 'Hipersensibilidade'],
    precaucoes: ['Idosos (maior sensibilidade)', 'Sonolência'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Boca seca', 'Visão turva'],
      graves: ['Retenção urinária']
    },
    interacoes: [
      { medicamento: 'Anticolinérgicos', gravidade: 'moderada', efeito: 'Efeito aditivo', conduta: 'Cautela em idosos' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro em doses baixas' }
  }
];
