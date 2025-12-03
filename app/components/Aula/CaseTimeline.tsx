'use client';

import { caseSteps, familyMembers } from '@/lib/data/caso-clinico';

interface CaseTimelineProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function CaseTimeline({ currentStep, onStepChange }: CaseTimelineProps) {
  const getMemberById = (id: string) => familyMembers.find(m => m.id === id);

  const getGenderEmoji = (gender: string) => {
    switch (gender) {
      case 'male': return '👨';
      case 'female': return '👩';
      default: return '👶';
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl blur-lg opacity-50" />
          <div className="relative w-12 h-12 rounded-2xl gradient-apple-orange flex items-center justify-center shadow-lg">
            <span className="text-xl">📋</span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Navegação do Caso
          </h3>
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
            Clique em cada membro para ver os rastreamentos indicados
          </p>
        </div>
      </div>

      {/* Timeline horizontal */}
      <div className="relative">
        {/* Linha conectora */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-700 -translate-y-1/2 rounded-full" />

        {/* Linha de progresso */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 -translate-y-1/2 transition-all duration-500 rounded-full"
          style={{ width: `${((currentStep - 1) / (caseSteps.length - 1)) * 100}%` }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {caseSteps.map((step) => {
            const member = getMemberById(step.memberId);
            const isActive = currentStep === step.id;
            const isPast = currentStep > step.id;

            return (
              <button
                key={step.id}
                onClick={() => onStepChange(step.id)}
                className={`
                  relative flex flex-col items-center gap-2 p-2 rounded-xl transition-all duration-300
                  ${isActive ? 'scale-110' : 'hover:scale-105'}
                `}
              >
                {/* Círculo do step */}
                <div
                  className={`
                    w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl
                    border-3 transition-all duration-300 shadow-lg
                    ${isActive
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-white dark:border-neutral-800 scale-110'
                      : isPast
                        ? 'bg-emerald-500 border-emerald-400'
                        : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600'
                    }
                  `}
                >
                  {isPast && !isActive ? (
                    <span className="text-white font-bold">✓</span>
                  ) : (
                    <span>{member ? getGenderEmoji(member.gender) : '👤'}</span>
                  )}
                </div>

                {/* Nome e idade */}
                <div className="text-center">
                  <p className={`
                    text-xs md:text-sm font-bold transition-colors
                    ${isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-neutral-900 dark:text-white'
                    }
                  `}>
                    {step.title.split(' ')[0]}
                  </p>
                  <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                    {member?.age}a
                  </p>
                </div>

                {/* Indicador ativo */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Info do passo atual */}
      <div className="mt-6 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm">
          <span className="font-semibold text-neutral-700 dark:text-neutral-300">Passo {currentStep} de {caseSteps.length}</span>
          <span className="text-neutral-400">•</span>
          <span className="font-bold text-neutral-900 dark:text-white">
            {caseSteps.find(s => s.id === currentStep)?.title}
          </span>
        </span>
      </div>
    </div>
  );
}
