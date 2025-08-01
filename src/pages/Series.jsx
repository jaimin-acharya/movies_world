import { Suspense, useEffect, useState } from "react";
import { updateSearchCount } from "../appwrite";
import Spinner from "../components/Ui/Spinner";
import { fetchSeriesFromTMDB } from "../api/tmdb-api";
import SeriesCard from "../components/Ui/SeriesCard";
import SearchBar from "../components/Ui/SearchBar";
import { MovieGridSkeleton } from "../components/Ui/Skeleton";
import Pagination from "../components/Ui/Pagination";
import { useSearchParams } from "react-router";

const Series = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = (term) => {
    setSearchParams({ search: term, page: 1 });
  };

  const loadTVSeries = async (query, pageNumber = 1) => {
    setIsLoading(true);
    setError("");
    try {
      const { results, totalPages } = await fetchSeriesFromTMDB(
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
    loadTVSeries(search, page);
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
        {search ? "Your Searched Results" : "Recomended TV Series"}
      </h2>
      {isLoading ? (
        <MovieGridSkeleton />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <ul>
          {movies.slice(0, 12).map((movie) => (
            <>
              <Suspense fallback={<Spinner />}>
                <SeriesCard key={movie.id} movie={movie} />
              </Suspense>
            </>
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

export default Series;
