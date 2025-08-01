import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { NavLink } from "react-router";
import toast from "react-hot-toast";
import { Trash2, Heart, Calendar, Star, Film, LogOut } from "lucide-react";
import Spinner from "../components/Ui/Spinner";

const Wishlist = () => {
  const [user, setUser] = useState(null);
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async (movieId) => {
    if (!user) return;
    const movieRef = doc(db, "users", user.uid, "wishlist", movieId.toString());
    try {
      await deleteDoc(movieRef);
      setWishlistMovies((prev) => prev.filter((movie) => movie.id !== movieId));
      toast.success("Removed from wishlist.");
    } catch (error) {
      toast.error("Failed to remove from wishlist.");
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const wishlistItems = await getUserWishlistItems(currentUser.uid);
        setWishlistMovies(wishlistItems);
      }
    });

    return () => unsubscribe();
  }, []);

  const getUserWishlistItems = async (uid) => {
    setIsLoading(true);
    try {
      const wishlistRef = collection(db, "users", uid, "wishlist");
      const snapshot = await getDocs(wishlistRef);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return items.sort(
        (a, b) => b.timestamp?.toMillis?.() - a.timestamp?.toMillis?.()
      );
    } catch (error) {
      toast.error("Failed to Get your wishlist.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-700/30">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Access Your Wishlist
          </h2>
          <p className="text-gray-300 text-lg">
            Please login to view your saved movies and shows
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced User Profile Header */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-md p-6 sm:p-8 mb-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-0">
            {/* User Info Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
              <div className="relative">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-gray-600/50 shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-gray-600/50 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xl sm:text-2xl font-bold">
                      {user.displayName?.charAt(0).toUpperCase() ||
                        user.email?.charAt(0).toUpperCase() ||
                        "U"}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-1 right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-left sm:text-3xl font-bold text-white">
                  {user.displayName}
                </h1>
                <p className="text-gray-300 text-sm">{user.email}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-400 mt-1">
                  <Heart className="w-4 h-4" />
                  <span className="text-base sm:text-lg font-medium">
                    {wishlistMovies.length}{" "}
                    {wishlistMovies.length === 1 ? "item" : "items"} in wishlist
                  </span>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="self-center sm:self-auto">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm w-full sm:w-auto"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Wishlist Section */}
        <div className="backdrop-blur-sm rounded-lg p-2">
          <div className="flex items-center gap-3 mb-8">
            <Film className="w-8 h-8 text-gray-400" />
            <h2 className="text-3xl font-bold text-white">Your Wishlist</h2>
          </div>

          {wishlistMovies.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-24 h-24 text-gray-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-400 mb-4">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 text-lg">
                Start adding movies and shows you want to watch!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistMovies.map((movie) => {
                const routeType = movie.media_type;
                return (
                  <div
                    key={movie.id}
                    className="movie-card relative w-full h-auto"
                  >
                    <NavLink to={`/${routeType}/${movie.id}`}>
                      <div className="relative">
                        <img
                          src={
                            movie.poster
                              ? `https://image.tmdb.org/t/p/w500${movie.poster}`
                              : "/no-movie.png"
                          }
                          alt={movie.title}
                          className="w-full h-auto rounded-sm"
                        />
                        <div className="mt-4 p-1">
                          <h3 className="mb-6 hidden sm:block sm:mb-5 text-white">
                            {movie.title}
                          </h3>
                          <div className="flex justify-between items-center">
                            <div className="absolute top-1 right-1 rating bg-[#0f0d234f] py-1 px-2 rounded-md backdrop-blur-md gap-1 flex items-center">
                              <img
                                src="star.svg"
                                alt="STAR ICON"
                                className="w-4 h-4"
                              />
                              <p className="text-white">
                                {movie.rating ? movie.rating.toFixed(1) : "N/A"}
                              </p>
                            </div>
                            <p className="year text-sm text-gray-300">
                              {movie.year || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                    <button
                      onClick={() => handleRemove(movie.id)}
                      className="absolute bottom-2 right-3 bg-black/50 px-2 py-2 rounded-lg text-red-400 hover:bg-black/70 transition"
                      aria-label="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
