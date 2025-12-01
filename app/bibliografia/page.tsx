import ReferenceList from '../components/Bibliography/ReferenceList';
import { BookMarked, Download } from 'lucide-react';

export default function BibliografiaPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center">
              <BookMarked className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                Bibliografia Completa
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Referências Validadas • Padrão Q1
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
            <Download className="w-5 h-5" />
            Exportar
          </button>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>Padrão Acadêmico Q1:</strong> Todas as referências incluem metadados completos 
            (autores, título, periódico, ano, DOI/URL). Documentos legais (portarias, leis) contêm 
            numeração oficial. Disponível para exportação em múltiplos formatos.
          </p>
        </div>
      </div>

      {/* Opções de Formato */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 text-sm font-medium transition-colors">
          Vancouver
        </button>
        <button className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm font-medium">
          ABNT
        </button>
        <div className="h-8 w-px bg-neutral-300 dark:bg-neutral-700 mx-2"></div>
        <button className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 text-sm font-medium transition-colors">
          EndNote
        </button>
        <button className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 text-sm font-medium transition-colors">
          BibTeX
        </button>
        <button className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 text-sm font-medium transition-colors">
          RIS
        </button>
      </div>

      {/* Lista de Referências */}
      <ReferenceList format="vancouver" />
    </div>
  );
}

