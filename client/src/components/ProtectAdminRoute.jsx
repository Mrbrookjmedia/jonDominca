  // ProtectAdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const ProtectAdminRoute = () => {
  const { currentUser, refreshUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      await refreshUserData();
      setIsLoading(false);
    };
    verifyAdmin();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!currentUser.isAdmin) {
    console.error('Access denied - User is not admin');
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectAdminRoute;

