import SharedLayout from "./components/Home/SharedLayout/SharedLayout";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import AddProductsPage from "./pages/Admin/AddProductsPage";
import Product from "./pages/Product";
import CheckoutPage from "./pages/CheckoutPage";
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
import BusketPage from './pages/BusketPage';
import Payment from "./components/Busket/CheckoutPage/Payment";
import PublicOfferPage from "./pages/PublicOfferPage";
import Politic from "./pages/Politic";
import Loader from "./components/Loader/Loader";

function App() {
  const dispatch = useDispatch();
  const {isRefreshing} = useAuth();

  const { token} = useAuth();

  useEffect(() => {
      if(token) {
        dispatch(current());
      } 
  }, [dispatch, token]);

  return (
    <>
      {isRefreshing && <Loader />}
      <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/products/:product_id" element={<Product />} />
        <Route path="/info" element={<InfoPage />} />
        {/* <Route path="/busket" element={<BusketPage />} /> */}
        <Route path="/checkout" element={<CheckoutPage />}/>
        <Route path="/payment" element={<Payment />}/>
        <Route path="/restore" element={<RestorePasswordPage />} />
        <Route path="/publicoffer" element={<PublicOfferPage />}/>
        <Route path="/politic" element={<Politic />}/>
        <Route
          path="/admin"
          element={
            <AdminRoute component={AdminPage} redirectTo={"/login"} />
          }
        >
          <Route path="products" element={<AddProductsPage />} />
          <Route path="banners" element={<BanersPage />} />
          <Route path="orders" element={<OrdersPage />} />
          {/* <Route path="products" element={<FormAddProducts />} /> */}
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
        <Route path="/restore" element={RestorePass} />
      </Route>
    </Routes>
      </>
  );
  
}

export default App;
