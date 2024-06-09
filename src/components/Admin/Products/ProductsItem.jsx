import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../../redux/products/products-operation";
import useModal from "../../../hooks/modal";
import Modal from '../../Modal/';
import ProductsChangeModal from "./ProductsChangeModal";

const Image = styled.img`
  width: 60px;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr 1fr;
`;

export const ItemsWrapper = styled.div`
`;

const ImageWrapper = styled.div`
  margin-right: 10px;
`;

const OptionsButton = styled.button`
  color: red;
  &:not(:last-child) {
    color: blue;
    margin-right: 50px;
  }
`;

const Text = styled.p`
  font-size: 14px;
`;

export default function ProductsItem({ data }) {
  const { name, amount, price, _id, image } = data;

  const {closeModal, isModalOpen, openModal} = useModal();

  const dispatch = useDispatch();

  return (
    <li>
    {isModalOpen &&
    <Modal onCloseModal={closeModal}>
      <ProductsChangeModal data={data} closeModal={closeModal} />
    </Modal>
    }
    <Wrapper>
      <ItemsWrapper>
        <ImageWrapper><Image src={image[0]}/></ImageWrapper></ItemsWrapper>
      <ItemsWrapper><Text>{name}</Text></ItemsWrapper>
      <ItemsWrapper><Text>{amount}</Text></ItemsWrapper>
      <ItemsWrapper><Text>{price}</Text></ItemsWrapper>
      <ItemsWrapper>
        <OptionsButton onClick={openModal}>Ред</OptionsButton>
        </ItemsWrapper>
        <ItemsWrapper>
        <OptionsButton onClick={() => dispatch(removeProduct(_id))}>Вид</OptionsButton>
      </ItemsWrapper>
    </Wrapper>
    </li>
  );
}
