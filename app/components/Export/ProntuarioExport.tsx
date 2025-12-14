'use client';

/**
 * PRONTUÁRIO EXPORT - DARWIN-MFC
 * ==============================
 * 
 * Sistema de export para prontuário eletrônico
 * Formatos: SOAP, texto simples, Markdown
 */

import { useState, useCallback } from 'react';
import { 
  Copy, 
  Check, 
  FileText, 
  Download, 
  ClipboardList,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { QuickAction } from '@/lib/types/cross-references';

// =============================================================================
// TIPOS
// =============================================================================

export type ExportFormat = 'texto' | 'soap' | 'markdown';

export interface SOAPContent {
  subjetivo?: string;
  objetivo?: string;
  avaliacao?: string;
  plano?: string;
}

export interface ExportData {
  titulo: string;
  diagnostico?: {
    codigo: string;
    descricao: string;
  };
  soap?: SOAPContent;
  prescricoes?: string[];
  orientacoes?: string[];
  exames?: string[];
  encaminhamento?: string;
  retorno?: string;
  quickActions?: QuickAction[];
}

// =============================================================================
// FUNÇÕES DE FORMATAÇÃO
// =============================================================================

function formatAsText(data: ExportData): string {
  let text = `📋 ${data.titulo}\n`;
  text += '─'.repeat(40) + '\n\n';
  
  if (data.diagnostico) {
    text += `DIAGNÓSTICO: ${data.diagnostico.descricao} (${data.diagnostico.codigo})\n\n`;
  }
  
  if (data.soap?.subjetivo) {
    text += `S: ${data.soap.subjetivo}\n`;
  }
  if (data.soap?.objetivo) {
    text += `O: ${data.soap.objetivo}\n`;
  }
  if (data.soap?.avaliacao) {
    text += `A: ${data.soap.avaliacao}\n`;
  }
  if (data.soap?.plano) {
    text += `P: ${data.soap.plano}\n`;
  }
  
  if (data.prescricoes && data.prescricoes.length > 0) {
    text += '\nPRESCRIÇÕES:\n';
    data.prescricoes.forEach((p, i) => {
      text += `${i + 1}. ${p}\n`;
    });
  }
  
  if (data.exames && data.exames.length > 0) {
    text += '\nEXAMES SOLICITADOS:\n';
    data.exames.forEach(e => {
      text += `• ${e}\n`;
    });
  }
  
  if (data.orientacoes && data.orientacoes.length > 0) {
    text += '\nORIENTAÇÕES:\n';
    data.orientacoes.forEach(o => {
      text += `• ${o}\n`;
    });
  }
  
  if (data.encaminhamento) {
    text += `\nENCAMINHAMENTO: ${data.encaminhamento}\n`;
  }
  
  if (data.retorno) {
    text += `\nRETORNO: ${data.retorno}\n`;
  }
  
  return text;
}

function formatAsSOAP(data: ExportData): string {
  let text = '';
  
  if (data.soap?.subjetivo) {
    text += `SUBJETIVO:\n${data.soap.subjetivo}\n\n`;
  }
  
  if (data.soap?.objetivo) {
    text += `OBJETIVO:\n${data.soap.objetivo}\n\n`;
  }
  
  if (data.soap?.avaliacao) {
    text += `AVALIAÇÃO:\n${data.soap.avaliacao}\n`;
    if (data.diagnostico) {
      text += `CID-10: ${data.diagnostico.codigo}\n`;
    }
    text += '\n';
  }
  
  if (data.soap?.plano) {
    text += `PLANO:\n${data.soap.plano}\n`;
  }
  
  if (data.prescricoes && data.prescricoes.length > 0) {
    text += '\nPRESCRIÇÕES:\n';
    data.prescricoes.forEach((p, i) => {
      text += `${i + 1}) ${p}\n`;
    });
  }
  
  if (data.exames && data.exames.length > 0) {
    text += '\nEXAMES:\n';
    data.exames.forEach(e => {
      text += `- ${e}\n`;
    });
  }
  
  if (data.orientacoes && data.orientacoes.length > 0) {
    text += '\nORIENTAÇÕES:\n';
    data.orientacoes.forEach(o => {
      text += `- ${o}\n`;
    });
  }
  
  if (data.retorno) {
    text += `\nRETORNO: ${data.retorno}\n`;
  }
  
  return text;
}

function formatAsMarkdown(data: ExportData): string {
  let text = `# ${data.titulo}\n\n`;
  
  if (data.diagnostico) {
    text += `**Diagnóstico:** ${data.diagnostico.descricao} (${data.diagnostico.codigo})\n\n`;
  }
  
  if (data.soap?.subjetivo) {
    text += `## Subjetivo\n${data.soap.subjetivo}\n\n`;
  }
  
  if (data.soap?.objetivo) {
    text += `## Objetivo\n${data.soap.objetivo}\n\n`;
  }
  
  if (data.soap?.avaliacao) {
    text += `## Avaliação\n${data.soap.avaliacao}\n\n`;
  }
  
  if (data.soap?.plano) {
    text += `## Plano\n${data.soap.plano}\n\n`;
  }
  
  if (data.prescricoes && data.prescricoes.length > 0) {
    text += '## Prescrições\n';
    data.prescricoes.forEach((p, i) => {
      text += `${i + 1}. ${p}\n`;
    });
    text += '\n';
  }
  
  if (data.exames && data.exames.length > 0) {
    text += '## Exames\n';
    data.exames.forEach(e => {
      text += `- ${e}\n`;
    });
    text += '\n';
  }
  
  if (data.orientacoes && data.orientacoes.length > 0) {
    text += '## Orientações\n';
    data.orientacoes.forEach(o => {
      text += `- ${o}\n`;
    });
    text += '\n';
  }
  
  if (data.retorno) {
    text += `**Retorno:** ${data.retorno}\n`;
  }
  
  return text;
}

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

interface ProntuarioExportProps {
  data: ExportData;
  onClose?: () => void;
  className?: string;
}

export default function ProntuarioExport({ data, onClose, className = '' }: ProntuarioExportProps) {
  const [format, setFormat] = useState<ExportFormat>('texto');
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const getFormattedText = useCallback(() => {
    switch (format) {
      case 'soap':
        return formatAsSOAP(data);
      case 'markdown':
        return formatAsMarkdown(data);
      default:
        return formatAsText(data);
    }
  }, [data, format]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getFormattedText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [getFormattedText]);

  const downloadAsFile = useCallback(() => {
    const text = getFormattedText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.titulo.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data.titulo, getFormattedText]);

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden ${className}`}>
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5" />
          <span className="font-semibold">Exportar para Prontuário</span>
        </div>
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="p-1 hover:bg-white/20 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {expanded && (
        <div className="p-4">
          {/* Format selector */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-slate-500 dark:text-slate-400">Formato:</span>
            <div className="flex gap-1">
              {(['texto', 'soap', 'markdown'] as ExportFormat[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    format === f
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-medium'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 max-h-64 overflow-y-auto">
            <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono">
              {getFormattedText()}
            </pre>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar
                </>
              )}
            </button>
            <button
              onClick={downloadAsFile}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Baixar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// QUICK EXPORT BUTTON
// =============================================================================

interface QuickExportButtonProps {
  action: QuickAction;
  size?: 'sm' | 'md';
}

export function QuickExportButton({ action, size = 'sm' }: QuickExportButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyAction = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(action.conteudo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [action.conteudo]);

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const padding = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <button
      onClick={copyAction}
      className={`inline-flex items-center gap-1 ${padding} bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors`}
      title={`Copiar: ${action.titulo}`}
    >
      {copied ? (
        <Check className={iconSize} />
      ) : (
        <Copy className={iconSize} />
      )}
      <span>{action.titulo}</span>
    </button>
  );
}

// =============================================================================
// TEMPLATES PRÉ-DEFINIDOS
// =============================================================================

export const EXPORT_TEMPLATES: Record<string, ExportData> = {
  'has-inicio': {
    titulo: 'Consulta HAS - Início de Tratamento',
    diagnostico: {
      codigo: 'I10',
      descricao: 'Hipertensão Arterial Sistêmica',
    },
    soap: {
      subjetivo: 'Paciente assintomático. PA elevada em aferições prévias.',
      objetivo: 'PA: ___/___ mmHg\nFC: ___ bpm\nIMC: ___ kg/m²',
      avaliacao: 'Hipertensão Arterial Sistêmica - I10\nEstágio: ___\nRisco CV: ___',
      plano: '1. MEV: dieta hipossódica, atividade física, cessação tabagismo\n2. Medicação anti-hipertensiva\n3. Exames de estratificação',
    },
    prescricoes: [
      'Losartana 50mg - 1 comprimido VO 1x/dia',
      'Anlodipino 5mg - 1 comprimido VO 1x/dia (se PA ≥160/100)',
    ],
    exames: [
      'Glicemia de jejum',
      'HbA1c',
      'Creatinina + TFG',
      'Potássio',
      'Perfil lipídico',
      'Ácido úrico',
      'EAS + microalbuminúria',
      'ECG',
    ],
    orientacoes: [
      'Dieta com baixo teor de sal (<5g/dia)',
      'Atividade física regular (150 min/semana)',
      'Reduzir consumo de álcool',
      'Cessar tabagismo',
      'Medir PA 2x/semana em casa',
    ],
    retorno: '30 dias com exames',
  },
  'dm2-inicio': {
    titulo: 'Consulta DM2 - Início de Tratamento',
    diagnostico: {
      codigo: 'E11',
      descricao: 'Diabetes Mellitus tipo 2',
    },
    soap: {
      avaliacao: 'Diabetes Mellitus tipo 2 - E11\nHbA1c: ___\nTempo de diagnóstico: ___',
      plano: '1. MEV\n2. Metformina\n3. Rastreamento de complicações',
    },
    prescricoes: [
      'Metformina 500mg - 1 comprimido VO no almoço por 2 semanas, depois 1cp no almoço e 1cp no jantar',
    ],
    exames: [
      'HbA1c (se não recente)',
      'Perfil lipídico',
      'Creatinina + TFG',
      'Microalbuminúria',
      'Fundoscopia',
    ],
    orientacoes: [
      'Dieta equilibrada, evitar açúcares simples',
      'Atividade física regular',
      'Exame dos pés em casa regularmente',
      'Sinais de hipoglicemia: tremor, suor, tonturas',
    ],
    retorno: '30-60 dias',
  },
};

