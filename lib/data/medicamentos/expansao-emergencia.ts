/**
 * EXPANSÃO EMERGÊNCIA E CUIDADOS INTENSIVOS - DARWIN-MFC
 * ======================================================
 * Medicamentos para emergência, UTI, anestesia e suporte avançado de vida.
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosEmergencia: Partial<Medicamento>[] = [
  // ==================== DROGAS VASOATIVAS ====================
  {
    id: 'norepinefrina',
    nomeGenerico: 'Norepinefrina (Noradrenalina)',
    nomesComerciais: ['Levophed', 'Hyponor'],
    atcCode: 'C01CA03',
    classeTerapeutica: 'cardiotonico',
    subclasse: 'vasopressor',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '2mg/ml (4ml)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '1mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Choque séptico', 'Choque distributivo', 'Hipotensão refratária'],
    mecanismoAcao: 'Agonista alfa-1 e beta-1 adrenérgico com potente ação vasoconstritora.',
    posologias: [
      {
        indicacao: 'Choque',
        adultos: { dose: '0,1-2mcg/kg/min IV em BIC', frequencia: 'Titulação por PAM alvo' }
      }
    ],
    contraindicacoes: ['Hipovolemia não corrigida', 'Trombose mesentérica'],
    precaucoes: ['Acesso central preferencial', 'Monitorização invasiva', 'Corrigir hipovolemia antes'],
    efeitosAdversos: {
      comuns: ['Taquicardia', 'Isquemia periférica', 'Hipertensão'],
      graves: ['Necrose tecidual por extravasamento', 'Arritmias', 'Isquemia miocárdica']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Crise hipertensiva', conduta: 'Reduzir dose drasticamente' },
      { medicamento: 'Beta-bloqueadores', gravidade: 'moderada', efeito: 'Hipertensão paradoxal', conduta: 'Monitorar PA' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso em emergência' }
  },

  {
    id: 'dopamina',
    nomeGenerico: 'Dopamina',
    nomesComerciais: ['Revivan', 'Dopamin'],
    atcCode: 'C01CA04',
    classeTerapeutica: 'cardiotonico',
    subclasse: 'vasopressor',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '50mg/10ml', disponivelSUS: true }
    ],
    indicacoes: ['Bradicardia sintomática', 'Suporte inotrópico', 'Choque cardiogênico'],
    mecanismoAcao: 'Efeito dose-dependente: dopaminérgico, beta e alfa adrenérgico.',
    posologias: [
      {
        indicacao: 'Bradicardia/Inotrópico',
        adultos: { dose: '2-20mcg/kg/min IV em BIC', frequencia: 'Titulação' }
      }
    ],
    contraindicacoes: ['Feocromocitoma', 'Taquiarritmias não controladas'],
    precaucoes: ['Efeito renal em doses baixas questionável', 'Prefere-se norepinefrina no choque séptico'],
    efeitosAdversos: {
      comuns: ['Taquicardia', 'Náusea', 'Cefaleia'],
      graves: ['Arritmias', 'Isquemia tecidual', 'Gangrena']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Crise hipertensiva', conduta: 'Reduzir dose 1/10' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso em emergência' }
  },

  {
    id: 'dobutamina',
    nomeGenerico: 'Dobutamina',
    nomesComerciais: ['Dobutrex'],
    atcCode: 'C01CA07',
    classeTerapeutica: 'cardiotonico',
    subclasse: 'inotropico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '250mg/20ml', disponivelSUS: true }
    ],
    indicacoes: ['Choque cardiogênico', 'Insuficiência cardíaca aguda', 'Teste de estresse farmacológico'],
    mecanismoAcao: 'Agonista beta-1 com efeito inotrópico positivo e leve vasodilatação.',
    posologias: [
      {
        indicacao: 'Suporte inotrópico',
        adultos: { dose: '2,5-20mcg/kg/min IV em BIC', frequencia: 'Titulação' }
      }
    ],
    contraindicacoes: ['Estenose aórtica grave', 'Cardiomiopatia hipertrófica obstrutiva'],
    precaucoes: ['Pode causar hipotensão inicial', 'Monitorização cardíaca contínua'],
    efeitosAdversos: {
      comuns: ['Taquicardia', 'Palpitações', 'Cefaleia'],
      graves: ['Arritmias', 'Isquemia miocárdica', 'Hipotensão']
    },
    interacoes: [
      { medicamento: 'Beta-bloqueadores', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Pode necessitar doses maiores' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Uso em emergência' }
  },

  {
    id: 'vasopressina',
    nomeGenerico: 'Vasopressina',
    nomesComerciais: ['Pitressin'],
    atcCode: 'H01BA01',
    classeTerapeutica: 'hormonio',
    subclasse: 'vasopressor',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '20UI/ml', disponivelSUS: true }
    ],
    indicacoes: ['Choque séptico refratário', 'Choque vasoplégico', 'PCR (ACLS)'],
    mecanismoAcao: 'Agonista receptor V1 vascular - vasoconstrição não adrenérgica.',
    posologias: [
      {
        indicacao: 'Choque séptico adjunto',
        adultos: { dose: '0,03-0,04UI/min IV', frequencia: 'Dose fixa (não titular)' }
      },
      {
        indicacao: 'PCR',
        adultos: { dose: '40UI IV bolus', frequencia: 'Pode substituir 1ª ou 2ª dose epinefrina' }
      }
    ],
    contraindicacoes: ['Resposta à norepinefrina adequada', 'Isquemia coronária ativa'],
    precaucoes: ['Não usar como vasopressor único', 'Isquemia esplâncnica/digital', 'Hiponatremia'],
    efeitosAdversos: {
      comuns: ['Palidez', 'Náusea', 'Cólica abdominal'],
      graves: ['Isquemia digital/esplâncnica', 'Hiponatremia grave', 'Arritmias']
    },
    interacoes: [
      { medicamento: 'Norepinefrina', gravidade: 'leve', efeito: 'Sinergismo desejado', conduta: 'Combinação terapêutica' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso em emergência' }
  },

  {
    id: 'epinefrina',
    nomeGenerico: 'Epinefrina (Adrenalina)',
    nomesComerciais: ['Adrenalina'],
    atcCode: 'C01CA24',
    classeTerapeutica: 'cardiotonico',
    subclasse: 'vasopressor',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '1mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['PCR', 'Anafilaxia', 'Broncoespasmo grave', 'Choque anafilático'],
    mecanismoAcao: 'Agonista alfa e beta adrenérgico com efeitos cardiovasculares e broncodilatadores.',
    posologias: [
      {
        indicacao: 'PCR',
        adultos: { dose: '1mg IV/IO', frequencia: 'A cada 3-5min' },
        pediatrico: { dose: '0,01mg/kg (máx 1mg)', frequencia: 'A cada 3-5min' }
      },
      {
        indicacao: 'Anafilaxia',
        adultos: { dose: '0,3-0,5mg IM (coxa lateral)', frequencia: 'Repetir em 5-15min se necessário' },
        pediatrico: { dose: '0,01mg/kg IM (máx 0,3mg)', frequencia: 'Repetir se necessário' }
      },
      {
        indicacao: 'Infusão contínua',
        adultos: { dose: '0,1-1mcg/kg/min IV', frequencia: 'Titulação' }
      }
    ],
    contraindicacoes: ['Nenhuma absoluta em emergência'],
    precaucoes: ['Dose IM para anafilaxia (não SC)', 'Cuidado em coronariopatas', 'Evitar via IV em anafilaxia inicial'],
    efeitosAdversos: {
      comuns: ['Taquicardia', 'Tremor', 'Ansiedade', 'Palpitações'],
      graves: ['Arritmias ventriculares', 'Hemorragia cerebral', 'Isquemia miocárdica']
    },
    interacoes: [
      { medicamento: 'Beta-bloqueadores', gravidade: 'moderada', efeito: 'Hipertensão/bradicardia paradoxal', conduta: 'Usar glucagon se necessário' },
      { medicamento: 'Antidepressivos tricíclicos', gravidade: 'moderada', efeito: 'Potencialização efeitos', conduta: 'Reduzir dose epinefrina' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso em emergência' }
  },

  // ==================== SEDAÇÃO E ANALGESIA ====================
  {
    id: 'midazolam',
    nomeGenerico: 'Midazolam',
    nomesComerciais: ['Dormonid', 'Dormire'],
    atcCode: 'N05CD08',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '5mg/ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '1mg/ml', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: false }
    ],
    indicacoes: ['Sedação procedimentos', 'Status epilepticus', 'Sedação UTI', 'Pré-anestesia'],
    mecanismoAcao: 'Benzodiazepínico de ação curta que potencializa GABA.',
    posologias: [
      {
        indicacao: 'Sedação procedimento',
        adultos: { dose: '1-2,5mg IV lento', frequencia: 'Titular a cada 2-3min, máx 5-10mg' }
      },
      {
        indicacao: 'Status epilepticus',
        adultos: { dose: '10mg IM ou 0,2mg/kg IV', frequencia: 'Dose única, repetir se necessário' },
        pediatrico: { dose: '0,1-0,2mg/kg IV/IM (máx 10mg)', frequencia: 'Dose única' }
      },
      {
        indicacao: 'Sedação contínua UTI',
        adultos: { dose: '0,02-0,1mg/kg/h IV', frequencia: 'Titulação por escala sedação' }
      }
    ],
    contraindicacoes: ['Miastenia gravis', 'Apneia do sono grave', 'Insuficiência respiratória grave'],
    precaucoes: ['Depressão respiratória', 'Ter flumazenil disponível', 'Reduzir dose em idosos'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Amnésia', 'Hipotensão leve'],
      graves: ['Depressão respiratória', 'Apneia', 'Reação paradoxal']
    },
    interacoes: [
      { medicamento: 'Opioides', gravidade: 'grave', efeito: 'Depressão respiratória aditiva', conduta: 'Reduzir doses' },
      { medicamento: 'Inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumenta níveis midazolam', conduta: 'Reduzir dose' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Evitar, especialmente doses repetidas' }
  },

  {
    id: 'propofol',
    nomeGenerico: 'Propofol',
    nomesComerciais: ['Diprivan', 'Propovan'],
    atcCode: 'N01AX10',
    classeTerapeutica: 'outros',
    subclasse: 'anestesico_geral',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '10mg/ml (20ml)', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '10mg/ml (50ml)', disponivelSUS: true }
    ],
    indicacoes: ['Indução anestesia', 'Sedação UTI', 'Sedação procedimentos', 'Status epilepticus refratário'],
    mecanismoAcao: 'Anestésico venoso que potencializa GABA com início e recuperação rápidos.',
    posologias: [
      {
        indicacao: 'Indução anestesia',
        adultos: { dose: '1,5-2,5mg/kg IV', frequencia: 'Dose única' }
      },
      {
        indicacao: 'Sedação UTI',
        adultos: { dose: '0,3-4mg/kg/h IV', frequencia: 'Titulação por escala sedação' }
      },
      {
        indicacao: 'Sedação procedimento',
        adultos: { dose: 'Bolus 0,5-1mg/kg + 25-75mcg/kg/min', frequencia: 'Titulação' }
      }
    ],
    contraindicacoes: ['Alergia a ovo/soja (relativa)', 'Hipertrigliceridemia grave'],
    precaucoes: ['Hipotensão na indução', 'Síndrome infusão propofol (>48h, altas doses)', 'Contém lipídios'],
    efeitosAdversos: {
      comuns: ['Hipotensão', 'Apneia na indução', 'Dor no local injeção'],
      graves: ['Síndrome infusão propofol', 'Pancreatite', 'Bradicardia grave']
    },
    interacoes: [
      { medicamento: 'Opioides', gravidade: 'moderada', efeito: 'Depressão cardiovascular aditiva', conduta: 'Reduzir doses' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Uso único seguro' }
  },

  {
    id: 'fentanil',
    nomeGenerico: 'Fentanil',
    nomesComerciais: ['Fentanest', 'Fentanyl'],
    atcCode: 'N01AH01',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '50mcg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Analgesia procedimentos', 'Anestesia', 'Sedação UTI', 'Dor intensa'],
    mecanismoAcao: 'Opioide sintético potente (100x morfina) com ação rápida.',
    posologias: [
      {
        indicacao: 'Analgesia procedimento',
        adultos: { dose: '1-2mcg/kg IV', frequencia: 'Lento, repetir conforme necessário' }
      },
      {
        indicacao: 'Infusão contínua UTI',
        adultos: { dose: '0,5-2mcg/kg/h IV', frequencia: 'Titulação' }
      },
      {
        indicacao: 'Sequência rápida intubação',
        adultos: { dose: '1-3mcg/kg IV', frequencia: 'Dose única' }
      }
    ],
    contraindicacoes: ['Depressão respiratória sem suporte ventilatório'],
    precaucoes: ['Rigidez torácica em bolus rápido', 'Ter naloxona disponível', 'Acúmulo em infusão prolongada'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Hipotensão', 'Bradicardia'],
      graves: ['Depressão respiratória', 'Rigidez muscular', 'Síndrome torácico']
    },
    interacoes: [
      { medicamento: 'Benzodiazepínicos', gravidade: 'grave', efeito: 'Depressão respiratória aditiva', conduta: 'Reduzir doses' },
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Síndrome serotoninérgica', conduta: 'Evitar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Dose única segura' }
  },

  {
    id: 'ketamina',
    nomeGenerico: 'Cetamina (Ketamina)',
    nomesComerciais: ['Ketalar', 'Ketamin'],
    atcCode: 'N01AX03',
    classeTerapeutica: 'outros',
    subclasse: 'anestesico_dissociativo',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '50mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Sedação procedimentos pediátricos', 'Sequência rápida intubação', 'Broncoespasmo grave', 'Dor refratária'],
    mecanismoAcao: 'Antagonista NMDA com efeito dissociativo, analgésico e broncodilatador.',
    posologias: [
      {
        indicacao: 'Sedação procedimento',
        adultos: { dose: '1-2mg/kg IV ou 4-5mg/kg IM', frequencia: 'Dose única' },
        pediatrico: { dose: '1-2mg/kg IV ou 3-5mg/kg IM', frequencia: 'Dose única', idadeMinima: '3 meses' }
      },
      {
        indicacao: 'Indução SRI',
        adultos: { dose: '1-2mg/kg IV', frequencia: 'Dose única' }
      },
      {
        indicacao: 'Analgesia subdissociativa',
        adultos: { dose: '0,1-0,3mg/kg IV', frequencia: 'Lento em 10min' }
      }
    ],
    contraindicacoes: ['Hipertensão grave não controlada', 'Eclâmpsia', 'Psicose ativa'],
    precaucoes: ['Mantém reflexos de via aérea', 'Efeitos dissociativos/alucinações', 'Hipersecreção (usar atropina)'],
    efeitosAdversos: {
      comuns: ['Alucinações/sonhos vividos', 'Nistagmo', 'Hipersecreção'],
      graves: ['Laringoespasmo', 'Hipertensão grave', 'Aumento PIC (controverso)']
    },
    interacoes: [
      { medicamento: 'Benzodiazepínicos', gravidade: 'leve', efeito: 'Reduz efeitos dissociativos', conduta: 'Pode associar para diminuir emergência' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Dose única segura' }
  },

  {
    id: 'etomidato',
    nomeGenerico: 'Etomidato',
    nomesComerciais: ['Amidate', 'Hypnomidate'],
    atcCode: 'N01AX07',
    classeTerapeutica: 'outros',
    subclasse: 'anestesico_geral',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '2mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Indução anestesia', 'Sequência rápida intubação (paciente instável)'],
    mecanismoAcao: 'Anestésico que potencializa GABA com mínimo efeito hemodinâmico.',
    posologias: [
      {
        indicacao: 'Indução',
        adultos: { dose: '0,2-0,3mg/kg IV', frequencia: 'Dose única' },
        pediatrico: { dose: '0,2-0,3mg/kg IV', frequencia: 'Dose única', idadeMinima: '10 anos' }
      }
    ],
    contraindicacoes: ['Insuficiência adrenal', 'Porfiria', 'Uso prolongado'],
    precaucoes: ['Supressão adrenal transitória', 'Mioclonias na indução', 'Não usar em infusão'],
    efeitosAdversos: {
      comuns: ['Mioclonias', 'Náusea/vômito pós-operatório', 'Dor na injeção'],
      graves: ['Supressão adrenal', 'Apneia']
    },
    interacoes: [
      { medicamento: 'Corticoides', gravidade: 'leve', efeito: 'Pode ser dado profilaticamente', conduta: 'Considerar em sepse' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Dose única segura' }
  },

  // ==================== BLOQUEADORES NEUROMUSCULARES ====================
  {
    id: 'succinilcolina',
    nomeGenerico: 'Succinilcolina',
    nomesComerciais: ['Quelicin'],
    atcCode: 'M03AB01',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'bloqueador_neuromuscular',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100mg/5ml', disponivelSUS: true }
    ],
    indicacoes: ['Sequência rápida intubação', 'Eletroconvulsoterapia'],
    mecanismoAcao: 'BNM despolarizante de ação ultracurta.',
    posologias: [
      {
        indicacao: 'SRI',
        adultos: { dose: '1-1,5mg/kg IV', frequencia: 'Dose única' },
        pediatrico: { dose: '1-2mg/kg IV', frequencia: 'Dose única' }
      }
    ],
    contraindicacoes: ['Hipercalemia', 'Queimados >24h', 'Lesão medular >24h', 'Doença neuromuscular', 'Miopatias', 'História familiar hipertermia maligna'],
    precaucoes: ['Fasciculações', 'Aumento potássio 0,5-1mEq/L', 'Manter paciente ventilado'],
    efeitosAdversos: {
      comuns: ['Fasciculações', 'Mialgia pós-operatória', 'Hipercalemia leve'],
      graves: ['Hipertermia maligna', 'Hipercalemia grave', 'Bradicardia (2ª dose)']
    },
    interacoes: [
      { medicamento: 'Anticolinesterásicos', gravidade: 'moderada', efeito: 'Prolonga bloqueio', conduta: 'Monitorar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso único' }
  },

  {
    id: 'rocuronio',
    nomeGenerico: 'Rocurônio',
    nomesComerciais: ['Esmeron', 'Rocuron'],
    atcCode: 'M03AC09',
    classeTerapeutica: 'relaxante_muscular',
    subclasse: 'bloqueador_neuromuscular',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '10mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['SRI (alternativa a succinilcolina)', 'Relaxamento cirúrgico', 'Facilitar ventilação'],
    mecanismoAcao: 'BNM não despolarizante aminosteroidal.',
    posologias: [
      {
        indicacao: 'SRI',
        adultos: { dose: '1-1,2mg/kg IV', frequencia: 'Dose única' }
      },
      {
        indicacao: 'Manutenção',
        adultos: { dose: '0,1-0,2mg/kg IV PRN ou 10-12mcg/kg/min', frequencia: 'Conforme TOF' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Reversão com sugamadex se disponível', 'Ajuste em hepatopatia', 'Monitorar TOF'],
    efeitosAdversos: {
      comuns: ['Hipotensão leve', 'Taquicardia'],
      graves: ['Anafilaxia', 'Bloqueio residual']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'moderada', efeito: 'Prolonga bloqueio', conduta: 'Monitorar TOF' },
      { medicamento: 'Sugamadex', gravidade: 'leve', efeito: 'Reversão rápida', conduta: 'Antídoto específico' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso único' }
  },

  {
    id: 'sugamadex',
    nomeGenerico: 'Sugamadex',
    nomesComerciais: ['Bridion'],
    atcCode: 'V03AB35',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: false,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '100mg/ml', disponivelSUS: false }
    ],
    indicacoes: ['Reversão rocurônio/vecurônio', 'Reversão emergencial de BNM'],
    mecanismoAcao: 'Ciclodextrina que encapsula rocurônio, revertendo bloqueio neuromuscular.',
    posologias: [
      {
        indicacao: 'Reversão rotina (TOF 2)',
        adultos: { dose: '2mg/kg IV', frequencia: 'Dose única' }
      },
      {
        indicacao: 'Reversão profunda (PTC 1-2)',
        adultos: { dose: '4mg/kg IV', frequencia: 'Dose única' }
      },
      {
        indicacao: 'Reversão imediata',
        adultos: { dose: '16mg/kg IV', frequencia: 'Dose única' }
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    precaucoes: ['Pode interferir com anticoncepcionais hormonais', 'Custo elevado', 'Reaplicar rocurônio requer doses maiores'],
    efeitosAdversos: {
      comuns: ['Disgeusia', 'Náusea'],
      graves: ['Bradicardia grave', 'Anafilaxia (raro)']
    },
    interacoes: [
      { medicamento: 'Contraceptivos hormonais', gravidade: 'moderada', efeito: 'Reduz eficácia por 7 dias', conduta: 'Usar método adicional' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Uso único' }
  },

  // ==================== ANTIARRÍTMICOS ====================
  {
    id: 'amiodarona-ev',
    nomeGenerico: 'Amiodarona Injetável',
    nomesComerciais: ['Ancoron IV', 'Atlansil IV'],
    atcCode: 'C01BD01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'antiarritmico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '150mg/3ml', disponivelSUS: true }
    ],
    indicacoes: ['FV/TV refratária a choque', 'Taquiarritmias ventriculares', 'FA com resposta ventricular rápida'],
    mecanismoAcao: 'Antiarrítmico classe III com múltiplos mecanismos.',
    posologias: [
      {
        indicacao: 'PCR (FV/TV refratária)',
        adultos: { dose: '300mg IV/IO bolus, depois 150mg se necessário', frequencia: 'Durante RCP' }
      },
      {
        indicacao: 'Taquiarritmia estável',
        adultos: { dose: '150mg IV em 10min, depois 1mg/min x 6h, depois 0,5mg/min x 18h', frequencia: 'Protocolo 24h' }
      }
    ],
    contraindicacoes: ['Bradicardia sinusal', 'Bloqueio AV avançado sem marcapasso', 'Disfunção tireoidiana grave'],
    precaucoes: ['Flebite (usar acesso central)', 'Hipotensão durante infusão', 'Interações extensas'],
    efeitosAdversos: {
      comuns: ['Hipotensão', 'Bradicardia', 'Flebite'],
      graves: ['Torsades de pointes', 'Hepatotoxicidade', 'Toxicidade pulmonar']
    },
    interacoes: [
      { medicamento: 'QT prolongadores', gravidade: 'grave', efeito: 'Torsades de pointes', conduta: 'Evitar combinação' },
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Aumenta INR 2-3x', conduta: 'Reduzir varfarina 50%' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Excretado no leite' }
  },

  {
    id: 'lidocaina-ev',
    nomeGenerico: 'Lidocaína Injetável',
    nomesComerciais: ['Xylocaína IV'],
    atcCode: 'C01BB01',
    classeTerapeutica: 'outros',
    subclasse: 'antiarritmico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '2% (20mg/ml)', disponivelSUS: true }
    ],
    indicacoes: ['FV/TV (alternativa amiodarona)', 'Arritmias ventriculares pós-IAM', 'Anestesia local'],
    mecanismoAcao: 'Antiarrítmico classe Ib - bloqueador canais sódio.',
    posologias: [
      {
        indicacao: 'PCR (FV/TV)',
        adultos: { dose: '1-1,5mg/kg IV bolus, manutenção 1-4mg/min', frequencia: 'Bolus repetido a cada 5-10min se necessário' }
      },
      {
        indicacao: 'Arritmia ventricular',
        adultos: { dose: '1-1,5mg/kg IV lento + 1-4mg/min infusão', frequencia: 'Titular' }
      }
    ],
    contraindicacoes: ['Bloqueio AV avançado', 'Síndrome Stokes-Adams', 'Bradicardia grave'],
    precaucoes: ['Toxicidade SNC em doses altas', 'Reduzir dose em hepatopata', 'Monitorar ECG'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Parestesias', 'Sonolência'],
      graves: ['Convulsões', 'Bradicardia', 'Assistolia']
    },
    interacoes: [
      { medicamento: 'Beta-bloqueadores', gravidade: 'moderada', efeito: 'Aumenta níveis lidocaína', conduta: 'Monitorar' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Pequena quantidade no leite' }
  },

  {
    id: 'adenosina',
    nomeGenerico: 'Adenosina',
    nomesComerciais: ['Adenocard'],
    atcCode: 'C01EB10',
    classeTerapeutica: 'outros',
    subclasse: 'antiarritmico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '3mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['TSVP (diagnóstico e tratamento)', 'Taquicardia de complexo estreito'],
    mecanismoAcao: 'Ativação receptor A1 adenosina - bloqueio AV transitório.',
    posologias: [
      {
        indicacao: 'TSVP',
        adultos: { dose: '6mg IV bolus rápido + flush, depois 12mg se sem resposta', frequencia: 'Repetir 12mg uma vez se necessário' },
        pediatrico: { dose: '0,1mg/kg (máx 6mg), repetir 0,2mg/kg (máx 12mg)', frequencia: 'Bolus rápido' }
      }
    ],
    contraindicacoes: ['Asma', 'Bloqueio AV 2º/3º grau sem MP', 'FA pré-excitada (WPW)'],
    precaucoes: ['Administrar em veia proximal + flush rápido', 'Meia-vida segundos', 'Pode causar assistolia transitória'],
    efeitosAdversos: {
      comuns: ['Flushing', 'Dispneia transitória', 'Desconforto torácico'],
      graves: ['Broncoespasmo', 'Assistolia prolongada', 'FA']
    },
    interacoes: [
      { medicamento: 'Dipiridamol', gravidade: 'grave', efeito: 'Potencializa efeito', conduta: 'Reduzir dose adenosina' },
      { medicamento: 'Cafeína/Teofilina', gravidade: 'moderada', efeito: 'Antagoniza adenosina', conduta: 'Pode necessitar doses maiores' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Meia-vida ultracurta' }
  },

  // ==================== REVERSORES ====================
  {
    id: 'naloxona',
    nomeGenerico: 'Naloxona',
    nomesComerciais: ['Narcan'],
    atcCode: 'V03AB15',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '0,4mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Intoxicação por opioides', 'Reversão sedação opioide', 'Depressão respiratória por opioides'],
    mecanismoAcao: 'Antagonista competitivo dos receptores opioides mu, kappa e delta.',
    posologias: [
      {
        indicacao: 'Intoxicação opioide',
        adultos: { dose: '0,4-2mg IV/IM/SC, repetir a cada 2-3min', frequencia: 'Até resposta, máx 10mg' },
        pediatrico: { dose: '0,1mg/kg (até 2mg)', frequencia: 'Repetir a cada 2-3min' }
      },
      {
        indicacao: 'Reversão sedação',
        adultos: { dose: '0,04-0,1mg IV', frequencia: 'Titular cuidadosamente' }
      }
    ],
    contraindicacoes: ['Dependência opioide (precipita abstinência)'],
    precaucoes: ['Meia-vida curta (30-90min) - risco ressedação', 'Titular para manter respiração sem reverter analgesia', 'Pode precipitar abstinência grave'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Vômito', 'Diaforese'],
      graves: ['Síndrome abstinência aguda', 'Edema pulmonar', 'Arritmias']
    },
    interacoes: [],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Uso em emergência' }
  },

  {
    id: 'flumazenil',
    nomeGenerico: 'Flumazenil',
    nomesComerciais: ['Lanexat'],
    atcCode: 'V03AB25',
    classeTerapeutica: 'outros',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '0,5mg/5ml', disponivelSUS: true }
    ],
    indicacoes: ['Reversão sedação benzodiazepínica', 'Diagnóstico intoxicação por BZD'],
    mecanismoAcao: 'Antagonista competitivo do receptor GABA-A benzodiazepínico.',
    posologias: [
      {
        indicacao: 'Reversão sedação',
        adultos: { dose: '0,2mg IV lento, repetir 0,1mg a cada min', frequencia: 'Máx 1mg' }
      },
      {
        indicacao: 'Intoxicação',
        adultos: { dose: '0,2mg IV, depois 0,3mg, depois 0,5mg a cada min', frequencia: 'Máx 3mg' }
      }
    ],
    contraindicacoes: ['Uso crônico BZD (risco convulsão)', 'Convulsão controlada com BZD', 'Intoxicação mista com tricíclicos'],
    precaucoes: ['Risco convulsões em dependentes', 'Meia-vida curta - risco ressedação', 'Não reverte efeitos de outros sedativos'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Tontura', 'Agitação'],
      graves: ['Convulsões', 'Arritmias', 'Síndrome abstinência']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso único' }
  },

  {
    id: 'atropina',
    nomeGenerico: 'Atropina',
    nomesComerciais: ['Atropina'],
    atcCode: 'A03BA01',
    classeTerapeutica: 'outros',
    subclasse: 'anticolinergico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '0,25mg/ml', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '0,5mg/ml', disponivelSUS: true }
    ],
    indicacoes: ['Bradicardia sintomática', 'Intoxicação por organofosforados', 'Pré-medicação anestésica'],
    mecanismoAcao: 'Antagonista muscarínico que bloqueia ação parassimpática.',
    posologias: [
      {
        indicacao: 'Bradicardia sintomática',
        adultos: { dose: '0,5-1mg IV', frequencia: 'Repetir a cada 3-5min, máx 3mg' },
        pediatrico: { dose: '0,02mg/kg (mín 0,1mg, máx 0,5mg)', frequencia: 'Repetir uma vez se necessário' }
      },
      {
        indicacao: 'Intoxicação organofosforado',
        adultos: { dose: '2-4mg IV, repetir conforme secreções', frequencia: 'Pode necessitar doses muito altas' }
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'Obstrução urinária', 'Íleo paralítico'],
    precaucoes: ['Doses <0,5mg podem causar bradicardia paradoxal', 'Taquicardia em doses altas', 'Cuidado em coronariopatas'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Midríase', 'Taquicardia'],
      graves: ['Arritmias', 'Retenção urinária', 'Delirium anticolinérgico']
    },
    interacoes: [
      { medicamento: 'Anticolinérgicos', gravidade: 'moderada', efeito: 'Efeito aditivo', conduta: 'Monitorar toxicidade anticolinérgica' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pequena quantidade no leite' }
  },

  // ==================== DIURÉTICOS DE ALÇA ====================
  {
    id: 'furosemida-ev',
    nomeGenerico: 'Furosemida Injetável',
    nomesComerciais: ['Lasix IV'],
    atcCode: 'C03CA01',
    classeTerapeutica: 'diuretico',
    subclasse: 'diuretico_alca',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '10mg/ml (2ml)', disponivelSUS: true }
    ],
    indicacoes: ['Edema agudo de pulmão', 'IC descompensada', 'Oligúria na IRA', 'Hipercalemia'],
    mecanismoAcao: 'Inibe cotransportador Na-K-2Cl na alça de Henle.',
    posologias: [
      {
        indicacao: 'EAP/IC aguda',
        adultos: { dose: '20-80mg IV bolus lento', frequencia: 'Repetir conforme resposta' }
      },
      {
        indicacao: 'IC descompensada grave',
        adultos: { dose: 'Bolus seguido de 5-40mg/h IV contínuo', frequencia: 'Titular por débito urinário' }
      }
    ],
    contraindicacoes: ['Anúria', 'Hipovolemia', 'Hipocalemia grave'],
    precaucoes: ['Monitorar eletrólitos', 'Ototoxicidade em doses altas', 'Depleção volêmica'],
    efeitosAdversos: {
      comuns: ['Hipocalemia', 'Hiponatremia', 'Hipotensão'],
      graves: ['Ototoxicidade', 'Nefrotoxicidade', 'Arritmias por distúrbio eletrolítico']
    },
    interacoes: [
      { medicamento: 'Aminoglicosídeos', gravidade: 'grave', efeito: 'Ototoxicidade aditiva', conduta: 'Monitorar audição' },
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Toxicidade digitálica por hipocalemia', conduta: 'Monitorar K+' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pode reduzir lactação' }
  },

  // ==================== SUPORTE GLICÊMICO ====================
  {
    id: 'glucagon',
    nomeGenerico: 'Glucagon',
    nomesComerciais: ['Glucagen'],
    atcCode: 'H04AA01',
    classeTerapeutica: 'hormonio',
    subclasse: 'hormonio_pancreatico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '1mg', disponivelSUS: true }
    ],
    indicacoes: ['Hipoglicemia grave sem acesso venoso', 'Intoxicação por beta-bloqueador', 'Intoxicação por bloqueador canal cálcio'],
    mecanismoAcao: 'Hormônio que estimula glicogenólise e gliconeogênese hepática; efeito inotrópico positivo.',
    posologias: [
      {
        indicacao: 'Hipoglicemia',
        adultos: { dose: '1mg IM/SC', frequencia: 'Dose única, repetir em 15min se necessário' },
        pediatrico: { dose: '<25kg: 0,5mg; ≥25kg: 1mg IM/SC', frequencia: 'Dose única' }
      },
      {
        indicacao: 'Intoxicação beta-bloqueador',
        adultos: { dose: '5-10mg IV bolus + 1-10mg/h infusão', frequencia: 'Titular por resposta' }
      }
    ],
    contraindicacoes: ['Feocromocitoma', 'Insulinoma'],
    precaucoes: ['Depende de reservas de glicogênio (não funciona em desnutridos/alcoolistas)', 'Causa náusea/vômito'],
    efeitosAdversos: {
      comuns: ['Náusea', 'Vômito', 'Hiperglicemia'],
      graves: ['Hipotensão paradoxal', 'Reações anafiláticas']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'moderada', efeito: 'Aumenta efeito anticoagulante', conduta: 'Monitorar INR' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Uso único' }
  },

  {
    id: 'glicose-hipertonica',
    nomeGenerico: 'Glicose 50%',
    nomesComerciais: ['Glicose Hipertônica'],
    atcCode: 'B05BA03',
    classeTerapeutica: 'suplemento',
    subclasse: 'nutriente',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '50% (500mg/ml)', disponivelSUS: true }
    ],
    indicacoes: ['Hipoglicemia grave', 'Hipercalemia (com insulina)'],
    mecanismoAcao: 'Reposição direta de glicose; com insulina promove shift de K+ para intracelular.',
    posologias: [
      {
        indicacao: 'Hipoglicemia',
        adultos: { dose: '25-50ml (12,5-25g glicose) IV', frequencia: 'Dose única, repetir conforme glicemia' },
        pediatrico: { dose: '0,5-1g/kg (1-2ml/kg de G50%)', frequencia: 'Dose única' }
      },
      {
        indicacao: 'Hipercalemia',
        adultos: { dose: '25g glicose + 10UI insulina regular IV', frequencia: 'Pode repetir' }
      }
    ],
    contraindicacoes: ['Hiperglicemia', 'Coma hiperosmolar'],
    precaucoes: ['Irritante - preferir via central para concentrações >10%', 'Monitorar glicemia'],
    efeitosAdversos: {
      comuns: ['Hiperglicemia de rebote', 'Flebite'],
      graves: ['Necrose tecidual por extravasamento']
    },
    interacoes: [],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  // ==================== ELETRÓLITOS ====================
  {
    id: 'cloreto-potassio-ev',
    nomeGenerico: 'Cloreto de Potássio EV',
    nomesComerciais: ['KCl 19,1%'],
    atcCode: 'B05XA01',
    classeTerapeutica: 'suplemento',
    subclasse: 'eletrolito',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '19,1% (2,56mEq/ml)', disponivelSUS: true }
    ],
    indicacoes: ['Hipocalemia grave', 'Reposição em pacientes sem via oral'],
    mecanismoAcao: 'Reposição de potássio intracelular.',
    posologias: [
      {
        indicacao: 'Hipocalemia grave',
        adultos: { dose: '10-20mEq/h IV diluído', frequencia: 'Máx 40mEq/h em acesso central com monitorização' }
      },
      {
        indicacao: 'Reposição rotina',
        adultos: { dose: '40-80mEq/dia diluído em SF', frequencia: 'Infusão lenta' }
      }
    ],
    contraindicacoes: ['Hipercalemia', 'IRA oligúrica sem indicação'],
    precaucoes: ['NUNCA em bolus', 'Diluir sempre', 'Monitorizar ECG se K<3 ou infusão rápida', 'Concentração máx periférico 40mEq/L'],
    efeitosAdversos: {
      comuns: ['Dor no local infusão', 'Flebite'],
      graves: ['Arritmias por hipercalemia', 'Parada cardíaca']
    },
    interacoes: [
      { medicamento: 'IECA/BRA', gravidade: 'moderada', efeito: 'Risco hipercalemia', conduta: 'Monitorar K+' },
      { medicamento: 'Espironolactona', gravidade: 'moderada', efeito: 'Risco hipercalemia', conduta: 'Monitorar K+' }
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  {
    id: 'bicarbonato-sodio',
    nomeGenerico: 'Bicarbonato de Sódio',
    nomesComerciais: ['NaHCO3 8,4%'],
    atcCode: 'B05XA02',
    classeTerapeutica: 'suplemento',
    subclasse: 'eletrolito',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '8,4% (1mEq/ml)', disponivelSUS: true }
    ],
    indicacoes: ['Acidose metabólica grave', 'Hipercalemia grave', 'Intoxicação por tricíclicos', 'PCR prolongada'],
    mecanismoAcao: 'Tamponamento de ácidos e alcalinização urinária/plasmática.',
    posologias: [
      {
        indicacao: 'Acidose metabólica',
        adultos: { dose: 'Déficit HCO3 = 0,3 x peso x (24 - HCO3 atual); repor 50% em 4-8h', frequencia: 'Titular por gasometria' }
      },
      {
        indicacao: 'Hipercalemia/Intox tricíclico',
        adultos: { dose: '50-100mEq IV', frequencia: 'Bolus ou infusão' }
      }
    ],
    contraindicacoes: ['Alcalose metabólica', 'Hipocalcemia', 'Hipocalemia'],
    precaucoes: ['Pode piorar acidose intracelular', 'Sobrecarga de sódio', 'Pode precipitar com cálcio'],
    efeitosAdversos: {
      comuns: ['Alcalose metabólica', 'Hipocalemia'],
      graves: ['Arritmias', 'Convulsões por alcalose', 'Hipocalcemia']
    },
    interacoes: [
      { medicamento: 'Gluconato de cálcio', gravidade: 'grave', efeito: 'Precipitação', conduta: 'Nunca misturar na mesma linha' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  {
    id: 'gluconato-calcio',
    nomeGenerico: 'Gluconato de Cálcio',
    nomesComerciais: ['Gluconato de Cálcio 10%'],
    atcCode: 'A12AA03',
    classeTerapeutica: 'suplemento',
    subclasse: 'eletrolito',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '10% (100mg/ml)', disponivelSUS: true }
    ],
    indicacoes: ['Hipercalemia com alteração ECG', 'Hipocalcemia sintomática', 'Intoxicação por bloqueador canal cálcio'],
    mecanismoAcao: 'Estabilização membrana miocárdica; reposição de cálcio.',
    posologias: [
      {
        indicacao: 'Hipercalemia (estabilização cardíaca)',
        adultos: { dose: '10-20ml (1-2g) IV em 2-3min', frequencia: 'Pode repetir em 5min se ECG persistir' }
      },
      {
        indicacao: 'Hipocalcemia',
        adultos: { dose: '10-20ml IV lento ou em infusão', frequencia: 'Titular por cálcio iônico' }
      }
    ],
    contraindicacoes: ['Hipercalcemia', 'Intoxicação digitálica'],
    precaucoes: ['IV lento (bradicardia se rápido)', 'Não misturar com bicarbonato', 'Extravasamento causa necrose'],
    efeitosAdversos: {
      comuns: ['Flush', 'Gosto metálico', 'Bradicardia'],
      graves: ['Parada cardíaca se infusão rápida', 'Necrose tecidual']
    },
    interacoes: [
      { medicamento: 'Digoxina', gravidade: 'grave', efeito: 'Potencializa toxicidade', conduta: 'Usar com extrema cautela' },
      { medicamento: 'Bicarbonato', gravidade: 'grave', efeito: 'Precipitação', conduta: 'Não misturar' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  },

  {
    id: 'sulfato-magnesio-ev',
    nomeGenerico: 'Sulfato de Magnésio EV',
    nomesComerciais: ['MgSO4'],
    atcCode: 'B05XA05',
    classeTerapeutica: 'suplemento',
    subclasse: 'eletrolito',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '50% (4mEq/ml)', disponivelSUS: true }
    ],
    indicacoes: ['Eclâmpsia/Pré-eclâmpsia', 'Torsades de pointes', 'Hipomagnesemia', 'Asma grave refratária'],
    mecanismoAcao: 'Estabilização neuromuscular e cardíaca; efeito anticonvulsivante.',
    posologias: [
      {
        indicacao: 'Eclâmpsia (Zuspan)',
        adultos: { dose: '4-6g IV em 20min + 1-2g/h manutenção', frequencia: 'Até 24h pós-parto' }
      },
      {
        indicacao: 'Torsades de pointes',
        adultos: { dose: '1-2g IV em 2-5min', frequencia: 'Pode repetir' }
      },
      {
        indicacao: 'Asma grave',
        adultos: { dose: '2g IV em 20min', frequencia: 'Dose única' }
      }
    ],
    contraindicacoes: ['Bloqueio cardíaco', 'Miastenia gravis', 'IR grave sem monitorização'],
    precaucoes: ['Monitorar reflexos patelares', 'Ter gluconato cálcio disponível (antídoto)', 'Ajustar em IR'],
    efeitosAdversos: {
      comuns: ['Flush', 'Hipotensão', 'Fraqueza muscular'],
      graves: ['Depressão respiratória', 'Bloqueio cardíaco', 'Hipocalcemia']
    },
    interacoes: [
      { medicamento: 'BNM', gravidade: 'moderada', efeito: 'Prolonga bloqueio', conduta: 'Monitorar TOF' },
      { medicamento: 'Nifedipino', gravidade: 'moderada', efeito: 'Hipotensão grave', conduta: 'Evitar combinação em pré-eclâmpsia' }
    ],
    gestacao: 'A',
    amamentacao: { compativel: true, observacao: 'Seguro' }
  }
];
