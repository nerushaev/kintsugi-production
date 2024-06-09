import FormAddProducts from "../../components/Admin/Form";
import { getStateProducts } from "../../redux/products/products-selectors";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getAllProducts } from "../../redux/products/products-operation";
import { useDispatch } from "react-redux";
import Search from "../../components/Home/Search/Search";
import Modal from '../../components/Modal';
import useModal from '../../hooks/modal';
import { Button, ButtonWrapper } from "../../components/Buttons/Buttons";
import ProductsList from "../../components/Admin/Products/ProductsList";

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
      {products.length > 2 && <Search />}
      <ButtonWrapper>
        <Button onClick={openModal}>Додати товар</Button>
      </ButtonWrapper>
      {products && <ProductsList data={products} />}
      </>
  );
}
