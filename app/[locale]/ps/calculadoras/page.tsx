'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, Calculator, Droplets, Flame, Copy, RefreshCw, User } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { allEmergencyDrugs } from '@/lib/ps/data';
import { generateInfusionTable } from '@/lib/ps/types';
import { getEffectiveWeight, usePSStore } from '@/lib/store/psStore';

function safeNumber(value: string): number {
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toFixed(value: number, digits = 2): string {
  return Number.isFinite(value) ? value.toFixed(digits) : '--';
}

function findDrugById(id: string) {
  return allEmergencyDrugs.find((drug) => drug.id === id);
}

function calculateParkland(weightKg: number, burnedPercent: number): { total: number; first8h: number; second8h: number } {
  const percent = Math.max(0, Math.min(100, burnedPercent));
  const total = 4 * weightKg * percent;
  const first8h = total / 2;
  return {
    total,
    first8h,
    second8h: total - first8h,
  };
}

function copyText(text: string) {
  if (!navigator.clipboard) return;
  void navigator.clipboard.writeText(text);
}

export default function PSCalculadorasPage() {
  const { patient, setPatientWeight, resetPatient } = usePSStore();
  const effectiveWeight = getEffectiveWeight(patient);
  const [localWeightInput, setLocalWeightInput] = useState(() => (effectiveWeight ? String(effectiveWeight) : ''));
  const [selectedDrugId, setSelectedDrugId] = useState('noradrenalina');
  const [burnedPercent, setBurnedPercent] = useState('18');

  useEffect(() => {
    const next = effectiveWeight ? String(effectiveWeight) : '';
    setLocalWeightInput(next);
  }, [effectiveWeight]);

  const emergencyVasoativos = useMemo(
    () => allEmergencyDrugs.filter((drug) => drug.category === 'vasoativa').slice(0, 20),
    []
  );

  const emergencyRsi = useMemo(
    () => allEmergencyDrugs.filter((drug) => drug.category === 'rsi').slice(0, 20),
    []
  );

  const selectedDrug = useMemo(() => findDrugById(selectedDrugId), [selectedDrugId]);
  const selectedDosing = selectedDrug?.emergencyDosing?.[0];

  const weightAsNumber = safeNumber(localWeightInput);
  const isWeightValid = weightAsNumber > 0 && weightAsNumber <= 500;

  const infusionRows = useMemo(() => {
    if (!selectedDosing?.infusion || !selectedDosing?.infusion?.dilution?.finalConcentration || !isWeightValid) {
      return [] as Array<{
        dose: number;
        unit: string;
        dosePerMin: number;
        mlPerHour: number;
      }>;
    }

    return generateInfusionTable(
      weightAsNumber,
      selectedDosing.infusion.steps,
      selectedDosing.infusion.dilution.finalConcentration
    );
  }, [isWeightValid, selectedDosing]);

  const rsiWeightRows = useMemo(() => {
    if (!patient.weight) {
      return [] as { id: string; name: string; min: number; max: number; unit: string; onset?: string }[];
    }

    return emergencyRsi
      .filter((drug) => drug.emergencyDosing.length > 0)
      .map((drug) => {
        const dosing = drug.emergencyDosing[0];
        const min = dosing.doseRange.min * patient.weight!;
        const max = dosing.doseRange.max * patient.weight!;
        return {
          id: drug.id,
          name: drug.genericName,
          min,
          max,
          unit: dosing.doseUnit,
          onset: dosing.onset,
        };
      });
  }, [patient.weight, emergencyRsi]);

  const parkland = useMemo(() => {
    if (!isWeightValid) return null;
    return calculateParkland(weightAsNumber, safeNumber(burnedPercent));
  }, [burnedPercent, isWeightValid, weightAsNumber]);

  const drugDoseSummary = useMemo(() => {
    if (!selectedDosing) return null;

    const base = `${selectedDosing.doseRange.min} - ${selectedDosing.doseRange.max} ${selectedDosing.doseUnit}`;
    if (!selectedDosing.infusion || !isWeightValid) {
      if (selectedDosing.route.toLowerCase().includes('kg')) {
        const min = selectedDosing.doseRange.min * weightAsNumber;
        const max = selectedDosing.doseRange.max * weightAsNumber;
        return `${toFixed(min)} - ${toFixed(max)} ${selectedDosing.doseUnit.replace(' / kg', '')}`;
      }
      return base;
    }

    const minStep = selectedDosing.infusion.steps[0]?.dosePerKgMin;
    const maxStep = selectedDosing.infusion.steps[selectedDosing.infusion.steps.length - 1]?.dosePerKgMin;
    if (minStep === undefined || maxStep === undefined) return base;

    const minMl = generateInfusionTable(
      weightAsNumber,
      [{ dosePerKgMin: minStep, unit: selectedDosing.infusion.rateUnit }],
      selectedDosing.infusion.dilution.finalConcentration
    )[0]?.mlPerHour;
    const maxMl = generateInfusionTable(
      weightAsNumber,
      [{ dosePerKgMin: maxStep, unit: selectedDosing.infusion.rateUnit }],
      selectedDosing.infusion.dilution.finalConcentration
    )[0]?.mlPerHour;

    const infusionRange = `${toFixed(minMl ?? 0, 1)} - ${toFixed(maxMl ?? 0, 1)} mL/h`;
    return `${base} • ${infusionRange}`;
  }, [isWeightValid, selectedDosing, weightAsNumber]);

  const parklandText = parkland
    ? `Parkland total: ${toFixed(parkland.total, 0)} mL em 24h (${toFixed(parkland.first8h, 0)}mL / ${toFixed(parkland.second8h, 0)}mL).`
    : 'Informe peso para calcular Parkland.';

  const copySummary = () => {
    const lines = [
      'DARWIN PS - Calculadora',
      `Peso: ${localWeightInput || 'não informado'} kg`,
      selectedDrug ? `Droga: ${selectedDrug.genericName}` : null,
      drugDoseSummary ? `Dose: ${drugDoseSummary}` : null,
      `Parkland: ${parklandText}`,
      `RSI disponível: ${rsiWeightRows.length} fármacos`,
    ].filter(Boolean);

    copyText(lines.join('\n'));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 pb-24">
      <div className="max-w-6xl mx-auto space-y-4">
        <Link
          href="/ps"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar ao painel
        </Link>

        <h1 className="text-2xl font-bold">Calculadoras de Emergência</h1>
        <p className="text-slate-400 text-sm">Módulo de dosagem por peso e protocolos críticos.</p>

        <section className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-3">
          <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Peso ativo
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            <input
              type="number"
              inputMode="decimal"
              value={localWeightInput}
              onChange={(event) => {
                const value = event.target.value;
                setLocalWeightInput(value);
                const num = parseFloat(value);
                if (Number.isNaN(num)) {
                  setPatientWeight(null);
                  return;
                }
                if (num > 0 && num <= 500) {
                  setPatientWeight(num);
                }
              }}
              placeholder="Peso (kg)"
              min={0.5}
              max={500}
              step={0.1}
              className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
            />
            <button
              onClick={resetPatient}
              className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800"
            >
              <RefreshCw className="w-4 h-4" />
              Limpar peso
            </button>
          </div>
          <p className="text-xs text-slate-500">Peso atual no cabeçalho: {effectiveWeight ? `${effectiveWeight} kg` : 'não informado'}</p>
        </section>

        <section className="grid lg:grid-cols-2 gap-4">
          <section className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-3">
            <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Dose por peso - vasoativas
            </h2>

            <label className="block text-sm">
              <span className="text-slate-300">Droga</span>
              <select
                value={selectedDrugId}
                onChange={(event) => setSelectedDrugId(event.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
              >
                {emergencyVasoativos.map((drug) => (
                  <option key={drug.id} value={drug.id}>
                    {drug.genericName}
                  </option>
                ))}
              </select>
            </label>

            {selectedDrug ? (
              <div className="space-y-2 text-sm">
                <p className="text-slate-300">{selectedDrug.mechanismOfAction}</p>
                <p className="text-slate-200">{drugDoseSummary ?? 'Dose indisponível'}</p>
                {selectedDosing?.infusion ? (
                  <div className="mt-2 rounded-lg border border-slate-700 p-3">
                    <p className="text-xs uppercase text-slate-500 mb-2">Infusão (estimada para o peso informado)</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr>
                            <th className="py-1 pr-3 text-slate-500">Dose alvo</th>
                            <th className="py-1 pr-3 text-slate-500">{selectedDosing.infusion.rateUnit}</th>
                            <th className="py-1 pr-3 text-slate-500">mL/h</th>
                          </tr>
                        </thead>
                        <tbody>
                          {infusionRows.length === 0 ? (
                            <tr>
                              <td colSpan={3} className="py-2 text-slate-500">Informe peso para calcular</td>
                            </tr>
                          ) : (
                            infusionRows.map((row) => (
                              <tr key={`${selectedDrugId}-${row.dose}`}>
                                <td className="py-1 pr-3">{row.dose}</td>
                                <td className="py-1 pr-3">{toFixed(row.dosePerMin, 2)}</td>
                                <td className="py-1 pr-3">{toFixed(row.mlPerHour, 1)}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Sem modo de infusão contínua configurado para esta medicação.</p>
                )}
              </div>
            ) : null}
          </section>

          <section className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-3">
            <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Flame className="w-4 h-4" />
              RSI por peso
            </h2>

            <p className="text-xs text-slate-500">Doses para indução inicial de RSI (com base em 1 kg).</p>
            {patient.weight ? (
              <div className="space-y-2">
                {rsiWeightRows.map((row) => (
                  <div key={row.id} className="bg-slate-950 border border-slate-700 rounded-lg p-2">
                    <p className="font-semibold text-sm text-white">{row.name}</p>
                    <p className="text-xs text-slate-300 mt-1">Dose: {toFixed(row.min, 1)} - {toFixed(row.max, 1)} {row.unit}</p>
                    {row.onset ? <p className="text-xs text-slate-500 mt-1">Início: {row.onset}</p> : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Informe o peso para ativar cálculo por kg.</p>
            )}
          </section>
        </section>

        <section className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-3">
          <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">🧮 Parkland</h2>
          <label className="block text-sm">
            <span className="text-slate-300">Área de Superfície Queimada (%)</span>
            <input
              type="number"
              min={1}
              max={100}
              step={1}
              value={burnedPercent}
              onChange={(event) => setBurnedPercent(event.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white outline-none"
            />
          </label>
          <p className="text-sm text-slate-200">{parklandText}</p>
          <p className="text-xs text-slate-500">Fórmula: 4 mL/kg/%% SCQ no primeiro dia (50% em 8h, 50% em 16h).</p>
        </section>

        <section className="flex items-center justify-between gap-3 text-sm">
          <button
            onClick={copySummary}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 text-slate-200"
          >
            <Copy className="w-4 h-4" />
            Copiar resumo
          </button>
          <Link
            href="/ps/escalas"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 text-slate-200"
          >
            <User className="w-4 h-4" />
            Ver escalas
          </Link>
        </section>
      </div>
    </div>
  );
}
