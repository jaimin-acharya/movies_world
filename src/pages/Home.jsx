import { Suspense, useState } from "react";
import SearchBar from "../components/Ui/SearchBar";


import HomeButtons from "../components/Ui/HomeButtons";

import { PopularCarouselSkeleton } from "../components/Ui/Skeleton";
import NowPlaying from "../components/Ui/Movies/NowPlaying";
import PopularMovies from "../components/Ui/Movies/PopularMovies";
import TopRatedMovies from "../components/Ui/Movies/TopRatedMovies";
import UpcomingMovies from "../components/Ui/Movies/UpcomingMovies";
import HomeMovies from "../components/Ui/HomeMovies";
import PopularSeries from "../components/Ui/TvSeries/PopularSeries";
import TopRatedSeries from "../components/Ui/TvSeries/TopRatedSeries";
import TrendingSeries from "../components/Ui/TvSeries/TrendingSeries";
import AiringTodaySeries from "../components/Ui/TvSeries/AiringTodaySeries";
import TrendingMoviesSeries from "../components/Ui/TrendingMoviesSeries";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [activeTab, setActiveTab] = useState("movies");
  const [triggeredSearchTerm, setTriggeredSearchTerm] = useState("");

  const handleSearch = (term) => {
    setTriggeredSearchTerm(term);
  };

  return (
    <>
      <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1>
          Your Destination To Find Favourite
          <span className="text-gradient"> Movies & Series</span>
        </h1>
        <SearchBar
          searchMovie={searchTerm}
          setSearchMovie={setSearchTerm}
          onSearch={handleSearch}
        />
      </header>

      <Suspense fallback={<PopularCarouselSkeleton />}>
        <HomeMovies triggeredSearchTerm={triggeredSearchTerm} />

        <HomeButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "movies" ? (
          <>
            <NowPlaying />
            <PopularMovies />
            <TopRatedMovies />
            <UpcomingMovies />
          </>
        ) : (
          <>
            <PopularSeries />
            <TopRatedSeries />
            <TrendingSeries />
            <AiringTodaySeries />
          </>
        )}
        <TrendingMoviesSeries />
      </Suspense>
    </>
  );
};
export default Home;
