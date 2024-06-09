import ProductsList from "../components/Home/Products/ProductsList/ProductsList";
import Slider from "../components/Home/Swiper/Swiper";
import Title from "../components/Home/Title/Title";
import Search from "../components/Home/Search/Search";
import React, { useEffect } from "react";
import { Element, animateScroll as scroller } from 'react-scroll'
import { useSelector } from "react-redux";
import { getCurrentPage } from "../redux/products/products-selectors";

const homePageSlider = [
  "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
  // "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
  // "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
];



export default function Home() {
  const currentPage = useSelector(getCurrentPage);

  useEffect(() => {
    scroller.scrollTo('scroll', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }, [currentPage])

  return (
    <>
      <Title text="Картини по номерам в наявності" />
      <Element name="scroll">
      <Slider images={homePageSlider} />
    </Element>
      <Title text="Каталог" />
      <Search />
      <ProductsList />
    </>
  );
}
