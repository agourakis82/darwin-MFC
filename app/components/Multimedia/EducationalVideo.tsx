'use client';

import React from 'react';
import VideoPlayer from './VideoPlayer';
import { BookOpen, Clock, User, Calendar } from 'lucide-react';

export interface EducationalVideoData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number; // em segundos
  category: string;
  author?: string;
  date?: string;
  tags?: string[];
  transcript?: string;
  relatedVideos?: string[];
}

interface EducationalVideoProps {
  video: EducationalVideoData;
  showMetadata?: boolean;
  className?: string;
}

export default function EducationalVideo({
  video,
  showMetadata = true,
  className = '',
}: EducationalVideoProps) {
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Video Player */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <VideoPlayer
          src={video.videoUrl}
          title={video.title}
          description={video.description}
          thumbnail={video.thumbnailUrl}
          duration={video.duration}
          className="aspect-video"
        />
      </div>

      {/* Metadata */}
      {showMetadata && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <div className="space-y-4">
            {/* Title and Description */}
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                {video.title}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              {video.category && (
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Categoria</p>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {video.category}
                    </p>
                  </div>
                </div>
              )}

              {video.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Duração</p>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {formatDuration(video.duration)}
                    </p>
                  </div>
                </div>
              )}

              {video.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Autor</p>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {video.author}
                    </p>
                  </div>
                </div>
              )}

              {video.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Data</p>
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {new Date(video.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            {video.tags && video.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                {video.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

