import { useEffect, useState } from "react";
import { Star, IndianRupee } from "lucide-react";
import api from "../../api/axios";

export default function FavoriteQuickAdd({ onSelect }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const { data } = await api.get("/favorites");
      setFavorites(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  if (!favorites.length) return null;

  return (
    <div>
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-amber-100 p-2">
          <Star
            size={18}
            className="text-amber-600"
            fill="currentColor"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Quick Templates
          </h2>

          <p className="text-sm text-gray-500">
            Click a saved template to instantly fill the form.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((favorite) => (
          <button
            key={favorite._id}
            type="button"
            onClick={() => onSelect(favorite)}
            className="rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 truncate">
                  {favorite.description || favorite.category}
                </h3>

                <p className="mt-1 text-sm capitalize text-gray-500">
                  {favorite.category}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  favorite.type === "income"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {favorite.type}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <IndianRupee
                  size={18}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Amount
                </p>

                <p className="text-xl font-bold text-gray-900">
                  ₹{Number(favorite.amount).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-gray-50 py-2 text-center text-sm font-medium text-blue-600 transition hover:bg-blue-50">
              Use Template
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}