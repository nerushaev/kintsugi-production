import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBusketItemAmount } from "../../redux/products/products-selectors";
import { AddButton, ProductItemWrapper } from "../../components/Buttons/Buttons";
import CountButton from "../Home/Products/ProductsItem/CountButton";
import { LuShoppingBasket } from "react-icons/lu";
import { addToBusket } from "../../redux/products/products-slice";
import WishButton from "../Home/Products/WishButton/WishButton";

const ProductButtons = memo(({ product, activeSize, openModalSize }) => {
  const dispatch = useDispatch();
  const busketProduct = useSelector((state) =>
    selectBusketItemAmount(state, product.product_id)
  );



  const handleAddToBusket = () => {
    console.log(product);
    if(!activeSize && product.modifications.length > 0) {
      openModalSize();
    } else {
      dispatch(
        addToBusket({
          ...product,
          size: activeSize,
        })
      );
    }
  };

  return(
    <ProductItemWrapper>
      <WishButton product_id={product.product_id} />
    <AddButton disabled={product.amount <= 0} onClick={!busketProduct ? handleAddToBusket : undefined}>
      {busketProduct ? (
        <CountButton amount={busketProduct.amount} product_id={product.product_id} />
      ) : (
        <>
          Додати
          <LuShoppingBasket style={{ fontSize: '16px' }} />
        </>
      )}
    </AddButton>
    </ProductItemWrapper>
  )
});

export default ProductButtons;
