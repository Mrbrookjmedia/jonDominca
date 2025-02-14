// import React, { useContext, useEffect, useState } from "react";
// import { Outlet, Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";

// const ProtectAdminRoute = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [showToast, setShowToast] = useState(false);

//   useEffect(() => {
//     if ((!currentUser || !currentUser.isAdmin) && !showToast) {
//       toast.error("You need to be an admin to access!");
//       setShowToast(true);
//     }
//   }, [currentUser, showToast]);

//   if (currentUser && currentUser.isAdmin) {
//     return <Outlet />;
//   }

//   return <Navigate to="/login" />;
// };

// export default ProtectAdminRoute;

// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useEffect, useState } from "react";

// const ProtectAdminRoute = () => {
//   const { currentUser } = useAuth();
  
//   if (!currentUser) {
//     // return <Navigate to="/login" />;
//     return <Navigate to="/login" replace />;
//   }

//   if (!currentUser.isAdmin) {
//     console.error('Access denied - User is not admin');
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectAdminRoute;

 
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

