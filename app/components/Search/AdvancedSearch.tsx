'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X, BookOpen, Pill, Activity, Loader2 } from 'lucide-react';
import Fuse from 'fuse.js';
import { useLocale } from 'next-intl';
import { getAllRastreamentos } from '@/lib/data/rastreamentos';
import { getAllDoencas } from '@/lib/data/doencas/index';
import { medicamentos } from '@/lib/data/medicamentos';
import { Link } from '@/i18n/routing';
import { useLocalizedDiseases, LocalizedDoenca } from '@/lib/hooks/useLocalizedDisease';

type SearchResultType = 'rastreamento' | 'doenca' | 'medicamento';

interface UnifiedSearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  badges: { label: string; color: string }[];
  lastUpdate?: string;
  // Additional fields for search indexing (not displayed)
  searchableText?: string;
  originalTitle?: string;
  tags?: string[];
}

export default function AdvancedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
  });

  const locale = useLocale();

  const rastreamentos = getAllRastreamentos();

  // Get all disease IDs for localization
  const allDoencas = getAllDoencas();
  const diseaseIds = useMemo(() =>
    allDoencas.map(d => d.id).filter((id): id is string => !!id),
    [allDoencas]
  );

  // Use localized diseases hook
  const { diseases: localizedDiseases, isLoading: isLoadingDiseases } = useLocalizedDiseases(diseaseIds);

  // Create a map for quick lookup of localized diseases
  const localizedDiseaseMap = useMemo(() => {
    const map = new Map<string, LocalizedDoenca>();
    localizedDiseases.forEach(d => {
      if (d.id) map.set(d.id, d);
    });
    return map;
  }, [localizedDiseases]);

  // Unify all items for search - now with localized disease content
  const allItems: UnifiedSearchResult[] = useMemo(() => {
    const items: UnifiedSearchResult[] = [];

    // Rastreamentos
    rastreamentos.forEach(r => {
      items.push({
        id: r.id,
        type: 'rastreamento',
        title: r.title,
        subtitle: getCategoryInfo(r.category).label,
        description: r.description,
        path: `/${r.category}#${r.id}`,
        badges: [
          { label: getCategoryInfo(r.category).label, color: getCategoryInfo(r.category).color },
          { label: getConvergenceInfo(r.recommendations.convergence.status).icon + ' ' + getConvergenceInfo(r.recommendations.convergence.status).label, color: getConvergenceInfo(r.recommendations.convergence.status).color }
        ],
        lastUpdate: r.lastUpdate
      });
    });

    // Diseases - use localized data if available, fall back to original
    allDoencas.forEach(originalDisease => {
      if (!originalDisease.id) return;

      const localizedDisease = localizedDiseaseMap.get(originalDisease.id);
      const disease = localizedDisease || originalDisease;

      // Get display values (translated if available)
      const displayTitle = disease.titulo || originalDisease.titulo || '';
      const displayDefinition = disease.quickView?.definicao || originalDisease.quickView?.definicao || '';
      const displayTags = disease.tags || originalDisease.tags || [];
      const displaySynonyms = disease.sinonimos || originalDisease.sinonimos || [];

      // Build searchable text combining translated AND original content for better search coverage
      const searchableText = [
        displayTitle,
        originalDisease.titulo, // Always include original Portuguese title for search
        displayDefinition,
        originalDisease.quickView?.definicao, // Original definition
        ...displayTags,
        ...(originalDisease.tags || []), // Original tags
        ...displaySynonyms,
        ...(originalDisease.sinonimos || []), // Original synonyms
        ...(originalDisease.ciap2 || []),
        ...(originalDisease.cid10 || []),
      ].filter(Boolean).join(' ');

      // Get translated label for "Disease" badge
      const diseaseBadgeLabel = locale === 'pt' ? 'Doenca' :
                               locale === 'en' ? 'Disease' :
                               locale === 'es' ? 'Enfermedad' :
                               locale === 'fr' ? 'Maladie' :
                               locale === 'ru' ? 'Болезнь' :
                               locale === 'ar' ? 'مرض' :
                               locale === 'zh' ? '疾病' :
                               locale === 'el' ? 'Νόσος' :
                               locale === 'hi' ? 'रोग' : 'Disease';

      items.push({
        id: originalDisease.id,
        type: 'doenca',
        title: displayTitle,
        subtitle: (originalDisease.ciap2?.join(', ') || '') + ' | ' + (originalDisease.cid10?.join(', ') || ''),
        description: displayDefinition,
        path: `/doencas/${originalDisease.id}`,
        badges: [
          { label: diseaseBadgeLabel, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
          ...(originalDisease.ciap2?.slice(0, 1).map(c => ({ label: c, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' })) || []),
          ...(originalDisease.cid10?.slice(0, 1).map(c => ({ label: c, color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300' })) || [])
        ],
        lastUpdate: originalDisease.lastUpdate,
        searchableText,
        originalTitle: originalDisease.titulo,
        tags: [...displayTags, ...(originalDisease.tags || [])]
      });
    });

    // Medicamentos
    medicamentos.forEach(m => {
      items.push({
        id: m.id,
        type: 'medicamento',
        title: m.nomeGenerico,
        subtitle: m.nomesComerciais?.join(', ') || '',
        description: m.indicacoes.slice(0, 2).join(' • '),
        path: `/medicamentos/${m.id}`,
        badges: [
          { label: locale === 'pt' ? 'Medicamento' : 'Medication', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
          ...(m.rename ? [{ label: 'RENAME', color: 'bg-green-500 text-white' }] : []),
          { label: `Cat. ${m.gestacao}`, color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300' }
        ],
        lastUpdate: m.lastUpdate
      });
    });

    return items;
  }, [rastreamentos, allDoencas, localizedDiseaseMap, locale]);

  // Fuse.js configuration for fuzzy search - includes both translated and original content
  const fuse = useMemo(() => {
    return new Fuse(allItems, {
      keys: [
        { name: 'title', weight: 4 },
        { name: 'originalTitle', weight: 3 },  // Original Portuguese title for search
        { name: 'subtitle', weight: 2 },
        { name: 'description', weight: 1.5 },
        { name: 'searchableText', weight: 1 }, // Combined translated + original content
        { name: 'tags', weight: 2 },           // Tags (translated + original)
      ],
      threshold: 0.35,
      includeScore: true,
      ignoreLocation: true,  // Search anywhere in the text
      minMatchCharLength: 2, // Minimum characters to match
    });
  }, [allItems]);

  // Busca e filtros combinados
  const results = useMemo(() => {
    let filtered = allItems;

    // Aplicar busca fuzzy
    if (searchTerm.trim()) {
      const fuseResults = fuse.search(searchTerm);
      filtered = fuseResults.map(result => result.item);
    }

    // Aplicar filtros de tipo
    if (filters.type !== 'all') {
      filtered = filtered.filter(r => r.type === filters.type);
    }

    return filtered.slice(0, 50); // Limit results
  }, [searchTerm, filters, allItems, fuse]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      type: 'all',
      category: 'all',
    });
  };

  const getTypeIcon = (type: SearchResultType) => {
    switch (type) {
      case 'rastreamento': return <Activity className="w-5 h-5 text-purple-500" />;
      case 'doenca': return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'medicamento': return <Pill className="w-5 h-5 text-emerald-500" />;
    }
  };

  const getTypeBgColor = (type: SearchResultType) => {
    switch (type) {
      case 'rastreamento': return 'border-l-purple-500';
      case 'doenca': return 'border-l-blue-500';
      case 'medicamento': return 'border-l-emerald-500';
    }
  };

  // Translated labels for UI
  const labels = {
    searchPlaceholder: locale === 'pt' ? 'Buscar doencas, medicamentos, rastreamentos, CIAP-2, CID-10...' :
                       locale === 'en' ? 'Search diseases, medications, screenings, ICPC-2, ICD-10...' :
                       locale === 'es' ? 'Buscar enfermedades, medicamentos, tamizajes, CIAP-2, CIE-10...' :
                       locale === 'fr' ? 'Rechercher maladies, medicaments, depistages, CISP-2, CIM-10...' :
                       locale === 'ru' ? 'Поиск болезней, лекарств, скринингов, ICPC-2, МКБ-10...' :
                       locale === 'ar' ? 'البحث عن الامراض، الادوية، الفحوصات...' :
                       locale === 'zh' ? '搜索疾病、药物、筛查、ICPC-2、ICD-10...' :
                       locale === 'el' ? 'Αναζητηση νοσων, φαρμακων, διαλογων...' :
                       locale === 'hi' ? 'रोग, दवाइयाँ, जाँच खोजें...' :
                       'Search diseases, medications, screenings...',
    filterBy: locale === 'pt' ? 'Filtrar por:' :
              locale === 'en' ? 'Filter by:' :
              locale === 'es' ? 'Filtrar por:' :
              locale === 'fr' ? 'Filtrer par:' :
              locale === 'ru' ? 'Фильтровать:' :
              locale === 'ar' ? 'تصفية حسب:' :
              locale === 'zh' ? '筛选:' :
              locale === 'el' ? 'Φιλτραρισμα:' :
              locale === 'hi' ? 'फ़िल्टर:' : 'Filter by:',
    all: locale === 'pt' ? 'Todos' :
         locale === 'en' ? 'All' :
         locale === 'es' ? 'Todos' :
         locale === 'fr' ? 'Tous' :
         locale === 'ru' ? 'Все' :
         locale === 'ar' ? 'الكل' :
         locale === 'zh' ? '全部' :
         locale === 'el' ? 'Ολα' :
         locale === 'hi' ? 'सभी' : 'All',
    diseases: locale === 'pt' ? 'Doencas' :
              locale === 'en' ? 'Diseases' :
              locale === 'es' ? 'Enfermedades' :
              locale === 'fr' ? 'Maladies' :
              locale === 'ru' ? 'Болезни' :
              locale === 'ar' ? 'الامراض' :
              locale === 'zh' ? '疾病' :
              locale === 'el' ? 'Νοσοι' :
              locale === 'hi' ? 'रोग' : 'Diseases',
    medications: locale === 'pt' ? 'Medicamentos' :
                 locale === 'en' ? 'Medications' :
                 locale === 'es' ? 'Medicamentos' :
                 locale === 'fr' ? 'Medicaments' :
                 locale === 'ru' ? 'Лекарства' :
                 locale === 'ar' ? 'الادوية' :
                 locale === 'zh' ? '药物' :
                 locale === 'el' ? 'Φαρμακα' :
                 locale === 'hi' ? 'दवाइयाँ' : 'Medications',
    screenings: locale === 'pt' ? 'Rastreamentos' :
                locale === 'en' ? 'Screenings' :
                locale === 'es' ? 'Tamizajes' :
                locale === 'fr' ? 'Depistages' :
                locale === 'ru' ? 'Скрининги' :
                locale === 'ar' ? 'الفحوصات' :
                locale === 'zh' ? '筛查' :
                locale === 'el' ? 'Διαλογες' :
                locale === 'hi' ? 'जाँच' : 'Screenings',
    clear: locale === 'pt' ? 'Limpar' :
           locale === 'en' ? 'Clear' :
           locale === 'es' ? 'Limpiar' :
           locale === 'fr' ? 'Effacer' :
           locale === 'ru' ? 'Очистить' :
           locale === 'ar' ? 'مسح' :
           locale === 'zh' ? '清除' :
           locale === 'el' ? 'Καθαρισμος' :
           locale === 'hi' ? 'साफ़ करें' : 'Clear',
    resultsFound: (count: number) => {
      if (locale === 'pt') return `${count} ${count === 1 ? 'resultado encontrado' : 'resultados encontrados'}`;
      if (locale === 'en') return `${count} ${count === 1 ? 'result found' : 'results found'}`;
      if (locale === 'es') return `${count} ${count === 1 ? 'resultado encontrado' : 'resultados encontrados'}`;
      if (locale === 'fr') return `${count} ${count === 1 ? 'resultat trouve' : 'resultats trouves'}`;
      if (locale === 'ru') return `${count} ${count === 1 ? 'результат' : 'результатов'}`;
      if (locale === 'ar') return `${count} نتيجة`;
      if (locale === 'zh') return `找到 ${count} 个结果`;
      if (locale === 'el') return `${count} αποτελεσματα`;
      if (locale === 'hi') return `${count} परिणाम`;
      return `${count} results found`;
    },
    forSearch: (term: string) => {
      if (locale === 'pt') return `para "${term}"`;
      if (locale === 'en') return `for "${term}"`;
      if (locale === 'es') return `para "${term}"`;
      if (locale === 'fr') return `pour "${term}"`;
      if (locale === 'ru') return `для "${term}"`;
      if (locale === 'ar') return `لـ "${term}"`;
      if (locale === 'zh') return `"${term}"`;
      if (locale === 'el') return `για "${term}"`;
      if (locale === 'hi') return `"${term}" के लिए`;
      return `for "${term}"`;
    },
    noResults: locale === 'pt' ? 'Nenhum resultado encontrado para sua busca.' :
               locale === 'en' ? 'No results found for your search.' :
               locale === 'es' ? 'No se encontraron resultados para su busqueda.' :
               locale === 'fr' ? 'Aucun resultat trouve pour votre recherche.' :
               locale === 'ru' ? 'По вашему запросу ничего не найдено.' :
               locale === 'ar' ? 'لم يتم العثور على نتائج.' :
               locale === 'zh' ? '未找到搜索结果。' :
               locale === 'el' ? 'Δεν βρεθηκαν αποτελεσματα.' :
               locale === 'hi' ? 'कोई परिणाम नहीं मिला।' : 'No results found.',
    trySearching: locale === 'pt' ? 'Tente buscar por nome da doenca, CIAP-2, CID-10, medicamento ou rastreamento.' :
                  locale === 'en' ? 'Try searching by disease name, ICPC-2, ICD-10, medication, or screening.' :
                  locale === 'es' ? 'Intente buscar por nombre de enfermedad, CIAP-2, CIE-10, medicamento o tamizaje.' :
                  locale === 'fr' ? 'Essayez de rechercher par nom de maladie, CISP-2, CIM-10, medicament ou depistage.' :
                  locale === 'ru' ? 'Попробуйте искать по названию болезни, ICPC-2, МКБ-10, лекарству или скринингу.' :
                  locale === 'ar' ? 'حاول البحث باسم المرض او الدواء او الفحص.' :
                  locale === 'zh' ? '尝试按疾病名称、ICPC-2、ICD-10、药物或筛查搜索。' :
                  locale === 'el' ? 'Δοκιμαστε αναζητηση με ονομα νοσου, ICPC-2, ICD-10, φαρμακο η διαλογη.' :
                  locale === 'hi' ? 'रोग का नाम, ICPC-2, ICD-10, दवा या जाँच से खोजें।' :
                  'Try searching by disease name, ICPC-2, ICD-10, medication, or screening.',
    clearAndRetry: locale === 'pt' ? 'Limpar filtros e tentar novamente' :
                   locale === 'en' ? 'Clear filters and try again' :
                   locale === 'es' ? 'Limpiar filtros e intentar de nuevo' :
                   locale === 'fr' ? 'Effacer les filtres et reessayer' :
                   locale === 'ru' ? 'Очистить фильтры и повторить' :
                   locale === 'ar' ? 'مسح الفلاتر والمحاولة مرة اخرى' :
                   locale === 'zh' ? '清除筛选条件并重试' :
                   locale === 'el' ? 'Καθαρισμος φιλτρων και επαναληψη' :
                   locale === 'hi' ? 'फ़िल्टर साफ़ करें और पुनः प्रयास करें' :
                   'Clear filters and try again',
    searchTips: locale === 'pt' ? 'Dicas de Busca' :
                locale === 'en' ? 'Search Tips' :
                locale === 'es' ? 'Consejos de Busqueda' :
                locale === 'fr' ? 'Conseils de Recherche' :
                locale === 'ru' ? 'Советы по поиску' :
                locale === 'ar' ? 'نصائح البحث' :
                locale === 'zh' ? '搜索提示' :
                locale === 'el' ? 'Συμβουλες Αναζητησης' :
                locale === 'hi' ? 'खोज सुझाव' : 'Search Tips',
    tipByCode: locale === 'pt' ? 'Por codigo: Digite "K86" (CIAP-2) ou "I10" (CID-10) para encontrar a doenca' :
               locale === 'en' ? 'By code: Enter "K86" (ICPC-2) or "I10" (ICD-10) to find the disease' :
               locale === 'es' ? 'Por codigo: Escriba "K86" (CIAP-2) o "I10" (CIE-10) para encontrar la enfermedad' :
               locale === 'fr' ? 'Par code: Entrez "K86" (CISP-2) ou "I10" (CIM-10) pour trouver la maladie' :
               locale === 'ru' ? 'По коду: Введите "K86" (ICPC-2) или "I10" (МКБ-10) чтобы найти болезнь' :
               locale === 'ar' ? 'حسب الرمز: ادخل "K86" (ICPC-2) او "I10" (ICD-10) للعثور على المرض' :
               locale === 'zh' ? '按代码：输入 "K86"（ICPC-2）或 "I10"（ICD-10）查找疾病' :
               locale === 'el' ? 'Κατα κωδικο: Εισαγετε "K86" (ICPC-2) η "I10" (ICD-10) για να βρειτε τη νοσο' :
               locale === 'hi' ? 'कोड से: "K86" (ICPC-2) या "I10" (ICD-10) दर्ज करें' :
               'By code: Enter "K86" (ICPC-2) or "I10" (ICD-10) to find the disease',
    tipByMedication: locale === 'pt' ? 'Por medicamento: Digite o nome generico (losartana) ou comercial (Cozaar)' :
                     locale === 'en' ? 'By medication: Enter the generic name (losartan) or brand name (Cozaar)' :
                     locale === 'es' ? 'Por medicamento: Escriba el nombre generico (losartan) o comercial (Cozaar)' :
                     locale === 'fr' ? 'Par medicament: Entrez le nom generique (losartan) ou commercial (Cozaar)' :
                     locale === 'ru' ? 'По лекарству: Введите генерическое (лозартан) или торговое название (Козаар)' :
                     locale === 'ar' ? 'حسب الدواء: ادخل الاسم العلمي او التجاري' :
                     locale === 'zh' ? '按药物：输入通用名（氯沙坦）或商品名（Cozaar）' :
                     locale === 'el' ? 'Κατα φαρμακο: Εισαγετε το γενοσημο η εμπορικο ονομα' :
                     locale === 'hi' ? 'दवा से: जेनेरिक नाम (losartan) या ब्रांड नाम (Cozaar) दर्ज करें' :
                     'By medication: Enter the generic name (losartan) or brand name (Cozaar)',
    tipByScreening: locale === 'pt' ? 'Por rastreamento: Digite a condicao (mama, prostata, pezinho)' :
                    locale === 'en' ? 'By screening: Enter the condition (breast, prostate, newborn)' :
                    locale === 'es' ? 'Por tamizaje: Escriba la condicion (mama, prostata, neonatal)' :
                    locale === 'fr' ? 'Par depistage: Entrez la condition (sein, prostate, neonatal)' :
                    locale === 'ru' ? 'По скринингу: Введите состояние (грудь, простата, новорожденный)' :
                    locale === 'ar' ? 'حسب الفحص: ادخل الحالة (ثدي، بروستاتا، حديثي الولادة)' :
                    locale === 'zh' ? '按筛查：输入病症（乳腺、前列腺、新生儿）' :
                    locale === 'el' ? 'Κατα διαλογη: Εισαγετε την κατασταση (μαστος, προστατης, νεογνο)' :
                    locale === 'hi' ? 'जाँच से: स्थिति दर्ज करें (स्तन, प्रोस्टेट, नवजात)' :
                    'By screening: Enter the condition (breast, prostate, newborn)',
    tipFuzzy: locale === 'pt' ? 'Busca fuzzy: Mesmo com erros de digitacao, a busca encontra resultados aproximados' :
              locale === 'en' ? 'Fuzzy search: Even with typos, the search finds approximate matches' :
              locale === 'es' ? 'Busqueda difusa: Incluso con errores de escritura, la busqueda encuentra coincidencias aproximadas' :
              locale === 'fr' ? 'Recherche floue: Meme avec des fautes de frappe, la recherche trouve des correspondances approximatives' :
              locale === 'ru' ? 'Нечеткий поиск: Даже с опечатками поиск находит приблизительные совпадения' :
              locale === 'ar' ? 'بحث غامض: حتى مع الاخطاء الاملائية، يجد البحث نتائج تقريبية' :
              locale === 'zh' ? '模糊搜索：即使有拼写错误，搜索也能找到近似匹配' :
              locale === 'el' ? 'Ασαφης αναζητηση: Ακομα και με τυπογραφικα λαθη, βρισκει κοντινα αποτελεσματα' :
              locale === 'hi' ? 'अस्पष्ट खोज: टाइपो के साथ भी, खोज अनुमानित मिलान खोजती है' :
              'Fuzzy search: Even with typos, the search finds approximate matches',
    loading: locale === 'pt' ? 'Carregando traducoes...' :
             locale === 'en' ? 'Loading translations...' :
             locale === 'es' ? 'Cargando traducciones...' :
             locale === 'fr' ? 'Chargement des traductions...' :
             locale === 'ru' ? 'Загрузка переводов...' :
             locale === 'ar' ? 'جاري تحميل الترجمات...' :
             locale === 'zh' ? '正在加载翻译...' :
             locale === 'el' ? 'Φορτωση μεταφρασεων...' :
             locale === 'hi' ? 'अनुवाद लोड हो रहे हैं...' : 'Loading translations...',
  };

  // Count diseases from the consolidated list
  const diseaseCount = allDoencas.length;

  return (
    <div className="space-y-6">
      {/* Loading indicator for translations */}
      {isLoadingDiseases && locale !== 'pt' && (
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          {labels.loading}
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={labels.searchPlaceholder}
          className="w-full pl-12 pr-4 py-4 border-2 border-neutral-300 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{labels.filterBy}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilters({ ...filters, type: 'all' })}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filters.type === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}
          >
            {labels.all} ({allItems.length})
          </button>
          <button
            onClick={() => setFilters({ ...filters, type: 'doenca' })}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              filters.type === 'doenca'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            {labels.diseases} ({diseaseCount})
          </button>
          <button
            onClick={() => setFilters({ ...filters, type: 'medicamento' })}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              filters.type === 'medicamento'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}
          >
            <Pill className="w-4 h-4" />
            {labels.medications} ({medicamentos.length})
          </button>
          <button
            onClick={() => setFilters({ ...filters, type: 'rastreamento' })}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              filters.type === 'rastreamento'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700'
            }`}
          >
            <Activity className="w-4 h-4" />
            {labels.screenings} ({rastreamentos.length})
          </button>
        </div>

        {(searchTerm || filters.type !== 'all') && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
            {labels.clear}
          </button>
        )}
      </div>

      {/* Results Counter */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        {labels.resultsFound(results.length)}
        {searchTerm && ` ${labels.forSearch(searchTerm)}`}
      </div>

      {/* Resultados */}
      <div className="space-y-4">
        {results.map((item) => (
          <Link
            key={`${item.type}-${item.id}`}
            href={item.path}
            className={`block bg-white dark:bg-neutral-900 border-l-4 ${getTypeBgColor(item.type)} border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl p-6 transition-all hover:shadow-lg`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getTypeIcon(item.type)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1 capitalize">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              {item.lastUpdate && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {item.lastUpdate}
                </span>
              )}
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {item.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badge.color}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </Link>
        ))}

        {results.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto mb-4 text-neutral-300 dark:text-neutral-700" />
            <p className="text-neutral-500 dark:text-neutral-400">
              {labels.noResults}
            </p>
            <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-2">
              {labels.trySearching}
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              {labels.clearAndRetry}
            </button>
          </div>
        )}
      </div>

      {/* Search Tips */}
      <div className="mt-8 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-6">
        <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-3">{labels.searchTips}</h3>
        <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
          <li>&#8226; {labels.tipByCode}</li>
          <li>&#8226; {labels.tipByMedication}</li>
          <li>&#8226; {labels.tipByScreening}</li>
          <li>&#8226; {labels.tipFuzzy}</li>
        </ul>
      </div>
    </div>
  );
}

function getCategoryInfo(category: string) {
  const categories: Record<string, { label: string; color: string }> = {
    neonatal: { label: 'Neonatal', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300' },
    infantil: { label: 'Infantil', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    adultos: { label: 'Adultos', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
    cancer: { label: 'Câncer', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    gestacao: { label: 'Gestação', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  };
  return categories[category] || { label: category, color: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300' };
}

function getConvergenceInfo(status: string) {
  const statuses: Record<string, { label: string; icon: string; color: string }> = {
    convergencia: { label: 'Convergência', icon: '🟢', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    parcial: { label: 'Parcial', icon: '🟡', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' },
    divergencia: { label: 'Divergência', icon: '🔴', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    em_disputa: { label: 'Em Disputa', icon: '🟣', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  };
  return statuses[status] || { label: status, icon: '⚪', color: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300' };
}
