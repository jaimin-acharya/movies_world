import { useEffect, useState } from "react";
import { fetchSeriesReviews } from "../../api/tmdb-api";
import { useParams } from "react-router";
import Spinner from "./Spinner";
import { Film, MessageCircle, Star } from "lucide-react";

const SeriesReview = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const loadMovieAllData = async () => {
    setIsLoading(true);
    try {
      const reviewData = await fetchSeriesReviews(id);

      setReviews(reviewData.results.slice(0, 3));
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
      {reviews.length > 0 && (
        <section className="mt-5 p-3">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
            <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
            User Reviews
          </h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
                      {review.author?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-white">
                        {review.author}
                      </h4>
                      <p className="text-xs text-gray-400">Verified Reviewer</p>
                    </div>
                  </div>
                  {review.author_details?.rating && (
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-medium">
                        {review.author_details.rating}/10
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {truncateText(review.content, 300)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default SeriesReview;
