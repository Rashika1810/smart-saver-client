import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Calendar, IndianRupee, FileText, Layers, Tag } from "lucide-react";
import Button from "../ui/Button";
import api from "../../api/axios";
import FavoriteQuickAdd from "../favorites/FavoriteQuickAdd";
import { expenseCategories, incomeCategories } from "../../utils/categories";

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
    form.type === "income" ? incomeCategories : expenseCategories;

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
        error.response?.data?.message || "Failed to save transaction",
      );
    }
  };

  const inputClass =
    "w-full h-12 rounded-md border border-gray-300 bg-white px-4 text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Add Transaction
        </h1>

        <p className="mt-2 text-gray-500">
          Record your income or expenses to keep your finances organized.
        </p>
      </div>

      {/* Quick Templates */}
      <div className="mb-8 rounded-md border border-gray-200 bg-white p-6 shadow-sm">
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

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className={`rounded-md border bg-white p-8 shadow-sm transition-all duration-300 ${
          highlight
            ? "border-green-400 ring-2 ring-green-100"
            : "border-gray-200"
        }`}
      >
        <h2 className="mb-8 text-xl font-semibold text-gray-900">
          Transaction Details
        </h2>

        <div className="space-y-6">
          {/* Amount */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <IndianRupee size={16} />
              Amount
            </label>

            <input
              type="number"
              name="amount"
              min="1"
              step="0.01"
              placeholder="Enter amount"
              value={form.amount}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          {/* Type */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <Layers size={16} />
              Transaction Type
            </label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Choose transaction type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <Tag size={16} />
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              disabled={!form.type}
              className={`${inputClass} disabled:bg-gray-100 disabled:text-gray-400`}
            >
              <option value="">
                {form.type
                  ? "Choose a category"
                  : "Select transaction type first"}
              </option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar size={16} />
              Transaction Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <FileText size={16} />
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              placeholder="Add a note (optional)"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
            />
          </div>

          {/* Save Template */}
          <label className="flex items-center gap-3 rounded-md border border-gray-200 bg-gray-50 p-4">
            <input
              type="checkbox"
              name="saveAsFavorite"
              checked={form.saveAsFavorite}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />

            <span className="text-sm text-gray-700">
              Save this transaction as a reusable template
            </span>
          </label>

          {/* Button */}
          <Button type="submit" variant="info" className="w-full">
            Add Transaction
          </Button>
        </div>
      </form>
    </div>
  );
}