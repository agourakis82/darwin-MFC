'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Command, Keyboard } from 'lucide-react';

interface ShortcutInfo {
  keys: string[];
  description: string;
  action: () => void;
}

export default function KeyboardShortcuts() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const shortcuts: ShortcutInfo[] = [
    { keys: ['⌘', 'K'], description: 'Busca rápida', action: () => setShowSearch(true) },
    { keys: ['⌘', 'D'], description: 'Ir para Doenças', action: () => router.push('/doencas') },
    { keys: ['⌘', 'M'], description: 'Ir para Medicamentos', action: () => router.push('/medicamentos') },
    { keys: ['⌘', 'P'], description: 'Ir para Protocolos', action: () => router.push('/protocolos') },
    { keys: ['⌘', 'C'], description: 'Ir para Calculadoras', action: () => router.push('/calculadoras') },
    { keys: ['⌘', 'Q'], description: 'Consulta Rápida', action: () => router.push('/consulta-rapida') },
    { keys: ['⌘', 'S'], description: 'Prontuário SOAP', action: () => router.push('/prontuario') },
    { keys: ['?'], description: 'Mostrar atalhos', action: () => setShowHelp(true) },
    { keys: ['Esc'], description: 'Fechar modal', action: () => { setShowHelp(false); setShowSearch(false); } },
  ];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ignorar se estiver em input/textarea
    if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowHelp(false);
      }
      return;
    }

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modKey = isMac ? e.metaKey : e.ctrlKey;

    // Cmd/Ctrl + K - Busca
    if (modKey && e.key === 'k') {
      e.preventDefault();
      setShowSearch(true);
    }
    // Cmd/Ctrl + D - Doenças
    else if (modKey && e.key === 'd') {
      e.preventDefault();
      router.push('/doencas');
    }
    // Cmd/Ctrl + M - Medicamentos
    else if (modKey && e.key === 'm') {
      e.preventDefault();
      router.push('/medicamentos');
    }
    // Cmd/Ctrl + P - Protocolos (override print)
    else if (modKey && e.key === 'p') {
      e.preventDefault();
      router.push('/protocolos');
    }
    // Cmd/Ctrl + C - Calculadoras (only without selection)
    else if (modKey && e.key === 'c' && !window.getSelection()?.toString()) {
      // Don't prevent default copy if text is selected
    }
    // Cmd/Ctrl + Q - Consulta Rápida
    else if (modKey && e.key === 'q') {
      e.preventDefault();
      router.push('/consulta-rapida');
    }
    // Cmd/Ctrl + S - SOAP
    else if (modKey && e.key === 's') {
      e.preventDefault();
      router.push('/prontuario');
    }
    // ? - Ajuda
    else if (e.key === '?' && !modKey) {
      e.preventDefault();
      setShowHelp(true);
    }
    // Escape - Fechar
    else if (e.key === 'Escape') {
      setShowSearch(false);
      setShowHelp(false);
    }
  }, [router]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  // Quick Search Modal
  if (showSearch) {
    return (
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <form onSubmit={handleSearchSubmit}>
            <div className="flex items-center gap-3 p-4 border-b border-neutral-200 dark:border-neutral-700">
              <Search className="w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar doenças, medicamentos, protocolos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-neutral-400"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </form>
          <div className="p-4 text-sm text-neutral-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs">Enter</kbd>
                <span>para buscar</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs">Esc</kbd>
                <span>para fechar</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Help Modal
  if (showHelp) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => setShowHelp(false)}
      >
        <div 
          className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold">Atalhos de Teclado</h2>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4 space-y-2 max-h-[60vh] overflow-auto">
            {shortcuts.slice(0, -1).map((shortcut, i) => (
              <div 
                key={i}
                className="flex items-center justify-between py-2 px-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg"
              >
                <span className="text-sm">{shortcut.description}</span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, j) => (
                    <kbd 
                      key={j}
                      className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded text-xs font-mono min-w-[24px] text-center"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
            <p className="text-xs text-neutral-500 text-center">
              Pressione <kbd className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">?</kbd> a qualquer momento para ver esta ajuda
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Floating indicator (optional - can be removed if too intrusive)
  return null;
}

