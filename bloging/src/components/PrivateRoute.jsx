// PrivateRoute.js
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token"); // or use AuthContext
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
