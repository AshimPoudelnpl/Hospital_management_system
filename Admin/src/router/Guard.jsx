import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setCredentials } from "../Redux/features/authState";

const Guard = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check localStorage for backup auth data
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");

    if (token && user) {
      try {
        const userData = JSON.parse(user);
        dispatch(setCredentials({ user: userData, token }));
      } catch (e) {
        console.error("Error restoring auth:", e);
      }
    }
    setIsReady(true);
  }, [dispatch]);

  if (!isReady) return null;

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default Guard;
