import { nanoid } from "nanoid";
import {
  Item,
  Image,
  Title,
  Price,
  Description,
  CardInfoWrapper,
  ItemBody,
  Sizes,
  StyledLink,
  ImageWrapper
} from "../ListItem.styled";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addToBusket } from "../../../../redux/products/products-slice";
import { getBusket } from "../../../../redux/products/products-selectors";
import CountButton from "./CountButton";
import React, { useRef } from "react";
import { AddButton, ButtonWrapper } from "../../../Buttons/Buttons";
import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import Score from "../Feedback/Score";

export const IconWrapper = styled.div`
  margin-left: 10px;
  display: flex;
`;

export const Select = styled.select`
  // height: 100%;
  width: 40px;
  text-align-last: center;
  background: url(https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-down-20.png)
    no-repeat ${theme.colors.formButton};
  background-position-x: 50%;
  background-position-y: 90%;
  &:hover {
    background-color: ${theme.colors.formButtonAccent};
  }
`;

const ScoreWrapper = styled.div`
  margin-bottom: 10px;
`;

export const ProductsItem = ({ data, product_id }) => {
  const dispatch = useDispatch();
  const busket = useSelector(getBusket);
  const sizeRef = useRef();

  const handleClick = (newData) => {
    dispatch(addToBusket(newData));
  };

  return data.map(
    ({
      product_name,
      description,
      product_id,
      photo,
      price,
      amount,
      category_name,
      size,
      score,
    }) => {
      const isFromBusket = busket.find((item) => item.product_id === product_id);
      const item = busket.find((item) => item.product_id === product_id);
      const itemId = nanoid();
      const sizes = size ? size.join(", ") : "";
      return (
        <Item key={itemId}>
          <ItemBody>
              <StyledLink to={`/products/${product_id}`}>
                <ImageWrapper>
                <Image src={photo ? `https://kintsugi.joinposter.com${photo}` : "https://res.cloudinary.com/dzjmswzgp/image/upload/c_crop,ar_1:1/v1719250641/image_not_found_wruanw.jpg"} alt="" />
                </ImageWrapper>
              </StyledLink>
            <ScoreWrapper>
              <Score score={score} />
            </ScoreWrapper>

            <Title>{product_name}</Title>

            {/* <Description>{description}</Description> */}
            <CardInfoWrapper>
              <Price>{price / 100} грн.</Price>
              <Sizes>{sizes === "-" ? "One size" : sizes}</Sizes>
            </CardInfoWrapper>
            {isFromBusket ? (
              <ButtonWrapper $noMargin>
                <AddButton>
                  <CountButton amount={item.amount} product_id={product_id} />
                </AddButton>
              </ButtonWrapper>
            ) : (
              <ButtonWrapper $noMargin>
                {/* {sizes === "-" ? (
                  ""
                ) : (
                  <Select
                    onChange={(e) => (sizeRef.current.value = e.target.value)}
                    ref={sizeRef}
                    name="size"
                    id="size"
                  >
                    {size.map((item) => {
                      return <option key={item}>{item}</option>;
                    })}
                  </Select>
                )} */}
                {"-" === "-" ? (
                  <AddButton
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
                    <IconWrapper>
                      <ShoppingCartOutlinedIcon />
                    </IconWrapper>
                  </AddButton>
                ) : (
                  <AddButton
                    onClick={() => {
                      handleClick({
                        product_id,
                        product_name,
                        description,
                        photo,
                        price,
                        amount,
                        category_name,
                        size: sizeRef.current.value,
                      });
                    }}
                  >
                    Додати у кошик
                    <IconWrapper>
                      <ShoppingCartOutlinedIcon />
                    </IconWrapper>
                  </AddButton>
                )}
              </ButtonWrapper>
            )}
          </ItemBody>
        </Item>
      );
    }
  );
};
