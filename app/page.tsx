import Link from 'next/link';
import { ArrowRight, BookOpen, TrendingUp, Users, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
          Padrão Acadêmico Q1 • Atualização Novembro 2025
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
          Rastreamentos Populacionais no SUS
        </h1>
        
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto">
          Análise sistêmica comparativa entre as diretrizes do Sistema Único de Saúde e recomendações das Sociedades Médicas Brasileiras, com sistema completo de referências validadas.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/cancer"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            Explorar Rastreamentos
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link
            href="/timeline"
            className="px-6 py-3 border-2 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          >
            Timeline 2025
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">20+</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Rastreamentos Mapeados</div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">15+</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Sociedades Médicas</div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">100%</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Referências Validadas</div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">2025</div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">Ano Disruptivo</div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Categorias de Rastreamento</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.path}
                href={category.path}
                className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl p-6 transition-all hover:shadow-lg"
              >
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-2xl`}>
                  <IconComponent />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  {category.description}
                </p>
                <div className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1">
                  Ver detalhes
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Features */}
      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-950/30 dark:to-emerald-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Recursos da Plataforma</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">Q1</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Sistema de Referências Q1</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Todas as afirmações com citações inline validadas e bibliografia completa
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Comparação SUS vs Sociedades</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Visualização lado a lado das recomendações com análise de convergências
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Análise Crítica Sistêmica</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Insights de segunda/terceira ordem sobre desafios operacionais e controvérsias
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Exportação e Impressão</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Geração de PDFs acadêmicos e exportação de dados estruturados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  {
    title: 'Triagem Neonatal',
    description: 'Teste do pezinho, orelhinha, olhinho, coraçãozinho e linguinha',
    path: '/neonatal',
    icon: () => '👶',
    color: 'bg-pink-600',
  },
  {
    title: 'Saúde Infantil',
    description: 'Autismo (TEA), desenvolvimento neuropsicomotor, anemia, visão',
    path: '/infantil',
    icon: () => '🧒',
    color: 'bg-blue-600',
  },
  {
    title: 'Adultos (DCNTs)',
    description: 'Hipertensão, diabetes, dislipidemias, obesidade, tabagismo',
    path: '/adultos',
    icon: () => '💪',
    color: 'bg-emerald-600',
  },
  {
    title: 'Câncer',
    description: 'Mama, colo do útero, próstata, colorretal',
    path: '/cancer',
    icon: () => '🎗️',
    color: 'bg-red-600',
  },
  {
    title: 'Gestação',
    description: 'Pré-natal: sífilis, HIV, hepatites, GBS, diabetes gestacional',
    path: '/gestacao',
    icon: () => '🤰',
    color: 'bg-purple-600',
  },
  {
    title: 'Timeline 2025',
    description: 'Eventos e mudanças paradigmáticas no ano da ruptura epistemológica',
    path: '/timeline',
    icon: () => '📅',
    color: 'bg-amber-600',
  },
];
