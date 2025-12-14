'use client';

/**
 * SMARTLINK - DARWIN-MFC
 * ======================
 * 
 * Componente de link inteligente que mostra preview
 * e informações contextuais ao passar o mouse
 */

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Stethoscope, 
  Pill, 
  GitFork, 
  Calculator, 
  FileSearch,
  ExternalLink,
  X,
  ArrowRight
} from 'lucide-react';

type LinkType = 'doenca' | 'medicamento' | 'protocolo' | 'calculadora' | 'rastreamento';

interface SmartLinkProps {
  type: LinkType;
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  path: string;
  badges?: { label: string; color: string }[];
  showPreview?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const typeConfig: Record<LinkType, { icon: React.ElementType; color: string; bgColor: string }> = {
  doenca: { 
    icon: Stethoscope, 
    color: 'text-blue-600 dark:text-blue-400', 
    bgColor: 'bg-blue-100 dark:bg-blue-900/50' 
  },
  medicamento: { 
    icon: Pill, 
    color: 'text-purple-600 dark:text-purple-400', 
    bgColor: 'bg-purple-100 dark:bg-purple-900/50' 
  },
  protocolo: { 
    icon: GitFork, 
    color: 'text-orange-600 dark:text-orange-400', 
    bgColor: 'bg-orange-100 dark:bg-orange-900/50' 
  },
  calculadora: { 
    icon: Calculator, 
    color: 'text-emerald-600 dark:text-emerald-400', 
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/50' 
  },
  rastreamento: { 
    icon: FileSearch, 
    color: 'text-cyan-600 dark:text-cyan-400', 
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/50' 
  },
};

export default function SmartLink({
  type,
  id,
  title,
  subtitle,
  description,
  path,
  badges = [],
  showPreview = true,
  className = '',
  children,
}: SmartLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');
  const linkRef = useRef<HTMLAnchorElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const config = typeConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (isHovered && linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setPosition(spaceBelow < 200 ? 'top' : 'bottom');
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsHovered(true), 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsHovered(false), 150);
  };

  return (
    <span className="relative inline-block">
      <Link
        ref={linkRef}
        href={path}
        className={`inline-flex items-center gap-1 ${config.color} hover:underline font-medium ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon className="w-4 h-4" />
        {children || title}
      </Link>

      {/* Preview Popup */}
      {showPreview && isHovered && (
        <div
          className={`absolute z-50 w-80 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 
            ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} left-0
            animate-in fade-in-0 zoom-in-95 duration-200`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className={`p-2 rounded-lg ${config.bgColor}`}>
              <Icon className={`w-5 h-5 ${config.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-900 dark:text-white truncate">
                {title}
              </h4>
              {subtitle && (
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
              {description}
            </p>
          )}

          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {badges.slice(0, 3).map((badge, i) => (
                <span
                  key={i}
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${badge.color}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          )}

          {/* Action */}
          <Link
            href={path}
            className={`flex items-center justify-center gap-2 w-full py-2 px-4 ${config.bgColor} ${config.color} rounded-lg font-medium text-sm hover:opacity-80 transition-opacity`}
          >
            Ver detalhes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </span>
  );
}

// =============================================================================
// COMPONENTES AUXILIARES
// =============================================================================

interface QuickLinksProps {
  title: string;
  links: {
    type: LinkType;
    id: string;
    title: string;
    path: string;
  }[];
}

export function QuickLinks({ title, links }: QuickLinksProps) {
  if (links.length === 0) return null;

  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{title}</h4>
      <div className="space-y-2">
        {links.map((link) => {
          const config = typeConfig[link.type];
          const Icon = config.icon;
          
          return (
            <Link
              key={link.id}
              href={link.path}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors group"
            >
              <div className={`p-1.5 rounded-md ${config.bgColor}`}>
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                {link.title}
              </span>
              <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

interface ContextualSuggestionCardProps {
  type: LinkType;
  id: string;
  title: string;
  reason: string;
  path: string;
  priority: 'alta' | 'media' | 'baixa';
}

export function ContextualSuggestionCard({ 
  type, 
  id, 
  title, 
  reason, 
  path, 
  priority 
}: ContextualSuggestionCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;
  
  const priorityColors = {
    alta: 'border-l-red-500',
    media: 'border-l-amber-500',
    baixa: 'border-l-slate-400',
  };

  return (
    <Link
      href={path}
      className={`block p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 ${priorityColors[priority]} hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${config.bgColor}`}>
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
            {title}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {reason}
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
      </div>
    </Link>
  );
}

// =============================================================================
// INLINE SMART LINKS (para uso em textos)
// =============================================================================

interface InlineDoencaLinkProps {
  id: string;
  children?: React.ReactNode;
}

export function InlineDoencaLink({ id, children }: InlineDoencaLinkProps) {
  return (
    <Link
      href={`/doencas/${id}`}
      className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
    >
      <Stethoscope className="w-3.5 h-3.5" />
      {children || id}
    </Link>
  );
}

export function InlineMedicamentoLink({ id, children }: InlineDoencaLinkProps) {
  return (
    <Link
      href={`/medicamentos/${id}`}
      className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:underline font-medium"
    >
      <Pill className="w-3.5 h-3.5" />
      {children || id}
    </Link>
  );
}

export function InlineProtocoloLink({ id, children }: InlineDoencaLinkProps) {
  return (
    <Link
      href={`/protocolos?id=${id}`}
      className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:underline font-medium"
    >
      <GitFork className="w-3.5 h-3.5" />
      {children || id}
    </Link>
  );
}

export function InlineCalculadoraLink({ id, children }: InlineDoencaLinkProps) {
  return (
    <Link
      href={`/calculadoras#${id}`}
      className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
    >
      <Calculator className="w-3.5 h-3.5" />
      {children || id}
    </Link>
  );
}

