import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";import StatsCards from "../components/dashboard/StatsCard";
import Filters from "../components/dashboard/Filters";
import TransactionTable from "../components/dashboard/TransactionTable";
import Analytics from "./Analytics";
import api from "../api/axios";
;

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [view, setView] = useState("table");

  const [filters, setFilters] = useState({
    frequency: "all",
    type: "all",
    category: "all",
  });

  const [loading, setLoading] = useState(false);

  // ---------------- FETCH TRANSACTIONS ----------------
  const fetchTransactions = useCallback(async () => {
    const user = localStorage.getItem("user");
    if (!user) return;

    try {
      setLoading(true);

      const params = {};

      if (filters.frequency !== "all")
        params.frequency = filters.frequency;

      if (filters.type !== "all")
        params.type = filters.type;

      if (filters.category !== "all")
        params.category = filters.category;

      const { data } = await api.get("/transactions", { params });

      setTransactions(data?.data || []);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, [filters.frequency, filters.type, filters.category]);

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400">
          Track your expenses smartly
        </p>

        {/* STATS */}
        <StatsCards transactions={transactions} />

        {/* FILTERS */}
        <Filters
          filters={filters}
          setFilters={setFilters}
          setView={setView}
        />

        {/* CONTENT */}
        <div className="mt-6">

          {/* LOADING */}
          {loading && (
            <div className="text-center text-gray-400 py-10">
              Loading transactions...
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && transactions.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No transactions found. Add your first transaction 🚀
            </div>
          )}

          {/* DATA VIEW */}
          {!loading && transactions.length > 0 && (
            <>
              {view === "table" ? (
                <TransactionTable
                  data={transactions}
                  refresh={fetchTransactions}
                />
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