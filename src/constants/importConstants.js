export const IMPORT_SUMMARY_FIELDS = [
  {
    key: "totalFound",
    label: "Total Found",
    containerClass: "border-slate-200 bg-slate-50",
    valueClass: "text-slate-800",
  },
  {
    key: "imported",
    label: "Imported",
    containerClass: "border-green-100 bg-green-50",
    valueClass: "text-green-700",
  },
  {
    key: "duplicates",
    label: "Duplicates",
    containerClass: "border-yellow-100 bg-yellow-50",
    valueClass: "text-yellow-700",
  },
  {
    key: "invalid",
    label: "Invalid",
    containerClass: "border-red-100 bg-red-50",
    valueClass: "text-red-700",
  },
  {
    key: "valid",
    label: "Valid",
    containerClass: "border-blue-100 bg-blue-50",
    valueClass: "text-blue-700",
  },
];

export const IMPORT_STATEMENT_TEXT = {
  title: "Import PhonePe Statement",

  description:
    "Upload your PhonePe PDF statement. Duplicate transactions are automatically skipped during import.",

  summaryTitle: "Import Summary",

  successMessage: "Statement imported successfully.",

  errorMessage: "Failed to import statement.",

  viewTransactionsLabel: "View Transactions",
};