/**
 * EXPANSÃO RESPIRATÓRIA - DARWIN-MFC
 * ===================================
 *
 * Medicamentos para doenças respiratórias baseados na WHO Essential Medicines
 * e RENAME 2024
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosRespiratorios: Partial<Medicamento>[] = [
  // ============================================================================
  // BRONCODILATADORES BETA-2 AGONISTAS
  // ============================================================================
  {
    id: 'salbutamol',
    nomeGenerico: 'Salbutamol',
    nomesComerciais: ['Aerolin', 'Aerojet', 'Broncolin'],
    atcCode: 'R03AC02',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'beta2_agonista_curta',
    rename: true,
    apresentacoes: [
      { forma: 'aerosol', concentracao: '100mcg/dose', disponivelSUS: true },
      { forma: 'solucao_nebulizacao', concentracao: '5mg/mL', disponivelSUS: true },
      { forma: 'xarope', concentracao: '2mg/5mL', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Broncoespasmo agudo',
      'Asma (resgate)',
      'DPOC (resgate)',
      'Bronquiolite',
      'Prevenção broncoespasmo induzido por exercício'
    ],
    mecanismoAcao: 'Agonista seletivo beta-2 adrenérgico de curta ação. Relaxa musculatura lisa brônquica por aumento de AMPc.',
    posologias: [
      {
        indicacao: 'Broncoespasmo agudo',
        adultos: { dose: '100-200mcg (1-2 jatos)', frequencia: 'A cada 4-6h conforme necessidade', doseMaxima: '800mcg/dia' },
        pediatrico: { dose: '100mcg (1 jato)', frequencia: 'A cada 4-6h conforme necessidade', doseMaxima: '400mcg/dia' }
      },
      {
        indicacao: 'Crise asmática moderada',
        adultos: { dose: '4-8 jatos', frequencia: 'A cada 20 min por 1-2h', observacoes: 'Com espaçador' },
        pediatrico: { dose: '2-4 jatos', frequencia: 'A cada 20 min por 1h', observacoes: 'Com espaçador' }
      },
      {
        indicacao: 'Nebulização',
        adultos: { dose: '2,5-5mg', frequencia: 'A cada 20 min por 1h na crise' },
        pediatrico: { dose: '0,15mg/kg (mín 2,5mg)', frequencia: 'A cada 20 min por 1h', doseMaxima: '5mg/dose' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a aminas simpatomiméticas'],
    precaucoes: ['Hipertireoidismo', 'Cardiopatia isquêmica', 'Arritmias', 'Diabetes mellitus', 'Feocromocitoma'],
    efeitosAdversos: {
      comuns: ['Tremor', 'Taquicardia', 'Cefaleia', 'Nervosismo'],
      graves: ['Broncoespasmo paradoxal', 'Hipocalemia (uso excessivo)', 'Arritmias']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'grave', efeito: 'Antagonismo do efeito broncodilatador', conduta: 'Evitar, preferir betabloqueadores cardiosseletivos se necessário' },
      { medicamento: 'Diuréticos', gravidade: 'moderada', efeito: 'Hipocalemia aditiva', conduta: 'Monitorar potássio' },
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Potencialização de efeitos cardiovasculares', conduta: 'Usar com cautela extrema' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível. Baixa excreção no leite.' }
  },

  {
    id: 'fenoterol',
    nomeGenerico: 'Fenoterol',
    nomesComerciais: ['Berotec', 'Fluibron A'],
    atcCode: 'R03AC04',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'beta2_agonista_curta',
    rename: true,
    apresentacoes: [
      { forma: 'aerosol', concentracao: '100mcg/dose', disponivelSUS: true },
      { forma: 'solucao_nebulizacao', concentracao: '5mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Broncoespasmo agudo', 'Asma', 'DPOC', 'Bronquite'],
    mecanismoAcao: 'Agonista beta-2 de curta ação. Similar ao salbutamol mas com início de ação mais rápido.',
    posologias: [
      {
        indicacao: 'Broncoespasmo',
        adultos: { dose: '100-200mcg', frequencia: 'A cada 6h conforme necessidade', doseMaxima: '800mcg/dia' },
        pediatrico: { dose: '100mcg', frequencia: 'A cada 6h conforme necessidade' }
      }
    ],
    contraindicacoes: ['Cardiomiopatia hipertrófica obstrutiva', 'Taquiarritmias'],
    efeitosAdversos: {
      comuns: ['Tremor', 'Taquicardia', 'Palpitações'],
      graves: ['Arritmias', 'Hipocalemia grave']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'grave', efeito: 'Antagonismo', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso cauteloso' }
  },

  {
    id: 'formoterol',
    nomeGenerico: 'Formoterol',
    nomesComerciais: ['Foradil', 'Oxis', 'Alenia'],
    atcCode: 'R03AC13',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'beta2_agonista_longa',
    rename: true,
    apresentacoes: [
      { forma: 'capsula_inalacao', concentracao: '12mcg', disponivelSUS: true },
      { forma: 'po_inalacao', concentracao: '6mcg/dose', disponivelSUS: false },
      { forma: 'po_inalacao', concentracao: '12mcg/dose', disponivelSUS: true }
    ],
    indicacoes: [
      'Asma persistente (com CI)',
      'DPOC',
      'Prevenção broncoespasmo exercício',
      'Nunca usar como monoterapia na asma'
    ],
    mecanismoAcao: 'Beta-2 agonista de longa ação (LABA). Início rápido (1-3 min) e duração prolongada (12h).',
    posologias: [
      {
        indicacao: 'Asma/DPOC',
        adultos: { dose: '12mcg', frequencia: '2x/dia', doseMaxima: '48mcg/dia' },
        pediatrico: { dose: '12mcg', frequencia: '2x/dia', observacoes: '>6 anos' }
      }
    ],
    contraindicacoes: ['Monoterapia na asma', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Tremor', 'Cefaleia', 'Palpitações', 'Câimbras'],
      graves: ['Broncoespasmo paradoxal', 'Aumento mortalidade se monoterapia asma']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'grave', efeito: 'Antagonismo', conduta: 'Evitar' },
      { medicamento: 'QT prolongadores', gravidade: 'moderada', efeito: 'Prolongamento QT aditivo', conduta: 'Cautela' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' }
  },

  {
    id: 'salmeterol',
    nomeGenerico: 'Salmeterol',
    nomesComerciais: ['Serevent', 'Seretide (combinação)'],
    atcCode: 'R03AC12',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'beta2_agonista_longa',
    rename: false,
    apresentacoes: [
      { forma: 'po_inalacao', concentracao: '50mcg/dose', disponivelSUS: false }
    ],
    indicacoes: [
      'Asma persistente (sempre com CI)',
      'DPOC',
      'Prevenção broncoespasmo induzido exercício',
      'Não usar para resgate'
    ],
    mecanismoAcao: 'LABA com início lento (15-20 min) e longa duração (12h). Deve sempre ser associado a CI na asma.',
    posologias: [
      {
        indicacao: 'Asma/DPOC',
        adultos: { dose: '50mcg', frequencia: '2x/dia' },
        pediatrico: { dose: '50mcg', frequencia: '2x/dia', observacoes: '>4 anos' }
      }
    ],
    contraindicacoes: ['Tratamento de crise aguda', 'Monoterapia na asma'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Tremor', 'Palpitações', 'Câimbras'],
      graves: ['Aumento mortalidade asma (monoterapia)', 'Broncoespasmo paradoxal']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'grave', efeito: 'Antagonismo', conduta: 'Evitar' },
      { medicamento: 'Inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumento níveis salmeterol', conduta: 'Cautela com cetoconazol' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  // ============================================================================
  // ANTICOLINÉRGICOS INALATÓRIOS
  // ============================================================================
  {
    id: 'brometo-ipratropio',
    nomeGenerico: 'Brometo de Ipratrópio',
    nomesComerciais: ['Atrovent', 'Iprabon'],
    atcCode: 'R03BB01',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'anticolinergico_curta',
    rename: true,
    apresentacoes: [
      { forma: 'aerosol', concentracao: '20mcg/dose', disponivelSUS: true },
      { forma: 'solucao_nebulizacao', concentracao: '0,25mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'DPOC (tratamento de manutenção)',
      'Asma aguda grave (adjuvante)',
      'Broncoespasmo refratário a beta-2'
    ],
    mecanismoAcao: 'Antagonista muscarínico de curta ação. Bloqueia receptores M3 na musculatura lisa brônquica.',
    posologias: [
      {
        indicacao: 'DPOC manutenção',
        adultos: { dose: '40mcg (2 jatos)', frequencia: '3-4x/dia', doseMaxima: '320mcg/dia' }
      },
      {
        indicacao: 'Crise asmática (adjuvante)',
        adultos: { dose: '500mcg nebulizado', frequencia: 'A cada 20 min por 3 doses' },
        pediatrico: { dose: '250-500mcg nebulizado', frequencia: 'A cada 20 min por 3 doses' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a atropina', 'Glaucoma de ângulo fechado não tratado'],
    precaucoes: ['Hiperplasia prostática', 'Obstrução vesical', 'Glaucoma'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Tosse', 'Cefaleia', 'Náusea'],
      graves: ['Glaucoma agudo (se contato ocular)', 'Retenção urinária', 'Broncoespasmo paradoxal']
    },
    interacoes: [
      { medicamento: 'Anticolinérgicos', gravidade: 'moderada', efeito: 'Efeitos anticolinérgicos aditivos', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  {
    id: 'tiotropio',
    nomeGenerico: 'Tiotrópio',
    nomesComerciais: ['Spiriva', 'Spiriva Respimat'],
    atcCode: 'R03BB04',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'anticolinergico_longa',
    rename: true,
    apresentacoes: [
      { forma: 'capsula_inalacao', concentracao: '18mcg', disponivelSUS: true },
      { forma: 'solucao_inalacao', concentracao: '2,5mcg/dose', disponivelSUS: false }
    ],
    indicacoes: [
      'DPOC (manutenção de primeira linha)',
      'Asma persistente moderada-grave (adjuvante)',
      'Não usar para crise aguda'
    ],
    mecanismoAcao: 'Antagonista muscarínico de longa ação (LAMA). Duração 24h. Seletivo para receptores M1 e M3.',
    posologias: [
      {
        indicacao: 'DPOC/Asma',
        adultos: { dose: '18mcg (1 cápsula)', frequencia: '1x/dia', observacoes: 'Mesmo horário diariamente' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a atropina', 'Glaucoma de ângulo fechado'],
    precaucoes: ['Insuficiência renal moderada-grave', 'Hiperplasia prostática', 'Obstrução vesical'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Constipação', 'Infecção urinária'],
      graves: ['Glaucoma', 'Retenção urinária', 'Reações anafiláticas (raro)']
    },
    interacoes: [
      { medicamento: 'Anticolinérgicos', gravidade: 'moderada', efeito: 'Efeitos aditivos', conduta: 'Evitar uso concomitante' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' }
  },

  // ============================================================================
  // CORTICOIDES INALATÓRIOS
  // ============================================================================
  {
    id: 'budesonida-inalatorio',
    nomeGenerico: 'Budesonida',
    nomesComerciais: ['Pulmicort', 'Busonid', 'Miflonide'],
    atcCode: 'R03BA02',
    classeTerapeutica: 'corticoide_inalatorio',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'po_inalacao', concentracao: '200mcg/dose', disponivelSUS: true },
      { forma: 'po_inalacao', concentracao: '400mcg/dose', disponivelSUS: true },
      { forma: 'suspensao_nebulizacao', concentracao: '0,25mg/mL', disponivelSUS: true },
      { forma: 'suspensao_nebulizacao', concentracao: '0,5mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Asma persistente (todas gravidades)',
      'DPOC (com exacerbações frequentes)',
      'Laringite estridulosa (nebulização)'
    ],
    mecanismoAcao: 'Corticoide inalatório de potência intermediária. Reduz inflamação eosinofílica, hiperreatividade brônquica e remodelamento.',
    posologias: [
      {
        indicacao: 'Asma leve',
        adultos: { dose: '200-400mcg', frequencia: '1-2x/dia' },
        pediatrico: { dose: '100-200mcg', frequencia: '1-2x/dia' }
      },
      {
        indicacao: 'Asma moderada',
        adultos: { dose: '400-800mcg', frequencia: '2x/dia' },
        pediatrico: { dose: '200-400mcg', frequencia: '2x/dia' }
      },
      {
        indicacao: 'Asma grave',
        adultos: { dose: '800-1600mcg', frequencia: '2x/dia', doseMaxima: '1600mcg/dia' },
        pediatrico: { dose: '400-800mcg', frequencia: '2x/dia' }
      },
      {
        indicacao: 'Laringite',
        adultos: { dose: '2mg nebulizado', frequencia: 'Dose única ou 2x' },
        pediatrico: { dose: '2mg nebulizado', frequencia: 'Dose única' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Tuberculose pulmonar ativa não tratada'],
    precaucoes: ['Candidíase oral (lavar boca após uso)', 'Uso de espaçador', 'Disfonia'],
    efeitosAdversos: {
      comuns: ['Candidíase orofaríngea', 'Disfonia', 'Tosse'],
      graves: ['Supressão adrenal (doses altas)', 'Osteoporose (doses altas crônicas)', 'Retardo crescimento crianças']
    },
    interacoes: [
      { medicamento: 'Cetoconazol', gravidade: 'moderada', efeito: 'Aumenta níveis de budesonida (CYP3A4)', conduta: 'Reduzir dose ou evitar' },
      { medicamento: 'Ritonavir', gravidade: 'grave', efeito: 'Risco de Cushing iatrogênico', conduta: 'Evitar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Seguro. Mínima excreção no leite.' }
  },

  {
    id: 'beclometasona-inalatoria',
    nomeGenerico: 'Beclometasona',
    nomesComerciais: ['Clenil', 'Beclosol', 'Miflasona'],
    atcCode: 'R03BA01',
    classeTerapeutica: 'corticoide_inalatorio',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'aerosol', concentracao: '50mcg/dose', disponivelSUS: true },
      { forma: 'aerosol', concentracao: '250mcg/dose', disponivelSUS: true },
      { forma: 'capsula_inalacao', concentracao: '200mcg', disponivelSUS: true },
      { forma: 'capsula_inalacao', concentracao: '400mcg', disponivelSUS: true }
    ],
    indicacoes: ['Asma persistente', 'Rinite alérgica (nasal)'],
    mecanismoAcao: 'Corticoide inalatório. É pró-droga convertida em metabólito ativo (beclometasona-17-monopropionato).',
    posologias: [
      {
        indicacao: 'Asma leve',
        adultos: { dose: '100-250mcg', frequencia: '2x/dia' },
        pediatrico: { dose: '50-100mcg', frequencia: '2x/dia' }
      },
      {
        indicacao: 'Asma moderada-grave',
        adultos: { dose: '250-500mcg', frequencia: '2x/dia', doseMaxima: '1000mcg/dia' },
        pediatrico: { dose: '100-200mcg', frequencia: '2x/dia' }
      }
    ],
    contraindicacoes: ['Status asthmaticus', 'TB ativa'],
    efeitosAdversos: {
      comuns: ['Candidíase oral', 'Rouquidão', 'Tosse'],
      graves: ['Supressão HPA (doses altas)', 'Broncoespasmo paradoxal']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumento efeitos sistêmicos', conduta: 'Cautela' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  {
    id: 'fluticasona',
    nomeGenerico: 'Fluticasona',
    nomesComerciais: ['Flixotide', 'Seretide (combinação)'],
    atcCode: 'R03BA05',
    classeTerapeutica: 'corticoide_inalatorio',
    subclasse: 'glicocorticoide',
    rename: false,
    apresentacoes: [
      { forma: 'aerosol', concentracao: '50mcg/dose', disponivelSUS: false },
      { forma: 'aerosol', concentracao: '125mcg/dose', disponivelSUS: false },
      { forma: 'aerosol', concentracao: '250mcg/dose', disponivelSUS: false },
      { forma: 'po_inalacao', concentracao: '50mcg/dose', disponivelSUS: false },
      { forma: 'po_inalacao', concentracao: '250mcg/dose', disponivelSUS: false },
      { forma: 'po_inalacao', concentracao: '500mcg/dose', disponivelSUS: false }
    ],
    indicacoes: ['Asma persistente', 'DPOC com exacerbações'],
    mecanismoAcao: 'CI de alta potência. Alta lipofilicidade e longa retenção pulmonar. Baixa biodisponibilidade oral.',
    posologias: [
      {
        indicacao: 'Asma leve',
        adultos: { dose: '100-250mcg', frequencia: '2x/dia' },
        pediatrico: { dose: '50-100mcg', frequencia: '2x/dia' }
      },
      {
        indicacao: 'Asma moderada-grave',
        adultos: { dose: '250-500mcg', frequencia: '2x/dia', doseMaxima: '1000mcg/dia' },
        pediatrico: { dose: '100-200mcg', frequencia: '2x/dia' }
      }
    ],
    contraindicacoes: ['Status asthmaticus'],
    efeitosAdversos: {
      comuns: ['Candidíase oral', 'Disfonia'],
      graves: ['Supressão adrenal', 'Glaucoma', 'Catarata']
    },
    interacoes: [
      { medicamento: 'Ritonavir', gravidade: 'grave', efeito: 'Síndrome de Cushing', conduta: 'Contraindicado' },
      { medicamento: 'Cetoconazol', gravidade: 'grave', efeito: 'Aumento significativo níveis fluticasona', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  // ============================================================================
  // COMBINAÇÕES CI + LABA
  // ============================================================================
  {
    id: 'budesonida-formoterol',
    nomeGenerico: 'Budesonida + Formoterol',
    nomesComerciais: ['Alenia', 'Symbicort', 'Vannair'],
    atcCode: 'R03AK07',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'ci_laba_combinacao',
    rename: true,
    apresentacoes: [
      { forma: 'po_inalacao', concentracao: '200mcg + 6mcg/dose', disponivelSUS: true },
      { forma: 'po_inalacao', concentracao: '400mcg + 12mcg/dose', disponivelSUS: true }
    ],
    indicacoes: [
      'Asma persistente moderada-grave',
      'DPOC moderada-grave',
      'Terapia MART (manutenção + resgate)'
    ],
    mecanismoAcao: 'Combinação de CI (anti-inflamatório) com LABA (broncodilatador). Sinergismo: CI aumenta receptores beta, LABA potencializa efeito anti-inflamatório.',
    posologias: [
      {
        indicacao: 'Asma manutenção',
        adultos: { dose: '1-2 inalações', frequencia: '2x/dia', observacoes: 'Dose depende da formulação' },
        pediatrico: { dose: '1 inalação', frequencia: '2x/dia', observacoes: '>6 anos' }
      },
      {
        indicacao: 'MART (manutenção + resgate)',
        adultos: { dose: '1 inalação manutenção + 1 conforme necessário', frequencia: '2x/dia + resgate', doseMaxima: '8 inalações/dia' }
      }
    ],
    contraindicacoes: ['Não para crise aguda isoladamente'],
    efeitosAdversos: {
      comuns: ['Candidíase oral', 'Disfonia', 'Tremor', 'Cefaleia'],
      graves: ['Pneumonia (em DPOC)', 'Supressão adrenal']
    },
    interacoes: [
      { medicamento: 'Cetoconazol', gravidade: 'moderada', efeito: 'Aumento budesonida', conduta: 'Cautela' },
      { medicamento: 'Betabloqueadores', gravidade: 'grave', efeito: 'Antagonismo do formoterol', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Budesonida segura. Formoterol: dados limitados.' }
  },

  // ============================================================================
  // ANTILEUCOTRIENOS
  // ============================================================================
  {
    id: 'montelucaste',
    nomeGenerico: 'Montelucaste',
    nomesComerciais: ['Singulair', 'Piemonte', 'Monterax'],
    atcCode: 'R03DC03',
    classeTerapeutica: 'antileucotrienico',
    subclasse: 'antagonista_receptor',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido_mastigavel', concentracao: '4mg', disponivelSUS: true },
      { forma: 'comprimido_mastigavel', concentracao: '5mg', disponivelSUS: true },
      { forma: 'granulado', concentracao: '4mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Asma persistente (adjuvante a CI)',
      'Rinite alérgica',
      'Prevenção broncoespasmo induzido exercício',
      'Asma aspirina-induzida'
    ],
    mecanismoAcao: 'Antagonista seletivo do receptor de leucotrieno CysLT1. Bloqueia broncoconstrição, edema e recrutamento eosinofílico mediados por leucotrienos.',
    posologias: [
      {
        indicacao: 'Asma/Rinite',
        adultos: { dose: '10mg', frequencia: '1x/dia à noite' },
        pediatrico: { dose: '4mg (2-5 anos) ou 5mg (6-14 anos)', frequencia: '1x/dia à noite' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Fenilcetonúria (comprimidos mastigáveis contêm aspartame)'],
    precaucoes: ['Sintomas neuropsiquiátricos (monitorar)', 'Não substitui CI na asma persistente'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Dor abdominal', 'Infecções respiratórias superiores'],
      graves: ['Síndrome Churg-Strauss (raro)', 'Distúrbios neuropsiquiátricos (pesadelos, depressão, suicídio)', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Fenobarbital', gravidade: 'moderada', efeito: 'Redução níveis montelucaste', conduta: 'Pode necessitar ajuste' },
      { medicamento: 'Gemfibrozil', gravidade: 'moderada', efeito: 'Aumento níveis montelucaste', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Excretado no leite. Dados limitados.' }
  },

  // ============================================================================
  // MUCOLÍTICOS E EXPECTORANTES
  // ============================================================================
  {
    id: 'acetilcisteina',
    nomeGenerico: 'Acetilcisteína',
    nomesComerciais: ['Fluimucil', 'NAC', 'Mucosolvan'],
    atcCode: 'R05CB01',
    classeTerapeutica: 'mucolitico',
    subclasse: 'tiol',
    rename: true,
    apresentacoes: [
      { forma: 'granulado', concentracao: '200mg', disponivelSUS: true },
      { forma: 'granulado', concentracao: '600mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '20mg/mL', disponivelSUS: true },
      { forma: 'solucao_nebulizacao', concentracao: '100mg/mL', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '300mg/3mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Doenças respiratórias com secreção espessa',
      'Fibrose cística',
      'Intoxicação por paracetamol (IV)',
      'Prevenção nefropatia por contraste'
    ],
    mecanismoAcao: 'Quebra pontes dissulfeto nas glicoproteínas do muco. Também é precursor de glutationa (antioxidante).',
    posologias: [
      {
        indicacao: 'Mucolítico',
        adultos: { dose: '200mg', frequencia: '3x/dia ou 600mg 1x/dia' },
        pediatrico: { dose: '100mg', frequencia: '2-3x/dia' }
      },
      {
        indicacao: 'Intoxicação paracetamol',
        adultos: { dose: '150mg/kg IV em 1h, depois 50mg/kg em 4h, depois 100mg/kg em 16h', frequencia: 'Protocolo 21h' },
        pediatrico: { dose: 'Mesmo do adulto (mg/kg)', frequencia: 'Protocolo 21h' }
      }
    ],
    contraindicacoes: ['Úlcera péptica ativa', 'Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Vômito', 'Diarreia', 'Gosto metálico'],
      graves: ['Broncoespasmo (nebulização)', 'Anafilaxia (IV)']
    },
    interacoes: [
      { medicamento: 'Antibióticos orais', gravidade: 'leve', efeito: 'Possível redução absorção', conduta: 'Separar em 2h' },
      { medicamento: 'Nitroglicerina', gravidade: 'moderada', efeito: 'Potencialização efeito vasodilatador', conduta: 'Cautela' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  {
    id: 'ambroxol',
    nomeGenerico: 'Ambroxol',
    nomesComerciais: ['Mucosolvan', 'Mucoflux', 'Ambriex'],
    atcCode: 'R05CB06',
    classeTerapeutica: 'mucolitico',
    subclasse: 'benzilamin',
    rename: true,
    apresentacoes: [
      { forma: 'xarope_pediatrico', concentracao: '15mg/5mL', disponivelSUS: true },
      { forma: 'xarope_adulto', concentracao: '30mg/5mL', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: false },
      { forma: 'solucao_gotas', concentracao: '7,5mg/mL', disponivelSUS: false }
    ],
    indicacoes: ['Doenças respiratórias agudas e crônicas com secreção', 'Bronquite', 'DPOC'],
    mecanismoAcao: 'Metabólito ativo da bromexina. Estimula produção de surfactante e secreção serosa, facilitando transporte mucociliar.',
    posologias: [
      {
        indicacao: 'Mucolítico',
        adultos: { dose: '30mg', frequencia: '3x/dia' },
        pediatrico: { dose: '7,5-15mg', frequencia: '2-3x/dia conforme idade' }
      }
    ],
    contraindicacoes: ['Úlcera péptica', 'Primeiro trimestre gestação'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Dor abdominal', 'Alteração paladar'],
      graves: ['Reações cutâneas graves (SJS, muito raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excretado no leite' }
  },

  // ============================================================================
  // ANTITUSSÍGENOS
  // ============================================================================
  {
    id: 'codeina',
    nomeGenerico: 'Codeína',
    nomesComerciais: ['Codein', 'Tylex (combinação)'],
    atcCode: 'R05DA04',
    classeTerapeutica: 'antitussigeno',
    subclasse: 'opioide',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '3mg/mL', disponivelSUS: false }
    ],
    indicacoes: ['Tosse seca intratável', 'Dor leve-moderada'],
    mecanismoAcao: 'Agonista opioide. Suprime reflexo da tosse em nível central (bulbo). Convertida em morfina pelo CYP2D6.',
    posologias: [
      {
        indicacao: 'Tosse',
        adultos: { dose: '10-20mg', frequencia: 'A cada 4-6h', doseMaxima: '120mg/dia' },
        pediatrico: { dose: 'Contraindicado em <12 anos', frequencia: 'N/A' }
      }
    ],
    contraindicacoes: ['<12 anos (tosse)', 'Amamentação', 'Metabolizadores ultrarrápidos CYP2D6', 'Depressão respiratória'],
    precaucoes: ['Risco de dependência', 'Constipação', 'Insuficiência hepática/renal'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Náusea', 'Sonolência', 'Tontura'],
      graves: ['Depressão respiratória', 'Dependência', 'Intoxicação em metabolizadores rápidos']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'grave', efeito: 'Depressão respiratória aditiva', conduta: 'Evitar ou reduzir doses' },
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Contraindicado' },
      { medicamento: 'Inibidores CYP2D6', gravidade: 'moderada', efeito: 'Redução eficácia analgésica', conduta: 'Considerar alternativa' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Contraindicado. Risco de toxicidade opioide no lactente.' }
  },

  {
    id: 'dextrometorfano',
    nomeGenerico: 'Dextrometorfano',
    nomesComerciais: ['Silencium', 'Benalet', 'Vick 44E'],
    atcCode: 'R05DA09',
    classeTerapeutica: 'antitussigeno',
    subclasse: 'nao_opioide',
    rename: false,
    apresentacoes: [
      { forma: 'xarope', concentracao: '15mg/5mL', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: false }
    ],
    indicacoes: ['Tosse seca não produtiva'],
    mecanismoAcao: 'Antagonista NMDA e agonista sigma-1. Suprime tosse centralmente sem efeito analgésico significativo.',
    posologias: [
      {
        indicacao: 'Tosse',
        adultos: { dose: '10-30mg', frequencia: 'A cada 4-8h', doseMaxima: '120mg/dia' },
        pediatrico: { dose: '5-10mg', frequencia: 'A cada 6-8h', observacoes: '>4 anos' }
      }
    ],
    contraindicacoes: ['Uso de IMAO (14 dias)', '<4 anos'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Náusea', 'Sonolência'],
      graves: ['Síndrome serotoninérgica (com ISRS)', 'Abuso (doses altas)']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Contraindicado' },
      { medicamento: 'ISRS', gravidade: 'moderada', efeito: 'Risco serotoninérgico', conduta: 'Cautela' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro em doses usuais' }
  },

  // ============================================================================
  // DESCONGESTIONANTES
  // ============================================================================
  {
    id: 'pseudoefedrina',
    nomeGenerico: 'Pseudoefedrina',
    nomesComerciais: ['Allegra D', 'Claritin D', 'Tylenol Sinus'],
    atcCode: 'R01BA02',
    classeTerapeutica: 'descongestionante',
    subclasse: 'simpatomimetico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: false },
      { forma: 'comprimido_liberacao_prolongada', concentracao: '120mg', disponivelSUS: false }
    ],
    indicacoes: ['Congestão nasal', 'Rinite', 'Sinusite'],
    mecanismoAcao: 'Simpatomimético. Causa vasoconstrição da mucosa nasal por ação em receptores alfa-adrenérgicos.',
    posologias: [
      {
        indicacao: 'Congestão nasal',
        adultos: { dose: '60mg', frequencia: 'A cada 4-6h ou 120mg 12/12h', doseMaxima: '240mg/dia' },
        pediatrico: { dose: '15-30mg', frequencia: 'A cada 6h', observacoes: '>6 anos' }
      }
    ],
    contraindicacoes: ['Hipertensão grave', 'Coronariopatia', 'Uso de IMAO', 'Hipertireoidismo', 'Glaucoma ângulo fechado'],
    precaucoes: ['Hipertensão controlada', 'Diabetes', 'Hiperplasia prostática'],
    efeitosAdversos: {
      comuns: ['Insônia', 'Nervosismo', 'Cefaleia', 'Taquicardia'],
      graves: ['Crise hipertensiva', 'AVC', 'Arritmias']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Crise hipertensiva', conduta: 'Contraindicado' },
      { medicamento: 'Anti-hipertensivos', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Monitorar PA' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Pode reduzir produção de leite' }
  },

  // ============================================================================
  // ANTI-HISTAMÍNICOS (RINITE)
  // ============================================================================
  {
    id: 'loratadina',
    nomeGenerico: 'Loratadina',
    nomesComerciais: ['Claritin', 'Loralerg', 'Histadin'],
    atcCode: 'R06AX13',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'segunda_geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '1mg/mL', disponivelSUS: true }
    ],
    indicacoes: ['Rinite alérgica', 'Urticária crônica', 'Conjuntivite alérgica'],
    mecanismoAcao: 'Anti-histamínico H1 de 2ª geração. Não atravessa barreira hematoencefálica significativamente. Baixa sedação.',
    posologias: [
      {
        indicacao: 'Rinite/Urticária',
        adultos: { dose: '10mg', frequencia: '1x/dia' },
        pediatrico: { dose: '5mg (2-5 anos) ou 10mg (>6 anos)', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Insuficiência hepática (reduzir dose)', 'Idosos'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Sonolência (rara)', 'Fadiga', 'Boca seca'],
      graves: ['Arritmias (muito raro, doses altas)']
    },
    interacoes: [
      { medicamento: 'Cetoconazol', gravidade: 'moderada', efeito: 'Aumento níveis loratadina', conduta: 'Geralmente não significativo' },
      { medicamento: 'Eritromicina', gravidade: 'leve', efeito: 'Aumento níveis', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excretado em pequena quantidade. Seguro.' }
  },

  {
    id: 'desloratadina',
    nomeGenerico: 'Desloratadina',
    nomesComerciais: ['Desalex', 'Clarinex', 'Esalerg'],
    atcCode: 'R06AX27',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'segunda_geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'xarope', concentracao: '0,5mg/mL', disponivelSUS: false }
    ],
    indicacoes: ['Rinite alérgica', 'Urticária crônica idiopática'],
    mecanismoAcao: 'Metabólito ativo da loratadina. Maior afinidade pelo receptor H1. Efeito anti-inflamatório adicional.',
    posologias: [
      {
        indicacao: 'Rinite/Urticária',
        adultos: { dose: '5mg', frequencia: '1x/dia' },
        pediatrico: { dose: '1,25mg (1-5 anos) ou 2,5mg (6-11 anos)', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade a loratadina ou desloratadina'],
    efeitosAdversos: {
      comuns: ['Fadiga', 'Boca seca', 'Cefaleia'],
      graves: ['Reações alérgicas (raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  {
    id: 'fexofenadina',
    nomeGenerico: 'Fexofenadina',
    nomesComerciais: ['Allegra', 'Altiva', 'Fexodane'],
    atcCode: 'R06AX26',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'segunda_geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '120mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '180mg', disponivelSUS: false },
      { forma: 'suspensao_oral', concentracao: '6mg/mL', disponivelSUS: false }
    ],
    indicacoes: ['Rinite alérgica', 'Urticária crônica idiopática'],
    mecanismoAcao: 'Metabólito ativo da terfenadina (retirada). Anti-H1 de 2ª geração sem metabolismo hepático significativo.',
    posologias: [
      {
        indicacao: 'Rinite alérgica',
        adultos: { dose: '120-180mg', frequencia: '1x/dia' },
        pediatrico: { dose: '30mg 2x/dia (2-11 anos)', frequencia: '2x/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Insuficiência renal (ajustar dose)', 'Evitar com suco de frutas (reduz absorção)'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Sonolência', 'Náusea'],
      graves: ['Muito raros']
    },
    interacoes: [
      { medicamento: 'Antiácidos (Al/Mg)', gravidade: 'moderada', efeito: 'Redução absorção', conduta: 'Separar em 2h' },
      { medicamento: 'Suco de frutas', gravidade: 'moderada', efeito: 'Redução absorção 30-40%', conduta: 'Tomar com água' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  // ============================================================================
  // CORTICOIDES NASAIS
  // ============================================================================
  {
    id: 'budesonida-nasal',
    nomeGenerico: 'Budesonida Nasal',
    nomesComerciais: ['Busonid Aquoso', 'Budecort Aqua'],
    atcCode: 'R01AD05',
    classeTerapeutica: 'corticoide_nasal',
    subclasse: 'glicocorticoide',
    rename: true,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '32mcg/dose', disponivelSUS: true },
      { forma: 'spray_nasal', concentracao: '64mcg/dose', disponivelSUS: true },
      { forma: 'spray_nasal', concentracao: '100mcg/dose', disponivelSUS: false }
    ],
    indicacoes: ['Rinite alérgica perene e sazonal', 'Polipose nasal'],
    mecanismoAcao: 'Corticoide tópico nasal. Reduz inflamação, edema, secreção e prurido nasal.',
    posologias: [
      {
        indicacao: 'Rinite alérgica',
        adultos: { dose: '64-256mcg', frequencia: '1-2x/dia em cada narina' },
        pediatrico: { dose: '32-128mcg', frequencia: '1-2x/dia em cada narina', observacoes: '>6 anos' }
      }
    ],
    contraindicacoes: ['Infecções nasais não tratadas', 'Cirurgia nasal recente'],
    efeitosAdversos: {
      comuns: ['Epistaxe', 'Irritação nasal', 'Secura nasal'],
      graves: ['Perfuração septal (raro, uso prolongado)']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Seguro. Absorção sistêmica mínima.' }
  },

  {
    id: 'mometasona-nasal',
    nomeGenerico: 'Mometasona Nasal',
    nomesComerciais: ['Nasonex', 'Budecort', 'Avamys'],
    atcCode: 'R01AD09',
    classeTerapeutica: 'corticoide_nasal',
    subclasse: 'glicocorticoide',
    rename: false,
    apresentacoes: [
      { forma: 'spray_nasal', concentracao: '50mcg/dose', disponivelSUS: false }
    ],
    indicacoes: ['Rinite alérgica', 'Polipose nasal', 'Sinusite crônica'],
    mecanismoAcao: 'Corticoide nasal potente com biodisponibilidade sistêmica muito baixa (<0,1%).',
    posologias: [
      {
        indicacao: 'Rinite alérgica',
        adultos: { dose: '100mcg (2 jatos)', frequencia: '1x/dia em cada narina' },
        pediatrico: { dose: '50mcg (1 jato)', frequencia: '1x/dia em cada narina', observacoes: '>3 anos' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Epistaxe', 'Cefaleia', 'Faringite'],
      graves: ['Perfuração septal (muito raro)']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente seguro' }
  },

  // ============================================================================
  // OXIGENOTERAPIA
  // ============================================================================
  {
    id: 'oxigenio-medicinal',
    nomeGenerico: 'Oxigênio Medicinal',
    nomesComerciais: ['O2 Medicinal'],
    atcCode: 'V03AN01',
    classeTerapeutica: 'gas_medicinal',
    subclasse: 'oxigenio',
    rename: true,
    apresentacoes: [
      { forma: 'gas', concentracao: '99,5%', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipoxemia (SpO2 <92%)',
      'Insuficiência respiratória',
      'IAM',
      'Cefaleia em salvas',
      'Intoxicação por CO'
    ],
    mecanismoAcao: 'Aumenta pressão parcial de O2 alveolar e arterial. Corrige hipoxemia.',
    posologias: [
      {
        indicacao: 'Hipoxemia geral',
        adultos: { dose: 'Titular para SpO2 92-96%', frequencia: 'Contínuo', observacoes: 'DPOC: alvo 88-92%' }
      },
      {
        indicacao: 'Intoxicação CO',
        adultos: { dose: '100% (máscara não-reinalante)', frequencia: 'Contínuo até COHb <3%' }
      }
    ],
    contraindicacoes: ['Nenhuma absoluta em emergência'],
    precaucoes: ['DPOC: evitar hiperóxia (supressão drive respiratório)', 'Toxicidade O2 em altas doses prolongadas'],
    efeitosAdversos: {
      comuns: ['Secura mucosas'],
      graves: ['Atelectasia de absorção', 'Toxicidade pulmonar (FiO2 >60% prolongada)', 'Retinopatia da prematuridade']
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  }
];
