import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  AddButton,
  Button,
  ProductItemButton,
  ProductItemWrapper,
} from "../../../Buttons/Buttons";
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
import {
  selectUser,
  selectWishes,
} from "../../../../redux/auth/auth-selectors";
import Dropzone from "./Dropzone/Dropzone";
import Slider from "../../Swiper/Swiper";
import { useNavigate } from "react-router";
import { animateScroll } from "react-scroll";
import {
  addToWishList,
  removeFromWishList,
} from "../../../../redux/auth/auth-operations";
import { FaHeart } from "react-icons/fa";

// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "swiper/css/pagination";
// import { nanoid } from "@reduxjs/toolkit";
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

const ProductWrapper = styled.div`
  margin-bottom: 20px;
  @media (min-width: 767px) {
    display: flex;
    gap: 10px;
  }
`;

const ImageContainer = styled.div``;

const ScoreWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const LinkToFeedback = styled.p`
  font-weight: 400;
  cursor: pointer;
`;

export const Block = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  // height: 100%;
  @media (min-width: 767px) {
    padding: 20px;
    width: 50%;
  }
`;

const BlockSlider = styled.div`
  margin-bottom: 20px;
  height: 100%;
  @media (min-width: 767px) {
    width: 50%;
  }
`;

const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const BlockTitle = styled.h3`
  color: black;
  font-weight: 600;
  font-size: ${theme.fontSizes.medium};
  margin-bottom: 14px;
  @media (min-width: 767px) {
    margin-bottom: 20px;
  }
`;

const BlockPrice = styled.p`
  font-size: ${theme.fontSizes.big};
  font-weight: 400;
  letter-spacing: 1.5px;
  margin-bottom: 14px;
  @media (min-width: 479px) {
    margin-bottom: 20px;
  }
`;

const BlockText = styled.p`
  font-size: ${theme.fontSizes.small};
  font-weight: ${(props) => (props.$accent ? 600 : 500)};
  margin-bottom: 14px;
  @media (min-width: 479px) {
    margin-bottom: 16px;
  }
`;

const BlockTextFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  // margin-bottom: 20px;
  gap: 20px;
`;

export default function ProductsDetails({ data, setFeedback }) {
  const {
    product_name,
    description,
    product_id,
    photo_origin,
    price,
    amount,
    category_name,
    modifications,
    score,
    photo_extra,
  } = data;

  let photos = [];
  photos.unshift(photo_origin);

  if (photo_extra) {
    photos.push(...photo_extra);
  }

  const [activeSize, setActiveSize] = useState(
    modifications?.length > 0 ? modifications[0]?.modificator_name : null
  );

  const dispatch = useDispatch();
  const busket = useSelector(getBusket);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAdmin = user.role === "admin" ? true : false;
  const wishes = useSelector(selectWishes);
  const isWish = wishes?.includes(product_id);

  const handleClick = (newData) => {
    dispatch(addToBusket(newData));
  };

  const handleBackClick = () => {
    const previousUrl = localStorage.getItem("previousUrl");
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (previousUrl) {
      navigate(`/${previousUrl}` || "/");
      setTimeout(() => {
        window.scrollTo(0, scrollPosition || 0);
      }, 0);
    } else {
      navigate("/");
    }
  };

  const handleRatingClick = () => {
    setFeedback(true);
    animateScroll.scrollToBottom({
      delay: 0,
    });
  };

  const handleAddToWishList = (product_id) => {
    dispatch(addToWishList({ product_id: product_id }));
  };

  const handleRemoveFromWish = (product_id) => {
    dispatch(removeFromWishList({ product_id: product_id }));
  };

  const isFromBusket = busket.find((item) => item.product_id === product_id);
  const item = busket.find((item) => item.product_id === product_id);

  return (
    <>
      <GoBackWrapper>
        <Button onClick={handleBackClick}>
          <SlArrowLeftCircle size="22" />
          <GoBackLink id="scroll">Назад</GoBackLink>
        </Button>
      </GoBackWrapper>
      <ProductWrapper>
        {/* <ContentWrapper> */}
        <BlockSlider>
          <ImageContainer>
            <Slider photos={photos} />
          </ImageContainer>
        </BlockSlider>
        <BlockWrapper>
          <Block style={{ width: "100%"}}>
            {/* <BlockTextFlex> */}
            <BlockTitle>{product_name}</BlockTitle>
            {/* <BlockSmallText>{category_name}</BlockSmallText> */}
            {/* </BlockTextFlex> */}
            <BlockPrice>{price / 100}₴</BlockPrice>
            <ScoreWrapper>
              <Score onClick={handleRatingClick} score={score} />
              <LinkToFeedback onClick={handleRatingClick}>
                Залишити відгук
              </LinkToFeedback>
            </ScoreWrapper>
            <BlockText>
              Розмір: {activeSize ? activeSize : "One size"}
            </BlockText>
            {modifications?.length > 0 && (
              <AddButtonWithSize
                activeSize={activeSize}
                setActiveSize={setActiveSize}
                modifications={modifications}
              />
            )}
            <ProductItemWrapper>
              <ProductItemButton
                onClick={
                  isWish
                    ? () => handleRemoveFromWish(product_id)
                    : () => handleAddToWishList(product_id)
                }
              >
                <FaHeart
                  style={{ color: isWish ? `${theme.colors.rose}` : "white" }}
                />
              </ProductItemButton>
            </ProductItemWrapper>

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
                    photo_origin,
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
          </Block>
          <Block style={{ width: "100%" }}>
            <BlockTitle>Характеристики</BlockTitle>
            <BlockTextFlex>
              <BlockText $accent>Код товару:</BlockText>
              <BlockText>{product_id}</BlockText>
            </BlockTextFlex>
            <BlockTextFlex>
              <BlockText $accent>Категорія:</BlockText>
              <BlockText>{category_name}</BlockText>
            </BlockTextFlex>
          </Block>
          {description && (
            <Block style={{ width: "100%" }}>
              <BlockTitle>Опис товару</BlockTitle>
              <BlockText>{description}</BlockText>
            </Block>
          )}
        </BlockWrapper>
        {/* </ContentWrapper> */}
      </ProductWrapper>
      {isAdmin && <Dropzone _id={product_id} />}
    </>
  );
}
