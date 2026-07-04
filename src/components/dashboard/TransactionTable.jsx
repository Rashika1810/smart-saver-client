import { toast } from "react-toastify";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function TransactionTable({ data, refresh }) {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      toast.success("Deleted");
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
                  onClick={() => handleDelete(t._id)}
                  className="text-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
