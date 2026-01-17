/**
 * Darwin-MFC Hooks
 * ================
 * Central export for all custom React hooks.
 */

export { useFocusTrap } from './useFocusTrap';
export { useReducedMotion } from './useReducedMotion';
export {
  useWindowSize,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useBreakpoint,
  useOrientation,
  useIsTouchDevice,
  useScrollLock,
  useSwipe,
  useSafeAreaInsets,
  responsiveClasses,
} from './useResponsive';
export { useLocalizedDisease } from './useLocalizedDisease';
export { useLocalizedMedication } from './useLocalizedMedication';
export { useAutoSave, useAutoSaveOnBlur } from './useAutoSave';
export type { AutoSaveStatus, UseAutoSaveOptions, UseAutoSaveReturn } from './useAutoSave';
