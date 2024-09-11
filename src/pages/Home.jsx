import MainTitle from "../components/Home/Title/Title";
import styled from "styled-components";
import { Container } from "../components/Container/Container.styled";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsOrderAccepted,
  selectOrderId,
} from "../redux/products/products-selectors";
import useModal from "../hooks/modal";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { Button, ButtonWrapper } from "../components/Buttons/Buttons";
import { clearOrderInfo } from "../redux/products/products-slice";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSearchParams } from "react-router-dom";
import { Element, scroller } from "react-scroll";
import Catalog from "../components/Home/Catalog/Catalog";

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
      "https://res.cloudinary.com/dzjmswzgp/image/upload/v1722696632/Group_39_ntkhve.jpg",
    category: "Перуки",
  },
];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    openModal: openOrderModal,
    isModalOpen: isOrderModalOpen,
    closeModal,
  } = useModal();
  const dispatch = useDispatch();
  const orderAccepted = useSelector(selectIsOrderAccepted);
  const orderId = useSelector(selectOrderId);

  useEffect(() => {
    if (orderAccepted && orderId) {
      openOrderModal();
    }
  }, [orderAccepted, openOrderModal, orderId]);

  const handleClick = () => {
    dispatch(clearOrderInfo());
  };

  const handleClickBanner = (category) => {
    searchParams.set("category", category);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    scroller.scrollTo("scroll", {
      smooth: true,
      duration: 500,
      delay: 0,
    });
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
        <Element name="scroll" />
        <Catalog />
      </Container>
      <>
        {isOrderModalOpen && orderAccepted && (
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
