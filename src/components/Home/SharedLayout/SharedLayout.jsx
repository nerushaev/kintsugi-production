import MainMenu from "../MainMenu/MainMenu";
import NavState from "../../../context/navState";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router";
import {Container} from "../../Container/Container.styled";
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
          <Busket />
          <Container>
          <Outlet />
          </Container>
          <ScrollButton />
      </main>
      <Footer />
    </Suspense>
  </>
  );
}
