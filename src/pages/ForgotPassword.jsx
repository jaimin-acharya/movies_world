import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      return toast.error("Please enter a valid email");
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link sent to your email");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="mt-20 flex justify-center px-4">
      <Toaster />
      <div className="max-w-[500px] w-full text-white p-8 backdrop-blur-sm rounded-lg">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-5">
          Forgot <span className="text-purple-400">Password?</span>
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
              className="w-full p-3 rounded-md bg-light-100/5 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Send Reset Link
          </button>

          <p className="text-sm text-center mt-2">
            Remembered your password?
            <span
              className="text-purple-400 px-1 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Go back to Login
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
