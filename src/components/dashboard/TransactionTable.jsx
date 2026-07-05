import { toast } from "react-toastify";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../common/ConfirmModal";

export default function TransactionTable({ data, refresh }) {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = async () => {
    try {
      await api.delete(`/transactions/${deleteId}`);

      toast.success("Transaction deleted successfully.");

      setDeleteId(null);

      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };
  const handleEdit = (id) => {
    navigate(`/edit-transaction/${id}`);
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full text-left border border-white/10">
        <thead className="bg-white/5">
          <tr>
            <th className="p-3">Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((t) => (
            <tr key={t._id} className="border-t border-white/10">
              <td className="p-3">{t.date}</td>

              <td className="p-3">₹{t.amount}</td>

              <td
                className={
                  t.type === "income" ? "text-green-400" : "text-red-400"
                }
              >
                {t.type}
              </td>

              <td>{t.category}</td>

              <td>{t.description}</td>

              <td className="flex gap-2 p-3">
                <button
                  className="text-blue-400"
                  onClick={() => handleEdit(t._id)}
                >
                  Edit
                </button>

                <button
                  onClick={() => setDeleteId(t._id)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
