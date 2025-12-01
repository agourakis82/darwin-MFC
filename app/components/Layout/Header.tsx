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
    <header className="sticky top-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Título */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
              )}
            </button>

            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  Rastreamentos SUS
                </h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 hidden sm:block">
                  Análise Sistêmica 2025
                </p>
              </div>
            </Link>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/neonatal"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Neonatal
            </Link>
            <Link
              href="/infantil"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Infantil
            </Link>
            <Link
              href="/adultos"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Adultos
            </Link>
            <Link
              href="/cancer"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Câncer
            </Link>
            <Link
              href="/gestacao"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Gestação
            </Link>
            <Link
              href="/timeline"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Timeline 2025
            </Link>
          </nav>

          {/* Controles */}
          <div className="flex items-center gap-2">
            {/* Busca */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Buscar"
              title="Buscar"
            >
              <Search className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </button>

            {/* Toggle Modo de Conteúdo */}
            <button
              onClick={toggleContentMode}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                contentMode === 'descriptive'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
              }`}
              title={contentMode === 'descriptive' ? 'Modo Descritivo' : 'Modo Análise Crítica'}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">
                {contentMode === 'descriptive' ? 'Descritivo' : 'Análise'}
              </span>
            </button>

            {/* Toggle Tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
              title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-neutral-700" />
              ) : (
                <Sun className="w-5 h-5 text-neutral-300" />
              )}
            </button>
          </div>
        </div>

        {/* Barra de Busca (quando aberta) */}
        {searchOpen && (
          <div className="pb-4">
            <input
              type="text"
              placeholder="Buscar em todos os rastreamentos..."
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
        )}

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-neutral-200 dark:border-neutral-800 mt-4 pt-4">
            <nav className="flex flex-col gap-2">
              <Link
                href="/neonatal"
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Neonatal
              </Link>
              <Link
                href="/infantil"
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Infantil
              </Link>
              <Link
                href="/adultos"
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Adultos
              </Link>
              <Link
                href="/cancer"
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Câncer
              </Link>
              <Link
                href="/gestacao"
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gestação
              </Link>
              <Link
                href="/timeline"
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Timeline 2025
              </Link>
              <Link
                href="/bibliografia"
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
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

