/**
 * MEDICAMENTOS DIVERSOS FINAL - DARWIN-MFC
 * =========================================
 *
 * Complemento para atingir 600 medicamentos
 * Neurologia, nefrologia, GI, vitaminas, dor
 * ~130 medicamentos
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosDiversosFinal: Partial<Medicamento>[] = [
  // Neurologia - Parkinson
  {
    id: 'levodopa-carbidopa',
    nomeGenerico: 'Levodopa + Carbidopa',
    nomesComerciais: ['Sinemet', 'Parkidopa'],
    atcCode: 'N04BA02',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'precursor_dopamina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250/25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100/25mg', disponivelSUS: true },
    ],
    indicacoes: ['Doença de Parkinson'],
    mecanismoAcao: 'Levodopa é convertida em dopamina; carbidopa inibe DDC periférica',
    posologias: [
      {
        indicacao: 'Parkinson',
        adultos: { dose: '100/25mg', frequencia: '3x/dia, aumentar gradualmente', doseMaxima: '800mg levodopa/dia' },
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'IMAO não seletivo', 'Melanoma'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Discinesias', 'Hipotensão ortostática', 'Alucinações'],
      graves: ['Wearing-off', 'On-off', 'Síndrome neuroléptica maligna', 'Psicose']
    },
    interacoes: [
      { medicamento: 'IMAO não seletivo', gravidade: 'contraindicada', efeito: 'Crise hipertensiva', conduta: 'Aguardar 14 dias' },
      { medicamento: 'Antipsicóticos', gravidade: 'grave', efeito: 'Antagonismo', conduta: 'Evitar típicos; usar quetiapina/clozapina' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar - inibe lactação' },
    doencasRelacionadas: ['doenca-parkinson'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'pramipexol',
    nomeGenerico: 'Pramipexol',
    nomesComerciais: ['Mirapex', 'Sifrol'],
    atcCode: 'N04BC05',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'agonista_dopaminergico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: true },
    ],
    indicacoes: ['Doença de Parkinson', 'Síndrome das pernas inquietas'],
    mecanismoAcao: 'Agonista D2/D3 dopaminérgico não ergolínico',
    posologias: [
      {
        indicacao: 'Parkinson',
        adultos: { dose: '0,125mg 3x/dia inicial, titular até 1,5-4,5mg/dia', frequencia: '3x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Tontura', 'Sonolência', 'Edema periférico'],
      graves: ['Ataques de sono', 'Transtorno de controle de impulsos', 'Psicose']
    },
    interacoes: [
      { medicamento: 'Antipsicóticos', gravidade: 'grave', efeito: 'Antagonismo', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Inibe lactação' },
    ajusteDoseRenal: [
      { tfg: '30-50', ajuste: 'Iniciar 0,125mg 2x/dia' },
      { tfg: '<30', ajuste: 'Iniciar 0,125mg 1x/dia' },
    ],
    doencasRelacionadas: ['doenca-parkinson', 'sindrome-pernas-inquietas'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'rotigotina',
    nomeGenerico: 'Rotigotina',
    nomesComerciais: ['Neupro'],
    atcCode: 'N04BC09',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'agonista_dopaminergico',
    rename: false,
    apresentacoes: [
      { forma: 'adesivo', concentracao: '2mg/24h', disponivelSUS: false },
      { forma: 'adesivo', concentracao: '4mg/24h', disponivelSUS: false },
      { forma: 'adesivo', concentracao: '6mg/24h', disponivelSUS: false },
      { forma: 'adesivo', concentracao: '8mg/24h', disponivelSUS: false },
    ],
    indicacoes: ['Doença de Parkinson', 'Síndrome das pernas inquietas'],
    mecanismoAcao: 'Agonista dopaminérgico transdérmico',
    posologias: [
      {
        indicacao: 'Parkinson',
        adultos: { dose: '2mg/24h inicial, aumentar semanalmente', frequencia: 'Adesivo 1x/dia', doseMaxima: '16mg/24h' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a sulfitos'],
    efeitosAdversos: {
      comuns: ['Reações no local de aplicação', 'Náuseas', 'Sonolência'],
      graves: ['Transtorno de controle de impulsos', 'Psicose']
    },
    interacoes: [
      { medicamento: 'Antipsicóticos', gravidade: 'grave', efeito: 'Antagonismo', conduta: 'Evitar típicos' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Inibe lactação' },
    doencasRelacionadas: ['doenca-parkinson'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'selegilina',
    nomeGenerico: 'Selegilina',
    nomesComerciais: ['Niar', 'Jumexil'],
    atcCode: 'N04BD01',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'imao_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
    ],
    indicacoes: ['Doença de Parkinson (adjuvante)'],
    mecanismoAcao: 'Inibidor seletivo MAO-B; aumenta dopamina no estriado',
    posologias: [
      {
        indicacao: 'Parkinson',
        adultos: { dose: '5mg', frequencia: '2x/dia (café e almoço)', doseMaxima: '10mg/dia' },
      }
    ],
    contraindicacoes: ['Uso de petidina', 'IMAO não seletivo', 'ISRS (alguns)'],
    efeitosAdversos: {
      comuns: ['Insônia', 'Náuseas', 'Cefaleia'],
      graves: ['Síndrome serotoninérgica (com serotoninérgicos)', 'Crise hipertensiva']
    },
    interacoes: [
      { medicamento: 'Petidina', gravidade: 'contraindicada', efeito: 'Síndrome serotoninérgica', conduta: 'Contraindicado' },
      { medicamento: 'Tramadol', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['doenca-parkinson'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'rasagilina',
    nomeGenerico: 'Rasagilina',
    nomesComerciais: ['Azilect'],
    atcCode: 'N04BD02',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'imao_b',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
    ],
    indicacoes: ['Doença de Parkinson (monoterapia ou adjuvante)'],
    mecanismoAcao: 'Inibidor irreversível seletivo MAO-B',
    posologias: [
      {
        indicacao: 'Parkinson',
        adultos: { dose: '1mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Uso de outros IMAO', 'Petidina'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Artralgia', 'Discinesia (com levodopa)'],
      graves: ['Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'ISRS/ISRSN', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Evitar ou usar com cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['doenca-parkinson'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'entacapona',
    nomeGenerico: 'Entacapona',
    nomesComerciais: ['Comtan'],
    atcCode: 'N04BX02',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'inibidor_comt',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
    ],
    indicacoes: ['Doença de Parkinson com flutuações (adjuvante a levodopa)'],
    mecanismoAcao: 'Inibe COMT; aumenta biodisponibilidade de levodopa',
    posologias: [
      {
        indicacao: 'Parkinson',
        adultos: { dose: '200mg', frequencia: 'Com cada dose de levodopa', doseMaxima: '2000mg/dia' },
      }
    ],
    contraindicacoes: ['Hepatopatia', 'Feocromocitoma', 'IMAO não seletivo'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Discinesias', 'Urina alaranjada', 'Náuseas'],
      graves: ['Hepatotoxicidade', 'Síndrome neuroléptica maligna']
    },
    interacoes: [
      { medicamento: 'IMAO não seletivo', gravidade: 'grave', efeito: 'Potenciação catecolaminérgica', conduta: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Função hepática'],
    doencasRelacionadas: ['doenca-parkinson'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'amantadina',
    nomeGenerico: 'Amantadina',
    nomesComerciais: ['Mantidan', 'Symmetrel'],
    atcCode: 'N04BB01',
    classeTerapeutica: 'antiparkinsoniano',
    subclasse: 'antagonista_nmda',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['Parkinson (monoterapia inicial ou adjuvante)', 'Discinesias induzidas por levodopa', 'Influenza A (antiviral)'],
    mecanismoAcao: 'Antagonista NMDA; liberação de dopamina; anticolinérgico leve',
    posologias: [
      {
        indicacao: 'Parkinson',
        adultos: { dose: '100mg', frequencia: '1-2x/dia', doseMaxima: '300mg/dia' },
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'Epilepsia não controlada'],
    efeitosAdversos: {
      comuns: ['Livedo reticularis', 'Edema MMII', 'Insônia', 'Alucinações'],
      graves: ['Psicose', 'Convulsões', 'Síndrome neuroléptica maligna na retirada']
    },
    interacoes: [
      { medicamento: 'Anticolinérgicos', gravidade: 'moderada', efeito: 'Efeitos anticolinérgicos aditivos', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    ajusteDoseRenal: [
      { tfg: '30-50', ajuste: '200mg em dias alternados' },
      { tfg: '15-30', ajuste: '100mg em dias alternados' },
      { tfg: '<15', ajuste: '200mg a cada 7 dias' },
    ],
    doencasRelacionadas: ['doenca-parkinson'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Neurologia - Epilepsia adicional
  {
    id: 'lacosamida',
    nomeGenerico: 'Lacosamida',
    nomesComerciais: ['Vimpat'],
    atcCode: 'N03AX18',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'bloqueador_canal_sodio',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: false },
    ],
    indicacoes: ['Epilepsia focal (monoterapia ou adjuvante)'],
    mecanismoAcao: 'Potencializa inativação lenta de canais de sódio',
    posologias: [
      {
        indicacao: 'Epilepsia',
        adultos: { dose: '100-400mg', frequencia: 'Dividido 2x/dia', doseMaxima: '400mg/dia' },
      }
    ],
    contraindicacoes: ['BAV 2º/3º grau'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Diplopia', 'Cefaleia', 'Náuseas'],
      graves: ['Bloqueio AV', 'Fibrilação atrial', 'Ideação suicida', 'DRESS']
    },
    interacoes: [
      { medicamento: 'Drogas que prolongam PR', gravidade: 'moderada', efeito: 'Bloqueio AV', conduta: 'ECG de controle' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['epilepsia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'perampanel',
    nomeGenerico: 'Perampanel',
    nomesComerciais: ['Fycompa'],
    atcCode: 'N03AX22',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'antagonista_ampa',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '8mg', disponivelSUS: false },
    ],
    indicacoes: ['Epilepsia focal', 'Crises tônico-clônicas generalizadas'],
    mecanismoAcao: 'Antagonista não competitivo de receptores AMPA',
    posologias: [
      {
        indicacao: 'Epilepsia',
        adultos: { dose: '2mg ao deitar, aumentar a cada 2 semanas', frequencia: '1x/dia', doseMaxima: '12mg/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Sonolência', 'Irritabilidade', 'Ataxia'],
      graves: ['Agressividade', 'Hostilidade', 'Ideação suicida/homicida']
    },
    interacoes: [
      { medicamento: 'Indutores CYP3A4', gravidade: 'moderada', efeito: 'Reduz níveis', conduta: 'Pode precisar dose maior' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['epilepsia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'brivaracetam',
    nomeGenerico: 'Brivaracetam',
    nomesComerciais: ['Briviact'],
    atcCode: 'N03AX23',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'ligante_sv2a',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false },
    ],
    indicacoes: ['Epilepsia focal (adjuvante)'],
    mecanismoAcao: 'Liga-se a SV2A com alta afinidade (mais seletivo que levetiracetam)',
    posologias: [
      {
        indicacao: 'Epilepsia',
        adultos: { dose: '50-200mg', frequencia: 'Dividido 2x/dia', doseMaxima: '200mg/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Tontura', 'Fadiga'],
      graves: ['Psicose', 'Ideação suicida']
    },
    interacoes: [
      { medicamento: 'Rifampicina', gravidade: 'moderada', efeito: 'Reduz níveis', conduta: 'Aumentar dose' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados limitados' },
    doencasRelacionadas: ['epilepsia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Neurologia - Enxaqueca
  {
    id: 'sumatriptano',
    nomeGenerico: 'Sumatriptano',
    nomesComerciais: ['Sumax', 'Imigran'],
    atcCode: 'N02CC01',
    classeTerapeutica: 'antienxaqueca',
    subclasse: 'triptano',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '6mg', disponivelSUS: false },
      { forma: 'spray_nasal', concentracao: '20mg', disponivelSUS: false },
    ],
    indicacoes: ['Enxaqueca aguda', 'Cefaleia em salvas'],
    mecanismoAcao: 'Agonista seletivo 5-HT1B/1D; vasoconstrição craniana',
    posologias: [
      {
        indicacao: 'Enxaqueca',
        adultos: { dose: '50-100mg VO', frequencia: 'Pode repetir após 2h', doseMaxima: '200mg/dia VO' },
      }
    ],
    contraindicacoes: ['DAC', 'AVC/AIT prévio', 'HAS não controlada', 'Enxaqueca hemiplégica/basilar'],
    efeitosAdversos: {
      comuns: ['Parestesias', 'Sensação de peso/aperto', 'Tontura', 'Náuseas'],
      graves: ['Espasmo coronário', 'Arritmias', 'Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'Ergotamina', gravidade: 'contraindicada', efeito: 'Vasoespasmo prolongado', conduta: 'Separar em 24h' },
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Aumento de sumatriptano', conduta: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Descartar leite por 12h após dose' },
    doencasRelacionadas: ['enxaqueca'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'rizatriptano',
    nomeGenerico: 'Rizatriptano',
    nomesComerciais: ['Maxalt'],
    atcCode: 'N02CC04',
    classeTerapeutica: 'antienxaqueca',
    subclasse: 'triptano',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido_orodispersivel', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: ['Enxaqueca aguda'],
    mecanismoAcao: 'Agonista 5-HT1B/1D; início de ação rápido',
    posologias: [
      {
        indicacao: 'Enxaqueca',
        adultos: { dose: '10mg', frequencia: 'Pode repetir após 2h', doseMaxima: '30mg/dia' },
      }
    ],
    contraindicacoes: ['DAC', 'HAS não controlada', 'Uso de propranolol'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Sonolência', 'Parestesias'],
      graves: ['Isquemia miocárdica']
    },
    interacoes: [
      { medicamento: 'Propranolol', gravidade: 'grave', efeito: 'Aumenta níveis de rizatriptano', conduta: 'Reduzir rizatriptano para 5mg' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Descartar leite por 24h' },
    doencasRelacionadas: ['enxaqueca'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'zolmitriptano',
    nomeGenerico: 'Zolmitriptano',
    nomesComerciais: ['Zomig'],
    atcCode: 'N02CC03',
    classeTerapeutica: 'antienxaqueca',
    subclasse: 'triptano',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: false },
      { forma: 'spray_nasal', concentracao: '5mg', disponivelSUS: false },
    ],
    indicacoes: ['Enxaqueca aguda'],
    mecanismoAcao: 'Agonista 5-HT1B/1D',
    posologias: [
      {
        indicacao: 'Enxaqueca',
        adultos: { dose: '2,5mg', frequencia: 'Pode repetir após 2h', doseMaxima: '10mg/dia' },
      }
    ],
    contraindicacoes: ['DAC', 'Síndrome de Wolff-Parkinson-White', 'HAS não controlada'],
    efeitosAdversos: {
      comuns: ['Parestesias', 'Sensação de calor', 'Mialgia'],
      graves: ['Isquemia cardíaca', 'Arritmias']
    },
    interacoes: [
      { medicamento: 'Inibidores MAO-A', gravidade: 'grave', efeito: 'Aumenta níveis', conduta: 'Máx 2,5mg/dia' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Descartar leite por 24h' },
    doencasRelacionadas: ['enxaqueca'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'topiramato-enxaqueca',
    nomeGenerico: 'Topiramato',
    nomesComerciais: ['Topamax', 'Amato'],
    atcCode: 'N03AX11',
    classeTerapeutica: 'anticonvulsivante',
    subclasse: 'multiplos_mecanismos',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
    ],
    indicacoes: ['Epilepsia', 'Profilaxia de enxaqueca', 'Obesidade (off-label)'],
    mecanismoAcao: 'Bloqueia canais de sódio e cálcio; potencializa GABA; inibe anidrase carbônica',
    posologias: [
      {
        indicacao: 'Profilaxia enxaqueca',
        adultos: { dose: '25mg ao deitar, aumentar até 100mg/dia', frequencia: 'Dividido 2x/dia', doseMaxima: '200mg/dia' },
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'Acidose metabólica'],
    efeitosAdversos: {
      comuns: ['Parestesias', 'Déficit cognitivo', 'Perda de peso', 'Nefrolitíase'],
      graves: ['Acidose metabólica', 'Glaucoma agudo', 'Oligoidrose/hipertermia', 'Fenda labiopalatina (gestação)']
    },
    interacoes: [
      { medicamento: 'Contraceptivos hormonais', gravidade: 'moderada', efeito: 'Reduz eficácia contraceptiva', conduta: 'Usar método adicional' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Compatível com monitorização' },
    doencasRelacionadas: ['epilepsia', 'enxaqueca'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'erenumabe',
    nomeGenerico: 'Erenumabe',
    nomesComerciais: ['Aimovig'],
    atcCode: 'N02CX07',
    classeTerapeutica: 'antienxaqueca',
    subclasse: 'anticorpo_cgrp',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '70mg/ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '140mg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Profilaxia de enxaqueca episódica ou crônica'],
    mecanismoAcao: 'Anticorpo monoclonal anti-receptor CGRP',
    posologias: [
      {
        indicacao: 'Profilaxia enxaqueca',
        adultos: { dose: '70-140mg', frequencia: 'SC 1x/mês' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Reações no local de injeção', 'Constipação', 'Espasmos musculares'],
      graves: ['Reações de hipersensibilidade']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados limitados' },
    doencasRelacionadas: ['enxaqueca'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'galcanezumabe',
    nomeGenerico: 'Galcanezumabe',
    nomesComerciais: ['Emgality'],
    atcCode: 'N02CX08',
    classeTerapeutica: 'antienxaqueca',
    subclasse: 'anticorpo_cgrp',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '120mg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Profilaxia de enxaqueca', 'Cefaleia em salvas episódica'],
    mecanismoAcao: 'Anticorpo monoclonal anti-CGRP',
    posologias: [
      {
        indicacao: 'Enxaqueca',
        adultos: { dose: '240mg ataque, depois 120mg', frequencia: 'SC 1x/mês' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Reação local', 'Constipação'],
      graves: ['Anafilaxia (raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados limitados' },
    doencasRelacionadas: ['enxaqueca'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Nefrologia
  {
    id: 'sevelamer',
    nomeGenerico: 'Sevelâmer',
    nomesComerciais: ['Renagel', 'Renvela'],
    atcCode: 'V03AE02',
    classeTerapeutica: 'quelante_fosfato',
    subclasse: 'resina',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '800mg', disponivelSUS: true },
    ],
    indicacoes: ['Hiperfosfatemia em DRC em diálise'],
    mecanismoAcao: 'Liga fósforo no TGI; reduz absorção',
    posologias: [
      {
        indicacao: 'Hiperfosfatemia',
        adultos: { dose: '800-1600mg', frequencia: '3x/dia com refeições', observacoes: 'Ajustar conforme fósforo sérico' },
      }
    ],
    contraindicacoes: ['Hipofosfatemia', 'Obstrução intestinal'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Vômitos', 'Constipação', 'Diarreia'],
      graves: ['Obstrução intestinal', 'Perfuração']
    },
    interacoes: [
      { medicamento: 'Levotiroxina', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar em 2h' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Não absorvido' },
    doencasRelacionadas: ['drc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'carbonato-calcio-quelante',
    nomeGenerico: 'Carbonato de Cálcio',
    nomesComerciais: ['Calcium Sandoz', 'Os-Cal'],
    atcCode: 'V03AE01',
    classeTerapeutica: 'quelante_fosfato',
    subclasse: 'calcio',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1250mg', disponivelSUS: true },
    ],
    indicacoes: ['Hiperfosfatemia em DRC', 'Suplementação de cálcio'],
    mecanismoAcao: 'Liga fósforo no TGI formando fosfato de cálcio insolúvel',
    posologias: [
      {
        indicacao: 'Hiperfosfatemia',
        adultos: { dose: '500-1000mg de Ca elementar', frequencia: 'Com refeições', doseMaxima: '1500mg Ca/dia' },
      }
    ],
    contraindicacoes: ['Hipercalcemia'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Distensão abdominal'],
      graves: ['Hipercalcemia', 'Calcificação vascular']
    },
    interacoes: [
      { medicamento: 'Levotiroxina', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar em 4h' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' },
    doencasRelacionadas: ['drc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'calcitriol',
    nomeGenerico: 'Calcitriol',
    nomesComerciais: ['Rocaltrol'],
    atcCode: 'A11CC04',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_d',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '0,25mcg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '0,50mcg', disponivelSUS: true },
    ],
    indicacoes: ['Hiperparatireoidismo secundário à DRC', 'Hipoparatireoidismo', 'Raquitismo'],
    mecanismoAcao: 'Forma ativa da vitamina D (1,25-dihidroxi-D3)',
    posologias: [
      {
        indicacao: 'Hiperparatireoidismo DRC',
        adultos: { dose: '0,25-1mcg', frequencia: '1x/dia ou em dias alternados' },
      }
    ],
    contraindicacoes: ['Hipercalcemia', 'Hipervitaminose D'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náuseas'],
      graves: ['Hipercalcemia', 'Nefrolitíase', 'Calcificação tecidual']
    },
    interacoes: [
      { medicamento: 'Tiazídicos', gravidade: 'moderada', efeito: 'Hipercalcemia', conduta: 'Monitorar cálcio' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível com monitorização' },
    monitorizacao: ['Cálcio sérico', 'Fósforo', 'PTH'],
    doencasRelacionadas: ['drc', 'hipoparatireoidismo'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'alfacalcidol',
    nomeGenerico: 'Alfacalcidol',
    nomesComerciais: ['One-Alpha'],
    atcCode: 'A11CC03',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_d',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '0,25mcg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '1mcg', disponivelSUS: true },
    ],
    indicacoes: ['Hiperparatireoidismo secundário', 'Osteodistrofia renal', 'Hipoparatireoidismo'],
    mecanismoAcao: 'Pró-vitamina D; convertida em calcitriol no fígado',
    posologias: [
      {
        indicacao: 'DRC',
        adultos: { dose: '0,25-1mcg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Hipercalcemia'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Cefaleia'],
      graves: ['Hipercalcemia']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['drc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'paricalcitol',
    nomeGenerico: 'Paricalcitol',
    nomesComerciais: ['Zemplar'],
    atcCode: 'H05BX02',
    classeTerapeutica: 'vitamina',
    subclasse: 'analogo_vitamina_d',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '1mcg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '2mcg', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '5mcg/ml', disponivelSUS: false },
    ],
    indicacoes: ['Hiperparatireoidismo secundário à DRC'],
    mecanismoAcao: 'Ativador seletivo do receptor de vitamina D; menos hipercalcêmico',
    posologias: [
      {
        indicacao: 'Hiperparatireoidismo',
        adultos: { dose: 'PTH/80 ou PTH/120 mcg', frequencia: '3x/semana IV ou diário VO' },
      }
    ],
    contraindicacoes: ['Hipercalcemia', 'Toxicidade vitamina D'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Edema'],
      graves: ['Hipercalcemia', 'Hiperfosfatemia']
    },
    interacoes: [
      { medicamento: 'Cetoconazol', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['drc', 'hiperparatireoidismo'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'cinacalcete',
    nomeGenerico: 'Cinacalcete',
    nomesComerciais: ['Mimpara', 'Sensipar'],
    atcCode: 'H05BX01',
    classeTerapeutica: 'antihiperparatireoideo',
    subclasse: 'calcimimetico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '90mg', disponivelSUS: true },
    ],
    indicacoes: ['Hiperparatireoidismo secundário à DRC em diálise', 'Hiperparatireoidismo primário', 'Carcinoma paratireóideo'],
    mecanismoAcao: 'Calcimimético; ativa receptor sensor de cálcio; reduz PTH',
    posologias: [
      {
        indicacao: 'HPTS em diálise',
        adultos: { dose: '30mg inicial, titular até controle', frequencia: '1x/dia', doseMaxima: '180mg/dia' },
      }
    ],
    contraindicacoes: ['Hipocalcemia'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Vômitos', 'Hipocalcemia'],
      graves: ['Hipocalcemia grave', 'Prolongamento QT', 'Convulsões']
    },
    interacoes: [
      { medicamento: 'Substratos CYP2D6', gravidade: 'moderada', efeito: 'Cinacalcete inibe CYP2D6', conduta: 'Ajustar dose de antidepressivos' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['Cálcio sérico semanal inicial', 'PTH mensal', 'Fósforo'],
    doencasRelacionadas: ['drc', 'hiperparatireoidismo'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'eritropoetina-alfa',
    nomeGenerico: 'Eritropoetina Alfa',
    nomesComerciais: ['Eprex', 'Eritromax'],
    atcCode: 'B03XA01',
    classeTerapeutica: 'antianemico',
    subclasse: 'estimulante_eritropoiese',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '2000UI/ml', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '4000UI/ml', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '10000UI/ml', disponivelSUS: true },
    ],
    indicacoes: ['Anemia da DRC', 'Anemia por quimioterapia', 'Anemia perioperatória'],
    mecanismoAcao: 'Glicoproteína recombinante; estimula eritropoiese medular',
    posologias: [
      {
        indicacao: 'Anemia DRC',
        adultos: { dose: '50-100 UI/kg', frequencia: '3x/semana SC ou IV', observacoes: 'Alvo Hb 10-11,5 g/dL' },
      }
    ],
    contraindicacoes: ['HAS não controlada', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Hipertensão', 'Cefaleia', 'Artralgia'],
      graves: ['Trombose', 'Aplasia pura série vermelha', 'AVC']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    monitorizacao: ['Hemoglobina', 'Ferro sérico', 'PA'],
    doencasRelacionadas: ['anemia', 'drc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Gastrointestinal adicional
  {
    id: 'vedolizumabe',
    nomeGenerico: 'Vedolizumabe',
    nomesComerciais: ['Entyvio'],
    atcCode: 'L04AA33',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_integrina',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '300mg', disponivelSUS: false },
    ],
    indicacoes: ['Colite ulcerativa moderada-grave', 'Doença de Crohn moderada-grave'],
    mecanismoAcao: 'Anticorpo anti-integrina α4β7; bloqueia migração de linfócitos ao intestino',
    posologias: [
      {
        indicacao: 'DII',
        adultos: { dose: '300mg', frequencia: 'IV semanas 0, 2, 6, depois a cada 8 semanas' },
      }
    ],
    contraindicacoes: ['Infecção ativa grave', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Nasofaringite', 'Artralgia'],
      graves: ['Reações infusionais', 'Leucoencefalopatia (raro)']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Resposta reduzida', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados limitados' },
    doencasRelacionadas: ['doenca-crohn', 'colite-ulcerativa'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ursodiol',
    nomeGenerico: 'Ácido Ursodesoxicólico',
    nomesComerciais: ['Ursacol', 'Ursoalk'],
    atcCode: 'A05AA02',
    classeTerapeutica: 'hepatobiliar',
    subclasse: 'acido_biliar',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: true },
      { forma: 'capsula', concentracao: '300mg', disponivelSUS: true },
    ],
    indicacoes: ['Colangite biliar primária', 'Dissolução de cálculos colesterol', 'Esteatose hepática'],
    mecanismoAcao: 'Reduz toxicidade de ácidos biliares; efeito colerético; imunomodulador',
    posologias: [
      {
        indicacao: 'Colangite biliar primária',
        adultos: { dose: '13-15mg/kg/dia', frequencia: 'Dividido 2-4x/dia com refeições' },
      }
    ],
    contraindicacoes: ['Obstrução biliar completa', 'Cálculos calcificados'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náuseas'],
      graves: []
    },
    interacoes: [
      { medicamento: 'Colestiramina', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar em 2h' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['colangite-biliar-primaria', 'colelitiase'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'lactulose',
    nomeGenerico: 'Lactulose',
    nomesComerciais: ['Lactulona', 'Duphalac'],
    atcCode: 'A06AD11',
    classeTerapeutica: 'laxante',
    subclasse: 'osmotico',
    rename: true,
    apresentacoes: [
      { forma: 'solucao_oral', concentracao: '667mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Constipação crônica', 'Encefalopatia hepática', 'Preparo colônico'],
    mecanismoAcao: 'Dissacarídeo sintético; osmótico; acidifica cólon (NH3→NH4+)',
    posologias: [
      {
        indicacao: 'Constipação',
        adultos: { dose: '15-30ml', frequencia: '1-2x/dia' },
      },
      {
        indicacao: 'Encefalopatia hepática',
        adultos: { dose: '30-45ml', frequencia: '3-4x/dia até 2-3 evacuações pastosas/dia' },
      }
    ],
    contraindicacoes: ['Galactosemia', 'Obstrução intestinal'],
    efeitosAdversos: {
      comuns: ['Flatulência', 'Cólicas', 'Diarreia (dose excessiva)'],
      graves: ['Desidratação', 'Hipernatremia']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Não absorvida' },
    doencasRelacionadas: ['constipacao', 'encefalopatia-hepatica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'polietilenoglicol',
    nomeGenerico: 'Polietilenoglicol 3350',
    nomesComerciais: ['Muvinlax', 'Miralax'],
    atcCode: 'A06AD65',
    classeTerapeutica: 'laxante',
    subclasse: 'osmotico',
    rename: false,
    apresentacoes: [
      { forma: 'po_oral', concentracao: '17g/envelope', disponivelSUS: false },
    ],
    indicacoes: ['Constipação crônica'],
    mecanismoAcao: 'Polímero osmótico; retém água no lúmen intestinal',
    posologias: [
      {
        indicacao: 'Constipação',
        adultos: { dose: '17g', frequencia: '1x/dia em água', observacoes: 'Pode ajustar conforme resposta' },
        pediatrico: { dose: '0,5-1,5g/kg/dia', frequencia: '1-2x/dia', idadeMinima: '2 anos' },
      }
    ],
    contraindicacoes: ['Obstrução intestinal', 'Perfuração'],
    efeitosAdversos: {
      comuns: ['Distensão abdominal', 'Flatulência', 'Náuseas'],
      graves: []
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Não absorvido' },
    doencasRelacionadas: ['constipacao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'bisacodil',
    nomeGenerico: 'Bisacodil',
    nomesComerciais: ['Dulcolax', 'Lactopurga'],
    atcCode: 'A06AB02',
    classeTerapeutica: 'laxante',
    subclasse: 'estimulante',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'supositorio', concentracao: '10mg', disponivelSUS: true },
    ],
    indicacoes: ['Constipação ocasional', 'Preparo intestinal'],
    mecanismoAcao: 'Estimula plexo mioentérico; aumenta secreção e motilidade colônica',
    posologias: [
      {
        indicacao: 'Constipação',
        adultos: { dose: '5-10mg VO ou 10mg retal', frequencia: 'Ao deitar ou quando necessário' },
      }
    ],
    contraindicacoes: ['Obstrução intestinal', 'Dor abdominal aguda', 'Apendicite'],
    efeitosAdversos: {
      comuns: ['Cólicas', 'Diarreia'],
      graves: ['Hipocalemia (uso crônico)', 'Dependência']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['constipacao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'linaclotida',
    nomeGenerico: 'Linaclotida',
    nomesComerciais: ['Linzess', 'Constella'],
    atcCode: 'A06AX04',
    classeTerapeutica: 'laxante',
    subclasse: 'agonista_gc_c',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '145mcg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '290mcg', disponivelSUS: false },
    ],
    indicacoes: ['SII com constipação', 'Constipação idiopática crônica'],
    mecanismoAcao: 'Agonista guanilato ciclase C; aumenta secreção de cloreto e líquido intestinal',
    posologias: [
      {
        indicacao: 'SII-C',
        adultos: { dose: '290mcg', frequencia: '1x/dia em jejum', observacoes: '30min antes do café' },
      }
    ],
    contraindicacoes: ['Obstrução intestinal mecânica', 'Crianças <6 anos'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Dor abdominal', 'Flatulência'],
      graves: ['Diarreia grave', 'Desidratação']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Não absorvida sistemicamente' },
    doencasRelacionadas: ['sindrome-intestino-irritavel', 'constipacao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Vitaminas e suplementos
  {
    id: 'cianocobalamina',
    nomeGenerico: 'Cianocobalamina (Vitamina B12)',
    nomesComerciais: ['Rubranova', 'Cronobê'],
    atcCode: 'B03BA01',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1000mcg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '1000mcg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Deficiência de B12', 'Anemia perniciosa', 'Neuropatia por B12'],
    mecanismoAcao: 'Coenzima essencial para síntese de DNA e mielina',
    posologias: [
      {
        indicacao: 'Deficiência B12',
        adultos: { dose: '1000mcg IM diário x 7 dias, semanal x 4, depois mensal', frequencia: 'Ver esquema' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Doença de Leber'],
    efeitosAdversos: {
      comuns: ['Dor local (IM)', 'Diarreia'],
      graves: ['Anafilaxia (raro)', 'Hipocalemia transitória']
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Essencial' },
    doencasRelacionadas: ['anemia', 'neuropatia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'tiamina',
    nomeGenerico: 'Tiamina (Vitamina B1)',
    nomesComerciais: ['Benerva', 'Berin'],
    atcCode: 'A11DA01',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '100mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Deficiência de tiamina', 'Síndrome de Wernicke-Korsakoff', 'Beribéri', 'Alcoolismo'],
    mecanismoAcao: 'Coenzima no metabolismo de carboidratos',
    posologias: [
      {
        indicacao: 'Wernicke-Korsakoff',
        adultos: { dose: '500mg IV', frequencia: '3x/dia x 3 dias, depois 250mg/dia' },
      },
      {
        indicacao: 'Profilaxia em alcoolistas',
        adultos: { dose: '100mg', frequencia: '1x/dia VO ou IM' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas (VO)'],
      graves: ['Anafilaxia (IV raro)']
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Essencial' },
    doencasRelacionadas: ['alcoolismo', 'wernicke-korsakoff'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'piridoxina',
    nomeGenerico: 'Piridoxina (Vitamina B6)',
    nomesComerciais: ['Adermina', 'Adevit'],
    atcCode: 'A11HA02',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
    ],
    indicacoes: ['Deficiência de B6', 'Profilaxia de neuropatia por isoniazida', 'Náuseas da gestação', 'Anemia sideroblástica'],
    mecanismoAcao: 'Coenzima em metabolismo de aminoácidos e neurotransmissores',
    posologias: [
      {
        indicacao: 'Profilaxia neuropatia isoniazida',
        adultos: { dose: '25-50mg', frequencia: '1x/dia' },
      },
      {
        indicacao: 'Náuseas gestação',
        adultos: { dose: '10-25mg', frequencia: '3-4x/dia', doseMaxima: '200mg/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas'],
      graves: ['Neuropatia sensitiva (doses >200mg/dia por meses)']
    },
    interacoes: [
      { medicamento: 'Levodopa', gravidade: 'grave', efeito: 'Reduz efeito de levodopa isolada', conduta: 'Não interfere com levodopa+carbidopa' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['deficiencia-vitaminica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'acido-folico',
    nomeGenerico: 'Ácido Fólico',
    nomesComerciais: ['Folacin', 'Folin'],
    atcCode: 'B03BB01',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
    ],
    indicacoes: ['Deficiência de folato', 'Prevenção DTN na gestação', 'Anemia megaloblástica', 'Suplementação com metotrexato'],
    mecanismoAcao: 'Essencial para síntese de DNA e divisão celular',
    posologias: [
      {
        indicacao: 'Prevenção DTN',
        adultos: { dose: '0,4-4mg', frequencia: '1x/dia', observacoes: 'Iniciar 1-3 meses antes da concepção' },
      },
      {
        indicacao: 'Suplementação MTX',
        adultos: { dose: '5mg', frequencia: '1x/semana (24-48h após MTX)' },
      }
    ],
    contraindicacoes: ['Anemia perniciosa não diagnosticada (pode mascarar)'],
    efeitosAdversos: {
      comuns: ['Geralmente bem tolerado'],
      graves: []
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'leve', efeito: 'Reduz toxicidade do MTX', conduta: 'Efeito desejado' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Essencial' },
    doencasRelacionadas: ['anemia', 'gestacao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'colecalciferol',
    nomeGenerico: 'Colecalciferol (Vitamina D3)',
    nomesComerciais: ['Addera D3', 'Depura'],
    atcCode: 'A11CC05',
    classeTerapeutica: 'vitamina',
    subclasse: 'vitamina_d',
    rename: true,
    apresentacoes: [
      { forma: 'gotas', concentracao: '200UI/gota', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '1000UI', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '7000UI', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50000UI', disponivelSUS: true },
    ],
    indicacoes: ['Deficiência/insuficiência de vitamina D', 'Osteoporose', 'Prevenção de raquitismo'],
    mecanismoAcao: 'Pró-hormônio; convertido em 25-OH-D e 1,25-OH-D; regula cálcio',
    posologias: [
      {
        indicacao: 'Reposição (deficiência)',
        adultos: { dose: '50000UI/semana x 8 semanas, depois 1000-2000UI/dia', frequencia: 'Ver esquema' },
      },
      {
        indicacao: 'Manutenção',
        adultos: { dose: '1000-2000UI', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Hipercalcemia', 'Hipervitaminose D'],
    efeitosAdversos: {
      comuns: ['Geralmente bem tolerado'],
      graves: ['Hipercalcemia (dose excessiva)', 'Nefrolitíase']
    },
    interacoes: [
      { medicamento: 'Tiazídicos', gravidade: 'moderada', efeito: 'Hipercalcemia', conduta: 'Monitorar cálcio' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['25-OH-vitamina D', 'Cálcio sérico'],
    doencasRelacionadas: ['osteoporose', 'deficiencia-vitamina-d'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ferro-sulfato',
    nomeGenerico: 'Sulfato Ferroso',
    nomesComerciais: ['Fer-In-Sol', 'Noripurum oral'],
    atcCode: 'B03AA07',
    classeTerapeutica: 'antianemico',
    subclasse: 'ferro_oral',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg Fe elementar', disponivelSUS: true },
      { forma: 'gotas', concentracao: '25mg Fe/ml', disponivelSUS: true },
    ],
    indicacoes: ['Anemia ferropriva', 'Deficiência de ferro'],
    mecanismoAcao: 'Fornece ferro elementar para síntese de hemoglobina',
    posologias: [
      {
        indicacao: 'Anemia ferropriva',
        adultos: { dose: '100-200mg Fe elementar/dia', frequencia: 'Dividido 2-3x/dia', observacoes: 'Tomar em jejum ou com vitamina C' },
        pediatrico: { dose: '3-6mg Fe/kg/dia', frequencia: 'Dividido 2-3x/dia' },
      }
    ],
    contraindicacoes: ['Hemocromatose', 'Anemia não ferropriva', 'Transfusões repetidas'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Náuseas', 'Dor epigástrica', 'Fezes escuras'],
      graves: ['Toxicidade por ferro (overdose)']
    },
    interacoes: [
      { medicamento: 'Antiácidos', gravidade: 'moderada', efeito: 'Reduz absorção de ferro', conduta: 'Separar em 2h' },
      { medicamento: 'Levotiroxina', gravidade: 'moderada', efeito: 'Reduz absorção de T4', conduta: 'Separar em 4h' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['anemia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ferro-parenteral',
    nomeGenerico: 'Ferro Sacarato',
    nomesComerciais: ['Venofer', 'Noripurum IV'],
    atcCode: 'B03AC02',
    classeTerapeutica: 'antianemico',
    subclasse: 'ferro_parenteral',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '20mg Fe/ml', disponivelSUS: true },
    ],
    indicacoes: ['Anemia ferropriva refratária a VO', 'Intolerância a ferro oral', 'DRC', 'Pós-bariátrica'],
    mecanismoAcao: 'Complexo ferro-sacarose; libera ferro para eritropoiese',
    posologias: [
      {
        indicacao: 'Anemia ferropriva',
        adultos: { dose: '100-200mg Fe', frequencia: 'IV 1-3x/semana', doseMaxima: '200mg/dose', observacoes: 'Dose total calculada pela fórmula de Ganzoni' },
      }
    ],
    contraindicacoes: ['Sobrecarga de ferro', 'Anemia não ferropriva', 'Primeiro trimestre gestação'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Náuseas', 'Hipotensão (infusão rápida)'],
      graves: ['Reação anafilactoide', 'Hipotensão grave']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Ferro sérico', 'Ferritina', 'Saturação transferrina'],
    doencasRelacionadas: ['anemia', 'drc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'zinco-sulfato',
    nomeGenerico: 'Sulfato de Zinco',
    nomesComerciais: ['Zinkid', 'Galzin'],
    atcCode: 'A12CB01',
    classeTerapeutica: 'suplemento',
    subclasse: 'mineral',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '20mg Zn', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '10mg/5ml', disponivelSUS: true },
    ],
    indicacoes: ['Deficiência de zinco', 'Doença de Wilson', 'Diarreia aguda em crianças', 'Cicatrização'],
    mecanismoAcao: 'Cofator enzimático; imunomodulador; na Wilson: induz metalotioneína intestinal',
    posologias: [
      {
        indicacao: 'Diarreia aguda pediátrica',
        adultos: { dose: 'Não aplicável', frequencia: '' },
        pediatrico: { dose: '10-20mg', frequencia: '1x/dia x 10-14 dias', idadeMinima: '6 meses' },
      },
      {
        indicacao: 'Doença de Wilson',
        adultos: { dose: '150mg Zn/dia', frequencia: 'Dividido 3x entre refeições' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Gosto metálico'],
      graves: ['Deficiência de cobre (uso prolongado)']
    },
    interacoes: [
      { medicamento: 'Quinolonas', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar em 2h' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['doenca-wilson', 'diarreia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'potassio-cloreto-oral',
    nomeGenerico: 'Cloreto de Potássio',
    nomesComerciais: ['Slow-K', 'Kalium'],
    atcCode: 'A12BA01',
    classeTerapeutica: 'suplemento',
    subclasse: 'eletrolito',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '600mg (8mEq K)', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '6%', disponivelSUS: true },
    ],
    indicacoes: ['Hipocalemia', 'Prevenção de hipocalemia (diuréticos)'],
    mecanismoAcao: 'Reposição do potássio corporal',
    posologias: [
      {
        indicacao: 'Hipocalemia leve-moderada',
        adultos: { dose: '40-100mEq/dia', frequencia: 'Dividido 2-4x/dia com refeições' },
      }
    ],
    contraindicacoes: ['Hipercalemia', 'DRC avançada', 'Uso de poupadores de K'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Diarreia', 'Desconforto abdominal'],
      graves: ['Hipercalemia', 'Ulceração GI']
    },
    interacoes: [
      { medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'Hipercalemia', conduta: 'Monitorar K' },
      { medicamento: 'Espironolactona', gravidade: 'grave', efeito: 'Hipercalemia', conduta: 'Evitar associação ou monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    monitorizacao: ['Potássio sérico', 'Função renal'],
    doencasRelacionadas: ['hipocalemia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'magnesio-sulfato-oral',
    nomeGenerico: 'Óxido de Magnésio',
    nomesComerciais: ['Mag 2', 'Magnésia Bisurada'],
    atcCode: 'A12CC10',
    classeTerapeutica: 'suplemento',
    subclasse: 'mineral',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg Mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '250mg Mg', disponivelSUS: false },
    ],
    indicacoes: ['Deficiência de magnésio', 'Cãibras musculares', 'Constipação'],
    mecanismoAcao: 'Reposição de magnésio; efeito osmótico intestinal',
    posologias: [
      {
        indicacao: 'Deficiência Mg',
        adultos: { dose: '200-400mg Mg elementar', frequencia: '1-2x/dia' },
      }
    ],
    contraindicacoes: ['DRC grave', 'Miastenia gravis'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Desconforto abdominal'],
      graves: ['Hipermagnesemia (DRC)']
    },
    interacoes: [
      { medicamento: 'Quinolonas', gravidade: 'moderada', efeito: 'Quelação', conduta: 'Separar em 2h' },
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['hipomagnesemia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];
