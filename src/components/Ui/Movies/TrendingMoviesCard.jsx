const TrendingMoviesCard = ({ movie, index }) => {
  return (
    <li key={movie.$id}>
      <p>{index + 1}</p>
      <img src={movie.poster_url} alt={movie.searchMovie} />
    </li>
  );
};

export default TrendingMoviesCard;
