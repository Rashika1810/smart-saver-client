export default function StatsCards({ summary }) {
  const cards = [
    {
      title: "Balance",
      value: summary.balance,
      color: "text-blue-400",
      border: "border-blue-500/20",
      bg: "bg-blue-500/10",
      icon: "💰",
    },
    {
      title: "Income",
      value: summary.income,
      color: "text-green-400",
      border: "border-green-500/20",
      bg: "bg-green-500/10",
      icon: "📈",
    },
    {
      title: "Expense",
      value: summary.expense,
      color: "text-red-400",
      border: "border-red-500/20",
      bg: "bg-red-500/10",
      icon: "📉",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`
            ${card.bg}
            ${card.border}
            border
            rounded-3xl
            p-6
            backdrop-blur-xl
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-2xl
          `}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">
                {card.title}
              </p>

              <h2 className={`mt-3 text-4xl font-bold ${card.color}`}>
                ₹{card.value.toLocaleString()}
              </h2>
            </div>

            <div className="text-5xl opacity-70">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
