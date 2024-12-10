import Footer from "../Home/Footer/Footer";
import Loader from "../Loader/Loader";
import React, { Suspense } from "react";
import ScrollButton from "../Buttons/ScrollButton";
import styled from 'styled-components';
import Header from "../Header/Header";

const Main = styled.main`

`;

export default function SharedLayout({children}) {

  return (
    <>
    <Suspense fallback={<Loader />}>
    <Header />
      <Main>
          {children}
          <ScrollButton />
      </Main>
      <Footer />
    </Suspense>
  </>
  );
}
