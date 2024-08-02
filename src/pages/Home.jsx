import ProductsList from "../components/Home/Products/ProductsList/ProductsList";
import MainTitle from "../components/Home/Title/Title";
import styled from "styled-components";
import { Container } from "../components/Container/Container.styled";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsOrderAccepted,
  selectMonoPayUrl,
  selectOrderId,
} from "../redux/products/products-selectors";
import useModal from "../hooks/modal";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { Button, ButtonWrapper } from "../components/Buttons/Buttons";
import { clearOrderInfo } from "../redux/products/products-slice";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSearchParams } from "react-router-dom";
import { scroller } from "react-scroll";

const StyledImg = styled.img`
  cursor: pointer;
`;

const HeroWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const OrderNotificationWrapper = styled.div`
  background-color: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
`;

const homePageSlider = [
  {
    image:
      "https://res.cloudinary.com/dzjmswzgp/image/upload/v1721476014/banner_subnw5.jpg",
    category: "Перуки",
  },
];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openModal, isModalOpen, closeModal } = useModal();
  const dispatch = useDispatch();
  const orderAccepted = useSelector(selectIsOrderAccepted);
  const orderId = useSelector(selectOrderId);
  const monoPayUrl = useSelector(selectMonoPayUrl);

  useEffect(() => {
    if (orderAccepted && !monoPayUrl) {
      openModal();
    } else if (monoPayUrl && monoPayUrl.length !== 0) {
      console.log(monoPayUrl);
      window.location.replace(monoPayUrl);
    }
  }, [orderAccepted, openModal, monoPayUrl]);

  const handleClick = () => {
    dispatch(clearOrderInfo());
  };

  const handleClickBanner = (category) => {
    searchParams.set("category", category);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    scroller.scrollTo("scroll");
  };

  return (
      <>
      <HeroWrapper>
        <MainTitle />
        <Swiper>
          {homePageSlider.map((item) => {
            return (
              <SwiperSlide key={item}>
                <StyledImg
                  onClick={() => handleClickBanner(item.category)}
                  src={item.image}
                  alt=""
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </HeroWrapper>
      <Container>
        <MainTitle text="Каталог" />
        <ProductsList id="scroll" />
      </Container>
      <>
        {isModalOpen && orderAccepted && (
          <Modal onCloseModal={closeModal}>
            <OrderNotificationWrapper>
              <h2>Ваше замовлення під номером {orderId} прийнято!</h2>
              <p>В найближчій час с вами зв'яжуться для підтвердження!</p>
              <ButtonWrapper>
                <Button onClick={handleClick}>Закрити</Button>
              </ButtonWrapper>
            </OrderNotificationWrapper>
          </Modal>
        )}
      </>
    </>
  );
}
