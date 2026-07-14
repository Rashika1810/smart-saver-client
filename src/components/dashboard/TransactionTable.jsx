import { toast } from "react-toastify";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../common/ConfirmModal";
import { formatDate } from "../../utils/date";
import Button from "../ui/Button";
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
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div
          className={`max-h-[560px] overflow-auto transition-opacity duration-300 ${
            pageLoading ? "opacity-60" : "opacity-100"
          }`}
        >
          <table className="min-w-full">
            <thead className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Description
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((t) => (
                <tr
                  key={t._id}
                  className="border-b border-gray-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {formatDate(t.date)}
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    ₹{Number(t.amount).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        t.type === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>

                  <td className="px-6 py-4 capitalize text-gray-700">
                    {t.category}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {t.description || "—"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleEdit(t._id)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => setDeleteId(t._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
          <Button
            variant="secondary"
            disabled={page === 1 || pageLoading}
            onClick={() => setPage(page - 1)}
          >
            ← Previous
          </Button>

          <div className="text-sm text-gray-500">
            Page{" "}
            <span className="font-semibold text-gray-900">
              {pagination.page}
            </span>{" "}
            of {pagination.pages}
          </div>

          <Button
            variant="info"
            disabled={page === pagination.pages || pageLoading}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </Button>
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
