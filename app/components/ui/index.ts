/**
 * Darwin Design System (DDS)
 * Centralized UI component library for consistent styling
 *
 * Usage:
 * import { Button, Card, Badge, Input } from '@/app/components/ui';
 */

// =============================================================================
// CORE COMPONENTS
// =============================================================================

// Button
export {
  Button,
  ButtonGroup,
  IconButton,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
  type ButtonGroupProps,
  type IconButtonProps,
} from './Button';

// Card
export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardGrid,
  type CardProps,
  type CardVariant,
  type CardPadding,
  type CardHeaderProps,
  type CardBodyProps,
  type CardFooterProps,
  type CardGridProps,
} from './Card';

// GlassCard (SOTA+ 2026 Glassmorphism)
export {
  GlassCard,
  GlassCardHeader,
  GlassCardBody,
  GlassCardFooter,
  GlassCardGrid,
  EvidenceGlassCard,
  InteractionGlassCard,
  ConvergenceGlassCard,
  type GlassCardProps,
  type GlassVariant,
  type GlowVariant,
  type HoverEffect,
  type GlassCardPadding,
  type GlassCardHeaderProps,
  type GlassCardBodyProps,
  type GlassCardFooterProps,
  type GlassCardGridProps,
  type EvidenceGlassCardProps,
  type InteractionGlassCardProps,
  type ConvergenceGlassCardProps,
} from './GlassCard';

// Badge
export {
  Badge,
  StatusBadge,
  CategoryBadge,
  EvidenceBadge,
  BadgeGroup,
  type BadgeProps,
  type BadgeVariant,
  type BadgeSize,
  type StatusBadgeProps,
  type StatusType,
  type CategoryBadgeProps,
  type CategoryType,
  type EvidenceBadgeProps,
  type EvidenceLevel,
  type BadgeGroupProps,
} from './Badge';

// Input
export {
  Input,
  SearchInput,
  PasswordInput,
  NumberInput,
  Textarea,
  type InputProps,
  type InputVariant,
  type InputSize,
  type SearchInputProps,
  type NumberInputProps,
  type TextareaProps,
} from './Input';

// Modal
export {
  Modal,
  Drawer,
  AlertDialog,
  type ModalProps,
  type ModalSize,
  type DrawerProps,
  type DrawerPosition,
  type AlertDialogProps,
  type AlertType,
} from './Modal';

// Tooltip
export {
  Tooltip,
  TooltipProvider,
  InfoTooltip,
  ShortcutTooltip,
  RichTooltip,
  type TooltipProps,
  type TooltipPosition,
  type TooltipProviderProps,
  type InfoTooltipProps,
  type ShortcutTooltipProps,
  type RichTooltipProps,
} from './Tooltip';

// Tabs
export {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  SegmentedControl,
  type TabsProps,
  type TabsVariant,
  type TabsSize,
  type TabListProps,
  type TabProps,
  type TabPanelProps,
  type SegmentedControlProps,
} from './Tabs';

// Accordion
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  FAQAccordion,
  type AccordionProps,
  type AccordionVariant,
  type AccordionType,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
  type FAQAccordionProps,
  type FAQItem,
} from './Accordion';

// =============================================================================
// UTILITY COMPONENTS
// =============================================================================

// Skeleton (already exists)
export {
  Skeleton,
  CardSkeleton,
  GridSkeleton,
  TableSkeleton,
  StatsSkeleton,
  PageHeaderSkeleton,
  SearchBarSkeleton,
} from './Skeleton';

// Toast (already exists)
export {
  toast,
  ToastProvider,
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showWarningToast,
  showLoadingToast,
  dismissToast,
  showPromiseToast,
} from './Toast';

// =============================================================================
// DESIGN TOKENS
// =============================================================================

export {
  designTokens,
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  components,
  getCssVar,
  rgba,
} from '@/lib/design-tokens';
