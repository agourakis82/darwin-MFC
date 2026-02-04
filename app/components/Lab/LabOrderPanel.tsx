import React, { useState } from 'react';
import { ClipboardList, AlertTriangle, Send, X } from 'lucide-react';
import { LabSearch } from './LabSearch';
import type { LOINCCode } from '@/lib/types/loinc';

export interface LabOrderPanelProps {
  onSubmit: (order: LabOrder) => void;
  onCancel?: () => void;
  recommendedTests?: LOINCCode[];
  patientId?: string;
}

export interface LabOrder {
  tests: LOINCCode[];
  priority: 'routine' | 'urgent' | 'stat';
  clinicalReason: string;
  notes?: string;
  requestedBy: string;
  patientId?: string;
}

export function LabOrderPanel({
  onSubmit,
  onCancel,
  recommendedTests = [],
  patientId,
}: LabOrderPanelProps) {
  const [selectedTests, setSelectedTests] = useState<LOINCCode[]>([]);
  const [priority, setPriority] = useState<LabOrder['priority']>('routine');
  const [clinicalReason, setClinicalReason] = useState('');
  const [notes, setNotes] = useState('');
  const [requestedBy, setRequestedBy] = useState('');

  const handleAddTest = (code: LOINCCode) => {
    if (!selectedTests.find(t => t.code === code.code)) {
      setSelectedTests([...selectedTests, code]);
    }
  };

  const handleRemoveTest = (code: LOINCCode) => {
    setSelectedTests(selectedTests.filter(t => t.code !== code.code));
  };

  const handleAddRecommended = (code: LOINCCode) => {
    handleAddTest(code);
  };

  const handleSubmit = () => {
    if (selectedTests.length === 0) {
      alert('Selecione pelo menos um exame');
      return;
    }
    if (!clinicalReason.trim()) {
      alert('Informe a justificativa clínica');
      return;
    }
    if (!requestedBy.trim()) {
      alert('Informe o nome do solicitante');
      return;
    }

    const order: LabOrder = {
      tests: selectedTests,
      priority,
      clinicalReason: clinicalReason.trim(),
      notes: notes.trim() || undefined,
      requestedBy: requestedBy.trim(),
      patientId,
    };

    onSubmit(order);
  };

  const priorityConfig = {
    routine: {
      label: 'Rotina',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      description: 'Processamento normal (24-48h)',
    },
    urgent: {
      label: 'Urgente',
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      description: 'Processamento prioritário (4-8h)',
    },
    stat: {
      label: 'STAT',
      color: 'bg-red-500/20 text-red-400 border-red-500/30',
      description: 'Imediato (< 1h)',
    },
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-neutral-800 border border-neutral-700 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardList className="text-blue-400" size={24} />
          <div>
            <h2 className="text-lg font-semibold text-neutral-200">Solicitação de Exames</h2>
            <p className="text-sm text-neutral-400">
              {patientId ? `Paciente: ${patientId}` : 'Novo pedido de exames'}
            </p>
          </div>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-neutral-400 hover:text-neutral-300 transition-colors"
            aria-label="Cancelar"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Recommended tests */}
      {recommendedTests.length > 0 && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
            <AlertTriangle size={16} />
            Exames recomendados para esta condição
          </h3>
          <div className="flex flex-wrap gap-2">
            {recommendedTests.map((test) => (
              <button
                key={test.code}
                onClick={() => handleAddRecommended(test)}
                disabled={selectedTests.some(t => t.code === test.code)}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                  selectedTests.some(t => t.code === test.code)
                    ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                + {test.namePt || test.shortName}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search and select tests */}
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          Selecionar Exames
        </label>
        <LabSearch
          onSelect={handleAddTest}
          selectedCodes={selectedTests}
          onRemove={handleRemoveTest}
          placeholder="Buscar exames por nome ou código LOINC..."
        />
      </div>

      {/* Priority selection */}
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-3">
          Prioridade
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(priorityConfig) as Array<keyof typeof priorityConfig>).map((key) => {
            const config = priorityConfig[key];
            return (
              <button
                key={key}
                onClick={() => setPriority(key)}
                className={`p-3 border rounded-lg transition-all ${
                  priority === key
                    ? config.color + ' border-2'
                    : 'bg-neutral-700/50 text-neutral-400 border-neutral-600 hover:bg-neutral-700'
                }`}
              >
                <p className="font-semibold text-sm">{config.label}</p>
                <p className="text-xs mt-1 opacity-80">{config.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clinical reason */}
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          Justificativa Clínica <span className="text-red-400">*</span>
        </label>
        <textarea
          value={clinicalReason}
          onChange={(e) => setClinicalReason(e.target.value)}
          placeholder="Ex: Investigação de diabetes mellitus, controle de dislipidemia..."
          rows={3}
          className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Additional notes */}
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          Observações Adicionais
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ex: Paciente em jejum, medicação em uso..."
          rows={2}
          className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Requested by */}
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          Solicitante <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={requestedBy}
          onChange={(e) => setRequestedBy(e.target.value)}
          placeholder="Dr(a). Nome completo - CRM XXXXX"
          className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Summary */}
      {selectedTests.length > 0 && (
        <div className="bg-neutral-700/50 border border-neutral-600 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-neutral-300 mb-2">Resumo do Pedido</h3>
          <div className="space-y-1 text-sm text-neutral-400">
            <p>• <strong>{selectedTests.length}</strong> exame(s) selecionado(s)</p>
            <p>• Prioridade: <strong className={priorityConfig[priority].color.split(' ')[1]}>{priorityConfig[priority].label}</strong></p>
            {clinicalReason && <p>• Justificativa preenchida</p>}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-neutral-700">
        {onCancel && (
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-neutral-200 transition-colors"
          >
            Cancelar
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={selectedTests.length === 0 || !clinicalReason.trim() || !requestedBy.trim()}
          className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed rounded-lg text-white transition-colors flex items-center justify-center gap-2"
        >
          <Send size={18} />
          Enviar Solicitação
        </button>
      </div>
    </div>
  );
}
