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
import {
  selectIsLoading,
} from "../../../../redux/products/products-selectors";
import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import Score from "../Feedback/Score";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { getProductsById } from "../../../../redux/products/products-operation";
import ProductsItemController from "./ProductsItemController";
import WishButton from "../WishButton/WishButton";

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
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Category = styled.p`
  color: gray;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
`;

const DontHaveMessage = styled.p`
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 10px 5px;
  background-color: rgb(128, 128, 128, 0.2);
  font-size: 12px;
  text-align: center;
  z-index: 1000;
`;

export const ProductsItem = ({ product }) => {
  const {
    product_name,
    product_id,
    amount,
    photo,
    price,
    score,
    category_name,
  } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector(selectIsLoading);


  const itemId = nanoid();

  const handleClickImage = async (product_id) => {
    localStorage.setItem("previousUrl", location.search);
    localStorage.setItem("scrollPosition", window.scrollY);
    await dispatch(getProductsById(product_id)).then(() => {
      if (!loading) {
        navigate(`/products/${product_id}`);
      }
    });
  };



  return (
    <>
      <Item key={itemId}>
        <ItemBody>
        <Category>{category_name}</Category>
        <Title>{product_name}</Title>
        <ScoreWrapper>
            <Score score={score} />
          </ScoreWrapper>
          <StyledLink
            onClick={
              amount === 0
                ? () => {
                    return;
                  }
                : () => handleClickImage(product_id)
            }
          >
            <ImageWrapper>
              {amount === 0 && (
                <DontHaveMessage>Немає в наявності!</DontHaveMessage>
              )}
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
                <div style={{marginTop: ""}}>
                <CardInfoWrapper>
            <Price>₴{price / 100}</Price>
            <WishButton product_id={product_id} />
          </CardInfoWrapper>

          <ProductsItemController product={product} />
                </div>
          
          
        </ItemBody>
      </Item>

    </>
  );
};
