import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

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
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character."
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
    <div className="min-h-screen bg-[#0f172a] flex">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 border-r border-slate-800">
        <div className="flex flex-col justify-center px-16 max-w-lg">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Expense <span className="text-emerald-500">Tracker</span>
          </h1>

          <p className="mt-5 text-slate-400 text-lg leading-8">
            Create an account to manage your income, track expenses, and view
            your financial reports in one place.
          </p>

          <div className="mt-10 space-y-4 text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span>Track expenses</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span>Record income</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span>Generate reports</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-[#1e293b] border border-slate-700 rounded-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white">
              Create Account
            </h2>

            <p className="text-slate-400 mt-2">
              Create your account to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={input.name}
                onChange={handleChange}
                className="w-full bg-[#0f172a] border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={input.email}
                onChange={handleChange}
                className="w-full bg-[#0f172a] border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={input.password}
                onChange={handleChange}
                className="w-full bg-[#0f172a] border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <p className="text-xs text-slate-500">
              Password must contain at least 8 characters, including uppercase,
              lowercase, a number, and a special character.
            </p>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-md transition-colors"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 border-t border-slate-700 pt-5">
            <p className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;