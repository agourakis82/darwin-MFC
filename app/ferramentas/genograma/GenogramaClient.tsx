'use client';

import { useState, useCallback, useRef } from 'react';
import { 
  Users, Plus, Trash2, Download, Upload, ZoomIn, ZoomOut, 
  RotateCcw, Save, Square, Circle, Heart, HeartCrack, 
  X, Minus, AlertTriangle, Baby, Skull, Image, FileJson
} from 'lucide-react';

// Tipos para o Genograma
interface Pessoa {
  id: string;
  nome: string;
  sexo: 'masculino' | 'feminino';
  dataNascimento?: string;
  dataObito?: string;
  vivo: boolean;
  pacienteIndice: boolean;
  condicoes: string[];
  x: number;
  y: number;
}

interface Relacionamento {
  id: string;
  pessoa1Id: string;
  pessoa2Id: string;
  tipo: 'casamento' | 'uniao_estavel' | 'separacao' | 'divorcio' | 'filho' | 'gemeos' | 'adocao';
}

const condicoesComuns = [
  'Hipertensão', 'Diabetes', 'Câncer', 'Doença cardíaca', 'AVC', 
  'Depressão', 'Ansiedade', 'Alcoolismo', 'Tabagismo', 'Obesidade',
  'Asma', 'DPOC', 'Alzheimer', 'Parkinson', 'Esquizofrenia',
  'Transtorno Bipolar', 'Epilepsia', 'Doença renal', 'Artrite'
];

export default function GenogramaClient() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [relacionamentos, setRelacionamentos] = useState<Relacionamento[]>([]);
  const [selectedPessoa, setSelectedPessoa] = useState<string | null>(null);
  const [modo, setModo] = useState<'selecionar' | 'adicionar' | 'relacionamento'>('selecionar');
  const [zoom, setZoom] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingPessoa, setEditingPessoa] = useState<Pessoa | null>(null);
  const [relacionamentoTemp, setRelacionamentoTemp] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Adicionar pessoa
  const adicionarPessoa = useCallback((x: number, y: number) => {
    const novaPessoa: Pessoa = {
      id: `pessoa-${Date.now()}`,
      nome: 'Nova Pessoa',
      sexo: 'masculino',
      vivo: true,
      pacienteIndice: pessoas.length === 0,
      condicoes: [],
      x,
      y
    };
    setPessoas(prev => [...prev, novaPessoa]);
    setEditingPessoa(novaPessoa);
    setShowModal(true);
  }, [pessoas.length]);

  // Remover pessoa
  const removerPessoa = useCallback((id: string) => {
    setPessoas(prev => prev.filter(p => p.id !== id));
    setRelacionamentos(prev => prev.filter(r => r.pessoa1Id !== id && r.pessoa2Id !== id));
    setSelectedPessoa(null);
  }, []);

  // Atualizar pessoa
  const atualizarPessoa = useCallback((pessoa: Pessoa) => {
    setPessoas(prev => prev.map(p => p.id === pessoa.id ? pessoa : p));
    setShowModal(false);
    setEditingPessoa(null);
  }, []);

  // Adicionar relacionamento
  const adicionarRelacionamento = useCallback((pessoa1Id: string, pessoa2Id: string, tipo: Relacionamento['tipo']) => {
    const novoRel: Relacionamento = {
      id: `rel-${Date.now()}`,
      pessoa1Id,
      pessoa2Id,
      tipo
    };
    setRelacionamentos(prev => [...prev, novoRel]);
    setRelacionamentoTemp(null);
  }, []);

  // Handle click no canvas
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (modo === 'adicionar') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top) / zoom;
      adicionarPessoa(x, y);
      setModo('selecionar');
    }
  }, [modo, zoom, adicionarPessoa]);

  // Handle click em pessoa
  const handlePessoaClick = useCallback((e: React.MouseEvent, pessoa: Pessoa) => {
    e.stopPropagation();
    
    if (modo === 'relacionamento') {
      if (relacionamentoTemp) {
        if (relacionamentoTemp !== pessoa.id) {
          adicionarRelacionamento(relacionamentoTemp, pessoa.id, 'casamento');
        }
        setRelacionamentoTemp(null);
        setModo('selecionar');
      } else {
        setRelacionamentoTemp(pessoa.id);
      }
    } else {
      setSelectedPessoa(pessoa.id);
    }
  }, [modo, relacionamentoTemp, adicionarRelacionamento]);

  // Exportar genograma como JSON
  const exportarGenograma = useCallback(() => {
    const data = { pessoas, relacionamentos, versao: '1.0' };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `genograma-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [pessoas, relacionamentos]);

  // Exportar genograma como imagem PNG
  const exportarComoImagem = useCallback(async () => {
    if (!canvasRef.current) return;
    
    try {
      // Importar html2canvas dinamicamente
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Alta resolução
        useCORS: true,
        logging: false,
      });
      
      // Converter para PNG e baixar
      const link = document.createElement('a');
      link.download = `genograma-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      // Fallback: usar método nativo se html2canvas não estiver disponível
      console.warn('html2canvas não disponível, usando método alternativo');
      alert('Para exportar como imagem, use Print Screen ou ferramenta de captura.');
    }
  }, []);

  // Importar genograma
  const importarGenograma = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          setPessoas(data.pessoas || []);
          setRelacionamentos(data.relacionamentos || []);
        } catch (err) {
          alert('Erro ao importar arquivo');
        }
      };
      reader.readAsText(file);
    }
  }, []);

  // Limpar tudo
  const limparTudo = useCallback(() => {
    if (confirm('Tem certeza que deseja limpar o genograma?')) {
      setPessoas([]);
      setRelacionamentos([]);
      setSelectedPessoa(null);
    }
  }, []);

  // Renderizar símbolo da pessoa
  const renderPessoa = (pessoa: Pessoa) => {
    const isSelected = selectedPessoa === pessoa.id;
    const isTemp = relacionamentoTemp === pessoa.id;
    const size = 50;
    
    return (
      <div
        key={pessoa.id}
        className={`absolute cursor-pointer transition-all ${isSelected ? 'ring-4 ring-blue-500' : ''} ${isTemp ? 'ring-4 ring-green-500' : ''}`}
        style={{ 
          left: pessoa.x - size/2, 
          top: pessoa.y - size/2,
          transform: `scale(${zoom})`
        }}
        onClick={(e) => handlePessoaClick(e, pessoa)}
        onDoubleClick={() => { setEditingPessoa(pessoa); setShowModal(true); }}
      >
        {/* Símbolo */}
        <div className={`
          ${pessoa.sexo === 'masculino' ? 'w-12 h-12' : 'w-12 h-12 rounded-full'}
          ${pessoa.sexo === 'masculino' ? '' : ''}
          ${pessoa.vivo ? 'bg-white' : 'bg-neutral-300'}
          ${pessoa.pacienteIndice ? 'border-4 border-blue-600' : 'border-2 border-neutral-800'}
          flex items-center justify-center relative
          dark:bg-neutral-800 dark:border-neutral-400
        `}>
          {pessoa.sexo === 'masculino' ? (
            <Square className={`w-10 h-10 ${pessoa.vivo ? 'text-blue-600' : 'text-neutral-500'}`} fill={pessoa.vivo ? 'white' : '#ccc'} />
          ) : (
            <Circle className={`w-10 h-10 ${pessoa.vivo ? 'text-pink-600' : 'text-neutral-500'}`} fill={pessoa.vivo ? 'white' : '#ccc'} />
          )}
          
          {/* X para óbito */}
          {!pessoa.vivo && (
            <X className="absolute w-8 h-8 text-red-600" strokeWidth={3} />
          )}
          
          {/* Indicador de condições */}
          {pessoa.condicoes.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              {pessoa.condicoes.length}
            </div>
          )}
        </div>
        
        {/* Nome */}
        <div className="text-center mt-1 text-xs font-medium max-w-20 truncate dark:text-white">
          {pessoa.nome}
        </div>
        
        {/* Idade/Ano */}
        {pessoa.dataNascimento && (
          <div className="text-center text-xs text-neutral-500">
            {pessoa.vivo 
              ? `${new Date().getFullYear() - new Date(pessoa.dataNascimento).getFullYear()}a`
              : pessoa.dataObito 
                ? `${new Date(pessoa.dataNascimento).getFullYear()}-${new Date(pessoa.dataObito).getFullYear()}`
                : new Date(pessoa.dataNascimento).getFullYear()
            }
          </div>
        )}
      </div>
    );
  };

  // Renderizar linha de relacionamento
  const renderRelacionamento = (rel: Relacionamento) => {
    const p1 = pessoas.find(p => p.id === rel.pessoa1Id);
    const p2 = pessoas.find(p => p.id === rel.pessoa2Id);
    if (!p1 || !p2) return null;

    const lineStyle = {
      stroke: rel.tipo === 'divorcio' || rel.tipo === 'separacao' ? '#ef4444' : '#333',
      strokeWidth: rel.tipo === 'filho' || rel.tipo === 'adocao' ? 1 : 2,
      strokeDasharray: rel.tipo === 'uniao_estavel' ? '5,5' : rel.tipo === 'adocao' ? '3,3' : 'none'
    };

    return (
      <line
        key={rel.id}
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        {...lineStyle}
        className="dark:stroke-neutral-400"
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold dark:text-white">Genograma Familiar</h1>
              <p className="text-sm text-neutral-500">Ferramenta de Avaliação Familiar</p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Modo */}
            <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
              <button
                onClick={() => setModo('selecionar')}
                className={`px-3 py-1.5 rounded-md text-sm transition-all ${modo === 'selecionar' ? 'bg-white dark:bg-neutral-700 shadow' : ''}`}
              >
                Selecionar
              </button>
              <button
                onClick={() => setModo('adicionar')}
                className={`px-3 py-1.5 rounded-md text-sm transition-all ${modo === 'adicionar' ? 'bg-white dark:bg-neutral-700 shadow' : ''}`}
              >
                <Plus className="w-4 h-4 inline mr-1" />
                Pessoa
              </button>
              <button
                onClick={() => setModo('relacionamento')}
                className={`px-3 py-1.5 rounded-md text-sm transition-all ${modo === 'relacionamento' ? 'bg-white dark:bg-neutral-700 shadow' : ''}`}
              >
                <Heart className="w-4 h-4 inline mr-1" />
                Relação
              </button>
            </div>

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
              <button onClick={exportarGenograma} className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 rounded-lg" title="Exportar JSON">
                <FileJson className="w-5 h-5" />
              </button>
              <label className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer" title="Importar JSON">
                <Upload className="w-5 h-5" />
                <input type="file" accept=".json" onChange={importarGenograma} className="hidden" />
              </label>
              <button onClick={limparTudo} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded-lg" title="Limpar Tudo">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex">
        {/* Área de desenho */}
        <div 
          ref={canvasRef}
          className="flex-1 h-[calc(100vh-140px)] relative overflow-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 m-4 rounded-xl"
          onClick={handleCanvasClick}
          style={{ cursor: modo === 'adicionar' ? 'crosshair' : 'default' }}
        >
          {/* Grid de fundo */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />

          {/* SVG para linhas */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {relacionamentos.map(renderRelacionamento)}
          </svg>

          {/* Pessoas */}
          {pessoas.map(renderPessoa)}

          {/* Instruções se vazio */}
          {pessoas.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8 bg-neutral-50 dark:bg-neutral-800 rounded-2xl">
                <Users className="w-16 h-16 mx-auto mb-4 text-neutral-300" />
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Comece seu Genograma</h3>
                <p className="text-neutral-500 mb-4">Clique em "Pessoa" e depois no canvas para adicionar membros da família</p>
                <div className="flex gap-4 justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5 text-blue-600" /> Homem
                  </div>
                  <div className="flex items-center gap-2">
                    <Circle className="w-5 h-5 text-pink-600" /> Mulher
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Pessoa selecionada */}
        {selectedPessoa && (
          <div className="w-72 bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700 p-4 overflow-auto">
            {(() => {
              const pessoa = pessoas.find(p => p.id === selectedPessoa);
              if (!pessoa) return null;
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold dark:text-white">{pessoa.nome}</h3>
                    <button onClick={() => setSelectedPessoa(null)} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p><strong>Sexo:</strong> {pessoa.sexo === 'masculino' ? 'Masculino' : 'Feminino'}</p>
                    <p><strong>Status:</strong> {pessoa.vivo ? 'Vivo' : 'Falecido'}</p>
                    {pessoa.dataNascimento && <p><strong>Nascimento:</strong> {pessoa.dataNascimento}</p>}
                    {!pessoa.vivo && pessoa.dataObito && <p><strong>Óbito:</strong> {pessoa.dataObito}</p>}
                    {pessoa.pacienteIndice && <p className="text-blue-600 font-semibold">👤 Paciente Índice</p>}
                  </div>

                  {pessoa.condicoes.length > 0 && (
                    <div>
                      <p className="font-semibold mb-2 dark:text-white">Condições:</p>
                      <div className="flex flex-wrap gap-1">
                        {pessoa.condicoes.map(c => (
                          <span key={c} className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-xs">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t dark:border-neutral-700">
                    <button 
                      onClick={() => { setEditingPessoa(pessoa); setShowModal(true); }}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => removerPessoa(pessoa.id)}
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
        <p className="font-bold mb-2 dark:text-white">Legenda</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1"><Square className="w-4 h-4 text-blue-600" /> Homem</div>
          <div className="flex items-center gap-1"><Circle className="w-4 h-4 text-pink-600" /> Mulher</div>
          <div className="flex items-center gap-1"><X className="w-4 h-4 text-red-600" /> Falecido</div>
          <div className="flex items-center gap-1"><Minus className="w-4 h-4" /> Casamento</div>
        </div>
      </div>

      {/* Modal de edição */}
      {showModal && editingPessoa && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-auto">
            <div className="p-4 border-b dark:border-neutral-700 flex items-center justify-between">
              <h2 className="text-lg font-bold dark:text-white">Editar Pessoa</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Nome</label>
                <input
                  type="text"
                  value={editingPessoa.nome}
                  onChange={e => setEditingPessoa({...editingPessoa, nome: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">Sexo</label>
                  <select
                    value={editingPessoa.sexo}
                    onChange={e => setEditingPessoa({...editingPessoa, sexo: e.target.value as 'masculino' | 'feminino'})}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                  >
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">Status</label>
                  <select
                    value={editingPessoa.vivo ? 'vivo' : 'falecido'}
                    onChange={e => setEditingPessoa({...editingPessoa, vivo: e.target.value === 'vivo'})}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                  >
                    <option value="vivo">Vivo</option>
                    <option value="falecido">Falecido</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">Nascimento</label>
                  <input
                    type="date"
                    value={editingPessoa.dataNascimento || ''}
                    onChange={e => setEditingPessoa({...editingPessoa, dataNascimento: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                  />
                </div>
                {!editingPessoa.vivo && (
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-white">Óbito</label>
                    <input
                      type="date"
                      value={editingPessoa.dataObito || ''}
                      onChange={e => setEditingPessoa({...editingPessoa, dataObito: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pacienteIndice"
                  checked={editingPessoa.pacienteIndice}
                  onChange={e => setEditingPessoa({...editingPessoa, pacienteIndice: e.target.checked})}
                  className="w-4 h-4"
                />
                <label htmlFor="pacienteIndice" className="text-sm dark:text-white">Paciente Índice (probando)</label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Condições de Saúde</label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-auto">
                  {condicoesComuns.map(cond => (
                    <button
                      key={cond}
                      onClick={() => {
                        const hasCondition = editingPessoa.condicoes.includes(cond);
                        setEditingPessoa({
                          ...editingPessoa,
                          condicoes: hasCondition 
                            ? editingPessoa.condicoes.filter(c => c !== cond)
                            : [...editingPessoa.condicoes, cond]
                        });
                      }}
                      className={`px-2 py-1 text-xs rounded-lg border transition-all ${
                        editingPessoa.condicoes.includes(cond)
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600'
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t dark:border-neutral-700 flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:border-neutral-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => atualizarPessoa(editingPessoa)}
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

