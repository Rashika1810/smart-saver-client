export default function TransactionTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 border-b border-gray-200 px-6 py-4">
        {[90, 120, 80, 120, 100, 80].map((width, index) => (
          <div
            key={index}
            className="h-4 animate-pulse rounded bg-gray-200"
            style={{ width: `${width}px` }}
          />
        ))}
      </div>

      {/* Table Rows */}
      {Array.from({ length: 8 }).map((_, row) => (
        <div
          key={row}
          className="grid grid-cols-6 items-center gap-4 border-b border-gray-100 px-6 py-5 last:border-b-0"
        >
          <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />

          <div className="flex justify-end gap-2">
            <div className="h-9 w-16 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-9 w-16 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}