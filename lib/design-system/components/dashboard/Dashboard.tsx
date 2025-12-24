/**
 * DASHBOARD CONTAINER
 * ===================
 *
 * Main dashboard component with customizable widget layout
 * Supports drag-and-drop reordering, resizing, and persistence
 *
 * Features:
 * - Grid-based layout with responsive breakpoints
 * - Drag-and-drop widget reordering (@dnd-kit)
 * - Widget add/remove/reset
 * - Layout persistence to localStorage
 * - Preset layouts (clinical, analytics, minimal)
 * - Export dashboard as image
 */

'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/design-system/utils/cn';
import {
  LayoutGrid,
  Settings,
  Download,
  RotateCcw,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { Button } from '../../primitives/button';
import { Card } from '../../primitives/card';

// ============================================================================
// TYPES
// ============================================================================

export interface Widget {
  id: string;
  type: string;
  title: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  removable?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
}

export interface DashboardLayout {
  id: string;
  name: string;
  description?: string;
  widgets: string[]; // Widget IDs in order
}

export interface DashboardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardVariants> {
  widgets: Widget[];
  layouts?: DashboardLayout[];
  defaultLayout?: string;
  storageKey?: string;
  showControls?: boolean;
  allowCustomization?: boolean;
  maxColumns?: number;
  gap?: number;
  onLayoutChange?: (widgetIds: string[]) => void;
  onWidgetAdd?: () => void;
  onWidgetRemove?: (widgetId: string) => void;
}

// ============================================================================
// VARIANTS
// ============================================================================

const dashboardVariants = cva(['relative w-full min-h-screen'], {
  variants: {
    variant: {
      default: 'bg-neutral-50 dark:bg-neutral-900',
      bordered: 'border border-neutral-200 dark:border-neutral-800',
      clean: 'bg-white dark:bg-neutral-950',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
});

const widgetSizeMap = {
  sm: 'col-span-1',
  md: 'col-span-1 md:col-span-2',
  lg: 'col-span-1 md:col-span-2 lg:col-span-3',
  xl: 'col-span-1 md:col-span-2 lg:col-span-4',
  full: 'col-span-full',
};

// ============================================================================
// DEFAULT LAYOUTS
// ============================================================================

const defaultLayouts: DashboardLayout[] = [
  {
    id: 'clinical',
    name: 'Clinical View',
    description: 'Optimized for clinical decision support',
    widgets: [], // To be populated from widgets prop
  },
  {
    id: 'analytics',
    name: 'Analytics View',
    description: 'Focused on data visualization and trends',
    widgets: [],
  },
  {
    id: 'minimal',
    name: 'Minimal View',
    description: 'Essential widgets only',
    widgets: [],
  },
];

// ============================================================================
// LOCAL STORAGE HELPERS
// ============================================================================

function loadLayout(storageKey: string): string[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load dashboard layout:', error);
    return null;
  }
}

function saveLayout(storageKey: string, widgetIds: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(widgetIds));
  } catch (error) {
    console.error('Failed to save dashboard layout:', error);
  }
}

function clearLayout(storageKey: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error('Failed to clear dashboard layout:', error);
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const Dashboard = React.forwardRef<HTMLDivElement, DashboardProps>(
  (
    {
      widgets: initialWidgets,
      layouts = defaultLayouts,
      defaultLayout,
      storageKey = 'dashboard-layout',
      showControls = true,
      allowCustomization = true,
      maxColumns = 4,
      gap = 6,
      onLayoutChange,
      onWidgetAdd,
      onWidgetRemove,
      variant,
      padding,
      className,
      ...props
    },
    ref
  ) => {
    // State
    const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
    const [widgetOrder, setWidgetOrder] = useState<string[]>([]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [selectedLayout, setSelectedLayout] = useState<string | null>(
      defaultLayout || null
    );

    // Initialize widget order from localStorage or default
    useEffect(() => {
      const savedOrder = loadLayout(storageKey);
      if (savedOrder && savedOrder.length > 0) {
        // Validate saved order against current widgets
        const validOrder = savedOrder.filter((id) =>
          initialWidgets.some((w) => w.id === id)
        );
        setWidgetOrder(validOrder);
      } else {
        setWidgetOrder(initialWidgets.map((w) => w.id));
      }
    }, [storageKey, initialWidgets]);

    // Sync widgets with initial widgets
    useEffect(() => {
      setWidgets(initialWidgets);
    }, [initialWidgets]);

    // Drag and drop sensors
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 8, // Prevent accidental drags
        },
      }),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    // Get ordered widgets
    const orderedWidgets = useMemo(() => {
      return widgetOrder
        .map((id) => widgets.find((w) => w.id === id))
        .filter((w): w is Widget => w !== undefined);
    }, [widgets, widgetOrder]);

    // Handle drag end
    const handleDragEnd = useCallback(
      (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setWidgetOrder((prev) => {
          const oldIndex = prev.indexOf(active.id as string);
          const newIndex = prev.indexOf(over.id as string);

          const newOrder = arrayMove(prev, oldIndex, newIndex);

          // Save to localStorage
          saveLayout(storageKey, newOrder);

          // Notify parent
          onLayoutChange?.(newOrder);

          return newOrder;
        });
      },
      [storageKey, onLayoutChange]
    );

    // Handle widget collapse
    const handleToggleCollapse = useCallback((widgetId: string) => {
      setWidgets((prev) =>
        prev.map((w) =>
          w.id === widgetId ? { ...w, collapsed: !w.collapsed } : w
        )
      );
    }, []);

    // Handle widget remove
    const handleRemoveWidget = useCallback(
      (widgetId: string) => {
        setWidgets((prev) => prev.filter((w) => w.id !== widgetId));
        setWidgetOrder((prev) => {
          const newOrder = prev.filter((id) => id !== widgetId);
          saveLayout(storageKey, newOrder);
          onLayoutChange?.(newOrder);
          return newOrder;
        });
        onWidgetRemove?.(widgetId);
      },
      [storageKey, onLayoutChange, onWidgetRemove]
    );

    // Handle layout reset
    const handleResetLayout = useCallback(() => {
      const defaultOrder = initialWidgets.map((w) => w.id);
      setWidgetOrder(defaultOrder);
      setWidgets(initialWidgets);
      clearLayout(storageKey);
      onLayoutChange?.(defaultOrder);
    }, [initialWidgets, storageKey, onLayoutChange]);

    // Handle layout switch
    const handleSwitchLayout = useCallback(
      (layoutId: string) => {
        const layout = layouts.find((l) => l.id === layoutId);
        if (!layout) return;

        setSelectedLayout(layoutId);
        // TODO: Implement layout switching logic
        // For now, just reset to default
        handleResetLayout();
      },
      [layouts, handleResetLayout]
    );

    // Handle export
    const handleExport = useCallback(() => {
      // TODO: Implement dashboard export (html2canvas)
      console.log('Export dashboard');
    }, []);

    // Handle fullscreen toggle
    const handleToggleFullscreen = useCallback(() => {
      setIsFullscreen((prev) => !prev);
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          dashboardVariants({ variant, padding }),
          isFullscreen && 'fixed inset-0 z-50 overflow-auto',
          className
        )}
        {...props}
      >
        {/* Dashboard Controls */}
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center justify-between flex-wrap gap-4"
          >
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {/* Layout selector */}
              {layouts.length > 0 && (
                <select
                  value={selectedLayout || ''}
                  onChange={(e) => handleSwitchLayout(e.target.value)}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm',
                    'bg-white dark:bg-neutral-800',
                    'border border-neutral-200 dark:border-neutral-700',
                    'text-neutral-900 dark:text-neutral-100',
                    'focus:outline-none focus:ring-2 focus:ring-brand-primary-500'
                  )}
                >
                  <option value="">Default Layout</option>
                  {layouts.map((layout) => (
                    <option key={layout.id} value={layout.id}>
                      {layout.name}
                    </option>
                  ))}
                </select>
              )}

              {allowCustomization && onWidgetAdd && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onWidgetAdd}
                  iconBefore={<Plus className="w-4 h-4" />}
                >
                  Add Widget
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleResetLayout}
                iconBefore={<RotateCcw className="w-4 h-4" />}
              >
                Reset
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                iconBefore={<Download className="w-4 h-4" />}
              >
                Export
              </Button>
            </div>
          </motion.div>
        )}

        {/* Dashboard Grid */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={widgetOrder}
            strategy={rectSortingStrategy}
          >
            <div
              className={cn(
                'grid gap-6 w-full',
                maxColumns === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
                maxColumns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                maxColumns === 2 && 'grid-cols-1 md:grid-cols-2',
                maxColumns === 1 && 'grid-cols-1'
              )}
              style={{ gap: `${gap * 4}px` }}
            >
              <AnimatePresence mode="popLayout">
                {orderedWidgets.map((widget) => {
                  const WidgetComponent = widget.component;

                  return (
                    <motion.div
                      key={widget.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        widgetSizeMap[widget.size || 'md']
                      )}
                    >
                      <Card
                        variant="outline"
                        padding="md"
                        className="h-full"
                      >
                        {/* Widget Header */}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                            {widget.title}
                          </h3>
                          <div className="flex items-center gap-1">
                            {widget.collapsible && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleToggleCollapse(widget.id)}
                                aria-label={
                                  widget.collapsed ? 'Expand' : 'Collapse'
                                }
                              >
                                {widget.collapsed ? (
                                  <Plus className="w-4 h-4" />
                                ) : (
                                  <Minus className="w-4 h-4" />
                                )}
                              </Button>
                            )}
                            {widget.removable && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveWidget(widget.id)}
                                aria-label="Remove widget"
                              >
                                ✕
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Widget Content */}
                        {!widget.collapsed && (
                          <WidgetComponent {...(widget.props || {})} />
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>

        {/* Empty State */}
        {orderedWidgets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <LayoutGrid className="w-16 h-16 text-neutral-300 dark:text-neutral-700 mb-4" />
            <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400 mb-2">
              No widgets configured
            </p>
            {onWidgetAdd && (
              <Button
                variant="outline"
                onClick={onWidgetAdd}
                iconBefore={<Plus className="w-4 h-4" />}
              >
                Add Your First Widget
              </Button>
            )}
          </motion.div>
        )}
      </div>
    );
  }
);

Dashboard.displayName = 'Dashboard';
