import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import toast from "react-hot-toast";

export const useWishlist = (movieId = null) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  const checkWishlist = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !movieId) return;

      const movieRef = doc(
        db,
        "users",
        user.uid,
        "wishlist",
        movieId.toString()
      );
      const movieSnap = await getDoc(movieRef);
      setIsInWishlist(movieSnap.exists());
    } catch (error) {
      console.error("Error Get Your wishlist:", error);
      toast.error("Failed to Get to wishlist");
    }
  };

  const addToWishlist = async (movieData) => {
    const user = auth.currentUser;
    if (!user) return toast.error("You must be logged in");

    // Create the user document if not exists
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, { createdAt: new Date() });
    }

    const movieRef = doc(
      db,
      "users",
      user.uid,
      "wishlist",
      movieData.id.toString()
    );
    const movieDataToSave = {
      title: movieData.title || movieData.name || "Untitled",
      poster: movieData.poster_path
        ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
        : "",
      media_type:
        movieData.media_type || (movieData.first_air_date ? "tv" : "movie"),
      rating: movieData.vote_average || null,
      year:
        movieData.release_date?.slice(0, 4) ||
        movieData.first_air_date?.slice(0, 4) ||
        "N/A",
      timestamp: new Date(),
    };

    try {
      await setDoc(movieRef, movieDataToSave);
      toast.success("Added to wishlist!");
      setIsInWishlist(true);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist");
    }
  };

  useEffect(() => {
    checkWishlist();
  }, [auth.currentUser, movieId]);

  return {
    isInWishlist,
    addToWishlist,
    refreshWishlistStatus: checkWishlist,
  };
};
