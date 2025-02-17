import React, { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProtectRoute = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
      if (!localStorage.getItem("jwt")) {
      toast.error("Please login!");
    }
  }, []); 

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
