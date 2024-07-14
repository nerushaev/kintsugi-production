import MainMenu from "../MainMenu/MainMenu";
import NavState from "../../../context/navState";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router";
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
          <Outlet />
          <ScrollButton />
      </main>
      <Footer />
    </Suspense>
  </>
  );
}
