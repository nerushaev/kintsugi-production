import {
  Item,
  Title,
  Image,
  TextWrapper,
  Text,
} from "./BusketList.styled";
import { useDispatch, useSelector } from "react-redux";
import { getBusket } from "../../redux/products/products-selectors";
import { AddButton, ButtonWrapper } from "../Buttons/Buttons";
import CountButton from "../Home/Products/ProductsItem/CountButton";
import { IconWrapper, Select } from "../Home/Products/ProductsItem/ProductsItem";
import { useRef } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { addToBusket } from "../../redux/products/products-slice";

export default function BusketItem({ data }) {
  const dispatch = useDispatch();
  const busket = useSelector(getBusket);
  const sizeRef = useRef();


  const handleClick = (newData) => {
    dispatch(addToBusket(newData))
  }


  return data.map(({ name, _id, image, price, amount, size }) => {
    const isFromBusket = busket.find((item) => item._id === _id);
    console.log(size);

    return (
      <Item key={_id}>
        <TextWrapper>
          <Image src={image[0]} alt="" />
        </TextWrapper>
        <TextWrapper>
          <Title>{name}</Title>
        </TextWrapper>
        <TextWrapper>
          <Text>{price}грн.</Text>
        </TextWrapper>
        <TextWrapper>
          <Text>Кількість: {amount}</Text>
        </TextWrapper>
        <TextWrapper>
          <Text>Розмір: {size ? size : "One size"}</Text>
        </TextWrapper>
        {isFromBusket ? (
            <ButtonWrapper>
            <AddButton>
              <CountButton quantity={amount} _id={_id} />
            </AddButton>
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
            {size < 1 ? "" : 
            <Select onChange={e => sizeRef.current.value = e.target.value} ref={sizeRef} name="size" id="size">
              {size.map(item => {
                return <option key={item}>{item}</option>
              })}
            </Select>}
            <AddButton
              onClick={() => {
                const {value} = sizeRef.current;
                handleClick({
                  _id,
                  name,
                  image,
                  price,
                  amount,
                  size: value
                })}
              }
            >
              Додати у кошик
              <IconWrapper>
              <ShoppingCartOutlinedIcon />
              </IconWrapper>
            </AddButton>
            </ButtonWrapper>
          )}
      </Item>
    );
  });
}
