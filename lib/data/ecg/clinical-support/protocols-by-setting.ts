/**
 * ECG PROTOCOLS BY CLINICAL SETTING - DARWIN-MFC
 * ===============================================
 *
 * Context-specific ECG protocols for different clinical settings:
 * - EMERGENCIA (Emergency Department)
 * - UTI (ICU)
 * - ENFERMARIA (Ward)
 * - APS (Primary Care / Atencao Primaria)
 *
 * Each protocol is tailored to the specific decision timeframe, resources,
 * and clinical priorities of the setting.
 *
 * References:
 * - AHA/ACC Guidelines for ECG Interpretation 2024
 * - ESC Guidelines for Acute Coronary Syndromes 2023
 * - Sociedade Brasileira de Cardiologia 2024
 * - ACLS Provider Manual 2024
 */

// ============================================================================
// INTERFACES
// ============================================================================

export type ClinicalSetting = 'emergencia' | 'uti' | 'enfermaria' | 'aps';

export type UrgencyLevel = 'imediato' | 'urgente' | 'rotina' | 'eletivo';

export type ReferralDestination =
  | 'hemodinamica'
  | 'uti_cardiologica'
  | 'cardiologia'
  | 'eletrofisiologia'
  | 'emergencia'
  | 'ambulatorio';

export interface Priority {
  ordem: number;
  achado: string;
  descricao: string;
  acaoImediata: string;
  tempoMaximo: string;
  justificativa: string;
}

export interface TriageCriteria {
  id: string;
  achado: string;
  urgencia: UrgencyLevel;
  sinaisClinicosAssociados: string[];
  condutaInicial: string[];
  criteriosEscalonamento: string[];
  destino: ReferralDestination;
}

export interface ReferralScenario {
  id: string;
  cenario: string;
  descricao: string;
  urgencia: UrgencyLevel;
  tempoMaximoEncaminhamento: string;
  informacoesNecessarias: string[];
  destino: ReferralDestination;
  justificativa: string;
}

export interface CommonMistake {
  id: string;
  erro: string;
  consequencia: string;
  comoEvitar: string;
  exemplo?: string;
}

export interface DecisionNode {
  id: string;
  pergunta: string;
  sim: string | DecisionOutcome;
  nao: string | DecisionOutcome;
  ajuda?: string;
}

export interface DecisionOutcome {
  resultado: string;
  urgencia: UrgencyLevel;
  acao: string;
  tempoMaximo: string;
}

export interface ClinicalSettingProtocol {
  id: string;
  setting: ClinicalSetting;
  nome: string;
  nomeEN: string;
  descricao: string;
  caracteristicas: {
    tempoDecisaoTipico: string;
    recursosDisponiveis: string[];
    equipeTipica: string[];
    volumeECGsDia: string;
  };
  prioridades: Priority[];
  tempoDecisao: string;
  criteriosTriagem: TriageCriteria[];
  quandoEncaminhar: ReferralScenario[];
  oqueFazerEnquantoAguarda: string[];
  errosComuns: CommonMistake[];
  checklistRapido: string[];
  fluxogramaDecisao: DecisionNode[];
  metasQualidade: {
    nome: string;
    meta: string;
    referencia: string;
  }[];
  referencias: string[];
}

// ============================================================================
// PROTOCOLO 1: EMERGENCIA (Emergency Department)
// ============================================================================

const protocoloEmergencia: ClinicalSettingProtocol = {
  id: 'ecg-protocol-emergencia',
  setting: 'emergencia',
  nome: 'Protocolo de ECG na Emergencia',
  nomeEN: 'Emergency Department ECG Protocol',
  descricao: 'Protocolo de interpretacao e triagem de ECG para medicos emergencistas, focado na identificacao rapida de condicoes ameacadoras a vida (STEMI, arritmias instáveis, sinais de isquemia aguda).',
  caracteristicas: {
    tempoDecisaoTipico: '< 10 minutos para ECG porta-medico',
    recursosDisponiveis: [
      'ECG de 12 derivacoes',
      'Desfibrilador/cardioversor',
      'Marcapasso transcutaneo',
      'Drogas de emergencia (atropina, amiodarona, adenosina)',
      'Monitorização cardiaca continua',
      'Acesso a hemodinamica 24h (idealmente)'
    ],
    equipeTipica: [
      'Medico emergencista',
      'Enfermeiro(s)',
      'Tecnico de ECG',
      'Cardiologista de sobreaviso'
    ],
    volumeECGsDia: '30-100+ ECGs/dia dependendo do porte'
  },
  prioridades: [
    {
      ordem: 1,
      achado: 'IAMCSST (STEMI)',
      descricao: 'Supradesnivel de ST >= 1mm em 2 derivacoes contiguas com clinica compativel',
      acaoImediata: 'Ativar protocolo de IAMCSST (codigo infarto)',
      tempoMaximo: 'ECG em 10 minutos da chegada; decisao de reperfusao em 30 minutos',
      justificativa: 'Tempo porta-balao < 90 minutos; cada 30 minutos de atraso aumenta mortalidade em 7.5%'
    },
    {
      ordem: 2,
      achado: 'Arritmia instavel',
      descricao: 'TV, FV, bradiarritmia sintomatica, FA com RVR e instabilidade',
      acaoImediata: 'Protocolo ACLS correspondente; cardioversao se instavel',
      tempoMaximo: 'Imediato (segundos a minutos)',
      justificativa: 'Risco de morte subita ou deterioracao hemodinamica'
    },
    {
      ordem: 3,
      achado: 'Equivalentes de IAMCSST',
      descricao: 'BRE novo, padrao de de Winter, infra de ST em V1-V3 (posterior)',
      acaoImediata: 'Tratar como IAMCSST; derivacoes adicionais',
      tempoMaximo: '< 30 minutos para decisao',
      justificativa: '20-30% dos IAMCSST apresentam padroes atipicos'
    },
    {
      ordem: 4,
      achado: 'IAMSST de alto risco',
      descricao: 'Infra de ST, inversao de T, troponina positiva',
      acaoImediata: 'Antiagregacao dupla, anticoagulacao, estratificacao de risco',
      tempoMaximo: 'Cateterismo em < 24h se alto risco',
      justificativa: 'GRACE > 140 ou instabilidade = beneficio de estrategia invasiva precoce'
    },
    {
      ordem: 5,
      achado: 'Disturbio eletrolitico grave',
      descricao: 'Hipercalemia (T apiculadas, QRS alargado), hipocalemia grave',
      acaoImediata: 'Tratamento imediato; gluconato de calcio se hipercalemia',
      tempoMaximo: 'Minutos',
      justificativa: 'Risco de arritmia ventricular fatal'
    }
  ],
  tempoDecisao: 'Minutos (ECG em < 10 min; interpretacao imediata; decisao critica em < 30 min)',
  criteriosTriagem: [
    {
      id: 'triagem-stemi',
      achado: 'STEMI confirmado ou suspeito',
      urgencia: 'imediato',
      sinaisClinicosAssociados: [
        'Dor toracica tipica (aperto, pressao, irradiacao)',
        'Sudorese, palidez, nausea',
        'Hipotensao ou sinais de choque',
        'Dispneia'
      ],
      condutaInicial: [
        'AAS 300mg mastigar',
        'Acesso venoso calibroso',
        'Monitorizacao continua',
        'Nitroglicerina SL (se PAS > 90, sem sildenafil)'
      ],
      criteriosEscalonamento: [
        'Choque cardiogenico',
        'Arritmia ventricular',
        'Complicacoes mecanicas',
        'Falha de reperfusao'
      ],
      destino: 'hemodinamica'
    },
    {
      id: 'triagem-vt-vf',
      achado: 'TV sustentada ou FV',
      urgencia: 'imediato',
      sinaisClinicosAssociados: [
        'Ausencia de pulso (FV)',
        'Hipotensao, sincope',
        'Dor toracica, dispneia',
        'Alteracao do nivel de consciencia'
      ],
      condutaInicial: [
        'Se sem pulso: RCP + desfibrilacao',
        'Se com pulso instavel: cardioversao',
        'Se estavel: amiodarona IV',
        'Buscar causa (5H 5T)'
      ],
      criteriosEscalonamento: [
        'Refratariedade a tratamento',
        'Recorrencia frequente',
        'Necessidade de suporte mecanico'
      ],
      destino: 'uti_cardiologica'
    },
    {
      id: 'triagem-bavt',
      achado: 'BAVT ou Mobitz II',
      urgencia: 'imediato',
      sinaisClinicosAssociados: [
        'Sincope',
        'Hipotensao',
        'Bradicardia sintomatica',
        'Confusao mental'
      ],
      condutaInicial: [
        'Atropina 0.5-1mg IV (pode ser ineficaz)',
        'Marcapasso transcutaneo em standby',
        'Se instavel: estimulacao transcutanea',
        'Identificar causa reversivel'
      ],
      criteriosEscalonamento: [
        'Falha de resposta a atropina',
        'Necessidade de marcapasso transvenoso',
        'Escape ventricular instavel'
      ],
      destino: 'uti_cardiologica'
    },
    {
      id: 'triagem-fa-rvr',
      achado: 'FA com RVR (> 150 bpm) sintomatica',
      urgencia: 'urgente',
      sinaisClinicosAssociados: [
        'Palpitacao intensa',
        'Dispneia',
        'Dor toracica',
        'Hipotensao (se instavel)'
      ],
      condutaInicial: [
        'Se instavel: cardioversao sincronizada',
        'Se estavel: controle de FC (BB, BCC, digoxina)',
        'Anticoagulacao se > 48h ou incerto',
        'Investigar causa precipitante'
      ],
      criteriosEscalonamento: [
        'Instabilidade hemodinamica',
        'WPW com FA',
        'IC descompensada'
      ],
      destino: 'cardiologia'
    },
    {
      id: 'triagem-nstemi',
      achado: 'IAMSST/Angina Instavel',
      urgencia: 'urgente',
      sinaisClinicosAssociados: [
        'Dor toracica em repouso ou progressiva',
        'Alteracao de ECG',
        'Troponina positiva ou em elevacao'
      ],
      condutaInicial: [
        'Dupla antiagregacao',
        'Anticoagulacao',
        'Estratificacao de risco (GRACE, TIMI)',
        'Monitorização em UCO'
      ],
      criteriosEscalonamento: [
        'GRACE > 140',
        'Instabilidade hemodinamica',
        'Arritmia ou IC'
      ],
      destino: 'cardiologia'
    }
  ],
  quandoEncaminhar: [
    {
      id: 'enc-hemodinamica-stemi',
      cenario: 'STEMI confirmado',
      descricao: 'Paciente com supradesnivel de ST e clinica compativel',
      urgencia: 'imediato',
      tempoMaximoEncaminhamento: 'Contato com hemodinamica em < 10 minutos; transferencia imediata',
      informacoesNecessarias: [
        'Horario de inicio dos sintomas',
        'ECG com hora marcada',
        'Contraindicacoes a trombolitico',
        'Medicacoes administradas',
        'Estabilidade hemodinamica'
      ],
      destino: 'hemodinamica',
      justificativa: 'Meta porta-balao < 90 minutos; cada minuto conta'
    },
    {
      id: 'enc-uco-arritmia',
      cenario: 'Arritmia grave estabilizada',
      descricao: 'TV, BAVT, ou outra arritmia grave apos estabilizacao inicial',
      urgencia: 'urgente',
      tempoMaximoEncaminhamento: '1-2 horas',
      informacoesNecessarias: [
        'ECG durante e apos episodio',
        'Tratamento administrado',
        'Resposta ao tratamento',
        'Comorbidades',
        'Medicacoes em uso'
      ],
      destino: 'uti_cardiologica',
      justificativa: 'Monitorização continua e investigacao de causa'
    },
    {
      id: 'enc-cardio-nstemi',
      cenario: 'IAMSST de alto risco',
      descricao: 'SCA sem supra com criterios de alto risco',
      urgencia: 'urgente',
      tempoMaximoEncaminhamento: '< 24 horas para cateterismo',
      informacoesNecessarias: [
        'Escore GRACE',
        'Troponinas seriadas',
        'ECG seriados',
        'Ecocardiograma se disponivel'
      ],
      destino: 'cardiologia',
      justificativa: 'Beneficio de estrategia invasiva precoce em alto risco'
    }
  ],
  oqueFazerEnquantoAguarda: [
    'Manter monitorizacao cardiaca continua',
    'Acesso venoso calibroso pervio',
    'Desfibrilador proximo e testado',
    'Medicacoes de emergencia disponiveis (atropina, amiodarona, adenosina)',
    'Oxigenio disponivel (usar apenas se SpO2 < 90%)',
    'ECGs seriados a cada 15-30 minutos se instavel ou duvida',
    'Documentar todos os eventos e horarios',
    'Manter comunicacao com equipe receptora'
  ],
  errosComuns: [
    {
      id: 'erro-esperar-tropnina',
      erro: 'Esperar resultado de troponina para ativar protocolo STEMI',
      consequencia: 'Atraso critico na reperfusao; aumento de mortalidade',
      comoEvitar: 'STEMI e diagnostico ELETROCARDIOGRAFICO, nao laboratorial',
      exemplo: 'Paciente com dor tipica e supra de ST em V1-V4 - ativar hemodinamica IMEDIATAMENTE, sem aguardar troponina'
    },
    {
      id: 'erro-nao-reconhecer-posterior',
      erro: 'Nao reconhecer STEMI posterior (infra em V1-V3)',
      consequencia: 'Infarto posterior nao tratado como STEMI',
      comoEvitar: 'Sempre fazer V7-V9 se infra isolado em V1-V3 com dor tipica',
      exemplo: 'Infra em V1-V3 com ondas R proeminentes = IAM posterior ate prova em contrario'
    },
    {
      id: 'erro-adenosina-wpw',
      erro: 'Dar adenosina, BB ou BCC em FA com WPW',
      consequencia: 'Pode precipitar FV e morte',
      comoEvitar: 'Se QRS largo e irregular muito rapido, considerar WPW; usar procainamida ou cardioversao',
      exemplo: 'FA com QRS > 0.12s e FC > 200 bpm em jovem = suspeitar WPW'
    },
    {
      id: 'erro-alta-ecg-anormal',
      erro: 'Dar alta a paciente com dor toracica e ECG anormal',
      consequencia: 'Infarto perdido; morte evitavel',
      comoEvitar: 'Qualquer alteracao nova de ECG em paciente com dor toracica requer investigacao',
      exemplo: 'Nunca dar alta com "alteracao inespecifica de ST-T" sem excluir isquemia'
    },
    {
      id: 'erro-amiodarona-torsades',
      erro: 'Usar amiodarona em Torsades de Pointes',
      consequencia: 'Prolonga ainda mais o QT, piora o quadro',
      comoEvitar: 'Em TV polimorfica com QT longo, usar MAGNESIO, nao amiodarona',
      exemplo: 'TV "girando" em paciente em uso de antiarritmico = Torsades; dar MgSO4 2g IV'
    },
    {
      id: 'erro-bre-antigo-vs-novo',
      erro: 'Nao distinguir BRE novo de antigo',
      consequencia: 'BRE NOVO com dor = equivalente de STEMI perdido',
      comoEvitar: 'Sempre comparar com ECG previo; BRE novo + dor = tratar como STEMI',
      exemplo: 'Paciente com dor toracica + BRE sem ECG previo = ativar protocolo STEMI'
    }
  ],
  checklistRapido: [
    '1. Estabilidade hemodinamica? (PA, FC, perfusao, consciencia)',
    '2. Ritmo: sinusal ou arritmia? Regular ou irregular?',
    '3. FC: bradicardia (< 60), normal, ou taquicardia (> 100)?',
    '4. QRS: estreito (< 120ms) ou largo (>= 120ms)?',
    '5. Supra de ST? Em quais derivacoes? Imagem reciproca?',
    '6. Infra de ST? V1-V3 isolado = fazer V7-V9',
    '7. Ondas Q patologicas? Novas?',
    '8. QTc? Normal < 450ms (H) / < 460ms (M); > 500ms = alto risco',
    '9. Comparacao com ECG previo (se disponivel)',
    '10. Correlacao clinica: sintomas condizem com ECG?'
  ],
  fluxogramaDecisao: [
    {
      id: 'inicio',
      pergunta: 'Paciente estavel hemodinamicamente?',
      sim: 'step-avaliar-ecg',
      nao: {
        resultado: 'INSTABILIDADE',
        urgencia: 'imediato',
        acao: 'Iniciar ACLS correspondente ao ritmo; estabilizar antes de prosseguir',
        tempoMaximo: 'Imediato'
      },
      ajuda: 'Instabilidade: hipotensao, alteracao de consciencia, sinais de choque, dor toracica isquemica ativa'
    },
    {
      id: 'step-avaliar-ecg',
      pergunta: 'Ha supradesnivel de ST >= 1mm em 2 derivacoes contiguas?',
      sim: {
        resultado: 'STEMI',
        urgencia: 'imediato',
        acao: 'Ativar codigo infarto; dupla antiagregacao; transferir para hemodinamica',
        tempoMaximo: 'ECG-decisao < 10 min; porta-balao < 90 min'
      },
      nao: 'step-infra-st',
      ajuda: 'Derivacoes contiguas: I-aVL (lateral alta), II-III-aVF (inferior), V1-V6 (anterior/septal/lateral)'
    },
    {
      id: 'step-infra-st',
      pergunta: 'Ha infradesnivel de ST ou inversao de T?',
      sim: 'step-troponina',
      nao: 'step-arritmia',
      ajuda: 'Infra >= 0.5mm horizontal ou descendente; inversao de T nova ou dinamica'
    },
    {
      id: 'step-troponina',
      pergunta: 'Troponina positiva ou em elevacao?',
      sim: {
        resultado: 'IAMSST',
        urgencia: 'urgente',
        acao: 'Estratificar risco (GRACE); dupla antiagregacao + anticoagulacao; UCO',
        tempoMaximo: 'Cateterismo em < 24h se alto risco'
      },
      nao: {
        resultado: 'Angina Instavel ou DAC estavel',
        urgencia: 'urgente',
        acao: 'Monitorização; troponinas seriadas; estratificacao ambulatorial',
        tempoMaximo: '24-72 horas'
      },
      ajuda: 'Solicitar troponinas seriadas (0h, 3h, 6h); curva ascendente = infarto'
    },
    {
      id: 'step-arritmia',
      pergunta: 'Ha arritmia significativa no ECG?',
      sim: 'step-tipo-arritmia',
      nao: 'step-qtc',
      ajuda: 'Arritmias significativas: FA, flutter, TSVP, TV, BAV, pausa sinusal > 3s'
    },
    {
      id: 'step-tipo-arritmia',
      pergunta: 'E uma taquiarritmia com QRS largo (>= 120ms)?',
      sim: {
        resultado: 'TAQUICARDIA DE QRS LARGO',
        urgencia: 'imediato',
        acao: 'Assumir TV ate prova em contrario; se instavel cardioverter; se estavel amiodarona',
        tempoMaximo: 'Imediato'
      },
      nao: 'step-bradi-ou-svt',
      ajuda: 'QRS largo + taquicardia = TV ate prova em contrario (NUNCA dar verapamil)'
    },
    {
      id: 'step-bradi-ou-svt',
      pergunta: 'E uma bradiarritmia sintomatica ou BAV de alto grau?',
      sim: {
        resultado: 'BRADIARRITMIA CRITICA',
        urgencia: 'imediato',
        acao: 'Atropina; marcapasso transcutaneo se sem resposta; identificar causa',
        tempoMaximo: 'Imediato'
      },
      nao: {
        resultado: 'Arritmia para avaliacao',
        urgencia: 'urgente',
        acao: 'Tratar conforme tipo especifico; monitorização; cardiologia',
        tempoMaximo: '1-24 horas'
      },
      ajuda: 'BAV de alto grau: Mobitz II, BAVT, BAV 2:1'
    },
    {
      id: 'step-qtc',
      pergunta: 'QTc > 500ms?',
      sim: {
        resultado: 'QT PROLONGADO',
        urgencia: 'urgente',
        acao: 'Suspender farmacos que prolongam QT; corrigir K+ e Mg++; monitorização; cardiologia',
        tempoMaximo: '1-2 horas'
      },
      nao: {
        resultado: 'ECG para avaliacao eletiva',
        urgencia: 'rotina',
        acao: 'Documentar achados; comparar com previos; seguimento ambulatorial se indicado',
        tempoMaximo: 'Ambulatorial'
      },
      ajuda: 'QTc > 500ms = alto risco de Torsades de Pointes'
    }
  ],
  metasQualidade: [
    {
      nome: 'Tempo porta-ECG',
      meta: '< 10 minutos',
      referencia: 'AHA/ACC STEMI Guidelines 2023'
    },
    {
      nome: 'Tempo ECG-ativacao hemodinamica (se STEMI)',
      meta: '< 10 minutos',
      referencia: 'ESC STEMI Guidelines 2023'
    },
    {
      nome: 'Tempo porta-balao',
      meta: '< 90 minutos (idealmente < 60 minutos)',
      referencia: 'AHA/ACC STEMI Guidelines 2023'
    },
    {
      nome: 'Tempo porta-agulha (se trombolitico)',
      meta: '< 30 minutos',
      referencia: 'AHA/ACC STEMI Guidelines 2023'
    }
  ],
  referencias: [
    'O\'Gara PT, et al. 2013 ACCF/AHA Guideline for STEMI. Circulation 2013.',
    'Ibanez B, et al. 2017 ESC Guidelines for STEMI. Eur Heart J 2018.',
    'Amsterdam EA, et al. 2014 AHA/ACC Guideline for NSTE-ACS. Circulation 2014.',
    'Panchal AR, et al. ACLS Guidelines 2020. Circulation 2020.',
    'SBC. Diretriz Brasileira de Sindrome Coronariana Aguda 2024.'
  ]
};

// ============================================================================
// PROTOCOLO 2: UTI (ICU)
// ============================================================================

const protocoloUTI: ClinicalSettingProtocol = {
  id: 'ecg-protocol-uti',
  setting: 'uti',
  nome: 'Protocolo de ECG na UTI',
  nomeEN: 'ICU ECG Protocol',
  descricao: 'Protocolo de interpretacao de ECG para intensivistas, focado em monitorização continua, deteccao de disturbios eletroliticos, toxicidade de drogas, e padroes pos-parada cardiaca.',
  caracteristicas: {
    tempoDecisaoTipico: 'Continuo (monitorização); interpretacao formal diaria ou quando mudanca',
    recursosDisponiveis: [
      'Monitorização cardiaca continua multiparametrica',
      'ECG de 12 derivacoes a beira-leito',
      'Desfibrilador/cardioversor',
      'Marcapasso temporario (transvenoso disponivel)',
      'Suporte vasoativo',
      'Ventilacao mecanica',
      'Dispositivos de suporte circulatorio (ECMO, BIA)'
    ],
    equipeTipica: [
      'Intensivista',
      'Enfermeiros de UTI (ratio 1:2)',
      'Fisioterapeuta',
      'Cardiologista consultor',
      'Eletrofisiologista se necessario'
    ],
    volumeECGsDia: '10-30 ECGs formais + monitorização continua'
  },
  prioridades: [
    {
      ordem: 1,
      achado: 'Arritmias pos-PCR',
      descricao: 'Arritmias ventriculares, bradicardias, ou instabilidade ritmica apos RCE',
      acaoImediata: 'Tratamento conforme protocolo pos-parada; avaliar isquemia, disturbio eletrolitico',
      tempoMaximo: 'Continuo',
      justificativa: 'Alta incidencia de rearranjo arritmico nas primeiras 24-48h pos-PCR'
    },
    {
      ordem: 2,
      achado: 'Disturbios eletroliticos',
      descricao: 'Alteracoes de K+, Mg++, Ca++ refletidas no ECG',
      acaoImediata: 'Correcao imediata; monitorização de resposta',
      tempoMaximo: 'Minutos a horas dependendo da gravidade',
      justificativa: 'Disturbios eletroliticos sao causa reversivel de arritmias em paciente critico'
    },
    {
      ordem: 3,
      achado: 'Toxicidade medicamentosa',
      descricao: 'Prolongamento de QT, bloqueios AV, bradicardia por farmacos',
      acaoImediata: 'Identificar farmaco responsavel; ajustar ou suspender',
      tempoMaximo: '1-4 horas para revisao de prescricao',
      justificativa: 'Polifarmacia em UTI aumenta risco de interacoes e toxicidade'
    },
    {
      ordem: 4,
      achado: 'Isquemia em paciente critico',
      descricao: 'Alteracoes isquemicas em paciente septico, pos-operatorio, ou com hipoxia',
      acaoImediata: 'Otimizar demanda/oferta de O2; considerar SCA tipo 2 vs tipo 1',
      tempoMaximo: 'Horas',
      justificativa: 'Infarto tipo 2 e comum em paciente critico; manejo diferente do tipo 1'
    },
    {
      ordem: 5,
      achado: 'Monitorização de QT',
      descricao: 'Seguimento seriado de QTc em pacientes em uso de farmacos que prolongam QT',
      acaoImediata: 'Monitorização diaria; ajustar medicacoes se QTc > 500ms',
      tempoMaximo: 'Diario',
      justificativa: '> 50% dos pacientes de UTI usam farmacos que prolongam QT'
    }
  ],
  tempoDecisao: 'Continuo (monitorização em tempo real) com interpretacao formal seriada',
  criteriosTriagem: [
    {
      id: 'triagem-arritmia-pos-pcr',
      achado: 'Arritmia ventricular pos-PCR',
      urgencia: 'imediato',
      sinaisClinicosAssociados: [
        'RCE recente',
        'Instabilidade hemodinamica',
        'Necessidade de vasopressores',
        'Coma pos-anoxia'
      ],
      condutaInicial: [
        'Manter anti-arritmico se estava em uso',
        'Corrigir eletrólitos (K+ > 4, Mg++ > 2)',
        'Otimizar oxigenacao',
        'Considerar hipotermia terapeutica'
      ],
      criteriosEscalonamento: [
        'TV/FV recorrente',
        'Tempestade eletrica',
        'Necessidade de suporte mecanico'
      ],
      destino: 'eletrofisiologia'
    },
    {
      id: 'triagem-hipercalemia',
      achado: 'Sinais de hipercalemia no ECG',
      urgencia: 'imediato',
      sinaisClinicosAssociados: [
        'Ondas T apiculadas (tenda)',
        'PR prolongado',
        'QRS alargado',
        'Ondas P achatadas ou ausentes',
        'Padrao sinusoidal (grave)'
      ],
      condutaInicial: [
        'Gluconato de calcio 10mL 10% IV em 2-3 min (estabiliza membrana)',
        'Insulina 10UI + glicose 50% (shift)',
        'Bicarbonato se acidose',
        'Resina trocadora ou dialise (eliminacao)'
      ],
      criteriosEscalonamento: [
        'QRS > 0.12s',
        'Bradicardia',
        'Arritmia ventricular',
        'K+ > 7 mEq/L'
      ],
      destino: 'uti_cardiologica'
    },
    {
      id: 'triagem-qt-prolongado',
      achado: 'QTc > 500ms em UTI',
      urgencia: 'urgente',
      sinaisClinicosAssociados: [
        'Uso de multiplos farmacos que prolongam QT',
        'Disturbio eletrolitico associado',
        'Bradicardia',
        'Episodios de Torsades'
      ],
      condutaInicial: [
        'Revisar TODOS os farmacos em uso',
        'Suspender os nao essenciais que prolongam QT',
        'Corrigir K+ > 4.5, Mg++ > 2',
        'MgSO4 2g IV profilatico se QTc > 550ms'
      ],
      criteriosEscalonamento: [
        'QTc > 550ms',
        'Torsades de Pointes',
        'Incapacidade de suspender farmaco causador'
      ],
      destino: 'cardiologia'
    },
    {
      id: 'triagem-isquemia-tipo2',
      achado: 'Isquemia em contexto de doenca critica',
      urgencia: 'urgente',
      sinaisClinicosAssociados: [
        'Elevacao de troponina sem dor toracica tipica',
        'Sepse, choque, hipoxia',
        'Taquicardia com aumento de demanda',
        'Anemia grave'
      ],
      condutaInicial: [
        'Otimizar hemoglobina, PA, oxigenacao',
        'Controlar FC (betabloqueador se tolerado)',
        'Evitar anticoagulacao plena ate definir tipo',
        'Considerar eco a beira-leito'
      ],
      criteriosEscalonamento: [
        'Elevacao de ST sugerindo tipo 1',
        'Instabilidade refrataria',
        'Necessidade de cateterismo'
      ],
      destino: 'cardiologia'
    },
    {
      id: 'triagem-marcapasso-falha',
      achado: 'Falha de marcapasso',
      urgencia: 'imediato',
      sinaisClinicosAssociados: [
        'Bradicardia sem espiculas de MP',
        'Espiculas sem captura',
        'Espiculas com captura intermitente',
        'Undersensing ou oversensing'
      ],
      condutaInicial: [
        'Verificar conexoes e limiares',
        'Aumentar output se problema de captura',
        'Marcapasso transcutaneo em standby',
        'Chamar equipe de dispositivos'
      ],
      criteriosEscalonamento: [
        'Falha completa de captura',
        'Bradicardia sintomatica',
        'Necessidade de reposicionamento'
      ],
      destino: 'eletrofisiologia'
    }
  ],
  quandoEncaminhar: [
    {
      id: 'enc-eletrofisio-tempestade',
      cenario: 'Tempestade eletrica (>= 3 episodios de TV/FV em 24h)',
      descricao: 'Arritmias ventriculares recorrentes refratarias',
      urgencia: 'imediato',
      tempoMaximoEncaminhamento: 'Imediato',
      informacoesNecessarias: [
        'Numero e timing dos episodios',
        'Tratamentos tentados',
        'Causa subjacente (isquemia, eletrolitico)',
        'Funcao de VE',
        'Medicacoes em uso'
      ],
      destino: 'eletrofisiologia',
      justificativa: 'Pode necessitar de ablacao de emergencia ou suporte mecanico'
    },
    {
      id: 'enc-cardio-pos-pcr',
      cenario: 'Pos-PCR com suspeita de SCA',
      descricao: 'Paciente apos RCE com alteracoes isquemicas ou sem causa clara',
      urgencia: 'urgente',
      tempoMaximoEncaminhamento: '< 2 horas para decisao de cateterismo',
      informacoesNecessarias: [
        'ECG pre e pos-PCR',
        'Circunstancias da parada',
        'Ritmo inicial (FV chocavel vs assistolia)',
        'Tempo de RCP',
        'Status neurologico atual'
      ],
      destino: 'hemodinamica',
      justificativa: 'Cateterismo precoce pode ser indicado mesmo sem STEMI em PCR de causa nao clara'
    },
    {
      id: 'enc-cardio-isquemia-tipo2',
      cenario: 'Isquemia tipo 2 refrataria',
      descricao: 'Elevacao de troponina persistente apesar de otimizacao',
      urgencia: 'urgente',
      tempoMaximoEncaminhamento: '24-48 horas',
      informacoesNecessarias: [
        'Curva de troponina',
        'ECGs seriados',
        'Causa da doenca critica',
        'Resposta a otimizacao',
        'Funcao de VE'
      ],
      destino: 'cardiologia',
      justificativa: 'Definir se há componente de DAC obstrutiva que justifique intervencao'
    }
  ],
  oqueFazerEnquantoAguarda: [
    'Manter monitorização continua com alarmes apropriados',
    'ECG de 12 derivacoes disponivel para comparacao',
    'Eletrólitos disponíveis nas ultimas 4-6 horas',
    'Revisar lista de medicacoes para farmacos pro-arritmicos',
    'Desfibrilador e marcapasso transcutaneo proximos e funcionantes',
    'Manter comunicacao com equipe de cardiologia/eletrofisiologia',
    'Documentar todos os eventos arritmicos no prontuario',
    'Manter K+ > 4, Mg++ > 2 em pacientes de alto risco arritmico'
  ],
  errosComuns: [
    {
      id: 'erro-ignorar-t-apiculada',
      erro: 'Ignorar ondas T apiculadas como variante normal',
      consequencia: 'Perder hipercalemia grave que pode evoluir para arritmia fatal',
      comoEvitar: 'Qualquer T apiculada em paciente de risco (DRC, acidose, rabdomiolise) = dosar K+ STAT',
      exemplo: 'Paciente em dialise com T apiculadas em V2-V4 = hipercalemia ate prova em contrario'
    },
    {
      id: 'erro-qt-nao-monitorar',
      erro: 'Nao monitorar QTc em pacientes de alto risco',
      consequencia: 'Torsades de Pointes evitavel',
      comoEvitar: 'ECG diario ou a cada mudanca de prescricao em pacientes com multiplos farmacos que prolongam QT',
      exemplo: 'Paciente em uso de amiodarona + ondansetrona + fluoroquinolona = monitorar QTc diariamente'
    },
    {
      id: 'erro-atribuir-sepse',
      erro: 'Atribuir toda elevacao de troponina a isquemia tipo 2',
      consequencia: 'Perder IAMCSST em paciente septico',
      comoEvitar: 'Sempre fazer ECG antes de atribuir troponina elevada a tipo 2',
      exemplo: 'Paciente septico com supra de ST em derivacoes contiguas = pode ser tipo 1, requer cateterismo'
    },
    {
      id: 'erro-alarmes-monitor',
      erro: 'Dessensibilizacao a alarmes do monitor cardiaco',
      consequencia: 'Perder arritmia grave em meio a alarmes frequentes',
      comoEvitar: 'Ajustar limites de alarme individualmente; revisar todas as arritmias',
      exemplo: 'Configurar alarme de FC com margem adequada para o paciente, nao valores padrao'
    },
    {
      id: 'erro-ecg-vs-monitor',
      erro: 'Confiar apenas no monitor sem fazer ECG de 12 derivacoes',
      consequencia: 'Perder alteracoes territoriais que monitor de 3-5 derivacoes nao detecta',
      comoEvitar: 'ECG de 12 derivacoes diario em pacientes cardiologicos ou com qualquer mudanca',
      exemplo: 'IAM posterior so aparece em V7-V9 ou como infra em V1-V3 - monitor nao mostra'
    }
  ],
  checklistRapido: [
    '1. Comparar com ECG previo (baseline do paciente)',
    '2. Verificar eletrólitos nas ultimas 6h (K+, Mg++, Ca++)',
    '3. Revisar lista de medicacoes pro-arritmicas',
    '4. QTc atual e tendencia (aumentando?)',
    '5. Sinais de isquemia nova? (ST, T, Q)',
    '6. Marcapasso funcionando adequadamente? (se aplicável)',
    '7. Correlacionar com eventos clinicos (febre, hipotensao, dor)',
    '8. Alarmes do monitor configurados apropriadamente?',
    '9. Desfibrilador proximo e funcionante?',
    '10. Plano de contingencia para arritmia definido?'
  ],
  fluxogramaDecisao: [
    {
      id: 'inicio-uti',
      pergunta: 'Ha mudanca significativa no ECG ou monitor comparado ao baseline?',
      sim: 'step-tipo-mudanca',
      nao: {
        resultado: 'ECG estavel',
        urgencia: 'rotina',
        acao: 'Manter monitorização; proximo ECG formal conforme rotina ou se mudanca clinica',
        tempoMaximo: '24 horas ou se mudanca'
      },
      ajuda: 'Comparar sistematicamente: ritmo, FC, intervalos, ST-T, QTc'
    },
    {
      id: 'step-tipo-mudanca',
      pergunta: 'A mudanca e em ST-T (sugerindo isquemia)?',
      sim: 'step-isquemia-uti',
      nao: 'step-arritmia-uti',
      ajuda: 'Novas alteracoes de ST-T podem indicar isquemia tipo 1 ou 2'
    },
    {
      id: 'step-isquemia-uti',
      pergunta: 'Ha supradesnivel de ST >= 1mm em derivacoes contiguas?',
      sim: {
        resultado: 'Possivel STEMI em paciente critico',
        urgencia: 'imediato',
        acao: 'Discussao urgente com cardiologia; considerar cateterismo mesmo em paciente critico se beneficio superar risco',
        tempoMaximo: 'Imediato - decisao em < 30 minutos'
      },
      nao: {
        resultado: 'Isquemia tipo 2 vs tipo 1',
        urgencia: 'urgente',
        acao: 'Otimizar demanda/oferta O2; troponinas seriadas; eco; discussao com cardiologia',
        tempoMaximo: '2-4 horas'
      },
      ajuda: 'Em paciente critico, IAM tipo 2 e mais comum, mas tipo 1 nao pode ser descartado'
    },
    {
      id: 'step-arritmia-uti',
      pergunta: 'Ha arritmia ventricular (TV, EV frequentes, FV)?',
      sim: 'step-arritmia-ventricular',
      nao: 'step-conducao-intervalo',
      ajuda: 'Arritmias ventriculares em UTI requerem busca de causa reversivel'
    },
    {
      id: 'step-arritmia-ventricular',
      pergunta: 'O paciente esta instavel ou ha TV sustentada/FV?',
      sim: {
        resultado: 'Arritmia ventricular instavel',
        urgencia: 'imediato',
        acao: 'ACLS; se TV sustentada estavel: amiodarona; buscar causa (5H 5T, isquemia, eletrólitos)',
        tempoMaximo: 'Imediato'
      },
      nao: {
        resultado: 'Arritmia ventricular estavel',
        urgencia: 'urgente',
        acao: 'Corrigir eletrólitos; revisar farmacos; considerar antiarritmico; monitorização',
        tempoMaximo: '1-2 horas'
      },
      ajuda: 'EV frequentes ou TVNS podem preceder TV sustentada'
    },
    {
      id: 'step-conducao-intervalo',
      pergunta: 'Ha alteracao de conducao (BAV, bloqueio de ramo novo) ou intervalo (QTc)?',
      sim: 'step-tipo-conducao',
      nao: {
        resultado: 'Mudanca menor de ECG',
        urgencia: 'rotina',
        acao: 'Documentar; correlacionar clinicamente; repetir ECG em 12-24h',
        tempoMaximo: '24 horas'
      },
      ajuda: 'Alteracoes de conducao podem indicar progressao de doenca ou toxicidade'
    },
    {
      id: 'step-tipo-conducao',
      pergunta: 'QTc > 500ms ou aumentou > 60ms do baseline?',
      sim: {
        resultado: 'QT prolongado significativo',
        urgencia: 'urgente',
        acao: 'Suspender farmacos que prolongam QT; corrigir K+ e Mg++; MgSO4 profilatico se QTc > 550ms',
        tempoMaximo: '1-2 horas para revisao de prescricao'
      },
      nao: {
        resultado: 'Outra alteracao de conducao',
        urgencia: 'urgente',
        acao: 'Avaliar causa; se novo bloqueio de ramo com isquemia = emergencia; se BAV progressivo = marcapasso',
        tempoMaximo: '2-4 horas'
      },
      ajuda: 'BAV novo em paciente de UTI pode indicar isquemia ou toxicidade medicamentosa'
    }
  ],
  metasQualidade: [
    {
      nome: 'ECG em admissao na UTI',
      meta: 'ECG de 12 derivacoes em < 30 minutos da admissao',
      referencia: 'Padrao de qualidade em terapia intensiva'
    },
    {
      nome: 'Monitorização de QTc',
      meta: 'ECG diario em pacientes com >= 2 farmacos que prolongam QT',
      referencia: 'Recomendacao de seguranca em UTI'
    },
    {
      nome: 'Tempo de resposta a arritmia',
      meta: 'Desfibrilacao em < 3 minutos de FV detectada',
      referencia: 'ACLS Guidelines'
    },
    {
      nome: 'Monitorização pos-PCR',
      meta: 'ECG seriados a cada 6-12h nas primeiras 48h',
      referencia: 'Post-Cardiac Arrest Care Guidelines'
    }
  ],
  referencias: [
    'Drew BJ, et al. AHA Statement on ECG Monitoring in Hospital Settings. Circulation 2004.',
    'Haugaa KH, et al. Management of Long QT Syndrome. Eur Heart J 2022.',
    'Nolan JP, et al. Post-Resuscitation Care Guidelines. Resuscitation 2021.',
    'Drew BJ, et al. Practice Standards for ECG Monitoring. Circulation 2004.',
    'Tisdale JE, et al. Drug-Induced Arrhythmias: A Scientific Statement. Circulation 2020.'
  ]
};

// ============================================================================
// PROTOCOLO 3: ENFERMARIA (Ward)
// ============================================================================

const protocoloEnfermaria: ClinicalSettingProtocol = {
  id: 'ecg-protocol-enfermaria',
  setting: 'enfermaria',
  nome: 'Protocolo de ECG na Enfermaria',
  nomeEN: 'Ward ECG Protocol',
  descricao: 'Protocolo de interpretacao de ECG para medicos de enfermaria, focado em avaliacao pre-operatoria, seguimento pos-IAM, monitorização de QT, e comparacao com ECG previos.',
  caracteristicas: {
    tempoDecisaoTipico: 'Horas a dias (rotina); minutos a horas (urgencia)',
    recursosDisponiveis: [
      'ECG de 12 derivacoes',
      'Telemetria em unidades selecionadas',
      'Carrinho de emergencia com desfibrilador',
      'Cardiologista em horario comercial / sobreaviso fora',
      'Acesso a ecocardiograma e Holter'
    ],
    equipeTipica: [
      'Medico assistente/plantonista',
      'Residente (se hospital-escola)',
      'Enfermeiro(s)',
      'Cardiologista consultor'
    ],
    volumeECGsDia: '5-20 ECGs/dia dependendo da enfermaria'
  },
  prioridades: [
    {
      ordem: 1,
      achado: 'Novo supra ou infra de ST',
      descricao: 'Alteracao isquemica nova em paciente internado',
      acaoImediata: 'Avaliar sintomas; ECG seriados; troponina; chamar cardiologia',
      tempoMaximo: 'Minutos a horas dependendo de sintomas',
      justificativa: 'Isquemia nova em paciente internado pode representar complicacao grave'
    },
    {
      ordem: 2,
      achado: 'Mudanca significativa comparado com previo',
      descricao: 'Qualquer alteracao nova comparando ECG atual com baseline',
      acaoImediata: 'Avaliar contexto clinico; sintomas; solicitar parecer se indicado',
      tempoMaximo: 'Horas (se assintomatico)',
      justificativa: 'Alteracoes novas podem indicar evento cardiaco intercorrente'
    },
    {
      ordem: 3,
      achado: 'QTc > 500ms',
      descricao: 'Prolongamento de QT em paciente em uso de medicacoes',
      acaoImediata: 'Revisar prescricao; suspender farmacos que prolongam QT; corrigir eletrólitos',
      tempoMaximo: 'Horas',
      justificativa: 'Risco de Torsades de Pointes; farmacos hospitalares frequentes causadores'
    },
    {
      ordem: 4,
      achado: 'Avaliacao pre-operatoria alterada',
      descricao: 'ECG anormal em paciente em preparo cirurgico',
      acaoImediata: 'Avaliar capacidade funcional; estratificar risco; cardiologia se necessario',
      tempoMaximo: 'Dias (eletivo) a horas (semi-urgencia)',
      justificativa: 'Alteracao de ECG pode modificar risco cirurgico e indicar preparo adicional'
    },
    {
      ordem: 5,
      achado: 'Seguimento pos-IAM ou pos-procedimento',
      descricao: 'ECG de controle apos evento cardiaco ou intervencao',
      acaoImediata: 'Comparar com previos; verificar evolucao; documentar achados',
      tempoMaximo: 'Rotina (24-48h)',
      justificativa: 'Documentar evolucao e detectar complicacoes precoces'
    }
  ],
  tempoDecisao: 'Horas a dias para achados estáveis; minutos a horas se sintomático ou mudanca significativa',
  criteriosTriagem: [
    {
      id: 'triagem-isquemia-nova',
      achado: 'Alteracoes isquemicas novas em paciente internado',
      urgencia: 'urgente',
      sinaisClinicosAssociados: [
        'Dor toracica',
        'Dispneia nova',
        'Queda de PA ou FC',
        'Alteracao de consciencia'
      ],
      condutaInicial: [
        'ECG de 12 derivacoes imediato',
        'Comparar com ECG de admissao',
        'Troponina STAT',
        'Sinais vitais e monitorizacao'
      ],
      criteriosEscalonamento: [
        'Supra de ST = chamar emergencia/UTI',
        'Sintomas persistentes',
        'Instabilidade hemodinamica'
      ],
      destino: 'cardiologia'
    },
    {
      id: 'triagem-pre-op-alterado',
      achado: 'ECG pre-operatorio anormal',
      urgencia: 'rotina',
      sinaisClinicosAssociados: [
        'Alteracao nova vs ECG previo',
        'Sintomas cardiacos ativos',
        'Capacidade funcional limitada (< 4 METs)'
      ],
      condutaInicial: [
        'Comparar com ECG previo se disponivel',
        'Avaliar capacidade funcional (consegue subir 2 lances de escada?)',
        'Calcular indice de risco cardiaco revisado (RCRI)',
        'Parecer cardiologia se indicado'
      ],
      criteriosEscalonamento: [
        'Alteracao isquemica ativa',
        'Arritmia nao avaliada',
        'RCRI >= 2 com cirurgia de alto risco'
      ],
      destino: 'cardiologia'
    },
    {
      id: 'triagem-qt-prolongado-ward',
      achado: 'QTc prolongado (> 470ms em homens, > 480ms em mulheres)',
      urgencia: 'urgente',
      sinaisClinicosAssociados: [
        'Uso de farmacos que prolongam QT',
        'Disturbio eletrolitico conhecido',
        'Historia de sincope',
        'Historia familiar de morte subita'
      ],
      condutaInicial: [
        'Revisar TODAS as medicacoes',
        'Dosar K+, Mg++, Ca++',
        'Suspender farmacos nao essenciais que prolongam QT',
        'Se QTc > 500ms: telemetria e parecer cardiologia'
      ],
      criteriosEscalonamento: [
        'QTc > 500ms',
        'Torsades de Pointes',
        'Sincope durante internacao'
      ],
      destino: 'cardiologia'
    },
    {
      id: 'triagem-fa-nova',
      achado: 'Fibrilacao atrial de novo diagnostico',
      urgencia: 'urgente',
      sinaisClinicosAssociados: [
        'Palpitacoes',
        'FC elevada',
        'Dispneia',
        'Tontura'
      ],
      condutaInicial: [
        'ECG confirmatorio',
        'Avaliar FC e sintomas',
        'Investigar causa (infeccao, hipertireoidismo, embolia)',
        'Calcular CHA2DS2-VASc'
      ],
      criteriosEscalonamento: [
        'RVR (FC > 110) sintomatica',
        'Instabilidade hemodinamica',
        'IC descompensada'
      ],
      destino: 'cardiologia'
    },
    {
      id: 'triagem-pos-iam',
      achado: 'Seguimento ECG pos-IAM ou pos-intervencao',
      urgencia: 'rotina',
      sinaisClinicosAssociados: [
        'Recuperacao pos-evento cardiaco',
        'Pos-cateterismo ou cirurgia cardiaca',
        'Novo sintoma durante internacao'
      ],
      condutaInicial: [
        'Comparar com ECG pos-procedimento imediato',
        'Avaliar evolucao de ondas Q, ST, T',
        'Documentar achados no prontuario'
      ],
      criteriosEscalonamento: [
        'Nova elevacao de ST',
        'Nova arritmia',
        'Dor toracica recorrente'
      ],
      destino: 'cardiologia'
    }
  ],
  quandoEncaminhar: [
    {
      id: 'enc-cardio-pre-op',
      cenario: 'ECG pre-operatorio anormal em cirurgia de risco intermediario-alto',
      descricao: 'Alteracoes ECG que podem impactar risco cirurgico',
      urgencia: 'rotina',
      tempoMaximoEncaminhamento: '48-72h antes da cirurgia eletiva',
      informacoesNecessarias: [
        'ECG atual e previo (se disponivel)',
        'Tipo de cirurgia planejada',
        'Capacidade funcional do paciente',
        'Comorbidades (DM, HAS, DRC, DAC previa)',
        'RCRI calculado'
      ],
      destino: 'cardiologia',
      justificativa: 'Otimizar risco e definir necessidade de testes adicionais'
    },
    {
      id: 'enc-cardio-qt-longo',
      cenario: 'QTc > 500ms ou aumento > 60ms do baseline',
      descricao: 'Prolongamento significativo de QT em paciente internado',
      urgencia: 'urgente',
      tempoMaximoEncaminhamento: '24h',
      informacoesNecessarias: [
        'QTc atual e previo',
        'Lista completa de medicacoes',
        'Eletrólitos recentes',
        'Historia de sincope ou arritmia'
      ],
      destino: 'cardiologia',
      justificativa: 'Alto risco de Torsades de Pointes; necessita revisao especializada'
    },
    {
      id: 'enc-cardio-novo-achado',
      cenario: 'Achado novo inesperado em ECG de rotina',
      descricao: 'Alteracao nao conhecida previamente descoberta durante internacao',
      urgencia: 'rotina',
      tempoMaximoEncaminhamento: '3-5 dias ou antes da alta',
      informacoesNecessarias: [
        'ECG atual e de admissao',
        'Contexto clinico',
        'Sintomas cardiovasculares',
        'ECG previo para comparacao'
      ],
      destino: 'ambulatorio',
      justificativa: 'Garantir seguimento ambulatorial apropriado'
    }
  ],
  oqueFazerEnquantoAguarda: [
    'Manter ECG atual e previos disponiveis para comparacao',
    'Sinais vitais a cada 4-6 horas (ou mais frequente se indicado)',
    'Monitorar sintomas cardiovasculares',
    'Revisar prescricao para farmacos cardiotoxicos',
    'Documentar achados e plano no prontuario',
    'Orientar enfermagem sobre sinais de alerta',
    'Se QT prolongado: monitorar eletrólitos',
    'Manter carrinho de emergencia proximo e funcionante'
  ],
  errosComuns: [
    {
      id: 'erro-nao-comparar',
      erro: 'Nao comparar ECG atual com previos',
      consequencia: 'Perder alteracoes novas significativas ou alarmar-se com achados cronicos',
      comoEvitar: 'SEMPRE buscar ECG de admissao e/ou previos no prontuario eletronico',
      exemplo: 'BRE "novo" que ja estava presente ha anos = nao e emergencia'
    },
    {
      id: 'erro-pre-op-superficial',
      erro: 'Avaliacao pre-operatoria superficial de ECG anormal',
      consequencia: 'Risco cirurgico subestimado; complicacao perioperatoria',
      comoEvitar: 'Qualquer anormalidade em paciente para cirurgia de risco = avaliar capacidade funcional e considerar parecer',
      exemplo: 'Ondas Q em parede inferior em paciente para cirurgia vascular = investigar DAC'
    },
    {
      id: 'erro-qt-farmacos',
      erro: 'Nao revisar medicacoes quando QT prolongado',
      consequencia: 'Torsades de Pointes evitavel',
      comoEvitar: 'Lista de farmacos que prolongam QT em crediblemeds.org; revisar prescricao',
      exemplo: 'Haloperidol + ondansetrona + metoclopramida = multiplos farmacos que prolongam QT'
    },
    {
      id: 'erro-alta-sem-plano',
      erro: 'Dar alta com achado ECG novo sem plano de seguimento',
      consequencia: 'Paciente perdido para seguimento; evento cardiaco ambulatorial',
      comoEvitar: 'Qualquer achado novo = documentar plano de seguimento no sumario de alta',
      exemplo: 'FA descoberta incidentalmente = prescrever anticoagulacao e agendar cardiologia'
    },
    {
      id: 'erro-ecg-pos-dor',
      erro: 'Nao fazer ECG em paciente com dor toracica na enfermaria',
      consequencia: 'IAM perdido em paciente internado por outra causa',
      comoEvitar: 'Qualquer dor toracica nova = ECG em < 10 minutos',
      exemplo: 'Paciente pos-operatorio com dor toracica = ECG imediato, nao atribuir a dor incisional'
    }
  ],
  checklistRapido: [
    '1. Comparar com ECG de admissao e/ou previos',
    '2. Ha mudancas significativas? (ritmo, FC, ST-T, Q, intervalos)',
    '3. Contexto clinico: por que este ECG foi solicitado?',
    '4. QTc calculado e dentro do normal?',
    '5. Se pre-operatorio: capacidade funcional >= 4 METs?',
    '6. Sintomas cardiovasculares presentes?',
    '7. Lista de medicacoes revisada para cardiotoxicidade?',
    '8. Plano de seguimento definido para achados novos?',
    '9. Necessita parecer de cardiologia?',
    '10. Documentacao no prontuario esta completa?'
  ],
  fluxogramaDecisao: [
    {
      id: 'inicio-enfermaria',
      pergunta: 'O paciente tem sintomas cardiacos ativos (dor toracica, dispneia, palpitacao, sincope)?',
      sim: 'step-sintomas-ward',
      nao: 'step-rotina-ward',
      ajuda: 'Sintomas ativos requerem avaliacao mais urgente'
    },
    {
      id: 'step-sintomas-ward',
      pergunta: 'Ha alteracao isquemica nova (supra ou infra de ST, inversao de T)?',
      sim: {
        resultado: 'Possivel SCA em paciente internado',
        urgencia: 'imediato',
        acao: 'Chamar equipe de resposta rapida/emergencia; troponina STAT; cardiologia urgente',
        tempoMaximo: 'Minutos'
      },
      nao: 'step-arritmia-ward',
      ajuda: 'Comparar com ECG de admissao para identificar mudancas'
    },
    {
      id: 'step-arritmia-ward',
      pergunta: 'Ha arritmia nova significativa (FA, TV, bloqueio)?',
      sim: {
        resultado: 'Arritmia nova para avaliacao',
        urgencia: 'urgente',
        acao: 'Estabilizar conforme tipo; parecer cardiologia em 24h ou antes se instavel',
        tempoMaximo: 'Horas'
      },
      nao: {
        resultado: 'ECG para avaliacao',
        urgencia: 'rotina',
        acao: 'Investigar causa dos sintomas; repetir ECG se sintomas recorrerem',
        tempoMaximo: '24-48 horas'
      },
      ajuda: 'Arritmia nova em paciente internado requer investigacao de causa'
    },
    {
      id: 'step-rotina-ward',
      pergunta: 'E um ECG pre-operatorio?',
      sim: 'step-pre-op',
      nao: 'step-seguimento',
      ajuda: 'Pre-operatorio tem criterios especificos de avaliacao'
    },
    {
      id: 'step-pre-op',
      pergunta: 'Ha alteracoes novas ou significativas comparado com previo?',
      sim: {
        resultado: 'Pre-operatorio com ECG alterado',
        urgencia: 'rotina',
        acao: 'Avaliar capacidade funcional; calcular RCRI; considerar parecer cardiologia; nao atrasar cirurgia urgente',
        tempoMaximo: '48-72h antes de cirurgia eletiva'
      },
      nao: {
        resultado: 'Pre-operatorio com ECG aceitavel',
        urgencia: 'eletivo',
        acao: 'Documentar; liberar para cirurgia se demais criterios OK; sem necessidade de parecer',
        tempoMaximo: 'Antes da cirurgia'
      },
      ajuda: 'RCRI >= 2 em cirurgia de alto risco = considerar testes adicionais'
    },
    {
      id: 'step-seguimento',
      pergunta: 'Ha mudanca significativa comparado com ECG de admissao ou previo?',
      sim: {
        resultado: 'Mudanca de ECG durante internacao',
        urgencia: 'urgente',
        acao: 'Correlacionar clinicamente; investigar causa; cardiologia se mudanca preocupante',
        tempoMaximo: '24 horas'
      },
      nao: {
        resultado: 'ECG estavel',
        urgencia: 'rotina',
        acao: 'Documentar; manter seguimento conforme indicacao clinica',
        tempoMaximo: 'Rotina'
      },
      ajuda: 'Mesmo paciente assintomatico pode ter mudanca significativa de ECG'
    }
  ],
  metasQualidade: [
    {
      nome: 'ECG em dor toracica na enfermaria',
      meta: '< 10 minutos',
      referencia: 'Padrao de qualidade hospitalar'
    },
    {
      nome: 'Avaliacao cardiologica pre-operatoria (quando indicada)',
      meta: 'Conclusao em 72h antes de cirurgia eletiva',
      referencia: 'ACC/AHA Perioperative Guidelines'
    },
    {
      nome: 'Documentacao de ECG no prontuario',
      meta: 'Interpretacao documentada em 24h',
      referencia: 'Padrao de qualidade de documentacao'
    }
  ],
  referencias: [
    'Fleisher LA, et al. ACC/AHA Guideline on Perioperative CV Evaluation. Circulation 2014.',
    'Duceppe E, et al. Canadian CV Society Guidelines on Perioperative Risk Assessment. Can J Cardiol 2017.',
    'Kristensen SD, et al. ESC/ESA Guidelines on Non-cardiac Surgery CV Assessment. Eur Heart J 2014.',
    'Drew BJ, et al. AHA Statement on ECG Monitoring in Hospital Settings. Circulation 2004.'
  ]
};

// ============================================================================
// PROTOCOLO 4: APS (Primary Care / Atencao Primaria)
// ============================================================================

const protocoloAPS: ClinicalSettingProtocol = {
  id: 'ecg-protocol-aps',
  setting: 'aps',
  nome: 'Protocolo de ECG na Atencao Primaria (APS)',
  nomeEN: 'Primary Care ECG Protocol',
  descricao: 'Protocolo de interpretacao de ECG para medicos de familia e generalistas, focado em triagem, seguimento de pacientes cronicos, rastreamento pre-operatorio eletivo, e criterios de encaminhamento.',
  caracteristicas: {
    tempoDecisaoTipico: 'Dias a semanas para achados estáveis; horas se urgente',
    recursosDisponiveis: [
      'ECG de 12 derivacoes (pode ser por tele-ECG)',
      'Acesso a eletrocardiograma ambulatorial',
      'Encaminhamento para cardiologia (variável tempo de espera)',
      'SAMU para emergencias'
    ],
    equipeTipica: [
      'Medico de familia/generalista',
      'Enfermeiro(a)',
      'Tecnico de enfermagem (pode fazer ECG)',
      'ACS para busca ativa'
    ],
    volumeECGsDia: '2-10 ECGs/dia dependendo da unidade'
  },
  prioridades: [
    {
      ordem: 1,
      achado: 'Alteracoes isquemicas agudas (supra de ST)',
      descricao: 'Achados de STEMI ou equivalentes em paciente na APS',
      acaoImediata: 'Chamar SAMU imediatamente; AAS; acesso; monitorar',
      tempoMaximo: 'Minutos (transferencia para emergencia/hemodinamica)',
      justificativa: 'STEMI requer reperfusao urgente; papel da APS e identificar e encaminhar rapidamente'
    },
    {
      ordem: 2,
      achado: 'Arritmias potencialmente graves',
      descricao: 'FA com alta resposta, bloqueios avancados, TV',
      acaoImediata: 'Estabilizar se possivel; encaminhar para emergencia se sintomatico',
      tempoMaximo: 'Horas',
      justificativa: 'Limites de recursos da APS exigem encaminhamento para manejo definitivo'
    },
    {
      ordem: 3,
      achado: 'Novo achado que muda conduta',
      descricao: 'Alteracao de ECG descoberta em consulta de rotina',
      acaoImediata: 'Avaliar sintomas; comparar com previo; encaminhar se indicado',
      tempoMaximo: 'Dias a semanas',
      justificativa: 'Achados novos podem indicar doença cardiaca subclínica'
    },
    {
      ordem: 4,
      achado: 'Seguimento de paciente cardiaco cronico',
      descricao: 'ECG de controle em paciente com FA, ICFEr, pos-IAM',
      acaoImediata: 'Comparar com previo; ajustar tratamento se necessario; manter seguimento',
      tempoMaximo: 'Rotina (proximo retorno)',
      justificativa: 'APS e fundamental para continuidade do cuidado cardiovascular'
    },
    {
      ordem: 5,
      achado: 'Pre-operatorio eletivo',
      descricao: 'ECG para cirurgia eletiva de baixo-medio risco',
      acaoImediata: 'Interpretar; definir se libera ou encaminha para cardiologia',
      tempoMaximo: 'Antes da data cirurgica',
      justificativa: 'Evitar encaminhamentos desnecessarios e atraso em cirurgias'
    }
  ],
  tempoDecisao: 'Dias a semanas (rotina); horas (urgente); minutos (emergencia = transferir)',
  criteriosTriagem: [
    {
      id: 'triagem-emergencia-aps',
      achado: 'Qualquer achado de emergencia (STEMI, arritmia instavel)',
      urgencia: 'imediato',
      sinaisClinicosAssociados: [
        'Dor toracica tipica',
        'Dispneia intensa',
        'Sincope',
        'Instabilidade hemodinamica'
      ],
      condutaInicial: [
        'Chamar SAMU 192 imediatamente',
        'AAS 300mg mastigar (se STEMI e nao contraindicado)',
        'Acesso venoso se possivel',
        'Monitorar ate chegada do SAMU'
      ],
      criteriosEscalonamento: [
        'PCR = iniciar RCP',
        'Deterioracao durante espera = suporte basico'
      ],
      destino: 'emergencia'
    },
    {
      id: 'triagem-urgente-aps',
      achado: 'Achado urgente (FA sintomatica, bloqueio sintomatico, isquemia)',
      urgencia: 'urgente',
      sinaisClinicosAssociados: [
        'Palpitacoes persistentes',
        'Dor toracica atipica',
        'Dispneia aos esforços',
        'Pre-sincope'
      ],
      condutaInicial: [
        'Avaliar estabilidade',
        'Se estavel: encaminhar para emergencia ou UPA',
        'Se instavel: SAMU',
        'Documentar ECG e encaminhar com paciente'
      ],
      criteriosEscalonamento: [
        'Instabilizacao = SAMU'
      ],
      destino: 'emergencia'
    },
    {
      id: 'triagem-rotina-aps',
      achado: 'Achado anormal estavel (HVE, BRD, alteracoes inespecificas)',
      urgencia: 'rotina',
      sinaisClinicosAssociados: [
        'Assintomatico ou sintomas minimos',
        'Achado cronico conhecido',
        'Descoberta incidental'
      ],
      condutaInicial: [
        'Comparar com ECG previo se disponivel',
        'Avaliar necessidade de encaminhamento',
        'Solicitar exames complementares (eco, Holter) se indicado',
        'Agendar retorno ou encaminhamento'
      ],
      criteriosEscalonamento: [
        'Sintomas novos',
        'Mudanca no ECG'
      ],
      destino: 'ambulatorio'
    },
    {
      id: 'triagem-fa-estavel-aps',
      achado: 'Fibrilacao atrial cronica com FC controlada',
      urgencia: 'rotina',
      sinaisClinicosAssociados: [
        'FA conhecida',
        'FC em repouso 60-110 bpm',
        'Assintomatico ou sintomas controlados',
        'Em uso de anticoagulacao'
      ],
      condutaInicial: [
        'Verificar FC e sintomas',
        'Revisar anticoagulacao (CHA2DS2-VASc, HAS-BLED)',
        'Verificar funcao renal (ajuste de DOAC)',
        'Verificar adesao medicamentosa'
      ],
      criteriosEscalonamento: [
        'FC descontrolada',
        'Sintomas novos',
        'Sangramento ou dificuldade com anticoagulacao'
      ],
      destino: 'cardiologia'
    },
    {
      id: 'triagem-pre-op-aps',
      achado: 'Pre-operatorio para cirurgia eletiva',
      urgencia: 'eletivo',
      sinaisClinicosAssociados: [
        'Cirurgia de baixo-medio risco',
        'Paciente assintomatico',
        'Boa capacidade funcional (>= 4 METs)'
      ],
      condutaInicial: [
        'Fazer ECG',
        'Comparar com previo',
        'Avaliar capacidade funcional',
        'Calcular RCRI se idade >= 45 ou comorbidades'
      ],
      criteriosEscalonamento: [
        'ECG muito alterado',
        'Sintomas ativos',
        'Capacidade funcional < 4 METs',
        'RCRI >= 2 em cirurgia de risco'
      ],
      destino: 'cardiologia'
    }
  ],
  quandoEncaminhar: [
    {
      id: 'enc-emergencia-supra',
      cenario: 'Supra de ST com clinica de SCA',
      descricao: 'Paciente com dor toracica e ECG com supra de ST',
      urgencia: 'imediato',
      tempoMaximoEncaminhamento: 'SAMU imediato; nao aguardar transporte proprio',
      informacoesNecessarias: [
        'ECG (foto ou copia)',
        'Horario de inicio dos sintomas',
        'Medicacoes administradas (AAS?)',
        'Comorbidades'
      ],
      destino: 'emergencia',
      justificativa: 'STEMI requer ICP ou trombolitico em tempo habil'
    },
    {
      id: 'enc-cardio-urgente',
      cenario: 'Achado urgente mas paciente estavel',
      descricao: 'FA de inicio recente, bloqueio avancado assintomatico, isquemia estavel',
      urgencia: 'urgente',
      tempoMaximoEncaminhamento: '24-72 horas',
      informacoesNecessarias: [
        'ECG atual e previo',
        'Sintomas',
        'Medicacoes em uso',
        'Comorbidades',
        'O que foi tentado na APS'
      ],
      destino: 'cardiologia',
      justificativa: 'Requer avaliacao especializada mas nao emergencial'
    },
    {
      id: 'enc-cardio-rotina',
      cenario: 'Achado anormal para investigacao eletiva',
      descricao: 'HVE, alteracoes de repolarizacao, arritmias assintomaticas',
      urgencia: 'rotina',
      tempoMaximoEncaminhamento: '30-90 dias (conforme disponibilidade)',
      informacoesNecessarias: [
        'ECG atual e previo',
        'Resumo clinico',
        'Exames ja realizados (eco?)',
        'Duvida especifica para o cardiologista'
      ],
      destino: 'ambulatorio',
      justificativa: 'Otimizar regulacao; nao sobrecarregar sistema com urgencias falsas'
    },
    {
      id: 'enc-nao-necessario',
      cenario: 'ECG normal ou alteracao benigna conhecida',
      descricao: 'Repolarizacao precoce, bradicardia sinusal em atleta, achado cronico estavel',
      urgencia: 'eletivo',
      tempoMaximoEncaminhamento: 'Nao necessita encaminhamento',
      informacoesNecessarias: [
        'Documentar no prontuario',
        'Orientar paciente sobre benignidade'
      ],
      destino: 'ambulatorio',
      justificativa: 'Evitar sobrecarga da regulacao e encaminhamentos desnecessarios'
    }
  ],
  oqueFazerEnquantoAguarda: [
    'Documentar achado do ECG no prontuario',
    'Orientar paciente sobre sinais de alerta (dor toracica, dispneia, sincope)',
    'Manter medicacoes cardiovasculares conforme prescrito',
    'Encaminhar para emergencia se sintomas agudos',
    'Manter contato com regulacao para priorizar casos mais urgentes',
    'Oferecer retorno na APS se mudanca de sintomas antes da consulta especializada',
    'Controlar fatores de risco (PA, glicemia, lipideos, tabagismo)',
    'Verificar adesao medicamentosa em pacientes cardiaco cronico'
  ],
  errosComuns: [
    {
      id: 'erro-supra-nao-reconhecer',
      erro: 'Nao reconhecer supra de ST e nao encaminhar urgentemente',
      consequencia: 'Atraso na reperfusao; aumento de mortalidade',
      comoEvitar: 'Conhecer criterios de STEMI; qualquer duvida em paciente com dor toracica = encaminhar',
      exemplo: 'Paciente com "indigestao" e sudorese + supra em V2-V4 = STEMI'
    },
    {
      id: 'erro-encaminhamento-excessivo',
      erro: 'Encaminhar todos os ECGs alterados como urgentes',
      consequencia: 'Sobrecarga do sistema; atraso para quem realmente precisa',
      comoEvitar: 'Estratificar: sintomas + ECG alterado = urgente; ECG alterado isolado = rotina (maioria)',
      exemplo: 'BRD isolado assintomatico = rotina, nao urgente'
    },
    {
      id: 'erro-nao-comparar-previo',
      erro: 'Nao buscar ECG previo para comparacao',
      consequencia: 'Alarmar-se com achado cronico ou perder alteracao nova',
      comoEvitar: 'Sempre buscar ECG previo no prontuario eletronico ou pedir ao paciente',
      exemplo: 'HVE "nova" que ja existia ha 5 anos = seguimento, nao urgencia'
    },
    {
      id: 'erro-fa-sem-anticoagulacao',
      erro: 'Diagnosticar FA e nao iniciar anticoagulacao quando indicada',
      consequencia: 'AVC evitavel',
      comoEvitar: 'Calcular CHA2DS2-VASc em toda FA; se >= 1 (mulher) ou >= 2 (homem) = anticoagular',
      exemplo: 'FA em mulher de 65 anos diabetica = CHA2DS2-VASc = 3 = anticoagular'
    },
    {
      id: 'erro-pre-op-desnecessario',
      erro: 'Encaminhar todo pre-operatorio alterado para cardiologia',
      consequencia: 'Atraso em cirurgias eletivas; sobrecarga de especialistas',
      comoEvitar: 'Capacidade funcional >= 4 METs + baixo risco cirurgico = nao precisa de parecer',
      exemplo: 'BRD cronico em paciente que caminha 2km/dia para cirurgia de hernia = liberar'
    },
    {
      id: 'erro-qt-ignorado',
      erro: 'Nao calcular QTc em pacientes usando farmacos que prolongam QT',
      consequencia: 'Torsades de Pointes evitavel',
      comoEvitar: 'Verificar QTc em usuarios cronicos de antipsicoticos, antidepressivos, antiarritmicos',
      exemplo: 'Paciente em uso de haloperidol + citalopram = calcular QTc periodicamente'
    }
  ],
  checklistRapido: [
    '1. O paciente tem sintomas ativos? (dor, dispneia, sincope, palpitacao)',
    '2. Ha supra de ST? -> SAMU imediato',
    '3. Ha arritmia sintomatica? -> emergencia ou SAMU',
    '4. Comparar com ECG previo: ha mudanca?',
    '5. O achado e novo ou cronico/conhecido?',
    '6. Qual a capacidade funcional do paciente? (>= 4 METs = baixo risco)',
    '7. Se FA: CHA2DS2-VASc calculado? Anticoagulando?',
    '8. Se QT longo: quais farmacos o paciente usa?',
    '9. Precisa de encaminhamento? Se sim, qual urgencia?',
    '10. Documentei o achado e plano no prontuario?'
  ],
  fluxogramaDecisao: [
    {
      id: 'inicio-aps',
      pergunta: 'O paciente tem dor toracica tipica ou outros sintomas agudos (dispneia intensa, sincope)?',
      sim: 'step-emergencia-aps',
      nao: 'step-assintomatico-aps',
      ajuda: 'Dor tipica: aperto/pressao, retroesternal, irradiacao para braco/mandibula, sudorese'
    },
    {
      id: 'step-emergencia-aps',
      pergunta: 'Ha supra de ST >= 1mm em derivacoes contiguas?',
      sim: {
        resultado: 'STEMI - EMERGENCIA',
        urgencia: 'imediato',
        acao: 'SAMU 192 IMEDIATAMENTE; AAS 300mg; acesso venoso; monitorar',
        tempoMaximo: 'SAMU em minutos'
      },
      nao: 'step-outras-emergencias',
      ajuda: 'STEMI = emergencia maxima na APS'
    },
    {
      id: 'step-outras-emergencias',
      pergunta: 'Ha arritmia instavel (TV, FA com RVR e sintomas, bradicardia sintomatica)?',
      sim: {
        resultado: 'Arritmia para emergencia',
        urgencia: 'imediato',
        acao: 'Estabilizar o possivel; SAMU ou transferencia imediata para emergencia',
        tempoMaximo: 'Horas no maximo'
      },
      nao: {
        resultado: 'Sintomas para investigacao urgente',
        urgencia: 'urgente',
        acao: 'Encaminhar para UPA/emergencia para avaliacao; nao manejar na APS',
        tempoMaximo: 'Hoje'
      },
      ajuda: 'APS tem limitacao de recursos; encaminhar se duvida'
    },
    {
      id: 'step-assintomatico-aps',
      pergunta: 'E um ECG pre-operatorio?',
      sim: 'step-pre-op-aps',
      nao: 'step-rotina-aps',
      ajuda: 'Pre-operatorio tem fluxo proprio'
    },
    {
      id: 'step-pre-op-aps',
      pergunta: 'ECG esta normal ou tem apenas alteracoes benignas/conhecidas?',
      sim: {
        resultado: 'Pre-op liberado pela APS',
        urgencia: 'eletivo',
        acao: 'Liberar para cirurgia; documentar; nao precisa de parecer cardiologia',
        tempoMaximo: 'Antes da cirurgia'
      },
      nao: 'step-pre-op-alterado',
      ajuda: 'Alteracoes benignas: bradicardia sinusal, repolarizacao precoce, bloqueio incompleto'
    },
    {
      id: 'step-pre-op-alterado',
      pergunta: 'O paciente tem boa capacidade funcional (>= 4 METs) e cirurgia de baixo risco?',
      sim: {
        resultado: 'Pre-op com alteracao mas baixo risco',
        urgencia: 'eletivo',
        acao: 'Pode liberar; documentar achado; sugerir eco se nao recente',
        tempoMaximo: 'Antes da cirurgia'
      },
      nao: {
        resultado: 'Pre-op para cardiologia',
        urgencia: 'rotina',
        acao: 'Encaminhar para avaliacao cardiologica pre-operatoria',
        tempoMaximo: '1-4 semanas antes da cirurgia'
      },
      ajuda: '>= 4 METs = sobe 2 lances de escada sem parar'
    },
    {
      id: 'step-rotina-aps',
      pergunta: 'Ha alteracao significativa comparado com ECG previo ou e achado novo preocupante?',
      sim: 'step-encaminhamento-aps',
      nao: {
        resultado: 'ECG de seguimento aceitavel',
        urgencia: 'rotina',
        acao: 'Documentar; manter seguimento na APS; proximo ECG conforme indicacao',
        tempoMaximo: 'Proximo retorno'
      },
      ajuda: 'Mudancas novas requerem atencao; achados cronicos estaveis nao'
    },
    {
      id: 'step-encaminhamento-aps',
      pergunta: 'O paciente esta sintomatico (mesmo que leve) ou o achado e de alto risco?',
      sim: {
        resultado: 'Encaminhamento prioritario',
        urgencia: 'urgente',
        acao: 'Encaminhar cardiologia com prioridade; manter seguimento na APS ate consulta',
        tempoMaximo: '2-4 semanas'
      },
      nao: {
        resultado: 'Encaminhamento eletivo',
        urgencia: 'rotina',
        acao: 'Encaminhar cardiologia rotina; solicitar eco se indicado; manter APS',
        tempoMaximo: '1-3 meses'
      },
      ajuda: 'Alto risco: isquemia, arritmia ventricular, bloqueio avancado'
    }
  ],
  metasQualidade: [
    {
      nome: 'ECG na APS em dor toracica',
      meta: '< 10 minutos',
      referencia: 'Linha de cuidado de SCA'
    },
    {
      nome: 'Tempo porta-SAMU se STEMI',
      meta: '< 15 minutos apos identificacao',
      referencia: 'Linha de cuidado de IAMCSST'
    },
    {
      nome: 'Resolubilidade de ECG na APS',
      meta: '>= 70% dos ECGs resolvidos na APS sem encaminhamento',
      referencia: 'Indicador de resolubilidade da APS'
    },
    {
      nome: 'Encaminhamento apropriado',
      meta: '< 20% dos encaminhamentos devolvidos como desnecessarios',
      referencia: 'Indicador de qualidade de regulacao'
    }
  ],
  referencias: [
    'Sociedade Brasileira de Medicina de Familia e Comunidade. Competencias em Cardiologia para APS 2023.',
    'Brasil. Ministerio da Saude. Linha de Cuidado do IAM e Protocolo de Sindromes Coronarianas Agudas 2022.',
    'Sociedade Brasileira de Cardiologia. Diretriz de Avaliacao Cardiovascular Pre-operatoria 2017.',
    'Mant J, et al. Accuracy of ECG for AF Screening in Primary Care. BMJ 2007.',
    'NHS. Clinical Knowledge Summaries: ECG Interpretation in Primary Care 2023.'
  ]
};

// ============================================================================
// CONSOLIDACAO DE TODOS OS PROTOCOLOS
// ============================================================================

export const protocolsBySetting: ClinicalSettingProtocol[] = [
  protocoloEmergencia,
  protocoloUTI,
  protocoloEnfermaria,
  protocoloAPS
];

// ============================================================================
// FUNCOES DE SUPORTE
// ============================================================================

/**
 * Retorna o protocolo para um determinado cenário clínico
 * @param setting 'emergencia' | 'uti' | 'enfermaria' | 'aps'
 */
export function getProtocolBySetting(setting: ClinicalSetting): ClinicalSettingProtocol | undefined {
  return protocolsBySetting.find(p => p.setting === setting);
}

/**
 * Retorna os criterios de triagem por cenario e urgencia
 * @param setting Cenário clínico
 * @param urgency Nivel de urgência (opcional)
 */
export function getTriageCriteria(
  setting: ClinicalSetting,
  urgency?: UrgencyLevel
): TriageCriteria[] {
  const protocol = getProtocolBySetting(setting);
  if (!protocol) return [];

  if (urgency) {
    return protocol.criteriosTriagem.filter(c => c.urgencia === urgency);
  }

  return protocol.criteriosTriagem;
}

/**
 * Determina se um achado de ECG deve ser encaminhado de um determinado cenário
 * @param setting Cenário clínico atual
 * @param findings Lista de achados de ECG
 */
export function shouldReferFromSetting(
  setting: ClinicalSetting,
  findings: string[]
): {
  shouldRefer: boolean;
  urgency: UrgencyLevel;
  destination: ReferralDestination;
  rationale: string;
  matchedCriteria: TriageCriteria[];
} {
  const protocol = getProtocolBySetting(setting);
  if (!protocol) {
    return {
      shouldRefer: false,
      urgency: 'rotina',
      destination: 'ambulatorio',
      rationale: 'Cenario nao encontrado',
      matchedCriteria: []
    };
  }

  const normalizedFindings = findings.map(f =>
    f.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  );

  const matchedCriteria: TriageCriteria[] = [];

  // Buscar correspondencias nos criterios de triagem
  for (const criteria of protocol.criteriosTriagem) {
    const normalizedAchado = criteria.achado
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    for (const finding of normalizedFindings) {
      if (
        normalizedAchado.includes(finding) ||
        finding.includes(normalizedAchado)
      ) {
        matchedCriteria.push(criteria);
        break;
      }
    }
  }

  if (matchedCriteria.length === 0) {
    return {
      shouldRefer: false,
      urgency: 'rotina',
      destination: 'ambulatorio',
      rationale: 'Nenhum criterio de encaminhamento especifico encontrado',
      matchedCriteria: []
    };
  }

  // Determinar a urgencia mais alta
  const urgencyOrder: Record<UrgencyLevel, number> = {
    imediato: 0,
    urgente: 1,
    rotina: 2,
    eletivo: 3
  };

  matchedCriteria.sort((a, b) => urgencyOrder[a.urgencia] - urgencyOrder[b.urgencia]);
  const highestUrgency = matchedCriteria[0];

  // Se e eletivo ou rotina em cenario ambulatorial (APS), pode nao precisar encaminhar
  const needsReferral =
    highestUrgency.urgencia === 'imediato' ||
    highestUrgency.urgencia === 'urgente' ||
    (highestUrgency.urgencia === 'rotina' && setting !== 'aps');

  return {
    shouldRefer: needsReferral,
    urgency: highestUrgency.urgencia,
    destination: highestUrgency.destino,
    rationale: highestUrgency.achado,
    matchedCriteria
  };
}

/**
 * Retorna os erros comuns para um determinado cenário
 * @param setting Cenário clínico
 */
export function getCommonMistakes(setting: ClinicalSetting): CommonMistake[] {
  const protocol = getProtocolBySetting(setting);
  return protocol?.errosComuns || [];
}

/**
 * Retorna o checklist rapido para um determinado cenário
 * @param setting Cenário clínico
 */
export function getQuickChecklist(setting: ClinicalSetting): string[] {
  const protocol = getProtocolBySetting(setting);
  return protocol?.checklistRapido || [];
}

/**
 * Retorna o fluxograma de decisao para um determinado cenário
 * @param setting Cenário clínico
 */
export function getDecisionFlowchart(setting: ClinicalSetting): DecisionNode[] {
  const protocol = getProtocolBySetting(setting);
  return protocol?.fluxogramaDecisao || [];
}

/**
 * Retorna as prioridades para um determinado cenário
 * @param setting Cenário clínico
 */
export function getPriorities(setting: ClinicalSetting): Priority[] {
  const protocol = getProtocolBySetting(setting);
  return protocol?.prioridades || [];
}

/**
 * Retorna os cenarios de encaminhamento para um determinado setting
 * @param setting Cenário clínico
 */
export function getReferralScenarios(setting: ClinicalSetting): ReferralScenario[] {
  const protocol = getProtocolBySetting(setting);
  return protocol?.quandoEncaminhar || [];
}

/**
 * Retorna as metas de qualidade para um determinado cenário
 * @param setting Cenário clínico
 */
export function getQualityMetrics(setting: ClinicalSetting): { nome: string; meta: string; referencia: string }[] {
  const protocol = getProtocolBySetting(setting);
  return protocol?.metasQualidade || [];
}

/**
 * Busca protocolos por termo de busca
 * @param searchTerm Termo de busca
 */
export function searchProtocols(searchTerm: string): {
  setting: ClinicalSetting;
  matches: {
    type: 'prioridade' | 'triagem' | 'encaminhamento' | 'erro' | 'checklist';
    content: string;
  }[];
}[] {
  const normalized = searchTerm
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const results: {
    setting: ClinicalSetting;
    matches: { type: 'prioridade' | 'triagem' | 'encaminhamento' | 'erro' | 'checklist'; content: string }[];
  }[] = [];

  for (const protocol of protocolsBySetting) {
    const matches: { type: 'prioridade' | 'triagem' | 'encaminhamento' | 'erro' | 'checklist'; content: string }[] = [];

    // Buscar em prioridades
    for (const p of protocol.prioridades) {
      const normalizedAchado = p.achado
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      if (normalizedAchado.includes(normalized)) {
        matches.push({ type: 'prioridade', content: p.achado });
      }
    }

    // Buscar em criterios de triagem
    for (const t of protocol.criteriosTriagem) {
      const normalizedAchado = t.achado
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      if (normalizedAchado.includes(normalized)) {
        matches.push({ type: 'triagem', content: t.achado });
      }
    }

    // Buscar em cenarios de encaminhamento
    for (const e of protocol.quandoEncaminhar) {
      const normalizedCenario = e.cenario
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      if (normalizedCenario.includes(normalized)) {
        matches.push({ type: 'encaminhamento', content: e.cenario });
      }
    }

    // Buscar em erros comuns
    for (const err of protocol.errosComuns) {
      const normalizedErro = err.erro
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      if (normalizedErro.includes(normalized)) {
        matches.push({ type: 'erro', content: err.erro });
      }
    }

    if (matches.length > 0) {
      results.push({ setting: protocol.setting, matches });
    }
  }

  return results;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  protocolsBySetting,
  getProtocolBySetting,
  getTriageCriteria,
  shouldReferFromSetting,
  getCommonMistakes,
  getQuickChecklist,
  getDecisionFlowchart,
  getPriorities,
  getReferralScenarios,
  getQualityMetrics,
  searchProtocols
};
