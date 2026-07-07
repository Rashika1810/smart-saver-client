import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RecurringTransactions from "./pages/RecurringTransactions";
import AddTransaction from "./components/transactions/AddTransaction";
import EditTransaction from "./components/transactions/EditTransaction";
import NotFoundPage from "./pages/auth/NotFoundPage";
import AuthLayout from "./components/layout/AuthLayout";
import HomeLayout from "./components/layout/HomeLayout";
import VerifyEmail from "./pages/auth/VerifyEmail";

function App() {
  return (
    <>
      <Routes>
        {/* Authentication Pages */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
        </Route>

        {/* Protected Pages */}
        <Route element={<HomeLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="/add-transaction" element={<AddTransaction />} />

          <Route path="/edit-transaction/:id" element={<EditTransaction />} />

          <Route path="/recurring" element={<RecurringTransactions />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
