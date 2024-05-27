import FormAddProducts from "../../components/Admin/Form";
import { getStateProducts } from "../../redux/products/products-selectors";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getAllProducts } from "../../redux/products/products-operation";
import { useDispatch } from "react-redux";
import ProductsList from "../../components/Admin/Products/ProductsList";
import Search from "../../components/Home/Search/Search";
import Modal from '../../components/Modal';
import useModal from '../../hooks/modal';
import { ItemsWrapper, Wrapper } from '../../components/Admin/Products/ProductsItem';
import { Button, ButtonWrapper } from "../../components/Buttons/Buttons";

export default function Admin() {
  const products = useSelector(getStateProducts);
  const dispatch = useDispatch(); 

  const {closeModal, isModalOpen, openModal} = useModal();
  
  useEffect(() => {
      dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
    {isModalOpen && 
    <Modal onCloseModal={closeModal}>
    <FormAddProducts closeModal={closeModal}/>
    </Modal>
    }
    
      {/* {loading && <Loader />} */}
      {products.length > 2 &&<Search />}
      <ButtonWrapper>
        <Button onClick={openModal}>Додати товар</Button>
      </ButtonWrapper>
      <Wrapper>
          <ItemsWrapper><p>Зображення</p></ItemsWrapper>
          <ItemsWrapper><p>Назва</p></ItemsWrapper>
          <ItemsWrapper><p>Кількість</p></ItemsWrapper>
          <ItemsWrapper><p>Ціна</p></ItemsWrapper>
        </Wrapper>
      {products && <ProductsList data={products} />}
      </>
  );
}
