'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Play, Clock, BookOpen } from 'lucide-react';
import EducationalVideo, { type EducationalVideoData } from './EducationalVideo';
import { educationalVideos, getVideosByCategory } from '@/lib/data/multimedia/videos';

interface VideoLibraryProps {
  category?: string;
  showFilters?: boolean;
}

export default function VideoLibrary({ category, showFilters = true }: VideoLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');

  const categories = useMemo(() => {
    const cats = new Set(educationalVideos.map(v => v.category));
    return Array.from(cats);
  }, []);

  const filteredVideos = useMemo(() => {
    let videos = selectedCategory === 'all' 
      ? educationalVideos 
      : getVideosByCategory(selectedCategory);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      videos = videos.filter(
        v =>
          v.title.toLowerCase().includes(query) ||
          v.description.toLowerCase().includes(query) ||
          v.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return videos;
  }, [searchQuery, selectedCategory]);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
          Biblioteca de Vídeos Educacionais
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Conteúdo multimídia para capacitação e educação continuada em APS
        </p>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar vídeos..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-neutral-400" />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white"
              >
                <option value="all">Todas as categorias</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        {filteredVideos.length} vídeo{filteredVideos.length !== 1 ? 's' : ''} encontrado{filteredVideos.length !== 1 ? 's' : ''}
      </div>

      {/* Video Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVideos.map(video => (
            <div
              key={video.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <EducationalVideo video={video} showMetadata={true} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-neutral-600 dark:text-neutral-400">
            Nenhum vídeo encontrado com os filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
}

