import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

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
    <div className="min-h-screen bg-[#0f172a] flex">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 border-r border-slate-800">
        <div className="flex flex-col justify-center px-16 max-w-lg">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Expense <span className="text-green-500">Tracker</span>
          </h1>

          <p className="mt-5 text-slate-400 text-lg leading-8">
            Stay on top of your finances with a simple dashboard to manage your
            income and expenses.
          </p>

          <div className="mt-10 space-y-4 text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Track daily expenses</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Manage income records</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>View spending reports</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-[#1e293b] border border-slate-700 rounded-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white">
              Sign in
            </h2>

            <p className="text-slate-400 mt-2">
              Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-[#0f172a] border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-[#0f172a] border border-slate-600 rounded-md px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 border-t border-slate-700 pt-5">
            <p className="text-center text-slate-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-green-400 hover:text-green-300 font-medium"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;