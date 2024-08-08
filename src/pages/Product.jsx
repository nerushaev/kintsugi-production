import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";
import { getProductsById } from "../redux/products/products-operation";
import ProductsDetails from "../components/Home/Products/ProductsDetails/ProductsDetails";
import {
  getDetails,
  selectIsLoading,
} from "../redux/products/products-selectors";
import Loader from "../components/Loader/Loader";
import { Container } from "../components/Container/Container.styled";
import styled from "styled-components";
import { theme } from "../styles/theme";
import DeliveryInfo from "../components/Home/Products/ProductsDetails/MoreInfoControlls/DeliveryInfo";
import PaymentInfo from "../components/Home/Products/ProductsDetails/MoreInfoControlls/PaymentInfo";
import Feedback from "../components/Home/Products/ProductsDetails/MoreInfoControlls/Feedback";
import { Link } from "react-router-dom";

export const Title = styled.h2`
  font-size: ${theme.fontSizes.medium};
  font-weight: 500;
  margin-bottom: 10px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.large};
  }
  @media (min-width: 1199px) {
    font-size: ${theme.fontSizes.extraLarge};
  }
`;

export const SubTitle = styled.p`
  font-weight: 400;
  font-size: ${theme.fontSizes.medium};
  margin-bottom: 30px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.large};
  }
  @media (min-width: 1199px) {
    font-size: ${theme.fontSizes.extraLarge};
  }
`;

const ControllsButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
  gap: 10px;
  @media (min-width: 767px) {
    justify-content: center;
  }
`;

export const Image = styled.img`
  margin-bottom: 20px;
  width: 320px;
  @media (min-width: 767px) {
    margin-right: 30px;
    ${(props) => (props.$payment ? `margin: 0 auto;` : "")}
  }
`;

const MoreInfoControllsWrapper = styled.div`
  margin-bottom: 50px;
`;

export const DeliveryWrapper = styled.div`
  @media (min-width: 767px) {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  gap: 6px;
  padding: 15px;
  border-radius: 6px;
  font-weight: 500;
  background-color: ${(props) =>
    props.$active
      ? `${theme.colors.formButtonAccent}`
      : `${theme.colors.formButton}`};
  &:hover {
    background-color: ${theme.colors.formButtonAccent};
  }
`;

export default function Product() {
  const dispatch = useDispatch();
  const { product_id } = useParams();
  const isLoading = useSelector(selectIsLoading);
  const product = useSelector(getDetails);
  const [feedback, setFeedback] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [payment, setPayment] = useState(false);

  const handleScroll = (event) => {
    event.preventDefault(); // Предотвратить переход по ссылке по умолчанию
    const targetId = event.currentTarget.getAttribute("id"); // Получить якорь из ссылки
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      switch (targetId) {
        case "delivery":
          setPayment(false);
          setFeedback(false);
          setDelivery(true);
          break;
        case "payment":
          setPayment(true);
          setFeedback(false);
          setDelivery(false);
          break;
        case "feedback":
          setPayment(false);
          setFeedback(true);
          setDelivery(false);
          break;
        default:
          break;
      }
      targetElement.scrollIntoView({ behavior: "smooth" }); // Прокрутка к элементу
    }
  };

  useEffect(() => {
    if(product?.product_id === product_id) {
      return;
    } else {
    dispatch(getProductsById(product_id));
    }
  }, [dispatch, product_id, product]);

  return (
    <Container>
      {!isLoading ? (
        <>
          <ProductsDetails setFeedback={setFeedback} data={product} />
          <MoreInfoControllsWrapper>
            <ControllsButtonWrapper>
              <StyledLink
                $active={delivery}
                id="delivery"
                onClick={handleScroll}
              >
                Доставка
              </StyledLink>
              <StyledLink $active={payment} id="payment" onClick={handleScroll}>
                Оплата
              </StyledLink>
              <StyledLink
                $active={feedback}
                id="feedback"
                onClick={handleScroll}
              >
                Відгуки
              </StyledLink>
            </ControllsButtonWrapper>
          </MoreInfoControllsWrapper>
          {delivery && <DeliveryInfo />}
          {payment && <PaymentInfo />}
          {feedback && <Feedback />}
          <Outlet />
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
}
