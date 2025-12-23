'use client';

import { CollaborativeNotes } from '@/app/components/Notes';
import { FileText, BookOpen, Tag, Download } from 'lucide-react';

export default function NotasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#007aff] to-[#5856d6] flex items-center justify-center shadow-lg">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#1d1d1f] dark:text-[#f5f5f7]">
              Minhas Notas
            </h1>
            <p className="text-[#86868b] mt-1">
              Organize seus estudos com notas em Markdown
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#1c1c1e] rounded-xl border border-gray-200 dark:border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#007aff]/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#007aff]" />
            </div>
            <div>
              <p className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">Markdown</p>
              <p className="text-xs text-[#86868b]">Formatação rica e simples</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#1c1c1e] rounded-xl border border-gray-200 dark:border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#34c759]/10 flex items-center justify-center">
              <Tag className="w-5 h-5 text-[#34c759]" />
            </div>
            <div>
              <p className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">Tags</p>
              <p className="text-xs text-[#86868b]">Organize por temas</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#1c1c1e] rounded-xl border border-gray-200 dark:border-white/10">
            <div className="w-10 h-10 rounded-lg bg-[#af52de]/10 flex items-center justify-center">
              <Download className="w-5 h-5 text-[#af52de]" />
            </div>
            <div>
              <p className="font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">Exportar</p>
              <p className="text-xs text-[#86868b]">MD ou HTML com citações</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Component */}
      <CollaborativeNotes />
    </div>
  );
}
