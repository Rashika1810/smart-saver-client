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

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900 p-6 hover:border-zinc-700 transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">
            {recurring.description || recurring.category}
          </h2>

          <p className="capitalize text-zinc-400">{recurring.category}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium
${
  recurring.active
    ? "bg-green-500/10 text-green-400"
    : "bg-zinc-700 text-zinc-400"
}`}
        >
          {recurring.active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-6 flex justify-between">
        <div>
          <p className="text-gray-500 text-sm">Amount</p>

          <h3 className="text-3xl font-bold mt-1">
            ₹{Number(recurring.amount).toLocaleString()}
          </h3>
        </div>

        <div className="text-right">
          <p
            className={`font-semibold ${recurring.type.charAt(0).toUpperCase() + recurring.type.slice(1)}`}
          >
            {recurring.type}
          </p>

          <p className="text-zinc-400 text-sm mt-2">
            Repeats {recurring.frequency}
          </p>
        </div>
      </div>

      <div className="flex justify-between text-sm border-t border-zinc-800 pt-4 mt-5">
        <span className="text-zinc-500">Starts</span>

        <span>{formatDate(recurring.startDate)}</span>
      </div>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => onEdit(recurring)}
          className="rounded-lg px-4 py-2 text-sm bg-zinc-700 hover:bg-zinc-600"
        >
          Edit
        </button>

        <button onClick={toggleStatus} className="rounded-lg px-4 py-2 text-sm bg-zinc-700 hover:bg-zinc-600 ">
          {recurring.active ? "Disable" : "Enable"}
        </button>

        <button
          onClick={deleteRecurring}
          className="rounded-lg px-4 py-2 text-sm bg-red-600 hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
