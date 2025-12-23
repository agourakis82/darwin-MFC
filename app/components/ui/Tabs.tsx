'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  HTMLAttributes,
  forwardRef,
} from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export type TabsVariant = 'default' | 'pills' | 'bordered' | 'soft';
export type TabsSize = 'sm' | 'md' | 'lg';

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: TabsVariant;
  size: TabsSize;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {}

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

// =============================================================================
// CONTEXT
// =============================================================================

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
}

// =============================================================================
// STYLES
// =============================================================================

const tabListVariantStyles: Record<TabsVariant, string> = {
  default: 'border-b border-gray-200 dark:border-white/10',
  pills: 'p-1 bg-gray-100 dark:bg-white/10 rounded-xl',
  bordered: 'border border-gray-200 dark:border-white/10 rounded-xl p-1',
  soft: 'gap-1',
};

const tabVariantStyles: Record<TabsVariant, { base: string; active: string; inactive: string }> = {
  default: {
    base: 'border-b-2 -mb-px rounded-none px-4',
    active: 'border-[#007aff] text-[#007aff] dark:text-[#5ac8fa] dark:border-[#5ac8fa]',
    inactive: 'border-transparent text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:border-gray-300 dark:hover:border-white/20',
  },
  pills: {
    base: 'rounded-lg',
    active: 'bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7] shadow-sm',
    inactive: 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]',
  },
  bordered: {
    base: 'rounded-lg',
    active: 'bg-[#007aff] text-white',
    inactive: 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:bg-gray-50 dark:hover:bg-white/5',
  },
  soft: {
    base: 'rounded-xl',
    active: 'bg-[#007aff]/10 text-[#007aff] dark:bg-[#5ac8fa]/15 dark:text-[#5ac8fa]',
    inactive: 'text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:bg-gray-100 dark:hover:bg-white/5',
  },
};

const tabSizeStyles: Record<TabsSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-5 text-lg',
};

// =============================================================================
// TABS ROOT
// =============================================================================

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: controlledValue,
      defaultValue = '',
      onValueChange,
      variant = 'default',
      size = 'md',
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = controlledValue ?? internalValue;

    const handleValueChange = (newValue: string) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange, variant, size }}>
        <div
          ref={ref}
          className={cn('w-full', fullWidth && 'flex flex-col', className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

// =============================================================================
// TAB LIST
// =============================================================================

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useTabsContext();

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          'flex items-center',
          tabListVariantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabList.displayName = 'TabList';

// =============================================================================
// TAB
// =============================================================================

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, disabled = false, icon, className, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange, variant, size } = useTabsContext();
    const isSelected = value === selectedValue;
    const styles = tabVariantStyles[variant];

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isSelected}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={() => !disabled && onValueChange(value)}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 font-medium',
          'transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007aff]/50 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          styles.base,
          tabSizeStyles[size],
          isSelected ? styles.active : styles.inactive,
          className
        )}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
        {variant === 'default' && isSelected && (
          <motion.div
            layoutId="activeTab"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007aff] dark:bg-[#5ac8fa]"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          />
        )}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

// =============================================================================
// TAB PANEL
// =============================================================================

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, className, children }, ref) => {
    const { value: selectedValue } = useTabsContext();
    const isSelected = value === selectedValue;

    if (!isSelected) return null;

    return (
      <motion.div
        ref={ref}
        role="tabpanel"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={cn('mt-4 focus:outline-none', className)}
        tabIndex={0}
      >
        {children}
      </motion.div>
    );
  }
);

TabPanel.displayName = 'TabPanel';

// =============================================================================
// SEGMENTED CONTROL (Specialized tabs variant)
// =============================================================================

export interface SegmentedControlProps extends Omit<TabsProps, 'variant'> {
  options: Array<{ value: string; label: string; icon?: ReactNode }>;
}

export function SegmentedControl({
  options,
  size = 'md',
  className,
  ...props
}: SegmentedControlProps) {
  return (
    <Tabs variant="pills" size={size} className={className} {...props}>
      <TabList>
        {options.map((option) => (
          <Tab key={option.value} value={option.value} icon={option.icon}>
            {option.label}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}

export default Tabs;
