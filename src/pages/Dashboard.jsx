import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import { getProfile, updateOpeningBalance } from "../api/authApi";
import SummaryCards from "../components/common/SummaryCards";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { useNavigate } from "react-router-dom";
import AIInsightPopup from "../components/dashboard/AIInsightPopup";
import OpeningBalanceModal from "../components/common/OpeningBalanceModal";
import Button from "../components/ui/Button";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [summary, setSummary] = useState({
    openingBalance: 0,
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showOpeningBalanceModal, setShowOpeningBalanceModal] = useState(false);

  const [openingBalance, setOpeningBalance] = useState(0);

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

  const handleOpeningBalance = async (value) => {
    try {
      const response = await updateOpeningBalance(value);

      const updatedUser = {
        ...user,
        openingBalance: response.data.openingBalance,
        openingBalanceSet: response.data.openingBalanceSet,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setUser(updatedUser);

      fetchSummary();

      setShowOpeningBalanceModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSummary();
    fetchRecentTransactions();
  }, [fetchSummary, fetchRecentTransactions]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await getProfile();

        setUser(data);

        if (!data.openingBalanceSet) {
          setTimeout(() => {
            setShowOpeningBalanceModal(true);
          }, 500);
        }
      } catch (error) {
        console.error(error);

        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.name ? user.name.split(" ")[0] : "User"} 👋
            </h1>

            <p className="mt-2 text-gray-500 text-base">
              Here's a quick overview of your finances.
            </p>
          </div>

          <AIInsightPopup />
        </div>

        {/* Summary Cards */}
        <div className="mb-10">
          <SummaryCards summary={summary} />

          <div className="mt-4 flex justify-end">
            <Button
              variant="info"
              onClick={() => {
                setOpeningBalance(summary.openingBalance || 0);
                setShowOpeningBalanceModal(true);
              }}
            >
              {user?.openingBalanceSet
                ? "Edit Opening Balance"
                : "Set Opening Balance"}
            </Button>
          </div>
        </div>

        {/* Recent Transactions */}
        <section className="bg-white border border-gray-200 rounded-md shadow-sm">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Transactions
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your latest income and expenses.
              </p>
            </div>

            <Button variant="info" onClick={() => navigate("/transactions")}>
              View all →
            </Button>
          </div>

          <div className="p-6">
            {!loading && transactions.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                No transactions yet.
              </div>
            ) : (
              <RecentTransactions data={transactions} loading={loading} />
            )}
          </div>
        </section>
      </div>

      <OpeningBalanceModal
        isOpen={showOpeningBalanceModal}
        currentBalance={openingBalance}
        onCancel={() => setShowOpeningBalanceModal(false)}
        onSave={handleOpeningBalance}
      />
    </div>
  );
}
