import { Metadata } from 'next';
import Link from 'next/link';
import InteractionChecker from '@/app/components/Interactions/InteractionChecker';

export const metadata: Metadata = {
  title: 'Verificador de Interações Medicamentosas | Darwin-MFC',
  description: 'Verifique interações entre medicamentos - alertas automáticos de gravidade e conduta',
};

export default function InteracoesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/medicamentos"
            className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 mb-4 inline-block"
          >
            ← Bulário RENAME
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Verificador de Interações Medicamentosas
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Selecione os medicamentos que o paciente está usando para verificar possíveis interações
          </p>
        </div>

        {/* Interaction Checker Component */}
        <InteractionChecker />

        {/* Informações Adicionais */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-xl border border-red-200 dark:border-red-800">
            <h3 className="font-bold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              🚨 Interações Graves
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300">
              Podem causar danos significativos ao paciente. Geralmente contraindicadas ou requerem monitorização intensiva.
            </p>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-xl border border-amber-200 dark:border-amber-800">
            <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
              ⚠️ Interações Moderadas
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Podem necessitar ajuste de dose, monitorização ou precauções especiais. Avaliar risco-benefício.
            </p>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
              💡 Interações Leves
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Geralmente de pouca significância clínica. Podem requerer apenas orientação ao paciente.
            </p>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
              ✅ Sem Interações
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              Não foram encontradas interações conhecidas entre os medicamentos selecionados na base de dados.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-2">
            ⚕️ Aviso Importante
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Este verificador é uma ferramenta de apoio à decisão clínica. As interações apresentadas são baseadas 
            em literatura científica e podem não ser exaustivas. Sempre consulte fontes adicionais (UpToDate, 
            Micromedex, bulas oficiais) e considere o contexto clínico individual do paciente. A ausência de 
            interações listadas não garante segurança absoluta.
          </p>
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/medicamentos/comparador"
            className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center gap-2"
          >
            ↔️ Comparador de Medicamentos
          </Link>
          <Link
            href="/medicamentos"
            className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            💊 Bulário RENAME
          </Link>
        </div>
      </div>
    </div>
  );
}

