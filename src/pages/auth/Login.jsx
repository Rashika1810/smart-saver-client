import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
    {loading && <Loader/>}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Welcome back</h1>

        <p className="mt-2 text-gray-500">
          Sign in to your account to continue.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              disabled={loading}
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter password"
                className="w-full rounded-md border border-gray-300 px-4 py-2 pr-12 transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="info"
            className="w-full rounded-md py-3"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Create Account
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
