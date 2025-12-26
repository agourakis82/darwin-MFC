'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Network, Plus, Trash2, Upload, ZoomIn, ZoomOut,
  X, Home, Heart, Briefcase, GraduationCap, Church, Hospital,
  Users, Building, ShieldPlus, Dumbbell, Music, Car,
  AlertTriangle, Image, FileJson, Edit3, Info, RotateCcw
} from 'lucide-react';

// Tipos para o Ecomapa
interface Recurso {
  id: string;
  nome: string;
  tipo: TipoRecurso;
  qualidadeRelacao: 'forte' | 'moderada' | 'fraca' | 'estressante';
  direcaoFluxo: 'entrada' | 'saida' | 'bidirecional';
  notas?: string;
  x: number;
  y: number;
}

type TipoRecurso = 
  | 'familia' | 'amigos' | 'trabalho' | 'escola' | 'religiao' 
  | 'saude' | 'comunidade' | 'governo' | 'lazer' | 'cultura'
  | 'transporte' | 'vizinhanca' | 'outro';

interface ConfigRecurso {
  tipo: TipoRecurso;
  nameKey: string;
  icon: React.ElementType;
  cor: string;
  corClara: string;
}

const tiposRecurso: ConfigRecurso[] = [
  { tipo: 'familia', nameKey: 'resourceTypes.extendedFamily', icon: Users, cor: '#ec4899', corClara: '#fce7f3' },
  { tipo: 'amigos', nameKey: 'resourceTypes.friends', icon: Heart, cor: '#f43f5e', corClara: '#ffe4e6' },
  { tipo: 'trabalho', nameKey: 'resourceTypes.work', icon: Briefcase, cor: '#3b82f6', corClara: '#dbeafe' },
  { tipo: 'escola', nameKey: 'resourceTypes.education', icon: GraduationCap, cor: '#8b5cf6', corClara: '#ede9fe' },
  { tipo: 'religiao', nameKey: 'resourceTypes.religion', icon: Church, cor: '#a855f7', corClara: '#f3e8ff' },
  { tipo: 'saude', nameKey: 'resourceTypes.health', icon: Hospital, cor: '#22c55e', corClara: '#dcfce7' },
  { tipo: 'comunidade', nameKey: 'resourceTypes.community', icon: Building, cor: '#06b6d4', corClara: '#cffafe' },
  { tipo: 'governo', nameKey: 'resourceTypes.government', icon: ShieldPlus, cor: '#64748b', corClara: '#f1f5f9' },
  { tipo: 'lazer', nameKey: 'resourceTypes.leisure', icon: Dumbbell, cor: '#f97316', corClara: '#ffedd5' },
  { tipo: 'cultura', nameKey: 'resourceTypes.culture', icon: Music, cor: '#eab308', corClara: '#fef9c3' },
  { tipo: 'transporte', nameKey: 'resourceTypes.transport', icon: Car, cor: '#78716c', corClara: '#f5f5f4' },
  { tipo: 'vizinhanca', nameKey: 'resourceTypes.neighborhood', icon: Home, cor: '#14b8a6', corClara: '#ccfbf1' },
  { tipo: 'outro', nameKey: 'resourceTypes.other', icon: Network, cor: '#6b7280', corClara: '#f3f4f6' },
];

export default function EcomapaClient() {
  const t = useTranslations('ecomap');
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [selectedRecurso, setSelectedRecurso] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecurso, setEditingRecurso] = useState<Recurso | null>(null);
  const [zoom, setZoom] = useState(1);
  const [nomeFamilia, setNomeFamilia] = useState('');
  const [editandoNomeFamilia, setEditandoNomeFamilia] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  
  // Drag state
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Centro dinâmico do canvas
  const centroX = canvasSize.width / (2 * zoom);
  const centroY = canvasSize.height / (2 * zoom);
  const raioFamilia = 70;

  // Initialize family name with translation
  useEffect(() => {
    if (!nomeFamilia) {
      setNomeFamilia(t('nuclearFamily'));
    }
  }, [nomeFamilia, t]);

  // Resize observer
  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current) {
        setCanvasSize({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Adicionar recurso
  const adicionarRecurso = useCallback((tipo: TipoRecurso) => {
    const config = tiposRecurso.find(tr => tr.tipo === tipo)!;
    const angulo = ((recursos.length * 360 / 8) + 45) * (Math.PI / 180);
    const distancia = 200 + (recursos.length % 3) * 40;

    const novoRecurso: Recurso = {
      id: `recurso-${Date.now()}`,
      nome: t(config.nameKey),
      tipo,
      qualidadeRelacao: 'moderada',
      direcaoFluxo: 'bidirecional',
      x: centroX + Math.cos(angulo) * distancia,
      y: centroY + Math.sin(angulo) * distancia
    };

    setRecursos(prev => [...prev, novoRecurso]);
    setShowAddModal(false);
  }, [recursos.length, centroX, centroY, t]);

  // Remover recurso
  const removerRecurso = useCallback((id: string) => {
    setRecursos(prev => prev.filter(r => r.id !== id));
    setSelectedRecurso(null);
  }, []);

  // Atualizar recurso
  const atualizarRecurso = useCallback((recurso: Recurso) => {
    setRecursos(prev => prev.map(r => r.id === recurso.id ? recurso : r));
    setShowEditModal(false);
    setEditingRecurso(null);
  }, []);

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent, recursoId: string) => {
    e.stopPropagation();
    const recurso = recursos.find(r => r.id === recursoId);
    if (recurso && canvasRef.current) {
      setDragging(recursoId);
      const rect = canvasRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - (recurso.x * zoom + rect.left),
        y: e.clientY - (recurso.y * zoom + rect.top)
      });
    }
  }, [recursos, zoom]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = (e.clientX - rect.left - dragOffset.x) / zoom;
      const newY = (e.clientY - rect.top - dragOffset.y) / zoom;
      
      // Limitar dentro do canvas
      const limitedX = Math.max(40, Math.min(newX, canvasSize.width/zoom - 40));
      const limitedY = Math.max(40, Math.min(newY, canvasSize.height/zoom - 40));
      
      setRecursos(prev => prev.map(r => 
        r.id === dragging ? { ...r, x: limitedX, y: limitedY } : r
      ));
    }
  }, [dragging, dragOffset, zoom, canvasSize]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  // Exportar ecomapa como JSON
  const exportarEcomapa = useCallback(() => {
    const data = { recursos, nomeFamilia, versao: '1.0' };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecomapa-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [recursos, nomeFamilia]);

  // Exportar ecomapa como imagem PNG
  const exportarComoImagem = useCallback(async () => {
    if (!canvasRef.current) return;
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `ecomapa-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      alert(t('alerts.exportImageError'));
    }
  }, [t]);

  // Importar ecomapa
  const importarEcomapa = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          setRecursos(data.recursos || []);
          setNomeFamilia(data.nomeFamilia || t('nuclearFamily'));
        } catch (err) {
          alert(t('alerts.importError'));
        }
      };
      reader.readAsText(file);
    }
  }, [t]);

  // Limpar tudo
  const limparTudo = useCallback(() => {
    if (confirm(t('alerts.clearConfirm'))) {
      setRecursos([]);
      setSelectedRecurso(null);
    }
  }, [t]);

  // Obter estilo da linha baseado na qualidade
  const getLinhaEstilo = (qualidade: Recurso['qualidadeRelacao']) => {
    switch (qualidade) {
      case 'forte': return { strokeWidth: 5, strokeDasharray: 'none', stroke: '#22c55e' };
      case 'moderada': return { strokeWidth: 3, strokeDasharray: 'none', stroke: '#3b82f6' };
      case 'fraca': return { strokeWidth: 2, strokeDasharray: '8,4', stroke: '#94a3b8' };
      case 'estressante': return { strokeWidth: 4, strokeDasharray: 'none', stroke: '#ef4444' };
    }
  };

  // Calcular ponto na borda do círculo central
  const getPointOnCircle = (targetX: number, targetY: number) => {
    const dx = targetX - centroX;
    const dy = targetY - centroY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return { x: centroX, y: centroY };
    return {
      x: centroX + (dx / dist) * (raioFamilia + 5),
      y: centroY + (dy / dist) * (raioFamilia + 5)
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-cyan-950">
      {/* Header */}
      <div className="sticky top-0 z-30 p-4 border-b border-cyan-100 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Network className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {t('title')}
              </h1>
              <p className="text-sm text-neutral-500">{t('subtitle')}</p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl flex items-center gap-2 font-medium hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20"
            >
              <Plus className="w-5 h-5" />
              {t('actions.addResource')}
            </button>

            {/* Zoom */}
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
              <button
                onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
                className="p-2 hover:bg-white dark:hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm w-14 text-center font-medium">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(z => Math.min(1.5, z + 0.1))}
                className="p-2 hover:bg-white dark:hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
              <button
                onClick={exportarComoImagem}
                className="p-2 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 rounded-lg transition-colors"
                title={t('actions.exportPNG')}
              >
                <Image className="w-5 h-5" />
              </button>
              <button
                onClick={exportarEcomapa}
                className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 rounded-lg transition-colors"
                title={t('actions.exportJSON')}
              >
                <FileJson className="w-5 h-5" />
              </button>
              <label className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg cursor-pointer transition-colors" title={t('actions.import')}>
                <Upload className="w-5 h-5" />
                <input type="file" accept=".json" onChange={importarEcomapa} className="hidden" />
              </label>
              <button
                onClick={limparTudo}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded-lg transition-colors"
                title={t('actions.clear')}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Instrução */}
      <div className="max-w-7xl mx-auto px-4 mt-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
          <Info className="w-4 h-4" />
          {t('instructions.dragAndEdit')}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex p-4 gap-4">
        <div 
          ref={canvasRef}
          className="flex-1 h-[calc(100vh-180px)] relative overflow-hidden bg-white dark:bg-neutral-900 border-2 border-cyan-100 dark:border-neutral-800 rounded-2xl shadow-xl"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={() => setSelectedRecurso(null)}
        >
          {/* Grid de fundo circular */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
            {[1, 2, 3, 4].map(i => (
              <circle
                key={i}
                cx={centroX * zoom}
                cy={centroY * zoom}
                r={(80 + i * 80) * zoom}
                fill="none"
                stroke="#06b6d4"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            ))}
          </svg>

          {/* SVG para linhas e elementos */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Linhas de conexão */}
            {recursos.map(recurso => {
              const estilo = getLinhaEstilo(recurso.qualidadeRelacao);
              const pontoCirculo = getPointOnCircle(recurso.x, recurso.y);
              
              return (
                <g key={`linha-${recurso.id}`}>
                  <line
                    x1={pontoCirculo.x * zoom}
                    y1={pontoCirculo.y * zoom}
                    x2={recurso.x * zoom}
                    y2={recurso.y * zoom}
                    {...estilo}
                    className="transition-all duration-200"
                  />
                  
                  {/* Setas para direção do fluxo */}
                  {recurso.direcaoFluxo !== 'bidirecional' && (
                    <g>
                      {/* Calcular posição da seta no meio da linha */}
                      {(() => {
                        const midX = ((pontoCirculo.x + recurso.x) / 2) * zoom;
                        const midY = ((pontoCirculo.y + recurso.y) / 2) * zoom;
                        const angle = Math.atan2(
                          recurso.direcaoFluxo === 'entrada' 
                            ? pontoCirculo.y - recurso.y 
                            : recurso.y - pontoCirculo.y,
                          recurso.direcaoFluxo === 'entrada' 
                            ? pontoCirculo.x - recurso.x 
                            : recurso.x - pontoCirculo.x
                        ) * 180 / Math.PI;
                        
                        return (
                          <polygon
                            points="0,-6 12,0 0,6"
                            fill={estilo.stroke}
                            transform={`translate(${midX}, ${midY}) rotate(${angle})`}
                          />
                        );
                      })()}
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Família Nuclear (Centro) */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: centroX * zoom,
              top: centroY * zoom,
            }}
            onClick={(e) => { e.stopPropagation(); setEditandoNomeFamilia(true); }}
          >
            <div 
              className="rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-neutral-800 transition-transform group-hover:scale-105"
              style={{ 
                width: raioFamilia * 2 * zoom, 
                height: raioFamilia * 2 * zoom,
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)'
              }}
            >
              <div className="text-center">
                <Home className="w-10 h-10 text-white mx-auto mb-1" style={{ width: 40 * zoom, height: 40 * zoom }} />
                {editandoNomeFamilia ? (
                  <input
                    type="text"
                    value={nomeFamilia}
                    onChange={(e) => setNomeFamilia(e.target.value)}
                    onBlur={() => setEditandoNomeFamilia(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditandoNomeFamilia(false)}
                    autoFocus
                    className="bg-transparent text-white text-center text-xs font-bold border-b border-white/50 focus:outline-none w-20"
                    style={{ fontSize: 11 * zoom }}
                  />
                ) : (
                  <span className="text-white font-bold block max-w-24 truncate" style={{ fontSize: 11 * zoom }}>
                    {nomeFamilia}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Recursos */}
          {recursos.map(recurso => {
            const config = tiposRecurso.find(t => t.tipo === recurso.tipo)!;
            const IconComponent = config.icon;
            const isSelected = selectedRecurso === recurso.id;
            const isDragging = dragging === recurso.id;
            
            return (
              <div
                key={recurso.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${isDragging ? 'cursor-grabbing scale-110 z-20' : 'cursor-grab'} ${isSelected ? 'z-10' : ''}`}
                style={{ 
                  left: recurso.x * zoom, 
                  top: recurso.y * zoom,
                }}
                onMouseDown={(e) => handleMouseDown(e, recurso.id)}
                onClick={(e) => { e.stopPropagation(); setSelectedRecurso(recurso.id); }}
                onDoubleClick={() => { setEditingRecurso(recurso); setShowEditModal(true); }}
              >
                {/* Anel de seleção */}
                {isSelected && (
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-blue-500 animate-pulse"
                    style={{ margin: -8, width: 'calc(100% + 16px)', height: 'calc(100% + 16px)' }}
                  />
                )}
                
                <div 
                  className="rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-neutral-800 transition-transform hover:scale-105"
                  style={{ 
                    width: 72 * zoom, 
                    height: 72 * zoom, 
                    backgroundColor: config.cor 
                  }}
                >
                  <IconComponent className="text-white" style={{ width: 32 * zoom, height: 32 * zoom }} />
                </div>
                
                {/* Nome */}
                <div 
                  className="text-center mt-2 font-medium truncate max-w-24 dark:text-white"
                  style={{ fontSize: 11 * zoom }}
                >
                  {recurso.nome}
                </div>
                
                {/* Indicador de relação estressante */}
                {recurso.qualidadeRelacao === 'estressante' && (
                  <div 
                    className="absolute bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                    style={{ 
                      top: -4 * zoom, 
                      right: -4 * zoom,
                      width: 24 * zoom,
                      height: 24 * zoom
                    }}
                  >
                    <AlertTriangle className="text-white" style={{ width: 14 * zoom, height: 14 * zoom }} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Instruções se vazio */}
          {recursos.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="text-center p-4 bg-white/60 dark:bg-neutral-800/60 backdrop-blur rounded-2xl"
                style={{ transform: `translateY(${100 * zoom}px)` }}
              >
                <p className="text-neutral-500 text-sm">{t('emptyState.description')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Recurso selecionado */}
        {selectedRecurso && (
          <div className="w-80 bg-white dark:bg-neutral-900 border-2 border-cyan-100 dark:border-neutral-800 rounded-2xl p-5 overflow-auto shadow-xl">
            {(() => {
              const recurso = recursos.find(r => r.id === selectedRecurso);
              if (!recurso) return null;
              const config = tiposRecurso.find(tr => tr.tipo === recurso.tipo)!;

              return (
                <div className="space-y-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: config.cor }}
                      >
                        <config.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold dark:text-white">{recurso.nome}</h3>
                        <p className="text-sm text-neutral-500">{t(config.nameKey)}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedRecurso(null)} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4">
                      <p className="text-xs text-neutral-500 mb-2">{t('quality.label')}</p>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: getLinhaEstilo(recurso.qualidadeRelacao).stroke }}
                        />
                        <span className={`font-semibold ${
                          recurso.qualidadeRelacao === 'forte' ? 'text-green-600' :
                          recurso.qualidadeRelacao === 'moderada' ? 'text-blue-600' :
                          recurso.qualidadeRelacao === 'fraca' ? 'text-neutral-500' :
                          'text-red-600'
                        }`}>
                          {t(`quality.${recurso.qualidadeRelacao}`)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4">
                      <p className="text-xs text-neutral-500 mb-2">{t('flow.label')}</p>
                      <span className="text-base font-medium dark:text-white">
                        {t(`flow.${recurso.direcaoFluxo}`)}
                      </span>
                    </div>

                    {recurso.notas && (
                      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4">
                        <p className="text-xs text-neutral-500 mb-2">{t('notes')}</p>
                        <p className="text-sm dark:text-neutral-300">{recurso.notas}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4 border-t dark:border-neutral-800">
                    <button
                      onClick={() => { setEditingRecurso(recurso); setShowEditModal(true); }}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      {t('actions.edit')}
                    </button>
                    <button
                      onClick={() => removerRecurso(recurso.id)}
                      className="px-4 py-2.5 bg-red-50 dark:bg-red-900/30 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Legenda */}
      <div className="fixed bottom-4 left-4 bg-white/95 dark:bg-neutral-800/95 backdrop-blur rounded-2xl shadow-xl p-4 text-xs border border-cyan-100 dark:border-neutral-700">
        <p className="font-bold mb-3 dark:text-white text-sm">{t('legend.title')}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-1.5 bg-green-500 rounded-full" />
            <span className="dark:text-neutral-300">{t('legend.strong')}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 bg-blue-500 rounded-full" />
            <span className="dark:text-neutral-300">{t('legend.moderate')}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 border-t-2 border-dashed border-neutral-400" />
            <span className="dark:text-neutral-300">{t('legend.weak')}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 bg-red-500 rounded-full" />
            <span className="dark:text-neutral-300">{t('legend.stressful')}</span>
          </div>
        </div>
      </div>

      {/* Modal Adicionar Recurso */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-auto">
            <div className="p-5 border-b dark:border-neutral-800 flex items-center justify-between sticky top-0 bg-white dark:bg-neutral-900">
              <h2 className="text-xl font-bold dark:text-white">{t('modal.addResource')}</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {tiposRecurso.map(tipo => (
                <button
                  key={tipo.tipo}
                  onClick={() => adicionarRecurso(tipo.tipo)}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-transparent hover:border-cyan-500 transition-all hover:shadow-lg group"
                  style={{ backgroundColor: tipo.corClara }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: tipo.cor }}
                  >
                    <tipo.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs text-center font-medium dark:text-neutral-900">{t(tipo.nameKey)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Recurso */}
      {showEditModal && editingRecurso && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl w-full max-w-md">
            <div className="p-5 border-b dark:border-neutral-800 flex items-center justify-between">
              <h2 className="text-xl font-bold dark:text-white">{t('modal.editResource')}</h2>
              <button onClick={() => { setShowEditModal(false); setEditingRecurso(null); }} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">{t('modal.name')}</label>
                <input
                  type="text"
                  value={editingRecurso.nome}
                  onChange={e => setEditingRecurso({...editingRecurso, nome: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">{t('quality.label')}</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'forte', cor: '#22c55e' },
                    { value: 'moderada', cor: '#3b82f6' },
                    { value: 'fraca', cor: '#94a3b8' },
                    { value: 'estressante', cor: '#ef4444' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setEditingRecurso({...editingRecurso, qualidadeRelacao: opt.value as Recurso['qualidadeRelacao']})}
                      className={`px-4 py-3 rounded-xl text-left font-medium flex items-center gap-2 transition-all border-2 ${
                        editingRecurso.qualidadeRelacao === opt.value
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: opt.cor }} />
                      <span className="text-sm">{t(`quality.${opt.value}`)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">{t('flow.label')}</label>
                <select
                  value={editingRecurso.direcaoFluxo}
                  onChange={e => setEditingRecurso({...editingRecurso, direcaoFluxo: e.target.value as Recurso['direcaoFluxo']})}
                  className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 dark:text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="bidirecional">{t('flow.bidirecional')}</option>
                  <option value="entrada">{t('flow.entrada')}</option>
                  <option value="saida">{t('flow.saida')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">{t('notes')}</label>
                <textarea
                  value={editingRecurso.notas || ''}
                  onChange={e => setEditingRecurso({...editingRecurso, notas: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 dark:text-white focus:border-cyan-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder={t('modal.notesPlaceholder')}
                />
              </div>
            </div>

            <div className="p-5 border-t dark:border-neutral-800 flex gap-3">
              <button
                onClick={() => { setShowEditModal(false); setEditingRecurso(null); }}
                className="flex-1 px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                {t('actions.cancel')}
              </button>
              <button
                onClick={() => atualizarRecurso(editingRecurso)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                {t('actions.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
