/**
 * LOCALIZAÇÃO DE ANÁLISES CRÍTICAS POR PAÍS
 * ==========================================
 * 
 * Sistema que adapta análises críticas para refletir
 * a realidade e sistema de saúde de cada país-alvo.
 * 
 * Cada país tem seu próprio sistema de saúde, diretrizes,
 * desafios operacionais e controvérsias específicas.
 */

import type { Locale } from '@/i18n/config';
import type { DiseaseCriticalAnalysis, MedicationCriticalAnalysis } from '../types/analysis-medical';

/**
 * Configuração de localização de análises críticas
 */
export interface CriticalAnalysisLocalizationConfig {
  locale: Locale;
  countryName: string;
  healthSystemName: string;  // Ex: "SUS" (BR), "NHS" (UK), "ΕΣΥ" (GR)
  healthSystemAbbreviation: string;
  
  // Adaptações de contexto
  adaptContext: (baseContext: string) => string;
  adaptStakeholder: (baseStakeholder: string) => string;
  adaptOperationalChallenge: (baseChallenge: string) => string;
  
  // Mapeamento de stakeholders por país
  stakeholderMappings: Record<string, string>;  // Ex: { "MS": "Ministry of Health" (EN), "Υπουργείο Υγείας" (EL) }
}

/**
 * Obtém configuração de localização para análises críticas
 */
export function getCriticalAnalysisLocalizationConfig(locale: Locale): CriticalAnalysisLocalizationConfig {
  const configs: Record<Locale, CriticalAnalysisLocalizationConfig> = {
    pt: {
      locale: 'pt',
      countryName: 'Brasil',
      healthSystemName: 'Sistema Único de Saúde',
      healthSystemAbbreviation: 'SUS',
      adaptContext: (ctx) => ctx,  // Já está em português/brasileiro
      adaptStakeholder: (stakeholder) => stakeholder,
      adaptOperationalChallenge: (challenge) => challenge,
      stakeholderMappings: {
        'MS': 'Ministério da Saúde',
        'SBMFC': 'Sociedade Brasileira de Medicina de Família e Comunidade',
        'SBC': 'Sociedade Brasileira de Cardiologia',
        'SBD': 'Sociedade Brasileira de Diabetes',
        'FEBRASGO': 'Federação Brasileira das Associações de Ginecologia e Obstetrícia',
        'CONITEC': 'Comissão Nacional de Incorporação de Tecnologias no SUS',
        'INCA': 'Instituto Nacional de Câncer',
        'APS': 'Atenção Primária à Saúde',
        'UBS': 'Unidade Básica de Saúde',
        'RENAME': 'Relação Nacional de Medicamentos Essenciais',
      }
    },
    en: {
      locale: 'en',
      countryName: 'United States',
      healthSystemName: 'Healthcare System',
      healthSystemAbbreviation: 'US Healthcare',
      adaptContext: (ctx) => {
        // Adaptar contexto brasileiro para contexto americano
        return ctx
          .replace(/SUS/g, 'US Healthcare System')
          .replace(/Ministério da Saúde/g, 'Department of Health and Human Services (HHS)')
          .replace(/APS/g, 'Primary Care')
          .replace(/UBS/g, 'Primary Care Clinic')
          .replace(/CONITEC/g, 'FDA/CMS')
          .replace(/RENAME/g, 'FDA Drug List');
      },
      adaptStakeholder: (stakeholder) => {
        const mapping: Record<string, string> = {
          'MS': 'HHS',
          'SBMFC': 'American Academy of Family Physicians (AAFP)',
          'SBC': 'American Heart Association (AHA)',
          'SBD': 'American Diabetes Association (ADA)',
          'CONITEC': 'FDA/CMS',
          'APS': 'Primary Care',
          'UBS': 'Primary Care Clinic',
        };
        return mapping[stakeholder] || stakeholder;
      },
      adaptOperationalChallenge: (challenge) => {
        return challenge
          .replace(/SUS/g, 'US Healthcare System')
          .replace(/UBS/g, 'primary care clinic')
          .replace(/RENAME/g, 'FDA Drug List')
          .replace(/farmácias do SUS/g, 'pharmacy benefit plans');
      },
      stakeholderMappings: {
        'MS': 'Department of Health and Human Services (HHS)',
        'SBMFC': 'American Academy of Family Physicians (AAFP)',
        'SBC': 'American Heart Association (AHA)',
        'SBD': 'American Diabetes Association (ADA)',
        'FEBRASGO': 'American College of Obstetricians and Gynecologists (ACOG)',
        'CONITEC': 'FDA/CMS',
        'INCA': 'National Cancer Institute (NCI)',
        'APS': 'Primary Care',
        'UBS': 'Primary Care Clinic',
        'RENAME': 'FDA Drug List',
      }
    },
    es: {
      locale: 'es',
      countryName: 'España',
      healthSystemName: 'Sistema Nacional de Salud',
      healthSystemAbbreviation: 'SNS',
      adaptContext: (ctx) => {
        return ctx
          .replace(/SUS/g, 'SNS')
          .replace(/Ministério da Saúde/g, 'Ministerio de Sanidad')
          .replace(/APS/g, 'Atención Primaria')
          .replace(/UBS/g, 'Centro de Salud')
          .replace(/CONITEC/g, 'AEMPS')
          .replace(/RENAME/g, 'Código Nacional');
      },
      adaptStakeholder: (stakeholder) => {
        const mapping: Record<string, string> = {
          'MS': 'Ministerio de Sanidad',
          'SBMFC': 'Sociedad Española de Medicina Familiar y Comunitaria (SEMFyC)',
          'SBC': 'Sociedad Española de Cardiología (SEC)',
          'SBD': 'Sociedad Española de Diabetes (SED)',
          'CONITEC': 'AEMPS',
          'APS': 'Atención Primaria',
          'UBS': 'Centro de Salud',
        };
        return mapping[stakeholder] || stakeholder;
      },
      adaptOperationalChallenge: (challenge) => {
        return challenge
          .replace(/SUS/g, 'SNS')
          .replace(/UBS/g, 'centro de salud')
          .replace(/RENAME/g, 'Código Nacional')
          .replace(/farmácias do SUS/g, 'farmacias del SNS');
      },
      stakeholderMappings: {
        'MS': 'Ministerio de Sanidad',
        'SBMFC': 'Sociedad Española de Medicina Familiar y Comunitaria (SEMFyC)',
        'SBC': 'Sociedad Española de Cardiología (SEC)',
        'SBD': 'Sociedad Española de Diabetes (SED)',
        'FEBRASGO': 'Sociedad Española de Ginecología y Obstetricia (SEGO)',
        'CONITEC': 'AEMPS',
        'INCA': 'Sociedad Española de Oncología Médica (SEOM)',
        'APS': 'Atención Primaria',
        'UBS': 'Centro de Salud',
        'RENAME': 'Código Nacional',
      }
    },
    fr: {
      locale: 'fr',
      countryName: 'France',
      healthSystemName: 'Sécurité Sociale',
      healthSystemAbbreviation: 'Sécurité Sociale',
      adaptContext: (ctx) => {
        return ctx
          .replace(/SUS/g, 'Sécurité Sociale')
          .replace(/Ministério da Saúde/g, 'Ministère de la Santé')
          .replace(/APS/g, 'Soins de Santé Primaires')
          .replace(/UBS/g, 'Cabinet de Médecine Générale')
          .replace(/CONITEC/g, 'HAS')
          .replace(/RENAME/g, 'CIP');
      },
      adaptStakeholder: (stakeholder) => {
        const mapping: Record<string, string> = {
          'MS': 'Ministère de la Santé',
          'SBMFC': 'Société Française de Médecine Générale (SFMG)',
          'SBC': 'Société Française de Cardiologie (SFC)',
          'SBD': 'Société Francophone du Diabète (SFD)',
          'CONITEC': 'HAS',
          'APS': 'Soins de Santé Primaires',
          'UBS': 'Cabinet de Médecine Générale',
        };
        return mapping[stakeholder] || stakeholder;
      },
      adaptOperationalChallenge: (challenge) => {
        return challenge
          .replace(/SUS/g, 'Sécurité Sociale')
          .replace(/UBS/g, 'cabinet de médecine générale')
          .replace(/RENAME/g, 'CIP')
          .replace(/farmácias do SUS/g, 'pharmacies conventionnées');
      },
      stakeholderMappings: {
        'MS': 'Ministère de la Santé',
        'SBMFC': 'Société Française de Médecine Générale (SFMG)',
        'SBC': 'Société Française de Cardiologie (SFC)',
        'SBD': 'Société Francophone du Diabète (SFD)',
        'FEBRASGO': 'Collège National des Gynécologues et Obstétriciens Français (CNGOF)',
        'CONITEC': 'HAS',
        'INCA': 'Institut National du Cancer (INCa)',
        'APS': 'Soins de Santé Primaires',
        'UBS': 'Cabinet de Médecine Générale',
        'RENAME': 'CIP',
      }
    },
    ru: {
      locale: 'ru',
      countryName: 'Россия',
      healthSystemName: 'Обязательное Медицинское Страхование',
      healthSystemAbbreviation: 'ОМС',
      adaptContext: (ctx) => {
        return ctx
          .replace(/SUS/g, 'ОМС')
          .replace(/Ministério da Saúde/g, 'Министерство Здравоохранения')
          .replace(/APS/g, 'Первичная Медицинская Помощь')
          .replace(/UBS/g, 'Поликлиника')
          .replace(/CONITEC/g, 'Минздрав')
          .replace(/RENAME/g, 'ГРЛС');
      },
      adaptStakeholder: (stakeholder) => {
        const mapping: Record<string, string> = {
          'MS': 'Минздрав',
          'SBMFC': 'Российское Общество Семейных Врачей',
          'SBC': 'Российское Кардиологическое Общество',
          'SBD': 'Российская Диабетическая Ассоциация',
          'CONITEC': 'Минздрав',
          'APS': 'Первичная Медицинская Помощь',
          'UBS': 'Поликлиника',
        };
        return mapping[stakeholder] || stakeholder;
      },
      adaptOperationalChallenge: (challenge) => {
        return challenge
          .replace(/SUS/g, 'ОМС')
          .replace(/UBS/g, 'поликлиника')
          .replace(/RENAME/g, 'ГРЛС')
          .replace(/farmácias do SUS/g, 'аптеки ОМС');
      },
      stakeholderMappings: {
        'MS': 'Минздрав',
        'SBMFC': 'Российское Общество Семейных Врачей',
        'SBC': 'Российское Кардиологическое Общество',
        'SBD': 'Российская Диабетическая Ассоциация',
        'FEBRASGO': 'Российское Общество Акушеров-Гинекологов',
        'CONITEC': 'Минздрав',
        'INCA': 'Национальный Онкологический Институт',
        'APS': 'Первичная Медицинская Помощь',
        'UBS': 'Поликлиника',
        'RENAME': 'ГРЛС',
      }
    },
    ar: {
      locale: 'ar',
      countryName: 'السعودية',
      healthSystemName: 'وزارة الصحة',
      healthSystemAbbreviation: 'وزارة الصحة',
      adaptContext: (ctx) => {
        return ctx
          .replace(/SUS/g, 'وزارة الصحة')
          .replace(/Ministério da Saúde/g, 'وزارة الصحة')
          .replace(/APS/g, 'الرعاية الصحية الأولية')
          .replace(/UBS/g, 'المركز الصحي')
          .replace(/CONITEC/g, 'الهيئة العامة للغذاء والدواء')
          .replace(/RENAME/g, 'الهيئة العامة للغذاء والدواء');
      },
      adaptStakeholder: (stakeholder) => {
        const mapping: Record<string, string> = {
          'MS': 'وزارة الصحة',
          'SBMFC': 'الجمعية السعودية لطب الأسرة والمجتمع',
          'SBC': 'الجمعية السعودية لأمراض القلب',
          'SBD': 'الجمعية السعودية للسكري',
          'CONITEC': 'الهيئة العامة للغذاء والدواء',
          'APS': 'الرعاية الصحية الأولية',
          'UBS': 'المركز الصحي',
        };
        return mapping[stakeholder] || stakeholder;
      },
      adaptOperationalChallenge: (challenge) => {
        return challenge
          .replace(/SUS/g, 'وزارة الصحة')
          .replace(/UBS/g, 'المركز الصحي')
          .replace(/RENAME/g, 'الهيئة العامة للغذاء والدواء')
          .replace(/farmácias do SUS/g, 'صيدليات وزارة الصحة');
      },
      stakeholderMappings: {
        'MS': 'وزارة الصحة',
        'SBMFC': 'الجمعية السعودية لطب الأسرة والمجتمع',
        'SBC': 'الجمعية السعودية لأمراض القلب',
        'SBD': 'الجمعية السعودية للسكري',
        'FEBRASGO': 'الجمعية السعودية لأمراض النساء والولادة',
        'CONITEC': 'الهيئة العامة للغذاء والدواء',
        'INCA': 'المعهد الوطني للأورام',
        'APS': 'الرعاية الصحية الأولية',
        'UBS': 'المركز الصحي',
        'RENAME': 'الهيئة العامة للغذاء والدواء',
      }
    },
    zh: {
      locale: 'zh',
      countryName: '中国',
      healthSystemName: '国家基本医疗保险',
      healthSystemAbbreviation: '医保',
      adaptContext: (ctx) => {
        return ctx
          .replace(/SUS/g, '医保')
          .replace(/Ministério da Saúde/g, '国家卫生健康委员会')
          .replace(/APS/g, '初级医疗保健')
          .replace(/UBS/g, '社区卫生服务中心')
          .replace(/CONITEC/g, '国家药监局')
          .replace(/RENAME/g, '国家药品编码');
      },
      adaptStakeholder: (stakeholder) => {
        const mapping: Record<string, string> = {
          'MS': '国家卫生健康委员会',
          'SBMFC': '中华医学会全科医学分会',
          'SBC': '中华医学会心血管病学分会',
          'SBD': '中华医学会糖尿病学分会',
          'CONITEC': '国家药监局',
          'APS': '初级医疗保健',
          'UBS': '社区卫生服务中心',
        };
        return mapping[stakeholder] || stakeholder;
      },
      adaptOperationalChallenge: (challenge) => {
        return challenge
          .replace(/SUS/g, '医保')
          .replace(/UBS/g, '社区卫生服务中心')
          .replace(/RENAME/g, '国家药品编码')
          .replace(/farmácias do SUS/g, '医保定点药店');
      },
      stakeholderMappings: {
        'MS': '国家卫生健康委员会',
        'SBMFC': '中华医学会全科医学分会',
        'SBC': '中华医学会心血管病学分会',
        'SBD': '中华医学会糖尿病学分会',
        'FEBRASGO': '中华医学会妇产科学分会',
        'CONITEC': '国家药监局',
        'INCA': '国家癌症中心',
        'APS': '初级医疗保健',
        'UBS': '社区卫生服务中心',
        'RENAME': '国家药品编码',
      }
    },
    el: {
      locale: 'el',
      countryName: 'Ελλάδα',
      healthSystemName: 'Εθνικό Σύστημα Υγείας',
      healthSystemAbbreviation: 'ΕΣΥ',
      adaptContext: (ctx) => {
        return ctx
          .replace(/SUS/g, 'ΕΣΥ')
          .replace(/Ministério da Saúde/g, 'Υπουργείο Υγείας')
          .replace(/APS/g, 'Πρωτοβάθμια Φροντίδα Υγείας')
          .replace(/UBS/g, 'Κέντρο Υγείας')
          .replace(/CONITEC/g, 'ΕΟΦ')
          .replace(/RENAME/g, 'ΕΟΦ');
      },
      adaptStakeholder: (stakeholder) => {
        const mapping: Record<string, string> = {
          'MS': 'Υπουργείο Υγείας',
          'SBMFC': 'Ελληνική Εταιρεία Οικογενειακής Ιατρικής',
          'SBC': 'Ελληνική Καρδιολογική Εταιρεία',
          'SBD': 'Ελληνική Εταιρεία Διαβήτη',
          'CONITEC': 'ΕΟΦ',
          'APS': 'Πρωτοβάθμια Φροντίδα Υγείας',
          'UBS': 'Κέντρο Υγείας',
        };
        return mapping[stakeholder] || stakeholder;
      },
      adaptOperationalChallenge: (challenge) => {
        return challenge
          .replace(/SUS/g, 'ΕΣΥ')
          .replace(/UBS/g, 'Κέντρο Υγείας')
          .replace(/RENAME/g, 'ΕΟΦ')
          .replace(/farmácias do SUS/g, 'φαρμακεία ΕΣΥ');
      },
      stakeholderMappings: {
        'MS': 'Υπουργείο Υγείας',
        'SBMFC': 'Ελληνική Εταιρεία Οικογενειακής Ιατρικής',
        'SBC': 'Ελληνική Καρδιολογική Εταιρεία',
        'SBD': 'Ελληνική Εταιρεία Διαβήτη',
        'FEBRASGO': 'Ελληνική Εταιρεία Μαιευτικής και Γυναικολογίας',
        'CONITEC': 'ΕΟΦ',
        'INCA': 'Ελληνικό Κέντρο Καρκίνου',
        'APS': 'Πρωτοβάθμια Φροντίδα Υγείας',
        'UBS': 'Κέντρο Υγείας',
        'RENAME': 'ΕΟΦ',
      }
    },
    hi: {
      locale: 'hi',
      countryName: 'भारत',
      healthSystemName: 'राष्ट्रीय स्वास्थ्य मिशन',
      healthSystemAbbreviation: 'NHM',
      adaptContext: (ctx) => {
        return ctx
          .replace(/SUS/g, 'NHM')
          .replace(/Ministério da Saúde/g, 'स्वास्थ्य और परिवार कल्याण मंत्रालय')
          .replace(/APS/g, 'प्राथमिक स्वास्थ्य देखभाल')
          .replace(/UBS/g, 'प्राथमिक स्वास्थ्य केंद्र')
          .replace(/CONITEC/g, 'CDSCO')
          .replace(/RENAME/g, 'NLEM');
      },
      adaptStakeholder: (stakeholder) => {
        const mapping: Record<string, string> = {
          'MS': 'MoHFW',
          'SBMFC': 'Academy of Family Physicians of India (AFPI)',
          'SBC': 'Cardiological Society of India (CSI)',
          'SBD': 'Research Society for Study of Diabetes in India (RSSDI)',
          'CONITEC': 'CDSCO',
          'APS': 'Primary Health Care',
          'UBS': 'Primary Health Centre',
        };
        return mapping[stakeholder] || stakeholder;
      },
      adaptOperationalChallenge: (challenge) => {
        return challenge
          .replace(/SUS/g, 'NHM')
          .replace(/UBS/g, 'primary health centre')
          .replace(/RENAME/g, 'NLEM')
          .replace(/farmácias do SUS/g, 'Jan Aushadhi pharmacies');
      },
      stakeholderMappings: {
        'MS': 'Ministry of Health and Family Welfare (MoHFW)',
        'SBMFC': 'Academy of Family Physicians of India (AFPI)',
        'SBC': 'Cardiological Society of India (CSI)',
        'SBD': 'Research Society for Study of Diabetes in India (RSSDI)',
        'FEBRASGO': 'Federation of Obstetric and Gynaecological Societies of India (FOGSI)',
        'CONITEC': 'Central Drugs Standard Control Organisation (CDSCO)',
        'INCA': 'Indian Council of Medical Research (ICMR)',
        'APS': 'Primary Health Care',
        'UBS': 'Primary Health Centre (PHC)',
        'RENAME': 'National List of Essential Medicines (NLEM)',
      }
    }
  };

  return configs[locale] || configs.pt;  // Fallback para português
}

/**
 * Adapta uma análise crítica para um locale específico
 */
export function adaptCriticalAnalysis(
  analysis: DiseaseCriticalAnalysis | MedicationCriticalAnalysis,
  locale: Locale
): DiseaseCriticalAnalysis | MedicationCriticalAnalysis {
  const config = getCriticalAnalysisLocalizationConfig(locale);
  
  // Se já está no locale correto, retornar como está
  if (locale === 'pt') {
    return analysis;
  }

  // Adaptar análise
  return {
    ...analysis,
    context: config.adaptContext(analysis.context),
    didacticIntro: analysis.didacticIntro ? config.adaptContext(analysis.didacticIntro) : undefined,
    systemicImplications: config.adaptContext(analysis.systemicImplications),
    insights: analysis.insights.map(insight => ({
      ...insight,
      content: config.adaptContext(insight.content),
      practicalExample: insight.practicalExample ? config.adaptContext(insight.practicalExample) : undefined,
      keyTakeaway: insight.keyTakeaway ? config.adaptContext(insight.keyTakeaway) : undefined,
    })),
    controversies: analysis.controversies.map(controversy => ({
      ...controversy,
      description: config.adaptContext(controversy.description),
      realWorldScenario: controversy.realWorldScenario ? config.adaptContext(controversy.realWorldScenario) : undefined,
      currentConsensus: controversy.currentConsensus ? config.adaptContext(controversy.currentConsensus) : undefined,
      stakeholders: controversy.stakeholders.map(s => config.adaptStakeholder(s)),
    })),
    operationalChallenges: analysis.operationalChallenges.map(challenge => ({
      ...challenge,
      description: config.adaptOperationalChallenge(challenge.description),
      potentialSolutions: challenge.potentialSolutions?.map(s => config.adaptOperationalChallenge(s)),
    })),
  };
}

