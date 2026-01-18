// routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // or auth context

  if (!token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
