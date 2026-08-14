export const ANALYTICS_MONTHS = [
  { value: "all", label: "All Months" },
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export const ANALYTICS_CHARTS = {
  monthly: {
    title: "Monthly Trend",
    description: "Compare your income and expenses over time.",
    label: "Monthly Trend",
  },

  category: {
    title: "Category Breakdown",
    description: "Understand where most of your money is spent.",
    label: "Category Breakdown",
  },

  weekday: {
    title: "Weekday Spending",
    description: "Discover which days you spend the most.",
    label: "Weekday Spending",
  },
};

export const DEFAULT_ANALYTICS_FILTERS = {
  month: "all",
};

export const getAnalyticsYears = (numberOfYears = 5) => {
  const currentYear = new Date().getFullYear();

  return Array.from(
    { length: numberOfYears },
    (_, index) => (currentYear - index).toString()
  );
};

export const getDefaultAnalyticsFilters = () => ({
  ...DEFAULT_ANALYTICS_FILTERS,
  year: new Date().getFullYear().toString(),
});