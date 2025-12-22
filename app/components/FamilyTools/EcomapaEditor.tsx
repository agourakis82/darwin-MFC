'use client';

import { useState, useCallback } from 'react';
import {
  ReactFlow,
  type Node,
  type Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  MarkerType,
  Panel,
  type ReactFlowInstance,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  Plus, 
  Trash2, 
  Download, 
  RotateCcw,
  Home,
  Building2,
  Users,
  Heart,
  Church,
  GraduationCap,
  Briefcase,
  Activity,
  Car,
  ShoppingBag,
  Dumbbell,
  Music,
  Leaf,
  HelpCircle
} from 'lucide-react';

// Tipos de recurso/sistema no ecomapa
type TipoRecurso = 
  | 'familia' 
  | 'trabalho' 
  | 'saude' 
  | 'educacao' 
  | 'religiao' 
  | 'lazer' 
  | 'vizinhanca' 
  | 'amigos'
  | 'servicos_sociais'
  | 'transporte'
  | 'outro';

type TipoVinculo = 'forte' | 'moderado' | 'fraco' | 'estressante' | 'rompido';

interface RecursoData {
  nome: string;
  tipo: TipoRecurso;
  descricao?: string;
  isFamilia?: boolean;
  [key: string]: unknown;
}

// Ícones por tipo
const tipoIcones: Record<TipoRecurso, React.ElementType> = {
  familia: Home,
  trabalho: Briefcase,
  saude: Activity,
  educacao: GraduationCap,
  religiao: Church,
  lazer: Dumbbell,
  vizinhanca: Building2,
  amigos: Users,
  servicos_sociais: Heart,
  transporte: Car,
  outro: HelpCircle,
};

// Cores por tipo
const tipoCores: Record<TipoRecurso, string> = {
  familia: 'bg-blue-500',
  trabalho: 'bg-amber-500',
  saude: 'bg-red-500',
  educacao: 'bg-green-500',
  religiao: 'bg-purple-500',
  lazer: 'bg-pink-500',
  vizinhanca: 'bg-teal-500',
  amigos: 'bg-orange-500',
  servicos_sociais: 'bg-indigo-500',
  transporte: 'bg-cyan-500',
  outro: 'bg-neutral-500',
};

// Custom node type for xyflow
type RecursoNode = Node<RecursoData, 'recurso'>;

// Nó de recurso
const RecursoNodeComponent = ({ data }: NodeProps<RecursoNode>) => {
  const { nome, tipo, isFamilia } = data;
  const Icon = tipoIcones[tipo];
  const corBg = tipoCores[tipo];
  
  if (isFamilia) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full border-4 border-blue-600 bg-blue-100 dark:bg-blue-900 flex items-center justify-center shadow-lg">
          <div className="text-center">
            <Home className="w-8 h-8 text-blue-600 mx-auto" />
            <span className="text-xs font-bold text-blue-800 dark:text-blue-200">FAMÍLIA</span>
          </div>
        </div>
        <p className="mt-2 text-sm font-medium">{nome}</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className={`w-16 h-16 rounded-full ${corBg} flex items-center justify-center shadow-lg`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <p className="mt-2 text-xs font-medium text-center max-w-20 truncate">{nome}</p>
    </div>
  );
};

// Tipos de nó customizados
const nodeTypes = {
  recurso: RecursoNodeComponent,
};

// Estilos de linha por tipo de vínculo
const estilosVinculo: Record<TipoVinculo, { strokeWidth: number; strokeDasharray?: string; stroke: string }> = {
  forte: { strokeWidth: 4, stroke: '#22c55e' },
  moderado: { strokeWidth: 2, stroke: '#3b82f6' },
  fraco: { strokeWidth: 1, strokeDasharray: '5,5', stroke: '#94a3b8' },
  estressante: { strokeWidth: 3, strokeDasharray: '3,3', stroke: '#ef4444' },
  rompido: { strokeWidth: 1, strokeDasharray: '2,8', stroke: '#9ca3af' },
};

// Estado inicial - família no centro
const initialNodes: RecursoNode[] = [
  {
    id: 'familia-central',
    type: 'recurso',
    position: { x: 300, y: 250 },
    data: { nome: 'Família Silva', tipo: 'familia', isFamilia: true }
  }
];

const initialEdges: Edge[] = [];

// Recursos sugeridos para adicionar
const recursosSugeridos: { nome: string; tipo: TipoRecurso }[] = [
  { nome: 'UBS / ESF', tipo: 'saude' },
  { nome: 'Trabalho', tipo: 'trabalho' },
  { nome: 'Igreja', tipo: 'religiao' },
  { nome: 'Escola', tipo: 'educacao' },
  { nome: 'Vizinhos', tipo: 'vizinhanca' },
  { nome: 'Amigos', tipo: 'amigos' },
  { nome: 'CRAS', tipo: 'servicos_sociais' },
  { nome: 'Academia/Esporte', tipo: 'lazer' },
  { nome: 'Transporte Público', tipo: 'transporte' },
];

export default function EcomapaEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState<RecursoNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<RecursoNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  
  // Form state
  const [novoRecurso, setNovoRecurso] = useState<Partial<RecursoData>>({
    nome: '',
    tipo: 'outro',
    descricao: '',
  });
  const [tipoVinculo, setTipoVinculo] = useState<TipoVinculo>('moderado');

  const onConnect = useCallback(
    (params: Connection) => {
      const estilo = estilosVinculo[tipoVinculo];
      setEdges((eds) => addEdge({
        ...params,
        type: 'smoothstep',
        style: estilo,
        animated: tipoVinculo === 'estressante',
        label: tipoVinculo,
        labelStyle: { fontSize: 10, fill: estilo.stroke },
      }, eds));
    },
    [setEdges, tipoVinculo]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: RecursoNode) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  // Posicionar novo recurso em círculo ao redor da família
  const getPositionAroundCenter = (index: number, total: number) => {
    const radius = 180;
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: 300 + radius * Math.cos(angle) - 30,
      y: 250 + radius * Math.sin(angle) - 30,
    };
  };

  const addRecurso = () => {
    const newId = `recurso-${Date.now()}`;
    const currentCount = nodes.length;
    const newNode: RecursoNode = {
      id: newId,
      type: 'recurso',
      position: getPositionAroundCenter(currentCount, currentCount + 5),
      data: {
        nome: novoRecurso.nome || 'Novo Recurso',
        tipo: novoRecurso.tipo || 'outro',
        descricao: novoRecurso.descricao,
      }
    };
    setNodes((nds) => [...nds, newNode]);
    
    // Conectar automaticamente à família
    setEdges((eds) => addEdge({
      id: `edge-${newId}`,
      source: 'familia-central',
      target: newId,
      type: 'smoothstep',
      style: estilosVinculo.moderado,
      label: 'moderado',
      labelStyle: { fontSize: 10, fill: estilosVinculo.moderado.stroke },
    }, eds));
    
    setShowAddModal(false);
    setNovoRecurso({ nome: '', tipo: 'outro', descricao: '' });
  };

  const addSugerido = (sugerido: { nome: string; tipo: TipoRecurso }) => {
    setNovoRecurso({ nome: sugerido.nome, tipo: sugerido.tipo });
    setShowAddModal(true);
  };

  const deleteSelected = () => {
    if (selectedNode && selectedNode.id !== 'familia-central') {
      setNodes((nds) => nds.filter(n => n.id !== selectedNode.id));
      setEdges((eds) => eds.filter(e => e.source !== selectedNode.id && e.target !== selectedNode.id));
      setSelectedNode(null);
    }
    if (selectedEdge) {
      setEdges((eds) => eds.filter(e => e.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  };

  const updateEdgeType = (newType: TipoVinculo) => {
    if (selectedEdge) {
      const estilo = estilosVinculo[newType];
      setEdges((eds) => eds.map(e => 
        e.id === selectedEdge.id 
          ? { 
              ...e, 
              style: estilo, 
              label: newType,
              labelStyle: { fontSize: 10, fill: estilo.stroke },
              animated: newType === 'estressante',
            } 
          : e
      ));
      setSelectedEdge(null);
    }
  };

  const exportEcomapa = async (format: 'json' | 'svg' | 'png' = 'json') => {
    if (!reactFlowInstance) return;

    if (format === 'json') {
      const flow = reactFlowInstance.toObject();
      const dataStr = JSON.stringify(flow, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', 'ecomapa.json');
      link.click();
      return;
    }

    // Export as image (SVG/PNG)
    try {
      const reactFlowElement = document.querySelector('.react-flow') as HTMLElement;
      if (!reactFlowElement) {
        console.error('React Flow element not found');
        return;
      }

      const { reactFlowToPNG, exportReactFlowToSVG, downloadSVG, downloadPNG } = await import('@/lib/utils/family-tools-export');
      
      if (format === 'svg') {
        const svgString = await exportReactFlowToSVG(reactFlowInstance);
        downloadSVG(svgString, 'ecomapa.svg');
      } else if (format === 'png') {
        const pngDataURL = await reactFlowToPNG(reactFlowElement, { backgroundColor: '#ffffff' });
        downloadPNG(pngDataURL, 'ecomapa.png');
      }
    } catch (error) {
      console.error('Error exporting ecomapa:', error);
      alert('Erro ao exportar ecomapa. Tente novamente.');
    }
  };

  const resetEcomapa = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedNode(null);
    setSelectedEdge(null);
  };

  return (
    <div className="h-[600px] w-full bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <ReactFlow
        nodes={nodes as Node[]}
        edges={edges}
        onNodesChange={onNodesChange as any}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick as any}
        onEdgeClick={onEdgeClick}
        onInit={setReactFlowInstance as any}
        nodeTypes={nodeTypes}
        fitView
        className="bg-neutral-50 dark:bg-neutral-800"
      >
        <Background color="#94a3b8" gap={20} />
        <Controls className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700" />
        
        {/* Toolbar */}
        <Panel position="top-left" className="flex gap-2 flex-wrap">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Adicionar Recurso
          </button>
          
          {(selectedNode && selectedNode.id !== 'familia-central') || selectedEdge ? (
            <button
              onClick={deleteSelected}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
              Remover
            </button>
          ) : null}
          
          <div className="relative group">
            <button
              onClick={() => exportEcomapa('png')}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium shadow-lg"
            >
              <Download className="w-4 h-4" />
              Exportar PNG
            </button>
            {/* Dropdown menu */}
            <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 z-50 min-w-[120px]">
              <button
                onClick={() => exportEcomapa('png')}
                className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-t-lg"
              >
                PNG
              </button>
              <button
                onClick={() => exportEcomapa('svg')}
                className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                SVG
              </button>
              <button
                onClick={() => exportEcomapa('json')}
                className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-b-lg"
              >
                JSON
              </button>
            </div>
          </div>
          
          <button
            onClick={resetEcomapa}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 text-sm font-medium shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            Resetar
          </button>
        </Panel>
        
        {/* Seletor de tipo de vínculo */}
        <Panel position="top-right" className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
          <h4 className="text-xs font-bold mb-2 text-neutral-600 dark:text-neutral-400">TIPO DE VÍNCULO</h4>
          <div className="space-y-1.5">
            {(Object.keys(estilosVinculo) as TipoVinculo[]).map((tipo) => (
              <button
                key={tipo}
                onClick={() => setTipoVinculo(tipo)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs ${
                  tipoVinculo === tipo 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                    : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <div 
                  className="w-8 h-0.5"
                  style={{ 
                    backgroundColor: estilosVinculo[tipo].stroke,
                    height: estilosVinculo[tipo].strokeWidth,
                  }}
                />
                <span className="capitalize">{tipo}</span>
              </button>
            ))}
          </div>
        </Panel>
        
        {/* Legenda */}
        <Panel position="bottom-left" className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 max-w-xs">
          <h4 className="text-xs font-bold mb-2 text-neutral-600 dark:text-neutral-400">RECURSOS SUGERIDOS</h4>
          <div className="flex flex-wrap gap-1">
            {recursosSugeridos.map((rec, i) => {
              const Icon = tipoIcones[rec.tipo];
              return (
                <button
                  key={i}
                  onClick={() => addSugerido(rec)}
                  className="flex items-center gap-1 px-2 py-1 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded text-xs"
                >
                  <Icon className="w-3 h-3" />
                  {rec.nome}
                </button>
              );
            })}
          </div>
        </Panel>
        
        {/* Editor de vínculo selecionado */}
        {selectedEdge && (
          <Panel position="bottom-right" className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
            <h4 className="text-xs font-bold mb-2">ALTERAR VÍNCULO</h4>
            <div className="space-y-1">
              {(Object.keys(estilosVinculo) as TipoVinculo[]).map((tipo) => (
                <button
                  key={tipo}
                  onClick={() => updateEdgeType(tipo)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <div 
                    className="w-6"
                    style={{ 
                      backgroundColor: estilosVinculo[tipo].stroke,
                      height: estilosVinculo[tipo].strokeWidth,
                    }}
                  />
                  <span className="capitalize">{tipo}</span>
                </button>
              ))}
            </div>
          </Panel>
        )}
      </ReactFlow>
      
      {/* Modal Adicionar Recurso */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-2xl w-full max-w-md border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-bold mb-4">Adicionar Recurso/Sistema</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  value={novoRecurso.nome || ''}
                  onChange={(e) => setNovoRecurso(prev => ({ ...prev, nome: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                  placeholder="Ex: UBS Centro, Igreja Batista..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select
                  value={novoRecurso.tipo}
                  onChange={(e) => setNovoRecurso(prev => ({ ...prev, tipo: e.target.value as TipoRecurso }))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                >
                  <option value="saude">Saúde</option>
                  <option value="trabalho">Trabalho</option>
                  <option value="educacao">Educação</option>
                  <option value="religiao">Religião</option>
                  <option value="lazer">Lazer/Esporte</option>
                  <option value="vizinhanca">Vizinhança</option>
                  <option value="amigos">Amigos</option>
                  <option value="servicos_sociais">Serviços Sociais</option>
                  <option value="transporte">Transporte</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Descrição (opcional)</label>
                <textarea
                  value={novoRecurso.descricao || ''}
                  onChange={(e) => setNovoRecurso(prev => ({ ...prev, descricao: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                  rows={2}
                  placeholder="Detalhes sobre o recurso..."
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Cancelar
              </button>
              <button
                onClick={addRecurso}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

