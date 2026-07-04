import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";

const initialState = {
  amount: "",
  type: "",
  category: "",
  description: "",
  date: "",
};

export default function AddTransaction() {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/transactions", {
        ...form,
        type: form.type.toLowerCase(),
      });

      if (data?.success) {
        toast.success("Transaction added successfully 🚀");

        setForm(initialState);

        toast.success("Transaction added 🚀");

        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        toast.error(data?.message || "Failed to add transaction");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add Transaction</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10"
            required
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10"
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
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10"
            required
          >
            <option value="">Category</option>
            <option value="salary">Salary</option>
            <option value="food">Food</option>
            <option value="bills">Bills</option>
            <option value="travel">Travel</option>
            <option value="other">Other</option>
          </select>

          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10"
          />

          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
          >
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
