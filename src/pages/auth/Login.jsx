import  { useEffect, useState } from "react";
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

        toast.success("Welcome back 🚀");
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
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-black">

      {/* LEFT BRAND PANEL */}
      <div className="hidden md:flex w-1/2 flex-col justify-center px-16 text-white">
        
        <h1 className="text-5xl font-bold leading-tight">
          Track your <span className="text-green-400">Money</span> smarter 💰
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Manage expenses, monitor income, and take control of your financial life with ease.
        </p>

        <div className="mt-8 space-y-3 text-gray-300">
          <p>✔ Real-time expense tracking</p>
          <p>✔ Smart analytics dashboard</p>
          <p>✔ Income vs expense insights</p>
        </div>

        <div className="mt-10 text-green-400 font-semibold">
          💡 Built for better financial decisions
        </div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

          {/* HEADER */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Login to your expense dashboard
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={input.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-black/40 text-white border border-white/10 focus:border-green-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={input.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-black/40 text-white border border-white/10 focus:border-green-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="
                w-full py-3 rounded-xl
                bg-gradient-to-r from-green-500 to-emerald-600
                hover:from-green-600 hover:to-emerald-700
                transition font-semibold text-white
                shadow-lg shadow-green-500/20
              "
            >
              Login
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-gray-400 mt-5 text-sm">
            New here?{" "}
            <Link to="/register" className="text-green-400 hover:underline">
              Create account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;