import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Button from "../../components/ui/Button";

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", input);

      if (data?.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        toast.success("Welcome back!");
        navigate("/", { replace: true });
      } else {
        toast.error(data?.message || "Login failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Server error");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  return (
    <div className="grid min-h-screen bg-slate-50 lg:grid-cols-2">
      {/* Left Section */}
      <div className="hidden items-center border-r border-blue-100 bg-blue-50 lg:flex">
        <div className="mx-auto max-w-lg px-12">
          <h1 className="mt-8 text-5xl font-semibold leading-tight text-gray-900">
            Expense Tracker
          </h1>

          <p className="mt-5 text-base leading-8 text-gray-600">
            A smarter way to manage your money, track spending and understand
            your financial habits.
          </p>

          <div className="mt-12 space-y-5">
            <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                💰
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Track Expenses
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Record every expense and income in seconds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                📊
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  AI Insights
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Understand your spending with intelligent analysis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                📈
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Reports
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  View monthly summaries and financial trends.
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
              Welcome Back 👋
            </h2>

            <p className="mt-2 text-gray-500">
              Sign in to continue managing your finances.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              variant="info"
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 border-t border-gray-200 pt-5 text-center text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;