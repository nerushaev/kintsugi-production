import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import React from "react";

const RestrictedRoute = ({ component: Component, redirectTo = "/" }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};

export default RestrictedRoute;
