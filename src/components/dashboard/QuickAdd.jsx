import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";

export default function QuickAdd({ refresh }) {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const { data } = await api.get("/favorites");
      setFavorites(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTransaction = async (id) => {
    try {
      await api.post(`/favorites/${id}/add`);

      toast.success("Transaction added");

      refresh();

    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (!favorites.length) return null;

  return (
    <div className="mb-8">

      <h2 className="text-xl font-bold mb-4">
        ⭐ Quick Add
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        {favorites.map((item) => (

          <div
            key={item._id}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >

            <h3 className="font-semibold">
              {item.description || item.category}
            </h3>

            <p className="text-gray-400">
              ₹{item.amount}
            </p>

            <button
              onClick={() => addTransaction(item._id)}
              className="mt-3 w-full rounded-lg bg-green-600 py-2 hover:bg-green-700"
            >
              + Add Today
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}