import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ onPageChange, page, totalPages }) => {
  return (
    <>
      <div className="flex justify-center items-center gap-20 mt-20">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-2 font-bold sm:text-lg cursor-pointer px-4 py-2 bg-purple-500 backdrop-blur-sm  text-white rounded-sm disabled:opacity-50 transition-all duration-300 ease-in-out hover:scale-102"
        >
          <ChevronLeft  />
          Previous Page
        </button>
        {/* <span className="text-md text-white">Page: {page}</span> */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-2  font-bold sm:text-lg cursor-pointer px-4 py-2 bg-purple-500 backdrop-blur-sm text-white rounded-sm disabled:opacity-50 transition-all duration-300 ease-in-out hover:scale-102"
        >
          Next Page
          <ChevronRight />
        </button>
      </div>
    </>
  );
};

export default Pagination;
