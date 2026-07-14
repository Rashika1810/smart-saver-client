import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Button from "../../components/ui/Button";

const Register = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(input.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character.",
      );
      return;
    }

    setError("");

    try {
      const { data } = await api.post("/auth/register", input);

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data?.message || "Registration failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      {/* Left Section */}
      <div className="hidden lg:flex items-center bg-blue-50 border-r border-blue-100">
        <div className="max-w-lg mx-auto px-12">
          <h2 className="mt-8 text-5xl font-semibold text-gray-900 leading-tight">
            Expense Tracker
          </h2>

          <p className="mt-5 text-base text-gray-600 leading-8">
            Join thousands of users who manage their finances with a simple,
            modern, and intelligent expense tracking platform.
          </p>

          <div className="mt-12 space-y-5">
            <div className="flex items-start gap-4 rounded-2xl bg-white border border-blue-100 p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                💰
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Track Every Transaction
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Keep all your income and expenses organized in one place.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white border border-blue-100 p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                🤖
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  AI Financial Insights
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Receive personalized insights to improve your spending habits.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-white border border-blue-100 p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                📈
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Visual Reports
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Understand your finances with clean charts and summaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-gray-900">
              Create Account
            </h2>

            <p className="mt-2 text-gray-500">
              Start your journey toward smarter financial management.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <p className="text-xs leading-5 text-gray-500">
              Password must contain at least 8 characters including one
              uppercase letter, one lowercase letter, one number, and one
              special character.
            </p>

            <Button
              type="submit"
              variant="info"
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 border-t border-gray-200 pt-5 text-center text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;