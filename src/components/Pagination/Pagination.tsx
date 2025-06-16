import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          currentPage === 1
            ? "bg-primary-gold text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}>
        1
      </button>
    );

    if (currentPage > 3) {
      pages.push(
        <span key="dots-1" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    // Show current page and surrounding pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i <= currentPage + 1 && i >= currentPage - 1) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              currentPage === i
                ? "bg-[#C2B280] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}>
            {i}
          </button>
        );
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="dots-2" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            currentPage === totalPages
              ? "bg-[#C2B280] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent">
        <ChevronLeft className="w-4 h-4" />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
