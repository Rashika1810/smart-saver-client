import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Receipt,
} from "lucide-react";
import AnimatedNumber from "../common/AnimatedNumber";

export default function SummaryCards({
  summary,
  showTransactionCount = false,
}) {
  const cards = [
    {
      key: "balance",
      title: "Balance",
      color: "text-blue-400",
      icon: Wallet,
    },
    {
      key: "income",
      title: "Income",
      color: "text-green-400",
      icon: ArrowDownCircle,
    },
    {
      key: "expense",
      title: "Expense",
      color: "text-red-400",
      icon: ArrowUpCircle,
    },
  ];

  if (showTransactionCount) {
    cards.push({
      key: "transactionCount",
      title: "Transactions",
      color: "text-yellow-400",
      icon: Receipt,
    });
  }

  return (
    <div
      className={`grid gap-6 ${
        showTransactionCount
          ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
          : "grid-cols-1 md:grid-cols-3"
      }`}
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  {card.title}
                </p>

                <h2
                  className={`mt-2 text-3xl font-semibold ${card.color}`}
                >
                  {card.key === "transactionCount" ? (
                    <AnimatedNumber
                      value={summary?.[card.key] ?? 0}
                    />
                  ) : (
                    <AnimatedNumber
                      value={summary?.[card.key] ?? 0}
                      prefix="₹"
                    />
                  )}
                </h2>
              </div>

              <div className="rounded-lg bg-zinc-800 p-2">
                <Icon
                  size={22}
                  className={card.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}