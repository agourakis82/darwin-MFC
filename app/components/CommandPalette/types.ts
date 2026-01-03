/**
 * DARWIN-MFC COMMAND PALETTE TYPES
 * =================================
 *
 * Type definitions for the CMD+K command palette system.
 */

import type { LucideIcon } from 'lucide-react';

// =============================================================================
// COMMAND TYPES
// =============================================================================

/**
 * Command categories for grouping and filtering
 */
export type CommandCategory =
  | 'navigation'    // Page navigation commands
  | 'search'        // Search-related commands
  | 'action'        // General actions (toggle theme, etc.)
  | 'tool'          // Clinical tools (calculators, etc.)
  | 'recent'        // Recently used commands
  | 'disease'       // Disease-related results
  | 'medication'    // Medication-related results
  | 'protocol'      // Protocol-related results
  | 'ontology';     // Ontology/terminology results

/**
 * Command priority for sorting
 */
export type CommandPriority = 'high' | 'normal' | 'low';

/**
 * A single command/action in the palette
 */
export interface Command {
  /** Unique identifier */
  id: string;

  /** Display title */
  title: string;

  /** Optional subtitle/description */
  subtitle?: string;

  /** Lucide icon component */
  icon?: LucideIcon;

  /** Category for grouping */
  category: CommandCategory;

  /** Keywords for fuzzy search */
  keywords: string[];

  /** Action to execute when selected */
  action: () => void | Promise<void>;

  /** Keyboard shortcut (e.g., "⌘D", "⌘⇧T") */
  shortcut?: string;

  /** Priority for sorting within category */
  priority?: CommandPriority;

  /** Whether this command is currently available */
  enabled?: boolean;

  /** URL for navigation commands */
  href?: string;

  /** Metadata for dynamic commands (search results) */
  meta?: Record<string, unknown>;
}

/**
 * A group of commands with a shared category
 */
export interface CommandGroup {
  /** Category identifier */
  category: CommandCategory;

  /** Display label for the group */
  label: string;

  /** Commands in this group */
  commands: Command[];
}

// =============================================================================
// SEARCH TYPES
// =============================================================================

/**
 * Search result from the command palette
 */
export interface CommandSearchResult {
  /** The matching command */
  command: Command;

  /** Fuzzy search score (0-1, higher is better) */
  score: number;

  /** Matched characters for highlighting */
  matches?: Array<{
    key: string;
    indices: Array<[number, number]>;
    value: string;
  }>;
}

/**
 * Search options for filtering commands
 */
export interface CommandSearchOptions {
  /** Search query */
  query: string;

  /** Maximum results to return */
  limit?: number;

  /** Filter by categories */
  categories?: CommandCategory[];

  /** Include disabled commands */
  includeDisabled?: boolean;
}

// =============================================================================
// UI STATE TYPES
// =============================================================================

/**
 * Command palette state
 */
export interface CommandPaletteState {
  /** Whether the palette is open */
  isOpen: boolean;

  /** Current search query */
  query: string;

  /** Currently selected command index */
  selectedIndex: number;

  /** Loading state for async operations */
  isLoading: boolean;

  /** Active filter categories */
  activeFilters: CommandCategory[];

  /** Command history for "recent" suggestions */
  history: string[];
}

/**
 * Command palette context value
 */
export interface CommandPaletteContextValue {
  /** Current state */
  state: CommandPaletteState;

  /** Open the palette */
  open: () => void;

  /** Close the palette */
  close: () => void;

  /** Toggle the palette */
  toggle: () => void;

  /** Set the search query */
  setQuery: (query: string) => void;

  /** Select a command by index */
  selectIndex: (index: number) => void;

  /** Execute a command */
  executeCommand: (command: Command) => void;

  /** Register a command */
  registerCommand: (command: Command) => void;

  /** Unregister a command */
  unregisterCommand: (id: string) => void;

  /** Get all registered commands */
  getCommands: () => Command[];

  /** Search commands */
  search: (options: CommandSearchOptions) => CommandSearchResult[];
}

// =============================================================================
// COMPONENT PROPS
// =============================================================================

/**
 * CommandPalette component props
 */
export interface CommandPaletteProps {
  /** Pre-registered commands */
  commands?: Command[];

  /** Placeholder text for search input */
  placeholder?: string;

  /** Whether to show recent commands */
  showRecent?: boolean;

  /** Maximum number of recent commands */
  maxRecent?: number;

  /** Custom footer content */
  footer?: React.ReactNode;

  /** Called when a command is executed */
  onCommandExecute?: (command: Command) => void;

  /** Called when the palette opens */
  onOpen?: () => void;

  /** Called when the palette closes */
  onClose?: () => void;
}

/**
 * CommandInput component props
 */
export interface CommandInputProps {
  /** Current query value */
  value: string;

  /** Called when query changes */
  onChange: (value: string) => void;

  /** Placeholder text */
  placeholder?: string;

  /** Loading state */
  isLoading?: boolean;

  /** Called when Escape is pressed */
  onEscape?: () => void;

  /** Called when Enter is pressed */
  onEnter?: () => void;

  /** Called when Arrow Up is pressed */
  onArrowUp?: () => void;

  /** Called when Arrow Down is pressed */
  onArrowDown?: () => void;
}

/**
 * CommandList component props
 */
export interface CommandListProps {
  /** Grouped commands to display */
  groups: CommandGroup[];

  /** Currently selected index */
  selectedIndex: number;

  /** Called when a command is selected */
  onSelect: (command: Command) => void;

  /** Called when selection changes */
  onSelectionChange: (index: number) => void;

  /** Empty state message */
  emptyMessage?: string;

  /** Whether results are loading */
  isLoading?: boolean;
}

/**
 * CommandGroup component props
 */
export interface CommandGroupProps {
  /** Group label */
  label: string;

  /** Commands in this group */
  commands: Command[];

  /** Starting index for selection tracking */
  startIndex: number;

  /** Currently selected global index */
  selectedIndex: number;

  /** Called when a command is selected */
  onSelect: (command: Command) => void;
}

/**
 * CommandItem component props
 */
export interface CommandItemProps {
  /** Command data */
  command: Command;

  /** Whether this item is selected */
  isSelected: boolean;

  /** Called when item is clicked */
  onClick: () => void;

  /** Index for accessibility */
  index: number;
}

// =============================================================================
// CATEGORY CONFIGURATION
// =============================================================================

/**
 * Category display configuration
 */
export interface CategoryConfig {
  label: string;
  icon?: LucideIcon;
  order: number;
}

/**
 * Category configuration map
 */
export const CATEGORY_CONFIG: Record<CommandCategory, CategoryConfig> = {
  recent: { label: 'Recent', order: 0 },
  navigation: { label: 'Navigation', order: 1 },
  search: { label: 'Search', order: 2 },
  action: { label: 'Actions', order: 3 },
  tool: { label: 'Tools', order: 4 },
  disease: { label: 'Diseases', order: 5 },
  medication: { label: 'Medications', order: 6 },
  protocol: { label: 'Protocols', order: 7 },
  ontology: { label: 'Terminology', order: 8 },
};
