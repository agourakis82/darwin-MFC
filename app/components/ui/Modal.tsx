'use client';

import { forwardRef, HTMLAttributes, ReactNode, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

// =============================================================================
// TYPES
// =============================================================================

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export interface DrawerProps extends Omit<ModalProps, 'size'> {
  position?: DrawerPosition;
  size?: 'sm' | 'md' | 'lg';
}

export interface AlertDialogProps extends Omit<ModalProps, 'footer' | 'size'> {
  type?: AlertType;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isConfirmLoading?: boolean;
  isDestructive?: boolean;
}

// =============================================================================
// STYLES
// =============================================================================

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[95vw] max-h-[95vh]',
};

const drawerSizeStyles: Record<DrawerPosition, Record<'sm' | 'md' | 'lg', string>> = {
  left: { sm: 'w-64', md: 'w-80', lg: 'w-96' },
  right: { sm: 'w-64', md: 'w-80', lg: 'w-96' },
  top: { sm: 'h-48', md: 'h-64', lg: 'h-96' },
  bottom: { sm: 'h-48', md: 'h-64', lg: 'h-96' },
};

const drawerPositionStyles: Record<DrawerPosition, string> = {
  left: 'left-0 top-0 bottom-0 rounded-r-2xl',
  right: 'right-0 top-0 bottom-0 rounded-l-2xl',
  top: 'top-0 left-0 right-0 rounded-b-2xl',
  bottom: 'bottom-0 left-0 right-0 rounded-t-2xl',
};

const alertTypeConfig: Record<AlertType, { icon: typeof Info; color: string; bgColor: string }> = {
  info: { icon: Info, color: 'text-[#007aff]', bgColor: 'bg-[#007aff]/10' },
  success: { icon: CheckCircle, color: 'text-[#34c759]', bgColor: 'bg-[#34c759]/10' },
  warning: { icon: AlertTriangle, color: 'text-[#ff9500]', bgColor: 'bg-[#ff9500]/10' },
  error: { icon: XCircle, color: 'text-[#ff3b30]', bgColor: 'bg-[#ff3b30]/10' },
};

// =============================================================================
// MODAL COMPONENT
// =============================================================================

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEsc = true,
      showCloseButton = true,
      title,
      description,
      footer,
      children,
      className,
    },
    ref
  ) => {
    // Handle ESC key
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEsc) {
          onClose();
        }
      },
      [closeOnEsc, onClose]
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }, [isOpen, handleKeyDown]);

    if (typeof window === 'undefined') return null;

    return createPortal(
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeOnOverlayClick ? onClose : undefined}
              aria-hidden="true"
            />

            {/* Modal Content */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                'relative w-full',
                sizeStyles[size],
                'bg-white dark:bg-[#1c1c1e]',
                'rounded-2xl shadow-2xl',
                'max-h-[90vh] overflow-hidden flex flex-col',
                className
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              aria-describedby={description ? 'modal-description' : undefined}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-white/10">
                  <div>
                    {title && (
                      <h2
                        id="modal-title"
                        className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]"
                      >
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p id="modal-description" className="mt-1 text-sm text-[#86868b]">
                        {description}
                      </p>
                    )}
                  </div>
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="p-2 rounded-full text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6">{children}</div>

              {/* Footer */}
              {footer && (
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-white/10">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    );
  }
);

Modal.displayName = 'Modal';

// =============================================================================
// DRAWER COMPONENT
// =============================================================================

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen,
      onClose,
      position = 'right',
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEsc = true,
      showCloseButton = true,
      title,
      description,
      footer,
      children,
      className,
    },
    ref
  ) => {
    // Handle ESC key
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEsc) {
          onClose();
        }
      },
      [closeOnEsc, onClose]
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }, [isOpen, handleKeyDown]);

    const getInitialPosition = () => {
      switch (position) {
        case 'left':
          return { x: '-100%' };
        case 'right':
          return { x: '100%' };
        case 'top':
          return { y: '-100%' };
        case 'bottom':
          return { y: '100%' };
      }
    };

    if (typeof window === 'undefined') return null;

    return createPortal(
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeOnOverlayClick ? onClose : undefined}
              aria-hidden="true"
            />

            {/* Drawer Content */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, ...getInitialPosition() }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, ...getInitialPosition() }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn(
                'absolute',
                drawerPositionStyles[position],
                drawerSizeStyles[position][size],
                'bg-white dark:bg-[#1c1c1e]',
                'shadow-2xl',
                'flex flex-col',
                className
              )}
              role="dialog"
              aria-modal="true"
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-white/10">
                  <div>
                    {title && (
                      <h2 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p className="mt-1 text-sm text-[#86868b]">{description}</p>
                    )}
                  </div>
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="p-2 rounded-full text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6">{children}</div>

              {/* Footer */}
              {footer && (
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-white/10">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    );
  }
);

Drawer.displayName = 'Drawer';

// =============================================================================
// ALERT DIALOG
// =============================================================================

export const AlertDialog = forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      isOpen,
      onClose,
      type = 'info',
      title,
      description,
      confirmLabel = 'Confirm',
      cancelLabel = 'Cancel',
      onConfirm,
      onCancel,
      isConfirmLoading = false,
      isDestructive = false,
      children,
      ...props
    },
    ref
  ) => {
    const config = alertTypeConfig[type];
    const Icon = config.icon;

    const handleCancel = () => {
      onCancel?.();
      onClose();
    };

    const handleConfirm = () => {
      onConfirm?.();
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
        showCloseButton={false}
        footer={
          <>
            <Button variant="ghost" onClick={handleCancel}>
              {cancelLabel}
            </Button>
            <Button
              variant={isDestructive ? 'danger' : 'primary'}
              onClick={handleConfirm}
              isLoading={isConfirmLoading}
            >
              {confirmLabel}
            </Button>
          </>
        }
        {...props}
      >
        <div className="text-center">
          <div
            className={cn(
              'mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4',
              config.bgColor
            )}
          >
            <Icon className={cn('h-6 w-6', config.color)} />
          </div>
          {title && (
            <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">
              {title}
            </h3>
          )}
          {description && <p className="text-sm text-[#86868b] mb-4">{description}</p>}
          {children}
        </div>
      </Modal>
    );
  }
);

AlertDialog.displayName = 'AlertDialog';

export default Modal;
