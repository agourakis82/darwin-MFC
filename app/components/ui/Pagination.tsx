import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPageOptions?: number[];
  itemsPerPage?: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  totalItems?: number;
  disabled?: boolean;
  showPageSize?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPageOptions = [10, 25, 50, 100],
  itemsPerPage = 10,
  onItemsPerPageChange,
  totalItems,
  disabled = false,
  showPageSize = true,
}: PaginationProps) {
  const getPageNumbers = () => {
    const delta = 2;
    const pages: (number | string)[] = [];

    // First page
    pages.push(1);

    // Ellipsis before current page
    if (currentPage - delta > 2) {
      pages.push('...');
    }

    // Pages around current page
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      pages.push(i);
    }

    // Ellipsis after current page
    if (currentPage + delta < totalPages - 1) {
      pages.push('...');
    }

    // Last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(Math.max(1, Math.min(page, totalPages)));
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-neutral-700 rounded-lg bg-neutral-900">
      {/* Items per page selector */}
      {showPageSize && onItemsPerPageChange && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-neutral-400">Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
            disabled={disabled}
            className="px-3 py-1 text-sm bg-neutral-800 text-neutral-200 border border-neutral-600 rounded hover:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Info text */}
      {totalItems && (
        <div className="text-sm text-neutral-400">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
        </div>
      )}

      {/* Pagination buttons */}
      <div className="flex items-center gap-1">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          className="p-2 text-neutral-400 hover:text-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page numbers */}
        {pageNumbers.map((page, idx) => (
          <button
            key={`${page}-${idx}`}
            onClick={() => handlePageClick(page)}
            disabled={disabled || page === '...'}
            className={`min-w-[40px] h-10 rounded transition-colors ${
              page === currentPage
                ? 'bg-primary text-neutral-900 font-semibold'
                : page === '...'
                  ? 'text-neutral-400 cursor-default hover:text-neutral-200'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page === '...' ? <MoreHorizontal size={16} className="mx-auto" /> : page}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          className="p-2 text-neutral-400 hover:text-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Page input (optional) */}
      <div className="hidden lg:flex items-center gap-2">
        <span className="text-sm text-neutral-400">Go to:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          defaultValue={currentPage}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const page = parseInt((e.target as HTMLInputElement).value);
              handlePageClick(page);
            }
          }}
          disabled={disabled}
          className="w-12 px-2 py-1 text-sm bg-neutral-800 text-neutral-200 border border-neutral-600 rounded hover:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
      </div>
    </div>
  );
}
