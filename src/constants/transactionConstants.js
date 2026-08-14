export const TRANSACTION_MONTHS = [
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

export const TRANSACTION_TYPES = [
  { value: "all", label: "All Types" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

export const ALL_CATEGORIES_OPTION = {
  value: "all",
  label: "All Categories",
};

export const getTransactionYears = (numberOfYears = 5) => {
  const currentYear = new Date().getFullYear();

  return Array.from(
    { length: numberOfYears },
    (_, index) => {
      const year = currentYear - index;

      return {
        value: year.toString(),
        label: year.toString(),
      };
    }
  );
};