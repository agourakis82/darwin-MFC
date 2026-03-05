'use client';

import { Link, usePathname } from '@/i18n/routing';
import {
  Activity,
  Heart,
  Brain,
  Zap,
  Syringe,
  Shield,
  Timer,
  Pill,
  AlertTriangle,
  Flame,
  Stethoscope,
  Calculator,
  ClipboardList,
  Baby,
  FileText,
  Search,
  Wind,
  Droplets,
} from 'lucide-react';
import { locales } from '@/i18n/config';

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
  color: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'CENARIOS CRITICOS',
    items: [
      { title: 'PCR / ACLS', icon: Zap, path: '/ps/protocolos/pcr', color: 'text-red-500' },
      { title: 'Sepse', icon: Flame, path: '/ps/protocolos/sepse', color: 'text-orange-500' },
      { title: 'AVC', icon: Brain, path: '/ps/protocolos/avc', color: 'text-yellow-500' },
      { title: 'IAM STEMI', icon: Heart, path: '/ps/protocolos/iam', color: 'text-blue-500' },
      { title: 'Choque', icon: Activity, path: '/ps/protocolos/choque', color: 'text-purple-500' },
      { title: 'IOT / RSI', icon: Wind, path: '/ps/protocolos/iot', color: 'text-green-500' },
      { title: 'Anafilaxia', icon: AlertTriangle, path: '/ps/protocolos/anafilaxia', color: 'text-red-400' },
      { title: 'Politrauma', icon: Shield, path: '/ps/protocolos/politrauma', color: 'text-amber-500' },
    ],
  },
  {
    title: 'DROGAS',
    items: [
      { title: 'Vasoativas', icon: Droplets, path: '/ps/drogas?cat=vasoativa', color: 'text-red-400' },
      { title: 'RSI / BNM', icon: Syringe, path: '/ps/drogas?cat=rsi', color: 'text-green-400' },
      { title: 'Antidotos', icon: Shield, path: '/ps/drogas?cat=antidoto', color: 'text-blue-400' },
      { title: 'Antiarritmicos', icon: Heart, path: '/ps/drogas?cat=antiarritmico', color: 'text-purple-400' },
      { title: 'Sedacao', icon: Pill, path: '/ps/drogas?cat=sedacao', color: 'text-amber-400' },
      { title: 'Todas as Drogas', icon: Pill, path: '/ps/drogas', color: 'text-slate-300' },
    ],
  },
  {
    title: 'FERRAMENTAS',
    items: [
      { title: 'Escalas e Scores', icon: Calculator, path: '/ps/escalas', color: 'text-cyan-400' },
      { title: 'Timer PCR', icon: Timer, path: '/ps/timer', color: 'text-red-500' },
      { title: 'Todos Protocolos', icon: ClipboardList, path: '/ps/protocolos', color: 'text-slate-300' },
    ],
  },
];

export default function PSSidebar() {
  const pathname = usePathname();
  const cleanPathname = (pathname ?? '').split('?')[0];
  const normalizedPathname = cleanPathname
    ? (() => {
      const segments = cleanPathname.split('/').filter(Boolean);
      if (segments.length > 0 && locales.includes(segments[0] as (typeof locales)[number])) {
        return '/' + segments.slice(1).join('/');
      }
      return cleanPathname;
    })()
    : '/';

  return (
    <aside className="w-64 lg:w-72 bg-slate-950 border-r border-slate-800 h-screen sticky top-0 overflow-y-auto">
      <div className="p-4">
        <div className="mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-sm">DARWIN</span>
              <span className="text-red-500 font-bold text-sm ml-1">PS</span>
            </div>
          </div>
          <p className="text-slate-500 text-xs">Pronto-Socorro</p>
        </div>

        <Link
          href="/ps"
          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg mb-4 font-medium text-sm transition-colors ${
              normalizedPathname === '/ps'
                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Activity className="w-5 h-5" />
          Dashboard
        </Link>

        <nav className="space-y-6">
          {navGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">
                {group.title}
              </h3>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const basePath = item.path.split('?')[0];
                  const isActive = normalizedPathname === basePath || normalizedPathname?.startsWith(basePath + '/');

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-slate-800 text-white font-medium border-l-2 border-red-500'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : item.color}`} />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
