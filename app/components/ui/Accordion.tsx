'use client';

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  ReactNode,
  HTMLAttributes,
  forwardRef,
  KeyboardEvent,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export type AccordionVariant = 'default' | 'bordered' | 'separated' | 'ghost';
export type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  type: AccordionType;
  expandedItems: string[];
  toggleItem: (value: string) => void;
  variant: AccordionVariant;
  iconType: 'chevron' | 'plus';
  // WAI-ARIA keyboard navigation
  registerTrigger: (value: string, ref: HTMLButtonElement | null) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLButtonElement>, value: string) => void;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  type?: AccordionType;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: AccordionVariant;
  iconType?: 'chevron' | 'plus';
  collapsible?: boolean;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {}

// =============================================================================
// CONTEXT
// =============================================================================

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<{ value: string; isExpanded: boolean } | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion provider');
  }
  return context;
}

function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionTrigger/AccordionContent must be used within an AccordionItem');
  }
  return context;
}

// =============================================================================
// STYLES
// =============================================================================

const accordionVariantStyles: Record<AccordionVariant, { root: string; item: string }> = {
  default: {
    root: 'divide-y divide-gray-200 dark:divide-white/10',
    item: '',
  },
  bordered: {
    root: 'border border-gray-200 dark:border-white/10 rounded-xl divide-y divide-gray-200 dark:divide-white/10 overflow-hidden',
    item: '',
  },
  separated: {
    root: 'space-y-2',
    item: 'border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden',
  },
  ghost: {
    root: 'space-y-1',
    item: 'rounded-xl',
  },
};

// =============================================================================
// ACCORDION ROOT
// =============================================================================

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = 'single',
      defaultValue = type === 'single' ? '' : [],
      value: controlledValue,
      onValueChange,
      variant = 'default',
      iconType = 'chevron',
      collapsible = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string[]>(
      Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
    );

    // WAI-ARIA: Track all trigger refs for keyboard navigation
    const triggersRef = useRef<Map<string, HTMLButtonElement>>(new Map());
    const triggerOrderRef = useRef<string[]>([]);

    const expandedItems = controlledValue
      ? Array.isArray(controlledValue)
        ? controlledValue
        : controlledValue
          ? [controlledValue]
          : []
      : internalValue;

    const toggleItem = (itemValue: string) => {
      let newValue: string[];

      if (type === 'single') {
        if (expandedItems.includes(itemValue)) {
          newValue = collapsible ? [] : expandedItems;
        } else {
          newValue = [itemValue];
        }
      } else {
        if (expandedItems.includes(itemValue)) {
          newValue = expandedItems.filter((v) => v !== itemValue);
        } else {
          newValue = [...expandedItems, itemValue];
        }
      }

      setInternalValue(newValue);
      onValueChange?.(type === 'single' ? newValue[0] || '' : newValue);
    };

    // WAI-ARIA: Register trigger buttons for keyboard navigation
    const registerTrigger = useCallback((value: string, buttonRef: HTMLButtonElement | null) => {
      if (buttonRef) {
        triggersRef.current.set(value, buttonRef);
        if (!triggerOrderRef.current.includes(value)) {
          triggerOrderRef.current.push(value);
        }
      } else {
        triggersRef.current.delete(value);
        triggerOrderRef.current = triggerOrderRef.current.filter(v => v !== value);
      }
    }, []);

    // WAI-ARIA: Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>, currentValue: string) => {
      const triggers = triggerOrderRef.current;
      const currentIndex = triggers.indexOf(currentValue);

      let targetIndex: number | null = null;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          targetIndex = currentIndex < triggers.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'ArrowUp':
          e.preventDefault();
          targetIndex = currentIndex > 0 ? currentIndex - 1 : triggers.length - 1;
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          targetIndex = triggers.length - 1;
          break;
      }

      if (targetIndex !== null) {
        const targetValue = triggers[targetIndex];
        const targetButton = triggersRef.current.get(targetValue);
        targetButton?.focus();
      }
    }, []);

    return (
      <AccordionContext.Provider
        value={{ type, expandedItems, toggleItem, variant, iconType, registerTrigger, handleKeyDown }}
      >
        <div
          ref={ref}
          className={cn(accordionVariantStyles[variant].root, className)}
          role="presentation"
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

// =============================================================================
// ACCORDION ITEM
// =============================================================================

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, disabled = false, className, children, ...props }, ref) => {
    const { expandedItems, variant } = useAccordionContext();
    const isExpanded = expandedItems.includes(value);

    return (
      <AccordionItemContext.Provider value={{ value, isExpanded }}>
        <div
          ref={ref}
          data-state={isExpanded ? 'open' : 'closed'}
          data-disabled={disabled || undefined}
          className={cn(
            accordionVariantStyles[variant].item,
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

// =============================================================================
// ACCORDION TRIGGER
// =============================================================================

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ icon, className, children, ...props }, ref) => {
    const { toggleItem, variant, iconType, registerTrigger, handleKeyDown } = useAccordionContext();
    const { value, isExpanded } = useAccordionItemContext();
    const internalRef = useRef<HTMLButtonElement>(null);

    // Combine refs and register for keyboard navigation
    const setRef = useCallback((node: HTMLButtonElement | null) => {
      // Handle internal ref
      (internalRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      // Handle forwarded ref
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
      // Register for keyboard navigation
      registerTrigger(value, node);
    }, [ref, registerTrigger, value]);

    const IconComponent = iconType === 'plus' ? (isExpanded ? Minus : Plus) : ChevronDown;

    return (
      <button
        ref={setRef}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${value}`}
        id={`accordion-trigger-${value}`}
        onClick={() => toggleItem(value)}
        onKeyDown={(e) => handleKeyDown(e, value)}
        className={cn(
          'flex items-center justify-between w-full py-4 px-4',
          'text-left font-medium text-[#1d1d1f] dark:text-[#f5f5f7]',
          'transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007aff]/50',
          variant === 'ghost' && 'hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl',
          className
        )}
        {...props}
      >
        <span className="flex items-center gap-3">
          {icon && <span className="flex-shrink-0 text-[#86868b]">{icon}</span>}
          {children}
        </span>
        <motion.span
          animate={{ rotate: isExpanded && iconType === 'chevron' ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-[#86868b]"
        >
          <IconComponent className="h-4 w-4" />
        </motion.span>
      </button>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

// =============================================================================
// ACCORDION CONTENT
// =============================================================================

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { value, isExpanded } = useAccordionItemContext();

    return (
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            ref={ref}
            id={`accordion-content-${value}`}
            role="region"
            aria-labelledby={`accordion-trigger-${value}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                'px-4 pb-4 pt-0 text-[#86868b]',
                className
              )}
              {...props}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';

// =============================================================================
// FAQ ACCORDION (Specialized variant)
// =============================================================================

export interface FAQItem {
  question: string;
  answer: ReactNode;
}

export interface FAQAccordionProps extends Omit<AccordionProps, 'children'> {
  items: FAQItem[];
}

export function FAQAccordion({ items, ...props }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible variant="separated" {...props}>
      {items.map((item, index) => (
        <AccordionItem key={index} value={`faq-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default Accordion;
