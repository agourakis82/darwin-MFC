'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table';
import { ArrowUp, ArrowDown, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { EmptyState } from './EmptyState';

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  globalFilter?: string;
  onGlobalFilterChange?: (filter: string) => void;
  pageSize?: number;
  className?: string;
  emptyMessage?: string;
  striped?: boolean;
  hoverable?: boolean;
  dense?: boolean;
}

/**
 * Table Component - Flexible, sortable, paginated data table
 *
 * Uses TanStack Table (React Table) for powerful data manipulation.
 * Supports sorting, filtering, and pagination out of the box.
 *
 * @example
 * <Table
 *   data={medications}
 *   columns={[
 *     { accessorKey: 'name', header: 'Name' },
 *     { accessorKey: 'dosage', header: 'Dosage' }
 *   ]}
 *   pageSize={10}
 * />
 */
export function Table<TData>({
  data,
  columns,
  isLoading = false,
  sorting,
  onSortingChange,
  globalFilter,
  onGlobalFilterChange,
  pageSize = 10,
  className,
  emptyMessage = 'No data available',
  striped = true,
  hoverable = true,
  dense = false,
}: TableProps<TData>) {
  const [sortingState, setSorting] = React.useState<SortingState>(sorting || []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortingState,
    },
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(sortingState) : updater;
      setSorting(newSorting);
      onSortingChange?.(newSorting);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  table.setPageSize(pageSize);

  const rows = table.getRowModel().rows;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Table */}
      <div className="border border-neutral-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Header */}
            <thead className="bg-neutral-800 border-b border-neutral-700 sticky top-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        // Layout
                        'px-4 py-3 text-left',
                        dense && 'px-2 py-2',
                        // Styling
                        'font-semibold text-neutral-200',
                        'bg-neutral-800',
                        'border-r border-neutral-700 last:border-r-0'
                      )}
                      style={{
                        width: header.getSize(),
                      }}
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
                          {header.column.getCanSort() && (
                            <div className="text-xs opacity-50">
                              {header.column.getIsSorted() === 'desc' ? (
                                <ArrowDown className="h-4 w-4" />
                              ) : header.column.getIsSorted() === 'asc' ? (
                                <ArrowUp className="h-4 w-4" />
                              ) : (
                                <ArrowUpDown className="h-4 w-4" />
                              )}
                            </div>
                          )}
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
                  <td colSpan={columns.length} className="h-24 text-center">
                    Loading...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-4">
                    <EmptyState
                      variant="no-data"
                      title={emptyMessage}
                      size="sm"
                    />
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={cn(
                      // Styling
                      'border-b border-neutral-700 last:border-b-0',
                      striped && idx % 2 === 0 && 'bg-neutral-800/50',
                      hoverable && 'hover:bg-neutral-700/50 transition-colors'
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={cn(
                          // Layout
                          'px-4 py-3 text-neutral-200',
                          dense && 'px-2 py-2',
                          // Borders
                          'border-r border-neutral-700/50 last:border-r-0'
                        )}
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {rows.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            {table.getState().pagination.pageIndex * pageSize + 1} -{' '}
            {Math.min((table.getState().pagination.pageIndex + 1) * pageSize, rows.length)} of{' '}
            {rows.length}
          </div>

          <div className="flex gap-1">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              size="sm"
              variant="ghost"
              className="p-1"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: table.getPageCount() }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => table.setPageIndex(i)}
                  className={cn(
                    'h-8 w-8 rounded text-sm',
                    table.getState().pagination.pageIndex === i
                      ? 'bg-primary text-neutral-900 font-semibold'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              size="sm"
              variant="ghost"
              className="p-1"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

Table.displayName = 'Table';

export default Table;
