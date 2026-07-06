import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import RecurringForm from "./RecurringForm";

export default function AddRecurringModal({ close, refresh }) {
  const [loading, setLoading] = useState(false);

  const save = async (form) => {
    try {
      setLoading(true);

      await api.post("/recurring", form);

      toast.success("Recurring transaction added");

      refresh();

      close();
    } catch {
      toast.error("Failed to create recurring transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Recurring Transaction</h2>

          <button
            onClick={close}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <RecurringForm onSubmit={save} loading={loading} />
      </div>
    </div>
  );
}
