import { Wallet, ArrowDownCircle, ArrowUpCircle, Receipt } from "lucide-react";
import AnimatedNumber from "../common/AnimatedNumber";

export default function SummaryCards({
  summary,
  showTransactionCount = false,
}) {
  const cards = [
    {
      key: "openingBalance",
      title: "Opening Balance",
      color: "text-indigo-600",
      icon: Wallet,
    },
    {
      key: "balance",
      title: "Current Balance",
      color: "text-blue-600",
      icon: Wallet,
    },
    {
      key: "income",
      title: "Total Income",
      color: "text-green-600",
      icon: ArrowDownCircle,
    },
    {
      key: "expense",
      title: "Total Expense",
      color: "text-red-600",
      icon: ArrowUpCircle,
    },
  ];

  if (showTransactionCount) {
    cards.push({
      key: "transactionCount",
      title: "Transactions",
      color: "text-amber-600",
      icon: Receipt,
    });
  }

  return (
    <div
      className={`grid gap-4 ${
        showTransactionCount
          ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 max-w-6xl"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl"
      }`}
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="w-full max-w-xs rounded-md border border-gray-200 bg-white p-3 transition-shadow duration-200 hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Icon size={16} className={card.color} />

              <p className="text-sm font-medium text-gray-500">{card.title}</p>
            </div>

            <h2 className="mt-1 text-xl font-semibold text-gray-900">
              {card.key === "transactionCount" ? (
                <AnimatedNumber value={summary?.[card.key] ?? 0} />
              ) : (
                <AnimatedNumber value={summary?.[card.key] ?? 0} prefix="₹" />
              )}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
