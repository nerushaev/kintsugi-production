import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useModal from '../../../../hooks/modal';
import { selectWishes } from '../../../../redux/auth/auth-selectors'
import { getWishProducts } from '../../../../redux/products/products-operation';
import { getStateProducts } from '../../../../redux/products/products-selectors';
import { addToBusket } from '../../../../redux/products/products-slice';
import { Button, ButtonWrapper } from '../../../Buttons/Buttons';
import { List, ListWrapper } from '../../../Home/Products/List.styled';
import { ProductsItem } from '../../../Home/Products/ProductsItem/ProductsItem';
import ProductsList, { ModalWrapper } from '../../../Home/Products/ProductsList/ProductsList';
import Modal from '../../../Modal/Modal';
import AddButtonWithSize from "../../../Home/Products/AddButtonWithSize/AddButtonWithSize";

export default function WishList() {
  const wishes = useSelector(selectWishes);
  const product = useSelector(getStateProducts);
  const dispatch = useDispatch();
  const {openModal, closeModal, isModalOpen} = useModal();
  const [modalProduct, setModalProduct] = useState([]);
  const [activeSize, setActiveSize] = useState();

  useEffect(() => {
    dispatch(getWishProducts(wishes))
  }, [wishes, dispatch]);

  const handleItemWithSize = (data) => {
    setActiveSize(data.modifications[0].modificator_name);
    setModalProduct(data);
    openModal();
  }

  const handleClick = (newData) => {
    dispatch(addToBusket(newData));
    closeModal();
  };

  return (
    <>
    <ListWrapper>
          <List>
          <ProductsItem key={nanoid()} data={product} handleItemWithSize={handleItemWithSize}/>
        </List>
        </ListWrapper>
        {isModalOpen && 
          <Modal onCloseModal={closeModal}>
            <ModalWrapper>
              <p>Оберіть розмір</p>
              <AddButtonWithSize activeSize={activeSize} modifications={modalProduct.modifications} setActiveSize={setActiveSize}  />
              <ButtonWrapper>
                <Button onClick={() => handleClick({
                  product_id: modalProduct.product_id,
                  product_name: modalProduct.product_name,
                  description: modalProduct.description,
                  photo: modalProduct.photo,
                  price: modalProduct.price,
                  amount: modalProduct.amount,
                  category_name: modalProduct.category_name,
                  size: activeSize
                })}>Додати у кошик</Button>
              </ButtonWrapper>
              </ModalWrapper>
          </Modal>
          }
          </>
  )
}
