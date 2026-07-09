import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const formatCurrency = (value) =>
  `₹${Number(value).toLocaleString("en-IN")}`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 shadow-lg">
      <p className="mb-2 text-sm font-medium text-white">{label}</p>

      {payload.map((entry) => (
        <div
          key={entry.dataKey}
          className="flex items-center justify-between gap-6 text-sm"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-zinc-300 capitalize">
              {entry.dataKey}
            </span>
          </div>

          <span className="font-medium text-white">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function MonthlyTrendChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="flex h-80 items-center justify-center text-sm text-zinc-400">
        No monthly data available.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid
          stroke="#27272a"
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="month"
          tick={{ fill: "#a1a1aa", fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          tick={{ fill: "#a1a1aa", fontSize: 12 }}
          tickFormatter={(value) =>
            `₹${Number(value / 1000).toFixed(0)}k`
          }
          tickLine={false}
          axisLine={false}
        />

        <Tooltip content={<CustomTooltip />} />

        <Legend
          verticalAlign="top"
          align="right"
          iconType="circle"
          wrapperStyle={{
            paddingBottom: "12px",
          }}
        />

        <Line
          type="monotone"
          dataKey="income"
          name="Income"
          stroke="#22c55e"
          strokeWidth={2.5}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />

        <Line
          type="monotone"
          dataKey="expense"
          name="Expense"
          stroke="#3b82f6"
          strokeWidth={2.5}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}