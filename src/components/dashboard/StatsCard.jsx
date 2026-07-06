export default function StatsCards({ summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
        <p className="text-gray-400">Balance</p>
        <h2 className="text-2xl font-bold">
          ₹{summary.balance.toLocaleString()}
        </h2>
      </div>

      <div className="p-5 rounded-2xl bg-green-500/10 border border-green-500/20">
        <p className="text-gray-400">Income</p>
        <h2 className="text-2xl font-bold text-green-400">
          ₹{summary.income.toLocaleString()}
        </h2>
      </div>

      <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
        <p className="text-gray-400">Expense</p>
        <h2 className="text-2xl font-bold text-red-400">
          ₹{summary.expense.toLocaleString()}
        </h2>
      </div>
    </div>
  );
}
