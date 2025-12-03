import Link from 'next/link';
import { ArrowRight, BookOpen, TrendingUp, Users, FileText, Baby, Users as UsersIcon, Activity, Heart, Stethoscope, FileSearch, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-900 mb-16">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-black/10" />

        <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32 max-w-7xl">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/30 shadow-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm lg:text-base font-bold text-white uppercase tracking-wider">
                Padrão Acadêmico Q1 • Dezembro 2025
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Rastreamentos Populacionais no SUS
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Análise sistêmica comparativa entre diretrizes do Sistema Único de Saúde e recomendações das Sociedades Médicas Brasileiras, com referências validadas no padrão Q1 acadêmico.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link
              href="/cancer"
              className="group px-8 py-4 bg-white hover:bg-neutral-50 text-blue-700 rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
            >
              Explorar Rastreamentos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/timeline"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-300 border-2 border-white/30"
            >
              Timeline 2025
            </Link>
          </div>

          {/* Stats Mini Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { value: '35+', label: 'Rastreamentos', icon: FileText },
              { value: '15+', label: 'Sociedades', icon: Users },
              { value: '100%', label: 'Validado', icon: BookOpen },
              { value: 'Q1', label: 'Padrão', icon: TrendingUp }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-5 border-2 border-white/20 text-center hover:bg-white/20 transition-all duration-300">
                <stat.icon className="w-6 h-6 text-white mx-auto mb-2" strokeWidth={2.5} />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/80 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl pb-20">
        {/* Categories Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
              Categorias de Rastreamento
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Explore rastreamentos organizados por ciclo de vida e condições de saúde
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.path}
                  href={category.path}
                  className="group relative overflow-hidden rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] p-8"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${category.shadow} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
                      {category.title}
                    </h3>
                    <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                      {category.description}
                    </p>

                    {/* Link */}
                    <div className={`flex items-center gap-2 text-base font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                      Ver detalhes
                      <ArrowRight className={`w-5 h-5 ${category.color} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 p-12">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="relative">
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 text-center">
              Recursos da Plataforma
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 text-center mb-12 max-w-2xl mx-auto">
              Ferramentas avançadas para médicos de família e residentes de MFC
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="group bg-white dark:bg-neutral-800 rounded-2xl p-8 border-2 border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
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
    description: 'Teste do pezinho, orelhinha, olhinho, coraçãozinho e linguinha com PNTN ampliado',
    path: '/neonatal',
    icon: Baby,
    gradient: 'from-pink-600 to-rose-700',
    shadow: 'shadow-pink-600/30',
    color: 'text-pink-700 dark:text-pink-400',
  },
  {
    title: 'Saúde Infantil',
    description: 'TEA (M-CHAT-R), desenvolvimento neuropsicomotor, anemia ferropriva e visão',
    path: '/infantil',
    icon: UsersIcon,
    gradient: 'from-blue-600 to-indigo-700',
    shadow: 'shadow-blue-600/30',
    color: 'text-blue-700 dark:text-blue-400',
  },
  {
    title: 'Adultos (DCNTs)',
    description: 'HAS, DM2, dislipidemias, hepatites virais, retinopatia e pé diabético',
    path: '/adultos',
    icon: Activity,
    gradient: 'from-emerald-600 to-teal-700',
    shadow: 'shadow-emerald-600/30',
    color: 'text-emerald-700 dark:text-emerald-400',
  },
  {
    title: 'Câncer',
    description: 'Mama (40-69a), colo do útero (HPV-DNA), próstata e colorretal',
    path: '/cancer',
    icon: Heart,
    gradient: 'from-red-600 to-rose-700',
    shadow: 'shadow-red-600/30',
    color: 'text-red-700 dark:text-red-400',
  },
  {
    title: 'Gestação (Pré-natal)',
    description: 'Sífilis, HIV, hepatites B/C, GBS, diabetes gestacional e anemia',
    path: '/gestacao',
    icon: Stethoscope,
    gradient: 'from-purple-600 to-violet-700',
    shadow: 'shadow-purple-600/30',
    color: 'text-purple-700 dark:text-purple-400',
  },
  {
    title: 'Timeline 2025',
    description: 'Eventos disruptivos e mudanças paradigmáticas nos rastreamentos',
    path: '/timeline',
    icon: Calendar,
    gradient: 'from-amber-600 to-orange-700',
    shadow: 'shadow-amber-600/30',
    color: 'text-amber-700 dark:text-amber-400',
  },
];

const features = [
  {
    title: 'Sistema de Referências Q1',
    description: 'Todas as afirmações com citações inline validadas, bibliografia completa ABNT/Vancouver e DOI verificados',
    icon: BookOpen,
    gradient: 'from-blue-600 to-cyan-700',
    shadow: 'shadow-blue-600/30',
  },
  {
    title: 'Comparação SUS vs Sociedades',
    description: 'Visualização lado a lado das recomendações com análise detalhada de convergências, divergências e disputas',
    icon: Users,
    gradient: 'from-emerald-600 to-teal-700',
    shadow: 'shadow-emerald-600/30',
  },
  {
    title: 'Análise Crítica Sistêmica',
    description: 'Insights de segunda e terceira ordem sobre desafios operacionais, controvérsias e implicações sistêmicas',
    icon: TrendingUp,
    gradient: 'from-purple-600 to-violet-700',
    shadow: 'shadow-purple-600/30',
  },
  {
    title: 'Busca Avançada Integrada',
    description: 'Sistema de busca por patologia, faixa etária, sociedade médica e nível de evidência científica',
    icon: FileSearch,
    gradient: 'from-amber-600 to-orange-700',
    shadow: 'shadow-amber-600/30',
  },
];
