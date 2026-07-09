import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
  "#EF4444",
  "#14B8A6",
  "#84CC16",
];

const formatCurrency = (value) =>
  `₹${Number(value).toLocaleString("en-IN")}`;

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 shadow-lg">
      <p className="mb-1 font-medium text-white capitalize">
        {item.category}
      </p>

      <p className="text-sm text-zinc-300">
        Amount
      </p>

      <p className="text-base font-semibold text-white">
        {formatCurrency(item.amount)}
      </p>
    </div>
  );
};

export default function CategoryPieChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="flex h-80 items-center justify-center text-sm text-zinc-400">
        No category data available.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="category"
          innerRadius={65}
          outerRadius={90}
          paddingAngle={2}
          stroke="none"
          label={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.category}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />

        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconType="circle"
          iconSize={10}
          wrapperStyle={{
            fontSize: "13px",
            color: "#d4d4d8",
            paddingLeft: "20px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}