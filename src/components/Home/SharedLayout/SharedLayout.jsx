import MainMenu from "../MainMenu/MainMenu";
import NavState from "../../../context/navState";
import Footer from "../Footer/Footer";
import Loader from "../../Loader/Loader";
import React, { Suspense } from "react";
import ScrollButton from "../../Buttons/ScrollButton";
import styled from 'styled-components';
import { theme } from "../../../styles/theme";

const Main = styled.main`
background-color: ${theme.colors.ligthGray};

`;

export default function SharedLayout({children}) {

  return (
    <>
    <Suspense fallback={<Loader />}>
        <NavState>
          <MainMenu />
        </NavState>
      <Main>
          {children}
          <ScrollButton />
      </Main>
      <Footer />
    </Suspense>
  </>
  );
}
