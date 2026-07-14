import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IndianRupee, PlusCircle, Star } from "lucide-react";
import Button from "../ui/Button";

import api from "../../api/axios";

export default function QuickAdd({ refresh }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
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
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (!favorites.length) return null;

  return (
    <section className="mb-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-amber-100 p-2">
          <Star size={20} className="text-amber-600" fill="currentColor" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Quick Add</h2>

          <p className="text-sm text-gray-500">
            Instantly add your frequently used transactions.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {item.description || item.category}
                </h3>

                <p className="mt-1 capitalize text-sm text-gray-500">
                  {item.category}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  item.type === "income"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.type}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3">
                <IndianRupee size={20} className="text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Amount</p>

                <p className="text-2xl font-bold text-gray-900">
                  ₹{Number(item.amount).toLocaleString()}
                </p>
              </div>
            </div>

            <Button
              variant="info"
              className="mt-6 w-full"
              icon={<PlusCircle size={18} />}
              onClick={() => addTransaction(item._id)}
            >
              Add Today
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
