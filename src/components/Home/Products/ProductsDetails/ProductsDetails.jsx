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
import useModal from "../../../../hooks/modal";
import Modal from "../../../Modal/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/zoom';
import 'swiper/css/pagination';
import { nanoid } from "@reduxjs/toolkit";
import { IoMdClose } from "react-icons/io";
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
  position: relative;
  margin-bottom: 40px;
  margin-right: auto;
  margin-left: auto;
`;

const ContentWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 6px;
  @media (min-width: 767px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;

const ImageContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  min-height: 320px;
  min-width: 320px;
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

const CloseModal = styled.p`
  position: absolute;
  top:20px;
  right: 20px;
  z-index:1001;
`;

export default function ProductsDetails({ data, setFeedback }) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // Состояние для хранения текущего индекса слайда
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
      <ProductWrapper>
        <GoBackWrapper>
          <Button onClick={handleBackClick}>
            <SlArrowLeftCircle size="22" />
            <GoBackLink id="scroll">Назад</GoBackLink>
          </Button>
        </GoBackWrapper>
        <ContentWrapper>
          <ImageContainer onClick={openModal}>
            {!isModalOpen && (
              <Slider
                activeSlideIndex={activeSlideIndex}
                setActiveSlideIndex={setActiveSlideIndex}
                photos={photos}
              />
            )}
          </ImageContainer>

          <DetailsWrapper>
            <Title>{product_name}</Title>
            <Text $accent>Категорія: {category_name}</Text>
            <Text $accent>Код товару: {product_id}</Text>
            <Subtitle>{price / 100}грн</Subtitle>
            <ScoreWrapper>
              <Score onClick={handleRatingClick} score={score} />
              <LinkToFeedback onClick={handleRatingClick}>
                Залишити відгук
              </LinkToFeedback>
            </ScoreWrapper>
            <Subtitle>Розмір: {activeSize ? activeSize : "One size"}</Subtitle>
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
      {isModalOpen && (
        <Modal onCloseModal={closeModal}>
        {/*   <SwiperContainer> */}
            <Swiper
              key="swiper2"
              onSlideChange={(swiper) => {
                setActiveSlideIndex(swiper.activeIndex);
              }}
              pagination={true}
              zoom={true}
              navigation={true}
              initialSlide={activeSlideIndex}
              modules={[Navigation, Zoom, Pagination]}
              style={{
                'width': '100%',
                'height': '100%',
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              }}
            >
            <CloseModal><IoMdClose onClick={closeModal} style={{fontSize: "36px", color: "white"}} /></CloseModal>
              {photos.map((item) => {
                const swiperId = nanoid();
                if (item && item[0] === "/") {
                  item = `https://kintsugi.joinposter.com${item}`;
                }
                return (
                  <SwiperSlide
                    key={swiperId}
                    style={{overflow: "hidden"}}
                  >
                    <div className="swiper-zoom-container">
                    <img
                      src={
                        item
                          ? item
                          : "https://res.cloudinary.com/dzjmswzgp/image/upload/c_crop,ar_1:1/v1719250641/image_not_found_wruanw.jpg"
                      }
                      alt=""
                    />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
        {/* </SwiperContainer> */}
        </Modal>
      )}
    </>
  );
}
