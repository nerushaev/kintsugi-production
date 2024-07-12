import ProductsList from "../components/Home/Products/ProductsList/ProductsList";
import MainTitle from "../components/Home/Title/Title";
import Slider from "../components/Home/Swiper/Swiper";
import styled from 'styled-components';
import { Container } from "../components/Container/Container.styled";
import { useDispatch, useSelector } from "react-redux";
import { selectIsOrderAccepted, selectOrderId } from "../redux/products/products-selectors";
import useModal from "../hooks/modal";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { Button, ButtonWrapper } from "../components/Buttons/Buttons";
import { clearOrderInfo } from "../redux/products/products-slice";

const HeroWrapper = styled.div`
  width: 100%;
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
  "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
  // "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
  // "https://res.cloudinary.com/dzjmswzgp/image/upload/v1689970137/Banner_vmn4ex.jpg",
];

export default function Home() {

  const { openModal, isModalOpen, closeModal } = useModal();
  const dispatch = useDispatch();
  const orderAccepted = useSelector(selectIsOrderAccepted);
  const orderId = useSelector(selectOrderId);

  useEffect(() => {
    if (orderAccepted) {
      openModal();
    }
  }, [orderAccepted, openModal])

  const handleClick = () => {
    dispatch(clearOrderInfo())
  }

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
