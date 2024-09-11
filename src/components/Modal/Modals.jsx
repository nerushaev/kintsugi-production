import { memo } from "react";
import { FormWrapper } from "../Form/Form.styled";
import Modal from "./Modal";
import { CloseWrapper, StyledModal } from "../../pages/CheckoutPage";
import { SlClose } from "react-icons/sl";
import LoginForm from "../Auth/LoginForm/LoginForm";
import styled from "styled-components";
import SizeButtons from "../Home/Products/SizeButtons/SizeButtons";
import { Button, ButtonWrapper } from "../Buttons/Buttons";
import { Notify } from "notiflix";

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 20px 40px;
  padding-top: 60px;
`;

export const ModalLogin = memo(({closeModalLogin}) => {
    return(
        <Modal onCloseModal={closeModalLogin}>
        <FormWrapper>
          <StyledModal>
            <CloseWrapper>
              <SlClose onClick={closeModalLogin} />
            </CloseWrapper>
            <LoginForm />
          </StyledModal>
        </FormWrapper>
      </Modal>
    )
})

export const SizeModal = memo(({isModalOpenSize, closeModalSize, activeSize, setActiveSize, modalProduct, handleClick}) => {

  const handleSize = () => {
    if(activeSize) {
      handleClick({
        ...modalProduct,
        size: activeSize,
      })
      closeModalSize();
    } else {
      Notify.failure("Оберіть розмір!")
    }
  }

  return(
    <Modal isModalOpen={isModalOpenSize} onCloseModal={closeModalSize}>
        <ModalWrapper>
          <p>Оберіть розмір</p>
          <SizeButtons
            activeSize={activeSize}
            modifications={modalProduct.modifications}
            setActiveSize={setActiveSize}
          />
          <ButtonWrapper>
            <Button
              onClick={handleSize}
            >
              Додати у кошик
            </Button>
          </ButtonWrapper>
        </ModalWrapper>
      </Modal>
  )
})