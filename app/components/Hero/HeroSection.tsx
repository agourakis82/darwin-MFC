'use client';

import { ReactNode } from 'react';

interface HeroSectionProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export default function HeroSection({
  icon,
  title,
  subtitle,
  description,
  gradient,
  stats
}: HeroSectionProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl mb-12 ${gradient}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative px-8 py-12 lg:px-12 lg:py-16">
        <div className="max-w-4xl">
          {/* Icon & Title */}
          <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              {icon}
            </div>
            <div className="flex-1">
              <p className="text-sm lg:text-base font-semibold text-white/90 uppercase tracking-wider mb-2">
                {subtitle}
              </p>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {title}
              </h1>
              <p className="text-base lg:text-lg text-white/90 leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-2xl lg:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs lg:text-sm text-white/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
