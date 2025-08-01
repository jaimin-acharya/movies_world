import { useEffect, useRef, useState } from "react";
import { fetchSimilarSeries } from "../../api/tmdb-api";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Spinner from "./Spinner";
import { ChevronLeft, ChevronRight, Film } from "lucide-react";

const SeriesSimilar = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [similar, setSimilar] = useState([]);
  const [error, setError] = useState("");

  const loadMovieAllData = async () => {
    setIsLoading(true);
    try {
      const similarData = await fetchSimilarSeries(id);
      setSimilar(similarData.results.slice(0, 10));
    } catch (err) {
      setError("Failed to load movie details. Please try again.", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadMovieAllData();
  }, [id]);

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
  }, [similar]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-6">
        <div className="text-center">
          <Film className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {similar.length > 0 && (
        <section className="home-movies mt-5 p-3">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
            <Film className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            You Might Also Like
           
          </h2>

          <div className="relative">
            {/* Left Scroll Button */}
            <button
              onClick={scrollLeft}
              className="cursor-pointer hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            >
              <ChevronLeft />
            </button>

            {/* Movie List */}
            <ul
              ref={scrollRef}
              className="flex gap-5 sm:gap-10 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar sm:px-2"
            >
              {similar.map((movie) => (
                <div key={movie.id} className="home-card group cursor-pointer">
                  <NavLink to={`/tv/${movie.id}`}>
                    <li className="movie-card relative w-[180px] h-full sm:w-[200px] sm:h-[380px] ">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : "/no-movie.png"
                        }
                        alt={!movie.title ? movie.name : "Movie"}
                        className="w-full h-auto rounded-sm"
                      />
                      <div className="mt-4 p-1">
                        <h3 className="mb-6 sm:mb-5 hidden sm:block">
                          {!movie.title ? movie.name : movie.title}
                        </h3>

                        <div className="content  ">
                          <div className="rating top-2 right-2 sm:top-3 sm:right-3 bg-[#0f0d234f] py-1 px-2 rounded-md backdrop-blur-md">
                            <img src="/star.svg" alt="STAR ICON" />
                            <p>
                              {movie.vote_average
                                ? movie.vote_average.toFixed(1)
                                : "N/A"}
                            </p>
                          </div>

                          <p className="year mb-0 ">
                            {movie.release_date?.split("-")[0] ||
                              movie.first_air_date?.split("-")[0] ||
                              "N/A"}
                          </p>
                        </div>
                      </div>
                    </li>
                  </NavLink>
                </div>
              ))}
            </ul>

            {/* Right Scroll Button */}
            <button
              onClick={scrollRight}
              className="cursor-pointer hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            >
              <ChevronRight />
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default SeriesSimilar;
