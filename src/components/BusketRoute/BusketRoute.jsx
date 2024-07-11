import { Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { getBusket } from "../../redux/products/products-selectors";

const BusketRoute = ({ component: Component, redirectTo = "/" }) => {
  const busket = useSelector(getBusket);
  return busket.length === 0 ? <Navigate to={redirectTo} /> : <Component />;
};

export default BusketRoute;
