import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const resendVerification = async () => {
    if (!auth.currentUser) {
      toast.error("No user logged in");
      return;
    }

    try {
      setIsSending(true);
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email sent");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await auth.currentUser?.reload(); // Refresh user data
      if (auth.currentUser?.emailVerified) {
        toast.success("Email verified!");
        clearInterval(interval);
        navigate("/login");
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
      <p className="mb-4 text-center max-w-md text-gray-400">
        We've sent a verification link to your email. Please verify to continue.
        If you didn't receive it, click the button below.
      </p>
      <button
        onClick={resendVerification}
        disabled={isSending}
        className="bg-purple-600 px-6 py-2 rounded hover:bg-purple-700 transition"
      >
        {isSending ? "Sending..." : "Resend Verification Email"}
      </button>
    </div>
  );
};

export default VerifyEmail;
