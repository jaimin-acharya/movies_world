// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const addToWishlist = async (movie) => {
  const user = auth.currentUser;
  if (!user) return toast.error("Please login to add to wishlist.");

  const userDocRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userDocRef);

  if (!userSnap.exists()) {
    await setDoc(userDocRef, {
      createdAt: new Date(),
    });
  }

  const movieRef = doc(db, "users", user.uid, "wishlist", movie.id.toString());
  await setDoc(movieRef, {
    title: movie.title || movie.name || "Untitled",
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "",
    media_type: movie.media_type || "movie",
    rating: movie.vote_average || null,
    year:
      movie.release_date?.slice(0, 4) ||
      movie.first_air_date?.slice(0, 4) ||
      "N/A",
    timestamp: new Date(),
  });

  toast.success("Added to wishlist!");
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// OAuth providers
export const googleProvider = new GoogleAuthProvider();
