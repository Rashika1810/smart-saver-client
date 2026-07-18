import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Button from "../../components/ui/Button";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
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
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Create Account</h1>

        <p className="mt-2 text-gray-500">
          Create your account to start tracking your finances.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
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
              className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-md border border-gray-300 px-4 py-2 transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <div
                className="relative"
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
              >
                <FaInfoCircle className="cursor-pointer text-gray-500 hover:text-blue-600" />

                {showInfo && (
                  <div className="absolute left-5 top-0 z-10 w-72 rounded-lg border border-gray-200 bg-white p-3 text-xs text-gray-600 shadow-lg">
                    <p className="font-semibold mb-2">Password Requirements</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Minimum 8 characters</li>
                      <li>At least one uppercase letter</li>
                      <li>At least one lowercase letter</li>
                      <li>At least one number</li>
                      <li>At least one special character (!@#$%^&*)</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full rounded-md border border-gray-300 px-4 py-2 pr-12 transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
          <Button
            type="submit"
            variant="info"
            className="w-full rounded-md py-3"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
