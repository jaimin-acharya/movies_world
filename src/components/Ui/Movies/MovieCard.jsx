import { NavLink } from "react-router-dom";

const MovieCard = ({
  movie: {
    title,
    vote_average,
    poster_path,
    first_air_date,
    release_date,
    id,
  },
}) => {
  return (
    <NavLink to={`/movie/${id}`}>
      <div className="movie-card relative w-full h-auto">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt={title}
          className="w-full h-auto rounded-sm"
        />
        <div className="mt-4 p-1">
          <h3 className="mb-6 sm:mb-5">{title}</h3>

          <div className="content">
            <div className="rating top-2 right-2 sm:top-3 sm:right-3 bg-[#0f0d234f] py-1 px-2 rounded-md backdrop-blur-md">
              <img src="star.svg" alt="STAR ICON" />
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>

            <p className="year">
              {release_date?.split("-")[0] ||
                first_air_date?.split("-")[0] ||
                "N/A"}
            </p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default MovieCard;
