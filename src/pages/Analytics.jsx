import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

import SummaryCards from "../components/common/SummaryCards";
import MonthlyTrendChart from "../components/analytics/MonthlyTrendChart";
import CategoryPieChart from "../components/analytics/CategoryPieChart";
import WeekdaySpendingChart from "../components/analytics/WeekdaySpendingChart";
import TransactionTableSkeleton from "../components/dashboard/TransactionTableSkeleton";

const months = [
  { value: "all", label: "All Months" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export default function Analytics() {
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 5 }, (_, i) =>
    (currentYear - i).toString(),
  );

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    month: "all",
    year: currentYear.toString(),
  });

  const [selectedChart, setSelectedChart] = useState("monthly");

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        year: filters.year,
      };

      if (filters.month !== "all") {
        params.month = filters.month;
      }

      const { data } = await api.get("/transactions/analytics", {
        params,
      });

      setAnalytics(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <TransactionTableSkeleton />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="rounded-2xl border border-gray/10 bg-gray/5 backdrop-blur-xl p-16 text-center">
          <h2 className="text-3xl font-semibold text-gray">
            No Analytics Available
          </h2>

          <p className="mt-3 text-gray-400">
            Add a few transactions to unlock charts and financial insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-6 py-8">
      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="header-title">Analytics</h1>

          <p className="mt-2 max-w-2xl text-gray-400">
            Visualize your income, expenses and spending patterns with detailed
            financial analytics.
          </p>
        </div>

        {/* Filters */}

        <div className="flex gap-3">
          <select
            value={filters.month}
            onChange={(e) =>
              setFilters({
                ...filters,
                month: e.target.value,
              })
            }
            className="
  h-12
  rounded-md
  border
  border-gray-300
  bg-white
  px-4
  text-gray-700
  outline-none
  transition-colors
  focus:border-blue-500
  focus:ring-2
  focus:ring-blue-100
"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>

          <select
            value={filters.year}
            onChange={(e) =>
              setFilters({
                ...filters,
                year: e.target.value,
              })
            }
            className="
  h-12
  rounded-md
  border
  border-gray-300
  bg-white
  px-4
  text-gray-700
  outline-none
  transition-colors
  focus:border-blue-500
  focus:ring-2
  focus:ring-blue-100
"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}

      <SummaryCards summary={analytics.summary} showTransactionCount />

      {/* Chart Card */}

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray">
              {selectedChart === "monthly" && "Monthly Trend"}
              {selectedChart === "category" && "Category Breakdown"}
              {selectedChart === "weekday" && "Weekday Spending"}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {selectedChart === "monthly" &&
                "Compare your income and expenses over time."}

              {selectedChart === "category" &&
                "Understand where most of your money is spent."}

              {selectedChart === "weekday" &&
                "Discover which days you spend the most."}
            </p>
          </div>

          <select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            className="
  h-12
  rounded-md
  border
  border-gray-300
  bg-white
  px-4
  text-gray-700
  outline-none
  transition-colors
  focus:border-blue-500
  focus:ring-2
  focus:ring-blue-100
"
          >
            <option value="monthly">Monthly Trend</option>
            <option value="category">Category Breakdown</option>
            <option value="weekday">Weekday Spending</option>
          </select>
        </div>

        {selectedChart === "monthly" && (
          <MonthlyTrendChart data={analytics.monthlyTrend} />
        )}

        {selectedChart === "category" && (
          <CategoryPieChart data={analytics.categoryBreakdown} />
        )}

        {selectedChart === "weekday" && (
          <WeekdaySpendingChart data={analytics.weekdaySpending} />
        )}
      </div>
    </div>
  );
}
