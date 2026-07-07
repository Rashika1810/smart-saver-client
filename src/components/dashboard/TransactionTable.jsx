import { toast } from "react-toastify";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../common/ConfirmModal";
import { formatDate } from "../../utils/date";

export default function TransactionTable({
  data,
  refresh,
  refreshSummary,
  page,
  setPage,
  pagination,
  pageLoading,
}) {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    try {
      await api.delete(`/transactions/${deleteId}`);

      toast.success("Transaction deleted successfully.");

      setDeleteId(null);

      await Promise.all([refresh(), refreshSummary?.()]);
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-transaction/${id}`);
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        {/* Loading Overlay */}

        {/* Only table scrolls */}
        <div
          className={`max-h-[560px] overflow-auto transition-opacity duration-300 ${
            pageLoading ? "opacity-60" : "opacity-100"
          }`}
        >
          <table className="w-full text-left">
            <thead className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-gray-400">
                  Date
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-400 text-right">
                  Amount
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-400">
                  Type
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-400">
                  Category
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-400">
                  Description
                </th>
                <th className="px-5 py-4 text-sm font-semibold text-gray-400 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((t) => (
                <tr
                  key={t._id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-5 py-4 whitespace-nowrap">
                    {formatDate(t.date)}
                  </td>

                  <td className="px-5 py-4 text-right font-semibold">
                    ₹{Number(t.amount).toLocaleString()}
                  </td>

                  <td
                    className={`px-5 py-4 font-medium ${
                      t.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {t.type}
                  </td>

                  <td className="px-5 py-4 capitalize">{t.category}</td>

                  <td className="px-5 py-4 text-gray-300">
                    {t.description || "—"}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-gray-400">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(t._id)}
                        className="rounded-md border border-blue-500/30 px-3 py-1 text-sm text-blue-400 hover:bg-blue-500/10"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteId(t._id)}
                        className="rounded-md border border-red-500/30 px-3 py-1 text-sm text-red-400 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 bg-zinc-900">
          <button
            disabled={page === 1 || pageLoading}
            onClick={() => setPage(page - 1)}
            className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          <div className="text-sm text-gray-300">
            <span className="font-semibold text-white">{pagination.page}</span>{" "}
            / {pagination.pages}
          </div>

          <button
            disabled={page === pagination.pages || pageLoading}
            onClick={() => setPage(page + 1)}
            className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
