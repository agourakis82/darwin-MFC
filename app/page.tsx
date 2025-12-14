import Link from 'next/link';
import { ArrowRight, BookOpen, TrendingUp, Users, FileText, Baby, Users as UsersIcon, Activity, Heart, Stethoscope, FileSearch, Calendar, Pill, Shield, Calculator, Brain } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-900 mb-16">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-black/10" />

        <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-28 max-w-7xl">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/30 shadow-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm lg:text-base font-bold text-white uppercase tracking-wider">
                Guia Completo MFC • Dezembro 2025
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Darwin MFC
            </h1>
            <p className="text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium mb-4">
              Guia de Medicina de Família e Comunidade
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Doenças, medicamentos, protocolos e rastreamentos para consulta point-of-care na Atenção Primária à Saúde
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link
              href="/doencas"
              className="group px-8 py-4 bg-white hover:bg-neutral-50 text-emerald-700 rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              Explorar Doenças
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/medicamentos"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-300 border-2 border-white/30"
            >
              <Pill className="w-5 h-5" />
              Bulário RENAME
            </Link>
          </div>

          {/* Stats Mini Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { value: '30+', label: 'Doenças', icon: BookOpen },
              { value: '50+', label: 'Medicamentos', icon: Pill },
              { value: '35+', label: 'Rastreamentos', icon: FileText },
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
        {/* Quick Access - NEW */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
              Acesso Rápido
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Ferramentas essenciais para sua consulta
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccess.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="group relative overflow-hidden rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] p-6"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative flex flex-col items-center text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                      {item.description}
                    </p>
                    {item.badge && (
                      <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
              Rastreamentos SUS
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Comparação SUS vs Sociedades por ciclo de vida
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

const quickAccess = [
  {
    title: 'Doenças da APS',
    description: 'QuickView + Versão Completa',
    path: '/doencas',
    icon: BookOpen,
    gradient: 'from-blue-600 to-indigo-700',
    shadow: 'shadow-blue-600/30',
    badge: 'Novo',
  },
  {
    title: 'Bulário RENAME',
    description: 'Posologia e interações',
    path: '/medicamentos',
    icon: Pill,
    gradient: 'from-emerald-600 to-teal-700',
    shadow: 'shadow-emerald-600/30',
    badge: 'Novo',
  },
  {
    title: 'Protocolos',
    description: 'Algoritmos de conduta',
    path: '/protocolos',
    icon: FileText,
    gradient: 'from-purple-600 to-violet-700',
    shadow: 'shadow-purple-600/30',
    badge: 'Novo',
  },
  {
    title: 'Calculadoras',
    description: 'IMC, CKD-EPI, PHQ-9...',
    path: '/calculadoras',
    icon: Calculator,
    gradient: 'from-amber-600 to-orange-700',
    shadow: 'shadow-amber-600/30',
  },
];

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
    title: 'SUS e APS',
    description: 'Princípios, PNAB 2017, atributos da APS (Starfield) e organização do SUS',
    path: '/sus',
    icon: Shield,
    gradient: 'from-green-600 to-emerald-700',
    shadow: 'shadow-green-600/30',
    color: 'text-green-700 dark:text-green-400',
  },
];

const features = [
  {
    title: 'QuickView Point-of-Care',
    description: 'Resumo de 1 tela para consulta rápida: definição, critérios diagnósticos, tratamento e red flags',
    icon: Brain,
    gradient: 'from-blue-600 to-cyan-700',
    shadow: 'shadow-blue-600/30',
  },
  {
    title: 'Codificação CIAP-2/CID-10',
    description: 'Todas as doenças com códigos CIAP-2 e CID-10 para registro adequado no prontuário eletrônico',
    icon: FileText,
    gradient: 'from-emerald-600 to-teal-700',
    shadow: 'shadow-emerald-600/30',
  },
  {
    title: 'Bulário com Interações',
    description: 'Medicamentos RENAME com posologia, ajuste renal (CKD-EPI), segurança na gestação e interações',
    icon: Pill,
    gradient: 'from-purple-600 to-violet-700',
    shadow: 'shadow-purple-600/30',
  },
  {
    title: 'Comparação SUS vs Sociedades',
    description: 'Visualização lado a lado das recomendações com análise de convergências, divergências e disputas',
    icon: Users,
    gradient: 'from-amber-600 to-orange-700',
    shadow: 'shadow-amber-600/30',
  },
];
