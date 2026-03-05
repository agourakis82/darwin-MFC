'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { allEmergencyDrugs } from '@/lib/ps/data';
import { usePSStore, getEffectiveWeight } from '@/lib/store/psStore';
import { calculateInfusionRate } from '@/lib/ps/types';
import { ChevronDown, ChevronUp, Search, User } from 'lucide-react';
import { EmergencyDrugCategory } from '@/lib/ps/types';

const categoryLabel: Record<EmergencyDrugCategory, string> = {
  vasoativa: 'Vasoativa',
  rsi: 'RSI/BNM',
  antidoto: 'Antídoto',
  antiarritmico: 'Antiarritmico',
  sedacao: 'Sedação',
  analgesico: 'Analgésico',
  trombolitico: 'Trombolítico',
  anticoagulante: 'Anticoagulante',
  anticonvulsivante: 'Anticonvulsivante',
  eletrolitico: 'Eletrolítico',
  outro: 'Outro',
};

function summarizeDose(
  drug: (typeof allEmergencyDrugs)[number],
  weight: number | null
): string {
  const dosing = drug.emergencyDosing[0];
  if (!dosing) return 'Dose não informada';

  const baseDose = `${dosing.doseRange.min} a ${dosing.doseRange.max} ${dosing.doseUnit}`;
  if (!dosing.infusion) return `${baseDose} (sem infusão contínua)`;

  if (!weight) {
    return `${baseDose} (${dosing.infusion.rateRange.min} a ${dosing.infusion.rateRange.max} ${dosing.infusion.rateUnit})`;
  }

  const steps = dosing.infusion.steps;
  const concentration = dosing.infusion.dilution.finalConcentration;
  if (concentration <= 0 || steps.length === 0) {
    return `${baseDose} (dose fixa)`;
  }

  const min = calculateInfusionRate(weight, steps[0].dosePerKgMin, concentration);
  const max = calculateInfusionRate(weight, steps[steps.length - 1].dosePerKgMin, concentration);
  return `${Math.round(min * 10) / 10} a ${Math.round(max * 10) / 10} mL/h`;
}

export default function PSDrogasPage() {
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get('cat');
  const query = (searchParams.get('q') || '').trim().toLowerCase();
  const [searchTerm, setSearchTerm] = useState(query);

  const { patient } = usePSStore();
  const weight = getEffectiveWeight(patient);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const categories = Array.from(
    new Set(allEmergencyDrugs.map((drug) => drug.category as EmergencyDrugCategory))
  ) as EmergencyDrugCategory[];
  const category = rawCategory && categories.includes(rawCategory as EmergencyDrugCategory)
    ? (rawCategory as EmergencyDrugCategory)
    : null;

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const drugs = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    const normalizedQuery = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return allEmergencyDrugs.filter((drug) => {
      if (category && drug.category !== category) return false;
      if (!normalized) return true;
      const categoryName = categoryLabel[drug.category].toLowerCase();
      const values = [
        drug.genericName.toLowerCase(),
        ...drug.tradeName.map((trade) => trade.toLowerCase()),
        ...drug.keywords.map((word) => word.toLowerCase()),
        drug.id,
        categoryName,
      ];
      return values.some((value) => {
        const normalizedValue = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        return normalizedValue.includes(normalizedQuery);
      });
    });
  }, [category, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 pb-20">
      <div className="max-w-5xl mx-auto space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Drogas de Emergência</h1>
          <p className="text-slate-400 text-sm mt-1">
            Dados calculados por peso com referência em protocolos brasileiros.
          </p>
        </div>

        <form className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex-1 flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              name="q"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar droga, nome comercial, categoria..."
              className="w-full bg-transparent text-white placeholder-slate-500 text-sm outline-none"
            />
          </div>
          <div className="text-sm text-slate-400 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/ps/drogas${cat === category ? '' : `?cat=${cat}`}`}
                className={`px-3 py-1.5 rounded-full border ${category === cat ? 'border-red-400 bg-red-500/10 text-red-200' : 'border-slate-600 text-slate-300'}`}
              >
                {categoryLabel[cat]}
              </Link>
            ))}
            {category && (
              <Link
                href="/ps/drogas"
                className="px-3 py-1.5 rounded-full border border-slate-600 text-slate-300"
              >
                Todas
              </Link>
            )}
          </div>
        </form>

        {drugs.length === 0 && (
          <div className="border border-dashed border-slate-700 rounded-xl p-6 text-center text-slate-400">
            Nenhuma droga encontrada.
          </div>
        )}

        <div className="space-y-3">
          {drugs.map((drug) => {
            const open = expandedId === drug.id;
            return (
              <section key={drug.id} className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedId(open ? null : drug.id)}
                  className="w-full text-left p-3 md:p-4 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center flex-wrap gap-2">
                      <h2 className="font-bold text-lg">{drug.genericName}</h2>
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {categoryLabel[drug.category]}
                      </span>
                      {drug.sus && (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          RENAME
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm mt-1">
                      {drug.mechanismOfAction}
                    </p>
                    <p className="text-amber-200 text-xs mt-2">
                      Dose rápida: {summarizeDose(drug, weight)}
                    </p>
                    {weight && drug.id && (
                      <p className="text-slate-500 text-xs mt-1">
                        Peso ativo: {weight} kg {patient.useIdealWeight ? '(ideal)' : ''}
                      </p>
                    )}
                    <div className="mt-2">
                      <Link
                        href={`/ps/drogas/${drug.id}`}
                        className="text-xs text-red-300 underline underline-offset-2"
                        onClick={(event) => event.stopPropagation()}
                      >
                        Ver ficha completa
                      </Link>
                    </div>
                  </div>
                  {open ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>

                {open && (
                  <div className="px-3 pb-3 md:px-4 md:pb-4 pt-0 space-y-3">
                    <div className="border-t border-slate-800 pt-3">
                      {drug.emergencyDosing.map((dosing) => (
                        <div key={`${drug.id}-${dosing.indication}`} className="mb-3">
                          <p className="font-semibold text-sm text-white">{dosing.indication}</p>
                          <p className="text-slate-300 text-sm mt-1">
                            Dose: {dosing.doseRange.min} - {dosing.doseRange.max} {dosing.doseUnit}
                            {dosing.maxDose ? ` (máx ${dosing.maxDose})` : ''}
                          </p>
                          {dosing.route && <p className="text-slate-400 text-xs mt-1">Via: {dosing.route}</p>}
                          {dosing.bolus && <p className="text-slate-400 text-xs mt-1">Bolo: {dosing.bolus}</p>}
                          {dosing.notes?.map((note) => (
                            <p key={`${drug.id}-note-${note}`} className="text-slate-500 text-xs mt-1 flex items-start gap-2">
                              <User className="w-3.5 h-3.5 mt-0.5 text-slate-600" />
                              <span>{note}</span>
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-400 mb-1">Contraindicacoes</p>
                      <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
                        {drug.contraindications.slice(0, 6).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-400 mb-1">Interacoes / notas críticas</p>
                      <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1">
                        {drug.seriousAdverseEffects.slice(0, 6).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
