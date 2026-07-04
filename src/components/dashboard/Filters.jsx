export default function Filters({ filters, setFilters, setView }) {
  return (
    <div className="flex flex-wrap gap-3 mt-6 items-center">

      <select
        className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl"
        value={filters.frequency}
        onChange={(e) =>
          setFilters({ ...filters, frequency: e.target.value })
        }
      >
        <option value="all">All</option>
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="365">Last Year</option>
      </select>

      <select
        className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl"
        value={filters.type}
        onChange={(e) =>
          setFilters({ ...filters, type: e.target.value })
        }
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl"
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
      >
        <option value="all">All</option>
        <option value="food">Food</option>
        <option value="salary">Salary</option>
        <option value="bills">Bills</option>
        <option value="travel">Travel</option>
      </select>

      {/* View Toggle */}
      <div className="ml-auto flex gap-2">
        <button
          onClick={() => setView("table")}
          className="px-3 py-2 rounded-xl bg-white/10"
        >
          Table
        </button>

        <button
          onClick={() => setView("graph")}
          className="px-3 py-2 rounded-xl bg-white/10"
        >
          Analytics
        </button>
      </div>

    </div>
  );
}