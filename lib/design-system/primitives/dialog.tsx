/**
 * DIALOG/MODAL PRIMITIVE
 * ======================
 *
 * Accessible modal dialog built on Radix UI Dialog
 * Supports animations, sizes, and clinical variants
 */

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

// Dialog Root - Re-export from Radix
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

// Overlay variants
const overlayVariants = cva(
  [
    'fixed inset-0 z-50',
    'bg-black/50 backdrop-blur-sm',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ],
  {
    variants: {
      blur: {
        none: 'backdrop-blur-none',
        sm: 'backdrop-blur-sm',
        md: 'backdrop-blur-md',
        lg: 'backdrop-blur-lg',
      },
    },
    defaultVariants: {
      blur: 'sm',
    },
  }
);

// Dialog Overlay
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> &
    VariantProps<typeof overlayVariants>
>(({ className, blur, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(overlayVariants({ blur }), className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// Content variants
const contentVariants = cva(
  [
    'fixed left-[50%] top-[50%] z-50',
    'translate-x-[-50%] translate-y-[-50%]',
    'w-full max-h-[90vh] overflow-y-auto',
    'bg-paper-white dark:bg-carbon-900',
    'border border-carbon-200 dark:border-carbon-800',
    'shadow-deep',
    'duration-200',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm rounded-lg p-4',
        md: 'max-w-md rounded-lg p-6',
        lg: 'max-w-lg rounded-lg p-6',
        xl: 'max-w-xl rounded-lg p-8',
        '2xl': 'max-w-2xl rounded-lg p-8',
        '3xl': 'max-w-3xl rounded-xl p-8',
        '4xl': 'max-w-4xl rounded-xl p-10',
        full: 'max-w-[95vw] rounded-xl p-10',
      },
      variant: {
        default: '',
        // Uses global glass vars so "Reduce transparency" can make it solid.
        glass:
          'bg-[var(--darwin-glass-bg)] dark:bg-[var(--darwin-glass-bg-dark)] backdrop-blur-md border-carbon-200/70 dark:border-carbon-800/70',
        critical: 'border-l-4 border-l-clinical-critical-base bg-critical-red-50 dark:bg-critical-red-900/20',
        warning: 'border-l-4 border-l-clinical-warning-base bg-thymine-gold/10 dark:bg-thymine-gold/15',
        success: 'border-l-4 border-l-clinical-safe-base bg-guanine-green/10 dark:bg-guanine-green/15',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

// Dialog Content
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    VariantProps<typeof contentVariants> &
    VariantProps<typeof overlayVariants> & {
      /**
       * Show close button
       */
      showClose?: boolean;
      /**
       * Custom close icon
       */
      closeIcon?: React.ReactNode;
    }
>(
  (
    {
      className,
      children,
      size,
      variant,
      blur,
      showClose = true,
      closeIcon,
      ...props
    },
    ref
  ) => (
    <DialogPortal>
      <DialogOverlay blur={blur} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(contentVariants({ size, variant }), className)}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-paper-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-carbon-100 data-[state=open]:text-carbon-600 dark:ring-offset-carbon-950 dark:focus:ring-brand-primary-400 dark:data-[state=open]:bg-carbon-800/60 dark:data-[state=open]:text-carbon-300">
            {closeIcon || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            )}
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Dialog Header
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

// Dialog Footer
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

// Dialog Title
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Dialog Description
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-carbon-600 dark:text-carbon-400', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
