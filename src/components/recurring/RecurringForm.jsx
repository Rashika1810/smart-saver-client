import { useState } from "react";

const initialState = {
  amount: "",
  type: "expense",
  category: "",
  description: "",
  frequency: "daily",
  startDate: new Date().toISOString().split("T")[0],
};

export default function RecurringForm({ initialData, onSubmit, loading }) {
  const [form, setForm] = useState(initialData || initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
      />

      <select
        name="frequency"
        value={form.frequency}
        onChange={handleChange}
        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <input
        type="date"
        name="startDate"
        value={form.startDate?.split("T")[0]}
        onChange={handleChange}
        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
      />

      <button
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
