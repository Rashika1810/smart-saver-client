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
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-semibold">Transactions</h1>

        <p className="mt-2 text-gray-400">
          Manage all your income and expenses.
        </p>
      </div>

      {/* Filters */}

      <div
        className="
rounded-xl
border
border-zinc-800
bg-zinc-900
p-5
"
      >
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      {/* Table */}

      {loading ? (
        <TransactionTableSkeleton />
      ) : transactions.length === 0 ? (
        <div
          className="
rounded-xl
border
border-zinc-800
bg-zinc-900
p-10
text-center
text-gray-400
"
        >
          No transactions found.
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
  );
}
