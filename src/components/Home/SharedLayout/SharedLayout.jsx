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
import useScreenSize from "../../../hooks/useScreenSize";

export default function SharedLayout() {
  const screenSize = useScreenSize();

  return (
    <>
    <Suspense fallback={<Loader />}>
      {screenSize.width > 767 ? (
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
