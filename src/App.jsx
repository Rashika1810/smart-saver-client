import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/layout/Footer";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AddTransaction from "./components/transactions/AddTransaction";
import EditTransaction from "./components/transactions/EditTransaction";

// import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Navbar />
              <Dashboard />
              <Footer />
            </ProtectedRoutes>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/add-transaction"
          element={
            <ProtectedRoutes>
              <Navbar />
              <AddTransaction />
            </ProtectedRoutes>
          }
        />
        <Route
  path="/edit-transaction/:id"
  element={
    <ProtectedRoutes>
      <Navbar />
      <EditTransaction />
    </ProtectedRoutes>
  }
/>
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>

      <ToastContainer />
    </div>
  );
}

export function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default App;
