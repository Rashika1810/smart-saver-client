import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import SummaryCards from "../components/common/SummaryCards";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { useNavigate } from "react-router-dom";
import AIInsightPopup from "../components/dashboard/AIInsightPopup";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchSummary = useCallback(async () => {
    try {
      const { data } = await api.get("/transactions/summary");

      setSummary(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchRecentTransactions = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/transactions", {
        params: {
          page: 1,
          limit: 5,
        },
      });

      setTransactions(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSummary();
    fetchRecentTransactions();
  }, [fetchSummary, fetchRecentTransactions]);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold">
            Welcome {user?.name ? user.name.split(" ")[0] : "User"}
          </h1>

          <p className="mt-2 text-gray-400">Here's your financial overview.</p>
        </div>

        <AIInsightPopup />
      </div>
      {/* Summary */}

      <SummaryCards summary={summary} />

      {/* Recent Transactions */}

      <section className=" rounded-xl border border-zinc-800 bg-zinc-900 p-6 ">
        <div
          className="
          flex
          justify-between
          items-center
          mb-5
          "
        >
          <h2 className="text-xl font-semibold">Recent Transactions</h2>

          <button
            onClick={() => navigate("/transactions")}
            className="
            text-blue-400
            hover:text-blue-300
            "
          >
            View all
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <div className="py-8 text-center text-gray-400">
            No transactions yet.
          </div>
        ) : (
          <RecentTransactions data={transactions} />
        )}
      </section>
    </div>
  );
}
