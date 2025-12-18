'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, Download, ExternalLink, Share2, Info } from 'lucide-react';

export interface InfographicData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  sourceUrl?: string;
  category: string;
  tags?: string[];
  date?: string;
  alt?: string;
}

interface EnhancedInfographicProps {
  infographic: InfographicData;
  showMetadata?: boolean;
  className?: string;
}

export default function EnhancedInfographic({
  infographic,
  showMetadata = true,
  className = '',
}: EnhancedInfographicProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(infographic.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${infographic.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar imagem:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: infographic.title,
          text: infographic.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback: copiar URL para clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <>
      <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow ${className}`}>
        {/* Image */}
        <div
          className="relative aspect-[3/4] cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={infographic.imageUrl}
            alt={infographic.alt || infographic.title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <ZoomIn className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Metadata */}
        {showMetadata && (
          <div className="p-6">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              {infographic.title}
            </h3>
            {infographic.description && (
              <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                {infographic.description}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                <span className="font-medium">Fonte:</span> {infographic.source}
              </div>
              <div className="flex items-center gap-2">
                {infographic.sourceUrl && (
                  <a
                    href={infographic.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    title="Acessar fonte original"
                  >
                    <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </a>
                )}
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
                  title="Baixar infográfico"
                >
                  <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Compartilhar"
                >
                  <Share2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  title="Ampliar"
                >
                  <ZoomIn className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </button>
              </div>
            </div>

            {/* Tags */}
            {infographic.tags && infographic.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {infographic.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <ZoomIn className="w-6 h-6 text-white rotate-45" />
          </button>
          <div
            className="relative max-w-5xl max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={infographic.imageUrl}
              alt={infographic.alt || infographic.title}
              width={1754}
              height={6000}
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}

