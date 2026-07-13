import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#2563EB",
  "#1D4ED8",
  "#0EA5E9",
  "#06B6D4",
  "#3B82F6",
  "#2563EB",
];

const formatCurrency = (value) =>
  `₹${Number(value).toLocaleString("en-IN")}`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-[190px] rounded-2xl border border-white/10 bg-zinc-900/95 backdrop-blur-xl p-4 shadow-2xl">
      <p className="mb-3 font-semibold text-white">
        {label}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-400">
          Total Spending
        </span>

        <span className="font-semibold text-white">
          {formatCurrency(payload[0].value)}
        </span>
      </div>
    </div>
  );
};

export default function WeekdaySpendingChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="flex h-[430px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="mb-4 text-6xl">📅</div>

        <h3 className="text-2xl font-semibold">
          No Weekday Data
        </h3>

        <p className="mt-3 max-w-sm text-center text-zinc-400">
          Add more expense transactions to discover your
          weekday spending habits.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[430px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid
            stroke="#27272a"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tick={{
              fill: "#9ca3af",
              fontSize: 12,
            }}
            tickMargin={10}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={{
              fill: "#9ca3af",
              fontSize: 12,
            }}
            tickFormatter={(value) =>
              `₹${(value / 1000).toFixed(0)}k`
            }
            tickMargin={10}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{
              fill: "rgba(59,130,246,0.08)",
            }}
            content={<CustomTooltip />}
          />

          <Bar
            dataKey="amount"
            radius={[12, 12, 0, 0]}
            maxBarSize={42}
            animationDuration={900}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}