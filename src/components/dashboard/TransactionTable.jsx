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

      refresh();
      await refreshSummary();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-transaction/${id}`);
  };

  return (
    <>
      <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-xl">
        {/* Loading Overlay */}

        {/* Only table scrolls */}
        <div
          className={`max-h-[560px] overflow-auto transition-opacity duration-300 ${
            pageLoading ? "opacity-60" : "opacity-100"
          }`}
        >
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-gray-900 z-10 border-b border-white/10">
              <tr>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4 text-right">Amount</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((t) => (
                <tr
                  key={t._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
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

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(t._id)}
                        className="text-blue-400 hover:text-blue-300 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteId(t._id)}
                        className="text-red-400 hover:text-red-300 transition"
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
        <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 bg-black/20">
          <button
            disabled={page === 1 || pageLoading}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="px-5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
