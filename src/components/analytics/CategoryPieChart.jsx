import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#60A5FA",
  "#4ADE80",
  "#FBBF24",
  "#A78BFA",
  "#67E8F9",
  "#F472B6",
  "#F87171",
  "#A3E635",
];

const formatCurrency = (value) =>
  `₹${Number(value).toLocaleString("en-IN")}`;

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;

  return (
    <div className="rounded-md border border-gray-200 bg-white px-4 py-3 shadow-lg">
      <h4 className="text-sm font-medium text-gray-900 capitalize">
        {item.category}
      </h4>

      <div className="mt-2 space-y-1 text-xs">
        <div className="flex justify-between gap-6">
          <span className="text-gray-500">Amount</span>
          <span className="font-medium text-gray-900">
            {formatCurrency(item.amount)}
          </span>
        </div>

        <div className="flex justify-between gap-6">
          <span className="text-gray-500">Share</span>
          <span className="font-medium text-blue-600">
            {item.percent.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default function CategoryPieChart({ data = [] }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data.length) {
    return (
      <div className="flex h-80 items-center justify-center rounded-md border border-gray-200">
        <p className="text-sm text-gray-500">
          No expense data available.
        </p>
      </div>
    );
  }

  const total = data.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const chartData = data.map((item) => ({
    ...item,
    amount: Number(item.amount),
    percent: total ? (Number(item.amount) / total) * 100 : 0,
  }));

  return (
    <div className="rounded-md">
      {/* Summary */}
      <div className="mb-4 text-center">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Total Spent
        </p>

        <h2 className="mt-1 text-2xl font-semibold text-gray-900">
          {formatCurrency(total)}
        </h2>
      </div>

      <div className="h-[460px] sm:h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              cx={isMobile ? "50%" : "35%"}
              cy={isMobile ? "42%" : "50%"}
              innerRadius={isMobile ? 45 : 70}
              outerRadius={isMobile ? 75 : 110}
              paddingAngle={2}
              stroke="#fff"
              strokeWidth={1}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend
              layout={isMobile ? "horizontal" : "vertical"}
              verticalAlign={isMobile ? "bottom" : "middle"}
              align={isMobile ? "center" : "right"}
              iconType="circle"
              iconSize={9}
              wrapperStyle={{
                fontSize: "13px",
                lineHeight: "22px",
                paddingTop: isMobile ? 20 : 0,
              }}
              formatter={(value) => (
                <span className="text-sm text-gray-700 capitalize">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}