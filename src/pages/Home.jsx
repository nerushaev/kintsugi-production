import ProductsList from "../components/Home/Products/ProductsList/ProductsList";
import Slider from "../components/Home/Swiper/Swiper";
import Title from "../components/Home/Title/Title";
import Search from "../components/Home/Search/Search";
import React from "react";

const homePageSlider = [
  "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
  // "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
  // "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
];

export default function Home() {
  return (
    <>
      <Title text="Картини по номерам в наявності" />
      <Slider images={homePageSlider} />
      <Title text="Каталог" />
      <Search />
      <ProductsList />
    </>
  );
}
