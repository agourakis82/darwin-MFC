'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from '@/i18n/routing';
import { Copy, Download, Check, FileText, ClipboardList, Stethoscope, Pill, Target, User, ChevronDown, ChevronUp, Users, Network, ExternalLink, Lightbulb, Plus } from 'lucide-react';
import type { ChecklistProgress, ChecklistConsulta } from '@/lib/types/checklist';
import { checklistProgressToSOAPText, checklistProgressToSOAPResumo } from './ChecklistSOAPExport';
import SOAPNLPSuggestions, { SOAPNLPSuggestionsInline } from './SOAPNLPSuggestions';
import { suggestCodesForDiagnosis } from '@/lib/utils/nlp-soap';
import { todasDoencas } from '@/lib/data/doencas/index';
import { todosMedicamentos } from '@/lib/data/medicamentos/index';
import RecommendationsPanel from '@/app/components/Recommendations/RecommendationsPanel';
import { saveConsultationToHistory } from '@/lib/utils/recommendations';
import type { Recommendation } from '@/lib/utils/recommendations';
import DrugInteractionAlerts from './DrugInteractionAlerts';
import DifferentialDiagnosisAssistant from '@/app/components/Diagnosis/DifferentialDiagnosisAssistant';
import TreatmentSuggestionPanel from '@/app/components/Diagnosis/TreatmentSuggestionPanel';
import { extractSymptomsFromSOAP } from '@/lib/utils/symptom-extraction';
import type { PatientAgeUnit } from '@/lib/utils/differential-diagnosis';

interface FamilyToolsData {
  genogramaResumo?: string;
  ecomapaResumo?: string;
  genogramaImagem?: string; // Base64 data URL da imagem
  ecomapaImagem?: string; // Base64 data URL da imagem
  observacoesFamilia?: string;
}

export interface SOAPData {
  // Identificação
  paciente?: {
    iniciais?: string;
    idade?: string;
    idadeUnidade?: PatientAgeUnit;
    sexo?: string;
  };
  data?: string;
  
  // SOAP
  subjetivo?: string;
  objetivo?: {
    sinaisVitais?: {
      pa?: string;
      fc?: string;
      fr?: string;
      temp?: string;
      satO2?: string;
      peso?: string;
      altura?: string;
      imc?: string;
    };
    exameFisico?: string;
    examesComplementares?: string;
  };
  avaliacao?: {
    hipoteses?: string[];
    ciap2?: string[];
    cid10?: string[];
    risco?: string;
  };
  plano?: {
    orientacoes?: string[];
    prescricoes?: Array<{
      medicamento: string;
      posologia: string;
      duracao?: string;
    }>;
    examesSolicitados?: string[];
    encaminhamentos?: string[];
    retorno?: string;
  };
  
  // Ferramentas de Família (MFC)
  familia?: FamilyToolsData;
}

interface SOAPExportProps {
  initialData?: Partial<SOAPData>;
  doencaId?: string;
  onDataChange?: (data: SOAPData) => void;
  checklistProgress?: {
    checklist: ChecklistConsulta;
    progress: ChecklistProgress;
  };
  includeChecklist?: boolean;
}

export default function SOAPExport({
  initialData = {},
  doencaId,
  onDataChange,
}: SOAPExportProps) {
  const [data, setData] = useState<SOAPData>({
    paciente: { iniciais: '', idade: '', idadeUnidade: 'anos', sexo: '' },
    data: new Date().toISOString().split('T')[0],
    subjetivo: '',
    objetivo: {
      sinaisVitais: {},
      exameFisico: '',
      examesComplementares: '',
    },
    avaliacao: {
      hipoteses: [],
      ciap2: [],
      cid10: [],
      risco: '',
    },
    plano: {
      orientacoes: [],
      prescricoes: [],
      examesSolicitados: [],
      encaminhamentos: [],
      retorno: '',
    },
    ...initialData,
  });

  const [copied, setCopied] = useState(false);
  const [generatedAt, setGeneratedAt] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    identificacao: true,
    subjetivo: true,
    objetivo: true,
    avaliacao: true,
    plano: true,
    familia: false, // Collapsed by default
  });
  const [newHipotese, setNewHipotese] = useState('');
  const [newOrientacao, setNewOrientacao] = useState('');
  const [newExame, setNewExame] = useState('');
  const [newMedicamento, setNewMedicamento] = useState({ medicamento: '', posologia: '', duracao: '' });
  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState(doencaId || '');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setGeneratedAt(new Date().toLocaleString('pt-BR'));
  }, []);

  useEffect(() => {
    if (doencaId) setSelectedDiagnosisId(doencaId);
  }, [doencaId]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateData = (updates: Partial<SOAPData>) => {
    const newData = { ...data, ...updates };
    setData(newData);
    onDataChange?.(newData);
  };

  // Gera texto formatado SOAP
  const formattedSOAP = useMemo(() => {
    let text = '';
    
    // Header
    if (data.paciente?.iniciais || data.data) {
      text += '═══════════════════════════════════════\n';
      text += '             NOTA DE EVOLUÇÃO           \n';
      text += '═══════════════════════════════════════\n\n';
      
      if (data.paciente?.iniciais) text += `Paciente: ${data.paciente.iniciais}`;
      if (data.paciente?.idade) text += ` | ${data.paciente.idade} ${data.paciente.idadeUnidade || 'anos'}`;
      if (data.paciente?.sexo) text += ` | ${data.paciente.sexo}`;
      text += '\n';
      if (data.data) text += `Data: ${new Date(data.data).toLocaleDateString('pt-BR')}\n`;
      text += '\n';
    }

    // S - Subjetivo
    text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    text += '【S】 SUBJETIVO\n';
    text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    text += data.subjetivo || '(Queixa principal e história)\n';
    text += '\n\n';

    // O - Objetivo
    text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    text += '【O】 OBJETIVO\n';
    text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    
    // Sinais Vitais
    const sv = data.objetivo?.sinaisVitais;
    if (sv && Object.values(sv).some(v => v)) {
      text += '▸ Sinais Vitais:\n';
      if (sv.pa) text += `   PA: ${sv.pa} mmHg\n`;
      if (sv.fc) text += `   FC: ${sv.fc} bpm\n`;
      if (sv.fr) text += `   FR: ${sv.fr} irpm\n`;
      if (sv.temp) text += `   Temp: ${sv.temp} °C\n`;
      if (sv.satO2) text += `   SatO2: ${sv.satO2}%\n`;
      if (sv.peso) text += `   Peso: ${sv.peso} kg\n`;
      if (sv.altura) text += `   Altura: ${sv.altura} cm\n`;
      if (sv.imc) text += `   IMC: ${sv.imc} kg/m²\n`;
      text += '\n';
    }
    
    if (data.objetivo?.exameFisico) {
      text += '▸ Exame Físico:\n';
      text += `   ${data.objetivo.exameFisico}\n\n`;
    }
    
    if (data.objetivo?.examesComplementares) {
      text += '▸ Exames Complementares:\n';
      text += `   ${data.objetivo.examesComplementares}\n\n`;
    }

    // A - Avaliação
    text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    text += '【A】 AVALIAÇÃO\n';
    text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    
    if (data.avaliacao?.hipoteses && data.avaliacao.hipoteses.length > 0) {
      text += '▸ Hipóteses Diagnósticas:\n';
      data.avaliacao.hipoteses.forEach((h, i) => {
        text += `   ${i + 1}. ${h}\n`;
      });
      text += '\n';
    }
    
    if (data.avaliacao?.ciap2 && data.avaliacao.ciap2.length > 0) {
      text += `▸ CIAP-2: ${data.avaliacao.ciap2.join(', ')}\n`;
    }
    if (data.avaliacao?.cid10 && data.avaliacao.cid10.length > 0) {
      text += `▸ CID-10: ${data.avaliacao.cid10.join(', ')}\n`;
    }
    if (data.avaliacao?.risco) {
      text += `▸ Estratificação de Risco: ${data.avaliacao.risco}\n`;
    }
    text += '\n';

    // P - Plano
    text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    text += '【P】 PLANO\n';
    text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    
    if (data.plano?.orientacoes && data.plano.orientacoes.length > 0) {
      text += '▸ Orientações:\n';
      data.plano.orientacoes.forEach(o => {
        text += `   • ${o}\n`;
      });
      text += '\n';
    }
    
    if (data.plano?.prescricoes && data.plano.prescricoes.length > 0) {
      text += '▸ Prescrição:\n';
      data.plano.prescricoes.forEach((p, i) => {
        text += `   ${i + 1}. ${p.medicamento}\n`;
        text += `      ${p.posologia}`;
        if (p.duracao) text += ` por ${p.duracao}`;
        text += '\n';
      });
      text += '\n';
    }
    
    if (data.plano?.examesSolicitados && data.plano.examesSolicitados.length > 0) {
      text += '▸ Exames Solicitados:\n';
      data.plano.examesSolicitados.forEach(e => {
        text += `   • ${e}\n`;
      });
      text += '\n';
    }
    
    if (data.plano?.encaminhamentos && data.plano.encaminhamentos.length > 0) {
      text += '▸ Encaminhamentos:\n';
      data.plano.encaminhamentos.forEach(e => {
        text += `   • ${e}\n`;
      });
      text += '\n';
    }
    
    if (data.plano?.retorno) {
      text += `▸ Retorno: ${data.plano.retorno}\n`;
    }

    // Ferramentas de Família (se preenchido)
    if (data.familia?.genogramaResumo || data.familia?.ecomapaResumo || data.familia?.observacoesFamilia || data.familia?.genogramaImagem || data.familia?.ecomapaImagem) {
      text += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      text += '【F】 ABORDAGEM FAMILIAR (MFC)\n';
      text += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      
      if (data.familia.genogramaImagem) {
        text += '▸ Genograma (imagem anexa)\n';
      }
      
      if (data.familia.genogramaResumo) {
        text += '▸ Genograma (resumo):\n';
        text += `   ${data.familia.genogramaResumo}\n\n`;
      }
      
      if (data.familia.ecomapaImagem) {
        text += '▸ Ecomapa (imagem anexa)\n';
      }
      
      if (data.familia.ecomapaResumo) {
        text += '▸ Ecomapa (Rede de Apoio - resumo):\n';
        text += `   ${data.familia.ecomapaResumo}\n\n`;
      }
      
      if (data.familia.observacoesFamilia) {
        text += '▸ Observações Familiares:\n';
        text += `   ${data.familia.observacoesFamilia}\n`;
      }
    }

    text += '\n═══════════════════════════════════════\n';
    text += `Gerado por Darwin-MFC em ${generatedAt || 'sessão atual'}\n`;

    return text;
  }, [data, generatedAt]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedSOAP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const downloadTxt = () => {
    const blob = new Blob([formattedSOAP], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `soap_${data.paciente?.iniciais || 'paciente'}_${data.data || 'data'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const SectionHeader = ({ 
    icon: Icon, 
    title, 
    section,
    color: _color
  }: { 
    icon: React.ElementType; 
    title: string; 
    section: keyof typeof expandedSections;
    color: string;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex w-full items-center justify-between border-b border-white/10 bg-[#0a151b] p-3 text-zinc-200 transition-colors hover:bg-white/[0.04]"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" />
        <span className="font-bold">{title}</span>
      </div>
      {expandedSections[section] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
    </button>
  );

  const findMedicationIdByName = (name: string): string | null => {
    const normalized = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const med of todosMedicamentos) {
      if (med.nomeGenerico.toLowerCase().includes(normalized) || 
          med.nomeGenerico.toLowerCase() === normalized) {
        return med.id;
      }
      if (med.nomesComerciais?.some(nc => nc.toLowerCase().includes(normalized))) {
        return med.id;
      }
    }
    return null;
  };

  const handleDiagnosisSelect = (selectedDoencaId: string) => {
    const doenca = todasDoencas.find(d => d.id === selectedDoencaId);
    if (!doenca?.titulo) return;

    setSelectedDiagnosisId(selectedDoencaId);
    const hipoteses = data.avaliacao?.hipoteses || [];
    updateData({
      avaliacao: {
        ...data.avaliacao,
        hipoteses: hipoteses.includes(doenca.titulo) ? hipoteses : [...hipoteses, doenca.titulo],
        cid10: [...new Set([...(data.avaliacao?.cid10 || []), ...(doenca.cid10 || [])])],
        ciap2: [...new Set([...(data.avaliacao?.ciap2 || []), ...(doenca.ciap2 || [])])],
      }
    });
  };

  const handleAddTreatment = (prescription: { medicamento: string; posologia: string; duracao?: string }) => {
    const prescriptions = data.plano?.prescricoes || [];
    const normalizedName = prescription.medicamento.toLowerCase();
    if (prescriptions.some(item => item.medicamento.toLowerCase() === normalizedName)) return;

    updateData({
      plano: {
        ...data.plano,
        prescricoes: [...prescriptions, prescription],
      }
    });
    setExpandedSections(previous => ({ ...previous, plano: true }));
  };

  const handlePatientContextChange = (updates: { age?: string; ageUnit?: PatientAgeUnit; weightKg?: string }) => {
    const nextData: SOAPData = {
      ...data,
      paciente: {
        ...data.paciente,
        idade: updates.age ?? data.paciente?.idade,
        idadeUnidade: updates.ageUnit ?? data.paciente?.idadeUnidade ?? 'anos',
      },
      objetivo: {
        ...data.objetivo,
        sinaisVitais: {
          ...data.objetivo?.sinaisVitais,
          peso: updates.weightKg ?? data.objetivo?.sinaisVitais?.peso,
        },
      },
    };
    setData(nextData);
    onDataChange?.(nextData);
  };

  const handleSelectRecommendation = (rec: Recommendation) => {
    if (rec.type === 'diagnosis' && rec.metadata?.doencaId) {
      handleDiagnosisSelect(rec.metadata.doencaId);
    } else if (rec.type === 'medication' && rec.metadata?.medicamentoId) {
      const medicamentoId = rec.metadata.medicamentoId;
      const medicamento = todosMedicamentos.find(m => m.id === medicamentoId);
      if (medicamento) {
        const prescricoes = data.plano?.prescricoes || [];
        const alreadyPrescribed = prescricoes.some(p => {
          const medId = findMedicationIdByName(p.medicamento);
          return medId !== null && medId === medicamento.id;
        });
        if (!alreadyPrescribed) {
          const firstPosologia = medicamento.posologias && medicamento.posologias.length > 0 ? medicamento.posologias[0] : null;
          const doseAdultos = firstPosologia?.adultos?.dose || 'Conforme prescrição médica';
          const frequenciaAdultos = firstPosologia?.adultos?.frequencia || '';
          const posologiaCompleta = frequenciaAdultos ? `${doseAdultos} ${frequenciaAdultos}` : doseAdultos;
          updateData({
            plano: {
              ...data.plano,
              prescricoes: [...prescricoes, {
                medicamento: medicamento.nomeGenerico,
                posologia: posologiaCompleta,
                duracao: '',
              }]
            }
          });
        }
      }
    } else if (rec.type === 'followup' && rec.metadata?.doencaId) {
      const doenca = todasDoencas.find(d => d.id === rec.metadata?.doencaId);
      if (doenca && doenca.titulo && !data.plano?.retorno) {
        updateData({
          plano: {
            ...data.plano,
            retorno: '15 dias',
          }
        });
      }
    }
  };

  const handleSaveToHistory = () => {
    try {
      const consultId = saveConsultationToHistory(data);
      alert(`Consulta salva no histórico! (ID: ${consultId})`);
    } catch (error) {
      console.error('Erro ao salvar consulta:', error);
      alert('Erro ao salvar consulta no histórico');
    }
  };

  // Extrai sintomas do SOAP para o assistente de diagnóstico
  const extractedSymptoms = useMemo(() => {
    return extractSymptomsFromSOAP({
      subjetivo: data.subjetivo,
      objetivo: data.objetivo,
    });
  }, [data.subjetivo, data.objetivo?.exameFisico]);

  return (
    <div className="space-y-4">
      <section id="assistente-clinico" className="space-y-3 scroll-mt-24">
        <DifferentialDiagnosisAssistant
          initialSymptom={extractedSymptoms.principal}
          initialSecondarySymptoms={extractedSymptoms.secundarios}
          selectedDiagnosisId={selectedDiagnosisId}
          patientAge={data.paciente?.idade || ''}
          patientAgeUnit={data.paciente?.idadeUnidade || 'anos'}
          patientWeightKg={data.objetivo?.sinaisVitais?.peso || ''}
          onPatientContextChange={handlePatientContextChange}
          onDiagnosisSelect={handleDiagnosisSelect}
        />
        {selectedDiagnosisId && (
          <TreatmentSuggestionPanel
            doencaId={selectedDiagnosisId}
            prescriptions={data.plano?.prescricoes || []}
            patientAge={data.paciente?.idade || ''}
            patientAgeUnit={data.paciente?.idadeUnidade || 'anos'}
            patientWeightKg={data.objetivo?.sinaisVitais?.peso || ''}
            onAddMedication={handleAddTreatment}
          />
        )}
      </section>

      {/* Painel de Recomendações */}
      <RecommendationsPanel
        currentSOAP={data}
        onSelectRecommendation={handleSelectRecommendation}
        showStatistics={true}
        maxRecommendations={8}
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        {/* Formulário */}
        <div className="space-y-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-cyan-300/30 bg-cyan-300/[0.08]">
            <FileText className="h-5 w-5 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Nota SOAP</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Preencha os campos para gerar a nota</p>
          </div>
        </div>

        {/* Identificação */}
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <SectionHeader 
            icon={User} 
            title="Identificação" 
            section="identificacao"
            color="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
          />
          {expandedSections.identificacao && (
            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <input
                placeholder="Iniciais"
                value={data.paciente?.iniciais || ''}
                onChange={e => updateData({ paciente: { ...data.paciente, iniciais: e.target.value } })}
                className="col-span-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
              />
              <div className="col-span-1 flex min-w-0 gap-1.5">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  placeholder="Idade"
                  value={data.paciente?.idade || ''}
                  onChange={e => handlePatientContextChange({ age: e.target.value })}
                  className="min-w-0 flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                />
                <select
                  aria-label="Unidade da idade"
                  value={data.paciente?.idadeUnidade || 'anos'}
                  onChange={e => handlePatientContextChange({ ageUnit: e.target.value as PatientAgeUnit })}
                  className="w-[88px] px-2 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                >
                  <option value="dias">dias</option>
                  <option value="meses">meses</option>
                  <option value="anos">anos</option>
                </select>
              </div>
              <select
                value={data.paciente?.sexo || ''}
                onChange={e => updateData({ paciente: { ...data.paciente, sexo: e.target.value } })}
                className="col-span-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
              >
                <option value="">Sexo</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
              <input
                type="date"
                value={data.data || ''}
                onChange={e => updateData({ data: e.target.value })}
                className="col-span-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>
          )}
        </div>

        {/* S - Subjetivo */}
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <SectionHeader 
            icon={ClipboardList} 
            title="【S】 Subjetivo" 
            section="subjetivo"
            color="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
          />
          {expandedSections.subjetivo && (
            <div className="p-4">
              <textarea
                placeholder="Queixa principal, história da doença atual, antecedentes..."
                value={data.subjetivo || ''}
                onChange={e => updateData({ subjetivo: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm resize-none"
              />
              {data.subjetivo && data.subjetivo.length > 20 && (
                <SOAPNLPSuggestions
                  text={data.subjetivo}
                  onSelectDiagnosis={(doencaId) => {
                    const doenca = todasDoencas.find(d => d.id === doencaId);
                    if (doenca?.titulo) {
                      const hipoteses = data.avaliacao?.hipoteses || [];
                      if (!hipoteses.includes(doenca.titulo)) {
                        updateData({
                          avaliacao: {
                            ...data.avaliacao,
                            hipoteses: [...hipoteses, doenca.titulo],
                            cid10: [...new Set([...(data.avaliacao?.cid10 || []), ...(doenca.cid10 || [])])],
                            ciap2: [...new Set([...(data.avaliacao?.ciap2 || []), ...(doenca.ciap2 || [])])],
                          }
                        });
                      }
                    }
                  }}
                  onSelectCode={(code, type) => {
                    if (type === 'cid10') {
                      updateData({
                        avaliacao: {
                          ...data.avaliacao,
                          cid10: [...new Set([...(data.avaliacao?.cid10 || []), code])],
                        }
                      });
                    } else {
                      updateData({
                        avaliacao: {
                          ...data.avaliacao,
                          ciap2: [...new Set([...(data.avaliacao?.ciap2 || []), code])],
                        }
                      });
                    }
                  }}
                  showOnly={['diagnoses', 'codes']}
                  maxSuggestions={3}
                />
              )}
            </div>
          )}
        </div>

        {/* O - Objetivo */}
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <SectionHeader 
            icon={Stethoscope} 
            title="【O】 Objetivo" 
            section="objetivo"
            color="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200"
          />
          {expandedSections.objetivo && (
            <div className="p-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Sinais Vitais</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { key: 'pa', label: 'PA (mmHg)' },
                    { key: 'fc', label: 'FC (bpm)' },
                    { key: 'fr', label: 'FR (irpm)' },
                    { key: 'temp', label: 'Temp (°C)' },
                    { key: 'satO2', label: 'SatO2 (%)' },
                    { key: 'peso', label: 'Peso (kg)' },
                    { key: 'altura', label: 'Altura (cm)' },
                    { key: 'imc', label: 'IMC' },
                  ].map(({ key, label }) => (
                    <input
                      key={key}
                      placeholder={label}
                      value={(data.objetivo?.sinaisVitais as Record<string, string>)?.[key] || ''}
                      onChange={e => updateData({
                        objetivo: {
                          ...data.objetivo,
                          sinaisVitais: { ...data.objetivo?.sinaisVitais, [key]: e.target.value }
                        }
                      })}
                      className="px-2 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-sm"
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Exame Físico</label>
                <textarea
                  placeholder="Achados do exame físico..."
                  value={data.objetivo?.exameFisico || ''}
                  onChange={e => updateData({ objetivo: { ...data.objetivo, exameFisico: e.target.value } })}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm resize-none"
                />
                {data.objetivo?.exameFisico && (
                  <SOAPNLPSuggestionsInline
                    text={data.objetivo.exameFisico}
                    onSelectDiagnosis={(doencaId) => {
                      const doenca = todasDoencas.find(d => d.id === doencaId);
                      if (doenca?.titulo) {
                        const hipoteses = data.avaliacao?.hipoteses || [];
                        if (!hipoteses.includes(doenca.titulo)) {
                          updateData({
                            avaliacao: {
                              ...data.avaliacao,
                              hipoteses: [...hipoteses, doenca.titulo],
                            }
                          });
                        }
                      }
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* A - Avaliação */}
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <SectionHeader 
            icon={Target} 
            title="【A】 Avaliação" 
            section="avaliacao"
            color="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200"
          />
          {expandedSections.avaliacao && (
            <div className="p-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Hipóteses Diagnósticas</label>
                <div className="flex gap-2 mb-2">
                  <input
                    placeholder="Adicionar hipótese..."
                    value={newHipotese}
                    onChange={e => setNewHipotese(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && newHipotese.trim()) {
                        updateData({
                          avaliacao: {
                            ...data.avaliacao,
                            hipoteses: [...(data.avaliacao?.hipoteses || []), newHipotese.trim()]
                          }
                        });
                        setNewHipotese('');
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {data.avaliacao?.hipoteses?.map((h, i) => (
                    <span key={i} className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs rounded-full flex items-center gap-1">
                      {h}
                      <button onClick={() => updateData({
                        avaliacao: {
                          ...data.avaliacao,
                          hipoteses: data.avaliacao?.hipoteses?.filter((_, idx) => idx !== i)
                        }
                      })}>×</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="CIAP-2 (ex: K86)"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                      updateData({
                        avaliacao: {
                          ...data.avaliacao,
                          ciap2: [...(data.avaliacao?.ciap2 || []), (e.target as HTMLInputElement).value.trim()]
                        }
                      });
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                />
                <input
                  placeholder="CID-10 (ex: I10)"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                      updateData({
                        avaliacao: {
                          ...data.avaliacao,
                          cid10: [...(data.avaliacao?.cid10 || []), (e.target as HTMLInputElement).value.trim()]
                        }
                      });
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* P - Plano */}
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <SectionHeader 
            icon={Pill} 
            title="【P】 Plano" 
            section="plano"
            color="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
          />
          {expandedSections.plano && (
            <div className="p-4 space-y-4">
              {/* Alertas de Interações Medicamentosas */}
              <DrugInteractionAlerts soapData={data} includeHistory={true} />

              {/* Prescrições */}
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Prescrição</label>
                <div className="flex gap-2 mb-2">
                  <input
                    placeholder="Medicamento"
                    value={newMedicamento.medicamento}
                    onChange={e => setNewMedicamento({ ...newMedicamento, medicamento: e.target.value })}
                    className="flex-1 px-2 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-sm"
                  />
                  <input
                    placeholder="Posologia"
                    value={newMedicamento.posologia}
                    onChange={e => setNewMedicamento({ ...newMedicamento, posologia: e.target.value })}
                    className="flex-1 px-2 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-sm"
                  />
                  <button
                    onClick={() => {
                      if (newMedicamento.medicamento && newMedicamento.posologia) {
                        updateData({
                          plano: {
                            ...data.plano,
                            prescricoes: [...(data.plano?.prescricoes || []), newMedicamento]
                          }
                        });
                        setNewMedicamento({ medicamento: '', posologia: '', duracao: '' });
                      }
                    }}
                    className="px-3 py-1.5 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                {data.plano?.prescricoes?.map((p, i) => (
                  <div key={i} className="flex items-center justify-between px-2 py-1 bg-green-50 dark:bg-green-900/30 rounded mb-1">
                    <span className="text-sm text-green-700 dark:text-green-300">{p.medicamento} - {p.posologia}</span>
                    <button onClick={() => updateData({
                      plano: { ...data.plano, prescricoes: data.plano?.prescricoes?.filter((_, idx) => idx !== i) }
                    })} className="text-green-500 hover:text-green-700">×</button>
                  </div>
                ))}
              </div>

              {/* Retorno */}
              <input
                placeholder="Retorno (ex: 30 dias)"
                value={data.plano?.retorno || ''}
                onChange={e => updateData({ plano: { ...data.plano, retorno: e.target.value } })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>
          )}
        </div>

        {/* F - Família (MFC) */}
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <SectionHeader 
            icon={Users} 
            title="【F】 Abordagem Familiar (MFC)" 
            section="familia"
            color="bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-200"
          />
          {expandedSections.familia && (
            <div className="p-4 space-y-4">
              {/* Links para ferramentas */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Link
                  href="/ferramentas/genograma"
                  target="_blank"
                  className="px-3 py-2 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-lg text-sm flex items-center gap-2 hover:bg-rose-100 dark:hover:bg-rose-800 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  Criar Genograma
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  href="/ferramentas/ecomapa"
                  target="_blank"
                  className="px-3 py-2 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-lg text-sm flex items-center gap-2 hover:bg-teal-100 dark:hover:bg-teal-800 transition-colors"
                >
                  <Network className="w-4 h-4" />
                  Criar Ecomapa
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
              
              {/* Resumo do Genograma */}
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">
                  Resumo do Genograma (estrutura familiar)
                </label>
                <textarea
                  placeholder="Ex: Família nuclear, pai (52a, HAS, DM), mãe (48a, hígida), 2 filhos. Avó paterna com histórico de IAM aos 60a..."
                  value={data.familia?.genogramaResumo || ''}
                  onChange={e => updateData({ familia: { ...data.familia, genogramaResumo: e.target.value } })}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm resize-none"
                />
              </div>

              {/* Resumo do Ecomapa */}
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">
                  Resumo do Ecomapa (rede de apoio)
                </label>
                <textarea
                  placeholder="Ex: Rede de apoio forte com família extensa. Vinculado à UBS e CRAS. Trabalho como fonte de estresse. Participa de grupo de hipertensos..."
                  value={data.familia?.ecomapaResumo || ''}
                  onChange={e => updateData({ familia: { ...data.familia, ecomapaResumo: e.target.value } })}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm resize-none"
                />
              </div>

              {/* Observações */}
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">
                  Observações sobre dinâmica familiar
                </label>
                <textarea
                  placeholder="Ex: Sobrecarga do cuidador identificada. Conflito familiar em relação ao tratamento. Luto recente..."
                  value={data.familia?.observacoesFamilia || ''}
                  onChange={e => updateData({ familia: { ...data.familia, observacoesFamilia: e.target.value } })}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm resize-none"
                />
              </div>

              {/* Dica */}
              <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-200 dark:border-rose-800">
                <p className="text-xs text-rose-700 dark:text-rose-300">
                  <Lightbulb className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />
                  <strong>Dica MFC:</strong> A abordagem familiar é fundamental na APS. Considere o ciclo de vida familiar, crises normativas/paranormativas, e a influência do contexto social na saúde do paciente.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="lg:sticky lg:top-4 h-fit">
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white">Pré-visualização</h3>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
                  copied 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
              <button
                onClick={downloadTxt}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              {formattedSOAP}
            </pre>
          </div>
        </div>
      </div>

      </div>

      {/* Botão para salvar no histórico */}
      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <button
          onClick={handleSaveToHistory}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          title="Salvar consulta no histórico para recomendações futuras"
        >
          <FileText className="w-4 h-4" />
          Salvar no Histórico
        </button>
      </div>
    </div>
  );
}
