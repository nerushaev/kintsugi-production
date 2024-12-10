import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";
import RestrictedRoute from "../RestrictedRoutes/RestrictedRoutes";
import Checkout from "../../pages/Checkout";
import Loader from '../Loader/Loader';
import Catalog from '../../pages/Catalog/Catalog';
const Product = lazy(() => import('../../pages/Product'));
const UserPage = lazy(() => import('../../pages/UserPage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const InfoPage = lazy(() => import('../../pages/InfoPage'));
const RestorePasswordPage = lazy(() => import('../../pages/RestorePasswordPage'));
const PublicOfferPage = lazy(() => import('../../pages/PublicOfferPage'));
const Politic = lazy(() => import('../../pages/Politic'));
const RedirectPage = lazy(() => import('../RedirectPage/RedirectPage'));
const Home = lazy(() => import('../../pages/Home'));

function RoutesComponent() {
  return (
    <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/:category/:product_id" element={<Product />} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/restore" element={<RestorePasswordPage />} />
      <Route path="/publicoffer" element={<PublicOfferPage />} />
      <Route path="/politic" element={<Politic />} />
      <Route path="/redirect" element={<RedirectPage />} />
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
    </Suspense>
  );
}

export default React.memo(RoutesComponent);
