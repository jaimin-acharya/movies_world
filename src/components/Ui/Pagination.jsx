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
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="cursor-pointer p-2 sm:p-3 rounded-full bg-purple-600 text-white 
                   disabled:opacity-50 hover:bg-purple-700 transition"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Page Numbers */}
      {getPages().map((p, i) =>
        p === "..." ? (
          <span
            key={i}
            className="px-2 sm:px-3 text-gray-400 text-sm sm:text-base"
          >
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(p)}
            className={`cursor-pointer px-3 sm:px-4 py-1 sm:py-2 rounded-md font-medium text-sm sm:text-base transition ${
              p === page
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-800 text-gray-200 hover:bg-purple-500 hover:text-white"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="cursor-pointer p-2 sm:p-3 rounded-full bg-purple-600 text-white 
                   disabled:opacity-50 hover:bg-purple-700 transition"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

export default Pagination;
