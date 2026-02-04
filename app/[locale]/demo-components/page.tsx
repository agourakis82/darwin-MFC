'use client';

import { StatusIndicator, StatusDot, EvidenceGradeBadge } from '@/app/components/ui/StatusIndicator';

/**
 * Demo: Clinical-Grade Typography
 *
 * Based on research:
 * - Minimum 16px body text (Health.gov)
 * - Sans-serif for digital readability
 * - High contrast for quick scanning
 * - Bold for urgency/alerts
 * - Clear hierarchy for stressed users
 */
export default function DemoComponentsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-neutral-950">
      <article className="max-w-3xl mx-auto px-6 py-10">

        {/* Hero - Large, scannable */}
        <header className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-8 mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 mb-4">
            Monografia
          </span>

          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
            Losartana
          </h1>

          <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
            Antagonista do receptor AT1 • Anti-hipertensivo
          </p>

          {/* Trust - Scannable at glance */}
          <div className="flex flex-wrap gap-4 text-base text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Revisado Dez 2024
            </span>
            <span className="flex items-center gap-2">
              <EvidenceGradeBadge grade="A" />
              Evidência Alta
            </span>
          </div>
        </header>

        {/* CRITICAL ALERT - Unmissable */}
        <section className="bg-red-600 text-white rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">
                CONTRAINDICADO NA GESTAÇÃO
              </h2>
              <p className="text-lg leading-relaxed opacity-95">
                Categoria D FDA. Risco de malformação fetal. Suspender imediatamente se gravidez confirmada.
              </p>
            </div>
          </div>
        </section>

        {/* Key Points - Large, scannable bullets */}
        <section className="bg-teal-50 dark:bg-teal-950/40 rounded-2xl p-6 mb-8 border-2 border-teal-200 dark:border-teal-800">
          <h2 className="text-lg font-bold text-teal-800 dark:text-teal-200 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            PONTOS-CHAVE
          </h2>
          <ul className="space-y-3 text-base text-neutral-800 dark:text-neutral-200">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-600 mt-2.5 flex-shrink-0" />
              <span>BRA (bloqueador do receptor de angiotensina)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-600 mt-2.5 flex-shrink-0" />
              <span><strong>1ª linha</strong> para hipertensão + proteção renal</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-2.5 flex-shrink-0" />
              <span><strong className="text-red-600 dark:text-red-400">Contraindicado</strong> na gestação (Cat D)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-600 mt-2.5 flex-shrink-0" />
              <span><strong>SUS:</strong> comprimido 50mg disponível</span>
            </li>
          </ul>
        </section>

        {/* Dosing - Quick reference card */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 border-l-4 border-teal-500 pl-4">
            Posologia
          </h2>

          <div className="grid gap-4">
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4">
              <div className="text-base font-semibold text-neutral-900 dark:text-white mb-1">
                Hipertensão
              </div>
              <div className="text-lg text-teal-700 dark:text-teal-300 font-medium">
                50mg 1x/dia → máx 100mg/dia
              </div>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4">
              <div className="text-base font-semibold text-neutral-900 dark:text-white mb-1">
                Nefropatia diabética
              </div>
              <div className="text-lg text-teal-700 dark:text-teal-300 font-medium">
                50mg 1x/dia → titular até 100mg
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
              <div className="text-base font-semibold text-amber-800 dark:text-amber-200 mb-1">
                ⚠️ Ajuste renal
              </div>
              <div className="text-base text-amber-700 dark:text-amber-300">
                ClCr &lt; 30: iniciar com 25mg
              </div>
            </div>
          </div>
        </section>

        {/* Convergence - Clear status */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 border-l-4 border-teal-500 pl-4">
            SUS vs Sociedades
          </h2>

          <div className="space-y-3">
            {[
              { label: 'Hipertensão 1ª linha', status: 'convergencia' as const },
              { label: 'Nefropatia diabética', status: 'convergencia' as const },
              { label: 'IC 1ª escolha', status: 'parcial' as const },
              { label: 'Pós-IAM sem IC', status: 'divergencia' as const },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 px-5 rounded-xl bg-neutral-50 dark:bg-neutral-800"
              >
                <span className="text-base font-medium text-neutral-800 dark:text-neutral-200">
                  {item.label}
                </span>
                <StatusIndicator status={item.status} size="md" />
              </div>
            ))}
          </div>
        </section>

        {/* Interactions - Color-coded severity */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 border-l-4 border-teal-500 pl-4">
            Interações
          </h2>

          <div className="space-y-4">
            {/* GRAVE */}
            <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border-l-4 border-red-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-neutral-900 dark:text-white">
                  IECA
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-red-600 text-white">
                  GRAVE
                </span>
              </div>
              <p className="text-base text-neutral-700 dark:text-neutral-300">
                Duplo bloqueio SRAA → hiperpotassemia + IRA
              </p>
              <p className="text-base font-semibold text-red-700 dark:text-red-400 mt-2">
                ⛔ EVITAR ASSOCIAÇÃO
              </p>
            </div>

            {/* MODERADA */}
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-5 border-l-4 border-amber-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-neutral-900 dark:text-white">
                  AINEs
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-amber-500 text-white">
                  MODERADA
                </span>
              </div>
              <p className="text-base text-neutral-700 dark:text-neutral-300">
                ↓ efeito anti-hipertensivo + risco IRA
              </p>
              <p className="text-base font-semibold text-amber-700 dark:text-amber-400 mt-2">
                ⚠️ Evitar uso crônico
              </p>
            </div>

            {/* LEVE */}
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-neutral-900 dark:text-white">
                  Antiácidos
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-500 text-white">
                  LEVE
                </span>
              </div>
              <p className="text-base text-neutral-700 dark:text-neutral-300">
                ↓ absorção (leve)
              </p>
              <p className="text-base text-blue-700 dark:text-blue-400 mt-2">
                Separar 2h
              </p>
            </div>
          </div>
        </section>

        {/* Monitoring - Quick checklist */}
        <section className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-6 mb-6 border-2 border-amber-200 dark:border-amber-800">
          <h2 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            MONITORAR
          </h2>
          <ul className="space-y-2 text-base text-amber-900 dark:text-amber-100">
            <li className="flex items-center gap-3">
              <span className="w-5 h-5 rounded border-2 border-amber-400 flex-shrink-0" />
              Creatinina + K⁺ em 1-2 semanas
            </li>
            <li className="flex items-center gap-3">
              <span className="w-5 h-5 rounded border-2 border-amber-400 flex-shrink-0" />
              PA em pé (hipotensão postural)
            </li>
            <li className="flex items-center gap-3">
              <span className="w-5 h-5 rounded border-2 border-amber-400 flex-shrink-0" />
              Sintomas de angioedema
            </li>
          </ul>
        </section>

        {/* Bottom Line - High contrast, memorable */}
        <section className="bg-emerald-600 text-white rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">RESUMO</h2>
              <p className="text-lg leading-relaxed">
                1ª linha para HAS. Seguro. <strong>Proibido na gestação.</strong> Checar K⁺ e creatinina.
              </p>
            </div>
          </div>
        </section>

        {/* References */}
        <footer className="text-sm text-neutral-500 dark:text-neutral-400 space-y-1">
          <p className="font-medium">Referências:</p>
          <p>1. Diretrizes Brasileiras de Hipertensão 2020</p>
          <p>2. ACC/AHA Guidelines 2017</p>
          <p className="pt-4 text-center text-xs">
            Darwin MFC • Conteúdo revisado por especialistas
          </p>
        </footer>

      </article>
    </div>
  );
}
