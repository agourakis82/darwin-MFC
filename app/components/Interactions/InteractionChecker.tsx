'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { AlertTriangle, X, Search, Plus, Shield, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { todosMedicamentos, searchMedicamentos, checkInteractions } from '@/lib/data/medicamentos/index';
import { Medicamento } from '@/lib/types/medicamento';

interface InteractionResult {
  med1: string;
  med2: string;
  gravidade: string;
  efeito: string;
  conduta: string;
}

interface InteractionCheckerProps {
  initialMeds?: string[];
  compact?: boolean;
  onMedsChange?: (meds: string[]) => void;
}

export default function InteractionChecker({
  initialMeds = [],
  compact = false,
  onMedsChange,
}: InteractionCheckerProps) {
  const [selectedMedIds, setSelectedMedIds] = useState<string[]>(initialMeds);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!compact);

  // Busca medicamentos
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return searchMedicamentos(searchTerm)
      .filter(m => !selectedMedIds.includes(m.id))
      .slice(0, 8);
  }, [searchTerm, selectedMedIds]);

  // Medicamentos selecionados
  const selectedMeds = useMemo(() => {
    return selectedMedIds
      .map(id => todosMedicamentos.find(m => m.id === id))
      .filter((m): m is Medicamento => m !== undefined);
  }, [selectedMedIds]);

  // Verifica interações
  const interactions = useMemo(() => {
    if (selectedMedIds.length < 2) return [];
    return checkInteractions(selectedMedIds);
  }, [selectedMedIds]);

  // Contagem por gravidade
  const interactionCounts = useMemo(() => {
    const counts = { grave: 0, moderada: 0, leve: 0 };
    interactions.forEach(int => {
      if (int.gravidade in counts) {
        counts[int.gravidade as keyof typeof counts]++;
      }
    });
    return counts;
  }, [interactions]);

  const addMedicamento = useCallback((med: Medicamento) => {
    const newMeds = [...selectedMedIds, med.id];
    setSelectedMedIds(newMeds);
    onMedsChange?.(newMeds);
    setSearchTerm('');
    setIsSearching(false);
  }, [selectedMedIds, onMedsChange]);

  const removeMedicamento = useCallback((medId: string) => {
    const newMeds = selectedMedIds.filter(id => id !== medId);
    setSelectedMedIds(newMeds);
    onMedsChange?.(newMeds);
  }, [selectedMedIds, onMedsChange]);

  const getGravidadeStyles = (gravidade: string) => {
    switch (gravidade) {
      case 'grave':
        return {
          bg: 'bg-red-50 dark:bg-red-950',
          border: 'border-red-300 dark:border-red-700',
          text: 'text-red-800 dark:text-red-200',
          badge: 'bg-red-500 text-white',
          icon: '🚨',
        };
      case 'moderada':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950',
          border: 'border-amber-300 dark:border-amber-700',
          text: 'text-amber-800 dark:text-amber-200',
          badge: 'bg-amber-500 text-white',
          icon: '⚠️',
        };
      case 'leve':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-950',
          border: 'border-yellow-300 dark:border-yellow-700',
          text: 'text-yellow-800 dark:text-yellow-200',
          badge: 'bg-yellow-500 text-white',
          icon: '💡',
        };
      default:
        return {
          bg: 'bg-slate-50 dark:bg-slate-900',
          border: 'border-slate-300 dark:border-slate-700',
          text: 'text-slate-800 dark:text-slate-200',
          badge: 'bg-slate-500 text-white',
          icon: 'ℹ️',
        };
    }
  };

  // Versão compacta (para usar em cards de medicamentos)
  if (compact && !isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" />
          <span className="font-medium text-slate-700 dark:text-slate-300">
            Verificar Interações
          </span>
          {selectedMedIds.length > 0 && (
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">
              {selectedMedIds.length} med{selectedMedIds.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <ChevronDown className="w-5 h-5 text-slate-400" />
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              Verificador de Interações
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Adicione medicamentos para verificar interações
            </p>
          </div>
        </div>
        {compact && (
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          >
            <ChevronUp className="w-5 h-5 text-slate-400" />
          </button>
        )}
      </div>

      {/* Medicamentos Selecionados */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-700">
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedMeds.map((med) => (
            <div
              key={med.id}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm"
            >
              <Link
                href={`/medicamentos/${med.id}`}
                className="hover:underline font-medium"
              >
                {med.nomeGenerico}
              </Link>
              <button
                onClick={() => removeMedicamento(med.id)}
                className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {selectedMeds.length === 0 && (
            <span className="text-sm text-slate-400 dark:text-slate-500">
              Nenhum medicamento selecionado
            </span>
          )}
        </div>

        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Adicionar medicamento..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsSearching(true);
            }}
            onFocus={() => setIsSearching(true)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Resultados da Busca */}
          {isSearching && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg max-h-48 overflow-y-auto">
              {searchResults.map((med) => (
                <button
                  key={med.id}
                  onClick={() => addMedicamento(med)}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700 last:border-0 transition-colors"
                >
                  <div className="font-medium text-sm text-slate-900 dark:text-white">
                    {med.nomeGenerico}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {med.classeTerapeutica}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Resultados das Interações */}
      <div className="p-4">
        {interactions.length === 0 ? (
          selectedMedIds.length >= 2 ? (
            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  Nenhuma interação conhecida
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Os medicamentos selecionados não apresentam interações registradas
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-slate-400">
              <Info className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                Selecione pelo menos 2 medicamentos para verificar interações
              </p>
            </div>
          )
        ) : (
          <div className="space-y-4">
            {/* Resumo */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {interactions.length} interação{interactions.length !== 1 ? 'ões' : ''} encontrada{interactions.length !== 1 ? 's' : ''}:
              </span>
              {interactionCounts.grave > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">
                  {interactionCounts.grave} grave{interactionCounts.grave !== 1 ? 's' : ''}
                </span>
              )}
              {interactionCounts.moderada > 0 && (
                <span className="px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full font-medium">
                  {interactionCounts.moderada} moderada{interactionCounts.moderada !== 1 ? 's' : ''}
                </span>
              )}
              {interactionCounts.leve > 0 && (
                <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs rounded-full font-medium">
                  {interactionCounts.leve} leve{interactionCounts.leve !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {/* Lista de Interações */}
            <div className="space-y-2">
              {/* Ordenar por gravidade: grave > moderada > leve */}
              {[...interactions]
                .sort((a, b) => {
                  const order = { grave: 0, moderada: 1, leve: 2 };
                  return (order[a.gravidade as keyof typeof order] ?? 3) - 
                         (order[b.gravidade as keyof typeof order] ?? 3);
                })
                .map((int, i) => {
                  const styles = getGravidadeStyles(int.gravidade);
                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border ${styles.bg} ${styles.border}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{styles.icon}</span>
                          <span className={`font-semibold text-sm ${styles.text}`}>
                            {int.med1} ↔ {int.med2}
                          </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${styles.badge}`}>
                          {int.gravidade}
                        </span>
                      </div>
                      <p className={`text-sm ${styles.text} mb-2`}>
                        <strong>Efeito:</strong> {int.efeito}
                      </p>
                      <p className={`text-xs ${styles.text} opacity-80`}>
                        <strong>Conduta:</strong> {int.conduta}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700">
        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Info className="w-3 h-3" />
          Baseado em interações registradas na literatura. Sempre consulte fontes adicionais.
        </p>
      </div>
    </div>
  );
}

