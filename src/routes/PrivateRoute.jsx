import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loader from "../pages/shared/Loader/Loader";

function PrivateRoute({ children }) {
  const { loading, user } = useAuth();

  const { pathname } = useLocation();
  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" state={pathname} />;
  }

  return children;
}
export default PrivateRoute;
