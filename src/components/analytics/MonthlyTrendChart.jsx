import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Area,
  ComposedChart,
} from "recharts";

const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  // Keep only the Line entries (ignore Area entries)
  const uniquePayload = payload.filter(
    (entry) => entry.stroke && entry.stroke !== "none",
  );

  return (
    <div className="min-w-[190px] rounded-md border border-gray-200 bg-white px-4 py-3 shadow-md">
      <p className="mb-3 text-sm font-medium text-gray-900">{label}</p>

      <div className="space-y-2">
        {uniquePayload.map((entry) => (
          <div
            key={entry.dataKey}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: entry.stroke,
                }}
              />

              <span className="text-xs text-gray-600">{entry.name}</span>
            </div>

            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default function MonthlyTrendChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="flex h-[420px] flex-col items-center justify-center rounded-md border border-gray-200 bg-gray-50">
        <div className="text-5xl">📈</div>

        <h3 className="mt-3 text-lg font-semibold text-gray-900">
          No Monthly Data
        </h3>

        <p className="mt-2 max-w-sm text-center text-sm text-gray-500">
          Add income and expense transactions to visualize monthly trends.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 12,
            right: 18,
            left: 8,
            bottom: 8,
          }}
        >
          <defs>
            <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity={0.12} />

              <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.12} />

              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#E5E7EB"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tick={{
              fill: "#6B7280",
              fontSize: 12,
            }}
            tickMargin={8}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={{
              fill: "#6B7280",
              fontSize: 12,
            }}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            tickMargin={8}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{
              stroke: "#CBD5E1",
              strokeWidth: 1,
            }}
            content={<CustomTooltip />}
          />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              paddingBottom: 14,
              color: "#374151",
              fontSize: "13px",
            }}
          />

          <Area
            type="natural"
            dataKey="income"
            fill="url(#incomeFill)"
            stroke="none"
            legendType="none"
            isAnimationActive={false}
          />
          <Area
            type="natural"
            dataKey="expense"
            fill="url(#expenseFill)"
            stroke="none"
            legendType="none"
            isAnimationActive={false}
          />
          <Line
            type="natural"
            dataKey="income"
            name="Income"
            stroke="#22C55E"
            strokeWidth={2.25}
            dot={false}
            activeDot={{
              r: 4,
              fill: "#22C55E",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            animationDuration={500}
          />

          <Line
            type="natural"
            dataKey="expense"
            name="Expense"
            stroke="#3B82F6"
            strokeWidth={2.25}
            dot={false}
            activeDot={{
              r: 4,
              fill: "#3B82F6",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            animationDuration={500}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
