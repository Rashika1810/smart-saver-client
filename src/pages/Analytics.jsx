import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

import SummaryCards from "../components/common/SummaryCards";
import MonthlyTrendChart from "../components/analytics/MonthlyTrendChart";
import CategoryPieChart from "../components/analytics/CategoryPieChart";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    month: "all",
    year: new Date().getFullYear().toString(),
  });

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
        <p className="text-gray-400">Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-gray-400">No analytics available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Analytics</h1>

        <p className="mt-2 text-gray-400">
          Understand your spending and income trends.
        </p>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="grid grid-cols-2 gap-4 max-w-md">
          {/* Month */}
          <select
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
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
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
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

      {/* Summary */}
      <SummaryCards summary={analytics.summary} showTransactionCount />

      {/* Monthly Trend */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-5 text-xl font-semibold">Monthly Trend</h2>

        <MonthlyTrendChart data={analytics.monthlyTrend} />
      </div>

      {/* Category Breakdown */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-5 text-xl font-semibold">Category Breakdown</h2>

        <CategoryPieChart data={analytics.categoryBreakdown} />
      </div>
    </div>
  );
}
