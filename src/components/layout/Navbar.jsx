import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Upload } from "lucide-react";
import Button from "../ui/Button";

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Smart
            <span className="text-blue-600">Saver</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink end to="/" className={navClass}>
              Dashboard
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

            <NavLink to="/import-statement" className={navClass}>
              Import Statement
            </NavLink>
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            {user && (
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </button>
            )}

            <button
              onClick={logout}
              className="rounded-xl p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={20} />
            </button>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="border-b border-gray-200 bg-white md:hidden">
          <div className="mx-auto max-w-7xl space-y-2 p-5">
            <NavLink end to="/" className={navClass}>
              Dashboard
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

            <NavLink
              to="/import-statement"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              <Upload size={18} />
              Import Statement
            </NavLink>

            <Button variant="secondary" className="w-full" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
