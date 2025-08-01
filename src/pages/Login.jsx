import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return toast.error("Invalid email format");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      if (!user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        await auth.signOut();
        navigate("/verify-email");
        return;
      }

      if (!user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        await auth.signOut(); // log out unverified user
        return;
      }

      toast.success("Login successful");
      setTimeout(() => navigate("/wishlist"), 1500);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Optional: you can block users without verified email
      if (!user.emailVerified) {
        toast.error("Email not verified. Please use another login method.");
        await auth.signOut();
        return;
      }

      toast.success("Login successful");
      setTimeout(() => navigate("/wishlist"), 1500);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <section className="mt-20 h-full flex items-center justify-center px-4 sm:px-6">
      <Toaster />
      <div className="max-w-[500px] backdrop-blur-sm rounded-lg px-2 py-8  w-full  text-white">
        <h2 className="text-2xl sm:text-4xl font-bold mb-5 text-center">
          Login to <span className="text-purple-400">Movies World</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-md bg-light-100/5 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:bg: text-gray-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your Password"
              required
              className="w-full p-3 rounded-md bg-light-100/5 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:bg: text-gray-300"
            />
          </div>
          <p className="text-sm text-left mt-2">
            <NavLink
              to="/forgotpassword"
              className="text-gray-300 hover:underline ml-1"
            >
              Forgot Password?
            </NavLink>
          </p>

          <button
            type="submit"
            className="mt-1 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Login
          </button>

          <p className="text-sm text-center mt-2">
            Don&apos;t have an account?
            <NavLink
              to="/signup"
              className="text-purple-400 hover:underline ml-1"
            >
              Sign up here
            </NavLink>
          </p>
        </form>

        <div className="mt-5 flex items-center justify-center gap-2">
          <div className="w-full h-px bg-white/20"></div>
          <span className="text-sm text-white/50">OR</span>
          <div className="w-full h-px bg-white/20"></div>
        </div>

        <div className="space-y-3 mt-5">
          <button
            type="button"
            onClick={() => handleSocialLogin(googleProvider)}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
