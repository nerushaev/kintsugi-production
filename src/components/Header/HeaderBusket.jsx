import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import { useSelector } from "react-redux";
import { selectBusketAmount } from "../../redux/products/products-selectors";
import Modal from "../Modal";
import SideBusket from "../Busket/SideBusket/SideBusket";
import { AnimationP, TotalPrice } from "./Header.styled";
import { LuShoppingBasket } from "react-icons/lu";
import styled from "styled-components";
import { theme } from "../../styles/theme";


const BusketIcon = styled(LuShoppingBasket)`
  font-size: 26px;
  margin-right: 15px;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: scale(1.2);
    color: ${theme.colors.formButton}; /* Синий цвет при ховере */
  }
`;

const HeaderBusket = memo(({closeModal, isSideModalOpen, openSideModal}) => {

  const totalAmount = useSelector(selectBusketAmount);

  const handleClick = () => {
    openSideModal();
  };
  return (
    <>
    <div style={{display: "inline-flex", position: "relative"}}>
    {totalAmount > 0 && <TotalPrice>{totalAmount}</TotalPrice>}
      <BusketIcon
        onClick={handleClick}
      />
    </div>
      
      <AnimatePresence mode="sync">
        {isSideModalOpen && (
          <AnimationP
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Modal onCloseModal={closeModal}>
              <SideBusket closeModal={closeModal} />
            </Modal>
          </AnimationP>
        )}
      </AnimatePresence>
    </>
  );
});

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default HeaderBusket;
