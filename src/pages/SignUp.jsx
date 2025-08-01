import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = form;

    if (!name.trim()) return toast.error("Name is required");
    if (!/\S+@\S+\.\S+/.test(email))
      return toast.error("Invalid email address");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update display name
      await updateProfile(userCredential.user, { displayName: name });

      // Send email verification
      await sendEmailVerification(userCredential.user);

      toast.success("Signup successful! Verification email sent.");
      setTimeout(() => navigate("/verify-email"), 2000);
    } catch (err) {
      toast.error(getFriendlyError(err.message));
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success("Signup successful");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(getFriendlyError(err.message));
    }
  };

  const getFriendlyError = (message) => {
    if (message.includes("email-already-in-use"))
      return "Email is already in use.";
    if (message.includes("invalid-email")) return "Invalid email address.";
    if (message.includes("weak-password"))
      return "Password should be at least 6 characters.";
    return message;
  };

  return (
    <section className="w-full h-full flex items-center justify-center gap-5 text-white p-5">
      <Toaster />
      <div className="max-w-[500px] backdrop-blur-sm rounded-lg px-2 py-8 w-full text-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-5">
          Create Your <span className="text-gradient px-1">Movies World</span>{" "}
          Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-md bg-light-100/5 text-gray-300"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-md bg-light-100/5 text-gray-300"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your Password"
              required
              className="w-full p-3 rounded-md bg-light-100/5 text-gray-300"
            />
          </div>
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full p-3 rounded-md bg-light-100/5 text-gray-300"
            />
          </div>

          <NavLink to="/login">
            <p className="py-3 text-purple-400 hover:underline ml-1">
              Already have an account?
            </p>
          </NavLink>

          <button
            type="submit"
            className="text-sm mt-1 w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-md"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-5 flex items-center justify-center gap-2">
          <div className="w-full h-px bg-white/20"></div>
          <span className="text-sm text-white/50">OR</span>
          <div className="w-full h-px bg-white/20"></div>
        </div>

        <div className="mt-5 space-y-3 w-full">
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

export default Signup;
