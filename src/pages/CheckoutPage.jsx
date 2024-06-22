import React from "react";
import CheckoutForm from "../components/Busket/CheckoutPage/CheckoutForm";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  getBusket,
  totalBusketPrice,
} from "../redux/products/products-selectors";
import { theme } from "../styles/theme";
import CountButton from "../components/Home/Products/ProductsItem/CountButton";
import { useAuth } from "../hooks/useAuth";
import useModal from "../hooks/modal";
import { CgProfile } from "react-icons/cg";
import Modal from '../components/Modal';
import LoginForm from '../components/Auth/LoginForm/LoginForm';
import { FormWrapper } from "../components/Form/Form.styled";
import { SlClose } from "react-icons/sl";
import { selectUser } from "../redux/auth/auth-selectors";

const BusketWrapper = styled.div`
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 10px 10px;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
`;

const DetailsWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 10px;
  justify-content: space-around;
  border: 1px solid rgb(0, 0, 0, 0.1);
  overflow: hidden;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  margin: 0 20px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);
  padding-bottom: 10px;
`;

const Price = styled.p`
  font-size: ${theme.fontSizes.large};
  font-weight: 600;
  margin-right: 20px;
`;

const BusketItem = styled.li`
  margin-bottom: 20px;
`;

const BusketList = styled.ul`
  @media (min-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const Text = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NotificationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  color: ${theme.colors.gray};
`;

const NotificationMessage = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: ${theme.fontSizes.large};
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const StyledModal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 6px;
`;

const CloseWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
  justify-content: flex-end;
`;

export default function CheckoutPage() {
  const busket = useSelector(getBusket);
  const totalPrice = useSelector(totalBusketPrice);
  const user = useSelector(selectUser);
  const { isLoggedIn } = useAuth();
  const {openModal, isModalOpen, closeModal} = useModal();


  return (
    <>
      <BusketWrapper>
        <BusketList>
          {busket.map((item) => {
            const { image, name, description, amount, price, _id } = item;
            return (
              <BusketItem key={item.name}>
                <Wrapper>
                  <ImageWrapper>
                    <Image alt="" src={image[0]} />
                  </ImageWrapper>
                  <DetailsWrapper>
                    <Text>{name}</Text>
                    <Text>{description}</Text>
                  </DetailsWrapper>
                </Wrapper>
                <PriceWrapper>
                  <Price>
                    {amount} x {price * amount}грн
                  </Price>
                  {/* {screenSize.width > 767 && */}
                  <CountButton amount={amount} _id={_id} />
                  {/* } */}
                </PriceWrapper>
              </BusketItem>
            );
          })}
        </BusketList>
        <PriceWrapper>
          <Price>Загальна сума:</Price>
          <Price>{totalPrice}грн</Price>
        </PriceWrapper>
      </BusketWrapper>
      {!isLoggedIn && (
        <NotificationWrapper>
          <NotificationMessage onClick={openModal}>
            Маєте аккаунт?
              <CgProfile />
          </NotificationMessage>
        </NotificationWrapper>
      )}
      <CheckoutForm user={user} />
      {isModalOpen && !isLoggedIn && 
      <Modal onCloseModal={closeModal}>
        <FormWrapper>
          <StyledModal>
          <CloseWrapper>
        <SlClose onClick={closeModal} />
        </CloseWrapper>
        <LoginForm />
        </StyledModal>
        </FormWrapper>
      </Modal>
      }
    </>
  );
}
