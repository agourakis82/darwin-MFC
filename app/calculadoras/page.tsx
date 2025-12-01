'use client';

import { useState } from 'react';
import { Calculator, Heart, Activity, TrendingUp, Scale } from 'lucide-react';
import { calculateIMC, calculateFramingham, calculateGail, calculateSCORE, CalculatorResult } from '@/lib/utils/calculators';

export default function CalculadorasPage() {
  const [activeCalculator, setActiveCalculator] = useState<string>('imc');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Calculadoras Clínicas
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Ferramentas de Avaliação de Risco e Decisão Clínica
            </p>
          </div>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <strong>⚠️ Aviso Importante:</strong> Estas calculadoras são ferramentas educacionais e de apoio à decisão clínica. 
            Não substituem avaliação médica completa. Todas as fórmulas incluem referências às fontes originais (padrão Q1).
          </p>
        </div>
      </div>

      {/* Selector de Calculadora */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <button
              key={calc.id}
              onClick={() => {
                setActiveCalculator(calc.id);
                setResult(null);
              }}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                activeCalculator === calc.id
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-neutral-200 dark:border-neutral-800 hover:border-emerald-300 dark:hover:border-emerald-700'
              }`}
            >
              <Icon className={`w-8 h-8 mb-2 ${activeCalculator === calc.id ? 'text-emerald-600' : 'text-neutral-500'}`} />
              <h3 className="font-bold text-neutral-900 dark:text-neutral-100">{calc.name}</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{calc.description}</p>
            </button>
          );
        })}
      </div>

      {/* Calculadora Ativa */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulário */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
          {activeCalculator === 'imc' && <IMCForm onResult={setResult} />}
          {activeCalculator === 'framingham' && <FraminghamForm onResult={setResult} />}
          {activeCalculator === 'gail' && <GailForm onResult={setResult} />}
          {activeCalculator === 'score' && <SCOREForm onResult={setResult} />}
        </div>

        {/* Resultado */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
          {result ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-2">Resultado</h3>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  {result.value}{activeCalculator === 'imc' ? ' kg/m²' : '%'}
                </div>
                <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mt-1">
                  {result.category}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Interpretação</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{result.interpretation}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Recomendações</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{result.recommendations}</p>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <h4 className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-2">Referências</h4>
                <ul className="text-xs text-neutral-500 dark:text-neutral-500 space-y-1">
                  {result.references.map((ref, i) => (
                    <li key={i}>• {ref}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-400">
              <div className="text-center">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Preencha os campos e calcule</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Índice de Massa Corporal (IMC)</h3>
      
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Peso (kg)
        </label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
          placeholder="Ex: 70"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
          Altura (m)
        </label>
        <input
          type="number"
          step="0.01"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"
          placeholder="Ex: 1.75"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
      >
        Calcular IMC
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
    diabetes: false
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
        diabetes: params.diabetes
      });
      onResult(result);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Escore de Framingham</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Idade</label>
          <input
            type="number"
            value={params.idade}
            onChange={(e) => setParams({...params, idade: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Anos"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sexo</label>
          <select
            value={params.sexo}
            onChange={(e) => setParams({...params, sexo: e.target.value as 'M' | 'F'})}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Colesterol Total (mg/dL)</label>
          <input
            type="number"
            value={params.colesterolTotal}
            onChange={(e) => setParams({...params, colesterolTotal: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">HDL (mg/dL)</label>
          <input
            type="number"
            value={params.hdl}
            onChange={(e) => setParams({...params, hdl: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Pressão Sistólica (mmHg)</label>
        <input
          type="number"
          value={params.pressaoSistolica}
          onChange={(e) => setParams({...params, pressaoSistolica: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={params.fumante}
            onChange={(e) => setParams({...params, fumante: e.target.checked})}
            className="rounded"
          />
          <span className="text-sm">Fumante</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={params.diabetes}
            onChange={(e) => setParams({...params, diabetes: e.target.checked})}
            className="rounded"
          />
          <span className="text-sm">Diabetes</span>
        </label>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold"
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
    parentes: '',
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
      <h3 className="text-xl font-bold">Modelo de Gail (Risco de Câncer de Mama)</h3>
      
      <div>
        <label className="block text-sm font-medium mb-1">Idade atual</label>
        <input
          type="number"
          value={params.idade}
          onChange={(e) => setParams({...params, idade: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Idade da menarca</label>
        <input
          type="number"
          value={params.menarca}
          onChange={(e) => setParams({...params, menarca: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Idade do primeiro parto (0 se nulípara)</label>
        <input
          type="number"
          value={params.primeiroParto}
          onChange={(e) => setParams({...params, primeiroParto: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Parentes de 1º grau com câncer de mama</label>
        <select
          value={params.parentes}
          onChange={(e) => setParams({...params, parentes: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2 ou mais</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Número de biópsias de mama</label>
        <input
          type="number"
          value={params.biopsias}
          onChange={(e) => setParams({...params, biopsias: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold"
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
      <h3 className="text-xl font-bold">SCORE Europeu</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Idade</label>
          <input
            type="number"
            value={params.idade}
            onChange={(e) => setParams({...params, idade: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sexo</label>
          <select
            value={params.sexo}
            onChange={(e) => setParams({...params, sexo: e.target.value as 'M' | 'F'})}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Pressão Sistólica (mmHg)</label>
        <input
          type="number"
          value={params.pressaoSistolica}
          onChange={(e) => setParams({...params, pressaoSistolica: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Colesterol Total (mg/dL)</label>
        <input
          type="number"
          value={params.colesterolTotal}
          onChange={(e) => setParams({...params, colesterolTotal: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={params.fumante}
          onChange={(e) => setParams({...params, fumante: e.target.checked})}
        />
        <span className="text-sm">Fumante</span>
      </label>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold"
      >
        Calcular Risco
      </button>
    </div>
  );
}

const calculators = [
  {
    id: 'imc',
    name: 'IMC',
    description: 'Índice de Massa Corporal',
    icon: Scale
  },
  {
    id: 'framingham',
    name: 'Framingham',
    description: 'Risco Cardiovascular 10 anos',
    icon: Heart
  },
  {
    id: 'gail',
    name: 'Gail',
    description: 'Risco de Câncer de Mama',
    icon: Activity
  },
  {
    id: 'score',
    name: 'SCORE',
    description: 'Risco CV Europeu',
    icon: TrendingUp
  }
];

