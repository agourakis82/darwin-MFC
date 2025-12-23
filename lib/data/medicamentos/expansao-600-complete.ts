/**
 * EXPANSÃO 600 COMPLETE - DARWIN-MFC
 * ===================================
 *
 * Últimos medicamentos para completar exatamente 600+
 * ~20 medicamentos únicos
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentos600Complete: Partial<Medicamento>[] = [
  // Analgésicos específicos
  {
    id: 'paracetamol',
    nomeGenerico: 'Paracetamol (Acetaminofeno)',
    nomesComerciais: ['Tylenol', 'Dorflex'],
    atcCode: 'N02BE01',
    classeTerapeutica: 'analgesico',
    subclasse: 'nao_opioide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '750mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '200mg/ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '10mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Dor leve a moderada', 'Febre'],
    mecanismoAcao: 'Inibe prostaglandinas no SNC; antipirético central',
    posologias: [
      {
        indicacao: 'Dor/Febre',
        adultos: { dose: '500-1000mg', frequencia: '6/6h PRN', doseMaxima: '4g/dia (3g em hepatopatas)' },
        pediatrico: { dose: '10-15mg/kg', frequencia: '6/6h', doseMaxima: '75mg/kg/dia' },
      }
    ],
    contraindicacoes: ['Hepatopatia grave', 'Alcoolismo'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Erupção cutânea'],
      graves: ['Hepatotoxicidade (overdose)', 'Insuficiência hepática aguda']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumenta INR', conduta: 'Monitorar' },
      { medicamento: 'Álcool', gravidade: 'grave', efeito: 'Hepatotoxicidade', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    orientacoesPaciente: ['Não exceder 4g/dia; verificar outros medicamentos com paracetamol'],
    doencasRelacionadas: ['dor', 'febre'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antifúngicos orais
  {
    id: 'fluconazol-oral',
    nomeGenerico: 'Fluconazol',
    nomesComerciais: ['Zoltec', 'Diflucan'],
    atcCode: 'J02AC01',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '2mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Candidíase vulvovaginal', 'Candidíase oral', 'Candidíase esofágica', 'Meningite criptocócica'],
    mecanismoAcao: 'Inibe síntese de ergosterol (CYP51)',
    posologias: [
      {
        indicacao: 'Candidíase vaginal',
        adultos: { dose: '150mg', frequencia: 'Dose única' },
      },
      {
        indicacao: 'Candidíase oral',
        adultos: { dose: '100-200mg', frequencia: '1x/dia x 7-14 dias' },
      }
    ],
    contraindicacoes: ['Uso de terfenadina/cisaprida', 'QT longo'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náuseas', 'Dor abdominal'],
      graves: ['Hepatotoxicidade', 'Prolongamento QT', 'Stevens-Johnson']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Aumenta INR 2x', conduta: 'Reduzir varfarina 50%' },
      { medicamento: 'Fenitoína', gravidade: 'moderada', efeito: 'Aumenta fenitoína', conduta: 'Monitorar' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Dose única é compatível' },
    ajusteDoseRenal: [
      { tfg: '<50', ajuste: '50% da dose' },
    ],
    doencasRelacionadas: ['candidiase'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'itraconazol',
    nomeGenerico: 'Itraconazol',
    nomesComerciais: ['Sporanox', 'Itranax'],
    atcCode: 'J02AC02',
    classeTerapeutica: 'antifungico',
    subclasse: 'azol',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['Onicomicose', 'Histoplasmose', 'Aspergilose', 'Esporotricose'],
    mecanismoAcao: 'Triazol; inibe CYP51 fúngico',
    posologias: [
      {
        indicacao: 'Onicomicose unhas pés',
        adultos: { dose: '200mg', frequencia: '1x/dia x 3 meses' },
      },
      {
        indicacao: 'Onicomicose (pulsoterapia)',
        adultos: { dose: '200mg 12/12h x 1 semana/mês', frequencia: '3-4 pulsos' },
      }
    ],
    contraindicacoes: ['ICC', 'Gestação', 'Uso de sinvastatina/lovastatina'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Dor abdominal', 'Cefaleia'],
      graves: ['Hepatotoxicidade', 'ICC', 'Neuropatia']
    },
    interacoes: [
      { medicamento: 'Sinvastatina', gravidade: 'contraindicada', efeito: 'Rabdomiólise', conduta: 'Contraindicado' },
      { medicamento: 'Midazolam', gravidade: 'grave', efeito: 'Sedação prolongada', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite' },
    monitorizacao: ['TGO/TGP'],
    orientacoesPaciente: ['Tomar com alimentos para melhor absorção'],
    doencasRelacionadas: ['onicomicose', 'micose-sistemica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'terbinafina',
    nomeGenerico: 'Terbinafina',
    nomesComerciais: ['Lamisil', 'Terbicin'],
    atcCode: 'D01BA02',
    classeTerapeutica: 'antifungico',
    subclasse: 'alilamina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'creme', concentracao: '1%', disponivelSUS: true },
    ],
    indicacoes: ['Onicomicose', 'Tinea corporis', 'Tinea pedis', 'Tinea cruris'],
    mecanismoAcao: 'Alilamina; inibe esqualeno epoxidase',
    posologias: [
      {
        indicacao: 'Onicomicose unhas pés',
        adultos: { dose: '250mg', frequencia: '1x/dia x 12 semanas' },
      },
      {
        indicacao: 'Onicomicose unhas mãos',
        adultos: { dose: '250mg', frequencia: '1x/dia x 6 semanas' },
      }
    ],
    contraindicacoes: ['Hepatopatia crônica ativa'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Diarreia', 'Dispepsia', 'Erupção cutânea'],
      graves: ['Hepatotoxicidade', 'Agranulocitose', 'Perda de paladar']
    },
    interacoes: [
      { medicamento: 'Cafeína', gravidade: 'leve', efeito: 'Aumenta cafeína 20%', conduta: 'Informar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Excretado no leite' },
    monitorizacao: ['TGO/TGP antes e durante tratamento'],
    doencasRelacionadas: ['onicomicose', 'dermatofitose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Anti-inflamatórios específicos
  {
    id: 'ibuprofeno',
    nomeGenerico: 'Ibuprofeno',
    nomesComerciais: ['Advil', 'Alivium'],
    atcCode: 'M01AE01',
    classeTerapeutica: 'aine',
    subclasse: 'nao_seletivo',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '600mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '50mg/ml', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '100mg/5ml', disponivelSUS: true },
    ],
    indicacoes: ['Dor leve a moderada', 'Febre', 'Artrite', 'Dismenorreia'],
    mecanismoAcao: 'AINE não seletivo; inibe COX-1 e COX-2',
    posologias: [
      {
        indicacao: 'Dor/Febre adulto',
        adultos: { dose: '400-600mg', frequencia: '6-8/8h PRN', doseMaxima: '2,4g/dia' },
      },
      {
        indicacao: 'Dor/Febre pediátrico',
        adultos: { dose: '400-600mg', frequencia: '6-8/8h PRN' },
        pediatrico: { dose: '5-10mg/kg', frequencia: '6-8/8h', doseMaxima: '40mg/kg/dia' },
      }
    ],
    contraindicacoes: ['Úlcera péptica ativa', 'DRC grave', 'ICC grave', '3º trimestre gestação'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Náuseas', 'Cefaleia'],
      graves: ['Sangramento GI', 'IRA', 'Eventos cardiovasculares']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'moderada', efeito: 'Risco sangramento', conduta: 'Monitorar' },
      { medicamento: 'IECA', gravidade: 'moderada', efeito: 'Reduz efeito anti-hipertensivo', conduta: 'Monitorar PA' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em doses habituais' },
    doencasRelacionadas: ['dor', 'artrite', 'febre'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'naproxeno',
    nomeGenerico: 'Naproxeno',
    nomesComerciais: ['Flanax', 'Naprosyn'],
    atcCode: 'M01AE02',
    classeTerapeutica: 'aine',
    subclasse: 'nao_seletivo',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
    ],
    indicacoes: ['Artrite reumatoide', 'Osteoartrite', 'Dor aguda', 'Dismenorreia', 'Gota'],
    mecanismoAcao: 'AINE não seletivo; meia-vida longa',
    posologias: [
      {
        indicacao: 'Artrite/Dor',
        adultos: { dose: '250-500mg', frequencia: '12/12h', doseMaxima: '1500mg/dia' },
      },
      {
        indicacao: 'Gota aguda',
        adultos: { dose: '750mg inicial, depois 250mg', frequencia: '8/8h' },
      }
    ],
    contraindicacoes: ['Úlcera ativa', 'Sangramento GI', 'CABG recente', 'DRC grave'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Cefaleia', 'Tontura', 'Edema'],
      graves: ['Sangramento GI', 'IRA', 'Eventos CV']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Toxicidade MTX', conduta: 'Evitar ou reduzir dose' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['artrite', 'gota', 'dor'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'cetoprofeno',
    nomeGenerico: 'Cetoprofeno',
    nomesComerciais: ['Profenid', 'Artrosil'],
    atcCode: 'M01AE03',
    classeTerapeutica: 'aine',
    subclasse: 'nao_seletivo',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'capsula_xr', concentracao: '200mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '100mg/2ml', disponivelSUS: true },
      { forma: 'gel_topico', concentracao: '2,5%', disponivelSUS: true },
    ],
    indicacoes: ['Dor musculoesquelética', 'Artrite', 'Dor pós-operatória'],
    mecanismoAcao: 'AINE potente; derivado do ácido propiônico',
    posologias: [
      {
        indicacao: 'Dor',
        adultos: { dose: '100mg', frequencia: '8/8h ou 200mg XR 1x/dia', doseMaxima: '300mg/dia' },
      }
    ],
    contraindicacoes: ['Úlcera ativa', 'DRC/DH graves', 'Asma por AINEs'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Náuseas', 'Cefaleia'],
      graves: ['Sangramento GI', 'Fotossensibilidade']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Usar com cautela' },
    doencasRelacionadas: ['dor', 'artrite'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antibióticos específicos comuns
  {
    id: 'amoxicilina-clavulanato',
    nomeGenerico: 'Amoxicilina + Clavulanato',
    nomesComerciais: ['Clavulin', 'Novamox'],
    atcCode: 'J01CR02',
    classeTerapeutica: 'antibiotico',
    subclasse: 'penicilina_inibidor',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500/125mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '875/125mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '250/62,5mg/5ml', disponivelSUS: true },
    ],
    indicacoes: ['Sinusite', 'Otite média', 'Pneumonia', 'ITU complicada', 'Infecções de pele'],
    mecanismoAcao: 'Penicilina + inibidor de betalactamase',
    posologias: [
      {
        indicacao: 'Infecções respiratórias',
        adultos: { dose: '500/125mg 8/8h ou 875/125mg', frequencia: '12/12h x 7-10 dias' },
        pediatrico: { dose: '25-45mg/kg/dia', frequencia: 'Dividido em 2-3 doses' },
      }
    ],
    contraindicacoes: ['Alergia a penicilinas', 'Mononucleose', 'Icterícia prévia por amoxi-clav'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Erupção cutânea'],
      graves: ['Colite por C. difficile', 'Hepatotoxicidade', 'Anafilaxia']
    },
    interacoes: [
      { medicamento: 'Alopurinol', gravidade: 'leve', efeito: 'Maior risco de erupção', conduta: 'Monitorar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: '500/125mg 12/12h' },
      { tfg: '<10', ajuste: '500/125mg 24h' },
    ],
    doencasRelacionadas: ['sinusite', 'otite', 'pneumonia', 'itu'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'sulfametoxazol-trimetoprima',
    nomeGenerico: 'Sulfametoxazol + Trimetoprima',
    nomesComerciais: ['Bactrim', 'Infectrin'],
    atcCode: 'J01EE01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'sulfonamida_inibidor_folato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400/80mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '800/160mg', disponivelSUS: true },
      { forma: 'suspensao_oral', concentracao: '200/40mg/5ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '80/16mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['ITU', 'Prostatite', 'Pneumocistose', 'Toxoplasmose', 'MRSA comunitário'],
    mecanismoAcao: 'Inibe síntese de folato em 2 etapas; bactericida',
    posologias: [
      {
        indicacao: 'ITU não complicada',
        adultos: { dose: '800/160mg', frequencia: '12/12h x 3 dias' },
      },
      {
        indicacao: 'Pneumocistose (tratamento)',
        adultos: { dose: '15-20mg/kg/dia de TMP', frequencia: 'Dividido 8/8h x 21 dias' },
      }
    ],
    contraindicacoes: ['Anemia megaloblástica por folato', 'Deficiência G6PD', 'Gestação (1º e 3º trimestres)'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Erupção cutânea', 'Diarreia'],
      graves: ['Stevens-Johnson', 'Agranulocitose', 'Hipercalemia', 'Anemia aplásica']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Aumenta INR', conduta: 'Monitorar rigorosamente' },
      { medicamento: 'Metotrexato', gravidade: 'grave', efeito: 'Toxicidade MTX', conduta: 'Evitar' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Evitar em prematuros e neonatos' },
    ajusteDoseRenal: [
      { tfg: '15-30', ajuste: '50% da dose' },
      { tfg: '<15', ajuste: 'Evitar' },
    ],
    monitorizacao: ['K+ (especialmente em idosos)', 'Hemograma'],
    doencasRelacionadas: ['itu', 'pneumocistose'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'metronidazol-oral',
    nomeGenerico: 'Metronidazol',
    nomesComerciais: ['Flagyl', 'Helmizol'],
    atcCode: 'J01XD01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'nitroimidazol',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '5mg/ml', disponivelSUS: true },
      { forma: 'gel_vaginal', concentracao: '0,75%', disponivelSUS: true },
    ],
    indicacoes: ['Vaginose bacteriana', 'Tricomoníase', 'Amebíase', 'Giardíase', 'C. difficile', 'Infecções anaeróbias'],
    mecanismoAcao: 'Nitroimidazol; bactericida para anaeróbios e protozoários',
    posologias: [
      {
        indicacao: 'Vaginose bacteriana',
        adultos: { dose: '500mg VO', frequencia: '12/12h x 7 dias' },
      },
      {
        indicacao: 'C. difficile',
        adultos: { dose: '500mg', frequencia: '8/8h x 10-14 dias' },
      }
    ],
    contraindicacoes: ['Uso de álcool', '1º trimestre gestação', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Gosto metálico', 'Cefaleia'],
      graves: ['Neuropatia periférica', 'Convulsões (doses altas)', 'Reação dissulfiram-like']
    },
    interacoes: [
      { medicamento: 'Álcool', gravidade: 'grave', efeito: 'Reação dissulfiram', conduta: 'Evitar álcool durante e 3 dias após' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumenta INR', conduta: 'Monitorar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Suspender amamentação por 12-24h após dose' },
    doencasRelacionadas: ['vaginose', 'c-difficile', 'giardiase'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'nitrofurantoina',
    nomeGenerico: 'Nitrofurantoína',
    nomesComerciais: ['Macrodantina'],
    atcCode: 'J01XE01',
    classeTerapeutica: 'antibiotico',
    subclasse: 'nitrofurano',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['ITU não complicada', 'Profilaxia ITU recorrente'],
    mecanismoAcao: 'Nitrofurano; bactericida urinário',
    posologias: [
      {
        indicacao: 'Cistite aguda',
        adultos: { dose: '100mg', frequencia: '6/6h x 5-7 dias' },
      },
      {
        indicacao: 'Profilaxia',
        adultos: { dose: '50-100mg', frequencia: '1x/dia à noite' },
      }
    ],
    contraindicacoes: ['DRC (ClCr <60)', 'Deficiência G6PD', 'Gestação a termo'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Cefaleia', 'Urina marrom'],
      graves: ['Pneumonite', 'Hepatotoxicidade', 'Neuropatia periférica']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Evitar em lactentes <1 mês' },
    orientacoesPaciente: ['Tomar com alimentos'],
    doencasRelacionadas: ['itu'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'norfloxacino',
    nomeGenerico: 'Norfloxacino',
    nomesComerciais: ['Floxacin', 'Uroflox'],
    atcCode: 'J01MA06',
    classeTerapeutica: 'antibiotico',
    subclasse: 'fluoroquinolona',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true },
    ],
    indicacoes: ['ITU', 'Prostatite', 'Profilaxia PBE (cirrose)'],
    mecanismoAcao: 'Fluoroquinolona; inibe DNA-girase',
    posologias: [
      {
        indicacao: 'ITU não complicada',
        adultos: { dose: '400mg', frequencia: '12/12h x 3 dias' },
      },
      {
        indicacao: 'Profilaxia PBE',
        adultos: { dose: '400mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Menores de 18 anos', 'Tendinite prévia por quinolona', 'Miastenia gravis'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Cefaleia', 'Tontura'],
      graves: ['Tendinite/ruptura tendão', 'Neuropatia', 'Prolongamento QT']
    },
    interacoes: [
      { medicamento: 'Antiácidos', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 2h' },
      { medicamento: 'Teofilina', gravidade: 'moderada', efeito: 'Aumenta teofilina', conduta: 'Monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['itu', 'prostatite'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antidepressivos adicionais
  {
    id: 'fluoxetina',
    nomeGenerico: 'Fluoxetina',
    nomesComerciais: ['Prozac', 'Daforin'],
    atcCode: 'N06AB03',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '20mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Depressão', 'TOC', 'Bulimia nervosa', 'Transtorno de pânico', 'TEPT'],
    mecanismoAcao: 'ISRS; inibe recaptação de serotonina; meia-vida longa',
    posologias: [
      {
        indicacao: 'Depressão',
        adultos: { dose: '20mg', frequencia: '1x/dia pela manhã', doseMaxima: '80mg/dia' },
      },
      {
        indicacao: 'TOC',
        adultos: { dose: '20-60mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Uso de pimozida', 'Síndrome serotoninérgica prévia'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Insônia', 'Cefaleia', 'Disfunção sexual', 'Ansiedade inicial'],
      graves: ['Síndrome serotoninérgica', 'Ideação suicida (jovens)', 'Sangramento']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo 5 semanas' },
      { medicamento: 'Tamoxifeno', gravidade: 'grave', efeito: 'Inativa tamoxifeno', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Preferido entre ISRS' },
    orientacoesPaciente: ['Efeito completo em 4-6 semanas; não suspender abruptamente'],
    doencasRelacionadas: ['depressao', 'toc', 'ansiedade'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'sertralina',
    nomeGenerico: 'Sertralina',
    nomesComerciais: ['Zoloft', 'Assert'],
    atcCode: 'N06AB06',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'isrs',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['Depressão', 'TOC', 'Transtorno de pânico', 'TEPT', 'Ansiedade social', 'TDPM'],
    mecanismoAcao: 'ISRS; perfil bem tolerado',
    posologias: [
      {
        indicacao: 'Depressão/Ansiedade',
        adultos: { dose: '50mg', frequencia: '1x/dia, aumentar até 200mg', doseMaxima: '200mg/dia' },
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Uso de pimozida', 'QT longo'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Insônia', 'Disfunção sexual', 'Cefaleia'],
      graves: ['Síndrome serotoninérgica', 'Prolongamento QT', 'Sangramento']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Intervalo 14 dias' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumenta INR', conduta: 'Monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Baixa excreção no leite' },
    doencasRelacionadas: ['depressao', 'ansiedade', 'toc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Ansiolíticos
  {
    id: 'diazepam',
    nomeGenerico: 'Diazepam',
    nomesComerciais: ['Valium', 'Dienpax'],
    atcCode: 'N05BA01',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '5mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Ansiedade', 'Insônia', 'Convulsões', 'Espasmo muscular', 'Abstinência alcoólica'],
    mecanismoAcao: 'Benzodiazepínico de longa ação; potencializa GABA-A',
    posologias: [
      {
        indicacao: 'Ansiedade',
        adultos: { dose: '2-10mg', frequencia: '2-4x/dia' },
      },
      {
        indicacao: 'Convulsão aguda',
        adultos: { dose: '5-10mg IV', frequencia: 'Pode repetir em 10-15min', doseMaxima: '30mg' },
      },
      {
        indicacao: 'Abstinência alcoólica (CIWA)',
        adultos: { dose: '10-20mg', frequencia: 'A cada hora conforme escala' },
      }
    ],
    contraindicacoes: ['Miastenia gravis', 'Insuficiência respiratória grave', 'Apneia do sono', 'Glaucoma de ângulo fechado'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Ataxia', 'Amnésia', 'Confusão (idosos)'],
      graves: ['Depressão respiratória', 'Dependência', 'Reações paradoxais']
    },
    interacoes: [
      { medicamento: 'Opioides', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Evitar ou reduzir doses' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Acumula no lactente' },
    orientacoesPaciente: ['Potencial de dependência; uso máximo 2-4 semanas'],
    doencasRelacionadas: ['ansiedade', 'convulsao', 'abstinencia-alcool'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'clonazepam',
    nomeGenerico: 'Clonazepam',
    nomesComerciais: ['Rivotril'],
    atcCode: 'N03AE01',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '2,5mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Epilepsia', 'Transtorno de pânico', 'Ansiedade', 'Distúrbios do sono REM'],
    mecanismoAcao: 'Benzodiazepínico; anticonvulsivante e ansiolítico',
    posologias: [
      {
        indicacao: 'Pânico/Ansiedade',
        adultos: { dose: '0,25-0,5mg', frequencia: '2x/dia, aumentar até 4mg/dia' },
      },
      {
        indicacao: 'Epilepsia',
        adultos: { dose: '1-4mg', frequencia: '2-3x/dia', doseMaxima: '20mg/dia' },
      }
    ],
    contraindicacoes: ['Glaucoma de ângulo fechado', 'Miastenia gravis', 'Insuficiência respiratória'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Ataxia', 'Alterações comportamentais'],
      graves: ['Dependência', 'Síndrome de abstinência', 'Depressão respiratória']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'grave', efeito: 'Sedação excessiva', conduta: 'Cautela' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Sonolência no lactente' },
    orientacoesPaciente: ['Não suspender abruptamente; risco de convulsões'],
    doencasRelacionadas: ['epilepsia', 'panico', 'ansiedade'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antieméticos/GI
  {
    id: 'omeprazol',
    nomeGenerico: 'Omeprazol',
    nomesComerciais: ['Losec', 'Peprazol'],
    atcCode: 'A02BC01',
    classeTerapeutica: 'inibidor_bomba_protonica',
    subclasse: 'ibp',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '40mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '40mg', disponivelSUS: true },
    ],
    indicacoes: ['DRGE', 'Úlcera péptica', 'Erradicação H. pylori', 'Síndrome de Zollinger-Ellison'],
    mecanismoAcao: 'IBP; inibe H+/K+-ATPase irreversivelmente',
    posologias: [
      {
        indicacao: 'DRGE/Úlcera',
        adultos: { dose: '20-40mg', frequencia: '1x/dia antes do café da manhã' },
      },
      {
        indicacao: 'H. pylori (com antibióticos)',
        adultos: { dose: '20mg', frequencia: '12/12h x 7-14 dias' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Diarreia', 'Dor abdominal', 'Náuseas'],
      graves: ['Colite por C. difficile', 'Hipomagnesemia', 'Fraturas (uso crônico)', 'Nefrite intersticial']
    },
    interacoes: [
      { medicamento: 'Clopidogrel', gravidade: 'moderada', efeito: 'Reduz ativação do clopidogrel', conduta: 'Preferir pantoprazol' },
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Aumenta MTX', conduta: 'Monitorar em doses altas' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    orientacoesPaciente: ['Usar o menor tempo necessário; não para dispepsia leve'],
    doencasRelacionadas: ['drge', 'ulcera-peptica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];
