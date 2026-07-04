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

  // ---------------- FETCH SINGLE TRANSACTION ----------------
  const fetchTransaction = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/transactions/${id}`);

      if (data?.data) {
        const t = data.data;

        setForm({
          amount: t.amount || "",
          type: t.type || "",
          category: t.category || "",
          description: t.description || "",
          date: t.date ? t.date.split("T")[0] : "",
        });
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to load transaction");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransaction();
  }, [id]);

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ---------------- UPDATE ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.put(`/transactions/${id}`, {
        ...form,
        type: form.type.toLowerCase(),
      });

      if (data?.success) {
        toast.success("Transaction updated 🚀");

        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        toast.error(data?.message || "Update failed");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Server error");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Loading transaction...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-10">

      <div className="max-w-xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Edit Transaction
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >

          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10"
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
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
          >
            Update Transaction
          </button>

        </form>
      </div>
    </div>
  );
}