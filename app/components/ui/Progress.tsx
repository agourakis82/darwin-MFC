import React from 'react';

export interface ProgressProps {
  value: number; // 0-100
  max?: number; // Default: 100
  variant?: 'linear' | 'circular';
  showLabel?: boolean;
  animated?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const colorConfig = {
  primary: {
    bg: 'bg-blue-500',
    track: 'bg-blue-500/20',
  },
  success: {
    bg: 'bg-green-500',
    track: 'bg-green-500/20',
  },
  warning: {
    bg: 'bg-yellow-500',
    track: 'bg-yellow-500/20',
  },
  danger: {
    bg: 'bg-red-500',
    track: 'bg-red-500/20',
  },
};

const sizeConfig = {
  sm: { height: 'h-1', circular: 'w-12 h-12' },
  md: { height: 'h-2', circular: 'w-20 h-20' },
  lg: { height: 'h-3', circular: 'w-32 h-32' },
};

export function Progress({
  value,
  max = 100,
  variant = 'linear',
  showLabel = true,
  animated = true,
  color = 'primary',
  size = 'md',
  label,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const config = colorConfig[color];
  const sizeClass = sizeConfig[size];

  if (variant === 'circular') {
    const circumference = 2 * Math.PI * 45; // radius = 45
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center gap-2">
        <div className={`${sizeClass.circular} relative`}>
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              className={config.track}
              strokeWidth="8"
            />

            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              className={`${config.bg} transition-all ${animated ? 'duration-500' : ''}`}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>

          {/* Center label */}
          {showLabel && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-neutral-200">
                {Math.round(percentage)}%
              </span>
            </div>
          )}
        </div>

        {label && (
          <p className="text-sm text-neutral-400 text-center">{label}</p>
        )}
      </div>
    );
  }

  // Linear progress
  return (
    <div className="flex flex-col gap-2">
      <div className={`w-full ${sizeClass.height} ${config.track} rounded-full overflow-hidden`}>
        <div
          className={`h-full ${config.bg} ${animated ? 'transition-all duration-500' : ''} rounded-full`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {showLabel && (
        <div className="flex justify-between items-center text-xs text-neutral-400">
          <span>{label || 'Progress'}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
}
