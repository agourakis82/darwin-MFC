'use client';

import { useState, useCallback, useRef } from 'react';
import { 
  Network, Plus, Trash2, Download, Upload, ZoomIn, ZoomOut, 
  X, Home, Heart, Briefcase, GraduationCap, Church, Hospital,
  Users, Building, ShieldPlus, Dumbbell, Leaf, Music, Car,
  Phone, AlertTriangle, Image, FileJson
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
  nome: string;
  icon: React.ElementType;
  cor: string;
}

const tiposRecurso: ConfigRecurso[] = [
  { tipo: 'familia', nome: 'Família Extensa', icon: Users, cor: '#ec4899' },
  { tipo: 'amigos', nome: 'Amigos', icon: Heart, cor: '#f43f5e' },
  { tipo: 'trabalho', nome: 'Trabalho', icon: Briefcase, cor: '#3b82f6' },
  { tipo: 'escola', nome: 'Escola/Educação', icon: GraduationCap, cor: '#8b5cf6' },
  { tipo: 'religiao', nome: 'Religião/Espiritualidade', icon: Church, cor: '#a855f7' },
  { tipo: 'saude', nome: 'Serviços de Saúde', icon: Hospital, cor: '#22c55e' },
  { tipo: 'comunidade', nome: 'Comunidade/ONGs', icon: Building, cor: '#06b6d4' },
  { tipo: 'governo', nome: 'Serviços Governamentais', icon: ShieldPlus, cor: '#64748b' },
  { tipo: 'lazer', nome: 'Lazer/Esporte', icon: Dumbbell, cor: '#f97316' },
  { tipo: 'cultura', nome: 'Cultura/Arte', icon: Music, cor: '#eab308' },
  { tipo: 'transporte', nome: 'Transporte', icon: Car, cor: '#78716c' },
  { tipo: 'vizinhanca', nome: 'Vizinhança', icon: Home, cor: '#14b8a6' },
  { tipo: 'outro', nome: 'Outro', icon: Network, cor: '#6b7280' },
];

export default function EcomapaClient() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [selectedRecurso, setSelectedRecurso] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecurso, setEditingRecurso] = useState<Recurso | null>(null);
  const [zoom, setZoom] = useState(1);
  const [nomeFamilia, setNomeFamilia] = useState('Família');
  const canvasRef = useRef<HTMLDivElement>(null);

  // Centro do canvas (família nuclear)
  const centroX = 400;
  const centroY = 300;
  const raioFamilia = 60;

  // Adicionar recurso
  const adicionarRecurso = useCallback((tipo: TipoRecurso) => {
    const config = tiposRecurso.find(t => t.tipo === tipo)!;
    const angulo = (recursos.length * 45) * (Math.PI / 180);
    const distancia = 180 + Math.random() * 50;
    
    const novoRecurso: Recurso = {
      id: `recurso-${Date.now()}`,
      nome: config.nome,
      tipo,
      qualidadeRelacao: 'moderada',
      direcaoFluxo: 'bidirecional',
      x: centroX + Math.cos(angulo) * distancia,
      y: centroY + Math.sin(angulo) * distancia
    };
    
    setRecursos(prev => [...prev, novoRecurso]);
    setShowAddModal(false);
  }, [recursos.length]);

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

  // Drag and drop
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent, recursoId: string) => {
    e.stopPropagation();
    const recurso = recursos.find(r => r.id === recursoId);
    if (recurso) {
      setDragging(recursoId);
      setDragOffset({
        x: e.clientX - recurso.x * zoom,
        y: e.clientY - recurso.y * zoom
      });
    }
  }, [recursos, zoom]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const newX = (e.clientX - dragOffset.x) / zoom;
        const newY = (e.clientY - dragOffset.y) / zoom;
        setRecursos(prev => prev.map(r => 
          r.id === dragging ? { ...r, x: newX, y: newY } : r
        ));
      }
    }
  }, [dragging, dragOffset, zoom]);

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
      console.warn('html2canvas não disponível');
      alert('Para exportar como imagem, use Print Screen ou ferramenta de captura.');
    }
  }, []);

  // Importar ecomapa
  const importarEcomapa = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          setRecursos(data.recursos || []);
          setNomeFamilia(data.nomeFamilia || 'Família');
        } catch (err) {
          alert('Erro ao importar arquivo');
        }
      };
      reader.readAsText(file);
    }
  }, []);

  // Obter estilo da linha baseado na qualidade
  const getLinhaEstilo = (qualidade: Recurso['qualidadeRelacao']) => {
    switch (qualidade) {
      case 'forte': return { strokeWidth: 4, strokeDasharray: 'none', stroke: '#22c55e' };
      case 'moderada': return { strokeWidth: 2, strokeDasharray: 'none', stroke: '#3b82f6' };
      case 'fraca': return { strokeWidth: 1, strokeDasharray: '5,5', stroke: '#94a3b8' };
      case 'estressante': return { strokeWidth: 3, strokeDasharray: 'none', stroke: '#ef4444' };
    }
  };

  // Renderizar recurso
  const renderRecurso = (recurso: Recurso) => {
    const config = tiposRecurso.find(t => t.tipo === recurso.tipo)!;
    const IconComponent = config.icon;
    const isSelected = selectedRecurso === recurso.id;
    
    return (
      <div
        key={recurso.id}
        className={`absolute cursor-move transition-shadow ${isSelected ? 'ring-4 ring-blue-500 ring-offset-2' : ''}`}
        style={{ 
          left: recurso.x * zoom - 30, 
          top: recurso.y * zoom - 30,
        }}
        onMouseDown={(e) => handleMouseDown(e, recurso.id)}
        onClick={(e) => { e.stopPropagation(); setSelectedRecurso(recurso.id); }}
        onDoubleClick={() => { setEditingRecurso(recurso); setShowEditModal(true); }}
      >
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
          style={{ backgroundColor: config.cor }}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <div className="text-center mt-1 text-xs font-medium max-w-20 truncate dark:text-white">
          {recurso.nome}
        </div>
        
        {/* Indicador de relação estressante */}
        {recurso.qualidadeRelacao === 'estressante' && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Network className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold dark:text-white">Ecomapa</h1>
              <p className="text-sm text-neutral-500">Rede de Apoio e Recursos</p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Adicionar Recurso
            </button>

            {/* Zoom */}
            <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
              <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-1.5 hover:bg-white dark:hover:bg-neutral-700 rounded">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-1.5 hover:bg-white dark:hover:bg-neutral-700 rounded">
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button onClick={exportarComoImagem} className="p-2 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 rounded-lg" title="Exportar como Imagem PNG">
                <Image className="w-5 h-5" />
              </button>
              <button onClick={exportarEcomapa} className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 rounded-lg" title="Exportar JSON">
                <FileJson className="w-5 h-5" />
              </button>
              <label className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer" title="Importar JSON">
                <Upload className="w-5 h-5" />
                <input type="file" accept=".json" onChange={importarEcomapa} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex">
        <div 
          ref={canvasRef}
          className="flex-1 h-[calc(100vh-140px)] relative overflow-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 m-4 rounded-xl"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={() => setSelectedRecurso(null)}
        >
          {/* Grid de fundo */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />

          {/* SVG para linhas */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {recursos.map(recurso => {
              const estilo = getLinhaEstilo(recurso.qualidadeRelacao);
              return (
                <g key={`linha-${recurso.id}`}>
                  <line
                    x1={centroX * zoom}
                    y1={centroY * zoom}
                    x2={recurso.x * zoom}
                    y2={recurso.y * zoom}
                    {...estilo}
                  />
                  {/* Seta para direção do fluxo */}
                  {recurso.direcaoFluxo !== 'bidirecional' && (
                    <polygon
                      points="0,-5 10,0 0,5"
                      fill={estilo.stroke}
                      transform={`translate(${
                        recurso.direcaoFluxo === 'entrada' 
                          ? (centroX * zoom + recurso.x * zoom) / 2 - 20
                          : (centroX * zoom + recurso.x * zoom) / 2 + 20
                      }, ${(centroY * zoom + recurso.y * zoom) / 2}) rotate(${
                        Math.atan2(
                          recurso.direcaoFluxo === 'entrada' 
                            ? centroY - recurso.y 
                            : recurso.y - centroY,
                          recurso.direcaoFluxo === 'entrada' 
                            ? centroX - recurso.x 
                            : recurso.x - centroX
                        ) * 180 / Math.PI
                      })`}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Família Nuclear (Centro) */}
          <div
            className="absolute"
            style={{
              left: centroX * zoom - raioFamilia,
              top: centroY * zoom - raioFamilia,
              width: raioFamilia * 2,
              height: raioFamilia * 2
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl border-4 border-white">
              <div className="text-center">
                <Home className="w-8 h-8 text-white mx-auto" />
                <span className="text-white text-xs font-bold">{nomeFamilia}</span>
              </div>
            </div>
          </div>

          {/* Recursos */}
          {recursos.map(renderRecurso)}

          {/* Instruções se vazio */}
          {recursos.length === 0 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                <p className="text-neutral-500 text-sm">Clique em "Adicionar Recurso" para começar</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Recurso selecionado */}
        {selectedRecurso && (
          <div className="w-72 bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700 p-4 overflow-auto">
            {(() => {
              const recurso = recursos.find(r => r.id === selectedRecurso);
              if (!recurso) return null;
              const config = tiposRecurso.find(t => t.tipo === recurso.tipo)!;
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: config.cor }}>
                        <config.icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-bold dark:text-white">{recurso.nome}</h3>
                    </div>
                    <button onClick={() => setSelectedRecurso(null)} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-neutral-500 mb-1">Qualidade da Relação</p>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        recurso.qualidadeRelacao === 'forte' ? 'bg-green-100 text-green-700' :
                        recurso.qualidadeRelacao === 'moderada' ? 'bg-blue-100 text-blue-700' :
                        recurso.qualidadeRelacao === 'fraca' ? 'bg-neutral-100 text-neutral-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {recurso.qualidadeRelacao.charAt(0).toUpperCase() + recurso.qualidadeRelacao.slice(1)}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-neutral-500 mb-1">Fluxo de Recursos</p>
                      <span className="text-sm dark:text-white">
                        {recurso.direcaoFluxo === 'entrada' ? '→ Recebe apoio' :
                         recurso.direcaoFluxo === 'saida' ? '← Dá apoio' :
                         '↔ Troca mútua'}
                      </span>
                    </div>

                    {recurso.notas && (
                      <div>
                        <p className="text-neutral-500 mb-1">Notas</p>
                        <p className="text-sm dark:text-neutral-300">{recurso.notas}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4 border-t dark:border-neutral-700">
                    <button 
                      onClick={() => { setEditingRecurso(recurso); setShowEditModal(true); }}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => removerRecurso(recurso.id)}
                      className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg text-sm hover:bg-red-200"
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
      <div className="fixed bottom-4 left-4 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-3 text-xs">
        <p className="font-bold mb-2 dark:text-white">Legenda das Linhas</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-green-500 rounded"></div>
            <span>Forte</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-blue-500 rounded"></div>
            <span>Moderada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 border-t border-dashed border-neutral-400"></div>
            <span>Fraca</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-red-500 rounded"></div>
            <span>Estressante</span>
          </div>
        </div>
      </div>

      {/* Modal Adicionar */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="p-4 border-b dark:border-neutral-700 flex items-center justify-between">
              <h2 className="text-lg font-bold dark:text-white">Adicionar Recurso</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 grid grid-cols-3 gap-3 max-h-96 overflow-auto">
              {tiposRecurso.map(tipo => (
                <button
                  key={tipo.tipo}
                  onClick={() => adicionarRecurso(tipo.tipo)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-transparent hover:border-blue-500 transition-all hover:shadow-lg"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: tipo.cor }}
                  >
                    <tipo.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-center font-medium dark:text-white">{tipo.nome}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {showEditModal && editingRecurso && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-4 border-b dark:border-neutral-700 flex items-center justify-between">
              <h2 className="text-lg font-bold dark:text-white">Editar Recurso</h2>
              <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Nome</label>
                <input
                  type="text"
                  value={editingRecurso.nome}
                  onChange={e => setEditingRecurso({...editingRecurso, nome: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Qualidade da Relação</label>
                <select
                  value={editingRecurso.qualidadeRelacao}
                  onChange={e => setEditingRecurso({...editingRecurso, qualidadeRelacao: e.target.value as Recurso['qualidadeRelacao']})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                >
                  <option value="forte">Forte (muito apoio)</option>
                  <option value="moderada">Moderada</option>
                  <option value="fraca">Fraca (pouco contato)</option>
                  <option value="estressante">Estressante (conflituosa)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Direção do Fluxo</label>
                <select
                  value={editingRecurso.direcaoFluxo}
                  onChange={e => setEditingRecurso({...editingRecurso, direcaoFluxo: e.target.value as Recurso['direcaoFluxo']})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                >
                  <option value="bidirecional">↔ Bidirecional (troca mútua)</option>
                  <option value="entrada">→ Entrada (família recebe)</option>
                  <option value="saida">← Saída (família dá)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Notas</label>
                <textarea
                  value={editingRecurso.notas || ''}
                  onChange={e => setEditingRecurso({...editingRecurso, notas: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                  rows={3}
                  placeholder="Observações sobre este recurso..."
                />
              </div>
            </div>

            <div className="p-4 border-t dark:border-neutral-700 flex gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:border-neutral-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => atualizarRecurso(editingRecurso)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

