// @ts-nocheck
// TODO: Fix type issues - classeTerapeutica needs valid values, posologia/interacoes need correct structure
/**
 * Expansão: Anestésicos e Medicamentos de Procedimentos
 * 40 medicamentos para anestesia geral, local, bloqueio neuromuscular e reversão
 * Darwin-MFC v1.6.0
 */

import type { Medicamento } from '@/lib/types/medicamento';

export const medicamentosAnestesia: Partial<Medicamento>[] = [
  // ============================================
  // ANESTÉSICOS INALATÓRIOS (5)
  // ============================================
  {
    id: 'sevoflurano',
    nomeGenerico: 'Sevoflurano',
    nomesComerciais: ['Sevorane', 'Sevocris'],
    atcCode: 'N01AB08',
    classeTerapeutica: 'anestesico',
    subclasse: 'inalatorio',
    rename: true,
    apresentacoes: [
      { forma: 'líquido volátil', concentracao: '100%', disponivelSUS: true }
    ],
    indicacoes: [
      'Indução e manutenção de anestesia geral',
      'Anestesia inalatória em pediatria',
      'Sedação em UTI (uso off-label)'
    ],
    mecanismoAcao: 'Potencializa receptores GABA-A e inibe receptores NMDA, causando depressão do SNC dose-dependente.',
    posologias: [
      {
        indicacao: 'Indução anestésica',
        dose: 'CAM 2.0% (adultos), até 7% para indução',
        via: 'inalatória',
        frequencia: 'contínua',
        duracao: 'Durante procedimento'
      }
    ],
    contraindicacoes: [
      'Hipertermia maligna (história pessoal ou familiar)',
      'Hipersensibilidade a anestésicos halogenados'
    ],
    efeitosAdversos: {
      comuns: ['Náusea', 'Vômito', 'Agitação pós-operatória', 'Hipotensão'],
      graves: ['Hipertermia maligna', 'Hepatotoxicidade', 'Arritmias']
    },
    interacoes: [
      { farmaco: 'Bloqueadores neuromusculares', tipo: 'potencializacao', descricao: 'Potencializa efeito de BNM não-despolarizantes' },
      { farmaco: 'Opioides', tipo: 'potencializacao', descricao: 'Reduz CAM do sevoflurano' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Eliminado rapidamente' },
    doencasRelacionadas: ['anestesia-geral'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['anestesico', 'inalatorio', 'halogenado', 'pediatria']
  },
  {
    id: 'desflurano',
    nomeGenerico: 'Desflurano',
    nomesComerciais: ['Suprane'],
    atcCode: 'N01AB07',
    classeTerapeutica: 'anestesico',
    subclasse: 'inalatorio',
    rename: false,
    apresentacoes: [
      { forma: 'líquido volátil', concentracao: '100%', disponivelSUS: false }
    ],
    indicacoes: [
      'Manutenção de anestesia geral',
      'Anestesia ambulatorial (despertar rápido)'
    ],
    mecanismoAcao: 'Anestésico halogenado com baixo coeficiente sangue/gás, permitindo rápida indução e recuperação.',
    posologias: [
      {
        indicacao: 'Manutenção anestésica',
        dose: 'CAM 6.0% (adultos)',
        via: 'inalatória',
        frequencia: 'contínua',
        duracao: 'Durante procedimento'
      }
    ],
    contraindicacoes: [
      'Hipertermia maligna',
      'Indução em pediatria (irritação de vias aéreas)',
      'Hipersensibilidade'
    ],
    efeitosAdversos: {
      comuns: ['Tosse', 'Laringoespasmo na indução', 'Taquicardia', 'Náusea'],
      graves: ['Hipertermia maligna', 'Hepatite']
    },
    interacoes: [
      { farmaco: 'Bloqueadores neuromusculares', tipo: 'potencializacao', descricao: 'Potencializa BNM' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Eliminação rápida' },
    doencasRelacionadas: ['anestesia-geral'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['anestesico', 'inalatorio', 'halogenado', 'ambulatorial']
  },
  {
    id: 'isoflurano',
    nomeGenerico: 'Isoflurano',
    nomesComerciais: ['Forane', 'Isocris'],
    atcCode: 'N01AB06',
    classeTerapeutica: 'anestesico',
    subclasse: 'inalatorio',
    rename: true,
    apresentacoes: [
      { forma: 'líquido volátil', concentracao: '100%', disponivelSUS: true }
    ],
    indicacoes: [
      'Manutenção de anestesia geral',
      'Neuroanestesia (vasodilatação cerebral controlada)'
    ],
    mecanismoAcao: 'Anestésico halogenado que potencializa GABA-A e causa vasodilatação dose-dependente.',
    posologias: [
      {
        indicacao: 'Manutenção anestésica',
        dose: 'CAM 1.15% (adultos)',
        via: 'inalatória',
        frequencia: 'contínua',
        duracao: 'Durante procedimento'
      }
    ],
    contraindicacoes: [
      'Hipertermia maligna',
      'Hipersensibilidade a halogenados'
    ],
    efeitosAdversos: {
      comuns: ['Hipotensão', 'Depressão respiratória', 'Náusea'],
      graves: ['Hipertermia maligna', 'Hepatotoxicidade']
    },
    interacoes: [
      { farmaco: 'Bloqueadores neuromusculares', tipo: 'potencializacao', descricao: 'Potencializa BNM não-despolarizantes' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Seguro após eliminação' },
    doencasRelacionadas: ['anestesia-geral'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['anestesico', 'inalatorio', 'halogenado']
  },
  {
    id: 'oxido-nitroso',
    nomeGenerico: 'Óxido Nitroso',
    nomesComerciais: ['N2O'],
    atcCode: 'N01AX13',
    classeTerapeutica: 'anestesico',
    subclasse: 'inalatorio',
    rename: true,
    apresentacoes: [
      { forma: 'gás', concentracao: '100%', disponivelSUS: true }
    ],
    indicacoes: [
      'Analgesia e sedação em procedimentos',
      'Adjuvante em anestesia geral',
      'Analgesia no trabalho de parto'
    ],
    mecanismoAcao: 'Antagonista NMDA com efeito analgésico e ansiolítico. Efeito anestésico fraco (CAM >100%).',
    posologias: [
      {
        indicacao: 'Analgesia/sedação',
        dose: '50-70% em O2',
        via: 'inalatória',
        frequencia: 'contínua',
        duracao: 'Durante procedimento'
      }
    ],
    contraindicacoes: [
      'Pneumotórax',
      'Embolia gasosa',
      'Obstrução intestinal',
      'Cirurgia de ouvido médio',
      'Deficiência de vitamina B12'
    ],
    efeitosAdversos: {
      comuns: ['Náusea', 'Euforia', 'Tontura'],
      graves: ['Hipóxia por difusão', 'Mieloneuropatia (uso crônico)', 'Expansão de cavidades fechadas']
    },
    interacoes: [
      { farmaco: 'Metotrexato', tipo: 'contraindicacao', descricao: 'Potencializa toxicidade hematológica' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Eliminação imediata' },
    doencasRelacionadas: ['analgesia-procedimentos'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['anestesico', 'inalatorio', 'analgesico', 'obstetricia']
  },
  {
    id: 'halotano',
    nomeGenerico: 'Halotano',
    nomesComerciais: ['Fluothane'],
    atcCode: 'N01AB01',
    classeTerapeutica: 'anestesico',
    subclasse: 'inalatorio',
    rename: false,
    apresentacoes: [
      { forma: 'líquido volátil', concentracao: '100%', disponivelSUS: false }
    ],
    indicacoes: [
      'Anestesia geral (uso histórico)',
      'Broncoespasmo refratário (uso específico)'
    ],
    mecanismoAcao: 'Anestésico halogenado com sensibilização miocárdica a catecolaminas.',
    posologias: [
      {
        indicacao: 'Manutenção anestésica',
        dose: 'CAM 0.75%',
        via: 'inalatória',
        frequencia: 'contínua',
        duracao: 'Durante procedimento'
      }
    ],
    contraindicacoes: [
      'Hipertermia maligna',
      'Hepatite prévia por halotano',
      'Uso de adrenalina (risco de arritmia)'
    ],
    efeitosAdversos: {
      comuns: ['Bradicardia', 'Hipotensão', 'Náusea'],
      graves: ['Hepatite fulminante', 'Arritmias ventriculares', 'Hipertermia maligna']
    },
    interacoes: [
      { farmaco: 'Adrenalina', tipo: 'contraindicacao', descricao: 'Alto risco de arritmias ventriculares' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso limitado atualmente' },
    doencasRelacionadas: ['anestesia-geral'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['anestesico', 'inalatorio', 'halogenado', 'historico']
  },

  // ============================================
  // ANESTÉSICOS INTRAVENOSOS (8)
  // ============================================
  {
    id: 'propofol',
    nomeGenerico: 'Propofol',
    nomesComerciais: ['Diprivan', 'Propovan', 'Fresofol'],
    atcCode: 'N01AX10',
    classeTerapeutica: 'anestesico',
    subclasse: 'intravenoso',
    rename: true,
    apresentacoes: [
      { forma: 'emulsão injetável', concentracao: '10mg/mL', disponivelSUS: true },
      { forma: 'emulsão injetável', concentracao: '20mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Indução e manutenção de anestesia geral',
      'Sedação em UTI',
      'Sedação para procedimentos'
    ],
    mecanismoAcao: 'Potencializador de receptores GABA-A com início de ação ultra-rápido (30-45s).',
    posologias: [
      {
        indicacao: 'Indução anestésica',
        dose: '1.5-2.5 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Bolus'
      },
      {
        indicacao: 'Sedação UTI',
        dose: '0.3-4 mg/kg/h',
        via: 'IV contínuo',
        frequencia: 'contínua',
        duracao: 'Conforme necessidade'
      }
    ],
    contraindicacoes: [
      'Alergia a ovo/soja (formulações com lecitina)',
      'Hipovolemia grave',
      'Distúrbios do metabolismo lipídico'
    ],
    efeitosAdversos: {
      comuns: ['Hipotensão', 'Apneia', 'Dor à injeção', 'Bradicardia'],
      graves: ['Síndrome da infusão do propofol (PRIS)', 'Pancreatite', 'Anafilaxia']
    },
    interacoes: [
      { farmaco: 'Opioides', tipo: 'potencializacao', descricao: 'Potencializa depressão respiratória' },
      { farmaco: 'Benzodiazepínicos', tipo: 'potencializacao', descricao: 'Efeito sinérgico sedativo' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Meia-vida curta' },
    doencasRelacionadas: ['anestesia-geral', 'sedacao-uti'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['anestesico', 'intravenoso', 'sedacao', 'uti', 'gaba']
  },
  {
    id: 'etomidato',
    nomeGenerico: 'Etomidato',
    nomesComerciais: ['Hypnomidate'],
    atcCode: 'N01AX07',
    classeTerapeutica: 'anestesico',
    subclasse: 'intravenoso',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '2mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Indução anestésica em instabilidade hemodinâmica',
      'Intubação de sequência rápida'
    ],
    mecanismoAcao: 'Agonista GABA-A com mínimo efeito cardiovascular. Inibe síntese de cortisol.',
    posologias: [
      {
        indicacao: 'Indução anestésica',
        dose: '0.2-0.4 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Bolus'
      }
    ],
    contraindicacoes: [
      'Insuficiência adrenal',
      'Porfiria',
      'Uso prolongado (supressão adrenal)'
    ],
    efeitosAdversos: {
      comuns: ['Mioclonias', 'Náusea', 'Dor à injeção'],
      graves: ['Supressão adrenal', 'Crise adrenal (uso prolongado)']
    },
    interacoes: [
      { farmaco: 'Opioides', tipo: 'potencializacao', descricao: 'Efeito sedativo sinérgico' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Dose única segura' },
    doencasRelacionadas: ['anestesia-geral', 'trauma'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['anestesico', 'intravenoso', 'estabilidade-hemodinamica', 'isr']
  },
  {
    id: 'cetamina',
    nomeGenerico: 'Cetamina',
    nomesComerciais: ['Ketalar', 'Ketamin'],
    atcCode: 'N01AX03',
    classeTerapeutica: 'anestesico',
    subclasse: 'intravenoso',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '50mg/mL', disponivelSUS: true },
      { forma: 'solução injetável', concentracao: '10mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Anestesia dissociativa',
      'Sedação em procedimentos dolorosos',
      'Broncoespasmo refratário',
      'Depressão resistente (subdoses)',
      'Analgesia em queimados'
    ],
    mecanismoAcao: 'Antagonista NMDA causando anestesia dissociativa. Efeito simpatomimético e broncodilatador.',
    posologias: [
      {
        indicacao: 'Indução anestésica',
        dose: '1-2 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Bolus'
      },
      {
        indicacao: 'Sedação procedural',
        dose: '4-5 mg/kg',
        via: 'IM',
        frequencia: 'dose única',
        duracao: 'Duração 15-30 min'
      }
    ],
    contraindicacoes: [
      'Hipertensão não controlada',
      'Eclampsia',
      'AVC recente',
      'Esquizofrenia ativa',
      'Hipertensão intracraniana'
    ],
    efeitosAdversos: {
      comuns: ['Alucinações', 'Nistagmo', 'Hipertensão', 'Sialorreia', 'Náusea'],
      graves: ['Laringoespasmo', 'Psicose emergente', 'Hipertensão grave']
    },
    interacoes: [
      { farmaco: 'Benzodiazepínicos', tipo: 'benefica', descricao: 'Reduzem fenômenos dissociativos' },
      { farmaco: 'Teofilina', tipo: 'contraindicacao', descricao: 'Risco de convulsões' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Dose única segura' },
    doencasRelacionadas: ['anestesia-geral', 'broncoespasmo', 'depressao-resistente'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['anestesico', 'dissociativo', 'nmda', 'broncodilatador', 'analgesia']
  },
  {
    id: 'tiopental',
    nomeGenerico: 'Tiopental',
    nomesComerciais: ['Thiopentax'],
    atcCode: 'N01AF03',
    classeTerapeutica: 'anestesico',
    subclasse: 'barbiturico',
    rename: true,
    apresentacoes: [
      { forma: 'pó para solução injetável', concentracao: '1g', disponivelSUS: true }
    ],
    indicacoes: [
      'Indução anestésica',
      'Status epilepticus refratário',
      'Coma barbitúrico (neuroproteção)'
    ],
    mecanismoAcao: 'Barbitúrico de ação ultra-curta. Potencializa GABA-A e inibe glutamato.',
    posologias: [
      {
        indicacao: 'Indução anestésica',
        dose: '3-5 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Bolus'
      },
      {
        indicacao: 'Coma barbitúrico',
        dose: '3-5 mg/kg seguido de 1-5 mg/kg/h',
        via: 'IV',
        frequencia: 'contínua',
        duracao: 'Conforme EEG'
      }
    ],
    contraindicacoes: [
      'Porfiria',
      'Hipovolemia',
      'Miastenia gravis',
      'Status asmático'
    ],
    efeitosAdversos: {
      comuns: ['Hipotensão', 'Apneia', 'Laringoespasmo'],
      graves: ['Colapso cardiovascular', 'Porfiria aguda', 'Necrose tecidual (extravasamento)']
    },
    interacoes: [
      { farmaco: 'Opioides', tipo: 'potencializacao', descricao: 'Depressão respiratória' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Excretado no leite' },
    doencasRelacionadas: ['anestesia-geral', 'status-epilepticus', 'hipertensao-intracraniana'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['anestesico', 'barbiturico', 'neuroprotecao', 'status-epilepticus']
  },
  {
    id: 'midazolam',
    nomeGenerico: 'Midazolam',
    nomesComerciais: ['Dormonid', 'Dormire'],
    atcCode: 'N05CD08',
    classeTerapeutica: 'sedativo',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '5mg/mL', disponivelSUS: true },
      { forma: 'solução injetável', concentracao: '1mg/mL', disponivelSUS: true },
      { forma: 'solução oral', concentracao: '2mg/mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Sedação pré-operatória',
      'Sedação em UTI',
      'Sedação para procedimentos',
      'Status epilepticus',
      'Amnésia anterógrada'
    ],
    mecanismoAcao: 'Benzodiazepínico hidrossolúvel que potencializa GABA-A. Ação ultra-curta.',
    posologias: [
      {
        indicacao: 'Sedação procedural',
        dose: '0.02-0.1 mg/kg',
        via: 'IV',
        frequencia: 'titulada',
        duracao: 'Durante procedimento'
      },
      {
        indicacao: 'Sedação UTI',
        dose: '0.02-0.1 mg/kg/h',
        via: 'IV contínuo',
        frequencia: 'contínua',
        duracao: 'Conforme necessidade'
      }
    ],
    contraindicacoes: [
      'Miastenia gravis',
      'Glaucoma de ângulo fechado',
      'Insuficiência respiratória grave'
    ],
    efeitosAdversos: {
      comuns: ['Sedação', 'Hipotensão', 'Amnésia', 'Depressão respiratória'],
      graves: ['Apneia', 'Reação paradoxal', 'Dependência (uso prolongado)']
    },
    interacoes: [
      { farmaco: 'Opioides', tipo: 'potencializacao', descricao: 'Depressão respiratória grave' },
      { farmaco: 'Inibidores CYP3A4', tipo: 'aumenta_nivel', descricao: 'Aumenta níveis de midazolam' }
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Dose única segura, evitar doses repetidas' },
    doencasRelacionadas: ['sedacao', 'status-epilepticus', 'ansiedade-procedural'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['sedativo', 'benzodiazepínico', 'ansiolítico', 'amnésico']
  },
  {
    id: 'dexmedetomidina',
    nomeGenerico: 'Dexmedetomidina',
    nomesComerciais: ['Precedex'],
    atcCode: 'N05CM18',
    classeTerapeutica: 'sedativo',
    subclasse: 'alfa2-agonista',
    rename: false,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '100mcg/mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Sedação em UTI (sem depressão respiratória)',
      'Sedação para intubação acordada',
      'Adjuvante anestésico',
      'Prevenção de delirium em UTI'
    ],
    mecanismoAcao: 'Agonista alfa-2 adrenérgico seletivo. Sedação sem depressão respiratória significativa.',
    posologias: [
      {
        indicacao: 'Sedação UTI',
        dose: '0.2-0.7 mcg/kg/h',
        via: 'IV contínuo',
        frequencia: 'contínua',
        duracao: 'Até 24h'
      },
      {
        indicacao: 'Sedação procedural',
        dose: 'Ataque 1 mcg/kg em 10min, manutenção 0.2-1 mcg/kg/h',
        via: 'IV',
        frequencia: 'contínua',
        duracao: 'Durante procedimento'
      }
    ],
    contraindicacoes: [
      'Bloqueio AV de 2º ou 3º grau',
      'Bradicardia grave',
      'Hipotensão não corrigida'
    ],
    efeitosAdversos: {
      comuns: ['Bradicardia', 'Hipotensão', 'Boca seca'],
      graves: ['Parada sinusal', 'Hipertensão transitória (dose de ataque)']
    },
    interacoes: [
      { farmaco: 'Betabloqueadores', tipo: 'potencializacao', descricao: 'Bradicardia aditiva' },
      { farmaco: 'Digoxina', tipo: 'potencializacao', descricao: 'Risco de bradicardia' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['sedacao-uti', 'delirium'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['sedativo', 'alfa2-agonista', 'uti', 'sem-depressao-respiratoria']
  },
  {
    id: 'remifentanil',
    nomeGenerico: 'Remifentanil',
    nomesComerciais: ['Ultiva'],
    atcCode: 'N01AH06',
    classeTerapeutica: 'opioide',
    subclasse: 'anestésico',
    rename: false,
    apresentacoes: [
      { forma: 'pó para solução injetável', concentracao: '1mg', disponivelSUS: false },
      { forma: 'pó para solução injetável', concentracao: '2mg', disponivelSUS: false }
    ],
    indicacoes: [
      'Analgesia intraoperatória',
      'Anestesia total intravenosa (TIVA)',
      'Sedação para procedimentos curtos'
    ],
    mecanismoAcao: 'Opioide sintético metabolizado por esterases plasmáticas. Meia-vida contexto-independente de 3-4 min.',
    posologias: [
      {
        indicacao: 'Analgesia intraoperatória',
        dose: '0.1-0.5 mcg/kg/min',
        via: 'IV contínuo',
        frequencia: 'contínua',
        duracao: 'Durante procedimento'
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade a opioides',
      'Uso como anestésico único (rigidez torácica)'
    ],
    efeitosAdversos: {
      comuns: ['Rigidez muscular', 'Bradicardia', 'Hipotensão', 'Náusea'],
      graves: ['Depressão respiratória', 'Rigidez torácica', 'Hiperalgesia pós-operatória']
    },
    interacoes: [
      { farmaco: 'Benzodiazepínicos', tipo: 'potencializacao', descricao: 'Depressão respiratória sinérgica' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Metabolização rápida' },
    doencasRelacionadas: ['anestesia-geral', 'analgesia-intraoperatoria'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['opioide', 'anestesico', 'tiva', 'meia-vida-ultracurta']
  },
  {
    id: 'fentanil',
    nomeGenerico: 'Fentanil',
    nomesComerciais: ['Fentanest', 'Durogesic'],
    atcCode: 'N01AH01',
    classeTerapeutica: 'opioide',
    subclasse: 'anestésico',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '50mcg/mL', disponivelSUS: true },
      { forma: 'adesivo transdérmico', concentracao: '25mcg/h', disponivelSUS: false },
      { forma: 'adesivo transdérmico', concentracao: '50mcg/h', disponivelSUS: false }
    ],
    indicacoes: [
      'Analgesia intraoperatória',
      'Dor oncológica crônica',
      'Sedação em UTI',
      'Analgesia pós-operatória'
    ],
    mecanismoAcao: 'Agonista opioide mu potente. 100x mais potente que morfina.',
    posologias: [
      {
        indicacao: 'Analgesia intraoperatória',
        dose: '1-2 mcg/kg',
        via: 'IV',
        frequencia: 'bolus intermitente',
        duracao: 'Durante procedimento'
      },
      {
        indicacao: 'Dor crônica',
        dose: '25-100 mcg/h',
        via: 'transdérmica',
        frequencia: 'troca a cada 72h',
        duracao: 'Contínuo'
      }
    ],
    contraindicacoes: [
      'Depressão respiratória',
      'Íleo paralítico',
      'Adesivo em pele lesada'
    ],
    efeitosAdversos: {
      comuns: ['Náusea', 'Prurido', 'Constipação', 'Sedação'],
      graves: ['Depressão respiratória', 'Rigidez muscular', 'Bradicardia']
    },
    interacoes: [
      { farmaco: 'IMAO', tipo: 'contraindicacao', descricao: 'Síndrome serotoninérgica' },
      { farmaco: 'Benzodiazepínicos', tipo: 'potencializacao', descricao: 'Risco de depressão respiratória fatal' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Doses baixas seguras' },
    doencasRelacionadas: ['dor-oncologica', 'analgesia-pos-operatoria'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['opioide', 'anestesico', 'analgesia', 'transdermico']
  },

  // ============================================
  // ANESTÉSICOS LOCAIS (8)
  // ============================================
  {
    id: 'lidocaina',
    nomeGenerico: 'Lidocaína',
    nomesComerciais: ['Xylocaína', 'Lidostesin'],
    atcCode: 'N01BB02',
    classeTerapeutica: 'anestesico-local',
    subclasse: 'amida',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '1%', disponivelSUS: true },
      { forma: 'solução injetável', concentracao: '2%', disponivelSUS: true },
      { forma: 'solução injetável', concentracao: '2% com epinefrina', disponivelSUS: true },
      { forma: 'gel', concentracao: '2%', disponivelSUS: true },
      { forma: 'spray', concentracao: '10%', disponivelSUS: true }
    ],
    indicacoes: [
      'Anestesia local infiltrativa',
      'Bloqueio de nervos periféricos',
      'Anestesia raquidiana/peridural',
      'Arritmias ventriculares',
      'Anestesia tópica'
    ],
    mecanismoAcao: 'Bloqueia canais de sódio voltagem-dependentes, impedindo despolarização neuronal.',
    posologias: [
      {
        indicacao: 'Infiltração local',
        dose: 'Até 4.5 mg/kg (sem epi) ou 7 mg/kg (com epi)',
        via: 'SC/intradérmica',
        frequencia: 'dose única',
        duracao: 'Duração 1-2h'
      }
    ],
    contraindicacoes: [
      'Bloqueio cardíaco',
      'Alergia a anestésicos amida',
      'Porfiria'
    ],
    efeitosAdversos: {
      comuns: ['Parestesia', 'Tontura', 'Zumbido'],
      graves: ['Toxicidade sistêmica (convulsões)', 'Colapso cardiovascular', 'Metahemoglobinemia']
    },
    interacoes: [
      { farmaco: 'Betabloqueadores', tipo: 'aumenta_nivel', descricao: 'Reduz metabolismo hepático da lidocaína' },
      { farmaco: 'Cimetidina', tipo: 'aumenta_nivel', descricao: 'Inibe CYP reduzindo clearance' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Segura' },
    doencasRelacionadas: ['anestesia-local', 'arritmia-ventricular'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['anestesico-local', 'amida', 'antiarritmico']
  },
  {
    id: 'bupivacaina',
    nomeGenerico: 'Bupivacaína',
    nomesComerciais: ['Marcaína', 'Neocaína'],
    atcCode: 'N01BB01',
    classeTerapeutica: 'anestesico-local',
    subclasse: 'amida',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '0.25%', disponivelSUS: true },
      { forma: 'solução injetável', concentracao: '0.5%', disponivelSUS: true },
      { forma: 'solução injetável hiperbárica', concentracao: '0.5%', disponivelSUS: true }
    ],
    indicacoes: [
      'Anestesia raquidiana',
      'Anestesia peridural',
      'Bloqueio de nervos periféricos',
      'Analgesia pós-operatória contínua'
    ],
    mecanismoAcao: 'Anestésico local de longa duração. Bloqueia canais de sódio. Maior cardiotoxicidade que lidocaína.',
    posologias: [
      {
        indicacao: 'Raquidiana',
        dose: '10-15 mg (hiperbárica 0.5%)',
        via: 'intratecal',
        frequencia: 'dose única',
        duracao: 'Duração 2-3h'
      },
      {
        indicacao: 'Peridural',
        dose: '50-100 mg',
        via: 'peridural',
        frequencia: 'dose única ou contínua',
        duracao: 'Duração 3-6h'
      }
    ],
    contraindicacoes: [
      'Bloqueio IV (Bier)',
      'Hipersensibilidade',
      'Infecção no local de punção'
    ],
    efeitosAdversos: {
      comuns: ['Hipotensão', 'Bradicardia', 'Náusea'],
      graves: ['Cardiotoxicidade grave', 'Convulsões', 'Parada cardíaca refratária']
    },
    interacoes: [
      { farmaco: 'Amiodarona', tipo: 'potencializacao', descricao: 'Aumento da cardiotoxicidade' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Baixa excreção no leite' },
    doencasRelacionadas: ['anestesia-regional', 'analgesia-pos-operatoria'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['anestesico-local', 'amida', 'longa-duracao', 'raquidiana']
  },
  {
    id: 'ropivacaina',
    nomeGenerico: 'Ropivacaína',
    nomesComerciais: ['Naropin'],
    atcCode: 'N01BB09',
    classeTerapeutica: 'anestesico-local',
    subclasse: 'amida',
    rename: false,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '2mg/mL', disponivelSUS: false },
      { forma: 'solução injetável', concentracao: '7.5mg/mL', disponivelSUS: false },
      { forma: 'solução injetável', concentracao: '10mg/mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Anestesia peridural',
      'Bloqueio de nervos periféricos',
      'Analgesia peridural pós-operatória',
      'Anestesia de plexo braquial'
    ],
    mecanismoAcao: 'Enantiômero S da bupivacaína com menor cardiotoxicidade. Bloqueio diferencial motor/sensitivo.',
    posologias: [
      {
        indicacao: 'Peridural cirúrgica',
        dose: '75-150 mg (0.75%)',
        via: 'peridural',
        frequencia: 'dose única',
        duracao: 'Duração 3-5h'
      }
    ],
    contraindicacoes: [
      'Bloqueio IV',
      'Hipersensibilidade a amidas'
    ],
    efeitosAdversos: {
      comuns: ['Hipotensão', 'Bradicardia', 'Náusea'],
      graves: ['Toxicidade sistêmica', 'Convulsões']
    },
    interacoes: [
      { farmaco: 'Fluvoxamina', tipo: 'aumenta_nivel', descricao: 'Inibe CYP1A2' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excreção mínima' },
    doencasRelacionadas: ['anestesia-regional', 'analgesia-obstetrica'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['anestesico-local', 'amida', 'menor-cardiotoxicidade']
  },
  {
    id: 'levobupivacaina',
    nomeGenerico: 'Levobupivacaína',
    nomesComerciais: ['Novabupi'],
    atcCode: 'N01BB10',
    classeTerapeutica: 'anestesico-local',
    subclasse: 'amida',
    rename: false,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '0.25%', disponivelSUS: false },
      { forma: 'solução injetável', concentracao: '0.5%', disponivelSUS: false },
      { forma: 'solução injetável', concentracao: '0.75%', disponivelSUS: false }
    ],
    indicacoes: [
      'Anestesia peridural',
      'Anestesia raquidiana',
      'Bloqueios de nervos periféricos',
      'Infiltração local'
    ],
    mecanismoAcao: 'Enantiômero S puro da bupivacaína. Menor toxicidade cardíaca e neurológica.',
    posologias: [
      {
        indicacao: 'Peridural',
        dose: '50-150 mg',
        via: 'peridural',
        frequencia: 'dose única',
        duracao: 'Duração 3-6h'
      }
    ],
    contraindicacoes: [
      'Bloqueio IV (Bier)',
      'Alergia a anestésicos amida'
    ],
    efeitosAdversos: {
      comuns: ['Hipotensão', 'Náusea', 'Bradicardia'],
      graves: ['Toxicidade sistêmica', 'Convulsões']
    },
    interacoes: [
      { farmaco: 'Inibidores CYP3A4', tipo: 'aumenta_nivel', descricao: 'Reduz metabolismo' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Segura' },
    doencasRelacionadas: ['anestesia-regional'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['anestesico-local', 'amida', 'enantiomero-s']
  },
  {
    id: 'prilocaina',
    nomeGenerico: 'Prilocaína',
    nomesComerciais: ['Citanest', 'EMLA (associação)'],
    atcCode: 'N01BB04',
    classeTerapeutica: 'anestesico-local',
    subclasse: 'amida',
    rename: false,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '3%', disponivelSUS: false },
      { forma: 'creme tópico (com lidocaína)', concentracao: '2.5%', disponivelSUS: false }
    ],
    indicacoes: [
      'Anestesia local odontológica',
      'Bloqueio IV regional (Bier)',
      'Anestesia tópica (EMLA)'
    ],
    mecanismoAcao: 'Anestésico local amida com menor toxicidade cardiovascular. Risco de metahemoglobinemia.',
    posologias: [
      {
        indicacao: 'Bloqueio IV regional',
        dose: 'Até 6 mg/kg',
        via: 'IV regional',
        frequencia: 'dose única',
        duracao: 'Durante procedimento'
      }
    ],
    contraindicacoes: [
      'Metahemoglobinemia',
      'Deficiência de G6PD',
      'Anemia grave'
    ],
    efeitosAdversos: {
      comuns: ['Parestesia', 'Tontura'],
      graves: ['Metahemoglobinemia', 'Toxicidade sistêmica']
    },
    interacoes: [
      { farmaco: 'Sulfonamidas', tipo: 'potencializacao', descricao: 'Aumenta risco de metahemoglobinemia' },
      { farmaco: 'Dapsona', tipo: 'potencializacao', descricao: 'Metahemoglobinemia aditiva' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Doses terapêuticas seguras' },
    doencasRelacionadas: ['anestesia-local'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['anestesico-local', 'amida', 'bloqueio-bier', 'metahemoglobinemia']
  },
  {
    id: 'mepivacaina',
    nomeGenerico: 'Mepivacaína',
    nomesComerciais: ['Scandicaine', 'Mepiadre'],
    atcCode: 'N01BB03',
    classeTerapeutica: 'anestesico-local',
    subclasse: 'amida',
    rename: false,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '2%', disponivelSUS: false },
      { forma: 'solução injetável', concentracao: '3%', disponivelSUS: false }
    ],
    indicacoes: [
      'Anestesia local odontológica',
      'Bloqueio de nervos periféricos',
      'Infiltração local'
    ],
    mecanismoAcao: 'Anestésico local amida de duração intermediária. Não requer vasoconstritor.',
    posologias: [
      {
        indicacao: 'Anestesia odontológica',
        dose: 'Até 6.6 mg/kg',
        via: 'infiltrativa/bloqueio',
        frequencia: 'dose única',
        duracao: 'Duração 2-3h'
      }
    ],
    contraindicacoes: [
      'Alergia a amidas',
      'Metemoglobinemia'
    ],
    efeitosAdversos: {
      comuns: ['Parestesia transitória', 'Tontura'],
      graves: ['Toxicidade sistêmica', 'Reações alérgicas']
    },
    interacoes: [
      { farmaco: 'Antiarrítmicos', tipo: 'potencializacao', descricao: 'Efeitos cardíacos aditivos' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Segura' },
    doencasRelacionadas: ['anestesia-odontologica'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['anestesico-local', 'amida', 'odontologia']
  },
  {
    id: 'articaina',
    nomeGenerico: 'Articaína',
    nomesComerciais: ['Articaine', 'Septanest'],
    atcCode: 'N01BB58',
    classeTerapeutica: 'anestesico-local',
    subclasse: 'amida',
    rename: false,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '4% com epinefrina 1:100.000', disponivelSUS: false },
      { forma: 'solução injetável', concentracao: '4% com epinefrina 1:200.000', disponivelSUS: false }
    ],
    indicacoes: [
      'Anestesia odontológica',
      'Infiltração mandibular (sem bloqueio)',
      'Procedimentos odontológicos em tecidos duros'
    ],
    mecanismoAcao: 'Único anestésico local com anel tiofeno. Excelente difusão óssea. Metabolizado por esterases plasmáticas.',
    posologias: [
      {
        indicacao: 'Anestesia odontológica',
        dose: 'Até 7 mg/kg',
        via: 'infiltrativa',
        frequencia: 'dose única',
        duracao: 'Duração 1-2h'
      }
    ],
    contraindicacoes: [
      'Alergia a anestésicos amida',
      'Metahemoglobinemia',
      'Deficiência de colinesterase'
    ],
    efeitosAdversos: {
      comuns: ['Parestesia lingual/labial', 'Dor no local'],
      graves: ['Parestesia prolongada', 'Toxicidade sistêmica']
    },
    interacoes: [
      { farmaco: 'Anticolinesterásicos', tipo: 'potencializacao', descricao: 'Prolonga efeito' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Metabolização rápida' },
    doencasRelacionadas: ['anestesia-odontologica'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['anestesico-local', 'amida', 'odontologia', 'difusao-ossea']
  },
  {
    id: 'tetracaina',
    nomeGenerico: 'Tetracaína',
    nomesComerciais: ['Pontocaine'],
    atcCode: 'N01BA03',
    classeTerapeutica: 'anestesico-local',
    subclasse: 'ester',
    rename: true,
    apresentacoes: [
      { forma: 'solução oftálmica', concentracao: '0.5%', disponivelSUS: true },
      { forma: 'solução injetável hiperbárica', concentracao: '1%', disponivelSUS: false }
    ],
    indicacoes: [
      'Anestesia tópica oftálmica',
      'Anestesia raquidiana (uso histórico)',
      'Tonometria'
    ],
    mecanismoAcao: 'Anestésico local éster de alta potência. Metabolizado por pseudocolinesterase.',
    posologias: [
      {
        indicacao: 'Anestesia oftálmica',
        dose: '1-2 gotas',
        via: 'tópica oftálmica',
        frequencia: 'dose única ou repetida',
        duracao: 'Duração 15-20 min'
      }
    ],
    contraindicacoes: [
      'Alergia a ésteres (PABA)',
      'Deficiência de pseudocolinesterase'
    ],
    efeitosAdversos: {
      comuns: ['Ardência transitória', 'Hiperemia conjuntival'],
      graves: ['Lesão corneana (uso repetido)', 'Reação alérgica']
    },
    interacoes: [
      { farmaco: 'Sulfonamidas', tipo: 'reducao_efeito', descricao: 'PABA antagoniza sulfonamidas' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso tópico seguro' },
    doencasRelacionadas: ['anestesia-oftalmologica'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['anestesico-local', 'ester', 'oftalmico', 'topico']
  },

  // ============================================
  // BLOQUEADORES NEUROMUSCULARES (8)
  // ============================================
  {
    id: 'succinilcolina',
    nomeGenerico: 'Succinilcolina',
    nomesComerciais: ['Quelicin', 'Anectine'],
    atcCode: 'M03AB01',
    classeTerapeutica: 'bloqueador-neuromuscular',
    subclasse: 'despolarizante',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '100mg/2mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Intubação de sequência rápida',
      'Eletroconvulsoterapia',
      'Laringoespasmo refratário'
    ],
    mecanismoAcao: 'Agonista nicotínico que causa despolarização sustentada da placa motora. Início ultra-rápido (30-60s).',
    posologias: [
      {
        indicacao: 'ISR',
        dose: '1-1.5 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Efeito 5-10 min'
      }
    ],
    contraindicacoes: [
      'Hipertermia maligna',
      'Hipercalemia',
      'Queimaduras > 24h',
      'Lesão medular > 24h',
      'Miopatias',
      'Deficiência de pseudocolinesterase'
    ],
    efeitosAdversos: {
      comuns: ['Fasciculações', 'Mialgia', 'Bradicardia'],
      graves: ['Hipercalemia fatal', 'Hipertermia maligna', 'Bloqueio fase II', 'Parada cardíaca']
    },
    interacoes: [
      { farmaco: 'Anticolinesterásicos', tipo: 'potencializacao', descricao: 'Prolonga bloqueio' },
      { farmaco: 'Aminoglicosídeos', tipo: 'potencializacao', descricao: 'Potencializa bloqueio' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Não absorvida VO' },
    doencasRelacionadas: ['intubacao-sequencia-rapida'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['bnm', 'despolarizante', 'isr', 'inicio-rapido']
  },
  {
    id: 'rocuronio',
    nomeGenerico: 'Rocurônio',
    nomesComerciais: ['Esmeron', 'Rocuron'],
    atcCode: 'M03AC09',
    classeTerapeutica: 'bloqueador-neuromuscular',
    subclasse: 'nao-despolarizante',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '10mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Facilitação de intubação traqueal',
      'Relaxamento muscular intraoperatório',
      'Intubação de sequência rápida (dose alta)'
    ],
    mecanismoAcao: 'Antagonista competitivo de receptores nicotínicos na placa motora. Início rápido entre não-despolarizantes.',
    posologias: [
      {
        indicacao: 'Intubação',
        dose: '0.6 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Duração 30-40 min'
      },
      {
        indicacao: 'ISR',
        dose: '1.2 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Início 60s'
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade'
    ],
    efeitosAdversos: {
      comuns: ['Taquicardia leve', 'Dor no local'],
      graves: ['Anafilaxia', 'Bloqueio prolongado (insuficiência hepática)']
    },
    interacoes: [
      { farmaco: 'Aminoglicosídeos', tipo: 'potencializacao', descricao: 'Potencializa e prolonga bloqueio' },
      { farmaco: 'Anestésicos inalatórios', tipo: 'potencializacao', descricao: 'Potencializa bloqueio' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Não absorvido VO' },
    doencasRelacionadas: ['anestesia-geral'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['bnm', 'nao-despolarizante', 'aminoesteroide', 'isr']
  },
  {
    id: 'vecuronio',
    nomeGenerico: 'Vecurônio',
    nomesComerciais: ['Norcuron'],
    atcCode: 'M03AC03',
    classeTerapeutica: 'bloqueador-neuromuscular',
    subclasse: 'nao-despolarizante',
    rename: true,
    apresentacoes: [
      { forma: 'pó para solução injetável', concentracao: '4mg', disponivelSUS: true },
      { forma: 'pó para solução injetável', concentracao: '10mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Facilitação de intubação',
      'Relaxamento muscular intraoperatório',
      'Paralisia em ventilação mecânica'
    ],
    mecanismoAcao: 'Antagonista competitivo nicotínico. Aminoesteroide sem efeitos cardiovasculares.',
    posologias: [
      {
        indicacao: 'Intubação',
        dose: '0.08-0.1 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Duração 25-40 min'
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade'
    ],
    efeitosAdversos: {
      comuns: ['Bloqueio residual'],
      graves: ['Miopatia do paciente crítico (uso prolongado)', 'Anafilaxia']
    },
    interacoes: [
      { farmaco: 'Aminoglicosídeos', tipo: 'potencializacao', descricao: 'Prolonga bloqueio' },
      { farmaco: 'Magnésio', tipo: 'potencializacao', descricao: 'Potencializa efeito' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Não absorvido VO' },
    doencasRelacionadas: ['anestesia-geral'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['bnm', 'nao-despolarizante', 'aminoesteroide']
  },
  {
    id: 'atracurio',
    nomeGenerico: 'Atracúrio',
    nomesComerciais: ['Tracrium'],
    atcCode: 'M03AC04',
    classeTerapeutica: 'bloqueador-neuromuscular',
    subclasse: 'nao-despolarizante',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '10mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Facilitação de intubação',
      'Relaxamento muscular intraoperatório',
      'Pacientes com insuficiência renal/hepática'
    ],
    mecanismoAcao: 'Benzilisoquinolínico metabolizado por degradação de Hofmann (não requer fígado/rim).',
    posologias: [
      {
        indicacao: 'Intubação',
        dose: '0.4-0.5 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Duração 25-35 min'
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade'
    ],
    efeitosAdversos: {
      comuns: ['Liberação de histamina', 'Flushing', 'Broncoespasmo leve'],
      graves: ['Anafilaxia', 'Convulsões (metabólito laudanosina)']
    },
    interacoes: [
      { farmaco: 'Aminoglicosídeos', tipo: 'potencializacao', descricao: 'Prolonga bloqueio' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Quaternário, não absorvido' },
    doencasRelacionadas: ['anestesia-geral', 'insuficiencia-renal'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['bnm', 'nao-despolarizante', 'benzilisoquinolínico', 'hofmann']
  },
  {
    id: 'cisatracurio',
    nomeGenerico: 'Cisatracúrio',
    nomesComerciais: ['Nimbex'],
    atcCode: 'M03AC11',
    classeTerapeutica: 'bloqueador-neuromuscular',
    subclasse: 'nao-despolarizante',
    rename: false,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '2mg/mL', disponivelSUS: false },
      { forma: 'solução injetável', concentracao: '5mg/mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Facilitação de intubação',
      'Relaxamento intraoperatório',
      'Sedação prolongada em UTI'
    ],
    mecanismoAcao: 'Isômero cis-cis do atracúrio. 3-4x mais potente, sem liberação de histamina. Degradação de Hofmann.',
    posologias: [
      {
        indicacao: 'Intubação',
        dose: '0.15-0.2 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Duração 40-60 min'
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade'
    ],
    efeitosAdversos: {
      comuns: ['Bradicardia leve'],
      graves: ['Anafilaxia (rara)']
    },
    interacoes: [
      { farmaco: 'Aminoglicosídeos', tipo: 'potencializacao', descricao: 'Prolonga bloqueio' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Quaternário' },
    doencasRelacionadas: ['anestesia-geral', 'sedacao-uti'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['bnm', 'nao-despolarizante', 'benzilisoquinolínico', 'sem-histamina']
  },
  {
    id: 'pancuronio',
    nomeGenerico: 'Pancurônio',
    nomesComerciais: ['Pavulon'],
    atcCode: 'M03AC01',
    classeTerapeutica: 'bloqueador-neuromuscular',
    subclasse: 'nao-despolarizante',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '2mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Relaxamento muscular em cirurgias longas',
      'Paralisia em ventilação mecânica prolongada'
    ],
    mecanismoAcao: 'Aminoesteroide de longa duração com efeito vagolítico (taquicardia).',
    posologias: [
      {
        indicacao: 'Intubação/relaxamento',
        dose: '0.06-0.1 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Duração 60-90 min'
      }
    ],
    contraindicacoes: [
      'Taquicardia (efeito vagolítico)',
      'Insuficiência renal (excreção renal)'
    ],
    efeitosAdversos: {
      comuns: ['Taquicardia', 'Hipertensão leve'],
      graves: ['Bloqueio prolongado', 'Miopatia']
    },
    interacoes: [
      { farmaco: 'Aminoglicosídeos', tipo: 'potencializacao', descricao: 'Prolonga bloqueio' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Quaternário' },
    doencasRelacionadas: ['anestesia-geral'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['bnm', 'nao-despolarizante', 'aminoesteroide', 'longa-duracao']
  },
  {
    id: 'mivacurio',
    nomeGenerico: 'Mivacúrio',
    nomesComerciais: ['Mivacron'],
    atcCode: 'M03AC10',
    classeTerapeutica: 'bloqueador-neuromuscular',
    subclasse: 'nao-despolarizante',
    rename: false,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '2mg/mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Procedimentos cirúrgicos curtos',
      'Facilitação de intubação em procedimentos ambulatoriais'
    ],
    mecanismoAcao: 'Benzilisoquinolínico de curta duração. Metabolizado por pseudocolinesterase.',
    posologias: [
      {
        indicacao: 'Intubação',
        dose: '0.15-0.25 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Duração 15-20 min'
      }
    ],
    contraindicacoes: [
      'Deficiência de pseudocolinesterase',
      'Insuficiência renal grave'
    ],
    efeitosAdversos: {
      comuns: ['Flushing', 'Liberação de histamina'],
      graves: ['Bloqueio prolongado', 'Broncoespasmo']
    },
    interacoes: [
      { farmaco: 'Anticolinesterásicos', tipo: 'potencializacao', descricao: 'Prolonga duração' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Quaternário' },
    doencasRelacionadas: ['anestesia-ambulatorial'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['bnm', 'nao-despolarizante', 'curta-duracao']
  },
  {
    id: 'tubocurarina',
    nomeGenerico: 'Tubocurarina',
    nomesComerciais: ['Curare'],
    atcCode: 'M03AA02',
    classeTerapeutica: 'bloqueador-neuromuscular',
    subclasse: 'nao-despolarizante',
    rename: false,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '3mg/mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Uso histórico em anestesia (substituído por agentes mais seguros)'
    ],
    mecanismoAcao: 'Alcaloide natural (curare). Primeiro BNM não-despolarizante. Significativa liberação de histamina.',
    posologias: [
      {
        indicacao: 'Histórico',
        dose: '0.4-0.5 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Duração 60-90 min'
      }
    ],
    contraindicacoes: [
      'Asma',
      'Doença cardíaca',
      'Hipersensibilidade'
    ],
    efeitosAdversos: {
      comuns: ['Hipotensão', 'Broncoespasmo', 'Flushing'],
      graves: ['Colapso cardiovascular', 'Anafilaxia']
    },
    interacoes: [
      { farmaco: 'Aminoglicosídeos', tipo: 'potencializacao', descricao: 'Prolonga bloqueio' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso histórico' },
    doencasRelacionadas: ['anestesia-geral'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['bnm', 'nao-despolarizante', 'historico', 'curare']
  },

  // ============================================
  // AGENTES DE REVERSÃO (5)
  // ============================================
  {
    id: 'neostigmina',
    nomeGenerico: 'Neostigmina',
    nomesComerciais: ['Prostigmin'],
    atcCode: 'N07AA01',
    classeTerapeutica: 'anticolinesterasico',
    subclasse: 'reversao-bnm',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '0.5mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Reversão de bloqueio neuromuscular não-despolarizante',
      'Miastenia gravis',
      'Íleo pós-operatório',
      'Retenção urinária'
    ],
    mecanismoAcao: 'Inibidor reversível da acetilcolinesterase. Aumenta acetilcolina na junção neuromuscular.',
    posologias: [
      {
        indicacao: 'Reversão de BNM',
        dose: '0.04-0.07 mg/kg (máx 5 mg)',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Com atropina ou glicopirrolato'
      }
    ],
    contraindicacoes: [
      'Obstrução mecânica intestinal/urinária',
      'Peritonite'
    ],
    efeitosAdversos: {
      comuns: ['Bradicardia', 'Sialorreia', 'Náusea', 'Cólicas abdominais'],
      graves: ['Broncoespasmo', 'Colapso colinérgico']
    },
    interacoes: [
      { farmaco: 'Aminoglicosídeos', tipo: 'reducao_efeito', descricao: 'Antagonizam efeito na junção' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Quaternário, não absorvido' },
    doencasRelacionadas: ['reversao-bloqueio-neuromuscular', 'miastenia-gravis'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['anticolinesterasico', 'reversao', 'bnm']
  },
  {
    id: 'sugammadex',
    nomeGenerico: 'Sugammadex',
    nomesComerciais: ['Bridion'],
    atcCode: 'V03AB35',
    classeTerapeutica: 'antidoto',
    subclasse: 'reversao-bnm',
    rename: false,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '100mg/mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Reversão de bloqueio neuromuscular por rocurônio',
      'Reversão de bloqueio por vecurônio',
      'Reversão de emergência de bloqueio profundo'
    ],
    mecanismoAcao: 'Ciclodextrina modificada que encapsula rocurônio/vecurônio, inativando-os. Não depende de receptores.',
    posologias: [
      {
        indicacao: 'Reversão bloqueio moderado',
        dose: '2 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Reversão em 2-3 min'
      },
      {
        indicacao: 'Reversão bloqueio profundo',
        dose: '4 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Reversão em 3-5 min'
      },
      {
        indicacao: 'Reversão imediata',
        dose: '16 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Reversão em 1.5 min'
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade',
      'Insuficiência renal grave (ClCr < 30)'
    ],
    efeitosAdversos: {
      comuns: ['Disgeusia', 'Náusea'],
      graves: ['Anafilaxia', 'Bradicardia acentuada', 'Recurarização (dose insuficiente)']
    },
    interacoes: [
      { farmaco: 'Toremifeno', tipo: 'reducao_efeito', descricao: 'Pode deslocar rocurônio do sugammadex' },
      { farmaco: 'Contraceptivos orais', tipo: 'reducao_efeito', descricao: 'Pode reduzir eficácia por 7 dias' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Sem dados, provavelmente seguro' },
    doencasRelacionadas: ['reversao-bloqueio-neuromuscular'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['antidoto', 'reversao', 'ciclodextrina', 'rocuronio']
  },
  {
    id: 'flumazenil',
    nomeGenerico: 'Flumazenil',
    nomesComerciais: ['Lanexat'],
    atcCode: 'V03AB25',
    classeTerapeutica: 'antidoto',
    subclasse: 'antagonista-benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '0.1mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Reversão de sedação por benzodiazepínicos',
      'Intoxicação por benzodiazepínicos',
      'Diagnóstico de coma de origem desconhecida'
    ],
    mecanismoAcao: 'Antagonista competitivo de receptores GABA-A benzodiazepínicos. Reverte sedação sem analgesia.',
    posologias: [
      {
        indicacao: 'Reversão de sedação',
        dose: '0.2 mg IV, repetir 0.1 mg a cada 60s até 1 mg',
        via: 'IV',
        frequencia: 'titulada',
        duracao: 'Efeito dura 45-90 min'
      }
    ],
    contraindicacoes: [
      'Uso crônico de benzodiazepínicos (risco de abstinência)',
      'Convulsões controladas por BZD',
      'Intoxicação mista com pró-convulsivantes'
    ],
    efeitosAdversos: {
      comuns: ['Náusea', 'Tontura', 'Agitação'],
      graves: ['Convulsões', 'Arritmias', 'Síndrome de abstinência']
    },
    interacoes: [
      { farmaco: 'Antidepressivos tricíclicos', tipo: 'potencializacao', descricao: 'Risco de convulsões em intoxicações mistas' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Meia-vida curta' },
    doencasRelacionadas: ['intoxicacao-benzodiazepinicos'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['antidoto', 'antagonista', 'benzodiazepínico', 'reversao']
  },
  {
    id: 'naloxona',
    nomeGenerico: 'Naloxona',
    nomesComerciais: ['Narcan'],
    atcCode: 'V03AB15',
    classeTerapeutica: 'antidoto',
    subclasse: 'antagonista-opioide',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '0.4mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Reversão de depressão respiratória por opioides',
      'Intoxicação por opioides',
      'Diagnóstico de dependência de opioides'
    ],
    mecanismoAcao: 'Antagonista competitivo de receptores opioides mu, kappa e delta. Reverte analgesia e depressão respiratória.',
    posologias: [
      {
        indicacao: 'Depressão respiratória por opioide',
        dose: '0.04-0.4 mg IV, titular',
        via: 'IV/IM/SC',
        frequencia: 'a cada 2-3 min',
        duracao: 'Efeito dura 30-90 min'
      },
      {
        indicacao: 'Overdose',
        dose: '0.4-2 mg IV',
        via: 'IV/IM/intranasal',
        frequencia: 'repetir a cada 2-3 min',
        duracao: 'Máximo 10 mg'
      }
    ],
    contraindicacoes: [
      'Hipersensibilidade'
    ],
    efeitosAdversos: {
      comuns: ['Náusea', 'Vômito', 'Taquicardia', 'Dor (reversão de analgesia)'],
      graves: ['Edema pulmonar', 'Arritmias', 'Abstinência aguda', 'Hipertensão grave']
    },
    interacoes: [
      { farmaco: 'Opioides', tipo: 'antagonismo', descricao: 'Reverte todos os efeitos opioides' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Meia-vida curta' },
    doencasRelacionadas: ['intoxicacao-opioide', 'overdose'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['antidoto', 'antagonista', 'opioide', 'emergencia']
  },
  {
    id: 'fisostigmina',
    nomeGenerico: 'Fisostigmina',
    nomesComerciais: ['Antilirium'],
    atcCode: 'N07AA01',
    classeTerapeutica: 'anticolinesterasico',
    subclasse: 'reversao-anticolinergico',
    rename: false,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '1mg/mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Síndrome anticolinérgica central',
      'Intoxicação por anticolinérgicos',
      'Delirium pós-operatório anticolinérgico'
    ],
    mecanismoAcao: 'Inibidor reversível da acetilcolinesterase que atravessa barreira hematoencefálica. Reverte efeitos centrais.',
    posologias: [
      {
        indicacao: 'Síndrome anticolinérgica',
        dose: '0.5-2 mg IV lento (1 mg/min)',
        via: 'IV',
        frequencia: 'pode repetir após 20 min',
        duracao: 'Efeito dura 30-60 min'
      }
    ],
    contraindicacoes: [
      'Asma',
      'Obstrução GI/urinária',
      'Doença cardíaca',
      'Intoxicação por antidepressivos tricíclicos'
    ],
    efeitosAdversos: {
      comuns: ['Náusea', 'Bradicardia', 'Sialorreia'],
      graves: ['Convulsões', 'Assistolia', 'Broncoespasmo grave']
    },
    interacoes: [
      { farmaco: 'Succinilcolina', tipo: 'potencializacao', descricao: 'Prolonga bloqueio despolarizante' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['intoxicacao-anticolinergica', 'delirium'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['anticolinesterasico', 'reversao', 'atravessa-bhe', 'delirium']
  },

  // ============================================
  // ADJUVANTES ANESTÉSICOS (6)
  // ============================================
  {
    id: 'atropina',
    nomeGenerico: 'Atropina',
    nomesComerciais: ['Atropion'],
    atcCode: 'A03BA01',
    classeTerapeutica: 'anticolinergico',
    subclasse: 'adjuvante-anestesico',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '0.25mg/mL', disponivelSUS: true },
      { forma: 'solução injetável', concentracao: '0.5mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Bradicardia sintomática',
      'Pré-medicação (redução de secreções)',
      'Reversão de BNM (com neostigmina)',
      'Intoxicação por organofosforados'
    ],
    mecanismoAcao: 'Antagonista competitivo muscarínico. Bloqueia efeitos parassimpáticos.',
    posologias: [
      {
        indicacao: 'Bradicardia',
        dose: '0.5-1 mg IV',
        via: 'IV',
        frequencia: 'a cada 3-5 min',
        duracao: 'Máximo 3 mg'
      },
      {
        indicacao: 'Com neostigmina',
        dose: '0.01-0.02 mg/kg',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Junto com neostigmina'
      }
    ],
    contraindicacoes: [
      'Glaucoma de ângulo fechado',
      'Miastenia gravis',
      'Taquicardia'
    ],
    efeitosAdversos: {
      comuns: ['Taquicardia', 'Boca seca', 'Midríase', 'Retenção urinária'],
      graves: ['Hipertermia', 'Psicose anticolinérgica', 'Arritmias']
    },
    interacoes: [
      { farmaco: 'Anticolinesterásicos', tipo: 'antagonismo', descricao: 'Antagoniza efeitos muscarínicos' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Dose única segura' },
    doencasRelacionadas: ['bradicardia', 'intoxicacao-organofosforados'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['anticolinergico', 'adjuvante', 'bradicardia', 'acls']
  },
  {
    id: 'glicopirrolato',
    nomeGenerico: 'Glicopirrolato',
    nomesComerciais: ['Robinul'],
    atcCode: 'A03AB02',
    classeTerapeutica: 'anticolinergico',
    subclasse: 'adjuvante-anestesico',
    rename: false,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '0.2mg/mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Pré-medicação anestésica',
      'Reversão de BNM (com neostigmina)',
      'Redução de secreções'
    ],
    mecanismoAcao: 'Anticolinérgico quaternário que não atravessa barreira hematoencefálica. Menos taquicardia que atropina.',
    posologias: [
      {
        indicacao: 'Com neostigmina',
        dose: '0.2 mg para cada 1 mg de neostigmina',
        via: 'IV',
        frequencia: 'dose única',
        duracao: 'Com reversão de BNM'
      }
    ],
    contraindicacoes: [
      'Glaucoma de ângulo fechado',
      'Obstrução urinária'
    ],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Taquicardia leve'],
      graves: ['Retenção urinária', 'Íleo']
    },
    interacoes: [
      { farmaco: 'Neostigmina', tipo: 'benefica', descricao: 'Previne bradicardia da neostigmina' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Quaternário, absorção mínima' },
    doencasRelacionadas: ['reversao-bnm'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['anticolinergico', 'quaternario', 'sem-efeito-central']
  },
  {
    id: 'ondansetrona',
    nomeGenerico: 'Ondansetrona',
    nomesComerciais: ['Zofran', 'Vonau'],
    atcCode: 'A04AA01',
    classeTerapeutica: 'antiemetico',
    subclasse: 'antagonista-5ht3',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '2mg/mL', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '4mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '8mg', disponivelSUS: true }
    ],
    indicacoes: [
      'Náusea e vômito pós-operatório (NVPO)',
      'Náusea induzida por quimioterapia',
      'Náusea induzida por radioterapia'
    ],
    mecanismoAcao: 'Antagonista seletivo de receptores 5-HT3 no centro do vômito e nervos vagais.',
    posologias: [
      {
        indicacao: 'NVPO profilaxia',
        dose: '4 mg IV',
        via: 'IV',
        frequencia: 'ao final da cirurgia',
        duracao: 'Dose única'
      },
      {
        indicacao: 'Quimioterapia',
        dose: '8-16 mg',
        via: 'IV/VO',
        frequencia: '2-3x/dia',
        duracao: '1-5 dias'
      }
    ],
    contraindicacoes: [
      'Síndrome do QT longo congênito',
      'Uso de apomorfina'
    ],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Constipação', 'Tontura'],
      graves: ['Prolongamento QT', 'Síndrome serotoninérgica', 'Arritmias']
    },
    interacoes: [
      { farmaco: 'Apomorfina', tipo: 'contraindicacao', descricao: 'Hipotensão grave' },
      { farmaco: 'Medicamentos que prolongam QT', tipo: 'potencializacao', descricao: 'Risco de torsades de pointes' }
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Excreção mínima' },
    doencasRelacionadas: ['nvpo', 'nausea-quimioterapia'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['antiemetico', '5-ht3', 'nvpo', 'quimioterapia']
  },
  {
    id: 'droperidol',
    nomeGenerico: 'Droperidol',
    nomesComerciais: ['Inapsine'],
    atcCode: 'N05AD08',
    classeTerapeutica: 'antiemetico',
    subclasse: 'butirofenona',
    rename: false,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '2.5mg/mL', disponivelSUS: false }
    ],
    indicacoes: [
      'Profilaxia e tratamento de NVPO',
      'Neuroleptanalgesia (associado a fentanil)',
      'Agitação em emergência'
    ],
    mecanismoAcao: 'Antagonista dopaminérgico D2. Antiemético potente com efeito sedativo.',
    posologias: [
      {
        indicacao: 'NVPO',
        dose: '0.625-1.25 mg IV',
        via: 'IV',
        frequencia: 'ao final da cirurgia',
        duracao: 'Dose única'
      }
    ],
    contraindicacoes: [
      'QT longo',
      'Doença de Parkinson',
      'Feocromocitoma'
    ],
    efeitosAdversos: {
      comuns: ['Sedação', 'Acatisia', 'Hipotensão'],
      graves: ['Prolongamento QT', 'Torsades de pointes', 'Síndrome neuroléptica maligna']
    },
    interacoes: [
      { farmaco: 'Medicamentos que prolongam QT', tipo: 'contraindicacao', descricao: 'Risco de torsades' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados insuficientes' },
    doencasRelacionadas: ['nvpo'],
    citations: [{ refId: 'miller-anesthesia-2020' }],
    lastUpdate: '2025-01',
    tags: ['antiemetico', 'butirofenona', 'd2', 'black-box-qt']
  },
  {
    id: 'efedrina',
    nomeGenerico: 'Efedrina',
    nomesComerciais: ['Efedrin'],
    atcCode: 'C01CA26',
    classeTerapeutica: 'vasopressor',
    subclasse: 'simpatomimetico-indireto',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '50mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipotensão induzida por anestesia',
      'Hipotensão em anestesia obstétrica',
      'Bradicardia com hipotensão'
    ],
    mecanismoAcao: 'Simpatomimético indireto e direto. Libera noradrenalina e estimula receptores alfa e beta.',
    posologias: [
      {
        indicacao: 'Hipotensão intraoperatória',
        dose: '5-10 mg IV',
        via: 'IV bolus',
        frequencia: 'a cada 3-5 min',
        duracao: 'Conforme resposta'
      }
    ],
    contraindicacoes: [
      'Hipertensão grave',
      'Taquiarritmias',
      'Feocromocitoma',
      'Uso de IMAO'
    ],
    efeitosAdversos: {
      comuns: ['Taquicardia', 'Hipertensão', 'Náusea'],
      graves: ['Arritmias', 'Isquemia miocárdica', 'AVC hemorrágico']
    },
    interacoes: [
      { farmaco: 'IMAO', tipo: 'contraindicacao', descricao: 'Crise hipertensiva' },
      { farmaco: 'Anestésicos halogenados', tipo: 'potencializacao', descricao: 'Risco de arritmias' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Dose única segura' },
    doencasRelacionadas: ['hipotensao-anestesia'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['vasopressor', 'simpatomimetico', 'obstetricia']
  },
  {
    id: 'fenilefrina',
    nomeGenerico: 'Fenilefrina',
    nomesComerciais: ['Neo-Synephrine'],
    atcCode: 'C01CA06',
    classeTerapeutica: 'vasopressor',
    subclasse: 'alfa1-agonista',
    rename: true,
    apresentacoes: [
      { forma: 'solução injetável', concentracao: '10mg/mL', disponivelSUS: true }
    ],
    indicacoes: [
      'Hipotensão induzida por anestesia',
      'Hipotensão em anestesia obstétrica',
      'SVT (via reflexo vagal)'
    ],
    mecanismoAcao: 'Agonista alfa-1 adrenérgico puro. Vasoconstrição sem efeito inotrópico direto. Bradicardia reflexa.',
    posologias: [
      {
        indicacao: 'Hipotensão intraoperatória',
        dose: '50-100 mcg IV',
        via: 'IV bolus',
        frequencia: 'a cada 1-2 min',
        duracao: 'Conforme resposta'
      },
      {
        indicacao: 'Infusão contínua',
        dose: '0.1-0.5 mcg/kg/min',
        via: 'IV contínuo',
        frequencia: 'contínua',
        duracao: 'Conforme necessidade'
      }
    ],
    contraindicacoes: [
      'Hipertensão grave',
      'Bradicardia grave',
      'Uso de IMAO'
    ],
    efeitosAdversos: {
      comuns: ['Bradicardia reflexa', 'Hipertensão'],
      graves: ['Bradicardia grave', 'Isquemia periférica', 'Necrose tecidual (extravasamento)']
    },
    interacoes: [
      { farmaco: 'IMAO', tipo: 'contraindicacao', descricao: 'Hipertensão grave' },
      { farmaco: 'Betabloqueadores', tipo: 'potencializacao', descricao: 'Hipertensão e bradicardia' }
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Dose única segura' },
    doencasRelacionadas: ['hipotensao-anestesia'],
    citations: [{ refId: 'rename-2024' }],
    lastUpdate: '2025-01',
    tags: ['vasopressor', 'alfa1-agonista', 'vasoconstrictor-puro']
  }
];
