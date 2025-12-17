'use client';

import { useState } from 'react';
import { Check, CheckCircle2, Circle, FileText, Stethoscope, Microscope, ClipboardList, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { ChecklistConsulta, ChecklistItem, ChecklistProgress, ChecklistResposta } from '@/lib/types/checklist';

interface ChecklistConsultaProps {
  checklist: ChecklistConsulta;
  onComplete?: (progress: ChecklistProgress) => void;
  initialProgress?: ChecklistProgress;
}

const categoriaIcons = {
  anamnese: FileText,
  exame_fisico: Stethoscope,
  exames_complementares: Microscope,
  diagnostico: ClipboardList,
  tratamento: BookOpen,
  orientacoes: AlertCircle,
  encaminhamento: ArrowRight,
  prevencao: CheckCircle2,
};

const categoriaLabels = {
  anamnese: 'Anamnese',
  exame_fisico: 'Exame Físico',
  exames_complementares: 'Exames Complementares',
  diagnostico: 'Diagnóstico',
  tratamento: 'Tratamento',
  orientacoes: 'Orientações',
  encaminhamento: 'Encaminhamento',
  prevencao: 'Prevenção',
};

export default function ChecklistConsultaComponent({ 
  checklist, 
  onComplete,
  initialProgress 
}: ChecklistConsultaProps) {
  const initialCompletados = initialProgress?.itensCompletados instanceof Set
    ? initialProgress.itensCompletados
    : initialProgress?.itensCompletados
      ? new Set(initialProgress.itensCompletados)
      : new Set<string>();
  
  const [completados, setCompletados] = useState<Set<string>>(initialCompletados);
  const [observacoes, setObservacoes] = useState<Record<string, string>>(
    initialProgress?.observacoes || {}
  );

  const handleToggleItem = (itemId: string) => {
    const newCompletados = new Set(completados);
    if (newCompletados.has(itemId)) {
      newCompletados.delete(itemId);
    } else {
      newCompletados.add(itemId);
    }
    setCompletados(newCompletados);

    // Auto-salvar progresso
    if (onComplete) {
      const progress: ChecklistProgress = {
        checklistId: checklist.id,
        itensCompletados: newCompletados,
        observacoes,
        dataPreenchimento: new Date(),
      };
      onComplete(progress);
    }
  };

  const handleObservacaoChange = (itemId: string, observacao: string) => {
    const newObservacoes = { ...observacoes, [itemId]: observacao };
    setObservacoes(newObservacoes);

    if (onComplete) {
      const progress: ChecklistProgress = {
        checklistId: checklist.id,
        itensCompletados: completados,
        observacoes: newObservacoes,
        dataPreenchimento: new Date(),
      };
      onComplete(progress);
    }
  };

  const itemsByCategory = checklist.itens.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = [];
    }
    acc[item.categoria].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  const totalItems = checklist.itens.length;
  const completedItems = completados.size;
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  const renderItem = (item: ChecklistItem, depth = 0) => {
    const isCompleted = completados.has(item.id);
    const Icon = isCompleted ? CheckCircle2 : Circle;
    const hasObservacao = observacoes[item.id]?.trim().length > 0;

    return (
      <div key={item.id} className={`${depth > 0 ? 'ml-8 mt-2' : ''}`}>
        <div className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
          isCompleted
            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700'
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
        }`}>
          <button
            onClick={() => handleToggleItem(item.id)}
            className={`flex-shrink-0 mt-0.5 transition-all ${
              isCompleted
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Icon className={`w-6 h-6 ${isCompleted ? 'fill-current' : ''}`} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className={`font-semibold mb-1 ${
                  isCompleted
                    ? 'text-emerald-900 dark:text-emerald-100 line-through'
                    : 'text-slate-900 dark:text-white'
                }`}>
                  {item.titulo}
                  {item.obrigatorio && (
                    <span className="ml-2 text-xs text-red-600 dark:text-red-400">*</span>
                  )}
                </h4>
                {item.descricao && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {item.descricao}
                  </p>
                )}
              </div>
            </div>
            
            {/* Observações */}
            <textarea
              placeholder="Adicionar observações..."
              value={observacoes[item.id] || ''}
              onChange={(e) => handleObservacaoChange(item.id, e.target.value)}
              className={`w-full mt-2 px-3 py-2 text-sm rounded-lg border resize-none ${
                hasObservacao
                  ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'
              } text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500`}
              rows={2}
            />
          </div>
        </div>

        {/* Subitens */}
        {item.subitens && item.subitens.length > 0 && (
          <div className="mt-2 space-y-2">
            {item.subitens.map(subitem => renderItem(subitem, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {checklist.titulo}
        </h2>
        {checklist.descricao && (
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {checklist.descricao}
          </p>
        )}

        {/* Progress */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Progresso
            </span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {completedItems} / {totalItems}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-emerald-600 to-teal-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist items by category */}
      <div className="space-y-6">
        {Object.entries(itemsByCategory).map(([categoria, items]) => {
          const Icon = categoriaIcons[categoria as keyof typeof categoriaIcons];
          const label = categoriaLabels[categoria as keyof typeof categoriaLabels];
          const categoryCompleted = items.filter(item => completados.has(item.id)).length;
          const categoryTotal = items.length;

          return (
            <div key={categoria} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {label}
                  </h3>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {categoryCompleted}/{categoryTotal}
                </div>
              </div>

              <div className="space-y-2">
                {items
                  .sort((a, b) => a.ordem - b.ordem)
                  .map(item => renderItem(item))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

