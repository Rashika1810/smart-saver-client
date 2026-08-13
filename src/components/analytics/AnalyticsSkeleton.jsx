export function AnalyticsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="h-9 w-40 animate-pulse rounded-md bg-gray-200" />
          <div className="h-4 w-96 max-w-full animate-pulse rounded bg-gray-100" />
        </div>

        <div className="flex gap-3">
          <div className="h-12 w-36 animate-pulse rounded-md bg-gray-100" />
          <div className="h-12 w-28 animate-pulse rounded-md bg-gray-100" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                <div className="h-9 w-9 animate-pulse rounded-md bg-gray-100" />
              </div>

              <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />

              <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        {/* Chart Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-80 animate-pulse rounded bg-gray-100" />
          </div>

          <div className="h-12 w-40 animate-pulse rounded-md bg-gray-100" />
        </div>

        {/* Chart */}
        <div className="space-y-5">
          {/* Y-axis labels */}
          <div className="flex items-end gap-4">
            <div className="flex h-80 w-10 flex-col justify-between">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-3 w-8 animate-pulse rounded bg-gray-100"
                />
              ))}
            </div>

            {/* Chart area */}
            <div className="relative h-80 flex-1 overflow-hidden">
              {/* Horizontal grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-px w-full bg-gray-100"
                  />
                ))}
              </div>

              {/* Fake chart bars */}
              <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-around px-8">
                {[45, 65, 35, 75, 55, 85, 50, 70, 40, 60, 80, 55].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="w-4 animate-pulse rounded-t bg-gray-200"
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>
            </div>
          </div>

          {/* X-axis */}
          <div className="ml-14 flex justify-around">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-3 w-12 animate-pulse rounded bg-gray-100"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}