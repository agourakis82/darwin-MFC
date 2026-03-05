'use client';

import { Link, usePathname } from '@/i18n/routing';
import { ClipboardList, Pill, Calculator, BarChart3, Timer, type LucideIcon } from 'lucide-react';
import { locales } from '@/i18n/config';

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: ClipboardList, label: 'Protocolos', href: '/ps/protocolos' },
  { icon: Pill, label: 'Drogas', href: '/ps/drogas' },
  { icon: BarChart3, label: 'Escalas', href: '/ps/escalas' },
  { icon: Calculator, label: 'Calc', href: '/ps/calculadoras' },
  { icon: Timer, label: 'Timer', href: '/ps/timer' },
];

export default function PSMobileNav() {
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
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'rgba(10, 10, 18, 0.88)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderTop: '0.5px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="flex justify-around items-end px-2 pt-2"
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))' }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            normalizedPathname === item.href ||
            normalizedPathname?.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 min-w-[56px] active:scale-90 transition-transform duration-100"
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                  navigator.vibrate(8);
                }
              }}
            >
              {/* Icon container — pill background when active */}
              <div
                className={`w-12 h-7 flex items-center justify-center rounded-full transition-all duration-200 ${
                  isActive ? 'bg-red-500/20' : ''
                }`}
              >
                <Icon
                  className={`w-[22px] h-[22px] transition-colors duration-200 ${
                    isActive ? 'text-red-400' : 'text-slate-500'
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.7}
                />
              </div>
              <span
                className={`text-[10px] font-semibold tracking-tight transition-colors duration-200 ${
                  isActive ? 'text-red-400' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
