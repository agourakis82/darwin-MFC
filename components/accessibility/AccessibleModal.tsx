/**
 * Accessible Modal/Dialog Component
 * WCAG 2.2 AAA Compliant
 * Focus trap, keyboard navigation, ARIA attributes
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
}

const sizeStyles = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
};

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnEscape = true,
  closeOnBackdropClick = true,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle mount state for SSR
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Focus management
  useEffect(() => {
    if (isOpen && mounted) {
      // Store previous focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal title
      titleRef.current?.focus();
      
      // Trap focus inside modal
      const trapFocus = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        
        if (!focusableElements.length) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      };
      
      document.addEventListener('keydown', trapFocus);
      
      return () => {
        document.removeEventListener('keydown', trapFocus);
      };
    }
  }, [isOpen, mounted]);

  // Restore focus when modal closes
  useEffect(() => {
    if (!isOpen && previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen && mounted) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, mounted]);

  if (!mounted || !isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
        className={cn(
          'relative bg-white rounded-xl shadow-2xl w-full max-h-[90vh] overflow-hidden flex flex-col',
          'focus:outline-none',
          sizeStyles[size]
        )}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2
            ref={titleRef}
            id="modal-title"
            className="text-xl font-semibold text-gray-900"
            tabIndex={-1}
          >
            {title}
          </h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5 text-gray-500" aria-hidden="true" />
            </button>
          )}
        </div>
        
        {/* Description */}
        {description && (
          <p
            id="modal-description"
            className="px-6 py-2 text-sm text-gray-600 border-b border-gray-100"
          >
            {description}
          </p>
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}

// Modal with confirmation pattern
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
}: ConfirmModalProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsConfirming(false);
    }
  };

  const variantStyles = {
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-300',
    warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-300',
    info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300',
  };

  return (
    <AccessibleModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={message}
      size="sm"
      showCloseButton={!isConfirming}
      closeOnEscape={!isConfirming}
      closeOnBackdropClick={!isConfirming}
    >
      <div className="flex gap-3 justify-end pt-4">
        <button
          onClick={onClose}
          disabled={isConfirming}
          className="min-h-[44px] min-w-[44px] px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cancelLabel}
        </button>
        <button
          onClick={handleConfirm}
          disabled={isConfirming}
          className={cn(
            'min-h-[44px] min-w-[44px] px-6 py-3 rounded-lg text-white font-medium focus:outline-none focus:ring-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
            variantStyles[variant]
          )}
        >
          {isConfirming ? 'Processando...' : confirmLabel}
        </button>
      </div>
    </AccessibleModal>
  );
}

export default AccessibleModal;
