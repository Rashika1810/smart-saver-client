import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const hasVerified = useRef(false);

  const [status, setStatus] = useState("Verifying your email...");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Prevent duplicate API calls in React Strict Mode (development)
    if (hasVerified.current) return;
    hasVerified.current = true;

    const verify = async () => {
      try {
        const { data } = await api.get(`/auth/verify-email/${token}`);

        setSuccess(true);
        setStatus(data.message);

        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2500);
      } catch (err) {
        setSuccess(false);

        setStatus(
          err.response?.data?.message ||
            "Verification failed. Please request a new verification email."
        );
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-2xl bg-white/5 border border-white/10 p-8 text-center">

        <div className="text-6xl mb-4">
          {success === null ? "⏳" : success ? "✅" : "❌"}
        </div>

        <h1 className="text-2xl font-bold text-white">
          Email Verification
        </h1>

        <p className="mt-4 text-gray-300">
          {status}
        </p>

        {success && (
          <p className="mt-3 text-green-400 text-sm">
            Redirecting to login...
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;