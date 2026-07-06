import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import RecurringForm from "./RecurringForm";

export default function EditRecurringModal({ recurring, close, refresh }) {
  const [loading, setLoading] = useState(false);

  const update = async (form) => {
    try {
      setLoading(true);

      await api.put(`/recurring/${recurring._id}`, form);

      toast.success("Recurring transaction updated");

      refresh();

      close();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Recurring Transaction</h2>

          <button
            onClick={close}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <RecurringForm
          initialData={recurring}
          onSubmit={update}
          loading={loading}
        />
      </div>
    </div>
  );
}
