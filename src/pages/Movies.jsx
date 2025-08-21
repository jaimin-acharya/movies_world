import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesFromTMDB } from "../api/tmdb-api";
import MovieCard from "../components/Ui/Movies/MovieCard";
import Spinner from "../components/Ui/Spinner";
import { updateSearchCount } from "../appwrite";
import SearchBar from "../components/Ui/SearchBar";
import { MovieGridSkeleton } from "../components/Ui/Skeleton";
import Pagination from "../components/Ui/Pagination";

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  const [searchTerm, setSearchTerm] = useState(search);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = (term) => {
    setSearchParams({ search: term, page: 1 });
  };

  const loadMovies = async (query, pageNumber = 1) => {
    setIsLoading(true);
    setError("");
    try {
      const { results, totalPages } = await fetchMoviesFromTMDB(
        query,
        pageNumber
      );
      setMovies(results);
      setTotalPages(totalPages);
      if (query && results.length > 0) {
        await updateSearchCount(query, results[0]);
      }
    } catch {
      setError("Failed to load movies. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(search, page);
  }, [search, page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ search, page: newPage });
  };

  return (
    <section className="all-movies mt-5">
      <SearchBar
        searchMovie={searchTerm}
        setSearchMovie={setSearchTerm}
        onSearch={handleSearch}
      />

      <h2 className="mt-10">
        {search ? "Your Searched Results" : "Recommended Movies"}
      </h2>

      {isLoading ? (
        <MovieGridSkeleton />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Suspense key={movie.id} fallback={<Spinner />}>
              <MovieCard movie={movie} />
            </Suspense>
          ))}
        </ul>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default Movies;
