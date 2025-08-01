import { useEffect, useState } from "react";
import { fetchSeriesVideos } from "../../../api/tmdb-api";
import { useParams } from "react-router";
import Spinner from "../Spinner";
import { Film, Play } from "lucide-react";

const SeriesTrailer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [error, setError] = useState("");

  const loadMovieAllData = async () => {
    setIsLoading(true);
    try {
      const videoData = await fetchSeriesVideos(id);

      setTrailer(
        videoData.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        )
      );
    } catch (err) {
      setError("Failed to load movie details. Please try again.", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (id) loadMovieAllData();
  }, [id]);

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
      {trailer && (
        <section className="p-3">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
            <Play className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            Watch Trailer
            
          </h2>
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&rel=0&showinfo=0`}
              title="Movie Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </>
  );
};

export default SeriesTrailer;
