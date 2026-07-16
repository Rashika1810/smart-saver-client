export default function TransactionTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="w-full table-fixed">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-4"></th>
            <th className="px-6 py-4"></th>
            <th className="px-6 py-4"></th>
            <th className="px-6 py-4"></th>
            <th className="px-6 py-4"></th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 8 }).map((_, i) => (
            <tr
              key={i}
              className={`border-b border-gray-100 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="px-6 py-5">
                <div className="h-4 w-32 rounded bg-gray-200" />
              </td>

              <td className="px-6 py-5">
                <div className="h-4 w-24 rounded bg-gray-200" />
              </td>

              <td className="px-6 py-5">
                <div className="h-6 w-20 rounded-full bg-gray-200" />
              </td>

              <td className="px-6 py-5">
                <div className="h-4 w-24 rounded bg-gray-200" />
              </td>

              <td className="px-6 py-5">
                <div className="h-4 w-28 rounded bg-gray-200" />
              </td>

              <td className="px-6 py-5">
                <div className="flex justify-end gap-2">
                  <div className="h-8 w-8 rounded-md bg-gray-200" />
                  <div className="h-8 w-8 rounded-md bg-gray-200" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}