import { Button } from "../../../Buttons/Buttons";
import React, { memo, useCallback } from "react";
import Score from "../Feedback/Score";
import { SlArrowLeftCircle } from "react-icons/sl";
import Slider from "../../Swiper/Swiper";
import { useNavigate } from "react-router";
import { animateScroll } from "react-scroll";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "swiper/css/pagination";
import DescriptionChange from "./DescriptionChange";
import {
  Block,
  BlockSlider,
  BlockTextFlex,
  BlockWrapper,
  GoBackLink,
  GoBackWrapper,
  ImageContainer,
  LinkToFeedback,
  ProductWrapper,
  ScoreWrapper,
} from "./ProductsDetails.styled";
import Dropzone from "../Dropzone/Dropzone";
import {
  BlockTitle,
  BlockTitleWrapper,
  Price,
  Text,
  TextWrapper,
} from "../../../Text/Text.styled";
import ProductsItemController from "../ProductsItem/ProductsItemController";

const ProductsDetails = memo(({ data, setFeedback }) => {

  const {
    product_name,
    description,
    product_id,
    photo_origin,
    price,
    category_name,
    score,
    photo_extra,
  } = data;

  const photos = [photo_origin, ...(photo_extra || [])];
  console.log(data)
  const navigate = useNavigate();
  const isAdmin = true;

  const handleBackClick = useCallback(() => {
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
  }, [navigate]);

  const handleRatingClick = useCallback(() => {
    setFeedback(true);
    animateScroll.scrollToBottom({ delay: 0 });
  }, [setFeedback]);

  return (
    <>
      <GoBackWrapper>
        <Button onClick={handleBackClick}>
          <SlArrowLeftCircle size="22" />
          <GoBackLink id="scroll">Назад</GoBackLink>
        </Button>
      </GoBackWrapper>
      <ProductWrapper>
        <BlockSlider>
          <ImageContainer>
            <Slider photos={photos} />
          </ImageContainer>
        </BlockSlider>
        <BlockWrapper>
          <Block style={{ width: "100%" }}>
            <div>
              <BlockTitleWrapper>
                <BlockTitle>{product_name}</BlockTitle>
              </BlockTitleWrapper>
              <BlockTitleWrapper>
                <Price>{price / 100}₴</Price>
              </BlockTitleWrapper>
              <ScoreWrapper>
                <Score onClick={handleRatingClick} score={score} />
                <LinkToFeedback onClick={handleRatingClick}>
                  Залишити відгук
                </LinkToFeedback>
              </ScoreWrapper>
              <ProductsItemController product={data} />
            </div>
          </Block>
          <Block style={{ width: "100%" }}>
            <BlockTitleWrapper>
              <BlockTitle>Характеристики</BlockTitle>
            </BlockTitleWrapper>
            <BlockTextFlex>
              <TextWrapper>
                <Text $accent>Код товару:</Text>
              </TextWrapper>
              <TextWrapper>
                <Text>{product_id}</Text>
              </TextWrapper>
            </BlockTextFlex>
            <BlockTextFlex>
              <Text $accent>Категорія:</Text>
              <Text>{category_name}</Text>
            </BlockTextFlex>
          </Block>
          <DescriptionChange
            description={description}
            product_id={product_id}
          />
        </BlockWrapper>
      </ProductWrapper>
      {isAdmin && <Dropzone _id={product_id} />}
    </>
  );
});

export default ProductsDetails;
