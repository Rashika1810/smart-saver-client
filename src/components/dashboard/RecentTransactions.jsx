import { formatDate } from "./../../utils/date";
import TransactionTableSkeleton from "./TransactionTableSkeleton";

export default function RecentTransactions({ data, loading }) {
  if (loading) {
    return <TransactionTableSkeleton />;
  }

  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="sticky top-0 z-10 border-b border-gray-300 bg-gray-100">
            <tr>
              <th className="py-4 px-2 text-left text-sm font-semibold text-gray-600">
                Date
              </th>

              <th className="px-2 text-left text-sm font-semibold text-gray-600">
                Category
              </th>

              <th className="px-2 text-left text-sm font-semibold text-gray-600">
                Type
              </th>

              <th className="px-2 text-right text-sm font-semibold text-gray-600">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((t, index) => (
              <tr
                key={t._id}
                className={`border-b border-gray-200 transition-colors duration-200 ${
                  index % 2 === 0
                    ? "bg-white hover:bg-gray-100"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <td className="py-4 px-2 whitespace-nowrap text-gray-700">
                  {formatDate(t.date)}
                </td>

                <td className="px-2 capitalize text-gray-700">
                  {t.category}
                </td>

                <td className="px-2">
                  <span
                    className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${
                      t.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>

                <td className="px-2 text-right font-semibold text-gray-900">
                  ₹{Number(t.amount).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}