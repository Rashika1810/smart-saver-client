import { formatDate } from "../../utils/date";

export default function RecentTransactions({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/10 text-gray-400">
            <th className="py-3">Date</th>

            <th>Category</th>

            <th>Type</th>

            <th className="text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {data.map((t) => (
            <tr
              key={t._id}
              className="border-b border-white/5"
            >
              <td className="py-4">{formatDate(t.date)}</td>

              <td className="capitalize">{t.category}</td>

              <td
                className={
                  t.type === "income" ? "text-green-400" : "text-red-400"
                }
              >
                {t.type}
              </td>

              <td className="text-right font-semibold"
              >
                ₹{Number(t.amount).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
