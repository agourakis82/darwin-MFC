'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ChevronLeft, ShieldCheck, Timer, AlertTriangle } from 'lucide-react';
import { allEmergencyDrugs } from '@/lib/ps/data';
import { getEffectiveWeight, usePSStore } from '@/lib/store/psStore';
import { generateInfusionTable } from '@/lib/ps/types';

function resolveDrug(id: string) {
  return allEmergencyDrugs.find((drug) => drug.id === id);
}

export default function PSDrugDetailPage() {
  const params = useParams();
  const rawId = typeof params?.id === 'string' ? params.id : null;
  const { patient } = usePSStore();
  const weight = getEffectiveWeight(patient);

  const drug = useMemo(() => (rawId ? resolveDrug(rawId) : undefined), [rawId]);

  if (!drug) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4">
        <p className="text-slate-400">Droga não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-4">
        <Link
          href="/ps/drogas"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para drogas
        </Link>

        <header className="space-y-2">
          <h1 className="text-2xl font-bold">{drug.genericName}</h1>
          <p className="text-slate-400">{drug.mechanismOfAction}</p>
          <div className="flex flex-wrap gap-2">
            {drug.tradeName.map((name) => (
              <span
                key={name}
                className="inline-flex text-xs rounded-full border border-slate-700 px-2 py-1 text-slate-300"
              >
                {name}
              </span>
            ))}
          </div>
        </header>

        <section className="bg-slate-900 border border-slate-700 rounded-xl p-4">
          <h2 className="text-sm font-bold text-slate-300 mb-2">Identificação e segurança</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <p><span className="text-slate-500">ATC:</span> {drug.atcCode}</p>
            <p><span className="text-slate-500">SNOMED:</span> {drug.snomedCT || '-'}</p>
            <p>
              <span className="text-slate-500">Apresentações:</span>{' '}
              {drug.presentations.join(', ') || 'Não informado'}
            </p>
            <p>
              <span className="text-slate-500">Categoria:</span> {drug.category}
              {drug.rename ? ' • RENAME' : ''}
              {drug.sus ? ' • SUS' : ''}
            </p>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-700 rounded-xl p-4">
          <h2 className="text-sm font-bold text-slate-300 mb-3">Doses e condutas</h2>
          <div className="space-y-4">
            {drug.emergencyDosing.map((dosing) => {
              const infusionSteps = dosing.infusion?.steps;
              const finalConcentration = dosing.infusion?.dilution.finalConcentration;
              const infusionRows =
                weight && infusionSteps && finalConcentration
                  ? generateInfusionTable(weight, infusionSteps, finalConcentration)
                  : [];

              return (
                <article
                  key={`${drug.id}-${dosing.indication}`}
                  className="rounded-lg border border-slate-800 p-3"
                >
                  <p className="font-semibold text-sm text-white">{dosing.indication}</p>
                  <p className="text-slate-300 text-sm mt-1">
                    {dosing.doseRange.min} a {dosing.doseRange.max} {dosing.doseUnit}
                    {dosing.maxDose ? ` · máx. ${dosing.maxDose}` : ''}
                  </p>
                  {dosing.bolus && (
                    <p className="text-slate-400 text-xs mt-1">Bolo: {dosing.bolus}</p>
                  )}
                  <p className="text-slate-500 text-xs mt-1">Via: {dosing.route}</p>

                  {dosing.infusion && (
                    <div className="mt-3">
                      <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-semibold mb-2">
                        <Timer className="w-3.5 h-3.5" />
                        Infusão contínua
                      </div>
                      <p className="text-xs text-slate-400">
                        Diluição: {dosing.infusion.dilution.description} | Estabilidade:{' '}
                        {dosing.infusion.dilution.stability}
                      </p>
                      <p className="text-xs text-slate-400">
                        Dose alvo: {dosing.infusion.rateRange.min} a {dosing.infusion.rateRange.max}{' '}
                        {dosing.infusion.rateUnit}
                      </p>
                      {weight ? (
                        <p className="text-xs text-emerald-300 mt-1">
                          Peso ativo: {weight} kg
                        </p>
                      ) : (
                        <p className="text-xs text-amber-300 mt-1">
                          Informe peso para ver mL/h por kg/min.
                        </p>
                      )}

                      {weight && infusionRows.length > 0 && (
                        <div className="mt-2 overflow-x-auto">
                          <table className="w-full text-xs text-left">
                            <thead>
                              <tr className="text-slate-500">
                                <th className="py-1 pr-3">Dose alvo</th>
                                <th className="py-1 pr-3">dose/kg/min</th>
                                <th className="py-1 pr-3">mL/h</th>
                              </tr>
                            </thead>
                            <tbody>
                              {infusionRows.map((row) => (
                                <tr key={`${drug.id}-${row.dose}`}>
                                  <td className="py-1 pr-3 text-slate-300">{row.dose}</td>
                                  <td className="py-1 pr-3 text-slate-200">
                                    {row.dosePerMin}
                                  </td>
                                  <td className="py-1 pr-3 text-slate-200">{row.mlPerHour}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-700 rounded-xl p-4">
          <h2 className="text-sm font-bold text-slate-300 mb-2">Segurança</h2>
          <div className="mb-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Compatibilidade em Y
            </h3>
            <div className="mt-2 space-y-2 text-xs">
              {drug.yCompatibility.length === 0 ? (
                <p className="text-slate-500">
                  Dados de compatibilidade indisponíveis. Consulte protocolo local de compatibilidade.
                </p>
              ) : (
                drug.yCompatibility.slice(0, 12).map((item) => {
                  const statusStyle =
                    item.status === 'compatible'
                      ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-200'
                      : item.status === 'incompatible'
                        ? 'bg-red-500/10 border-red-400/30 text-red-200'
                        : 'bg-amber-500/10 border-amber-400/30 text-amber-200';

                  return (
                    <div
                      key={`${drug.id}-${item.drugId}`}
                      className={`rounded-lg border px-2 py-1.5 ${statusStyle}`}
                    >
                      <span className="font-semibold">{item.drugName}</span>
                      <span className="ml-2">
                        {item.status === 'compatible'
                          ? 'Compatível'
                          : item.status === 'incompatible'
                            ? 'Incompatível'
                            : 'Condição desconhecida'}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
              <p className="text-slate-400 text-xs mb-1 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Contraindicações
              </p>
              <ul className="text-xs text-slate-300 list-disc pl-4 space-y-1">
                {drug.contraindications.slice(0, 8).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
              <p className="text-slate-400 text-xs mb-1 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Efeitos adversos graves
              </p>
              <ul className="text-xs text-slate-300 list-disc pl-4 space-y-1">
                {drug.seriousAdverseEffects.slice(0, 8).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {drug.references.length > 0 && (
          <section className="bg-slate-900 border border-slate-700 rounded-xl p-4">
            <h2 className="text-sm font-bold text-slate-300 mb-2">Referências</h2>
            <ul className="text-xs text-slate-400 list-disc pl-4 space-y-1">
              {drug.references.slice(0, 5).map((reference) => (
                <li key={reference.citation}>
                  <span className="text-slate-300">{reference.citation}</span>{' '}
                  <span className="text-slate-500">({reference.year})</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
