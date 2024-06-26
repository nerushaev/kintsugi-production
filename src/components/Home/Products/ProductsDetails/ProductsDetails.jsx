import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Slider from "../../Swiper/Swiper";
import { AddButton } from "../../../Buttons/Buttons";
import React, { useEffect, useRef } from "react";
import { theme } from "../../../../styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { addToBusket } from "../../../../redux/products/products-slice";
import { getBusket } from "../../../../redux/products/products-selectors";
import CountButton from "../ProductsItem/CountButton";
import { Select } from "../ProductsItem/ProductsItem";
import { SlArrowLeftCircle } from "react-icons/sl";
import Score from "../Feedback/Score";
import { scroller } from "react-scroll";

const ScoreWrapper = styled.div`
  margin-bottom: 20px;
`;

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
  position: absolute;
  left: 30px;
  top: -40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const ProductName = styled.p`
  font-size: ${theme.fontSizes.small};
  margin-bottom: 20px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.medium};
  }
  @media (min-width: 1199px) {
    font-size: ${theme.fontSizes.large};
  }
`;

const ProductWrapper = styled.div`
  position: relative;
  margin-bottom: 50px;
  @media (min-width: 767px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  margin-right: auto;
  margin-left: auto;
`;

const ContentWrapper = styled.div`
  @media (min-width: 767px) {
    display: flex;
    width: 80%;
  }
`;

const DetailsCategory = styled.p`
  font-weight: 400;
  font-size: ${theme.fontSizes.small};
  margin-bottom: 10px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.medium};
  }
  @media (min-width: 1199px) {
    font-size: ${theme.fontSizes.extraLarge};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: block;
  @media (min-width: 767px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;

const ImageWrapper = styled.span`
  @media (min-width: 767px) {
    background-size: contain;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }


`;

const Image = styled.img`
max-height: 320px;
object-fit: contain;
margin-bottom: 20px;
@media (min-width: 767px) {
  object-fit: contain;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
}
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 767px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;

const DetailsText = styled.p`
  font-weight: 500;
  font-size: ${theme.fontSizes.medium};
  margin-bottom: 20px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.large};
  }
  @media (min-width: 1199px) {
    font-size: ${theme.fontSizes.extraLarge};
  }
`;

const Price = styled.p`
  font-size: ${theme.fontSizes.large};
  margin-bottom: 30px;
  @media (min-width: 767px) {
    font-size: ${theme.fontSizes.extraLarge};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
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
    size,
    score,
  } = data;
  const sizes = size && size.join(", ");
  const dispatch = useDispatch();
  const busket = useSelector(getBusket);

  const handleClick = (newData) => {
    dispatch(addToBusket(newData));
  };

  useEffect(() => {
    scroller.scrollTo("scroll", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }, []);

  const isFromBusket = busket.find((item) => item.product_id === product_id);

  return (
    <>
      <ProductWrapper>
        <ContentWrapper>
        {/* <GoBackWrapper>
          <SlArrowLeftCircle size="32" />
          <GoBackLink id="scroll" to="/">
            Назад
          </GoBackLink>
        </GoBackWrapper> */}
        <ImageContainer>
          <ImageWrapper>
            {photo ? (
              <Image alt="" src={`https://kintsugi.joinposter.com${photo}`} />
            ) : (
              <Image
                alt=""
                src={`https://res.cloudinary.com/dzjmswzgp/image/upload/c_crop,ar_1:1/v1719250641/image_not_found_wruanw.jpg`}
              />
            )}
          </ImageWrapper>
        </ImageContainer>
        <DetailsWrapper>
          <ProductName>{product_name}</ProductName>
          <ScoreWrapper>
            <Score score={score} />
          </ScoreWrapper>
          <DetailsCategory>Опис</DetailsCategory>
          <DetailsText>{description}</DetailsText>
          <DetailsCategory>Розміри</DetailsCategory>
          <DetailsText>{size === "-" ? "One size" : sizes}</DetailsText>
          <Price $accent>{price / 100}грн.</Price>
          {isFromBusket ? (
            <ButtonWrapper>
              <AddButton>
                <CountButton
                  amount={isFromBusket.amount}
                  product_id={product_id}
                />
              </AddButton>
            </ButtonWrapper>
          ) : (
            // ) : (
            //   <ButtonWrapper>
            //     {size[0] === "-" ? (
            //       ""
            //     ) : (
            //       <Select
            //         onChange={(e) => (sizeRef.current.value = e.target.value)}
            //         ref={sizeRef}
            //       >
            //         {size.map((item) => {
            //           return <option>{item}</option>;
            //         })}
            //       </Select>
            //     )}
            <ButtonWrapper>
              <AddButton
                id={product_id}
                onClick={() => {
                  handleClick({
                    product_id,
                    product_name,
                    description,
                    photo,
                    price,
                    amount,
                    category_name,
                  });
                }}
              >
                Додати у кошик
              </AddButton>
            </ButtonWrapper>
          )}
        </DetailsWrapper>
        </ContentWrapper>
      </ProductWrapper>
    </>
  );
}
