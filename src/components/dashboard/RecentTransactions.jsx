import { formatDate } from "../../utils/date";
import TransactionTableSkeleton from "./TransactionTableSkeleton";

export default function RecentTransactions({ data, loading }) {
  if (loading) {
    return <TransactionTableSkeleton />;
  }

  if (!data.length) {
    return (
      <div className="rounded-md border border-gray-200 bg-white p-8 text-center">
        <p className="text-sm text-gray-500">
          No recent transactions found.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-md border border-gray-200 bg-white shadow md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-300 bg-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="px-4 text-left text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="px-4 text-left text-sm font-semibold text-gray-600">
                  Type
                </th>

                <th className="px-4 text-right text-sm font-semibold text-gray-600">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((t, index) => (
                <tr
                  key={t._id}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                    {formatDate(t.date)}
                  </td>

                  <td className="px-4 capitalize text-gray-700">
                    {t.category}
                  </td>

                  <td className="px-4">
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

                  <td className="px-4 text-right font-semibold text-gray-900">
                    ₹{Number(t.amount).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {data.map((t) => (
          <div
            key={t._id}
            className="rounded-md border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold capitalize text-gray-900">
                  {t.category}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {formatDate(t.date)}
                </p>
              </div>

              <span
                className={`rounded-md px-2 py-1 text-xs font-semibold ${
                  t.type === "income"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {t.type}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">Amount</span>

              <span className="text-base font-semibold text-gray-900">
                ₹{Number(t.amount).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}