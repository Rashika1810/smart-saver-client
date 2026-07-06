export default function Filters({ filters, setFilters, setView }) {
  return (
    <div className="flex flex-wrap gap-3 mt-6 items-center">
      {/* Month */}
      <select
        className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl"
        value={filters.month}
        onChange={(e) => setFilters({ ...filters, month: e.target.value })}
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

      {/* Year */}
      <select
        className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl"
        value={filters.year}
        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
      >
        <option value="2026">2026</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>

      {/* Type */}
      <select
        className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl"
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Category */}
      <select
        className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="all">All Categories</option>
        <option value="food">Food</option>
        <option value="salary">Salary</option>
        <option value="bills">Bills</option>
        <option value="travel">Travel</option>
      </select>

      {/* Search */}
      <input
        type="text"
        placeholder="Search description..."
        className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl"
        value={filters.search}
        onChange={(e) =>
          setFilters({
            ...filters,
            search: e.target.value,
          })
        }
      />

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
