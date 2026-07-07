import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import RecurringCard from "../components/recurring/RecurringCard";
import AddRecurringModal from "../components/recurring/AddRecurringModal";
import EditRecurringModal from "../components/recurring/EditRecurringModal";
import { useNavigate } from "react-router-dom";

export default function RecurringTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  const fetchRecurring = async () => {
    try {
      const { data } = await api.get("/recurring");
      setTransactions(data.data);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to load recurring transactions");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRecurring();
  }, []);
  const generateToday = async () => {
    try {
      const { data } = await api.post("/recurring/run");

      toast.success(data.message);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Generation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-5 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold">Recurring Transactions</h1>

            <p className="mt-2 text-zinc-400">
              Manage subscriptions, salaries and other repeating transactions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={generateToday}
              className="rounded-lg border border-green-700 bg-green-600 px-5 py-2.5 hover:bg-green-700"
            >
              Generate Today
            </button>

            <button
              onClick={() => setShowAdd(true)}
              className="rounded-lg bg-blue-600 px-5 py-2.5 hover:bg-blue-700"
            >
              + Add Recurring
            </button>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-3xl">
    ↻
</div>

            <h2 className="text-2xl font-bold">No Recurring Transactions</h2>

            <p className="text-gray-400 mt-2">
              Create recurring transactions to automatically track regular income and expenses.
            </p>

            <button
              onClick={() => setShowAdd(true)}
              className="mt-8 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
            >
              + Create First Recurring
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {transactions.map((item) => (
              <RecurringCard
                key={item._id}
                recurring={item}
                refresh={fetchRecurring}
                onEdit={setEditing}
              />
            ))}
          </div>
        )}

        {showAdd && (
          <AddRecurringModal
            close={() => setShowAdd(false)}
            refresh={fetchRecurring}
          />
        )}

        {editing && (
          <EditRecurringModal
            recurring={editing}
            close={() => setEditing(null)}
            refresh={fetchRecurring}
          />
        )}
      </div>
    </div>
  );
}
