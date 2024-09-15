import { memo, useCallback, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
} from "../../../../redux/auth/auth-operations";
import { makeSelectIsProductInWishList, selectIsLogin } from "../../../../redux/auth/auth-selectors";
import { theme } from "../../../../styles/theme";
import useModal from "../../../../hooks/modal";
import { ModalLogin } from "../../../Modal/Modals";
import styled from "styled-components";

const WishButtonWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: ${theme.colors.formButton};
  cursor: pointer;
`;


const WishButton = memo(({ product_id }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLogin);
  const isWish = useSelector(makeSelectIsProductInWishList(product_id));
  const { isModalOpen, openModal, closeModal } = useModal();

  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      if (pendingAction && !isWish) {
        dispatch(pendingAction);
        setPendingAction(null);
      } else {
        setPendingAction(null);
      }
      closeModal();
    }
  }, [isLoggedIn, dispatch, closeModal, isWish, pendingAction]);

  const handleAddToWishList = useCallback(() => {
    if (!isLoggedIn) {
      setPendingAction(() => addToWishList({ product_id }));
      openModal();
    } else {
      dispatch(addToWishList({ product_id }));
    }

  }, [dispatch, product_id, isLoggedIn, openModal]);

  const handleRemoveFromWish = useCallback(() => {
    dispatch(removeFromWishList({ product_id }));
  }, [dispatch, product_id]);

  const handleClick = useCallback(() => {
    if (isWish) {
      handleRemoveFromWish();
    } else {
      handleAddToWishList();
    }
  }, [isWish, handleAddToWishList, handleRemoveFromWish]);


  return (
    <>
      <WishButtonWrapper
          onClick={handleClick}
        >
          <FaHeart
            style={{ color: isWish ? `${theme.colors.rose}` : "white" }}
          />
        </WishButtonWrapper>
      {isModalOpen && <ModalLogin closeModalLogin={closeModal} />}
    </>
  );
});

export default WishButton;
