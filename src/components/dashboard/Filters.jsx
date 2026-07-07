export default function Filters({ filters, setFilters }) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search transactions..."
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-blue-500"
        value={filters.search}
        onChange={(e) =>
          setFilters({
            ...filters,
            search: e.target.value,
          })
        }
      />

      {/* Dropdowns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <select
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-3"
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

        <select
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-3"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
        >
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>

        <select
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-3"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-3"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="all">All Categories</option>
          <option value="food">Food</option>
          <option value="salary">Salary</option>
          <option value="bills">Bills</option>
          <option value="travel">Travel</option>
        </select>
      </div>
    </div>
  );
}
