/**
 * CARDIOVASCULARES FINAL - DARWIN-MFC
 * ====================================
 *
 * Expansão final cardiovascular e dor
 * ~40 medicamentos
 */

import { Medicamento } from '../../types/medicamento';

export const medicamentosCardiovascularesFinais: Partial<Medicamento>[] = [
  // Vasodilatadores
  {
    id: 'nitroprussiato',
    nomeGenerico: 'Nitroprussiato de Sódio',
    nomesComerciais: ['Nipride'],
    atcCode: 'C02DD01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'vasodilatador',
    rename: true,
    apresentacoes: [
      { forma: 'po_injetavel', concentracao: '50mg', disponivelSUS: true },
    ],
    indicacoes: ['Emergência hipertensiva', 'ICC grave', 'Hipotensão induzida em cirurgia'],
    mecanismoAcao: 'Libera NO; vasodilatação arterial e venosa',
    posologias: [
      {
        indicacao: 'Emergência hipertensiva',
        adultos: { dose: '0,3-10mcg/kg/min', frequencia: 'Infusão IV contínua', observacoes: 'Proteger da luz' },
      }
    ],
    contraindicacoes: ['Coarctação de aorta', 'Insuficiência hepática grave'],
    efeitosAdversos: {
      comuns: ['Hipotensão', 'Náuseas', 'Cefaleia'],
      graves: ['Toxicidade por cianeto', 'Toxicidade por tiocianato', 'Acidose metabólica']
    },
    interacoes: [
      { medicamento: 'Outros anti-hipertensivos', gravidade: 'moderada', efeito: 'Hipotensão aditiva', conduta: 'Titular cuidadosamente' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    monitorizacao: ['PA contínua', 'Tiocianato (uso >48h)', 'Gases arteriais'],
    doencasRelacionadas: ['emergencia-hipertensiva', 'icc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'nitroglicerina',
    nomeGenerico: 'Nitroglicerina',
    nomesComerciais: ['Tridil', 'Nitroderm'],
    atcCode: 'C01DA02',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'nitrato',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '5mg/ml', disponivelSUS: true },
      { forma: 'adesivo', concentracao: '5mg/24h', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '0,5mg SL', disponivelSUS: true },
    ],
    indicacoes: ['Angina instável', 'IAM', 'ICC', 'Hipertensão perioperatória'],
    mecanismoAcao: 'Libera NO; venodilatação > arteriodilatação',
    posologias: [
      {
        indicacao: 'Angina/IAM',
        adultos: { dose: '5-200mcg/min', frequencia: 'Infusão IV contínua' },
      },
      {
        indicacao: 'Angina aguda',
        adultos: { dose: '0,3-0,6mg SL', frequencia: 'Repetir a cada 5min (máx 3 doses)' },
      }
    ],
    contraindicacoes: ['Uso de inibidores PDE5', 'Hipotensão grave', 'Hipovolemia'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Hipotensão', 'Rubor facial', 'Tolerância'],
      graves: ['Hipotensão grave', 'Bradicardia reflexa']
    },
    interacoes: [
      { medicamento: 'Sildenafila/Tadalafila', gravidade: 'contraindicada', efeito: 'Hipotensão grave', conduta: 'Intervalo >24h' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    orientacoesPaciente: ['Tolerância - fazer intervalo livre de nitrato 10-12h'],
    doencasRelacionadas: ['angina', 'iam', 'icc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'dinitrato-isossorbida',
    nomeGenerico: 'Dinitrato de Isossorbida',
    nomesComerciais: ['Isordil', 'Isocord'],
    atcCode: 'C01DA08',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'nitrato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg SL', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
    ],
    indicacoes: ['Angina estável (profilaxia)', 'Angina aguda', 'ICC'],
    mecanismoAcao: 'Nitrato orgânico; vasodilatador',
    posologias: [
      {
        indicacao: 'Angina profilaxia',
        adultos: { dose: '10-40mg', frequencia: '2-3x/dia (com intervalo livre noturno)' },
      }
    ],
    contraindicacoes: ['Inibidores PDE5', 'Hipotensão'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Hipotensão postural'],
      graves: ['Síncope']
    },
    interacoes: [
      { medicamento: 'Sildenafila', gravidade: 'contraindicada', efeito: 'Hipotensão grave', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Provavelmente compatível' },
    doencasRelacionadas: ['angina'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'mononitrato-isossorbida',
    nomeGenerico: 'Mononitrato de Isossorbida',
    nomesComerciais: ['Monocordil', 'Ismo'],
    atcCode: 'C01DA14',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'nitrato',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '20mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '40mg', disponivelSUS: true },
      { forma: 'comprimido_xr', concentracao: '60mg', disponivelSUS: false },
    ],
    indicacoes: ['Angina estável crônica'],
    mecanismoAcao: 'Metabólito ativo do dinitrato; melhor biodisponibilidade',
    posologias: [
      {
        indicacao: 'Angina',
        adultos: { dose: '20-40mg', frequencia: '2x/dia (8h e 14h) ou XR 60mg 1x/dia' },
      }
    ],
    contraindicacoes: ['Inibidores PDE5', 'Hipotensão grave'],
    efeitosAdversos: {
      comuns: ['Cefaleia', 'Tontura'],
      graves: ['Hipotensão grave']
    },
    interacoes: [
      { medicamento: 'Sildenafila', gravidade: 'contraindicada', efeito: 'Hipotensão', conduta: 'Intervalo >24h' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['angina'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antiarrítmicos
  {
    id: 'amiodarona',
    nomeGenerico: 'Amiodarona',
    nomesComerciais: ['Ancoron', 'Cordarone'],
    atcCode: 'C01BD01',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'antiarritmico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '200mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '50mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['FA/Flutter atrial', 'TV/FV (ressuscitação)', 'Arritmias refratárias'],
    mecanismoAcao: 'Antiarrítmico classe III; prolonga potencial de ação em todos os tecidos cardíacos',
    posologias: [
      {
        indicacao: 'FA (manutenção)',
        adultos: { dose: '200mg', frequencia: '1x/dia (após impregnação)' },
      },
      {
        indicacao: 'Arritmia (ataque)',
        adultos: { dose: '150-300mg IV', frequencia: 'Bolus, depois infusão 1mg/min x 6h, depois 0,5mg/min' },
      }
    ],
    contraindicacoes: ['Bradicardia sinusal', 'BAV 2º/3º grau', 'Disfunção tireoidiana', 'Pneumopatia intersticial'],
    efeitosAdversos: {
      comuns: ['Fotossensibilidade', 'Depósitos corneanos', 'Bradicardia', 'Sintomas GI'],
      graves: ['Toxicidade pulmonar', 'Hepatotoxicidade', 'Hipo/hipertireoidismo', 'Torsades de pointes', 'Neuropatia óptica']
    },
    interacoes: [
      { medicamento: 'Varfarina', gravidade: 'grave', efeito: 'Aumenta INR', conduta: 'Reduzir varfarina 30-50%' },
      { medicamento: 'Digoxina', gravidade: 'grave', efeito: 'Aumenta níveis de digoxina', conduta: 'Reduzir digoxina 50%' },
      { medicamento: 'QT prolongadores', gravidade: 'grave', efeito: 'Torsades de pointes', conduta: 'Evitar' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: false, observacao: 'Concentra no leite; hipotireoidismo neonatal' },
    monitorizacao: ['TSH cada 6 meses', 'TGO/TGP', 'Rx tórax anual', 'Exame oftalmológico', 'ECG (QT)'],
    doencasRelacionadas: ['fibrilacao-atrial', 'taquicardia-ventricular'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'propafenona',
    nomeGenerico: 'Propafenona',
    nomesComerciais: ['Ritmonorm'],
    atcCode: 'C01BC03',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'antiarritmico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '300mg', disponivelSUS: true },
    ],
    indicacoes: ['FA paroxística', 'TSV', 'Arritmias ventriculares'],
    mecanismoAcao: 'Antiarrítmico classe IC; bloqueia canais de sódio',
    posologias: [
      {
        indicacao: 'FA/TSV',
        adultos: { dose: '150-300mg', frequencia: '8/8h', doseMaxima: '900mg/dia' },
      }
    ],
    contraindicacoes: ['DAC significativa', 'ICC', 'BAV', 'DPOC'],
    efeitosAdversos: {
      comuns: ['Tontura', 'Gosto metálico', 'Visão turva', 'Náuseas'],
      graves: ['Pró-arritmia', 'Bradicardia', 'Broncoespasmo']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Bradicardia', conduta: 'Cautela' },
      { medicamento: 'Digoxina', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Monitorar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Dados limitados' },
    doencasRelacionadas: ['fibrilacao-atrial', 'taquicardia-supraventricular'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'sotalol',
    nomeGenerico: 'Sotalol',
    nomesComerciais: ['Sotacor'],
    atcCode: 'C07AA07',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'betabloqueador',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '120mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '160mg', disponivelSUS: true },
    ],
    indicacoes: ['FA (manutenção ritmo sinusal)', 'Arritmias ventriculares', 'TSV'],
    mecanismoAcao: 'Betabloqueador não seletivo + efeito classe III (prolonga QT)',
    posologias: [
      {
        indicacao: 'FA',
        adultos: { dose: '80-160mg', frequencia: '12/12h', doseMaxima: '320mg/dia' },
      }
    ],
    contraindicacoes: ['Bradicardia', 'QT longo', 'ICC descompensada', 'Asma'],
    efeitosAdversos: {
      comuns: ['Bradicardia', 'Fadiga', 'Tontura'],
      graves: ['Torsades de pointes', 'ICC', 'Broncoespasmo']
    },
    interacoes: [
      { medicamento: 'QT prolongadores', gravidade: 'grave', efeito: 'Torsades de pointes', conduta: 'Evitar' },
      { medicamento: 'Diuréticos', gravidade: 'moderada', efeito: 'Hipocalemia aumenta risco arritmia', conduta: 'Monitorar K+' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    ajusteDoseRenal: [
      { tfg: '30-60', ajuste: 'Intervalo 24h' },
      { tfg: '10-30', ajuste: 'Intervalo 36-48h' },
      { tfg: '<10', ajuste: 'Individualizar' },
    ],
    monitorizacao: ['ECG (QT)', 'K+', 'Mg2+'],
    doencasRelacionadas: ['fibrilacao-atrial', 'arritmia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'adenosina',
    nomeGenerico: 'Adenosina',
    nomesComerciais: ['Adenocard'],
    atcCode: 'C01EB10',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'antiarritmico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '6mg/2ml', disponivelSUS: true },
    ],
    indicacoes: ['TSV paroxística', 'Diagnóstico diferencial taquicardias'],
    mecanismoAcao: 'Ativa receptores A1; deprime condução no nó AV',
    posologias: [
      {
        indicacao: 'TSV',
        adultos: { dose: '6mg IV bolus rápido, pode repetir 12mg', frequencia: 'Bolus seguido de flush' },
      }
    ],
    contraindicacoes: ['BAV 2º/3º grau', 'Síndrome do seio doente', 'Asma grave'],
    efeitosAdversos: {
      comuns: ['Rubor', 'Dispneia', 'Desconforto torácico', 'Cefaleia'],
      graves: ['Assistolia transitória', 'Broncoespasmo', 'FA (transitória)']
    },
    interacoes: [
      { medicamento: 'Dipiridamol', gravidade: 'grave', efeito: 'Potencializa adenosina', conduta: 'Reduzir dose' },
      { medicamento: 'Cafeína/Teofilina', gravidade: 'moderada', efeito: 'Antagoniza efeito', conduta: 'Pode precisar dose maior' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Meia-vida muito curta' },
    orientacoesPaciente: ['Efeitos duram segundos; pode haver sensação de parada cardíaca'],
    doencasRelacionadas: ['taquicardia-supraventricular'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Inotrópicos
  {
    id: 'dobutamina',
    nomeGenerico: 'Dobutamina',
    nomesComerciais: ['Dobutrex'],
    atcCode: 'C01CA07',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'inotropico',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '12,5mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Choque cardiogênico', 'ICC grave', 'Teste de estresse cardíaco'],
    mecanismoAcao: 'Agonista beta-1 adrenérgico; aumenta contratilidade',
    posologias: [
      {
        indicacao: 'Suporte inotrópico',
        adultos: { dose: '2,5-20mcg/kg/min', frequencia: 'Infusão IV contínua' },
      }
    ],
    contraindicacoes: ['Estenose subaórtica hipertrófica', 'Feocromocitoma'],
    efeitosAdversos: {
      comuns: ['Taquicardia', 'Hipertensão', 'Cefaleia', 'Náuseas'],
      graves: ['Arritmias', 'Isquemia miocárdica', 'Necrose cutânea (extravasamento)']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Antagonismo', conduta: 'Pode reduzir resposta' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Uso hospitalar' },
    monitorizacao: ['ECG contínuo', 'PA', 'Débito urinário'],
    doencasRelacionadas: ['choque-cardiogenico', 'icc'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'dopamina',
    nomeGenerico: 'Dopamina',
    nomesComerciais: ['Revivan'],
    atcCode: 'C01CA04',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'vasopressor',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '50mg/10ml', disponivelSUS: true },
    ],
    indicacoes: ['Choque', 'Bradicardia sintomática', 'Baixo débito cardíaco'],
    mecanismoAcao: 'Dose-dependente: dopaminérgico (renal), beta-1 (inotrópico), alfa-1 (vasopressor)',
    posologias: [
      {
        indicacao: 'Choque',
        adultos: { dose: '2-20mcg/kg/min', frequencia: 'Infusão IV contínua', observacoes: 'Dose baixa: renal; média: inotrópica; alta: vasopressora' },
      }
    ],
    contraindicacoes: ['Feocromocitoma', 'Taquiarritmias não tratadas'],
    efeitosAdversos: {
      comuns: ['Taquicardia', 'Náuseas', 'Cefaleia'],
      graves: ['Arritmias', 'Isquemia periférica', 'Necrose digital/cutânea']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Crise hipertensiva', conduta: 'Reduzir dose 1/10' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso hospitalar' },
    monitorizacao: ['ECG', 'PA', 'Perfusão periférica'],
    doencasRelacionadas: ['choque'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'norepinefrina',
    nomeGenerico: 'Norepinefrina',
    nomesComerciais: ['Levophed'],
    atcCode: 'C01CA03',
    classeTerapeutica: 'anti_hipertensivo',
    subclasse: 'vasopressor',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '2mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Choque séptico', 'Choque distributivo', 'Hipotensão grave'],
    mecanismoAcao: 'Agonista alfa-1 > beta-1; vasoconstrição potente',
    posologias: [
      {
        indicacao: 'Choque',
        adultos: { dose: '0,05-3mcg/kg/min', frequencia: 'Infusão IV contínua via central', observacoes: 'Titular para PAM ≥65mmHg' },
      }
    ],
    contraindicacoes: ['Hipovolemia não corrigida'],
    efeitosAdversos: {
      comuns: ['Bradicardia reflexa', 'Cefaleia'],
      graves: ['Isquemia periférica', 'Necrose cutânea', 'Arritmias']
    },
    interacoes: [
      { medicamento: 'IMAO', gravidade: 'grave', efeito: 'Crise hipertensiva', conduta: 'Evitar ou reduzir dose' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso hospitalar' },
    monitorizacao: ['PA invasiva', 'ECG', 'Perfusão periférica', 'Lactato'],
    doencasRelacionadas: ['choque-septico'],
    citations: [],
    lastUpdate: '2024-01-15'
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
      { forma: 'injetavel_iv', concentracao: '20UI/ml', disponivelSUS: true },
    ],
    indicacoes: ['Choque séptico (adjuvante)', 'Sangramento varicoso', 'Diabetes insípidus'],
    mecanismoAcao: 'Ativa receptores V1; vasoconstrição não adrenérgica',
    posologias: [
      {
        indicacao: 'Choque séptico',
        adultos: { dose: '0,03UI/min', frequencia: 'Infusão IV contínua (dose fixa)' },
      }
    ],
    contraindicacoes: ['DAC grave'],
    efeitosAdversos: {
      comuns: ['Isquemia digital', 'Hiponatremia'],
      graves: ['Isquemia mesentérica', 'Isquemia miocárdica', 'Necrose cutânea']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Uso hospitalar' },
    monitorizacao: ['PA', 'Perfusão periférica', 'Eletrólitos'],
    doencasRelacionadas: ['choque-septico', 'diabetes-insipidus'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Analgésicos opioides
  {
    id: 'morfina',
    nomeGenerico: 'Morfina',
    nomesComerciais: ['Dimorf', 'MS Contin'],
    atcCode: 'N02AA01',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide_forte',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '30mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '10mg/ml', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '10mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Dor moderada-grave', 'IAM', 'Edema agudo de pulmão', 'Cuidados paliativos'],
    mecanismoAcao: 'Agonista opioide mu; analgesia central',
    posologias: [
      {
        indicacao: 'Dor aguda',
        adultos: { dose: '2-10mg IV', frequencia: 'Cada 2-4h PRN', observacoes: 'Titular para efeito' },
      },
      {
        indicacao: 'Dor crônica',
        adultos: { dose: '10-30mg VO', frequencia: 'Cada 4h ou liberação controlada 12/12h' },
      }
    ],
    contraindicacoes: ['Depressão respiratória', 'Íleo paralítico', 'IMAO'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Náuseas', 'Sonolência', 'Prurido'],
      graves: ['Depressão respiratória', 'Hipotensão', 'Dependência', 'Retenção urinária']
    },
    interacoes: [
      { medicamento: 'Benzodiazepínicos', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Evitar ou reduzir doses' },
      { medicamento: 'IMAO', gravidade: 'contraindicada', efeito: 'Crise serotoninérgica', conduta: 'Intervalo 14 dias' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Dose única compatível; uso crônico pode sedar lactente' },
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Aumentar intervalo e reduzir dose' },
    ],
    doencasRelacionadas: ['dor-oncologica', 'iam'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'fentanil',
    nomeGenerico: 'Fentanil',
    nomesComerciais: ['Fentanyl', 'Durogesic'],
    atcCode: 'N02AB03',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide_forte',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '50mcg/ml', disponivelSUS: true },
      { forma: 'adesivo', concentracao: '25mcg/h', disponivelSUS: true },
      { forma: 'adesivo', concentracao: '50mcg/h', disponivelSUS: true },
    ],
    indicacoes: ['Dor oncológica crônica', 'Analgesia procedimentos', 'Anestesia'],
    mecanismoAcao: 'Agonista mu; 100x mais potente que morfina',
    posologias: [
      {
        indicacao: 'Analgesia procedimento',
        adultos: { dose: '50-100mcg IV', frequencia: 'Bolus lento' },
      },
      {
        indicacao: 'Dor crônica (adesivo)',
        adultos: { dose: '12-25mcg/h inicial', frequencia: 'Trocar a cada 72h', observacoes: 'Conversão de opioides prévios necessária' },
      }
    ],
    contraindicacoes: ['Depressão respiratória', 'Pacientes virgens de opioide (adesivo)'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Náuseas', 'Sonolência'],
      graves: ['Depressão respiratória', 'Rigidez torácica (IV rápido)', 'Bradicardia']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4', gravidade: 'grave', efeito: 'Aumenta níveis de fentanil', conduta: 'Reduzir dose' },
      { medicamento: 'Depressores SNC', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Dose única compatível' },
    doencasRelacionadas: ['dor-oncologica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'oxicodona',
    nomeGenerico: 'Oxicodona',
    nomesComerciais: ['OxyContin', 'Oxycodone'],
    atcCode: 'N02AA05',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide_forte',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido_xr', concentracao: '10mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '20mg', disponivelSUS: false },
      { forma: 'comprimido_xr', concentracao: '40mg', disponivelSUS: false },
    ],
    indicacoes: ['Dor moderada-grave crônica', 'Dor oncológica'],
    mecanismoAcao: 'Agonista opioide mu e kappa',
    posologias: [
      {
        indicacao: 'Dor crônica',
        adultos: { dose: '10mg 12/12h inicial', frequencia: '12/12h', observacoes: 'Titular conforme resposta' },
      }
    ],
    contraindicacoes: ['Depressão respiratória', 'Íleo paralítico'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Náuseas', 'Sonolência', 'Prurido'],
      graves: ['Depressão respiratória', 'Dependência']
    },
    interacoes: [
      { medicamento: 'Inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Ajustar dose' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: false, observacao: 'Evitar' },
    doencasRelacionadas: ['dor-oncologica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'metadona',
    nomeGenerico: 'Metadona',
    nomesComerciais: ['Mytedom'],
    atcCode: 'N07BC02',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide_forte',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '5mg', disponivelSUS: true },
      { forma: 'comprimido', concentracao: '10mg', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '5mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Dor crônica refratária', 'Dor neuropática', 'Tratamento dependência opioide'],
    mecanismoAcao: 'Agonista mu + antagonista NMDA; meia-vida longa variável',
    posologias: [
      {
        indicacao: 'Dor crônica',
        adultos: { dose: '2,5-5mg', frequencia: '8/8h inicialmente', observacoes: 'Titulação lenta pela meia-vida variável' },
      },
      {
        indicacao: 'Manutenção dependência',
        adultos: { dose: '20-120mg', frequencia: '1x/dia' },
      }
    ],
    contraindicacoes: ['QT longo', 'Uso de outros prolongadores QT'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Sudorese', 'Náuseas'],
      graves: ['Prolongamento QT', 'Torsades de pointes', 'Depressão respiratória tardia']
    },
    interacoes: [
      { medicamento: 'QT prolongadores', gravidade: 'grave', efeito: 'Torsades de pointes', conduta: 'Evitar' },
      { medicamento: 'Rifampicina', gravidade: 'grave', efeito: 'Reduz níveis de metadona', conduta: 'Aumentar dose' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em manutenção; monitorar lactente' },
    monitorizacao: ['ECG (QT)', 'Sintomas de abstinência/overdose'],
    doencasRelacionadas: ['dependencia-opioide', 'dor-oncologica'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'buprenorfina',
    nomeGenerico: 'Buprenorfina',
    nomesComerciais: ['Subutex', 'Suboxone', 'Transtec'],
    atcCode: 'N02AE01',
    classeTerapeutica: 'analgesico',
    subclasse: 'opioide_forte',
    rename: false,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '2mg SL', disponivelSUS: false },
      { forma: 'comprimido', concentracao: '8mg SL', disponivelSUS: false },
      { forma: 'adesivo', concentracao: '35mcg/h', disponivelSUS: false },
    ],
    indicacoes: ['Dependência de opioides', 'Dor crônica moderada-grave'],
    mecanismoAcao: 'Agonista parcial mu; antagonista kappa; efeito teto',
    posologias: [
      {
        indicacao: 'Dependência opioide',
        adultos: { dose: '4-24mg SL', frequencia: '1x/dia' },
      },
      {
        indicacao: 'Dor crônica',
        adultos: { dose: 'Adesivo 35-70mcg/h', frequencia: 'Trocar a cada 72h-7 dias' },
      }
    ],
    contraindicacoes: ['Depressão respiratória grave'],
    efeitosAdversos: {
      comuns: ['Constipação', 'Cefaleia', 'Náuseas'],
      graves: ['Hepatotoxicidade', 'Depressão respiratória (com outros depressores)']
    },
    interacoes: [
      { medicamento: 'Benzodiazepínicos', gravidade: 'grave', efeito: 'Depressão respiratória/morte', conduta: 'Evitar' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível em manutenção' },
    doencasRelacionadas: ['dependencia-opioide'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Anestésicos
  {
    id: 'propofol',
    nomeGenerico: 'Propofol',
    nomesComerciais: ['Diprivan'],
    atcCode: 'N01AX10',
    classeTerapeutica: 'analgesico',
    subclasse: 'anestesico_geral',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '10mg/ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '20mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Indução/manutenção anestesia', 'Sedação em UTI', 'Sedação para procedimentos'],
    mecanismoAcao: 'Potencializa GABA-A; rápido início e recuperação',
    posologias: [
      {
        indicacao: 'Indução anestesia',
        adultos: { dose: '1,5-2,5mg/kg', frequencia: 'IV bolus' },
      },
      {
        indicacao: 'Manutenção sedação',
        adultos: { dose: '1-4mg/kg/h', frequencia: 'Infusão IV contínua' },
      }
    ],
    contraindicacoes: ['Alergia a ovo/soja', 'Sem vias aéreas seguras'],
    efeitosAdversos: {
      comuns: ['Hipotensão', 'Dor à injeção', 'Apneia'],
      graves: ['Síndrome de infusão do propofol', 'Bradicardia', 'Hipertrigliceridemia']
    },
    interacoes: [
      { medicamento: 'Opioides', gravidade: 'moderada', efeito: 'Depressão respiratória', conduta: 'Reduzir doses' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Dose única compatível' },
    monitorizacao: ['SpO2', 'ECG', 'PA', 'Triglicérides (infusão prolongada)'],
    doencasRelacionadas: ['anestesia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'ketamina',
    nomeGenerico: 'Ketamina',
    nomesComerciais: ['Ketalar'],
    atcCode: 'N01AX03',
    classeTerapeutica: 'analgesico',
    subclasse: 'anestesico_dissociativo',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '50mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Anestesia dissociativa', 'Sedação para procedimentos', 'Dor crônica refratária', 'Depressão resistente'],
    mecanismoAcao: 'Antagonista NMDA; anestesia dissociativa mantendo reflexos',
    posologias: [
      {
        indicacao: 'Sedação procedimento',
        adultos: { dose: '0,5-2mg/kg IV ou 4-5mg/kg IM', frequencia: 'Dose única' },
      },
      {
        indicacao: 'Analgesia subdissociativa',
        adultos: { dose: '0,1-0,3mg/kg', frequencia: 'IV bolus ou infusão' },
      }
    ],
    contraindicacoes: ['HAS não controlada', 'Hipertensão intracraniana', 'Esquizofrenia'],
    efeitosAdversos: {
      comuns: ['Nistagmo', 'Sialorreia', 'Emergência (pesadelos)', 'Hipertensão'],
      graves: ['Laringoespasmo', 'Alucinações']
    },
    interacoes: [
      { medicamento: 'Depressores SNC', gravidade: 'moderada', efeito: 'Efeito aditivo', conduta: 'Reduzir doses' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Dose única compatível' },
    doencasRelacionadas: ['depressao-resistente'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'midazolam',
    nomeGenerico: 'Midazolam',
    nomesComerciais: ['Dormonid', 'Versed'],
    atcCode: 'N05CD08',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'benzodiazepínico',
    rename: true,
    apresentacoes: [
      { forma: 'comprimido', concentracao: '15mg', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '5mg/ml', disponivelSUS: true },
      { forma: 'solucao_oral', concentracao: '2mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Sedação para procedimentos', 'Indução anestésica', 'Status epilepticus', 'Ansiedade aguda'],
    mecanismoAcao: 'Potencializa GABA-A; hidrossolúvel; meia-vida curta',
    posologias: [
      {
        indicacao: 'Sedação procedimento',
        adultos: { dose: '0,02-0,1mg/kg IV', frequencia: 'Titulação', doseMaxima: '10mg' },
      },
      {
        indicacao: 'Status epilepticus',
        adultos: { dose: '0,2mg/kg IV ou IM', frequencia: 'Dose única' },
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'Miastenia gravis', 'Insuficiência respiratória grave'],
    efeitosAdversos: {
      comuns: ['Sonolência', 'Amnésia anterógrada', 'Hipotensão'],
      graves: ['Depressão respiratória', 'Parada respiratória', 'Reações paradoxais']
    },
    interacoes: [
      { medicamento: 'Opioides', gravidade: 'grave', efeito: 'Depressão respiratória', conduta: 'Reduzir doses' },
      { medicamento: 'Inibidores CYP3A4', gravidade: 'moderada', efeito: 'Aumenta níveis', conduta: 'Reduzir dose' },
    ],
    gestacao: 'D',
    amamentacao: { compativel: true, observacao: 'Dose única compatível' },
    ajusteDoseRenal: [
      { tfg: '<30', ajuste: 'Reduzir dose' },
    ],
    doencasRelacionadas: ['status-epilepticus', 'ansiedade'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'lidocaina',
    nomeGenerico: 'Lidocaína',
    nomesComerciais: ['Xylocaina', 'Xylestesin'],
    atcCode: 'N01BB02',
    classeTerapeutica: 'analgesico',
    subclasse: 'anestesico_local',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '1% sem vaso', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '2% com vaso', disponivelSUS: true },
      { forma: 'gel_topico', concentracao: '2%', disponivelSUS: true },
      { forma: 'adesivo', concentracao: '5%', disponivelSUS: false },
    ],
    indicacoes: ['Anestesia local/regional', 'Arritmias ventriculares', 'Dor neuropática (tópica)'],
    mecanismoAcao: 'Bloqueia canais de sódio; anestésico local tipo amida',
    posologias: [
      {
        indicacao: 'Anestesia local',
        adultos: { dose: 'Máx 4,5mg/kg sem vaso ou 7mg/kg com vaso', frequencia: 'Infiltração local' },
      },
      {
        indicacao: 'Arritmia ventricular',
        adultos: { dose: '1-1,5mg/kg IV bolus, depois infusão 1-4mg/min', frequencia: 'Contínua' },
      }
    ],
    contraindicacoes: ['Alergia a anestésicos amida', 'BAV grave (IV)'],
    efeitosAdversos: {
      comuns: ['Parestesias', 'Tontura (sistêmico)', 'Zumbido'],
      graves: ['Convulsões', 'Arritmias', 'Depressão miocárdica', 'Anafilaxia']
    },
    interacoes: [
      { medicamento: 'Betabloqueadores', gravidade: 'moderada', efeito: 'Reduz metabolismo hepático', conduta: 'Cautela' },
    ],
    gestacao: 'B',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['dor-neuropatica', 'arritmia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'bupivacaina',
    nomeGenerico: 'Bupivacaína',
    nomesComerciais: ['Marcaine', 'Neocaina'],
    atcCode: 'N01BB01',
    classeTerapeutica: 'analgesico',
    subclasse: 'anestesico_local',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel', concentracao: '0,25%', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '0,5%', disponivelSUS: true },
      { forma: 'injetavel', concentracao: '0,5% hiperbárica', disponivelSUS: true },
    ],
    indicacoes: ['Anestesia raquidiana', 'Bloqueio de nervos', 'Anestesia peridural'],
    mecanismoAcao: 'Anestésico local amida; longa duração',
    posologias: [
      {
        indicacao: 'Raquianestesia',
        adultos: { dose: '7,5-15mg hiperbárica', frequencia: 'Dose única intratecal' },
      }
    ],
    contraindicacoes: ['Alergia a amidas', 'Coagulopatia (bloqueio central)'],
    efeitosAdversos: {
      comuns: ['Hipotensão', 'Bradicardia (raqui)', 'Cefaleia pós-punção'],
      graves: ['Cardiotoxicidade', 'Convulsões', 'Parada cardíaca']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Compatível' },
    doencasRelacionadas: ['anestesia'],
    citations: [],
    lastUpdate: '2024-01-15'
  },

  // Antídotos
  {
    id: 'naloxona',
    nomeGenerico: 'Naloxona',
    nomesComerciais: ['Narcan'],
    atcCode: 'V03AB15',
    classeTerapeutica: 'analgesico',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '0,4mg/ml', disponivelSUS: true },
    ],
    indicacoes: ['Reversão de overdose de opioide', 'Reversão de sedação por opioide'],
    mecanismoAcao: 'Antagonista competitivo de receptores opioides',
    posologias: [
      {
        indicacao: 'Overdose opioide',
        adultos: { dose: '0,4-2mg IV', frequencia: 'Repetir a cada 2-3min PRN', observacoes: 'Pode precisar infusão contínua' },
      }
    ],
    contraindicacoes: ['Hipersensibilidade'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Vômitos', 'Taquicardia'],
      graves: ['Síndrome de abstinência (dependentes)', 'Edema pulmonar', 'Arritmias']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Emergência' },
    orientacoesPaciente: ['Meia-vida menor que muitos opioides; re-sedação possível'],
    doencasRelacionadas: ['overdose-opioide'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'flumazenil',
    nomeGenerico: 'Flumazenil',
    nomesComerciais: ['Lanexat'],
    atcCode: 'V03AB25',
    classeTerapeutica: 'ansiolitico',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '0,5mg/5ml', disponivelSUS: true },
    ],
    indicacoes: ['Reversão de sedação por benzodiazepínicos', 'Overdose de BZD'],
    mecanismoAcao: 'Antagonista competitivo do receptor GABA-A',
    posologias: [
      {
        indicacao: 'Reversão sedação',
        adultos: { dose: '0,2mg IV, repetir 0,1mg a cada min', frequencia: 'PRN', doseMaxima: '1mg' },
      }
    ],
    contraindicacoes: ['Uso crônico de BZD (epilépticos)', 'Ingestão de pró-convulsivantes'],
    efeitosAdversos: {
      comuns: ['Náuseas', 'Tontura', 'Agitação'],
      graves: ['Convulsões', 'Arritmias', 'Re-sedação']
    },
    interacoes: [],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Emergência' },
    doencasRelacionadas: ['overdose-benzodiazepinicos'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
  {
    id: 'atropina',
    nomeGenerico: 'Atropina',
    nomesComerciais: ['Atropina'],
    atcCode: 'A03BA01',
    classeTerapeutica: 'analgesico',
    subclasse: 'antidoto',
    rename: true,
    apresentacoes: [
      { forma: 'injetavel_iv', concentracao: '0,25mg/ml', disponivelSUS: true },
      { forma: 'injetavel_iv', concentracao: '0,5mg/ml', disponivelSUS: true },
      { forma: 'colirio', concentracao: '1%', disponivelSUS: true },
    ],
    indicacoes: ['Bradicardia sintomática', 'Intoxicação por organofosforados', 'Pré-medicação anestésica', 'Midríase diagnóstica'],
    mecanismoAcao: 'Antagonista muscarínico competitivo',
    posologias: [
      {
        indicacao: 'Bradicardia',
        adultos: { dose: '0,5-1mg IV', frequencia: 'Repetir a cada 3-5min', doseMaxima: '3mg' },
      },
      {
        indicacao: 'Intoxicação organofosforado',
        adultos: { dose: '2-4mg IV', frequencia: 'Repetir até atropinização' },
      }
    ],
    contraindicacoes: ['Glaucoma ângulo fechado', 'Íleo paralítico', 'Retenção urinária'],
    efeitosAdversos: {
      comuns: ['Boca seca', 'Visão turva', 'Taquicardia', 'Retenção urinária'],
      graves: ['Psicose anticolinérgica', 'Arritmias']
    },
    interacoes: [
      { medicamento: 'Outros anticolinérgicos', gravidade: 'moderada', efeito: 'Efeito aditivo', conduta: 'Cautela' },
    ],
    gestacao: 'C',
    amamentacao: { compativel: true, observacao: 'Pode reduzir lactação' },
    doencasRelacionadas: ['bradicardia', 'intoxicacao'],
    citations: [],
    lastUpdate: '2024-01-15'
  },
];
