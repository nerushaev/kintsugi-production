import {
  Item,
  Title,
  Image,
  TextWrapper,
  Text,
  IncrementButton,
  DecrementButton,
} from "./BusketList.styled";
import {
  incrementAmount,
  decrementAmount,
} from "../../redux/products/products-slice";
import { useDispatch } from "react-redux";

export default function BusketItem({ data }) {
  const dispatch = useDispatch();

  const handleIncrement = (_id) => {
    dispatch(incrementAmount(_id));
  };

  const handleDecrement = (_id) => {
    dispatch(decrementAmount(_id));
  };
  return data.map(({ name, description, _id, image, price, amount }) => {
    return (
      <Item key={_id}>
        <TextWrapper>
          <Image src={image} alt="" />
        </TextWrapper>
        <TextWrapper>
          <Title>{name}</Title>
        </TextWrapper>
        <TextWrapper>
          <Text>{price}грн.</Text>
        </TextWrapper>
        <TextWrapper>
          <Text>{description}</Text>
        </TextWrapper>
        <TextWrapper>
          <Text>{amount}</Text>
        </TextWrapper>
        <IncrementButton onClick={() => handleIncrement(_id)}>
          <img
            alt="Додати"
            src="https://res.cloudinary.com/dzjmswzgp/image/upload/v1674151460/incrementIcon_m1oiee.png"
          />
        </IncrementButton>
        <DecrementButton onClick={() => handleDecrement(_id)}>
          <img
            alt="Відняти"
            src="https://res.cloudinary.com/dzjmswzgp/image/upload/v1674151992/remove_grrc9z.png"
          />
        </DecrementButton>
      </Item>
    );
  });
}
