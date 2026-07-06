import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Outlet />
    </div>
  );
}
