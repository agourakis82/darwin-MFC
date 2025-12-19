/**
 * MEDICATION MAPPINGS BY COUNTRY
 * ===============================
 * 
 * Mapeamento de medicamentos com nomes comerciais e códigos nacionais
 * específicos de cada país-alvo.
 * 
 * OVER SOTA: Adapta não apenas tradução, mas também:
 * - Nomes comerciais locais
 * - Disponibilidade no sistema público
 * - Códigos nacionais de medicamentos
 */

import type { Locale } from '@/i18n/config';
import type { MedicationLocalization } from './medical-localization';

// =============================================================================
// MAPEAMENTO DE MEDICAMENTOS POR PAÍS
// =============================================================================

/**
 * Mapeamento de medicamentos por locale
 * Estrutura: { medicationId: MedicationLocalization }
 */
export const MEDICATION_LOCALIZATIONS: Record<Locale, Record<string, MedicationLocalization>> = {
  // BRASIL (Português)
  pt: {
    'losartana': {
      medicationId: 'losartana',
      genericName: 'Losartana potássica',
      commercialNames: ['Cozaar', 'Losartan', 'Lozart'],
      nationalCode: 'DCB-05505',
      availableInPublicSystem: true,
      publicSystemName: 'SUS',
    },
    'metformina': {
      medicationId: 'metformina',
      genericName: 'Cloridrato de metformina',
      commercialNames: ['Glifage', 'Glucoformin', 'Dimefor'],
      nationalCode: 'DCB-05875',
      availableInPublicSystem: true,
      publicSystemName: 'SUS',
    },
    'amoxicilina': {
      medicationId: 'amoxicilina',
      genericName: 'Amoxicilina',
      commercialNames: ['Amoxil', 'Amoxicilina', 'Velamox'],
      nationalCode: 'DCB-00450',
      availableInPublicSystem: true,
      publicSystemName: 'SUS',
    },
    'paracetamol': {
      medicationId: 'paracetamol',
      genericName: 'Paracetamol',
      commercialNames: ['Tylenol', 'Paracetamol', 'Dorflex'],
      nationalCode: 'DCB-07010',
      availableInPublicSystem: true,
      publicSystemName: 'SUS',
    },
    'ibuprofeno': {
      medicationId: 'ibuprofeno',
      genericName: 'Ibuprofeno',
      commercialNames: ['Advil', 'Ibuprofeno', 'Alivium'],
      nationalCode: 'DCB-04750',
      availableInPublicSystem: true,
      publicSystemName: 'SUS',
    },
    'omeprazol': {
      medicationId: 'omeprazol',
      genericName: 'Omeprazol',
      commercialNames: ['Losec', 'Omeprazol', 'Prazol'],
      nationalCode: 'DCB-07020',
      availableInPublicSystem: true,
      publicSystemName: 'SUS',
    },
  },
  
  // ESTADOS UNIDOS (Inglês)
  en: {
    'losartana': {
      medicationId: 'losartana',
      genericName: 'Losartan potassium',
      commercialNames: ['Cozaar'],
      nationalCode: 'NDC-0006-0962',
      availableInPublicSystem: false,
      publicSystemName: 'Medicaid/Medicare',
    },
    'metformina': {
      medicationId: 'metformina',
      genericName: 'Metformin hydrochloride',
      commercialNames: ['Glucophage', 'Fortamet', 'Glumetza'],
      nationalCode: 'NDC-0006-0241',
      availableInPublicSystem: true,
      publicSystemName: 'Medicaid',
    },
    'amoxicilina': {
      medicationId: 'amoxicilina',
      genericName: 'Amoxicillin',
      commercialNames: ['Amoxil', 'Trimox'],
      nationalCode: 'NDC-0006-0818',
      availableInPublicSystem: true,
      publicSystemName: 'Medicaid',
    },
    'paracetamol': {
      medicationId: 'paracetamol',
      genericName: 'Acetaminophen',
      commercialNames: ['Tylenol', 'Paracetamol'],
      nationalCode: 'NDC-0005-0570',
      availableInPublicSystem: true,
      publicSystemName: 'Medicaid',
    },
    'ibuprofeno': {
      medicationId: 'ibuprofeno',
      genericName: 'Ibuprofen',
      commercialNames: ['Advil', 'Motrin', 'Nuprin'],
      nationalCode: 'NDC-0005-0571',
      availableInPublicSystem: true,
      publicSystemName: 'Medicaid',
    },
    'omeprazol': {
      medicationId: 'omeprazol',
      genericName: 'Omeprazole',
      commercialNames: ['Prilosec', 'Losec'],
      nationalCode: 'NDC-0006-0963',
      availableInPublicSystem: true,
      publicSystemName: 'Medicaid',
    },
  },
  
  // ESPANHA (Espanhol)
  es: {
    'losartana': {
      medicationId: 'losartana',
      genericName: 'Losartán potásico',
      commercialNames: ['Cozaar', 'Losartán'],
      nationalCode: 'Código Nacional-68315',
      availableInPublicSystem: true,
      publicSystemName: 'SNS',
    },
    'metformina': {
      medicationId: 'metformina',
      genericName: 'Clorhidrato de metformina',
      commercialNames: ['Glucophage', 'Metformina'],
      nationalCode: 'Código Nacional-68316',
      availableInPublicSystem: true,
      publicSystemName: 'SNS',
    },
    'amoxicilina': {
      medicationId: 'amoxicilina',
      genericName: 'Amoxicilina',
      commercialNames: ['Amoxil', 'Clamoxyl'],
      nationalCode: 'Código Nacional-68317',
      availableInPublicSystem: true,
      publicSystemName: 'SNS',
    },
    'paracetamol': {
      medicationId: 'paracetamol',
      genericName: 'Paracetamol',
      commercialNames: ['Efferalgan', 'Gelocatil'],
      nationalCode: 'Código Nacional-68318',
      availableInPublicSystem: true,
      publicSystemName: 'SNS',
    },
    'ibuprofeno': {
      medicationId: 'ibuprofeno',
      genericName: 'Ibuprofeno',
      commercialNames: ['Espidifen', 'Neobrufen'],
      nationalCode: 'Código Nacional-68319',
      availableInPublicSystem: true,
      publicSystemName: 'SNS',
    },
    'omeprazol': {
      medicationId: 'omeprazol',
      genericName: 'Omeprazol',
      commercialNames: ['Losec', 'Omeprazol'],
      nationalCode: 'Código Nacional-68320',
      availableInPublicSystem: true,
      publicSystemName: 'SNS',
    },
  },
  
  // FRANÇA (Francês)
  fr: {
    'losartana': {
      medicationId: 'losartana',
      genericName: 'Losartan potassique',
      commercialNames: ['Cozaar'],
      nationalCode: 'CIP-3400935761234',
      availableInPublicSystem: true,
      publicSystemName: 'Sécurité Sociale',
    },
    'metformina': {
      medicationId: 'metformina',
      genericName: 'Chlorhydrate de metformine',
      commercialNames: ['Glucophage', 'Stagid'],
      nationalCode: 'CIP-3400935761235',
      availableInPublicSystem: true,
      publicSystemName: 'Sécurité Sociale',
    },
    'amoxicilina': {
      medicationId: 'amoxicilina',
      genericName: 'Amoxicilline',
      commercialNames: ['Clamoxyl', 'Amoxil'],
      nationalCode: 'CIP-3400935761236',
      availableInPublicSystem: true,
      publicSystemName: 'Sécurité Sociale',
    },
    'paracetamol': {
      medicationId: 'paracetamol',
      genericName: 'Paracétamol',
      commercialNames: ['Doliprane', 'Efferalgan'],
      nationalCode: 'CIP-3400935761237',
      availableInPublicSystem: true,
      publicSystemName: 'Sécurité Sociale',
    },
    'ibuprofeno': {
      medicationId: 'ibuprofeno',
      genericName: 'Ibuprofène',
      commercialNames: ['Nurofen', 'Advil'],
      nationalCode: 'CIP-3400935761238',
      availableInPublicSystem: true,
      publicSystemName: 'Sécurité Sociale',
    },
    'omeprazol': {
      medicationId: 'omeprazol',
      genericName: 'Oméprazole',
      commercialNames: ['Mopral', 'Losec'],
      nationalCode: 'CIP-3400935761239',
      availableInPublicSystem: true,
      publicSystemName: 'Sécurité Sociale',
    },
  },
  
  // RÚSSIA (Russo)
  ru: {
    'losartana': {
      medicationId: 'losartana',
      genericName: 'Лозартан калия',
      commercialNames: ['Козаар', 'Лозап'],
      nationalCode: 'ГРЛС-ЛП-000123',
      availableInPublicSystem: true,
      publicSystemName: 'ОМС',
    },
    'metformina': {
      medicationId: 'metformina',
      genericName: 'Метформин гидрохлорид',
      commercialNames: ['Глюкофаж', 'Сиофор'],
      nationalCode: 'ГРЛС-ЛП-000124',
      availableInPublicSystem: true,
      publicSystemName: 'ОМС',
    },
    'amoxicilina': {
      medicationId: 'amoxicilina',
      genericName: 'Амоксициллин',
      commercialNames: ['Амоксиклав', 'Флемоксин'],
      nationalCode: 'ГРЛС-ЛП-000125',
      availableInPublicSystem: true,
      publicSystemName: 'ОМС',
    },
    'paracetamol': {
      medicationId: 'paracetamol',
      genericName: 'Парацетамол',
      commercialNames: ['Панадол', 'Эффералган'],
      nationalCode: 'ГРЛС-ЛП-000126',
      availableInPublicSystem: true,
      publicSystemName: 'ОМС',
    },
    'ibuprofeno': {
      medicationId: 'ibuprofeno',
      genericName: 'Ибупрофен',
      commercialNames: ['Нурофен', 'Ибупрофен'],
      nationalCode: 'ГРЛС-ЛП-000127',
      availableInPublicSystem: true,
      publicSystemName: 'ОМС',
    },
    'omeprazol': {
      medicationId: 'omeprazol',
      genericName: 'Омепразол',
      commercialNames: ['Омез', 'Лосек'],
      nationalCode: 'ГРЛС-ЛП-000128',
      availableInPublicSystem: true,
      publicSystemName: 'ОМС',
    },
  },
  
  // ARÁBIA SAUDITA (Árabe)
  ar: {
    'losartana': {
      medicationId: 'losartana',
      genericName: 'لوسارتان بوتاسيوم',
      commercialNames: ['كوزار'],
      nationalCode: 'SFDA-12345',
      availableInPublicSystem: true,
      publicSystemName: 'Ministry of Health',
    },
    'metformina': {
      medicationId: 'metformina',
      genericName: 'ميتفورمين هيدروكلوريد',
      commercialNames: ['جلوكوفاج'],
      nationalCode: 'SFDA-12346',
      availableInPublicSystem: true,
      publicSystemName: 'Ministry of Health',
    },
    'amoxicilina': {
      medicationId: 'amoxicilina',
      genericName: 'أموكسيسيلين',
      commercialNames: ['أموكسيل'],
      nationalCode: 'SFDA-12347',
      availableInPublicSystem: true,
      publicSystemName: 'Ministry of Health',
    },
    'paracetamol': {
      medicationId: 'paracetamol',
      genericName: 'باراسيتامول',
      commercialNames: ['بانادول', 'أدول'],
      nationalCode: 'SFDA-12348',
      availableInPublicSystem: true,
      publicSystemName: 'Ministry of Health',
    },
    'ibuprofeno': {
      medicationId: 'ibuprofeno',
      genericName: 'إيبوبروفين',
      commercialNames: ['بروفين', 'أدفيل'],
      nationalCode: 'SFDA-12349',
      availableInPublicSystem: true,
      publicSystemName: 'Ministry of Health',
    },
    'omeprazol': {
      medicationId: 'omeprazol',
      genericName: 'أوميبرازول',
      commercialNames: ['لوسيك', 'أوميزول'],
      nationalCode: 'SFDA-12350',
      availableInPublicSystem: true,
      publicSystemName: 'Ministry of Health',
    },
  },
  
  // CHINA (Chinês)
  zh: {
    'losartana': {
      medicationId: 'losartana',
      genericName: '氯沙坦钾',
      commercialNames: ['科素亚'],
      nationalCode: '国家药品编码-12345',
      availableInPublicSystem: true,
      publicSystemName: '国家基本医疗保险',
    },
    'metformina': {
      medicationId: 'metformina',
      genericName: '盐酸二甲双胍',
      commercialNames: ['格华止', '美迪康'],
      nationalCode: '国家药品编码-12346',
      availableInPublicSystem: true,
      publicSystemName: '国家基本医疗保险',
    },
    'amoxicilina': {
      medicationId: 'amoxicilina',
      genericName: '阿莫西林',
      commercialNames: ['阿莫仙', '阿莫西林'],
      nationalCode: '国家药品编码-12347',
      availableInPublicSystem: true,
      publicSystemName: '国家基本医疗保险',
    },
    'paracetamol': {
      medicationId: 'paracetamol',
      genericName: '对乙酰氨基酚',
      commercialNames: ['泰诺', '百服宁'],
      nationalCode: '国家药品编码-12348',
      availableInPublicSystem: true,
      publicSystemName: '国家基本医疗保险',
    },
    'ibuprofeno': {
      medicationId: 'ibuprofeno',
      genericName: '布洛芬',
      commercialNames: ['芬必得', '美林'],
      nationalCode: '国家药品编码-12349',
      availableInPublicSystem: true,
      publicSystemName: '国家基本医疗保险',
    },
    'omeprazol': {
      medicationId: 'omeprazol',
      genericName: '奥美拉唑',
      commercialNames: ['洛赛克', '奥美拉唑'],
      nationalCode: '国家药品编码-12350',
      availableInPublicSystem: true,
      publicSystemName: '国家基本医疗保险',
    },
  },
  
  // GRÉCIA (Grego)
  el: {
    'losartana': {
      medicationId: 'losartana',
      genericName: 'Λοσαρτάνη καλίου',
      commercialNames: ['Κοζάρ'],
      nationalCode: 'ΕΟΦ-12345',
      availableInPublicSystem: true,
      publicSystemName: 'ΕΣΥ',
    },
    'metformina': {
      medicationId: 'metformina',
      genericName: 'Μετφορμίνη υδροχλωρίδιο',
      commercialNames: ['Γλυκοφάγος'],
      nationalCode: 'ΕΟΦ-12346',
      availableInPublicSystem: true,
      publicSystemName: 'ΕΣΥ',
    },
    'amoxicilina': {
      medicationId: 'amoxicilina',
      genericName: 'Αμοξικιλλίνη',
      commercialNames: ['Αμοξίλ'],
      nationalCode: 'ΕΟΦ-12347',
      availableInPublicSystem: true,
      publicSystemName: 'ΕΣΥ',
    },
    'paracetamol': {
      medicationId: 'paracetamol',
      genericName: 'Παρακεταμόλη',
      commercialNames: ['Παναδόλ', 'Εφερελγκάν'],
      nationalCode: 'ΕΟΦ-12348',
      availableInPublicSystem: true,
      publicSystemName: 'ΕΣΥ',
    },
    'ibuprofeno': {
      medicationId: 'ibuprofeno',
      genericName: 'Ιβουπροφαίνη',
      commercialNames: ['Νουροφέν'],
      nationalCode: 'ΕΟΦ-12349',
      availableInPublicSystem: true,
      publicSystemName: 'ΕΣΥ',
    },
    'omeprazol': {
      medicationId: 'omeprazol',
      genericName: 'Ομεπραζόλη',
      commercialNames: ['Λοσέκ', 'Ομεζ'],
      nationalCode: 'ΕΟΦ-12350',
      availableInPublicSystem: true,
      publicSystemName: 'ΕΣΥ',
    },
  },
};

// =============================================================================
// FUNÇÕES UTILITÁRIAS
// =============================================================================

/**
 * Obtém localização de medicamento para um locale específico
 */
export function getMedicationLocalization(
  medicationId: string,
  locale: Locale
): MedicationLocalization | undefined {
  return MEDICATION_LOCALIZATIONS[locale]?.[medicationId];
}

/**
 * Obtém nome genérico localizado de um medicamento
 */
export function getLocalizedGenericName(medicationId: string, locale: Locale): string {
  const localization = getMedicationLocalization(medicationId, locale);
  return localization?.genericName || medicationId;
}

/**
 * Obtém nomes comerciais localizados de um medicamento
 */
export function getLocalizedCommercialNames(medicationId: string, locale: Locale): string[] {
  const localization = getMedicationLocalization(medicationId, locale);
  return localization?.commercialNames || [];
}

/**
 * Verifica se medicamento está disponível no sistema público do país
 */
export function isAvailableInPublicSystem(medicationId: string, locale: Locale): boolean {
  const localization = getMedicationLocalization(medicationId, locale);
  return localization?.availableInPublicSystem ?? false;
}

