import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import React from "react";

const AdminRoute = ({ component: Component, redirectTo = "/login" }) => {
  const { isLoggedIn, role } = useAuth();
  console.log(isLoggedIn);
  console.log(role);
    return isLoggedIn && role === "admin" ? 
    (
      <Component />
    ) :
      (
        <Navigate to={redirectTo} />
      )
};

export default AdminRoute;
