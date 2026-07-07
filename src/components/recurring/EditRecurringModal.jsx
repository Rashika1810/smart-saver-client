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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <h2 className="text-xl font-semibold"> Recurring Transaction</h2>

          <button
            onClick={close}
            className="text-zinc-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-72px)] p-6">
          <RecurringForm
            initialData={recurring}
            onSubmit={update}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
