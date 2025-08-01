import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./components/Layout/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Contact from "./pages/Contact";
import {
  fetchMovieDetailsFromTMDB,
  fetchSeriesDetailsFromTMDB,
} from "./api/tmdb-api";
import Spinner from "./components/Ui/Spinner";
import { Suspense, useEffect, useState } from "react";
import SeriesDetails from "./components/Ui/SeriesDetails";
import Loader from "./components/Ui/Loader";
import {
  HomePageSkeleton,
  MovieGridSkeleton,
  PageSkeleton,
} from "./components/Ui/Skeleton";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import Wishlist from "./pages/WishList";
import ProtectedRoute from "./components/Ui/ProtectedRoute";
import MovieDetails from "./components/Ui/Movies/MovieDetails";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 3000); // 3 seconds - adjust as needed

    return () => clearTimeout(timer);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<HomePageSkeleton />}>
              <Home />
            </Suspense>
          ),
        },
        { path: "about", element: <About /> },
        {
          path: "movies",
          element: (
            <Suspense fallback={<MovieGridSkeleton />}>
              <Movies />
            </Suspense>
          ),
        },
        {
          path: "/movie/:id",
          element: (
            <Suspense fallback={<PageSkeleton />}>
              <MovieDetails />
            </Suspense>
          ),
          loader: fetchMovieDetailsFromTMDB,
        },
        {
          path: "series",
          element: (
            <Suspense fallback={<MovieGridSkeleton />}>
              <Series />
            </Suspense>
          ),
        },
        {
          path: "/tv/:id",
          element: (
            <Suspense fallback={<PageSkeleton />}>
              <SeriesDetails />
            </Suspense>
          ),
          loader: fetchSeriesDetailsFromTMDB,
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        { path: "/login", element: <Login /> },
        {
          path: "/forgotpassword",
          element: <ForgotPassword />,
        },
        {
          path: "/verify-email",
          element: <VerifyEmail />,
        },
        { path: "/signup", element: <SignUp /> },
        { path: "contact", element: <Contact /> },
      ],
    },
  ]);

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* <div className="hidden lg:block bg-[url('/hero-bg.png')] w-full h-screen bg-center bg-cover absolute z-0" /> */}
      <div className="pattern" />
      <div className="wrapper">
        <Toaster />

        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </>
  );
};

export default App;
