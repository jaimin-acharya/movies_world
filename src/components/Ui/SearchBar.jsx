const SearchBar = ({ searchMovie, setSearchMovie, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchMovie);
    }
  };

  const handleClick = () => {
    onSearch(searchMovie);
  };

  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="search" />
        <input
          type="text"
          placeholder="What Are You Looking For?...."
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={handleClick}
          className="cursor-pointer px-4 py-2 bg-[#ac8bffe8] rounded-sm
          text-white font-semibold transition-all duration-300 ease-in-out hover:scale-105"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
