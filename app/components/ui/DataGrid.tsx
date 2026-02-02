'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  useReactTable,
  SortingState,
  ExpandedState,
} from '@tanstack/react-table';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Table } from './Table';

export interface DataGridProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  groupBy?: string[];
  expandedGroups?: ExpandedState;
  onExpandedChange?: (expanded: ExpandedState) => void;
  pageSize?: number;
  className?: string;
  emptyMessage?: string;
  striped?: boolean;
  hoverable?: boolean;
  dense?: boolean;
  enableGrouping?: boolean;
  enableExpanding?: boolean;
}

/**
 * DataGrid Component - Advanced data grid with grouping, expanding, and inline features
 *
 * Extends Table with:
 * - Row grouping and aggregation
 * - Expandable row groups
 * - Hierarchical data display
 *
 * @example
 * <DataGrid
 *   data={medications}
 *   columns={columns}
 *   enableGrouping
 *   groupBy={['class']}
 *   enableExpanding
 * />
 */
export function DataGrid<TData>({
  data,
  columns,
  isLoading = false,
  sorting,
  onSortingChange,
  groupBy,
  expandedGroups,
  onExpandedChange,
  pageSize = 10,
  className,
  emptyMessage = 'No data available',
  striped = true,
  hoverable = true,
  dense = false,
  enableGrouping = false,
  enableExpanding = false,
}: DataGridProps<TData>) {
  const [sortingState, setSorting] = React.useState<SortingState>(sorting || []);
  const [expanded, setExpanded] = React.useState<ExpandedState>(expandedGroups || {});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortingState,
      expanded,
    },
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(sortingState) : updater;
      setSorting(newSorting);
      onSortingChange?.(newSorting);
    },
    onExpandedChange: (updater) => {
      const newExpanded = typeof updater === 'function' ? updater(expanded) : updater;
      setExpanded(newExpanded);
      onExpandedChange?.(newExpanded);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...(enableGrouping && { getGroupedRowModel: getGroupedRowModel() }),
    ...(enableExpanding && { getExpandedRowModel: getExpandedRowModel() }),
  });

  table.setPageSize(pageSize);

  const rows = table.getRowModel().rows;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* DataGrid */}
      <div className="border border-neutral-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Header */}
            <thead className="bg-neutral-800 border-b border-neutral-700 sticky top-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {enableExpanding && (
                    <th className={cn('px-2 py-3 text-left', dense && 'px-1 py-2', 'w-8')} />
                  )}
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        'px-4 py-3 text-left',
                        dense && 'px-2 py-2',
                        'font-semibold text-neutral-200',
                        'bg-neutral-800',
                        'border-r border-neutral-700 last:border-r-0'
                      )}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center gap-2 hover:text-neutral-100'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Body */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + (enableExpanding ? 1 : 0)} className="h-24 text-center">
                    Loading...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (enableExpanding ? 1 : 0)} className="p-4">
                    <div className="text-center text-sm text-neutral-400">{emptyMessage}</div>
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <React.Fragment key={row.id}>
                    <tr
                      className={cn(
                        'border-b border-neutral-700 last:border-b-0',
                        striped && idx % 2 === 0 && 'bg-neutral-800/50',
                        hoverable && 'hover:bg-neutral-700/50 transition-colors',
                        row.getIsGrouped() && 'bg-neutral-800 font-semibold'
                      )}
                    >
                      {enableExpanding && (
                        <td className={cn('px-2 py-3', dense && 'px-1 py-2', 'text-center')}>
                          {row.getCanExpand() ? (
                            <button
                              onClick={row.getToggleExpandedHandler()}
                              className="p-1 hover:bg-neutral-700 rounded transition-colors"
                              aria-label={row.getIsExpanded() ? 'Collapse' : 'Expand'}
                            >
                              {row.getIsExpanded() ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                          ) : null}
                        </td>
                      )}
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={cn(
                            'px-4 py-3 text-neutral-200',
                            dense && 'px-2 py-2',
                            'border-r border-neutral-700/50 last:border-r-0'
                          )}
                          style={{ width: cell.column.getSize() }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>

                    {row.getIsExpanded() && (
                      <tr className="bg-neutral-800/25">
                        <td colSpan={columns.length + (enableExpanding ? 1 : 0)} className="px-4 py-3">
                          {/* Expandable content - customize as needed */}
                          <div className="text-sm text-neutral-300">
                            {/* Render sub-content here */}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {rows.length > 0 && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-400">
            {table.getState().pagination.pageIndex * pageSize + 1} –{' '}
            {Math.min((table.getState().pagination.pageIndex + 1) * pageSize, rows.length)} of{' '}
            {rows.length}
          </span>
        </div>
      )}
    </div>
  );
}

DataGrid.displayName = 'DataGrid';

export default DataGrid;
