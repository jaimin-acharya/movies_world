import { useEffect, useRef, useState } from "react";
import { fetchSeriesCredits } from "../../../api/tmdb-api";
import { useParams } from "react-router";
import Spinner from "../Spinner";
import { ChevronLeft, ChevronRight, Film, Users, User } from "lucide-react";

const SeriesCast = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState("");

  const loadMovieAllData = async () => {
    setIsLoading(true);
    try {
      const creditData = await fetchSeriesCredits(id);

      setCast(creditData.cast.slice(0, 8));
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
    <Spinner />;
  }

  return (
    <>
      {cast.length > 0 && (
        <section className="p-2 mt-5">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
            Featured Cast
          </h2>
          <div className="relative">
            <button
              onClick={scrollLeft}
              className="cursor-pointer hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            >
              <ChevronLeft />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-3 sm:gap-12 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar sm:px-2"
            >
              {cast.map((actor) => (
                <div key={actor.id} className="group cursor-pointer">
                  <div className="relative w-28 h-28 sm:w-48 sm:h-48 mx-auto mb-3">
                    {/* Loading skeleton */}
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-gray-800 rounded-full animate-pulse flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-500" />
                      </div>
                    )}

                    {/* Actor image */}
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "/no-movie.png"
                      }
                      alt={`${actor.name} as ${actor.character}`}
                      className={`w-full h-full rounded-full object-cover transition-all duration-500 ease-out
          ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          group-hover:scale-100 group-hover:opacity-70 `}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageLoaded(true)}
                      loading="lazy"
                    />

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 via-transparent to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  {/* Actor info */}
                  <div className="text-center space-y-1">
                    <h3
                      className="font-semibold text-white text-sm sm:text-base leading-tight
                     transition-colors duration-300 line-clamp-2"
                    >
                      {actor.name}
                    </h3>
                    <p
                      className="text-gray-400 text-xs sm:text-sm line-clamp-2 group-hover:text-gray-300 
                    transition-colors duration-300"
                    >
                      {actor.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>

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

export default SeriesCast;
