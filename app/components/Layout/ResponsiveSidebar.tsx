'use client';

import { useState, useEffect, useState as useStateCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from './Sidebar';
import clsx from 'clsx';

/**
 * ResponsiveSidebar - Collapsible sidebar with responsive behavior
 *
 * Behavior:
 * - Mobile (< 1024px): Hidden by default (shown via overlay from Header)
 * - Desktop (1024px+): Always visible, can collapse to icon-only
 * - Collapse state persists to localStorage
 *
 * Usage:
 * <ResponsiveSidebar />
 */
export default function ResponsiveSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState === 'true') {
      setIsCollapsed(true);
    }
  }, []);

  // Persist collapsed state to localStorage
  const handleToggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', String(newState));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <aside
      className={clsx(
        // Layout positioning
        'fixed left-0 top-16 bottom-0 lg:relative lg:top-0',
        // Dimensions - Mobile: full width minus margin, Desktop: 256px
        isCollapsed ? 'w-20' : 'w-[calc(100vw-2rem)] lg:w-64',
        // Responsive behavior
        'hidden lg:flex flex-col',
        // Styling
        'bg-paper-white dark:bg-carbon-950',
        'border-r border-carbon-200 dark:border-carbon-700',
        // Transitions
        'transition-all duration-300 ease-in-out',
        // Z-index
        'z-30',
        // Shadow on desktop (subtle)
        'shadow-sm'
      )}
      role="complementary"
      aria-label="Navigation sidebar"
      aria-expanded={!isCollapsed}
    >
      {/* Collapse Toggle Button */}
      <div className="flex items-center justify-end p-3 border-b border-carbon-200 dark:border-carbon-700">
        <button
          onClick={handleToggleCollapse}
          className={clsx(
            'p-1.5 rounded-lg',
            'hover:bg-carbon-100 dark:hover:bg-carbon-800',
            'transition-colors duration-200',
            'text-carbon-600 dark:text-carbon-400',
            'hover:text-carbon-900 dark:hover:text-carbon-200'
          )}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar (Cmd+B)'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar Content */}
      <nav
        className={clsx(
          'flex-1 overflow-y-auto',
          'px-2 py-4 lg:px-3 lg:py-4',
          // Custom scrollbar
          'scrollbar-thin scrollbar-thumb-carbon-300 dark:scrollbar-thumb-carbon-700',
          'scrollbar-track-transparent',
          // Transitions
          isCollapsed && 'opacity-0 lg:opacity-100'
        )}
      >
        {!isCollapsed && <Sidebar />}

        {/* Icon-only navigation when collapsed */}
        {isCollapsed && (
          <div className="space-y-1 flex flex-col items-center">
            {/* Placeholder icons for collapsed state - would show section icons */}
            <div className="w-8 h-8 rounded-lg bg-carbon-100 dark:bg-carbon-800" />
            <div className="w-8 h-8 rounded-lg bg-carbon-100 dark:bg-carbon-800" />
            <div className="w-8 h-8 rounded-lg bg-carbon-100 dark:bg-carbon-800" />
          </div>
        )}
      </nav>

      {/* Footer - Quick stats or info */}
      <div
        className={clsx(
          'border-t border-carbon-200 dark:border-carbon-700',
          'p-3',
          'bg-carbon-50 dark:bg-carbon-900/50',
          'text-xs text-carbon-600 dark:text-carbon-400',
          isCollapsed ? 'text-center' : 'space-y-2'
        )}
      >
        {!isCollapsed && (
          <p className="font-medium">Darwin-MFC</p>
        )}
        <p className={isCollapsed ? 'text-[10px]' : ''}>
          {isCollapsed ? 'Q1' : 'Q1 Academic Level'}
        </p>
      </div>
    </aside>
  );
}

/**
 * Mobile Sidebar Overlay - Shown via Header hamburger on mobile
 * Imported and used by Header component
 */
export function MobileSidebarOverlay({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          role="presentation"
        />
      )}

      {/* Sidebar panel */}
      <div
        className={clsx(
          // Position and dimensions
          'fixed top-16 left-0 bottom-0 w-64',
          // Styling
          'bg-paper-white dark:bg-carbon-950',
          'border-r border-carbon-200 dark:border-carbon-700',
          // Responsive - hidden on lg+
          'lg:hidden',
          // Transitions
          'transition-transform duration-300 ease-in-out transform',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          // Z-index
          'z-50',
          // Shadow
          'shadow-lg'
        )}
        role="complementary"
        aria-label="Navigation sidebar"
        aria-hidden={!isOpen}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-4 border-b border-carbon-200 dark:border-carbon-700">
          <span className="font-semibold text-carbon-900 dark:text-carbon-50">Menu</span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-carbon-100 dark:hover:bg-carbon-800"
            aria-label="Close sidebar"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar content */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-carbon-300 dark:scrollbar-thumb-carbon-700">
          <Sidebar />
        </nav>
      </div>
    </>
  );
}
