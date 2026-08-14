import { toast } from "react-toastify";
import {
  CalendarDays,
  Pencil,
  Power,
  Trash2,
} from "lucide-react";

import api from "../../api/axios";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getFrequencyLabel(recurring) {
  switch (recurring.frequency) {
    case "daily":
      return "Daily";

    case "weekly":
      return "Weekly";

    case "monthly":
      return "Monthly";

    case "yearly":
      return "Yearly";

    case "custom": {
      const days = (recurring.daysOfWeek || [])
        .slice()
        .sort((a, b) => a - b)
        .map((day) => DAYS[day]);

      return days.length ? days.join(", ") : "Specific Days";
    }

    default:
      return recurring.frequency;
  }
}

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

  const isIncome = recurring.type === "income";

  return (
    <div className="w-full max-w-md rounded-md border border-gray-200 bg-white p-4 transition-shadow duration-200 hover:shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-gray-900">
            {recurring.description || recurring.category}
          </h2>

          <p className="mt-0.5 text-xs capitalize text-gray-500">
            {recurring.category}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-medium ${
            recurring.active
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {recurring.active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Main information */}
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400">Amount</p>

          <p
            className={`mt-0.5 text-2xl font-semibold tracking-tight ${
              isIncome ? "text-green-600" : "text-gray-900"
            }`}
          >
            ₹{Number(recurring.amount).toLocaleString("en-IN")}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">Frequency</p>

          <p className="mt-0.5 max-w-[170px] text-sm font-medium text-gray-800">
            {getFrequencyLabel(recurring)}
          </p>
        </div>
      </div>

      {/* Start date */}
      <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">
        <CalendarDays size={14} className="text-gray-400" />

        <span className="text-xs text-gray-500">
          Starts
        </span>

        <span className="text-xs font-medium text-gray-800">
          {formatDate(recurring.startDate)}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-3 flex justify-end gap-1.5">
        <button
          onClick={() => onEdit(recurring)}
          title="Edit"
          className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
        >
          <Pencil size={15} />
        </button>

        <button
          onClick={toggleStatus}
          title={recurring.active ? "Disable" : "Enable"}
          className={`rounded-md p-2 transition ${
            recurring.active
              ? "text-amber-600 hover:bg-amber-50"
              : "text-green-600 hover:bg-green-50"
          }`}
        >
          <Power size={15} />
        </button>

        <button
          onClick={deleteRecurring}
          title="Delete"
          className="rounded-md p-2 text-red-500 transition hover:bg-red-50"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}