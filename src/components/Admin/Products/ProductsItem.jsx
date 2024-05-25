import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removeProduct } from "../../../redux/products/products-operation";
import useModal from "../../../hooks/modal";
import Modal from '../../Modal/';
import ProductsChangeModal from "./ProductsChangeModal";
import { nanoid } from "@reduxjs/toolkit";

const Image = styled.img`
  width: 60px;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-height: 200px;
  margin-bottom: 5px;
`;

export const ItemsWrapper = styled.div`
  flex: 1 1 0;
`;

const ImageWrapper = styled.div`
  margin-right: 10px;
`;

const OptionsButton = styled.button`
  position: absolute;
  right: -10px;
  color: red;
  &:not(:last-child) {
    color: blue;
    margin-right: 50px;
  }
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
      <ItemsWrapper><p>{name}</p></ItemsWrapper>
      <ItemsWrapper><p>{amount}</p></ItemsWrapper>
      <ItemsWrapper><p>{price}</p></ItemsWrapper>
      <OptionsButton onClick={openModal}>Ред</OptionsButton>
      <OptionsButton onClick={() => dispatch(removeProduct(_id))}>Вид</OptionsButton>
    </Wrapper>
    </li>
  );
}
