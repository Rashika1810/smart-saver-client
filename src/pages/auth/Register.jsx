import  { useEffect, useState } from "react";
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
      setError("Weak password. Use 8+ chars, upper, lower, number, symbol.");
      return;
    }

    setError("");

    try {
      const { data } = await api.post("/auth/register", input);

      if (data?.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        toast.success("Account created 🎉");
        navigate("/");
      } else {
        toast.error(data?.message || "Registration failed");
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
          Take control of your{" "}
          <span className="text-emerald-400">Expenses</span> 💸
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Track income, manage spending, and build better financial habits with
          ease.
        </p>

        <div className="mt-8 space-y-3 text-gray-300">
          <p>✔ Smart expense tracking</p>
          <p>✔ Income vs expense insights</p>
          <p>✔ Beautiful analytics dashboard</p>
        </div>

        <div className="mt-10 text-emerald-400 font-semibold">
          Start your financial journey today 🚀
        </div>
      </div>

      {/* RIGHT REGISTER PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
          {/* HEADER */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="text-gray-400 text-sm mt-1">
              Start tracking your expenses
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={input.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-black/40 text-white border border-white/10 focus:border-emerald-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={input.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-black/40 text-white border border-white/10 focus:border-emerald-500 outline-none transition"
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
                className="w-full mt-1 px-4 py-3 rounded-xl bg-black/40 text-white border border-white/10 focus:border-emerald-500 outline-none transition"
              />
            </div>

            {/* ERROR */}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* PASSWORD HINT */}
            <p className="text-xs text-gray-500">
              Must include uppercase, lowercase, number & symbol (8+ chars)
            </p>

            {/* BUTTON */}
            <button
              type="submit"
              className="
                w-full py-3 rounded-xl
                bg-gradient-to-r from-emerald-500 to-green-600
                hover:from-emerald-600 hover:to-green-700
                transition font-semibold text-white
                shadow-lg shadow-emerald-500/20
              "
            >
              Create Account
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-gray-400 mt-5 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
