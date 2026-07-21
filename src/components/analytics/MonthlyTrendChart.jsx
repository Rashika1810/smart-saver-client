import { useEffect, useState } from "react";
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

const formatCurrency = (value) =>
  `₹${Number(value).toLocaleString("en-IN")}`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const uniquePayload = payload.filter(
    (entry) => entry.stroke && entry.stroke !== "none"
  );

  return (
    <div className="min-w-[180px] rounded-md border border-gray-200 bg-white px-4 py-3 shadow-lg">
      <p className="mb-3 text-sm font-medium text-gray-900">
        {label}
      </p>

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

              <span className="text-xs text-gray-600">
                {entry.name}
              </span>
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
  const [isMobile, setIsMobile] = useState(false);

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
        <div className="text-5xl">📈</div>

        <h3 className="mt-3 text-lg font-semibold text-gray-900">
          No Monthly Data
        </h3>

        <p className="mt-2 max-w-sm px-4 text-center text-sm text-gray-500">
          Add income and expense transactions to visualize monthly trends.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[300px] sm:h-[360px] lg:h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: isMobile ? 20 : 12,
            right: isMobile ? 10 : 18,
            left: isMobile ? 0 : 10,
            bottom: isMobile ? 20 : 8,
          }}
        >
          <defs>
            <linearGradient
              id="incomeFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#22C55E"
                stopOpacity={0.12}
              />
              <stop
                offset="100%"
                stopColor="#22C55E"
                stopOpacity={0}
              />
            </linearGradient>

            <linearGradient
              id="expenseFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#3B82F6"
                stopOpacity={0.12}
              />
              <stop
                offset="100%"
                stopColor="#3B82F6"
                stopOpacity={0}
              />
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
              fontSize: isMobile ? 10 : 12,
            }}
            tickMargin={6}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            width={isMobile ? 50 : 65}
            tick={{
              fill: "#6B7280",
              fontSize: isMobile ? 10 : 12,
            }}
            tickFormatter={(value) => {
              if (value >= 100000) {
                return `₹${(value / 100000).toFixed(1)}L`;
              }

              if (value >= 1000) {
                return `₹${(value / 1000).toFixed(0)}k`;
              }

              return `₹${value}`;
            }}
            tickMargin={6}
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
            layout="horizontal"
            align="center"
            verticalAlign={isMobile ? "bottom" : "top"}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              fontSize: isMobile ? "11px" : "13px",
              paddingBottom: isMobile ? 0 : 14,
              paddingTop: isMobile ? 10 : 0,
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
            strokeWidth={isMobile ? 2 : 2.5}
            dot={false}
            activeDot={{
              r: isMobile ? 3 : 4,
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
            strokeWidth={isMobile ? 2 : 2.5}
            dot={false}
            activeDot={{
              r: isMobile ? 3 : 4,
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