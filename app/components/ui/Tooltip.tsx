'use client';

import { ReactNode } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
  delayDuration?: number;
  skipDelayDuration?: number;
  disabled?: boolean;
  asChild?: boolean;
  className?: string;
  contentClassName?: string;
  arrow?: boolean;
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}

export interface TooltipProviderProps {
  children: ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
}

// =============================================================================
// TOOLTIP PROVIDER
// =============================================================================

export function TooltipProvider({
  children,
  delayDuration = 200,
  skipDelayDuration = 300,
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
}

// =============================================================================
// TOOLTIP COMPONENT
// =============================================================================

export function Tooltip({
  children,
  content,
  position = 'top',
  delayDuration,
  disabled = false,
  asChild = true,
  className,
  contentClassName,
  arrow = true,
  sideOffset = 8,
  align = 'center',
}: TooltipProps) {
  if (disabled || !content) {
    return <>{children}</>;
  }

  return (
    <TooltipPrimitive.Root delayDuration={delayDuration}>
      <TooltipPrimitive.Trigger asChild={asChild} className={className}>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={position}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'z-[100]',
            'px-3 py-2 rounded-lg',
            'bg-[#1d1d1f] dark:bg-[#f5f5f7]',
            'text-sm text-white dark:text-[#1d1d1f]',
            'shadow-lg',
            'max-w-xs',
            'animate-in fade-in-0 zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2',
            contentClassName
          )}
        >
          {content}
          {arrow && (
            <TooltipPrimitive.Arrow
              className="fill-[#1d1d1f] dark:fill-[#f5f5f7]"
              width={12}
              height={6}
            />
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

// =============================================================================
// INFO TOOLTIP (with info icon)
// =============================================================================

export interface InfoTooltipProps extends Omit<TooltipProps, 'children'> {
  iconSize?: 'sm' | 'md' | 'lg';
  iconClassName?: string;
}

const iconSizes = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function InfoTooltip({
  content,
  iconSize = 'md',
  iconClassName,
  ...props
}: InfoTooltipProps) {
  return (
    <Tooltip content={content} {...props}>
      <button
        type="button"
        className={cn(
          'inline-flex items-center justify-center',
          'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]',
          'transition-colors cursor-help',
          iconClassName
        )}
        aria-label="More information"
      >
        <svg
          className={iconSizes[iconSize]}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </Tooltip>
  );
}

// =============================================================================
// KEYBOARD SHORTCUT TOOLTIP
// =============================================================================

export interface ShortcutTooltipProps extends Omit<TooltipProps, 'content'> {
  shortcut: string[];
  label?: string;
}

export function ShortcutTooltip({
  children,
  shortcut,
  label,
  ...props
}: ShortcutTooltipProps) {
  const content = (
    <div className="flex items-center gap-2">
      {label && <span>{label}</span>}
      <div className="flex items-center gap-1">
        {shortcut.map((key, index) => (
          <kbd
            key={index}
            className="px-1.5 py-0.5 rounded bg-white/20 text-xs font-mono"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );

  return (
    <Tooltip content={content} {...props}>
      {children}
    </Tooltip>
  );
}

// =============================================================================
// RICH TOOLTIP (with title and description)
// =============================================================================

export interface RichTooltipProps extends Omit<TooltipProps, 'content'> {
  title: string;
  description?: string;
  footer?: ReactNode;
}

export function RichTooltip({
  children,
  title,
  description,
  footer,
  ...props
}: RichTooltipProps) {
  const content = (
    <div className="space-y-1">
      <p className="font-semibold">{title}</p>
      {description && <p className="text-sm opacity-80">{description}</p>}
      {footer && <div className="pt-2 border-t border-white/10 mt-2">{footer}</div>}
    </div>
  );

  return (
    <Tooltip content={content} contentClassName="max-w-sm" {...props}>
      {children}
    </Tooltip>
  );
}

export default Tooltip;
