import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] flex">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 border-r border-slate-800">
        <div className="flex flex-col justify-center px-16 max-w-lg">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Expense <span className="text-green-500">Tracker</span>
          </h1>

          <p className="mt-5 text-slate-400 text-lg leading-8">
            The page you're looking for couldn't be found. It may have been
            removed, renamed, or the URL might be incorrect.
          </p>

          <div className="mt-10 space-y-4 text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Manage expenses</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Track income</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>View financial reports</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-[#1e293b] border border-slate-700 rounded-lg p-8">
          <div className="text-center">
            <p className="text-green-500 text-sm font-semibold tracking-widest uppercase">
              Error 404
            </p>

            <h1 className="text-7xl font-bold text-white mt-2">
              404
            </h1>

            <h2 className="text-2xl font-semibold text-white mt-4">
              Page Not Found
            </h2>

            <p className="text-slate-400 mt-3 leading-7">
              We couldn't find the page you were looking for.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition-colors"
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full border border-slate-600 text-slate-200 hover:bg-slate-800 py-3 rounded-md transition-colors"
            >
              Go Back
            </button>
          </div>

          <div className="mt-6 border-t border-slate-700 pt-5">
            <p className="text-center text-sm text-slate-400">
              <Link
                to="/"
                className="text-green-400 hover:text-green-300 font-medium"
              >
                Return to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;