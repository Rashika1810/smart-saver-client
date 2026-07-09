import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Plus } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `transition-colors pb-1 border-b-2 ${
      isActive
        ? "border-blue-500 text-white"
        : "border-transparent text-gray-400 hover:text-white"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 transition ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-zinc-800"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold tracking-tight">
          Smart<span className="text-blue-400">Saver</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navClass}>
            Overview
          </NavLink>

          <NavLink to="/transactions" className={navClass}>
            Transactions
          </NavLink>

          <NavLink to="/analytics" className={navClass}>
            Analytics
          </NavLink>

          <NavLink to="/recurring" className={navClass}>
            Recurring
          </NavLink>
        </nav>

        {/* Desktop Right */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => navigate("/add-transaction")}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            <Plus size={18} />
            Add Transaction
          </button>

          <button
            onClick={logout}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-gray-300 transition hover:bg-zinc-800 hover:text-white"
          >
            Logout
          </button>
        </div>

        {/* Mobile Right */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => navigate("/add-transaction")}
            className="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-500"
          >
            <Plus size={18} />
          </button>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-lg border border-zinc-700 p-2 transition hover:bg-zinc-800"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-800 bg-zinc-900 md:hidden">
          <div className="space-y-2 p-4">
            <NavLink to="/" end className={mobileNavClass}>
              Overview
            </NavLink>

            <NavLink to="/transactions" className={mobileNavClass}>
              Transactions
            </NavLink>

            <NavLink to="/analytics" className={mobileNavClass}>
              Analytics
            </NavLink>

            <NavLink to="/recurring" className={mobileNavClass}>
              Recurring
            </NavLink>

            <div className="my-3 border-t border-zinc-800" />

            {user && (
              <div className="px-3 text-sm text-gray-400">
                Signed in as
                <div className="mt-1 font-medium text-white">{user.name}</div>
              </div>
            )}

            <button
              onClick={() => navigate("/add-transaction")}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-left font-medium transition hover:bg-blue-500"
            >
              + Add Transaction
            </button>

            <button
              onClick={logout}
              className="w-full rounded-lg border border-zinc-700 px-4 py-3 text-left text-gray-300 transition hover:bg-zinc-800 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
