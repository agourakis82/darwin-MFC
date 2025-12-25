'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { caseSteps } from '@/lib/data/caso-clinico';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

// Direct imports - no lazy loading
import AuthorCredits from '@/app/components/Aula/AuthorCredits';
import CaseTimeline from '@/app/components/Aula/CaseTimeline';
import Genogram from '@/app/components/Aula/Genogram';
import Ecomap from '@/app/components/Aula/Ecomap';
import CaseStep from '@/app/components/Aula/CaseStep';

export default function AulaPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [highlightedMember, setHighlightedMember] = useState<string | undefined>();

  const currentStepData = caseSteps.find(s => s.id === currentStep);

  const handleMemberClick = (memberId: string) => {
    const step = caseSteps.find(s => s.memberId === memberId);
    if (step) {
      setCurrentStep(step.id);
    }
    setHighlightedMember(memberId);
    setTimeout(() => setHighlightedMember(undefined), 2000);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < caseSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleViewScreening = (screeningId: string) => {
    const screeningRoutes: Record<string, string> = {
      'cancer-mama': '/cancer#cancer-mama',
      'cancer-colo-utero': '/cancer#cancer-colo-utero',
      'cancer-prostata': '/cancer#cancer-prostata',
      'sifilis-gestacao': '/gestacao#sifilis',
      'hiv-gestacao': '/gestacao#hiv',
      'gbs': '/gestacao#gbs',
      'teste-pezinho': '/neonatal#teste-pezinho',
      'teste-orelhinha': '/neonatal#teste-orelhinha',
      'teste-olhinho': '/neonatal#teste-olhinho',
      'teste-coracaozinho': '/neonatal#teste-coracaozinho',
      'tea-mchat': '/infantil#tea',
      'has': '/adultos#has',
      'dm2': '/adultos#dm2',
    };

    const route = screeningRoutes[screeningId];
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section com Créditos */}
      <section className="px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <AuthorCredits />
        </div>
      </section>

      {/* Genograma e Ecomapa */}
      <section className="px-4 py-8 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Genograma */}
            <div className="card-premium">
              <Genogram
                onMemberClick={handleMemberClick}
                highlightedMember={highlightedMember}
              />
            </div>

            {/* Ecomapa */}
            <div className="card-premium">
              <Ecomap />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline de Navegação */}
      <section className="px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="card-premium">
            <CaseTimeline
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
          </div>
        </div>
      </section>

      {/* Conteúdo do Passo Atual */}
      <section className="px-4 py-8 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto">
          {currentStepData && (
            <CaseStep
              step={currentStepData}
              onViewScreening={handleViewScreening}
            />
          )}

          {/* Navegação entre passos */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`
                inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all
                ${currentStep === 1
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
                  : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700'
                }
              `}
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              Início
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStep === caseSteps.length}
              className={`
                inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all
                ${currentStep === caseSteps.length
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                }
              `}
            >
              Próximo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Resumo Final */}
      {currentStep === caseSteps.length && (
        <section className="px-4 py-12 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mb-6">
              <span className="text-3xl">🎉</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Caso Clínico Completo!
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-8 max-w-xl mx-auto">
              Você percorreu todos os rastreamentos indicados para a Família Silva,
              abordando as diferentes fases da vida: neonatal, infantil, adulto, gestação e idoso.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-xl font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              >
                Reiniciar Caso
              </button>
              <button
                onClick={() => router.push('/cancer')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Explorar Rastreamentos
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Cards de Navegação Rápida */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
            Explorar por Categoria
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Câncer', icon: '🎗️', path: '/cancer', color: 'from-red-500 to-pink-600' },
              { label: 'Gestação', icon: '🤰', path: '/gestacao', color: 'from-purple-500 to-pink-600' },
              { label: 'Neonatal', icon: '👶', path: '/neonatal', color: 'from-blue-500 to-cyan-600' },
              { label: 'Infantil', icon: '🧒', path: '/infantil', color: 'from-emerald-500 to-teal-600' },
              { label: 'Adultos', icon: '🧑', path: '/adultos', color: 'from-amber-500 to-orange-600' },
              { label: 'Análise', icon: '📊', path: '/analise', color: 'from-indigo-500 to-purple-600' },
              { label: 'Timeline', icon: '📅', path: '/timeline', color: 'from-slate-500 to-neutral-600' },
              { label: 'Bibliografia', icon: '📚', path: '/bibliografia', color: 'from-neutral-500 to-neutral-700' },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="group relative overflow-hidden rounded-xl p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all hover:shadow-lg"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {item.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
