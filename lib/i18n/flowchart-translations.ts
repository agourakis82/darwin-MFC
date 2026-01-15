/**
 * FLOWCHART TRANSLATIONS - DARWIN-MFC
 * ====================================
 *
 * Multilingual translations for clinical protocol flowcharts.
 * Supports 9 languages: pt, en, es, fr, ru, ar, zh, el, hi
 *
 * Structure:
 * - Protocol metadata (title, description, objectives)
 * - Node labels and descriptions
 * - Common medical terms
 */

import type { LanguageCode } from '@/lib/ontology/types/ontology';

// =============================================================================
// TYPES
// =============================================================================

export interface TranslatedText {
  pt: string;
  en: string;
  es: string;
  fr: string;
  ru: string;
  ar: string;
  zh: string;
  el: string;
  hi: string;
}

export interface ProtocolTranslation {
  id: string;
  titulo: TranslatedText;
  subtitulo?: Partial<TranslatedText>;
  descricao: TranslatedText;
  objetivos: TranslatedText[];
  populacaoAlvo: TranslatedText;
  nodes: Record<string, {
    label: TranslatedText;
    description?: Partial<TranslatedText>;
    details?: TranslatedText[];
  }>;
}

// =============================================================================
// COMMON MEDICAL TERMS
// =============================================================================

export const COMMON_MEDICAL_TERMS: Record<string, TranslatedText> = {
  // Actions
  start: {
    pt: 'Início',
    en: 'Start',
    es: 'Inicio',
    fr: 'Début',
    ru: 'Начало',
    ar: 'البداية',
    zh: '开始',
    el: 'Έναρξη',
    hi: 'शुरू',
  },
  end: {
    pt: 'Fim',
    en: 'End',
    es: 'Fin',
    fr: 'Fin',
    ru: 'Конец',
    ar: 'النهاية',
    zh: '结束',
    el: 'Τέλος',
    hi: 'अंत',
  },
  yes: {
    pt: 'Sim',
    en: 'Yes',
    es: 'Sí',
    fr: 'Oui',
    ru: 'Да',
    ar: 'نعم',
    zh: '是',
    el: 'Ναι',
    hi: 'हाँ',
  },
  no: {
    pt: 'Não',
    en: 'No',
    es: 'No',
    fr: 'Non',
    ru: 'Нет',
    ar: 'لا',
    zh: '否',
    el: 'Όχι',
    hi: 'नहीं',
  },
  evaluate: {
    pt: 'Avaliar',
    en: 'Evaluate',
    es: 'Evaluar',
    fr: 'Évaluer',
    ru: 'Оценить',
    ar: 'تقييم',
    zh: '评估',
    el: 'Αξιολόγηση',
    hi: 'मूल्यांकन',
  },
  treat: {
    pt: 'Tratar',
    en: 'Treat',
    es: 'Tratar',
    fr: 'Traiter',
    ru: 'Лечить',
    ar: 'علاج',
    zh: '治疗',
    el: 'Θεραπεία',
    hi: 'इलाज',
  },
  refer: {
    pt: 'Encaminhar',
    en: 'Refer',
    es: 'Derivar',
    fr: 'Orienter',
    ru: 'Направить',
    ar: 'إحالة',
    zh: '转诊',
    el: 'Παραπομπή',
    hi: 'रेफर करें',
  },
  monitor: {
    pt: 'Monitorar',
    en: 'Monitor',
    es: 'Monitorear',
    fr: 'Surveiller',
    ru: 'Мониторить',
    ar: 'مراقبة',
    zh: '监测',
    el: 'Παρακολούθηση',
    hi: 'निगरानी',
  },
  reassess: {
    pt: 'Reavaliar',
    en: 'Reassess',
    es: 'Reevaluar',
    fr: 'Réévaluer',
    ru: 'Переоценить',
    ar: 'إعادة التقييم',
    zh: '重新评估',
    el: 'Επαναξιολόγηση',
    hi: 'पुनर्मूल्यांकन',
  },

  // Clinical Terms
  diagnosis: {
    pt: 'Diagnóstico',
    en: 'Diagnosis',
    es: 'Diagnóstico',
    fr: 'Diagnostic',
    ru: 'Диагноз',
    ar: 'التشخيص',
    zh: '诊断',
    el: 'Διάγνωση',
    hi: 'निदान',
  },
  treatment: {
    pt: 'Tratamento',
    en: 'Treatment',
    es: 'Tratamiento',
    fr: 'Traitement',
    ru: 'Лечение',
    ar: 'العلاج',
    zh: '治疗',
    el: 'Θεραπεία',
    hi: 'उपचार',
  },
  symptoms: {
    pt: 'Sintomas',
    en: 'Symptoms',
    es: 'Síntomas',
    fr: 'Symptômes',
    ru: 'Симптомы',
    ar: 'الأعراض',
    zh: '症状',
    el: 'Συμπτώματα',
    hi: 'लक्षण',
  },
  exams: {
    pt: 'Exames',
    en: 'Tests',
    es: 'Exámenes',
    fr: 'Examens',
    ru: 'Анализы',
    ar: 'الفحوصات',
    zh: '检查',
    el: 'Εξετάσεις',
    hi: 'परीक्षण',
  },
  medication: {
    pt: 'Medicamento',
    en: 'Medication',
    es: 'Medicamento',
    fr: 'Médicament',
    ru: 'Лекарство',
    ar: 'الدواء',
    zh: '药物',
    el: 'Φάρμακο',
    hi: 'दवाई',
  },
  followUp: {
    pt: 'Acompanhamento',
    en: 'Follow-up',
    es: 'Seguimiento',
    fr: 'Suivi',
    ru: 'Наблюдение',
    ar: 'المتابعة',
    zh: '随访',
    el: 'Παρακολούθηση',
    hi: 'अनुवर्ती',
  },
  referral: {
    pt: 'Encaminhamento',
    en: 'Referral',
    es: 'Derivación',
    fr: 'Orientation',
    ru: 'Направление',
    ar: 'الإحالة',
    zh: '转诊',
    el: 'Παραπομπή',
    hi: 'रेफरल',
  },
  alert: {
    pt: 'Alerta',
    en: 'Alert',
    es: 'Alerta',
    fr: 'Alerte',
    ru: 'Предупреждение',
    ar: 'تنبيه',
    zh: '警报',
    el: 'Ειδοποίηση',
    hi: 'चेतावनी',
  },
  emergency: {
    pt: 'Urgência',
    en: 'Emergency',
    es: 'Urgencia',
    fr: 'Urgence',
    ru: 'Экстренность',
    ar: 'طوارئ',
    zh: '急诊',
    el: 'Έκτακτο',
    hi: 'आपातकाल',
  },

  // Risk Levels
  lowRisk: {
    pt: 'Baixo Risco',
    en: 'Low Risk',
    es: 'Bajo Riesgo',
    fr: 'Risque Faible',
    ru: 'Низкий риск',
    ar: 'خطر منخفض',
    zh: '低风险',
    el: 'Χαμηλός Κίνδυνος',
    hi: 'कम जोखिम',
  },
  moderateRisk: {
    pt: 'Risco Moderado',
    en: 'Moderate Risk',
    es: 'Riesgo Moderado',
    fr: 'Risque Modéré',
    ru: 'Умеренный риск',
    ar: 'خطر متوسط',
    zh: '中等风险',
    el: 'Μέτριος Κίνδυνος',
    hi: 'मध्यम जोखिम',
  },
  highRisk: {
    pt: 'Alto Risco',
    en: 'High Risk',
    es: 'Alto Riesgo',
    fr: 'Risque Élevé',
    ru: 'Высокий риск',
    ar: 'خطر مرتفع',
    zh: '高风险',
    el: 'Υψηλός Κίνδυνος',
    hi: 'उच्च जोखिम',
  },

  // Lifestyle
  lifestyle: {
    pt: 'Mudanças de Estilo de Vida',
    en: 'Lifestyle Changes',
    es: 'Cambios de Estilo de Vida',
    fr: 'Changements de Mode de Vie',
    ru: 'Изменение образа жизни',
    ar: 'تغييرات نمط الحياة',
    zh: '生活方式改变',
    el: 'Αλλαγές Τρόπου Ζωής',
    hi: 'जीवनशैली में बदलाव',
  },
  diet: {
    pt: 'Dieta',
    en: 'Diet',
    es: 'Dieta',
    fr: 'Régime',
    ru: 'Диета',
    ar: 'النظام الغذائي',
    zh: '饮食',
    el: 'Δίαιτα',
    hi: 'आहार',
  },
  exercise: {
    pt: 'Exercício Físico',
    en: 'Physical Exercise',
    es: 'Ejercicio Físico',
    fr: 'Exercice Physique',
    ru: 'Физические упражнения',
    ar: 'التمارين الرياضية',
    zh: '体育锻炼',
    el: 'Σωματική Άσκηση',
    hi: 'शारीरिक व्यायाम',
  },
  smoking: {
    pt: 'Cessar Tabagismo',
    en: 'Quit Smoking',
    es: 'Dejar de Fumar',
    fr: 'Arrêter de Fumer',
    ru: 'Бросить курить',
    ar: 'الإقلاع عن التدخين',
    zh: '戒烟',
    el: 'Διακοπή Καπνίσματος',
    hi: 'धूम्रपान छोड़ें',
  },
  alcohol: {
    pt: 'Moderar Álcool',
    en: 'Moderate Alcohol',
    es: 'Moderar Alcohol',
    fr: 'Modérer l\'Alcool',
    ru: 'Умеренное употребление алкоголя',
    ar: 'الاعتدال في الكحول',
    zh: '适度饮酒',
    el: 'Μέτρια Κατανάλωση Αλκοόλ',
    hi: 'शराब में संयम',
  },
};

// =============================================================================
// PROTOCOL TRANSLATIONS - HYPERTENSION
// =============================================================================

export const PROTOCOL_HAS: ProtocolTranslation = {
  id: 'has',
  titulo: {
    pt: 'Hipertensão Arterial Sistêmica',
    en: 'Systemic Arterial Hypertension',
    es: 'Hipertensión Arterial Sistémica',
    fr: 'Hypertension Artérielle Systémique',
    ru: 'Системная артериальная гипертензия',
    ar: 'ارتفاع ضغط الدم الشرياني الجهازي',
    zh: '全身性动脉高血压',
    el: 'Συστηματική Αρτηριακή Υπέρταση',
    hi: 'प्रणालीगत धमनी उच्च रक्तचाप',
  },
  descricao: {
    pt: 'Protocolo para diagnóstico, tratamento e acompanhamento da hipertensão arterial na Atenção Primária à Saúde',
    en: 'Protocol for diagnosis, treatment and follow-up of arterial hypertension in Primary Health Care',
    es: 'Protocolo para diagnóstico, tratamiento y seguimiento de la hipertensión arterial en Atención Primaria',
    fr: 'Protocole pour le diagnostic, le traitement et le suivi de l\'hypertension artérielle en soins primaires',
    ru: 'Протокол диагностики, лечения и наблюдения артериальной гипертензии в первичной медицинской помощи',
    ar: 'بروتوكول لتشخيص وعلاج ومتابعة ارتفاع ضغط الدم الشرياني في الرعاية الصحية الأولية',
    zh: '基层医疗中动脉高血压诊断、治疗和随访方案',
    el: 'Πρωτόκολλο για τη διάγνωση, θεραπεία και παρακολούθηση της αρτηριακής υπέρτασης στην Πρωτοβάθμια Φροντίδα Υγείας',
    hi: 'प्राथमिक स्वास्थ्य देखभाल में धमनी उच्च रक्तचाप के निदान, उपचार और अनुवर्ती के लिए प्रोटोकॉल',
  },
  objetivos: [
    {
      pt: 'Diagnosticar HAS corretamente',
      en: 'Correctly diagnose hypertension',
      es: 'Diagnosticar correctamente la HTA',
      fr: 'Diagnostiquer correctement l\'hypertension',
      ru: 'Правильно диагностировать гипертензию',
      ar: 'تشخيص ارتفاع ضغط الدم بشكل صحيح',
      zh: '正确诊断高血压',
      el: 'Σωστή διάγνωση υπέρτασης',
      hi: 'उच्च रक्तचाप का सही निदान करें',
    },
    {
      pt: 'Estratificar risco cardiovascular',
      en: 'Stratify cardiovascular risk',
      es: 'Estratificar el riesgo cardiovascular',
      fr: 'Stratifier le risque cardiovasculaire',
      ru: 'Стратифицировать сердечно-сосудистый риск',
      ar: 'تقسيم مخاطر القلب والأوعية الدموية',
      zh: '评估心血管风险',
      el: 'Διαστρωμάτωση καρδιαγγειακού κινδύνου',
      hi: 'हृदय जोखिम का वर्गीकरण करें',
    },
    {
      pt: 'Iniciar tratamento adequado',
      en: 'Initiate appropriate treatment',
      es: 'Iniciar tratamiento adecuado',
      fr: 'Initier un traitement approprié',
      ru: 'Начать соответствующее лечение',
      ar: 'بدء العلاج المناسب',
      zh: '开始适当治疗',
      el: 'Έναρξη κατάλληλης θεραπείας',
      hi: 'उचित उपचार शुरू करें',
    },
  ],
  populacaoAlvo: {
    pt: 'Adultos ≥18 anos com suspeita ou diagnóstico de HAS',
    en: 'Adults ≥18 years with suspected or diagnosed hypertension',
    es: 'Adultos ≥18 años con sospecha o diagnóstico de HTA',
    fr: 'Adultes ≥18 ans avec suspicion ou diagnostic d\'hypertension',
    ru: 'Взрослые ≥18 лет с подозрением или диагнозом гипертензии',
    ar: 'البالغون ≥18 سنة مع اشتباه أو تشخيص ارتفاع ضغط الدم',
    zh: '≥18岁疑似或确诊高血压的成人',
    el: 'Ενήλικες ≥18 ετών με υποψία ή διάγνωση υπέρτασης',
    hi: '≥18 वर्ष के वयस्क जिन्हें उच्च रक्तचाप का संदेह या निदान है',
  },
  nodes: {
    'has-start': {
      label: {
        pt: 'Início',
        en: 'Start',
        es: 'Inicio',
        fr: 'Début',
        ru: 'Начало',
        ar: 'البداية',
        zh: '开始',
        el: 'Έναρξη',
        hi: 'शुरू',
      },
      description: {
        pt: 'Paciente com suspeita de HAS',
        en: 'Patient with suspected hypertension',
        es: 'Paciente con sospecha de HTA',
        fr: 'Patient avec suspicion d\'hypertension',
        ru: 'Пациент с подозрением на гипертензию',
        ar: 'مريض مع اشتباه بارتفاع ضغط الدم',
        zh: '疑似高血压患者',
        el: 'Ασθενής με υποψία υπέρτασης',
        hi: 'संदिग्ध उच्च रक्तचाप वाला रोगी',
      },
    },
    'has-medir-pa': {
      label: {
        pt: 'Medir PA',
        en: 'Measure BP',
        es: 'Medir PA',
        fr: 'Mesurer TA',
        ru: 'Измерить АД',
        ar: 'قياس ضغط الدم',
        zh: '测量血压',
        el: 'Μέτρηση ΑΠ',
        hi: 'बीपी मापें',
      },
      description: {
        pt: 'Técnica correta, repouso 5min',
        en: 'Correct technique, 5min rest',
        es: 'Técnica correcta, reposo 5min',
        fr: 'Technique correcte, repos 5min',
        ru: 'Правильная техника, отдых 5 мин',
        ar: 'تقنية صحيحة، راحة 5 دقائق',
        zh: '正确技术，休息5分钟',
        el: 'Σωστή τεχνική, ανάπαυση 5 λεπτά',
        hi: 'सही तकनीक, 5 मिनट आराम',
      },
      details: [
        {
          pt: 'Paciente sentado, pés no chão',
          en: 'Patient seated, feet on floor',
          es: 'Paciente sentado, pies en el suelo',
          fr: 'Patient assis, pieds au sol',
          ru: 'Пациент сидит, ноги на полу',
          ar: 'المريض جالس، قدماه على الأرض',
          zh: '患者坐位，双脚着地',
          el: 'Ασθενής καθιστός, πόδια στο πάτωμα',
          hi: 'रोगी बैठा हो, पैर जमीन पर',
        },
        {
          pt: 'Braço na altura do coração',
          en: 'Arm at heart level',
          es: 'Brazo a la altura del corazón',
          fr: 'Bras au niveau du cœur',
          ru: 'Рука на уровне сердца',
          ar: 'الذراع على مستوى القلب',
          zh: '手臂与心脏同高',
          el: 'Χέρι στο ύψος της καρδιάς',
          hi: 'बांह हृदय के स्तर पर',
        },
        {
          pt: 'Manguito adequado',
          en: 'Appropriate cuff size',
          es: 'Manguito adecuado',
          fr: 'Brassard adapté',
          ru: 'Подходящая манжета',
          ar: 'حجم الكفة المناسب',
          zh: '合适的袖带',
          el: 'Κατάλληλη περιχειρίδα',
          hi: 'उचित कफ आकार',
        },
        {
          pt: 'Duas medidas com 1min intervalo',
          en: 'Two measurements 1min apart',
          es: 'Dos medidas con 1min de intervalo',
          fr: 'Deux mesures à 1min d\'intervalle',
          ru: 'Два измерения с интервалом 1 мин',
          ar: 'قياسان بفاصل دقيقة واحدة',
          zh: '两次测量间隔1分钟',
          el: 'Δύο μετρήσεις με 1 λεπτό διαφορά',
          hi: '1 मिनट के अंतर पर दो माप',
        },
      ],
    },
    'has-pa-elevada': {
      label: {
        pt: 'PA ≥ 140/90?',
        en: 'BP ≥ 140/90?',
        es: 'PA ≥ 140/90?',
        fr: 'TA ≥ 140/90?',
        ru: 'АД ≥ 140/90?',
        ar: 'ضغط الدم ≥ 140/90؟',
        zh: '血压 ≥ 140/90？',
        el: 'ΑΠ ≥ 140/90;',
        hi: 'बीपी ≥ 140/90?',
      },
    },
    'has-pa-normal': {
      label: {
        pt: 'PA Normal',
        en: 'Normal BP',
        es: 'PA Normal',
        fr: 'TA Normale',
        ru: 'Нормальное АД',
        ar: 'ضغط الدم طبيعي',
        zh: '血压正常',
        el: 'Φυσιολογική ΑΠ',
        hi: 'सामान्य बीपी',
      },
      description: {
        pt: 'Orientar MEV e reavaliar',
        en: 'Advise lifestyle changes and reassess',
        es: 'Orientar MEV y reevaluar',
        fr: 'Conseiller les changements de mode de vie et réévaluer',
        ru: 'Рекомендовать изменение образа жизни и переоценить',
        ar: 'نصح بتغييرات نمط الحياة وإعادة التقييم',
        zh: '建议生活方式改变并重新评估',
        el: 'Συμβουλές για αλλαγές τρόπου ζωής και επαναξιολόγηση',
        hi: 'जीवनशैली में बदलाव की सलाह दें और पुनर्मूल्यांकन करें',
      },
    },
    'has-confirmar': {
      label: {
        pt: 'Confirmar Diagnóstico',
        en: 'Confirm Diagnosis',
        es: 'Confirmar Diagnóstico',
        fr: 'Confirmer le Diagnostic',
        ru: 'Подтвердить диагноз',
        ar: 'تأكيد التشخيص',
        zh: '确认诊断',
        el: 'Επιβεβαίωση Διάγνωσης',
        hi: 'निदान की पुष्टि करें',
      },
      description: {
        pt: 'MRPA ou MAPA',
        en: 'HBPM or ABPM',
        es: 'MRPA o MAPA',
        fr: 'MAPA ou AMT',
        ru: 'СМАД или ДМАД',
        ar: 'HBPM أو ABPM',
        zh: 'HBPM或ABPM',
        el: 'HBPM ή ABPM',
        hi: 'HBPM या ABPM',
      },
    },
    'has-confirmado': {
      label: {
        pt: 'HAS Confirmada?',
        en: 'HTN Confirmed?',
        es: '¿HTA Confirmada?',
        fr: 'HTA Confirmée?',
        ru: 'АГ подтверждена?',
        ar: 'تأكيد ارتفاع ضغط الدم؟',
        zh: '高血压确诊？',
        el: 'Υπέρταση Επιβεβαιώθηκε;',
        hi: 'उच्च रक्तचाप की पुष्टि?',
      },
    },
    'has-estratificar': {
      label: {
        pt: 'Estratificar Risco CV',
        en: 'Stratify CV Risk',
        es: 'Estratificar Riesgo CV',
        fr: 'Stratifier le Risque CV',
        ru: 'Стратифицировать СС риск',
        ar: 'تقسيم مخاطر القلب',
        zh: '评估心血管风险',
        el: 'Διαστρωμάτωση Καρδιαγγειακού Κινδύνου',
        hi: 'हृदय जोखिम का वर्गीकरण',
      },
      description: {
        pt: 'Avaliar LOA e FRCV',
        en: 'Assess TOD and CVRF',
        es: 'Evaluar LOA y FRCV',
        fr: 'Évaluer AOC et FDRCV',
        ru: 'Оценить ПОМ и ФРССЗ',
        ar: 'تقييم تلف الأعضاء المستهدفة وعوامل الخطر',
        zh: '评估靶器官损害和心血管危险因素',
        el: 'Αξιολόγηση βλάβης οργάνων-στόχων',
        hi: 'लक्ष्य अंग क्षति और जोखिम कारकों का मूल्यांकन',
      },
    },
    'has-estagio1': {
      label: {
        pt: 'Estágio 1 + Baixo Risco',
        en: 'Stage 1 + Low Risk',
        es: 'Estadio 1 + Bajo Riesgo',
        fr: 'Stade 1 + Risque Faible',
        ru: 'Стадия 1 + низкий риск',
        ar: 'المرحلة 1 + خطر منخفض',
        zh: '1期 + 低风险',
        el: 'Στάδιο 1 + Χαμηλός Κίνδυνος',
        hi: 'चरण 1 + कम जोखिम',
      },
      description: {
        pt: 'PA 140-159/90-99',
        en: 'BP 140-159/90-99',
        es: 'PA 140-159/90-99',
        fr: 'TA 140-159/90-99',
        ru: 'АД 140-159/90-99',
        ar: 'ضغط الدم 140-159/90-99',
        zh: '血压 140-159/90-99',
        el: 'ΑΠ 140-159/90-99',
        hi: 'बीपी 140-159/90-99',
      },
    },
    'has-mev': {
      label: {
        pt: 'MEV 3-6 meses',
        en: 'Lifestyle 3-6 months',
        es: 'MEV 3-6 meses',
        fr: 'MHD 3-6 mois',
        ru: 'Изменение образа жизни 3-6 мес',
        ar: 'تغييرات نمط الحياة 3-6 أشهر',
        zh: '生活方式改变 3-6个月',
        el: 'Αλλαγές τρόπου ζωής 3-6 μήνες',
        hi: 'जीवनशैली 3-6 महीने',
      },
      description: {
        pt: 'Mudanças de estilo de vida',
        en: 'Lifestyle changes',
        es: 'Cambios de estilo de vida',
        fr: 'Changements de mode de vie',
        ru: 'Изменение образа жизни',
        ar: 'تغييرات نمط الحياة',
        zh: '生活方式改变',
        el: 'Αλλαγές τρόπου ζωής',
        hi: 'जीवनशैली में बदलाव',
      },
    },
    'has-estagio2-3': {
      label: {
        pt: 'Estágio 2-3 ou Alto Risco',
        en: 'Stage 2-3 or High Risk',
        es: 'Estadio 2-3 o Alto Riesgo',
        fr: 'Stade 2-3 ou Risque Élevé',
        ru: 'Стадия 2-3 или высокий риск',
        ar: 'المرحلة 2-3 أو خطر مرتفع',
        zh: '2-3期或高风险',
        el: 'Στάδιο 2-3 ή Υψηλός Κίνδυνος',
        hi: 'चरण 2-3 या उच्च जोखिम',
      },
      description: {
        pt: 'PA ≥160/100 ou risco elevado',
        en: 'BP ≥160/100 or high risk',
        es: 'PA ≥160/100 o riesgo elevado',
        fr: 'TA ≥160/100 ou risque élevé',
        ru: 'АД ≥160/100 или высокий риск',
        ar: 'ضغط الدم ≥160/100 أو خطر مرتفع',
        zh: '血压 ≥160/100 或高风险',
        el: 'ΑΠ ≥160/100 ή υψηλός κίνδυνος',
        hi: 'बीपी ≥160/100 या उच्च जोखिम',
      },
    },
    'has-iniciar-tto': {
      label: {
        pt: 'Iniciar Tratamento',
        en: 'Start Treatment',
        es: 'Iniciar Tratamiento',
        fr: 'Débuter le Traitement',
        ru: 'Начать лечение',
        ar: 'بدء العلاج',
        zh: '开始治疗',
        el: 'Έναρξη Θεραπείας',
        hi: 'उपचार शुरू करें',
      },
      description: {
        pt: 'MEV + Farmacológico',
        en: 'Lifestyle + Pharmacological',
        es: 'MEV + Farmacológico',
        fr: 'MHD + Pharmacologique',
        ru: 'Изменение образа жизни + медикаменты',
        ar: 'نمط الحياة + دوائي',
        zh: '生活方式 + 药物',
        el: 'Τρόπος ζωής + Φαρμακολογική',
        hi: 'जीवनशैली + औषधीय',
      },
    },
    'has-meta': {
      label: {
        pt: 'Meta Atingida?',
        en: 'Target Achieved?',
        es: '¿Meta Alcanzada?',
        fr: 'Objectif Atteint?',
        ru: 'Цель достигнута?',
        ar: 'هل تم تحقيق الهدف؟',
        zh: '达到目标？',
        el: 'Επιτεύχθηκε ο Στόχος;',
        hi: 'लक्ष्य प्राप्त?',
      },
      description: {
        pt: 'PA <140/90 (ou <130/80 se alto risco)',
        en: 'BP <140/90 (or <130/80 if high risk)',
        es: 'PA <140/90 (o <130/80 si alto riesgo)',
        fr: 'TA <140/90 (ou <130/80 si risque élevé)',
        ru: 'АД <140/90 (или <130/80 при высоком риске)',
        ar: 'ضغط الدم <140/90 (أو <130/80 إذا خطر مرتفع)',
        zh: '血压 <140/90（高风险<130/80）',
        el: 'ΑΠ <140/90 (ή <130/80 αν υψηλός κίνδυνος)',
        hi: 'बीपी <140/90 (या <130/80 यदि उच्च जोखिम)',
      },
    },
    'has-manter': {
      label: {
        pt: 'Manter Tratamento',
        en: 'Maintain Treatment',
        es: 'Mantener Tratamiento',
        fr: 'Maintenir le Traitement',
        ru: 'Продолжить лечение',
        ar: 'الحفاظ على العلاج',
        zh: '维持治疗',
        el: 'Διατήρηση Θεραπείας',
        hi: 'उपचार जारी रखें',
      },
      description: {
        pt: 'Acompanhamento regular',
        en: 'Regular follow-up',
        es: 'Seguimiento regular',
        fr: 'Suivi régulier',
        ru: 'Регулярное наблюдение',
        ar: 'متابعة منتظمة',
        zh: '定期随访',
        el: 'Τακτική παρακολούθηση',
        hi: 'नियमित अनुवर्ती',
      },
    },
    'has-intensificar': {
      label: {
        pt: 'Intensificar',
        en: 'Intensify',
        es: 'Intensificar',
        fr: 'Intensifier',
        ru: 'Интенсифицировать',
        ar: 'تكثيف',
        zh: '强化',
        el: 'Εντατικοποίηση',
        hi: 'तीव्र करें',
      },
      description: {
        pt: 'Adicionar 3ª droga',
        en: 'Add 3rd drug',
        es: 'Agregar 3ª droga',
        fr: 'Ajouter 3ème médicament',
        ru: 'Добавить 3-й препарат',
        ar: 'إضافة الدواء الثالث',
        zh: '添加第三种药物',
        el: 'Προσθήκη 3ου φαρμάκου',
        hi: 'तीसरी दवा जोड़ें',
      },
    },
  },
};

// =============================================================================
// PROTOCOL TRANSLATIONS - TYPE 2 DIABETES
// =============================================================================

export const PROTOCOL_DM2: ProtocolTranslation = {
  id: 'dm2',
  titulo: {
    pt: 'Diabetes Mellitus Tipo 2',
    en: 'Type 2 Diabetes Mellitus',
    es: 'Diabetes Mellitus Tipo 2',
    fr: 'Diabète de Type 2',
    ru: 'Сахарный диабет 2 типа',
    ar: 'داء السكري من النوع 2',
    zh: '2型糖尿病',
    el: 'Διαβήτης Τύπου 2',
    hi: 'टाइप 2 मधुमेह',
  },
  descricao: {
    pt: 'Protocolo para diagnóstico, tratamento e acompanhamento do diabetes tipo 2 na APS',
    en: 'Protocol for diagnosis, treatment and follow-up of type 2 diabetes in Primary Care',
    es: 'Protocolo para diagnóstico, tratamiento y seguimiento de la diabetes tipo 2 en APS',
    fr: 'Protocole pour le diagnostic, traitement et suivi du diabète de type 2 en soins primaires',
    ru: 'Протокол диагностики, лечения и наблюдения сахарного диабета 2 типа в первичной помощи',
    ar: 'بروتوكول لتشخيص وعلاج ومتابعة داء السكري من النوع 2 في الرعاية الأولية',
    zh: '基层医疗中2型糖尿病诊断、治疗和随访方案',
    el: 'Πρωτόκολλο διάγνωσης, θεραπείας και παρακολούθησης διαβήτη τύπου 2 στην Πρωτοβάθμια Φροντίδα',
    hi: 'प्राथमिक देखभाल में टाइप 2 मधुमेह के निदान, उपचार और अनुवर्ती के लिए प्रोटोकॉल',
  },
  objetivos: [
    {
      pt: 'Diagnosticar DM2 precocemente',
      en: 'Early diagnosis of T2DM',
      es: 'Diagnosticar DM2 precozmente',
      fr: 'Diagnostic précoce du DT2',
      ru: 'Ранняя диагностика СД2',
      ar: 'التشخيص المبكر لداء السكري النوع 2',
      zh: '早期诊断2型糖尿病',
      el: 'Πρώιμη διάγνωση ΣΔΤ2',
      hi: 'T2DM का शीघ्र निदान',
    },
    {
      pt: 'Atingir metas glicêmicas',
      en: 'Achieve glycemic targets',
      es: 'Alcanzar metas glucémicas',
      fr: 'Atteindre les objectifs glycémiques',
      ru: 'Достичь целевых показателей гликемии',
      ar: 'تحقيق أهداف السكر في الدم',
      zh: '达到血糖目标',
      el: 'Επίτευξη γλυκαιμικών στόχων',
      hi: 'ग्लाइसेमिक लक्ष्य प्राप्त करें',
    },
    {
      pt: 'Prevenir complicações',
      en: 'Prevent complications',
      es: 'Prevenir complicaciones',
      fr: 'Prévenir les complications',
      ru: 'Предотвратить осложнения',
      ar: 'منع المضاعفات',
      zh: '预防并发症',
      el: 'Πρόληψη επιπλοκών',
      hi: 'जटिलताओं को रोकें',
    },
  ],
  populacaoAlvo: {
    pt: 'Adultos com suspeita ou diagnóstico de DM2',
    en: 'Adults with suspected or diagnosed T2DM',
    es: 'Adultos con sospecha o diagnóstico de DM2',
    fr: 'Adultes avec suspicion ou diagnostic de DT2',
    ru: 'Взрослые с подозрением или диагнозом СД2',
    ar: 'البالغون مع اشتباه أو تشخيص داء السكري النوع 2',
    zh: '疑似或确诊2型糖尿病的成人',
    el: 'Ενήλικες με υποψία ή διάγνωση ΣΔΤ2',
    hi: 'संदिग्ध या निदान T2DM वाले वयस्क',
  },
  nodes: {
    'dm2-start': {
      label: {
        pt: 'Início',
        en: 'Start',
        es: 'Inicio',
        fr: 'Début',
        ru: 'Начало',
        ar: 'البداية',
        zh: '开始',
        el: 'Έναρξη',
        hi: 'शुरू',
      },
      description: {
        pt: 'Rastreamento ou suspeita clínica',
        en: 'Screening or clinical suspicion',
        es: 'Tamizaje o sospecha clínica',
        fr: 'Dépistage ou suspicion clinique',
        ru: 'Скрининг или клиническое подозрение',
        ar: 'الفحص أو الاشتباه السريري',
        zh: '筛查或临床怀疑',
        el: 'Έλεγχος ή κλινική υποψία',
        hi: 'स्क्रीनिंग या नैदानिक संदेह',
      },
    },
    'dm2-glicemia': {
      label: {
        pt: 'Dosar Glicemia',
        en: 'Check Glucose',
        es: 'Medir Glucemia',
        fr: 'Doser Glycémie',
        ru: 'Проверить глюкозу',
        ar: 'قياس الجلوكوز',
        zh: '检测血糖',
        el: 'Μέτρηση Γλυκόζης',
        hi: 'ग्लूकोज जांचें',
      },
      description: {
        pt: 'Glicemia de jejum ou HbA1c',
        en: 'Fasting glucose or HbA1c',
        es: 'Glucemia en ayunas o HbA1c',
        fr: 'Glycémie à jeun ou HbA1c',
        ru: 'Глюкоза натощак или HbA1c',
        ar: 'جلوكوز الصيام أو HbA1c',
        zh: '空腹血糖或HbA1c',
        el: 'Γλυκόζη νηστείας ή HbA1c',
        hi: 'फास्टिंग ग्लूकोज या HbA1c',
      },
    },
    'dm2-criterios': {
      label: {
        pt: 'Critérios Diagnósticos',
        en: 'Diagnostic Criteria',
        es: 'Criterios Diagnósticos',
        fr: 'Critères Diagnostiques',
        ru: 'Диагностические критерии',
        ar: 'معايير التشخيص',
        zh: '诊断标准',
        el: 'Διαγνωστικά Κριτήρια',
        hi: 'नैदानिक मानदंड',
      },
      description: {
        pt: 'GJ ≥126 ou HbA1c ≥6.5%',
        en: 'FG ≥126 or HbA1c ≥6.5%',
        es: 'GA ≥126 o HbA1c ≥6.5%',
        fr: 'GAJ ≥126 ou HbA1c ≥6.5%',
        ru: 'ГН ≥126 или HbA1c ≥6.5%',
        ar: 'جلوكوز الصيام ≥126 أو HbA1c ≥6.5%',
        zh: '空腹血糖≥126或HbA1c≥6.5%',
        el: 'ΓΝ ≥126 ή HbA1c ≥6.5%',
        hi: 'FG ≥126 या HbA1c ≥6.5%',
      },
    },
    'dm2-meta-hba1c': {
      label: {
        pt: 'Meta HbA1c',
        en: 'HbA1c Target',
        es: 'Meta HbA1c',
        fr: 'Objectif HbA1c',
        ru: 'Цель HbA1c',
        ar: 'هدف HbA1c',
        zh: 'HbA1c目标',
        el: 'Στόχος HbA1c',
        hi: 'HbA1c लक्ष्य',
      },
      description: {
        pt: 'Individualizar: 6.5-8%',
        en: 'Individualize: 6.5-8%',
        es: 'Individualizar: 6.5-8%',
        fr: 'Individualiser: 6.5-8%',
        ru: 'Индивидуализировать: 6.5-8%',
        ar: 'تخصيص: 6.5-8%',
        zh: '个体化：6.5-8%',
        el: 'Εξατομίκευση: 6.5-8%',
        hi: 'व्यक्तिगत: 6.5-8%',
      },
    },
    'dm2-metformina': {
      label: {
        pt: 'Iniciar Metformina',
        en: 'Start Metformin',
        es: 'Iniciar Metformina',
        fr: 'Débuter Metformine',
        ru: 'Начать метформин',
        ar: 'بدء الميتفورمين',
        zh: '开始二甲双胍',
        el: 'Έναρξη Μετφορμίνης',
        hi: 'मेटफॉर्मिन शुरू करें',
      },
      description: {
        pt: '500mg 1-2x/dia, titular até 2g',
        en: '500mg 1-2x/day, titrate to 2g',
        es: '500mg 1-2x/día, titular hasta 2g',
        fr: '500mg 1-2x/jour, titrer jusqu\'à 2g',
        ru: '500мг 1-2 раза/день, титровать до 2г',
        ar: '500 مجم 1-2 مرة/يوم، معايرة حتى 2جم',
        zh: '500mg 每日1-2次，滴定至2g',
        el: '500mg 1-2x/ημέρα, τιτλοποίηση έως 2g',
        hi: '500mg 1-2x/दिन, 2g तक टाइट्रेट करें',
      },
    },
  },
};

// =============================================================================
// ALL PROTOCOL TRANSLATIONS
// =============================================================================

export const ALL_PROTOCOL_TRANSLATIONS: ProtocolTranslation[] = [
  PROTOCOL_HAS,
  PROTOCOL_DM2,
  // Additional protocols would be added here...
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get translation for a specific text key
 */
export function getTranslation(
  text: TranslatedText | Partial<TranslatedText>,
  locale: LanguageCode
): string {
  const key = locale as keyof TranslatedText;
  return text[key] || text.pt || text.en || '';
}

/**
 * Get protocol translation by ID
 */
export function getProtocolTranslation(id: string): ProtocolTranslation | undefined {
  return ALL_PROTOCOL_TRANSLATIONS.find(p => p.id === id);
}

/**
 * Get translated node data
 */
export function getTranslatedNode(
  protocolId: string,
  nodeId: string,
  locale: LanguageCode
): { label: string; description?: string; details?: string[] } | undefined {
  const protocol = getProtocolTranslation(protocolId);
  if (!protocol) return undefined;

  const node = protocol.nodes[nodeId];
  if (!node) return undefined;

  return {
    label: getTranslation(node.label, locale),
    description: node.description ? getTranslation(node.description, locale) : undefined,
    details: node.details?.map(d => getTranslation(d, locale)),
  };
}

/**
 * Get common medical term translation
 */
export function getMedicalTerm(key: string, locale: LanguageCode): string {
  const term = COMMON_MEDICAL_TERMS[key];
  return term ? getTranslation(term, locale) : key;
}

/**
 * Get all common terms for a locale
 */
export function getAllMedicalTerms(locale: LanguageCode): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(COMMON_MEDICAL_TERMS)) {
    result[key] = getTranslation(value, locale);
  }
  return result;
}

/**
 * Check if a protocol has translations
 */
export function hasTranslation(protocolId: string): boolean {
  return ALL_PROTOCOL_TRANSLATIONS.some(p => p.id === protocolId);
}

/**
 * Get all available translated protocol IDs
 */
export function getTranslatedProtocolIds(): string[] {
  return ALL_PROTOCOL_TRANSLATIONS.map(p => p.id);
}

/**
 * Get protocol title in a specific language
 */
export function getProtocolTitle(protocolId: string, locale: LanguageCode): string {
  const protocol = getProtocolTranslation(protocolId);
  return protocol ? getTranslation(protocol.titulo, locale) : protocolId;
}

/**
 * Get protocol description in a specific language
 */
export function getProtocolDescription(protocolId: string, locale: LanguageCode): string {
  const protocol = getProtocolTranslation(protocolId);
  return protocol ? getTranslation(protocol.descricao, locale) : '';
}

export default {
  COMMON_MEDICAL_TERMS,
  ALL_PROTOCOL_TRANSLATIONS,
  getTranslation,
  getProtocolTranslation,
  getTranslatedNode,
  getMedicalTerm,
  getAllMedicalTerms,
  hasTranslation,
  getTranslatedProtocolIds,
  getProtocolTitle,
  getProtocolDescription,
};
