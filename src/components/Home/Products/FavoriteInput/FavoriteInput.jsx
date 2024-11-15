import { memo, useEffect, useState } from "react";
import { Block } from "../../../Busket/CheckoutPage/CheckoutSteps/Steps.styled";
import { useDispatch, useSelector } from "react-redux";
import { selectRole } from "../../../../redux/auth/auth-selectors";
import { BlockTitle } from "../../../Text/Text.styled";
import { toggleFavoriteProducts } from "../../../../redux/products/products-operation";

export const FavoriteInput = memo(({favorite, product_id}) => {
  const isAdmin = useSelector(selectRole) === "admin";
  const [favoriteInput, setFavoriteInput] = useState(favorite === undefined ? false : favorite);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(toggleFavoriteProducts({product_id, favorite: favoriteInput}));
  }, [favoriteInput, dispatch, product_id])

  return(
    <>
    {isAdmin ?
      <Block style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
    <BlockTitle htmlFor="">Популярний товар
      </BlockTitle>
      <input onChange={(e) => setFavoriteInput(!favoriteInput)} type="checkbox" checked={favoriteInput} />
      </Block>
      :
      ""
    }
    </>
  )
})