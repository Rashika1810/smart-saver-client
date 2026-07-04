import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (u) setUser(u);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goToAddTransaction = () => {
    navigate("/add-transaction");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">

        {/* LOGO */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide text-white hover:opacity-80 transition"
        >
          Smart Saver ⚡
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          {/* ADD BUTTON */}
          <button
            onClick={goToAddTransaction}
            className="
              px-4 py-2 rounded-xl
              bg-gradient-to-r from-blue-500 to-blue-700
              text-white font-semibold
              shadow-lg shadow-blue-500/20
              hover:scale-105 hover:shadow-blue-500/40
              active:scale-95
              transition-all duration-200
            "
          >
            + Add Transaction
          </button>

          {/* USER BADGE */}
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-200">
                {user?.name || "User"}
              </span>
            </div>
          )}

          {/* LOGOUT */}
          {user && (
            <button
              onClick={logout}
              className="
                px-4 py-2 rounded-xl
                bg-red-500/10 text-red-400
                border border-red-400/30
                hover:bg-red-500/20 hover:text-red-300
                transition
              "
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}