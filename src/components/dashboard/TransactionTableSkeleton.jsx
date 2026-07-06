export default function TransactionTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      {/* Header */}
      <div className="grid grid-cols-6 gap-4 border-b border-white/10 px-5 py-4">
        {[80, 120, 70, 100, 80, 60].map((w, i) => (
          <div
            key={i}
            className="h-4 animate-pulse rounded bg-white/10"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: 8 }).map((_, row) => (
        <div
          key={row}
          className="grid grid-cols-6 items-center gap-4 border-b border-white/5 px-5 py-5"
        >
          <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
          <div className="ml-auto h-8 w-8 animate-pulse rounded-md bg-white/10" />
        </div>
      ))}
    </div>
  );
}
