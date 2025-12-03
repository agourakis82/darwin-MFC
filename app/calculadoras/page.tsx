'use client';

import { useState } from 'react';
import { 
  Calculator, Heart, Activity, TrendingUp, Scale, Brain, 
  Wine, Droplets, Baby, Stethoscope, TestTube, AlertTriangle,
  Pill, Thermometer
} from 'lucide-react';
import { 
  calculateIMC, 
  calculateFramingham, 
  calculateGail, 
  calculateSCORE, 
  calculateCKDEPI,
  calculateCockcroftGault,
  calculatePHQ9,
  calculatePHQ2,
  calculateAUDITC,
  calculateCAGE,
  calculateFINDRISC,
  calculateHidratacaoDengue,
  calculateAPGAR,
  CalculatorResult 
} from '@/lib/utils/calculators';

export default function CalculadorasPage() {
  const [activeCalculator, setActiveCalculator] = useState<string>('imc');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
              Calculadoras Clínicas
            </h1>
            <p className="text-lg text-[#86868b]">
              Ferramentas de Avaliação de Risco e Decisão Clínica para APS
            </p>
          </div>
        </div>
        
        <div className="glass-strong rounded-2xl p-5 border border-amber-500/30">
          <p className="text-base text-[#1d1d1f] dark:text-[#f5f5f7]">
            <strong className="text-amber-600 dark:text-amber-400">⚠️ Aviso Importante:</strong> Estas calculadoras são ferramentas educacionais e de apoio à decisão clínica. 
            <strong> Não substituem avaliação médica completa e julgamento clínico.</strong> Todas as fórmulas incluem referências às fontes originais validadas (padrão Q1).
          </p>
        </div>
      </div>

      {/* Selector de Calculadora */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">Selecione a Calculadora</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <button
                key={calc.id}
                onClick={() => {
                  setActiveCalculator(calc.id);
                  setResult(null);
                }}
                className={`p-4 rounded-xl border-2 apple-transition text-left ${
                  activeCalculator === calc.id
                    ? 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20 shadow-lg'
                    : 'border-neutral-200/50 dark:border-neutral-700/50 hover:border-emerald-400 dark:hover:border-emerald-600 glass-subtle'
                }`}
              >
                <Icon className={`w-7 h-7 mb-2 ${activeCalculator === calc.id ? 'text-emerald-500' : 'text-[#86868b]'}`} />
                <h3 className={`font-bold text-sm ${activeCalculator === calc.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#1d1d1f] dark:text-[#f5f5f7]'}`}>
                  {calc.name}
                </h3>
                <p className="text-xs text-[#86868b] mt-1 line-clamp-2">{calc.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculadora Ativa */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <div className="glass-strong rounded-2xl p-6 shadow-lg">
          {activeCalculator === 'imc' && <IMCForm onResult={setResult} />}
          {activeCalculator === 'framingham' && <FraminghamForm onResult={setResult} />}
          {activeCalculator === 'gail' && <GailForm onResult={setResult} />}
          {activeCalculator === 'score' && <SCOREForm onResult={setResult} />}
          {activeCalculator === 'ckdepi' && <CKDEPIForm onResult={setResult} />}
          {activeCalculator === 'cockcroft' && <CockcroftForm onResult={setResult} />}
          {activeCalculator === 'phq9' && <PHQ9Form onResult={setResult} />}
          {activeCalculator === 'phq2' && <PHQ2Form onResult={setResult} />}
          {activeCalculator === 'auditc' && <AUDITCForm onResult={setResult} />}
          {activeCalculator === 'cage' && <CAGEForm onResult={setResult} />}
          {activeCalculator === 'findrisc' && <FINDRISCForm onResult={setResult} />}
          {activeCalculator === 'dengue' && <DengueForm onResult={setResult} />}
          {activeCalculator === 'apgar' && <APGARForm onResult={setResult} />}
        </div>

        {/* Resultado */}
        <div className="glass-strong rounded-2xl p-6 shadow-lg">
          {result ? (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-[#86868b] mb-2">Resultado</h3>
                <div className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">
                  {result.value} <span className="text-2xl font-normal text-[#86868b]">{result.unit}</span>
                </div>
                <div className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mt-2">
                  {result.category}
                </div>
              </div>

              <div className="glass-subtle rounded-xl p-4">
                <h4 className="text-sm font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">📊 Interpretação</h4>
                <p className="text-base text-[#86868b] leading-relaxed">{result.interpretation}</p>
              </div>

              <div className="bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl p-4 border border-emerald-500/30">
                <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-300 mb-2">💡 Recomendações</h4>
                <p className="text-base text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">{result.recommendations}</p>
              </div>

              {result.formula && (
                <div className="glass-subtle rounded-xl p-4">
                  <h4 className="text-sm font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">🔬 Fórmula</h4>
                  <code className="text-sm text-[#86868b] bg-black/5 dark:bg-white/5 px-2 py-1 rounded">
                    {result.formula}
                  </code>
                </div>
              )}

              <div className="pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
                <h4 className="text-xs font-bold text-[#86868b] mb-3">📚 Referências (Padrão Q1)</h4>
                <ul className="text-xs text-[#86868b] space-y-2">
                  {result.references.map((ref, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-emerald-500 font-bold">[{i + 1}]</span>
                      <span>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px] text-[#86868b]">
              <div className="text-center">
                <Calculator className="w-20 h-20 mx-auto mb-4 opacity-30" />
                <p className="text-lg">Preencha os campos e calcule</p>
                <p className="text-sm mt-2">O resultado aparecerá aqui</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// FORMULÁRIOS
// =============================================================================

function IMCForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  const handleCalculate = () => {
    if (peso && altura) {
      const result = calculateIMC(parseFloat(peso), parseFloat(altura));
      onResult(result);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">Índice de Massa Corporal (IMC)</h3>
      <p className="text-sm text-[#86868b]">Avaliação do estado nutricional baseado em peso e altura.</p>
      
      <div>
        <label className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
          Peso (kg)
        </label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          className="w-full px-4 py-3 border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl bg-white/50 dark:bg-neutral-800/50 text-[#1d1d1f] dark:text-[#f5f5f7] focus:ring-2 focus:ring-emerald-500"
          placeholder="Ex: 70"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
          Altura (m)
        </label>
        <input
          type="number"
          step="0.01"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          className="w-full px-4 py-3 border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl bg-white/50 dark:bg-neutral-800/50 text-[#1d1d1f] dark:text-[#f5f5f7] focus:ring-2 focus:ring-emerald-500"
          placeholder="Ex: 1.75"
        />
      </div>

      <button
        onClick={handleCalculate}
        disabled={!peso || !altura}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white rounded-xl font-semibold apple-transition shadow-lg"
      >
        Calcular IMC
      </button>
    </div>
  );
}

function CKDEPIForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [creatinina, setCreatinina] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState<'M' | 'F'>('M');

  const handleCalculate = () => {
    if (creatinina && idade) {
      const result = calculateCKDEPI(parseFloat(creatinina), parseInt(idade), sexo);
      onResult(result);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">Taxa de Filtração Glomerular (CKD-EPI 2021)</h3>
      <p className="text-sm text-[#86868b]">Estimativa da função renal. Equação 2021 sem variável raça.</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">Creatinina (mg/dL)</label>
          <input
            type="number"
            step="0.01"
            value={creatinina}
            onChange={(e) => setCreatinina(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl bg-white/50 dark:bg-neutral-800/50"
            placeholder="Ex: 1.2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">Idade (anos)</label>
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl bg-white/50 dark:bg-neutral-800/50"
            placeholder="Ex: 55"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">Sexo</label>
        <select
          value={sexo}
          onChange={(e) => setSexo(e.target.value as 'M' | 'F')}
          className="w-full px-4 py-3 border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl bg-white/50 dark:bg-neutral-800/50"
        >
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!creatinina || !idade}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white rounded-xl font-semibold apple-transition shadow-lg"
      >
        Calcular TFG
      </button>
    </div>
  );
}

function CockcroftForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [creatinina, setCreatinina] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [sexo, setSexo] = useState<'M' | 'F'>('M');

  const handleCalculate = () => {
    if (creatinina && idade && peso) {
      const result = calculateCockcroftGault(parseFloat(creatinina), parseInt(idade), parseFloat(peso), sexo);
      onResult(result);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">Clearance de Creatinina (Cockcroft-Gault)</h3>
      <p className="text-sm text-[#86868b]">Para ajuste de dose de medicamentos. Usa peso corporal real.</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Creatinina (mg/dL)</label>
          <input
            type="number"
            step="0.01"
            value={creatinina}
            onChange={(e) => setCreatinina(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
            placeholder="Ex: 1.2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Idade (anos)</label>
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Peso (kg)</label>
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Sexo</label>
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value as 'M' | 'F')}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!creatinina || !idade || !peso}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:opacity-50 text-white rounded-xl font-semibold"
      >
        Calcular Clearance
      </button>
    </div>
  );
}

function PHQ9Form({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [respostas, setRespostas] = useState<number[]>(Array(9).fill(0));

  const perguntas = [
    'Pouco interesse ou prazer em fazer as coisas',
    'Sentir-se para baixo, deprimido(a) ou sem esperança',
    'Dificuldade para pegar no sono, permanecer dormindo ou dormir demais',
    'Sentir-se cansado(a) ou com pouca energia',
    'Falta de apetite ou comer demais',
    'Sentir-se mal consigo mesmo(a), ou achar que é um fracasso',
    'Dificuldade para se concentrar nas coisas',
    'Lentidão ou inquietação notadas por outros',
    'Pensamentos de que seria melhor estar morto(a) ou de se machucar'
  ];

  const handleCalculate = () => {
    const result = calculatePHQ9(respostas);
    onResult(result);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">PHQ-9 (Depressão)</h3>
      <p className="text-sm text-[#86868b]">Nas últimas 2 semanas, com que frequência você foi incomodado(a) por:</p>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {perguntas.map((pergunta, i) => (
          <div key={i} className={`p-3 rounded-xl ${i === 8 ? 'bg-red-500/10 border border-red-500/30' : 'bg-white/30 dark:bg-neutral-800/30'}`}>
            <p className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
              {i + 1}. {pergunta}
              {i === 8 && <span className="text-red-500 ml-2">⚠️</span>}
            </p>
            <select
              value={respostas[i]}
              onChange={(e) => {
                const newRespostas = [...respostas];
                newRespostas[i] = parseInt(e.target.value);
                setRespostas(newRespostas);
              }}
              className="w-full px-3 py-2 border rounded-lg bg-white/50 dark:bg-neutral-800/50 text-sm"
            >
              <option value={0}>0 - Nenhuma vez</option>
              <option value={1}>1 - Vários dias</option>
              <option value={2}>2 - Mais da metade dos dias</option>
              <option value={3}>3 - Quase todos os dias</option>
            </select>
          </div>
        ))}
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold"
      >
        Calcular PHQ-9
      </button>
    </div>
  );
}

function PHQ2Form({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [interesse, setInteresse] = useState(0);
  const [humor, setHumor] = useState(0);

  const handleCalculate = () => {
    const result = calculatePHQ2(interesse, humor);
    onResult(result);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">PHQ-2 (Rastreamento Rápido)</h3>
      <p className="text-sm text-[#86868b]">Nas últimas 2 semanas, com que frequência você foi incomodado(a) por:</p>
      
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">1. Pouco interesse ou prazer em fazer as coisas</p>
          <select
            value={interesse}
            onChange={(e) => setInteresse(parseInt(e.target.value))}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value={0}>0 - Nenhuma vez</option>
            <option value={1}>1 - Vários dias</option>
            <option value={2}>2 - Mais da metade dos dias</option>
            <option value={3}>3 - Quase todos os dias</option>
          </select>
        </div>

        <div className="p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">2. Sentir-se para baixo, deprimido(a) ou sem esperança</p>
          <select
            value={humor}
            onChange={(e) => setHumor(parseInt(e.target.value))}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value={0}>0 - Nenhuma vez</option>
            <option value={1}>1 - Vários dias</option>
            <option value={2}>2 - Mais da metade dos dias</option>
            <option value={3}>3 - Quase todos os dias</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold"
      >
        Calcular PHQ-2
      </button>
    </div>
  );
}

function AUDITCForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [frequencia, setFrequencia] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [binge, setBinge] = useState(0);

  const handleCalculate = () => {
    const result = calculateAUDITC(frequencia, quantidade, binge);
    onResult(result);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">AUDIT-C (Uso de Álcool)</h3>
      <p className="text-sm text-[#86868b]">Rastreamento de uso problemático de álcool.</p>
      
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">1. Com que frequência você consome bebidas alcoólicas?</p>
          <select
            value={frequencia}
            onChange={(e) => setFrequencia(parseInt(e.target.value))}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value={0}>Nunca</option>
            <option value={1}>Mensalmente ou menos</option>
            <option value={2}>2-4 vezes por mês</option>
            <option value={3}>2-3 vezes por semana</option>
            <option value={4}>4 ou mais vezes por semana</option>
          </select>
        </div>

        <div className="p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">2. Quantas doses você consome em um dia típico?</p>
          <select
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value))}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value={0}>1 ou 2</option>
            <option value={1}>3 ou 4</option>
            <option value={2}>5 ou 6</option>
            <option value={3}>7, 8 ou 9</option>
            <option value={4}>10 ou mais</option>
          </select>
        </div>

        <div className="p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">3. Com que frequência você consome 5 ou mais doses em uma ocasião?</p>
          <select
            value={binge}
            onChange={(e) => setBinge(parseInt(e.target.value))}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value={0}>Nunca</option>
            <option value={1}>Menos que mensalmente</option>
            <option value={2}>Mensalmente</option>
            <option value={3}>Semanalmente</option>
            <option value={4}>Diariamente ou quase</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold"
      >
        Calcular AUDIT-C
      </button>
    </div>
  );
}

function CAGEForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [cutDown, setCutDown] = useState(false);
  const [annoyed, setAnnoyed] = useState(false);
  const [guilty, setGuilty] = useState(false);
  const [eyeOpener, setEyeOpener] = useState(false);

  const handleCalculate = () => {
    const result = calculateCAGE(cutDown, annoyed, guilty, eyeOpener);
    onResult(result);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">CAGE (Alcoolismo)</h3>
      <p className="text-sm text-[#86868b]">Rastreamento de dependência alcoólica.</p>
      
      <div className="space-y-3">
        <label className="flex items-start gap-3 p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30 cursor-pointer">
          <input
            type="checkbox"
            checked={cutDown}
            onChange={(e) => setCutDown(e.target.checked)}
            className="mt-1 rounded"
          />
          <div>
            <span className="font-bold text-emerald-600">C</span>ut down - Você já sentiu que deveria <strong>diminuir</strong> a quantidade de bebida?
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30 cursor-pointer">
          <input
            type="checkbox"
            checked={annoyed}
            onChange={(e) => setAnnoyed(e.target.checked)}
            className="mt-1 rounded"
          />
          <div>
            <span className="font-bold text-emerald-600">A</span>nnoyed - As pessoas o <strong>aborrecem</strong> porque criticam seu modo de beber?
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30 cursor-pointer">
          <input
            type="checkbox"
            checked={guilty}
            onChange={(e) => setGuilty(e.target.checked)}
            className="mt-1 rounded"
          />
          <div>
            <span className="font-bold text-emerald-600">G</span>uilty - Você se sente <strong>culpado</strong> pela maneira como costuma beber?
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30 cursor-pointer">
          <input
            type="checkbox"
            checked={eyeOpener}
            onChange={(e) => setEyeOpener(e.target.checked)}
            className="mt-1 rounded"
          />
          <div>
            <span className="font-bold text-emerald-600">E</span>ye-opener - Você costuma beber pela <strong>manhã</strong> para diminuir o nervosismo ou ressaca?
          </div>
        </label>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold"
      >
        Calcular CAGE
      </button>
    </div>
  );
}

function FINDRISCForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [params, setParams] = useState({
    idade: 45,
    imc: 25,
    circunferenciaAbdominal: 90,
    atividadeFisica: true,
    vegetaisDiarios: true,
    usoAntiHipertensivo: false,
    glicemiaAlteradaPrevia: false,
    historicoFamiliarDM: 'nenhum' as 'nenhum' | 'segundo_grau' | 'primeiro_grau',
    sexo: 'M' as 'M' | 'F'
  });

  const handleCalculate = () => {
    const result = calculateFINDRISC(params);
    onResult(result);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">FINDRISC (Risco de DM2)</h3>
      <p className="text-sm text-[#86868b]">Predição de risco de diabetes tipo 2 em 10 anos.</p>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Idade</label>
            <input
              type="number"
              value={params.idade}
              onChange={(e) => setParams({...params, idade: parseInt(e.target.value)})}
              className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Sexo</label>
            <select
              value={params.sexo}
              onChange={(e) => setParams({...params, sexo: e.target.value as 'M' | 'F'})}
              className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">IMC (kg/m²)</label>
            <input
              type="number"
              step="0.1"
              value={params.imc}
              onChange={(e) => setParams({...params, imc: parseFloat(e.target.value)})}
              className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Circ. Abdominal (cm)</label>
            <input
              type="number"
              value={params.circunferenciaAbdominal}
              onChange={(e) => setParams({...params, circunferenciaAbdominal: parseInt(e.target.value)})}
              className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Histórico Familiar de DM</label>
          <select
            value={params.historicoFamiliarDM}
            onChange={(e) => setParams({...params, historicoFamiliarDM: e.target.value as 'nenhum' | 'segundo_grau' | 'primeiro_grau'})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value="nenhum">Nenhum</option>
            <option value="segundo_grau">2º grau (avós, tios, primos)</option>
            <option value="primeiro_grau">1º grau (pais, irmãos, filhos)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
            <input
              type="checkbox"
              checked={params.atividadeFisica}
              onChange={(e) => setParams({...params, atividadeFisica: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm">Pratica ≥30 min de atividade física/dia</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
            <input
              type="checkbox"
              checked={params.vegetaisDiarios}
              onChange={(e) => setParams({...params, vegetaisDiarios: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm">Consome vegetais/frutas diariamente</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
            <input
              type="checkbox"
              checked={params.usoAntiHipertensivo}
              onChange={(e) => setParams({...params, usoAntiHipertensivo: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm">Usa medicação anti-hipertensiva</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
            <input
              type="checkbox"
              checked={params.glicemiaAlteradaPrevia}
              onChange={(e) => setParams({...params, glicemiaAlteradaPrevia: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm">Já teve glicemia alterada (pré-diabetes)</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold"
      >
        Calcular FINDRISC
      </button>
    </div>
  );
}

function DengueForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [peso, setPeso] = useState('');
  const [grupo, setGrupo] = useState<'A' | 'B' | 'C' | 'D'>('A');

  const handleCalculate = () => {
    if (peso) {
      const result = calculateHidratacaoDengue(parseFloat(peso), grupo);
      onResult(result);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">Hidratação para Dengue</h3>
      <p className="text-sm text-[#86868b]">Cálculo de volume de hidratação conforme classificação de risco.</p>
      
      <div>
        <label className="block text-sm font-medium mb-2">Peso (kg)</label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          placeholder="Ex: 70"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Classificação de Risco</label>
        <div className="space-y-2">
          <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer ${grupo === 'A' ? 'bg-green-500/20 border-2 border-green-500' : 'bg-white/30 dark:bg-neutral-800/30'}`}>
            <input type="radio" name="grupo" value="A" checked={grupo === 'A'} onChange={() => setGrupo('A')} />
            <div>
              <span className="font-bold text-green-600">Grupo A</span>
              <p className="text-xs text-[#86868b]">Sem sinais de alarme, sem comorbidades</p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer ${grupo === 'B' ? 'bg-yellow-500/20 border-2 border-yellow-500' : 'bg-white/30 dark:bg-neutral-800/30'}`}>
            <input type="radio" name="grupo" value="B" checked={grupo === 'B'} onChange={() => setGrupo('B')} />
            <div>
              <span className="font-bold text-yellow-600">Grupo B</span>
              <p className="text-xs text-[#86868b]">Sem sinais de alarme, com comorbidade ou risco social</p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer ${grupo === 'C' ? 'bg-orange-500/20 border-2 border-orange-500' : 'bg-white/30 dark:bg-neutral-800/30'}`}>
            <input type="radio" name="grupo" value="C" checked={grupo === 'C'} onChange={() => setGrupo('C')} />
            <div>
              <span className="font-bold text-orange-600">Grupo C</span>
              <p className="text-xs text-[#86868b]">COM sinais de alarme (dor abdominal, vômitos, sangramento)</p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer ${grupo === 'D' ? 'bg-red-500/20 border-2 border-red-500' : 'bg-white/30 dark:bg-neutral-800/30'}`}>
            <input type="radio" name="grupo" value="D" checked={grupo === 'D'} onChange={() => setGrupo('D')} />
            <div>
              <span className="font-bold text-red-600">Grupo D - GRAVE</span>
              <p className="text-xs text-[#86868b]">Choque, sangramento grave, comprometimento de órgãos</p>
            </div>
          </label>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!peso}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:opacity-50 text-white rounded-xl font-semibold"
      >
        Calcular Hidratação
      </button>
    </div>
  );
}

function APGARForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [fc, setFc] = useState<0 | 1 | 2>(2);
  const [resp, setResp] = useState<0 | 1 | 2>(2);
  const [tonus, setTonus] = useState<0 | 1 | 2>(2);
  const [irrit, setIrrit] = useState<0 | 1 | 2>(2);
  const [cor, setCor] = useState<0 | 1 | 2>(2);

  const handleCalculate = () => {
    const result = calculateAPGAR(fc, resp, tonus, irrit, cor);
    onResult(result);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">Escore de APGAR</h3>
      <p className="text-sm text-[#86868b]">Avaliação do recém-nascido no 1º e 5º minuto de vida.</p>
      
      <div className="space-y-3">
        <div className="p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">Frequência Cardíaca</p>
          <select value={fc} onChange={(e) => setFc(parseInt(e.target.value) as 0 | 1 | 2)} className="w-full px-4 py-2 border rounded-lg bg-white/50 dark:bg-neutral-800/50">
            <option value={0}>0 - Ausente</option>
            <option value={1}>1 - &lt;100 bpm</option>
            <option value={2}>2 - ≥100 bpm</option>
          </select>
        </div>

        <div className="p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">Respiração</p>
          <select value={resp} onChange={(e) => setResp(parseInt(e.target.value) as 0 | 1 | 2)} className="w-full px-4 py-2 border rounded-lg bg-white/50 dark:bg-neutral-800/50">
            <option value={0}>0 - Ausente</option>
            <option value={1}>1 - Fraca, irregular</option>
            <option value={2}>2 - Forte, choro vigoroso</option>
          </select>
        </div>

        <div className="p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">Tônus Muscular</p>
          <select value={tonus} onChange={(e) => setTonus(parseInt(e.target.value) as 0 | 1 | 2)} className="w-full px-4 py-2 border rounded-lg bg-white/50 dark:bg-neutral-800/50">
            <option value={0}>0 - Flácido</option>
            <option value={1}>1 - Flexão de extremidades</option>
            <option value={2}>2 - Movimentos ativos</option>
          </select>
        </div>

        <div className="p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">Irritabilidade Reflexa</p>
          <select value={irrit} onChange={(e) => setIrrit(parseInt(e.target.value) as 0 | 1 | 2)} className="w-full px-4 py-2 border rounded-lg bg-white/50 dark:bg-neutral-800/50">
            <option value={0}>0 - Sem resposta</option>
            <option value={1}>1 - Careta, algum movimento</option>
            <option value={2}>2 - Choro, tosse, espirro</option>
          </select>
        </div>

        <div className="p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">Cor da Pele</p>
          <select value={cor} onChange={(e) => setCor(parseInt(e.target.value) as 0 | 1 | 2)} className="w-full px-4 py-2 border rounded-lg bg-white/50 dark:bg-neutral-800/50">
            <option value={0}>0 - Cianose/palidez generalizada</option>
            <option value={1}>1 - Corpo rosado, extremidades cianóticas</option>
            <option value={2}>2 - Completamente rosado</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold"
      >
        Calcular APGAR
      </button>
    </div>
  );
}

function FraminghamForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [params, setParams] = useState({
    idade: '',
    sexo: 'M' as 'M' | 'F',
    colesterolTotal: '',
    hdl: '',
    pressaoSistolica: '',
    fumante: false,
    diabetes: false,
    tratamentoHAS: false
  });

  const handleCalculate = () => {
    if (params.idade && params.colesterolTotal && params.hdl && params.pressaoSistolica) {
      const result = calculateFramingham({
        idade: parseInt(params.idade),
        sexo: params.sexo,
        colesterolTotal: parseFloat(params.colesterolTotal),
        hdl: parseFloat(params.hdl),
        pressaoSistolica: parseFloat(params.pressaoSistolica),
        fumante: params.fumante,
        diabetes: params.diabetes,
        tratamentoHAS: params.tratamentoHAS
      });
      onResult(result);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">Escore de Framingham</h3>
      <p className="text-sm text-[#86868b]">Risco de evento cardiovascular em 10 anos.</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Idade</label>
          <input
            type="number"
            value={params.idade}
            onChange={(e) => setParams({...params, idade: e.target.value})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
            placeholder="Anos"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Sexo</label>
          <select
            value={params.sexo}
            onChange={(e) => setParams({...params, sexo: e.target.value as 'M' | 'F'})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Colesterol Total (mg/dL)</label>
          <input
            type="number"
            value={params.colesterolTotal}
            onChange={(e) => setParams({...params, colesterolTotal: e.target.value})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">HDL (mg/dL)</label>
          <input
            type="number"
            value={params.hdl}
            onChange={(e) => setParams({...params, hdl: e.target.value})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Pressão Sistólica (mmHg)</label>
        <input
          type="number"
          value={params.pressaoSistolica}
          onChange={(e) => setParams({...params, pressaoSistolica: e.target.value})}
          className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <input type="checkbox" checked={params.fumante} onChange={(e) => setParams({...params, fumante: e.target.checked})} className="rounded" />
          <span className="text-sm">Fumante atual</span>
        </label>
        <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <input type="checkbox" checked={params.diabetes} onChange={(e) => setParams({...params, diabetes: e.target.checked})} className="rounded" />
          <span className="text-sm">Diabetes</span>
        </label>
        <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <input type="checkbox" checked={params.tratamentoHAS} onChange={(e) => setParams({...params, tratamentoHAS: e.target.checked})} className="rounded" />
          <span className="text-sm">Em tratamento para hipertensão</span>
        </label>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!params.idade || !params.colesterolTotal || !params.hdl || !params.pressaoSistolica}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:opacity-50 text-white rounded-xl font-semibold"
      >
        Calcular Risco
      </button>
    </div>
  );
}

function GailForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [params, setParams] = useState({
    idade: '',
    menarca: '',
    primeiroParto: '',
    parentes: '0',
    biopsias: ''
  });

  const handleCalculate = () => {
    if (params.idade && params.menarca) {
      const result = calculateGail({
        idade: parseInt(params.idade),
        menarca: parseInt(params.menarca),
        primeiroParto: parseInt(params.primeiroParto) || 0,
        parentes: parseInt(params.parentes) || 0,
        biopsias: parseInt(params.biopsias) || 0
      });
      onResult(result);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">Modelo de Gail</h3>
      <p className="text-sm text-[#86868b]">Risco de câncer de mama em 5 anos.</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Idade atual</label>
          <input
            type="number"
            value={params.idade}
            onChange={(e) => setParams({...params, idade: e.target.value})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Idade da menarca</label>
          <input
            type="number"
            value={params.menarca}
            onChange={(e) => setParams({...params, menarca: e.target.value})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Idade do 1º parto (0 se nulípara)</label>
        <input
          type="number"
          value={params.primeiroParto}
          onChange={(e) => setParams({...params, primeiroParto: e.target.value})}
          className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Parentes 1º grau com CA mama</label>
        <select
          value={params.parentes}
          onChange={(e) => setParams({...params, parentes: e.target.value})}
          className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2 ou mais</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Nº de biópsias de mama</label>
        <input
          type="number"
          value={params.biopsias}
          onChange={(e) => setParams({...params, biopsias: e.target.value})}
          className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
        />
      </div>

      <button
        onClick={handleCalculate}
        disabled={!params.idade || !params.menarca}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:opacity-50 text-white rounded-xl font-semibold"
      >
        Calcular Risco
      </button>
    </div>
  );
}

function SCOREForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const [params, setParams] = useState({
    idade: '',
    sexo: 'M' as 'M' | 'F',
    fumante: false,
    pressaoSistolica: '',
    colesterolTotal: ''
  });

  const handleCalculate = () => {
    if (params.idade && params.pressaoSistolica && params.colesterolTotal) {
      const result = calculateSCORE({
        idade: parseInt(params.idade),
        sexo: params.sexo,
        fumante: params.fumante,
        pressaoSistolica: parseFloat(params.pressaoSistolica),
        colesterolTotal: parseFloat(params.colesterolTotal)
      });
      onResult(result);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">SCORE Europeu</h3>
      <p className="text-sm text-[#86868b]">Risco de morte cardiovascular em 10 anos.</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Idade</label>
          <input
            type="number"
            value={params.idade}
            onChange={(e) => setParams({...params, idade: e.target.value})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Sexo</label>
          <select
            value={params.sexo}
            onChange={(e) => setParams({...params, sexo: e.target.value as 'M' | 'F'})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Pressão Sistólica (mmHg)</label>
        <input
          type="number"
          value={params.pressaoSistolica}
          onChange={(e) => setParams({...params, pressaoSistolica: e.target.value})}
          className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Colesterol Total (mg/dL)</label>
        <input
          type="number"
          value={params.colesterolTotal}
          onChange={(e) => setParams({...params, colesterolTotal: e.target.value})}
          className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
        />
      </div>

      <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
        <input type="checkbox" checked={params.fumante} onChange={(e) => setParams({...params, fumante: e.target.checked})} className="rounded" />
        <span className="text-sm">Fumante atual</span>
      </label>

      <button
        onClick={handleCalculate}
        disabled={!params.idade || !params.pressaoSistolica || !params.colesterolTotal}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:opacity-50 text-white rounded-xl font-semibold"
      >
        Calcular Risco
      </button>
    </div>
  );
}

// =============================================================================
// LISTA DE CALCULADORAS
// =============================================================================

const calculators = [
  { id: 'imc', name: 'IMC', description: 'Índice de Massa Corporal', icon: Scale },
  { id: 'ckdepi', name: 'CKD-EPI', description: 'Taxa Filtração Glomerular', icon: TestTube },
  { id: 'cockcroft', name: 'Cockcroft', description: 'Clearance Creatinina', icon: Pill },
  { id: 'framingham', name: 'Framingham', description: 'Risco CV 10 anos', icon: Heart },
  { id: 'score', name: 'SCORE', description: 'Risco Morte CV', icon: TrendingUp },
  { id: 'findrisc', name: 'FINDRISC', description: 'Risco DM2 10 anos', icon: Activity },
  { id: 'gail', name: 'Gail', description: 'Risco CA Mama', icon: Stethoscope },
  { id: 'phq2', name: 'PHQ-2', description: 'Rastreio Depressão', icon: Brain },
  { id: 'phq9', name: 'PHQ-9', description: 'Depressão Completo', icon: Brain },
  { id: 'auditc', name: 'AUDIT-C', description: 'Uso de Álcool', icon: Wine },
  { id: 'cage', name: 'CAGE', description: 'Alcoolismo', icon: Wine },
  { id: 'dengue', name: 'Dengue', description: 'Hidratação', icon: Droplets },
  { id: 'apgar', name: 'APGAR', description: 'Recém-Nascido', icon: Baby },
];
