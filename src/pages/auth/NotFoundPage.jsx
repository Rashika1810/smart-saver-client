import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-black">
      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/2 flex-col justify-center px-16 text-white">
        <h1 className="text-5xl font-bold leading-tight">
          Oops! <span className="text-green-400">Wrong Turn</span> 🚧
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          The page you're looking for doesn't exist or may have been moved.
          Don't worry, your financial journey is still on track.
        </p>

        <div className="mt-8 space-y-3 text-gray-300">
          <p>✔ Secure expense management</p>
          <p>✔ Real-time analytics dashboard</p>
          <p>✔ Smart financial insights</p>
        </div>

        <div className="mt-10 text-green-400 font-semibold">
          💡 Let's get you back to managing your money
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
          {/* 404 */}
          <div className="text-center">
            <h1 className="text-8xl font-extrabold text-green-400 tracking-wider">
              404
            </h1>

            <h2 className="text-3xl font-bold text-white mt-4">
              Page Not Found
            </h2>

            <p className="text-gray-400 mt-3">
              Sorry, the page you're trying to access doesn't exist or has been
              removed.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 space-y-4">
            <button
              onClick={() => navigate("/")}
              className="
                w-full py-3 rounded-xl
                bg-gradient-to-r from-green-500 to-emerald-600
                hover:from-green-600 hover:to-emerald-700
                transition
                font-semibold
                text-white
                shadow-lg shadow-green-500/20
              "
            >
              🏠 Back to Dashboard
            </button>

            <button
              onClick={() => navigate(-1)}
              className="
                w-full py-3 rounded-xl
                border border-white/10
                bg-black/40
                text-white
                hover:bg-white/10
                transition
              "
            >
              ← Go Back
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Need help?{" "}
            <Link
              to="/"
              className="text-green-400 hover:underline font-medium"
            >
              Return Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;