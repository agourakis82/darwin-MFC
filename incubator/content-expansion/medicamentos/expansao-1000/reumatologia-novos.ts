/**
 * REUMATOLOGIA NOVOS - DARWIN-MFC EXPANSAO 1000
 * ==============================================
 * DMARDs avancados, inibidores JAK, anti-IL, anti-TNF
 *
 * Ontologias utilizadas:
 * - ATC (WHO ATC Index): L04AA, L04AB, M01, M04
 * - RxNorm (NIH): CUI codes para interoperabilidade
 * - DrugBank: DB IDs para dados farmacologicos
 * - SNOMED-CT: Codigos para terminologia clinica
 *
 * Referencias:
 * - FDA Prescribing Information
 * - EMA Summary of Product Characteristics
 * - ACR/EULAR Guidelines 2024
 * - PharmGKB Pharmacogenomics Database
 * - Micromedex Drug Information
 * - UpToDate Drug Information
 */

import { Medicamento } from '@/lib/types/medicamento';

export const reumatologiaNovos: Partial<Medicamento>[] = [
  // ============================================================================
  // JAK INHIBITORS
  // ============================================================================
  {
    id: 'tofacitinibe',
    nomeGenerico: 'Tofacitinibe',
    nomesComerciais: ['Xeljanz', 'Xeljanz XR'],
    atcCode: 'L04AA29',
    rxNormCui: '1148797',
    drugBankId: 'DB08895',
    snomedCT: '703126001',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'inibidor_jak',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '11mg', disponivelSUS: false },
      { forma: 'solucao_oral', concentracao: '1mg/ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Artrite reumatoide moderada a grave (apos falha de MTX)',
      'Artrite psoriasica (apos falha de DMARDs)',
      'Colite ulcerativa moderada a grave',
      'Artrite idiopatica juvenil poliarticular (>=2 anos)'
    ],
    mecanismoAcao: 'Inibidor oral de JAK1 e JAK3 (e em menor grau JAK2). JAKs sao tirosinas quinases intracelulares que transduzem sinais de citocinas (IL-2, IL-4, IL-6, IL-7, IL-9, IL-15, IL-21, IFN-gama). Inibicao JAK1/3 bloqueia sinalizacao de multiplas citocinas pro-inflamatorias, reduzindo ativacao e proliferacao de linfocitos T e B. PRIMEIRO JAKi APROVADO para AR (2012).',
    posologias: [
      {
        indicacao: 'Artrite reumatoide',
        adultos: { dose: '5mg', frequencia: '2x/dia ou 11mg XR 1x/dia', observacoes: 'Com ou sem MTX' },
        idosos: { dose: '5mg 2x/dia', observacoes: 'Estudo ORAL Surveillance: maior risco CV e malignidades em >65 anos' }
      },
      {
        indicacao: 'Artrite psoriasica',
        adultos: { dose: '5mg', frequencia: '2x/dia', observacoes: 'Com ou sem DMARDs convencionais' }
      },
      {
        indicacao: 'Colite ulcerativa (inducao)',
        adultos: { dose: '10mg', frequencia: '2x/dia por 8 semanas', observacoes: 'Pode estender para 16 semanas se necessario' }
      },
      {
        indicacao: 'Colite ulcerativa (manutencao)',
        adultos: { dose: '5mg ou 10mg', frequencia: '2x/dia', observacoes: '5mg para maioria; 10mg se perda de resposta ou falha previa de anti-TNF' }
      },
      {
        indicacao: 'Artrite idiopatica juvenil',
        adultos: { dose: '5mg', frequencia: '2x/dia', observacoes: '>=40kg: dose adulto' },
        pediatrico: { dose: '5mg 2x/dia ou peso-baseado', frequencia: '2x/dia', idadeMinima: '2 anos', observacoes: '<40kg: solucao oral peso-baseado' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao tofacitinibe',
      'Infeccao grave ativa',
      'Tuberculose ativa ou latente nao tratada',
      'Insuficiencia hepatica grave (Child-Pugh C)',
      'Neutrofilos <1000 ou linfocitos <500',
      'Hemoglobina <9 g/dL'
    ],
    precaucoes: [
      'BLACK BOX: Risco aumentado de infeccoes serias, incluindo TB, infeccoes fungicas invasivas, bacterianas e virais oportunistas',
      'BLACK BOX: Mortalidade aumentada - estudo ORAL Surveillance mostrou maior risco em pacientes com fatores de risco CV',
      'BLACK BOX: Malignidades, incluindo linfomas - risco aumentado observado',
      'BLACK BOX: Tromboembolismo venoso (TEV) - EP e TVP mais frequentes',
      'BLACK BOX: Eventos cardiovasculares maiores (MACE) - IAM, AVC mais frequentes em pacientes de risco',
      'Rastrear TB antes de iniciar (PPD/IGRA + RX torax)',
      'Hepatite B/C - rastrear antes; reativacao de HBV pode ocorrer',
      'Herpes zoster - risco 2-4x maior; considerar vacinacao antes de iniciar',
      'Perfuracoes GI - usar com cautela em diverticulite',
      'Dislipidemia - aumenta LDL, HDL e colesterol total',
      'Citopenias - monitorar hemograma',
      'Evitar vacinas vivas durante tratamento'
    ],
    efeitosAdversos: {
      comuns: ['Infeccoes respiratorias superiores', 'Nasofaringite', 'Diarreia', 'Cefaleia', 'Herpes zoster', 'Elevacao de CPK', 'Hipertensao'],
      graves: ['Tuberculose', 'Infeccoes oportunistas', 'Linfoma', 'Neoplasias solidas', 'TEV (EP, TVP)', 'MACE (IAM, AVC)', 'Perfuracao GI', 'Hepatotoxicidade', 'Citopenias graves']
    },
    interacoes: [
      { medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol)', gravidade: 'grave', efeito: 'Aumenta AUC de tofacitinibe em ~100%', mecanismo: 'Inibicao CYP3A4', conduta: 'Reduzir para 5mg 1x/dia' },
      { medicamento: 'Inibidores moderados de CYP3A4 + inibidores fortes de CYP2C19 (fluconazol)', gravidade: 'moderada', efeito: 'Aumenta exposicao', conduta: 'Reduzir para 5mg 1x/dia' },
      { medicamento: 'Indutores fortes de CYP3A4 (rifampicina)', gravidade: 'grave', efeito: 'Reduz eficacia em ~70%', conduta: 'Nao recomendado' },
      { medicamento: 'Biologicos (anti-TNF, tocilizumabe)', gravidade: 'grave', efeito: 'Imunossupressao aditiva', conduta: 'Nao associar' },
      { medicamento: 'Vacinas vivas (BCG, febre amarela)', gravidade: 'contraindicada', efeito: 'Risco de infeccao disseminada', conduta: 'Contraindicado' },
      { medicamento: 'Metotrexato', gravidade: 'leve', efeito: 'Sem interacao farmacocinetica significativa', conduta: 'Associacao comum e permitida' }
    ],
    ajusteDoseRenal: [
      { tfg: '>60', ajuste: 'Sem ajuste' },
      { tfg: '30-60', ajuste: '5mg 2x/dia para AR/AP; CU: 5mg ou 10mg 2x/dia' },
      { tfg: '<30', ajuste: '5mg 1x/dia (AR/AP); CU: 5mg 2x/dia' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado - excretado no leite em estudos animais; potencial teratogenico' },
    monitorizacao: [
      'Hemograma completo: antes, 4-8 semanas apos inicio, depois a cada 3 meses',
      'Funcao hepatica: periodicamente',
      'Lipidograma: 4-8 semanas apos inicio',
      'TB screening: antes de iniciar',
      'Hepatite B/C: antes de iniciar',
      'Sinais/sintomas de infeccao, TEV, MACE'
    ],
    consideracoesEspeciais: {
      idosos: 'Estudo ORAL Surveillance: pacientes >=65 anos com >=1 fator de risco CV tiveram maior incidencia de MACE, malignidades e infeccoes. FDA recomenda cautela.',
      hepatopatas: 'Contraindicado em Child-Pugh C; ajuste para Child-Pugh B (5mg 1x/dia)',
      pediatrico: 'Aprovado para AIJ >=2 anos. Solucao oral disponivel para ajuste peso-baseado.'
    },
    doencasRelacionadas: ['artrite-reumatoide', 'colite-ulcerativa', 'artrite-psoriasica'],
    calculadoras: ['ckd-epi'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['jak-inhibitor', 'oral', 'reumatologia', 'gastroenterologia', 'black-box', 'oral-surveillance']
  },
  {
    id: 'baricitinibe',
    nomeGenerico: 'Baricitinibe',
    nomesComerciais: ['Olumiant'],
    atcCode: 'L04AA37',
    rxNormCui: '1860480',
    drugBankId: 'DB11817',
    snomedCT: '735220009',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'inibidor_jak',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '1mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '2mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Artrite reumatoide moderada a grave',
      'Dermatite atopica moderada a grave (adultos)',
      'Alopecia areata grave (adultos)',
      'COVID-19 em adultos hospitalizados (uso emergencial - historico)'
    ],
    mecanismoAcao: 'Inibidor oral SELETIVO de JAK1 e JAK2. Maior seletividade JAK1/2 vs. JAK3 comparado a tofacitinibe. JAK1 medeia sinalizacao de citocinas pro-inflamatorias (IL-6, IFN). JAK2 medeia sinalizacao de fatores de crescimento hematopoieticos (EPO, TPO). Inibicao resulta em reducao de inflamacao e modulacao de respostas imunes.',
    posologias: [
      {
        indicacao: 'Artrite reumatoide',
        adultos: { dose: '2mg', frequencia: '1x/dia', observacoes: 'Pode aumentar para 4mg se resposta inadequada; 2mg se FR presentes' },
        idosos: { dose: '2mg', observacoes: 'Preferir 2mg em >=75 anos' }
      },
      {
        indicacao: 'Dermatite atopica',
        adultos: { dose: '2mg ou 4mg', frequencia: '1x/dia', observacoes: '4mg para casos mais graves; pode reduzir para 2mg apos controle' }
      },
      {
        indicacao: 'Alopecia areata',
        adultos: { dose: '2mg', frequencia: '1x/dia', observacoes: 'Pode aumentar para 4mg se resposta insuficiente apos 36 semanas' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao baricitinibe',
      'Gestacao',
      'Infeccao grave ativa',
      'Neutrofilos <1000/mm3, linfocitos <500/mm3, Hb <8g/dL'
    ],
    precaucoes: [
      'BLACK BOX (classe JAKi): Infeccoes serias, malignidades, MACE, TEV',
      'Rastrear TB antes de iniciar',
      'Hepatite B/C - rastrear; risco de reativacao HBV',
      'Herpes zoster - considerar vacinacao antes',
      'TEV - avaliar risco antes de iniciar',
      'Perfuracoes GI',
      'Citopenias - monitorar hemograma',
      'Elevacao de lipidios',
      'Evitar em pacientes com fatores de risco CV e >=65 anos (dados de classe)'
    ],
    efeitosAdversos: {
      comuns: ['Infeccoes respiratorias superiores', 'Nauseas', 'Herpes simplex', 'Herpes zoster', 'Acne', 'Elevacao de LDL', 'Elevacao de CPK'],
      graves: ['TEV (EP, TVP)', 'MACE', 'Malignidades', 'Infeccoes serias', 'Perfuracao GI', 'Citopenias', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Probenecida', gravidade: 'moderada', efeito: 'Aumenta AUC de baricitinibe em ~2x (inibe OAT3)', mecanismo: 'Inibicao transportador OAT3', conduta: 'Reduzir baricitinibe para 2mg 1x/dia' },
      { medicamento: 'Inibidores fortes de CYP3A4', gravidade: 'leve', efeito: 'Aumento modesto de exposicao', conduta: 'Monitorar' },
      { medicamento: 'Biologicos', gravidade: 'grave', efeito: 'Imunossupressao aditiva', conduta: 'Nao associar' },
      { medicamento: 'Vacinas vivas', gravidade: 'contraindicada', efeito: 'Risco de infeccao vacinal', conduta: 'Evitar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>=60', ajuste: 'Sem ajuste' },
      { tfg: '30-60', ajuste: '2mg 1x/dia (dose maxima)' },
      { tfg: '<30', ajuste: 'Nao recomendado' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado - dados insuficientes; excretado no leite em animais' },
    monitorizacao: [
      'Hemograma: antes, 12 semanas, depois periodicamente',
      'Funcao hepatica: periodicamente',
      'Lipidograma: 12 semanas apos inicio',
      'TB antes de iniciar',
      'Sinais de infeccao, TEV'
    ],
    consideracoesEspeciais: {
      idosos: 'Maior incidencia de eventos adversos. Preferir 2mg em >=75 anos.',
      hepatopatas: 'Nao recomendado em insuficiencia hepatica grave'
    },
    doencasRelacionadas: ['artrite-reumatoide', 'dermatite-atopica', 'alopecia-areata'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['jak-inhibitor', 'oral', 'reumatologia', 'dermatologia', 'black-box']
  },

  // ============================================================================
  // IL-17 INHIBITORS
  // ============================================================================
  {
    id: 'secuquinumabe',
    nomeGenerico: 'Secuquinumabe',
    nomesComerciais: ['Cosentyx'],
    atcCode: 'L04AC10',
    rxNormCui: '1545994',
    drugBankId: 'DB09029',
    snomedCT: '716064008',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il17',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '150mg/ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '300mg/2ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '75mg/0,5ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Psoriase em placas moderada a grave',
      'Artrite psoriasica',
      'Espondilite anquilosante',
      'Espondiloartrite axial nao radiografica (nr-axSpA)',
      'Hidradenite supurativa moderada a grave',
      'Artrite idiopatica juvenil relacionada a entesite'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1-kappa TOTALMENTE HUMANO que se liga SELETIVAMENTE a IL-17A. IL-17A e citocina pro-inflamatoria central na patogenese da psoriase e espondiloartrites, produzida principalmente por celulas Th17. Bloqueio de IL-17A: (1) reduz inflamacao sinovial/enteseal; (2) normaliza hiperproliferacao de queratinocitos; (3) reduz neoangiogenese. Alta afinidade de ligacao (KD ~100 pM).',
    posologias: [
      {
        indicacao: 'Psoriase em placas',
        adultos: { dose: '300mg', frequencia: 'SC semanas 0, 1, 2, 3, 4 (inducao), depois 300mg a cada 4 semanas', observacoes: 'Alguns pacientes podem necessitar 300mg a cada 2 semanas para manutencao de resposta' }
      },
      {
        indicacao: 'Artrite psoriasica (com psoriase cutanea coexistente)',
        adultos: { dose: '300mg', frequencia: 'SC semanas 0, 1, 2, 3, 4, depois 300mg a cada 4 semanas', observacoes: 'Com ou sem MTX' }
      },
      {
        indicacao: 'Artrite psoriasica (sem envolvimento cutaneo significativo)',
        adultos: { dose: '150mg', frequencia: 'SC semanas 0, 1, 2, 3, 4, depois 150mg a cada 4 semanas', observacoes: 'Pode aumentar para 300mg se resposta inadequada' }
      },
      {
        indicacao: 'Espondilite anquilosante / nr-axSpA',
        adultos: { dose: '150mg', frequencia: 'SC semanas 0, 1, 2, 3, 4, depois 150mg a cada 4 semanas', observacoes: 'Pode aumentar para 300mg se resposta inadequada' }
      },
      {
        indicacao: 'Hidradenite supurativa',
        adultos: { dose: '300mg', frequencia: 'SC semanas 0, 1, 2, 3, 4, depois 300mg a cada 2 semanas', observacoes: 'Avaliar resposta em 16 semanas' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao secuquinumabe',
      'Infeccoes ativas clinicamente relevantes (ex: TB ativa)',
      'Doenca de Crohn ativa (pode exacerbar)'
    ],
    precaucoes: [
      'DOENCA INFLAMATORIA INTESTINAL: Pode exacerbar ou desencadear doenca de Crohn - monitorar sintomas GI cuidadosamente',
      'Rastrear TB antes de iniciar',
      'Infeccoes - monitorar sinais durante tratamento',
      'Candidiase mucocutanea mais comum (oral, esofagica, vulvovaginal) - geralmente leve, tratar e continuar',
      'Reacoes de hipersensibilidade podem ocorrer',
      'Evitar vacinas vivas durante tratamento',
      'Neutropenia raramente relatada'
    ],
    efeitosAdversos: {
      comuns: ['Nasofaringite', 'Infeccoes respiratorias superiores', 'Rinorreia', 'Diarreia', 'Candidiase oral', 'Cefaleia'],
      graves: ['Exacerbacao ou novo diagnostico de doenca de Crohn', 'Infeccoes serias', 'Reacoes anafilaticas', 'Neutropenia']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infeccao pela vacina', conduta: 'Evitar durante tratamento; atualizar vacinas antes de iniciar' },
      { medicamento: 'Substratos CYP450 com indice terapeutico estreito (varfarina, ciclosporina)', gravidade: 'leve', efeito: 'IL-17 pode modular CYP450; normalizacao pode afetar metabolismo', conduta: 'Monitorar niveis/efeito de farmacos metabolizados por CYP450' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados limitados; IgG excretada no leite mas absorvida minimamente - avaliar risco/beneficio' },
    monitorizacao: [
      'TB screening antes de iniciar',
      'Sinais e sintomas de infeccao',
      'Sintomas GI (doenca inflamatoria intestinal)'
    ],
    doencasRelacionadas: ['psoriase', 'artrite-psoriasica', 'espondilite-anquilosante', 'hidradenite-supurativa'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il17', 'biologico', 'humano', 'dermatologia', 'reumatologia']
  },
  {
    id: 'ixequizumabe',
    nomeGenerico: 'Ixequizumabe',
    nomesComerciais: ['Taltz'],
    atcCode: 'L04AC13',
    rxNormCui: '1721075',
    drugBankId: 'DB11569',
    snomedCT: '724038003',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il17',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '80mg/ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Psoriase em placas moderada a grave',
      'Artrite psoriasica',
      'Espondilite anquilosante',
      'Espondiloartrite axial nao radiografica',
      'Psoriase eritrodermica',
      'Psoriase pustulosa generalizada'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG4-kappa HUMANIZADO que se liga SELETIVAMENTE a IL-17A com alta afinidade (~3 pM). IgG4 minimiza funcoes efetoras Fc-dependentes (ADCC, CDC). Neutraliza IL-17A soluvel e ligada a membrana. Eficacia superior em PASI 90/100 em estudos comparativos. Rapido inicio de acao (respostas significativas em 2 semanas).',
    posologias: [
      {
        indicacao: 'Psoriase em placas',
        adultos: { dose: '160mg semana 0, depois 80mg semanas 2, 4, 6, 8, 10, 12 (inducao), depois 80mg a cada 4 semanas', frequencia: 'Ver esquema', observacoes: 'Taxas de PASI 90 >70% em 12 semanas' }
      },
      {
        indicacao: 'Artrite psoriasica (com psoriase cutanea coexistente)',
        adultos: { dose: '160mg semana 0, depois 80mg semanas 2, 4, 6, 8, 10, 12, depois 80mg a cada 4 semanas', frequencia: 'Ver esquema' }
      },
      {
        indicacao: 'Artrite psoriasica (sem psoriase cutanea significativa)',
        adultos: { dose: '160mg semana 0, depois 80mg a cada 4 semanas', frequencia: 'Ver esquema' }
      },
      {
        indicacao: 'Espondilite anquilosante/nr-axSpA',
        adultos: { dose: '160mg ou 80mg semana 0, depois 80mg a cada 4 semanas', frequencia: 'Ver esquema' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave ao ixequizumabe',
      'Infeccao ativa clinicamente importante',
      'Doenca de Crohn ativa'
    ],
    precaucoes: [
      'DOENCA INFLAMATORIA INTESTINAL: Pode precipitar ou exacerbar doenca de Crohn - EVITAR se historia de DII; monitorar sintomas GI',
      'TB - rastrear antes de iniciar',
      'Infeccoes - neutropenia pode ocorrer',
      'Candidiase frequente (oral, esofagica, vulvovaginal) - tratar e geralmente pode continuar',
      'Reacoes no local de injecao comuns (~14%) - geralmente leves'
    ],
    efeitosAdversos: {
      comuns: ['Reacoes no local de injecao', 'Infeccoes respiratorias superiores', 'Nasofaringite', 'Candidiase', 'Nausea'],
      graves: ['Doenca inflamatoria intestinal (nova ou exacerbada)', 'Infeccoes serias', 'Hipersensibilidade', 'Neutropenia', 'Trombocitopenia']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Infeccao pela vacina', conduta: 'Contraindicado durante tratamento' },
      { medicamento: 'Substratos CYP450', gravidade: 'leve', efeito: 'Citocinas inflamatorias modulam CYP450', conduta: 'Monitorar farmacos com indice terapeutico estreito no inicio do tratamento' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; IgG excretada no leite' },
    monitorizacao: [
      'TB antes de iniciar',
      'Sintomas de DII',
      'Infeccoes',
      'Hemograma periodicamente (neutrofilos)'
    ],
    doencasRelacionadas: ['psoriase', 'artrite-psoriasica', 'espondilite-anquilosante'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il17', 'biologico', 'dermatologia', 'reumatologia']
  },

  // ============================================================================
  // T-CELL COSTIMULATION MODULATOR
  // ============================================================================
  {
    id: 'abatacepte',
    nomeGenerico: 'Abatacepte',
    nomesComerciais: ['Orencia'],
    atcCode: 'L04AA24',
    rxNormCui: '615186',
    drugBankId: 'DB01281',
    snomedCT: '414805007',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'modulador_coestimulacao',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '50mg/0,4ml', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '87,5mg/0,7ml', disponivelSUS: true },
      { forma: 'injetavel_sc', concentracao: '125mg/ml', disponivelSUS: true },
      { forma: 'po_injetavel', concentracao: '250mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Artrite reumatoide moderada a grave',
      'Artrite psoriasica (apos falha de DMARDs)',
      'Artrite idiopatica juvenil poliarticular (>=2 anos)',
      'Prevencao de rejeicao aguda em transplante renal (em combinacao)'
    ],
    mecanismoAcao: 'Proteina de fusao soluble CTLA-4-Ig que se liga a CD80 (B7-1) e CD86 (B7-2) nas celulas apresentadoras de antígeno (APCs), BLOQUEANDO interacao com CD28 nas celulas T. MODULA (nao depleta) celulas T ao inibir coestimulacao - o SEGUNDO SINAL necessario para ativacao completa. Mecanismo UPSTREAM unico entre DMARDs biologicos - atua na sinapse imunologica antes da cascata de citocinas.',
    posologias: [
      {
        indicacao: 'AR (IV)',
        adultos: { dose: '<60kg: 500mg; 60-100kg: 750mg; >100kg: 1000mg', frequencia: 'IV semanas 0, 2, 4, depois a cada 4 semanas', observacoes: 'Infusao em 30 minutos' }
      },
      {
        indicacao: 'AR (SC)',
        adultos: { dose: '125mg', frequencia: 'SC 1x/semana', observacoes: 'Pode ou nao ser precedido por dose IV de ataque' }
      },
      {
        indicacao: 'Artrite psoriasica (SC)',
        adultos: { dose: '125mg', frequencia: 'SC 1x/semana' }
      },
      {
        indicacao: 'AIJ poliarticular (>=6 anos, >=75kg)',
        adultos: { dose: 'Mesmo esquema adulto', frequencia: 'IV ou SC' },
        pediatrico: { dose: 'Mesmo esquema adulto', frequencia: 'IV ou SC', idadeMinima: '6 anos' }
      },
      {
        indicacao: 'AIJ poliarticular (2-17 anos, <75kg)',
        adultos: { dose: '10mg/kg IV (max 1000mg) ou 50mg SC (<25kg), 87,5mg SC (25-50kg)', frequencia: 'Ver peso' },
        pediatrico: { dose: '10mg/kg IV (max 1000mg) ou peso-baseado SC', frequencia: 'Ver peso', idadeMinima: '2 anos' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao abatacepte',
      'Infeccao grave ativa'
    ],
    precaucoes: [
      'Infeccoes - risco aumentado; menor risco que anti-TNF em estudos comparativos',
      'TB - rastrear antes de iniciar',
      'DPOC - risco aumentado de exacerbacoes e eventos respiratorios adversos',
      'Nao associar com anti-TNF ou outros biologicos (estudos mostraram aumento de infeccoes sem beneficio adicional)',
      'Vacinas vivas - evitar durante tratamento e 3 meses apos',
      'Resposta vacinal a vacinas inativadas pode ser atenuada - vacinar antes se possivel',
      'Malignidades - dados de longo prazo nao mostram aumento significativo'
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Nasofaringite', 'Nauseas', 'Infeccoes respiratorias superiores', 'Tontura', 'Infeccao urinaria'],
      graves: ['Infeccoes serias', 'Malignidades', 'Reacoes anafilaticas (raro)', 'Exacerbacao de DPOC', 'Reativacao viral']
    },
    interacoes: [
      { medicamento: 'Anti-TNF (adalimumabe, etanercepte, infliximabe)', gravidade: 'grave', efeito: 'Estudo mostrou aumento de infeccoes graves sem beneficio adicional', conduta: 'Nao associar' },
      { medicamento: 'Anakinra', gravidade: 'grave', efeito: 'Infeccoes graves', conduta: 'Nao associar' },
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infeccao vacinal', conduta: 'Evitar durante tratamento' },
      { medicamento: 'Metotrexato', gravidade: 'leve', efeito: 'Sem interacao farmacocinetica significativa', conduta: 'Associacao comum e segura' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; provavelmente excretado no leite' },
    monitorizacao: [
      'TB screening antes de iniciar',
      'Hepatite B/C screening',
      'Funcao pulmonar em pacientes com DPOC',
      'Infeccoes'
    ],
    consideracoesEspeciais: {
      idosos: 'Maior incidencia de infeccoes graves. Usar com cautela.',
      hepatopatas: 'Sem ajuste necessario',
      pediatrico: 'Aprovado para AIJ poliarticular >=2 anos. Formulacoes SC peso-ajustadas disponiveis.'
    },
    doencasRelacionadas: ['artrite-reumatoide', 'artrite-psoriasica', 'artrite-idiopatica-juvenil'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['coestimulacao', 'modulador-celula-t', 'biologico', 'reumatologia', 'pediatria', 'rename']
  },

  // ============================================================================
  // ANTI-TNF
  // ============================================================================
  {
    id: 'certolizumabe-pegol',
    nomeGenerico: 'Certolizumabe Pegol',
    nomesComerciais: ['Cimzia'],
    atcCode: 'L04AB05',
    rxNormCui: '827752',
    drugBankId: 'DB08904',
    snomedCT: '442031002',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_tnf',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '200mg/ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '400mg/2ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Artrite reumatoide moderada a grave',
      'Artrite psoriasica',
      'Espondilite anquilosante',
      'Espondiloartrite axial nao radiografica',
      'Doenca de Crohn moderada a grave',
      'Psoriase em placas moderada a grave'
    ],
    mecanismoAcao: 'Fragmento Fab\' de anticorpo monoclonal HUMANIZADO anti-TNF-alfa CONJUGADO a polietilenoglicol (PEG). CARACTERISTICAS UNICAS: (1) AUSENCIA de porcao Fc resulta em NAO ATRAVESSAMENTO PLACENTARIO significativo - PREFERENCIAL EM GESTANTES; (2) Nao ativa complemento ou ADCC; (3) PEGilacao aumenta meia-vida para ~14 dias. Neutraliza TNF-alfa soluvel e ligado a membrana com alta afinidade.',
    posologias: [
      {
        indicacao: 'AR/Artrite psoriasica/EA',
        adultos: { dose: '400mg semanas 0, 2, 4 (inducao), depois 200mg a cada 2 semanas ou 400mg a cada 4 semanas', frequencia: 'Ver esquema', observacoes: 'Pode ser usado com ou sem MTX' }
      },
      {
        indicacao: 'Doenca de Crohn',
        adultos: { dose: '400mg semanas 0, 2, 4, depois 400mg a cada 4 semanas', frequencia: 'Ver esquema', observacoes: 'Resposta avaliada em 12 semanas; descontinuar se sem resposta' }
      },
      {
        indicacao: 'Psoriase em placas',
        adultos: { dose: '400mg a cada 2 semanas', frequencia: 'Quinzenal', observacoes: 'Para pacientes >90kg; <=90kg: 400mg semanas 0,2,4 depois 200mg a cada 2 semanas' }
      }
    ],
    contraindicacoes: [
      'Tuberculose ativa ou latente nao tratada',
      'Infeccoes graves ativas (sepse, abscessos)',
      'Insuficiencia cardiaca moderada a grave (NYHA III-IV)',
      'Hipersensibilidade ao certolizumabe'
    ],
    precaucoes: [
      'BLACK BOX: Infeccoes graves incluindo TB, infeccoes fungicas invasivas (histoplasmose, coccidioidomicose), infeccoes bacterianas e oportunistas',
      'BLACK BOX: Risco aumentado de linfoma e outras malignidades, especialmente em criancas/adolescentes',
      'Rastrear TB antes do inicio (PPD ou IGRA + RX torax)',
      'Rastrear hepatite B antes do inicio - reativacao pode ocorrer',
      'Monitorar sinais de infeccao durante tratamento',
      'Evitar vacinas vivas durante tratamento',
      'Pode induzir ou exacerbar doencas desmielinizantes',
      'Pode causar ou exacerbar ICC',
      'Sindrome lupus-like pode ocorrer'
    ],
    efeitosAdversos: {
      comuns: ['Infeccoes respiratorias superiores', 'Reacoes no local de injecao', 'Cefaleia', 'Rash cutaneo', 'Artralgia'],
      graves: ['TB reativada', 'Infeccoes oportunistas graves', 'Linfoma', 'Lupus-like syndrome', 'ICC descompensada', 'Doencas desmielinizantes', 'Citopenias', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'contraindicada', efeito: 'Risco de infeccao disseminada', conduta: 'Contraindicado - aguardar pelo menos 5 meses apos ultima dose' },
      { medicamento: 'Anakinra', gravidade: 'grave', efeito: 'Aumento do risco de infeccoes graves e neutropenia', conduta: 'Nao associar' },
      { medicamento: 'Abatacepte', gravidade: 'grave', efeito: 'Risco aumentado de infeccoes graves', conduta: 'Nao associar' },
      { medicamento: 'Metotrexato', gravidade: 'leve', efeito: 'Sem interacao significativa', conduta: 'Associacao comum e segura' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'NAO ATRAVESSA PLACENTA significativamente devido a ausencia de Fc - OPCAO PREFERENCIAL PARA GESTANTES com doencas reumaticas. Excrecao minima no leite; absorvida minimamente pelo TGI do lactente.' },
    monitorizacao: [
      'PPD/IGRA antes de iniciar e anualmente',
      'Sorologias hepatite B/C antes',
      'Hemograma periodico',
      'Avaliacao de infeccoes a cada consulta',
      'Monitorar sinais de ICC'
    ],
    doencasRelacionadas: ['artrite-reumatoide', 'doenca-crohn', 'psoriase', 'espondilite-anquilosante'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-tnf', 'biologico', 'reumatologia', 'gastroenterologia', 'dermatologia', 'gestacao-seguro', 'peguilado']
  },
  {
    id: 'golimumabe',
    nomeGenerico: 'Golimumabe',
    nomesComerciais: ['Simponi', 'Simponi Aria'],
    atcCode: 'L04AB06',
    rxNormCui: '824868',
    drugBankId: 'DB06674',
    snomedCT: '442264009',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_tnf',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '50mg/0,5ml', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '100mg/ml', disponivelSUS: false },
      { forma: 'injetavel_iv', concentracao: '50mg/4ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Artrite reumatoide moderada a grave (com MTX)',
      'Artrite psoriasica',
      'Espondilite anquilosante',
      'Espondiloartrite axial nao radiografica',
      'Colite ulcerativa moderada a grave',
      'Artrite idiopatica juvenil poliarticular (>=2 anos)'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1-kappa TOTALMENTE HUMANO anti-TNF-alfa. Liga-se com alta afinidade a formas soluvel e transmembrana de TNF-alfa, neutralizando sua atividade biologica. Por ser TOTALMENTE HUMANO (produzido por hibridomas), apresenta MENOR IMUNOGENICIDADE que anticorpos quimericos (infliximabe). Administracao MENSAL SC e vantagem para adesao.',
    posologias: [
      {
        indicacao: 'AR (SC)',
        adultos: { dose: '50mg', frequencia: 'SC 1x/mes', observacoes: 'Associar MTX para AR' }
      },
      {
        indicacao: 'AR (IV - Simponi Aria)',
        adultos: { dose: '2mg/kg', frequencia: 'IV semanas 0, 4, depois a cada 8 semanas', observacoes: 'Infusao em 30 minutos; associar MTX' }
      },
      {
        indicacao: 'Artrite psoriasica/EA (SC)',
        adultos: { dose: '50mg', frequencia: 'SC 1x/mes' }
      },
      {
        indicacao: 'Colite ulcerativa',
        adultos: { dose: '200mg semana 0, 100mg semana 2, depois 100mg a cada 4 semanas', frequencia: 'Ver esquema', observacoes: 'Pacientes >80kg podem necessitar dose maior para manutencao de resposta' }
      }
    ],
    contraindicacoes: [
      'Tuberculose ativa',
      'Infeccoes graves ativas',
      'Insuficiencia cardiaca NYHA III-IV',
      'Hipersensibilidade ao golimumabe'
    ],
    precaucoes: [
      'BLACK BOX: Infeccoes graves - TB, fungicas invasivas, bacterianas, virais, oportunistas',
      'BLACK BOX: Linfoma e outras malignidades (especialmente em criancas/adolescentes)',
      'Triagem obrigatoria para TB latente antes do inicio',
      'Triagem para hepatite B (reativacao pode ocorrer)',
      'Nao iniciar durante infeccao ativa',
      'Pode exacerbar ou induzir ICC',
      'Pode causar ou exacerbar doencas desmielinizantes',
      'Sindrome lupus-like'
    ],
    efeitosAdversos: {
      comuns: ['Infeccoes respiratorias superiores', 'Reacoes no local da injecao (SC)', 'Elevacao de transaminases', 'Hipertensao'],
      graves: ['Tuberculose', 'Infeccoes fungicas invasivas', 'Linfoma hepatoesplenico de celulas T', 'ICC descompensada', 'Lupus-like', 'Doenca desmielinizante', 'Citopenias']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'contraindicada', efeito: 'Risco de infeccao pelo agente vacinal', conduta: 'Evitar; atualizar vacinas antes de iniciar' },
      { medicamento: 'Anakinra', gravidade: 'grave', efeito: 'Infeccoes graves e neutropenia', conduta: 'Nao associar' },
      { medicamento: 'Abatacepte', gravidade: 'grave', efeito: 'Aumento de infeccoes sem beneficio adicional', conduta: 'Nao associar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excrecao minima no leite; absorvida minimamente pelo TGI do lactente' },
    monitorizacao: [
      'TB screening antes e durante tratamento',
      'Hepatite B/C screening',
      'Hemograma periodico',
      'Funcao hepatica',
      'Sinais de infeccao, ICC, desmielinizacao'
    ],
    doencasRelacionadas: ['artrite-reumatoide', 'colite-ulcerativa', 'espondilite-anquilosante', 'artrite-psoriasica'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-tnf', 'biologico', 'humano', 'reumatologia', 'gastroenterologia', 'mensal']
  },

  // ============================================================================
  // IL-1 INHIBITORS
  // ============================================================================
  {
    id: 'anakinra',
    nomeGenerico: 'Anakinra',
    nomesComerciais: ['Kineret'],
    atcCode: 'L04AC03',
    rxNormCui: '327361',
    drugBankId: 'DB00026',
    snomedCT: '386896009',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il6',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100mg/0,67ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Artrite reumatoide moderada a grave (apos falha de DMARDs)',
      'CAPS - Sindrome periodica associada a criopirina (NOMID/CINCA, MWS, FCAS)',
      'Doenca de Still do adulto',
      'Artrite idiopatica juvenil sistemica',
      'Sindrome de ativacao macrofagica (off-label)',
      'Gota aguda (off-label)'
    ],
    mecanismoAcao: 'Forma recombinante do ANTAGONISTA DO RECEPTOR DE IL-1 humano (IL-1Ra). Liga-se competitivamente ao receptor de IL-1 tipo I (IL-1RI), bloqueando sinalizacao de IL-1alfa e IL-1beta. IL-1 e citocina pro-inflamatoria central em doencas autoinflamatorias (CAPS, Still) e inflamatorias (AR, gota). MEIA-VIDA CURTA (~4-6h) requer administracao DIARIA - mas permite rapida reversibilidade em caso de infeccao.',
    posologias: [
      {
        indicacao: 'Artrite reumatoide',
        adultos: { dose: '100mg', frequencia: 'SC 1x/dia', observacoes: 'Mesma hora todos os dias' }
      },
      {
        indicacao: 'CAPS/NOMID',
        adultos: { dose: 'Inicial 1-2mg/kg/dia, titular ate controle', frequencia: 'SC 1x/dia', doseMaxima: '8mg/kg/dia em casos graves' },
        pediatrico: { dose: '1-2mg/kg/dia, titular ate controle', frequencia: 'SC 1x/dia', doseMaxima: '8mg/kg/dia' }
      },
      {
        indicacao: 'Doenca de Still / SAM',
        adultos: { dose: '100mg a 200mg', frequencia: 'SC 1-2x/dia', observacoes: 'Doses mais altas podem ser necessarias em SAM' }
      },
      {
        indicacao: 'Gota aguda (off-label)',
        adultos: { dose: '100mg', frequencia: 'SC 1x/dia por 3-5 dias', observacoes: 'Alternativa quando AINEs/colchicina/corticoides contraindicados' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a anakinra ou proteinas derivadas de E. coli',
      'Neutropenia grave (neutrofilos <1500/mm3)'
    ],
    precaucoes: [
      'Infeccoes - risco aumentado de infeccoes graves',
      'Neutropenia - monitorar neutrofilos; comum dose-dependente',
      'TB - rastrear antes (menor risco que anti-TNF)',
      'NAO associar com anti-TNF (aumento de infeccoes graves e neutropenia sem beneficio)',
      'Reacoes no local de injecao muito comuns (~70%) - geralmente melhoram com o tempo',
      'Imunogenicidade - anticorpos anti-anakinra podem se desenvolver',
      'Ajuste em DRC'
    ],
    efeitosAdversos: {
      comuns: ['Reacoes no local de injecao (eritema, dor, prurido)', 'Cefaleia', 'Nausea', 'Diarreia', 'Neutropenia leve-moderada'],
      graves: ['Infeccoes graves', 'Neutropenia grave', 'Reacoes de hipersensibilidade', 'Hepatotoxicidade']
    },
    interacoes: [
      { medicamento: 'Anti-TNF (etanercepte, adalimumabe)', gravidade: 'grave', efeito: 'Estudo mostrou aumento de infeccoes graves e neutropenia sem beneficio', conduta: 'Nao associar' },
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco teorico de infeccao', conduta: 'Evitar durante tratamento' }
    ],
    ajusteDoseRenal: [
      { tfg: '>=30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: '100mg em dias alternados' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Proteina grande provavelmente nao absorvida pelo lactente. Dados limitados.' },
    monitorizacao: [
      'Neutrofilos: antes, mensalmente nos primeiros 3 meses, depois trimestralmente',
      'Sinais de infeccao',
      'Reacoes no local de injecao'
    ],
    doencasRelacionadas: ['artrite-reumatoide', 'caps', 'doenca-still', 'gota'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il1', 'antagonista-receptor', 'reumatologia', 'autoinflamatorio', 'diario']
  },
  {
    id: 'canakinumabe',
    nomeGenerico: 'Canakinumabe',
    nomesComerciais: ['Ilaris'],
    atcCode: 'L04AC08',
    rxNormCui: '854930',
    drugBankId: 'DB06168',
    snomedCT: '449199001',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_il6',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '150mg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '150mg/ml', disponivelSUS: false }
    ],
    indicacoes: [
      'CAPS - Sindrome periodica associada a criopirina (FCAS, MWS, NOMID)',
      'TRAPS - Sindrome periodica associada ao receptor de TNF',
      'HIDS/MKD - Sindrome de hiper-IgD',
      'FMF - Febre mediterranea familiar (resistente a colchicina)',
      'Artrite idiopatica juvenil sistemica',
      'Doenca de Still do adulto',
      'Artrite gotosa recorrente'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1-kappa TOTALMENTE HUMANO anti-IL-1beta. Liga-se especificamente a IL-1beta (nao IL-1alfa), neutralizando-a com alta afinidade. IL-1beta e a principal citocina patogenica nas sindromes autoinflamatorias (CAPS, TRAPS, FMF). MEIA-VIDA LONGA (~26 dias) permite administracao a cada 4-8 semanas. Mais especifico que anakinra (bloqueia apenas IL-1beta, nao IL-1alfa).',
    posologias: [
      {
        indicacao: 'CAPS',
        adultos: { dose: '150mg (>40kg) ou 2mg/kg (15-40kg)', frequencia: 'SC a cada 8 semanas', observacoes: 'Pode aumentar para 300mg ou 4mg/kg se resposta inadequada' },
        pediatrico: { dose: '2mg/kg (15-40kg) ou 150mg (>40kg)', frequencia: 'SC a cada 8 semanas', idadeMinima: '4 anos' }
      },
      {
        indicacao: 'TRAPS/HIDS/FMF',
        adultos: { dose: '150mg (>40kg) ou 2mg/kg (<=40kg)', frequencia: 'SC a cada 4 semanas', observacoes: 'Pode aumentar para 300mg se persistencia de atividade' }
      },
      {
        indicacao: 'AIJ sistemica/Doenca de Still',
        adultos: { dose: '4mg/kg (max 300mg)', frequencia: 'SC a cada 4 semanas' },
        pediatrico: { dose: '4mg/kg (max 300mg)', frequencia: 'SC a cada 4 semanas', idadeMinima: '2 anos' }
      },
      {
        indicacao: 'Artrite gotosa',
        adultos: { dose: '150mg', frequencia: 'SC dose unica', observacoes: 'Repetir apos >=12 semanas se nova crise. NAO usar para hiperuricemia cronica.' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao canakinumabe',
      'Infeccao ativa grave'
    ],
    precaucoes: [
      'Infeccoes - risco aumentado; interromper durante infeccao seria',
      'TB - rastrear antes de iniciar',
      'Vacinas vivas - evitar durante e ate 3 meses apos tratamento',
      'Resposta vacinal a vacinas inativadas pode ser atenuada',
      'Neutropenia - monitorar',
      'Malignidades - dados limitados de longo prazo',
      'Sindrome de ativacao macrofagica - pode ocorrer em AIJs'
    ],
    efeitosAdversos: {
      comuns: ['Nasofaringite', 'Diarreia', 'Infeccoes respiratorias', 'Cefaleia', 'Reacoes no local de injecao'],
      graves: ['Infeccoes graves (pneumonia, celulite)', 'Sindrome de ativacao macrofagica', 'Neutropenia', 'Trombocitopenia', 'Reacoes de hipersensibilidade']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infeccao', conduta: 'Evitar; aguardar 3 meses apos ultima dose' },
      { medicamento: 'Substratos CYP450', gravidade: 'leve', efeito: 'IL-1 pode suprimir CYP450; normalizacao pode alterar metabolismo', conduta: 'Monitorar farmacos com indice terapeutico estreito' },
      { medicamento: 'Anti-TNF', gravidade: 'moderada', efeito: 'Dados limitados; teoricamente risco de imunossupressao aditiva', conduta: 'Usar com cautela se necessario' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; IgG excretada no leite' },
    monitorizacao: [
      'Sinais de infeccao',
      'Hemograma (neutrofilos, plaquetas) periodicamente',
      'TB antes de iniciar',
      'Para AIJs: monitorar sinais de SAM'
    ],
    doencasRelacionadas: ['caps', 'traps', 'fmf', 'doenca-still', 'gota'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-il1beta', 'biologico', 'humano', 'autoinflamatorio', 'gota', 'intervalo-longo']
  },

  // ============================================================================
  // ANTI-BLyS (B-LYMPHOCYTE STIMULATOR)
  // ============================================================================
  {
    id: 'belimumabe',
    nomeGenerico: 'Belimumabe',
    nomesComerciais: ['Benlysta'],
    atcCode: 'L04AA26',
    rxNormCui: '1011464',
    drugBankId: 'DB08879',
    snomedCT: '449000005',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'anti_cd20',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '120mg', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '400mg', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '200mg/ml', disponivelSUS: false }
    ],
    indicacoes: [
      'Lupus eritematoso sistemico (LES) ativo com autoanticorpos positivos (adjuvante a terapia padrao)',
      'Nefrite lupica ativa classe III-V (adjuvante)'
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1-lambda TOTALMENTE HUMANO anti-BLyS (B-lymphocyte stimulator, tambem conhecido como BAFF). BLyS e citocina crucial para SOBREVIVENCIA, MATURACAO e DIFERENCIACAO de celulas B. Bloqueio de BLyS: (1) induz apoptose de celulas B autorreativas; (2) reduz producao de autoanticorpos; (3) reduz plasmoblastos circulantes. PRIMEIRO E UNICO BIOLOGICO APROVADO ESPECIFICAMENTE PARA LES.',
    posologias: [
      {
        indicacao: 'LES (IV)',
        adultos: { dose: '10mg/kg', frequencia: 'IV semanas 0, 2, 4, depois a cada 4 semanas', observacoes: 'Infusao em 1 hora; pode prolongar se reacao' }
      },
      {
        indicacao: 'LES (SC)',
        adultos: { dose: '200mg', frequencia: 'SC 1x/semana', observacoes: 'Pode alternar para SC apos estabilizacao com IV' }
      },
      {
        indicacao: 'Nefrite lupica (IV)',
        adultos: { dose: '10mg/kg', frequencia: 'IV semanas 0, 2, 4, depois a cada 4 semanas', observacoes: 'Associar a terapia de inducao padrao (micofenolato ou ciclofosfamida + corticoide)' }
      },
      {
        indicacao: 'Nefrite lupica (SC)',
        adultos: { dose: '400mg (2x200mg)', frequencia: 'SC semanal por 4 semanas (ataque), depois 200mg SC semanal', observacoes: 'Associar a terapia padrao' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade grave ao belimumabe',
      'Historia de anafilaxia previa ao belimumabe'
    ],
    precaucoes: [
      'Infeccoes - risco aumentado; monitorar sinais',
      'Reacoes de hipersensibilidade/infusionais - podem ser TARDIAS (horas a dias apos infusao)',
      'DEPRESSAO E IDEACAO SUICIDA - monitorar humor ativamente; LES per se aumenta risco',
      'Leucoencefalopatia multifocal progressiva (PML) - rara mas relatada',
      'Nao estudado em: LES neuropsiquiatrico grave; nefrite lupica requerendo dialise',
      'Vacinas vivas - evitar durante e ate 30 dias antes de iniciar',
      'Resposta a vacinas inativadas pode ser reduzida',
      'Mortalidade - sem aumento observado em estudos mas monitorar'
    ],
    efeitosAdversos: {
      comuns: ['Nauseas', 'Diarreia', 'Febre', 'Nasofaringite', 'Insonia', 'Dor nas extremidades', 'Reacoes infusionais/locais'],
      graves: ['Infeccoes serias', 'Depressao e ideacao suicida', 'Leucoencefalopatia multifocal progressiva (PML)', 'Reacoes de hipersensibilidade grave', 'Reativacao viral']
    },
    interacoes: [
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infeccao vacinal', conduta: 'Evitar; vacinar pelo menos 30 dias antes de iniciar' },
      { medicamento: 'Ciclofosfamida IV', gravidade: 'leve', efeito: 'Nao estudada associacao; uso concomitante em nefrite lupica', conduta: 'Pode usar em nefrite lupica conforme protocolo' },
      { medicamento: 'Rituximabe/outros biologicos', gravidade: 'grave', efeito: 'Nao estudado; risco teorico de imunossupressao aditiva', conduta: 'Evitar associacao' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'IgG excretada no leite; potencial para deplecao de celulas B no lactente' },
    monitorizacao: [
      'Sinais de infeccao',
      'Avaliacao de humor/ideacao suicida a cada consulta',
      'Reacoes infusionais (incluindo tardias)',
      'Sinais neurologicos focais (PML)',
      'Funcao renal em nefrite lupica'
    ],
    consideracoesEspeciais: {
      idosos: 'Dados limitados; usar com cautela',
      hepatopatas: 'Sem ajuste especifico'
    },
    doencasRelacionadas: ['lupus-eritematoso', 'nefrite-lupica'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['anti-blys', 'anti-baff', 'biologico', 'humano', 'lupus', 'primeiro-aprovado-les']
  },

  // ============================================================================
  // PDE4 INHIBITOR
  // ============================================================================
  {
    id: 'apremilaste',
    nomeGenerico: 'Apremilaste',
    nomesComerciais: ['Otezla'],
    atcCode: 'L04AA32',
    rxNormCui: '1439960',
    drugBankId: 'DB05676',
    snomedCT: '708198009',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'inibidor_jak',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Psoriase em placas moderada a grave (candidatos a fototerapia ou terapia sistemica)',
      'Artrite psoriasica',
      'Ulceras orais associadas a doenca de Behcet'
    ],
    mecanismoAcao: 'Inibidor oral seletivo de fosfodiesterase 4 (PDE4). PDE4 e enzima intracelular que degrada AMPc (adenosina monofosfato ciclico). Inibicao de PDE4 aumenta AMPc intracelular, resultando em: (1) modulacao de producao de citocinas - REDUZ TNF-alfa, IL-23, IL-17 e AUMENTA IL-10 anti-inflamatoria; (2) nao e imunossupressor direto - mecanismo distinto de biologicos. MOLECULA PEQUENA ORAL - alternativa a injetaveis.',
    posologias: [
      {
        indicacao: 'Psoriase/Artrite psoriasica/Behcet',
        adultos: { dose: 'Titulacao obrigatoria: D1: 10mg AM; D2: 10mg AM e PM; D3: 10mg AM, 20mg PM; D4: 20mg AM e PM; D5: 20mg AM, 30mg PM; D6+: 30mg 2x/dia', frequencia: 'Ver titulacao', observacoes: 'Titulacao em 6 dias reduz efeitos GI' }
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade ao apremilaste'
    ],
    precaucoes: [
      'DEPRESSAO - casos de ideacao suicida e suicidio relatados; avaliar risco-beneficio em pacientes com historia de depressao',
      'Perda de peso - comum (5-10% dos pacientes); monitorar peso regularmente',
      'Nauseas e diarreia - muito comuns no inicio; titulacao gradual ajuda',
      'Insuficiencia renal - ajuste de dose necessario se ClCr <30',
      'Nao requer monitoramento laboratorial de rotina - vantagem sobre biologicos e JAKi',
      'Nao e imunossupressor - NAO aumenta risco de infeccoes serias ou TB'
    ],
    efeitosAdversos: {
      comuns: ['Diarreia (~17%)', 'Nausea (~17%)', 'Cefaleia (~10%)', 'Infeccoes respiratorias superiores', 'Vomitos', 'Nasofaringite', 'Dor abdominal'],
      graves: ['Depressao grave', 'Ideacao suicida', 'Perda de peso significativa']
    },
    interacoes: [
      { medicamento: 'Indutores fortes de CYP3A4 (rifampicina, fenobarbital, carbamazepina, fenitoina)', gravidade: 'grave', efeito: 'Reduz AUC de apremilaste em ~72%', mecanismo: 'Inducao CYP3A4', conduta: 'Nao recomendado - eficacia comprometida' },
      { medicamento: 'Inibidores de CYP3A4', gravidade: 'leve', efeito: 'Aumento modesto de exposicao', conduta: 'Sem ajuste necessario' },
      { medicamento: 'Metotrexato', gravidade: 'leve', efeito: 'Sem interacao farmacocinetica', conduta: 'Pode associar' }
    ],
    ajusteDoseRenal: [
      { tfg: '>=30', ajuste: 'Sem ajuste' },
      { tfg: '<30', ajuste: 'Titulacao com apenas dose AM; manutencao: 30mg 1x/dia' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; excretado no leite em animais' },
    monitorizacao: [
      'Peso corporal periodicamente',
      'Avaliacao de humor/depressao',
      'Sintomas GI no inicio',
      'NAO requer hemograma, funcao hepatica ou screening de TB de rotina'
    ],
    consideracoesEspeciais: {
      idosos: 'Farmacocinetica similar; maior sensibilidade a efeitos GI',
      hepatopatas: 'Sem ajuste em insuficiencia hepatica'
    },
    doencasRelacionadas: ['psoriase', 'artrite-psoriasica', 'doenca-behcet'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['pde4-inhibitor', 'oral', 'nao-biologico', 'dermatologia', 'reumatologia', 'sem-monitoring-labs']
  },

  // ============================================================================
  // DMARDs CONVENCIONAIS
  // ============================================================================
  {
    id: 'leflunomida',
    nomeGenerico: 'Leflunomida',
    nomesComerciais: ['Arava', 'Leflunomida'],
    atcCode: 'L04AA13',
    rxNormCui: '27169',
    drugBankId: 'DB01097',
    snomedCT: '386904002',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'dmard',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '100mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Artrite reumatoide ativa (monoterapia ou com MTX)',
      'Artrite psoriasica'
    ],
    mecanismoAcao: 'Pro-droga convertida em metabolito ativo teriflunomida (A77 1726) que INIBE DIHIDROOROTATO DESIDROGENASE (DHODH), enzima chave na sintese de NOVO de pirimidinas. Linfocitos ativados dependem de sintese de novo (vs. via de resgate), tornando-os seletivamente vulneraveis. Resultado: reducao de proliferacao de linfocitos T e B ativados e reducao de autoanticorpos. MEIA-VIDA MUITO LONGA (~2 semanas) devido a circulacao entero-hepatica.',
    posologias: [
      {
        indicacao: 'AR/Artrite psoriasica',
        adultos: { dose: '20mg', frequencia: '1x/dia', observacoes: 'Dose de ataque (100mg/dia x 3 dias) opcional - acelera estado de equilibrio mas aumenta hepatotoxicidade' }
      },
      {
        indicacao: 'Dose de ataque (opcional)',
        adultos: { dose: '100mg', frequencia: '1x/dia por 3 dias, depois 20mg/dia', observacoes: 'NAO recomendado em pacientes com risco hepatico' }
      }
    ],
    contraindicacoes: [
      'Gestacao - TERATOGENICO (Categoria X)',
      'Mulheres em idade fertil sem contracepcao eficaz',
      'Hepatopatia grave ou ALT >2x LSN pre-tratamento',
      'Imunodeficiencia grave (HIV com AIDS, aplasia medular)',
      'Infeccoes graves ativas',
      'Insuficiencia renal grave (dados limitados)'
    ],
    precaucoes: [
      'BLACK BOX: Hepatotoxicidade - pode ser fatal; monitorar ALT mensalmente nos primeiros 6 meses',
      'BLACK BOX: Gravidez - teratogenico; contracepcao obrigatoria; washout necessario antes de tentar engravidar',
      'Procedimento de eliminacao (washout) com colestiramina ou carvao necessario: antes de gravidez ou se toxicidade grave',
      'Imunossupressao - risco de infeccoes',
      'Pneumonite intersticial - rara mas grave',
      'Neuropatia periferica',
      'Hipertensao - pode ocorrer ou piorar',
      'Citopenias - monitorar hemograma'
    ],
    efeitosAdversos: {
      comuns: ['Diarreia (~17%)', 'Nausea', 'Alopecia (~10%)', 'Rash cutaneo', 'Elevacao de ALT', 'Cefaleia', 'Hipertensao'],
      graves: ['Hepatotoxicidade grave (inclusive fatal)', 'Pancitopenia', 'Agranulocitose', 'Pneumonite intersticial', 'Neuropatia periferica', 'Stevens-Johnson/NET', 'Infeccoes graves']
    },
    interacoes: [
      { medicamento: 'Metotrexato', gravidade: 'moderada', efeito: 'Hepatotoxicidade aditiva', mecanismo: 'Ambos hepatotoxicos', conduta: 'Monitorar ALT mais frequentemente; associacao possivel com cautela' },
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Pode aumentar INR', mecanismo: 'Inibicao CYP2C9', conduta: 'Monitorar INR frequentemente' },
      { medicamento: 'Rifampicina', gravidade: 'moderada', efeito: 'Aumenta pico de teriflunomida em 40%', mecanismo: 'Inducao formacao de metabolito', conduta: 'Monitorar tolerancia' },
      { medicamento: 'Vacinas vivas', gravidade: 'grave', efeito: 'Risco de infeccao vacinal', conduta: 'Evitar' },
      { medicamento: 'Colestiramina/Carvao ativado', gravidade: 'leve', efeito: 'REDUZ niveis de leflunomida - usado para washout', conduta: 'Usar para eliminacao acelerada quando necessario' }
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado - metabolito excretado no leite; MEIA-VIDA LONGA persiste por meses sem washout' },
    monitorizacao: [
      'ALT: antes, mensalmente nos primeiros 6 meses, depois a cada 6-8 semanas',
      'Hemograma: antes, mensalmente nos primeiros 6 meses',
      'Pressao arterial periodicamente',
      'Sintomas de infeccao pulmonar'
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de hepatotoxicidade; iniciar com cautela',
      hepatopatas: 'Contraindicado se ALT >2x LSN ou hepatopatia pre-existente',
      pediatrico: 'Nao aprovado em pediatria'
    },
    orientacoesPaciente: [
      'Contracepcao eficaz obrigatoria durante tratamento e apos (washout necessario)',
      'Relatar imediatamente: ictericia, fadiga inexplicada, dor abdominal, febre',
      'Evitar alcool (hepatotoxicidade aditiva)',
      'Alopecia geralmente reversivel'
    ],
    doencasRelacionadas: ['artrite-reumatoide', 'artrite-psoriasica'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['dmard', 'oral', 'reumatologia', 'hepatotoxicidade', 'teratogenico', 'rename', 'washout']
  },
  {
    id: 'sulfassalazina',
    nomeGenerico: 'Sulfassalazina',
    nomesComerciais: ['Azulfin', 'Salazopyrin EN'],
    atcCode: 'A07EC01',
    rxNormCui: '9524',
    drugBankId: 'DB00795',
    snomedCT: '387248006',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'dmard',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '500mg EN (enteric-coated)', disponivelSUS: true }
    ],
    indicacoes: [
      'Artrite reumatoide',
      'Espondiloartrites (espondilite anquilosante, artrite psoriasica - componente periferico)',
      'Artrite idiopatica juvenil',
      'Colite ulcerativa',
      'Doenca de Crohn colonica'
    ],
    mecanismoAcao: 'Pro-droga clivada por bacterias colonicas em sulfapiridina e acido 5-aminossalicilico (5-ASA/mesalazina). SULFAPIRIDINA - absorvida, responsavel por efeitos anti-reumaticos (mecanismo exato incerto - possivel inibicao de sintese de folato, modulacao de adenosina, efeitos em NFkB). 5-ASA - acao anti-inflamatoria intestinal topica. Combinacao UNICA de efeitos sistemicos e intestinais.',
    posologias: [
      {
        indicacao: 'AR/Espondiloartrites',
        adultos: { dose: '2-3g', frequencia: 'Dividido 2-3x/dia', doseMaxima: '3g/dia', observacoes: 'TITULACAO OBRIGATORIA: iniciar 500mg/dia, aumentar 500mg/semana ate dose alvo. Reduz intolerancia GI.' }
      },
      {
        indicacao: 'Artrite idiopatica juvenil',
        adultos: { dose: '30-50mg/kg/dia', frequencia: 'Dividido 2x/dia', doseMaxima: '2g/dia' },
        pediatrico: { dose: '30-50mg/kg/dia', frequencia: 'Dividido 2x/dia', doseMaxima: '2g/dia', idadeMinima: '6 anos', observacoes: 'Titulacao gradual' }
      },
      {
        indicacao: 'Colite ulcerativa (inducao)',
        adultos: { dose: '3-4g', frequencia: 'Dividido 3-4x/dia', observacoes: 'Doses maiores para inducao' }
      },
      {
        indicacao: 'Colite ulcerativa (manutencao)',
        adultos: { dose: '2g', frequencia: 'Dividido 2x/dia' }
      }
    ],
    contraindicacoes: [
      'Alergia a sulfonamidas ou salicilatos',
      'Porfiria',
      'Obstrucao intestinal ou urinaria',
      'Deficiencia de G6PD (hemolise)'
    ],
    precaucoes: [
      'HIPERSENSIBILIDADE a sulfonamidas - rash grave, Stevens-Johnson, DRESS',
      'Discrasias sanguineas - agranulocitose, anemia aplastica (raras mas graves)',
      'Hepatotoxicidade',
      'Oligospermia REVERSIVEL - pode afetar fertilidade masculina (recupera apos suspensao)',
      'Deficiencia de folato - suplementar acido folico',
      'Coloracao alaranjada da urina/pele (inofensiva)',
      'Intolerancia GI comum - titulacao e formulacoes entericas ajudam'
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Vomitos', 'Dispepsia', 'Cefaleia', 'Rash cutaneo', 'Coloracao alaranjada de urina', 'Oligospermia (reversivel)'],
      graves: ['Agranulocitose', 'Anemia aplastica', 'Sindrome de Stevens-Johnson', 'DRESS', 'Hepatite', 'Pneumonite', 'Nefrite intersticial']
    },
    interacoes: [
      { medicamento: 'Digoxina', gravidade: 'leve', efeito: 'Pode reduzir absorcao de digoxina', conduta: 'Separar administracao em 2 horas' },
      { medicamento: 'Acido folico', gravidade: 'leve', efeito: 'Sulfassalazina pode reduzir absorcao de folato', conduta: 'Suplementar acido folico 1mg/dia' },
      { medicamento: 'Varfarina', gravidade: 'leve', efeito: 'Pode deslocar de proteinas plasmaticas', conduta: 'Monitorar INR' },
      { medicamento: 'Metotrexato', gravidade: 'leve', efeito: 'Teoricamente pode reduzir absorcao; associacao comum', conduta: 'Pode usar juntos com monitoramento' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compativel com precaucao; sulfa excretada no leite - evitar em RN icterico ou prematuro (risco de kernicterus)' },
    monitorizacao: [
      'Hemograma: antes, a cada 2-4 semanas nos primeiros 3 meses, depois trimestral',
      'Funcao hepatica: antes, periodicamente',
      'Funcao renal: periodicamente',
      'Espermatograma se infertilidade masculina em investigacao'
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de discrasias sanguineas; monitorar mais frequentemente',
      hepatopatas: 'Usar com cautela',
      pediatrico: 'Aprovado para AIJ >=6 anos. Evitar em RN por risco de kernicterus.'
    },
    doencasRelacionadas: ['artrite-reumatoide', 'espondilite-anquilosante', 'artrite-psoriasica', 'colite-ulcerativa', 'doenca-crohn'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['dmard', 'oral', 'reumatologia', 'gastroenterologia', 'rename', 'titulacao']
  },
  {
    id: 'hidroxicloroquina',
    nomeGenerico: 'Hidroxicloroquina',
    nomesComerciais: ['Plaquinol', 'Reuquinol'],
    atcCode: 'P01BA02',
    rxNormCui: '5521',
    drugBankId: 'DB01611',
    snomedCT: '373540008',
    classeTerapeutica: 'imunossupressor',
    subclasse: 'dmard',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '400mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Lupus eritematoso sistemico (LES) - TODOS os pacientes devem usar se tolerado',
      'Artrite reumatoide',
      'Sindrome de Sjogren',
      'Lupus cutaneo',
      'Malaria (profilaxia e tratamento)',
      'Porfiria cutanea tarda'
    ],
    mecanismoAcao: 'Antimalarico com multiplos mecanismos imunomoduladores: (1) ACUMULA em lisossomos, aumentando pH - interfere com processamento de antigenos e apresentacao via MHC; (2) Inibe ativacao de TLR7/9 (receptores que reconhecem acidos nucleicos); (3) Reduz producao de citocinas pro-inflamatorias (IL-1, IL-6, TNF); (4) Inibe ativacao de celulas dendriticas. EFEITOS ADICIONAIS em LES: reduz dano organico, risco de flares, trombose e mortalidade.',
    posologias: [
      {
        indicacao: 'LES',
        adultos: { dose: '200-400mg', frequencia: '1x/dia', doseMaxima: '5mg/kg peso REAL/dia (nao ideal)', observacoes: 'Limite rigoroso para prevenir toxicidade retiniana. Em pacientes baixos/magros, usar peso real.' }
      },
      {
        indicacao: 'AR',
        adultos: { dose: '400mg', frequencia: '1x/dia ou dividido 2x/dia', doseMaxima: '5mg/kg/dia', observacoes: 'Pode levar 3-6 meses para efeito pleno' }
      },
      {
        indicacao: 'Malaria (profilaxia)',
        adultos: { dose: '400mg', frequencia: '1x/semana', observacoes: 'Iniciar 2 semanas antes de viajar' }
      }
    ],
    contraindicacoes: [
      'Retinopatia ou maculopatia pre-existente',
      'Hipersensibilidade a hidroxicloroquina ou cloroquina',
      'Alteracoes de campo visual atribuidas a 4-aminoquinolinas'
    ],
    precaucoes: [
      'TOXICIDADE RETINIANA - IRREVERSIVEL se nao detectada precocemente; risco aumenta com dose cumulativa >1000g e duracao >5 anos',
      'Recomendacao oftalmologica: exame basal e anual apos 5 anos (ou antes se fatores de risco: dose >5mg/kg, DRC, uso concomitante de tamoxifeno)',
      'Cardiomiopatia - rara mas pode ser fatal; ECG se sintomas',
      'Prolongamento QT - evitar em sindrome QT longo ou com farmacos que prolongam QT',
      'Hipoglicemia - pode ocorrer, especialmente com antidiabeticos',
      'Miopatia/neuropatia - raras',
      'Psicose - rara'
    ],
    efeitosAdversos: {
      comuns: ['Nausea', 'Diarreia', 'Dor abdominal', 'Cefaleia', 'Tontura', 'Rash cutaneo'],
      graves: ['Toxicidade retiniana (maculopatia em olho de boi)', 'Cardiomiopatia', 'Prolongamento QT', 'Miopatia', 'Neuropatia', 'Psicose', 'Agranulocitose']
    },
    interacoes: [
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Aumenta niveis de digoxina em ~25%', mecanismo: 'Reducao de clearance', conduta: 'Monitorar digoxinemia' },
      { medicamento: 'Farmacos que prolongam QT (amiodarona, fluoroquinolonas, antipsicoticos)', gravidade: 'moderada', efeito: 'Prolongamento QT aditivo', conduta: 'Evitar ou monitorar ECG' },
      { medicamento: 'Insulina/Antidiabeticos', gravidade: 'moderada', efeito: 'Pode potencializar hipoglicemia', conduta: 'Monitorar glicemia; ajustar dose' },
      { medicamento: 'Ciclosporina', gravidade: 'leve', efeito: 'Pode aumentar niveis de ciclosporina', conduta: 'Monitorar niveis' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'COMPATIVEL - excretada em baixas concentracoes no leite; considerada segura durante amamentacao. NAO descontinuar em gestantes com LES.' },
    monitorizacao: [
      'Exame oftalmologico: basal (dentro de 1 ano do inicio), anual apos 5 anos de uso',
      'OCT (tomografia de coerencia optica) e campimetria 10-2: metodos preferenciais',
      'ECG: basal se fatores de risco cardiaco; durante tratamento se sintomas',
      'Hemograma: periodicamente'
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de toxicidade retiniana; ajustar dose pelo peso',
      hepatopatas: 'Usar com cautela',
      pediatrico: 'Seguro em LES juvenil'
    },
    orientacoesPaciente: [
      'Exames oftalmologicos regulares sao ESSENCIAIS',
      'Relatar alteracoes visuais imediatamente',
      'Pode levar meses para efeito completo - nao suspender precocemente',
      'Proteger-se do sol (fotossensibilizante)'
    ],
    doencasRelacionadas: ['lupus-eritematoso', 'artrite-reumatoide', 'sjogren'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['dmard', 'antimalarico', 'lupus', 'reumatologia', 'rename', 'toxicidade-retiniana']
  },

  // ============================================================================
  // GOTA / FEBRE MEDITERRANEA FAMILIAR
  // ============================================================================
  {
    id: 'colchicina',
    nomeGenerico: 'Colchicina',
    nomesComerciais: ['Colchis', 'Colcrys', 'Mitigare'],
    atcCode: 'M04AC01',
    rxNormCui: '2683',
    drugBankId: 'DB01394',
    snomedCT: '73133000',
    classeTerapeutica: 'antigotoso',
    subclasse: 'anti_inflamatorio_gota',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '0,5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '0,6mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Crise aguda de gota',
      'Profilaxia de crises de gota (durante inicio de terapia hipouricemica)',
      'Febre Mediterranea Familiar (FMF)',
      'Pericardite aguda e recorrente',
      'Doenca de Behcet (off-label)',
      'Pseudogota (condrocalcinose)'
    ],
    mecanismoAcao: 'Liga-se a TUBULINA e INIBE POLIMERIZACAO DE MICROTUBULOS. Efeitos resultantes: (1) Bloqueia migracao e fagocitose de neutrofilos para cristais de urato; (2) Inibe ativacao do inflamassoma NLRP3 e liberacao de IL-1beta; (3) Reduz producao de superoxidos; (4) Inibe adesao e quimiotaxia de neutrofilos. NAO afeta niveis de acido urico - apenas anti-inflamatorio. ESTREITO INDICE TERAPEUTICO - toxicidade dose-dependente.',
    posologias: [
      {
        indicacao: 'Crise aguda de gota (regime baixa dose - recomendado)',
        adultos: { dose: '1,2mg (ou 1mg) seguido de 0,6mg (ou 0,5mg) 1h depois', frequencia: 'Dose unica no dia (total 1,8mg ou 1,5mg)', doseMaxima: '1,8mg nas primeiras 24h', observacoes: 'Regime baixa dose igualmente eficaz e melhor tolerado que alta dose' }
      },
      {
        indicacao: 'Profilaxia de crises (durante inicio de ULT)',
        adultos: { dose: '0,5-0,6mg', frequencia: '1-2x/dia', observacoes: 'Continuar por 3-6 meses apos atingir alvo de uricemia; pode estender se flares continuam' }
      },
      {
        indicacao: 'Febre Mediterranea Familiar',
        adultos: { dose: '1,2-2,4mg', frequencia: 'Dividido 1-2x/dia', doseMaxima: '2,4mg/dia' },
        pediatrico: { dose: '0,3-1,8mg/dia conforme idade', frequencia: '1-2x/dia', observacoes: '4-6 anos: 0,3-1,8mg; 6-12 anos: 0,9-1,8mg; >12 anos: dose adulto' }
      },
      {
        indicacao: 'Pericardite aguda',
        adultos: { dose: '0,5mg', frequencia: '2x/dia (ou 1x/dia se peso <70kg)', observacoes: 'Por 3 meses; recorrente: por 6 meses' }
      }
    ],
    contraindicacoes: [
      'Insuficiencia renal grave (ClCr <30) em uso cronico sem ajuste',
      'Insuficiencia hepatica grave',
      'Uso concomitante de inibidores potentes de CYP3A4 E P-gp em DRC/hepatopatia',
      'Discrasia sanguinea'
    ],
    precaucoes: [
      'ESTREITO INDICE TERAPEUTICO - toxicidade comum em doses altas ou com interacoes',
      'Ajustar dose rigorosamente em DRC e hepatopatia',
      'INTERACOES FATAIS relatadas com claritromicina e outros inibidores de CYP3A4 em pacientes de risco',
      'Sintomas GI (diarreia, nausea) sao marcadores de toxicidade iminente',
      'Toxicidade grave: miopatia, neuropatia, mielossupressao, CID',
      'Idosos mais susceptiveis a toxicidade'
    ],
    efeitosAdversos: {
      comuns: ['Diarreia (dose-limitante)', 'Nauseas', 'Vomitos', 'Colicas abdominais'],
      graves: ['Miopatia/rabdomiolise', 'Neuropatia periferica', 'Mielossupressao (pancitopenia)', 'CID', 'Falencia multiorganica (em overdose)']
    },
    interacoes: [
      { medicamento: 'Claritromicina / Eritromicina', gravidade: 'grave', efeito: 'Aumento dramatico de niveis de colchicina (ate 280%); casos fatais relatados', mecanismo: 'Inibicao potente de CYP3A4 e P-gp', conduta: 'Reduzir dose de colchicina em 50-75% ou evitar; contraindicado em DRC/hepatopatia' },
      { medicamento: 'Cetoconazol / Itraconazol', gravidade: 'grave', efeito: 'Aumento significativo de exposicao', mecanismo: 'Inibicao CYP3A4', conduta: 'Reduzir dose de colchicina; evitar em DRC' },
      { medicamento: 'Ciclosporina', gravidade: 'grave', efeito: 'Aumenta niveis de colchicina; miopatia relatada', mecanismo: 'Inibicao P-gp', conduta: 'Evitar ou reduzir dose drasticamente' },
      { medicamento: 'Estatinas', gravidade: 'moderada', efeito: 'Risco aumentado de miopatia aditiva', conduta: 'Monitorar CPK; orientar sobre sintomas musculares' },
      { medicamento: 'Diltiazem / Verapamil', gravidade: 'moderada', efeito: 'Aumenta exposicao a colchicina', mecanismo: 'Inibicao moderada CYP3A4/P-gp', conduta: 'Reduzir dose de colchicina' }
    ],
    ajusteDoseRenal: [
      { tfg: '>=60', ajuste: 'Sem ajuste' },
      { tfg: '30-60', ajuste: 'Maximo 0,5mg 2x/dia; crise: 0,5mg dose unica' },
      { tfg: '<30', ajuste: 'Maximo 0,5mg 1x/dia; evitar em ClCr <10; considerar dialise' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compativel em doses baixas; excretado no leite em pequenas quantidades' },
    monitorizacao: [
      'Funcao renal e hepatica antes e durante uso cronico',
      'Hemograma em uso cronico',
      'CPK se sintomas musculares',
      'Sintomas GI como marcadores de limiar toxico'
    ],
    consideracoesEspeciais: {
      idosos: 'Mais susceptiveis a toxicidade; considerar funcao renal reduzida mesmo com creatinina normal',
      hepatopatas: 'Reducao de dose; evitar em grave',
      pediatrico: 'Usado em FMF pediatrica com ajuste por idade/peso'
    },
    orientacoesPaciente: [
      'Tomar ao primeiro sinal de crise para maxima eficacia',
      'Parar imediatamente se diarreia significativa - e sinal de toxicidade',
      'Informar medico sobre TODOS medicamentos em uso (interacoes perigosas)',
      'Manter hidratacao adequada'
    ],
    doencasRelacionadas: ['gota', 'fmf', 'pericardite', 'pseudogota'],
    citations: [],
    lastUpdate: '2026-01-17',
    tags: ['antigotoso', 'anti-inflamatorio', 'fmf', 'pericardite', 'rename', 'estreito-indice-terapeutico']
  }
];
