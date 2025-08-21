import { useState } from "react";
import {
  Star,
  Calendar,
  Globe,
  Film,
  ArrowLeft,
  Clock,
  Heart,
} from "lucide-react";
import { useLoaderData } from "react-router";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../UseWishList";

const MovieDetailsHero = () => {
  const movieData = useLoaderData();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);

  const { isInWishlist, addToWishlist } = useWishlist(movieData?.id);

  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/", { replace: true }); // go to homepage or listing page
    }
  };

  const {
    title,
    vote_average,
    poster_path,
    overview,
    release_date,
    original_language,
    genres,
    backdrop_path,
    runtime,
  } = movieData || {};

  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return "text-green-400";
    if (rating >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  const truncateText = (text, maxLength = 200) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="mt-10 px-2 sm:p-0 h-full rounded-lg text-white">
      <div className="relative w-full min-h-[600px] rounded-lg overflow-hidden">
        {/* Background Image */}
        <div className="absolute">
          {backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
              alt="Backdrop"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]"></div>
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/70 to-transparent" />
        </div>

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => handleGoBack()}
            className="cursor-pointer flex items-center gap-2 bg-[#0f0d234f] rounded-md backdrop-blur-md hover:bg-black/50 text-white px-3 py-1.5 text-sm sm:text-base transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
        <div className="absolute top-4 right-4 z-20">
          {!isInWishlist ? (
            <button
              onClick={() => addToWishlist(movieData)}
              className="cursor-pointer flex items-center gap-2 bg-[#0f0d234f] rounded-md backdrop-blur-md hover:bg-black/50 text-white px-3 py-1.5 text-sm sm:text-base transition-all duration-300"
            >
              <Heart className="w-4 h-4" />
              Add to Wishlist
            </button>
          ) : (
            <button
              disabled
              className="cursor-default flex items-center gap-2 bg-[#0f0d234f] rounded-md backdrop-blur-md text-white px-3 py-1.5 text-sm sm:text-base transition-all duration-300"
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              Added to Wishlist
            </button>
          )}
        </div>

        {/* Content Container */}

        <div className="mt-20 sm:mt-10 relative z-10 h-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10">
            {/* Poster */}
            <div className="flex-shrink-0">
              {!imageLoaded && (
                <div className="w-48 h-72 sm:w-64 sm:h-96 bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
              )}
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : "/api/placeholder/400/600"
                }
                alt={title}
                className={`w-48 h-72 sm:w-64 sm:h-96 object-cover rounded-lg shadow-2xl transition duration-300 transform hover:brightness-85 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>

            {/* Movie Details */}
            <div className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left max-w-none lg:max-w-2xl">
              {/* Title */}
              <h1 className="text-white text-center lg:text-left text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                {title}
              </h1>

              {/* Metadata Pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                <div
                  className={`flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full ${getRatingColor(
                    vote_average
                  )} font-semibold`}
                >
                  <Star className="w-4 h-4 fill-current" />
                  <span>{vote_average?.toFixed(1)}</span>
                </div>

                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(release_date).getDate()}{" "}
                    {new Date(release_date).toLocaleString("default", {
                      month: "long",
                    }).slice(0, 3)}{" "}
                    {new Date(release_date).getFullYear()}
                  </span>
                </div>

                {runtime && (
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{formatRuntime(runtime)}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full text-gray-300">
                  <Globe className="w-4 h-4" />
                  <span>{original_language?.toUpperCase()}</span>
                </div>
              </div>

              {/* Genres */}
              {genres && genres.length > 0 && (
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-white/20 transition-colors"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}

              {overview && (
                <div className="space-y-5 p-3 flex-row justify-start align-center text-left bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                  <h2>Description:</h2>
                  <p className="text-base text-justify sm:text-lg lg:text-xl text-gray-200 leading-relaxed">
                    {showFullOverview ? overview : truncateText(overview, 150)}
                    {overview.length > 150 && (
                      <button
                        onClick={() => setShowFullOverview(!showFullOverview)}
                        className="text-blue-400 hover:text-blue-300 pl-1 font-medium text-sm sm:text-base underline decoration-2 underline-offset-2 transition-colors"
                      >
                        {showFullOverview ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsHero;
