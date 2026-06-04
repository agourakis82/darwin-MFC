/**
 * ECG RED FLAGS - DARWIN-MFC
 * ==========================
 *
 * Base de dados abrangente de alertas/red flags eletrocardiograficos
 * para medicos nao-cardiologistas na Atencao Primaria.
 *
 * Categorizacao:
 * - EMERGENCIA: Acao imediata (minutos)
 * - URGENTE: Acao em horas
 * - ALERTA: Acao em 24-48h
 *
 * Referencias principais:
 * - AHA/ACC/HRS Guidelines 2023
 * - ESC Guidelines 2022-2023
 * - Sociedade Brasileira de Cardiologia 2024
 */

import { Citation } from '../../../types/references';

// ============================================================================
// INTERFACES
// ============================================================================

export type ECGRedFlagCategoria = 'emergencia' | 'urgente' | 'alerta';

export type UrgencyLevel = 1 | 2 | 3 | 4; // 1=rotina, 2=24-48h, 3=horas, 4=imediato

export interface ECGRedFlag {
  id: string;
  nome: string;
  nomeInternacional: string;
  categoria: ECGRedFlagCategoria;

  // ECG Criteria
  criteriosIdentificacao: string[];
  imagem?: string; // reference image path

  // Clinical Significance
  significadoClinico: string;
  mortalidadeSeNaoTratado: string;

  // Action
  urgencia: UrgencyLevel;
  tempoParaAcao: string; // "imediato", "1-2h", "24h"

  // What to do
  acaoImediata: string[];
  naoFazer: string[]; // what NOT to do
  quemChamar: string[];

  // For non-specialists
  dicasReconhecimento: string[];
  errosComuns: string[];

  // Ontology IDs
  snomedCT?: string;
  icd10?: string[];

  citations: Citation[];
}

// ============================================================================
// EMERGENCIAS - Acao em minutos
// ============================================================================

const emergencias: ECGRedFlag[] = [
  // ---------------------------------------------------------------------------
  // IAMCSST - Infarto com Supradesnivelamento de ST
  // ---------------------------------------------------------------------------
  {
    id: 'iamcsst-anterior',
    nome: 'IAMCSST Anterior Extenso',
    nomeInternacional: 'Anterior STEMI',
    categoria: 'emergencia',
    criteriosIdentificacao: [
      'Supra de ST >= 2mm em V1-V4 (pelo menos 2 derivacoes contiguas)',
      'Supra de ST >= 1mm em V5-V6, DI, aVL',
      'Infra de ST reciproco em derivacoes inferiores (DII, DIII, aVF)',
      'Ondas Q patologicas podem estar presentes (>40ms ou >25% da amplitude do QRS)',
      'Inversao de onda T pode ocorrer na fase de reperfusao',
      'Considerar supra em V7-V9 para parede posterior'
    ],
    imagem: '/images/ecg/iamcsst-anterior.png',
    significadoClinico: 'Oclusao aguda da arteria descendente anterior (DA). Compromete grande area de miocardio ventricular esquerdo, incluindo septo e parede anterior. Alto risco de choque cardiogenico, arritmias ventriculares e insuficiencia cardiaca aguda.',
    mortalidadeSeNaoTratado: '30-50% na primeira hora; >80% sem reperfusao em 12h',
    urgencia: 4,
    tempoParaAcao: 'imediato',
    acaoImediata: [
      'Chamar SAMU/emergencia IMEDIATAMENTE',
      'AAS 300mg mastigavel (se nao houver contraindicacao)',
      'Clopidogrel 300-600mg OU Ticagrelor 180mg',
      'Acesso venoso calibroso',
      'Monitorização cardiaca continua',
      'Oxigenio apenas se SatO2 < 90%',
      'Nitrato sublingual (se PAS > 90 e sem uso de sildenafil nas ultimas 24h)',
      'Morfina 2-4mg IV se dor refrataria (usar com cautela - pode mascarar sintomas)',
      'Preparar para transferencia IMEDIATA para centro com ICP',
      'Se tempo porta-balao > 120min: considerar trombolitico'
    ],
    naoFazer: [
      'NAO administrar nitrato se PAS < 90 mmHg',
      'NAO dar nitrato se uso de inibidor de PDE5 (sildenafil, tadalafil) nas ultimas 24-48h',
      'NAO atrasar transferencia para centro de hemodinamica',
      'NAO fazer betabloqueador IV em paciente instavel',
      'NAO esperar resultado de troponina para iniciar tratamento',
      'NAO administrar oxigenio rotineiramente se SatO2 normal',
      'NAO dar AINE (alem do AAS)'
    ],
    quemChamar: [
      'SAMU 192 (Brasil)',
      'Cardiologista de plantao',
      'Centro de hemodinamica mais proximo',
      'UTI Coronariana'
    ],
    dicasReconhecimento: [
      'Olhe PRIMEIRO para V1-V4: supra em forma de "ponto" ou "cupula" e patognomonico',
      'Infra reciproco em parede inferior CONFIRMA o diagnostico',
      'Nao confunda com padrao de repolarizacao precoce (comum em jovens, atletico)',
      'BRE novo na presenca de dor toracica = equivalente de IAMCSST',
      'Supra de ST em aVR com infra difuso = obstrucao de tronco de coronaria esquerda'
    ],
    errosComuns: [
      'Confundir com pericardite (supra difuso, sem infra reciproco)',
      'Esperar troponina para confirmar - PERDA DE TEMPO CRITICO',
      'Nao reconhecer equivalentes de IAMCSST (BRE novo, padrao de de Winter)',
      'Subestimar infra de ST em V1-V3 (pode ser IAM posterior)',
      'Confundir com sindrome de Takotsubo (contexto clinico diferente)'
    ],
    snomedCT: '401303003',
    icd10: ['I21.0', 'I21.1'],
    citations: [
      { refId: 'aha-stemi-2023', title: 'AHA/ACC STEMI Guidelines 2023', year: 2023 },
      { refId: 'esc-stemi-2023', title: 'ESC Guidelines for STEMI Management 2023', year: 2023 },
      { refId: 'sbc-iam-2024', title: 'Diretriz SBC IAM com Supra de ST 2024', year: 2024 }
    ]
  },
  {
    id: 'iamcsst-inferior',
    nome: 'IAMCSST Inferior',
    nomeInternacional: 'Inferior STEMI',
    categoria: 'emergencia',
    criteriosIdentificacao: [
      'Supra de ST >= 1mm em DII, DIII, aVF (pelo menos 2 derivacoes)',
      'Infra de ST reciproco em DI, aVL (altamente especifico)',
      'DIII > DII sugere envolvimento de arteria coronaria direita',
      'DII > DIII sugere envolvimento de arteria circunflexa',
      'Verificar V4R para IAM de ventriculo direito concomitante'
    ],
    imagem: '/images/ecg/iamcsst-inferior.png',
    significadoClinico: 'Oclusao da arteria coronaria direita (80%) ou circunflexa (20%). Risco de bradicardia sinusal, BAV, hipotensao por envolvimento de VD.',
    mortalidadeSeNaoTratado: '20-30% na fase aguda',
    urgencia: 4,
    tempoParaAcao: 'imediato',
    acaoImediata: [
      'Chamar SAMU/emergencia IMEDIATAMENTE',
      'AAS 300mg mastigavel',
      'Clopidogrel 300-600mg OU Ticagrelor 180mg',
      'FAZER ECG COM V3R e V4R para excluir IAM de VD',
      'Se IAM de VD: EVITAR nitratos e diureticos (preload dependente)',
      'Se IAM de VD com hipotensao: SF 0.9% 250-500mL em bolus',
      'Monitorização cardiaca (alto risco de bradicardia/BAV)',
      'Atropina disponivel (bradicardia sinusal frequente)'
    ],
    naoFazer: [
      'NAO dar nitrato antes de excluir IAM de VD (pode causar hipotensao grave)',
      'NAO dar diuretico se suspeita de IAM de VD',
      'NAO atrasar transferencia',
      'NAO esquecer de fazer V3R/V4R',
      'NAO ignorar bradicardia - pode necessitar de marcapasso temporario'
    ],
    quemChamar: [
      'SAMU 192',
      'Cardiologista de plantao',
      'Centro de hemodinamica'
    ],
    dicasReconhecimento: [
      'Supra em DII, DIII, aVF com infra em DI, aVL = IAM inferior confirmado',
      'Paciente pode ter sintomas vagais: nausea, vomito, bradicardia, hipotensao',
      'SEMPRE fazer V3R/V4R se IAM inferior (40% tem envolvimento de VD)',
      'Se supra em V4R >= 1mm = IAM de VD'
    ],
    errosComuns: [
      'Esquecer de fazer V3R/V4R e perder IAM de VD',
      'Dar nitrato e causar hipotensao grave em IAM de VD',
      'Confundir com embolia pulmonar (S1Q3T3 e diferente)',
      'Subestimar bradiarritmias'
    ],
    snomedCT: '401314000',
    icd10: ['I21.1', 'I21.2'],
    citations: [
      { refId: 'aha-stemi-2023', title: 'AHA/ACC STEMI Guidelines 2023', year: 2023 },
      { refId: 'esc-stemi-2023', title: 'ESC Guidelines for STEMI Management 2023', year: 2023 }
    ]
  },
  {
    id: 'iamcsst-lateral',
    nome: 'IAMCSST Lateral',
    nomeInternacional: 'Lateral STEMI',
    categoria: 'emergencia',
    criteriosIdentificacao: [
      'Supra de ST >= 1mm em DI, aVL (parede lateral alta)',
      'Supra de ST >= 1mm em V5, V6 (parede lateral baixa)',
      'Infra de ST reciproco em DIII, aVF',
      'Pode estar associado a IAM anterior (anterior extenso)'
    ],
    imagem: '/images/ecg/iamcsst-lateral.png',
    significadoClinico: 'Oclusao de ramo diagonal da DA ou arteria circunflexa. Frequentemente associado a IAM anterior ou inferior, aumentando a area de necrose.',
    mortalidadeSeNaoTratado: '25-35% na fase aguda',
    urgencia: 4,
    tempoParaAcao: 'imediato',
    acaoImediata: [
      'Chamar SAMU/emergencia IMEDIATAMENTE',
      'AAS 300mg mastigavel',
      'Clopidogrel 300-600mg OU Ticagrelor 180mg',
      'Acesso venoso calibroso',
      'Monitorização cardiaca',
      'Transferencia imediata para ICP'
    ],
    naoFazer: [
      'NAO atrasar reperfusao',
      'NAO dar nitrato se hipotensao',
      'NAO subestimar IAM lateral isolado'
    ],
    quemChamar: [
      'SAMU 192',
      'Cardiologista',
      'Centro de hemodinamica'
    ],
    dicasReconhecimento: [
      'Lateral alto: DI, aVL (parede lateral alta - circunflexa/diagonal)',
      'Lateral baixo: V5, V6',
      'Infra reciproco em inferiores ajuda a confirmar'
    ],
    errosComuns: [
      'Perder IAM lateral alto (so olhar derivacoes precordiais)',
      'Confundir com alteracao de repolarizacao por HVE'
    ],
    snomedCT: '401306006',
    icd10: ['I21.2'],
    citations: [
      { refId: 'aha-stemi-2023', title: 'AHA/ACC STEMI Guidelines 2023', year: 2023 }
    ]
  },
  {
    id: 'iamcsst-posterior',
    nome: 'IAMCSST Posterior',
    nomeInternacional: 'Posterior STEMI',
    categoria: 'emergencia',
    criteriosIdentificacao: [
      'Infra de ST >= 1mm em V1-V3 (IMAGEM EM ESPELHO)',
      'Ondas R proeminentes em V1-V2 (>= R/S ratio > 1)',
      'Onda T positiva e proeminente em V1-V3',
      'SUPRA de ST em V7-V9 (derivacoes posteriores) >= 0.5mm',
      'Frequentemente associado a IAM inferior'
    ],
    imagem: '/images/ecg/iamcsst-posterior.png',
    significadoClinico: 'Oclusao da arteria circunflexa ou coronaria direita. Frequentemente subdiagnosticado por nao aparecer como supra de ST nas derivacoes convencionais.',
    mortalidadeSeNaoTratado: '25-30%',
    urgencia: 4,
    tempoParaAcao: 'imediato',
    acaoImediata: [
      'SUSPEITAR em todo infra de ST V1-V3 com dor toracica tipica',
      'FAZER derivacoes posteriores (V7, V8, V9)',
      'Chamar SAMU/emergencia',
      'AAS + antiagregante P2Y12',
      'Transferencia para ICP'
    ],
    naoFazer: [
      'NAO descartar IAM so porque nao ha supra de ST nas derivacoes convencionais',
      'NAO confundir com alteracao inespecifica',
      'NAO atrasar reperfusao'
    ],
    quemChamar: [
      'SAMU 192',
      'Cardiologista',
      'Centro de hemodinamica'
    ],
    dicasReconhecimento: [
      'SEGREDO: Infra em V1-V3 = "vire o ECG de cabeca para baixo" e vera supra',
      'Ondas R altas em V1-V2 = ondas Q em espelho',
      'SEMPRE faca V7-V9 se suspeita clinica + infra em V1-V3'
    ],
    errosComuns: [
      'Nao reconhecer a imagem em espelho',
      'Nao fazer derivacoes posteriores',
      'Diagnosticar erroneamente como IAMSST (diferente conduta)'
    ],
    snomedCT: '401307002',
    icd10: ['I21.2', 'I21.9'],
    citations: [
      { refId: 'esc-stemi-2023', title: 'ESC Guidelines for STEMI Management 2023', year: 2023 }
    ]
  },

  // ---------------------------------------------------------------------------
  // ARRITMIAS MALIGNAS
  // ---------------------------------------------------------------------------
  {
    id: 'tv-sustentada',
    nome: 'Taquicardia Ventricular Sustentada',
    nomeInternacional: 'Sustained Ventricular Tachycardia',
    categoria: 'emergencia',
    criteriosIdentificacao: [
      'Ritmo regular com FC >= 100 bpm (geralmente 150-250 bpm)',
      'QRS alargado >= 120ms (geralmente >= 140ms)',
      'Duracao > 30 segundos OU necessitando intervencao por instabilidade',
      'Dissociacao AV (ondas P independentes do QRS) - patognomonico',
      'Batimentos de fusao ou captura - confirma origem ventricular',
      'Concordancia precordial (todos QRS positivos ou negativos em V1-V6)',
      'Eixo extremo ("no mans land": -90 a -180 graus)'
    ],
    imagem: '/images/ecg/tv-sustentada.png',
    significadoClinico: 'Arritmia ventricular potencialmente letal. Pode degenerar para fibrilacao ventricular. Frequentemente associada a cardiopatia estrutural (pos-IAM, miocardiopatia).',
    mortalidadeSeNaoTratado: '80-90% se degenerar para FV',
    urgencia: 4,
    tempoParaAcao: 'imediato',
    acaoImediata: [
      'AVALIAR ESTABILIDADE HEMODINAMICA IMEDIATAMENTE',
      'SE INSTAVEL (hipotensao, dor toracica, dispneia, alteracao consciencia):',
      '  - Cardioversao eletrica sincronizada 100-200J bifasico',
      '  - Sedacao se paciente consciente (Midazolam 2-5mg IV)',
      'SE ESTAVEL:',
      '  - Amiodarona 150mg IV em 10min, depois 1mg/min por 6h',
      '  - OU Lidocaina 1-1.5mg/kg IV bolus',
      'Preparar desfibrilador',
      'Acesso venoso calibroso',
      'Corrigir disturbios eletroliticos (K+, Mg2+)',
      'Chamar cardiologista/emergencia'
    ],
    naoFazer: [
      'NAO usar adenosina (pode precipitar FV)',
      'NAO usar verapamil ou diltiazem (pode causar colapso hemodinamico)',
      'NAO demorar para cardioverter se paciente instavel',
      'NAO confundir com TSV com aberrancia (na duvida, trate como TV)'
    ],
    quemChamar: [
      'Cardiologista/arritmologista URGENTE',
      'Equipe de emergencia',
      'UTI'
    ],
    dicasReconhecimento: [
      'REGRA: Taquicardia de QRS largo = TV ate que se prove o contrario',
      'Criterios de Brugada para diferenciar de TSV com aberrancia',
      'Dissociacao AV (ondas P "marchando" independentes) = TV',
      'Se historia de cardiopatia estrutural = provavelmente TV'
    ],
    errosComuns: [
      'Tratar como TSV e dar verapamil (fatal)',
      'Esperar demais para cardioverter paciente instavel',
      'Nao reconhecer TV monomorfica (parece "organizada")',
      'Confundir artefato com TV'
    ],
    snomedCT: '426882007',
    icd10: ['I47.2'],
    citations: [
      { refId: 'aha-arritmias-2023', title: 'AHA Guidelines Ventricular Arrhythmias 2023', year: 2023 },
      { refId: 'esc-arritmias-2022', title: 'ESC Guidelines for Ventricular Arrhythmias and SCD 2022', year: 2022 }
    ]
  },
  {
    id: 'fibrilacao-ventricular',
    nome: 'Fibrilacao Ventricular',
    nomeInternacional: 'Ventricular Fibrillation',
    categoria: 'emergencia',
    criteriosIdentificacao: [
      'Atividade eletrica CAOTICA, completamente desorganizada',
      'Sem QRS, ondas P ou T identificaveis',
      'Ondulacoes irregulares de amplitude e frequencia variaveis',
      'FV fina: ondulacoes < 3mm',
      'FV grossa: ondulacoes > 3mm (melhor prognostico para desfibrilacao)',
      'PACIENTE ESTA EM PCR - SEM PULSO'
    ],
    imagem: '/images/ecg/fv.png',
    significadoClinico: 'PARADA CARDIORRESPIRATORIA. Sem atividade mecanica efetiva do coracao. Morte em minutos sem intervencao.',
    mortalidadeSeNaoTratado: '100% - morte em 4-6 minutos',
    urgencia: 4,
    tempoParaAcao: 'imediato',
    acaoImediata: [
      'INICIAR RCP IMEDIATAMENTE - compressoes de alta qualidade',
      'DESFIBRILACAO assim que disponivel - NAO SINCRONIZAR',
      'Choque de 200J bifasico (ou 360J monofasico)',
      'RCP por 2 minutos apos choque, depois reavaliar ritmo',
      'Adrenalina 1mg IV/IO a cada 3-5 minutos',
      'Amiodarona 300mg IV/IO apos 3º choque (depois 150mg)',
      'Identificar e tratar causas reversiveis (5Hs e 5Ts)',
      'Intubacao nao deve interromper compressoes'
    ],
    naoFazer: [
      'NAO sincronizar o choque (nao ha QRS para sincronizar)',
      'NAO interromper compressoes por mais de 10 segundos',
      'NAO atrasar desfibrilacao para intubar',
      'NAO desistir precocemente (FV tem bom prognostico se tratada rapido)'
    ],
    quemChamar: [
      'Equipe de PCR/Codigo Azul',
      'SAMU 192',
      'UTI'
    ],
    dicasReconhecimento: [
      'ECG completamente caotico + paciente sem pulso = FV',
      'NAO confundir com artefato de movimento - CHECAR PULSO',
      'FV grossa responde melhor a desfibrilacao que FV fina'
    ],
    errosComuns: [
      'Confundir com artefato e nao iniciar RCP',
      'Sincronizar o desfibrilador (deve ser NAO sincronizado)',
      'Compressoes de ma qualidade ou interrupcoes frequentes',
      'Nao buscar causas reversiveis'
    ],
    snomedCT: '71908006',
    icd10: ['I49.0'],
    citations: [
      { refId: 'aha-acls-2020', title: 'AHA ACLS Guidelines 2020', year: 2020 },
      { refId: 'ilcor-2023', title: 'ILCOR Consensus on CPR 2023', year: 2023 }
    ]
  },
  {
    id: 'torsades-de-pointes',
    nome: 'Torsades de Pointes',
    nomeInternacional: 'Torsades de Pointes',
    categoria: 'emergencia',
    criteriosIdentificacao: [
      'Taquicardia ventricular POLIMORFICA',
      'QRS "girando" em torno da linha isoeletrica',
      'Mudanca progressiva da polaridade do QRS',
      'Aspecto de "torcao" caracteristico',
      'FC 150-300 bpm',
      'Geralmente autolimitada mas pode degenerar para FV',
      'QTc PROLONGADO no ECG basal (antes do episodio) > 500ms'
    ],
    imagem: '/images/ecg/torsades.png',
    significadoClinico: 'TV polimorfica associada a QT longo. Causas: farmacos (antiarritmicos classe III, psicofarmacos, macrolideos), disturbios eletroliticos (hipoK, hipoMg), sindrome do QT longo congenita.',
    mortalidadeSeNaoTratado: '70-80% se degenerar para FV',
    urgencia: 4,
    tempoParaAcao: 'imediato',
    acaoImediata: [
      'SE INSTAVEL: Desfibrilacao NAO sincronizada',
      'SULFATO DE MAGNESIO 2g IV em 1-2 minutos (mesmo com Mg normal)',
      'Corrigir hipocalemia (K+ alvo > 4.5 mEq/L)',
      'SUSPENDER todos os farmacos que prolongam QT',
      'Se bradicardia-dependente: aumentar FC com isoproterenol ou marcapasso',
      'Overdrive pacing pode suprimir episodios recorrentes',
      'NAO usar amiodarona (prolonga QT)'
    ],
    naoFazer: [
      'NAO usar AMIODARONA (prolonga QT e piora torsades)',
      'NAO usar procainamida ou outros antiarritmicos classe III',
      'NAO usar sotalol',
      'NAO esquecer de suspender farmacos causadores'
    ],
    quemChamar: [
      'Cardiologista/arritmologista URGENTE',
      'UTI',
      'Equipe de emergencia'
    ],
    dicasReconhecimento: [
      'TV "girando" = Torsades ate que se prove o contrario',
      'Olhe o QTc no ECG basal (antes do episodio) - se > 500ms, confirma',
      'Diferente de TV monomorfica: QRS mudam de polaridade',
      'Geralmente episodios curtos e recorrentes antes de FV sustentada'
    ],
    errosComuns: [
      'Tratar como TV comum com amiodarona (PIORA)',
      'Nao dosar/corrigir K e Mg',
      'Nao identificar farmacos causadores',
      'Nao reconhecer sindrome do QT longo congenita'
    ],
    snomedCT: '74615001',
    icd10: ['I47.2'],
    citations: [
      { refId: 'aha-qt-2023', title: 'AHA Statement on Drug-Induced QT Prolongation 2023', year: 2023 },
      { refId: 'esc-arritmias-2022', title: 'ESC Guidelines for Ventricular Arrhythmias and SCD 2022', year: 2022 }
    ]
  },
  {
    id: 'bav-3-grau',
    nome: 'Bloqueio Atrioventricular de 3 Grau (BAVT)',
    nomeInternacional: 'Third-Degree AV Block / Complete Heart Block',
    categoria: 'emergencia',
    criteriosIdentificacao: [
      'DISSOCIACAO AV COMPLETA: ondas P e QRS completamente independentes',
      'Frequencia atrial (ondas P) > frequencia ventricular (QRS)',
      'Intervalo PP regular, intervalo RR regular, mas SEM relacao entre eles',
      'QRS pode ser estreito (escape juncional, FC 40-60) ou largo (escape ventricular, FC 20-40)',
      'Escape ventricular: QRS largo, FC muito baixa, pior prognostico'
    ],
    imagem: '/images/ecg/bavt.png',
    significadoClinico: 'Interrupcao completa da conducao AV. Causas: IAM inferior (geralmente transitorio), degeneracao do sistema de conducao, drogas (digoxina, BB, BCC), pos-operatorio cardiaco, doenca de Lyme.',
    mortalidadeSeNaoTratado: '40-60% se escape ventricular instavel',
    urgencia: 4,
    tempoParaAcao: 'imediato',
    acaoImediata: [
      'Avaliar estabilidade hemodinamica (PA, perfusao, sintomas)',
      'SE INSTAVEL:',
      '  - Atropina 0.5mg IV (pode repetir ate 3mg) - menos efetivo se escape ventricular',
      '  - Marcapasso transcutaneo IMEDIATO',
      '  - Dopamina 5-20mcg/kg/min OU Adrenalina 2-10mcg/min se necessario',
      'SE ESTAVEL: monitorizar e preparar marcapasso',
      'Suspender drogas que bloqueiam no AV (BB, BCC, digoxina)',
      'Investigar causa (IAM? Medicamentos? Infeccao?)',
      'Encaminhar para marcapasso transvenoso/definitivo'
    ],
    naoFazer: [
      'NAO confiar apenas em atropina se QRS largo (escape ventricular)',
      'NAO atrasar marcapasso transcutaneo em paciente instavel',
      'NAO dar drogas que bloqueiam no AV',
      'NAO ignorar possibilidade de IAM inferior associado'
    ],
    quemChamar: [
      'Cardiologista URGENTE',
      'Equipe de emergencia',
      'UTI/UCO'
    ],
    dicasReconhecimento: [
      'Ondas P "marchando" no seu proprio ritmo, QRS no seu ritmo = BAVT',
      'Conte as ondas P, conte os QRS - se nao ha relacao, e BAVT',
      'FC muito baixa (30-40 bpm) com QRS largo = escape ventricular = GRAVE',
      'No IAM inferior, BAVT geralmente e transitorio (dias)'
    ],
    errosComuns: [
      'Confundir com BAV 2 grau Mobitz II (que tem algumas ondas P conduzidas)',
      'Nao reconhecer dissociacao AV',
      'Confiar demais em atropina quando escape e ventricular',
      'Nao identificar IAM inferior associado'
    ],
    snomedCT: '27885002',
    icd10: ['I44.2'],
    citations: [
      { refId: 'esc-bradiarritmias-2021', title: 'ESC Guidelines on Cardiac Pacing and CRT 2021', year: 2021 },
      { refId: 'aha-bradiarritmias-2023', title: 'AHA Bradycardia and Conduction Delay Guidelines 2023', year: 2023 }
    ]
  },
  {
    id: 'parada-sinusal-prolongada',
    nome: 'Parada Sinusal Prolongada / Assistolia Sinusal',
    nomeInternacional: 'Prolonged Sinus Pause / Sinus Arrest',
    categoria: 'emergencia',
    criteriosIdentificacao: [
      'Ausencia de ondas P por > 3 segundos',
      'Pausa NAO e multiplo do intervalo PP anterior (diferente de bloqueio SA)',
      'Pode haver escape juncional ou ventricular',
      'Se nenhum escape: assistolia e PCR',
      'Frequentemente precedida por bradicardia sinusal'
    ],
    imagem: '/images/ecg/parada-sinusal.png',
    significadoClinico: 'Falencia do no sinusal em gerar impulsos. Causas: doenca do no sinusal, drogas (BB, BCC, digoxina), hipercalemia, hipotireoidismo, apneia do sono. Se prolongada, pode causar sincope ou PCR.',
    mortalidadeSeNaoTratado: 'Variavel; se assistolia sustentada = 100%',
    urgencia: 4,
    tempoParaAcao: 'imediato',
    acaoImediata: [
      'SE PCR (assistolia): Iniciar RCP, protocolo de assistolia',
      'SE com pulso mas sintomatico:',
      '  - Atropina 0.5-1mg IV',
      '  - Marcapasso transcutaneo se nao responder',
      '  - Adrenalina/dopamina se necessario',
      'Suspender drogas bradicardizantes',
      'Monitorização continua',
      'Investigar causa (dosar TSH, K+, digoxina se em uso)'
    ],
    naoFazer: [
      'NAO ignorar pausas > 3 segundos',
      'NAO esquecer de suspender drogas causadoras',
      'NAO confundir com artefato (checar eletrodos, checar pulso)'
    ],
    quemChamar: [
      'Cardiologista',
      'Equipe de emergencia se instavel'
    ],
    dicasReconhecimento: [
      'Pausa longa SEM ondas P = parada sinusal',
      'Se a pausa e multiplo exato do PP normal = bloqueio sinoatrial (diferente)',
      'Cheque se tem escape (QRS apos a pausa)'
    ],
    errosComuns: [
      'Confundir com BAV ou bloqueio SA',
      'Nao reconhecer pausas clinicamente significativas',
      'Confundir artefato com assistolia'
    ],
    snomedCT: '60423000',
    icd10: ['I45.5'],
    citations: [
      { refId: 'esc-bradiarritmias-2021', title: 'ESC Guidelines on Cardiac Pacing and CRT 2021', year: 2021 }
    ]
  }
];

// ============================================================================
// URGENTES - Acao em horas
// ============================================================================

const urgentes: ECGRedFlag[] = [
  {
    id: 'iamsst-alto-risco',
    nome: 'IAMSST de Alto Risco',
    nomeInternacional: 'High-Risk NSTEMI',
    categoria: 'urgente',
    criteriosIdentificacao: [
      'Infra de ST >= 1mm em >= 2 derivacoes contiguas (especialmente V4-V6, II, III, aVF)',
      'Inversao de onda T profunda e simetrica (> 2mm)',
      'Ondas T de Wellens (inversao bifasica ou profunda em V2-V3) = lesao critica de DA proximal',
      'Troponina ELEVADA (curva ascendente)',
      'SEM supra de ST persistente (diferente do IAMCSST)',
      'Alteracoes dinamicas do ECG'
    ],
    imagem: '/images/ecg/iamsst.png',
    significadoClinico: 'Oclusao parcial ou subtotal de coronaria, ou oclusao total com circulacao colateral. Risco alto de progressao para IAMCSST. Estratificacao de risco (GRACE, TIMI) determina urgencia da cineangiocoronariografia.',
    mortalidadeSeNaoTratado: '10-15% em 30 dias se alto risco',
    urgencia: 3,
    tempoParaAcao: '1-2h',
    acaoImediata: [
      'AAS 300mg mastigavel',
      'Clopidogrel 300-600mg OU Ticagrelor 180mg',
      'Anticoagulacao (Enoxaparina 1mg/kg SC 12/12h)',
      'Estratificar risco (GRACE, TIMI)',
      'Se MUITO ALTO RISCO (instabilidade, arritmia, IC): cateterismo em < 2h',
      'Se ALTO RISCO (GRACE > 140, troponina elevada): cateterismo em < 24h',
      'Transferencia para centro com hemodinamica'
    ],
    naoFazer: [
      'NAO confundir infra de ST com padrao de strain por HVE',
      'NAO dar alta para casa',
      'NAO atrasar antiagregacao dupla',
      'NAO ignorar padrao de Wellens (risco muito alto)'
    ],
    quemChamar: [
      'Cardiologista',
      'Centro de hemodinamica',
      'UTI Coronariana'
    ],
    dicasReconhecimento: [
      'Padrao de Wellens: onda T bifasica ou inversao profunda em V2-V3 = lesao critica de DA',
      'Infra difuso com supra em aVR = obstrucao de tronco/3 vasos',
      'Alteracoes dinamicas (muda em ECGs seriados) = isquemia ativa'
    ],
    errosComuns: [
      'Dar alta porque "nao tem supra de ST"',
      'Nao reconhecer padrao de Wellens',
      'Subestimar infra de ST difuso com supra em aVR',
      'Nao fazer ECGs seriados'
    ],
    snomedCT: '401314000',
    icd10: ['I21.4', 'I21.9'],
    citations: [
      { refId: 'esc-nstemi-2023', title: 'ESC Guidelines for NSTE-ACS 2023', year: 2023 },
      { refId: 'aha-nstemi-2023', title: 'AHA NSTEMI Guidelines 2023', year: 2023 }
    ]
  },
  {
    id: 'fa-rvr',
    nome: 'Fibrilacao Atrial com Resposta Ventricular Rapida',
    nomeInternacional: 'Atrial Fibrillation with Rapid Ventricular Response (AF-RVR)',
    categoria: 'urgente',
    criteriosIdentificacao: [
      'Ritmo IRREGULARMENTE irregular (caracteristica principal)',
      'Ausencia de ondas P definidas - linha de base com ondulacoes finas (ondas "f")',
      'FC > 100 bpm (geralmente 130-180 bpm)',
      'RVR: FC media > 110-150 bpm com sintomas',
      'Intervalos RR completamente irregulares',
      'QRS geralmente estreito (a menos que haja bloqueio de ramo ou WPW)'
    ],
    imagem: '/images/ecg/fa-rvr.png',
    significadoClinico: 'Alta resposta ventricular pode causar isquemia, insuficiencia cardiaca aguda, hipotensao. Importante: avaliar risco de AVC (CHA2DS2-VASc) e risco de sangramento (HAS-BLED).',
    mortalidadeSeNaoTratado: '5-10% se IC ou isquemia descompensadas',
    urgencia: 3,
    tempoParaAcao: '1-2h',
    acaoImediata: [
      'AVALIAR ESTABILIDADE - se instavel: cardioversao eletrica sincronizada',
      'Se estavel - controle de frequencia:',
      '  - Metoprolol 5mg IV lento (pode repetir a cada 5min, max 15mg)',
      '  - OU Diltiazem 0.25mg/kg IV em 2min',
      '  - OU Verapamil 5-10mg IV',
      '  - Digoxina se IC associada (0.5mg IV)',
      'Iniciar anticoagulacao se > 48h ou inicio incerto',
      'Investigar causa precipitante (infeccao, hipertireoidismo, IC, PE)'
    ],
    naoFazer: [
      'NAO usar betabloqueador + verapamil/diltiazem simultaneamente (bloqueio AV)',
      'NAO cardioverter FA > 48h sem anticoagulacao (risco de AVC)',
      'NAO ignorar FA com WPW (nao usar drogas de bloqueio AV - usar procainamida)',
      'NAO usar digoxina como unica droga para controle agudo de FC'
    ],
    quemChamar: [
      'Cardiologista se instavel ou refratario',
      'Emergencia se instabilidade hemodinamica'
    ],
    dicasReconhecimento: [
      'Irregularmente irregular + sem ondas P = FA',
      'Se QRS largo e muito rapido (>200bpm) em jovem = considerar FA com WPW (urgencia!)',
      'Se muito lento e irregular = FA com BAV (considerar intoxicacao digitalica)'
    ],
    errosComuns: [
      'Nao verificar se ha WPW (contraindica BB, BCC, digoxina)',
      'Cardioverter FA > 48h sem anticoagulacao previa',
      'Nao investigar causa precipitante',
      'Confundir com flutter atrial (flutter e mais regular)'
    ],
    snomedCT: '49436004',
    icd10: ['I48.0', 'I48.1', 'I48.2'],
    citations: [
      { refId: 'esc-fa-2024', title: 'ESC Guidelines for AF 2024', year: 2024 },
      { refId: 'aha-fa-2023', title: 'AHA/ACC/HRS Guidelines for AF 2023', year: 2023 }
    ]
  },
  {
    id: 'brugada-tipo1',
    nome: 'Sindrome de Brugada Tipo 1',
    nomeInternacional: 'Brugada Syndrome Type 1',
    categoria: 'urgente',
    criteriosIdentificacao: [
      'Padrao "coved-type" em V1-V2 (OBRIGATORIO para tipo 1):',
      '  - Supra de ST >= 2mm (ponto J)',
      '  - Convexo (abaulado para cima)',
      '  - Descendo para onda T NEGATIVA',
      'Pode ser dinamico (aparece e desaparece)',
      'Pode ser desmascarado por febre, drogas bloqueadoras de sodio, vagotomia',
      'QRS pode ter componente r\' em V1 (semelhante a BRD incompleto)'
    ],
    imagem: '/images/ecg/brugada-tipo1.png',
    significadoClinico: 'Canalopatia com risco de morte subita por FV, especialmente durante sono ou febre. Mais comum em homens asiaticos. Historia familiar de morte subita e importante.',
    mortalidadeSeNaoTratado: '10% por ano em pacientes sintomaticos sem CDI',
    urgencia: 3,
    tempoParaAcao: '1-2h',
    acaoImediata: [
      'Tratar febre agressivamente (febre desmascara/piora Brugada)',
      'SUSPENDER drogas que agravam (antiarritmicos classe I, antidepressivos triciclicos)',
      'Monitorização continua',
      'Se sincope ou arritmia documentada: internacao para avaliacao de CDI',
      'Encaminhar para eletrofisiologista/arritmologista',
      'Rastreamento familiar (doenca genetica)'
    ],
    naoFazer: [
      'NAO dar drogas bloqueadoras de canal de sodio (flecainida, propafenona, cocaina)',
      'NAO ignorar febre (pode desencadear arritmia)',
      'NAO dar alta sem avaliacao de arritmologista se tipo 1 espontaneo + sintomas',
      'NAO deixar de investigar familiares'
    ],
    quemChamar: [
      'Arritmologista/eletrofisiologista',
      'Geneticista (avaliacao familiar)',
      'Cardiologista'
    ],
    dicasReconhecimento: [
      'V1-V2 com "morrao" (concavidade para cima) que desce para T negativa = tipo 1',
      'DIFERENTE de tipo 2/3 (saddleback - sela de cavalo - T positiva)',
      'Se descoberto incidentalmente: perguntar sobre sincope, palpitacoes, HF de morte subita'
    ],
    errosComuns: [
      'Confundir tipo 1 (coved) com tipo 2/3 (saddleback) - tipo 1 e mais grave',
      'Nao reconhecer que febre pode desmascarar o padrao',
      'Nao investigar historia familiar de morte subita',
      'Dar medicamentos contraindicados'
    ],
    snomedCT: '418818005',
    icd10: ['I49.8'],
    citations: [
      { refId: 'esc-brugada-2022', title: 'ESC Consensus on Brugada Syndrome 2022', year: 2022 },
      { refId: 'hrs-brugada-2023', title: 'HRS Expert Consensus Statement on Brugada 2023', year: 2023 }
    ]
  },
  {
    id: 'qt-longo-severo',
    nome: 'Intervalo QT Prolongado Severo (QTc > 500ms)',
    nomeInternacional: 'Severe QT Prolongation (QTc > 500ms)',
    categoria: 'urgente',
    criteriosIdentificacao: [
      'QTc (corrigido) > 500ms = ALTO RISCO de Torsades',
      'Formula de Bazett: QTc = QT / raiz(RR em segundos)',
      'Medir QT do inicio do QRS ao final da onda T',
      'Usar DII ou V5 para medicao',
      'QTc normal: homens < 450ms, mulheres < 460ms',
      'Pode haver ondas U proeminentes ou ondas T com entalhe',
      'Atentar para alternancia de onda T (sinal de risco iminente)'
    ],
    imagem: '/images/ecg/qt-longo.png',
    significadoClinico: 'Risco elevado de Torsades de Pointes e morte subita. Causas: farmacos (antiarritmicos, psicofarmacos, antibioticos), disturbios eletroliticos, sindrome do QT longo congenita, bradicardia.',
    mortalidadeSeNaoTratado: '15-20% por ano se sintomatico',
    urgencia: 3,
    tempoParaAcao: '1-2h',
    acaoImediata: [
      'SUSPENDER IMEDIATAMENTE todos os farmacos que prolongam QT',
      'Dosar K+, Mg2+, Ca2+',
      'Corrigir hipocalemia (alvo K+ > 4.5 mEq/L)',
      'Sulfato de Magnesio 2g IV (mesmo se Mg normal - protetor)',
      'Monitorização cardiaca continua',
      'Se bradicardia associada: considerar marcapasso temporario',
      'Evitar estimulos adrenergicos subitos se SQTL congenita'
    ],
    naoFazer: [
      'NAO dar NENHUM farmaco que prolonga QT (lista extensa - verificar!)',
      'NAO ignorar QTc > 500ms',
      'NAO deixar de corrigir K+ e Mg2+',
      'NAO dar metoclopramida, ondansetrona, fluoroquinolonas, macrolideos'
    ],
    quemChamar: [
      'Cardiologista/arritmologista',
      'UTI se QTc > 550ms ou sintomas'
    ],
    dicasReconhecimento: [
      'QT "parece longo demais" para a FC = medir e calcular QTc',
      'Usar regra pratica: QT normal < 50% do RR',
      'Multiplos farmacos podem ter efeito aditivo no QT',
      'Verificar lista de medicamentos em uso no crediblemeds.org'
    ],
    errosComuns: [
      'Nao medir QT rotineiramente',
      'Medir QT em derivacao inadequada',
      'Incluir onda U na medicao (incorreto)',
      'Nao verificar lista de medicamentos do paciente',
      'Nao reconhecer sindrome congenita'
    ],
    snomedCT: '9651007',
    icd10: ['R94.31', 'I45.81'],
    citations: [
      { refId: 'aha-qt-2023', title: 'AHA Statement on Drug-Induced QT Prolongation 2023', year: 2023 },
      { refId: 'esc-arritmias-2022', title: 'ESC Guidelines for Ventricular Arrhythmias and SCD 2022', year: 2022 }
    ]
  },
  {
    id: 'sincope-ecg-anormal',
    nome: 'Sincope com ECG Anormal',
    nomeInternacional: 'Syncope with Abnormal ECG',
    categoria: 'urgente',
    criteriosIdentificacao: [
      'SINCOPE (perda transitoria de consciencia com recuperacao espontanea) +',
      'Qualquer uma das alteracoes abaixo no ECG:',
      '  - BAV 2 grau Mobitz II ou BAVT',
      '  - Bradicardia sinusal < 40 bpm ou pausas > 3s',
      '  - BRE ou BRD + HBAE/HBPE',
      '  - Taquicardia ventricular nao sustentada',
      '  - Pre-excitacao (WPW)',
      '  - Padrao de Brugada',
      '  - QTc prolongado ou curto',
      '  - Ondas T negativas em derivacoes anteriores (DAVD?)',
      '  - Ondas Q patologicas (sequela de IAM)'
    ],
    imagem: '/images/ecg/sincope-ecg.png',
    significadoClinico: 'Sincope + ECG anormal = alto risco de causa cardiaca (arritmia, cardiopatia estrutural). Mortalidade aumentada. Necessita investigacao urgente.',
    mortalidadeSeNaoTratado: '20-30% em 1 ano se causa cardiaca nao tratada',
    urgencia: 3,
    tempoParaAcao: '1-2h',
    acaoImediata: [
      'Monitorização cardiaca continua',
      'ECG seriados',
      'Ecocardiograma (avaliar cardiopatia estrutural)',
      'Dosar troponina, BNP',
      'Internacao para investigacao',
      'Considerar Holter, teste ergometrico, estudo eletrofisiologico',
      'Se bloqueio de ramo + sincope: considerar marcapasso'
    ],
    naoFazer: [
      'NAO dar alta com diagnostico de "sincope vasovagal" se ECG anormal',
      'NAO atribuir a causas benignas sem investigacao adequada',
      'NAO ignorar historia familiar de morte subita'
    ],
    quemChamar: [
      'Cardiologista',
      'Arritmologista',
      'Internista para investigacao'
    ],
    dicasReconhecimento: [
      'Sincope + ECG alterado = hospitalizar para investigar',
      'Sindrome vaso-vagal tipica (prodromos, pos-esforco ortostatico, jovem) com ECG normal = baixo risco',
      'Sincope durante exercicio = SEMPRE considerar causa cardiaca'
    ],
    errosComuns: [
      'Atribuir sincope a causa benigna sem ECG ou com ECG anormal ignorado',
      'Nao reconhecer alteracoes sutis de ECG',
      'Nao perguntar sobre historia familiar de morte subita',
      'Dar alta prematura'
    ],
    snomedCT: '271594007',
    icd10: ['R55', 'I45.9'],
    citations: [
      { refId: 'esc-sincope-2018', title: 'ESC Guidelines on Syncope 2018', year: 2018 },
      { refId: 'aha-sincope-2023', title: 'AHA Scientific Statement on Syncope 2023', year: 2023 }
    ]
  }
];

// ============================================================================
// ALERTA - Acao em 24-48h
// ============================================================================

const alerta: ECGRedFlag[] = [
  {
    id: 'bre-novo',
    nome: 'Bloqueio de Ramo Esquerdo Novo',
    nomeInternacional: 'New Left Bundle Branch Block',
    categoria: 'alerta',
    criteriosIdentificacao: [
      'QRS >= 120ms (bloqueio completo se >= 140ms)',
      'Onda R monofasica larga e entalhada ou com plato em DI, aVL, V5-V6',
      'Ausencia de onda Q em DI, V5-V6',
      'rS ou QS em V1 com onda T positiva',
      'Tempo de deflexao intrinsecoide > 60ms em V5-V6',
      'Desvio do eixo para esquerda comum',
      'Alteracoes secundarias de ST-T (opostas ao QRS)'
    ],
    imagem: '/images/ecg/bre-novo.png',
    significadoClinico: 'BRE NOVO em paciente com dor toracica = equivalente de IAMCSST ate que se prove o contrario. BRE cronico geralmente associado a cardiopatia (HAS, DAC, miocardiopatia). Dificulta interpretacao de isquemia.',
    mortalidadeSeNaoTratado: 'Variavel - depende se agudo com isquemia',
    urgencia: 2,
    tempoParaAcao: '24h',
    acaoImediata: [
      'Se DOR TORACICA + BRE novo = tratar como IAMCSST (emergencia!)',
      'Se assintomatico/BRE cronico:',
      '  - Ecocardiograma (avaliar funcao VE, cardiopatia estrutural)',
      '  - Avaliacao de DAC (teste funcional, cineangiocoronariografia se indicado)',
      '  - Avaliar necessidade de ressincronizador (se IC + FEVE baixa)',
      'Comparar com ECGs anteriores (confirmar se novo)',
      'Investigar causa: HAS, DAC, miocardiopatia, Chagas'
    ],
    naoFazer: [
      'NAO ignorar BRE novo com sintomas (pode ser IAM)',
      'NAO interpretar ST-T como isquemia em BRE (alteracoes sao secundarias)',
      'NAO deixar de investigar cardiopatia subjacente'
    ],
    quemChamar: [
      'Cardiologista para avaliacao',
      'Se sintomatico: emergencia'
    ],
    dicasReconhecimento: [
      'BRE: "tudo grande e largo para a esquerda" (DI, aVL, V5-V6)',
      'V1 predominantemente negativo, V6 predominantemente positivo',
      'Criterios de Sgarbossa: ajudam a identificar IAM em vigencia de BRE'
    ],
    errosComuns: [
      'Nao reconhecer que BRE novo + dor = IAM',
      'Tentar interpretar ST-T como isquemia em BRE cronico',
      'Nao procurar ECG previo para confirmar se e novo',
      'Nao investigar causa do BRE'
    ],
    snomedCT: '63593006',
    icd10: ['I44.7'],
    citations: [
      { refId: 'aha-ecg-2022', title: 'AHA ECG Interpretation Guidelines 2022', year: 2022 },
      { refId: 'esc-stemi-2023', title: 'ESC Guidelines for STEMI Management 2023', year: 2023 }
    ]
  },
  {
    id: 'alteracoes-isquemicas-subagudas',
    nome: 'Alteracoes Isquemicas Subagudas',
    nomeInternacional: 'Subacute Ischemic Changes',
    categoria: 'alerta',
    criteriosIdentificacao: [
      'Inversao de onda T simetrica e profunda (> 2mm) em derivacoes contiguas',
      'Ondas Q patologicas novas (> 40ms ou > 25% do QRS)',
      'Infradesnivelamento de ST persistente (> 0.5mm)',
      'Padrao de isquemia subendocardica',
      'Alteracoes em territorio coronariano definido',
      'Sem evolucao aguda (supra de ST)'
    ],
    imagem: '/images/ecg/isquemia-subaguda.png',
    significadoClinico: 'Indica DAC com isquemia em evolucao ou recente. Pode representar IAM subagudo, angina instavel em resolucao, ou sequela de IAM. Requer investigacao de doenca coronariana.',
    mortalidadeSeNaoTratado: '5-15% em 1 ano se nao tratado',
    urgencia: 2,
    tempoParaAcao: '24h',
    acaoImediata: [
      'Estratificacao de risco coronariano',
      'Dosar troponina (pode estar normal se subagudo)',
      'Ecocardiograma (avaliar alteracao segmentar)',
      'Teste funcional para isquemia ou cineangiocoronariografia',
      'Iniciar prevenção secundaria se DAC confirmada',
      'Encaminhar para cardiologista'
    ],
    naoFazer: [
      'NAO ignorar alteracoes persistentes de ST-T',
      'NAO dar alta sem investigacao em paciente de risco',
      'NAO atribuir a alteracoes inespecificas sem excluir DAC'
    ],
    quemChamar: [
      'Cardiologista para avaliacao',
      'Ambulatorio de DAC'
    ],
    dicasReconhecimento: [
      'T negativa profunda e simetrica = isquemia ate que se prove o contrario',
      'Ondas Q novas = necrose previa',
      'Compare com ECGs anteriores quando disponiveis'
    ],
    errosComuns: [
      'Atribuir alteracoes de T a causas nao cardiacas sem investigar',
      'Nao reconhecer padrao de territorio coronariano',
      'Nao comparar com ECG previo'
    ],
    snomedCT: '414545008',
    icd10: ['I25.1', 'I25.5'],
    citations: [
      { refId: 'aha-ecg-2022', title: 'AHA ECG Interpretation Guidelines 2022', year: 2022 }
    ]
  },
  {
    id: 'fa-inicio-recente',
    nome: 'Fibrilacao Atrial de Inicio Recente (< 48h) Estavel',
    nomeInternacional: 'Recent-Onset Atrial Fibrillation (< 48h) - Stable',
    categoria: 'alerta',
    criteriosIdentificacao: [
      'Ritmo irregularmente irregular',
      'Ausencia de ondas P, substituidas por ondas "f"',
      'FC controlada ou levemente aumentada (< 110 bpm)',
      'Inicio bem definido < 48 horas',
      'Paciente HEMODINAMICAMENTE ESTAVEL',
      'Sem sinais de IC descompensada, isquemia ou pre-excitacao'
    ],
    imagem: '/images/ecg/fa-recente.png',
    significadoClinico: 'FA de inicio recente tem maior chance de reversao espontanea ou com cardioversao. Se < 48h, pode cardioverter sem anticoagulacao prolongada. Investigar causa precipitante.',
    mortalidadeSeNaoTratado: 'Baixa se estavel; risco de AVC se nao anticoagulado',
    urgencia: 2,
    tempoParaAcao: '24h',
    acaoImediata: [
      'Confirmar inicio < 48h (historia detalhada)',
      'Calcular CHA2DS2-VASc e HAS-BLED',
      'Se < 48h e baixo risco tromboembolico: considerar cardioversao',
      '  - Farmacologica: Propafenona 600mg VO ou Amiodarona',
      '  - Eletrica: 150-200J bifasico sincronizado',
      'Controle de frequencia se cardioversao nao indicada',
      'Anticoagulacao conforme risco (DOAC ou Varfarina)',
      'Investigar causa: hipertireoidismo, IC, valvopatia'
    ],
    naoFazer: [
      'NAO cardioverter se > 48h ou inicio incerto SEM anticoagulacao ou ETE',
      'NAO esquecer de calcular risco tromboembolico',
      'NAO usar propafenona/flecainida se cardiopatia estrutural'
    ],
    quemChamar: [
      'Cardiologista para definir estrategia (ritmo vs frequencia)',
      'Ambulatorio de arritmias'
    ],
    dicasReconhecimento: [
      'Perguntar exatamente quando comecaram os sintomas',
      'Se paciente nao sabe quando comecou = tratar como > 48h',
      'FA em idoso assintomatico pode ter comecado ha muito tempo'
    ],
    errosComuns: [
      'Cardioverter FA de inicio incerto sem anticoagulacao (risco de AVC)',
      'Nao investigar causa subjacente',
      'Nao iniciar anticoagulacao quando indicada',
      'Usar antiarritmico IC em paciente com cardiopatia'
    ],
    snomedCT: '49436004',
    icd10: ['I48.0', 'I48.9'],
    citations: [
      { refId: 'esc-fa-2024', title: 'ESC Guidelines for AF 2024', year: 2024 }
    ]
  },
  {
    id: 'bav-2-grau-tipo2',
    nome: 'Bloqueio Atrioventricular 2 Grau Tipo II (Mobitz II)',
    nomeInternacional: 'Second-Degree AV Block Type II (Mobitz II)',
    categoria: 'alerta',
    criteriosIdentificacao: [
      'Ondas P bloqueadas (nao seguidas de QRS) de forma INTERMITENTE',
      'Intervalo PR CONSTANTE antes do bloqueio (diferente de Mobitz I)',
      'Sem alongamento progressivo do PR (diferente de Wenckebach)',
      'QRS frequentemente alargado (bloqueio infra-His)',
      'Pausa do RR bloqueado = multiplo exato do RR conduzido',
      'Pode progredir para BAVT de forma subita'
    ],
    imagem: '/images/ecg/bav-2-mobitz2.png',
    significadoClinico: 'Bloqueio geralmente infranodal (His-Purkinje). Alto risco de progressao para BAVT sem aviso. Causa comum: doenca degenerativa do sistema de conducao, pos-IAM anterior.',
    mortalidadeSeNaoTratado: '30-40% em 1 ano se progredir para BAVT',
    urgencia: 2,
    tempoParaAcao: '24h',
    acaoImediata: [
      'Monitorização cardiaca continua',
      'Suspender drogas que bloqueiam conducao AV (BB, BCC, digoxina)',
      'Manter atropina e marcapasso transcutaneo disponiveis',
      'Encaminhar para avaliacao de marcapasso definitivo',
      'Investigar causa (IAM, doenca degenerativa)',
      'Internacao para monitorização'
    ],
    naoFazer: [
      'NAO dar alta sem marcapasso ou avaliacao cardiologica',
      'NAO confundir com Mobitz I (que e geralmente benigno)',
      'NAO confiar apenas em atropina (pode ser ineficaz em bloqueio infranodal)'
    ],
    quemChamar: [
      'Cardiologista/arritmologista',
      'Equipe de marcapasso'
    ],
    dicasReconhecimento: [
      'PR constante + P bloqueada subitamente = Mobitz II',
      'DIFERENTE de Mobitz I: em Mobitz I o PR vai aumentando ate bloquear',
      'QRS largo em Mobitz II = pior prognostico',
      'Mobitz II e mais grave que Mobitz I'
    ],
    errosComuns: [
      'Confundir Mobitz I com Mobitz II (conduta completamente diferente)',
      'Subestimar Mobitz II (pode ir para BAVT a qualquer momento)',
      'Dar alta sem avaliacao de marcapasso'
    ],
    snomedCT: '426183009',
    icd10: ['I44.1'],
    citations: [
      { refId: 'esc-bradiarritmias-2021', title: 'ESC Guidelines on Cardiac Pacing and CRT 2021', year: 2021 }
    ]
  },
  {
    id: 'pre-excitacao-wpw',
    nome: 'Pre-Excitacao Ventricular (Padrao WPW)',
    nomeInternacional: 'Ventricular Pre-excitation (WPW Pattern)',
    categoria: 'alerta',
    criteriosIdentificacao: [
      'PR curto < 120ms',
      'Onda Delta (empastamento inicial do QRS)',
      'QRS alargado (> 110ms) devido a onda delta',
      'Alteracoes secundarias de ST-T',
      'Onda delta pode ser positiva ou negativa dependendo da localizacao da via',
      'Pode mimetizar BRE, BRD, ou ondas Q de IAM'
    ],
    imagem: '/images/ecg/wpw.png',
    significadoClinico: 'Via acessoria AV permite conducao rapida. Risco de FA pre-excitada com resposta ventricular muito rapida (pode chegar a 300 bpm) e degenerar para FV. Morte subita em 0.1-0.2% ao ano.',
    mortalidadeSeNaoTratado: '0.1-0.2% ao ano de morte subita',
    urgencia: 2,
    tempoParaAcao: '24h',
    acaoImediata: [
      'Se assintomatico: encaminhar para estratificacao de risco com arritmologista',
      'Se sintomatico (palpitacoes, sincope): avaliacao urgente',
      'Se FA com WPW (QRS largo muito rapido):',
      '  - NAO DAR: adenosina, digoxina, BB, verapamil, diltiazem',
      '  - USAR: Procainamida 15-17mg/kg IV ou cardioversao',
      'Ablacao por cateter e curativa em muitos casos',
      'Evitar esportes competitivos ate avaliacao'
    ],
    naoFazer: [
      'NAO dar adenosina, BB, BCC, digoxina em FA com WPW (pode ser fatal!)',
      'NAO ignorar WPW em atleta ou paciente com sincope',
      'NAO liberar para esportes sem estratificacao de risco'
    ],
    quemChamar: [
      'Arritmologista/eletrofisiologista',
      'Cardiologista'
    ],
    dicasReconhecimento: [
      'PR curto + onda delta = WPW',
      'Onda delta parece um "empastamento" no inicio do QRS',
      'Se QRS muito largo e muito rapido em FA = FA pre-excitada = emergencia!'
    ],
    errosComuns: [
      'Dar adenosina ou digoxina em FA com WPW (pode precipitar FV)',
      'Confundir onda delta com ondas Q de IAM',
      'Nao reconhecer WPW em FA (QRS largo e muito rapido)',
      'Subestimar risco em paciente assintomatico'
    ],
    snomedCT: '74390002',
    icd10: ['I45.6'],
    citations: [
      { refId: 'esc-svt-2019', title: 'ESC Guidelines for SVT Management 2019', year: 2019 },
      { refId: 'aha-wpw-2023', title: 'AHA Statement on WPW Management 2023', year: 2023 }
    ]
  }
];

// ============================================================================
// EXPORT: Database completa
// ============================================================================

export const ecgRedFlags: ECGRedFlag[] = [
  ...emergencias,
  ...urgentes,
  ...alerta
];

// ============================================================================
// LOOKUP FUNCTIONS
// ============================================================================

/**
 * Retorna todos os red flags de uma determinada urgencia
 * @param urgencia 1=rotina, 2=24-48h, 3=horas, 4=imediato
 */
export function getRedFlagsByUrgency(urgencia: UrgencyLevel): ECGRedFlag[] {
  return ecgRedFlags.filter(rf => rf.urgencia === urgencia);
}

/**
 * Retorna todos os red flags de uma determinada categoria
 * @param categoria 'emergencia' | 'urgente' | 'alerta'
 */
export function getRedFlagsByCategory(categoria: ECGRedFlagCategoria): ECGRedFlag[] {
  return ecgRedFlags.filter(rf => rf.categoria === categoria);
}

/**
 * Verifica se um achado de ECG e um red flag
 * @param ecgFinding String com o achado do ECG
 * @returns boolean indicando se e red flag
 */
export function isRedFlag(ecgFinding: string): boolean {
  const normalizedFinding = ecgFinding.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return ecgRedFlags.some(rf => {
    const normalizedNome = rf.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normalizedNomeInt = rf.nomeInternacional.toLowerCase();
    const normalizedId = rf.id.toLowerCase();

    // Check in name, international name, id, and criteria
    if (normalizedNome.includes(normalizedFinding) ||
        normalizedFinding.includes(normalizedNome) ||
        normalizedNomeInt.includes(normalizedFinding) ||
        normalizedFinding.includes(normalizedNomeInt) ||
        normalizedId.includes(normalizedFinding)) {
      return true;
    }

    // Check in identification criteria
    return rf.criteriosIdentificacao.some(criterio => {
      const normalizedCriterio = criterio.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return normalizedCriterio.includes(normalizedFinding) || normalizedFinding.includes(normalizedCriterio);
    });
  });
}

/**
 * Busca um red flag por ID
 * @param redFlagId ID do red flag
 */
export function getRedFlagById(redFlagId: string): ECGRedFlag | undefined {
  return ecgRedFlags.find(rf => rf.id === redFlagId);
}

/**
 * Retorna as acoes para um determinado red flag
 * @param redFlagId ID do red flag
 */
export function getActionForRedFlag(redFlagId: string): {
  acaoImediata: string[];
  naoFazer: string[];
  quemChamar: string[];
  tempoParaAcao: string;
  urgencia: UrgencyLevel;
} | null {
  const redFlag = ecgRedFlags.find(rf => rf.id === redFlagId);

  if (!redFlag) return null;

  return {
    acaoImediata: redFlag.acaoImediata,
    naoFazer: redFlag.naoFazer,
    quemChamar: redFlag.quemChamar,
    tempoParaAcao: redFlag.tempoParaAcao,
    urgencia: redFlag.urgencia
  };
}

/**
 * Busca red flags por termo (nome, criterios, etc.)
 * @param searchTerm Termo de busca
 */
export function searchRedFlags(searchTerm: string): ECGRedFlag[] {
  const normalized = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return ecgRedFlags.filter(rf => {
    const searchableFields = [
      rf.nome,
      rf.nomeInternacional,
      rf.id,
      rf.significadoClinico,
      ...rf.criteriosIdentificacao,
      ...rf.dicasReconhecimento
    ].map(f => f.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));

    return searchableFields.some(field => field.includes(normalized));
  });
}

/**
 * Retorna estatisticas do banco de red flags
 */
export function getRedFlagStats(): {
  total: number;
  byCategory: Record<ECGRedFlagCategoria, number>;
  byUrgency: Record<UrgencyLevel, number>;
} {
  const byCategory: Record<ECGRedFlagCategoria, number> = {
    emergencia: 0,
    urgente: 0,
    alerta: 0
  };

  const byUrgency: Record<UrgencyLevel, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
  };

  ecgRedFlags.forEach(rf => {
    byCategory[rf.categoria]++;
    byUrgency[rf.urgencia]++;
  });

  return {
    total: ecgRedFlags.length,
    byCategory,
    byUrgency
  };
}

// ============================================================================
// EXPORT: Listas rapidas para UI
// ============================================================================

export const emergenciasRedFlags = emergencias;
export const urgentesRedFlags = urgentes;
export const alertaRedFlags = alerta;

// Lista de todos os IDs para validacao
export const allRedFlagIds = ecgRedFlags.map(rf => rf.id);

// Mapping de urgencia para label
export const urgencyLabels: Record<UrgencyLevel, string> = {
  1: 'Rotina',
  2: '24-48 horas',
  3: '1-2 horas',
  4: 'Imediato'
};

// Mapping de categoria para cor (para UI)
export const categoryColors: Record<ECGRedFlagCategoria, string> = {
  emergencia: '#dc2626', // red-600
  urgente: '#f97316',    // orange-500
  alerta: '#eab308'      // yellow-500
};
