import { useEffect, useState } from "react";
import api from "../api/axios";

import SummaryCards from "../components/common/SummaryCards";
import MonthlyTrendChart from "../components/analytics/MonthlyTrendChart";
import CategoryPieChart from "../components/analytics/CategoryPieChart";
import WeekdaySpendingChart from "../components/analytics/WeekdaySpendingChart";
import { AnalyticsSkeleton } from "../components/analytics/AnalyticsSkeleton";

import {
  ANALYTICS_MONTHS,
  ANALYTICS_CHARTS,
  getAnalyticsYears,
  getDefaultAnalyticsFilters,
} from "../constants/analyticsConstants";

export default function Analytics() {
  const years = getAnalyticsYears();

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState(
    getDefaultAnalyticsFilters()
  );

  const [selectedChart, setSelectedChart] = useState("monthly");

  useEffect(() => {
    let cancelled = false;

    const fetchAnalytics = async () => {
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

        if (!cancelled) {
          setAnalytics(data.data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch analytics:", error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAnalytics();

    return () => {
      cancelled = true;
    };
  }, [filters]);

  if (!analytics && loading) {
    return <AnalyticsSkeleton />;
  }

  if (!analytics) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-lg border border-gray-200 bg-white p-16 text-center shadow-sm">
          <h2 className="text-3xl font-semibold text-gray-800">
            No Analytics Available
          </h2>

          <p className="mt-3 text-gray-400">
            Add a few transactions to unlock charts and financial insights.
          </p>
        </div>
      </div>
    );
  }

  const currentChart = ANALYTICS_CHARTS[selectedChart];

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">

      {/* Loading Indicator */}
      {loading && (
        <div className="fixed left-0 right-0 top-0 z-50 h-1 overflow-hidden bg-blue-100">
          <div className="h-full w-1/3 animate-[loading_1.2s_ease-in-out_infinite] bg-blue-500" />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="header-title">
            Analytics
          </h1>

          <p className="mt-2 max-w-2xl text-gray-400">
            Visualize your income, expenses and spending patterns with
            detailed financial analytics.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-3">

          {/* Month */}
          <select
            value={filters.month}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                month: e.target.value,
              }))
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
            {ANALYTICS_MONTHS.map((month) => (
              <option
                key={month.value}
                value={month.value}
              >
                {month.label}
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            value={filters.year}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                year: e.target.value,
              }))
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
              <option
                key={year}
                value={year}
              >
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div
        className={`transition-opacity duration-200 ${
          loading ? "opacity-60" : "opacity-100"
        }`}
      >
        <SummaryCards
          summary={analytics.summary}
          showTransactionCount
        />
      </div>

      {/* Chart Section */}
      <div
        className={`relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-opacity duration-200 ${
          loading ? "opacity-60" : "opacity-100"
        }`}
      >

        {/* Chart Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {currentChart.title}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {currentChart.description}
            </p>
          </div>

          {/* Chart Selector */}
          <select
            value={selectedChart}
            onChange={(e) =>
              setSelectedChart(e.target.value)
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
            {Object.entries(ANALYTICS_CHARTS).map(
              ([value, chart]) => (
                <option
                  key={value}
                  value={value}
                >
                  {chart.label}
                </option>
              )
            )}
          </select>
        </div>

        {/* Chart */}
        <div>
          {selectedChart === "monthly" && (
            <MonthlyTrendChart
              data={analytics.monthlyTrend}
            />
          )}

          {selectedChart === "category" && (
            <CategoryPieChart
              data={analytics.categoryBreakdown}
            />
          )}

          {selectedChart === "weekday" && (
            <WeekdaySpendingChart
              data={analytics.weekdaySpending}
            />
          )}
        </div>
      </div>
    </div>
  );
}