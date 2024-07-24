import MainMenu from "../MainMenu/MainMenu";
import NavState from "../../../context/navState";
import Footer from "../Footer/Footer";
import Loader from "../../Loader/Loader";
import React, { Suspense } from "react";
import ScrollButton from "../../Buttons/ScrollButton";

export default function SharedLayout({children}) {

  return (
    <>
    <Suspense fallback={<Loader />}>
        <NavState>
          <MainMenu />
        </NavState>
      <main>
          {children}
          <ScrollButton />
      </main>
      <Footer />
    </Suspense>
  </>
  );
}
