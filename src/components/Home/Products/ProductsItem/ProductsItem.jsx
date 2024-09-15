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
import {
  selectBusketItemAmount,
  selectIsLoading,
} from "../../../../redux/products/products-selectors";
import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import Score from "../Feedback/Score";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { getProductsById } from "../../../../redux/products/products-operation";
import useModal from "../../../../hooks/modal";
import { useEffect, useState } from "react";
import ProductButtons from "../../../Buttons/ProductButton";
import { SizeModal } from "../../../Modal/Modals";

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
  console.log(product)
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
  const [activeSize, setActiveSize] = useState(null);
  const busketProduct = useSelector((state) =>
    selectBusketItemAmount(state, product.product_id)
  );

  const {
    openModal: openModalSize,
    closeModal: closeModalSize,
    isModalOpen: isModalOpenSize,
  } = useModal();

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

  const handleClick = (data) => {
    dispatch(addToBusket(data));
  };

  useEffect(() => {
    if (activeSize && !isModalOpenSize && !busketProduct) {
      setActiveSize(null);
    }
  }, [activeSize, isModalOpenSize, busketProduct]);

  return (
    <>
      <Item key={itemId}>
        <ItemBody>
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
          <ScoreWrapper>
            <Score score={score} />
          </ScoreWrapper>
          <Category>{category_name}</Category>
          <Title>{product_name}</Title>
          <CardInfoWrapper>
            <Price>{price / 100} грн.</Price>
          </CardInfoWrapper>
          <ProductButtons
            product={product}
            activeSize={activeSize}
            openModalSize={openModalSize}
          />
        </ItemBody>
      </Item>
      {isModalOpenSize && (
        <SizeModal
          handleClick={handleClick}
          closeModalSize={closeModalSize}
          modalProduct={product}
          setActiveSize={setActiveSize}
          activeSize={activeSize}
          isModalOpenSize={isModalOpenSize}
        />
      )}
    </>
  );
};
