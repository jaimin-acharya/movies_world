import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchAiringTodaySeriesFromTMDB } from "../../../api/tmdb-api";
import HomeCard from "../HomeCard";
import { PopularCarouselSkeleton } from "../Skeleton";

const AiringTodaySeries = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const LoadAiringTodaySeries = async () => {
    setIsLoading(true);
    setError("");
    try {
      const results = await fetchAiringTodaySeriesFromTMDB();
      setMovies(results);
    } catch {
      setError("Failed to load movies. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    LoadAiringTodaySeries();
  }, []);

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [movies]);

  return (
    <>
      <section className="home-movies mt-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Airing Today TV Series
        </h2>

        {isLoading ? (
          <PopularCarouselSkeleton />
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="relative">
            {/* Scroll buttons (desktop only) */}
            <button
              onClick={scrollLeft}
              className="cursor-pointer hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            >
              <ChevronLeft />
            </button>

            <ul ref={scrollRef}>
              {movies.map((movie) => (
                <li key={movie.id}>
                  <HomeCard movie={movie} />
                </li>
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
    </>
  );
};

export default AiringTodaySeries;
