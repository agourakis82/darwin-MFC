'use client';

import { motion } from 'framer-motion';

interface DarwinLogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { icon: 32, text: 'text-lg' },
  md: { icon: 40, text: 'text-xl' },
  lg: { icon: 48, text: 'text-2xl' },
  xl: { icon: 64, text: 'text-3xl' },
};

export default function DarwinLogo({ 
  variant = 'full', 
  size = 'md',
  animated = true,
  className = '' 
}: DarwinLogoProps) {
  const { icon: iconSize, text: textSize } = sizeMap[size];

  const HelixIcon = ({ size: s }: { size: number }) => (
    <svg 
      width={s} 
      height={s} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <defs>
        <linearGradient id="helixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D2137"/>
          <stop offset="50%" stopColor="#0E7490"/>
          <stop offset="100%" stopColor="#059669"/>
        </linearGradient>
        <linearGradient id="helixGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0E7490"/>
          <stop offset="100%" stopColor="#06B6D4"/>
        </linearGradient>
      </defs>
      
      {/* Main D backbone */}
      <motion.path 
        d="M20 8 L20 56 M20 8 C44 8 52 20 52 32 C52 44 44 56 20 56" 
        stroke="url(#helixGradient)" 
        strokeWidth="4" 
        strokeLinecap="round" 
        fill="none"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      
      {/* Helix strand 1 */}
      <motion.path 
        d="M20 14 Q32 18 38 22 Q44 26 44 32 Q44 38 38 42 Q32 46 20 50" 
        stroke="url(#helixGradientLight)" 
        strokeWidth="3" 
        strokeLinecap="round" 
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />
      
      {/* Helix strand 2 */}
      <motion.path 
        d="M20 22 Q28 26 34 30 Q40 34 40 32 Q40 30 34 34 Q28 38 20 42" 
        stroke="url(#helixGradient)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none"
        opacity="0.7"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      />
      
      {/* Base pair lines */}
      {[
        { x1: 22, y1: 18, x2: 36, y2: 20, color: "#0E7490", delay: 0.6 },
        { x1: 22, y1: 26, x2: 40, y2: 28, color: "#059669", delay: 0.7 },
        { x1: 22, y1: 32, x2: 44, y2: 32, color: "#06B6D4", delay: 0.8 },
        { x1: 22, y1: 38, x2: 40, y2: 36, color: "#059669", delay: 0.9 },
        { x1: 22, y1: 46, x2: 36, y2: 44, color: "#0E7490", delay: 1.0 },
      ].map((line, i) => (
        <motion.line 
          key={i}
          x1={line.x1} 
          y1={line.y1} 
          x2={line.x2} 
          y2={line.y2} 
          stroke={line.color} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          opacity="0.6"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.6 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.3, delay: line.delay, ease: "easeOut" }}
        />
      ))}
      
      {/* Nucleotide dots */}
      {[
        { cx: 36, cy: 20, r: 2, fill: "#0E7490", delay: 0.65 },
        { cx: 40, cy: 28, r: 2, fill: "#059669", delay: 0.75 },
        { cx: 44, cy: 32, r: 2.5, fill: "#06B6D4", delay: 0.85 },
        { cx: 40, cy: 36, r: 2, fill: "#059669", delay: 0.95 },
        { cx: 36, cy: 44, r: 2, fill: "#0E7490", delay: 1.05 },
      ].map((dot, i) => (
        <motion.circle 
          key={i}
          cx={dot.cx} 
          cy={dot.cy} 
          r={dot.r} 
          fill={dot.fill}
          initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: dot.delay, ease: "easeOut" }}
        />
      ))}
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={className}>
        <HelixIcon size={iconSize} />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <HelixIcon size={iconSize} />
      <div className="flex flex-col">
        <motion.span 
          className={`font-display font-bold tracking-tight text-helix-navy dark:text-white leading-none ${textSize}`}
          initial={animated ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          DARWIN
        </motion.span>
        {variant === 'full' && (
          <motion.span 
            className="text-sm font-medium tracking-wide text-adenine-teal dark:text-cytosine-cyan uppercase"
            initial={animated ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            MEDICAL HUB
          </motion.span>
        )}
      </div>
    </div>
  );
}
