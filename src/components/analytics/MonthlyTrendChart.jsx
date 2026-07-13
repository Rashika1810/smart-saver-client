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

  return (
    <div className="min-w-[200px] rounded-2xl border border-white/10 bg-zinc-900/95 backdrop-blur-xl p-4 shadow-2xl">
      <p className="mb-4 text-sm font-semibold text-white">{label}</p>

      <div className="space-y-3">
        {payload.map((entry) => (
          <div
            key={entry.dataKey}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  background: entry.color,
                }}
              />

              <span className="text-sm text-zinc-300">
                {entry.name}
              </span>
            </div>

            <span className="font-semibold text-white">
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
      <div className="flex h-[430px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="mb-4 text-6xl">📈</div>

        <h3 className="text-2xl font-semibold">
          No Monthly Data
        </h3>

        <p className="mt-3 max-w-sm text-center text-zinc-400">
          Add more income and expense transactions to
          visualize your monthly financial trend.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[430px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 25,
            right: 15,
            left: 10,
            bottom: 10,
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
                stopColor="#22c55e"
                stopOpacity={0.35}
              />

              <stop
                offset="100%"
                stopColor="#22c55e"
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
                stopColor="#3b82f6"
                stopOpacity={0.35}
              />

              <stop
                offset="100%"
                stopColor="#3b82f6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#27272a"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="month"
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
              stroke: "#3b82f6",
              strokeOpacity: 0.3,
            }}
            content={<CustomTooltip />}
          />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{
              paddingBottom: 20,
              color: "#d4d4d8",
              fontSize: "13px",
            }}
          />

          <Area
            type="monotone"
            dataKey="income"
            fill="url(#incomeFill)"
            stroke="none"
          />

          <Area
            type="monotone"
            dataKey="expense"
            fill="url(#expenseFill)"
            stroke="none"
          />

          <Line
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{
              r: 0,
            }}
            activeDot={{
              r: 7,
              stroke: "#fff",
              strokeWidth: 2,
              fill: "#22c55e",
            }}
            animationDuration={1000}
          />

          <Line
            type="monotone"
            dataKey="expense"
            name="Expense"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{
              r: 0,
            }}
            activeDot={{
              r: 7,
              stroke: "#fff",
              strokeWidth: 2,
              fill: "#3b82f6",
            }}
            animationDuration={1000}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}