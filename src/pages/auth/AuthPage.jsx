import { useParams, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage() {
  const { mode } = useParams();

  if (mode === "login") {
    return <Login />;
  }

  if (mode === "register") {
    return <Register />;
  }

  return <Navigate to="/auth/login" replace />;
}
