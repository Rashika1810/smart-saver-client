import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function FavoriteQuickAdd({ onSelect }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
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
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">⚡ Quick Add</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {favorites.map((favorite) => (
          <button
            key={favorite._id}
            type="button"
            onClick={() => onSelect(favorite)}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 max-h-[650px] overflow-y-auto"
          >
            <h3 className="font-semibold truncate">
              {favorite.description || favorite.category}
            </h3>

            <p className="text-lg font-bold mt-2">₹{favorite.amount}</p>

            <p className="text-xs text-gray-400 mt-1 uppercase">
              {favorite.category}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
