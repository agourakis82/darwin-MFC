/**
 * ANTICOAGULANTES NOVOS - DARWIN-MFC EXPANSAO 1000
 * =================================================
 * Anticoagulantes e antitromboticos avancados
 *
 * Referencias:
 * - RE-LY (Dabigatran)
 * - MATISSE/OASIS-5 (Fondaparinux)
 * - FRAGMIN trials (Dalteparin)
 * - PLATO (Ticagrelor)
 * - TRITON-TIMI 38 (Prasugrel)
 * - CHAMPION trials (Cangrelor)
 * - TRA 2P-TIMI 50 (Vorapaxar)
 * - RE-VERSE AD (Idarucizumab)
 * - HIT management guidelines (Argatroban)
 * - HORIZONS-AMI (Bivalirudin)
 *
 * Ontologias:
 * - ATC B01 (Antithrombotic agents)
 * - RxNorm CUI
 * - DrugBank
 * - SNOMED-CT
 * - PharmGKB (CYP2C19, ABCB1, CES1)
 */

import { Medicamento } from '@/lib/types/medicamento';

export const anticoagulantesNovos: Partial<Medicamento>[] = [
  // =============================================================================
  // INIBIDOR DIRETO DA TROMBINA - VIA ORAL
  // =============================================================================
  {
    id: 'dabigatrana',
    nomeGenerico: 'Dabigatrana etexilato',
    nomesComerciais: ['Pradaxa'],
    atcCode: 'B01AE07',
    rxNormCui: '1037042',
    drugBankId: 'DB06695',
    snomedCT: '700029008',
    casNumber: '211914-51-1',
    pharmgkb: [
      {
        gene: 'ABCB1',
        variant: 'rs1045642',
        phenotype: 'extensive_metabolizer',
        implications: ['Variantes podem afetar niveis plasmaticos de dabigatrana'],
        dosageRecommendations: ['Monitorar resposta clinica em pacientes com variantes'],
      },
      {
        gene: 'CES1',
        variant: 'rs2244613',
        implications: ['Variantes de CES1 podem afetar conversao da pro-droga em dabigatrana ativa'],
        dosageRecommendations: ['Ajuste individualizado pode ser necessario'],
      },
    ],
    classeTerapeutica: 'anticoagulante',
    subclasse: 'inibidor_trombina_direto',
    rename: false,
    apresentacoes: [
      { forma: 'capsula', concentracao: '75mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '110mg', disponivelSUS: false },
      { forma: 'capsula', concentracao: '150mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Prevencao de AVC e embolia sistemica em FA nao-valvar',
      'Tratamento de TVP e TEP',
      'Prevencao de recorrencia de TVP e TEP',
      'Profilaxia de TEV apos artroplastia de quadril ou joelho',
    ],
    mecanismoAcao: 'Inibidor direto da trombina (fator IIa), competitivo e reversivel. Pro-droga (etexilato) convertida em dabigatrana ativa por esterases plasmaticas. Inibe trombina livre e ligada ao coagulo, impedindo conversao de fibrinogenio em fibrina. Nao requer monitoramento de rotina. Meia-vida 12-17h.',
    posologias: [
      {
        indicacao: 'FA nao-valvar (prevencao AVC)',
        adultos: {
          dose: '150mg 2x/dia',
          frequencia: '12/12h',
          observacoes: 'Reduzir para 110mg 2x/dia se: idade >=80 anos, uso concomitante de verapamil, ou alto risco de sangramento.',
        },
        idosos: {
          dose: '110mg 2x/dia',
          observacoes: 'Dose preferencial para >=80 anos',
        },
      },
      {
        indicacao: 'Tratamento TVP/TEP',
        adultos: {
          dose: '150mg 2x/dia',
          frequencia: '12/12h',
          observacoes: 'Iniciar apos 5-10 dias de anticoagulacao parenteral.',
        },
      },
      {
        indicacao: 'Profilaxia TEV pos-artroplastia',
        adultos: {
          dose: '220mg 1x/dia (110mg inicialmente 1-4h apos cirurgia, depois 220mg/dia)',
          frequencia: '1x/dia',
          observacoes: 'Joelho: 10 dias. Quadril: 28-35 dias.',
        },
      },
    ],
    contraindicacoes: [
      'ClCr <30mL/min',
      'Sangramento ativo',
      'Lesao ou condicao com risco significativo de sangramento maior',
      'Proteses valvares cardiacas mecanicas',
      'Uso concomitante com cetoconazol sistemico, ciclosporina, itraconazol, dronedarona',
      'Insuficiencia hepatica ou doenca hepatica com impacto na sobrevida',
    ],
    precaucoes: [
      'ClCr 30-50mL/min - considerar reducao de dose',
      'Idosos (>75 anos) - maior risco de sangramento',
      'Baixo peso (<50kg)',
      'Procedimentos invasivos - suspender 24-48h antes',
      'Inibidores de P-gp podem aumentar niveis (amiodarona, quinidina, verapamil)',
    ],
    efeitosAdversos: {
      comuns: ['Dispepsia', 'Dor abdominal', 'Diarreia', 'Nausea', 'Sangramento menor'],
      graves: ['Sangramento maior', 'Sangramento gastrointestinal', 'Sangramento intracraniano (mais baixo que varfarina)'],
    },
    interacoes: [
      {
        medicamento: 'Cetoconazol, itraconazol sistemicos',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de dabigatrana',
        mecanismo: 'Inibicao potente de P-gp',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Dronedarona',
        gravidade: 'contraindicada',
        efeito: 'Aumento dos niveis de dabigatrana',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Verapamil',
        gravidade: 'moderada',
        efeito: 'Aumento de 12-180% nos niveis de dabigatrana',
        mecanismo: 'Inibicao de P-gp',
        conduta: 'Reduzir dabigatrana para 110mg 2x/dia; tomar verapamil simultaneamente',
      },
      {
        medicamento: 'Amiodarona',
        gravidade: 'moderada',
        efeito: 'Aumento de 50-60% nos niveis de dabigatrana',
        conduta: 'Considerar reducao de dose em pacientes de alto risco',
      },
      {
        medicamento: 'Rifampicina',
        gravidade: 'grave',
        efeito: 'Reducao de 66% nos niveis de dabigatrana',
        mecanismo: 'Inducao de P-gp',
        conduta: 'Evitar uso concomitante',
      },
      {
        medicamento: 'AINEs, antiagregantes',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Usar com cautela; monitorar sangramento',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste (150mg 2x/dia para FA)' },
      { tfg: '30-50', ajuste: '110mg ou 150mg 2x/dia conforme risco; profilaxia: 150mg/dia' },
      { tfg: '<30', ajuste: 'Contraindicado' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar' },
    monitorizacao: [
      'Funcao renal (ClCr) antes e periodicamente',
      'Hemoglobina/hematocrito se suspeita de sangramento',
      'dTT ou ECT se necessario avaliar efeito (nao rotineiro)',
      'Tempo de trombina (TT) - muito sensivel',
    ],
    orientacoesPaciente: [
      'Engolir capsulas inteiras - nao abrir, mastigar ou triturar',
      'Tomar com ou sem alimentos',
      'Guardar no blister original (sensivel a umidade)',
      'Informar sobre procedimentos cirurgicos ou dentarios',
      'Antidoto disponivel (idarucizumab) para emergencias',
    ],
    consideracoesEspeciais: {
      idosos: '>=80 anos: preferir 110mg 2x/dia para FA',
      hepatopatas: 'Contraindicado em doenca hepatica grave; cautela em elevacao de transaminases >2x LSN',
    },
    doencasRelacionadas: ['fibrilacao-atrial', 'tromboembolismo-venoso', 'tvp', 'tep', 'profilaxia-tev'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['dabigatrana', 'DOAC', 'inibidor-trombina', 'RE-LY', 'FA', 'TEV', 'Pradaxa'],
  },

  // =============================================================================
  // INIBIDOR INDIRETO DO FATOR Xa
  // =============================================================================
  {
    id: 'fondaparinux',
    nomeGenerico: 'Fondaparinux sodico',
    nomesComerciais: ['Arixtra'],
    atcCode: 'B01AX05',
    rxNormCui: '321208',
    drugBankId: 'DB00569',
    snomedCT: '385517003',
    casNumber: '114870-03-0',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'inibidor_fator_xa',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '2,5mg/0,5mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '5mg/0,4mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '7,5mg/0,6mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '10mg/0,8mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia de TEV em cirurgias ortopedicas maiores',
      'Profilaxia de TEV em pacientes clinicos de alto risco',
      'Tratamento de TVP e TEP',
      'Sindrome coronariana aguda (IAMCSST e IAMSSST)',
      'Trombocitopenia induzida por heparina (HIT) - uso off-label',
    ],
    mecanismoAcao: 'Pentassacarideo sintetico que se liga seletivamente a antitrombina III (AT-III), potencializando sua acao inibitoria sobre o fator Xa em cerca de 300x. Inibicao indireta, mediada por AT-III. Nao inibe trombina diretamente. Nao causa HIT pois nao se liga ao fator plaquetario 4 (PF4). Biodisponibilidade SC ~100%. Meia-vida 17-21h permite dose unica diaria.',
    posologias: [
      {
        indicacao: 'Profilaxia TEV pos-cirurgia ortopedica',
        adultos: {
          dose: '2,5mg SC',
          frequencia: '1x/dia',
          observacoes: 'Iniciar 6-8h apos cirurgia (se hemostasia adequada). Duracao: 5-9 dias (joelho) ou ate 32 dias (quadril).',
        },
      },
      {
        indicacao: 'Profilaxia TEV pacientes clinicos',
        adultos: {
          dose: '2,5mg SC',
          frequencia: '1x/dia',
          observacoes: 'Duracao: 6-14 dias ou ate deambulacao.',
        },
      },
      {
        indicacao: 'Tratamento TVP/TEP',
        adultos: {
          dose: '<50kg: 5mg; 50-100kg: 7,5mg; >100kg: 10mg SC',
          frequencia: '1x/dia',
          observacoes: 'Iniciar antagonista vitamina K no dia 1; continuar ate INR terapeutico.',
        },
      },
      {
        indicacao: 'SCA (IAMCSST/IAMSSST)',
        adultos: {
          dose: '2,5mg SC 1x/dia (ou 2,5mg IV seguido de 2,5mg SC/dia)',
          frequencia: '1x/dia',
          observacoes: 'Manter durante hospitalizacao ou ate revascularizacao (maximo 8 dias).',
        },
      },
    ],
    contraindicacoes: [
      'ClCr <20mL/min (tratamento) ou <30mL/min (profilaxia)',
      'Sangramento ativo grave',
      'Endocardite bacteriana',
      'Peso <50kg para profilaxia (maior risco sangramento)',
      'Hipersensibilidade ao fondaparinux',
    ],
    precaucoes: [
      'ClCr 30-50mL/min - maior risco de sangramento',
      'Idosos - maior risco de sangramento',
      'Baixo peso (<50kg) - usar com cautela em profilaxia',
      'Anestesia neuroaxial - risco de hematoma espinhal (aguardar intervalos adequados)',
      'Nao tem antidoto especifico',
    ],
    efeitosAdversos: {
      comuns: ['Sangramento menor', 'Anemia', 'Trombocitopenia leve', 'Elevacao de transaminases', 'Edema'],
      graves: ['Sangramento maior', 'Hematoma espinhal/epidural', 'Trombocitopenia grave (raro)'],
    },
    interacoes: [
      {
        medicamento: 'Anticoagulantes (varfarina, heparina, DOACs)',
        gravidade: 'grave',
        efeito: 'Risco aditivo de sangramento',
        conduta: 'Monitorar rigorosamente; evitar sobreposicao prolongada',
      },
      {
        medicamento: 'Antiagregantes (AAS, clopidogrel)',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Usar com cautela conforme indicacao clinica',
      },
      {
        medicamento: 'AINEs',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Evitar uso prolongado; preferir paracetamol',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '30-50', ajuste: 'Usar com cautela; monitorar funcao renal' },
      { tfg: '20-30', ajuste: 'Contraindicado para profilaxia; tratamento com cautela extrema' },
      { tfg: '<20', ajuste: 'Contraindicado' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - usar com cautela se necessario' },
    monitorizacao: [
      'Funcao renal antes e periodicamente',
      'Hemograma (hemoglobina, plaquetas)',
      'Sinais de sangramento',
      'Anti-Xa se necessario (nao rotineiro)',
    ],
    orientacoesPaciente: [
      'Aplicacao subcutanea - alternar locais',
      'Informar sobre sinais de sangramento',
      'Informar antes de procedimentos',
      'Nao usar se tiver alergia a heparina com HIT confirmada (discutir com medico)',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de sangramento; monitorar funcao renal',
      hepatopatas: 'Sem ajuste especifico, mas cautela em coagulopatia',
    },
    doencasRelacionadas: ['tromboembolismo-venoso', 'tvp', 'tep', 'sindrome-coronariana-aguda', 'hit'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['fondaparinux', 'pentassacarideo', 'fator-Xa', 'OASIS', 'MATISSE', 'Arixtra', 'HIT-alternativa'],
  },

  // =============================================================================
  // HEPARINAS DE BAIXO PESO MOLECULAR (HBPM)
  // =============================================================================
  {
    id: 'dalteparina',
    nomeGenerico: 'Dalteparina sodica',
    nomesComerciais: ['Fragmin'],
    atcCode: 'B01AB04',
    rxNormCui: '67108',
    drugBankId: 'DB06779',
    snomedCT: '372563008',
    casNumber: '9041-08-1',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'hbpm',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '2.500UI/0,2mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '5.000UI/0,2mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '7.500UI/0,3mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '10.000UI/0,4mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '12.500UI/0,5mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '15.000UI/0,6mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '18.000UI/0,72mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia de TEV em cirurgias',
      'Tratamento de TVP e TEP',
      'Anticoagulacao em sindrome coronariana aguda',
      'Prevencao de recorrencia de TEV em pacientes com cancer (indicacao preferencial)',
      'Anticoagulacao durante hemodialise',
    ],
    mecanismoAcao: 'Heparina de baixo peso molecular (PM 4.000-6.000 Da). Liga-se a antitrombina III, potencializando inibicao do fator Xa (relacao anti-Xa/anti-IIa ~2,5:1). Menor atividade anti-trombina que HNF. Boa biodisponibilidade SC (~90%), meia-vida mais longa (3-5h) e farmacocinetica mais previsivel que HNF. Eficacia superior a HNF para TEV em cancer.',
    posologias: [
      {
        indicacao: 'Profilaxia TEV (risco moderado)',
        adultos: {
          dose: '2.500UI SC',
          frequencia: '1x/dia',
          observacoes: 'Iniciar 1-2h antes da cirurgia.',
        },
      },
      {
        indicacao: 'Profilaxia TEV (alto risco/ortopedia)',
        adultos: {
          dose: '5.000UI SC',
          frequencia: '1x/dia',
          observacoes: 'Iniciar na noite anterior ou 4-8h apos cirurgia.',
        },
      },
      {
        indicacao: 'Tratamento TVP/TEP',
        adultos: {
          dose: '200UI/kg SC 1x/dia ou 100UI/kg SC 2x/dia',
          frequencia: '1x/dia ou 12/12h',
          doseMaxima: '18.000UI/dia em dose unica',
          observacoes: 'Em cancer: manter dalteparina por pelo menos 6 meses.',
        },
      },
      {
        indicacao: 'TEV em cancer (apos 1 mes)',
        adultos: {
          dose: '~150UI/kg SC',
          frequencia: '1x/dia',
          observacoes: 'Reducao de dose apos primeiro mes de tratamento.',
        },
      },
      {
        indicacao: 'SCA (angina instavel/IAMSSST)',
        adultos: {
          dose: '120UI/kg SC',
          frequencia: '12/12h',
          doseMaxima: '10.000UI 12/12h',
          observacoes: 'Associar com AAS. Manter 5-8 dias ou ate revascularizacao.',
        },
      },
    ],
    contraindicacoes: [
      'Sangramento ativo',
      'Trombocitopenia induzida por heparina (HIT) atual ou historia',
      'Hipersensibilidade a dalteparina ou heparina',
      'Endocardite bacteriana aguda',
    ],
    precaucoes: [
      'Insuficiencia renal (ClCr <30mL/min) - acumulo; considerar monitoramento anti-Xa',
      'Peso extremo (<45kg ou >150kg) - considerar monitoramento anti-Xa',
      'Anestesia neuroaxial - risco de hematoma espinhal',
      'Gestacao - pode ser usada; ajustar dose no terceiro trimestre',
    ],
    efeitosAdversos: {
      comuns: ['Sangramento menor', 'Hematoma no local da injecao', 'Elevacao transitoria de transaminases', 'Trombocitopenia leve'],
      graves: ['Sangramento maior', 'HIT (mais raro que HNF)', 'Hematoma espinhal', 'Osteoporose (uso prolongado)', 'Hipercalemia'],
    },
    interacoes: [
      {
        medicamento: 'Anticoagulantes orais',
        gravidade: 'grave',
        efeito: 'Risco aditivo de sangramento',
        conduta: 'Monitorar; ajustar sobreposicao com varfarina',
      },
      {
        medicamento: 'Antiagregantes',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Usar conforme indicacao clinica; monitorar',
      },
      {
        medicamento: 'AINEs',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Evitar uso prolongado',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste rotineiro' },
      { tfg: '<30', ajuste: 'Monitorar anti-Xa; considerar reducao de dose ou HNF' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Nao absorvida oralmente pelo lactente; segura' },
    monitorizacao: [
      'Plaquetas (baseline e periodicamente - risco de HIT)',
      'Hemoglobina/hematocrito',
      'Anti-Xa se DRC grave, peso extremo ou suspeita de acumulo',
      'Funcao renal',
    ],
    orientacoesPaciente: [
      'Aplicacao subcutanea - alternar locais (abdome preferencialmente)',
      'Nao friccionar local apos injecao',
      'Sinais de sangramento - procurar atendimento',
      'Informar antes de procedimentos',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de sangramento; monitorar funcao renal',
      pediatrico: 'Doses especificas por faixa etaria disponíveis',
    },
    doencasRelacionadas: ['tromboembolismo-venoso', 'tvp', 'tep', 'cancer-trombose', 'sindrome-coronariana-aguda'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['dalteparina', 'HBPM', 'FRAGMIN', 'cancer', 'TEV', 'SCA'],
  },

  {
    id: 'tinzaparina',
    nomeGenerico: 'Tinzaparina sodica',
    nomesComerciais: ['Innohep'],
    atcCode: 'B01AB10',
    rxNormCui: '67109',
    drugBankId: 'DB09260',
    snomedCT: '387466009',
    casNumber: '9041-08-1',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'hbpm',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '3.500UI/0,35mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '4.500UI/0,45mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '10.000UI/0,5mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '14.000UI/0,7mL', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '18.000UI/0,9mL', disponivelSUS: false },
    ],
    indicacoes: [
      'Tratamento de TVP com ou sem TEP',
      'Prevencao de recorrencia de TEV em pacientes com cancer',
      'Profilaxia de TEV em pacientes cirurgicos',
      'Profilaxia de TEV em pacientes clinicos',
    ],
    mecanismoAcao: 'Heparina de baixo peso molecular (PM medio 6.500 Da - maior entre as HBPM). Liga-se a antitrombina III, inibindo principalmente fator Xa (relacao anti-Xa/anti-IIa ~1,5-2:1). Comparada a outras HBPM, tem maior peso molecular e maior atividade anti-IIa. Biodisponibilidade SC ~90%, meia-vida 3-4h. Estudada extensamente em cancer (CATCH trial).',
    posologias: [
      {
        indicacao: 'Tratamento TVP/TEP',
        adultos: {
          dose: '175UI/kg SC',
          frequencia: '1x/dia',
          observacoes: 'Dose unica diaria. Iniciar varfarina simultaneamente se transicao planejada.',
        },
      },
      {
        indicacao: 'TEV em cancer',
        adultos: {
          dose: '175UI/kg SC',
          frequencia: '1x/dia',
          observacoes: 'Manter por pelo menos 6 meses ou enquanto cancer ativo.',
        },
      },
      {
        indicacao: 'Profilaxia TEV cirurgica',
        adultos: {
          dose: '3.500UI ou 4.500UI SC',
          frequencia: '1x/dia',
          observacoes: 'Dose conforme risco cirurgico. Iniciar 2h antes ou 12h apos cirurgia.',
        },
      },
    ],
    contraindicacoes: [
      'Sangramento ativo',
      'HIT atual ou previa',
      'Hipersensibilidade',
      'Endocardite bacteriana',
    ],
    precaucoes: [
      'Insuficiencia renal grave - cautela; pode necessitar monitoramento anti-Xa',
      'Idosos >=70 anos em DRC - maior risco de sangramento',
      'Peso extremo',
      'Anestesia neuroaxial',
    ],
    efeitosAdversos: {
      comuns: ['Hematoma no local da injecao', 'Sangramento menor', 'Elevacao de ALT'],
      graves: ['Sangramento maior', 'HIT', 'Hematoma espinhal', 'Osteoporose (uso prolongado)'],
    },
    interacoes: [
      {
        medicamento: 'Anticoagulantes',
        gravidade: 'grave',
        efeito: 'Sangramento',
        conduta: 'Monitorar; ajustar transicao',
      },
      {
        medicamento: 'Antiagregantes/AINEs',
        gravidade: 'moderada',
        efeito: 'Aumento risco sangramento',
        conduta: 'Usar com cautela',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>30', ajuste: 'Sem ajuste' },
      { tfg: '20-30', ajuste: 'Usar com cautela; considerar monitoramento anti-Xa' },
      { tfg: '<20', ajuste: 'Nao recomendado - dados limitados' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Segura na amamentacao' },
    monitorizacao: [
      'Plaquetas (HIT)',
      'Hemograma',
      'Anti-Xa em situacoes especiais',
      'Funcao renal',
    ],
    orientacoesPaciente: [
      'Aplicacao SC diaria',
      'Alternar locais de injecao',
      'Sinais de sangramento',
    ],
    consideracoesEspeciais: {
      idosos: 'Cautela em >=70 anos com DRC',
      hepatopatas: 'Sem ajuste especifico',
    },
    doencasRelacionadas: ['tromboembolismo-venoso', 'cancer-trombose'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['tinzaparina', 'HBPM', 'Innohep', 'CATCH', 'cancer', 'TEV'],
  },

  {
    id: 'nadroparina',
    nomeGenerico: 'Nadroparina calcica',
    nomesComerciais: ['Fraxiparine', 'Fraxodi'],
    atcCode: 'B01AB06',
    rxNormCui: '68218',
    drugBankId: 'DB08813',
    snomedCT: '372563008',
    casNumber: '9005-49-6',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'hbpm',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_sc', concentracao: '2.850UI (0,3mL)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '3.800UI (0,4mL)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '5.700UI (0,6mL)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '7.600UI (0,8mL)', disponivelSUS: false },
      { forma: 'injetavel_sc', concentracao: '9.500UI (1,0mL)', disponivelSUS: false },
    ],
    indicacoes: [
      'Profilaxia de TEV em cirurgias',
      'Tratamento de TVP com ou sem TEP',
      'Prevencao de coagulacao em circuito extracorporeo (hemodialise)',
      'Anticoagulacao em sindrome coronariana aguda',
    ],
    mecanismoAcao: 'Heparina de baixo peso molecular (PM medio 4.300 Da). Potencializa acao da antitrombina III, com maior atividade anti-Xa do que anti-IIa (relacao ~3,5:1). Biodisponibilidade SC ~89%. Meia-vida 3,5h. Apresentacao disponivel em doses fixas ou ajustadas ao peso.',
    posologias: [
      {
        indicacao: 'Profilaxia TEV cirurgica',
        adultos: {
          dose: '2.850UI SC',
          frequencia: '1x/dia',
          observacoes: 'Iniciar 2-4h antes da cirurgia. Alto risco: 38UI/kg 12h antes, depois 38UI/kg/dia.',
        },
      },
      {
        indicacao: 'Tratamento TVP/TEP',
        adultos: {
          dose: '171UI/kg SC',
          frequencia: '1x/dia',
          doseMaxima: '17.100UI/dia',
          observacoes: 'Alternativa: 86UI/kg 2x/dia.',
        },
      },
      {
        indicacao: 'SCA',
        adultos: {
          dose: '86UI/kg SC em bolus IV, depois 86UI/kg SC',
          frequencia: '12/12h',
          observacoes: 'Por 6 dias. Associar AAS.',
        },
      },
    ],
    contraindicacoes: [
      'Sangramento ativo',
      'HIT',
      'Hipersensibilidade',
      'Endocardite bacteriana',
      'AVC hemorragico recente',
    ],
    precaucoes: [
      'Insuficiencia renal',
      'Peso extremo',
      'Idosos',
      'Anestesia neuroaxial',
    ],
    efeitosAdversos: {
      comuns: ['Hematoma local', 'Sangramento menor', 'Trombocitopenia leve'],
      graves: ['Sangramento maior', 'HIT', 'Hematoma espinhal'],
    },
    interacoes: [
      {
        medicamento: 'Anticoagulantes',
        gravidade: 'grave',
        efeito: 'Sangramento',
        conduta: 'Monitorar transicao',
      },
      {
        medicamento: 'Antiagregantes/AINEs',
        gravidade: 'moderada',
        efeito: 'Sangramento',
        conduta: 'Usar com cautela',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>50', ajuste: 'Sem ajuste' },
      { tfg: '30-50', ajuste: 'Reducao de 25-33% para tratamento' },
      { tfg: '<30', ajuste: 'Nao recomendado ou monitorar anti-Xa' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Segura' },
    monitorizacao: [
      'Plaquetas',
      'Anti-Xa em situacoes especiais',
      'Funcao renal',
    ],
    orientacoesPaciente: [
      'Aplicacao SC',
      'Alternar locais',
      'Sinais de sangramento',
    ],
    consideracoesEspeciais: {
      idosos: 'Monitorar funcao renal',
    },
    doencasRelacionadas: ['tromboembolismo-venoso', 'sindrome-coronariana-aguda'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['nadroparina', 'HBPM', 'Fraxiparine', 'TEV', 'SCA'],
  },

  // =============================================================================
  // INIBIDORES DIRETOS DA TROMBINA - USO PARENTERAL
  // =============================================================================
  {
    id: 'argatrobana',
    nomeGenerico: 'Argatrobana',
    nomesComerciais: ['Argatra', 'Argatroban'],
    atcCode: 'B01AE03',
    rxNormCui: '69528',
    drugBankId: 'DB00278',
    snomedCT: '372568004',
    casNumber: '74863-84-6',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'inibidor_trombina_direto',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '100mg/mL (2,5mL)', disponivelSUS: false },
    ],
    indicacoes: [
      'Anticoagulacao em pacientes com trombocitopenia induzida por heparina (HIT)',
      'Anticoagulacao em HIT submetidos a ICP',
      'Alternativa a heparina em pacientes com HIT que necessitam anticoagulacao',
    ],
    mecanismoAcao: 'Inibidor direto e reversivel da trombina (fator IIa), derivado sintetico da L-arginina. Liga-se ao sitio ativo da trombina de forma reversivel, inibindo trombina livre e ligada ao coagulo. Nao requer antitrombina III. Nao induz formacao de anticorpos anti-PF4 (seguro em HIT). Metabolismo hepatico (CYP3A4/5). Meia-vida 39-51 minutos - permite ajuste rapido.',
    posologias: [
      {
        indicacao: 'HIT sem trombose',
        adultos: {
          dose: '2mcg/kg/min IV em infusao continua',
          frequencia: 'Infusao continua',
          observacoes: 'Ajustar para manter TTPa 1,5-3x o controle (nao exceder 100s). Sem bolus.',
        },
      },
      {
        indicacao: 'HIT com trombose (HITT)',
        adultos: {
          dose: '2mcg/kg/min IV em infusao continua',
          frequencia: 'Infusao continua',
          observacoes: 'Iniciar transicao para varfarina quando plaquetas >150.000 e HIT resolvendo.',
        },
      },
      {
        indicacao: 'ICP em pacientes com HIT',
        adultos: {
          dose: 'Bolus 350mcg/kg IV, depois 25mcg/kg/min',
          frequencia: 'Infusao continua durante procedimento',
          observacoes: 'Ajustar para ACT 300-450s. Verificar ACT 5-10 min apos bolus.',
        },
      },
    ],
    contraindicacoes: [
      'Sangramento maior ativo',
      'Hipersensibilidade ao argatrobana',
      'Insuficiencia hepatica grave',
    ],
    precaucoes: [
      'Insuficiencia hepatica - reduzir dose significativamente',
      'Procedimentos invasivos',
      'Transicao para varfarina - argatroban prolonga INR (monitorar INR com argatroban e apos suspensao)',
      'Sem antidoto especifico (meia-vida curta permite resolucao rapida)',
    ],
    efeitosAdversos: {
      comuns: ['Sangramento menor', 'Febre', 'Diarreia', 'Nausea', 'Hipotensao'],
      graves: ['Sangramento maior', 'Sangramento intracraniano', 'Sangramento gastrointestinal'],
    },
    interacoes: [
      {
        medicamento: 'Trombolidicos',
        gravidade: 'grave',
        efeito: 'Risco aumentado de sangramento',
        conduta: 'Usar com extrema cautela; monitorar rigorosamente',
      },
      {
        medicamento: 'Anticoagulantes, antiagregantes',
        gravidade: 'moderada',
        efeito: 'Risco aditivo de sangramento',
        conduta: 'Monitorar; ajustar doses',
      },
      {
        medicamento: 'Varfarina',
        gravidade: 'moderada',
        efeito: 'Argatroban aumenta INR - dificulta monitoramento',
        conduta: 'Dosar INR com argatroban <2mcg/kg/min; confirmar INR apos 4-6h de suspensao',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario (excrecao hepatica)' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'TTPa a cada 2h ate estavel, depois 1x/dia',
      'ACT durante ICP',
      'Funcao hepatica',
      'Hemograma',
      'INR se transicao para varfarina',
    ],
    orientacoesPaciente: [
      'Uso hospitalar exclusivo (infusao IV)',
      'Monitoramento frequente necessario',
      'Informar sobre HIT para tratamentos futuros',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste por idade',
      hepatopatas: 'Reducao significativa de dose: 0,5mcg/kg/min; titular cuidadosamente',
    },
    doencasRelacionadas: ['hit', 'trombocitopenia-induzida-heparina', 'trombose'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['argatrobana', 'HIT', 'inibidor-trombina', 'anticoagulante-parenteral'],
  },

  {
    id: 'bivalirudina',
    nomeGenerico: 'Bivalirudina',
    nomesComerciais: ['Angiomax', 'Angiox'],
    atcCode: 'B01AE06',
    rxNormCui: '321064',
    drugBankId: 'DB00006',
    snomedCT: '386952008',
    casNumber: '128270-60-0',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'inibidor_trombina_direto',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '250mg (frasco)', disponivelSUS: false },
    ],
    indicacoes: [
      'Anticoagulacao em ICP (eletiva ou urgente)',
      'Pacientes com SCA submetidos a ICP',
      'Alternativa a heparina em ICP (especialmente se HIT)',
      'Anticoagulacao em ECMO (uso off-label)',
    ],
    mecanismoAcao: 'Peptideo sintetico de 20 aminoacidos, analogo da hirudina. Inibidor direto e reversivel da trombina (bivariante: liga-se ao sitio ativo e ao exosite 1). Inibe trombina livre e ligada ao coagulo. Acao independente de antitrombina III. Meia-vida muito curta (~25 min), permitindo rápido controle. Eliminacao predominantemente por proteolise; 20% renal.',
    posologias: [
      {
        indicacao: 'ICP',
        adultos: {
          dose: 'Bolus 0,75mg/kg IV, depois 1,75mg/kg/h',
          frequencia: 'Infusao continua durante procedimento',
          observacoes: 'Bolus adicional de 0,3mg/kg se ACT <225s. Infusao pode ser reduzida para 0,25mg/kg/h se inibidor GP IIb/IIIa usado.',
        },
      },
      {
        indicacao: 'ICP em HIT/HITTS',
        adultos: {
          dose: 'Bolus 0,75mg/kg IV, depois 1,75mg/kg/h',
          frequencia: 'Infusao continua',
          observacoes: 'Nao induz anticorpos anti-PF4; seguro em HIT.',
        },
      },
      {
        indicacao: 'Pos-ICP (se necessario)',
        adultos: {
          dose: '0,25mg/kg/h',
          frequencia: 'Por ate 4h apos ICP',
          observacoes: 'Considerar em pacientes de alto risco trombotico.',
        },
      },
    ],
    contraindicacoes: [
      'Sangramento ativo maior',
      'Hipersensibilidade a bivalirudina ou hirudinas',
    ],
    precaucoes: [
      'Insuficiencia renal - reduzir infusao (nao o bolus)',
      'Risco de trombose aguda de stent se infusao interrompida abruptamente',
      'Sem antidoto especifico (meia-vida curta e necessaria)',
    ],
    efeitosAdversos: {
      comuns: ['Sangramento menor', 'Dor nas costas', 'Nausea', 'Hipotensao', 'Cefaleia'],
      graves: ['Sangramento maior', 'Trombose aguda de stent (raro, se infusao descontinuada precocemente)', 'Sangramento intracraniano'],
    },
    interacoes: [
      {
        medicamento: 'Trombolidicos',
        gravidade: 'grave',
        efeito: 'Alto risco de sangramento',
        conduta: 'Usar com extrema cautela',
      },
      {
        medicamento: 'Heparina',
        gravidade: 'grave',
        efeito: 'Risco aditivo de sangramento',
        conduta: 'Nao usar concomitantemente',
      },
      {
        medicamento: 'Inibidores GP IIb/IIIa',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Reduzir dose de bivalirudina para 0,25mg/kg/h se usados juntos',
      },
      {
        medicamento: 'Antiagregantes (AAS, clopidogrel)',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Uso conforme indicado; monitorar',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>=30', ajuste: 'Sem ajuste no bolus; infusao padrao' },
      { tfg: '10-29', ajuste: 'Bolus normal; reducao da infusao para 1,0mg/kg/h' },
      { tfg: '<10 ou dialise', ajuste: 'Bolus normal; infusao 0,25mg/kg/h' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'ACT durante ICP (manter 300-350s)',
      'Sinais de sangramento',
      'Sinais de trombose de stent apos descontinuacao',
      'Funcao renal',
    ],
    orientacoesPaciente: [
      'Uso hospitalar durante procedimentos cardiacos',
      'Monitoramento continuo durante uso',
    ],
    consideracoesEspeciais: {
      idosos: 'Maior risco de sangramento; monitorar funcao renal',
    },
    doencasRelacionadas: ['sindrome-coronariana-aguda', 'icp', 'hit'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['bivalirudina', 'inibidor-trombina', 'ICP', 'HORIZONS-AMI', 'HIT'],
  },

  // =============================================================================
  // INIBIDORES P2Y12
  // =============================================================================
  {
    id: 'ticagrelor',
    nomeGenerico: 'Ticagrelor',
    nomesComerciais: ['Brilinta', 'Brilique'],
    atcCode: 'B01AC24',
    rxNormCui: '1116632',
    drugBankId: 'DB08816',
    snomedCT: '698805004',
    casNumber: '274693-27-5',
    pharmgkb: [
      {
        gene: 'CYP3A4',
        implications: ['Metabolizado por CYP3A4; inibidores/indutores podem afetar niveis'],
        dosageRecommendations: ['Evitar inibidores fortes de CYP3A4 (cetoconazol); evitar indutores (rifampicina)'],
      },
      {
        gene: 'SLCO1B1',
        variant: 'rs4149056',
        implications: ['Pode afetar farmacocinetica'],
      },
    ],
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_p2y12',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '60mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '90mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Sindrome coronariana aguda (com ou sem supradesnivel de ST)',
      'Prevencao de eventos aterotrombóticos apos SCA',
      'Historia de IAM (prevencao secundaria a longo prazo - dose 60mg)',
      'Em combinacao com AAS',
    ],
    mecanismoAcao: 'Inibidor reversivel e alosterio do receptor P2Y12 de ADP nas plaquetas. Diferente dos tienopiridínicos (clopidogrel, prasugrel), nao e pro-droga - acao direta. Ligacao reversivel permite recuperacao mais rapida da funcao plaquetaria (3-5 dias vs 7-10 dias do clopidogrel). Metabolito ativo (AR-C124910XX) tambem contribui. Inibicao plaquetaria mais rapida, potente e consistente que clopidogrel.',
    posologias: [
      {
        indicacao: 'SCA (fase aguda)',
        adultos: {
          dose: 'Dose de ataque: 180mg, depois 90mg',
          frequencia: '12/12h',
          observacoes: 'Associar com AAS 75-100mg/dia. Manter por 12 meses.',
        },
      },
      {
        indicacao: 'Prevencao secundaria pos-IAM (apos 1 ano)',
        adultos: {
          dose: '60mg',
          frequencia: '12/12h',
          observacoes: 'Em pacientes com alto risco; associar com AAS 75-100mg/dia.',
        },
      },
    ],
    contraindicacoes: [
      'Sangramento ativo',
      'Historia de sangramento intracraniano',
      'Insuficiencia hepatica moderada a grave',
      'Uso concomitante de inibidores fortes de CYP3A4 (cetoconazol, claritromicina, ritonavir)',
      'Uso concomitante de indutores fortes de CYP3A4 (rifampicina, fenitoina, carbamazepina)',
    ],
    precaucoes: [
      'Dispneia - frequente; geralmente transitoria e leve',
      'Bradicardia/pausas ventriculares - evitar em pacientes com doenca do seio sem marca-passo',
      'Hiperuricemia',
      'Creatinina aumenta cerca de 11% (sem significado clinico)',
      'Procedimentos cirurgicos - suspender 5 dias antes',
      'AAS >100mg/dia pode reduzir eficacia de ticagrelor',
    ],
    efeitosAdversos: {
      comuns: ['Dispneia (14%)', 'Cefaleia', 'Epistaxe', 'Contusoes', 'Tontura'],
      graves: ['Sangramento maior', 'Bradicardia/pausas sinusais', 'Sangramento intracraniano', 'Sangramento fatal'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4 (cetoconazol, itraconazol, ritonavir)',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de ticagrelor',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Indutores fortes de CYP3A4 (rifampicina, fenitoina)',
        gravidade: 'contraindicada',
        efeito: 'Reducao significativa dos niveis de ticagrelor',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Sinvastatina, lovastatina',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis das estatinas',
        mecanismo: 'Inibicao de CYP3A4 e OATP1B1',
        conduta: 'Limitar sinvastatina a 40mg; preferir outras estatinas',
      },
      {
        medicamento: 'Digoxina',
        gravidade: 'moderada',
        efeito: 'Aumento dos niveis de digoxina',
        mecanismo: 'Inibicao de P-gp',
        conduta: 'Monitorar niveis de digoxina',
      },
      {
        medicamento: 'AAS >100mg/dia',
        gravidade: 'moderada',
        efeito: 'Possivel reducao da eficacia do ticagrelor',
        conduta: 'Manter AAS 75-100mg/dia',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes - evitar' },
    monitorizacao: [
      'Sinais de sangramento',
      'Sintomas de dispneia (geralmente auto-limitada)',
      'ECG se bradicardia sintomática',
      'Funcao hepatica basal',
      'Acido urico',
    ],
    orientacoesPaciente: [
      'Tomar 2x/dia, com ou sem alimentos',
      'Nao interromper sem orientacao medica',
      'Dispneia e comum no inicio - geralmente melhora',
      'Informar sobre cirurgias ou procedimentos',
      'Manter AAS 75-100mg/dia conforme prescrito',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste por idade; maior risco de sangramento',
      hepatopatas: 'Contraindicado em insuficiencia hepatica moderada/grave',
    },
    doencasRelacionadas: ['sindrome-coronariana-aguda', 'infarto-miocardio', 'angina-instavel'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['ticagrelor', 'P2Y12', 'PLATO', 'SCA', 'antiagregante', 'Brilinta'],
  },

  {
    id: 'prasugrel',
    nomeGenerico: 'Prasugrel',
    nomesComerciais: ['Effient', 'Efient'],
    atcCode: 'B01AC22',
    rxNormCui: '613391',
    drugBankId: 'DB06209',
    snomedCT: '442025000',
    casNumber: '150322-43-3',
    pharmgkb: [
      {
        gene: 'CYP2C19',
        implications: ['Diferente do clopidogrel, eficacia de prasugrel nao e afetada por polimorfismos de CYP2C19'],
        dosageRecommendations: ['Sem ajuste baseado em genotipo CYP2C19'],
      },
      {
        gene: 'CYP3A4',
        implications: ['Conversao da pro-droga parcialmente via CYP3A4'],
      },
      {
        gene: 'CYP2B6',
        implications: ['Conversao da pro-droga parcialmente via CYP2B6'],
      },
    ],
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_p2y12',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: false },
    ],
    indicacoes: [
      'SCA (angina instavel, IAMSSST, IAMCSST) submetida a ICP',
      'Em combinacao com AAS',
      'Prevencao de eventos aterotrombóticos em pacientes com SCA tratados com ICP',
    ],
    mecanismoAcao: 'Tienopiridínico de terceira geracao; pro-droga convertida em metabolito ativo por hidrolise intestinal seguida de oxidacao hepatica (CYP3A4 e CYP2B6). Inibidor irreversivel do receptor P2Y12 de ADP plaquetario. Inibicao mais rapida, potente e consistente que clopidogrel. Eficacia nao afetada por polimorfismos de CYP2C19.',
    posologias: [
      {
        indicacao: 'SCA com ICP',
        adultos: {
          dose: 'Dose de ataque: 60mg, depois 10mg',
          frequencia: '1x/dia',
          observacoes: 'Associar com AAS 75-325mg/dia. Manter por pelo menos 12 meses.',
        },
        idosos: {
          dose: 'Considerar manutencao de 5mg/dia se >=75 anos',
          observacoes: 'Beneficio clinico incerto em idosos >=75 anos',
        },
      },
    ],
    contraindicacoes: [
      'Sangramento ativo patologico',
      'Historia de AVC ou AIT',
      'Insuficiencia hepatica grave (Child-Pugh C)',
    ],
    precaucoes: [
      'Idade >=75 anos - geralmente nao recomendado (exceto DM ou IAM previo)',
      'Peso <60kg - considerar dose de manutencao de 5mg/dia',
      'Procedimentos cirurgicos - suspender pelo menos 7 dias antes',
      'Propenso a sangramento',
    ],
    efeitosAdversos: {
      comuns: ['Sangramento menor', 'Equimoses', 'Epistaxe', 'Cefaleia', 'Dor nas costas'],
      graves: ['Sangramento maior', 'Sangramento fatal', 'Sangramento intracraniano', 'Purpura trombotica trombocitopenica (muito raro)'],
    },
    interacoes: [
      {
        medicamento: 'Anticoagulantes (varfarina, DOACs)',
        gravidade: 'grave',
        efeito: 'Risco significativo de sangramento',
        conduta: 'Evitar se possivel; se necessario, monitorar rigorosamente',
      },
      {
        medicamento: 'AINEs cronicos',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Usar com cautela',
      },
      {
        medicamento: 'Opioide (morfina)',
        gravidade: 'moderada',
        efeito: 'Pode retardar absorcao de prasugrel em SCA',
        conduta: 'Considerar em contexto de SCA',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Sinais de sangramento',
      'Hemograma periodico',
    ],
    orientacoesPaciente: [
      'Tomar 1x/dia, com ou sem alimentos',
      'Nao interromper sem orientacao medica',
      'Informar sobre cirurgias pelo menos 7 dias antes',
      'Sinais de sangramento - procurar atendimento',
    ],
    consideracoesEspeciais: {
      idosos: '>=75 anos: geralmente nao recomendado (maior sangramento sem beneficio adicional)',
    },
    doencasRelacionadas: ['sindrome-coronariana-aguda', 'infarto-miocardio', 'icp'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['prasugrel', 'P2Y12', 'TRITON-TIMI', 'tienopiridínico', 'SCA', 'ICP'],
  },

  {
    id: 'cangrelor',
    nomeGenerico: 'Cangrelor',
    nomesComerciais: ['Kengreal', 'Kengrexal'],
    atcCode: 'B01AC25',
    rxNormCui: '1666336',
    drugBankId: 'DB09083',
    snomedCT: '716082000',
    casNumber: '163706-06-7',
    classeTerapeutica: 'antiagregante',
    subclasse: 'inibidor_p2y12',
    rename: false,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg (frasco)', disponivelSUS: false },
    ],
    indicacoes: [
      'Antiagregacao durante ICP em pacientes sem pre-tratamento com inibidor P2Y12 oral',
      'Pacientes que nao receberam inibidor P2Y12 oral antes de ICP',
      'Alternativa quando terapia oral nao e possivel',
    ],
    mecanismoAcao: 'Analogo do ATP; inibidor direto e reversivel do receptor P2Y12. Acao intravenosa de inicio ultra-rapido (<2 minutos). Meia-vida muito curta (3-6 minutos) - funcao plaquetaria normaliza em 60 minutos apos suspensao. Nao e pro-droga - acao direta sem necessidade de metabolizacao. Inibicao potente e reversivel, permitindo facil transicao para inibidores P2Y12 orais.',
    posologias: [
      {
        indicacao: 'ICP',
        adultos: {
          dose: 'Bolus 30mcg/kg IV, depois 4mcg/kg/min',
          frequencia: 'Infusao continua durante ICP e por pelo menos 2h depois',
          observacoes: 'Pode estender ate 4h. Transicao para P2Y12 oral ao final da infusao.',
        },
      },
    ],
    contraindicacoes: [
      'Sangramento ativo significativo',
      'Hipersensibilidade ao cangrelor',
    ],
    precaucoes: [
      'Transicao para P2Y12 oral - timing importante',
      'Ticagrelor: administrar a qualquer momento durante/apos cangrelor',
      'Prasugrel/Clopidogrel: administrar imediatamente apos descontinuar cangrelor (nao durante)',
    ],
    efeitosAdversos: {
      comuns: ['Sangramento menor', 'Dispneia transitoria', 'Hematoma no acesso'],
      graves: ['Sangramento maior', 'Hemorragia intracraniana'],
    },
    interacoes: [
      {
        medicamento: 'Clopidogrel, prasugrel (durante infusao)',
        gravidade: 'moderada',
        efeito: 'Cangrelor bloqueia ligacao dos metabolitos ativos ao P2Y12',
        conduta: 'Administrar clopidogrel/prasugrel APOS cangrelor, nao durante',
      },
      {
        medicamento: 'Ticagrelor',
        gravidade: 'leve',
        efeito: 'Ticagrelor pode ser administrado durante ou apos cangrelor',
        conduta: 'Transicao sem restricao de timing',
      },
      {
        medicamento: 'Anticoagulantes',
        gravidade: 'moderada',
        efeito: 'Aumento do risco de sangramento',
        conduta: 'Uso conforme protocolo ICP',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Sinais de sangramento durante e apos ICP',
      'Transicao adequada para P2Y12 oral',
    ],
    orientacoesPaciente: [
      'Uso hospitalar durante ICP',
      'Sera transicionado para medicacao oral apos',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico',
    },
    doencasRelacionadas: ['sindrome-coronariana-aguda', 'icp'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['cangrelor', 'P2Y12', 'CHAMPION', 'intravenoso', 'ICP'],
  },

  // =============================================================================
  // ANTAGONISTA PAR-1
  // =============================================================================
  {
    id: 'vorapaxar',
    nomeGenerico: 'Vorapaxar',
    nomesComerciais: ['Zontivity'],
    atcCode: 'B01AC26',
    rxNormCui: '1547227',
    drugBankId: 'DB09030',
    snomedCT: '710825002',
    casNumber: '618385-01-6',
    pharmgkb: [
      {
        gene: 'CYP3A4',
        implications: ['Metabolizado por CYP3A4'],
        dosageRecommendations: ['Contraindicado com inibidores fortes de CYP3A4'],
      },
    ],
    classeTerapeutica: 'antiagregante',
    subclasse: 'outros',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2,08mg', disponivelSUS: false },
    ],
    indicacoes: [
      'Reducao de eventos trombóticos cardiovasculares em pacientes com historia de IAM ou DAP',
      'Em combinacao com AAS e/ou clopidogrel',
      'Prevencao secundaria em pacientes sem historia de AVC/AIT',
    ],
    mecanismoAcao: 'Antagonista do receptor PAR-1 (protease-activated receptor-1), principal receptor de trombina nas plaquetas humanas. Primeiro antiagregante desta classe. Inibe ativacao plaquetaria mediada por trombina, via distinta da AAS (COX) e inibidores P2Y12 (ADP). Meia-vida muito longa (~8 dias) - efeito persiste por semanas apos suspensao.',
    posologias: [
      {
        indicacao: 'Prevencao secundaria pos-IAM ou DAP',
        adultos: {
          dose: '2,08mg',
          frequencia: '1x/dia',
          observacoes: 'Associar com AAS e/ou clopidogrel. Uso a longo prazo.',
        },
      },
    ],
    contraindicacoes: [
      'Historia de AVC, AIT ou hemorragia intracraniana',
      'Sangramento ativo patologico',
      'Uso com inibidores fortes de CYP3A4 (cetoconazol, itraconazol, ritonavir, claritromicina)',
      'Insuficiencia hepatica grave',
    ],
    precaucoes: [
      'Meia-vida muito longa - efeito persiste 4+ semanas apos suspensao',
      'Idade >=75 anos e peso <60kg - maior risco de sangramento',
      'Procedimentos cirurgicos urgentes - sem antidoto; transfusao de plaquetas pode nao ser eficaz',
      'Nao iniciar em pacientes com indicacao de anticoagulacao',
    ],
    efeitosAdversos: {
      comuns: ['Sangramento menor', 'Anemia', 'Depressao', 'Rash', 'Exantema'],
      graves: ['Sangramento maior', 'Sangramento intracraniano (raro mas grave)', 'Sangramento fatal'],
    },
    interacoes: [
      {
        medicamento: 'Inibidores fortes de CYP3A4',
        gravidade: 'contraindicada',
        efeito: 'Aumento significativo dos niveis de vorapaxar',
        conduta: 'Uso concomitante contraindicado',
      },
      {
        medicamento: 'Indutores fortes de CYP3A4 (rifampicina)',
        gravidade: 'grave',
        efeito: 'Reducao dos niveis de vorapaxar',
        conduta: 'Evitar uso concomitante',
      },
      {
        medicamento: 'Anticoagulantes',
        gravidade: 'grave',
        efeito: 'Risco aumentado de sangramento',
        conduta: 'Evitar; nao iniciar vorapaxar em pacientes anticoagulados',
      },
      {
        medicamento: 'AAS, clopidogrel',
        gravidade: 'moderada',
        efeito: 'Risco aditivo de sangramento',
        conduta: 'Associacao conforme indicado; monitorar sangramento',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    monitorizacao: [
      'Sinais de sangramento',
      'Sintomas neurologicos (qualquer suspeita de AVC)',
      'Hemograma periodico',
    ],
    orientacoesPaciente: [
      'Tomar 1x/dia, com ou sem alimentos',
      'NUNCA usar se teve AVC ou sangramento cerebral',
      'Efeito dura semanas apos parar - informar se cirurgia necessaria',
      'Sinais de sangramento - procurar atendimento imediato',
    ],
    consideracoesEspeciais: {
      idosos: '>=75 anos: beneficio incerto; maior risco sangramento',
    },
    doencasRelacionadas: ['infarto-miocardio', 'doenca-arterial-periferica'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['vorapaxar', 'PAR-1', 'TRA-2P-TIMI-50', 'antiagregante', 'trombina'],
  },

  // =============================================================================
  // ANTIDOTO - REVERSAO DABIGATRANA
  // =============================================================================
  {
    id: 'idarucizumab',
    nomeGenerico: 'Idarucizumab',
    nomesComerciais: ['Praxbind'],
    atcCode: 'V03AB37',
    rxNormCui: '1737468',
    drugBankId: 'DB09296',
    snomedCT: '714081009',
    casNumber: '1262686-34-5',
    classeTerapeutica: 'anticoagulante',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '2,5g/50mL (frasco-ampola)', disponivelSUS: false },
    ],
    indicacoes: [
      'Reversao rapida e especifica dos efeitos anticoagulantes de dabigatrana',
      'Cirurgia de emergencia ou procedimento urgente',
      'Sangramento com risco de vida ou sangramento grave nao controlado',
    ],
    mecanismoAcao: 'Fragmento de anticorpo monoclonal humanizado (Fab) direcionado especificamente contra dabigatrana. Liga-se a dabigatrana livre e ligada a trombina com afinidade aproximadamente 350 vezes maior que a afinidade da dabigatrana pela trombina. Neutraliza rapidamente (em minutos) o efeito anticoagulante da dabigatrana. Especifico para dabigatrana - nao reverte outros anticoagulantes.',
    posologias: [
      {
        indicacao: 'Reversao de dabigatrana',
        adultos: {
          dose: '5g total (2 frascos de 2,5g)',
          frequencia: 'Dose unica',
          observacoes: 'Administrar como 2 infusoes IV consecutivas de 5-10 min cada, ou 2 bolus em sucessao rapida. Segunda dose de 5g pode ser considerada se ressangramento ou necessidade de segunda cirurgia urgente.',
        },
      },
    ],
    contraindicacoes: [
      'Hipersensibilidade conhecida ao idarucizumab',
      'Intolerancia hereditaria a frutose (contem sorbitol como excipiente)',
    ],
    precaucoes: [
      'Risco trombotico apos reversao - retomar anticoagulacao assim que possivel',
      'Reacoes de hipersensibilidade potenciais (anticorpo monoclonal)',
      'Nao reverte outros anticoagulantes (rivaroxabana, apixabana, heparina)',
      'Sem dados em gestantes',
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Hipocalemia', 'Constipacao', 'Febre', 'Pneumonia'],
      graves: ['Eventos tromboembolicos (relacionados a interrupcao da anticoagulacao, nao ao farmaco)', 'Reacoes de hipersensibilidade'],
    },
    interacoes: [
      {
        medicamento: 'Dabigatrana',
        gravidade: 'moderada',
        efeito: 'Neutraliza completamente o efeito anticoagulante',
        conduta: 'Retomar dabigatrana 24h apos idarucizumab se clinicamente indicado',
      },
    ],
    ajusteDoseRenal: [
      { tfg: '>0', ajuste: 'Sem ajuste necessario' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso de emergencia - improvavel risco ao lactente; beneficio materno supera' },
    monitorizacao: [
      'Tempo de trombina diluido (dTT) ou tempo de coagulacao de ecarina (ECT) antes e apos',
      'TTPa (menos especifico, mas disponivel)',
      'Sinais de sangramento - resolucao',
      'Sinais de trombose nas horas/dias subsequentes',
      'Funcao renal',
    ],
    orientacoesPaciente: [
      'Medicamento de emergencia - uso hospitalar exclusivo',
      'Anticoagulacao sera retomada quando seguro',
      'Risco de coagulos apos reversao - monitoramento necessario',
      'Informar sobre alergias a medicamentos biologicos',
    ],
    consideracoesEspeciais: {
      idosos: 'Sem ajuste especifico; populacao de alto risco para sangramento e trombose',
      hepatopatas: 'Sem ajuste necessario',
    },
    doencasRelacionadas: ['sangramento-por-anticoagulante', 'reversao-dabigatrana', 'emergencia-cirurgica'],
    citations: [],
    lastUpdate: '2025-01',
    tags: ['idarucizumab', 'antidoto', 'dabigatrana', 'RE-VERSE-AD', 'Praxbind', 'reversao', 'sangramento'],
  },
];
