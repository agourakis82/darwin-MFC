'use client';

import * as React from 'react';
import { ChevronRight, ChevronDown, Folder, FileText, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  selectable?: boolean;
}

export interface TreeViewProps {
  nodes: TreeNode[];
  selectedIds?: string[];
  expandedIds?: string[];
  onSelect?: (id: string) => void;
  onToggleExpand?: (id: string) => void;
  onMultiSelect?: (ids: string[]) => void;
  multiSelect?: boolean;
  searchFilter?: string;
  className?: string;
  defaultExpanded?: boolean;
}

/**
 * TreeView Component - Hierarchical data visualization
 *
 * Perfect for:
 * - Medical code hierarchies (ICD-10, CIAP-2, ATC)
 * - Disease categories and subcategories
 * - Medication classifications
 *
 * @example
 * <TreeView
 *   nodes={medicalCodes}
 *   multiSelect
 *   selectedIds={selected}
 *   onMultiSelect={setSelected}
 *   searchFilter={search}
 * />
 */
export const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      nodes,
      selectedIds = [],
      expandedIds: initialExpandedIds = [],
      onSelect,
      onToggleExpand,
      onMultiSelect,
      multiSelect = false,
      searchFilter = '',
      className,
      defaultExpanded = false,
    },
    ref
  ) => {
    const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
      new Set(initialExpandedIds || (defaultExpanded ? getAllNodeIds(nodes) : []))
    );

    const handleToggleExpand = (id: string) => {
      const newExpanded = new Set(expandedIds);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      setExpandedIds(newExpanded);
      onToggleExpand?.(id);
    };

    const handleSelect = (id: string, event?: React.MouseEvent) => {
      if (multiSelect && event?.ctrlKey) {
        const newSelected = selectedIds.includes(id)
          ? selectedIds.filter((sid) => sid !== id)
          : [...selectedIds, id];
        onMultiSelect?.(newSelected);
      } else {
        onSelect?.(id);
      }
    };

    const isNodeVisible = (node: TreeNode): boolean => {
      if (!searchFilter) return true;
      const match = node.label.toLowerCase().includes(searchFilter.toLowerCase());
      if (match) return true;
      if (node.children) {
        return node.children.some((child) => isNodeVisible(child));
      }
      return false;
    };

    return (
      <div ref={ref} className={cn('space-y-1', className)}>
        {nodes.map((node) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            level={0}
            expandedIds={expandedIds}
            selectedIds={selectedIds}
            onToggleExpand={handleToggleExpand}
            onSelect={handleSelect}
            searchFilter={searchFilter}
            isVisible={isNodeVisible(node)}
            multiSelect={multiSelect}
          />
        ))}
      </div>
    );
  }
);
TreeView.displayName = 'TreeView';

interface TreeNodeComponentProps {
  node: TreeNode;
  level: number;
  expandedIds: Set<string>;
  selectedIds: string[];
  onToggleExpand: (id: string) => void;
  onSelect: (id: string, event?: React.MouseEvent) => void;
  searchFilter: string;
  isVisible: boolean;
  multiSelect: boolean;
}

function TreeNodeComponent({
  node,
  level,
  expandedIds,
  selectedIds,
  onToggleExpand,
  onSelect,
  searchFilter,
  isVisible,
  multiSelect,
}: TreeNodeComponentProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedIds.includes(node.id);

  if (!isVisible) return null;

  return (
    <div className="space-y-1">
      {/* Node */}
      <div
        className={cn(
          // Layout
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'cursor-pointer select-none',
          // Styling
          'hover:bg-neutral-700 transition-colors',
          isSelected && 'bg-primary/20 ring-1 ring-primary',
          node.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
          // Indentation
          level > 0 && `ml-${Math.min(level * 3, 12)}`
        )}
        style={{
          marginLeft: `${Math.min(level * 16, 48)}px`,
        }}
        onClick={(e) => {
          e.preventDefault();
          if (!node.disabled) {
            onSelect(node.id, e);
          }
        }}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-disabled={node.disabled}
      >
        {/* Expand/Collapse Button */}
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(node.id);
            }}
            className={cn(
              'p-1 rounded hover:bg-neutral-600 transition-colors',
              'flex items-center justify-center flex-shrink-0',
              'h-5 w-5 text-neutral-400'
            )}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <div className="w-5" />
        )}

        {/* Icon */}
        {node.icon ? (
          <div className="flex-shrink-0 text-neutral-400">{node.icon}</div>
        ) : hasChildren ? (
          <Folder className="h-4 w-4 flex-shrink-0 text-neutral-400" />
        ) : (
          <FileText className="h-4 w-4 flex-shrink-0 text-neutral-400" />
        )}

        {/* Checkbox (if multi-select) */}
        {multiSelect && (
          <div className="flex items-center justify-center h-4 w-4 rounded border border-neutral-600 bg-neutral-700 flex-shrink-0">
            {isSelected && <Check className="h-3 w-3 text-primary font-bold" />}
          </div>
        )}

        {/* Label */}
        <span className="text-sm text-neutral-200 flex-1 truncate">{node.label}</span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              expandedIds={expandedIds}
              selectedIds={selectedIds}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
              searchFilter={searchFilter}
              isVisible={true}
              multiSelect={multiSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function getAllNodeIds(nodes: TreeNode[]): string[] {
  const ids: string[] = [];
  const traverse = (nodes: TreeNode[]) => {
    nodes.forEach((node) => {
      ids.push(node.id);
      if (node.children) {
        traverse(node.children);
      }
    });
  };
  traverse(nodes);
  return ids;
}

export default TreeView;
