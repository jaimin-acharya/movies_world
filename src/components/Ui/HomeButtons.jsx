import { Clapperboard, TvMinimalPlay } from "lucide-react";
const HomeButtons = ({ activeTab, setActiveTab }) => {
  const baseClass =
    "cursor-pointer bg-[#0f0d23] flex items-center justify-center gap-2 px-7 py-2 sm:px-6 sm:py-2.5 rounded-lg font-medium transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-purple-400";

  const activeClass = "bg-[#0f0d23] text-white shadow-md scale-105";
  const inactiveClass = "bg-[#0f0d23] text-gray-300  hover:scale-105";

  return (
    <>
      <h2 className="text-center text-gray-300 mt-10">Featured Content</h2>
      <div className="flex items-center justify-center gap-4 mt-3">
        <button
          onClick={() => setActiveTab("movies")}
          className={`${baseClass} ${
            activeTab === "movies" ? activeClass : inactiveClass
          }`}
        >
          <Clapperboard className="w-4 h-4" />
          <p>Movies</p>
        </button>
        <button
          onClick={() => setActiveTab("series")}
          className={`${baseClass} ${
            activeTab === "series" ? activeClass : inactiveClass
          }`}
        >
          <TvMinimalPlay className="w-4 h-4" />
          <p>Series</p>
        </button>
      </div>
    </>
  );
};

export default HomeButtons;
