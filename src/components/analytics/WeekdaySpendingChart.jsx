import { useEffect, useState } from "react";
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
  "#60A5FA",
  "#3B82F6",
  "#2563EB",
  "#1D4ED8",
  "#0EA5E9",
  "#38BDF8",
  "#7DD3FC",
];

const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="min-w-[170px] rounded-md border border-gray-200 bg-white px-4 py-3 shadow-lg">
      <p className="mb-2 text-sm font-medium text-gray-900">{label}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Total Spending</span>

        <span className="text-sm font-semibold text-gray-900">
          {formatCurrency(payload[0].value)}
        </span>
      </div>
    </div>
  );
};

export default function WeekdaySpendingChart({ data = [] }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!data.length) {
    return (
      <div className="flex h-72 flex-col items-center justify-center rounded-md border border-gray-200 bg-gray-50">
        <div className="text-5xl">📅</div>

        <h3 className="mt-3 text-lg font-semibold text-gray-900">
          No Weekday Data
        </h3>

        <p className="mt-2 max-w-sm text-center text-sm text-gray-500 px-4">
          Add expense transactions to discover your weekday spending habits.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[300px] sm:h-[360px] lg:h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 12,
            right: isMobile ? 8 : 16,
            left: isMobile ? 0 : 8,
            bottom: 8,
          }}
        >
          <CartesianGrid
            stroke="#E5E7EB"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tick={{
              fill: "#6B7280",
              fontSize: isMobile ? 10 : 12,
            }}
            tickMargin={8}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            width={isMobile ? 35 : 50}
            tick={{
              fill: "#6B7280",
              fontSize: isMobile ? 10 : 12,
            }}
            tickFormatter={(value) =>
              value >= 1000 ? `₹${(value / 1000).toFixed(0)}k` : `₹${value}`
            }
            tickMargin={6}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            cursor={{
              fill: "rgba(59,130,246,0.06)",
            }}
            content={<CustomTooltip />}
          />

          <Bar
            dataKey="amount"
            radius={[4, 4, 0, 0]}
            maxBarSize={isMobile ? 24 : 36}
            animationDuration={500}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.day ?? index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
