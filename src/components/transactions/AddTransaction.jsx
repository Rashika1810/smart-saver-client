import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import FavoriteQuickAdd from "../favorites/FavoriteQuickAdd";

const initialState = {
  amount: "",
  type: "",
  category: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  saveAsFavorite: false,
};

export default function AddTransaction() {
  const [form, setForm] = useState(initialState);
  const [highlight, setHighlight] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        amount: Number(form.amount),
        type: form.type.toLowerCase(),
        category: form.category,
        description: form.description,
        date: form.date,
      };

      const { data } = await api.post("/transactions", payload);

      if (form.saveAsFavorite) {
        await api.post("/favorites", {
          amount: Number(form.amount),
          type: form.type.toLowerCase(),
          category: form.category,
          description: form.description,
        });
      }

      if (data.success) {
        toast.success("Transaction added successfully 🚀");

        setForm(initialState);

        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to save transaction.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Add Transaction</h1>

        <p className="text-gray-400 mt-2 mb-8">
          Choose a saved template or create a new transaction.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Favorite Templates */}
          <div className="lg:col-span-1">
            <FavoriteQuickAdd
              onSelect={(favorite) => {
                setForm((prev) => ({
                  ...prev,
                  amount: favorite.amount,
                  type: favorite.type,
                  category: favorite.category,
                  description: favorite.description,
                  date: new Date().toISOString().split("T")[0],
                  saveAsFavorite: false,
                }));

                setHighlight(true);

                setTimeout(() => {
                  setHighlight(false);
                }, 800);
              }}
            />
          </div>

          {/* Transaction Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className={`space-y-5 p-6 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                highlight
                  ? "border-2 border-green-500 bg-green-500/10"
                  : "border border-white/10 bg-white/5"
              }`}
            >
              <input
                type="number"
                min="1"
                step="0.01"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-blue-500"
                required
              />

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="salary">Salary</option>
                <option value="food">Food</option>
                <option value="bills">Bills</option>
                <option value="travel">Travel</option>
                <option value="other">Other</option>
              </select>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-blue-500"
                required
              />

              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-blue-500"
              />

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="saveAsFavorite"
                  checked={form.saveAsFavorite}
                  onChange={handleChange}
                  className="h-4 w-4"
                />

                <span className="text-sm">Save as Favorite Template</span>
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-700"
              >
                Save Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
