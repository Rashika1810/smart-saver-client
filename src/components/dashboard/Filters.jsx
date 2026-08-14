import { Search } from "lucide-react";

import {
  expenseCategories,
  incomeCategories,
} from "../../utils/categories";

import {
  TRANSACTION_MONTHS,
  TRANSACTION_TYPES,
  ALL_CATEGORIES_OPTION,
  getTransactionYears,
} from "../../constants/transactionConstants";

export default function Filters({ filters, setFilters }) {
  const categories = [
    ...expenseCategories,
    ...incomeCategories,
  ];

  const years = getTransactionYears();

  const updateFilter = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          type="text"
          placeholder="Search by category, description..."
          value={filters.search}
          onChange={(e) =>
            updateFilter("search", e.target.value)
          }
          className="
            h-12
            w-full
            rounded-md
            border
            border-gray-300
            bg-white
            pl-11
            pr-4
            text-gray-800
            placeholder:text-gray-400
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
            outline-none
            transition-colors
          "
        />
      </div>

      {/* Filters */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Month */}
        <select
          value={filters.month}
          onChange={(e) =>
            updateFilter("month", e.target.value)
          }
          className="
            h-12
            rounded-md
            border
            border-gray-300
            bg-white
            px-4
            text-gray-700
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
            outline-none
            transition-colors
          "
        >
          {TRANSACTION_MONTHS.map((month) => (
            <option
              key={month.value}
              value={month.value}
            >
              {month.label}
            </option>
          ))}
        </select>

        {/* Year */}
        <select
          value={filters.year}
          onChange={(e) =>
            updateFilter("year", e.target.value)
          }
          className="
            h-12
            rounded-md
            border
            border-gray-300
            bg-white
            px-4
            text-gray-700
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
            outline-none
            transition-colors
          "
        >
          {years.map((year) => (
            <option
              key={year.value}
              value={year.value}
            >
              {year.label}
            </option>
          ))}
        </select>

        {/* Type */}
        <select
          value={filters.type}
          onChange={(e) =>
            updateFilter("type", e.target.value)
          }
          className="
            h-12
            rounded-md
            border
            border-gray-300
            bg-white
            px-4
            text-gray-700
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
            outline-none
            transition-colors
          "
        >
          {TRANSACTION_TYPES.map((type) => (
            <option
              key={type.value}
              value={type.value}
            >
              {type.label}
            </option>
          ))}
        </select>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) =>
            updateFilter("category", e.target.value)
          }
          className="
            h-12
            rounded-md
            border
            border-gray-300
            bg-white
            px-4
            text-gray-700
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
            outline-none
            transition-colors
          "
        >
          <option
            value={ALL_CATEGORIES_OPTION.value}
          >
            {ALL_CATEGORIES_OPTION.label}
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
}