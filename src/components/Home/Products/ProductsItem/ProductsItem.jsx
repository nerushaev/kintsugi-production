import { nanoid } from "nanoid";
import {
  Item,
  Image,
  Title,
  Price,
  Description,
  CardInfoWrapper,
  ItemBody,
  Sizes
} from "../ListItem.styled";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from "react-redux";
import { addToBusket } from "../../../../redux/products/products-slice";
import { Link } from "react-router-dom";
import { getBusket } from "../../../../redux/products/products-selectors";
import CountButton from "./CountButton";
import React, { useRef } from "react";
import { AddButton, ButtonWrapper } from "../../../Buttons/Buttons";
import styled from 'styled-components';
import { theme } from "../../../../styles/theme";

export const IconWrapper = styled.div`
  margin-left: 10px;
  display: flex;
`;

export const Select = styled.select`
  // height: 100%;
  background-color: ${theme.colors.formButton};
`;

export const ProductsItem = ({ data, id }) => {
  const dispatch = useDispatch();
  const busket = useSelector(getBusket);
  const sizeRef = useRef();

  const handleClick = (newData) => {
    dispatch(addToBusket(newData));
  };

  return data.map(
    ({ name, description, _id, image, price, amount, category, size }) => {
      const isFromBusket = busket.find((item) => item._id === _id);
      const item = busket.find((item) => item._id === _id);
      const itemId = nanoid();
      const sizes = size ? size.join(", ") : "";
      
      return (
        <Item key={itemId}>
          <ItemBody>
            {id === _id ? 
            <Image src={image[0] ? image[0] : image} alt="" />
            :
            <Link to={`/products/${_id}`}>
            <Image src={image[0] ? image[0] : image} alt="" />
          </Link>
          }
            <Title>{name}</Title>
            <Description>{description}</Description>
            <CardInfoWrapper>
            <Price>{price} грн.</Price>
            <Sizes>{sizes === "-" ? "One size" : sizes}</Sizes>
            </CardInfoWrapper>
          {isFromBusket ? (
            <ButtonWrapper>
            <AddButton>
              <CountButton quantity={item.amount} _id={_id} />
            </AddButton>
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
            {sizes === "-" ? "" : 
            <Select onChange={e => sizeRef.current.value = e.target.value} ref={sizeRef} name="size" id="size">
              {size.map(item => {
                return <option key={item}>{item}</option>
              })}
            </Select>}
            {sizes === "-" ? 
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
              })}
            }
          >
            Додати у кошик
            <IconWrapper>
            <ShoppingCartOutlinedIcon />
            </IconWrapper>
          </AddButton>
          :
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
                size: sizeRef.current.value
              })}
            }
          >
            Додати у кошик
            <IconWrapper>
            <ShoppingCartOutlinedIcon />
            </IconWrapper>
          </AddButton>
          }
            
            </ButtonWrapper>
          )}
          </ItemBody>
        </Item>
      );
    }
  );
};
