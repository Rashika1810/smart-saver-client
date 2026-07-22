import { useState } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";

import api from "../../api/axios";
import Loader from "../ui/Loader";
import RecurringForm from "./RecurringForm";

export default function EditRecurringModal({ recurring, close, refresh }) {
  const [loading, setLoading] = useState(false);

  const update = async (form) => {
    if (loading) return;

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
    <>
      {loading && <Loader />}

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
        <div className="w-full max-w-2xl overflow-hidden rounded-md border border-gray-200 bg-white shadow-md">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Recurring Transaction
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Update your recurring transaction details.
              </p>
            </div>

            <button
              type="button"
              onClick={close}
              disabled={loading}
              className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="max-h-[80vh] overflow-y-auto p-6">
            <RecurringForm
              initialData={recurring}
              onSubmit={update}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
