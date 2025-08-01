import { useEffect, useRef, useState } from "react";
import { getTrendingMovies } from "../../appwrite";
import TrendingMoviesCard from "./Movies/TrendingMoviesCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TrendingMoviesSeries = () => {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTrending = async () => {
    setIsLoading(true);
    setError("");
    try {
      const results = await getTrendingMovies();
      setTrending(results);
    } catch (err) {
      console.error("Error loading trending:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTrending();
  }, []);

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <>
      {trending.length > 0 && (
        <section className="trending mt-10 relative">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-1 text-white">
            Top Searched Movies & Series
          </h2>

          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="relative">
              {/* Scroll Buttons - shown only on md+ */}
              <button
                onClick={scrollLeft}
                className="cursor-pointer hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              >
                <ChevronLeft />
              </button>

              <ul
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth px-2 "
              >
                {trending.map((movie, index) => (
                  <TrendingMoviesCard
                    key={movie.$id}
                    movie={movie}
                    index={index}
                  />
                ))}
              </ul>

              <button
                onClick={scrollRight}
                className="cursor-pointer hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default TrendingMoviesSeries;
