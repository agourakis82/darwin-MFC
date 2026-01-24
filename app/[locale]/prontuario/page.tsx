import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import SOAPExport from '@/app/components/Export/SOAPExport';
import { PageContainer } from '@/app/components/Layout/Containers';

export const metadata: Metadata = {
  title: 'Gerador de Nota SOAP | Darwin-MFC',
  description: 'Gere notas de evolução estruturadas no formato SOAP para prontuário eletrônico',
};

export default function ProntuarioPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageContainer className="py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 mb-4 inline-block"
          >
            ← Início
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Gerador de Nota SOAP
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            Crie notas de evolução estruturadas no formato SOAP (Subjetivo, Objetivo, Avaliação, Plano) 
            para colar diretamente no prontuário eletrônico.
          </p>
        </div>

        {/* SOAP Export Component */}
        <SOAPExport />

        {/* Info Cards */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="text-2xl mb-2">📝</div>
            <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-1">Subjetivo</h3>
            <p className="text-xs text-blue-600 dark:text-blue-300">
              Queixa principal, HDA, antecedentes relevantes, história familiar e social.
            </p>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800">
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-1">Objetivo</h3>
            <p className="text-xs text-purple-600 dark:text-purple-300">
              Sinais vitais, exame físico, resultados de exames complementares.
            </p>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-xl border border-amber-200 dark:border-amber-800">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-1">Avaliação</h3>
            <p className="text-xs text-amber-600 dark:text-amber-300">
              Hipóteses diagnósticas, códigos CIAP-2/CID-10, estratificação de risco.
            </p>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
            <div className="text-2xl mb-2">💊</div>
            <h3 className="font-bold text-green-800 dark:text-green-200 mb-1">Plano</h3>
            <p className="text-xs text-green-600 dark:text-green-300">
              Orientações, prescrições, exames solicitados, encaminhamentos e retorno.
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-2xl border border-emerald-200 dark:border-emerald-800">
          <h3 className="font-bold text-emerald-800 dark:text-emerald-200 mb-3">
            💡 Dicas para uma boa nota SOAP
          </h3>
          <ul className="text-sm text-emerald-700 dark:text-emerald-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-0.5">✓</span>
              <span><strong>S:</strong> Documente a queixa nas palavras do paciente, cronologia dos sintomas e fatores de piora/melhora.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">✓</span>
              <span><strong>O:</strong> Registre apenas achados relevantes do exame físico. Inclua sempre os sinais vitais.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">✓</span>
              <span><strong>A:</strong> Liste hipóteses em ordem de probabilidade. Use códigos CIAP-2 para APS.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">✓</span>
              <span><strong>P:</strong> Seja específico nas prescrições (dose, frequência, duração). Documente orientações dadas.</span>
            </li>
          </ul>
        </div>

        {/* Links Relacionados */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/doencas"
            className="px-4 py-2 bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 rounded-lg hover:bg-rose-200 dark:hover:bg-rose-800 transition-colors"
          >
            🩺 Doenças da APS
          </Link>
          <Link
            href="/medicamentos"
            className="px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 rounded-lg hover:bg-cyan-200 dark:hover:bg-cyan-800 transition-colors"
          >
            💊 Bulário RENAME
          </Link>
          <Link
            href="/protocolos"
            className="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
          >
            📋 Protocolos
          </Link>
          <Link
            href="/calculadoras"
            className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
          >
            🧮 Calculadoras
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}

