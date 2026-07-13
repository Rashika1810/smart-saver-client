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
  "#EC4899",
  "#EF4444",
  "#84CC16",
];

const formatCurrency = (value) =>
  `₹${Number(value).toLocaleString("en-IN")}`;

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111827]/95 backdrop-blur-xl px-5 py-4 shadow-2xl">
      <h4 className="font-semibold capitalize text-white">
        {item.category}
      </h4>

      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-8">
          <span className="text-gray-400">Amount</span>

          <span className="font-semibold text-white">
            {formatCurrency(item.amount)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-8">
          <span className="text-gray-400">Share</span>

          <span className="font-semibold text-blue-400">
            {item.percent.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default function CategoryPieChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="flex h-[380px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="text-6xl">📊</div>

        <h3 className="mt-5 text-2xl font-semibold text-white">
          No Category Data
        </h3>

        <p className="mt-2 max-w-sm text-center text-gray-400">
          Once you add expense transactions, you'll see a visual
          breakdown of your spending by category.
        </p>
      </div>
    );
  }

  const total = data.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  const chartData = data.map((item) => ({
    ...item,
    percent: (item.amount / total) * 100,
  }));

  return (
    <div className="h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="category"
            cx="38%"
            cy="50%"
            innerRadius={78}
            outerRadius={118}
            paddingAngle={3}
            stroke="rgba(255,255,255,.08)"
            strokeWidth={2}
            animationDuration={900}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={entry.category}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            iconSize={12}
            wrapperStyle={{
              color: "#d1d5db",
              fontSize: "14px",
              lineHeight: "30px",
            }}
            formatter={(value) => (
              <span className="capitalize text-gray-300">
                {value}
              </span>
            )}
          />

          <text
            x="38%"
            y="47%"
            textAnchor="middle"
            fill="#9CA3AF"
            fontSize="13"
          >
            Total Spent
          </text>

          <text
            x="38%"
            y="55%"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="22"
            fontWeight="700"
          >
            {formatCurrency(total)}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}