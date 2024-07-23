import { nanoid } from "nanoid";
import {
  Item,
  Image,
  Title,
  Price,
  CardInfoWrapper,
  ItemBody,
  StyledLink,
  ImageWrapper,
} from "../ListItem.styled";
import { useDispatch, useSelector } from "react-redux";
import { addToBusket } from "../../../../redux/products/products-slice";
import { getBusket } from "../../../../redux/products/products-selectors";
import CountButton from "./CountButton";
import {
  ProductItemButton,
  ProductItemWrapper,
} from "../../../Buttons/Buttons";
import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import Score from "../Feedback/Score";
import { LuShoppingBasket } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { FaHeart } from "react-icons/fa";
import {
  addToWishList,
  removeFromWishList,
} from "../../../../redux/auth/auth-operations";
import { selectWishes } from "../../../../redux/auth/auth-selectors";


export const Select = styled.select`
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

const Category = styled.p`
  color: ${theme.colors.gray};
  margin-bottom: 5px;
  font-size: ${theme.fontSizes.small};
  font-weight: 500;
`;

const HeartButton = styled(ProductItemButton)`
  transition: color 0.3s ease, transform 0.2s ease; /* Переход по цвету и трансформации */
  display: flex;
  align-items: center;
`;

const HeartIcon = styled(FaHeart)`
  transition: color 0.3s ease, transform 0.2s ease; /* Переход по цвету и трансформации */
  transform: ${({ $isWish }) =>
  $isWish
      ? "scale(1.3)"
      : "scale(1)"}; /* Увеличение иконки при добавлении в избранное */
  &:hover {
    transform: scale(1.3); /* Увеличение при наведении */
  }
`;

export const ProductsItem = ({
  data,
  handleItemWithSize,
  openModalLogin,
  isLoggedIn,
}) => {
  const dispatch = useDispatch();
  const busket = useSelector(getBusket);
  const navigate = useNavigate();
  const location = useLocation();
  const wishes = useSelector(selectWishes);

  const handleClick = (newData) => {
    dispatch(addToBusket(newData));
  };

  const handleAddToWishList = async (product_id) => {
    if (!isLoggedIn) {
      await openModalLogin();
      if(isLoggedIn) {
        dispatch(addToWishList({ product_id: product_id }));
      } else {
        return;
      }
    }
    dispatch(addToWishList({ product_id: product_id }));
  };

  const handleRemoveFromWish = (product_id) => {
    dispatch(removeFromWishList({ product_id: product_id }));
  };

  const handleClickImage = (product_id) => {
    localStorage.setItem("previousUrl", location.search);
    localStorage.setItem("scrollPosition", window.pageYOffset);
    navigate(`/products/${product_id}`);
  };

  return data.map(
    ({
      product_name,
      product_id,
      photo,
      price,
      amount,
      category_name,
      score,
      modifications,
    }) => {
      const isFromBusket = busket.find(
        (item) => item.product_id === product_id
      );
      const item = busket.find((item) => item.product_id === product_id);
      const itemId = nanoid();
      const isWish = wishes?.includes(product_id);

      return (
        <Item key={itemId}>
          <ItemBody>
            <StyledLink onClick={() => handleClickImage(product_id)}>
              <ImageWrapper>
                <Image
                  src={
                    photo
                      ? `https://kintsugi.joinposter.com${photo}`
                      : "https://res.cloudinary.com/dzjmswzgp/image/upload/c_crop,ar_1:1/v1719250641/image_not_found_wruanw.jpg"
                  }
                  alt=""
                />
              </ImageWrapper>
            </StyledLink>
            <ScoreWrapper>
              <Score score={score} />
            </ScoreWrapper>
            <Category>{category_name}</Category>
            <Title>{product_name}</Title>
            <CardInfoWrapper>
              <Price>{price / 100} грн.</Price>
              {/* <Sizes>{sizes === "-" ? "One size" : sizes}</Sizes> */}
            </CardInfoWrapper>
            <ProductItemWrapper>
              <HeartButton
                onClick={
                  isWish
                    ? () => handleRemoveFromWish(product_id)
                    : () => handleAddToWishList(product_id)
                }
              >
                <HeartIcon
                  $isWish={isWish}
                  style={{ color: isWish ? `${theme.colors.rose}` : "white", fontSize: "16px" }}
                />
              </HeartButton>
              {isFromBusket ? (
                <ProductItemButton>
                  <CountButton amount={item.amount} product_id={product_id} />
                </ProductItemButton>
              ) : (
                <ProductItemButton
                  onClick={
                    modifications?.length !== 0
                      ? () =>
                          handleItemWithSize({
                            product_id,
                            product_name,
                            photo,
                            price,
                            amount,
                            category_name,
                            modifications,
                          })
                      : () =>
                          handleClick({
                            product_id,
                            product_name,
                            photo,
                            price,
                            amount,
                            category_name,
                          })
                  }
                >
                  Додати
                  <LuShoppingBasket style={{ fontSize: `16px` }} />
                </ProductItemButton>
              )}
            </ProductItemWrapper>
          </ItemBody>
        </Item>
      );
    }
  );
};
