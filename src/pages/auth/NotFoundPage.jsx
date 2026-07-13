
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-10 text-center">
        <div className="text-6xl mb-4">📄</div>

        <h1 className="text-5xl font-bold text-gray-900">404</h1>

        <h2 className="mt-3 text-2xl font-semibold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500 leading-7">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center mt-8 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

