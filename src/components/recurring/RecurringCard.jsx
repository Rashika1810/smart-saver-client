import { toast } from "react-toastify";
import {
  CalendarDays,
  IndianRupee,
  Pencil,
  Power,
  Trash2,
} from "lucide-react";

import api from "../../api/axios";

export default function RecurringCard({
  recurring,
  refresh,
  onEdit,
}) {
  const deleteRecurring = async () => {
    if (!window.confirm("Delete this recurring transaction?")) return;

    try {
      await api.delete(`/recurring/${recurring._id}`);

      toast.success("Recurring transaction deleted");

      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  const toggleStatus = async () => {
    try {
      await api.put(`/recurring/${recurring._id}`, {
        active: !recurring.active,
      });

      refresh();
    } catch {
      toast.error("Update failed");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="w-full max-w-sm rounded-md border border-gray-200 bg-white p-4 transition-shadow duration-200 hover:shadow-sm">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>
          <h2 className="text-base font-semibold text-gray-900">
            {recurring.description || recurring.category}
          </h2>

          <p className="mt-1 capitalize text-sm text-gray-500">
            {recurring.category}
          </p>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            recurring.active
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {recurring.active ? "Active" : "Inactive"}
        </span>

      </div>


      {/* Amount */}
      <div className="mt-4 flex items-center gap-2">

        <IndianRupee
          size={16}
          className="text-blue-600"
        />

        <div>
          <p className="text-xs text-gray-500">
            Amount
          </p>

          <h3 className="text-xl font-semibold text-gray-900">
            ₹{Number(recurring.amount).toLocaleString()}
          </h3>
        </div>

      </div>


      {/* Details */}
      <div className="mt-4 space-y-2 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-500">
            Type
          </span>

          <span
            className={`font-medium ${
              recurring.type === "income"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {recurring.type}
          </span>
        </div>


        <div className="flex justify-between">
          <span className="text-gray-500">
            Frequency
          </span>

          <span className="capitalize font-medium text-gray-800">
            {recurring.frequency}
          </span>
        </div>


        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1 text-gray-500">
            <CalendarDays size={14} />
            Starts
          </span>

          <span className="font-medium text-gray-800">
            {formatDate(recurring.startDate)}
          </span>
        </div>

      </div>


      {/* Actions */}
      <div className="mt-4 flex justify-end gap-2">

        <button
          onClick={() => onEdit(recurring)}
          title="Edit"
          className="rounded-md border border-gray-300 p-2 text-gray-600 transition hover:bg-gray-100"
        >
          <Pencil size={16} />
        </button>


        <button
          onClick={toggleStatus}
          title={recurring.active ? "Disable" : "Enable"}
          className={`rounded-md p-2 transition ${
            recurring.active
              ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          <Power size={16} />
        </button>


        <button
          onClick={deleteRecurring}
          title="Delete"
          className="rounded-md bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={16} />
        </button>

      </div>

    </div>
  );
}