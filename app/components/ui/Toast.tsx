'use client';

import { Toaster as SonnerToaster, toast } from 'sonner';

interface ToastProviderProps {
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  duration?: number;
}

export function ToastProvider({
  position = 'bottom-right',
  duration = 4000,
}: ToastProviderProps) {
  return (
    <SonnerToaster
      position={position}
      duration={duration}
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: 'glass-strong !rounded-xl !border-white/20 dark:!border-white/10',
          title: 'font-semibold',
          description: 'text-sm text-[#86868b]',
          actionButton: 'bg-[#007aff] text-white hover:bg-[#0055ff]',
          cancelButton: 'bg-neutral-200 dark:bg-neutral-700',
          closeButton: 'hover:bg-black/5 dark:hover:bg-white/10',
        },
      }}
    />
  );
}

// Re-export toast methods for convenience
export { toast };

// Helper functions for common toast patterns
export const showSuccessToast = (message: string, description?: string) => {
  toast.success(message, { description });
};

export const showErrorToast = (message: string, description?: string) => {
  toast.error(message, { description });
};

export const showInfoToast = (message: string, description?: string) => {
  toast.info(message, { description });
};

export const showWarningToast = (message: string, description?: string) => {
  toast.warning(message, { description });
};

export const showLoadingToast = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (toastId?: string | number) => {
  toast.dismiss(toastId);
};

export const showPromiseToast = <T,>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: Error) => string);
  }
) => {
  return toast.promise(promise, messages);
};

export default ToastProvider;
