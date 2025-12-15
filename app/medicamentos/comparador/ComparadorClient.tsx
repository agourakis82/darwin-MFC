'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, Plus, AlertTriangle, Check, ArrowLeftRight, Pill, Heart, Baby, Stethoscope } from 'lucide-react';
import { todosMedicamentos, searchMedicamentos, checkInteractions } from '@/lib/data/medicamentos/index';
import { Medicamento, Interacao } from '@/lib/types/medicamento';

interface SelectedMed {
  medicamento: Medicamento;
  slot: number;
}

export default function ComparadorClient() {
  const [selectedMeds, setSelectedMeds] = useState<SelectedMed[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  // Busca medicamentos
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return searchMedicamentos(searchTerm).slice(0, 10);
  }, [searchTerm]);

  // Verifica interações entre os medicamentos selecionados
  const interactions = useMemo(() => {
    if (selectedMeds.length < 2) return [];
    const medIds = selectedMeds.map(s => s.medicamento.id);
    const results = checkInteractions(medIds);
    return results.map(int => ({
      med1: int.med1,
      med2: int.med2,
      interaction: {
        medicamento: int.med2,
        gravidade: int.gravidade as 'grave' | 'moderada' | 'leve',
        efeito: int.efeito,
        conduta: int.conduta,
      },
    }));
  }, [selectedMeds]);

  const addMedicamento = (med: Medicamento) => {
    if (activeSlot !== null && selectedMeds.length < 4) {
      const existing = selectedMeds.find(s => s.slot === activeSlot);
      if (existing) {
        setSelectedMeds(prev => prev.map(s => 
          s.slot === activeSlot ? { medicamento: med, slot: activeSlot } : s
        ));
      } else {
        setSelectedMeds(prev => [...prev, { medicamento: med, slot: activeSlot }]);
      }
      setSearchTerm('');
      setActiveSlot(null);
    }
  };

  const removeMedicamento = (slot: number) => {
    setSelectedMeds(prev => prev.filter(s => s.slot !== slot));
  };

  const getGravidadeColor = (gravidade: string) => {
    switch (gravidade) {
      case 'grave': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-300';
      case 'moderada': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-300';
      case 'leve': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200 border-slate-300';
    }
  };

  const getGestacaoColor = (categoria: string | undefined) => {
    switch (categoria) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-amber-100 text-amber-800';
      case 'D': return 'bg-orange-100 text-orange-800';
      case 'X': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getMedInSlot = (slot: number) => selectedMeds.find(s => s.slot === slot);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/medicamentos"
            className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            ← Bulário
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <ArrowLeftRight className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Comparador de Medicamentos
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Compare até 4 medicamentos lado a lado
              </p>
            </div>
          </div>
        </div>

        {/* Alertas de Interações */}
        {interactions.length > 0 && (
          <div className="mb-6 space-y-2">
            <h2 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Interações Detectadas ({interactions.length})
            </h2>
            <div className="space-y-2">
              {interactions.map((int, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border ${getGravidadeColor(int.interaction.gravidade)}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">
                      {int.med1} ↔ {int.med2}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/50 font-medium uppercase">
                      {int.interaction.gravidade}
                    </span>
                  </div>
                  <p className="text-sm">{int.interaction.efeito}</p>
                  <p className="text-xs mt-1 opacity-80">
                    <strong>Conduta:</strong> {int.interaction.conduta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Slots de Seleção */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((slot) => {
            const medInSlot = getMedInSlot(slot);
            const isActive = activeSlot === slot;

            return (
              <div
                key={slot}
                className={`relative rounded-xl border-2 transition-all ${
                  medInSlot
                    ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    : isActive
                    ? 'bg-purple-50 dark:bg-purple-950 border-purple-400 dark:border-purple-600'
                    : 'bg-slate-100 dark:bg-slate-900 border-dashed border-slate-300 dark:border-slate-700 hover:border-purple-400 cursor-pointer'
                }`}
                onClick={() => !medInSlot && setActiveSlot(slot)}
              >
                {medInSlot ? (
                  <div className="p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeMedicamento(slot);
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                      <Pill className="w-5 h-5 text-purple-500" />
                      <h3 className="font-bold text-slate-900 dark:text-white truncate">
                        {medInSlot.medicamento.nomeGenerico}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                      {medInSlot.medicamento.classeTerapeutica}
                    </p>
                    {medInSlot.medicamento.rename && (
                      <span className="inline-block px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">
                        RENAME
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="p-8 flex flex-col items-center justify-center text-slate-400">
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="text-sm">
                      {isActive ? 'Selecione abaixo' : 'Adicionar medicamento'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Barra de Busca */}
        {activeSlot !== null && (
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar medicamento para adicionar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-purple-300 dark:border-purple-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => setActiveSlot(null)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Resultados da Busca */}
            {searchResults.length > 0 && (
              <div className="mt-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg max-h-64 overflow-y-auto">
                {searchResults.map((med) => (
                  <button
                    key={med.id}
                    onClick={() => addMedicamento(med)}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700 last:border-0 transition-colors"
                  >
                    <div className="font-medium text-slate-900 dark:text-white">
                      {med.nomeGenerico}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {med.classeTerapeutica} {med.rename && '• RENAME'}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tabela Comparativa */}
        {selectedMeds.length >= 2 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 w-40">
                      Atributo
                    </th>
                    {selectedMeds.map(({ medicamento }) => (
                      <th
                        key={medicamento.id}
                        className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white"
                      >
                        <Link
                          href={`/medicamentos/${medicamento.id}`}
                          className="hover:text-purple-600 dark:hover:text-purple-400"
                        >
                          {medicamento.nomeGenerico}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {/* Classe Terapêutica */}
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      Classe
                    </td>
                    {selectedMeds.map(({ medicamento }) => (
                      <td key={medicamento.id} className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                        {medicamento.classeTerapeutica}
                        {medicamento.subclasse && ` (${medicamento.subclasse})`}
                      </td>
                    ))}
                  </tr>

                  {/* Apresentações */}
                  <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      Apresentações
                    </td>
                    {selectedMeds.map(({ medicamento }) => (
                      <td key={medicamento.id} className="px-4 py-3 text-sm">
                        <div className="space-y-1">
                          {medicamento.apresentacoes.map((ap, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <span className="text-slate-700 dark:text-slate-200">
                                {ap.forma} {ap.concentracao}
                              </span>
                              {ap.disponivelSUS && (
                                <span className="text-green-600 dark:text-green-400 text-xs">✓ SUS</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Indicações */}
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      <Stethoscope className="w-4 h-4 inline mr-1" />
                      Indicações
                    </td>
                    {selectedMeds.map(({ medicamento }) => (
                      <td key={medicamento.id} className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                        <ul className="list-disc list-inside space-y-0.5">
                          {medicamento.indicacoes.slice(0, 4).map((ind, i) => (
                            <li key={i} className="text-xs">{ind}</li>
                          ))}
                          {medicamento.indicacoes.length > 4 && (
                            <li className="text-xs text-slate-400">+{medicamento.indicacoes.length - 4} mais</li>
                          )}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Contraindicações */}
                  <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      <AlertTriangle className="w-4 h-4 inline mr-1 text-red-500" />
                      Contraindicações
                    </td>
                    {selectedMeds.map(({ medicamento }) => (
                      <td key={medicamento.id} className="px-4 py-3 text-sm text-red-700 dark:text-red-300">
                        <ul className="list-disc list-inside space-y-0.5">
                          {medicamento.contraindicacoes.slice(0, 4).map((ci, i) => (
                            <li key={i} className="text-xs">{ci}</li>
                          ))}
                          {medicamento.contraindicacoes.length > 4 && (
                            <li className="text-xs text-red-400">+{medicamento.contraindicacoes.length - 4} mais</li>
                          )}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Posologia Adultos */}
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      Posologia (Adultos)
                    </td>
                    {selectedMeds.map(({ medicamento }) => (
                      <td key={medicamento.id} className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                        {medicamento.posologias[0] && (
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-purple-600 dark:text-purple-400">
                              {medicamento.posologias[0].indicacao}
                            </div>
                            <div className="text-xs">
                              {medicamento.posologias[0].adultos.dose}
                            </div>
                            <div className="text-xs text-slate-500">
                              {medicamento.posologias[0].adultos.frequencia}
                            </div>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Gestação */}
                  <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      <Heart className="w-4 h-4 inline mr-1 text-pink-500" />
                      Gestação
                    </td>
                    {selectedMeds.map(({ medicamento }) => (
                      <td key={medicamento.id} className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${getGestacaoColor(medicamento.gestacao)}`}>
                          Categoria {medicamento.gestacao}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Amamentação */}
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      <Baby className="w-4 h-4 inline mr-1 text-blue-500" />
                      Amamentação
                    </td>
                    {selectedMeds.map(({ medicamento }) => (
                      <td key={medicamento.id} className="px-4 py-3 text-sm">
                        {medicamento.amamentacao.compativel ? (
                          <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                            <Check className="w-4 h-4" /> Compatível
                          </span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400 flex items-center gap-1">
                            <X className="w-4 h-4" /> Evitar
                          </span>
                        )}
                        {medicamento.amamentacao.observacao && (
                          <p className="text-xs text-slate-500 mt-1">
                            {medicamento.amamentacao.observacao}
                          </p>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Efeitos Adversos Comuns */}
                  <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      Efeitos Adversos
                    </td>
                    {selectedMeds.map(({ medicamento }) => (
                      <td key={medicamento.id} className="px-4 py-3 text-sm">
                        <div className="space-y-1">
                          <div className="text-xs text-slate-600 dark:text-slate-300">
                            <span className="font-medium">Comuns:</span>{' '}
                            {medicamento.efeitosAdversos.comuns.slice(0, 3).join(', ')}
                          </div>
                          {medicamento.efeitosAdversos.graves && medicamento.efeitosAdversos.graves.length > 0 && (
                            <div className="text-xs text-red-600 dark:text-red-400">
                              <span className="font-medium">⚠️ Graves:</span>{' '}
                              {medicamento.efeitosAdversos.graves.slice(0, 2).join(', ')}
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Ajuste Renal */}
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      Ajuste Renal
                    </td>
                    {selectedMeds.map(({ medicamento }) => (
                      <td key={medicamento.id} className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                        {medicamento.ajusteDoseRenal && medicamento.ajusteDoseRenal.length > 0 ? (
                          <ul className="space-y-1">
                            {medicamento.ajusteDoseRenal.slice(0, 2).map((aj, i) => (
                              <li key={i} className="text-xs">
                                <span className="font-medium">TFG {aj.tfg}:</span> {aj.ajuste}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-xs text-slate-400">Não especificado</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Ontologias */}
                  <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      Códigos
                    </td>
                    {selectedMeds.map(({ medicamento }) => (
                      <td key={medicamento.id} className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {medicamento.atcCode && (
                            <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded font-mono">
                              ATC: {medicamento.atcCode}
                            </span>
                          )}
                          {medicamento.casNumber && (
                            <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded font-mono">
                              CAS: {medicamento.casNumber}
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {selectedMeds.length < 2 && (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <ArrowLeftRight className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Selecione pelo menos 2 medicamentos
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Clique nos cards acima para adicionar medicamentos à comparação
            </p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50 rounded-2xl border border-purple-200 dark:border-purple-800">
          <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-2">
            💡 Dicas de Uso
          </h3>
          <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
            <li>• Compare até 4 medicamentos simultaneamente</li>
            <li>• Interações são verificadas automaticamente</li>
            <li>• Use para escolher entre alternativas terapêuticas</li>
            <li>• Verifique disponibilidade no SUS (RENAME)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

