import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteProducts } from "../../../redux/products/products-operation";
import { selectFavoriteProducts } from "../../../redux/products/products-selectors";
import { ProductsItem } from "../Products/ProductsItem/ProductsItem";
import { BlockTitle } from "../../Text/Text.styled";
import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const FavoriteList = styled.ul`
  box-sizing: border-box;
  display: flex;
  overflow-x: scroll;
`;

const PopularProductSlider = memo(() => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoriteProducts);
  
  useEffect(() => {
    dispatch(getFavoriteProducts());
  },[dispatch])

return(
  <Wrapper>
    <BlockTitle style={{marginBottom: "20px"}}>Популярні товари</BlockTitle>
    <FavoriteList>
      {favorites && favorites.map(item => {
        return(
          <ProductsItem key={item.product_id} favorite={true} product={item} />
        )
      })}
    </FavoriteList>
  </Wrapper>
)
});

export default PopularProductSlider;