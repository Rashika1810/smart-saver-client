import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

import SummaryCards from "../components/common/SummaryCards";
import MonthlyTrendChart from "../components/analytics/MonthlyTrendChart";
import CategoryPieChart from "../components/analytics/CategoryPieChart";
import WeekdaySpendingChart from "../components/analytics/WeekdaySpendingChart";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    month: "all",
    year: new Date().getFullYear().toString(),
  });

  // Default chart
  const [selectedChart, setSelectedChart] = useState("monthly");

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
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-gray-400">Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-gray-400">No analytics available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      {/* Header + Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Analytics</h1>
          <p className="mt-1 text-sm text-gray-400">
            Track your spending and income trends.
          </p>
        </div>

        <div className="flex gap-3">
          {/* Month */}
          <select
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white outline-none"
            value={filters.month}
            onChange={(e) =>
              setFilters({
                ...filters,
                month: e.target.value,
              })
            }
          >
            <option value="all">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>

          {/* Year */}
          <select
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white outline-none"
            value={filters.year}
            onChange={(e) =>
              setFilters({
                ...filters,
                year: e.target.value,
              })
            }
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards summary={analytics.summary} showTransactionCount />

      {/* Charts */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {selectedChart === "monthly" && "Monthly Trend"}
              {selectedChart === "category" && "Category Breakdown"}
              {selectedChart === "weekday" && "Weekday Spending"}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {selectedChart === "monthly" &&
                "View your income and expenses over time."}

              {selectedChart === "category" &&
                "See which categories contribute the most to your spending."}

              {selectedChart === "weekday" &&
                "Analyze your spending pattern across the week."}
            </p>
          </div>

          <select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white outline-none"
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