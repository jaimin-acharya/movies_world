import { Suspense } from "react";
import SeriesCast from "./SeriesCast";
import SeriesDetailsHero from "./SeriesDetailsHero";
import SeriesEpisodeList from "./SeriesEpisodeList";
import SeriesReview from "./SeriesReview";
import SeriesSimilar from "./SeriesSimilar";
import SeriesTrailer from "./SeriesTrailer";
  
import { PageSkeleton } from "./Skeleton";

const SeriesDetails = () => {
  return (
    <>
      <Suspense fallback={<PageSkeleton />}>
        <SeriesDetailsHero />
        <SeriesEpisodeList />
        <SeriesTrailer />
        <SeriesCast />
        <SeriesSimilar />
        <SeriesReview />
      </Suspense>
    </>
  );
};

export default SeriesDetails;
