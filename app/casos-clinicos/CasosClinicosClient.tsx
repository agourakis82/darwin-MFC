'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Clock, Trophy, ArrowRight, Heart, Brain, 
  Stethoscope, Baby, Activity, Bug, Filter
} from 'lucide-react';
import { todosCasosClinicos, CasoClinico } from '@/lib/data/casos-clinicos';

const categoriaIcons: Record<string, React.ElementType> = {
  cardiovascular: Heart,
  endocrino: Activity,
  neurologico: Brain,
  infeccioso: Bug,
  pediatrico: Baby,
  default: Stethoscope
};

const categoriaCores: Record<string, string> = {
  cardiovascular: 'from-red-500 to-rose-600',
  endocrino: 'from-amber-500 to-orange-600',
  neurologico: 'from-purple-500 to-violet-600',
  infeccioso: 'from-green-500 to-emerald-600',
  pediatrico: 'from-pink-500 to-rose-600',
  respiratorio: 'from-cyan-500 to-teal-600',
  gastro: 'from-yellow-500 to-amber-600',
  psiquiatrico: 'from-indigo-500 to-purple-600',
  default: 'from-blue-500 to-indigo-600'
};

const dificuldadeBadge: Record<string, { cor: string; texto: string }> = {
  iniciante: { cor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', texto: 'Iniciante' },
  intermediario: { cor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', texto: 'Intermediário' },
  avancado: { cor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', texto: 'Avançado' }
};

export default function CasosClinicosClient() {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroDificuldade, setFiltroDificuldade] = useState<string>('todas');

  const casosFiltrados = todosCasosClinicos.filter(caso => {
    if (filtroCategoria !== 'todas' && caso.categoria !== filtroCategoria) return false;
    if (filtroDificuldade !== 'todas' && caso.dificuldade !== filtroDificuldade) return false;
    return true;
  });

  const categorias = [...new Set(todosCasosClinicos.map(c => c.categoria))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Casos Clínicos Interativos</h1>
              <p className="text-indigo-100">Aprenda com casos reais da Atenção Primária</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
              <div className="text-2xl font-bold">{todosCasosClinicos.length}</div>
              <div className="text-sm text-indigo-100">Casos disponíveis</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
              <div className="text-2xl font-bold">{categorias.length}</div>
              <div className="text-sm text-indigo-100">Categorias</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
              <div className="text-2xl font-bold flex items-center gap-1">
                <Trophy className="w-5 h-5" />
                0
              </div>
              <div className="text-sm text-indigo-100">Casos concluídos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-500" />
            <span className="text-sm font-medium dark:text-white">Filtrar:</span>
          </div>
          
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 dark:text-white"
          >
            <option value="todas">Todas as categorias</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>

          <select
            value={filtroDificuldade}
            onChange={(e) => setFiltroDificuldade(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 dark:text-white"
          >
            <option value="todas">Todas as dificuldades</option>
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>

          <span className="text-sm text-neutral-500">
            {casosFiltrados.length} caso(s) encontrado(s)
          </span>
        </div>
      </div>

      {/* Lista de Casos */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {casosFiltrados.map(caso => {
            const IconCategoria = categoriaIcons[caso.categoria] || categoriaIcons.default;
            const corGradiente = categoriaCores[caso.categoria] || categoriaCores.default;
            const badge = dificuldadeBadge[caso.dificuldade];

            return (
              <Link
                key={caso.id}
                href={`/casos-clinicos/${caso.id}`}
                className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-neutral-200 dark:border-neutral-700"
              >
                {/* Header do Card */}
                <div className={`bg-gradient-to-r ${corGradiente} p-4 text-white`}>
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <IconCategoria className="w-6 h-6" />
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.cor}`}>
                      {badge.texto}
                    </span>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors dark:text-white">
                    {caso.titulo}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    {caso.subtitulo}
                  </p>

                  {/* Paciente */}
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-3 mb-4">
                    <p className="text-sm">
                      <span className="font-medium">{caso.apresentacao.paciente.nome}</span>, {caso.apresentacao.paciente.idade} anos, {caso.apresentacao.paciente.sexo === 'M' ? 'masculino' : 'feminino'}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      QP: {caso.apresentacao.queixaPrincipal}
                    </p>
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-neutral-500">
                      <Clock className="w-4 h-4" />
                      <span>{caso.tempoEstimado} min</span>
                    </div>
                    <div className="flex items-center gap-1 text-neutral-500">
                      <BookOpen className="w-4 h-4" />
                      <span>{caso.etapas.length} etapas</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
                      <span>Iniciar</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {casosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
            <h3 className="text-lg font-semibold dark:text-white">Nenhum caso encontrado</h3>
            <p className="text-neutral-500">Tente ajustar os filtros</p>
          </div>
        )}
      </div>
    </div>
  );
}

