/**
 * MEDICAL TERMINOLOGY GLOSSARY - DARWIN-MFC
 * ==========================================
 *
 * Standardized medical terminology for translation consistency.
 * Uses official sources:
 * - INN (International Nonproprietary Names) - WHO
 * - ICD-11 (International Classification of Diseases) - WHO
 * - SNOMED-CT terminology
 * - Medical Subject Headings (MeSH)
 *
 * This glossary ensures AI translations use correct medical terminology
 * across all supported languages.
 */

import { SupportedLocale } from '../diseases/schema';

// =============================================================================
// GLOSSARY ENTRY TYPES
// =============================================================================

export interface GlossaryEntry {
  /** Portuguese term (source) */
  pt: string;
  /** English term (INN/ICD-11 standard) */
  en: string;
  /** Spanish term */
  es: string;
  /** French term */
  fr: string;
  /** Russian term */
  ru: string;
  /** Arabic term */
  ar: string;
  /** Chinese (Simplified) term */
  zh: string;
  /** Greek term */
  el: string;
  /** Hindi term */
  hi: string;
  /** Source of the term (INN, ICD-11, MeSH, etc.) */
  source?: 'INN' | 'ICD-11' | 'SNOMED-CT' | 'MeSH' | 'clinical';
  /** Context or usage notes */
  notes?: string;
}

export type GlossaryCategory =
  | 'therapeutic_classes'
  | 'anatomical_systems'
  | 'clinical_terms'
  | 'dosage_forms'
  | 'frequency_terms'
  | 'severity_terms'
  | 'diagnostic_terms'
  | 'treatment_terms'
  | 'abbreviations';

// =============================================================================
// THERAPEUTIC CLASS NAMES (for medication classification)
// =============================================================================

export const THERAPEUTIC_CLASSES: GlossaryEntry[] = [
  {
    pt: 'Anti-hipertensivo',
    en: 'Antihypertensive',
    es: 'Antihipertensivo',
    fr: 'Antihypertenseur',
    ru: 'Антигипертензивное средство',
    ar: 'خافض ضغط الدم',
    zh: '抗高血压药',
    el: 'Αντιυπερτασικό',
    hi: 'उच्चरक्तचापरोधी',
    source: 'INN',
  },
  {
    pt: 'Antibiótico',
    en: 'Antibiotic',
    es: 'Antibiótico',
    fr: 'Antibiotique',
    ru: 'Антибиотик',
    ar: 'مضاد حيوي',
    zh: '抗生素',
    el: 'Αντιβιοτικό',
    hi: 'प्रतिजैविक',
    source: 'INN',
  },
  {
    pt: 'Antidiabético',
    en: 'Antidiabetic',
    es: 'Antidiabético',
    fr: 'Antidiabétique',
    ru: 'Противодиабетическое средство',
    ar: 'مضاد السكري',
    zh: '降糖药',
    el: 'Αντιδιαβητικό',
    hi: 'मधुमेहरोधी',
    source: 'INN',
  },
  {
    pt: 'Antidepressivo',
    en: 'Antidepressant',
    es: 'Antidepresivo',
    fr: 'Antidépresseur',
    ru: 'Антидепрессант',
    ar: 'مضاد الاكتئاب',
    zh: '抗抑郁药',
    el: 'Αντικαταθλιπτικό',
    hi: 'अवसादरोधी',
    source: 'INN',
  },
  {
    pt: 'Analgésico',
    en: 'Analgesic',
    es: 'Analgésico',
    fr: 'Analgésique',
    ru: 'Анальгетик',
    ar: 'مسكن ألم',
    zh: '镇痛药',
    el: 'Αναλγητικό',
    hi: 'पीड़ाहारी',
    source: 'INN',
  },
  {
    pt: 'Anti-inflamatório',
    en: 'Anti-inflammatory',
    es: 'Antiinflamatorio',
    fr: 'Anti-inflammatoire',
    ru: 'Противовоспалительное средство',
    ar: 'مضاد للالتهاب',
    zh: '抗炎药',
    el: 'Αντιφλεγμονώδες',
    hi: 'सूजनरोधी',
    source: 'INN',
  },
  {
    pt: 'Anticoagulante',
    en: 'Anticoagulant',
    es: 'Anticoagulante',
    fr: 'Anticoagulant',
    ru: 'Антикоагулянт',
    ar: 'مضاد التخثر',
    zh: '抗凝血药',
    el: 'Αντιπηκτικό',
    hi: 'थक्कारोधी',
    source: 'INN',
  },
  {
    pt: 'Broncodilatador',
    en: 'Bronchodilator',
    es: 'Broncodilatador',
    fr: 'Bronchodilatateur',
    ru: 'Бронходилататор',
    ar: 'موسع قصبي',
    zh: '支气管扩张剂',
    el: 'Βρογχοδιασταλτικό',
    hi: 'श्वासनली विस्तारक',
    source: 'INN',
  },
  {
    pt: 'Corticoide',
    en: 'Corticosteroid',
    es: 'Corticoide',
    fr: 'Corticoïde',
    ru: 'Кортикостероид',
    ar: 'كورتيكوستيرويد',
    zh: '皮质类固醇',
    el: 'Κορτικοστεροειδές',
    hi: 'कॉर्टिकोस्टेरॉइड',
    source: 'INN',
  },
  {
    pt: 'Diurético',
    en: 'Diuretic',
    es: 'Diurético',
    fr: 'Diurétique',
    ru: 'Диуретик',
    ar: 'مدر للبول',
    zh: '利尿剂',
    el: 'Διουρητικό',
    hi: 'मूत्रवर्धक',
    source: 'INN',
  },
];

// =============================================================================
// ANATOMICAL SYSTEMS (ICD-11 chapter names)
// =============================================================================

export const ANATOMICAL_SYSTEMS: GlossaryEntry[] = [
  {
    pt: 'Cardiovascular',
    en: 'Cardiovascular',
    es: 'Cardiovascular',
    fr: 'Cardiovasculaire',
    ru: 'Сердечно-сосудистая',
    ar: 'القلب والأوعية الدموية',
    zh: '心血管',
    el: 'Καρδιαγγειακό',
    hi: 'हृदय संबंधी',
    source: 'ICD-11',
  },
  {
    pt: 'Respiratório',
    en: 'Respiratory',
    es: 'Respiratorio',
    fr: 'Respiratoire',
    ru: 'Дыхательная',
    ar: 'الجهاز التنفسي',
    zh: '呼吸系统',
    el: 'Αναπνευστικό',
    hi: 'श्वसन',
    source: 'ICD-11',
  },
  {
    pt: 'Gastrointestinal',
    en: 'Gastrointestinal',
    es: 'Gastrointestinal',
    fr: 'Gastro-intestinal',
    ru: 'Желудочно-кишечная',
    ar: 'الجهاز الهضمي',
    zh: '胃肠道',
    el: 'Γαστρεντερικό',
    hi: 'जठरांत्र',
    source: 'ICD-11',
  },
  {
    pt: 'Neurológico',
    en: 'Neurological',
    es: 'Neurológico',
    fr: 'Neurologique',
    ru: 'Неврологическая',
    ar: 'العصبي',
    zh: '神经系统',
    el: 'Νευρολογικό',
    hi: 'तंत्रिका संबंधी',
    source: 'ICD-11',
  },
  {
    pt: 'Endócrino',
    en: 'Endocrine',
    es: 'Endocrino',
    fr: 'Endocrinien',
    ru: 'Эндокринная',
    ar: 'الغدد الصماء',
    zh: '内分泌',
    el: 'Ενδοκρινικό',
    hi: 'अंतःस्रावी',
    source: 'ICD-11',
  },
  {
    pt: 'Musculoesquelético',
    en: 'Musculoskeletal',
    es: 'Musculoesquelético',
    fr: 'Musculosquelettique',
    ru: 'Опорно-двигательная',
    ar: 'العضلي الهيكلي',
    zh: '肌肉骨骼',
    el: 'Μυοσκελετικό',
    hi: 'मस्कुलोस्केलेटल',
    source: 'ICD-11',
  },
  {
    pt: 'Dermatológico',
    en: 'Dermatological',
    es: 'Dermatológico',
    fr: 'Dermatologique',
    ru: 'Дерматологическая',
    ar: 'الجلدي',
    zh: '皮肤科',
    el: 'Δερματολογικό',
    hi: 'त्वचा संबंधी',
    source: 'ICD-11',
  },
  {
    pt: 'Hematológico',
    en: 'Hematological',
    es: 'Hematológico',
    fr: 'Hématologique',
    ru: 'Гематологическая',
    ar: 'الدم',
    zh: '血液学',
    el: 'Αιματολογικό',
    hi: 'रक्त संबंधी',
    source: 'ICD-11',
  },
];

// =============================================================================
// CLINICAL TERMS (common medical terminology)
// =============================================================================

export const CLINICAL_TERMS: GlossaryEntry[] = [
  {
    pt: 'Diagnóstico',
    en: 'Diagnosis',
    es: 'Diagnóstico',
    fr: 'Diagnostic',
    ru: 'Диагноз',
    ar: 'التشخيص',
    zh: '诊断',
    el: 'Διάγνωση',
    hi: 'निदान',
    source: 'clinical',
  },
  {
    pt: 'Tratamento',
    en: 'Treatment',
    es: 'Tratamiento',
    fr: 'Traitement',
    ru: 'Лечение',
    ar: 'العلاج',
    zh: '治疗',
    el: 'Θεραπεία',
    hi: 'उपचार',
    source: 'clinical',
  },
  {
    pt: 'Contraindicação',
    en: 'Contraindication',
    es: 'Contraindicación',
    fr: 'Contre-indication',
    ru: 'Противопоказание',
    ar: 'موانع الاستعمال',
    zh: '禁忌症',
    el: 'Αντένδειξη',
    hi: 'प्रतिनिर्देश',
    source: 'clinical',
  },
  {
    pt: 'Efeito adverso',
    en: 'Adverse effect',
    es: 'Efecto adverso',
    fr: 'Effet indésirable',
    ru: 'Побочный эффект',
    ar: 'أثر جانبي',
    zh: '不良反应',
    el: 'Ανεπιθύμητη ενέργεια',
    hi: 'प्रतिकूल प्रभाव',
    source: 'clinical',
  },
  {
    pt: 'Posologia',
    en: 'Dosage',
    es: 'Posología',
    fr: 'Posologie',
    ru: 'Дозировка',
    ar: 'الجرعات',
    zh: '剂量',
    el: 'Δοσολογία',
    hi: 'मात्रा',
    source: 'clinical',
  },
  {
    pt: 'Interação medicamentosa',
    en: 'Drug interaction',
    es: 'Interacción medicamentosa',
    fr: 'Interaction médicamenteuse',
    ru: 'Лекарственное взаимодействие',
    ar: 'تفاعل دوائي',
    zh: '药物相互作用',
    el: 'Φαρμακευτική αλληλεπίδραση',
    hi: 'औषधि अंतःक्रिया',
    source: 'clinical',
  },
  {
    pt: 'Prevalência',
    en: 'Prevalence',
    es: 'Prevalencia',
    fr: 'Prévalence',
    ru: 'Распространенность',
    ar: 'الانتشار',
    zh: '患病率',
    el: 'Επιπολασμός',
    hi: 'प्रसार',
    source: 'clinical',
  },
  {
    pt: 'Incidência',
    en: 'Incidence',
    es: 'Incidencia',
    fr: 'Incidence',
    ru: 'Заболеваемость',
    ar: 'حالات الإصابة',
    zh: '发病率',
    el: 'Επίπτωση',
    hi: 'घटना',
    source: 'clinical',
  },
  {
    pt: 'Mortalidade',
    en: 'Mortality',
    es: 'Mortalidad',
    fr: 'Mortalité',
    ru: 'Смертность',
    ar: 'الوفيات',
    zh: '死亡率',
    el: 'Θνησιμότητα',
    hi: 'मृत्यु दर',
    source: 'clinical',
  },
  {
    pt: 'Fator de risco',
    en: 'Risk factor',
    es: 'Factor de riesgo',
    fr: 'Facteur de risque',
    ru: 'Фактор риска',
    ar: 'عامل خطر',
    zh: '危险因素',
    el: 'Παράγοντας κινδύνου',
    hi: 'जोखिम कारक',
    source: 'clinical',
  },
  {
    pt: 'Diagnóstico diferencial',
    en: 'Differential diagnosis',
    es: 'Diagnóstico diferencial',
    fr: 'Diagnostic différentiel',
    ru: 'Дифференциальный диагноз',
    ar: 'التشخيص التفريقي',
    zh: '鉴别诊断',
    el: 'Διαφορική διάγνωση',
    hi: 'विभेदक निदान',
    source: 'clinical',
  },
  {
    pt: 'Prognóstico',
    en: 'Prognosis',
    es: 'Pronóstico',
    fr: 'Pronostic',
    ru: 'Прогноз',
    ar: 'المآل',
    zh: '预后',
    el: 'Πρόγνωση',
    hi: 'पूर्वानुमान',
    source: 'clinical',
  },
  {
    pt: 'Sinais vitais',
    en: 'Vital signs',
    es: 'Signos vitales',
    fr: 'Signes vitaux',
    ru: 'Витальные признаки',
    ar: 'العلامات الحيوية',
    zh: '生命体征',
    el: 'Ζωτικά σημεία',
    hi: 'जीवनीय संकेत',
    source: 'clinical',
  },
  {
    pt: 'Exame físico',
    en: 'Physical examination',
    es: 'Examen físico',
    fr: 'Examen physique',
    ru: 'Физикальное обследование',
    ar: 'الفحص السريري',
    zh: '体格检查',
    el: 'Κλινική εξέταση',
    hi: 'शारीरिक परीक्षा',
    source: 'clinical',
  },
];

// =============================================================================
// DOSAGE FORMS (pharmaceutical forms)
// =============================================================================

export const DOSAGE_FORMS: GlossaryEntry[] = [
  {
    pt: 'Comprimido',
    en: 'Tablet',
    es: 'Comprimido',
    fr: 'Comprimé',
    ru: 'Таблетка',
    ar: 'قرص',
    zh: '片剂',
    el: 'Δισκίο',
    hi: 'गोली',
    source: 'INN',
  },
  {
    pt: 'Cápsula',
    en: 'Capsule',
    es: 'Cápsula',
    fr: 'Gélule',
    ru: 'Капсула',
    ar: 'كبسولة',
    zh: '胶囊',
    el: 'Κάψουλα',
    hi: 'कैप्सूल',
    source: 'INN',
  },
  {
    pt: 'Solução oral',
    en: 'Oral solution',
    es: 'Solución oral',
    fr: 'Solution orale',
    ru: 'Раствор для приема внутрь',
    ar: 'محلول فموي',
    zh: '口服溶液',
    el: 'Πόσιμο διάλυμα',
    hi: 'मौखिक घोल',
    source: 'INN',
  },
  {
    pt: 'Injetável',
    en: 'Injectable',
    es: 'Inyectable',
    fr: 'Injectable',
    ru: 'Раствор для инъекций',
    ar: 'حقن',
    zh: '注射剂',
    el: 'Ενέσιμο',
    hi: 'इंजेक्शन',
    source: 'INN',
  },
  {
    pt: 'Pomada',
    en: 'Ointment',
    es: 'Pomada',
    fr: 'Pommade',
    ru: 'Мазь',
    ar: 'مرهم',
    zh: '软膏',
    el: 'Αλοιφή',
    hi: 'मलहम',
    source: 'INN',
  },
  {
    pt: 'Creme',
    en: 'Cream',
    es: 'Crema',
    fr: 'Crème',
    ru: 'Крем',
    ar: 'كريم',
    zh: '乳膏',
    el: 'Κρέμα',
    hi: 'क्रीम',
    source: 'INN',
  },
  {
    pt: 'Colírio',
    en: 'Eye drops',
    es: 'Colirio',
    fr: 'Collyre',
    ru: 'Глазные капли',
    ar: 'قطرة عين',
    zh: '滴眼液',
    el: 'Οφθαλμικές σταγόνες',
    hi: 'आई ड्रॉप',
    source: 'INN',
  },
  {
    pt: 'Supositório',
    en: 'Suppository',
    es: 'Supositorio',
    fr: 'Suppositoire',
    ru: 'Суппозиторий',
    ar: 'تحميلة',
    zh: '栓剂',
    el: 'Υπόθετο',
    hi: 'सपोसिटरी',
    source: 'INN',
  },
  {
    pt: 'Spray nasal',
    en: 'Nasal spray',
    es: 'Spray nasal',
    fr: 'Spray nasal',
    ru: 'Назальный спрей',
    ar: 'بخاخ أنفي',
    zh: '鼻喷剂',
    el: 'Ρινικό σπρέι',
    hi: 'नाक स्प्रे',
    source: 'INN',
  },
  {
    pt: 'Inalatório',
    en: 'Inhaler',
    es: 'Inhalador',
    fr: 'Inhalateur',
    ru: 'Ингалятор',
    ar: 'جهاز استنشاق',
    zh: '吸入剂',
    el: 'Εισπνεόμενο',
    hi: 'इन्हेलर',
    source: 'INN',
  },
];

// =============================================================================
// FREQUENCY TERMS (dosing frequency)
// =============================================================================

export const FREQUENCY_TERMS: GlossaryEntry[] = [
  {
    pt: 'Uma vez ao dia',
    en: 'Once daily',
    es: 'Una vez al día',
    fr: 'Une fois par jour',
    ru: 'Один раз в день',
    ar: 'مرة واحدة يوميًا',
    zh: '每日一次',
    el: 'Μία φορά την ημέρα',
    hi: 'दिन में एक बार',
    source: 'clinical',
  },
  {
    pt: 'Duas vezes ao dia',
    en: 'Twice daily',
    es: 'Dos veces al día',
    fr: 'Deux fois par jour',
    ru: 'Два раза в день',
    ar: 'مرتين يوميًا',
    zh: '每日两次',
    el: 'Δύο φορές την ημέρα',
    hi: 'दिन में दो बार',
    source: 'clinical',
  },
  {
    pt: 'Três vezes ao dia',
    en: 'Three times daily',
    es: 'Tres veces al día',
    fr: 'Trois fois par jour',
    ru: 'Три раза в день',
    ar: 'ثلاث مرات يوميًا',
    zh: '每日三次',
    el: 'Τρεις φορές την ημέρα',
    hi: 'दिन में तीन बार',
    source: 'clinical',
  },
  {
    pt: 'A cada 6 horas',
    en: 'Every 6 hours',
    es: 'Cada 6 horas',
    fr: 'Toutes les 6 heures',
    ru: 'Каждые 6 часов',
    ar: 'كل 6 ساعات',
    zh: '每6小时',
    el: 'Κάθε 6 ώρες',
    hi: 'हर 6 घंटे',
    source: 'clinical',
  },
  {
    pt: 'A cada 8 horas',
    en: 'Every 8 hours',
    es: 'Cada 8 horas',
    fr: 'Toutes les 8 heures',
    ru: 'Каждые 8 часов',
    ar: 'كل 8 ساعات',
    zh: '每8小时',
    el: 'Κάθε 8 ώρες',
    hi: 'हर 8 घंटे',
    source: 'clinical',
  },
  {
    pt: 'A cada 12 horas',
    en: 'Every 12 hours',
    es: 'Cada 12 horas',
    fr: 'Toutes les 12 heures',
    ru: 'Каждые 12 часов',
    ar: 'كل 12 ساعة',
    zh: '每12小时',
    el: 'Κάθε 12 ώρες',
    hi: 'हर 12 घंटे',
    source: 'clinical',
  },
  {
    pt: 'Em jejum',
    en: 'On an empty stomach',
    es: 'En ayunas',
    fr: 'À jeun',
    ru: 'Натощак',
    ar: 'على معدة فارغة',
    zh: '空腹',
    el: 'Με άδειο στομάχι',
    hi: 'खाली पेट',
    source: 'clinical',
  },
  {
    pt: 'Após as refeições',
    en: 'After meals',
    es: 'Después de las comidas',
    fr: 'Après les repas',
    ru: 'После еды',
    ar: 'بعد الوجبات',
    zh: '餐后',
    el: 'Μετά το φαγητό',
    hi: 'भोजन के बाद',
    source: 'clinical',
  },
  {
    pt: 'Se necessário',
    en: 'As needed',
    es: 'Si es necesario',
    fr: 'Si nécessaire',
    ru: 'По мере необходимости',
    ar: 'عند الحاجة',
    zh: '必要时',
    el: 'Όταν χρειάζεται',
    hi: 'आवश्यकतानुसार',
    source: 'clinical',
  },
];

// =============================================================================
// SEVERITY TERMS (for adverse effects, interactions)
// =============================================================================

export const SEVERITY_TERMS: GlossaryEntry[] = [
  {
    pt: 'Leve',
    en: 'Mild',
    es: 'Leve',
    fr: 'Léger',
    ru: 'Легкая',
    ar: 'خفيف',
    zh: '轻度',
    el: 'Ήπια',
    hi: 'हल्का',
    source: 'clinical',
  },
  {
    pt: 'Moderado',
    en: 'Moderate',
    es: 'Moderado',
    fr: 'Modéré',
    ru: 'Умеренная',
    ar: 'معتدل',
    zh: '中度',
    el: 'Μέτρια',
    hi: 'मध्यम',
    source: 'clinical',
  },
  {
    pt: 'Grave',
    en: 'Severe',
    es: 'Grave',
    fr: 'Grave',
    ru: 'Тяжелая',
    ar: 'شديد',
    zh: '重度',
    el: 'Σοβαρή',
    hi: 'गंभीर',
    source: 'clinical',
  },
  {
    pt: 'Muito alto',
    en: 'Very high',
    es: 'Muy alto',
    fr: 'Très élevé',
    ru: 'Очень высокий',
    ar: 'عالي جدًا',
    zh: '极高',
    el: 'Πολύ υψηλή',
    hi: 'अति उच्च',
    source: 'clinical',
  },
  {
    pt: 'Contraindicado',
    en: 'Contraindicated',
    es: 'Contraindicado',
    fr: 'Contre-indiqué',
    ru: 'Противопоказано',
    ar: 'موانع استعمال',
    zh: '禁忌',
    el: 'Αντενδεικνύεται',
    hi: 'वर्जित',
    source: 'clinical',
  },
];

// =============================================================================
// COMMON ABBREVIATIONS
// =============================================================================

export const ABBREVIATIONS: GlossaryEntry[] = [
  {
    pt: 'VO (via oral)',
    en: 'PO (per os)',
    es: 'VO (vía oral)',
    fr: 'PO (per os)',
    ru: 'Внутрь',
    ar: 'عن طريق الفم',
    zh: '口服',
    el: 'PO (από του στόματος)',
    hi: 'मुंह से',
    source: 'clinical',
    notes: 'Route of administration - oral',
  },
  {
    pt: 'IV (intravenoso)',
    en: 'IV (intravenous)',
    es: 'IV (intravenoso)',
    fr: 'IV (intraveineux)',
    ru: 'В/в (внутривенно)',
    ar: 'IV (وريدي)',
    zh: '静脉注射',
    el: 'IV (ενδοφλέβια)',
    hi: 'IV (नसों में)',
    source: 'clinical',
    notes: 'Route of administration - intravenous',
  },
  {
    pt: 'IM (intramuscular)',
    en: 'IM (intramuscular)',
    es: 'IM (intramuscular)',
    fr: 'IM (intramusculaire)',
    ru: 'В/м (внутримышечно)',
    ar: 'IM (عضلي)',
    zh: '肌肉注射',
    el: 'IM (ενδομυϊκά)',
    hi: 'IM (मांसपेशियों में)',
    source: 'clinical',
    notes: 'Route of administration - intramuscular',
  },
  {
    pt: 'SC (subcutâneo)',
    en: 'SC (subcutaneous)',
    es: 'SC (subcutáneo)',
    fr: 'SC (sous-cutané)',
    ru: 'П/к (подкожно)',
    ar: 'SC (تحت الجلد)',
    zh: '皮下注射',
    el: 'SC (υποδόρια)',
    hi: 'SC (त्वचा के नीचे)',
    source: 'clinical',
    notes: 'Route of administration - subcutaneous',
  },
  {
    pt: 'TFG (taxa de filtração glomerular)',
    en: 'GFR (glomerular filtration rate)',
    es: 'TFG (tasa de filtración glomerular)',
    fr: 'DFG (débit de filtration glomérulaire)',
    ru: 'СКФ (скорость клубочковой фильтрации)',
    ar: 'GFR (معدل الترشيح الكبيبي)',
    zh: 'GFR (肾小球滤过率)',
    el: 'GFR (ρυθμός σπειραματικής διήθησης)',
    hi: 'GFR (ग्लोमेरुलर फिल्ट्रेशन रेट)',
    source: 'clinical',
    notes: 'Kidney function measure',
  },
  {
    pt: 'PA (pressão arterial)',
    en: 'BP (blood pressure)',
    es: 'PA (presión arterial)',
    fr: 'PA (pression artérielle)',
    ru: 'АД (артериальное давление)',
    ar: 'BP (ضغط الدم)',
    zh: 'BP (血压)',
    el: 'BP (αρτηριακή πίεση)',
    hi: 'BP (रक्तचाप)',
    source: 'clinical',
    notes: 'Blood pressure',
  },
  {
    pt: 'FC (frequência cardíaca)',
    en: 'HR (heart rate)',
    es: 'FC (frecuencia cardíaca)',
    fr: 'FC (fréquence cardiaque)',
    ru: 'ЧСС (частота сердечных сокращений)',
    ar: 'HR (معدل ضربات القلب)',
    zh: 'HR (心率)',
    el: 'HR (καρδιακός ρυθμός)',
    hi: 'HR (हृदय गति)',
    source: 'clinical',
    notes: 'Heart rate',
  },
];

// =============================================================================
// MASTER GLOSSARY (combine all categories)
// =============================================================================

export const MEDICAL_GLOSSARY: Record<GlossaryCategory, GlossaryEntry[]> = {
  therapeutic_classes: THERAPEUTIC_CLASSES,
  anatomical_systems: ANATOMICAL_SYSTEMS,
  clinical_terms: CLINICAL_TERMS,
  dosage_forms: DOSAGE_FORMS,
  frequency_terms: FREQUENCY_TERMS,
  severity_terms: SEVERITY_TERMS,
  diagnostic_terms: [], // To be expanded
  treatment_terms: [], // To be expanded
  abbreviations: ABBREVIATIONS,
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get a glossary term translation for a specific locale
 */
export function getGlossaryTerm(
  term: string,
  targetLocale: SupportedLocale,
  category?: GlossaryCategory
): string | null {
  const categories = category
    ? [MEDICAL_GLOSSARY[category]]
    : Object.values(MEDICAL_GLOSSARY);

  for (const entries of categories) {
    const entry = entries.find(
      (e) => e.pt.toLowerCase() === term.toLowerCase()
    );
    if (entry) {
      return entry[targetLocale];
    }
  }
  return null;
}

/**
 * Get all glossary terms for a locale as a simple key-value object
 * (for use in AI translation prompts)
 */
export function getGlossaryForLocale(
  targetLocale: SupportedLocale
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const entries of Object.values(MEDICAL_GLOSSARY)) {
    for (const entry of entries) {
      result[entry.pt] = entry[targetLocale];
    }
  }

  return result;
}

/**
 * Generate a formatted glossary string for AI translation prompts
 */
export function generateGlossaryPrompt(targetLocale: SupportedLocale): string {
  const glossary = getGlossaryForLocale(targetLocale);
  const lines = Object.entries(glossary).map(
    ([pt, translated]) => `- "${pt}" → "${translated}"`
  );
  return lines.join('\n');
}

/**
 * Validate that a translation uses correct glossary terms
 */
export function validateGlossaryUsage(
  translatedText: string,
  targetLocale: SupportedLocale
): { valid: boolean; missingTerms: string[] } {
  const glossary = getGlossaryForLocale(targetLocale);
  const missingTerms: string[] = [];

  // Check if any Portuguese terms appear in the translated text
  // (they shouldn't - they should be translated)
  for (const ptTerm of Object.keys(glossary)) {
    if (translatedText.includes(ptTerm)) {
      missingTerms.push(ptTerm);
    }
  }

  return {
    valid: missingTerms.length === 0,
    missingTerms,
  };
}
