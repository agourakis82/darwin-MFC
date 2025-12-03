'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store/appStore';
import { Sun, Moon, BookOpen, FileText, Menu, X, Search } from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme, contentMode, toggleContentMode } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 navbar-glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Título */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 apple-transition-fast"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1d1d1f] dark:text-[#f5f5f7]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1d1d1f] dark:text-[#f5f5f7]" />
              )}
            </button>

            <Link href="/" className="flex items-center gap-3 apple-transition-fast hover:opacity-80">
              <div className="w-12 h-12 gradient-apple-blue rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
                  Rastreamentos SUS
                </h1>
                <p className="text-sm text-[#86868b] dark:text-[#86868b] hidden sm:block">
                  Análise Sistêmica 2025
                </p>
              </div>
            </Link>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/neonatal"
              className="px-3.5 py-2 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg apple-transition-fast"
            >
              Neonatal
            </Link>
            <Link
              href="/infantil"
              className="px-3.5 py-2 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg apple-transition-fast"
            >
              Infantil
            </Link>
            <Link
              href="/adultos"
              className="px-3.5 py-2 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg apple-transition-fast"
            >
              Adultos
            </Link>
            <Link
              href="/cancer"
              className="px-3.5 py-2 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg apple-transition-fast"
            >
              Câncer
            </Link>
            <Link
              href="/gestacao"
              className="px-3.5 py-2 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg apple-transition-fast"
            >
              Gestação
            </Link>
            <Link
              href="/outros"
              className="px-3.5 py-2 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg apple-transition-fast"
            >
              Outros
            </Link>
            <Link
              href="/timeline"
              className="px-3.5 py-2 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-lg apple-transition-fast"
            >
              Timeline
            </Link>
          </nav>

          {/* Controles */}
          <div className="flex items-center gap-1.5">
            {/* Busca */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 apple-transition-fast"
              aria-label="Buscar"
              title="Buscar"
            >
              <Search className="w-5 h-5 text-[#1d1d1f] dark:text-[#f5f5f7]" />
            </button>

            {/* Toggle Modo de Conteúdo */}
            <button
              onClick={toggleContentMode}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 text-base font-medium apple-transition shadow-sm ${
                contentMode === 'descriptive'
                  ? 'bg-[#007aff]/10 text-[#007aff] dark:bg-[#5ac8fa]/15 dark:text-[#5ac8fa]'
                  : 'bg-[#af52de]/10 text-[#af52de] dark:bg-[#bf5af2]/15 dark:text-[#bf5af2]'
              }`}
              title={contentMode === 'descriptive' ? 'Modo Descritivo' : 'Modo Análise Crítica'}
            >
              <FileText className="w-5 h-5" />
              <span className="hidden sm:inline">
                {contentMode === 'descriptive' ? 'Descritivo' : 'Análise'}
              </span>
            </button>

            {/* Toggle Tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 apple-transition-fast"
              aria-label={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
              title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-[#1d1d1f] dark:text-[#f5f5f7]" />
              ) : (
                <Sun className="w-5 h-5 text-[#f5f5f7]" />
              )}
            </button>
          </div>
        </div>

        {/* Barra de Busca (quando aberta) */}
        {searchOpen && (
          <div className="pb-4 animate-fade-in">
            <input
              type="text"
              placeholder="Buscar em todos os rastreamentos..."
              className="w-full px-5 py-3.5 glass-strong rounded-xl text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#007aff] apple-transition text-base"
              autoFocus
            />
          </div>
        )}

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-black/10 dark:border-white/10 mt-4 pt-4 animate-fade-in">
            <nav className="flex flex-col gap-2">
              <Link
                href="/neonatal"
                className="px-5 py-3 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-xl apple-transition-fast"
                onClick={() => setMobileMenuOpen(false)}
              >
                Neonatal
              </Link>
              <Link
                href="/infantil"
                className="px-5 py-3 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-xl apple-transition-fast"
                onClick={() => setMobileMenuOpen(false)}
              >
                Infantil
              </Link>
              <Link
                href="/adultos"
                className="px-5 py-3 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-xl apple-transition-fast"
                onClick={() => setMobileMenuOpen(false)}
              >
                Adultos
              </Link>
              <Link
                href="/cancer"
                className="px-5 py-3 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-xl apple-transition-fast"
                onClick={() => setMobileMenuOpen(false)}
              >
                Câncer
              </Link>
              <Link
                href="/gestacao"
                className="px-5 py-3 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-xl apple-transition-fast"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gestação
              </Link>
              <Link
                href="/timeline"
                className="px-5 py-3 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-xl apple-transition-fast"
                onClick={() => setMobileMenuOpen(false)}
              >
                Timeline 2025
              </Link>
              <Link
                href="/bibliografia"
                className="px-5 py-3 text-base font-medium text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-black/5 dark:hover:bg-white/10 rounded-xl apple-transition-fast"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bibliografia
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

