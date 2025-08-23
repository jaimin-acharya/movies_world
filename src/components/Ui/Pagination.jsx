import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ onPageChange, page, totalPages }) => {
  // Generate page numbers with "..." when needed
  const getPages = () => {
    const delta = 2;
    const range = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      range.unshift("...");
    }
    if (page + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="group flex items-center gap-1.5 px-3 py-2.5 xs:px-4 xs:py-3 sm:px-4 sm:py-2.5 
               rounded-lg bg-purple-600 text-white text-sm xs:text-sm sm:text-base
               disabled:opacity-40 disabled:cursor-not-allowed
               hover:bg-purple-700 hover:shadow-lg hover:scale-105
               active:scale-95
               transition-all duration-200 ease-out min-h-[44px]"
      >
        <ChevronLeft className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
        <span className="hidden xs:inline">Previous</span>
        <span className="xs:hidden">Prev</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5 xs:gap-2">
        {getPages().map((p, i) =>
          p === "..." ? (
            <span
              key={i}
              className="px-2 text-gray-400 text-sm xs:text-sm sm:text-base select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={i}
              onClick={() => onPageChange(p)}
              className={`relative min-w-[40px] xs:min-w-[44px] sm:min-w-[44px] 
                     h-10 xs:h-11 sm:h-10 px-2 xs:px-3 sm:px-3
                     rounded-lg font-medium text-sm xs:text-sm sm:text-base
                    
                     transition-all duration-200 ease-out ${
                       p === page
                         ? "bg-purple-600 text-white scale-105"
                         : "bg-dark-100 text-gray-200 hover:bg-purple-500 hover:text-white hover:shadow-md hover:scale-105 active:scale-95"
                     }`}
            >
              {p}
              {p === page && (
                <div className="absolute inset-0 bg-purple-400 rounded-lg opacity-20 animate-pulse" />
              )}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="group flex items-center gap-1.5 px-3 py-2.5 xs:px-4 xs:py-3 sm:px-4 sm:py-2.5 
               rounded-lg bg-purple-600 text-white text-sm xs:text-sm sm:text-base
               disabled:opacity-40 disabled:cursor-not-allowed
               hover:bg-purple-700 hover:shadow-lg hover:scale-105
               active:scale-95
               transition-all duration-200 ease-out min-h-[44px]"
      >
        <span className="hidden xs:inline">Next</span>
        <span className="xs:hidden">Next</span>
        <ChevronRight className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};

export default Pagination;
