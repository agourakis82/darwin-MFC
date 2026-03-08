import type { Dispatch, SetStateAction } from 'react';

interface ToggleOverlayInput {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onFirstOpen?: () => void;
}

export function toggleOverlayVisibility({
  isOpen,
  setOpen,
  onFirstOpen,
}: ToggleOverlayInput) {
  setOpen((value) => !value);

  if (!isOpen) {
    onFirstOpen?.();
  }
}

export async function copyProtocolText(text: string) {
  if (typeof navigator === 'undefined' || !navigator.clipboard) return;
  await navigator.clipboard.writeText(text);
}
