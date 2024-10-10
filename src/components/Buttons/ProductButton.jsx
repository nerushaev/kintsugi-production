import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBusketItemAmount } from "../../redux/products/products-selectors";
import {
  AddButton,
  ProductItemWrapper,
} from "../../components/Buttons/Buttons";
import CountButton from "../Home/Products/ProductsItem/CountButton";
import { addToBusket } from "../../redux/products/products-slice";
import SizeButtons from "../Home/Products/SizeButtons/SizeButtons";
import { FaPlus } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const Amount = styled.p`
  color: gray;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
`;

const ProductButtons = memo(({ product, activeSize, setActiveSize }) => {
  const dispatch = useDispatch();
  const [currentModificationAmount, setCurrentModificationAmount] = useState(
    product.amount
  );
  const busketProduct = useSelector((state) =>
    selectBusketItemAmount(state, product.product_id)
  );
  const [modificatorUknow, setModificatorUknow] = useState(false);

  const handleAddToBusket = () => {
    if (product.modifications.length !== 0 && !activeSize) {
      setModificatorUknow(true);
      setTimeout(() => {
        setModificatorUknow(false);
      }, 1000);
    } else {
      dispatch(
        addToBusket({
          ...product,
          size: activeSize,
        })
      );
    }
  };

  const { modifications } = product;

  useEffect(() => {
    const result = modifications.filter((item) => {
      return item.modificator_name === activeSize;
    });
    if (result.length === 0) {
      setCurrentModificationAmount(product.amount);
      return;
    }
    setCurrentModificationAmount(result[0]?.size_left);
  }, [activeSize, modifications, product.amount]);

  return (
    <ProductItemWrapper style={{ overflow: "hidden" }}>
        <SizeButtons
          modificatorUknow={modificatorUknow}
          modifications={product.modifications}
          activeSize={activeSize}
          setActiveSize={setActiveSize}
        />
      <AnimatePresence mode="wait" initial={false}>
        {busketProduct ? (
          <motion.div
            key="count"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CountButton
              amount={busketProduct.amount}
              product_id={product.product_id}
            />
          </motion.div>
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <motion.div
              key="add"
              initial={{ opacity: 1, width: "40px" }}
              animate={{ opacity: 1, width: "100%" }}
              exit={{ opacity: 1, width: "40px" }}
              transition={{ duration: 0.2 }}
            >
              <AddButton
                disabled={product.amount <= 0}
                onClick={!busketProduct ? handleAddToBusket : undefined}
              >
                <motion.div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                  key="add"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <FaPlus style={{ fontSize: "16px" }} />
                  Додати
                </motion.div>
              </AddButton>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Amount>Залишилось {currentModificationAmount}</Amount>
    </ProductItemWrapper>
  );
});

export default ProductButtons;
