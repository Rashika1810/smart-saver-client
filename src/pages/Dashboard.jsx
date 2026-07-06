import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import StatsCards from "../components/dashboard/StatsCard";
import Filters from "../components/dashboard/Filters";
import TransactionTable from "../components/dashboard/TransactionTable";
import Analytics from "./Analytics";
import api from "../api/axios";
import TransactionTableSkeleton from "../components/dashboard/TransactionTableSkeleton";
export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [view, setView] = useState("table");
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [filters, setFilters] = useState({
    month: "all",
    year: new Date().getFullYear().toString(),
    type: "all",
    category: "all",
    search: "",
  });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 5,
  });

  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const fetchSummary = useCallback(async () => {
    try {
      const { data } = await api.get("/transactions/summary");

      setSummary(data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // ---------------- FETCH TRANSACTIONS ----------------
  const fetchTransactions = useCallback(async () => {
    const user = localStorage.getItem("user");
    if (!user) return;

    try {
      if (transactions.length === 0) {
        setLoading(true);
      } else {
        setPageLoading(true);
      }

      const params = {
        page,
        limit: 5,
        year: filters.year,
      };

      if (filters.month !== "all") params.month = filters.month;
      if (filters.type !== "all") params.type = filters.type;
      if (filters.category !== "all") params.category = filters.category;
      if (filters.search.trim()) params.search = filters.search;

      const { data } = await api.get("/transactions", {
        params,
      });

      setTransactions(data.data || []);
      setPagination(data.pagination);
    } catch {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  }, [filters, page, transactions.length]);

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [filters]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransactions();
    fetchSummary();
  }, [fetchTransactions, fetchSummary]);

  return (
    <div className="px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="mb-2">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>

          <p className="mt-2 text-gray-400">
            Track your income and expenses with ease.
          </p>
        </div>
        <StatsCards summary={summary} />

        {/* FILTERS */}
        <div className="sticky top-4 z-20 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-5 shadow-xl">
          <Filters
            filters={filters}
            setFilters={setFilters}
            setView={setView}
          />
        </div>

        {/* CONTENT */}
        <div className="space-y-6">
          {loading ? (
            <TransactionTableSkeleton />
          ) : transactions.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-16 text-center shadow-lg">
              <h2 className="mt-4 text-2xl font-semibold">
                No Transactions Found
              </h2>

              <p className="mt-3 text-gray-400">
                Try changing your filters or add a new transaction.
              </p>
            </div>
          ) : (
            <>
              {view === "table" ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-3 mb-4">
                    <p className="text-sm text-gray-400">
                      Showing{" "}
                      <span className="font-semibold text-white">
                        {(pagination.page - 1) * pagination.limit + 1}
                      </span>
                      {" - "}
                      <span className="font-semibold text-white">
                        {Math.min(
                          pagination.page * pagination.limit,
                          pagination.total,
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-white">
                        {pagination.total}
                      </span>{" "}
                      transactions
                    </p>

                    <p className="text-sm text-gray-400">
                      Page{" "}
                      <span className="font-semibold text-white">
                        {pagination.page}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-white">
                        {pagination.pages}
                      </span>
                    </p>
                  </div>

                  <TransactionTable
                    data={transactions}
                    refresh={fetchTransactions}
                    refreshSummary={fetchSummary}
                    page={page}
                    setPage={setPage}
                    pagination={pagination}
                    pageLoading={pageLoading}
                  />
                </>
              ) : (
                <Analytics allTransactions={transactions} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
