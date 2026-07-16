import { useState } from "react";
import {
  Calendar,
  IndianRupee,
  FileText,
  Layers,
  Repeat,
  Tag,
} from "lucide-react";
import Button from "../ui/Button";
import { expenseCategories, incomeCategories } from "../../utils/categories";

const initialState = {
  amount: "",
  type: "expense",
  category: "",
  description: "",
  frequency: "monthly",
  startDate: new Date().toISOString().split("T")[0],
};

export default function RecurringForm({ initialData, onSubmit, loading }) {
  const [form, setForm] = useState(initialData || initialState);

  const categories =
    form.type === "income" ? incomeCategories : expenseCategories;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && { category: "" }),
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass =
    "w-full h-12 rounded-md border border-gray-300 bg-white px-4 text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const textareaClass =
    "w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none transition resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Amount & Type */}

      <div className="grid gap-5 md:grid-cols-2">
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

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Layers size={16} />
            Transaction Type
          </label>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
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
          className={inputClass}
        >
          <option value="">Choose a category</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
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
          placeholder="Example: Netflix subscription"
          value={form.description}
          onChange={handleChange}
          className={textareaClass}
        />
      </div>

      {/* Frequency & Start Date */}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Repeat size={16} />
            Repeat Every
          </label>

          <select
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Calendar size={16} />
            Start Date
          </label>

          <input
            type="date"
            name="startDate"
            value={form.startDate?.split("T")[0]}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" loading={loading} variant="info" className="w-full">
        Save Recurring Transaction
      </Button>
    </form>
  );
}
