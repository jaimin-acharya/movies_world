import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase"; // adjust path if needed
import Spinner from "./Spinner";
 // optional: your loader

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Spinner />; // show loader while checking auth
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
