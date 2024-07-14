import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AddButton } from "../../../Buttons/Buttons";
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
import { createBrowserHistory } from "history";
import { selectUser } from "../../../../redux/auth/auth-selectors";
import Dropzone from "./Dropzone/Dropzone";
import Slider from "../../Swiper/Swiper";


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
  left: 40px;
  top: -40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
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
  position: relative;
  display: block;
`;

const ImageWrapper = styled.span`
  @media (min-width: 767px) {
    background-size: cover;
    // position: absolute;
    // top: 0px;
    // left: 0px;
    // width: 100%;
    // height: 100%;
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
font-weight: 500;
`;

const Text = styled.p`
  font-weight: 400;
  font-size: ${theme.fontSizes.small};
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
    photo_extra
  } = data;


  let photos = []
  photos.unshift(photo)

  if(photo_extra) {
    photos.push(...photo_extra);
  }

  const history = createBrowserHistory();

  const [activeSize, setActiveSize] = useState(modifications.length > 0 ? modifications[0].modificator_name : null);
  const dispatch = useDispatch();
  const busket = useSelector(getBusket);

  const user = useSelector(selectUser);
  const isAdmin = user.role === "admin" ? true : false;

  const handleClick = (newData) => {
    dispatch(addToBusket(newData));
  };

  const handleBackClick = () => {
    history.go(-1)
  }

  const isFromBusket = busket.find((item) => item.product_id === product_id);
  const item = busket.find((item) => item.product_id === product_id);

  return (
    <>
      <ProductWrapper>
        <ContentWrapper>
        <GoBackWrapper>
          <SlArrowLeftCircle size="24" />
          <GoBackLink id="scroll" onClick={handleBackClick}>
            Назад
          </GoBackLink>
        </GoBackWrapper>
        <ImageContainer>
          <ImageWrapper>
          <Slider images={photos} />
            {/* {photo ? (
              <Image alt="" src={`https://kintsugi.joinposter.com${photo}`} />
            ) : (
              <Image
                alt=""
                src={`https://res.cloudinary.com/dzjmswzgp/image/upload/c_crop,ar_1:1/v1719250641/image_not_found_wruanw.jpg`}
              />
            )} */}
          </ImageWrapper>
        </ImageContainer>
        <DetailsWrapper>
          <Title>{product_name}</Title>
          <Text>Код товару: {`${product_id}`}</Text>
          <Subtitle>{price / 100}грн</Subtitle>
            <Score score={score} />
              <Subtitle>Розмір: {activeSize ? activeSize : "One size"}</Subtitle>
              {modifications.length > 0 &&
          <AddButtonWithSize activeSize={activeSize} setActiveSize={setActiveSize} modifications={modifications}  />
              }
              {isFromBusket ? 
              <AddButton>
                <CountButton amount={item.amount} product_id={item.product_id} />
              </AddButton>
              :
              <AddButton onClick={() => handleClick({
                product_id,
                product_name,
                description,
                photo,
                price,
                amount,
                category_name,
                size: activeSize
              })}>Додати
              <LuShoppingBasket style={{fontSize: `16px`}} />
              </AddButton>
            }
        </DetailsWrapper>
        </ContentWrapper>
      </ProductWrapper>
      {isAdmin &&
        <Dropzone _id={product_id} />
        }
    </>
  );
}

