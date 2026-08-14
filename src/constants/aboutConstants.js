import {
  Wallet,
  Upload,
  Receipt,
  Repeat,
  BarChart3,
  Lightbulb,
  Bot,
} from "lucide-react";

export const ABOUT_FEATURES = [
  {
    icon: Wallet,
    title: "Set Opening Balance",
    description:
      "Begin by setting your opening balance. You can include your total balance (cash + cashless) or only your cashless balance. Cash can always be added later through manual transactions.",
  },
  {
    icon: Upload,
    title: "Import PhonePe Statement",
    description:
      "Upload your PhonePe transaction statement and SmartSaver will automatically import your UPI transactions while detecting and removing duplicate records.",
  },
  {
    icon: Receipt,
    title: "Add Cash Transactions",
    description:
      "Easily record cash income and expenses manually so all your finances stay organized in one place.",
  },
  {
    icon: Repeat,
    title: "Recurring Transactions",
    description:
      "Schedule recurring income or expenses with flexible frequencies. Choose Daily, Weekly, or Monthly schedules, and for weekly transactions, select the specific days of the week when they should occur.",
  },
  {
    icon: BarChart3,
    title: "View Analytics",
    description:
      "Analyze your spending with Monthly Spending Charts, Category-wise Expense Charts, and Weekday Spending Analysis to better understand your financial habits.",
  },
  {
    icon: Lightbulb,
    title: "AI Financial Insights",
    description:
      "Click the bulb icon anytime to receive AI-generated insights about your spending behavior, budget, major expenses, and personalized saving suggestions.",
  },
  {
    icon: Bot,
    title: "AI Financial Chatbot",
    description:
      "Chat with your AI Financial Assistant and ask questions about your balance, spending, savings, categories, merchants, and transactions to get personalized financial answers.",
  },
];

export const ABOUT_FEATURE_LIST = [
  "Opening Balance Management",
  "PhonePe Statement Import",
  "Duplicate Transaction Detection",
  "Cash & Cashless Tracking",
  "Daily, Weekly & Monthly Recurring Transactions",
  "Specific Weekday Selection for Recurring Transactions",
  "Monthly Spending Charts",
  "Category-wise Expense Analysis",
  "Weekday Spending Analysis",
  "AI Budget & Spending Insights",
  "AI Financial Chatbot",
  "Personalized Financial Answers",
  "Secure Transaction Management",
];