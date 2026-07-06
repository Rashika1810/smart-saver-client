import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(JSON.parse(storedUser));
  }
}, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:opacity-80 transition"
        >
          Smart Saver ⚡
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-gray-300 hover:text-white transition"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/recurring"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-gray-300 hover:text-white transition"
            }
          >
            Recurring
          </NavLink>

          {/* Coming soon */}
          <span className="text-gray-500 cursor-not-allowed">Budgets</span>

          <span className="text-gray-500 cursor-not-allowed">Calendar</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/add-transaction")}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 font-semibold hover:scale-105 transition"
          >
            + Add
          </button>

          {user && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm">{user.name}</span>
            </div>
          )}

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-400/30 hover:bg-red-500/20 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
