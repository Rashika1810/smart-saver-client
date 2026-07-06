import { toast } from "react-toastify";
import api from "../../api/axios";

export default function RecurringCard({ recurring, refresh, onEdit }) {
  const deleteRecurring = async () => {
    if (!window.confirm("Delete this recurring transaction?")) return;

    try {
      await api.delete(`/recurring/${recurring._id}`);

      toast.success("Deleted");

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

  const frequencyIcon = {
    daily: "📅",
    weekly: "🗓️",
    monthly: "📆",
    yearly: "🎉",
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-blue-500 transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold">
            {recurring.description || recurring.category}
          </h2>

          <p className="text-gray-400 capitalize">{recurring.category}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            recurring.active
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {recurring.active ? "🟢 Active" : "🔴 Disabled"}
        </span>
      </div>

      <div className="mt-6 flex justify-between">
        <div>
          <p className="text-gray-500 text-sm">Amount</p>

          <h3 className="text-3xl font-bold mt-1">₹{recurring.amount}</h3>
        </div>

        <div className="text-right">
          <p
            className={`font-semibold ${
              recurring.type === "income" ? "text-green-400" : "text-red-400"
            }`}
          >
            {recurring.type}
          </p>

          <p className="text-gray-400 mt-2">
            {frequencyIcon[recurring.frequency]} {recurring.frequency}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Starts</span>

          <span>{formatDate(recurring.startDate)}</span>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          onClick={() => onEdit(recurring)}
          className="flex-1 rounded-xl bg-blue-600 py-2 hover:bg-blue-700 transition"
        >
          Edit
        </button>

        <button
          onClick={toggleStatus}
          className="flex-1 rounded-xl bg-yellow-600 py-2 hover:bg-yellow-700 transition"
        >
          {recurring.active ? "Disable" : "Enable"}
        </button>

        <button
          onClick={deleteRecurring}
          className="flex-1 rounded-xl bg-red-600 py-2 hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
