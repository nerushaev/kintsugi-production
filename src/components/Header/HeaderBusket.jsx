import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import useModal from "../../hooks/modal";
import { useSelector } from "react-redux";
import { selectBusketAmount } from "../../redux/products/products-selectors";
import svg from "../../assets/filterIcons.svg";
import Modal from "../Modal";
import SideBusket from "../Busket/SideBusket/SideBusket";
import { AnimationP, BusketWrapper, TotalPrice } from "./Header.styled";

const HeaderBusket = memo(() => {
  const { isModalOpen: isSideModalOpen, closeModal, openModal: openSideModal } = useModal();
  const totalAmount = useSelector(selectBusketAmount)
  const handleClick = () => {
    openSideModal();
  };
  return(
    <>
    <div style={{marginRight: "5px"}} onClick={handleClick}>
                <BusketWrapper>
                  {totalAmount > 0 && <TotalPrice>{totalAmount}</TotalPrice>}
                  <svg width="42" height="50">
                    <use xlinkHref={`${svg}#icon-shopping-cart`} />
                  </svg>
                </BusketWrapper>
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
  )
})

const variants = {
  visible: {opacity: 1},
  hidden: {opacity: 0}
}

export default HeaderBusket;