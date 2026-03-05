'use client';

import { useMemo, useState } from 'react';
import { Copy, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { emergencyScores, getAllEmergencyScoreCategories, getEmergencyScoreById } from '@/lib/ps/scores';

function formatResult(value: number): string {
  return Number.isFinite(value) ? String(value) : '--';
}

function clampValue(raw: string, input: { min?: number; max?: number }): number {
  if (raw === '') return 0;
  const parsed = parseFloat(raw);
  if (Number.isNaN(parsed)) return 0;
  if (input.min !== undefined) return Math.max(input.min, parsed);
  return parsed;
}

export default function PSEscalasPage() {
  const searchParams = useSearchParams();
  const initialScore = searchParams.get('score');
  const categories = useMemo(() => getAllEmergencyScoreCategories(), []);

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedScoreId, setSelectedScoreId] = useState<string>(() => {
    const found = initialScore && getEmergencyScoreById(initialScore);
    return found ? found.id : emergencyScores[0]?.id || '';
  });
  const [values, setValues] = useState<Record<string, number>>({});

  const filteredScores = useMemo(() => {
    return emergencyScores.filter((score) => {
      const matchQuery = query
        ? score.name.toLowerCase().includes(query.toLowerCase()) ||
          score.abbreviation.toLowerCase().includes(query.toLowerCase()) ||
          score.keywords.some((keyword) => keyword.toLowerCase().includes(query.toLowerCase()))
        : true;
      const matchCategory = selectedCategory ? score.category === selectedCategory : true;
      return matchQuery && matchCategory;
    });
  }, [query, selectedCategory]);

  const score = useMemo(
    () => getEmergencyScoreById(selectedScoreId),
    [selectedScoreId]
  );

  const result = score ? score.calculate(values) : 0;
  const interpretation = score?.interpretationRanges.find(
    (range) => result >= range.min && result <= range.max
  );

  const copyResult = async () => {
    if (!score) return;
    const lines = [
      `${score.name} (${score.abbreviation})`,
      `Resultado: ${result} / ${score.maxScore}`,
      interpretation ? `Classificação: ${interpretation.label}` : 'Classificação: -',
      interpretation ? interpretation.recommendation : '',
      `Fonte: ${score.references?.[0]?.citation ?? 'Sem referência'}`,
    ].filter(Boolean);

    await navigator.clipboard?.writeText(lines.join('\n'));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 pb-24">
      <div className="max-w-6xl mx-auto space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Escalas e Scores</h1>
          <p className="text-slate-400 text-sm mt-1">
            Calculadoras essenciais de emergência com resultado e interpretação em tempo real.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-[1.1fr_1fr]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome, sigla ou palavra-chave..."
            className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none"
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none"
          >
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <section className="bg-slate-900 border border-slate-700 rounded-xl p-4">
          <h2 className="text-sm font-bold text-slate-300 mb-3">Selecione a escala</h2>
          <div className="flex flex-wrap gap-2">
            {filteredScores.map((candidate) => (
              <button
                key={candidate.id}
                onClick={() => {
                  setSelectedScoreId(candidate.id);
                  setValues({});
                }}
                className={`px-3 py-1.5 rounded-full border text-xs ${
                  selectedScoreId === candidate.id
                    ? 'bg-red-500/10 border-red-500/30 text-red-200'
                    : 'border-slate-700 text-slate-300'
                }`}
              >
                {candidate.name}
                <span className="ml-2 text-slate-500">({candidate.abbreviation})</span>
              </button>
            ))}
            {filteredScores.length === 0 && (
              <p className="text-sm text-slate-500">Nenhuma escala encontrada.</p>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Total disponível: {filteredScores.length}
          </p>
        </section>

        {score ? (
          <section className="grid gap-3 md:grid-cols-2">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <h2 className="text-lg font-bold text-white mb-1">{score.name}</h2>
              <p className="text-slate-400 text-sm mb-3">
                {score.description}
              </p>

              <div className="space-y-3">
                {score.inputs.map((input) => {
                  if (input.type === 'number') {
                    return (
                      <label key={input.id} className="block text-sm">
                        <span className="text-slate-300">{input.label}</span>
                        <input
                          type="number"
                          inputMode="decimal"
                          min={input.min}
                          max={input.max}
                          step="0.1"
                          value={values[input.id] ?? ''}
                          onChange={(event) =>
                            setValues((current) => ({
                              ...current,
                              [input.id]: clampValue(event.target.value, input),
                            }))
                          }
                          className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                          placeholder="0"
                        />
                      </label>
                    );
                  }

                  return (
                    <label key={input.id} className="block text-sm">
                      <span className="text-slate-300">{input.label}</span>
                      <select
                        value={values[input.id] ?? ''}
                        onChange={(event) =>
                          setValues((current) => ({
                            ...current,
                            [input.id]: parseFloat(event.target.value),
                          }))
                        }
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
                      >
                        <option value="">Selecionar</option>
                        {(input.options ?? []).map((option) => (
                          <option key={`${input.id}-${option.value}`} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                })}
              </div>

              <button
                onClick={copyResult}
                className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800"
              >
                <Copy className="w-4 h-4" />
                Copiar resultado
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-slate-300">Resultado</h3>
              <div className="mt-3 p-4 rounded-lg bg-slate-800 border border-slate-700">
                <p className="text-4xl font-bold text-white">
                  {formatResult(result)}
                  <span className="text-sm text-slate-400 font-normal ml-1">/ {score.maxScore}</span>
                </p>
                <p className="text-slate-300 mt-2">{interpretation ? interpretation.label : 'Sem classificação'}</p>
                <p className="text-xs text-slate-500 mt-1">
                  Risco: {interpretation ? interpretation.recommendation : 'Preencha os campos.'}
                </p>
              </div>

              <div className="mt-3 text-xs text-slate-500 space-y-1">
                {score.interpretationRanges.map((range) => (
                  <p
                    key={`${score.id}-${range.min}-${range.max}`}
                    className={`px-2 py-1 rounded ${result >= range.min && result <= range.max ? 'bg-slate-800 text-slate-200' : 'text-slate-600'}`}
                  >
                    {range.min}-{range.max}: {range.label}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-500">
            Selecione uma escala para iniciar o cálculo.
          </div>
        )}

        <section className="bg-slate-900 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-300">Referências</h3>
            <Link href="/ps/escalas" className="text-xs text-slate-500">
              <Search className="w-4 h-4 inline-block mr-1" />
              Também disponível em escalas
            </Link>
          </div>
          {score ? (
            <ul className="list-disc pl-4 mt-3 space-y-1 text-xs text-slate-400">
              {score.references.slice(0, 2).map((reference) => (
                <li key={`${score.id}-${reference.citation}`}>{reference.citation}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 mt-2">Selecione uma escala para ver referências.</p>
          )}
        </section>
      </div>
    </div>
  );
}
