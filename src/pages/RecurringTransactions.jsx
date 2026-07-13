import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CalendarSync, Plus, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import RecurringCard from "../components/recurring/RecurringCard";
import AddRecurringModal from "../components/recurring/AddRecurringModal";
import EditRecurringModal from "../components/recurring/EditRecurringModal";

export default function RecurringTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState(null);

  const navigate = useNavigate();

  const fetchRecurring = async () => {
    try {
      const { data } = await api.get("/recurring");
      setTransactions(data.data);
    } catch {
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
      toast.error(
        error.response?.data?.message || "Generation failed"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}

      <div className="flex flex-col gap-5 mb-10 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Recurring Transactions
          </h1>

          <p className="mt-2 text-gray-500">
            Manage subscriptions, salaries and recurring payments in one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={generateToday}
            className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-3 font-medium text-green-700 transition hover:bg-green-100"
          >
            <RefreshCw size={18} />
            Generate Today
          </button>

          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Recurring
          </button>

        </div>

      </div>

      {/* Empty State */}

      {transactions.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="flex flex-col items-center px-8 py-20 text-center">

            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
              <CalendarSync
                size={38}
                className="text-blue-600"
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900">
              No Recurring Transactions
            </h2>

            <p className="mt-3 max-w-lg text-gray-500">
              Create recurring transactions to automatically track
              subscriptions, salaries, rent and other regular payments.
            </p>

            <button
              onClick={() => setShowAdd(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Create First Recurring
            </button>

          </div>

        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
  );
}