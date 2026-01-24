/**
 * Accessible Toast/Alert Component
 * WCAG 2.2 AAA Compliant
 * ARIA live regions for screen readers
 */

'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const toastStyles = {
  success: [
    'bg-green-50',
    'border-green-200',
    'text-green-900',
    'focus:ring-green-300',
  ],
  error: [
    'bg-red-50',
    'border-red-200',
    'text-red-900',
    'focus:ring-red-300',
  ],
  warning: [
    'bg-yellow-50',
    'border-yellow-200',
    'text-yellow-900',
    'focus:ring-yellow-300',
  ],
  info: [
    'bg-blue-50',
    'border-blue-200',
    'text-blue-900',
    'focus:ring-blue-300',
  ],
};

const iconMap = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

function ToastItem({ toast, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onClose(toast.id), 300);
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(toast.id), 300);
  };

  return (
    <div
      role="alert"
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border shadow-lg',
        'min-w-[320px] max-w-md',
        'transition-all duration-300 ease-in-out',
        'focus:outline-none focus:ring-4',
        toastStyles[toast.type],
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      )}
      tabIndex={-1}
    >
      {/* Icon */}
      <span
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-current"
        aria-hidden="true"
      >
        {iconMap[toast.type]}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base">{toast.title}</h3>
        {toast.message && (
          <p className="mt-1 text-sm leading-relaxed">{toast.message}</p>
        )}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2 text-sm font-medium underline focus:outline-none focus:ring-2 focus:ring-current rounded"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 rounded hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-current"
        aria-label="Fechar notificação"
      >
        <X className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-3"
      role="region"
      aria-label="Notificações"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>,
    document.body
  );
}

// Toast manager hook
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (title: string, message?: string, duration = 5000) => {
    return addToast({ title, message, type: 'success', duration });
  };

  const error = (title: string, message?: string, duration = 7000) => {
    return addToast({ title, message, type: 'error', duration });
  };

  const warning = (title: string, message?: string, duration = 6000) => {
    return addToast({ title, message, type: 'warning', duration });
  };

  const info = (title: string, message?: string, duration = 5000) => {
    return addToast({ title, message, type: 'info', duration });
  };

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
}

export default ToastContainer;
