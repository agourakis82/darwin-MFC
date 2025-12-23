/**
 * MEDICAMENTOS PSIQUIÁTRICOS ADICIONAIS - DARWIN-MFC
 * ===================================================
 *
 * TDAH, dependências, sono, dor crônica psiquiátrica
 * ~35 medicamentos
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosPsiquiatriaAdicional: Partial<Medicamento>[] = [
  // TDAH - Estimulantes
  {
    id: 'metilfenidato-ir',
    nomeGenerico: 'Metilfenidato (Liberação Imediata)',
    nomesComerciais: ['Ritalina'],
    atcCode: 'N06BA04',
    classeTerapeutica: 'psicoestimulante',
    subclasse: 'estimulante_snc',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
    ],
    indicacoes: ['TDAH', 'Narcolepsia'],
    mecanismoAcao: 'Bloqueia recaptação de dopamina e noradrenalina',
    posologias: [
      {
        indicacao: 'TDAH',
        adultos: { dose: '10-60mg', frequencia: 'Dividido 2-3x/dia', doseMaxima: '60mg/dia', observacoes: 'Iniciar 5mg 2x/dia' },
        pediatrico: { dose: '0,3-1mg/kg/dia', frequencia: 'Dividido 2-3x/dia', idadeMinima: '6 anos', doseMaxima: '60mg/dia' },
      }
    ],
    contraindicacoes: ['Ansiedade grave', 'Glaucoma', 'Tiques/Tourette', 'Uso de IMAO', 'Arritmias', 'Hipertensão grave'],
    efeitosAdversos: {
      comuns: ['Insônia', 'Anorexia', 'Cefaleia', 'Taquicardia', 'Xerostomia'],
      graves: ['Psicose', 'Crescimento reduzido (crianças)', 'Eventos cardiovasculares', 'Priapismo']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Crise hipertensiva', conduta: 'Aguardar 14 dias após IMAO' },
      { medicamento: 'Antidepressivos tricíclicos', gravidade: 'moderada', efeito: 'Aumenta níveis do tricíclico', conduta: 'Monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar - passa para leite' },
    monitorizacao: ['PA e FC', 'Peso e altura (crianças)', 'Sintomas psicóticos'],
    doencasRelacionadas: ['tdah'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'metilfenidato-la',
    nomeGenerico: 'Metilfenidato (Liberação Prolongada)',
    nomesComerciais: ['Ritalina LA', 'Concerta'],
    atcCode: 'N06BA04',
    classeTerapeutica: 'psicoestimulante',
    subclasse: 'estimulante_snc',
    rename: false,
    apresentacoes: [
      { forma: 'capsula_xr', concentracao: '20mg', disponivelSUS: false },
      { forma: 'capsula_xr', concentracao: '30mg', disponivelSUS: false },
      { forma: 'capsula_xr', concentracao: '40mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '18mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '36mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '54mg', disponivelSUS: false },
    ],
    indicacoes: ['TDAH'],
    mecanismoAcao: 'Bloqueia recaptação de dopamina e noradrenalina',
    posologias: [
      {
        indicacao: 'TDAH',
        adultos: { dose: '18-72mg', frequencia: '1x/dia pela manhã', doseMaxima: '72mg/dia (Concerta)' },
        pediatrico: { dose: '18-54mg', frequencia: '1x/dia', idadeMinima: '6 anos' },
      }
    ],
    contraindicacoes: ['Ansiedade grave', 'Glaucoma', 'Tiques', 'IMAO recente'],
    efeitosAdversos: {
      comuns: ['Insônia', 'Anorexia', 'Cefaleia'],
      graves: ['Psicose', 'Eventos CV', 'Crescimento reduzido']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Crise hipertensiva', conduta: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['tdah'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'lisdexanfetamina',
    nomeGenerico: 'Dimesilato de Lisdexanfetamina',
    nomesComerciais: ['Venvanse'],
    atcCode: 'N06BA12',
    classeTerapeutica: 'psicoestimulante',
    subclasse: 'estimulante_snc',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '30mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '50mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '70mg', disponivelSUS: false },
    ],
    indicacoes: ['TDAH', 'Transtorno de compulsão alimentar'],
    mecanismoAcao: 'Pró-droga de dextroanfetamina; libera dopamina e noradrenalina',
    posologias: [
      {
        indicacao: 'TDAH',
        adultos: { dose: '30-70mg', frequencia: '1x/dia pela manhã', doseMaxima: '70mg/dia' },
        pediatrico: { dose: '30-70mg', frequencia: '1x/dia', idadeMinima: '6 anos' },
      }
    ],
    contraindicacoes: ['Doença CV avançada', 'Hipertireoidismo', 'Glaucoma', 'IMAO', 'História de abuso de drogas'],
    efeitosAdversos: {
      comuns: ['Insônia', 'Anorexia', 'Xerostomia', 'Irritabilidade'],
      graves: ['Psicose', 'Cardiomiopatia', 'Morte súbita (cardíacos)', 'Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Crise hipertensiva', conduta: 'Aguardar 14 dias' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    monitorizacao: ['PA, FC', 'Peso', 'Sintomas psiquiátricos'],
    doencasRelacionadas: ['tdah', 'compulsao-alimentar'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // TDAH - Não estimulantes
  {
    id: 'atomoxetina',
    nomeGenerico: 'Atomoxetina',
    nomesComerciais: ['Strattera'],
    atcCode: 'N06BA09',
    classeTerapeutica: 'psicoestimulante',
    subclasse: 'inibidor_recaptacao_noradrenalina',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '10mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '18mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '25mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '40mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '60mg', disponivelSUS: false },
    ],
    indicacoes: ['TDAH'],
    mecanismoAcao: 'Inibidor seletivo de recaptação de noradrenalina',
    posologias: [
      {
        indicacao: 'TDAH',
        adultos: { dose: '40-100mg', frequencia: '1x/dia ou dividido', doseMaxima: '100mg/dia', observacoes: 'Iniciar 40mg/dia x 3 dias' },
        pediatrico: { dose: '0,5-1,4mg/kg/dia', frequencia: '1x/dia', idadeMinima: '6 anos', doseMaxima: '1,4mg/kg ou 100mg' },
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'Feocromocitoma', 'IMAO recente'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Xerostomia', 'Insônia', 'Perda de apetite'],
      graves: ['Hepatotoxicidade', 'Ideação suicida', 'Eventos CV']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Risco hipertensivo', conduta: 'Aguardar 14 dias' },
      { medicamento: 'Fluoxetina/Paroxetina', gravidade: 'moderada', efeito: 'Inibição CYP2D6', conduta: 'Reduzir dose atomoxetina' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Função hepática', 'Crescimento', 'Ideação suicida'],
    doencasRelacionadas: ['tdah'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Dependências
  {
    id: 'naltrexona',
    nomeGenerico: 'Naltrexona',
    nomesComerciais: ['Revia', 'Vivitrol'],
    atcCode: 'N07BB04',
    classeTerapeutica: 'tratamento_dependencia',
    subclasse: 'antagonista_opioide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
    ],
    indicacoes: ['Dependência de álcool', 'Dependência de opioides', 'Obesidade (baixa dose)'],
    mecanismoAcao: 'Antagonista de receptores opioides mu, kappa e delta',
    posologias: [
      {
        indicacao: 'Alcoolismo',
        adultos: { dose: '50mg', frequencia: '1x/dia', observacoes: 'Iniciar após 7 dias sem opioides' },
      }
    ],
    contraindicacoes: ['Uso atual de opioides', 'Síndrome de abstinência opioide', 'Hepatite aguda', 'Hepatopatia grave'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Cefaleia', 'Ansiedade', 'Fadiga'],
      graves: ['Hepatotoxicidade dose-dependente', 'Síndrome abstinência precipitada']
    },
    interacoes: [
      { medicamento: 'Opioides', gravidade: 'grave', efeito: 'Bloqueia efeito analgésico e pode precipitar abstinência', conduta: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Função hepática', 'Uso de opioides'],
    doencasRelacionadas: ['alcoolismo', 'dependencia-opioides'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'dissulfiram',
    nomeGenerico: 'Dissulfiram',
    nomesComerciais: ['Antietanol', 'Antabuse'],
    atcCode: 'N07BB01',
    classeTerapeutica: 'tratamento_dependencia',
    subclasse: 'aversivo_alcool',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
    ],
    indicacoes: ['Dependência de álcool (tratamento aversivo)'],
    mecanismoAcao: 'Inibe aldeído desidrogenase; acúmulo de acetaldeído causa reação desagradável com álcool',
    posologias: [
      {
        indicacao: 'Alcoolismo',
        adultos: { dose: '250-500mg', frequencia: '1x/dia', doseMaxima: '500mg/dia', observacoes: 'Iniciar 12-24h após última dose de álcool' },
      }
    ],
    contraindicacoes: ['Doença CV grave', 'Psicose', 'Hipersensibilidade a tiuram', 'Uso concomitante de álcool ou metronidazol'],
    efeitosAdversos: {
      comuns: ['Fadiga', 'Cefaleia', 'Gosto metálico', 'Dermatite'],
      graves: ['Hepatotoxicidade', 'Neuropatia óptica', 'Psicose']
    },
    interacoes: [
      { medicamento: 'Álcool', gravidade: 'grave', efeito: 'Reação dissulfiram-álcool (rubor, náuseas, hipotensão)', conduta: 'Advertir paciente - efeito desejado terapeuticamente' },
      { medicamento: 'Metronidazol', gravidade: 'grave', efeito: 'Reação tipo dissulfiram', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Função hepática', 'Abstinência alcoólica'],
    doencasRelacionadas: ['alcoolismo'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'acamprosato',
    nomeGenerico: 'Acamprosato',
    nomesComerciais: ['Campral'],
    atcCode: 'N07BB03',
    classeTerapeutica: 'tratamento_dependencia',
    subclasse: 'modulador_glutamato',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '333mg', disponivelSUS: false },
    ],
    indicacoes: ['Manutenção da abstinência alcoólica'],
    mecanismoAcao: 'Modula neurotransmissão glutamatérgica e GABAérgica',
    posologias: [
      {
        indicacao: 'Alcoolismo',
        adultos: { dose: '666mg', frequencia: '3x/dia (2 comprimidos 3x)', doseMaxima: '1998mg/dia', observacoes: 'Iniciar logo após desintoxicação' },
      }
    ],
    contraindicacoes: ['ClCr <30', 'Gestação', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas', 'Prurido'],
      graves: ['Ideação suicida (raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    ajusteDoseRenal: [
      { tfg: '30-50', ajuste: '333mg 3x/dia' },
      { tfg: '<30', ajuste: 'Contraindicado' },
    ],
    doencasRelacionadas: ['alcoolismo'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'buprenorfina',
    nomeGenerico: 'Buprenorfina',
    nomesComerciais: ['Subutex', 'Suboxone', 'Temgesic'],
    atcCode: 'N07BC01',
    classeTerapeutica: 'tratamento_dependencia',
    subclasse: 'agonista_parcial_opioide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '8mg', disponivelSUS: true },
    ],
    indicacoes: ['Dependência de opioides (tratamento substitutivo)', 'Dor moderada-grave'],
    mecanismoAcao: 'Agonista parcial de receptores mu-opioides; antagonista kappa',
    posologias: [
      {
        indicacao: 'Dependência opioides',
        adultos: { dose: '4-24mg', frequencia: 'Sublingual 1x/dia', doseMaxima: '24mg/dia', observacoes: 'Iniciar em abstinência leve-moderada' },
      }
    ],
    contraindicacoes: ['Insuficiência respiratória grave', 'Hepatopatia grave', 'Intoxicação alcoólica aguda'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Constipação', 'Náuseas', 'Sudorese'],
      graves: ['Depressão respiratória', 'Hepatotoxicidade', 'Dependência']
    },
    interacoes: [
      { medicamento: 'Benzodiazepínicos', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Evitar associação ou usar com extrema cautela' },
      { medicamento: 'Inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em doses estáveis de manutenção' },
    monitorizacao: ['Sinais de abstinência/overdose', 'Função hepática'],
    doencasRelacionadas: ['dependencia-opioides'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'metadona',
    nomeGenerico: 'Metadona',
    nomesComerciais: ['Mytedom'],
    atcCode: 'N07BC02',
    classeTerapeutica: 'tratamento_dependencia',
    subclasse: 'agonista_opioide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '10mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Tratamento de manutenção dependência opioides', 'Dor crônica refratária'],
    mecanismoAcao: 'Agonista completo de receptores mu-opioides; antagonista NMDA',
    posologias: [
      {
        indicacao: 'Dependência opioides',
        adultos: { dose: '20-120mg', frequencia: '1x/dia', observacoes: 'Titulação lenta; meia-vida longa (15-60h)' },
      }
    ],
    contraindicacoes: ['Depressão respiratória', 'Íleo paralítico', 'IMAO concomitante'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Sudorese', 'Náuseas', 'Sedação'],
      graves: ['Depressão respiratória', 'Prolongamento QT', 'Torsades de pointes']
    },
    interacoes: [
      { medicamento: 'Drogas que prolongam QT', gravidade: 'grave', efeito: 'Arritmias', conduta: 'ECG antes e durante' },
      { medicamento: 'Rifampicina', gravidade: 'grave', efeito: 'Reduz níveis de metadona', conduta: 'Aumentar dose de metadona' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em doses estáveis' },
    monitorizacao: ['ECG (QTc)', 'Sinais de intoxicação', 'Uso de outras drogas'],
    doencasRelacionadas: ['dependencia-opioides'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'vareniclina',
    nomeGenerico: 'Vareniclina',
    nomesComerciais: ['Champix', 'Chantix'],
    atcCode: 'N07BA03',
    classeTerapeutica: 'tratamento_dependencia',
    subclasse: 'agonista_parcial_nicotinico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
    ],
    indicacoes: ['Cessação do tabagismo'],
    mecanismoAcao: 'Agonista parcial de receptores nicotínicos alfa-4-beta-2; reduz recompensa e fissura',
    posologias: [
      {
        indicacao: 'Tabagismo',
        adultos: { dose: 'Dias 1-3: 0,5mg 1x; Dias 4-7: 0,5mg 2x; Depois: 1mg 2x', frequencia: 'Ver esquema', observacoes: 'Iniciar 1 semana antes de parar de fumar; 12 semanas de tratamento' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Insônia', 'Sonhos anormais', 'Cefaleia'],
      graves: ['Ideação suicida', 'Alterações comportamentais', 'Eventos CV (controverso)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Máx 0,5mg 2x/dia' },
    ],
    monitorizacao: ['Humor', 'Sintomas neuropsiquiátricos'],
    doencasRelacionadas: ['tabagismo'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'bupropiona-tabagismo',
    nomeGenerico: 'Bupropiona',
    nomesComerciais: ['Zyban', 'Wellbutrin'],
    atcCode: 'N07BA02',
    classeTerapeutica: 'tratamento_dependencia',
    subclasse: 'inibidor_recaptacao_da_ne',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '150mg', disponivelSUS: true },
    ],
    indicacoes: ['Cessação do tabagismo', 'Depressão'],
    mecanismoAcao: 'Inibe recaptação de dopamina e noradrenalina',
    posologias: [
      {
        indicacao: 'Tabagismo',
        adultos: { dose: '150mg 1x/dia x 3 dias, depois 150mg 2x/dia', frequencia: 'Ver esquema', doseMaxima: '300mg/dia', observacoes: 'Iniciar 1-2 semanas antes de parar; 7-12 semanas' },
      }
    ],
    contraindicacoes: ['Epilepsia', 'Bulimia/anorexia', 'Uso de IMAO', 'Descontinuação abrupta de álcool/BZD'],
    efeitosAdversos: {
      comuns: ['Insônia', 'Xerostomia', 'Cefaleia', 'Náuseas'],
      graves: ['Convulsões', 'Reações alérgicas', 'Hipertensão']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Crise hipertensiva', conduta: 'Aguardar 14 dias' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['tabagismo', 'depressao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Hipnóticos
  {
    id: 'zolpidem',
    nomeGenerico: 'Zolpidem',
    nomesComerciais: ['Stilnox', 'Ambien'],
    atcCode: 'N05CF02',
    classeTerapeutica: 'hipnotico',
    subclasse: 'z_drugs',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido_xr', concentracao: '6,25mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '12,5mg', disponivelSUS: false },
    ],
    indicacoes: ['Insônia de curto prazo'],
    mecanismoAcao: 'Agonista seletivo do receptor GABA-A (subunidade alfa-1)',
    posologias: [
      {
        indicacao: 'Insônia',
        adultos: { dose: '5-10mg', frequencia: 'Ao deitar', doseMaxima: '10mg/dia', observacoes: 'Mulheres: iniciar 5mg; Idosos: máx 5mg' },
      }
    ],
    contraindicacoes: ['Apneia do sono grave', 'Miastenia gravis', 'Insuficiência respiratória grave'],
    efeitosAdversos: {
      comuns: ['Sonolência residual', 'Cefaleia', 'Tontura'],
      graves: ['Comportamentos complexos durante sono (dirigir)', 'Amnésia', 'Dependência', 'Quedas']
    },
    interacoes: [
      { medicamento: 'Depressores do SNC', gravidade: 'moderada', efeito: 'Sedação aditiva', conduta: 'Evitar álcool; reduzir doses' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['insonia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'zopiclona',
    nomeGenerico: 'Zopiclona',
    nomesComerciais: ['Imovane'],
    atcCode: 'N05CF01',
    classeTerapeutica: 'hipnotico',
    subclasse: 'z_drugs',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '7,5mg', disponivelSUS: false },
    ],
    indicacoes: ['Insônia'],
    mecanismoAcao: 'Agonista do receptor GABA-A',
    posologias: [
      {
        indicacao: 'Insônia',
        adultos: { dose: '7,5mg', frequencia: 'Ao deitar', observacoes: 'Idosos: 3,75mg' },
      }
    ],
    contraindicacoes: ['Miastenia gravis', 'Apneia do sono grave', 'Insuficiência respiratória'],
    efeitosAdversos: {
      comuns: ['Gosto metálico', 'Xerostomia', 'Sonolência'],
      graves: ['Comportamentos complexos durante sono', 'Dependência']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'moderada', efeito: 'Potencialização', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['insonia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'eszopiclona',
    nomeGenerico: 'Eszopiclona',
    nomesComerciais: ['Lunesta'],
    atcCode: 'N05CF04',
    classeTerapeutica: 'hipnotico',
    subclasse: 'z_drugs',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '3mg', disponivelSUS: false },
    ],
    indicacoes: ['Insônia'],
    mecanismoAcao: 'Enantiômero S da zopiclona; agonista GABA-A',
    posologias: [
      {
        indicacao: 'Insônia',
        adultos: { dose: '1-3mg', frequencia: 'Ao deitar', doseMaxima: '3mg/dia', observacoes: 'Idosos: iniciar 1mg' },
      }
    ],
    contraindicacoes: ['Miastenia gravis', 'Insuficiência respiratória grave'],
    efeitosAdversos: {
      comuns: ['Gosto desagradável', 'Cefaleia', 'Sonolência'],
      graves: ['Comportamentos complexos', 'Angioedema', 'Dependência']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Iniciar com 1mg' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['insonia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'suvorexanto',
    nomeGenerico: 'Suvorexanto',
    nomesComerciais: ['Belsomra'],
    atcCode: 'N05CX06',
    classeTerapeutica: 'hipnotico',
    subclasse: 'antagonista_orexina',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
    ],
    indicacoes: ['Insônia (dificuldade iniciar e/ou manter sono)'],
    mecanismoAcao: 'Antagonista de receptores de orexina 1 e 2',
    posologias: [
      {
        indicacao: 'Insônia',
        adultos: { dose: '10-20mg', frequencia: 'Ao deitar', doseMaxima: '20mg/dia', observacoes: 'Tomar 30min antes de deitar' },
      }
    ],
    contraindicacoes: ['Narcolepsia'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Cefaleia', 'Tontura'],
      graves: ['Paralisia do sono', 'Alucinações hipnagógicas', 'Cataplexia-like']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4 potentes', gravidade: 'grave', efeito: 'Aumento significativo níveis', conduta: 'Evitar; se necessário, usar 5mg' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['insonia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'melatonina',
    nomeGenerico: 'Melatonina',
    nomesComerciais: ['Circadin'],
    atcCode: 'N05CH01',
    classeTerapeutica: 'hipnotico',
    subclasse: 'hormonio_pineal',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '3mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '2mg', disponivelSUS: false },
    ],
    indicacoes: ['Insônia', 'Jet lag', 'Transtorno de fase do sono atrasado'],
    mecanismoAcao: 'Agonista de receptores MT1 e MT2; regula ritmo circadiano',
    posologias: [
      {
        indicacao: 'Insônia',
        adultos: { dose: '0,5-5mg', frequencia: '30-60min antes de deitar', observacoes: 'Dose ótima varia; iniciar baixo' },
        pediatrico: { dose: '0,5-3mg', frequencia: 'Antes de dormir', idadeMinima: '2 anos (off-label)', observacoes: 'Útil em TEA, TDAH' },
      }
    ],
    contraindicacoes: ['Doenças autoimunes (teórico)'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Cefaleia', 'Tontura'],
      graves: []
    },
    interacoes: [
      { medicamento: 'Warfarina', gravidade: 'moderada', efeito: 'Pode aumentar anticoagulação', conduta: 'Monitorar INR' },
    ],
    gestacao: 'N',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro - hormônio endógeno' },
    doencasRelacionadas: ['insonia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Outros psiquiátricos
  {
    id: 'gabapentina',
    nomeGenerico: 'Gabapentina',
    nomesComerciais: ['Neurontin', 'Gabantin'],
    atcCode: 'N03AX12',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'ligante_alfa2delta',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '300mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '400mg', disponivelSUS: true },
    ],
    indicacoes: ['Dor neuropática', 'Epilepsia focal', 'Síndrome das pernas inquietas', 'TAG (off-label)'],
    mecanismoAcao: 'Liga-se à subunidade alfa-2-delta de canais de cálcio voltagem-dependentes',
    posologias: [
      {
        indicacao: 'Dor neuropática',
        adultos: { dose: '300-3600mg', frequencia: 'Dividido 3x/dia', doseMaxima: '3600mg/dia', observacoes: 'Titulação: 300mg dia 1, 600mg dia 2, 900mg dia 3' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Tontura', 'Ataxia', 'Fadiga', 'Edema periférico'],
      graves: ['Depressão respiratória (com opioides)', 'Angioedema', 'Ideação suicida']
    },
    interacoes: [
      { medicamento: 'Opioides', gravidade: 'grave', efeito: 'Depressão respiratória aditiva', conduta: 'Usar menor dose eficaz' },
      { medicamento: 'Antiácidos', gravidade: 'leve', efeito: 'Reduz absorção', conduta: 'Separar em 2h' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: '200-700mg dividido 2x/dia' },
      { tfg: '15-30', ajuste: '200-700mg 1x/dia' },
      { tfg: '<15', ajuste: '100-300mg 1x/dia' },
    ],
    doencasRelacionadas: ['dor-neuropatica', 'epilepsia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'pregabalina',
    nomeGenerico: 'Pregabalina',
    nomesComerciais: ['Lyrica', 'Prebictal'],
    atcCode: 'N03AX16',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'ligante_alfa2delta',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '75mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: true },
    ],
    indicacoes: ['Dor neuropática', 'Fibromialgia', 'TAG', 'Epilepsia focal'],
    mecanismoAcao: 'Liga-se à subunidade alfa-2-delta; reduz liberação de neurotransmissores excitatórios',
    posologias: [
      {
        indicacao: 'Dor neuropática/TAG',
        adultos: { dose: '150-600mg', frequencia: 'Dividido 2-3x/dia', doseMaxima: '600mg/dia', observacoes: 'Iniciar 75mg 2x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Sonolência', 'Edema periférico', 'Ganho peso'],
      graves: ['Depressão respiratória', 'Angioedema', 'Rabdomiólise', 'Ideação suicida']
    },
    interacoes: [
      { medicamento: 'Opioides/BZD', gravidade: 'grave', efeito: 'Depressão SNC aditiva', conduta: 'Usar menor dose' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: 'Máx 300mg/dia' },
      { tfg: '15-30', ajuste: 'Máx 150mg/dia' },
      { tfg: '<15', ajuste: 'Máx 75mg/dia' },
    ],
    doencasRelacionadas: ['dor-neuropatica', 'fibromialgia', 'tag'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'duloxetina',
    nomeGenerico: 'Duloxetina',
    nomesComerciais: ['Cymbalta', 'Velija'],
    atcCode: 'N06AX21',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'irsn',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '30mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '60mg', disponivelSUS: true },
    ],
    indicacoes: ['Depressão', 'TAG', 'Dor neuropática diabética', 'Fibromialgia', 'Dor musculoesquelética crônica'],
    mecanismoAcao: 'Inibe recaptação de serotonina e noradrenalina',
    posologias: [
      {
        indicacao: 'Depressão/TAG',
        adultos: { dose: '60mg', frequencia: '1x/dia', doseMaxima: '120mg/dia' },
      },
      {
        indicacao: 'Dor neuropática/Fibromialgia',
        adultos: { dose: '30-60mg', frequencia: '1x/dia', doseMaxima: '60mg/dia' },
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Glaucoma não controlado', 'Hepatopatia grave'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Xerostomia', 'Constipação', 'Sonolência'],
      graves: ['Síndrome serotoninérgica', 'Hepatotoxicidade', 'Ideação suicida', 'Síndrome descontinuação']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Aguardar 14 dias' },
      { medicamento: 'Inibidores CYP1A2', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Evitar fluvoxamina; cautela ciprofloxacino' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar - excreção significativa no leite' },
    doencasRelacionadas: ['depressao', 'ansiedade', 'dor-neuropatica', 'fibromialgia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'venlafaxina',
    nomeGenerico: 'Venlafaxina',
    nomesComerciais: ['Efexor', 'Venlaxin'],
    atcCode: 'N06AX16',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'irsn',
    rename: true,
    apresentacoes: [
      { forma: 'capsula_xr', concentracao: '75mg', disponivelSUS: true },
      { forma: 'capsula_xr', concentracao: '150mg', disponivelSUS: true },
    ],
    indicacoes: ['Depressão', 'TAG', 'Fobia social', 'Transtorno do pânico'],
    mecanismoAcao: 'Inibe recaptação de serotonina (baixas doses) e noradrenalina (doses maiores)',
    posologias: [
      {
        indicacao: 'Depressão/Ansiedade',
        adultos: { dose: '75-225mg', frequencia: '1x/dia (XR)', doseMaxima: '375mg/dia', observacoes: 'Iniciar 75mg/dia' },
      }
    ],
    contraindicacoes: ['IMAO', 'Hipertensão não controlada'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Cefaleia', 'Insônia', 'Xerostomia', 'HAS dose-dependente'],
      graves: ['Síndrome serotoninérgica', 'Síndrome descontinuação grave', 'Ideação suicida']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Aguardar 14 dias' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível com monitorização do lactente' },
    ajusteDoseRenal: [
      { tfg: '10-70', ajuste: 'Reduzir dose em 25-50%' },
    ],
    monitorizacao: ['PA (dose-dependente)', 'Humor'],
    doencasRelacionadas: ['depressao', 'ansiedade', 'panico'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'mirtazapina',
    nomeGenerico: 'Mirtazapina',
    nomesComerciais: ['Remeron', 'Menelat'],
    atcCode: 'N06AX11',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'atipico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '45mg', disponivelSUS: true },
    ],
    indicacoes: ['Depressão', 'Insônia associada à depressão', 'Estimulante de apetite (off-label)'],
    mecanismoAcao: 'Antagonista alfa-2 adrenérgico e 5-HT2/5-HT3; aumenta noradrenalina e serotonina',
    posologias: [
      {
        indicacao: 'Depressão',
        adultos: { dose: '15-45mg', frequencia: '1x/dia ao deitar', doseMaxima: '45mg/dia', observacoes: 'Efeito sedativo paradoxalmente maior em doses baixas' },
      }
    ],
    contraindicacoes: ['IMAO', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Ganho de peso', 'Aumento apetite', 'Xerostomia'],
      graves: ['Agranulocitose', 'Síndrome serotoninérgica', 'Ideação suicida']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Aguardar 14 dias' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['depressao', 'insonia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'buspirona',
    nomeGenerico: 'Buspirona',
    nomesComerciais: ['Buspar', 'Ansitec'],
    atcCode: 'N05BE01',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'azapirona',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
    ],
    indicacoes: ['TAG', 'Ansiedade'],
    mecanismoAcao: 'Agonista parcial de receptores 5-HT1A',
    posologias: [
      {
        indicacao: 'TAG',
        adultos: { dose: '15-60mg', frequencia: 'Dividido 2-3x/dia', doseMaxima: '60mg/dia', observacoes: 'Iniciar 5mg 3x/dia; efeito em 2-4 semanas' },
      }
    ],
    contraindicacoes: ['IMAO', 'Insuficiência hepática/renal grave'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Cefaleia', 'Náuseas', 'Nervosismo inicial'],
      graves: ['Síndrome serotoninérgica (raro)']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Aguardar 14 dias' },
      { medicamento: 'Inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Reduzir dose' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['ansiedade', 'tag'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'trazodona',
    nomeGenerico: 'Trazodona',
    nomesComerciais: ['Donaren', 'Desyrel'],
    atcCode: 'N06AX05',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'sari',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: true },
    ],
    indicacoes: ['Depressão', 'Insônia (baixas doses)', 'Ansiedade'],
    mecanismoAcao: 'Antagonista/inibidor da recaptação de serotonina (SARI); antagonista 5-HT2A e H1',
    posologias: [
      {
        indicacao: 'Insônia',
        adultos: { dose: '25-100mg', frequencia: 'Ao deitar' },
      },
      {
        indicacao: 'Depressão',
        adultos: { dose: '150-400mg', frequencia: 'Dividido ou ao deitar', doseMaxima: '600mg/dia (internação)' },
      }
    ],
    contraindicacoes: ['IMAO', 'Fase aguda IAM'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Tontura', 'Xerostomia', 'Hipotensão ortostática'],
      graves: ['Priapismo', 'Arritmias', 'Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Contraindicado' },
      { medicamento: 'Inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Reduzir dose' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível em baixas doses' },
    doencasRelacionadas: ['depressao', 'insonia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'agomelatina',
    nomeGenerico: 'Agomelatina',
    nomesComerciais: ['Valdoxan'],
    atcCode: 'N06AX22',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'agonista_melatonina',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false },
    ],
    indicacoes: ['Depressão maior'],
    mecanismoAcao: 'Agonista MT1/MT2 (melatonina); antagonista 5-HT2C',
    posologias: [
      {
        indicacao: 'Depressão',
        adultos: { dose: '25-50mg', frequencia: '1x/dia ao deitar', doseMaxima: '50mg/dia' },
      }
    ],
    contraindicacoes: ['Hepatopatia', 'Transaminases >3x LSN', 'Uso de inibidores CYP1A2 potentes'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náuseas', 'Tontura'],
      graves: ['Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Fluvoxamina', gravidade: 'contraindicada', efeito: 'Aumenta muito níveis de agomelatina', conduta: 'Contraindicado' },
      { medicamento: 'Ciprofloxacino', gravidade: 'grave', efeito: 'Inibe CYP1A2', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['Transaminases: basal, 3, 6, 12 e 24 semanas'],
    doencasRelacionadas: ['depressao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'vortioxetina',
    nomeGenerico: 'Vortioxetina',
    nomesComerciais: ['Brintellix'],
    atcCode: 'N06AX26',
    classeTerapeutica: 'antidepressivo',
    subclasse: 'multimodal',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
    ],
    indicacoes: ['Depressão maior', 'Déficit cognitivo associado à depressão'],
    mecanismoAcao: 'Inibe recaptação de serotonina + múltiplas ações em receptores 5-HT',
    posologias: [
      {
        indicacao: 'Depressão',
        adultos: { dose: '10-20mg', frequencia: '1x/dia', doseMaxima: '20mg/dia', observacoes: 'Idosos: iniciar 5mg' },
      }
    ],
    contraindicacoes: ['IMAO'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Cefaleia', 'Tontura', 'Constipação'],
      graves: ['Síndrome serotoninérgica', 'Sangramento', 'Hiponatremia']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Aguardar 14 dias' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['depressao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];
