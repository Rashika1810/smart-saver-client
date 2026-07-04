export default function Analytics({ allTransactions = [] }) {

  const incomeTx = allTransactions.filter(
    (t) => t.type?.toLowerCase() === "income"
  );

  const expenseTx = allTransactions.filter(
    (t) => t.type?.toLowerCase() === "expense"
  );

  const totalIncome = incomeTx.reduce((a, t) => a + Number(t.amount || 0), 0);
  const totalExpense = expenseTx.reduce((a, t) => a + Number(t.amount || 0), 0);
  const balance = totalIncome - totalExpense;

  const total = allTransactions.length;

  const incomeCountPercent = total ? (incomeTx.length / total) * 100 : 0;
  const expenseCountPercent = total ? (expenseTx.length / total) * 100 : 0;

  const incomeTurnoverPercent =
    totalIncome + totalExpense > 0
      ? (totalIncome / (totalIncome + totalExpense)) * 100
      : 0;

  const expenseTurnoverPercent =
    totalIncome + totalExpense > 0
      ? (totalExpense / (totalIncome + totalExpense)) * 100
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

      {/* LEFT CARD */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">

        <h2 className="text-lg font-semibold mb-4">
          Transaction Records
        </h2>

        <div className="space-y-2 text-sm">

          <div className="flex justify-between text-gray-300">
            <span>Total Transactions</span>
            <span className="text-white">{total}</span>
          </div>

          <div className="flex justify-between text-green-400">
            <span>Income</span>
            <span>{incomeTx.length}</span>
          </div>

          <div className="flex justify-between text-red-400">
            <span>Expense</span>
            <span>{expenseTx.length}</span>
          </div>
        </div>

        {/* PROGRESS BARS */}
        <div className="mt-6 space-y-3">

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-green-400">Income %</span>
              <span>{incomeCountPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${incomeCountPercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-red-400">Expense %</span>
              <span>{expenseCountPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${expenseCountPercent}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">

        <h2 className="text-lg font-semibold mb-4">
          Money Overview
        </h2>

        <div className="space-y-2 text-sm">

          <div className="flex justify-between">
            <span>Balance</span>
            <span className={balance >= 0 ? "text-green-400" : "text-red-400"}>
              ₹{balance}
            </span>
          </div>

          <div className="flex justify-between text-green-400">
            <span>Income</span>
            <span>₹{totalIncome}</span>
          </div>

          <div className="flex justify-between text-red-400">
            <span>Expense</span>
            <span>₹{totalExpense}</span>
          </div>
        </div>

        {/* TURNOVER BARS */}
        <div className="mt-6 space-y-3">

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-green-400">Income Share</span>
              <span>{incomeTurnoverPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${incomeTurnoverPercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-red-400">Expense Share</span>
              <span>{expenseTurnoverPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${expenseTurnoverPercent}%` }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}