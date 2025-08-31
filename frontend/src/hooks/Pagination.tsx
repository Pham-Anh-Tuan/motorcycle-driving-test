import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const MAX_PAGE_DISPLAY = 5;

  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= MAX_PAGE_DISPLAY) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      pages.push(0); // always show first page

      const start = Math.max(currentPage - 1, 1);
      const end = Math.min(currentPage + 1, totalPages - 2);

      if (start > 1) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 2) pages.push("...");
      
      pages.push(totalPages - 1); // always show last page
    }

    return pages;
  };

  const pageItems = generatePageNumbers();

  const handlePrevious = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
  };

  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal border border-gray-300 py-2 px-3">
        Trang {currentPage + 1} / {totalPages}
      </span>

      <ul className="inline-flex items-stretch -space-x-px">
        {/* Previous */}
        <li>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="flex items-center justify-center h-full py-1.5 px-2 ml-0 text-gray-500 bg-white rounded-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>

        {/* Page numbers with ... */}
        {pageItems.map((item, index) => (
          <li key={index}>
            {item === "..." ? (
              <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(item as number)}
                className={`flex items-center justify-center text-sm py-2 px-3 leading-tight border ${
                  currentPage === item
                    ? "text-blue-600 bg-blue-50 border-blue-300"
                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {Number(item) + 1}
              </button>
            )}
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="flex items-center justify-center h-full py-1.5 px-2 rounded-sm text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;