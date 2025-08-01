import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { fetchSeriesDetails, fetchSeriesEpisodes } from "../../../api/tmdb-api";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Film,
  MonitorPlay,
  Star,
} from "lucide-react";

const SeriesEpisodeList = () => {
  const { id } = useParams();
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadSeriesInfo = async () => {
    setIsLoading(true);
    try {
      const series = await fetchSeriesDetails(id);
      setSeasons([...Array(series.number_of_seasons).keys()].map((i) => i + 1));
      await loadEpisodes(series.id, 1); // Load season 1 by default
    } catch (err) {
      setError("Failed to load series data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadEpisodes = async (seriesId, seasonNumber) => {
    try {
      setIsLoading(true);
      const data = await fetchSeriesEpisodes(seriesId, seasonNumber);
      setEpisodes(data.episodes);
      setSelectedSeason(seasonNumber);
    } catch (err) {
      setError("Failed to load episodes", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return "text-green-400";
    if (rating >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    if (id) loadSeriesInfo();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        {error}
      </div>
    );
  }

  if (isLoading)
    return (
      <>
        <div className="mt-10 flex w-full min-h-[60lvh] flex-col items-center justify-center text-gray-500 space-y-2">
          <Film className="w-12 h-12" />
          <span className="text-lg">Loading Episodes...</span>
        </div>
      </>
    );

  return (
    <div className="space-y-6 mt-10 h-full text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Episodes Section */}
        {episodes.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <MonitorPlay className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />

              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Season {selectedSeason} Episodes List
              </h2>
            </div>

            <select
              value={selectedSeason}
              onChange={(e) => loadEpisodes(id, Number(e.target.value))}
              className="cursor-pointer mt-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white px-4 py-2 focus:ring-1 focus:ring-blue-400 focus:outline-none transition-all duration-200 min-w-[120px]"
            >
              {seasons.map((s) => (
                <option key={s} value={s} className="bg-gray-700">
                  Season {s}
                </option>
              ))}
            </select>

            <div className="relative group">
              {/* Left Scroll Button */}
              <button
                onClick={scrollLeft}
                className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm border border-white/10 hidden lg:flex items-center justify-center"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Episodes Container */}
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitScrollbar: { display: "none" },
                }}
              >
                {episodes.map((ep) => (
                  <div
                    key={ep.id}
                    className={`snap-start cursor-pointer mt-5 flex-shrink-0 w-80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:text-blue-400 transition-all duration-300 hover:transform hover:shadow-2xl group/card`}
                  >
                    {/* Episode Image */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden">
                      {ep.still_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${ep.still_path}`}
                          alt={ep.name}
                          className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500 space-y-2">
                          <Film className="w-12 h-12" />
                          <span className="text-sm">No Image Available</span>
                        </div>
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/10 to-transparent" />

                      {/* Episode Number Badge */}
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm  font-semibold">
                        Episode {ep.episode_number}
                      </div>

                      {/* Runtime Badge */}
                      {ep.runtime && (
                        <div
                          className={`absolute top-3 right-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1 text-sm rounded-full ${getRatingColor(
                            ep.vote_average
                          )} font-semibold`}
                        >
                          <Star className="w-3 h-3 fill-current" />
                          {ep.vote_average?.toFixed(1)}
                        </div>
                      )}
                    </div>

                    {/* Episode Info */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-semibold text-white line-clamp-1 group-hover/card:text-white-400 transition-colors duration-200">
                        {ep.name}
                      </h3>

                      <div className="flex flex-row justify-between">
                        {ep.air_date && (
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            {new Date(ep.air_date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        )}

                        {ep.runtime && (
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            {ep.runtime}m
                          </div>
                        )}
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {ep.overview || "No description available."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Scroll Button */}
              <button
                onClick={scrollRight}
                className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm border border-white/10 hidden lg:flex items-center justify-center"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        )}

        {/* Empty State */}
        {episodes.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/50 rounded-full mb-4">
              <Film className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No Episodes Found
            </h3>
            <p className="text-gray-500">
              No episodes available for this season.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeriesEpisodeList;
