import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import FavoriteQuickAdd from "../favorites/FavoriteQuickAdd";
import {
  expenseCategories,
  incomeCategories,
} from "../../utils/categories";

const initialState = {
  amount: "",
  type: "",
  category: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  saveAsFavorite: false,
};

export default function AddTransaction() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [highlight, setHighlight] = useState(false);

  const categories =
    form.type === "income"
      ? incomeCategories
      : expenseCategories;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "type" && { category: "" }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        amount: Number(form.amount),
        type: form.type,
        category: form.category,
        description: form.description,
        date: form.date,
      };

      const { data } = await api.post("/transactions", payload);

      if (form.saveAsFavorite) {
        await api.post("/favorites", payload);
      }

      if (data.success) {
        toast.success("Transaction added successfully");

        navigate("/transactions");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to save transaction"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">
          Add Transaction
        </h1>

        <p className="mt-2 text-gray-400">
          Record a new income or expense.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-lg font-semibold mb-4">
          Quick Templates
        </h2>

        <FavoriteQuickAdd
          onSelect={(favorite) => {
            setForm({
              ...favorite,
              date: new Date().toISOString().split("T")[0],
              saveAsFavorite: false,
            });

            setHighlight(true);

            setTimeout(() => setHighlight(false), 600);
          }}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`rounded-xl border p-6 space-y-5 transition ${
          highlight
            ? "border-green-500 bg-green-500/5"
            : "border-zinc-800 bg-zinc-900"
        }`}
      >
        <h2 className="text-lg font-semibold">
          Transaction Details
        </h2>

        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            min="1"
            step="0.01"
            placeholder="Enter amount (e.g. 1500)"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Transaction Type
          </label>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 focus:border-blue-500 outline-none"
          >
            <option value="">Choose transaction type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            disabled={!form.type}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 focus:border-blue-500 outline-none disabled:opacity-50"
          >
            <option value="">
              {form.type
                ? "Choose a category"
                : "Select transaction type first"}
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Transaction Date
          </label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Description
          </label>

          <input
            type="text"
            name="description"
            placeholder="What was this transaction for? (Optional)"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 focus:border-blue-500 outline-none"
          />
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="saveAsFavorite"
            checked={form.saveAsFavorite}
            onChange={handleChange}
          />

          <span className="text-sm text-gray-300">
            Save this as a reusable template
          </span>
        </label>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-medium hover:bg-blue-500 transition-colors"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}