import ProductsList from "../components/Home/Products/ProductsList/ProductsList";
import MainTitle from "../components/Home/Title/Title";
import Slider from "../components/Home/Swiper/Swiper";
import styled from 'styled-components';
import { Container } from "../components/Container/Container.styled";

const HeroWrapper = styled.div`
  width: 100%;
`;

const homePageSlider = [
  "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
  // "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
  // "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
];

export default function Home() {

  return (
    <>
        <HeroWrapper>
            <MainTitle text="Картини по номерам в наявності" />
          <Slider images={homePageSlider} />
          </HeroWrapper>
          <Container>
        <MainTitle text="Каталог" />
      <ProductsList />
      </Container>
    </>
  );
}
