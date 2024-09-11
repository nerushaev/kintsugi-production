import { Routes, Route } from "react-router-dom";
import AddProductsPage from "../../pages/Admin/AddProductsPage";
import Product from "../../pages/Product";
import UserPage from "../../pages/UserPage";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import InfoPage from "../../pages/InfoPage";
import RestorePasswordPage from "../../pages/RestorePasswordPage";
import BanersPage from "../../pages/Admin/BanersPage";
import AdminPage from "../../pages/Admin/AdminPage";
import OrdersPage from "../../pages/Admin/OrdersPage";
import PublicOfferPage from "../../pages/PublicOfferPage";
import Politic from "../../pages/Politic";
import RedirectPage from "../RedirectPage/RedirectPage";
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";
import RestrictedRoute from "../RestrictedRoutes/RestrictedRoutes";
import AdminRoute from "../AdminRoute/AdminRoute";
import Checkout from "../../pages/Checkout";
import React from "react";
import Home from "../../pages/Home";

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:product_id" element={<Product />} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/restore" element={<RestorePasswordPage />} />
      <Route path="/publicoffer" element={<PublicOfferPage />} />
      <Route path="/politic" element={<Politic />} />
      <Route path="/redirect" element={<RedirectPage />} />
      <Route
        path="/admin"
        element={<AdminRoute component={AdminPage} redirectTo={"/login"} />}
      >
        <Route path="products" element={<AddProductsPage />} />
        <Route path="banners" element={<BanersPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>
      <Route
        path="/login"
        element={<RestrictedRoute component={LoginPage} redirectTo={"/user"} />}
      />
      <Route
        path="/user"
        element={<PrivateRoute component={UserPage} redirectTo={"/login"} />}
      />
      <Route
        path="/register"
        element={<RestrictedRoute component={RegisterPage} redirectTo={"/user"} />}
      />
      <Route path="/restore" element={<RestorePasswordPage />} />
    </Routes>
  );
}

export default React.memo(RoutesComponent);
