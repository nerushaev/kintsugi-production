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
} from "../ListItem.styled";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addToBusket } from "../../../../redux/products/products-slice";
import { Link } from "react-router-dom";
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

export const ProductsItem = ({ data, id }) => {
  const dispatch = useDispatch();
  const busket = useSelector(getBusket);
  const sizeRef = useRef();

  const handleClick = (newData) => {
    dispatch(addToBusket(newData));
  };

  return data.map(
    ({
      name,
      description,
      _id,
      image,
      price,
      amount,
      category,
      size,
      score,
    }) => {
      const isFromBusket = busket.find((item) => item._id === _id);
      const item = busket.find((item) => item._id === _id);
      const itemId = nanoid();
      const sizes = size ? size.join(", ") : "";

      return (
        <Item key={itemId}>
          <ItemBody>
            {id === _id ? (
              <Image src={image[0] ? image[0] : image} alt="" />
            ) : (
              <Link to={`/products/${_id}`}>
                <Image src={image[0] ? image[0] : image} alt="" />
              </Link>
            )}
            <ScoreWrapper>
              <Score score={score} />
            </ScoreWrapper>

            <Title>{name}</Title>

            <Description>{description}</Description>
            <CardInfoWrapper>
              <Price>{price} грн.</Price>
              <Sizes>{sizes === "-" ? "One size" : sizes}</Sizes>
            </CardInfoWrapper>
            {isFromBusket ? (
              <ButtonWrapper $noMargin>
                <AddButton>
                  <CountButton quantity={item.amount} _id={_id} />
                </AddButton>
              </ButtonWrapper>
            ) : (
              <ButtonWrapper $noMargin>
                {sizes === "-" ? (
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
                )}
                {sizes === "-" ? (
                  <AddButton
                    onClick={() => {
                      handleClick({
                        _id,
                        name,
                        description,
                        image,
                        price,
                        amount,
                        category,
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
                        _id,
                        name,
                        description,
                        image,
                        price,
                        amount,
                        category,
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
