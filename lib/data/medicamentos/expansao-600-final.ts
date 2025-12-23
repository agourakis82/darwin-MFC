/**
 * EXPANSÃO 600 - DARWIN-MFC
 * ==========================
 *
 * Medicamentos finais para atingir 600+
 * ~50 medicamentos
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentos600Final: Partial<Medicamento>[] = [
  // Antipsicóticos adicionais
  {
    id: 'lurasidona',
    nomeGenerico: 'Lurasidona',
    nomesComerciais: ['Latuda'],
    atcCode: 'N05AE05',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '80mg', disponivelSUS: false },
    ],
    indicacoes: ['Esquizofrenia', 'Depressão bipolar'],
    mecanismoAcao: 'Antagonista D2/5-HT2A/5-HT7; agonista parcial 5-HT1A',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: { dose: '40-160mg', frequencia: '1x/dia com alimentos (350+ kcal)' },
      }
    ],
    contraindicacoes: ['Uso de indutores CYP3A4 potentes'],
    efeitosAdversos: {
      comuns: ['Acatisia', 'Sonolência', 'Náuseas', 'Parkinsonismo'],
      graves: ['SNM', 'Discinesia tardia']
    },
    interacoes: [
      { medicamento: 'Indutores CYP3A4', gravidade: 'contraindicada', efeito: 'Reduz níveis', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados limitados' },
    doencasRelacionadas: ['esquizofrenia', 'tab'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'cariprazina',
    nomeGenerico: 'Cariprazina',
    nomesComerciais: ['Vraylar'],
    atcCode: 'N05AX15',
    classeTerapeutica: 'antipsicotico',
    subclasse: 'antipsicotico_atipico',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '1,5mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '3mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '6mg', disponivelSUS: false },
    ],
    indicacoes: ['Esquizofrenia', 'Mania bipolar', 'Depressão bipolar'],
    mecanismoAcao: 'Agonista parcial D2/D3; alta afinidade por D3',
    posologias: [
      {
        indicacao: 'Esquizofrenia',
        adultos: { dose: '1,5-6mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Acatisia', 'SEP', 'Insônia', 'Náuseas'],
      graves: ['SNM', 'Discinesia tardia']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Reduzir dose' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['esquizofrenia', 'tab'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Relaxantes musculares
  {
    id: 'ciclobenzaprina',
    nomeGenerico: 'Ciclobenzaprina',
    nomesComerciais: ['Miosan', 'Flexeril'],
    atcCode: 'M03BX08',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'relaxante_central',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
    ],
    indicacoes: ['Espasmo muscular agudo', 'Dor lombar aguda', 'Cervicalgia'],
    mecanismoAcao: 'Relaxante muscular central; estrutura tricíclica',
    posologias: [
      {
        indicacao: 'Espasmo muscular',
        adultos: { dose: '5-10mg', frequencia: '3x/dia por até 2-3 semanas' },
      }
    ],
    contraindicacoes: ['Uso de IMAO', 'Arritmias', 'ICC', 'Hipertireoidismo'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Boca seca', 'Tontura', 'Fadiga'],
      graves: ['Arritmias', 'Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Toxicidade', conduta: 'Intervalo 14 dias' },
      { medicamento: 'Depressores SNC', gravidade: 'moderada', efeito: 'Sedação', conduta: 'Cautela' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados limitados' },
    doencasRelacionadas: ['lombalgia', 'espasmo-muscular'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'carisoprodol',
    nomeGenerico: 'Carisoprodol',
    nomesComerciais: ['Mioflex', 'Beserol'],
    atcCode: 'M03BA02',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'relaxante_central',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '350mg', disponivelSUS: false },
    ],
    indicacoes: ['Espasmo muscular agudo'],
    mecanismoAcao: 'Relaxante muscular central; metabolizado a meprobamato',
    posologias: [
      {
        indicacao: 'Espasmo muscular',
        adultos: { dose: '250-350mg', frequencia: '3x/dia e ao deitar, max 2-3 semanas' },
      }
    ],
    contraindicacoes: ['Porfiria', 'Hipersensibilidade a meprobamato'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Tontura', 'Cefaleia'],
      graves: ['Dependência', 'Síndrome de abstinência', 'Reações anafiláticas']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'grave', efeito: 'Sedação aditiva', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Metabolito concentra no leite' },
    orientacoesPaciente: ['Risco de dependência; uso máximo 2-3 semanas'],
    doencasRelacionadas: ['espasmo-muscular'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'orfenadrina',
    nomeGenerico: 'Orfenadrina',
    nomesComerciais: ['Norflex', 'Dorflex'],
    atcCode: 'M03BC01',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'relaxante_central',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true },
      { forma: 'injetavel_im', concentracao: '30mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Espasmo muscular', 'Dor musculoesquelética'],
    mecanismoAcao: 'Relaxante muscular; anticolinérgico; anti-histamínico',
    posologias: [
      {
        indicacao: 'Espasmo muscular',
        adultos: { dose: '100mg', frequencia: '12/12h VO ou 60mg IM 12/12h' },
      }
    ],
    contraindicacoes: ['Glaucoma', 'Miastenia gravis', 'Obstrução GI/urinária'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Sonolência', 'Tontura', 'Taquicardia'],
      graves: ['Retenção urinária', 'Confusão mental (idosos)', 'Arritmias']
    },
    interacoes: [
      { medicamento: 'Anticolinérgicos', gravidade: 'moderada', efeito: 'Efeito aditivo', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['espasmo-muscular'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'baclofeno',
    nomeGenerico: 'Baclofeno',
    nomesComerciais: ['Lioresal'],
    atcCode: 'M03BX01',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'agonista_gaba_b',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
    ],
    indicacoes: ['Espasticidade (AVC, EM, lesão medular)', 'Alcoolismo (off-label)'],
    mecanismoAcao: 'Agonista GABA-B; inibe reflexos mono e polissinápticos',
    posologias: [
      {
        indicacao: 'Espasticidade',
        adultos: { dose: '5mg 3x/dia inicial, aumentar gradualmente', frequencia: '3x/dia', doseMaxima: '80mg/dia' },
      }
    ],
    contraindicacoes: ['Porfiria', 'Epilepsia não controlada'],
    efeitosAdversos: {
      comuns: ['Sedação', 'Fraqueza', 'Náuseas', 'Tontura'],
      graves: ['Síndrome de abstinência (convulsões)', 'Depressão respiratória (overdose)']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'moderada', efeito: 'Sedação aditiva', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível com monitorização' },
    orientacoesPaciente: ['Não suspender abruptamente'],
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Iniciar 5mg/dia; aumentar com cautela' },
    ],
    doencasRelacionadas: ['espasticidade', 'esclerose-multipla'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'tizanidina',
    nomeGenerico: 'Tizanidina',
    nomesComerciais: ['Sirdalud'],
    atcCode: 'M03BX02',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'agonista_alfa2',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: false },
    ],
    indicacoes: ['Espasticidade', 'Espasmo muscular'],
    mecanismoAcao: 'Agonista alfa-2 adrenérgico central',
    posologias: [
      {
        indicacao: 'Espasticidade',
        adultos: { dose: '2-4mg', frequencia: '3x/dia', doseMaxima: '36mg/dia' },
      }
    ],
    contraindicacoes: ['Uso de inibidores CYP1A2 potentes', 'Hepatopatia grave'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Boca seca', 'Fadiga', 'Hipotensão'],
      graves: ['Hepatotoxicidade', 'Bradicardia', 'Hipotensão grave']
    },
    interacoes: [
      { medicamento: 'Ciprofloxacino', gravidade: 'contraindicada', efeito: 'Aumenta níveis 10x', conduta: 'Contraindicado' },
      { medicamento: 'Fluvoxamina', gravidade: 'contraindicada', efeito: 'Aumenta níveis 33x', conduta: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: ['TGO/TGP nos primeiros meses'],
    doencasRelacionadas: ['espasticidade'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Broncodilatadores adicionais
  {
    id: 'tiotrópio',
    nomeGenerico: 'Tiotrópio',
    nomesComerciais: ['Spiriva'],
    atcCode: 'R03BB04',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'anticolinergico_longa',
    rename: true,
    apresentacoes: [
      { forma: 'capsula_inalacao', concentracao: '18mcg', disponivelSUS: true },
      { forma: 'aerossol', concentracao: '2,5mcg/dose', disponivelSUS: true },
    ],
    indicacoes: ['DPOC (manutenção)', 'Asma (add-on)'],
    mecanismoAcao: 'Antagonista muscarínico de longa ação (LAMA)',
    posologias: [
      {
        indicacao: 'DPOC',
        adultos: { dose: '18mcg ou 5mcg (Respimat)', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a atropina'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Constipação', 'ITU', 'Faringite'],
      graves: ['Glaucoma (fechamento agudo)', 'Retenção urinária', 'Broncoespasmo paradoxal']
    },
    interacoes: [
      { medicamento: 'Outros anticolinérgicos', gravidade: 'moderada', efeito: 'Efeito aditivo', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' },
    doencasRelacionadas: ['dpoc', 'asma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ipratrópio',
    nomeGenerico: 'Ipratrópio',
    nomesComerciais: ['Atrovent'],
    atcCode: 'R03BB01',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'anticolinergico_curta',
    rename: true,
    apresentacoes: [
      { forma: 'aerossol', concentracao: '20mcg/dose', disponivelSUS: true },
      { forma: 'solucao_nebulizacao', concentracao: '0,25mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['DPOC (resgate)', 'Asma (resgate, adjuvante)', 'Broncoespasmo agudo'],
    mecanismoAcao: 'Antagonista muscarínico de curta ação (SAMA)',
    posologias: [
      {
        indicacao: 'Broncoespasmo',
        adultos: { dose: '40-80mcg (2-4 jatos)', frequencia: '3-4x/dia PRN' },
      },
      {
        indicacao: 'Nebulização',
        adultos: { dose: '0,5mg', frequencia: '6-8/8h PRN' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade a atropina'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Cefaleia', 'Tosse'],
      graves: ['Broncoespasmo paradoxal', 'Glaucoma']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['dpoc', 'asma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'formoterol',
    nomeGenerico: 'Formoterol',
    nomesComerciais: ['Foradil', 'Oxis'],
    atcCode: 'R03AC13',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'beta2_agonista_longa',
    rename: true,
    apresentacoes: [
      { forma: 'capsula_inalacao', concentracao: '12mcg', disponivelSUS: true },
      { forma: 'po_inalacao', concentracao: '6mcg/dose', disponivelSUS: true },
    ],
    indicacoes: ['DPOC (manutenção)', 'Asma (com CI)'],
    mecanismoAcao: 'Beta-2 agonista de longa ação (LABA); início rápido',
    posologias: [
      {
        indicacao: 'DPOC/Asma',
        adultos: { dose: '12mcg', frequencia: '12/12h' },
      }
    ],
    contraindicacoes: ['Asma sem CI', 'Taquiarritmias'],
    efeitosAdversos: {
      comuns: ['Tremor', 'Cefaleia', 'Palpitações', 'Cãibras'],
      graves: ['Taquiarritmias', 'Broncoespasmo paradoxal', 'Hipocalemia']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Usar beta-1 seletivo se necessário' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['dpoc', 'asma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'indacaterol',
    nomeGenerico: 'Indacaterol',
    nomesComerciais: ['Onbrize'],
    atcCode: 'R03AC18',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'beta2_agonista_longa',
    rename: false,
    apresentacoes: [
      { forma: 'capsula_inalacao', concentracao: '150mcg', disponivelSUS: false },
      { forma: 'capsula_inalacao', concentracao: '300mcg', disponivelSUS: false },
    ],
    indicacoes: ['DPOC (manutenção)'],
    mecanismoAcao: 'LABA ultra-longa ação (24h)',
    posologias: [
      {
        indicacao: 'DPOC',
        adultos: { dose: '150-300mcg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Asma'],
    efeitosAdversos: {
      comuns: ['Nasofaringite', 'Tosse', 'Cefaleia'],
      graves: ['Broncoespasmo paradoxal', 'Taquiarritmias']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['dpoc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Corticoides inalatórios
  {
    id: 'budesonida-inalatorio',
    nomeGenerico: 'Budesonida',
    nomesComerciais: ['Pulmicort', 'Busonid'],
    atcCode: 'R03BA02',
    classeTerapeutica: 'corticoide_inalatorio',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'po_inalacao', concentracao: '200mcg/dose', disponivelSUS: true },
      { forma: 'po_inalacao', concentracao: '400mcg/dose', disponivelSUS: true },
      { forma: 'suspensao_nebulizacao', concentracao: '0,25mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Asma (manutenção)', 'DPOC (com exacerbações frequentes)'],
    mecanismoAcao: 'Corticoide inalatório; anti-inflamatório local',
    posologias: [
      {
        indicacao: 'Asma leve',
        adultos: { dose: '200-400mcg', frequencia: '1-2x/dia' },
      },
      {
        indicacao: 'Asma moderada-grave',
        adultos: { dose: '400-800mcg', frequencia: '2x/dia', doseMaxima: '1600mcg/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Candidíase oral', 'Disfonia', 'Tosse', 'Irritação faríngea'],
      graves: ['Supressão adrenal (doses altas)', 'Broncoespasmo paradoxal']
    },
    interacoes: [
      { medicamento: 'Itraconazol', gravidade: 'moderada', efeito: 'Aumenta níveis de budesonida', conduta: 'Cautela' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    orientacoesPaciente: ['Enxaguar boca após uso'],
    doencasRelacionadas: ['asma', 'dpoc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'fluticasona',
    nomeGenerico: 'Fluticasona',
    nomesComerciais: ['Flixotide', 'Seretide (assoc)'],
    atcCode: 'R03BA05',
    classeTerapeutica: 'corticoide_inalatorio',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'aerossol', concentracao: '50mcg/dose', disponivelSUS: true },
      { forma: 'aerossol', concentracao: '250mcg/dose', disponivelSUS: true },
      { forma: 'po_inalacao', concentracao: '100mcg/dose', disponivelSUS: true },
    ],
    indicacoes: ['Asma (manutenção)', 'DPOC (com exacerbações)'],
    mecanismoAcao: 'Corticoide inalatório potente',
    posologias: [
      {
        indicacao: 'Asma',
        adultos: { dose: '100-500mcg', frequencia: '12/12h', doseMaxima: '1000mcg/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Candidíase oral', 'Rouquidão', 'Dor de garganta'],
      graves: ['Supressão adrenal', 'Perda óssea (doses altas crônicas)']
    },
    interacoes: [
      { medicamento: 'Ritonavir', gravidade: 'grave', efeito: 'Síndrome de Cushing', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    orientacoesPaciente: ['Enxaguar boca após uso; usar espaçador'],
    doencasRelacionadas: ['asma', 'dpoc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'mometasona-inalatorio',
    nomeGenerico: 'Mometasona',
    nomesComerciais: ['Oximax'],
    atcCode: 'R03BA07',
    classeTerapeutica: 'corticoide_inalatorio',
    subclasse: 'glicocorticoide',
    rename: false,
    apresentacoes: [
      { forma: 'po_inalacao', concentracao: '200mcg/dose', disponivelSUS: false },
      { forma: 'po_inalacao', concentracao: '400mcg/dose', disponivelSUS: false },
    ],
    indicacoes: ['Asma (manutenção)'],
    mecanismoAcao: 'Corticoide inalatório; dose única diária',
    posologias: [
      {
        indicacao: 'Asma',
        adultos: { dose: '200-400mcg', frequencia: '1x/dia à noite', doseMaxima: '800mcg/dia' },
      }
    ],
    contraindicacoes: ['Status asmaticus'],
    efeitosAdversos: {
      comuns: ['Candidíase', 'Disfonia', 'Cefaleia'],
      graves: ['Supressão adrenal']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['asma'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Combinações LABA/CI
  {
    id: 'budesonida-formoterol',
    nomeGenerico: 'Budesonida + Formoterol',
    nomesComerciais: ['Symbicort', 'Alenia'],
    atcCode: 'R03AK07',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'ci_laba_combinacao',
    rename: true,
    apresentacoes: [
      { forma: 'po_inalacao', concentracao: '160/4,5mcg', disponivelSUS: true },
      { forma: 'po_inalacao', concentracao: '320/9mcg', disponivelSUS: true },
    ],
    indicacoes: ['Asma', 'DPOC'],
    mecanismoAcao: 'CI (anti-inflamatório) + LABA (broncodilatador)',
    posologias: [
      {
        indicacao: 'Asma (manutenção e resgate)',
        adultos: { dose: '160/4,5mcg 1-2 inalações', frequencia: '12/12h + resgate PRN' },
      }
    ],
    contraindicacoes: ['Asma sem CI (para formoterol isolado)'],
    efeitosAdversos: {
      comuns: ['Candidíase oral', 'Disfonia', 'Tremor', 'Cefaleia'],
      graves: ['Broncoespasmo paradoxal', 'Supressão adrenal']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Antagonismo LABA', conduta: 'Usar beta-1 seletivo' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['asma', 'dpoc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'fluticasona-salmeterol',
    nomeGenerico: 'Fluticasona + Salmeterol',
    nomesComerciais: ['Seretide'],
    atcCode: 'R03AK06',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'ci_laba_combinacao',
    rename: true,
    apresentacoes: [
      { forma: 'po_inalacao', concentracao: '250/50mcg', disponivelSUS: true },
      { forma: 'po_inalacao', concentracao: '500/50mcg', disponivelSUS: true },
      { forma: 'aerossol', concentracao: '125/25mcg', disponivelSUS: true },
    ],
    indicacoes: ['Asma', 'DPOC'],
    mecanismoAcao: 'Fluticasona (CI) + Salmeterol (LABA)',
    posologias: [
      {
        indicacao: 'Asma moderada-grave',
        adultos: { dose: '250/50mcg', frequencia: '12/12h' },
      }
    ],
    contraindicacoes: ['Status asmaticus'],
    efeitosAdversos: {
      comuns: ['Candidíase', 'Cefaleia', 'Tremor', 'Palpitações'],
      graves: ['Supressão adrenal', 'Broncoespasmo paradoxal']
    },
    interacoes: [
      { medicamento: 'Ritonavir', gravidade: 'grave', efeito: 'Síndrome Cushing', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['asma', 'dpoc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antitrombóticos adicionais
  {
    id: 'enoxaparina',
    nomeGenerico: 'Enoxaparina',
    nomesComerciais: ['Clexane'],
    atcCode: 'B01AB05',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'heparina_baixo_peso',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '40mg/0,4ml', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '60mg/0,6ml', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '80mg/0,8ml', disponivelSUS: true },
    ],
    indicacoes: ['Profilaxia TEV', 'Tratamento TVP/EP', 'SCA', 'Anticoagulação ponte'],
    mecanismoAcao: 'HBPM; inibe fator Xa > trombina',
    posologias: [
      {
        indicacao: 'Profilaxia TEV',
        adultos: { dose: '40mg SC', frequencia: '1x/dia' },
      },
      {
        indicacao: 'Tratamento TEV',
        adultos: { dose: '1mg/kg SC', frequencia: '12/12h ou 1,5mg/kg 1x/dia' },
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'Trombocitopenia por heparina', 'Endocardite bacteriana'],
    efeitosAdversos: {
      comuns: ['Hematomas', 'Sangramento menor'],
      graves: ['Hemorragia maior', 'TIH', 'Osteoporose (uso prolongado)']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Risco de sangramento', conduta: 'Cautela' },
      { medicamento: 'Antiagregantes', gravidade: 'moderada', efeito: 'Sangramento aditivo', conduta: 'Monitorar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Não absorvida' },
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Tratamento: 1mg/kg 1x/dia; Profilaxia: 30mg 1x/dia' },
    ],
    monitorizacao: ['Anti-Xa (se DRC, obesidade, gravidez)', 'Plaquetas (TIH)'],
    doencasRelacionadas: ['tev', 'tep', 'sca'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'heparina-nao-fracionada',
    nomeGenerico: 'Heparina Não Fracionada',
    nomesComerciais: ['Liquemine', 'Heparina'],
    atcCode: 'B01AB01',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'heparina',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '5000UI/ml', disponivelSUS: true },
    ],
    indicacoes: ['Anticoagulação aguda', 'CEC', 'Hemodiálise', 'TEV'],
    mecanismoAcao: 'Potencializa antitrombina III; inibe trombina e fator Xa',
    posologias: [
      {
        indicacao: 'TEV (tratamento)',
        adultos: { dose: '80UI/kg bolus, depois 18UI/kg/h', frequencia: 'Infusão contínua, ajustar por TTPa' },
      },
      {
        indicacao: 'Profilaxia',
        adultos: { dose: '5000UI SC', frequencia: '8/8h ou 12/12h' },
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'TIH', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Hematomas', 'Sangramento'],
      graves: ['Hemorragia maior', 'TIH (2-14 dias)', 'Osteoporose']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Sangramento', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Não absorvida VO' },
    monitorizacao: ['TTPa (1,5-2,5x controle)', 'Plaquetas', 'Hemoglobina'],
    doencasRelacionadas: ['tev', 'embolia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'fondaparinux',
    nomeGenerico: 'Fondaparinux',
    nomesComerciais: ['Arixtra'],
    atcCode: 'B01AX05',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'inibidor_fator_xa',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '2,5mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '7,5mg/0,6ml', disponivelSUS: false },
    ],
    indicacoes: ['Profilaxia TEV (ortopedia)', 'Tratamento TEV', 'SCA'],
    mecanismoAcao: 'Pentassacarídeo sintético; inibe fator Xa seletivamente',
    posologias: [
      {
        indicacao: 'Profilaxia TEV',
        adultos: { dose: '2,5mg SC', frequencia: '1x/dia' },
      },
      {
        indicacao: 'Tratamento TEV',
        adultos: { dose: '5-10mg SC', frequencia: '1x/dia (peso-dependente)' },
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'DRC grave', 'Peso <50kg'],
    efeitosAdversos: {
      comuns: ['Sangramento menor', 'Anemia'],
      graves: ['Hemorragia maior']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'grave', efeito: 'Sangramento', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    ajusteDoseRenal: [
      { tfg: '30-50', ajuste: 'Usar com cautela' },
      { tfg: '<30', ajuste: 'Contraindicado' },
    ],
    doencasRelacionadas: ['tev'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'rivaroxabana',
    nomeGenerico: 'Rivaroxabana',
    nomesComerciais: ['Xarelto'],
    atcCode: 'B01AF01',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'doac',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
    ],
    indicacoes: ['FA não valvar', 'TEV (tratamento e profilaxia)', 'Prevenção TEV após cirurgia ortopédica'],
    mecanismoAcao: 'Inibidor direto do fator Xa',
    posologias: [
      {
        indicacao: 'FA',
        adultos: { dose: '20mg', frequencia: '1x/dia com jantar' },
      },
      {
        indicacao: 'TEV tratamento',
        adultos: { dose: '15mg 12/12h x 3 semanas, depois 20mg 1x/dia', frequencia: 'Com alimentos' },
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'Doença hepática com coagulopatia', 'Gravidez'],
    efeitosAdversos: {
      comuns: ['Sangramento', 'Náuseas', 'Anemia'],
      graves: ['Hemorragia maior', 'Sangramento intracraniano']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4/P-gp', gravidade: 'grave', efeito: 'Aumenta níveis', conduta: 'Evitar ou ajustar' },
      { medicamento: 'Indutores CYP3A4', gravidade: 'grave', efeito: 'Reduz eficácia', conduta: 'Evitar' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' },
    ajusteDoseRenal: [
      { tfg: '15-50 (FA)', ajuste: '15mg 1x/dia' },
      { tfg: '<15', ajuste: 'Evitar' },
    ],
    doencasRelacionadas: ['fibrilacao-atrial', 'tev'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'apixabana',
    nomeGenerico: 'Apixabana',
    nomesComerciais: ['Eliquis'],
    atcCode: 'B01AF02',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'doac',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
    ],
    indicacoes: ['FA não valvar', 'TEV (tratamento e profilaxia)', 'Profilaxia após artroplastia'],
    mecanismoAcao: 'Inibidor direto do fator Xa',
    posologias: [
      {
        indicacao: 'FA',
        adultos: { dose: '5mg 12/12h', frequencia: '12/12h', observacoes: '2,5mg 12/12h se ≥2 de: idade≥80, peso≤60kg, Cr≥1,5' },
      },
      {
        indicacao: 'TEV tratamento',
        adultos: { dose: '10mg 12/12h x 7 dias, depois 5mg 12/12h', frequencia: '12/12h' },
      }
    ],
    contraindicacoes: ['Sangramento ativo', 'Doença hepática com coagulopatia'],
    efeitosAdversos: {
      comuns: ['Sangramento', 'Náuseas', 'Anemia'],
      graves: ['Hemorragia maior']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4/P-gp potentes', gravidade: 'grave', efeito: 'Dobra níveis', conduta: 'Evitar ou reduzir dose' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['fibrilacao-atrial', 'tev'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'dabigatrana',
    nomeGenerico: 'Dabigatrana',
    nomesComerciais: ['Pradaxa'],
    atcCode: 'B01AE07',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'inibidor_trombina_direto',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '110mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: false },
    ],
    indicacoes: ['FA não valvar', 'TEV (tratamento e profilaxia)', 'Profilaxia após artroplastia'],
    mecanismoAcao: 'Inibidor direto da trombina',
    posologias: [
      {
        indicacao: 'FA',
        adultos: { dose: '150mg 12/12h', frequencia: '12/12h', observacoes: '110mg 12/12h se idade≥80 ou alto risco sangramento' },
      }
    ],
    contraindicacoes: ['Prótese valvar mecânica', 'DRC grave', 'Sangramento ativo'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Sangramento', 'Náuseas'],
      graves: ['Hemorragia maior', 'Sangramento GI']
    },
    interacoes: [
      { medicamento: 'Inibidores P-gp potentes', gravidade: 'grave', efeito: 'Aumenta níveis', conduta: 'Evitar ou ajustar' },
      { medicamento: 'Rifampicina', gravidade: 'grave', efeito: 'Reduz níveis', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    ajusteDoseRenal: [
      { tfg: '30-50', ajuste: '110mg 12/12h' },
      { tfg: '<30', ajuste: 'Contraindicado' },
    ],
    orientacoesPaciente: ['Antídoto: Idarucizumab (Praxbind)'],
    doencasRelacionadas: ['fibrilacao-atrial', 'tev'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Diuréticos adicionais
  {
    id: 'hidroclorotiazida',
    nomeGenerico: 'Hidroclorotiazida',
    nomesComerciais: ['Clorana', 'Drenol'],
    atcCode: 'C03AA03',
    classeTerapeutica: 'diuretico',
    subclasse: 'tiazidico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipertensão arterial', 'Edema', 'Nefrolitíase (cálcio)'],
    mecanismoAcao: 'Inibe cotransportador Na-Cl no túbulo contorcido distal',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '12,5-25mg', frequencia: '1x/dia', doseMaxima: '50mg/dia' },
      }
    ],
    contraindicacoes: ['Anúria', 'Hipersensibilidade a sulfonamidas'],
    efeitosAdversos: {
      comuns: ['Hipocalemia', 'Hiperuricemia', 'Hiperglicemia', 'Hiponatremia'],
      graves: ['Arritmias (hipocalemia)', 'Pancreatite', 'Fotossensibilidade', 'Câncer de pele (uso crônico?']
    },
    interacoes: [
      { medicamento: 'Lítio', gravidade: 'grave', efeito: 'Aumenta níveis de lítio', conduta: 'Monitorar' },
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Reduz efeito diurético', conduta: 'Monitorar PA' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pode reduzir lactação' },
    monitorizacao: ['K+', 'Na+', 'Glicemia', 'Ácido úrico'],
    doencasRelacionadas: ['hipertensao', 'edema'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'indapamida',
    nomeGenerico: 'Indapamida',
    nomesComerciais: ['Natrilix'],
    atcCode: 'C03BA11',
    classeTerapeutica: 'diuretico',
    subclasse: 'tiazidico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1,5mg SR', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: true },
    ],
    indicacoes: ['Hipertensão arterial'],
    mecanismoAcao: 'Tiazida-like; menor efeito metabólico',
    posologias: [
      {
        indicacao: 'Hipertensão',
        adultos: { dose: '1,5mg SR ou 2,5mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Anúria', 'Encefalopatia hepática'],
    efeitosAdversos: {
      comuns: ['Hipocalemia (menos que HCTZ)', 'Cefaleia', 'Tontura'],
      graves: ['Hiponatremia grave', 'Prolongamento QT']
    },
    interacoes: [
      { medicamento: 'Lítio', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['hipertensao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'furosemida',
    nomeGenerico: 'Furosemida',
    nomesComerciais: ['Lasix'],
    atcCode: 'C03CA01',
    classeTerapeutica: 'diuretico',
    subclasse: 'alca',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '10mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Edema (ICC, cirrose, DRC)', 'EAP', 'Hipercalcemia'],
    mecanismoAcao: 'Inibe cotransportador Na-K-2Cl na alça de Henle',
    posologias: [
      {
        indicacao: 'Edema',
        adultos: { dose: '20-80mg VO', frequencia: '1-2x/dia' },
      },
      {
        indicacao: 'EAP',
        adultos: { dose: '20-80mg IV', frequencia: 'Bolus ou infusão' },
      }
    ],
    contraindicacoes: ['Anúria', 'Hipovolemia', 'Hipocalemia grave'],
    efeitosAdversos: {
      comuns: ['Hipocalemia', 'Hiponatremia', 'Hipomagnesemia', 'Hiperuricemia'],
      graves: ['Ototoxicidade (doses altas IV)', 'Desidratação grave', 'Alcalose metabólica']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'grave', efeito: 'Ototoxicidade', conduta: 'Evitar' },
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Toxicidade digitálica por hipocalemia', conduta: 'Repor K+' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pode reduzir lactação' },
    monitorizacao: ['K+', 'Na+', 'Creatinina', 'PA'],
    doencasRelacionadas: ['icc', 'edema', 'eap'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'bumetanida',
    nomeGenerico: 'Bumetanida',
    nomesComerciais: ['Burinax'],
    atcCode: 'C03CA02',
    classeTerapeutica: 'diuretico',
    subclasse: 'alca',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
    ],
    indicacoes: ['Edema refratário', 'ICC'],
    mecanismoAcao: 'Diurético de alça; 40x mais potente que furosemida',
    posologias: [
      {
        indicacao: 'Edema',
        adultos: { dose: '0,5-2mg', frequencia: '1-2x/dia', doseMaxima: '10mg/dia' },
      }
    ],
    contraindicacoes: ['Anúria', 'Encefalopatia hepática'],
    efeitosAdversos: {
      comuns: ['Hipocalemia', 'Hiponatremia', 'Desidratação'],
      graves: ['Ototoxicidade']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'grave', efeito: 'Ototoxicidade', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['icc', 'edema'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // IBPs adicionais
  {
    id: 'pantoprazol',
    nomeGenerico: 'Pantoprazol',
    nomesComerciais: ['Pantozol', 'Pantocal'],
    atcCode: 'A02BC02',
    classeTerapeutica: 'inibidor_bomba_protonica',
    subclasse: 'ibp',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '40mg', disponivelSUS: true },
    ],
    indicacoes: ['DRGE', 'Úlcera péptica', 'Erradicação H. pylori', 'Profilaxia úlcera de estresse'],
    mecanismoAcao: 'Inibe irreversivelmente H+/K+-ATPase gástrica',
    posologias: [
      {
        indicacao: 'DRGE/Úlcera',
        adultos: { dose: '40mg', frequencia: '1x/dia antes do café' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Diarreia', 'Náuseas'],
      graves: ['Colite por C. difficile', 'Hipomagnesemia', 'Fraturas (uso prolongado)', 'Nefrite intersticial']
    },
    interacoes: [
      { medicamento: 'Clopidogrel', gravidade: 'leve', efeito: 'Menor inibição CYP2C19 que omeprazol', conduta: 'Preferir pantoprazol' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['drge', 'ulcera-peptica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'esomeprazol',
    nomeGenerico: 'Esomeprazol',
    nomesComerciais: ['Nexium', 'Esoz'],
    atcCode: 'A02BC05',
    classeTerapeutica: 'inibidor_bomba_protonica',
    subclasse: 'ibp',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: false },
    ],
    indicacoes: ['DRGE', 'Úlcera péptica', 'Erradicação H. pylori'],
    mecanismoAcao: 'S-isômero do omeprazol; IBP',
    posologias: [
      {
        indicacao: 'DRGE',
        adultos: { dose: '20-40mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Diarreia', 'Náuseas'],
      graves: ['Colite C. difficile', 'Hipomagnesemia']
    },
    interacoes: [
      { medicamento: 'Clopidogrel', gravidade: 'moderada', efeito: 'Inibe CYP2C19', conduta: 'Considerar alternativa' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['drge', 'ulcera-peptica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antieméticos adicionais
  {
    id: 'metoclopramida',
    nomeGenerico: 'Metoclopramida',
    nomesComerciais: ['Plasil', 'Primperan'],
    atcCode: 'A03FA01',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_d2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '4mg/ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '5mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Náuseas e vômitos', 'Gastroparesia', 'Refluxo'],
    mecanismoAcao: 'Antagonista D2 central e periférico; procinético',
    posologias: [
      {
        indicacao: 'Náuseas/Vômitos',
        adultos: { dose: '10mg', frequencia: '3x/dia antes das refeições e ao deitar', doseMaxima: '30mg/dia' },
      }
    ],
    contraindicacoes: ['Obstrução GI', 'Feocromocitoma', 'Epilepsia', 'Parkinson'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Inquietação', 'Diarreia'],
      graves: ['Discinesia tardia', 'SEP', 'SNM', 'Hiperprolactinemia']
    },
    interacoes: [
      { medicamento: 'Antipsicóticos', gravidade: 'moderada', efeito: 'SEP aditivo', conduta: 'Evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Aumenta lactação' },
    orientacoesPaciente: ['Uso máximo 5 dias; risco de discinesia tardia com uso prolongado'],
    doencasRelacionadas: ['nausea', 'gastroparesia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ondansetrona',
    nomeGenerico: 'Ondansetrona',
    nomesComerciais: ['Zofran', 'Nausedron'],
    atcCode: 'A04AA01',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista_5ht3',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '8mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '2mg/ml', disponivelSUS: true },
      { forma: 'comprimido_orodispersivel', concentracao: '4mg', disponivelSUS: false },
    ],
    indicacoes: ['Náuseas por quimioterapia', 'Náuseas pós-operatórias', 'Náuseas da gestação (off-label)'],
    mecanismoAcao: 'Antagonista seletivo 5-HT3',
    posologias: [
      {
        indicacao: 'Náuseas QT',
        adultos: { dose: '8mg VO ou 4-8mg IV', frequencia: '30min antes da QT, repetir 8/8h PRN' },
      },
      {
        indicacao: 'Pós-operatório',
        adultos: { dose: '4mg IV', frequencia: 'Dose única' },
      }
    ],
    contraindicacoes: ['QT longo congênito', 'Uso de apomorfina'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Constipação', 'Fadiga'],
      graves: ['Prolongamento QT', 'Arritmias', 'Síndrome serotoninérgica']
    },
    interacoes: [
      { medicamento: 'QT prolongadores', gravidade: 'moderada', efeito: 'Arritmia', conduta: 'Cautela' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['nausea'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Corticoides sistêmicos
  {
    id: 'prednisona',
    nomeGenerico: 'Prednisona',
    nomesComerciais: ['Meticorten', 'Predsin'],
    atcCode: 'H02AB07',
    classeTerapeutica: 'corticoide',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
    ],
    indicacoes: ['Doenças inflamatórias', 'Asma exacerbação', 'Doenças autoimunes', 'Alergias graves'],
    mecanismoAcao: 'Glicocorticoide; anti-inflamatório e imunossupressor',
    posologias: [
      {
        indicacao: 'Asma exacerbação',
        adultos: { dose: '40-60mg', frequencia: '1x/dia x 5-7 dias' },
      },
      {
        indicacao: 'Doenças autoimunes',
        adultos: { dose: '0,5-2mg/kg', frequencia: '1x/dia ou dividido', observacoes: 'Desmame gradual' },
      }
    ],
    contraindicacoes: ['Infecções fúngicas sistêmicas', 'Herpes ocular'],
    efeitosAdversos: {
      comuns: ['Hiperglicemia', 'Insônia', 'Aumento apetite', 'Edema'],
      graves: ['Supressão adrenal', 'Osteoporose', 'Necrose avascular', 'Psicose', 'Infecções oportunistas']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Risco GI', conduta: 'Associar IBP' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Altera INR', conduta: 'Monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em doses habituais' },
    orientacoesPaciente: ['Não suspender abruptamente se uso >2 semanas'],
    doencasRelacionadas: ['asma', 'artrite-reumatoide', 'lupus'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'dexametasona',
    nomeGenerico: 'Dexametasona',
    nomesComerciais: ['Decadron'],
    atcCode: 'H02AB02',
    classeTerapeutica: 'corticoide',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '4mg/ml', disponivelSUS: true },
      { forma: 'elixir', concentracao: '0,1mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Edema cerebral', 'Náuseas QT', 'COVID-19 grave', 'Crise asmática', 'Meningite bacteriana'],
    mecanismoAcao: 'Glicocorticoide potente; longa ação',
    posologias: [
      {
        indicacao: 'Edema cerebral',
        adultos: { dose: '10mg IV ataque, depois 4mg 6/6h', frequencia: 'Ver esquema' },
      },
      {
        indicacao: 'COVID-19 grave',
        adultos: { dose: '6mg', frequencia: '1x/dia x 10 dias' },
      }
    ],
    contraindicacoes: ['Infecções fúngicas sistêmicas não tratadas'],
    efeitosAdversos: {
      comuns: ['Hiperglicemia', 'Insônia', 'Agitação'],
      graves: ['Supressão adrenal', 'Psicose', 'Sangramento GI']
    },
    interacoes: [
      { medicamento: 'Fenitoína', gravidade: 'moderada', efeito: 'Reduz níveis de dexametasona', conduta: 'Pode precisar dose maior' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em doses habituais' },
    doencasRelacionadas: ['edema-cerebral', 'covid-19'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];
