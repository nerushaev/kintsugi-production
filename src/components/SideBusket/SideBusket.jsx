import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { IoCloseOutline } from "react-icons/io5";
import { CiShoppingBasket } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getBusket, totalBusketPrice } from "../../redux/products/products-selectors";
import CountButton from "../Home/Products/ProductsItem/CountButton";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { removeFromBusket } from "../../redux/products/products-slice";

const SideBlockAnimated = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  margin: 0 auto;
  padding: 10px;
  width: 312px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: ${theme.fontSizes.large};
  font-weight: 500;
`;

const BlockFlex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const BlockFlexHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 10px;
  &:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 2px;
    background-color: ${theme.colors.formButton};
    bottom: 0;
  }
`;

const ContentBlockFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProductsList = styled.ul`
  height: 100%;
  width: 100%;
  padding-bottom: 10px;
  overflow: scroll;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: calc(100vh - 250px);
`;

const ProductItem = styled.li`
  position: relative;
  padding: 25px 5px;
  &:after{
    position: absolute;
    content: "";
    width: 100%;
    height: 2px;
    background-color: ${theme.colors.formButton};
    bottom: 0;
  }
`;

const ProductBody = styled.div`
  display: flex;
`;

const ProductImageBlock = styled.div`
  width: 100%;
  overflow: hidden;
  margin-right: 10px;
  max-width: 10rem;
`;

const ProductDetailsBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
`;

const AmountCountBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.span`
  font-size: ${theme.fontSizes.large};
  font-weight: 600;
`;

const BusketBlockBottom = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: white;
`;

const BusketTotalPriceBlock = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

const BusketTotalPrice = styled.button`
width: 100%;
font-size: 1.6rem;
color: black;
text-align: center;
background: ${theme.colors.ligthGray};
padding: 2rem;
margin-bottom: 0;
font-weight: 600;
`;

const variants = {
  visible: {opacity: 1, x: 0},
  hidden: {opacity: 0, x: 100}
}

export default function SideBusket({ closeModal }) {
  const busket = useSelector(getBusket);
  const totalPrice = useSelector(totalBusketPrice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if(busket.length !== 0) {
      navigate("/checkout");
      window.scrollTo({ 
        top: 0,  
        behavior: 'smooth'
      }); 
      closeModal();
    }
  }

  return (
    <AnimatePresence mode="wait">
      <SideBlockAnimated
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      >
  <BlockFlexHeader>
    <ContentBlockFlex>
      <CiShoppingBasket style={{ fontSize: "32px" }} />
      <Title>Корзина</Title>
    </ContentBlockFlex>
    <div>
      <button onClick={closeModal}>
        <IoCloseOutline
          style={{
            fontSize: "32",
            backgroundColor: `${theme.colors.formButton}`,
          }}
        />
      </button>
    </div>
  </BlockFlexHeader>

  <BlockFlex>
    <ProductsList>
      {busket.map((item) => {
        return (
          <ProductItem key={item.product_id}>
            <IoCloseOutline onClick={() => dispatch(removeFromBusket(item.product_id))}
          style={{
            fontSize: "32",
            position: "absolute",
            right: 0,
            top: 0
          }}
        />
            <ProductBody>
              <ProductImageBlock>
                <img
                  src={`https://kintsugi.joinposter.com${item.photo}`}
                  alt=""
                />
              </ProductImageBlock>
              <ProductDetailsBlock>
                <a href={`/products/${item.product_id}`}>{item.product_name}</a>
                <AmountCountBlock>
                  <span>X{item.amount}</span>
                  <div style={{backgroundColor: `${theme.colors.formButton}`, padding: "4px", borderRadius: "6px"}}>
                  <CountButton amount={item.amount} product_id={item.product_id} />
                  </div>
                </AmountCountBlock>
                <Price>{(item.price * item.amount) / 100}грн</Price>
              </ProductDetailsBlock>
            </ProductBody>
          </ProductItem>
        );
      })}
    </ProductsList>
  </BlockFlex>
  
  <BusketBlockBottom>
    <BusketTotalPriceBlock>
      <BusketTotalPrice>Всього <span>{totalPrice}грн</span></BusketTotalPrice>
    </BusketTotalPriceBlock>
    <BusketTotalPriceBlock>
      <BusketTotalPrice disabled={totalPrice < 300} style={{backgroundColor: `${theme.colors.formButton}`}} onClick={() => handleClick()}>Замовити</BusketTotalPrice>
    </BusketTotalPriceBlock>
    <div style={{padding: "5px 10px"}}>Мінімальна сума замовлення 300грн</div>
  </BusketBlockBottom>
</SideBlockAnimated>
    </AnimatePresence>
  );
}


