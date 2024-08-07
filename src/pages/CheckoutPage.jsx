import React, { useEffect } from "react";
import CheckoutForm from "../components/Busket/CheckoutPage/CheckoutForm";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  getBusket,
  selectIsLoading,
  totalBusketPrice,
} from "../redux/products/products-selectors";
import { theme } from "../styles/theme";
import CountButton from "../components/Home/Products/ProductsItem/CountButton";
import { useAuth } from "../hooks/useAuth";
import useModal from "../hooks/modal";
import { CgProfile } from "react-icons/cg";
import Modal from "../components/Modal";
import LoginForm from "../components/Auth/LoginForm/LoginForm";
import { FormWrapper } from "../components/Form/Form.styled";
import { SlClose } from "react-icons/sl";
import { selectUser } from "../redux/auth/auth-selectors";
import { useNavigate } from "react-router";
import { Container } from "../components/Container/Container.styled";
import Loader from "../components/Loader/Loader";
import ErrorMessage from '../components/Errors/ErrorMessage';

const BusketWrapper = styled.div`
background-color: white;
padding: 20px;
border-radius: 6px;
  margin-bottom: 30px;
`;

const ImageTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemImageWrapper = styled.div`
  display: block;
  position: relative;
`;

const ItemWrapper = styled.div``;

const ImageWrapper = styled.div`
position: relative;
display: block;
padding-top: 100%;
margin-bottom: 10px;
`;

const Image = styled.img`
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);
  padding-bottom: 10px;
  height: 60px;
`;

const Price = styled.p`
  font-size: ${theme.fontSizes.large};
  font-weight: 600;
  margin-right: 20px;
`;

const BusketItem = styled.li`
  margin-bottom: 20px;
  @media (min-width: 767px) {
    flex: 0 0 50%;
    max-width: 50%;
    padding: 10px;
  }
  @media (min-width: 767px) {
    flex: 0 0 33.33%;
    max-width: 33.33%;
  }
`;

const BusketItemContainer = styled.div`
  height: 100%;
`;

const BusketList = styled.ul`
  @media (min-width: 767px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const Text = styled.p`
height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NotificationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  color: ${theme.colors.gray};
`;

export const NotificationMessage = styled.p`
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

export const StyledModal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 6px;
`;

export const CloseWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
  justify-content: flex-end;
`;

export default function CheckoutPage() {
  const busket = useSelector(getBusket);
  const totalPrice = useSelector(totalBusketPrice);
  const user = useSelector(selectUser);
  const { isLoggedIn } = useAuth();
  const { openModal, isModalOpen, closeModal } = useModal();
  const navigate = useNavigate();
  const loading = useSelector(selectIsLoading);


  useEffect(() => {
    if (busket.length === 0) {
      return navigate('/')
    }
  }, [busket, navigate])

  return (
    <>
    {loading && <Loader />}
    <Container>
      <BusketWrapper>
        <BusketList>
          {busket.map((item) => {
            const {
              product_name,
              product_id,
              photo_origin,
              price,
              amount,
              size
            } = item;
            return (
              <BusketItem key={product_name}>
                <BusketItemContainer>
                  <ImageTitleWrapper>
                    <ItemImageWrapper>
                      <ImageWrapper>
                        {photo_origin ? (
                          <Image
                            alt=""
                            src={`https://kintsugi.joinposter.com${photo_origin}`}
                          />
                        ) : (
                          <Image
                            alt=""
                            src={`https://res.cloudinary.com/dzjmswzgp/image/upload/c_crop,ar_1:1/v1719250641/image_not_found_wruanw.jpg`}
                          />
                        )}
                      </ImageWrapper>
                    </ItemImageWrapper>
                    <ItemWrapper>
                      <DetailsWrapper>
                        <Text>{product_name} {size ? size : ""}</Text>
                        {/* <Text>{description}</Text> */}
                      </DetailsWrapper>
                    </ItemWrapper>
                  </ImageTitleWrapper>
                  <PriceWrapper>
                    <Price>
                      {amount} x {(price / 100) * amount}грн
                    </Price>
                    {/* {screenSize.width > 767 && */}
                    <CountButton amount={amount} product_id={product_id} />
                    {/* } */}
                  </PriceWrapper>
                </BusketItemContainer>
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
      {totalPrice < 300 &&
      <ErrorMessage message="Для замовлення, загальна сума повинна бути більше 300грн!"/>
      }
      <CheckoutForm user={user} />
      {isModalOpen && !isLoggedIn && (
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
      )}
      </Container>
      </>
  );
}
