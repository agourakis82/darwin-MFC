/**
 * ANTI-HISTAMINICOS NOVOS - DARWIN-MFC EXPANSAO 1000
 * ===================================================
 * Anti-histaminicos H1 de primeira e segunda geracao
 *
 * Referencias:
 * - ARIA Guidelines (Allergic Rhinitis and its Impact on Asthma)
 * - EAACI Guidelines on Allergic Rhinitis
 * - ACAAI/AAAAI Joint Task Force on Practice Parameters
 * - Micromedex Drug Information
 * - UpToDate Drug Monographs
 */

import { Medicamento } from '@/lib/types/medicamento';

export const antiHistaminicosNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // SEGUNDA GERACAO (NAO SEDATIVOS)
  // =============================================================================
  {
    id: 'cetirizina',
    nomeGenerico: 'Cetirizina dicloridrato',
    nomesComerciais: ['Zyrtec', 'Reactine', 'Zetalerg', 'Cetrizin'],
    atcCode: 'R06AE07',
    rxNormCui: '20610',
    drugBankId: 'DB00341',
    snomedCT: '372523007',
    casNumber: '83881-51-0',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'gotas', concentracao: '10mg/mL', disponivelSUS: true },
      { forma: 'xarope', concentracao: '1mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Rinite alergica sazonal e perene',
      'Urticaria cronica idiopatica',
      'Conjuntivite alergica',
      'Dermatite atopica (coadjuvante)',
      'Prurido alergico',
    ],
    mecanismoAcao: 'Antagonista seletivo dos receptores H1 de histamina de segunda geracao. Metabolito ativo da hidroxizina com baixa penetracao na barreira hematoencefalica, resultando em menor efeito sedativo. Inibe a liberacao de histamina e outros mediadores de mastocitos. Inicio de acao em 1 hora, duracao de 24 horas.',
    posologias: [
      {
        indicacao: 'Rinite alergica/Urticaria',
        adultos: {
          dose: '10mg',
          frequencia: '1x/dia',
          doseMaxima: '10mg/dia',
          observacoes: 'Pode ser dividido em 5mg 2x/dia',
        },
        pediatrico: {
          dose: '6 meses-2 anos: 2,5mg 1x/dia; 2-6 anos: 2,5mg 2x/dia ou 5mg 1x/dia; >6 anos: 5-10mg 1x/dia',
          frequencia: '1-2x/dia conforme idade',
          idadeMinima: '6 meses',
        },
        idosos: {
          dose: '5mg 1x/dia (iniciar)',
          observacoes: 'Ajustar conforme funcao renal',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a cetirizina, hidroxizina ou piperazinas',
      'DRC grave (TFG <10) sem dialise',
      'Insuficiencia hepatica grave',
    ],
    precaucoes: [
      'Pode causar leve sedacao (menos que 1a geracao)',
      'Cautela ao dirigir ou operar maquinarios',
      'Ajustar dose em insuficiencia renal',
      'Retencao urinaria - cautela em HPB',
      'Evitar uso com depressores do SNC',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia (11%)', 'Cefaleia', 'Boca seca', 'Fadiga', 'Tontura'],
      graves: ['Broncoespasmo paradoxal', 'Reacoes anafilacticas (raro)', 'Convulsoes (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Alcool',
        gravidade: 'moderada',
        efeito: 'Aumento do efeito sedativo',
        conduta: 'Evitar consumo de alcool',
      },
      {
        medicamento: 'Depressores do SNC (benzodiazepinicos, opioides)',
        gravidade: 'moderada',
        efeito: 'Sedacao aditiva',
        conduta: 'Usar com cautela; monitorar sedacao',
      },
      {
        medicamento: 'Teofilina',
        gravidade: 'leve',
        efeito: 'Pequena reducao da depuracao de cetirizina',
        conduta: 'Geralmente sem significancia clinica',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>80', ajuste: 'Sem ajuste' },
      { tfg: '50-80', ajuste: '5mg 1x/dia' },
      { tfg: '30-50', ajuste: '5mg em dias alternados' },
      { tfg: '<30', ajuste: '5mg 2x/semana; hemodialise: evitar' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excretado no leite em pequenas quantidades; usar com cautela' },
    monitorizacao: [
      'Resposta clinica aos sintomas alergicos',
      'Nivel de sedacao',
      'Funcao renal em uso prolongado',
    ],
    orientacoesPaciente: [
      'Pode ser tomado com ou sem alimentos',
      'Pode causar leve sonolencia - evitar dirigir ate conhecer resposta',
      'Nao consumir alcool',
      'Efeito em 1 hora, duracao 24 horas',
    ],
    consideracoesEspeciais: {
      idosos: 'Iniciar com 5mg; maior risco de sedacao',
      hepatopatas: 'Reduzir dose em 50%',
      pediatrico: 'Aprovado a partir de 6 meses',
    },
    doencasRelacionadas: ['rinite-alergica', 'urticaria', 'conjuntivite-alergica', 'dermatite-atopica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-histaminico', 'segunda-geracao', 'cetirizina', 'rinite', 'urticaria', 'RENAME'],
  },

  {
    id: 'loratadina',
    nomeGenerico: 'Loratadina',
    nomesComerciais: ['Claritin', 'Loratamed', 'Loralerg', 'Histadin'],
    atcCode: 'R06AX13',
    rxNormCui: '28889',
    drugBankId: 'DB00455',
    snomedCT: '386884002',
    casNumber: '79794-75-5',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '1mg/mL', disponivelSUS: true },
      { forma: 'comprimido_orodispersivel', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Rinite alergica sazonal e perene',
      'Urticaria cronica idiopatica',
      'Conjuntivite alergica',
      'Prurido associado a alergias',
    ],
    mecanismoAcao: 'Antagonista seletivo dos receptores H1 perifericos de segunda geracao. Praticamente nao atravessa a barreira hematoencefalica, resultando em baixa incidencia de sedacao (<4%). Metabolizado a desloratadina (metabolito ativo). Inicio de acao em 1-3 horas, duracao de 24 horas.',
    posologias: [
      {
        indicacao: 'Rinite alergica/Urticaria',
        adultos: {
          dose: '10mg',
          frequencia: '1x/dia',
          doseMaxima: '10mg/dia',
        },
        pediatrico: {
          dose: '2-5 anos: 5mg 1x/dia; >=6 anos: 10mg 1x/dia',
          frequencia: '1x/dia',
          idadeMinima: '2 anos',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a loratadina ou desloratadina',
    ],
    precaucoes: [
      'Ajustar dose em insuficiencia hepatica',
      'Ajustar dose em insuficiencia renal',
      'Minima sedacao, mas cautela ao dirigir',
      'Fenilcetonuricos: formulacoes orodispersiveis podem conter aspartame',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Sonolencia (<4%)', 'Fadiga', 'Boca seca', 'Nervosismo em criancas'],
      graves: ['Taquicardia (raro)', 'Reacoes anafilacticas (muito raro)'],
    },
    interacoes: [
      {
        medicamento: 'Cetoconazol, eritromicina',
        gravidade: 'leve',
        efeito: 'Aumento dos niveis de loratadina',
        conduta: 'Sem significancia clinica - sem ajuste',
      },
      {
        medicamento: 'Cimetidina',
        gravidade: 'leve',
        efeito: 'Aumento dos niveis de loratadina',
        conduta: 'Geralmente sem ajuste necessario',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: '10mg em dias alternados' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excretado em pequenas quantidades; compativel com cautela' },
    monitorizacao: [
      'Resposta clinica',
      'Efeitos adversos',
    ],
    orientacoesPaciente: [
      'Tomar com ou sem alimentos',
      'Nao exceder dose recomendada',
      'Baixo risco de sedacao mas evitar alcool',
      'Disponivel sem prescricao',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; bem tolerado',
      hepatopatas: '10mg em dias alternados',
      pediatrico: 'Aprovado a partir de 2 anos',
    },
    doencasRelacionadas: ['rinite-alergica', 'urticaria', 'conjuntivite-alergica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-histaminico', 'segunda-geracao', 'loratadina', 'rinite', 'urticaria', 'RENAME', 'OTC'],
  },

  {
    id: 'fexofenadina',
    nomeGenerico: 'Fexofenadina cloridrato',
    nomesComerciais: ['Allegra', 'Telfast', 'Altiva', 'Fexodane'],
    atcCode: 'R06AX26',
    rxNormCui: '25536',
    drugBankId: 'DB00950',
    snomedCT: '372523007',
    casNumber: '83799-24-0',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '120mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '180mg', disponivelSUS: false },
      { forma: 'suspensao_oral', concentracao: '6mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Rinite alergica sazonal e perene',
      'Urticaria cronica idiopatica',
      'Conjuntivite alergica',
    ],
    mecanismoAcao: 'Antagonista seletivo dos receptores H1 de terceira geracao (metabolito ativo da terfenadina). NAO atravessa a barreira hematoencefalica - virtualmente sem sedacao. Nao sofre metabolismo hepatico significativo, sendo excretado principalmente inalterado. Inicio de acao em 1 hora, duracao de 24 horas. Nao prolonga QT (diferente da terfenadina).',
    posologias: [
      {
        indicacao: 'Rinite alergica',
        adultos: {
          dose: '120mg ou 180mg',
          frequencia: '1x/dia (180mg) ou 60mg 2x/dia',
          observacoes: '180mg preferido para rinite; 60mg 2x/dia tambem eficaz',
        },
        pediatrico: {
          dose: '6-11 anos: 30mg 2x/dia; >=12 anos: dose de adulto',
          frequencia: '2x/dia (criancas) ou 1x/dia (adolescentes)',
          idadeMinima: '6 anos',
        },
      },
      {
        indicacao: 'Urticaria cronica',
        adultos: {
          dose: '180mg',
          frequencia: '1x/dia',
          doseMaxima: '180mg/dia (doses maiores off-label ate 360mg)',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a fexofenadina ou terfenadina',
    ],
    precaucoes: [
      'Ajustar dose em insuficiencia renal',
      'Evitar sucos de frutas (reduzem absorcao)',
      'Praticamente sem sedacao',
      'Segura do ponto de vista cardiovascular',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Nauseas', 'Tontura', 'Dismenorreia', 'Fadiga'],
      graves: ['Reacoes de hipersensibilidade (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Suco de laranja, maca, grapefruit',
        gravidade: 'moderada',
        efeito: 'Reducao de 30-40% na absorcao',
        conduta: 'Tomar com agua; evitar sucos nas 4 horas antes/depois',
      },
      {
        medicamento: 'Antiacidos com aluminio/magnesio',
        gravidade: 'moderada',
        efeito: 'Reducao da absorcao',
        conduta: 'Separar administracao em 2-4 horas',
      },
      {
        medicamento: 'Eritromicina, cetoconazol',
        gravidade: 'leve',
        efeito: 'Aumento dos niveis de fexofenadina',
        conduta: 'Sem significancia clinica relevante',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>80', ajuste: 'Sem ajuste' },
      { tfg: '<80', ajuste: '60mg 1x/dia (adultos); 30mg 1x/dia (criancas)' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; evitar' },
    monitorizacao: [
      'Resposta clinica',
      'Tolerabilidade',
    ],
    orientacoesPaciente: [
      'Tomar com AGUA - evitar sucos de frutas',
      'Praticamente sem sonolencia',
      'Pode ser tomado com ou sem alimentos (mas evitar sucos)',
      'Nao exceder dose recomendada',
    ],
    consideracoesEspeciais: {
      idosos: 'Ajustar conforme funcao renal',
      pediatrico: 'Aprovado a partir de 6 anos',
    },
    doencasRelacionadas: ['rinite-alergica', 'urticaria', 'conjuntivite-alergica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-histaminico', 'terceira-geracao', 'fexofenadina', 'nao-sedativo', 'rinite', 'urticaria'],
  },

  {
    id: 'desloratadina',
    nomeGenerico: 'Desloratadina',
    nomesComerciais: ['Desalex', 'Clarinex', 'Aerius', 'Esloratadina'],
    atcCode: 'R06AX27',
    rxNormCui: '311372',
    drugBankId: 'DB00967',
    snomedCT: '396015008',
    casNumber: '100643-71-8',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'xarope', concentracao: '0,5mg/mL', disponivelSUS: false },
      { forma: 'comprimido_orodispersivel', concentracao: '5mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Rinite alergica sazonal e perene',
      'Urticaria cronica idiopatica',
      'Conjuntivite alergica',
    ],
    mecanismoAcao: 'Metabolito ativo principal da loratadina, antagonista seletivo dos receptores H1 perifericos. Maior afinidade pelo receptor H1 que loratadina. Nao atravessa barreira hematoencefalica significativamente. Alem de anti-histaminico, possui atividade anti-inflamatoria (inibe liberacao de citocinas). Inicio em 1 hora, duracao >24 horas.',
    posologias: [
      {
        indicacao: 'Rinite alergica/Urticaria',
        adultos: {
          dose: '5mg',
          frequencia: '1x/dia',
          doseMaxima: '5mg/dia',
        },
        pediatrico: {
          dose: '6 meses-1 ano: 1mg 1x/dia; 1-5 anos: 1,25mg 1x/dia; 6-11 anos: 2,5mg 1x/dia; >=12 anos: 5mg',
          frequencia: '1x/dia',
          idadeMinima: '6 meses',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a desloratadina ou loratadina',
    ],
    precaucoes: [
      'Ajustar intervalo em insuficiencia renal ou hepatica',
      'Fenilcetonuricos: verificar formulacoes com aspartame',
      'Minima sedacao',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Boca seca', 'Fadiga', 'Faringite', 'Mialgia'],
      graves: ['Taquicardia (muito raro)', 'Reacoes de hipersensibilidade (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Cetoconazol, eritromicina',
        gravidade: 'leve',
        efeito: 'Aumento dos niveis de desloratadina',
        conduta: 'Sem significancia clinica',
      },
      {
        medicamento: 'Fluoxetina',
        gravidade: 'leve',
        efeito: 'Pequeno aumento da exposicao',
        conduta: 'Sem ajuste necessario',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '<50', ajuste: '5mg em dias alternados' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Excretado no leite; usar com cautela' },
    monitorizacao: [
      'Resposta clinica',
      'Tolerabilidade',
    ],
    orientacoesPaciente: [
      'Pode ser tomado com ou sem alimentos',
      'Baixo risco de sonolencia',
      'Nao necessita ajuste com alimentos',
      'Comprimido orodispersivel dissolve na boca',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; boa tolerabilidade',
      hepatopatas: '5mg em dias alternados',
      pediatrico: 'Aprovado a partir de 6 meses',
    },
    doencasRelacionadas: ['rinite-alergica', 'urticaria', 'conjuntivite-alergica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-histaminico', 'segunda-geracao', 'desloratadina', 'metabolito-ativo', 'rinite'],
  },

  {
    id: 'levocetirizina',
    nomeGenerico: 'Levocetirizina dicloridrato',
    nomesComerciais: ['Zyxem', 'Xyzal', 'Levocet'],
    atcCode: 'R06AE09',
    rxNormCui: '352057',
    drugBankId: 'DB01299',
    snomedCT: '421747003',
    casNumber: '130018-77-8',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'gotas', concentracao: '5mg/mL', disponivelSUS: false },
      { forma: 'xarope', concentracao: '0,5mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Rinite alergica sazonal e perene',
      'Urticaria cronica idiopatica',
      'Conjuntivite alergica',
      'Dermatite atopica (prurido)',
    ],
    mecanismoAcao: 'Enantiomero R (ativo) da cetirizina. Possui o dobro da afinidade pelo receptor H1 em comparacao a cetirizina racemica, permitindo metade da dose. Antagonista potente e seletivo do receptor H1 periferico com baixa penetracao no SNC. Inicio em 1 hora, duracao de 24 horas.',
    posologias: [
      {
        indicacao: 'Rinite alergica/Urticaria',
        adultos: {
          dose: '5mg',
          frequencia: '1x/dia (noite preferido)',
          doseMaxima: '5mg/dia',
        },
        pediatrico: {
          dose: '6 meses-5 anos: 1,25mg 1x/dia; 6-11 anos: 2,5mg 1x/dia; >=12 anos: 5mg 1x/dia',
          frequencia: '1x/dia',
          idadeMinima: '6 meses',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a levocetirizina, cetirizina ou piperazinas',
      'DRC terminal (TFG <10) sem dialise',
      'Criancas <6 meses',
    ],
    precaucoes: [
      'Ajustar dose em insuficiencia renal',
      'Pode causar sonolencia leve',
      'Cautela ao dirigir',
      'Evitar alcool',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia', 'Cefaleia', 'Boca seca', 'Fadiga', 'Nasofaringite'],
      graves: ['Retencao urinaria (raro)', 'Reacoes anafilacticas (muito raro)'],
    },
    interacoes: [
      {
        medicamento: 'Alcool',
        gravidade: 'moderada',
        efeito: 'Aumento da sedacao',
        conduta: 'Evitar consumo de alcool',
      },
      {
        medicamento: 'Depressores do SNC',
        gravidade: 'moderada',
        efeito: 'Sedacao aditiva',
        conduta: 'Usar com cautela',
      },
      {
        medicamento: 'Ritonavir',
        gravidade: 'leve',
        efeito: 'Aumento da exposicao a levocetirizina',
        conduta: 'Monitorar efeitos adversos',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>80', ajuste: 'Sem ajuste' },
      { tfg: '50-80', ajuste: '2,5mg 1x/dia' },
      { tfg: '30-50', ajuste: '2,5mg em dias alternados' },
      { tfg: '10-30', ajuste: '2,5mg 2x/semana' },
      { tfg: '<10', ajuste: 'Contraindicado' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Excretado no leite; evitar' },
    monitorizacao: [
      'Resposta clinica',
      'Nivel de sedacao',
      'Funcao renal',
    ],
    orientacoesPaciente: [
      'Pode ser tomado com ou sem alimentos',
      'Tomar a noite se causar sonolencia',
      'Evitar alcool',
      'Metade da dose da cetirizina com mesma eficacia',
    ],
    consideracoesEspeciais: {
      idosos: 'Ajustar conforme funcao renal',
      hepatopatas: 'Sem ajuste hepatico (excrecao renal)',
      pediatrico: 'Aprovado a partir de 6 meses',
    },
    doencasRelacionadas: ['rinite-alergica', 'urticaria', 'conjuntivite-alergica', 'dermatite-atopica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-histaminico', 'segunda-geracao', 'levocetirizina', 'enantiomero-ativo', 'rinite'],
  },

  {
    id: 'bilastina',
    nomeGenerico: 'Bilastina',
    nomesComerciais: ['Alektos', 'Bilaxten', 'Bitosen'],
    atcCode: 'R06AX29',
    rxNormCui: '1117531',
    drugBankId: 'DB11591',
    snomedCT: '703125003',
    casNumber: '202189-78-4',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '2,5mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Rinite alergica sazonal e perene',
      'Urticaria cronica espontanea',
    ],
    mecanismoAcao: 'Antagonista seletivo do receptor H1 de segunda geracao. NAO atravessa barreira hematoencefalica (substrato da glicoproteina-P que impede entrada no SNC). NAO sofre metabolismo hepatico significativo. Sem efeitos anticolinergicos ou antisserotoninergicos. Inicio em 1 hora, duracao >24 horas.',
    posologias: [
      {
        indicacao: 'Rinite alergica/Urticaria',
        adultos: {
          dose: '20mg',
          frequencia: '1x/dia em jejum (1 hora antes ou 2 horas apos refeicao)',
          doseMaxima: '20mg/dia',
        },
        pediatrico: {
          dose: '6-11 anos (>=20kg): 10mg 1x/dia; >=12 anos: 20mg 1x/dia',
          frequencia: '1x/dia em jejum',
          idadeMinima: '6 anos',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a bilastina',
    ],
    precaucoes: [
      'DEVE ser tomado em jejum (alimentos reduzem absorcao em 30%)',
      'Evitar suco de grapefruit',
      'Nao requer ajuste renal ou hepatico',
      'Praticamente sem sedacao',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Sonolencia (<3%)', 'Tontura', 'Fadiga'],
      graves: ['Arritmias (muito raro, doses muito altas)'],
    },
    interacoes: [
      {
        medicamento: 'Alimentos',
        gravidade: 'moderada',
        efeito: 'Reducao de 30% na biodisponibilidade',
        conduta: 'Administrar em jejum obrigatoriamente',
      },
      {
        medicamento: 'Suco de grapefruit',
        gravidade: 'moderada',
        efeito: 'Reducao da absorcao (inibe OATP)',
        conduta: 'Evitar sucos de frutas',
      },
      {
        medicamento: 'Cetoconazol, eritromicina',
        gravidade: 'leve',
        efeito: 'Aumento dos niveis de bilastina',
        conduta: 'Sem significancia clinica em doses normais',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario (estudos com TFG 40-80)' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Resposta clinica',
      'Tolerabilidade',
    ],
    orientacoesPaciente: [
      'TOMAR EM JEJUM - 1 hora antes OU 2 horas apos refeicao',
      'Tomar com agua (evitar sucos)',
      'Praticamente sem sonolencia',
      'Nao interfere com direcao de veiculos',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; boa tolerabilidade',
      hepatopatas: 'Sem ajuste necessario',
      pediatrico: 'Aprovado a partir de 6 anos (>=20kg)',
    },
    doencasRelacionadas: ['rinite-alergica', 'urticaria'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-histaminico', 'segunda-geracao', 'bilastina', 'nao-sedativo', 'jejum', 'sem-metabolismo-hepatico'],
  },

  {
    id: 'rupatadina',
    nomeGenerico: 'Rupatadina fumarato',
    nomesComerciais: ['Rupafin', 'Rinialer', 'Alergoliber'],
    atcCode: 'R06AX28',
    rxNormCui: '1087601',
    drugBankId: 'DB11614',
    snomedCT: '442043006',
    casNumber: '158876-82-5',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '1mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Rinite alergica sazonal e perene',
      'Urticaria cronica idiopatica',
    ],
    mecanismoAcao: 'Antagonista duplo: bloqueia receptores H1 de histamina E receptores PAF (fator ativador de plaquetas). O bloqueio de PAF confere atividade anti-inflamatoria adicional. Metabolizada a desloratadina (metabolito ativo). Inicio em 1-2 horas, duracao de 24 horas.',
    posologias: [
      {
        indicacao: 'Rinite alergica/Urticaria',
        adultos: {
          dose: '10mg',
          frequencia: '1x/dia',
          doseMaxima: '10mg/dia',
        },
        pediatrico: {
          dose: '2-11 anos (10-25kg): 2,5mg 1x/dia; (>25kg): 5mg 1x/dia; >=12 anos: 10mg 1x/dia',
          frequencia: '1x/dia',
          idadeMinima: '2 anos',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a rupatadina',
      'Uso concomitante com cetoconazol ou eritromicina (inibidores fortes CYP3A4)',
      'Prolongamento QT conhecido',
      'Hipocalemia nao corrigida',
    ],
    precaucoes: [
      'Evitar grapefruit',
      'Cautela em idosos',
      'Pode causar leve sedacao',
      'Cautela com prolongadores de QT',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia (9%)', 'Cefaleia', 'Fadiga', 'Boca seca', 'Astenia'],
      graves: ['Prolongamento QT (com inibidores CYP3A4)', 'Reacoes de hipersensibilidade'],
    },
    interacoes: [
      {
        medicamento: 'Cetoconazol, eritromicina',
        gravidade: 'grave',
        efeito: 'Aumento significativo dos niveis; risco de prolongamento QT',
        conduta: 'CONTRAINDICADO uso concomitante',
      },
      {
        medicamento: 'Suco de grapefruit',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de rupatadina',
        conduta: 'Evitar grapefruit',
      },
      {
        medicamento: 'Alcool',
        gravidade: 'moderada',
        efeito: 'Aumento da sedacao',
        conduta: 'Evitar alcool',
      },
      {
        medicamento: 'Estatinas metabolizadas por CYP3A4',
        gravidade: 'leve',
        efeito: 'Interacao teorica',
        conduta: 'Monitorar',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Resposta clinica',
      'Sinais de sedacao',
      'ECG se uso com outros farmacos que afetam QT',
    ],
    orientacoesPaciente: [
      'Pode ser tomado com ou sem alimentos',
      'Evitar grapefruit e suco de grapefruit',
      'Pode causar sonolencia - cautela ao dirigir',
      'Nao usar com certos antibioticos e antifungicos',
    ],
    consideracoesEspeciais: {
      idosos: 'Usar com cautela; dados limitados',
      hepatopatas: 'Evitar em insuficiencia hepatica',
      pediatrico: 'Aprovado a partir de 2 anos',
    },
    doencasRelacionadas: ['rinite-alergica', 'urticaria'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-histaminico', 'segunda-geracao', 'rupatadina', 'anti-PAF', 'duplo-mecanismo'],
  },

  {
    id: 'ebastina',
    nomeGenerico: 'Ebastina',
    nomesComerciais: ['Ebastel', 'Ebastel Flash', 'Kestine'],
    atcCode: 'R06AX22',
    rxNormCui: '389167',
    drugBankId: 'DB11742',
    snomedCT: '391731007',
    casNumber: '90729-43-4',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_2geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'comprimido_orodispersivel', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido_orodispersivel', concentracao: '20mg', disponivelSUS: false },
      { forma: 'xarope', concentracao: '1mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Rinite alergica sazonal e perene',
      'Urticaria cronica idiopatica',
      'Dermatoses alergicas',
    ],
    mecanismoAcao: 'Antagonista seletivo dos receptores H1 de segunda geracao. Metabolizada a carebastina (metabolito ativo) pelo CYP3A4. Baixa penetracao na barreira hematoencefalica. Inicio de acao em 1 hora, duracao de 24 horas. Disponivel em doses de 10mg e 20mg para casos mais graves.',
    posologias: [
      {
        indicacao: 'Rinite alergica/Urticaria',
        adultos: {
          dose: '10-20mg',
          frequencia: '1x/dia',
          doseMaxima: '20mg/dia',
          observacoes: '20mg para sintomas mais intensos',
        },
        pediatrico: {
          dose: '6-12 anos: 5mg 1x/dia; >12 anos: 10mg 1x/dia',
          frequencia: '1x/dia',
          idadeMinima: '6 anos',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a ebastina',
      'Insuficiencia hepatica grave',
      'Uso com inibidores fortes de CYP3A4 em pacientes com fatores de risco para arritmias',
    ],
    precaucoes: [
      'Cautela com inibidores de CYP3A4',
      'Evitar em sindrome QT longo',
      'Ajustar em insuficiencia renal moderada/grave',
      'Minima sedacao',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Boca seca', 'Sonolencia (3%)', 'Fadiga'],
      graves: ['Prolongamento QT (com inibidores CYP3A4)', 'Reacoes anafilacticas (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Cetoconazol, itraconazol, eritromicina',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de ebastina/carebastina',
        conduta: 'Usar dose maxima de 10mg; evitar em fatores de risco cardiaco',
      },
      {
        medicamento: 'Rifampicina',
        gravidade: 'moderada',
        efeito: 'Reducao dos niveis de ebastina',
        conduta: 'Pode necessitar dose maior',
      },
      {
        medicamento: 'Suco de grapefruit',
        gravidade: 'leve',
        efeito: 'Aumento da exposicao',
        conduta: 'Evitar consumo excessivo',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '<50', ajuste: 'Usar com cautela; considerar 10mg' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Resposta clinica',
      'Tolerabilidade',
      'ECG se fatores de risco cardiaco',
    ],
    orientacoesPaciente: [
      'Pode ser tomado com ou sem alimentos',
      'Comprimido orodispersivel pode ser tomado sem agua',
      'Baixo risco de sonolencia',
      'Informar medico sobre outros medicamentos',
    ],
    consideracoesEspeciais: {
      idosos: 'Usar com cautela; iniciar com 10mg',
      hepatopatas: 'Leve/moderada: usar 10mg; grave: evitar',
      pediatrico: 'Aprovado a partir de 6 anos',
    },
    doencasRelacionadas: ['rinite-alergica', 'urticaria', 'dermatoses-alergicas'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-histaminico', 'segunda-geracao', 'ebastina', 'carebastina', 'rinite'],
  },

  // =============================================================================
  // PRIMEIRA GERACAO (SEDATIVOS)
  // =============================================================================
  {
    id: 'difenidramina',
    nomeGenerico: 'Difenidramina cloridrato',
    nomesComerciais: ['Benadryl', 'Difenidrin', 'Notuss'],
    atcCode: 'R06AA02',
    rxNormCui: '3498',
    drugBankId: 'DB01075',
    snomedCT: '372682005',
    casNumber: '58-73-1',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_1geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '50mg', disponivelSUS: false },
      { forma: 'xarope', concentracao: '12,5mg/5mL', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '50mg/mL', disponivelSUS: false },
      { forma: 'creme', concentracao: '2%', disponivelSUS: false },
    ],
    indicacoes: [
      'Reacoes alergicas agudas',
      'Rinite alergica',
      'Urticaria',
      'Prurido',
      'Cinetopatia (enjoo de movimento)',
      'Insonia (uso como hipnotico)',
      'Reacoes extrapiramidais medicamentosas',
      'Anafilaxia (coadjuvante)',
    ],
    mecanismoAcao: 'Antagonista competitivo dos receptores H1 de primeira geracao. ATRAVESSA BARREIRA HEMATOENCEFALICA causando sedacao significativa. Possui tambem efeitos anticolinergicos, antisserotoninergicos e anestesico local. Usado como hipnotico devido ao efeito sedativo. Inicio de acao em 15-30 minutos, duracao de 4-6 horas.',
    posologias: [
      {
        indicacao: 'Alergia',
        adultos: {
          dose: '25-50mg',
          frequencia: '6/6h ou 8/8h',
          doseMaxima: '300mg/dia',
        },
        pediatrico: {
          dose: '6-12 anos: 12,5-25mg a cada 4-6h; >12 anos: dose adulto',
          frequencia: '4-6h',
          doseMaxima: '150mg/dia (6-12 anos)',
          idadeMinima: '6 anos',
        },
      },
      {
        indicacao: 'Insonia',
        adultos: {
          dose: '50mg',
          frequencia: '30 minutos antes de dormir',
          observacoes: 'Uso de curto prazo; tolerancia desenvolve rapidamente',
        },
      },
      {
        indicacao: 'Cinetopatia',
        adultos: {
          dose: '50mg',
          frequencia: '30 minutos antes da viagem; repetir a cada 4-6h se necessario',
          doseMaxima: '300mg/dia',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a difenidramina',
      'Neonatos e prematuros',
      'Amamentacao',
      'Glaucoma de angulo fechado',
      'Retencao urinaria',
      'Uso concomitante com IMAOs',
    ],
    precaucoes: [
      'CAUSA SEDACAO SIGNIFICATIVA - evitar dirigir',
      'Efeitos anticolinergicos pronunciados',
      'EVITAR EM IDOSOS (criterios de Beers)',
      'Cautela em asma, HPB, hipertireoidismo, doenca cardiovascular',
      'Pode agravar glaucoma',
      'Risco de reacao paradoxal em criancas (excitacao)',
    ],
    efeitosAdversos: {
      comuns: ['Sedacao intensa', 'Boca seca', 'Visao turva', 'Retencao urinaria', 'Constipacao', 'Tontura'],
      graves: ['Reacao paradoxal (criancas)', 'Convulsoes (overdose)', 'Arritmias', 'Reacao anafilactica'],
    },
    interacoes: [
      {
        medicamento: 'IMAOs',
        gravidade: 'contraindicada',
        efeito: 'Potencializacao de efeitos anticolinergicos; crise hipertensiva',
        conduta: 'CONTRAINDICADO',
      },
      {
        medicamento: 'Alcool, benzodiazepinicos, opioides',
        gravidade: 'grave',
        efeito: 'Depressao aditiva do SNC',
        conduta: 'Evitar combinacao; risco de depressao respiratoria',
      },
      {
        medicamento: 'Anticolinergicos (antidepressivos triciclicos, antipsicoticos)',
        gravidade: 'moderada',
        efeito: 'Efeitos anticolinergicos aditivos',
        conduta: 'Usar com cautela; monitorar sindrome anticolinergica',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Excretado no leite; pode causar sedacao no lactente; CONTRAINDICADO' },
    monitorizacao: [
      'Nivel de sedacao',
      'Sintomas anticolinergicos',
      'Resposta terapeutica',
    ],
    orientacoesPaciente: [
      'CAUSA SONOLENCIA - nao dirigir',
      'Evitar alcool',
      'Boca seca: beber agua, mascar chiclete sem acucar',
      'Nao usar por longos periodos para insonia',
      'Nao adequado para uso cronico em alergia',
    ],
    consideracoesEspeciais: {
      idosos: 'EVITAR - alto risco anticolinergico e quedas (Beers Criteria)',
      pediatrico: 'Evitar em <6 anos; risco de reacao paradoxal',
    },
    doencasRelacionadas: ['alergia', 'urticaria', 'insonia', 'cinetopatia', 'reacao-extrapiramidal'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-histaminico', 'primeira-geracao', 'difenidramina', 'sedativo', 'anticolinergico', 'evitar-idosos'],
  },

  {
    id: 'hidroxizina',
    nomeGenerico: 'Hidroxizina dicloridrato',
    nomesComerciais: ['Hixizine', 'Prurizin', 'Marax'],
    atcCode: 'N05BB01',
    rxNormCui: '5553',
    drugBankId: 'DB00557',
    snomedCT: '373345002',
    casNumber: '68-88-2',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_1geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '2mg/mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '50mg/mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Ansiedade (curto prazo)',
      'Prurido alergico e dermatologico',
      'Urticaria',
      'Medicacao pre-anestesica',
      'Nauseas e vomitos',
      'Sedacao',
    ],
    mecanismoAcao: 'Antagonista H1 de primeira geracao com efeitos ansioliticos pronunciados. Atravessa barreira hematoencefalica. Precursor da cetirizina (metabolito ativo). Possui efeitos anticolinergicos, antisserotoninergicos e ansiolitico nao benzodiazepínico. Inicio em 15-30 minutos, duracao de 4-6 horas.',
    posologias: [
      {
        indicacao: 'Ansiedade',
        adultos: {
          dose: '25-100mg',
          frequencia: '3-4x/dia ou 50-100mg a noite',
          doseMaxima: '400mg/dia',
        },
      },
      {
        indicacao: 'Prurido',
        adultos: {
          dose: '25mg',
          frequencia: '6/6h ou 8/8h',
          doseMaxima: '100mg/dia para prurido',
        },
        pediatrico: {
          dose: '<6 anos: 0,5mg/kg/dia dividido; 6-12 anos: 25-50mg/dia dividido',
          frequencia: 'Dividido em 3-4 doses',
          idadeMinima: '6 meses',
        },
      },
      {
        indicacao: 'Pre-anestesia',
        adultos: {
          dose: '50-100mg IM',
          frequencia: 'Dose unica 1 hora antes',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a hidroxizina ou cetirizina',
      'Prolongamento QT',
      'Primeiro trimestre de gestacao',
      'Porfiria',
      'Via IV (risco de trombose)',
    ],
    precaucoes: [
      'PROLONGAMENTO QT - evitar em fatores de risco',
      'Sedacao significativa',
      'Efeitos anticolinergicos',
      'EVITAR EM IDOSOS (Beers)',
      'Nao usar via IV',
      'Cautela em epilepsia',
    ],
    efeitosAdversos: {
      comuns: ['Sedacao', 'Boca seca', 'Cefaleia', 'Fadiga', 'Tremor'],
      graves: ['Prolongamento QT/Torsades', 'Convulsoes', 'Reacoes extrapiramidais'],
    },
    interacoes: [
      {
        medicamento: 'Prolongadores de QT (antiarritmicos, antipsicoticos, fluoroquinolonas)',
        gravidade: 'grave',
        efeito: 'Aumento do risco de arritmias',
        conduta: 'EVITAR combinacao; ECG se necessario',
      },
      {
        medicamento: 'Depressores do SNC',
        gravidade: 'grave',
        efeito: 'Sedacao aditiva',
        conduta: 'Reduzir doses; monitorar intensamente',
      },
      {
        medicamento: 'Inibidores de CYP3A4',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de hidroxizina',
        conduta: 'Reduzir dose de hidroxizina',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '<50', ajuste: 'Reduzir dose em 50%' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar - risco de sedacao no lactente' },
    monitorizacao: [
      'ECG em pacientes de risco',
      'Nivel de sedacao',
      'Sintomas anticolinergicos',
      'Resposta terapeutica',
    ],
    orientacoesPaciente: [
      'Causa sonolencia - nao dirigir',
      'Evitar alcool',
      'Nao parar abruptamente se uso prolongado',
      'Informar medico sobre palpitacoes ou desmaios',
    ],
    consideracoesEspeciais: {
      idosos: 'EVITAR - alto risco de quedas, anticolinergico, QT (Beers)',
      hepatopatas: 'Reduzir dose diaria em 33%',
      pediatrico: 'Aprovado a partir de 6 meses; doses cuidadosas',
    },
    doencasRelacionadas: ['ansiedade', 'urticaria', 'prurido', 'pre-anestesia'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-histaminico', 'primeira-geracao', 'hidroxizina', 'ansiolitico', 'sedativo', 'prolongamento-QT', 'RENAME'],
  },

  {
    id: 'prometazina',
    nomeGenerico: 'Prometazina cloridrato',
    nomesComerciais: ['Fenergan', 'Pamergan', 'Profergan'],
    atcCode: 'R06AD02',
    rxNormCui: '8745',
    drugBankId: 'DB01069',
    snomedCT: '372878009',
    casNumber: '60-87-7',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_1geracao',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '25mg', disponivelSUS: true },
      { forma: 'xarope', concentracao: '5mg/5mL', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '25mg/mL', disponivelSUS: true },
      { forma: 'creme', concentracao: '2%', disponivelSUS: false },
    ],
    indicacoes: [
      'Reacoes alergicas',
      'Nauseas e vomitos',
      'Cinetopatia',
      'Medicacao pre e pos-operatoria',
      'Sedacao',
      'Prurido',
      'Rinite alergica (curto prazo)',
    ],
    mecanismoAcao: 'Fenotiazina com propriedades anti-histaminicas (H1), anticolinergicas, antidopaminergicas e antiadrenergicas. Atravessa facilmente a barreira hematoencefalica. Potente efeito sedativo e antiemetico. Inicio de acao em 20 minutos (VO), duracao de 4-12 horas.',
    posologias: [
      {
        indicacao: 'Alergia/Prurido',
        adultos: {
          dose: '25mg',
          frequencia: '2-3x/dia ou 25-50mg a noite',
          doseMaxima: '75-100mg/dia',
        },
        pediatrico: {
          dose: '>2 anos: 0,5mg/kg/dose (max 12,5-25mg/dose)',
          frequencia: '2-3x/dia',
          idadeMinima: '2 anos',
        },
      },
      {
        indicacao: 'Nauseas e vomitos',
        adultos: {
          dose: '25mg',
          frequencia: '6/6h ou 8/8h',
          observacoes: 'Pode usar IM/IV em ambiente hospitalar',
        },
      },
      {
        indicacao: 'Cinetopatia',
        adultos: {
          dose: '25mg',
          frequencia: '30-60 minutos antes da viagem; repetir 8-12h depois se necessario',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a fenotiazinas',
      'Criancas <2 anos (risco de depressao respiratoria fatal)',
      'Coma ou depressao severa do SNC',
      'Injecao intra-arterial ou subcutanea (necrose)',
    ],
    precaucoes: [
      'NUNCA em <2 anos - risco de apneia fatal',
      'Via IV: risco de necrose tecidual se extravasamento',
      'Sedacao intensa',
      'Efeitos anticolinergicos pronunciados',
      'EVITAR EM IDOSOS',
      'Pode mascarar sintomas neurologicos',
      'Diminui limiar convulsivo',
    ],
    efeitosAdversos: {
      comuns: ['Sedacao intensa', 'Boca seca', 'Visao turva', 'Constipacao', 'Hipotensao', 'Tontura'],
      graves: ['Depressao respiratoria (criancas)', 'Sindrome neuroleptica maligna', 'Discinesia tardia', 'Agranulocitose', 'Necrose tecidual (extravasamento IV)'],
    },
    interacoes: [
      {
        medicamento: 'Depressores do SNC (opioides, benzodiazepinicos, alcool)',
        gravidade: 'grave',
        efeito: 'Depressao severa do SNC e respiratoria',
        conduta: 'Evitar ou reduzir doses drasticamente',
      },
      {
        medicamento: 'Anticolinergicos',
        gravidade: 'moderada',
        efeito: 'Efeitos anticolinergicos aditivos',
        conduta: 'Evitar combinacao; monitorar toxicidade',
      },
      {
        medicamento: 'Epinefrina',
        gravidade: 'moderada',
        efeito: 'Reversao paradoxal da pressao (efeito alfa bloqueado)',
        conduta: 'Evitar epinefrina em hipotensao induzida por prometazina',
      },
      {
        medicamento: 'Levodopa',
        gravidade: 'moderada',
        efeito: 'Antagonismo do efeito da levodopa',
        conduta: 'Evitar em parkinsonismo',
      },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite; pode causar sedacao e irritabilidade no lactente' },
    monitorizacao: [
      'Nivel de sedacao',
      'Pressao arterial (hipotensao)',
      'Sinais de depressao respiratoria (especialmente criancas)',
      'Sintomas extrapiramidais',
    ],
    orientacoesPaciente: [
      'CAUSA SONOLENCIA INTENSA - nao dirigir',
      'NUNCA usar em criancas <2 anos',
      'Evitar alcool e outros sedativos',
      'Pode causar sensibilidade ao sol',
      'Levantar-se lentamente (hipotensao)',
    ],
    consideracoesEspeciais: {
      idosos: 'EVITAR - alto risco de confusao, quedas, hipotensao',
      pediatrico: 'CONTRAINDICADO <2 anos; usar com extrema cautela >2 anos',
    },
    doencasRelacionadas: ['alergia', 'nauseas-vomitos', 'cinetopatia', 'pre-operatorio'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-histaminico', 'primeira-geracao', 'prometazina', 'fenotiazina', 'sedativo', 'antiemetico', 'RENAME'],
  },

  {
    id: 'clemastina',
    nomeGenerico: 'Clemastina fumarato',
    nomesComerciais: ['Agasten', 'Tavegyl'],
    atcCode: 'R06AA04',
    rxNormCui: '2599',
    drugBankId: 'DB00283',
    snomedCT: '372658002',
    casNumber: '15686-51-8',
    classeTerapeutica: 'anti_histaminico',
    subclasse: 'h1_1geracao',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
      { forma: 'xarope', concentracao: '0,5mg/5mL', disponivelSUS: false },
      { forma: 'injetavel', concentracao: '2mg/2mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Rinite alergica',
      'Urticaria',
      'Dermatite atopica',
      'Prurido alergico',
      'Reacoes alergicas agudas (IV)',
      'Angioedema',
    ],
    mecanismoAcao: 'Antagonista H1 de primeira geracao do grupo etanolamina. Atravessa barreira hematoencefalica causando sedacao moderada. Possui atividade anticolinergica. Mais seletivo para receptor H1 que difenidramina, com menos efeitos anticolinergicos. Inicio em 1-2 horas (VO), duracao de 12 horas.',
    posologias: [
      {
        indicacao: 'Alergia/Urticaria',
        adultos: {
          dose: '1mg',
          frequencia: '12/12h',
          doseMaxima: '6mg/dia',
          observacoes: 'Pode aumentar para 2mg 12/12h se necessario',
        },
        pediatrico: {
          dose: '1-3 anos: 0,25-0,5mg 12/12h; 3-6 anos: 0,5mg 12/12h; 6-12 anos: 0,5-1mg 12/12h',
          frequencia: '12/12h',
          idadeMinima: '1 ano',
        },
      },
      {
        indicacao: 'Reacao alergica aguda (IV)',
        adultos: {
          dose: '2mg IV lento',
          frequencia: 'Dose unica; pode repetir em 12h',
          doseMaxima: '4mg/dia IV',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a clemastina',
      'Uso com IMAOs',
      'Glaucoma de angulo fechado',
      'Retencao urinaria',
      'Lactentes',
    ],
    precaucoes: [
      'Causa sedacao moderada',
      'Efeitos anticolinergicos',
      'Cautela em idosos',
      'Cautela em asma, HPB, epilepsia',
      'Evitar alcool',
    ],
    efeitosAdversos: {
      comuns: ['Sonolencia', 'Boca seca', 'Cefaleia', 'Espessamento de secrecoes', 'Nauseas'],
      graves: ['Agranulocitose (raro)', 'Trombocitopenia (raro)', 'Anafilaxia (raro)'],
    },
    interacoes: [
      {
        medicamento: 'IMAOs',
        gravidade: 'contraindicada',
        efeito: 'Potencializacao de efeitos anticolinergicos',
        conduta: 'CONTRAINDICADO',
      },
      {
        medicamento: 'Depressores do SNC',
        gravidade: 'moderada',
        efeito: 'Sedacao aditiva',
        conduta: 'Usar com cautela; reduzir doses',
      },
      {
        medicamento: 'Anticolinergicos',
        gravidade: 'moderada',
        efeito: 'Efeitos anticolinergicos aditivos',
        conduta: 'Monitorar toxicidade anticolinergica',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Excretado no leite; pode inibir lactacao; evitar' },
    monitorizacao: [
      'Resposta clinica',
      'Nivel de sedacao',
      'Sintomas anticolinergicos',
    ],
    orientacoesPaciente: [
      'Pode causar sonolencia - cautela ao dirigir',
      'Evitar alcool',
      'Tomar 2x ao dia (duracao de 12 horas)',
      'Boca seca: beber agua frequentemente',
    ],
    consideracoesEspeciais: {
      idosos: 'Usar com cautela - maior sensibilidade a efeitos adversos',
      pediatrico: 'Aprovado a partir de 1 ano; dose cuidadosa',
    },
    doencasRelacionadas: ['rinite-alergica', 'urticaria', 'dermatite-atopica', 'angioedema'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-histaminico', 'primeira-geracao', 'clemastina', 'duracao-prolongada', 'etanolamina'],
  },
];
