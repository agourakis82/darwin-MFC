/**
 * PNEUMOLOGIA NOVOS - DARWIN-MFC EXPANSAO 1000
 * =============================================
 * Agentes pulmonares avancados: antifibroticos, biologicos, broncodilatadores
 *
 * Referencias:
 * - INPULSIS/TOMORROW trials (Nintedanib)
 * - ASCEND/CAPACITY trials (Pirfenidone)
 * - SIROCCO/CALIMA trials (Benralizumab)
 * - DREAM/MENSA trials (Mepolizumab)
 * - NAVIGATOR/PATHWAY trials (Tezepelumab)
 * - REACT/RE2SPOND trials (Roflumilast)
 * - GLOW/SHINE trials (Glycopyrronium)
 * - FLIGHT trials (Umeclidinium)
 * - INLIGHT/INHANCE trials (Indacaterol)
 * - MORACTO/TONADO trials (Olodaterol)
 * - GlaxoSmithKline clinical program (Vilanterol)
 * - NICO/RENI trials (Revefenacin)
 */

import { Medicamento } from '@/lib/types/medicamento';

export const pneumologiaNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // ANTIFIBROTICOS - FIBROSE PULMONAR IDIOPATICA
  // =============================================================================
  {
    id: 'nintedanib',
    nomeGenerico: 'Nintedanib',
    nomesComerciais: ['Ofev', 'Vargatef'],
    atcCode: 'R03DX09',
    rxNormCui: '1592738',
    drugBankId: 'DB09079',
    snomedCT: '710815001',
    casNumber: '656247-17-5',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '100mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Fibrose pulmonar idiopatica (FPI)',
      'Doencas pulmonares intersticiais fibroticas cronicas com fenotipo progressivo',
      'Doenca pulmonar intersticial associada a esclerose sistemica (SSc-ILD)',
      'Cancer de pulmao nao pequenas celulas (CPNPC) - como Vargatef',
    ],
    mecanismoAcao: 'Inibidor triplo de tirosina quinase (TKI) que bloqueia receptores de PDGF (alfa e beta), VEGF (1-3) e FGF (1-3). Esses fatores de crescimento estao envolvidos na proliferacao de fibroblastos, deposicao de matriz extracelular e angiogenese na fibrose pulmonar. Reduz a taxa de declinio da CVF em aproximadamente 50%.',
    posologias: [
      {
        indicacao: 'Fibrose pulmonar idiopatica',
        adultos: {
          dose: '150mg',
          frequencia: '12/12h com alimentos',
          doseMaxima: '300mg/dia',
          observacoes: 'Reduzir para 100mg 12/12h se intolerancia GI. Tomar com alimentos gordurosos para melhor absorcao.',
        },
      },
      {
        indicacao: 'SSc-ILD/Fibrose progressiva',
        adultos: {
          dose: '150mg',
          frequencia: '12/12h com alimentos',
          observacoes: 'Mesmo esquema da FPI',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao nintedanib ou amendoim/soja (capsula contem lecitina)',
      'Gestacao',
      'Insuficiencia hepatica moderada a grave (Child-Pugh B ou C)',
    ],
    precaucoes: [
      'Diarreia muito comum (62%) - manejar com loperamida e hidratacao',
      'Hepatotoxicidade - monitorar TGO/TGP mensalmente nos primeiros 3 meses',
      'Aumento de risco de sangramento - cautela em anticoagulados',
      'Perfuracao GI - maior risco com corticoides concomitantes',
      'Hipertensao arterial - monitorar PA',
      'Comprometimento cicatricial - considerar suspensao perioperatoria',
    ],
    efeitosAdversos: {
      comuns: ['Diarreia (62%)', 'Nauseas', 'Dor abdominal', 'Vomitos', 'Elevacao de transaminases', 'Perda de apetite', 'Perda de peso'],
      graves: ['Hepatotoxicidade grave', 'Sangramento', 'Perfuracao GI', 'IAM', 'AVC'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores de CYP3A4 e P-gp (cetoconazol, eritromicina)',
        gravidade: 'moderada',
        efeito: 'Aumento da exposicao ao nintedanib',
        conduta: 'Monitorar efeitos adversos; considerar reducao de dose',
      },
      {
        medicamento: 'Indutores de CYP3A4 e P-gp (rifampicina, carbamazepina)',
        gravidade: 'moderada',
        efeito: 'Reducao da eficacia do nintedanib',
        conduta: 'Evitar; selecionar alternativas',
      },
      {
        medicamento: 'Anticoagulantes (varfarina, DOACs)',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Monitorar sangramento; cautela',
      },
      {
        medicamento: 'AINEs',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de perfuracao GI',
        conduta: 'Usar com cautela',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Dados limitados - usar com cautela' },
    ],
    gestacao: 'X',
    amamentacao: { compativel: false, observacao: 'Contraindicado - excrecao no leite desconhecida' },
    monitorizacao: [
      'TGO/TGP antes do inicio, mensalmente por 3 meses, depois periodicamente',
      'Bilirrubinas se elevacao de transaminases',
      'Sinais de sangramento',
      'PA periodica',
      'Peso corporal',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos (refeicao gordurosa melhora absorcao)',
      'Diarreia e muito comum - ter loperamida disponivel',
      'Manter hidratacao adequada',
      'Nao engravidar durante tratamento',
      'Informar medico sobre qualquer cirurgia planejada',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste por idade; maior risco de efeitos adversos',
      hepatopatas: 'Child-Pugh A: sem ajuste, monitorar; B/C: contraindicado',
    },
    doencasRelacionadas: ['fibrose-pulmonar-idiopatica', 'doenca-pulmonar-intersticial', 'esclerose-sistemica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['antifibrotico', 'FPI', 'TKI', 'INPULSIS', 'fibrose-pulmonar', 'pneumologia'],
  },

  {
    id: 'pirfenidona',
    nomeGenerico: 'Pirfenidona',
    nomesComerciais: ['Esbriet', 'Pirespa'],
    atcCode: 'R03DX11',
    rxNormCui: '1092400',
    drugBankId: 'DB04951',
    snomedCT: '703127000',
    casNumber: '53179-13-8',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '267mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '267mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '801mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Fibrose pulmonar idiopatica (FPI) leve a moderada',
    ],
    mecanismoAcao: 'Agente antifibrotico e anti-inflamatorio com mecanismo nao completamente elucidado. Reduz a proliferacao de fibroblastos, producao de proteinas e citocinas associadas a fibrose (TGF-beta, TNF-alfa, IL-1beta, PDGF). Possui propriedades antioxidantes. Reduz a taxa de declinio da CVF em cerca de 50%.',
    posologias: [
      {
        indicacao: 'Fibrose pulmonar idiopatica',
        adultos: {
          dose: 'Titulacao: Semana 1: 267mg 3x/dia; Semana 2: 534mg 3x/dia; Semana 3+: 801mg 3x/dia',
          frequencia: '8/8h com alimentos',
          doseMaxima: '2403mg/dia (801mg 3x/dia)',
          observacoes: 'Titulacao gradual minimiza efeitos GI. Tomar com alimentos para reduzir nauseas.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade a pirfenidona',
      'Uso concomitante com fluvoxamina (inibidor potente CYP1A2)',
      'Insuficiencia hepatica grave',
      'DRC grave (TFG <30)',
    ],
    precaucoes: [
      'Fotossensibilidade - evitar exposicao solar direta; usar protetor solar FPS 50+',
      'Hepatotoxicidade - monitorar transaminases',
      'Efeitos GI comuns (nauseas, dispepsia, anorexia) - titulacao lenta ajuda',
      'Rash cutaneo - pode necessitar reducao de dose ou suspensao',
      'Interacao com tabagismo (induz CYP1A2) - niveis reduzidos em fumantes',
    ],
    efeitosAdversos: {
      comuns: ['Nauseas (36%)', 'Rash cutaneo (30%)', 'Fadiga', 'Diarreia', 'Dispepsia', 'Fotossensibilidade', 'Anorexia', 'Cefaleia'],
      graves: ['Hepatotoxicidade', 'Angioedema', 'Sindrome Stevens-Johnson (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Fluvoxamina',
        gravidade: 'contraindicada',
        efeito: 'Aumento de 4x na exposicao a pirfenidona',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Outros inibidores de CYP1A2 (ciprofloxacino, amiodarona)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de pirfenidona',
        conduta: 'Monitorar efeitos adversos; considerar reducao de dose',
      },
      {
        medicamento: 'Tabagismo',
        gravidade: 'moderada',
        efeito: 'Reducao de 50% nos niveis de pirfenidona',
        conduta: 'Orientar cessacao do tabagismo; pode necessitar dose maior',
      },
      {
        medicamento: 'Omeprazol',
        gravidade: 'leve',
        efeito: 'Leve reducao da exposicao',
        conduta: 'Sem ajuste necessario',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>80', ajuste: 'Sem ajuste' },
      { tfg: '30-80', ajuste: 'Sem ajuste; monitorar' },
      { tfg: '<30', ajuste: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar' },
    monitorizacao: [
      'TGO/TGP antes do inicio, mensalmente por 6 meses, depois a cada 3 meses',
      'Funcao renal periodica',
      'Sinais de rash e fotossensibilidade',
      'CVF a cada 3-6 meses',
    ],
    orientacoesPaciente: [
      'Tomar com alimentos para reduzir nauseas',
      'EVITAR exposicao solar - usar protetor solar alto FPS, chapeu, roupas protetoras',
      'Nao fumar (reduz eficacia)',
      'Titulacao gradual nas primeiras 3 semanas',
      'Informar sobre qualquer rash cutaneo',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; maior risco de efeitos adversos',
      hepatopatas: 'Leve/moderada: cautela, monitorar; grave: contraindicado',
    },
    doencasRelacionadas: ['fibrose-pulmonar-idiopatica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['antifibrotico', 'FPI', 'pirfenidona', 'ASCEND', 'CAPACITY', 'fotossensibilidade'],
  },

  // =============================================================================
  // BIOLOGICOS PARA ASMA GRAVE
  // =============================================================================
  {
    id: 'benralizumab',
    nomeGenerico: 'Benralizumab',
    nomesComerciais: ['Fasenra'],
    atcCode: 'R03DX10',
    rxNormCui: '1876007',
    drugBankId: 'DB12023',
    snomedCT: '763529004',
    casNumber: '1044511-01-4',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '30mg/mL (seringa preenchida)', disponivelSUS: false },
    ],
    indicacoes: [
      'Asma grave eosinofilica refrataria em adultos e criancas >=12 anos',
      'Terapia adicional de manutencao em pacientes com asma grave nao controlada apesar de CI alta dose + LABA',
      'Rinossinusite cronica com polipose nasal (RSCPN) - adultos',
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1-kappa humanizado afucosilado que se liga a subunidade alfa do receptor de IL-5 (IL-5Ralfa) em eosinofilos e basofilos. Afucosilacao aumenta afinidade por FcgammaRIIIa em celulas NK, induzindo citotoxicidade celular dependente de anticorpo (ADCC) DIRETA e DEPLECAO QUASE COMPLETA de eosinofilos no sangue e tecidos. Difere de anti-IL-5 (mepolizumab) por causar apoptose direta vs. apenas neutralizacao.',
    posologias: [
      {
        indicacao: 'Asma grave eosinofilica',
        adultos: {
          dose: '30mg SC',
          frequencia: 'A cada 4 semanas por 3 doses (inducao), depois a cada 8 semanas (manutencao)',
          observacoes: 'Administrar no abdome, coxa ou parte superior do braco',
        },
        pediatrico: {
          dose: '30mg SC',
          frequencia: 'A cada 4 semanas por 3 doses, depois a cada 8 semanas',
          idadeMinima: '12 anos',
        },
      },
      {
        indicacao: 'Rinossinusite com polipose nasal',
        adultos: {
          dose: '30mg SC',
          frequencia: 'A cada 4 semanas por 3 doses, depois a cada 8 semanas',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao benralizumab',
    ],
    precaucoes: [
      'Reacoes de hipersensibilidade - podem ocorrer horas a dias apos administracao',
      'Infeccoes parasitarias preexistentes - tratar antes de iniciar (eosinofilos sao parte da defesa)',
      'Nao usar para crise asmatica aguda ou broncoespasmo agudo',
      'Nao descontinuar corticoides abruptamente apos inicio',
      'Reacoes no local de injecao',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Faringite', 'Reacoes no local de injecao (dor, eritema)', 'Febre'],
      graves: ['Reacoes de hipersensibilidade (anafilaxia rara)', 'Infeccoes parasitarias descontroladas'],
    },
    interacoes: [
      {
        medicamento: 'Vacinas vivas',
        gravidade: 'moderada',
        efeito: 'Possivel resposta vacinal reduzida',
        conduta: 'Preferencialmente vacinar antes do inicio; vacinas inativadas sao seguras',
      },
      {
        medicamento: 'Corticoides sistemicos',
        gravidade: 'leve',
        efeito: 'Sem interacao; reduzir corticoide gradualmente apos inicio',
        conduta: 'Desmame gradual de corticoides sob supervisao',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; anticorpos IgG sao excretados no leite' },
    monitorizacao: [
      'Contagem de eosinofilos (espera-se deplecao)',
      'Sintomas de asma e frequencia de exacerbacoes',
      'Funcao pulmonar (VEF1, PFE)',
      'Sinais de infeccao parasitaria em pacientes de risco',
    ],
    orientacoesPaciente: [
      'Administracao a cada 4-8 semanas por profissional de saude ou autoaplicacao treinada',
      'Nao e para alivio de crise - manter broncodilatador de resgate',
      'Nao parar medicamentos de controle sem orientacao',
      'Informar sobre viagens a areas endemicas de parasitas',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; dados limitados em >65 anos',
      pediatrico: 'Aprovado >=12 anos',
    },
    doencasRelacionadas: ['asma-grave', 'asma-eosinofilica', 'rinossinusite-polipose'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-IL5R', 'biologico', 'asma-grave', 'eosinofilica', 'SIROCCO', 'CALIMA', 'deplecao-eosinofilos'],
  },

  {
    id: 'mepolizumab',
    nomeGenerico: 'Mepolizumab',
    nomesComerciais: ['Nucala'],
    atcCode: 'R03DX09',
    rxNormCui: '1721035',
    drugBankId: 'DB06612',
    snomedCT: '724097009',
    casNumber: '196078-29-2',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '100mg/mL (seringa preenchida)', disponivelSUS: false },
      { forma: 'po_injetavel', concentracao: '100mg (frasco-ampola)', disponivelSUS: false },
    ],
    indicacoes: [
      'Asma grave eosinofilica refrataria em adultos e criancas >=6 anos',
      'Terapia adicional de manutencao em pacientes com eosinofilos sanguineos >=150 celulas/mcL',
      'Granulomatose eosinofilica com poliangiite (GEPA/Churg-Strauss)',
      'Sindrome hipereosinofilica (SHE)',
      'Rinossinusite cronica com polipose nasal (RSCPN)',
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG1-kappa humanizado anti-IL-5. IL-5 e a principal citocina responsavel pela maturacao, ativacao e sobrevida dos eosinofilos. Ligacao ao IL-5 bloqueia sua interacao com o receptor na superficie dos eosinofilos, reduzindo producao, maturacao e sobrevida destas celulas. Reduz eosinofilos sanguineos em cerca de 80-90%.',
    posologias: [
      {
        indicacao: 'Asma grave eosinofilica',
        adultos: {
          dose: '100mg SC',
          frequencia: 'A cada 4 semanas',
          observacoes: 'Pode ser autoadministrado apos treinamento',
        },
        pediatrico: {
          dose: '6-11 anos: 40mg SC; >=12 anos: 100mg SC',
          frequencia: 'A cada 4 semanas',
          idadeMinima: '6 anos',
        },
      },
      {
        indicacao: 'GEPA (Churg-Strauss)',
        adultos: {
          dose: '300mg SC (3 injecoes de 100mg)',
          frequencia: 'A cada 4 semanas',
        },
      },
      {
        indicacao: 'Sindrome hipereosinofilica',
        adultos: {
          dose: '300mg SC',
          frequencia: 'A cada 4 semanas',
        },
      },
      {
        indicacao: 'RSCPN',
        adultos: {
          dose: '100mg SC',
          frequencia: 'A cada 4 semanas',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao mepolizumab',
    ],
    precaucoes: [
      'Reacoes de hipersensibilidade - podem ser imediatas ou tardias',
      'Infeccoes parasitarias - tratar antes de iniciar',
      'Herpes zoster - casos relatados',
      'Nao usar para broncoespasmo agudo ou estado de mal asmatico',
      'Reduzir corticoides sistemicos gradualmente, nao abruptamente',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Reacoes no local de injecao', 'Dor nas costas', 'Fadiga', 'Nasofaringite'],
      graves: ['Reacoes de hipersensibilidade (raro)', 'Herpes zoster', 'Reacoes anafilacticas (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Vacinas vivas',
        gravidade: 'moderada',
        efeito: 'Resposta vacinal pode ser reduzida',
        conduta: 'Vacinar preferencialmente antes de iniciar',
      },
      {
        medicamento: 'Corticoides',
        gravidade: 'leve',
        efeito: 'Permite reducao de dose de corticoide',
        conduta: 'Desmame gradual sob supervisao',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; IgG excretada no leite' },
    monitorizacao: [
      'Contagem de eosinofilos sanguineos',
      'Frequencia de exacerbacoes de asma',
      'Dose de corticoide sistemico (possibilidade de reducao)',
      'Sintomas e funcao pulmonar',
    ],
    orientacoesPaciente: [
      'Injecao subcutanea mensal',
      'Pode aprender autoaplicacao',
      'Nao e medicamento de resgate - manter broncodilatador',
      'Nao parar outros medicamentos sem orientacao',
      'Informar medico sobre infeccoes',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      pediatrico: 'Aprovado >=6 anos; dose ajustada para 6-11 anos (40mg)',
    },
    doencasRelacionadas: ['asma-grave', 'asma-eosinofilica', 'gepa', 'churg-strauss', 'sindrome-hipereosinofilica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-IL5', 'biologico', 'asma-grave', 'eosinofilica', 'DREAM', 'MENSA', 'mepolizumab'],
  },

  {
    id: 'tezepelumab',
    nomeGenerico: 'Tezepelumab',
    nomesComerciais: ['Tezspire'],
    atcCode: 'R03DX11',
    rxNormCui: '2551508',
    drugBankId: 'DB15676',
    snomedCT: '1255804005',
    casNumber: '1572943-03-7',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '210mg/1,91mL (seringa preenchida)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '210mg/1,91mL (autoinjetor)', disponivelSUS: false },
    ],
    indicacoes: [
      'Asma grave em adultos e criancas >=12 anos',
      'Terapia adicional de manutencao em pacientes com asma grave inadequadamente controlada apesar de CI media/alta dose',
      'Primeiro biologico para asma que NAO depende de fenotipo (eficaz em eosinofilica E nao-eosinofilica)',
    ],
    mecanismoAcao: 'Anticorpo monoclonal IgG2-lambda humano anti-TSLP (linfopoietina estromal timica). TSLP e uma alarmina epitelial liberada em resposta a dano celular, que inicia a cascata inflamatoria tipo 2 E tipo nao-2. Bloqueio do TSLP atua UPSTREAM, inibindo multiplas vias inflamatorias (IL-4, IL-5, IL-13, IgE, eosinofilos), sendo eficaz em TODOS os fenotipos de asma grave.',
    posologias: [
      {
        indicacao: 'Asma grave',
        adultos: {
          dose: '210mg SC',
          frequencia: 'A cada 4 semanas',
          observacoes: 'Pode ser autoadministrado apos treinamento adequado',
        },
        pediatrico: {
          dose: '210mg SC',
          frequencia: 'A cada 4 semanas',
          idadeMinima: '12 anos',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao tezepelumab',
    ],
    precaucoes: [
      'Reacoes de hipersensibilidade - interromper se grave',
      'Infeccoes parasitarias - tratar antes de iniciar',
      'Nao usar para broncoespasmo agudo ou estado de mal asmatico',
      'Nao descontinuar abruptamente corticoides sistemicos',
      'Sem necessidade de fenotipar paciente (eficaz independente de eosinofilos)',
    ],
    efeitosAdversos: {
      comuns: ['Faringite', 'Artralgia', 'Dor nas costas', 'Reacoes no local de injecao'],
      graves: ['Reacoes de hipersensibilidade (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Vacinas vivas',
        gravidade: 'moderada',
        efeito: 'Teoricamente pode reduzir resposta',
        conduta: 'Vacinar preferencialmente antes de iniciar',
      },
      {
        medicamento: 'Sem interacoes significativas conhecidas',
        gravidade: 'leve',
        efeito: 'Nao e metabolizado por CYP450',
        conduta: 'Sem ajustes',
      },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes; anticorpos excretados no leite' },
    monitorizacao: [
      'Frequencia de exacerbacoes de asma',
      'Funcao pulmonar (VEF1)',
      'Controle de sintomas (ACQ, ACT)',
      'Dose de corticoide (possivel reducao)',
      'Nao necessario monitorar eosinofilos para decisao terapeutica',
    ],
    orientacoesPaciente: [
      'Injecao subcutanea mensal',
      'Eficaz INDEPENDENTE do tipo de asma grave',
      'Nao e medicamento de resgate',
      'Pode aprender autoaplicacao',
      'Nao parar outros medicamentos sem orientacao',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      pediatrico: 'Aprovado >=12 anos',
    },
    doencasRelacionadas: ['asma-grave', 'asma-eosinofilica', 'asma-nao-eosinofilica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['anti-TSLP', 'biologico', 'asma-grave', 'alarmina', 'NAVIGATOR', 'PATHWAY', 'fenotipo-independente'],
  },

  // =============================================================================
  // INIBIDOR DE PDE4 - DPOC
  // =============================================================================
  {
    id: 'roflumilast',
    nomeGenerico: 'Roflumilast',
    nomesComerciais: ['Daxas', 'Daliresp'],
    atcCode: 'R03DX07',
    rxNormCui: '1045523',
    drugBankId: 'DB01656',
    snomedCT: '702408007',
    casNumber: '162401-32-3',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '500mcg', disponivelSUS: false },
    ],
    indicacoes: [
      'DPOC grave com bronquite cronica e historico de exacerbacoes frequentes',
      'Terapia adicional a broncodilatadores de longa acao em pacientes de alto risco',
      'Fenotipo exacerbador com bronquite cronica',
    ],
    mecanismoAcao: 'Inibidor seletivo da fosfodiesterase-4 (PDE4). PDE4 e a principal enzima que degrada AMPc em celulas inflamatorias pulmonares (neutrofilos, macrofagos, celulas T). Inibicao de PDE4 aumenta AMPc intracelular, suprimindo a liberacao de mediadores inflamatorios. Possui efeito anti-inflamatorio sem acao broncodilatadora direta. Metabolito ativo (N-oxido de roflumilast) contribui para eficacia.',
    posologias: [
      {
        indicacao: 'DPOC com exacerbacoes',
        adultos: {
          dose: '500mcg (250mcg durante 4 semanas pode facilitar tolerancia)',
          frequencia: '1x/dia',
          observacoes: 'Pode ser tomado com ou sem alimentos. Titulacao com 250mcg inicialmente pode reduzir efeitos GI.',
        },
      },
    ],
    contraindicacoes: [
      'Insuficiencia hepatica moderada a grave (Child-Pugh B ou C)',
      'Hipersensibilidade ao roflumilast',
    ],
    precaucoes: [
      'Efeitos psiquiatricos - depressao, ideacao suicida (monitorar humor)',
      'Perda de peso significativa (6% em 1 ano) - monitorar peso',
      'Nao indicado para broncoespasmo agudo',
      'Diarreia e nauseas comuns nas primeiras semanas',
      'Insonia pode ocorrer',
      'Evitar em pacientes com depressao previa nao controlada',
    ],
    efeitosAdversos: {
      comuns: ['Diarreia (9%)', 'Perda de peso (7%)', 'Nauseas', 'Cefaleia', 'Dor abdominal', 'Insonia', 'Tremor'],
      graves: ['Depressao', 'Ideacao suicida', 'Comportamento suicida', 'Reacoes psiquiatricas'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4/CYP1A2 (eritromicina, cetoconazol, fluvoxamina)',
        gravidade: 'grave',
        efeito: 'Aumento significativo da exposicao ao roflumilast',
        conduta: 'Evitar combinacao; se necessario, monitorar intensamente',
      },
      {
        medicamento: 'Indutores de CYP3A4/CYP1A2 (rifampicina, fenobarbital, carbamazepina)',
        gravidade: 'grave',
        efeito: 'Reducao significativa da eficacia',
        conduta: 'Evitar combinacao',
      },
      {
        medicamento: 'Teofilina',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de teofilina (ambos inibem PDE)',
        conduta: 'Usar com cautela; monitorar niveis de teofilina',
      },
      {
        medicamento: 'Imunossupressores (metotrexato, azatioprina)',
        gravidade: 'moderada',
        efeito: 'Efeito imunossupressor aditivo teorico',
        conduta: 'Sem dados clinicos; usar com cautela',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Sem dados - usar com cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite animal - evitar' },
    monitorizacao: [
      'Peso corporal (perda de peso significativa comum)',
      'Humor e comportamento (sinais de depressao)',
      'Sintomas GI',
      'Exacerbacoes de DPOC',
    ],
    orientacoesPaciente: [
      'Pode levar semanas para efeito maximo',
      'Diarreia e nauseas geralmente melhoram com o tempo',
      'Informar medico sobre mudancas de humor ou pensamentos negativos',
      'Monitorar peso',
      'Nao usar para alivio rapido de falta de ar',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; maior risco de efeitos adversos',
      hepatopatas: 'Leve (Child-Pugh A): sem ajuste; Moderada/grave: contraindicado',
    },
    doencasRelacionadas: ['dpoc', 'bronquite-cronica', 'dpoc-exacerbador'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['inibidor-PDE4', 'DPOC', 'bronquite-cronica', 'anti-inflamatorio', 'REACT', 'exacerbacoes'],
  },

  // =============================================================================
  // LAMAS - ANTICOLINERGICOS DE LONGA ACAO
  // =============================================================================
  {
    id: 'glicopirronio',
    nomeGenerico: 'Glicopirronio brometo',
    nomesComerciais: ['Seebri Breezhaler', 'Seebri Neohaler'],
    atcCode: 'R03BB06',
    rxNormCui: '1551280',
    drugBankId: 'DB09281',
    snomedCT: '703836006',
    casNumber: '596-51-0',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'anticolinergico_longa',
    rename: false,
    apresentacoes: [
      { forma: 'capsula_inalacao', concentracao: '50mcg (po para inalacao)', disponivelSUS: false },
    ],
    indicacoes: [
      'DPOC - tratamento broncodilatador de manutencao',
      'Alternativa ou adicao a tiotropio',
    ],
    mecanismoAcao: 'Antagonista muscarínico de longa duracao (LAMA) com seletividade para receptores M3. Bloqueia receptores M3 na musculatura lisa bronquica, impedindo a broncoconstricao mediada por acetilcolina. Inicio de acao rapido (5 minutos) comparado a tiotropio. Duracao de 24 horas permite dose unica diaria.',
    posologias: [
      {
        indicacao: 'DPOC',
        adultos: {
          dose: '50mcg (1 capsula)',
          frequencia: '1x/dia por inalacao',
          observacoes: 'Usar com dispositivo Breezhaler. Nao engolir capsulas.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao glicopirronio ou atropina/derivados',
    ],
    precaucoes: [
      'Glaucoma de angulo fechado - pode precipitar crise',
      'Retencao urinaria/hiperplasia prostatica - pode agravar',
      'Nao usar para alivio agudo de broncoespasmo',
      'Broncoespasmo paradoxal (raro) - descontinuar se ocorrer',
      'Boca seca comum',
    ],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Nasofaringite', 'Insonia', 'Infeccao do trato urinario'],
      graves: ['Retencao urinaria aguda', 'Glaucoma de angulo fechado', 'Broncoespasmo paradoxal', 'Reacoes de hipersensibilidade'],
    },
    interacoes: [
      {
        medicamento: 'Outros anticolinergicos (ipratropio, oxibutinina, antidepressivos triciclicos)',
        gravidade: 'moderada',
        efeito: 'Efeitos anticolinergicos aditivos',
        conduta: 'Evitar uso concomitante de anticolinergicos inalatorios de curta acao',
      },
      {
        medicamento: 'Beta-2 agonistas (formoterol, salmeterol)',
        gravidade: 'leve',
        efeito: 'Efeito broncodilatador aditivo benefico',
        conduta: 'Combinacao segura e comum',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste necessario' },
      { tfg: '<30', ajuste: 'Usar com cautela - dados limitados' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar' },
    monitorizacao: [
      'Sintomas de DPOC',
      'Sinais de retencao urinaria (especialmente em homens com HPB)',
      'Sintomas oculares (glaucoma)',
    ],
    orientacoesPaciente: [
      'Usar 1 capsula por dia sempre no mesmo horario',
      'NAO ENGOLIR a capsula - usar APENAS com Breezhaler',
      'Perfurar a capsula antes de inalar',
      'Nao e para alivio rapido de falta de ar',
      'Manter broncodilatador de resgate (SABA) disponivel',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; maior risco de retencao urinaria e efeitos anticolinergicos',
    },
    doencasRelacionadas: ['dpoc', 'bronquite-cronica', 'enfisema'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['LAMA', 'glicopirronio', 'anticolinergico', 'DPOC', 'GLOW', 'broncodilatador'],
  },

  {
    id: 'umeclidinio',
    nomeGenerico: 'Umeclidinio brometo',
    nomesComerciais: ['Incruse Ellipta'],
    atcCode: 'R03BB07',
    rxNormCui: '1486980',
    drugBankId: 'DB09076',
    snomedCT: '703840008',
    casNumber: '869113-09-7',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'anticolinergico_longa',
    rename: false,
    apresentacoes: [
      { forma: 'po_inalacao', concentracao: '62,5mcg/dose (Ellipta)', disponivelSUS: false },
    ],
    indicacoes: [
      'DPOC - tratamento broncodilatador de manutencao',
      'Uso como monoterapia ou em combinacao (Anoro Ellipta = umeclidinio + vilanterol)',
    ],
    mecanismoAcao: 'Antagonista muscarínico de longa duracao (LAMA) de nova geracao com alta afinidade para receptores M3 e M1. Dissociacao lenta do receptor M3 confere duracao de acao prolongada (>24h). Dispositivo Ellipta proporciona administracao simples e consistente. Inicio de acao em 5 minutos.',
    posologias: [
      {
        indicacao: 'DPOC',
        adultos: {
          dose: '62,5mcg (1 inalacao)',
          frequencia: '1x/dia, sempre no mesmo horario',
          observacoes: 'Usar dispositivo Ellipta. Nao necessita agitar ou preparar.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao umeclidinio ou proteinas do leite (contem lactose)',
      'Alergia grave a leite/lactose',
    ],
    precaucoes: [
      'Glaucoma de angulo fechado - pode agravar',
      'Retencao urinaria - cautela em HPB',
      'Nao usar para broncoespasmo agudo',
      'Reacoes de hipersensibilidade imediatas podem ocorrer',
      'Efeitos cardiovasculares - cautela em arritmias',
    ],
    efeitosAdversos: {
      comuns: ['Nasofaringite', 'Infeccao do trato respiratorio superior', 'Cefaleia', 'Tosse'],
      graves: ['Retencao urinaria', 'Glaucoma', 'Broncoespasmo paradoxal', 'Reacoes de hipersensibilidade'],
    },
    interacoes: [
      {
        medicamento: 'Outros anticolinergicos',
        gravidade: 'moderada',
        efeito: 'Efeitos anticolinergicos aditivos',
        conduta: 'Evitar anticolinergicos inalatorios de curta acao concomitantes',
      },
      {
        medicamento: 'LABA (vilanterol)',
        gravidade: 'leve',
        efeito: 'Broncodilatacao aditiva',
        conduta: 'Combinacao segura e aprovada (Anoro Ellipta)',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario (depuracao renal minima)' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Sintomas de DPOC',
      'Sinais de retencao urinaria',
      'Pressao intraocular se historia de glaucoma',
    ],
    orientacoesPaciente: [
      'Usar 1 vez ao dia, sempre no mesmo horario',
      'Dispositivo Ellipta e facil de usar - abrir, inalar, fechar',
      'Contem lactose - informar se alergia a leite',
      'Nao e para alivio de crise',
      'Verificar contador de doses',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste; monitorar efeitos anticolinergicos',
      hepatopatas: 'Sem ajuste necessario',
    },
    doencasRelacionadas: ['dpoc', 'bronquite-cronica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['LAMA', 'umeclidinio', 'Ellipta', 'DPOC', 'anticolinergico', 'FLIGHT'],
  },

  // =============================================================================
  // ULTRA-LABA E LABAS
  // =============================================================================
  {
    id: 'indacaterol',
    nomeGenerico: 'Indacaterol maleato',
    nomesComerciais: ['Onbrize Breezhaler', 'Arcapta Neohaler'],
    atcCode: 'R03AC18',
    rxNormCui: '1012665',
    drugBankId: 'DB05039',
    snomedCT: '702416003',
    casNumber: '312753-06-3',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'beta2_agonista_longa',
    rename: false,
    apresentacoes: [
      { forma: 'capsula_inalacao', concentracao: '150mcg', disponivelSUS: false },
      { forma: 'capsula_inalacao', concentracao: '300mcg', disponivelSUS: false },
    ],
    indicacoes: [
      'DPOC - tratamento broncodilatador de manutencao',
      'Primeiro ultra-LABA aprovado (duracao >24h)',
    ],
    mecanismoAcao: 'Agonista beta-2 adrenergico de acao ULTRA-LONGA (ultra-LABA). Liga-se ao receptor beta-2 na musculatura lisa bronquica, ativando adenilato ciclase e aumentando AMPc, causando relaxamento muscular. Caracteristicas unicas: inicio de acao rapido (5 minutos - mais rapido que salmeterol), duracao >24 horas com dose unica, alta eficacia intrinseca.',
    posologias: [
      {
        indicacao: 'DPOC',
        adultos: {
          dose: '150mcg (1 capsula)',
          frequencia: '1x/dia por inalacao',
          doseMaxima: '300mcg/dia (1 capsula de 300mcg ou 2 de 150mcg)',
          observacoes: 'Usar com dispositivo Breezhaler. 300mcg para casos mais graves.',
        },
      },
    ],
    contraindicacoes: [
      'Asma sem corticoide inalatorio concomitante (risco de eventos graves)',
      'Hipersensibilidade ao indacaterol',
    ],
    precaucoes: [
      'Nao usar para broncoespasmo agudo',
      'Efeitos cardiovasculares - cautela em QT longo, doenca coronariana, arritmias',
      'Hipocalemia - especialmente com diureticos, xantinas, corticoides',
      'Hiperglicemia - pode agravar diabetes',
      'Tosse apos inalacao comum (nao significa ineficacia)',
    ],
    efeitosAdversos: {
      comuns: ['Tosse apos inalacao (17-24%)', 'Nasofaringite', 'Cefaleia', 'Infeccao respiratoria superior'],
      graves: ['Broncoespasmo paradoxal', 'Taquicardia/arritmias', 'Hipocalemia grave', 'Reacoes de hipersensibilidade'],
    },
    interacoes: [
      {
        medicamento: 'Betabloqueadores',
        gravidade: 'moderada',
        efeito: 'Antagonismo do efeito broncodilatador',
        conduta: 'Evitar betabloqueadores nao seletivos; cardioseletivos com cautela',
      },
      {
        medicamento: 'Diureticos de alca, tiazidicos',
        gravidade: 'moderada',
        efeito: 'Risco aditivo de hipocalemia',
        conduta: 'Monitorar potassio',
      },
      {
        medicamento: 'Prolongadores de QT',
        gravidade: 'moderada',
        efeito: 'Risco aditivo de arritmias',
        conduta: 'Usar com cautela; ECG se necessario',
      },
      {
        medicamento: 'Inibidores de CYP3A4 e P-gp',
        gravidade: 'leve',
        efeito: 'Aumento modesto da exposicao',
        conduta: 'Sem ajuste necessario com inibidores moderados',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite animal - evitar' },
    monitorizacao: [
      'Sintomas de DPOC',
      'Frequencia cardiaca e ritmo',
      'Potassio serico se uso de diureticos',
      'Glicemia em diabeticos',
    ],
    orientacoesPaciente: [
      'Usar 1 capsula por dia',
      'Tosse apos inalacao e normal e nao significa falha',
      'NAO ENGOLIR capsula - usar com Breezhaler',
      'Nao e medicamento de resgate',
      'Manter SABA para emergencias',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Sem ajuste necessario',
    },
    doencasRelacionadas: ['dpoc', 'bronquite-cronica'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['ultra-LABA', 'indacaterol', 'DPOC', 'broncodilatador', 'INLIGHT', 'INHANCE', 'Breezhaler'],
  },

  {
    id: 'olodaterol',
    nomeGenerico: 'Olodaterol cloridrato',
    nomesComerciais: ['Striverdi Respimat'],
    atcCode: 'R03AC19',
    rxNormCui: '1539998',
    drugBankId: 'DB09082',
    snomedCT: '710812002',
    casNumber: '868049-49-4',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'beta2_agonista_longa',
    rename: false,
    apresentacoes: [
      { forma: 'solucao_inalacao', concentracao: '2,5mcg/puff (Respimat)', disponivelSUS: false },
    ],
    indicacoes: [
      'DPOC - tratamento broncodilatador de manutencao',
      'Disponivel em combinacao com tiotropio (Stiolto Respimat)',
    ],
    mecanismoAcao: 'Agonista beta-2 adrenergico de longa duracao (LABA) com alta seletividade para receptor beta-2. Estimula adenilato ciclase, aumenta AMPc e relaxa musculatura lisa bronquica. Duracao de 24 horas. Dispositivo Respimat gera nuvem de particulas finas (soft mist) com excelente deposicao pulmonar, independente do fluxo inspiratorio.',
    posologias: [
      {
        indicacao: 'DPOC',
        adultos: {
          dose: '5mcg (2 puffs de 2,5mcg)',
          frequencia: '1x/dia',
          doseMaxima: '5mcg/dia',
          observacoes: 'Usar dispositivo Respimat. Inspiracao lenta e profunda.',
        },
      },
    ],
    contraindicacoes: [
      'Asma sem corticoide inalatorio (risco de eventos graves)',
      'Hipersensibilidade ao olodaterol',
    ],
    precaucoes: [
      'Nao usar para broncoespasmo agudo',
      'Efeitos cardiovasculares - arritmias, QT longo, doenca coronariana',
      'Hipocalemia - monitorar com diureticos',
      'Hiperglicemia',
      'Cetoacidose diabetica relatada (raro)',
    ],
    efeitosAdversos: {
      comuns: ['Nasofaringite', 'Infeccao respiratoria superior', 'Bronquite', 'Tosse', 'Dor nas costas'],
      graves: ['Broncoespasmo paradoxal', 'Arritmias', 'Hipocalemia', 'Angioedema'],
    },
    interacoes: [
      {
        medicamento: 'Betabloqueadores',
        gravidade: 'moderada',
        efeito: 'Antagonismo farmacologico',
        conduta: 'Preferir betabloqueadores cardioseletivos; evitar nao seletivos',
      },
      {
        medicamento: 'Diureticos hipocalemiantes',
        gravidade: 'moderada',
        efeito: 'Hipocalemia aditiva',
        conduta: 'Monitorar potassio',
      },
      {
        medicamento: 'IMAOs, antidepressivos triciclicos',
        gravidade: 'moderada',
        efeito: 'Potencializacao de efeitos cardiovasculares',
        conduta: 'Usar com cautela',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretao no leite desconhecida' },
    monitorizacao: [
      'Sintomas de DPOC',
      'Frequencia e ritmo cardiaco',
      'Potassio serico',
    ],
    orientacoesPaciente: [
      'Usar 2 jatos uma vez ao dia',
      'Dispositivo Respimat nao precisa de forca para inalar',
      'Inspiracao lenta e prolongada (diferente de outros inaladores)',
      'Nao e medicamento de resgate',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Sem ajuste necessario',
    },
    doencasRelacionadas: ['dpoc'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['LABA', 'olodaterol', 'DPOC', 'Respimat', 'broncodilatador', 'soft-mist'],
  },

  {
    id: 'vilanterol',
    nomeGenerico: 'Vilanterol trifenatato',
    nomesComerciais: ['Disponivel apenas em combinacoes: Relvar/Breo Ellipta (furoato de fluticasona + vilanterol), Anoro Ellipta (umeclidinio + vilanterol), Trelegy Ellipta (fluticasona + umeclidinio + vilanterol)'],
    atcCode: 'R03AC20',
    rxNormCui: '1424880',
    drugBankId: 'DB09082',
    snomedCT: '703848001',
    casNumber: '503068-34-6',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'beta2_agonista_longa',
    rename: false,
    apresentacoes: [
      { forma: 'po_inalacao', concentracao: '25mcg (em combinacao com fluticasona 100mcg - Ellipta)', disponivelSUS: false },
      { forma: 'po_inalacao', concentracao: '25mcg (em combinacao com fluticasona 200mcg - Ellipta)', disponivelSUS: false },
      { forma: 'po_inalacao', concentracao: '25mcg (em combinacao com umeclidinio 62,5mcg - Ellipta)', disponivelSUS: false },
    ],
    indicacoes: [
      'NAO DISPONIVEL COMO MONOTERAPIA',
      'Asma (em combinacao com furoato de fluticasona - Relvar/Breo)',
      'DPOC (em combinacoes: Anoro com umeclidinio; Trelegy com fluticasona + umeclidinio)',
    ],
    mecanismoAcao: 'Agonista beta-2 adrenergico de longa duracao (LABA) desenvolvido EXCLUSIVAMENTE para uso em combinacao. Alta seletividade beta-2 e inicio de acao em 5 minutos. Duracao de 24 horas permite administracao 1x/dia. Desenvolvido especificamente para formulacoes no dispositivo Ellipta da GSK, otimizando a codeposicao com outros farmacos.',
    posologias: [
      {
        indicacao: 'Asma (com fluticasona)',
        adultos: {
          dose: 'Furoato de fluticasona 100mcg/vilanterol 25mcg OU fluticasona 200mcg/vilanterol 25mcg',
          frequencia: '1 inalacao 1x/dia',
          observacoes: 'Escolher concentracao de fluticasona conforme gravidade',
        },
        pediatrico: {
          dose: 'Fluticasona 100mcg/vilanterol 25mcg',
          frequencia: '1 inalacao 1x/dia',
          idadeMinima: '12 anos',
        },
      },
      {
        indicacao: 'DPOC (com umeclidinio)',
        adultos: {
          dose: 'Umeclidinio 62,5mcg/vilanterol 25mcg',
          frequencia: '1 inalacao 1x/dia',
        },
      },
    ],
    contraindicacoes: [
      'Monoterapia com LABA em asma (sem CI)',
      'Hipersensibilidade ao vilanterol ou componentes da combinacao',
      'Alergia a proteinas do leite (formulacoes contem lactose)',
    ],
    precaucoes: [
      'NUNCA usar LABA isoladamente em asma - risco de morte',
      'Nao usar para broncoespasmo agudo',
      'Efeitos cardiovasculares - monitorar em doenca cardiaca',
      'Hipocalemia',
      'Hiperglicemia em diabeticos',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Nasofaringite', 'Dor orofaringea', 'Candidíase oral (combinacoes com CI)', 'Infeccao respiratoria superior'],
      graves: ['Broncoespasmo paradoxal', 'Arritmias', 'Eventos asmaticos graves se usado sem CI', 'Pneumonia (combinacoes com CI em DPOC)'],
    },
    interacoes: [
      {
        medicamento: 'Betabloqueadores nao seletivos',
        gravidade: 'moderada',
        efeito: 'Antagonismo do efeito broncodilatador',
        conduta: 'Evitar; se necessario, preferir cardioseletivos',
      },
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, ritonavir)',
        gravidade: 'moderada',
        efeito: 'Aumento da exposicao sistemica (especialmente fluticasona na combinacao)',
        conduta: 'Usar com cautela; monitorar efeitos de corticoide',
      },
      {
        medicamento: 'Diureticos',
        gravidade: 'moderada',
        efeito: 'Hipocalemia aditiva',
        conduta: 'Monitorar potassio',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excrecao no leite desconhecida' },
    monitorizacao: [
      'Controle de asma ou DPOC',
      'Candidíase oral (enxaguar boca apos uso)',
      'Funcao pulmonar',
      'Sintomas cardiovasculares',
    ],
    orientacoesPaciente: [
      'Disponivel APENAS em combinacoes - nunca sozinho',
      'Usar 1 vez ao dia, sempre no mesmo horario',
      'Dispositivo Ellipta facil de usar',
      'Nao e medicamento de resgate',
      'Enxaguar boca apos uso (previne candidíase)',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
      hepatopatas: 'Cautela em insuficiencia hepatica moderada/grave',
    },
    doencasRelacionadas: ['asma', 'dpoc'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['LABA', 'vilanterol', 'Ellipta', 'combinacao', 'asma', 'DPOC', 'GSK'],
  },

  {
    id: 'revefenacin',
    nomeGenerico: 'Revefenacin',
    nomesComerciais: ['Yupelri'],
    atcCode: 'R03BB08',
    rxNormCui: '2103730',
    drugBankId: 'DB14859',
    snomedCT: '870379004',
    casNumber: '864750-70-9',
    classeTerapeutica: 'broncodilatador',
    subclasse: 'anticolinergico_longa',
    rename: false,
    apresentacoes: [
      { forma: 'solucao_nebulizacao', concentracao: '175mcg/3mL (frasco-ampola para nebulizacao)', disponivelSUS: false },
    ],
    indicacoes: [
      'DPOC - tratamento broncodilatador de manutencao',
      'UNICO LAMA NEBULIZADO disponivel',
      'Ideal para pacientes que nao conseguem usar inaladores (idosos, debilitados, coordenacao comprometida)',
    ],
    mecanismoAcao: 'Antagonista muscarínico de longa duracao (LAMA) desenvolvido ESPECIFICAMENTE para nebulizacao. Bloqueia receptores M3 na musculatura lisa bronquica com alta seletividade. Duracao de 24 horas. Formulacao em solucao para nebulizacao atende pacientes incapazes de usar inaladores tradicionais (idosos frageis, comprometimento cognitivo, coordenacao motora reduzida).',
    posologias: [
      {
        indicacao: 'DPOC',
        adultos: {
          dose: '175mcg (1 frasco-ampola)',
          frequencia: '1x/dia por nebulizacao',
          observacoes: 'Usar nebulizador adequado. Nebulizacao dura aproximadamente 3-8 minutos.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade ao revefenacin ou atropinicos',
    ],
    precaucoes: [
      'Glaucoma de angulo fechado - pode precipitar crise',
      'Retencao urinaria - cautela em HPB',
      'Nao usar para broncoespasmo agudo',
      'Broncoespasmo paradoxal - descontinuar se ocorrer',
      'Alergia a lactose nao e preocupacao (formulacao em solucao)',
    ],
    efeitosAdversos: {
      comuns: ['Tosse', 'Nasofaringite', 'Infeccao respiratoria superior', 'Cefaleia', 'Dor nas costas'],
      graves: ['Retencao urinaria aguda', 'Crise de glaucoma', 'Broncoespasmo paradoxal', 'Reacoes de hipersensibilidade'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores de OATP1B1/OATP1B3 (rifampicina, ciclosporina)',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis do metabolito ativo',
        conduta: 'Monitorar efeitos adversos anticolinergicos',
      },
      {
        medicamento: 'Outros anticolinergicos',
        gravidade: 'moderada',
        efeito: 'Efeitos anticolinergicos aditivos',
        conduta: 'Evitar anticolinergicos inalatorios de curta acao',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario (eliminacao nao renal)' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Sintomas de DPOC',
      'Sinais de retencao urinaria',
      'Sintomas de glaucoma',
    ],
    orientacoesPaciente: [
      'Usar 1 vez ao dia via nebulizador',
      'Nao misturar com outros medicamentos no nebulizador',
      'Ideal para quem tem dificuldade com inaladores',
      'Nao e medicamento de resgate',
      'Nebulizacao dura cerca de 3-8 minutos',
    ],
    consideracoesEspeciais: {
      idosos: 'IDEAL para idosos que nao conseguem usar inaladores; sem ajuste de dose',
      hepatopatas: 'Hepatopatia leve/moderada: sem ajuste; grave: usar com cautela',
    },
    doencasRelacionadas: ['dpoc'],
    citations: [],
    lastUpdate: '2026-01',
    tags: ['LAMA', 'nebulizado', 'revefenacin', 'DPOC', 'idosos', 'nebulizacao', 'Yupelri'],
  },
];
