import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10">
      <Outlet />
    </div>
  );
}