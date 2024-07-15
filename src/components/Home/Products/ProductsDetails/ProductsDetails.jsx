import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AddButton, Button, ButtonWrapper } from "../../../Buttons/Buttons";
import React, { useState } from "react";
import { theme } from "../../../../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { addToBusket } from "../../../../redux/products/products-slice";
import { getBusket } from "../../../../redux/products/products-selectors";
import CountButton from "../ProductsItem/CountButton";
import Score from "../Feedback/Score";
import { SlArrowLeftCircle } from "react-icons/sl";
import AddButtonWithSize from "../AddButtonWithSize/AddButtonWithSize";
import { LuShoppingBasket } from "react-icons/lu";
import { selectLocation, selectUser } from "../../../../redux/auth/auth-selectors";
import Dropzone from "./Dropzone/Dropzone";
import Slider from "../../Swiper/Swiper";
import { useNavigate } from "react-router";
import { animateScroll } from "react-scroll";

const GoBackLink = styled(NavLink)`
  margin-left: 10px;
  font-size: ${theme.fontSizes.small};
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.medium};
  }
  @media (min-width: 1199px) {
    font-size: ${theme.fontSizes.large};
  }
`;
const GoBackWrapper = styled.div`
  // // position: absolute;
  // left: 40px;
  // top: -55px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  // margin-bottom: 10px;
`;

const ProductWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
  margin-right: auto;
  margin-left: auto;
`;

const ContentWrapper = styled.div`
  @media (min-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
`;

const ImageContainer = styled.div`
  @media (min-width: 767px) {
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 20px 0;
  @media (min-width: 767px) {
    align-items: left;
  }
`;

const Title = styled.h2`
  font-size: ${theme.fontSizes.title};
  font-weight: 500;
`;

const Subtitle = styled.h3`
  letter-spacing: 0.1rem;
  font-weight: 600;
  font-size: ${theme.fontSizes.extraLarge};
`;

const Text = styled.p`
  display: inline;
  font-weight: ${(props) => (props.$accent ? "500" : "400")};
  font-size: ${theme.fontSizes.medium};
`;

const ScoreWrapper = styled.div`
display: flex;
gap: 10px;
`;

const LinkToFeedback = styled.p`
  font-weight: 400;
  cursor: pointer;
`;

export default function ProductsDetails({ data }) {
  const {
    product_name,
    description,
    product_id,
    photo,
    price,
    amount,
    category_name,
    modifications,
    score,
    photo_extra,
  } = data;

  let photos = [];
  photos.unshift(photo);

  if (photo_extra) {
    photos.push(...photo_extra);
  }

  const location = useSelector(selectLocation);

  const [activeSize, setActiveSize] = useState(
    modifications.length > 0 ? modifications[0].modificator_name : null
  );
  const dispatch = useDispatch();
  const busket = useSelector(getBusket);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAdmin = user.role === "admin" ? true : false;

  const handleClick = (newData) => {
    dispatch(addToBusket(newData));
  };

  const handleBackClick = () => {
    navigate(`/${location}`);
  };

  const handleRatingClick = () => {
    console.log("he");
    navigate("feedback");
    animateScroll.scrollToBottom({
      delay: 0,
    });
  };

  const isFromBusket = busket.find((item) => item.product_id === product_id);
  const item = busket.find((item) => item.product_id === product_id);

  return (
    <>
              <GoBackWrapper>
          <Button onClick={handleBackClick}>
            <SlArrowLeftCircle size="22" />
            <GoBackLink id="scroll" >
              Назад
            </GoBackLink>
          </Button>
          </GoBackWrapper>
      <ProductWrapper>
        <ContentWrapper>

          <ImageContainer>
            <Slider images={photos} />
          </ImageContainer>
          <DetailsWrapper>
            <Title>{product_name}</Title>
            <Text $accent>Категорія: {category_name}</Text>
            <Text $accent>Код товару: {product_id}</Text>
            <Subtitle>{price / 100}грн</Subtitle>
            <ScoreWrapper>
            <Score onClick={handleRatingClick} score={score} />
            <LinkToFeedback onClick={handleRatingClick}>Залишити відгук</LinkToFeedback>
            </ScoreWrapper>
            <Subtitle>Розмір: {activeSize ? activeSize : "One size"}</Subtitle>
            {modifications.length > 0 && (
              <AddButtonWithSize
                activeSize={activeSize}
                setActiveSize={setActiveSize}
                modifications={modifications}
              />
            )}
            {isFromBusket ? (
              <AddButton>
                <CountButton
                  amount={item.amount}
                  product_id={item.product_id}
                />
              </AddButton>
            ) : (
              <AddButton
                onClick={() =>
                  handleClick({
                    product_id,
                    product_name,
                    description,
                    photo,
                    price,
                    amount,
                    category_name,
                    size: activeSize,
                  })
                }
              >
                Додати
                <LuShoppingBasket style={{ fontSize: `16px` }} />
              </AddButton>
            )}
          </DetailsWrapper>
        </ContentWrapper>
      </ProductWrapper>
      {isAdmin && <Dropzone _id={product_id} />}
    </>
  );
}
