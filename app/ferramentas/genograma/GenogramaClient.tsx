'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Users, Plus, Trash2, Download, Upload, ZoomIn, ZoomOut, 
  RotateCcw, Save, Heart, HeartCrack, 
  X, Minus, AlertTriangle, Baby, Skull, Image, FileJson,
  Move, Link2, Edit3, Info
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
  tipo: TipoRelacionamento;
}

type TipoRelacionamento = 'casamento' | 'uniao_estavel' | 'separacao' | 'divorcio' | 'filho' | 'gemeos' | 'adocao';

const tiposRelacionamento: { tipo: TipoRelacionamento; label: string; cor: string }[] = [
  { tipo: 'casamento', label: 'Casamento', cor: '#22c55e' },
  { tipo: 'uniao_estavel', label: 'União Estável', cor: '#3b82f6' },
  { tipo: 'separacao', label: 'Separação', cor: '#f97316' },
  { tipo: 'divorcio', label: 'Divórcio', cor: '#ef4444' },
  { tipo: 'filho', label: 'Filho(a)', cor: '#8b5cf6' },
  { tipo: 'adocao', label: 'Adoção', cor: '#06b6d4' },
];

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
  const [modo, setModo] = useState<'selecionar' | 'adicionar' | 'relacionamento' | 'mover'>('selecionar');
  const [zoom, setZoom] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingPessoa, setEditingPessoa] = useState<Pessoa | null>(null);
  const [relacionamentoTemp, setRelacionamentoTemp] = useState<string | null>(null);
  const [tipoRelacionamentoAtual, setTipoRelacionamentoAtual] = useState<TipoRelacionamento>('casamento');
  const [showTipoRelModal, setShowTipoRelModal] = useState(false);
  const [pendingRelacionamento, setPendingRelacionamento] = useState<{p1: string, p2: string} | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  
  // Drag state
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Resize observer para tamanho do canvas
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
  const adicionarRelacionamento = useCallback((pessoa1Id: string, pessoa2Id: string, tipo: TipoRelacionamento) => {
    // Verificar se já existe
    const existe = relacionamentos.some(r => 
      (r.pessoa1Id === pessoa1Id && r.pessoa2Id === pessoa2Id) ||
      (r.pessoa1Id === pessoa2Id && r.pessoa2Id === pessoa1Id)
    );
    if (existe) return;
    
    const novoRel: Relacionamento = {
      id: `rel-${Date.now()}`,
      pessoa1Id,
      pessoa2Id,
      tipo
    };
    setRelacionamentos(prev => [...prev, novoRel]);
  }, [relacionamentos]);

  // Handle click no canvas
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (modo === 'adicionar') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top) / zoom;
      adicionarPessoa(x, y);
      setModo('selecionar');
    } else if (modo === 'selecionar') {
      setSelectedPessoa(null);
    }
  }, [modo, zoom, adicionarPessoa]);

  // Handle click em pessoa
  const handlePessoaClick = useCallback((e: React.MouseEvent, pessoa: Pessoa) => {
    e.stopPropagation();
    
    if (modo === 'relacionamento') {
      if (relacionamentoTemp) {
        if (relacionamentoTemp !== pessoa.id) {
          setPendingRelacionamento({ p1: relacionamentoTemp, p2: pessoa.id });
          setShowTipoRelModal(true);
        }
        setRelacionamentoTemp(null);
      } else {
        setRelacionamentoTemp(pessoa.id);
      }
    } else {
      setSelectedPessoa(pessoa.id);
    }
  }, [modo, relacionamentoTemp]);

  // Confirmar tipo de relacionamento
  const confirmarRelacionamento = useCallback(() => {
    if (pendingRelacionamento) {
      adicionarRelacionamento(pendingRelacionamento.p1, pendingRelacionamento.p2, tipoRelacionamentoAtual);
      setPendingRelacionamento(null);
      setShowTipoRelModal(false);
      setModo('selecionar');
    }
  }, [pendingRelacionamento, tipoRelacionamentoAtual, adicionarRelacionamento]);

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent, pessoaId: string) => {
    if (modo === 'mover' || modo === 'selecionar') {
      e.stopPropagation();
      const pessoa = pessoas.find(p => p.id === pessoaId);
      if (pessoa) {
        setDragging(pessoaId);
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          setDragOffset({
            x: e.clientX - (pessoa.x * zoom + rect.left),
            y: e.clientY - (pessoa.y * zoom + rect.top)
          });
        }
      }
    }
  }, [modo, pessoas, zoom]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = (e.clientX - rect.left - dragOffset.x) / zoom;
      const newY = (e.clientY - rect.top - dragOffset.y) / zoom;
      setPessoas(prev => prev.map(p => 
        p.id === dragging ? { ...p, x: Math.max(30, Math.min(newX, canvasSize.width/zoom - 30)), y: Math.max(30, Math.min(newY, canvasSize.height/zoom - 30)) } : p
      ));
    }
  }, [dragging, dragOffset, zoom, canvasSize]);

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

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
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `genograma-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
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

  // Calcular idade
  const calcularIdade = (dataNasc?: string, dataObito?: string) => {
    if (!dataNasc) return null;
    const nascimento = new Date(dataNasc);
    const fim = dataObito ? new Date(dataObito) : new Date();
    return Math.floor((fim.getTime() - nascimento.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  };

  // Renderizar símbolo da pessoa (padrão genograma)
  const renderPessoa = (pessoa: Pessoa) => {
    const isSelected = selectedPessoa === pessoa.id;
    const isTemp = relacionamentoTemp === pessoa.id;
    const isDragging = dragging === pessoa.id;
    const size = 50;
    const idade = calcularIdade(pessoa.dataNascimento, pessoa.dataObito);
    
    return (
      <g
        key={pessoa.id}
        transform={`translate(${pessoa.x * zoom}, ${pessoa.y * zoom})`}
        className={`cursor-${modo === 'mover' ? 'move' : 'pointer'}`}
        onMouseDown={(e: React.MouseEvent<SVGGElement>) => handleMouseDown(e as unknown as React.MouseEvent, pessoa.id)}
        onClick={(e: React.MouseEvent<SVGGElement>) => handlePessoaClick(e as unknown as React.MouseEvent, pessoa)}
        onDoubleClick={() => { setEditingPessoa(pessoa); setShowModal(true); }}
        style={{ transition: isDragging ? 'none' : 'transform 0.1s' }}
      >
        {/* Seleção/Destaque */}
        {(isSelected || isTemp) && (
          <circle 
            r={size/2 + 8} 
            fill="none" 
            stroke={isTemp ? '#22c55e' : '#3b82f6'} 
            strokeWidth={3}
            strokeDasharray={isTemp ? '5,5' : 'none'}
          />
        )}
        
        {/* Símbolo principal */}
        {pessoa.sexo === 'masculino' ? (
          // Quadrado para homem
          <rect
            x={-size/2}
            y={-size/2}
            width={size}
            height={size}
            fill={pessoa.vivo ? '#ffffff' : '#e5e5e5'}
            stroke={pessoa.pacienteIndice ? '#3b82f6' : '#1f2937'}
            strokeWidth={pessoa.pacienteIndice ? 4 : 2}
            className="dark:fill-neutral-800"
          />
        ) : (
          // Círculo para mulher
          <circle
            r={size/2}
            fill={pessoa.vivo ? '#ffffff' : '#e5e5e5'}
            stroke={pessoa.pacienteIndice ? '#ec4899' : '#1f2937'}
            strokeWidth={pessoa.pacienteIndice ? 4 : 2}
            className="dark:fill-neutral-800"
          />
        )}
        
        {/* X para óbito */}
        {!pessoa.vivo && (
          <g stroke="#dc2626" strokeWidth={3}>
            <line x1={-size/2 + 8} y1={-size/2 + 8} x2={size/2 - 8} y2={size/2 - 8} />
            <line x1={size/2 - 8} y1={-size/2 + 8} x2={-size/2 + 8} y2={size/2 - 8} />
          </g>
        )}
        
        {/* Indicador de condições */}
        {pessoa.condicoes.length > 0 && (
          <g transform={`translate(${size/2 - 5}, ${-size/2 + 5})`}>
            <circle r={10} fill="#ef4444" />
            <text 
              textAnchor="middle" 
              dominantBaseline="central" 
              fill="white" 
              fontSize="10" 
              fontWeight="bold"
            >
              {pessoa.condicoes.length}
            </text>
          </g>
        )}
        
        {/* Indicador paciente índice */}
        {pessoa.pacienteIndice && (
          <g transform={`translate(${-size/2 + 5}, ${-size/2 + 5})`}>
            <circle r={8} fill="#3b82f6" />
            <text 
              textAnchor="middle" 
              dominantBaseline="central" 
              fill="white" 
              fontSize="10" 
              fontWeight="bold"
            >
              P
            </text>
          </g>
        )}
        
        {/* Nome */}
        <text 
          y={size/2 + 16} 
          textAnchor="middle" 
          fontSize="12" 
          fontWeight="500"
          className="fill-neutral-900 dark:fill-white"
        >
          {pessoa.nome}
        </text>
        
        {/* Idade */}
        {idade !== null && (
          <text 
            y={size/2 + 30} 
            textAnchor="middle" 
            fontSize="10"
            className="fill-neutral-500"
          >
            {pessoa.vivo ? `${idade}a` : `†${idade}a`}
          </text>
        )}
      </g>
    );
  };

  // Renderizar linha de relacionamento
  const renderRelacionamento = (rel: Relacionamento) => {
    const p1 = pessoas.find(p => p.id === rel.pessoa1Id);
    const p2 = pessoas.find(p => p.id === rel.pessoa2Id);
    if (!p1 || !p2) return null;

    const tipoConfig = tiposRelacionamento.find(t => t.tipo === rel.tipo);
    const cor = tipoConfig?.cor || '#333';
    
    let strokeDasharray = 'none';
    let strokeWidth = 2;
    
    switch (rel.tipo) {
      case 'uniao_estavel':
        strokeDasharray = '8,4';
        break;
      case 'separacao':
        strokeDasharray = '4,4';
        break;
      case 'divorcio':
        strokeDasharray = '2,2';
        strokeWidth = 3;
        break;
      case 'filho':
      case 'adocao':
        strokeWidth = 1.5;
        break;
    }

    const x1 = p1.x * zoom;
    const y1 = p1.y * zoom;
    const x2 = p2.x * zoom;
    const y2 = p2.y * zoom;

    // Para relacionamentos parentais, desenha linha vertical
    if (rel.tipo === 'filho' || rel.tipo === 'adocao') {
      const midY = Math.min(y1, y2) + Math.abs(y2 - y1) / 2;
      return (
        <g key={rel.id}>
          <path
            d={`M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`}
            fill="none"
            stroke={cor}
            strokeWidth={strokeWidth}
            strokeDasharray={rel.tipo === 'adocao' ? '5,3' : 'none'}
          />
        </g>
      );
    }

    // Relacionamento horizontal (casamento, etc)
    return (
      <g key={rel.id}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={cor}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
        />
        {/* Barras para separação/divórcio */}
        {(rel.tipo === 'separacao' || rel.tipo === 'divorcio') && (
          <>
            <line
              x1={(x1 + x2) / 2 - 5}
              y1={(y1 + y2) / 2 - 8}
              x2={(x1 + x2) / 2 + 5}
              y2={(y1 + y2) / 2 + 8}
              stroke={cor}
              strokeWidth={2}
            />
            {rel.tipo === 'divorcio' && (
              <line
                x1={(x1 + x2) / 2 - 10}
                y1={(y1 + y2) / 2 - 8}
                x2={(x1 + x2) / 2}
                y2={(y1 + y2) / 2 + 8}
                stroke={cor}
                strokeWidth={2}
              />
            )}
          </>
        )}
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-purple-950">
      {/* Header */}
      <div className="sticky top-0 z-30 p-4 border-b border-purple-100 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Genograma Familiar
              </h1>
              <p className="text-sm text-neutral-500">Ferramenta de Avaliação Familiar</p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Modo */}
            <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1 shadow-inner">
              {[
                { id: 'selecionar', icon: Edit3, label: 'Selecionar' },
                { id: 'mover', icon: Move, label: 'Mover' },
                { id: 'adicionar', icon: Plus, label: 'Pessoa' },
                { id: 'relacionamento', icon: Link2, label: 'Relação' },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => { setModo(m.id as typeof modo); setRelacionamentoTemp(null); }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                    modo === m.id 
                      ? 'bg-white dark:bg-neutral-700 shadow-md text-purple-600 dark:text-purple-400' 
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                  }`}
                  title={m.label}
                >
                  <m.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              ))}
            </div>

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
                onClick={() => setZoom(z => Math.min(2, z + 0.1))} 
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
                title="Exportar PNG"
              >
                <Image className="w-5 h-5" />
              </button>
              <button 
                onClick={exportarGenograma} 
                className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 rounded-lg transition-colors" 
                title="Exportar JSON"
              >
                <FileJson className="w-5 h-5" />
              </button>
              <label className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg cursor-pointer transition-colors" title="Importar">
                <Upload className="w-5 h-5" />
                <input type="file" accept=".json" onChange={importarGenograma} className="hidden" />
              </label>
              <button 
                onClick={limparTudo} 
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded-lg transition-colors" 
                title="Limpar"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Instrução do modo atual */}
      {modo !== 'selecionar' && (
        <div className="max-w-7xl mx-auto px-4 mt-2">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            modo === 'adicionar' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
            modo === 'relacionamento' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
            'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
          }`}>
            <Info className="w-4 h-4" />
            {modo === 'adicionar' && 'Clique no canvas para adicionar uma pessoa'}
            {modo === 'relacionamento' && (relacionamentoTemp ? 'Clique na segunda pessoa para criar o relacionamento' : 'Clique na primeira pessoa')}
            {modo === 'mover' && 'Arraste as pessoas para reposicioná-las'}
          </div>
        </div>
      )}

      {/* Canvas */}
      <div className="flex p-4 gap-4">
        <div 
          ref={canvasRef}
          className="flex-1 h-[calc(100vh-180px)] relative overflow-hidden bg-white dark:bg-neutral-900 border-2 border-purple-100 dark:border-neutral-800 rounded-2xl shadow-xl"
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: modo === 'adicionar' ? 'crosshair' : modo === 'mover' ? 'grab' : 'default' }}
        >
          {/* Grid de fundo */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `
              linear-gradient(to right, #6b21a8 1px, transparent 1px),
              linear-gradient(to bottom, #6b21a8 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />

          {/* SVG para elementos */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Relacionamentos */}
            {relacionamentos.map(renderRelacionamento)}
            
            {/* Linha temporária durante criação de relacionamento */}
            {relacionamentoTemp && pessoas.find(p => p.id === relacionamentoTemp) && (
              <line
                x1={pessoas.find(p => p.id === relacionamentoTemp)!.x * zoom}
                y1={pessoas.find(p => p.id === relacionamentoTemp)!.y * zoom}
                x2={canvasSize.width / 2}
                y2={canvasSize.height / 2}
                stroke="#22c55e"
                strokeWidth={2}
                strokeDasharray="5,5"
                opacity={0.5}
              />
            )}
            
            {/* Pessoas */}
            {pessoas.map(renderPessoa)}
          </svg>

          {/* Instruções se vazio */}
          {pessoas.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center p-8 bg-white/80 dark:bg-neutral-800/80 backdrop-blur rounded-3xl shadow-2xl border border-purple-100 dark:border-neutral-700 max-w-md">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">Comece seu Genograma</h3>
                <p className="text-neutral-500 mb-6">
                  Clique em <strong>"+ Pessoa"</strong> na barra de ferramentas e depois clique no canvas para adicionar membros da família
                </p>
                <div className="flex gap-6 justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 border-2 border-neutral-800 bg-white" />
                    <span className="text-neutral-600 dark:text-neutral-400">Homem</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-neutral-800 bg-white" />
                    <span className="text-neutral-600 dark:text-neutral-400">Mulher</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Pessoa selecionada */}
        {selectedPessoa && (
          <div className="w-80 bg-white dark:bg-neutral-900 border-2 border-purple-100 dark:border-neutral-800 rounded-2xl p-5 overflow-auto shadow-xl">
            {(() => {
              const pessoa = pessoas.find(p => p.id === selectedPessoa);
              if (!pessoa) return null;
              const idade = calcularIdade(pessoa.dataNascimento, pessoa.dataObito);
              return (
                <div className="space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold dark:text-white">{pessoa.nome}</h3>
                      {pessoa.pacienteIndice && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full mt-1">
                          <Users className="w-3 h-3" /> Paciente Índice
                        </span>
                      )}
                    </div>
                    <button onClick={() => setSelectedPessoa(null)} className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-3">
                      <p className="text-xs text-neutral-500 mb-1">Sexo</p>
                      <p className="font-medium dark:text-white">{pessoa.sexo === 'masculino' ? '♂ Masculino' : '♀ Feminino'}</p>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-3">
                      <p className="text-xs text-neutral-500 mb-1">Status</p>
                      <p className={`font-medium ${pessoa.vivo ? 'text-green-600' : 'text-red-600'}`}>
                        {pessoa.vivo ? '● Vivo' : '✝ Falecido'}
                      </p>
                    </div>
                    {idade !== null && (
                      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-3">
                        <p className="text-xs text-neutral-500 mb-1">Idade</p>
                        <p className="font-medium dark:text-white">{idade} anos</p>
                      </div>
                    )}
                  </div>

                  {pessoa.condicoes.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-2 dark:text-white flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        Condições de Saúde
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {pessoa.condicoes.map(c => (
                          <span key={c} className="px-2.5 py-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-xs font-medium">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t dark:border-neutral-800">
                    <button 
                      onClick={() => { setEditingPessoa(pessoa); setShowModal(true); }}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Editar
                    </button>
                    <button 
                      onClick={() => removerPessoa(pessoa.id)}
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
      <div className="fixed bottom-4 left-4 bg-white/95 dark:bg-neutral-800/95 backdrop-blur rounded-2xl shadow-xl p-4 text-xs border border-purple-100 dark:border-neutral-700">
        <p className="font-bold mb-3 dark:text-white text-sm">Legenda</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-neutral-800 dark:border-neutral-400 bg-white dark:bg-neutral-800" />
            <span className="dark:text-neutral-300">Homem</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border-2 border-neutral-800 dark:border-neutral-400 bg-white dark:bg-neutral-800" />
            <span className="dark:text-neutral-300">Mulher</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="w-4 h-4 text-red-600" />
            <span className="dark:text-neutral-300">Falecido</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-0.5 bg-green-500" />
            <span className="dark:text-neutral-300">Casamento</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 border-t-2 border-dashed border-blue-500" />
            <span className="dark:text-neutral-300">União Estável</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-0.5 bg-red-500" />
            <span className="dark:text-neutral-300">Divórcio</span>
          </div>
        </div>
      </div>

      {/* Modal de edição de pessoa */}
      {showModal && editingPessoa && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="p-5 border-b dark:border-neutral-800 flex items-center justify-between">
              <h2 className="text-xl font-bold dark:text-white">Editar Pessoa</h2>
              <button onClick={() => { setShowModal(false); setEditingPessoa(null); }} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Nome</label>
                <input
                  type="text"
                  value={editingPessoa.nome}
                  onChange={e => setEditingPessoa({...editingPessoa, nome: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Nome da pessoa"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Sexo</label>
                  <select
                    value={editingPessoa.sexo}
                    onChange={e => setEditingPessoa({...editingPessoa, sexo: e.target.value as 'masculino' | 'feminino'})}
                    className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 dark:text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="masculino">♂ Masculino</option>
                    <option value="feminino">♀ Feminino</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Status</label>
                  <select
                    value={editingPessoa.vivo ? 'vivo' : 'falecido'}
                    onChange={e => setEditingPessoa({...editingPessoa, vivo: e.target.value === 'vivo'})}
                    className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 dark:text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="vivo">● Vivo</option>
                    <option value="falecido">✝ Falecido</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Nascimento</label>
                  <input
                    type="date"
                    value={editingPessoa.dataNascimento || ''}
                    onChange={e => setEditingPessoa({...editingPessoa, dataNascimento: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 dark:text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
                {!editingPessoa.vivo && (
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">Óbito</label>
                    <input
                      type="date"
                      value={editingPessoa.dataObito || ''}
                      onChange={e => setEditingPessoa({...editingPessoa, dataObito: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 dark:text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingPessoa.pacienteIndice}
                  onChange={e => setEditingPessoa({...editingPessoa, pacienteIndice: e.target.checked})}
                  className="w-5 h-5 rounded border-2 border-neutral-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm font-medium dark:text-white">Paciente Índice (probando)</span>
              </label>

              <div>
                <label className="block text-sm font-medium mb-3 dark:text-white">Condições de Saúde</label>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-auto p-1">
                  {condicoesComuns.map(cond => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => {
                        const has = editingPessoa.condicoes.includes(cond);
                        setEditingPessoa({
                          ...editingPessoa,
                          condicoes: has 
                            ? editingPessoa.condicoes.filter(c => c !== cond)
                            : [...editingPessoa.condicoes, cond]
                        });
                      }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border-2 transition-all ${
                        editingPessoa.condicoes.includes(cond)
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-red-300'
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t dark:border-neutral-800 flex gap-3">
              <button
                onClick={() => { setShowModal(false); setEditingPessoa(null); }}
                className="flex-1 px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => atualizarPessoa(editingPessoa)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de tipo de relacionamento */}
      {showTipoRelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl w-full max-w-sm">
            <div className="p-5 border-b dark:border-neutral-800">
              <h2 className="text-xl font-bold dark:text-white">Tipo de Relacionamento</h2>
            </div>
            
            <div className="p-5 space-y-2">
              {tiposRelacionamento.map(tipo => (
                <button
                  key={tipo.tipo}
                  onClick={() => setTipoRelacionamentoAtual(tipo.tipo)}
                  className={`w-full px-4 py-3 rounded-xl text-left font-medium flex items-center gap-3 transition-all ${
                    tipoRelacionamentoAtual === tipo.tipo
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div className="w-4 h-1 rounded" style={{ backgroundColor: tipo.cor }} />
                  {tipo.label}
                </button>
              ))}
            </div>

            <div className="p-5 border-t dark:border-neutral-800 flex gap-3">
              <button
                onClick={() => { setShowTipoRelModal(false); setPendingRelacionamento(null); }}
                className="flex-1 px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarRelacionamento}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:opacity-90"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
