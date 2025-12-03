'use client';

import { caseAuthors, caseMetadata } from '@/lib/data/caso-clinico';

export default function AuthorCredits() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-8 md:p-12">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10">
        {/* Título principal */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full mb-6">
            <span className="text-2xl">🩺</span>
            <span className="text-sm font-semibold text-white">
              {caseMetadata.institution} | {caseMetadata.year}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
            {caseMetadata.title}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200 font-medium">
            {caseMetadata.subtitle}
          </p>
        </div>

        {/* Autores */}
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-neutral-300 text-sm font-semibold uppercase tracking-wider mb-4">
            Apresentado por
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {caseAuthors.map((author, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/25 transition-colors"
              >
                <span className="text-white font-semibold text-sm md:text-base">
                  {author}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Descrição */}
        <div className="mt-8 text-center">
          <p className="text-neutral-300 text-sm font-medium max-w-xl mx-auto leading-relaxed">
            Caso clínico integrado abordando rastreamentos populacionais nas diferentes
            fases da vida, baseado nas diretrizes do SUS e sociedades médicas brasileiras.
          </p>
        </div>
      </div>
    </div>
  );
}
