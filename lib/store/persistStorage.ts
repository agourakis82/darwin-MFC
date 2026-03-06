/**
 * SSR-safe Zustand persist storage.
 *
 * `persist()` defaults to `localStorage`, which doesn't exist during
 * Next.js static export / server rendering. This helper keeps builds stable.
 */

import { createJSONStorage } from 'zustand/middleware';
import type { StateStorage } from 'zustand/middleware';

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const ssrSafeJSONStorage = createJSONStorage(() => {
  return typeof window !== 'undefined' ? localStorage : noopStorage;
});

