// Base Skeleton Component
const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded ${className}`}
      {...props}
    />
  );
};

// Series Details Hero Skeleton
const SeriesDetailsHeroSkeleton = () => {
  return (
    <div className="relative w-full h-[60vh] bg-gray-900">
      {/* Background Image Skeleton */}
      <Skeleton className="absolute inset-0 rounded-none" />

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
        <div className="absolute bottom-0 left-0 p-8 space-y-4">
          {/* Title */}
          <Skeleton className="h-12 w-80" />

          {/* Rating and Info */}
          <div className="flex items-center space-x-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-24" />
          </div>

          {/* Description */}
          <div className="space-y-2 max-w-2xl">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Series Episode List Skeleton
const SeriesEpisodeListSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-48 mb-6" />

      <div className="grid gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex space-x-4 p-4 bg-gray-800 rounded-lg">
            <Skeleton className="w-32 h-20" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex space-x-4 mt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Series Cast Skeleton
const SeriesCastSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-32 mb-6" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="text-center">
            <Skeleton className="w-full aspect-[3/4] mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-3 w-3/4 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Series Similar Skeleton
const SeriesSimilarSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-40 mb-6" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-full aspect-[2/3]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Series Trailer Skeleton
const SeriesTrailerSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-36 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-full aspect-video" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Series Review Skeleton
const SeriesReviewSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-32 mb-6" />

      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Movie Card Skeleton (for grids)
const MovieCardSkeleton = () => {
  return (
    <div className="space-y-2 rounded-lg p-2 max-sm:p-1 bg-dark-100 shadow-inner shadow-light-100/10">
      <Skeleton className="w-full aspect-[2/3] rounded-md" />
      <Skeleton className="h-4 w-3/4" />

      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-10" /> {/* Year or genre */}
      </div>
    </div>
  );
};

const MovieGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, idx) => (
        <MovieCardSkeleton key={idx} />
      ))}
    </div>
  );
};

const PopularCardSkeleton = () => {
  return (
    <div className="min-w-[200px] sm:min-w-[180px] md:min-w-[200px] rounded-lg p-2 bg-dark-100 shadow-inner shadow-light-100/10 space-y-2">
      <Skeleton className="aspect-[2/3] w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
};

const PopularCarouselSkeleton = () => {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 ">
      {Array.from({ length: 6 }).map((_, idx) => (
        <PopularCardSkeleton key={idx} />
      ))}
    </div>
  );
};

// Page Skeleton (for full page loading)
const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <SeriesDetailsHeroSkeleton />

      {/* Content Sections */}
      <SeriesEpisodeListSkeleton />
      <SeriesCastSkeleton />
      <SeriesTrailerSkeleton />
      <SeriesReviewSkeleton />
    </div>
  );
};

const HomePageSkeleton = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <SeriesDetailsHeroSkeleton />

      {/* Popular Movies */}
      <div className="container mx-auto px-4">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Popular Series */}
      <div className="container mx-auto px-4">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Export all components
export {
  Skeleton,
  SeriesDetailsHeroSkeleton,
  SeriesEpisodeListSkeleton,
  SeriesCastSkeleton,
  SeriesSimilarSkeleton,
  SeriesTrailerSkeleton,
  SeriesReviewSkeleton,
  MovieCardSkeleton,
  PageSkeleton,
  HomePageSkeleton,
  MovieGridSkeleton,
  PopularCarouselSkeleton,
};
