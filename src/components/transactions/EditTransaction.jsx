import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";

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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/transactions/${id}`, {
        ...form,
        amount: Number(form.amount),
      });

      toast.success("Transaction updated");

      navigate("/transactions");
    } catch {
      toast.error("Failed to update transaction");
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-6 py-12">
        Loading transaction...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">

      <div className="mb-8">
        <h1 className="text-3xl font-semibold">
          Edit Transaction
        </h1>

        <p className="text-zinc-400 mt-2">
          Update your transaction details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >

        {/* Amount */}

        <div>
          <label className="block mb-2 text-sm text-zinc-400">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            min="1"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            placeholder="e.g. 1500"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Type */}

        <div>
          <label className="block mb-2 text-sm text-zinc-400">
            Transaction Type
          </label>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3"
          >
            <option value="">Choose transaction type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category */}

        <div>
          <label className="block mb-2 text-sm text-zinc-400">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3"
          >
            <option value="">Choose category</option>

            <optgroup label="Income">
              <option value="salary">Salary</option>
              <option value="freelance">Freelance</option>
              <option value="business">Business</option>
              <option value="investment">Investment</option>
              <option value="bonus">Bonus</option>
              <option value="gift">Gift</option>
              <option value="refund">Refund</option>
              <option value="other-income">Other Income</option>
            </optgroup>

            <optgroup label="Expense">
              <option value="food">Food</option>
              <option value="groceries">Groceries</option>
              <option value="shopping">Shopping</option>
              <option value="travel">Travel</option>
              <option value="transport">Transport</option>
              <option value="fuel">Fuel</option>
              <option value="bills">Bills</option>
              <option value="rent">Rent</option>
              <option value="utilities">Utilities</option>
              <option value="health">Healthcare</option>
              <option value="education">Education</option>
              <option value="entertainment">Entertainment</option>
              <option value="insurance">Insurance</option>
              <option value="subscription">Subscriptions</option>
              <option value="tax">Tax</option>
              <option value="charity">Charity</option>
              <option value="other-expense">Other Expense</option>
            </optgroup>
          </select>
        </div>

        {/* Date */}

        <div>
          <label className="block mb-2 text-sm text-zinc-400">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3"
          />
        </div>

        {/* Description */}

        <div>
          <label className="block mb-2 text-sm text-zinc-400">
            Description
          </label>

          <textarea
            rows={3}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional note (e.g. Dinner with friends)"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 resize-none"
          />
        </div>

        <div className="flex gap-4 pt-2">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 rounded-lg border border-zinc-700 py-3 hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 py-3 font-medium hover:bg-blue-700"
          >
            Update Transaction
          </button>

        </div>

      </form>

    </div>
  );
}