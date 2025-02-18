import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.user.user); // Get user from Redux

  return user ? element : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
