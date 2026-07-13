import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../api/axios";
import Filters from "../components/dashboard/Filters";
import TransactionTable from "../components/dashboard/TransactionTable";
import TransactionTableSkeleton from "../components/dashboard/TransactionTableSkeleton";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [pageLoading, setPageLoading] = useState(false);

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

  const fetchTransactions = useCallback(async () => {
    try {
      if (transactions.length === 0) {
        setLoading(true);
      } else {
        setPageLoading(true);
      }

      const params = {
        page,
        limit: 10,
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
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  }, [filters, page, transactions.length]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [filters]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>

          <p className="mt-2 text-gray-500">
            View, search, and manage all your income and expenses.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        {/* Transactions */}
        {loading ? (
          <TransactionTableSkeleton />
        ) : transactions.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">
              No transactions found
            </h3>

            <p className="mt-2 text-gray-500">
              Try changing your filters or add a new transaction.
            </p>
          </div>
        ) : (
          <TransactionTable
            data={transactions}
            refresh={fetchTransactions}
            page={page}
            setPage={setPage}
            pagination={pagination}
            pageLoading={pageLoading}
          />
        )}
      </div>
    </div>
  );
}
