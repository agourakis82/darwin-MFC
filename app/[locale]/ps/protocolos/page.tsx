'use client';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { emergencyProtocols } from '@/lib/ps/protocols';

export default function PSProtocolosPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const normalizedQuery = query.trim().toLowerCase();
  const categories = useMemo(
    () => [...new Set(emergencyProtocols.map((protocol) => protocol.category))].sort(),
    []
  );

  const filteredProtocols = useMemo(() => {
    return emergencyProtocols.filter((protocol) => {
      const textMatch = normalizedQuery
        ? `${protocol.name} ${protocol.shortName} ${protocol.description} ${protocol.category}`.toLowerCase().includes(normalizedQuery)
        : true;
      const categoryMatch = category ? protocol.category === category : true;
      return textMatch && categoryMatch;
    });
  }, [category, normalizedQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Protocolos de Emergência</h1>
          <p className="text-slate-400 text-sm mt-1">
            Acesso rápido a fluxogramas críticos para uso em sala de emergência.
          </p>
        </div>

        <div className="space-y-2 md:space-y-0 md:flex md:items-end md:gap-3">
          <label className="flex-1 block">
            <span className="sr-only">Buscar protocolo</span>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar protocolo, palavra-chave ou categoria..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder-slate-500"
              />
            </div>
          </label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full md:w-56 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white outline-none"
          >
            <option value="">Todas as categorias</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-3">
          {filteredProtocols.map((protocol) => (
            <Link
              key={protocol.id}
              href={`/ps/protocolos/${protocol.id}`}
              className="bg-slate-900 border border-slate-700 rounded-xl p-4 hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold" style={{ color: protocol.color }}>
                  {protocol.name}
                </h2>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {protocol.shortName}
                </span>
              </div>
              <p className="text-slate-300 text-sm">{protocol.description}</p>
              <p className="text-slate-500 text-xs mt-2">
                Categoria: {protocol.category} • {protocol.steps.length} etapas
              </p>
            </Link>
          ))}

          {filteredProtocols.length === 0 && (
            <p className="text-sm text-slate-500 border border-dashed border-slate-700 rounded-xl p-4">
              Nenhum protocolo encontrado para os filtros atuais.
            </p>
          )}
        </div>

        <div className="text-xs text-slate-500">
          {filteredProtocols.length} protocolo(s) exibido(s)
        </div>
      </div>
    </div>
  );
}
