import { Suspense } from "react";
import { HomePageSkeleton } from "../Skeleton";
import MovieDetailsHero from "./MovieDetailsHero";
import MovieTrailer from "./MovieTrailer";
import MovieCast from "./MovieCast";
import MovieSimilar from "./MovieSimilar";
import MovieReview from "./MovieReview";

const MovieDetails = () => {
  return (
    <>
      <Suspense fallback={<HomePageSkeleton />}>
        <MovieDetailsHero />
        <MovieTrailer />
        <MovieCast />
        <MovieSimilar />
        <MovieReview />
      </Suspense>
    </>
  );
};

export default MovieDetails;
