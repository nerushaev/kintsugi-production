import MainMenu from "../MainMenu/MainMenu";
import NavState from "../../../context/navState";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router";
import Busket from "../../Busket/BusketIcon/BusketIcon";
import Loader from "../../Loader/Loader";
import React, { Suspense } from "react";
import ScrollButton from "../../Buttons/ScrollButton";

export default function SharedLayout() {

  return (
    <>
    <Suspense fallback={<Loader />}>
        <NavState>
          <MainMenu />
        </NavState>
      <main>
          {/* <Busket /> */}
          <Outlet />
          <ScrollButton />
      </main>
      <Footer />
    </Suspense>
  </>
  );
}
