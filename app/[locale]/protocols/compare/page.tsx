'use client';

/**
 * PROTOCOL COMPARISON PAGE - DARWIN-MFC
 * ======================================
 *
 * Side-by-side comparison of screening protocols from:
 * - SUS (Brazil)
 * - USPSTF (USA)
 * - NHS/NICE (UK)
 *
 * Features:
 * - Searchable protocol list
 * - Visual comparison of recommendations
 * - Grade/evidence level display
 * - Convergence indicators
 */

import { useState, useMemo } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import {
  Search,
  ArrowLeft,
  GitCompare,
  Info,
  ChevronDown,
  ChevronUp,
  Flag,
  ExternalLink,
  Check,
  X,
  Minus,
  AlertCircle,
} from 'lucide-react';
import {
  USPSTF_RECOMMENDATIONS,
  USPSTF_GRADE_DEFINITIONS,
  type USPSTFRecommendation,
  type USPSTFGrade,
} from '@/lib/data/protocols/uspstf';
import {
  NHS_RECOMMENDATIONS,
  NICE_EVIDENCE_DEFINITIONS,
  NHS_PROGRAMME_STATUS,
  type NHSRecommendation,
} from '@/lib/data/protocols/nhs';
import { rastreamentos } from '@/lib/data/rastreamentos';
import type { LanguageCode } from '@/lib/ontology/types/ontology';

// Country flag colors
const COUNTRY_COLORS = {
  br: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', border: 'border-green-300 dark:border-green-700' },
  us: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700' },
  uk: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', border: 'border-red-300 dark:border-red-700' },
};

// Convergence status
type ConvergenceStatus = 'full' | 'partial' | 'divergent' | 'unknown';

// Protocol comparison data structure
interface ProtocolComparison {
  id: string;
  condition: {
    pt: string;
    en: string;
    es?: string;
  };
  category: string;
  sus?: {
    population: string;
    method: string;
    interval: string;
    grade?: string;
  };
  uspstf?: {
    population: string;
    method: string;
    interval: string;
    grade: USPSTFGrade;
    reference: string;
  };
  nhs?: {
    population: string;
    method: string;
    interval: string;
    evidenceLevel?: string;
    reference: string;
  };
  convergence: ConvergenceStatus;
  notes?: {
    pt?: string;
    en?: string;
  };
}

// Build comparison data from sources
function buildComparisonData(): ProtocolComparison[] {
  const comparisons: ProtocolComparison[] = [
    // Breast Cancer
    {
      id: 'breast-cancer',
      condition: {
        pt: 'Cancer de Mama',
        en: 'Breast Cancer',
        es: 'Cancer de Mama',
      },
      category: 'cancer',
      sus: {
        population: '40-74 anos (40-49 decisao compartilhada)',
        method: 'Mamografia bilateral',
        interval: 'Bienal (a cada 2 anos)',
        grade: 'Recomendado',
      },
      uspstf: {
        population: '40-74 anos',
        method: 'Mamografia',
        interval: 'A cada 2 anos',
        grade: 'B',
        reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-screening',
      },
      nhs: {
        population: '50-70 anos (extensao para 47-73)',
        method: 'Mamografia',
        interval: 'A cada 3 anos',
        evidenceLevel: 'high',
        reference: 'https://www.gov.uk/guidance/breast-screening-programme-overview',
      },
      convergence: 'partial',
      notes: {
        pt: 'Brasil e EUA agora convergem em 40 anos com decisao compartilhada. NHS inicia mais tarde (50) mas com intervalo trienal.',
        en: 'Brazil and US now converge at 40 years with shared decision-making. NHS starts later (50) but with triennial interval.',
      },
    },
    // Cervical Cancer
    {
      id: 'cervical-cancer',
      condition: {
        pt: 'Cancer de Colo do Utero',
        en: 'Cervical Cancer',
        es: 'Cancer Cervical',
      },
      category: 'cancer',
      sus: {
        population: '25-64 anos (HPV-DNA 30-64)',
        method: 'Teste HPV-DNA (citologia 25-29)',
        interval: 'Quinquenal (HPV negativo)',
        grade: 'Recomendado',
      },
      uspstf: {
        population: '21-65 anos',
        method: 'Citologia / HPV / Co-teste',
        interval: '3-5 anos conforme metodo e idade',
        grade: 'A',
        reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/cervical-cancer-screening',
      },
      nhs: {
        population: '25-64 anos',
        method: 'Teste HPV primario',
        interval: '3 anos (25-49), 5 anos (50-64)',
        evidenceLevel: 'high',
        reference: 'https://www.gov.uk/guidance/cervical-screening-programme-overview',
      },
      convergence: 'full',
      notes: {
        pt: 'Alta convergencia entre os tres sistemas. Todos adotaram teste HPV como primario.',
        en: 'High convergence across all three systems. All adopted HPV testing as primary.',
      },
    },
    // Colorectal Cancer
    {
      id: 'colorectal-cancer',
      condition: {
        pt: 'Cancer Colorretal',
        en: 'Colorectal Cancer',
        es: 'Cancer Colorrectal',
      },
      category: 'cancer',
      sus: {
        population: 'Em definicao (Lei: 35a / Tecnica: 50a)',
        method: 'Sangue oculto nas fezes / Colonoscopia',
        interval: 'Em definicao',
        grade: 'Em discussao',
      },
      uspstf: {
        population: '45-75 anos',
        method: 'FIT, Colonoscopia, FIT-DNA, CT',
        interval: 'Anual (FIT), 10 anos (colonoscopia)',
        grade: 'A',
        reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/colorectal-cancer-screening',
      },
      nhs: {
        population: '60-74 anos (expansao para 50-59)',
        method: 'FIT + colonoscopia se positivo',
        interval: 'Bienal',
        evidenceLevel: 'high',
        reference: 'https://www.gov.uk/guidance/bowel-screening-programme-overview',
      },
      convergence: 'divergent',
      notes: {
        pt: 'Brasil ainda em definicao. EUA inicia aos 45 (Grade A), NHS aos 60 com expansao em andamento.',
        en: 'Brazil still defining policy. US starts at 45 (Grade A), NHS at 60 with ongoing expansion.',
      },
    },
    // Lung Cancer
    {
      id: 'lung-cancer',
      condition: {
        pt: 'Cancer de Pulmao',
        en: 'Lung Cancer',
        es: 'Cancer de Pulmon',
      },
      category: 'cancer',
      sus: {
        population: 'Nao implementado (em estudo)',
        method: '-',
        interval: '-',
        grade: 'Nao recomendado',
      },
      uspstf: {
        population: '50-80 anos, 20 macos-ano',
        method: 'TC de baixa dose (LDCT)',
        interval: 'Anual',
        grade: 'B',
        reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/lung-cancer-screening',
      },
      nhs: {
        population: '55-74 anos, fumantes/ex-fumantes',
        method: 'TC de baixa dose',
        interval: 'Anual',
        evidenceLevel: 'high',
        reference: 'https://www.england.nhs.uk/contact-us/privacy-notice/how-we-use-your-information/our-services/the-nhs-lung-health-check-programme/',
      },
      convergence: 'divergent',
      notes: {
        pt: 'Brasil nao implementou rastreamento de pulmao. EUA e UK tem programas ativos para alto risco.',
        en: 'Brazil has not implemented lung screening. US and UK have active programs for high-risk individuals.',
      },
    },
    // Prostate Cancer
    {
      id: 'prostate-cancer',
      condition: {
        pt: 'Cancer de Prostata',
        en: 'Prostate Cancer',
        es: 'Cancer de Prostata',
      },
      category: 'cancer',
      sus: {
        population: 'Nao recomendado (decisao compartilhada)',
        method: 'PSA + Toque retal',
        interval: 'Nao definido',
        grade: 'Nao recomendado',
      },
      uspstf: {
        population: '55-69 anos',
        method: 'PSA',
        interval: 'Individualizado',
        grade: 'C',
        reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/prostate-cancer-screening',
      },
      nhs: {
        population: 'Sob demanda (Prostate Cancer Risk Management)',
        method: 'PSA',
        interval: 'Sob demanda',
        evidenceLevel: 'moderate',
        reference: 'https://www.nhs.uk/conditions/prostate-cancer/psa-testing/',
      },
      convergence: 'partial',
      notes: {
        pt: 'Consenso de que nao ha beneficio claro para rastreamento populacional. Decisao compartilhada e fundamental.',
        en: 'Consensus that there is no clear benefit for population screening. Shared decision-making is key.',
      },
    },
    // Hypertension
    {
      id: 'hypertension',
      condition: {
        pt: 'Hipertensao Arterial',
        en: 'Hypertension',
        es: 'Hipertension Arterial',
      },
      category: 'cardiovascular',
      sus: {
        population: '18+ anos',
        method: 'Aferacao PA em toda consulta',
        interval: 'Toda consulta',
        grade: 'Recomendado',
      },
      uspstf: {
        population: '18+ anos',
        method: 'Aferacao PA em consultorio',
        interval: 'Anual (ou mais frequente se elevada)',
        grade: 'A',
        reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/hypertension-in-adults-screening',
      },
      nhs: {
        population: '18+ anos',
        method: 'ABPM/HBPM para confirmacao',
        interval: 'NHS Health Check a cada 5 anos',
        evidenceLevel: 'high',
        reference: 'https://www.nice.org.uk/guidance/ng136',
      },
      convergence: 'full',
      notes: {
        pt: 'Alta convergencia. Todos recomendam rastreamento universal de hipertensao em adultos.',
        en: 'High convergence. All recommend universal hypertension screening in adults.',
      },
    },
    // Diabetes
    {
      id: 'diabetes',
      condition: {
        pt: 'Diabetes Tipo 2',
        en: 'Type 2 Diabetes',
        es: 'Diabetes Tipo 2',
      },
      category: 'metabolic',
      sus: {
        population: '45+ anos ou com fatores de risco CV',
        method: 'Glicemia de jejum / HbA1c',
        interval: 'A cada 3 anos',
        grade: 'Recomendado',
      },
      uspstf: {
        population: '35-70 anos com sobrepeso/obesidade',
        method: 'Glicemia jejum / HbA1c / TOTG',
        interval: 'A cada 3 anos',
        grade: 'B',
        reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/screening-for-prediabetes-and-type-2-diabetes',
      },
      nhs: {
        population: 'Alto risco (HbA1c 42-47)',
        method: 'HbA1c / Glicemia jejum',
        interval: 'Anual para alto risco',
        evidenceLevel: 'high',
        reference: 'https://www.nice.org.uk/guidance/ph38',
      },
      convergence: 'partial',
      notes: {
        pt: 'Todos concordam em rastrear, mas criterios de idade e risco variam. NHS foca em intervencao precoce (DPP).',
        en: 'All agree to screen, but age and risk criteria vary. NHS focuses on early intervention (DPP).',
      },
    },
    // Depression
    {
      id: 'depression',
      condition: {
        pt: 'Depressao',
        en: 'Depression',
        es: 'Depresion',
      },
      category: 'mental_health',
      sus: {
        population: 'Oportunistico (grupos de risco)',
        method: 'PHQ-2/PHQ-9',
        interval: 'Oportunistico',
        grade: 'Recomendado para risco',
      },
      uspstf: {
        population: '18+ anos',
        method: 'PHQ-9, PHQ-2',
        interval: 'Periodico',
        grade: 'B',
        reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/depression-in-adults-screening',
      },
      nhs: {
        population: 'Adultos com condicoes cronicas / historico',
        method: 'PHQ-2/PHQ-9',
        interval: 'Oportunistico',
        evidenceLevel: 'moderate',
        reference: 'https://www.nice.org.uk/guidance/cg90',
      },
      convergence: 'partial',
      notes: {
        pt: 'EUA recomenda rastreamento universal. Brasil e UK focam em grupos de risco.',
        en: 'US recommends universal screening. Brazil and UK focus on at-risk groups.',
      },
    },
    // HIV
    {
      id: 'hiv',
      condition: {
        pt: 'HIV',
        en: 'HIV',
        es: 'VIH',
      },
      category: 'infectious',
      sus: {
        population: 'Grupos de risco + gestantes',
        method: 'Teste rapido / ELISA',
        interval: 'Gestacao: 1o e 3o tri',
        grade: 'Recomendado',
      },
      uspstf: {
        population: '15-65 anos (universal)',
        method: 'Teste Ag/Ab 4a geracao',
        interval: 'Unico + periodico se risco',
        grade: 'A',
        reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/human-immunodeficiency-virus-hiv-infection-screening',
      },
      nhs: {
        population: 'Alto risco + areas prevalencia ≥2/1000',
        method: 'Teste 4a geracao',
        interval: 'Conforme exposicao',
        evidenceLevel: 'high',
        reference: 'https://www.nice.org.uk/guidance/ng60',
      },
      convergence: 'partial',
      notes: {
        pt: 'EUA tem rastreamento mais universal (Grade A). Brasil e UK focam em grupos de risco.',
        en: 'US has more universal screening (Grade A). Brazil and UK focus on at-risk groups.',
      },
    },
    // Hepatitis C
    {
      id: 'hepatitis-c',
      condition: {
        pt: 'Hepatite C',
        en: 'Hepatitis C',
        es: 'Hepatitis C',
      },
      category: 'infectious',
      sus: {
        population: 'Grupos de risco',
        method: 'Anti-HCV + RNA se positivo',
        interval: 'Conforme risco',
        grade: 'Recomendado para risco',
      },
      uspstf: {
        population: '18-79 anos (universal)',
        method: 'Anti-HCV + HCV RNA',
        interval: 'Unico + periodico se risco',
        grade: 'B',
        reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/hepatitis-c-screening',
      },
      nhs: {
        population: 'PWID, transfusao pre-1991, alto risco',
        method: 'Anti-HCV + RNA',
        interval: 'Anual para PWID',
        evidenceLevel: 'high',
        reference: 'https://www.nice.org.uk/guidance/ng225',
      },
      convergence: 'partial',
      notes: {
        pt: 'EUA expandiu para rastreamento quase universal (18-79). Brasil e UK mantem foco em risco.',
        en: 'US expanded to near-universal screening (18-79). Brazil and UK maintain focus on risk.',
      },
    },
    // AAA
    {
      id: 'aaa',
      condition: {
        pt: 'Aneurisma de Aorta Abdominal',
        en: 'Abdominal Aortic Aneurysm',
        es: 'Aneurisma Aorta Abdominal',
      },
      category: 'cardiovascular',
      sus: {
        population: 'Nao implementado',
        method: '-',
        interval: '-',
        grade: 'Nao recomendado',
      },
      uspstf: {
        population: 'Homens 65-75 que ja fumaram',
        method: 'Ultrassom abdominal',
        interval: 'Unico',
        grade: 'B',
        reference: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/abdominal-aortic-aneurysm-screening',
      },
      nhs: {
        population: 'Homens aos 65 anos',
        method: 'Ultrassom abdominal',
        interval: 'Unico',
        evidenceLevel: 'high',
        reference: 'https://www.gov.uk/guidance/abdominal-aortic-aneurysm-screening-programme-overview',
      },
      convergence: 'divergent',
      notes: {
        pt: 'EUA e UK tem programas ativos. Brasil nao implementou rastreamento de AAA.',
        en: 'US and UK have active programs. Brazil has not implemented AAA screening.',
      },
    },
    // Newborn Screening
    {
      id: 'newborn-screening',
      condition: {
        pt: 'Triagem Neonatal (Teste do Pezinho)',
        en: 'Newborn Blood Spot Screening',
        es: 'Tamizaje Neonatal',
      },
      category: 'neonatal',
      sus: {
        population: 'Todos os recem-nascidos',
        method: 'Teste do Pezinho',
        interval: '3o-5o dia de vida',
        grade: 'Recomendado',
      },
      uspstf: {
        population: 'Todos os recem-nascidos',
        method: 'Newborn screening panel',
        interval: '24-48 horas de vida',
        grade: 'A',
        reference: 'https://www.hrsa.gov/advisory-committees/heritable-disorders/rusp',
      },
      nhs: {
        population: 'Todos os recem-nascidos',
        method: 'Blood spot (9 condicoes)',
        interval: '5o dia de vida',
        evidenceLevel: 'high',
        reference: 'https://www.gov.uk/guidance/newborn-blood-spot-screening-programme-overview',
      },
      convergence: 'full',
      notes: {
        pt: 'Alta convergencia. Todos tem programas universais de triagem neonatal.',
        en: 'High convergence. All have universal newborn screening programs.',
      },
    },
  ];

  return comparisons;
}

// USPSTF Grade Badge
function USPSTFGradeBadge({ grade }: { grade: USPSTFGrade }) {
  const def = USPSTF_GRADE_DEFINITIONS[grade];
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
      style={{ backgroundColor: def.color }}
      title={def.meaning.en}
    >
      {grade}
    </span>
  );
}

// Convergence Badge
function ConvergenceBadge({ status, locale }: { status: ConvergenceStatus; locale: string }) {
  const styles: Record<ConvergenceStatus, { bg: string; text: string; icon: React.ElementType; label: { pt: string; en: string } }> = {
    full: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', icon: Check, label: { pt: 'Alta', en: 'High' } },
    partial: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', icon: Minus, label: { pt: 'Parcial', en: 'Partial' } },
    divergent: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', icon: X, label: { pt: 'Divergente', en: 'Divergent' } },
    unknown: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-600 dark:text-gray-300', icon: AlertCircle, label: { pt: 'Incerto', en: 'Unknown' } },
  };

  const style = styles[status];
  const Icon = style.icon;
  const labelLocale = locale === 'pt' ? 'pt' : 'en';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 ${style.bg} ${style.text} rounded-full text-xs font-semibold`}>
      <Icon className="w-3 h-3" />
      {style.label[labelLocale]}
    </span>
  );
}

// Country Badge
function CountryBadge({ country, locale }: { country: 'br' | 'us' | 'uk'; locale: string }) {
  const labels = {
    br: { pt: 'Brasil (SUS)', en: 'Brazil (SUS)' },
    us: { pt: 'EUA (USPSTF)', en: 'USA (USPSTF)' },
    uk: { pt: 'Reino Unido (NHS)', en: 'UK (NHS)' },
  };
  const colors = COUNTRY_COLORS[country];
  const labelLocale = locale === 'pt' ? 'pt' : 'en';

  return (
    <span className={`px-2 py-1 ${colors.bg} ${colors.text} ${colors.border} border rounded-lg text-xs font-semibold`}>
      {labels[country][labelLocale]}
    </span>
  );
}

export default function ProtocolsComparePage() {
  const t = useTranslations('common');
  const locale = useLocale() as LanguageCode;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedProtocol, setExpandedProtocol] = useState<string | null>(null);

  // Build comparison data
  const comparisons = useMemo(() => buildComparisonData(), []);

  // Categories
  const categories = [
    { id: 'all', label: { pt: 'Todos', en: 'All' } },
    { id: 'cancer', label: { pt: 'Cancer', en: 'Cancer' } },
    { id: 'cardiovascular', label: { pt: 'Cardiovascular', en: 'Cardiovascular' } },
    { id: 'metabolic', label: { pt: 'Metabolico', en: 'Metabolic' } },
    { id: 'infectious', label: { pt: 'Infeccioso', en: 'Infectious' } },
    { id: 'mental_health', label: { pt: 'Saude Mental', en: 'Mental Health' } },
    { id: 'neonatal', label: { pt: 'Neonatal', en: 'Neonatal' } },
  ];

  // Filter comparisons
  const filteredComparisons = useMemo(() => {
    let filtered = comparisons;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.condition.pt.toLowerCase().includes(query) ||
          c.condition.en.toLowerCase().includes(query) ||
          c.sus?.method?.toLowerCase().includes(query) ||
          c.uspstf?.method?.toLowerCase().includes(query) ||
          c.nhs?.method?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [comparisons, selectedCategory, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    const total = comparisons.length;
    const full = comparisons.filter((c) => c.convergence === 'full').length;
    const partial = comparisons.filter((c) => c.convergence === 'partial').length;
    const divergent = comparisons.filter((c) => c.convergence === 'divergent').length;
    return { total, full, partial, divergent };
  }, [comparisons]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/protocolos"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('back') || 'Back'}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <GitCompare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {locale === 'pt' ? 'Comparacao de Protocolos' : 'Protocol Comparison'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {locale === 'pt'
                    ? 'SUS (Brasil) vs USPSTF (EUA) vs NHS/NICE (Reino Unido)'
                    : 'SUS (Brazil) vs USPSTF (USA) vs NHS/NICE (UK)'}
                </p>
              </div>
            </div>

            {/* Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {locale === 'pt' ? 'Protocolos Comparados' : 'Compared Protocols'}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.full}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {locale === 'pt' ? 'Alta Convergencia' : 'High Convergence'}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.partial}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {locale === 'pt' ? 'Convergencia Parcial' : 'Partial Convergence'}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.divergent}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {locale === 'pt' ? 'Divergente' : 'Divergent'}
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    locale === 'pt'
                      ? 'Buscar por condicao ou metodo...'
                      : 'Search by condition or method...'
                  }
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                    }`}
                  >
                    {locale === 'pt' ? cat.label.pt : cat.label.en}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {locale === 'pt' ? 'Legenda:' : 'Legend:'}
              </span>
              <div className="flex items-center gap-4">
                <CountryBadge country="br" locale={locale} />
                <CountryBadge country="us" locale={locale} />
                <CountryBadge country="uk" locale={locale} />
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <ConvergenceBadge status="full" locale={locale} />
                <ConvergenceBadge status="partial" locale={locale} />
                <ConvergenceBadge status="divergent" locale={locale} />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredComparisons.length}{' '}
              {locale === 'pt'
                ? `protocolo${filteredComparisons.length !== 1 ? 's' : ''}`
                : `protocol${filteredComparisons.length !== 1 ? 's' : ''}`}
            </div>

            {filteredComparisons.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center border border-gray-200 dark:border-gray-700">
                <GitCompare className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400">
                  {locale === 'pt'
                    ? 'Nenhum protocolo encontrado. Tente outro termo.'
                    : 'No protocols found. Try a different term.'}
                </p>
              </div>
            ) : (
              filteredComparisons.map((comparison) => (
                <div
                  key={comparison.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpandedProtocol(expandedProtocol === comparison.id ? null : comparison.id)}
                    className="w-full p-4 flex items-center gap-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {locale === 'pt' ? comparison.condition.pt : comparison.condition.en}
                        </h3>
                        <ConvergenceBadge status={comparison.convergence} locale={locale} />
                      </div>
                    </div>
                    {expandedProtocol === comparison.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {/* Expanded Content */}
                  {expandedProtocol === comparison.id && (
                    <div className="border-t border-gray-200 dark:border-gray-700">
                      {/* Comparison Grid */}
                      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                        {/* SUS */}
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                              BR
                            </div>
                            <span className="font-semibold text-green-700 dark:text-green-300">SUS (Brasil)</span>
                          </div>
                          {comparison.sus ? (
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">
                                  {locale === 'pt' ? 'Populacao:' : 'Population:'}
                                </span>
                                <p className="text-gray-700 dark:text-gray-300">{comparison.sus.population}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">
                                  {locale === 'pt' ? 'Metodo:' : 'Method:'}
                                </span>
                                <p className="text-gray-700 dark:text-gray-300">{comparison.sus.method}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">
                                  {locale === 'pt' ? 'Intervalo:' : 'Interval:'}
                                </span>
                                <p className="text-gray-700 dark:text-gray-300">{comparison.sus.interval}</p>
                              </div>
                              {comparison.sus.grade && (
                                <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded">
                                    {comparison.sus.grade}
                                  </span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-gray-400 dark:text-gray-500 italic text-sm">
                              {locale === 'pt' ? 'Nao implementado' : 'Not implemented'}
                            </p>
                          )}
                        </div>

                        {/* USPSTF */}
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                              US
                            </div>
                            <span className="font-semibold text-blue-700 dark:text-blue-300">USPSTF (EUA)</span>
                          </div>
                          {comparison.uspstf ? (
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">
                                  {locale === 'pt' ? 'Populacao:' : 'Population:'}
                                </span>
                                <p className="text-gray-700 dark:text-gray-300">{comparison.uspstf.population}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">
                                  {locale === 'pt' ? 'Metodo:' : 'Method:'}
                                </span>
                                <p className="text-gray-700 dark:text-gray-300">{comparison.uspstf.method}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">
                                  {locale === 'pt' ? 'Intervalo:' : 'Interval:'}
                                </span>
                                <p className="text-gray-700 dark:text-gray-300">{comparison.uspstf.interval}</p>
                              </div>
                              <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2">
                                <USPSTFGradeBadge grade={comparison.uspstf.grade} />
                                <a
                                  href={comparison.uspstf.reference}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 dark:text-blue-400 hover:underline text-xs flex items-center gap-1"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  {locale === 'pt' ? 'Ver' : 'View'}
                                </a>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-400 dark:text-gray-500 italic text-sm">
                              {locale === 'pt' ? 'Nao disponivel' : 'Not available'}
                            </p>
                          )}
                        </div>

                        {/* NHS */}
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center text-white text-xs font-bold">
                              UK
                            </div>
                            <span className="font-semibold text-red-700 dark:text-red-300">NHS/NICE (UK)</span>
                          </div>
                          {comparison.nhs ? (
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">
                                  {locale === 'pt' ? 'Populacao:' : 'Population:'}
                                </span>
                                <p className="text-gray-700 dark:text-gray-300">{comparison.nhs.population}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">
                                  {locale === 'pt' ? 'Metodo:' : 'Method:'}
                                </span>
                                <p className="text-gray-700 dark:text-gray-300">{comparison.nhs.method}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-500 dark:text-gray-400">
                                  {locale === 'pt' ? 'Intervalo:' : 'Interval:'}
                                </span>
                                <p className="text-gray-700 dark:text-gray-300">{comparison.nhs.interval}</p>
                              </div>
                              <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2">
                                {comparison.nhs.evidenceLevel && (
                                  <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-semibold rounded capitalize">
                                    {comparison.nhs.evidenceLevel}
                                  </span>
                                )}
                                <a
                                  href={comparison.nhs.reference}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-red-600 dark:text-red-400 hover:underline text-xs flex items-center gap-1"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  {locale === 'pt' ? 'Ver' : 'View'}
                                </a>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-400 dark:text-gray-500 italic text-sm">
                              {locale === 'pt' ? 'Nao disponivel' : 'Not available'}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Notes */}
                      {comparison.notes && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {locale === 'pt' ? (comparison.notes.pt || comparison.notes.en) : comparison.notes.en}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 via-purple-50 to-red-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-red-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {locale === 'pt' ? 'Sobre esta Comparacao' : 'About this Comparison'}
            </h3>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                {locale === 'pt'
                  ? 'Esta ferramenta compara protocolos de rastreamento de tres sistemas de saude de referencia mundial. As diferencas refletem contextos epidemiologicos, recursos disponiveis e evidencias locais. A convergencia alta indica alinhamento cientifico; divergencias podem refletir adaptacoes legitimas a realidades locais ou necessidade de atualizacao.'
                  : 'This tool compares screening protocols from three world-reference healthcare systems. Differences reflect epidemiological contexts, available resources, and local evidence. High convergence indicates scientific alignment; divergences may reflect legitimate adaptations to local realities or need for updates.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
