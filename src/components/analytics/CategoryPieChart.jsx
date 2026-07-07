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
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#84CC16",
];

export default function CategoryPieChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold mb-6">Expense by Category</h2>

        <div className="h-72 flex items-center justify-center text-gray-400">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-semibold mb-6">Expense by Category</h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            outerRadius={110}
            innerRadius={60}
            paddingAngle={3}
            label={({ category, percent }) =>
              `${category} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;

  console.log(payload);

  const item = payload[0].payload;

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 shadow-xl">
      <p className="font-semibold capitalize">{item.category}</p>

      <p className="text-blue-400">
        ₹{Number(item.amount).toLocaleString("en-IN")}
      </p>
    </div>
  );
};
