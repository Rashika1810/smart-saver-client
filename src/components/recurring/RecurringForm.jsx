import { useState } from "react";

const initialState = {
  amount: "",
  type: "expense",
  category: "",
  description: "",
  frequency: "monthly",
  startDate: new Date().toISOString().split("T")[0],
};

export default function RecurringForm({
  initialData,
  onSubmit,
  loading,
}) {
  const [form, setForm] = useState(initialData || initialState);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">

      {/* Amount + Type */}

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-2 text-sm text-zinc-400">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            min="1"
            step="0.01"
            placeholder="e.g. 999"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-zinc-400">
            Transaction Type
          </label>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

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
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5"
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
            <option value="subscription">Subscription</option>
            <option value="tax">Tax</option>
            <option value="charity">Charity</option>
            <option value="other-expense">Other Expense</option>
          </optgroup>
        </select>
      </div>

      {/* Description */}

      <div>
        <label className="block mb-2 text-sm text-zinc-400">
          Description
        </label>

        <textarea
          rows={2}
          name="description"
          placeholder="Example: Netflix subscription"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 resize-none"
        />
      </div>

      {/* Frequency + Date */}

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-2 text-sm text-zinc-400">
            Repeat Every
          </label>

          <select
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5"
          >
            <option value="daily">Day</option>
            <option value="weekly">Week</option>
            <option value="monthly">Month</option>
            <option value="yearly">Year</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm text-zinc-400">
            Start Date
          </label>

          <input
            type="date"
            name="startDate"
            value={form.startDate?.split("T")[0]}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5"
          />
        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-2.5 font-medium hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Recurring Transaction"}
      </button>

    </form>
  );
}