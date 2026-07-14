import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Calendar, IndianRupee, FileText, Layers, Tag } from "lucide-react";
import Button from "../ui/Button";
import api from "../../api/axios";
import { expenseCategories, incomeCategories } from "../../utils/categories";

const initialState = {
  amount: "",
  type: "",
  category: "",
  description: "",
  date: "",
};

export default function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const categories =
    form.type === "income" ? incomeCategories : expenseCategories;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchTransaction();
  }, [id]);

  const fetchTransaction = async () => {
    try {
      const { data } = await api.get(`/transactions/${id}`);

      const t = data.data;

      setForm({
        amount: t.amount || "",
        type: t.type || "",
        category: t.category || "",
        description: t.description || "",
        date: t.date?.split("T")[0] || "",
      });
    } catch {
      toast.error("Unable to load transaction.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && { category: "" }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/transactions/${id}`, {
        ...form,
        amount: Number(form.amount),
      });

      toast.success("Transaction updated successfully");
      navigate("/transactions");
    } catch {
      toast.error("Failed to update transaction");
    }
  };

  const inputClass =
    "w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm text-center">
          <div className="h-10 w-10 mx-auto rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <p className="mt-5 text-gray-500">Loading transaction...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Transaction</h1>

        <p className="mt-2 text-gray-500">
          Update the details of your transaction.
        </p>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
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
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
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
              value={form.description}
              onChange={handleChange}
              placeholder="Add a note (optional)"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none"
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-4 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
              className="flex-1"
            >
              Cancel
            </Button>

            <Button type="submit" variant="info" className="flex-1">
              Update Transaction
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
