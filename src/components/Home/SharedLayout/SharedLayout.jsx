import MainMenu from "../MainMenu/MainMenu";
import NavState from "../../../context/navState";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router";
import Container from "../Container/Container";
import Busket from "../../Busket/BusketIcon/BusketIcon";
import Loader from "../../Loader/Loader";
import React, { Suspense } from "react";
import TabletNav from "../TabletNav/TabletNav";
import ScrollButton from "../../Buttons/ScrollButton";

export default function SharedLayout() {
  let isTablet = window.screen.width > "768" ? true : false;

  return (
    <>
    <Suspense fallback={<Loader />}>
      {isTablet ? (
        <TabletNav />
      ) : (
        <NavState>
          <MainMenu />
        </NavState>
      )}
      <main>
        <Container>
          <Busket />
          <Outlet />
          <ScrollButton />
        </Container>
      </main>
      <Footer />
    </Suspense>
  </>
  );
}
