'use client';

import { Reference } from '@/lib/types/references';
import { references } from '@/lib/data/references';
import { useState, useMemo } from 'react';

interface ReferenceListProps {
  filterByIds?: string[];
  format?: 'vancouver' | 'abnt';
}

export default function ReferenceList({ filterByIds, format = 'vancouver' }: ReferenceListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  
  const filteredRefs = useMemo(() => {
    let refs = Object.values(references);
    
    // Filtrar por IDs específicos se fornecido
    if (filterByIds && filterByIds.length > 0) {
      refs = refs.filter(ref => filterByIds.includes(ref.id));
    }
    
    // Filtrar por tipo
    if (filterType !== 'all') {
      refs = refs.filter(ref => ref.type === filterType);
    }
    
    // Filtrar por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      refs = refs.filter(ref => 
        ref.title.toLowerCase().includes(term) ||
        ref.authors?.some(author => author.toLowerCase().includes(term)) ||
        ref.year.toString().includes(term)
      );
    }
    
    // Ordenar por ano (mais recente primeiro) e depois alfabeticamente
    return refs.sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return a.title.localeCompare(b.title);
    });
  }, [filterByIds, filterType, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar referências..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Todos os tipos</option>
          <option value="artigo">Artigos</option>
          <option value="portaria">Portarias</option>
          <option value="lei">Leis</option>
          <option value="diretriz">Diretrizes</option>
          <option value="nota_tecnica">Notas Técnicas</option>
          <option value="livro">Livros</option>
          <option value="site">Sites</option>
        </select>
      </div>

      {/* Contagem */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        {filteredRefs.length} {filteredRefs.length === 1 ? 'referência encontrada' : 'referências encontradas'}
      </div>

      {/* Lista de Referências */}
      <div className="space-y-4">
        {filteredRefs.map((ref, index) => (
          <div 
            key={ref.id}
            id={`ref-${ref.id}`}
            className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
          >
            {format === 'vancouver' ? (
              <VancouverFormat ref={ref} number={index + 1} />
            ) : (
              <ABNTFormat ref={ref} />
            )}
          </div>
        ))}
      </div>

      {filteredRefs.length === 0 && (
        <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
          Nenhuma referência encontrada.
        </div>
      )}
    </div>
  );
}

function VancouverFormat({ ref, number }: { ref: Reference; number: number }) {
  return (
    <div className="text-sm">
      <span className="font-bold text-neutral-900 dark:text-neutral-100">{number}. </span>
      <span className="text-neutral-800 dark:text-neutral-200">
        {ref.authors && ref.authors.length > 0 && (
          <>{formatAuthorsVancouver(ref.authors)}. </>
        )}
        {ref.title}. 
        {ref.journal && <span className="italic"> {ref.journal}</span>}
        {ref.year && `. ${ref.year}`}
        {ref.volume && `;${ref.volume}`}
        {ref.pages && `(${ref.pages})`}.
        {ref.doi && ` doi: ${ref.doi}`}
        {ref.url && (
          <> Disponível em: <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{ref.url}</a></>
        )}
        {ref.accessDate && `. Acesso em: ${formatDate(ref.accessDate)}`}
        {ref.legalNumber && (
          <div className="mt-1 text-emerald-600 dark:text-emerald-400 font-medium">
            {ref.legalNumber}
          </div>
        )}
      </span>
      <TypeBadge type={ref.type} />
    </div>
  );
}

function ABNTFormat({ ref }: { ref: Reference }) {
  return (
    <div className="text-sm text-neutral-800 dark:text-neutral-200">
      {ref.authors && ref.authors.length > 0 && (
        <>{formatAuthorsABNT(ref.authors)}. </>
      )}
      <strong>{ref.title}</strong>. 
      {ref.journal && <span className="italic"> {ref.journal}</span>}
      {ref.volume && `, v. ${ref.volume}`}
      {ref.pages && `, p. ${ref.pages}`}
      {ref.year && `, ${ref.year}`}.
      {ref.doi && ` DOI: ${ref.doi}.`}
      {ref.url && (
        <> Disponível em: <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{ref.url}</a>.</>
      )}
      {ref.accessDate && ` Acesso em: ${formatDate(ref.accessDate)}.`}
      <TypeBadge type={ref.type} />
    </div>
  );
}

function TypeBadge({ type }: { type: string }) {
  const colors = {
    artigo: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    portaria: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    lei: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    diretriz: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    nota_tecnica: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    livro: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    site: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200',
  };
  
  const labels = {
    artigo: 'Artigo',
    portaria: 'Portaria',
    lei: 'Lei',
    diretriz: 'Diretriz',
    nota_tecnica: 'Nota Técnica',
    livro: 'Livro',
    site: 'Site',
  };
  
  return (
    <span className={`inline-block ml-2 px-2 py-0.5 text-xs rounded-full ${colors[type as keyof typeof colors] || colors.site}`}>
      {labels[type as keyof typeof labels] || type}
    </span>
  );
}

function formatAuthorsVancouver(authors: string[]): string {
  if (authors.length === 1) return authors[0];
  if (authors.length <= 6) return authors.join(', ');
  return `${authors.slice(0, 6).join(', ')}, et al`;
}

function formatAuthorsABNT(authors: string[]): string {
  // Formato: SOBRENOME, Nome; SOBRENOME, Nome
  const formatted = authors.map(author => {
    const parts = author.split(' ');
    if (parts.length === 1) return author.toUpperCase();
    const lastName = parts.pop()!.toUpperCase();
    const firstNames = parts.join(' ');
    return `${lastName}, ${firstNames}`;
  });
  
  if (formatted.length === 1) return formatted[0];
  if (formatted.length <= 3) return formatted.join('; ');
  return `${formatted[0]} et al`;
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
  const year = date.getFullYear();
  return `${day} ${month}. ${year}`;
}

