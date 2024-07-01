import ProductsList from "../components/Home/Products/ProductsList/ProductsList";
import MainTitle from "../components/Home/Title/Title";
import React, { useEffect, useState } from "react";
import { Element, scroller } from "react-scroll";
import { useSelector } from "react-redux";
import { getCurrentPage } from "../redux/products/products-selectors";
import Slider from "../components/Home/Swiper/Swiper";
import styled from 'styled-components';

const HeroWrapper = styled.div`
  width: 100%;
`;

const homePageSlider = [
  "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
  // "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
  // "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
];

export default function Home() {
  const currentPage = useSelector(getCurrentPage);

  const [firstScroll, setFirstScroll] = useState(true);

  useEffect(() => {

    if(firstScroll) {
      setFirstScroll(false);
      return;
    }

    scroller.scrollTo("scroll", {
      smooth: true,
      duration: 500,
      delay: 0,
  });

  }, [currentPage]);



  return (
    <>
        <HeroWrapper>
            <MainTitle text="Картини по номерам в наявності" />
          <Slider images={homePageSlider} />
          </HeroWrapper>

      <Element name="scroll">
        <MainTitle text="Каталог" />
        </Element>
      <ProductsList />
    </>
  );
}
