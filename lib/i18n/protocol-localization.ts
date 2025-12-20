/**
 * LOCALIZAÇÃO DE PROTOCOLOS POR PAÍS
 * ===================================
 * 
 * Sistema que adapta protocolos clínicos para refletir
 * as diretrizes, ontologias e práticas médicas de cada país-alvo.
 * 
 * Cada país tem suas próprias diretrizes nacionais, códigos
 * de classificação e práticas clínicas específicas.
 */

import type { Locale } from '@/i18n/config';
import type { Protocolo } from '../types/protocolo';
import { getMedicalLocalization } from './medical-localization';

/**
 * Configuração de localização de protocolos
 */
export interface ProtocolLocalizationConfig {
  locale: Locale;
  countryName: string;
  healthSystemName: string;
  
  // Adaptações de diretrizes
  adaptGuideline: (baseGuideline: string) => string;
  adaptObjective: (baseObjective: string) => string;
  adaptDescription: (baseDescription: string) => string;
  
  // Mapeamento de códigos
  mapCID10: (cid10: string) => string;  // CID-10 → código local
  mapCIAP2: (ciap2: string) => string;  // CIAP-2 → código local (quando aplicável)
  
  // Mapeamento de diretrizes por protocolo
  guidelineMappings: Record<string, string>;  // Ex: { "has": "Diretrizes Brasileiras de Hipertensão 2020" }
}

/**
 * Obtém configuração de localização para protocolos
 */
export function getProtocolLocalizationConfig(locale: Locale): ProtocolLocalizationConfig {
  const medicalConfig = getMedicalLocalization(locale);
  
  const configs: Record<Locale, ProtocolLocalizationConfig> = {
    pt: {
      locale: 'pt',
      countryName: 'Brasil',
      healthSystemName: 'SUS',
      adaptGuideline: (guideline) => guideline,  // Já está em português/brasileiro
      adaptObjective: (obj) => obj,
      adaptDescription: (desc) => desc,
      mapCID10: (cid10) => cid10,  // CID-10 é universal
      mapCIAP2: (ciap2) => ciap2,  // CIAP-2 é específico do Brasil
      guidelineMappings: {
        'has': 'Diretrizes Brasileiras de Hipertensão Arterial 2020',
        'dm2': 'Diretrizes da Sociedade Brasileira de Diabetes 2022',
        'asma': 'Diretrizes Brasileiras para o Manejo da Asma 2020',
        'dpoc': 'GOLD 2024 (adaptado Brasil)',
        'itu': 'Protocolo Clínico e Diretrizes Terapêuticas - ITU',
        'lombalgia': 'Diretrizes para Diagnóstico e Tratamento de Lombalgia',
        'depressao': 'Diretrizes para Manejo da Depressão na APS',
        'cefaleia': 'Diretrizes Brasileiras de Cefaleia',
        'ivas': 'Protocolo Clínico - Infecções Respiratórias',
        'dislipidemia': 'Diretrizes Brasileiras de Dislipidemias',
        'pre-natal': 'Cadernos de Atenção Básica - Pré-Natal',
        'puericultura': 'Cadernos de Atenção Básica - Saúde da Criança',
      }
    },
    en: {
      locale: 'en',
      countryName: 'United States',
      healthSystemName: 'US Healthcare',
      adaptGuideline: (guideline) => {
        const mapping: Record<string, string> = {
          'Diretrizes Brasileiras de Hipertensão Arterial 2020': 'JNC 8 / AHA/ACC 2017 Hypertension Guidelines',
          'Diretrizes da Sociedade Brasileira de Diabetes 2022': 'ADA Standards of Medical Care in Diabetes 2024',
          'Diretrizes Brasileiras para o Manejo da Asma 2020': 'GINA 2024 Guidelines',
          'GOLD 2024': 'GOLD 2024 Global Strategy',
          'Protocolo Clínico e Diretrizes Terapêuticas - ITU': 'Infectious Diseases Society of America (IDSA) Guidelines',
          'Cadernos de Atenção Básica': 'USPSTF / AAFP Clinical Practice Guidelines',
        };
        return mapping[guideline] || guideline;
      },
      adaptObjective: (obj) => obj.replace(/APS/g, 'Primary Care').replace(/SUS/g, 'Healthcare System'),
      adaptDescription: (desc) => desc.replace(/Atenção Primária à Saúde/g, 'Primary Care').replace(/UBS/g, 'Primary Care Clinic'),
      mapCID10: (cid10) => cid10,  // ICD-10-CM usa códigos similares
      mapCIAP2: (ciap2) => '',  // CIAP-2 não usado nos EUA, usar apenas ICD-10-CM
      guidelineMappings: {
        'has': 'JNC 8 / AHA/ACC 2017 Hypertension Guidelines',
        'dm2': 'ADA Standards of Medical Care in Diabetes 2024',
        'asma': 'GINA 2024 Guidelines',
        'dpoc': 'GOLD 2024 Global Strategy',
        'itu': 'IDSA Guidelines for UTI',
        'lombalgia': 'ACCP/AAPM Clinical Practice Guidelines',
        'depressao': 'USPSTF Depression Screening / APA Guidelines',
        'cefaleia': 'AAN Headache Guidelines',
        'ivas': 'IDSA Upper Respiratory Infections',
        'dislipidemia': 'ACC/AHA Cholesterol Guidelines 2018',
        'pre-natal': 'ACOG Prenatal Care Guidelines',
        'puericultura': 'AAP Bright Futures Guidelines',
      }
    },
    es: {
      locale: 'es',
      countryName: 'España',
      healthSystemName: 'SNS',
      adaptGuideline: (guideline) => {
        const mapping: Record<string, string> = {
          'Diretrizes Brasileiras de Hipertensão Arterial 2020': 'Guía de Hipertensión Arterial 2023 (SEHH-ALHA)',
          'Diretrizes da Sociedade Brasileira de Diabetes 2022': 'Guía de Diabetes Tipo 2 (SED)',
          'Diretrizes Brasileiras para o Manejo da Asma 2020': 'Guía GEMA 2024',
          'GOLD 2024': 'Guía GOLD 2024',
          'Cadernos de Atenção Básica': 'Guías de Práctica Clínica del SNS',
        };
        return mapping[guideline] || guideline;
      },
      adaptObjective: (obj) => obj.replace(/APS/g, 'Atención Primaria').replace(/SUS/g, 'SNS'),
      adaptDescription: (desc) => desc.replace(/Atenção Primária à Saúde/g, 'Atención Primaria').replace(/UBS/g, 'Centro de Salud'),
      mapCID10: (cid10) => cid10,  // CIE-10 usa códigos similares
      mapCIAP2: (ciap2) => '',  // CIAP-2 não usado na Espanha
      guidelineMappings: {
        'has': 'Guía de Hipertensión Arterial 2023 (SEHH-ALHA)',
        'dm2': 'Guía de Diabetes Tipo 2 (SED)',
        'asma': 'Guía GEMA 2024',
        'dpoc': 'Guía GOLD 2024',
        'itu': 'Guía de Infecciones del Tracto Urinario',
        'lombalgia': 'Guía de Lumbalgia',
        'depressao': 'Guía de Depresión',
        'cefaleia': 'Guía de Cefaleas',
        'ivas': 'Guía de Infecciones Respiratorias',
        'dislipidemia': 'Guía de Dislipidemias',
        'pre-natal': 'Guía de Atención al Embarazo',
        'puericultura': 'Guía de Salud Infantil',
      }
    },
    fr: {
      locale: 'fr',
      countryName: 'France',
      healthSystemName: 'Sécurité Sociale',
      adaptGuideline: (guideline) => {
        const mapping: Record<string, string> = {
          'Diretrizes Brasileiras de Hipertensão Arterial 2020': 'Recommandations HAS - Hypertension Artérielle',
          'Diretrizes da Sociedade Brasileira de Diabetes 2022': 'Recommandations HAS - Diabète Type 2',
          'Diretrizes Brasileiras para o Manejo da Asma 2020': 'Recommandations HAS - Asthme',
          'GOLD 2024': 'Recommandations GOLD 2024',
          'Cadernos de Atenção Básica': 'Recommandations HAS / PNDS',
        };
        return mapping[guideline] || guideline;
      },
      adaptObjective: (obj) => obj.replace(/APS/g, 'Soins de Santé Primaires').replace(/SUS/g, 'Sécurité Sociale'),
      adaptDescription: (desc) => desc.replace(/Atenção Primária à Saúde/g, 'Soins de Santé Primaires').replace(/UBS/g, 'Cabinet de Médecine Générale'),
      mapCID10: (cid10) => cid10,  // CIM-10 usa códigos similares
      mapCIAP2: (ciap2) => '',  // CIAP-2 não usado na França
      guidelineMappings: {
        'has': 'Recommandations HAS - Hypertension Artérielle',
        'dm2': 'Recommandations HAS - Diabète Type 2',
        'asma': 'Recommandations HAS - Asthme',
        'dpoc': 'Recommandations GOLD 2024',
        'itu': 'Recommandations HAS - Infections Urinaires',
        'lombalgia': 'Recommandations HAS - Lombalgie',
        'depressao': 'Recommandations HAS - Dépression',
        'cefaleia': 'Recommandations HAS - Céphalées',
        'ivas': 'Recommandations HAS - Infections Respiratoires',
        'dislipidemia': 'Recommandations HAS - Dyslipidémies',
        'pre-natal': 'Recommandations HAS - Suivi de Grossesse',
        'puericultura': 'Recommandations HAS - Santé de l\'Enfant',
      }
    },
    ru: {
      locale: 'ru',
      countryName: 'Россия',
      healthSystemName: 'ОМС',
      adaptGuideline: (guideline) => {
        const mapping: Record<string, string> = {
          'Diretrizes Brasileiras de Hipertensão Arterial 2020': 'Клинические рекомендации - Артериальная гипертензия',
          'Diretrizes da Sociedade Brasileira de Diabetes 2022': 'Клинические рекомендации - Сахарный диабет 2 типа',
          'Diretrizes Brasileiras para o Manejo da Asma 2020': 'Клинические рекомендации - Бронхиальная астма',
          'GOLD 2024': 'Клинические рекомендации GOLD 2024',
          'Cadernos de Atenção Básica': 'Клинические рекомендации Минздрава',
        };
        return mapping[guideline] || guideline;
      },
      adaptObjective: (obj) => obj.replace(/APS/g, 'Первичная Медицинская Помощь').replace(/SUS/g, 'ОМС'),
      adaptDescription: (desc) => desc.replace(/Atenção Primária à Saúde/g, 'Первичная Медицинская Помощь').replace(/UBS/g, 'Поликлиника'),
      mapCID10: (cid10) => cid10,  // МКБ-10 usa códigos similares
      mapCIAP2: (ciap2) => '',  // CIAP-2 não usado na Rússia
      guidelineMappings: {
        'has': 'Клинические рекомендации - Артериальная гипертензия',
        'dm2': 'Клинические рекомендации - Сахарный диабет 2 типа',
        'asma': 'Клинические рекомендации - Бронхиальная астма',
        'dpoc': 'Клинические рекомендации GOLD 2024',
        'itu': 'Клинические рекомендации - Инфекции мочевых путей',
        'lombalgia': 'Клинические рекомендации - Боль в пояснице',
        'depressao': 'Клинические рекомендации - Депрессия',
        'cefaleia': 'Клинические рекомендации - Головная боль',
        'ivas': 'Клинические рекомендации - Инфекции верхних дыхательных путей',
        'dislipidemia': 'Клинические рекомендации - Дислипидемия',
        'pre-natal': 'Клинические рекомендации - Ведение беременности',
        'puericultura': 'Клинические рекомендации - Здоровье ребенка',
      }
    },
    ar: {
      locale: 'ar',
      countryName: 'السعودية',
      healthSystemName: 'وزارة الصحة',
      adaptGuideline: (guideline) => {
        const mapping: Record<string, string> = {
          'Diretrizes Brasileiras de Hipertensão Arterial 2020': 'المبادئ التوجيهية - ارتفاع ضغط الدم',
          'Diretrizes da Sociedade Brasileira de Diabetes 2022': 'المبادئ التوجيهية - داء السكري النوع 2',
          'GOLD 2024': 'المبادئ التوجيهية GOLD 2024',
        };
        return mapping[guideline] || guideline;
      },
      adaptObjective: (obj) => obj.replace(/APS/g, 'الرعاية الصحية الأولية').replace(/SUS/g, 'وزارة الصحة'),
      adaptDescription: (desc) => desc.replace(/Atenção Primária à Saúde/g, 'الرعاية الصحية الأولية').replace(/UBS/g, 'المركز الصحي'),
      mapCID10: (cid10) => cid10,  // ICD-10 é universal
      mapCIAP2: (ciap2) => '',  // CIAP-2 não usado na Arábia Saudita
      guidelineMappings: {
        'has': 'المبادئ التوجيهية - ارتفاع ضغط الدم',
        'dm2': 'المبادئ التوجيهية - داء السكري النوع 2',
        'asma': 'المبادئ التوجيهية - الربو',
        'dpoc': 'المبادئ التوجيهية GOLD 2024',
        'itu': 'المبادئ التوجيهية - التهابات المسالك البولية',
        'lombalgia': 'المبادئ التوجيهية - ألم أسفل الظهر',
        'depressao': 'المبادئ التوجيهية - الاكتئاب',
        'cefaleia': 'المبادئ التوجيهية - الصداع',
        'ivas': 'المبادئ التوجيهية - التهابات الجهاز التنفسي العلوي',
        'dislipidemia': 'المبادئ التوجيهية - اختلال الدهون',
        'pre-natal': 'المبادئ التوجيهية - رعاية الحمل',
        'puericultura': 'المبادئ التوجيهية - صحة الطفل',
      }
    },
    zh: {
      locale: 'zh',
      countryName: '中国',
      healthSystemName: '医保',
      adaptGuideline: (guideline) => {
        const mapping: Record<string, string> = {
          'Diretrizes Brasileiras de Hipertensão Arterial 2020': '中国高血压防治指南',
          'Diretrizes da Sociedade Brasileira de Diabetes 2022': '中国2型糖尿病防治指南',
          'GOLD 2024': 'GOLD 2024全球策略',
          'Cadernos de Atenção Básica': '国家基本公共卫生服务规范',
        };
        return mapping[guideline] || guideline;
      },
      adaptObjective: (obj) => obj.replace(/APS/g, '初级医疗保健').replace(/SUS/g, '医保'),
      adaptDescription: (desc) => desc.replace(/Atenção Primária à Saúde/g, '初级医疗保健').replace(/UBS/g, '社区卫生服务中心'),
      mapCID10: (cid10) => cid10,  // ICD-10 é universal
      mapCIAP2: (ciap2) => '',  // CIAP-2 não usado na China
      guidelineMappings: {
        'has': '中国高血压防治指南',
        'dm2': '中国2型糖尿病防治指南',
        'asma': '中国支气管哮喘防治指南',
        'dpoc': 'GOLD 2024全球策略',
        'itu': '尿路感染诊疗指南',
        'lombalgia': '腰痛诊疗指南',
        'depressao': '抑郁症诊疗指南',
        'cefaleia': '头痛诊疗指南',
        'ivas': '上呼吸道感染诊疗指南',
        'dislipidemia': '血脂异常防治指南',
        'pre-natal': '孕产期保健指南',
        'puericultura': '儿童保健指南',
      }
    },
    el: {
      locale: 'el',
      countryName: 'Ελλάδα',
      healthSystemName: 'ΕΣΥ',
      adaptGuideline: (guideline) => {
        const mapping: Record<string, string> = {
          'Diretrizes Brasileiras de Hipertensão Arterial 2020': 'Κλινικές Οδηγίες - Αρτηριακή Υπέρταση',
          'Diretrizes da Sociedade Brasileira de Diabetes 2022': 'Κλινικές Οδηγίες - Σακχαρώδης Διαβήτης Τύπου 2',
          'Diretrizes Brasileiras para o Manejo da Asma 2020': 'Κλινικές Οδηγίες - Άσθμα',
          'GOLD 2024': 'Κλινικές Οδηγίες GOLD 2024',
          'Cadernos de Atenção Básica': 'Κλινικές Οδηγίες ΕΣΥ',
        };
        return mapping[guideline] || guideline;
      },
      adaptObjective: (obj) => obj.replace(/APS/g, 'Πρωτοβάθμια Φροντίδα Υγείας').replace(/SUS/g, 'ΕΣΥ'),
      adaptDescription: (desc) => desc.replace(/Atenção Primária à Saúde/g, 'Πρωτοβάθμια Φροντίδα Υγείας').replace(/UBS/g, 'Κέντρο Υγείας'),
      mapCID10: (cid10) => cid10,  // ICD-10 é universal
      mapCIAP2: (ciap2) => '',  // CIAP-2 não usado na Grécia
      guidelineMappings: {
        'has': 'Κλινικές Οδηγίες - Αρτηριακή Υπέρταση',
        'dm2': 'Κλινικές Οδηγίες - Σακχαρώδης Διαβήτης Τύπου 2',
        'asma': 'Κλινικές Οδηγίες - Άσθμα',
        'dpoc': 'Κλινικές Οδηγίες GOLD 2024',
        'itu': 'Κλινικές Οδηγίες - Λοιμώξεις Ουροποιητικού',
        'lombalgia': 'Κλινικές Οδηγίες - Οσφυαλγία',
        'depressao': 'Κλινικές Οδηγίες - Κατάθλιψη',
        'cefaleia': 'Κλινικές Οδηγίες - Κεφαλαλγία',
        'ivas': 'Κλινικές Οδηγίες - Λοιμώξεις Άνω Αναπνευστικού',
        'dislipidemia': 'Κλινικές Οδηγίες - Δυσλιπιδαιμία',
        'pre-natal': 'Κλινικές Οδηγίες - Παρακολούθηση Εγκυμοσύνης',
        'puericultura': 'Κλινικές Οδηγίες - Υγεία Παιδιού',
      }
    },
    hi: {
      locale: 'hi',
      countryName: 'भारत',
      healthSystemName: 'NHM',
      adaptGuideline: (guideline) => {
        const mapping: Record<string, string> = {
          'Diretrizes Brasileiras de Hipertensão Arterial 2020': 'NP-NCD Hypertension Guidelines',
          'Diretrizes da Sociedade Brasileira de Diabetes 2022': 'NP-NCD Diabetes Guidelines / RSSDI',
          'Diretrizes Brasileiras para o Manejo da Asma 2020': 'ICMR Asthma Guidelines',
          'GOLD 2024': 'GOLD 2024 Guidelines',
          'Cadernos de Atenção Básica': 'NP-NCD / ICMR Guidelines',
        };
        return mapping[guideline] || guideline;
      },
      adaptObjective: (obj) => obj.replace(/APS/g, 'Primary Health Care').replace(/SUS/g, 'NHM'),
      adaptDescription: (desc) => desc.replace(/Atenção Primária à Saúde/g, 'Primary Health Care').replace(/UBS/g, 'Primary Health Centre'),
      mapCID10: (cid10) => cid10,  // ICD-10 é universal
      mapCIAP2: (ciap2) => '',  // CIAP-2 não usado na Índia
      guidelineMappings: {
        'has': 'NP-NCD Hypertension Guidelines',
        'dm2': 'NP-NCD Diabetes / RSSDI Guidelines',
        'asma': 'ICMR Asthma Guidelines',
        'dpoc': 'GOLD 2024 Guidelines',
        'itu': 'ICMR UTI Guidelines',
        'lombalgia': 'ICMR Low Back Pain Guidelines',
        'depressao': 'NIMHANS Depression Guidelines',
        'cefaleia': 'ICMR Headache Guidelines',
        'ivas': 'ICMR Upper Respiratory Infections',
        'dislipidemia': 'NP-NCD Dyslipidemia Guidelines',
        'pre-natal': 'MoHFW Antenatal Care Guidelines',
        'puericultura': 'IAP Pediatric Guidelines',
      }
    }
  };

  return configs[locale] || configs.pt;  // Fallback para português
}

/**
 * Adapta um protocolo para um locale específico
 */
export function adaptProtocol(protocol: Protocolo, locale: Locale): Protocolo {
  const config = getProtocolLocalizationConfig(locale);
  
  // Se já está no locale correto, retornar como está
  if (locale === 'pt') {
    return protocol;
  }

  // Adaptar protocolo
  return {
    ...protocol,
    titulo: config.adaptDescription(protocol.titulo),
    subtitulo: protocol.subtitulo ? config.adaptDescription(protocol.subtitulo) : undefined,
    descricao: config.adaptDescription(protocol.descricao),
    objetivos: protocol.objetivos.map(obj => config.adaptObjective(obj)),
    populacaoAlvo: config.adaptDescription(protocol.populacaoAlvo),
    fonte: config.guidelineMappings[protocol.id] || config.adaptGuideline(protocol.fonte || ''),
    
    // Adaptar códigos
    cid10: protocol.cid10?.map(code => config.mapCID10(code)),
    ciap2: protocol.ciap2?.map(ciap => config.mapCIAP2(ciap)).filter((ciap): ciap is string => ciap !== ''),
    
    // Adaptar nós do fluxograma
    nodes: protocol.nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        label: config.adaptDescription(node.data.label),
        description: node.data.description ? config.adaptDescription(node.data.description) : undefined,
        details: node.data.details?.map(d => config.adaptDescription(d)),
        referTo: node.data.referTo ? config.adaptDescription(node.data.referTo) : undefined,
        ciap2: node.data.ciap2 ? config.mapCIAP2(node.data.ciap2) : undefined,
        cid10: node.data.cid10 ? config.mapCID10(node.data.cid10) : undefined,
      }
    })),
    
    // Adaptar arestas (labels)
    edges: protocol.edges.map(edge => ({
      ...edge,
      label: edge.label && typeof edge.label === 'string' ? config.adaptDescription(edge.label) : edge.label,
    })),
    
    // Adaptar conteúdo adicional
    criteriosInclusao: protocol.criteriosInclusao?.map(c => config.adaptDescription(c)),
    criteriosExclusao: protocol.criteriosExclusao?.map(c => config.adaptDescription(c)),
    sinaisAlerta: protocol.sinaisAlerta?.map(s => config.adaptDescription(s)),
    encaminhamento: protocol.encaminhamento ? {
      quando: protocol.encaminhamento.quando.map(q => config.adaptDescription(q)),
      paraCQuem: config.adaptDescription(protocol.encaminhamento.paraCQuem),
    } : undefined,
    referencias: protocol.referencias?.map(r => config.adaptGuideline(r)),
  };
}

/**
 * Obtém nome da diretriz localizada para um protocolo
 */
export function getLocalizedGuideline(protocolId: string, locale: Locale): string {
  const config = getProtocolLocalizationConfig(locale);
  return config.guidelineMappings[protocolId] || '';
}

