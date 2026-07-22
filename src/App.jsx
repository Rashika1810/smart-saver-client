import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./pages/Dashboard";
import RecurringTransactions from "./pages/RecurringTransactions";
import AddTransaction from "./components/transactions/AddTransaction";
import EditTransaction from "./components/transactions/EditTransaction";
import NotFoundPage from "./pages/auth/NotFoundPage";
import AuthLayout from "./components/layout/AuthLayout";
import HomeLayout from "./components/layout/HomeLayout";
import Analytics from "./pages/Analytics";
import Transactions from "./pages/Transactions";
import ImportStatement from "./pages/ImportStatement";
import AuthPage from "./pages/auth/AuthPage";
import About from "./pages/About";
import LoaderDemo from "./pages/LoaderDemo";

function App() {
  return (
    <>
      <Routes>
        {/* Authentication Pages */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/:mode" element={<AuthPage />} />
        </Route>

        {/* Protected Pages */}
        <Route element={<HomeLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/edit-transaction/:id" element={<EditTransaction />} />
          <Route path="/recurring" element={<RecurringTransactions />} />
          <Route path="/import-statement" element={<ImportStatement />} />
          <Route path="/about" element={<About />} />
          <Route path="/loader-demo" element={<LoaderDemo />} />
          

        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
