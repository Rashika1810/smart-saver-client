import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
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

  const desktopNavClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `block w-full rounded-lg px-4 py-3 text-sm font-medium transition-all ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 text-xl sm:text-2xl font-bold tracking-tight text-gray-900"
          >
            Smart
            <span className="text-blue-600">Saver</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink end to="/" className={desktopNavClass}>
              Dashboard
            </NavLink>

            <NavLink to="/about" className={desktopNavClass}>
              About
            </NavLink>

            <NavLink to="/transactions" className={desktopNavClass}>
              Transactions
            </NavLink>

            <NavLink to="/analytics" className={desktopNavClass}>
              Analytics
            </NavLink>

            <NavLink to="/recurring" className={desktopNavClass}>
              Recurring
            </NavLink>

            <NavLink to="/import-statement" className={desktopNavClass}>
              Import Statement
            </NavLink>
          </nav>

          {/* Desktop Right */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex flex-col gap-2">
              <NavLink end to="/" className={mobileNavClass}>
                Dashboard
              </NavLink>

              <NavLink to="/about" className={mobileNavClass}>
                About
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

              <NavLink
                to="/import-statement"
                className={({ isActive }) =>
                  `flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                Import Statement
              </NavLink>

              {user && (
                <div className="flex items-center gap-3 border-t pt-4 mt-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </div>
              )}

              <Button
                variant="secondary"
                className="w-full mt-3"
                onClick={logout}
              >
                Logout
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}