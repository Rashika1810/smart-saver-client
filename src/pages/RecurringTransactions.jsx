import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CalendarSync, Plus, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import RecurringCard from "../components/recurring/RecurringCard";
import AddRecurringModal from "../components/recurring/AddRecurringModal";
import EditRecurringModal from "../components/recurring/EditRecurringModal";
import Button from "../components/ui/Button";

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
      toast.error(error.response?.data?.message || "Generation failed");
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
       <div>
  <h1 className="header-title">Recurring Transactions</h1>

  <p className="mt-2 text-sm max-w-2xl text-gray-500">
    Manage recurring cash transactions like salaries, rent, and regular
    payments. Online transactions are managed through imported PhonePe
    statements.
  </p>
</div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="success"
            icon={<RefreshCw size={18} />}
            onClick={generateToday}
          >
            Generate Today
          </Button>

          <Button
            variant="info"
            icon={<Plus size={18} />}
            onClick={() => setShowAdd(true)}
          >
            Add Recurring
          </Button>
        </div>
      </div>

      {/* Empty State */}
      {transactions.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
              <CalendarSync size={38} className="text-blue-600" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900">
              No Recurring Transactions
            </h2>

            <p className="mt-3 max-w-lg text-gray-500 text-base">
              Create recurring transactions to automatically track
              subscriptions, salaries, rent, EMIs, and other regular payments.
            </p>

            <Button
              variant="info"
              className="mt-8"
              icon={<Plus size={18} />}
              onClick={() => setShowAdd(true)}
            >
              Create First Recurring
            </Button>
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
