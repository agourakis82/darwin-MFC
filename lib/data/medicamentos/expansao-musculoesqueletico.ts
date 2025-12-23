/**
 * EXPANSÃO MUSCULOESQUELÉTICA - DARWIN-MFC
 * =========================================
 *
 * Medicamentos para condições musculoesqueléticas.
 * Inclui relaxantes musculares, anti-reumáticos, osteoporose.
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosMusculoesqueleticos: Partial<Medicamento>[] = [
  // ============================================================================
  // RELAXANTES MUSCULARES
  // ============================================================================
  {
    id: 'ciclobenzaprina',
    nomeGenerico: 'Ciclobenzaprina',
    nomesComerciais: ['Miosan', 'Mirtax', 'Cizax'],
    atcCode: 'M03BX08',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true }
    ],
    indicacoes: ['Espasmo muscular agudo', 'Lombalgia aguda', 'Cervicalgia', 'Fibromialgia (off-label)'],
    mecanismoAcao: 'Relaxante muscular central, estruturalmente relacionado aos tricíclicos.',
    posologias: [
      {
        indicacao: 'Espasmo muscular',
        adultos: { dose: '5-10mg', frequencia: '3x/dia por 2-3 semanas', doseMaxima: '30mg/dia' }
      }
    ],
    contraindicacoes: ['Uso de IMAO (14 dias)', 'ICC', 'Arritmias', 'Hipertireoidismo', 'IAM recente'],
    precaucoes: ['Sedação', 'Efeitos anticolinérgicos', 'Evitar em idosos'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Boca seca', 'Tontura', 'Fadiga'],
      graves: ['Arritmia', 'Síndrome serotoninérgica', 'Convulsões']
    },
    interacoes: [
      { medicamento: 'IMAOs', gravidade: 'grave', efeito: 'Síndrome serotoninérgica/crise hipertensiva', conduta: 'Contraindicado' },
      { medicamento: 'Depressores SNC', gravidade: 'moderada', efeito: 'Sedação aditiva', conduta: 'Reduzir doses' },
      { medicamento: 'Tramadol', gravidade: 'moderada', efeito: 'Risco convulsões', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Excreção desconhecida' }
  },

  {
    id: 'carisoprodol',
    nomeGenerico: 'Carisoprodol',
    nomesComerciais: ['Mioflex', 'Tandrilax'],
    atcCode: 'M03BA02',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '350mg', disponivelSUS: false }
    ],
    indicacoes: ['Espasmo muscular agudo', 'Condições musculoesqueléticas dolorosas'],
    mecanismoAcao: 'Relaxante muscular central com propriedades sedativas. Metabólito ativo: meprobamato.',
    posologias: [
      {
        indicacao: 'Espasmo muscular',
        adultos: { dose: '250-350mg', frequencia: '3x/dia e ao deitar', observacoes: 'Máximo 2-3 semanas' }
      }
    ],
    contraindicacoes: ['Porfiria', 'Hipersensibilidade'],
    precaucoes: ['Potencial abuso', 'Sedação', 'Síndrome abstinência', 'Não usar cronicamente'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Tontura', 'Cefaleia'],
      graves: ['Dependência', 'Síndrome abstinência', 'Reações idiossincrásicas']
    },
    interacoes: [
      { medicamento: 'Álcool', gravidade: 'moderada', efeito: 'Sedação aumentada', conduta: 'Evitar álcool' },
      { medicamento: 'Opioides', gravidade: 'moderada', efeito: 'Depressão respiratória', conduta: 'Cautela' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excreção significativa' }
  },

  {
    id: 'orfenadrina',
    nomeGenerico: 'Orfenadrina',
    nomesComerciais: ['Dorflex', 'Mio-Citalgan'],
    atcCode: 'M03BC01',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'anticolinergico',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '35mg', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '30mg/ml', disponivelSUS: false }
    ],
    indicacoes: ['Espasmo muscular', 'Dor musculoesquelética'],
    mecanismoAcao: 'Relaxante muscular com propriedades anticolinérgicas e anti-histamínicas.',
    posologias: [
      {
        indicacao: 'Espasmo muscular',
        adultos: { dose: '35mg (com analgésicos)', frequencia: '3-4x/dia' }
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'Hipertrofia prostática', 'Miastenia gravis'],
    precaucoes: ['Efeitos anticolinérgicos', 'Cardiopatas'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Visão borrada', 'Retenção urinária', 'Constipação'],
      graves: ['Arritmias', 'Confusão (idosos)']
    },
    interacoes: [
      { medicamento: 'Anticolinérgicos', gravidade: 'moderada', efeito: 'Potencialização', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excreção desconhecida' }
  },

  {
    id: 'baclofeno',
    nomeGenerico: 'Baclofeno',
    nomesComerciais: ['Lioresal', 'Baclon'],
    atcCode: 'M03BX01',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true }
    ],
    indicacoes: ['Espasticidade (EM, lesão medular, AVC)', 'Neuralgia trigeminal', 'Soluços intratáveis'],
    mecanismoAcao: 'Agonista GABA-B que inibe reflexos espinhais mono e polissinápticos.',
    posologias: [
      {
        indicacao: 'Espasticidade',
        adultos: { dose: '5mg 3x/dia, titular até 20mg 3x/dia', frequencia: 'Ver dose', doseMaxima: '80mg/dia' },
        pediatrico: { dose: '2,5-5mg 3x/dia, titular', frequencia: 'Ver dose', doseMaxima: '60mg/dia' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade', 'Epilepsia não controlada'],
    precaucoes: ['Retirada gradual (convulsões)', 'Reduzir dose em IR', 'Sedação'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Tontura', 'Fraqueza', 'Náusea'],
      graves: ['Síndrome abstinência', 'Convulsões na retirada', 'Depressão respiratória']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'moderada', efeito: 'Sedação', conduta: 'Ajustar doses' },
      { medicamento: 'Anti-hipertensivos', gravidade: 'moderada', efeito: 'Hipotensão', conduta: 'Monitorar PA' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excreção mínima' }
  },

  {
    id: 'tizanidina',
    nomeGenerico: 'Tizanidina',
    nomesComerciais: ['Sirdalud', 'Tizan'],
    atcCode: 'M03BX02',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: false }
    ],
    indicacoes: ['Espasticidade', 'Espasmo muscular agudo'],
    mecanismoAcao: 'Agonista alfa-2 central que reduz liberação de aminoácidos excitatórios.',
    posologias: [
      {
        indicacao: 'Espasticidade',
        adultos: { dose: '2-4mg', frequencia: '8/8h, titular gradualmente', doseMaxima: '36mg/dia' }
      }
    ],
    contraindicacoes: ['Uso de ciprofloxacino/fluvoxamina', 'IH grave'],
    precaucoes: ['Hipotensão', 'Sedação', 'Hepatotoxicidade', 'Retirada gradual'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Boca seca', 'Fraqueza', 'Hipotensão'],
      graves: ['Hepatotoxicidade', 'Alucinações', 'Bradicardia']
    },
    interacoes: [
      { medicamento: 'Ciprofloxacino', gravidade: 'grave', efeito: 'Aumenta tizanidina 10x', conduta: 'Contraindicado' },
      { medicamento: 'Fluvoxamina', gravidade: 'grave', efeito: 'Aumenta tizanidina 33x', conduta: 'Contraindicado' },
      { medicamento: 'Anti-hipertensivos', gravidade: 'moderada', efeito: 'Hipotensão', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  // ============================================================================
  // ANTI-INFLAMATÓRIOS/ANALGÉSICOS
  // ============================================================================
  {
    id: 'meloxicam',
    nomeGenerico: 'Meloxicam',
    nomesComerciais: ['Movatec', 'Meloxil'],
    atcCode: 'M01AC06',
    classeTerapeutica: 'aine',
    subclasse: 'seletivo_cox2',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '7,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: true }
    ],
    indicacoes: ['Osteoartrite', 'Artrite reumatoide', 'Espondilite anquilosante'],
    mecanismoAcao: 'AINE com seletividade preferencial para COX-2.',
    posologias: [
      {
        indicacao: 'Osteoartrite',
        adultos: { dose: '7,5mg', frequencia: '1x/dia', doseMaxima: '15mg/dia' }
      },
      {
        indicacao: 'AR/EA',
        adultos: { dose: '15mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Alergia a AINEs', 'Úlcera ativa', 'IRC grave', 'ICC grave', 'Pós-operatório CRM'],
    precaucoes: ['Risco CV aumentado', 'Monitorar função renal', 'Risco GI menor que não-seletivos'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Náusea', 'Cefaleia', 'Edema'],
      graves: ['Sangramento GI', 'IRA', 'Eventos CV']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'moderada', efeito: 'Sangramento', conduta: 'Monitorar' },
      { medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'Reduz efeito anti-hipertensivo', conduta: 'Monitorar PA/Cr' },
      { medicamento: 'Lítio', gravidade: 'moderada', efeito: 'Aumenta níveis Li', conduta: 'Monitorar Li' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excreção mínima' }
  },

  {
    id: 'celecoxibe',
    nomeGenerico: 'Celecoxibe',
    nomesComerciais: ['Celebra', 'Celoxib'],
    atcCode: 'M01AH01',
    classeTerapeutica: 'aine',
    subclasse: 'seletivo_cox2',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '200mg', disponivelSUS: false }
    ],
    indicacoes: ['Osteoartrite', 'Artrite reumatoide', 'Espondilite anquilosante', 'Dor aguda'],
    mecanismoAcao: 'Inibidor seletivo COX-2, menor toxicidade GI.',
    posologias: [
      {
        indicacao: 'OA',
        adultos: { dose: '200mg', frequencia: '1x/dia ou 100mg 2x/dia' }
      },
      {
        indicacao: 'AR',
        adultos: { dose: '100-200mg', frequencia: '2x/dia' }
      }
    ],
    contraindicacoes: ['Alergia sulfonamidas', 'Doença CV estabelecida', 'Pós-CRM'],
    precaucoes: ['Risco CV (dose-dependente)', 'Menor toxicidade GI', 'IR/IH'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Diarreia', 'Dispepsia'],
      graves: ['IAM', 'AVC', 'Sangramento GI']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumenta INR', conduta: 'Monitorar INR' },
      { medicamento: 'Fluconazol', gravidade: 'moderada', efeito: 'Aumenta celecoxibe', conduta: 'Reduzir dose' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excreção mínima' }
  },

  {
    id: 'piroxicam',
    nomeGenerico: 'Piroxicam',
    nomesComerciais: ['Feldene', 'Inflamene'],
    atcCode: 'M01AC01',
    classeTerapeutica: 'aine',
    subclasse: 'nao_seletivo',
    rename: true,
    apresentacoes: [
      { forma: 'capsula', concentracao: '20mg', disponivelSUS: true },
      { forma: 'gel', concentracao: '0,5%', disponivelSUS: false }
    ],
    indicacoes: ['Osteoartrite', 'Artrite reumatoide', 'Espondilite anquilosante'],
    mecanismoAcao: 'AINE com meia-vida longa (50h). Inibe COX-1 e COX-2.',
    posologias: [
      {
        indicacao: 'Artrite',
        adultos: { dose: '20mg', frequencia: '1x/dia' }
      }
    ],
    contraindicacoes: ['Úlcera ativa', 'IR grave', 'Alergia AINEs', 'Gestação 3º tri'],
    precaucoes: ['Meia-vida longa', 'Maior risco GI', 'Reações cutâneas graves'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Náusea', 'Edema'],
      graves: ['Úlcera/sangramento GI', 'Síndrome Stevens-Johnson', 'IRA']
    },
    interacoes: [
      { medicamento: 'Anticoagulantes', gravidade: 'grave', efeito: 'Sangramento', conduta: 'Evitar' },
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Toxicidade MTX', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excreção baixa' }
  },

  {
    id: 'naproxeno',
    nomeGenerico: 'Naproxeno',
    nomesComerciais: ['Naprosyn', 'Flanax'],
    atcCode: 'M01AE02',
    classeTerapeutica: 'aine',
    subclasse: 'nao_seletivo',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '250mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true }
    ],
    indicacoes: ['Dor leve-moderada', 'Artrite', 'Dismenorreia', 'Gota aguda', 'Tendinite'],
    mecanismoAcao: 'AINE com menor risco CV comparado a outros AINEs.',
    posologias: [
      {
        indicacao: 'Dor/Artrite',
        adultos: { dose: '250-500mg', frequencia: '12/12h', doseMaxima: '1500mg/dia' }
      },
      {
        indicacao: 'Gota aguda',
        adultos: { dose: '750mg inicial, depois 250mg', frequencia: '8/8h' }
      }
    ],
    contraindicacoes: ['Alergia AINEs', 'Úlcera ativa', 'IR grave'],
    precaucoes: ['Menor risco CV', 'Risco GI moderado', 'Tomar com alimentos'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Cefaleia', 'Tontura'],
      graves: ['Sangramento GI', 'IRA', 'Reações alérgicas']
    },
    interacoes: [
      { medicamento: 'Lítio', gravidade: 'moderada', efeito: 'Aumenta Li', conduta: 'Monitorar' },
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Toxicidade', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Usar com cautela' }
  },

  // ============================================================================
  // OSTEOPOROSE
  // ============================================================================
  {
    id: 'alendronato',
    nomeGenerico: 'Alendronato de Sódio',
    nomesComerciais: ['Fosamax', 'Ostenan'],
    atcCode: 'M05BA04',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '70mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true }
    ],
    indicacoes: ['Osteoporose', 'Osteoporose por corticoides', 'Doença de Paget'],
    mecanismoAcao: 'Bisfosfonato que inibe reabsorção óssea osteoclástica.',
    posologias: [
      {
        indicacao: 'Osteoporose',
        adultos: { dose: '70mg', frequencia: '1x/semana em jejum', observacoes: 'Permanecer em pé 30min' }
      }
    ],
    contraindicacoes: ['Incapacidade de permanecer em pé', 'Hipocalcemia', 'Estenose/acalasia esofágica', 'IR grave (ClCr<35)'],
    precaucoes: ['Tomar em jejum', 'Não deitar 30min', 'Corrigir hipocalcemia antes', 'Saúde bucal'],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Dor abdominal', 'Constipação'],
      graves: ['Esofagite/úlcera esofágica', 'Osteonecrose mandibular', 'Fratura atípica fêmur']
    },
    interacoes: [
      { medicamento: 'Cálcio/antiácidos', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 30min+' },
      { medicamento: 'AINEs', gravidade: 'leve', efeito: 'Risco GI aditivo', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  {
    id: 'risedronato',
    nomeGenerico: 'Risedronato de Sódio',
    nomesComerciais: ['Actonel', 'Osteotrat'],
    atcCode: 'M05BA07',
    classeTerapeutica: 'outros',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '35mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '150mg', disponivelSUS: false }
    ],
    indicacoes: ['Osteoporose', 'Doença de Paget', 'Osteoporose por corticoides'],
    mecanismoAcao: 'Bisfosfonato com alta afinidade por osso.',
    posologias: [
      {
        indicacao: 'Osteoporose',
        adultos: { dose: '35mg semanal ou 150mg mensal', frequencia: 'Ver dose' }
      }
    ],
    contraindicacoes: ['Hipocalcemia', 'IR grave', 'Anormalidades esofágicas'],
    precaucoes: ['Similar alendronato', 'Suplementar Ca e Vit D'],
    efeitosAdversos: {
      comuns: ['Dor abdominal', 'Dispepsia', 'Artralgia'],
      graves: ['Osteonecrose mandibular', 'Fratura atípica', 'Reação fase aguda']
    },
    interacoes: [
      { medicamento: 'Cálcio/antiácidos', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' }
  },

  {
    id: 'calcio-vitamina-d',
    nomeGenerico: 'Cálcio + Vitamina D',
    nomesComerciais: ['Caltrate D', 'Os-Cal D', 'Calcigenol'],
    atcCode: 'A12AX',
    classeTerapeutica: 'suplemento',
    subclasse: 'vitamina_d',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: 'Ca 600mg + Vit D 400UI', disponivelSUS: true },
      { forma: 'comprimido', concentracao: 'Ca 500mg + Vit D 200UI', disponivelSUS: true }
    ],
    indicacoes: ['Suplementação Ca/Vit D', 'Prevenção osteoporose', 'Adjuvante tratamento osteoporose'],
    mecanismoAcao: 'Cálcio para mineralização óssea. Vitamina D para absorção intestinal de Ca.',
    posologias: [
      {
        indicacao: 'Suplementação',
        adultos: { dose: 'Ca 1000-1200mg/dia + Vit D 800-1000UI/dia', frequencia: 'Dividido em doses' }
      }
    ],
    contraindicacoes: ['Hipercalcemia', 'Hipercalciúria', 'Nefrolitíase cálcica recorrente'],
    precaucoes: ['Monitorar cálcio', 'Tomar com refeições (carbonato)', 'Não exceder doses'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Flatulência', 'Náusea'],
      graves: ['Hipercalcemia', 'Nefrolitíase']
    },
    interacoes: [
      { medicamento: 'Bisfosfonatos', gravidade: 'moderada', efeito: 'Reduz absorção', conduta: 'Separar 30min+' },
      { medicamento: 'Levotiroxina', gravidade: 'moderada', efeito: 'Reduz absorção T4', conduta: 'Separar 4h' },
      { medicamento: 'Tiazídicos', gravidade: 'leve', efeito: 'Hipercalcemia', conduta: 'Monitorar Ca' }
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Compatível' }
  },

  // ============================================================================
  // ANTI-REUMÁTICOS
  // ============================================================================
  {
    id: 'metotrexato-reumatologia',
    nomeGenerico: 'Metotrexato',
    nomesComerciais: ['Methotrex', 'Teva'],
    atcCode: 'L01BA01',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,5mg', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '25mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Artrite reumatoide', 'Psoríase', 'Artrite psoriásica', 'AIJ'],
    mecanismoAcao: 'Antimetabólito que inibe dihidrofolato redutase. Imunomodulador.',
    posologias: [
      {
        indicacao: 'Artrite reumatoide',
        adultos: { dose: '7,5-25mg', frequencia: '1x/semana (dose única)', doseMaxima: '25mg/semana' }
      }
    ],
    contraindicacoes: ['Gestação', 'IH grave', 'IR grave', 'Imunossupressão grave', 'Discrasias sanguíneas'],
    precaucoes: ['Suplementar ácido fólico', 'Monitorar hemograma/TFH/TFR', 'Interromper em infecção'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Estomatite', 'Fadiga', 'Alopecia'],
      graves: ['Mielossupressão', 'Hepatotoxicidade', 'Pneumonite', 'Infecções graves']
    },
    interacoes: [
      { medicamento: 'AINEs', gravidade: 'moderada', efeito: 'Aumenta toxicidade MTX', conduta: 'Monitorar' },
      { medicamento: 'Trimetoprima', gravidade: 'grave', efeito: 'Mielossupressão', conduta: 'Evitar' },
      { medicamento: 'Penicilinas', gravidade: 'moderada', efeito: 'Reduz excreção MTX', conduta: 'Monitorar' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },

  {
    id: 'leflunomida',
    nomeGenerico: 'Leflunomida',
    nomesComerciais: ['Arava', 'Lefunomida'],
    atcCode: 'L04AA13',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: true }
    ],
    indicacoes: ['Artrite reumatoide', 'Artrite psoriásica'],
    mecanismoAcao: 'Inibe dihidroorotato desidrogenase, bloqueando síntese de pirimidinas em linfócitos.',
    posologias: [
      {
        indicacao: 'Artrite reumatoide',
        adultos: { dose: '100mg/dia por 3 dias (ataque), depois 20mg/dia', frequencia: 'Ver dose' }
      }
    ],
    contraindicacoes: ['Gestação', 'IH grave', 'Imunossupressão grave', 'Infecção ativa'],
    precaucoes: ['Meia-vida muito longa (2 semanas)', 'Washout com colestiramina se necessário'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náusea', 'Alopecia', 'Rash'],
      graves: ['Hepatotoxicidade', 'Mielossupressão', 'Pneumonite intersticial', 'Neuropatia']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumenta INR', conduta: 'Monitorar INR' },
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Hepatotoxicidade aditiva', conduta: 'Monitorar TFH' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado' }
  },

  {
    id: 'sulfassalazina-reumatologia',
    nomeGenerico: 'Sulfassalazina',
    nomesComerciais: ['Azulfin', 'Salazopyrin'],
    atcCode: 'A07EC01',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'aminossalicilato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true }
    ],
    indicacoes: ['Artrite reumatoide', 'Espondiloartrites', 'DII (colite, Crohn)'],
    mecanismoAcao: 'Pró-droga: 5-ASA (anti-inflamatório intestinal) + sulfapiridina (antibacteriano/imunomodulador).',
    posologias: [
      {
        indicacao: 'Artrite reumatoide',
        adultos: { dose: '500mg 2x/dia, titular até 2-3g/dia', frequencia: 'Ver dose' }
      }
    ],
    contraindicacoes: ['Alergia a sulfonamidas/salicilatos', 'Porfiria', 'Obstrução GI/urinária'],
    precaucoes: ['Suplementar ácido fólico', 'Monitorar hemograma', 'Oligospermia reversível'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Cefaleia', 'Rash', 'Urina amarelo-alaranjada'],
      graves: ['Agranulocitose', 'Anemia aplástica', 'Hepatotoxicidade', 'Síndrome Stevens-Johnson']
    },
    interacoes: [
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Reduz absorção digoxina', conduta: 'Monitorar' },
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Aumenta toxicidade MTX', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Com cautela (kernicterus teórico)' }
  },

  {
    id: 'colchicina',
    nomeGenerico: 'Colchicina',
    nomesComerciais: ['Colchis', 'Colcrys'],
    atcCode: 'M04AC01',
    classeTerapeutica: 'antigotoso',
    subclasse: 'outros',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true }
    ],
    indicacoes: ['Gota aguda', 'Profilaxia gota', 'Pericardite', 'Febre mediterrânea familiar'],
    mecanismoAcao: 'Inibe polimerização de microtúbulos, reduzindo migração de neutrófilos e inflamação.',
    posologias: [
      {
        indicacao: 'Gota aguda',
        adultos: { dose: '1mg seguido de 0,5mg após 1h', frequencia: 'Dose total máx 1,5mg/ataque' }
      },
      {
        indicacao: 'Profilaxia gota',
        adultos: { dose: '0,5mg', frequencia: '1-2x/dia' }
      }
    ],
    contraindicacoes: ['IR/IH graves', 'Discrasias sanguíneas', 'Uso de inibidores fortes CYP3A4/P-gp com IR/IH'],
    precaucoes: ['Janela terapêutica estreita', 'Ajustar em IR/IH', 'Não repetir ataque <3 dias'],
    efeitosAdversos: {
      comuns: ['Diarreia', 'Náusea', 'Vômitos', 'Dor abdominal'],
      graves: ['Mielossupressão', 'Miopatia', 'Neuropatia', 'Toxicidade multiorgânica']
    },
    interacoes: [
      { medicamento: 'Claritromicina', gravidade: 'grave', efeito: 'Toxicidade colchicina', conduta: 'Reduzir dose ou evitar' },
      { medicamento: 'Estatinas', gravidade: 'moderada', efeito: 'Miopatia aditiva', conduta: 'Monitorar' },
      { medicamento: 'Ciclosporina', gravidade: 'grave', efeito: 'Toxicidade', conduta: 'Reduzir dose' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em doses baixas' }
  }
];
