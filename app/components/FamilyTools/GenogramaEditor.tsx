'use client';

import { useState, useCallback, useRef } from 'react';
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
  UserPlus, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw,
  Heart,
  HeartCrack,
  Users,
  Baby,
  Skull,
  AlertTriangle,
  Circle,
  Square,
  X
} from 'lucide-react';

// Tipos de pessoa no genograma
type Sexo = 'masculino' | 'feminino' | 'outro';
type EstadoVital = 'vivo' | 'falecido';
type TipoRelacionamento = 'casamento' | 'uniao_estavel' | 'separado' | 'divorciado';

interface PessoaData {
  nome: string;
  idade?: number;
  sexo: Sexo;
  estadoVital: EstadoVital;
  condicoes?: string[];
  isPacienteIndice?: boolean;
  anoNascimento?: number;
  anoFalecimento?: number;
  observacoes?: string;
  [key: string]: unknown;
}

// Custom node type for xyflow
type PessoaNode = Node<PessoaData, 'pessoa'>;

// Símbolos do genograma
const GenogramaPessoaComponent = ({ data }: NodeProps<PessoaNode>) => {
  const { nome, idade, sexo, estadoVital, condicoes, isPacienteIndice } = data;
  
  const baseSize = 50;
  const isDeceased = estadoVital === 'falecido';
  
  return (
    <div className="relative flex flex-col items-center">
      {/* Símbolo principal */}
      <div 
        className={`relative flex items-center justify-center ${
          isPacienteIndice ? 'ring-4 ring-blue-500 ring-offset-2' : ''
        }`}
        style={{ width: baseSize, height: baseSize }}
      >
        {sexo === 'masculino' ? (
          <div 
            className={`w-full h-full border-2 ${
              isDeceased ? 'bg-neutral-300 dark:bg-neutral-600' : 'bg-blue-100 dark:bg-blue-900'
            } border-neutral-800 dark:border-neutral-200`}
          />
        ) : sexo === 'feminino' ? (
          <div 
            className={`w-full h-full rounded-full border-2 ${
              isDeceased ? 'bg-neutral-300 dark:bg-neutral-600' : 'bg-pink-100 dark:bg-pink-900'
            } border-neutral-800 dark:border-neutral-200`}
          />
        ) : (
          <div 
            className={`w-full h-full border-2 rotate-45 ${
              isDeceased ? 'bg-neutral-300 dark:bg-neutral-600' : 'bg-purple-100 dark:bg-purple-900'
            } border-neutral-800 dark:border-neutral-200`}
          />
        )}
        
        {/* X para falecido */}
        {isDeceased && (
          <X className="absolute w-8 h-8 text-red-600 dark:text-red-400" strokeWidth={3} />
        )}
        
        {/* Indicadores de condições */}
        {condicoes && condicoes.length > 0 && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{condicoes.length}</span>
          </div>
        )}
      </div>
      
      {/* Nome e idade */}
      <div className="mt-2 text-center max-w-20">
        <p className="text-xs font-medium truncate">{nome || 'Sem nome'}</p>
        {idade && <p className="text-xs text-neutral-500">{idade} anos</p>}
      </div>
    </div>
  );
};

// Tipos de nó customizados
const nodeTypes = {
  pessoa: GenogramaPessoaComponent,
};

// Estado inicial
const initialNodes: PessoaNode[] = [
  {
    id: 'paciente',
    type: 'pessoa',
    position: { x: 250, y: 200 },
    data: { 
      nome: 'Paciente Índice', 
      idade: 35, 
      sexo: 'masculino', 
      estadoVital: 'vivo',
      isPacienteIndice: true,
      condicoes: ['Hipertensão']
    }
  }
];

const initialEdges: Edge[] = [];

export default function GenogramaEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState<PessoaNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<PessoaNode | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  
  // Form state para novo membro
  const [novoMembro, setNovoMembro] = useState<Partial<PessoaData>>({
    nome: '',
    idade: undefined,
    sexo: 'masculino',
    estadoVital: 'vivo',
    condicoes: [],
  });
  const [novaCondicao, setNovaCondicao] = useState('');

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({
        ...params,
        type: 'smoothstep',
        style: { strokeWidth: 2 },
        markerEnd: { type: MarkerType.Arrow },
      }, eds));
    },
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: PessoaNode) => {
    setSelectedNode(node);
  }, []);

  const addPessoa = () => {
    const newId = `pessoa-${Date.now()}`;
    const newNode: PessoaNode = {
      id: newId,
      type: 'pessoa',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: {
        nome: novoMembro.nome || 'Novo Membro',
        idade: novoMembro.idade,
        sexo: novoMembro.sexo || 'masculino',
        estadoVital: novoMembro.estadoVital || 'vivo',
        condicoes: novoMembro.condicoes || [],
      }
    };
    setNodes((nds) => [...nds, newNode]);
    setShowAddModal(false);
    setNovoMembro({ nome: '', idade: undefined, sexo: 'masculino', estadoVital: 'vivo', condicoes: [] });
  };

  const deleteSelected = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter(n => n.id !== selectedNode.id));
      setEdges((eds) => eds.filter(e => e.source !== selectedNode.id && e.target !== selectedNode.id));
      setSelectedNode(null);
    }
  };

  const addCondicaoToMembro = () => {
    if (novaCondicao.trim()) {
      setNovoMembro(prev => ({
        ...prev,
        condicoes: [...(prev.condicoes || []), novaCondicao.trim()]
      }));
      setNovaCondicao('');
    }
  };

  const exportGenograma = async (format: 'json' | 'svg' | 'png' = 'json') => {
    if (!reactFlowInstance) return;

    if (format === 'json') {
      const flow = reactFlowInstance.toObject();
      const dataStr = JSON.stringify(flow, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', 'genograma.json');
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
        downloadSVG(svgString, 'genograma.svg');
      } else if (format === 'png') {
        // Use html2canvas for better quality with React Flow
        const pngDataURL = await reactFlowToPNG(reactFlowElement, { backgroundColor: '#ffffff' });
        downloadPNG(pngDataURL, 'genograma.png');
      }
    } catch (error) {
      console.error('Error exporting genograma:', error);
      alert('Erro ao exportar genograma. Tente novamente.');
    }
  };

  const resetGenograma = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedNode(null);
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
        onInit={setReactFlowInstance as any}
        nodeTypes={nodeTypes}
        fitView
        className="bg-neutral-50 dark:bg-neutral-800"
      >
        <Background color="#94a3b8" gap={20} />
        <Controls className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700" />
        
        {/* Toolbar */}
        <Panel position="top-left" className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-lg"
          >
            <UserPlus className="w-4 h-4" />
            Adicionar
          </button>
          
          {selectedNode && (
            <button
              onClick={deleteSelected}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
              Remover
            </button>
          )}
          
          <div className="relative group">
            <button
              onClick={() => exportGenograma('png')}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium shadow-lg"
            >
              <Download className="w-4 h-4" />
              Exportar PNG
            </button>
            {/* Dropdown menu */}
            <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 z-50 min-w-[120px]">
              <button
                onClick={() => exportGenograma('png')}
                className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-t-lg"
              >
                PNG
              </button>
              <button
                onClick={() => exportGenograma('svg')}
                className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700"
              >
                SVG
              </button>
              <button
                onClick={() => exportGenograma('json')}
                className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-b-lg"
              >
                JSON
              </button>
            </div>
          </div>
          
          <button
            onClick={resetGenograma}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 text-sm font-medium shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            Resetar
          </button>
        </Panel>
        
        {/* Legenda */}
        <Panel position="bottom-left" className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
          <h4 className="text-xs font-bold mb-2 text-neutral-600 dark:text-neutral-400">LEGENDA</h4>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4 text-blue-500" />
              <span>Masculino</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-pink-500" />
              <span>Feminino</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-red-500" />
              <span>Falecido</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 ring-2 ring-blue-500 rounded-sm"></div>
              <span>Paciente Índice</span>
            </div>
          </div>
        </Panel>
        
        {/* Info do nó selecionado */}
        {selectedNode && (
          <Panel position="top-right" className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 w-64">
            <h4 className="font-bold mb-2">{selectedNode.data.nome}</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-neutral-500">Idade:</span> {selectedNode.data.idade || 'N/D'}</p>
              <p><span className="text-neutral-500">Sexo:</span> {selectedNode.data.sexo}</p>
              <p><span className="text-neutral-500">Status:</span> {selectedNode.data.estadoVital}</p>
              {selectedNode.data.condicoes && selectedNode.data.condicoes.length > 0 && (
                <div>
                  <span className="text-neutral-500">Condições:</span>
                  <ul className="mt-1 space-y-0.5">
                    {selectedNode.data.condicoes.map((c, i) => (
                      <li key={i} className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Panel>
        )}
      </ReactFlow>
      
      {/* Modal Adicionar Pessoa */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-2xl w-full max-w-md border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-bold mb-4">Adicionar Membro da Família</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  value={novoMembro.nome || ''}
                  onChange={(e) => setNovoMembro(prev => ({ ...prev, nome: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                  placeholder="Nome do familiar"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Idade</label>
                  <input
                    type="number"
                    value={novoMembro.idade || ''}
                    onChange={(e) => setNovoMembro(prev => ({ ...prev, idade: parseInt(e.target.value) || undefined }))}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                    placeholder="Idade"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Sexo</label>
                  <select
                    value={novoMembro.sexo}
                    onChange={(e) => setNovoMembro(prev => ({ ...prev, sexo: e.target.value as Sexo }))}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                  >
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Estado Vital</label>
                <select
                  value={novoMembro.estadoVital}
                  onChange={(e) => setNovoMembro(prev => ({ ...prev, estadoVital: e.target.value as EstadoVital }))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                >
                  <option value="vivo">Vivo</option>
                  <option value="falecido">Falecido</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Condições de Saúde</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={novaCondicao}
                    onChange={(e) => setNovaCondicao(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                    placeholder="Ex: Diabetes, HAS..."
                    onKeyPress={(e) => e.key === 'Enter' && addCondicaoToMembro()}
                  />
                  <button
                    onClick={addCondicaoToMembro}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    +
                  </button>
                </div>
                {novoMembro.condicoes && novoMembro.condicoes.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {novoMembro.condicoes.map((c, i) => (
                      <span key={i} className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded-full">
                        {c}
                        <button
                          onClick={() => setNovoMembro(prev => ({
                            ...prev,
                            condicoes: prev.condicoes?.filter((_, idx) => idx !== i)
                          }))}
                          className="ml-1 hover:text-red-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
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
                onClick={addPessoa}
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

