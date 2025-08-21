import { NavLink } from "react-router";

const HomeCard = ({
  movie: {
    name,
    title,
    vote_average,
    poster_path,
    first_air_date,
    release_date,
    id,
    media_type,
  },
}) => {
  const routeType = media_type || (first_air_date ? "tv" : "movie");
  // console.log("Rendering:", title || name, "Type:", media_type);
  return (
    <NavLink to={`/${routeType}/${id}`}>
      <div className="movie-card relative w-[180px] sm:w-[200px] sm:h-[380px] ">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt={!title ? name : "Movie"}
          className="w-full h-auto rounded-sm"
        />
        <div className="mt-4 p-1">
          <h3 className="mb-6 sm:mb-5 hidden sm:block">
            {!title ? name : title}
          </h3>

          <div className="content flex justify-between items-center">
            <div className="absolute rating top-2 right-2 sm:top-3 sm:right-3 bg-[#0f0d234f] py-1 px-2 rounded-md backdrop-blur-md">
              <img src="star.svg" alt="STAR ICON" />
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>

            <p className="year mb-0">
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

export default HomeCard;
