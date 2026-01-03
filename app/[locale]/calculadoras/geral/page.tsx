'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('calculadoras');
  const [activeCalculator, setActiveCalculator] = useState<string>('imc');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculators = [
    { id: 'imc', name: t('calculators.imc.name'), description: t('calculators.imc.desc'), icon: Scale },
    { id: 'ckdepi', name: t('calculators.ckdepi.name'), description: t('calculators.ckdepi.desc'), icon: TestTube },
    { id: 'cockcroft', name: t('calculators.cockcroft.name'), description: t('calculators.cockcroft.desc'), icon: Pill },
    { id: 'framingham', name: t('calculators.framingham.name'), description: t('calculators.framingham.desc'), icon: Heart },
    { id: 'score', name: t('calculators.score.name'), description: t('calculators.score.desc'), icon: TrendingUp },
    { id: 'findrisc', name: t('calculators.findrisc.name'), description: t('calculators.findrisc.desc'), icon: Activity },
    { id: 'gail', name: t('calculators.gail.name'), description: t('calculators.gail.desc'), icon: Stethoscope },
    { id: 'phq2', name: t('calculators.phq2.name'), description: t('calculators.phq2.desc'), icon: Brain },
    { id: 'phq9', name: t('calculators.phq9.name'), description: t('calculators.phq9.desc'), icon: Brain },
    { id: 'auditc', name: t('calculators.auditc.name'), description: t('calculators.auditc.desc'), icon: Wine },
    { id: 'cage', name: t('calculators.cage.name'), description: t('calculators.cage.desc'), icon: Wine },
    { id: 'dengue', name: t('calculators.dengue.name'), description: t('calculators.dengue.desc'), icon: Droplets },
    { id: 'apgar', name: t('calculators.apgar.name'), description: t('calculators.apgar.desc'), icon: Baby },
  ];

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
              {t('title')}
            </h1>
            <p className="text-lg text-[#86868b]">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-5 border border-amber-500/30">
          <p className="text-base text-[#1d1d1f] dark:text-[#f5f5f7]">
            <strong className="text-amber-600 dark:text-amber-400">⚠️ {t('warning.title')}</strong> {t('warning.text1')}
            <strong> {t('warning.text2')}</strong> {t('warning.text3')}
          </p>
        </div>
      </div>

      {/* Selector de Calculadora */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">{t('selectCalculator')}</h2>
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
                <h3 className="text-sm font-semibold text-[#86868b] mb-2">{t('result.title')}</h3>
                <div className="text-5xl font-bold text-emerald-600 dark:text-emerald-400">
                  {result.value} <span className="text-2xl font-normal text-[#86868b]">{result.unit}</span>
                </div>
                <div className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mt-2">
                  {result.category}
                </div>
              </div>

              <div className="glass-subtle rounded-xl p-4">
                <h4 className="text-sm font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">📊 {t('result.interpretation')}</h4>
                <p className="text-base text-[#86868b] leading-relaxed">{result.interpretation}</p>
              </div>

              <div className="bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl p-4 border border-emerald-500/30">
                <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-300 mb-2">💡 {t('result.recommendations')}</h4>
                <p className="text-base text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">{result.recommendations}</p>
              </div>

              {result.formula && (
                <div className="glass-subtle rounded-xl p-4">
                  <h4 className="text-sm font-bold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">🔬 {t('result.formula')}</h4>
                  <code className="text-sm text-[#86868b] bg-black/5 dark:bg-white/5 px-2 py-1 rounded">
                    {result.formula}
                  </code>
                </div>
              )}

              <div className="pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50">
                <h4 className="text-xs font-bold text-[#86868b] mb-3">📚 {t('result.references')}</h4>
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
                <p className="text-lg">{t('emptyState.fillAndCalculate')}</p>
                <p className="text-sm mt-2">{t('emptyState.resultWillAppear')}</p>
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
  const t = useTranslations('calculadoras');
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
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{t('forms.imc.title')}</h3>
      <p className="text-sm text-[#86868b]">{t('forms.imc.description')}</p>

      <div>
        <label className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
          {t('common.weight')}
        </label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          className="w-full px-4 py-3 border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl bg-white/50 dark:bg-neutral-800/50 text-[#1d1d1f] dark:text-[#f5f5f7] focus:ring-2 focus:ring-emerald-500"
          placeholder={t('common.exWeight')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
          {t('common.height')}
        </label>
        <input
          type="number"
          step="0.01"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          className="w-full px-4 py-3 border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl bg-white/50 dark:bg-neutral-800/50 text-[#1d1d1f] dark:text-[#f5f5f7] focus:ring-2 focus:ring-emerald-500"
          placeholder={t('common.exHeight')}
        />
      </div>

      <button
        onClick={handleCalculate}
        disabled={!peso || !altura}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white rounded-xl font-semibold apple-transition shadow-lg"
      >
        {t('forms.imc.calculate')}
      </button>
    </div>
  );
}

function CKDEPIForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const t = useTranslations('calculadoras');
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
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{t('forms.ckdepi.title')}</h3>
      <p className="text-sm text-[#86868b]">{t('forms.ckdepi.description')}</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">{t('common.creatinine')}</label>
          <input
            type="number"
            step="0.01"
            value={creatinina}
            onChange={(e) => setCreatinina(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl bg-white/50 dark:bg-neutral-800/50"
            placeholder={t('common.exCreatinine')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">{t('common.age')}</label>
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            className="w-full px-4 py-3 border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl bg-white/50 dark:bg-neutral-800/50"
            placeholder={t('common.exAge')}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">{t('common.sex')}</label>
        <select
          value={sexo}
          onChange={(e) => setSexo(e.target.value as 'M' | 'F')}
          className="w-full px-4 py-3 border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl bg-white/50 dark:bg-neutral-800/50"
        >
          <option value="M">{t('common.male')}</option>
          <option value="F">{t('common.female')}</option>
        </select>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!creatinina || !idade}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white rounded-xl font-semibold apple-transition shadow-lg"
      >
        {t('forms.ckdepi.calculate')}
      </button>
    </div>
  );
}

function CockcroftForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const t = useTranslations('calculadoras');
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
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{t('forms.cockcroft.title')}</h3>
      <p className="text-sm text-[#86868b]">{t('forms.cockcroft.description')}</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t('common.creatinine')}</label>
          <input
            type="number"
            step="0.01"
            value={creatinina}
            onChange={(e) => setCreatinina(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
            placeholder={t('common.exCreatinine')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('common.age')}</label>
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
          <label className="block text-sm font-medium mb-2">{t('common.weight')}</label>
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('common.sex')}</label>
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value as 'M' | 'F')}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value="M">{t('common.male')}</option>
            <option value="F">{t('common.female')}</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!creatinina || !idade || !peso}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:opacity-50 text-white rounded-xl font-semibold"
      >
        {t('forms.cockcroft.calculate')}
      </button>
    </div>
  );
}

function PHQ9Form({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const t = useTranslations('calculadoras');
  const [respostas, setRespostas] = useState<number[]>(Array(9).fill(0));

  const handleCalculate = () => {
    const result = calculatePHQ9(respostas);
    onResult(result);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{t('forms.phq9.title')}</h3>
      <p className="text-sm text-[#86868b]">{t('forms.phq9.description')}</p>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, i) => (
          <div key={i} className={`p-3 rounded-xl ${i === 8 ? 'bg-red-500/10 border border-red-500/30' : 'bg-white/30 dark:bg-neutral-800/30'}`}>
            <p className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
              {num}. {t(`forms.phq9.q${num}`)}
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
              <option value={0}>{t('forms.phq.opt0')}</option>
              <option value={1}>{t('forms.phq.opt1')}</option>
              <option value={2}>{t('forms.phq.opt2')}</option>
              <option value={3}>{t('forms.phq.opt3')}</option>
            </select>
          </div>
        ))}
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold"
      >
        {t('forms.phq9.calculate')}
      </button>
    </div>
  );
}

function PHQ2Form({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const t = useTranslations('calculadoras');
  const [interesse, setInteresse] = useState(0);
  const [humor, setHumor] = useState(0);

  const handleCalculate = () => {
    const result = calculatePHQ2(interesse, humor);
    onResult(result);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{t('forms.phq2.title')}</h3>
      <p className="text-sm text-[#86868b]">{t('forms.phq2.description')}</p>

      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">1. {t('forms.phq9.q1')}</p>
          <select
            value={interesse}
            onChange={(e) => setInteresse(parseInt(e.target.value))}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value={0}>{t('forms.phq.opt0')}</option>
            <option value={1}>{t('forms.phq.opt1')}</option>
            <option value={2}>{t('forms.phq.opt2')}</option>
            <option value={3}>{t('forms.phq.opt3')}</option>
          </select>
        </div>

        <div className="p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">2. {t('forms.phq9.q2')}</p>
          <select
            value={humor}
            onChange={(e) => setHumor(parseInt(e.target.value))}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value={0}>{t('forms.phq.opt0')}</option>
            <option value={1}>{t('forms.phq.opt1')}</option>
            <option value={2}>{t('forms.phq.opt2')}</option>
            <option value={3}>{t('forms.phq.opt3')}</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold"
      >
        {t('forms.phq2.calculate')}
      </button>
    </div>
  );
}

function AUDITCForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const t = useTranslations('calculadoras');
  const [frequencia, setFrequencia] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [binge, setBinge] = useState(0);

  const handleCalculate = () => {
    const result = calculateAUDITC(frequencia, quantidade, binge);
    onResult(result);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{t('forms.auditc.title')}</h3>
      <p className="text-sm text-[#86868b]">{t('forms.auditc.description')}</p>

      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">1. {t('forms.auditc.q1')}</p>
          <select
            value={frequencia}
            onChange={(e) => setFrequencia(parseInt(e.target.value))}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value={0}>{t('forms.auditc.freq0')}</option>
            <option value={1}>{t('forms.auditc.freq1')}</option>
            <option value={2}>{t('forms.auditc.freq2')}</option>
            <option value={3}>{t('forms.auditc.freq3')}</option>
            <option value={4}>{t('forms.auditc.freq4')}</option>
          </select>
        </div>

        <div className="p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">2. {t('forms.auditc.q2')}</p>
          <select
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value))}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value={0}>{t('forms.auditc.qty0')}</option>
            <option value={1}>{t('forms.auditc.qty1')}</option>
            <option value={2}>{t('forms.auditc.qty2')}</option>
            <option value={3}>{t('forms.auditc.qty3')}</option>
            <option value={4}>{t('forms.auditc.qty4')}</option>
          </select>
        </div>

        <div className="p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">3. {t('forms.auditc.q3')}</p>
          <select
            value={binge}
            onChange={(e) => setBinge(parseInt(e.target.value))}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value={0}>{t('forms.auditc.binge0')}</option>
            <option value={1}>{t('forms.auditc.binge1')}</option>
            <option value={2}>{t('forms.auditc.binge2')}</option>
            <option value={3}>{t('forms.auditc.binge3')}</option>
            <option value={4}>{t('forms.auditc.binge4')}</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold"
      >
        {t('forms.auditc.calculate')}
      </button>
    </div>
  );
}

function CAGEForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const t = useTranslations('calculadoras');
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
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{t('forms.cage.title')}</h3>
      <p className="text-sm text-[#86868b]">{t('forms.cage.description')}</p>

      <div className="space-y-3">
        <label className="flex items-start gap-3 p-4 rounded-xl bg-white/30 dark:bg-neutral-800/30 cursor-pointer">
          <input
            type="checkbox"
            checked={cutDown}
            onChange={(e) => setCutDown(e.target.checked)}
            className="mt-1 rounded"
          />
          <div>
            <span className="font-bold text-emerald-600">C</span>{t('forms.cage.cutDown')}
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
            <span className="font-bold text-emerald-600">A</span>{t('forms.cage.annoyed')}
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
            <span className="font-bold text-emerald-600">G</span>{t('forms.cage.guilty')}
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
            <span className="font-bold text-emerald-600">E</span>{t('forms.cage.eyeOpener')}
          </div>
        </label>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold"
      >
        {t('forms.cage.calculate')}
      </button>
    </div>
  );
}

function FINDRISCForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const t = useTranslations('calculadoras');
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
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{t('forms.findrisc.title')}</h3>
      <p className="text-sm text-[#86868b]">{t('forms.findrisc.description')}</p>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t('common.age')}</label>
            <input
              type="number"
              value={params.idade}
              onChange={(e) => setParams({...params, idade: parseInt(e.target.value)})}
              className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('common.sex')}</label>
            <select
              value={params.sexo}
              onChange={(e) => setParams({...params, sexo: e.target.value as 'M' | 'F'})}
              className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
            >
              <option value="M">{t('common.male')}</option>
              <option value="F">{t('common.female')}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t('forms.findrisc.bmi')}</label>
            <input
              type="number"
              step="0.1"
              value={params.imc}
              onChange={(e) => setParams({...params, imc: parseFloat(e.target.value)})}
              className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('forms.findrisc.waist')}</label>
            <input
              type="number"
              value={params.circunferenciaAbdominal}
              onChange={(e) => setParams({...params, circunferenciaAbdominal: parseInt(e.target.value)})}
              className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t('forms.findrisc.familyHistory')}</label>
          <select
            value={params.historicoFamiliarDM}
            onChange={(e) => setParams({...params, historicoFamiliarDM: e.target.value as 'nenhum' | 'segundo_grau' | 'primeiro_grau'})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value="nenhum">{t('forms.findrisc.familyNone')}</option>
            <option value="segundo_grau">{t('forms.findrisc.familySecond')}</option>
            <option value="primeiro_grau">{t('forms.findrisc.familyFirst')}</option>
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
            <span className="text-sm">{t('forms.findrisc.physicalActivity')}</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
            <input
              type="checkbox"
              checked={params.vegetaisDiarios}
              onChange={(e) => setParams({...params, vegetaisDiarios: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm">{t('forms.findrisc.vegetables')}</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
            <input
              type="checkbox"
              checked={params.usoAntiHipertensivo}
              onChange={(e) => setParams({...params, usoAntiHipertensivo: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm">{t('forms.findrisc.antihypertensive')}</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
            <input
              type="checkbox"
              checked={params.glicemiaAlteradaPrevia}
              onChange={(e) => setParams({...params, glicemiaAlteradaPrevia: e.target.checked})}
              className="rounded"
            />
            <span className="text-sm">{t('forms.findrisc.prediabetes')}</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold"
      >
        {t('forms.findrisc.calculate')}
      </button>
    </div>
  );
}

function DengueForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const t = useTranslations('calculadoras');
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
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{t('forms.dengue.title')}</h3>
      <p className="text-sm text-[#86868b]">{t('forms.dengue.description')}</p>

      <div>
        <label className="block text-sm font-medium mb-2">{t('common.weight')}</label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          placeholder={t('common.exWeight')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t('forms.dengue.riskClassification')}</label>
        <div className="space-y-2">
          <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer ${grupo === 'A' ? 'bg-green-500/20 border-2 border-green-500' : 'bg-white/30 dark:bg-neutral-800/30'}`}>
            <input type="radio" name="grupo" value="A" checked={grupo === 'A'} onChange={() => setGrupo('A')} />
            <div>
              <span className="font-bold text-green-600">{t('forms.dengue.groupA')}</span>
              <p className="text-xs text-[#86868b]">{t('forms.dengue.groupADesc')}</p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer ${grupo === 'B' ? 'bg-yellow-500/20 border-2 border-yellow-500' : 'bg-white/30 dark:bg-neutral-800/30'}`}>
            <input type="radio" name="grupo" value="B" checked={grupo === 'B'} onChange={() => setGrupo('B')} />
            <div>
              <span className="font-bold text-yellow-600">{t('forms.dengue.groupB')}</span>
              <p className="text-xs text-[#86868b]">{t('forms.dengue.groupBDesc')}</p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer ${grupo === 'C' ? 'bg-orange-500/20 border-2 border-orange-500' : 'bg-white/30 dark:bg-neutral-800/30'}`}>
            <input type="radio" name="grupo" value="C" checked={grupo === 'C'} onChange={() => setGrupo('C')} />
            <div>
              <span className="font-bold text-orange-600">{t('forms.dengue.groupC')}</span>
              <p className="text-xs text-[#86868b]">{t('forms.dengue.groupCDesc')}</p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer ${grupo === 'D' ? 'bg-red-500/20 border-2 border-red-500' : 'bg-white/30 dark:bg-neutral-800/30'}`}>
            <input type="radio" name="grupo" value="D" checked={grupo === 'D'} onChange={() => setGrupo('D')} />
            <div>
              <span className="font-bold text-red-600">{t('forms.dengue.groupD')}</span>
              <p className="text-xs text-[#86868b]">{t('forms.dengue.groupDDesc')}</p>
            </div>
          </label>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!peso}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:opacity-50 text-white rounded-xl font-semibold"
      >
        {t('forms.dengue.calculate')}
      </button>
    </div>
  );
}

function APGARForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const t = useTranslations('calculadoras');
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
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{t('forms.apgar.title')}</h3>
      <p className="text-sm text-[#86868b]">{t('forms.apgar.description')}</p>

      <div className="space-y-3">
        <div className="p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">{t('forms.apgar.heartRate')}</p>
          <select value={fc} onChange={(e) => setFc(parseInt(e.target.value) as 0 | 1 | 2)} className="w-full px-4 py-2 border rounded-lg bg-white/50 dark:bg-neutral-800/50">
            <option value={0}>{t('forms.apgar.hr0')}</option>
            <option value={1}>{t('forms.apgar.hr1')}</option>
            <option value={2}>{t('forms.apgar.hr2')}</option>
          </select>
        </div>

        <div className="p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">{t('forms.apgar.respiration')}</p>
          <select value={resp} onChange={(e) => setResp(parseInt(e.target.value) as 0 | 1 | 2)} className="w-full px-4 py-2 border rounded-lg bg-white/50 dark:bg-neutral-800/50">
            <option value={0}>{t('forms.apgar.resp0')}</option>
            <option value={1}>{t('forms.apgar.resp1')}</option>
            <option value={2}>{t('forms.apgar.resp2')}</option>
          </select>
        </div>

        <div className="p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">{t('forms.apgar.muscleTone')}</p>
          <select value={tonus} onChange={(e) => setTonus(parseInt(e.target.value) as 0 | 1 | 2)} className="w-full px-4 py-2 border rounded-lg bg-white/50 dark:bg-neutral-800/50">
            <option value={0}>{t('forms.apgar.tone0')}</option>
            <option value={1}>{t('forms.apgar.tone1')}</option>
            <option value={2}>{t('forms.apgar.tone2')}</option>
          </select>
        </div>

        <div className="p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">{t('forms.apgar.reflexIrritability')}</p>
          <select value={irrit} onChange={(e) => setIrrit(parseInt(e.target.value) as 0 | 1 | 2)} className="w-full px-4 py-2 border rounded-lg bg-white/50 dark:bg-neutral-800/50">
            <option value={0}>{t('forms.apgar.reflex0')}</option>
            <option value={1}>{t('forms.apgar.reflex1')}</option>
            <option value={2}>{t('forms.apgar.reflex2')}</option>
          </select>
        </div>

        <div className="p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <p className="text-sm font-medium mb-2">{t('forms.apgar.skinColor')}</p>
          <select value={cor} onChange={(e) => setCor(parseInt(e.target.value) as 0 | 1 | 2)} className="w-full px-4 py-2 border rounded-lg bg-white/50 dark:bg-neutral-800/50">
            <option value={0}>{t('forms.apgar.color0')}</option>
            <option value={1}>{t('forms.apgar.color1')}</option>
            <option value={2}>{t('forms.apgar.color2')}</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold"
      >
        {t('forms.apgar.calculate')}
      </button>
    </div>
  );
}

function FraminghamForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const t = useTranslations('calculadoras');
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
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{t('forms.framingham.title')}</h3>
      <p className="text-sm text-[#86868b]">{t('forms.framingham.description')}</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t('common.age')}</label>
          <input
            type="number"
            value={params.idade}
            onChange={(e) => setParams({...params, idade: e.target.value})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
            placeholder={t('common.years')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('common.sex')}</label>
          <select
            value={params.sexo}
            onChange={(e) => setParams({...params, sexo: e.target.value as 'M' | 'F'})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value="M">{t('common.male')}</option>
            <option value="F">{t('common.female')}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t('common.totalCholesterol')}</label>
          <input
            type="number"
            value={params.colesterolTotal}
            onChange={(e) => setParams({...params, colesterolTotal: e.target.value})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('common.hdl')}</label>
          <input
            type="number"
            value={params.hdl}
            onChange={(e) => setParams({...params, hdl: e.target.value})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t('common.systolicBP')}</label>
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
          <span className="text-sm">{t('common.currentSmoker')}</span>
        </label>
        <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <input type="checkbox" checked={params.diabetes} onChange={(e) => setParams({...params, diabetes: e.target.checked})} className="rounded" />
          <span className="text-sm">{t('common.diabetes')}</span>
        </label>
        <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
          <input type="checkbox" checked={params.tratamentoHAS} onChange={(e) => setParams({...params, tratamentoHAS: e.target.checked})} className="rounded" />
          <span className="text-sm">{t('common.hypertensionTreatment')}</span>
        </label>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!params.idade || !params.colesterolTotal || !params.hdl || !params.pressaoSistolica}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:opacity-50 text-white rounded-xl font-semibold"
      >
        {t('common.calculateRisk')}
      </button>
    </div>
  );
}

function GailForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const t = useTranslations('calculadoras');
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
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{t('forms.gail.title')}</h3>
      <p className="text-sm text-[#86868b]">{t('forms.gail.description')}</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t('forms.gail.currentAge')}</label>
          <input
            type="number"
            value={params.idade}
            onChange={(e) => setParams({...params, idade: e.target.value})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('forms.gail.menarcheAge')}</label>
          <input
            type="number"
            value={params.menarca}
            onChange={(e) => setParams({...params, menarca: e.target.value})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t('forms.gail.firstBirthAge')}</label>
        <input
          type="number"
          value={params.primeiroParto}
          onChange={(e) => setParams({...params, primeiroParto: e.target.value})}
          className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t('forms.gail.relatives')}</label>
        <select
          value={params.parentes}
          onChange={(e) => setParams({...params, parentes: e.target.value})}
          className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">{t('forms.gail.twoOrMore')}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t('forms.gail.biopsies')}</label>
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
        {t('common.calculateRisk')}
      </button>
    </div>
  );
}

function SCOREForm({ onResult }: { onResult: (result: CalculatorResult) => void }) {
  const t = useTranslations('calculadoras');
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
      <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">{t('forms.score.title')}</h3>
      <p className="text-sm text-[#86868b]">{t('forms.score.description')}</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t('common.age')}</label>
          <input
            type="number"
            value={params.idade}
            onChange={(e) => setParams({...params, idade: e.target.value})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('common.sex')}</label>
          <select
            value={params.sexo}
            onChange={(e) => setParams({...params, sexo: e.target.value as 'M' | 'F'})}
            className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
          >
            <option value="M">{t('common.male')}</option>
            <option value="F">{t('common.female')}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t('common.systolicBP')}</label>
        <input
          type="number"
          value={params.pressaoSistolica}
          onChange={(e) => setParams({...params, pressaoSistolica: e.target.value})}
          className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t('common.totalCholesterol')}</label>
        <input
          type="number"
          value={params.colesterolTotal}
          onChange={(e) => setParams({...params, colesterolTotal: e.target.value})}
          className="w-full px-4 py-3 border rounded-xl bg-white/50 dark:bg-neutral-800/50"
        />
      </div>

      <label className="flex items-center gap-3 p-3 rounded-xl bg-white/30 dark:bg-neutral-800/30">
        <input type="checkbox" checked={params.fumante} onChange={(e) => setParams({...params, fumante: e.target.checked})} className="rounded" />
        <span className="text-sm">{t('common.currentSmoker')}</span>
      </label>

      <button
        onClick={handleCalculate}
        disabled={!params.idade || !params.pressaoSistolica || !params.colesterolTotal}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 disabled:opacity-50 text-white rounded-xl font-semibold"
      >
        {t('common.calculateRisk')}
      </button>
    </div>
  );
}

