import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Guard = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default Guard;
