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

const BAR_COLOR = "#3B82F6";


const formatCurrency = (value) =>
  `₹${Number(value).toLocaleString("en-IN")}`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 shadow-lg">
      <p className="mb-1 font-medium text-white">{label}</p>

      <p className="text-sm text-zinc-300">Total Spending</p>

      <p className="text-base font-semibold text-white">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
};

export default function WeekdaySpendingChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="flex h-80 items-center justify-center text-sm text-zinc-400">
        No weekday spending available.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid
          vertical={false}
          stroke="#27272a"
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="day"
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

        <Bar
          dataKey="amount"
          radius={[6, 6, 0, 0]}
          maxBarSize={36}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={BAR_COLOR}
              cursor="pointer"
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}