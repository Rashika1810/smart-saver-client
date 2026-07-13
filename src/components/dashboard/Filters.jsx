import { Search } from "lucide-react";
import {
  expenseCategories,
  incomeCategories,
} from "../../utils/categories";

export default function Filters({ filters, setFilters }) {
  const categories = [...expenseCategories, ...incomeCategories];

  return (
    <div className="space-y-6">
      {/* Search */}

      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search by category, description..."
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value,
            })
          }
          className="
            h-12
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            pl-11
            pr-4
            text-gray-800
            placeholder:text-gray-400
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            outline-none
            transition
          "
        />
      </div>

      {/* Filters */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <select
          value={filters.month}
          onChange={(e) =>
            setFilters({
              ...filters,
              month: e.target.value,
            })
          }
          className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
        >
          <option value="all">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <select
          value={filters.year}
          onChange={(e) =>
            setFilters({
              ...filters,
              year: e.target.value,
            })
          }
          className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
        >
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>

        <select
          value={filters.type}
          onChange={(e) =>
            setFilters({
              ...filters,
              type: e.target.value,
            })
          }
          className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({
              ...filters,
              category: e.target.value,
            })
          }
          className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
        >
          <option value="all">All Categories</option>

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