import SharedLayout from "./components/Home/SharedLayout/SharedLayout";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import AddProductsPage from "./pages/Admin/AddProductsPage";
import Product from "./pages/Product";
import UserPage from "./pages/UserPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./hooks/useAuth";
import { useDispatch } from "react-redux";
import { current } from "./redux/auth/auth-operations";
import React, { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoutes";
import RestrictedRoute from "./components/RestrictedRoutes/RestrictedRoutes";
import LoginPage from "./pages/LoginPage";
import InfoPage from "./pages/InfoPage";
import RestorePasswordPage from "./pages/RestorePasswordPage";
import BanersPage from "./pages/Admin/BanersPage";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import RestorePass from "./components/Auth/RestorePassForm/RestorePassForm";
import AdminPage from "./pages/Admin/AdminPage";
import OrdersPage from "./pages/Admin/OrdersPage";
import PublicOfferPage from "./pages/PublicOfferPage";
import Politic from "./pages/Politic";
import Loader from "./components/Loader/Loader";
import ScrollManager from './hooks/scrollManager';
import './App.css';
import Checkout from "./pages/Checkout";
import RedirectPage from "./components/RedirectPage/RedirectPage";


function App() {
  const dispatch = useDispatch();
  const { isRefreshing, token } = useAuth();

  useEffect(() => {
    if (token) {
      dispatch(current());
    }
  }, [dispatch, token]);

  return (
    <ScrollManager>
      {isRefreshing && <Loader />}
      <SharedLayout>
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
              element={
                <AdminRoute component={AdminPage} redirectTo={"/login"} />
              }
            >
              <Route path="products" element={<AddProductsPage />} />
              <Route path="banners" element={<BanersPage />} />
              <Route path="orders" element={<OrdersPage />} />
            </Route>
            <Route
              path="/login"
              element={
                <RestrictedRoute component={LoginPage} redirectTo={"/user"} />
              }
            />
            <Route
              path="/user"
              element={<PrivateRoute component={UserPage} redirectTo={"/login"} />}
            />
            <Route
              path="/register"
              element={
                <RestrictedRoute component={RegisterPage} redirectTo={"/user"} />
              }
            />
            <Route path="/restore" element={<RestorePass />} />
        </Routes>
        </SharedLayout>
    </ScrollManager>
  );
}

export default App;
