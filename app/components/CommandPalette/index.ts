/**
 * DARWIN-MFC COMMAND PALETTE
 * ==========================
 *
 * A CMD+K powered command palette for quick navigation,
 * search, and actions throughout the application.
 *
 * Features:
 * - Fuzzy search with Fuse.js
 * - Smart suggestions (typo correction, related topics)
 * - Recent searches
 * - Trending topics
 * - Grouped results by type
 * - Keyboard navigation
 *
 * Usage:
 * ```tsx
 * import { CommandPalette } from '@/app/components/CommandPalette';
 *
 * function App() {
 *   const [open, setOpen] = useState(false);
 *   return <CommandPalette open={open} onOpenChange={setOpen} />;
 * }
 * ```
 *
 * Keyboard Shortcuts:
 * - CMD+K / CTRL+K: Open palette
 * - /: Open palette (when not in input)
 * - ESC: Close palette
 * - Arrow Up/Down: Navigate
 * - Enter: Select
 */

// Main component (uses cmdk library)
export { default as CommandPalette } from './CommandPalette';

// Types for custom implementations
export * from './types';

// Custom subcomponents (alternative implementation)
export { CommandInput } from './CommandInput';
export { CommandItem } from './CommandItem';
export { CommandGroup } from './CommandGroup';
export { CommandList } from './CommandList';
